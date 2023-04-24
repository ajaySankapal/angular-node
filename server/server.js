const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const cloudinary = require('cloudinary')
const userRoutes = require('./routes/userRoutes')
const productRoutes = require('./routes/productRoutes')
const { connectDatabase } = require('./config/database')
require('dotenv').config()

cloudinary.v2.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
})
//connect database
connectDatabase()

const app = express()

app.use(express.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cors())
app.get('/', (req, res) => {
    res.send('API is working correctly!')
})

const http = require('http').Server(app);
const io = require('socket.io')(http, {
    cors: {
        origin: "*"
    }
});

io.on('connection', (socket) => {
    console.log('user connected');

    socket.on('message', message => {
        console.log('message received: ', message);
        socket.broadcast.emit('message', message);
    });
    socket.on('productUpdated', update => {
        socket.broadcast.emit('productUpdated', update);
    })

    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});

app.use((req, res, next) => {
    req.io = io;
    next();
});
//routers
app.use('/api/user', userRoutes)
app.use('/api/product', productRoutes)

const PORT = process.env.PORT || 5000

http.listen(PORT, () => {
    console.log(`Server is listening on port: ${PORT}`);
})