var express = require('express');
var User = require('../models/user');
var router = express.Router();
var session = require('express-session');

// GET home page. 
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/login', function(req, res, next) {
  res.render('login');
});

router.get('/retrieve', function(req, res, next) {
  res.render('retrieve');
});

router.get('/delete', function(req, res, next) {
  res.render('delete');
});


// Dashboard page 
router.get('/dashboard', function(req, res, next) {
	
	res.render('dashboard',{'userData':req.session.userData});
});


  // Update Profile
 router.post('/update', function(req, res, next) {
	 
	eName = req.body.eName;
	eEmail = req.body.eEmail;
	eId = req.body.eId;
	eDepartment = req.body.eDepartment;
	eSalary=req.body.eSalary;
	
	var userData =  User.update({ _id:id }, {eName:eName,eEmail:eEmail,eId:eId,eDepartment:eDepartment,eSalary:eSalary},function(err, user) {
		if (err){
			console.log('Error in Saving user data: '+err);  
            throw err;  
            res.send('failed');  
		}  else {
			console.log("Updated successfully...");
			res.send('Updated Successfully')
			//res.redirect('retrieve');
		}			 
	});	
	
});
 

 router.post('/delete', function(req, res, next) {
	 

	var emp = new User();
    var eEmail = req.body.eEmail;
	
	var userData= User.remove({ eEmail: eEmail }, function(err, user) {
		
		 if (err){
			console.log('Error in retrieving user data:'+err);  
            throw err;  
            res.send('failed');  
		  }
		 console.log('Employee deleted');    
         res.send('success');
	
});
 });


router.post('/retrieveData',function(req,res,next){

	
	var emp = new User();
    var eEmail = req.body.eEmail;
	
	var userData= User.find({ eEmail: eEmail }, function(err, user) {
			if (err){
			console.log('Error in retrieving empl data: '+err);  
            throw err;  
            res.send('failed');  
			} 
				  
			else {
				if(user){
				console.log("Fected from DB : "+user);
				userData = user;
				if(userData.eEmail){
					console.log('userId:'+userData.eEmail);
					req.session.userData = userData;
					res.redirect('dashboard');
				}  
			 } else {
				console.log('No data found...');
				res.redirect('login');
			 }
				
		  }			 
	});
	
	
});
 
 
router.post('/create', function(req, res, next) {
	
	var emp = new User();
    emp.eName = req.param('eName');
    emp.eEmail = req.param('eEmail');
    emp.eId = req.param('eId');
	emp.eDepartment=req.param('eDepartment');
	emp.eSalary=req.param('eSalary');
	
    // Register the user
    emp.save(function(err) {
        if (err){
            console.log('Error in Registering user data: '+err);  
            throw err;  
            res.send('failed');
        }
        console.log('Employee Registration succesful');    
         res.send('success');
    });
 });
 
module.exports = router;
