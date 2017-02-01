var searchBtn = document.getElementById("search");
var resultTitle = document.getElementById("resultsFor");

// Searches for album artwork when button is pressed
searchBtn.addEventListener("click", function (e) {
	e.preventDefault();
	var albums = document.getElementById("searchBar").value; //Gets search value

	$(".search-title").remove(); // Clears previous search from title

	// Displays search title
	var artworkFor = document.createElement("p");
	artworkFor.className = "search-title";
	artworkFor.textContent = "Album artwork for " + albums;
	resultTitle.appendChild(artworkFor);

	// Requests data, loops through and displays it
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

// Search field clears when focused
$("#searchBar").focus(function() {
	$(this).val('');
	$(this).attr("placeholder", "");
});

// Puts placeholder back on off-focus
$("#searchBar").focusout(function() {
	if ($(this).val() ==='') {
		$(this).attr("placeholder", "Search...");
	}
});