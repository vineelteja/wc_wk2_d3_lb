require('dotenv').config()
const mg = require('mongoose')

mg.connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
mg.connection.on('open', ()=>{
    console.log("Mongoose connection Open")
}).on('error', (err) => {
    console.log(`connection error: ${err.message}`)
})

require('./models/Registration')
const app = require('./app')
const server = app.listen(3000, ()=>{
    console.log(`Express is running on port ${server.address().port}`);
})