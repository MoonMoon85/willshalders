$(document).ready(function () {
	var movementStrength = 50;
	var height = movementStrength / $(window).height();
	var width = movementStrength / $(window).width();
	$("body").mousemove(function(e){
	          var pageX = e.pageX - ($(window).width() / 2);
	          var pageY = e.pageY - ($(window).height() / 2);
	          var newvalueX = width * pageX * -1 - 25;
	          var newvalueY = height * pageY * -1 - 50;
	          $('body').css("background-position", newvalueX+"px     "+newvalueY+"px");
	});

	// $('.scroll-top-mobile').mouseover(function() {
	// 	$('.mobile-screen img').css("top", 0);
	// });

	// $('.scroll-bottom-mobile').mouseover(function() {
	// 	$('.mobile-screen img').css("top", -500);
	// });

	// $('.scroll-top-desktop').mouseover(function() {
	// 	$('.desktop-screen img').css("top", 0);
	// });

	// $('.scroll-bottom-desktop').mouseover(function() {
	// 	$('.desktop-screen img').css("top", -750);
	// });
	



	/**
     * Start of Barba.js 
     */
	Barba.Pjax.start();
    Barba.Prefetch.init();

    var FadeTransition = Barba.BaseTransition.extend({
	  	start: function() {
	    /**
	     * This function is automatically called as soon the Transition starts
	     * this.newContainerLoading is a Promise for the loading of the new container
	     * (Barba.js also comes with an handy Promise polyfill!)
	     */

	    // As soon the loading is finished and the old page is faded out, let's fade the new page
	    	Promise
	      		.all([this.newContainerLoading, this.fadeOut()])
	      		.then(this.fadeIn.bind(this));
	  	},

	  	fadeOut: function() {
	    	/**
	    	 * this.oldContainer is the HTMLElement of the old Container
	    	 */

	    	return $(this.oldContainer).animate({ opacity: 0 }).promise();
	  	},

	  	fadeIn: function() {
	    	/**
	     	* this.newContainer is the HTMLElement of the new Container
	    	 * At this stage newContainer is on the DOM (inside our #barba-container and with visibility: hidden)
	    	 * Please note, newContainer is available just after newContainerLoading is resolved!
	     	*/
	     	document.body.scrollTop = 0;
		    var _this = this;
		    var $el = $(this.newContainer);

		    $(this.oldContainer).hide();

		    $el.css({
		      visibility : 'visible',
		      opacity : 0
		    });

		    $el.animate({ opacity: 1 }, 400, function() {
		      /**
		       * Do not forget to call .done() as soon your transition is finished!
		       * .done() will automatically remove from the DOM the old Container
		       */

		      _this.done();
		    });

		 //    $('.scroll-top-mobile').mouseover(function() {
			// 	$('.mobile-screen img').css("top", 0);
			// });

			// $('.scroll-bottom-mobile').mouseover(function() {
			// 	$('.mobile-screen img').css("top", -1000);
			// });

			// $('.scroll-top-desktop').mouseover(function() {
			// 	$('.desktop-screen img').css("top", 0);
			// });

			// $('.scroll-bottom-desktop').mouseover(function() {
			// 	$('.desktop-screen img').css("top", -2000);
			// });

		   
		 }

		});

		/**
		 * Next step, you have to tell Barba to use the new Transition
		 */

	Barba.Pjax.getTransition = function() {
		  /**
		   * Here you can use your own logic!
		   * For example you can use different Transition based on the current page or link...
		   */

	  	return FadeTransition;
	};
});