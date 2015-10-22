'use strict';

var FLOOR_Y = 500;

var Fighter = function(opts) {
  opts = opts || {};
  this.circle = new createjs.Shape();
  this.color = opts.color || 'DeepSkyBlue';
  this.circle.graphics.beginFill(this.color).drawCircle(0, 0, 50);
  this.circle.x = opts.x || 400;
  this.circle.y = FLOOR_Y;
  
  this.jumpHeight = opts.jumpHeight || 150;
  this.jumpDX = opts.jumpDX || 30;
  this.orientation = opts.orientation || -1;
  
  this.jumping = false;
  this.kicking = false;
};


Fighter.prototype.jumpComplete = function() {
  this.jumping = false;
};

Fighter.prototype.jump = function() {
  if (this.jumping) {
    return;
  }
  this.jumping = true;
  createjs.Tween
    .get(this.circle, {
      override: true
    })
    .to({
      x: this.circle.x + this.orientation * this.jumpDX / 2,
      y: this.circle.y - this.jumpHeight
    }, 300, createjs.Ease.quadOut)
    .to({
      x: this.circle.x + this.orientation * this.jumpDX,
      y: this.circle.y
    }, 300, createjs.Ease.quadIn)
    .call(this.jumpComplete.bind(this));
};


Fighter.prototype.kickComplete = function() {
  this.kicking = false;
  this.jumping = false;
};

Fighter.prototype.kick = function() {
  if (!this.jumping || this.kicking) {
    return;
  }

  createjs.Tween
    .get(this.circle, {
      override: true
    })
    .to({
      x: this.circle.x + this.orientation * (this.circle.y - FLOOR_Y),
      y: FLOOR_Y
    }, 300, createjs.Ease.quadOut)
    .call(this.kickComplete.bind(this));

};
Fighter.prototype.init = function() {};
