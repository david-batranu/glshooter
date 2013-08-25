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
      self.loadStats();
      self.initScore();
      Game.Actors.init();
      Game.events();
      requestAnimFrame(self.animate);
    },
    animate: function(){
      var self = Game.Base;
      self.stats.begin();

      Game.Logic.run();
      self.renderer.render(self.stage);
      requestAnimFrame(self.animate);

      self.stats.end();
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
    checkCollision: function(obj1, obj2){
      var r1 = obj1.props.radius;
      var r2 = obj2.props.radius;
      var distX = obj1.position.x - obj2.position.x;
      var distY = obj1.position.y - obj2.position.y;
      var sqaredist = (distX * distX) + (distY * distY);
      return sqaredist <= (r1 + r2) * (r1 + r2);
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
          Game.Actors.bullets.push(bullet);
          Game.Base.stage.addChild(bullet);
        }
      }
    },
    renderBullets: function(){
      var self = Game.Logic;
      var bullets = Game.Actors.bullets;
      var stage = Game.Base.stage;
      var enemies = Game.Actors.enemies;
      var renderer = Game.Base.renderer;

      for(var i = 0; i <= bullets.length; i++){
        var bullet = bullets[i];
        if(bullet === undefined) break;
        if(bullet.position.x > (renderer.width + bullet.width)){
          bullets.splice(i, 1);
          stage.removeChild(bullet);
          i--;
        }else {
          for(var x = 0; x <= enemies.length; x++){
            var enemy = enemies[x];
            if(enemy === undefined) break;
            if(self.checkCollision(bullet, enemy)){
              enemy.collided = true;
              bullet.collided = true;
              var currentScore = parseInt(Game.Base.score.innerHTML, 10);
              currentScore += 10;
              self.score = currentScore;
              Game.Base.score.innerHTML = currentScore;
            }
          }
        }
        bullet.position.x += 10;
      }

      (function(){
        for(var i = 0; i <= bullets.length; i++){
          var bullet = bullets[i];
          if(bullet === undefined) break;
          if(bullet.collided){
            bullets.splice(i, 1);
            stage.removeChild(bullet);
            i--;
          }
        }

        for(var x = 0; i <= enemies.length; x++){
          var enemy = enemies[x];
          if(enemy === undefined) break;
          if(enemy.collided){
            enemies.splice(x, 1);
            stage.removeChild(enemy);
            i--;
          }
        }
      })();
    },
    renderEnemies: function(){
      var self = Game.Logic;
      var stage = Game.Base.stage;
      var enemies = Game.Actors.enemies;
      var ship = Game.Actors.ship;

      if(enemies.length < 30) {
        var renderer = Game.Base.renderer;
        var xPos = self.getRandomInt(renderer.width, renderer.width + 500);
        var yPos = self.getRandomInt(0, renderer.height);
        var newEnemy = Game.Actors.initEnemy(xPos, yPos);
        (function(){
          var isColliding = false;
          for(var x = 0; x <= enemies.length; x++){
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

      for(var x = 0; x <= enemies.length; x++){
        var enemy = enemies[x];
        if(enemy === undefined) break;
        if(ship && self.checkCollision(enemy, ship)){
          self.gameover = true;
        } else if(enemy.position.x > -enemy.width){
          enemy.position.x -= (self.score/500) + 1;
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
      } else {
        alert("GAME OVER! You made it to "+ self.score +" points");
        location.reload(true);
      }
    }
  };

  Game.Resources = {
    textures: {
      bullet: PIXI.Texture.fromImage('img/beam.png'),
      ship: PIXI.Texture.fromImage('img/ship.png'),
      enemy: PIXI.Texture.fromImage('img/enemy.png'),
      square: PIXI.Texture.fromImage('img/square.png')
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
    ship: undefined,
    addProps: function(obj){
      var props = {
        radius: (obj.width + obj.height) / 4
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
    initBullet: function(x,y){
      var self = Game.Actors;
      var bullet = Game.Resources.sprites.bullet();
      bullet.anchor.x = 0.5;
      bullet.anchor.y = 0.5;
      bullet.position.x = x;
      bullet.position.y = y;
      return self.addProps(bullet);
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
