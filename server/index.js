require('dotenv').config();
const express = require('express');
      session = require('express-session'),
      {SERVER_PORT, SESSION_SECRET} = process.env,
      checkForSession = require('./middlewares/checkForSession'),
      swagController = require('./controllers/swagController'),
      authController = require('./controllers/authController'),
      cartController = require('./controllers/cartController'),
      searchController = require('./controllers/searchController')
      app = express()
      
app.use(express.json());
app.use(session({
    secret: SESSION_SECRET,
    resave: true,
    saveUninitiliazed: true
    })
);
app.use(checkForSession);
app.use(express.static(`${__dirname}/../build`));
//endpoints
app.post('/api/register', authController.register)
app.post('/api/login', authController.login)
app.post('/api/signout', authController.signout)
app.get('/api/user', authController.getUser)
//swag
app.get('/api/swag', swagController.read)
//cart
app.post('/api/cart/checkout', cartController.checkout)
app.post('/api/cart/:id', cartController.add)
app.delete('/api/cart/:id', cartController.delete)
//search
app.get('/api/search', searchController.search)

const port = SERVER_PORT;

app.listen(port, () => console.log(`Server on ${SERVER_PORT}`));