const express = require('express');
const mongoose = require('mongoose');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server, { cors: {origin: "*"} });
const settings = require('./routes/variables');

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: false }));

// Connect database
var dbURI = "hahnicetry"
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
 .then(result => {
    server.listen(3000, () => {
        console.log('Server running...');
    });
 })
 .catch(err => console.log(err));

// Routes
var loginRouter = require('./routes/login');
app.use('/login', loginRouter);

var registerRouter = require('./routes/register');
app.use('/register', registerRouter);

var homeRouter = require('./routes/home');
app.use('/', homeRouter);

io.on('connection', (socket) => {
    console.log('User connected with ID: ' + socket.id);

    socket.on('send-message', (msg) => {
        io.sockets.in(settings.currRoom).emit('receive-message', msg, settings.currUser);
    });

    socket.on('join-room', (room, cb) => {
        socket.join(room);
        settings.currRoom = room;
        cb('You joined ' + room);
    })
});