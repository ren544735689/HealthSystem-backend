var dbconfig = require('../util/DBConfig');

var token_key = 'se';

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

var login=(req, res) => {
    let id = req.body.id;
    let password = req.body.password;
    var sql = 'select * from user where id=? and password=?';
    var sqlArr = [id,password];
    var callBack = (err,data)=>{
        if(err){
            res.status(500).send({ status: false, message: err });
        }
        else{
            var token = jwt.sign({id: res.query.id}, tokent_key, {
                expiresIn: 86400 // 24 hours
            });
            var resObj = {
                status: true,
                message: "login success",
                token: token,
                userData: {
                    userId: data,
                    userName: user.username,
                    userPermission: user.type,
                    userStatus: user.status,
                    userInfo: {
                        xingbie: user.gender
                    }
                }
            };
            res.status(200).send(resObj);
        }
    }

    dbconfig.sqlConnect(sql,sqlArr,callBack);
};

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


// 模拟验证码登录


function rand(min,max){
  return Math.floor(Math.random()*(max-min))+min;
}

var validatePhoneCode = [];

// check if send personal code message
let sendCodeP = (phone)=>{
  for(var item of validatePhoneCode){
    id(phone == item.phone){
      return true;
    }
  }
  return false;
}

// check if personal code message true
let findCodeAndPhone = (phone,code)=>{
  for(var item of validatePhoneCode){
    if(phone==item.phone&&code=item.code){
      return 'login'
    }
  }
  return 'error'
}

// send personal code message
var sendCode=(req,res)=>{
  let phone = req.query.phone;
  if(sendCodeP(phone)){
    res.send({
      'code':400,
      'msg':'personal code message has been sent, please wait!'
    })
  }
  let code = rand(1000,9999);
  validatePhoneCode.push({
    'phone':phone,
    'code':code
  })
  console.log(validatePhoneCode)
  res.send({
    'code':200,
    'msg':'successfully send message!'
  })
  console.log(code)
}

//personal code message login
codePhoneLogin = (res,req)=>{
  let{phone,code}=req.query;
  if(sendCodeP(phone)){
    let state = findCodeAndPhone(phone,code);
    if(statue=='login'){
      res.send({
        'code':200,
        'msg':'login success!'
      })
    }else if(statue=='error'){
      res.send({
        'code':200,
        'msg':'login failed! code error!'
      })
    }
  }else{
    res.send({
      'code':400,
      'msg':'sorry, this phone has not been sent personal code message.'
    })
  }
}

module.exports = {
    getUser,
    getCertainUser,
    sendCode,
    codePhoneLogin
}