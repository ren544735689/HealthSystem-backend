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
var getCertainUser=(res,req)=>{
    let {id} = req.id;
    var sql = 'select * from user where id=?';
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

var updateUserInfo = (req, res) => {
  var reqInfo = req.body.userInfo;
  var updateUserInfo = {};
  var updateDoctorInfo = {};
  var needUpdateDoctor = 0;
  var query;
  if(reqInfo.hasOwnProperty('gender')) {
      updateUserInfo.gender = reqInfo.xingbie;
  }
  // if(reqInfo.hasOwnProperty('hospitalName')) {
  //     updateDoctorInfo.hospital_name = reqInfo.hospitalName;
  //     needUpdateDoctor = 1;
  // }
  // if(reqInfo.hasOwnProperty('keshi')) {
  //     updateDoctorInfo.department = reqInfo.keshi;
  //     needUpdateDoctor = 1;
  // }
  // if(reqInfo.hasOwnProperty('zhicheng')) {
  //     updateDoctorInfo.rank = reqInfo.zhicheng;
  //     needUpdateDoctor = 1;
  // }
  // if(reqInfo.hasOwnProperty('age')) {
  //     updateDoctorInfo.age = reqInfo.age;
  //     needUpdateDoctor = 1;
  // }
  // if(reqInfo.hasOwnProperty('workYears')) {
  //     updateDoctorInfo.work_years = reqInfo.workYears;
  //     needUpdateDoctor = 1;
  // }
  // if(reqInfo.hasOwnProperty('description')) {
  //     updateDoctorInfo.description = reqInfo.description;
  //     needUpdateDoctor = 1;
  // }
  // if(reqInfo.hasOwnProperty('avatar')) {
  //     updateDoctorInfo.avatar = reqInfo.avatar;
  //     needUpdateDoctor = 1;
  // }
  if(req.body.userId === '') {
      query = {'_id': req.idinToken};
  } else if(req.permissionInToken == 'admin') {
      query = {'_id': req.body.userId};
  } else {
      res.status(403).send({ status: false, message: "无更新权限" });
      return;
  }
  
  User.findOneAndUpdate(query, updateUserInfo, null, (err, user) => {
      if(err) {
          res.status(500).send({ status: false, message: err });
          return;
      }
      if(needUpdateDoctor) {
          Doctor.findOneAndUpdate({ _id: user.doctor_id._id }, updateDoctorInfo, null, (err, user) => {
              if(err) {
                  res.status(500).send({ status: false, message: err });
                  return;
              }
              res.status(200).send({ status: true, message: "更新成功" });
          });
      } else {
          res.status(200).send({ status: true, message: "更新成功" });
      }
  });
}


module.exports = {
    getUser,
    getCertainUser
}