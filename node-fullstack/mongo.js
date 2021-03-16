const mongoose = require('mongoose')



const { MONGODB_URI, MONGODB_URI_TEST, NODE_ENV } = process.env

const connectionString = NODE_ENV === 'test' ? MONGODB_URI_TEST : MONGODB_URI

//conexion a mongoDB
mongoose.connect(connectionString, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
    .then(() => {
        console.log('Database Connected')
    })
    .catch(err => {
        console.log(err)
    })




/*Note.find({}).then(result => {
    console.log(result);
    mongoose.connection.close()
})*/

/*const note = new Note({
    content: 'Mongo',
    date: new Date(),
    important: true
})

note.save()
    .then(result => {
        console.log(result)
        mongoose.connection.close()
    })
    .catch(err => {
        console.log(err)
    })
*/