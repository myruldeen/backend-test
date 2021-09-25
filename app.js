const express = require('express');
const logger = require('morgan');
const cors = require('cors');

const app = express();

app.use(cors());
app.options('*', cors());
app.use(express.json()) 
app.use(express.urlencoded({ extended: true })) 
app.use(logger('tiny'))

// get all comments by post id

app.get('/v1', (req, res) => {
    res.json('api v1');
})

app.use('/v1/posts', require('./routes/post'));

app.listen(3000, () => {
    console.log('server started on port 3000');
})

