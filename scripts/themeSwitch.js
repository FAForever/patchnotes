function toggleTheme() {
  const htmlElement = document.documentElement;
  const currentTheme = htmlElement.classList.toggle("light-mode")
    ? "light"
    : "dark";
  localStorage.setItem("theme", currentTheme);
}

// Load theme on page load
document.addEventListener("DOMContentLoaded", () => {
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme) {
    document.documentElement.classList.toggle(
      "light-mode",
      savedTheme === "light"
    );
  }

  const themeToggleButton = document.querySelector("#themeToggleButton");
  if (themeToggleButton) {
    themeToggleButton.addEventListener("click", toggleTheme);
  }
});
