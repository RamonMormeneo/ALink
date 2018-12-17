var zelda = zelda || {};

zelda.soldier_prefab = function(game,x,y,level)
{
    Phaser.Sprite.call(this,game,x,y,'soldier');
    this.anchor.setTo(.5);
    //this.scale.x =3;
    //this.scale.y =3;
    this.level = level;
    this.game.physics.arcade.enable(this);
    this.body.allowGravity = false;
};

zelda.soldier_prefab.prototype = Object.create(Phaser.Sprite.prototype);
zelda.soldier_prefab.constructor = zelda.soldier_prefab;

zelda.soldier_prefab.prototype.update = function()
{
    this.game.physics.arcade.collide(this,this.level.walls);
    this.game.physics.arcade.collide(this,this.level.hero,this.hitHero,null,this);
};

zelda.soldier_prefab.prototype.hitHero = function(_enemy,_hero)
{ if(gameOptions.Attacking){
        this.kill();
        _hero.body.velocity.y=-gameOptions.heroJump;
    }else{
        /*
        this.level.camera.shake(0.05,500);
        _hero.health--;
        this.level.hud_energy.frame =_hero.health;
        _hero.reset(65,100);
        */
        //this.level.hitHero();
    }
};