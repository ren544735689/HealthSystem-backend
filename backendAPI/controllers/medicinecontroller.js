var dbconfig = require('../util/DBConfig');

// get medicine
getMedicine=(req,res)=>{
    var sql="select * from medicinewiki";
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

// get certain medicine
getCertainMedicine=(res,req)=>{
    let {id} = req.id;
    var sql = 'select * from medicinewiki where id=?';
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
    getMedicine,
    getCertainMedicine
}