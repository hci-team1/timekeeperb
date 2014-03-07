
/*
 * GET homescreen page.
 */

 exports.view = function(req, res) {
 	res.render('homescreen');

 	// register clickers
 	$("#home1").click(likeClick);
	$("#home2").click(likeClick);
	$("#home3").click(likeClick);
 }

function likeClick(e) {
	// prevent page from reloading
	e.preventDefault();
	
	// record a Google Analytics event
	ga('send', 'event', 'like', 'click');
}