const path = require('node:path')
const fs = require('fs/promises')

const creator = async () => {
    try {
        const basePath = path.join(__dirname, 'mainFolder')

        await fs.mkdir(basePath, {recursive: true})

        const folderName = ['folder1', 'folder2', 'folder3', 'folder4', 'folder5']
        const fileName = ['file1.txt', 'file2.txt', 'file3.txt', 'file4.txt', 'file5.txt']

        await Promise.all([
            ...folderName.map(async (folder) => {
                await fs.mkdir(path.join(basePath, folder), {recursive: true})
            }),
            ...fileName.map(async (file) => {
                await fs.writeFile(path.join(basePath, file), 'file')
            })
        ])

        const readDir = await fs.readdir(basePath)

        await Promise.all([
            await (readDir.map(async (item) => {
                const stat = await fs.stat(path.join(basePath, item))
                console.log(stat.isFile() ? 'File: ' : 'Folder: ', item)
            }))
        ])

    } catch (e) {
        console.error(e.message)
    }
}

creator().then()