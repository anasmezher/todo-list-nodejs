const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
var mongodb = require('mongodb');
var bodyParser = require('body-parser')
require('mongoose').set('debug', true);
var fs = require('fs');
//connecting to database

mongoose.connect('mongodb://localhost/mynewone');

let db = mongoose.connection;
// open and check database connection
db.once('open', () => {
    console.log('connected successfully ..... ^_^');

});
//check database errors
db.on('error', (err) => {
    console.log(err);
});


//init app
const app = express();
let Todolist = require('./models/todolist');
//init view
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(bodyParser.urlencoded({
    extended: false
}))

// parse application/json
app.use(bodyParser.json())
app.use(express.static(path.join(__dirname, 'public')));



app.get('/', (req, res) => {
    db.db.collection("mynewtodolist", function(err, collection) {

        collection.find({}).toArray(function(err, data) {
            if (err) {
                console.log(err);
            } else {
                res.render('index', {
                    title: "dsdsd",
                    name: 'Anas',
                    todolistt: data
                });
            }

        })
    });


});
app.delete('/delete/:id', function(req, res) {
    var myquery = {
        _id: new mongodb.ObjectID(req.params.id)
    };

    db.collection("mynewtodolist").remove(myquery, function(err, obj) {
        if (err) {
            throw err;
        } else {
            console.log(obj.result.n + " document(s) deleted");
            res.send('success');
        }
    });


});
app.post('/add', function(req, res) {
    var myobj = {
        title: req.body.title,
        summery: req.body.desc,
        date: req.body.date,
        time: req.body.time
    };
    if (req.body.title != undefined) {
        db.collection("mynewtodolist").insertOne(myobj, function(err, obj) {
            if (err) throw err;
            else {
                console.log("this is id : " + obj.htmlLink);
                //res.redirect('/');
            }
        });
    }
});
app.post('/addfromapi', function(req, res) {

    db.collection("mynewtodolist").drop(function(err, delOK) {
        if (err) console.log("Collection is empty");
        if (delOK) {
            console.log("Collection deleted");
        }

        console.log(req.body);
        //var jsontxt = req.body.toString();
        var myjson = JSON.stringify(req.body);
        var jsonContent = JSON.parse(myjson);
        console.log('mmmmmmmm' + jsonContent.data);
        var mydata = jsonContent.data;
        var mydatalist = mydata.split("}??eventssplit&&{");
        console.log('mydatalist' + mydatalist[0]);
        var insertquery = [];
        var loopCompletion = false;
        for (i = 0; i < mydatalist.length; i++) {
            var myinnerdata = mydatalist[i];
            var myinnerdatalist = myinnerdata.split("??events2data&&");
            var TIT = myinnerdatalist[0];
            var DATE = myinnerdatalist[1];
            var TIM = myinnerdatalist[2];
            var IDD = myinnerdatalist[3];
            var DES = myinnerdatalist[4];
            var mytitle = TIT.split("??eventsdata&&");
            var mydate = DATE.split("??eventsdata&&");
            var mytime = TIM.split("??eventsdata&&");
            var myid = IDD.split("??eventsdata&&");
            var mydescription = DES.split("??eventsdata&&");
            if ((i + 1) == mydatalist.length) {
                var dd = mydescription[1];
                mydescription = dd.split("}??eventssplit&&");
								mydescription[1]=mydescription[0];
                loopCompletion = true;
            }
            //	insertquery.push({ title: mytitle[1], summery:mydescription[1] ,date:mydate[1] ,time:mytime[1],googleID : myid[1]});
            var mydatatoq = {
                title: mytitle[1],
                summery: mydescription[1],
                date: mydate[1],
                time: mytime[1],
                googleID: myid[1]
            };
            insertquery.push(mydatatoq);
            if (loopCompletion == true) {
                console.log("loopCompletion");
                db.collection("mynewtodolist").insertMany(insertquery, function(err, obj) {
                    if (err) {
                        console.log(err);
                    } else {
                        console.log(obj.insertedCount + " : INSERTED");
                        res.redirect('/');
                    }
                });
            }
        }
    });
});


app.post('/', function(req, res) {
    var myquery = {
        _id: new mongodb.ObjectID(req.body.ID)
    };
    var myobj = {
        $set: {
            title: req.body.title,
            summery: req.body.desc,
            date: req.body.date,
            time: req.body.time
        }
    };
    db.collection("mynewtodolist").updateOne(myquery, myobj, function(err, obj) {
        if (err) throw err;
        else {
            console.log(myobj);
            res.redirect('/');
        }
    });
});

//starting server
app.listen(3000, () => {
    console.log('app runs on port 3000');
});
