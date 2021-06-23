var dbconfig = require('../util/DBConfig');

// get user
var getUser=(req,res)=>{
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

// get certain user
var getCertainUser=(req,res)=>{
    let {id} = req.id;
    var sql = 'select * from user where id=?';
    var sqlArr = [id];
    var callBack = (err,data)=>{
        if(err){
          res.status(500).send({ status: false, message: err });
        }
        else{
          if(!data){
            res.send({
                status: false,
                message: "user not found!" });
            return;
          }
          else{
            res.send({
              'list': data
            })
          }
        }
    }

    dbconfig.sqlConnect(sql,sqlArr,callBack);
}

var UserLogin=(req, res) => {
    let id = req.body.id;
    let password = req.body.password;
    var sql = 'select * from user where id=? and password=?';
    var sqlArr = [id,password];
    var callBack = (err,data)=>{
      console.log('in UserLogin...');
      console.log(id,password);
        if(err){
            res.status(500).send({
              status: false,
              message: err 
            });
        }
        else{
            if(data.length){
              res.send({
                states:true,
                id:data[0].id,
                name:data[0].name,
                gender:data[0].gender
              })
            }
            
        }
    }
    console.log('test for req:');
    console.log(req.url);
    var urlobj = url.parse(req.url, true)
    console.log(urlobj);
    console.log(req.body);
    dbconfig.sqlConnect(sql,sqlArr,callBack);
};

module.exports = {
    getUser,
    getCertainUser,
    UserLogin
}