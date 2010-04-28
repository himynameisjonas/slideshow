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
         bigElm:        '',            // element containing big slide elements
         thumbsElm:     null,          // element containing thumbs elements
         thumbCycle:    false,         // cycle/carousel on 'thumbs'
         interval:      1000,          // milliseconds between slide transitions
         autoStart:     false,         // auto start the cycle
         fx:            'scrollHorz',  // effect, see below for alternatives
         bigPrev:       '',            // element for previous-button
         bigNext:       '',            // element for next-button
         thumbNext:     null,          // element for next-thumb-button
         thumbPrev:     null,          // element for previous-thumb-button
         toggle:        null           // element for toggle autoplay
      };
      
      /*
      EFFECTS:
      
      blindX, blindY, blindZ, cover, curtainX, curtainY, fade,
      fadeZoom, growX, growY, none, scrollUp, scrollDown, scrollLeft,
      scrollRight, scrollHorz, scrollVert, shuffle, slideX, slideY,
      toss, turnUp, turnDown, turnLeft, turnRight, uncover, wipe, zoom
      
      */
      
      
      // Extend our default options with those provided.
      var opts = $.extend(defaults, options);

      init(opts) // do the magic
      
      if (opts['thumbsElm']) { // set correct element to "active" on start
         $(".Active").removeClass("Active")
         $($(opts['thumbsElm']).children()[0]).addClass("Active")
      }
      
   };
   
   function init (opts) {
      
      if (opts['thumbsElm']) { // With or without thumbnails
         if (opts['thumbCycle']) {
            $(opts['thumbsElm']).jcarousel({
               auto: 0,
               initCallback: mycarousel_initCallback,
               buttonNextHTML: null,
               buttonPrevHTML: null
            });
         };
         
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
            
            if (opts['tumbCycle']) {
               $(".jcarousel-item-"+nextSlide).addClass("Active")
            } else {
               $($(opts['thumbsElm']).children()[nextSlide-1]).addClass("Active")
            };

            if (carouselen) {
               carouselen.scroll(nextSlide)
            } 
         }
      }
      
      if (opts['toggle']) {
         $(opts['toggle']).click(function(){
            container.cycle("next")
            container.cycle("toggle")
            return false;
         })
      }; 
   }
})(jQuery);