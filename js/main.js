import menuInicial from './menuInicial.js';


window.onload= function(){
const config = {
    type: Phaser.AUTO,
    width: window.innerWidth,
    height: window.innerHeight,
    physics:{
        //TODO: TIRA O BOTAO VERDEPIOR
        default: 'arcade',
        arcade:{
            debug:true,
        }
    },
    scene:[menuInicial]
 }
 let game = new Phaser.Game(config);

}