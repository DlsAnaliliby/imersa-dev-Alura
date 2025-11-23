let cardContainer = document.querySelector('.card-container');
let dados = [];

// Função para carregar os dados do JSON e renderizar todos os cards inicialmente
async function carregarDados() {
    let resposta = await fetch('data.json');
    dados = await resposta.json();
    renderizarCards(dados);
}

// Função principal de busca, chamada pelo botão
function iniciarBusca() {
    const termoBusca = document.getElementById('campo-busca').value.toLowerCase();

    if (termoBusca === "") {
        // Se a busca estiver vazia, mostra todos os cards
        renderizarCards(dados);
        return;
    }

    const resultados = dados.filter(dado => 
        dado.nome.toLowerCase().includes(termoBusca) || 
        dado.descricao.toLowerCase().includes(termoBusca)
    );

    renderizarCards(resultados);
}

// Função que renderiza os cards na tela
function renderizarCards(dados) {
    // Limpa o container antes de adicionar novos cards
    cardContainer.innerHTML = '';

    for (let dado of dados) {
        let article = document.createElement('article');
        article.classList.add('card');
        article.innerHTML = `
        <h2>${dado.nome}</h2>
        <p><strong>Ano de criação:</strong> ${dado.ano}</p>
        <p>${dado.descricao}</p>
        <a href="${dado.link}" target="_blank">Saiba mais...</a>
        `
        cardContainer.appendChild(article);
        
    }
}

// Adiciona os "ouvintes de evento" depois que a página carregar
document.addEventListener('DOMContentLoaded', () => {
    const campoBusca = document.getElementById('campo-busca');
    const botaoBusca = document.getElementById('botao-busca');

    // Carrega os dados iniciais
    carregarDados();

    // Aciona a busca ao clicar no botão
    botaoBusca.addEventListener('click', iniciarBusca);

    // Aciona a busca ao pressionar "Enter" no campo de busca
    campoBusca.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            iniciarBusca();
        }
    });
});
