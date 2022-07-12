import request from '@/utils/request'

export const getLessonHtml = async (id) => {
    return await request('get', 'lesson/lessonHtml', {
        id
    })
}

export const getMenuList = async () => {
    return await request('get', '/lesson/list')
}

export const getDirectorListOfDocument = async (lessonId) => {
    return await request('get', '/directory/documentList', {
        lessonId
    })
}

export const getHtml = async (documentId) => {
    return await request('get', '/document/html', {
        documentId
    })
}

export const like = async (documentId) => {
    return await request('get', '/document/like', {
        id: documentId
    })
}

export default {
    getMenuList,
    getDirectorListOfDocument,
    getLessonHtml,
    getHtml,
    like
}