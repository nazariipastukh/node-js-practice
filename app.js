// Event emitter

// const Event = require('node:events')
//
// const eventEmitter = new Event()
//
// eventEmitter.on('click', () => {
//     console.log('on click')
// })
//
// eventEmitter.once('click', () => {
//     console.log('click once')
// })
//
// eventEmitter.emit('click')
// eventEmitter.emit('click')
// eventEmitter.emit('click')
// eventEmitter.emit('click')
// eventEmitter.emit('click')

// Stream

// const fs = require('node:fs')
// const path = require('path')
//
// const readStream = fs.createReadStream(path.join(__dirname, 'folder', 'data'), {highWaterMark: 500})
// const writeStream = fs.createWriteStream(path.join(__dirname, 'folder', 'data1'))
//
// readStream.on('data', (chunk)=>{
//     console.log(chunk)
//     // writeStream.write(chunk)
// })
//
// readStream.pipe(writeStream)
//
// readStream.on('error', ()=>{
//     console.log('error')
//     readStream.destroy()
//     writeStream.end('error')
// })

// Express

const express = require('express')

const app = express()
const PORT = 5000

app.use(express.json())
app.use(express.urlencoded({extended: true}))

const users = [
    {id: 1, name: "Ivan", age: 25, email: "ivan@example.com"},
    {id: 2, name: "Maria", age: 30, email: "maria@example.com"},
    {id: 3, name: "Petro", age: 28, email: "petro@example.com"},
    {id: 4, name: "Olga", age: 22, email: "olga@example.com"},
    {id: 5, name: "Andriy", age: 35, email: "andriy@example.com"},
    {id: 6, name: "Natalia", age: 29, email: "natalia@example.com"},
    {id: 7, name: "Viktor", age: 27, email: "viktor@example.com"},
    {id: 8, name: "Oksana", age: 31, email: "oksana@example.com"},
    {id: 9, name: "Irina", age: 26, email: "irina@example.com"},
    {id: 10, name: "Mikhailo", age: 33, email: "mikhailo@example.com"}
];

app.listen(PORT, () => {
    console.log(`Server has successfully started on PORT: ${PORT}`)
})

app.get('/users', (req, res) => {
    res.json({
        data: users
    })
    console.log('get users')
})

app.get('/users/:id', (req, res) => {
    const {id} = req.params

    res.json({
        data: users[+id - 1]
    })
    console.log(`get ${id}`)
})

app.post('/users', (req, res) => {
    users.push(req.body)

    res.status(201).json({
        message: 'User Created'
    })

    console.log(`posted ${req.body.id}`)
})

app.delete('/users/:id', (req, res)=>{
    const {id} = req.params

    users.splice(+id-1, 1)

    res.status(200).json({
        message: 'User Deleted'
    })

    console.log(`deleted ${id}`)
})

app.put('/users/:id', (req, res) =>{
    const {id} = req.params

    users[id-1] = req.body

    res.status(204).json({
        message: 'User Updated'
    })
    console.log(`updated ${id}`)
})