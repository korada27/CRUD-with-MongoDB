var mongoose = require('mongoose');

module.exports = mongoose.model('employeeCollection',{     
	eName:String,
    eEmail: String,
    eId: String,	
    eDepartment: String,
	eSalary:String
});