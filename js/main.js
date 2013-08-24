(function(jQuery){
  jQuery(document).ready(function(){
    var interactive = true;
    var stage = new PIXI.Stage(0x66FF99, interactive);
    var renderer = PIXI.autoDetectRenderer(window.innerWidth, window.innerHeight);
    jQuery('body').append(renderer.view);


    maxFps = 30;
    var fpsLimit = {
      fps: maxFps,
      now: undefined,
      then: Date.now(),
      interval: 1000/maxFps,
      delta: undefined
    };


    requestAnimFrame(animate);

    var bullet_texture = PIXI.Texture.fromImage('img/beam.png');
    var ship_texture = PIXI.Texture.fromImage('img/ship.png');
    var enemy_texture = PIXI.Texture.fromImage('img/enemy.png');

    var ship = new PIXI.Sprite(ship_texture);
    var enemy = new PIXI.Sprite(enemy_texture);

    var bullets = [];

    ship.anchor.x = 0.5;
    ship.anchor.y = 0.5;

    ship.position.x = renderer.width / 2;
    ship.position.y = renderer.height /2 ;

    jQuery(renderer.view).mousemove(function(evt){
      ship.position.x = evt.clientX;
      ship.position.y = evt.clientY;
    });

    jQuery(renderer.view).click(function(evt){
      var bullet = new PIXI.Sprite(bullet_texture);
      bullet.anchor.y = 0.5;
      bullet.position.x = ship.position.x + ship.width;
      bullet.position.y = ship.position.y;
      bullets.push(bullet);
      stage.addChild(bullet);
    });


    enemy.position.x = renderer.width - 300;
    enemy.position.y = renderer.height / 2;
    enemy.anchor.x = 0.5;
    enemy.anchor.y = 0.5;


    stage.addChild(enemy);
    enemy.visible = true;
    stage.addChild(ship);


    function checkCollision(obj1, obj2){
      var xdist = obj2.position.x - obj1.position.x;

      if(xdist > -obj2.width/2 && xdist < obj2.width/2)
      {
        var ydist = obj2.position.y - obj1.position.y;

        if(ydist > -obj2.height/2 && ydist < obj2.height/2)
        {
          return true;
        }
      }
    }

    var renderBullets = function(){
      for(var i = 0; i <= bullets.length; i++){
        var bullet = bullets[i];
        if(bullet === undefined) break;
        if(bullet.position.x > renderer.width){
          stage.removeChild(bullet);
          bullets.splice(i, 1);
          i--;
        }else if(enemy.visible && checkCollision(bullet, enemy)){
          stage.removeChild(enemy);
          stage.removeChild(bullet);
          enemy.visible = false;
          bullets.splice(i, 1);
          i--;
        }
        bullet.position.x += 10;
      }
    };

    var renderLogic = function(){
      renderBullets();
      enemy.position.x -= 3;
    };

    function animate(){
      fpsLimit.now = Date.now();
      fpsLimit.delta = fpsLimit.now - fpsLimit.then;
      if (fpsLimit.delta > fpsLimit.interval){
        renderLogic();
        renderer.render(stage);
      }
      requestAnimFrame(animate);
    }
  });
})(jQuery);
