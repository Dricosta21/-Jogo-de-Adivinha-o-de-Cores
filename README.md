# 🎨 Jogo de Adivinhação de Cores

Projeto prático C3 – Jogo de adivinhação de cores em **HTML, CSS e JavaScript**, para praticar manipulação do DOM, eventos e lógica de programação.

O objetivo do jogo é adivinhar uma cor sorteada pelo sistema, usando nomes de cores em **português** (ex.: `vermelho`, `azul`, `verde`), que são mapeados para cores CSS.

---

## 🧩 Como o jogo funciona

- Ao carregar a página, o sistema sorteia uma cor aleatória de uma lista de cores nomeadas:
  - vermelho, azul, verde, amarelo, roxo, laranja, rosa, marrom, cinza, ciano.
- Você tem **3 tentativas** para acertar a cor.
- Você digita o **nome da cor em português** no campo de texto e clica em **“Adivinhar”**.
- O jogo faz a validação:
  - Se o campo estiver vazio, uma mensagem pede para digitar uma cor.
  - Se a cor digitada não estiver na lista, aparece uma mensagem de “cor inválida”.

### Regras de vitória e derrota

- **Acertou a cor:** fundo muda, mensagem aparece, botão desabilita e surge o “Jogar Novamente”.
- **Errou:** tentativas diminuem, mensagem aparece, input limpa.
- **Acabaram as tentativas:** exibe fim de jogo e mostra a cor correta.
- **Jogar novamente:** restaura tudo.

---

## 🧠 Tecnologias utilizadas

- HTML5  
- CSS3  
- JavaScript ES6+  

---

## 📁 Estrutura

```
index.html
styles.css
script.js
README.md
```

---

## 🚀 Como executar

Basta abrir o arquivo `index.html` em qualquer navegador moderno.

---

## 🌐 GitHub Pages

Ao subir o projeto, vá em **Settings > Pages**, escolha a branch e ative.  
O link ficará assim:

```
https://SEU-USUARIO.github.io/jogo-cores-js/
```

---

## ✅ Requisitos Atendidos

- [x] Array de cores  
- [x] Sorteio aleatório  
- [x] 3 tentativas  
- [x] Validação e comparação  
- [x] Mudança de cor do fundo  
- [x] Feedback visual  
- [x] “Jogar Novamente” funcional  
- [x] Código organizado  
- [x] README completo  
