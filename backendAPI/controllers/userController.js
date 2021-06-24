var dbconfig = require('../util/DBConfig');

// get user
var getUser = (req, res) => {
  var sql = "select * from user";
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
  console.log('in User.getUser')
  dbconfig.sqlConnect(sql, sqlArr, callBack);
}

// get certain user
var getCertainUser = (req, res) => {
  let { id } = req.id;
  var sql = 'select * from user where id=?';
  var sqlArr = [id];
  var callBack = (err, data) => {
    if (err) {
      res.status(500).send({ status: false, message: err });
    }
    else {
      if (!data) {
        res.send({
          status: false,
          message: "user not found!"
        });
        return;
      }
      else {
        res.send({
          'list': data
        })
      }
    }
  }

  dbconfig.sqlConnect(sql, sqlArr, callBack);
}

var UserLogin = (req, res) => {
  let name = req.body.username;
  let password = req.body.password;
  var sql = 'select * from user where name=? and password=?';
  var sqlArr = [name, password];
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
          id: data[0].id,
          name: data[0].name,
          gender: data[0].gender
        })
      }
      else {
        res.send({
          state: false,
          message: "Sorry, id or password is wrong!"
        })
      }
    }
  }
  console.log('in UserLogin...');
  dbconfig.sqlConnect(sql, sqlArr, callBack);
};



var UserRegister = (req, res) => {
  let id = req.body.id;
  let password = req.body.password;
  let name = req.body.name;
  let idcode = req.body.idcode;
  let gender = req.body.gender;
  var checkregisterflag = false;

  var sql_check = 'select * from user where id=? or name=?';
  var sqlArr_check = [id, name];
  var sql_insert = 'insert into user value (?,?,?,?,?)';
  var sqlArr_insert = [id, name, idcode, gender, password];

  var callBackRegister = (err_reg, data_reg) => {
    console.log('in UserRegister_Register...');
    if (err_reg) {
      res.send({
        state: false,
        message: err_reg
      });
    }
    else {
      res.send({
        state: true,
        message: "Congratulations! you have successfully registered."
      })
    }
  }

  var callBackCheck = (err_check, data_check) => {
    console.log('in UserRegister_check...');
    if (err_check) {
      res.send({
        state: false,
        message: err_check
      });
    }
    else {
      if (data_check.length) {
        checkregisterflag = true;
        res.send({
          state: false,
          message: "Sorry, this id or name has been registered!"
        })
      }
      else {
        checkregisterflag = false;
      }

      if (checkregisterflag) {
        return;
      }
      else {
        dbconfig.sqlConnect(sql_insert, sqlArr_insert, callBackRegister);
      }
    }
  }

  console.log('in UserRegister...');
  dbconfig.sqlConnect(sql_check, sqlArr_check, callBackCheck);
}

module.exports = {
  getUser,
  getCertainUser,
  UserLogin,
  UserRegister
}