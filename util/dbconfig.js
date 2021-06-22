const mysql = require('mysql');
module.exports = {
    // db config
    config:{
        host: 'localhost',
        user: 'root',
        password: 'password',
        port: 3306,
        database: 'healthsystem'
    },

    // connect to db, using pool
    sqlConnect:function(sql,sqlArr,callBack){
        var pool = mysql.createPool(this.config)
        pool.getConnection((err,conn)=>{
            console.log('connecting...')
            if(err){
                console.log('connect failed!')
                return; 
            }
            
            // event callback
            conn.query(sql,sqlArr,callBack);
            
            // release the connection
            conn.release();
            }
        })
    }
}


var db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    port: 3306,
    database: 'healthsystem'
});



db.connect(function (err){
    if(err){
        console.log("connection failed!");
    }
    else{
        console.log("connection success!");
    }
})

db.query("create table person(id int,user varchar(255),password varchar(255))", function (err, result) {
    if (err) {
        throw err
    }
    else{
        console.log("create ok")
    }
})

db.query("select * from user", function (err, result) {
    if (err) {
        throw err
    }
    else {
        console.log("select ok")
    }
})

db.query("delete from user where id = 1", function(err,result){
    if(err) {
        throw err
    }
    else{
        console.log("delete ok")
    }
})

