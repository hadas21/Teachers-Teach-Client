//requirements
const getFormFields = require('../../lib/get-form-fields')
const api = require('./api')
const ui = require('./ui')
const store = require('../store')
store.$oldPwd = $('#oldPwd')
store.$newPwd = $('#newPwd')
    //check if password and confirmation match
const onPasswordInput = function() {
    if (store.$confirmPassword.val() === store.$password.val()) {
        store.isConfirmed = true
        ui.passwordInputSuccess()

    } else {
        store.isConfirmed = false
        ui.passwordInputFailure()

    }
    console.log(store.$password.val() + ': ' + store.$confirmPassword.val())
}

const signUpMdlOpn = function() {
    store.$emailHelp.empty()
    store.$passwordMessage.empty()
    store.$password.css('border', '1px solid #dfe4e7')
    store.$confirmPassword.css('border', '1px solid #dfe4e7')
}
const logInMdlOpn = function() {
        store.$wrongPasswordMessage.empty()
    }
    //sign up
const onSignUp = function(event) {
    //prevent page reload
    event.preventDefault()

    const form = event.target
    const data = getFormFields(form)

    api.signUp(data)
        .then(ui.onSignUpSuccess)
        .catch(ui.onSignUpFailure)
}


//log in
const onLogIn = function(event) {
        event.preventDefault()

        const form = event.target
        const data = getFormFields(form)
        api.logIn(data)
            .then(ui.onLogInSuccess)
            .catch(ui.onLogInFailure)
    }
    //log out
const onLogOut = function() {
        console.log('out')
        api.logOut()
            .then(ui.onLogOutSuccess)
            .catch(ui.failure)
    }
    //change password
const onChangePwd = function(event) {
    event.preventDefault()
    console.log('change')

    const oldPwd = store.$oldPwd.val()
    const newPwd = store.$newPwd.val()
    api.changePwd(oldPwd, newPwd)
        .then(ui.onChangePwdSuccess)
        .catch(ui.onChangePwdFailure)
}

const onCreateLessonForm = function(event) {
    //prevent page reload
    event.preventDefault()

    const form = event.target
    const data = getFormFields(form)
    console.log(data)
    api.createLesson(data)

    .then(ui.onCreateLessonSuccess)
        //     .catch(ui.onCreateLessonFailure)
}

const onMyLessonsBtn = function() {
    api.showMyLessons()
        .then(ui.showMyLessonsSuccess)
        //.then(ui.showMyLessonsFailure)
}
module.exports = {
    onSignUp,
    onLogIn,
    onPasswordInput,
    onLogOut,
    onChangePwd,
    signUpMdlOpn,
    logInMdlOpn,
    onCreateLessonForm,
    onMyLessonsBtn
}
