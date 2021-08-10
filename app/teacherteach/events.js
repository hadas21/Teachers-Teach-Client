//requirements
const getFormFields = require('../../lib/get-form-fields')
const api = require('./api')
const ui = require('./ui')
const store = require('../store')



//open empty modals------------------- maybe unneccasery?
// const signUpMdlOpn = function() {
//     store.$emailHelp.empty()
//     store.$passwordMessage.empty()
//     store.$password.css('border', '1px solid #dfe4e7')
//     store.$confirmPassword.css('border', '1px solid #dfe4e7')
// }
// const logInMdlOpn = function() {
//     store.$wrongPasswordMessage.empty()
// }

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

//sign up
const onSignUp = function(event) {
    //prevent page reload
    event.preventDefault()
        //get form data
    const form = event.target
    const data = getFormFields(form)
        //send api req
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

        api.logOut()
            .then(ui.onLogOutSuccess)
            .catch(ui.failure)
    }
    //change password
const onChangePwd = function(event) {
    event.preventDefault()

    const form = event.target
    const data = getFormFields(form)
    api.changePwd(data)
        .then(ui.onChangePwdSuccess)
        .catch(ui.onChangePwdFailure)
}

const onCreateLesson = function(event) {
    //prevent page reload
    event.preventDefault()

    const form = event.target
    const data = getFormFields(form)

    api.createLesson(data)
        .then(ui.onCreateLessonSuccess)
        .catch(ui.failure)
}

const onMyLessonsBtn = function() {
    api.showMyLessons()
        .then(ui.showMyLessonsSuccess)
        .catch(ui.showMyLessonsFailure)
}

const onEditLesson = function(event) {
    event.preventDefault()

    const form = event.target
    const data = getFormFields(form)
    api.editLesson(data, store.lessonId)
        .then(ui.onEditLessonSuccess)
        .then(ui.onEditLessonFailure)
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

const onDeleteLesson = function(event) {
    console.log(event)
    store.event = event
    store.lessonId = $(event.target).data('id')
    api.deleteLesson(store.lessonId)
        .then(ui.onDeleteLessonSuccess)
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
    getLessonId,
    onDeleteLesson
    //onCreateLessonType
    // signUpMdlOpn,
    // logInMdlOpn,
}
