// requirements
const store = require('./../store')
const config = require('./../config')

// sign up req
const signUp = function (data) {
  return $.ajax({
    method: 'POST',
    url: config.apiUrl + '/sign-up',
    data
  })
}

const logIn = function (data) {
  return $.ajax({
    method: 'POST',
    url: config.apiUrl + '/sign-in',
    data
  })
}

const logOut = function () {
  return $.ajax({
    method: 'DELETE',
    url: config.apiUrl + '/sign-out',
    headers: {
      Authorization: 'Bearer ' + store.userToken
    }
  })
}

const changePwd = function (data) {
  return $.ajax({
    method: 'PATCH',
    url: config.apiUrl + '/change-password/',
    headers: {
      Authorization: 'Bearer ' + store.userToken
    },
    data
  })
}

const createLesson = function (data) {
  return $.ajax({
    method: 'POST',
    url: config.apiUrl + '/lessons',
    headers: {
      Authorization: 'Bearer ' + store.userToken
    },
    data
  })
}

const showMyLessons = function () {
  return $.ajax({
    method: 'GET',
    url: config.apiUrl + '/lessons',
    headers: {
      Authorization: 'Bearer ' + store.userToken
    }
  })
}

const editLesson = function (data, lessonId) {
  return $.ajax({
    method: 'PATCH',
    url: config.apiUrl + '/lessons/' + lessonId,
    headers: {
      Authorization: 'Bearer ' + store.userToken
    },
    data
  })
}

const showAllLessons = function () {
  return $.ajax({
    method: 'GET',
    url: config.apiUrl + '/all'
  })
}

const deleteLesson = function (lessonId) {
  console.log(lessonId)
  return $.ajax({
    method: 'DELETE',
    url: config.apiUrl + '/lessons/' + lessonId,
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
  showMyLessons,
  editLesson,
  showAllLessons,
  deleteLesson
}
