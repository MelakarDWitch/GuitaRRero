import Botoes from './botoes.js';

// comentarios daoras
export default class menuInicial extends Phaser.Scene {
    constructor() {
        super('menuInicial')
    }
    preload() {
        //map tiles
        //teclas, discos musica, imagem backgroundssss, ICONES,
        Botoes.preload(this);
        this.load.audio('musica', 'source/musicas/Coasting.mp3');
        //this.load.image('fundoDaImagem','source/_img/estudio.');
        this.load.json('beatmap', 'js/objetos/mapaMusicaTeste.json');
        this.load.image('teste', 'source/_img/discoVerde.png');
    }
    spawnNota(notas) {
        const notasSplit = notas.split(",");
        if (notasSplit[0] == "1") {
            this.spawnerVerde.createNote("verde");
        }
        if (notasSplit[1] == "1") {

            this.spawnerVermelho.createNote("vermelho");
        }
        if (notasSplit[2] == "1") {
            this.spawnerAmarelo.createNote("amarelo");
        }
        if (notasSplit[3] == "1") {
            this.spawnerAzul.createNote("azul");
        }

    }
    create() {

        //x = largura y = altura(x, y)
        this.spawnerVermelho = new Botoes(this);
        this.spawnerVerde = new Botoes(this);
        this.spawnerAmarelo = new Botoes(this);
        this.spawnerAzul = new Botoes(this);
        const dados = this.cache.json.get('beatmap');
        const coastingBeatmap = dados['coasting'];

        //Criar funções de Spawn das teclas
        for (var i = 0; i < coastingBeatmap.length; i++) {
            const timeMusic = parseInt(coastingBeatmap[i][0]);
            this.time.addEvent({
                delay: timeMusic + 1200, // tempo em milissegundos (1 segundo)
                callback: this.spawnNota.bind(this, coastingBeatmap[i][1]), // função a ser chamada
                callbackScope: this, // escopo da função (geralmente a cena atual)
                loop: false // se o evento deve repetir indefinidamente
            });
        }

        // Executa algo no próximo frame
        this.time.delayedCall(2, () => {
            const musica = this.sound.add('musica');
            musica.play({
                loop: true,
                volume: 1,
                delay: 4
            });
        });
        // TODO:     se clicar fora pausar o jogo e música
        // FEITO: se der F5 retornar ao home.html

        this.keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        this.keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
        this.keyJ = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.J);
        this.keyK = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.K);

        //Posição central das hit-zones
        const posXVerde = document.querySelector("#verde > .hit-zone");
        var rect = posXVerde.getBoundingClientRect();
        this.xVerde = (rect.left + (rect.right - rect.left) / 2);

        const posXVermelho = document.querySelector("#vermelho > .hit-zone");
        rect = posXVermelho.getBoundingClientRect();
        this.xVermelho = (rect.left + (rect.right - rect.left) / 2);

        const posXAmarelo = document.querySelector("#amarelo > .hit-zone");
        rect = posXAmarelo.getBoundingClientRect();
        this.xAmarelo = (rect.left + (rect.right - rect.left) / 2);

        const posXAzul = document.querySelector("#azul >  .hit-zone");
        rect = posXAzul.getBoundingClientRect();
        this.xAzul = (rect.left + (rect.right - rect.left) / 2);

        this.add.image(this.xVerde, 720, 'teste');



    }


    update() {

        this.spawnerVerde.update();
        this.spawnerVermelho.update();
        this.spawnerAmarelo.update();
        this.spawnerAzul.update();

        if (this.keyD.isDown) {
            //xVerde
            //const distancia = Phaser.Math.Distance.Between(objeto.x, objeto.y, pontoX, pontoY);

            //this.spawnerVerde
            //this.position.body
            const donutVerde = this.spawnerVerde.donut;

            // Certifica-se que o donut existe (foi spawnado)
            if (donutVerde) {
                const distancia = Phaser.Math.Distance.Between(donutVerde.x, donutVerde.y, this.xVerde, 720);

                if (distancia < 50) { // 50 px é o raio de tolerância, você pode ajustar
                    console.log("Donut VERDE está próximo da hit-zone!", distancia);
                    // Deleta o donut
                    donutVerde.destroy();
                    this.spawnerVerde.donut = null;
                } else {
                    console.log("Donut VERDE está longe da hit-zone...", distancia);
                }
            }
        }

        if (this.keyF.isDown) {
            //xVermelho
        }

        if (this.keyJ.isDown) {
            //xAmarelo
        }
        if (this.keyK.isDown) {
            //xAzul
        }

    }


}
