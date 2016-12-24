// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or any plugin's vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file. JavaScript code in this file should be added after the last require_* statement.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery
//= require jquery_ujs
//= require twitter/bootstrap
//= require turbolinks
//= require_tree .

$(document).on('turbolinks:load', function() {

	// make text area small, hide button and counter
  	$( "#txt-area" ).css( "height", "35px" );
	$("#tweet-btn").hide();
	$("#counter").hide();

	// make text area expand, button and counter to show on click
	$( "#txt-area" ).click(function() {
	  $(this).css( "height", "90px" );
	  $("#tweet-btn").show().prop("disabled",true);
	  $("#counter").show();
	});


	$( '#txt-area' ).keyup(function(e) {
	  $character = $('#txt-area').val().length;

	  if ( e.keyCode == 32 ) {
	  	$('#counter').text( 140 - $character);
	  } else {
	  	  $('#counter').text( 140 - $character);
		  if ( $character > 0 && $character < 141 ) {
				$("#tweet-btn").prop("disabled",false);
			} else {
				$("#tweet-btn").prop("disabled",true);
			}
		}

	});


	// $( "#tweet-area-div" ).focusout(function() {
	// 	$("#txt-area").css( "height", "35px" );
	//   	$("#tweet-btn").hide();
	// });

	// Apply class when mouse hovers over options on navbar
	// $(".add-border-to-nav-links").hover(
	//   function () {
	//     $(this).addClass("add-border-to-nav-links");
	//   },
	//   function () {
	//     $(this).removeClass("add-border-to-nav-links");
	//   }
	// );

});