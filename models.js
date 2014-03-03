
var Mongoose = require('mongoose');


var TasksSchema = new Mongoose.Schema({
  // added these Schema types
  "taskname": String,
  "estimatedtime": String,
  "location": String,
  "priority": String
});

exports.Tasks = Mongoose.model('Tasks', TasksSchema);


