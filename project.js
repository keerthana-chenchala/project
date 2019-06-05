var Hapi=require('@hapi/hapi');
var mysql=require('mysql');

var server=new Hapi.Server({
    host:'localhost',
    port:4000
});
server.route({
    method:"GET",
    path:"/",
    handler:(request,reply)=>{
        return "Welcome to Project";
    }
})
server.route({
    method:"GET",
    path:"/api/producer",
    handler:(request,reply)=>{
        return new Promise((resolve,reject)=>{
            var connection = mysql.createConnection({
                host     : 'localhost',
                user     :'root',
                password : '',
                database : 'project'
              });
              connection.connect();
              connection.query(`SELECT * from producer`, function (error, results, fields) {
                if (error) reject(error);
                resolve(results);
              });
              connection.end();
        })
    }
})
server.route({
    method:"POST",
    path:"/api/producer",
    handler:(request,reply)=>{
        var newproducer=request.payload;
        if(newproducer.email.includes('@gmail.com')==false)
        {
            return 'enter the valid email';
        }
        else{
        return new Promise((resolve,reject)=>{
            var connection = mysql.createConnection({
                host     : 'localhost',
                user     :'root',
                password : '',
                database : 'project'
              });
              connection.connect();
              connection.query(`INSERT INTO producer(producer_name,email,password,twitter_name,soundcloud_name,producer_status)
               VALUES('${newproducer.producer_name}','${newproducer.email}','${newproducer.password}',
               '${newproducer.twitter_name}','${newproducer.soundcloud_name}','${newproducer.producer_status}')`,
              function (error, res, fields) {
                if (error) reject(error);
                resolve(res);
              });
               
              connection.end();
        })
    }
    }

});
server.route({
    method:"GET",
    path:"/api/producer/{id}",
    handler:(request,reply)=>{
        var id=request.params.id;
        return new Promise((resolve,reject)=>{
            var connection = mysql.createConnection({
                host     : 'localhost',
                user     :'root',
                password : '',
                database : 'project'
              });
              connection.connect();
              connection.query(`SELECT * from producer where producer_id=${id}`, function (error, results, fields) {
                if (error) reject(error);
                resolve(results);
              });
              connection.end();
        })
    }
})
server.route({
    method:"DELETE",
    path:"/api/producer/{id}",
    handler:(request,reply)=>{
        var id=request.params.id;
        return new Promise((resolve,reject)=>{
            var connection = mysql.createConnection({
                host     : 'localhost',
                user     :'root',
                password : '',
                database : 'project'
              });
              connection.connect();
              connection.query(`delete from producer where producer_id=${id} `, function (error, res, fields) {
                if (error) reject(error);
                resolve(res);
              });
              connection.query(`delete from beats where producer_id=${id}`, function (error, res, fields) {
                if (error) reject(error);
                resolve(res);
              });
              connection.end();
        })
    }
})
server.route({
    method:"PUT",
    path:"/api/producer/{id}",
    handler:(request,reply)=>{
        var id=request.params.id;
        var newproducer=request.payload;
        return new Promise((resolve,reject)=>{
            var connection = mysql.createConnection({
                host     : 'localhost',
                user     :'root',
                password : '',
                database : 'project'
              });
              connection.connect();
              connection.query(`UPDATE producer SET producer_name='${newproducer.producer_name}' WHERE producer_id=${id}`, 
            function (error, res, fields) {
            if (error) reject(error);
            resolve(res);
          });
              connection.end();
        })
    }
});
server.route({
    method:"GET",
    path:"/api/producer/{id}/approvedbeats",
    handler:(request,reply)=>{
        //var id=request.params.id;
        return new Promise((resolve,reject)=>{
            var connection = mysql.createConnection({
                host     : 'localhost',
                user     :'root',
                password : '',
                database : 'project'
              });
              connection.connect();
              connection.query(`SELECT * from beats where approved=1`, function (error, results, fields) {
                if (error) reject(error);
                resolve(results);
              });
              connection.end();
        })
    }
})
server.route({
    method:"GET",
    path:"/api/producer/{id}/submittedbeats",
    handler:(request,reply)=>{
        //var id=request.params.id;
        return new Promise((resolve,reject)=>{
            var connection = mysql.createConnection({
                host     : 'localhost',
                user     :'root',
                password : '',
                database : 'project'
              });
              connection.connect();
              connection.query(`SELECT * from beats where submit_date is not null`, function (error, results, fields) {
                if (error) reject(error);
                resolve(results);
              });
              connection.end();
        })
    }
})
server.route({
    method:"GET",
    path:"/api/beat/submitted",
    handler:(request,reply)=>{
        return new Promise((resolve,reject)=>{
            var connection = mysql.createConnection({
                host     : 'localhost',
                user     :'root',
                password : '',
                database : 'project'
              });
              connection.connect();
              connection.query(`SELECT * from beats where submit_date is not null and approved=0`, function (error, results, fields) {
                if (error) reject(error);
                resolve(results);
              });
              connection.end();
        })
    }
})
server.route({
    method:"GET",
    path:"/api/beat/{id}",
    handler:(request,reply)=>{
        var id = request.params.id;
        return new Promise((resolve,reject)=>{
            var connection = mysql.createConnection({
                host     : 'localhost',
                user     :'root',
                password : '',
                database : 'project'
              });
              connection.connect();
              connection.query(`SELECT * from beats where Beat_id=${id}`, function (error, results, fields) {
                if (error) reject(error);
                resolve(results);
              });
              connection.end();
        })
    }
})
server.route({
    method:"DELETE",
    path:"/api/beat/{id}",
    handler:(request,reply)=>{
        var id = request.params.id;
        return new Promise((resolve,reject)=>{
            var connection = mysql.createConnection({
                host     : 'localhost',
                user     :'root',
                password : '',
                database : 'project'
              });
              connection.connect();
              connection.query(`DELETE from beats where Beat_id=${id}`, function (error, results, fields) {
                if (error) reject(error);
                resolve(results);
              });
              connection.end();
        })
    }
})
server.route({
    method:"POST",
    path:"/api/beats",
    handler:(request,reply)=>{
        var np=request.payload;
        if(np.Beat_name.includes('MUST LISTEN'))
            return 'enter valid Beatname';
        else
        {
        return new Promise((resolve,reject)=>{
            var connection = mysql.createConnection({
                host     : 'localhost',
                user     :'root',
                password : '',
                database : 'project'
              });
              connection.connect();
              connection.query(`INSERT INTO beats(Beat_name,Beat_url,approved,producer_id,submit_date,Approval_date,Post_date)  VALUES('${np.Beat_name}','${np.Beat_url}','${np.approved}','${np.producer_id}','${np.submit_date}','${np.Approval_date}','${np.Post_date}')`,function (error, res, fields) {
                if (error) reject(error);
                resolve(res);
              });
              connection.end();
        })
    }
    }

});
server.route({
    method:"PUT",
    path:"/api/beats/{id}/approve",
    handler:(request,reply)=>{
        var id=request.params.id;
        var n=request.payload;
        return new Promise((resolve,reject)=>{
            var connection = mysql.createConnection({
                host     : 'localhost',
                user     :'root',
                password : '',
                database : 'project'
              });
              connection.connect();
              connection.query(`update beats set Approval_date='${n.Approval_date}', Post_date='${n.Post_date}',approved=1 where Beat_id=${id}`,
              function(error,res,fields){
                  if(error) reject(error);
                  resolve(res);
              });
              connection.end();
        });
    }
});
server.route({
    method:"PUT",
    path:"/api/beats/{id}/unapprove",
    handler:(request,reply)=>{
        var id=request.params.id;
        return new Promise((resolve,reject)=>{
            var connection = mysql.createConnection({
                host     : 'localhost',
                user     :'root',
                password : '',
                database : 'project'
              });
              connection.connect();
              connection.query(`update beats set Approval_date=null, Post_date=null,approved=0 where Beat_id=${id}`,
              function(error,res,fields){
                  if(error) reject(error);
                  resolve(res);
              });
              connection.end();
        });
    }
});
server.route({
    method:"GET",
    path:"/api/beats/{start}/{end}/approved",
    handler:(request,reply)=>{
        var s=request.params.start;
        var e=request.params.end;
        return new Promise((resolve,reject)=>{
            var connection = mysql.createConnection({
                host     : 'localhost',
                user     :'root',
                password : '',
                database : 'project'
              });
              connection.connect();
              connection.query(`select * from beats where approved=1 and submit_date between '${s}' and '${e}'`,
              function(error,res,fields){
                  if(error) reject(error);
                  resolve(res);
              });
              connection.end();
        });
    }
});
server.route({
    method:"GET",
    path:"/api/beats/{start}/approved",
    handler:(request,reply)=>{
        var s=request.params.start;
        return new Promise((resolve,reject)=>{
            var connection = mysql.createConnection({
                host     : 'localhost',
                user     :'root',
                password : '',
                database : 'project'
              });
              connection.connect();
              connection.query(`select * from beats where approved=1 and submit_date between '${s}' and now()`,
              function(error,res,fields){
                  if(error) reject(error);
                  resolve(res);
              });
              connection.end();
        });
    }
});
server.route({
    method:"GET",
    path:"/api/beats/pending",
    handler:(request,reply)=>{
        var s=request.params.start;
        return new Promise((resolve,reject)=>{
            var connection = mysql.createConnection({
                host     : 'localhost',
                user     :'root',
                password : '',
                database : 'project'
              });
              connection.connect();
              connection.query(`select * from beats where approved=1 and Approval_date > now()`,
              function(error,res,fields){
                  if(error) reject(error);
                  resolve(res);
              });
              connection.end();
        });
    }
});
server.start((err)=>{
    if(err) throw err;
    console.log("Server is started")
});