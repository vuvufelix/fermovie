const p = document.getElementsByTagName('p')[0]
const InfoDetails = document.querySelector('#info-details')
const classP = document.querySelector('#p')

ScrollReveal().reveal(p, {
    origin: 'left',
    duration: 900,
    distance: '20%'
});

ScrollReveal().reveal(classP, {
    origin: 'left',
    duration: 1000,
    distance: '20%'
});

ScrollReveal().reveal(InfoDetails, {
    origin: 'left',
    duration: 2000,
    distance: '20%'
});