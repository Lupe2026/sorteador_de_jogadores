# ⚽ Sorteador de Jogadores Futebol Master da Vila (FMV)

Um Web App (PWA) prático e inteligente para organizar o rachão de fim de semana, sortear times equilibrados e gerenciar a fila de espera diretamente pelo celular.

---

## 🚀 Funcionalidades

* **Sorteio Inteligente:** Separa os "Cabeças de Chave" (C) para que não caiam no mesmo time.
* **Regra do Triplo:** Sorteia aleatoriamente os primeiros da lista (ex: 15 primeiros para times de 5) para garantir que quem chegou cedo jogue primeiro.
* **Gestão Dinâmica:**
    * Importação de lista de nomes (copiar e colar do WhatsApp).
    * Editar, excluir ou mudar a posição do jogador na fila (Subir/Descer).
    * Trocar jogadores entre times após o sorteio via Arraste (Drag & Drop).
    * Botão "Perdeu": Move o time automaticamente para o final da fila.
    * Incluir jogadores atrasados em vagas abertas ou novos times.
* **Modo PWA:** Funciona em tela cheia (sem barra de navegador) e possui suporte offline.

---

## 📱 Como Instalar no Celular (Sem Play Store)

Este app foi desenvolvido como um **Progressive Web App (PWA)**. Para instalá-lo:

### No Android (Chrome):
1. Acesse o link do GitHub Pages do projeto.
2. Toque nos **três pontinhos** (canto superior direito).
3. Selecione **"Instalar aplicativo"** ou **"Adicionar à tela de início"**.

### No iPhone (Safari):
1. Acesse o link do projeto no Safari.
2. Toque no ícone de **Compartilhar** (quadrado com seta para cima).
3. Role e toque em **"Adicionar à Tela de Início"**.

---

## 🛠️ Tecnologias Utilizadas

* **HTML5 / CSS3:** Estrutura e design responsivo.
* **JavaScript (Vanilla):** Lógica de sorteio, persistência em cache e manipulação de DOM.
* **Manifest JSON:** Identidade visual e configuração de tela cheia.
* **Service Workers:** Suporte para funcionamento offline e instalação.

---

## 📂 Estrutura do Projeto

* `index.html`: Interface principal e telas (Splash, Cadastro, Times).
* `style.css`: Estilização e animações.
* `script.js`: Toda a inteligência de sorteio e trocas.
* `manifest.json`: Configurações de PWA.
* `sw.js`: Service Worker para cache offline.
* `ic_fmv.png`: Logo oficial.
* `fundo_azul_amarelo.png`: Fundo da tela Splash.

---

## 📋 Como usar para o Sorteio

1.  **Cadastre os jogadores** ou cole a lista do WhatsApp na área de "Importar".
2.  Defina quem são os **Cabeças de Chave** clicando na estrela (⭐ C). Eles serão distribuídos um em cada time.
3.  Use as setas (▲ ▼) para garantir que os 15/18/21 primeiros da lista sejam os que estão presentes no campo.
4.  Clique em **SORTEAR**.
5.  Se alguém perder, clique em **"Perdeu"** para rotacionar os times.
6.  Se alguém sair, clique no **"X"** vermelho no card do time e arraste outro jogador para a vaga.

---

Desenvolvido para o **Futebol Master da Vila**. 🏃‍♂️💨