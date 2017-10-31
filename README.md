# node-simple-schema_issue187

On Meteor 1.6 with collection2-core there is an issue when we have an optional sub-collection and that sub-collection is not populated in memory before inserting on the database.

Related to this issue:
https://github.com/aldeed/node-simple-schema/issues/187

To see the error, after uncomment lines 37-39 of server/main.js