var dbconfig = require('../util/DBConfig');

// get user
getUser=(req,res)=>{
    var sql="select * from user";
    var sqlArr = [];
    var callBack = (err,data)=>{
      if(err){
        console.log('err');
      }
      else{
        res.send({
          'list': data
        })
      }
    }
  
    dbconfig.sqlConnect(sql,sqlArr,callBack);
}

module.exports = {
    getUser
}