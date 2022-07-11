const webdav_url = 'insomnia-plugin-sync-webdav-url'
const webdav_user = 'insomnia-plugin-sync-webdav-user'
const webdav_pwd = 'insomnia-plugin-sync-webdav-pwd'

var context = null

export const set_context = ctx => {
    context = ctx
}

export const set_webdav_url = async (url) => {
    await context.store.setItem(webdav_url, url);
}

export const get_webdav_url = async () => {
    return await context.store.getItem(webdav_url);
}

export const set_webdav_user = async (user) => {
    await context.store.setItem(webdav_user, user);
}

export const get_webdav_user = async () => {
    return await context.store.getItem(webdav_user);
}

export const set_webdav_pwd = async (pwd) => {
    await context.store.setItem(webdav_pwd, pwd);
}

export const get_webdav_pwd = async () => {
    return await context.store.getItem(webdav_pwd);
}

export default [];

