// use require with a reference to bundle the file and use it in this file
// const example = require('./example')
const store = require('./store')

// use require without a reference to ensure a file is bundled
// require('./example')
const eventsTeach = require('../app/teacherteach/events')

$(() => {

    store.$confirmPassword = $('#confirm-password')
    store.$password = $('#password')
    store.$signUpForm = $('#signUpForm')
    store.$logInForm = $('#logInForm')
    store.$logOutBtn = $('#logOutBtn')
    store.$changePwdForm = $('#changePwdForm')
    store.$changePwdBtn = $('#changePwdBtn')
    store.$signUpBtn = $('#signUpBtn')
    store.$createLessonBtn = $('#createLessonBtn')
    store.$createLessonForm = $('#createLessonForm')
    store.$newLessons = $('#newClasses')
    store.$myLessonsBtn = $('#myLessonsBtn')
    store.$createLessonField = $('.create-lesson-field')
    store.$editForm = $('#editForm')
    store.$deleteLesson = $('#deleteLesson')
    store.$allLessons = $('#allLessons')
    store.$myLessons = $('#myLessons')
    store.$editMdlBtn = $('#editMdlBtn')
    store.$myLessonsMessage = $('#myLessonsMessage')
    store.$deleteLesson = $('#deleteLesson')

    store.$logOutBtn.hide()
    store.$changePwdBtn.hide()
    store.$createLessonBtn.hide()
    store.$newLessons.hide()

    eventsTeach.onShowAllLessons()

    store.$confirmPassword.on('keyup', eventsTeach.onPasswordInput)
    store.$password.on('keyup', eventsTeach.onPasswordInput)

    store.$signUpForm.on('submit', eventsTeach.onSignUp)
    store.$logInForm.on('submit', eventsTeach.onLogIn)

    store.$logOutBtn.on('click', eventsTeach.onLogOut)
    store.$changePwdForm.on('submit', eventsTeach.onChangePwd)
    store.$signUpMdlBtn.on('click', eventsTeach.signUpMdlOpn)
    store.$logInMdlBtn.on('click', eventsTeach.logInMdlOpn)


    store.$myLessonsBtn.on('click', eventsTeach.onMyLessonsBtn)
    store.$createLessonForm.on('submit', eventsTeach.onCreateLessonForm)
        // store.$createLessonField.on('keyup', eventsTeach.onCreateLessonType)

    store.$myLessons.on('click', '.card', eventsTeach.getLessonId)
    store.$editForm.on('submit', eventsTeach.onEditLesson)
    store.$myLessons.on('click', '#deleteLesson', eventsTeach.onDeleteLesson)


})
