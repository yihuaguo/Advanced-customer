import request from '@/utils/request'

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

export default {
    getMenuList,
    getDirectorListOfDocument,
    getHtml
}