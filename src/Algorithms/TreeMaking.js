/* eslint-disable max-len */
/* eslint-disable require-jsdoc */

// going to recive list of participants / participating team
// going to give match tree
// [{player1, player2, isDone, winner}…]
export function roundMaking(participants) {
    const shuffledList = shuffleArray(participants);
    const matches = shuffledList.length;
    const matchesArray = [];

    for (let i = 0; i < matches - 1; i+=2) {
        matchesArray[i/2] = {p1: shuffledList[i], p2: shuffledList[i+1], isDone: false, winner: null};
    }

    if (matches % 2 == 1) {
        matchesArray[matchesArray.length] = {p1: shuffledList[matches - 1], p2: null, isDone: true, winner: shuffledList[matches - 1]};
    }

    return matchesArray;
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
}

export function getRemaining(matches) {
    let remaining;
    for (let i = 0; i < matches.length; i++) {
        remaining[i] = matches[i].winner;
    }
    return remaining;
}

export function findMatch(matches, userRefrence) {
    for(let i = 0; i < matches.length; i++) {
        if(matches[i].p1 == userRefrence || matches[i].p2){
            return matches[i];
        }
        else{
            return {p1:'fel', p2:'fel2', isDone: true, winner: 'fel1'}
        }
    }
}
