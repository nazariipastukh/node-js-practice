// modules

// const {sayHello} = require('./sayHello')

// sayHello()

// GlobalVariables

// console.log('dir:', __dirname)
// console.log('cwd', process.cwd())
// console.log('file', __filename)

// Path

// const path = require('node:path' )

// const myPath = path.join(__dirname, 'main.js')
// console.log(myPath)

// const normaPath = path.normalize('////////////////main.js/////////////')
// console.log(normaPath)

// const resolvedPath = path.resolve('main.js')
// console.log(resolvedPath)

// OS

// const os = require('os')

// console.log(os.cpus())
// console.log(os.arch())
// console.log(os.release())

// FS

// const fs = require('fs')
// const path = require('node:path')

// const filePath = path.resolve('text.txt')

// fs.writeFile(filePath, 'hello\n', (err)=>{
//     if (err) throw new Error(err.message)
// })

// fs.appendFile(filePath, 'hello', (err)=>{
//     if (err) throw new Error(err.message)
// })

// fs.truncate(filePath, (err)=>{
//     if (err) throw new Error(err.message)
// })

// fs.unlink(filePath, (err)=>{
//     if (err) throw new Error(err.message)
// })

// fs.readFile(filePath, {encoding: 'utf-8'}, (err, data) =>{
//     if (err) throw new Error(err.message)
//     console.log(data)
// })

// const dirPath = path.join(__dirname,'dir')

// fs.mkdir(dirPath, (err)=>{
//     if (err) throw new Error(err.message)
// })

// fs.readdir(dirPath, (err, data)=>{
//     console.log(data)
// })

// fs.rmdir(dirPath, (err)=>{})