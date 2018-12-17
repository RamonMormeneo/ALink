var zelda = zelda || {};
var live;
var Down = true;
var Left=false;
var Up=false;
var Right = false;
var time =0;
var pos = 0;
zelda.soldier_prefab = function(game,x,y,level)
{
    Phaser.Sprite.call(this,game,x,y,'soldier');
    this.anchor.setTo(.5);
    this.animations.add('MDown',[0,1],2,true);
    this.animations.add('Left',[8,9],2,true);
    this.animations.add('Up',[12,13],2,true);
    this.animations.add('Right',[4,5],2,true);
    this.animations.play('MDown');
    this.level = level;
    this.game.physics.arcade.enable(this);
    this.body.allowGravity = false;
    this.body.immovable = true;
    live=2;
    time=0;
    pos=0;
};

zelda.soldier_prefab.prototype = Object.create(Phaser.Sprite.prototype);
zelda.soldier_prefab.constructor = zelda.soldier_prefab;

zelda.soldier_prefab.prototype.update = function()
{
    this.game.physics.arcade.collide(this,this.level.walls);
    this.game.physics.arcade.collide(this,this.level.hero,this.hitHero,null,this);
    time+=0.033;
    if(time>=30)
    {
       switch(pos)
        {
            case 0:
             {
                 Down=false;
                 Left=true;
                 pos=1;
                  this.animations.play('Left');
                  break;
             }
            case 1:
                {
                    Left=false;
                    Up=true;
                    pos=2;
                    this.animations.play('Up');
                    break;
                }
            case 2:
                {
                    Up=false;
                    Right=true;
                     this.animations.play('Right');
                    pos=3;
                    break;
                }
            case 3:
                {
                    Right=false;
                    Down=true;
                    pos=0;
                    this.animations.play('MDown');
                    break;
                }
            default:{break;}
        }
        time=0;
    }
};

zelda.soldier_prefab.prototype.hitHero = function(_enemy,_hero)
{ if(gameOptions.Attacking){
       live-=1;
    if(live==0)
        {
            this.kill();
        }
   
        _hero.body.velocity.y=-gameOptions.heroJump;
    }else{
        /*
        this.level.camera.shake(0.05,500);
        _hero.health--;
        this.level.hud_energy.frame =_hero.health;
        _hero.reset(65,100);
        */
        if(_enemy.body.touching.up && _hero.body.touching.down && Up)
        {
            this.level.hitHero();
        }
        else if(_enemy.body.touching.down && _hero.body.touching.up && Down)
        {
            this.level.hitHero();
        }
        else if(_enemy.body.touching.left && _hero.body.touching.right && Left)
        {
            this.level.hitHero();
        }
        else if(_enemy.body.touching.right && _hero.body.touching.left && Right)
        {
            this.level.hitHero();
        }
        else{
            
        }
        
    }
};