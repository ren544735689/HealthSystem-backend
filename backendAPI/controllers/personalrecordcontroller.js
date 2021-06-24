var dbconfig = require('../util/DBConfig');

// get record
var getRecord = (req, res) => {
  var sql = "select * from personalrecord";
  var sqlArr = [];
  var callBack = (err, data) => {
    if (err) {
      console.log('err');
    }
    else {
      res.send({
        'list': data
      })
    }
  }

  dbconfig.sqlConnect(sql, sqlArr, callBack);
}


// get certain record by rid
var getCertainRecordbyrid = (req, res) => {
  let rid = req.body.rid;
  var sql = 'select * from personalrecord where rid=?';
  var sqlArr = [rid];
  var callBack = (err, data) => {
    if (err) {
      res.send({
        state: false,
        message: err
      });
    }
    else {
      if (data.length) {
        res.send({
          state: true,
          message: data
        })
      }
      else {
        res.send({
          state: false,
          message: "no such rid for personalrecord, sorry"
        })
      }
    }
  }

  dbconfig.sqlConnect(sql, sqlArr, callBack);
}

// get certain record by uid
var getCertainRecordbyuid = (req, res) => {
  let uid = req.body.uid;
  var sql = 'select * from personalrecord where uid=?';
  var sqlArr = [uid];
  var callBack = (err, data) => {
    if (err) {
      res.send({
        state: false,
        message: err
      });
    }
    else {
      if (data.length) {
        res.send({
          state: true,
          message: data
        })
      }
      else {
        res.send({
          state: false,
          message: "no such uid for personalrecord, sorry"
        })
      }
    }
  }

  dbconfig.sqlConnect(sql, sqlArr, callBack);
}

// add personal record 
var addRecord = (req, res) => {
  let rid = req.body.rid;
  let uid = req.body.uid;
  let date = req.body.date;
  let time = req.body.time;
  let reason = req.body.reason;
  let cost = req.body.cost;
  let diagnosis = req.body.diagnosis;
  var sql = 'insert into personalrecord values(?,?,?,?,?,?,?)';
  var sqlArr = [rid, uid, date, time, reason, cost, diagnosis];
  var callBack = (err, data) => {
    if (err) {
      res.send({
        state: false,
        message: err
      });
    }
    else {
      res.send({
        states: true,
        message: "Congratulations! You have successfully add a record!"
      })
    }
  }

  dbconfig.sqlConnect(sql, sqlArr, callBack);
}

var deleteRecord = (req, res) => {
  let rid = req.body.rid;
  var sql = 'delete from personalrecord where rid=?';
  var sqlArr = [rid];
  var callBack = (err, data) => {
    if (err) {
      res.send({
        state: false,
        message: err
      });
    }
    else {
      res.send({
        states: true,
        message: "successfully delete record!"
      })
    }
  }

  dbconfig.sqlConnect(sql, sqlArr, callBack);
}

var count2Record = (req, res) => {
  let uid = req.body.uid;
  let searchtime = req.body.time;
  var sql = 'select * from personalrecord where uid=? and recorddate>?';
  var sqlArr = [uid, searchtime];
  var callBack = (err, data) => {
    if (err) {
      res.send({
        state: false,
        message: err
      });
    }
    else {
      var num = data.length;
      var totalcost = 0;
      for (let i = 0; i < num; i++) {
        totalcost += data[i].cost;
      }
      res.send({
        "states": true,
        "number": num,
        "allcost": totalcost
      })
    }
  }

  dbconfig.sqlConnect(sql, sqlArr, callBack);
}

var countAllRecord = (req, res) => {
  var uid = req.body.uid;
  var sql = 'select * from personalrecord where uid=?';
  var sqlArr = [uid];
  var callBack = (err, data) => {
    if (err) {
      res.send({
        state: false,
        message: err
      });
    }
    else {
      var num = data.length;
      var totalcost = 0;
      for (let i = 0; i < num; i++) {
        totalcost += data[i].cost;
      }
      res.send({
        "states": true,
        "number": num,
        "allcost": totalcost
      })
    }
  }

  dbconfig.sqlConnect(sql, sqlArr, callBack);
}



module.exports = {
  getRecord,
  getCertainRecordbyrid,
  getCertainRecordbyuid,
  addRecord,
  deleteRecord,
  count2Record,
  countAllRecord
}