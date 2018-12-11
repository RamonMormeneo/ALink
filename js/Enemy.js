var platformer = platformer || {};

platformer.enemy = function(game,x,y,radius,speed,level){
 Phaser.Sprite.call(this,game,x,y,'enemy');
 this.anchor.setTo(.5);
 this.animations.add('walkD',[0,1],10,true);
 this.animations.add('walkR',[4,5],10,true);
 this.animations.add('walkL',[8,9],10,true);
 this.animations.add('walkD',[12,13],10,true);
 this.radius=500;
 this.speed = speed;
 this.game.physics.arcade.enable(this);
};

platformer.enemy.prototype = Object.create(Phaser.Sprite.prototype);
platformer.enemy.prototype.constructor = platformer.Enemy;

platformer.jumper_prefab.prototype.update = function(){
    this.game.physics.arcade.collide(this,this.level.hero,this.hitHero,null,this);
};
platformer.jumper_prefab.prototype.hitHero = function(_enemy,_hero){
    if(_enemy.body.touching.up && _hero.body.touching.down){
        this.kill();
    }else{
        /*
        this.level.camera.shake(0.05,500);
        _hero.health--;
        this.level.hud_energy.frame =_hero.health;
        _hero.reset(65,100);
        */
        this.level.hitHero();
    }
};
