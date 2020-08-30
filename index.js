var express=require('express');
var socket=require('socket.io');

//App setup
var app=express();
var server=app.listen(3000,function(){
    console.log('listening to port 3000');
});

//static files
app.use(express.static('public'));

//socket setup
var io=socket(server);

io.on('connection',function(socket){
    console.log('made socket connection',socket.id);

    socket.on('chat',function(data){    //on chat event, fire function with data (handle,message)
        io.sockets.emit('chat',data); //emitting event down all sockets and send data back to all of them
    });

    socket.on('typing',function(data){
        socket.broadcast.emit('typing',data);
    });
});

