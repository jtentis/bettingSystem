// Passo a passo para criação da slot machine

//1. Usuário deposita dinheiro.
//2. Pedir para o usuário determinar o numero de linhas para apostar.
//3. Coletar a quantia de dinheiro a ser apostada.
//4. Rodar a máquina.
//5. Checar se o usuário ganhou.
//6. Dar o dinheiro caso WIN ou pegar o dinheiro caso LOOSE.
//7. Jogar de novo ou cancelar caso usuário esteja sem dinheiro.

// funcao que usa o 'prompt-sync' para pegar input usuário.
const prompt = require("prompt-sync")();

// const variavel que não muda.
const deposit = () => {
    const depositAmount = prompt("Insira o valor do deposito: ");
    // convertendo valor de string para numero.
    const numberDepositAmount = parseFloat(depositAmount);
};

deposit();