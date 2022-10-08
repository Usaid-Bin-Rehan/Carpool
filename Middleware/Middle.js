module.exports={
    
auth(req,res,next) 
{
  next()
}

,

 admin(req,res,next)
 {
   if(req.query.admin=='true')
   {
       console.log('Mar Admin ja ghus ja');
       next()
   }
   else
   {
       console.log('Abe tum kon ho bhai');
   }
 }
}