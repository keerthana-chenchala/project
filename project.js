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
//producer apis
//Returns all the producers from the database
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
//creates a new producer in the database with validations
server.route({
    method:"POST",
    path:"/api/producer",
    handler:(request,reply)=>{
        var newproducer=request.payload;
        if(newproducer.email.includes('@gmail.com')==false || newproducer.producer_name.includes('XxXxX')) 
        {
            return 'enter the valid email and producer name';
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
//returns all fieids of the producer for the given id
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
});
//Deletes a given producer in the database that deletes all their beats too
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
});
//Modifies the feild of the given producer
server.route({
    method:"PUT",
    path:"/api/producer/{id}",
    handler:(request,reply)=>{
        var id=request.params.id;
        var newproducer=request.payload;
        if(newproducer.producer_name.includes('XxXxX')){
            return 'enter valid producer name';
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
              connection.query(`UPDATE producer SET producer_name='${newproducer.producer_name}' WHERE producer_id=${id}`, 
            function (error, res, fields) {
            if (error) reject(error);
            resolve(res);
          });
              connection.end();
        })
    }
    }
});
//Returns all beats for that producer that have been approved 
server.route({
    method:"GET",
    path:"/api/producer/{id}/approvedbeats",
    handler:(request,reply)=>{
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
});
//Returns all beats for that producer that have been submitted
server.route({
    method:"GET",
    path:"/api/producer/{id}/submittedbeats",
    handler:(request,reply)=>{
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
});

//Beats apis
//Returns all beats that have been submitted and have not been approved
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
});
//returns the fields associated with the given beat
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
});
//Deletes the given submitted beat
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
              connection.query(`DELETE from beats where Beat_id=${id} and submit_date is not null`, function (error, results, fields) {
                if (error) reject(error);
                resolve(results);
              });
              connection.end();
        })
    }
})
//submits a new beat
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
//Modifies the fields on the given beat
server.route({
    method:"PUT",
    path:"/api/beats/{id}",
    handler:(request,reply)=>{
        var id=request.params.id;
        var n=request.payload;
        if(n.Beat_name.includes('MUST LISTEN'))
        {
            return 'enter valid  beat name';
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
              connection.query(`update beats set Beat_name='${n.Beat_name}',Beat_url='${n.Beat_url}',approved='${n.approved}',producer_id='${n.producer_id}',submit_date='${n.submit_date}' where Beat_id='${id}'`,
              function(error,res,fields){
                  if(error) reject(error);
                  resolve(res);
              });
              connection.end();
        });
    }
}
});
//Approves the given beat this will add the approval date and set the date/time to be posted
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
//UnApproves the given beat this will remove the approval date and date/time to be posted
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
//returns all the beats that have been approved to be postedbetween the given start time and end time
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
//returns all the beats that have been approved to be postedbetween the given start date and current date
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
//returns all the beats that have been approved but the approval date has not yet happened
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