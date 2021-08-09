//requirements
const getFormFields = require('../../lib/get-form-fields')
const api = require('./api')
const ui = require('./ui')
const store = require('../store')
const { css } = require('jquery')
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

//open empty modals
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

    // const oldPwd = store.$oldPwd.val()
    // const newPwd = store.$newPwd.val()
    const form = event.target
    const data = getFormFields(form)
    api.changePwd(data)
        .then(ui.onChangePwdSuccess)
        .catch(ui.onChangePwdFailure)
}

const onCreateLessonForm = function(event) {
    //prevent page reload
    event.preventDefault()

    const form = event.target
    const data = getFormFields(form)

    api.createLesson(data)

    .then(ui.onCreateLessonSuccess)
        .catch(ui.onCreateLessonFailure)
}

// const onCreateLessonType = function() {
//     if (!store.$createLessonField) {
//         ui.onCreateLessonTypeFailure
//     }
// }

const onMyLessonsBtn = function() {
    api.showMyLessons()
        .then(ui.showMyLessonsSuccess)
        .then(ui.showMyLessonsFailure)
}

const onEditLesson = function(event) {
    event.preventDefault()
    console.log(event)
    const form = event.target
    const data = getFormFields(form)
    console.log(store.lessonId)
        //$('.card-body').attr('contenteditable' = 'true')
    api.editLesson(data, store.lessonId)
        .then(ui.editLessonSuccess)
        .then(ui.editLessonFailure)
}

const onShowAllLessons = function() {
    console.log('show')
    api.showAllLessons()
        .then(ui.onShowAllLessonsSuccess)
        //.catch(ui.onShowAllLessonsFailure)
}

const getLessonId = function(event) {
    console.log($(event.target).data('id'))
    store.lessonId = $(event.target).data('id')
    console.log(store.lessonId)
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
    onMyLessonsBtn,
    onEditLesson,
    onShowAllLessons,
    getLessonId
    //onCreateLessonType
}
