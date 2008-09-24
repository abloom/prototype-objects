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