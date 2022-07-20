
var str = require('string-to-stream')

export const createFolder = async (client, folder) => {
    if (await client.exists(folder) === false) {
        client.createDirectory(folder)
    }
}

export const checkFileExist = async (client, folder, fileName) => {
    const wholeFilePath = folder + '/' + fileName
    return await client.exists(wholeFilePath)
}

export const lock = async (client, folder, fileName) => {
    const wholeFilePath = folder + '/' + fileName
    return await client.lock(wholeFilePath)
}

export const unlock = async (client, folder, fileName) => {
    const wholeFilePath = folder + '/' + fileName
    return await client.unlock(wholeFilePath)
}

export const newFile = async (client, folder, fileName, raw) => {
    console.log("start to create new file and file content is:")
    const wholeFilePath = folder + '/' + fileName
    console.log(wholeFilePath)
    await client.putFileContents(wholeFilePath, raw)
}

export const getRemoteFile = async (client, folder, fileName) => {
    const wholeFilePath = folder + '/' + fileName
    const raw = await client.getFileContents(wholeFilePath, { format: "text" });
    console.log("get remote file")
    console.log(raw)
    return raw
}
