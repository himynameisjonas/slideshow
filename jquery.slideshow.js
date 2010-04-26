(function($) {
   var carouselen = null
	var container = null
   
   jQuery.slideshow = function(options) {
      var defaults = {
         bigElm:     '#showroom_box_2_entries',
         thumbsElm:  '#showroom_box_2_thumb_entries',
         auto:       '0',
         fx:         'scrollHorz',
         bigPrev:    '.BigScrollLeft',
         bigNext:    '.BigScrollRight',
         thumbNext:  '#showroom_box_2_right_scroll_link',
         thumbPrev:  '#showroom_box_2_left_scroll_link'
      };
      
      // Extend our default options with those provided.
      var opts = $.extend(defaults, options);
      // Our plugin implementation code goes here.

      init(opts)
      
   };
   
   function init (opts) {
      console.log("detta är init")
      console.log(opts)
      $(opts['thumbsElm']).jcarousel({
         auto: opts['auto'],
         initCallback: mycarousel_initCallback,
         buttonNextHTML: null,
         buttonPrevHTML: null
      });

      container = $(opts['bigElm']).cycle({
         fx:      opts['fx'],
         timeout: 0,
         prev:    opts['bigPrev'],
         next:    opts['bigNext'],
         after:   onAfter
      });
      
      function mycarousel_initCallback(carousel) {
         carouselen = carousel

          jQuery(opts['thumbNext']).bind('click', function() {
            carousel.next();
            return false;
          });

          jQuery(opts['thumbPrev']).bind('click', function() {
            carousel.prev();
            return false;
          });
		};
      
      $(opts['thumbsElm']).children().each(function(i,data) { 
         // create input 
         $(data).find("a").click(function() { 
            // cycle to the corresponding slide 
            container.cycle(i); 
            return false; 
         });
      });
      
      function onAfter(curr, next, opts) {
         var index = opts.currSlide;

         $(".Active").removeClass("Active")
         $(".jcarousel-item-"+(index+1)).addClass("Active")
         //console.log($j("jcarousel-item-"+(index+1)))
         if (carouselen) {
            carouselen.scroll(index-1)
         } else {
            console.log("ingen karusell fanns")
         }
      }
   }
})(jQuery);