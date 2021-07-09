const { ipcRenderer } = window.require("electron");
const TitleBarButtons = document.querySelectorAll(".button");

const changeSVG = (target: EventTarget) => {
  ipcRenderer.on("isMaximized", () =>
    (<Button>target).classList.add("titlebar__maximize--fullscreen")
  );
  ipcRenderer.on("isRestored", () =>
    (<Button>target).classList.remove("titlebar__maximize--fullscreen")
  );
};

TitleBarButtons.forEach((button) => {
  button.addEventListener("click", (e: Event) => {
    switch ((<Button>e.target).classList[0]) {
      case "titlebar__minimize":
        ipcRenderer.send("minimizeApp");
        break;
      case "titlebar__maximize":
        ipcRenderer.send("maximizeApp");
        changeSVG(e.target);
        break;
      case "titlebar__close":
        ipcRenderer.send("closeApp");
        break;
    }
  });
});
