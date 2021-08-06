// use require with a reference to bundle the file and use it in this file
// const example = require('./example')
const store = require('./store')

// use require without a reference to ensure a file is bundled
// require('./example')
const eventsTeach = require('../app/teacherteach/events')
store.$confirmPassword = $('#confirm-password')
store.$password = $('#password')
store.$signUpForm = $('#signUpForm')
store.$logInForm = $('#logInForm')
store.$logOutBtn = $('#logOutBtn')
store.$changePwdModal = $('#changePwdModal')
store.$changePwdBtn = $('#changePwdBtn')
store.$signUpBtn = $('#signUpBtn')
$(() => {

    store.$logOutBtn.hide()
    store.$changePwdBtn.hide()

    store.$confirmPassword.on('keyup', eventsTeach.onPasswordInput)
    store.$password.on('keyup', eventsTeach.onPasswordInput)

    store.$signUpForm.on('submit', eventsTeach.onSignUp)
    store.$logInForm.on('submit', eventsTeach.onLogIn)

    store.$logOutBtn.on('click', eventsTeach.onLogOut)
    store.$changePwdModal.on('click', eventsTeach.onChangePwd)
        //store.$signUpBtn.on('click', eventsTeach.signUpBtn)

})
