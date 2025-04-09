const colorInput = document.getElementById("color-input");
const selectMode = document.getElementById("color-scheme-select");
const btnGetColor = document.getElementById("get-color");

let seedColor = "";
let colorList = [];
let formattedColor = "FF0000";
let modeSelected = "monochrome";
const colorModeList = [
  "Monochrome",
  "Monochrome-dark",
  "Monochrome-light",
  "Analogic",
  "Complement",
  "Analogic-complement",
  "Triad",
  "Quad",
];

selectMode.addEventListener("change", (e) => {
  modeSelected = e.target.value.toLowerCase();
});

colorModeList.forEach((mode) => {
  const option = document.createElement("option");
  option.value = mode;
  option.innerText = mode;
  selectMode.appendChild(option);
});

colorInput.addEventListener("input", (e) => {
  seedColor = e.target.value;
  formattedColor = seedColor.replace("#", "");
});

btnGetColor.addEventListener("click", () => {
  fetch(
    `https://www.thecolorapi.com/scheme?hex=${formattedColor}&mode=${modeSelected}&count=5`
  )
    .then((res) => res.json())
    .then((data) => {
      colorList = data.colors.map((color) => color.hex.value);

      colorList.forEach((color, index) => {
        const col = document.getElementById(`col-${index + 1}`);
        const colCopy = document.getElementById(`col-copy-${index + 1}`);
        const p = colCopy.querySelector("p");

        col.style.backgroundColor = color;
        p.textContent = color;
        colCopy.style.color = "black";

        const copyToClipboard = () => {
          navigator.clipboard
            .writeText(color)
            .then(() => {
              p.textContent = "Copiado!";
              p.style.color = "royalblue";
              setTimeout(() => {
                p.textContent = color;
                p.style.color = "black";
              }, 1000);
            })
            .catch((err) => console.error("Error al copiar:", err));
        };

        col.onclick = copyToClipboard;
        colCopy.onclick = copyToClipboard;
      });
    });
});

function initDefaultColors() {
  for (let i = 1; i <= 5; i++) {
    const colorBox = document.getElementById(`col-${i}`);
    const colCopy = document.getElementById(`col-copy-${i}`);
    const p = colCopy.querySelector("p");
    const hex = p.textContent.trim();

    colorBox.style.backgroundColor = hex;

    const copyToClipboard = () => {
      navigator.clipboard
        .writeText(hex)
        .then(() => {
          p.textContent = "Copiado!";
          p.style.color = "royalblue";
          setTimeout(() => {
            p.textContent = hex;
            p.style.color = "black";
          }, 1000);
        })
        .catch((err) => console.error("Error al copiar:", err));
    };

    colorBox.onclick = copyToClipboard;
    colCopy.onclick = copyToClipboard;
  }
}

initDefaultColors();
