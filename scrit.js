let divElemento = document.querySelector('div'),
    tableElement = document.querySelector('table');

let game = {
    start(){
        this.campo = [
            ['', '', ''],
            ['', '', ''],
            ['', '', '']
        ];

        this.currentPlayer = 'X';
        this.isFinished = false;
        this.round = 0;
        this.render();
    },

    nextPlayer(){
        this.currentPlayer = this.currentPlayer === 'X' ? 'O':'X';
    },

    setCampo(line, coluna){
        if(!this.isFinished && this.campo[line][coluna] === ''){
            this.campo[line][coluna] = this.currentPlayer;
            this.nextPlayer();
            this.round++;
            this.render();
        }
    },

    isGameOver(){
        let campo = this.campo,
            rows = 3,
            cols = 3,
            totalRows = 0,
            totalCols = 0;

        for(let i = 0; i < rows; i++){
            totalRows = 0;
            totalCols = 0;
            for(let ii = 0; ii < cols; ii++){
                if(campo[i][ii] === 'X'){
                    totalRows++;
                }
                if((campo[i][ii] === 'O')){
                    totalRows--;
                }
                if(campo[ii][i] === 'X'){
                    totalCols++;
                }
                if((campo[ii][i] === 'O')){
                    totalCols--;
                }
            }
            if(totalRows === 3 || totalCols === 3){
                return 'X';
            }
            if(totalRows === -3 || totalCols ===-3){
                return 'O';
            }
        }

        if((campo[0][0] !== '') && (campo[0][0] === campo[1][1] && campo[1][1] === campo[2][2])){
            return campo[0][0];
        }
        if((campo[0][2] !== '') && (campo[0][2] === campo[1][1] && campo[1][1] === campo[2][0])){
            return campo[0][2];
        }
        if(this.round === rows * cols){
            return '[ Jogo Empatado ]'
        }
    },

            /* For linhas e Colunas */
    render(){
        let ganhador = this.isGameOver();
        divElemento.textContent = ganhador ? `Ganhador: ${ganhador}` : `Jogador Atual: ${this.currentPlayer}`;

            if(ganhador){
                this.isFinished = true;
            }

        let tabela = '';
        this.campo.forEach((line, lineIndex)=>{
            tabela += '<tr>';
            line.forEach((coluna, colunaIndex)=>{
                tabela += `<td onclick="game.setCampo(${lineIndex}, ${colunaIndex})" >${coluna}</td>`
            })
            tabela += '</tr>'
        })
        tableElement.innerHTML = tabela;
    }
}

game.start();