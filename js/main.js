'use strict';


var KEYCODE_LEFT = 37;
var KEYCODE_RIGHT = 39;
var KEYCODE_UP = 38;
var KEYCODE_DOWN = 40;
var KEYCODE_X = 88;
var KEYCODE_Z = 90;


var FLOOR_Y = 500;
var jumpHeight = 150;
var jumpDX = 30;


var init = function() {
  var canvas = document.getElementById('game');
  var stage = new createjs.Stage(canvas);

  var circle;
  var jumping = false;
  var kicking = false;

  var jumpComplete = function() {
    jumping = false;
  };
  var jump = function() {
    if (jumping) {
      return;
    }
    jumping = true;
    createjs.Tween
      .get(circle, {
        override: true
      })
      .to({
        x: circle.x + jumpDX / 2,
        y: circle.y - jumpHeight
      }, 300, createjs.Ease.quadOut)
      .to({
        x: circle.x + jumpDX,
        y: circle.y
      }, 300, createjs.Ease.quadIn)
      .call(jumpComplete);
  };


  var kickComplete = function() {
    kicking = false;
    jumping = false;
  };

  var kick = function() {
    if (!jumping || kicking) {
      return;
    }
    
    createjs.Tween
      .get(circle, {
        override: true
      })
      .to({
        x: circle.x + circle.y - FLOOR_Y,
        y: FLOOR_Y
      }, 300, createjs.Ease.quadOut)
      .call(kickComplete);

  };

  var keyPressed = function(event) {
    switch (event.keyCode) {
      case KEYCODE_Z:
        jump();
        break;
      case KEYCODE_X:
        kick();
        break;
    }
    stage.update();
  };


  var tick = function() {
    stage.update();
  };
  createjs.Ticker.addEventListener('tick', tick);

  circle = new createjs.Shape();
  circle.graphics.beginFill('DeepSkyBlue').drawCircle(0, 0, 50);
  circle.x = 400;
  circle.y = FLOOR_Y;
  stage.addChild(circle);

  createjs.Ticker.setFPS(60);
  createjs.Ticker.addEventListener('tick', stage);

  document.onkeydown = keyPressed;
  stage.update();
  console.log('init');
};
