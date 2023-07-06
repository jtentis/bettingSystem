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
const ROWS = 3;
const COLS = 3;

//mapa com simbolos com diferentes valores.
const SYMBOLS_COUNT = {
    A: 2,
    B: 4,
    C: 6,
    D: 8  
};

const SYMBOL_VALUES = {
    A: 5,
    B: 4,
    C: 3,
    D: 2
};

// const variavel que não muda.
const deposit = () => {
    while(true){
        const depositAmount = prompt("Insira o valor do deposito: ");
        const numberDepositAmount = parseFloat(depositAmount);

        if(isNaN(numberDepositAmount) || numberDepositAmount <= 0){
            console.log("Valor inválido, tente novamente!");
        }else{
            return numberDepositAmount;
        } 
    }
};

function getNumberOfLines(){
    while(true){
        const lines = prompt("Insira o número de linhas que irá apostar [1-3]: ");
        const numberOfLines = parseFloat(lines);

        if(isNaN(numberOfLines) || numberOfLines > 3 || numberOfLines <= 0){
            console.log("Valor inválido, tente novamente!");
        }else{
            return numberOfLines;
        } 
    }
}

const getBet = (balance, lines) => {
    while(true){
        const bet = prompt("Insira o valor da aposta por linha: ");
        const numberBet = parseFloat(bet);

        if(isNaN(numberBet) || numberBet > balance / lines || numberBet <= 0){
            console.log("Valor inválido, tente novamente!");
        }else{
            return numberBet;
        } 
    }
}

function spin(){
    const symbols = [];
    for(const [symbol, count] of Object.entries(SYMBOLS_COUNT)){
        for(let i = 0; i < count; i++){
            symbols.push(symbol);
        }
    }
    const reels = [];
    for(let i = 0; i < COLS; i++){
        reels.push([]);
        const reelSymbols = [...symbols];
        for(let j = 0; j < ROWS; j++){ 
            const randomIndex = Math.floor(Math.random() * reelSymbols.length)
            const selectedSymbol = reelSymbols[randomIndex];
            reels[i].push(selectedSymbol);
            reelSymbols.splice(randomIndex, 1);
        }
    }
    return reels;
};

const transpose = (reels) => {
    const rows = [];
    for (let i = 0; i < ROWS; i++){
        rows.push([]);
        for(let j = 0; j < COLS; j++){
            rows[i].push(reels[j][i]);
        }
    }
    return rows;
}

const printRows = (rows) => {
    for (const row of rows){
        let rowString = "";
        for(const [i, symbol] of row.entries()){
            rowString += symbol;
            if (i != row.length - 1){
                rowString += " | "
            }
        }
        console.log(rowString);
    }
}

const getWinnings = (rows, bet, lines) => {
    let winnings = 0;

    for(let row = 0; row < lines; row++){
        const symbols = rows[row];
        let allSame = true;
        for(const symbol of symbols){
            if(symbol != symbols[0]){
                allSame = false;
                break;
            }
        }
        if(allSame){
            winnings =+ bet * SYMBOL_VALUES[symbols[0]];
        }
    }
    return winnings;
}

function game(){
    let balance = deposit();
    while(true){
        console.log("\nSeu balanço é de: ", balance);
        const numberOfLines = getNumberOfLines();
        const bet = getBet(balance, numberOfLines);
        balance -= bet * numberOfLines;
        const reels = spin();
        const rows = transpose(reels);
        const winnings = getWinnings(rows, bet, numberOfLines);
        printRows(rows);
        console.log("Você ganhou R$"+winnings.toString());
        balance += winnings;
        console.log("Seu novo balanço total: ", balance);

        if(balance <= 0){
            console.log("Seu dinheiro acabou!");
            break;
        }
        const playAgain = prompt("Quer jogar de novo? [s/n]: ");
        if (playAgain != "s") break;
    }
}

game();


