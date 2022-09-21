const grid = document.querySelector('.grid');
const spanPlayer = document.querySelector('.player');
const timer = document.querySelector('.timer');
const covers = 
    ['U2', 
    'queen', 
    'velvet', 
    'madonna',  
    'grace', 
    'nirvana',
    'joydivision', 
    'bad', 
    'beatles',
    'petshopboys',
    'craftwerk',
    'pinkdark', 
    'cranb',
    'direstraits',
    'supertramp',
    'secos',
    'tears',
    'david',
    'velvet',
    'scorpions',];

const createElement = (tag, className) => {
    const element = document.createElement(tag);
    element.className = className;
    return element;
}

let firstCard = '';
let secondCard = '';

const checkEndGame = () => {
    const disabledCards = document.querySelectorAll('.disabled-card');

    if (disabledCards.length == 40){
        
        alert(`Parabéns, ${spanPlayer.innerHTML} ! vovê conseguiu!`);
        
        clearInterval(this.loop);
        
        alert(`O seu tempo foi: ${timer.innerHTML}`);
    }
}

const checkCards = () => {
    const firstCover = firstCard.getAttribute('data-cover');
    const secondCover = secondCard.getAttribute('data-cover')

    if (firstCover == secondCover) {
        firstCard.firstChild.classList.add('disabled-card');
        secondCard.firstChild.classList.add('disabled-card');
        
        firstCard = '';
        secondCard = '';

        checkEndGame();
    
    } else {

        setTimeout(() => {
            firstCard.classList.remove('reveal-card');
            secondCard.classList.remove('reveal-card');

            firstCard = '';
            secondCard = '';
        }, 500)
    }
}
const revealCard = ({target}) => {
    
    if (target.parentNode.className.includes('reveal-card')) {
        return;
    }

    if (firstCard == '') {
        target.parentNode.classList.add('reveal-card');
        firstCard = target.parentNode;
    
    } else if (secondCard == '') {
        target.parentNode.classList.add('reveal-card');
        secondCard = target.parentNode;
        checkCards();
    }
}

const  createCard = (cover) => {
    const card = createElement('div', 'card');
    const front = createElement('div', 'face front');
    const back = createElement('div', 'face back');

    front.style.backgroundImage = `url('../image/${cover}.png')`;

    card.appendChild(front);
    card.appendChild(back);

    card.addEventListener('click', revealCard);
    card.setAttribute('data-cover', cover);
    
    return card;
}

const loadGame = () => {
    const duplicateCovers = [...covers, ...covers];
    const shuffledArray = duplicateCovers.sort(() => Math.random() - 0.5)
    
    shuffledArray.forEach((cover) => {
        const card = createCard(cover);
        grid.appendChild(card);

    })
    
}

const startTimer = () => {
    this.loop = setInterval(() => {
        const currentTime = Number(timer.innerHTML);
        timer.innerHTML = currentTime + 1;
    }, 1000);
}

window.onload = () => {
    spanPlayer.innerHTML = localStorage.getItem('player');
    
    startTimer();
    loadGame();
}





