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
         interval:   1000, //milliseconds between slide transitions
         autoStart:  false,
         fx:         'scrollHorz',
         bigPrev:    '.BigScrollLeft',
         bigNext:    '.BigScrollRight',
         thumbNext:  null,
         thumbPrev:  null
      };
      
      // Extend our default options with those provided.
      var opts = $.extend(defaults, options);

      init(opts) // do the magic
      
      if (opts['thumbsElm']) { // set correct element to "active" on start
         $(".Active").removeClass("Active")
         $(".jcarousel-item-"+1).addClass("Active")         
      }
      
   };
   
   function init (opts) {
      
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
      
      container = $(opts['bigElm']).cycle({
         fx:      opts['fx'],
         timeout: parseInt(opts['interval']),
         prev:    opts['bigPrev'],
         next:    opts['bigNext'],
         before:   onBefore
      });
      
      // Pause the cycle if not auto start
      if (!opts['autoStart']) {
         container.cycle("pause")
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
      
      function onBefore(curr, next, opts2) {
         if (opts['thumbsElm']) { // With or without thumbnails
            
            var nextSlide = opts2.nextSlide+1;
            
            $(".Active").removeClass("Active")

            $(".jcarousel-item-"+nextSlide).addClass("Active")

            if (carouselen) {
               carouselen.scroll(nextSlide)
            } 
         }
      }
   }
})(jQuery);