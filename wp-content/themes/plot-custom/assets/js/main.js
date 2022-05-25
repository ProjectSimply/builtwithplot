(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
!function(e,t){if("function"==typeof define&&define.amd)define(["exports"],t);else if("undefined"!=typeof exports)t(exports);else{var o={};t(o),e.bodyScrollLock=o}}(this,function(exports){"use strict";function i(e){if(Array.isArray(e)){for(var t=0,o=Array(e.length);t<e.length;t++)o[t]=e[t];return o}return Array.from(e)}Object.defineProperty(exports,"__esModule",{value:!0});var l=!1;if("undefined"!=typeof window){var e={get passive(){l=!0}};window.addEventListener("testPassive",null,e),window.removeEventListener("testPassive",null,e)}function d(t){return u.some(function(e){return!(!e.options.allowTouchMove||!e.options.allowTouchMove(t))})}function c(e){var t=e||window.event;return!!d(t.target)||(1<t.touches.length||(t.preventDefault&&t.preventDefault(),!1))}function o(){setTimeout(function(){void 0!==m&&(document.body.style.paddingRight=m,m=void 0),void 0!==f&&(document.body.style.overflow=f,f=void 0)})}var a="undefined"!=typeof window&&window.navigator&&window.navigator.platform&&(/iP(ad|hone|od)/.test(window.navigator.platform)||"MacIntel"===window.navigator.platform&&1<window.navigator.maxTouchPoints),u=[],s=!1,v=-1,f=void 0,m=void 0;exports.disableBodyScroll=function(r,e){if(a){if(!r)return void console.error("disableBodyScroll unsuccessful - targetElement must be provided when calling disableBodyScroll on IOS devices.");if(r&&!u.some(function(e){return e.targetElement===r})){var t={targetElement:r,options:e||{}};u=[].concat(i(u),[t]),r.ontouchstart=function(e){1===e.targetTouches.length&&(v=e.targetTouches[0].clientY)},r.ontouchmove=function(e){var t,o,n,i;1===e.targetTouches.length&&(o=r,i=(t=e).targetTouches[0].clientY-v,d(t.target)||(o&&0===o.scrollTop&&0<i||(n=o)&&n.scrollHeight-n.scrollTop<=n.clientHeight&&i<0?c(t):t.stopPropagation()))},s||(document.addEventListener("touchmove",c,l?{passive:!1}:void 0),s=!0)}}else{n=e,setTimeout(function(){if(void 0===m){var e=!!n&&!0===n.reserveScrollBarGap,t=window.innerWidth-document.documentElement.clientWidth;e&&0<t&&(m=document.body.style.paddingRight,document.body.style.paddingRight=t+"px")}void 0===f&&(f=document.body.style.overflow,document.body.style.overflow="hidden")});var o={targetElement:r,options:e||{}};u=[].concat(i(u),[o])}var n},exports.clearAllBodyScrollLocks=function(){a?(u.forEach(function(e){e.targetElement.ontouchstart=null,e.targetElement.ontouchmove=null}),s&&(document.removeEventListener("touchmove",c,l?{passive:!1}:void 0),s=!1),u=[],v=-1):(o(),u=[])},exports.enableBodyScroll=function(t){if(a){if(!t)return void console.error("enableBodyScroll unsuccessful - targetElement must be provided when calling enableBodyScroll on IOS devices.");t.ontouchstart=null,t.ontouchmove=null,u=u.filter(function(e){return e.targetElement!==t}),s&&0===u.length&&(document.removeEventListener("touchmove",c,l?{passive:!1}:void 0),s=!1)}else(u=u.filter(function(e){return e.targetElement!==t})).length||o()}});

},{}],2:[function(require,module,exports){
/**
 * matchesSelector v2.0.2
 * matchesSelector( element, '.selector' )
 * MIT license
 */

/*jshint browser: true, strict: true, undef: true, unused: true */

( function( window, factory ) {
  /*global define: false, module: false */
  'use strict';
  // universal module definition
  if ( typeof define == 'function' && define.amd ) {
    // AMD
    define( factory );
  } else if ( typeof module == 'object' && module.exports ) {
    // CommonJS
    module.exports = factory();
  } else {
    // browser global
    window.matchesSelector = factory();
  }

}( window, function factory() {
  'use strict';

  var matchesMethod = ( function() {
    var ElemProto = window.Element.prototype;
    // check for the standard method name first
    if ( ElemProto.matches ) {
      return 'matches';
    }
    // check un-prefixed
    if ( ElemProto.matchesSelector ) {
      return 'matchesSelector';
    }
    // check vendor prefixes
    var prefixes = [ 'webkit', 'moz', 'ms', 'o' ];

    for ( var i=0; i < prefixes.length; i++ ) {
      var prefix = prefixes[i];
      var method = prefix + 'MatchesSelector';
      if ( ElemProto[ method ] ) {
        return method;
      }
    }
  })();

  return function matchesSelector( elem, selector ) {
    return elem[ matchesMethod ]( selector );
  };

}));

},{}],3:[function(require,module,exports){
/**
 * EvEmitter v1.1.0
 * Lil' event emitter
 * MIT License
 */

/* jshint unused: true, undef: true, strict: true */

( function( global, factory ) {
  // universal module definition
  /* jshint strict: false */ /* globals define, module, window */
  if ( typeof define == 'function' && define.amd ) {
    // AMD - RequireJS
    define( factory );
  } else if ( typeof module == 'object' && module.exports ) {
    // CommonJS - Browserify, Webpack
    module.exports = factory();
  } else {
    // Browser globals
    global.EvEmitter = factory();
  }

}( typeof window != 'undefined' ? window : this, function() {

"use strict";

function EvEmitter() {}

var proto = EvEmitter.prototype;

proto.on = function( eventName, listener ) {
  if ( !eventName || !listener ) {
    return;
  }
  // set events hash
  var events = this._events = this._events || {};
  // set listeners array
  var listeners = events[ eventName ] = events[ eventName ] || [];
  // only add once
  if ( listeners.indexOf( listener ) == -1 ) {
    listeners.push( listener );
  }

  return this;
};

proto.once = function( eventName, listener ) {
  if ( !eventName || !listener ) {
    return;
  }
  // add event
  this.on( eventName, listener );
  // set once flag
  // set onceEvents hash
  var onceEvents = this._onceEvents = this._onceEvents || {};
  // set onceListeners object
  var onceListeners = onceEvents[ eventName ] = onceEvents[ eventName ] || {};
  // set flag
  onceListeners[ listener ] = true;

  return this;
};

proto.off = function( eventName, listener ) {
  var listeners = this._events && this._events[ eventName ];
  if ( !listeners || !listeners.length ) {
    return;
  }
  var index = listeners.indexOf( listener );
  if ( index != -1 ) {
    listeners.splice( index, 1 );
  }

  return this;
};

proto.emitEvent = function( eventName, args ) {
  var listeners = this._events && this._events[ eventName ];
  if ( !listeners || !listeners.length ) {
    return;
  }
  // copy over to avoid interference if .off() in listener
  listeners = listeners.slice(0);
  args = args || [];
  // once stuff
  var onceListeners = this._onceEvents && this._onceEvents[ eventName ];

  for ( var i=0; i < listeners.length; i++ ) {
    var listener = listeners[i]
    var isOnce = onceListeners && onceListeners[ listener ];
    if ( isOnce ) {
      // remove listener
      // remove before trigger to prevent recursion
      this.off( eventName, listener );
      // unset once flag
      delete onceListeners[ listener ];
    }
    // trigger listener
    listener.apply( this, args );
  }

  return this;
};

proto.allOff = function() {
  delete this._events;
  delete this._onceEvents;
};

return EvEmitter;

}));

},{}],4:[function(require,module,exports){
/**
 * Fizzy UI utils v2.0.7
 * MIT license
 */

/*jshint browser: true, undef: true, unused: true, strict: true */

( function( window, factory ) {
  // universal module definition
  /*jshint strict: false */ /*globals define, module, require */

  if ( typeof define == 'function' && define.amd ) {
    // AMD
    define( [
      'desandro-matches-selector/matches-selector'
    ], function( matchesSelector ) {
      return factory( window, matchesSelector );
    });
  } else if ( typeof module == 'object' && module.exports ) {
    // CommonJS
    module.exports = factory(
      window,
      require('desandro-matches-selector')
    );
  } else {
    // browser global
    window.fizzyUIUtils = factory(
      window,
      window.matchesSelector
    );
  }

}( window, function factory( window, matchesSelector ) {

'use strict';

var utils = {};

// ----- extend ----- //

// extends objects
utils.extend = function( a, b ) {
  for ( var prop in b ) {
    a[ prop ] = b[ prop ];
  }
  return a;
};

// ----- modulo ----- //

utils.modulo = function( num, div ) {
  return ( ( num % div ) + div ) % div;
};

// ----- makeArray ----- //

var arraySlice = Array.prototype.slice;

// turn element or nodeList into an array
utils.makeArray = function( obj ) {
  if ( Array.isArray( obj ) ) {
    // use object if already an array
    return obj;
  }
  // return empty array if undefined or null. #6
  if ( obj === null || obj === undefined ) {
    return [];
  }

  var isArrayLike = typeof obj == 'object' && typeof obj.length == 'number';
  if ( isArrayLike ) {
    // convert nodeList to array
    return arraySlice.call( obj );
  }

  // array of single index
  return [ obj ];
};

// ----- removeFrom ----- //

utils.removeFrom = function( ary, obj ) {
  var index = ary.indexOf( obj );
  if ( index != -1 ) {
    ary.splice( index, 1 );
  }
};

// ----- getParent ----- //

utils.getParent = function( elem, selector ) {
  while ( elem.parentNode && elem != document.body ) {
    elem = elem.parentNode;
    if ( matchesSelector( elem, selector ) ) {
      return elem;
    }
  }
};

// ----- getQueryElement ----- //

// use element as selector string
utils.getQueryElement = function( elem ) {
  if ( typeof elem == 'string' ) {
    return document.querySelector( elem );
  }
  return elem;
};

// ----- handleEvent ----- //

// enable .ontype to trigger from .addEventListener( elem, 'type' )
utils.handleEvent = function( event ) {
  var method = 'on' + event.type;
  if ( this[ method ] ) {
    this[ method ]( event );
  }
};

// ----- filterFindElements ----- //

utils.filterFindElements = function( elems, selector ) {
  // make array of elems
  elems = utils.makeArray( elems );
  var ffElems = [];

  elems.forEach( function( elem ) {
    // check that elem is an actual element
    if ( !( elem instanceof HTMLElement ) ) {
      return;
    }
    // add elem if no selector
    if ( !selector ) {
      ffElems.push( elem );
      return;
    }
    // filter & find items if we have a selector
    // filter
    if ( matchesSelector( elem, selector ) ) {
      ffElems.push( elem );
    }
    // find children
    var childElems = elem.querySelectorAll( selector );
    // concat childElems to filterFound array
    for ( var i=0; i < childElems.length; i++ ) {
      ffElems.push( childElems[i] );
    }
  });

  return ffElems;
};

// ----- debounceMethod ----- //

utils.debounceMethod = function( _class, methodName, threshold ) {
  threshold = threshold || 100;
  // original method
  var method = _class.prototype[ methodName ];
  var timeoutName = methodName + 'Timeout';

  _class.prototype[ methodName ] = function() {
    var timeout = this[ timeoutName ];
    clearTimeout( timeout );

    var args = arguments;
    var _this = this;
    this[ timeoutName ] = setTimeout( function() {
      method.apply( _this, args );
      delete _this[ timeoutName ];
    }, threshold );
  };
};

// ----- docReady ----- //

utils.docReady = function( callback ) {
  var readyState = document.readyState;
  if ( readyState == 'complete' || readyState == 'interactive' ) {
    // do async to allow for other scripts to run. metafizzy/flickity#441
    setTimeout( callback );
  } else {
    document.addEventListener( 'DOMContentLoaded', callback );
  }
};

// ----- htmlInit ----- //

// http://jamesroberts.name/blog/2010/02/22/string-functions-for-javascript-trim-to-camel-case-to-dashed-and-to-underscore/
utils.toDashed = function( str ) {
  return str.replace( /(.)([A-Z])/g, function( match, $1, $2 ) {
    return $1 + '-' + $2;
  }).toLowerCase();
};

var console = window.console;
/**
 * allow user to initialize classes via [data-namespace] or .js-namespace class
 * htmlInit( Widget, 'widgetName' )
 * options are parsed from data-namespace-options
 */
utils.htmlInit = function( WidgetClass, namespace ) {
  utils.docReady( function() {
    var dashedNamespace = utils.toDashed( namespace );
    var dataAttr = 'data-' + dashedNamespace;
    var dataAttrElems = document.querySelectorAll( '[' + dataAttr + ']' );
    var jsDashElems = document.querySelectorAll( '.js-' + dashedNamespace );
    var elems = utils.makeArray( dataAttrElems )
      .concat( utils.makeArray( jsDashElems ) );
    var dataOptionsAttr = dataAttr + '-options';
    var jQuery = window.jQuery;

    elems.forEach( function( elem ) {
      var attr = elem.getAttribute( dataAttr ) ||
        elem.getAttribute( dataOptionsAttr );
      var options;
      try {
        options = attr && JSON.parse( attr );
      } catch ( error ) {
        // log error, do not initialize
        if ( console ) {
          console.error( 'Error parsing ' + dataAttr + ' on ' + elem.className +
          ': ' + error );
        }
        return;
      }
      // initialize
      var instance = new WidgetClass( elem, options );
      // make available via $().data('namespace')
      if ( jQuery ) {
        jQuery.data( elem, namespace, instance );
      }
    });

  });
};

// -----  ----- //

return utils;

}));

},{"desandro-matches-selector":2}],5:[function(require,module,exports){
// add, remove cell
( function( window, factory ) {
  // universal module definition
  /* jshint strict: false */
  if ( typeof define == 'function' && define.amd ) {
    // AMD
    define( [
      './flickity',
      'fizzy-ui-utils/utils'
    ], function( Flickity, utils ) {
      return factory( window, Flickity, utils );
    });
  } else if ( typeof module == 'object' && module.exports ) {
    // CommonJS
    module.exports = factory(
      window,
      require('./flickity'),
      require('fizzy-ui-utils')
    );
  } else {
    // browser global
    factory(
      window,
      window.Flickity,
      window.fizzyUIUtils
    );
  }

}( window, function factory( window, Flickity, utils ) {

'use strict';

// append cells to a document fragment
function getCellsFragment( cells ) {
  var fragment = document.createDocumentFragment();
  cells.forEach( function( cell ) {
    fragment.appendChild( cell.element );
  });
  return fragment;
}

// -------------------------- add/remove cell prototype -------------------------- //

var proto = Flickity.prototype;

/**
 * Insert, prepend, or append cells
 * @param {Element, Array, NodeList} elems
 * @param {Integer} index
 */
proto.insert = function( elems, index ) {
  var cells = this._makeCells( elems );
  if ( !cells || !cells.length ) {
    return;
  }
  var len = this.cells.length;
  // default to append
  index = index === undefined ? len : index;
  // add cells with document fragment
  var fragment = getCellsFragment( cells );
  // append to slider
  var isAppend = index == len;
  if ( isAppend ) {
    this.slider.appendChild( fragment );
  } else {
    var insertCellElement = this.cells[ index ].element;
    this.slider.insertBefore( fragment, insertCellElement );
  }
  // add to this.cells
  if ( index === 0 ) {
    // prepend, add to start
    this.cells = cells.concat( this.cells );
  } else if ( isAppend ) {
    // append, add to end
    this.cells = this.cells.concat( cells );
  } else {
    // insert in this.cells
    var endCells = this.cells.splice( index, len - index );
    this.cells = this.cells.concat( cells ).concat( endCells );
  }

  this._sizeCells( cells );
  this.cellChange( index, true );
};

proto.append = function( elems ) {
  this.insert( elems, this.cells.length );
};

proto.prepend = function( elems ) {
  this.insert( elems, 0 );
};

/**
 * Remove cells
 * @param {Element, Array, NodeList} elems
 */
proto.remove = function( elems ) {
  var cells = this.getCells( elems );
  if ( !cells || !cells.length ) {
    return;
  }

  var minCellIndex = this.cells.length - 1;
  // remove cells from collection & DOM
  cells.forEach( function( cell ) {
    cell.remove();
    var index = this.cells.indexOf( cell );
    minCellIndex = Math.min( index, minCellIndex );
    utils.removeFrom( this.cells, cell );
  }, this );

  this.cellChange( minCellIndex, true );
};

/**
 * logic to be run after a cell's size changes
 * @param {Element} elem - cell's element
 */
proto.cellSizeChange = function( elem ) {
  var cell = this.getCell( elem );
  if ( !cell ) {
    return;
  }
  cell.getSize();

  var index = this.cells.indexOf( cell );
  this.cellChange( index );
};

/**
 * logic any time a cell is changed: added, removed, or size changed
 * @param {Integer} changedCellIndex - index of the changed cell, optional
 */
proto.cellChange = function( changedCellIndex, isPositioningSlider ) {
  var prevSelectedElem = this.selectedElement;
  this._positionCells( changedCellIndex );
  this._getWrapShiftCells();
  this.setGallerySize();
  // update selectedIndex
  // try to maintain position & select previous selected element
  var cell = this.getCell( prevSelectedElem );
  if ( cell ) {
    this.selectedIndex = this.getCellSlideIndex( cell );
  }
  this.selectedIndex = Math.min( this.slides.length - 1, this.selectedIndex );

  this.emitEvent( 'cellChange', [ changedCellIndex ] );
  // position slider
  this.select( this.selectedIndex );
  // do not position slider after lazy load
  if ( isPositioningSlider ) {
    this.positionSliderAtSelected();
  }
};

// -----  ----- //

return Flickity;

}));

},{"./flickity":9,"fizzy-ui-utils":4}],6:[function(require,module,exports){
// animate
( function( window, factory ) {
  // universal module definition
  /* jshint strict: false */
  if ( typeof define == 'function' && define.amd ) {
    // AMD
    define( [
      'fizzy-ui-utils/utils'
    ], function( utils ) {
      return factory( window, utils );
    });
  } else if ( typeof module == 'object' && module.exports ) {
    // CommonJS
    module.exports = factory(
      window,
      require('fizzy-ui-utils')
    );
  } else {
    // browser global
    window.Flickity = window.Flickity || {};
    window.Flickity.animatePrototype = factory(
      window,
      window.fizzyUIUtils
    );
  }

}( window, function factory( window, utils ) {

'use strict';

// -------------------------- animate -------------------------- //

var proto = {};

proto.startAnimation = function() {
  if ( this.isAnimating ) {
    return;
  }

  this.isAnimating = true;
  this.restingFrames = 0;
  this.animate();
};

proto.animate = function() {
  this.applyDragForce();
  this.applySelectedAttraction();

  var previousX = this.x;

  this.integratePhysics();
  this.positionSlider();
  this.settle( previousX );
  // animate next frame
  if ( this.isAnimating ) {
    var _this = this;
    requestAnimationFrame( function animateFrame() {
      _this.animate();
    });
  }
};

proto.positionSlider = function() {
  var x = this.x;
  // wrap position around
  if ( this.options.wrapAround && this.cells.length > 1 ) {
    x = utils.modulo( x, this.slideableWidth );
    x = x - this.slideableWidth;
    this.shiftWrapCells( x );
  }

  this.setTranslateX( x, this.isAnimating );
  this.dispatchScrollEvent();
};

proto.setTranslateX = function( x, is3d ) {
  x += this.cursorPosition;
  // reverse if right-to-left and using transform
  x = this.options.rightToLeft ? -x : x;
  var translateX = this.getPositionValue( x );
  // use 3D tranforms for hardware acceleration on iOS
  // but use 2D when settled, for better font-rendering
  this.slider.style.transform = is3d ?
    'translate3d(' + translateX + ',0,0)' : 'translateX(' + translateX + ')';
};

proto.dispatchScrollEvent = function() {
  var firstSlide = this.slides[0];
  if ( !firstSlide ) {
    return;
  }
  var positionX = -this.x - firstSlide.target;
  var progress = positionX / this.slidesWidth;
  this.dispatchEvent( 'scroll', null, [ progress, positionX ] );
};

proto.positionSliderAtSelected = function() {
  if ( !this.cells.length ) {
    return;
  }
  this.x = -this.selectedSlide.target;
  this.velocity = 0; // stop wobble
  this.positionSlider();
};

proto.getPositionValue = function( position ) {
  if ( this.options.percentPosition ) {
    // percent position, round to 2 digits, like 12.34%
    return ( Math.round( ( position / this.size.innerWidth ) * 10000 ) * 0.01 )+ '%';
  } else {
    // pixel positioning
    return Math.round( position ) + 'px';
  }
};

proto.settle = function( previousX ) {
  // keep track of frames where x hasn't moved
  if ( !this.isPointerDown && Math.round( this.x * 100 ) == Math.round( previousX * 100 ) ) {
    this.restingFrames++;
  }
  // stop animating if resting for 3 or more frames
  if ( this.restingFrames > 2 ) {
    this.isAnimating = false;
    delete this.isFreeScrolling;
    // render position with translateX when settled
    this.positionSlider();
    this.dispatchEvent( 'settle', null, [ this.selectedIndex ] );
  }
};

proto.shiftWrapCells = function( x ) {
  // shift before cells
  var beforeGap = this.cursorPosition + x;
  this._shiftCells( this.beforeShiftCells, beforeGap, -1 );
  // shift after cells
  var afterGap = this.size.innerWidth - ( x + this.slideableWidth + this.cursorPosition );
  this._shiftCells( this.afterShiftCells, afterGap, 1 );
};

proto._shiftCells = function( cells, gap, shift ) {
  for ( var i=0; i < cells.length; i++ ) {
    var cell = cells[i];
    var cellShift = gap > 0 ? shift : 0;
    cell.wrapShift( cellShift );
    gap -= cell.size.outerWidth;
  }
};

proto._unshiftCells = function( cells ) {
  if ( !cells || !cells.length ) {
    return;
  }
  for ( var i=0; i < cells.length; i++ ) {
    cells[i].wrapShift( 0 );
  }
};

// -------------------------- physics -------------------------- //

proto.integratePhysics = function() {
  this.x += this.velocity;
  this.velocity *= this.getFrictionFactor();
};

proto.applyForce = function( force ) {
  this.velocity += force;
};

proto.getFrictionFactor = function() {
  return 1 - this.options[ this.isFreeScrolling ? 'freeScrollFriction' : 'friction' ];
};

proto.getRestingPosition = function() {
  // my thanks to Steven Wittens, who simplified this math greatly
  return this.x + this.velocity / ( 1 - this.getFrictionFactor() );
};

proto.applyDragForce = function() {
  if ( !this.isDraggable || !this.isPointerDown ) {
    return;
  }
  // change the position to drag position by applying force
  var dragVelocity = this.dragX - this.x;
  var dragForce = dragVelocity - this.velocity;
  this.applyForce( dragForce );
};

proto.applySelectedAttraction = function() {
  // do not attract if pointer down or no slides
  var dragDown = this.isDraggable && this.isPointerDown;
  if ( dragDown || this.isFreeScrolling || !this.slides.length ) {
    return;
  }
  var distance = this.selectedSlide.target * -1 - this.x;
  var force = distance * this.options.selectedAttraction;
  this.applyForce( force );
};

return proto;

}));

},{"fizzy-ui-utils":4}],7:[function(require,module,exports){
// Flickity.Cell
( function( window, factory ) {
  // universal module definition
  /* jshint strict: false */
  if ( typeof define == 'function' && define.amd ) {
    // AMD
    define( [
      'get-size/get-size'
    ], function( getSize ) {
      return factory( window, getSize );
    });
  } else if ( typeof module == 'object' && module.exports ) {
    // CommonJS
    module.exports = factory(
      window,
      require('get-size')
    );
  } else {
    // browser global
    window.Flickity = window.Flickity || {};
    window.Flickity.Cell = factory(
      window,
      window.getSize
    );
  }

}( window, function factory( window, getSize ) {

'use strict';

function Cell( elem, parent ) {
  this.element = elem;
  this.parent = parent;

  this.create();
}

var proto = Cell.prototype;

proto.create = function() {
  this.element.style.position = 'absolute';
  this.element.setAttribute( 'aria-hidden', 'true' );
  this.x = 0;
  this.shift = 0;
};

proto.destroy = function() {
  // reset style
  this.unselect();
  this.element.style.position = '';
  var side = this.parent.originSide;
  this.element.style[ side ] = '';
};

proto.getSize = function() {
  this.size = getSize( this.element );
};

proto.setPosition = function( x ) {
  this.x = x;
  this.updateTarget();
  this.renderPosition( x );
};

// setDefaultTarget v1 method, backwards compatibility, remove in v3
proto.updateTarget = proto.setDefaultTarget = function() {
  var marginProperty = this.parent.originSide == 'left' ? 'marginLeft' : 'marginRight';
  this.target = this.x + this.size[ marginProperty ] +
    this.size.width * this.parent.cellAlign;
};

proto.renderPosition = function( x ) {
  // render position of cell with in slider
  var side = this.parent.originSide;
  this.element.style[ side ] = this.parent.getPositionValue( x );
};

proto.select = function() {
  this.element.classList.add('is-selected');
  this.element.removeAttribute('aria-hidden');
};

proto.unselect = function() {
  this.element.classList.remove('is-selected');
  this.element.setAttribute( 'aria-hidden', 'true' );
};

/**
 * @param {Integer} factor - 0, 1, or -1
**/
proto.wrapShift = function( shift ) {
  this.shift = shift;
  this.renderPosition( this.x + this.parent.slideableWidth * shift );
};

proto.remove = function() {
  this.element.parentNode.removeChild( this.element );
};

return Cell;

}));

},{"get-size":16}],8:[function(require,module,exports){
// drag
( function( window, factory ) {
  // universal module definition
  /* jshint strict: false */
  if ( typeof define == 'function' && define.amd ) {
    // AMD
    define( [
      './flickity',
      'unidragger/unidragger',
      'fizzy-ui-utils/utils'
    ], function( Flickity, Unidragger, utils ) {
      return factory( window, Flickity, Unidragger, utils );
    });
  } else if ( typeof module == 'object' && module.exports ) {
    // CommonJS
    module.exports = factory(
      window,
      require('./flickity'),
      require('unidragger'),
      require('fizzy-ui-utils')
    );
  } else {
    // browser global
    window.Flickity = factory(
      window,
      window.Flickity,
      window.Unidragger,
      window.fizzyUIUtils
    );
  }

}( window, function factory( window, Flickity, Unidragger, utils ) {

'use strict';

// ----- defaults ----- //

utils.extend( Flickity.defaults, {
  draggable: '>1',
  dragThreshold: 3,
});

// ----- create ----- //

Flickity.createMethods.push('_createDrag');

// -------------------------- drag prototype -------------------------- //

var proto = Flickity.prototype;
utils.extend( proto, Unidragger.prototype );
proto._touchActionValue = 'pan-y';

// --------------------------  -------------------------- //

var isTouch = 'createTouch' in document;
var isTouchmoveScrollCanceled = false;

proto._createDrag = function() {
  this.on( 'activate', this.onActivateDrag );
  this.on( 'uiChange', this._uiChangeDrag );
  this.on( 'deactivate', this.onDeactivateDrag );
  this.on( 'cellChange', this.updateDraggable );
  // TODO updateDraggable on resize? if groupCells & slides change
  // HACK - add seemingly innocuous handler to fix iOS 10 scroll behavior
  // #457, RubaXa/Sortable#973
  if ( isTouch && !isTouchmoveScrollCanceled ) {
    window.addEventListener( 'touchmove', function() {});
    isTouchmoveScrollCanceled = true;
  }
};

proto.onActivateDrag = function() {
  this.handles = [ this.viewport ];
  this.bindHandles();
  this.updateDraggable();
};

proto.onDeactivateDrag = function() {
  this.unbindHandles();
  this.element.classList.remove('is-draggable');
};

proto.updateDraggable = function() {
  // disable dragging if less than 2 slides. #278
  if ( this.options.draggable == '>1' ) {
    this.isDraggable = this.slides.length > 1;
  } else {
    this.isDraggable = this.options.draggable;
  }
  if ( this.isDraggable ) {
    this.element.classList.add('is-draggable');
  } else {
    this.element.classList.remove('is-draggable');
  }
};

// backwards compatibility
proto.bindDrag = function() {
  this.options.draggable = true;
  this.updateDraggable();
};

proto.unbindDrag = function() {
  this.options.draggable = false;
  this.updateDraggable();
};

proto._uiChangeDrag = function() {
  delete this.isFreeScrolling;
};

// -------------------------- pointer events -------------------------- //

proto.pointerDown = function( event, pointer ) {
  if ( !this.isDraggable ) {
    this._pointerDownDefault( event, pointer );
    return;
  }
  var isOkay = this.okayPointerDown( event );
  if ( !isOkay ) {
    return;
  }

  this._pointerDownPreventDefault( event );
  this.pointerDownFocus( event );
  // blur
  if ( document.activeElement != this.element ) {
    // do not blur if already focused
    this.pointerDownBlur();
  }

  // stop if it was moving
  this.dragX = this.x;
  this.viewport.classList.add('is-pointer-down');
  // track scrolling
  this.pointerDownScroll = getScrollPosition();
  window.addEventListener( 'scroll', this );

  this._pointerDownDefault( event, pointer );
};

// default pointerDown logic, used for staticClick
proto._pointerDownDefault = function( event, pointer ) {
  // track start event position
  // Safari 9 overrides pageX and pageY. These values needs to be copied. #779
  this.pointerDownPointer = {
    pageX: pointer.pageX,
    pageY: pointer.pageY,
  };
  // bind move and end events
  this._bindPostStartEvents( event );
  this.dispatchEvent( 'pointerDown', event, [ pointer ] );
};

var focusNodes = {
  INPUT: true,
  TEXTAREA: true,
  SELECT: true,
};

proto.pointerDownFocus = function( event ) {
  var isFocusNode = focusNodes[ event.target.nodeName ];
  if ( !isFocusNode ) {
    this.focus();
  }
};

proto._pointerDownPreventDefault = function( event ) {
  var isTouchStart = event.type == 'touchstart';
  var isTouchPointer = event.pointerType == 'touch';
  var isFocusNode = focusNodes[ event.target.nodeName ];
  if ( !isTouchStart && !isTouchPointer && !isFocusNode ) {
    event.preventDefault();
  }
};

// ----- move ----- //

proto.hasDragStarted = function( moveVector ) {
  return Math.abs( moveVector.x ) > this.options.dragThreshold;
};

// ----- up ----- //

proto.pointerUp = function( event, pointer ) {
  delete this.isTouchScrolling;
  this.viewport.classList.remove('is-pointer-down');
  this.dispatchEvent( 'pointerUp', event, [ pointer ] );
  this._dragPointerUp( event, pointer );
};

proto.pointerDone = function() {
  window.removeEventListener( 'scroll', this );
  delete this.pointerDownScroll;
};

// -------------------------- dragging -------------------------- //

proto.dragStart = function( event, pointer ) {
  if ( !this.isDraggable ) {
    return;
  }
  this.dragStartPosition = this.x;
  this.startAnimation();
  window.removeEventListener( 'scroll', this );
  this.dispatchEvent( 'dragStart', event, [ pointer ] );
};

proto.pointerMove = function( event, pointer ) {
  var moveVector = this._dragPointerMove( event, pointer );
  this.dispatchEvent( 'pointerMove', event, [ pointer, moveVector ] );
  this._dragMove( event, pointer, moveVector );
};

proto.dragMove = function( event, pointer, moveVector ) {
  if ( !this.isDraggable ) {
    return;
  }
  event.preventDefault();

  this.previousDragX = this.dragX;
  // reverse if right-to-left
  var direction = this.options.rightToLeft ? -1 : 1;
  if ( this.options.wrapAround ) {
    // wrap around move. #589
    moveVector.x = moveVector.x % this.slideableWidth;
  }
  var dragX = this.dragStartPosition + moveVector.x * direction;

  if ( !this.options.wrapAround && this.slides.length ) {
    // slow drag
    var originBound = Math.max( -this.slides[0].target, this.dragStartPosition );
    dragX = dragX > originBound ? ( dragX + originBound ) * 0.5 : dragX;
    var endBound = Math.min( -this.getLastSlide().target, this.dragStartPosition );
    dragX = dragX < endBound ? ( dragX + endBound ) * 0.5 : dragX;
  }

  this.dragX = dragX;

  this.dragMoveTime = new Date();
  this.dispatchEvent( 'dragMove', event, [ pointer, moveVector ] );
};

proto.dragEnd = function( event, pointer ) {
  if ( !this.isDraggable ) {
    return;
  }
  if ( this.options.freeScroll ) {
    this.isFreeScrolling = true;
  }
  // set selectedIndex based on where flick will end up
  var index = this.dragEndRestingSelect();

  if ( this.options.freeScroll && !this.options.wrapAround ) {
    // if free-scroll & not wrap around
    // do not free-scroll if going outside of bounding slides
    // so bounding slides can attract slider, and keep it in bounds
    var restingX = this.getRestingPosition();
    this.isFreeScrolling = -restingX > this.slides[0].target &&
      -restingX < this.getLastSlide().target;
  } else if ( !this.options.freeScroll && index == this.selectedIndex ) {
    // boost selection if selected index has not changed
    index += this.dragEndBoostSelect();
  }
  delete this.previousDragX;
  // apply selection
  // TODO refactor this, selecting here feels weird
  // HACK, set flag so dragging stays in correct direction
  this.isDragSelect = this.options.wrapAround;
  this.select( index );
  delete this.isDragSelect;
  this.dispatchEvent( 'dragEnd', event, [ pointer ] );
};

proto.dragEndRestingSelect = function() {
  var restingX = this.getRestingPosition();
  // how far away from selected slide
  var distance = Math.abs( this.getSlideDistance( -restingX, this.selectedIndex ) );
  // get closet resting going up and going down
  var positiveResting = this._getClosestResting( restingX, distance, 1 );
  var negativeResting = this._getClosestResting( restingX, distance, -1 );
  // use closer resting for wrap-around
  var index = positiveResting.distance < negativeResting.distance ?
    positiveResting.index : negativeResting.index;
  return index;
};

/**
 * given resting X and distance to selected cell
 * get the distance and index of the closest cell
 * @param {Number} restingX - estimated post-flick resting position
 * @param {Number} distance - distance to selected cell
 * @param {Integer} increment - +1 or -1, going up or down
 * @returns {Object} - { distance: {Number}, index: {Integer} }
 */
proto._getClosestResting = function( restingX, distance, increment ) {
  var index = this.selectedIndex;
  var minDistance = Infinity;
  var condition = this.options.contain && !this.options.wrapAround ?
    // if contain, keep going if distance is equal to minDistance
    function( d, md ) { return d <= md; } : function( d, md ) { return d < md; };
  while ( condition( distance, minDistance ) ) {
    // measure distance to next cell
    index += increment;
    minDistance = distance;
    distance = this.getSlideDistance( -restingX, index );
    if ( distance === null ) {
      break;
    }
    distance = Math.abs( distance );
  }
  return {
    distance: minDistance,
    // selected was previous index
    index: index - increment
  };
};

/**
 * measure distance between x and a slide target
 * @param {Number} x
 * @param {Integer} index - slide index
 */
proto.getSlideDistance = function( x, index ) {
  var len = this.slides.length;
  // wrap around if at least 2 slides
  var isWrapAround = this.options.wrapAround && len > 1;
  var slideIndex = isWrapAround ? utils.modulo( index, len ) : index;
  var slide = this.slides[ slideIndex ];
  if ( !slide ) {
    return null;
  }
  // add distance for wrap-around slides
  var wrap = isWrapAround ? this.slideableWidth * Math.floor( index / len ) : 0;
  return x - ( slide.target + wrap );
};

proto.dragEndBoostSelect = function() {
  // do not boost if no previousDragX or dragMoveTime
  if ( this.previousDragX === undefined || !this.dragMoveTime ||
    // or if drag was held for 100 ms
    new Date() - this.dragMoveTime > 100 ) {
    return 0;
  }

  var distance = this.getSlideDistance( -this.dragX, this.selectedIndex );
  var delta = this.previousDragX - this.dragX;
  if ( distance > 0 && delta > 0 ) {
    // boost to next if moving towards the right, and positive velocity
    return 1;
  } else if ( distance < 0 && delta < 0 ) {
    // boost to previous if moving towards the left, and negative velocity
    return -1;
  }
  return 0;
};

// ----- staticClick ----- //

proto.staticClick = function( event, pointer ) {
  // get clickedCell, if cell was clicked
  var clickedCell = this.getParentCell( event.target );
  var cellElem = clickedCell && clickedCell.element;
  var cellIndex = clickedCell && this.cells.indexOf( clickedCell );
  this.dispatchEvent( 'staticClick', event, [ pointer, cellElem, cellIndex ] );
};

// ----- scroll ----- //

proto.onscroll = function() {
  var scroll = getScrollPosition();
  var scrollMoveX = this.pointerDownScroll.x - scroll.x;
  var scrollMoveY = this.pointerDownScroll.y - scroll.y;
  // cancel click/tap if scroll is too much
  if ( Math.abs( scrollMoveX ) > 3 || Math.abs( scrollMoveY ) > 3 ) {
    this._pointerDone();
  }
};

// ----- utils ----- //

function getScrollPosition() {
  return {
    x: window.pageXOffset,
    y: window.pageYOffset
  };
}

// -----  ----- //

return Flickity;

}));

},{"./flickity":9,"fizzy-ui-utils":4,"unidragger":17}],9:[function(require,module,exports){
// Flickity main
( function( window, factory ) {
  // universal module definition
  /* jshint strict: false */
  if ( typeof define == 'function' && define.amd ) {
    // AMD
    define( [
      'ev-emitter/ev-emitter',
      'get-size/get-size',
      'fizzy-ui-utils/utils',
      './cell',
      './slide',
      './animate'
    ], function( EvEmitter, getSize, utils, Cell, Slide, animatePrototype ) {
      return factory( window, EvEmitter, getSize, utils, Cell, Slide, animatePrototype );
    });
  } else if ( typeof module == 'object' && module.exports ) {
    // CommonJS
    module.exports = factory(
      window,
      require('ev-emitter'),
      require('get-size'),
      require('fizzy-ui-utils'),
      require('./cell'),
      require('./slide'),
      require('./animate')
    );
  } else {
    // browser global
    var _Flickity = window.Flickity;

    window.Flickity = factory(
      window,
      window.EvEmitter,
      window.getSize,
      window.fizzyUIUtils,
      _Flickity.Cell,
      _Flickity.Slide,
      _Flickity.animatePrototype
    );
  }

}( window, function factory( window, EvEmitter, getSize,
  utils, Cell, Slide, animatePrototype ) {

'use strict';

// vars
var jQuery = window.jQuery;
var getComputedStyle = window.getComputedStyle;
var console = window.console;

function moveElements( elems, toElem ) {
  elems = utils.makeArray( elems );
  while ( elems.length ) {
    toElem.appendChild( elems.shift() );
  }
}

// -------------------------- Flickity -------------------------- //

// globally unique identifiers
var GUID = 0;
// internal store of all Flickity intances
var instances = {};

function Flickity( element, options ) {
  var queryElement = utils.getQueryElement( element );
  if ( !queryElement ) {
    if ( console ) {
      console.error( 'Bad element for Flickity: ' + ( queryElement || element ) );
    }
    return;
  }
  this.element = queryElement;
  // do not initialize twice on same element
  if ( this.element.flickityGUID ) {
    var instance = instances[ this.element.flickityGUID ];
    instance.option( options );
    return instance;
  }

  // add jQuery
  if ( jQuery ) {
    this.$element = jQuery( this.element );
  }
  // options
  this.options = utils.extend( {}, this.constructor.defaults );
  this.option( options );

  // kick things off
  this._create();
}

Flickity.defaults = {
  accessibility: true,
  // adaptiveHeight: false,
  cellAlign: 'center',
  // cellSelector: undefined,
  // contain: false,
  freeScrollFriction: 0.075, // friction when free-scrolling
  friction: 0.28, // friction when selecting
  namespaceJQueryEvents: true,
  // initialIndex: 0,
  percentPosition: true,
  resize: true,
  selectedAttraction: 0.025,
  setGallerySize: true
  // watchCSS: false,
  // wrapAround: false
};

// hash of methods triggered on _create()
Flickity.createMethods = [];

var proto = Flickity.prototype;
// inherit EventEmitter
utils.extend( proto, EvEmitter.prototype );

proto._create = function() {
  // add id for Flickity.data
  var id = this.guid = ++GUID;
  this.element.flickityGUID = id; // expando
  instances[ id ] = this; // associate via id
  // initial properties
  this.selectedIndex = 0;
  // how many frames slider has been in same position
  this.restingFrames = 0;
  // initial physics properties
  this.x = 0;
  this.velocity = 0;
  this.originSide = this.options.rightToLeft ? 'right' : 'left';
  // create viewport & slider
  this.viewport = document.createElement('div');
  this.viewport.className = 'flickity-viewport';
  this._createSlider();

  if ( this.options.resize || this.options.watchCSS ) {
    window.addEventListener( 'resize', this );
  }

  // add listeners from on option
  for ( var eventName in this.options.on ) {
    var listener = this.options.on[ eventName ];
    this.on( eventName, listener );
  }

  Flickity.createMethods.forEach( function( method ) {
    this[ method ]();
  }, this );

  if ( this.options.watchCSS ) {
    this.watchCSS();
  } else {
    this.activate();
  }

};

/**
 * set options
 * @param {Object} opts
 */
proto.option = function( opts ) {
  utils.extend( this.options, opts );
};

proto.activate = function() {
  if ( this.isActive ) {
    return;
  }
  this.isActive = true;
  this.element.classList.add('flickity-enabled');
  if ( this.options.rightToLeft ) {
    this.element.classList.add('flickity-rtl');
  }

  this.getSize();
  // move initial cell elements so they can be loaded as cells
  var cellElems = this._filterFindCellElements( this.element.children );
  moveElements( cellElems, this.slider );
  this.viewport.appendChild( this.slider );
  this.element.appendChild( this.viewport );
  // get cells from children
  this.reloadCells();

  if ( this.options.accessibility ) {
    // allow element to focusable
    this.element.tabIndex = 0;
    // listen for key presses
    this.element.addEventListener( 'keydown', this );
  }

  this.emitEvent('activate');
  this.selectInitialIndex();
  // flag for initial activation, for using initialIndex
  this.isInitActivated = true;
  // ready event. #493
  this.dispatchEvent('ready');
};

// slider positions the cells
proto._createSlider = function() {
  // slider element does all the positioning
  var slider = document.createElement('div');
  slider.className = 'flickity-slider';
  slider.style[ this.originSide ] = 0;
  this.slider = slider;
};

proto._filterFindCellElements = function( elems ) {
  return utils.filterFindElements( elems, this.options.cellSelector );
};

// goes through all children
proto.reloadCells = function() {
  // collection of item elements
  this.cells = this._makeCells( this.slider.children );
  this.positionCells();
  this._getWrapShiftCells();
  this.setGallerySize();
};

/**
 * turn elements into Flickity.Cells
 * @param {Array or NodeList or HTMLElement} elems
 * @returns {Array} items - collection of new Flickity Cells
 */
proto._makeCells = function( elems ) {
  var cellElems = this._filterFindCellElements( elems );

  // create new Flickity for collection
  var cells = cellElems.map( function( cellElem ) {
    return new Cell( cellElem, this );
  }, this );

  return cells;
};

proto.getLastCell = function() {
  return this.cells[ this.cells.length - 1 ];
};

proto.getLastSlide = function() {
  return this.slides[ this.slides.length - 1 ];
};

// positions all cells
proto.positionCells = function() {
  // size all cells
  this._sizeCells( this.cells );
  // position all cells
  this._positionCells( 0 );
};

/**
 * position certain cells
 * @param {Integer} index - which cell to start with
 */
proto._positionCells = function( index ) {
  index = index || 0;
  // also measure maxCellHeight
  // start 0 if positioning all cells
  this.maxCellHeight = index ? this.maxCellHeight || 0 : 0;
  var cellX = 0;
  // get cellX
  if ( index > 0 ) {
    var startCell = this.cells[ index - 1 ];
    cellX = startCell.x + startCell.size.outerWidth;
  }
  var len = this.cells.length;
  for ( var i=index; i < len; i++ ) {
    var cell = this.cells[i];
    cell.setPosition( cellX );
    cellX += cell.size.outerWidth;
    this.maxCellHeight = Math.max( cell.size.outerHeight, this.maxCellHeight );
  }
  // keep track of cellX for wrap-around
  this.slideableWidth = cellX;
  // slides
  this.updateSlides();
  // contain slides target
  this._containSlides();
  // update slidesWidth
  this.slidesWidth = len ? this.getLastSlide().target - this.slides[0].target : 0;
};

/**
 * cell.getSize() on multiple cells
 * @param {Array} cells
 */
proto._sizeCells = function( cells ) {
  cells.forEach( function( cell ) {
    cell.getSize();
  });
};

// --------------------------  -------------------------- //

proto.updateSlides = function() {
  this.slides = [];
  if ( !this.cells.length ) {
    return;
  }

  var slide = new Slide( this );
  this.slides.push( slide );
  var isOriginLeft = this.originSide == 'left';
  var nextMargin = isOriginLeft ? 'marginRight' : 'marginLeft';

  var canCellFit = this._getCanCellFit();

  this.cells.forEach( function( cell, i ) {
    // just add cell if first cell in slide
    if ( !slide.cells.length ) {
      slide.addCell( cell );
      return;
    }

    var slideWidth = ( slide.outerWidth - slide.firstMargin ) +
      ( cell.size.outerWidth - cell.size[ nextMargin ] );

    if ( canCellFit.call( this, i, slideWidth ) ) {
      slide.addCell( cell );
    } else {
      // doesn't fit, new slide
      slide.updateTarget();

      slide = new Slide( this );
      this.slides.push( slide );
      slide.addCell( cell );
    }
  }, this );
  // last slide
  slide.updateTarget();
  // update .selectedSlide
  this.updateSelectedSlide();
};

proto._getCanCellFit = function() {
  var groupCells = this.options.groupCells;
  if ( !groupCells ) {
    return function() {
      return false;
    };
  } else if ( typeof groupCells == 'number' ) {
    // group by number. 3 -> [0,1,2], [3,4,5], ...
    var number = parseInt( groupCells, 10 );
    return function( i ) {
      return ( i % number ) !== 0;
    };
  }
  // default, group by width of slide
  // parse '75%
  var percentMatch = typeof groupCells == 'string' &&
    groupCells.match(/^(\d+)%$/);
  var percent = percentMatch ? parseInt( percentMatch[1], 10 ) / 100 : 1;
  return function( i, slideWidth ) {
    return slideWidth <= ( this.size.innerWidth + 1 ) * percent;
  };
};

// alias _init for jQuery plugin .flickity()
proto._init =
proto.reposition = function() {
  this.positionCells();
  this.positionSliderAtSelected();
};

proto.getSize = function() {
  this.size = getSize( this.element );
  this.setCellAlign();
  this.cursorPosition = this.size.innerWidth * this.cellAlign;
};

var cellAlignShorthands = {
  // cell align, then based on origin side
  center: {
    left: 0.5,
    right: 0.5
  },
  left: {
    left: 0,
    right: 1
  },
  right: {
    right: 0,
    left: 1
  }
};

proto.setCellAlign = function() {
  var shorthand = cellAlignShorthands[ this.options.cellAlign ];
  this.cellAlign = shorthand ? shorthand[ this.originSide ] : this.options.cellAlign;
};

proto.setGallerySize = function() {
  if ( this.options.setGallerySize ) {
    var height = this.options.adaptiveHeight && this.selectedSlide ?
      this.selectedSlide.height : this.maxCellHeight;
    this.viewport.style.height = height + 'px';
  }
};

proto._getWrapShiftCells = function() {
  // only for wrap-around
  if ( !this.options.wrapAround ) {
    return;
  }
  // unshift previous cells
  this._unshiftCells( this.beforeShiftCells );
  this._unshiftCells( this.afterShiftCells );
  // get before cells
  // initial gap
  var gapX = this.cursorPosition;
  var cellIndex = this.cells.length - 1;
  this.beforeShiftCells = this._getGapCells( gapX, cellIndex, -1 );
  // get after cells
  // ending gap between last cell and end of gallery viewport
  gapX = this.size.innerWidth - this.cursorPosition;
  // start cloning at first cell, working forwards
  this.afterShiftCells = this._getGapCells( gapX, 0, 1 );
};

proto._getGapCells = function( gapX, cellIndex, increment ) {
  // keep adding cells until the cover the initial gap
  var cells = [];
  while ( gapX > 0 ) {
    var cell = this.cells[ cellIndex ];
    if ( !cell ) {
      break;
    }
    cells.push( cell );
    cellIndex += increment;
    gapX -= cell.size.outerWidth;
  }
  return cells;
};

// ----- contain ----- //

// contain cell targets so no excess sliding
proto._containSlides = function() {
  if ( !this.options.contain || this.options.wrapAround || !this.cells.length ) {
    return;
  }
  var isRightToLeft = this.options.rightToLeft;
  var beginMargin = isRightToLeft ? 'marginRight' : 'marginLeft';
  var endMargin = isRightToLeft ? 'marginLeft' : 'marginRight';
  var contentWidth = this.slideableWidth - this.getLastCell().size[ endMargin ];
  // content is less than gallery size
  var isContentSmaller = contentWidth < this.size.innerWidth;
  // bounds
  var beginBound = this.cursorPosition + this.cells[0].size[ beginMargin ];
  var endBound = contentWidth - this.size.innerWidth * ( 1 - this.cellAlign );
  // contain each cell target
  this.slides.forEach( function( slide ) {
    if ( isContentSmaller ) {
      // all cells fit inside gallery
      slide.target = contentWidth * this.cellAlign;
    } else {
      // contain to bounds
      slide.target = Math.max( slide.target, beginBound );
      slide.target = Math.min( slide.target, endBound );
    }
  }, this );
};

// -----  ----- //

/**
 * emits events via eventEmitter and jQuery events
 * @param {String} type - name of event
 * @param {Event} event - original event
 * @param {Array} args - extra arguments
 */
proto.dispatchEvent = function( type, event, args ) {
  var emitArgs = event ? [ event ].concat( args ) : args;
  this.emitEvent( type, emitArgs );

  if ( jQuery && this.$element ) {
    // default trigger with type if no event
    type += this.options.namespaceJQueryEvents ? '.flickity' : '';
    var $event = type;
    if ( event ) {
      // create jQuery event
      var jQEvent = jQuery.Event( event );
      jQEvent.type = type;
      $event = jQEvent;
    }
    this.$element.trigger( $event, args );
  }
};

// -------------------------- select -------------------------- //

/**
 * @param {Integer} index - index of the slide
 * @param {Boolean} isWrap - will wrap-around to last/first if at the end
 * @param {Boolean} isInstant - will immediately set position at selected cell
 */
proto.select = function( index, isWrap, isInstant ) {
  if ( !this.isActive ) {
    return;
  }
  index = parseInt( index, 10 );
  this._wrapSelect( index );

  if ( this.options.wrapAround || isWrap ) {
    index = utils.modulo( index, this.slides.length );
  }
  // bail if invalid index
  if ( !this.slides[ index ] ) {
    return;
  }
  var prevIndex = this.selectedIndex;
  this.selectedIndex = index;
  this.updateSelectedSlide();
  if ( isInstant ) {
    this.positionSliderAtSelected();
  } else {
    this.startAnimation();
  }
  if ( this.options.adaptiveHeight ) {
    this.setGallerySize();
  }
  // events
  this.dispatchEvent( 'select', null, [ index ] );
  // change event if new index
  if ( index != prevIndex ) {
    this.dispatchEvent( 'change', null, [ index ] );
  }
  // old v1 event name, remove in v3
  this.dispatchEvent('cellSelect');
};

// wraps position for wrapAround, to move to closest slide. #113
proto._wrapSelect = function( index ) {
  var len = this.slides.length;
  var isWrapping = this.options.wrapAround && len > 1;
  if ( !isWrapping ) {
    return index;
  }
  var wrapIndex = utils.modulo( index, len );
  // go to shortest
  var delta = Math.abs( wrapIndex - this.selectedIndex );
  var backWrapDelta = Math.abs( ( wrapIndex + len ) - this.selectedIndex );
  var forewardWrapDelta = Math.abs( ( wrapIndex - len ) - this.selectedIndex );
  if ( !this.isDragSelect && backWrapDelta < delta ) {
    index += len;
  } else if ( !this.isDragSelect && forewardWrapDelta < delta ) {
    index -= len;
  }
  // wrap position so slider is within normal area
  if ( index < 0 ) {
    this.x -= this.slideableWidth;
  } else if ( index >= len ) {
    this.x += this.slideableWidth;
  }
};

proto.previous = function( isWrap, isInstant ) {
  this.select( this.selectedIndex - 1, isWrap, isInstant );
};

proto.next = function( isWrap, isInstant ) {
  this.select( this.selectedIndex + 1, isWrap, isInstant );
};

proto.updateSelectedSlide = function() {
  var slide = this.slides[ this.selectedIndex ];
  // selectedIndex could be outside of slides, if triggered before resize()
  if ( !slide ) {
    return;
  }
  // unselect previous selected slide
  this.unselectSelectedSlide();
  // update new selected slide
  this.selectedSlide = slide;
  slide.select();
  this.selectedCells = slide.cells;
  this.selectedElements = slide.getCellElements();
  // HACK: selectedCell & selectedElement is first cell in slide, backwards compatibility
  // Remove in v3?
  this.selectedCell = slide.cells[0];
  this.selectedElement = this.selectedElements[0];
};

proto.unselectSelectedSlide = function() {
  if ( this.selectedSlide ) {
    this.selectedSlide.unselect();
  }
};

proto.selectInitialIndex = function() {
  var initialIndex = this.options.initialIndex;
  // already activated, select previous selectedIndex
  if ( this.isInitActivated ) {
    this.select( this.selectedIndex, false, true );
    return;
  }
  // select with selector string
  if ( initialIndex && typeof initialIndex == 'string' ) {
    var cell = this.queryCell( initialIndex );
    if ( cell ) {
      this.selectCell( initialIndex, false, true );
      return;
    }
  }

  var index = 0;
  // select with number
  if ( initialIndex && this.slides[ initialIndex ] ) {
    index = initialIndex;
  }
  // select instantly
  this.select( index, false, true );
};

/**
 * select slide from number or cell element
 * @param {Element or Number} elem
 */
proto.selectCell = function( value, isWrap, isInstant ) {
  // get cell
  var cell = this.queryCell( value );
  if ( !cell ) {
    return;
  }

  var index = this.getCellSlideIndex( cell );
  this.select( index, isWrap, isInstant );
};

proto.getCellSlideIndex = function( cell ) {
  // get index of slides that has cell
  for ( var i=0; i < this.slides.length; i++ ) {
    var slide = this.slides[i];
    var index = slide.cells.indexOf( cell );
    if ( index != -1 ) {
      return i;
    }
  }
};

// -------------------------- get cells -------------------------- //

/**
 * get Flickity.Cell, given an Element
 * @param {Element} elem
 * @returns {Flickity.Cell} item
 */
proto.getCell = function( elem ) {
  // loop through cells to get the one that matches
  for ( var i=0; i < this.cells.length; i++ ) {
    var cell = this.cells[i];
    if ( cell.element == elem ) {
      return cell;
    }
  }
};

/**
 * get collection of Flickity.Cells, given Elements
 * @param {Element, Array, NodeList} elems
 * @returns {Array} cells - Flickity.Cells
 */
proto.getCells = function( elems ) {
  elems = utils.makeArray( elems );
  var cells = [];
  elems.forEach( function( elem ) {
    var cell = this.getCell( elem );
    if ( cell ) {
      cells.push( cell );
    }
  }, this );
  return cells;
};

/**
 * get cell elements
 * @returns {Array} cellElems
 */
proto.getCellElements = function() {
  return this.cells.map( function( cell ) {
    return cell.element;
  });
};

/**
 * get parent cell from an element
 * @param {Element} elem
 * @returns {Flickit.Cell} cell
 */
proto.getParentCell = function( elem ) {
  // first check if elem is cell
  var cell = this.getCell( elem );
  if ( cell ) {
    return cell;
  }
  // try to get parent cell elem
  elem = utils.getParent( elem, '.flickity-slider > *' );
  return this.getCell( elem );
};

/**
 * get cells adjacent to a slide
 * @param {Integer} adjCount - number of adjacent slides
 * @param {Integer} index - index of slide to start
 * @returns {Array} cells - array of Flickity.Cells
 */
proto.getAdjacentCellElements = function( adjCount, index ) {
  if ( !adjCount ) {
    return this.selectedSlide.getCellElements();
  }
  index = index === undefined ? this.selectedIndex : index;

  var len = this.slides.length;
  if ( 1 + ( adjCount * 2 ) >= len ) {
    return this.getCellElements();
  }

  var cellElems = [];
  for ( var i = index - adjCount; i <= index + adjCount ; i++ ) {
    var slideIndex = this.options.wrapAround ? utils.modulo( i, len ) : i;
    var slide = this.slides[ slideIndex ];
    if ( slide ) {
      cellElems = cellElems.concat( slide.getCellElements() );
    }
  }
  return cellElems;
};

/**
 * select slide from number or cell element
 * @param {Element, Selector String, or Number} selector
 */
proto.queryCell = function( selector ) {
  if ( typeof selector == 'number' ) {
    // use number as index
    return this.cells[ selector ];
  }
  if ( typeof selector == 'string' ) {
    // do not select invalid selectors from hash: #123, #/. #791
    if ( selector.match(/^[#\.]?[\d\/]/) ) {
      return;
    }
    // use string as selector, get element
    selector = this.element.querySelector( selector );
  }
  // get cell from element
  return this.getCell( selector );
};

// -------------------------- events -------------------------- //

proto.uiChange = function() {
  this.emitEvent('uiChange');
};

// keep focus on element when child UI elements are clicked
proto.childUIPointerDown = function( event ) {
  // HACK iOS does not allow touch events to bubble up?!
  if ( event.type != 'touchstart' ) {
    event.preventDefault();
  }
  this.focus();
};

// ----- resize ----- //

proto.onresize = function() {
  this.watchCSS();
  this.resize();
};

utils.debounceMethod( Flickity, 'onresize', 150 );

proto.resize = function() {
  if ( !this.isActive ) {
    return;
  }
  this.getSize();
  // wrap values
  if ( this.options.wrapAround ) {
    this.x = utils.modulo( this.x, this.slideableWidth );
  }
  this.positionCells();
  this._getWrapShiftCells();
  this.setGallerySize();
  this.emitEvent('resize');
  // update selected index for group slides, instant
  // TODO: position can be lost between groups of various numbers
  var selectedElement = this.selectedElements && this.selectedElements[0];
  this.selectCell( selectedElement, false, true );
};

// watches the :after property, activates/deactivates
proto.watchCSS = function() {
  var watchOption = this.options.watchCSS;
  if ( !watchOption ) {
    return;
  }

  var afterContent = getComputedStyle( this.element, ':after' ).content;
  // activate if :after { content: 'flickity' }
  if ( afterContent.indexOf('flickity') != -1 ) {
    this.activate();
  } else {
    this.deactivate();
  }
};

// ----- keydown ----- //

// go previous/next if left/right keys pressed
proto.onkeydown = function( event ) {
  // only work if element is in focus
  var isNotFocused = document.activeElement && document.activeElement != this.element;
  if ( !this.options.accessibility ||isNotFocused ) {
    return;
  }

  var handler = Flickity.keyboardHandlers[ event.keyCode ];
  if ( handler ) {
    handler.call( this );
  }
};

Flickity.keyboardHandlers = {
  // left arrow
  37: function() {
    var leftMethod = this.options.rightToLeft ? 'next' : 'previous';
    this.uiChange();
    this[ leftMethod ]();
  },
  // right arrow
  39: function() {
    var rightMethod = this.options.rightToLeft ? 'previous' : 'next';
    this.uiChange();
    this[ rightMethod ]();
  },
};

// ----- focus ----- //

proto.focus = function() {
  // TODO remove scrollTo once focus options gets more support
  // https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/focus#Browser_compatibility
  var prevScrollY = window.pageYOffset;
  this.element.focus({ preventScroll: true });
  // hack to fix scroll jump after focus, #76
  if ( window.pageYOffset != prevScrollY ) {
    window.scrollTo( window.pageXOffset, prevScrollY );
  }
};

// -------------------------- destroy -------------------------- //

// deactivate all Flickity functionality, but keep stuff available
proto.deactivate = function() {
  if ( !this.isActive ) {
    return;
  }
  this.element.classList.remove('flickity-enabled');
  this.element.classList.remove('flickity-rtl');
  this.unselectSelectedSlide();
  // destroy cells
  this.cells.forEach( function( cell ) {
    cell.destroy();
  });
  this.element.removeChild( this.viewport );
  // move child elements back into element
  moveElements( this.slider.children, this.element );
  if ( this.options.accessibility ) {
    this.element.removeAttribute('tabIndex');
    this.element.removeEventListener( 'keydown', this );
  }
  // set flags
  this.isActive = false;
  this.emitEvent('deactivate');
};

proto.destroy = function() {
  this.deactivate();
  window.removeEventListener( 'resize', this );
  this.allOff();
  this.emitEvent('destroy');
  if ( jQuery && this.$element ) {
    jQuery.removeData( this.element, 'flickity' );
  }
  delete this.element.flickityGUID;
  delete instances[ this.guid ];
};

// -------------------------- prototype -------------------------- //

utils.extend( proto, animatePrototype );

// -------------------------- extras -------------------------- //

/**
 * get Flickity instance from element
 * @param {Element} elem
 * @returns {Flickity}
 */
Flickity.data = function( elem ) {
  elem = utils.getQueryElement( elem );
  var id = elem && elem.flickityGUID;
  return id && instances[ id ];
};

utils.htmlInit( Flickity, 'flickity' );

if ( jQuery && jQuery.bridget ) {
  jQuery.bridget( 'flickity', Flickity );
}

// set internal jQuery, for Webpack + jQuery v3, #478
Flickity.setJQuery = function( jq ) {
  jQuery = jq;
};

Flickity.Cell = Cell;
Flickity.Slide = Slide;

return Flickity;

}));

},{"./animate":6,"./cell":7,"./slide":15,"ev-emitter":3,"fizzy-ui-utils":4,"get-size":16}],10:[function(require,module,exports){
/*!
 * Flickity v2.2.1
 * Touch, responsive, flickable carousels
 *
 * Licensed GPLv3 for open source use
 * or Flickity Commercial License for commercial use
 *
 * https://flickity.metafizzy.co
 * Copyright 2015-2019 Metafizzy
 */

( function( window, factory ) {
  // universal module definition
  /* jshint strict: false */
  if ( typeof define == 'function' && define.amd ) {
    // AMD
    define( [
      './flickity',
      './drag',
      './prev-next-button',
      './page-dots',
      './player',
      './add-remove-cell',
      './lazyload'
    ], factory );
  } else if ( typeof module == 'object' && module.exports ) {
    // CommonJS
    module.exports = factory(
      require('./flickity'),
      require('./drag'),
      require('./prev-next-button'),
      require('./page-dots'),
      require('./player'),
      require('./add-remove-cell'),
      require('./lazyload')
    );
  }

})( window, function factory( Flickity ) {
  /*jshint strict: false*/
  return Flickity;
});

},{"./add-remove-cell":5,"./drag":8,"./flickity":9,"./lazyload":11,"./page-dots":12,"./player":13,"./prev-next-button":14}],11:[function(require,module,exports){
// lazyload
( function( window, factory ) {
  // universal module definition
  /* jshint strict: false */
  if ( typeof define == 'function' && define.amd ) {
    // AMD
    define( [
      './flickity',
      'fizzy-ui-utils/utils'
    ], function( Flickity, utils ) {
      return factory( window, Flickity, utils );
    });
  } else if ( typeof module == 'object' && module.exports ) {
    // CommonJS
    module.exports = factory(
      window,
      require('./flickity'),
      require('fizzy-ui-utils')
    );
  } else {
    // browser global
    factory(
      window,
      window.Flickity,
      window.fizzyUIUtils
    );
  }

}( window, function factory( window, Flickity, utils ) {
'use strict';

Flickity.createMethods.push('_createLazyload');
var proto = Flickity.prototype;

proto._createLazyload = function() {
  this.on( 'select', this.lazyLoad );
};

proto.lazyLoad = function() {
  var lazyLoad = this.options.lazyLoad;
  if ( !lazyLoad ) {
    return;
  }
  // get adjacent cells, use lazyLoad option for adjacent count
  var adjCount = typeof lazyLoad == 'number' ? lazyLoad : 0;
  var cellElems = this.getAdjacentCellElements( adjCount );
  // get lazy images in those cells
  var lazyImages = [];
  cellElems.forEach( function( cellElem ) {
    var lazyCellImages = getCellLazyImages( cellElem );
    lazyImages = lazyImages.concat( lazyCellImages );
  });
  // load lazy images
  lazyImages.forEach( function( img ) {
    new LazyLoader( img, this );
  }, this );
};

function getCellLazyImages( cellElem ) {
  // check if cell element is lazy image
  if ( cellElem.nodeName == 'IMG' ) {
    var lazyloadAttr = cellElem.getAttribute('data-flickity-lazyload');
    var srcAttr = cellElem.getAttribute('data-flickity-lazyload-src');
    var srcsetAttr = cellElem.getAttribute('data-flickity-lazyload-srcset');
    if ( lazyloadAttr || srcAttr || srcsetAttr ) {
      return [ cellElem ];
    }
  }
  // select lazy images in cell
  var lazySelector = 'img[data-flickity-lazyload], ' +
    'img[data-flickity-lazyload-src], img[data-flickity-lazyload-srcset]';
  var imgs = cellElem.querySelectorAll( lazySelector );
  return utils.makeArray( imgs );
}

// -------------------------- LazyLoader -------------------------- //

/**
 * class to handle loading images
 */
function LazyLoader( img, flickity ) {
  this.img = img;
  this.flickity = flickity;
  this.load();
}

LazyLoader.prototype.handleEvent = utils.handleEvent;

LazyLoader.prototype.load = function() {
  this.img.addEventListener( 'load', this );
  this.img.addEventListener( 'error', this );
  // get src & srcset
  var src = this.img.getAttribute('data-flickity-lazyload') ||
    this.img.getAttribute('data-flickity-lazyload-src');
  var srcset = this.img.getAttribute('data-flickity-lazyload-srcset');
  // set src & serset
  this.img.src = src;
  if ( srcset ) {
    this.img.setAttribute( 'srcset', srcset );
  }
  // remove attr
  this.img.removeAttribute('data-flickity-lazyload');
  this.img.removeAttribute('data-flickity-lazyload-src');
  this.img.removeAttribute('data-flickity-lazyload-srcset');
};

LazyLoader.prototype.onload = function( event ) {
  this.complete( event, 'flickity-lazyloaded' );
};

LazyLoader.prototype.onerror = function( event ) {
  this.complete( event, 'flickity-lazyerror' );
};

LazyLoader.prototype.complete = function( event, className ) {
  // unbind events
  this.img.removeEventListener( 'load', this );
  this.img.removeEventListener( 'error', this );

  var cell = this.flickity.getParentCell( this.img );
  var cellElem = cell && cell.element;
  this.flickity.cellSizeChange( cellElem );

  this.img.classList.add( className );
  this.flickity.dispatchEvent( 'lazyLoad', event, cellElem );
};

// -----  ----- //

Flickity.LazyLoader = LazyLoader;

return Flickity;

}));

},{"./flickity":9,"fizzy-ui-utils":4}],12:[function(require,module,exports){
// page dots
( function( window, factory ) {
  // universal module definition
  /* jshint strict: false */
  if ( typeof define == 'function' && define.amd ) {
    // AMD
    define( [
      './flickity',
      'unipointer/unipointer',
      'fizzy-ui-utils/utils'
    ], function( Flickity, Unipointer, utils ) {
      return factory( window, Flickity, Unipointer, utils );
    });
  } else if ( typeof module == 'object' && module.exports ) {
    // CommonJS
    module.exports = factory(
      window,
      require('./flickity'),
      require('unipointer'),
      require('fizzy-ui-utils')
    );
  } else {
    // browser global
    factory(
      window,
      window.Flickity,
      window.Unipointer,
      window.fizzyUIUtils
    );
  }

}( window, function factory( window, Flickity, Unipointer, utils ) {

// -------------------------- PageDots -------------------------- //

'use strict';

function PageDots( parent ) {
  this.parent = parent;
  this._create();
}

PageDots.prototype = Object.create( Unipointer.prototype );

PageDots.prototype._create = function() {
  // create holder element
  this.holder = document.createElement('ol');
  this.holder.className = 'flickity-page-dots';
  // create dots, array of elements
  this.dots = [];
  // events
  this.handleClick = this.onClick.bind( this );
  this.on( 'pointerDown', this.parent.childUIPointerDown.bind( this.parent ) );
};

PageDots.prototype.activate = function() {
  this.setDots();
  this.holder.addEventListener( 'click', this.handleClick );
  this.bindStartEvent( this.holder );
  // add to DOM
  this.parent.element.appendChild( this.holder );
};

PageDots.prototype.deactivate = function() {
  this.holder.removeEventListener( 'click', this.handleClick );
  this.unbindStartEvent( this.holder );
  // remove from DOM
  this.parent.element.removeChild( this.holder );
};

PageDots.prototype.setDots = function() {
  // get difference between number of slides and number of dots
  var delta = this.parent.slides.length - this.dots.length;
  if ( delta > 0 ) {
    this.addDots( delta );
  } else if ( delta < 0 ) {
    this.removeDots( -delta );
  }
};

PageDots.prototype.addDots = function( count ) {
  var fragment = document.createDocumentFragment();
  var newDots = [];
  var length = this.dots.length;
  var max = length + count;

  for ( var i = length; i < max; i++ ) {
    var dot = document.createElement('li');
    dot.className = 'dot';
    dot.setAttribute( 'aria-label', 'Page dot ' + ( i + 1 ) );
    fragment.appendChild( dot );
    newDots.push( dot );
  }

  this.holder.appendChild( fragment );
  this.dots = this.dots.concat( newDots );
};

PageDots.prototype.removeDots = function( count ) {
  // remove from this.dots collection
  var removeDots = this.dots.splice( this.dots.length - count, count );
  // remove from DOM
  removeDots.forEach( function( dot ) {
    this.holder.removeChild( dot );
  }, this );
};

PageDots.prototype.updateSelected = function() {
  // remove selected class on previous
  if ( this.selectedDot ) {
    this.selectedDot.className = 'dot';
    this.selectedDot.removeAttribute('aria-current');
  }
  // don't proceed if no dots
  if ( !this.dots.length ) {
    return;
  }
  this.selectedDot = this.dots[ this.parent.selectedIndex ];
  this.selectedDot.className = 'dot is-selected';
  this.selectedDot.setAttribute( 'aria-current', 'step' );
};

PageDots.prototype.onTap = // old method name, backwards-compatible
PageDots.prototype.onClick = function( event ) {
  var target = event.target;
  // only care about dot clicks
  if ( target.nodeName != 'LI' ) {
    return;
  }

  this.parent.uiChange();
  var index = this.dots.indexOf( target );
  this.parent.select( index );
};

PageDots.prototype.destroy = function() {
  this.deactivate();
  this.allOff();
};

Flickity.PageDots = PageDots;

// -------------------------- Flickity -------------------------- //

utils.extend( Flickity.defaults, {
  pageDots: true
});

Flickity.createMethods.push('_createPageDots');

var proto = Flickity.prototype;

proto._createPageDots = function() {
  if ( !this.options.pageDots ) {
    return;
  }
  this.pageDots = new PageDots( this );
  // events
  this.on( 'activate', this.activatePageDots );
  this.on( 'select', this.updateSelectedPageDots );
  this.on( 'cellChange', this.updatePageDots );
  this.on( 'resize', this.updatePageDots );
  this.on( 'deactivate', this.deactivatePageDots );
};

proto.activatePageDots = function() {
  this.pageDots.activate();
};

proto.updateSelectedPageDots = function() {
  this.pageDots.updateSelected();
};

proto.updatePageDots = function() {
  this.pageDots.setDots();
};

proto.deactivatePageDots = function() {
  this.pageDots.deactivate();
};

// -----  ----- //

Flickity.PageDots = PageDots;

return Flickity;

}));

},{"./flickity":9,"fizzy-ui-utils":4,"unipointer":18}],13:[function(require,module,exports){
// player & autoPlay
( function( window, factory ) {
  // universal module definition
  /* jshint strict: false */
  if ( typeof define == 'function' && define.amd ) {
    // AMD
    define( [
      'ev-emitter/ev-emitter',
      'fizzy-ui-utils/utils',
      './flickity'
    ], function( EvEmitter, utils, Flickity ) {
      return factory( EvEmitter, utils, Flickity );
    });
  } else if ( typeof module == 'object' && module.exports ) {
    // CommonJS
    module.exports = factory(
      require('ev-emitter'),
      require('fizzy-ui-utils'),
      require('./flickity')
    );
  } else {
    // browser global
    factory(
      window.EvEmitter,
      window.fizzyUIUtils,
      window.Flickity
    );
  }

}( window, function factory( EvEmitter, utils, Flickity ) {

'use strict';

// -------------------------- Player -------------------------- //

function Player( parent ) {
  this.parent = parent;
  this.state = 'stopped';
  // visibility change event handler
  this.onVisibilityChange = this.visibilityChange.bind( this );
  this.onVisibilityPlay = this.visibilityPlay.bind( this );
}

Player.prototype = Object.create( EvEmitter.prototype );

// start play
Player.prototype.play = function() {
  if ( this.state == 'playing' ) {
    return;
  }
  // do not play if page is hidden, start playing when page is visible
  var isPageHidden = document.hidden;
  if ( isPageHidden ) {
    document.addEventListener( 'visibilitychange', this.onVisibilityPlay );
    return;
  }

  this.state = 'playing';
  // listen to visibility change
  document.addEventListener( 'visibilitychange', this.onVisibilityChange );
  // start ticking
  this.tick();
};

Player.prototype.tick = function() {
  // do not tick if not playing
  if ( this.state != 'playing' ) {
    return;
  }

  var time = this.parent.options.autoPlay;
  // default to 3 seconds
  time = typeof time == 'number' ? time : 3000;
  var _this = this;
  // HACK: reset ticks if stopped and started within interval
  this.clear();
  this.timeout = setTimeout( function() {
    _this.parent.next( true );
    _this.tick();
  }, time );
};

Player.prototype.stop = function() {
  this.state = 'stopped';
  this.clear();
  // remove visibility change event
  document.removeEventListener( 'visibilitychange', this.onVisibilityChange );
};

Player.prototype.clear = function() {
  clearTimeout( this.timeout );
};

Player.prototype.pause = function() {
  if ( this.state == 'playing' ) {
    this.state = 'paused';
    this.clear();
  }
};

Player.prototype.unpause = function() {
  // re-start play if paused
  if ( this.state == 'paused' ) {
    this.play();
  }
};

// pause if page visibility is hidden, unpause if visible
Player.prototype.visibilityChange = function() {
  var isPageHidden = document.hidden;
  this[ isPageHidden ? 'pause' : 'unpause' ]();
};

Player.prototype.visibilityPlay = function() {
  this.play();
  document.removeEventListener( 'visibilitychange', this.onVisibilityPlay );
};

// -------------------------- Flickity -------------------------- //

utils.extend( Flickity.defaults, {
  pauseAutoPlayOnHover: true
});

Flickity.createMethods.push('_createPlayer');
var proto = Flickity.prototype;

proto._createPlayer = function() {
  this.player = new Player( this );

  this.on( 'activate', this.activatePlayer );
  this.on( 'uiChange', this.stopPlayer );
  this.on( 'pointerDown', this.stopPlayer );
  this.on( 'deactivate', this.deactivatePlayer );
};

proto.activatePlayer = function() {
  if ( !this.options.autoPlay ) {
    return;
  }
  this.player.play();
  this.element.addEventListener( 'mouseenter', this );
};

// Player API, don't hate the ... thanks I know where the door is

proto.playPlayer = function() {
  this.player.play();
};

proto.stopPlayer = function() {
  this.player.stop();
};

proto.pausePlayer = function() {
  this.player.pause();
};

proto.unpausePlayer = function() {
  this.player.unpause();
};

proto.deactivatePlayer = function() {
  this.player.stop();
  this.element.removeEventListener( 'mouseenter', this );
};

// ----- mouseenter/leave ----- //

// pause auto-play on hover
proto.onmouseenter = function() {
  if ( !this.options.pauseAutoPlayOnHover ) {
    return;
  }
  this.player.pause();
  this.element.addEventListener( 'mouseleave', this );
};

// resume auto-play on hover off
proto.onmouseleave = function() {
  this.player.unpause();
  this.element.removeEventListener( 'mouseleave', this );
};

// -----  ----- //

Flickity.Player = Player;

return Flickity;

}));

},{"./flickity":9,"ev-emitter":3,"fizzy-ui-utils":4}],14:[function(require,module,exports){
// prev/next buttons
( function( window, factory ) {
  // universal module definition
  /* jshint strict: false */
  if ( typeof define == 'function' && define.amd ) {
    // AMD
    define( [
      './flickity',
      'unipointer/unipointer',
      'fizzy-ui-utils/utils'
    ], function( Flickity, Unipointer, utils ) {
      return factory( window, Flickity, Unipointer, utils );
    });
  } else if ( typeof module == 'object' && module.exports ) {
    // CommonJS
    module.exports = factory(
      window,
      require('./flickity'),
      require('unipointer'),
      require('fizzy-ui-utils')
    );
  } else {
    // browser global
    factory(
      window,
      window.Flickity,
      window.Unipointer,
      window.fizzyUIUtils
    );
  }

}( window, function factory( window, Flickity, Unipointer, utils ) {
'use strict';

var svgURI = 'http://www.w3.org/2000/svg';

// -------------------------- PrevNextButton -------------------------- //

function PrevNextButton( direction, parent ) {
  this.direction = direction;
  this.parent = parent;
  this._create();
}

PrevNextButton.prototype = Object.create( Unipointer.prototype );

PrevNextButton.prototype._create = function() {
  // properties
  this.isEnabled = true;
  this.isPrevious = this.direction == -1;
  var leftDirection = this.parent.options.rightToLeft ? 1 : -1;
  this.isLeft = this.direction == leftDirection;

  var element = this.element = document.createElement('button');
  element.className = 'flickity-button flickity-prev-next-button';
  element.className += this.isPrevious ? ' previous' : ' next';
  // prevent button from submitting form http://stackoverflow.com/a/10836076/182183
  element.setAttribute( 'type', 'button' );
  // init as disabled
  this.disable();

  element.setAttribute( 'aria-label', this.isPrevious ? 'Previous' : 'Next' );

  // create arrow
  var svg = this.createSVG();
  element.appendChild( svg );
  // events
  this.parent.on( 'select', this.update.bind( this ) );
  this.on( 'pointerDown', this.parent.childUIPointerDown.bind( this.parent ) );
};

PrevNextButton.prototype.activate = function() {
  this.bindStartEvent( this.element );
  this.element.addEventListener( 'click', this );
  // add to DOM
  this.parent.element.appendChild( this.element );
};

PrevNextButton.prototype.deactivate = function() {
  // remove from DOM
  this.parent.element.removeChild( this.element );
  // click events
  this.unbindStartEvent( this.element );
  this.element.removeEventListener( 'click', this );
};

PrevNextButton.prototype.createSVG = function() {
  var svg = document.createElementNS( svgURI, 'svg');
  svg.setAttribute( 'class', 'flickity-button-icon' );
  svg.setAttribute( 'viewBox', '0 0 100 100' );
  var path = document.createElementNS( svgURI, 'path');
  var pathMovements = getArrowMovements( this.parent.options.arrowShape );
  path.setAttribute( 'd', pathMovements );
  path.setAttribute( 'class', 'arrow' );
  // rotate arrow
  if ( !this.isLeft ) {
    path.setAttribute( 'transform', 'translate(100, 100) rotate(180) ' );
  }
  svg.appendChild( path );
  return svg;
};

// get SVG path movmement
function getArrowMovements( shape ) {
  // use shape as movement if string
  if ( typeof shape == 'string' ) {
    return shape;
  }
  // create movement string
  return 'M ' + shape.x0 + ',50' +
    ' L ' + shape.x1 + ',' + ( shape.y1 + 50 ) +
    ' L ' + shape.x2 + ',' + ( shape.y2 + 50 ) +
    ' L ' + shape.x3 + ',50 ' +
    ' L ' + shape.x2 + ',' + ( 50 - shape.y2 ) +
    ' L ' + shape.x1 + ',' + ( 50 - shape.y1 ) +
    ' Z';
}

PrevNextButton.prototype.handleEvent = utils.handleEvent;

PrevNextButton.prototype.onclick = function() {
  if ( !this.isEnabled ) {
    return;
  }
  this.parent.uiChange();
  var method = this.isPrevious ? 'previous' : 'next';
  this.parent[ method ]();
};

// -----  ----- //

PrevNextButton.prototype.enable = function() {
  if ( this.isEnabled ) {
    return;
  }
  this.element.disabled = false;
  this.isEnabled = true;
};

PrevNextButton.prototype.disable = function() {
  if ( !this.isEnabled ) {
    return;
  }
  this.element.disabled = true;
  this.isEnabled = false;
};

PrevNextButton.prototype.update = function() {
  // index of first or last slide, if previous or next
  var slides = this.parent.slides;
  // enable is wrapAround and at least 2 slides
  if ( this.parent.options.wrapAround && slides.length > 1 ) {
    this.enable();
    return;
  }
  var lastIndex = slides.length ? slides.length - 1 : 0;
  var boundIndex = this.isPrevious ? 0 : lastIndex;
  var method = this.parent.selectedIndex == boundIndex ? 'disable' : 'enable';
  this[ method ]();
};

PrevNextButton.prototype.destroy = function() {
  this.deactivate();
  this.allOff();
};

// -------------------------- Flickity prototype -------------------------- //

utils.extend( Flickity.defaults, {
  prevNextButtons: true,
  arrowShape: {
    x0: 10,
    x1: 60, y1: 50,
    x2: 70, y2: 40,
    x3: 30
  }
});

Flickity.createMethods.push('_createPrevNextButtons');
var proto = Flickity.prototype;

proto._createPrevNextButtons = function() {
  if ( !this.options.prevNextButtons ) {
    return;
  }

  this.prevButton = new PrevNextButton( -1, this );
  this.nextButton = new PrevNextButton( 1, this );

  this.on( 'activate', this.activatePrevNextButtons );
};

proto.activatePrevNextButtons = function() {
  this.prevButton.activate();
  this.nextButton.activate();
  this.on( 'deactivate', this.deactivatePrevNextButtons );
};

proto.deactivatePrevNextButtons = function() {
  this.prevButton.deactivate();
  this.nextButton.deactivate();
  this.off( 'deactivate', this.deactivatePrevNextButtons );
};

// --------------------------  -------------------------- //

Flickity.PrevNextButton = PrevNextButton;

return Flickity;

}));

},{"./flickity":9,"fizzy-ui-utils":4,"unipointer":18}],15:[function(require,module,exports){
// slide
( function( window, factory ) {
  // universal module definition
  /* jshint strict: false */
  if ( typeof define == 'function' && define.amd ) {
    // AMD
    define( factory );
  } else if ( typeof module == 'object' && module.exports ) {
    // CommonJS
    module.exports = factory();
  } else {
    // browser global
    window.Flickity = window.Flickity || {};
    window.Flickity.Slide = factory();
  }

}( window, function factory() {
'use strict';

function Slide( parent ) {
  this.parent = parent;
  this.isOriginLeft = parent.originSide == 'left';
  this.cells = [];
  this.outerWidth = 0;
  this.height = 0;
}

var proto = Slide.prototype;

proto.addCell = function( cell ) {
  this.cells.push( cell );
  this.outerWidth += cell.size.outerWidth;
  this.height = Math.max( cell.size.outerHeight, this.height );
  // first cell stuff
  if ( this.cells.length == 1 ) {
    this.x = cell.x; // x comes from first cell
    var beginMargin = this.isOriginLeft ? 'marginLeft' : 'marginRight';
    this.firstMargin = cell.size[ beginMargin ];
  }
};

proto.updateTarget = function() {
  var endMargin = this.isOriginLeft ? 'marginRight' : 'marginLeft';
  var lastCell = this.getLastCell();
  var lastMargin = lastCell ? lastCell.size[ endMargin ] : 0;
  var slideWidth = this.outerWidth - ( this.firstMargin + lastMargin );
  this.target = this.x + this.firstMargin + slideWidth * this.parent.cellAlign;
};

proto.getLastCell = function() {
  return this.cells[ this.cells.length - 1 ];
};

proto.select = function() {
  this.cells.forEach( function( cell ) {
    cell.select();
  });
};

proto.unselect = function() {
  this.cells.forEach( function( cell ) {
    cell.unselect();
  });
};

proto.getCellElements = function() {
  return this.cells.map( function( cell ) {
    return cell.element;
  });
};

return Slide;

}));

},{}],16:[function(require,module,exports){
/*!
 * getSize v2.0.3
 * measure size of elements
 * MIT license
 */

/* jshint browser: true, strict: true, undef: true, unused: true */
/* globals console: false */

( function( window, factory ) {
  /* jshint strict: false */ /* globals define, module */
  if ( typeof define == 'function' && define.amd ) {
    // AMD
    define( factory );
  } else if ( typeof module == 'object' && module.exports ) {
    // CommonJS
    module.exports = factory();
  } else {
    // browser global
    window.getSize = factory();
  }

})( window, function factory() {
'use strict';

// -------------------------- helpers -------------------------- //

// get a number from a string, not a percentage
function getStyleSize( value ) {
  var num = parseFloat( value );
  // not a percent like '100%', and a number
  var isValid = value.indexOf('%') == -1 && !isNaN( num );
  return isValid && num;
}

function noop() {}

var logError = typeof console == 'undefined' ? noop :
  function( message ) {
    console.error( message );
  };

// -------------------------- measurements -------------------------- //

var measurements = [
  'paddingLeft',
  'paddingRight',
  'paddingTop',
  'paddingBottom',
  'marginLeft',
  'marginRight',
  'marginTop',
  'marginBottom',
  'borderLeftWidth',
  'borderRightWidth',
  'borderTopWidth',
  'borderBottomWidth'
];

var measurementsLength = measurements.length;

function getZeroSize() {
  var size = {
    width: 0,
    height: 0,
    innerWidth: 0,
    innerHeight: 0,
    outerWidth: 0,
    outerHeight: 0
  };
  for ( var i=0; i < measurementsLength; i++ ) {
    var measurement = measurements[i];
    size[ measurement ] = 0;
  }
  return size;
}

// -------------------------- getStyle -------------------------- //

/**
 * getStyle, get style of element, check for Firefox bug
 * https://bugzilla.mozilla.org/show_bug.cgi?id=548397
 */
function getStyle( elem ) {
  var style = getComputedStyle( elem );
  if ( !style ) {
    logError( 'Style returned ' + style +
      '. Are you running this code in a hidden iframe on Firefox? ' +
      'See https://bit.ly/getsizebug1' );
  }
  return style;
}

// -------------------------- setup -------------------------- //

var isSetup = false;

var isBoxSizeOuter;

/**
 * setup
 * check isBoxSizerOuter
 * do on first getSize() rather than on page load for Firefox bug
 */
function setup() {
  // setup once
  if ( isSetup ) {
    return;
  }
  isSetup = true;

  // -------------------------- box sizing -------------------------- //

  /**
   * Chrome & Safari measure the outer-width on style.width on border-box elems
   * IE11 & Firefox<29 measures the inner-width
   */
  var div = document.createElement('div');
  div.style.width = '200px';
  div.style.padding = '1px 2px 3px 4px';
  div.style.borderStyle = 'solid';
  div.style.borderWidth = '1px 2px 3px 4px';
  div.style.boxSizing = 'border-box';

  var body = document.body || document.documentElement;
  body.appendChild( div );
  var style = getStyle( div );
  // round value for browser zoom. desandro/masonry#928
  isBoxSizeOuter = Math.round( getStyleSize( style.width ) ) == 200;
  getSize.isBoxSizeOuter = isBoxSizeOuter;

  body.removeChild( div );
}

// -------------------------- getSize -------------------------- //

function getSize( elem ) {
  setup();

  // use querySeletor if elem is string
  if ( typeof elem == 'string' ) {
    elem = document.querySelector( elem );
  }

  // do not proceed on non-objects
  if ( !elem || typeof elem != 'object' || !elem.nodeType ) {
    return;
  }

  var style = getStyle( elem );

  // if hidden, everything is 0
  if ( style.display == 'none' ) {
    return getZeroSize();
  }

  var size = {};
  size.width = elem.offsetWidth;
  size.height = elem.offsetHeight;

  var isBorderBox = size.isBorderBox = style.boxSizing == 'border-box';

  // get all measurements
  for ( var i=0; i < measurementsLength; i++ ) {
    var measurement = measurements[i];
    var value = style[ measurement ];
    var num = parseFloat( value );
    // any 'auto', 'medium' value will be 0
    size[ measurement ] = !isNaN( num ) ? num : 0;
  }

  var paddingWidth = size.paddingLeft + size.paddingRight;
  var paddingHeight = size.paddingTop + size.paddingBottom;
  var marginWidth = size.marginLeft + size.marginRight;
  var marginHeight = size.marginTop + size.marginBottom;
  var borderWidth = size.borderLeftWidth + size.borderRightWidth;
  var borderHeight = size.borderTopWidth + size.borderBottomWidth;

  var isBorderBoxSizeOuter = isBorderBox && isBoxSizeOuter;

  // overwrite width and height if we can get it from style
  var styleWidth = getStyleSize( style.width );
  if ( styleWidth !== false ) {
    size.width = styleWidth +
      // add padding and border unless it's already including it
      ( isBorderBoxSizeOuter ? 0 : paddingWidth + borderWidth );
  }

  var styleHeight = getStyleSize( style.height );
  if ( styleHeight !== false ) {
    size.height = styleHeight +
      // add padding and border unless it's already including it
      ( isBorderBoxSizeOuter ? 0 : paddingHeight + borderHeight );
  }

  size.innerWidth = size.width - ( paddingWidth + borderWidth );
  size.innerHeight = size.height - ( paddingHeight + borderHeight );

  size.outerWidth = size.width + marginWidth;
  size.outerHeight = size.height + marginHeight;

  return size;
}

return getSize;

});

},{}],17:[function(require,module,exports){
/*!
 * Unidragger v2.3.1
 * Draggable base class
 * MIT license
 */

/*jshint browser: true, unused: true, undef: true, strict: true */

( function( window, factory ) {
  // universal module definition
  /*jshint strict: false */ /*globals define, module, require */

  if ( typeof define == 'function' && define.amd ) {
    // AMD
    define( [
      'unipointer/unipointer'
    ], function( Unipointer ) {
      return factory( window, Unipointer );
    });
  } else if ( typeof module == 'object' && module.exports ) {
    // CommonJS
    module.exports = factory(
      window,
      require('unipointer')
    );
  } else {
    // browser global
    window.Unidragger = factory(
      window,
      window.Unipointer
    );
  }

}( window, function factory( window, Unipointer ) {

'use strict';

// -------------------------- Unidragger -------------------------- //

function Unidragger() {}

// inherit Unipointer & EvEmitter
var proto = Unidragger.prototype = Object.create( Unipointer.prototype );

// ----- bind start ----- //

proto.bindHandles = function() {
  this._bindHandles( true );
};

proto.unbindHandles = function() {
  this._bindHandles( false );
};

/**
 * Add or remove start event
 * @param {Boolean} isAdd
 */
proto._bindHandles = function( isAdd ) {
  // munge isAdd, default to true
  isAdd = isAdd === undefined ? true : isAdd;
  // bind each handle
  var bindMethod = isAdd ? 'addEventListener' : 'removeEventListener';
  var touchAction = isAdd ? this._touchActionValue : '';
  for ( var i=0; i < this.handles.length; i++ ) {
    var handle = this.handles[i];
    this._bindStartEvent( handle, isAdd );
    handle[ bindMethod ]( 'click', this );
    // touch-action: none to override browser touch gestures. metafizzy/flickity#540
    if ( window.PointerEvent ) {
      handle.style.touchAction = touchAction;
    }
  }
};

// prototype so it can be overwriteable by Flickity
proto._touchActionValue = 'none';

// ----- start event ----- //

/**
 * pointer start
 * @param {Event} event
 * @param {Event or Touch} pointer
 */
proto.pointerDown = function( event, pointer ) {
  var isOkay = this.okayPointerDown( event );
  if ( !isOkay ) {
    return;
  }
  // track start event position
  // Safari 9 overrides pageX and pageY. These values needs to be copied. flickity#842
  this.pointerDownPointer = {
    pageX: pointer.pageX,
    pageY: pointer.pageY,
  };

  event.preventDefault();
  this.pointerDownBlur();
  // bind move and end events
  this._bindPostStartEvents( event );
  this.emitEvent( 'pointerDown', [ event, pointer ] );
};

// nodes that have text fields
var cursorNodes = {
  TEXTAREA: true,
  INPUT: true,
  SELECT: true,
  OPTION: true,
};

// input types that do not have text fields
var clickTypes = {
  radio: true,
  checkbox: true,
  button: true,
  submit: true,
  image: true,
  file: true,
};

// dismiss inputs with text fields. flickity#403, flickity#404
proto.okayPointerDown = function( event ) {
  var isCursorNode = cursorNodes[ event.target.nodeName ];
  var isClickType = clickTypes[ event.target.type ];
  var isOkay = !isCursorNode || isClickType;
  if ( !isOkay ) {
    this._pointerReset();
  }
  return isOkay;
};

// kludge to blur previously focused input
proto.pointerDownBlur = function() {
  var focused = document.activeElement;
  // do not blur body for IE10, metafizzy/flickity#117
  var canBlur = focused && focused.blur && focused != document.body;
  if ( canBlur ) {
    focused.blur();
  }
};

// ----- move event ----- //

/**
 * drag move
 * @param {Event} event
 * @param {Event or Touch} pointer
 */
proto.pointerMove = function( event, pointer ) {
  var moveVector = this._dragPointerMove( event, pointer );
  this.emitEvent( 'pointerMove', [ event, pointer, moveVector ] );
  this._dragMove( event, pointer, moveVector );
};

// base pointer move logic
proto._dragPointerMove = function( event, pointer ) {
  var moveVector = {
    x: pointer.pageX - this.pointerDownPointer.pageX,
    y: pointer.pageY - this.pointerDownPointer.pageY
  };
  // start drag if pointer has moved far enough to start drag
  if ( !this.isDragging && this.hasDragStarted( moveVector ) ) {
    this._dragStart( event, pointer );
  }
  return moveVector;
};

// condition if pointer has moved far enough to start drag
proto.hasDragStarted = function( moveVector ) {
  return Math.abs( moveVector.x ) > 3 || Math.abs( moveVector.y ) > 3;
};

// ----- end event ----- //

/**
 * pointer up
 * @param {Event} event
 * @param {Event or Touch} pointer
 */
proto.pointerUp = function( event, pointer ) {
  this.emitEvent( 'pointerUp', [ event, pointer ] );
  this._dragPointerUp( event, pointer );
};

proto._dragPointerUp = function( event, pointer ) {
  if ( this.isDragging ) {
    this._dragEnd( event, pointer );
  } else {
    // pointer didn't move enough for drag to start
    this._staticClick( event, pointer );
  }
};

// -------------------------- drag -------------------------- //

// dragStart
proto._dragStart = function( event, pointer ) {
  this.isDragging = true;
  // prevent clicks
  this.isPreventingClicks = true;
  this.dragStart( event, pointer );
};

proto.dragStart = function( event, pointer ) {
  this.emitEvent( 'dragStart', [ event, pointer ] );
};

// dragMove
proto._dragMove = function( event, pointer, moveVector ) {
  // do not drag if not dragging yet
  if ( !this.isDragging ) {
    return;
  }

  this.dragMove( event, pointer, moveVector );
};

proto.dragMove = function( event, pointer, moveVector ) {
  event.preventDefault();
  this.emitEvent( 'dragMove', [ event, pointer, moveVector ] );
};

// dragEnd
proto._dragEnd = function( event, pointer ) {
  // set flags
  this.isDragging = false;
  // re-enable clicking async
  setTimeout( function() {
    delete this.isPreventingClicks;
  }.bind( this ) );

  this.dragEnd( event, pointer );
};

proto.dragEnd = function( event, pointer ) {
  this.emitEvent( 'dragEnd', [ event, pointer ] );
};

// ----- onclick ----- //

// handle all clicks and prevent clicks when dragging
proto.onclick = function( event ) {
  if ( this.isPreventingClicks ) {
    event.preventDefault();
  }
};

// ----- staticClick ----- //

// triggered after pointer down & up with no/tiny movement
proto._staticClick = function( event, pointer ) {
  // ignore emulated mouse up clicks
  if ( this.isIgnoringMouseUp && event.type == 'mouseup' ) {
    return;
  }

  this.staticClick( event, pointer );

  // set flag for emulated clicks 300ms after touchend
  if ( event.type != 'mouseup' ) {
    this.isIgnoringMouseUp = true;
    // reset flag after 300ms
    setTimeout( function() {
      delete this.isIgnoringMouseUp;
    }.bind( this ), 400 );
  }
};

proto.staticClick = function( event, pointer ) {
  this.emitEvent( 'staticClick', [ event, pointer ] );
};

// ----- utils ----- //

Unidragger.getPointerPoint = Unipointer.getPointerPoint;

// -----  ----- //

return Unidragger;

}));

},{"unipointer":18}],18:[function(require,module,exports){
/*!
 * Unipointer v2.3.0
 * base class for doing one thing with pointer event
 * MIT license
 */

/*jshint browser: true, undef: true, unused: true, strict: true */

( function( window, factory ) {
  // universal module definition
  /* jshint strict: false */ /*global define, module, require */
  if ( typeof define == 'function' && define.amd ) {
    // AMD
    define( [
      'ev-emitter/ev-emitter'
    ], function( EvEmitter ) {
      return factory( window, EvEmitter );
    });
  } else if ( typeof module == 'object' && module.exports ) {
    // CommonJS
    module.exports = factory(
      window,
      require('ev-emitter')
    );
  } else {
    // browser global
    window.Unipointer = factory(
      window,
      window.EvEmitter
    );
  }

}( window, function factory( window, EvEmitter ) {

'use strict';

function noop() {}

function Unipointer() {}

// inherit EvEmitter
var proto = Unipointer.prototype = Object.create( EvEmitter.prototype );

proto.bindStartEvent = function( elem ) {
  this._bindStartEvent( elem, true );
};

proto.unbindStartEvent = function( elem ) {
  this._bindStartEvent( elem, false );
};

/**
 * Add or remove start event
 * @param {Boolean} isAdd - remove if falsey
 */
proto._bindStartEvent = function( elem, isAdd ) {
  // munge isAdd, default to true
  isAdd = isAdd === undefined ? true : isAdd;
  var bindMethod = isAdd ? 'addEventListener' : 'removeEventListener';

  // default to mouse events
  var startEvent = 'mousedown';
  if ( window.PointerEvent ) {
    // Pointer Events
    startEvent = 'pointerdown';
  } else if ( 'ontouchstart' in window ) {
    // Touch Events. iOS Safari
    startEvent = 'touchstart';
  }
  elem[ bindMethod ]( startEvent, this );
};

// trigger handler methods for events
proto.handleEvent = function( event ) {
  var method = 'on' + event.type;
  if ( this[ method ] ) {
    this[ method ]( event );
  }
};

// returns the touch that we're keeping track of
proto.getTouch = function( touches ) {
  for ( var i=0; i < touches.length; i++ ) {
    var touch = touches[i];
    if ( touch.identifier == this.pointerIdentifier ) {
      return touch;
    }
  }
};

// ----- start event ----- //

proto.onmousedown = function( event ) {
  // dismiss clicks from right or middle buttons
  var button = event.button;
  if ( button && ( button !== 0 && button !== 1 ) ) {
    return;
  }
  this._pointerDown( event, event );
};

proto.ontouchstart = function( event ) {
  this._pointerDown( event, event.changedTouches[0] );
};

proto.onpointerdown = function( event ) {
  this._pointerDown( event, event );
};

/**
 * pointer start
 * @param {Event} event
 * @param {Event or Touch} pointer
 */
proto._pointerDown = function( event, pointer ) {
  // dismiss right click and other pointers
  // button = 0 is okay, 1-4 not
  if ( event.button || this.isPointerDown ) {
    return;
  }

  this.isPointerDown = true;
  // save pointer identifier to match up touch events
  this.pointerIdentifier = pointer.pointerId !== undefined ?
    // pointerId for pointer events, touch.indentifier for touch events
    pointer.pointerId : pointer.identifier;

  this.pointerDown( event, pointer );
};

proto.pointerDown = function( event, pointer ) {
  this._bindPostStartEvents( event );
  this.emitEvent( 'pointerDown', [ event, pointer ] );
};

// hash of events to be bound after start event
var postStartEvents = {
  mousedown: [ 'mousemove', 'mouseup' ],
  touchstart: [ 'touchmove', 'touchend', 'touchcancel' ],
  pointerdown: [ 'pointermove', 'pointerup', 'pointercancel' ],
};

proto._bindPostStartEvents = function( event ) {
  if ( !event ) {
    return;
  }
  // get proper events to match start event
  var events = postStartEvents[ event.type ];
  // bind events to node
  events.forEach( function( eventName ) {
    window.addEventListener( eventName, this );
  }, this );
  // save these arguments
  this._boundPointerEvents = events;
};

proto._unbindPostStartEvents = function() {
  // check for _boundEvents, in case dragEnd triggered twice (old IE8 bug)
  if ( !this._boundPointerEvents ) {
    return;
  }
  this._boundPointerEvents.forEach( function( eventName ) {
    window.removeEventListener( eventName, this );
  }, this );

  delete this._boundPointerEvents;
};

// ----- move event ----- //

proto.onmousemove = function( event ) {
  this._pointerMove( event, event );
};

proto.onpointermove = function( event ) {
  if ( event.pointerId == this.pointerIdentifier ) {
    this._pointerMove( event, event );
  }
};

proto.ontouchmove = function( event ) {
  var touch = this.getTouch( event.changedTouches );
  if ( touch ) {
    this._pointerMove( event, touch );
  }
};

/**
 * pointer move
 * @param {Event} event
 * @param {Event or Touch} pointer
 * @private
 */
proto._pointerMove = function( event, pointer ) {
  this.pointerMove( event, pointer );
};

// public
proto.pointerMove = function( event, pointer ) {
  this.emitEvent( 'pointerMove', [ event, pointer ] );
};

// ----- end event ----- //


proto.onmouseup = function( event ) {
  this._pointerUp( event, event );
};

proto.onpointerup = function( event ) {
  if ( event.pointerId == this.pointerIdentifier ) {
    this._pointerUp( event, event );
  }
};

proto.ontouchend = function( event ) {
  var touch = this.getTouch( event.changedTouches );
  if ( touch ) {
    this._pointerUp( event, touch );
  }
};

/**
 * pointer up
 * @param {Event} event
 * @param {Event or Touch} pointer
 * @private
 */
proto._pointerUp = function( event, pointer ) {
  this._pointerDone();
  this.pointerUp( event, pointer );
};

// public
proto.pointerUp = function( event, pointer ) {
  this.emitEvent( 'pointerUp', [ event, pointer ] );
};

// ----- pointer done ----- //

// triggered on pointer up & pointer cancel
proto._pointerDone = function() {
  this._pointerReset();
  this._unbindPostStartEvents();
  this.pointerDone();
};

proto._pointerReset = function() {
  // reset properties
  this.isPointerDown = false;
  delete this.pointerIdentifier;
};

proto.pointerDone = noop;

// ----- pointer cancel ----- //

proto.onpointercancel = function( event ) {
  if ( event.pointerId == this.pointerIdentifier ) {
    this._pointerCancel( event, event );
  }
};

proto.ontouchcancel = function( event ) {
  var touch = this.getTouch( event.changedTouches );
  if ( touch ) {
    this._pointerCancel( event, touch );
  }
};

/**
 * pointer cancel
 * @param {Event} event
 * @param {Event or Touch} pointer
 * @private
 */
proto._pointerCancel = function( event, pointer ) {
  this._pointerDone();
  this.pointerCancel( event, pointer );
};

// public
proto.pointerCancel = function( event, pointer ) {
  this.emitEvent( 'pointerCancel', [ event, pointer ] );
};

// -----  ----- //

// utility function for getting x/y coords from event
Unipointer.getPointerPoint = function( pointer ) {
  return {
    x: pointer.pageX,
    y: pointer.pageY
  };
};

// -----  ----- //

return Unipointer;

}));

},{"ev-emitter":3}],19:[function(require,module,exports){
(function () {

    var Flickity        = require('flickity'),
    Carousels

    Carousels = {

        init: () => {

            Carousels.initialiseCarousel()

        },

        initialiseCarousel  : () => {

            var carousels = document.querySelectorAll('.JS--carousel')

            carousels.forEach(carousel => {

                var settings = {
                        cellAlign   : 'center',            
                        wrapAround  : true,
                        autoPlay    : false,
                        imagesLoaded: true,
                        pageDots    : false
                    }

                var slides = carousel.querySelectorAll('.JS--carousel__slideWrap')

                if(carousel.dataset.plotCarouselType == 'image') {
                    settings = {
                        cellAlign   : 'center',  
                        lazyLoad : 2,
                        wrapAround  : true,
                        pageDots : false
                    }
                }

                if(slides.length > 1) {

                    var flkty = new Flickity(carousel, settings)

                }

            });

            
        },

    }

    module.exports = Carousels

}())

},{"flickity":10}],20:[function(require,module,exports){
(function () {

    var FAQs

    FAQs = {
        sections: document.querySelectorAll('.faqs'),

        init: () => {

            if(!FAQs.sections)
                return

            FAQs.sections.forEach(section => FAQs.initialiseListeners(section))

        },

        initialiseListeners: (section) => {
            
            let faqs = section.querySelectorAll('.faq')

            faqs.forEach(faq => {
                
                let question = faq.querySelector('.faq__question')
                let answer   = faq.querySelector('.faq__answer')

                question.addEventListener('click', () => {

                    faq.classList.toggle('faq--open')

                    if(faq.classList.contains('faq--open')) {
                        answer.style.maxHeight = answer.scrollHeight + 'px'
                    } else {
                        answer.style.maxHeight = 0
                    }
                        

                })

            })
        }


    }

    module.exports = FAQs

}())

},{}],21:[function(require,module,exports){
// LazyLoad for Plot by Jon Mills, Matty Glen & Michael Watson

// This module loads in images asyncronously. It will look for the class
// "JS--lazyLoad" and then look for a data-src on image or video tags. 
// It will then replace the src of that element with the image linked on
// the data attribute.

// If the element is not an image or a video- it will assign the data-src
// as a background image. 

// If the screen size is less than the defined mobileBreakpoint, we load
// the src from data-small-src instead. 

// Creation of these video and image objects can be made using the PHP
// helper in lib/helpers.php plotLazyLoad()

// If we need to stipulate the height of an image before it loads, to avoid
// any jumpiness, we can pass through a ratio (w/h) of the image so it's
// set before the image loads.

// We also handle autoplaying videos, if the video has an autoplay attribute.
// It will pause and play videos appropriately depending on if they're in
// view or not.

(function(){

    var LazyLoad

    LazyLoad = {
        mobileBreakpoint : 640,
        images :           document.querySelectorAll('.JS--lazyLoad'),
        config : {
            rootMargin: '0px',
            threshold: 0.01
        },
        observer : null,
        init : function(){ 

            LazyLoad.observer = new IntersectionObserver(LazyLoad.handleImageLoad, LazyLoad.config)

            LazyLoad.loadImages()
            
        },

        loadImages : () => { 

            LazyLoad.images.forEach( image => {  

                LazyLoad.observer.observe(image)
            })
                
        },

        addElements : elements => {

            return new Promise(function(resolve,reject){

                elements.forEach( image => {       
                    LazyLoad.observer.observe(image)
                })

                resolve()

            })
        },

        handleImageLoad : entries => {                        

            entries.forEach( entry => {
                
                let element = entry.target
                
                if(!element.classList.contains('loaded') && !element.classList.contains('loading')) { 

                    if(!entry.isIntersecting)
                        return
                    
                    element.classList.add('loading')

                    var tag = entry.isIntersecting && element.tagName

                    let src = element.dataset.src

                    if(LazyLoad.isSmallScreen() && element.dataset.smallSrc) {

                        src = element.dataset.smallSrc

                    }
                                
                    if(tag == "VIDEO") {

                        if(LazyLoad.isSmallScreen() && element.dataset.smallSrc) {

                            element.src = element.dataset.smallSrc

                        } else {

                             element.src = element.dataset.src

                             if(element.getAttribute('autoplay'))
                                 element.play()
                         
                        }

                        element.classList.add('loaded')

                    } else {

                        LazyLoad.getImage(src, element).then( data => {

                            let tag = element.tagName

                            if(tag == "IMG") {

                                data.element.src = data.src

                            } else {

                                data.element.style.backgroundImage = 'url(' + data.src + ')'

                            }

                            data.element.classList.add('loaded')
                            data.element.classList.remove('loading')

                        }).catch( erroredSrc =>{

                            console.log(erroredSrc, 'image not found')

                        })

                    }

                } else {

                    if(element.tagName == "VIDEO") 

                        if(element.getAttribute('autoplay')) 

                            if(!entry.isIntersecting && element.paused == false) 

                                element.pause()

                            else

                                element.play()

                }

            })
        },

        getImage: (src, element) => {

            return new Promise(function(resolve,reject){

                var img = new Image()

                img.onload = () => {

                    resolve({
                        src: src,
                        element: element
                    })

                }

                img.onerror = () => {

                    reject({
                        src: src,
                        element: element
                    })
                }

                img.src = src
            })

        },

        isSmallScreen : () => {

            if(window.innerWidth < LazyLoad.mobileBreakpoint)
                return true
            

            return false

        }


    }

    module.exports = LazyLoad

})()


},{}],22:[function(require,module,exports){
// Modals for Plot by Michael Watson
// A simple modals solution that looks for the class "JS--plotModalButton"
// And when clicked, reads the value set on data-plot-modal. it then looks
// for an HTML element called ".JS--plotModalContents" with a corresponding value.

// For example, <a class="JS--plotModalButton" data-plot-modal="1">Click me</a>
// Will find the following element:
// <div class="JS--plotModalContents">I am some modal content!</div>
// And will take the innerHTML to put inside a modal on the screen.

// Galleries can be created by connecting multiple Plot Modal Buttons
// by giving them a data-plot-modal-group option.
// They will then have working left and right arrows to navigate through
// Contents in a loop.

(function () {

    var LazyLoad         = require('./lazyload'),  
        Plot             = require('./plot'),
        BodyScrollLock   = require('body-scroll-lock'),
        Modals

    Modals = {
        currentGroupItem    : 0,
        groupLinks          : [],  
        currentModalId      : null,
        isOpen              : false,
        isLoading           : false,
        controlsTimer       : false,
        modalContent        : document.querySelector('.JS--plotModalReplaceContents'),
        modalGroupControls  : document.querySelector('.JS--plotModalControls'),
        modalGroupNext      : document.querySelector('.JS--plotModalControls__next'),
        modalGroupBack      : document.querySelector('.JS--plotModalControls__back'),
        plotModal           : document.querySelector('.JS--plotModal'),


        init: function () {

            Modals.createListeners()
            Modals.checkForModalNotification()
        },

        createListeners: function () {

            const closeButtons = document.querySelectorAll('.JS--closePlotModal')

            for(var closeButton of closeButtons) {
                closeButton.addEventListener('click',function(e){
                     if (e.target !== this)
                        return
                     Modals.closePlotModal()
                })
            }

            Modals.plotModal.addEventListener('mousemove',function(){

                if(Modals.currentModalId && !Plot.isTouchDevice()) {

                    if(Modals.controlsTimer)
                        clearTimeout(Modals.controlsTimer)
        
                    if(Modals.plotModal.classList.contains('hideControls'))
                        Modals.plotModal.classList.remove('hideControls')

                    Modals.controlsTimer = setTimeout(function() {

                        Modals.plotModal.classList.add('hideControls')

                    },2200)

                }

            })
                
            document.querySelector('.siteWrap').addEventListener('click', function(e){
                if(e.target.closest('[data-plot-modal]')) {
                    e.preventDefault()
                    Modals.openPlotModal(e.target.closest('[data-plot-modal]'))
                }

            })

            if(Modals.modalGroupBack) {

                Modals.modalGroupBack.addEventListener('click',Modals.triggerBackGroupItem);

            }

            if(Modals.modalGroupNext) {

                Modals.modalGroupNext.addEventListener('click',Modals.triggerNextGroupItem);

            }

            document.addEventListener('keydown', (e) => {

                if(e.which == 39 && Modals.groupLinks.length > 0) {

                    Modals.triggerNextGroupItem()
                }

                if(e.which == 37 && Modals.groupLinks.length > 0) {

                    Modals.triggerBackGroupItem()

                }
                
                if(Modals.isOpen && e.which==27) {

                    Modals.closePlotModal()
                
                }

            });

        },


        checkForModalNotification : () => {

            const notificationTrigger = document.querySelector('.JS--fakeButtonForModalNotifications')

            if(notificationTrigger) {

                if (sessionStorage.getItem('plotHasNotificationFired') !== "1") { 

                    sessionStorage.setItem('plotHasNotificationFired', '1');

                    setTimeout(function() {

                        Modals.openPlotModal(notificationTrigger)

                    },notificationTrigger.dataset.plotNotificationWait*1000)

                }

            }

        },

        triggerBackGroupItem : () => {

            Modals.currentGroupItem--

            if(Modals.currentGroupItem < 0) {

                Modals.currentGroupItem = Modals.groupLinks.length - 1;

            }

            Modals.openPlotModal(Modals.groupLinks[Modals.currentGroupItem])

        },

        triggerNextGroupItem : () => {

            Modals.currentGroupItem++

            if(Modals.currentGroupItem == Modals.groupLinks.length) {

                Modals.currentGroupItem = 0

            }

            Modals.openPlotModal(Modals.groupLinks[Modals.currentGroupItem])

        },

        openPlotModal: (element) => {

            if(Modals.isLoading == true)
                return false

            var settings = {
                type            : 'inline', // (inline|ajax) if the content is already in the dom or not
                groupId         : '', //The optional ID of the group of modals used for gallery views
                contentsId      : '', //The ID that references where, on the page, the content to use lives
                templatePart    : '', //The template part to load, if AJAX
                ajaxData        : {}, //Data to send via AJAX
                modalClass      : '' //A custom class to add to our modal
            }

            Modals.isLoading = true

            if(element.dataset.plotModalType == 'ajax') {
                settings.type = 'ajax'
            }

            settings.contentsId     = element.dataset.plotModalContents
            settings.groupId        = element.dataset.plotModalGroup
            settings.templatePart   = element.dataset.plotModalTemplatePart
            settings.modalClass     = element.dataset.plotModalClass

            if(!settings.contentsId && settings.type == 'inline') {
                console.log('Inline Modals need a plot-modal-contents variable added')
                return false
            }

            if(settings.type == 'ajax' && !settings.templatePart) {
                console.log('Ajax modals need a plot-modal-template-part variable added')
                return false
            }

            //Check to see if it's part of a group
            
            if(Modals.groupLinks.length == 0 && settings.groupId)
               Modals.initialiseGroup(element)
            
            if(!settings.groupId)
                Modals.modalGroupControls.classList.add('hidden')

            if(settings.modalClass) {
                Modals.plotModal.classList.add(settings.modalClass)
            }

            if(settings.type == 'inline') {

                Modals.currentModalId = settings.contentsId

                //Find content to insert in our modal
                var plotModalContents = document.querySelector('.JS--plotModalContents[data-plot-modal-contents="' + Modals.currentModalId + '"]')

                if(!plotModalContents.length == 0)
                    return false

                plotModalContents = plotModalContents.innerHTML;

                Modals.putContentsIntoModal(plotModalContents)

            } else {
                //AJAX loading content
                var ajaxData = {}

                document.body.classList.add('plotModalLoadingAjax')

                for(const key in element.dataset) {
                    if(key.substring(0,13) == 'plotModalData') {
                        ajaxData[key.charAt(13).toLowerCase() + key.substring(14)] = element.dataset[key]
                    }
                }
                 
                const args = {
                    returnOrWrite   : 'return',
                    templatePart    : settings.templatePart,
                    data            : ajaxData
                }
                Plot.loadTemplatePart(args).then(html => {
                    Modals.putContentsIntoModal(html)
                })
            }

        },

        putContentsIntoModal : contents =>  {


            Modals.modalContent.style.minHeight = Modals.modalContent.clientHeight + 'px'
            Modals.modalContent.innerHTML = contents

            BodyScrollLock.disableBodyScroll(Modals.plotModal)

            document.body.classList.add('plotModalInView')

            const newImages = Modals.modalContent.querySelectorAll('img')

            LazyLoad.addElements(newImages).then(() => {

                setTimeout(()=> {

                    Modals.modalContent.style.minHeight = 0

                },50)

            })

            const newVideos = Modals.modalContent.querySelectorAll('video')



            newVideos.forEach(video =>{

                var player = new MediaElementPlayer(video,/* Options */);
                player.play();

            })

            Modals.isOpen = true
            Modals.isLoading = false
            document.body.classList.remove('plotModalLoadingAjax')

        },

        initialiseGroup : (element) => {

            Modals.groupLinks = document.querySelectorAll('[data-plot-modal-group="'+element.dataset.plotModalGroup+'"]')

            var i = 0

            for(var groupLink of Modals.groupLinks) {

                if(element == groupLink)
                    Modals.currentGroupItem = i;
                
                i++

            }

            if(Modals.currentModalId && !Plot.isTouchDevice())

                Modals.controlsTimer = setTimeout(function() {

                    Modals.plotModal.classList.add('hideControls')

                },3000)

            Modals.modalGroupControls.classList.remove('hidden')

        },

        closePlotModal: () => {
    
            document.body.classList.remove('plotModalInView')

            Modals.currentModalId = null

            Modals.plotModal.classList = 'JS--plotModal plotModal'

            Modals.groupLinks = []

            Modals.currentGroupItem = 0

            Modals.modalContent.innerHTML = ''
            
            BodyScrollLock.enableBodyScroll(Modals.plotModal)

            Modals.isOpen = false
        }

    }

    module.exports = Modals

}())

},{"./lazyload":21,"./plot":24,"body-scroll-lock":1}],23:[function(require,module,exports){
(function () {

  var Smooth;

  Smooth = {

    trackedElementsObserver : null,
    standardScrollFramesObserver : null,

    mainScrollAnimationFrame : null,

    currentPosition : 0,

    mutationObserverDebounce : null,

    onScrollCallbackThrottler : null,

    ease : 0.07,

    lastPosition : 0,

    onScroll : null,

    standardScroll : false,

    scrollElements : [],

    topBarHeight : 0,

    scrollFrames : [],

    ticking : false,

    dom : {
            scrollWindow                            : document.querySelector('[data-plot-smooth-scroll]'),
            scrollFrames                            : document.querySelectorAll('[data-plot-smooth-scroll-frame]'),
            scrollElements                          : document.querySelectorAll('[data-plot-smooth-scroll-element]'),
            topBar                                  : document.querySelector('[data-plot-smooth-scroll-topbar')
          },

    windowHeight : window.innerHeight, 

    windowWidth : window.innerWidth,

    init: settings => {

      //override any default settings with passed parameters
      Smooth.setSettings(settings)

      if(!Smooth.standardScroll) {

        //Set our current and last positions 
        //to the current scroll Y position, in case
        //we are scrolled down the page on load
        Smooth.currentPosition    = window.scrollY
        Smooth.lastPosition       = window.scrollY

        //Put fixed onto the whole site ready to 
        //intercept scrolling
        Smooth.setStyles()

        window.addEventListener('resize', Smooth.refresh, { passive: true })
        window.addEventListener('scroll', Smooth.scroll, { passive: true })

        //Read through each scroll frame and set data
        //into a single array for processing later
        //{
        //      element           : element,      (the dom element)
        //      top               : 100,          (the offset top value without transforms, in pixels)
        //      height            : 300,          (the height of the element without transforms, in pixels)
        //      bottom            : 400,          (the offset bottom position value without transforms, in pixels)
        //      sticky            : false,        (if the element should behave like CSS sticky or not)
        //      parentBottom      : false || 500  (if the element is sticky, return the bottom position of its parent in pixels (when it should unstick))
        //  }
        Smooth.setScrollFrameData()

      }

      //If any scroll elements exist, we can add them and monitor them
      if(Smooth.dom.scrollElements) {
        //Read through each scroll element and set data
        //into a single array for processing later
        //{
        //      element         : element,          (the dom element)
        //      top             : 100,              (the offset top value without transforms, in pixels)
        //      height          : 300,              (the height of the element without transforms, in pixels)
        //      bottom          : 400,              (the offset bottom position value without transforms, in pixels)
        //      isVisible       : false,            (if the element is currently in the window frame or not)
        //      initialOffset   : .2,               (how far away this element is from the initial center of the screen)
        //      currentPosition : 0                 (how far up the viewport this element currently is (between -1 and 1))
        //      callback        : 'function.name'   (the name of a function you can call when this moves within view)
        // }
        Smooth.trackedElementsObserver = new IntersectionObserver(Smooth.trackVisibleElements, {rootMargin: '200px',threshold: 0.01})
        Smooth.setScrollElementData()
      }

      //Set up a mutation observer to listen out for changes in height,
      //to adjust our height of document accordingly
      Smooth.initMutationObserver()

      //If there's a fixed topbar on this site, we can set the height
      //here, in order to offset any sticky positions. 
      Smooth.setTopBarHeight()

      //If it's not standard scroll, set our initial scroll frame positions
      if(!Smooth.standardScroll) {
        Smooth.setPositionOfFrames()
      } else {
         Smooth.standardScrollFramesObserver = new IntersectionObserver(Smooth.trackStandardScrollFrames, {rootMargin: '0px',threshold: 0.01})
         for(let frame of Smooth.dom.scrollFrames) {
            Smooth.standardScrollFramesObserver.observe(frame)
         }
      }

      //Set our position of any scroll elements
      Smooth.positionScrollElements()

    },

    setSettings : settings => {

      if(!settings)
        return true

      if(typeof(settings.onScroll) == 'function')
        Smooth.onScroll = settings.onScroll
      
      if(settings.standardScroll == true)
        Smooth.standardScroll = true

      if(settings.ease) 
        Smooth.ease = settings.ease
      
    },

    retriggerWindowSizeOnMutate : (mutationsList, observer) => { 

      if(!Smooth.mutationObserverDebounce) {

        Smooth.mutationObserverDebounce = setTimeout(function(){

            var changed = false

            Smooth.scrollFrames.forEach(frame => {
                if(frame.height != frame.element.clientHeight)
                  changed = true
            })

            if(changed == true) 
              Smooth.refresh()
            
            clearTimeout(Smooth.mutationObserverDebounce)
            Smooth.mutationObserverDebounce = null

        },200)

      }

    },

    initMutationObserver : () => {

      for(var scrollFrame of Smooth.dom.scrollFrames) {

        const observer = new MutationObserver(Smooth.retriggerWindowSizeOnMutate)
        observer.observe(scrollFrame, {
          childList   : true,
          attributes  : true,
          subtree     : true
        })
      }

    },

    destroy : () => {

      Smooth.scrollElements.forEach(entry =>{
        entry.element.removeAttribute('style')
      })

      Smooth.scrollFrames.forEach(entry =>{
        entry.element.removeAttribute('style')
      })

      Smooth.trackedElementsObserver = null
      Smooth.mainScrollAnimationFrame = null
      Smooth.currentPosition = 0
      Smooth.mutationObserverDebounce = null
      Smooth.onScrollCallbackThrottler = null
      Smooth.ease = 0.07
      Smooth.lastPosition = 0
      Smooth.onScroll = null
      Smooth.standardScroll = false
      Smooth.scrollElements = []
      Smooth.topBarHeight = 0
      Smooth.scrollFrames = []
      Smooth.ticking = false
      Smooth.dom.scrollWindow.removeAttribute('style')

    },

    addElements : (elements) => {

      return new Promise(function(resolve,reject){

            elements.forEach( element => {       
                Smooth.trackedElementsObserver.observe(element)
            })

            resolve()

      })

    },

    scrollTo : (element) => {
      
      window.scrollTo(0,Smooth.exactPositionOfElement(element) - 100)

      if(Smooth.standardScroll != false) {
        Smooth.ticking = true
        Smooth.mainScrollAnimationFrame = requestAnimationFrame(Smooth.run)
      }
    },

    setScrollElementData : () => {

      Smooth.dom.scrollElements = document.querySelectorAll('[data-plot-smooth-scroll-element]')
      Smooth.addElements(Smooth.dom.scrollElements) 

      if(!Smooth.dom.scrollElements)
        return false

      Smooth.scrollElements = []
    
      Smooth.dom.scrollElements.forEach( (element,i) => {

        const elementTop = Smooth.exactPositionOfElement(element)

        var height = element.clientHeight

        var callback  = false,
            fromValue = -1,
            toValue   = 1

        //Is anything set on this element as a callback?
        if(element.dataset.plotSmoothScrollElement) {

          let c = element.dataset.plotSmoothScrollElement

          //First up - have values been passed to this callback in this form: callback(2,5)
          let values = c.substring( c.indexOf( '(' ) + 1, c.indexOf( ')' ) )
          values = values.split(',')

          //Valid if we have 2, and from is less that to value
          if(values.length == 2 && values[0] < values[1]) {
            fromValue = Number(values[0])
            toValue = Number(values[1])
          }

          let potentialFunction = window[c]

          if (typeof potentialFunction === "function") {

            callback = potentialFunction.replace(/\s*\(.*?\)\s*/g, '')

          }
          else {

            const callbackSplit = c.replace(/\s*\(.*?\)\s*/g, '').split('.')

            if(callbackSplit.length == 2) {

              potentialFunction = window[callbackSplit[0]][callbackSplit[1]]

              if (typeof potentialFunction === "function") {
                callback = potentialFunction
              } 
            }
          }
        }

        var initialOffset = 0

        if(elementTop < Smooth.windowHeight)
          initialOffset = (elementTop + height) / (Smooth.windowHeight + height) * (toValue - fromValue) + fromValue


        
        Smooth.scrollElements[i] = {
            element         : element,
            top             : elementTop,
            height          : height,
            bottom          : elementTop + element.clientHeight,
            isVisible       : elementTop < Smooth.currentPosition + Smooth.windowHeight && elementTop + height > Smooth.currentPosition,
            initialOffset   : initialOffset,
            callback        : callback,
            fromValue       : fromValue,
            toValue         : toValue,
            currentPosition : 0
        }

        element.dataset.plotSmoothScrollElementId = i

      })


    },

    setTopBarHeight : () => {

      if(Smooth.dom.topBar)
        Smooth.topBarHeight = Smooth.dom.topBar.clientHeight

    },

    setScrollFrameData : () => {

      Smooth.dom.scrollFrames = document.querySelectorAll('[data-plot-smooth-scroll-frame]')

      Smooth.scrollFrames = []
      var newHeight = 0

      Smooth.dom.scrollFrames.forEach( element => {

        const elementTop = Smooth.exactPositionOfElement(element)

        Smooth.scrollFrames.push({
            element           : element,
            top               : elementTop,
            height            : element.clientHeight,
            bottom            : elementTop + element.clientHeight,
            sticky            : typeof(element.dataset.plotSmoothScrollSticky) != 'undefined' ? true : false, 
            parentBottom      : element.parentElement ? Smooth.exactPositionOfElement(element.parentElement) + element.parentElement.getBoundingClientRect().height : false
        })

      })

      document.body.style.height = `${Smooth.dom.scrollWindow.scrollHeight}px`

    },

    trackVisibleElements : (entries) => {
       
        entries.forEach( entry => {

          if(entry.isIntersecting && entry) {
            entry.target.classList.add('plotSmoothScrollInView','plotSmoothScrollSeenOnce')
          }
          else {
            entry.target.classList.remove('plotSmoothScrollInView')
          }

          if(Smooth.scrollElements[entry.target.dataset.plotSmoothScrollElementId])
            Smooth.scrollElements[entry.target.dataset.plotSmoothScrollElementId].isVisible = entry.isIntersecting


        })
    },

    trackStandardScrollFrames : (entries) => {
       
        entries.forEach( entry => {

          if(entry.isIntersecting && entry) {
            entry.target.classList.add('plotSmoothScrollFrameInView','plotSmoothScrollFrameSeenOnce')
          }
          else {
            entry.target.classList.remove('plotSmoothScrollFrameInView')
          }

        })
    },

    refresh : () => {
      if(Smooth.standardScroll)
        return true
      
      Smooth.windowHeight = window.innerHeight
      Smooth.windowWidth = window.innerWidth
      Smooth.setScrollElementData()
      Smooth.setScrollFrameData()
      Smooth.setTopBarHeight()
      Smooth.scroll()
    },

    run : () => {

      Smooth.lastPosition = Smooth.lerp(Smooth.lastPosition, Smooth.currentPosition, Smooth.ease)

      if (Smooth.lastPosition < .1)
        Smooth.lastPosition = 0
     
      let diff = Smooth.currentPosition - Smooth.lastPosition

      if(Math.abs(diff) < 0.5) {
        Smooth.ticking = false
        diff = 0
      }

      var velocity = diff / Smooth.windowWidth

      Smooth.setPositionOfFrames()

      Smooth.fireOnScrollEvent(velocity)

      Smooth.positionScrollElements()

      if(Smooth.ticking == true)
        Smooth.mainScrollAnimationFrame = requestAnimationFrame(Smooth.run)
      

    },

    positionScrollElements : () => {

      Smooth.scrollElements.forEach(entry => {

          if(entry.isVisible == true && entry.callback) {

            const currentPosition = (entry.top - Smooth.lastPosition + entry.height) / (Smooth.windowHeight + entry.height) * (entry.toValue - entry.fromValue) + entry.fromValue - entry.initialOffset
            
            if(entry.currentPosition != currentPosition) {

              entry.currentPosition = currentPosition

              entry.callback(entry.element,currentPosition)

            }

          }
        

        })

    },

    fireOnScrollEvent : (velocity) => {

      if(typeof(Smooth.onScroll) == 'function')
              
        if(Smooth.onScrollCallbackThrottler === null) {

          Smooth.onScrollCallbackThrottler = setTimeout(function(){

            Smooth.onScroll(Smooth.dom.scrollFrames,velocity)
            Smooth.onScrollCallbackThrottler = null

          },50)

        }

    },

    setPositionOfFrames : () => {

      for(var scrollFrame of Smooth.scrollFrames) {

          var windowScrollPosition = Smooth.lastPosition

          if(scrollFrame.sticky && scrollFrame.parentBottom) {
            windowScrollPosition = Smooth.calcPositionOfStickyElement(scrollFrame, windowScrollPosition)
          }

          if(windowScrollPosition > scrollFrame.bottom || windowScrollPosition + Smooth.windowHeight < scrollFrame.top) {
            scrollFrame.element.classList.remove('plotSmoothScrollFrameInView')
            
          } else {
            scrollFrame.element.classList.add('plotSmoothScrollFrameInView','plotSmoothScrollFrameSeenOnce')
            scrollFrame.element.style.transform = `translate3d(0, -${windowScrollPosition}px, 0)`
          }

        }

    },

    scroll : () => {
      Smooth.currentPosition = window.scrollY
      if(Smooth.ticking == false) {
        Smooth.ticking = true
        Smooth.mainScrollAnimationFrame = requestAnimationFrame(Smooth.run) 
      }
    },

    setStyles : () => {

      Object.assign(Smooth.dom.scrollWindow.style,{
        position  : 'fixed',
        top       : 0,
        left      : 0,
        height    : '100%',
        width     : '100%',
        overflow  : 'hidden'
      })

    },

    calcPositionOfStickyElement : (entry, position) => {

      //If the item is below the bottom of it's parent
      if(position + Smooth.topBarHeight >= entry.parentBottom)
        return position
      

      if(entry.parentBottom - position - Smooth.topBarHeight <= entry.height) {
        return entry.top - entry.parentBottom + position + entry.height
      }

      if(position + Smooth.topBarHeight > entry.top) 
        return entry.top - Smooth.topBarHeight   


      return position

    },

    lerp: (a,b,n) =>  {

        return (1 - n) * a + n * b

    },

    exactPositionOfElement : (element) => {
      var el = element,
      offsetTop  = 0;

      do{
          offsetTop  += el.offsetTop;

          el = el.offsetParent;
      } while( el );

      return offsetTop

    }

  }

  module.exports = Smooth

}())
},{}],24:[function(require,module,exports){
(function () {

    var BodyScrollLock   = require('body-scroll-lock'),
        LazyLoad         = require('./lazyload'),
        SyncScroll       = require('./syncscroll'), 
        Plot

    Plot = {

        init: () => {

            Plot.createListeners()
            SyncScroll.init() 
            Plot.animateBannerNotifications() 

        },

        createListeners: () => {

           	const burgerMenuTriggers = document.querySelectorAll('.JS--menuTrigger')
            
            if(burgerMenuTriggers.length > 0) {
                for(var burgerMenuTrigger of burgerMenuTriggers) {
                    burgerMenuTrigger.addEventListener('click',Plot.toggleBurger)
                }
            }

            const sideSwipes = document.querySelectorAll('.plotSideSwipes')

            if(sideSwipes.length > 0) {
                Plot.sideSwipes(sideSwipes)
            }

        },

        animateBannerNotifications : () => {
            const banner = document.querySelector('.JS--bannerNotification')

            if(banner)
                if(banner.dataset.animationType == 'always') {
                    Plot.buildBannerRepeatingText(banner)
                    window.addEventListener('resize', function() {
                        Plot.buildBannerRepeatingText(banner)
                    })
                } else {
                    Plot.checkToSeeIfWeNeedToAnimationBanner(banner)
                    window.addEventListener('resize', function() {
                        Plot.checkToSeeIfWeNeedToAnimationBanner(banner)
                    })
                }
        },

        checkToSeeIfWeNeedToAnimationBanner : banner => {

            banner.innerHTML = `<div>${banner.dataset.message}</div>`
            const div1 = banner.querySelector('div:nth-of-type(1)')
            const windowWidth = window.innerWidth
            
            if(div1.scrollWidth > windowWidth) {
                banner.classList.add('withAnimation')
                Plot.buildBannerRepeatingText(banner)
            } else {
                 banner.classList.remove('withAnimation')
            }

        },

        buildBannerRepeatingText : banner => {

            banner.innerHTML = `<div>${banner.dataset.message}</div><div>${banner.dataset.message}</div>`
            const div1 = banner.querySelector('div:nth-of-type(1)')
            const div2 = banner.querySelector('div:nth-of-type(2)')
            const windowWidth = window.innerWidth

            div1.style.animationDuration=(windowWidth/20)+"s"
            div2.style.animationDuration=(windowWidth/20)+"s"

            var i  = 0

            while(div1.scrollWidth < windowWidth && i < 100) {
                div1.innerHTML = div1.innerHTML + ` ${banner.dataset.message}`
                div2.innerHTML = div2.innerHTML + ` ${banner.dataset.message}`
                i++;
            }

        },

        sideSwipes : (sideSwipes) => {

            for(var sideSwipe of sideSwipes) {

                 if(parseInt(sideSwipe.getBoundingClientRect().width) + 1 < parseInt(sideSwipe.scrollWidth)) {


                 }

            }

        },

        toggleBurger : () => {

            const burgerMenu = document.querySelector('.JS--burgerMenu')

            if(!document.documentElement.classList.contains('burgerOpen')) {
                document.documentElement.classList.add('burgerOpen')
                BodyScrollLock.disableBodyScroll(burgerMenu)
            } else {
                document.documentElement.classList.remove('burgerOpen')
                BodyScrollLock.enableBodyScroll(burgerMenu)
            }

        },

        isPage : slug => {

            return document.body.classList.contains('page-'+slug)

        },

        fixVh : () => {

            // First we get the viewport height and we multiple it by 1% to get a value for a vh unit
            let vh = window.innerHeight * 0.01
            document.documentElement.style.setProperty('--vh', `${vh}px`)


        },

        isTouchDevice: () => {

            var prefixes = ' -webkit- -moz- -o- -ms- '.split(' ')
            var mq = function (query) {
                return window.matchMedia(query).matches
            }

            if (('ontouchstart' in window) || window.DocumentTouch && document instanceof DocumentTouch) {
            	document.body.addClass('isTouchDevice')  
                return true
            }

            var query = ['(', prefixes.join('touch-enabled),('), 'plot', ')'].join('')
            return mq(query)
        },

        areWeAtTheTop : scrollTop => {

            if(scrollTop > 0) {
                document.body.classList.add('scrolled')
            } else {
                document.body.classList.remove('scrolled')
            }
        },

        loadTemplatePart : (args) => { 
            
            var defaults = {
                templatePart    : null,
                action          : 'plotLoadTemplatePart', //This is the action fired into our PlotSite PHP setup.php file
                data            : {},
                returnOrWrite   : 'write', //(write|return) either adds content to contentArea, or returns new HTML in the promise
                contentArea     : '.JS--ajaxTargetArea', 
                append          : false
            }

            let settings = Object.assign({}, defaults, args)
            

            try { 
                if(settings.returnOrWrite == 'write')
                    var contentArea = document.querySelector(settings.contentArea)
            }
            catch (e) {
                console.log('contentArea needs to be a valid selector!')
                return false
            }

            if(contentArea == null && settings.returnOrWrite == 'write') {
                console.log('Couldn\'t find selector for contentArea on page.')
                return false
            }

            if(settings.templatePart == null) {
                console.log('Couldn\'t find template part. Make sure you set one as templatePart, for example parts/ajax-content')
                return false
            }

            if(typeof(settings.append) !== "boolean") {
                console.log('Value passed to append was not a boolean.')
                return false
            }

            if(settings.returnOrWrite == 'write')
                contentArea.classList.add('plotLoading')

            settings.data = {
                data            : settings.data,
                action          : settings.action,
                templatePart    : settings.templatePart
            }

            var queryString = Plot.toQueryString(settings.data)
        
            return fetch(au, {

                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'
                },
                body: queryString,
                credentials: 'same-origin'

            }).then(data => {

                return data.json()

            }).then(result => {

                if(settings.returnOrWrite == 'write')
                    contentArea.classList.remove('plotLoading')
                
                if(result.success) {

                    if(settings.returnOrWrite !== 'write')
                        return result.html

                    if(settings.append) {
                        contentArea.insertAdjacentHTML('beforeend', result.html)
                    } else  {
                        contentArea.innerHTML = result.html
                    }

                    contentArea.querySelectorAll('.JS--lazyLoad').forEach(el => {
                        LazyLoad.observer.observe(el)
                    });

                    return result.html

                }

            }).catch(error =>{
                console.log('error',error)

            })



        },

        dateFormat : (date,format) => {

            if(format == 'dS M')
                return date.getDate() + Plot.getOrdinal(date.getDate()) + ' ' + Plot.getMonth(date)

            if(format == 'M dS')
                return Plot.getMonth(date) + ' ' + date.getDate() + Plot.getOrdinal(date.getDate()) 

            if(format == 'd/m/y')
                return date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear().toString().substr(-2)

            if(format == 'm/d/y')
                return (date.getMonth() + 1) + '/' + date.getDate() + '/' + date.getFullYear().toString().substr(-2)

            return Plot.getDayOfWeek(date)
         },

        getDayOfWeek : date => {

            const days = [
                'Sunday',
                'Monday',
                'Tuesday',
                'Wednesday',
                'Thursday',
                'Friday',
                'Saturday'
            ]

            return days[date.getDay()]

        },

        getOrdinal : number => {

              if (number > 3 && number < 21) return 'th';
              switch (number % 10) {
                case 1:  return "st";
                case 2:  return "nd";
                case 3:  return "rd";
                default: return "th";
              }

        },


        getMonth : date => {

            const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
              "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
            ];

            return monthNames[date.getMonth()]
        },

        toQueryString : (obj, prefix) => {
            var str = [], k, v;
            for(var p in obj) {
                if (!obj.hasOwnProperty(p)) {continue;} // skip things from the prototype
                if (~p.indexOf('[')) {
                    k = prefix ? prefix + "[" + p.substring(0, p.indexOf('[')) + "]" + p.substring(p.indexOf('[')) : p;
                } else {
                    k = prefix ? prefix + "[" + p + "]" : p;
                }
                v = obj[p];
                str.push(typeof v == "object" ?
                  Plot.toQueryString(v, k) :
                  encodeURIComponent(k) + "=" + encodeURIComponent(v));
            }
            return str.join("&");
        }


    }

    module.exports = Plot

}())

},{"./lazyload":21,"./syncscroll":25,"body-scroll-lock":1}],25:[function(require,module,exports){
(function () {

    var 
    Syncscroll

    Syncscroll = {

        init: () => {

            var Width           = 'Width',
            Height              = 'Height',
            Top                 = 'Top',
            Left                = 'Left',
            scroll              = 'scroll',
            client              = 'client',
            EventListener       = 'EventListener',
            addEventListener    = 'add' + EventListener,
            length              = 'length',
            Math_round          = Math.round,
            names               = {},
            reset = function() {

                var elems = document.getElementsByClassName('sync'+scroll)

                // clearing existing listeners
                var i, j, el, found, name
                for (name in names) {
                    if (names.hasOwnProperty(name)) {
                        for (i = 0; i < names[name][length]; i++) {
                            names[name][i]['remove'+EventListener](
                                scroll, names[name][i].syn, 0
                            )
                        }
                    }
                }

                // setting-up the new listeners
                for (i = 0; i < elems[length];) {
                    found = j = 0
                    el = elems[i++]
                    if (!(name = el.getAttribute('name'))) {
                        // name attribute is not set
                        continue
                    }

                    el = el[scroll+'er']||el  // needed for intence

                    // searching for existing entry in array of names;
                    // searching for the element in that entry
                    for (;j < (names[name] = names[name]||[])[length];) {
                        found |= names[name][j++] == el
                    }

                    if (!found) {
                        names[name].push(el)
                    }

                    el.eX = el.eY = 0;

                    (function(el, name) {
                        el[addEventListener](
                            scroll,
                            el.syn = function() {
                                var elems = names[name]

                                var scrollX = el[scroll+Left]
                                var scrollY = el[scroll+Top]

                                var xRate =
                                    scrollX /
                                    (el[scroll+Width] - el[client+Width])
                                var yRate =
                                    scrollY /
                                    (el[scroll+Height] - el[client+Height])

                                var updateX = scrollX != el.eX
                                var updateY = scrollY != el.eY

                                var otherEl, i = 0

                                el.eX = scrollX
                                el.eY = scrollY

                                for (;i < elems[length];) {
                                    otherEl = elems[i++]
                                    if (otherEl != el) {
                                        if (updateX &&
                                            Math_round(
                                                otherEl[scroll+Left] -
                                                (scrollX = otherEl.eX =
                                                 Math_round(xRate *
                                                     (otherEl[scroll+Width] -
                                                      otherEl[client+Width]))
                                                )
                                            )
                                        ) {
                                            otherEl[scroll+Left] = scrollX
                                        }
                                        
                                        if (updateY &&
                                            Math_round(
                                                otherEl[scroll+Top] -
                                                (scrollY = otherEl.eY =
                                                 Math_round(yRate *
                                                     (otherEl[scroll+Height] -
                                                      otherEl[client+Height]))
                                                )
                                            )
                                        ) {
                                            otherEl[scroll+Top] = scrollY
                                        }
                                    }
                                }
                            }, 0
                        )
                    })(el, name)
                }
            }
            
               
            if (document.readyState == "complete") {
                reset()
            } else {
                window[addEventListener]("load", reset, 0);
            }

        },

    }

    module.exports = Syncscroll

}())

},{}],26:[function(require,module,exports){
arguments[4][2][0].apply(exports,arguments)
},{"dup":2}],27:[function(require,module,exports){
arguments[4][3][0].apply(exports,arguments)
},{"dup":3}],28:[function(require,module,exports){
arguments[4][4][0].apply(exports,arguments)
},{"desandro-matches-selector":26,"dup":4}],29:[function(require,module,exports){
arguments[4][5][0].apply(exports,arguments)
},{"./flickity":33,"dup":5,"fizzy-ui-utils":28}],30:[function(require,module,exports){
arguments[4][6][0].apply(exports,arguments)
},{"dup":6,"fizzy-ui-utils":28}],31:[function(require,module,exports){
arguments[4][7][0].apply(exports,arguments)
},{"dup":7,"get-size":40}],32:[function(require,module,exports){
arguments[4][8][0].apply(exports,arguments)
},{"./flickity":33,"dup":8,"fizzy-ui-utils":28,"unidragger":41}],33:[function(require,module,exports){
arguments[4][9][0].apply(exports,arguments)
},{"./animate":30,"./cell":31,"./slide":39,"dup":9,"ev-emitter":27,"fizzy-ui-utils":28,"get-size":40}],34:[function(require,module,exports){
arguments[4][10][0].apply(exports,arguments)
},{"./add-remove-cell":29,"./drag":32,"./flickity":33,"./lazyload":35,"./page-dots":36,"./player":37,"./prev-next-button":38,"dup":10}],35:[function(require,module,exports){
arguments[4][11][0].apply(exports,arguments)
},{"./flickity":33,"dup":11,"fizzy-ui-utils":28}],36:[function(require,module,exports){
arguments[4][12][0].apply(exports,arguments)
},{"./flickity":33,"dup":12,"fizzy-ui-utils":28,"unipointer":42}],37:[function(require,module,exports){
arguments[4][13][0].apply(exports,arguments)
},{"./flickity":33,"dup":13,"ev-emitter":27,"fizzy-ui-utils":28}],38:[function(require,module,exports){
arguments[4][14][0].apply(exports,arguments)
},{"./flickity":33,"dup":14,"fizzy-ui-utils":28,"unipointer":42}],39:[function(require,module,exports){
arguments[4][15][0].apply(exports,arguments)
},{"dup":15}],40:[function(require,module,exports){
arguments[4][16][0].apply(exports,arguments)
},{"dup":16}],41:[function(require,module,exports){
/*!
 * Unidragger v2.3.0
 * Draggable base class
 * MIT license
 */

/*jshint browser: true, unused: true, undef: true, strict: true */

( function( window, factory ) {
  // universal module definition
  /*jshint strict: false */ /*globals define, module, require */

  if ( typeof define == 'function' && define.amd ) {
    // AMD
    define( [
      'unipointer/unipointer'
    ], function( Unipointer ) {
      return factory( window, Unipointer );
    });
  } else if ( typeof module == 'object' && module.exports ) {
    // CommonJS
    module.exports = factory(
      window,
      require('unipointer')
    );
  } else {
    // browser global
    window.Unidragger = factory(
      window,
      window.Unipointer
    );
  }

}( window, function factory( window, Unipointer ) {

'use strict';

// -------------------------- Unidragger -------------------------- //

function Unidragger() {}

// inherit Unipointer & EvEmitter
var proto = Unidragger.prototype = Object.create( Unipointer.prototype );

// ----- bind start ----- //

proto.bindHandles = function() {
  this._bindHandles( true );
};

proto.unbindHandles = function() {
  this._bindHandles( false );
};

/**
 * Add or remove start event
 * @param {Boolean} isAdd
 */
proto._bindHandles = function( isAdd ) {
  // munge isAdd, default to true
  isAdd = isAdd === undefined ? true : isAdd;
  // bind each handle
  var bindMethod = isAdd ? 'addEventListener' : 'removeEventListener';
  var touchAction = isAdd ? this._touchActionValue : '';
  for ( var i=0; i < this.handles.length; i++ ) {
    var handle = this.handles[i];
    this._bindStartEvent( handle, isAdd );
    handle[ bindMethod ]( 'click', this );
    // touch-action: none to override browser touch gestures. metafizzy/flickity#540
    if ( window.PointerEvent ) {
      handle.style.touchAction = touchAction;
    }
  }
};

// prototype so it can be overwriteable by Flickity
proto._touchActionValue = 'none';

// ----- start event ----- //

/**
 * pointer start
 * @param {Event} event
 * @param {Event or Touch} pointer
 */
proto.pointerDown = function( event, pointer ) {
  var isOkay = this.okayPointerDown( event );
  if ( !isOkay ) {
    return;
  }
  // track start event position
  this.pointerDownPointer = pointer;

  event.preventDefault();
  this.pointerDownBlur();
  // bind move and end events
  this._bindPostStartEvents( event );
  this.emitEvent( 'pointerDown', [ event, pointer ] );
};

// nodes that have text fields
var cursorNodes = {
  TEXTAREA: true,
  INPUT: true,
  SELECT: true,
  OPTION: true,
};

// input types that do not have text fields
var clickTypes = {
  radio: true,
  checkbox: true,
  button: true,
  submit: true,
  image: true,
  file: true,
};

// dismiss inputs with text fields. flickity#403, flickity#404
proto.okayPointerDown = function( event ) {
  var isCursorNode = cursorNodes[ event.target.nodeName ];
  var isClickType = clickTypes[ event.target.type ];
  var isOkay = !isCursorNode || isClickType;
  if ( !isOkay ) {
    this._pointerReset();
  }
  return isOkay;
};

// kludge to blur previously focused input
proto.pointerDownBlur = function() {
  var focused = document.activeElement;
  // do not blur body for IE10, metafizzy/flickity#117
  var canBlur = focused && focused.blur && focused != document.body;
  if ( canBlur ) {
    focused.blur();
  }
};

// ----- move event ----- //

/**
 * drag move
 * @param {Event} event
 * @param {Event or Touch} pointer
 */
proto.pointerMove = function( event, pointer ) {
  var moveVector = this._dragPointerMove( event, pointer );
  this.emitEvent( 'pointerMove', [ event, pointer, moveVector ] );
  this._dragMove( event, pointer, moveVector );
};

// base pointer move logic
proto._dragPointerMove = function( event, pointer ) {
  var moveVector = {
    x: pointer.pageX - this.pointerDownPointer.pageX,
    y: pointer.pageY - this.pointerDownPointer.pageY
  };
  // start drag if pointer has moved far enough to start drag
  if ( !this.isDragging && this.hasDragStarted( moveVector ) ) {
    this._dragStart( event, pointer );
  }
  return moveVector;
};

// condition if pointer has moved far enough to start drag
proto.hasDragStarted = function( moveVector ) {
  return Math.abs( moveVector.x ) > 3 || Math.abs( moveVector.y ) > 3;
};

// ----- end event ----- //

/**
 * pointer up
 * @param {Event} event
 * @param {Event or Touch} pointer
 */
proto.pointerUp = function( event, pointer ) {
  this.emitEvent( 'pointerUp', [ event, pointer ] );
  this._dragPointerUp( event, pointer );
};

proto._dragPointerUp = function( event, pointer ) {
  if ( this.isDragging ) {
    this._dragEnd( event, pointer );
  } else {
    // pointer didn't move enough for drag to start
    this._staticClick( event, pointer );
  }
};

// -------------------------- drag -------------------------- //

// dragStart
proto._dragStart = function( event, pointer ) {
  this.isDragging = true;
  // prevent clicks
  this.isPreventingClicks = true;
  this.dragStart( event, pointer );
};

proto.dragStart = function( event, pointer ) {
  this.emitEvent( 'dragStart', [ event, pointer ] );
};

// dragMove
proto._dragMove = function( event, pointer, moveVector ) {
  // do not drag if not dragging yet
  if ( !this.isDragging ) {
    return;
  }

  this.dragMove( event, pointer, moveVector );
};

proto.dragMove = function( event, pointer, moveVector ) {
  event.preventDefault();
  this.emitEvent( 'dragMove', [ event, pointer, moveVector ] );
};

// dragEnd
proto._dragEnd = function( event, pointer ) {
  // set flags
  this.isDragging = false;
  // re-enable clicking async
  setTimeout( function() {
    delete this.isPreventingClicks;
  }.bind( this ) );

  this.dragEnd( event, pointer );
};

proto.dragEnd = function( event, pointer ) {
  this.emitEvent( 'dragEnd', [ event, pointer ] );
};

// ----- onclick ----- //

// handle all clicks and prevent clicks when dragging
proto.onclick = function( event ) {
  if ( this.isPreventingClicks ) {
    event.preventDefault();
  }
};

// ----- staticClick ----- //

// triggered after pointer down & up with no/tiny movement
proto._staticClick = function( event, pointer ) {
  // ignore emulated mouse up clicks
  if ( this.isIgnoringMouseUp && event.type == 'mouseup' ) {
    return;
  }

  this.staticClick( event, pointer );

  // set flag for emulated clicks 300ms after touchend
  if ( event.type != 'mouseup' ) {
    this.isIgnoringMouseUp = true;
    // reset flag after 300ms
    setTimeout( function() {
      delete this.isIgnoringMouseUp;
    }.bind( this ), 400 );
  }
};

proto.staticClick = function( event, pointer ) {
  this.emitEvent( 'staticClick', [ event, pointer ] );
};

// ----- utils ----- //

Unidragger.getPointerPoint = Unipointer.getPointerPoint;

// -----  ----- //

return Unidragger;

}));

},{"unipointer":42}],42:[function(require,module,exports){
arguments[4][18][0].apply(exports,arguments)
},{"dup":18,"ev-emitter":27}],43:[function(require,module,exports){
(function () {

    var RollerText

    RollerText = {
        phrases: [
            'multi-day',
            'weekend',
            'boutique',
            'country',
            'holiday',
            'rock',
            'city',
            'dance',
            'post-punk',
            'family',
            'metal',
            'jazz',
            'weird',
            'special',
            'classical',
            'winter'
        ],
        dom: {
            textWrap: document.querySelector('.rollerText'),
            current: document.querySelector('[data-text-current]'),
            next: document.querySelector('[data-text-next]'),
        },
        intervalLength          : 1500,
        nextPhrase          : 'winter',
        counter                 : null,
        ticker                  : false,

        init: () => {
            
             
            if(RollerText.dom.textWrap)
                RollerText.startcounter()
            
        },

        startcounter: () => {
            
            RollerText.setWidth(RollerText.dom.current)

            let i = 1
            RollerText.counter = setInterval(() => {       

                const currentPhrase = RollerText.phrases[i]
                const nextPhrase = RollerText.phrases[i + 1] ? RollerText.phrases[i + 1] : RollerText.phrases[0]

                RollerText.dom.textWrap.classList.add('turn')

                RollerText.setWidth(RollerText.dom.next)

                setTimeout(() => {

                    RollerText.dom.textWrap.classList.remove('turn')

                    // Update mobile screen image
                    RollerText.dom.current.textContent = currentPhrase
                    RollerText.dom.next.textContent = nextPhrase

                }, 1000)


                // If we reach the end of the themes, reset to first theme
                i >= RollerText.phrases.length - 1 ? i = 0 : i++

            }, RollerText.intervalLength);
        },

        setWidth: (element) => {
            let textWidth = element.getBoundingClientRect().width
            
            RollerText.dom.textWrap.style.width = `${textWidth}px`
        }

    }

    module.exports = RollerText

}())

},{}],44:[function(require,module,exports){
(function () {

    var Testimonials,
        Flickity = require('flickity')

    Testimonials = {
        dom: {
            container : document.querySelector('.JS--testimonials'),
        },

        init: () => {
            
            if(Testimonials.dom.container && Testimonials.dom.container.children.length > 1)
                Testimonials.createCarousel()
                
            
        },

        createCarousel: () => {

            const settings = {
                cellAlign    : 'center',            
                wrapAround   : true,
                autoPlay     : false,
                imagesLoaded : true,
                pageDots     : false
            }

            new Flickity(Testimonials.dom.container, settings)

        }


    }

    module.exports = Testimonials

}())

},{"flickity":34}],45:[function(require,module,exports){
(function (){

    'use strict'

	var Plot    		= require('../../../plot-core/src/js/plot'),  
		LazyLoad   	 	= require('../../../plot-core/src/js/lazyload'),
		Modals			= require('../../../plot-core/src/js/modals'),
		Carousels		= require('../../../plot-core/src/js/carousels'),
		Smooth 			= require('../../../plot-core/src/js/plot-smooth-scroll'),
		FAQs 			= require('../../../plot-core/src/js/faqs'),
		Home			= require('./pages/home'),
		RollerText      = require('./components/roller-text'),
		Pricing         = require('./pages/pricing'),
		Artists			= require('./pages/artists'),
		Testimonials	= require('./components/testimonials'),
		Schedule		= require('./pages/schedule'),
		News 			= require('./pages/news'),
	    Main

	Main = {

		init: () => {	

			Main.initalizeSmooth()

			Plot.init() 
			LazyLoad.init()
			Modals.init()  
			Carousels.init()
			FAQs.init()
			RollerText.init()
			Main.fireConversionSnippetsIfOnThankYouPage()

			//Pages
        	if(Plot.isPage('home'))
				Home.init()

        	if(Plot.isPage('schedule'))
				Schedule.init()

        	if(Plot.isPage('artists'))
				Artists.init()

			if(Plot.isPage('pricing'))
				Pricing.init()

			News.init()
			
			Main.demoAjaxButton() 

		    if (typeof(window.HubSpotConversations) != 'undefined') {
			    Main.hubspot();
		  	} else {
		    	window.hsConversationsOnReady = [Main.hubspot];
		  	}

			if(document.querySelector('.JS--testimonials'))
				Testimonials.init()

		},
		
		initalizeSmooth : () => {

        	const hasSmoothScroll = document.body.dataset.plotCustomizerSmoothScroll

        	const smoothSettings = {
				standardScroll  : hasSmoothScroll != 'yes'
			}

        	Smooth.init(smoothSettings)

        },

        fireConversionSnippetsIfOnThankYouPage : () => {

        	const urlParams = new URLSearchParams(window.location.search);
			const trackingCode = urlParams.get('code');


        	if(gtag && trackingCode) {
        		console.log('ping',trackingCode)
    		 	gtag('event', 'conversion', {'send_to': 'AW-619032347/' + trackingCode})
    		 }

        },

        formIsSubmitted : () => {

        	var errVal = document.querySelectorAll('.input-error').length
		    if (errVal === 0) { 
		      	gtag('event', 'conversion', {'send_to': 'AW-619032347/y-G1CMOputkBEJvelqcC'});
		    }  else {
		    }

        },

        checkPopUpFormExists : () => {

        	const form = document.querySelector('#hsPopUpForm-73ee3ecf-7f8a-42c6-9dcc-725c7c8661a2')

        	if(!form) {
        		setTimeout(function(){
        			Main.checkPopUpFormExists()

        		},500)
        	} else {
	          form.onsubmit = function () {

	          	console.log('converted')
	          	Main.formIsSubmitted()
	          	var img = document.createElement("img")
				img.src = "https://px.ads.linkedin.com/collect/?pid=2354756&conversionId=2706796&fmt=gif";
				
				document.body.appendChild(img)
	          }
        	}

        },

        hubspot : () => {

        	Main.checkPopUpFormExists()

    		window.HubSpotConversations.on('conversationStarted', payload => {

    		 if(gtag) {
    		 	gtag('event', 'conversion', {
				      'send_to': 'AW-619032347/Y9ujCPyD1dkBEJvelqcC'
				  })
    		 }

          	var img = document.createElement("img")
			img.src = "https://px.ads.linkedin.com/collect/?pid=2354756&conversionId=2722716&fmt=gif";
			
			document.body.appendChild(img)
			 

			})

        },

        demoAjaxButton : () => {

			var plotDemoLoadContent =  document.querySelector('.JS--plotLoadTemplatePartDemo');
			

			if(plotDemoLoadContent)

				plotDemoLoadContent.addEventListener('click', e => {

					// Take a look at what you can pass to this function
					// var args = {
				    //              templatePart    : null,
				    //              action          : 'plotLoadTemplatePart', //This is the action fired into our PlotSite PHP setup.php file
				    //              data            : {}, //Any data we'd like to pass to the template part. 
				    //              contentArea     : '.JS--ajaxTargetArea', //Where the new content gets inserts
				    //              append          : false //If we want to append to the above area, or replace the content
				    //          }

					const args = {

						templatePart : 'demos/ajax-content', 
						data : {
							'foo' 		: 'bar',
							'bangers'	: 'mash',
							'having'	: 'it'
						}
					}


					Plot.loadTemplatePart(args)

				})

        }

	}

	window.Main = Main

}());
 
},{"../../../plot-core/src/js/carousels":19,"../../../plot-core/src/js/faqs":20,"../../../plot-core/src/js/lazyload":21,"../../../plot-core/src/js/modals":22,"../../../plot-core/src/js/plot":24,"../../../plot-core/src/js/plot-smooth-scroll":23,"./components/roller-text":43,"./components/testimonials":44,"./pages/artists":46,"./pages/home":47,"./pages/news":48,"./pages/pricing":49,"./pages/schedule":50}],46:[function(require,module,exports){
(function () {

    var Plot 			= require('../../../../plot-core/src/js/plot'),
        Modals          = require('../../../../plot-core/src/js/modals'),
    	Artists

    //May this object act as a guide to using Plot core functions
    //and how to set up ajax dynamic data with our new principles with ease
    Artists = {

    	maxPages 			: 1,
    	currentPage 		: 1,
    	currentArtistType	: false,
    	loadMoreButton  	: document.querySelector('.JS--artistsLoadMore'),

        init: () => {

        	Artists.showOrHideLoadMoreButton()

            Artists.createListeners()

        },

        createListeners: () => {

        	Artists.loadMoreButton.addEventListener('click', e => {

        		const nextPage = parseInt(Artists.loadMoreButton.dataset.nextPage)

        		Artists.currentPage = nextPage

        		Artists.loadArtists(true)

        		Artists.loadMoreButton.dataset.nextPage = nextPage + 1

        	})

        	document.addEventListener('click', e => {

                //Have we clicked on an artist type filter button?
				if (e.target.closest('.JS--artistTypeButton')) {
					Artists.currentArtistType = e.target.dataset.artistTypeId
					Artists.currentPage = 1
                    Artists.loadMoreButton.dataset.nextPage = 2
					Artists.loadArtists(false).then(() => {

                        document.querySelectorAll('.JS--artistTypeButton').forEach(artistTypeButton => {

                            artistTypeButton.classList.remove('selected')

                        })

                        e.target.classList.add('selected')
                        
                    })
				} 

			}, false)


        },

        loadArtists : append => {

        	const args = {
				templatePart : 'parts/artist-listing', 
				data : {
					'page' 			: Artists.currentPage,
					'artistType'	: Artists.currentArtistType
				},
				append : append 
			}

			return Plot.loadTemplatePart(args).then(html => {

				Artists.showOrHideLoadMoreButton()

                return true

			})

        },

        showOrHideLoadMoreButton : () => {

        	//Check if max pages is 1. If it is, there's only 1 page of artists
        	//so we can hide load more button
        	Artists.maxPages = document.querySelector('.JS--maxPages').dataset.maxPages

        	if(Artists.maxPages > Artists.currentPage)
        		Artists.loadMoreButton.classList.remove('hidden')
        	else 
        		Artists.loadMoreButton.classList.add('hidden')

        }

    }

    module.exports = Artists

}())
},{"../../../../plot-core/src/js/modals":22,"../../../../plot-core/src/js/plot":24}],47:[function(require,module,exports){
(function () {

    var Home

    Home = {
        dom : {
            body                    : document.body,
            root                    : document.querySelector('html'),
            phone                   : document.querySelector('.mobile3D__phone'),
            homeBanner              : document.querySelector('.homeBanner'),
            header                  : document.querySelector('#siteMainHeader'),
        },
        previousTheme           : 'home',
        counter                 : null,
        ticker                  : false,
        currentMousePosition    : {
            X: window.innerWidth / 2,
            Y: window.innerHeight / 2
        },
        previousMousePosition   : {
            X: window.innerWidth / 2,
            Y: window.innerHeight / 2
        },
        mouseMoveAnimationFrame : null,
        currentSlide : 0,
        themes: [
            'brockwell',
            'mightyhoopla',
            'africaoye',
            'southfacing',
        ],

        init: () => {

            Home.createListeners()

            Home.startThemeCounter()

            Home.setWidthOfPhone()

        },

        createListeners: () => {
            
            const homeBanner = document.querySelector('.homeBanner')
            
            // Observe the homebanner section for class changes
            const observer = new MutationObserver(Home.bannerMutation)
            observer.observe(homeBanner, {
              attributes  : true,
            })
            
            const burgerMenuTriggers = document.querySelector('.JS--menuTrigger')

            // Toggle banner animation when menu opened/closed
            burgerMenuTriggers.addEventListener('click', Home.toggleThemeCounter)

            window.addEventListener('resize',Home.setWidthOfPhone)
            

            if(window.innerWidth < 640) {

                Home.dom.body.classList.add('smallScreen');
                
            } else {

                Home.mouseMoveAnimationFrame = requestAnimationFrame(Home.runMouseMove)

                Home.dom.homeBanner.addEventListener('mousemove', (e) => Home.trackCursorPosition(e)) 
            }
                
        },

        setWidthOfPhone : () => {

            Home.dom.phone.style.width = Home.dom.phone.getBoundingClientRect().height * .55 + 'px'

            Home.dom.phone.style.opacity = 1

        },

        bannerMutation: (mutationsList, observer) => {
            
            // If the banner element is in view
            if(mutationsList[0].target.classList.contains('plotSmoothScrollFrameInView') && !Home.bannerInView) {
                            
                Home.bannerInView = true

                Home.startThemeCounter()

            } 

            if(!mutationsList[0].target.classList.contains('plotSmoothScrollFrameInView') && Home.bannerInView) {

                Home.bannerInView = false

                Home.stopThemeCounter()
            }
        },

        trackCursorPosition: (e) => {
    
            Home.currentMousePosition = {
                X: e.clientX,
                Y: e.clientY
            }

            const middlePointX = window.innerWidth / 2
            const middlePointY = window.innerHeight / 2

            if(Home.currentMousePosition.X  - 2000 > middlePointX)
                Home.currentMousePosition.X = middlePointX + 2000
            
            if(Home.currentMousePosition.X  + 2000 < middlePointX)
                Home.currentMousePosition.X = middlePointX - 2000

            if(Home.currentMousePosition.Y  - 2000 > middlePointY)
                Home.currentMousePosition.Y = middlePointY + 2000
            
            if(Home.currentMousePosition.Y  + 2000 < middlePointY)
                Home.currentMousePosition.Y = middlePointY - 2000

            if(Home.ticker == false) {
                Home.ticker = true
                Home.mouseMoveAnimationFrame = requestAnimationFrame(Home.runMouseMove)
            }

        },

        startThemeCounter: () => {
            
            Home.bannerInView = true;

            // Set header to default style
            if(Home.dom.header.classList.contains('defaultHeader'))
                Home.dom.header.classList.remove('defaultHeader') 

            Home.timer(4000)

        },

        timer : time => {

            Home.counter = setTimeout(() => {
                
                // Update mobile screen image
                Home.dom.body.dataset.currentTheme = Home.themes[Home.currentSlide]
                Home.dom.body.dataset.previousTheme = Home.previousTheme

                // Update state
                Home.previousTheme = Home.themes[Home.currentSlide]

                Home.dom.body.classList.add('slideMobileScreen')

                setTimeout(() => {
                    Home.dom.body.classList.remove('slideMobileScreen')    
                }, 2000)

                // If we reach the end of the themes, reset to first theme
                Home.currentSlide >= Home.themes.length - 1 ? Home.currentSlide = 0 : Home.currentSlide++

                Home.timer(4000)

            }, time)

        },

        stopThemeCounter: () => {

            if(Home.counter)
                clearInterval(Home.counter)

        },

        removeTheme: () => {
            
            if(Home.previousTheme)
                Home.dom.body.classList.remove(Home.previousTheme)

            // Set header to default style
            Home.dom.header.classList.add('defaultHeader') 
            
        },

        toggleThemeCounter: () => {
            // Cancel animation if menu is open
            if(Home.dom.root.classList.contains('burgerOpen')) {

                Home.stopThemeCounter()
                Home.removeTheme()

            // Start animation if menu is closed and banner is in view    
            } else if(Home.bannerInView) {

                Home.startThemeCounter()
            }
        },

        runMouseMove : () => {

            const differenceOfPositions = {
                Y: Home.currentMousePosition.Y - Home.previousMousePosition.Y,
                X: Home.currentMousePosition.X - Home.previousMousePosition.X
            } 
            
            Home.previousMousePosition = {
                X: Home.previousMousePosition.X + (differenceOfPositions.X * 0.1),
                Y: Home.previousMousePosition.Y + (differenceOfPositions.Y * 0.1)
            }

            const xShift = (Home.previousMousePosition.X - (window.innerWidth / 2)) / (window.innerWidth / 2 )
            const yShift = ((window.innerHeight / 2) - Home.previousMousePosition.Y) / (window.innerHeight / 2 )
            
            Home.dom.phone.style.transform = `rotateX(${15 + yShift*7}deg) rotateY(${xShift*60 > 50 ? 50 : xShift*60}deg)`

            const multiplier = 10

            if(Math.abs(differenceOfPositions.X + differenceOfPositions.Y) < .1)
                Home.ticker = false

            if(Home.ticker == true) 
                Home.mouseMoveAnimationFrame = requestAnimationFrame(Home.runMouseMove)

        },


    }

    module.exports = Home

}())
},{}],48:[function(require,module,exports){
(function () {

    var Plot 			= require('../../../../plot-core/src/js/plot'),
    	News

    //May this object act as a guide to using Plot core functions
    //and how to set up ajax dynamic data with our new principles with ease
    News = {

    	maxPages 			: 1,
        currentNewsCategory : 0,
        currentPage         : 1,
    	loadMoreButton  	: document.querySelector('.JS--newsLoadMore'),

        init: () => {

            if(News.loadMoreButton) {

            	News.showOrHideLoadMoreButton()

                News.createListeners()

            }

        },

        createListeners: () => {

        	News.loadMoreButton.addEventListener('click', e => {

        		const nextPage = parseInt(News.loadMoreButton.dataset.nextPage)

        		News.currentPage = nextPage

        		News.loadNews(true)

        		News.loadMoreButton.dataset.nextPage = nextPage + 1

        	})

        },

        loadNews : append => {

        	const args = {
				templatePart : 'parts/news-listing', 
				data : {
					'page' 			: News.currentPage,
					'artistType'	: News.currentNewsCategory
				},
				append : append 
			}

			return Plot.loadTemplatePart(args).then(html => {

				News.showOrHideLoadMoreButton()

                return true

			})

        },

        showOrHideLoadMoreButton : () => {

        	//Check if max pages is 1. If it is, there's only 1 page of News
        	//so we can hide load more button
        	News.maxPages = document.querySelector('.JS--maxPages').dataset.maxPages

            console.log(News.maxPages)

        	if(News.maxPages > News.currentPage)
        		News.loadMoreButton.classList.remove('hidden')
        	else 
        		News.loadMoreButton.classList.add('hidden')

        }

    }

    module.exports = News

}())
},{"../../../../plot-core/src/js/plot":24}],49:[function(require,module,exports){
(function () {

    var Pricing

    Pricing = {
        dom: {
            container        : document.querySelector('.JS--TogglePrice'),
            annualButton     : document.querySelector('.JS--planToggle--annual'),
            monthlyButton    : document.querySelector('.JS--planToggle--monthly'),
            currencySymbols  : Array.from(document.querySelectorAll('.JS--currency')),
            priceAnnual      : document.querySelector('.JS--price--annual'),
            priceMonthly     : document.querySelector('.JS--price--monthly'),
            annualTotalPrice : document.querySelector('.JS--annualTotal')
        },

        init: () => {

            // Update price if user is based in the US
            Pricing.checkUsersCountry()

            // Update data set with 
            Pricing.dom.annualButton.addEventListener('click', Pricing.showAnnual)

            Pricing.dom.monthlyButton.addEventListener('click', Pricing.showMonthly)
            
        },

        showAnnual: () => {
            
            if(Pricing.dom.container.dataset.plan = "annual") 
                return;

            Pricing.dom.container.dataset.plan = "annaul"
        },

        showMonthly: () => {
            if(Pricing.dom.container.dataset.plan = "monthly") 
                return;

            Pricing.dom.container.dataset.plan = "monthly"
        },

        checkUsersCountry: () => {
            
            fetch('https://api.ipregistry.co/?key=bp1l88lcp678q96z')
                .then(res => res.json())
                .then(payload => {
                    
                    if(payload.location.country.code == 'US') {

                        // Switch to dollar
                        Pricing.dom.currencySymbols.map(symbol => symbol.textContent = '$')

                        Pricing.dom.priceMonthly.textContent = '400'

                        Pricing.dom.priceAnnual.textContent = '333'

                        Pricing.dom.annualTotalPrice.textContent = '$4000'
                    }

                })
                .catch(err => console.log(err))

        }


    }

    module.exports = Pricing

}())

},{}],50:[function(require,module,exports){
(function () {

    var Schedule

    Schedule = {
      dayButtons       : document.querySelectorAll('.JS--scheduleDayPickerButton'),
      calendars        : document.querySelectorAll('.scheduleCalendarWrap'),

        init: () => {

          Schedule.createListeners()
          Schedule.checkToSeeIfNavArrowsNeeded()

        },

        createListeners: () => {

          for(var dayButton of Schedule.dayButtons) {

            dayButton.addEventListener('click',function() {

              Schedule.loadNewDate(this) 
              
            })

          }

          window.addEventListener('resize',() => {

            Schedule.checkToSeeIfNavArrowsNeeded()

          })

          for(var calendar of Schedule.calendars) {

            const rightButton      = calendar.querySelector('.JS--scheduleRight'),
            leftButton             = calendar.querySelector('.JS--scheduleLeft'),
            tracks                 = calendar.querySelector('.scheduleCalendarTracks'),
            tracksW                = tracks.offsetWidth

            rightButton.addEventListener('click', () => {
              tracks.scrollBy({
                left: tracksW / 2,
                behavior: 'smooth'
              })
            })

            leftButton.addEventListener('click', () => {
              tracks.scrollBy({
                left: -tracksW / 2,
                behavior: 'smooth'
              });
            });

          }

        },

        loadNewDate : elem => {

          for(var dB of Schedule.dayButtons) {
            dB.classList.remove('selected')
          }

          elem.classList.add('selected')

          let day = elem.dataset.scheduleDay 

          for(var calendar of Schedule.calendars) {

            if(calendar.dataset.scheduleDay == day)
              calendar.classList.remove('hidden')
            else 
              calendar.classList.add('hidden')
          }

          Schedule.checkToSeeIfNavArrowsNeeded()

        },

        checkToSeeIfNavArrowsNeeded : () => { 

          for(var calendar of Schedule.calendars) {

            if(!calendar.classList.contains('hidden')) {

               const tracks = calendar.querySelector('.scheduleCalendarTracks')

               if(tracks.scrollWidth > calendar.scrollWidth) {
                  calendar.querySelector('.JS--scheduleLeft').classList.remove('hidden')
                  calendar.querySelector('.JS--scheduleRight').classList.remove('hidden')
               } else {
                  calendar.querySelector('.JS--scheduleLeft').classList.add('hidden')
                  calendar.querySelector('.JS--scheduleRight').classList.add('hidden')
               }

            }

          }

        }

    }

    module.exports = Schedule

}())


},{}]},{},[45])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIuLi9wbG90LWNvcmUvbm9kZV9tb2R1bGVzL2JvZHktc2Nyb2xsLWxvY2svbGliL2JvZHlTY3JvbGxMb2NrLm1pbi5qcyIsIi4uL3Bsb3QtY29yZS9ub2RlX21vZHVsZXMvZGVzYW5kcm8tbWF0Y2hlcy1zZWxlY3Rvci9tYXRjaGVzLXNlbGVjdG9yLmpzIiwiLi4vcGxvdC1jb3JlL25vZGVfbW9kdWxlcy9ldi1lbWl0dGVyL2V2LWVtaXR0ZXIuanMiLCIuLi9wbG90LWNvcmUvbm9kZV9tb2R1bGVzL2Zpenp5LXVpLXV0aWxzL3V0aWxzLmpzIiwiLi4vcGxvdC1jb3JlL25vZGVfbW9kdWxlcy9mbGlja2l0eS9qcy9hZGQtcmVtb3ZlLWNlbGwuanMiLCIuLi9wbG90LWNvcmUvbm9kZV9tb2R1bGVzL2ZsaWNraXR5L2pzL2FuaW1hdGUuanMiLCIuLi9wbG90LWNvcmUvbm9kZV9tb2R1bGVzL2ZsaWNraXR5L2pzL2NlbGwuanMiLCIuLi9wbG90LWNvcmUvbm9kZV9tb2R1bGVzL2ZsaWNraXR5L2pzL2RyYWcuanMiLCIuLi9wbG90LWNvcmUvbm9kZV9tb2R1bGVzL2ZsaWNraXR5L2pzL2ZsaWNraXR5LmpzIiwiLi4vcGxvdC1jb3JlL25vZGVfbW9kdWxlcy9mbGlja2l0eS9qcy9pbmRleC5qcyIsIi4uL3Bsb3QtY29yZS9ub2RlX21vZHVsZXMvZmxpY2tpdHkvanMvbGF6eWxvYWQuanMiLCIuLi9wbG90LWNvcmUvbm9kZV9tb2R1bGVzL2ZsaWNraXR5L2pzL3BhZ2UtZG90cy5qcyIsIi4uL3Bsb3QtY29yZS9ub2RlX21vZHVsZXMvZmxpY2tpdHkvanMvcGxheWVyLmpzIiwiLi4vcGxvdC1jb3JlL25vZGVfbW9kdWxlcy9mbGlja2l0eS9qcy9wcmV2LW5leHQtYnV0dG9uLmpzIiwiLi4vcGxvdC1jb3JlL25vZGVfbW9kdWxlcy9mbGlja2l0eS9qcy9zbGlkZS5qcyIsIi4uL3Bsb3QtY29yZS9ub2RlX21vZHVsZXMvZ2V0LXNpemUvZ2V0LXNpemUuanMiLCIuLi9wbG90LWNvcmUvbm9kZV9tb2R1bGVzL3VuaWRyYWdnZXIvdW5pZHJhZ2dlci5qcyIsIi4uL3Bsb3QtY29yZS9ub2RlX21vZHVsZXMvdW5pcG9pbnRlci91bmlwb2ludGVyLmpzIiwiLi4vcGxvdC1jb3JlL3NyYy9qcy9jYXJvdXNlbHMuanMiLCIuLi9wbG90LWNvcmUvc3JjL2pzL2ZhcXMuanMiLCIuLi9wbG90LWNvcmUvc3JjL2pzL2xhenlsb2FkLmpzIiwiLi4vcGxvdC1jb3JlL3NyYy9qcy9tb2RhbHMuanMiLCIuLi9wbG90LWNvcmUvc3JjL2pzL3Bsb3Qtc21vb3RoLXNjcm9sbC5qcyIsIi4uL3Bsb3QtY29yZS9zcmMvanMvcGxvdC5qcyIsIi4uL3Bsb3QtY29yZS9zcmMvanMvc3luY3Njcm9sbC5qcyIsIm5vZGVfbW9kdWxlcy91bmlkcmFnZ2VyL3VuaWRyYWdnZXIuanMiLCJzcmMvanMvY29tcG9uZW50cy9yb2xsZXItdGV4dC5qcyIsInNyYy9qcy9jb21wb25lbnRzL3Rlc3RpbW9uaWFscy5qcyIsInNyYy9qcy9tYWluLmpzIiwic3JjL2pzL3BhZ2VzL2FydGlzdHMuanMiLCJzcmMvanMvcGFnZXMvaG9tZS5qcyIsInNyYy9qcy9wYWdlcy9uZXdzLmpzIiwic3JjL2pzL3BhZ2VzL3ByaWNpbmcuanMiLCJzcmMvanMvcGFnZXMvc2NoZWR1bGUuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBOztBQ0RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNyREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNoSEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNqUEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2pLQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN6TUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdEdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3pZQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDajZCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMxQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3RJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDNUxBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMvTEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNuTkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMvTUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMzUkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM3U0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdERBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMvQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3JNQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3ZWQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM1aEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3ZVQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ3JJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7OztBQ3ZSQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbkZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN0Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNyTEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNwR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3RPQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2xGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdkVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24oKXtmdW5jdGlvbiByKGUsbix0KXtmdW5jdGlvbiBvKGksZil7aWYoIW5baV0pe2lmKCFlW2ldKXt2YXIgYz1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlO2lmKCFmJiZjKXJldHVybiBjKGksITApO2lmKHUpcmV0dXJuIHUoaSwhMCk7dmFyIGE9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitpK1wiJ1wiKTt0aHJvdyBhLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsYX12YXIgcD1uW2ldPXtleHBvcnRzOnt9fTtlW2ldWzBdLmNhbGwocC5leHBvcnRzLGZ1bmN0aW9uKHIpe3ZhciBuPWVbaV1bMV1bcl07cmV0dXJuIG8obnx8cil9LHAscC5leHBvcnRzLHIsZSxuLHQpfXJldHVybiBuW2ldLmV4cG9ydHN9Zm9yKHZhciB1PVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmUsaT0wO2k8dC5sZW5ndGg7aSsrKW8odFtpXSk7cmV0dXJuIG99cmV0dXJuIHJ9KSgpIiwiIWZ1bmN0aW9uKGUsdCl7aWYoXCJmdW5jdGlvblwiPT10eXBlb2YgZGVmaW5lJiZkZWZpbmUuYW1kKWRlZmluZShbXCJleHBvcnRzXCJdLHQpO2Vsc2UgaWYoXCJ1bmRlZmluZWRcIiE9dHlwZW9mIGV4cG9ydHMpdChleHBvcnRzKTtlbHNle3ZhciBvPXt9O3QobyksZS5ib2R5U2Nyb2xsTG9jaz1vfX0odGhpcyxmdW5jdGlvbihleHBvcnRzKXtcInVzZSBzdHJpY3RcIjtmdW5jdGlvbiBpKGUpe2lmKEFycmF5LmlzQXJyYXkoZSkpe2Zvcih2YXIgdD0wLG89QXJyYXkoZS5sZW5ndGgpO3Q8ZS5sZW5ndGg7dCsrKW9bdF09ZVt0XTtyZXR1cm4gb31yZXR1cm4gQXJyYXkuZnJvbShlKX1PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cyxcIl9fZXNNb2R1bGVcIix7dmFsdWU6ITB9KTt2YXIgbD0hMTtpZihcInVuZGVmaW5lZFwiIT10eXBlb2Ygd2luZG93KXt2YXIgZT17Z2V0IHBhc3NpdmUoKXtsPSEwfX07d2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJ0ZXN0UGFzc2l2ZVwiLG51bGwsZSksd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJ0ZXN0UGFzc2l2ZVwiLG51bGwsZSl9ZnVuY3Rpb24gZCh0KXtyZXR1cm4gdS5zb21lKGZ1bmN0aW9uKGUpe3JldHVybiEoIWUub3B0aW9ucy5hbGxvd1RvdWNoTW92ZXx8IWUub3B0aW9ucy5hbGxvd1RvdWNoTW92ZSh0KSl9KX1mdW5jdGlvbiBjKGUpe3ZhciB0PWV8fHdpbmRvdy5ldmVudDtyZXR1cm4hIWQodC50YXJnZXQpfHwoMTx0LnRvdWNoZXMubGVuZ3RofHwodC5wcmV2ZW50RGVmYXVsdCYmdC5wcmV2ZW50RGVmYXVsdCgpLCExKSl9ZnVuY3Rpb24gbygpe3NldFRpbWVvdXQoZnVuY3Rpb24oKXt2b2lkIDAhPT1tJiYoZG9jdW1lbnQuYm9keS5zdHlsZS5wYWRkaW5nUmlnaHQ9bSxtPXZvaWQgMCksdm9pZCAwIT09ZiYmKGRvY3VtZW50LmJvZHkuc3R5bGUub3ZlcmZsb3c9ZixmPXZvaWQgMCl9KX12YXIgYT1cInVuZGVmaW5lZFwiIT10eXBlb2Ygd2luZG93JiZ3aW5kb3cubmF2aWdhdG9yJiZ3aW5kb3cubmF2aWdhdG9yLnBsYXRmb3JtJiYoL2lQKGFkfGhvbmV8b2QpLy50ZXN0KHdpbmRvdy5uYXZpZ2F0b3IucGxhdGZvcm0pfHxcIk1hY0ludGVsXCI9PT13aW5kb3cubmF2aWdhdG9yLnBsYXRmb3JtJiYxPHdpbmRvdy5uYXZpZ2F0b3IubWF4VG91Y2hQb2ludHMpLHU9W10scz0hMSx2PS0xLGY9dm9pZCAwLG09dm9pZCAwO2V4cG9ydHMuZGlzYWJsZUJvZHlTY3JvbGw9ZnVuY3Rpb24ocixlKXtpZihhKXtpZighcilyZXR1cm4gdm9pZCBjb25zb2xlLmVycm9yKFwiZGlzYWJsZUJvZHlTY3JvbGwgdW5zdWNjZXNzZnVsIC0gdGFyZ2V0RWxlbWVudCBtdXN0IGJlIHByb3ZpZGVkIHdoZW4gY2FsbGluZyBkaXNhYmxlQm9keVNjcm9sbCBvbiBJT1MgZGV2aWNlcy5cIik7aWYociYmIXUuc29tZShmdW5jdGlvbihlKXtyZXR1cm4gZS50YXJnZXRFbGVtZW50PT09cn0pKXt2YXIgdD17dGFyZ2V0RWxlbWVudDpyLG9wdGlvbnM6ZXx8e319O3U9W10uY29uY2F0KGkodSksW3RdKSxyLm9udG91Y2hzdGFydD1mdW5jdGlvbihlKXsxPT09ZS50YXJnZXRUb3VjaGVzLmxlbmd0aCYmKHY9ZS50YXJnZXRUb3VjaGVzWzBdLmNsaWVudFkpfSxyLm9udG91Y2htb3ZlPWZ1bmN0aW9uKGUpe3ZhciB0LG8sbixpOzE9PT1lLnRhcmdldFRvdWNoZXMubGVuZ3RoJiYobz1yLGk9KHQ9ZSkudGFyZ2V0VG91Y2hlc1swXS5jbGllbnRZLXYsZCh0LnRhcmdldCl8fChvJiYwPT09by5zY3JvbGxUb3AmJjA8aXx8KG49bykmJm4uc2Nyb2xsSGVpZ2h0LW4uc2Nyb2xsVG9wPD1uLmNsaWVudEhlaWdodCYmaTwwP2ModCk6dC5zdG9wUHJvcGFnYXRpb24oKSkpfSxzfHwoZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcInRvdWNobW92ZVwiLGMsbD97cGFzc2l2ZTohMX06dm9pZCAwKSxzPSEwKX19ZWxzZXtuPWUsc2V0VGltZW91dChmdW5jdGlvbigpe2lmKHZvaWQgMD09PW0pe3ZhciBlPSEhbiYmITA9PT1uLnJlc2VydmVTY3JvbGxCYXJHYXAsdD13aW5kb3cuaW5uZXJXaWR0aC1kb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xpZW50V2lkdGg7ZSYmMDx0JiYobT1kb2N1bWVudC5ib2R5LnN0eWxlLnBhZGRpbmdSaWdodCxkb2N1bWVudC5ib2R5LnN0eWxlLnBhZGRpbmdSaWdodD10K1wicHhcIil9dm9pZCAwPT09ZiYmKGY9ZG9jdW1lbnQuYm9keS5zdHlsZS5vdmVyZmxvdyxkb2N1bWVudC5ib2R5LnN0eWxlLm92ZXJmbG93PVwiaGlkZGVuXCIpfSk7dmFyIG89e3RhcmdldEVsZW1lbnQ6cixvcHRpb25zOmV8fHt9fTt1PVtdLmNvbmNhdChpKHUpLFtvXSl9dmFyIG59LGV4cG9ydHMuY2xlYXJBbGxCb2R5U2Nyb2xsTG9ja3M9ZnVuY3Rpb24oKXthPyh1LmZvckVhY2goZnVuY3Rpb24oZSl7ZS50YXJnZXRFbGVtZW50Lm9udG91Y2hzdGFydD1udWxsLGUudGFyZ2V0RWxlbWVudC5vbnRvdWNobW92ZT1udWxsfSkscyYmKGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJ0b3VjaG1vdmVcIixjLGw/e3Bhc3NpdmU6ITF9OnZvaWQgMCkscz0hMSksdT1bXSx2PS0xKToobygpLHU9W10pfSxleHBvcnRzLmVuYWJsZUJvZHlTY3JvbGw9ZnVuY3Rpb24odCl7aWYoYSl7aWYoIXQpcmV0dXJuIHZvaWQgY29uc29sZS5lcnJvcihcImVuYWJsZUJvZHlTY3JvbGwgdW5zdWNjZXNzZnVsIC0gdGFyZ2V0RWxlbWVudCBtdXN0IGJlIHByb3ZpZGVkIHdoZW4gY2FsbGluZyBlbmFibGVCb2R5U2Nyb2xsIG9uIElPUyBkZXZpY2VzLlwiKTt0Lm9udG91Y2hzdGFydD1udWxsLHQub250b3VjaG1vdmU9bnVsbCx1PXUuZmlsdGVyKGZ1bmN0aW9uKGUpe3JldHVybiBlLnRhcmdldEVsZW1lbnQhPT10fSkscyYmMD09PXUubGVuZ3RoJiYoZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcihcInRvdWNobW92ZVwiLGMsbD97cGFzc2l2ZTohMX06dm9pZCAwKSxzPSExKX1lbHNlKHU9dS5maWx0ZXIoZnVuY3Rpb24oZSl7cmV0dXJuIGUudGFyZ2V0RWxlbWVudCE9PXR9KSkubGVuZ3RofHxvKCl9fSk7XG4iLCIvKipcbiAqIG1hdGNoZXNTZWxlY3RvciB2Mi4wLjJcbiAqIG1hdGNoZXNTZWxlY3RvciggZWxlbWVudCwgJy5zZWxlY3RvcicgKVxuICogTUlUIGxpY2Vuc2VcbiAqL1xuXG4vKmpzaGludCBicm93c2VyOiB0cnVlLCBzdHJpY3Q6IHRydWUsIHVuZGVmOiB0cnVlLCB1bnVzZWQ6IHRydWUgKi9cblxuKCBmdW5jdGlvbiggd2luZG93LCBmYWN0b3J5ICkge1xuICAvKmdsb2JhbCBkZWZpbmU6IGZhbHNlLCBtb2R1bGU6IGZhbHNlICovXG4gICd1c2Ugc3RyaWN0JztcbiAgLy8gdW5pdmVyc2FsIG1vZHVsZSBkZWZpbml0aW9uXG4gIGlmICggdHlwZW9mIGRlZmluZSA9PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQgKSB7XG4gICAgLy8gQU1EXG4gICAgZGVmaW5lKCBmYWN0b3J5ICk7XG4gIH0gZWxzZSBpZiAoIHR5cGVvZiBtb2R1bGUgPT0gJ29iamVjdCcgJiYgbW9kdWxlLmV4cG9ydHMgKSB7XG4gICAgLy8gQ29tbW9uSlNcbiAgICBtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkoKTtcbiAgfSBlbHNlIHtcbiAgICAvLyBicm93c2VyIGdsb2JhbFxuICAgIHdpbmRvdy5tYXRjaGVzU2VsZWN0b3IgPSBmYWN0b3J5KCk7XG4gIH1cblxufSggd2luZG93LCBmdW5jdGlvbiBmYWN0b3J5KCkge1xuICAndXNlIHN0cmljdCc7XG5cbiAgdmFyIG1hdGNoZXNNZXRob2QgPSAoIGZ1bmN0aW9uKCkge1xuICAgIHZhciBFbGVtUHJvdG8gPSB3aW5kb3cuRWxlbWVudC5wcm90b3R5cGU7XG4gICAgLy8gY2hlY2sgZm9yIHRoZSBzdGFuZGFyZCBtZXRob2QgbmFtZSBmaXJzdFxuICAgIGlmICggRWxlbVByb3RvLm1hdGNoZXMgKSB7XG4gICAgICByZXR1cm4gJ21hdGNoZXMnO1xuICAgIH1cbiAgICAvLyBjaGVjayB1bi1wcmVmaXhlZFxuICAgIGlmICggRWxlbVByb3RvLm1hdGNoZXNTZWxlY3RvciApIHtcbiAgICAgIHJldHVybiAnbWF0Y2hlc1NlbGVjdG9yJztcbiAgICB9XG4gICAgLy8gY2hlY2sgdmVuZG9yIHByZWZpeGVzXG4gICAgdmFyIHByZWZpeGVzID0gWyAnd2Via2l0JywgJ21veicsICdtcycsICdvJyBdO1xuXG4gICAgZm9yICggdmFyIGk9MDsgaSA8IHByZWZpeGVzLmxlbmd0aDsgaSsrICkge1xuICAgICAgdmFyIHByZWZpeCA9IHByZWZpeGVzW2ldO1xuICAgICAgdmFyIG1ldGhvZCA9IHByZWZpeCArICdNYXRjaGVzU2VsZWN0b3InO1xuICAgICAgaWYgKCBFbGVtUHJvdG9bIG1ldGhvZCBdICkge1xuICAgICAgICByZXR1cm4gbWV0aG9kO1xuICAgICAgfVxuICAgIH1cbiAgfSkoKTtcblxuICByZXR1cm4gZnVuY3Rpb24gbWF0Y2hlc1NlbGVjdG9yKCBlbGVtLCBzZWxlY3RvciApIHtcbiAgICByZXR1cm4gZWxlbVsgbWF0Y2hlc01ldGhvZCBdKCBzZWxlY3RvciApO1xuICB9O1xuXG59KSk7XG4iLCIvKipcbiAqIEV2RW1pdHRlciB2MS4xLjBcbiAqIExpbCcgZXZlbnQgZW1pdHRlclxuICogTUlUIExpY2Vuc2VcbiAqL1xuXG4vKiBqc2hpbnQgdW51c2VkOiB0cnVlLCB1bmRlZjogdHJ1ZSwgc3RyaWN0OiB0cnVlICovXG5cbiggZnVuY3Rpb24oIGdsb2JhbCwgZmFjdG9yeSApIHtcbiAgLy8gdW5pdmVyc2FsIG1vZHVsZSBkZWZpbml0aW9uXG4gIC8qIGpzaGludCBzdHJpY3Q6IGZhbHNlICovIC8qIGdsb2JhbHMgZGVmaW5lLCBtb2R1bGUsIHdpbmRvdyAqL1xuICBpZiAoIHR5cGVvZiBkZWZpbmUgPT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kICkge1xuICAgIC8vIEFNRCAtIFJlcXVpcmVKU1xuICAgIGRlZmluZSggZmFjdG9yeSApO1xuICB9IGVsc2UgaWYgKCB0eXBlb2YgbW9kdWxlID09ICdvYmplY3QnICYmIG1vZHVsZS5leHBvcnRzICkge1xuICAgIC8vIENvbW1vbkpTIC0gQnJvd3NlcmlmeSwgV2VicGFja1xuICAgIG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeSgpO1xuICB9IGVsc2Uge1xuICAgIC8vIEJyb3dzZXIgZ2xvYmFsc1xuICAgIGdsb2JhbC5FdkVtaXR0ZXIgPSBmYWN0b3J5KCk7XG4gIH1cblxufSggdHlwZW9mIHdpbmRvdyAhPSAndW5kZWZpbmVkJyA/IHdpbmRvdyA6IHRoaXMsIGZ1bmN0aW9uKCkge1xuXG5cInVzZSBzdHJpY3RcIjtcblxuZnVuY3Rpb24gRXZFbWl0dGVyKCkge31cblxudmFyIHByb3RvID0gRXZFbWl0dGVyLnByb3RvdHlwZTtcblxucHJvdG8ub24gPSBmdW5jdGlvbiggZXZlbnROYW1lLCBsaXN0ZW5lciApIHtcbiAgaWYgKCAhZXZlbnROYW1lIHx8ICFsaXN0ZW5lciApIHtcbiAgICByZXR1cm47XG4gIH1cbiAgLy8gc2V0IGV2ZW50cyBoYXNoXG4gIHZhciBldmVudHMgPSB0aGlzLl9ldmVudHMgPSB0aGlzLl9ldmVudHMgfHwge307XG4gIC8vIHNldCBsaXN0ZW5lcnMgYXJyYXlcbiAgdmFyIGxpc3RlbmVycyA9IGV2ZW50c1sgZXZlbnROYW1lIF0gPSBldmVudHNbIGV2ZW50TmFtZSBdIHx8IFtdO1xuICAvLyBvbmx5IGFkZCBvbmNlXG4gIGlmICggbGlzdGVuZXJzLmluZGV4T2YoIGxpc3RlbmVyICkgPT0gLTEgKSB7XG4gICAgbGlzdGVuZXJzLnB1c2goIGxpc3RlbmVyICk7XG4gIH1cblxuICByZXR1cm4gdGhpcztcbn07XG5cbnByb3RvLm9uY2UgPSBmdW5jdGlvbiggZXZlbnROYW1lLCBsaXN0ZW5lciApIHtcbiAgaWYgKCAhZXZlbnROYW1lIHx8ICFsaXN0ZW5lciApIHtcbiAgICByZXR1cm47XG4gIH1cbiAgLy8gYWRkIGV2ZW50XG4gIHRoaXMub24oIGV2ZW50TmFtZSwgbGlzdGVuZXIgKTtcbiAgLy8gc2V0IG9uY2UgZmxhZ1xuICAvLyBzZXQgb25jZUV2ZW50cyBoYXNoXG4gIHZhciBvbmNlRXZlbnRzID0gdGhpcy5fb25jZUV2ZW50cyA9IHRoaXMuX29uY2VFdmVudHMgfHwge307XG4gIC8vIHNldCBvbmNlTGlzdGVuZXJzIG9iamVjdFxuICB2YXIgb25jZUxpc3RlbmVycyA9IG9uY2VFdmVudHNbIGV2ZW50TmFtZSBdID0gb25jZUV2ZW50c1sgZXZlbnROYW1lIF0gfHwge307XG4gIC8vIHNldCBmbGFnXG4gIG9uY2VMaXN0ZW5lcnNbIGxpc3RlbmVyIF0gPSB0cnVlO1xuXG4gIHJldHVybiB0aGlzO1xufTtcblxucHJvdG8ub2ZmID0gZnVuY3Rpb24oIGV2ZW50TmFtZSwgbGlzdGVuZXIgKSB7XG4gIHZhciBsaXN0ZW5lcnMgPSB0aGlzLl9ldmVudHMgJiYgdGhpcy5fZXZlbnRzWyBldmVudE5hbWUgXTtcbiAgaWYgKCAhbGlzdGVuZXJzIHx8ICFsaXN0ZW5lcnMubGVuZ3RoICkge1xuICAgIHJldHVybjtcbiAgfVxuICB2YXIgaW5kZXggPSBsaXN0ZW5lcnMuaW5kZXhPZiggbGlzdGVuZXIgKTtcbiAgaWYgKCBpbmRleCAhPSAtMSApIHtcbiAgICBsaXN0ZW5lcnMuc3BsaWNlKCBpbmRleCwgMSApO1xuICB9XG5cbiAgcmV0dXJuIHRoaXM7XG59O1xuXG5wcm90by5lbWl0RXZlbnQgPSBmdW5jdGlvbiggZXZlbnROYW1lLCBhcmdzICkge1xuICB2YXIgbGlzdGVuZXJzID0gdGhpcy5fZXZlbnRzICYmIHRoaXMuX2V2ZW50c1sgZXZlbnROYW1lIF07XG4gIGlmICggIWxpc3RlbmVycyB8fCAhbGlzdGVuZXJzLmxlbmd0aCApIHtcbiAgICByZXR1cm47XG4gIH1cbiAgLy8gY29weSBvdmVyIHRvIGF2b2lkIGludGVyZmVyZW5jZSBpZiAub2ZmKCkgaW4gbGlzdGVuZXJcbiAgbGlzdGVuZXJzID0gbGlzdGVuZXJzLnNsaWNlKDApO1xuICBhcmdzID0gYXJncyB8fCBbXTtcbiAgLy8gb25jZSBzdHVmZlxuICB2YXIgb25jZUxpc3RlbmVycyA9IHRoaXMuX29uY2VFdmVudHMgJiYgdGhpcy5fb25jZUV2ZW50c1sgZXZlbnROYW1lIF07XG5cbiAgZm9yICggdmFyIGk9MDsgaSA8IGxpc3RlbmVycy5sZW5ndGg7IGkrKyApIHtcbiAgICB2YXIgbGlzdGVuZXIgPSBsaXN0ZW5lcnNbaV1cbiAgICB2YXIgaXNPbmNlID0gb25jZUxpc3RlbmVycyAmJiBvbmNlTGlzdGVuZXJzWyBsaXN0ZW5lciBdO1xuICAgIGlmICggaXNPbmNlICkge1xuICAgICAgLy8gcmVtb3ZlIGxpc3RlbmVyXG4gICAgICAvLyByZW1vdmUgYmVmb3JlIHRyaWdnZXIgdG8gcHJldmVudCByZWN1cnNpb25cbiAgICAgIHRoaXMub2ZmKCBldmVudE5hbWUsIGxpc3RlbmVyICk7XG4gICAgICAvLyB1bnNldCBvbmNlIGZsYWdcbiAgICAgIGRlbGV0ZSBvbmNlTGlzdGVuZXJzWyBsaXN0ZW5lciBdO1xuICAgIH1cbiAgICAvLyB0cmlnZ2VyIGxpc3RlbmVyXG4gICAgbGlzdGVuZXIuYXBwbHkoIHRoaXMsIGFyZ3MgKTtcbiAgfVxuXG4gIHJldHVybiB0aGlzO1xufTtcblxucHJvdG8uYWxsT2ZmID0gZnVuY3Rpb24oKSB7XG4gIGRlbGV0ZSB0aGlzLl9ldmVudHM7XG4gIGRlbGV0ZSB0aGlzLl9vbmNlRXZlbnRzO1xufTtcblxucmV0dXJuIEV2RW1pdHRlcjtcblxufSkpO1xuIiwiLyoqXG4gKiBGaXp6eSBVSSB1dGlscyB2Mi4wLjdcbiAqIE1JVCBsaWNlbnNlXG4gKi9cblxuLypqc2hpbnQgYnJvd3NlcjogdHJ1ZSwgdW5kZWY6IHRydWUsIHVudXNlZDogdHJ1ZSwgc3RyaWN0OiB0cnVlICovXG5cbiggZnVuY3Rpb24oIHdpbmRvdywgZmFjdG9yeSApIHtcbiAgLy8gdW5pdmVyc2FsIG1vZHVsZSBkZWZpbml0aW9uXG4gIC8qanNoaW50IHN0cmljdDogZmFsc2UgKi8gLypnbG9iYWxzIGRlZmluZSwgbW9kdWxlLCByZXF1aXJlICovXG5cbiAgaWYgKCB0eXBlb2YgZGVmaW5lID09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZCApIHtcbiAgICAvLyBBTURcbiAgICBkZWZpbmUoIFtcbiAgICAgICdkZXNhbmRyby1tYXRjaGVzLXNlbGVjdG9yL21hdGNoZXMtc2VsZWN0b3InXG4gICAgXSwgZnVuY3Rpb24oIG1hdGNoZXNTZWxlY3RvciApIHtcbiAgICAgIHJldHVybiBmYWN0b3J5KCB3aW5kb3csIG1hdGNoZXNTZWxlY3RvciApO1xuICAgIH0pO1xuICB9IGVsc2UgaWYgKCB0eXBlb2YgbW9kdWxlID09ICdvYmplY3QnICYmIG1vZHVsZS5leHBvcnRzICkge1xuICAgIC8vIENvbW1vbkpTXG4gICAgbW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KFxuICAgICAgd2luZG93LFxuICAgICAgcmVxdWlyZSgnZGVzYW5kcm8tbWF0Y2hlcy1zZWxlY3RvcicpXG4gICAgKTtcbiAgfSBlbHNlIHtcbiAgICAvLyBicm93c2VyIGdsb2JhbFxuICAgIHdpbmRvdy5maXp6eVVJVXRpbHMgPSBmYWN0b3J5KFxuICAgICAgd2luZG93LFxuICAgICAgd2luZG93Lm1hdGNoZXNTZWxlY3RvclxuICAgICk7XG4gIH1cblxufSggd2luZG93LCBmdW5jdGlvbiBmYWN0b3J5KCB3aW5kb3csIG1hdGNoZXNTZWxlY3RvciApIHtcblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgdXRpbHMgPSB7fTtcblxuLy8gLS0tLS0gZXh0ZW5kIC0tLS0tIC8vXG5cbi8vIGV4dGVuZHMgb2JqZWN0c1xudXRpbHMuZXh0ZW5kID0gZnVuY3Rpb24oIGEsIGIgKSB7XG4gIGZvciAoIHZhciBwcm9wIGluIGIgKSB7XG4gICAgYVsgcHJvcCBdID0gYlsgcHJvcCBdO1xuICB9XG4gIHJldHVybiBhO1xufTtcblxuLy8gLS0tLS0gbW9kdWxvIC0tLS0tIC8vXG5cbnV0aWxzLm1vZHVsbyA9IGZ1bmN0aW9uKCBudW0sIGRpdiApIHtcbiAgcmV0dXJuICggKCBudW0gJSBkaXYgKSArIGRpdiApICUgZGl2O1xufTtcblxuLy8gLS0tLS0gbWFrZUFycmF5IC0tLS0tIC8vXG5cbnZhciBhcnJheVNsaWNlID0gQXJyYXkucHJvdG90eXBlLnNsaWNlO1xuXG4vLyB0dXJuIGVsZW1lbnQgb3Igbm9kZUxpc3QgaW50byBhbiBhcnJheVxudXRpbHMubWFrZUFycmF5ID0gZnVuY3Rpb24oIG9iaiApIHtcbiAgaWYgKCBBcnJheS5pc0FycmF5KCBvYmogKSApIHtcbiAgICAvLyB1c2Ugb2JqZWN0IGlmIGFscmVhZHkgYW4gYXJyYXlcbiAgICByZXR1cm4gb2JqO1xuICB9XG4gIC8vIHJldHVybiBlbXB0eSBhcnJheSBpZiB1bmRlZmluZWQgb3IgbnVsbC4gIzZcbiAgaWYgKCBvYmogPT09IG51bGwgfHwgb2JqID09PSB1bmRlZmluZWQgKSB7XG4gICAgcmV0dXJuIFtdO1xuICB9XG5cbiAgdmFyIGlzQXJyYXlMaWtlID0gdHlwZW9mIG9iaiA9PSAnb2JqZWN0JyAmJiB0eXBlb2Ygb2JqLmxlbmd0aCA9PSAnbnVtYmVyJztcbiAgaWYgKCBpc0FycmF5TGlrZSApIHtcbiAgICAvLyBjb252ZXJ0IG5vZGVMaXN0IHRvIGFycmF5XG4gICAgcmV0dXJuIGFycmF5U2xpY2UuY2FsbCggb2JqICk7XG4gIH1cblxuICAvLyBhcnJheSBvZiBzaW5nbGUgaW5kZXhcbiAgcmV0dXJuIFsgb2JqIF07XG59O1xuXG4vLyAtLS0tLSByZW1vdmVGcm9tIC0tLS0tIC8vXG5cbnV0aWxzLnJlbW92ZUZyb20gPSBmdW5jdGlvbiggYXJ5LCBvYmogKSB7XG4gIHZhciBpbmRleCA9IGFyeS5pbmRleE9mKCBvYmogKTtcbiAgaWYgKCBpbmRleCAhPSAtMSApIHtcbiAgICBhcnkuc3BsaWNlKCBpbmRleCwgMSApO1xuICB9XG59O1xuXG4vLyAtLS0tLSBnZXRQYXJlbnQgLS0tLS0gLy9cblxudXRpbHMuZ2V0UGFyZW50ID0gZnVuY3Rpb24oIGVsZW0sIHNlbGVjdG9yICkge1xuICB3aGlsZSAoIGVsZW0ucGFyZW50Tm9kZSAmJiBlbGVtICE9IGRvY3VtZW50LmJvZHkgKSB7XG4gICAgZWxlbSA9IGVsZW0ucGFyZW50Tm9kZTtcbiAgICBpZiAoIG1hdGNoZXNTZWxlY3RvciggZWxlbSwgc2VsZWN0b3IgKSApIHtcbiAgICAgIHJldHVybiBlbGVtO1xuICAgIH1cbiAgfVxufTtcblxuLy8gLS0tLS0gZ2V0UXVlcnlFbGVtZW50IC0tLS0tIC8vXG5cbi8vIHVzZSBlbGVtZW50IGFzIHNlbGVjdG9yIHN0cmluZ1xudXRpbHMuZ2V0UXVlcnlFbGVtZW50ID0gZnVuY3Rpb24oIGVsZW0gKSB7XG4gIGlmICggdHlwZW9mIGVsZW0gPT0gJ3N0cmluZycgKSB7XG4gICAgcmV0dXJuIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoIGVsZW0gKTtcbiAgfVxuICByZXR1cm4gZWxlbTtcbn07XG5cbi8vIC0tLS0tIGhhbmRsZUV2ZW50IC0tLS0tIC8vXG5cbi8vIGVuYWJsZSAub250eXBlIHRvIHRyaWdnZXIgZnJvbSAuYWRkRXZlbnRMaXN0ZW5lciggZWxlbSwgJ3R5cGUnIClcbnV0aWxzLmhhbmRsZUV2ZW50ID0gZnVuY3Rpb24oIGV2ZW50ICkge1xuICB2YXIgbWV0aG9kID0gJ29uJyArIGV2ZW50LnR5cGU7XG4gIGlmICggdGhpc1sgbWV0aG9kIF0gKSB7XG4gICAgdGhpc1sgbWV0aG9kIF0oIGV2ZW50ICk7XG4gIH1cbn07XG5cbi8vIC0tLS0tIGZpbHRlckZpbmRFbGVtZW50cyAtLS0tLSAvL1xuXG51dGlscy5maWx0ZXJGaW5kRWxlbWVudHMgPSBmdW5jdGlvbiggZWxlbXMsIHNlbGVjdG9yICkge1xuICAvLyBtYWtlIGFycmF5IG9mIGVsZW1zXG4gIGVsZW1zID0gdXRpbHMubWFrZUFycmF5KCBlbGVtcyApO1xuICB2YXIgZmZFbGVtcyA9IFtdO1xuXG4gIGVsZW1zLmZvckVhY2goIGZ1bmN0aW9uKCBlbGVtICkge1xuICAgIC8vIGNoZWNrIHRoYXQgZWxlbSBpcyBhbiBhY3R1YWwgZWxlbWVudFxuICAgIGlmICggISggZWxlbSBpbnN0YW5jZW9mIEhUTUxFbGVtZW50ICkgKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIC8vIGFkZCBlbGVtIGlmIG5vIHNlbGVjdG9yXG4gICAgaWYgKCAhc2VsZWN0b3IgKSB7XG4gICAgICBmZkVsZW1zLnB1c2goIGVsZW0gKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgLy8gZmlsdGVyICYgZmluZCBpdGVtcyBpZiB3ZSBoYXZlIGEgc2VsZWN0b3JcbiAgICAvLyBmaWx0ZXJcbiAgICBpZiAoIG1hdGNoZXNTZWxlY3RvciggZWxlbSwgc2VsZWN0b3IgKSApIHtcbiAgICAgIGZmRWxlbXMucHVzaCggZWxlbSApO1xuICAgIH1cbiAgICAvLyBmaW5kIGNoaWxkcmVuXG4gICAgdmFyIGNoaWxkRWxlbXMgPSBlbGVtLnF1ZXJ5U2VsZWN0b3JBbGwoIHNlbGVjdG9yICk7XG4gICAgLy8gY29uY2F0IGNoaWxkRWxlbXMgdG8gZmlsdGVyRm91bmQgYXJyYXlcbiAgICBmb3IgKCB2YXIgaT0wOyBpIDwgY2hpbGRFbGVtcy5sZW5ndGg7IGkrKyApIHtcbiAgICAgIGZmRWxlbXMucHVzaCggY2hpbGRFbGVtc1tpXSApO1xuICAgIH1cbiAgfSk7XG5cbiAgcmV0dXJuIGZmRWxlbXM7XG59O1xuXG4vLyAtLS0tLSBkZWJvdW5jZU1ldGhvZCAtLS0tLSAvL1xuXG51dGlscy5kZWJvdW5jZU1ldGhvZCA9IGZ1bmN0aW9uKCBfY2xhc3MsIG1ldGhvZE5hbWUsIHRocmVzaG9sZCApIHtcbiAgdGhyZXNob2xkID0gdGhyZXNob2xkIHx8IDEwMDtcbiAgLy8gb3JpZ2luYWwgbWV0aG9kXG4gIHZhciBtZXRob2QgPSBfY2xhc3MucHJvdG90eXBlWyBtZXRob2ROYW1lIF07XG4gIHZhciB0aW1lb3V0TmFtZSA9IG1ldGhvZE5hbWUgKyAnVGltZW91dCc7XG5cbiAgX2NsYXNzLnByb3RvdHlwZVsgbWV0aG9kTmFtZSBdID0gZnVuY3Rpb24oKSB7XG4gICAgdmFyIHRpbWVvdXQgPSB0aGlzWyB0aW1lb3V0TmFtZSBdO1xuICAgIGNsZWFyVGltZW91dCggdGltZW91dCApO1xuXG4gICAgdmFyIGFyZ3MgPSBhcmd1bWVudHM7XG4gICAgdmFyIF90aGlzID0gdGhpcztcbiAgICB0aGlzWyB0aW1lb3V0TmFtZSBdID0gc2V0VGltZW91dCggZnVuY3Rpb24oKSB7XG4gICAgICBtZXRob2QuYXBwbHkoIF90aGlzLCBhcmdzICk7XG4gICAgICBkZWxldGUgX3RoaXNbIHRpbWVvdXROYW1lIF07XG4gICAgfSwgdGhyZXNob2xkICk7XG4gIH07XG59O1xuXG4vLyAtLS0tLSBkb2NSZWFkeSAtLS0tLSAvL1xuXG51dGlscy5kb2NSZWFkeSA9IGZ1bmN0aW9uKCBjYWxsYmFjayApIHtcbiAgdmFyIHJlYWR5U3RhdGUgPSBkb2N1bWVudC5yZWFkeVN0YXRlO1xuICBpZiAoIHJlYWR5U3RhdGUgPT0gJ2NvbXBsZXRlJyB8fCByZWFkeVN0YXRlID09ICdpbnRlcmFjdGl2ZScgKSB7XG4gICAgLy8gZG8gYXN5bmMgdG8gYWxsb3cgZm9yIG90aGVyIHNjcmlwdHMgdG8gcnVuLiBtZXRhZml6enkvZmxpY2tpdHkjNDQxXG4gICAgc2V0VGltZW91dCggY2FsbGJhY2sgKTtcbiAgfSBlbHNlIHtcbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCAnRE9NQ29udGVudExvYWRlZCcsIGNhbGxiYWNrICk7XG4gIH1cbn07XG5cbi8vIC0tLS0tIGh0bWxJbml0IC0tLS0tIC8vXG5cbi8vIGh0dHA6Ly9qYW1lc3JvYmVydHMubmFtZS9ibG9nLzIwMTAvMDIvMjIvc3RyaW5nLWZ1bmN0aW9ucy1mb3ItamF2YXNjcmlwdC10cmltLXRvLWNhbWVsLWNhc2UtdG8tZGFzaGVkLWFuZC10by11bmRlcnNjb3JlL1xudXRpbHMudG9EYXNoZWQgPSBmdW5jdGlvbiggc3RyICkge1xuICByZXR1cm4gc3RyLnJlcGxhY2UoIC8oLikoW0EtWl0pL2csIGZ1bmN0aW9uKCBtYXRjaCwgJDEsICQyICkge1xuICAgIHJldHVybiAkMSArICctJyArICQyO1xuICB9KS50b0xvd2VyQ2FzZSgpO1xufTtcblxudmFyIGNvbnNvbGUgPSB3aW5kb3cuY29uc29sZTtcbi8qKlxuICogYWxsb3cgdXNlciB0byBpbml0aWFsaXplIGNsYXNzZXMgdmlhIFtkYXRhLW5hbWVzcGFjZV0gb3IgLmpzLW5hbWVzcGFjZSBjbGFzc1xuICogaHRtbEluaXQoIFdpZGdldCwgJ3dpZGdldE5hbWUnIClcbiAqIG9wdGlvbnMgYXJlIHBhcnNlZCBmcm9tIGRhdGEtbmFtZXNwYWNlLW9wdGlvbnNcbiAqL1xudXRpbHMuaHRtbEluaXQgPSBmdW5jdGlvbiggV2lkZ2V0Q2xhc3MsIG5hbWVzcGFjZSApIHtcbiAgdXRpbHMuZG9jUmVhZHkoIGZ1bmN0aW9uKCkge1xuICAgIHZhciBkYXNoZWROYW1lc3BhY2UgPSB1dGlscy50b0Rhc2hlZCggbmFtZXNwYWNlICk7XG4gICAgdmFyIGRhdGFBdHRyID0gJ2RhdGEtJyArIGRhc2hlZE5hbWVzcGFjZTtcbiAgICB2YXIgZGF0YUF0dHJFbGVtcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoICdbJyArIGRhdGFBdHRyICsgJ10nICk7XG4gICAgdmFyIGpzRGFzaEVsZW1zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCggJy5qcy0nICsgZGFzaGVkTmFtZXNwYWNlICk7XG4gICAgdmFyIGVsZW1zID0gdXRpbHMubWFrZUFycmF5KCBkYXRhQXR0ckVsZW1zIClcbiAgICAgIC5jb25jYXQoIHV0aWxzLm1ha2VBcnJheSgganNEYXNoRWxlbXMgKSApO1xuICAgIHZhciBkYXRhT3B0aW9uc0F0dHIgPSBkYXRhQXR0ciArICctb3B0aW9ucyc7XG4gICAgdmFyIGpRdWVyeSA9IHdpbmRvdy5qUXVlcnk7XG5cbiAgICBlbGVtcy5mb3JFYWNoKCBmdW5jdGlvbiggZWxlbSApIHtcbiAgICAgIHZhciBhdHRyID0gZWxlbS5nZXRBdHRyaWJ1dGUoIGRhdGFBdHRyICkgfHxcbiAgICAgICAgZWxlbS5nZXRBdHRyaWJ1dGUoIGRhdGFPcHRpb25zQXR0ciApO1xuICAgICAgdmFyIG9wdGlvbnM7XG4gICAgICB0cnkge1xuICAgICAgICBvcHRpb25zID0gYXR0ciAmJiBKU09OLnBhcnNlKCBhdHRyICk7XG4gICAgICB9IGNhdGNoICggZXJyb3IgKSB7XG4gICAgICAgIC8vIGxvZyBlcnJvciwgZG8gbm90IGluaXRpYWxpemVcbiAgICAgICAgaWYgKCBjb25zb2xlICkge1xuICAgICAgICAgIGNvbnNvbGUuZXJyb3IoICdFcnJvciBwYXJzaW5nICcgKyBkYXRhQXR0ciArICcgb24gJyArIGVsZW0uY2xhc3NOYW1lICtcbiAgICAgICAgICAnOiAnICsgZXJyb3IgKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICAvLyBpbml0aWFsaXplXG4gICAgICB2YXIgaW5zdGFuY2UgPSBuZXcgV2lkZ2V0Q2xhc3MoIGVsZW0sIG9wdGlvbnMgKTtcbiAgICAgIC8vIG1ha2UgYXZhaWxhYmxlIHZpYSAkKCkuZGF0YSgnbmFtZXNwYWNlJylcbiAgICAgIGlmICggalF1ZXJ5ICkge1xuICAgICAgICBqUXVlcnkuZGF0YSggZWxlbSwgbmFtZXNwYWNlLCBpbnN0YW5jZSApO1xuICAgICAgfVxuICAgIH0pO1xuXG4gIH0pO1xufTtcblxuLy8gLS0tLS0gIC0tLS0tIC8vXG5cbnJldHVybiB1dGlscztcblxufSkpO1xuIiwiLy8gYWRkLCByZW1vdmUgY2VsbFxuKCBmdW5jdGlvbiggd2luZG93LCBmYWN0b3J5ICkge1xuICAvLyB1bml2ZXJzYWwgbW9kdWxlIGRlZmluaXRpb25cbiAgLyoganNoaW50IHN0cmljdDogZmFsc2UgKi9cbiAgaWYgKCB0eXBlb2YgZGVmaW5lID09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZCApIHtcbiAgICAvLyBBTURcbiAgICBkZWZpbmUoIFtcbiAgICAgICcuL2ZsaWNraXR5JyxcbiAgICAgICdmaXp6eS11aS11dGlscy91dGlscydcbiAgICBdLCBmdW5jdGlvbiggRmxpY2tpdHksIHV0aWxzICkge1xuICAgICAgcmV0dXJuIGZhY3RvcnkoIHdpbmRvdywgRmxpY2tpdHksIHV0aWxzICk7XG4gICAgfSk7XG4gIH0gZWxzZSBpZiAoIHR5cGVvZiBtb2R1bGUgPT0gJ29iamVjdCcgJiYgbW9kdWxlLmV4cG9ydHMgKSB7XG4gICAgLy8gQ29tbW9uSlNcbiAgICBtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkoXG4gICAgICB3aW5kb3csXG4gICAgICByZXF1aXJlKCcuL2ZsaWNraXR5JyksXG4gICAgICByZXF1aXJlKCdmaXp6eS11aS11dGlscycpXG4gICAgKTtcbiAgfSBlbHNlIHtcbiAgICAvLyBicm93c2VyIGdsb2JhbFxuICAgIGZhY3RvcnkoXG4gICAgICB3aW5kb3csXG4gICAgICB3aW5kb3cuRmxpY2tpdHksXG4gICAgICB3aW5kb3cuZml6enlVSVV0aWxzXG4gICAgKTtcbiAgfVxuXG59KCB3aW5kb3csIGZ1bmN0aW9uIGZhY3RvcnkoIHdpbmRvdywgRmxpY2tpdHksIHV0aWxzICkge1xuXG4ndXNlIHN0cmljdCc7XG5cbi8vIGFwcGVuZCBjZWxscyB0byBhIGRvY3VtZW50IGZyYWdtZW50XG5mdW5jdGlvbiBnZXRDZWxsc0ZyYWdtZW50KCBjZWxscyApIHtcbiAgdmFyIGZyYWdtZW50ID0gZG9jdW1lbnQuY3JlYXRlRG9jdW1lbnRGcmFnbWVudCgpO1xuICBjZWxscy5mb3JFYWNoKCBmdW5jdGlvbiggY2VsbCApIHtcbiAgICBmcmFnbWVudC5hcHBlbmRDaGlsZCggY2VsbC5lbGVtZW50ICk7XG4gIH0pO1xuICByZXR1cm4gZnJhZ21lbnQ7XG59XG5cbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tIGFkZC9yZW1vdmUgY2VsbCBwcm90b3R5cGUgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gLy9cblxudmFyIHByb3RvID0gRmxpY2tpdHkucHJvdG90eXBlO1xuXG4vKipcbiAqIEluc2VydCwgcHJlcGVuZCwgb3IgYXBwZW5kIGNlbGxzXG4gKiBAcGFyYW0ge0VsZW1lbnQsIEFycmF5LCBOb2RlTGlzdH0gZWxlbXNcbiAqIEBwYXJhbSB7SW50ZWdlcn0gaW5kZXhcbiAqL1xucHJvdG8uaW5zZXJ0ID0gZnVuY3Rpb24oIGVsZW1zLCBpbmRleCApIHtcbiAgdmFyIGNlbGxzID0gdGhpcy5fbWFrZUNlbGxzKCBlbGVtcyApO1xuICBpZiAoICFjZWxscyB8fCAhY2VsbHMubGVuZ3RoICkge1xuICAgIHJldHVybjtcbiAgfVxuICB2YXIgbGVuID0gdGhpcy5jZWxscy5sZW5ndGg7XG4gIC8vIGRlZmF1bHQgdG8gYXBwZW5kXG4gIGluZGV4ID0gaW5kZXggPT09IHVuZGVmaW5lZCA/IGxlbiA6IGluZGV4O1xuICAvLyBhZGQgY2VsbHMgd2l0aCBkb2N1bWVudCBmcmFnbWVudFxuICB2YXIgZnJhZ21lbnQgPSBnZXRDZWxsc0ZyYWdtZW50KCBjZWxscyApO1xuICAvLyBhcHBlbmQgdG8gc2xpZGVyXG4gIHZhciBpc0FwcGVuZCA9IGluZGV4ID09IGxlbjtcbiAgaWYgKCBpc0FwcGVuZCApIHtcbiAgICB0aGlzLnNsaWRlci5hcHBlbmRDaGlsZCggZnJhZ21lbnQgKTtcbiAgfSBlbHNlIHtcbiAgICB2YXIgaW5zZXJ0Q2VsbEVsZW1lbnQgPSB0aGlzLmNlbGxzWyBpbmRleCBdLmVsZW1lbnQ7XG4gICAgdGhpcy5zbGlkZXIuaW5zZXJ0QmVmb3JlKCBmcmFnbWVudCwgaW5zZXJ0Q2VsbEVsZW1lbnQgKTtcbiAgfVxuICAvLyBhZGQgdG8gdGhpcy5jZWxsc1xuICBpZiAoIGluZGV4ID09PSAwICkge1xuICAgIC8vIHByZXBlbmQsIGFkZCB0byBzdGFydFxuICAgIHRoaXMuY2VsbHMgPSBjZWxscy5jb25jYXQoIHRoaXMuY2VsbHMgKTtcbiAgfSBlbHNlIGlmICggaXNBcHBlbmQgKSB7XG4gICAgLy8gYXBwZW5kLCBhZGQgdG8gZW5kXG4gICAgdGhpcy5jZWxscyA9IHRoaXMuY2VsbHMuY29uY2F0KCBjZWxscyApO1xuICB9IGVsc2Uge1xuICAgIC8vIGluc2VydCBpbiB0aGlzLmNlbGxzXG4gICAgdmFyIGVuZENlbGxzID0gdGhpcy5jZWxscy5zcGxpY2UoIGluZGV4LCBsZW4gLSBpbmRleCApO1xuICAgIHRoaXMuY2VsbHMgPSB0aGlzLmNlbGxzLmNvbmNhdCggY2VsbHMgKS5jb25jYXQoIGVuZENlbGxzICk7XG4gIH1cblxuICB0aGlzLl9zaXplQ2VsbHMoIGNlbGxzICk7XG4gIHRoaXMuY2VsbENoYW5nZSggaW5kZXgsIHRydWUgKTtcbn07XG5cbnByb3RvLmFwcGVuZCA9IGZ1bmN0aW9uKCBlbGVtcyApIHtcbiAgdGhpcy5pbnNlcnQoIGVsZW1zLCB0aGlzLmNlbGxzLmxlbmd0aCApO1xufTtcblxucHJvdG8ucHJlcGVuZCA9IGZ1bmN0aW9uKCBlbGVtcyApIHtcbiAgdGhpcy5pbnNlcnQoIGVsZW1zLCAwICk7XG59O1xuXG4vKipcbiAqIFJlbW92ZSBjZWxsc1xuICogQHBhcmFtIHtFbGVtZW50LCBBcnJheSwgTm9kZUxpc3R9IGVsZW1zXG4gKi9cbnByb3RvLnJlbW92ZSA9IGZ1bmN0aW9uKCBlbGVtcyApIHtcbiAgdmFyIGNlbGxzID0gdGhpcy5nZXRDZWxscyggZWxlbXMgKTtcbiAgaWYgKCAhY2VsbHMgfHwgIWNlbGxzLmxlbmd0aCApIHtcbiAgICByZXR1cm47XG4gIH1cblxuICB2YXIgbWluQ2VsbEluZGV4ID0gdGhpcy5jZWxscy5sZW5ndGggLSAxO1xuICAvLyByZW1vdmUgY2VsbHMgZnJvbSBjb2xsZWN0aW9uICYgRE9NXG4gIGNlbGxzLmZvckVhY2goIGZ1bmN0aW9uKCBjZWxsICkge1xuICAgIGNlbGwucmVtb3ZlKCk7XG4gICAgdmFyIGluZGV4ID0gdGhpcy5jZWxscy5pbmRleE9mKCBjZWxsICk7XG4gICAgbWluQ2VsbEluZGV4ID0gTWF0aC5taW4oIGluZGV4LCBtaW5DZWxsSW5kZXggKTtcbiAgICB1dGlscy5yZW1vdmVGcm9tKCB0aGlzLmNlbGxzLCBjZWxsICk7XG4gIH0sIHRoaXMgKTtcblxuICB0aGlzLmNlbGxDaGFuZ2UoIG1pbkNlbGxJbmRleCwgdHJ1ZSApO1xufTtcblxuLyoqXG4gKiBsb2dpYyB0byBiZSBydW4gYWZ0ZXIgYSBjZWxsJ3Mgc2l6ZSBjaGFuZ2VzXG4gKiBAcGFyYW0ge0VsZW1lbnR9IGVsZW0gLSBjZWxsJ3MgZWxlbWVudFxuICovXG5wcm90by5jZWxsU2l6ZUNoYW5nZSA9IGZ1bmN0aW9uKCBlbGVtICkge1xuICB2YXIgY2VsbCA9IHRoaXMuZ2V0Q2VsbCggZWxlbSApO1xuICBpZiAoICFjZWxsICkge1xuICAgIHJldHVybjtcbiAgfVxuICBjZWxsLmdldFNpemUoKTtcblxuICB2YXIgaW5kZXggPSB0aGlzLmNlbGxzLmluZGV4T2YoIGNlbGwgKTtcbiAgdGhpcy5jZWxsQ2hhbmdlKCBpbmRleCApO1xufTtcblxuLyoqXG4gKiBsb2dpYyBhbnkgdGltZSBhIGNlbGwgaXMgY2hhbmdlZDogYWRkZWQsIHJlbW92ZWQsIG9yIHNpemUgY2hhbmdlZFxuICogQHBhcmFtIHtJbnRlZ2VyfSBjaGFuZ2VkQ2VsbEluZGV4IC0gaW5kZXggb2YgdGhlIGNoYW5nZWQgY2VsbCwgb3B0aW9uYWxcbiAqL1xucHJvdG8uY2VsbENoYW5nZSA9IGZ1bmN0aW9uKCBjaGFuZ2VkQ2VsbEluZGV4LCBpc1Bvc2l0aW9uaW5nU2xpZGVyICkge1xuICB2YXIgcHJldlNlbGVjdGVkRWxlbSA9IHRoaXMuc2VsZWN0ZWRFbGVtZW50O1xuICB0aGlzLl9wb3NpdGlvbkNlbGxzKCBjaGFuZ2VkQ2VsbEluZGV4ICk7XG4gIHRoaXMuX2dldFdyYXBTaGlmdENlbGxzKCk7XG4gIHRoaXMuc2V0R2FsbGVyeVNpemUoKTtcbiAgLy8gdXBkYXRlIHNlbGVjdGVkSW5kZXhcbiAgLy8gdHJ5IHRvIG1haW50YWluIHBvc2l0aW9uICYgc2VsZWN0IHByZXZpb3VzIHNlbGVjdGVkIGVsZW1lbnRcbiAgdmFyIGNlbGwgPSB0aGlzLmdldENlbGwoIHByZXZTZWxlY3RlZEVsZW0gKTtcbiAgaWYgKCBjZWxsICkge1xuICAgIHRoaXMuc2VsZWN0ZWRJbmRleCA9IHRoaXMuZ2V0Q2VsbFNsaWRlSW5kZXgoIGNlbGwgKTtcbiAgfVxuICB0aGlzLnNlbGVjdGVkSW5kZXggPSBNYXRoLm1pbiggdGhpcy5zbGlkZXMubGVuZ3RoIC0gMSwgdGhpcy5zZWxlY3RlZEluZGV4ICk7XG5cbiAgdGhpcy5lbWl0RXZlbnQoICdjZWxsQ2hhbmdlJywgWyBjaGFuZ2VkQ2VsbEluZGV4IF0gKTtcbiAgLy8gcG9zaXRpb24gc2xpZGVyXG4gIHRoaXMuc2VsZWN0KCB0aGlzLnNlbGVjdGVkSW5kZXggKTtcbiAgLy8gZG8gbm90IHBvc2l0aW9uIHNsaWRlciBhZnRlciBsYXp5IGxvYWRcbiAgaWYgKCBpc1Bvc2l0aW9uaW5nU2xpZGVyICkge1xuICAgIHRoaXMucG9zaXRpb25TbGlkZXJBdFNlbGVjdGVkKCk7XG4gIH1cbn07XG5cbi8vIC0tLS0tICAtLS0tLSAvL1xuXG5yZXR1cm4gRmxpY2tpdHk7XG5cbn0pKTtcbiIsIi8vIGFuaW1hdGVcbiggZnVuY3Rpb24oIHdpbmRvdywgZmFjdG9yeSApIHtcbiAgLy8gdW5pdmVyc2FsIG1vZHVsZSBkZWZpbml0aW9uXG4gIC8qIGpzaGludCBzdHJpY3Q6IGZhbHNlICovXG4gIGlmICggdHlwZW9mIGRlZmluZSA9PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQgKSB7XG4gICAgLy8gQU1EXG4gICAgZGVmaW5lKCBbXG4gICAgICAnZml6enktdWktdXRpbHMvdXRpbHMnXG4gICAgXSwgZnVuY3Rpb24oIHV0aWxzICkge1xuICAgICAgcmV0dXJuIGZhY3RvcnkoIHdpbmRvdywgdXRpbHMgKTtcbiAgICB9KTtcbiAgfSBlbHNlIGlmICggdHlwZW9mIG1vZHVsZSA9PSAnb2JqZWN0JyAmJiBtb2R1bGUuZXhwb3J0cyApIHtcbiAgICAvLyBDb21tb25KU1xuICAgIG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeShcbiAgICAgIHdpbmRvdyxcbiAgICAgIHJlcXVpcmUoJ2Zpenp5LXVpLXV0aWxzJylcbiAgICApO1xuICB9IGVsc2Uge1xuICAgIC8vIGJyb3dzZXIgZ2xvYmFsXG4gICAgd2luZG93LkZsaWNraXR5ID0gd2luZG93LkZsaWNraXR5IHx8IHt9O1xuICAgIHdpbmRvdy5GbGlja2l0eS5hbmltYXRlUHJvdG90eXBlID0gZmFjdG9yeShcbiAgICAgIHdpbmRvdyxcbiAgICAgIHdpbmRvdy5maXp6eVVJVXRpbHNcbiAgICApO1xuICB9XG5cbn0oIHdpbmRvdywgZnVuY3Rpb24gZmFjdG9yeSggd2luZG93LCB1dGlscyApIHtcblxuJ3VzZSBzdHJpY3QnO1xuXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSBhbmltYXRlIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tIC8vXG5cbnZhciBwcm90byA9IHt9O1xuXG5wcm90by5zdGFydEFuaW1hdGlvbiA9IGZ1bmN0aW9uKCkge1xuICBpZiAoIHRoaXMuaXNBbmltYXRpbmcgKSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgdGhpcy5pc0FuaW1hdGluZyA9IHRydWU7XG4gIHRoaXMucmVzdGluZ0ZyYW1lcyA9IDA7XG4gIHRoaXMuYW5pbWF0ZSgpO1xufTtcblxucHJvdG8uYW5pbWF0ZSA9IGZ1bmN0aW9uKCkge1xuICB0aGlzLmFwcGx5RHJhZ0ZvcmNlKCk7XG4gIHRoaXMuYXBwbHlTZWxlY3RlZEF0dHJhY3Rpb24oKTtcblxuICB2YXIgcHJldmlvdXNYID0gdGhpcy54O1xuXG4gIHRoaXMuaW50ZWdyYXRlUGh5c2ljcygpO1xuICB0aGlzLnBvc2l0aW9uU2xpZGVyKCk7XG4gIHRoaXMuc2V0dGxlKCBwcmV2aW91c1ggKTtcbiAgLy8gYW5pbWF0ZSBuZXh0IGZyYW1lXG4gIGlmICggdGhpcy5pc0FuaW1hdGluZyApIHtcbiAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZSggZnVuY3Rpb24gYW5pbWF0ZUZyYW1lKCkge1xuICAgICAgX3RoaXMuYW5pbWF0ZSgpO1xuICAgIH0pO1xuICB9XG59O1xuXG5wcm90by5wb3NpdGlvblNsaWRlciA9IGZ1bmN0aW9uKCkge1xuICB2YXIgeCA9IHRoaXMueDtcbiAgLy8gd3JhcCBwb3NpdGlvbiBhcm91bmRcbiAgaWYgKCB0aGlzLm9wdGlvbnMud3JhcEFyb3VuZCAmJiB0aGlzLmNlbGxzLmxlbmd0aCA+IDEgKSB7XG4gICAgeCA9IHV0aWxzLm1vZHVsbyggeCwgdGhpcy5zbGlkZWFibGVXaWR0aCApO1xuICAgIHggPSB4IC0gdGhpcy5zbGlkZWFibGVXaWR0aDtcbiAgICB0aGlzLnNoaWZ0V3JhcENlbGxzKCB4ICk7XG4gIH1cblxuICB0aGlzLnNldFRyYW5zbGF0ZVgoIHgsIHRoaXMuaXNBbmltYXRpbmcgKTtcbiAgdGhpcy5kaXNwYXRjaFNjcm9sbEV2ZW50KCk7XG59O1xuXG5wcm90by5zZXRUcmFuc2xhdGVYID0gZnVuY3Rpb24oIHgsIGlzM2QgKSB7XG4gIHggKz0gdGhpcy5jdXJzb3JQb3NpdGlvbjtcbiAgLy8gcmV2ZXJzZSBpZiByaWdodC10by1sZWZ0IGFuZCB1c2luZyB0cmFuc2Zvcm1cbiAgeCA9IHRoaXMub3B0aW9ucy5yaWdodFRvTGVmdCA/IC14IDogeDtcbiAgdmFyIHRyYW5zbGF0ZVggPSB0aGlzLmdldFBvc2l0aW9uVmFsdWUoIHggKTtcbiAgLy8gdXNlIDNEIHRyYW5mb3JtcyBmb3IgaGFyZHdhcmUgYWNjZWxlcmF0aW9uIG9uIGlPU1xuICAvLyBidXQgdXNlIDJEIHdoZW4gc2V0dGxlZCwgZm9yIGJldHRlciBmb250LXJlbmRlcmluZ1xuICB0aGlzLnNsaWRlci5zdHlsZS50cmFuc2Zvcm0gPSBpczNkID9cbiAgICAndHJhbnNsYXRlM2QoJyArIHRyYW5zbGF0ZVggKyAnLDAsMCknIDogJ3RyYW5zbGF0ZVgoJyArIHRyYW5zbGF0ZVggKyAnKSc7XG59O1xuXG5wcm90by5kaXNwYXRjaFNjcm9sbEV2ZW50ID0gZnVuY3Rpb24oKSB7XG4gIHZhciBmaXJzdFNsaWRlID0gdGhpcy5zbGlkZXNbMF07XG4gIGlmICggIWZpcnN0U2xpZGUgKSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIHZhciBwb3NpdGlvblggPSAtdGhpcy54IC0gZmlyc3RTbGlkZS50YXJnZXQ7XG4gIHZhciBwcm9ncmVzcyA9IHBvc2l0aW9uWCAvIHRoaXMuc2xpZGVzV2lkdGg7XG4gIHRoaXMuZGlzcGF0Y2hFdmVudCggJ3Njcm9sbCcsIG51bGwsIFsgcHJvZ3Jlc3MsIHBvc2l0aW9uWCBdICk7XG59O1xuXG5wcm90by5wb3NpdGlvblNsaWRlckF0U2VsZWN0ZWQgPSBmdW5jdGlvbigpIHtcbiAgaWYgKCAhdGhpcy5jZWxscy5sZW5ndGggKSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIHRoaXMueCA9IC10aGlzLnNlbGVjdGVkU2xpZGUudGFyZ2V0O1xuICB0aGlzLnZlbG9jaXR5ID0gMDsgLy8gc3RvcCB3b2JibGVcbiAgdGhpcy5wb3NpdGlvblNsaWRlcigpO1xufTtcblxucHJvdG8uZ2V0UG9zaXRpb25WYWx1ZSA9IGZ1bmN0aW9uKCBwb3NpdGlvbiApIHtcbiAgaWYgKCB0aGlzLm9wdGlvbnMucGVyY2VudFBvc2l0aW9uICkge1xuICAgIC8vIHBlcmNlbnQgcG9zaXRpb24sIHJvdW5kIHRvIDIgZGlnaXRzLCBsaWtlIDEyLjM0JVxuICAgIHJldHVybiAoIE1hdGgucm91bmQoICggcG9zaXRpb24gLyB0aGlzLnNpemUuaW5uZXJXaWR0aCApICogMTAwMDAgKSAqIDAuMDEgKSsgJyUnO1xuICB9IGVsc2Uge1xuICAgIC8vIHBpeGVsIHBvc2l0aW9uaW5nXG4gICAgcmV0dXJuIE1hdGgucm91bmQoIHBvc2l0aW9uICkgKyAncHgnO1xuICB9XG59O1xuXG5wcm90by5zZXR0bGUgPSBmdW5jdGlvbiggcHJldmlvdXNYICkge1xuICAvLyBrZWVwIHRyYWNrIG9mIGZyYW1lcyB3aGVyZSB4IGhhc24ndCBtb3ZlZFxuICBpZiAoICF0aGlzLmlzUG9pbnRlckRvd24gJiYgTWF0aC5yb3VuZCggdGhpcy54ICogMTAwICkgPT0gTWF0aC5yb3VuZCggcHJldmlvdXNYICogMTAwICkgKSB7XG4gICAgdGhpcy5yZXN0aW5nRnJhbWVzKys7XG4gIH1cbiAgLy8gc3RvcCBhbmltYXRpbmcgaWYgcmVzdGluZyBmb3IgMyBvciBtb3JlIGZyYW1lc1xuICBpZiAoIHRoaXMucmVzdGluZ0ZyYW1lcyA+IDIgKSB7XG4gICAgdGhpcy5pc0FuaW1hdGluZyA9IGZhbHNlO1xuICAgIGRlbGV0ZSB0aGlzLmlzRnJlZVNjcm9sbGluZztcbiAgICAvLyByZW5kZXIgcG9zaXRpb24gd2l0aCB0cmFuc2xhdGVYIHdoZW4gc2V0dGxlZFxuICAgIHRoaXMucG9zaXRpb25TbGlkZXIoKTtcbiAgICB0aGlzLmRpc3BhdGNoRXZlbnQoICdzZXR0bGUnLCBudWxsLCBbIHRoaXMuc2VsZWN0ZWRJbmRleCBdICk7XG4gIH1cbn07XG5cbnByb3RvLnNoaWZ0V3JhcENlbGxzID0gZnVuY3Rpb24oIHggKSB7XG4gIC8vIHNoaWZ0IGJlZm9yZSBjZWxsc1xuICB2YXIgYmVmb3JlR2FwID0gdGhpcy5jdXJzb3JQb3NpdGlvbiArIHg7XG4gIHRoaXMuX3NoaWZ0Q2VsbHMoIHRoaXMuYmVmb3JlU2hpZnRDZWxscywgYmVmb3JlR2FwLCAtMSApO1xuICAvLyBzaGlmdCBhZnRlciBjZWxsc1xuICB2YXIgYWZ0ZXJHYXAgPSB0aGlzLnNpemUuaW5uZXJXaWR0aCAtICggeCArIHRoaXMuc2xpZGVhYmxlV2lkdGggKyB0aGlzLmN1cnNvclBvc2l0aW9uICk7XG4gIHRoaXMuX3NoaWZ0Q2VsbHMoIHRoaXMuYWZ0ZXJTaGlmdENlbGxzLCBhZnRlckdhcCwgMSApO1xufTtcblxucHJvdG8uX3NoaWZ0Q2VsbHMgPSBmdW5jdGlvbiggY2VsbHMsIGdhcCwgc2hpZnQgKSB7XG4gIGZvciAoIHZhciBpPTA7IGkgPCBjZWxscy5sZW5ndGg7IGkrKyApIHtcbiAgICB2YXIgY2VsbCA9IGNlbGxzW2ldO1xuICAgIHZhciBjZWxsU2hpZnQgPSBnYXAgPiAwID8gc2hpZnQgOiAwO1xuICAgIGNlbGwud3JhcFNoaWZ0KCBjZWxsU2hpZnQgKTtcbiAgICBnYXAgLT0gY2VsbC5zaXplLm91dGVyV2lkdGg7XG4gIH1cbn07XG5cbnByb3RvLl91bnNoaWZ0Q2VsbHMgPSBmdW5jdGlvbiggY2VsbHMgKSB7XG4gIGlmICggIWNlbGxzIHx8ICFjZWxscy5sZW5ndGggKSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIGZvciAoIHZhciBpPTA7IGkgPCBjZWxscy5sZW5ndGg7IGkrKyApIHtcbiAgICBjZWxsc1tpXS53cmFwU2hpZnQoIDAgKTtcbiAgfVxufTtcblxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gcGh5c2ljcyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAvL1xuXG5wcm90by5pbnRlZ3JhdGVQaHlzaWNzID0gZnVuY3Rpb24oKSB7XG4gIHRoaXMueCArPSB0aGlzLnZlbG9jaXR5O1xuICB0aGlzLnZlbG9jaXR5ICo9IHRoaXMuZ2V0RnJpY3Rpb25GYWN0b3IoKTtcbn07XG5cbnByb3RvLmFwcGx5Rm9yY2UgPSBmdW5jdGlvbiggZm9yY2UgKSB7XG4gIHRoaXMudmVsb2NpdHkgKz0gZm9yY2U7XG59O1xuXG5wcm90by5nZXRGcmljdGlvbkZhY3RvciA9IGZ1bmN0aW9uKCkge1xuICByZXR1cm4gMSAtIHRoaXMub3B0aW9uc1sgdGhpcy5pc0ZyZWVTY3JvbGxpbmcgPyAnZnJlZVNjcm9sbEZyaWN0aW9uJyA6ICdmcmljdGlvbicgXTtcbn07XG5cbnByb3RvLmdldFJlc3RpbmdQb3NpdGlvbiA9IGZ1bmN0aW9uKCkge1xuICAvLyBteSB0aGFua3MgdG8gU3RldmVuIFdpdHRlbnMsIHdobyBzaW1wbGlmaWVkIHRoaXMgbWF0aCBncmVhdGx5XG4gIHJldHVybiB0aGlzLnggKyB0aGlzLnZlbG9jaXR5IC8gKCAxIC0gdGhpcy5nZXRGcmljdGlvbkZhY3RvcigpICk7XG59O1xuXG5wcm90by5hcHBseURyYWdGb3JjZSA9IGZ1bmN0aW9uKCkge1xuICBpZiAoICF0aGlzLmlzRHJhZ2dhYmxlIHx8ICF0aGlzLmlzUG9pbnRlckRvd24gKSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIC8vIGNoYW5nZSB0aGUgcG9zaXRpb24gdG8gZHJhZyBwb3NpdGlvbiBieSBhcHBseWluZyBmb3JjZVxuICB2YXIgZHJhZ1ZlbG9jaXR5ID0gdGhpcy5kcmFnWCAtIHRoaXMueDtcbiAgdmFyIGRyYWdGb3JjZSA9IGRyYWdWZWxvY2l0eSAtIHRoaXMudmVsb2NpdHk7XG4gIHRoaXMuYXBwbHlGb3JjZSggZHJhZ0ZvcmNlICk7XG59O1xuXG5wcm90by5hcHBseVNlbGVjdGVkQXR0cmFjdGlvbiA9IGZ1bmN0aW9uKCkge1xuICAvLyBkbyBub3QgYXR0cmFjdCBpZiBwb2ludGVyIGRvd24gb3Igbm8gc2xpZGVzXG4gIHZhciBkcmFnRG93biA9IHRoaXMuaXNEcmFnZ2FibGUgJiYgdGhpcy5pc1BvaW50ZXJEb3duO1xuICBpZiAoIGRyYWdEb3duIHx8IHRoaXMuaXNGcmVlU2Nyb2xsaW5nIHx8ICF0aGlzLnNsaWRlcy5sZW5ndGggKSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIHZhciBkaXN0YW5jZSA9IHRoaXMuc2VsZWN0ZWRTbGlkZS50YXJnZXQgKiAtMSAtIHRoaXMueDtcbiAgdmFyIGZvcmNlID0gZGlzdGFuY2UgKiB0aGlzLm9wdGlvbnMuc2VsZWN0ZWRBdHRyYWN0aW9uO1xuICB0aGlzLmFwcGx5Rm9yY2UoIGZvcmNlICk7XG59O1xuXG5yZXR1cm4gcHJvdG87XG5cbn0pKTtcbiIsIi8vIEZsaWNraXR5LkNlbGxcbiggZnVuY3Rpb24oIHdpbmRvdywgZmFjdG9yeSApIHtcbiAgLy8gdW5pdmVyc2FsIG1vZHVsZSBkZWZpbml0aW9uXG4gIC8qIGpzaGludCBzdHJpY3Q6IGZhbHNlICovXG4gIGlmICggdHlwZW9mIGRlZmluZSA9PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQgKSB7XG4gICAgLy8gQU1EXG4gICAgZGVmaW5lKCBbXG4gICAgICAnZ2V0LXNpemUvZ2V0LXNpemUnXG4gICAgXSwgZnVuY3Rpb24oIGdldFNpemUgKSB7XG4gICAgICByZXR1cm4gZmFjdG9yeSggd2luZG93LCBnZXRTaXplICk7XG4gICAgfSk7XG4gIH0gZWxzZSBpZiAoIHR5cGVvZiBtb2R1bGUgPT0gJ29iamVjdCcgJiYgbW9kdWxlLmV4cG9ydHMgKSB7XG4gICAgLy8gQ29tbW9uSlNcbiAgICBtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkoXG4gICAgICB3aW5kb3csXG4gICAgICByZXF1aXJlKCdnZXQtc2l6ZScpXG4gICAgKTtcbiAgfSBlbHNlIHtcbiAgICAvLyBicm93c2VyIGdsb2JhbFxuICAgIHdpbmRvdy5GbGlja2l0eSA9IHdpbmRvdy5GbGlja2l0eSB8fCB7fTtcbiAgICB3aW5kb3cuRmxpY2tpdHkuQ2VsbCA9IGZhY3RvcnkoXG4gICAgICB3aW5kb3csXG4gICAgICB3aW5kb3cuZ2V0U2l6ZVxuICAgICk7XG4gIH1cblxufSggd2luZG93LCBmdW5jdGlvbiBmYWN0b3J5KCB3aW5kb3csIGdldFNpemUgKSB7XG5cbid1c2Ugc3RyaWN0JztcblxuZnVuY3Rpb24gQ2VsbCggZWxlbSwgcGFyZW50ICkge1xuICB0aGlzLmVsZW1lbnQgPSBlbGVtO1xuICB0aGlzLnBhcmVudCA9IHBhcmVudDtcblxuICB0aGlzLmNyZWF0ZSgpO1xufVxuXG52YXIgcHJvdG8gPSBDZWxsLnByb3RvdHlwZTtcblxucHJvdG8uY3JlYXRlID0gZnVuY3Rpb24oKSB7XG4gIHRoaXMuZWxlbWVudC5zdHlsZS5wb3NpdGlvbiA9ICdhYnNvbHV0ZSc7XG4gIHRoaXMuZWxlbWVudC5zZXRBdHRyaWJ1dGUoICdhcmlhLWhpZGRlbicsICd0cnVlJyApO1xuICB0aGlzLnggPSAwO1xuICB0aGlzLnNoaWZ0ID0gMDtcbn07XG5cbnByb3RvLmRlc3Ryb3kgPSBmdW5jdGlvbigpIHtcbiAgLy8gcmVzZXQgc3R5bGVcbiAgdGhpcy51bnNlbGVjdCgpO1xuICB0aGlzLmVsZW1lbnQuc3R5bGUucG9zaXRpb24gPSAnJztcbiAgdmFyIHNpZGUgPSB0aGlzLnBhcmVudC5vcmlnaW5TaWRlO1xuICB0aGlzLmVsZW1lbnQuc3R5bGVbIHNpZGUgXSA9ICcnO1xufTtcblxucHJvdG8uZ2V0U2l6ZSA9IGZ1bmN0aW9uKCkge1xuICB0aGlzLnNpemUgPSBnZXRTaXplKCB0aGlzLmVsZW1lbnQgKTtcbn07XG5cbnByb3RvLnNldFBvc2l0aW9uID0gZnVuY3Rpb24oIHggKSB7XG4gIHRoaXMueCA9IHg7XG4gIHRoaXMudXBkYXRlVGFyZ2V0KCk7XG4gIHRoaXMucmVuZGVyUG9zaXRpb24oIHggKTtcbn07XG5cbi8vIHNldERlZmF1bHRUYXJnZXQgdjEgbWV0aG9kLCBiYWNrd2FyZHMgY29tcGF0aWJpbGl0eSwgcmVtb3ZlIGluIHYzXG5wcm90by51cGRhdGVUYXJnZXQgPSBwcm90by5zZXREZWZhdWx0VGFyZ2V0ID0gZnVuY3Rpb24oKSB7XG4gIHZhciBtYXJnaW5Qcm9wZXJ0eSA9IHRoaXMucGFyZW50Lm9yaWdpblNpZGUgPT0gJ2xlZnQnID8gJ21hcmdpbkxlZnQnIDogJ21hcmdpblJpZ2h0JztcbiAgdGhpcy50YXJnZXQgPSB0aGlzLnggKyB0aGlzLnNpemVbIG1hcmdpblByb3BlcnR5IF0gK1xuICAgIHRoaXMuc2l6ZS53aWR0aCAqIHRoaXMucGFyZW50LmNlbGxBbGlnbjtcbn07XG5cbnByb3RvLnJlbmRlclBvc2l0aW9uID0gZnVuY3Rpb24oIHggKSB7XG4gIC8vIHJlbmRlciBwb3NpdGlvbiBvZiBjZWxsIHdpdGggaW4gc2xpZGVyXG4gIHZhciBzaWRlID0gdGhpcy5wYXJlbnQub3JpZ2luU2lkZTtcbiAgdGhpcy5lbGVtZW50LnN0eWxlWyBzaWRlIF0gPSB0aGlzLnBhcmVudC5nZXRQb3NpdGlvblZhbHVlKCB4ICk7XG59O1xuXG5wcm90by5zZWxlY3QgPSBmdW5jdGlvbigpIHtcbiAgdGhpcy5lbGVtZW50LmNsYXNzTGlzdC5hZGQoJ2lzLXNlbGVjdGVkJyk7XG4gIHRoaXMuZWxlbWVudC5yZW1vdmVBdHRyaWJ1dGUoJ2FyaWEtaGlkZGVuJyk7XG59O1xuXG5wcm90by51bnNlbGVjdCA9IGZ1bmN0aW9uKCkge1xuICB0aGlzLmVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZSgnaXMtc2VsZWN0ZWQnKTtcbiAgdGhpcy5lbGVtZW50LnNldEF0dHJpYnV0ZSggJ2FyaWEtaGlkZGVuJywgJ3RydWUnICk7XG59O1xuXG4vKipcbiAqIEBwYXJhbSB7SW50ZWdlcn0gZmFjdG9yIC0gMCwgMSwgb3IgLTFcbioqL1xucHJvdG8ud3JhcFNoaWZ0ID0gZnVuY3Rpb24oIHNoaWZ0ICkge1xuICB0aGlzLnNoaWZ0ID0gc2hpZnQ7XG4gIHRoaXMucmVuZGVyUG9zaXRpb24oIHRoaXMueCArIHRoaXMucGFyZW50LnNsaWRlYWJsZVdpZHRoICogc2hpZnQgKTtcbn07XG5cbnByb3RvLnJlbW92ZSA9IGZ1bmN0aW9uKCkge1xuICB0aGlzLmVsZW1lbnQucGFyZW50Tm9kZS5yZW1vdmVDaGlsZCggdGhpcy5lbGVtZW50ICk7XG59O1xuXG5yZXR1cm4gQ2VsbDtcblxufSkpO1xuIiwiLy8gZHJhZ1xuKCBmdW5jdGlvbiggd2luZG93LCBmYWN0b3J5ICkge1xuICAvLyB1bml2ZXJzYWwgbW9kdWxlIGRlZmluaXRpb25cbiAgLyoganNoaW50IHN0cmljdDogZmFsc2UgKi9cbiAgaWYgKCB0eXBlb2YgZGVmaW5lID09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZCApIHtcbiAgICAvLyBBTURcbiAgICBkZWZpbmUoIFtcbiAgICAgICcuL2ZsaWNraXR5JyxcbiAgICAgICd1bmlkcmFnZ2VyL3VuaWRyYWdnZXInLFxuICAgICAgJ2Zpenp5LXVpLXV0aWxzL3V0aWxzJ1xuICAgIF0sIGZ1bmN0aW9uKCBGbGlja2l0eSwgVW5pZHJhZ2dlciwgdXRpbHMgKSB7XG4gICAgICByZXR1cm4gZmFjdG9yeSggd2luZG93LCBGbGlja2l0eSwgVW5pZHJhZ2dlciwgdXRpbHMgKTtcbiAgICB9KTtcbiAgfSBlbHNlIGlmICggdHlwZW9mIG1vZHVsZSA9PSAnb2JqZWN0JyAmJiBtb2R1bGUuZXhwb3J0cyApIHtcbiAgICAvLyBDb21tb25KU1xuICAgIG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeShcbiAgICAgIHdpbmRvdyxcbiAgICAgIHJlcXVpcmUoJy4vZmxpY2tpdHknKSxcbiAgICAgIHJlcXVpcmUoJ3VuaWRyYWdnZXInKSxcbiAgICAgIHJlcXVpcmUoJ2Zpenp5LXVpLXV0aWxzJylcbiAgICApO1xuICB9IGVsc2Uge1xuICAgIC8vIGJyb3dzZXIgZ2xvYmFsXG4gICAgd2luZG93LkZsaWNraXR5ID0gZmFjdG9yeShcbiAgICAgIHdpbmRvdyxcbiAgICAgIHdpbmRvdy5GbGlja2l0eSxcbiAgICAgIHdpbmRvdy5VbmlkcmFnZ2VyLFxuICAgICAgd2luZG93LmZpenp5VUlVdGlsc1xuICAgICk7XG4gIH1cblxufSggd2luZG93LCBmdW5jdGlvbiBmYWN0b3J5KCB3aW5kb3csIEZsaWNraXR5LCBVbmlkcmFnZ2VyLCB1dGlscyApIHtcblxuJ3VzZSBzdHJpY3QnO1xuXG4vLyAtLS0tLSBkZWZhdWx0cyAtLS0tLSAvL1xuXG51dGlscy5leHRlbmQoIEZsaWNraXR5LmRlZmF1bHRzLCB7XG4gIGRyYWdnYWJsZTogJz4xJyxcbiAgZHJhZ1RocmVzaG9sZDogMyxcbn0pO1xuXG4vLyAtLS0tLSBjcmVhdGUgLS0tLS0gLy9cblxuRmxpY2tpdHkuY3JlYXRlTWV0aG9kcy5wdXNoKCdfY3JlYXRlRHJhZycpO1xuXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSBkcmFnIHByb3RvdHlwZSAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAvL1xuXG52YXIgcHJvdG8gPSBGbGlja2l0eS5wcm90b3R5cGU7XG51dGlscy5leHRlbmQoIHByb3RvLCBVbmlkcmFnZ2VyLnByb3RvdHlwZSApO1xucHJvdG8uX3RvdWNoQWN0aW9uVmFsdWUgPSAncGFuLXknO1xuXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gLy9cblxudmFyIGlzVG91Y2ggPSAnY3JlYXRlVG91Y2gnIGluIGRvY3VtZW50O1xudmFyIGlzVG91Y2htb3ZlU2Nyb2xsQ2FuY2VsZWQgPSBmYWxzZTtcblxucHJvdG8uX2NyZWF0ZURyYWcgPSBmdW5jdGlvbigpIHtcbiAgdGhpcy5vbiggJ2FjdGl2YXRlJywgdGhpcy5vbkFjdGl2YXRlRHJhZyApO1xuICB0aGlzLm9uKCAndWlDaGFuZ2UnLCB0aGlzLl91aUNoYW5nZURyYWcgKTtcbiAgdGhpcy5vbiggJ2RlYWN0aXZhdGUnLCB0aGlzLm9uRGVhY3RpdmF0ZURyYWcgKTtcbiAgdGhpcy5vbiggJ2NlbGxDaGFuZ2UnLCB0aGlzLnVwZGF0ZURyYWdnYWJsZSApO1xuICAvLyBUT0RPIHVwZGF0ZURyYWdnYWJsZSBvbiByZXNpemU/IGlmIGdyb3VwQ2VsbHMgJiBzbGlkZXMgY2hhbmdlXG4gIC8vIEhBQ0sgLSBhZGQgc2VlbWluZ2x5IGlubm9jdW91cyBoYW5kbGVyIHRvIGZpeCBpT1MgMTAgc2Nyb2xsIGJlaGF2aW9yXG4gIC8vICM0NTcsIFJ1YmFYYS9Tb3J0YWJsZSM5NzNcbiAgaWYgKCBpc1RvdWNoICYmICFpc1RvdWNobW92ZVNjcm9sbENhbmNlbGVkICkge1xuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCAndG91Y2htb3ZlJywgZnVuY3Rpb24oKSB7fSk7XG4gICAgaXNUb3VjaG1vdmVTY3JvbGxDYW5jZWxlZCA9IHRydWU7XG4gIH1cbn07XG5cbnByb3RvLm9uQWN0aXZhdGVEcmFnID0gZnVuY3Rpb24oKSB7XG4gIHRoaXMuaGFuZGxlcyA9IFsgdGhpcy52aWV3cG9ydCBdO1xuICB0aGlzLmJpbmRIYW5kbGVzKCk7XG4gIHRoaXMudXBkYXRlRHJhZ2dhYmxlKCk7XG59O1xuXG5wcm90by5vbkRlYWN0aXZhdGVEcmFnID0gZnVuY3Rpb24oKSB7XG4gIHRoaXMudW5iaW5kSGFuZGxlcygpO1xuICB0aGlzLmVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZSgnaXMtZHJhZ2dhYmxlJyk7XG59O1xuXG5wcm90by51cGRhdGVEcmFnZ2FibGUgPSBmdW5jdGlvbigpIHtcbiAgLy8gZGlzYWJsZSBkcmFnZ2luZyBpZiBsZXNzIHRoYW4gMiBzbGlkZXMuICMyNzhcbiAgaWYgKCB0aGlzLm9wdGlvbnMuZHJhZ2dhYmxlID09ICc+MScgKSB7XG4gICAgdGhpcy5pc0RyYWdnYWJsZSA9IHRoaXMuc2xpZGVzLmxlbmd0aCA+IDE7XG4gIH0gZWxzZSB7XG4gICAgdGhpcy5pc0RyYWdnYWJsZSA9IHRoaXMub3B0aW9ucy5kcmFnZ2FibGU7XG4gIH1cbiAgaWYgKCB0aGlzLmlzRHJhZ2dhYmxlICkge1xuICAgIHRoaXMuZWxlbWVudC5jbGFzc0xpc3QuYWRkKCdpcy1kcmFnZ2FibGUnKTtcbiAgfSBlbHNlIHtcbiAgICB0aGlzLmVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZSgnaXMtZHJhZ2dhYmxlJyk7XG4gIH1cbn07XG5cbi8vIGJhY2t3YXJkcyBjb21wYXRpYmlsaXR5XG5wcm90by5iaW5kRHJhZyA9IGZ1bmN0aW9uKCkge1xuICB0aGlzLm9wdGlvbnMuZHJhZ2dhYmxlID0gdHJ1ZTtcbiAgdGhpcy51cGRhdGVEcmFnZ2FibGUoKTtcbn07XG5cbnByb3RvLnVuYmluZERyYWcgPSBmdW5jdGlvbigpIHtcbiAgdGhpcy5vcHRpb25zLmRyYWdnYWJsZSA9IGZhbHNlO1xuICB0aGlzLnVwZGF0ZURyYWdnYWJsZSgpO1xufTtcblxucHJvdG8uX3VpQ2hhbmdlRHJhZyA9IGZ1bmN0aW9uKCkge1xuICBkZWxldGUgdGhpcy5pc0ZyZWVTY3JvbGxpbmc7XG59O1xuXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSBwb2ludGVyIGV2ZW50cyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAvL1xuXG5wcm90by5wb2ludGVyRG93biA9IGZ1bmN0aW9uKCBldmVudCwgcG9pbnRlciApIHtcbiAgaWYgKCAhdGhpcy5pc0RyYWdnYWJsZSApIHtcbiAgICB0aGlzLl9wb2ludGVyRG93bkRlZmF1bHQoIGV2ZW50LCBwb2ludGVyICk7XG4gICAgcmV0dXJuO1xuICB9XG4gIHZhciBpc09rYXkgPSB0aGlzLm9rYXlQb2ludGVyRG93biggZXZlbnQgKTtcbiAgaWYgKCAhaXNPa2F5ICkge1xuICAgIHJldHVybjtcbiAgfVxuXG4gIHRoaXMuX3BvaW50ZXJEb3duUHJldmVudERlZmF1bHQoIGV2ZW50ICk7XG4gIHRoaXMucG9pbnRlckRvd25Gb2N1cyggZXZlbnQgKTtcbiAgLy8gYmx1clxuICBpZiAoIGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQgIT0gdGhpcy5lbGVtZW50ICkge1xuICAgIC8vIGRvIG5vdCBibHVyIGlmIGFscmVhZHkgZm9jdXNlZFxuICAgIHRoaXMucG9pbnRlckRvd25CbHVyKCk7XG4gIH1cblxuICAvLyBzdG9wIGlmIGl0IHdhcyBtb3ZpbmdcbiAgdGhpcy5kcmFnWCA9IHRoaXMueDtcbiAgdGhpcy52aWV3cG9ydC5jbGFzc0xpc3QuYWRkKCdpcy1wb2ludGVyLWRvd24nKTtcbiAgLy8gdHJhY2sgc2Nyb2xsaW5nXG4gIHRoaXMucG9pbnRlckRvd25TY3JvbGwgPSBnZXRTY3JvbGxQb3NpdGlvbigpO1xuICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lciggJ3Njcm9sbCcsIHRoaXMgKTtcblxuICB0aGlzLl9wb2ludGVyRG93bkRlZmF1bHQoIGV2ZW50LCBwb2ludGVyICk7XG59O1xuXG4vLyBkZWZhdWx0IHBvaW50ZXJEb3duIGxvZ2ljLCB1c2VkIGZvciBzdGF0aWNDbGlja1xucHJvdG8uX3BvaW50ZXJEb3duRGVmYXVsdCA9IGZ1bmN0aW9uKCBldmVudCwgcG9pbnRlciApIHtcbiAgLy8gdHJhY2sgc3RhcnQgZXZlbnQgcG9zaXRpb25cbiAgLy8gU2FmYXJpIDkgb3ZlcnJpZGVzIHBhZ2VYIGFuZCBwYWdlWS4gVGhlc2UgdmFsdWVzIG5lZWRzIHRvIGJlIGNvcGllZC4gIzc3OVxuICB0aGlzLnBvaW50ZXJEb3duUG9pbnRlciA9IHtcbiAgICBwYWdlWDogcG9pbnRlci5wYWdlWCxcbiAgICBwYWdlWTogcG9pbnRlci5wYWdlWSxcbiAgfTtcbiAgLy8gYmluZCBtb3ZlIGFuZCBlbmQgZXZlbnRzXG4gIHRoaXMuX2JpbmRQb3N0U3RhcnRFdmVudHMoIGV2ZW50ICk7XG4gIHRoaXMuZGlzcGF0Y2hFdmVudCggJ3BvaW50ZXJEb3duJywgZXZlbnQsIFsgcG9pbnRlciBdICk7XG59O1xuXG52YXIgZm9jdXNOb2RlcyA9IHtcbiAgSU5QVVQ6IHRydWUsXG4gIFRFWFRBUkVBOiB0cnVlLFxuICBTRUxFQ1Q6IHRydWUsXG59O1xuXG5wcm90by5wb2ludGVyRG93bkZvY3VzID0gZnVuY3Rpb24oIGV2ZW50ICkge1xuICB2YXIgaXNGb2N1c05vZGUgPSBmb2N1c05vZGVzWyBldmVudC50YXJnZXQubm9kZU5hbWUgXTtcbiAgaWYgKCAhaXNGb2N1c05vZGUgKSB7XG4gICAgdGhpcy5mb2N1cygpO1xuICB9XG59O1xuXG5wcm90by5fcG9pbnRlckRvd25QcmV2ZW50RGVmYXVsdCA9IGZ1bmN0aW9uKCBldmVudCApIHtcbiAgdmFyIGlzVG91Y2hTdGFydCA9IGV2ZW50LnR5cGUgPT0gJ3RvdWNoc3RhcnQnO1xuICB2YXIgaXNUb3VjaFBvaW50ZXIgPSBldmVudC5wb2ludGVyVHlwZSA9PSAndG91Y2gnO1xuICB2YXIgaXNGb2N1c05vZGUgPSBmb2N1c05vZGVzWyBldmVudC50YXJnZXQubm9kZU5hbWUgXTtcbiAgaWYgKCAhaXNUb3VjaFN0YXJ0ICYmICFpc1RvdWNoUG9pbnRlciAmJiAhaXNGb2N1c05vZGUgKSB7XG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgfVxufTtcblxuLy8gLS0tLS0gbW92ZSAtLS0tLSAvL1xuXG5wcm90by5oYXNEcmFnU3RhcnRlZCA9IGZ1bmN0aW9uKCBtb3ZlVmVjdG9yICkge1xuICByZXR1cm4gTWF0aC5hYnMoIG1vdmVWZWN0b3IueCApID4gdGhpcy5vcHRpb25zLmRyYWdUaHJlc2hvbGQ7XG59O1xuXG4vLyAtLS0tLSB1cCAtLS0tLSAvL1xuXG5wcm90by5wb2ludGVyVXAgPSBmdW5jdGlvbiggZXZlbnQsIHBvaW50ZXIgKSB7XG4gIGRlbGV0ZSB0aGlzLmlzVG91Y2hTY3JvbGxpbmc7XG4gIHRoaXMudmlld3BvcnQuY2xhc3NMaXN0LnJlbW92ZSgnaXMtcG9pbnRlci1kb3duJyk7XG4gIHRoaXMuZGlzcGF0Y2hFdmVudCggJ3BvaW50ZXJVcCcsIGV2ZW50LCBbIHBvaW50ZXIgXSApO1xuICB0aGlzLl9kcmFnUG9pbnRlclVwKCBldmVudCwgcG9pbnRlciApO1xufTtcblxucHJvdG8ucG9pbnRlckRvbmUgPSBmdW5jdGlvbigpIHtcbiAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoICdzY3JvbGwnLCB0aGlzICk7XG4gIGRlbGV0ZSB0aGlzLnBvaW50ZXJEb3duU2Nyb2xsO1xufTtcblxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gZHJhZ2dpbmcgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gLy9cblxucHJvdG8uZHJhZ1N0YXJ0ID0gZnVuY3Rpb24oIGV2ZW50LCBwb2ludGVyICkge1xuICBpZiAoICF0aGlzLmlzRHJhZ2dhYmxlICkge1xuICAgIHJldHVybjtcbiAgfVxuICB0aGlzLmRyYWdTdGFydFBvc2l0aW9uID0gdGhpcy54O1xuICB0aGlzLnN0YXJ0QW5pbWF0aW9uKCk7XG4gIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCAnc2Nyb2xsJywgdGhpcyApO1xuICB0aGlzLmRpc3BhdGNoRXZlbnQoICdkcmFnU3RhcnQnLCBldmVudCwgWyBwb2ludGVyIF0gKTtcbn07XG5cbnByb3RvLnBvaW50ZXJNb3ZlID0gZnVuY3Rpb24oIGV2ZW50LCBwb2ludGVyICkge1xuICB2YXIgbW92ZVZlY3RvciA9IHRoaXMuX2RyYWdQb2ludGVyTW92ZSggZXZlbnQsIHBvaW50ZXIgKTtcbiAgdGhpcy5kaXNwYXRjaEV2ZW50KCAncG9pbnRlck1vdmUnLCBldmVudCwgWyBwb2ludGVyLCBtb3ZlVmVjdG9yIF0gKTtcbiAgdGhpcy5fZHJhZ01vdmUoIGV2ZW50LCBwb2ludGVyLCBtb3ZlVmVjdG9yICk7XG59O1xuXG5wcm90by5kcmFnTW92ZSA9IGZ1bmN0aW9uKCBldmVudCwgcG9pbnRlciwgbW92ZVZlY3RvciApIHtcbiAgaWYgKCAhdGhpcy5pc0RyYWdnYWJsZSApIHtcbiAgICByZXR1cm47XG4gIH1cbiAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcblxuICB0aGlzLnByZXZpb3VzRHJhZ1ggPSB0aGlzLmRyYWdYO1xuICAvLyByZXZlcnNlIGlmIHJpZ2h0LXRvLWxlZnRcbiAgdmFyIGRpcmVjdGlvbiA9IHRoaXMub3B0aW9ucy5yaWdodFRvTGVmdCA/IC0xIDogMTtcbiAgaWYgKCB0aGlzLm9wdGlvbnMud3JhcEFyb3VuZCApIHtcbiAgICAvLyB3cmFwIGFyb3VuZCBtb3ZlLiAjNTg5XG4gICAgbW92ZVZlY3Rvci54ID0gbW92ZVZlY3Rvci54ICUgdGhpcy5zbGlkZWFibGVXaWR0aDtcbiAgfVxuICB2YXIgZHJhZ1ggPSB0aGlzLmRyYWdTdGFydFBvc2l0aW9uICsgbW92ZVZlY3Rvci54ICogZGlyZWN0aW9uO1xuXG4gIGlmICggIXRoaXMub3B0aW9ucy53cmFwQXJvdW5kICYmIHRoaXMuc2xpZGVzLmxlbmd0aCApIHtcbiAgICAvLyBzbG93IGRyYWdcbiAgICB2YXIgb3JpZ2luQm91bmQgPSBNYXRoLm1heCggLXRoaXMuc2xpZGVzWzBdLnRhcmdldCwgdGhpcy5kcmFnU3RhcnRQb3NpdGlvbiApO1xuICAgIGRyYWdYID0gZHJhZ1ggPiBvcmlnaW5Cb3VuZCA/ICggZHJhZ1ggKyBvcmlnaW5Cb3VuZCApICogMC41IDogZHJhZ1g7XG4gICAgdmFyIGVuZEJvdW5kID0gTWF0aC5taW4oIC10aGlzLmdldExhc3RTbGlkZSgpLnRhcmdldCwgdGhpcy5kcmFnU3RhcnRQb3NpdGlvbiApO1xuICAgIGRyYWdYID0gZHJhZ1ggPCBlbmRCb3VuZCA/ICggZHJhZ1ggKyBlbmRCb3VuZCApICogMC41IDogZHJhZ1g7XG4gIH1cblxuICB0aGlzLmRyYWdYID0gZHJhZ1g7XG5cbiAgdGhpcy5kcmFnTW92ZVRpbWUgPSBuZXcgRGF0ZSgpO1xuICB0aGlzLmRpc3BhdGNoRXZlbnQoICdkcmFnTW92ZScsIGV2ZW50LCBbIHBvaW50ZXIsIG1vdmVWZWN0b3IgXSApO1xufTtcblxucHJvdG8uZHJhZ0VuZCA9IGZ1bmN0aW9uKCBldmVudCwgcG9pbnRlciApIHtcbiAgaWYgKCAhdGhpcy5pc0RyYWdnYWJsZSApIHtcbiAgICByZXR1cm47XG4gIH1cbiAgaWYgKCB0aGlzLm9wdGlvbnMuZnJlZVNjcm9sbCApIHtcbiAgICB0aGlzLmlzRnJlZVNjcm9sbGluZyA9IHRydWU7XG4gIH1cbiAgLy8gc2V0IHNlbGVjdGVkSW5kZXggYmFzZWQgb24gd2hlcmUgZmxpY2sgd2lsbCBlbmQgdXBcbiAgdmFyIGluZGV4ID0gdGhpcy5kcmFnRW5kUmVzdGluZ1NlbGVjdCgpO1xuXG4gIGlmICggdGhpcy5vcHRpb25zLmZyZWVTY3JvbGwgJiYgIXRoaXMub3B0aW9ucy53cmFwQXJvdW5kICkge1xuICAgIC8vIGlmIGZyZWUtc2Nyb2xsICYgbm90IHdyYXAgYXJvdW5kXG4gICAgLy8gZG8gbm90IGZyZWUtc2Nyb2xsIGlmIGdvaW5nIG91dHNpZGUgb2YgYm91bmRpbmcgc2xpZGVzXG4gICAgLy8gc28gYm91bmRpbmcgc2xpZGVzIGNhbiBhdHRyYWN0IHNsaWRlciwgYW5kIGtlZXAgaXQgaW4gYm91bmRzXG4gICAgdmFyIHJlc3RpbmdYID0gdGhpcy5nZXRSZXN0aW5nUG9zaXRpb24oKTtcbiAgICB0aGlzLmlzRnJlZVNjcm9sbGluZyA9IC1yZXN0aW5nWCA+IHRoaXMuc2xpZGVzWzBdLnRhcmdldCAmJlxuICAgICAgLXJlc3RpbmdYIDwgdGhpcy5nZXRMYXN0U2xpZGUoKS50YXJnZXQ7XG4gIH0gZWxzZSBpZiAoICF0aGlzLm9wdGlvbnMuZnJlZVNjcm9sbCAmJiBpbmRleCA9PSB0aGlzLnNlbGVjdGVkSW5kZXggKSB7XG4gICAgLy8gYm9vc3Qgc2VsZWN0aW9uIGlmIHNlbGVjdGVkIGluZGV4IGhhcyBub3QgY2hhbmdlZFxuICAgIGluZGV4ICs9IHRoaXMuZHJhZ0VuZEJvb3N0U2VsZWN0KCk7XG4gIH1cbiAgZGVsZXRlIHRoaXMucHJldmlvdXNEcmFnWDtcbiAgLy8gYXBwbHkgc2VsZWN0aW9uXG4gIC8vIFRPRE8gcmVmYWN0b3IgdGhpcywgc2VsZWN0aW5nIGhlcmUgZmVlbHMgd2VpcmRcbiAgLy8gSEFDSywgc2V0IGZsYWcgc28gZHJhZ2dpbmcgc3RheXMgaW4gY29ycmVjdCBkaXJlY3Rpb25cbiAgdGhpcy5pc0RyYWdTZWxlY3QgPSB0aGlzLm9wdGlvbnMud3JhcEFyb3VuZDtcbiAgdGhpcy5zZWxlY3QoIGluZGV4ICk7XG4gIGRlbGV0ZSB0aGlzLmlzRHJhZ1NlbGVjdDtcbiAgdGhpcy5kaXNwYXRjaEV2ZW50KCAnZHJhZ0VuZCcsIGV2ZW50LCBbIHBvaW50ZXIgXSApO1xufTtcblxucHJvdG8uZHJhZ0VuZFJlc3RpbmdTZWxlY3QgPSBmdW5jdGlvbigpIHtcbiAgdmFyIHJlc3RpbmdYID0gdGhpcy5nZXRSZXN0aW5nUG9zaXRpb24oKTtcbiAgLy8gaG93IGZhciBhd2F5IGZyb20gc2VsZWN0ZWQgc2xpZGVcbiAgdmFyIGRpc3RhbmNlID0gTWF0aC5hYnMoIHRoaXMuZ2V0U2xpZGVEaXN0YW5jZSggLXJlc3RpbmdYLCB0aGlzLnNlbGVjdGVkSW5kZXggKSApO1xuICAvLyBnZXQgY2xvc2V0IHJlc3RpbmcgZ29pbmcgdXAgYW5kIGdvaW5nIGRvd25cbiAgdmFyIHBvc2l0aXZlUmVzdGluZyA9IHRoaXMuX2dldENsb3Nlc3RSZXN0aW5nKCByZXN0aW5nWCwgZGlzdGFuY2UsIDEgKTtcbiAgdmFyIG5lZ2F0aXZlUmVzdGluZyA9IHRoaXMuX2dldENsb3Nlc3RSZXN0aW5nKCByZXN0aW5nWCwgZGlzdGFuY2UsIC0xICk7XG4gIC8vIHVzZSBjbG9zZXIgcmVzdGluZyBmb3Igd3JhcC1hcm91bmRcbiAgdmFyIGluZGV4ID0gcG9zaXRpdmVSZXN0aW5nLmRpc3RhbmNlIDwgbmVnYXRpdmVSZXN0aW5nLmRpc3RhbmNlID9cbiAgICBwb3NpdGl2ZVJlc3RpbmcuaW5kZXggOiBuZWdhdGl2ZVJlc3RpbmcuaW5kZXg7XG4gIHJldHVybiBpbmRleDtcbn07XG5cbi8qKlxuICogZ2l2ZW4gcmVzdGluZyBYIGFuZCBkaXN0YW5jZSB0byBzZWxlY3RlZCBjZWxsXG4gKiBnZXQgdGhlIGRpc3RhbmNlIGFuZCBpbmRleCBvZiB0aGUgY2xvc2VzdCBjZWxsXG4gKiBAcGFyYW0ge051bWJlcn0gcmVzdGluZ1ggLSBlc3RpbWF0ZWQgcG9zdC1mbGljayByZXN0aW5nIHBvc2l0aW9uXG4gKiBAcGFyYW0ge051bWJlcn0gZGlzdGFuY2UgLSBkaXN0YW5jZSB0byBzZWxlY3RlZCBjZWxsXG4gKiBAcGFyYW0ge0ludGVnZXJ9IGluY3JlbWVudCAtICsxIG9yIC0xLCBnb2luZyB1cCBvciBkb3duXG4gKiBAcmV0dXJucyB7T2JqZWN0fSAtIHsgZGlzdGFuY2U6IHtOdW1iZXJ9LCBpbmRleDoge0ludGVnZXJ9IH1cbiAqL1xucHJvdG8uX2dldENsb3Nlc3RSZXN0aW5nID0gZnVuY3Rpb24oIHJlc3RpbmdYLCBkaXN0YW5jZSwgaW5jcmVtZW50ICkge1xuICB2YXIgaW5kZXggPSB0aGlzLnNlbGVjdGVkSW5kZXg7XG4gIHZhciBtaW5EaXN0YW5jZSA9IEluZmluaXR5O1xuICB2YXIgY29uZGl0aW9uID0gdGhpcy5vcHRpb25zLmNvbnRhaW4gJiYgIXRoaXMub3B0aW9ucy53cmFwQXJvdW5kID9cbiAgICAvLyBpZiBjb250YWluLCBrZWVwIGdvaW5nIGlmIGRpc3RhbmNlIGlzIGVxdWFsIHRvIG1pbkRpc3RhbmNlXG4gICAgZnVuY3Rpb24oIGQsIG1kICkgeyByZXR1cm4gZCA8PSBtZDsgfSA6IGZ1bmN0aW9uKCBkLCBtZCApIHsgcmV0dXJuIGQgPCBtZDsgfTtcbiAgd2hpbGUgKCBjb25kaXRpb24oIGRpc3RhbmNlLCBtaW5EaXN0YW5jZSApICkge1xuICAgIC8vIG1lYXN1cmUgZGlzdGFuY2UgdG8gbmV4dCBjZWxsXG4gICAgaW5kZXggKz0gaW5jcmVtZW50O1xuICAgIG1pbkRpc3RhbmNlID0gZGlzdGFuY2U7XG4gICAgZGlzdGFuY2UgPSB0aGlzLmdldFNsaWRlRGlzdGFuY2UoIC1yZXN0aW5nWCwgaW5kZXggKTtcbiAgICBpZiAoIGRpc3RhbmNlID09PSBudWxsICkge1xuICAgICAgYnJlYWs7XG4gICAgfVxuICAgIGRpc3RhbmNlID0gTWF0aC5hYnMoIGRpc3RhbmNlICk7XG4gIH1cbiAgcmV0dXJuIHtcbiAgICBkaXN0YW5jZTogbWluRGlzdGFuY2UsXG4gICAgLy8gc2VsZWN0ZWQgd2FzIHByZXZpb3VzIGluZGV4XG4gICAgaW5kZXg6IGluZGV4IC0gaW5jcmVtZW50XG4gIH07XG59O1xuXG4vKipcbiAqIG1lYXN1cmUgZGlzdGFuY2UgYmV0d2VlbiB4IGFuZCBhIHNsaWRlIHRhcmdldFxuICogQHBhcmFtIHtOdW1iZXJ9IHhcbiAqIEBwYXJhbSB7SW50ZWdlcn0gaW5kZXggLSBzbGlkZSBpbmRleFxuICovXG5wcm90by5nZXRTbGlkZURpc3RhbmNlID0gZnVuY3Rpb24oIHgsIGluZGV4ICkge1xuICB2YXIgbGVuID0gdGhpcy5zbGlkZXMubGVuZ3RoO1xuICAvLyB3cmFwIGFyb3VuZCBpZiBhdCBsZWFzdCAyIHNsaWRlc1xuICB2YXIgaXNXcmFwQXJvdW5kID0gdGhpcy5vcHRpb25zLndyYXBBcm91bmQgJiYgbGVuID4gMTtcbiAgdmFyIHNsaWRlSW5kZXggPSBpc1dyYXBBcm91bmQgPyB1dGlscy5tb2R1bG8oIGluZGV4LCBsZW4gKSA6IGluZGV4O1xuICB2YXIgc2xpZGUgPSB0aGlzLnNsaWRlc1sgc2xpZGVJbmRleCBdO1xuICBpZiAoICFzbGlkZSApIHtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuICAvLyBhZGQgZGlzdGFuY2UgZm9yIHdyYXAtYXJvdW5kIHNsaWRlc1xuICB2YXIgd3JhcCA9IGlzV3JhcEFyb3VuZCA/IHRoaXMuc2xpZGVhYmxlV2lkdGggKiBNYXRoLmZsb29yKCBpbmRleCAvIGxlbiApIDogMDtcbiAgcmV0dXJuIHggLSAoIHNsaWRlLnRhcmdldCArIHdyYXAgKTtcbn07XG5cbnByb3RvLmRyYWdFbmRCb29zdFNlbGVjdCA9IGZ1bmN0aW9uKCkge1xuICAvLyBkbyBub3QgYm9vc3QgaWYgbm8gcHJldmlvdXNEcmFnWCBvciBkcmFnTW92ZVRpbWVcbiAgaWYgKCB0aGlzLnByZXZpb3VzRHJhZ1ggPT09IHVuZGVmaW5lZCB8fCAhdGhpcy5kcmFnTW92ZVRpbWUgfHxcbiAgICAvLyBvciBpZiBkcmFnIHdhcyBoZWxkIGZvciAxMDAgbXNcbiAgICBuZXcgRGF0ZSgpIC0gdGhpcy5kcmFnTW92ZVRpbWUgPiAxMDAgKSB7XG4gICAgcmV0dXJuIDA7XG4gIH1cblxuICB2YXIgZGlzdGFuY2UgPSB0aGlzLmdldFNsaWRlRGlzdGFuY2UoIC10aGlzLmRyYWdYLCB0aGlzLnNlbGVjdGVkSW5kZXggKTtcbiAgdmFyIGRlbHRhID0gdGhpcy5wcmV2aW91c0RyYWdYIC0gdGhpcy5kcmFnWDtcbiAgaWYgKCBkaXN0YW5jZSA+IDAgJiYgZGVsdGEgPiAwICkge1xuICAgIC8vIGJvb3N0IHRvIG5leHQgaWYgbW92aW5nIHRvd2FyZHMgdGhlIHJpZ2h0LCBhbmQgcG9zaXRpdmUgdmVsb2NpdHlcbiAgICByZXR1cm4gMTtcbiAgfSBlbHNlIGlmICggZGlzdGFuY2UgPCAwICYmIGRlbHRhIDwgMCApIHtcbiAgICAvLyBib29zdCB0byBwcmV2aW91cyBpZiBtb3ZpbmcgdG93YXJkcyB0aGUgbGVmdCwgYW5kIG5lZ2F0aXZlIHZlbG9jaXR5XG4gICAgcmV0dXJuIC0xO1xuICB9XG4gIHJldHVybiAwO1xufTtcblxuLy8gLS0tLS0gc3RhdGljQ2xpY2sgLS0tLS0gLy9cblxucHJvdG8uc3RhdGljQ2xpY2sgPSBmdW5jdGlvbiggZXZlbnQsIHBvaW50ZXIgKSB7XG4gIC8vIGdldCBjbGlja2VkQ2VsbCwgaWYgY2VsbCB3YXMgY2xpY2tlZFxuICB2YXIgY2xpY2tlZENlbGwgPSB0aGlzLmdldFBhcmVudENlbGwoIGV2ZW50LnRhcmdldCApO1xuICB2YXIgY2VsbEVsZW0gPSBjbGlja2VkQ2VsbCAmJiBjbGlja2VkQ2VsbC5lbGVtZW50O1xuICB2YXIgY2VsbEluZGV4ID0gY2xpY2tlZENlbGwgJiYgdGhpcy5jZWxscy5pbmRleE9mKCBjbGlja2VkQ2VsbCApO1xuICB0aGlzLmRpc3BhdGNoRXZlbnQoICdzdGF0aWNDbGljaycsIGV2ZW50LCBbIHBvaW50ZXIsIGNlbGxFbGVtLCBjZWxsSW5kZXggXSApO1xufTtcblxuLy8gLS0tLS0gc2Nyb2xsIC0tLS0tIC8vXG5cbnByb3RvLm9uc2Nyb2xsID0gZnVuY3Rpb24oKSB7XG4gIHZhciBzY3JvbGwgPSBnZXRTY3JvbGxQb3NpdGlvbigpO1xuICB2YXIgc2Nyb2xsTW92ZVggPSB0aGlzLnBvaW50ZXJEb3duU2Nyb2xsLnggLSBzY3JvbGwueDtcbiAgdmFyIHNjcm9sbE1vdmVZID0gdGhpcy5wb2ludGVyRG93blNjcm9sbC55IC0gc2Nyb2xsLnk7XG4gIC8vIGNhbmNlbCBjbGljay90YXAgaWYgc2Nyb2xsIGlzIHRvbyBtdWNoXG4gIGlmICggTWF0aC5hYnMoIHNjcm9sbE1vdmVYICkgPiAzIHx8IE1hdGguYWJzKCBzY3JvbGxNb3ZlWSApID4gMyApIHtcbiAgICB0aGlzLl9wb2ludGVyRG9uZSgpO1xuICB9XG59O1xuXG4vLyAtLS0tLSB1dGlscyAtLS0tLSAvL1xuXG5mdW5jdGlvbiBnZXRTY3JvbGxQb3NpdGlvbigpIHtcbiAgcmV0dXJuIHtcbiAgICB4OiB3aW5kb3cucGFnZVhPZmZzZXQsXG4gICAgeTogd2luZG93LnBhZ2VZT2Zmc2V0XG4gIH07XG59XG5cbi8vIC0tLS0tICAtLS0tLSAvL1xuXG5yZXR1cm4gRmxpY2tpdHk7XG5cbn0pKTtcbiIsIi8vIEZsaWNraXR5IG1haW5cbiggZnVuY3Rpb24oIHdpbmRvdywgZmFjdG9yeSApIHtcbiAgLy8gdW5pdmVyc2FsIG1vZHVsZSBkZWZpbml0aW9uXG4gIC8qIGpzaGludCBzdHJpY3Q6IGZhbHNlICovXG4gIGlmICggdHlwZW9mIGRlZmluZSA9PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQgKSB7XG4gICAgLy8gQU1EXG4gICAgZGVmaW5lKCBbXG4gICAgICAnZXYtZW1pdHRlci9ldi1lbWl0dGVyJyxcbiAgICAgICdnZXQtc2l6ZS9nZXQtc2l6ZScsXG4gICAgICAnZml6enktdWktdXRpbHMvdXRpbHMnLFxuICAgICAgJy4vY2VsbCcsXG4gICAgICAnLi9zbGlkZScsXG4gICAgICAnLi9hbmltYXRlJ1xuICAgIF0sIGZ1bmN0aW9uKCBFdkVtaXR0ZXIsIGdldFNpemUsIHV0aWxzLCBDZWxsLCBTbGlkZSwgYW5pbWF0ZVByb3RvdHlwZSApIHtcbiAgICAgIHJldHVybiBmYWN0b3J5KCB3aW5kb3csIEV2RW1pdHRlciwgZ2V0U2l6ZSwgdXRpbHMsIENlbGwsIFNsaWRlLCBhbmltYXRlUHJvdG90eXBlICk7XG4gICAgfSk7XG4gIH0gZWxzZSBpZiAoIHR5cGVvZiBtb2R1bGUgPT0gJ29iamVjdCcgJiYgbW9kdWxlLmV4cG9ydHMgKSB7XG4gICAgLy8gQ29tbW9uSlNcbiAgICBtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkoXG4gICAgICB3aW5kb3csXG4gICAgICByZXF1aXJlKCdldi1lbWl0dGVyJyksXG4gICAgICByZXF1aXJlKCdnZXQtc2l6ZScpLFxuICAgICAgcmVxdWlyZSgnZml6enktdWktdXRpbHMnKSxcbiAgICAgIHJlcXVpcmUoJy4vY2VsbCcpLFxuICAgICAgcmVxdWlyZSgnLi9zbGlkZScpLFxuICAgICAgcmVxdWlyZSgnLi9hbmltYXRlJylcbiAgICApO1xuICB9IGVsc2Uge1xuICAgIC8vIGJyb3dzZXIgZ2xvYmFsXG4gICAgdmFyIF9GbGlja2l0eSA9IHdpbmRvdy5GbGlja2l0eTtcblxuICAgIHdpbmRvdy5GbGlja2l0eSA9IGZhY3RvcnkoXG4gICAgICB3aW5kb3csXG4gICAgICB3aW5kb3cuRXZFbWl0dGVyLFxuICAgICAgd2luZG93LmdldFNpemUsXG4gICAgICB3aW5kb3cuZml6enlVSVV0aWxzLFxuICAgICAgX0ZsaWNraXR5LkNlbGwsXG4gICAgICBfRmxpY2tpdHkuU2xpZGUsXG4gICAgICBfRmxpY2tpdHkuYW5pbWF0ZVByb3RvdHlwZVxuICAgICk7XG4gIH1cblxufSggd2luZG93LCBmdW5jdGlvbiBmYWN0b3J5KCB3aW5kb3csIEV2RW1pdHRlciwgZ2V0U2l6ZSxcbiAgdXRpbHMsIENlbGwsIFNsaWRlLCBhbmltYXRlUHJvdG90eXBlICkge1xuXG4ndXNlIHN0cmljdCc7XG5cbi8vIHZhcnNcbnZhciBqUXVlcnkgPSB3aW5kb3cualF1ZXJ5O1xudmFyIGdldENvbXB1dGVkU3R5bGUgPSB3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZTtcbnZhciBjb25zb2xlID0gd2luZG93LmNvbnNvbGU7XG5cbmZ1bmN0aW9uIG1vdmVFbGVtZW50cyggZWxlbXMsIHRvRWxlbSApIHtcbiAgZWxlbXMgPSB1dGlscy5tYWtlQXJyYXkoIGVsZW1zICk7XG4gIHdoaWxlICggZWxlbXMubGVuZ3RoICkge1xuICAgIHRvRWxlbS5hcHBlbmRDaGlsZCggZWxlbXMuc2hpZnQoKSApO1xuICB9XG59XG5cbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tIEZsaWNraXR5IC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tIC8vXG5cbi8vIGdsb2JhbGx5IHVuaXF1ZSBpZGVudGlmaWVyc1xudmFyIEdVSUQgPSAwO1xuLy8gaW50ZXJuYWwgc3RvcmUgb2YgYWxsIEZsaWNraXR5IGludGFuY2VzXG52YXIgaW5zdGFuY2VzID0ge307XG5cbmZ1bmN0aW9uIEZsaWNraXR5KCBlbGVtZW50LCBvcHRpb25zICkge1xuICB2YXIgcXVlcnlFbGVtZW50ID0gdXRpbHMuZ2V0UXVlcnlFbGVtZW50KCBlbGVtZW50ICk7XG4gIGlmICggIXF1ZXJ5RWxlbWVudCApIHtcbiAgICBpZiAoIGNvbnNvbGUgKSB7XG4gICAgICBjb25zb2xlLmVycm9yKCAnQmFkIGVsZW1lbnQgZm9yIEZsaWNraXR5OiAnICsgKCBxdWVyeUVsZW1lbnQgfHwgZWxlbWVudCApICk7XG4gICAgfVxuICAgIHJldHVybjtcbiAgfVxuICB0aGlzLmVsZW1lbnQgPSBxdWVyeUVsZW1lbnQ7XG4gIC8vIGRvIG5vdCBpbml0aWFsaXplIHR3aWNlIG9uIHNhbWUgZWxlbWVudFxuICBpZiAoIHRoaXMuZWxlbWVudC5mbGlja2l0eUdVSUQgKSB7XG4gICAgdmFyIGluc3RhbmNlID0gaW5zdGFuY2VzWyB0aGlzLmVsZW1lbnQuZmxpY2tpdHlHVUlEIF07XG4gICAgaW5zdGFuY2Uub3B0aW9uKCBvcHRpb25zICk7XG4gICAgcmV0dXJuIGluc3RhbmNlO1xuICB9XG5cbiAgLy8gYWRkIGpRdWVyeVxuICBpZiAoIGpRdWVyeSApIHtcbiAgICB0aGlzLiRlbGVtZW50ID0galF1ZXJ5KCB0aGlzLmVsZW1lbnQgKTtcbiAgfVxuICAvLyBvcHRpb25zXG4gIHRoaXMub3B0aW9ucyA9IHV0aWxzLmV4dGVuZCgge30sIHRoaXMuY29uc3RydWN0b3IuZGVmYXVsdHMgKTtcbiAgdGhpcy5vcHRpb24oIG9wdGlvbnMgKTtcblxuICAvLyBraWNrIHRoaW5ncyBvZmZcbiAgdGhpcy5fY3JlYXRlKCk7XG59XG5cbkZsaWNraXR5LmRlZmF1bHRzID0ge1xuICBhY2Nlc3NpYmlsaXR5OiB0cnVlLFxuICAvLyBhZGFwdGl2ZUhlaWdodDogZmFsc2UsXG4gIGNlbGxBbGlnbjogJ2NlbnRlcicsXG4gIC8vIGNlbGxTZWxlY3RvcjogdW5kZWZpbmVkLFxuICAvLyBjb250YWluOiBmYWxzZSxcbiAgZnJlZVNjcm9sbEZyaWN0aW9uOiAwLjA3NSwgLy8gZnJpY3Rpb24gd2hlbiBmcmVlLXNjcm9sbGluZ1xuICBmcmljdGlvbjogMC4yOCwgLy8gZnJpY3Rpb24gd2hlbiBzZWxlY3RpbmdcbiAgbmFtZXNwYWNlSlF1ZXJ5RXZlbnRzOiB0cnVlLFxuICAvLyBpbml0aWFsSW5kZXg6IDAsXG4gIHBlcmNlbnRQb3NpdGlvbjogdHJ1ZSxcbiAgcmVzaXplOiB0cnVlLFxuICBzZWxlY3RlZEF0dHJhY3Rpb246IDAuMDI1LFxuICBzZXRHYWxsZXJ5U2l6ZTogdHJ1ZVxuICAvLyB3YXRjaENTUzogZmFsc2UsXG4gIC8vIHdyYXBBcm91bmQ6IGZhbHNlXG59O1xuXG4vLyBoYXNoIG9mIG1ldGhvZHMgdHJpZ2dlcmVkIG9uIF9jcmVhdGUoKVxuRmxpY2tpdHkuY3JlYXRlTWV0aG9kcyA9IFtdO1xuXG52YXIgcHJvdG8gPSBGbGlja2l0eS5wcm90b3R5cGU7XG4vLyBpbmhlcml0IEV2ZW50RW1pdHRlclxudXRpbHMuZXh0ZW5kKCBwcm90bywgRXZFbWl0dGVyLnByb3RvdHlwZSApO1xuXG5wcm90by5fY3JlYXRlID0gZnVuY3Rpb24oKSB7XG4gIC8vIGFkZCBpZCBmb3IgRmxpY2tpdHkuZGF0YVxuICB2YXIgaWQgPSB0aGlzLmd1aWQgPSArK0dVSUQ7XG4gIHRoaXMuZWxlbWVudC5mbGlja2l0eUdVSUQgPSBpZDsgLy8gZXhwYW5kb1xuICBpbnN0YW5jZXNbIGlkIF0gPSB0aGlzOyAvLyBhc3NvY2lhdGUgdmlhIGlkXG4gIC8vIGluaXRpYWwgcHJvcGVydGllc1xuICB0aGlzLnNlbGVjdGVkSW5kZXggPSAwO1xuICAvLyBob3cgbWFueSBmcmFtZXMgc2xpZGVyIGhhcyBiZWVuIGluIHNhbWUgcG9zaXRpb25cbiAgdGhpcy5yZXN0aW5nRnJhbWVzID0gMDtcbiAgLy8gaW5pdGlhbCBwaHlzaWNzIHByb3BlcnRpZXNcbiAgdGhpcy54ID0gMDtcbiAgdGhpcy52ZWxvY2l0eSA9IDA7XG4gIHRoaXMub3JpZ2luU2lkZSA9IHRoaXMub3B0aW9ucy5yaWdodFRvTGVmdCA/ICdyaWdodCcgOiAnbGVmdCc7XG4gIC8vIGNyZWF0ZSB2aWV3cG9ydCAmIHNsaWRlclxuICB0aGlzLnZpZXdwb3J0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gIHRoaXMudmlld3BvcnQuY2xhc3NOYW1lID0gJ2ZsaWNraXR5LXZpZXdwb3J0JztcbiAgdGhpcy5fY3JlYXRlU2xpZGVyKCk7XG5cbiAgaWYgKCB0aGlzLm9wdGlvbnMucmVzaXplIHx8IHRoaXMub3B0aW9ucy53YXRjaENTUyApIHtcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lciggJ3Jlc2l6ZScsIHRoaXMgKTtcbiAgfVxuXG4gIC8vIGFkZCBsaXN0ZW5lcnMgZnJvbSBvbiBvcHRpb25cbiAgZm9yICggdmFyIGV2ZW50TmFtZSBpbiB0aGlzLm9wdGlvbnMub24gKSB7XG4gICAgdmFyIGxpc3RlbmVyID0gdGhpcy5vcHRpb25zLm9uWyBldmVudE5hbWUgXTtcbiAgICB0aGlzLm9uKCBldmVudE5hbWUsIGxpc3RlbmVyICk7XG4gIH1cblxuICBGbGlja2l0eS5jcmVhdGVNZXRob2RzLmZvckVhY2goIGZ1bmN0aW9uKCBtZXRob2QgKSB7XG4gICAgdGhpc1sgbWV0aG9kIF0oKTtcbiAgfSwgdGhpcyApO1xuXG4gIGlmICggdGhpcy5vcHRpb25zLndhdGNoQ1NTICkge1xuICAgIHRoaXMud2F0Y2hDU1MoKTtcbiAgfSBlbHNlIHtcbiAgICB0aGlzLmFjdGl2YXRlKCk7XG4gIH1cblxufTtcblxuLyoqXG4gKiBzZXQgb3B0aW9uc1xuICogQHBhcmFtIHtPYmplY3R9IG9wdHNcbiAqL1xucHJvdG8ub3B0aW9uID0gZnVuY3Rpb24oIG9wdHMgKSB7XG4gIHV0aWxzLmV4dGVuZCggdGhpcy5vcHRpb25zLCBvcHRzICk7XG59O1xuXG5wcm90by5hY3RpdmF0ZSA9IGZ1bmN0aW9uKCkge1xuICBpZiAoIHRoaXMuaXNBY3RpdmUgKSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIHRoaXMuaXNBY3RpdmUgPSB0cnVlO1xuICB0aGlzLmVsZW1lbnQuY2xhc3NMaXN0LmFkZCgnZmxpY2tpdHktZW5hYmxlZCcpO1xuICBpZiAoIHRoaXMub3B0aW9ucy5yaWdodFRvTGVmdCApIHtcbiAgICB0aGlzLmVsZW1lbnQuY2xhc3NMaXN0LmFkZCgnZmxpY2tpdHktcnRsJyk7XG4gIH1cblxuICB0aGlzLmdldFNpemUoKTtcbiAgLy8gbW92ZSBpbml0aWFsIGNlbGwgZWxlbWVudHMgc28gdGhleSBjYW4gYmUgbG9hZGVkIGFzIGNlbGxzXG4gIHZhciBjZWxsRWxlbXMgPSB0aGlzLl9maWx0ZXJGaW5kQ2VsbEVsZW1lbnRzKCB0aGlzLmVsZW1lbnQuY2hpbGRyZW4gKTtcbiAgbW92ZUVsZW1lbnRzKCBjZWxsRWxlbXMsIHRoaXMuc2xpZGVyICk7XG4gIHRoaXMudmlld3BvcnQuYXBwZW5kQ2hpbGQoIHRoaXMuc2xpZGVyICk7XG4gIHRoaXMuZWxlbWVudC5hcHBlbmRDaGlsZCggdGhpcy52aWV3cG9ydCApO1xuICAvLyBnZXQgY2VsbHMgZnJvbSBjaGlsZHJlblxuICB0aGlzLnJlbG9hZENlbGxzKCk7XG5cbiAgaWYgKCB0aGlzLm9wdGlvbnMuYWNjZXNzaWJpbGl0eSApIHtcbiAgICAvLyBhbGxvdyBlbGVtZW50IHRvIGZvY3VzYWJsZVxuICAgIHRoaXMuZWxlbWVudC50YWJJbmRleCA9IDA7XG4gICAgLy8gbGlzdGVuIGZvciBrZXkgcHJlc3Nlc1xuICAgIHRoaXMuZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCAna2V5ZG93bicsIHRoaXMgKTtcbiAgfVxuXG4gIHRoaXMuZW1pdEV2ZW50KCdhY3RpdmF0ZScpO1xuICB0aGlzLnNlbGVjdEluaXRpYWxJbmRleCgpO1xuICAvLyBmbGFnIGZvciBpbml0aWFsIGFjdGl2YXRpb24sIGZvciB1c2luZyBpbml0aWFsSW5kZXhcbiAgdGhpcy5pc0luaXRBY3RpdmF0ZWQgPSB0cnVlO1xuICAvLyByZWFkeSBldmVudC4gIzQ5M1xuICB0aGlzLmRpc3BhdGNoRXZlbnQoJ3JlYWR5Jyk7XG59O1xuXG4vLyBzbGlkZXIgcG9zaXRpb25zIHRoZSBjZWxsc1xucHJvdG8uX2NyZWF0ZVNsaWRlciA9IGZ1bmN0aW9uKCkge1xuICAvLyBzbGlkZXIgZWxlbWVudCBkb2VzIGFsbCB0aGUgcG9zaXRpb25pbmdcbiAgdmFyIHNsaWRlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICBzbGlkZXIuY2xhc3NOYW1lID0gJ2ZsaWNraXR5LXNsaWRlcic7XG4gIHNsaWRlci5zdHlsZVsgdGhpcy5vcmlnaW5TaWRlIF0gPSAwO1xuICB0aGlzLnNsaWRlciA9IHNsaWRlcjtcbn07XG5cbnByb3RvLl9maWx0ZXJGaW5kQ2VsbEVsZW1lbnRzID0gZnVuY3Rpb24oIGVsZW1zICkge1xuICByZXR1cm4gdXRpbHMuZmlsdGVyRmluZEVsZW1lbnRzKCBlbGVtcywgdGhpcy5vcHRpb25zLmNlbGxTZWxlY3RvciApO1xufTtcblxuLy8gZ29lcyB0aHJvdWdoIGFsbCBjaGlsZHJlblxucHJvdG8ucmVsb2FkQ2VsbHMgPSBmdW5jdGlvbigpIHtcbiAgLy8gY29sbGVjdGlvbiBvZiBpdGVtIGVsZW1lbnRzXG4gIHRoaXMuY2VsbHMgPSB0aGlzLl9tYWtlQ2VsbHMoIHRoaXMuc2xpZGVyLmNoaWxkcmVuICk7XG4gIHRoaXMucG9zaXRpb25DZWxscygpO1xuICB0aGlzLl9nZXRXcmFwU2hpZnRDZWxscygpO1xuICB0aGlzLnNldEdhbGxlcnlTaXplKCk7XG59O1xuXG4vKipcbiAqIHR1cm4gZWxlbWVudHMgaW50byBGbGlja2l0eS5DZWxsc1xuICogQHBhcmFtIHtBcnJheSBvciBOb2RlTGlzdCBvciBIVE1MRWxlbWVudH0gZWxlbXNcbiAqIEByZXR1cm5zIHtBcnJheX0gaXRlbXMgLSBjb2xsZWN0aW9uIG9mIG5ldyBGbGlja2l0eSBDZWxsc1xuICovXG5wcm90by5fbWFrZUNlbGxzID0gZnVuY3Rpb24oIGVsZW1zICkge1xuICB2YXIgY2VsbEVsZW1zID0gdGhpcy5fZmlsdGVyRmluZENlbGxFbGVtZW50cyggZWxlbXMgKTtcblxuICAvLyBjcmVhdGUgbmV3IEZsaWNraXR5IGZvciBjb2xsZWN0aW9uXG4gIHZhciBjZWxscyA9IGNlbGxFbGVtcy5tYXAoIGZ1bmN0aW9uKCBjZWxsRWxlbSApIHtcbiAgICByZXR1cm4gbmV3IENlbGwoIGNlbGxFbGVtLCB0aGlzICk7XG4gIH0sIHRoaXMgKTtcblxuICByZXR1cm4gY2VsbHM7XG59O1xuXG5wcm90by5nZXRMYXN0Q2VsbCA9IGZ1bmN0aW9uKCkge1xuICByZXR1cm4gdGhpcy5jZWxsc1sgdGhpcy5jZWxscy5sZW5ndGggLSAxIF07XG59O1xuXG5wcm90by5nZXRMYXN0U2xpZGUgPSBmdW5jdGlvbigpIHtcbiAgcmV0dXJuIHRoaXMuc2xpZGVzWyB0aGlzLnNsaWRlcy5sZW5ndGggLSAxIF07XG59O1xuXG4vLyBwb3NpdGlvbnMgYWxsIGNlbGxzXG5wcm90by5wb3NpdGlvbkNlbGxzID0gZnVuY3Rpb24oKSB7XG4gIC8vIHNpemUgYWxsIGNlbGxzXG4gIHRoaXMuX3NpemVDZWxscyggdGhpcy5jZWxscyApO1xuICAvLyBwb3NpdGlvbiBhbGwgY2VsbHNcbiAgdGhpcy5fcG9zaXRpb25DZWxscyggMCApO1xufTtcblxuLyoqXG4gKiBwb3NpdGlvbiBjZXJ0YWluIGNlbGxzXG4gKiBAcGFyYW0ge0ludGVnZXJ9IGluZGV4IC0gd2hpY2ggY2VsbCB0byBzdGFydCB3aXRoXG4gKi9cbnByb3RvLl9wb3NpdGlvbkNlbGxzID0gZnVuY3Rpb24oIGluZGV4ICkge1xuICBpbmRleCA9IGluZGV4IHx8IDA7XG4gIC8vIGFsc28gbWVhc3VyZSBtYXhDZWxsSGVpZ2h0XG4gIC8vIHN0YXJ0IDAgaWYgcG9zaXRpb25pbmcgYWxsIGNlbGxzXG4gIHRoaXMubWF4Q2VsbEhlaWdodCA9IGluZGV4ID8gdGhpcy5tYXhDZWxsSGVpZ2h0IHx8IDAgOiAwO1xuICB2YXIgY2VsbFggPSAwO1xuICAvLyBnZXQgY2VsbFhcbiAgaWYgKCBpbmRleCA+IDAgKSB7XG4gICAgdmFyIHN0YXJ0Q2VsbCA9IHRoaXMuY2VsbHNbIGluZGV4IC0gMSBdO1xuICAgIGNlbGxYID0gc3RhcnRDZWxsLnggKyBzdGFydENlbGwuc2l6ZS5vdXRlcldpZHRoO1xuICB9XG4gIHZhciBsZW4gPSB0aGlzLmNlbGxzLmxlbmd0aDtcbiAgZm9yICggdmFyIGk9aW5kZXg7IGkgPCBsZW47IGkrKyApIHtcbiAgICB2YXIgY2VsbCA9IHRoaXMuY2VsbHNbaV07XG4gICAgY2VsbC5zZXRQb3NpdGlvbiggY2VsbFggKTtcbiAgICBjZWxsWCArPSBjZWxsLnNpemUub3V0ZXJXaWR0aDtcbiAgICB0aGlzLm1heENlbGxIZWlnaHQgPSBNYXRoLm1heCggY2VsbC5zaXplLm91dGVySGVpZ2h0LCB0aGlzLm1heENlbGxIZWlnaHQgKTtcbiAgfVxuICAvLyBrZWVwIHRyYWNrIG9mIGNlbGxYIGZvciB3cmFwLWFyb3VuZFxuICB0aGlzLnNsaWRlYWJsZVdpZHRoID0gY2VsbFg7XG4gIC8vIHNsaWRlc1xuICB0aGlzLnVwZGF0ZVNsaWRlcygpO1xuICAvLyBjb250YWluIHNsaWRlcyB0YXJnZXRcbiAgdGhpcy5fY29udGFpblNsaWRlcygpO1xuICAvLyB1cGRhdGUgc2xpZGVzV2lkdGhcbiAgdGhpcy5zbGlkZXNXaWR0aCA9IGxlbiA/IHRoaXMuZ2V0TGFzdFNsaWRlKCkudGFyZ2V0IC0gdGhpcy5zbGlkZXNbMF0udGFyZ2V0IDogMDtcbn07XG5cbi8qKlxuICogY2VsbC5nZXRTaXplKCkgb24gbXVsdGlwbGUgY2VsbHNcbiAqIEBwYXJhbSB7QXJyYXl9IGNlbGxzXG4gKi9cbnByb3RvLl9zaXplQ2VsbHMgPSBmdW5jdGlvbiggY2VsbHMgKSB7XG4gIGNlbGxzLmZvckVhY2goIGZ1bmN0aW9uKCBjZWxsICkge1xuICAgIGNlbGwuZ2V0U2l6ZSgpO1xuICB9KTtcbn07XG5cbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tICAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAvL1xuXG5wcm90by51cGRhdGVTbGlkZXMgPSBmdW5jdGlvbigpIHtcbiAgdGhpcy5zbGlkZXMgPSBbXTtcbiAgaWYgKCAhdGhpcy5jZWxscy5sZW5ndGggKSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgdmFyIHNsaWRlID0gbmV3IFNsaWRlKCB0aGlzICk7XG4gIHRoaXMuc2xpZGVzLnB1c2goIHNsaWRlICk7XG4gIHZhciBpc09yaWdpbkxlZnQgPSB0aGlzLm9yaWdpblNpZGUgPT0gJ2xlZnQnO1xuICB2YXIgbmV4dE1hcmdpbiA9IGlzT3JpZ2luTGVmdCA/ICdtYXJnaW5SaWdodCcgOiAnbWFyZ2luTGVmdCc7XG5cbiAgdmFyIGNhbkNlbGxGaXQgPSB0aGlzLl9nZXRDYW5DZWxsRml0KCk7XG5cbiAgdGhpcy5jZWxscy5mb3JFYWNoKCBmdW5jdGlvbiggY2VsbCwgaSApIHtcbiAgICAvLyBqdXN0IGFkZCBjZWxsIGlmIGZpcnN0IGNlbGwgaW4gc2xpZGVcbiAgICBpZiAoICFzbGlkZS5jZWxscy5sZW5ndGggKSB7XG4gICAgICBzbGlkZS5hZGRDZWxsKCBjZWxsICk7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdmFyIHNsaWRlV2lkdGggPSAoIHNsaWRlLm91dGVyV2lkdGggLSBzbGlkZS5maXJzdE1hcmdpbiApICtcbiAgICAgICggY2VsbC5zaXplLm91dGVyV2lkdGggLSBjZWxsLnNpemVbIG5leHRNYXJnaW4gXSApO1xuXG4gICAgaWYgKCBjYW5DZWxsRml0LmNhbGwoIHRoaXMsIGksIHNsaWRlV2lkdGggKSApIHtcbiAgICAgIHNsaWRlLmFkZENlbGwoIGNlbGwgKTtcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gZG9lc24ndCBmaXQsIG5ldyBzbGlkZVxuICAgICAgc2xpZGUudXBkYXRlVGFyZ2V0KCk7XG5cbiAgICAgIHNsaWRlID0gbmV3IFNsaWRlKCB0aGlzICk7XG4gICAgICB0aGlzLnNsaWRlcy5wdXNoKCBzbGlkZSApO1xuICAgICAgc2xpZGUuYWRkQ2VsbCggY2VsbCApO1xuICAgIH1cbiAgfSwgdGhpcyApO1xuICAvLyBsYXN0IHNsaWRlXG4gIHNsaWRlLnVwZGF0ZVRhcmdldCgpO1xuICAvLyB1cGRhdGUgLnNlbGVjdGVkU2xpZGVcbiAgdGhpcy51cGRhdGVTZWxlY3RlZFNsaWRlKCk7XG59O1xuXG5wcm90by5fZ2V0Q2FuQ2VsbEZpdCA9IGZ1bmN0aW9uKCkge1xuICB2YXIgZ3JvdXBDZWxscyA9IHRoaXMub3B0aW9ucy5ncm91cENlbGxzO1xuICBpZiAoICFncm91cENlbGxzICkge1xuICAgIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9O1xuICB9IGVsc2UgaWYgKCB0eXBlb2YgZ3JvdXBDZWxscyA9PSAnbnVtYmVyJyApIHtcbiAgICAvLyBncm91cCBieSBudW1iZXIuIDMgLT4gWzAsMSwyXSwgWzMsNCw1XSwgLi4uXG4gICAgdmFyIG51bWJlciA9IHBhcnNlSW50KCBncm91cENlbGxzLCAxMCApO1xuICAgIHJldHVybiBmdW5jdGlvbiggaSApIHtcbiAgICAgIHJldHVybiAoIGkgJSBudW1iZXIgKSAhPT0gMDtcbiAgICB9O1xuICB9XG4gIC8vIGRlZmF1bHQsIGdyb3VwIGJ5IHdpZHRoIG9mIHNsaWRlXG4gIC8vIHBhcnNlICc3NSVcbiAgdmFyIHBlcmNlbnRNYXRjaCA9IHR5cGVvZiBncm91cENlbGxzID09ICdzdHJpbmcnICYmXG4gICAgZ3JvdXBDZWxscy5tYXRjaCgvXihcXGQrKSUkLyk7XG4gIHZhciBwZXJjZW50ID0gcGVyY2VudE1hdGNoID8gcGFyc2VJbnQoIHBlcmNlbnRNYXRjaFsxXSwgMTAgKSAvIDEwMCA6IDE7XG4gIHJldHVybiBmdW5jdGlvbiggaSwgc2xpZGVXaWR0aCApIHtcbiAgICByZXR1cm4gc2xpZGVXaWR0aCA8PSAoIHRoaXMuc2l6ZS5pbm5lcldpZHRoICsgMSApICogcGVyY2VudDtcbiAgfTtcbn07XG5cbi8vIGFsaWFzIF9pbml0IGZvciBqUXVlcnkgcGx1Z2luIC5mbGlja2l0eSgpXG5wcm90by5faW5pdCA9XG5wcm90by5yZXBvc2l0aW9uID0gZnVuY3Rpb24oKSB7XG4gIHRoaXMucG9zaXRpb25DZWxscygpO1xuICB0aGlzLnBvc2l0aW9uU2xpZGVyQXRTZWxlY3RlZCgpO1xufTtcblxucHJvdG8uZ2V0U2l6ZSA9IGZ1bmN0aW9uKCkge1xuICB0aGlzLnNpemUgPSBnZXRTaXplKCB0aGlzLmVsZW1lbnQgKTtcbiAgdGhpcy5zZXRDZWxsQWxpZ24oKTtcbiAgdGhpcy5jdXJzb3JQb3NpdGlvbiA9IHRoaXMuc2l6ZS5pbm5lcldpZHRoICogdGhpcy5jZWxsQWxpZ247XG59O1xuXG52YXIgY2VsbEFsaWduU2hvcnRoYW5kcyA9IHtcbiAgLy8gY2VsbCBhbGlnbiwgdGhlbiBiYXNlZCBvbiBvcmlnaW4gc2lkZVxuICBjZW50ZXI6IHtcbiAgICBsZWZ0OiAwLjUsXG4gICAgcmlnaHQ6IDAuNVxuICB9LFxuICBsZWZ0OiB7XG4gICAgbGVmdDogMCxcbiAgICByaWdodDogMVxuICB9LFxuICByaWdodDoge1xuICAgIHJpZ2h0OiAwLFxuICAgIGxlZnQ6IDFcbiAgfVxufTtcblxucHJvdG8uc2V0Q2VsbEFsaWduID0gZnVuY3Rpb24oKSB7XG4gIHZhciBzaG9ydGhhbmQgPSBjZWxsQWxpZ25TaG9ydGhhbmRzWyB0aGlzLm9wdGlvbnMuY2VsbEFsaWduIF07XG4gIHRoaXMuY2VsbEFsaWduID0gc2hvcnRoYW5kID8gc2hvcnRoYW5kWyB0aGlzLm9yaWdpblNpZGUgXSA6IHRoaXMub3B0aW9ucy5jZWxsQWxpZ247XG59O1xuXG5wcm90by5zZXRHYWxsZXJ5U2l6ZSA9IGZ1bmN0aW9uKCkge1xuICBpZiAoIHRoaXMub3B0aW9ucy5zZXRHYWxsZXJ5U2l6ZSApIHtcbiAgICB2YXIgaGVpZ2h0ID0gdGhpcy5vcHRpb25zLmFkYXB0aXZlSGVpZ2h0ICYmIHRoaXMuc2VsZWN0ZWRTbGlkZSA/XG4gICAgICB0aGlzLnNlbGVjdGVkU2xpZGUuaGVpZ2h0IDogdGhpcy5tYXhDZWxsSGVpZ2h0O1xuICAgIHRoaXMudmlld3BvcnQuc3R5bGUuaGVpZ2h0ID0gaGVpZ2h0ICsgJ3B4JztcbiAgfVxufTtcblxucHJvdG8uX2dldFdyYXBTaGlmdENlbGxzID0gZnVuY3Rpb24oKSB7XG4gIC8vIG9ubHkgZm9yIHdyYXAtYXJvdW5kXG4gIGlmICggIXRoaXMub3B0aW9ucy53cmFwQXJvdW5kICkge1xuICAgIHJldHVybjtcbiAgfVxuICAvLyB1bnNoaWZ0IHByZXZpb3VzIGNlbGxzXG4gIHRoaXMuX3Vuc2hpZnRDZWxscyggdGhpcy5iZWZvcmVTaGlmdENlbGxzICk7XG4gIHRoaXMuX3Vuc2hpZnRDZWxscyggdGhpcy5hZnRlclNoaWZ0Q2VsbHMgKTtcbiAgLy8gZ2V0IGJlZm9yZSBjZWxsc1xuICAvLyBpbml0aWFsIGdhcFxuICB2YXIgZ2FwWCA9IHRoaXMuY3Vyc29yUG9zaXRpb247XG4gIHZhciBjZWxsSW5kZXggPSB0aGlzLmNlbGxzLmxlbmd0aCAtIDE7XG4gIHRoaXMuYmVmb3JlU2hpZnRDZWxscyA9IHRoaXMuX2dldEdhcENlbGxzKCBnYXBYLCBjZWxsSW5kZXgsIC0xICk7XG4gIC8vIGdldCBhZnRlciBjZWxsc1xuICAvLyBlbmRpbmcgZ2FwIGJldHdlZW4gbGFzdCBjZWxsIGFuZCBlbmQgb2YgZ2FsbGVyeSB2aWV3cG9ydFxuICBnYXBYID0gdGhpcy5zaXplLmlubmVyV2lkdGggLSB0aGlzLmN1cnNvclBvc2l0aW9uO1xuICAvLyBzdGFydCBjbG9uaW5nIGF0IGZpcnN0IGNlbGwsIHdvcmtpbmcgZm9yd2FyZHNcbiAgdGhpcy5hZnRlclNoaWZ0Q2VsbHMgPSB0aGlzLl9nZXRHYXBDZWxscyggZ2FwWCwgMCwgMSApO1xufTtcblxucHJvdG8uX2dldEdhcENlbGxzID0gZnVuY3Rpb24oIGdhcFgsIGNlbGxJbmRleCwgaW5jcmVtZW50ICkge1xuICAvLyBrZWVwIGFkZGluZyBjZWxscyB1bnRpbCB0aGUgY292ZXIgdGhlIGluaXRpYWwgZ2FwXG4gIHZhciBjZWxscyA9IFtdO1xuICB3aGlsZSAoIGdhcFggPiAwICkge1xuICAgIHZhciBjZWxsID0gdGhpcy5jZWxsc1sgY2VsbEluZGV4IF07XG4gICAgaWYgKCAhY2VsbCApIHtcbiAgICAgIGJyZWFrO1xuICAgIH1cbiAgICBjZWxscy5wdXNoKCBjZWxsICk7XG4gICAgY2VsbEluZGV4ICs9IGluY3JlbWVudDtcbiAgICBnYXBYIC09IGNlbGwuc2l6ZS5vdXRlcldpZHRoO1xuICB9XG4gIHJldHVybiBjZWxscztcbn07XG5cbi8vIC0tLS0tIGNvbnRhaW4gLS0tLS0gLy9cblxuLy8gY29udGFpbiBjZWxsIHRhcmdldHMgc28gbm8gZXhjZXNzIHNsaWRpbmdcbnByb3RvLl9jb250YWluU2xpZGVzID0gZnVuY3Rpb24oKSB7XG4gIGlmICggIXRoaXMub3B0aW9ucy5jb250YWluIHx8IHRoaXMub3B0aW9ucy53cmFwQXJvdW5kIHx8ICF0aGlzLmNlbGxzLmxlbmd0aCApIHtcbiAgICByZXR1cm47XG4gIH1cbiAgdmFyIGlzUmlnaHRUb0xlZnQgPSB0aGlzLm9wdGlvbnMucmlnaHRUb0xlZnQ7XG4gIHZhciBiZWdpbk1hcmdpbiA9IGlzUmlnaHRUb0xlZnQgPyAnbWFyZ2luUmlnaHQnIDogJ21hcmdpbkxlZnQnO1xuICB2YXIgZW5kTWFyZ2luID0gaXNSaWdodFRvTGVmdCA/ICdtYXJnaW5MZWZ0JyA6ICdtYXJnaW5SaWdodCc7XG4gIHZhciBjb250ZW50V2lkdGggPSB0aGlzLnNsaWRlYWJsZVdpZHRoIC0gdGhpcy5nZXRMYXN0Q2VsbCgpLnNpemVbIGVuZE1hcmdpbiBdO1xuICAvLyBjb250ZW50IGlzIGxlc3MgdGhhbiBnYWxsZXJ5IHNpemVcbiAgdmFyIGlzQ29udGVudFNtYWxsZXIgPSBjb250ZW50V2lkdGggPCB0aGlzLnNpemUuaW5uZXJXaWR0aDtcbiAgLy8gYm91bmRzXG4gIHZhciBiZWdpbkJvdW5kID0gdGhpcy5jdXJzb3JQb3NpdGlvbiArIHRoaXMuY2VsbHNbMF0uc2l6ZVsgYmVnaW5NYXJnaW4gXTtcbiAgdmFyIGVuZEJvdW5kID0gY29udGVudFdpZHRoIC0gdGhpcy5zaXplLmlubmVyV2lkdGggKiAoIDEgLSB0aGlzLmNlbGxBbGlnbiApO1xuICAvLyBjb250YWluIGVhY2ggY2VsbCB0YXJnZXRcbiAgdGhpcy5zbGlkZXMuZm9yRWFjaCggZnVuY3Rpb24oIHNsaWRlICkge1xuICAgIGlmICggaXNDb250ZW50U21hbGxlciApIHtcbiAgICAgIC8vIGFsbCBjZWxscyBmaXQgaW5zaWRlIGdhbGxlcnlcbiAgICAgIHNsaWRlLnRhcmdldCA9IGNvbnRlbnRXaWR0aCAqIHRoaXMuY2VsbEFsaWduO1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyBjb250YWluIHRvIGJvdW5kc1xuICAgICAgc2xpZGUudGFyZ2V0ID0gTWF0aC5tYXgoIHNsaWRlLnRhcmdldCwgYmVnaW5Cb3VuZCApO1xuICAgICAgc2xpZGUudGFyZ2V0ID0gTWF0aC5taW4oIHNsaWRlLnRhcmdldCwgZW5kQm91bmQgKTtcbiAgICB9XG4gIH0sIHRoaXMgKTtcbn07XG5cbi8vIC0tLS0tICAtLS0tLSAvL1xuXG4vKipcbiAqIGVtaXRzIGV2ZW50cyB2aWEgZXZlbnRFbWl0dGVyIGFuZCBqUXVlcnkgZXZlbnRzXG4gKiBAcGFyYW0ge1N0cmluZ30gdHlwZSAtIG5hbWUgb2YgZXZlbnRcbiAqIEBwYXJhbSB7RXZlbnR9IGV2ZW50IC0gb3JpZ2luYWwgZXZlbnRcbiAqIEBwYXJhbSB7QXJyYXl9IGFyZ3MgLSBleHRyYSBhcmd1bWVudHNcbiAqL1xucHJvdG8uZGlzcGF0Y2hFdmVudCA9IGZ1bmN0aW9uKCB0eXBlLCBldmVudCwgYXJncyApIHtcbiAgdmFyIGVtaXRBcmdzID0gZXZlbnQgPyBbIGV2ZW50IF0uY29uY2F0KCBhcmdzICkgOiBhcmdzO1xuICB0aGlzLmVtaXRFdmVudCggdHlwZSwgZW1pdEFyZ3MgKTtcblxuICBpZiAoIGpRdWVyeSAmJiB0aGlzLiRlbGVtZW50ICkge1xuICAgIC8vIGRlZmF1bHQgdHJpZ2dlciB3aXRoIHR5cGUgaWYgbm8gZXZlbnRcbiAgICB0eXBlICs9IHRoaXMub3B0aW9ucy5uYW1lc3BhY2VKUXVlcnlFdmVudHMgPyAnLmZsaWNraXR5JyA6ICcnO1xuICAgIHZhciAkZXZlbnQgPSB0eXBlO1xuICAgIGlmICggZXZlbnQgKSB7XG4gICAgICAvLyBjcmVhdGUgalF1ZXJ5IGV2ZW50XG4gICAgICB2YXIgalFFdmVudCA9IGpRdWVyeS5FdmVudCggZXZlbnQgKTtcbiAgICAgIGpRRXZlbnQudHlwZSA9IHR5cGU7XG4gICAgICAkZXZlbnQgPSBqUUV2ZW50O1xuICAgIH1cbiAgICB0aGlzLiRlbGVtZW50LnRyaWdnZXIoICRldmVudCwgYXJncyApO1xuICB9XG59O1xuXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSBzZWxlY3QgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gLy9cblxuLyoqXG4gKiBAcGFyYW0ge0ludGVnZXJ9IGluZGV4IC0gaW5kZXggb2YgdGhlIHNsaWRlXG4gKiBAcGFyYW0ge0Jvb2xlYW59IGlzV3JhcCAtIHdpbGwgd3JhcC1hcm91bmQgdG8gbGFzdC9maXJzdCBpZiBhdCB0aGUgZW5kXG4gKiBAcGFyYW0ge0Jvb2xlYW59IGlzSW5zdGFudCAtIHdpbGwgaW1tZWRpYXRlbHkgc2V0IHBvc2l0aW9uIGF0IHNlbGVjdGVkIGNlbGxcbiAqL1xucHJvdG8uc2VsZWN0ID0gZnVuY3Rpb24oIGluZGV4LCBpc1dyYXAsIGlzSW5zdGFudCApIHtcbiAgaWYgKCAhdGhpcy5pc0FjdGl2ZSApIHtcbiAgICByZXR1cm47XG4gIH1cbiAgaW5kZXggPSBwYXJzZUludCggaW5kZXgsIDEwICk7XG4gIHRoaXMuX3dyYXBTZWxlY3QoIGluZGV4ICk7XG5cbiAgaWYgKCB0aGlzLm9wdGlvbnMud3JhcEFyb3VuZCB8fCBpc1dyYXAgKSB7XG4gICAgaW5kZXggPSB1dGlscy5tb2R1bG8oIGluZGV4LCB0aGlzLnNsaWRlcy5sZW5ndGggKTtcbiAgfVxuICAvLyBiYWlsIGlmIGludmFsaWQgaW5kZXhcbiAgaWYgKCAhdGhpcy5zbGlkZXNbIGluZGV4IF0gKSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIHZhciBwcmV2SW5kZXggPSB0aGlzLnNlbGVjdGVkSW5kZXg7XG4gIHRoaXMuc2VsZWN0ZWRJbmRleCA9IGluZGV4O1xuICB0aGlzLnVwZGF0ZVNlbGVjdGVkU2xpZGUoKTtcbiAgaWYgKCBpc0luc3RhbnQgKSB7XG4gICAgdGhpcy5wb3NpdGlvblNsaWRlckF0U2VsZWN0ZWQoKTtcbiAgfSBlbHNlIHtcbiAgICB0aGlzLnN0YXJ0QW5pbWF0aW9uKCk7XG4gIH1cbiAgaWYgKCB0aGlzLm9wdGlvbnMuYWRhcHRpdmVIZWlnaHQgKSB7XG4gICAgdGhpcy5zZXRHYWxsZXJ5U2l6ZSgpO1xuICB9XG4gIC8vIGV2ZW50c1xuICB0aGlzLmRpc3BhdGNoRXZlbnQoICdzZWxlY3QnLCBudWxsLCBbIGluZGV4IF0gKTtcbiAgLy8gY2hhbmdlIGV2ZW50IGlmIG5ldyBpbmRleFxuICBpZiAoIGluZGV4ICE9IHByZXZJbmRleCApIHtcbiAgICB0aGlzLmRpc3BhdGNoRXZlbnQoICdjaGFuZ2UnLCBudWxsLCBbIGluZGV4IF0gKTtcbiAgfVxuICAvLyBvbGQgdjEgZXZlbnQgbmFtZSwgcmVtb3ZlIGluIHYzXG4gIHRoaXMuZGlzcGF0Y2hFdmVudCgnY2VsbFNlbGVjdCcpO1xufTtcblxuLy8gd3JhcHMgcG9zaXRpb24gZm9yIHdyYXBBcm91bmQsIHRvIG1vdmUgdG8gY2xvc2VzdCBzbGlkZS4gIzExM1xucHJvdG8uX3dyYXBTZWxlY3QgPSBmdW5jdGlvbiggaW5kZXggKSB7XG4gIHZhciBsZW4gPSB0aGlzLnNsaWRlcy5sZW5ndGg7XG4gIHZhciBpc1dyYXBwaW5nID0gdGhpcy5vcHRpb25zLndyYXBBcm91bmQgJiYgbGVuID4gMTtcbiAgaWYgKCAhaXNXcmFwcGluZyApIHtcbiAgICByZXR1cm4gaW5kZXg7XG4gIH1cbiAgdmFyIHdyYXBJbmRleCA9IHV0aWxzLm1vZHVsbyggaW5kZXgsIGxlbiApO1xuICAvLyBnbyB0byBzaG9ydGVzdFxuICB2YXIgZGVsdGEgPSBNYXRoLmFicyggd3JhcEluZGV4IC0gdGhpcy5zZWxlY3RlZEluZGV4ICk7XG4gIHZhciBiYWNrV3JhcERlbHRhID0gTWF0aC5hYnMoICggd3JhcEluZGV4ICsgbGVuICkgLSB0aGlzLnNlbGVjdGVkSW5kZXggKTtcbiAgdmFyIGZvcmV3YXJkV3JhcERlbHRhID0gTWF0aC5hYnMoICggd3JhcEluZGV4IC0gbGVuICkgLSB0aGlzLnNlbGVjdGVkSW5kZXggKTtcbiAgaWYgKCAhdGhpcy5pc0RyYWdTZWxlY3QgJiYgYmFja1dyYXBEZWx0YSA8IGRlbHRhICkge1xuICAgIGluZGV4ICs9IGxlbjtcbiAgfSBlbHNlIGlmICggIXRoaXMuaXNEcmFnU2VsZWN0ICYmIGZvcmV3YXJkV3JhcERlbHRhIDwgZGVsdGEgKSB7XG4gICAgaW5kZXggLT0gbGVuO1xuICB9XG4gIC8vIHdyYXAgcG9zaXRpb24gc28gc2xpZGVyIGlzIHdpdGhpbiBub3JtYWwgYXJlYVxuICBpZiAoIGluZGV4IDwgMCApIHtcbiAgICB0aGlzLnggLT0gdGhpcy5zbGlkZWFibGVXaWR0aDtcbiAgfSBlbHNlIGlmICggaW5kZXggPj0gbGVuICkge1xuICAgIHRoaXMueCArPSB0aGlzLnNsaWRlYWJsZVdpZHRoO1xuICB9XG59O1xuXG5wcm90by5wcmV2aW91cyA9IGZ1bmN0aW9uKCBpc1dyYXAsIGlzSW5zdGFudCApIHtcbiAgdGhpcy5zZWxlY3QoIHRoaXMuc2VsZWN0ZWRJbmRleCAtIDEsIGlzV3JhcCwgaXNJbnN0YW50ICk7XG59O1xuXG5wcm90by5uZXh0ID0gZnVuY3Rpb24oIGlzV3JhcCwgaXNJbnN0YW50ICkge1xuICB0aGlzLnNlbGVjdCggdGhpcy5zZWxlY3RlZEluZGV4ICsgMSwgaXNXcmFwLCBpc0luc3RhbnQgKTtcbn07XG5cbnByb3RvLnVwZGF0ZVNlbGVjdGVkU2xpZGUgPSBmdW5jdGlvbigpIHtcbiAgdmFyIHNsaWRlID0gdGhpcy5zbGlkZXNbIHRoaXMuc2VsZWN0ZWRJbmRleCBdO1xuICAvLyBzZWxlY3RlZEluZGV4IGNvdWxkIGJlIG91dHNpZGUgb2Ygc2xpZGVzLCBpZiB0cmlnZ2VyZWQgYmVmb3JlIHJlc2l6ZSgpXG4gIGlmICggIXNsaWRlICkge1xuICAgIHJldHVybjtcbiAgfVxuICAvLyB1bnNlbGVjdCBwcmV2aW91cyBzZWxlY3RlZCBzbGlkZVxuICB0aGlzLnVuc2VsZWN0U2VsZWN0ZWRTbGlkZSgpO1xuICAvLyB1cGRhdGUgbmV3IHNlbGVjdGVkIHNsaWRlXG4gIHRoaXMuc2VsZWN0ZWRTbGlkZSA9IHNsaWRlO1xuICBzbGlkZS5zZWxlY3QoKTtcbiAgdGhpcy5zZWxlY3RlZENlbGxzID0gc2xpZGUuY2VsbHM7XG4gIHRoaXMuc2VsZWN0ZWRFbGVtZW50cyA9IHNsaWRlLmdldENlbGxFbGVtZW50cygpO1xuICAvLyBIQUNLOiBzZWxlY3RlZENlbGwgJiBzZWxlY3RlZEVsZW1lbnQgaXMgZmlyc3QgY2VsbCBpbiBzbGlkZSwgYmFja3dhcmRzIGNvbXBhdGliaWxpdHlcbiAgLy8gUmVtb3ZlIGluIHYzP1xuICB0aGlzLnNlbGVjdGVkQ2VsbCA9IHNsaWRlLmNlbGxzWzBdO1xuICB0aGlzLnNlbGVjdGVkRWxlbWVudCA9IHRoaXMuc2VsZWN0ZWRFbGVtZW50c1swXTtcbn07XG5cbnByb3RvLnVuc2VsZWN0U2VsZWN0ZWRTbGlkZSA9IGZ1bmN0aW9uKCkge1xuICBpZiAoIHRoaXMuc2VsZWN0ZWRTbGlkZSApIHtcbiAgICB0aGlzLnNlbGVjdGVkU2xpZGUudW5zZWxlY3QoKTtcbiAgfVxufTtcblxucHJvdG8uc2VsZWN0SW5pdGlhbEluZGV4ID0gZnVuY3Rpb24oKSB7XG4gIHZhciBpbml0aWFsSW5kZXggPSB0aGlzLm9wdGlvbnMuaW5pdGlhbEluZGV4O1xuICAvLyBhbHJlYWR5IGFjdGl2YXRlZCwgc2VsZWN0IHByZXZpb3VzIHNlbGVjdGVkSW5kZXhcbiAgaWYgKCB0aGlzLmlzSW5pdEFjdGl2YXRlZCApIHtcbiAgICB0aGlzLnNlbGVjdCggdGhpcy5zZWxlY3RlZEluZGV4LCBmYWxzZSwgdHJ1ZSApO1xuICAgIHJldHVybjtcbiAgfVxuICAvLyBzZWxlY3Qgd2l0aCBzZWxlY3RvciBzdHJpbmdcbiAgaWYgKCBpbml0aWFsSW5kZXggJiYgdHlwZW9mIGluaXRpYWxJbmRleCA9PSAnc3RyaW5nJyApIHtcbiAgICB2YXIgY2VsbCA9IHRoaXMucXVlcnlDZWxsKCBpbml0aWFsSW5kZXggKTtcbiAgICBpZiAoIGNlbGwgKSB7XG4gICAgICB0aGlzLnNlbGVjdENlbGwoIGluaXRpYWxJbmRleCwgZmFsc2UsIHRydWUgKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gIH1cblxuICB2YXIgaW5kZXggPSAwO1xuICAvLyBzZWxlY3Qgd2l0aCBudW1iZXJcbiAgaWYgKCBpbml0aWFsSW5kZXggJiYgdGhpcy5zbGlkZXNbIGluaXRpYWxJbmRleCBdICkge1xuICAgIGluZGV4ID0gaW5pdGlhbEluZGV4O1xuICB9XG4gIC8vIHNlbGVjdCBpbnN0YW50bHlcbiAgdGhpcy5zZWxlY3QoIGluZGV4LCBmYWxzZSwgdHJ1ZSApO1xufTtcblxuLyoqXG4gKiBzZWxlY3Qgc2xpZGUgZnJvbSBudW1iZXIgb3IgY2VsbCBlbGVtZW50XG4gKiBAcGFyYW0ge0VsZW1lbnQgb3IgTnVtYmVyfSBlbGVtXG4gKi9cbnByb3RvLnNlbGVjdENlbGwgPSBmdW5jdGlvbiggdmFsdWUsIGlzV3JhcCwgaXNJbnN0YW50ICkge1xuICAvLyBnZXQgY2VsbFxuICB2YXIgY2VsbCA9IHRoaXMucXVlcnlDZWxsKCB2YWx1ZSApO1xuICBpZiAoICFjZWxsICkge1xuICAgIHJldHVybjtcbiAgfVxuXG4gIHZhciBpbmRleCA9IHRoaXMuZ2V0Q2VsbFNsaWRlSW5kZXgoIGNlbGwgKTtcbiAgdGhpcy5zZWxlY3QoIGluZGV4LCBpc1dyYXAsIGlzSW5zdGFudCApO1xufTtcblxucHJvdG8uZ2V0Q2VsbFNsaWRlSW5kZXggPSBmdW5jdGlvbiggY2VsbCApIHtcbiAgLy8gZ2V0IGluZGV4IG9mIHNsaWRlcyB0aGF0IGhhcyBjZWxsXG4gIGZvciAoIHZhciBpPTA7IGkgPCB0aGlzLnNsaWRlcy5sZW5ndGg7IGkrKyApIHtcbiAgICB2YXIgc2xpZGUgPSB0aGlzLnNsaWRlc1tpXTtcbiAgICB2YXIgaW5kZXggPSBzbGlkZS5jZWxscy5pbmRleE9mKCBjZWxsICk7XG4gICAgaWYgKCBpbmRleCAhPSAtMSApIHtcbiAgICAgIHJldHVybiBpO1xuICAgIH1cbiAgfVxufTtcblxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gZ2V0IGNlbGxzIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tIC8vXG5cbi8qKlxuICogZ2V0IEZsaWNraXR5LkNlbGwsIGdpdmVuIGFuIEVsZW1lbnRcbiAqIEBwYXJhbSB7RWxlbWVudH0gZWxlbVxuICogQHJldHVybnMge0ZsaWNraXR5LkNlbGx9IGl0ZW1cbiAqL1xucHJvdG8uZ2V0Q2VsbCA9IGZ1bmN0aW9uKCBlbGVtICkge1xuICAvLyBsb29wIHRocm91Z2ggY2VsbHMgdG8gZ2V0IHRoZSBvbmUgdGhhdCBtYXRjaGVzXG4gIGZvciAoIHZhciBpPTA7IGkgPCB0aGlzLmNlbGxzLmxlbmd0aDsgaSsrICkge1xuICAgIHZhciBjZWxsID0gdGhpcy5jZWxsc1tpXTtcbiAgICBpZiAoIGNlbGwuZWxlbWVudCA9PSBlbGVtICkge1xuICAgICAgcmV0dXJuIGNlbGw7XG4gICAgfVxuICB9XG59O1xuXG4vKipcbiAqIGdldCBjb2xsZWN0aW9uIG9mIEZsaWNraXR5LkNlbGxzLCBnaXZlbiBFbGVtZW50c1xuICogQHBhcmFtIHtFbGVtZW50LCBBcnJheSwgTm9kZUxpc3R9IGVsZW1zXG4gKiBAcmV0dXJucyB7QXJyYXl9IGNlbGxzIC0gRmxpY2tpdHkuQ2VsbHNcbiAqL1xucHJvdG8uZ2V0Q2VsbHMgPSBmdW5jdGlvbiggZWxlbXMgKSB7XG4gIGVsZW1zID0gdXRpbHMubWFrZUFycmF5KCBlbGVtcyApO1xuICB2YXIgY2VsbHMgPSBbXTtcbiAgZWxlbXMuZm9yRWFjaCggZnVuY3Rpb24oIGVsZW0gKSB7XG4gICAgdmFyIGNlbGwgPSB0aGlzLmdldENlbGwoIGVsZW0gKTtcbiAgICBpZiAoIGNlbGwgKSB7XG4gICAgICBjZWxscy5wdXNoKCBjZWxsICk7XG4gICAgfVxuICB9LCB0aGlzICk7XG4gIHJldHVybiBjZWxscztcbn07XG5cbi8qKlxuICogZ2V0IGNlbGwgZWxlbWVudHNcbiAqIEByZXR1cm5zIHtBcnJheX0gY2VsbEVsZW1zXG4gKi9cbnByb3RvLmdldENlbGxFbGVtZW50cyA9IGZ1bmN0aW9uKCkge1xuICByZXR1cm4gdGhpcy5jZWxscy5tYXAoIGZ1bmN0aW9uKCBjZWxsICkge1xuICAgIHJldHVybiBjZWxsLmVsZW1lbnQ7XG4gIH0pO1xufTtcblxuLyoqXG4gKiBnZXQgcGFyZW50IGNlbGwgZnJvbSBhbiBlbGVtZW50XG4gKiBAcGFyYW0ge0VsZW1lbnR9IGVsZW1cbiAqIEByZXR1cm5zIHtGbGlja2l0LkNlbGx9IGNlbGxcbiAqL1xucHJvdG8uZ2V0UGFyZW50Q2VsbCA9IGZ1bmN0aW9uKCBlbGVtICkge1xuICAvLyBmaXJzdCBjaGVjayBpZiBlbGVtIGlzIGNlbGxcbiAgdmFyIGNlbGwgPSB0aGlzLmdldENlbGwoIGVsZW0gKTtcbiAgaWYgKCBjZWxsICkge1xuICAgIHJldHVybiBjZWxsO1xuICB9XG4gIC8vIHRyeSB0byBnZXQgcGFyZW50IGNlbGwgZWxlbVxuICBlbGVtID0gdXRpbHMuZ2V0UGFyZW50KCBlbGVtLCAnLmZsaWNraXR5LXNsaWRlciA+IConICk7XG4gIHJldHVybiB0aGlzLmdldENlbGwoIGVsZW0gKTtcbn07XG5cbi8qKlxuICogZ2V0IGNlbGxzIGFkamFjZW50IHRvIGEgc2xpZGVcbiAqIEBwYXJhbSB7SW50ZWdlcn0gYWRqQ291bnQgLSBudW1iZXIgb2YgYWRqYWNlbnQgc2xpZGVzXG4gKiBAcGFyYW0ge0ludGVnZXJ9IGluZGV4IC0gaW5kZXggb2Ygc2xpZGUgdG8gc3RhcnRcbiAqIEByZXR1cm5zIHtBcnJheX0gY2VsbHMgLSBhcnJheSBvZiBGbGlja2l0eS5DZWxsc1xuICovXG5wcm90by5nZXRBZGphY2VudENlbGxFbGVtZW50cyA9IGZ1bmN0aW9uKCBhZGpDb3VudCwgaW5kZXggKSB7XG4gIGlmICggIWFkakNvdW50ICkge1xuICAgIHJldHVybiB0aGlzLnNlbGVjdGVkU2xpZGUuZ2V0Q2VsbEVsZW1lbnRzKCk7XG4gIH1cbiAgaW5kZXggPSBpbmRleCA9PT0gdW5kZWZpbmVkID8gdGhpcy5zZWxlY3RlZEluZGV4IDogaW5kZXg7XG5cbiAgdmFyIGxlbiA9IHRoaXMuc2xpZGVzLmxlbmd0aDtcbiAgaWYgKCAxICsgKCBhZGpDb3VudCAqIDIgKSA+PSBsZW4gKSB7XG4gICAgcmV0dXJuIHRoaXMuZ2V0Q2VsbEVsZW1lbnRzKCk7XG4gIH1cblxuICB2YXIgY2VsbEVsZW1zID0gW107XG4gIGZvciAoIHZhciBpID0gaW5kZXggLSBhZGpDb3VudDsgaSA8PSBpbmRleCArIGFkakNvdW50IDsgaSsrICkge1xuICAgIHZhciBzbGlkZUluZGV4ID0gdGhpcy5vcHRpb25zLndyYXBBcm91bmQgPyB1dGlscy5tb2R1bG8oIGksIGxlbiApIDogaTtcbiAgICB2YXIgc2xpZGUgPSB0aGlzLnNsaWRlc1sgc2xpZGVJbmRleCBdO1xuICAgIGlmICggc2xpZGUgKSB7XG4gICAgICBjZWxsRWxlbXMgPSBjZWxsRWxlbXMuY29uY2F0KCBzbGlkZS5nZXRDZWxsRWxlbWVudHMoKSApO1xuICAgIH1cbiAgfVxuICByZXR1cm4gY2VsbEVsZW1zO1xufTtcblxuLyoqXG4gKiBzZWxlY3Qgc2xpZGUgZnJvbSBudW1iZXIgb3IgY2VsbCBlbGVtZW50XG4gKiBAcGFyYW0ge0VsZW1lbnQsIFNlbGVjdG9yIFN0cmluZywgb3IgTnVtYmVyfSBzZWxlY3RvclxuICovXG5wcm90by5xdWVyeUNlbGwgPSBmdW5jdGlvbiggc2VsZWN0b3IgKSB7XG4gIGlmICggdHlwZW9mIHNlbGVjdG9yID09ICdudW1iZXInICkge1xuICAgIC8vIHVzZSBudW1iZXIgYXMgaW5kZXhcbiAgICByZXR1cm4gdGhpcy5jZWxsc1sgc2VsZWN0b3IgXTtcbiAgfVxuICBpZiAoIHR5cGVvZiBzZWxlY3RvciA9PSAnc3RyaW5nJyApIHtcbiAgICAvLyBkbyBub3Qgc2VsZWN0IGludmFsaWQgc2VsZWN0b3JzIGZyb20gaGFzaDogIzEyMywgIy8uICM3OTFcbiAgICBpZiAoIHNlbGVjdG9yLm1hdGNoKC9eWyNcXC5dP1tcXGRcXC9dLykgKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIC8vIHVzZSBzdHJpbmcgYXMgc2VsZWN0b3IsIGdldCBlbGVtZW50XG4gICAgc2VsZWN0b3IgPSB0aGlzLmVsZW1lbnQucXVlcnlTZWxlY3Rvciggc2VsZWN0b3IgKTtcbiAgfVxuICAvLyBnZXQgY2VsbCBmcm9tIGVsZW1lbnRcbiAgcmV0dXJuIHRoaXMuZ2V0Q2VsbCggc2VsZWN0b3IgKTtcbn07XG5cbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tIGV2ZW50cyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAvL1xuXG5wcm90by51aUNoYW5nZSA9IGZ1bmN0aW9uKCkge1xuICB0aGlzLmVtaXRFdmVudCgndWlDaGFuZ2UnKTtcbn07XG5cbi8vIGtlZXAgZm9jdXMgb24gZWxlbWVudCB3aGVuIGNoaWxkIFVJIGVsZW1lbnRzIGFyZSBjbGlja2VkXG5wcm90by5jaGlsZFVJUG9pbnRlckRvd24gPSBmdW5jdGlvbiggZXZlbnQgKSB7XG4gIC8vIEhBQ0sgaU9TIGRvZXMgbm90IGFsbG93IHRvdWNoIGV2ZW50cyB0byBidWJibGUgdXA/IVxuICBpZiAoIGV2ZW50LnR5cGUgIT0gJ3RvdWNoc3RhcnQnICkge1xuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gIH1cbiAgdGhpcy5mb2N1cygpO1xufTtcblxuLy8gLS0tLS0gcmVzaXplIC0tLS0tIC8vXG5cbnByb3RvLm9ucmVzaXplID0gZnVuY3Rpb24oKSB7XG4gIHRoaXMud2F0Y2hDU1MoKTtcbiAgdGhpcy5yZXNpemUoKTtcbn07XG5cbnV0aWxzLmRlYm91bmNlTWV0aG9kKCBGbGlja2l0eSwgJ29ucmVzaXplJywgMTUwICk7XG5cbnByb3RvLnJlc2l6ZSA9IGZ1bmN0aW9uKCkge1xuICBpZiAoICF0aGlzLmlzQWN0aXZlICkge1xuICAgIHJldHVybjtcbiAgfVxuICB0aGlzLmdldFNpemUoKTtcbiAgLy8gd3JhcCB2YWx1ZXNcbiAgaWYgKCB0aGlzLm9wdGlvbnMud3JhcEFyb3VuZCApIHtcbiAgICB0aGlzLnggPSB1dGlscy5tb2R1bG8oIHRoaXMueCwgdGhpcy5zbGlkZWFibGVXaWR0aCApO1xuICB9XG4gIHRoaXMucG9zaXRpb25DZWxscygpO1xuICB0aGlzLl9nZXRXcmFwU2hpZnRDZWxscygpO1xuICB0aGlzLnNldEdhbGxlcnlTaXplKCk7XG4gIHRoaXMuZW1pdEV2ZW50KCdyZXNpemUnKTtcbiAgLy8gdXBkYXRlIHNlbGVjdGVkIGluZGV4IGZvciBncm91cCBzbGlkZXMsIGluc3RhbnRcbiAgLy8gVE9ETzogcG9zaXRpb24gY2FuIGJlIGxvc3QgYmV0d2VlbiBncm91cHMgb2YgdmFyaW91cyBudW1iZXJzXG4gIHZhciBzZWxlY3RlZEVsZW1lbnQgPSB0aGlzLnNlbGVjdGVkRWxlbWVudHMgJiYgdGhpcy5zZWxlY3RlZEVsZW1lbnRzWzBdO1xuICB0aGlzLnNlbGVjdENlbGwoIHNlbGVjdGVkRWxlbWVudCwgZmFsc2UsIHRydWUgKTtcbn07XG5cbi8vIHdhdGNoZXMgdGhlIDphZnRlciBwcm9wZXJ0eSwgYWN0aXZhdGVzL2RlYWN0aXZhdGVzXG5wcm90by53YXRjaENTUyA9IGZ1bmN0aW9uKCkge1xuICB2YXIgd2F0Y2hPcHRpb24gPSB0aGlzLm9wdGlvbnMud2F0Y2hDU1M7XG4gIGlmICggIXdhdGNoT3B0aW9uICkge1xuICAgIHJldHVybjtcbiAgfVxuXG4gIHZhciBhZnRlckNvbnRlbnQgPSBnZXRDb21wdXRlZFN0eWxlKCB0aGlzLmVsZW1lbnQsICc6YWZ0ZXInICkuY29udGVudDtcbiAgLy8gYWN0aXZhdGUgaWYgOmFmdGVyIHsgY29udGVudDogJ2ZsaWNraXR5JyB9XG4gIGlmICggYWZ0ZXJDb250ZW50LmluZGV4T2YoJ2ZsaWNraXR5JykgIT0gLTEgKSB7XG4gICAgdGhpcy5hY3RpdmF0ZSgpO1xuICB9IGVsc2Uge1xuICAgIHRoaXMuZGVhY3RpdmF0ZSgpO1xuICB9XG59O1xuXG4vLyAtLS0tLSBrZXlkb3duIC0tLS0tIC8vXG5cbi8vIGdvIHByZXZpb3VzL25leHQgaWYgbGVmdC9yaWdodCBrZXlzIHByZXNzZWRcbnByb3RvLm9ua2V5ZG93biA9IGZ1bmN0aW9uKCBldmVudCApIHtcbiAgLy8gb25seSB3b3JrIGlmIGVsZW1lbnQgaXMgaW4gZm9jdXNcbiAgdmFyIGlzTm90Rm9jdXNlZCA9IGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQgJiYgZG9jdW1lbnQuYWN0aXZlRWxlbWVudCAhPSB0aGlzLmVsZW1lbnQ7XG4gIGlmICggIXRoaXMub3B0aW9ucy5hY2Nlc3NpYmlsaXR5IHx8aXNOb3RGb2N1c2VkICkge1xuICAgIHJldHVybjtcbiAgfVxuXG4gIHZhciBoYW5kbGVyID0gRmxpY2tpdHkua2V5Ym9hcmRIYW5kbGVyc1sgZXZlbnQua2V5Q29kZSBdO1xuICBpZiAoIGhhbmRsZXIgKSB7XG4gICAgaGFuZGxlci5jYWxsKCB0aGlzICk7XG4gIH1cbn07XG5cbkZsaWNraXR5LmtleWJvYXJkSGFuZGxlcnMgPSB7XG4gIC8vIGxlZnQgYXJyb3dcbiAgMzc6IGZ1bmN0aW9uKCkge1xuICAgIHZhciBsZWZ0TWV0aG9kID0gdGhpcy5vcHRpb25zLnJpZ2h0VG9MZWZ0ID8gJ25leHQnIDogJ3ByZXZpb3VzJztcbiAgICB0aGlzLnVpQ2hhbmdlKCk7XG4gICAgdGhpc1sgbGVmdE1ldGhvZCBdKCk7XG4gIH0sXG4gIC8vIHJpZ2h0IGFycm93XG4gIDM5OiBmdW5jdGlvbigpIHtcbiAgICB2YXIgcmlnaHRNZXRob2QgPSB0aGlzLm9wdGlvbnMucmlnaHRUb0xlZnQgPyAncHJldmlvdXMnIDogJ25leHQnO1xuICAgIHRoaXMudWlDaGFuZ2UoKTtcbiAgICB0aGlzWyByaWdodE1ldGhvZCBdKCk7XG4gIH0sXG59O1xuXG4vLyAtLS0tLSBmb2N1cyAtLS0tLSAvL1xuXG5wcm90by5mb2N1cyA9IGZ1bmN0aW9uKCkge1xuICAvLyBUT0RPIHJlbW92ZSBzY3JvbGxUbyBvbmNlIGZvY3VzIG9wdGlvbnMgZ2V0cyBtb3JlIHN1cHBvcnRcbiAgLy8gaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvQVBJL0hUTUxFbGVtZW50L2ZvY3VzI0Jyb3dzZXJfY29tcGF0aWJpbGl0eVxuICB2YXIgcHJldlNjcm9sbFkgPSB3aW5kb3cucGFnZVlPZmZzZXQ7XG4gIHRoaXMuZWxlbWVudC5mb2N1cyh7IHByZXZlbnRTY3JvbGw6IHRydWUgfSk7XG4gIC8vIGhhY2sgdG8gZml4IHNjcm9sbCBqdW1wIGFmdGVyIGZvY3VzLCAjNzZcbiAgaWYgKCB3aW5kb3cucGFnZVlPZmZzZXQgIT0gcHJldlNjcm9sbFkgKSB7XG4gICAgd2luZG93LnNjcm9sbFRvKCB3aW5kb3cucGFnZVhPZmZzZXQsIHByZXZTY3JvbGxZICk7XG4gIH1cbn07XG5cbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tIGRlc3Ryb3kgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gLy9cblxuLy8gZGVhY3RpdmF0ZSBhbGwgRmxpY2tpdHkgZnVuY3Rpb25hbGl0eSwgYnV0IGtlZXAgc3R1ZmYgYXZhaWxhYmxlXG5wcm90by5kZWFjdGl2YXRlID0gZnVuY3Rpb24oKSB7XG4gIGlmICggIXRoaXMuaXNBY3RpdmUgKSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIHRoaXMuZWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKCdmbGlja2l0eS1lbmFibGVkJyk7XG4gIHRoaXMuZWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKCdmbGlja2l0eS1ydGwnKTtcbiAgdGhpcy51bnNlbGVjdFNlbGVjdGVkU2xpZGUoKTtcbiAgLy8gZGVzdHJveSBjZWxsc1xuICB0aGlzLmNlbGxzLmZvckVhY2goIGZ1bmN0aW9uKCBjZWxsICkge1xuICAgIGNlbGwuZGVzdHJveSgpO1xuICB9KTtcbiAgdGhpcy5lbGVtZW50LnJlbW92ZUNoaWxkKCB0aGlzLnZpZXdwb3J0ICk7XG4gIC8vIG1vdmUgY2hpbGQgZWxlbWVudHMgYmFjayBpbnRvIGVsZW1lbnRcbiAgbW92ZUVsZW1lbnRzKCB0aGlzLnNsaWRlci5jaGlsZHJlbiwgdGhpcy5lbGVtZW50ICk7XG4gIGlmICggdGhpcy5vcHRpb25zLmFjY2Vzc2liaWxpdHkgKSB7XG4gICAgdGhpcy5lbGVtZW50LnJlbW92ZUF0dHJpYnV0ZSgndGFiSW5kZXgnKTtcbiAgICB0aGlzLmVsZW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lciggJ2tleWRvd24nLCB0aGlzICk7XG4gIH1cbiAgLy8gc2V0IGZsYWdzXG4gIHRoaXMuaXNBY3RpdmUgPSBmYWxzZTtcbiAgdGhpcy5lbWl0RXZlbnQoJ2RlYWN0aXZhdGUnKTtcbn07XG5cbnByb3RvLmRlc3Ryb3kgPSBmdW5jdGlvbigpIHtcbiAgdGhpcy5kZWFjdGl2YXRlKCk7XG4gIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCAncmVzaXplJywgdGhpcyApO1xuICB0aGlzLmFsbE9mZigpO1xuICB0aGlzLmVtaXRFdmVudCgnZGVzdHJveScpO1xuICBpZiAoIGpRdWVyeSAmJiB0aGlzLiRlbGVtZW50ICkge1xuICAgIGpRdWVyeS5yZW1vdmVEYXRhKCB0aGlzLmVsZW1lbnQsICdmbGlja2l0eScgKTtcbiAgfVxuICBkZWxldGUgdGhpcy5lbGVtZW50LmZsaWNraXR5R1VJRDtcbiAgZGVsZXRlIGluc3RhbmNlc1sgdGhpcy5ndWlkIF07XG59O1xuXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSBwcm90b3R5cGUgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gLy9cblxudXRpbHMuZXh0ZW5kKCBwcm90bywgYW5pbWF0ZVByb3RvdHlwZSApO1xuXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSBleHRyYXMgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gLy9cblxuLyoqXG4gKiBnZXQgRmxpY2tpdHkgaW5zdGFuY2UgZnJvbSBlbGVtZW50XG4gKiBAcGFyYW0ge0VsZW1lbnR9IGVsZW1cbiAqIEByZXR1cm5zIHtGbGlja2l0eX1cbiAqL1xuRmxpY2tpdHkuZGF0YSA9IGZ1bmN0aW9uKCBlbGVtICkge1xuICBlbGVtID0gdXRpbHMuZ2V0UXVlcnlFbGVtZW50KCBlbGVtICk7XG4gIHZhciBpZCA9IGVsZW0gJiYgZWxlbS5mbGlja2l0eUdVSUQ7XG4gIHJldHVybiBpZCAmJiBpbnN0YW5jZXNbIGlkIF07XG59O1xuXG51dGlscy5odG1sSW5pdCggRmxpY2tpdHksICdmbGlja2l0eScgKTtcblxuaWYgKCBqUXVlcnkgJiYgalF1ZXJ5LmJyaWRnZXQgKSB7XG4gIGpRdWVyeS5icmlkZ2V0KCAnZmxpY2tpdHknLCBGbGlja2l0eSApO1xufVxuXG4vLyBzZXQgaW50ZXJuYWwgalF1ZXJ5LCBmb3IgV2VicGFjayArIGpRdWVyeSB2MywgIzQ3OFxuRmxpY2tpdHkuc2V0SlF1ZXJ5ID0gZnVuY3Rpb24oIGpxICkge1xuICBqUXVlcnkgPSBqcTtcbn07XG5cbkZsaWNraXR5LkNlbGwgPSBDZWxsO1xuRmxpY2tpdHkuU2xpZGUgPSBTbGlkZTtcblxucmV0dXJuIEZsaWNraXR5O1xuXG59KSk7XG4iLCIvKiFcbiAqIEZsaWNraXR5IHYyLjIuMVxuICogVG91Y2gsIHJlc3BvbnNpdmUsIGZsaWNrYWJsZSBjYXJvdXNlbHNcbiAqXG4gKiBMaWNlbnNlZCBHUEx2MyBmb3Igb3BlbiBzb3VyY2UgdXNlXG4gKiBvciBGbGlja2l0eSBDb21tZXJjaWFsIExpY2Vuc2UgZm9yIGNvbW1lcmNpYWwgdXNlXG4gKlxuICogaHR0cHM6Ly9mbGlja2l0eS5tZXRhZml6enkuY29cbiAqIENvcHlyaWdodCAyMDE1LTIwMTkgTWV0YWZpenp5XG4gKi9cblxuKCBmdW5jdGlvbiggd2luZG93LCBmYWN0b3J5ICkge1xuICAvLyB1bml2ZXJzYWwgbW9kdWxlIGRlZmluaXRpb25cbiAgLyoganNoaW50IHN0cmljdDogZmFsc2UgKi9cbiAgaWYgKCB0eXBlb2YgZGVmaW5lID09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZCApIHtcbiAgICAvLyBBTURcbiAgICBkZWZpbmUoIFtcbiAgICAgICcuL2ZsaWNraXR5JyxcbiAgICAgICcuL2RyYWcnLFxuICAgICAgJy4vcHJldi1uZXh0LWJ1dHRvbicsXG4gICAgICAnLi9wYWdlLWRvdHMnLFxuICAgICAgJy4vcGxheWVyJyxcbiAgICAgICcuL2FkZC1yZW1vdmUtY2VsbCcsXG4gICAgICAnLi9sYXp5bG9hZCdcbiAgICBdLCBmYWN0b3J5ICk7XG4gIH0gZWxzZSBpZiAoIHR5cGVvZiBtb2R1bGUgPT0gJ29iamVjdCcgJiYgbW9kdWxlLmV4cG9ydHMgKSB7XG4gICAgLy8gQ29tbW9uSlNcbiAgICBtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkoXG4gICAgICByZXF1aXJlKCcuL2ZsaWNraXR5JyksXG4gICAgICByZXF1aXJlKCcuL2RyYWcnKSxcbiAgICAgIHJlcXVpcmUoJy4vcHJldi1uZXh0LWJ1dHRvbicpLFxuICAgICAgcmVxdWlyZSgnLi9wYWdlLWRvdHMnKSxcbiAgICAgIHJlcXVpcmUoJy4vcGxheWVyJyksXG4gICAgICByZXF1aXJlKCcuL2FkZC1yZW1vdmUtY2VsbCcpLFxuICAgICAgcmVxdWlyZSgnLi9sYXp5bG9hZCcpXG4gICAgKTtcbiAgfVxuXG59KSggd2luZG93LCBmdW5jdGlvbiBmYWN0b3J5KCBGbGlja2l0eSApIHtcbiAgLypqc2hpbnQgc3RyaWN0OiBmYWxzZSovXG4gIHJldHVybiBGbGlja2l0eTtcbn0pO1xuIiwiLy8gbGF6eWxvYWRcbiggZnVuY3Rpb24oIHdpbmRvdywgZmFjdG9yeSApIHtcbiAgLy8gdW5pdmVyc2FsIG1vZHVsZSBkZWZpbml0aW9uXG4gIC8qIGpzaGludCBzdHJpY3Q6IGZhbHNlICovXG4gIGlmICggdHlwZW9mIGRlZmluZSA9PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQgKSB7XG4gICAgLy8gQU1EXG4gICAgZGVmaW5lKCBbXG4gICAgICAnLi9mbGlja2l0eScsXG4gICAgICAnZml6enktdWktdXRpbHMvdXRpbHMnXG4gICAgXSwgZnVuY3Rpb24oIEZsaWNraXR5LCB1dGlscyApIHtcbiAgICAgIHJldHVybiBmYWN0b3J5KCB3aW5kb3csIEZsaWNraXR5LCB1dGlscyApO1xuICAgIH0pO1xuICB9IGVsc2UgaWYgKCB0eXBlb2YgbW9kdWxlID09ICdvYmplY3QnICYmIG1vZHVsZS5leHBvcnRzICkge1xuICAgIC8vIENvbW1vbkpTXG4gICAgbW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KFxuICAgICAgd2luZG93LFxuICAgICAgcmVxdWlyZSgnLi9mbGlja2l0eScpLFxuICAgICAgcmVxdWlyZSgnZml6enktdWktdXRpbHMnKVxuICAgICk7XG4gIH0gZWxzZSB7XG4gICAgLy8gYnJvd3NlciBnbG9iYWxcbiAgICBmYWN0b3J5KFxuICAgICAgd2luZG93LFxuICAgICAgd2luZG93LkZsaWNraXR5LFxuICAgICAgd2luZG93LmZpenp5VUlVdGlsc1xuICAgICk7XG4gIH1cblxufSggd2luZG93LCBmdW5jdGlvbiBmYWN0b3J5KCB3aW5kb3csIEZsaWNraXR5LCB1dGlscyApIHtcbid1c2Ugc3RyaWN0JztcblxuRmxpY2tpdHkuY3JlYXRlTWV0aG9kcy5wdXNoKCdfY3JlYXRlTGF6eWxvYWQnKTtcbnZhciBwcm90byA9IEZsaWNraXR5LnByb3RvdHlwZTtcblxucHJvdG8uX2NyZWF0ZUxhenlsb2FkID0gZnVuY3Rpb24oKSB7XG4gIHRoaXMub24oICdzZWxlY3QnLCB0aGlzLmxhenlMb2FkICk7XG59O1xuXG5wcm90by5sYXp5TG9hZCA9IGZ1bmN0aW9uKCkge1xuICB2YXIgbGF6eUxvYWQgPSB0aGlzLm9wdGlvbnMubGF6eUxvYWQ7XG4gIGlmICggIWxhenlMb2FkICkge1xuICAgIHJldHVybjtcbiAgfVxuICAvLyBnZXQgYWRqYWNlbnQgY2VsbHMsIHVzZSBsYXp5TG9hZCBvcHRpb24gZm9yIGFkamFjZW50IGNvdW50XG4gIHZhciBhZGpDb3VudCA9IHR5cGVvZiBsYXp5TG9hZCA9PSAnbnVtYmVyJyA/IGxhenlMb2FkIDogMDtcbiAgdmFyIGNlbGxFbGVtcyA9IHRoaXMuZ2V0QWRqYWNlbnRDZWxsRWxlbWVudHMoIGFkakNvdW50ICk7XG4gIC8vIGdldCBsYXp5IGltYWdlcyBpbiB0aG9zZSBjZWxsc1xuICB2YXIgbGF6eUltYWdlcyA9IFtdO1xuICBjZWxsRWxlbXMuZm9yRWFjaCggZnVuY3Rpb24oIGNlbGxFbGVtICkge1xuICAgIHZhciBsYXp5Q2VsbEltYWdlcyA9IGdldENlbGxMYXp5SW1hZ2VzKCBjZWxsRWxlbSApO1xuICAgIGxhenlJbWFnZXMgPSBsYXp5SW1hZ2VzLmNvbmNhdCggbGF6eUNlbGxJbWFnZXMgKTtcbiAgfSk7XG4gIC8vIGxvYWQgbGF6eSBpbWFnZXNcbiAgbGF6eUltYWdlcy5mb3JFYWNoKCBmdW5jdGlvbiggaW1nICkge1xuICAgIG5ldyBMYXp5TG9hZGVyKCBpbWcsIHRoaXMgKTtcbiAgfSwgdGhpcyApO1xufTtcblxuZnVuY3Rpb24gZ2V0Q2VsbExhenlJbWFnZXMoIGNlbGxFbGVtICkge1xuICAvLyBjaGVjayBpZiBjZWxsIGVsZW1lbnQgaXMgbGF6eSBpbWFnZVxuICBpZiAoIGNlbGxFbGVtLm5vZGVOYW1lID09ICdJTUcnICkge1xuICAgIHZhciBsYXp5bG9hZEF0dHIgPSBjZWxsRWxlbS5nZXRBdHRyaWJ1dGUoJ2RhdGEtZmxpY2tpdHktbGF6eWxvYWQnKTtcbiAgICB2YXIgc3JjQXR0ciA9IGNlbGxFbGVtLmdldEF0dHJpYnV0ZSgnZGF0YS1mbGlja2l0eS1sYXp5bG9hZC1zcmMnKTtcbiAgICB2YXIgc3Jjc2V0QXR0ciA9IGNlbGxFbGVtLmdldEF0dHJpYnV0ZSgnZGF0YS1mbGlja2l0eS1sYXp5bG9hZC1zcmNzZXQnKTtcbiAgICBpZiAoIGxhenlsb2FkQXR0ciB8fCBzcmNBdHRyIHx8IHNyY3NldEF0dHIgKSB7XG4gICAgICByZXR1cm4gWyBjZWxsRWxlbSBdO1xuICAgIH1cbiAgfVxuICAvLyBzZWxlY3QgbGF6eSBpbWFnZXMgaW4gY2VsbFxuICB2YXIgbGF6eVNlbGVjdG9yID0gJ2ltZ1tkYXRhLWZsaWNraXR5LWxhenlsb2FkXSwgJyArXG4gICAgJ2ltZ1tkYXRhLWZsaWNraXR5LWxhenlsb2FkLXNyY10sIGltZ1tkYXRhLWZsaWNraXR5LWxhenlsb2FkLXNyY3NldF0nO1xuICB2YXIgaW1ncyA9IGNlbGxFbGVtLnF1ZXJ5U2VsZWN0b3JBbGwoIGxhenlTZWxlY3RvciApO1xuICByZXR1cm4gdXRpbHMubWFrZUFycmF5KCBpbWdzICk7XG59XG5cbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tIExhenlMb2FkZXIgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gLy9cblxuLyoqXG4gKiBjbGFzcyB0byBoYW5kbGUgbG9hZGluZyBpbWFnZXNcbiAqL1xuZnVuY3Rpb24gTGF6eUxvYWRlciggaW1nLCBmbGlja2l0eSApIHtcbiAgdGhpcy5pbWcgPSBpbWc7XG4gIHRoaXMuZmxpY2tpdHkgPSBmbGlja2l0eTtcbiAgdGhpcy5sb2FkKCk7XG59XG5cbkxhenlMb2FkZXIucHJvdG90eXBlLmhhbmRsZUV2ZW50ID0gdXRpbHMuaGFuZGxlRXZlbnQ7XG5cbkxhenlMb2FkZXIucHJvdG90eXBlLmxvYWQgPSBmdW5jdGlvbigpIHtcbiAgdGhpcy5pbWcuYWRkRXZlbnRMaXN0ZW5lciggJ2xvYWQnLCB0aGlzICk7XG4gIHRoaXMuaW1nLmFkZEV2ZW50TGlzdGVuZXIoICdlcnJvcicsIHRoaXMgKTtcbiAgLy8gZ2V0IHNyYyAmIHNyY3NldFxuICB2YXIgc3JjID0gdGhpcy5pbWcuZ2V0QXR0cmlidXRlKCdkYXRhLWZsaWNraXR5LWxhenlsb2FkJykgfHxcbiAgICB0aGlzLmltZy5nZXRBdHRyaWJ1dGUoJ2RhdGEtZmxpY2tpdHktbGF6eWxvYWQtc3JjJyk7XG4gIHZhciBzcmNzZXQgPSB0aGlzLmltZy5nZXRBdHRyaWJ1dGUoJ2RhdGEtZmxpY2tpdHktbGF6eWxvYWQtc3Jjc2V0Jyk7XG4gIC8vIHNldCBzcmMgJiBzZXJzZXRcbiAgdGhpcy5pbWcuc3JjID0gc3JjO1xuICBpZiAoIHNyY3NldCApIHtcbiAgICB0aGlzLmltZy5zZXRBdHRyaWJ1dGUoICdzcmNzZXQnLCBzcmNzZXQgKTtcbiAgfVxuICAvLyByZW1vdmUgYXR0clxuICB0aGlzLmltZy5yZW1vdmVBdHRyaWJ1dGUoJ2RhdGEtZmxpY2tpdHktbGF6eWxvYWQnKTtcbiAgdGhpcy5pbWcucmVtb3ZlQXR0cmlidXRlKCdkYXRhLWZsaWNraXR5LWxhenlsb2FkLXNyYycpO1xuICB0aGlzLmltZy5yZW1vdmVBdHRyaWJ1dGUoJ2RhdGEtZmxpY2tpdHktbGF6eWxvYWQtc3Jjc2V0Jyk7XG59O1xuXG5MYXp5TG9hZGVyLnByb3RvdHlwZS5vbmxvYWQgPSBmdW5jdGlvbiggZXZlbnQgKSB7XG4gIHRoaXMuY29tcGxldGUoIGV2ZW50LCAnZmxpY2tpdHktbGF6eWxvYWRlZCcgKTtcbn07XG5cbkxhenlMb2FkZXIucHJvdG90eXBlLm9uZXJyb3IgPSBmdW5jdGlvbiggZXZlbnQgKSB7XG4gIHRoaXMuY29tcGxldGUoIGV2ZW50LCAnZmxpY2tpdHktbGF6eWVycm9yJyApO1xufTtcblxuTGF6eUxvYWRlci5wcm90b3R5cGUuY29tcGxldGUgPSBmdW5jdGlvbiggZXZlbnQsIGNsYXNzTmFtZSApIHtcbiAgLy8gdW5iaW5kIGV2ZW50c1xuICB0aGlzLmltZy5yZW1vdmVFdmVudExpc3RlbmVyKCAnbG9hZCcsIHRoaXMgKTtcbiAgdGhpcy5pbWcucmVtb3ZlRXZlbnRMaXN0ZW5lciggJ2Vycm9yJywgdGhpcyApO1xuXG4gIHZhciBjZWxsID0gdGhpcy5mbGlja2l0eS5nZXRQYXJlbnRDZWxsKCB0aGlzLmltZyApO1xuICB2YXIgY2VsbEVsZW0gPSBjZWxsICYmIGNlbGwuZWxlbWVudDtcbiAgdGhpcy5mbGlja2l0eS5jZWxsU2l6ZUNoYW5nZSggY2VsbEVsZW0gKTtcblxuICB0aGlzLmltZy5jbGFzc0xpc3QuYWRkKCBjbGFzc05hbWUgKTtcbiAgdGhpcy5mbGlja2l0eS5kaXNwYXRjaEV2ZW50KCAnbGF6eUxvYWQnLCBldmVudCwgY2VsbEVsZW0gKTtcbn07XG5cbi8vIC0tLS0tICAtLS0tLSAvL1xuXG5GbGlja2l0eS5MYXp5TG9hZGVyID0gTGF6eUxvYWRlcjtcblxucmV0dXJuIEZsaWNraXR5O1xuXG59KSk7XG4iLCIvLyBwYWdlIGRvdHNcbiggZnVuY3Rpb24oIHdpbmRvdywgZmFjdG9yeSApIHtcbiAgLy8gdW5pdmVyc2FsIG1vZHVsZSBkZWZpbml0aW9uXG4gIC8qIGpzaGludCBzdHJpY3Q6IGZhbHNlICovXG4gIGlmICggdHlwZW9mIGRlZmluZSA9PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQgKSB7XG4gICAgLy8gQU1EXG4gICAgZGVmaW5lKCBbXG4gICAgICAnLi9mbGlja2l0eScsXG4gICAgICAndW5pcG9pbnRlci91bmlwb2ludGVyJyxcbiAgICAgICdmaXp6eS11aS11dGlscy91dGlscydcbiAgICBdLCBmdW5jdGlvbiggRmxpY2tpdHksIFVuaXBvaW50ZXIsIHV0aWxzICkge1xuICAgICAgcmV0dXJuIGZhY3RvcnkoIHdpbmRvdywgRmxpY2tpdHksIFVuaXBvaW50ZXIsIHV0aWxzICk7XG4gICAgfSk7XG4gIH0gZWxzZSBpZiAoIHR5cGVvZiBtb2R1bGUgPT0gJ29iamVjdCcgJiYgbW9kdWxlLmV4cG9ydHMgKSB7XG4gICAgLy8gQ29tbW9uSlNcbiAgICBtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkoXG4gICAgICB3aW5kb3csXG4gICAgICByZXF1aXJlKCcuL2ZsaWNraXR5JyksXG4gICAgICByZXF1aXJlKCd1bmlwb2ludGVyJyksXG4gICAgICByZXF1aXJlKCdmaXp6eS11aS11dGlscycpXG4gICAgKTtcbiAgfSBlbHNlIHtcbiAgICAvLyBicm93c2VyIGdsb2JhbFxuICAgIGZhY3RvcnkoXG4gICAgICB3aW5kb3csXG4gICAgICB3aW5kb3cuRmxpY2tpdHksXG4gICAgICB3aW5kb3cuVW5pcG9pbnRlcixcbiAgICAgIHdpbmRvdy5maXp6eVVJVXRpbHNcbiAgICApO1xuICB9XG5cbn0oIHdpbmRvdywgZnVuY3Rpb24gZmFjdG9yeSggd2luZG93LCBGbGlja2l0eSwgVW5pcG9pbnRlciwgdXRpbHMgKSB7XG5cbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tIFBhZ2VEb3RzIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tIC8vXG5cbid1c2Ugc3RyaWN0JztcblxuZnVuY3Rpb24gUGFnZURvdHMoIHBhcmVudCApIHtcbiAgdGhpcy5wYXJlbnQgPSBwYXJlbnQ7XG4gIHRoaXMuX2NyZWF0ZSgpO1xufVxuXG5QYWdlRG90cy5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKCBVbmlwb2ludGVyLnByb3RvdHlwZSApO1xuXG5QYWdlRG90cy5wcm90b3R5cGUuX2NyZWF0ZSA9IGZ1bmN0aW9uKCkge1xuICAvLyBjcmVhdGUgaG9sZGVyIGVsZW1lbnRcbiAgdGhpcy5ob2xkZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdvbCcpO1xuICB0aGlzLmhvbGRlci5jbGFzc05hbWUgPSAnZmxpY2tpdHktcGFnZS1kb3RzJztcbiAgLy8gY3JlYXRlIGRvdHMsIGFycmF5IG9mIGVsZW1lbnRzXG4gIHRoaXMuZG90cyA9IFtdO1xuICAvLyBldmVudHNcbiAgdGhpcy5oYW5kbGVDbGljayA9IHRoaXMub25DbGljay5iaW5kKCB0aGlzICk7XG4gIHRoaXMub24oICdwb2ludGVyRG93bicsIHRoaXMucGFyZW50LmNoaWxkVUlQb2ludGVyRG93bi5iaW5kKCB0aGlzLnBhcmVudCApICk7XG59O1xuXG5QYWdlRG90cy5wcm90b3R5cGUuYWN0aXZhdGUgPSBmdW5jdGlvbigpIHtcbiAgdGhpcy5zZXREb3RzKCk7XG4gIHRoaXMuaG9sZGVyLmFkZEV2ZW50TGlzdGVuZXIoICdjbGljaycsIHRoaXMuaGFuZGxlQ2xpY2sgKTtcbiAgdGhpcy5iaW5kU3RhcnRFdmVudCggdGhpcy5ob2xkZXIgKTtcbiAgLy8gYWRkIHRvIERPTVxuICB0aGlzLnBhcmVudC5lbGVtZW50LmFwcGVuZENoaWxkKCB0aGlzLmhvbGRlciApO1xufTtcblxuUGFnZURvdHMucHJvdG90eXBlLmRlYWN0aXZhdGUgPSBmdW5jdGlvbigpIHtcbiAgdGhpcy5ob2xkZXIucmVtb3ZlRXZlbnRMaXN0ZW5lciggJ2NsaWNrJywgdGhpcy5oYW5kbGVDbGljayApO1xuICB0aGlzLnVuYmluZFN0YXJ0RXZlbnQoIHRoaXMuaG9sZGVyICk7XG4gIC8vIHJlbW92ZSBmcm9tIERPTVxuICB0aGlzLnBhcmVudC5lbGVtZW50LnJlbW92ZUNoaWxkKCB0aGlzLmhvbGRlciApO1xufTtcblxuUGFnZURvdHMucHJvdG90eXBlLnNldERvdHMgPSBmdW5jdGlvbigpIHtcbiAgLy8gZ2V0IGRpZmZlcmVuY2UgYmV0d2VlbiBudW1iZXIgb2Ygc2xpZGVzIGFuZCBudW1iZXIgb2YgZG90c1xuICB2YXIgZGVsdGEgPSB0aGlzLnBhcmVudC5zbGlkZXMubGVuZ3RoIC0gdGhpcy5kb3RzLmxlbmd0aDtcbiAgaWYgKCBkZWx0YSA+IDAgKSB7XG4gICAgdGhpcy5hZGREb3RzKCBkZWx0YSApO1xuICB9IGVsc2UgaWYgKCBkZWx0YSA8IDAgKSB7XG4gICAgdGhpcy5yZW1vdmVEb3RzKCAtZGVsdGEgKTtcbiAgfVxufTtcblxuUGFnZURvdHMucHJvdG90eXBlLmFkZERvdHMgPSBmdW5jdGlvbiggY291bnQgKSB7XG4gIHZhciBmcmFnbWVudCA9IGRvY3VtZW50LmNyZWF0ZURvY3VtZW50RnJhZ21lbnQoKTtcbiAgdmFyIG5ld0RvdHMgPSBbXTtcbiAgdmFyIGxlbmd0aCA9IHRoaXMuZG90cy5sZW5ndGg7XG4gIHZhciBtYXggPSBsZW5ndGggKyBjb3VudDtcblxuICBmb3IgKCB2YXIgaSA9IGxlbmd0aDsgaSA8IG1heDsgaSsrICkge1xuICAgIHZhciBkb3QgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsaScpO1xuICAgIGRvdC5jbGFzc05hbWUgPSAnZG90JztcbiAgICBkb3Quc2V0QXR0cmlidXRlKCAnYXJpYS1sYWJlbCcsICdQYWdlIGRvdCAnICsgKCBpICsgMSApICk7XG4gICAgZnJhZ21lbnQuYXBwZW5kQ2hpbGQoIGRvdCApO1xuICAgIG5ld0RvdHMucHVzaCggZG90ICk7XG4gIH1cblxuICB0aGlzLmhvbGRlci5hcHBlbmRDaGlsZCggZnJhZ21lbnQgKTtcbiAgdGhpcy5kb3RzID0gdGhpcy5kb3RzLmNvbmNhdCggbmV3RG90cyApO1xufTtcblxuUGFnZURvdHMucHJvdG90eXBlLnJlbW92ZURvdHMgPSBmdW5jdGlvbiggY291bnQgKSB7XG4gIC8vIHJlbW92ZSBmcm9tIHRoaXMuZG90cyBjb2xsZWN0aW9uXG4gIHZhciByZW1vdmVEb3RzID0gdGhpcy5kb3RzLnNwbGljZSggdGhpcy5kb3RzLmxlbmd0aCAtIGNvdW50LCBjb3VudCApO1xuICAvLyByZW1vdmUgZnJvbSBET01cbiAgcmVtb3ZlRG90cy5mb3JFYWNoKCBmdW5jdGlvbiggZG90ICkge1xuICAgIHRoaXMuaG9sZGVyLnJlbW92ZUNoaWxkKCBkb3QgKTtcbiAgfSwgdGhpcyApO1xufTtcblxuUGFnZURvdHMucHJvdG90eXBlLnVwZGF0ZVNlbGVjdGVkID0gZnVuY3Rpb24oKSB7XG4gIC8vIHJlbW92ZSBzZWxlY3RlZCBjbGFzcyBvbiBwcmV2aW91c1xuICBpZiAoIHRoaXMuc2VsZWN0ZWREb3QgKSB7XG4gICAgdGhpcy5zZWxlY3RlZERvdC5jbGFzc05hbWUgPSAnZG90JztcbiAgICB0aGlzLnNlbGVjdGVkRG90LnJlbW92ZUF0dHJpYnV0ZSgnYXJpYS1jdXJyZW50Jyk7XG4gIH1cbiAgLy8gZG9uJ3QgcHJvY2VlZCBpZiBubyBkb3RzXG4gIGlmICggIXRoaXMuZG90cy5sZW5ndGggKSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIHRoaXMuc2VsZWN0ZWREb3QgPSB0aGlzLmRvdHNbIHRoaXMucGFyZW50LnNlbGVjdGVkSW5kZXggXTtcbiAgdGhpcy5zZWxlY3RlZERvdC5jbGFzc05hbWUgPSAnZG90IGlzLXNlbGVjdGVkJztcbiAgdGhpcy5zZWxlY3RlZERvdC5zZXRBdHRyaWJ1dGUoICdhcmlhLWN1cnJlbnQnLCAnc3RlcCcgKTtcbn07XG5cblBhZ2VEb3RzLnByb3RvdHlwZS5vblRhcCA9IC8vIG9sZCBtZXRob2QgbmFtZSwgYmFja3dhcmRzLWNvbXBhdGlibGVcblBhZ2VEb3RzLnByb3RvdHlwZS5vbkNsaWNrID0gZnVuY3Rpb24oIGV2ZW50ICkge1xuICB2YXIgdGFyZ2V0ID0gZXZlbnQudGFyZ2V0O1xuICAvLyBvbmx5IGNhcmUgYWJvdXQgZG90IGNsaWNrc1xuICBpZiAoIHRhcmdldC5ub2RlTmFtZSAhPSAnTEknICkge1xuICAgIHJldHVybjtcbiAgfVxuXG4gIHRoaXMucGFyZW50LnVpQ2hhbmdlKCk7XG4gIHZhciBpbmRleCA9IHRoaXMuZG90cy5pbmRleE9mKCB0YXJnZXQgKTtcbiAgdGhpcy5wYXJlbnQuc2VsZWN0KCBpbmRleCApO1xufTtcblxuUGFnZURvdHMucHJvdG90eXBlLmRlc3Ryb3kgPSBmdW5jdGlvbigpIHtcbiAgdGhpcy5kZWFjdGl2YXRlKCk7XG4gIHRoaXMuYWxsT2ZmKCk7XG59O1xuXG5GbGlja2l0eS5QYWdlRG90cyA9IFBhZ2VEb3RzO1xuXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSBGbGlja2l0eSAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAvL1xuXG51dGlscy5leHRlbmQoIEZsaWNraXR5LmRlZmF1bHRzLCB7XG4gIHBhZ2VEb3RzOiB0cnVlXG59KTtcblxuRmxpY2tpdHkuY3JlYXRlTWV0aG9kcy5wdXNoKCdfY3JlYXRlUGFnZURvdHMnKTtcblxudmFyIHByb3RvID0gRmxpY2tpdHkucHJvdG90eXBlO1xuXG5wcm90by5fY3JlYXRlUGFnZURvdHMgPSBmdW5jdGlvbigpIHtcbiAgaWYgKCAhdGhpcy5vcHRpb25zLnBhZ2VEb3RzICkge1xuICAgIHJldHVybjtcbiAgfVxuICB0aGlzLnBhZ2VEb3RzID0gbmV3IFBhZ2VEb3RzKCB0aGlzICk7XG4gIC8vIGV2ZW50c1xuICB0aGlzLm9uKCAnYWN0aXZhdGUnLCB0aGlzLmFjdGl2YXRlUGFnZURvdHMgKTtcbiAgdGhpcy5vbiggJ3NlbGVjdCcsIHRoaXMudXBkYXRlU2VsZWN0ZWRQYWdlRG90cyApO1xuICB0aGlzLm9uKCAnY2VsbENoYW5nZScsIHRoaXMudXBkYXRlUGFnZURvdHMgKTtcbiAgdGhpcy5vbiggJ3Jlc2l6ZScsIHRoaXMudXBkYXRlUGFnZURvdHMgKTtcbiAgdGhpcy5vbiggJ2RlYWN0aXZhdGUnLCB0aGlzLmRlYWN0aXZhdGVQYWdlRG90cyApO1xufTtcblxucHJvdG8uYWN0aXZhdGVQYWdlRG90cyA9IGZ1bmN0aW9uKCkge1xuICB0aGlzLnBhZ2VEb3RzLmFjdGl2YXRlKCk7XG59O1xuXG5wcm90by51cGRhdGVTZWxlY3RlZFBhZ2VEb3RzID0gZnVuY3Rpb24oKSB7XG4gIHRoaXMucGFnZURvdHMudXBkYXRlU2VsZWN0ZWQoKTtcbn07XG5cbnByb3RvLnVwZGF0ZVBhZ2VEb3RzID0gZnVuY3Rpb24oKSB7XG4gIHRoaXMucGFnZURvdHMuc2V0RG90cygpO1xufTtcblxucHJvdG8uZGVhY3RpdmF0ZVBhZ2VEb3RzID0gZnVuY3Rpb24oKSB7XG4gIHRoaXMucGFnZURvdHMuZGVhY3RpdmF0ZSgpO1xufTtcblxuLy8gLS0tLS0gIC0tLS0tIC8vXG5cbkZsaWNraXR5LlBhZ2VEb3RzID0gUGFnZURvdHM7XG5cbnJldHVybiBGbGlja2l0eTtcblxufSkpO1xuIiwiLy8gcGxheWVyICYgYXV0b1BsYXlcbiggZnVuY3Rpb24oIHdpbmRvdywgZmFjdG9yeSApIHtcbiAgLy8gdW5pdmVyc2FsIG1vZHVsZSBkZWZpbml0aW9uXG4gIC8qIGpzaGludCBzdHJpY3Q6IGZhbHNlICovXG4gIGlmICggdHlwZW9mIGRlZmluZSA9PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQgKSB7XG4gICAgLy8gQU1EXG4gICAgZGVmaW5lKCBbXG4gICAgICAnZXYtZW1pdHRlci9ldi1lbWl0dGVyJyxcbiAgICAgICdmaXp6eS11aS11dGlscy91dGlscycsXG4gICAgICAnLi9mbGlja2l0eSdcbiAgICBdLCBmdW5jdGlvbiggRXZFbWl0dGVyLCB1dGlscywgRmxpY2tpdHkgKSB7XG4gICAgICByZXR1cm4gZmFjdG9yeSggRXZFbWl0dGVyLCB1dGlscywgRmxpY2tpdHkgKTtcbiAgICB9KTtcbiAgfSBlbHNlIGlmICggdHlwZW9mIG1vZHVsZSA9PSAnb2JqZWN0JyAmJiBtb2R1bGUuZXhwb3J0cyApIHtcbiAgICAvLyBDb21tb25KU1xuICAgIG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeShcbiAgICAgIHJlcXVpcmUoJ2V2LWVtaXR0ZXInKSxcbiAgICAgIHJlcXVpcmUoJ2Zpenp5LXVpLXV0aWxzJyksXG4gICAgICByZXF1aXJlKCcuL2ZsaWNraXR5JylcbiAgICApO1xuICB9IGVsc2Uge1xuICAgIC8vIGJyb3dzZXIgZ2xvYmFsXG4gICAgZmFjdG9yeShcbiAgICAgIHdpbmRvdy5FdkVtaXR0ZXIsXG4gICAgICB3aW5kb3cuZml6enlVSVV0aWxzLFxuICAgICAgd2luZG93LkZsaWNraXR5XG4gICAgKTtcbiAgfVxuXG59KCB3aW5kb3csIGZ1bmN0aW9uIGZhY3RvcnkoIEV2RW1pdHRlciwgdXRpbHMsIEZsaWNraXR5ICkge1xuXG4ndXNlIHN0cmljdCc7XG5cbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tIFBsYXllciAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAvL1xuXG5mdW5jdGlvbiBQbGF5ZXIoIHBhcmVudCApIHtcbiAgdGhpcy5wYXJlbnQgPSBwYXJlbnQ7XG4gIHRoaXMuc3RhdGUgPSAnc3RvcHBlZCc7XG4gIC8vIHZpc2liaWxpdHkgY2hhbmdlIGV2ZW50IGhhbmRsZXJcbiAgdGhpcy5vblZpc2liaWxpdHlDaGFuZ2UgPSB0aGlzLnZpc2liaWxpdHlDaGFuZ2UuYmluZCggdGhpcyApO1xuICB0aGlzLm9uVmlzaWJpbGl0eVBsYXkgPSB0aGlzLnZpc2liaWxpdHlQbGF5LmJpbmQoIHRoaXMgKTtcbn1cblxuUGxheWVyLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoIEV2RW1pdHRlci5wcm90b3R5cGUgKTtcblxuLy8gc3RhcnQgcGxheVxuUGxheWVyLnByb3RvdHlwZS5wbGF5ID0gZnVuY3Rpb24oKSB7XG4gIGlmICggdGhpcy5zdGF0ZSA9PSAncGxheWluZycgKSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIC8vIGRvIG5vdCBwbGF5IGlmIHBhZ2UgaXMgaGlkZGVuLCBzdGFydCBwbGF5aW5nIHdoZW4gcGFnZSBpcyB2aXNpYmxlXG4gIHZhciBpc1BhZ2VIaWRkZW4gPSBkb2N1bWVudC5oaWRkZW47XG4gIGlmICggaXNQYWdlSGlkZGVuICkge1xuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoICd2aXNpYmlsaXR5Y2hhbmdlJywgdGhpcy5vblZpc2liaWxpdHlQbGF5ICk7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgdGhpcy5zdGF0ZSA9ICdwbGF5aW5nJztcbiAgLy8gbGlzdGVuIHRvIHZpc2liaWxpdHkgY2hhbmdlXG4gIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoICd2aXNpYmlsaXR5Y2hhbmdlJywgdGhpcy5vblZpc2liaWxpdHlDaGFuZ2UgKTtcbiAgLy8gc3RhcnQgdGlja2luZ1xuICB0aGlzLnRpY2soKTtcbn07XG5cblBsYXllci5wcm90b3R5cGUudGljayA9IGZ1bmN0aW9uKCkge1xuICAvLyBkbyBub3QgdGljayBpZiBub3QgcGxheWluZ1xuICBpZiAoIHRoaXMuc3RhdGUgIT0gJ3BsYXlpbmcnICkge1xuICAgIHJldHVybjtcbiAgfVxuXG4gIHZhciB0aW1lID0gdGhpcy5wYXJlbnQub3B0aW9ucy5hdXRvUGxheTtcbiAgLy8gZGVmYXVsdCB0byAzIHNlY29uZHNcbiAgdGltZSA9IHR5cGVvZiB0aW1lID09ICdudW1iZXInID8gdGltZSA6IDMwMDA7XG4gIHZhciBfdGhpcyA9IHRoaXM7XG4gIC8vIEhBQ0s6IHJlc2V0IHRpY2tzIGlmIHN0b3BwZWQgYW5kIHN0YXJ0ZWQgd2l0aGluIGludGVydmFsXG4gIHRoaXMuY2xlYXIoKTtcbiAgdGhpcy50aW1lb3V0ID0gc2V0VGltZW91dCggZnVuY3Rpb24oKSB7XG4gICAgX3RoaXMucGFyZW50Lm5leHQoIHRydWUgKTtcbiAgICBfdGhpcy50aWNrKCk7XG4gIH0sIHRpbWUgKTtcbn07XG5cblBsYXllci5wcm90b3R5cGUuc3RvcCA9IGZ1bmN0aW9uKCkge1xuICB0aGlzLnN0YXRlID0gJ3N0b3BwZWQnO1xuICB0aGlzLmNsZWFyKCk7XG4gIC8vIHJlbW92ZSB2aXNpYmlsaXR5IGNoYW5nZSBldmVudFxuICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCAndmlzaWJpbGl0eWNoYW5nZScsIHRoaXMub25WaXNpYmlsaXR5Q2hhbmdlICk7XG59O1xuXG5QbGF5ZXIucHJvdG90eXBlLmNsZWFyID0gZnVuY3Rpb24oKSB7XG4gIGNsZWFyVGltZW91dCggdGhpcy50aW1lb3V0ICk7XG59O1xuXG5QbGF5ZXIucHJvdG90eXBlLnBhdXNlID0gZnVuY3Rpb24oKSB7XG4gIGlmICggdGhpcy5zdGF0ZSA9PSAncGxheWluZycgKSB7XG4gICAgdGhpcy5zdGF0ZSA9ICdwYXVzZWQnO1xuICAgIHRoaXMuY2xlYXIoKTtcbiAgfVxufTtcblxuUGxheWVyLnByb3RvdHlwZS51bnBhdXNlID0gZnVuY3Rpb24oKSB7XG4gIC8vIHJlLXN0YXJ0IHBsYXkgaWYgcGF1c2VkXG4gIGlmICggdGhpcy5zdGF0ZSA9PSAncGF1c2VkJyApIHtcbiAgICB0aGlzLnBsYXkoKTtcbiAgfVxufTtcblxuLy8gcGF1c2UgaWYgcGFnZSB2aXNpYmlsaXR5IGlzIGhpZGRlbiwgdW5wYXVzZSBpZiB2aXNpYmxlXG5QbGF5ZXIucHJvdG90eXBlLnZpc2liaWxpdHlDaGFuZ2UgPSBmdW5jdGlvbigpIHtcbiAgdmFyIGlzUGFnZUhpZGRlbiA9IGRvY3VtZW50LmhpZGRlbjtcbiAgdGhpc1sgaXNQYWdlSGlkZGVuID8gJ3BhdXNlJyA6ICd1bnBhdXNlJyBdKCk7XG59O1xuXG5QbGF5ZXIucHJvdG90eXBlLnZpc2liaWxpdHlQbGF5ID0gZnVuY3Rpb24oKSB7XG4gIHRoaXMucGxheSgpO1xuICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCAndmlzaWJpbGl0eWNoYW5nZScsIHRoaXMub25WaXNpYmlsaXR5UGxheSApO1xufTtcblxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gRmxpY2tpdHkgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gLy9cblxudXRpbHMuZXh0ZW5kKCBGbGlja2l0eS5kZWZhdWx0cywge1xuICBwYXVzZUF1dG9QbGF5T25Ib3ZlcjogdHJ1ZVxufSk7XG5cbkZsaWNraXR5LmNyZWF0ZU1ldGhvZHMucHVzaCgnX2NyZWF0ZVBsYXllcicpO1xudmFyIHByb3RvID0gRmxpY2tpdHkucHJvdG90eXBlO1xuXG5wcm90by5fY3JlYXRlUGxheWVyID0gZnVuY3Rpb24oKSB7XG4gIHRoaXMucGxheWVyID0gbmV3IFBsYXllciggdGhpcyApO1xuXG4gIHRoaXMub24oICdhY3RpdmF0ZScsIHRoaXMuYWN0aXZhdGVQbGF5ZXIgKTtcbiAgdGhpcy5vbiggJ3VpQ2hhbmdlJywgdGhpcy5zdG9wUGxheWVyICk7XG4gIHRoaXMub24oICdwb2ludGVyRG93bicsIHRoaXMuc3RvcFBsYXllciApO1xuICB0aGlzLm9uKCAnZGVhY3RpdmF0ZScsIHRoaXMuZGVhY3RpdmF0ZVBsYXllciApO1xufTtcblxucHJvdG8uYWN0aXZhdGVQbGF5ZXIgPSBmdW5jdGlvbigpIHtcbiAgaWYgKCAhdGhpcy5vcHRpb25zLmF1dG9QbGF5ICkge1xuICAgIHJldHVybjtcbiAgfVxuICB0aGlzLnBsYXllci5wbGF5KCk7XG4gIHRoaXMuZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCAnbW91c2VlbnRlcicsIHRoaXMgKTtcbn07XG5cbi8vIFBsYXllciBBUEksIGRvbid0IGhhdGUgdGhlIC4uLiB0aGFua3MgSSBrbm93IHdoZXJlIHRoZSBkb29yIGlzXG5cbnByb3RvLnBsYXlQbGF5ZXIgPSBmdW5jdGlvbigpIHtcbiAgdGhpcy5wbGF5ZXIucGxheSgpO1xufTtcblxucHJvdG8uc3RvcFBsYXllciA9IGZ1bmN0aW9uKCkge1xuICB0aGlzLnBsYXllci5zdG9wKCk7XG59O1xuXG5wcm90by5wYXVzZVBsYXllciA9IGZ1bmN0aW9uKCkge1xuICB0aGlzLnBsYXllci5wYXVzZSgpO1xufTtcblxucHJvdG8udW5wYXVzZVBsYXllciA9IGZ1bmN0aW9uKCkge1xuICB0aGlzLnBsYXllci51bnBhdXNlKCk7XG59O1xuXG5wcm90by5kZWFjdGl2YXRlUGxheWVyID0gZnVuY3Rpb24oKSB7XG4gIHRoaXMucGxheWVyLnN0b3AoKTtcbiAgdGhpcy5lbGVtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoICdtb3VzZWVudGVyJywgdGhpcyApO1xufTtcblxuLy8gLS0tLS0gbW91c2VlbnRlci9sZWF2ZSAtLS0tLSAvL1xuXG4vLyBwYXVzZSBhdXRvLXBsYXkgb24gaG92ZXJcbnByb3RvLm9ubW91c2VlbnRlciA9IGZ1bmN0aW9uKCkge1xuICBpZiAoICF0aGlzLm9wdGlvbnMucGF1c2VBdXRvUGxheU9uSG92ZXIgKSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIHRoaXMucGxheWVyLnBhdXNlKCk7XG4gIHRoaXMuZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCAnbW91c2VsZWF2ZScsIHRoaXMgKTtcbn07XG5cbi8vIHJlc3VtZSBhdXRvLXBsYXkgb24gaG92ZXIgb2ZmXG5wcm90by5vbm1vdXNlbGVhdmUgPSBmdW5jdGlvbigpIHtcbiAgdGhpcy5wbGF5ZXIudW5wYXVzZSgpO1xuICB0aGlzLmVsZW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lciggJ21vdXNlbGVhdmUnLCB0aGlzICk7XG59O1xuXG4vLyAtLS0tLSAgLS0tLS0gLy9cblxuRmxpY2tpdHkuUGxheWVyID0gUGxheWVyO1xuXG5yZXR1cm4gRmxpY2tpdHk7XG5cbn0pKTtcbiIsIi8vIHByZXYvbmV4dCBidXR0b25zXG4oIGZ1bmN0aW9uKCB3aW5kb3csIGZhY3RvcnkgKSB7XG4gIC8vIHVuaXZlcnNhbCBtb2R1bGUgZGVmaW5pdGlvblxuICAvKiBqc2hpbnQgc3RyaWN0OiBmYWxzZSAqL1xuICBpZiAoIHR5cGVvZiBkZWZpbmUgPT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kICkge1xuICAgIC8vIEFNRFxuICAgIGRlZmluZSggW1xuICAgICAgJy4vZmxpY2tpdHknLFxuICAgICAgJ3VuaXBvaW50ZXIvdW5pcG9pbnRlcicsXG4gICAgICAnZml6enktdWktdXRpbHMvdXRpbHMnXG4gICAgXSwgZnVuY3Rpb24oIEZsaWNraXR5LCBVbmlwb2ludGVyLCB1dGlscyApIHtcbiAgICAgIHJldHVybiBmYWN0b3J5KCB3aW5kb3csIEZsaWNraXR5LCBVbmlwb2ludGVyLCB1dGlscyApO1xuICAgIH0pO1xuICB9IGVsc2UgaWYgKCB0eXBlb2YgbW9kdWxlID09ICdvYmplY3QnICYmIG1vZHVsZS5leHBvcnRzICkge1xuICAgIC8vIENvbW1vbkpTXG4gICAgbW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KFxuICAgICAgd2luZG93LFxuICAgICAgcmVxdWlyZSgnLi9mbGlja2l0eScpLFxuICAgICAgcmVxdWlyZSgndW5pcG9pbnRlcicpLFxuICAgICAgcmVxdWlyZSgnZml6enktdWktdXRpbHMnKVxuICAgICk7XG4gIH0gZWxzZSB7XG4gICAgLy8gYnJvd3NlciBnbG9iYWxcbiAgICBmYWN0b3J5KFxuICAgICAgd2luZG93LFxuICAgICAgd2luZG93LkZsaWNraXR5LFxuICAgICAgd2luZG93LlVuaXBvaW50ZXIsXG4gICAgICB3aW5kb3cuZml6enlVSVV0aWxzXG4gICAgKTtcbiAgfVxuXG59KCB3aW5kb3csIGZ1bmN0aW9uIGZhY3RvcnkoIHdpbmRvdywgRmxpY2tpdHksIFVuaXBvaW50ZXIsIHV0aWxzICkge1xuJ3VzZSBzdHJpY3QnO1xuXG52YXIgc3ZnVVJJID0gJ2h0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnJztcblxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gUHJldk5leHRCdXR0b24gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gLy9cblxuZnVuY3Rpb24gUHJldk5leHRCdXR0b24oIGRpcmVjdGlvbiwgcGFyZW50ICkge1xuICB0aGlzLmRpcmVjdGlvbiA9IGRpcmVjdGlvbjtcbiAgdGhpcy5wYXJlbnQgPSBwYXJlbnQ7XG4gIHRoaXMuX2NyZWF0ZSgpO1xufVxuXG5QcmV2TmV4dEJ1dHRvbi5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKCBVbmlwb2ludGVyLnByb3RvdHlwZSApO1xuXG5QcmV2TmV4dEJ1dHRvbi5wcm90b3R5cGUuX2NyZWF0ZSA9IGZ1bmN0aW9uKCkge1xuICAvLyBwcm9wZXJ0aWVzXG4gIHRoaXMuaXNFbmFibGVkID0gdHJ1ZTtcbiAgdGhpcy5pc1ByZXZpb3VzID0gdGhpcy5kaXJlY3Rpb24gPT0gLTE7XG4gIHZhciBsZWZ0RGlyZWN0aW9uID0gdGhpcy5wYXJlbnQub3B0aW9ucy5yaWdodFRvTGVmdCA/IDEgOiAtMTtcbiAgdGhpcy5pc0xlZnQgPSB0aGlzLmRpcmVjdGlvbiA9PSBsZWZ0RGlyZWN0aW9uO1xuXG4gIHZhciBlbGVtZW50ID0gdGhpcy5lbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XG4gIGVsZW1lbnQuY2xhc3NOYW1lID0gJ2ZsaWNraXR5LWJ1dHRvbiBmbGlja2l0eS1wcmV2LW5leHQtYnV0dG9uJztcbiAgZWxlbWVudC5jbGFzc05hbWUgKz0gdGhpcy5pc1ByZXZpb3VzID8gJyBwcmV2aW91cycgOiAnIG5leHQnO1xuICAvLyBwcmV2ZW50IGJ1dHRvbiBmcm9tIHN1Ym1pdHRpbmcgZm9ybSBodHRwOi8vc3RhY2tvdmVyZmxvdy5jb20vYS8xMDgzNjA3Ni8xODIxODNcbiAgZWxlbWVudC5zZXRBdHRyaWJ1dGUoICd0eXBlJywgJ2J1dHRvbicgKTtcbiAgLy8gaW5pdCBhcyBkaXNhYmxlZFxuICB0aGlzLmRpc2FibGUoKTtcblxuICBlbGVtZW50LnNldEF0dHJpYnV0ZSggJ2FyaWEtbGFiZWwnLCB0aGlzLmlzUHJldmlvdXMgPyAnUHJldmlvdXMnIDogJ05leHQnICk7XG5cbiAgLy8gY3JlYXRlIGFycm93XG4gIHZhciBzdmcgPSB0aGlzLmNyZWF0ZVNWRygpO1xuICBlbGVtZW50LmFwcGVuZENoaWxkKCBzdmcgKTtcbiAgLy8gZXZlbnRzXG4gIHRoaXMucGFyZW50Lm9uKCAnc2VsZWN0JywgdGhpcy51cGRhdGUuYmluZCggdGhpcyApICk7XG4gIHRoaXMub24oICdwb2ludGVyRG93bicsIHRoaXMucGFyZW50LmNoaWxkVUlQb2ludGVyRG93bi5iaW5kKCB0aGlzLnBhcmVudCApICk7XG59O1xuXG5QcmV2TmV4dEJ1dHRvbi5wcm90b3R5cGUuYWN0aXZhdGUgPSBmdW5jdGlvbigpIHtcbiAgdGhpcy5iaW5kU3RhcnRFdmVudCggdGhpcy5lbGVtZW50ICk7XG4gIHRoaXMuZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCAnY2xpY2snLCB0aGlzICk7XG4gIC8vIGFkZCB0byBET01cbiAgdGhpcy5wYXJlbnQuZWxlbWVudC5hcHBlbmRDaGlsZCggdGhpcy5lbGVtZW50ICk7XG59O1xuXG5QcmV2TmV4dEJ1dHRvbi5wcm90b3R5cGUuZGVhY3RpdmF0ZSA9IGZ1bmN0aW9uKCkge1xuICAvLyByZW1vdmUgZnJvbSBET01cbiAgdGhpcy5wYXJlbnQuZWxlbWVudC5yZW1vdmVDaGlsZCggdGhpcy5lbGVtZW50ICk7XG4gIC8vIGNsaWNrIGV2ZW50c1xuICB0aGlzLnVuYmluZFN0YXJ0RXZlbnQoIHRoaXMuZWxlbWVudCApO1xuICB0aGlzLmVsZW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lciggJ2NsaWNrJywgdGhpcyApO1xufTtcblxuUHJldk5leHRCdXR0b24ucHJvdG90eXBlLmNyZWF0ZVNWRyA9IGZ1bmN0aW9uKCkge1xuICB2YXIgc3ZnID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudE5TKCBzdmdVUkksICdzdmcnKTtcbiAgc3ZnLnNldEF0dHJpYnV0ZSggJ2NsYXNzJywgJ2ZsaWNraXR5LWJ1dHRvbi1pY29uJyApO1xuICBzdmcuc2V0QXR0cmlidXRlKCAndmlld0JveCcsICcwIDAgMTAwIDEwMCcgKTtcbiAgdmFyIHBhdGggPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50TlMoIHN2Z1VSSSwgJ3BhdGgnKTtcbiAgdmFyIHBhdGhNb3ZlbWVudHMgPSBnZXRBcnJvd01vdmVtZW50cyggdGhpcy5wYXJlbnQub3B0aW9ucy5hcnJvd1NoYXBlICk7XG4gIHBhdGguc2V0QXR0cmlidXRlKCAnZCcsIHBhdGhNb3ZlbWVudHMgKTtcbiAgcGF0aC5zZXRBdHRyaWJ1dGUoICdjbGFzcycsICdhcnJvdycgKTtcbiAgLy8gcm90YXRlIGFycm93XG4gIGlmICggIXRoaXMuaXNMZWZ0ICkge1xuICAgIHBhdGguc2V0QXR0cmlidXRlKCAndHJhbnNmb3JtJywgJ3RyYW5zbGF0ZSgxMDAsIDEwMCkgcm90YXRlKDE4MCkgJyApO1xuICB9XG4gIHN2Zy5hcHBlbmRDaGlsZCggcGF0aCApO1xuICByZXR1cm4gc3ZnO1xufTtcblxuLy8gZ2V0IFNWRyBwYXRoIG1vdm1lbWVudFxuZnVuY3Rpb24gZ2V0QXJyb3dNb3ZlbWVudHMoIHNoYXBlICkge1xuICAvLyB1c2Ugc2hhcGUgYXMgbW92ZW1lbnQgaWYgc3RyaW5nXG4gIGlmICggdHlwZW9mIHNoYXBlID09ICdzdHJpbmcnICkge1xuICAgIHJldHVybiBzaGFwZTtcbiAgfVxuICAvLyBjcmVhdGUgbW92ZW1lbnQgc3RyaW5nXG4gIHJldHVybiAnTSAnICsgc2hhcGUueDAgKyAnLDUwJyArXG4gICAgJyBMICcgKyBzaGFwZS54MSArICcsJyArICggc2hhcGUueTEgKyA1MCApICtcbiAgICAnIEwgJyArIHNoYXBlLngyICsgJywnICsgKCBzaGFwZS55MiArIDUwICkgK1xuICAgICcgTCAnICsgc2hhcGUueDMgKyAnLDUwICcgK1xuICAgICcgTCAnICsgc2hhcGUueDIgKyAnLCcgKyAoIDUwIC0gc2hhcGUueTIgKSArXG4gICAgJyBMICcgKyBzaGFwZS54MSArICcsJyArICggNTAgLSBzaGFwZS55MSApICtcbiAgICAnIFonO1xufVxuXG5QcmV2TmV4dEJ1dHRvbi5wcm90b3R5cGUuaGFuZGxlRXZlbnQgPSB1dGlscy5oYW5kbGVFdmVudDtcblxuUHJldk5leHRCdXR0b24ucHJvdG90eXBlLm9uY2xpY2sgPSBmdW5jdGlvbigpIHtcbiAgaWYgKCAhdGhpcy5pc0VuYWJsZWQgKSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIHRoaXMucGFyZW50LnVpQ2hhbmdlKCk7XG4gIHZhciBtZXRob2QgPSB0aGlzLmlzUHJldmlvdXMgPyAncHJldmlvdXMnIDogJ25leHQnO1xuICB0aGlzLnBhcmVudFsgbWV0aG9kIF0oKTtcbn07XG5cbi8vIC0tLS0tICAtLS0tLSAvL1xuXG5QcmV2TmV4dEJ1dHRvbi5wcm90b3R5cGUuZW5hYmxlID0gZnVuY3Rpb24oKSB7XG4gIGlmICggdGhpcy5pc0VuYWJsZWQgKSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIHRoaXMuZWxlbWVudC5kaXNhYmxlZCA9IGZhbHNlO1xuICB0aGlzLmlzRW5hYmxlZCA9IHRydWU7XG59O1xuXG5QcmV2TmV4dEJ1dHRvbi5wcm90b3R5cGUuZGlzYWJsZSA9IGZ1bmN0aW9uKCkge1xuICBpZiAoICF0aGlzLmlzRW5hYmxlZCApIHtcbiAgICByZXR1cm47XG4gIH1cbiAgdGhpcy5lbGVtZW50LmRpc2FibGVkID0gdHJ1ZTtcbiAgdGhpcy5pc0VuYWJsZWQgPSBmYWxzZTtcbn07XG5cblByZXZOZXh0QnV0dG9uLnByb3RvdHlwZS51cGRhdGUgPSBmdW5jdGlvbigpIHtcbiAgLy8gaW5kZXggb2YgZmlyc3Qgb3IgbGFzdCBzbGlkZSwgaWYgcHJldmlvdXMgb3IgbmV4dFxuICB2YXIgc2xpZGVzID0gdGhpcy5wYXJlbnQuc2xpZGVzO1xuICAvLyBlbmFibGUgaXMgd3JhcEFyb3VuZCBhbmQgYXQgbGVhc3QgMiBzbGlkZXNcbiAgaWYgKCB0aGlzLnBhcmVudC5vcHRpb25zLndyYXBBcm91bmQgJiYgc2xpZGVzLmxlbmd0aCA+IDEgKSB7XG4gICAgdGhpcy5lbmFibGUoKTtcbiAgICByZXR1cm47XG4gIH1cbiAgdmFyIGxhc3RJbmRleCA9IHNsaWRlcy5sZW5ndGggPyBzbGlkZXMubGVuZ3RoIC0gMSA6IDA7XG4gIHZhciBib3VuZEluZGV4ID0gdGhpcy5pc1ByZXZpb3VzID8gMCA6IGxhc3RJbmRleDtcbiAgdmFyIG1ldGhvZCA9IHRoaXMucGFyZW50LnNlbGVjdGVkSW5kZXggPT0gYm91bmRJbmRleCA/ICdkaXNhYmxlJyA6ICdlbmFibGUnO1xuICB0aGlzWyBtZXRob2QgXSgpO1xufTtcblxuUHJldk5leHRCdXR0b24ucHJvdG90eXBlLmRlc3Ryb3kgPSBmdW5jdGlvbigpIHtcbiAgdGhpcy5kZWFjdGl2YXRlKCk7XG4gIHRoaXMuYWxsT2ZmKCk7XG59O1xuXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSBGbGlja2l0eSBwcm90b3R5cGUgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gLy9cblxudXRpbHMuZXh0ZW5kKCBGbGlja2l0eS5kZWZhdWx0cywge1xuICBwcmV2TmV4dEJ1dHRvbnM6IHRydWUsXG4gIGFycm93U2hhcGU6IHtcbiAgICB4MDogMTAsXG4gICAgeDE6IDYwLCB5MTogNTAsXG4gICAgeDI6IDcwLCB5MjogNDAsXG4gICAgeDM6IDMwXG4gIH1cbn0pO1xuXG5GbGlja2l0eS5jcmVhdGVNZXRob2RzLnB1c2goJ19jcmVhdGVQcmV2TmV4dEJ1dHRvbnMnKTtcbnZhciBwcm90byA9IEZsaWNraXR5LnByb3RvdHlwZTtcblxucHJvdG8uX2NyZWF0ZVByZXZOZXh0QnV0dG9ucyA9IGZ1bmN0aW9uKCkge1xuICBpZiAoICF0aGlzLm9wdGlvbnMucHJldk5leHRCdXR0b25zICkge1xuICAgIHJldHVybjtcbiAgfVxuXG4gIHRoaXMucHJldkJ1dHRvbiA9IG5ldyBQcmV2TmV4dEJ1dHRvbiggLTEsIHRoaXMgKTtcbiAgdGhpcy5uZXh0QnV0dG9uID0gbmV3IFByZXZOZXh0QnV0dG9uKCAxLCB0aGlzICk7XG5cbiAgdGhpcy5vbiggJ2FjdGl2YXRlJywgdGhpcy5hY3RpdmF0ZVByZXZOZXh0QnV0dG9ucyApO1xufTtcblxucHJvdG8uYWN0aXZhdGVQcmV2TmV4dEJ1dHRvbnMgPSBmdW5jdGlvbigpIHtcbiAgdGhpcy5wcmV2QnV0dG9uLmFjdGl2YXRlKCk7XG4gIHRoaXMubmV4dEJ1dHRvbi5hY3RpdmF0ZSgpO1xuICB0aGlzLm9uKCAnZGVhY3RpdmF0ZScsIHRoaXMuZGVhY3RpdmF0ZVByZXZOZXh0QnV0dG9ucyApO1xufTtcblxucHJvdG8uZGVhY3RpdmF0ZVByZXZOZXh0QnV0dG9ucyA9IGZ1bmN0aW9uKCkge1xuICB0aGlzLnByZXZCdXR0b24uZGVhY3RpdmF0ZSgpO1xuICB0aGlzLm5leHRCdXR0b24uZGVhY3RpdmF0ZSgpO1xuICB0aGlzLm9mZiggJ2RlYWN0aXZhdGUnLCB0aGlzLmRlYWN0aXZhdGVQcmV2TmV4dEJ1dHRvbnMgKTtcbn07XG5cbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tICAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAvL1xuXG5GbGlja2l0eS5QcmV2TmV4dEJ1dHRvbiA9IFByZXZOZXh0QnV0dG9uO1xuXG5yZXR1cm4gRmxpY2tpdHk7XG5cbn0pKTtcbiIsIi8vIHNsaWRlXG4oIGZ1bmN0aW9uKCB3aW5kb3csIGZhY3RvcnkgKSB7XG4gIC8vIHVuaXZlcnNhbCBtb2R1bGUgZGVmaW5pdGlvblxuICAvKiBqc2hpbnQgc3RyaWN0OiBmYWxzZSAqL1xuICBpZiAoIHR5cGVvZiBkZWZpbmUgPT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kICkge1xuICAgIC8vIEFNRFxuICAgIGRlZmluZSggZmFjdG9yeSApO1xuICB9IGVsc2UgaWYgKCB0eXBlb2YgbW9kdWxlID09ICdvYmplY3QnICYmIG1vZHVsZS5leHBvcnRzICkge1xuICAgIC8vIENvbW1vbkpTXG4gICAgbW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KCk7XG4gIH0gZWxzZSB7XG4gICAgLy8gYnJvd3NlciBnbG9iYWxcbiAgICB3aW5kb3cuRmxpY2tpdHkgPSB3aW5kb3cuRmxpY2tpdHkgfHwge307XG4gICAgd2luZG93LkZsaWNraXR5LlNsaWRlID0gZmFjdG9yeSgpO1xuICB9XG5cbn0oIHdpbmRvdywgZnVuY3Rpb24gZmFjdG9yeSgpIHtcbid1c2Ugc3RyaWN0JztcblxuZnVuY3Rpb24gU2xpZGUoIHBhcmVudCApIHtcbiAgdGhpcy5wYXJlbnQgPSBwYXJlbnQ7XG4gIHRoaXMuaXNPcmlnaW5MZWZ0ID0gcGFyZW50Lm9yaWdpblNpZGUgPT0gJ2xlZnQnO1xuICB0aGlzLmNlbGxzID0gW107XG4gIHRoaXMub3V0ZXJXaWR0aCA9IDA7XG4gIHRoaXMuaGVpZ2h0ID0gMDtcbn1cblxudmFyIHByb3RvID0gU2xpZGUucHJvdG90eXBlO1xuXG5wcm90by5hZGRDZWxsID0gZnVuY3Rpb24oIGNlbGwgKSB7XG4gIHRoaXMuY2VsbHMucHVzaCggY2VsbCApO1xuICB0aGlzLm91dGVyV2lkdGggKz0gY2VsbC5zaXplLm91dGVyV2lkdGg7XG4gIHRoaXMuaGVpZ2h0ID0gTWF0aC5tYXgoIGNlbGwuc2l6ZS5vdXRlckhlaWdodCwgdGhpcy5oZWlnaHQgKTtcbiAgLy8gZmlyc3QgY2VsbCBzdHVmZlxuICBpZiAoIHRoaXMuY2VsbHMubGVuZ3RoID09IDEgKSB7XG4gICAgdGhpcy54ID0gY2VsbC54OyAvLyB4IGNvbWVzIGZyb20gZmlyc3QgY2VsbFxuICAgIHZhciBiZWdpbk1hcmdpbiA9IHRoaXMuaXNPcmlnaW5MZWZ0ID8gJ21hcmdpbkxlZnQnIDogJ21hcmdpblJpZ2h0JztcbiAgICB0aGlzLmZpcnN0TWFyZ2luID0gY2VsbC5zaXplWyBiZWdpbk1hcmdpbiBdO1xuICB9XG59O1xuXG5wcm90by51cGRhdGVUYXJnZXQgPSBmdW5jdGlvbigpIHtcbiAgdmFyIGVuZE1hcmdpbiA9IHRoaXMuaXNPcmlnaW5MZWZ0ID8gJ21hcmdpblJpZ2h0JyA6ICdtYXJnaW5MZWZ0JztcbiAgdmFyIGxhc3RDZWxsID0gdGhpcy5nZXRMYXN0Q2VsbCgpO1xuICB2YXIgbGFzdE1hcmdpbiA9IGxhc3RDZWxsID8gbGFzdENlbGwuc2l6ZVsgZW5kTWFyZ2luIF0gOiAwO1xuICB2YXIgc2xpZGVXaWR0aCA9IHRoaXMub3V0ZXJXaWR0aCAtICggdGhpcy5maXJzdE1hcmdpbiArIGxhc3RNYXJnaW4gKTtcbiAgdGhpcy50YXJnZXQgPSB0aGlzLnggKyB0aGlzLmZpcnN0TWFyZ2luICsgc2xpZGVXaWR0aCAqIHRoaXMucGFyZW50LmNlbGxBbGlnbjtcbn07XG5cbnByb3RvLmdldExhc3RDZWxsID0gZnVuY3Rpb24oKSB7XG4gIHJldHVybiB0aGlzLmNlbGxzWyB0aGlzLmNlbGxzLmxlbmd0aCAtIDEgXTtcbn07XG5cbnByb3RvLnNlbGVjdCA9IGZ1bmN0aW9uKCkge1xuICB0aGlzLmNlbGxzLmZvckVhY2goIGZ1bmN0aW9uKCBjZWxsICkge1xuICAgIGNlbGwuc2VsZWN0KCk7XG4gIH0pO1xufTtcblxucHJvdG8udW5zZWxlY3QgPSBmdW5jdGlvbigpIHtcbiAgdGhpcy5jZWxscy5mb3JFYWNoKCBmdW5jdGlvbiggY2VsbCApIHtcbiAgICBjZWxsLnVuc2VsZWN0KCk7XG4gIH0pO1xufTtcblxucHJvdG8uZ2V0Q2VsbEVsZW1lbnRzID0gZnVuY3Rpb24oKSB7XG4gIHJldHVybiB0aGlzLmNlbGxzLm1hcCggZnVuY3Rpb24oIGNlbGwgKSB7XG4gICAgcmV0dXJuIGNlbGwuZWxlbWVudDtcbiAgfSk7XG59O1xuXG5yZXR1cm4gU2xpZGU7XG5cbn0pKTtcbiIsIi8qIVxuICogZ2V0U2l6ZSB2Mi4wLjNcbiAqIG1lYXN1cmUgc2l6ZSBvZiBlbGVtZW50c1xuICogTUlUIGxpY2Vuc2VcbiAqL1xuXG4vKiBqc2hpbnQgYnJvd3NlcjogdHJ1ZSwgc3RyaWN0OiB0cnVlLCB1bmRlZjogdHJ1ZSwgdW51c2VkOiB0cnVlICovXG4vKiBnbG9iYWxzIGNvbnNvbGU6IGZhbHNlICovXG5cbiggZnVuY3Rpb24oIHdpbmRvdywgZmFjdG9yeSApIHtcbiAgLyoganNoaW50IHN0cmljdDogZmFsc2UgKi8gLyogZ2xvYmFscyBkZWZpbmUsIG1vZHVsZSAqL1xuICBpZiAoIHR5cGVvZiBkZWZpbmUgPT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kICkge1xuICAgIC8vIEFNRFxuICAgIGRlZmluZSggZmFjdG9yeSApO1xuICB9IGVsc2UgaWYgKCB0eXBlb2YgbW9kdWxlID09ICdvYmplY3QnICYmIG1vZHVsZS5leHBvcnRzICkge1xuICAgIC8vIENvbW1vbkpTXG4gICAgbW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KCk7XG4gIH0gZWxzZSB7XG4gICAgLy8gYnJvd3NlciBnbG9iYWxcbiAgICB3aW5kb3cuZ2V0U2l6ZSA9IGZhY3RvcnkoKTtcbiAgfVxuXG59KSggd2luZG93LCBmdW5jdGlvbiBmYWN0b3J5KCkge1xuJ3VzZSBzdHJpY3QnO1xuXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSBoZWxwZXJzIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tIC8vXG5cbi8vIGdldCBhIG51bWJlciBmcm9tIGEgc3RyaW5nLCBub3QgYSBwZXJjZW50YWdlXG5mdW5jdGlvbiBnZXRTdHlsZVNpemUoIHZhbHVlICkge1xuICB2YXIgbnVtID0gcGFyc2VGbG9hdCggdmFsdWUgKTtcbiAgLy8gbm90IGEgcGVyY2VudCBsaWtlICcxMDAlJywgYW5kIGEgbnVtYmVyXG4gIHZhciBpc1ZhbGlkID0gdmFsdWUuaW5kZXhPZignJScpID09IC0xICYmICFpc05hTiggbnVtICk7XG4gIHJldHVybiBpc1ZhbGlkICYmIG51bTtcbn1cblxuZnVuY3Rpb24gbm9vcCgpIHt9XG5cbnZhciBsb2dFcnJvciA9IHR5cGVvZiBjb25zb2xlID09ICd1bmRlZmluZWQnID8gbm9vcCA6XG4gIGZ1bmN0aW9uKCBtZXNzYWdlICkge1xuICAgIGNvbnNvbGUuZXJyb3IoIG1lc3NhZ2UgKTtcbiAgfTtcblxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gbWVhc3VyZW1lbnRzIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tIC8vXG5cbnZhciBtZWFzdXJlbWVudHMgPSBbXG4gICdwYWRkaW5nTGVmdCcsXG4gICdwYWRkaW5nUmlnaHQnLFxuICAncGFkZGluZ1RvcCcsXG4gICdwYWRkaW5nQm90dG9tJyxcbiAgJ21hcmdpbkxlZnQnLFxuICAnbWFyZ2luUmlnaHQnLFxuICAnbWFyZ2luVG9wJyxcbiAgJ21hcmdpbkJvdHRvbScsXG4gICdib3JkZXJMZWZ0V2lkdGgnLFxuICAnYm9yZGVyUmlnaHRXaWR0aCcsXG4gICdib3JkZXJUb3BXaWR0aCcsXG4gICdib3JkZXJCb3R0b21XaWR0aCdcbl07XG5cbnZhciBtZWFzdXJlbWVudHNMZW5ndGggPSBtZWFzdXJlbWVudHMubGVuZ3RoO1xuXG5mdW5jdGlvbiBnZXRaZXJvU2l6ZSgpIHtcbiAgdmFyIHNpemUgPSB7XG4gICAgd2lkdGg6IDAsXG4gICAgaGVpZ2h0OiAwLFxuICAgIGlubmVyV2lkdGg6IDAsXG4gICAgaW5uZXJIZWlnaHQ6IDAsXG4gICAgb3V0ZXJXaWR0aDogMCxcbiAgICBvdXRlckhlaWdodDogMFxuICB9O1xuICBmb3IgKCB2YXIgaT0wOyBpIDwgbWVhc3VyZW1lbnRzTGVuZ3RoOyBpKysgKSB7XG4gICAgdmFyIG1lYXN1cmVtZW50ID0gbWVhc3VyZW1lbnRzW2ldO1xuICAgIHNpemVbIG1lYXN1cmVtZW50IF0gPSAwO1xuICB9XG4gIHJldHVybiBzaXplO1xufVxuXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSBnZXRTdHlsZSAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAvL1xuXG4vKipcbiAqIGdldFN0eWxlLCBnZXQgc3R5bGUgb2YgZWxlbWVudCwgY2hlY2sgZm9yIEZpcmVmb3ggYnVnXG4gKiBodHRwczovL2J1Z3ppbGxhLm1vemlsbGEub3JnL3Nob3dfYnVnLmNnaT9pZD01NDgzOTdcbiAqL1xuZnVuY3Rpb24gZ2V0U3R5bGUoIGVsZW0gKSB7XG4gIHZhciBzdHlsZSA9IGdldENvbXB1dGVkU3R5bGUoIGVsZW0gKTtcbiAgaWYgKCAhc3R5bGUgKSB7XG4gICAgbG9nRXJyb3IoICdTdHlsZSByZXR1cm5lZCAnICsgc3R5bGUgK1xuICAgICAgJy4gQXJlIHlvdSBydW5uaW5nIHRoaXMgY29kZSBpbiBhIGhpZGRlbiBpZnJhbWUgb24gRmlyZWZveD8gJyArXG4gICAgICAnU2VlIGh0dHBzOi8vYml0Lmx5L2dldHNpemVidWcxJyApO1xuICB9XG4gIHJldHVybiBzdHlsZTtcbn1cblxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gc2V0dXAgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gLy9cblxudmFyIGlzU2V0dXAgPSBmYWxzZTtcblxudmFyIGlzQm94U2l6ZU91dGVyO1xuXG4vKipcbiAqIHNldHVwXG4gKiBjaGVjayBpc0JveFNpemVyT3V0ZXJcbiAqIGRvIG9uIGZpcnN0IGdldFNpemUoKSByYXRoZXIgdGhhbiBvbiBwYWdlIGxvYWQgZm9yIEZpcmVmb3ggYnVnXG4gKi9cbmZ1bmN0aW9uIHNldHVwKCkge1xuICAvLyBzZXR1cCBvbmNlXG4gIGlmICggaXNTZXR1cCApIHtcbiAgICByZXR1cm47XG4gIH1cbiAgaXNTZXR1cCA9IHRydWU7XG5cbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gYm94IHNpemluZyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAvL1xuXG4gIC8qKlxuICAgKiBDaHJvbWUgJiBTYWZhcmkgbWVhc3VyZSB0aGUgb3V0ZXItd2lkdGggb24gc3R5bGUud2lkdGggb24gYm9yZGVyLWJveCBlbGVtc1xuICAgKiBJRTExICYgRmlyZWZveDwyOSBtZWFzdXJlcyB0aGUgaW5uZXItd2lkdGhcbiAgICovXG4gIHZhciBkaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgZGl2LnN0eWxlLndpZHRoID0gJzIwMHB4JztcbiAgZGl2LnN0eWxlLnBhZGRpbmcgPSAnMXB4IDJweCAzcHggNHB4JztcbiAgZGl2LnN0eWxlLmJvcmRlclN0eWxlID0gJ3NvbGlkJztcbiAgZGl2LnN0eWxlLmJvcmRlcldpZHRoID0gJzFweCAycHggM3B4IDRweCc7XG4gIGRpdi5zdHlsZS5ib3hTaXppbmcgPSAnYm9yZGVyLWJveCc7XG5cbiAgdmFyIGJvZHkgPSBkb2N1bWVudC5ib2R5IHx8IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudDtcbiAgYm9keS5hcHBlbmRDaGlsZCggZGl2ICk7XG4gIHZhciBzdHlsZSA9IGdldFN0eWxlKCBkaXYgKTtcbiAgLy8gcm91bmQgdmFsdWUgZm9yIGJyb3dzZXIgem9vbS4gZGVzYW5kcm8vbWFzb25yeSM5MjhcbiAgaXNCb3hTaXplT3V0ZXIgPSBNYXRoLnJvdW5kKCBnZXRTdHlsZVNpemUoIHN0eWxlLndpZHRoICkgKSA9PSAyMDA7XG4gIGdldFNpemUuaXNCb3hTaXplT3V0ZXIgPSBpc0JveFNpemVPdXRlcjtcblxuICBib2R5LnJlbW92ZUNoaWxkKCBkaXYgKTtcbn1cblxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gZ2V0U2l6ZSAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAvL1xuXG5mdW5jdGlvbiBnZXRTaXplKCBlbGVtICkge1xuICBzZXR1cCgpO1xuXG4gIC8vIHVzZSBxdWVyeVNlbGV0b3IgaWYgZWxlbSBpcyBzdHJpbmdcbiAgaWYgKCB0eXBlb2YgZWxlbSA9PSAnc3RyaW5nJyApIHtcbiAgICBlbGVtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvciggZWxlbSApO1xuICB9XG5cbiAgLy8gZG8gbm90IHByb2NlZWQgb24gbm9uLW9iamVjdHNcbiAgaWYgKCAhZWxlbSB8fCB0eXBlb2YgZWxlbSAhPSAnb2JqZWN0JyB8fCAhZWxlbS5ub2RlVHlwZSApIHtcbiAgICByZXR1cm47XG4gIH1cblxuICB2YXIgc3R5bGUgPSBnZXRTdHlsZSggZWxlbSApO1xuXG4gIC8vIGlmIGhpZGRlbiwgZXZlcnl0aGluZyBpcyAwXG4gIGlmICggc3R5bGUuZGlzcGxheSA9PSAnbm9uZScgKSB7XG4gICAgcmV0dXJuIGdldFplcm9TaXplKCk7XG4gIH1cblxuICB2YXIgc2l6ZSA9IHt9O1xuICBzaXplLndpZHRoID0gZWxlbS5vZmZzZXRXaWR0aDtcbiAgc2l6ZS5oZWlnaHQgPSBlbGVtLm9mZnNldEhlaWdodDtcblxuICB2YXIgaXNCb3JkZXJCb3ggPSBzaXplLmlzQm9yZGVyQm94ID0gc3R5bGUuYm94U2l6aW5nID09ICdib3JkZXItYm94JztcblxuICAvLyBnZXQgYWxsIG1lYXN1cmVtZW50c1xuICBmb3IgKCB2YXIgaT0wOyBpIDwgbWVhc3VyZW1lbnRzTGVuZ3RoOyBpKysgKSB7XG4gICAgdmFyIG1lYXN1cmVtZW50ID0gbWVhc3VyZW1lbnRzW2ldO1xuICAgIHZhciB2YWx1ZSA9IHN0eWxlWyBtZWFzdXJlbWVudCBdO1xuICAgIHZhciBudW0gPSBwYXJzZUZsb2F0KCB2YWx1ZSApO1xuICAgIC8vIGFueSAnYXV0bycsICdtZWRpdW0nIHZhbHVlIHdpbGwgYmUgMFxuICAgIHNpemVbIG1lYXN1cmVtZW50IF0gPSAhaXNOYU4oIG51bSApID8gbnVtIDogMDtcbiAgfVxuXG4gIHZhciBwYWRkaW5nV2lkdGggPSBzaXplLnBhZGRpbmdMZWZ0ICsgc2l6ZS5wYWRkaW5nUmlnaHQ7XG4gIHZhciBwYWRkaW5nSGVpZ2h0ID0gc2l6ZS5wYWRkaW5nVG9wICsgc2l6ZS5wYWRkaW5nQm90dG9tO1xuICB2YXIgbWFyZ2luV2lkdGggPSBzaXplLm1hcmdpbkxlZnQgKyBzaXplLm1hcmdpblJpZ2h0O1xuICB2YXIgbWFyZ2luSGVpZ2h0ID0gc2l6ZS5tYXJnaW5Ub3AgKyBzaXplLm1hcmdpbkJvdHRvbTtcbiAgdmFyIGJvcmRlcldpZHRoID0gc2l6ZS5ib3JkZXJMZWZ0V2lkdGggKyBzaXplLmJvcmRlclJpZ2h0V2lkdGg7XG4gIHZhciBib3JkZXJIZWlnaHQgPSBzaXplLmJvcmRlclRvcFdpZHRoICsgc2l6ZS5ib3JkZXJCb3R0b21XaWR0aDtcblxuICB2YXIgaXNCb3JkZXJCb3hTaXplT3V0ZXIgPSBpc0JvcmRlckJveCAmJiBpc0JveFNpemVPdXRlcjtcblxuICAvLyBvdmVyd3JpdGUgd2lkdGggYW5kIGhlaWdodCBpZiB3ZSBjYW4gZ2V0IGl0IGZyb20gc3R5bGVcbiAgdmFyIHN0eWxlV2lkdGggPSBnZXRTdHlsZVNpemUoIHN0eWxlLndpZHRoICk7XG4gIGlmICggc3R5bGVXaWR0aCAhPT0gZmFsc2UgKSB7XG4gICAgc2l6ZS53aWR0aCA9IHN0eWxlV2lkdGggK1xuICAgICAgLy8gYWRkIHBhZGRpbmcgYW5kIGJvcmRlciB1bmxlc3MgaXQncyBhbHJlYWR5IGluY2x1ZGluZyBpdFxuICAgICAgKCBpc0JvcmRlckJveFNpemVPdXRlciA/IDAgOiBwYWRkaW5nV2lkdGggKyBib3JkZXJXaWR0aCApO1xuICB9XG5cbiAgdmFyIHN0eWxlSGVpZ2h0ID0gZ2V0U3R5bGVTaXplKCBzdHlsZS5oZWlnaHQgKTtcbiAgaWYgKCBzdHlsZUhlaWdodCAhPT0gZmFsc2UgKSB7XG4gICAgc2l6ZS5oZWlnaHQgPSBzdHlsZUhlaWdodCArXG4gICAgICAvLyBhZGQgcGFkZGluZyBhbmQgYm9yZGVyIHVubGVzcyBpdCdzIGFscmVhZHkgaW5jbHVkaW5nIGl0XG4gICAgICAoIGlzQm9yZGVyQm94U2l6ZU91dGVyID8gMCA6IHBhZGRpbmdIZWlnaHQgKyBib3JkZXJIZWlnaHQgKTtcbiAgfVxuXG4gIHNpemUuaW5uZXJXaWR0aCA9IHNpemUud2lkdGggLSAoIHBhZGRpbmdXaWR0aCArIGJvcmRlcldpZHRoICk7XG4gIHNpemUuaW5uZXJIZWlnaHQgPSBzaXplLmhlaWdodCAtICggcGFkZGluZ0hlaWdodCArIGJvcmRlckhlaWdodCApO1xuXG4gIHNpemUub3V0ZXJXaWR0aCA9IHNpemUud2lkdGggKyBtYXJnaW5XaWR0aDtcbiAgc2l6ZS5vdXRlckhlaWdodCA9IHNpemUuaGVpZ2h0ICsgbWFyZ2luSGVpZ2h0O1xuXG4gIHJldHVybiBzaXplO1xufVxuXG5yZXR1cm4gZ2V0U2l6ZTtcblxufSk7XG4iLCIvKiFcbiAqIFVuaWRyYWdnZXIgdjIuMy4xXG4gKiBEcmFnZ2FibGUgYmFzZSBjbGFzc1xuICogTUlUIGxpY2Vuc2VcbiAqL1xuXG4vKmpzaGludCBicm93c2VyOiB0cnVlLCB1bnVzZWQ6IHRydWUsIHVuZGVmOiB0cnVlLCBzdHJpY3Q6IHRydWUgKi9cblxuKCBmdW5jdGlvbiggd2luZG93LCBmYWN0b3J5ICkge1xuICAvLyB1bml2ZXJzYWwgbW9kdWxlIGRlZmluaXRpb25cbiAgLypqc2hpbnQgc3RyaWN0OiBmYWxzZSAqLyAvKmdsb2JhbHMgZGVmaW5lLCBtb2R1bGUsIHJlcXVpcmUgKi9cblxuICBpZiAoIHR5cGVvZiBkZWZpbmUgPT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kICkge1xuICAgIC8vIEFNRFxuICAgIGRlZmluZSggW1xuICAgICAgJ3VuaXBvaW50ZXIvdW5pcG9pbnRlcidcbiAgICBdLCBmdW5jdGlvbiggVW5pcG9pbnRlciApIHtcbiAgICAgIHJldHVybiBmYWN0b3J5KCB3aW5kb3csIFVuaXBvaW50ZXIgKTtcbiAgICB9KTtcbiAgfSBlbHNlIGlmICggdHlwZW9mIG1vZHVsZSA9PSAnb2JqZWN0JyAmJiBtb2R1bGUuZXhwb3J0cyApIHtcbiAgICAvLyBDb21tb25KU1xuICAgIG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeShcbiAgICAgIHdpbmRvdyxcbiAgICAgIHJlcXVpcmUoJ3VuaXBvaW50ZXInKVxuICAgICk7XG4gIH0gZWxzZSB7XG4gICAgLy8gYnJvd3NlciBnbG9iYWxcbiAgICB3aW5kb3cuVW5pZHJhZ2dlciA9IGZhY3RvcnkoXG4gICAgICB3aW5kb3csXG4gICAgICB3aW5kb3cuVW5pcG9pbnRlclxuICAgICk7XG4gIH1cblxufSggd2luZG93LCBmdW5jdGlvbiBmYWN0b3J5KCB3aW5kb3csIFVuaXBvaW50ZXIgKSB7XG5cbid1c2Ugc3RyaWN0JztcblxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gVW5pZHJhZ2dlciAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAvL1xuXG5mdW5jdGlvbiBVbmlkcmFnZ2VyKCkge31cblxuLy8gaW5oZXJpdCBVbmlwb2ludGVyICYgRXZFbWl0dGVyXG52YXIgcHJvdG8gPSBVbmlkcmFnZ2VyLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoIFVuaXBvaW50ZXIucHJvdG90eXBlICk7XG5cbi8vIC0tLS0tIGJpbmQgc3RhcnQgLS0tLS0gLy9cblxucHJvdG8uYmluZEhhbmRsZXMgPSBmdW5jdGlvbigpIHtcbiAgdGhpcy5fYmluZEhhbmRsZXMoIHRydWUgKTtcbn07XG5cbnByb3RvLnVuYmluZEhhbmRsZXMgPSBmdW5jdGlvbigpIHtcbiAgdGhpcy5fYmluZEhhbmRsZXMoIGZhbHNlICk7XG59O1xuXG4vKipcbiAqIEFkZCBvciByZW1vdmUgc3RhcnQgZXZlbnRcbiAqIEBwYXJhbSB7Qm9vbGVhbn0gaXNBZGRcbiAqL1xucHJvdG8uX2JpbmRIYW5kbGVzID0gZnVuY3Rpb24oIGlzQWRkICkge1xuICAvLyBtdW5nZSBpc0FkZCwgZGVmYXVsdCB0byB0cnVlXG4gIGlzQWRkID0gaXNBZGQgPT09IHVuZGVmaW5lZCA/IHRydWUgOiBpc0FkZDtcbiAgLy8gYmluZCBlYWNoIGhhbmRsZVxuICB2YXIgYmluZE1ldGhvZCA9IGlzQWRkID8gJ2FkZEV2ZW50TGlzdGVuZXInIDogJ3JlbW92ZUV2ZW50TGlzdGVuZXInO1xuICB2YXIgdG91Y2hBY3Rpb24gPSBpc0FkZCA/IHRoaXMuX3RvdWNoQWN0aW9uVmFsdWUgOiAnJztcbiAgZm9yICggdmFyIGk9MDsgaSA8IHRoaXMuaGFuZGxlcy5sZW5ndGg7IGkrKyApIHtcbiAgICB2YXIgaGFuZGxlID0gdGhpcy5oYW5kbGVzW2ldO1xuICAgIHRoaXMuX2JpbmRTdGFydEV2ZW50KCBoYW5kbGUsIGlzQWRkICk7XG4gICAgaGFuZGxlWyBiaW5kTWV0aG9kIF0oICdjbGljaycsIHRoaXMgKTtcbiAgICAvLyB0b3VjaC1hY3Rpb246IG5vbmUgdG8gb3ZlcnJpZGUgYnJvd3NlciB0b3VjaCBnZXN0dXJlcy4gbWV0YWZpenp5L2ZsaWNraXR5IzU0MFxuICAgIGlmICggd2luZG93LlBvaW50ZXJFdmVudCApIHtcbiAgICAgIGhhbmRsZS5zdHlsZS50b3VjaEFjdGlvbiA9IHRvdWNoQWN0aW9uO1xuICAgIH1cbiAgfVxufTtcblxuLy8gcHJvdG90eXBlIHNvIGl0IGNhbiBiZSBvdmVyd3JpdGVhYmxlIGJ5IEZsaWNraXR5XG5wcm90by5fdG91Y2hBY3Rpb25WYWx1ZSA9ICdub25lJztcblxuLy8gLS0tLS0gc3RhcnQgZXZlbnQgLS0tLS0gLy9cblxuLyoqXG4gKiBwb2ludGVyIHN0YXJ0XG4gKiBAcGFyYW0ge0V2ZW50fSBldmVudFxuICogQHBhcmFtIHtFdmVudCBvciBUb3VjaH0gcG9pbnRlclxuICovXG5wcm90by5wb2ludGVyRG93biA9IGZ1bmN0aW9uKCBldmVudCwgcG9pbnRlciApIHtcbiAgdmFyIGlzT2theSA9IHRoaXMub2theVBvaW50ZXJEb3duKCBldmVudCApO1xuICBpZiAoICFpc09rYXkgKSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIC8vIHRyYWNrIHN0YXJ0IGV2ZW50IHBvc2l0aW9uXG4gIC8vIFNhZmFyaSA5IG92ZXJyaWRlcyBwYWdlWCBhbmQgcGFnZVkuIFRoZXNlIHZhbHVlcyBuZWVkcyB0byBiZSBjb3BpZWQuIGZsaWNraXR5Izg0MlxuICB0aGlzLnBvaW50ZXJEb3duUG9pbnRlciA9IHtcbiAgICBwYWdlWDogcG9pbnRlci5wYWdlWCxcbiAgICBwYWdlWTogcG9pbnRlci5wYWdlWSxcbiAgfTtcblxuICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICB0aGlzLnBvaW50ZXJEb3duQmx1cigpO1xuICAvLyBiaW5kIG1vdmUgYW5kIGVuZCBldmVudHNcbiAgdGhpcy5fYmluZFBvc3RTdGFydEV2ZW50cyggZXZlbnQgKTtcbiAgdGhpcy5lbWl0RXZlbnQoICdwb2ludGVyRG93bicsIFsgZXZlbnQsIHBvaW50ZXIgXSApO1xufTtcblxuLy8gbm9kZXMgdGhhdCBoYXZlIHRleHQgZmllbGRzXG52YXIgY3Vyc29yTm9kZXMgPSB7XG4gIFRFWFRBUkVBOiB0cnVlLFxuICBJTlBVVDogdHJ1ZSxcbiAgU0VMRUNUOiB0cnVlLFxuICBPUFRJT046IHRydWUsXG59O1xuXG4vLyBpbnB1dCB0eXBlcyB0aGF0IGRvIG5vdCBoYXZlIHRleHQgZmllbGRzXG52YXIgY2xpY2tUeXBlcyA9IHtcbiAgcmFkaW86IHRydWUsXG4gIGNoZWNrYm94OiB0cnVlLFxuICBidXR0b246IHRydWUsXG4gIHN1Ym1pdDogdHJ1ZSxcbiAgaW1hZ2U6IHRydWUsXG4gIGZpbGU6IHRydWUsXG59O1xuXG4vLyBkaXNtaXNzIGlucHV0cyB3aXRoIHRleHQgZmllbGRzLiBmbGlja2l0eSM0MDMsIGZsaWNraXR5IzQwNFxucHJvdG8ub2theVBvaW50ZXJEb3duID0gZnVuY3Rpb24oIGV2ZW50ICkge1xuICB2YXIgaXNDdXJzb3JOb2RlID0gY3Vyc29yTm9kZXNbIGV2ZW50LnRhcmdldC5ub2RlTmFtZSBdO1xuICB2YXIgaXNDbGlja1R5cGUgPSBjbGlja1R5cGVzWyBldmVudC50YXJnZXQudHlwZSBdO1xuICB2YXIgaXNPa2F5ID0gIWlzQ3Vyc29yTm9kZSB8fCBpc0NsaWNrVHlwZTtcbiAgaWYgKCAhaXNPa2F5ICkge1xuICAgIHRoaXMuX3BvaW50ZXJSZXNldCgpO1xuICB9XG4gIHJldHVybiBpc09rYXk7XG59O1xuXG4vLyBrbHVkZ2UgdG8gYmx1ciBwcmV2aW91c2x5IGZvY3VzZWQgaW5wdXRcbnByb3RvLnBvaW50ZXJEb3duQmx1ciA9IGZ1bmN0aW9uKCkge1xuICB2YXIgZm9jdXNlZCA9IGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQ7XG4gIC8vIGRvIG5vdCBibHVyIGJvZHkgZm9yIElFMTAsIG1ldGFmaXp6eS9mbGlja2l0eSMxMTdcbiAgdmFyIGNhbkJsdXIgPSBmb2N1c2VkICYmIGZvY3VzZWQuYmx1ciAmJiBmb2N1c2VkICE9IGRvY3VtZW50LmJvZHk7XG4gIGlmICggY2FuQmx1ciApIHtcbiAgICBmb2N1c2VkLmJsdXIoKTtcbiAgfVxufTtcblxuLy8gLS0tLS0gbW92ZSBldmVudCAtLS0tLSAvL1xuXG4vKipcbiAqIGRyYWcgbW92ZVxuICogQHBhcmFtIHtFdmVudH0gZXZlbnRcbiAqIEBwYXJhbSB7RXZlbnQgb3IgVG91Y2h9IHBvaW50ZXJcbiAqL1xucHJvdG8ucG9pbnRlck1vdmUgPSBmdW5jdGlvbiggZXZlbnQsIHBvaW50ZXIgKSB7XG4gIHZhciBtb3ZlVmVjdG9yID0gdGhpcy5fZHJhZ1BvaW50ZXJNb3ZlKCBldmVudCwgcG9pbnRlciApO1xuICB0aGlzLmVtaXRFdmVudCggJ3BvaW50ZXJNb3ZlJywgWyBldmVudCwgcG9pbnRlciwgbW92ZVZlY3RvciBdICk7XG4gIHRoaXMuX2RyYWdNb3ZlKCBldmVudCwgcG9pbnRlciwgbW92ZVZlY3RvciApO1xufTtcblxuLy8gYmFzZSBwb2ludGVyIG1vdmUgbG9naWNcbnByb3RvLl9kcmFnUG9pbnRlck1vdmUgPSBmdW5jdGlvbiggZXZlbnQsIHBvaW50ZXIgKSB7XG4gIHZhciBtb3ZlVmVjdG9yID0ge1xuICAgIHg6IHBvaW50ZXIucGFnZVggLSB0aGlzLnBvaW50ZXJEb3duUG9pbnRlci5wYWdlWCxcbiAgICB5OiBwb2ludGVyLnBhZ2VZIC0gdGhpcy5wb2ludGVyRG93blBvaW50ZXIucGFnZVlcbiAgfTtcbiAgLy8gc3RhcnQgZHJhZyBpZiBwb2ludGVyIGhhcyBtb3ZlZCBmYXIgZW5vdWdoIHRvIHN0YXJ0IGRyYWdcbiAgaWYgKCAhdGhpcy5pc0RyYWdnaW5nICYmIHRoaXMuaGFzRHJhZ1N0YXJ0ZWQoIG1vdmVWZWN0b3IgKSApIHtcbiAgICB0aGlzLl9kcmFnU3RhcnQoIGV2ZW50LCBwb2ludGVyICk7XG4gIH1cbiAgcmV0dXJuIG1vdmVWZWN0b3I7XG59O1xuXG4vLyBjb25kaXRpb24gaWYgcG9pbnRlciBoYXMgbW92ZWQgZmFyIGVub3VnaCB0byBzdGFydCBkcmFnXG5wcm90by5oYXNEcmFnU3RhcnRlZCA9IGZ1bmN0aW9uKCBtb3ZlVmVjdG9yICkge1xuICByZXR1cm4gTWF0aC5hYnMoIG1vdmVWZWN0b3IueCApID4gMyB8fCBNYXRoLmFicyggbW92ZVZlY3Rvci55ICkgPiAzO1xufTtcblxuLy8gLS0tLS0gZW5kIGV2ZW50IC0tLS0tIC8vXG5cbi8qKlxuICogcG9pbnRlciB1cFxuICogQHBhcmFtIHtFdmVudH0gZXZlbnRcbiAqIEBwYXJhbSB7RXZlbnQgb3IgVG91Y2h9IHBvaW50ZXJcbiAqL1xucHJvdG8ucG9pbnRlclVwID0gZnVuY3Rpb24oIGV2ZW50LCBwb2ludGVyICkge1xuICB0aGlzLmVtaXRFdmVudCggJ3BvaW50ZXJVcCcsIFsgZXZlbnQsIHBvaW50ZXIgXSApO1xuICB0aGlzLl9kcmFnUG9pbnRlclVwKCBldmVudCwgcG9pbnRlciApO1xufTtcblxucHJvdG8uX2RyYWdQb2ludGVyVXAgPSBmdW5jdGlvbiggZXZlbnQsIHBvaW50ZXIgKSB7XG4gIGlmICggdGhpcy5pc0RyYWdnaW5nICkge1xuICAgIHRoaXMuX2RyYWdFbmQoIGV2ZW50LCBwb2ludGVyICk7XG4gIH0gZWxzZSB7XG4gICAgLy8gcG9pbnRlciBkaWRuJ3QgbW92ZSBlbm91Z2ggZm9yIGRyYWcgdG8gc3RhcnRcbiAgICB0aGlzLl9zdGF0aWNDbGljayggZXZlbnQsIHBvaW50ZXIgKTtcbiAgfVxufTtcblxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gZHJhZyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAvL1xuXG4vLyBkcmFnU3RhcnRcbnByb3RvLl9kcmFnU3RhcnQgPSBmdW5jdGlvbiggZXZlbnQsIHBvaW50ZXIgKSB7XG4gIHRoaXMuaXNEcmFnZ2luZyA9IHRydWU7XG4gIC8vIHByZXZlbnQgY2xpY2tzXG4gIHRoaXMuaXNQcmV2ZW50aW5nQ2xpY2tzID0gdHJ1ZTtcbiAgdGhpcy5kcmFnU3RhcnQoIGV2ZW50LCBwb2ludGVyICk7XG59O1xuXG5wcm90by5kcmFnU3RhcnQgPSBmdW5jdGlvbiggZXZlbnQsIHBvaW50ZXIgKSB7XG4gIHRoaXMuZW1pdEV2ZW50KCAnZHJhZ1N0YXJ0JywgWyBldmVudCwgcG9pbnRlciBdICk7XG59O1xuXG4vLyBkcmFnTW92ZVxucHJvdG8uX2RyYWdNb3ZlID0gZnVuY3Rpb24oIGV2ZW50LCBwb2ludGVyLCBtb3ZlVmVjdG9yICkge1xuICAvLyBkbyBub3QgZHJhZyBpZiBub3QgZHJhZ2dpbmcgeWV0XG4gIGlmICggIXRoaXMuaXNEcmFnZ2luZyApIHtcbiAgICByZXR1cm47XG4gIH1cblxuICB0aGlzLmRyYWdNb3ZlKCBldmVudCwgcG9pbnRlciwgbW92ZVZlY3RvciApO1xufTtcblxucHJvdG8uZHJhZ01vdmUgPSBmdW5jdGlvbiggZXZlbnQsIHBvaW50ZXIsIG1vdmVWZWN0b3IgKSB7XG4gIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gIHRoaXMuZW1pdEV2ZW50KCAnZHJhZ01vdmUnLCBbIGV2ZW50LCBwb2ludGVyLCBtb3ZlVmVjdG9yIF0gKTtcbn07XG5cbi8vIGRyYWdFbmRcbnByb3RvLl9kcmFnRW5kID0gZnVuY3Rpb24oIGV2ZW50LCBwb2ludGVyICkge1xuICAvLyBzZXQgZmxhZ3NcbiAgdGhpcy5pc0RyYWdnaW5nID0gZmFsc2U7XG4gIC8vIHJlLWVuYWJsZSBjbGlja2luZyBhc3luY1xuICBzZXRUaW1lb3V0KCBmdW5jdGlvbigpIHtcbiAgICBkZWxldGUgdGhpcy5pc1ByZXZlbnRpbmdDbGlja3M7XG4gIH0uYmluZCggdGhpcyApICk7XG5cbiAgdGhpcy5kcmFnRW5kKCBldmVudCwgcG9pbnRlciApO1xufTtcblxucHJvdG8uZHJhZ0VuZCA9IGZ1bmN0aW9uKCBldmVudCwgcG9pbnRlciApIHtcbiAgdGhpcy5lbWl0RXZlbnQoICdkcmFnRW5kJywgWyBldmVudCwgcG9pbnRlciBdICk7XG59O1xuXG4vLyAtLS0tLSBvbmNsaWNrIC0tLS0tIC8vXG5cbi8vIGhhbmRsZSBhbGwgY2xpY2tzIGFuZCBwcmV2ZW50IGNsaWNrcyB3aGVuIGRyYWdnaW5nXG5wcm90by5vbmNsaWNrID0gZnVuY3Rpb24oIGV2ZW50ICkge1xuICBpZiAoIHRoaXMuaXNQcmV2ZW50aW5nQ2xpY2tzICkge1xuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gIH1cbn07XG5cbi8vIC0tLS0tIHN0YXRpY0NsaWNrIC0tLS0tIC8vXG5cbi8vIHRyaWdnZXJlZCBhZnRlciBwb2ludGVyIGRvd24gJiB1cCB3aXRoIG5vL3RpbnkgbW92ZW1lbnRcbnByb3RvLl9zdGF0aWNDbGljayA9IGZ1bmN0aW9uKCBldmVudCwgcG9pbnRlciApIHtcbiAgLy8gaWdub3JlIGVtdWxhdGVkIG1vdXNlIHVwIGNsaWNrc1xuICBpZiAoIHRoaXMuaXNJZ25vcmluZ01vdXNlVXAgJiYgZXZlbnQudHlwZSA9PSAnbW91c2V1cCcgKSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgdGhpcy5zdGF0aWNDbGljayggZXZlbnQsIHBvaW50ZXIgKTtcblxuICAvLyBzZXQgZmxhZyBmb3IgZW11bGF0ZWQgY2xpY2tzIDMwMG1zIGFmdGVyIHRvdWNoZW5kXG4gIGlmICggZXZlbnQudHlwZSAhPSAnbW91c2V1cCcgKSB7XG4gICAgdGhpcy5pc0lnbm9yaW5nTW91c2VVcCA9IHRydWU7XG4gICAgLy8gcmVzZXQgZmxhZyBhZnRlciAzMDBtc1xuICAgIHNldFRpbWVvdXQoIGZ1bmN0aW9uKCkge1xuICAgICAgZGVsZXRlIHRoaXMuaXNJZ25vcmluZ01vdXNlVXA7XG4gICAgfS5iaW5kKCB0aGlzICksIDQwMCApO1xuICB9XG59O1xuXG5wcm90by5zdGF0aWNDbGljayA9IGZ1bmN0aW9uKCBldmVudCwgcG9pbnRlciApIHtcbiAgdGhpcy5lbWl0RXZlbnQoICdzdGF0aWNDbGljaycsIFsgZXZlbnQsIHBvaW50ZXIgXSApO1xufTtcblxuLy8gLS0tLS0gdXRpbHMgLS0tLS0gLy9cblxuVW5pZHJhZ2dlci5nZXRQb2ludGVyUG9pbnQgPSBVbmlwb2ludGVyLmdldFBvaW50ZXJQb2ludDtcblxuLy8gLS0tLS0gIC0tLS0tIC8vXG5cbnJldHVybiBVbmlkcmFnZ2VyO1xuXG59KSk7XG4iLCIvKiFcbiAqIFVuaXBvaW50ZXIgdjIuMy4wXG4gKiBiYXNlIGNsYXNzIGZvciBkb2luZyBvbmUgdGhpbmcgd2l0aCBwb2ludGVyIGV2ZW50XG4gKiBNSVQgbGljZW5zZVxuICovXG5cbi8qanNoaW50IGJyb3dzZXI6IHRydWUsIHVuZGVmOiB0cnVlLCB1bnVzZWQ6IHRydWUsIHN0cmljdDogdHJ1ZSAqL1xuXG4oIGZ1bmN0aW9uKCB3aW5kb3csIGZhY3RvcnkgKSB7XG4gIC8vIHVuaXZlcnNhbCBtb2R1bGUgZGVmaW5pdGlvblxuICAvKiBqc2hpbnQgc3RyaWN0OiBmYWxzZSAqLyAvKmdsb2JhbCBkZWZpbmUsIG1vZHVsZSwgcmVxdWlyZSAqL1xuICBpZiAoIHR5cGVvZiBkZWZpbmUgPT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kICkge1xuICAgIC8vIEFNRFxuICAgIGRlZmluZSggW1xuICAgICAgJ2V2LWVtaXR0ZXIvZXYtZW1pdHRlcidcbiAgICBdLCBmdW5jdGlvbiggRXZFbWl0dGVyICkge1xuICAgICAgcmV0dXJuIGZhY3RvcnkoIHdpbmRvdywgRXZFbWl0dGVyICk7XG4gICAgfSk7XG4gIH0gZWxzZSBpZiAoIHR5cGVvZiBtb2R1bGUgPT0gJ29iamVjdCcgJiYgbW9kdWxlLmV4cG9ydHMgKSB7XG4gICAgLy8gQ29tbW9uSlNcbiAgICBtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkoXG4gICAgICB3aW5kb3csXG4gICAgICByZXF1aXJlKCdldi1lbWl0dGVyJylcbiAgICApO1xuICB9IGVsc2Uge1xuICAgIC8vIGJyb3dzZXIgZ2xvYmFsXG4gICAgd2luZG93LlVuaXBvaW50ZXIgPSBmYWN0b3J5KFxuICAgICAgd2luZG93LFxuICAgICAgd2luZG93LkV2RW1pdHRlclxuICAgICk7XG4gIH1cblxufSggd2luZG93LCBmdW5jdGlvbiBmYWN0b3J5KCB3aW5kb3csIEV2RW1pdHRlciApIHtcblxuJ3VzZSBzdHJpY3QnO1xuXG5mdW5jdGlvbiBub29wKCkge31cblxuZnVuY3Rpb24gVW5pcG9pbnRlcigpIHt9XG5cbi8vIGluaGVyaXQgRXZFbWl0dGVyXG52YXIgcHJvdG8gPSBVbmlwb2ludGVyLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoIEV2RW1pdHRlci5wcm90b3R5cGUgKTtcblxucHJvdG8uYmluZFN0YXJ0RXZlbnQgPSBmdW5jdGlvbiggZWxlbSApIHtcbiAgdGhpcy5fYmluZFN0YXJ0RXZlbnQoIGVsZW0sIHRydWUgKTtcbn07XG5cbnByb3RvLnVuYmluZFN0YXJ0RXZlbnQgPSBmdW5jdGlvbiggZWxlbSApIHtcbiAgdGhpcy5fYmluZFN0YXJ0RXZlbnQoIGVsZW0sIGZhbHNlICk7XG59O1xuXG4vKipcbiAqIEFkZCBvciByZW1vdmUgc3RhcnQgZXZlbnRcbiAqIEBwYXJhbSB7Qm9vbGVhbn0gaXNBZGQgLSByZW1vdmUgaWYgZmFsc2V5XG4gKi9cbnByb3RvLl9iaW5kU3RhcnRFdmVudCA9IGZ1bmN0aW9uKCBlbGVtLCBpc0FkZCApIHtcbiAgLy8gbXVuZ2UgaXNBZGQsIGRlZmF1bHQgdG8gdHJ1ZVxuICBpc0FkZCA9IGlzQWRkID09PSB1bmRlZmluZWQgPyB0cnVlIDogaXNBZGQ7XG4gIHZhciBiaW5kTWV0aG9kID0gaXNBZGQgPyAnYWRkRXZlbnRMaXN0ZW5lcicgOiAncmVtb3ZlRXZlbnRMaXN0ZW5lcic7XG5cbiAgLy8gZGVmYXVsdCB0byBtb3VzZSBldmVudHNcbiAgdmFyIHN0YXJ0RXZlbnQgPSAnbW91c2Vkb3duJztcbiAgaWYgKCB3aW5kb3cuUG9pbnRlckV2ZW50ICkge1xuICAgIC8vIFBvaW50ZXIgRXZlbnRzXG4gICAgc3RhcnRFdmVudCA9ICdwb2ludGVyZG93bic7XG4gIH0gZWxzZSBpZiAoICdvbnRvdWNoc3RhcnQnIGluIHdpbmRvdyApIHtcbiAgICAvLyBUb3VjaCBFdmVudHMuIGlPUyBTYWZhcmlcbiAgICBzdGFydEV2ZW50ID0gJ3RvdWNoc3RhcnQnO1xuICB9XG4gIGVsZW1bIGJpbmRNZXRob2QgXSggc3RhcnRFdmVudCwgdGhpcyApO1xufTtcblxuLy8gdHJpZ2dlciBoYW5kbGVyIG1ldGhvZHMgZm9yIGV2ZW50c1xucHJvdG8uaGFuZGxlRXZlbnQgPSBmdW5jdGlvbiggZXZlbnQgKSB7XG4gIHZhciBtZXRob2QgPSAnb24nICsgZXZlbnQudHlwZTtcbiAgaWYgKCB0aGlzWyBtZXRob2QgXSApIHtcbiAgICB0aGlzWyBtZXRob2QgXSggZXZlbnQgKTtcbiAgfVxufTtcblxuLy8gcmV0dXJucyB0aGUgdG91Y2ggdGhhdCB3ZSdyZSBrZWVwaW5nIHRyYWNrIG9mXG5wcm90by5nZXRUb3VjaCA9IGZ1bmN0aW9uKCB0b3VjaGVzICkge1xuICBmb3IgKCB2YXIgaT0wOyBpIDwgdG91Y2hlcy5sZW5ndGg7IGkrKyApIHtcbiAgICB2YXIgdG91Y2ggPSB0b3VjaGVzW2ldO1xuICAgIGlmICggdG91Y2guaWRlbnRpZmllciA9PSB0aGlzLnBvaW50ZXJJZGVudGlmaWVyICkge1xuICAgICAgcmV0dXJuIHRvdWNoO1xuICAgIH1cbiAgfVxufTtcblxuLy8gLS0tLS0gc3RhcnQgZXZlbnQgLS0tLS0gLy9cblxucHJvdG8ub25tb3VzZWRvd24gPSBmdW5jdGlvbiggZXZlbnQgKSB7XG4gIC8vIGRpc21pc3MgY2xpY2tzIGZyb20gcmlnaHQgb3IgbWlkZGxlIGJ1dHRvbnNcbiAgdmFyIGJ1dHRvbiA9IGV2ZW50LmJ1dHRvbjtcbiAgaWYgKCBidXR0b24gJiYgKCBidXR0b24gIT09IDAgJiYgYnV0dG9uICE9PSAxICkgKSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIHRoaXMuX3BvaW50ZXJEb3duKCBldmVudCwgZXZlbnQgKTtcbn07XG5cbnByb3RvLm9udG91Y2hzdGFydCA9IGZ1bmN0aW9uKCBldmVudCApIHtcbiAgdGhpcy5fcG9pbnRlckRvd24oIGV2ZW50LCBldmVudC5jaGFuZ2VkVG91Y2hlc1swXSApO1xufTtcblxucHJvdG8ub25wb2ludGVyZG93biA9IGZ1bmN0aW9uKCBldmVudCApIHtcbiAgdGhpcy5fcG9pbnRlckRvd24oIGV2ZW50LCBldmVudCApO1xufTtcblxuLyoqXG4gKiBwb2ludGVyIHN0YXJ0XG4gKiBAcGFyYW0ge0V2ZW50fSBldmVudFxuICogQHBhcmFtIHtFdmVudCBvciBUb3VjaH0gcG9pbnRlclxuICovXG5wcm90by5fcG9pbnRlckRvd24gPSBmdW5jdGlvbiggZXZlbnQsIHBvaW50ZXIgKSB7XG4gIC8vIGRpc21pc3MgcmlnaHQgY2xpY2sgYW5kIG90aGVyIHBvaW50ZXJzXG4gIC8vIGJ1dHRvbiA9IDAgaXMgb2theSwgMS00IG5vdFxuICBpZiAoIGV2ZW50LmJ1dHRvbiB8fCB0aGlzLmlzUG9pbnRlckRvd24gKSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgdGhpcy5pc1BvaW50ZXJEb3duID0gdHJ1ZTtcbiAgLy8gc2F2ZSBwb2ludGVyIGlkZW50aWZpZXIgdG8gbWF0Y2ggdXAgdG91Y2ggZXZlbnRzXG4gIHRoaXMucG9pbnRlcklkZW50aWZpZXIgPSBwb2ludGVyLnBvaW50ZXJJZCAhPT0gdW5kZWZpbmVkID9cbiAgICAvLyBwb2ludGVySWQgZm9yIHBvaW50ZXIgZXZlbnRzLCB0b3VjaC5pbmRlbnRpZmllciBmb3IgdG91Y2ggZXZlbnRzXG4gICAgcG9pbnRlci5wb2ludGVySWQgOiBwb2ludGVyLmlkZW50aWZpZXI7XG5cbiAgdGhpcy5wb2ludGVyRG93biggZXZlbnQsIHBvaW50ZXIgKTtcbn07XG5cbnByb3RvLnBvaW50ZXJEb3duID0gZnVuY3Rpb24oIGV2ZW50LCBwb2ludGVyICkge1xuICB0aGlzLl9iaW5kUG9zdFN0YXJ0RXZlbnRzKCBldmVudCApO1xuICB0aGlzLmVtaXRFdmVudCggJ3BvaW50ZXJEb3duJywgWyBldmVudCwgcG9pbnRlciBdICk7XG59O1xuXG4vLyBoYXNoIG9mIGV2ZW50cyB0byBiZSBib3VuZCBhZnRlciBzdGFydCBldmVudFxudmFyIHBvc3RTdGFydEV2ZW50cyA9IHtcbiAgbW91c2Vkb3duOiBbICdtb3VzZW1vdmUnLCAnbW91c2V1cCcgXSxcbiAgdG91Y2hzdGFydDogWyAndG91Y2htb3ZlJywgJ3RvdWNoZW5kJywgJ3RvdWNoY2FuY2VsJyBdLFxuICBwb2ludGVyZG93bjogWyAncG9pbnRlcm1vdmUnLCAncG9pbnRlcnVwJywgJ3BvaW50ZXJjYW5jZWwnIF0sXG59O1xuXG5wcm90by5fYmluZFBvc3RTdGFydEV2ZW50cyA9IGZ1bmN0aW9uKCBldmVudCApIHtcbiAgaWYgKCAhZXZlbnQgKSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIC8vIGdldCBwcm9wZXIgZXZlbnRzIHRvIG1hdGNoIHN0YXJ0IGV2ZW50XG4gIHZhciBldmVudHMgPSBwb3N0U3RhcnRFdmVudHNbIGV2ZW50LnR5cGUgXTtcbiAgLy8gYmluZCBldmVudHMgdG8gbm9kZVxuICBldmVudHMuZm9yRWFjaCggZnVuY3Rpb24oIGV2ZW50TmFtZSApIHtcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lciggZXZlbnROYW1lLCB0aGlzICk7XG4gIH0sIHRoaXMgKTtcbiAgLy8gc2F2ZSB0aGVzZSBhcmd1bWVudHNcbiAgdGhpcy5fYm91bmRQb2ludGVyRXZlbnRzID0gZXZlbnRzO1xufTtcblxucHJvdG8uX3VuYmluZFBvc3RTdGFydEV2ZW50cyA9IGZ1bmN0aW9uKCkge1xuICAvLyBjaGVjayBmb3IgX2JvdW5kRXZlbnRzLCBpbiBjYXNlIGRyYWdFbmQgdHJpZ2dlcmVkIHR3aWNlIChvbGQgSUU4IGJ1ZylcbiAgaWYgKCAhdGhpcy5fYm91bmRQb2ludGVyRXZlbnRzICkge1xuICAgIHJldHVybjtcbiAgfVxuICB0aGlzLl9ib3VuZFBvaW50ZXJFdmVudHMuZm9yRWFjaCggZnVuY3Rpb24oIGV2ZW50TmFtZSApIHtcbiAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lciggZXZlbnROYW1lLCB0aGlzICk7XG4gIH0sIHRoaXMgKTtcblxuICBkZWxldGUgdGhpcy5fYm91bmRQb2ludGVyRXZlbnRzO1xufTtcblxuLy8gLS0tLS0gbW92ZSBldmVudCAtLS0tLSAvL1xuXG5wcm90by5vbm1vdXNlbW92ZSA9IGZ1bmN0aW9uKCBldmVudCApIHtcbiAgdGhpcy5fcG9pbnRlck1vdmUoIGV2ZW50LCBldmVudCApO1xufTtcblxucHJvdG8ub25wb2ludGVybW92ZSA9IGZ1bmN0aW9uKCBldmVudCApIHtcbiAgaWYgKCBldmVudC5wb2ludGVySWQgPT0gdGhpcy5wb2ludGVySWRlbnRpZmllciApIHtcbiAgICB0aGlzLl9wb2ludGVyTW92ZSggZXZlbnQsIGV2ZW50ICk7XG4gIH1cbn07XG5cbnByb3RvLm9udG91Y2htb3ZlID0gZnVuY3Rpb24oIGV2ZW50ICkge1xuICB2YXIgdG91Y2ggPSB0aGlzLmdldFRvdWNoKCBldmVudC5jaGFuZ2VkVG91Y2hlcyApO1xuICBpZiAoIHRvdWNoICkge1xuICAgIHRoaXMuX3BvaW50ZXJNb3ZlKCBldmVudCwgdG91Y2ggKTtcbiAgfVxufTtcblxuLyoqXG4gKiBwb2ludGVyIG1vdmVcbiAqIEBwYXJhbSB7RXZlbnR9IGV2ZW50XG4gKiBAcGFyYW0ge0V2ZW50IG9yIFRvdWNofSBwb2ludGVyXG4gKiBAcHJpdmF0ZVxuICovXG5wcm90by5fcG9pbnRlck1vdmUgPSBmdW5jdGlvbiggZXZlbnQsIHBvaW50ZXIgKSB7XG4gIHRoaXMucG9pbnRlck1vdmUoIGV2ZW50LCBwb2ludGVyICk7XG59O1xuXG4vLyBwdWJsaWNcbnByb3RvLnBvaW50ZXJNb3ZlID0gZnVuY3Rpb24oIGV2ZW50LCBwb2ludGVyICkge1xuICB0aGlzLmVtaXRFdmVudCggJ3BvaW50ZXJNb3ZlJywgWyBldmVudCwgcG9pbnRlciBdICk7XG59O1xuXG4vLyAtLS0tLSBlbmQgZXZlbnQgLS0tLS0gLy9cblxuXG5wcm90by5vbm1vdXNldXAgPSBmdW5jdGlvbiggZXZlbnQgKSB7XG4gIHRoaXMuX3BvaW50ZXJVcCggZXZlbnQsIGV2ZW50ICk7XG59O1xuXG5wcm90by5vbnBvaW50ZXJ1cCA9IGZ1bmN0aW9uKCBldmVudCApIHtcbiAgaWYgKCBldmVudC5wb2ludGVySWQgPT0gdGhpcy5wb2ludGVySWRlbnRpZmllciApIHtcbiAgICB0aGlzLl9wb2ludGVyVXAoIGV2ZW50LCBldmVudCApO1xuICB9XG59O1xuXG5wcm90by5vbnRvdWNoZW5kID0gZnVuY3Rpb24oIGV2ZW50ICkge1xuICB2YXIgdG91Y2ggPSB0aGlzLmdldFRvdWNoKCBldmVudC5jaGFuZ2VkVG91Y2hlcyApO1xuICBpZiAoIHRvdWNoICkge1xuICAgIHRoaXMuX3BvaW50ZXJVcCggZXZlbnQsIHRvdWNoICk7XG4gIH1cbn07XG5cbi8qKlxuICogcG9pbnRlciB1cFxuICogQHBhcmFtIHtFdmVudH0gZXZlbnRcbiAqIEBwYXJhbSB7RXZlbnQgb3IgVG91Y2h9IHBvaW50ZXJcbiAqIEBwcml2YXRlXG4gKi9cbnByb3RvLl9wb2ludGVyVXAgPSBmdW5jdGlvbiggZXZlbnQsIHBvaW50ZXIgKSB7XG4gIHRoaXMuX3BvaW50ZXJEb25lKCk7XG4gIHRoaXMucG9pbnRlclVwKCBldmVudCwgcG9pbnRlciApO1xufTtcblxuLy8gcHVibGljXG5wcm90by5wb2ludGVyVXAgPSBmdW5jdGlvbiggZXZlbnQsIHBvaW50ZXIgKSB7XG4gIHRoaXMuZW1pdEV2ZW50KCAncG9pbnRlclVwJywgWyBldmVudCwgcG9pbnRlciBdICk7XG59O1xuXG4vLyAtLS0tLSBwb2ludGVyIGRvbmUgLS0tLS0gLy9cblxuLy8gdHJpZ2dlcmVkIG9uIHBvaW50ZXIgdXAgJiBwb2ludGVyIGNhbmNlbFxucHJvdG8uX3BvaW50ZXJEb25lID0gZnVuY3Rpb24oKSB7XG4gIHRoaXMuX3BvaW50ZXJSZXNldCgpO1xuICB0aGlzLl91bmJpbmRQb3N0U3RhcnRFdmVudHMoKTtcbiAgdGhpcy5wb2ludGVyRG9uZSgpO1xufTtcblxucHJvdG8uX3BvaW50ZXJSZXNldCA9IGZ1bmN0aW9uKCkge1xuICAvLyByZXNldCBwcm9wZXJ0aWVzXG4gIHRoaXMuaXNQb2ludGVyRG93biA9IGZhbHNlO1xuICBkZWxldGUgdGhpcy5wb2ludGVySWRlbnRpZmllcjtcbn07XG5cbnByb3RvLnBvaW50ZXJEb25lID0gbm9vcDtcblxuLy8gLS0tLS0gcG9pbnRlciBjYW5jZWwgLS0tLS0gLy9cblxucHJvdG8ub25wb2ludGVyY2FuY2VsID0gZnVuY3Rpb24oIGV2ZW50ICkge1xuICBpZiAoIGV2ZW50LnBvaW50ZXJJZCA9PSB0aGlzLnBvaW50ZXJJZGVudGlmaWVyICkge1xuICAgIHRoaXMuX3BvaW50ZXJDYW5jZWwoIGV2ZW50LCBldmVudCApO1xuICB9XG59O1xuXG5wcm90by5vbnRvdWNoY2FuY2VsID0gZnVuY3Rpb24oIGV2ZW50ICkge1xuICB2YXIgdG91Y2ggPSB0aGlzLmdldFRvdWNoKCBldmVudC5jaGFuZ2VkVG91Y2hlcyApO1xuICBpZiAoIHRvdWNoICkge1xuICAgIHRoaXMuX3BvaW50ZXJDYW5jZWwoIGV2ZW50LCB0b3VjaCApO1xuICB9XG59O1xuXG4vKipcbiAqIHBvaW50ZXIgY2FuY2VsXG4gKiBAcGFyYW0ge0V2ZW50fSBldmVudFxuICogQHBhcmFtIHtFdmVudCBvciBUb3VjaH0gcG9pbnRlclxuICogQHByaXZhdGVcbiAqL1xucHJvdG8uX3BvaW50ZXJDYW5jZWwgPSBmdW5jdGlvbiggZXZlbnQsIHBvaW50ZXIgKSB7XG4gIHRoaXMuX3BvaW50ZXJEb25lKCk7XG4gIHRoaXMucG9pbnRlckNhbmNlbCggZXZlbnQsIHBvaW50ZXIgKTtcbn07XG5cbi8vIHB1YmxpY1xucHJvdG8ucG9pbnRlckNhbmNlbCA9IGZ1bmN0aW9uKCBldmVudCwgcG9pbnRlciApIHtcbiAgdGhpcy5lbWl0RXZlbnQoICdwb2ludGVyQ2FuY2VsJywgWyBldmVudCwgcG9pbnRlciBdICk7XG59O1xuXG4vLyAtLS0tLSAgLS0tLS0gLy9cblxuLy8gdXRpbGl0eSBmdW5jdGlvbiBmb3IgZ2V0dGluZyB4L3kgY29vcmRzIGZyb20gZXZlbnRcblVuaXBvaW50ZXIuZ2V0UG9pbnRlclBvaW50ID0gZnVuY3Rpb24oIHBvaW50ZXIgKSB7XG4gIHJldHVybiB7XG4gICAgeDogcG9pbnRlci5wYWdlWCxcbiAgICB5OiBwb2ludGVyLnBhZ2VZXG4gIH07XG59O1xuXG4vLyAtLS0tLSAgLS0tLS0gLy9cblxucmV0dXJuIFVuaXBvaW50ZXI7XG5cbn0pKTtcbiIsIihmdW5jdGlvbiAoKSB7XG5cbiAgICB2YXIgRmxpY2tpdHkgICAgICAgID0gcmVxdWlyZSgnZmxpY2tpdHknKSxcbiAgICBDYXJvdXNlbHNcblxuICAgIENhcm91c2VscyA9IHtcblxuICAgICAgICBpbml0OiAoKSA9PiB7XG5cbiAgICAgICAgICAgIENhcm91c2Vscy5pbml0aWFsaXNlQ2Fyb3VzZWwoKVxuXG4gICAgICAgIH0sXG5cbiAgICAgICAgaW5pdGlhbGlzZUNhcm91c2VsICA6ICgpID0+IHtcblxuICAgICAgICAgICAgdmFyIGNhcm91c2VscyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5KUy0tY2Fyb3VzZWwnKVxuXG4gICAgICAgICAgICBjYXJvdXNlbHMuZm9yRWFjaChjYXJvdXNlbCA9PiB7XG5cbiAgICAgICAgICAgICAgICB2YXIgc2V0dGluZ3MgPSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjZWxsQWxpZ24gICA6ICdjZW50ZXInLCAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgd3JhcEFyb3VuZCAgOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgYXV0b1BsYXkgICAgOiBmYWxzZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGltYWdlc0xvYWRlZDogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHBhZ2VEb3RzICAgIDogZmFsc2VcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgdmFyIHNsaWRlcyA9IGNhcm91c2VsLnF1ZXJ5U2VsZWN0b3JBbGwoJy5KUy0tY2Fyb3VzZWxfX3NsaWRlV3JhcCcpXG5cbiAgICAgICAgICAgICAgICBpZihjYXJvdXNlbC5kYXRhc2V0LnBsb3RDYXJvdXNlbFR5cGUgPT0gJ2ltYWdlJykge1xuICAgICAgICAgICAgICAgICAgICBzZXR0aW5ncyA9IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNlbGxBbGlnbiAgIDogJ2NlbnRlcicsICBcbiAgICAgICAgICAgICAgICAgICAgICAgIGxhenlMb2FkIDogMixcbiAgICAgICAgICAgICAgICAgICAgICAgIHdyYXBBcm91bmQgIDogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHBhZ2VEb3RzIDogZmFsc2VcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmKHNsaWRlcy5sZW5ndGggPiAxKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgdmFyIGZsa3R5ID0gbmV3IEZsaWNraXR5KGNhcm91c2VsLCBzZXR0aW5ncylcblxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIFxuICAgICAgICB9LFxuXG4gICAgfVxuXG4gICAgbW9kdWxlLmV4cG9ydHMgPSBDYXJvdXNlbHNcblxufSgpKVxuIiwiKGZ1bmN0aW9uICgpIHtcblxuICAgIHZhciBGQVFzXG5cbiAgICBGQVFzID0ge1xuICAgICAgICBzZWN0aW9uczogZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmZhcXMnKSxcblxuICAgICAgICBpbml0OiAoKSA9PiB7XG5cbiAgICAgICAgICAgIGlmKCFGQVFzLnNlY3Rpb25zKVxuICAgICAgICAgICAgICAgIHJldHVyblxuXG4gICAgICAgICAgICBGQVFzLnNlY3Rpb25zLmZvckVhY2goc2VjdGlvbiA9PiBGQVFzLmluaXRpYWxpc2VMaXN0ZW5lcnMoc2VjdGlvbikpXG5cbiAgICAgICAgfSxcblxuICAgICAgICBpbml0aWFsaXNlTGlzdGVuZXJzOiAoc2VjdGlvbikgPT4ge1xuICAgICAgICAgICAgXG4gICAgICAgICAgICBsZXQgZmFxcyA9IHNlY3Rpb24ucXVlcnlTZWxlY3RvckFsbCgnLmZhcScpXG5cbiAgICAgICAgICAgIGZhcXMuZm9yRWFjaChmYXEgPT4ge1xuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIGxldCBxdWVzdGlvbiA9IGZhcS5xdWVyeVNlbGVjdG9yKCcuZmFxX19xdWVzdGlvbicpXG4gICAgICAgICAgICAgICAgbGV0IGFuc3dlciAgID0gZmFxLnF1ZXJ5U2VsZWN0b3IoJy5mYXFfX2Fuc3dlcicpXG5cbiAgICAgICAgICAgICAgICBxdWVzdGlvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcblxuICAgICAgICAgICAgICAgICAgICBmYXEuY2xhc3NMaXN0LnRvZ2dsZSgnZmFxLS1vcGVuJylcblxuICAgICAgICAgICAgICAgICAgICBpZihmYXEuY2xhc3NMaXN0LmNvbnRhaW5zKCdmYXEtLW9wZW4nKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgYW5zd2VyLnN0eWxlLm1heEhlaWdodCA9IGFuc3dlci5zY3JvbGxIZWlnaHQgKyAncHgnXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBhbnN3ZXIuc3R5bGUubWF4SGVpZ2h0ID0gMFxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBcblxuICAgICAgICAgICAgICAgIH0pXG5cbiAgICAgICAgICAgIH0pXG4gICAgICAgIH1cblxuXG4gICAgfVxuXG4gICAgbW9kdWxlLmV4cG9ydHMgPSBGQVFzXG5cbn0oKSlcbiIsIi8vIExhenlMb2FkIGZvciBQbG90IGJ5IEpvbiBNaWxscywgTWF0dHkgR2xlbiAmIE1pY2hhZWwgV2F0c29uXG5cbi8vIFRoaXMgbW9kdWxlIGxvYWRzIGluIGltYWdlcyBhc3luY3Jvbm91c2x5LiBJdCB3aWxsIGxvb2sgZm9yIHRoZSBjbGFzc1xuLy8gXCJKUy0tbGF6eUxvYWRcIiBhbmQgdGhlbiBsb29rIGZvciBhIGRhdGEtc3JjIG9uIGltYWdlIG9yIHZpZGVvIHRhZ3MuIFxuLy8gSXQgd2lsbCB0aGVuIHJlcGxhY2UgdGhlIHNyYyBvZiB0aGF0IGVsZW1lbnQgd2l0aCB0aGUgaW1hZ2UgbGlua2VkIG9uXG4vLyB0aGUgZGF0YSBhdHRyaWJ1dGUuXG5cbi8vIElmIHRoZSBlbGVtZW50IGlzIG5vdCBhbiBpbWFnZSBvciBhIHZpZGVvLSBpdCB3aWxsIGFzc2lnbiB0aGUgZGF0YS1zcmNcbi8vIGFzIGEgYmFja2dyb3VuZCBpbWFnZS4gXG5cbi8vIElmIHRoZSBzY3JlZW4gc2l6ZSBpcyBsZXNzIHRoYW4gdGhlIGRlZmluZWQgbW9iaWxlQnJlYWtwb2ludCwgd2UgbG9hZFxuLy8gdGhlIHNyYyBmcm9tIGRhdGEtc21hbGwtc3JjIGluc3RlYWQuIFxuXG4vLyBDcmVhdGlvbiBvZiB0aGVzZSB2aWRlbyBhbmQgaW1hZ2Ugb2JqZWN0cyBjYW4gYmUgbWFkZSB1c2luZyB0aGUgUEhQXG4vLyBoZWxwZXIgaW4gbGliL2hlbHBlcnMucGhwIHBsb3RMYXp5TG9hZCgpXG5cbi8vIElmIHdlIG5lZWQgdG8gc3RpcHVsYXRlIHRoZSBoZWlnaHQgb2YgYW4gaW1hZ2UgYmVmb3JlIGl0IGxvYWRzLCB0byBhdm9pZFxuLy8gYW55IGp1bXBpbmVzcywgd2UgY2FuIHBhc3MgdGhyb3VnaCBhIHJhdGlvICh3L2gpIG9mIHRoZSBpbWFnZSBzbyBpdCdzXG4vLyBzZXQgYmVmb3JlIHRoZSBpbWFnZSBsb2Fkcy5cblxuLy8gV2UgYWxzbyBoYW5kbGUgYXV0b3BsYXlpbmcgdmlkZW9zLCBpZiB0aGUgdmlkZW8gaGFzIGFuIGF1dG9wbGF5IGF0dHJpYnV0ZS5cbi8vIEl0IHdpbGwgcGF1c2UgYW5kIHBsYXkgdmlkZW9zIGFwcHJvcHJpYXRlbHkgZGVwZW5kaW5nIG9uIGlmIHRoZXkncmUgaW5cbi8vIHZpZXcgb3Igbm90LlxuXG4oZnVuY3Rpb24oKXtcblxuICAgIHZhciBMYXp5TG9hZFxuXG4gICAgTGF6eUxvYWQgPSB7XG4gICAgICAgIG1vYmlsZUJyZWFrcG9pbnQgOiA2NDAsXG4gICAgICAgIGltYWdlcyA6ICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuSlMtLWxhenlMb2FkJyksXG4gICAgICAgIGNvbmZpZyA6IHtcbiAgICAgICAgICAgIHJvb3RNYXJnaW46ICcwcHgnLFxuICAgICAgICAgICAgdGhyZXNob2xkOiAwLjAxXG4gICAgICAgIH0sXG4gICAgICAgIG9ic2VydmVyIDogbnVsbCxcbiAgICAgICAgaW5pdCA6IGZ1bmN0aW9uKCl7IFxuXG4gICAgICAgICAgICBMYXp5TG9hZC5vYnNlcnZlciA9IG5ldyBJbnRlcnNlY3Rpb25PYnNlcnZlcihMYXp5TG9hZC5oYW5kbGVJbWFnZUxvYWQsIExhenlMb2FkLmNvbmZpZylcblxuICAgICAgICAgICAgTGF6eUxvYWQubG9hZEltYWdlcygpXG4gICAgICAgICAgICBcbiAgICAgICAgfSxcblxuICAgICAgICBsb2FkSW1hZ2VzIDogKCkgPT4geyBcblxuICAgICAgICAgICAgTGF6eUxvYWQuaW1hZ2VzLmZvckVhY2goIGltYWdlID0+IHsgIFxuXG4gICAgICAgICAgICAgICAgTGF6eUxvYWQub2JzZXJ2ZXIub2JzZXJ2ZShpbWFnZSlcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgXG4gICAgICAgIH0sXG5cbiAgICAgICAgYWRkRWxlbWVudHMgOiBlbGVtZW50cyA9PiB7XG5cbiAgICAgICAgICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLHJlamVjdCl7XG5cbiAgICAgICAgICAgICAgICBlbGVtZW50cy5mb3JFYWNoKCBpbWFnZSA9PiB7ICAgICAgIFxuICAgICAgICAgICAgICAgICAgICBMYXp5TG9hZC5vYnNlcnZlci5vYnNlcnZlKGltYWdlKVxuICAgICAgICAgICAgICAgIH0pXG5cbiAgICAgICAgICAgICAgICByZXNvbHZlKClcblxuICAgICAgICAgICAgfSlcbiAgICAgICAgfSxcblxuICAgICAgICBoYW5kbGVJbWFnZUxvYWQgOiBlbnRyaWVzID0+IHsgICAgICAgICAgICAgICAgICAgICAgICBcblxuICAgICAgICAgICAgZW50cmllcy5mb3JFYWNoKCBlbnRyeSA9PiB7XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgbGV0IGVsZW1lbnQgPSBlbnRyeS50YXJnZXRcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICBpZighZWxlbWVudC5jbGFzc0xpc3QuY29udGFpbnMoJ2xvYWRlZCcpICYmICFlbGVtZW50LmNsYXNzTGlzdC5jb250YWlucygnbG9hZGluZycpKSB7IFxuXG4gICAgICAgICAgICAgICAgICAgIGlmKCFlbnRyeS5pc0ludGVyc2VjdGluZylcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVyblxuICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgZWxlbWVudC5jbGFzc0xpc3QuYWRkKCdsb2FkaW5nJylcblxuICAgICAgICAgICAgICAgICAgICB2YXIgdGFnID0gZW50cnkuaXNJbnRlcnNlY3RpbmcgJiYgZWxlbWVudC50YWdOYW1lXG5cbiAgICAgICAgICAgICAgICAgICAgbGV0IHNyYyA9IGVsZW1lbnQuZGF0YXNldC5zcmNcblxuICAgICAgICAgICAgICAgICAgICBpZihMYXp5TG9hZC5pc1NtYWxsU2NyZWVuKCkgJiYgZWxlbWVudC5kYXRhc2V0LnNtYWxsU3JjKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHNyYyA9IGVsZW1lbnQuZGF0YXNldC5zbWFsbFNyY1xuXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgIGlmKHRhZyA9PSBcIlZJREVPXCIpIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgaWYoTGF6eUxvYWQuaXNTbWFsbFNjcmVlbigpICYmIGVsZW1lbnQuZGF0YXNldC5zbWFsbFNyYykge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxlbWVudC5zcmMgPSBlbGVtZW50LmRhdGFzZXQuc21hbGxTcmNcblxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbGVtZW50LnNyYyA9IGVsZW1lbnQuZGF0YXNldC5zcmNcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZihlbGVtZW50LmdldEF0dHJpYnV0ZSgnYXV0b3BsYXknKSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsZW1lbnQucGxheSgpXG4gICAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGVsZW1lbnQuY2xhc3NMaXN0LmFkZCgnbG9hZGVkJylcblxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBMYXp5TG9hZC5nZXRJbWFnZShzcmMsIGVsZW1lbnQpLnRoZW4oIGRhdGEgPT4ge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHRhZyA9IGVsZW1lbnQudGFnTmFtZVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYodGFnID09IFwiSU1HXCIpIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhLmVsZW1lbnQuc3JjID0gZGF0YS5zcmNcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0YS5lbGVtZW50LnN0eWxlLmJhY2tncm91bmRJbWFnZSA9ICd1cmwoJyArIGRhdGEuc3JjICsgJyknXG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhLmVsZW1lbnQuY2xhc3NMaXN0LmFkZCgnbG9hZGVkJylcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhLmVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZSgnbG9hZGluZycpXG5cbiAgICAgICAgICAgICAgICAgICAgICAgIH0pLmNhdGNoKCBlcnJvcmVkU3JjID0+e1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coZXJyb3JlZFNyYywgJ2ltYWdlIG5vdCBmb3VuZCcpXG5cbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXG5cbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcblxuICAgICAgICAgICAgICAgICAgICBpZihlbGVtZW50LnRhZ05hbWUgPT0gXCJWSURFT1wiKSBcblxuICAgICAgICAgICAgICAgICAgICAgICAgaWYoZWxlbWVudC5nZXRBdHRyaWJ1dGUoJ2F1dG9wbGF5JykpIFxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYoIWVudHJ5LmlzSW50ZXJzZWN0aW5nICYmIGVsZW1lbnQucGF1c2VkID09IGZhbHNlKSBcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbGVtZW50LnBhdXNlKClcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2VcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbGVtZW50LnBsYXkoKVxuXG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB9KVxuICAgICAgICB9LFxuXG4gICAgICAgIGdldEltYWdlOiAoc3JjLCBlbGVtZW50KSA9PiB7XG5cbiAgICAgICAgICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLHJlamVjdCl7XG5cbiAgICAgICAgICAgICAgICB2YXIgaW1nID0gbmV3IEltYWdlKClcblxuICAgICAgICAgICAgICAgIGltZy5vbmxvYWQgPSAoKSA9PiB7XG5cbiAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZSh7XG4gICAgICAgICAgICAgICAgICAgICAgICBzcmM6IHNyYyxcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsZW1lbnQ6IGVsZW1lbnRcbiAgICAgICAgICAgICAgICAgICAgfSlcblxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGltZy5vbmVycm9yID0gKCkgPT4ge1xuXG4gICAgICAgICAgICAgICAgICAgIHJlamVjdCh7XG4gICAgICAgICAgICAgICAgICAgICAgICBzcmM6IHNyYyxcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsZW1lbnQ6IGVsZW1lbnRcbiAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpbWcuc3JjID0gc3JjXG4gICAgICAgICAgICB9KVxuXG4gICAgICAgIH0sXG5cbiAgICAgICAgaXNTbWFsbFNjcmVlbiA6ICgpID0+IHtcblxuICAgICAgICAgICAgaWYod2luZG93LmlubmVyV2lkdGggPCBMYXp5TG9hZC5tb2JpbGVCcmVha3BvaW50KVxuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlXG4gICAgICAgICAgICBcblxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlXG5cbiAgICAgICAgfVxuXG5cbiAgICB9XG5cbiAgICBtb2R1bGUuZXhwb3J0cyA9IExhenlMb2FkXG5cbn0pKClcblxuIiwiLy8gTW9kYWxzIGZvciBQbG90IGJ5IE1pY2hhZWwgV2F0c29uXG4vLyBBIHNpbXBsZSBtb2RhbHMgc29sdXRpb24gdGhhdCBsb29rcyBmb3IgdGhlIGNsYXNzIFwiSlMtLXBsb3RNb2RhbEJ1dHRvblwiXG4vLyBBbmQgd2hlbiBjbGlja2VkLCByZWFkcyB0aGUgdmFsdWUgc2V0IG9uIGRhdGEtcGxvdC1tb2RhbC4gaXQgdGhlbiBsb29rc1xuLy8gZm9yIGFuIEhUTUwgZWxlbWVudCBjYWxsZWQgXCIuSlMtLXBsb3RNb2RhbENvbnRlbnRzXCIgd2l0aCBhIGNvcnJlc3BvbmRpbmcgdmFsdWUuXG5cbi8vIEZvciBleGFtcGxlLCA8YSBjbGFzcz1cIkpTLS1wbG90TW9kYWxCdXR0b25cIiBkYXRhLXBsb3QtbW9kYWw9XCIxXCI+Q2xpY2sgbWU8L2E+XG4vLyBXaWxsIGZpbmQgdGhlIGZvbGxvd2luZyBlbGVtZW50OlxuLy8gPGRpdiBjbGFzcz1cIkpTLS1wbG90TW9kYWxDb250ZW50c1wiPkkgYW0gc29tZSBtb2RhbCBjb250ZW50ITwvZGl2PlxuLy8gQW5kIHdpbGwgdGFrZSB0aGUgaW5uZXJIVE1MIHRvIHB1dCBpbnNpZGUgYSBtb2RhbCBvbiB0aGUgc2NyZWVuLlxuXG4vLyBHYWxsZXJpZXMgY2FuIGJlIGNyZWF0ZWQgYnkgY29ubmVjdGluZyBtdWx0aXBsZSBQbG90IE1vZGFsIEJ1dHRvbnNcbi8vIGJ5IGdpdmluZyB0aGVtIGEgZGF0YS1wbG90LW1vZGFsLWdyb3VwIG9wdGlvbi5cbi8vIFRoZXkgd2lsbCB0aGVuIGhhdmUgd29ya2luZyBsZWZ0IGFuZCByaWdodCBhcnJvd3MgdG8gbmF2aWdhdGUgdGhyb3VnaFxuLy8gQ29udGVudHMgaW4gYSBsb29wLlxuXG4oZnVuY3Rpb24gKCkge1xuXG4gICAgdmFyIExhenlMb2FkICAgICAgICAgPSByZXF1aXJlKCcuL2xhenlsb2FkJyksICBcbiAgICAgICAgUGxvdCAgICAgICAgICAgICA9IHJlcXVpcmUoJy4vcGxvdCcpLFxuICAgICAgICBCb2R5U2Nyb2xsTG9jayAgID0gcmVxdWlyZSgnYm9keS1zY3JvbGwtbG9jaycpLFxuICAgICAgICBNb2RhbHNcblxuICAgIE1vZGFscyA9IHtcbiAgICAgICAgY3VycmVudEdyb3VwSXRlbSAgICA6IDAsXG4gICAgICAgIGdyb3VwTGlua3MgICAgICAgICAgOiBbXSwgIFxuICAgICAgICBjdXJyZW50TW9kYWxJZCAgICAgIDogbnVsbCxcbiAgICAgICAgaXNPcGVuICAgICAgICAgICAgICA6IGZhbHNlLFxuICAgICAgICBpc0xvYWRpbmcgICAgICAgICAgIDogZmFsc2UsXG4gICAgICAgIGNvbnRyb2xzVGltZXIgICAgICAgOiBmYWxzZSxcbiAgICAgICAgbW9kYWxDb250ZW50ICAgICAgICA6IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5KUy0tcGxvdE1vZGFsUmVwbGFjZUNvbnRlbnRzJyksXG4gICAgICAgIG1vZGFsR3JvdXBDb250cm9scyAgOiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuSlMtLXBsb3RNb2RhbENvbnRyb2xzJyksXG4gICAgICAgIG1vZGFsR3JvdXBOZXh0ICAgICAgOiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuSlMtLXBsb3RNb2RhbENvbnRyb2xzX19uZXh0JyksXG4gICAgICAgIG1vZGFsR3JvdXBCYWNrICAgICAgOiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuSlMtLXBsb3RNb2RhbENvbnRyb2xzX19iYWNrJyksXG4gICAgICAgIHBsb3RNb2RhbCAgICAgICAgICAgOiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuSlMtLXBsb3RNb2RhbCcpLFxuXG5cbiAgICAgICAgaW5pdDogZnVuY3Rpb24gKCkge1xuXG4gICAgICAgICAgICBNb2RhbHMuY3JlYXRlTGlzdGVuZXJzKClcbiAgICAgICAgICAgIE1vZGFscy5jaGVja0Zvck1vZGFsTm90aWZpY2F0aW9uKClcbiAgICAgICAgfSxcblxuICAgICAgICBjcmVhdGVMaXN0ZW5lcnM6IGZ1bmN0aW9uICgpIHtcblxuICAgICAgICAgICAgY29uc3QgY2xvc2VCdXR0b25zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLkpTLS1jbG9zZVBsb3RNb2RhbCcpXG5cbiAgICAgICAgICAgIGZvcih2YXIgY2xvc2VCdXR0b24gb2YgY2xvc2VCdXR0b25zKSB7XG4gICAgICAgICAgICAgICAgY2xvc2VCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLGZ1bmN0aW9uKGUpe1xuICAgICAgICAgICAgICAgICAgICAgaWYgKGUudGFyZ2V0ICE9PSB0aGlzKVxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuXG4gICAgICAgICAgICAgICAgICAgICBNb2RhbHMuY2xvc2VQbG90TW9kYWwoKVxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIE1vZGFscy5wbG90TW9kYWwuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vtb3ZlJyxmdW5jdGlvbigpe1xuXG4gICAgICAgICAgICAgICAgaWYoTW9kYWxzLmN1cnJlbnRNb2RhbElkICYmICFQbG90LmlzVG91Y2hEZXZpY2UoKSkge1xuXG4gICAgICAgICAgICAgICAgICAgIGlmKE1vZGFscy5jb250cm9sc1RpbWVyKVxuICAgICAgICAgICAgICAgICAgICAgICAgY2xlYXJUaW1lb3V0KE1vZGFscy5jb250cm9sc1RpbWVyKVxuICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgaWYoTW9kYWxzLnBsb3RNb2RhbC5jbGFzc0xpc3QuY29udGFpbnMoJ2hpZGVDb250cm9scycpKVxuICAgICAgICAgICAgICAgICAgICAgICAgTW9kYWxzLnBsb3RNb2RhbC5jbGFzc0xpc3QucmVtb3ZlKCdoaWRlQ29udHJvbHMnKVxuXG4gICAgICAgICAgICAgICAgICAgIE1vZGFscy5jb250cm9sc1RpbWVyID0gc2V0VGltZW91dChmdW5jdGlvbigpIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgTW9kYWxzLnBsb3RNb2RhbC5jbGFzc0xpc3QuYWRkKCdoaWRlQ29udHJvbHMnKVxuXG4gICAgICAgICAgICAgICAgICAgIH0sMjIwMClcblxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zaXRlV3JhcCcpLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oZSl7XG4gICAgICAgICAgICAgICAgaWYoZS50YXJnZXQuY2xvc2VzdCgnW2RhdGEtcGxvdC1tb2RhbF0nKSkge1xuICAgICAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KClcbiAgICAgICAgICAgICAgICAgICAgTW9kYWxzLm9wZW5QbG90TW9kYWwoZS50YXJnZXQuY2xvc2VzdCgnW2RhdGEtcGxvdC1tb2RhbF0nKSlcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIH0pXG5cbiAgICAgICAgICAgIGlmKE1vZGFscy5tb2RhbEdyb3VwQmFjaykge1xuXG4gICAgICAgICAgICAgICAgTW9kYWxzLm1vZGFsR3JvdXBCYWNrLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJyxNb2RhbHMudHJpZ2dlckJhY2tHcm91cEl0ZW0pO1xuXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmKE1vZGFscy5tb2RhbEdyb3VwTmV4dCkge1xuXG4gICAgICAgICAgICAgICAgTW9kYWxzLm1vZGFsR3JvdXBOZXh0LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJyxNb2RhbHMudHJpZ2dlck5leHRHcm91cEl0ZW0pO1xuXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCAoZSkgPT4ge1xuXG4gICAgICAgICAgICAgICAgaWYoZS53aGljaCA9PSAzOSAmJiBNb2RhbHMuZ3JvdXBMaW5rcy5sZW5ndGggPiAwKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgTW9kYWxzLnRyaWdnZXJOZXh0R3JvdXBJdGVtKClcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZihlLndoaWNoID09IDM3ICYmIE1vZGFscy5ncm91cExpbmtzLmxlbmd0aCA+IDApIHtcblxuICAgICAgICAgICAgICAgICAgICBNb2RhbHMudHJpZ2dlckJhY2tHcm91cEl0ZW0oKVxuXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIGlmKE1vZGFscy5pc09wZW4gJiYgZS53aGljaD09MjcpIHtcblxuICAgICAgICAgICAgICAgICAgICBNb2RhbHMuY2xvc2VQbG90TW9kYWwoKVxuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgfSxcblxuXG4gICAgICAgIGNoZWNrRm9yTW9kYWxOb3RpZmljYXRpb24gOiAoKSA9PiB7XG5cbiAgICAgICAgICAgIGNvbnN0IG5vdGlmaWNhdGlvblRyaWdnZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuSlMtLWZha2VCdXR0b25Gb3JNb2RhbE5vdGlmaWNhdGlvbnMnKVxuXG4gICAgICAgICAgICBpZihub3RpZmljYXRpb25UcmlnZ2VyKSB7XG5cbiAgICAgICAgICAgICAgICBpZiAoc2Vzc2lvblN0b3JhZ2UuZ2V0SXRlbSgncGxvdEhhc05vdGlmaWNhdGlvbkZpcmVkJykgIT09IFwiMVwiKSB7IFxuXG4gICAgICAgICAgICAgICAgICAgIHNlc3Npb25TdG9yYWdlLnNldEl0ZW0oJ3Bsb3RIYXNOb3RpZmljYXRpb25GaXJlZCcsICcxJyk7XG5cbiAgICAgICAgICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgTW9kYWxzLm9wZW5QbG90TW9kYWwobm90aWZpY2F0aW9uVHJpZ2dlcilcblxuICAgICAgICAgICAgICAgICAgICB9LG5vdGlmaWNhdGlvblRyaWdnZXIuZGF0YXNldC5wbG90Tm90aWZpY2F0aW9uV2FpdCoxMDAwKVxuXG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfSxcblxuICAgICAgICB0cmlnZ2VyQmFja0dyb3VwSXRlbSA6ICgpID0+IHtcblxuICAgICAgICAgICAgTW9kYWxzLmN1cnJlbnRHcm91cEl0ZW0tLVxuXG4gICAgICAgICAgICBpZihNb2RhbHMuY3VycmVudEdyb3VwSXRlbSA8IDApIHtcblxuICAgICAgICAgICAgICAgIE1vZGFscy5jdXJyZW50R3JvdXBJdGVtID0gTW9kYWxzLmdyb3VwTGlua3MubGVuZ3RoIC0gMTtcblxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBNb2RhbHMub3BlblBsb3RNb2RhbChNb2RhbHMuZ3JvdXBMaW5rc1tNb2RhbHMuY3VycmVudEdyb3VwSXRlbV0pXG5cbiAgICAgICAgfSxcblxuICAgICAgICB0cmlnZ2VyTmV4dEdyb3VwSXRlbSA6ICgpID0+IHtcblxuICAgICAgICAgICAgTW9kYWxzLmN1cnJlbnRHcm91cEl0ZW0rK1xuXG4gICAgICAgICAgICBpZihNb2RhbHMuY3VycmVudEdyb3VwSXRlbSA9PSBNb2RhbHMuZ3JvdXBMaW5rcy5sZW5ndGgpIHtcblxuICAgICAgICAgICAgICAgIE1vZGFscy5jdXJyZW50R3JvdXBJdGVtID0gMFxuXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIE1vZGFscy5vcGVuUGxvdE1vZGFsKE1vZGFscy5ncm91cExpbmtzW01vZGFscy5jdXJyZW50R3JvdXBJdGVtXSlcblxuICAgICAgICB9LFxuXG4gICAgICAgIG9wZW5QbG90TW9kYWw6IChlbGVtZW50KSA9PiB7XG5cbiAgICAgICAgICAgIGlmKE1vZGFscy5pc0xvYWRpbmcgPT0gdHJ1ZSlcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2VcblxuICAgICAgICAgICAgdmFyIHNldHRpbmdzID0ge1xuICAgICAgICAgICAgICAgIHR5cGUgICAgICAgICAgICA6ICdpbmxpbmUnLCAvLyAoaW5saW5lfGFqYXgpIGlmIHRoZSBjb250ZW50IGlzIGFscmVhZHkgaW4gdGhlIGRvbSBvciBub3RcbiAgICAgICAgICAgICAgICBncm91cElkICAgICAgICAgOiAnJywgLy9UaGUgb3B0aW9uYWwgSUQgb2YgdGhlIGdyb3VwIG9mIG1vZGFscyB1c2VkIGZvciBnYWxsZXJ5IHZpZXdzXG4gICAgICAgICAgICAgICAgY29udGVudHNJZCAgICAgIDogJycsIC8vVGhlIElEIHRoYXQgcmVmZXJlbmNlcyB3aGVyZSwgb24gdGhlIHBhZ2UsIHRoZSBjb250ZW50IHRvIHVzZSBsaXZlc1xuICAgICAgICAgICAgICAgIHRlbXBsYXRlUGFydCAgICA6ICcnLCAvL1RoZSB0ZW1wbGF0ZSBwYXJ0IHRvIGxvYWQsIGlmIEFKQVhcbiAgICAgICAgICAgICAgICBhamF4RGF0YSAgICAgICAgOiB7fSwgLy9EYXRhIHRvIHNlbmQgdmlhIEFKQVhcbiAgICAgICAgICAgICAgICBtb2RhbENsYXNzICAgICAgOiAnJyAvL0EgY3VzdG9tIGNsYXNzIHRvIGFkZCB0byBvdXIgbW9kYWxcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgTW9kYWxzLmlzTG9hZGluZyA9IHRydWVcblxuICAgICAgICAgICAgaWYoZWxlbWVudC5kYXRhc2V0LnBsb3RNb2RhbFR5cGUgPT0gJ2FqYXgnKSB7XG4gICAgICAgICAgICAgICAgc2V0dGluZ3MudHlwZSA9ICdhamF4J1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBzZXR0aW5ncy5jb250ZW50c0lkICAgICA9IGVsZW1lbnQuZGF0YXNldC5wbG90TW9kYWxDb250ZW50c1xuICAgICAgICAgICAgc2V0dGluZ3MuZ3JvdXBJZCAgICAgICAgPSBlbGVtZW50LmRhdGFzZXQucGxvdE1vZGFsR3JvdXBcbiAgICAgICAgICAgIHNldHRpbmdzLnRlbXBsYXRlUGFydCAgID0gZWxlbWVudC5kYXRhc2V0LnBsb3RNb2RhbFRlbXBsYXRlUGFydFxuICAgICAgICAgICAgc2V0dGluZ3MubW9kYWxDbGFzcyAgICAgPSBlbGVtZW50LmRhdGFzZXQucGxvdE1vZGFsQ2xhc3NcblxuICAgICAgICAgICAgaWYoIXNldHRpbmdzLmNvbnRlbnRzSWQgJiYgc2V0dGluZ3MudHlwZSA9PSAnaW5saW5lJykge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdJbmxpbmUgTW9kYWxzIG5lZWQgYSBwbG90LW1vZGFsLWNvbnRlbnRzIHZhcmlhYmxlIGFkZGVkJylcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2VcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYoc2V0dGluZ3MudHlwZSA9PSAnYWpheCcgJiYgIXNldHRpbmdzLnRlbXBsYXRlUGFydCkge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdBamF4IG1vZGFscyBuZWVkIGEgcGxvdC1tb2RhbC10ZW1wbGF0ZS1wYXJ0IHZhcmlhYmxlIGFkZGVkJylcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2VcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy9DaGVjayB0byBzZWUgaWYgaXQncyBwYXJ0IG9mIGEgZ3JvdXBcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgaWYoTW9kYWxzLmdyb3VwTGlua3MubGVuZ3RoID09IDAgJiYgc2V0dGluZ3MuZ3JvdXBJZClcbiAgICAgICAgICAgICAgIE1vZGFscy5pbml0aWFsaXNlR3JvdXAoZWxlbWVudClcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgaWYoIXNldHRpbmdzLmdyb3VwSWQpXG4gICAgICAgICAgICAgICAgTW9kYWxzLm1vZGFsR3JvdXBDb250cm9scy5jbGFzc0xpc3QuYWRkKCdoaWRkZW4nKVxuXG4gICAgICAgICAgICBpZihzZXR0aW5ncy5tb2RhbENsYXNzKSB7XG4gICAgICAgICAgICAgICAgTW9kYWxzLnBsb3RNb2RhbC5jbGFzc0xpc3QuYWRkKHNldHRpbmdzLm1vZGFsQ2xhc3MpXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmKHNldHRpbmdzLnR5cGUgPT0gJ2lubGluZScpIHtcblxuICAgICAgICAgICAgICAgIE1vZGFscy5jdXJyZW50TW9kYWxJZCA9IHNldHRpbmdzLmNvbnRlbnRzSWRcblxuICAgICAgICAgICAgICAgIC8vRmluZCBjb250ZW50IHRvIGluc2VydCBpbiBvdXIgbW9kYWxcbiAgICAgICAgICAgICAgICB2YXIgcGxvdE1vZGFsQ29udGVudHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuSlMtLXBsb3RNb2RhbENvbnRlbnRzW2RhdGEtcGxvdC1tb2RhbC1jb250ZW50cz1cIicgKyBNb2RhbHMuY3VycmVudE1vZGFsSWQgKyAnXCJdJylcblxuICAgICAgICAgICAgICAgIGlmKCFwbG90TW9kYWxDb250ZW50cy5sZW5ndGggPT0gMClcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlXG5cbiAgICAgICAgICAgICAgICBwbG90TW9kYWxDb250ZW50cyA9IHBsb3RNb2RhbENvbnRlbnRzLmlubmVySFRNTDtcblxuICAgICAgICAgICAgICAgIE1vZGFscy5wdXRDb250ZW50c0ludG9Nb2RhbChwbG90TW9kYWxDb250ZW50cylcblxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAvL0FKQVggbG9hZGluZyBjb250ZW50XG4gICAgICAgICAgICAgICAgdmFyIGFqYXhEYXRhID0ge31cblxuICAgICAgICAgICAgICAgIGRvY3VtZW50LmJvZHkuY2xhc3NMaXN0LmFkZCgncGxvdE1vZGFsTG9hZGluZ0FqYXgnKVxuXG4gICAgICAgICAgICAgICAgZm9yKGNvbnN0IGtleSBpbiBlbGVtZW50LmRhdGFzZXQpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYoa2V5LnN1YnN0cmluZygwLDEzKSA9PSAncGxvdE1vZGFsRGF0YScpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGFqYXhEYXRhW2tleS5jaGFyQXQoMTMpLnRvTG93ZXJDYXNlKCkgKyBrZXkuc3Vic3RyaW5nKDE0KV0gPSBlbGVtZW50LmRhdGFzZXRba2V5XVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICBjb25zdCBhcmdzID0ge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm5PcldyaXRlICAgOiAncmV0dXJuJyxcbiAgICAgICAgICAgICAgICAgICAgdGVtcGxhdGVQYXJ0ICAgIDogc2V0dGluZ3MudGVtcGxhdGVQYXJ0LFxuICAgICAgICAgICAgICAgICAgICBkYXRhICAgICAgICAgICAgOiBhamF4RGF0YVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBQbG90LmxvYWRUZW1wbGF0ZVBhcnQoYXJncykudGhlbihodG1sID0+IHtcbiAgICAgICAgICAgICAgICAgICAgTW9kYWxzLnB1dENvbnRlbnRzSW50b01vZGFsKGh0bWwpXG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIH1cblxuICAgICAgICB9LFxuXG4gICAgICAgIHB1dENvbnRlbnRzSW50b01vZGFsIDogY29udGVudHMgPT4gIHtcblxuXG4gICAgICAgICAgICBNb2RhbHMubW9kYWxDb250ZW50LnN0eWxlLm1pbkhlaWdodCA9IE1vZGFscy5tb2RhbENvbnRlbnQuY2xpZW50SGVpZ2h0ICsgJ3B4J1xuICAgICAgICAgICAgTW9kYWxzLm1vZGFsQ29udGVudC5pbm5lckhUTUwgPSBjb250ZW50c1xuXG4gICAgICAgICAgICBCb2R5U2Nyb2xsTG9jay5kaXNhYmxlQm9keVNjcm9sbChNb2RhbHMucGxvdE1vZGFsKVxuXG4gICAgICAgICAgICBkb2N1bWVudC5ib2R5LmNsYXNzTGlzdC5hZGQoJ3Bsb3RNb2RhbEluVmlldycpXG5cbiAgICAgICAgICAgIGNvbnN0IG5ld0ltYWdlcyA9IE1vZGFscy5tb2RhbENvbnRlbnQucXVlcnlTZWxlY3RvckFsbCgnaW1nJylcblxuICAgICAgICAgICAgTGF6eUxvYWQuYWRkRWxlbWVudHMobmV3SW1hZ2VzKS50aGVuKCgpID0+IHtcblxuICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoKCk9PiB7XG5cbiAgICAgICAgICAgICAgICAgICAgTW9kYWxzLm1vZGFsQ29udGVudC5zdHlsZS5taW5IZWlnaHQgPSAwXG5cbiAgICAgICAgICAgICAgICB9LDUwKVxuXG4gICAgICAgICAgICB9KVxuXG4gICAgICAgICAgICBjb25zdCBuZXdWaWRlb3MgPSBNb2RhbHMubW9kYWxDb250ZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ3ZpZGVvJylcblxuXG5cbiAgICAgICAgICAgIG5ld1ZpZGVvcy5mb3JFYWNoKHZpZGVvID0+e1xuXG4gICAgICAgICAgICAgICAgdmFyIHBsYXllciA9IG5ldyBNZWRpYUVsZW1lbnRQbGF5ZXIodmlkZW8sLyogT3B0aW9ucyAqLyk7XG4gICAgICAgICAgICAgICAgcGxheWVyLnBsYXkoKTtcblxuICAgICAgICAgICAgfSlcblxuICAgICAgICAgICAgTW9kYWxzLmlzT3BlbiA9IHRydWVcbiAgICAgICAgICAgIE1vZGFscy5pc0xvYWRpbmcgPSBmYWxzZVxuICAgICAgICAgICAgZG9jdW1lbnQuYm9keS5jbGFzc0xpc3QucmVtb3ZlKCdwbG90TW9kYWxMb2FkaW5nQWpheCcpXG5cbiAgICAgICAgfSxcblxuICAgICAgICBpbml0aWFsaXNlR3JvdXAgOiAoZWxlbWVudCkgPT4ge1xuXG4gICAgICAgICAgICBNb2RhbHMuZ3JvdXBMaW5rcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ1tkYXRhLXBsb3QtbW9kYWwtZ3JvdXA9XCInK2VsZW1lbnQuZGF0YXNldC5wbG90TW9kYWxHcm91cCsnXCJdJylcblxuICAgICAgICAgICAgdmFyIGkgPSAwXG5cbiAgICAgICAgICAgIGZvcih2YXIgZ3JvdXBMaW5rIG9mIE1vZGFscy5ncm91cExpbmtzKSB7XG5cbiAgICAgICAgICAgICAgICBpZihlbGVtZW50ID09IGdyb3VwTGluaylcbiAgICAgICAgICAgICAgICAgICAgTW9kYWxzLmN1cnJlbnRHcm91cEl0ZW0gPSBpO1xuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIGkrK1xuXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmKE1vZGFscy5jdXJyZW50TW9kYWxJZCAmJiAhUGxvdC5pc1RvdWNoRGV2aWNlKCkpXG5cbiAgICAgICAgICAgICAgICBNb2RhbHMuY29udHJvbHNUaW1lciA9IHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgTW9kYWxzLnBsb3RNb2RhbC5jbGFzc0xpc3QuYWRkKCdoaWRlQ29udHJvbHMnKVxuXG4gICAgICAgICAgICAgICAgfSwzMDAwKVxuXG4gICAgICAgICAgICBNb2RhbHMubW9kYWxHcm91cENvbnRyb2xzLmNsYXNzTGlzdC5yZW1vdmUoJ2hpZGRlbicpXG5cbiAgICAgICAgfSxcblxuICAgICAgICBjbG9zZVBsb3RNb2RhbDogKCkgPT4ge1xuICAgIFxuICAgICAgICAgICAgZG9jdW1lbnQuYm9keS5jbGFzc0xpc3QucmVtb3ZlKCdwbG90TW9kYWxJblZpZXcnKVxuXG4gICAgICAgICAgICBNb2RhbHMuY3VycmVudE1vZGFsSWQgPSBudWxsXG5cbiAgICAgICAgICAgIE1vZGFscy5wbG90TW9kYWwuY2xhc3NMaXN0ID0gJ0pTLS1wbG90TW9kYWwgcGxvdE1vZGFsJ1xuXG4gICAgICAgICAgICBNb2RhbHMuZ3JvdXBMaW5rcyA9IFtdXG5cbiAgICAgICAgICAgIE1vZGFscy5jdXJyZW50R3JvdXBJdGVtID0gMFxuXG4gICAgICAgICAgICBNb2RhbHMubW9kYWxDb250ZW50LmlubmVySFRNTCA9ICcnXG4gICAgICAgICAgICBcbiAgICAgICAgICAgIEJvZHlTY3JvbGxMb2NrLmVuYWJsZUJvZHlTY3JvbGwoTW9kYWxzLnBsb3RNb2RhbClcblxuICAgICAgICAgICAgTW9kYWxzLmlzT3BlbiA9IGZhbHNlXG4gICAgICAgIH1cblxuICAgIH1cblxuICAgIG1vZHVsZS5leHBvcnRzID0gTW9kYWxzXG5cbn0oKSlcbiIsIihmdW5jdGlvbiAoKSB7XG5cbiAgdmFyIFNtb290aDtcblxuICBTbW9vdGggPSB7XG5cbiAgICB0cmFja2VkRWxlbWVudHNPYnNlcnZlciA6IG51bGwsXG4gICAgc3RhbmRhcmRTY3JvbGxGcmFtZXNPYnNlcnZlciA6IG51bGwsXG5cbiAgICBtYWluU2Nyb2xsQW5pbWF0aW9uRnJhbWUgOiBudWxsLFxuXG4gICAgY3VycmVudFBvc2l0aW9uIDogMCxcblxuICAgIG11dGF0aW9uT2JzZXJ2ZXJEZWJvdW5jZSA6IG51bGwsXG5cbiAgICBvblNjcm9sbENhbGxiYWNrVGhyb3R0bGVyIDogbnVsbCxcblxuICAgIGVhc2UgOiAwLjA3LFxuXG4gICAgbGFzdFBvc2l0aW9uIDogMCxcblxuICAgIG9uU2Nyb2xsIDogbnVsbCxcblxuICAgIHN0YW5kYXJkU2Nyb2xsIDogZmFsc2UsXG5cbiAgICBzY3JvbGxFbGVtZW50cyA6IFtdLFxuXG4gICAgdG9wQmFySGVpZ2h0IDogMCxcblxuICAgIHNjcm9sbEZyYW1lcyA6IFtdLFxuXG4gICAgdGlja2luZyA6IGZhbHNlLFxuXG4gICAgZG9tIDoge1xuICAgICAgICAgICAgc2Nyb2xsV2luZG93ICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogZG9jdW1lbnQucXVlcnlTZWxlY3RvcignW2RhdGEtcGxvdC1zbW9vdGgtc2Nyb2xsXScpLFxuICAgICAgICAgICAgc2Nyb2xsRnJhbWVzICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnW2RhdGEtcGxvdC1zbW9vdGgtc2Nyb2xsLWZyYW1lXScpLFxuICAgICAgICAgICAgc2Nyb2xsRWxlbWVudHMgICAgICAgICAgICAgICAgICAgICAgICAgIDogZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnW2RhdGEtcGxvdC1zbW9vdGgtc2Nyb2xsLWVsZW1lbnRdJyksXG4gICAgICAgICAgICB0b3BCYXIgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdbZGF0YS1wbG90LXNtb290aC1zY3JvbGwtdG9wYmFyJylcbiAgICAgICAgICB9LFxuXG4gICAgd2luZG93SGVpZ2h0IDogd2luZG93LmlubmVySGVpZ2h0LCBcblxuICAgIHdpbmRvd1dpZHRoIDogd2luZG93LmlubmVyV2lkdGgsXG5cbiAgICBpbml0OiBzZXR0aW5ncyA9PiB7XG5cbiAgICAgIC8vb3ZlcnJpZGUgYW55IGRlZmF1bHQgc2V0dGluZ3Mgd2l0aCBwYXNzZWQgcGFyYW1ldGVyc1xuICAgICAgU21vb3RoLnNldFNldHRpbmdzKHNldHRpbmdzKVxuXG4gICAgICBpZighU21vb3RoLnN0YW5kYXJkU2Nyb2xsKSB7XG5cbiAgICAgICAgLy9TZXQgb3VyIGN1cnJlbnQgYW5kIGxhc3QgcG9zaXRpb25zIFxuICAgICAgICAvL3RvIHRoZSBjdXJyZW50IHNjcm9sbCBZIHBvc2l0aW9uLCBpbiBjYXNlXG4gICAgICAgIC8vd2UgYXJlIHNjcm9sbGVkIGRvd24gdGhlIHBhZ2Ugb24gbG9hZFxuICAgICAgICBTbW9vdGguY3VycmVudFBvc2l0aW9uICAgID0gd2luZG93LnNjcm9sbFlcbiAgICAgICAgU21vb3RoLmxhc3RQb3NpdGlvbiAgICAgICA9IHdpbmRvdy5zY3JvbGxZXG5cbiAgICAgICAgLy9QdXQgZml4ZWQgb250byB0aGUgd2hvbGUgc2l0ZSByZWFkeSB0byBcbiAgICAgICAgLy9pbnRlcmNlcHQgc2Nyb2xsaW5nXG4gICAgICAgIFNtb290aC5zZXRTdHlsZXMoKVxuXG4gICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdyZXNpemUnLCBTbW9vdGgucmVmcmVzaCwgeyBwYXNzaXZlOiB0cnVlIH0pXG4gICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdzY3JvbGwnLCBTbW9vdGguc2Nyb2xsLCB7IHBhc3NpdmU6IHRydWUgfSlcblxuICAgICAgICAvL1JlYWQgdGhyb3VnaCBlYWNoIHNjcm9sbCBmcmFtZSBhbmQgc2V0IGRhdGFcbiAgICAgICAgLy9pbnRvIGEgc2luZ2xlIGFycmF5IGZvciBwcm9jZXNzaW5nIGxhdGVyXG4gICAgICAgIC8ve1xuICAgICAgICAvLyAgICAgIGVsZW1lbnQgICAgICAgICAgIDogZWxlbWVudCwgICAgICAodGhlIGRvbSBlbGVtZW50KVxuICAgICAgICAvLyAgICAgIHRvcCAgICAgICAgICAgICAgIDogMTAwLCAgICAgICAgICAodGhlIG9mZnNldCB0b3AgdmFsdWUgd2l0aG91dCB0cmFuc2Zvcm1zLCBpbiBwaXhlbHMpXG4gICAgICAgIC8vICAgICAgaGVpZ2h0ICAgICAgICAgICAgOiAzMDAsICAgICAgICAgICh0aGUgaGVpZ2h0IG9mIHRoZSBlbGVtZW50IHdpdGhvdXQgdHJhbnNmb3JtcywgaW4gcGl4ZWxzKVxuICAgICAgICAvLyAgICAgIGJvdHRvbSAgICAgICAgICAgIDogNDAwLCAgICAgICAgICAodGhlIG9mZnNldCBib3R0b20gcG9zaXRpb24gdmFsdWUgd2l0aG91dCB0cmFuc2Zvcm1zLCBpbiBwaXhlbHMpXG4gICAgICAgIC8vICAgICAgc3RpY2t5ICAgICAgICAgICAgOiBmYWxzZSwgICAgICAgIChpZiB0aGUgZWxlbWVudCBzaG91bGQgYmVoYXZlIGxpa2UgQ1NTIHN0aWNreSBvciBub3QpXG4gICAgICAgIC8vICAgICAgcGFyZW50Qm90dG9tICAgICAgOiBmYWxzZSB8fCA1MDAgIChpZiB0aGUgZWxlbWVudCBpcyBzdGlja3ksIHJldHVybiB0aGUgYm90dG9tIHBvc2l0aW9uIG9mIGl0cyBwYXJlbnQgaW4gcGl4ZWxzICh3aGVuIGl0IHNob3VsZCB1bnN0aWNrKSlcbiAgICAgICAgLy8gIH1cbiAgICAgICAgU21vb3RoLnNldFNjcm9sbEZyYW1lRGF0YSgpXG5cbiAgICAgIH1cblxuICAgICAgLy9JZiBhbnkgc2Nyb2xsIGVsZW1lbnRzIGV4aXN0LCB3ZSBjYW4gYWRkIHRoZW0gYW5kIG1vbml0b3IgdGhlbVxuICAgICAgaWYoU21vb3RoLmRvbS5zY3JvbGxFbGVtZW50cykge1xuICAgICAgICAvL1JlYWQgdGhyb3VnaCBlYWNoIHNjcm9sbCBlbGVtZW50IGFuZCBzZXQgZGF0YVxuICAgICAgICAvL2ludG8gYSBzaW5nbGUgYXJyYXkgZm9yIHByb2Nlc3NpbmcgbGF0ZXJcbiAgICAgICAgLy97XG4gICAgICAgIC8vICAgICAgZWxlbWVudCAgICAgICAgIDogZWxlbWVudCwgICAgICAgICAgKHRoZSBkb20gZWxlbWVudClcbiAgICAgICAgLy8gICAgICB0b3AgICAgICAgICAgICAgOiAxMDAsICAgICAgICAgICAgICAodGhlIG9mZnNldCB0b3AgdmFsdWUgd2l0aG91dCB0cmFuc2Zvcm1zLCBpbiBwaXhlbHMpXG4gICAgICAgIC8vICAgICAgaGVpZ2h0ICAgICAgICAgIDogMzAwLCAgICAgICAgICAgICAgKHRoZSBoZWlnaHQgb2YgdGhlIGVsZW1lbnQgd2l0aG91dCB0cmFuc2Zvcm1zLCBpbiBwaXhlbHMpXG4gICAgICAgIC8vICAgICAgYm90dG9tICAgICAgICAgIDogNDAwLCAgICAgICAgICAgICAgKHRoZSBvZmZzZXQgYm90dG9tIHBvc2l0aW9uIHZhbHVlIHdpdGhvdXQgdHJhbnNmb3JtcywgaW4gcGl4ZWxzKVxuICAgICAgICAvLyAgICAgIGlzVmlzaWJsZSAgICAgICA6IGZhbHNlLCAgICAgICAgICAgIChpZiB0aGUgZWxlbWVudCBpcyBjdXJyZW50bHkgaW4gdGhlIHdpbmRvdyBmcmFtZSBvciBub3QpXG4gICAgICAgIC8vICAgICAgaW5pdGlhbE9mZnNldCAgIDogLjIsICAgICAgICAgICAgICAgKGhvdyBmYXIgYXdheSB0aGlzIGVsZW1lbnQgaXMgZnJvbSB0aGUgaW5pdGlhbCBjZW50ZXIgb2YgdGhlIHNjcmVlbilcbiAgICAgICAgLy8gICAgICBjdXJyZW50UG9zaXRpb24gOiAwICAgICAgICAgICAgICAgICAoaG93IGZhciB1cCB0aGUgdmlld3BvcnQgdGhpcyBlbGVtZW50IGN1cnJlbnRseSBpcyAoYmV0d2VlbiAtMSBhbmQgMSkpXG4gICAgICAgIC8vICAgICAgY2FsbGJhY2sgICAgICAgIDogJ2Z1bmN0aW9uLm5hbWUnICAgKHRoZSBuYW1lIG9mIGEgZnVuY3Rpb24geW91IGNhbiBjYWxsIHdoZW4gdGhpcyBtb3ZlcyB3aXRoaW4gdmlldylcbiAgICAgICAgLy8gfVxuICAgICAgICBTbW9vdGgudHJhY2tlZEVsZW1lbnRzT2JzZXJ2ZXIgPSBuZXcgSW50ZXJzZWN0aW9uT2JzZXJ2ZXIoU21vb3RoLnRyYWNrVmlzaWJsZUVsZW1lbnRzLCB7cm9vdE1hcmdpbjogJzIwMHB4Jyx0aHJlc2hvbGQ6IDAuMDF9KVxuICAgICAgICBTbW9vdGguc2V0U2Nyb2xsRWxlbWVudERhdGEoKVxuICAgICAgfVxuXG4gICAgICAvL1NldCB1cCBhIG11dGF0aW9uIG9ic2VydmVyIHRvIGxpc3RlbiBvdXQgZm9yIGNoYW5nZXMgaW4gaGVpZ2h0LFxuICAgICAgLy90byBhZGp1c3Qgb3VyIGhlaWdodCBvZiBkb2N1bWVudCBhY2NvcmRpbmdseVxuICAgICAgU21vb3RoLmluaXRNdXRhdGlvbk9ic2VydmVyKClcblxuICAgICAgLy9JZiB0aGVyZSdzIGEgZml4ZWQgdG9wYmFyIG9uIHRoaXMgc2l0ZSwgd2UgY2FuIHNldCB0aGUgaGVpZ2h0XG4gICAgICAvL2hlcmUsIGluIG9yZGVyIHRvIG9mZnNldCBhbnkgc3RpY2t5IHBvc2l0aW9ucy4gXG4gICAgICBTbW9vdGguc2V0VG9wQmFySGVpZ2h0KClcblxuICAgICAgLy9JZiBpdCdzIG5vdCBzdGFuZGFyZCBzY3JvbGwsIHNldCBvdXIgaW5pdGlhbCBzY3JvbGwgZnJhbWUgcG9zaXRpb25zXG4gICAgICBpZighU21vb3RoLnN0YW5kYXJkU2Nyb2xsKSB7XG4gICAgICAgIFNtb290aC5zZXRQb3NpdGlvbk9mRnJhbWVzKClcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgICBTbW9vdGguc3RhbmRhcmRTY3JvbGxGcmFtZXNPYnNlcnZlciA9IG5ldyBJbnRlcnNlY3Rpb25PYnNlcnZlcihTbW9vdGgudHJhY2tTdGFuZGFyZFNjcm9sbEZyYW1lcywge3Jvb3RNYXJnaW46ICcwcHgnLHRocmVzaG9sZDogMC4wMX0pXG4gICAgICAgICBmb3IobGV0IGZyYW1lIG9mIFNtb290aC5kb20uc2Nyb2xsRnJhbWVzKSB7XG4gICAgICAgICAgICBTbW9vdGguc3RhbmRhcmRTY3JvbGxGcmFtZXNPYnNlcnZlci5vYnNlcnZlKGZyYW1lKVxuICAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICAvL1NldCBvdXIgcG9zaXRpb24gb2YgYW55IHNjcm9sbCBlbGVtZW50c1xuICAgICAgU21vb3RoLnBvc2l0aW9uU2Nyb2xsRWxlbWVudHMoKVxuXG4gICAgfSxcblxuICAgIHNldFNldHRpbmdzIDogc2V0dGluZ3MgPT4ge1xuXG4gICAgICBpZighc2V0dGluZ3MpXG4gICAgICAgIHJldHVybiB0cnVlXG5cbiAgICAgIGlmKHR5cGVvZihzZXR0aW5ncy5vblNjcm9sbCkgPT0gJ2Z1bmN0aW9uJylcbiAgICAgICAgU21vb3RoLm9uU2Nyb2xsID0gc2V0dGluZ3Mub25TY3JvbGxcbiAgICAgIFxuICAgICAgaWYoc2V0dGluZ3Muc3RhbmRhcmRTY3JvbGwgPT0gdHJ1ZSlcbiAgICAgICAgU21vb3RoLnN0YW5kYXJkU2Nyb2xsID0gdHJ1ZVxuXG4gICAgICBpZihzZXR0aW5ncy5lYXNlKSBcbiAgICAgICAgU21vb3RoLmVhc2UgPSBzZXR0aW5ncy5lYXNlXG4gICAgICBcbiAgICB9LFxuXG4gICAgcmV0cmlnZ2VyV2luZG93U2l6ZU9uTXV0YXRlIDogKG11dGF0aW9uc0xpc3QsIG9ic2VydmVyKSA9PiB7IFxuXG4gICAgICBpZighU21vb3RoLm11dGF0aW9uT2JzZXJ2ZXJEZWJvdW5jZSkge1xuXG4gICAgICAgIFNtb290aC5tdXRhdGlvbk9ic2VydmVyRGVib3VuY2UgPSBzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XG5cbiAgICAgICAgICAgIHZhciBjaGFuZ2VkID0gZmFsc2VcblxuICAgICAgICAgICAgU21vb3RoLnNjcm9sbEZyYW1lcy5mb3JFYWNoKGZyYW1lID0+IHtcbiAgICAgICAgICAgICAgICBpZihmcmFtZS5oZWlnaHQgIT0gZnJhbWUuZWxlbWVudC5jbGllbnRIZWlnaHQpXG4gICAgICAgICAgICAgICAgICBjaGFuZ2VkID0gdHJ1ZVxuICAgICAgICAgICAgfSlcblxuICAgICAgICAgICAgaWYoY2hhbmdlZCA9PSB0cnVlKSBcbiAgICAgICAgICAgICAgU21vb3RoLnJlZnJlc2goKVxuICAgICAgICAgICAgXG4gICAgICAgICAgICBjbGVhclRpbWVvdXQoU21vb3RoLm11dGF0aW9uT2JzZXJ2ZXJEZWJvdW5jZSlcbiAgICAgICAgICAgIFNtb290aC5tdXRhdGlvbk9ic2VydmVyRGVib3VuY2UgPSBudWxsXG5cbiAgICAgICAgfSwyMDApXG5cbiAgICAgIH1cblxuICAgIH0sXG5cbiAgICBpbml0TXV0YXRpb25PYnNlcnZlciA6ICgpID0+IHtcblxuICAgICAgZm9yKHZhciBzY3JvbGxGcmFtZSBvZiBTbW9vdGguZG9tLnNjcm9sbEZyYW1lcykge1xuXG4gICAgICAgIGNvbnN0IG9ic2VydmVyID0gbmV3IE11dGF0aW9uT2JzZXJ2ZXIoU21vb3RoLnJldHJpZ2dlcldpbmRvd1NpemVPbk11dGF0ZSlcbiAgICAgICAgb2JzZXJ2ZXIub2JzZXJ2ZShzY3JvbGxGcmFtZSwge1xuICAgICAgICAgIGNoaWxkTGlzdCAgIDogdHJ1ZSxcbiAgICAgICAgICBhdHRyaWJ1dGVzICA6IHRydWUsXG4gICAgICAgICAgc3VidHJlZSAgICAgOiB0cnVlXG4gICAgICAgIH0pXG4gICAgICB9XG5cbiAgICB9LFxuXG4gICAgZGVzdHJveSA6ICgpID0+IHtcblxuICAgICAgU21vb3RoLnNjcm9sbEVsZW1lbnRzLmZvckVhY2goZW50cnkgPT57XG4gICAgICAgIGVudHJ5LmVsZW1lbnQucmVtb3ZlQXR0cmlidXRlKCdzdHlsZScpXG4gICAgICB9KVxuXG4gICAgICBTbW9vdGguc2Nyb2xsRnJhbWVzLmZvckVhY2goZW50cnkgPT57XG4gICAgICAgIGVudHJ5LmVsZW1lbnQucmVtb3ZlQXR0cmlidXRlKCdzdHlsZScpXG4gICAgICB9KVxuXG4gICAgICBTbW9vdGgudHJhY2tlZEVsZW1lbnRzT2JzZXJ2ZXIgPSBudWxsXG4gICAgICBTbW9vdGgubWFpblNjcm9sbEFuaW1hdGlvbkZyYW1lID0gbnVsbFxuICAgICAgU21vb3RoLmN1cnJlbnRQb3NpdGlvbiA9IDBcbiAgICAgIFNtb290aC5tdXRhdGlvbk9ic2VydmVyRGVib3VuY2UgPSBudWxsXG4gICAgICBTbW9vdGgub25TY3JvbGxDYWxsYmFja1Rocm90dGxlciA9IG51bGxcbiAgICAgIFNtb290aC5lYXNlID0gMC4wN1xuICAgICAgU21vb3RoLmxhc3RQb3NpdGlvbiA9IDBcbiAgICAgIFNtb290aC5vblNjcm9sbCA9IG51bGxcbiAgICAgIFNtb290aC5zdGFuZGFyZFNjcm9sbCA9IGZhbHNlXG4gICAgICBTbW9vdGguc2Nyb2xsRWxlbWVudHMgPSBbXVxuICAgICAgU21vb3RoLnRvcEJhckhlaWdodCA9IDBcbiAgICAgIFNtb290aC5zY3JvbGxGcmFtZXMgPSBbXVxuICAgICAgU21vb3RoLnRpY2tpbmcgPSBmYWxzZVxuICAgICAgU21vb3RoLmRvbS5zY3JvbGxXaW5kb3cucmVtb3ZlQXR0cmlidXRlKCdzdHlsZScpXG5cbiAgICB9LFxuXG4gICAgYWRkRWxlbWVudHMgOiAoZWxlbWVudHMpID0+IHtcblxuICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUscmVqZWN0KXtcblxuICAgICAgICAgICAgZWxlbWVudHMuZm9yRWFjaCggZWxlbWVudCA9PiB7ICAgICAgIFxuICAgICAgICAgICAgICAgIFNtb290aC50cmFja2VkRWxlbWVudHNPYnNlcnZlci5vYnNlcnZlKGVsZW1lbnQpXG4gICAgICAgICAgICB9KVxuXG4gICAgICAgICAgICByZXNvbHZlKClcblxuICAgICAgfSlcblxuICAgIH0sXG5cbiAgICBzY3JvbGxUbyA6IChlbGVtZW50KSA9PiB7XG4gICAgICBcbiAgICAgIHdpbmRvdy5zY3JvbGxUbygwLFNtb290aC5leGFjdFBvc2l0aW9uT2ZFbGVtZW50KGVsZW1lbnQpIC0gMTAwKVxuXG4gICAgICBpZihTbW9vdGguc3RhbmRhcmRTY3JvbGwgIT0gZmFsc2UpIHtcbiAgICAgICAgU21vb3RoLnRpY2tpbmcgPSB0cnVlXG4gICAgICAgIFNtb290aC5tYWluU2Nyb2xsQW5pbWF0aW9uRnJhbWUgPSByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoU21vb3RoLnJ1bilcbiAgICAgIH1cbiAgICB9LFxuXG4gICAgc2V0U2Nyb2xsRWxlbWVudERhdGEgOiAoKSA9PiB7XG5cbiAgICAgIFNtb290aC5kb20uc2Nyb2xsRWxlbWVudHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdbZGF0YS1wbG90LXNtb290aC1zY3JvbGwtZWxlbWVudF0nKVxuICAgICAgU21vb3RoLmFkZEVsZW1lbnRzKFNtb290aC5kb20uc2Nyb2xsRWxlbWVudHMpIFxuXG4gICAgICBpZighU21vb3RoLmRvbS5zY3JvbGxFbGVtZW50cylcbiAgICAgICAgcmV0dXJuIGZhbHNlXG5cbiAgICAgIFNtb290aC5zY3JvbGxFbGVtZW50cyA9IFtdXG4gICAgXG4gICAgICBTbW9vdGguZG9tLnNjcm9sbEVsZW1lbnRzLmZvckVhY2goIChlbGVtZW50LGkpID0+IHtcblxuICAgICAgICBjb25zdCBlbGVtZW50VG9wID0gU21vb3RoLmV4YWN0UG9zaXRpb25PZkVsZW1lbnQoZWxlbWVudClcblxuICAgICAgICB2YXIgaGVpZ2h0ID0gZWxlbWVudC5jbGllbnRIZWlnaHRcblxuICAgICAgICB2YXIgY2FsbGJhY2sgID0gZmFsc2UsXG4gICAgICAgICAgICBmcm9tVmFsdWUgPSAtMSxcbiAgICAgICAgICAgIHRvVmFsdWUgICA9IDFcblxuICAgICAgICAvL0lzIGFueXRoaW5nIHNldCBvbiB0aGlzIGVsZW1lbnQgYXMgYSBjYWxsYmFjaz9cbiAgICAgICAgaWYoZWxlbWVudC5kYXRhc2V0LnBsb3RTbW9vdGhTY3JvbGxFbGVtZW50KSB7XG5cbiAgICAgICAgICBsZXQgYyA9IGVsZW1lbnQuZGF0YXNldC5wbG90U21vb3RoU2Nyb2xsRWxlbWVudFxuXG4gICAgICAgICAgLy9GaXJzdCB1cCAtIGhhdmUgdmFsdWVzIGJlZW4gcGFzc2VkIHRvIHRoaXMgY2FsbGJhY2sgaW4gdGhpcyBmb3JtOiBjYWxsYmFjaygyLDUpXG4gICAgICAgICAgbGV0IHZhbHVlcyA9IGMuc3Vic3RyaW5nKCBjLmluZGV4T2YoICcoJyApICsgMSwgYy5pbmRleE9mKCAnKScgKSApXG4gICAgICAgICAgdmFsdWVzID0gdmFsdWVzLnNwbGl0KCcsJylcblxuICAgICAgICAgIC8vVmFsaWQgaWYgd2UgaGF2ZSAyLCBhbmQgZnJvbSBpcyBsZXNzIHRoYXQgdG8gdmFsdWVcbiAgICAgICAgICBpZih2YWx1ZXMubGVuZ3RoID09IDIgJiYgdmFsdWVzWzBdIDwgdmFsdWVzWzFdKSB7XG4gICAgICAgICAgICBmcm9tVmFsdWUgPSBOdW1iZXIodmFsdWVzWzBdKVxuICAgICAgICAgICAgdG9WYWx1ZSA9IE51bWJlcih2YWx1ZXNbMV0pXG4gICAgICAgICAgfVxuXG4gICAgICAgICAgbGV0IHBvdGVudGlhbEZ1bmN0aW9uID0gd2luZG93W2NdXG5cbiAgICAgICAgICBpZiAodHlwZW9mIHBvdGVudGlhbEZ1bmN0aW9uID09PSBcImZ1bmN0aW9uXCIpIHtcblxuICAgICAgICAgICAgY2FsbGJhY2sgPSBwb3RlbnRpYWxGdW5jdGlvbi5yZXBsYWNlKC9cXHMqXFwoLio/XFwpXFxzKi9nLCAnJylcblxuICAgICAgICAgIH1cbiAgICAgICAgICBlbHNlIHtcblxuICAgICAgICAgICAgY29uc3QgY2FsbGJhY2tTcGxpdCA9IGMucmVwbGFjZSgvXFxzKlxcKC4qP1xcKVxccyovZywgJycpLnNwbGl0KCcuJylcblxuICAgICAgICAgICAgaWYoY2FsbGJhY2tTcGxpdC5sZW5ndGggPT0gMikge1xuXG4gICAgICAgICAgICAgIHBvdGVudGlhbEZ1bmN0aW9uID0gd2luZG93W2NhbGxiYWNrU3BsaXRbMF1dW2NhbGxiYWNrU3BsaXRbMV1dXG5cbiAgICAgICAgICAgICAgaWYgKHR5cGVvZiBwb3RlbnRpYWxGdW5jdGlvbiA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgICAgICAgICAgY2FsbGJhY2sgPSBwb3RlbnRpYWxGdW5jdGlvblxuICAgICAgICAgICAgICB9IFxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBpbml0aWFsT2Zmc2V0ID0gMFxuXG4gICAgICAgIGlmKGVsZW1lbnRUb3AgPCBTbW9vdGgud2luZG93SGVpZ2h0KVxuICAgICAgICAgIGluaXRpYWxPZmZzZXQgPSAoZWxlbWVudFRvcCArIGhlaWdodCkgLyAoU21vb3RoLndpbmRvd0hlaWdodCArIGhlaWdodCkgKiAodG9WYWx1ZSAtIGZyb21WYWx1ZSkgKyBmcm9tVmFsdWVcblxuXG4gICAgICAgIFxuICAgICAgICBTbW9vdGguc2Nyb2xsRWxlbWVudHNbaV0gPSB7XG4gICAgICAgICAgICBlbGVtZW50ICAgICAgICAgOiBlbGVtZW50LFxuICAgICAgICAgICAgdG9wICAgICAgICAgICAgIDogZWxlbWVudFRvcCxcbiAgICAgICAgICAgIGhlaWdodCAgICAgICAgICA6IGhlaWdodCxcbiAgICAgICAgICAgIGJvdHRvbSAgICAgICAgICA6IGVsZW1lbnRUb3AgKyBlbGVtZW50LmNsaWVudEhlaWdodCxcbiAgICAgICAgICAgIGlzVmlzaWJsZSAgICAgICA6IGVsZW1lbnRUb3AgPCBTbW9vdGguY3VycmVudFBvc2l0aW9uICsgU21vb3RoLndpbmRvd0hlaWdodCAmJiBlbGVtZW50VG9wICsgaGVpZ2h0ID4gU21vb3RoLmN1cnJlbnRQb3NpdGlvbixcbiAgICAgICAgICAgIGluaXRpYWxPZmZzZXQgICA6IGluaXRpYWxPZmZzZXQsXG4gICAgICAgICAgICBjYWxsYmFjayAgICAgICAgOiBjYWxsYmFjayxcbiAgICAgICAgICAgIGZyb21WYWx1ZSAgICAgICA6IGZyb21WYWx1ZSxcbiAgICAgICAgICAgIHRvVmFsdWUgICAgICAgICA6IHRvVmFsdWUsXG4gICAgICAgICAgICBjdXJyZW50UG9zaXRpb24gOiAwXG4gICAgICAgIH1cblxuICAgICAgICBlbGVtZW50LmRhdGFzZXQucGxvdFNtb290aFNjcm9sbEVsZW1lbnRJZCA9IGlcblxuICAgICAgfSlcblxuXG4gICAgfSxcblxuICAgIHNldFRvcEJhckhlaWdodCA6ICgpID0+IHtcblxuICAgICAgaWYoU21vb3RoLmRvbS50b3BCYXIpXG4gICAgICAgIFNtb290aC50b3BCYXJIZWlnaHQgPSBTbW9vdGguZG9tLnRvcEJhci5jbGllbnRIZWlnaHRcblxuICAgIH0sXG5cbiAgICBzZXRTY3JvbGxGcmFtZURhdGEgOiAoKSA9PiB7XG5cbiAgICAgIFNtb290aC5kb20uc2Nyb2xsRnJhbWVzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnW2RhdGEtcGxvdC1zbW9vdGgtc2Nyb2xsLWZyYW1lXScpXG5cbiAgICAgIFNtb290aC5zY3JvbGxGcmFtZXMgPSBbXVxuICAgICAgdmFyIG5ld0hlaWdodCA9IDBcblxuICAgICAgU21vb3RoLmRvbS5zY3JvbGxGcmFtZXMuZm9yRWFjaCggZWxlbWVudCA9PiB7XG5cbiAgICAgICAgY29uc3QgZWxlbWVudFRvcCA9IFNtb290aC5leGFjdFBvc2l0aW9uT2ZFbGVtZW50KGVsZW1lbnQpXG5cbiAgICAgICAgU21vb3RoLnNjcm9sbEZyYW1lcy5wdXNoKHtcbiAgICAgICAgICAgIGVsZW1lbnQgICAgICAgICAgIDogZWxlbWVudCxcbiAgICAgICAgICAgIHRvcCAgICAgICAgICAgICAgIDogZWxlbWVudFRvcCxcbiAgICAgICAgICAgIGhlaWdodCAgICAgICAgICAgIDogZWxlbWVudC5jbGllbnRIZWlnaHQsXG4gICAgICAgICAgICBib3R0b20gICAgICAgICAgICA6IGVsZW1lbnRUb3AgKyBlbGVtZW50LmNsaWVudEhlaWdodCxcbiAgICAgICAgICAgIHN0aWNreSAgICAgICAgICAgIDogdHlwZW9mKGVsZW1lbnQuZGF0YXNldC5wbG90U21vb3RoU2Nyb2xsU3RpY2t5KSAhPSAndW5kZWZpbmVkJyA/IHRydWUgOiBmYWxzZSwgXG4gICAgICAgICAgICBwYXJlbnRCb3R0b20gICAgICA6IGVsZW1lbnQucGFyZW50RWxlbWVudCA/IFNtb290aC5leGFjdFBvc2l0aW9uT2ZFbGVtZW50KGVsZW1lbnQucGFyZW50RWxlbWVudCkgKyBlbGVtZW50LnBhcmVudEVsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkuaGVpZ2h0IDogZmFsc2VcbiAgICAgICAgfSlcblxuICAgICAgfSlcblxuICAgICAgZG9jdW1lbnQuYm9keS5zdHlsZS5oZWlnaHQgPSBgJHtTbW9vdGguZG9tLnNjcm9sbFdpbmRvdy5zY3JvbGxIZWlnaHR9cHhgXG5cbiAgICB9LFxuXG4gICAgdHJhY2tWaXNpYmxlRWxlbWVudHMgOiAoZW50cmllcykgPT4ge1xuICAgICAgIFxuICAgICAgICBlbnRyaWVzLmZvckVhY2goIGVudHJ5ID0+IHtcblxuICAgICAgICAgIGlmKGVudHJ5LmlzSW50ZXJzZWN0aW5nICYmIGVudHJ5KSB7XG4gICAgICAgICAgICBlbnRyeS50YXJnZXQuY2xhc3NMaXN0LmFkZCgncGxvdFNtb290aFNjcm9sbEluVmlldycsJ3Bsb3RTbW9vdGhTY3JvbGxTZWVuT25jZScpXG4gICAgICAgICAgfVxuICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgZW50cnkudGFyZ2V0LmNsYXNzTGlzdC5yZW1vdmUoJ3Bsb3RTbW9vdGhTY3JvbGxJblZpZXcnKVxuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmKFNtb290aC5zY3JvbGxFbGVtZW50c1tlbnRyeS50YXJnZXQuZGF0YXNldC5wbG90U21vb3RoU2Nyb2xsRWxlbWVudElkXSlcbiAgICAgICAgICAgIFNtb290aC5zY3JvbGxFbGVtZW50c1tlbnRyeS50YXJnZXQuZGF0YXNldC5wbG90U21vb3RoU2Nyb2xsRWxlbWVudElkXS5pc1Zpc2libGUgPSBlbnRyeS5pc0ludGVyc2VjdGluZ1xuXG5cbiAgICAgICAgfSlcbiAgICB9LFxuXG4gICAgdHJhY2tTdGFuZGFyZFNjcm9sbEZyYW1lcyA6IChlbnRyaWVzKSA9PiB7XG4gICAgICAgXG4gICAgICAgIGVudHJpZXMuZm9yRWFjaCggZW50cnkgPT4ge1xuXG4gICAgICAgICAgaWYoZW50cnkuaXNJbnRlcnNlY3RpbmcgJiYgZW50cnkpIHtcbiAgICAgICAgICAgIGVudHJ5LnRhcmdldC5jbGFzc0xpc3QuYWRkKCdwbG90U21vb3RoU2Nyb2xsRnJhbWVJblZpZXcnLCdwbG90U21vb3RoU2Nyb2xsRnJhbWVTZWVuT25jZScpXG4gICAgICAgICAgfVxuICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgZW50cnkudGFyZ2V0LmNsYXNzTGlzdC5yZW1vdmUoJ3Bsb3RTbW9vdGhTY3JvbGxGcmFtZUluVmlldycpXG4gICAgICAgICAgfVxuXG4gICAgICAgIH0pXG4gICAgfSxcblxuICAgIHJlZnJlc2ggOiAoKSA9PiB7XG4gICAgICBpZihTbW9vdGguc3RhbmRhcmRTY3JvbGwpXG4gICAgICAgIHJldHVybiB0cnVlXG4gICAgICBcbiAgICAgIFNtb290aC53aW5kb3dIZWlnaHQgPSB3aW5kb3cuaW5uZXJIZWlnaHRcbiAgICAgIFNtb290aC53aW5kb3dXaWR0aCA9IHdpbmRvdy5pbm5lcldpZHRoXG4gICAgICBTbW9vdGguc2V0U2Nyb2xsRWxlbWVudERhdGEoKVxuICAgICAgU21vb3RoLnNldFNjcm9sbEZyYW1lRGF0YSgpXG4gICAgICBTbW9vdGguc2V0VG9wQmFySGVpZ2h0KClcbiAgICAgIFNtb290aC5zY3JvbGwoKVxuICAgIH0sXG5cbiAgICBydW4gOiAoKSA9PiB7XG5cbiAgICAgIFNtb290aC5sYXN0UG9zaXRpb24gPSBTbW9vdGgubGVycChTbW9vdGgubGFzdFBvc2l0aW9uLCBTbW9vdGguY3VycmVudFBvc2l0aW9uLCBTbW9vdGguZWFzZSlcblxuICAgICAgaWYgKFNtb290aC5sYXN0UG9zaXRpb24gPCAuMSlcbiAgICAgICAgU21vb3RoLmxhc3RQb3NpdGlvbiA9IDBcbiAgICAgXG4gICAgICBsZXQgZGlmZiA9IFNtb290aC5jdXJyZW50UG9zaXRpb24gLSBTbW9vdGgubGFzdFBvc2l0aW9uXG5cbiAgICAgIGlmKE1hdGguYWJzKGRpZmYpIDwgMC41KSB7XG4gICAgICAgIFNtb290aC50aWNraW5nID0gZmFsc2VcbiAgICAgICAgZGlmZiA9IDBcbiAgICAgIH1cblxuICAgICAgdmFyIHZlbG9jaXR5ID0gZGlmZiAvIFNtb290aC53aW5kb3dXaWR0aFxuXG4gICAgICBTbW9vdGguc2V0UG9zaXRpb25PZkZyYW1lcygpXG5cbiAgICAgIFNtb290aC5maXJlT25TY3JvbGxFdmVudCh2ZWxvY2l0eSlcblxuICAgICAgU21vb3RoLnBvc2l0aW9uU2Nyb2xsRWxlbWVudHMoKVxuXG4gICAgICBpZihTbW9vdGgudGlja2luZyA9PSB0cnVlKVxuICAgICAgICBTbW9vdGgubWFpblNjcm9sbEFuaW1hdGlvbkZyYW1lID0gcmVxdWVzdEFuaW1hdGlvbkZyYW1lKFNtb290aC5ydW4pXG4gICAgICBcblxuICAgIH0sXG5cbiAgICBwb3NpdGlvblNjcm9sbEVsZW1lbnRzIDogKCkgPT4ge1xuXG4gICAgICBTbW9vdGguc2Nyb2xsRWxlbWVudHMuZm9yRWFjaChlbnRyeSA9PiB7XG5cbiAgICAgICAgICBpZihlbnRyeS5pc1Zpc2libGUgPT0gdHJ1ZSAmJiBlbnRyeS5jYWxsYmFjaykge1xuXG4gICAgICAgICAgICBjb25zdCBjdXJyZW50UG9zaXRpb24gPSAoZW50cnkudG9wIC0gU21vb3RoLmxhc3RQb3NpdGlvbiArIGVudHJ5LmhlaWdodCkgLyAoU21vb3RoLndpbmRvd0hlaWdodCArIGVudHJ5LmhlaWdodCkgKiAoZW50cnkudG9WYWx1ZSAtIGVudHJ5LmZyb21WYWx1ZSkgKyBlbnRyeS5mcm9tVmFsdWUgLSBlbnRyeS5pbml0aWFsT2Zmc2V0XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGlmKGVudHJ5LmN1cnJlbnRQb3NpdGlvbiAhPSBjdXJyZW50UG9zaXRpb24pIHtcblxuICAgICAgICAgICAgICBlbnRyeS5jdXJyZW50UG9zaXRpb24gPSBjdXJyZW50UG9zaXRpb25cblxuICAgICAgICAgICAgICBlbnRyeS5jYWxsYmFjayhlbnRyeS5lbGVtZW50LGN1cnJlbnRQb3NpdGlvbilcblxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgfVxuICAgICAgICBcblxuICAgICAgICB9KVxuXG4gICAgfSxcblxuICAgIGZpcmVPblNjcm9sbEV2ZW50IDogKHZlbG9jaXR5KSA9PiB7XG5cbiAgICAgIGlmKHR5cGVvZihTbW9vdGgub25TY3JvbGwpID09ICdmdW5jdGlvbicpXG4gICAgICAgICAgICAgIFxuICAgICAgICBpZihTbW9vdGgub25TY3JvbGxDYWxsYmFja1Rocm90dGxlciA9PT0gbnVsbCkge1xuXG4gICAgICAgICAgU21vb3RoLm9uU2Nyb2xsQ2FsbGJhY2tUaHJvdHRsZXIgPSBzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XG5cbiAgICAgICAgICAgIFNtb290aC5vblNjcm9sbChTbW9vdGguZG9tLnNjcm9sbEZyYW1lcyx2ZWxvY2l0eSlcbiAgICAgICAgICAgIFNtb290aC5vblNjcm9sbENhbGxiYWNrVGhyb3R0bGVyID0gbnVsbFxuXG4gICAgICAgICAgfSw1MClcblxuICAgICAgICB9XG5cbiAgICB9LFxuXG4gICAgc2V0UG9zaXRpb25PZkZyYW1lcyA6ICgpID0+IHtcblxuICAgICAgZm9yKHZhciBzY3JvbGxGcmFtZSBvZiBTbW9vdGguc2Nyb2xsRnJhbWVzKSB7XG5cbiAgICAgICAgICB2YXIgd2luZG93U2Nyb2xsUG9zaXRpb24gPSBTbW9vdGgubGFzdFBvc2l0aW9uXG5cbiAgICAgICAgICBpZihzY3JvbGxGcmFtZS5zdGlja3kgJiYgc2Nyb2xsRnJhbWUucGFyZW50Qm90dG9tKSB7XG4gICAgICAgICAgICB3aW5kb3dTY3JvbGxQb3NpdGlvbiA9IFNtb290aC5jYWxjUG9zaXRpb25PZlN0aWNreUVsZW1lbnQoc2Nyb2xsRnJhbWUsIHdpbmRvd1Njcm9sbFBvc2l0aW9uKVxuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmKHdpbmRvd1Njcm9sbFBvc2l0aW9uID4gc2Nyb2xsRnJhbWUuYm90dG9tIHx8IHdpbmRvd1Njcm9sbFBvc2l0aW9uICsgU21vb3RoLndpbmRvd0hlaWdodCA8IHNjcm9sbEZyYW1lLnRvcCkge1xuICAgICAgICAgICAgc2Nyb2xsRnJhbWUuZWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKCdwbG90U21vb3RoU2Nyb2xsRnJhbWVJblZpZXcnKVxuICAgICAgICAgICAgXG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHNjcm9sbEZyYW1lLmVsZW1lbnQuY2xhc3NMaXN0LmFkZCgncGxvdFNtb290aFNjcm9sbEZyYW1lSW5WaWV3JywncGxvdFNtb290aFNjcm9sbEZyYW1lU2Vlbk9uY2UnKVxuICAgICAgICAgICAgc2Nyb2xsRnJhbWUuZWxlbWVudC5zdHlsZS50cmFuc2Zvcm0gPSBgdHJhbnNsYXRlM2QoMCwgLSR7d2luZG93U2Nyb2xsUG9zaXRpb259cHgsIDApYFxuICAgICAgICAgIH1cblxuICAgICAgICB9XG5cbiAgICB9LFxuXG4gICAgc2Nyb2xsIDogKCkgPT4ge1xuICAgICAgU21vb3RoLmN1cnJlbnRQb3NpdGlvbiA9IHdpbmRvdy5zY3JvbGxZXG4gICAgICBpZihTbW9vdGgudGlja2luZyA9PSBmYWxzZSkge1xuICAgICAgICBTbW9vdGgudGlja2luZyA9IHRydWVcbiAgICAgICAgU21vb3RoLm1haW5TY3JvbGxBbmltYXRpb25GcmFtZSA9IHJlcXVlc3RBbmltYXRpb25GcmFtZShTbW9vdGgucnVuKSBcbiAgICAgIH1cbiAgICB9LFxuXG4gICAgc2V0U3R5bGVzIDogKCkgPT4ge1xuXG4gICAgICBPYmplY3QuYXNzaWduKFNtb290aC5kb20uc2Nyb2xsV2luZG93LnN0eWxlLHtcbiAgICAgICAgcG9zaXRpb24gIDogJ2ZpeGVkJyxcbiAgICAgICAgdG9wICAgICAgIDogMCxcbiAgICAgICAgbGVmdCAgICAgIDogMCxcbiAgICAgICAgaGVpZ2h0ICAgIDogJzEwMCUnLFxuICAgICAgICB3aWR0aCAgICAgOiAnMTAwJScsXG4gICAgICAgIG92ZXJmbG93ICA6ICdoaWRkZW4nXG4gICAgICB9KVxuXG4gICAgfSxcblxuICAgIGNhbGNQb3NpdGlvbk9mU3RpY2t5RWxlbWVudCA6IChlbnRyeSwgcG9zaXRpb24pID0+IHtcblxuICAgICAgLy9JZiB0aGUgaXRlbSBpcyBiZWxvdyB0aGUgYm90dG9tIG9mIGl0J3MgcGFyZW50XG4gICAgICBpZihwb3NpdGlvbiArIFNtb290aC50b3BCYXJIZWlnaHQgPj0gZW50cnkucGFyZW50Qm90dG9tKVxuICAgICAgICByZXR1cm4gcG9zaXRpb25cbiAgICAgIFxuXG4gICAgICBpZihlbnRyeS5wYXJlbnRCb3R0b20gLSBwb3NpdGlvbiAtIFNtb290aC50b3BCYXJIZWlnaHQgPD0gZW50cnkuaGVpZ2h0KSB7XG4gICAgICAgIHJldHVybiBlbnRyeS50b3AgLSBlbnRyeS5wYXJlbnRCb3R0b20gKyBwb3NpdGlvbiArIGVudHJ5LmhlaWdodFxuICAgICAgfVxuXG4gICAgICBpZihwb3NpdGlvbiArIFNtb290aC50b3BCYXJIZWlnaHQgPiBlbnRyeS50b3ApIFxuICAgICAgICByZXR1cm4gZW50cnkudG9wIC0gU21vb3RoLnRvcEJhckhlaWdodCAgIFxuXG5cbiAgICAgIHJldHVybiBwb3NpdGlvblxuXG4gICAgfSxcblxuICAgIGxlcnA6IChhLGIsbikgPT4gIHtcblxuICAgICAgICByZXR1cm4gKDEgLSBuKSAqIGEgKyBuICogYlxuXG4gICAgfSxcblxuICAgIGV4YWN0UG9zaXRpb25PZkVsZW1lbnQgOiAoZWxlbWVudCkgPT4ge1xuICAgICAgdmFyIGVsID0gZWxlbWVudCxcbiAgICAgIG9mZnNldFRvcCAgPSAwO1xuXG4gICAgICBkb3tcbiAgICAgICAgICBvZmZzZXRUb3AgICs9IGVsLm9mZnNldFRvcDtcblxuICAgICAgICAgIGVsID0gZWwub2Zmc2V0UGFyZW50O1xuICAgICAgfSB3aGlsZSggZWwgKTtcblxuICAgICAgcmV0dXJuIG9mZnNldFRvcFxuXG4gICAgfVxuXG4gIH1cblxuICBtb2R1bGUuZXhwb3J0cyA9IFNtb290aFxuXG59KCkpIiwiKGZ1bmN0aW9uICgpIHtcblxuICAgIHZhciBCb2R5U2Nyb2xsTG9jayAgID0gcmVxdWlyZSgnYm9keS1zY3JvbGwtbG9jaycpLFxuICAgICAgICBMYXp5TG9hZCAgICAgICAgID0gcmVxdWlyZSgnLi9sYXp5bG9hZCcpLFxuICAgICAgICBTeW5jU2Nyb2xsICAgICAgID0gcmVxdWlyZSgnLi9zeW5jc2Nyb2xsJyksIFxuICAgICAgICBQbG90XG5cbiAgICBQbG90ID0ge1xuXG4gICAgICAgIGluaXQ6ICgpID0+IHtcblxuICAgICAgICAgICAgUGxvdC5jcmVhdGVMaXN0ZW5lcnMoKVxuICAgICAgICAgICAgU3luY1Njcm9sbC5pbml0KCkgXG4gICAgICAgICAgICBQbG90LmFuaW1hdGVCYW5uZXJOb3RpZmljYXRpb25zKCkgXG5cbiAgICAgICAgfSxcblxuICAgICAgICBjcmVhdGVMaXN0ZW5lcnM6ICgpID0+IHtcblxuICAgICAgICAgICBcdGNvbnN0IGJ1cmdlck1lbnVUcmlnZ2VycyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5KUy0tbWVudVRyaWdnZXInKVxuICAgICAgICAgICAgXG4gICAgICAgICAgICBpZihidXJnZXJNZW51VHJpZ2dlcnMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgIGZvcih2YXIgYnVyZ2VyTWVudVRyaWdnZXIgb2YgYnVyZ2VyTWVudVRyaWdnZXJzKSB7XG4gICAgICAgICAgICAgICAgICAgIGJ1cmdlck1lbnVUcmlnZ2VyLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJyxQbG90LnRvZ2dsZUJ1cmdlcilcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGNvbnN0IHNpZGVTd2lwZXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcucGxvdFNpZGVTd2lwZXMnKVxuXG4gICAgICAgICAgICBpZihzaWRlU3dpcGVzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICBQbG90LnNpZGVTd2lwZXMoc2lkZVN3aXBlcylcbiAgICAgICAgICAgIH1cblxuICAgICAgICB9LFxuXG4gICAgICAgIGFuaW1hdGVCYW5uZXJOb3RpZmljYXRpb25zIDogKCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgYmFubmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLkpTLS1iYW5uZXJOb3RpZmljYXRpb24nKVxuXG4gICAgICAgICAgICBpZihiYW5uZXIpXG4gICAgICAgICAgICAgICAgaWYoYmFubmVyLmRhdGFzZXQuYW5pbWF0aW9uVHlwZSA9PSAnYWx3YXlzJykge1xuICAgICAgICAgICAgICAgICAgICBQbG90LmJ1aWxkQmFubmVyUmVwZWF0aW5nVGV4dChiYW5uZXIpXG4gICAgICAgICAgICAgICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdyZXNpemUnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIFBsb3QuYnVpbGRCYW5uZXJSZXBlYXRpbmdUZXh0KGJhbm5lcilcbiAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBQbG90LmNoZWNrVG9TZWVJZldlTmVlZFRvQW5pbWF0aW9uQmFubmVyKGJhbm5lcilcbiAgICAgICAgICAgICAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgUGxvdC5jaGVja1RvU2VlSWZXZU5lZWRUb0FuaW1hdGlvbkJhbm5lcihiYW5uZXIpXG4gICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICB9LFxuXG4gICAgICAgIGNoZWNrVG9TZWVJZldlTmVlZFRvQW5pbWF0aW9uQmFubmVyIDogYmFubmVyID0+IHtcblxuICAgICAgICAgICAgYmFubmVyLmlubmVySFRNTCA9IGA8ZGl2PiR7YmFubmVyLmRhdGFzZXQubWVzc2FnZX08L2Rpdj5gXG4gICAgICAgICAgICBjb25zdCBkaXYxID0gYmFubmVyLnF1ZXJ5U2VsZWN0b3IoJ2RpdjpudGgtb2YtdHlwZSgxKScpXG4gICAgICAgICAgICBjb25zdCB3aW5kb3dXaWR0aCA9IHdpbmRvdy5pbm5lcldpZHRoXG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGlmKGRpdjEuc2Nyb2xsV2lkdGggPiB3aW5kb3dXaWR0aCkge1xuICAgICAgICAgICAgICAgIGJhbm5lci5jbGFzc0xpc3QuYWRkKCd3aXRoQW5pbWF0aW9uJylcbiAgICAgICAgICAgICAgICBQbG90LmJ1aWxkQmFubmVyUmVwZWF0aW5nVGV4dChiYW5uZXIpXG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICBiYW5uZXIuY2xhc3NMaXN0LnJlbW92ZSgnd2l0aEFuaW1hdGlvbicpXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfSxcblxuICAgICAgICBidWlsZEJhbm5lclJlcGVhdGluZ1RleHQgOiBiYW5uZXIgPT4ge1xuXG4gICAgICAgICAgICBiYW5uZXIuaW5uZXJIVE1MID0gYDxkaXY+JHtiYW5uZXIuZGF0YXNldC5tZXNzYWdlfTwvZGl2PjxkaXY+JHtiYW5uZXIuZGF0YXNldC5tZXNzYWdlfTwvZGl2PmBcbiAgICAgICAgICAgIGNvbnN0IGRpdjEgPSBiYW5uZXIucXVlcnlTZWxlY3RvcignZGl2Om50aC1vZi10eXBlKDEpJylcbiAgICAgICAgICAgIGNvbnN0IGRpdjIgPSBiYW5uZXIucXVlcnlTZWxlY3RvcignZGl2Om50aC1vZi10eXBlKDIpJylcbiAgICAgICAgICAgIGNvbnN0IHdpbmRvd1dpZHRoID0gd2luZG93LmlubmVyV2lkdGhcblxuICAgICAgICAgICAgZGl2MS5zdHlsZS5hbmltYXRpb25EdXJhdGlvbj0od2luZG93V2lkdGgvMjApK1wic1wiXG4gICAgICAgICAgICBkaXYyLnN0eWxlLmFuaW1hdGlvbkR1cmF0aW9uPSh3aW5kb3dXaWR0aC8yMCkrXCJzXCJcblxuICAgICAgICAgICAgdmFyIGkgID0gMFxuXG4gICAgICAgICAgICB3aGlsZShkaXYxLnNjcm9sbFdpZHRoIDwgd2luZG93V2lkdGggJiYgaSA8IDEwMCkge1xuICAgICAgICAgICAgICAgIGRpdjEuaW5uZXJIVE1MID0gZGl2MS5pbm5lckhUTUwgKyBgICR7YmFubmVyLmRhdGFzZXQubWVzc2FnZX1gXG4gICAgICAgICAgICAgICAgZGl2Mi5pbm5lckhUTUwgPSBkaXYyLmlubmVySFRNTCArIGAgJHtiYW5uZXIuZGF0YXNldC5tZXNzYWdlfWBcbiAgICAgICAgICAgICAgICBpKys7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfSxcblxuICAgICAgICBzaWRlU3dpcGVzIDogKHNpZGVTd2lwZXMpID0+IHtcblxuICAgICAgICAgICAgZm9yKHZhciBzaWRlU3dpcGUgb2Ygc2lkZVN3aXBlcykge1xuXG4gICAgICAgICAgICAgICAgIGlmKHBhcnNlSW50KHNpZGVTd2lwZS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS53aWR0aCkgKyAxIDwgcGFyc2VJbnQoc2lkZVN3aXBlLnNjcm9sbFdpZHRoKSkge1xuXG5cbiAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfSxcblxuICAgICAgICB0b2dnbGVCdXJnZXIgOiAoKSA9PiB7XG5cbiAgICAgICAgICAgIGNvbnN0IGJ1cmdlck1lbnUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuSlMtLWJ1cmdlck1lbnUnKVxuXG4gICAgICAgICAgICBpZighZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsYXNzTGlzdC5jb250YWlucygnYnVyZ2VyT3BlbicpKSB7XG4gICAgICAgICAgICAgICAgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsYXNzTGlzdC5hZGQoJ2J1cmdlck9wZW4nKVxuICAgICAgICAgICAgICAgIEJvZHlTY3JvbGxMb2NrLmRpc2FibGVCb2R5U2Nyb2xsKGJ1cmdlck1lbnUpXG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKCdidXJnZXJPcGVuJylcbiAgICAgICAgICAgICAgICBCb2R5U2Nyb2xsTG9jay5lbmFibGVCb2R5U2Nyb2xsKGJ1cmdlck1lbnUpXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfSxcblxuICAgICAgICBpc1BhZ2UgOiBzbHVnID0+IHtcblxuICAgICAgICAgICAgcmV0dXJuIGRvY3VtZW50LmJvZHkuY2xhc3NMaXN0LmNvbnRhaW5zKCdwYWdlLScrc2x1ZylcblxuICAgICAgICB9LFxuXG4gICAgICAgIGZpeFZoIDogKCkgPT4ge1xuXG4gICAgICAgICAgICAvLyBGaXJzdCB3ZSBnZXQgdGhlIHZpZXdwb3J0IGhlaWdodCBhbmQgd2UgbXVsdGlwbGUgaXQgYnkgMSUgdG8gZ2V0IGEgdmFsdWUgZm9yIGEgdmggdW5pdFxuICAgICAgICAgICAgbGV0IHZoID0gd2luZG93LmlubmVySGVpZ2h0ICogMC4wMVxuICAgICAgICAgICAgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnN0eWxlLnNldFByb3BlcnR5KCctLXZoJywgYCR7dmh9cHhgKVxuXG5cbiAgICAgICAgfSxcblxuICAgICAgICBpc1RvdWNoRGV2aWNlOiAoKSA9PiB7XG5cbiAgICAgICAgICAgIHZhciBwcmVmaXhlcyA9ICcgLXdlYmtpdC0gLW1vei0gLW8tIC1tcy0gJy5zcGxpdCgnICcpXG4gICAgICAgICAgICB2YXIgbXEgPSBmdW5jdGlvbiAocXVlcnkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gd2luZG93Lm1hdGNoTWVkaWEocXVlcnkpLm1hdGNoZXNcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKCgnb250b3VjaHN0YXJ0JyBpbiB3aW5kb3cpIHx8IHdpbmRvdy5Eb2N1bWVudFRvdWNoICYmIGRvY3VtZW50IGluc3RhbmNlb2YgRG9jdW1lbnRUb3VjaCkge1xuICAgICAgICAgICAgXHRkb2N1bWVudC5ib2R5LmFkZENsYXNzKCdpc1RvdWNoRGV2aWNlJykgIFxuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHZhciBxdWVyeSA9IFsnKCcsIHByZWZpeGVzLmpvaW4oJ3RvdWNoLWVuYWJsZWQpLCgnKSwgJ3Bsb3QnLCAnKSddLmpvaW4oJycpXG4gICAgICAgICAgICByZXR1cm4gbXEocXVlcnkpXG4gICAgICAgIH0sXG5cbiAgICAgICAgYXJlV2VBdFRoZVRvcCA6IHNjcm9sbFRvcCA9PiB7XG5cbiAgICAgICAgICAgIGlmKHNjcm9sbFRvcCA+IDApIHtcbiAgICAgICAgICAgICAgICBkb2N1bWVudC5ib2R5LmNsYXNzTGlzdC5hZGQoJ3Njcm9sbGVkJylcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgZG9jdW1lbnQuYm9keS5jbGFzc0xpc3QucmVtb3ZlKCdzY3JvbGxlZCcpXG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG5cbiAgICAgICAgbG9hZFRlbXBsYXRlUGFydCA6IChhcmdzKSA9PiB7IFxuICAgICAgICAgICAgXG4gICAgICAgICAgICB2YXIgZGVmYXVsdHMgPSB7XG4gICAgICAgICAgICAgICAgdGVtcGxhdGVQYXJ0ICAgIDogbnVsbCxcbiAgICAgICAgICAgICAgICBhY3Rpb24gICAgICAgICAgOiAncGxvdExvYWRUZW1wbGF0ZVBhcnQnLCAvL1RoaXMgaXMgdGhlIGFjdGlvbiBmaXJlZCBpbnRvIG91ciBQbG90U2l0ZSBQSFAgc2V0dXAucGhwIGZpbGVcbiAgICAgICAgICAgICAgICBkYXRhICAgICAgICAgICAgOiB7fSxcbiAgICAgICAgICAgICAgICByZXR1cm5PcldyaXRlICAgOiAnd3JpdGUnLCAvLyh3cml0ZXxyZXR1cm4pIGVpdGhlciBhZGRzIGNvbnRlbnQgdG8gY29udGVudEFyZWEsIG9yIHJldHVybnMgbmV3IEhUTUwgaW4gdGhlIHByb21pc2VcbiAgICAgICAgICAgICAgICBjb250ZW50QXJlYSAgICAgOiAnLkpTLS1hamF4VGFyZ2V0QXJlYScsIFxuICAgICAgICAgICAgICAgIGFwcGVuZCAgICAgICAgICA6IGZhbHNlXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGxldCBzZXR0aW5ncyA9IE9iamVjdC5hc3NpZ24oe30sIGRlZmF1bHRzLCBhcmdzKVxuICAgICAgICAgICAgXG5cbiAgICAgICAgICAgIHRyeSB7IFxuICAgICAgICAgICAgICAgIGlmKHNldHRpbmdzLnJldHVybk9yV3JpdGUgPT0gJ3dyaXRlJylcbiAgICAgICAgICAgICAgICAgICAgdmFyIGNvbnRlbnRBcmVhID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihzZXR0aW5ncy5jb250ZW50QXJlYSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNhdGNoIChlKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ2NvbnRlbnRBcmVhIG5lZWRzIHRvIGJlIGEgdmFsaWQgc2VsZWN0b3IhJylcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2VcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYoY29udGVudEFyZWEgPT0gbnVsbCAmJiBzZXR0aW5ncy5yZXR1cm5PcldyaXRlID09ICd3cml0ZScpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnQ291bGRuXFwndCBmaW5kIHNlbGVjdG9yIGZvciBjb250ZW50QXJlYSBvbiBwYWdlLicpXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmKHNldHRpbmdzLnRlbXBsYXRlUGFydCA9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ0NvdWxkblxcJ3QgZmluZCB0ZW1wbGF0ZSBwYXJ0LiBNYWtlIHN1cmUgeW91IHNldCBvbmUgYXMgdGVtcGxhdGVQYXJ0LCBmb3IgZXhhbXBsZSBwYXJ0cy9hamF4LWNvbnRlbnQnKVxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZih0eXBlb2Yoc2V0dGluZ3MuYXBwZW5kKSAhPT0gXCJib29sZWFuXCIpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnVmFsdWUgcGFzc2VkIHRvIGFwcGVuZCB3YXMgbm90IGEgYm9vbGVhbi4nKVxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZihzZXR0aW5ncy5yZXR1cm5PcldyaXRlID09ICd3cml0ZScpXG4gICAgICAgICAgICAgICAgY29udGVudEFyZWEuY2xhc3NMaXN0LmFkZCgncGxvdExvYWRpbmcnKVxuXG4gICAgICAgICAgICBzZXR0aW5ncy5kYXRhID0ge1xuICAgICAgICAgICAgICAgIGRhdGEgICAgICAgICAgICA6IHNldHRpbmdzLmRhdGEsXG4gICAgICAgICAgICAgICAgYWN0aW9uICAgICAgICAgIDogc2V0dGluZ3MuYWN0aW9uLFxuICAgICAgICAgICAgICAgIHRlbXBsYXRlUGFydCAgICA6IHNldHRpbmdzLnRlbXBsYXRlUGFydFxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB2YXIgcXVlcnlTdHJpbmcgPSBQbG90LnRvUXVlcnlTdHJpbmcoc2V0dGluZ3MuZGF0YSlcbiAgICAgICAgXG4gICAgICAgICAgICByZXR1cm4gZmV0Y2goYXUsIHtcblxuICAgICAgICAgICAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgICAgICAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgICAgICAgICAgICAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWQ7IGNoYXJzZXQ9dXRmLTgnXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBib2R5OiBxdWVyeVN0cmluZyxcbiAgICAgICAgICAgICAgICBjcmVkZW50aWFsczogJ3NhbWUtb3JpZ2luJ1xuXG4gICAgICAgICAgICB9KS50aGVuKGRhdGEgPT4ge1xuXG4gICAgICAgICAgICAgICAgcmV0dXJuIGRhdGEuanNvbigpXG5cbiAgICAgICAgICAgIH0pLnRoZW4ocmVzdWx0ID0+IHtcblxuICAgICAgICAgICAgICAgIGlmKHNldHRpbmdzLnJldHVybk9yV3JpdGUgPT0gJ3dyaXRlJylcbiAgICAgICAgICAgICAgICAgICAgY29udGVudEFyZWEuY2xhc3NMaXN0LnJlbW92ZSgncGxvdExvYWRpbmcnKVxuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIGlmKHJlc3VsdC5zdWNjZXNzKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYoc2V0dGluZ3MucmV0dXJuT3JXcml0ZSAhPT0gJ3dyaXRlJylcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiByZXN1bHQuaHRtbFxuXG4gICAgICAgICAgICAgICAgICAgIGlmKHNldHRpbmdzLmFwcGVuZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29udGVudEFyZWEuaW5zZXJ0QWRqYWNlbnRIVE1MKCdiZWZvcmVlbmQnLCByZXN1bHQuaHRtbClcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlICB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb250ZW50QXJlYS5pbm5lckhUTUwgPSByZXN1bHQuaHRtbFxuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgY29udGVudEFyZWEucXVlcnlTZWxlY3RvckFsbCgnLkpTLS1sYXp5TG9hZCcpLmZvckVhY2goZWwgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgTGF6eUxvYWQub2JzZXJ2ZXIub2JzZXJ2ZShlbClcbiAgICAgICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlc3VsdC5odG1sXG5cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIH0pLmNhdGNoKGVycm9yID0+e1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdlcnJvcicsZXJyb3IpXG5cbiAgICAgICAgICAgIH0pXG5cblxuXG4gICAgICAgIH0sXG5cbiAgICAgICAgZGF0ZUZvcm1hdCA6IChkYXRlLGZvcm1hdCkgPT4ge1xuXG4gICAgICAgICAgICBpZihmb3JtYXQgPT0gJ2RTIE0nKVxuICAgICAgICAgICAgICAgIHJldHVybiBkYXRlLmdldERhdGUoKSArIFBsb3QuZ2V0T3JkaW5hbChkYXRlLmdldERhdGUoKSkgKyAnICcgKyBQbG90LmdldE1vbnRoKGRhdGUpXG5cbiAgICAgICAgICAgIGlmKGZvcm1hdCA9PSAnTSBkUycpXG4gICAgICAgICAgICAgICAgcmV0dXJuIFBsb3QuZ2V0TW9udGgoZGF0ZSkgKyAnICcgKyBkYXRlLmdldERhdGUoKSArIFBsb3QuZ2V0T3JkaW5hbChkYXRlLmdldERhdGUoKSkgXG5cbiAgICAgICAgICAgIGlmKGZvcm1hdCA9PSAnZC9tL3knKVxuICAgICAgICAgICAgICAgIHJldHVybiBkYXRlLmdldERhdGUoKSArICcvJyArIChkYXRlLmdldE1vbnRoKCkgKyAxKSArICcvJyArIGRhdGUuZ2V0RnVsbFllYXIoKS50b1N0cmluZygpLnN1YnN0cigtMilcblxuICAgICAgICAgICAgaWYoZm9ybWF0ID09ICdtL2QveScpXG4gICAgICAgICAgICAgICAgcmV0dXJuIChkYXRlLmdldE1vbnRoKCkgKyAxKSArICcvJyArIGRhdGUuZ2V0RGF0ZSgpICsgJy8nICsgZGF0ZS5nZXRGdWxsWWVhcigpLnRvU3RyaW5nKCkuc3Vic3RyKC0yKVxuXG4gICAgICAgICAgICByZXR1cm4gUGxvdC5nZXREYXlPZldlZWsoZGF0ZSlcbiAgICAgICAgIH0sXG5cbiAgICAgICAgZ2V0RGF5T2ZXZWVrIDogZGF0ZSA9PiB7XG5cbiAgICAgICAgICAgIGNvbnN0IGRheXMgPSBbXG4gICAgICAgICAgICAgICAgJ1N1bmRheScsXG4gICAgICAgICAgICAgICAgJ01vbmRheScsXG4gICAgICAgICAgICAgICAgJ1R1ZXNkYXknLFxuICAgICAgICAgICAgICAgICdXZWRuZXNkYXknLFxuICAgICAgICAgICAgICAgICdUaHVyc2RheScsXG4gICAgICAgICAgICAgICAgJ0ZyaWRheScsXG4gICAgICAgICAgICAgICAgJ1NhdHVyZGF5J1xuICAgICAgICAgICAgXVxuXG4gICAgICAgICAgICByZXR1cm4gZGF5c1tkYXRlLmdldERheSgpXVxuXG4gICAgICAgIH0sXG5cbiAgICAgICAgZ2V0T3JkaW5hbCA6IG51bWJlciA9PiB7XG5cbiAgICAgICAgICAgICAgaWYgKG51bWJlciA+IDMgJiYgbnVtYmVyIDwgMjEpIHJldHVybiAndGgnO1xuICAgICAgICAgICAgICBzd2l0Y2ggKG51bWJlciAlIDEwKSB7XG4gICAgICAgICAgICAgICAgY2FzZSAxOiAgcmV0dXJuIFwic3RcIjtcbiAgICAgICAgICAgICAgICBjYXNlIDI6ICByZXR1cm4gXCJuZFwiO1xuICAgICAgICAgICAgICAgIGNhc2UgMzogIHJldHVybiBcInJkXCI7XG4gICAgICAgICAgICAgICAgZGVmYXVsdDogcmV0dXJuIFwidGhcIjtcbiAgICAgICAgICAgICAgfVxuXG4gICAgICAgIH0sXG5cblxuICAgICAgICBnZXRNb250aCA6IGRhdGUgPT4ge1xuXG4gICAgICAgICAgICBjb25zdCBtb250aE5hbWVzID0gW1wiSmFuXCIsIFwiRmViXCIsIFwiTWFyXCIsIFwiQXByXCIsIFwiTWF5XCIsIFwiSnVuXCIsXG4gICAgICAgICAgICAgIFwiSnVsXCIsIFwiQXVnXCIsIFwiU2VwXCIsIFwiT2N0XCIsIFwiTm92XCIsIFwiRGVjXCJcbiAgICAgICAgICAgIF07XG5cbiAgICAgICAgICAgIHJldHVybiBtb250aE5hbWVzW2RhdGUuZ2V0TW9udGgoKV1cbiAgICAgICAgfSxcblxuICAgICAgICB0b1F1ZXJ5U3RyaW5nIDogKG9iaiwgcHJlZml4KSA9PiB7XG4gICAgICAgICAgICB2YXIgc3RyID0gW10sIGssIHY7XG4gICAgICAgICAgICBmb3IodmFyIHAgaW4gb2JqKSB7XG4gICAgICAgICAgICAgICAgaWYgKCFvYmouaGFzT3duUHJvcGVydHkocCkpIHtjb250aW51ZTt9IC8vIHNraXAgdGhpbmdzIGZyb20gdGhlIHByb3RvdHlwZVxuICAgICAgICAgICAgICAgIGlmICh+cC5pbmRleE9mKCdbJykpIHtcbiAgICAgICAgICAgICAgICAgICAgayA9IHByZWZpeCA/IHByZWZpeCArIFwiW1wiICsgcC5zdWJzdHJpbmcoMCwgcC5pbmRleE9mKCdbJykpICsgXCJdXCIgKyBwLnN1YnN0cmluZyhwLmluZGV4T2YoJ1snKSkgOiBwO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGsgPSBwcmVmaXggPyBwcmVmaXggKyBcIltcIiArIHAgKyBcIl1cIiA6IHA7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHYgPSBvYmpbcF07XG4gICAgICAgICAgICAgICAgc3RyLnB1c2godHlwZW9mIHYgPT0gXCJvYmplY3RcIiA/XG4gICAgICAgICAgICAgICAgICBQbG90LnRvUXVlcnlTdHJpbmcodiwgaykgOlxuICAgICAgICAgICAgICAgICAgZW5jb2RlVVJJQ29tcG9uZW50KGspICsgXCI9XCIgKyBlbmNvZGVVUklDb21wb25lbnQodikpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHN0ci5qb2luKFwiJlwiKTtcbiAgICAgICAgfVxuXG5cbiAgICB9XG5cbiAgICBtb2R1bGUuZXhwb3J0cyA9IFBsb3RcblxufSgpKVxuIiwiKGZ1bmN0aW9uICgpIHtcblxuICAgIHZhciBcbiAgICBTeW5jc2Nyb2xsXG5cbiAgICBTeW5jc2Nyb2xsID0ge1xuXG4gICAgICAgIGluaXQ6ICgpID0+IHtcblxuICAgICAgICAgICAgdmFyIFdpZHRoICAgICAgICAgICA9ICdXaWR0aCcsXG4gICAgICAgICAgICBIZWlnaHQgICAgICAgICAgICAgID0gJ0hlaWdodCcsXG4gICAgICAgICAgICBUb3AgICAgICAgICAgICAgICAgID0gJ1RvcCcsXG4gICAgICAgICAgICBMZWZ0ICAgICAgICAgICAgICAgID0gJ0xlZnQnLFxuICAgICAgICAgICAgc2Nyb2xsICAgICAgICAgICAgICA9ICdzY3JvbGwnLFxuICAgICAgICAgICAgY2xpZW50ICAgICAgICAgICAgICA9ICdjbGllbnQnLFxuICAgICAgICAgICAgRXZlbnRMaXN0ZW5lciAgICAgICA9ICdFdmVudExpc3RlbmVyJyxcbiAgICAgICAgICAgIGFkZEV2ZW50TGlzdGVuZXIgICAgPSAnYWRkJyArIEV2ZW50TGlzdGVuZXIsXG4gICAgICAgICAgICBsZW5ndGggICAgICAgICAgICAgID0gJ2xlbmd0aCcsXG4gICAgICAgICAgICBNYXRoX3JvdW5kICAgICAgICAgID0gTWF0aC5yb3VuZCxcbiAgICAgICAgICAgIG5hbWVzICAgICAgICAgICAgICAgPSB7fSxcbiAgICAgICAgICAgIHJlc2V0ID0gZnVuY3Rpb24oKSB7XG5cbiAgICAgICAgICAgICAgICB2YXIgZWxlbXMgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdzeW5jJytzY3JvbGwpXG5cbiAgICAgICAgICAgICAgICAvLyBjbGVhcmluZyBleGlzdGluZyBsaXN0ZW5lcnNcbiAgICAgICAgICAgICAgICB2YXIgaSwgaiwgZWwsIGZvdW5kLCBuYW1lXG4gICAgICAgICAgICAgICAgZm9yIChuYW1lIGluIG5hbWVzKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChuYW1lcy5oYXNPd25Qcm9wZXJ0eShuYW1lKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgZm9yIChpID0gMDsgaSA8IG5hbWVzW25hbWVdW2xlbmd0aF07IGkrKykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWVzW25hbWVdW2ldWydyZW1vdmUnK0V2ZW50TGlzdGVuZXJdKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzY3JvbGwsIG5hbWVzW25hbWVdW2ldLnN5biwgMFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIC8vIHNldHRpbmctdXAgdGhlIG5ldyBsaXN0ZW5lcnNcbiAgICAgICAgICAgICAgICBmb3IgKGkgPSAwOyBpIDwgZWxlbXNbbGVuZ3RoXTspIHtcbiAgICAgICAgICAgICAgICAgICAgZm91bmQgPSBqID0gMFxuICAgICAgICAgICAgICAgICAgICBlbCA9IGVsZW1zW2krK11cbiAgICAgICAgICAgICAgICAgICAgaWYgKCEobmFtZSA9IGVsLmdldEF0dHJpYnV0ZSgnbmFtZScpKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gbmFtZSBhdHRyaWJ1dGUgaXMgbm90IHNldFxuICAgICAgICAgICAgICAgICAgICAgICAgY29udGludWVcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIGVsID0gZWxbc2Nyb2xsKydlciddfHxlbCAgLy8gbmVlZGVkIGZvciBpbnRlbmNlXG5cbiAgICAgICAgICAgICAgICAgICAgLy8gc2VhcmNoaW5nIGZvciBleGlzdGluZyBlbnRyeSBpbiBhcnJheSBvZiBuYW1lcztcbiAgICAgICAgICAgICAgICAgICAgLy8gc2VhcmNoaW5nIGZvciB0aGUgZWxlbWVudCBpbiB0aGF0IGVudHJ5XG4gICAgICAgICAgICAgICAgICAgIGZvciAoO2ogPCAobmFtZXNbbmFtZV0gPSBuYW1lc1tuYW1lXXx8W10pW2xlbmd0aF07KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBmb3VuZCB8PSBuYW1lc1tuYW1lXVtqKytdID09IGVsXG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICBpZiAoIWZvdW5kKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBuYW1lc1tuYW1lXS5wdXNoKGVsKVxuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgZWwuZVggPSBlbC5lWSA9IDA7XG5cbiAgICAgICAgICAgICAgICAgICAgKGZ1bmN0aW9uKGVsLCBuYW1lKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBlbFthZGRFdmVudExpc3RlbmVyXShcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzY3JvbGwsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZWwuc3luID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBlbGVtcyA9IG5hbWVzW25hbWVdXG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHNjcm9sbFggPSBlbFtzY3JvbGwrTGVmdF1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHNjcm9sbFkgPSBlbFtzY3JvbGwrVG9wXVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciB4UmF0ZSA9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzY3JvbGxYIC9cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIChlbFtzY3JvbGwrV2lkdGhdIC0gZWxbY2xpZW50K1dpZHRoXSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHlSYXRlID1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNjcm9sbFkgL1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKGVsW3Njcm9sbCtIZWlnaHRdIC0gZWxbY2xpZW50K0hlaWdodF0pXG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHVwZGF0ZVggPSBzY3JvbGxYICE9IGVsLmVYXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciB1cGRhdGVZID0gc2Nyb2xsWSAhPSBlbC5lWVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBvdGhlckVsLCBpID0gMFxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsLmVYID0gc2Nyb2xsWFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbC5lWSA9IHNjcm9sbFlcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3IgKDtpIDwgZWxlbXNbbGVuZ3RoXTspIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG90aGVyRWwgPSBlbGVtc1tpKytdXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAob3RoZXJFbCAhPSBlbCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh1cGRhdGVYICYmXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIE1hdGhfcm91bmQoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvdGhlckVsW3Njcm9sbCtMZWZ0XSAtXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAoc2Nyb2xsWCA9IG90aGVyRWwuZVggPVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIE1hdGhfcm91bmQoeFJhdGUgKlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAob3RoZXJFbFtzY3JvbGwrV2lkdGhdIC1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG90aGVyRWxbY2xpZW50K1dpZHRoXSkpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb3RoZXJFbFtzY3JvbGwrTGVmdF0gPSBzY3JvbGxYXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh1cGRhdGVZICYmXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIE1hdGhfcm91bmQoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvdGhlckVsW3Njcm9sbCtUb3BdIC1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIChzY3JvbGxZID0gb3RoZXJFbC5lWSA9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgTWF0aF9yb3VuZCh5UmF0ZSAqXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIChvdGhlckVsW3Njcm9sbCtIZWlnaHRdIC1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG90aGVyRWxbY2xpZW50K0hlaWdodF0pKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG90aGVyRWxbc2Nyb2xsK1RvcF0gPSBzY3JvbGxZXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSwgMFxuICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICB9KShlbCwgbmFtZSlcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBcbiAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgaWYgKGRvY3VtZW50LnJlYWR5U3RhdGUgPT0gXCJjb21wbGV0ZVwiKSB7XG4gICAgICAgICAgICAgICAgcmVzZXQoKVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB3aW5kb3dbYWRkRXZlbnRMaXN0ZW5lcl0oXCJsb2FkXCIsIHJlc2V0LCAwKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICB9LFxuXG4gICAgfVxuXG4gICAgbW9kdWxlLmV4cG9ydHMgPSBTeW5jc2Nyb2xsXG5cbn0oKSlcbiIsIi8qIVxuICogVW5pZHJhZ2dlciB2Mi4zLjBcbiAqIERyYWdnYWJsZSBiYXNlIGNsYXNzXG4gKiBNSVQgbGljZW5zZVxuICovXG5cbi8qanNoaW50IGJyb3dzZXI6IHRydWUsIHVudXNlZDogdHJ1ZSwgdW5kZWY6IHRydWUsIHN0cmljdDogdHJ1ZSAqL1xuXG4oIGZ1bmN0aW9uKCB3aW5kb3csIGZhY3RvcnkgKSB7XG4gIC8vIHVuaXZlcnNhbCBtb2R1bGUgZGVmaW5pdGlvblxuICAvKmpzaGludCBzdHJpY3Q6IGZhbHNlICovIC8qZ2xvYmFscyBkZWZpbmUsIG1vZHVsZSwgcmVxdWlyZSAqL1xuXG4gIGlmICggdHlwZW9mIGRlZmluZSA9PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQgKSB7XG4gICAgLy8gQU1EXG4gICAgZGVmaW5lKCBbXG4gICAgICAndW5pcG9pbnRlci91bmlwb2ludGVyJ1xuICAgIF0sIGZ1bmN0aW9uKCBVbmlwb2ludGVyICkge1xuICAgICAgcmV0dXJuIGZhY3RvcnkoIHdpbmRvdywgVW5pcG9pbnRlciApO1xuICAgIH0pO1xuICB9IGVsc2UgaWYgKCB0eXBlb2YgbW9kdWxlID09ICdvYmplY3QnICYmIG1vZHVsZS5leHBvcnRzICkge1xuICAgIC8vIENvbW1vbkpTXG4gICAgbW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KFxuICAgICAgd2luZG93LFxuICAgICAgcmVxdWlyZSgndW5pcG9pbnRlcicpXG4gICAgKTtcbiAgfSBlbHNlIHtcbiAgICAvLyBicm93c2VyIGdsb2JhbFxuICAgIHdpbmRvdy5VbmlkcmFnZ2VyID0gZmFjdG9yeShcbiAgICAgIHdpbmRvdyxcbiAgICAgIHdpbmRvdy5Vbmlwb2ludGVyXG4gICAgKTtcbiAgfVxuXG59KCB3aW5kb3csIGZ1bmN0aW9uIGZhY3RvcnkoIHdpbmRvdywgVW5pcG9pbnRlciApIHtcblxuJ3VzZSBzdHJpY3QnO1xuXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSBVbmlkcmFnZ2VyIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tIC8vXG5cbmZ1bmN0aW9uIFVuaWRyYWdnZXIoKSB7fVxuXG4vLyBpbmhlcml0IFVuaXBvaW50ZXIgJiBFdkVtaXR0ZXJcbnZhciBwcm90byA9IFVuaWRyYWdnZXIucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZSggVW5pcG9pbnRlci5wcm90b3R5cGUgKTtcblxuLy8gLS0tLS0gYmluZCBzdGFydCAtLS0tLSAvL1xuXG5wcm90by5iaW5kSGFuZGxlcyA9IGZ1bmN0aW9uKCkge1xuICB0aGlzLl9iaW5kSGFuZGxlcyggdHJ1ZSApO1xufTtcblxucHJvdG8udW5iaW5kSGFuZGxlcyA9IGZ1bmN0aW9uKCkge1xuICB0aGlzLl9iaW5kSGFuZGxlcyggZmFsc2UgKTtcbn07XG5cbi8qKlxuICogQWRkIG9yIHJlbW92ZSBzdGFydCBldmVudFxuICogQHBhcmFtIHtCb29sZWFufSBpc0FkZFxuICovXG5wcm90by5fYmluZEhhbmRsZXMgPSBmdW5jdGlvbiggaXNBZGQgKSB7XG4gIC8vIG11bmdlIGlzQWRkLCBkZWZhdWx0IHRvIHRydWVcbiAgaXNBZGQgPSBpc0FkZCA9PT0gdW5kZWZpbmVkID8gdHJ1ZSA6IGlzQWRkO1xuICAvLyBiaW5kIGVhY2ggaGFuZGxlXG4gIHZhciBiaW5kTWV0aG9kID0gaXNBZGQgPyAnYWRkRXZlbnRMaXN0ZW5lcicgOiAncmVtb3ZlRXZlbnRMaXN0ZW5lcic7XG4gIHZhciB0b3VjaEFjdGlvbiA9IGlzQWRkID8gdGhpcy5fdG91Y2hBY3Rpb25WYWx1ZSA6ICcnO1xuICBmb3IgKCB2YXIgaT0wOyBpIDwgdGhpcy5oYW5kbGVzLmxlbmd0aDsgaSsrICkge1xuICAgIHZhciBoYW5kbGUgPSB0aGlzLmhhbmRsZXNbaV07XG4gICAgdGhpcy5fYmluZFN0YXJ0RXZlbnQoIGhhbmRsZSwgaXNBZGQgKTtcbiAgICBoYW5kbGVbIGJpbmRNZXRob2QgXSggJ2NsaWNrJywgdGhpcyApO1xuICAgIC8vIHRvdWNoLWFjdGlvbjogbm9uZSB0byBvdmVycmlkZSBicm93c2VyIHRvdWNoIGdlc3R1cmVzLiBtZXRhZml6enkvZmxpY2tpdHkjNTQwXG4gICAgaWYgKCB3aW5kb3cuUG9pbnRlckV2ZW50ICkge1xuICAgICAgaGFuZGxlLnN0eWxlLnRvdWNoQWN0aW9uID0gdG91Y2hBY3Rpb247XG4gICAgfVxuICB9XG59O1xuXG4vLyBwcm90b3R5cGUgc28gaXQgY2FuIGJlIG92ZXJ3cml0ZWFibGUgYnkgRmxpY2tpdHlcbnByb3RvLl90b3VjaEFjdGlvblZhbHVlID0gJ25vbmUnO1xuXG4vLyAtLS0tLSBzdGFydCBldmVudCAtLS0tLSAvL1xuXG4vKipcbiAqIHBvaW50ZXIgc3RhcnRcbiAqIEBwYXJhbSB7RXZlbnR9IGV2ZW50XG4gKiBAcGFyYW0ge0V2ZW50IG9yIFRvdWNofSBwb2ludGVyXG4gKi9cbnByb3RvLnBvaW50ZXJEb3duID0gZnVuY3Rpb24oIGV2ZW50LCBwb2ludGVyICkge1xuICB2YXIgaXNPa2F5ID0gdGhpcy5va2F5UG9pbnRlckRvd24oIGV2ZW50ICk7XG4gIGlmICggIWlzT2theSApIHtcbiAgICByZXR1cm47XG4gIH1cbiAgLy8gdHJhY2sgc3RhcnQgZXZlbnQgcG9zaXRpb25cbiAgdGhpcy5wb2ludGVyRG93blBvaW50ZXIgPSBwb2ludGVyO1xuXG4gIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gIHRoaXMucG9pbnRlckRvd25CbHVyKCk7XG4gIC8vIGJpbmQgbW92ZSBhbmQgZW5kIGV2ZW50c1xuICB0aGlzLl9iaW5kUG9zdFN0YXJ0RXZlbnRzKCBldmVudCApO1xuICB0aGlzLmVtaXRFdmVudCggJ3BvaW50ZXJEb3duJywgWyBldmVudCwgcG9pbnRlciBdICk7XG59O1xuXG4vLyBub2RlcyB0aGF0IGhhdmUgdGV4dCBmaWVsZHNcbnZhciBjdXJzb3JOb2RlcyA9IHtcbiAgVEVYVEFSRUE6IHRydWUsXG4gIElOUFVUOiB0cnVlLFxuICBTRUxFQ1Q6IHRydWUsXG4gIE9QVElPTjogdHJ1ZSxcbn07XG5cbi8vIGlucHV0IHR5cGVzIHRoYXQgZG8gbm90IGhhdmUgdGV4dCBmaWVsZHNcbnZhciBjbGlja1R5cGVzID0ge1xuICByYWRpbzogdHJ1ZSxcbiAgY2hlY2tib3g6IHRydWUsXG4gIGJ1dHRvbjogdHJ1ZSxcbiAgc3VibWl0OiB0cnVlLFxuICBpbWFnZTogdHJ1ZSxcbiAgZmlsZTogdHJ1ZSxcbn07XG5cbi8vIGRpc21pc3MgaW5wdXRzIHdpdGggdGV4dCBmaWVsZHMuIGZsaWNraXR5IzQwMywgZmxpY2tpdHkjNDA0XG5wcm90by5va2F5UG9pbnRlckRvd24gPSBmdW5jdGlvbiggZXZlbnQgKSB7XG4gIHZhciBpc0N1cnNvck5vZGUgPSBjdXJzb3JOb2Rlc1sgZXZlbnQudGFyZ2V0Lm5vZGVOYW1lIF07XG4gIHZhciBpc0NsaWNrVHlwZSA9IGNsaWNrVHlwZXNbIGV2ZW50LnRhcmdldC50eXBlIF07XG4gIHZhciBpc09rYXkgPSAhaXNDdXJzb3JOb2RlIHx8IGlzQ2xpY2tUeXBlO1xuICBpZiAoICFpc09rYXkgKSB7XG4gICAgdGhpcy5fcG9pbnRlclJlc2V0KCk7XG4gIH1cbiAgcmV0dXJuIGlzT2theTtcbn07XG5cbi8vIGtsdWRnZSB0byBibHVyIHByZXZpb3VzbHkgZm9jdXNlZCBpbnB1dFxucHJvdG8ucG9pbnRlckRvd25CbHVyID0gZnVuY3Rpb24oKSB7XG4gIHZhciBmb2N1c2VkID0gZG9jdW1lbnQuYWN0aXZlRWxlbWVudDtcbiAgLy8gZG8gbm90IGJsdXIgYm9keSBmb3IgSUUxMCwgbWV0YWZpenp5L2ZsaWNraXR5IzExN1xuICB2YXIgY2FuQmx1ciA9IGZvY3VzZWQgJiYgZm9jdXNlZC5ibHVyICYmIGZvY3VzZWQgIT0gZG9jdW1lbnQuYm9keTtcbiAgaWYgKCBjYW5CbHVyICkge1xuICAgIGZvY3VzZWQuYmx1cigpO1xuICB9XG59O1xuXG4vLyAtLS0tLSBtb3ZlIGV2ZW50IC0tLS0tIC8vXG5cbi8qKlxuICogZHJhZyBtb3ZlXG4gKiBAcGFyYW0ge0V2ZW50fSBldmVudFxuICogQHBhcmFtIHtFdmVudCBvciBUb3VjaH0gcG9pbnRlclxuICovXG5wcm90by5wb2ludGVyTW92ZSA9IGZ1bmN0aW9uKCBldmVudCwgcG9pbnRlciApIHtcbiAgdmFyIG1vdmVWZWN0b3IgPSB0aGlzLl9kcmFnUG9pbnRlck1vdmUoIGV2ZW50LCBwb2ludGVyICk7XG4gIHRoaXMuZW1pdEV2ZW50KCAncG9pbnRlck1vdmUnLCBbIGV2ZW50LCBwb2ludGVyLCBtb3ZlVmVjdG9yIF0gKTtcbiAgdGhpcy5fZHJhZ01vdmUoIGV2ZW50LCBwb2ludGVyLCBtb3ZlVmVjdG9yICk7XG59O1xuXG4vLyBiYXNlIHBvaW50ZXIgbW92ZSBsb2dpY1xucHJvdG8uX2RyYWdQb2ludGVyTW92ZSA9IGZ1bmN0aW9uKCBldmVudCwgcG9pbnRlciApIHtcbiAgdmFyIG1vdmVWZWN0b3IgPSB7XG4gICAgeDogcG9pbnRlci5wYWdlWCAtIHRoaXMucG9pbnRlckRvd25Qb2ludGVyLnBhZ2VYLFxuICAgIHk6IHBvaW50ZXIucGFnZVkgLSB0aGlzLnBvaW50ZXJEb3duUG9pbnRlci5wYWdlWVxuICB9O1xuICAvLyBzdGFydCBkcmFnIGlmIHBvaW50ZXIgaGFzIG1vdmVkIGZhciBlbm91Z2ggdG8gc3RhcnQgZHJhZ1xuICBpZiAoICF0aGlzLmlzRHJhZ2dpbmcgJiYgdGhpcy5oYXNEcmFnU3RhcnRlZCggbW92ZVZlY3RvciApICkge1xuICAgIHRoaXMuX2RyYWdTdGFydCggZXZlbnQsIHBvaW50ZXIgKTtcbiAgfVxuICByZXR1cm4gbW92ZVZlY3Rvcjtcbn07XG5cbi8vIGNvbmRpdGlvbiBpZiBwb2ludGVyIGhhcyBtb3ZlZCBmYXIgZW5vdWdoIHRvIHN0YXJ0IGRyYWdcbnByb3RvLmhhc0RyYWdTdGFydGVkID0gZnVuY3Rpb24oIG1vdmVWZWN0b3IgKSB7XG4gIHJldHVybiBNYXRoLmFicyggbW92ZVZlY3Rvci54ICkgPiAzIHx8IE1hdGguYWJzKCBtb3ZlVmVjdG9yLnkgKSA+IDM7XG59O1xuXG4vLyAtLS0tLSBlbmQgZXZlbnQgLS0tLS0gLy9cblxuLyoqXG4gKiBwb2ludGVyIHVwXG4gKiBAcGFyYW0ge0V2ZW50fSBldmVudFxuICogQHBhcmFtIHtFdmVudCBvciBUb3VjaH0gcG9pbnRlclxuICovXG5wcm90by5wb2ludGVyVXAgPSBmdW5jdGlvbiggZXZlbnQsIHBvaW50ZXIgKSB7XG4gIHRoaXMuZW1pdEV2ZW50KCAncG9pbnRlclVwJywgWyBldmVudCwgcG9pbnRlciBdICk7XG4gIHRoaXMuX2RyYWdQb2ludGVyVXAoIGV2ZW50LCBwb2ludGVyICk7XG59O1xuXG5wcm90by5fZHJhZ1BvaW50ZXJVcCA9IGZ1bmN0aW9uKCBldmVudCwgcG9pbnRlciApIHtcbiAgaWYgKCB0aGlzLmlzRHJhZ2dpbmcgKSB7XG4gICAgdGhpcy5fZHJhZ0VuZCggZXZlbnQsIHBvaW50ZXIgKTtcbiAgfSBlbHNlIHtcbiAgICAvLyBwb2ludGVyIGRpZG4ndCBtb3ZlIGVub3VnaCBmb3IgZHJhZyB0byBzdGFydFxuICAgIHRoaXMuX3N0YXRpY0NsaWNrKCBldmVudCwgcG9pbnRlciApO1xuICB9XG59O1xuXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSBkcmFnIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tIC8vXG5cbi8vIGRyYWdTdGFydFxucHJvdG8uX2RyYWdTdGFydCA9IGZ1bmN0aW9uKCBldmVudCwgcG9pbnRlciApIHtcbiAgdGhpcy5pc0RyYWdnaW5nID0gdHJ1ZTtcbiAgLy8gcHJldmVudCBjbGlja3NcbiAgdGhpcy5pc1ByZXZlbnRpbmdDbGlja3MgPSB0cnVlO1xuICB0aGlzLmRyYWdTdGFydCggZXZlbnQsIHBvaW50ZXIgKTtcbn07XG5cbnByb3RvLmRyYWdTdGFydCA9IGZ1bmN0aW9uKCBldmVudCwgcG9pbnRlciApIHtcbiAgdGhpcy5lbWl0RXZlbnQoICdkcmFnU3RhcnQnLCBbIGV2ZW50LCBwb2ludGVyIF0gKTtcbn07XG5cbi8vIGRyYWdNb3ZlXG5wcm90by5fZHJhZ01vdmUgPSBmdW5jdGlvbiggZXZlbnQsIHBvaW50ZXIsIG1vdmVWZWN0b3IgKSB7XG4gIC8vIGRvIG5vdCBkcmFnIGlmIG5vdCBkcmFnZ2luZyB5ZXRcbiAgaWYgKCAhdGhpcy5pc0RyYWdnaW5nICkge1xuICAgIHJldHVybjtcbiAgfVxuXG4gIHRoaXMuZHJhZ01vdmUoIGV2ZW50LCBwb2ludGVyLCBtb3ZlVmVjdG9yICk7XG59O1xuXG5wcm90by5kcmFnTW92ZSA9IGZ1bmN0aW9uKCBldmVudCwgcG9pbnRlciwgbW92ZVZlY3RvciApIHtcbiAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgdGhpcy5lbWl0RXZlbnQoICdkcmFnTW92ZScsIFsgZXZlbnQsIHBvaW50ZXIsIG1vdmVWZWN0b3IgXSApO1xufTtcblxuLy8gZHJhZ0VuZFxucHJvdG8uX2RyYWdFbmQgPSBmdW5jdGlvbiggZXZlbnQsIHBvaW50ZXIgKSB7XG4gIC8vIHNldCBmbGFnc1xuICB0aGlzLmlzRHJhZ2dpbmcgPSBmYWxzZTtcbiAgLy8gcmUtZW5hYmxlIGNsaWNraW5nIGFzeW5jXG4gIHNldFRpbWVvdXQoIGZ1bmN0aW9uKCkge1xuICAgIGRlbGV0ZSB0aGlzLmlzUHJldmVudGluZ0NsaWNrcztcbiAgfS5iaW5kKCB0aGlzICkgKTtcblxuICB0aGlzLmRyYWdFbmQoIGV2ZW50LCBwb2ludGVyICk7XG59O1xuXG5wcm90by5kcmFnRW5kID0gZnVuY3Rpb24oIGV2ZW50LCBwb2ludGVyICkge1xuICB0aGlzLmVtaXRFdmVudCggJ2RyYWdFbmQnLCBbIGV2ZW50LCBwb2ludGVyIF0gKTtcbn07XG5cbi8vIC0tLS0tIG9uY2xpY2sgLS0tLS0gLy9cblxuLy8gaGFuZGxlIGFsbCBjbGlja3MgYW5kIHByZXZlbnQgY2xpY2tzIHdoZW4gZHJhZ2dpbmdcbnByb3RvLm9uY2xpY2sgPSBmdW5jdGlvbiggZXZlbnQgKSB7XG4gIGlmICggdGhpcy5pc1ByZXZlbnRpbmdDbGlja3MgKSB7XG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgfVxufTtcblxuLy8gLS0tLS0gc3RhdGljQ2xpY2sgLS0tLS0gLy9cblxuLy8gdHJpZ2dlcmVkIGFmdGVyIHBvaW50ZXIgZG93biAmIHVwIHdpdGggbm8vdGlueSBtb3ZlbWVudFxucHJvdG8uX3N0YXRpY0NsaWNrID0gZnVuY3Rpb24oIGV2ZW50LCBwb2ludGVyICkge1xuICAvLyBpZ25vcmUgZW11bGF0ZWQgbW91c2UgdXAgY2xpY2tzXG4gIGlmICggdGhpcy5pc0lnbm9yaW5nTW91c2VVcCAmJiBldmVudC50eXBlID09ICdtb3VzZXVwJyApIHtcbiAgICByZXR1cm47XG4gIH1cblxuICB0aGlzLnN0YXRpY0NsaWNrKCBldmVudCwgcG9pbnRlciApO1xuXG4gIC8vIHNldCBmbGFnIGZvciBlbXVsYXRlZCBjbGlja3MgMzAwbXMgYWZ0ZXIgdG91Y2hlbmRcbiAgaWYgKCBldmVudC50eXBlICE9ICdtb3VzZXVwJyApIHtcbiAgICB0aGlzLmlzSWdub3JpbmdNb3VzZVVwID0gdHJ1ZTtcbiAgICAvLyByZXNldCBmbGFnIGFmdGVyIDMwMG1zXG4gICAgc2V0VGltZW91dCggZnVuY3Rpb24oKSB7XG4gICAgICBkZWxldGUgdGhpcy5pc0lnbm9yaW5nTW91c2VVcDtcbiAgICB9LmJpbmQoIHRoaXMgKSwgNDAwICk7XG4gIH1cbn07XG5cbnByb3RvLnN0YXRpY0NsaWNrID0gZnVuY3Rpb24oIGV2ZW50LCBwb2ludGVyICkge1xuICB0aGlzLmVtaXRFdmVudCggJ3N0YXRpY0NsaWNrJywgWyBldmVudCwgcG9pbnRlciBdICk7XG59O1xuXG4vLyAtLS0tLSB1dGlscyAtLS0tLSAvL1xuXG5VbmlkcmFnZ2VyLmdldFBvaW50ZXJQb2ludCA9IFVuaXBvaW50ZXIuZ2V0UG9pbnRlclBvaW50O1xuXG4vLyAtLS0tLSAgLS0tLS0gLy9cblxucmV0dXJuIFVuaWRyYWdnZXI7XG5cbn0pKTtcbiIsIihmdW5jdGlvbiAoKSB7XG5cbiAgICB2YXIgUm9sbGVyVGV4dFxuXG4gICAgUm9sbGVyVGV4dCA9IHtcbiAgICAgICAgcGhyYXNlczogW1xuICAgICAgICAgICAgJ211bHRpLWRheScsXG4gICAgICAgICAgICAnd2Vla2VuZCcsXG4gICAgICAgICAgICAnYm91dGlxdWUnLFxuICAgICAgICAgICAgJ2NvdW50cnknLFxuICAgICAgICAgICAgJ2hvbGlkYXknLFxuICAgICAgICAgICAgJ3JvY2snLFxuICAgICAgICAgICAgJ2NpdHknLFxuICAgICAgICAgICAgJ2RhbmNlJyxcbiAgICAgICAgICAgICdwb3N0LXB1bmsnLFxuICAgICAgICAgICAgJ2ZhbWlseScsXG4gICAgICAgICAgICAnbWV0YWwnLFxuICAgICAgICAgICAgJ2phenonLFxuICAgICAgICAgICAgJ3dlaXJkJyxcbiAgICAgICAgICAgICdzcGVjaWFsJyxcbiAgICAgICAgICAgICdjbGFzc2ljYWwnLFxuICAgICAgICAgICAgJ3dpbnRlcidcbiAgICAgICAgXSxcbiAgICAgICAgZG9tOiB7XG4gICAgICAgICAgICB0ZXh0V3JhcDogZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnJvbGxlclRleHQnKSxcbiAgICAgICAgICAgIGN1cnJlbnQ6IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLXRleHQtY3VycmVudF0nKSxcbiAgICAgICAgICAgIG5leHQ6IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLXRleHQtbmV4dF0nKSxcbiAgICAgICAgfSxcbiAgICAgICAgaW50ZXJ2YWxMZW5ndGggICAgICAgICAgOiAxNTAwLFxuICAgICAgICBuZXh0UGhyYXNlICAgICAgICAgIDogJ3dpbnRlcicsXG4gICAgICAgIGNvdW50ZXIgICAgICAgICAgICAgICAgIDogbnVsbCxcbiAgICAgICAgdGlja2VyICAgICAgICAgICAgICAgICAgOiBmYWxzZSxcblxuICAgICAgICBpbml0OiAoKSA9PiB7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgICBcbiAgICAgICAgICAgIGlmKFJvbGxlclRleHQuZG9tLnRleHRXcmFwKVxuICAgICAgICAgICAgICAgIFJvbGxlclRleHQuc3RhcnRjb3VudGVyKClcbiAgICAgICAgICAgIFxuICAgICAgICB9LFxuXG4gICAgICAgIHN0YXJ0Y291bnRlcjogKCkgPT4ge1xuICAgICAgICAgICAgXG4gICAgICAgICAgICBSb2xsZXJUZXh0LnNldFdpZHRoKFJvbGxlclRleHQuZG9tLmN1cnJlbnQpXG5cbiAgICAgICAgICAgIGxldCBpID0gMVxuICAgICAgICAgICAgUm9sbGVyVGV4dC5jb3VudGVyID0gc2V0SW50ZXJ2YWwoKCkgPT4geyAgICAgICBcblxuICAgICAgICAgICAgICAgIGNvbnN0IGN1cnJlbnRQaHJhc2UgPSBSb2xsZXJUZXh0LnBocmFzZXNbaV1cbiAgICAgICAgICAgICAgICBjb25zdCBuZXh0UGhyYXNlID0gUm9sbGVyVGV4dC5waHJhc2VzW2kgKyAxXSA/IFJvbGxlclRleHQucGhyYXNlc1tpICsgMV0gOiBSb2xsZXJUZXh0LnBocmFzZXNbMF1cblxuICAgICAgICAgICAgICAgIFJvbGxlclRleHQuZG9tLnRleHRXcmFwLmNsYXNzTGlzdC5hZGQoJ3R1cm4nKVxuXG4gICAgICAgICAgICAgICAgUm9sbGVyVGV4dC5zZXRXaWR0aChSb2xsZXJUZXh0LmRvbS5uZXh0KVxuXG4gICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG5cbiAgICAgICAgICAgICAgICAgICAgUm9sbGVyVGV4dC5kb20udGV4dFdyYXAuY2xhc3NMaXN0LnJlbW92ZSgndHVybicpXG5cbiAgICAgICAgICAgICAgICAgICAgLy8gVXBkYXRlIG1vYmlsZSBzY3JlZW4gaW1hZ2VcbiAgICAgICAgICAgICAgICAgICAgUm9sbGVyVGV4dC5kb20uY3VycmVudC50ZXh0Q29udGVudCA9IGN1cnJlbnRQaHJhc2VcbiAgICAgICAgICAgICAgICAgICAgUm9sbGVyVGV4dC5kb20ubmV4dC50ZXh0Q29udGVudCA9IG5leHRQaHJhc2VcblxuICAgICAgICAgICAgICAgIH0sIDEwMDApXG5cblxuICAgICAgICAgICAgICAgIC8vIElmIHdlIHJlYWNoIHRoZSBlbmQgb2YgdGhlIHRoZW1lcywgcmVzZXQgdG8gZmlyc3QgdGhlbWVcbiAgICAgICAgICAgICAgICBpID49IFJvbGxlclRleHQucGhyYXNlcy5sZW5ndGggLSAxID8gaSA9IDAgOiBpKytcblxuICAgICAgICAgICAgfSwgUm9sbGVyVGV4dC5pbnRlcnZhbExlbmd0aCk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgc2V0V2lkdGg6IChlbGVtZW50KSA9PiB7XG4gICAgICAgICAgICBsZXQgdGV4dFdpZHRoID0gZWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS53aWR0aFxuICAgICAgICAgICAgXG4gICAgICAgICAgICBSb2xsZXJUZXh0LmRvbS50ZXh0V3JhcC5zdHlsZS53aWR0aCA9IGAke3RleHRXaWR0aH1weGBcbiAgICAgICAgfVxuXG4gICAgfVxuXG4gICAgbW9kdWxlLmV4cG9ydHMgPSBSb2xsZXJUZXh0XG5cbn0oKSlcbiIsIihmdW5jdGlvbiAoKSB7XG5cbiAgICB2YXIgVGVzdGltb25pYWxzLFxuICAgICAgICBGbGlja2l0eSA9IHJlcXVpcmUoJ2ZsaWNraXR5JylcblxuICAgIFRlc3RpbW9uaWFscyA9IHtcbiAgICAgICAgZG9tOiB7XG4gICAgICAgICAgICBjb250YWluZXIgOiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuSlMtLXRlc3RpbW9uaWFscycpLFxuICAgICAgICB9LFxuXG4gICAgICAgIGluaXQ6ICgpID0+IHtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgaWYoVGVzdGltb25pYWxzLmRvbS5jb250YWluZXIgJiYgVGVzdGltb25pYWxzLmRvbS5jb250YWluZXIuY2hpbGRyZW4ubGVuZ3RoID4gMSlcbiAgICAgICAgICAgICAgICBUZXN0aW1vbmlhbHMuY3JlYXRlQ2Fyb3VzZWwoKVxuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgXG4gICAgICAgIH0sXG5cbiAgICAgICAgY3JlYXRlQ2Fyb3VzZWw6ICgpID0+IHtcblxuICAgICAgICAgICAgY29uc3Qgc2V0dGluZ3MgPSB7XG4gICAgICAgICAgICAgICAgY2VsbEFsaWduICAgIDogJ2NlbnRlcicsICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgd3JhcEFyb3VuZCAgIDogdHJ1ZSxcbiAgICAgICAgICAgICAgICBhdXRvUGxheSAgICAgOiBmYWxzZSxcbiAgICAgICAgICAgICAgICBpbWFnZXNMb2FkZWQgOiB0cnVlLFxuICAgICAgICAgICAgICAgIHBhZ2VEb3RzICAgICA6IGZhbHNlXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIG5ldyBGbGlja2l0eShUZXN0aW1vbmlhbHMuZG9tLmNvbnRhaW5lciwgc2V0dGluZ3MpXG5cbiAgICAgICAgfVxuXG5cbiAgICB9XG5cbiAgICBtb2R1bGUuZXhwb3J0cyA9IFRlc3RpbW9uaWFsc1xuXG59KCkpXG4iLCIoZnVuY3Rpb24gKCl7XG5cbiAgICAndXNlIHN0cmljdCdcblxuXHR2YXIgUGxvdCAgICBcdFx0PSByZXF1aXJlKCcuLi8uLi8uLi9wbG90LWNvcmUvc3JjL2pzL3Bsb3QnKSwgIFxuXHRcdExhenlMb2FkICAgXHQgXHQ9IHJlcXVpcmUoJy4uLy4uLy4uL3Bsb3QtY29yZS9zcmMvanMvbGF6eWxvYWQnKSxcblx0XHRNb2RhbHNcdFx0XHQ9IHJlcXVpcmUoJy4uLy4uLy4uL3Bsb3QtY29yZS9zcmMvanMvbW9kYWxzJyksXG5cdFx0Q2Fyb3VzZWxzXHRcdD0gcmVxdWlyZSgnLi4vLi4vLi4vcGxvdC1jb3JlL3NyYy9qcy9jYXJvdXNlbHMnKSxcblx0XHRTbW9vdGggXHRcdFx0PSByZXF1aXJlKCcuLi8uLi8uLi9wbG90LWNvcmUvc3JjL2pzL3Bsb3Qtc21vb3RoLXNjcm9sbCcpLFxuXHRcdEZBUXMgXHRcdFx0PSByZXF1aXJlKCcuLi8uLi8uLi9wbG90LWNvcmUvc3JjL2pzL2ZhcXMnKSxcblx0XHRIb21lXHRcdFx0PSByZXF1aXJlKCcuL3BhZ2VzL2hvbWUnKSxcblx0XHRSb2xsZXJUZXh0ICAgICAgPSByZXF1aXJlKCcuL2NvbXBvbmVudHMvcm9sbGVyLXRleHQnKSxcblx0XHRQcmljaW5nICAgICAgICAgPSByZXF1aXJlKCcuL3BhZ2VzL3ByaWNpbmcnKSxcblx0XHRBcnRpc3RzXHRcdFx0PSByZXF1aXJlKCcuL3BhZ2VzL2FydGlzdHMnKSxcblx0XHRUZXN0aW1vbmlhbHNcdD0gcmVxdWlyZSgnLi9jb21wb25lbnRzL3Rlc3RpbW9uaWFscycpLFxuXHRcdFNjaGVkdWxlXHRcdD0gcmVxdWlyZSgnLi9wYWdlcy9zY2hlZHVsZScpLFxuXHRcdE5ld3MgXHRcdFx0PSByZXF1aXJlKCcuL3BhZ2VzL25ld3MnKSxcblx0ICAgIE1haW5cblxuXHRNYWluID0ge1xuXG5cdFx0aW5pdDogKCkgPT4ge1x0XG5cblx0XHRcdE1haW4uaW5pdGFsaXplU21vb3RoKClcblxuXHRcdFx0UGxvdC5pbml0KCkgXG5cdFx0XHRMYXp5TG9hZC5pbml0KClcblx0XHRcdE1vZGFscy5pbml0KCkgIFxuXHRcdFx0Q2Fyb3VzZWxzLmluaXQoKVxuXHRcdFx0RkFRcy5pbml0KClcblx0XHRcdFJvbGxlclRleHQuaW5pdCgpXG5cdFx0XHRNYWluLmZpcmVDb252ZXJzaW9uU25pcHBldHNJZk9uVGhhbmtZb3VQYWdlKClcblxuXHRcdFx0Ly9QYWdlc1xuICAgICAgICBcdGlmKFBsb3QuaXNQYWdlKCdob21lJykpXG5cdFx0XHRcdEhvbWUuaW5pdCgpXG5cbiAgICAgICAgXHRpZihQbG90LmlzUGFnZSgnc2NoZWR1bGUnKSlcblx0XHRcdFx0U2NoZWR1bGUuaW5pdCgpXG5cbiAgICAgICAgXHRpZihQbG90LmlzUGFnZSgnYXJ0aXN0cycpKVxuXHRcdFx0XHRBcnRpc3RzLmluaXQoKVxuXG5cdFx0XHRpZihQbG90LmlzUGFnZSgncHJpY2luZycpKVxuXHRcdFx0XHRQcmljaW5nLmluaXQoKVxuXG5cdFx0XHROZXdzLmluaXQoKVxuXHRcdFx0XG5cdFx0XHRNYWluLmRlbW9BamF4QnV0dG9uKCkgXG5cblx0XHQgICAgaWYgKHR5cGVvZih3aW5kb3cuSHViU3BvdENvbnZlcnNhdGlvbnMpICE9ICd1bmRlZmluZWQnKSB7XG5cdFx0XHQgICAgTWFpbi5odWJzcG90KCk7XG5cdFx0ICBcdH0gZWxzZSB7XG5cdFx0ICAgIFx0d2luZG93LmhzQ29udmVyc2F0aW9uc09uUmVhZHkgPSBbTWFpbi5odWJzcG90XTtcblx0XHQgIFx0fVxuXG5cdFx0XHRpZihkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuSlMtLXRlc3RpbW9uaWFscycpKVxuXHRcdFx0XHRUZXN0aW1vbmlhbHMuaW5pdCgpXG5cblx0XHR9LFxuXHRcdFxuXHRcdGluaXRhbGl6ZVNtb290aCA6ICgpID0+IHtcblxuICAgICAgICBcdGNvbnN0IGhhc1Ntb290aFNjcm9sbCA9IGRvY3VtZW50LmJvZHkuZGF0YXNldC5wbG90Q3VzdG9taXplclNtb290aFNjcm9sbFxuXG4gICAgICAgIFx0Y29uc3Qgc21vb3RoU2V0dGluZ3MgPSB7XG5cdFx0XHRcdHN0YW5kYXJkU2Nyb2xsICA6IGhhc1Ntb290aFNjcm9sbCAhPSAneWVzJ1xuXHRcdFx0fVxuXG4gICAgICAgIFx0U21vb3RoLmluaXQoc21vb3RoU2V0dGluZ3MpXG5cbiAgICAgICAgfSxcblxuICAgICAgICBmaXJlQ29udmVyc2lvblNuaXBwZXRzSWZPblRoYW5rWW91UGFnZSA6ICgpID0+IHtcblxuICAgICAgICBcdGNvbnN0IHVybFBhcmFtcyA9IG5ldyBVUkxTZWFyY2hQYXJhbXMod2luZG93LmxvY2F0aW9uLnNlYXJjaCk7XG5cdFx0XHRjb25zdCB0cmFja2luZ0NvZGUgPSB1cmxQYXJhbXMuZ2V0KCdjb2RlJyk7XG5cblxuICAgICAgICBcdGlmKGd0YWcgJiYgdHJhY2tpbmdDb2RlKSB7XG4gICAgICAgIFx0XHRjb25zb2xlLmxvZygncGluZycsdHJhY2tpbmdDb2RlKVxuICAgIFx0XHQgXHRndGFnKCdldmVudCcsICdjb252ZXJzaW9uJywgeydzZW5kX3RvJzogJ0FXLTYxOTAzMjM0Ny8nICsgdHJhY2tpbmdDb2RlfSlcbiAgICBcdFx0IH1cblxuICAgICAgICB9LFxuXG4gICAgICAgIGZvcm1Jc1N1Ym1pdHRlZCA6ICgpID0+IHtcblxuICAgICAgICBcdHZhciBlcnJWYWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuaW5wdXQtZXJyb3InKS5sZW5ndGhcblx0XHQgICAgaWYgKGVyclZhbCA9PT0gMCkgeyBcblx0XHQgICAgICBcdGd0YWcoJ2V2ZW50JywgJ2NvbnZlcnNpb24nLCB7J3NlbmRfdG8nOiAnQVctNjE5MDMyMzQ3L3ktRzFDTU9wdXRrQkVKdmVscWNDJ30pO1xuXHRcdCAgICB9ICBlbHNlIHtcblx0XHQgICAgfVxuXG4gICAgICAgIH0sXG5cbiAgICAgICAgY2hlY2tQb3BVcEZvcm1FeGlzdHMgOiAoKSA9PiB7XG5cbiAgICAgICAgXHRjb25zdCBmb3JtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2hzUG9wVXBGb3JtLTczZWUzZWNmLTdmOGEtNDJjNi05ZGNjLTcyNWM3Yzg2NjFhMicpXG5cbiAgICAgICAgXHRpZighZm9ybSkge1xuICAgICAgICBcdFx0c2V0VGltZW91dChmdW5jdGlvbigpe1xuICAgICAgICBcdFx0XHRNYWluLmNoZWNrUG9wVXBGb3JtRXhpc3RzKClcblxuICAgICAgICBcdFx0fSw1MDApXG4gICAgICAgIFx0fSBlbHNlIHtcblx0ICAgICAgICAgIGZvcm0ub25zdWJtaXQgPSBmdW5jdGlvbiAoKSB7XG5cblx0ICAgICAgICAgIFx0Y29uc29sZS5sb2coJ2NvbnZlcnRlZCcpXG5cdCAgICAgICAgICBcdE1haW4uZm9ybUlzU3VibWl0dGVkKClcblx0ICAgICAgICAgIFx0dmFyIGltZyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpbWdcIilcblx0XHRcdFx0aW1nLnNyYyA9IFwiaHR0cHM6Ly9weC5hZHMubGlua2VkaW4uY29tL2NvbGxlY3QvP3BpZD0yMzU0NzU2JmNvbnZlcnNpb25JZD0yNzA2Nzk2JmZtdD1naWZcIjtcblx0XHRcdFx0XG5cdFx0XHRcdGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoaW1nKVxuXHQgICAgICAgICAgfVxuICAgICAgICBcdH1cblxuICAgICAgICB9LFxuXG4gICAgICAgIGh1YnNwb3QgOiAoKSA9PiB7XG5cbiAgICAgICAgXHRNYWluLmNoZWNrUG9wVXBGb3JtRXhpc3RzKClcblxuICAgIFx0XHR3aW5kb3cuSHViU3BvdENvbnZlcnNhdGlvbnMub24oJ2NvbnZlcnNhdGlvblN0YXJ0ZWQnLCBwYXlsb2FkID0+IHtcblxuICAgIFx0XHQgaWYoZ3RhZykge1xuICAgIFx0XHQgXHRndGFnKCdldmVudCcsICdjb252ZXJzaW9uJywge1xuXHRcdFx0XHQgICAgICAnc2VuZF90byc6ICdBVy02MTkwMzIzNDcvWTl1akNQeUQxZGtCRUp2ZWxxY0MnXG5cdFx0XHRcdCAgfSlcbiAgICBcdFx0IH1cblxuICAgICAgICAgIFx0dmFyIGltZyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpbWdcIilcblx0XHRcdGltZy5zcmMgPSBcImh0dHBzOi8vcHguYWRzLmxpbmtlZGluLmNvbS9jb2xsZWN0Lz9waWQ9MjM1NDc1NiZjb252ZXJzaW9uSWQ9MjcyMjcxNiZmbXQ9Z2lmXCI7XG5cdFx0XHRcblx0XHRcdGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoaW1nKVxuXHRcdFx0IFxuXG5cdFx0XHR9KVxuXG4gICAgICAgIH0sXG5cbiAgICAgICAgZGVtb0FqYXhCdXR0b24gOiAoKSA9PiB7XG5cblx0XHRcdHZhciBwbG90RGVtb0xvYWRDb250ZW50ID0gIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5KUy0tcGxvdExvYWRUZW1wbGF0ZVBhcnREZW1vJyk7XG5cdFx0XHRcblxuXHRcdFx0aWYocGxvdERlbW9Mb2FkQ29udGVudClcblxuXHRcdFx0XHRwbG90RGVtb0xvYWRDb250ZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZSA9PiB7XG5cblx0XHRcdFx0XHQvLyBUYWtlIGEgbG9vayBhdCB3aGF0IHlvdSBjYW4gcGFzcyB0byB0aGlzIGZ1bmN0aW9uXG5cdFx0XHRcdFx0Ly8gdmFyIGFyZ3MgPSB7XG5cdFx0XHRcdCAgICAvLyAgICAgICAgICAgICAgdGVtcGxhdGVQYXJ0ICAgIDogbnVsbCxcblx0XHRcdFx0ICAgIC8vICAgICAgICAgICAgICBhY3Rpb24gICAgICAgICAgOiAncGxvdExvYWRUZW1wbGF0ZVBhcnQnLCAvL1RoaXMgaXMgdGhlIGFjdGlvbiBmaXJlZCBpbnRvIG91ciBQbG90U2l0ZSBQSFAgc2V0dXAucGhwIGZpbGVcblx0XHRcdFx0ICAgIC8vICAgICAgICAgICAgICBkYXRhICAgICAgICAgICAgOiB7fSwgLy9BbnkgZGF0YSB3ZSdkIGxpa2UgdG8gcGFzcyB0byB0aGUgdGVtcGxhdGUgcGFydC4gXG5cdFx0XHRcdCAgICAvLyAgICAgICAgICAgICAgY29udGVudEFyZWEgICAgIDogJy5KUy0tYWpheFRhcmdldEFyZWEnLCAvL1doZXJlIHRoZSBuZXcgY29udGVudCBnZXRzIGluc2VydHNcblx0XHRcdFx0ICAgIC8vICAgICAgICAgICAgICBhcHBlbmQgICAgICAgICAgOiBmYWxzZSAvL0lmIHdlIHdhbnQgdG8gYXBwZW5kIHRvIHRoZSBhYm92ZSBhcmVhLCBvciByZXBsYWNlIHRoZSBjb250ZW50XG5cdFx0XHRcdCAgICAvLyAgICAgICAgICB9XG5cblx0XHRcdFx0XHRjb25zdCBhcmdzID0ge1xuXG5cdFx0XHRcdFx0XHR0ZW1wbGF0ZVBhcnQgOiAnZGVtb3MvYWpheC1jb250ZW50JywgXG5cdFx0XHRcdFx0XHRkYXRhIDoge1xuXHRcdFx0XHRcdFx0XHQnZm9vJyBcdFx0OiAnYmFyJyxcblx0XHRcdFx0XHRcdFx0J2JhbmdlcnMnXHQ6ICdtYXNoJyxcblx0XHRcdFx0XHRcdFx0J2hhdmluZydcdDogJ2l0J1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblxuXG5cdFx0XHRcdFx0UGxvdC5sb2FkVGVtcGxhdGVQYXJ0KGFyZ3MpXG5cblx0XHRcdFx0fSlcblxuICAgICAgICB9XG5cblx0fVxuXG5cdHdpbmRvdy5NYWluID0gTWFpblxuXG59KCkpO1xuICIsIihmdW5jdGlvbiAoKSB7XG5cbiAgICB2YXIgUGxvdCBcdFx0XHQ9IHJlcXVpcmUoJy4uLy4uLy4uLy4uL3Bsb3QtY29yZS9zcmMvanMvcGxvdCcpLFxuICAgICAgICBNb2RhbHMgICAgICAgICAgPSByZXF1aXJlKCcuLi8uLi8uLi8uLi9wbG90LWNvcmUvc3JjL2pzL21vZGFscycpLFxuICAgIFx0QXJ0aXN0c1xuXG4gICAgLy9NYXkgdGhpcyBvYmplY3QgYWN0IGFzIGEgZ3VpZGUgdG8gdXNpbmcgUGxvdCBjb3JlIGZ1bmN0aW9uc1xuICAgIC8vYW5kIGhvdyB0byBzZXQgdXAgYWpheCBkeW5hbWljIGRhdGEgd2l0aCBvdXIgbmV3IHByaW5jaXBsZXMgd2l0aCBlYXNlXG4gICAgQXJ0aXN0cyA9IHtcblxuICAgIFx0bWF4UGFnZXMgXHRcdFx0OiAxLFxuICAgIFx0Y3VycmVudFBhZ2UgXHRcdDogMSxcbiAgICBcdGN1cnJlbnRBcnRpc3RUeXBlXHQ6IGZhbHNlLFxuICAgIFx0bG9hZE1vcmVCdXR0b24gIFx0OiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuSlMtLWFydGlzdHNMb2FkTW9yZScpLFxuXG4gICAgICAgIGluaXQ6ICgpID0+IHtcblxuICAgICAgICBcdEFydGlzdHMuc2hvd09ySGlkZUxvYWRNb3JlQnV0dG9uKClcblxuICAgICAgICAgICAgQXJ0aXN0cy5jcmVhdGVMaXN0ZW5lcnMoKVxuXG4gICAgICAgIH0sXG5cbiAgICAgICAgY3JlYXRlTGlzdGVuZXJzOiAoKSA9PiB7XG5cbiAgICAgICAgXHRBcnRpc3RzLmxvYWRNb3JlQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZSA9PiB7XG5cbiAgICAgICAgXHRcdGNvbnN0IG5leHRQYWdlID0gcGFyc2VJbnQoQXJ0aXN0cy5sb2FkTW9yZUJ1dHRvbi5kYXRhc2V0Lm5leHRQYWdlKVxuXG4gICAgICAgIFx0XHRBcnRpc3RzLmN1cnJlbnRQYWdlID0gbmV4dFBhZ2VcblxuICAgICAgICBcdFx0QXJ0aXN0cy5sb2FkQXJ0aXN0cyh0cnVlKVxuXG4gICAgICAgIFx0XHRBcnRpc3RzLmxvYWRNb3JlQnV0dG9uLmRhdGFzZXQubmV4dFBhZ2UgPSBuZXh0UGFnZSArIDFcblxuICAgICAgICBcdH0pXG5cbiAgICAgICAgXHRkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGUgPT4ge1xuXG4gICAgICAgICAgICAgICAgLy9IYXZlIHdlIGNsaWNrZWQgb24gYW4gYXJ0aXN0IHR5cGUgZmlsdGVyIGJ1dHRvbj9cblx0XHRcdFx0aWYgKGUudGFyZ2V0LmNsb3Nlc3QoJy5KUy0tYXJ0aXN0VHlwZUJ1dHRvbicpKSB7XG5cdFx0XHRcdFx0QXJ0aXN0cy5jdXJyZW50QXJ0aXN0VHlwZSA9IGUudGFyZ2V0LmRhdGFzZXQuYXJ0aXN0VHlwZUlkXG5cdFx0XHRcdFx0QXJ0aXN0cy5jdXJyZW50UGFnZSA9IDFcbiAgICAgICAgICAgICAgICAgICAgQXJ0aXN0cy5sb2FkTW9yZUJ1dHRvbi5kYXRhc2V0Lm5leHRQYWdlID0gMlxuXHRcdFx0XHRcdEFydGlzdHMubG9hZEFydGlzdHMoZmFsc2UpLnRoZW4oKCkgPT4ge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuSlMtLWFydGlzdFR5cGVCdXR0b24nKS5mb3JFYWNoKGFydGlzdFR5cGVCdXR0b24gPT4ge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYXJ0aXN0VHlwZUJ1dHRvbi5jbGFzc0xpc3QucmVtb3ZlKCdzZWxlY3RlZCcpXG5cbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGUudGFyZ2V0LmNsYXNzTGlzdC5hZGQoJ3NlbGVjdGVkJylcbiAgICAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICB9KVxuXHRcdFx0XHR9IFxuXG5cdFx0XHR9LCBmYWxzZSlcblxuXG4gICAgICAgIH0sXG5cbiAgICAgICAgbG9hZEFydGlzdHMgOiBhcHBlbmQgPT4ge1xuXG4gICAgICAgIFx0Y29uc3QgYXJncyA9IHtcblx0XHRcdFx0dGVtcGxhdGVQYXJ0IDogJ3BhcnRzL2FydGlzdC1saXN0aW5nJywgXG5cdFx0XHRcdGRhdGEgOiB7XG5cdFx0XHRcdFx0J3BhZ2UnIFx0XHRcdDogQXJ0aXN0cy5jdXJyZW50UGFnZSxcblx0XHRcdFx0XHQnYXJ0aXN0VHlwZSdcdDogQXJ0aXN0cy5jdXJyZW50QXJ0aXN0VHlwZVxuXHRcdFx0XHR9LFxuXHRcdFx0XHRhcHBlbmQgOiBhcHBlbmQgXG5cdFx0XHR9XG5cblx0XHRcdHJldHVybiBQbG90LmxvYWRUZW1wbGF0ZVBhcnQoYXJncykudGhlbihodG1sID0+IHtcblxuXHRcdFx0XHRBcnRpc3RzLnNob3dPckhpZGVMb2FkTW9yZUJ1dHRvbigpXG5cbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZVxuXG5cdFx0XHR9KVxuXG4gICAgICAgIH0sXG5cbiAgICAgICAgc2hvd09ySGlkZUxvYWRNb3JlQnV0dG9uIDogKCkgPT4ge1xuXG4gICAgICAgIFx0Ly9DaGVjayBpZiBtYXggcGFnZXMgaXMgMS4gSWYgaXQgaXMsIHRoZXJlJ3Mgb25seSAxIHBhZ2Ugb2YgYXJ0aXN0c1xuICAgICAgICBcdC8vc28gd2UgY2FuIGhpZGUgbG9hZCBtb3JlIGJ1dHRvblxuICAgICAgICBcdEFydGlzdHMubWF4UGFnZXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuSlMtLW1heFBhZ2VzJykuZGF0YXNldC5tYXhQYWdlc1xuXG4gICAgICAgIFx0aWYoQXJ0aXN0cy5tYXhQYWdlcyA+IEFydGlzdHMuY3VycmVudFBhZ2UpXG4gICAgICAgIFx0XHRBcnRpc3RzLmxvYWRNb3JlQnV0dG9uLmNsYXNzTGlzdC5yZW1vdmUoJ2hpZGRlbicpXG4gICAgICAgIFx0ZWxzZSBcbiAgICAgICAgXHRcdEFydGlzdHMubG9hZE1vcmVCdXR0b24uY2xhc3NMaXN0LmFkZCgnaGlkZGVuJylcblxuICAgICAgICB9XG5cbiAgICB9XG5cbiAgICBtb2R1bGUuZXhwb3J0cyA9IEFydGlzdHNcblxufSgpKSIsIihmdW5jdGlvbiAoKSB7XG5cbiAgICB2YXIgSG9tZVxuXG4gICAgSG9tZSA9IHtcbiAgICAgICAgZG9tIDoge1xuICAgICAgICAgICAgYm9keSAgICAgICAgICAgICAgICAgICAgOiBkb2N1bWVudC5ib2R5LFxuICAgICAgICAgICAgcm9vdCAgICAgICAgICAgICAgICAgICAgOiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdodG1sJyksXG4gICAgICAgICAgICBwaG9uZSAgICAgICAgICAgICAgICAgICA6IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5tb2JpbGUzRF9fcGhvbmUnKSxcbiAgICAgICAgICAgIGhvbWVCYW5uZXIgICAgICAgICAgICAgIDogZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmhvbWVCYW5uZXInKSxcbiAgICAgICAgICAgIGhlYWRlciAgICAgICAgICAgICAgICAgIDogZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3NpdGVNYWluSGVhZGVyJyksXG4gICAgICAgIH0sXG4gICAgICAgIHByZXZpb3VzVGhlbWUgICAgICAgICAgIDogJ2hvbWUnLFxuICAgICAgICBjb3VudGVyICAgICAgICAgICAgICAgICA6IG51bGwsXG4gICAgICAgIHRpY2tlciAgICAgICAgICAgICAgICAgIDogZmFsc2UsXG4gICAgICAgIGN1cnJlbnRNb3VzZVBvc2l0aW9uICAgIDoge1xuICAgICAgICAgICAgWDogd2luZG93LmlubmVyV2lkdGggLyAyLFxuICAgICAgICAgICAgWTogd2luZG93LmlubmVySGVpZ2h0IC8gMlxuICAgICAgICB9LFxuICAgICAgICBwcmV2aW91c01vdXNlUG9zaXRpb24gICA6IHtcbiAgICAgICAgICAgIFg6IHdpbmRvdy5pbm5lcldpZHRoIC8gMixcbiAgICAgICAgICAgIFk6IHdpbmRvdy5pbm5lckhlaWdodCAvIDJcbiAgICAgICAgfSxcbiAgICAgICAgbW91c2VNb3ZlQW5pbWF0aW9uRnJhbWUgOiBudWxsLFxuICAgICAgICBjdXJyZW50U2xpZGUgOiAwLFxuICAgICAgICB0aGVtZXM6IFtcbiAgICAgICAgICAgICdicm9ja3dlbGwnLFxuICAgICAgICAgICAgJ21pZ2h0eWhvb3BsYScsXG4gICAgICAgICAgICAnYWZyaWNhb3llJyxcbiAgICAgICAgICAgICdzb3V0aGZhY2luZycsXG4gICAgICAgIF0sXG5cbiAgICAgICAgaW5pdDogKCkgPT4ge1xuXG4gICAgICAgICAgICBIb21lLmNyZWF0ZUxpc3RlbmVycygpXG5cbiAgICAgICAgICAgIEhvbWUuc3RhcnRUaGVtZUNvdW50ZXIoKVxuXG4gICAgICAgICAgICBIb21lLnNldFdpZHRoT2ZQaG9uZSgpXG5cbiAgICAgICAgfSxcblxuICAgICAgICBjcmVhdGVMaXN0ZW5lcnM6ICgpID0+IHtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgY29uc3QgaG9tZUJhbm5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5ob21lQmFubmVyJylcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgLy8gT2JzZXJ2ZSB0aGUgaG9tZWJhbm5lciBzZWN0aW9uIGZvciBjbGFzcyBjaGFuZ2VzXG4gICAgICAgICAgICBjb25zdCBvYnNlcnZlciA9IG5ldyBNdXRhdGlvbk9ic2VydmVyKEhvbWUuYmFubmVyTXV0YXRpb24pXG4gICAgICAgICAgICBvYnNlcnZlci5vYnNlcnZlKGhvbWVCYW5uZXIsIHtcbiAgICAgICAgICAgICAgYXR0cmlidXRlcyAgOiB0cnVlLFxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgY29uc3QgYnVyZ2VyTWVudVRyaWdnZXJzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLkpTLS1tZW51VHJpZ2dlcicpXG5cbiAgICAgICAgICAgIC8vIFRvZ2dsZSBiYW5uZXIgYW5pbWF0aW9uIHdoZW4gbWVudSBvcGVuZWQvY2xvc2VkXG4gICAgICAgICAgICBidXJnZXJNZW51VHJpZ2dlcnMuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBIb21lLnRvZ2dsZVRoZW1lQ291bnRlcilcblxuICAgICAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsSG9tZS5zZXRXaWR0aE9mUGhvbmUpXG4gICAgICAgICAgICBcblxuICAgICAgICAgICAgaWYod2luZG93LmlubmVyV2lkdGggPCA2NDApIHtcblxuICAgICAgICAgICAgICAgIEhvbWUuZG9tLmJvZHkuY2xhc3NMaXN0LmFkZCgnc21hbGxTY3JlZW4nKTtcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgIH0gZWxzZSB7XG5cbiAgICAgICAgICAgICAgICBIb21lLm1vdXNlTW92ZUFuaW1hdGlvbkZyYW1lID0gcmVxdWVzdEFuaW1hdGlvbkZyYW1lKEhvbWUucnVuTW91c2VNb3ZlKVxuXG4gICAgICAgICAgICAgICAgSG9tZS5kb20uaG9tZUJhbm5lci5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW1vdmUnLCAoZSkgPT4gSG9tZS50cmFja0N1cnNvclBvc2l0aW9uKGUpKSBcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBcbiAgICAgICAgfSxcblxuICAgICAgICBzZXRXaWR0aE9mUGhvbmUgOiAoKSA9PiB7XG5cbiAgICAgICAgICAgIEhvbWUuZG9tLnBob25lLnN0eWxlLndpZHRoID0gSG9tZS5kb20ucGhvbmUuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkuaGVpZ2h0ICogLjU1ICsgJ3B4J1xuXG4gICAgICAgICAgICBIb21lLmRvbS5waG9uZS5zdHlsZS5vcGFjaXR5ID0gMVxuXG4gICAgICAgIH0sXG5cbiAgICAgICAgYmFubmVyTXV0YXRpb246IChtdXRhdGlvbnNMaXN0LCBvYnNlcnZlcikgPT4ge1xuICAgICAgICAgICAgXG4gICAgICAgICAgICAvLyBJZiB0aGUgYmFubmVyIGVsZW1lbnQgaXMgaW4gdmlld1xuICAgICAgICAgICAgaWYobXV0YXRpb25zTGlzdFswXS50YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCdwbG90U21vb3RoU2Nyb2xsRnJhbWVJblZpZXcnKSAmJiAhSG9tZS5iYW5uZXJJblZpZXcpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICBIb21lLmJhbm5lckluVmlldyA9IHRydWVcblxuICAgICAgICAgICAgICAgIEhvbWUuc3RhcnRUaGVtZUNvdW50ZXIoKVxuXG4gICAgICAgICAgICB9IFxuXG4gICAgICAgICAgICBpZighbXV0YXRpb25zTGlzdFswXS50YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCdwbG90U21vb3RoU2Nyb2xsRnJhbWVJblZpZXcnKSAmJiBIb21lLmJhbm5lckluVmlldykge1xuXG4gICAgICAgICAgICAgICAgSG9tZS5iYW5uZXJJblZpZXcgPSBmYWxzZVxuXG4gICAgICAgICAgICAgICAgSG9tZS5zdG9wVGhlbWVDb3VudGVyKClcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcblxuICAgICAgICB0cmFja0N1cnNvclBvc2l0aW9uOiAoZSkgPT4ge1xuICAgIFxuICAgICAgICAgICAgSG9tZS5jdXJyZW50TW91c2VQb3NpdGlvbiA9IHtcbiAgICAgICAgICAgICAgICBYOiBlLmNsaWVudFgsXG4gICAgICAgICAgICAgICAgWTogZS5jbGllbnRZXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGNvbnN0IG1pZGRsZVBvaW50WCA9IHdpbmRvdy5pbm5lcldpZHRoIC8gMlxuICAgICAgICAgICAgY29uc3QgbWlkZGxlUG9pbnRZID0gd2luZG93LmlubmVySGVpZ2h0IC8gMlxuXG4gICAgICAgICAgICBpZihIb21lLmN1cnJlbnRNb3VzZVBvc2l0aW9uLlggIC0gMjAwMCA+IG1pZGRsZVBvaW50WClcbiAgICAgICAgICAgICAgICBIb21lLmN1cnJlbnRNb3VzZVBvc2l0aW9uLlggPSBtaWRkbGVQb2ludFggKyAyMDAwXG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGlmKEhvbWUuY3VycmVudE1vdXNlUG9zaXRpb24uWCAgKyAyMDAwIDwgbWlkZGxlUG9pbnRYKVxuICAgICAgICAgICAgICAgIEhvbWUuY3VycmVudE1vdXNlUG9zaXRpb24uWCA9IG1pZGRsZVBvaW50WCAtIDIwMDBcblxuICAgICAgICAgICAgaWYoSG9tZS5jdXJyZW50TW91c2VQb3NpdGlvbi5ZICAtIDIwMDAgPiBtaWRkbGVQb2ludFkpXG4gICAgICAgICAgICAgICAgSG9tZS5jdXJyZW50TW91c2VQb3NpdGlvbi5ZID0gbWlkZGxlUG9pbnRZICsgMjAwMFxuICAgICAgICAgICAgXG4gICAgICAgICAgICBpZihIb21lLmN1cnJlbnRNb3VzZVBvc2l0aW9uLlkgICsgMjAwMCA8IG1pZGRsZVBvaW50WSlcbiAgICAgICAgICAgICAgICBIb21lLmN1cnJlbnRNb3VzZVBvc2l0aW9uLlkgPSBtaWRkbGVQb2ludFkgLSAyMDAwXG5cbiAgICAgICAgICAgIGlmKEhvbWUudGlja2VyID09IGZhbHNlKSB7XG4gICAgICAgICAgICAgICAgSG9tZS50aWNrZXIgPSB0cnVlXG4gICAgICAgICAgICAgICAgSG9tZS5tb3VzZU1vdmVBbmltYXRpb25GcmFtZSA9IHJlcXVlc3RBbmltYXRpb25GcmFtZShIb21lLnJ1bk1vdXNlTW92ZSlcbiAgICAgICAgICAgIH1cblxuICAgICAgICB9LFxuXG4gICAgICAgIHN0YXJ0VGhlbWVDb3VudGVyOiAoKSA9PiB7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIEhvbWUuYmFubmVySW5WaWV3ID0gdHJ1ZTtcblxuICAgICAgICAgICAgLy8gU2V0IGhlYWRlciB0byBkZWZhdWx0IHN0eWxlXG4gICAgICAgICAgICBpZihIb21lLmRvbS5oZWFkZXIuY2xhc3NMaXN0LmNvbnRhaW5zKCdkZWZhdWx0SGVhZGVyJykpXG4gICAgICAgICAgICAgICAgSG9tZS5kb20uaGVhZGVyLmNsYXNzTGlzdC5yZW1vdmUoJ2RlZmF1bHRIZWFkZXInKSBcblxuICAgICAgICAgICAgSG9tZS50aW1lcig0MDAwKVxuXG4gICAgICAgIH0sXG5cbiAgICAgICAgdGltZXIgOiB0aW1lID0+IHtcblxuICAgICAgICAgICAgSG9tZS5jb3VudGVyID0gc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgLy8gVXBkYXRlIG1vYmlsZSBzY3JlZW4gaW1hZ2VcbiAgICAgICAgICAgICAgICBIb21lLmRvbS5ib2R5LmRhdGFzZXQuY3VycmVudFRoZW1lID0gSG9tZS50aGVtZXNbSG9tZS5jdXJyZW50U2xpZGVdXG4gICAgICAgICAgICAgICAgSG9tZS5kb20uYm9keS5kYXRhc2V0LnByZXZpb3VzVGhlbWUgPSBIb21lLnByZXZpb3VzVGhlbWVcblxuICAgICAgICAgICAgICAgIC8vIFVwZGF0ZSBzdGF0ZVxuICAgICAgICAgICAgICAgIEhvbWUucHJldmlvdXNUaGVtZSA9IEhvbWUudGhlbWVzW0hvbWUuY3VycmVudFNsaWRlXVxuXG4gICAgICAgICAgICAgICAgSG9tZS5kb20uYm9keS5jbGFzc0xpc3QuYWRkKCdzbGlkZU1vYmlsZVNjcmVlbicpXG5cbiAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgSG9tZS5kb20uYm9keS5jbGFzc0xpc3QucmVtb3ZlKCdzbGlkZU1vYmlsZVNjcmVlbicpICAgIFxuICAgICAgICAgICAgICAgIH0sIDIwMDApXG5cbiAgICAgICAgICAgICAgICAvLyBJZiB3ZSByZWFjaCB0aGUgZW5kIG9mIHRoZSB0aGVtZXMsIHJlc2V0IHRvIGZpcnN0IHRoZW1lXG4gICAgICAgICAgICAgICAgSG9tZS5jdXJyZW50U2xpZGUgPj0gSG9tZS50aGVtZXMubGVuZ3RoIC0gMSA/IEhvbWUuY3VycmVudFNsaWRlID0gMCA6IEhvbWUuY3VycmVudFNsaWRlKytcblxuICAgICAgICAgICAgICAgIEhvbWUudGltZXIoNDAwMClcblxuICAgICAgICAgICAgfSwgdGltZSlcblxuICAgICAgICB9LFxuXG4gICAgICAgIHN0b3BUaGVtZUNvdW50ZXI6ICgpID0+IHtcblxuICAgICAgICAgICAgaWYoSG9tZS5jb3VudGVyKVxuICAgICAgICAgICAgICAgIGNsZWFySW50ZXJ2YWwoSG9tZS5jb3VudGVyKVxuXG4gICAgICAgIH0sXG5cbiAgICAgICAgcmVtb3ZlVGhlbWU6ICgpID0+IHtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgaWYoSG9tZS5wcmV2aW91c1RoZW1lKVxuICAgICAgICAgICAgICAgIEhvbWUuZG9tLmJvZHkuY2xhc3NMaXN0LnJlbW92ZShIb21lLnByZXZpb3VzVGhlbWUpXG5cbiAgICAgICAgICAgIC8vIFNldCBoZWFkZXIgdG8gZGVmYXVsdCBzdHlsZVxuICAgICAgICAgICAgSG9tZS5kb20uaGVhZGVyLmNsYXNzTGlzdC5hZGQoJ2RlZmF1bHRIZWFkZXInKSBcbiAgICAgICAgICAgIFxuICAgICAgICB9LFxuXG4gICAgICAgIHRvZ2dsZVRoZW1lQ291bnRlcjogKCkgPT4ge1xuICAgICAgICAgICAgLy8gQ2FuY2VsIGFuaW1hdGlvbiBpZiBtZW51IGlzIG9wZW5cbiAgICAgICAgICAgIGlmKEhvbWUuZG9tLnJvb3QuY2xhc3NMaXN0LmNvbnRhaW5zKCdidXJnZXJPcGVuJykpIHtcblxuICAgICAgICAgICAgICAgIEhvbWUuc3RvcFRoZW1lQ291bnRlcigpXG4gICAgICAgICAgICAgICAgSG9tZS5yZW1vdmVUaGVtZSgpXG5cbiAgICAgICAgICAgIC8vIFN0YXJ0IGFuaW1hdGlvbiBpZiBtZW51IGlzIGNsb3NlZCBhbmQgYmFubmVyIGlzIGluIHZpZXcgICAgXG4gICAgICAgICAgICB9IGVsc2UgaWYoSG9tZS5iYW5uZXJJblZpZXcpIHtcblxuICAgICAgICAgICAgICAgIEhvbWUuc3RhcnRUaGVtZUNvdW50ZXIoKVxuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuXG4gICAgICAgIHJ1bk1vdXNlTW92ZSA6ICgpID0+IHtcblxuICAgICAgICAgICAgY29uc3QgZGlmZmVyZW5jZU9mUG9zaXRpb25zID0ge1xuICAgICAgICAgICAgICAgIFk6IEhvbWUuY3VycmVudE1vdXNlUG9zaXRpb24uWSAtIEhvbWUucHJldmlvdXNNb3VzZVBvc2l0aW9uLlksXG4gICAgICAgICAgICAgICAgWDogSG9tZS5jdXJyZW50TW91c2VQb3NpdGlvbi5YIC0gSG9tZS5wcmV2aW91c01vdXNlUG9zaXRpb24uWFxuICAgICAgICAgICAgfSBcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgSG9tZS5wcmV2aW91c01vdXNlUG9zaXRpb24gPSB7XG4gICAgICAgICAgICAgICAgWDogSG9tZS5wcmV2aW91c01vdXNlUG9zaXRpb24uWCArIChkaWZmZXJlbmNlT2ZQb3NpdGlvbnMuWCAqIDAuMSksXG4gICAgICAgICAgICAgICAgWTogSG9tZS5wcmV2aW91c01vdXNlUG9zaXRpb24uWSArIChkaWZmZXJlbmNlT2ZQb3NpdGlvbnMuWSAqIDAuMSlcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgY29uc3QgeFNoaWZ0ID0gKEhvbWUucHJldmlvdXNNb3VzZVBvc2l0aW9uLlggLSAod2luZG93LmlubmVyV2lkdGggLyAyKSkgLyAod2luZG93LmlubmVyV2lkdGggLyAyIClcbiAgICAgICAgICAgIGNvbnN0IHlTaGlmdCA9ICgod2luZG93LmlubmVySGVpZ2h0IC8gMikgLSBIb21lLnByZXZpb3VzTW91c2VQb3NpdGlvbi5ZKSAvICh3aW5kb3cuaW5uZXJIZWlnaHQgLyAyIClcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgSG9tZS5kb20ucGhvbmUuc3R5bGUudHJhbnNmb3JtID0gYHJvdGF0ZVgoJHsxNSArIHlTaGlmdCo3fWRlZykgcm90YXRlWSgke3hTaGlmdCo2MCA+IDUwID8gNTAgOiB4U2hpZnQqNjB9ZGVnKWBcblxuICAgICAgICAgICAgY29uc3QgbXVsdGlwbGllciA9IDEwXG5cbiAgICAgICAgICAgIGlmKE1hdGguYWJzKGRpZmZlcmVuY2VPZlBvc2l0aW9ucy5YICsgZGlmZmVyZW5jZU9mUG9zaXRpb25zLlkpIDwgLjEpXG4gICAgICAgICAgICAgICAgSG9tZS50aWNrZXIgPSBmYWxzZVxuXG4gICAgICAgICAgICBpZihIb21lLnRpY2tlciA9PSB0cnVlKSBcbiAgICAgICAgICAgICAgICBIb21lLm1vdXNlTW92ZUFuaW1hdGlvbkZyYW1lID0gcmVxdWVzdEFuaW1hdGlvbkZyYW1lKEhvbWUucnVuTW91c2VNb3ZlKVxuXG4gICAgICAgIH0sXG5cblxuICAgIH1cblxuICAgIG1vZHVsZS5leHBvcnRzID0gSG9tZVxuXG59KCkpIiwiKGZ1bmN0aW9uICgpIHtcblxuICAgIHZhciBQbG90IFx0XHRcdD0gcmVxdWlyZSgnLi4vLi4vLi4vLi4vcGxvdC1jb3JlL3NyYy9qcy9wbG90JyksXG4gICAgXHROZXdzXG5cbiAgICAvL01heSB0aGlzIG9iamVjdCBhY3QgYXMgYSBndWlkZSB0byB1c2luZyBQbG90IGNvcmUgZnVuY3Rpb25zXG4gICAgLy9hbmQgaG93IHRvIHNldCB1cCBhamF4IGR5bmFtaWMgZGF0YSB3aXRoIG91ciBuZXcgcHJpbmNpcGxlcyB3aXRoIGVhc2VcbiAgICBOZXdzID0ge1xuXG4gICAgXHRtYXhQYWdlcyBcdFx0XHQ6IDEsXG4gICAgICAgIGN1cnJlbnROZXdzQ2F0ZWdvcnkgOiAwLFxuICAgICAgICBjdXJyZW50UGFnZSAgICAgICAgIDogMSxcbiAgICBcdGxvYWRNb3JlQnV0dG9uICBcdDogZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLkpTLS1uZXdzTG9hZE1vcmUnKSxcblxuICAgICAgICBpbml0OiAoKSA9PiB7XG5cbiAgICAgICAgICAgIGlmKE5ld3MubG9hZE1vcmVCdXR0b24pIHtcblxuICAgICAgICAgICAgXHROZXdzLnNob3dPckhpZGVMb2FkTW9yZUJ1dHRvbigpXG5cbiAgICAgICAgICAgICAgICBOZXdzLmNyZWF0ZUxpc3RlbmVycygpXG5cbiAgICAgICAgICAgIH1cblxuICAgICAgICB9LFxuXG4gICAgICAgIGNyZWF0ZUxpc3RlbmVyczogKCkgPT4ge1xuXG4gICAgICAgIFx0TmV3cy5sb2FkTW9yZUJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGUgPT4ge1xuXG4gICAgICAgIFx0XHRjb25zdCBuZXh0UGFnZSA9IHBhcnNlSW50KE5ld3MubG9hZE1vcmVCdXR0b24uZGF0YXNldC5uZXh0UGFnZSlcblxuICAgICAgICBcdFx0TmV3cy5jdXJyZW50UGFnZSA9IG5leHRQYWdlXG5cbiAgICAgICAgXHRcdE5ld3MubG9hZE5ld3ModHJ1ZSlcblxuICAgICAgICBcdFx0TmV3cy5sb2FkTW9yZUJ1dHRvbi5kYXRhc2V0Lm5leHRQYWdlID0gbmV4dFBhZ2UgKyAxXG5cbiAgICAgICAgXHR9KVxuXG4gICAgICAgIH0sXG5cbiAgICAgICAgbG9hZE5ld3MgOiBhcHBlbmQgPT4ge1xuXG4gICAgICAgIFx0Y29uc3QgYXJncyA9IHtcblx0XHRcdFx0dGVtcGxhdGVQYXJ0IDogJ3BhcnRzL25ld3MtbGlzdGluZycsIFxuXHRcdFx0XHRkYXRhIDoge1xuXHRcdFx0XHRcdCdwYWdlJyBcdFx0XHQ6IE5ld3MuY3VycmVudFBhZ2UsXG5cdFx0XHRcdFx0J2FydGlzdFR5cGUnXHQ6IE5ld3MuY3VycmVudE5ld3NDYXRlZ29yeVxuXHRcdFx0XHR9LFxuXHRcdFx0XHRhcHBlbmQgOiBhcHBlbmQgXG5cdFx0XHR9XG5cblx0XHRcdHJldHVybiBQbG90LmxvYWRUZW1wbGF0ZVBhcnQoYXJncykudGhlbihodG1sID0+IHtcblxuXHRcdFx0XHROZXdzLnNob3dPckhpZGVMb2FkTW9yZUJ1dHRvbigpXG5cbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZVxuXG5cdFx0XHR9KVxuXG4gICAgICAgIH0sXG5cbiAgICAgICAgc2hvd09ySGlkZUxvYWRNb3JlQnV0dG9uIDogKCkgPT4ge1xuXG4gICAgICAgIFx0Ly9DaGVjayBpZiBtYXggcGFnZXMgaXMgMS4gSWYgaXQgaXMsIHRoZXJlJ3Mgb25seSAxIHBhZ2Ugb2YgTmV3c1xuICAgICAgICBcdC8vc28gd2UgY2FuIGhpZGUgbG9hZCBtb3JlIGJ1dHRvblxuICAgICAgICBcdE5ld3MubWF4UGFnZXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuSlMtLW1heFBhZ2VzJykuZGF0YXNldC5tYXhQYWdlc1xuXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhOZXdzLm1heFBhZ2VzKVxuXG4gICAgICAgIFx0aWYoTmV3cy5tYXhQYWdlcyA+IE5ld3MuY3VycmVudFBhZ2UpXG4gICAgICAgIFx0XHROZXdzLmxvYWRNb3JlQnV0dG9uLmNsYXNzTGlzdC5yZW1vdmUoJ2hpZGRlbicpXG4gICAgICAgIFx0ZWxzZSBcbiAgICAgICAgXHRcdE5ld3MubG9hZE1vcmVCdXR0b24uY2xhc3NMaXN0LmFkZCgnaGlkZGVuJylcblxuICAgICAgICB9XG5cbiAgICB9XG5cbiAgICBtb2R1bGUuZXhwb3J0cyA9IE5ld3NcblxufSgpKSIsIihmdW5jdGlvbiAoKSB7XG5cbiAgICB2YXIgUHJpY2luZ1xuXG4gICAgUHJpY2luZyA9IHtcbiAgICAgICAgZG9tOiB7XG4gICAgICAgICAgICBjb250YWluZXIgICAgICAgIDogZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLkpTLS1Ub2dnbGVQcmljZScpLFxuICAgICAgICAgICAgYW5udWFsQnV0dG9uICAgICA6IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5KUy0tcGxhblRvZ2dsZS0tYW5udWFsJyksXG4gICAgICAgICAgICBtb250aGx5QnV0dG9uICAgIDogZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLkpTLS1wbGFuVG9nZ2xlLS1tb250aGx5JyksXG4gICAgICAgICAgICBjdXJyZW5jeVN5bWJvbHMgIDogQXJyYXkuZnJvbShkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuSlMtLWN1cnJlbmN5JykpLFxuICAgICAgICAgICAgcHJpY2VBbm51YWwgICAgICA6IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5KUy0tcHJpY2UtLWFubnVhbCcpLFxuICAgICAgICAgICAgcHJpY2VNb250aGx5ICAgICA6IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5KUy0tcHJpY2UtLW1vbnRobHknKSxcbiAgICAgICAgICAgIGFubnVhbFRvdGFsUHJpY2UgOiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuSlMtLWFubnVhbFRvdGFsJylcbiAgICAgICAgfSxcblxuICAgICAgICBpbml0OiAoKSA9PiB7XG5cbiAgICAgICAgICAgIC8vIFVwZGF0ZSBwcmljZSBpZiB1c2VyIGlzIGJhc2VkIGluIHRoZSBVU1xuICAgICAgICAgICAgUHJpY2luZy5jaGVja1VzZXJzQ291bnRyeSgpXG5cbiAgICAgICAgICAgIC8vIFVwZGF0ZSBkYXRhIHNldCB3aXRoIFxuICAgICAgICAgICAgUHJpY2luZy5kb20uYW5udWFsQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgUHJpY2luZy5zaG93QW5udWFsKVxuXG4gICAgICAgICAgICBQcmljaW5nLmRvbS5tb250aGx5QnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgUHJpY2luZy5zaG93TW9udGhseSlcbiAgICAgICAgICAgIFxuICAgICAgICB9LFxuXG4gICAgICAgIHNob3dBbm51YWw6ICgpID0+IHtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgaWYoUHJpY2luZy5kb20uY29udGFpbmVyLmRhdGFzZXQucGxhbiA9IFwiYW5udWFsXCIpIFxuICAgICAgICAgICAgICAgIHJldHVybjtcblxuICAgICAgICAgICAgUHJpY2luZy5kb20uY29udGFpbmVyLmRhdGFzZXQucGxhbiA9IFwiYW5uYXVsXCJcbiAgICAgICAgfSxcblxuICAgICAgICBzaG93TW9udGhseTogKCkgPT4ge1xuICAgICAgICAgICAgaWYoUHJpY2luZy5kb20uY29udGFpbmVyLmRhdGFzZXQucGxhbiA9IFwibW9udGhseVwiKSBcbiAgICAgICAgICAgICAgICByZXR1cm47XG5cbiAgICAgICAgICAgIFByaWNpbmcuZG9tLmNvbnRhaW5lci5kYXRhc2V0LnBsYW4gPSBcIm1vbnRobHlcIlxuICAgICAgICB9LFxuXG4gICAgICAgIGNoZWNrVXNlcnNDb3VudHJ5OiAoKSA9PiB7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGZldGNoKCdodHRwczovL2FwaS5pcHJlZ2lzdHJ5LmNvLz9rZXk9YnAxbDg4bGNwNjc4cTk2eicpXG4gICAgICAgICAgICAgICAgLnRoZW4ocmVzID0+IHJlcy5qc29uKCkpXG4gICAgICAgICAgICAgICAgLnRoZW4ocGF5bG9hZCA9PiB7XG4gICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICBpZihwYXlsb2FkLmxvY2F0aW9uLmNvdW50cnkuY29kZSA9PSAnVVMnKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIFN3aXRjaCB0byBkb2xsYXJcbiAgICAgICAgICAgICAgICAgICAgICAgIFByaWNpbmcuZG9tLmN1cnJlbmN5U3ltYm9scy5tYXAoc3ltYm9sID0+IHN5bWJvbC50ZXh0Q29udGVudCA9ICckJylcblxuICAgICAgICAgICAgICAgICAgICAgICAgUHJpY2luZy5kb20ucHJpY2VNb250aGx5LnRleHRDb250ZW50ID0gJzQwMCdcblxuICAgICAgICAgICAgICAgICAgICAgICAgUHJpY2luZy5kb20ucHJpY2VBbm51YWwudGV4dENvbnRlbnQgPSAnMzMzJ1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBQcmljaW5nLmRvbS5hbm51YWxUb3RhbFByaWNlLnRleHRDb250ZW50ID0gJyQ0MDAwJ1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIC5jYXRjaChlcnIgPT4gY29uc29sZS5sb2coZXJyKSlcblxuICAgICAgICB9XG5cblxuICAgIH1cblxuICAgIG1vZHVsZS5leHBvcnRzID0gUHJpY2luZ1xuXG59KCkpXG4iLCIoZnVuY3Rpb24gKCkge1xuXG4gICAgdmFyIFNjaGVkdWxlXG5cbiAgICBTY2hlZHVsZSA9IHtcbiAgICAgIGRheUJ1dHRvbnMgICAgICAgOiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuSlMtLXNjaGVkdWxlRGF5UGlja2VyQnV0dG9uJyksXG4gICAgICBjYWxlbmRhcnMgICAgICAgIDogZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnNjaGVkdWxlQ2FsZW5kYXJXcmFwJyksXG5cbiAgICAgICAgaW5pdDogKCkgPT4ge1xuXG4gICAgICAgICAgU2NoZWR1bGUuY3JlYXRlTGlzdGVuZXJzKClcbiAgICAgICAgICBTY2hlZHVsZS5jaGVja1RvU2VlSWZOYXZBcnJvd3NOZWVkZWQoKVxuXG4gICAgICAgIH0sXG5cbiAgICAgICAgY3JlYXRlTGlzdGVuZXJzOiAoKSA9PiB7XG5cbiAgICAgICAgICBmb3IodmFyIGRheUJ1dHRvbiBvZiBTY2hlZHVsZS5kYXlCdXR0b25zKSB7XG5cbiAgICAgICAgICAgIGRheUJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsZnVuY3Rpb24oKSB7XG5cbiAgICAgICAgICAgICAgU2NoZWR1bGUubG9hZE5ld0RhdGUodGhpcykgXG4gICAgICAgICAgICAgIFxuICAgICAgICAgICAgfSlcblxuICAgICAgICAgIH1cblxuICAgICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdyZXNpemUnLCgpID0+IHtcblxuICAgICAgICAgICAgU2NoZWR1bGUuY2hlY2tUb1NlZUlmTmF2QXJyb3dzTmVlZGVkKClcblxuICAgICAgICAgIH0pXG5cbiAgICAgICAgICBmb3IodmFyIGNhbGVuZGFyIG9mIFNjaGVkdWxlLmNhbGVuZGFycykge1xuXG4gICAgICAgICAgICBjb25zdCByaWdodEJ1dHRvbiAgICAgID0gY2FsZW5kYXIucXVlcnlTZWxlY3RvcignLkpTLS1zY2hlZHVsZVJpZ2h0JyksXG4gICAgICAgICAgICBsZWZ0QnV0dG9uICAgICAgICAgICAgID0gY2FsZW5kYXIucXVlcnlTZWxlY3RvcignLkpTLS1zY2hlZHVsZUxlZnQnKSxcbiAgICAgICAgICAgIHRyYWNrcyAgICAgICAgICAgICAgICAgPSBjYWxlbmRhci5xdWVyeVNlbGVjdG9yKCcuc2NoZWR1bGVDYWxlbmRhclRyYWNrcycpLFxuICAgICAgICAgICAgdHJhY2tzVyAgICAgICAgICAgICAgICA9IHRyYWNrcy5vZmZzZXRXaWR0aFxuXG4gICAgICAgICAgICByaWdodEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgICAgICAgICAgdHJhY2tzLnNjcm9sbEJ5KHtcbiAgICAgICAgICAgICAgICBsZWZ0OiB0cmFja3NXIC8gMixcbiAgICAgICAgICAgICAgICBiZWhhdmlvcjogJ3Ntb290aCdcbiAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIH0pXG5cbiAgICAgICAgICAgIGxlZnRCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICAgICAgICAgIHRyYWNrcy5zY3JvbGxCeSh7XG4gICAgICAgICAgICAgICAgbGVmdDogLXRyYWNrc1cgLyAyLFxuICAgICAgICAgICAgICAgIGJlaGF2aW9yOiAnc21vb3RoJ1xuICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgfVxuXG4gICAgICAgIH0sXG5cbiAgICAgICAgbG9hZE5ld0RhdGUgOiBlbGVtID0+IHtcblxuICAgICAgICAgIGZvcih2YXIgZEIgb2YgU2NoZWR1bGUuZGF5QnV0dG9ucykge1xuICAgICAgICAgICAgZEIuY2xhc3NMaXN0LnJlbW92ZSgnc2VsZWN0ZWQnKVxuICAgICAgICAgIH1cblxuICAgICAgICAgIGVsZW0uY2xhc3NMaXN0LmFkZCgnc2VsZWN0ZWQnKVxuXG4gICAgICAgICAgbGV0IGRheSA9IGVsZW0uZGF0YXNldC5zY2hlZHVsZURheSBcblxuICAgICAgICAgIGZvcih2YXIgY2FsZW5kYXIgb2YgU2NoZWR1bGUuY2FsZW5kYXJzKSB7XG5cbiAgICAgICAgICAgIGlmKGNhbGVuZGFyLmRhdGFzZXQuc2NoZWR1bGVEYXkgPT0gZGF5KVxuICAgICAgICAgICAgICBjYWxlbmRhci5jbGFzc0xpc3QucmVtb3ZlKCdoaWRkZW4nKVxuICAgICAgICAgICAgZWxzZSBcbiAgICAgICAgICAgICAgY2FsZW5kYXIuY2xhc3NMaXN0LmFkZCgnaGlkZGVuJylcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBTY2hlZHVsZS5jaGVja1RvU2VlSWZOYXZBcnJvd3NOZWVkZWQoKVxuXG4gICAgICAgIH0sXG5cbiAgICAgICAgY2hlY2tUb1NlZUlmTmF2QXJyb3dzTmVlZGVkIDogKCkgPT4geyBcblxuICAgICAgICAgIGZvcih2YXIgY2FsZW5kYXIgb2YgU2NoZWR1bGUuY2FsZW5kYXJzKSB7XG5cbiAgICAgICAgICAgIGlmKCFjYWxlbmRhci5jbGFzc0xpc3QuY29udGFpbnMoJ2hpZGRlbicpKSB7XG5cbiAgICAgICAgICAgICAgIGNvbnN0IHRyYWNrcyA9IGNhbGVuZGFyLnF1ZXJ5U2VsZWN0b3IoJy5zY2hlZHVsZUNhbGVuZGFyVHJhY2tzJylcblxuICAgICAgICAgICAgICAgaWYodHJhY2tzLnNjcm9sbFdpZHRoID4gY2FsZW5kYXIuc2Nyb2xsV2lkdGgpIHtcbiAgICAgICAgICAgICAgICAgIGNhbGVuZGFyLnF1ZXJ5U2VsZWN0b3IoJy5KUy0tc2NoZWR1bGVMZWZ0JykuY2xhc3NMaXN0LnJlbW92ZSgnaGlkZGVuJylcbiAgICAgICAgICAgICAgICAgIGNhbGVuZGFyLnF1ZXJ5U2VsZWN0b3IoJy5KUy0tc2NoZWR1bGVSaWdodCcpLmNsYXNzTGlzdC5yZW1vdmUoJ2hpZGRlbicpXG4gICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgY2FsZW5kYXIucXVlcnlTZWxlY3RvcignLkpTLS1zY2hlZHVsZUxlZnQnKS5jbGFzc0xpc3QuYWRkKCdoaWRkZW4nKVxuICAgICAgICAgICAgICAgICAgY2FsZW5kYXIucXVlcnlTZWxlY3RvcignLkpTLS1zY2hlZHVsZVJpZ2h0JykuY2xhc3NMaXN0LmFkZCgnaGlkZGVuJylcbiAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgfVxuXG4gICAgICAgIH1cblxuICAgIH1cblxuICAgIG1vZHVsZS5leHBvcnRzID0gU2NoZWR1bGVcblxufSgpKVxuXG4iXX0=
