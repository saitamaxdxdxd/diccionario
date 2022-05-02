"use strict";

export function displayResults(input, word) {
    word.word.innerHTML = input.palabra;
    word.etimology.innerHTML = input.etimologia;
    word.definition.innerHTML = input.definicion;
}

export function displayNoneResults(input,entries) {
    entries.word.innerHTML = `No existen algún resultado como: ${input}`;
    entries.etimology.innerHTML = "";
    entries.definition.innerHTML = "";
}

export async function getWords(endopoint) {
    const response = await fetch(endopoint);
    return response.json();
}

export async function wordObj(endopoint) {
    const response = await fetch(endopoint);
    return response.json();
}

export function cleanEntries(input, entries) {
    input.value = "";
    entries.word.innerHTML = "";
    entries.etimology.innerHTML = "";
    entries.definition.innerHTML = "";
}