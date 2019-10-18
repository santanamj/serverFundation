const express = require ('express');
const app  = express();
const mongoose = require ('mongoose');
mongoose.Promise = global.Promise;
const bodyParser = require('body-parser');
const path = require ('path');
const cors = require ('cors');
logger = require ('morgan');
const SourceMapSupport = require('source-map-support');
const router = express.Router();
const config = require ('./config/database');
app.set('port', (process.env.PORT || 8080));
const server = app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
const io = require('socket.io').listen(server);
const env = require('./env');
const authentication = require ('./router/user');

const category = require ('./router/category');
const product = require ('./router/product');
const order = require ('./router/order');
const bairro = require ('./router/bairro');
const address = require ('./router/address');
const orderController = require ('./controllers/order');
const subproduct = require('./router/subproducts');
app.use(cors('Access-Control-Allow-Origin', '*'));

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



app.use(bodyParser.urlencoded({ extended: false })); // parse application/x-www-form-urlencoded
app.use(bodyParser.json()); // parse application/json
app.use(logger('dev'));
SourceMapSupport.install();

app.use(bodyParser.json());
app.use('/api', address)
app.use('/api', bairro);
app.use('/api', category);
app.use('/api', product);
app.use('/api', subproduct);
app.use('/api', order);
app.use('/api', authentication);

// app.use('/api', pedido);



app.use('/static', express.static(__dirname + '/public'));
  app.get('/', (req,res) => {
      return res.end('Api working');
    });
   
    app.use((req, res, next) => {
      res.status(404).send('<h2 align=center>Page Not Found!</h2>');
    });
