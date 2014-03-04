'use strict';

// Call this function when the page loads (the "ready" event)
$(document).ready(function() {
	initializePage();
})

/*
 * Function that is called when the document is ready.
 */
function initializePage() {
	$('.addtask_submit').click(function(e) {
		console.log('clicked');
		var taskname = $('#new-task-form #taskname').val();
		var estimatedtime = $('#new-task-form #estimatedtime').val();
		var location = $('#new-task-form #location').val();
		var priority = $('#new-task-form #priority').val();
		
		var json = {
			'taskname': taskname,
			'estimatedtime': estimatedtime,
			'location':  location,
			'priority': priority
		};
		$.post('/currenttask', json, function() {
			window.location.href = '/'; // reload the page
		});
	});

	$('.confirm_yes').click(function(e) {
		$.post('/currenttask/deleted', function() {
			window.location.href = '/';
		});
	});

	// register a click handler
	$("#homescreen_button").click(likeClick);
}

function likeClick(e) {
	// prevent page from reloading
	e.preventDefault();
	
	// record a Google Analytics event
	ga('send', 'event', 'like', 'click');
}

