var express = require('express'), db = require('./model/db'), routes = require('./routes'), http = require('http'), path = require('path');



var app = express();

app.configure(function(){
    app.set('port', process.env.PORT || 3000);
    app.set('views', __dirname + '/views');
    app.set('view engine', 'jade');
    app.use(express.favicon());
    app.use(express.logger('dev'));
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(app.router);
    app.use('/browser', express.static(__dirname + '/browser'));
    //app.use(express.static(path.join(__dirname, 'browser')));
    //app.use(express.static(__dirname + '/browser'));
});

app.configure('development', function(){
    app.use(express.errorHandler());
});

app.get('/', routes.index);

app.get('/api/lists',function(req, res){
    return db.List.find(function(err, lists){
        res.send(lists);
    });
});


app.get('/api/lists/:id',function(req, res){
    return db.List.findById(req.params.id,function(err, list){
        if(!err){
            return res.send(list);
        }else{
            return console.log(err);
        }
    });
});


app.get('/api/lists/:id/listOptions',function(req, res){
    return db.List.findById(req.params.id,function(err, list){
        if(!err){
            return res.send(list.listOptions);
        }else{
            return console.log(err);
        }
    });
});


app.put('/api/lists/:id',function(req, res){
    return db.List.findById(req.params.id, function(err, list){
        list.label = req.body.label;
        list.listOptions = req.body.listOptions;

        list.save(function(err){
            if(err){
                console.log(err);
            }else{
                console.log('updated');
            }
        });

        res.send(list);
    });
});

app.delete('/api/lists/:id',function(req, res){
    return db.List.findById(req.params.id, function(err, list){
        list.remove(function(err){
            if(err){
                console.log(err);
            }else{
                console.log('deleted');
                res.send('');
            }
        });
        res.send(list);
    });
});


app.post('/api/lists',function(req, res){

    var list = new db.List({
        label:req.body.label,
        listOptions:req.body.listOptions
    });

    list.save(function(err){
        if (!err) {
            return console.log("created");
        } else {
            return console.log(err);
        }
    });

    return res.send(list);


});


app.get('/list', function(req, resp){
    db.List.find(function(err, lists){
        resp.render('list', {
            title:'List Title',
            lists:lists
        });
    });
});

http.createServer(app).listen(app.get('port'), function(){
    console.log("Express server listening on port " + app.get('port'));
});