var Enem = Enem || {};
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

var NumeroRupias = 0;
var NumeroBombas = 0;
var NumeroFlechas = 0;
var NumeroVida = 0;
var up =false;
var down=false;
var time=0;
var acttime=0;
Enem.Battel =
    {
            init:function()
            {
                game.stage.backgroundColor = gameOptions.bgColor;
                game.physics.startSystem(Phaser.Physics.ARCADE);
                game.world.enableBody = true;
            },
            preload:function()
            {
                this.load.spritesheet('link','assets/Link/AnimaciónLink_Finales.png',150,150);
                /////////////////////////////////////////////////////////////////////////////////////BACKGROUND
                game.load.image('background','img/MAPA_casalink.png');
                game.load.image('muro','img/Vacio.png');
                
                /////////////////////////////////////////////////////////////////////////////////////HUD
                game.load.image('HUD_CorazonLleno','img/HUD_CorazonLleno.png');
                game.load.image('HUD_CorazonMedio','img/HUD_CorazonMedio.png');
                game.load.image('HUD_CorazonVacio','img/HUD_CorazonVacio.png');
                
               ////////////////////////////////////////////////////////////Soldier
                game.load.spritesheet('soldier','assets/Enemi/EnemigoVerde(40x40).png')
            },
            create:function()
            {     
               
                
                /////////////////////////////////////////////////////////////////////////////////////CURSOR
                this.cursors = this.game.input.keyboard.createCursorKeys();
                this.attack =this.game.input.keyboard.addKey(Phaser.Keyboard.E); 
                this.upkey =this.game.input.keyboard.addKey(Phaser.Keyboard.W);
                this.downkey =this.game.input.keyboard.addKey(Phaser.Keyboard.S);
                this.leftkey =this.game.input.keyboard.addKey(Phaser.Keyboard.A);
                this.rightkey =this.game.input.keyboard.addKey(Phaser.Keyboard.D); 
                
                /////////////////////////////////////////////////////////////////////////////////////BACKGROUND
               
                this.Corazon1 = game.add.sprite(460,90,'HUD_CorazonLleno');
                this.Corazon1.scale.setTo(3);
                this.Corazon2 = game.add.sprite(480,90,'HUD_CorazonLleno');
                this.Corazon2.scale.setTo(3);
                this.Corazon3 = game.add.sprite(500,90,'HUD_CorazonLleno');
                this.Corazon3.scale.setTo(3);
                
                 //////////////////////////////////////////////////////////////////////////////////////LINK
                this.hero=this.game.add.sprite(300,120,'link',24);
                this.hero.anchor.setTo(.5);
                this.hero.scale.y=0.8;
                this.hero.scale.x=0.8;
                this.hero.animations.add('runL',[0,1,2,3,4,5,6,7],15,true);
                this.hero.animations.add('runR',[8,9,10,11,12,13,14,15],15,true);
                this.hero.animations.add('runU',[16,17,18,19,20,21,22,23],15,true);
                this.hero.animations.add('runD',[24,25,26,27,28,29,30,31],15,true);
                this.hero.animations.add('attackL',[64,65,66,67,68,69,70,0],25,true);
                this.hero.animations.add('attackR',[72,73,74,75,76,77,78,8],25,true);
                this.hero.animations.add('attackU',[80,81,82,83,84,85,86,16],25,true);
                this.hero.animations.add('attackD',[88,89,90,91,92,93,94,24],25,true);
                this.game.physics.arcade.enable(this.hero);
                this.sol= new Enem.Soldier(game,400,120,this);
                game.add.existind(this.sol);
                
                
            },
            update:function()
           {    
               /////////////////////////////////////////////////////////LINK
               if(this.leftkey.isDown && !gameOptions.Attacking)
               {
                    this.hero.body.velocity.y =0;
                    this.hero.body.velocity.x=-gameOptions.heroSpeed;
                    this.hero.animations.play('runL');
                    gameOptions.Right=false;
                    gameOptions.Left=true;
                    gameOptions.Up=false;
                    gameOptions.Down=false;
               }else 
                if(this.rightkey.isDown && !gameOptions.Attacking)
                {
                    this.hero.body.velocity.y =0;
                    this.hero.body.velocity.x=gameOptions.heroSpeed;
                    this.hero.animations.play('runR');
                    gameOptions.Right=true;
                    gameOptions.Left=false;
                    gameOptions.Up=false;
                    gameOptions.Down=false;
                }else
                if(this.upkey.isDown && !gameOptions.Attacking)
                {
                    this.hero.body.velocity.x =0;
                    this.hero.body.velocity.y=-gameOptions.heroSpeed;
                    this.hero.animations.play('runU');
                    gameOptions.Right=false;
                    gameOptions.Left=false;
                    gameOptions.Up=true;
                    gameOptions.Down=false;    
                }else
                if(this.downkey.isDown && !gameOptions.Attacking){
                    this.hero.body.velocity.x =0;
                    this.hero.body.velocity.y=gameOptions.heroSpeed;
                    this.hero.animations.play('runD');
                    gameOptions.Right=false;
                    gameOptions.Left=false;
                    gameOptions.Up=false;
                    gameOptions.Down=true;   
                }else
                {
                    this.hero.body.velocity.x =0;
                    this.hero.body.velocity.y =0;
                    this.hero.body.velocity.y =0;
                    if(gameOptions.Right && !gameOptions.Attacking ){
                    this.hero.frame=8;
                    }
                    if(gameOptions.Left && !gameOptions.Attacking){
                    this.hero.frame=1;
                    }
                    if(gameOptions.Up && !gameOptions.Attacking){
                    this.hero.frame=19;
                    }
                    if(gameOptions.Down && !gameOptions.Attacking){
                    this.hero.frame=24;
                    }
                    time+=0.033;
                }
            if(this.attack.isDown && !gameOptions.Attacking)    
        {
            gameOptions.Attacking=true;
            acttime=time;
            if(gameOptions.Left)
                {
                this.hero.animations.play('attackL');
                }
            if(gameOptions.Right)
                {
                    this.hero.animations.play('attackR');
                }
            if(gameOptions.Up)
                {
                    this.hero.animations.play('attackU');
                }
            if(gameOptions.Down)
                {
                    this.hero.animations.play('attackD');
                }
        }
        else{
            if(time - acttime >= 0.6)
            {
               gameOptions.Attacking=false;      
            }
        }
        
            },
            
    
};

var game = new Phaser.Game(gameOptions.gameWidth,gameOptions.gameHeight,Phaser.AUTO,null,this,false,false);


game.state.add('batt',Battel);
