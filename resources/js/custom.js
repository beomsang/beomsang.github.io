(function($) {
	"use strict";
	$(window).on('load', function () {
      	$('#preloader-active').delay(450).fadeOut('slow');
      	$('.main').delay(450).css({
        	'overflow': 'visible'
      	});
    });
});

