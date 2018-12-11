
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
var ZeldaGame =
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
                game.load.image('HUD_Bomba','img/HUD_Bomba.png');
                game.load.image('HUD_Flecha','img/HUD_Flecha.png');
                game.load.image('HUD_Llave','img/Hud_Llave.png');
                game.load.image('HUD_Life','img/HUD_Life.png');
                game.load.image('HUD_Rupia','img/HUD_Rupia.png');
                game.load.image('HUD_CorazonLleno','img/HUD_CorazonLleno.png');
                game.load.image('HUD_CorazonMedio','img/HUD_CorazonMedio.png');
                game.load.image('HUD_CorazonVacio','img/HUD_CorazonVacio.png');
                game.load.image('HUD_BarraEnergia','img/HUD_BarraEnergia.png');
                game.load.image('HUD_ItemActual','img/HUD_ItemActual.png');
                game.load.image('HUD_Numero0','img/HUD_Numero0.png');
                game.load.image('HUD_Numero1','img/HUD_Numero1.png');
                game.load.image('HUD_Numero2','img/HUD_Numero2.png');
                game.load.image('HUD_Numero3','img/HUD_Numero3.png');
                game.load.image('HUD_Numero4','img/HUD_Numero4.png');
                game.load.image('HUD_Numero5','img/HUD_Numero5.png');
                game.load.image('HUD_Numero6','img/HUD_Numero6.png');
                game.load.image('HUD_Numero7','img/HUD_Numero7.png');
                game.load.image('HUD_Numero8','img/HUD_Numero8.png');
                game.load.image('HUD_Numero9','img/HUD_Numero9.png');
                
               
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
                this.Background = game.add.sprite(0,0,'background');
                this.Background.scale.setTo(1.65);
                
                this.nivel =[
                    '00000000000000000000000000000000',
                    '00000000000000000000000000000000',
                    '00000000000000000000000000000000',
                    '00000000000000000000000000000000',
                    '00002200001111111111111111110000',
                    '00002200001111111111111111110000',
                    '00002200001111111111110011110000',
                    '00002200001111111111110011110000',
                    '00002211111111111111000000110000',
                    '00002211111111111111000000110000',
                    '00001111111111111111000000110000',
                    '00001111111111111111000000110000',
                    '00001111111111111111110011110000',
                    '00001111111111111111110011110000',
                    '00001111111111111111111111110000',
                    '00001100001111111111111111110000',
                    '00001100001111111111111111220000',
                    '00001100001111111111111111220000',
                    '00001111111111111111111111110000',
                    '00001111111111111111111111110000',
                    '00000000000000000000000000000000',
                    '00000000000000000000000000000000',
                    '00000000000000000000000000000000',
                    '00000000000000000000000000000000'
                ]
                
                
                for (var i=0; i<this.nivel.length;i++)
                {
                    for (var j=0; j<this.nivel[i].length;j++)
                    {
                        switch(this.nivel[i][j])
                        {
                            case '0':
                                muro = game.add.sprite(17*j,17*i,'muro');
                                muro.body.immovable = true;                     
                                break;
                            default:
                                break;
                                               
                        }
                    }
                }
                
                
                /////////////////////////////////////////////////////////////////////////Barra Energia && ITEM
                this.Energy = game.add.sprite(60,60,'HUD_BarraEnergia');
                this.Energy.scale.setTo(2);
                this.Item = game.add.sprite(100,60,'HUD_ItemActual');
                this.Item.scale.setTo(2);
                ////////////////////////////////////////////////////////////////////////Rupias
                this.Rupias = game.add.sprite(200,60,'HUD_Rupia');
                this.Rupias.scale.setTo(2);
                this.NumeroRupias1 = game.add.sprite(180,80,'HUD_Numero0');
                this.NumeroRupias1.scale.setTo(2);
                this.NumeroRupias2 = game.add.sprite(200,80,'HUD_Numero0');
                this.NumeroRupias2.scale.setTo(2);
                this.NumeroRupias3 = game.add.sprite(220,80,'HUD_Numero0');
                this.NumeroRupias3.scale.setTo(2);
                ///////////////////////////////////////////////////////////////////////Bombas
                this.Bombas = game.add.sprite(270,60,'HUD_Bomba');
                this.Bombas.scale.setTo(2);
                this.NumeroBombas1 = game.add.sprite(260,80,'HUD_Numero0');
                this.NumeroBombas1.scale.setTo(2);
                this.NumeroBombas2 = game.add.sprite(280,80,'HUD_Numero0');
                this.NumeroBombas2.scale.setTo(2);
                //////////////////////////////////////////////////////////////////////Flechas
                this.Flechas = game.add.sprite(340,60,'HUD_Flecha');
                this.Flechas.scale.setTo(2);
                this.NumeroFlechas1 = game.add.sprite(330,80,'HUD_Numero0');
                this.NumeroFlechas1.scale.setTo(2);
                this.NumeroFlechas2 = game.add.sprite(350,80,'HUD_Numero0');
                this.NumeroFlechas2.scale.setTo(2)
                ///////////////////////////////////Corazones
                this.Corazones = game.add.sprite(500,60,'HUD_Life');
                this.Corazones.scale.setTo(3);
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
        
              /* //////////////////////////////////////////////////HUD
                if(this.cursors.left.isDown && !down)
                {
                    NumeroVida--;                    
                    if(NumeroVida <= 0)NumeroVida = 0;
                    
                    NumeroRupias--;                    
                    if(NumeroRupias <= 0) NumeroRupias = 0;
                    
                    NumeroFlechas--;                    
                    if(NumeroFlechas <= 0) NumeroFlechas = 0;
                    
                    NumeroBombas--;
                    if(NumeroBombas <= 0) NumeroBombas = 0;
                    
                    down=true;
                    
                }
               if(this.cursors.left.isUp && down)
                   {
                       down=false;
                   }
                if(this.cursors.right.isDown && !up)
                {
                    NumeroVida++;
                    if(NumeroVida > 6) NumeroVida = 6;
                    
                    NumeroRupias++;
                    if(NumeroRupias > 9) NumeroRupias = 9;
                    
                    NumeroFlechas++;
                    if(NumeroFlechas > 9) NumeroFlechas = 9;
                    
                    NumeroBombas++;
                    if(NumeroBombas > 9) NumeroBombas = 9;
                    
                    up=true;
                }
               if(this.cursors.right.isUp && up)
                   {
                       up=false;
                   }
                if(this.cursors.up.isDown)
                {
                    
                }else
                if(this.cursors.down.isDown)
                {
                    
                }else
                
               /////////////////////////////////////////////////////////////////////////////////////////////////
               /////////////////////////////////////////////////////////////////////////////////////////////////CORAZONES
               /////////////////////////////////////////////////////////////////////////////////////////////////
                 switch(NumeroVida)
                {  
                    case 0:
                    {
                        this.Corazon1 = game.add.sprite(460,90,'HUD_CorazonVacio');
                        this.Corazon1.scale.setTo(3);
                        this.Corazon2 = game.add.sprite(480,90,'HUD_CorazonVacio');
                        this.Corazon2.scale.setTo(3);
                        this.Corazon3 = game.add.sprite(500,90,'HUD_CorazonVacio');
                        this.Corazon3.scale.setTo(3);
                        break;
                        
                    }
                    case 1:
                    {
                        this.Corazon1 = game.add.sprite(460,90,'HUD_CorazonMedio');
                        this.Corazon1.scale.setTo(3);
                        this.Corazon2 = game.add.sprite(480,90,'HUD_CorazonVacio');
                        this.Corazon2.scale.setTo(3);
                        this.Corazon3 = game.add.sprite(500,90,'HUD_CorazonVacio');
                        this.Corazon3.scale.setTo(3);
                        break;
                        
                    }
                    case 2:
                    {
                        this.Corazon1 = game.add.sprite(460,90,'HUD_CorazonLleno');
                        this.Corazon1.scale.setTo(3);
                        this.Corazon2 = game.add.sprite(480,90,'HUD_CorazonVacio');
                        this.Corazon2.scale.setTo(3);
                        this.Corazon3 = game.add.sprite(500,90,'HUD_CorazonVacio');
                        this.Corazon3.scale.setTo(3);
                        break;
                    }
                    case 3:
                    {
                        this.Corazon1 = game.add.sprite(460,90,'HUD_CorazonLleno');
                        this.Corazon1.scale.setTo(3);
                        this.Corazon2 = game.add.sprite(480,90,'HUD_CorazonMedio');
                        this.Corazon2.scale.setTo(3);
                        this.Corazon3 = game.add.sprite(500,90,'HUD_CorazonVacio');
                        this.Corazon3.scale.setTo(3);
                        break;
                    }
                    case 4:
                    {
                        this.Corazon1 = game.add.sprite(460,90,'HUD_CorazonLleno');
                        this.Corazon1.scale.setTo(3);
                        this.Corazon2 = game.add.sprite(480,90,'HUD_CorazonLleno');
                        this.Corazon2.scale.setTo(3);
                        this.Corazon3 = game.add.sprite(500,90,'HUD_CorazonVacio');
                        this.Corazon3.scale.setTo(3);
                        break;
                    }
                    case 5:
                    {
                        this.Corazon1 = game.add.sprite(460,90,'HUD_CorazonLleno');
                        this.Corazon1.scale.setTo(3);
                        this.Corazon2 = game.add.sprite(480,90,'HUD_CorazonLleno');
                        this.Corazon2.scale.setTo(3);
                        this.Corazon3 = game.add.sprite(500,90,'HUD_CorazonMedio');
                        this.Corazon3.scale.setTo(3);
                        break;
                    }
                    case 6:
                    {
                        this.Corazon1 = game.add.sprite(460,90,'HUD_CorazonLleno');
                        this.Corazon1.scale.setTo(3);
                        this.Corazon2 = game.add.sprite(480,90,'HUD_CorazonLleno');
                        this.Corazon2.scale.setTo(3);
                        this.Corazon3 = game.add.sprite(500,90,'HUD_CorazonLleno');
                        this.Corazon3.scale.setTo(3);
                        break;
                    }
                    default:
                    {
                        break;
                    }
                }
               /////////////////////////////////////////////////////////////////////////////////////////////////
               /////////////////////////////////////////////////////////////////////////////////////////////////Rupias
               /////////////////////////////////////////////////////////////////////////////////////////////////
              
               if(NumeroRupias < 10)
                {
                   switch(NumeroRupias)
                    {
                        case 0: 
                                this.NumeroRupias3 = game.add.sprite(220,80,'HUD_Numero0');
                                this.NumeroRupias3.scale.setTo(2);
                            break;
                        case 1:
                                
                                this.NumeroRupias3 = game.add.sprite(220,80,'HUD_Numero1');
                                this.NumeroRupias3.scale.setTo(2);
                            break;
                        case 2:
                                
                                this.NumeroRupias3 = game.add.sprite(220,80,'HUD_Numero2');
                                this.NumeroRupias3.scale.setTo(2);
                            break;
                        case 3:                            
                                this.NumeroRupias3 = game.add.sprite(220,80,'HUD_Numero3');
                                this.NumeroRupias3.scale.setTo(2);
                            break;
                        case 4:
                                
                                this.NumeroRupias3 = game.add.sprite(220,80,'HUD_Numero4');
                                this.NumeroRupias3.scale.setTo(2);
                            break;
                        case 5:
                                
                                this.NumeroRupias3 = game.add.sprite(220,80,'HUD_Numero5');
                                this.NumeroRupias3.scale.setTo(2);
                            break;
                        case 6:                               
                                this.NumeroRupias3 = game.add.sprite(220,80,'HUD_Numero6');
                                this.NumeroRupias3.scale.setTo(2);
                            break;
                        case 7:                                
                                this.NumeroRupias3 = game.add.sprite(220,80,'HUD_Numero7');
                                this.NumeroRupias3.scale.setTo(2);
                            break;
                        case 8:
                                this.NumeroRupias3 = game.add.sprite(220,80,'HUD_Numero8');
                                this.NumeroRupias3.scale.setTo(2);
                            break;
                        case 9:
                                this.NumeroRupias3 = game.add.sprite(220,80,'HUD_Numero9');
                                this.NumeroRupias3.scale.setTo(2);
                            break;
                        default:
                            break;
                            
                    }
                }
               /////////////////////////////////////////////////////////////////////////////////////////////////
               /////////////////////////////////////////////////////////////////////////////////////////////////Bombas
               /////////////////////////////////////////////////////////////////////////////////////////////////
              
               if(NumeroBombas < 10)
                {
                   switch(NumeroBombas)
                    {
                        case 0:    
                                this.NumeroBombas2 = game.add.sprite(280,80,'HUD_Numero0');
                                this.NumeroBombas2.scale.setTo(2);
                            break;
                        case 1:    
                                this.NumeroBombas2 = game.add.sprite(280,80,'HUD_Numero1');
                                this.NumeroBombas2.scale.setTo(2);
                            break;
                        case 2:    
                                this.NumeroBombas2 = game.add.sprite(280,80,'HUD_Numero2');
                                this.NumeroBombas2.scale.setTo(2);
                            break;
                        case 3:    
                                this.NumeroBombas2 = game.add.sprite(280,80,'HUD_Numero3');
                                this.NumeroBombas2.scale.setTo(2);
                            break;
                        case 4:    
                                this.NumeroBombas2 = game.add.sprite(280,80,'HUD_Numero4');
                                this.NumeroBombas2.scale.setTo(2);
                            break;
                        case 5:    
                                this.NumeroBombas2 = game.add.sprite(280,80,'HUD_Numero5');
                                this.NumeroBombas2.scale.setTo(2);
                            break;
                        case 6:     
                                this.NumeroBombas2 = game.add.sprite(280,80,'HUD_Numero6');
                                this.NumeroBombas2.scale.setTo(2);
                            break;
                        case 7:    
                                this.NumeroBombas2 = game.add.sprite(280,80,'HUD_Numero7');
                                this.NumeroBombas2.scale.setTo(2);
                            break;
                        case 8:    
                                this.NumeroBombas2 = game.add.sprite(280,80,'HUD_Numero8');
                                this.NumeroBombas2.scale.setTo(2);
                            break;
                        case 9:    
                                this.NumeroBombas2 = game.add.sprite(280,80,'HUD_Numero9');
                                this.NumeroBombas2.scale.setTo(2);
                            break;
                        default:
                            break;
                            
                    }
                }
               
               /////////////////////////////////////////////////////////////////////////////////////////////////
               /////////////////////////////////////////////////////////////////////////////////////////////////Flechas
               /////////////////////////////////////////////////////////////////////////////////////////////////
              
               if(NumeroFlechas < 10)
                {
                   switch(NumeroFlechas)
                    {
                        case 0:    
                                this.NumeroFlechas2 = game.add.sprite(350,80,'HUD_Numero0');
                                this.NumeroFlechas2.scale.setTo(2)
                            break;
                        case 1:    
                                this.NumeroFlechas2 = game.add.sprite(350,80,'HUD_Numero1');
                                this.NumeroFlechas2.scale.setTo(2)
                            break;
                        case 2:    
                                this.NumeroFlechas2 = game.add.sprite(350,80,'HUD_Numero2');
                                this.NumeroFlechas2.scale.setTo(2)
                            break;
                        case 3:    
                                this.NumeroFlechas2 = game.add.sprite(350,80,'HUD_Numero3');
                                this.NumeroFlechas2.scale.setTo(2)
                            break;
                        case 4:    
                                this.NumeroFlechas2 = game.add.sprite(350,80,'HUD_Numero4');
                                this.NumeroFlechas2.scale.setTo(2)
                            break;
                        case 5:    
                                this.NumeroFlechas2 = game.add.sprite(350,80,'HUD_Numero5');
                                this.NumeroFlechas2.scale.setTo(2)
                            break;
                        case 6:    
                                this.NumeroFlechas2 = game.add.sprite(350,80,'HUD_Numero6');
                                this.NumeroFlechas2.scale.setTo(2)
                            break;
                        case 7:    
                                this.NumeroFlechas2 = game.add.sprite(350,80,'HUD_Numero7');
                                this.NumeroFlechas2.scale.setTo(2)
                            break;
                        case 8:    
                                this.NumeroFlechas2 = game.add.sprite(350,80,'HUD_Numero8');
                                this.NumeroFlechas2.scale.setTo(2)
                        case 9:    
                                this.NumeroFlechas2 = game.add.sprite(350,80,'HUD_Numero9');
                                this.NumeroFlechas2.scale.setTo(2)
                            break;
                        default:
                            break;
                            
                    }
                }*/
            },
            
    
};

var game = new Phaser.Game(gameOptions.gameWidth,gameOptions.gameHeight,Phaser.AUTO,null,this,false,false);

game.state.add('main',ZeldaGame);
game.state.add('exterior',ZeldaGame2);
game.state.start('main');