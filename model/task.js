const mongoose = require('mongoose');

const taskSchema = mongoose.Schema({
    name:  { type: String},
    type: {type: String},
    date: { type: Date},
    details:{type: String}
});

module.exports = mongoose.model('task', taskSchema);
