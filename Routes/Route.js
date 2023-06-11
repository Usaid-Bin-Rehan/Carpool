
const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();
const path = require('path');
const session = require('express-session');
const staticPath = path.join(__dirname,'../Templates');
const urlencodedParser = bodyParser.urlencoded({ extended: true });
const db = require('../mysql/connection');
const request = require('request');
const {auth,setUser,authRole}=require("../Middleware/Middle.js");

router.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));

 router.use(express.static(staticPath));
 router.use(bodyParser.json());
 router.use(urlencodedParser);
 router.use(express.static(path.join(__dirname, 'static')));

//Routes
router.get('/',(req,res) => {
    res.sendFile(path.join(__dirname,'../Templates/home/home.html'))
})


router.get('/login',(req,res) => {
    res.sendFile(path.join(__dirname,'../Templates/login/login.html'))
})

var e1="";
///////////////////////////Signup/////////////////////////////////
router.post('/signup', function (req, res) {
    var email=req.body.email;
	var password=req.body.password1;
	e1=email;
	var sql="INSERT INTO signup(email,password) VALUES(?,?)";
		
	db.query(sql, [email,password],function(error){
		if(error) throw error;
		res.render('../Templates/profile/profile.ejs',{e1:e1});
		// res.redirect('/editprofile');
	})
});

var email="";
router.post('/login',auth, (req, res) => {
	email=req.body.e1;
});


router.get('/editprofile',(req, res) => {
    res.sendFile(path.join(__dirname,'../Templates/profile/profile.ejs'));
});

router.post('/editprofile', function (req, res) {
    var userid=req.body.userid;
	var fname=req.body.fname;
	var lname=req.body.lname;
	var mobile=req.body.mobile;
	var email=e1;
	var address=req.body.address;
	var postcode=req.body.postcode;
	var type=req.body.type;
	var plate=req.body.plate;
	var model=req.body.model;
	var ac=req.body.ac;
	var seats=req.body.seats;
	var license=req.body.license;
	var experience=req.body.experience;
	var carname=req.body.carname;
    var gender=req.body.gender;
	var faculty=req.body.faculty;
    var semester=req.body.semester;
	var program=req.body.program;
	var extrovert=req.body.extrovert;
	var origin=req.body.source;
	var destination=req.body.destination;

	
	var sql="INSERT INTO users(user_id,email,fname,lname,phone,address,postcode) VALUES('"+userid+"','"+email+"','"+fname+"','"+lname+"','"+mobile+"','"+address+"','"+postcode+"')";
	//var uid=userid;
	var sql1="INSERT INTO drivers(driver_id,license,experience,id,origin,destination) VALUES('"+userid+"','"+license+"','"+experience+"','"+userid+"','"+origin+"','"+destination+"')";
	//var did=driverid;
	var sql2="INSERT INTO cars(plate,type,model,car_name,seats,ac,id) VALUES('"+plate+"','"+type+"','"+model+"','"+carname+"','"+seats+"','"+ac+"','"+userid+"')";

	var sql3="INSERT INTO preferences(userid,gender,faculty,semester,program,extrovert,did) VALUES('"+userid+"','"+gender+"','"+faculty+"','"+semester+"','"+program+"','"+extrovert+"','"+userid+"')";

	if(license){
	db.query(sql, function(error){
		if(error) throw error;

		
	})
	db.query(sql1, function(error){
		if(error) throw error;

		
	})
	db.query(sql2, function(error){
		if(error) throw error;
	
		
	})
	db.query(sql3, function(error){
		if(error) throw error;
	
		
	})}
	
	
	else{
		db.query(sql, function(error){
			if(error) throw error;
			
			
		})	
	}
	res.redirect('/main');
		
})


router.post('/editprofile1', function (req, res) {
    
})


router.post('/delprof',(req,res) => {
	let sql = `DELETE FROM users WHERE email = ?`;
	
	
	// delete a row with id 1
	db.query(sql, email, (error, results, fields) => {
	  
	  console.log('Deleted Row(s):', results.affectedRows);
	  res.redirect('/login');
	});
	db.end();
	})

	
router.post('/updateprof',(req,res) => {
	let sql = `DELETE FROM users WHERE email = ?`;
	var e1=email;
	
	// delete a row with id 1
	db.query(sql, email, (error, results, fields) => {
		res.render('../Templates/profile/profile.ejs',{e1:e1});
		
	});
	
	})
//DELETE
router.post('/delview',(req,res) => {
	let sql = `DELETE FROM signup,users WHERE email = ? `;
	
	
	// delete a row with id 1
	db.query(sql, email, (error, results, fields) => {
	  
	  console.log('Deleted Row(s):', results.affectedRows);
	  res.redirect('/login');
	});
	db.end();
	})
		
		

	router.get('/updateview',(req,res) => {

		db.connect(function(err) {
			function retrieve(query,values,callback){
				db.query(query,values,(err,results)=>{
					if(err){
						console.log(err)
						callback();
					}
					else{
						callback(results);
						data=results;
					}
				})
			}
			
		const query = 'SELECT * ' + 
						  'FROM `drivers` ' +
						  'JOIN `users` ON `drivers`.`id` = `users`.`user_id`' +
						  'JOIN `cars` ON `drivers`.`driver_id` = `cars`.`id`' +
						  'WHERE `users`.`email` = ?';
		
			retrieve(query,[email],function(data){
			if(data.license)
			{
				res.render('../Templates/profile/prof.ejs', {data});
			}
			else
			{
				const query1 = 'SELECT * ' + 
						  'FROM `users` ' +
						  'WHERE `users`.`email` = ?';
			
						  retrieve(query1,[email],function(data){
							res.render('../Templates/profile/prof.ejs', {data});
						  })
			
			}
			});
		
			});
		
		})
		
router.get('/main',(req,res) => {

	db.connect(function(err) {
		function retrieve(query,values,callback){
			db.query(query,values,(err,results)=>{
				if(err){
					console.log(err)
					callback();
				}
				else{
					callback(results);
					data=results;
				}
			})
		}
		
	const query = 'SELECT * ' + 
					  'FROM `drivers` ' +
					  'JOIN `users` ON `drivers`.`id` = `users`.`user_id`' +
					  'JOIN `cars` ON `drivers`.`driver_id` = `cars`.`id`'
					  'JOIN `preferences` ON `drivers`.`id` = `preferences`.`did`';
	
		retrieve(query,[email],function(data){
			res.render('../Templates/profile/view.ejs', {data});
		});
	
		});
	
	
	})
	

router.get('/view',(req,res) => {

db.connect(function(err) {
	function retrieve(query,values,callback){
		db.query(query,values,(err,results)=>{
			if(err){
				console.log(err)
				callback();
			}
			else{
				callback(results);
				data=results;
			}
		})
	}
	
const query = 'SELECT * ' + 
                  'FROM `drivers` ' +
				  'JOIN `users` ON `drivers`.`id` = `users`.`user_id`'+
                  'JOIN `cars` ON `drivers`.`driver_id` = `cars`.`id`' +
				  'WHERE `users`.`email` = ?';

const query1 = 'SELECT * FROM users WHERE users.email = ?';

	retrieve(query,[email],function(data){
	if(data.license)
    { 
	res.render('../Templates/profile/prof.ejs', {data});
	}
		else
{
retrieve(query1,[email],function(data){
	res.render('../Templates/profile/prof.ejs', {data});
})
}
    });

	});

})



router.post('/main',(req,res) => {
	var type=req.body.type;
    var gender=req.body.gender;
	var faculty=req.body.faculty;
    var semester=req.body.semester;
	var program=req.body.program;
	var extrovert=req.body.extrovert;

	db.connect(function(err) {
		function retrieve(query,values,callback){
			db.query(query,values,(err,results)=>{
				if(err){
					console.log(err)
					callback();
				}
				else{
					callback(results);
					data=results;
				}
			})
		}
		var h=`SELECT *  FROM drivers JOIN users ON drivers.id = users.user_id JOIN cars ON drivers.driver_id = cars.id JOIN preferences ON drivers.id = preferences.did `;
if(type!="."||gender!="."||faculty!="."||semester!="."||extrovert!="."){
  h=h+`where `;
}
var first=0;
if(type!=".")
{
  h = h+`cars.type = '${type}'`;
  first=1;
}
if(gender!=".")
{
  if(first==1){
    h=h+` and preferences.gender = '${gender}'`;
  } else {
    h=h+` preferences.gender = '${gender}'`;
    first=1;
  }
}
if(faculty!=".")
{
  if(first==1){
    h=h+` and preferences.faculty =${faculty}`;
  } else {
    h=h+` preferences.faculty =${faculty}`;
    first=1;
  }
}
if(semester!=".")
{
  if(first==1){
    h=h+` and preferences.semester=${semester}`;
  } else {
    h=h+` preferences.semester=${semester}`;
    first=1;
  }
}
if(extrovert!=".")
{
  if(first==1){
    h=h+` and preferences.extrovert=${extrovert}`;
  } else {
    h=h+` preferences.extrovert=${extrovert}`;
    first=1;
  }
}
retrieve(h,[type,gender,semester,faculty,extrovert],function(data){
  res.render('../Templates/profile/view.ejs', {data});
});

})
})

var id="";
var id1=null; 

router.post('/group',(req,res) => {

	var plate=req.body.plate;
	var driverid=req.body.driverid;
	
	
	db.connect(function(err) {
		function retrieve(query,values,callback){
			db.query(query,values,(err,results)=>{
				if(err){
					console.log(err)
					callback();
				}
				else{
					callback(results);
					data=results;
				}
			})
		}
		
		var sql1="SELECT user_id from users where email = ?";
		
		db.query(sql1,[email], function(error,result){
			if(error) throw error;
			res.redirect("/viewjoined");
			
	// id=JSON.stringify(result);
	// id1= id.split(':')[1];
	//  console.log(id1);
	 
	var sql="INSERT INTO groups(car,driverid,email) VALUES('"+plate+"','"+driverid+"','"+email+"')";
		
	db.query(sql, function(error,result){
		if(error) throw error;
		
	})
		})
	

})
})

router.get('/delgroup',(req,res) => {
	let sql = `DELETE FROM groups WHERE email = ?`;
	
	
	// delete a row with id 1
	db.query(sql, email, (error, results, fields) => {
	  
	  res.redirect('/main');
	});
	})

router.get('/allgroups',(req,res) => {

	db.connect(function(err) {
		function retrieve(query,values,callback){
			db.query(query,values,(err,results)=>{
				if(err){
					console.log(err)
					callback();
				}
				else{
					callback(results);
					data=results;
				}
			})
		}
		
		const query = 'SELECT * ' + 
						  'FROM `drivers` ' +
						  'INNER JOIN `groups` ON `drivers`.`driver_id` = `groups`.`driverid`';
		retrieve(query,function(data){
			 		res.render('../Templates/profile/view.ejs', {data});
		});
	
})
})

router.get('/viewjoined',(req,res) => {
	db.connect(function() {
		function retrieve(query,values,callback){
			db.query(query,values,(err,results)=>{
				if(err){
					console.log(err)
					callback();
				}
				else{
					callback(results);
					data=results;
				}
			})

		}
		
		//var h=`SELECT *  FROM groups`;

	
	 var sql2=`SELECT driverid FROM groups WHERE groups.email = ? `;
			
	db.query(sql2,[email], function(error,result){
		// if(error) throw error;
	if(result==0) res.render('../Templates/profile/empty.ejs')	;

	else{
		var sql3=`SELECT * FROM drivers JOIN users ON drivers.id = users.user_id JOIN cars ON drivers.driver_id = cars.id JOIN preferences ON drivers.id = preferences.did JOIN groups ON drivers.id = groups.driverid WHERE groups.driverid = ? `;
		
	 
	var id2=JSON.stringify(result);
	var id3= id2.split(':')[1];
	 var id4=id3.substring(0,id3.indexOf('}'));
	

		
		retrieve(sql3,[id4],function(data){
			res.render('../Templates/profile/group.ejs', {data});

	})
		// })
	}})
		// retrieve(h,[email],function(data){
		// 	 		res.render('../Templates/profile/view.ejs', {data});
		// });
	
		////////////////////////////
		
})
})


router.get('/reviews',(req,res) => {
	var type=req.body.type;
    var gender=req.body.gender;
	var faculty=req.body.faculty;
    var semester=req.body.semester;
	var program=req.body.program;
	var extrovert=req.body.extrovert;

	
	db.connect(function(err) {
		function retrieve(query,values,callback){
			db.query(query,values,(err,results)=>{
				if(err){
					console.log(err)
					callback();
				}
				else{
					callback(results);
					data=results;
				}
			})
		}
		
	const query = 'SELECT * ' + 
					  'FROM `drivers` ' +
					  'JOIN `users` ON `drivers`.`id` = `users`.`user_id`' +
					  'JOIN `cars` ON `drivers`.`driver_id` = `cars`.`id`'
					  'JOIN `preferences` ON `drivers`.`id` = `preferences`.`did`';
	
		retrieve(query,[email],function(data){
			res.render('../Templates/Reviews/review.ejs', {data});
		});
	
		});
	
	

})

router.get('/semester',(req,res) => {
    res.sendFile(path.join(__dirname,'../Templates/semester/semester.html'))
})


router.get('/payment',(req,res) => {
    res.sendFile(path.join(__dirname,'../Templates/payment/payment.html'))
})

module.exports = router;