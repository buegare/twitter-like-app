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

	function removeClass(elements, myclass) {
		$(elements).removeClass(myclass);
	}

	removeClass(".nav-links a", "add-border-to-nav-links");

	$(".nav-links a").hover(
	  function () {
	    $(this).toggleClass("add-border-to-nav-links");
	  }
	);


	// Get what is typed into the search box and send to controller
	
	$('#search-suggestions-box').hide();
	$('#search-box').keyup(function(){
		var content = $('#search-box').val();

		if ( content !== "" ) {
			$.ajax({
				url: "search_users",
				type: "GET",
				data:{ content_from_search_box: content}
			});

			$('#search-suggestions-box').show();
		} else {
			$('#search-suggestions-box').hide();
		}
	});



	// Apply class to button on show view and change its text

	if ( $(".friendship-button-b").val() === "Following" ) {
		$( ".friendship-button-b" ).removeClass( "btn-default" );
		$( ".friendship-button-b" ).addClass( "btn-primary" );
	}

	$(".friendship-button-b").hover(
		  function() {
		      	if ( $(".friendship-button-b").val() === "Following" ) {
			      	$(this).val("Unfollow");
			    	$( this ).removeClass( "btn-primary" );
			    	$( this ).addClass( "btn-danger" );
		    	}
		  }, function() {
		  		if ( $(".friendship-button-b").val() === "Unfollow" ) {
			  		$(this).val("Following");
			  		$( this ).removeClass( "btn-danger" );
			  		$( this ).addClass( "btn-primary" );
				}
		  }
	);


	$(".friendship-button-b").click(function() {
		if ( $(".friendship-button-b").val() === "Unfollow" ) {
			$( ".friendship-button-b" ).removeClass( "btn-danger" );
		  	$( ".friendship-button-b" ).addClass( "btn-default" );
		  	$(this).val("Follow");
		} else if ( $(".friendship-button-b").val() === "Follow" ) {
			$( ".friendship-button-b" ).removeClass( "btn-default" );
		  	$( ".friendship-button-b" ).addClass( "btn-primary" );
		  	$(this).val("Following");
		}
	});


	// Apply class to info-bar to add border

	$('.info-bar-hover').hover(
		function() {
		      	$(this).toggleClass("info-bar-border-color")
		  }
	);


});