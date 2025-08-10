let listaAmigos = [];

// Função para adicionar novo amigo
function adicionarAmigo() {
    const nomeInput = document.getElementById('amigo');
    const generoSelect = document.getElementById('generoAmigo');
    const nome = nomeInput.value.trim();
    const genero = generoSelect.value;

    if (nome === '') {
        alert('Por favor, insira um nome válido.');
        return;
    }

    listaAmigos.push({
        nome: nome,
        genero: genero
    });

    atualizarLista();
    nomeInput.value = '';
    nomeInput.focus();
}

// Função para remover um amigo específico
function removerAmigo(index) {
    const amigoRemovido = listaAmigos[index].nome;
    if (confirm(`Remover "${amigoRemovido}" da lista?`)) {
        listaAmigos.splice(index, 1);
        atualizarLista();
        
        // Limpa o resultado se estiver mostrando o amigo removido
        document.getElementById('resultado').innerHTML = '';
    }
}

// Função para limpar toda a lista
function limparLista() {
    if (listaAmigos.length === 0) {
        alert('A lista já está vazia.');
        return;
    }

    if (confirm('Tem certeza que deseja limpar TODOS os itens da lista?')) {
        listaAmigos = [];
        atualizarLista();
        document.getElementById('resultado').innerHTML = '';
    }
}

// Função para atualizar a exibição da lista
function atualizarLista() {
    const listaElement = document.getElementById('listaAmigos');
    listaElement.innerHTML = '';

    if (listaAmigos.length === 0) {
        listaElement.innerHTML = '<li class="empty-message">Nenhum amigo adicionado ainda</li>';
        return;
    }

    listaAmigos.forEach((pessoa, index) => {
        const li = document.createElement('li');
        li.className = 'list-item';
        
        const span = document.createElement('span');
        span.textContent = `${pessoa.nome} (${pessoa.genero === 'feminino' ? 'Amiga' : 'Amigo'})`;
        
        const removeBtn = document.createElement('button');
        removeBtn.innerHTML = '&times;';
        removeBtn.className = 'remove-btn';
        removeBtn.onclick = () => removerAmigo(index);
        removeBtn.title = 'Remover este amigo';
        
        li.appendChild(span);
        li.appendChild(removeBtn);
        listaElement.appendChild(li);
    });
}

// Função para sortear
function sortearAmigo() {
    if (listaAmigos.length === 0) {
        alert('Adicione pelo menos um participante antes de sortear.');
        return;
    }

    const indiceAleatorio = Math.floor(Math.random() * listaAmigos.length);
    const sorteado = listaAmigos[indiceAleatorio];
    const termo = sorteado.genero === 'feminino' ? 'Amiga secreta' : 'Amigo secreto';

    document.getElementById('resultado').innerHTML = `
        <p>O(a) ${termo} é:</p>
        <p class="result-name">${sorteado.nome}</p>
    `;
}

// Evento para adicionar com Enter
document.getElementById('amigo').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        adicionarAmigo();
    }
});

// Inicializa a lista vazia
atualizarLista();

// Adicione esta nova função
function removerAmigo(index) {
    if (confirm(`Tem certeza que deseja remover ${listaAmigos[index].nome} da lista?`)) {
        listaAmigos.splice(index, 1);
        atualizarLista();
        
        // Limpa o resultado se estiver mostrando o amigo que foi removido
        document.getElementById('resultado').innerHTML = '';
    }
}

// Modifique a função atualizarLista para incluir o botão de remover
function atualizarLista() {
    const listaElement = document.getElementById('listaAmigos');
    listaElement.innerHTML = '';

    listaAmigos.forEach((pessoa, index) => {
        const li = document.createElement('li');
        li.className = 'list-item';
        
        const span = document.createElement('span');
        span.textContent = `${pessoa.nome} (${pessoa.genero === 'feminino' ? 'Amiga' : 'Amigo'})`;
        
        const removeBtn = document.createElement('button');
        removeBtn.textContent = '×';
        removeBtn.className = 'remove-btn';
        removeBtn.onclick = () => removerAmigo(index);
        removeBtn.setAttribute('aria-label', `Remover ${pessoa.nome}`);
        
        li.appendChild(span);
        li.appendChild(removeBtn);
        listaElement.appendChild(li);
    });
}
