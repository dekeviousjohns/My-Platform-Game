export class leveltwo{
    constructor(){
        (function () {
            var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
            window.requestAnimationFrame = requestAnimationFrame;
        })();
        var canvas = document.getElementById("level-two"),
            ctx = canvas.getContext("2d"),
            width = 1000,
            height = 400,
            player = {
                x: width / 2,
                y: 200,
                width: 25,
                height: 25,
                speed: 3,
                velX: 0,
                velY: 0,
                jumping: false,
                grounded: false,
                color: 'red'
            },
            keys = [],
            friction = 0.8,
            gravity = 0.4,
            boxes = [],
            powerup = [];  
        
        powerup.push({ //powerup
                x: 810,
                y: 250,
                width: 20,
                height: 20,
                color: 'green',
                effect: 'shrink'
            });
        powerup.push({//powerup
                x: 400,
                y: 150,
                width: 20,
                height: 20,
                color: 'orange',
                effect: 'gravity'
            });
        powerup.push({//Teleport box
                x: 980,
                y: 0,
                width: 27,
                height: 27,
                color: 'blue',
                effect: 'teleport',
                  rotate: 20,
                px: 20, //where the player gets teleported
                py: 370,
                stay: true
            });
        powerup.push({//The "win" box
                x: 60,
                y: 365,
                width: 20,
                height: 20,
                color: 'blue',
                effect: 'win',
                stay: true
            });
        
        // Dimensions of boxes
        boxes.push({//box on left end of screen
            x: 0,
            y: height/5,
            width: 10,
            height: height,
            color: 'green'
        });
        boxes.push({//second box on left end of screen
            x: 0,
            y: 0,
            width: 10,
            height: height/4-15,
            color: 'green'
        });
        boxes.push({//box for the ground
            x: 0,
            y: height - 10,
            width: width,
            height: 50,
            color: 'orange'
        });
        boxes.push({//box on right end of screen
            x: width - 10,
            y: 0,
            width: 50,
            height: height,
            color: 'yellow'
        });
        boxes.push({
            x: 290,
            y: 200,
            width: 300,
            height: 10,
            color: 'green'
        });
        boxes.push({
            x: 618,
            y: 200,
            width: 500,
            height: 10,
            // color: 'green'
        });
        boxes.push({
            // x: 120,
            // y: 250,
            // width: 150,
            // height: 10,
            // color: 'white'
        });
        boxes.push({
            x: 800,
            y: 170,
            width: 80,
            height: 10,
            color: 'black'
        });
        boxes.push({
            // x: 200,
            // y: 390,
            // width: 100,
            // height: 10,
            // color: 'white'
        });
        boxes.push({
            x: 450,
            y: 300,
            width: 400,
            height: 10,
            color: 'white'
        });
        boxes.push({
            x: 0,
            y: 300,
            width: 90,
            height: 10,
            color: 'white'
        });
        boxes.push({
            x: 90,
            y: 300,
            width: 10,
            height: 95,
            color: 'white'
        });
        
        canvas.width = width;
        canvas.height = height;
        
        function update() {
            // check keys
            if (keys[38] || keys[32] || keys[87]) {
                // up arrow or space
                if (!player.jumping && player.grounded) {
                    player.jumping = true;
                    player.grounded = false;
                    player.velY = -player.speed * 2.5;//how high to jump
                }
            }
            if (keys[39] || keys[68]) {
                // right arrow
                if (player.velX < player.speed) {
                    player.velX++;
                }
            }
            if (keys[37] || keys[65]) {
                // left arrow
                if (player.velX > -player.speed) {
                    player.velX--;
                }
            }
          
              
        
            player.velX *= friction;
            player.velY += gravity;
        
            ctx.clearRect(0, 0, width, height);
            ctx.beginPath();
            
            player.grounded = false;
            for (var i = 0; i < boxes.length; i++) {//display boxes
                ctx.fillStyle = boxes[i].color;
                ctx.rect(boxes[i].x, boxes[i].y, boxes[i].width, boxes[i].height);
                
                var dir = colCheck(player, boxes[i]);
        
                if (dir === "l" || dir === "r") {
                    player.velX = 0;
                    player.jumping = false;
                } else if (dir === "b") {
                    player.grounded = true;
                    player.jumping = false;
                } else if (dir === "t") {
                    player.velY *= -1;
                }
        
            }
            
            if(player.grounded){
                 player.velY = 0;
            }
            
            player.x += player.velX;
            player.y += player.velY;
          
            ctx.fill();//Draw Character 
            ctx.fillStyle = player.color;
            ctx.fillRect(player.x, player.y, player.width, player.height);
            
            //powerups
            //draw powerup stuff 
            for(var j = 0; j < powerup.length; j++){
                ctx.save();
                var cx = powerup[j].x + 0.5 * powerup[j].width,   // x of shape center
                cy = powerup[j].y + 0.5 * powerup[j].height; //y of shape center
                ctx.translate(cx, cy);  //translate to center of shape
                ctx.rotate( (Math.PI / 180) * 45);//rotate 25 degrees.
                if(powerup[j].effect  === 'tele'){
                  ctx.rotate( (Math.PI / 180) * powerup[j].rotate);//rotate 25 degrees.
                  powerup[j].rotate = (Math.PI / 180) * powerup[j].rotate;
                }
                ctx.translate(-cx, -cy);            //translate center back to 0,0
                ctx.fillStyle = powerup[j].color;
                ctx.fillRect(powerup[j].x, powerup[j].y, powerup[j].width, powerup[j].height);
                ctx.restore();
              
        
              
              //powerup collision
              if(colCheck(player, powerup[j])!==null){//after collision with powerup
                if(powerup[j].effect==='gravity'){
                  gravity= 0.4;//decrease gravity
                  player.speed = 4;
                  player.color = 'gold';
                }
                else if (powerup[j].effect==='shrink'){
                  player.width= 10;
                  player.height= 10;
                  player.speed = 5;
                }
                else if (powerup[j].effect==='teleport'){
                  player.x=powerup[j].px;
                  player.y=powerup[j].py;
                }
                else if (powerup[j].effect==='win'){//Win Sequence & restart after win
                    var youWin = confirm("You Win!")
                    if (youWin == false) {
                        player.x = 200;
                        player.y = 200;
                    } else{
                    document.getElementById("start-screen").style.display = "none";
                    document.getElementById("level-screen").style.display = "block";
                    document.getElementById("level-one").style.display = "none";
                    document.getElementById("level-two").style.display = "none";
                    document.getElementById("restart").style.display = "none";
                    }
                }
                if(powerup[j].stay!==true)
                powerup[j].width=0;//make power up go away
              }
            }
            //powerup update
        
            requestAnimationFrame(update);
        }
        
        function colCheck(shapeA, shapeB) {
            // get the vectors to check against
            var vX = (shapeA.x + (shapeA.width / 2)) - (shapeB.x + (shapeB.width / 2)),
                vY = (shapeA.y + (shapeA.height / 2)) - (shapeB.y + (shapeB.height / 2)),
                // add the half widths and half heights of the objects
                hWidths = (shapeA.width / 2) + (shapeB.width / 2),
                hHeights = (shapeA.height / 2) + (shapeB.height / 2),
                colDir = null;
        
            // if the x and y vector are less than the half width or half height, they we must be inside the object, causing a collision
            if (Math.abs(vX) < hWidths && Math.abs(vY) < hHeights) {
                // figures out on which side we are colliding (top, bottom, left, or right)
                var oX = hWidths - Math.abs(vX),
                    oY = hHeights - Math.abs(vY);
                if (oX >= oY) {
                    if (vY > 0) {
                        colDir = "t";
                        shapeA.y += oY;
                    } else {
                        colDir = "b";
                        shapeA.y -= oY;
                    }
                } else {
                    if (vX > 0) {
                        colDir = "l";
                        shapeA.x += oX;
                    } else {
                        colDir = "r";
                        shapeA.x -= oX;
                    }
                }
            }
            return colDir;
        }
        
        document.body.addEventListener("keydown", function (e) {
            keys[e.keyCode] = true;
        });
        
        document.body.addEventListener("keyup", function (e) {
            keys[e.keyCode] = false;
        });
        
        
        window.addEventListener("load", function () {
            update();
        });
    }
}

