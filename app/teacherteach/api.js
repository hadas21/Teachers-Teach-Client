//requirements
const store = require('./../store')
const config = require('./../config')

//sign up req
const signUp = function(data) {
    return $.ajax({
        method: 'POST',
        url: config.apiUrl + '/sign-up',
        data
    })
}

const logIn = function(data) {
    return $.ajax({
        method: 'POST',
        url: config.apiUrl + '/sign-in',
        data
    })
}

const logOut = function() {
    return $.ajax({
        method: 'DELETE',
        url: config.apiUrl + '/sign-out',
        headers: {
            Authorization: 'Bearer ' + store.userToken
        }
    })
}

const changePwd = function(oldPwd, newPwd) {
    return $.ajax({
        method: 'PATCH',
        url: config.apiUrl + '/change-password/',
        headers: {
            Authorization: 'Bearer ' + store.userToken
        },
        data
    })
}

const createLesson = function(data) {

    return $.ajax({
        method: 'POST',
        url: config.apiUrl + '/lessons',
        headers: {
            Authorization: 'Bearer ' + store.userToken
        },
        data
    })
}

const showMyLessons = function() {
    return $.ajax({
        method: 'GET',
        url: config.apiUrl + '/lessons',
        headers: {
            Authorization: 'Bearer ' + store.userToken
        }
    })
}
module.exports = {
    signUp,
    logIn,
    logOut,
    changePwd,
    createLesson,
    showMyLessons
}
