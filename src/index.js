/**
    Copyright 2014-2015 Amazon.com, Inc. or its affiliates. All Rights Reserved.

    Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance with the License. A copy of the License is located at

        http://aws.amazon.com/apache2.0/

    or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.
*/

/**
 * This simple sample has no external dependencies or session management, and shows the most basic
 * example of how to create a Lambda function for handling Alexa Skill requests.
 *
 * Examples:
 * One-shot model:
 *  User: "Alexa, ask Space Geek for a space fact"
 *  Alexa: "Here's your space fact: ..."
 */

/**
 * App ID for the skill
 */
var APP_ID = "amzn1.ask.skill.4eebeb0d-1941-411d-9a95-b2926922ae3d";

/**
 * Array containing space facts.
 */
var FACTS = [
    "On a sailboat a sheet is a line used to control and adjust a sail.",
    "On May 15th 2010, Jessica Watson becmae the youngest person to complete a solo and unassisted circumnavigation, she was 16.",
    "The large usually colorful triangle sail used while running is called a spinnaker.",
    "The left side of a boat is called the port side, easily remembered because both left and port have four letters.",
    "Running Rigging consist of all the lines used to control and adjust the sails.",
    "Standing rigging consist of all the cable or wire used to hold the masts up.",
    "Turning your sailboat so that the bow of the boat passes through the eye of the wind is known as a tack.",
    "Turning your sailboat so that the stern of your boat passes through the eye of the wind is known as a jibe.",
    "The yellow flag slown when you first enter territorial waters of another country is called the Q flag or quarantine flag.",
    "The right side of the boat is called the starboard side.",
    "When a boat is heeled the side of the boat closest to the wind is known as the Windward side of the boat.",
    "A sloop rigged vessel has one mast and one fore sail.",
    "when your vessel is pointed straight into the wind this is called being in irons.",
    "The front of the vessel is known as the bow.",
    "The back of the vessel is known as the stern",
    "A sailing vessel is either steered with a wheel or a tiller.",
    "The America's cup is the oldest trophy in international sports and considered yacht racings holy grail.",
    "The America's cup was successfully defended by the New York Yacht Club for 132 years ulimately losing it to the Western Australia's Royal Perth Yacht Club in 1983.",
    "The America's cup was originally made for England’s Royal Yacht Squadron as a yacht racing trophy. It was dubbed the 100 Guinea Cup, as that was its worth. A guinea was roughly equivalent to one British pound sterling."
];

/**
 * The AlexaSkill prototype and helper functions
 */
var AlexaSkill = require('./AlexaSkill');

/**
 * SpaceGeek is a child of AlexaSkill.
 * To read more about inheritance in JavaScript, see the link below.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Introduction_to_Object-Oriented_JavaScript#Inheritance
 */
var Fact = function () {
    AlexaSkill.call(this, APP_ID);
};

// Extend AlexaSkill
Fact.prototype = Object.create(AlexaSkill.prototype);
Fact.prototype.constructor = Fact;

Fact.prototype.eventHandlers.onSessionStarted = function (sessionStartedRequest, session) {
    //console.log("onSessionStarted requestId: " + sessionStartedRequest.requestId + ", sessionId: " + session.sessionId);
    // any initialization logic goes here
};

Fact.prototype.eventHandlers.onLaunch = function (launchRequest, session, response) {
    //console.log("onLaunch requestId: " + launchRequest.requestId + ", sessionId: " + session.sessionId);
    handleNewFactRequest(response);
};

/**
 * Overridden to show that a subclass can override this function to teardown session state.
 */
Fact.prototype.eventHandlers.onSessionEnded = function (sessionEndedRequest, session) {
    //console.log("onSessionEnded requestId: " + sessionEndedRequest.requestId + ", sessionId: " + session.sessionId);
    // any cleanup logic goes here
};

Fact.prototype.intentHandlers = {
    "GetNewFactIntent": function (intent, session, response) {
        handleNewFactRequest(response);
    },

    "AMAZON.HelpIntent": function (intent, session, response) {
        response.ask("You can say tell me a sailing fact, or, you can say exit... What can I help you with?", "What can I help you with?");
    },

    "AMAZON.StopIntent": function (intent, session, response) {
        var speechOutput = "Goodbye";
        response.tell(speechOutput);
    },

    "AMAZON.CancelIntent": function (intent, session, response) {
        var speechOutput = "Goodbye";
        response.tell(speechOutput);
    }
};

/**
 * Gets a random new fact from the list and returns to the user.
 */
function handleNewFactRequest(response) {
    // Get a random space fact from the space facts list
    var factIndex = Math.floor(Math.random() * FACTS.length);
    var randomFact = FACTS[factIndex];

    // Create speech output
    var speechOutput = "Here's your fact: " + randomFact;
    var cardTitle = "Your Fact";
    response.tellWithCard(speechOutput, cardTitle, speechOutput);
}

// Create the handler that responds to the Alexa Request.
exports.handler = function (event, context) {
    // Create an instance of the SpaceGeek skill.
    var fact = new Fact();
    fact.execute(event, context);
};

