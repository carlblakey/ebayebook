
$(function() {
  $('.acc_ctrl').on('click', function(e) {
    e.preventDefault();
    if ($(this).hasClass('active')) {
      $(this).removeClass('active');
      $(this).next()
      .stop()
      .slideUp(300);
    } else {
      $(this).addClass('active');
      $(this).next()
      .stop()
      .slideDown(300);
    }
  });
});

(function() {
  // Horizontal Timeline - by CodyHouse.co
  var HorizontalTimeline = function(element) {
		this.element = element;
		this.datesContainer = this.element.getElementsByClassName('cd-h-timeline__dates')[0];
		this.line = this.datesContainer.getElementsByClassName('cd-h-timeline__line')[0]; // grey line in the top timeline section
		this.fillingLine = this.datesContainer.getElementsByClassName('cd-h-timeline__filling-line')[0]; // green filling line in the top timeline section  
		this.date = this.line.getElementsByClassName('cd-h-timeline__date');
		this.selectedDate = this.line.getElementsByClassName('cd-h-timeline__date--selected')[0];
		this.dateValues = parseDate(this);
		this.minLapse = calcMinLapse(this);
		this.navigation = this.element.getElementsByClassName('cd-h-timeline__navigation');
		this.contentWrapper = this.element.getElementsByClassName('cd-h-timeline__events')[0];
		this.content = this.contentWrapper.getElementsByClassName('cd-h-timeline__event');
		
		this.eventsMinDistance = 60; // min distance between two consecutive events (in px)
		this.eventsMaxDistance = 200; // max distance between two consecutive events (in px)
		this.translate = 0; // this will be used to store the translate value of this.line
		this.lineLength = 0; //total length of this.line
		
		// store index of selected and previous selected dates
		this.oldDateIndex = Util.getIndexInArray(this.date, this.selectedDate);
		this.newDateIndex = this.oldDateIndex;

		initTimeline(this);
		initEvents(this);
  };

  function initTimeline(timeline) {
  	// set dates left position
  	var left = 0;
		for (var i = 0; i < timeline.dateValues.length; i++) { 
			var j = (i == 0) ? 0 : i - 1;
	    var distance = daydiff(timeline.dateValues[j], timeline.dateValues[i]),
	    	distanceNorm = (Math.round(distance/timeline.minLapse) + 2)*timeline.eventsMinDistance;
	
	    if(distanceNorm < timeline.eventsMinDistance) {
	    	distanceNorm = timeline.eventsMinDistance;
	    } else if(distanceNorm > timeline.eventsMaxDistance) {
	    	distanceNorm = timeline.eventsMaxDistance;
	    }
	    left = left + distanceNorm;
	    timeline.date[i].setAttribute('style', 'left:' + left+'px');
		}
		
		// set line/filling line dimensions
    timeline.line.style.width = (left + timeline.eventsMinDistance)+'px';
		timeline.lineLength = left + timeline.eventsMinDistance;
		// reveal timeline
		Util.addClass(timeline.element, 'cd-h-timeline--loaded');
		selectNewDate(timeline, timeline.selectedDate);
		resetTimelinePosition(timeline, 'next');
  };

  function initEvents(timeline) {
  	var self = timeline;
		// click on arrow navigation
		self.navigation[0].addEventListener('click', function(event){
			event.preventDefault();
			translateTimeline(self, 'prev');
		});
		self.navigation[1].addEventListener('click', function(event){
			event.preventDefault();
			translateTimeline(self, 'next');
		});

		//swipe on timeline
		new SwipeContent(self.datesContainer);
		self.datesContainer.addEventListener('swipeLeft', function(event){
			translateTimeline(self, 'next');
		});
		self.datesContainer.addEventListener('swipeRight', function(event){
			translateTimeline(self, 'prev');
		});

		//select a new event
		for(var i = 0; i < self.date.length; i++) {
			(function(i){
				self.date[i].addEventListener('click', function(event){
					event.preventDefault();
					selectNewDate(self, event.target);
				});

				self.content[i].addEventListener('animationend', function(event){
					if( i == self.newDateIndex && self.newDateIndex != self.oldDateIndex) resetAnimation(self);
				});
			})(i);
		}
  };

  function updateFilling(timeline) { // update fillingLine scale value
		var dateStyle = window.getComputedStyle(timeline.selectedDate, null),
			left = dateStyle.getPropertyValue("left"),
			width = dateStyle.getPropertyValue("width");
		
		left = Number(left.replace('px', '')) + Number(width.replace('px', ''))/2;
		timeline.fillingLine.style.transform = 'scaleX('+(left/timeline.lineLength)+')';
	};

  function translateTimeline(timeline, direction) { // translate timeline (and date elements)
  	var containerWidth = timeline.datesContainer.offsetWidth;
  	if(direction) {
  		timeline.translate = (direction == 'next') ? timeline.translate - containerWidth + timeline.eventsMinDistance : timeline.translate + containerWidth - timeline.eventsMinDistance;
  	}
    if( 0 - timeline.translate > timeline.lineLength - containerWidth ) timeline.translate = containerWidth - timeline.lineLength;
    if( timeline.translate > 0 ) timeline.translate = 0;

    timeline.line.style.transform = 'translateX('+timeline.translate+'px)';
    // update the navigation items status (toggle inactive class)
		(timeline.translate == 0 ) ? Util.addClass(timeline.navigation[0], 'cd-h-timeline__navigation--inactive') : Util.removeClass(timeline.navigation[0], 'cd-h-timeline__navigation--inactive');
		(timeline.translate == containerWidth - timeline.lineLength ) ? Util.addClass(timeline.navigation[1], 'cd-h-timeline__navigation--inactive') : Util.removeClass(timeline.navigation[1], 'cd-h-timeline__navigation--inactive');
  };

	function selectNewDate(timeline, target) { // ned date has been selected -> update timeline
		timeline.newDateIndex = Util.getIndexInArray(timeline.date, target);
		timeline.oldDateIndex = Util.getIndexInArray(timeline.date, timeline.selectedDate);
		Util.removeClass(timeline.selectedDate, 'cd-h-timeline__date--selected');
		Util.addClass(timeline.date[timeline.newDateIndex], 'cd-h-timeline__date--selected');
		timeline.selectedDate = timeline.date[timeline.newDateIndex];
		updateOlderEvents(timeline);
		updateVisibleContent(timeline);
		updateFilling(timeline);
	};

	function updateOlderEvents(timeline) { // update older events style
		for(var i = 0; i < timeline.date.length; i++) {
			(i < timeline.newDateIndex) ? Util.addClass(timeline.date[i], 'cd-h-timeline__date--older-event') : Util.removeClass(timeline.date[i], 'cd-h-timeline__date--older-event');
		}
	};

	function updateVisibleContent(timeline) { // show content of new selected date
		if (timeline.newDateIndex > timeline.oldDateIndex) {
			var classEntering = 'cd-h-timeline__event--selected cd-h-timeline__event--enter-right',
				classLeaving = 'cd-h-timeline__event--leave-left';
		} else if(timeline.newDateIndex < timeline.oldDateIndex) {
			var classEntering = 'cd-h-timeline__event--selected cd-h-timeline__event--enter-left',
				classLeaving = 'cd-h-timeline__event--leave-right';
		} else {
			var classEntering = 'cd-h-timeline__event--selected',
				classLeaving = '';
		}

		Util.addClass(timeline.content[timeline.newDateIndex], classEntering);
		if (timeline.newDateIndex != timeline.oldDateIndex) {
			Util.removeClass(timeline.content[timeline.oldDateIndex], 'cd-h-timeline__event--selected');
			Util.addClass(timeline.content[timeline.oldDateIndex], classLeaving);
			timeline.contentWrapper.style.height = timeline.content[timeline.newDateIndex].offsetHeight + 'px';
		}
	};

	function resetAnimation(timeline) { // reset content classes when entering animation is over
		timeline.contentWrapper.style.height = null;
		Util.removeClass(timeline.content[timeline.newDateIndex], 'cd-h-timeline__event--enter-right cd-h-timeline__event--enter-left');
		Util.removeClass(timeline.content[timeline.oldDateIndex], 'cd-h-timeline__event--leave-right cd-h-timeline__event--leave-left');
	};

	function keyNavigateTimeline(timeline, direction) { // navigate the timeline using the keyboard
		var newIndex = (direction == 'next') ? timeline.newDateIndex + 1 : timeline.newDateIndex - 1;
		if(newIndex < 0 || newIndex >= timeline.date.length) return;
		selectNewDate(timeline, timeline.date[newIndex]);
		resetTimelinePosition(timeline, direction);
	};
	
	function resetTimelinePosition(timeline, direction) { //translate timeline according to new selected event position
		var eventStyle = window.getComputedStyle(timeline.selectedDate, null),
			eventLeft = Number(eventStyle.getPropertyValue('left').replace('px', '')),
			timelineWidth = timeline.datesContainer.offsetWidth;

    if( (direction == 'next' && eventLeft >= timelineWidth - timeline.translate) || (direction == 'prev' && eventLeft <= - timeline.translate) ) {
    	timeline.translate = timelineWidth/2 - eventLeft;
    	translateTimeline(timeline, false);
    }
  };

  function parseDate(timeline) { // get timestamp value for each date
		var dateArrays = [];
		for(var i = 0; i < timeline.date.length; i++) {
			var singleDate = timeline.date[i].getAttribute('data-date'),
				dateComp = singleDate.split('T');
			
			if( dateComp.length > 1 ) { //both DD/MM/YEAR and time are provided
				var dayComp = dateComp[0].split('/'),
					timeComp = dateComp[1].split(':');
			} else if( dateComp[0].indexOf(':') >=0 ) { //only time is provide
				var dayComp = ["2000", "0", "0"],
					timeComp = dateComp[0].split(':');
			} else { //only DD/MM/YEAR
				var dayComp = dateComp[0].split('/'),
					timeComp = ["0", "0"];
			}
			var	newDate = new Date(dayComp[2], dayComp[1]-1, dayComp[0], timeComp[0], timeComp[1]);
			dateArrays.push(newDate);
		}
	  return dateArrays;
  };

  function calcMinLapse(timeline) { // determine the minimum distance among events
		var dateDistances = [];
		for(var i = 1; i < timeline.dateValues.length; i++) { 
	    var distance = daydiff(timeline.dateValues[i-1], timeline.dateValues[i]);
	    if(distance > 0) dateDistances.push(distance);
		}

		return (dateDistances.length > 0 ) ? Math.min.apply(null, dateDistances) : 86400000;
	};

	function daydiff(first, second) { // time distance between events
		return Math.round((second-first));
	};

  window.HorizontalTimeline = HorizontalTimeline;

  var horizontalTimeline = document.getElementsByClassName('js-cd-h-timeline'),
  	horizontalTimelineTimelineArray = [];
  if(horizontalTimeline.length > 0) {
		for(var i = 0; i < horizontalTimeline.length; i++) {
			horizontalTimelineTimelineArray.push(new HorizontalTimeline(horizontalTimeline[i])); 
		}
		// navigate the timeline when inside the viewport using the keyboard
		document.addEventListener('keydown', function(event){
			if( (event.keyCode && event.keyCode == 39) || ( event.key && event.key.toLowerCase() == 'arrowright') ) {
				updateHorizontalTimeline('next'); // move to next event
			} else if((event.keyCode && event.keyCode == 37) || ( event.key && event.key.toLowerCase() == 'arrowleft')) {
				updateHorizontalTimeline('prev'); // move to prev event
			}
		});
  };

  function updateHorizontalTimeline(direction) {
		for(var i = 0; i < horizontalTimelineTimelineArray.length; i++) {
			if(elementInViewport(horizontalTimeline[i])) keyNavigateTimeline(horizontalTimelineTimelineArray[i], direction);
		}
  };

  /*
		How to tell if a DOM element is visible in the current viewport?
		http://stackoverflow.com/questions/123999/how-to-tell-if-a-dom-element-is-visible-in-the-current-viewport
	*/
	function elementInViewport(el) {
		var top = el.offsetTop;
		var left = el.offsetLeft;
		var width = el.offsetWidth;
		var height = el.offsetHeight;

		while(el.offsetParent) {
		    el = el.offsetParent;
		    top += el.offsetTop;
		    left += el.offsetLeft;
		}

		return (
		    top < (window.pageYOffset + window.innerHeight) &&
		    left < (window.pageXOffset + window.innerWidth) &&
		    (top + height) > window.pageYOffset &&
		    (left + width) > window.pageXOffset
		);
	}
}());


// Expaning Panels

$(function() {
	
	window.setTimeout(function() {
		$('.expand-panels-container').css('opacity', '1');
	}, 2000);

	$('.expand-panels').addClass('default');
	
		$('.expand-panels').on('click', function() {
	
	  	var e = $('.expand-panels-container > .expand-panels');
			if(e.hasClass('expand')){
				 e.removeClass('expand');
			 	$(this).addClass('expand');
			} else { $(this).addClass('expand'); }
		})
})

// Accessible Accordions 1

var accordion = $('body').find('[data-behavior="accordion-2"]');
var expandedClass = 'is-expanded';

$.each(accordion, function () { // loop through all accordions on the page

  var accordionItems = $(this).find('[data-binding="expand-accordion-item"]');

  $.each(accordionItems, function () { // loop through all accordion items of each accordion
    var $this = $(this);
    var triggerBtn = $this.find('[data-binding="expand-accordion-trigger"]');
    
    var setHeight = function (nV) {
      // set height of inner content for smooth animation
      var innerContent = nV.find('.accordion-2__content-inner')[0],
          maxHeight = $(innerContent).outerHeight(),
          content = nV.find('.accordion-2__content')[0];

      if (!content.style.height || content.style.height === '0px') {
        $(content).css('height', maxHeight);
      } else {
        $(content).css('height', '0px');
      }
    };
    
    var toggleClasses = function (event) {
      var clickedItem = event.currentTarget;
      var currentItem = $(clickedItem).parent();
      var clickedContent = $(currentItem).find('.accordion-2__content')
      $(currentItem).toggleClass(expandedClass);
      setHeight(currentItem);
      
      if ($(currentItem).hasClass('is-expanded')) {
        $(clickedItem).attr('aria-selected', 'true');
        $(clickedItem).attr('aria-expanded', 'true');
        $(clickedContent).attr('aria-hidden', 'false');

      } else {
        $(clickedItem).attr('aria-selected', 'false');
        $(clickedItem).attr('aria-expanded', 'false');
        $(clickedContent).attr('aria-hidden', 'true');
      }
    }
    
    triggerBtn.on('click', event, function (e) {
      e.preventDefault();
      toggleClasses(event);
    });

    // open tabs if the spacebar or enter button is clicked whilst they are in focus
    $(triggerBtn).on('keydown', event, function (e) {
      if (e.keyCode === 13 || e.keyCode === 32) {
        e.preventDefault();
        toggleClasses(event);
      }
    });
  });

});

// Accessible Accordions 2

var accordion = $('body').find('[data-behavior="accordion-3"]');
var expandedClass = 'is-expanded';

$.each(accordion, function () { // loop through all accordions on the page

  var accordionItems = $(this).find('[data-binding="expand-accordion-item"]');

  $.each(accordionItems, function () { // loop through all accordion items of each accordion
    var $this = $(this);
    var triggerBtn = $this.find('[data-binding="expand-accordion-trigger"]');
    
    var setHeight = function (nV) {
      // set height of inner content for smooth animation
      var innerContent = nV.find('.accordion-3__content-inner')[0],
          maxHeight = $(innerContent).outerHeight(),
          content = nV.find('.accordion-3__content')[0];

      if (!content.style.height || content.style.height === '0px') {
        $(content).css('height', maxHeight);
      } else {
        $(content).css('height', '0px');
      }
    };
    
    var toggleClasses = function (event) {
      var clickedItem = event.currentTarget;
      var currentItem = $(clickedItem).parent();
      var clickedContent = $(currentItem).find('.accordion-3__content')
      $(currentItem).toggleClass(expandedClass);
      setHeight(currentItem);
      
      if ($(currentItem).hasClass('is-expanded')) {
        $(clickedItem).attr('aria-selected', 'true');
        $(clickedItem).attr('aria-expanded', 'true');
        $(clickedContent).attr('aria-hidden', 'false');

      } else {
        $(clickedItem).attr('aria-selected', 'false');
        $(clickedItem).attr('aria-expanded', 'false');
        $(clickedContent).attr('aria-hidden', 'true');
      }
    }
    
    triggerBtn.on('click', event, function (e) {
      e.preventDefault();
      toggleClasses(event);
    });

    // open tabs if the spacebar or enter button is clicked whilst they are in focus
    $(triggerBtn).on('keydown', event, function (e) {
      if (e.keyCode === 13 || e.keyCode === 32) {
        e.preventDefault();
        toggleClasses(event);
      }
    });
  });

});


// New accordion 1

var accordion1 = (function(){
  
  var $accordion1 = $('.js-accordion');
  var $accordion_header = $accordion1.find('.js-accordion-header');
  var $accordion_item = $('.js-accordion-item');
 
  // default settings 
  var settings = {
    // animation speed
    speed: 400,
    
    // close all other accordion items if true
    oneOpen: false
  };
    
  return {
    // pass configurable object literal
    init: function($settings) {
      $accordion_header.on('click', function() {
        accordion1.toggle($(this));
      });
      
      $.extend(settings, $settings); 
      
      // ensure only one accordion is active if oneOpen is true
      if(settings.oneOpen && $('.js-accordion-item.active').length > 1) {
        $('.js-accordion-item.active:not(:first)').removeClass('active');
      }
      
      // reveal the active accordion bodies
      $('.js-accordion-item.active').find('> .js-accordion-body').show();
    },
    toggle: function($this) {
            
      if(settings.oneOpen && $this[0] != $this.closest('.js-accordion').find('> .js-accordion-item.active > .js-accordion-header')[0]) {
        $this.closest('.js-accordion')
               .find('> .js-accordion-item') 
               .removeClass('active')
               .find('.js-accordion-body')
               .slideUp()
      }
      
      // show/hide the clicked accordion item
      $this.closest('.js-accordion-item').toggleClass('active');
      $this.next().stop().slideToggle(settings.speed);
    }
  }
})();

$(document).ready(function(){
  accordion1.init({ speed: 300, oneOpen: true });
});



// background image
$( ".cover-image" ).each(function() {
			  var attr = $(this).attr('data-image-src');

			  if (typeof attr !== typeof undefined && attr !== false) {
				  $(this).css('background', 'url('+attr+') center center');

			  }

	});


// Social tools hover #1

console.clear();

document.querySelector(".animate-tools").addEventListener("click", doCoolStuff);
document.querySelector(".animate-tools").addEventListener("onclick", doCoolStuff);

const tl4 = new TimelineMax();

//ScrubGSAPTimeline(tl);

tl4.from(".social01", {
    duration: 1.75, 
    opacity: 0, 
    y: "-=75", 
	//delay: 1,
  	//rotate: "random(-50, 50)",
    stagger: 0.05,
    ease: "elastic.inOut(1,.5)",
  });

tl4.reversed(true);

function doCoolStuff() {
 tl4.reversed(!tl4.reversed());
}

// Social tools hover #2

console.clear();

document.querySelector(".animate-tools-02").addEventListener("click", doCoolStuff2);
document.querySelector(".animate-tools-02").addEventListener("onclick", doCoolStuff2);

const tl5 = new TimelineMax();

tl5.from(".social02", {
    duration: 1.75, 
    opacity: 0, 
    y: "-=75", 
	//delay: 1,
  	//rotate: "random(-50, 50)",
    stagger: 0.05,
    ease: "elastic.inOut(1,.5)",
  });

tl5.reversed(true);

function doCoolStuff2() {
 tl5.reversed(!tl5.reversed());
}

// Social tools hover #3

console.clear();

document.querySelector(".animate-tools-03").addEventListener("click", doCoolStuff3);
document.querySelector(".animate-tools-03").addEventListener("onclick", doCoolStuff3);

const tl6 = new TimelineMax();

tl6.from(".social03", {
    duration: 1.75, 
    opacity: 0, 
    y: "-=75", 
	//delay: 1,
  	//rotate: "random(-50, 50)",
    stagger: 0.05,
    ease: "elastic.inOut(1,.5)",
  });

tl6.reversed(true);

function doCoolStuff3() {
 tl6.reversed(!tl6.reversed());
}


// Social tools hover #4

console.clear();

document.querySelector(".animate-tools-04").addEventListener("click", doCoolStuff4);
document.querySelector(".animate-tools-04").addEventListener("onclick", doCoolStuff4);

const tl7 = new TimelineMax();

tl7.from(".social04", {
    duration: 1.75, 
    opacity: 0, 
    y: "-=75", 
	//delay: 1,
  	//rotate: "random(-50, 50)",
    stagger: 0.05,
    ease: "elastic.inOut(1,.5)",
  });

tl7.reversed(true);

function doCoolStuff4() {
 tl7.reversed(!tl7.reversed());
}


// Social tools hover #5

console.clear();

document.querySelector(".animate-tools-05").addEventListener("click", doCoolStuff5);
document.querySelector(".animate-tools-05").addEventListener("onclick", doCoolStuff5);

const tl8 = new TimelineMax();

tl8.from(".social05", {
    duration: 1.75, 
    opacity: 0, 
    y: "-=75", 
	//delay: 1,
  	//rotate: "random(-50, 50)",
    stagger: 0.05,
    ease: "elastic.inOut(1,.5)",
  });

tl8.reversed(true);

function doCoolStuff5() {
 tl8.reversed(!tl8.reversed());
}


// Social tools hover #6

console.clear();

document.querySelector(".animate-tools-06").addEventListener("click", doCoolStuff6);
document.querySelector(".animate-tools-06").addEventListener("onclick", doCoolStuff6);

const tl9 = new TimelineMax();

tl9.from(".social06", {
    duration: 1.75, 
    opacity: 0, 
    y: "-=75", 
	//delay: 1,
  	//rotate: "random(-50, 50)",
    stagger: 0.05,
    ease: "elastic.inOut(1,.5)",
  });

tl9.reversed(true);

function doCoolStuff6() {
 tl9.reversed(!tl9.reversed());
}






// Button Change Content

$(document).ready(function(){
    $(".social-tools").click(function(){
        $(this).toggleClass("animate-tools-is-active");
    });
});

// Slider

jQuery(document).ready(function ($) {

  $('#checkbox').change(function(){
    setInterval(function () {
        moveRight();
    }, 3000);
  });
  
	var slideCount = $('#slider ul li').length;
	var slideWidth = $('#slider ul li').width();
	var slideHeight = $('#slider ul li').height();
	var sliderUlWidth = slideCount * slideWidth;
	
	$('#slider').css({ width: slideWidth, height: slideHeight });
	
	$('#slider ul').css({ width: sliderUlWidth, marginLeft: - slideWidth });
	
    $('#slider ul li:last-child').prependTo('#slider ul');

    function moveLeft() {
        $('#slider ul').animate({
            left: + slideWidth
        }, 700, function () {
            $('#slider ul li:last-child').prependTo('#slider ul');
            $('#slider ul').css('left', '');
        });
    };

    function moveRight() {
        $('#slider ul').animate({
            left: - slideWidth
        },700, function () {
            $('#slider ul li:first-child').appendTo('#slider ul');
            $('#slider ul').css('left', '');
        });
    };

    $('a.control_prev').click(function () {
        moveLeft();
    });

    $('a.control_next').click(function () {
        moveRight();
    });

});    


if ("onhashchange" in window) {
  window.onhashchange = function () {
      stopVideos()
  }
}
else {
  var storedHash = window.location.hash;
  window.setInterval(function () {
      if (window.location.hash != storedHash) {
          storedHash = window.location.hash;
          stopVideos()
      }
  }, 100);
}

function stopVideos(){
  const videos = document.querySelectorAll('video')
  videos.forEach(video => {
      video.pause()
  })
}

// tabs

$(document).ready(function(){
	
	$('ul.tabs-02 li').click(function(){
		var tab_id = $(this).attr('data-tab');

		$('ul.tabs-02 li').removeClass('current');
		$('.tab-content').removeClass('current');

		$(this).addClass('current');
		$("#"+tab_id).addClass('current');
	})

})

