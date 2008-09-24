/*
  The Scroller class is a simple "news ticker" style widget.
  
  The markup should look something like this:

  <script type="text/javascript" src="/javascripts/prototype.js"></script>
	<script type="text/javascript" src="/javascripts/effects.js"></script>
	<script type="text/javascript" src="/javascripts/scroller.js"></script>
	<script type="text/javascript" charset="utf-8">
	  Event.observe(window, 'load', function(e) {
	    var scroller = new Scroller("display", "contents", {delay: 7000});
	  });
	</script>
	
  ....
  
  <span id="display">&nbsp;</span>
  <div id="contents" style="display: none;">
  	<div>Lorem ipsum dolor sit amet <b>consectetur adipisicing elit</b></div>
  	<div><a href="/somewhere">sed do eiusmod tempor</a> ut labore et dolore magna aliqua</div>
  	<div><a href="/else">quis nostrud exercitation ullamco</a> Ut enim ad minim</div>
  </div>
  
  The children of the "contents" element will be displayed in the "display" container. The contents are 
  faded in and out. An optional delay value can be passed in. This represents the lenght in milliseconds
  elements are shown for before the fadeout starts. Mousing over the a story will pause the ticker.
  Shortly after mousing out, the article will rotate.
  
  Multiple "tickers" can be created for different parts of the same page with unique contents,
  display locations and delays.
  
*/
var Scroller = Class.create({
  initialize : function(display_id, content_id, opts) {
    opts = (opts == null ? { delay: 5500 } : opts);
    
    this.timer = null;
    this.counter = 0;
    this.display_el = $(display_id);
    this.content_el = $(content_id);
    this.delay = opts['delay'] - 750;
    this.contents = $A(this.content_el.childElements()).reject(function(obj) { return !obj.innerHTML; });
  	
    Event.observe(this.display_el, 'mouseover', this.haltFader.bindAsEventListener(this));
    Event.observe(this.display_el, 'mouseout', this.restartRotation.bindAsEventListener(this));
    
    this.rotateDisplay();
  },
  
  rotateDisplay : function() {    
    if( this.counter >= this.contents.length ) {
      this.counter = 0;  
    }

  	this.display_el.innerHTML = this.contents[this.counter++].innerHTML;
    new Effect.Opacity(this.display_el, { 
      to: 1.0, 
      duration: 0.25, 
    });
    
    this.timer = setTimeout(function(obj) { obj.hideDisplay(); }, this.delay, this);
  },
  
  restartRotation : function() {
  	this.timer = setTimeout(function(obj) { obj.hideDisplay(); }, 750, this);
  },

  haltFader : function(obj) {
  	clearTimeout(this.timer);
  },
  
  hideDisplay : function() {
    new Effect.Opacity(this.display_el, {
      duration: 0.5, 
      to: 0.0
    });
    
  	this.timer = setTimeout(function(obj) { obj.rotateDisplay(); }, 1000, this);
  }
});