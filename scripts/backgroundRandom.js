function setBackground(mediaQuery) {
  const htmlElement = document.documentElement;
  const imgs = [
    "../assets/images/backgrounds/1.jpg",
    "../assets/images/backgrounds/2.jpg",
    "../assets/images/backgrounds/3.jpg",
    "../assets/images/backgrounds/4.jpg",
    "../assets/images/backgrounds/5.jpg",
    "../assets/images/backgrounds/6.jpg",
  ];

  if (mediaQuery.matches) {
    htmlElement.style.backgroundColor = "var(--Background)";
    htmlElement.style.backgroundImage = "none";
  } else {
    const randomImg = imgs[Math.floor(Math.random() * imgs.length)];
    htmlElement.style.backgroundImage = `url(${randomImg})`;
    htmlElement.style.backgroundColor = "transparent";
  }
}

const mediaQuery = window.matchMedia("(max-width: 420px)");

const handleMediaChange = (event) => setBackground(event);

setBackground(mediaQuery);
mediaQuery.addEventListener("change", handleMediaChange);
