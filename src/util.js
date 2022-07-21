import * as WorkSpace from "./WorkSpace"

export const merge = (remoteJson, localJson, sync2This) => {
    console.log(remoteJson, localJson);
    if (remoteJson === null || remoteJson === undefined) return localJson;
    if (remoteJson.resources.length === 0) return localJson;

    for (let i = 0; i < remoteJson.resources.length; i++) {
        let exist = checkExists(remoteJson.resources[i]._id, localJson.resources);
        if (!exist) localJson.resources.push(remoteJson.resources[i]);
    }

    if (sync2This) {
        let thisParentId = WorkSpace.get_models().workspace._id
        for (let i = 0; i < localJson.resources.length; i++) {
            localJson.resources[i].parentId = thisParentId
        }
    }

    return localJson;
}


const checkExists = (_id, olds) => {
    for (let i = 0; i < olds.length; i++) {
        if (olds[i]._id === _id) return true;
    }
    return false;
}