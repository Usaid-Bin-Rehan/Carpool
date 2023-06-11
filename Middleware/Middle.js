const db= require('../mysql/connection.js')

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

function auth(req,res,next){
    query="select * from signup where email = ? and password = ?";
    
    values=[req.body.e1,req.body.p1];
    retrieve(query,values,function(data){
        if(data!=null&&data.length>0){
	 			res.redirect('/main');
        }
        else    
        res.redirect('/login')
        next();
    });
}

function setUser(users){
    return((req,res,next)=>{
        req.temp=users.find((element)=>element.id=req.query.userid);
        next();
    })
}

function authRole(req,res,next){
    if(req.temp.role!=='admin'){
        res.send("not admin");
        return;
    }
    next();
}


module.exports={auth,setUser,authRole};