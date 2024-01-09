function background(x){

    if (x.matches){
        document.getElementsByTagName('html')[0].style.backgroundColor = "var(--Primary-Light-BG)";
    } 
    else
    {
        var imgs = ['./imagesbackgrounds/1.jpg','./images/backgrounds/2.jpg','./images/backgrounds/3.jpg','./images/backgrounds/4.jpg','./images/backgrounds/5.jpg','./images/backgrounds/6.jpg',];

        var img = imgs[Math.floor(Math.random()*imgs.length)];
    
        document.getElementsByTagName('html')[0].style.backgroundImage = 'url(' + img + ')';
        
    }
}

let x = window.matchMedia("(max-width: 420px)");
background(x);
x.addListener(background);