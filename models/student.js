var mongoose = require('mongoose');

//defining the schema of the DB
var SISSchema = mongoose.Schema({
    usn: String,
    name: String,
    courses: [{
        code: String,
        name: String,
        attendence: {
            percentage: Number,
            attended: Number,
            absent: Number,
            remaining: Number
        },
        cie: String,
        test: [Number],
        assignment: [Number]
    }],
    updated: {type: Date, default: Date.now, trim: true}
});

//creating a model
var student = mongoose.models('student', SISSchema);

SISSchema.statics.studentExists = function(req, callback) {
    var usn = req.usn;
    this.model('student').count({usn: usn}, function (err, count) {
        if(err) {
            console.log("Student Count error")
        }
        if(count > 0)  {
            return true;
        }else {
            return false;
        }
    } );
}
SISSchema.statics.insertStudent = function(req, callback)  {
    //var student = mongoose.models('student', SISSchema);
    var student = new this(req);
    student.save(function(err) {
        if(err) {
            console.log("error inserting student");
        }else{
            console.log("New student inserted into DB");
            callback(req);
        }
    });
 }
SISSchema.statics.updateStudent = function(req) {
    var usn = req.usn;
    var query = {usn: usn}
    this.update(query, req, function()  {
        if(err) {
            console.log("Error Updating student in DB");
        }else {
            console.log("Student updated in db");
        }
    });
}
