var dbconfig = require('../util/DBConfig');

// get food
var getFood=(req,res)=>{
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
var getCertainFoodbyid=(req,res)=>{
    let {id} = req.body.id;
    var sql = 'select * from foodwiki where id=?';
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
                  message: "no such id for food, sorry"
              })
          }
      }
    }

    dbconfig.sqlConnect(sql,sqlArr,callBack);
}

// get certain food by name
var getCertainFoodbyname=(req,res)=>{
  let {name} = req.body.name;
  var sql = 'select * from foodwiki where name=?';
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
                message: "no such name for food, sorry"
            })
        }
    }
  }

  dbconfig.sqlConnect(sql,sqlArr,callBack);
}


module.exports = {
    getFood,
    getCertainFoodbyid,
    getCertainFoodbyname
}