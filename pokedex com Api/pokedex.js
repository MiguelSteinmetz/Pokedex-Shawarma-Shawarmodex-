document.addEventListener('DOMContentLoaded', () => {

    // --- SELETORES DO DOM ---
    const pokemonContainer = document.querySelector('.box-2');
    const searchInput = document.getElementById('search-input');
    const botaoOpçao = document.querySelector('.botaoOpcao');
    const dropdownContent = document.querySelector('.opcoes');
    const btnSair = document.getElementById('botao-sair');
    
    // Seleciona a tela de carregamento (que agora está dentro da box-2 no HTML)
    const loadingOverlay = document.getElementById('loading-overlay'); 

    // Variáveis do Modal de Filtros
    const modalTipos = document.getElementById('tela-tipos');
    const btnFecharModal = document.querySelector('.fechar-modal');
    const tipoContainer = document.getElementById('tipo-container');
    const FiltroTipo = document.getElementById('filtroTipo');
    const themeToggle = document.getElementById('theme-toggle');

    // Array global para armazenar os dados
    let pokemons = [];
    let usuarioLogado = JSON.parse(localStorage.getItem('usuarioLogado'));

    // --- FUNÇÃO DE TRADUÇÃO -
    function traduzirTipo(tipoIngles) {
        const traducoes = {
            'grass': 'Planta', 'poison': 'Veneno', 'fire': 'Fogo', 'water': 'Água',
            'bug': 'Inseto', 'flying': 'Voador', 'normal': 'Normal', 'electric': 'Elétrico',
            'ground': 'Terra', 'fairy': 'Fada', 'fighting': 'Lutador', 'psychic': 'Psíquico',
            'rock': 'Pedra', 'steel': 'Aço', 'ice': 'Gelo', 'ghost': 'Fantasma', 'dragon': 'Dragão'
        };
        return traducoes[tipoIngles] || tipoIngles;
    }

    // --- LOGICA DA API  ---
    const fetchPokemons = async () => {
        try {
            if(loadingOverlay) {
                loadingOverlay.style.display = 'flex';
                loadingOverlay.style.opacity = '1';
            }
            const resposta = await fetch('https://pokeapi.co/api/v2/pokemon?limit=151');
            const dados = await resposta.json();
            
            const promises = dados.results.map(async (pokemon) => {
                const res = await fetch(pokemon.url);
                return res.json();
            });

            const results = await Promise.all(promises);

            // 4. Mapeia para o formato que usamos no site
            pokemons = results.map((dados) => ({
                id: dados.id,
                nome: dados.name.charAt(0).toUpperCase() + dados.name.slice(1),
                tipo: dados.types.map(typeInfo => traduzirTipo(typeInfo.type.name)),
                imagemUrl: dados.sprites.other['official-artwork'].front_default,
                favorito: false 
            }));

            // 5. Aplica favoritos e desenha na tela
            carregarFavoritos();
            displayPokemons(pokemons);

             

        } catch (error) {
            console.error("Erro ao buscar Pokémons:", error);
            pokemonContainer.innerHTML = '<p style="color:white; text-align:center; padding: 20px;">Erro ao carregar os dados da API.</p>'

        } finally {
            // Apaga a parte de carregamento
             if(loadingOverlay) {
                loadingOverlay.style.opacity = '0'; // Efeito visual de sumir
                setTimeout(() => {
                    loadingOverlay.style.display = 'none'; // Remove da tela após o efeito
                }, 500);
            }
          
        }
    };

    // --- VERIFICAÇÃO DE LOGIN ---
    if (!usuarioLogado) {
        window.location.href = 'login.html';
        return;
    }

    // --- SISTEMA DE FAVORITOS ---
    function carregarFavoritos() {
        const favoritosDoUsuario = usuarioLogado.favoritos || [];
        pokemons.forEach(pokemon => {
            if (favoritosDoUsuario.includes(pokemon.id.toString())) {
                pokemon.favorito = true;
            } else {
                pokemon.favorito = false;
            }
        });
    }

    function salvarFavoritos() {
        localStorage.setItem('usuarioLogado', JSON.stringify(usuarioLogado));
        let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
        const indexUsuario = usuarios.findIndex(u => u.login === usuarioLogado.login);

        if (indexUsuario !== -1) {
            usuarios[indexUsuario] = usuarioLogado; 
            localStorage.setItem('usuarios', JSON.stringify(usuarios)); 
        }
    }

    // Botão Sair
    btnSair.addEventListener('click', () => {
        localStorage.removeItem('usuarioLogado'); 
        window.location.href = 'login.html';
    });


    // --- MENU DE OPÇÕES ---
    if (botaoOpçao) {
        botaoOpçao.addEventListener('click', (event) => {
            event.stopPropagation();
            dropdownContent.classList.toggle('mostrar');
        });
    }

    window.addEventListener('click', (event) => {
        if (dropdownContent.classList.contains('mostrar')) {
            if (!event.target.closest('.menu')) {
                dropdownContent.classList.remove('mostrar');
            }
        }
    });

    // Filtros do Menu
    document.getElementById('mostrarTodos').addEventListener('click', (e) => {
        e.preventDefault();
        displayPokemons(pokemons);
        dropdownContent.classList.remove('mostrar');
    });

    document.getElementById('mostrarFavoritos').addEventListener('click', (e) => {
        e.preventDefault();
        const pokemonsFavoritos = pokemons.filter(pokemon => pokemon.favorito === true);
        displayPokemons(pokemonsFavoritos);
        dropdownContent.classList.remove('mostrar');
    });


    // --- BARRA DE PESQUISA ---
    searchInput.addEventListener('input', (evento) => {
        const termoBusca = evento.target.value.toLowerCase();
        const pokemonsFiltrados = pokemons.filter(pokemon => {
            const nome = pokemon.nome.toLowerCase();
            const id = pokemon.id.toString();            
            return nome.includes(termoBusca) || id.includes(termoBusca);
        });
        displayPokemons(pokemonsFiltrados);
    });


    // --- MODAL DE TIPOS ---
    function popularModalTipos() {
        tipoContainer.innerHTML = ''; 
        const todosOsTipos = new Set();
        
        pokemons.forEach(pokemon => {
            pokemon.tipo.forEach(tipo => todosOsTipos.add(tipo));
        });
        
        todosOsTipos.forEach(tipo => {
            const botao = document.createElement('button');
            botao.className = `botao-tipo ${tipo.toLowerCase()}`;
            botao.textContent = tipo;
            botao.dataset.tipo = tipo; 

            botao.addEventListener('click', () => {
                const tipoSelecionado = botao.dataset.tipo;
                const pokemonsFiltrados = pokemons.filter(pokemon => {
                    return pokemon.tipo.includes(tipoSelecionado);
                });
                displayPokemons(pokemonsFiltrados);
                modalTipos.style.display = 'none';
            });
            tipoContainer.appendChild(botao);
        });
    }

    FiltroTipo.addEventListener('click', (e) => {
        e.preventDefault();
        // Só abre se tiver pokémons carregados
        if(pokemons.length > 0) {
            popularModalTipos(); 
            modalTipos.style.display = 'flex';
            dropdownContent.classList.remove('mostrar');
        }
    });

    btnFecharModal.addEventListener('click', () => {
        modalTipos.style.display = 'none';
    });

    window.addEventListener('click', (event) => {
        if (event.target == modalTipos) {
            modalTipos.style.display = 'none';
        }
    });


    // --- CRIAÇÃO DOS CARDS NA TELA ---
    const CriarPokemonCard = (pokemon) => {
        const cardLink = document.createElement('a');
        cardLink.href = `detalhes.html?id=${pokemon.id}`;
        
        const card = document.createElement('div');
        card.classList.add('pokemon-card');
        
        const tiposHtml = pokemon.tipo.map(tipoNome => 
            `<span class="tipo ${tipoNome.toLowerCase()}">${tipoNome}</span>`
        ).join('');

        const isChecked = pokemon.favorito ? 'checked' : '';

        card.innerHTML = `
            <input type="checkbox" class="favorite-checkbox" data-id="${pokemon.id}" ${isChecked}>
            <p class="nomes">${pokemon.nome}</p>
            <img src="${pokemon.imagemUrl}" alt="${pokemon.nome}">
            <div class="tipos">
                ${tiposHtml}
            </div>
        `;

        // Lógica do Checkbox (Favoritar)
       const checkbox = card.querySelector('.favorite-checkbox');
        checkbox.addEventListener('click', (event) => {
            event.stopPropagation(); 
            
            const idAlvo = parseInt(event.target.dataset.id);
            const pokemonClicado = pokemons.find(p => p.id === idAlvo);
            
            if (pokemonClicado) {
                // Atualiza o objeto com o estado REAL do checkbox (marcado ou não)
                pokemonClicado.favorito = event.target.checked;

                const idString = idAlvo.toString();
                
                if (pokemonClicado.favorito) {
                    // Se marcou, adiciona aos favoritos
                    if (!usuarioLogado.favoritos.includes(idString)) {
                        usuarioLogado.favoritos.push(idString);
                    }
                } else {
                    // Se desmarcou, remove dos favoritos
                    usuarioLogado.favoritos = usuarioLogado.favoritos.filter(id => id !== idString);
                }
                salvarFavoritos();
            }
        });
        cardLink.appendChild(card);
        pokemonContainer.appendChild(cardLink);
    };

    const displayPokemons = (arrayDePokemons) => {
        pokemonContainer.innerHTML = '';
        arrayDePokemons.forEach(pokemon => {
            CriarPokemonCard(pokemon);
        });
    };


    // --- MODO ESCURO ---
    const body = document.body;
    function applyTheme(isDarkMode) {
        if (isDarkMode) {
            body.classList.add('dark-mode');
            themeToggle.textContent = 'Modo Claro';
            localStorage.setItem('theme', 'dark');
        } else {
            body.classList.remove('dark-mode');
            themeToggle.textContent = 'Modo Escuro';
            localStorage.setItem('theme', 'light');
        }
    }
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (savedTheme === 'dark') applyTheme(true);
    else if (savedTheme === 'light') applyTheme(false);
    else if (prefersDark) applyTheme(true);
    else applyTheme(false);
    
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const isDarkMode = body.classList.contains('dark-mode');
            applyTheme(!isDarkMode);
        });
    }

    // --- INICIALIZAÇÃO ---
    fetchPokemons(); // Chama a API ao carregar a página
});