import Botoes from './botoes.js';

// comentarios daoras
export default class menuInicial extends Phaser.Scene {
    constructor() {
        super('menuInicial')
    }
    preload() {
        //map tiles
        this.load.image('studio', 'source/_img/estudio.png');
        //teclas, discos musica, imagem backgroundssss, ICONES,
        Botoes.preload(this);
        this.load.audio('musica', 'source/musicas/Coasting.mp3')
        //this.load.image('fundoDaImagem','source/_img/estudio.');
        this.load.json('beatmap', 'js/objetos/mapaMusicaTeste.json');
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
        this.image = this.add.image(800, 430, 'studio');
        this.image.setScale(1.0);
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
                delay: 0
            });
        });
        // TODO: se clicar fora pausar o jogo e música
        // TODO: se der F5 retornar ao home.html
    }


    update() {
        this.spawnerVermelho.update();
        this.spawnerVerde.update();
        this.spawnerAmarelo.update();
        this.spawnerAzul.update();
    }


}
