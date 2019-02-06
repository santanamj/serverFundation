const express = require ('express');
const app  = express();
const mongoose = require ('mongoose');
mongoose.Promise = global.Promise;
const bodyParser = require('body-parser');
const path = require ('path');
const cors = require ('cors');
logger = require ('morgan');
const router = express.Router();
const config = require ('./config/database');
const server = app.listen(8080);
const io = require('socket.io').listen(server);
const env = require('./env');
const authentication = require ('./router/user');
const category = require ('./router/category');
const product = require ('./router/product');
const order = require ('./router/order');
const orderController = require ('./controllers/order');

io.on('connection', (socket)=>{
  
  console.log("Connected to Socket!!"+ socket.id);
  socket.on('addPedido', (pedido) => {
    console.log('socketData: ', pedido);
    io.emit('pedido', pedido);
    console.log('data emit: ', pedido);

  });
})
mongoose.connect(config.uri,  { useNewUrlParser: true }, (err) => {
    // Check if database was able to connect
    if (err) {
      console.log('Could NOT connect to database: ', err); // Return error    ssage
    } else {
      console.log('Connected to ' + config.db); // Return success message
    }
  });
// ROUTER SERVICE

app.use((req, res) => res.sendFile(INDEX) )

app.use(cors ('Access-Controll-Allow-Origin', '*'));

app.use(bodyParser.json());

app.use('/api', category);
app.use('/api', product);
app.use('/api', order);
app.use('/api', authentication);
// app.use('/api', pedido);



app.use('/static', express.static(__dirname + '/public'));
  app.get('/', (req,res) => {
      return res.end('Api working');
    });
   
// Start Server: Listen on port 8080
