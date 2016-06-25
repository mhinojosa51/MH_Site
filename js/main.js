/* 
Michael Hinojosa 5/3/2016
Javascript for page transitions and menu options */

$.mobile.loading().hide();
// class for website controls


var SiteControls = function () {

    this.supportedEvent = $.support.touch ? "touchstart" : "click";
	this.navClick = false;
	this.firstClick = false;
	this.transform = Modernizr.prefixed('transform');
	
    // Create jQuery objects and class variables
	this.circleIcon = $("#circleIcon");
	this.insideCorner = $("#insideCorner");
	this.lineOne = $("#lineOne");
	this.lineTwo = $("#lineTwo");
	this.lineThree = $("#lineThree");
	this.lineFour = $("#lineFour");
	this.textOne = $("#textOne");
	this.textPages = $(".textPages");
	this.header = $("#header");
	this.mainContent = $("#mainContent");
	this.mainNav = $(".mainNav");
	this.fillContent = $("#fillContent");
	this.page = $("html");
	this.svgText = $("#header svg text");
	this.speed = 200;
	this.pageName;
	this.fileName;

	this.circleIcon.click(this.circleClickFunction.bind(this));
//	this.page.click(this.resetCircleFunction.bind(this));
//	this.textPages.click(this.textPagesClickFunction.bind(this));
	this.textPages.on('click', this.textPagesClickFunction.bind(this));
	this.fillContent.on(this.supportedEvent, '#innerContent .fun-projects h3', this.fillContentFunction.bind(this));

    // triggers the click function for the circle icon to reveal the main menu to the user. 
	this.circleClickFunction();
	this.textPages.on('mouseover', this.changeNavigationTextOnEnter).bind(this);
	this.textPages.on('mouseleave', this.resetNavigationTextOnExit).bind(this);

}


/* click function for initial menu, transforms menu bars and shows menu text when clicked.*/
SiteControls.prototype.circleClickFunction = function () {
	if(this.firstClick == true){
		this.circleIcon.fadeOut(200);
	}
	
	if(this.navClick == false) {
	    var speed = 200;
		this.insideCorner.animate({borderSpacing: 90},
			{
			    step: function (speed, fx) {
			        this.circleIcon.css(this.transform, 'translate(' + (-2 * speed) + 'px)');
				    this.lineOne.css(this.transform, 'translate(' + (speed / 200) + 'px,' + (-speed / 2) + 'px)');
				    this.lineTwo.css(this.transform, 'translate(' + (speed / 200) + 'px,' + (-speed/5) + 'px)');
				    this.lineThree.css(this.transform, 'translate(' + (speed / 200) + 'px,' + (speed / 5) + 'px)');
				    this.lineFour.css(this.transform, 'translate(' + (speed / 200) + 'px,' + (speed / 2) + 'px)');
			}.bind(this)
			, duration: 1000});
			
			this.textPages.delay(600).animate({opacity: 1}, {duration: 1000});
			this.textPages.css('visibility', 'visible');
			this.navClick = true;
	}
}

/* click function for any part of the site that is not the main menu circle, resets the menu circle to hide menu text and transforms menu bars to their original positions */
SiteControls.prototype.resetCircleFunction = function(event){
	this.circleIcon.fadeIn(200);
	
	if(this.textPages.is(':visible')){
		this.textPages.css({
			opacity: 0,
			visibility: 'hidden'
		}).bind(this);
		var speed = 200;
		this.insideCorner.animate({borderSpacing: 0},
			{step: function(speed, fx){
				this.circleIcon.css(this.transform, 'translate(' + -(2 * speed) + 'px)');
				this.lineOne.css(this.transform, 'translate(' + (-speed / 200 ) + 'px,' + (-speed/2 ) + 'px)');
				this.lineTwo.css(this.transform, 'translate(' + (-speed / 200 ) + 'px,' + (-speed / 5) + 'px)');
				this.lineThree.css(this.transform, 'translate(' + (-speed / 200 ) + 'px,' + (speed / 5) + 'px)');
				this.lineFour.css(this.transform, 'translate(' + (-speed / 200) + 'px,' + (speed / 2) + 'px)');
				this.textOne.css(this.transform, 'translate(' + (-speed / 200) + 'px,' + (-speed / 4) + 'px)');
			}.bind(this)
			, duration: 1000}
		);
		
		this.navClick = false;
	}
}

/* click function for the circle menu options, grabs the innerHTML of the click text and uses that to call the associated HTML file for that page and loads it into the main page.
    this also scales down the circle menu icon to be smaller and moves it to the top left corner of the page. 
*/

SiteControls.prototype.textPagesClickFunction = function(event){
    this.circleIcon.fadeOut(300);
	
	this.header.animate({opacity: 0}, {duration: 500});
	this.mainContent.animate({opacity: 0}, {duration: 500});
	this.mainNav.animate({top: 105, left: 20}, {duration: 2000});
	this.mainNav.attr('id','scaleDown');
	
	this.pageName = event.currentTarget.getAttribute("name");
		
	switch(this.pageName){
	    case "Web Design":
	        this.fileName = 'web-design';
	        break;
	    case "Code Projects":
	        this.fileName = 'code-projects';
	        break;
	    case "Info":
	        this.fileName = 'info';
	        break;

	    default:
	        break;
	}

	this.mainContent.delay(1000).queue(function(e){
	    this.fillContent.load(this.fileName + ".html #innerContent");
	    e();
	}.bind(this)).fadeTo(500,1);

	this.header.delay(1000).fadeTo(800, 1);
    
	this.svgText.delay(1000).queue(function(e){
	    document.getElementById('headings').textContent = this.pageName;
	    e();
	}.bind(this)).fadeTo(800,1); 

}

/* function to show and hide former and current main content page*/
SiteControls.prototype.fillContentFunction = function(){
    if(this.fillContent.next().is(":hidden")){
        this.fillContent.next().slideDown('slow');
    } else if(this.fillContent.next().is(":visible")){
        this.fillContent.next().slideUp('slow');
    }
}

SiteControls.prototype.changeNavigationTextOnEnter = function () {
    this.style.fill = '#446a59';
}

SiteControls.prototype.resetNavigationTextOnExit = function () {
    this.style.fill = 'black';
}



$(document).ready(function () {

    // create instance of the SiteControls class.
    var MyControls = new SiteControls();
});


