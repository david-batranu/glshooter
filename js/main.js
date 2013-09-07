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
    background: [null, null],
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
      var bg1 = resources.sprites.background();
      var bg2 = resources.sprites.background();
      bg1.position.x = 0;
      bg1.position.y = 0;
      bg2.position.x = bg1.position.x + bg1.width;
      bg2.position.y = 0;
      self.stage.addChild(bg1);
      self.stage.addChild(bg2);
      self.background[0] = bg1;
      self.background[1] = bg2;
    },
    renderBackground: function(){
      var self = Game.Base;
      var speed = 5;
      var bg1 = self.background[0];
      var bg2 = self.background[1];
      if((bg1.position.x + bg1.width) < 0){
        bg1.position.x = bg2.position.x + bg2.width;
        self.background = [bg2, bg1];
      }
      bg1.position.x -= speed;
      bg2.position.x -= speed;
    }
  };

  Game.Logic = {
    score: 0,
    gameover: false,
    firingRate: 2,
    now: undefined,
    then: Date.now(),
    firingInterval: 1000/15,
    firingDelta: undefined,
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
    shootBullets: function(){
      var self = Game.Logic;
      var ship = Game.Actors.ship;
      if(ship.shooting){
        self.now = Date.now();
        self.firingDelta = self.now - self.then;
        if(self.firingDelta > self.firingInterval){
          self.then = self.now;
          var xPos = ship.position.x + ship.width / 2;
          var yPos = ship.position.y;
          var bullet = Game.Actors.initBullet(xPos, yPos);
          bullet.props.speed.x = 6;
          Game.Actors.bullets.push(bullet);
          Game.Base.stage.addChild(bullet);
          self.firePowerups();
        }
      }
    },
    renderPowerups: function(){
      var self = Game.Logic;
      var ship = Game.Actors.ship;
      var powerups = Game.Actors.powerups;
      var renderer = Game.Base.renderer;
      var stage = Game.Base.stage;

      if((powerups.length < 1) && (self.score % 500) === 0){
        var newPowerup = Game.Actors.initSpreadPowerup(renderer.width/2, 0);
        newPowerup.props.speed.y = 1;
        stage.addChild(newPowerup);
        powerups.push(newPowerup);
      }

      for(var i=0; i<powerups.length;i++){
        var powerup = powerups[i];
        var isActive = powerup.props.active();
        if(!isActive && self.checkCollision(ship, powerup)){
          powerup.props.start = Date.now();
          stage.removeChild(powerup);
        }else if(powerup.position.y > (renderer.height + powerup.height)){
          stage.removeChild(powerup);
          powerups.splice(i, 1);
          i--;
        }else if(!isActive && !powerup.props.expired){
          powerup.position.y += powerup.props.speed.y;
        }else if(powerup.props.expired){
          powerups.splice(i, 1);
          i--;
        }
      }
    },
    firePowerups: function(){
      var ship = Game.Actors.ship;
      var powerups = Game.Actors.powerups;
      for(var i=0; i<powerups.length;i++){
        var powerup = powerups[i];
        if(powerup.props.active()){
          var xPos = ship.position.x + ship.width / 2;
          var yPos = ship.position.y;
          powerup.props.render(xPos, yPos);
        }
      }
    },
    renderBullets: function(){
      var self = Game.Logic;
      var bullets = Game.Actors.bullets;
      var stage = Game.Base.stage;
      var enemies = Game.Actors.enemies;
      var renderer = Game.Base.renderer;

      for(var i = 0; i < bullets.length; i++){
        var bullet = bullets[i];
        if((bullet.position.x > (renderer.width + bullet.width)) ||
           (bullet.position.y > (renderer.height + bullet.width)) ||
           (bullet.position.y < (-bullet.width))){
          try{
            bullets.splice(i, 1);
            stage.removeChild(bullet);
            i--;
          }
          catch(err){}
        }else {
          for(var x = 0; x < enemies.length; x++){
            var enemy = enemies[x];
            if(self.checkCollision(bullet, enemy)){
              stage.removeChild(enemy);
              enemies.splice(x, 1);
              x--;
              try{
                stage.removeChild(bullet);
                bullets.splice(i, 1);
                i++;
              }
              catch(err){
                //nothing
              }
              var currentScore = parseInt(Game.Base.score.innerHTML, 10);
              currentScore += 10;
              self.score = currentScore;
              Game.Base.score.innerHTML = currentScore;
            }
          }
        }
        bullet.position.x += bullet.props.speed.x;
        bullet.position.y += bullet.props.speed.y;
      }
    },
    renderEnemies: function(){
      var self = Game.Logic;
      var stage = Game.Base.stage;
      var enemies = Game.Actors.enemies;
      var ship = Game.Actors.ship;

      // DEBUG
      //if(enemies.length < 10){
      //  var xPos = 1000;
      //  var yPos = (34 * enemies.length) - 10 * enemies.length;
      //  var newEnemy = Game.Actors.initEnemy(xPos, yPos);
      //  enemies.push(newEnemy);
      //  Game.Base.stage.addChild(newEnemy);
      //}

      if(enemies.length < 30) {
        var renderer = Game.Base.renderer;
        var xPos = self.getRandomInt(renderer.width, renderer.width + 500);
        var yPos = self.getRandomInt(0, renderer.height);
        var newEnemy = Game.Actors.initEnemy(xPos, yPos);
        newEnemy.props.speed.x = (self.score/500);
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

      for(var x = 0; x < enemies.length; x++){
        var enemy = enemies[x];
        if(ship && self.checkCollision(enemy, ship)){
          self.gameover = true;
        } else if(enemy.position.x > -enemy.width){
          enemy.position.x -= enemy.props.speed.x + 1;
        }else {
          enemies.splice(x, 1);
          stage.removeChild(enemy);
          self.gameover = true;
        }
      }
    },
    run: function(){
      var self = Game.Logic;
      if(!self.gameover){
        self.renderEnemies();
        self.shootBullets();
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
      bullet: PIXI.Texture.fromImage('img/beam.png'),
      ship: PIXI.Texture.fromImage('img/ship.png'),
      enemy: PIXI.Texture.fromImage('img/enemy.png'),
      square: PIXI.Texture.fromImage('img/square.png'),
      spread: PIXI.Texture.fromImage('img/spread.png'),
      background: PIXI.Texture.fromImage('img/background.png')
    },
    sprites: {
      bullet: function(){
        var self = Game.Resources;
        return self.makeSprite(self.textures.bullet);
      },
      ship: function(){
        var self = Game.Resources;
        return self.makeSprite(self.textures.ship);
      },
      enemy: function(){
        var self = Game.Resources;
        return self.makeSprite(self.textures.enemy);
      },
      spread: function(){
        var self = Game.Resources;
        return self.makeSprite(self.textures.spread);
      },
      background: function(){
        var self = Game.Resources;
        return self.makeSprite(self.textures.background);
      }
    },
    makeSprite: function(textureOrPath){
      var self = Game.Resources;
      if(typeof textureOrPath === "string" || textureOrPath instanceof String){
        return self.makeSpriteFromImage(textureOrPath);
      }
      return new PIXI.Sprite(textureOrPath);
    },
    makeSpriteFromTexture: function(imagepath){
      var texture = PIXI.Texture.fromImage(imagepath);
      return new PIXI.Sprite(texture);
    },
    makeSpriteFromImage: function(imagepath){
      var texture = PIXI.Texture.fromImage(imagepath);
      return new PIXI.Sprite(texture);
    }
  };

  Game.Actors = {
    bullets: [],
    enemies: [],
    powerups: [],
    ship: undefined,
    addProps: function(obj){
      var props = {
        radius: (obj.width + obj.height) / 4,
        speed: {
          x: 0,
          y: 0
        }
      };
      obj.props = props;
      return obj;
    },
    init: function(){
      var self = Game.Actors;
      self.ship = self.initShip();
      self.enemies.push(self.initEnemy());
      Game.Base.stage.addChild(self.ship);
      Game.Base.stage.addChild(self.enemies[0]);
    },
    initShip: function(){
      var self = Game.Actors;
      var ship = Game.Resources.sprites.ship();
      ship.anchor.x = 0.5;
      ship.anchor.y = 0.5;
      ship.position.x = Game.Base.renderer.width / 2;
      ship.position.y = Game.Base.renderer.height /2 ;
      ship.shooting = false;
      ship.lastshot = undefined;
      return self.addProps(ship);
    },
    initEnemy: function(x, y){
      var self = Game.Actors;
      var enemy = Game.Resources.sprites.enemy();
      enemy.position.x = x || Game.Base.renderer.width;
      enemy.position.y = y || Game.Base.renderer.height / 2;
      enemy.anchor.x = 0.5;
      enemy.anchor.y = 0.5;
      return self.addProps(enemy);
    },
    initBullet: function(x,y, rotation){
      var self = Game.Actors;
      var bullet = Game.Resources.sprites.bullet();
      bullet.anchor.x = 0.5;
      bullet.anchor.y = 0.5;
      bullet.position.x = x;
      bullet.position.y = y;
      bullet.rotation = rotation || 0;
      return self.addProps(bullet);
    },
    initSpreadPowerup: function(x, y){
      var self = Game.Actors;
      var spread = Game.Resources.sprites.spread();
      spread.position.x = x;
      spread.position.y = y;
      spread.anchor.x = 0.5;
      spread.anchor.y = 0.5;
      spread = self.addProps(spread);
      spread.props.start = undefined;
      spread.props.expired = false;
      spread.props.duration = 5000;
      spread.props.active = function(){
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
      spread.props.render = function(xPos, yPos){
        var topBullet = Game.Actors.initBullet(xPos, yPos, -0.15);
        topBullet.props.speed.x = 6;
        topBullet.props.speed.y = -3;
        Game.Actors.bullets.push(topBullet);
        Game.Base.stage.addChild(topBullet);

        var botBullet = Game.Actors.initBullet(xPos, yPos, 0.15);
        botBullet.props.speed.x = 6;
        botBullet.props.speed.y = 3;
        Game.Actors.bullets.push(botBullet);
        Game.Base.stage.addChild(botBullet);
      };
      return spread;
    }
  };

  Game.events = function(){
    var renderer = Game.Base.renderer;
    var ship = Game.Actors.ship;
    renderer.view.onmousemove = function(evt){
      ship.position.x = evt.clientX - renderer.view.offsetLeft;
      ship.position.y = evt.clientY - renderer.view.offsetTop;
    };

    renderer.view.onmousedown = function(evt){
      ship.shooting = true;
    };

    renderer.view.onmouseup = function(evt){
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
