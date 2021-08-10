const store = require('../store')
const Modal = require('bootstrap').Modal

const signUpModal = new Modal($('#signUpModal'))
const logInModal = new Modal($('#logInModal'))
const logOutModal = new Modal($('#logOutModal'))
const changePwdModal = new Modal($('#changePwdModal'))
const createLessonModal = new Modal($('#createLessonModal'))
const editModal = new Modal($('#editModal'))
const failureModal = new Modal($('#failureModal'))


//form validation
const passwordInputSuccess = function() {

    store.$password.css('border', '1px solid green')
    store.$confirmPassword.css('border', '1px solid green')

}

const passwordInputFailure = function() {
    store.$password.css('border', '1px solid red')
    store.$confirmPassword.css('border', '1px solid red')

}

//sign up
const onSignUpSuccess = function(response) {
    store.$signUpForm.trigger('reset')
    signUpModal.hide()
    store.$emailHelp.empty()
    store.$passwordMessage.empty()
    store.$password.css('border', '1px solid #dfe4e7')
    store.$welcomeMessage.html(`Welcome ${response.user.email}! Please sign in`)
    store.$confirmPassword.css('border', '1px solid #dfe4e7')
}
const onSignUpFailure = function() {
    //give user feedback
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

const onLogInSuccess = (response) => {
    //store token for futere validtion
    store.userToken = response.user.token
        //give user feedback
    store.$logInForm.trigger('reset')
    logInModal.hide()
    store.$signUpMdlBtn.hide()
    store.$logInMdlBtn.hide()
    store.$logOutMdlBtn.show()
    store.$changePwdBtn.show()
    store.$createLessonBtn.show()
    store.$myLessonsMessage.empty()
    store.$welcomeMessage.html(`Hello, ${response.user.email}`)
}

const onLogInFailure = function() {
    store.$logInForm.trigger('reset')
        //give user feedback
    store.$wrongPasswordMessage.html("Sorry, email and password don't match").css('color', 'red')
}

const onLogOutSuccess = () => {
    logOutModal.hide()
    store.$logOutMdlBtn.hide()
    store.$changePwdBtn.hide()
    store.$signUpMdlBtn.show()
    store.$logInMdlBtn.show()
    store.$form.trigger('reset')
    store.$welcomeMessage.empty()
    store.$createLessonBtn.hide()

}

const onChangePwdSuccess = function() {
    changePwdModal.hide()
}

const onChangePwdFailure = function() {
    store.$changePasswordMessage.html('Sorry, the password is incorrect').css('color', 'red')
}

//lesson CRUD
let lessonHtml = ''
const addNewLesson = function(response) {
    lessonHtml += `
    <div class="card col-4">
        <img src="https://image.shutterstock.com/image-photo/lesson-1-white-chalk-text-260nw-535576588.jpg" class="card-img-top" alt="...">

        <div class="card-body">
          <h5 class="card-title">${response.lesson.title}</h5>
          <p class="card-subtitle mb-2 text-muted">${response.lesson.subject}</p>
          <p class="card-text">${response.lesson.description}</p>
          <p class="card-text">Unit: ${response.lesson.unit}</p>
          <a href="${response.lesson.url}" class="btn btn-primary">Open lesson</a>
          <button data-id="${response.lesson._id}" id="deleteLesson" class="btn">Delete</button>
          <button data-id="${response.lesson._id}" id="editMdlBtn" type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#editModal">
        </div>
      </div>
  `
    store.newLesson = store.$myLessons.prepend(lessonHtml)
}

const onCreateLessonSuccess = function(response) {
    createLessonModal.hide()
    store.$createLessonForm.trigger('reset')
    addNewLesson(response)
    store.newLesson.show(1500)
    location.hash = response.lesson._id
}

const onCreateLessonFailure = function() {
    console.log(store.$createLessonField)

    for (let i = 0; i < (store.$createLessonField.length + 1); i++)

        if (!store.$createLessonField.val()) {
        console.log(store.$createLessonField)
        console.log(typeof store.$createLessonField)
        store.$createLessonMessage.html('Please enter valid input').css('color', 'red')
    } else {
        store.$createLessonErrorMessage.html('Sorry, we were unable to create new lessons at the moment. Please try again later')
    }
}

const showMyLessonsSuccess = function(response) {
    //scroll down to display my lessons
    document.getElementById('myLessons').scrollIntoView()

    let lessonsHtml = ''
    response.lessons.forEach(lessons => {

        lessonsHtml += `
        <div class="card text-center col-3 m-3">
        <img src="https://image.shutterstock.com/image-photo/lesson-1-white-chalk-text-260nw-535576588.jpg" class="card-img-top" alt="...">

        <div class="card-body">
          <h5 class="card-title">${lessons.title}</h5>
          <p class="card-subtitle mb-2 text-muted">${lessons.subject}</p>
          <p class="card-text">${lessons.description}</p>
          <p class="card-text">Unit: ${lessons.unit}</p>
          <a href="${lessons.url}" class="btn btn-primary">Open lesson</a>
          <button data-id="${lessons._id}" id="deleteLesson" class="btn">Delete</button>
          <button data-id="${lessons._id}" id="editMdlBtn" type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#editModal">
      Edit
    </button>

        </div>
      </div>
    `
    })
    store.$myLessons.append(lessonsHtml)

}
const showMyLessonsFailure = function() {
    store.$myLessonsMessage.html('You must log in in order to see your lessons')
}
const onShowAllLessonsSuccess = function(response) {
    let lessonsHtml = ''
    response.lessons.forEach(lessons => {
        lessonsHtml += `
      <div class="card text-center col-md-3 m-3 ">
      <img src="https://image.shutterstock.com/image-photo/lesson-1-white-chalk-text-260nw-535576588.jpg" class="card-img-top" alt="...">

      <div class="card-body">
        <h5 class="card-title">${lessons.title}</h5>
        <p class="card-subtitle mb-2 text-muted">${lessons.subject}</p>
        <p class="card-text">${lessons.description}</p>
        <p class="card-text">Unit: ${lessons.unit}</p>
        <a href="${lessons.url}" class="btn btn-primary">Open lesson</a>

      </div>
    </div>
  `
    })
    store.$allLessons.html(lessonsHtml)
}

const onDeleteLessonSuccess = function() {
    $(store.event.currentTarget).hide(1000)
}
const onEditLessonSuccess = function(response) {
    console.log(response)
    addNewLesson(response)
    store.newLesson.show(1500)
    editModal.hide()
    location.hash = response.lesson._id
}

const failure = function() {
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
    onCreateLessonFailure,
    showMyLessonsFailure,
    onShowAllLessonsSuccess,
    onDeleteLessonSuccess,
    onEditLessonSuccess,
    failure
    // onCreateLessonTypeFailure

}
