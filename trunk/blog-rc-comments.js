/**
 * Beauty JSON Commentator Sidebar 1.0 (May 29, 2011)
 * copyright (c) 2011 Hendriono from http://modification-blog.blogspot.com
 */

function tampilkancomment(json) {
	document.write('<div id="comment"><ul>');
	var entry, urlcomment, contentcomment, showcomment;
	for (var i = 0; i < numcomment; i++) {
		entry = json.feed.entry[i];
	if (i == json.feed.entry.length) break;
		for (var k = 0; k < entry.link.length; k++) {
			if (entry.link[k].rel == 'alternate') {
				urlcomment = entry.link[k].href;
				break
			}
		}

		urlcomment = urlcomment.replace("#", "#comment-");
		if ("content" in entry) {
			contentcomment = entry.content.$t
		} else if ("summary" in entry) {
			contentcomment = entry.summary.$t
		} else {
			contentcomment = ""
		}

		var re = /<\S[^>]*>/g;
		contentcomment = contentcomment.replace(re, "");
		if (contentcomment.length > numcharacter) {
			contentcomment = contentcomment.substring(0, numcharacter) + "...";
		}

		document.write('<li>');
		document.write('<b><a rel="nofollow" href="' + urlcomment + '">' + entry.author[0].name.$t + '</a>: </b>');
		document.write('<span class="content">' + contentcomment + '</span>');
		document.write('</li>');
	}
	document.write('</ul></div>');
}

document.write('<scr' + 'ipt src="' + home_page + '/feeds/comments/default?redirect=false&alt=json-in-script&callback=showcomment"><\/script>');