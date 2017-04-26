var builder = require('botbuilder');
const uuid = require('uuid');

const library = new builder.Library('inputRecognizer');

library.dialog('/', [
    function (session) {
        // it always executes this part
        builder.Prompts.text(session,
            `Please type your inquiry!`);
    },
    (session, result) => {
        if (result.response) {
            session.send(result.response);
        }
    }
]);

module.exports = library;