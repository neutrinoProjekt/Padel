/* eslint-disable max-len */
/* eslint-disable require-jsdoc */

// going to recive list of participants / participating team
// going to give match tree
export function treeMaking(participants) {
    return shuffleArray(participants);

}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        let temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}
