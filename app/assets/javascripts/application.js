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
	*******		Functions           		**********
	*************************************************/

 	function IMGPreview(input, location) {
        if (input.files && input.files[0]) {
            var reader = new FileReader();
            reader.onload = function (e) {
                $(location).css('background-image', 'url(' + e.target.result + ')');
            }
            
            reader.readAsDataURL(input.files[0]);
        }
    }

	
	/*************************************************
	*******		Tweet creation area 		**********
	*************************************************/
	
	function ClickTweetCreationEvent() {
		$('#txt-area').css("height", "80px");
		$('#txt-area').addClass('txt-area-expanded');
		$( "#tweet-area-div" ).css( "height", "150px" );
		$("#tweet-btn").show().prop("disabled",true);
		$("#counter, #camera").show();
	};

	$( "#txt-area" ).on('click.tweet_creation_event', ClickTweetCreationEvent);

	// Change counter and enable/disable button
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


  function MouseUpTweetCreationEvent(e) {
		var txtarea = $("#txt-area");
	    var tweetbtn = $("#tweet-btn");
	    var camera = $("#camera");

		if (!txtarea.is(e.target) && !tweetbtn.is(e.target) && !camera.is(e.target)) {
	        txtarea.css("height", "36px");
	        txtarea.removeClass('txt-area-expanded');
	        $('#tweet-area-div').css("height", "58px");
	        tweetbtn.hide();
	        $("#counter").hide();
	        camera.hide();
	        e.stopPropagation();
	    }
    }

  $(document).on('mouseup.tweet_creation_event', MouseUpTweetCreationEvent);
	
	// Activate the file button
	$("#camera").click(function() {
		$('#tweet-creaton-choose-photo-btn').click();
	});

	$("#tweet-creaton-choose-photo-btn").change(function() {
		IMGPreview(this, '#tweet-area-attachments-target');
		$('#remove-photo').show();
		$("#tweet-area-div").css("height", "312px");
		$('#tweet-area-options').css('margin-top', '80px');
		$('#tweet-area-attachments, #tweet-area-attachments-target').show();
		$(document).unbind('mouseup.tweet_creation_event');
		$("#txt-area").unbind('click.tweet_creation_event');
	});

	$('#remove-photo').click(function() {
		$('#tweet-area-attachments-target, #remove-photo').fadeOut('slow', function() {
			$('#tweet-area-attachments').hide();
			$('#tweet-creaton-choose-photo-btn').val('')
			$("#tweet-area-div").css('height', '150px');
			$(document).bind('mouseup.tweet_creation_event', MouseUpTweetCreationEvent);
			$("#txt-area").bind('click.tweet_creation_event', ClickTweetCreationEvent);
		});
		
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

	$(document).mouseup(function(e) {
	    var container = $("#search-suggestions-box");

	    // if the target of the click isn't the container...
	    // ... nor a descendant of the container
	    if (!container.is(e.target) && container.has(e.target).length === 0) {
	        container.hide();
	        e.stopPropagation();
	    };
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
		} else if ( $(this).val() === "Edit Profile" ) {
			$('#overlay').show();
		}
	});

	$("#edit-profile-button").click(function() {
		$('#image-header').css('position', 'relative');
		$('.navbar-custom').css('z-index', 996)
		$('#overlay, #profile-edit-cancel, #profile-edit-save, #image-header-edit, #image-header, #image-header>span, #image-header>h3, #user-info-show-edit, #user-info-show span, #user-info-show h3').show();
	});

	$('#profile-edit-cancel').click(function() {
		$('#image-header').css('position', '');
		$('.navbar-custom').css('z-index', 999)
		$('#overlay, #profile-edit-cancel, #profile-edit-save, #image-header-edit, #image-header>span, #image-header>h3, #user-info-show-edit, #user-info-show span, #user-info-show h3, #image-header-img-uploader, #show-user-profile-img-uploader').hide();
	});

	/*************************************************, 
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
	    var navbar_image = $('[id^="nav-bar-image"]');

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


	/*************************************************
	*******		user-info-img-uploader     	**********
	*************************************************/

	$('#user-info-img-uploader > li:nth-child(2)').click(function() {
		$('#user-info-img-uploader').hide();
	});


	$(document).mouseup(function (e) {
	    var img_uploader_menu = $('#user-info-img-uploader');
	    var user_info_img = $('#user-info-thumb-img, #user-info-owl');

	    if (user_info_img.is(e.target) && !img_uploader_menu.is(':visible')) {
    		img_uploader_menu.show();
    		e.stopPropagation();
    	} else if (user_info_img.is(e.target) && img_uploader_menu.is(':visible')) {
    		img_uploader_menu.hide();
    		e.stopPropagation();
		} else if (!img_uploader_menu.is(e.target) && img_uploader_menu.has(e.target).length === 0) {
    		img_uploader_menu.hide();
    		e.stopPropagation();
		}

	});


	$( "#user-info-img-uploader > li:first-child" ).click(function() {
		$('#choose-photo-btn').click();
	});

	$('#choose-photo-btn').change(function(event) {
		IMGPreview(this, '#img-target');
		$('#user-info-img-preview').modal();
	});

	$( "#img-save-btn" ).click(function() {
		$('#choose-photo-submit-btn').click();
	});

	/*************************************************
	*******		info message            	**********
	*************************************************/
	
	$('.msg').delay(2000).fadeOut('slow');

	/*************************************************
	*******		home user info hover       	**********
	*************************************************/

	$('.feed-image').hover(
		function(e) {
		    $(e.target.children[1]).slideDown('fast');
		  },

		function(e) {
			timer = setTimeout(function(){
			  $(e.target.children[1]).fadeOut();
			}, 500);
		}
	);

	$('.user-info-hover-feed').hover(
		function() {
		    clearTimeout(timer);
		  },

		function() {
			$(this).fadeOut();
		  }
	);


	/*************************************************
	*	user show img header and user img edit  ******
	*************************************************/


	$('#image-header-edit, #image-header span, #image-header h3').click(function() {
			
		if ( !$('#image-header-img-uploader').is(':visible') ) {
			$('#image-header-img-uploader').show();
			$('#show-user-profile-img-uploader').hide();
		} else {
			$('#image-header-img-uploader').hide();
		}

	});

	$("#image-header-img-uploader li:first-child").click(function() {
		$('#choose-photo-btn-img-header').click();
	});

	$("#choose-photo-btn-img-header").change(function() {
		$('#choose-photo-submit-btn-img-header').click();
	});

	$('#image-header-img-uploader li:last-child, #show-user-profile-img-uploader li:last-child').click(function() {
		$('#image-header').css('position', '');
		$('.navbar-custom').css('z-index', 999)
		$('#overlay, #profile-edit-cancel, #profile-edit-save, #image-header-edit, #image-header>span, #image-header>h3, #user-info-show-edit, #user-info-show span, #user-info-show h3, #image-header-img-uploader, #show-user-profile-img-uploader').hide();
	});


	$('#image-header span, #image-header h3').hover(function () {
	    $('#image-header-edit').css('border', '#1DA1F2 solid 5px');
	}, function () {
	    $('#image-header-edit').css('border', '');
	});

	// user profile img edit

	$('#user-info-show span, #user-info-show h3').hover(function () {
	    $('#user-info-show-edit').css('border', '#1DA1F2 solid 5px');
	}, function () {
	    $('#user-info-show-edit').css('border', '');
	});

	$('#user-info-show-edit, #user-info-show span, #user-info-show h3').click(function() {
		
		if ( !$('#show-user-profile-img-uploader').is(':visible') ) {
			$('#show-user-profile-img-uploader').show();
			$('#image-header-img-uploader').hide();
		} else {
			$('#show-user-profile-img-uploader').hide();
		}

	});

	$("#show-user-profile-img-uploader li:first-child").click(function() {
		$('#choose-photo-btn-user-profile-img').click();
	});

	$("#choose-photo-btn-user-profile-img").change(function() {
		$('#choose-photo-submit-btn-user-profile-img').click();
	});


	/*************************************************
	*******				signup 				    ******
	*************************************************/

	$( "#signup-owl" ).animate({
	    top: '100px'
	  }, 5000);


	$('#user_username').keydown(function(e) {		
		if (e.key == '@') {
			e.preventDefault()
		}
	});

});