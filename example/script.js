document.addEventListener("DOMContentLoaded", () => {
  const awesomeButton = document.getElementById("awesomeButton");

  if (awesomeButton) {
    awesomeButton.addEventListener("click", () => playVideo());
  }

  const playVideo = () => {
    const iframe = document.getElementById("rick-roll-iframe");
    if (iframe) {
      iframe.src = "https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1";
    }

    hideElements();
    changeBackgroundColor();
  };

  const hideElements = () => {
    const heading = document.getElementById("rick-roll-heading");
    const button = document.getElementById("awesomeButton");

    if (heading) {
      heading.style.display = "none";
    }

    if (button) {
      button.style.display = "none";
    }
  };

  const changeBackgroundColor = () => {
    const colors = [
      "red",
      "orange",
      "yellow",
      "green",
      "blue",
      "indigo",
      "violet",
    ];
    let index = 0;

    const updateColor = () => {
      document.body.style.backgroundColor = colors[index];
      index = (index + 1) % colors.length;
    };

    setInterval(updateColor, 500);
  };
});
