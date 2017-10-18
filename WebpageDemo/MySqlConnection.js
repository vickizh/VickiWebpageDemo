var mysql  = require('mysql');  //调用MySQL模块
var Test_database = 'TableList'; //test the add item to database
var Test_table  = 'MajorSkills'; //add it to page list
var Test_table1 = 'Page';

//create connection
var connection = mysql.createConnection({
    host     : '127.0.0.1',       //主机
    user     : 'root',               //MySQL认证用户名
    password : 'fuermosi',        //MySQL认证用户密码
    port: '3306',                   //端口号
    database: Test_database       //database
});
//connection detection
connection.connect(function(err){
    if(err){
        console.log('[query] - :'+err);
        return;
    }
    console.log('[connection connect]  succeed!');
});
//执行SQL语句
connection.query('SELECT 1 + 1 AS solution', function(err, rows, fields) {
    if (err) {
        console.log('[query] - :'+err);
        return;
    }
    console.log('The solution is: ', rows[0].solution);
});


//add some testing data in the database
// var  userAddSql = 'INSERT INTO Page(userid,Department,Topicname,PS) VALUES(0,?,?,?)';
// var  userAddSql_Params = ['Wilson', 'unkown','Pstest'];
var  userAddSql = 'INSERT INTO MajorSkills(PS,Majorname,Value) VALUES(Wilson,jidjisji,1) '+'INSERT INTO Page(userid,Department,Topicname,PS) VALUES(1,ssd,,sds,sds) ';
// var  userAddSql_Params = ['Wilson', 'jidjisji',1];
// add
connection.query(userAddSql,function (err, result) {
    if(err){
        console.log('[INSERT ERROR] - ',err.message);
        return;
    }
    console.log('-------INSERT----------');
    //console.log('INSERT ID:',result.insertId);
    console.log('INSERT ID:',result);
    console.log('#######################');
});

//search the database
connection.query("use " + Test_database);
connection.query(
    'SELECT * FROM '+Test_table,
    'SELECT * FROM '+Test_table1,
    function selectCb(err, results, fields) {
        if (err) {
            throw err;
        }
        if(results)
        {
            for(var i = 0; i < results.length; i++)
            {
                console.log("%d\t%s\t%s", results[i].PS, results[i].Majorname, results[i].Value);
            }
        }
    }
);



//close connection
connection.end(function(err){
    if(err){
        return;
    }
    console.log('[connection end] succeed!');
});