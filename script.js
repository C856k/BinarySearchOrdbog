"use strict"

function binarySearch(arr, variant) {
    let left = 0;
    let right = arr.length - 1;

    while (left <= right) {
        let mid = Math.floor((left + right) / 2);
        if (arr[mid].variant === variant) {
            return mid;
        } else if (arr[mid].variant < variant) {
            left = mid + 1;
        } else {
            right = mid -1;
        }
    }
    return null;
}

const response = await fetch("ddo-fullform\ddo_fullforms_2023-10-11.csv");
const rawtext = await response.text();

let globalArrayOfWords = rawtext.split("\n").map(line => {
    const parts = line.split("\t");
    return {
        variant: parts[0],
        headword: parts[1],
        homograph: parts[2],
        partofspeech: parts[3],
        id: parts[4]
    };
});

const searchTerm = "hestevogn";
const searchStartTime = performance.now();
const foundWord = binarySearch(globalArrayOfWords, searchTerm);
const searchEndTime = performance.now();

if (foundWord) {
    console.log(JSON.stringify(foundWord, null, 2));
} else {
    console.log(`'${searchTerm}' not found`);
}