const express = require("express");
const bodyParser = require("body-parser");
const path=require('path');
const http=require("http")
const ejs =require('ejs');
const socketio=require("socket.io");
const Filter=require('bad-words')
const { generateMessage,generateLocationMessage }=require('./utils/messages')
const {addUser,removeUser,getUsersInRoom, getUser}=require('./utils/users')

const app = express();
const server=http.createServer(app)
const io=socketio(server)


app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static('.'));


// ------------Socket.io------------

io.on('connection', (socket) => {
    console.log('New WebSocket connection')

    socket.on('join', (options, callback) => {
        const { error, user } = addUser({ id: socket.id, ...options })

        if (error) {
            return callback(error)
        }

        socket.join(user.room)

        socket.emit('message', generateMessage('Admin', 'Welcome!'))
        socket.broadcast.to(user.room).emit('message', generateMessage('Admin', `${user.username} has joined!`))

        callback()
    })

    socket.on('sendMessage', (message, callback) => {
        const user = getUser(socket.id)
        const filter = new Filter()

        if (filter.isProfane(message)) {
            return callback('Profanity is not allowed!')
        }

        io.to(user.room).emit('message', generateMessage(user.username, message))
        callback()
    })

    socket.on('sendLocation', (coords, callback) => {
        const user = getUser(socket.id)
        io.to(user.room).emit('locationMessage', generateLocationMessage(user.username, `https://google.com/maps?q=${coords.latitude},${coords.longitude}`))
        callback()
    })

    socket.on('disconnect', () => {
        const user = removeUser(socket.id)

        if (user) {
            io.to(user.room).emit('message', generateMessage('Admin', `${user.username} has left!`))
        }
    })
})
// ----------Socket.io------------


app.get("/",function(req,res){
    return res.render("home",{
        title: "Learner"});
   });

app.get("/discro",function(req,res){
    return res.render("discro",{
        title: "Discro"});
    });  

app.get("/discro-sas",function(req,res){
    return res.render("discro_chat",{
        title: "Discros"});  
    });

  
    
app.get("/sociate",function(req,res){
        return res.render("sociate",{
            title: "Sociate"});
           
     });
app.get("/herupa",function(req,res){
    return res.render("herupa",{
        title: "Herupa"});
       
    });
app.get("/unacademic",function(req,res){
    return res.render("unacademic",{
        title: "UnAcademic"});
       
    });


server.listen(3000,function(){
    console.log("Server running on Port 3000")
    });