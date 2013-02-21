// ==UserScript==
// @name           Add IMDb ratings to Cineworld pages
// @namespace      gregd.me
// @grant          GM_xmlhttpRequest
// @description    Adds ratings from IMDB to films in iPlayer
// @include        http://www.cineworld.co.uk/mobile/cinemas/*/nowshowing
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js
// @version        1.0.1
// @updateURL      https://raw.github.com/Grogs/cineworld-imdb-userscript/master/cineworld-imdb-ratings.js
// @downloadURL    https://raw.github.com/Grogs/cineworld-imdb-userscript/master/cineworld-imdb-ratings.js
//
// ==/UserScript==




$('.panel h2').each(function(i){
    var that = this;
    
    function update(response) {
            var json=jQuery.parseJSON(response.responseText);
            var rating=json.rating;
            $(that).append(' ('+rating+' on IMDb with '+json.votes+' votes)');
    }
    
    currentTitle = $(this).find('a').text();
    
    if (currentTitle.search("2D") == 0 || currentTitle.search("3D") == 0)
    	currentTitle=currentTitle.substring(5)
        
    //console.log(currentTitle);
    
    var cached = localStorage.getItem(currentTitle)
    
    if(cached) {
        
        console.log("Cache hit for "+currentTitle)
        update(cached)
        
    } else GM_xmlhttpRequest({
        
        method: "GET",
        url: "http://www.deanclatworthy.com/imdb/?q=" + currentTitle,
        onload: function(response) {
        	console.log("Cache miss for "+currentTitle)
        	localStorage.setItem(currentTitle, response)
        	update(response)
    	}
                             
    });

} );
