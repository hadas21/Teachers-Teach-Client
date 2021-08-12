// requirements
const getFormFields = require('../../lib/get-form-fields')
const api = require('./api')
const ui = require('./ui')
const store = require('../store')

// index all lessons owned by all users
const onShowAllLessons = function () {
  api.showAllLessons()
    .then(ui.onShowAllLessonsSuccess)
    .catch(ui.failure)
}

// empty fields when modals open
const signUpMdlOpn = function () {
  store.$emailHelp.empty()
  store.$passwordMessage.empty()
  store.$password.css('border', '1px solid #dfe4e7')
  store.$confirmPassword.css('border', '1px solid #dfe4e7')
  store.$signUpForm.trigger('reset')
}
const logInMdlOpn = function () {
  store.$wrongPasswordMessage.empty()
  store.$logInForm.trigger('reset')
}
const changePwdMdlOpn = function () {
  store.$changePasswordMessage.empty()
  store.$changePwdForm.trigger('reset')
}
const createLsnMdlOpn = function () {
  store.$createLessonForm.trigger('reset')
}
const editLsnMdlOpn = function () {
  store.$editForm.trigger('reset')
}

// check if password and confirmation match
const onPasswordInput = function () {
  if (store.$confirmPassword.val() === store.$password.val()) {
    store.isConfirmed = true
    ui.passwordInputSuccess()
  } else {
    store.isConfirmed = false
    ui.passwordInputFailure()
  }
}

// user CRUD
// sign up
const onSignUp = function (event) {
  // prevent page reload
  event.preventDefault()
  // get form data
  const form = event.target
  const data = getFormFields(form)
  // send api req
  api.signUp(data)
    .then(ui.onSignUpSuccess)
    .catch(ui.onSignUpFailure)
}
// log in
const onLogIn = function (event) {
  event.preventDefault()

  const form = event.target
  const data = getFormFields(form)
  api.logIn(data)
    .then(ui.onLogInSuccess)
    .catch(ui.onLogInFailure)
}
// log out
const onLogOut = function () {
  api.logOut()
    .then(ui.onLogOutSuccess)
    .catch(ui.failure)
}
// change password
const onChangePwd = function (event) {
  event.preventDefault()

  const form = event.target
  const data = getFormFields(form)
  api.changePwd(data)
    .then(ui.onChangePwdSuccess)
    .catch(ui.onChangePwdFailure)
}

// lesson CRUD
// create lesson
const onCreateLesson = function (event) {
  // prevent page reload
  event.preventDefault()

  const form = event.target
  const data = getFormFields(form)

  api.createLesson(data)
    .then(ui.onCreateLessonSuccess)
    .catch(ui.failure)
}
// index all lessons created by signed in user
const onMyLessonsBtn = function () {
  api.showMyLessons()
    .then(ui.showMyLessonsSuccess)
    .catch(ui.showMyLessonsFailure)
}
// delete chosen lessons created by signed in user
const onDeleteLesson = function () {
  api.deleteLesson(store.lessonId)
    .then(ui.onDeleteLessonSuccess)
    .catch(ui.failure)
}
// edit chosen lessons created by signed in user
const onEditLesson = function (event) {
  event.preventDefault()

  const form = event.target
  const data = getFormFields(form)
  api.editLesson(data, store.lessonId)
    .then(ui.onEditLessonSuccess)
    .catch(ui.failure)
}

module.exports = {
  onSignUp,
  onLogIn,
  onPasswordInput,
  onLogOut,
  onChangePwd,
  onCreateLesson,
  onMyLessonsBtn,
  onEditLesson,
  onShowAllLessons,
  signUpMdlOpn,
  logInMdlOpn,
  changePwdMdlOpn,
  createLsnMdlOpn,
  editLsnMdlOpn,
  onDeleteLesson
}
