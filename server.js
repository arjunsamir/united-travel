// 1. IMPORT REQUIRED MODULES

// Import Core Modules
const https = require('https');
const http = require('http');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const devcert = require('devcert');






// 2. IMPORT ENVIORNMENT & START SERVER


// Initialize Enviornment Variables
dotenv.config({ path: './config.env' });

// Import Express
const app = require('./app');


const port = process.env.PORT || 3000;

let server;


// Initialize Server
const initDev = async () => {

    console.log('Starting development server');
    
    // const ssl = await devcert.certificateFor('my-app.test');
    // server = https.createServer(ssl, app).listen(port, () => {
    //     console.log(`✊🏾App running on port ${port}`);
    // });

    server = app.listen( port, () => {

        console.log(`✊🏾App running on port ${port}`);
    
    });

    

}


const initProd = () => {

    console.log('starting production server');

    server = app.listen( port, () => {

        console.log(`✊🏾App running on port ${port}`);
    
    });

}


if (process.env.NODE_ENV === 'production') initProd();
else initDev();



// 3. INITIALIZE DATABASE CONNECTION
mongoose.connect(process.env.DB, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
})
.then(() => console.log('🙏🏾DB Connection Succesful'))
.catch(err => console.log(err));



// Listen For Errors
process.on('unhandledRejection', err => {
    console.log('💥UNHANDLED REJECTION! Shutting down application...');
    console.log(err.name, err.message);
    server.close(() => process.exit(1));
});

// Listen For Restart
process.on('SIGTERM', () => {
    console.log('👏🏾SIGTERM REVIEVED. Shutting down gracefully');
    server.close(() => console.log('👌🏾 Process Terminated!'));
});