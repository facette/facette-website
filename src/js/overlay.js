var $body = $(document.body),
	$overlay = $('#overlay').detach();

function handleOverlay(e) {
	if (e.type == 'keydown' && e.which == 27 || e.type == 'click' && e.target.tagName != 'IMG') {
		$('#overlay').remove();
	}

	$body.off('keydown', handleOverlay);
}

// Handle screenshots display
$body.on('click', '[data-screenshot]', function(e) {
	var img = document.createElement('img');
	img.src = e.target.getAttribute('data-screenshot');

	$overlay.
		clone().
		appendTo($body).
		append(img).
		on('click', handleOverlay);

	$body.on('keydown', handleOverlay);
});
