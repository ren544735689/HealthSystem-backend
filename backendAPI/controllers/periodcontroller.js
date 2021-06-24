var dbconfig = require('../util/DBConfig');

// get period
var getPeriod = (req, res) => {
  var sql = "select * from period";
  var sqlArr = [];
  var callBack = (err, data) => {
    if (err) {
      console.log(err);
    }
    else {
      res.send({
        'list': data
      })
    }
  }

  dbconfig.sqlConnect(sql, sqlArr, callBack);
}

// add period data
var addPerioddata = (req, res) => {
  let uid = req.body.uid;
  let last_come = req.body.last_come;
  let set_period = req.body.set_period;
  var sql = 'insert into period values(?,?,?)';
  var sqlArr = [uid, last_come, set_period];
  var callBack = (err, data) => {
    if (err) {
      res.send({
        state: false,
        message: err
      });
    }
    else {
      res.send({
        "states": true,
        "message": "Successfully add an item into period data!"
      })
    }
  }

  dbconfig.sqlConnect(sql, sqlArr, callBack);
}

var updatePerioddata = (req, res) => {
  let uid = req.body.uid;
  let last_come = req.body.last_come;
  let set_period = req.body.set_period;
  var sql = 'update period set last_come=?, set_period=? where uid=?';
  var sqlArr = [last_come, set_period, uid];
  var callBack = (err, data) => {
    if (err) {
      res.send({
        state: false,
        message: err
      });
    }
    else {
      res.send({
        "states": true,
        "message": "Successfully update!"
      })
    }
  }

  dbconfig.sqlConnect(sql, sqlArr, callBack);
}

var getPerioddata = (req, res) => {
  let uid = req.body.uid;
  var sql = 'select * from period where uid=?';
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
          message: "no such data for uid in periodTABLE, sorry"
        })
      }
    }
  }

  dbconfig.sqlConnect(sql, sqlArr, callBack);
}



module.exports = {
  getPeriod,
  addPerioddata,
  updatePerioddata,
  getPerioddata
}