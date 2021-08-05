//requirements
const store = require('./../store')
const config = require('./../config')

//sign up req
const signUp = function(data) {
    return $.ajax({
        method: 'POST',
        url: config.apiUrl + '/sign-up',
        data
    })
}

module.exports = {
    signUp
}
