const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const authRouter = require('./auth/authRouter');

const server = express();
const port = process.env.PORT || 5000;

server.use(cors());
server.use(helmet());
server.use(express.json());
server.use('/auth', authRouter);

server.get('/', (req, res, next) => {
    res.json({
        message: 'Welcome to the department API'
    })
});

server.use((err, req, res, next) => {
   console.log(err);
   res.status(500).json({
       errorMessage: 'Server side error, please try again'
   })
});

server.listen(port, () => {
   console.log(`Running at http://localhost:${port}`)
});
