'use strict';


var KEYCODE_LEFT = 37;
var KEYCODE_RIGHT = 39;
var KEYCODE_UP = 38;
var KEYCODE_DOWN = 40;
var KEYCODE_X = 88;
var KEYCODE_Z = 90;
var KEYCODE_M = 77;
var KEYCODE_N = 78;


var init = function() {
  var canvas = document.getElementById('game');
  var stage = new createjs.Stage(canvas);

  var left = new Fighter({
    x: 300,
    orientation: -1,
    color: 'Blue'
  });
  var right = new Fighter({
    x: 500,
    orientation: 1,
    color: 'Red'
  });

  var keyPressed = function(event) {
    switch (event.keyCode) {
      case KEYCODE_Z:
        left.jump();
        break;
      case KEYCODE_X:
        left.kick();
        break;
      case KEYCODE_N:
        right.jump();
        break;
      case KEYCODE_M:
        right.kick();
        break;
    }
    stage.update();
  };
  document.onkeydown = keyPressed;

  var tick = function() {
    stage.update();
  };
  createjs.Ticker.addEventListener('tick', tick);

  stage.addChild(left.circle);
  stage.addChild(right.circle);

  createjs.Ticker.setFPS(60);
  createjs.Ticker.addEventListener('tick', stage);

  stage.update();
};
