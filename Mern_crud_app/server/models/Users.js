
const mongoose = require('mongoose');

const AutoIncrement = require('mongoose-sequence')(mongoose);


const CandidateSchema = new mongoose.Schema({
    id:{type : Number},
    name: { type: String, required: true },
    registration_number: { type: String, required: true ,unique: true},
    dept: { type: String, required: true },
    dob: { type: Date, required: true },
    email: { type: String, required: true },
    description: { type: String }
});
 CandidateSchema.plugin(AutoIncrement, { inc_field: 'id' });
const Candidates = mongoose.model('candidates', CandidateSchema);

module.exports = Candidates;