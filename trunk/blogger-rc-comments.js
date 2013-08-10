/**
 * Beauty JSON Commentator Sidebar 1.0 (May 29, 2011)
 * copyright (c) 2011 Hendriono from http://modification-blog.blogspot.com
 * Modified by Taufik Nurrohman @ http://hompimpaalaihumgambreng.blogspot.com
 */

function tampilkankomentar(json) {
	document.write('<div id="komentar"><ul>');
	var entry, urlkomentar, isikomentar, lihatkomentar;
	for (var i = 0; i < jmlkomentar; i++) {
		entry = json.feed.entry[i];
	if (i == json.feed.entry.length) break;
		for (var k = 0; k < entry.link.length; k++) {
			if (entry.link[k].rel == 'alternate') {
				urlkomentar = entry.link[k].href;
				break
			}
		}

		urlkomentar = urlkomentar.replace("#", "#comment-");
		if ("content" in entry) {
			isikomentar = entry.content.$t
		} else if ("summary" in entry) {
			isikomentar = entry.summary.$t
		} else {
			isikomentar = ""
		}

		var re = /<\S[^>]*>/g;
		isikomentar = isikomentar.replace(re, "");
		if (isikomentar.length > jmlkarakter) {
			isikomentar = isikomentar.substring(0, jmlkarakter) + "...";
		}

		document.write('<li>');
		document.write('<b><a rel="nofollow" href="' + urlkomentar + '">' + entry.author[0].name.$t + '</a>: </b>');
		document.write('<span class="isi">' + isikomentar + '</span>');
		document.write('</li>');
	}
	document.write('</ul></div>');
}

document.write('<scr' + 'ipt src="' + home_page + '/feeds/comments/default?redirect=false&alt=json-in-script&callback=tampilkankomentar"><\/script>');