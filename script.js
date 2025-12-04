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

let validCores = [];

/* Verifica se o valor é um color CSS válido */
function isCssColor(value) {
  const s = new Option().style;
  s.color = "";
  s.color = value;
  return s.color !== "";
}

/* Filtra cores inválidas e popula validCores */
function validateColors() {
  validCores = cores.filter(c => isCssColor(c.valor));
  if (validCores.length !== cores.length) {
    const removidas = cores.map(c => c.nome).filter(n => !validCores.find(vc => vc.nome === n));
    console.warn("Cores inválidas removidas:", removidas);
  }
}

/* usa validCores quando possível */
function pickRandomColor() {
  const pool = validCores.length ? validCores : cores;
  return pool[Math.floor(Math.random() * pool.length)];
}

const attemptsSpan = document.getElementById("attempts-remaining");
const colorInput = document.getElementById("color-input");
const guessButton = document.getElementById("guess-button");
const restartButton = document.getElementById("restart-button");
const feedback = document.getElementById("feedback");
const historyList = document.getElementById("history");
const colorSample = document.getElementById("color-sample");

let secretColor = "";
let attempts = 3;

function setFeedback(msg) { 
  feedback.textContent = msg; 
}

function initGame() {
  validateColors();
  secretColor = pickRandomColor(); // agora é objeto {nome, valor}
  attempts = 3;
  attemptsSpan.textContent = attempts;
  colorInput.value = "";
  document.body.style.backgroundColor = "#121212";
  setFeedback("O jogo começou! Tente adivinhar a cor.");
  guessButton.disabled = false;
  guessButton.classList.remove("hidden"); // garantir que o botão Adivinhar apareça no novo jogo
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

  const match = (validCores.length ? validCores : cores).find(c => c.nome === raw);
  if (!match) { setFeedback("Cor inválida! Use um nome de cor válido em português."); colorInput.classList.add("input-shake"); setTimeout(()=>colorInput.classList.remove("input-shake"),420); return; }

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
    setFeedback("🎉 Parabéns! Você acertou!");
    feedback.classList.add("win");
    document.body.classList.add("win");
    guessButton.disabled = true;
    guessButton.classList.add("hidden"); // remover botão Adivinhar após vitória
    restartButton.classList.remove("hidden");
    colorSample.classList.add("hidden");
    return;
  }

  // erro
  attempts--;
  attemptsSpan.textContent = attempts;

  // limpar input e preview para o próximo palpite
  colorInput.value = "";
  colorSample.classList.add("hidden");
  colorInput.focus();

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
    guessButton.classList.add("hidden"); // remover botão Adivinhar ao terminar o jogo
    restartButton.classList.remove("hidden");
    colorSample.classList.add("hidden");
  }
}

/* pré-visualização com mapeamento */
colorInput.addEventListener("input", () => {
  const val = colorInput.value.trim().toLowerCase();
  const match = (validCores.length ? validCores : cores).find(c => c.nome === val);
  if (match) {
    colorSample.style.background = match.valor;
    colorSample.classList.remove("hidden");
  } else {
    colorSample.classList.add("hidden");
  }
});

/* adicionar Enter para submeter como "Adivinhar" (ignora Enter quando jogo finalizado) */
colorInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    // se o botão Adivinhar estiver oculto ou desabilitado, não faz nada
    if (guessButton.disabled || guessButton.classList.contains("hidden")) return;
    e.preventDefault();
    handleGuess();
  }
});

guessButton.addEventListener("click", handleGuess);
restartButton.addEventListener("click", initGame);

window.addEventListener("DOMContentLoaded", initGame);
