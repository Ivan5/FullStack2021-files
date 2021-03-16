require('dotenv').config()
require('./mongo')

const express = require('express')
const cors = require('cors')
const app = express()
const Note = require('./models/Note')


app.use(cors())


// Response json 
app.use(express.json())



// Endpoint principal.
app.get('/', (req, res) => {
    res.send('<h1>Hello Wordl</h1>')
})

// Endpoint `/api/notes`
app.get('/api/notes', (req, res) => {
    Note.find({}).then(notes => {
        res.json(notes)
    })
})

app.get('/api/notes/:id', (req, res) => {
    const { id } = req.params
    Note.findById(id).then(note => {
        if (note) {
            return res.json(note)
        } else {
            res.status(4004).end()
        }
    })
})

app.delete('/api/notes/:id', (req, res) => {
    const { id } = res.params
    Note.findByIdAndRemove(id).then(result => {
        return res.status(204)
    })

})

app.put('/api/notes/:id', (req, res) => {
    const { id } = req.params

    const note = req.body

    const newNoteInfo = {
        content: note.content,
        important: note.important
    }

    Note.findByIdAndUpdate(id, newNoteInfo, { new: true }).then(result => {
        return res.status(200).json(result)
    })
})

app.post('/api/notes', (req, res) => {
    const note = req.body

    if (!note || !note.content) {
        return res.status(400).json({
            error: 'note.content is missing'
        })
    }

    const newNote = new Note({
        content: note.content,
        date: new Date(),
        important: note.important || false
    })

    newNote.save().then(savedNote => {
        res.status(201).json(savedNote)
    })

})



const PORT = 3001;
const server = app.listen(PORT, () => {
    console.log(`Server running in port ${PORT}`)
})

module.exports = { app, server }