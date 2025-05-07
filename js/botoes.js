export default class Botoes extends Phaser.Physics.Arcade.Sprite {
    constructor(scene) {
        super(scene);
        this.scene = scene;
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.donut;
    }

    static preload(scene) {
        scene.load.image('botaovermelho', 'source/_img/botaovermelho.png');

        scene.load.image('botaoverde', 'source/_img/botaoverde.png');

        scene.load.image('botaoamarelo', 'source/_img/botaoamarelo.png');

        scene.load.image('botaoazul', 'source/_img/botaoazul.png');

    }

    createNote(cor) {
        // Randomly place the donuts in the world
        // between x: 0 and 800, and y: 200 and 600
        // -TODO: setar spawn x até innerWidth

        //essa parte de ERA baixo é a que faz a nota spawnar em lugar aleatório

        const posX = document.getElementById(cor);
        const rect = posX.getBoundingClientRect();

        //const x = Phaser.Math.Between(200, 1000); 
                        
        const x = (rect.left + (rect.right - rect.left) / 2) - 5;

        const y = 100;

        if (cor == "vermelho") {
            this.donut = this.scene.physics.add.image(x, y, 'botaovermelho').setScale(0.50);
            
        }
        else if (cor == "verde") {
            this.donut = this.scene.physics.add.image(x, y, 'botaoverde').setScale(0.50);
        }
        else if (cor == "amarelo") {
            this.donut = this.scene.physics.add.image(x, y, 'botaoamarelo').setScale(0.50);
        }
        else if (cor == "azul") {
            this.donut = this.scene.physics.add.image(x, y, 'botaoazul').setScale(0.50);
        }
        this.donut.setVelocityY(200, 10);
    }

    update() {
        //Phaser.Actions.IncY(this.donut, 2, 2);

        //Phaser.Actions.WrapInRectangle(this.donuts, this.cameras.main.getBounds(), 128);
    }
}