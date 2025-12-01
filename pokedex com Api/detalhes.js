document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('detalhe-container');
    const urlParams = new URLSearchParams(window.location.search);
    const pokemonId = urlParams.get('id');

    // Tradução de tipos 
    function traduzirTipo(tipoIngles) {
        const traducoes = {
            'grass': 'Planta', 'poison': 'Veneno', 'fire': 'Fogo', 'water': 'Água',
            'bug': 'Inseto', 'flying': 'Voador', 'normal': 'Normal', 'electric': 'Elétrico',
            'ground': 'Terra', 'fairy': 'Fada', 'fighting': 'Lutador', 'psychic': 'Psíquico',
            'rock': 'Pedra', 'steel': 'Aço', 'ice': 'Gelo', 'ghost': 'Fantasma', 'dragon': 'Dragão'
        };
        return traducoes[tipoIngles] || tipoIngles;
    }

    // Tradução dos Status 
    function traduzirStat(statIngles) {
        const statsMap = {
            'hp': 'HP',
            'attack': 'Ataque',
            'defense': 'Defesa',
            'special-attack': 'Atq. Esp.',
            'special-defense': 'Def. Esp.',
            'speed': 'Velocidade'
        };
        return statsMap[statIngles] || statIngles;
    }

    const fetchPokemonDetails = async () => {
        if (!pokemonId) return;

        try {
            container.innerHTML = '<p style="color: black; font-weight: bold; font-size: 1.2em;">Carregando detalhes...</p>';

            const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`);
            if (!response.ok) throw new Error('Pokemon não encontrado');
            const data = await response.json();

            const speciesResponse = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${pokemonId}`);
            const speciesData = await speciesResponse.json();

            const flavorTextEntry = speciesData.flavor_text_entries.find(entry => entry.language.name === 'en');
            const descricao = flavorTextEntry ? flavorTextEntry.flavor_text.replace(/[\n\f]/g, ' ') : "Sem descrição disponível.";

            const pokemon = {
                id: data.id,
                nome: data.name.charAt(0).toUpperCase() + data.name.slice(1),
                imagemUrl: data.sprites.other['official-artwork'].front_default,
                tipo: data.types.map(t => traduzirTipo(t.type.name)),
                descricao: descricao,
                altura: data.height / 10,
                peso: data.weight / 10,
                stats: data.stats.map(s => ({
                    nome: traduzirStat(s.stat.name),
                    valor: s.base_stat
                }))
            };

            renderizarDetalhes(pokemon);

        } catch (error) {
            console.error(error);
            container.innerHTML = `
                <div class="detalhe-card erro">
                    <h1>Erro!</h1>
                    <p>Não foi possível carregar os dados.</p>
                    <a href="pokedex.html" class="botao-voltar-detalhes">Voltar</a>
                </div>
            `;
        }
    };

    function renderizarDetalhes(pokemon) {
        const tiposHtml = pokemon.tipo
            .map(tipoNome => `<span class="tipo ${tipoNome.toLowerCase()}">${tipoNome}</span>`)
            .join('');

        const statsHtml = pokemon.stats.map(stat => {
            let classeCor = 'baixo';
            if (stat.valor >= 50) classeCor = 'medio';
            if (stat.valor >= 90) classeCor = 'alto';
            if (stat.valor >= 120) classeCor = 'muito-alto';

            
            let largura = stat.valor > 100 ? 100 : stat.valor; 
            
            return `
                <div class="stat-linha">
                    <span class="stat-nome">${stat.nome}</span>
                    <span class="stat-valor">${stat.valor}</span>
                    <div class="stat-barra-fundo">
                        <div class="stat-barra-preenchida ${classeCor}" style="width: ${stat.valor}px; max-width: 100%;"></div>
                    </div>
                </div>
            `;
        }).join('');

        const detalheHTML = `
            <div class="detalhe-card">
                <div class="coluna-esquerda">
                    <img src="${pokemon.imagemUrl}" alt="${pokemon.nome}">
                    <h1 class="titulo-pokemon">${pokemon.nome} (ID: #${pokemon.id})</h1>
                    <div class="tipos-container">
                        ${tiposHtml}
                    </div>
                     <div class="atributos-basicos" style="margin-top: 20px; text-align:center;">
                        <p><strong>Altura:</strong> ${pokemon.altura}m | <strong>Peso:</strong> ${pokemon.peso}kg</p>
                    </div>
                </div>

                <div class="coluna-direita">
                    
                    <div>
                        <h2 class="titulo-secao">Status Base</h2>
                        <div class="secao-status">
                            ${statsHtml}
                        </div>

                        <h2 class="titulo-secao">Descrição</h2>
                        <div class="descricao-container">
                            <p>${pokemon.descricao}</p>
                        </div>
                    </div>

                    <a href="pokedex.html" class="botao-voltar-detalhes">Voltar para Pokedex</a>
                </div>
            </div>
        `;
        
        container.innerHTML = detalheHTML;
    }

    fetchPokemonDetails();
});