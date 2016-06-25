/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */


var init = function(){
    
    var carousel = document.getElementById('image-sphere');
    var mainContent = document.getElementById('main');
    var imgFrame = document.getElementsByTagName('img');
    var lastFrame = '';
    var rotateY = 0;
    var rotateX = 0;
    var currentPosX = 0;
    var currentPosY = 0;
    var rotateYs = 0;
 
    var transform = Modernizr.prefixed('transform');
    var translateZ = 0;
    window.addEventListener('keydown', function(ev){
        switch(ev.which){
            case 39:
                rotateY-=15;
                carousel.style.webkitTransform = 'translateZ(500px) rotateY(' + rotateY + 'deg)';
                rotateX-=15;
                break;
                
            case 37:
                rotateY+=15;
                carousel.style.webkitTransform = 'translateZ(500px) rotateY(' + rotateY + 'deg)';
                break;
                
            case 38:
                rotateX-=15;
                carousel.style.webkitTransform = 'translateZ(500px) rotateX(' + rotateX + 'deg)';
                break;
                
            case 40:
                rotateX+=15;
                carousel.style.webkitTransform = 'translateZ(500px) rotateX(' + rotateX + 'deg)';
        }
    });
    
    function moveSphere(event){
        
        
        var x = event.pageX;
        var y = event.pageY;
        
        if(x > currentPosX){
            rotateY -= 0.25;
        } else if(x < currentPosX){
            rotateY += 0.25;
        }
        if(y > currentPosY){
            rotateX -= 0.25;
        } else if(y < currentPosY){
            rotateX += 0.25;
        }
        
        currentPosX = x;
        currentPosY = y;
        
        console.log('This is rotateX ' + rotateX);
        console.log('This is rotateY ' + rotateY);
        
        carousel.style[transform] = 'translateZ(500px) rotateY(' + rotateY + 'deg) rotateX(' + rotateX + 'deg)';
    }
    function mouseDown(event){
        window.addEventListener('mousemove',moveSphere,false);
    }
    
    function mouseUp(){
        window.removeEventListener('mousemove',moveSphere,false);
    }
    
    mainContent.addEventListener('mousedown',mouseDown,false);
    window.addEventListener('mouseup',mouseUp,false);
    
   
   function scaleImage(){
       this.className = ' imageScale';
       if(this == lastFrame){
           this.className = ' imageShrink';
           lastFrame = '';
       } else {
           lastFrame.className = ' imageShrink';
           lastFrame = this;
       }
       
       
       
   } 
   for(var i = 0; i < imgFrame.length; i++){
        imgFrame[i].addEventListener('click', scaleImage, false); 
    }
    
  
};

window.addEventListener('load',init,false);