// cores em português mapeadas para valores CSS
const cores = [
  { nome: "vermelho", valor: "red" },
  { nome: "azul", valor: "blue" },
  { nome: "verde", valor: "green" },
  { nome: "amarelo", valor: "yellow" },
  { nome: "roxo", valor: "purple" },
  { nome: "laranja", valor: "orange" },
  { nome: "rosa", valor: "pink" },
  { nome: "marrom", valor: "brown" },
  { nome: "cinza", valor: "gray" },
  { nome: "ciano", valor: "cyan" }
];

const attemptsSpan = document.getElementById("attempts-remaining");
const colorInput = document.getElementById("color-input");
const guessButton = document.getElementById("guess-button");
const restartButton = document.getElementById("restart-button");
const feedback = document.getElementById("feedback");
const historyList = document.getElementById("history");
const colorSample = document.getElementById("color-sample");

let secretColor = "";
let attempts = 3;

function pickRandomColor() {
  return cores[Math.floor(Math.random() * cores.length)];
}

function setFeedback(msg) { 
  feedback.textContent = msg; 
}

function initGame() {
  secretColor = pickRandomColor(); // agora é objeto {nome, valor}
  attempts = 3;
  attemptsSpan.textContent = attempts;
  colorInput.value = "";
  document.body.style.backgroundColor = "#121212";
  setFeedback("O jogo começou! Tente adivinhar a cor.");
  guessButton.disabled = false;
  restartButton.classList.add("hidden");
  historyList.innerHTML = "";
  colorSample.classList.add("hidden");
  // remover classes de animação
  document.body.classList.remove("win", "lose");
  feedback.classList.remove("win", "lose");
}

function handleGuess() {
  const raw = colorInput.value.trim().toLowerCase();
  if (!raw) { setFeedback("Digite uma cor!"); colorInput.classList.add("input-shake"); setTimeout(()=>colorInput.classList.remove("input-shake"),420); return; }

  const match = cores.find(c => c.nome === raw);
  if (!match) { setFeedback("Cor inválida! Use uma sugestão."); colorInput.classList.add("input-shake"); setTimeout(()=>colorInput.classList.remove("input-shake"),420); return; }

  // adicionar ao histórico (usar valor CSS para a amostra)
  const li = document.createElement("li");
  const sw = document.createElement("span");
  sw.style.width = "14px";
  sw.style.height = "14px";
  sw.style.display = "inline-block";
  sw.style.borderRadius = "4px";
  sw.style.background = match.valor;
  li.appendChild(sw);
  li.appendChild(document.createTextNode(" " + match.nome));
  historyList.prepend(li);

  if (match.nome === secretColor.nome) {
    // vitória
    document.body.style.backgroundColor = secretColor.valor;
    setFeedback("🎉 Você acertou!");
    feedback.classList.add("win");
    document.body.classList.add("win");
    guessButton.disabled = true;
    restartButton.classList.remove("hidden");
    colorSample.classList.add("hidden");
    return;
  }

  // erro
  attempts--;
  attemptsSpan.textContent = attempts;
  if (attempts > 0) {
    setFeedback("❌ Errou! Tentativas restantes: " + attempts);
    // pequena animação de tristeza local
    document.body.classList.add("lose");
    setTimeout(()=>document.body.classList.remove("lose"), 520);
  } else {
    setFeedback("💀 Fim de jogo! A cor era: " + secretColor.nome);
    feedback.classList.add("lose");
    document.body.classList.add("lose");
    guessButton.disabled = true;
    restartButton.classList.remove("hidden");
    colorSample.classList.add("hidden");
  }
}

/* pré-visualização com mapeamento */
colorInput.addEventListener("input", () => {
  const val = colorInput.value.trim().toLowerCase();
  const match = cores.find(c => c.nome === val);
  if (match) {
    colorSample.style.background = match.valor;
    colorSample.classList.remove("hidden");
  } else {
    colorSample.classList.add("hidden");
  }
});

/* permitir clicar nas tags de sugestão */
document.querySelectorAll(".tag").forEach(tag => {
  tag.addEventListener("click", () => {
    const nome = tag.getAttribute("data-cor");
    colorInput.value = nome;
    colorInput.dispatchEvent(new Event("input")); // atualiza preview
    colorInput.focus();
  });
});

guessButton.addEventListener("click", handleGuess);
restartButton.addEventListener("click", initGame);

window.addEventListener("DOMContentLoaded", initGame);
