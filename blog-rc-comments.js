/**
 * Beauty JSON Commentator Sidebar 1.0 (May 29, 2011)
 * copyright (c) 2011 Hendriono from http://modification-blog.blogspot.com
 * Modified by Taufik Nurrohman @ http://hompimpaalaihumgambreng.blogspot.com
 */

function tampilkancomments(json) {
	document.write('<div id="comment"><ul>');
	var entry, urlcomment, isicomment, lihatcomment;
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
			isicomment = entry.content.$t
		} else if ("summary" in entry) {
			isicomment = entry.summary.$t
		} else {
			isicomment = ""
		}

		var re = /<\S[^>]*>/g;
		isicomment = isicomment.replace(re, "");
		if (isicomment.length > numcharacter) {
			isicomment = isicomment.substring(0, numcharacter) + "...";
		}

		document.write('<li>');
		document.write('<b><a rel="nofollow" href="' + urlcomment + '">' + entry.author[0].name.$t + '</a>: </b>');
		document.write('<span class="isi">' + isicomment + '</span>');
		document.write('</li>');
	}
	document.write('</ul></div>');
}

document.write('<scr' + 'ipt src="' + home_page + '/feeds/comments/default?redirect=false&alt=json-in-script&callback=tampilkancomment"><\/script>');