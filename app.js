if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

  //configure Application Insights
const appInsights = require('applicationinsights');
// appInsights.setup(process.env.APPINSIGHTS_INSTRUMENTATIONKEY).start();
const express = require('express');
const app = express();
const api = require('./Route/route');
const novusapp = require('./NovusBIApp/NovusRoute/AppRoute');
const jwt = require('jsonwebtoken');
var cors  = require('cors')
var redisClient = require('./cache').createClient();
const curl = require( 'curl' );
var request = require('request');
app.use(express.static("uploads"));
app.use(cors());
const {Port} = require('./lib/config')


//=================== Enable CORS =============================================

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }
    next();
});

//==================== Get the Access Token ====================================
//==================== TODO: Validate the JWT token ============================

app.use((req, res, next) => {
    if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
        const token = req.headers.authorization.split(' ')[1]; 
        if (token) {
            return jwt.verify(token,'secret', (err, userData) => {   
                if(err){
                     const errmessage = {
                        "success":false,
                        "message": "Token Expire Please Login",
                        "status":401,
                     }
                     res.send(errmessage)
                }else{
                    req.user = {
                        id      : userData.id,
                        username: userData.user_name,
                        user_name: userData.username,
                        application_id  : userData.application_id,
                        email   : userData.email,
                        role_id : userData.role_id,
                        company : userData.company,
                        status  : userData.status,
                        application_id: userData.application_id,
                        country : userData.country,
                        token   : token,
                        exp     : userData.exp
                    }
                }
                return next();
            });
        }
        return res.unauthorized();
    }
    next();
});

//======================= middlewares ==========================

app.use('/api',api);
app.use('/novusapp',novusapp);

const port = Port || 3000;
app.listen(port,()=> {
    console.log(`server running at port ${port}`)
});