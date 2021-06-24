var dbconfig = require('../util/DBConfig');

// get userdata
var getUserdata = (req, res) => {
    var sql = "select * from userdata";
    var sqlArr = [];
    var callBack = (err, data) => {
        if (err) {
            console.log('err');
        } else {
            res.send({
                'list': data
            })
        }
    }

    dbconfig.sqlConnect(sql, sqlArr, callBack);
}

// add user data
var addUserdata = (req, res) => {
    let rid = req.body.rid;
    let uid = req.body.uid;
    let datetime = req.body.date;
    let weight = req.body.weight;
    let height = req.body.height;
    let bloodtype = req.body.bloodtype;
    let diastolic_pressure = req.body.diastolic_pressure;
    let systolic_pressure = req.body.systolic_pressure;
    let rest_heart_rate = req.body.rest_heart_rate;
    let blood_sugar_empty = req.body.blood_sugar_empty;
    let blood_sugar_full = req.body.blood_sugar_full;
    let blood_fat_TC = req.body.blood_fat_TC;
    let blood_fat_TG = req.body.blood_fat_TG;
    let blood_fat_LDL_C = req.body.blood_fat_LDL_C;
    let blood_fat_HDL_C = req.body.blood_fat_HDL_C;
    let vision_left = req.body.vision_left;
    let vision_right = req.body.vision_right;

    var sql = 'insert into userdata values(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)';
    var sqlArr = [rid, uid, datetime, weight, height, bloodtype, diastolic_pressure, systolic_pressure, rest_heart_rate, blood_sugar_empty, blood_sugar_full, blood_fat_TC, blood_fat_TG, blood_fat_LDL_C, blood_fat_HDL_C, vision_left, vision_right];
    var callBack = (err, data) => {
        if (err) {
            res.send({
                state: false,
                message: err
            });
        } else {
            res.send({
                state: true,
                message: "successfylly add userdata"
            })

        }
    }

    dbconfig.sqlConnect(sql, sqlArr, callBack);
}

//返回最新的档案记录的数据
var get_latest_userdata = (req, res) => {
    let uid = req.body.uid;
    var sql = 'select * from userdata where uid=? order by userdatatime DESC LIMIT 1';
    var sqlArr = [uid];
    var callBack = (err, data) => {
        if (err) {
            res.send({
                state: false,
                message: err
            });
        } else {
            if (data.length) {
                res.send({
                    state: true,
                    message: data
                })
            } else {
                res.send({
                    state: false,
                    message: "no such data for uid, sorry"
                })
            }
        }
    }

    dbconfig.sqlConnect(sql, sqlArr, callBack);
}

//返回最近5返回最近五次的血糖，血压，血脂，体重
var get_5_latest_userdata = (req, res) => {
    let uid = req.body.uid;
    var sql = 'select * from userdata where uid=? order by userdatatime DESC LIMIT 5';
    var sqlArr = [uid];
    var callBack = (err, data) => {
        if (err) {
            res.send({
                state: false,
                message: err
            });
        } else {
            if (data.length) {
                res.send({
                    state: true,
                    message: data
                })
            } else {
                res.send({
                    state: false,
                    message: "no such data for uid, sorry"
                })
            }
        }
    }

    dbconfig.sqlConnect(sql, sqlArr, callBack);
}


module.exports = {
    getUserdata,
    addUserdata,
    get_latest_userdata,
    get_5_latest_userdata
}