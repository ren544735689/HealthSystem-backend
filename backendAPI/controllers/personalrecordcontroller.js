var dbconfig = require('../util/DBConfig');

// get record
var getRecord=(req,res)=>{
    var sql="select * from personalrecord";
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


// get certain record by rid
var getCertainRecordbyrid=(req,res)=>{
    let {rid} = req.body.rid;
    var sql = 'select * from personalrecord where rid=?';
    var sqlArr = [rid];
    var callBack = (err,data)=>{
        if(err){
            res.send({
                state: false,
                message: err
            });
        }
        else{
          res.send({
            'list': data
          })
        }
    }

    dbconfig.sqlConnect(sql,sqlArr,callBack);
}

// get certain record by uid
var getCertainRecordbyuid=(req,res)=>{
  let {uid} = req.body.uid;
  var sql = 'select * from personalrecord where uid=?';
  var sqlArr = [uid];
  var callBack = (err,data)=>{
      if(err){
          res.send({
                state: false,
                message: err
          });
      }
      else{
        res.send({
          'list': data
        })
      }
  }

  dbconfig.sqlConnect(sql,sqlArr,callBack);
}


// get certain record by uid
var getCertainRecordbyuid=(req,res)=>{
  let {uid} = req.body.uid;
  var sql = 'select * from personalrecord where uid=?';
  var sqlArr = [uid];
  var callBack = (err,data)=>{
      if(err){
          res.send({
                state: false,
                message: err
          });
      }
      else{
        res.send({
          'list': data
        })
      }
  }

  dbconfig.sqlConnect(sql,sqlArr,callBack);
}

// add personal record 
var addRecord=(req,res)=>{
  let {uid} = req.body.uid;
  let {date} = req.body.date;
  let {time} = req.body.time;
  let {reason} = req.body.reason;
  let {cost} = req.body.cost;
  let {diagnosis} = req.body.diagnosis;
  var sql = 'insert into personalrecord values(?,?,?,?,?,?)';
  var sqlArr = [uid,date,time,reason,cost,diagnosis];
  var callBack = (err,data)=>{
      if(err){
          res.send({
                state: false,
                message: err
          });
      }
      else{
        res.send({
          'list': data
        })
      }
  }

  dbconfig.sqlConnect(sql,sqlArr,callBack);
}

var deleteRecord=(req,res)=>{
  let {rid} = req.body.rid;
  var sql = 'delete from personalrecord where rid=?';
  var sqlArr = [rid];
  var callBack = (err,data)=>{
      if(err){
          res.send({
              state: false,
              message: err
          });
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
    getRecord,
    getCertainRecordbyrid,
    getCertainRecordbyuid, 
    addRecord,
    deleteRecord
}