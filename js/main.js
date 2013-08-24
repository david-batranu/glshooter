(function(jQuery){
  jQuery(document).ready(function(){
    var Game = {
      version: '1.0'
    };

    Game.Base = {
      interactive: true,
      renderer: undefined,
      stage: undefined,
      maxFps: 30,
      fpsLimit: {
        now: undefined,
        then: Date.now(),
        interval: function(){ return 1000/Game.Base.maxFps; },
        delta: undefined
      },
      init: function(bgcolor){
        var self = Game.Base;
        self.stage = new PIXI.Stage(0x66FF99, self.interactive);
        self.renderer = PIXI.autoDetectRenderer(window.innerWidth, window.innerHeight);
        document.body.appendChild(self.renderer.view);
        Game.Actors.init();
        Game.events();
        function animate(){
          Game.Logic.run();
          self.renderer.render(self.stage);
          requestAnimFrame(animate);
        }
        requestAnimFrame(animate);
      },
      animate: function(){
        var self = Game.Base;
        var fpsLimit = self.fpsLimit;
        fpsLimit.now = Date.now();
        fpsLimit.delta = fpsLimit.now - fpsLimit.then;
        if (fpsLimit.delta > fpsLimit.interval){
          renderLogic();
          Game.Base.renderer.render(Game.Base.stage);
        }
        requestAnimFrame(Game.base.animate);
      }
    };

    Game.Logic = {
      checkCollision: function(obj1, obj2){
        var xdist = obj2.position.x - obj1.position.x;

        if(xdist > -obj2.width/2 && xdist < obj2.width/2)
        {
          var ydist = obj2.position.y - obj1.position.y;

          if(ydist > -obj2.height/2 && ydist < obj2.height/2)
          {
            return true;
          }
        }
      },
      renderBullets: function(){
        var self = Game.Logic;
        var bullets = Game.Actors.bullets;
        var stage = Game.Base.stage;
        var enemy = Game.Actors.enemy;
        var renderer = Game.Base.renderer;

        for(var i = 0; i <= bullets.length; i++){
          var bullet = bullets[i];
          if(bullet === undefined) break;
          if(bullet.position.x > renderer.width){
            stage.removeChild(bullet);
            bullets.splice(i, 1);
            i--;
          }else if(enemy.visible && self.checkCollision(bullet, enemy)){
            stage.removeChild(enemy);
            stage.removeChild(bullet);
            enemy.visible = false;
            bullets.splice(i, 1);
            i--;
          }
          bullet.position.x += 10;
        }
      },
      run: function(){
        var self = Game.Logic;
        self.renderBullets();
        Game.Actors.enemy.position.x -= 3;
      }
    };


    Game.Resources = {
      textures: {
        bullet: PIXI.Texture.fromImage('img/beam.png'),
        ship: PIXI.Texture.fromImage('img/ship.png'),
        enemy: PIXI.Texture.fromImage('img/enemy.png')
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
      enemy: undefined,
      ship: undefined,
      init: function(){
        var self = Game.Actors;
        self.ship = self.initShip();
        self.enemy = self.initEnemy();
        Game.Base.stage.addChild(self.ship);
        Game.Base.stage.addChild(self.enemy);
      },
      initShip: function(){
        var ship = Game.Resources.sprites.ship();
        ship.anchor.x = 0.5;
        ship.anchor.y = 0.5;
        ship.position.x = Game.Base.renderer.width / 2;
        ship.position.y = Game.Base.renderer.height /2 ;
        return ship;
      },
      initEnemy: function(){
        var enemy = Game.Resources.sprites.enemy();
        enemy.position.x = Game.Base.renderer.width - 300;
        enemy.position.y = Game.Base.renderer.height / 2;
        enemy.anchor.x = 0.5;
        enemy.anchor.y = 0.5;
        enemy.visible = true;
        return enemy;
      }
    };


    Game.events = function(){
      var renderer = Game.Base.renderer;
      var ship = Game.Actors.ship;
      jQuery(renderer.view).mousemove(function(evt){
        ship.position.x = evt.clientX;
        ship.position.y = evt.clientY;
      });

      jQuery(renderer.view).click(function(evt){
        var bullet = Game.Resources.sprites.bullet();
        bullet.anchor.y = 0.5;
        bullet.position.x = ship.position.x + ship.width;
        bullet.position.y = ship.position.y;
        Game.Actors.bullets.push(bullet);
        Game.Base.stage.addChild(bullet);
      });
    };
    if(window.Game === undefined){ window.Game = Game; }
    Game.Base.init();
  });
})(jQuery);
