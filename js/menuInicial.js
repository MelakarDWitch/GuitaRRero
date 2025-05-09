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
                delay: 2.5
            });
        });
        // TODO:     se clicar fora pausar o jogo e música
        // FEITO: se der F5 retornar ao home.html

        this.keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        this.keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
        this.keyJ = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.J);
        this.keyK = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.K);

        //Posição central das hit-zones
        this.posXVerde = document.querySelector("#verde > .hit-zone");
        var rect = this.posXVerde.getBoundingClientRect();
        this.xVerde = (rect.left + (rect.right - rect.left) / 2);

        this.posXVermelho = document.querySelector("#vermelho > .hit-zone");
        rect = this.posXVermelho.getBoundingClientRect();
        this.xVermelho = (rect.left + (rect.right - rect.left) / 2);

        this.posXAmarelo = document.querySelector("#amarelo > .hit-zone");
        rect = this.posXAmarelo.getBoundingClientRect();
        this.xAmarelo = (rect.left + (rect.right - rect.left) / 2);

        this.posXAzul = document.querySelector("#azul >  .hit-zone");
        rect = this.posXAzul.getBoundingClientRect();
        this.xAzul = (rect.left + (rect.right - rect.left) / 2);

        //this.add.image(this.xVerde, 737, 'teste');
        this.missCount = [0, 0, 0, 0];
    }


    update() {

        this.spawnerVerde.update();
        this.spawnerVermelho.update();
        this.spawnerAmarelo.update();
        this.spawnerAzul.update();

        if (this.spawnerVerde.donut[this.missCount[0]] && this.spawnerVerde.donut[this.missCount[0]].y > 863) {
            this.spawnerVerde.donut[this.missCount[0]].destroy()
            this.missCount[0]++;
        }
        if (this.spawnerVermelho.donut[this.missCount[1]] && this.spawnerVermelho.donut[this.missCount[1]].y > 863) {
            this.spawnerVermelho.donut[this.missCount[1]].destroy()
            this.missCount[1]++;
        }
        if (this.spawnerAmarelo.donut[this.missCount[2]] && this.spawnerAmarelo.donut[this.missCount[2]].y > 863) {
            this.spawnerAmarelo.donut[this.missCount[2]].destroy()
            this.missCount[2]++;
        }
        if (this.spawnerAzul.donut[this.missCount[3]] && this.spawnerAzul.donut[this.missCount[3]].y > 863) {
            this.spawnerAzul.donut[this.missCount[3]].destroy()
            this.missCount[3]++;
        }
        
        //Verde
        if (this.keyD.isDown) {
            this.posXVerde.style = "background-image: url(source/_img/teclaVerde3.png);background-repeat:no-repeat;background-size:100% 100%;";

            const donutVerde = this.spawnerVerde.donut[this.missCount[0]];
            // Certifica-se que o donut existe (foi spawnado)
            if (donutVerde) {
                const distanciaVerde = Phaser.Math.Distance.Between(donutVerde.x, donutVerde.y, this.xVerde, 737);
                //Se a
                if (distanciaVerde <= 50) {
                    // Deleta o donut
                    this.spawnerVerde.donut[this.missCount[0]].destroy()
                    this.spawnerVerde.donut.splice(this.missCount[0], 1)

                    if (distanciaVerde > 30 && distanciaVerde <= 50) { // 50 px é o raio de tolerância, você pode ajustar
                        score = score + 10;
                    } else if (distanciaVerde > 10 && distanciaVerde <= 30) {
                        score = score + 30;
                    } else if (distanciaVerde <= 10) {
                        score = score + 50;
                    }
                    scoreRef.innerHTML = score;
                }
            }
        }
        //Vermelho
        if (this.keyF.isDown) {
            this.posXVermelho.style = "background-image: url(source/_img/teclaVermelho3.png);background-repeat:no-repeat;background-size:100% 100%;";
            const donutVermelho = this.spawnerVermelho.donut[this.missCount[1]];
            if (donutVermelho) {
                const distanciaVermelha = Phaser.Math.Distance.Between(donutVermelho.x, donutVermelho.y, this.xVermelho, 737);
                if (distanciaVermelha <= 50) {
                    this.spawnerVermelho.donut[this.missCount[1]].destroy()
                    this.spawnerVermelho.donut.splice(this.missCount[1], 1)
                    if (distanciaVermelha > 30 && distanciaVermelha <= 50) {
                        score = score + 10;
                    } else if (distanciaVermelha > 10 && distanciaVermelha <= 30) {
                        score = score + 30;
                    } else if (distanciaVermelha <= 10) {
                        score = score + 50;
                    }
                    scoreRef.innerHTML = score;
                }
            }
        }
        //Amarelo
        if (this.keyJ.isDown) {
            this.posXAmarelo.style = "background-image: url(source/_img/teclaAmarelo3.png);background-repeat:no-repeat;background-size:100% 100%;";
            const donutAmarelo = this.spawnerAmarelo.donut[this.missCount[2]];
            if (donutAmarelo) {
                const distanciaAmarelo = Phaser.Math.Distance.Between(donutAmarelo.x, donutAmarelo.y, this.xAmarelo, 737);
                if (distanciaAmarelo <= 50) {
                    this.spawnerAmarelo.donut[this.missCount[2]].destroy()
                    this.spawnerAmarelo.donut.splice(this.missCount[2], 1)
                    if (distanciaAmarelo > 30 && distanciaAmarelo <= 50) {
                        score = score + 10;
                    } else if (distanciaAmarelo > 10 && distanciaAmarelo <= 30) {
                        score = score + 30;
                    } else if (distanciaAmarelo <= 10) {
                        score = score + 50;
                    }
                    scoreRef.innerHTML = score;
                }
            }
        }
        //Azul
        if (this.keyK.isDown) {
            this.posXAzul.style = "background-image: url(source/_img/teclaAzul3.png);background-repeat:no-repeat;background-size:100% 100%;";
            
            const donutAzul = this.spawnerAzul.donut[this.missCount[3]];
            if (donutAzul) {
                const distanciaAzul = Phaser.Math.Distance.Between(donutAzul.x, donutAzul.y, this.xAzul, 737);
                if (distanciaAzul <= 50) {
                    this.spawnerAzul.donut[this.missCount[3]].destroy()
                    this.spawnerAzul.donut.splice(this.missCount[3], 1)
                    if (distanciaAzul > 30 && distanciaAzul <= 50) {
                        score = score + 10;
                    } else if (distanciaAzul > 10 && distanciaAzul <= 30) {
                        score = score + 30;
                    } else if (distanciaAzul <= 10) {
                        score = score + 50;
                    }
                    scoreRef.innerHTML = score;
                }
            }
        
        }
        
    }
}
