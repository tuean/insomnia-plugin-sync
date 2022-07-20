import {newFile} from "./sync";

export const merge = (oldJson, newJson) => {
    if (oldJson === null || oldJson === undefined) return newJson;
    if (oldJson.length === 0) return newJson;
    let result = []
    for (let i = 0; i < newJson.length; i++) {
        let exist = checkExists(newJson[i]._id, result);
        if (!exist) result.push(newJson[i]);
    }

    for (let i = 0; i < oldJson.length; i++) {
        let exist = checkExists(oldJson[i]._id, result);
        if (!exist) result.push(oldJson[i]);
    }
    return result;
}


const checkExists = (_id, olds) => {
    for (let i = 0; i < olds.length; i++) {
        if (olds[i]._id === _id) return true;
    }
    return false;
}