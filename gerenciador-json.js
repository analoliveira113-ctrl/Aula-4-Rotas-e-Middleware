// gerenciador-json.js

const fs = require('fs'); //está requerindo o File System (que permite ler e escrever arquivos)
const path = require('path'); //está requerindo o path (que permite lidar com caminhos de arquivos e diretórios)

// Defina o caminho do arquivo
const arquivoUsuarios = path.join(__dirname, 'usuarios.json');
// __dirname é uma variável especial do Node.js que contém o caminho da pasta onde está o arquivo atual (nesse caso, em Mini-Revisão)
// path.join junta caminhos de forma segura, independente do sistema operacional

// Função para criar arquivo inicial se não existir
function criarArquivoInicial(){ // O nome é "criarArquivoInicial" porque essa função não cria só os usuários iniciais, mas sim cria o arquivo (usuarios.json) com esses dados, caso ele ainda não exista
    const usuariosIniciais = [
         { id: 1, nome: 'Ana Paulino', email: 'ana.paulino@email.com', idade: 16 },
         { id: 2, nome: 'Bruno de Oliveira', email: 'bruno.oliveira@email.com', idade: 35 },
         { id: 3, nome: 'Carla Souza', email: 'carla.souza@email.com', idade: 22 }
    ];

    if(!fs.existsSync(arquivoUsuarios)){ //verifica se o arquivo (usuarios.json) n existe, "fs.existsSync" retorna true se o arquivo existir e false se n existir, O "!" inverte o resultado, então entra no bloco apenas se o arquivo n existir
        // Escreva o arquivo JSON
        fs.writeFileSync(arquivoUsuarios, JSON.stringify(usuariosIniciais, null, 2)); //Cria o arquivo usuarios.json e coloca dentro dele os dados dos usuários iniciais. "JSON.stringify(usuariosIniciais, null, 2)"" transforma o array de usuários em texto no formato JSON, com identação (fica mais organizado).
        console.log('Arquivo usuarios.json criado!');
    }
 }

 // Função para ler usuários
 function lerUsuarios() { //define uma função chamada "lerUsuarios"
    try{ //Inicia um bloco de código que vai tentar executar as próximas linhas. Se der erro, pula para o catch
        // Leia e parse o JSON
        const dados = fs.readFileSync(arquivoUsuarios, 'utf8'); //Lê o conteúdo do arquivo usuarios.json usando o módulo fs. O 'utf8' indica que o arquivo é texto codificado em UTF-8. O conteúdo lido é armazenado na variável "dados"
        return JSON.parse(dados); //Converte o texto lido do arquivo (que está em formato JSON) para um array de objetos JavaScript. Retorna esse array para quem chamou a função.
    }catch (error){ //Se acontecer algum erro ao ler ou converter o arquivo, executa este bloco.
        console.error('Erro ao ler usuários:', error.message); //Mostra uma mensagem de erro no console, explicando o que aconteceu.
        return []; //Retorna um array (estrutura que serve para guardar vários valores em uma única variável, organizados em uma lista) vazio, indicando que não foi possível ler os usuários
    }
 }

 // Função para adicionar usuário
  function adicionarUsuario(nome, email, idade) { //Define a função adicionarUsuario que recebe nome, email e idade.
        const usuarios = lerUsuarios(); //chama a função lerUsuarios para obter a lista atual de usuários e armazena na variável "usuarios".

        const novoUsuario = { //Cria um novo objeto chamado novoUsuario com os dados recebidos.
        // ID automático mais robusto: pega o ID do último usuário e soma 1
        id: usuarios.length > 0 ? usuarios[usuarios.length - 1].id + 1 : 1, //Se já existem usuários, pega o ID do último e soma 1. Se não tem nenhum usuário, começa do 1.
        nome, 
        email,
        idade
};

// Adicione ao array
usuarios.push(novoUsuario); //Adiciona o novo usuário à lista de usuários usando push
// Salve no arquivo (esta era a linha a ser corrigida)
fs.writeFileSync(arquivoUsuarios, JSON.stringify(usuarios, null, 2)); //Salva a lista atualizada de usuários no arquivo usuarios.json, convertendo o array para texto JSON organizado.
console.log(`Usuário ${nome} adicionado!`);
  }

// Função para listar usuários
function listarUsuarios(){ //Define a função listarUsuarios
    const usuarios = lerUsuarios(); //Lê todos os usuários do arquivo.
    console.log('\n=== LISTA DE USUÁRIOS ===');
    usuarios.forEach(usuario => { //Para cada usuário, mostra os dados formatados: ID, nome, email e idade.
        console.log(`ID: ${usuario.id} | Nome: ${usuario.nome} | Email: ${usuario.email} | Idade: ${usuario.idade}`);
    });
}

// Execute as funções
criarArquivoInicial();
// Adicione 2 usuários e liste todos
adicionarUsuario('Daniel Mendonça', 'daniel.mendonca@email.com', 50);
adicionarUsuario('Eva Votocel', 'eva.votocel@email.com', 26);
listarUsuarios();