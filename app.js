// create variables for neccessary HTML Elements
const qwerty = document.querySelector('#qwerty');
const phrase = document.querySelector('#phrase');
const startButton = document.querySelector('.btn__reset');


// create an array of phrases
var phrases = [
        'Nice tats bro',
        'Cool story bro',
        'dope beats bro',
        'catchy hooks man',
        'poppin coding dude'
];


// converts individual phrases into arrays of letters
getRandomPhraseAsArray = (array) => {
        const max = (Math.floor(array.length));
        const min = 0;
        let randomNum = Math.floor(Math.random() * (max - min) + min);
        return array[randomNum];
};


// creates an li element for each letter and assigns it the necessary class
addPhrasetoDisplay = (string) => {
    const phraseList = phrase.childNodes[0].nextElementSibling;
        for (let i = 0; i < string.length; i++) {
            let listItem = document.createElement('li'),
                listContent = document.createTextNode(string[i]);
            if (string[i] !== ' ') {
                listItem.className = 'letter';
            } else {
                listItem.className = 'space';
            }
            listItem.appendChild(listContent);
            phraseList.appendChild(listItem);
        }
    };

    // restarts the game if number of number of wrong letters is less than five
    restart = () => {
        const phraseUl = phrase.childNodes[0].nextElementSibling,
        buttons = document.querySelectorAll('button');
        oldLetters = phraseUl.childNodes,
        tryList = document.querySelector('ol'),
        tries = document.querySelectorAll('.tries'),
        heartImg = 'images/liveHeart.png';
        let newPhrases = [
            'Nice tats bro',
            'Cool story bro',
            'dope beats bro',
            'catchy hooks man',
            'poppin coding dude'
        ];

        while (oldLetters.length > 0) {
            oldLetters.forEach(letter => {
                letter.remove();
            });
        }
        for (let i = 0; i < buttons.length; i++) {
            buttons[i].className = '';
            buttons[i].disabled = false;
        }
        if(tries.length !== 5) {
            for (let i = 0; i < (5 - tries.length); i++) {
                const attempt = document.createElement('li'),
                image = new Image(36.5, 35);
                image.src = heartImg;
                image.className = '__web-inspector-hide-shortcut__';
                tryList.appendChild(attempt);
                attempt.appendChild(image);
            }
        const listofTries = document.querySelectorAll('ol > li');
            listofTries.forEach(attempt => {
                attempt.className = 'tries';
            });
        }
        missed = 0;
        phraseArray = getRandomPhraseAsArray(newPhrases);
        addPhrasetoDisplay(phraseArray);
    };


    // initializes the number of misses to 0
    let missed = 0,


    // calling functions
    phraseArray = getRandomPhraseAsArray(phrases);
    addPhrasetoDisplay(phraseArray);


    // add event listener to start button
    startButton.addEventListener('click', (event) => {
        const startOverlay = event.target.parentNode,
            oldLetters = document.querySelector('letter')
        if (startOverlay.className === 'start' || startOverlay.className === 'win' || startOverlay.className === 'lose') {
            restart();
            startOverlay.style.display = 'none';
        }
    });


    // checks to see if the game has been won and checks correct guesses
    qwerty.addEventListener('click', (event) => {
        if (event.target.tagName === "BUTTON") {
            let button,
            letterFound = '',
            tries = document.querySelectorAll('.tries');

           
                const checkLetter = (letter) => {
                    let letters = document.querySelectorAll('.letter'),
                    matchedLetterCount = 0;
                    letters.forEach(item => {
                        let currentLetter = item.innerHTML.toLowerCase();
                        if (currentLetter === letter) {
                            item.className += ' show';
                            matchedLetterCount += 1;
                        }
                    });
                    if (matchedLetterCount === 0) {
                        letterFound = null;
                        matchedLetterCount = 0;
                    } else if(matchedLetterCount > 0) {
                        letterFound = letter;
                        matchedLetterCount = 0;
                    }
                },
            
           
                checkWin = () => {
                    const revealedLetters = document.querySelectorAll('.show'),
                    lettersInPhrase = document.querySelectorAll('.letter');
                    let startOverlay = document.querySelector('#overlay'),
                    overlayTitle = document.querySelector('.title');
            
                    if(revealedLetters.length === lettersInPhrase.length) {
                        startOverlay.style.display = '';
                        startOverlay.className = 'win';
                        overlayTitle.textContent = 'You Win!';
                    } else if (missed === 5) {
                        startOverlay.style.display = '';
                        startOverlay.className = 'lose';
                        overlayTitle.textContent = 'You Lose!';
                    }
                };

            
                button = event.target.textContent.toLowerCase();
                event.target.className = 'chosen';
                event.target.disabled = true;
                checkLetter(button);
                if (letterFound === null) {
                    let counter = missed;
                    tries[0].remove();
                    missed += 1;
                }
                checkWin();
        }
    });