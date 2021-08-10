// use require with a reference to bundle the file and use it in this file
// const example = require('./example')
const store = require('./store')

// use require without a reference to ensure a file is bundled
// require('./example')
const eventsTeach = require('../app/teacherteach/events')

$(() => {
    //cashed variables
    //id's
    store.$confirmPassword = $('#confirm-password')
    store.$password = $('#password')
    store.$signUpForm = $('#signUpForm')
    store.$logInForm = $('#logInForm')
    store.$logOutBtn = $('#logOutBtn')
    store.$logOutMdlBtn = $('#logOutMdlBtn')
    store.$changePwdForm = $('#changePwdForm')
    store.$oldPwd = $('#oldPwd')
    store.$newPwd = $('#newPwd')
    store.$changePwdBtn = $('#changePwdBtn')
    store.$createLessonBtn = $('#createLessonBtn')
    store.$createLessonForm = $('#createLessonForm')
    store.$createLessonField = $('.create-lesson-field')
    store.$editForm = $('#editForm')
    store.$allLessons = $('#allLessons')
    store.$myLessons = $('#myLessons')
    store.$emailInput = $('#emailInput')
    store.$emailHelp = $('#emailHelp')
    store.$signUpMdlBtn = $('#signUpMdlBtn')
    store.$logInMdlBtn = $('#logInMdlBtn')
    store.$welcomeMessage = $('#welcomeMessage')
    store.$wrongPasswordMessage = $('#wrongPasswordMessage')
    store.$changePasswordMessage = $('#changePasswordMessage')
    store.$passwordMessage = $('#passwordMessage')
        //classes
    store.$formControl = $('.form-control')
    store.$createLessonMessage = $('.create-lesson-message')
    store.$createLessonErrorMessage = $('.create-lesson-error-message')
    store.$myLessonsMessage = $('.myLessonsMessage')
    store.$myLessonsBtn = $('.myLessonsBtn')
        //elements
    store.$form = $('form')
    store.$header = $('header')
    store.$body = $('html,body')

    //hide elements to show only after log in
    store.$logOutMdlBtn.hide()
    store.$changePwdBtn.hide()
    store.$createLessonBtn.hide()

    // display top of page on load
    scroll(store.$header)
        //display all users lessons on load
    eventsTeach.onShowAllLessons()


    //password and confirmation match validation
    store.$confirmPassword.on('keyup', eventsTeach.onPasswordInput)
    store.$password.on('keyup', eventsTeach.onPasswordInput)
        //reset modal when open to show user empty forms------------------- maybe unneccasery?
        // store.$signUpMdlBtn.on('click', eventsTeach.signUpMdlOpn)
        // store.$logInMdlBtn.on('click', eventsTeach.logInMdlOpn)

    //user events
    store.$signUpForm.on('submit', eventsTeach.onSignUp)
    store.$logInForm.on('submit', eventsTeach.onLogIn)
    store.$changePwdForm.on('submit', eventsTeach.onChangePwd)
    store.$logOutBtn.on('click', eventsTeach.onLogOut)

    //lesson event
    store.$myLessonsBtn.on('click', eventsTeach.onMyLessonsBtn)
    store.$createLessonForm.on('submit', eventsTeach.onCreateLesson)
    store.$myLessons.on('click', '.card', eventsTeach.getLessonId)
    store.$editForm.on('submit', eventsTeach.onEditLesson)
    store.$myLessons.on('click', '#deleteLesson', eventsTeach.onDeleteLesson)


})
