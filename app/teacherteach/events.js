//requirements
const getFormFields = require('../../lib/get-form-fields')
const api = require('./api')
const ui = require('./ui')

//sign up
const onSignUp = function(event) {
    //prevent page reload
    event.preventDefault()

    const form = event.target
    const data = getFormFields(form)

    api.signUp(data)
    console.log(data)
        //         .then(ui.onSignUpSuccess)
        //         .catch(ui.onSignUpFailure)
}

module.exports = {
    onSignUp
}
