var zelda = zelda || {};
var live;
var Down = true;
var Left=false;
var Up=false;
var Right = false;
var time =0;
var pos=0;
var posX = 0;
var posY=0;
var velX=0;
var velY=0;
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
    this.body.setSize(100, 50, 50, 25);
    posY=y;
    posX=x;
   //this.body.immovable = true;
    //this.game.physics.arcade.collide.size(0,0);
    live=1;
    time=0;
    pos=this.game.rnd.integerInRange(0,3);
    switch(pos)
        {
            case 0:
             {
                 
                 pos=1;
                 velX=this.body.velocity.x=-100;
                 velY=this.body.velocity.y=0;
                  this.animations.play('Left');
                  break;
             }
            case 1:
                {
                    
                    velX=this.body.velocity.x=0;
                    velY=this.body.velocity.y=-100;
                    pos=2;
                    this.animations.play('Up');
                    break;
                }
            case 2:
                {
                   
                    velX=this.body.velocity.x=100;
                   velY=this.body.velocity.y=0;
                     this.animations.play('Right');
                    pos=3;
                    break;
                }
            case 3:
                {
                    
                    pos=0;
                   velX= this.body.velocity.x=0;
                    velY=this.body.velocity.y=100;
                    this.animations.play('MDown');
                    break;
                }
            default:{break;}
        }
    
};

zelda.soldier_prefab.prototype = Object.create(Phaser.Sprite.prototype);
zelda.soldier_prefab.constructor = zelda.soldier_prefab;

zelda.soldier_prefab.chandeDirection = function()
{
    this.body.immovable = true;
    var a =this.game.rnd.integerInRange(0,3);
    while(a==pos)
    {
        var a =this.game.rnd.integerInRange(0,3);
    }
    pos=a;
   switch(pos)
        {
            case 0:
             {
                 
                 pos=1;
                 velX=this.body.velocity.x= -100;
                 velY=this.body.velocity.y= 0;
                  this.animations.play('Left');
                  break;
             }
            case 1:
                {
                    
                    velX=this.body.velocity.x= 0;
                    velY=this.body.velocity.y= -100;
                    pos=2;
                    this.animations.play('Up');
                    break;
                }
            case 2:
                {
                   
                    velX=this.body.velocity.x= 100;
                   velY=this.body.velocity.y= 0;
                     this.animations.play('Right');
                    pos=3;
                    break;
                }
            case 3:
                {
                    
                    pos=0;
                   velX= this.body.velocity.x= 0;
                    velY=this.body.velocity.y= 100;
                    this.animations.play('MDown');
                    break;
                }
            default:{break;}
        }
     this.body.immovable = false;
};
zelda.soldier_prefab.prototype.update = function()
{
    this.game.physics.arcade.collide(this,this.level.walls,this.chandeDirection,null,this);
    this.game.physics.arcade.collide(this,this.level.hero,this.hitHero,null,this);
    time+=0.033;
   this.body.velocity.x = velX;
    this.body.velocity.y=velY;
   if(time>=10)
    {
        this.body.immovable = true;
        var a =this.game.rnd.integerInRange(0,3);
        while(a==pos)
        {
            var a =this.game.rnd.integerInRange(0,3);
        }
        pos=a;
        switch(pos)
        {
            case 0:
             {
                 
                 pos=1;
                 velX=this.body.velocity.x=-100;
                 velY=this.body.velocity.y=0;
                  this.animations.play('Left');
                  break;
             }
            case 1:
                {
                    
                    velX=this.body.velocity.x=0;
                    velY=this.body.velocity.y=-100;
                    pos=2;
                    this.animations.play('Up');
                    break;
                }
            case 2:
                {
                   
                    velX=this.body.velocity.x=100;
                   velY=this.body.velocity.y=0;
                     this.animations.play('Right');
                    pos=3;
                    break;
                }
            case 3:
                {
                    
                    pos=0;
                   velX= this.body.velocity.x=0;
                    velY=this.body.velocity.y=100;
                    this.animations.play('MDown');
                    break;
                }
            default:{break;}
        }
        this.body.immovable = false;
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
        
       
        
        
            this.level.hitHero();
        
       
        
    }
};