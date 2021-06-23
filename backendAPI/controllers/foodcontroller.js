var dbconfig = require('../util/DBConfig');

// get food
getFood=(req,res)=>{
    var sql="select * from foodwiki";
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

// get certain food
getCertainFood=(res,req)=>{
    let {id} = req.id;
    var sql = 'select * from foodwiki where id=?';
    var sqlArr = [id];
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
    getFood,
    getCertainFood
}