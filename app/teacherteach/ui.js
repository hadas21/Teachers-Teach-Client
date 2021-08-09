const store = require('../store')
const Modal = require('bootstrap').Modal

const signUpModal = new Modal($('#signUpModal'))
const logInModal = new Modal($('#logInModal'))
const changePwdModal = new Modal($('#changePwdModal'))
const createLessonModal = new Modal($('#createLessonModal'))

store.$passwordMessage = $('#passwordMessage')
store.$wrongPasswordMessage = $('#wrongPasswordMessage')
store.$changePasswordMessage = $('#changePasswordMessage')
store.$emailInput = $('#emailInput')
store.$emailHelp = $('#emailHelp')
store.$signUpBtn = $('#signUpBtn')
store.$signUpMdlBtn = $('#signUpMdlBtn')
store.$logInMdlBtn = $('#logInMdlBtn')
store.$myLessons = $('#myLessons')


const passwordInputSuccess = function() {

    store.$password.css('border', '1px solid green')
    store.$confirmPassword.css('border', '1px solid green')

}

const passwordInputFailure = function() {
    store.$password.css('border', '1px solid red')
    store.$confirmPassword.css('border', '1px solid red')

}

const onSignUpSuccess = function() {
    store.$signUpForm.trigger('reset')
    signUpModal.hide()
    store.$emailHelp.empty()
    store.$passwordMessage.empty()
    store.$password.css('border', '1px solid #dfe4e7')
    store.$confirmPassword.css('border', '1px solid #dfe4e7')
}
const onSignUpFailure = function() {
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
        store.$signUpForm.trigger('reset')
    } else {
        store.$emailHelp.html("You'r already signed up, please log in").css('color', '#1a6efd')
        store.$signUpForm.trigger('reset')
    }
}

const onLogInSuccess = (response) => {
    //store token for futere validtion
    store.userToken = response.user.token
    console.log(response)
    store.userId = response.user._id
    store.$logInForm.trigger('reset')
    logInModal.hide()
    store.$signUpMdlBtn.hide()
    store.$logInMdlBtn.hide()
    store.$logOutBtn.show()
    store.$changePwdBtn.show()
    store.$createLessonBtn.show()
    store.$newLessons.show()
}

const onLogInFailure = function() {
    store.$logInForm.trigger('reset')
    store.$wrongPasswordMessage.html("Sorry, email and password don't match").css('color', 'red')
}

const onLogOutSuccess = () => {
    store.$logOutBtn.hide()
    store.$changePwdBtn.hide()
    store.$signUpMdlBtn.show()
    store.$logInMdlBtn.show()

}

const onChangePwdSuccess = function() {
    changePwdModal.hide()
}

const onChangePwdFailure = function() {
    store.$changePasswordMessage.html('Sorry, the password is incorrect').css('color', 'red')
}

// const showNewLessons = (response) => {
//     const newLessonsDiv = document.querySelector($('#newLessons'))
//     const lessonElement = document.createElement('p')
//     lessonElement.innerText = response.lesson.title
//     newLessonsDiv.append(lessonElement)
// }

let lessonHtml = ''
const addNewLesson = function(response) {
    lessonHtml += `
      <div>
  <p>Title: ${response.lesson.title}</p>
  <p>Subject: ${response.lesson.subject}</p>
   <p>Description: ${response.lesson.description}</p>
   <p>Unit: ${response.lesson.unit}</p>
   <p>Url: ${response.lesson.url}</p>
   </div>
  `
    store.$myLessons.prepend(lessonHtml)
}

const onCreateLessonSuccess = function(response) {
    createLessonModal.hide()
    console.log(response)
    addNewLesson(response)

}

const showMyLessonsSuccess = function(response) {
    console.log(response)
    let lessonsHtml = ''
    response.lessons.forEach(lessons => {
        lessonsHtml += `
        <div class="card col-4">
        <img src="https://image.shutterstock.com/image-photo/lesson-1-white-chalk-text-260nw-535576588.jpg" class="card-img-top" alt="...">

        <div class="card-body">
          <h5 class="card-title">${lessons.title}</h5>
          <p class="card-subtitle mb-2 text-muted">Subject: ${lessons.subject}</p>
          <p class="card-text">Description: ${lessons.description}</p>
          <p class="card-text">Unit: ${lessons.unit}</p>
          <a href="${lessons.url}" class="btn btn-primary">Open lesson</a>
          <button id="deleteLesson" class="btn">Delete</button>
          <button id="editLesson" class="btn">Edit</button>
        </div>
      </div>
    `
    })
    store.$myLessons.html(lessonsHtml)
}

// ``
// <div>
// <p>Title: ${lessons.title}</p>
// <p>Subject: ${lessons.subject}</p>
//  <p>Description: ${lessons.description}</p>
//  <p>Unit: ${lessons.unit}</p>
//  <p>Url: ${lessons.url}</p>
//  </div>

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
    onCreateLessonSuccess

}
