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

	
	/*************************************************
	*******		Tweet creation area 		**********
	*************************************************/
	
	// hide button and counter

	$("#tweet-btn").hide();
	$("#counter").hide();

	// make text area expand, button and counter to show on click
	$( "#txt-area" ).click(function() {
	  $(this).css( "height", "80px" );
	  $(this).addClass('txt-area-expanded');
	  $( "#tweet-area-div" ).css( "height", "150px" );
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
				if ( 140 - $character <= 10 ) {
					$('#counter').css("color", "red");
				} else {
					$('#counter').css("color", "#707e88");
				}
			} else {
				$("#tweet-btn").prop("disabled",true);
				if ( 140 - $character <= 10 ) {
					$('#counter').css("color", "red");
				} else {
					$('#counter').css("color", "#707e88");
				}
			}
		}

	});
	
	/*************************************************
	*******		navbar links        		**********
	*************************************************/


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



	/*************************************************
	*******		Search box          		**********
	*************************************************/

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


	/*************************************************
	*******		Search box suggestions 		**********
	*************************************************/

	$(document).mouseup(function (e) {
	    var container = $("#search-suggestions-box");

	    // if the target of the click isn't the container...
	    // ... nor a descendant of the container
	    if (!container.is(e.target) && container.has(e.target).length === 0) {
	        container.hide();
	        e.stopPropagation();
	    };

	    var txtarea = $("#txt-area");
	    var tweetbtn = $("#tweet-btn");

		if (!txtarea.is(e.target) && !tweetbtn.is(e.target)) {
	        txtarea.css("height", "36px");
	        $('#tweet-area-div').css("height", "58px");
	        tweetbtn.hide();
	        $("#counter").hide();
	        e.stopPropagation();
	    }

	});	

	/*************************************************
	*******		Friendship button   		**********
	*************************************************/


	// Apply class to button on show view and change its text

	var buttons = $('.friendship-button-b')

	buttons.each(function() {
		if ( $(this).val() === "Following" ) {
			$(this).removeClass( "btn-default" );
			$(this).addClass( "btn-primary" );
		}	  
	});

	$(".friendship-button-b").hover(
		  function() {
		      	if ( $(this).val() === "Following" ) {
			      	$(this).val("Unfollow");
			    	$( this ).removeClass( "btn-primary" );
			    	$( this ).addClass( "btn-danger" );
		    	}
		  }, function() {
		  		if ( $(this).val() === "Unfollow" ) {
			  		$(this).val("Following");
			  		$( this ).removeClass( "btn-danger" );
			  		$( this ).addClass( "btn-primary" );
				}
		  }
	);


	$(".friendship-button-b").click(function() {
		if ( $(this).val() === "Unfollow" ) {
			$(this).removeClass( "btn-danger" );
		  	$(this).addClass( "btn-default" );
		  	$(this).val("Follow");
		} else if ( $(this).val() === "Follow" ) {
			$(this).removeClass( "btn-default" );
		  	$(this).addClass( "btn-primary" );
		  	$(this).val("Following");
		}
	});


	/*************************************************
	*******		info-bar            		**********
	*************************************************/


	// Apply class to info-bar to add border

	$('.info-bar-hover').hover(function() {
		    $(this).toggleClass("info-bar-border-color")
		  }
	);

	/*************************************************
	*******		navbar-dropdown            	**********
	*************************************************/

	$(document).mouseup(function (e) {
	    var dropdown = $('#navbar-dropdown');
	    var navbar_image = $('#nav-bar-image');

	    if (navbar_image.is(e.target) && !dropdown.is(':visible')) {
    		dropdown.show();
    		e.stopPropagation();
		} else if (navbar_image.is(e.target) && dropdown.is(':visible')) {
    		dropdown.hide();
    		e.stopPropagation();
		} else if (!dropdown.is(e.target) && dropdown.has(e.target).length === 0) {
    		dropdown.hide();
    		e.stopPropagation();
		}

	});

});