var Enem = Enem || {};

Enem.Soldier = function(game,x,y,level)
{
    Phaser.Sprite.call(this,game,x,y,'soldier');
    this.anchor.setTo(.5);
    this.game.physics.arcade.enable(this);
};

Soldier.prototype = Object.create(Phaser.Spirit.prototype);
Soldier.construct = Soldier;