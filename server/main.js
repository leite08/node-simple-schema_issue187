import { Meteor } from 'meteor/meteor';
import Devices from '../collections/Devices';

let wipe = true;

const createDevice = (device) => {
  const devToCreate = device;
  // const isExistingDev = Devices.findOne({code:devToCreate.code});

  // if (!isExistingDev) {
    return Devices.insert(devToCreate)._id;
  // }
  // return isExistingDev._id;
};

const seed = () => {
  if (wipe) Devices.remove({});
  let device = {
    name: 'Device #001',
  };
  createDevice(device);
  device = {
    name: 'Device #002',
    modules: [{
      number: `2`,
      enabled: true,
      special: {
        power: '80',
        children: [{
          childField: 1,
        },
        {
          childField: 2,
        }],
      }
      // [BEGIN] uncomment this to see validation error on console
    // },{
    //   number: `2`,
    //   enabled: true
      // [END]
    }],
  };
  createDevice(device);
};


Meteor.startup(() => {
  // code to run on server at startup
	seed();
});
