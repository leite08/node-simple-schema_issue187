/* eslint-disable consistent-return */

import SimpleSchema from 'simpl-schema';
import { Mongo } from 'meteor/mongo';
import { Random } from 'meteor/random';

const Devices = new Mongo.Collection('Devices');

Devices.allow({
  insert: () => false,
  update: () => false,
  remove: () => false,
});

Devices.deny({
  insert: () => true,
  update: () => true,
  remove: () => true,
});

const Schemas = {};

Schemas.Child = new SimpleSchema({
  _id: {
    type: String,
    autoValue: function(){
      return Random.id();
    },
    optional: false,
    // index: true,
    // unique: true
  },
  childField: {
    type: Number,
  },
});

Schemas.ModuleSpecial = new SimpleSchema({
  power: {
    type: Number,
  },
  children: {
    type: Array,
    // minCount: 1,
    // maxCount: 4,
  },
  "children.$": Schemas.Child
});

Schemas.Modules = new SimpleSchema({
  _id: {
    type: String,
    autoValue: function(){
      return Random.id();
    },
    optional: false,
    // index: true,
    // unique: true
  },
  number: String,
  enabled: {
    type: Boolean,
    autoValue() {
      if (this.isInsert) return true;
    }
  },
  special: {
    type: Schemas.ModuleSpecial,
    optional: true
  },
});

Schemas.Devices = new SimpleSchema({
  name: String,

  modules: {
    type: Array,
    optional: true,
  },
  "modules.$": Schemas.Modules,

  updatesHistory: {
    type: Array,
    autoValue: function() {
      const historyEntry = {
        date: new Date,
        user: this.userId
      };
      if (this.isInsert) {
        return [historyEntry];
      } else {
        return {
          $push: historyEntry
        };
      }
    }
  },
  'updatesHistory.$': {
    type: Object,
  },
  'updatesHistory.$.date': {
    type: Date,
    optional: true
  },
  'updatesHistory.$.user': {
    type: String,
    optional: true
  },
});

Devices.attachSchema(Schemas.Devices);

// ---- Create Indexes ----
// Devices.createIndex({gender:1, eyes:1}, { unique: true } );

export default Devices;
