(function(){
  var Game = {
    version: '1.0'
  };

  Game.Base = {
    bgcolor: 0x66FF99,
    width: 1200,
    height: 600,
    interactive: false,
    stats: new Stats(),
    renderer: undefined,
    stage: undefined,
    background: null,
    loadStats: function(){
      var self = Game.Base;
      self.stats.setMode(0);
      self.stats.domElement.style.position = 'absolute';
      self.stats.domElement.style.left = self.renderer.view.offsetLeft - 80 + 'px';
      self.stats.domElement.style.top = self.renderer.view.offsetTop + 'px';
      document.body.appendChild(self.stats.domElement);
    },
    initScore: function(){
      var self = Game.Base;
      self.score = document.getElementById('scorevalue');
      score = document.getElementById('score');
      score.style.left = self.renderer.view.offsetLeft - 80 + 'px';
    },
    init: function(){
      var self = Game.Base;
      self.stage = new PIXI.Stage(self.bgcolor, self.interactive);
      self.renderer = PIXI.autoDetectRenderer(self.width, self.height);
      document.body.appendChild(self.renderer.view);

      self.loadBackround();
      self.loadStats();
      self.initScore();
      Game.Actors.init();
      Game.events();

      requestAnimFrame(self.animate);
    },
    animate: function(){
      var self = Game.Base;
      self.stats.begin();

      self.renderBackground();
      Game.Logic.run();
      self.renderer.render(self.stage);
      requestAnimFrame(self.animate);

      self.stats.end();
    },
    loadBackround: function(){
      var self = Game.Base;
      var resources = Game.Resources;
      var backgroundTexture = resources.textures.background;
      // for some reason the image has to be square and 1024x1024 for it to work in FF
      self.background = new PIXI.TilingSprite(backgroundTexture, 1200, 600, true);
      self.stage.addChild(self.background);
    },
    renderBackground: function(){
      var self = Game.Base;
      var speed = 0.5;
      self.background.tilePosition.x -= speed;
    }
  };

  Game.Logic = {
    score: 0,
    gameover: false,
    getRandomInt: function(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    },
    checkCollision:function(obj1, obj2){
      var o1x = obj1.position.x - (obj1.width / 2);
      var o1y = obj1.position.y - (obj1.height / 2);
      var o2x = obj2.position.x - (obj2.width / 2);
      var o2y = obj2.position.y - (obj2.height / 2);
      return (o1x + obj1.width) >= o2x && o1x <= (o2x + obj2.width) &&
        (o1y + obj1.height) >= o2y && o1y <= (o2y + obj2.height);
    },
    renderPowerups: function(){
      var self = Game.Logic;
      var ship = Game.Actors.ship;
      var powerups = Game.Actors.powerups;
      var renderer = Game.Base.renderer;
      var stage = Game.Base.stage;

      if((ship.powerups.length < 1 && powerups.length < 1) && (self.score % 500) === 0){
        var newPowerup = new Game.SpreadPowerUp(renderer.width/2, 0);
        newPowerup.speed.y = 1;
        stage.addChild(newPowerup);
        powerups.push(newPowerup);
      }

      for(var i=0; i<powerups.length;i++){
        var powerup = powerups[i];
        if(self.checkCollision(ship, powerup)){
          powerup.start = Date.now();
          ship.powerups.push(powerup);
          powerups.splice(i, 1);
          stage.removeChild(powerup);
          i--;
        }else if(powerup.position.y > (renderer.height + powerup.height)){
          stage.removeChild(powerup);
          powerups.splice(i, 1);
          i--;
        }else{
          powerup.render();
        }
      }
    },
    renderBullets: function(){
      var bullets = Game.Actors.bullets;
      var stage = Game.Base.stage;
      for(var i = 0; i < bullets.length; i++){
        var bullet = bullets[i];
        if(bullet.visible){
          bullet.render();
        }else{
          bullets.splice(i, 1);
          stage.removeChild(bullet);
          i--;
        }
      }
    },
    spawnEnemies: function(){
      var self = Game.Logic;
      var enemies = Game.Actors.enemies;
      var renderer = Game.Base.renderer;

      if(enemies.length < 30) {
        var xPos = self.getRandomInt(renderer.width, renderer.width + 500);
        var yPos = self.getRandomInt(0, renderer.height);
        var newEnemy = new Game.Enemy(xPos, yPos);
        newEnemy.speed.x = (self.score/500);
        (function(){
          var isColliding = false;
          for(var x = 0; x < enemies.length; x++){
            var enemy = enemies[x];
            if(enemy && self.checkCollision(newEnemy, enemy)){
              isColliding = true;
              break;
            }
          }
          if(!isColliding){
            enemies.push(newEnemy);
            Game.Base.stage.addChild(newEnemy);
          }
        })();
      }
    },
    renderEnemies: function(){
      var stage = Game.Base.stage;
      var enemies = Game.Actors.enemies;

      for(var x = 0; x < enemies.length; x++){
        var enemy = enemies[x];
        if(enemy.visible) {
          enemy.render();
        }else{
          enemies.splice(x, 1);
          stage.removeChild(enemy);
          x--;
        }
      }
    },
    run: function(){
      var self = Game.Logic;
      if(!self.gameover){
        self.spawnEnemies();
        self.renderEnemies();
        Game.Actors.ship.render();
        self.renderBullets();
        self.renderPowerups();
      } else {
        alert("GAME OVER! You made it to "+ self.score +" points");
        location.reload(false);
      }
    }
  };

  Game.Resources = {
    textures: {
      bullet: new PIXI.Texture.fromImage('img/beam.png'),
      ship: new PIXI.Texture.fromImage('img/ship.png'),
      enemy: new PIXI.Texture.fromImage('img/enemy.png'),
      square: new PIXI.Texture.fromImage('img/square.png'),
      spread: new PIXI.Texture.fromImage('img/spread.png'),
      background: new PIXI.Texture.fromImage('img/background.png')
    }
  };


  Game.Ship = function(){
    PIXI.Sprite.call(this, Game.Resources.textures.ship);
    this.anchor.x = 0.5;
    this.anchor.y = 0.5;
    this.position.x = Game.Base.renderer.width / 2;
    this.position.y = Game.Base.renderer.height / 2;
    this.shooting = false;
    this.lastshot = undefined;
    this.speed = {
      x: 0,
      y: 0
    };
  };
  Game.Ship.prototype = Object.create(PIXI.Sprite.prototype);
  Game.Ship.prototype.constructor = Game.Ship;


  Game.Player = function(){
    Game.Ship.call(this);
    this.powerups = [];
    this.now = undefined;
    this.then = Date.now();
    this.firingInterval = 1000/15;
    this.firingDelta = undefined;
    this.shoot = function(){
      if(this.shooting){
        this.now = Date.now();
        this.firingDelta = this.now - this.then;
        if(this.firingDelta > this.firingInterval){
          this.then = this.now;
          if(this.powerups.length >= 1) {
            this.shootPowerup();
          }else {
            this.shootNormal();
          }
        }
    };
    this.shootNormal = function(){
        var xPos = this.position.x + this.width / 2;
        var yPos = this.position.y;
        var bullet = new Game.Bullet(xPos, yPos);
        bullet.speed.x = 6;
        Game.Actors.bullets.push(bullet);
        Game.Base.stage.addChild(bullet);
      }
    };
    this.shootPowerup = function(){
      for(var i = 0;i < this.powerups.length; i++) {
        var powerup = this.powerups[i];
        if(powerup.active()){
          var xPos = this.position.x + this.width / 2;
          var yPos = this.position.y;
          powerup.use(xPos, yPos);
        }else if(powerup.expired) {
          this.powerups.splice(i, 1);
          i--;
        }
      }
    };
    this.render = function(){
      this.shoot();
    };
  };
  Game.Player.prototype = Object.create(Game.Ship.prototype);
  Game.Player.prototype.constructor = Game.Player;


  Game.Enemy = function(posX, posY){
    PIXI.Sprite.call(this, Game.Resources.textures.enemy);
    this.anchor.x = 0.5;
    this.anchor.y = 0.5;
    this.position.x = posX || Game.Base.renderer.width;
    this.position.y = posY || Game.Base.renderer.height / 2;
    this.speed = {
      x: 0,
      y: 0
    },
    this.render = function(){
      var ship = Game.Actors.ship;
      if(Game.Logic.checkCollision(this, ship)){
        Game.Logic.gameover = true;
      }else if(this.position.x > -this.width){ // outside left screen edge when true
        this.position.x -= this.speed.x + 1;
      }else{
        this.visible = false;
        Game.Logic.gameover = true;
      }
    };
  };
  Game.Enemy.prototype = Object.create(PIXI.Sprite.prototype);
  Game.Enemy.prototype.constructor = Game.Enemy;


  Game.Bullet = function(posX, posY, rotation){
    PIXI.Sprite.call(this, Game.Resources.textures.bullet);
    this.anchor.x = 0.5;
    this.anchor.y = 0.5;
    this.position.x = posX;
    this.position.y = posY;
    this.rotation = rotation || 0;
    this.speed = {
      x: 0,
      y: 0
    };
    this.inViewport = function(){
      var renderer = Game.Base.renderer;
      return !((this.position.x > (renderer.width + this.width)) ||
              (this.position.y > (renderer.height + this.width)) ||
              (this.position.y < (-this.width)));
    };
    this.render = function(){
      var enemies = Game.Actors.enemies;
      if(!this.inViewport()){
        this.visble = false;
      }else {
        for(var x = 0; x < enemies.length; x++){
          var enemy = enemies[x];
          if(Game.Logic.checkCollision(this, enemy)){
            enemy.visible = false;
            this.visible = false;
            var currentScore = parseInt(Game.Base.score.innerHTML, 10);
            currentScore += 10;
            Game.Logic.score = currentScore;
            Game.Base.score.innerHTML = currentScore;
          }
        }
      }
      this.position.x += this.speed.x;
      this.position.y += this.speed.y;
    };
  };
  Game.Bullet.prototype = Object.create(PIXI.Sprite.prototype);
  Game.Bullet.prototype.constructor = Game.Bullet;


  Game.PowerUp = function(posX, posY, texture){
    PIXI.Sprite.call(this, texture);
    this.anchor.x = 0.5;
    this.anchor.y = 0.5;
    this.position.x = posX;
    this.position.y = posY;
    this.start = undefined;
    this.expired = false;
    this.duration = 5000;
    this.speed = {
      x: 0,
      y: 0
    };
    this.active = function(){
      if(this.start !== undefined){
        var now = Date.now();
        if((now - this.start) < this.duration){
          return true;
        } else if((now - this.start) > this.duration){
          this.expired = true;
        }
      }
      return false;
    };
    this.render = function(){
      this.position.y += this.speed.y;
    };
    this.use = function(xPos, yPos){};
  };
  Game.PowerUp.prototype = Object.create(PIXI.Sprite.prototype);
  Game.PowerUp.prototype.constructor = Game.PowerUp;


  Game.SpreadPowerUp = function(posX, posY){
    Game.PowerUp.call(this, posX, posY, Game.Resources.textures.spread);
    this.use = function(xPos, yPos){
      var topBullet = new Game.Bullet(xPos, yPos, -0.15);
      topBullet.speed.x = 6;
      topBullet.speed.y = -3;
      Game.Actors.bullets.push(topBullet);
      Game.Base.stage.addChild(topBullet);

      var midBullet = new Game.Bullet(xPos, yPos);
      midBullet.speed.x = 6;
      Game.Actors.bullets.push(midBullet);
      Game.Base.stage.addChild(midBullet);

      var botBullet = new Game.Bullet(xPos, yPos, 0.15);
      botBullet.speed.x = 6;
      botBullet.speed.y = 3;
      Game.Actors.bullets.push(botBullet);
      Game.Base.stage.addChild(botBullet);
    };
  };
  Game.SpreadPowerUp.prototype = Object.create(PIXI.Sprite.prototype);
  Game.SpreadPowerUp.prototype.constructor = Game.SpreadPowerUp;


  Game.Actors = {
    bullets: [],
    enemies: [],
    powerups: [],
    ship: undefined,
    init: function(){
      var self = Game.Actors;
      self.ship = new Game.Player();
      Game.Base.stage.addChild(self.ship);
    }
  };

  Game.events = function(){
    var renderer = Game.Base.renderer;
    var ship = Game.Actors.ship;
    renderer.view.onmousemove = function(evt){
      ship.position.x = evt.clientX - renderer.view.offsetLeft;
      ship.position.y = evt.clientY - renderer.view.offsetTop;
    };
    renderer.view.ontouchmove = function(evt){
      ship.position.x = evt.clientX - renderer.view.offsetLeft;
      ship.position.y = evt.clientY - renderer.view.offsetTop;
    };

    renderer.view.onmousedown = function(evt){
      ship.shooting = true;
    };
    renderer.view.ontouchstart = function(evt){
      ship.shooting = true;
    };

    renderer.view.onmouseup = function(evt){
      ship.shooting = false;
    };
    renderer.view.ontouchend = function(evt){
      ship.shooting = false;
    };

    // hide text select cursor (beam)
    renderer.view.onselectstart = function(evt) {
      return false;
    };
  };
  if(window.Game === undefined){ window.Game = Game; }
  Game.Base.init(0x66FF99);

})();
