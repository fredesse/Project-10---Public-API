var searchBtn = document.getElementById("search");
var albumImage = document.querySelector(".album-img");
var resultTitle = document.getElementById("resultsFor");

// Searches for album artwork when button is pressed
searchBtn.addEventListener("click", function (e) {
	e.preventDefault();
	var albums = document.getElementById("searchBar").value;

	$(".search-title").remove();

	var artworkFor = document.createElement("p");
	artworkFor.className = "search-title";
	artworkFor.textContent = "Album artwork for " + albums;
	resultTitle.appendChild(artworkFor);

	var spotifyAPI = "https://api.spotify.com/v1/search";
	var spotifyOpts = {
		q: albums,
		type: 'album'
	};
	function searchAlbums(data) {
		var albumHTML = '<div>';
		$.each( data.albums.items, function(i, album) {
			albumHTML += '<a href="' + album.images[0].url + '" data-lightbox="roadtrip" data-title="<p><span>' + album.name + '</span></p><p><span>' + album.artists[0].name + '</span></p><p><a href=' + album.external_urls.spotify + '>Listen to ' + album.artists[0].name + '</a><p>">';
			albumHTML += '<img src="' + album.images[1].url + '" class="album-img">';
			albumHTML += '</a>';
		});
		albumHTML += '</div>';
		$('#imageGallery').html(albumHTML);
	}
	$.getJSON(spotifyAPI, spotifyOpts, searchAlbums);
});

$("#imageGallery").on("click", ".album-img", function(event) {
	event.preventDefault();
	console.log("I was clicked");

	function getCurrentAlbum(currentAlbum) {
		var imageLocation = $(currentAlbum).attr("href");
		$image.attr("src", imageLocation);
	};
})

$("#searchBar").focus(function() {
	$(this).val('');
	$(this).attr("placeholder", "");
})

$("#searchBar").focusout(function() {
	if ($(this).val() == '') {
		$(this).attr("placeholder", "Search...");
	};
})

/*

var $overlay = $('<div id="overlay"></div>');
var $image = $('<img></img>');
var $caption = $("<p></p>");
var $title = $("<h1></h1>");

var $nextArrow = $('<div id="nextArrow"></div>');
var $prevArrow = $('<div id="prevArrow"></div>');

$overlay.append($image);		// Adds image to overlay

$image.before($prevArrow);		// Adds left arrow
$image.after($nextArrow);		// Adds right arrow

$overlay.append($title);
$overlay.append($caption);


$("body").append($overlay);   // Adds overlay to body


$("#imageGallery a").click(function(event) {		// Captures the click event on a link
	event.preventDefault();

	$overlay.fadeTo('slow', 1).show();
});


$prevArrow.click(function(event) {				// Shows previous image when clicked
	event.stopPropagation();
	getPrevImage();
});

$nextArrow.click(function(event) {				// Shows next image when clicked
	event.stopPropagation();
	getNextImage();
});


document.body.addEventListener('keydown', function(event){					// Keyboard navigation for next picture
	var key = event.keyCode || event.which;
	if (key === 39) {
		getNextImage();
	}
});

document.body.addEventListener('keydown', function(event){					// Keyboard navigation for previous picture
	var key = event.keyCode || event.which;
	if (key === 37) {
		getPrevImage();
	}
});


function getCurrentImage (currentImage) {				// Gets current image
	thisImage = currentImage;

	var imageLocation = $(currentImage).attr("href");
	$image.attr("src", imageLocation).attr("frameborder", "0").attr("scrolling", "no").attr("allowfullscreen", "allowfullscreen");

	
	var captionTitle = $(currentImage).attr("data-title");		// Sets the title
	$title.text(captionTitle);
	
	var captionText = $(currentImage).children("img").attr("alt");			// Sets the captions 
	$caption.text(captionText);
}

function getPrevImage() {									// Gets the previous image
	imageParent = $(thisImage).prev();
	if(imageParent.length!==0) {
		thisImage = $(imageParent);
	}
	getCurrentImage(thisImage);
}

function getNextImage() {								// Gets the next image
    imageParent = $(thisImage).next();
    if(imageParent.length!==0) {
    	thisImage = $(imageParent);
    }
    getCurrentImage(thisImage);
}


$overlay.click(function() {			// Hides overlay with click
	$overlay.hide('slow');
});

$(document).keyup(function(e) {			// Hides overlay with ESC
	if (e.keyCode == 27) {
		$overlay.hide('slow');
	}
});*/
