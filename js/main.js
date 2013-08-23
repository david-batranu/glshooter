(function(jQuery){
  jQuery(document).ready(function(){
    var interactive = true;
    var stage = new PIXI.Stage(0x66FF99, interactive);
    var renderer = PIXI.autoDetectRenderer(window.innerWidth, window.innerHeight);
    jQuery('body').append(renderer.view);


    requestAnimFrame(animate);

    var bullet_texture = PIXI.Texture.fromImage('img/beam.png');
    var ship_texture = PIXI.Texture.fromImage('img/ship.png');

    var ship = new PIXI.Sprite(ship_texture);

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


    stage.addChild(ship);
    function animate(){
      var visible_bullets = [];

      jQuery.each(bullets, function(i, bullet){
        if(bullet.position.x > renderer.width){
          stage.removeChild(bullet);
        }else {
          visible_bullets.push(bullet);
        }
      });

      bullets = visible_bullets;

      jQuery.each(bullets, function(i, bullet){
        bullet.position.x += 10;
      });

      renderer.render(stage);
      requestAnimFrame(animate);
    }
  });
})(jQuery);
