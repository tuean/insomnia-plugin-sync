
export const createFolder = async (client, folder) => {
    if (await client.exists(folder) === false) {
        client.createDirectory(folder)
    }
}

export const checkFileExist = async (client, folder, fileName) => {
    const items = await client.getDirectory(folder)
    console.log("list files under" + folder)
    if (items == null || items.length < 1) return false
    for (let i = 0; items.length > i; i++) {
        let filename = items[i].filename
        if (filename === fileName) return true
    }
    return false
}

export const lock = async (client, wholeFilePath) => {
    const lock = await client.lock(wholeFilePath)
    return lock
}

export const newFile = (client, folder, fileName, raw) => {

}