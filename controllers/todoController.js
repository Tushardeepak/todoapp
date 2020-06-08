var bodyParser = require('body-parser');
var mongoose = require('mongoose');


//connect to database
mongoose.connect('mongodb+srv://tussha2220:tussha2220@todo-0ryb5.mongodb.net/tussha2220?retryWrites=true&w=majority');

//create a schema 
var todoSchema = new mongoose.Schema({
    item: String
});

var Todo = mongoose.model('Todo', todoSchema);


var urlencodedParser = bodyParser.urlencoded({extended: false});

module.exports = function(app){

    app.get('/todo', function(req,res){
        Todo.find({},function(err, data ){
            if (err) throw err;
            res.render('todo', {todos: data});
        });
        

    });

    app.post('/todo',urlencodedParser, function(req,res){
        var newTodo = Todo(req.body).save(function(err,data){
            if (err) throw err;
            res.json({todos: data});
        })
 });

    app.delete('/todo/:item', function(req,res){
        Todo.find({item: req.params.item.replace(/\-/g, " ")}).remove(function(err, data){
            if (err) throw err;
            res.json({todos: data});
        });
        
    });
};