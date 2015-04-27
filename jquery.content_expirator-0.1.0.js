/*
 * Title: Content Expirator
 * Author: DansNetwork.com
 * URL: http://dansnetwork.com
 * Version: 0.1.0
 * Requirements: jQuery 1.4 or higher (will probably work with previous versions)
 * 
 */

(function($){
	$.contentExpirator = function(prfx){
		var pfix = prfx || 'exp';
		$("[class|="+pfix+"]").each(function(){
			var eString = $(this).attr('class').split(' ')[0];
			var dString = eString.split('-');
			var d = new Date(dString[1],dString[2].toString()-1,dString[3]);
			var today = new Date();
			if(d < today){
				$(this).css('display','none');
			}
		});
	}
})(jQuery);