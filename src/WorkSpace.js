const webdav_url = 'insomnia-plugin-sync-webdav-url'
const webdav_user = 'insomnia-plugin-sync-webdav-user'
const webdav_pwd = 'insomnia-plugin-sync-webdav-pwd'

export const set_webdav_url = async (context, url) => {
    await context.store.setItem(webdav_url, url);
}

export const get_webdav_url = async (context) => {
    return await context.store.getItem(webdav_url);
}

export const set_webdav_user = async (context, user) => {
    await context.store.setItem(webdav_user, user);
}

export const get_webdav_user = async (context) => {
    return await context.store.getItem(webdav_user);
}

export const set_webdav_pwd = async (context, pwd) => {
    await context.store.setItem(webdav_pwd, pwd);
}

export const get_webdav_pwd = async (context) => {
    return await context.store.getItem(webdav_pwd);
}

export default [];

