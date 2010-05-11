/*
DEPENDS ON:
   - cycle        http://jquery.malsup.com/cycle/
   - jcarousel    http://sorgalla.com/jcarousel/

*/
(function($) {
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
         toggle:        null,          // element for toggle autoplay
         thumbsVisible: null           // number of thumbs visible at the same time
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
      
      $(opts['bigElm']).each(function(i,bigElement){
         thumbElement = $(opts['thumbsElm'])[i];
         new Slideshow(opts,thumbElement,bigElement);
      })
      
   };
   
   
   function Slideshow (opts,thumb,big) {
      var that = this;
      this.opts = jQuery.extend(true, {}, opts);
      this.opts['thumbsElm'] = thumb;
      this.opts['bigElm'] = big;
      //console.log(this.opts['thumbsElm'])
      
      
      this.carouselen = null
      this.container = null
      
      
      if (that.opts['thumbsElm']) { // With or without thumbnails
         if (that.opts['thumbCycle']) {
            $(that.opts['thumbsElm']).jcarousel({
               auto: 0,
               initCallback: mycarousel_initCallback,
               buttonNextHTML: null,
               buttonPrevHTML: null,
               wrap: "both",
               visible: that.opts['thumbsVisible'],
               easing: "swing"
            });
         };
         
         $(that.opts['thumbsElm']).children().each(function(i,data) {
            $(data).click(function() {
               that.container.cycle(i); 
               return false; 
            });
         });
      };
      
      
      that.container = $(that.opts['bigElm']).cycle({
         fx:      that.opts['fx'],
         timeout: parseInt(that.opts['interval']),
         prev:    that.opts['bigPrev'],
         next:    that.opts['bigNext'],
         before:   onBefore
      });
      
      // Pause the cycle if not auto start
      if (!that.opts['autoStart']) {
         that.container.cycle("pause")
      };
      
      
      function mycarousel_initCallback(carousel) {
         that.carouselen = carousel         
         if (that.opts['thumbNext']) {
            if ($(that.opts['thumbNext']).size() > 1) {                       
               $(that.opts['thumbsElm']).parentsUntil(".BoxSecond").find(that.opts['thumbNext']).bind('click', function() {
                 carousel.next();
                 return false;
               });
            } else {
               $(that.opts['thumbNext']).bind('click', function() {
                 carousel.next();
                 return false;
               });
            }
         };
         
         if (that.opts['thumbPrev']) {
            if ($(that.opts['thumbPrev']).size() > 1) {
               $(that.opts['thumbsElm']).parentsUntil(".BoxSecond").find(that.opts['thumbPrev']).bind('click', function() {
                 carousel.prev();
                 return false;
               });
            } else {
               $(that.opts['thumbPrev']).bind('click', function() {
                 carousel.prev();
                 return false;
               });
            }

         }
         
      };
      
      function onBefore(curr, next, opts2) {
         if (that.opts['thumbsElm']) { // With or without thumbnails
            
            var nextSlide = opts2.nextSlide+1;
            
            $(that.opts['thumbsElm']).find(".Active").removeClass("Active")
            
            $($(that.opts['thumbsElm']).children()[nextSlide-1]).addClass("Active")

            if (that.carouselen) {
               that.carouselen.scroll(nextSlide)
            } 
         }
      }
      
      
      if (that.opts['toggle']) {
         $(that.opts['toggle']).click(function(){
            that.container.cycle("next")
            that.container.cycle("toggle")
            return false;
         })
      };
      
      if (that.opts['thumbsElm']) { // set correct element to "active" on start
         $(that.opts['thumbsElm']).find(".Active").removeClass("Active")
         $($(that.opts['thumbsElm']).children()[0]).addClass("Active")
      }
      
   }
   
})(jQuery);