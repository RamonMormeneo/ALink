var zelda = zelda || {};
var gameOptions =
    {
    gameWidth:800,
    gameHeight:600,
    bgColor:'#3399DD',
    heroGravity:500,
    heroSpeed:200,
    heroJump:300,    
    Right:false,
    Left:false,
    Up:false,
    Down:true,
    Attacking:false,    
    };


zelda.game = new Phaser.Game(gameOptions.gameWidth,gameOptions.gameHeight,Phaser.AUTO,null,this,false,false);

zelda.game.state.add('interior',zelda.interior);
zelda.game.state.add('exterior',zelda.exterior);
zelda.game.state.start('interior');