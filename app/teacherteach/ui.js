const store = require('../store')
const func = require('./func')
const Modal = require('bootstrap').Modal

const signUpModal = new Modal($('#signUpModal'))
const logInModal = new Modal($('#logInModal'))
const logOutModal = new Modal($('#logOutModal'))
const changePwdModal = new Modal($('#changePwdModal'))
const createLessonModal = new Modal($('#createLessonModal'))
const editModal = new Modal($('#editModal'))
const deleteModal = new Modal($('#deleteModal'))
const failureModal = new Modal($('#failureModal'))

// form validation
const passwordInputSuccess = function () {
  store.$password.css('border', '1px solid green')
  store.$confirmPassword.css('border', '1px solid green')
}
const passwordInputFailure = function () {
  store.$password.css('border', '1px solid red')
  store.$confirmPassword.css('border', '1px solid red')
}

// sign up
const onSignUpSuccess = function (response) {
  store.$signUpForm.trigger('reset')
  signUpModal.hide()
  store.$emailHelp.empty()
  store.$passwordMessage.empty()
  store.$password.css('border', '1px solid #dfe4e7')
  store.$welcomeMessage.html(`Welcome ${response.user.email}! Please sign in`)
  store.$confirmPassword.css('border', '1px solid #dfe4e7')
}
const onSignUpFailure = function () {
  // give user feedback
  if (!store.$password.val()) {
    store.$emailHelp.empty()
    store.$passwordMessage.html('Please enter password').css('color', 'red')
  } else if (!store.$emailInput.val()) {
    store.$emailHelp.html('Please enter email').css('color', 'red')
    store.$passwordMessage.empty()
    store.$signUpForm.trigger('reset')
  } else if (!store.isConfirmed) {
    store.$passwordMessage.html('Please enter matching passwords').css('color', 'red')
    store.isConfirmed = true
  } else {
    store.$emailHelp.html("You'r already signed up, please log in").css('color', '#1a6efd')
    store.$passwordMessage.empty()
    store.$signUpForm.trigger('reset')
    store.$password.css('border', '1px solid #dfe4e7')
    store.$confirmPassword.css('border', '1px solid #dfe4e7')
  }
}

// log in
const onLogInSuccess = (response) => {
  // store token for futere validtion
  store.userToken = response.user.token
  // give user feedback
  store.$logInForm.trigger('reset')
  logInModal.hide()
  store.$signUpMdlBtn.hide()
  store.$logInMdlBtn.hide()
  store.$logOutMdlBtn.show()
  store.$changePwdBtn.show()
  store.$createLessonBtn.show()
  store.$myLessonsMessage.empty()
  store.$welcomeMessage.html(`Hello, ${response.user.email}`)
  store.$changePasswordMessage.empty()
}
const onLogInFailure = function () {
  store.$logInForm.trigger('reset')
  // give user feedback
  store.$wrongPasswordMessage.html("Sorry, email and password don't match").css('color', 'red')
}

// log out
const onLogOutSuccess = () => {
  logOutModal.hide()
  store.$logOutMdlBtn.hide()
  store.$changePwdBtn.hide()
  store.$signUpMdlBtn.show()
  store.$logInMdlBtn.show()
  store.$form.trigger('reset')
  store.$welcomeMessage.empty()
  store.$createLessonBtn.hide()
  store.$myLessons.empty() // children('.card').hide()
}

// change password
const onChangePwdSuccess = function () {
  changePwdModal.hide()
}
const onChangePwdFailure = function () {
  store.$changePasswordMessage.html('Sorry, the password is incorrect').css('color', 'red')
}

// index all for all users
const onShowAllLessonsSuccess = function (response) {
  func.displayLessons(response, store.$allLessons)
}

// lesson CRUD
// create
const onCreateLessonSuccess = function (response) {
  createLessonModal.hide()
  store.$createLessonForm.trigger('reset')
  func.addNewLesson(response)
  store.newLesson.show(1500)
  func.scroll(store.$myLessons)
}
// read all
const showMyLessonsSuccess = function (response) {
  // scroll down to display my lessons
  func.scroll(store.$myLessons)

  func.displayMyLessons(response, store.$myLessons)
}
const showMyLessonsFailure = function () {
  store.$myLessonsMessage.html('You must log in in order to see your lessons')
}
// delete
const onDeleteLessonSuccess = function () {
  $(store.event.target).parentsUntil(store.$myLessons).hide(1000)
  deleteModal.hide()
}
// edit
const onEditLessonSuccess = function (response) {
  $(store.event.target).parentsUntil(store.$myLessons).hide(1000)
  func.addNewLesson(response)
  editModal.hide()
}
// general failure message
const failure = function () {
  logOutModal.hide()
  failureModal.show(500)
}

module.exports = {
  onSignUpSuccess,
  onSignUpFailure,
  onLogInSuccess,
  onLogInFailure,
  passwordInputSuccess,
  passwordInputFailure,
  onLogOutSuccess,
  onChangePwdSuccess,
  onChangePwdFailure,
  showMyLessonsSuccess,
  onCreateLessonSuccess,
  showMyLessonsFailure,
  onShowAllLessonsSuccess,
  onDeleteLessonSuccess,
  onEditLessonSuccess,
  failure

}
