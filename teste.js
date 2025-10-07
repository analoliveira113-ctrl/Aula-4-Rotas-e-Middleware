// gerenciador-json.js

const fs = require('fs');
const path = require('path');

// Defina o caminho do arquivo
const arquivoUsuarios = path.join(__dirname, 'usuarios.json');

// Função para criar arquivo inicial se não existir
function criarArquivoInicial(){
    const usuariosIniciais = [
         { id: 1, nome: 'Ana Paulino', email: 'ana.paulino@email.com', idade: 16 },
         { id: 2, nome: 'Bruno de Oliveira', email: 'bruno.oliveira@email.com', idade: 35 },
         { id: 3, nome: 'Carla Souza', email: 'carla.souza@email.com', idade: 22 }
    ];

    if(!fs.existsSync(arquivoUsuarios)){
        // Escreva o arquivo JSON
        fs.writeFileSync(arquivoUsuarios, JSON.stringify(usuariosIniciais, null, 2));
        console.log('Arquivo usuarios.json criado!');
    }
 }

 // Função para ler usuários
 function lerUsuarios() {
    try{
        // Leia e parse o JSON
        const dados = fs.readFileSync(arquivoUsuarios, 'utf8');
        return JSON.parse(dados);
    }catch (error){
        console.error('Erro ao ler usuários:', error.message);
        return [];
    }
 }

 // Função para adicionar usuário
  function adicionarUsuario(nome, email, idade) {
        const usuarios = lerUsuarios();

        const novoUsuario = {
        // ID automático mais robusto: pega o ID do último usuário e soma 1
        id: usuarios.length > 0 ? usuarios[usuarios.length - 1].id + 1 : 1, //onde eu errei: n tinha colocado essa parte
        nome, // forma curta para nome: nome
        email,
        idade
};

// Adicione ao array
usuarios.push(novoUsuario);
// Salve no arquivo (esta era a linha a ser corrigida)
fs.writeFileSync(arquivoUsuarios, JSON.stringify(usuarios, null, 2)); //onde eu errei: n tinha colocado essa parte
console.log(`Usuário ${nome} adicionado!`);
  }

// Função para listar usuários
function listarUsuarios(){
    const usuarios = lerUsuarios();
    console.log('\n=== LISTA DE USUÁRIOS ===');
    usuarios.forEach(usuario => {
        console.log(`ID: ${usuario.id} | Nome: ${usuario.nome} | Email: ${usuario.email} | Idade: ${usuario.idade}`);
    });
}

// Execute as funções
criarArquivoInicial();
// Adicione 2 usuários e liste todos
adicionarUsuario('Daniel Mendonça', 'daniel.mendonca@email.com', 50);
adicionarUsuario('Eva Votocel', 'eva.votocel@email.com', 26);
listarUsuarios();