/*

DEPENDS ON:
   - cycle        http://jquery.malsup.com/cycle/
   - jcarousel    http://sorgalla.com/jcarousel/

*/
(function($) {
   var carouselen = null
	var container = null
   
   jQuery.slideshow = function(options) {
      var defaults = {
         bigElm:     '#showroom_box_2_entries',
         thumbsElm:  null,
         auto:       0, //milliseconds between slide transitions (0 to disable auto advance)
         fx:         'scrollHorz',
         bigPrev:    '.BigScrollLeft',
         bigNext:    '.BigScrollRight',
         thumbNext:  null,
         thumbPrev:  null
      };
      
      // Extend our default options with those provided.
      var opts = $.extend(defaults, options);

      init(opts) // do the magic
      
   };
   
   function init (opts) {
      container = $(opts['bigElm']).cycle({
         fx:      opts['fx'],
         timeout: parseInt(opts['auto']),
         prev:    opts['bigPrev'],
         next:    opts['bigNext'],
         after:   onAfter
      });
      
      if (opts['thumbsElm']) { // With or without thumbnails
         $(opts['thumbsElm']).jcarousel({
            auto: 0,
            initCallback: mycarousel_initCallback,
            buttonNextHTML: null,
            buttonPrevHTML: null
         });
         
         $(opts['thumbsElm']).children().each(function(i,data) { 
            $(data).click(function() { 
               container.cycle(i); 
               return false; 
            });
         });
      };
      

      
      function mycarousel_initCallback(carousel) {
         carouselen = carousel         
         if (opts['thumbNext']) {
            jQuery(opts['thumbNext']).bind('click', function() {
              carousel.next();
              return false;
            });
         };
         if (opts['thumbPrev']) {
            jQuery(opts['thumbPrev']).bind('click', function() {
              carousel.prev();
              return false;
            });
         };
         
		};
      

      
      function onAfter(curr, next, opts2) {

         
         if (opts['thumbsElm']) { // With or without thumbnails
            var index = opts2.currSlide;
            
            $(".Active").removeClass("Active")
            
            
            $(".jcarousel-item-"+(index+1)).addClass("Active")

            if (carouselen) {
               carouselen.scroll(index-1)
            }
            
         }

      }
   }
})(jQuery);