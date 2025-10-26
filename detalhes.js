document.addEventListener('DOMContentLoaded', () => {

    // 1. Pega o container onde vamos "desenhar"
    const container = document.getElementById('detalhe-container');
    // 2. Pega o ID da URL
    // Ex: se a URL for "detalhes.html?id=4", isso pega o "4"
    const urlParams = new URLSearchParams(window.location.search);
    const pokemonId = urlParams.get('id');
    // 3. Encontra o Pokémon no nosso "banco de dados"
    // Usamos '==' porque o ID da URL é uma string e o 'p.id' é um número
    const pokemonEncontrado = pokemons.find(p => p.id == pokemonId);

    // 4. Se o Pokémon for encontrado, cria o HTML
    if (pokemonEncontrado) {
        
        // Mapeia os tipos para HTML (igual ao 'pokedex.js')
        const tiposHtml = pokemonEncontrado.tipo
            .map(tipoNome => `<span class="tipo ${tipoNome.toLowerCase()}">${tipoNome}</span>`)
            .join('');

        // Cria o HTML do card de detalhe
        const detalheHTML = `
            <div class="detalhe-card">
                <h1>${pokemonEncontrado.nome} (ID: #${pokemonEncontrado.id})</h1>
                
                <img src="${pokemonEncontrado.imagemUrl}" alt="${pokemonEncontrado.nome}">
                
                <div class="tipos-container">
                    ${tiposHtml}
                </div>
                
                <div class="descricao">
                    <h2>Descrição</h2>
                    <p>${pokemonEncontrado.descricao}</p>
                </div>

                <a href="pokedex.html" class="botao-voltar-detalhes">Voltar para Pokedex</a>
            </div>
        `;
        
        // 5. Insere o HTML na página
        container.innerHTML = detalheHTML;

    } else {
        // 6. Se não encontrar o Pokémon (ex: ID inválido)
        container.innerHTML = `
            <div class="detalhe-card erro">
                <h1>Pokémon não encontrado!</h1>
                <p>O Pokémon com ID ${pokemonId} não existe no nosso banco de dados.</p>
                <a href="pokedex.html" class="botao-voltar-detalhes">Voltar para Pokedex</a>
            </div>
        `;
    }
});