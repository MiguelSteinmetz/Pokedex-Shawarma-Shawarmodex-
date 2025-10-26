document.addEventListener("DOMContentLoaded", () => {
    const inputLogin = document.querySelector('input[type="text"]');
    const inputSenha = document.querySelector('input[type="password"]');
    const btnEntrar = document.querySelector('.entrar');
    const btnCriar = document.querySelector('.criar');

    // Função para buscar usuários do LocalStorage
    function getUsuarios() {
        return JSON.parse(localStorage.getItem('usuarios')) || [];
    }

    // Função para salvar usuários no LocalStorage
    function salvarUsuarios(lista) {
        localStorage.setItem('usuarios', JSON.stringify(lista));
    }

    // Criar conta
    btnCriar.addEventListener('click', () => {
        const login = inputLogin.value.trim();
        const senha = inputSenha.value.trim();

        if (!login || !senha) {
            alert("Preencha login e senha!");
            return;
        }

        let usuarios = getUsuarios();
        if (usuarios.find(u => u.login === login)) {
            alert("Usuário já existe!");
            return;
        }
        usuarios.push({ login, senha, favoritos: [] });
        salvarUsuarios(usuarios);
        alert("Conta criada com sucesso!");
    });

    // Entrar
    btnEntrar.addEventListener('click', () => {
        const login = inputLogin.value.trim();
        const senha = inputSenha.value.trim();

        let usuarios = getUsuarios();
        const usuario = usuarios.find(u => u.login === login && u.senha === senha);

        if (!usuario) {
            alert("Login ou senha inválidos!");
            return(window.location.href = 'login.html');
        }else{ }

        // Salvar o usuário logado na sessão
        localStorage.setItem('usuarioLogado', JSON.stringify(usuario));

        // Redirecionar
        window.location.href = 'pokedex.html';
    });
});
