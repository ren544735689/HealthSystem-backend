var dbconfig = require('../util/DBConfig');

// get medicine
var getMedicine=(req,res)=>{
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
var getCertainMedicinebyid=(req,res)=>{
    let id = req.body.id;
    var sql = 'select * from medicinewiki where id=?';
    var sqlArr = [id];
    var callBack = (err,data)=>{
        if(err){
            res.send({
                state: false,
                message: err
            });
        }
        else{
            if(data.length){
                res.send({
                    state: true,
                    message: data
                })
            }
            else{
                res.send({
                    state: false,
                    message: "no such id for medicine, sorry"
                })
            }
        }
    }

    dbconfig.sqlConnect(sql,sqlArr,callBack);
}

// get certain medicine by name
var getCertainMedicinebyname=(req,res)=>{
  let name = req.body.name;
  var sql = 'select * from medicinewiki where name=?';
  var sqlArr = [name];
  var callBack = (err,data)=>{
      if(err){
          res.send({
              state: false,
              message: err
          });
      }
      else{
          if(data.length){
              res.send({
                  state: true,
                  message: data
              })
          }
          else{
              res.send({
                  state: false,
                  message: "no such name for medicine, sorry"
              })
          }
      }
  }

  dbconfig.sqlConnect(sql,sqlArr,callBack);
}

// get certain medicine by sick
var getCertainMedicinebysick=(req,res)=>{
  let sick = req.body.sick;
  var sql = 'select * from medicinewiki where sick=?';
  var sqlArr = [sick];
  var callBack = (err,data)=>{
      if(err){
          res.send({
              state: false,
              message: err
          });
      }
      else{
        if(data.length){
            res.send({
                state: true,
                message: data
            })
        }
        else{
            res.send({
                state: false,
                message: "no such medicine for sick, sorry"
            })
        }
    }
  }

  dbconfig.sqlConnect(sql,sqlArr,callBack);
}

module.exports = {
    getMedicine,
    getCertainMedicinebyid,
    getCertainMedicinebyname,
    getCertainMedicinebysick
}