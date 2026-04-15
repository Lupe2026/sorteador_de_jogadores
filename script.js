let players = [];
let teams = [];

// Splash
setTimeout(() => {
    document.getElementById('splash').classList.remove('active');
    document.getElementById('setup-screen').classList.add('active');
}, 3000);

function addPlayer() {
    const nameInput = document.getElementById('player-name');
    if (!nameInput.value.trim()) return;
    players.push({
        name: nameInput.value.trim(),
     //   z: document.getElementById('pos-z').checked,
     //   m: document.getElementById('pos-m').checked,
     //   a: document.getElementById('pos-a').checked,
        c: document.getElementById('pos-c').checked
    });
    resetInputs();
    updateUI();
}

function importPlayers() {
    const raw = document.getElementById('bulk-names').value;
    const names = raw.split(/[\n,]+/).filter(n => n.trim() !== "");
    names.forEach(n => {
        players.push({ name: n.trim(), z: false, m: false, a: false, c: false });
    });
    document.getElementById('bulk-names').value = "";
    updateUI();
}

function toggleC(index) {
    players[index].c = !players[index].c;
    updateUI();
}

function move(index, direction) {
    const target = index + direction;
    if (target >= 0 && target < players.length) {
        [players[index], players[target]] = [players[target], players[index]];
        updateUI();
    }
}

function updateUI() {
    document.getElementById('count').innerText = players.length;
    const list = document.getElementById('player-list');
    list.innerHTML = players.map((p, i) => `
        <li>
            <span><strong>${i+1}.</strong> ${p.name}</span>
            <div>
                <button class="btn-c-toggle ${p.c ? 'btn-c-active' : ''}" onclick="toggleC(${i})">⭐ C</button>
                <button class="btn-move" onclick="move(${i}, -1)">▲</button>
                <button class="btn-move" onclick="move(${i}, 1)">▼</button>
                <button class="btn-del" onclick="players.splice(${i},1); updateUI();">X</button>
            </div>
        </li>
    `).join('');
}

function drawTeams() {
    if (players.length < 2) return;
    const teamSize = parseInt(document.getElementById('team-size').value);
    
    // Separação por prioridade (Top 3 times)
    const topLimit = teamSize * 3;
    let poolTop = [...players].slice(0, topLimit);
    let poolRest = [...players].slice(topLimit);

    // Lógica de Equilíbrio: Cabeças de Chave
    let heads = poolTop.filter(p => p.c).sort(() => Math.random() - 0.5);
    let others = poolTop.filter(p => !p.c).sort(() => Math.random() - 0.5);
    poolRest.sort(() => Math.random() - 0.5);

    let allOthers = [...others, ...poolRest];
    let numTeams = Math.ceil(players.length / teamSize);
    teams = Array.from({ length: numTeams }, () => []);

    // Distribui 1 cabeça de chave por time (enquanto houver)
    heads.forEach((h, i) => {
        if (i < numTeams) teams[i].push(h);
        else allOthers.push(h); // Se sobrar cabeça de chave, vira jogador comum
    });

    // Preenche o resto
    teams.forEach(team => {
        while (team.length < teamSize && allOthers.length > 0) {
            team.push(allOthers.shift());
        }
    });

    renderTeams();
    document.getElementById('setup-screen').classList.remove('active');
    document.getElementById('teams-screen').classList.add('active');
}

function renderTeams() {
    const container = document.getElementById('teams-container');
    container.innerHTML = teams.map((team, tIdx) => `
        <div class="team-card" ondrop="drop(event, ${tIdx})" ondragover="event.preventDefault()">
            <h3>Time ${tIdx + 1}</h3>
            <div class="player-list-in-team">
                ${team.map((p, pIdx) => `
                    <div class="player-item" draggable="true" ondragstart="drag(event,${tIdx},${pIdx})">
                        <span>${p.c ? '⭐ ' : ''}${p.name}</span>
                        <button class="btn-remove-in-game" onclick="removePlayerFromTeam(${tIdx}, ${pIdx})">×</button>
                    </div>
                `).join('')}
            </div>
            <button class="btn-lose" onclick="loseGame(${tIdx})">Perdeu (Fim da Fila)</button>
        </div>
    `).join('');
}

let dragged = null;
function drag(ev, tIdx, pIdx) { dragged = { tIdx, pIdx }; }
function drop(ev, targetTIdx) {
    const p = teams[dragged.tIdx].splice(dragged.pIdx, 1)[0];
    teams[targetTIdx].push(p);
    renderTeams();
}
function loseGame(idx) {
    const lost = teams.splice(idx, 1)[0];
    teams.push(lost);
    renderTeams();
}
function resetInputs() {
    // Limpa o campo de texto do nome
    document.getElementById('player-name').value = '';

    // Limpa as checkboxes de posição e cabeça de chave
 //   document.getElementById('pos-z').checked = false;
 //   document.getElementById('pos-m').checked = false;
 //   document.getElementById('pos-a').checked = false;
    document.getElementById('pos-c').checked = false;

    // Coloca o cursor de volta no campo de nome para o próximo cadastro
    document.getElementById('player-name').focus();
}

function addLatePlayer() {
    const n = prompt("Nome do Jogador:");
    if (!n) return;
    const teamSize = parseInt(document.getElementById('team-size').value);
    let p = { name: n, z:false, m:false, a:false, c:false };
    let placed = false;
    for (let t of teams) { if (t.length < teamSize) { t.push(p); placed = true; break; } }
    if (!placed) teams.push([p]);
    renderTeams();
}

// Nova função para remover jogador de um time já sorteado
function removePlayerFromTeam(teamIdx, playerIdx) {
    if (confirm("Deseja remover este jogador do time?")) {
        teams[teamIdx].splice(playerIdx, 1);
        
        // Se o time ficar vazio, você pode optar por remover o time ou deixá-lo lá
        if (teams[teamIdx].length === 0 && teams.length > 3) {
            teams.splice(teamIdx, 1);
        }
        
        renderTeams();
    }
}