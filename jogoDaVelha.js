const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let tabuleiro = [
    [' ', ' ', ' '],
    [' ', ' ', ' '],
    [' ', ' ', ' ']
];

let jogadorAtual = 'X';

function imprimirTabuleiro() {
    console.log(tabuleiro.map(row => row.join(' | ')).join('\n---------\n'));
}

function checarVencedor() {
    const linhas = [
        [tabuleiro[0][0], tabuleiro[0][1], tabuleiro[0][2]],
        [tabuleiro[1][0], tabuleiro[1][1], tabuleiro[1][2]],
        [tabuleiro[2][0], tabuleiro[2][1], tabuleiro[2][2]],

        [tabuleiro[0][0], tabuleiro[1][0], tabuleiro[2][0]],
        [tabuleiro[0][1], tabuleiro[1][1], tabuleiro[2][1]],
        [tabuleiro[0][2], tabuleiro[1][2], tabuleiro[2][2]],

        [tabuleiro[0][0], tabuleiro[1][1], tabuleiro[2][2]],
        [tabuleiro[0][2], tabuleiro[1][1], tabuleiro[2][0]]
    ];

    for (let linha of linhas) {
        if (linha.every(celula => celula === 'X')) return 'X';
        if (linha.every(celula => celula === 'O')) return 'O';
    }

    return null;
}

function isFull() {
    return tabuleiro.every(row => row.every(celula => celula !== ' '));
}

function jogar() {
    imprimirTabuleiro();
    rl.question(`Jogador ${jogadorAtual}, insira sua jogada (linha e coluna 0 a 2, separados por espaço. Ex.: 1 2): `, (input) => {
        const [linha, coluna] = input.split(' ').map(Number);
        
        if (Number.isInteger(linha) && Number.isInteger(coluna) && linha >= 0 && linha < 3 && coluna >= 0 && coluna < 3) {
            if (tabuleiro[linha][coluna] === ' ') {
                tabuleiro[linha][coluna] = jogadorAtual;
                const vencedor = checarVencedor();
                
                if (vencedor) {
                    imprimirTabuleiro();
                    console.log(`Jogador ${vencedor} venceu!`);
                    rl.close();
                } else if (isFull()) {
                    imprimirTabuleiro();
                    console.log('Empate!');
                    rl.close();
                } else {
                    jogadorAtual = jogadorAtual === 'X' ? 'O' : 'X';
                    jogar();
                }
                
            } else {
                console.log('Essa célula já está ocupada. Tente novamente.');
                jogar();
            }

        } else {
            console.log('Entrada inválida. Tente novamente.');
            jogar();
        }
    });
}

jogar();
