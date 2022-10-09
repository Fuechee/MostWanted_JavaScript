/*
    Author: devCodeCamp
    Description: Most Wanted Starter Code
*/
//////////////////////////////////////////* Beginning Of Starter Code *//////////////////////////////////////////

"use strict";
//? Utilize the hotkey to hide block level comment documentation
////* Mac: Press "CMD"+"K" and then "CMD"+"/"
////* PC: Press "CTRL"+"K" and then "CTRL"+"/"

/**
 * This is the main logic function being called in index.html.
 * It operates as the entry point for our entire application and allows
 * our user to decide whether to search by name or by traits.
 * @param {Array} people        A collection of person objects.
 */
function app(people) {
    // promptFor() is a custom function defined below that helps us prompt and validate input more easily
    // Note that we are chaining the .toLowerCase() immediately after the promptFor returns its value
    let searchType = promptFor(
        "Do you know the name of the person you are looking for? Enter 'yes' or 'no'",
        yesNo
    ).toLowerCase();
    let searchResults;
    // Routes our application based on the user's input
    switch (searchType) {
        case "yes":
            searchResults = searchByName(people);
            break;
        case "no":
            //! TODO #4: Declare a searchByTraits (multiple traits) function //////////////////////////////////////////
                //! TODO #4a: Provide option to search for single or multiple //////////////////////////////////////////
            searchResults = searchByTraits(people);
            break;
        default:
            // Re-initializes the app() if neither case was hit above. This is an instance of recursion.
            app(people);
            break;
    }
    // Calls the mainMenu() only AFTER we find the SINGLE PERSON
    mainMenu(searchResults, people);
}
// End of app()

/**
 * After finding a single person, we pass in the entire person-object that we found,
 * as well as the entire original dataset of people. We need people in order to find
 * descendants and other information that the user may want.
 * @param {Object[]} person     A singular object inside of an array.
 * @param {Array} people        A collection of person objects.
 * @returns {String}            The valid string input retrieved from the user.
 */
function mainMenu(person, people) {
    // A check to verify a person was found via searchByName() or searchByTrait()
    if (!person[0]) {
        alert("Could not find that individual.");
        // Restarts app() from the very beginning
        return app(people);
    }
    let displayOption = prompt(
        `Found ${person[0].firstName} ${person[0].lastName}. Do you want to know their 'info', 'family', or 'descendants'?\nType the option you want or type 'restart' or 'quit'.`
    );
    // Routes our application based on the user's input
    switch (displayOption) {
        case "info":
            //! TODO #1: Utilize the displayPerson function //////////////////////////////////////////
            // HINT: Look for a person-object stringifier utility function to help
            let personInfo = displayPerson(person[0]);
            alert(personInfo);
            break;
        case "family":
            //! TODO #2: Declare a findPersonFamily function //////////////////////////////////////////
            // HINT: Look for a people-collection stringifier utility function to help
            let personFamily = findPersonFamily(person[0], people);
            alert(personFamily);
            break;
        case "descendants":
            //! TODO #3: Declare a findPersonDescendants function //////////////////////////////////////////
            // HINT: Review recursion lecture + demo for bonus user story
            let personDescendants = findPersonDescendants(person[0], people);
            alert(personDescendants);
            break;
        case "restart":
            // Restart app() from the very beginning
            app(people);
            break;
        case "quit":
            // Stop application execution
            return;
        default:
            // Prompt user again. Another instance of recursion
            return mainMenu(person, people);
    }
}
// End of mainMenu()

/**
 * This function is used when searching the people collection by
 * a person-object's firstName and lastName properties.
 * @param {Array} people        A collection of person objects.
 * @returns {Array}             An array containing the person-object (or empty array if no match)
 */
function searchByName(people) {
    let firstName = promptFor("What is the person's first name?", chars);
    let lastName = promptFor("What is the person's last name?", chars);

    // The foundPerson value will be of type Array. Recall that .filter() ALWAYS returns an array.
    let foundPerson = people.filter(function (person) {
        if (person.firstName === firstName && person.lastName === lastName) {
            return true;
        }
    });
    return foundPerson;
}
// End of searchByName()

/**
 * This function will be useful for STRINGIFYING a collection of person-objects
 * first and last name properties in order to easily send the information
 * to the user in the form of an alert().
 * @param {Array} people        A collection of person objects.
 */
function displayPeople(people) {
    alert(
        people
            .map(function (person) {
                return `${person.firstName} ${person.lastName}`;
            })
            .join("\n")
    );
}
// End of displayPeople()

/**
 * This function will be useful for STRINGIFYING a person-object's properties
 * in order to easily send the information to the user in the form of an alert().
 * @param {Object} person       A singular object.
 */
function displayPerson(person) {
    let personInfo = `First Name: ${person.firstName}\n`;
    personInfo += `Last Name: ${person.lastName}\n`;
    personInfo += `gender: ${person.gender}\n`;
    personInfo += `dob: ${person.dob}\n`;
    personInfo += `height: ${person.height}\n`;
    personInfo += `weight: ${person.weight}\n`;
    personInfo += `eyeColor: ${person.eyeColor}\n`;
    personInfo += `occupation: ${person.occupation}\n`;
    //! TODO #1a: finish getting the rest of the information to display //////////////////////////////////////////
    alert(personInfo);
}
// End of displayPerson()

/**
 * This function's purpose is twofold:
 * First, to generate a prompt with the value passed in to the question parameter.
 * Second, to ensure the user input response has been validated.
 * @param {String} question     A string that will be passed into prompt().
 * @param {Function} valid      A callback function used to validate basic user input.
 * @returns {String}            The valid string input retrieved from the user.
 */
function promptFor(question, valid) {
    do {
        var response = prompt(question).trim();
    } while (!response || !valid(response));
    return response;
}
// End of promptFor()

/**
 * This helper function checks to see if the value passed into input is a "yes" or "no."
 * @param {String} input        A string that will be normalized via .toLowerCase().
 * @returns {Boolean}           The result of our condition evaluation.
 */
function yesNo(input) {
    return input.toLowerCase() === "yes" || input.toLowerCase() === "no";
}
// End of yesNo()

/**
 * This helper function operates as a default callback for promptFor's validation.
 * Feel free to modify this to suit your needs.
 * @param {String} input        A string.
 * @returns {Boolean}           Default validation -- no logic yet.
 */
function chars(input) {
    return true; // Default validation only
}
// End of chars()

//////////////////////////////////////////* End Of Starter Code *//////////////////////////////////////////
// Any additional functions can be written below this line 👇. Happy Coding! 😁

function findPersonFamily(person, people) {
    let personFamily = '';
    let foundSpounse = people.filter(function(people){
        if(person.currentSpouse === people.id){
            return true;
        }
    })
    if(foundSpounse.length === 0){
        personFamily += "No Spouse\n";
    }else{
        personFamily += `Spouse: ${foundSpounse[0].firstName} ${foundSpounse[0].lastName}\n`;
    }
    let foundParents = people.filter(function(people){
        for(let i=0; i < person.parents.length; i++){
            if(person.parents[i] === people.id){
                return true;
            }
        }
    })
    if(foundParents.length === 0){
        personFamily += "No Parents\n";
    }else{
        personFamily += `Parents: ${foundParents[0].firstName} ${foundParents[0].lastName}, ${foundParents[1].firstName} ${foundParents[1].lastName}\n`;
    }
    let foundSiblings = people.filter(function(people){
        for(let i=0; i < person.parents.length; i++){
            for(let k=0; k < person.parents.length; k++){
                if(person.parents[k] === people.parents[i]){
                    if(person.id === people.id){
                        return false;
                    }else{
                        return true;
                    }
                }
            }
        }
    })
    if(foundSiblings.length === 0){
        personFamily += "No Siblings\n";
    }else{
        for(let i=0; i < foundSiblings.length; i++){
            personFamily += `Sibling: ${foundSiblings[i].firstName} ${foundSiblings[i].lastName}\n`;
        }
    }
    return personFamily;
}

function findPersonDescendants(person, people){
    let foundGrandChildren = [];
    let descendants = people;
    let foundChildren = people.filter(function(people){
        for(let i=0; i< people.parents.length; i++){
            if(person.id == people.parents[i]){
                let foundChildren2 = people;
                let foundGrandChildren2 = descendants.filter(function(people){
                    for(let k=0; k< people.parents.length; k++){
                        if(foundChildren2 == people.parents[k]){
                            foundGrandChildren2.push(people);
                            return true;
                        }
                    }
                })
            }
        }
    return true;
    })
    let personDescendants = '';
    if(foundChildren.length === 0){
        personDescendants += "They have no children\n";
    }else{
        for(let i=0; i < foundChildren.length; i++){
            personDescendants += `Children: ${foundChildren[0].firstName} ${foundChildren[0].lastName}\n`;
        }
    }
    if(foundGrandChildren.length === 0){
        personDescendants += "They have no grandchildren";
    }else{
        for(let i=0; i < foundGrandChildren.length; i++){
            personDescendants += `Grandchildren: ${foundGrandChildren[i].firstName} ${foundGrandChildren[i].lastName}`;
        }
    }
    return personDescendants;
}


// My attempt on recursion

// function findPersonDescendants(person, people, array=[]){
//     let foundGrandChildren = [];
//     array = people;
//     let descendantsArray = person.descendants;
//     let foundChildren = people.filter(function(people){
//         for(let i=0; i< people.parents.length; i++){
//             if(person.id == people.parents[i]){
//                 let foundChildren2 = people;
//                 let foundGrandChildren2 = array.filter(function(people){
//                     for(let k=0; k< people.parents.length; k++){
//                         if(foundChildren2 == people.parents[k]){
//                             foundGrandChildren2.push(people);
//                             return true;
//                         }
//                     }
//                 })
//             }
//         }
//         return true;
//     })
//     let personDescendants = '';
//     if (descendantsArray.length === 0){
//         return array;
//     }
//     for (let i=0; i < descendantsArray.length; i++){
//         array = array.concat(
//             recursiveFindDescendants(descendantsArray[i])
//         );
//         return array;
//     }
//     if(foundChildren.length === 0){
//         personDescendants += "They have no children\n";
//     }else{
//         for(let i=0; i < foundChildren.length; i++){
//             personDescendants += `Children: ${foundChildren[0].firstName} ${foundChildren[0].lastName}\n`;
//         }
//     }
//     if(foundGrandChildren.length === 0){
//         personDescendants += "They have no grandchildren";
//     }else{
//         for(let i=0; i < foundGrandChildren.length; i++){
//             personDescendants += `Grandchildren: ${foundGrandChildren[i].firstName} ${foundGrandChildren[i].lastName}`;
//         }
//     }
//     return personDescendants;
// }


function searchByTraits(people){
    let searchResults = people;
    while(searchResults.length === 0 || searchResults.length > 1){
        let searchTrait = promptFor("What trait do you want to search by: gender, dob, height, weight, eye color (type in eyeColor), occupation?\n Type your option or type restart or quit", chars);
        switch(searchTrait){
            case 'restart':
                return app(people);
                break;
            case 'quit':
                return;
            case 'gender':
                searchResults = searchByGender(searchResults)
                if(searchResults.length != 0){
                    alert(getResults(searchResults))
                    break;
                }else{
                    return searchByTraits(people);
                }
            case 'dob':
                searchResults = searchByDob(searchResults)
                if(searchResults.length !=0){
                    alert(getResults(searchResults))
                    break;
                }else{
                    alert("Sorry, that date doesn't exist");
                    return searchByTraits(people);
                }
            case 'height':
                searchResults = searchByHeight(searchResults)
                if(searchResults.length !=0){
                    alert(getResults(searchResults))
                    break;
                }else{
                    alert("Sorry, that height doesn't exist")
                    return searchByTraits(people);
                }
            case 'weight':
                searchResults = searchByWeight(searchResults)
                if(searchResults.length !=0){
                    alert(getResults(searchResults))
                    break;
                }else{
                    alert("Sorry, that weight doesn't exist")
                    return searchByTraits(people);
                }
            case 'eyeColor':
                searchResults = searchByEyeColor(searchResults)
                if(searchResults.length !=0){
                    alert(getResults(searchResults))
                }else{
                    alert("Sorry, that eye color doesn't exist")
                    return searchByTraits(people);
                }
            case 'occupation':
                searchResults = searchByOccupation(searchResults)
                if(searchResults.length !=0){
                    alert(getResults(searchResults))
                }else{
                    alert("Sorry, that occupation doesn't exist")
                    return searchByTraits(people);
                }
        }

    }
    return searchResults;
}

function getResults(searchResults){
    let display = '';
    for(let i=0; i < searchResults.length; i++){
        display += `Name: ${searchResults[i].firstName} ${searchResults[i].lastName}\n`;
    }
    return display;
}

function searchByGender(people){
    let foundGender = promptFor("male or female: ", chars);
    let searchResults = people.filter(function(people){
        if(people.gender === foundGender){
            return true;
        }
    })
    return searchResults;
}

function searchByDob(people){
    let foundDob = promptFor("What date do you want to search by?\n", chars);
    let searchResults = people.filter(function(people){
        if(people.dob === foundDob){
            return true;
        }
    })
    return searchResults;
}

function searchByHeight(people){
    let foundHeight = parseInt(promptFor("What height do you want to search by?\n", chars));
    let searchResults = people.filter(function(people){
        if(people.height === foundHeight){
            return true;
        }
    })
    return searchResults;
}

function searchByWeight(people){
    let foundWeight = parseInt(promptFor("What weight do you want to search by?\n", chars));
    let searchResults = people.filter(function(people){
        if(people.weight === foundWeight){
            return true;
        }
    })
    return searchResults;
}

function searchByEyeColor(people){
    let foundEyeColor = promptFor("What color do you want to search by?\n", chars);
    let searchResults = people.filter(function(people){
        if(people.eyeColor === foundEyeColor){
            return true;
        }
    })
    return searchResults;
}

function searchByOccupation(people){
    let foundOccupation = promptFor("What occupation do you want to search by?\n", chars);
    let searchResults = people.filter(function(people){
        if(people.occupation === foundOccupation){
            return true;
        }
    })
    return searchResults;
}