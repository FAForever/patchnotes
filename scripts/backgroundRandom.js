function background(x){

    if (x.matches){
        document.getElementsByTagName('html')[0].style.backgroundColor = "var(--Primary-Light-BG)";
    } 
    else
    {
        var imgs = ['../assets/images/backgrounds/1.jpg','../assets/images/backgrounds/2.jpg','../assets/images/backgrounds/3.jpg','../assets/images/backgrounds/4.jpg','../assets/images/backgrounds/5.jpg','../assets/images/backgrounds/6.jpg',];

        var img = imgs[Math.floor(Math.random()*imgs.length)];
    
        document.getElementsByTagName('html')[0].style.backgroundImage = 'url(' + img + ')';
        
    }
}

let x = window.matchMedia("(max-width: 420px)");
background(x);
x.addListener(background);