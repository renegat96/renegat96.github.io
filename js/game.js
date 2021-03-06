var alive=false,canvas,ctx,jumpStatus=0,y=0,distance=0,jump_height=100,character_height=30,character_width=10,obstacles=[],jump_speed=1.5,obstacle_speed=2,timeouts=[];function custom_set_timeout(f,p){timeouts.push(setTimeout(f,p))}
function clear_timeouts(){for(var i=0;i<timeouts.length;++i)clearTimeout(timeouts[i]);timeouts=[]}
function startJump(){if(jumpStatus===1){if(distance<jump_height){distance+=jump_speed}else jumpStatus=2}else if(jumpStatus===2){if(distance>0){distance-=jump_speed}else{jumpStatus=0;distance=0}}else if(jumpStatus===0)return;if(alive)custom_set_timeout(startJump,1000.0/100)}
function jump(){if(jumpStatus===0){jumpStatus=1;startJump()}}
function onButtonClick(event){if(alive&&event.keyCode==32){jump();event.preventDefault()}}
function addObstacle(){obstacles.push({x:canvas.width,h:10+40*Math.random()});if(alive)custom_set_timeout(addObstacle,5000-3000*Math.random())}
function moveObstacles(){var newObstacles=[];for(var i=0;i<obstacles.length;i++){var obstacle=obstacles[i];obstacle.x-=obstacle_speed;if(obstacle.x>-character_width)newObstacles.push(obstacle)};obstacle=newObstacles}
function isPointInsideObstacle(x,y){for(var i=0;i<obstacles.length;i++){var obstacle=obstacles[i];if(obstacle.x<=x&&x<=obstacle.x+character_width&&canvas.height-obstacle.h<=y&&y<=canvas.height)return true};return false}
function die(){alive=false;clear_timeouts()}
function step(){moveObstacles();var x=30,y=canvas.height-distance;if(isPointInsideObstacle(x,y)||isPointInsideObstacle(x+character_width,y))die();ctx.clearRect(0,0,canvas.width,canvas.height);ctx.fillStyle='#BBB';ctx.fillRect(0,0,canvas.width,canvas.height);ctx.fillStyle='#0F0';ctx.fillRect(x,y-character_height,character_width,character_height);ctx.fillStyle='#F00';for(var i=0;i<obstacles.length;i++){var obstacle=obstacles[i];ctx.fillRect(obstacle.x,canvas.height-obstacle.h,character_width,obstacle.h)};if(alive)custom_set_timeout(step,1000.0/30)}
function start(){clear_timeouts();jumpStatus=0;y=0;distance=0;jump_height=100;character_height=30,character_width=10;obstacles=[];jump_speed=1.5;obstacle_speed=2;alive=true;step();addObstacle();this.blur()};window.addEventListener('keydown',onButtonClick);window.onload=function(){canvas=document.getElementById('canvas');ctx=canvas.getContext('2d');start();die()}