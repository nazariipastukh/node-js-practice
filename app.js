const fs = require('node:fs/promises')
const path = require('node:path')

const creator = async () => {
    try {
        const folderName = ['folder1', 'folder2', 'folder3', 'folder4', 'folder5']
        const fileName = ['file1.txt', 'file2.txt', 'file3.txt', 'file4.txt', 'file5.txt']

        const filePath = path.join(__dirname, 'folder')

        await fs.mkdir(filePath)

        await Promise.all([
            folderName.map(async (folder) => {
                await fs.mkdir(path.join(filePath, folder))
            }),

            fileName.map(async (file) => {
                await fs.writeFile(path.join(filePath, file), '')
            })
        ])

        const readdir = await fs.readdir(filePath)

        await Promise.all(readdir.map(async (item) => {
            const stat = await fs.stat(path.join(filePath, item))

            console.log(stat.isFile() ? 'File' : 'Folder', item)
        }))

    } catch (e) {
        console.log(e)
    }
}

creator().then()