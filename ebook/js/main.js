
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
    }

    function moveRight() {
        $('#slider ul').animate({
            left: - slideWidth
        },700, function () {
            $('#slider ul li:first-child').appendTo('#slider ul');
            $('#slider ul').css('left', '');
        });
    }

    $('a.control_prev').click(function () {
        moveLeft();
    });

    $('a.control_next').click(function () {
        moveRight();
    });
});    

// Slider 06

jQuery(document).ready(function ($) {

     
    var slideCount = $('#slider-06 ul li').length;
    var slideWidth = $('#slider-06 ul li').width();
    var slideHeight = $('#slider-06 ul li').height();
    var sliderUlWidth = slideCount * slideWidth;
    
    $('#slider-06').css({ width: slideWidth, height: slideHeight });
    
    $('#slider-06 ul').css({ width: sliderUlWidth, marginLeft: - slideWidth });
    
    $('#slider-06 ul li:last-child').prependTo('#slider-06 ul');

    function moveLeft() {
        $('#slider-06 ul').animate({
            left: + slideWidth
        }, 700, function () {
            $('#slider-06 ul li:last-child').prependTo('#slider-06 ul');
            $('#slider-06 ul').css('left', '');
        });
    }

    function moveRight() {
        $('#slider-06 ul').animate({
            left: - slideWidth
        },700, function () {
            $('#slider-06 ul li:first-child').appendTo('#slider-06 ul');
            $('#slider-06 ul').css('left', '');
        });
    }

    $('a.control_prev-06').click(function () {
        moveLeft();
    });

    $('a.control_next-06').click(function () {
        moveRight();
    });

}); 

// Slider 07

jQuery(document).ready(function ($) {
     
    var slideCount = $('#slider-07 ul li').length;
    var slideWidth = $('#slider-07 ul li').width();
    var slideHeight = $('#slider-07 ul li').height();
    var sliderUlWidth = slideCount * slideWidth;
    
    $('#slider-07').css({ width: slideWidth, height: slideHeight });
    
    $('#slider-07 ul').css({ width: sliderUlWidth, marginLeft: - slideWidth });
    
    $('#slider-07 ul li:last-child').prependTo('#slider-07 ul');

    function moveLeft() {
        $('#slider-07 ul').animate({
            left: + slideWidth
        }, 700, function () {
            $('#slider-07 ul li:last-child').prependTo('#slider-07 ul');
            $('#slider-07 ul').css('left', '');
        });
    }

    function moveRight() {
        $('#slider-07 ul').animate({
            left: - slideWidth
        },700, function () {
            $('#slider-07 ul li:first-child').appendTo('#slider-07 ul');
            $('#slider-07 ul').css('left', '');
        });
    }

    $('a.control_prev-07').click(function () {
        moveLeft();
    });

    $('a.control_next-07').click(function () {
        moveRight();
    });

}); 



// Stop videos from playing on page turn

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