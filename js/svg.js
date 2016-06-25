/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
$(document).ready(function(){
    /*
    (function() {
    var lastTime = 0;
    var vendors = ['webkit', 'moz'];
    for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
        window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
        window.cancelAnimationFrame =
          window[vendors[x]+'CancelAnimationFrame'] || window[vendors[x]+'CancelRequestAnimationFrame'];
    }

    if (!window.requestAnimationFrame)
        window.requestAnimationFrame = function(callback, element) {
            var currTime = new Date().getTime();
            var timeToCall = Math.max(0, 16 - (currTime - lastTime));
            var id = window.setTimeout(function() { callback(currTime + timeToCall); },
              timeToCall);
            lastTime = currTime + timeToCall;
            return id;
        };

    if (!window.cancelAnimationFrame)
        window.cancelAnimationFrame = function(id) {
            clearTimeout(id);
        };
}()); */

    var navClick = false;
    var firstClick = false;
    var transform = Modernizr.prefixed('transform');
    var requestID; 
    var rotationDeg = 0;
    /*
    function rotateCircle(){
        requestID = requestAnimationFrame(rotateCircle);
        rotationDeg -= 1;
        $('#circleIcon').attr(transform,'rotate(' + rotationDeg + ',105,110)');
    }   */
   // requestAnimationFrame(rotateCircle);
    $('#circleIcon').click(function(event){
        
        if(firstClick == true){
            $('#circleIcon').fadeOut(200);
        }
   //     cancelAnimationFrame(requestID);
        
        event.stopPropagation();
        var now = 200;
        if(navClick == false){
        
            $('#insideCorner').animate({borderSpacing : 90},
                {
                    step: function (now, fx) {
                        $('#circleIcon').css(transform, 'translate(' + (-2 * now) + 'px)');  

                        $('#lineOne').css(transform, 'translate(' + (now / 200) + 'px,' + (-now / 2) + 'px)');
                        $('#lineTwo').css(transform, 'translate(' + (now / 200) + 'px,' + (-now/5) + 'px)');
                        $('#lineThree').css(transform, 'translate(' + (now / 200) + 'px,' + (now / 5) + 'px)');
                        $('#lineFour').css(transform, 'translate(' + (now / 200) + 'px,' + (now / 2) + 'px)');
                        
                       
                }, duration: 1000});
            
                $('.textPages').delay(600).animate({opacity: 1},{
                 duration: 1000});
             $('.textPages').css('visibility','visible');
                navClick = true;
                
        } 
    });
    
    $('html').click(function(){
        $('#circleIcon').fadeIn(200);
        if($('.textPages').is(':visible')){
            $('.textPages').css({
                opacity: 0,
                visibility: 'hidden'
            });
            
            $('#insideCorner').animate({borderSpacing: 0},
                {step: function(now,fx){
                        $('#circleIcon').css(transform, 'translate(' + -(2 * now) + 'px)');
                        $('#lineOne').css(transform, 'translate(' + (-now / 200 ) + 'px,' + (-now/2 ) + 'px)');
                        $('#lineTwo').css(transform, 'translate(' + (-now / 200 ) + 'px,' + (-now / 5) + 'px)');
                        $('#lineThree').css(transform, 'translate(' + (-now / 200 ) + 'px,' + (now / 5) + 'px)');
                        $('#lineFour').css(transform, 'translate(' + (-now / 200) + 'px,' + (now / 2) + 'px)');
                        
                        $('#textOne').css(transform, 'translate(' + (-now / 200) + 'px,' + (-now / 4) + 'px)');
      
                }, duration: 1000}

            );
                navClick = false;
        }
    });
    
    $('.textPages').click(function(){
        firstClick = true;
        
        $('#header').animate({opacity: 0},{duration: 500});
        $('#mainContent').animate({opacity: 0},{duration: 500});
        $('.mainNav').animate({top: 105, left: 20}, {duration: 2000});
        $('.mainNav').attr('id', 'scaleDown');
        
        
        var pageName = $(this).text();
        var fileName;
        if(pageName == 'Web Design'){
            fileName = 'web-design';
        }
        if(pageName == 'Code Projects'){
            fileName = 'code-projects';
        }
        if(pageName == 'Info'){
            fileName = 'info';
        }
        $('#mainContent').delay(1000).queue(function(n){
            $('#fillContent').load(fileName + '.html #innerContent');
            n();
        }).fadeTo(500,1);
        
        $('#header').delay(1000).fadeTo(800,1);
        $('#header svg text').delay(1000).queue(function(n){
            $(this).html(pageName);
            n();
        }).fadeTo(800,1);
    });
    
    $('#fillContent').on('click', '#innerContent .fun-projects h3', function(){
        
        if($(this).next().is(':hidden')){
            $(this).next().slideDown('slow');
        } else if($(this).next().is(':visible')){
            $(this).next().slideUp('slow');
        }
    });

    $('#circleIcon').trigger("click");
});