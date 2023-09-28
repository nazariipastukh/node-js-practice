import express from "express"
// const service = require('./hw/service')
//
// const app = express()
// const PORT = 5001
//
// app.listen(PORT, () => {
//     console.log(`Server has successfully started on PORT: ${PORT}`)
// })
//
// app.use(express.json())
// app.use(express.urlencoded({extended: true}))
//
// app.get('/users', async (req, res) => {
//     const users = await service.reader()
//     res.json(users)
//
//     console.log('get users')
// })
//
// app.get('/users/:id', async (req, res) => {
//     try {
//         const {id} = req.params;
//         const users = await service.reader();
//         const user = users.find(user => user.id === Number(id));
//
//         if (!user) {
//             return res.status(404).json({message: 'User not found'});
//         }
//         res.json(user);
//
//         console.log(`get user ${id}`);
//     } catch (e) {
//         res.status(400).json(e.message);
//     }
// });
//
// app.post('/users', async (req, res) => {
//     try {
//         const {name, age, email} = req.body
//
//         if (!name || name.length < 3 || name.length > 15) {
//             throw new Error('Wrong name')
//         }
//         if (!email || !email.includes('@')) {
//             throw new Error('Wrong email')
//         }
//
//         const users = await service.reader()
//         const lastId = users[users.length - 1].id
//         const user = {id: lastId + 1, name, age, email}
//         users.push(user)
//         await service.writer(users)
//
//         res.status(201).json({
//             message: user
//         })
//
//         console.log(`posted user ${user.id}`)
//     } catch (e) {
//         res.status(400).json(e.message)
//     }
// })
//
// app.put('/users/:id', async (req, res) => {
//     try {
//         const {id} = req.params
//         const {name, email, age} = req.body
//
//         if (!name || name.length < 3 || name.length > 15) {
//             throw new Error('Wrong name')
//         }
//         if (!email || !email.includes('@')) {
//             throw new Error('Wrong email')
//         }
//
//         const users = await service.reader()
//
//         const user = users.find(user => user.id === Number(id))
//         if (!user) {
//             throw new Error('User not found')
//         }
//
//         user.name = name
//         user.email = email
//         user.age = age
//
//         await service.writer(users)
//
//         res.status(201).json({
//             message: 'User Updated'
//         })
//
//         console.log(`updated ${id}`)
//     } catch (e) {
//         res.status(404).json(e.message)
//     }
// })
//
// app.delete('/users/:id', async (req, res) => {
//     try {
//         const {id} = req.params
//
//         const users = await service.reader()
//         const index = users.findIndex(user => user.id === Number(id))
//
//         if (index === -1) {
//             throw new Error('User not found')
//         }
//         users.splice(index, 1)
//         await service.writer(users)
//
//         res.status(201).json({
//             message: 'User Deleted'
//         })
//
//         console.log(`deleted${id}`)
//     } catch (e) {
//         res.status(404).json(e.message)
//     }
// })