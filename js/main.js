(function(){
  var Game = {
    version: '1.0'
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

  Game.Scene = function(bgcolor, interactive){
    PIXI.Stage.call(this, bgcolor, interactive);
    this.render = function(){};
  };
  Game.Scene.prototype = Object.create(PIXI.Stage.prototype);
  Game.Scene.prototype.constructor = Game.Scene;

  Game.MainScene = function(bgcolor, interactive){
    PIXI.Stage.call(this, bgcolor, interactive);
    this.bullets = [];
    this.enemies = [];
    this.powerups = [];
    this.ship = undefined;
    this.background = undefined;
    this.loadBackround = function(){
      var textures = Game.Resources.textures;
      this.background = new PIXI.TilingSprite(textures.background, 2048, 2048, true);
      this.addChild(this.background);
    };
    this.renderBackground = function(){
      var speed = 0.5;
      this.background.tilePosition.x -= speed;
    };
    this.renderPowerups = function(){
      var renderer = Game.Base.renderer;
      if((this.ship.powerups.length < 1 && this.powerups.length < 1) && (this.ship.score % 500) === 0){
        var newPowerup = new Game.SpreadPowerUp(renderer.width/2, 0);
        newPowerup.speed.y = 1;
        this.addChild(newPowerup);
        this.powerups.push(newPowerup);
      }
      for(var i=0; i<this.powerups.length;i++){
        var powerup = this.powerups[i];
        if(Game.Logic.checkCollision(this.ship, powerup)){
          powerup.start = Date.now();
          this.ship.powerups.push(powerup);
          this.powerups.splice(i, 1);
          this.removeChild(powerup);
          i--;
        }else if(powerup.position.y > (renderer.height + powerup.height)){
          this.removeChild(powerup);
          this.powerups.splice(i, 1);
          i--;
        }else{
          powerup.render();
        }
      }
    };
    this.renderBullets = function(){
      for(var i = 0; i < this.bullets.length; i++){
        var bullet = this.bullets[i];
        if(bullet.visible){
          bullet.render();
        }else{
          this.bullets.splice(i, 1);
          this.removeChild(bullet);
          i--;
        }
      }
    };
    this.spawnEnemies = function(){
      var renderer = Game.Base.renderer;

      if(this.enemies.length < 30) {
        var xPos = Game.Logic.getRandomInt(renderer.width, renderer.width + 500);
        var yPos = Game.Logic.getRandomInt(0, renderer.height);
        var newEnemy = new Game.Enemy(xPos, yPos);
        newEnemy.speed.x = (this.ship.score/500);
        var isColliding = false;
        for(var x = 0; x < this.enemies.length; x++){
          var enemy = this.enemies[x];
          if(enemy && Game.Logic.checkCollision(newEnemy, enemy)){
            isColliding = true;
            break;
          }
        }
        if(!isColliding){
          this.enemies.push(newEnemy);
          this.addChild(newEnemy);
        }
      }
    };
    this.renderEnemies = function(){
      for(var x = 0; x < this.enemies.length; x++){
        var enemy = this.enemies[x];
        if(enemy.visible) {
          enemy.render();
        }else{
          this.enemies.splice(x, 1);
          this.removeChild(enemy);
          x--;
        }
      }
    };
    this.render = function(){
      if(!Game.Base.gameover){
        this.renderBackground();
        this.spawnEnemies();
        this.renderEnemies();
        this.ship.render();
        this.renderBullets();
        this.renderPowerups();
      } else {
        alert("GAME OVER! You made it to "+ this.ship.score +" points");
        location.reload(false);
      }
    };
    this.initPlayer = function(){
      this.ship = new Game.Player();
      this.addChild(this.ship);
    }
    this.init = function(){
      this.loadBackround();
      this.initPlayer();
    };
    this.init();
  };
  Game.MainScene.prototype = Object.create(Game.Scene.prototype);
  Game.MainScene.prototype.constructor = Game.MainScene;


  Game.Scenes = {
    current: '',
    menu: undefined,
    main: Game.MainScene,
    gameover: undefined,
    switchTo: function(name){
      if (this.current !== '') {
        delete this.current;
      }
      this.current = name;
      return new this[name]();
    }
  };

  Game.Base = {
    bgcolor: 0x66FF99,
    width: jQuery(window).width() * 0.75,
    height: jQuery(window).height() * 0.85,
    stats: new Stats(),
    renderer: undefined,
    stage: undefined,
    scene: 'main',
    score: undefined,
    gameover: false,
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
      self.renderer = PIXI.autoDetectRenderer(self.width, self.height);
      document.body.appendChild(self.renderer.view);

      self.stage = Game.Scenes.switchTo(self.scene);

      self.loadStats();
      self.initScore();
      Game.events();

      requestAnimFrame(self.animate);
    },
    animate: function(){
      var self = Game.Base;
      self.stats.begin();

      self.stage.render();
      self.renderer.render(self.stage);

      requestAnimFrame(self.animate);

      self.stats.end();
    },

  };

  Game.Logic = {
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
    this.score = 0;
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
        Game.Base.stage.bullets.push(bullet);
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
      var ship = Game.Base.stage.ship;
      if(Game.Logic.checkCollision(this, ship)){
        Game.Base.gameover = true;
      }else if(this.position.x > -this.width){ // outside left screen edge when true
        this.position.x -= this.speed.x + 1;
      }else{
        this.visible = false;
        Game.Base.gameover = true;
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
      var stage = Game.Base.stage;
      var enemies = stage.enemies;
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
            stage.ship.score = currentScore;
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
      Game.Base.stage.bullets.push(topBullet);
      Game.Base.stage.addChild(topBullet);

      var midBullet = new Game.Bullet(xPos, yPos);
      midBullet.speed.x = 6;
      Game.Base.stage.bullets.push(midBullet);
      Game.Base.stage.addChild(midBullet);

      var botBullet = new Game.Bullet(xPos, yPos, 0.15);
      botBullet.speed.x = 6;
      botBullet.speed.y = 3;
      Game.Base.stage.bullets.push(botBullet);
      Game.Base.stage.addChild(botBullet);
    };
  };
  Game.SpreadPowerUp.prototype = Object.create(PIXI.Sprite.prototype);
  Game.SpreadPowerUp.prototype.constructor = Game.SpreadPowerUp;



  Game.events = function(){
    var renderer = Game.Base.renderer;
    var ship = Game.Base.stage.ship;
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
  Game.Base.init();

})();
