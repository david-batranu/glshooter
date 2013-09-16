(function(){
  var Game = {
    version: '1.0'
  };

  Game.Levels = {
    1: [
      ['S', 'S', 'S', 'S', 'S', 'S', 'S', 'S', 'E', 'S', 'S', 'S', 'S', 'S', 'S', 'S', 'S'],
      ['S', 'E', 'S', 'S', 'S', 'S', 'S', 'E', 'E', 'E', 'S', 'S', 'S', 'S', 'S', 'E', 'S'],
      ['S', 'S', 'E', 'S', 'S', 'S', 'E', 'E', 'S', 'E', 'E', 'S', 'S', 'S', 'E', 'S', 'S'],
      ['S', 'S', 'S', 'E', 'S', 'S', 'S', 'E', 'E', 'E', 'S', 'S', 'S', 'E', 'S', 'S', 'S'],
      ['S', 'S', 'S', 'S', 'E', 'S', 'S', 'S', 'S', 'S', 'S', 'S', 'E', 'S', 'S', 'S', 'S'],
      ['S', 'S', 'S', 'S', 'S', 'E', 'S', 'S', 'S', 'S', 'S', 'E', 'S', 'S', 'S', 'S', 'S'],
      ['S', 'S', 'S', 'S', 'S', 'S', 'E', 'S', 'S', 'S', 'E', 'S', 'S', 'S', 'S', 'S', 'S'],
      ['S', 'S', 'S', 'S', 'S', 'S', 'S', 'E', 'S', 'E', 'S', 'S', 'S', 'S', 'S', 'S', 'S'],
      ['S', 'S', 'S', 'S', 'S', 'S', 'S', 'S', 'E', 'S', 'S', 'S', 'S', 'S', 'S', 'S', 'S'],
      ['S', 'S', 'S', 'S', 'S', 'S', 'S', 'E', 'S', 'E', 'S', 'S', 'S', 'S', 'S', 'S', 'S'],
      ['S', 'S', 'S', 'S', 'S', 'S', 'E', 'S', 'S', 'S', 'E', 'S', 'S', 'S', 'S', 'S', 'S'],
      ['S', 'S', 'S', 'S', 'S', 'E', 'S', 'S', 'S', 'S', 'S', 'E', 'S', 'S', 'S', 'S', 'S'],
      ['S', 'S', 'S', 'S', 'E', 'S', 'S', 'S', 'S', 'S', 'S', 'S', 'E', 'S', 'S', 'S', 'S'],
      ['S', 'S', 'S', 'E', 'S', 'S', 'S', 'S', 'S', 'S', 'S', 'S', 'S', 'E', 'S', 'S', 'S'],
      ['S', 'S', 'E', 'S', 'S', 'S', 'S', 'S', 'S', 'S', 'S', 'S', 'S', 'S', 'E', 'S', 'S']
    ],
    2: [
      ['S', 'S', 'S', 'S', 'S', 'S', 'S', 'S', 'E', 'S', 'S', 'S', 'S', 'S', 'S', 'S', 'S'],
      ['S', 'E', 'S', 'S', 'S', 'S', 'S', 'E', 'S', 'E', 'S', 'S', 'S', 'S', 'S', 'E', 'S'],
      ['E', 'S', 'E', 'S', 'E', 'S', 'E', 'S', 'E', 'S', 'E', 'S', 'E', 'S', 'E', 'S', 'E'],
      ['S', 'E', 'S', 'S', 'E', 'S', 'S', 'E', 'S', 'E', 'S', 'S', 'E', 'S', 'S', 'E', 'S'],
      ['S', 'S', 'S', 'S', 'E', 'S', 'S', 'S', 'E', 'S', 'S', 'S', 'E', 'S', 'S', 'S', 'S'],
      ['S', 'S', 'S', 'S', 'S', 'S', 'S', 'S', 'E', 'S', 'S', 'S', 'S', 'S', 'S', 'S', 'S'],
      ['S', 'E', 'S', 'S', 'S', 'S', 'S', 'S', 'E', 'S', 'S', 'S', 'S', 'S', 'S', 'E', 'S'],
      ['S', 'S', 'E', 'S', 'S', 'S', 'S', 'S', 'S', 'S', 'S', 'S', 'S', 'S', 'E', 'S', 'S'],
      ['S', 'S', 'S', 'E', 'S', 'S', 'S', 'S', 'S', 'S', 'S', 'S', 'S', 'E', 'S', 'S', 'S'],
      ['S', 'E', 'S', 'S', 'E', 'S', 'S', 'S', 'S', 'S', 'S', 'S', 'E', 'S', 'S', 'E', 'S'],
      ['E', 'S', 'E', 'S', 'S', 'E', 'E', 'E', 'E', 'E', 'E', 'E', 'S', 'S', 'E', 'S', 'E'],
      ['E', 'E', 'E', 'S', 'S', 'S', 'S', 'S', 'S', 'S', 'S', 'S', 'S', 'S', 'E', 'E', 'E'],
      ['E', 'S', 'E', 'S', 'S', 'S', 'S', 'S', 'S', 'S', 'S', 'S', 'S', 'S', 'E', 'S', 'E'],
      ['S', 'E', 'S', 'S', 'S', 'S', 'S', 'E', 'E', 'E', 'S', 'S', 'S', 'S', 'S', 'E', 'S'],
      ['S', 'E', 'S', 'S', 'S', 'S', 'S', 'S', 'S', 'S', 'S', 'S', 'S', 'S', 'S', 'E', 'S'],
    ]
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
    Game.Scene.call(this, bgcolor, interactive);
    this.bullets = [];
    this.enemies = [];
    this.powerups = [];
    this.level = 1;
    this.ship = undefined;
    this.background = undefined;
    this.loadBackround = function(){
      var textures = Game.Resources.textures;
      this.background = new PIXI.TilingSprite(textures.background, 1200, 600, true);
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
    this.lastEnemyPos = new PIXI.Point(Game.Base.width, 0);
    this.spawnEnemies = function(){
      var renderer = Game.Base.renderer;

      if(this.enemies.length > 0){ return };

      for(var cidx = 0; cidx < Game.Levels[this.level].length; cidx++) {
        var row = Game.Levels[this.level][cidx];
        for(var idx = 0; idx < row.length; idx++){
          var item = row[idx];
          var xPos = Game.Base.width + ((cidx + 1) * Game.Resources.textures.enemy.width);
          var yPos = ((idx + 1) * Game.Resources.textures.enemy.height);
          if (item == 'E') {
            var newEnemy = new Game.Enemy(xPos, yPos);

            this.enemies.push(newEnemy);
            this.addChild(newEnemy);
          }
          this.lastEnemyPos = new PIXI.Point(xPos, yPos);
        }
      };
      if (Game.Levels[this.level + 1]) {
        this.level++;
      }else { this.level = 1 }
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
      this.renderBackground();
      this.spawnEnemies();
      this.renderEnemies();
      this.ship.render();
      this.renderBullets();
      this.renderPowerups();
    };
    this.events = {
      onmousemove: function(evt){
        this.ship.position.x = evt.clientX - Game.Base.renderer.view.offsetLeft;
        this.ship.position.y = evt.clientY - Game.Base.renderer.view.offsetTop;
      },
      ontouchmove: function(evt){
        this.ship.position.x = evt.clientX - Game.Base.renderer.view.offsetLeft;
        this.ship.position.y = evt.clientY - Game.Base.renderer.view.offsetTop;
      },
      onmousedown: function(evt){
        this.ship.shooting = true;
      },
      ontouchstart: function(evt){
        this.ship.shooting = true;
      },
      onmouseup: function(evt){
        this.ship.shooting = false;
      },
      ontouchend: function(evt){
        this.ship.shooting = false;
      },
      onselectstart: function(evt) {
        // hide text select cursor (beam)
        return false;
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


  Game.GameOverScene = function(){
    Game.Scene.call(this, 0x242424);
    this.text = '';
    this.init = function(){
      var renderer = Game.Base.renderer;
      var text = '! GAME OVER !\n\n You made it to ' + Game.Base.score.innerHTML + ' points!';
      text = text + '\n\n\n\n Click to try again!'
      var textDisplay = new PIXI.Text(text, {align: 'center', fill: 'white'});
      textDisplay.anchor.x = 0.5;
      textDisplay.anchor.y = 0.5;
      textDisplay.position.x = renderer.width / 2;
      textDisplay.position.y = renderer.height / 3;
      this.text = text;
      this.addChild(textDisplay);
    };
    this.render = function(){};
    this.events = {
      onmousedown: function(evt){
        Game.Base.score.innerHTML = 0;
        Game.Base.sceneName = 'main';
        Game.Base.gameover = false;
        Game.Base.scene = Game.Scenes.switchTo('main');
        Game.events();
      },
      onmousemove: function(){},
      ontouchmove: function(){},
      ontouchstart: function(){},
      onmouseup: function(){},
      ontouchend: function(){},
      onselectstart: function(){return true}
    };
    this.init()
  };
  Game.GameOverScene.prototype = Object.create(Game.Scene.prototype);
  Game.GameOverScene.prototype.constructor = Game.GameOverScene;


  Game.Scenes = {
    current: '',
    menu: undefined,
    main: Game.MainScene,
    gameover: Game.GameOverScene,
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
    scale: 1,
    maxWidth: 1200,
    maxHeight: 600,
    width: 0,
    height: 0,
    stats: new Stats(),
    renderer: undefined,
    scene: undefined,
    sceneName: 'main',
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
    setDimensions: function(){
      var self = Game.Base;
      var wwidth = jQuery(window).width() * 0.75;
      var wheight = jQuery(window).height() * 0.85;
      if (wwidth < self.maxWidth) {
        self.width = wwidth;
      } else {self.width = self.maxWidth};
      if (wheight < self.maxHeight) {
        self.height = wheight;
      } else {self.height = self.maxHeight};
      self.scale = Math.min(self.width / self.maxWidth, self.height / self.maxHeight);
    },
    updateDimensions: function(){
      var self = Game.Base;
      self.setDimensions();
      try {
        self.renderer.resize(self.width, self.height);
      } catch(e) {
        self.renderer.width = self.width;
        self.renderer.height = self.height;
      }
    },
    init: function(){
      var self = Game.Base;
      self.setDimensions();
      self.renderer = PIXI.autoDetectRenderer(self.width, self.height);
      document.body.appendChild(self.renderer.view);

      self.scene = Game.Scenes.switchTo(self.sceneName);

      Game.events();

      self.loadStats();
      self.initScore();

      requestAnimFrame(self.animate);
    },
    animate: function(){
      var self = Game.Base;
      self.stats.begin();

      jQuery(self.renderer.view).removeClass();
      jQuery(self.renderer.view).addClass(self.sceneName);

      if (self.sceneName === 'main' && self.gameover === true) {
        self.sceneName = 'gameover';
        self.scene = Game.Scenes.switchTo(self.sceneName);
        Game.events();
      }

      self.scene.render();
      self.renderer.render(self.scene);

      requestAnimFrame(self.animate);

      self.stats.end();
    },

  };

  Game.GlobalSprite = function(){
    this.scale = new PIXI.Point(Game.Base.scale, Game.Base.scale);
    this.anchor.x = 0.5;
    this.anchor.y = 0.5;
    this.inViewport = function(){
      var renderer = Game.Base.renderer;
      return !((this.position.x > (renderer.width + this.width)) ||
              (this.position.y > (renderer.height + this.width)) ||
              (this.position.y < (-this.width)));
    };
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
    Game.GlobalSprite.call(this);

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
        Game.Base.scene.bullets.push(bullet);
        Game.Base.scene.addChild(bullet);
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
    Game.GlobalSprite.call(this);
    this.position.x = posX || Game.Base.renderer.width;
    this.position.y = posY || Game.Base.renderer.height / 2;
    this.speed = {
      x: 0,
      y: 0
    };
    this.die = function(){
      var movie = new PIXI.MovieClip(this.animationData.death.sequence);
      movie.anchor.x = 0.5;
      movie.anchor.y = 0.5;
      movie.scale = this.scale;
      movie.position.x = this.position.x;
      movie.position.y = this.position.y;
      Game.Base.scene.addChild(movie);
      movie.onComplete = function(){
        this.visible = false;
      };
      movie.animationSpeed = 0.2;
      movie.loop = false;
      movie.play();
      this.visible = false;
    };
    this.render = function(){
      var ship = Game.Base.scene.ship;
      if(Game.Logic.checkCollision(this, ship)){
        Game.Base.gameover = true;
      }else if(this.position.x > -this.width){ // outside left screen edge when true
        this.speed.x = ship.score / 500;
        this.position.x -= this.speed.x + 1;
      }else{
        this.visible = false;
        Game.Base.gameover = true;
      }
    };
  };
  Game.Enemy.prototype = Object.create(PIXI.Sprite.prototype);
  Game.Enemy.prototype.constructor = Game.Enemy;
  Game.Enemy.prototype.animationData = {
    death: {
      sequence: [],
      movie: undefined
    }
  };
  Game.Enemy.prototype.loadAnimation = function(imageList){
    var mediaSequence = []
    for(var textureId in imageList){
      mediaSequence.push(new PIXI.Texture.fromImage(textureId));
    }
    this.animationData.death.sequence = mediaSequence;
  };


  Game.Bullet = function(posX, posY, rotation){
    PIXI.Sprite.call(this, Game.Resources.textures.bullet);
    Game.GlobalSprite.call(this);
    this.position.x = posX;
    this.position.y = posY;
    this.rotation = rotation || 0;
    this.speed = {
      x: 0,
      y: 0
    };
    this.render = function(){
      var scene = Game.Base.scene;
      var enemies = jQuery.grep(scene.enemies, function(enemy) {
        return enemy.inViewport();
      });
      if(!this.inViewport()){
        this.visble = false;
      }else {
        for(var x = 0; x < enemies.length; x++){
          var enemy = enemies[x];
          if(Game.Logic.checkCollision(this, enemy)){
            enemy.die();
            this.visible = false;
            var currentScore = parseInt(Game.Base.score.innerHTML, 10);
            currentScore += 10;
            scene.ship.score = currentScore;
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
    Game.GlobalSprite.call(this);
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
      Game.Base.scene.bullets.push(topBullet);
      Game.Base.scene.addChild(topBullet);

      var midBullet = new Game.Bullet(xPos, yPos);
      midBullet.speed.x = 6;
      Game.Base.scene.bullets.push(midBullet);
      Game.Base.scene.addChild(midBullet);

      var botBullet = new Game.Bullet(xPos, yPos, 0.15);
      botBullet.speed.x = 6;
      botBullet.speed.y = 3;
      Game.Base.scene.bullets.push(botBullet);
      Game.Base.scene.addChild(botBullet);
    };
  };
  Game.SpreadPowerUp.prototype = Object.create(PIXI.Sprite.prototype);
  Game.SpreadPowerUp.prototype.constructor = Game.SpreadPowerUp;



  Game.events = function(){
    var renderer = Game.Base.renderer;
    var scene = Game.Base.scene;
    renderer.view.onmousemove = null;
    renderer.view.ontouchmove = null;
    renderer.view.onmousedown = null;
    renderer.view.ontouchstart = null;
    renderer.view.onmouseup = null;
    renderer.view.ontouchend = null;
    renderer.view.onselectstart = null;
    renderer.view.onmousemove = function(evt){
      return scene.events.onmousemove.call(scene, evt);
    };
    renderer.view.ontouchmove = function(evt){
      return scene.events.ontouchmove.call(scene, evt);
    };
    renderer.view.onmousedown = function(evt){
      return scene.events.onmousedown.call(scene, evt);
    };
    renderer.view.ontouchstart = function(evt){
      return scene.events.ontouchstart.call(scene, evt);
    };
    renderer.view.onmouseup = function(evt){
      return scene.events.onmouseup.call(scene, evt);
    };
    renderer.view.ontouchend = function(evt){
      return scene.events.ontouchend.call(scene, evt);
    };
    renderer.view.onselectstart = function(evt) {
      return scene.events.onselectstart.call(scene, evt);
    };
    jQuery(window).resize(function(){
      Game.Base.updateDimensions()
    });
  };
  if(window.Game === undefined){ window.Game = Game; }

  var enemyAnimationLoader = new PIXI.SpriteSheetLoader('img/enemy.json', false);
  enemyAnimationLoader.load();
  enemyAnimationLoader.addEventListener('loaded', function(data){
    Game.Enemy.prototype.loadAnimation(data.content.json.frames);
    Game.Base.init();
  });


})();
