var builder = require('botbuilder');
var basicMessages = require('./basicMessages');

let bot;
let conn;
let index = 0;
let responses = [];
let expectedResponses = [];

beforeEach(() => {
    let connector = new builder.ConsoleConnector();
    bot = new builder.UniversalBot(connector);
    conn = connector;
});

test('test case 1 jeff', () => {
    bot.library(require('./dialogs/inputRecognizer'));
        
    // the main dialog "/" should start "inputRecognizer:/"
    // as it can be seen [https://github.com/Microsoft/BotBuilder/blob/858aad96cdd1fabbf7f9a29ee797eb03111d7cba/Node/core/tests/Dialogs.js][1] the code below seems to be identical to the one shown in examples
    bot.dialog('/', [
        (session) => {
            session.beginDialog('inputRecognizer:/');
        }
    ]);

    basicMessages.forEach(o => {if (o.in) {expectedResponses.push(o.in)}});

    console.log(expectedResponses);

    bot.on('send', function (message) {
        responses.push(message.text);
        index++;
        if (index < basicMessages.length) {
            conn.processMessage(basicMessages[index].out);
        } else {
            
            expect(responses).toEqual(expectedResponses);
        }
    });

    conn.processMessage(basicMessages[0].out);
});