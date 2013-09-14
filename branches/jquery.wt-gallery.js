/**
 * jQuery Image Gallery
 * Copyright (c) 2010 Allan Ma (http://codecanyon.net/user/webtako)
 * Version: 1.45 (11/02/2010)
 */
;(function($) {
	$.fn.wtGallery = function(params) {		
		var INTERVAL_DELAY = 100;
		var DEFAULT_DELAY = 5000;
		var TOOLTIP_DELAY = 800;
		var DURATION = 800;
		var SCROLL_SPEED = 600;
		var ANIMATE_SPEED = 500;
		var STRIPE_SIZE = 50;
		var TOP = "top";
		var BOTTOM = "bottom";
		var BUTTON_OPACITY = 0.5;
		var UPDATE_IMG_BTNS = "update_imgbtns";
		var UPDATE_IMG_INFO = "update_imginfo";
		var UPDATE_INDEX = 		"update_index";
		var UPDATE_THUMB_INFO = "update_thumbinfo";
		var UPDATE_THUMB_BTNS = "update_thumbbtns";
		var START = "start_timer";
		var RESET = "reset_timer";
		var PAUSE = "pause_timer";
		
		var EFFECTS = new Array(25);		
		EFFECTS["fade"] 			= 0;		
		EFFECTS["vert.tl"] 			= 1;
		EFFECTS["vert.tr"] 			= 2;
		EFFECTS["vert.bl"] 			= 3;
		EFFECTS["vert.br"]  		= 4;		
		EFFECTS["fade.left"] 		= 5;				
		EFFECTS["fade.right"]		= 6;		
		EFFECTS["alt.left"]     	= 7;
		EFFECTS["alt.right"]    	= 8;
		EFFECTS["blinds.left"]  	= 9;
		EFFECTS["blinds.right"] 	= 10;
		EFFECTS["vert.random.fade"] = 11;	
		EFFECTS["horz.tl"] 			= 12;
		EFFECTS["horz.tr"] 			= 13;		
		EFFECTS["horz.bl"] 			= 14;
		EFFECTS["horz.br"]  		= 15;				
		EFFECTS["fade.top"] 		= 16;		
		EFFECTS["fade.bottom"]		= 17;
		EFFECTS["alt.top"]      	= 18;
		EFFECTS["alt.bottom"]   	= 19;
		EFFECTS["blinds.top"]   	= 20;
		EFFECTS["blinds.bottom"]	= 21; 
		EFFECTS["horz.random.fade"] = 22;	
		EFFECTS["random"]	        = 23;
		EFFECTS["none"] 		    = 24;
		
		//Vertical Stripes
		function VertStripes(gallery, areaWidth, areaHeight, stripeSize, bgColor, duration, delay) {
			var $stripes;
			var $arr;
			var total;
			var intervalId = null;
			
			//init stripes
			var init = function() {
				total = Math.ceil(areaWidth/stripeSize);
				var divs = "";
				for (var i = 0; i < total; i++) {
					divs += "<div class='vpiece' id='" + i + "'></div>";
				}					
				gallery.addToScreen(divs);
				
				$stripes = $("div.vpiece", gallery.$el);
				$arr = new Array(total);
				$stripes.each(
					function(n) {
						$(this).css({left:(n * stripeSize), height: areaHeight});
						$arr[n] = $(this);
					}
				);	
			}

			//clear animation
			this.clear = function() {
				clearInterval(intervalId);
				$stripes.stop(true).css({"z-index":2, opacity:0});
			}

			//display content
			this.displayContent = function($img, effect) {
				setPieces($img, effect);
				if (effect == EFFECTS["vert.random.fade"]) {
					animateRandom($img);
				}
				else {
					animate($img, effect);
				}
			}			
			
			//set image stripes
			var setPieces = function($img, effect) {
				switch (effect) {
					case EFFECTS["vert.tl"]:
					case EFFECTS["vert.tr"]:
						setVertPieces($img, -areaHeight, 1, stripeSize, false);		
						break;
					case EFFECTS["vert.bl"]:
					case EFFECTS["vert.br"]:
						setVertPieces($img, areaHeight, 1, stripeSize, false);
						break;
					case EFFECTS["alt.left"]:
					case EFFECTS["alt.right"]:
						setVertPieces($img, 0, 1, stripeSize, true);
						break;
					case EFFECTS["blinds.left"]:
					case EFFECTS["blinds.right"]:
						setVertPieces($img, 0, 1, 0, false);
						break;
					default:
						setVertPieces($img, 0, 0, stripeSize, false);
				}
			}
			
			//set vertical stripes
			var setVertPieces = function($img, topPos, opacity, width, alt) {
				var imgSrc = $img.attr("src");
				var tOffset = (areaHeight - $img.height())/2;
				var lOffset = (areaWidth - $img.width())/2;
				for (var i = 0; i < total; i++) {		
					var xPos =  ((-i * stripeSize) + lOffset);
					if (alt) {
						topPos = (i % 2) == 0 ? -areaHeight: areaHeight;
					}
					$($stripes.get(i)).css({"background":bgColor + " url('"+ imgSrc +"') " + xPos + "px " + tOffset + "px no-repeat",
											"backgroundPositionX":xPos + "px", "backgroundPositionY":tOffset + "px",
											opacity:opacity, top:topPos, width:width, "z-index":3});						
				}
			}
			
			//animate stripes			
			var animate = function($img, effect) {
				var start, end, incr, limit;
				switch (effect) {
					case EFFECTS["vert.tl"]:   case EFFECTS["vert.bl"]: 
					case EFFECTS["fade.left"]: case EFFECTS["blinds.left"]: 
					case EFFECTS["alt.left"]:
						start = 0;
						end = total - 1;
						incr = 1;	
						break;
					default:
						start = total - 1;
						end = 0;
						incr = -1;
				}
				
				intervalId = setInterval(
					function() {
						$($stripes.get(start)).animate({top:0, opacity:1, width:stripeSize}, duration, "",
							function() {
								if ($(this).attr("id") == end) {
									gallery.setComplete($img);
								}
							}
						);
						if (start == end) {
							clearInterval(intervalId);
						}
						start += incr;
					}, delay);							
			}
			
			//animate random fade 
			var animateRandom = function($img) {		
				shuffleArray($arr);
				var i = 0;
				var count = 0;
				intervalId = setInterval(
					function() {
						$arr[i++].animate({opacity:1}, duration, "",
								function() {
									if (++count == total) {
										gallery.setComplete($img);
									}
								});
						if (i == total) {
							clearInterval(intervalId);
						}
					}, delay);			
			}
			
			init();
		}
		
		//Horizontal Stripes
		function HorzStripes(gallery, areaWidth, areaHeight, stripeSize, bgColor, duration, delay) {
			var $stripes;
			var $arr;
			var total;
			var intervalId = null;
			
			//init stripes
			var init = function() {			
				total = Math.ceil(areaHeight/stripeSize);				
				var divs = "";
				for (var j = 0; j < total; j++) {
					divs += "<div class='hpiece' id='" + j + "'><!-- --></div>";
				}				
				gallery.addToScreen(divs);
				
				$stripes = $("div.hpiece", gallery.$el);
				$arr = new Array(total);
				$stripes.each(
					function(n) {
						$(this).css({top:(n * stripeSize), width: areaWidth});
						$arr[n] = $(this);
					}							 
				);
			}

			//clear animation
			this.clear = function() {
				clearInterval(intervalId);
				$stripes.stop(true).css({"z-index":2, opacity:0});
			}

			//display content
			this.displayContent = function($img, effect) {
				setPieces($img, effect);
				if (effect == EFFECTS["horz.random.fade"]) {
					animateRandom($img);
				}
				else {
					animate($img, effect);
				}
			}			
			
			//set image stripes
			var setPieces = function($img, effect) {
				switch (effect) {
					case EFFECTS["horz.tr"]:
					case EFFECTS["horz.br"]:
						setHorzPieces($img, areaWidth, 1, stripeSize, false);		
						break;
					case EFFECTS["horz.tl"]:
					case EFFECTS["horz.bl"]:
						setHorzPieces($img, -areaWidth, 1, stripeSize, false);
						break;
					case EFFECTS["alt.top"]:
					case EFFECTS["alt.bottom"]:
						setHorzPieces($img, 0, 1, stripeSize, true);
						break;
					case EFFECTS["blinds.top"]:
					case EFFECTS["blinds.bottom"]:
						setHorzPieces($img, 0, 1, 0, false);
						break;
					default:
						setHorzPieces($img, 0, 0, stripeSize, false);		
				}
			}
			
			//set horizontal stripes
			var setHorzPieces = function($img, leftPos, opacity, height, alt) {
				var imgSrc = $img.attr("src");
				var tOffset = (areaHeight - $img.height())/2;
				var lOffset = (areaWidth - $img.width())/2;
				for (var i = 0; i < total; i++) {			
					var yPos = ((-i * stripeSize) + tOffset);
					if (alt) {
						leftPos = (i % 2) == 0 ? -areaWidth: areaWidth;
					}
					$($stripes.get(i)).css({"background":bgColor + " url('"+ imgSrc +"') " + lOffset + "px " + yPos  + "px no-repeat",
											"backgroundPositionX":lOffset  + "px", "backgroundPositionY":yPos + "px",
											opacity:opacity, left:leftPos, height:height, "z-index":3});			  
				}
			}
			
			//animate stripes			
			var animate = function($img, effect) {
				var start, end, incr;
				switch (effect) {
					case EFFECTS["horz.tl"]:  case EFFECTS["horz.tr"]: 
					case EFFECTS["fade.top"]: case EFFECTS["blinds.top"]: 
					case EFFECTS["alt.top"]:
						start = 0;
						end = total - 1;
						incr = 1;
						break;
					default:
						start = total - 1;
						end = 0;
						incr = -1;
				}
				
				intervalId = setInterval(
					function() {
						$($stripes.get(start)).animate({left:0, opacity:1, height:stripeSize}, duration, "",
							function() {
								if ($(this).attr("id") == end) {
									gallery.setComplete($img);
								}
							}
						);						
						if (start == end) {
							clearInterval(intervalId);
						}
						start += incr;
					}, delay);							
			}
			
			//animate random fade 
			var animateRandom = function($img) {		
				shuffleArray($arr);
				var i = 0;
				var count = 0;
				intervalId = setInterval(
					function() {
						$arr[i++].animate({opacity:1}, duration, "",
								function() {
									if (++count == total) {
										gallery.setComplete($img);
									}
								});
						if (i == total) {
							clearInterval(intervalId);
						}
					}, delay);			
			}
			
			init();
		}
		
		//Gallery Class
		function Gallery($obj, opts) {
			//set options
			var numDisplay = 		getPosNumber(opts.num_display,5);
			var screenWidth = 		getPosNumber(opts.screen_width,720);
			var screenHeight = 		getPosNumber(opts.screen_height,405);
			var thumbWidth = 		getPosNumber(opts.thumb_width,125);
			var thumbHeight = 		getPosNumber(opts.thumb_height,70);
			var contImgNav = 		opts.cont_imgnav;
			var contThumbNav = 		opts.cont_thumbnav;
			var displayImgBtns = 	opts.display_imgnav;
			var displayImgNum = 	opts.display_imgnum;
			var displayTimer =		opts.display_timer;			
			var displayThumbBtns = 	opts.display_thumbnav;			
			var displayThumbInfo = 	opts.display_thumbnum;
			var displayArrow = 		opts.display_arrow;
			var displayTooltip = 	opts.display_tooltip;			
			var displayIndex = 		opts.display_indexes;
			var mouseoverText = 	opts.mouseover_text;
			var mouseoverInfo =		opts.mouseover_info;
			var mouseoverDBtns = 	opts.mouseover_buttons;
			var mouseoverCaption = 	opts.mouseover_caption;
			var captionAlign = 		opts.caption_align.toLowerCase();								
			var globalEffect = 		opts.transition.toLowerCase();
			var globalDelay = 		getPosNumber(opts.delay, DEFAULT_DELAY);
			var duration = 			getPosNumber(opts.transition_speed, DURATION);
			var scrollSpeed = 		getPosNumber(opts.scroll_speed, SCROLL_SPEED);
			var moveBy1 = 			opts.move_one;
			var shuffle = 			opts.shuffle;
			
			var numItems;
			var unitSize;
			var prevSlots;
			var nextSlots;
			var maxSlots;	
			var currIndex;
			var prevIndex;
			var pos;	
			var vStripes;
			var hStripes;
			var rotate;
			var delay;
			var textOffset;
			var selectStyle;
			var timerId = null;			
			
			var $gallery = 		$(".wt-gallery", $obj);			   			
			var $mainScreen = 	$gallery.find(".main-screen");
			var $preloader;
			var $mainLink;
			var $prevBtn;
			var $nextBtn;
			var $textBox;
			var $infoPanel;
			var $thumbPanel = 	$gallery.find(".thumbnails");	
			var $thumbList =	$thumbPanel.find(">ul");
			var $thumbs	=		$thumbList.find(">li");
			var $thumbBoxes = 	$thumbs.find(">div:first");
			var $cPanel = 		$gallery.find(".cpanel");
			var $thumbBackBtn = $cPanel.find("#thumbs-back");
			var $thumbFwdBtn = 	$cPanel.find("#thumbs-fwd");
			var $indexBar = 	$cPanel.find(".cbar");
			var $thumbInfo =	$cPanel.find(".thumb-info");
			var $tooltip;
			var $items;
			var $indexes;
			var $timer;
			var $innerText;
			this.$el = $obj;
			
			this.init = function() {
				//init variables				
				currIndex = 0;
				prevIndex = -1;
				pos = 0;
				numItems = $thumbs.size();
				if (numItems <= numDisplay) {
					displayThumbBtns = displayIndex = false;
					numDisplay = numItems;
				}				
				maxSlots = numItems - numDisplay;
				prevSlots = 0;
				nextSlots = maxSlots;
				
				//init components
				initScreen();				
				initCPanel();							
				initItems();
				
				//config gallery 
				var areaWidth =  $mainScreen.outerWidth() > $cPanel.outerWidth() ? $mainScreen.outerWidth() : $cPanel.outerWidth();
				var areaHeight = $mainScreen.outerHeight() + $cPanel.outerHeight();
				$gallery.css({width:areaWidth, height:areaHeight, padding:getNonNegNumber(opts.padding,0)});
				$(document).keyup(onKeyPress);
				var autoStart = opts.auto_rotate;	
				if (autoStart) {
					rotate = true;
					$gallery.bind(START, startTimer).bind(PAUSE, pauseTimer).bind(RESET, resetTimer).hover(galleryOver, galleryOut);					
				}
				
				//init effect components
				var winColor = $mainScreen.css("background-color");
				vStripes =  new VertStripes(this, screenWidth, screenHeight, getPosNumber(opts.vert_size, STRIPE_SIZE), winColor, duration, getPosNumber(opts.vstripe_delay, INTERVAL_DELAY));
				hStripes =  new HorzStripes(this, screenWidth, screenHeight, getPosNumber(opts.horz_size, STRIPE_SIZE), winColor, duration, getPosNumber(opts.hstripe_delay, INTERVAL_DELAY));
				
				//init loading
				loadImg(0);
				
				//display image
				loadContent(currIndex);
				updateCPanel();
			}
			
			//set main image
			this.setComplete = function($img) {
				showContent($img);
			}
			
			//add to screen
			this.addToScreen = function(content) {
				$mainLink.append(content);
			}
			
			//config main screen
			var initScreen = function() {
				var content = "<a href='#'></a>\
								<div id='prev-btn'></div>\
								<div id='next-btn'></div>\
								<div class='desc'></div>\
								<div class='info'></div>\
								<div class='preloader'></div>";
				$mainScreen.append(content);							
				$mainLink =		$mainScreen.find(">a:first");
				$prevBtn = 		$mainScreen.find("#prev-btn");
				$nextBtn = 		$mainScreen.find("#next-btn");
				$textBox = 		$mainScreen.find(".desc");
				$infoPanel = 	$mainScreen.find(".info");
				$preloader = 	$mainScreen.find(".preloader");
				
				$mainScreen.css({width:screenWidth, height:screenHeight});
				textOffset = (msieCheck(6) && screenHeight % 2 != 0) ? -1 : 0;
				//config components
				initDButtons();
				initTextBox();		
				initInfoPanel();
			}
			
			//config d-buttons
			var initDButtons = function() {				
				if (displayImgBtns) {
					var prevBtnPos = 0;
					var nextBtnPos = screenWidth - $nextBtn.width();
					if (mouseoverDBtns) {			
						$prevBtn.data({offset:-$prevBtn.width(), pos:prevBtnPos}).css({left:$prevBtn.data("offset")});
						$nextBtn.data({offset:screenWidth, pos:nextBtnPos}).css({left:$nextBtn.data("offset")});
						$mainScreen.hover(displayDButtons, hideDButtons);		
					}
					else {
						$prevBtn.css({left:prevBtnPos});
						$nextBtn.css({left:nextBtnPos});
					}
					$prevBtn.css("visibility","visible").mousedown(preventDefault).click(prevImg);
					$nextBtn.css("visibility","visible").mousedown(preventDefault).click(nextImg);		
					
					if (!contImgNav) {
						$gallery.bind(UPDATE_IMG_BTNS, updateImgBtns);
					}
				}
				else {
					$prevBtn.hide();
					$nextBtn.hide();					
				}
			}
			
			//display d-buttons
			var displayDButtons = function() {
				$prevBtn.stop().animate({left:$prevBtn.data("pos")}, ANIMATE_SPEED);
				$nextBtn.stop().animate({left:$nextBtn.data("pos")}, ANIMATE_SPEED);
			}

			//hide d-buttons
			var hideDButtons = function() {
				$prevBtn.stop().animate({left:$prevBtn.data("offset")}, ANIMATE_SPEED);
				$nextBtn.stop().animate({left:$nextBtn.data("offset")}, ANIMATE_SPEED);	
			}
			
			//update d-buttons
			var updateImgBtns = function() {
				$prevBtn.css((currIndex == 0) ? {opacity:0, cursor:"default"} : {opacity:1, cursor:"pointer"});
				$nextBtn.css((currIndex == numItems - 1) ? {opacity:0, cursor:"default"} : {opacity:1, cursor:"pointer"});		
			}
			
			//config text box
			var initTextBox = function() {
				var align, offset;
				if (opts.text_align.toLowerCase() == BOTTOM) {
					align = BOTTOM;
					offset = textOffset;					
				}
				else {
					align = TOP;
					offset = 0;
				}
				
				$textBox.data("align", align).append("<div class='inner-text'></div>");
				$innerText = $textBox.find("div.inner-text");
				
				if (mouseoverText) {
					$textBox.css(align, -$textBox.height() + offset);			
					$mainScreen.data("hover", false).hover(displayText, hideText);
				}
				else {
					$textBox.css(align, offset);
				}				
			}
			
			//update text box
			var updateText = function() {
				var text = $items[currIndex].find("div.data>div:first").html();		
				var height = $items[currIndex].data("textHeight");
				if (mouseoverText && !$mainScreen.data("hover")) {			
					$textBox.stop(true).css($textBox.data("align"), -height).height(height);
					$innerText.html(text);
				}
				else {
					$innerText.html("");
					$textBox.stop(true).animate({height:height}, ANIMATE_SPEED, function () { $innerText.html(text); });  	
				}
			}
			
			//display text
			var displayText = function() {
				$mainScreen.data("hover", true);
				$textBox.stop(true, true).animate($textBox.data("align") == TOP ? {top:0} : {bottom:textOffset}, ANIMATE_SPEED);												
			}
			
			//hide text
			var hideText = function() {
				$mainScreen.data("hover", false);
				$textBox.stop(true, true).animate($textBox.data("align") == TOP ? {top:-$textBox.height()} : {bottom:-$textBox.height() + textOffset}, ANIMATE_SPEED);							
			}
			
			//init info panel
			var initInfoPanel = function() {
				$infoPanel.append("<div id='timer'></div>");
				$timer = $infoPanel.find("#timer").data("pct", 1);				
				if (!displayImgNum && !displayTimer) {
					$infoPanel.hide();
					return;
				}
				
				var align, offset;
				if ($textBox.data("align") == TOP) {
					align = BOTTOM;
					offset = textOffset;				
				}
				else {
					align = TOP;
					offset = 0;
				}				
				$infoPanel.data("align", align).css("visibility","visible");				
				if (mouseoverInfo) {
					$infoPanel.css(align, -$infoPanel.height() + offset);					
					$mainScreen.hover(displayInfo, hideInfo);
				}
				else {
					$infoPanel.css(align, offset);
				}
					
				if (displayImgNum) {
					$infoPanel.append("<div class='inner-info'></div>");
					$gallery.bind(UPDATE_IMG_INFO, updateImgInfo);
				}
					
				if (displayTimer) {
					$timer.css("visibility","visible");
				}
			}
			
			//display info panel
			var displayInfo = function() {
				$infoPanel.stop().animate(($infoPanel.data("align") == BOTTOM) ? {bottom:textOffset} : {top:0}, ANIMATE_SPEED);
			}
			
			//hide info panel
			var hideInfo = function() {
				$infoPanel.stop().animate(($infoPanel.data("align") == BOTTOM) ? {bottom:-$infoPanel.height() + textOffset} : {top:-$infoPanel.height()}, ANIMATE_SPEED);								
			}
			
			//update image info
			var updateImgInfo = function() {
				$infoPanel.find("div.inner-info").html((currIndex+1) + " / " + numItems);
			}
			
			//init items
			var initItems = function() {
				var $captions = $thumbs.find(">div:first>p:first");
				if (displayTooltip) {
					$captions.hide();
					$("body").append("<div id='gallery-tooltip'><div class='tt-txt'></div></div>");
					$tooltip = $("#gallery-tooltip");
					if (captionAlign == TOP) {
						$tooltip.data("bottom",false).addClass("txt-up");
					}
					else {
						$tooltip.data("bottom",true).addClass("txt-down");
					}
					
					if (msieCheck(6)) {
						$tooltip.css("background-image", "none").find(":only-child").css("margin",0);
					}
				}
				else {
					var pad = $captions.outerWidth() - $captions.width();
					$captions.width(thumbWidth - pad);				
				}
				
				$items = new Array(numItems);
				$thumbs.each(
					function(n) {
						var $box = $(this).find(">div:first");						
						var $imgLink = $box.find(">a:first");
						var $img = $imgLink.find("img");
						var $caption = $box.find(">p:first");
						var $p = $(this).find(">div.data>div:first");
						var textHeight = ($p.length > 0 && $p.html() != "") ? $innerText.html($p.html()).outerHeight() : 0;
						$(this).data({imgurl:$imgLink.attr("href"), caption:$caption.html(),
									  effect:EFFECTS[$(this).attr("effect")] != undefined ? EFFECTS[$(this).attr("effect")] : EFFECTS[globalEffect],
									  delay:getPosNumber($(this).attr("delay"), globalDelay), textHeight:textHeight});
						
						$img[0].complete ? processImg($img) : $img.load(processLoadedImg);													
						$box.hover(itemMouseover, itemMouseout);
						if ($caption.length > 0 && $caption.html() != "") {
							if (displayTooltip) {
								$box.hover(showTooltip, hideTooltip).mousemove(moveTooltip);
							}
							else {															  
								if (mouseoverCaption) {
									$box.hover(displayCaption, hideCaption);
									$caption.css("top", captionAlign == BOTTOM ? thumbHeight : -$caption.outerHeight());
								}
								else {
									$caption.css("top", captionAlign == BOTTOM ? thumbHeight - $caption.outerHeight() : 0);
								}
							}
						}
						$items[n] = $(this);
					});
				$innerText.html("");
				$textBox.css("visibility", "visible");
				
				if (shuffle) {
					shuffleItems();
				}
			}
			
			//select list item
			var selectItem = function(e) {
				var i = $(e.target).parents("li").index();
				if (i >= 0 && i != currIndex) {					
					$gallery.trigger(RESET);
					prevIndex = currIndex;
					currIndex = i;
					loadContent(currIndex);
				}
				return false;
			}
			
			//on item mouseover
			var itemMouseover = function() {
				$(this).addClass("thumb-over");
			}
			
			//on item mouseout
			var itemMouseout = function() {
				$(this).removeClass("thumb-over");
			}
			
			//display thumb caption
			var displayCaption = function() {
				var $caption = $(this).find(">p:first");
				$caption.stop().animate({top:(captionAlign == BOTTOM) ? thumbHeight - $caption.outerHeight() : 0}, 300);
			}
			
			//hide thumb caption
			var hideCaption = function() {
				var $caption = $(this).find(">p:first");
				$caption.stop().animate({top:(captionAlign == BOTTOM) ? thumbHeight : -$caption.outerHeight()}, 300);
			}
			
			//show tooltip
			var showTooltip = function(e) {
				var caption = $(this).parent().data("caption");
				var yOffset = $tooltip.data("bottom") ? 0 : -$tooltip.outerHeight(true);
				$tooltip.find(">div.tt-txt").html(caption);
				$tooltip.css({top:e.pageY + yOffset, left:e.pageX}).stop(true, true).delay(TOOLTIP_DELAY).fadeIn(300);
			}
			
			//tooltip move
			var moveTooltip = function(e) {
				var yOffset = $tooltip.data("bottom") ? 0 : -$tooltip.outerHeight(true);
				$tooltip.css({top:e.pageY + yOffset, left:e.pageX});
			}
			
			//hide tooltip
			var hideTooltip = function() {
				$tooltip.stop(true, true).fadeOut(0);
			}
			
			//init control panel
			var initCPanel = function() {				
				//config thumbnails
				var thumbMargin = getNonNegNumber(opts.thumb_margin,0);
				$thumbBoxes.css({width:thumbWidth, height:thumbHeight});
				$thumbs.css({"margin-right":thumbMargin});
				unitSize = $thumbs.outerWidth(true);				
				$thumbPanel.width((numDisplay * $thumbBoxes.outerWidth()) + ((numDisplay - 1) * thumbMargin)).click(selectItem);
				$thumbList.width(numItems * unitSize);
				
				//config thumb buttons
				if (displayThumbBtns) {
					var height = $thumbBoxes.outerHeight();
					var margin = $thumbBoxes.css("margin-top");
					$thumbBackBtn.css({height:height, "margin-top":margin}).mousedown(preventDefault).click(prevThumbs);
					$thumbFwdBtn.css({height:height,  "margin-top":margin}).mousedown(preventDefault).click(nextThumbs);		
					
					if (!contThumbNav) {
						$gallery.bind(UPDATE_THUMB_BTNS, updateThumbBtns);
					}
				}
				else {
					$thumbBackBtn.remove();
					$thumbFwdBtn.remove();				
				}
				
				initIndexBar();				
				selectStyle = displayArrow ? "curr-arrow" : "curr";
				$cPanel.width($thumbPanel.outerWidth() + $thumbBackBtn.outerWidth() + $thumbFwdBtn.outerWidth());
				$cPanel.height($thumbPanel.outerHeight() + $indexBar.outerHeight());				
			}
			
			//config index bar
			var initIndexBar = function() {	
				if (!displayThumbInfo) {
					$thumbInfo.hide();
					if (!displayIndex) {
						$indexBar.remove();
						return;
					}
				}
				$indexBar.css({width:$thumbPanel.outerWidth(), "margin-left":$thumbBackBtn.outerWidth(), "margin-right":$thumbFwdBtn.outerWidth()});
				if (displayIndex) {
					var n = Math.ceil(numItems/numDisplay);
					var str = "";
					for (var i = 0; i < n; i++) {
						str += "<span class='index'></span>";
					}
					$indexBar.append(str);
					$indexes = $indexBar.find("span.index");
					$indexes.each(
						function(n) {
							$(this).mousedown(preventDefault).click(function() { goToIndex(n); return false; });
						});
					$gallery.bind(UPDATE_INDEX, updateIndexes);
				}
				$gallery.bind(UPDATE_THUMB_INFO, updateThumbInfo);
			}
			
			//update control panel
			var updateCPanel = function() {
				$gallery.trigger(UPDATE_INDEX).trigger(UPDATE_THUMB_INFO).trigger(UPDATE_THUMB_BTNS);				
			}
			
			//update indexes
			var updateIndexes = function() {
				if (prevSlots%numDisplay == 0 || prevSlots == maxSlots) {
					var i = Math.ceil(prevSlots/numDisplay);
					$indexes.filter(".index-hl").removeClass("index-hl");
					$($indexes.get(i)).addClass("index-hl");				
				}
			}
			
			//update thumb info
			var updateThumbInfo = function() {
				var start = Math.abs(pos/unitSize);
				var end = start + numDisplay;
				$thumbInfo.html((start + 1) + " - " + end + " / " + numItems);
			}
			
			//update thumb buttons
			var updateThumbBtns = function() {
				var start = Math.abs(pos/unitSize);
				var end = start + numDisplay;			
				$thumbBackBtn.css((start > 0) ? {opacity:1, cursor:"pointer"} : {opacity:BUTTON_OPACITY, cursor:"default"});
				$thumbFwdBtn.css((end < numItems) ? {opacity:1, cursor:"pointer"} : {opacity:BUTTON_OPACITY, cursor:"default"});					
			}
			
			//go to previous image
			var prevImg = function() {
				if (currIndex > 0) {
					prevIndex = currIndex;
					currIndex--;
				}
				else if (contImgNav) {
					prevIndex = currIndex;
					currIndex = numItems - 1;					
				}
				else {
					return;
				}
				$gallery.trigger(RESET);
				loadContent(currIndex);
				moveThumbs(currIndex);
				return false;
			}
			
			//go to next image
			var nextImg = function() {
				if (currIndex < numItems - 1) {
					prevIndex = currIndex;
					currIndex++;
				}
				else if (contImgNav) {
					prevIndex = currIndex;
					currIndex = 0;					
				}
				else {
					return;
				}
				$gallery.trigger(RESET);
				loadContent(currIndex);
				moveThumbs(currIndex);
				return false;
			}
			
			//rotate image
			var rotateImage = function() {
				prevIndex = currIndex;
				currIndex = (currIndex < numItems - 1) ? currIndex + 1 : 0;
				$gallery.trigger(RESET);				
				loadContent(currIndex);
				moveThumbs(currIndex);
			}
			
			//get previous thumbs
			var prevThumbs = function() {
				if (nextSlots < maxSlots) {
					var slots = moveBy1 ? 1 : Math.min(maxSlots - nextSlots, numDisplay);
					nextSlots += slots;
					prevSlots -= slots;
				}
				else if (contThumbNav) {
					nextSlots = 0;
					prevSlots = maxSlots;
				}
				else {
					return;
				}
				moveList();
				return false;
			}
				
			//get next thumbs
			var nextThumbs = function() {
				if (prevSlots < maxSlots) {
					var slots = moveBy1 ? 1 : Math.min(maxSlots - prevSlots, numDisplay);
					prevSlots += slots;
					nextSlots -= slots;		
				}
				else if (contThumbNav) {
					prevSlots = 0;
					nextSlots = maxSlots;			
				}
				else {
					return;
				}
				moveList();
				return false;
			}
			
			//move list
			var moveList = function() {
				pos = -prevSlots * unitSize;
				$thumbList.stop(true, true).animate({left:pos}, scrollSpeed);
				updateCPanel();
			}
			
			//move thumbs
			var moveThumbs = function(i) {
				goToIndex(Math.floor(i/numDisplay));
			}
			
			//go to index			
			var goToIndex = function(i) {
				var slots = i * numDisplay;
				if (slots > maxSlots) {
					slots = maxSlots;
				}		
				prevSlots = slots;
				nextSlots = maxSlots - slots;
				moveList();
			}
			
			//gallery mouseover
			var galleryOver = function() {
				rotate = false;
				$gallery.trigger(PAUSE);				
			}
			
			//gallery mouseout
			var galleryOut = function() {
				rotate = true;
				$gallery.trigger(START);
			}
			
			//load content
			var loadContent = function(i) {
				//select current thumb
				$thumbList.find(">li."+selectStyle).removeClass(selectStyle);				
				$items[i].addClass(selectStyle);
				
				//set delay
				delay = $items[i].data("delay");
				
				//update link
				var $currLink = $items[i].find("div.data>a");
				var href = $currLink.attr("href");
				if (href) {					
					$mainLink.unbind("click").css({cursor:"pointer"}).attr({href:href, target:$currLink.attr("target")});
				}
				else {
					$mainLink.click(preventDefault).css({cursor:"default"});
				}
				
				$gallery.trigger(UPDATE_IMG_INFO).trigger(UPDATE_IMG_BTNS);
				updateText();
				
				//load image
				if ($items[i].data("img")) {
					$preloader.hide();	
					displayContent($items[i].data("img"));
				}	
				else {	
					//load new image
					var $img = $("<img class='main-img'/>");
					$img.attr("src", $items[i].data("imgurl"));								
					if (!$img[0].complete) {	
						$preloader.show();
						$img.load(
							function() {
								$preloader.hide();
								storeImg($items[i], $(this));
								displayContent($(this));
							}
						).error(
							function() {
								alert("Error loading image");
							}
						);
					}
					else {
						$preloader.hide();
						storeImg($items[i], $img);
						displayContent($img);
					}
				}	    
			}
				
			//display content
			var displayContent = function($img) {
				vStripes.clear();
				hStripes.clear();
				setPrevious();
				var effect = $items[currIndex].data("effect");
				if (effect == EFFECTS["none"]) {
					showContent($img);
					return;
				}		
				
				if (effect == EFFECTS["random"]) {
					effect = Math.floor(Math.random() * (EFFECTS.length - 2));
				}				
				
				if (effect == EFFECTS["fade"]) {
					fadeInContent($img);
				}
				else if (effect < EFFECTS["horz.tl"]){
					vStripes.displayContent($img, effect);
				}
				else {
					hStripes.displayContent($img, effect);
				}
			}
			
			//set previous
			var setPrevious = function() {
				if (prevIndex >= 0) {
					var currSrc = $("img#curr-img").attr("src");
					var prevSrc = $items[prevIndex].data("imgurl");
					if (currSrc != prevSrc) {
						$("img.main-img", $mainLink).removeAttr("id").hide();
						var $img = $("img.main-img", $mainLink).filter(function() { return $(this).attr("src") == prevSrc; });
						$($img.get(0)).show();
					}
				}
			}
			
			//display image (no effect)
			var showContent = function($img) {
				$("img.main-img", $mainLink).removeAttr("id").hide();
				$img.attr("id", "curr-img").show();
				$gallery.trigger(START);	
			}
			
			//display content (fade effect)
			var fadeInContent = function($img) {
				$("img#curr-img", $mainLink).stop(true, true);
				$("img.main-img", $mainLink).removeAttr("id").css("z-index", 0);
				$img.attr("id", "curr-img").css("z-index", 1).stop(true, true).fadeIn(duration, 
					function() {
						$("img.main-img:not('#curr-img')", $mainLink).hide();
						$gallery.trigger(START);
					}
				);	
			}
			
			//process loaded thumb image
			var processLoadedImg = function() {
				processImg($(this));
			}
			
			//process thumb image
			var processImg = function($img) {
				var ratio;
				if ($img.outerWidth() > thumbWidth) {
					ratio = $img.outerHeight()/$img.outerWidth();
					$img.width(thumbWidth);
					$img.height(ratio * thumbWidth);
				}
				
				if ($img.outerHeight() > thumbHeight) {
					ratio = $img.outerWidth()/$img.outerHeight();
					$img.width(ratio * thumbHeight);
					$img.height(thumbHeight);
				}
				$img.css({left:Math.round((thumbWidth - $img.outerWidth())/2), top:Math.round((thumbHeight - $img.outerHeight())/2)});				
			}
			
			//load image
			var loadImg = function(loadIndex) {
				var $item = $items[loadIndex];
				var $img = $("<img class='main-img'/>");
				$img.attr("src", $item.data("imgurl"));
				$img.load(function() {
							if (!$item.data("img")) {
								storeImg($item, $(this));
							}
							loadIndex++
							if (loadIndex < $items.length) {
								loadImg(loadIndex);
							}
						})
					.error(function() {
							//error loading image, continue next
							loadIndex++
							if (loadIndex < $items.length) {
								loadImg(loadIndex);
							}
						});
			}
			
			//process & store image
			var storeImg = function($item, $img) {
				$mainLink.append($img);
				var tDiff = (screenHeight - $img.height())/2;
				var lDiff = (screenWidth  - $img.width())/2
				var top = 0, left = 0, vPad = 0, hPad = 0;
				if (tDiff > 0) {
					vPad = tDiff;
				}
				else if (tDiff < 0) {
					top = tDiff;
				}				
				if (lDiff > 0) {
					hPad = lDiff;
				}
				else if (lDiff < 0) {
					left = lDiff;
				}
				$img.css({top:top, left:left, "padding-top":vPad, "padding-bottom":vPad, "padding-left":hPad, "padding-right":hPad});	
				$item.data("img", $img);
			}
			
			//shuffle items
			var shuffleItems = function() {		
				for (var i = 0; i < $items.length; i++) {
					var ri = Math.floor(Math.random() * $items.length);
					var temp = $items[i];	
					$items[i] = $items[ri];
					$items[ri] = temp;				
				}
				
				for (var i = 0; i < $items.length; i++) {
					$items[i] = $items[i].clone(true);
				}
				
				for (var i = 0; i < $items.length; i++) {
					$($thumbs.get(i)).replaceWith($items[i]);
				}
			}
			
			//start timer
			var startTimer = function() {
				if (rotate && timerId == null) {
					var duration = Math.round($timer.data("pct") * delay);
					$timer.animate({width:(screenWidth+2)}, duration);
					timerId = setTimeout(rotateImage, duration);
				}
			}
			
			//reset timer
			var resetTimer = function() {
				clearTimeout(timerId);
				timerId = null;
				$timer.stop(true).width(0).data("pct", 1);
			}
			
			//pause timer
			var pauseTimer = function() {
				clearTimeout(timerId);
				timerId = null;
				var pct = 1 - ($timer.width()/(screenWidth+2));
				$timer.stop(true).data("pct", pct);
			}
			
			//prevent default behavior
			var preventDefault = function() {
				return false;
			}
			
			var onKeyPress = function(e) {
				switch(e.keyCode) {
					case 37:
						prevImg();
						break;
					case 39:
						nextImg();
						break;
				}
			}
		}
		
		//msie ver. check
		var msieCheck = function(ver) {
			if (jQuery.browser.msie && parseInt(jQuery.browser.version) <= ver) {
				return true;
			}
			return false;
		}
		
		//shuffle array
		var shuffleArray = function(arr) {
			var total =  arr.length;
			for (var i = 0; i < total; i++) {
				var ri = Math.floor(Math.random() * total);
				var temp = arr[i];
				arr[i] = arr[ri];
				arr[ri] = temp;	
			}	
		}
		
		//get positive number
		var getPosNumber = function(val, defaultVal) {
			if (!isNaN(val) && val > 0) {
				return val;
			}
			return defaultVal;
		}
		
		//get nonnegative number
		var getNonNegNumber = function(val, defaultVal) {
			if (!isNaN(val) && val >= 0) {
				return val;
			}
			return defaultVal;
		}
		
		var defaults = { 
			num_display:5,
			screen_width:720,
			screen_height:405,
			padding:10,
			thumb_width:125,
			thumb_height:70,
			thumb_margin:5,
			text_align:TOP,
			caption_align:BOTTOM,
			auto_rotate:true,
			delay:DEFAULT_DELAY,
			cont_imgnav:true,
			cont_thumbnav:true,
			display_imgnav:true,		
			display_imgnum:true,		
			display_timer:true,
			display_thumbnav:true,
			display_indexes:true,
			display_thumbnum:true,
			display_tooltip:false,
			display_arrow:true,
			mouseover_text:false,
			mouseover_info:false,
			mouseover_caption:false,
			mouseover_buttons:true,
			transition:"fade",
			transition_speed:DURATION,
			scroll_speed:SCROLL_SPEED,
			vert_size:STRIPE_SIZE,
			horz_size:STRIPE_SIZE,
			vstripe_delay:INTERVAL_DELAY,
			hstripe_delay:INTERVAL_DELAY,
			move_one:false,
			shuffle:false
		};
		
		var opts = $.extend({}, defaults, params);		
		return this.each(
			function() {
				var gallery = new Gallery($(this), opts);
				gallery.init();
			}
		);
	}
})(jQuery);