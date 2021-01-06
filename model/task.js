const mongoose = require('mongoose');

const taskSchema = mongoose.Schema({
    name:  { type: String, required:true},
    type: {type: String, required:true},
    date: { type: Date, required:true},
    details:{type: String}
});

module.exports = mongoose.model('task', taskSchema);
