/*!
 * Simple regex experiment to create an automatic emoticons
 */

(function($) {
	$(document).ready(function() {

		// Append an emoticon bar before comment-form
		if (putEmoAbove) {
			$(putEmoAbove).before('<div class="emoWrap"> :) :( =( :waaa: :s ^_^ :D =D ^:D @@, ;) :-bd :-d :yaya: :&#39;( T_T :&#92; :p B) :Q :Ozz 7:( &#92;o/ &#92;m/ **p &lt;3 0:) ^o^ :-a 7:O *fck* xV x@ X@ ~x( &lt;:) &lt;=) (-.-,) *=p =p* &#39;&#39;J :W :bye: :imhere: :cendol: :rolled: *bang* :drummer: :guitarist: :vocalist:</div>');
		}
		function emo(emo, imgRep, emoKey) {
			$(emoRange).html(function() {
				return $(this).html().replace(/<br ?\/?>(:|;|=|\^)/ig, "<br> $1").replace(emo, " <img src='" + imgRep + "' class='emo delayLoad' alt='" + emoKey + "' />");
			});
		}
		emo(/\s:\)+/g, "https://rawgit.com/suardika/agratitudesign-template/master/emoticon/01.gif", ":)");
		emo(/\s;\)+/g, "https://rawgit.com/suardika/agratitudesign-template/master/emoticon/02.gif", ";)");
		emo(/\s:\(/g, "https://rawgit.com/suardika/agratitudesign-template/master/emoticon/03.gif", ":(");
		emo(/\s=\(/g, "https://rawgit.com/suardika/agratitudesign-template/master/emoticon/04.gif", "=(");
		emo(/\s@@,/g, "https://rawgit.com/suardika/agratitudesign-template/master/emoticon/05.gif", "@@,");
		emo(/\s:yaya:/ig, "https://rawgit.com/suardika/agratitudesign-template/master/emoticon/06.gif", ":yaya:");
		emo(/\s:s/ig, "https://rawgit.com/suardika/agratitudesign-template/master/emoticon/07.gif", ":s");
		emo(/\s:\\/g, "https://rawgit.com/suardika/agratitudesign-template/master/emoticon/08.gif", ":&#92;");
		emo(/\s:D/g, "https://rawgit.com/suardika/agratitudesign-template/master/emoticon/09.gif", ":D");
		emo(/\s=D/g, "https://rawgit.com/suardika/agratitudesign-template/master/emoticon/10.gif", "=D");
		emo(/\s\^:D/g, "https://rawgit.com/suardika/agratitudesign-template/master/emoticon/11.gif", "^:D");
		emo(/\s\^(\_|)\^/g, "https://rawgit.com/suardika/agratitudesign-template/master/emoticon/12.gif", "^_^");
		emo(/\s:'\(/g, "https://rawgit.com/suardika/agratitudesign-template/master/emoticon/13.gif", ":&#39;(");
		emo(/\s:waaa:/g, "https://rawgit.com/suardika/agratitudesign-template/master/emoticon/14.gif", ":waaa:");
		emo(/\sT_T/ig, "https://rawgit.com/suardika/agratitudesign-template/master/emoticon/15.gif", "T_T");
		emo(/\sB\)/g, "https://rawgit.com/suardika/agratitudesign-template/master/emoticon/16.gif", "B)");
		emo(/\s:Q/ig, "https://rawgit.com/suardika/agratitudesign-template/master/emoticon/17.gif", ":Q");
		emo(/\s\*\*p/ig, "https://rawgit.com/suardika/agratitudesign-template/master/emoticon/18.gif", "**p");
		emo(/\s7:\(/g, "https://rawgit.com/suardika/agratitudesign-template/master/emoticon/19.gif", "7:(");
		emo(/\s:p/ig, "https://rawgit.com/suardika/agratitudesign-template/master/emoticon/20.gif", ":p");
		emo(/\s:Oz+/ig, "https://rawgit.com/suardika/agratitudesign-template/master/emoticon/21.gif", ":Ozz");
		emo(/\s7:O/ig, "https://rawgit.com/suardika/agratitudesign-template/master/emoticon/22.gif", "7:O");
		emo(/\s\\o\//ig, "https://rawgit.com/suardika/agratitudesign-template/master/emoticon/23.gif", "&#92;o/");
		emo(/\s\\m\//ig, "https://rawgit.com/suardika/agratitudesign-template/master/emoticon/24.gif", "&#92;m/");
		emo(/\s&lt;3/ig, "https://rawgit.com/suardika/agratitudesign-template/master/emoticon/25.gif", "&amp;amp;lt;3");
		emo(/\s0:\)+/ig, "https://rawgit.com/suardika/agratitudesign-template/master/emoticon/26.gif", "0:)");
		emo(/\s\^o\^/ig, "https://rawgit.com/suardika/agratitudesign-template/master/emoticon/27.gif", "^o^");
		emo(/\s:-a/ig, "https://rawgit.com/suardika/agratitudesign-template/master/emoticon/28.gif", ":-a");
		emo(/\s\*fck\*/ig, "https://rawgit.com/suardika/agratitudesign-template/master/emoticon/29.gif", "*fck*");
		emo(/\sxV/ig, "https://rawgit.com/suardika/agratitudesign-template/master/emoticon/30.gif", "xV");
		emo(/\sx\@/g, "https://rawgit.com/suardika/agratitudesign-template/master/emoticon/31.gif", "x@");
		emo(/\s\X\@/g, "https://rawgit.com/suardika/agratitudesign-template/master/emoticon/32.gif", "X@");
		emo(/\s:-d/ig, "https://rawgit.com/suardika/agratitudesign-template/master/emoticon/33.gif", ":-d");
		emo(/\s:-bd/ig, "https://rawgit.com/suardika/agratitudesign-template/master/emoticon/34.gif", ":-bd");
		emo(/\s\~x\(+/ig, "https://rawgit.com/suardika/agratitudesign-template/master/emoticon/35.gif", "~x(");
		emo(/\s:bye:/ig, "https://rawgit.com/suardika/agratitudesign-template/master/emoticon/36.gif", ":bye:");
		emo(/\s:W/g, "https://rawgit.com/suardika/agratitudesign-template/master/emoticon/37.gif", ":W");
		emo(/\s\(-\.-,\)/g, "https://rawgit.com/suardika/agratitudesign-template/master/emoticon/38.gif", "(-.-,)");
		emo(/\s\*=p/ig, "https://rawgit.com/suardika/agratitudesign-template/master/emoticon/39.gif", "*=p");
		emo(/\s=p\*/ig, "https://rawgit.com/suardika/agratitudesign-template/master/emoticon/40.gif", "=p*");
		emo(/\s:imhere:/ig, "https://rawgit.com/suardika/agratitudesign-template/master/emoticon/41.gif", ":imhere:");
		emo(/\s:cendol:/ig, "https://rawgit.com/suardika/agratitudesign-template/master/emoticon/42.gif", ":cendol:");
		emo(/\s&lt;:\)/ig, "https://rawgit.com/suardika/agratitudesign-template/master/emoticon/43.gif", "&amp;amp;lt;:)");
		emo(/\s&lt;=\)/ig, "https://rawgit.com/suardika/agratitudesign-template/master/emoticon/44.gif", "&amp;amp;lt;=)");
		emo(/\s:rolled:/ig, "https://rawgit.com/suardika/agratitudesign-template/master/emoticon/45.gif", ":rolled:");
		emo(/\s\*bang\*/ig, "https://rawgit.com/suardika/agratitudesign-template/master/emoticon/46.gif", "*bang*");
		emo(/\s\'\'J/ig, "https://rawgit.com/suardika/agratitudesign-template/master/emoticon/47.gif", "&#39;&#39;J");
		emo(/\s:drummer:/ig, "https://rawgit.com/suardika/agratitudesign-template/master/emoticon/48.gif", ":drummer:");
		emo(/\s:guitarist:/ig, "https://rawgit.com/suardika/agratitudesign-template/master/emoticon/49.gif", ":guitarist:");
		emo(/\s:vocalist:/ig, "https://rawgit.com/suardika/agratitudesign-template/master/emoticon/50.gif", ":vocalist:");

		var one = 0; // Show alert once!

		// Click anywhere to hide the emoticon
		$(document.body).on("click", function() {
			$('.emoKey').remove();
		});

		// Click to show the code!
		$('.emo').css('cursor', 'pointer').on("click", function(e) {
			$('.emoKey').remove();
			$(this).after('<input class="emoKey" type="text" size="6" value=" ' + this.alt + '" />');
			$('.emoKey').trigger("select");
			if(emoMessage && one === 0) {
				alert(emoMessage);
				one = 1;
			}
			e.stopPropagation();
		});

	});
})(jQuery);