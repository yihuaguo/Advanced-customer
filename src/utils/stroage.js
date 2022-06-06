import Storage from 'good-storage'

const localStorage = {
    localPut: function (key, value) {
        return Storage.set(key, value)
    },
    localGet: function (key) {
        return Storage.get(key)
    },
    localClear: function () {
        return Storage.clear()
    },
    localRemove: function (key) {
        return Storage.remove(key)
    },
    SessionPut: function (key, value) {
        return Storage.session.set(key, value)
    },
    SessionGet: function (key) {
        return Storage.session.get(key)
    },
    SessionClear: function () {
        return Storage.session.clear()
    },
    SessionRemove: function (key) {
        return Storage.session.remove(key)
    }
}

export default localStorage;