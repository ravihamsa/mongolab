var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var listSchema = new Schema({
    id: String,
    label: String,
    listOptions: [
        {id: String, label: String}
    ]
})

exports.List = mongoose.model('List', listSchema);

mongoose.connect('mongodb://localhost/listdb');