 const pokemons = [
      {
        id: 1,
        nome: "Bulbasaur",
        tipo: ["Planta", "Veneno"],
        imagemUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png",
        descricao: "Um pequeno Pokémon que nasce com uma semente nas costas; ela cresce à medida que ele se desenvolve.",
        favorito: false
      },
      {
        id: 2,
        nome: "Ivysaur",
        tipo: ["Planta", "Veneno"],
        imagemUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/2.png",
        descricao: "Quando o bulbo em suas costas floresce, ele fica mais forte e se prepara para evoluir.",
        favorito: false
      },
      {
        id: 3,
        nome: "Venusaur",
        tipo: ["Planta", "Veneno"],
        imagemUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/3.png",
        descricao: "Possui uma flor enorme que floresce sob a luz solar, de onde absorve energia.",
        favorito: false
      },
      {
        id: 4,
        nome: "Charmander",
        tipo: ["Fogo"],
        imagemUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/4.png",
        descricao: "Sua cauda queima constantemente; se a chama se apagar, ele pode morrer.",
        favorito: false
      },
      {
        id: 5,
        nome: "Charmeleon",
        tipo: ["Fogo"],
        imagemUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/5.png",
        descricao: "Fica agitado facilmente e expele fogo mais intenso quando está irritado.",
        favorito: false
      },
      {
        id: 6,
        nome: "Charizard",
        tipo: ["Fogo", "Voador"],
        imagemUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/6.png",
        descricao: "Cospe chamas tão quentes que podem derreter pedras; é conhecido por seu temperamento feroz.",
        favorito: false
      },
      {
        id: 7,
        nome: "Squirtle",
        tipo: ["Água"],
        imagemUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/7.png",
        descricao: "Usa seu casco como proteção e dispara jatos d’água pelos orifícios traseiros.",
        favorito: false
      },
      {
        id: 8,
        nome: "Wartortle",
        tipo: ["Água"],
        imagemUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/8.png",
        descricao: "Possui uma cauda peluda e orelhas grandes; simboliza longevidade.",
        favorito: false
      },
      {
        id: 9,
        nome: "Blastoise",
        tipo: ["Água"],
        imagemUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/9.png",
        descricao: "Tem canhões em seu casco que disparam jatos de água de alta pressão.",
        favorito: false
      },
      {
        id: 10,
        nome: "Caterpie",
        tipo: ["Inseto"],
        imagemUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/10.png",
        descricao: "Um pequeno lagarta que come folhas; libera um cheiro forte para afastar inimigos.",
        favorito: false
      },
      {
        id: 11,
        nome: "Metapod",
        tipo: ["Inseto"],
        imagemUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/11.png",
        descricao: "Fica imóvel enquanto seu corpo interno se transforma; sua casca é extremamente dura.",
        favorito: false
      },
      {
        id: 12,
        nome: "Butterfree",
        tipo: ["Inseto", "Voador"],
        imagemUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/12.png",
        descricao: "Suas asas liberam um pó que paralisa os inimigos e o ajuda a coletar néctar.",
        favorito: false
      },
      {
        id: 13,
        nome: "Weedle",
        tipo: ["Inseto", "Veneno"],
        imagemUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/13.png",
        descricao: "Possui um ferrão venenoso na cabeça para se defender de predadores.",
        favorito: false
      },
      {
        id: 14,
        nome: "Kakuna",
        tipo: ["Inseto", "Veneno"],
        imagemUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/14.png",
        descricao: "Permanece imóvel em seu casulo enquanto prepara sua evolução.",
        favorito: false
      },
      {
        id: 15,
        nome: "Beedrill",
        tipo: ["Inseto", "Veneno"],
        imagemUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/15.png",
        descricao: "Voa em grupos e ataca ferozmente com seus ferrões duplos.",
        favorito: false
      },
      {
        id: 16,
        nome: "Pidgey",
        tipo: ["Normal", "Voador"],
        imagemUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/16.png",
        descricao: "Um pássaro pequeno e dócil que usa ataques de vento e areia para se proteger.",
        favorito: false
      },
      {
        id: 17,
        nome: "Pidgeotto",
        tipo: ["Normal", "Voador"],
        imagemUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/17.png",
        descricao: "Territorial e rápido, caça Pokémon menores e defende seu espaço com bravura.",
        favorito: false
      },
      {
        id: 18,
        nome: "Pidgeot",
        tipo: ["Normal", "Voador"],
        imagemUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/18.png",
        descricao: "Pode voar a velocidades incríveis, criando ventos fortes com suas asas.",
        favorito: false
      },
      {
        id: 19,
        nome: "Rattata",
        tipo: ["Normal"],
        imagemUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/19.png",
        descricao: "Pequeno e rápido, rói qualquer coisa para desgastar seus dentes afiados.",
        favorito: false
      },
      {
        id: 20,
        nome: "Raticate",
        tipo: ["Normal"],
        imagemUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/20.png",
        descricao: "Tem presas poderosas e pode roer até madeira e concreto com facilidade.",
        favorito: false
      }
    ];