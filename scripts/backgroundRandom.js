function setBackground({matches}){
    const htmlElement = document.documentElement;

    if (matches.matches) {
        htmlElement.style.backgroundColor = "var(--Background)";
        htmlElement.style.backgroundImage = "";
    } else {
        const imgs = [
            '../assets/images/backgrounds/1.jpg',
            '../assets/images/backgrounds/2.jpg',
            '../assets/images/backgrounds/3.jpg',
            '../assets/images/backgrounds/4.jpg',
            '../assets/images/backgrounds/5.jpg',
            '../assets/images/backgrounds/6.jpg',
        ];
        const randomImg = imgs[Math.floor(Math.random() * imgs.length)];
        htmlElement.style.backgroundImage = `url(${randomImg})`;
        htmlElement.style.backgroundColor = "";
    }
}

const mediaQuery = window.matchMedia("(max-width: 420px)");
setBackground(mediaQuery);
mediaQuery.addEventListener(function(mediaQuery){
    setBackground(mediaQuery);
});