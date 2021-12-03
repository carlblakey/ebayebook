
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


// Slider 02

jQuery(document).ready(function ($) {

    $('#checkbox').change(function(){
      setInterval(function () {
          moveRight();
      }, 3000);
    });
    
      var slideCount = $('#slider-02 ul li').length;
      var slideWidth = $('#slider-02 ul li').width();
      var slideHeight = $('#slider-02 ul li').height();
      var sliderUlWidth = slideCount * slideWidth;
      
      $('#slider-02').css({ width: slideWidth, height: slideHeight });
      
      $('#slider-02 ul').css({ width: sliderUlWidth, marginLeft: - slideWidth });
      
      $('#slider-02 ul li:last-child').prependTo('#slider-02 ul');
  
      function moveLeft() {
          $('#slider-02 ul').animate({
              left: + slideWidth
          }, 700, function () {
              $('#slider-02 ul li:last-child').prependTo('#slider-02 ul');
              $('#slider-02 ul').css('left', '');
          });
      }
  
      function moveRight() {
          $('#slider-02 ul').animate({
              left: - slideWidth
          },700, function () {
              $('#slider-02 ul li:first-child').appendTo('#slider-02 ul');
              $('#slider-02 ul').css('left', '');
          });
      }
  
      $('a.control_prev').click(function () {
          moveLeft();
      });
  
      $('a.control_next').click(function () {
          moveRight();
      });
  
  });    

// Slider 03

jQuery(document).ready(function ($) {

    $('#checkbox').change(function(){
      setInterval(function () {
          moveRight();
      }, 3000);
    });
    
      var slideCount = $('#slider-03 ul li').length;
      var slideWidth = $('#slider-03 ul li').width();
      var slideHeight = $('#slider-03 ul li').height();
      var sliderUlWidth = slideCount * slideWidth;
      
      $('#slider-03').css({ width: slideWidth, height: slideHeight });
      
      $('#slider-03 ul').css({ width: sliderUlWidth, marginLeft: - slideWidth });
      
      $('#slider-03 ul li:last-child').prependTo('#slider-03 ul');
  
      function moveLeft() {
          $('#slider-03 ul').animate({
              left: + slideWidth
          }, 700, function () {
              $('#slider-03 ul li:last-child').prependTo('#slider-03 ul');
              $('#slider-03 ul').css('left', '');
          });
      }
  
      function moveRight() {
          $('#slider-03 ul').animate({
              left: - slideWidth
          },700, function () {
              $('#slider-03 ul li:first-child').appendTo('#slider-03 ul');
              $('#slider-03 ul').css('left', '');
          });
      }
  
      $('a.control_prev').click(function () {
          moveLeft();
      });
  
      $('a.control_next').click(function () {
          moveRight();
      });
  
  });    

// Slider 04

jQuery(document).ready(function ($) {

    $('#checkbox').change(function(){
      setInterval(function () {
          moveRight();
      }, 3000);
    });
    
      var slideCount = $('#slider-04 ul li').length;
      var slideWidth = $('#slider-04 ul li').width();
      var slideHeight = $('#slider-04 ul li').height();
      var sliderUlWidth = slideCount * slideWidth;
      
      $('#slider-04').css({ width: slideWidth, height: slideHeight });
      
      $('#slider-04 ul').css({ width: sliderUlWidth, marginLeft: - slideWidth });
      
      $('#slider-04 ul li:last-child').prependTo('#slider-04 ul');
  
      function moveLeft() {
          $('#slider-04 ul').animate({
              left: + slideWidth
          }, 700, function () {
              $('#slider-04 ul li:last-child').prependTo('#slider-04 ul');
              $('#slider-04 ul').css('left', '');
          });
      }
  
      function moveRight() {
          $('#slider-04 ul').animate({
              left: - slideWidth
          },700, function () {
              $('#slider-04 ul li:first-child').appendTo('#slider-04 ul');
              $('#slider-04 ul').css('left', '');
          });
      }
  
      $('a.control_prev').click(function () {
          moveLeft();
      });
  
      $('a.control_next').click(function () {
          moveRight();
      });
  
  });    


// Slider 05

jQuery(document).ready(function ($) {

    $('#checkbox').change(function(){
      setInterval(function () {
          moveRight();
      }, 3000);
    });
    
      var slideCount = $('#slider-05 ul li').length;
      var slideWidth = $('#slider-05 ul li').width();
      var slideHeight = $('#slider-05 ul li').height();
      var sliderUlWidth = slideCount * slideWidth;
      
      $('#slider-05').css({ width: slideWidth, height: slideHeight });
      
      $('#slider-05 ul').css({ width: sliderUlWidth, marginLeft: - slideWidth });
      
      $('#slider-05 ul li:last-child').prependTo('#slider-05 ul');
  
      function moveLeft() {
          $('#slider-05 ul').animate({
              left: + slideWidth
          }, 700, function () {
              $('#slider-05 ul li:last-child').prependTo('#slider-05 ul');
              $('#slider-05 ul').css('left', '');
          });
      }
  
      function moveRight() {
          $('#slider-05 ul').animate({
              left: - slideWidth
          },700, function () {
              $('#slider-05 ul li:first-child').appendTo('#slider-05 ul');
              $('#slider-05 ul').css('left', '');
          });
      }
  
      $('a.control_prev').click(function () {
          moveLeft();
      });
  
      $('a.control_next').click(function () {
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