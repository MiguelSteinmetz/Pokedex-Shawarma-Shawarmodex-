document.addEventListener('DOMContentLoaded', () => {

    const pokemonContainer = document.querySelector('.box-2');
    const searchInput = document.getElementById('search-input');
    const botaoOpçao = document.querySelector('.botaoOpcao');
    const dropdownContent = document.querySelector('.opcoes');
    const btnSair = document.getElementById('botao-sair');

    const modalTipos = document.getElementById('tela-tipos');
    const btnFecharModal = document.querySelector('.fechar-modal');
    const tipoContainer = document.getElementById('tipo-container');
    const FiltroTipo = document.getElementById('filtroTipo');


    const todosOsTipos = new Set();
    pokemons.forEach(pokemon => {
        pokemon.tipo.forEach(tipo => {
            todosOsTipos.add(tipo);
        });
    });

    // 2. Função para criar os botões de tipo dentro do modal
    function popularModalTipos() {
        tipoContainer.innerHTML = ''; 
        
        todosOsTipos.forEach(tipo => {
            const botao = document.createElement('button');

            botao.className = `botao-tipo ${tipo.toLowerCase()}`;
            botao.textContent = tipo;
            botao.dataset.tipo = tipo; 

            // 3. Adiciona o evento de clique para FILTRAR
            botao.addEventListener('click', () => {
                const tipoSelecionado = botao.dataset.tipo;
                
                // Filtra o array principal de pokemons
                const pokemonsFiltrados = pokemons.filter(pokemon => {
                    return pokemon.tipo.includes(tipoSelecionado);
                });

                // Mostra os pokémons filtrados
                displayPokemons(pokemonsFiltrados);
                
                // Fecha o modal
                modalTipos.style.display = 'none';
            });

            tipoContainer.appendChild(botao);
        });
    }

    // 4. Funções para ABRIR e FECHAR o modal
    
    // Altere seu listener antigo do 'filtroTipo' para este:
    FiltroTipo.addEventListener('click', (e) => {
        e.preventDefault();
        popularModalTipos(); // Cria os botões de tipo
        modalTipos.style.display = 'flex'; // Abre o modal
        dropdownContent.classList.remove('mostrar'); // Fecha o menu de opções
    });

    // Fecha o modal ao clicar no 'X'
    btnFecharModal.addEventListener('click', () => {
        modalTipos.style.display = 'none';
    });

    // Fecha o modal ao clicar FORA da caixa de conteúdo 
    window.addEventListener('click', (event) => {
        if (event.target == modalTipos) {
            modalTipos.style.display = 'none';
        }
    });

    let usuarioLogado = JSON.parse(localStorage.getItem('usuarioLogado'));

    
    if (!usuarioLogado) {
        window.location.href = 'login.html';
        return;
    }

    const favoritosDoUsuario = usuarioLogado.favoritos || [];
    pokemons.forEach(pokemon => {
        if (favoritosDoUsuario.includes(pokemon.id.toString())) {
            pokemon.favorito = true;
        } else {
            pokemon.favorito = false;
        }
    });

    btnSair.addEventListener('click', () => {
        localStorage.removeItem('usuarioLogado'); 
        window.location.href = 'login.html';
    });


    /*-----------------------------------------------------------------------------
     Funçao para salvar os pokemons favoritos De acordo com cada usuario
     -----------------------------------------------------------------------------*/
    function salvarFavoritos() {

        localStorage.setItem('usuarioLogado', JSON.stringify(usuarioLogado));
        let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
        const indexUsuario = usuarios.findIndex(u => u.login === usuarioLogado.login);

        if (indexUsuario !== -1) {
            usuarios[indexUsuario] = usuarioLogado; 
            localStorage.setItem('usuarios', JSON.stringify(usuarios)); 
        }
    }


    /* ---------------------
      Funçoes do 'Menu'
    -----------------------*/
    if (botaoOpçao) {
        botaoOpçao.addEventListener('click', (event) => {
            event.stopPropagation();
            dropdownContent.classList.toggle('mostrar');
        });
    }

    // Fecha o 'Menu' Caso clique fora da parte do menu
    window.addEventListener('click', (event) => {
        if (dropdownContent.classList.contains('mostrar')) {
            if (!event.target.closest('.menu')) {
                dropdownContent.classList.remove('mostrar');
            }
        }
    });


  // Logicas de Cada opçao do menu
    document.getElementById('mostrarTodos').addEventListener('click', (e) => {
    e.preventDefault();
    console.log("O usuário clicou em 'Mostrar Todos'");
    displayPokemons(pokemons);
    dropdownContent.classList.remove('mostrar');
});

  document.getElementById('mostrarFavoritos').addEventListener('click', (e) => {
    e.preventDefault();
    const pokemonsFavoritos = pokemons.filter(pokemon => pokemon.favorito === true);
    displayPokemons(pokemonsFavoritos);
    dropdownContent.classList.remove('mostrar');
});



    /*---------------------------------
       Funçoes da barra de pesquisa
    ----------------------------------*/
    searchInput.addEventListener('input', (evento) => {
        const termoBusca = evento.target.value.toLowerCase();
        const pokemonsFiltrados = pokemons.filter(pokemon => {
            const nome = pokemon.nome.toLowerCase();
            const id = pokemon.id.toString(); 
            
            return nome.includes(termoBusca) || id.includes(termoBusca);
        });
        displayPokemons(pokemonsFiltrados);
    });



    /*--------------------------------------------------
        Funçao Para criar o card dos pokemons
    --------------------------------------------------*/
    const CriarPokemonCard = (pokemon) => {

        //Criaçao do card com o link da pagina onde ira ter as informaçoes mais detalhadas
        const cardLink = document.createElement('a');
        cardLink.href = `detalhes.html?id=${pokemon.id}`;
        cardLink.dataset.name = pokemon.nome.toLowerCase();
        cardLink.dataset.id = pokemon.id;

        // Criaçao do card de cada pokemon
        const card = document.createElement('div');
        card.classList.add('pokemon-card');
        const nome = pokemon.nome;
        const imagemUrl = pokemon.imagemUrl;
        const tiposHtml = pokemon.tipo.map(tipoNome => `<span class="tipo ${tipoNome.toLowerCase()}">${tipoNome}</span>`).join('');

        const isChecked = pokemon.favorito ? 'checked' : '';

    const pokemonInnerHTML = `

        <input  type="checkbox" class="favorite-checkbox" data-id="${pokemon.id}" ${isChecked}>
        <p class="nomes">${nome}</p>
        <img src="${imagemUrl}" alt="${nome}">
        <div class="tipos">
            ${tiposHtml}
        </div>
    `;



      // Junta o card com o conteúdo
       card.innerHTML = pokemonInnerHTML;


      //Funçao do  Checkbox, Dos favoritos
       const checkbox = card.querySelector('.favorite-checkbox');
        checkbox.addEventListener('click', (event) => {
        event.stopPropagation(); 
        const pokemonId = event.target.dataset.id;
        const pokemonClicado = pokemons.find(p => p.id == pokemonId);
        if (pokemonClicado) {
            pokemonClicado.favorito = !pokemonClicado.favorito;
            if (pokemonClicado.favorito) {
               
                if (!usuarioLogado.favoritos.includes(pokemonId)) {
                    usuarioLogado.favoritos.push(pokemonId);
                }
            } else {
                usuarioLogado.favoritos = usuarioLogado.favoritos.filter(id => id !== pokemonId);
            }
            salvarFavoritos();
        }
    });


        // Embrulha no link e o adiciona na tela.
        cardLink.appendChild(card);
        pokemonContainer.appendChild(cardLink);
    };

  // Funçao Limpa o container caso já tenha algo e passa por cada pokemon no array para criar um card
  const displayPokemons = (arrayDePokemons) => {
        pokemonContainer.innerHTML = '';

        arrayDePokemons.forEach(pokemon => {
            CriarPokemonCard(pokemon);
        });
    };
    displayPokemons(pokemons);

});


    // modo escuro

    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;

    // Função para aplicar o tema e atualizar o botão
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
    
    // Verifica a preferência do sistema
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (savedTheme === 'dark') {
        applyTheme(true);
    } else if (savedTheme === 'light') {
        applyTheme(false);
    } else if (prefersDark) {
        applyTheme(true);
    } else {
        applyTheme(false);
    }
    
    //Adicionar o listener para o botão de toggle
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const isDarkMode = body.classList.contains('dark-mode');
            applyTheme(!isDarkMode);
        });
    }

