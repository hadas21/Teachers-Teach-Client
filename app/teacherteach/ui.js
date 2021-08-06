const store = require('../store')

store.$signUpModal = $('#sign-up-modal')
store.$logInModal = $('#log-in-modal')
store.$passwordMessage = $('#passwordMessage')
store.$wrongPasswordMessage = $('#wrongPasswordMessage')

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
    store.$signUpModal.hide()
}
const onSignUpFailure = function() {
    store.$signUpForm.trigger('reset')
    if (!store.isConfirmed) {
        store.$passwordMessage.html('Please make sure the passwords match').css('color', 'red')
        store.isConfirmed = true
    } else {
        $('#emailHelp').html("You'r already signed up, please log in").css('color', '#1a6efd')
    }
}

const onLogInSuccess = (response) => {
    //store token for futere validtion
    store.userToken = response.user.token
    store.$logInForm.trigger('reset')
    store.$logInModal.hide()
}

const onLogInFailure = function() {
    store.$logInForm.trigger('reset')
    store.$wrongPasswordMessage.html("Sorry, email and password don't match").css('color', 'red')
}

module.exports = {
    onSignUpSuccess,
    onSignUpFailure,
    onLogInSuccess,
    onLogInFailure,
    passwordInputSuccess,
    passwordInputFailure
}
