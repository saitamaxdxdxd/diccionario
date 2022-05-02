"use strict";

import { specificCharacters } from "./diacritics.js";
import { displayResults, displayNoneResults, getWords, wordObj, cleanEntries } from "./functions.js";

// API where we get all the words
const ENDPOINT = `http://localhost:4000/api/v1/only-words`;
const WORD_LIST = await getWords(ENDPOINT);

// DOM
const input = document.getElementById("search-input");
const searchBtn = document.getElementById("search-button");
const optionsHtml = document.querySelector(".options");
const word = document.getElementById("word-title");
const etimology = document.getElementById("word-etimology");
const definition = document.getElementById("word-definition");

// SET of elements of the final format on HTML page
const WHOLE_WORD = { word, etimology, definition };

let currentOption = 0;

// Happens after someone press any key and release it
input.addEventListener("keyup", async e => {
    const word = input.value.trim();
    let newWord = "";

    // replace every vowel to the correspondient object "specificCharacter"
    for (let i = 0; i < word.length; i++) {
        if (word[i] in specificCharacters) {
            newWord += specificCharacters[word[i]];
        }
        else newWord += word[i]
    }

    // create new regular expression 
    const wordRegExp = new RegExp(`^${newWord}`, "i");
    optionsHtml.innerHTML = "";

    // Our particular function that return us a list of options that starts with the fragment we give it in the input 
    let options = WORD_LIST.filter(element => wordRegExp.test(element)).slice(0, 10);
    if (word === "") options = [];
    options.forEach(element => optionsHtml.innerHTML += `<div id="${options.indexOf(element)}" class="option">${element}<div>`);

    // Select each div option
    const optiosnDiv = [];
    for (let i = 0; i < options.length; i++) {
        optiosnDiv.push(document.getElementById(i));
    }

    // Select the word by clicking the option
    optiosnDiv.forEach(optionDiv => {
        optionDiv.addEventListener("click", async () => {
            currentOption = 0;
            try {
                input.value = optionDiv.textContent;
                const url = `${ENDPOINT}/${input.value}`;
                const findWord = await wordObj(url);
                displayResults(findWord, WHOLE_WORD);
                options.forEach(element => optionsHtml.innerHTML = ``);

            }
            catch (err) {
                console.log("error:", err.message);
            }
        });
        optionDiv.addEventListener("mouseover", e => {
            currentOption = options.indexOf(optionDiv.textContent);
            optionDiv.classList.add("option");
        });
    });


    if (options.length > 0 && e.key === "ArrowDown") {

        optiosnDiv.forEach(optionDiv => {
            optionDiv.addEventListener("mouseover", () => {
                optionDiv.classList.remove("option");
            });
        });

        optiosnDiv[currentOption].classList.add("current-option")
        currentOption++;
        if (currentOption === optiosnDiv.length) currentOption = 0;

    }

    if (e.key === "Enter" & word !== "") {
        input.value = "";
        const wordFounded = WORD_LIST.filter(element => element === word);

        // there is at least one result
        if (wordFounded.length > 0) {
            const word = await wordObj(`${ENDPOINT}/${wordFounded}`);
            displayResults(word, WHOLE_WORD);
        }

        // No results
        else {
            cleanEntries(input, WHOLE_WORD);
            displayNoneResults(word, WHOLE_WORD);
        }
    }
    else if (e.key === "Enter" & word == "") {
        displayNoneResults(word, WHOLE_WORD);
    }
});



// Happens when we click the search button
searchBtn.addEventListener("click", async () => {
    const word = input.value.trim();
    if (input.value !== "") {
        const wordFounded = WORD_LIST.filter(element => element === word);
        if (wordFounded.length > 0) {
            const word = await wordObj(`${ENDPOINT}/${wordFounded}`);
            displayResults(word, WHOLE_WORD);
        }
        else {
            /* let optionsDiv = []
            for (let i = 0; i < options.length; i++) {
                optionsDiv.push(document.getElementById(i));
            } */
            cleanEntries(input, WHOLE_WORD);
            displayNoneResults(word, WHOLE_WORD);
        }
    }
    else if (word == "") {
        displayNoneResults(word, WHOLE_WORD);
    }
});