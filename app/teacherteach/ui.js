const store = require('../store')
const Modal = require('bootstrap').Modal

const signUpModal = new Modal($('#signUpModal'))
const logInModal = new Modal($('#logInModal'))
const changePwdModal = new Modal($('#changePwdModal'))

store.$passwordMessage = $('#passwordMessage')
store.$wrongPasswordMessage = $('#wrongPasswordMessage')
store.$emailInput = $('#emailInput')
store.$emailHelp = $('#emailHelp')
store.$signUpBtn = $('#signUpBtn')
store.$signUpMdlBtn = $('#signUpMdlBtn')
store.$logInMdlBtn = $('#logInMdlBtn')


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
    store.$logInForm.trigger('reset')
    logInModal.hide()
    store.$signUpMdlBtn.hide()
    store.$logInMdlBtn.hide()
    store.$logOutBtn.show()
    store.$changePwdBtn.show()
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
    onChangePwdFailure
}
