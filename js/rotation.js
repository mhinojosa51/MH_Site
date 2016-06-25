/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

$(document).ready(function(){
    var touchStart, touchEnd;
    var rotationAmt = 0,
    transform = Modernizr.prefixed('transform');
    window.addEventListener('keydown', function(e){
    switch(e.which){
        case 39:
            rotationAmt -= 60;
            $('#gallery').css({transform : 'translateZ(-360px) rotateY(' + rotationAmt +'deg)'});
            break;
            
        case 37:
            rotationAmt += 60;
            $('#gallery').css({transform : 'translateZ(-360px) rotateY(' + rotationAmt +'deg)'});
            break;
    }
});
    
    window.addEventListener('touchstart', function(ev){
        touchStart = ev.changedTouches[0].pageX;
    });
    window.addEventListener('touchend',function(ev){
        touchEnd = ev.changedTouches[0].pageX;
        if(touchEnd > touchStart && (touchEnd - touchStart > 100)){
            rotationAmt -= 60;
            $('#gallery').css({transform : 'translateZ(-360px) rotateY(' + rotationAmt +'deg)'});
        }
        if(touchEnd < touchStart && (touchStart - touchEnd > 100)){
            rotationAmt += 60;
            $('#gallery').css({transform : 'translateZ(-360px) rotateY(' + rotationAmt +'deg)'});
        }
    });
});

