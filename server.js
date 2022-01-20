const express = require('express')
const app = express()
require('dotenv').config()
const morgan = require('morgan')
const mongoose = require('mongoose')
const expressJwt = require('express-jwt')
const path = require('path')

const port = process.env.PORT || 9000;

const secret = process.env.SECRET || "ridiculous kangaroo tithing splendidly"

app.use(express.json())
app.use(morgan('dev'))

// mongoose.connect(
//     'mongodb://localhost:27017/user-authentication',
//     {
//         useNewUrlParser: true,
//         useUnifiedTopology: true,
//         useCreateIndex: true,
//         useFindAndModify: false
//     },
//     () => console.log('Connected to the DB')
// )

mongoose.connect(process.env.MONGODB_URI, 
    {   useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false 
    }
)

app.use(
    '/auth', 
    require('./routes/authRouter.js'), 
    expressJwt({
        secret: secret,
        algorithms: ['HS256']
    })
)

app.use('/api', expressJwt({
    secret: secret,
    algorithms: ['HS256']
}))

app.use('/api/issues', require('./routes/issueRouter.js'))
// app.use('/api/issues/:issueId/comments', require('./routes/commentRouter.js'))

app.use(express.static(path.join(__dirname, 'client', 'build')))


app.use((err, req, res, next) => {
    console.log(err)
    if(err.name === 'UnauthorizedError'){
        res.status(err.status)
    }
    return res.send({errMsg: err.message})
})

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'))
})

app.listen(port, () => {
    console.log('Listening on ' + port)
})