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
"use strict";

(function () {
  var Flickity = require('flickity'),
      Carousels;

  Carousels = {
    init: function init() {
      Carousels.initialiseCarousel();
    },
    initialiseCarousel: function initialiseCarousel() {
      var carousels = document.querySelectorAll('.JS--carousel');
      carousels.forEach(function (carousel) {
        var settings = {
          cellAlign: 'center',
          wrapAround: true,
          autoPlay: false,
          imagesLoaded: true,
          pageDots: false
        };
        var slides = carousel.querySelectorAll('.JS--carousel__slideWrap');

        if (carousel.dataset.plotCarouselType == 'image') {
          settings = {
            cellAlign: 'center',
            lazyLoad: 2,
            wrapAround: true,
            pageDots: false
          };
        }

        if (slides.length > 1) {
          var flkty = new Flickity(carousel, settings);
        }
      });
    }
  };
  module.exports = Carousels;
})();

},{"flickity":10}],20:[function(require,module,exports){
"use strict";

(function () {
  var FAQs;
  FAQs = {
    sections: document.querySelectorAll('.faqs'),
    init: function init() {
      if (!FAQs.sections) return;
      FAQs.sections.forEach(function (section) {
        return FAQs.initialiseListeners(section);
      });
    },
    initialiseListeners: function initialiseListeners(section) {
      var faqs = section.querySelectorAll('.faq');
      faqs.forEach(function (faq) {
        var question = faq.querySelector('.faq__question');
        var answer = faq.querySelector('.faq__answer');
        question.addEventListener('click', function () {
          faq.classList.toggle('faq--open');

          if (faq.classList.contains('faq--open')) {
            answer.style.maxHeight = answer.scrollHeight + 'px';
          } else {
            answer.style.maxHeight = 0;
          }
        });
      });
    }
  };
  module.exports = FAQs;
})();

},{}],21:[function(require,module,exports){
"use strict";

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
(function () {
  var LazyLoad;
  LazyLoad = {
    mobileBreakpoint: 640,
    images: document.querySelectorAll('.JS--lazyLoad'),
    config: {
      rootMargin: '0px',
      threshold: 0.01
    },
    observer: null,
    init: function init() {
      LazyLoad.observer = new IntersectionObserver(LazyLoad.handleImageLoad, LazyLoad.config);
      LazyLoad.loadImages();
    },
    loadImages: function loadImages() {
      LazyLoad.images.forEach(function (image) {
        LazyLoad.observer.observe(image);
      });
    },
    addElements: function addElements(elements) {
      return new Promise(function (resolve, reject) {
        elements.forEach(function (image) {
          LazyLoad.observer.observe(image);
        });
        resolve();
      });
    },
    handleImageLoad: function handleImageLoad(entries) {
      entries.forEach(function (entry) {
        var element = entry.target;

        if (!element.classList.contains('loaded') && !element.classList.contains('loading')) {
          if (!entry.isIntersecting) return;
          element.classList.add('loading');
          var tag = entry.isIntersecting && element.tagName;
          var src = element.dataset.src;

          if (LazyLoad.isSmallScreen() && element.dataset.smallSrc) {
            src = element.dataset.smallSrc;
          }

          if (tag == "VIDEO") {
            if (LazyLoad.isSmallScreen() && element.dataset.smallSrc) {
              element.src = element.dataset.smallSrc;
            } else {
              element.src = element.dataset.src;
              if (element.getAttribute('autoplay')) element.play();
            }

            element.classList.add('loaded');
          } else {
            LazyLoad.getImage(src, element).then(function (data) {
              var tag = element.tagName;

              if (tag == "IMG") {
                data.element.src = data.src;
              } else {
                data.element.style.backgroundImage = 'url(' + data.src + ')';
              }

              data.element.classList.add('loaded');
              data.element.classList.remove('loading');
            })["catch"](function (erroredSrc) {
              console.log(erroredSrc, 'image not found');
            });
          }
        } else {
          if (element.tagName == "VIDEO") if (element.getAttribute('autoplay')) if (!entry.isIntersecting && element.paused == false) element.pause();else element.play();
        }
      });
    },
    getImage: function getImage(src, element) {
      return new Promise(function (resolve, reject) {
        var img = new Image();

        img.onload = function () {
          resolve({
            src: src,
            element: element
          });
        };

        img.onerror = function () {
          reject({
            src: src,
            element: element
          });
        };

        img.src = src;
      });
    },
    isSmallScreen: function isSmallScreen() {
      if (window.innerWidth < LazyLoad.mobileBreakpoint) return true;
      return false;
    }
  };
  module.exports = LazyLoad;
})();

},{}],22:[function(require,module,exports){
"use strict";

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

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
  var LazyLoad = require('./lazyload'),
      Plot = require('./plot'),
      BodyScrollLock = require('body-scroll-lock'),
      Modals;

  Modals = {
    currentGroupItem: 0,
    groupLinks: [],
    currentModalId: null,
    isOpen: false,
    isLoading: false,
    controlsTimer: false,
    modalContent: document.querySelector('.JS--plotModalReplaceContents'),
    modalGroupControls: document.querySelector('.JS--plotModalControls'),
    modalGroupNext: document.querySelector('.JS--plotModalControls__next'),
    modalGroupBack: document.querySelector('.JS--plotModalControls__back'),
    plotModal: document.querySelector('.JS--plotModal'),
    init: function init() {
      Modals.createListeners();
      Modals.checkForModalNotification();
    },
    createListeners: function createListeners() {
      var closeButtons = document.querySelectorAll('.JS--closePlotModal');

      var _iterator = _createForOfIteratorHelper(closeButtons),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var closeButton = _step.value;
          closeButton.addEventListener('click', function (e) {
            if (e.target !== this) return;
            Modals.closePlotModal();
          });
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }

      Modals.plotModal.addEventListener('mousemove', function () {
        if (Modals.currentModalId && !Plot.isTouchDevice()) {
          if (Modals.controlsTimer) clearTimeout(Modals.controlsTimer);
          if (Modals.plotModal.classList.contains('hideControls')) Modals.plotModal.classList.remove('hideControls');
          Modals.controlsTimer = setTimeout(function () {
            Modals.plotModal.classList.add('hideControls');
          }, 2200);
        }
      });
      document.querySelector('.siteWrap').addEventListener('click', function (e) {
        if (e.target.closest('[data-plot-modal]')) {
          e.preventDefault();
          Modals.openPlotModal(e.target.closest('[data-plot-modal]'));
        }
      });

      if (Modals.modalGroupBack) {
        Modals.modalGroupBack.addEventListener('click', Modals.triggerBackGroupItem);
      }

      if (Modals.modalGroupNext) {
        Modals.modalGroupNext.addEventListener('click', Modals.triggerNextGroupItem);
      }

      document.addEventListener('keydown', function (e) {
        if (e.which == 39 && Modals.groupLinks.length > 0) {
          Modals.triggerNextGroupItem();
        }

        if (e.which == 37 && Modals.groupLinks.length > 0) {
          Modals.triggerBackGroupItem();
        }

        if (Modals.isOpen && e.which == 27) {
          Modals.closePlotModal();
        }
      });
    },
    checkForModalNotification: function checkForModalNotification() {
      var notificationTrigger = document.querySelector('.JS--fakeButtonForModalNotifications');

      if (notificationTrigger) {
        if (sessionStorage.getItem('plotHasNotificationFired') !== "1") {
          sessionStorage.setItem('plotHasNotificationFired', '1');
          setTimeout(function () {
            Modals.openPlotModal(notificationTrigger);
          }, notificationTrigger.dataset.plotNotificationWait * 1000);
        }
      }
    },
    triggerBackGroupItem: function triggerBackGroupItem() {
      Modals.currentGroupItem--;

      if (Modals.currentGroupItem < 0) {
        Modals.currentGroupItem = Modals.groupLinks.length - 1;
      }

      Modals.openPlotModal(Modals.groupLinks[Modals.currentGroupItem]);
    },
    triggerNextGroupItem: function triggerNextGroupItem() {
      Modals.currentGroupItem++;

      if (Modals.currentGroupItem == Modals.groupLinks.length) {
        Modals.currentGroupItem = 0;
      }

      Modals.openPlotModal(Modals.groupLinks[Modals.currentGroupItem]);
    },
    openPlotModal: function openPlotModal(element) {
      if (Modals.isLoading == true) return false;
      var settings = {
        type: 'inline',
        // (inline|ajax) if the content is already in the dom or not
        groupId: '',
        //The optional ID of the group of modals used for gallery views
        contentsId: '',
        //The ID that references where, on the page, the content to use lives
        templatePart: '',
        //The template part to load, if AJAX
        ajaxData: {},
        //Data to send via AJAX
        modalClass: '' //A custom class to add to our modal

      };
      Modals.isLoading = true;

      if (element.dataset.plotModalType == 'ajax') {
        settings.type = 'ajax';
      }

      settings.contentsId = element.dataset.plotModalContents;
      settings.groupId = element.dataset.plotModalGroup;
      settings.templatePart = element.dataset.plotModalTemplatePart;
      settings.modalClass = element.dataset.plotModalClass;

      if (!settings.contentsId && settings.type == 'inline') {
        console.log('Inline Modals need a plot-modal-contents variable added');
        return false;
      }

      if (settings.type == 'ajax' && !settings.templatePart) {
        console.log('Ajax modals need a plot-modal-template-part variable added');
        return false;
      } //Check to see if it's part of a group


      if (Modals.groupLinks.length == 0 && settings.groupId) Modals.initialiseGroup(element);
      if (!settings.groupId) Modals.modalGroupControls.classList.add('hidden');

      if (settings.modalClass) {
        Modals.plotModal.classList.add(settings.modalClass);
      }

      if (settings.type == 'inline') {
        Modals.currentModalId = settings.contentsId; //Find content to insert in our modal

        var plotModalContents = document.querySelector('.JS--plotModalContents[data-plot-modal-contents="' + Modals.currentModalId + '"]');
        if (!plotModalContents.length == 0) return false;
        plotModalContents = plotModalContents.innerHTML;
        Modals.putContentsIntoModal(plotModalContents);
      } else {
        //AJAX loading content
        var ajaxData = {};
        document.body.classList.add('plotModalLoadingAjax');

        for (var key in element.dataset) {
          if (key.substring(0, 13) == 'plotModalData') {
            ajaxData[key.charAt(13).toLowerCase() + key.substring(14)] = element.dataset[key];
          }
        }

        var args = {
          returnOrWrite: 'return',
          templatePart: settings.templatePart,
          data: ajaxData
        };
        Plot.loadTemplatePart(args).then(function (html) {
          Modals.putContentsIntoModal(html);
        });
      }
    },
    putContentsIntoModal: function putContentsIntoModal(contents) {
      Modals.modalContent.style.minHeight = Modals.modalContent.clientHeight + 'px';
      Modals.modalContent.innerHTML = contents;
      BodyScrollLock.disableBodyScroll(Modals.plotModal);
      document.body.classList.add('plotModalInView');
      var newImages = Modals.modalContent.querySelectorAll('img');
      LazyLoad.addElements(newImages).then(function () {
        setTimeout(function () {
          Modals.modalContent.style.minHeight = 0;
        }, 50);
      });
      var newVideos = Modals.modalContent.querySelectorAll('video');
      newVideos.forEach(function (video) {
        var player = new MediaElementPlayer(video);
        player.play();
      });
      Modals.isOpen = true;
      Modals.isLoading = false;
      document.body.classList.remove('plotModalLoadingAjax');
    },
    initialiseGroup: function initialiseGroup(element) {
      Modals.groupLinks = document.querySelectorAll('[data-plot-modal-group="' + element.dataset.plotModalGroup + '"]');
      var i = 0;

      var _iterator2 = _createForOfIteratorHelper(Modals.groupLinks),
          _step2;

      try {
        for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
          var groupLink = _step2.value;
          if (element == groupLink) Modals.currentGroupItem = i;
          i++;
        }
      } catch (err) {
        _iterator2.e(err);
      } finally {
        _iterator2.f();
      }

      if (Modals.currentModalId && !Plot.isTouchDevice()) Modals.controlsTimer = setTimeout(function () {
        Modals.plotModal.classList.add('hideControls');
      }, 3000);
      Modals.modalGroupControls.classList.remove('hidden');
    },
    closePlotModal: function closePlotModal() {
      document.body.classList.remove('plotModalInView');
      Modals.currentModalId = null;
      Modals.plotModal.classList = 'JS--plotModal plotModal';
      Modals.groupLinks = [];
      Modals.currentGroupItem = 0;
      Modals.modalContent.innerHTML = '';
      BodyScrollLock.enableBodyScroll(Modals.plotModal);
      Modals.isOpen = false;
    }
  };
  module.exports = Modals;
})();

},{"./lazyload":21,"./plot":24,"body-scroll-lock":1}],23:[function(require,module,exports){
"use strict";

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

(function () {
  var Smooth;
  Smooth = {
    trackedElementsObserver: null,
    standardScrollFramesObserver: null,
    mainScrollAnimationFrame: null,
    currentPosition: 0,
    mutationObserverDebounce: null,
    onScrollCallbackThrottler: null,
    ease: 0.07,
    lastPosition: 0,
    onScroll: null,
    standardScroll: false,
    scrollElements: [],
    topBarHeight: 0,
    scrollFrames: [],
    ticking: false,
    dom: {
      scrollWindow: document.querySelector('[data-plot-smooth-scroll]'),
      scrollFrames: document.querySelectorAll('[data-plot-smooth-scroll-frame]'),
      scrollElements: document.querySelectorAll('[data-plot-smooth-scroll-element]'),
      topBar: document.querySelector('[data-plot-smooth-scroll-topbar')
    },
    windowHeight: window.innerHeight,
    windowWidth: window.innerWidth,
    init: function init(settings) {
      //override any default settings with passed parameters
      Smooth.setSettings(settings);

      if (!Smooth.standardScroll) {
        //Set our current and last positions 
        //to the current scroll Y position, in case
        //we are scrolled down the page on load
        Smooth.currentPosition = window.scrollY;
        Smooth.lastPosition = window.scrollY; //Put fixed onto the whole site ready to 
        //intercept scrolling

        Smooth.setStyles();
        window.addEventListener('resize', Smooth.refresh, {
          passive: true
        });
        window.addEventListener('scroll', Smooth.scroll, {
          passive: true
        }); //Read through each scroll frame and set data
        //into a single array for processing later
        //{
        //      element           : element,      (the dom element)
        //      top               : 100,          (the offset top value without transforms, in pixels)
        //      height            : 300,          (the height of the element without transforms, in pixels)
        //      bottom            : 400,          (the offset bottom position value without transforms, in pixels)
        //      sticky            : false,        (if the element should behave like CSS sticky or not)
        //      parentBottom      : false || 500  (if the element is sticky, return the bottom position of its parent in pixels (when it should unstick))
        //  }

        Smooth.setScrollFrameData();
      } //If any scroll elements exist, we can add them and monitor them


      if (Smooth.dom.scrollElements) {
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
        Smooth.trackedElementsObserver = new IntersectionObserver(Smooth.trackVisibleElements, {
          rootMargin: '0px',
          threshold: 0.01
        });
        Smooth.setScrollElementData();
      } //Set up a mutation observer to listen out for changes in height,
      //to adjust our height of document accordingly


      Smooth.initMutationObserver(); //If there's a fixed topbar on this site, we can set the height
      //here, in order to offset any sticky positions. 

      Smooth.setTopBarHeight(); //If it's not standard scroll, set our initial scroll frame positions

      if (!Smooth.standardScroll) {
        Smooth.setPositionOfFrames();
      } else {
        Smooth.standardScrollFramesObserver = new IntersectionObserver(Smooth.trackStandardScrollFrames, {
          rootMargin: '0px',
          threshold: 0.01
        });

        var _iterator = _createForOfIteratorHelper(Smooth.dom.scrollFrames),
            _step;

        try {
          for (_iterator.s(); !(_step = _iterator.n()).done;) {
            var frame = _step.value;
            Smooth.standardScrollFramesObserver.observe(frame);
          }
        } catch (err) {
          _iterator.e(err);
        } finally {
          _iterator.f();
        }
      } //Set our position of any scroll elements


      Smooth.positionScrollElements();
    },
    setSettings: function setSettings(settings) {
      if (!settings) return true;
      if (typeof settings.onScroll == 'function') Smooth.onScroll = settings.onScroll;
      if (settings.standardScroll == true) Smooth.standardScroll = true;
      if (settings.ease) Smooth.ease = settings.ease;
    },
    retriggerWindowSizeOnMutate: function retriggerWindowSizeOnMutate(mutationsList, observer) {
      if (!Smooth.mutationObserverDebounce) {
        Smooth.mutationObserverDebounce = setTimeout(function () {
          var changed = false;
          Smooth.scrollFrames.forEach(function (frame) {
            if (frame.height != frame.element.clientHeight) changed = true;
          });
          if (changed == true) Smooth.refresh();
          clearTimeout(Smooth.mutationObserverDebounce);
          Smooth.mutationObserverDebounce = null;
        }, 200);
      }
    },
    initMutationObserver: function initMutationObserver() {
      var _iterator2 = _createForOfIteratorHelper(Smooth.dom.scrollFrames),
          _step2;

      try {
        for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
          var scrollFrame = _step2.value;
          var observer = new MutationObserver(Smooth.retriggerWindowSizeOnMutate);
          observer.observe(scrollFrame, {
            childList: true,
            attributes: true,
            subtree: true
          });
        }
      } catch (err) {
        _iterator2.e(err);
      } finally {
        _iterator2.f();
      }
    },
    destroy: function destroy() {
      Smooth.scrollElements.forEach(function (entry) {
        entry.element.removeAttribute('style');
      });
      Smooth.scrollFrames.forEach(function (entry) {
        entry.element.removeAttribute('style');
      });
      Smooth.trackedElementsObserver = null;
      Smooth.mainScrollAnimationFrame = null;
      Smooth.currentPosition = 0;
      Smooth.mutationObserverDebounce = null;
      Smooth.onScrollCallbackThrottler = null;
      Smooth.ease = 0.07;
      Smooth.lastPosition = 0;
      Smooth.onScroll = null;
      Smooth.standardScroll = false;
      Smooth.scrollElements = [];
      Smooth.topBarHeight = 0;
      Smooth.scrollFrames = [];
      Smooth.ticking = false;
      Smooth.dom.scrollWindow.removeAttribute('style');
    },
    addElements: function addElements(elements) {
      return new Promise(function (resolve, reject) {
        elements.forEach(function (element) {
          Smooth.trackedElementsObserver.observe(element);
        });
        resolve();
      });
    },
    scrollTo: function scrollTo(element) {
      window.scrollTo(0, Smooth.exactPositionOfElement(element) - 100);

      if (Smooth.standardScroll != false) {
        Smooth.ticking = true;
        Smooth.mainScrollAnimationFrame = requestAnimationFrame(Smooth.run);
      }
    },
    setScrollElementData: function setScrollElementData() {
      Smooth.dom.scrollElements = document.querySelectorAll('[data-plot-smooth-scroll-element]');
      Smooth.addElements(Smooth.dom.scrollElements);
      if (!Smooth.dom.scrollElements) return false;
      Smooth.scrollElements = [];
      Smooth.dom.scrollElements.forEach(function (element, i) {
        var elementTop = Smooth.exactPositionOfElement(element);
        var height = element.clientHeight;
        var callback = false,
            fromValue = -1,
            toValue = 1; //Is anything set on this element as a callback?

        if (element.dataset.plotSmoothScrollElement) {
          var c = element.dataset.plotSmoothScrollElement; //First up - have values been passed to this callback in this form: callback(2,5)

          var values = c.substring(c.indexOf('(') + 1, c.indexOf(')'));
          values = values.split(','); //Valid if we have 2, and from is less that to value

          if (values.length == 2 && values[0] < values[1]) {
            fromValue = Number(values[0]);
            toValue = Number(values[1]);
          }

          var potentialFunction = window[c];

          if (typeof potentialFunction === "function") {
            callback = potentialFunction.replace(/\s*\(.*?\)\s*/g, '');
          } else {
            var callbackSplit = c.replace(/\s*\(.*?\)\s*/g, '').split('.');

            if (callbackSplit.length == 2) {
              potentialFunction = window[callbackSplit[0]][callbackSplit[1]];

              if (typeof potentialFunction === "function") {
                callback = potentialFunction;
              }
            }
          }
        }

        var initialOffset = 0;
        if (elementTop < Smooth.windowHeight) initialOffset = (elementTop + height) / (Smooth.windowHeight + height) * (toValue - fromValue) + fromValue;
        Smooth.scrollElements[i] = {
          element: element,
          top: elementTop,
          height: height,
          bottom: elementTop + element.clientHeight,
          isVisible: elementTop < Smooth.currentPosition + Smooth.windowHeight && elementTop + height > Smooth.currentPosition,
          initialOffset: initialOffset,
          callback: callback,
          fromValue: fromValue,
          toValue: toValue,
          currentPosition: 0
        };
        element.dataset.plotSmoothScrollElementId = i;
      });
    },
    setTopBarHeight: function setTopBarHeight() {
      if (Smooth.dom.topBar) Smooth.topBarHeight = Smooth.dom.topBar.clientHeight;
    },
    setScrollFrameData: function setScrollFrameData() {
      Smooth.dom.scrollFrames = document.querySelectorAll('[data-plot-smooth-scroll-frame]');
      Smooth.scrollFrames = [];
      var newHeight = 0;
      Smooth.dom.scrollFrames.forEach(function (element) {
        var elementTop = Smooth.exactPositionOfElement(element);
        Smooth.scrollFrames.push({
          element: element,
          top: elementTop,
          height: element.clientHeight,
          bottom: elementTop + element.clientHeight,
          sticky: typeof element.dataset.plotSmoothScrollSticky != 'undefined' ? true : false,
          parentBottom: element.parentElement ? Smooth.exactPositionOfElement(element.parentElement) + element.parentElement.getBoundingClientRect().height : false
        });
      });
      document.body.style.height = "".concat(Smooth.dom.scrollWindow.scrollHeight, "px");
    },
    trackVisibleElements: function trackVisibleElements(entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting && entry) {
          entry.target.classList.add('plotSmoothScrollInView', 'plotSmoothScrollSeenOnce');
        } else {
          entry.target.classList.remove('plotSmoothScrollInView');
        }

        if (Smooth.scrollElements[entry.target.dataset.plotSmoothScrollElementId]) Smooth.scrollElements[entry.target.dataset.plotSmoothScrollElementId].isVisible = entry.isIntersecting;
      });
    },
    trackStandardScrollFrames: function trackStandardScrollFrames(entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting && entry) {
          entry.target.classList.add('plotSmoothScrollFrameInView', 'plotSmoothScrollFrameSeenOnce');
        } else {
          entry.target.classList.remove('plotSmoothScrollFrameInView');
        }
      });
    },
    refresh: function refresh() {
      if (Smooth.standardScroll) return true;
      Smooth.windowHeight = window.innerHeight;
      Smooth.windowWidth = window.innerWidth;
      Smooth.setScrollElementData();
      Smooth.setScrollFrameData();
      Smooth.setTopBarHeight();
      Smooth.scroll();
    },
    run: function run() {
      Smooth.lastPosition = Smooth.lerp(Smooth.lastPosition, Smooth.currentPosition, Smooth.ease);
      if (Smooth.lastPosition < .1) Smooth.lastPosition = 0;
      var diff = Smooth.currentPosition - Smooth.lastPosition;

      if (Math.abs(diff) < 0.5) {
        Smooth.ticking = false;
        diff = 0;
      }

      var velocity = diff / Smooth.windowWidth;
      Smooth.setPositionOfFrames();
      Smooth.fireOnScrollEvent(velocity);
      Smooth.positionScrollElements();
      if (Smooth.ticking == true) Smooth.mainScrollAnimationFrame = requestAnimationFrame(Smooth.run);
    },
    positionScrollElements: function positionScrollElements() {
      Smooth.scrollElements.forEach(function (entry) {
        if (entry.isVisible == true && entry.callback) {
          var currentPosition = (entry.top - Smooth.lastPosition + entry.height) / (Smooth.windowHeight + entry.height) * (entry.toValue - entry.fromValue) + entry.fromValue - entry.initialOffset;

          if (entry.currentPosition != currentPosition) {
            entry.currentPosition = currentPosition;
            entry.callback(entry.element, currentPosition);
          }
        }
      });
    },
    fireOnScrollEvent: function fireOnScrollEvent(velocity) {
      if (typeof Smooth.onScroll == 'function') if (Smooth.onScrollCallbackThrottler === null) {
        Smooth.onScrollCallbackThrottler = setTimeout(function () {
          Smooth.onScroll(Smooth.dom.scrollFrames, velocity);
          Smooth.onScrollCallbackThrottler = null;
        }, 50);
      }
    },
    setPositionOfFrames: function setPositionOfFrames() {
      var _iterator3 = _createForOfIteratorHelper(Smooth.scrollFrames),
          _step3;

      try {
        for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
          var scrollFrame = _step3.value;
          var windowScrollPosition = Smooth.lastPosition;

          if (scrollFrame.sticky && scrollFrame.parentBottom) {
            windowScrollPosition = Smooth.calcPositionOfStickyElement(scrollFrame, windowScrollPosition);
          }

          if (windowScrollPosition > scrollFrame.bottom || windowScrollPosition + Smooth.windowHeight < scrollFrame.top) {
            scrollFrame.element.classList.remove('plotSmoothScrollFrameInView');
          } else {
            scrollFrame.element.classList.add('plotSmoothScrollFrameInView', 'plotSmoothScrollFrameSeenOnce');
            scrollFrame.element.style.transform = "translate3d(0, -".concat(windowScrollPosition, "px, 0)");
          }
        }
      } catch (err) {
        _iterator3.e(err);
      } finally {
        _iterator3.f();
      }
    },
    scroll: function scroll() {
      Smooth.currentPosition = window.scrollY;

      if (Smooth.ticking == false) {
        Smooth.ticking = true;
        Smooth.mainScrollAnimationFrame = requestAnimationFrame(Smooth.run);
      }
    },
    setStyles: function setStyles() {
      Object.assign(Smooth.dom.scrollWindow.style, {
        position: 'fixed',
        top: 0,
        left: 0,
        height: '100%',
        width: '100%',
        overflow: 'hidden'
      });
    },
    calcPositionOfStickyElement: function calcPositionOfStickyElement(entry, position) {
      //If the item is below the bottom of it's parent
      if (position + Smooth.topBarHeight >= entry.parentBottom) return position;

      if (entry.parentBottom - position - Smooth.topBarHeight <= entry.height) {
        return entry.top - entry.parentBottom + position + entry.height;
      }

      if (position + Smooth.topBarHeight > entry.top) return entry.top - Smooth.topBarHeight;
      return position;
    },
    lerp: function lerp(a, b, n) {
      return (1 - n) * a + n * b;
    },
    exactPositionOfElement: function exactPositionOfElement(element) {
      var el = element,
          offsetTop = 0;

      do {
        offsetTop += el.offsetTop;
        el = el.offsetParent;
      } while (el);

      return offsetTop;
    }
  };
  module.exports = Smooth;
})();

},{}],24:[function(require,module,exports){
"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

(function () {
  var BodyScrollLock = require('body-scroll-lock'),
      LazyLoad = require('./lazyload'),
      SyncScroll = require('./syncscroll'),
      Plot;

  Plot = {
    init: function init() {
      Plot.createListeners();
      SyncScroll.init();
      Plot.animateBannerNotifications();
    },
    createListeners: function createListeners() {
      var burgerMenuTriggers = document.querySelectorAll('.JS--menuTrigger');

      if (burgerMenuTriggers.length > 0) {
        var _iterator = _createForOfIteratorHelper(burgerMenuTriggers),
            _step;

        try {
          for (_iterator.s(); !(_step = _iterator.n()).done;) {
            var burgerMenuTrigger = _step.value;
            burgerMenuTrigger.addEventListener('click', Plot.toggleBurger);
          }
        } catch (err) {
          _iterator.e(err);
        } finally {
          _iterator.f();
        }
      }

      var sideSwipes = document.querySelectorAll('.plotSideSwipes');

      if (sideSwipes.length > 0) {
        Plot.sideSwipes(sideSwipes);
      }
    },
    animateBannerNotifications: function animateBannerNotifications() {
      var banner = document.querySelector('.JS--bannerNotification');
      if (banner) if (banner.dataset.animationType == 'always') {
        Plot.buildBannerRepeatingText(banner);
        window.addEventListener('resize', function () {
          Plot.buildBannerRepeatingText(banner);
        });
      } else {
        Plot.checkToSeeIfWeNeedToAnimationBanner(banner);
        window.addEventListener('resize', function () {
          Plot.checkToSeeIfWeNeedToAnimationBanner(banner);
        });
      }
    },
    checkToSeeIfWeNeedToAnimationBanner: function checkToSeeIfWeNeedToAnimationBanner(banner) {
      banner.innerHTML = "<div>".concat(banner.dataset.message, "</div>");
      var div1 = banner.querySelector('div:nth-of-type(1)');
      var windowWidth = window.innerWidth;

      if (div1.scrollWidth > windowWidth) {
        banner.classList.add('withAnimation');
        Plot.buildBannerRepeatingText(banner);
      } else {
        banner.classList.remove('withAnimation');
      }
    },
    buildBannerRepeatingText: function buildBannerRepeatingText(banner) {
      banner.innerHTML = "<div>".concat(banner.dataset.message, "</div><div>").concat(banner.dataset.message, "</div>");
      var div1 = banner.querySelector('div:nth-of-type(1)');
      var div2 = banner.querySelector('div:nth-of-type(2)');
      var windowWidth = window.innerWidth;
      div1.style.animationDuration = windowWidth / 20 + "s";
      div2.style.animationDuration = windowWidth / 20 + "s";
      var i = 0;

      while (div1.scrollWidth < windowWidth && i < 100) {
        div1.innerHTML = div1.innerHTML + " ".concat(banner.dataset.message);
        div2.innerHTML = div2.innerHTML + " ".concat(banner.dataset.message);
        i++;
      }
    },
    sideSwipes: function sideSwipes(_sideSwipes) {
      var _iterator2 = _createForOfIteratorHelper(_sideSwipes),
          _step2;

      try {
        for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
          var sideSwipe = _step2.value;

          if (parseInt(sideSwipe.getBoundingClientRect().width) + 1 < parseInt(sideSwipe.scrollWidth)) {}
        }
      } catch (err) {
        _iterator2.e(err);
      } finally {
        _iterator2.f();
      }
    },
    toggleBurger: function toggleBurger() {
      var burgerMenu = document.querySelector('.JS--burgerMenu');

      if (!document.documentElement.classList.contains('burgerOpen')) {
        document.documentElement.classList.add('burgerOpen');
        BodyScrollLock.disableBodyScroll(burgerMenu);
      } else {
        document.documentElement.classList.remove('burgerOpen');
        BodyScrollLock.enableBodyScroll(burgerMenu);
      }
    },
    isPage: function isPage(slug) {
      return document.body.classList.contains('page-' + slug);
    },
    fixVh: function fixVh() {
      // First we get the viewport height and we multiple it by 1% to get a value for a vh unit
      var vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', "".concat(vh, "px"));
    },
    isTouchDevice: function isTouchDevice() {
      var prefixes = ' -webkit- -moz- -o- -ms- '.split(' ');

      var mq = function mq(query) {
        return window.matchMedia(query).matches;
      };

      if ('ontouchstart' in window || window.DocumentTouch && document instanceof DocumentTouch) {
        document.body.addClass('isTouchDevice');
        return true;
      }

      var query = ['(', prefixes.join('touch-enabled),('), 'plot', ')'].join('');
      return mq(query);
    },
    areWeAtTheTop: function areWeAtTheTop(scrollTop) {
      if (scrollTop > 0) {
        document.body.classList.add('scrolled');
      } else {
        document.body.classList.remove('scrolled');
      }
    },
    loadTemplatePart: function loadTemplatePart(args) {
      var defaults = {
        templatePart: null,
        action: 'plotLoadTemplatePart',
        //This is the action fired into our PlotSite PHP setup.php file
        data: {},
        returnOrWrite: 'write',
        //(write|return) either adds content to contentArea, or returns new HTML in the promise
        contentArea: '.JS--ajaxTargetArea',
        append: false
      };
      var settings = Object.assign({}, defaults, args);

      try {
        if (settings.returnOrWrite == 'write') var contentArea = document.querySelector(settings.contentArea);
      } catch (e) {
        console.log('contentArea needs to be a valid selector!');
        return false;
      }

      if (contentArea == null && settings.returnOrWrite == 'write') {
        console.log('Couldn\'t find selector for contentArea on page.');
        return false;
      }

      if (settings.templatePart == null) {
        console.log('Couldn\'t find template part. Make sure you set one as templatePart, for example parts/ajax-content');
        return false;
      }

      if (typeof settings.append !== "boolean") {
        console.log('Value passed to append was not a boolean.');
        return false;
      }

      if (settings.returnOrWrite == 'write') contentArea.classList.add('plotLoading');
      settings.data = {
        data: settings.data,
        action: settings.action,
        templatePart: settings.templatePart
      };
      var queryString = Plot.toQueryString(settings.data);
      return fetch(au, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'
        },
        body: queryString,
        credentials: 'same-origin'
      }).then(function (data) {
        return data.json();
      }).then(function (result) {
        if (settings.returnOrWrite == 'write') contentArea.classList.remove('plotLoading');

        if (result.success) {
          if (settings.returnOrWrite !== 'write') return result.html;

          if (settings.append) {
            contentArea.insertAdjacentHTML('beforeend', result.html);
          } else {
            contentArea.innerHTML = result.html;
          }

          contentArea.querySelectorAll('.JS--lazyLoad').forEach(function (el) {
            LazyLoad.observer.observe(el);
          });
          return result.html;
        }
      })["catch"](function (error) {
        console.log('error', error);
      });
    },
    dateFormat: function dateFormat(date, format) {
      if (format == 'dS M') return date.getDate() + Plot.getOrdinal(date.getDate()) + ' ' + Plot.getMonth(date);
      if (format == 'M dS') return Plot.getMonth(date) + ' ' + date.getDate() + Plot.getOrdinal(date.getDate());
      if (format == 'd/m/y') return date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear().toString().substr(-2);
      if (format == 'm/d/y') return date.getMonth() + 1 + '/' + date.getDate() + '/' + date.getFullYear().toString().substr(-2);
      return Plot.getDayOfWeek(date);
    },
    getDayOfWeek: function getDayOfWeek(date) {
      var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
      return days[date.getDay()];
    },
    getOrdinal: function getOrdinal(number) {
      if (number > 3 && number < 21) return 'th';

      switch (number % 10) {
        case 1:
          return "st";

        case 2:
          return "nd";

        case 3:
          return "rd";

        default:
          return "th";
      }
    },
    getMonth: function getMonth(date) {
      var monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
      return monthNames[date.getMonth()];
    },
    toQueryString: function toQueryString(obj, prefix) {
      var str = [],
          k,
          v;

      for (var p in obj) {
        if (!obj.hasOwnProperty(p)) {
          continue;
        } // skip things from the prototype


        if (~p.indexOf('[')) {
          k = prefix ? prefix + "[" + p.substring(0, p.indexOf('[')) + "]" + p.substring(p.indexOf('[')) : p;
        } else {
          k = prefix ? prefix + "[" + p + "]" : p;
        }

        v = obj[p];
        str.push(_typeof(v) == "object" ? Plot.toQueryString(v, k) : encodeURIComponent(k) + "=" + encodeURIComponent(v));
      }

      return str.join("&");
    }
  };
  module.exports = Plot;
})();

},{"./lazyload":21,"./syncscroll":25,"body-scroll-lock":1}],25:[function(require,module,exports){
"use strict";

(function () {
  var Syncscroll;
  Syncscroll = {
    init: function init() {
      var Width = 'Width',
          Height = 'Height',
          Top = 'Top',
          Left = 'Left',
          scroll = 'scroll',
          client = 'client',
          EventListener = 'EventListener',
          addEventListener = 'add' + EventListener,
          length = 'length',
          Math_round = Math.round,
          names = {},
          reset = function reset() {
        var elems = document.getElementsByClassName('sync' + scroll); // clearing existing listeners

        var i, j, el, found, name;

        for (name in names) {
          if (names.hasOwnProperty(name)) {
            for (i = 0; i < names[name][length]; i++) {
              names[name][i]['remove' + EventListener](scroll, names[name][i].syn, 0);
            }
          }
        } // setting-up the new listeners


        for (i = 0; i < elems[length];) {
          found = j = 0;
          el = elems[i++];

          if (!(name = el.getAttribute('name'))) {
            // name attribute is not set
            continue;
          }

          el = el[scroll + 'er'] || el; // needed for intence
          // searching for existing entry in array of names;
          // searching for the element in that entry

          for (; j < (names[name] = names[name] || [])[length];) {
            found |= names[name][j++] == el;
          }

          if (!found) {
            names[name].push(el);
          }

          el.eX = el.eY = 0;

          (function (el, name) {
            el[addEventListener](scroll, el.syn = function () {
              var elems = names[name];
              var scrollX = el[scroll + Left];
              var scrollY = el[scroll + Top];
              var xRate = scrollX / (el[scroll + Width] - el[client + Width]);
              var yRate = scrollY / (el[scroll + Height] - el[client + Height]);
              var updateX = scrollX != el.eX;
              var updateY = scrollY != el.eY;
              var otherEl,
                  i = 0;
              el.eX = scrollX;
              el.eY = scrollY;

              for (; i < elems[length];) {
                otherEl = elems[i++];

                if (otherEl != el) {
                  if (updateX && Math_round(otherEl[scroll + Left] - (scrollX = otherEl.eX = Math_round(xRate * (otherEl[scroll + Width] - otherEl[client + Width]))))) {
                    otherEl[scroll + Left] = scrollX;
                  }

                  if (updateY && Math_round(otherEl[scroll + Top] - (scrollY = otherEl.eY = Math_round(yRate * (otherEl[scroll + Height] - otherEl[client + Height]))))) {
                    otherEl[scroll + Top] = scrollY;
                  }
                }
              }
            }, 0);
          })(el, name);
        }
      };

      if (document.readyState == "complete") {
        reset();
      } else {
        window[addEventListener]("load", reset, 0);
      }
    }
  };
  module.exports = Syncscroll;
})();

},{}],26:[function(require,module,exports){
"use strict";

(function () {
  var RollerText;
  RollerText = {
    phrases: ['multi-day', 'weekend', 'boutique', 'country', 'holiday', 'rock', 'city', 'dance', 'post-punk', 'family', 'metal', 'jazz', 'weird', 'special', 'classical', 'winter'],
    dom: {
      textWrap: document.querySelector('.rollerText'),
      current: document.querySelector('[data-text-current]'),
      next: document.querySelector('[data-text-next]')
    },
    intervalLength: 1500,
    nextPhrase: 'winter',
    counter: null,
    ticker: false,
    init: function init() {
      if (RollerText.dom.textWrap) RollerText.startcounter();
    },
    startcounter: function startcounter() {
      RollerText.setWidth(RollerText.dom.current);
      var i = 1;
      RollerText.counter = setInterval(function () {
        var currentPhrase = RollerText.phrases[i];
        var nextPhrase = RollerText.phrases[i + 1] ? RollerText.phrases[i + 1] : RollerText.phrases[0];
        RollerText.dom.textWrap.classList.add('turn');
        RollerText.setWidth(RollerText.dom.next);
        setTimeout(function () {
          RollerText.dom.textWrap.classList.remove('turn'); // Update mobile screen image

          RollerText.dom.current.textContent = currentPhrase;
          RollerText.dom.next.textContent = nextPhrase;
        }, 1000); // If we reach the end of the themes, reset to first theme

        i >= RollerText.phrases.length - 1 ? i = 0 : i++;
      }, RollerText.intervalLength);
    },
    setWidth: function setWidth(element) {
      var textWidth = element.getBoundingClientRect().width;
      RollerText.dom.textWrap.style.width = "".concat(textWidth, "px");
    }
  };
  module.exports = RollerText;
})();

},{}],27:[function(require,module,exports){
"use strict";

(function () {
  var TogglePrice;
  TogglePrice = {
    dom: {
      container: document.querySelector('.JS--TogglePrice'),
      annualButton: document.querySelector('.JS--planToggle--annual'),
      monthlyButton: document.querySelector('.JS--planToggle--monthly')
    },
    init: function init() {
      // Update data set with 
      TogglePrice.dom.annualButton.addEventListener('click', TogglePrice.showAnnual);
      console.log(TogglePrice.dom);
      TogglePrice.dom.monthlyButton.addEventListener('click', TogglePrice.showMonthly);
    },
    showAnnual: function showAnnual() {
      if (TogglePrice.dom.container.dataset.plan = "annual") return;
      TogglePrice.dom.container.dataset.plan = "annaul";
    },
    showMonthly: function showMonthly() {
      if (TogglePrice.dom.container.dataset.plan = "monthly") return;
      TogglePrice.dom.container.dataset.plan = "monthly";
    }
  };
  module.exports = TogglePrice;
})();

},{}],28:[function(require,module,exports){
"use strict";

(function () {
  'use strict';

  var Plot = require('../../../plot-core/src/js/plot'),
      LazyLoad = require('../../../plot-core/src/js/lazyload'),
      Modals = require('../../../plot-core/src/js/modals'),
      Carousels = require('../../../plot-core/src/js/carousels'),
      Smooth = require('../../../plot-core/src/js/plot-smooth-scroll'),
      FAQs = require('../../../plot-core/src/js/faqs'),
      // CustomMouse 	= require('../../../plot-core/src/js/custom-mouse'),
  Home = require('./pages/home'),
      RollerText = require('./components/roller-text'),
      TogglePrice = require('./components/toggle-price'),
      Artists = require('./pages/artists'),
      Schedule = require('./pages/schedule'),
      News = require('./pages/news'),
      Main;

  Main = {
    init: function init() {
      Main.initalizeSmooth();
      Plot.init();
      LazyLoad.init();
      Modals.init();
      Carousels.init();
      FAQs.init();
      RollerText.init(); // CustomMouse.init({
      // 	'a' 				: 'anchorHover',
      // 	'.altHoverTarget'	: 'altHover'
      // })
      //Pages

      if (Plot.isPage('home')) Home.init();
      if (Plot.isPage('schedule')) Schedule.init();
      if (Plot.isPage('artists')) Artists.init();
      if (Plot.isPage('pricing')) TogglePrice.init();
      News.init();
      Main.demoAjaxButton();
    },
    initalizeSmooth: function initalizeSmooth() {
      var hasSmoothScroll = document.body.dataset.plotCustomizerSmoothScroll;
      var smoothSettings = {
        standardScroll: hasSmoothScroll != 'yes'
      };
      Smooth.init(smoothSettings);
    },
    demoAjaxButton: function demoAjaxButton() {
      var plotDemoLoadContent = document.querySelector('.JS--plotLoadTemplatePartDemo');
      if (plotDemoLoadContent) plotDemoLoadContent.addEventListener('click', function (e) {
        // Take a look at what you can pass to this function
        // var args = {
        //              templatePart    : null,
        //              action          : 'plotLoadTemplatePart', //This is the action fired into our PlotSite PHP setup.php file
        //              data            : {}, //Any data we'd like to pass to the template part. 
        //              contentArea     : '.JS--ajaxTargetArea', //Where the new content gets inserts
        //              append          : false //If we want to append to the above area, or replace the content
        //          }
        var args = {
          templatePart: 'demos/ajax-content',
          data: {
            'foo': 'bar',
            'bangers': 'mash',
            'having': 'it'
          }
        };
        Plot.loadTemplatePart(args);
      });
    }
  };
  window.Main = Main;
})();

},{"../../../plot-core/src/js/carousels":19,"../../../plot-core/src/js/faqs":20,"../../../plot-core/src/js/lazyload":21,"../../../plot-core/src/js/modals":22,"../../../plot-core/src/js/plot":24,"../../../plot-core/src/js/plot-smooth-scroll":23,"./components/roller-text":26,"./components/toggle-price":27,"./pages/artists":29,"./pages/home":30,"./pages/news":31,"./pages/schedule":32}],29:[function(require,module,exports){
"use strict";

(function () {
  var Plot = require('../../../../plot-core/src/js/plot'),
      Modals = require('../../../../plot-core/src/js/modals'),
      Artists; //May this object act as a guide to using Plot core functions
  //and how to set up ajax dynamic data with our new principles with ease


  Artists = {
    maxPages: 1,
    currentPage: 1,
    currentArtistType: false,
    loadMoreButton: document.querySelector('.JS--artistsLoadMore'),
    init: function init() {
      Artists.showOrHideLoadMoreButton();
      Artists.createListeners();
    },
    createListeners: function createListeners() {
      Artists.loadMoreButton.addEventListener('click', function (e) {
        var nextPage = parseInt(Artists.loadMoreButton.dataset.nextPage);
        Artists.currentPage = nextPage;
        Artists.loadArtists(true);
        Artists.loadMoreButton.dataset.nextPage = nextPage + 1;
      });
      document.addEventListener('click', function (e) {
        //Have we clicked on an artist type filter button?
        if (e.target.closest('.JS--artistTypeButton')) {
          Artists.currentArtistType = e.target.dataset.artistTypeId;
          Artists.currentPage = 1;
          Artists.loadMoreButton.dataset.nextPage = 2;
          Artists.loadArtists(false).then(function () {
            document.querySelectorAll('.JS--artistTypeButton').forEach(function (artistTypeButton) {
              artistTypeButton.classList.remove('selected');
            });
            e.target.classList.add('selected');
          });
        }
      }, false);
    },
    loadArtists: function loadArtists(append) {
      var args = {
        templatePart: 'parts/artist-listing',
        data: {
          'page': Artists.currentPage,
          'artistType': Artists.currentArtistType
        },
        append: append
      };
      return Plot.loadTemplatePart(args).then(function (html) {
        Artists.showOrHideLoadMoreButton();
        return true;
      });
    },
    showOrHideLoadMoreButton: function showOrHideLoadMoreButton() {
      //Check if max pages is 1. If it is, there's only 1 page of artists
      //so we can hide load more button
      Artists.maxPages = document.querySelector('.JS--maxPages').dataset.maxPages;
      if (Artists.maxPages > Artists.currentPage) Artists.loadMoreButton.classList.remove('hidden');else Artists.loadMoreButton.classList.add('hidden');
    }
  };
  module.exports = Artists;
})();

},{"../../../../plot-core/src/js/modals":22,"../../../../plot-core/src/js/plot":24}],30:[function(require,module,exports){
"use strict";

(function () {
  var Home;
  Home = {
    dom: {
      body: document.body,
      root: document.querySelector('html'),
      phone: document.querySelector('.mobile3D__phone'),
      homeBanner: document.querySelector('.homeBanner'),
      header: document.querySelector('#siteMainHeader')
    },
    intervalLength: 5000,
    previousTheme: 'home',
    counter: null,
    ticker: false,
    currentMousePosition: {
      X: window.innerWidth / 2,
      Y: window.innerHeight / 2
    },
    previousMousePosition: {
      X: window.innerWidth / 2,
      Y: window.innerHeight / 2
    },
    mouseMoveAnimationFrame: null,
    themes: ['casa', 'future', 'highest', 'rhythm', 'sounds', 'box', 'inter', 'halftone', 'deep', 'arts', 'africaoye'],
    init: function init() {
      Home.createListeners();
      Home.startThemeCounter();
      Home.setWidthOfPhone();
    },
    createListeners: function createListeners() {
      var homeBanner = document.querySelector('.homeBanner'); // Observe the homebanner section for class changes

      var observer = new MutationObserver(Home.bannerMutation);
      observer.observe(homeBanner, {
        attributes: true
      });
      var burgerMenuTriggers = document.querySelector('.JS--menuTrigger'); // Toggle banner animation when menu opened/closed

      burgerMenuTriggers.addEventListener('click', Home.toggleThemeCounter);
      window.addEventListener('resize', Home.setWidthOfPhone);

      if (window.innerWidth < 640) {
        Home.dom.body.classList.add('smallScreen');
      } else {
        Home.mouseMoveAnimationFrame = requestAnimationFrame(Home.runMouseMove);
        Home.dom.homeBanner.addEventListener('mousemove', function (e) {
          return Home.trackCursorPosition(e);
        });
      }
    },
    setWidthOfPhone: function setWidthOfPhone() {
      Home.dom.phone.style.width = Home.dom.phone.getBoundingClientRect().height * .55 + 'px';
      Home.dom.phone.style.opacity = 1;
    },
    bannerMutation: function bannerMutation(mutationsList, observer) {
      // If the banner element is in view
      if (mutationsList[0].target.classList.contains('plotSmoothScrollFrameInView') && !Home.bannerInView) {
        Home.bannerInView = true;
        Home.startThemeCounter();
      }

      if (!mutationsList[0].target.classList.contains('plotSmoothScrollFrameInView') && Home.bannerInView) {
        Home.bannerInView = false;
        Home.stopThemeCounter();
        Home.removeTheme();
      }
    },
    trackCursorPosition: function trackCursorPosition(e) {
      Home.currentMousePosition = {
        X: e.clientX,
        Y: e.clientY
      };
      var middlePointX = window.innerWidth / 2;
      var middlePointY = window.innerHeight / 2;
      if (Home.currentMousePosition.X - 2000 > middlePointX) Home.currentMousePosition.X = middlePointX + 2000;
      if (Home.currentMousePosition.X + 2000 < middlePointX) Home.currentMousePosition.X = middlePointX - 2000;
      if (Home.currentMousePosition.Y - 2000 > middlePointY) Home.currentMousePosition.Y = middlePointY + 2000;
      if (Home.currentMousePosition.Y + 2000 < middlePointY) Home.currentMousePosition.Y = middlePointY - 2000;

      if (Home.ticker == false) {
        Home.ticker = true;
        Home.mouseMoveAnimationFrame = requestAnimationFrame(Home.runMouseMove);
      }
    },
    startThemeCounter: function startThemeCounter() {
      Home.bannerInView = true; // Set header to default style

      if (Home.dom.header.classList.contains('defaultHeader')) Home.dom.header.classList.remove('defaultHeader');
      var i = 0;
      Home.counter = setInterval(function () {
        Home.dom.body.classList.remove('showFloaters');
        setTimeout(function () {
          Home.dom.body.classList.add('showFloaters');
        }, 100); // Update mobile screen image

        Home.dom.body.dataset.currentTheme = Home.themes[i];
        Home.dom.body.dataset.previousTheme = Home.previousTheme; // Update state

        Home.previousTheme = Home.themes[i];
        Home.dom.body.classList.add('slideMobileScreen');
        setTimeout(function () {
          Home.dom.body.classList.remove('slideMobileScreen');
        }, 2000); // If we reach the end of the themes, reset to first theme

        i >= Home.themes.length - 1 ? i = 0 : i++;
      }, 7000);
    },
    stopThemeCounter: function stopThemeCounter() {
      if (Home.counter) clearInterval(Home.counter);
    },
    removeTheme: function removeTheme() {
      if (Home.previousTheme) Home.dom.body.classList.remove(Home.previousTheme);
      Home.previousTheme = ''; // Set header to default style

      Home.dom.header.classList.add('defaultHeader');
    },
    toggleThemeCounter: function toggleThemeCounter() {
      // Cancel animation if menu is open
      if (Home.dom.root.classList.contains('burgerOpen')) {
        Home.stopThemeCounter();
        Home.removeTheme(); // Start animation if menu is closed and banner is in view    
      } else if (Home.bannerInView) {
        Home.startThemeCounter();
      }
    },
    runMouseMove: function runMouseMove() {
      var differenceOfPositions = {
        Y: Home.currentMousePosition.Y - Home.previousMousePosition.Y,
        X: Home.currentMousePosition.X - Home.previousMousePosition.X
      };
      Home.previousMousePosition = {
        X: Home.previousMousePosition.X + differenceOfPositions.X * 0.1,
        Y: Home.previousMousePosition.Y + differenceOfPositions.Y * 0.1
      };
      var xShift = (Home.previousMousePosition.X - window.innerWidth / 2) / (window.innerWidth / 2);
      var yShift = (window.innerHeight / 2 - Home.previousMousePosition.Y) / (window.innerHeight / 2);
      Home.dom.phone.style.transform = "rotateX(".concat(15 + yShift * 7, "deg) rotateY(").concat(xShift * 60 > 50 ? 50 : xShift * 60, "deg)");
      var multiplier = 10;
      if (Math.abs(differenceOfPositions.X + differenceOfPositions.Y) < .1) Home.ticker = false;
      if (Home.ticker == true) Home.mouseMoveAnimationFrame = requestAnimationFrame(Home.runMouseMove);
    }
  };
  module.exports = Home;
})();

},{}],31:[function(require,module,exports){
"use strict";

(function () {
  var Plot = require('../../../../plot-core/src/js/plot'),
      News; //May this object act as a guide to using Plot core functions
  //and how to set up ajax dynamic data with our new principles with ease


  News = {
    maxPages: 1,
    currentNewsCategory: 0,
    currentPage: 1,
    loadMoreButton: document.querySelector('.JS--newsLoadMore'),
    init: function init() {
      if (News.loadMoreButton) {
        News.showOrHideLoadMoreButton();
        News.createListeners();
      }
    },
    createListeners: function createListeners() {
      News.loadMoreButton.addEventListener('click', function (e) {
        var nextPage = parseInt(News.loadMoreButton.dataset.nextPage);
        News.currentPage = nextPage;
        News.loadNews(true);
        News.loadMoreButton.dataset.nextPage = nextPage + 1;
      });
    },
    loadNews: function loadNews(append) {
      var args = {
        templatePart: 'parts/news-listing',
        data: {
          'page': News.currentPage,
          'artistType': News.currentNewsCategory
        },
        append: append
      };
      return Plot.loadTemplatePart(args).then(function (html) {
        News.showOrHideLoadMoreButton();
        return true;
      });
    },
    showOrHideLoadMoreButton: function showOrHideLoadMoreButton() {
      //Check if max pages is 1. If it is, there's only 1 page of News
      //so we can hide load more button
      News.maxPages = document.querySelector('.JS--maxPages').dataset.maxPages;
      console.log(News.maxPages);
      if (News.maxPages > News.currentPage) News.loadMoreButton.classList.remove('hidden');else News.loadMoreButton.classList.add('hidden');
    }
  };
  module.exports = News;
})();

},{"../../../../plot-core/src/js/plot":24}],32:[function(require,module,exports){
"use strict";

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

(function () {
  var Schedule;
  Schedule = {
    dayButtons: document.querySelectorAll('.JS--scheduleDayPickerButton'),
    calendars: document.querySelectorAll('.scheduleCalendarWrap'),
    init: function init() {
      Schedule.createListeners();
      Schedule.checkToSeeIfNavArrowsNeeded();
    },
    createListeners: function createListeners() {
      var _iterator = _createForOfIteratorHelper(Schedule.dayButtons),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var dayButton = _step.value;
          dayButton.addEventListener('click', function () {
            Schedule.loadNewDate(this);
          });
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }

      window.addEventListener('resize', function () {
        Schedule.checkToSeeIfNavArrowsNeeded();
      });

      var _iterator2 = _createForOfIteratorHelper(Schedule.calendars),
          _step2;

      try {
        var _loop = function _loop() {
          calendar = _step2.value;
          var rightButton = calendar.querySelector('.JS--scheduleRight'),
              leftButton = calendar.querySelector('.JS--scheduleLeft'),
              tracks = calendar.querySelector('.scheduleCalendarTracks'),
              tracksW = tracks.offsetWidth;
          rightButton.addEventListener('click', function () {
            tracks.scrollBy({
              left: tracksW / 2,
              behavior: 'smooth'
            });
          });
          leftButton.addEventListener('click', function () {
            tracks.scrollBy({
              left: -tracksW / 2,
              behavior: 'smooth'
            });
          });
        };

        for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
          var calendar;

          _loop();
        }
      } catch (err) {
        _iterator2.e(err);
      } finally {
        _iterator2.f();
      }
    },
    loadNewDate: function loadNewDate(elem) {
      var _iterator3 = _createForOfIteratorHelper(Schedule.dayButtons),
          _step3;

      try {
        for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
          var dB = _step3.value;
          dB.classList.remove('selected');
        }
      } catch (err) {
        _iterator3.e(err);
      } finally {
        _iterator3.f();
      }

      elem.classList.add('selected');
      var day = elem.dataset.scheduleDay;

      var _iterator4 = _createForOfIteratorHelper(Schedule.calendars),
          _step4;

      try {
        for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
          var calendar = _step4.value;
          if (calendar.dataset.scheduleDay == day) calendar.classList.remove('hidden');else calendar.classList.add('hidden');
        }
      } catch (err) {
        _iterator4.e(err);
      } finally {
        _iterator4.f();
      }

      Schedule.checkToSeeIfNavArrowsNeeded();
    },
    checkToSeeIfNavArrowsNeeded: function checkToSeeIfNavArrowsNeeded() {
      var _iterator5 = _createForOfIteratorHelper(Schedule.calendars),
          _step5;

      try {
        for (_iterator5.s(); !(_step5 = _iterator5.n()).done;) {
          var calendar = _step5.value;

          if (!calendar.classList.contains('hidden')) {
            var tracks = calendar.querySelector('.scheduleCalendarTracks');

            if (tracks.scrollWidth > calendar.scrollWidth) {
              calendar.querySelector('.JS--scheduleLeft').classList.remove('hidden');
              calendar.querySelector('.JS--scheduleRight').classList.remove('hidden');
            } else {
              calendar.querySelector('.JS--scheduleLeft').classList.add('hidden');
              calendar.querySelector('.JS--scheduleRight').classList.add('hidden');
            }
          }
        }
      } catch (err) {
        _iterator5.e(err);
      } finally {
        _iterator5.f();
      }
    }
  };
  module.exports = Schedule;
})();

},{}]},{},[28])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIuLi9wbG90LWNvcmUvbm9kZV9tb2R1bGVzL2JvZHktc2Nyb2xsLWxvY2svbGliL2JvZHlTY3JvbGxMb2NrLm1pbi5qcyIsIi4uL3Bsb3QtY29yZS9ub2RlX21vZHVsZXMvZGVzYW5kcm8tbWF0Y2hlcy1zZWxlY3Rvci9tYXRjaGVzLXNlbGVjdG9yLmpzIiwiLi4vcGxvdC1jb3JlL25vZGVfbW9kdWxlcy9ldi1lbWl0dGVyL2V2LWVtaXR0ZXIuanMiLCIuLi9wbG90LWNvcmUvbm9kZV9tb2R1bGVzL2Zpenp5LXVpLXV0aWxzL3V0aWxzLmpzIiwiLi4vcGxvdC1jb3JlL25vZGVfbW9kdWxlcy9mbGlja2l0eS9qcy9hZGQtcmVtb3ZlLWNlbGwuanMiLCIuLi9wbG90LWNvcmUvbm9kZV9tb2R1bGVzL2ZsaWNraXR5L2pzL2FuaW1hdGUuanMiLCIuLi9wbG90LWNvcmUvbm9kZV9tb2R1bGVzL2ZsaWNraXR5L2pzL2NlbGwuanMiLCIuLi9wbG90LWNvcmUvbm9kZV9tb2R1bGVzL2ZsaWNraXR5L2pzL2RyYWcuanMiLCIuLi9wbG90LWNvcmUvbm9kZV9tb2R1bGVzL2ZsaWNraXR5L2pzL2ZsaWNraXR5LmpzIiwiLi4vcGxvdC1jb3JlL25vZGVfbW9kdWxlcy9mbGlja2l0eS9qcy9pbmRleC5qcyIsIi4uL3Bsb3QtY29yZS9ub2RlX21vZHVsZXMvZmxpY2tpdHkvanMvbGF6eWxvYWQuanMiLCIuLi9wbG90LWNvcmUvbm9kZV9tb2R1bGVzL2ZsaWNraXR5L2pzL3BhZ2UtZG90cy5qcyIsIi4uL3Bsb3QtY29yZS9ub2RlX21vZHVsZXMvZmxpY2tpdHkvanMvcGxheWVyLmpzIiwiLi4vcGxvdC1jb3JlL25vZGVfbW9kdWxlcy9mbGlja2l0eS9qcy9wcmV2LW5leHQtYnV0dG9uLmpzIiwiLi4vcGxvdC1jb3JlL25vZGVfbW9kdWxlcy9mbGlja2l0eS9qcy9zbGlkZS5qcyIsIi4uL3Bsb3QtY29yZS9ub2RlX21vZHVsZXMvZ2V0LXNpemUvZ2V0LXNpemUuanMiLCIuLi9wbG90LWNvcmUvbm9kZV9tb2R1bGVzL3VuaWRyYWdnZXIvdW5pZHJhZ2dlci5qcyIsIi4uL3Bsb3QtY29yZS9ub2RlX21vZHVsZXMvdW5pcG9pbnRlci91bmlwb2ludGVyLmpzIiwiLi4vcGxvdC1jb3JlL3NyYy9qcy9jYXJvdXNlbHMuanMiLCIuLi9wbG90LWNvcmUvc3JjL2pzL2ZhcXMuanMiLCIuLi9wbG90LWNvcmUvc3JjL2pzL2xhenlsb2FkLmpzIiwiLi4vcGxvdC1jb3JlL3NyYy9qcy9tb2RhbHMuanMiLCIuLi9wbG90LWNvcmUvc3JjL2pzL3Bsb3Qtc21vb3RoLXNjcm9sbC5qcyIsIi4uL3Bsb3QtY29yZS9zcmMvanMvcGxvdC5qcyIsIi4uL3Bsb3QtY29yZS9zcmMvanMvc3luY3Njcm9sbC5qcyIsInNyYy9qcy9jb21wb25lbnRzL3JvbGxlci10ZXh0LmpzIiwic3JjL2pzL2NvbXBvbmVudHMvdG9nZ2xlLXByaWNlLmpzIiwic3JjL2pzL21haW4uanMiLCJzcmMvanMvcGFnZXMvYXJ0aXN0cy5qcyIsInNyYy9qcy9wYWdlcy9ob21lLmpzIiwic3JjL2pzL3BhZ2VzL25ld3MuanMiLCJzcmMvanMvcGFnZXMvc2NoZWR1bGUuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBOztBQ0RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNyREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNoSEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNqUEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2pLQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN6TUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdEdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3pZQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDajZCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMxQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3RJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDNUxBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMvTEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNuTkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMvTUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMzUkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNB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dEQsQ0FBNkQsUUFBN0Q7QUFDQSxjQUFBLFFBQVEsQ0FBQyxhQUFULENBQXVCLG9CQUF2QixFQUE2QyxTQUE3QyxDQUF1RCxNQUF2RCxDQUE4RCxRQUE5RDtBQUNGLGFBSEQsTUFHTztBQUNKLGNBQUEsUUFBUSxDQUFDLGFBQVQsQ0FBdUIsbUJBQXZCLEVBQTRDLFNBQTVDLENBQXNELEdBQXRELENBQTBELFFBQTFEO0FBQ0EsY0FBQSxRQUFRLENBQUMsYUFBVCxDQUF1QixvQkFBdkIsRUFBNkMsU0FBN0MsQ0FBdUQsR0FBdkQsQ0FBMkQsUUFBM0Q7QUFDRjtBQUVIO0FBRUY7QUFsQmlDO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFvQm5DO0FBaEdNLEdBQVg7QUFvR0EsRUFBQSxNQUFNLENBQUMsT0FBUCxHQUFpQixRQUFqQjtBQUVILENBMUdBLEdBQUQiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbigpe2Z1bmN0aW9uIHIoZSxuLHQpe2Z1bmN0aW9uIG8oaSxmKXtpZighbltpXSl7aWYoIWVbaV0pe3ZhciBjPVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmU7aWYoIWYmJmMpcmV0dXJuIGMoaSwhMCk7aWYodSlyZXR1cm4gdShpLCEwKTt2YXIgYT1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK2krXCInXCIpO3Rocm93IGEuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixhfXZhciBwPW5baV09e2V4cG9ydHM6e319O2VbaV1bMF0uY2FsbChwLmV4cG9ydHMsZnVuY3Rpb24ocil7dmFyIG49ZVtpXVsxXVtyXTtyZXR1cm4gbyhufHxyKX0scCxwLmV4cG9ydHMscixlLG4sdCl9cmV0dXJuIG5baV0uZXhwb3J0c31mb3IodmFyIHU9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZSxpPTA7aTx0Lmxlbmd0aDtpKyspbyh0W2ldKTtyZXR1cm4gb31yZXR1cm4gcn0pKCkiLCIhZnVuY3Rpb24oZSx0KXtpZihcImZ1bmN0aW9uXCI9PXR5cGVvZiBkZWZpbmUmJmRlZmluZS5hbWQpZGVmaW5lKFtcImV4cG9ydHNcIl0sdCk7ZWxzZSBpZihcInVuZGVmaW5lZFwiIT10eXBlb2YgZXhwb3J0cyl0KGV4cG9ydHMpO2Vsc2V7dmFyIG89e307dChvKSxlLmJvZHlTY3JvbGxMb2NrPW99fSh0aGlzLGZ1bmN0aW9uKGV4cG9ydHMpe1widXNlIHN0cmljdFwiO2Z1bmN0aW9uIGkoZSl7aWYoQXJyYXkuaXNBcnJheShlKSl7Zm9yKHZhciB0PTAsbz1BcnJheShlLmxlbmd0aCk7dDxlLmxlbmd0aDt0Kyspb1t0XT1lW3RdO3JldHVybiBvfXJldHVybiBBcnJheS5mcm9tKGUpfU9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLFwiX19lc01vZHVsZVwiLHt2YWx1ZTohMH0pO3ZhciBsPSExO2lmKFwidW5kZWZpbmVkXCIhPXR5cGVvZiB3aW5kb3cpe3ZhciBlPXtnZXQgcGFzc2l2ZSgpe2w9ITB9fTt3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcInRlc3RQYXNzaXZlXCIsbnVsbCxlKSx3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcihcInRlc3RQYXNzaXZlXCIsbnVsbCxlKX1mdW5jdGlvbiBkKHQpe3JldHVybiB1LnNvbWUoZnVuY3Rpb24oZSl7cmV0dXJuISghZS5vcHRpb25zLmFsbG93VG91Y2hNb3ZlfHwhZS5vcHRpb25zLmFsbG93VG91Y2hNb3ZlKHQpKX0pfWZ1bmN0aW9uIGMoZSl7dmFyIHQ9ZXx8d2luZG93LmV2ZW50O3JldHVybiEhZCh0LnRhcmdldCl8fCgxPHQudG91Y2hlcy5sZW5ndGh8fCh0LnByZXZlbnREZWZhdWx0JiZ0LnByZXZlbnREZWZhdWx0KCksITEpKX1mdW5jdGlvbiBvKCl7c2V0VGltZW91dChmdW5jdGlvbigpe3ZvaWQgMCE9PW0mJihkb2N1bWVudC5ib2R5LnN0eWxlLnBhZGRpbmdSaWdodD1tLG09dm9pZCAwKSx2b2lkIDAhPT1mJiYoZG9jdW1lbnQuYm9keS5zdHlsZS5vdmVyZmxvdz1mLGY9dm9pZCAwKX0pfXZhciBhPVwidW5kZWZpbmVkXCIhPXR5cGVvZiB3aW5kb3cmJndpbmRvdy5uYXZpZ2F0b3ImJndpbmRvdy5uYXZpZ2F0b3IucGxhdGZvcm0mJigvaVAoYWR8aG9uZXxvZCkvLnRlc3Qod2luZG93Lm5hdmlnYXRvci5wbGF0Zm9ybSl8fFwiTWFjSW50ZWxcIj09PXdpbmRvdy5uYXZpZ2F0b3IucGxhdGZvcm0mJjE8d2luZG93Lm5hdmlnYXRvci5tYXhUb3VjaFBvaW50cyksdT1bXSxzPSExLHY9LTEsZj12b2lkIDAsbT12b2lkIDA7ZXhwb3J0cy5kaXNhYmxlQm9keVNjcm9sbD1mdW5jdGlvbihyLGUpe2lmKGEpe2lmKCFyKXJldHVybiB2b2lkIGNvbnNvbGUuZXJyb3IoXCJkaXNhYmxlQm9keVNjcm9sbCB1bnN1Y2Nlc3NmdWwgLSB0YXJnZXRFbGVtZW50IG11c3QgYmUgcHJvdmlkZWQgd2hlbiBjYWxsaW5nIGRpc2FibGVCb2R5U2Nyb2xsIG9uIElPUyBkZXZpY2VzLlwiKTtpZihyJiYhdS5zb21lKGZ1bmN0aW9uKGUpe3JldHVybiBlLnRhcmdldEVsZW1lbnQ9PT1yfSkpe3ZhciB0PXt0YXJnZXRFbGVtZW50OnIsb3B0aW9uczplfHx7fX07dT1bXS5jb25jYXQoaSh1KSxbdF0pLHIub250b3VjaHN0YXJ0PWZ1bmN0aW9uKGUpezE9PT1lLnRhcmdldFRvdWNoZXMubGVuZ3RoJiYodj1lLnRhcmdldFRvdWNoZXNbMF0uY2xpZW50WSl9LHIub250b3VjaG1vdmU9ZnVuY3Rpb24oZSl7dmFyIHQsbyxuLGk7MT09PWUudGFyZ2V0VG91Y2hlcy5sZW5ndGgmJihvPXIsaT0odD1lKS50YXJnZXRUb3VjaGVzWzBdLmNsaWVudFktdixkKHQudGFyZ2V0KXx8KG8mJjA9PT1vLnNjcm9sbFRvcCYmMDxpfHwobj1vKSYmbi5zY3JvbGxIZWlnaHQtbi5zY3JvbGxUb3A8PW4uY2xpZW50SGVpZ2h0JiZpPDA/Yyh0KTp0LnN0b3BQcm9wYWdhdGlvbigpKSl9LHN8fChkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwidG91Y2htb3ZlXCIsYyxsP3twYXNzaXZlOiExfTp2b2lkIDApLHM9ITApfX1lbHNle249ZSxzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7aWYodm9pZCAwPT09bSl7dmFyIGU9ISFuJiYhMD09PW4ucmVzZXJ2ZVNjcm9sbEJhckdhcCx0PXdpbmRvdy5pbm5lcldpZHRoLWRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGllbnRXaWR0aDtlJiYwPHQmJihtPWRvY3VtZW50LmJvZHkuc3R5bGUucGFkZGluZ1JpZ2h0LGRvY3VtZW50LmJvZHkuc3R5bGUucGFkZGluZ1JpZ2h0PXQrXCJweFwiKX12b2lkIDA9PT1mJiYoZj1kb2N1bWVudC5ib2R5LnN0eWxlLm92ZXJmbG93LGRvY3VtZW50LmJvZHkuc3R5bGUub3ZlcmZsb3c9XCJoaWRkZW5cIil9KTt2YXIgbz17dGFyZ2V0RWxlbWVudDpyLG9wdGlvbnM6ZXx8e319O3U9W10uY29uY2F0KGkodSksW29dKX12YXIgbn0sZXhwb3J0cy5jbGVhckFsbEJvZHlTY3JvbGxMb2Nrcz1mdW5jdGlvbigpe2E/KHUuZm9yRWFjaChmdW5jdGlvbihlKXtlLnRhcmdldEVsZW1lbnQub250b3VjaHN0YXJ0PW51bGwsZS50YXJnZXRFbGVtZW50Lm9udG91Y2htb3ZlPW51bGx9KSxzJiYoZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcihcInRvdWNobW92ZVwiLGMsbD97cGFzc2l2ZTohMX06dm9pZCAwKSxzPSExKSx1PVtdLHY9LTEpOihvKCksdT1bXSl9LGV4cG9ydHMuZW5hYmxlQm9keVNjcm9sbD1mdW5jdGlvbih0KXtpZihhKXtpZighdClyZXR1cm4gdm9pZCBjb25zb2xlLmVycm9yKFwiZW5hYmxlQm9keVNjcm9sbCB1bnN1Y2Nlc3NmdWwgLSB0YXJnZXRFbGVtZW50IG11c3QgYmUgcHJvdmlkZWQgd2hlbiBjYWxsaW5nIGVuYWJsZUJvZHlTY3JvbGwgb24gSU9TIGRldmljZXMuXCIpO3Qub250b3VjaHN0YXJ0PW51bGwsdC5vbnRvdWNobW92ZT1udWxsLHU9dS5maWx0ZXIoZnVuY3Rpb24oZSl7cmV0dXJuIGUudGFyZ2V0RWxlbWVudCE9PXR9KSxzJiYwPT09dS5sZW5ndGgmJihkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKFwidG91Y2htb3ZlXCIsYyxsP3twYXNzaXZlOiExfTp2b2lkIDApLHM9ITEpfWVsc2UodT11LmZpbHRlcihmdW5jdGlvbihlKXtyZXR1cm4gZS50YXJnZXRFbGVtZW50IT09dH0pKS5sZW5ndGh8fG8oKX19KTtcbiIsIi8qKlxuICogbWF0Y2hlc1NlbGVjdG9yIHYyLjAuMlxuICogbWF0Y2hlc1NlbGVjdG9yKCBlbGVtZW50LCAnLnNlbGVjdG9yJyApXG4gKiBNSVQgbGljZW5zZVxuICovXG5cbi8qanNoaW50IGJyb3dzZXI6IHRydWUsIHN0cmljdDogdHJ1ZSwgdW5kZWY6IHRydWUsIHVudXNlZDogdHJ1ZSAqL1xuXG4oIGZ1bmN0aW9uKCB3aW5kb3csIGZhY3RvcnkgKSB7XG4gIC8qZ2xvYmFsIGRlZmluZTogZmFsc2UsIG1vZHVsZTogZmFsc2UgKi9cbiAgJ3VzZSBzdHJpY3QnO1xuICAvLyB1bml2ZXJzYWwgbW9kdWxlIGRlZmluaXRpb25cbiAgaWYgKCB0eXBlb2YgZGVmaW5lID09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZCApIHtcbiAgICAvLyBBTURcbiAgICBkZWZpbmUoIGZhY3RvcnkgKTtcbiAgfSBlbHNlIGlmICggdHlwZW9mIG1vZHVsZSA9PSAnb2JqZWN0JyAmJiBtb2R1bGUuZXhwb3J0cyApIHtcbiAgICAvLyBDb21tb25KU1xuICAgIG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeSgpO1xuICB9IGVsc2Uge1xuICAgIC8vIGJyb3dzZXIgZ2xvYmFsXG4gICAgd2luZG93Lm1hdGNoZXNTZWxlY3RvciA9IGZhY3RvcnkoKTtcbiAgfVxuXG59KCB3aW5kb3csIGZ1bmN0aW9uIGZhY3RvcnkoKSB7XG4gICd1c2Ugc3RyaWN0JztcblxuICB2YXIgbWF0Y2hlc01ldGhvZCA9ICggZnVuY3Rpb24oKSB7XG4gICAgdmFyIEVsZW1Qcm90byA9IHdpbmRvdy5FbGVtZW50LnByb3RvdHlwZTtcbiAgICAvLyBjaGVjayBmb3IgdGhlIHN0YW5kYXJkIG1ldGhvZCBuYW1lIGZpcnN0XG4gICAgaWYgKCBFbGVtUHJvdG8ubWF0Y2hlcyApIHtcbiAgICAgIHJldHVybiAnbWF0Y2hlcyc7XG4gICAgfVxuICAgIC8vIGNoZWNrIHVuLXByZWZpeGVkXG4gICAgaWYgKCBFbGVtUHJvdG8ubWF0Y2hlc1NlbGVjdG9yICkge1xuICAgICAgcmV0dXJuICdtYXRjaGVzU2VsZWN0b3InO1xuICAgIH1cbiAgICAvLyBjaGVjayB2ZW5kb3IgcHJlZml4ZXNcbiAgICB2YXIgcHJlZml4ZXMgPSBbICd3ZWJraXQnLCAnbW96JywgJ21zJywgJ28nIF07XG5cbiAgICBmb3IgKCB2YXIgaT0wOyBpIDwgcHJlZml4ZXMubGVuZ3RoOyBpKysgKSB7XG4gICAgICB2YXIgcHJlZml4ID0gcHJlZml4ZXNbaV07XG4gICAgICB2YXIgbWV0aG9kID0gcHJlZml4ICsgJ01hdGNoZXNTZWxlY3Rvcic7XG4gICAgICBpZiAoIEVsZW1Qcm90b1sgbWV0aG9kIF0gKSB7XG4gICAgICAgIHJldHVybiBtZXRob2Q7XG4gICAgICB9XG4gICAgfVxuICB9KSgpO1xuXG4gIHJldHVybiBmdW5jdGlvbiBtYXRjaGVzU2VsZWN0b3IoIGVsZW0sIHNlbGVjdG9yICkge1xuICAgIHJldHVybiBlbGVtWyBtYXRjaGVzTWV0aG9kIF0oIHNlbGVjdG9yICk7XG4gIH07XG5cbn0pKTtcbiIsIi8qKlxuICogRXZFbWl0dGVyIHYxLjEuMFxuICogTGlsJyBldmVudCBlbWl0dGVyXG4gKiBNSVQgTGljZW5zZVxuICovXG5cbi8qIGpzaGludCB1bnVzZWQ6IHRydWUsIHVuZGVmOiB0cnVlLCBzdHJpY3Q6IHRydWUgKi9cblxuKCBmdW5jdGlvbiggZ2xvYmFsLCBmYWN0b3J5ICkge1xuICAvLyB1bml2ZXJzYWwgbW9kdWxlIGRlZmluaXRpb25cbiAgLyoganNoaW50IHN0cmljdDogZmFsc2UgKi8gLyogZ2xvYmFscyBkZWZpbmUsIG1vZHVsZSwgd2luZG93ICovXG4gIGlmICggdHlwZW9mIGRlZmluZSA9PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQgKSB7XG4gICAgLy8gQU1EIC0gUmVxdWlyZUpTXG4gICAgZGVmaW5lKCBmYWN0b3J5ICk7XG4gIH0gZWxzZSBpZiAoIHR5cGVvZiBtb2R1bGUgPT0gJ29iamVjdCcgJiYgbW9kdWxlLmV4cG9ydHMgKSB7XG4gICAgLy8gQ29tbW9uSlMgLSBCcm93c2VyaWZ5LCBXZWJwYWNrXG4gICAgbW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KCk7XG4gIH0gZWxzZSB7XG4gICAgLy8gQnJvd3NlciBnbG9iYWxzXG4gICAgZ2xvYmFsLkV2RW1pdHRlciA9IGZhY3RvcnkoKTtcbiAgfVxuXG59KCB0eXBlb2Ygd2luZG93ICE9ICd1bmRlZmluZWQnID8gd2luZG93IDogdGhpcywgZnVuY3Rpb24oKSB7XG5cblwidXNlIHN0cmljdFwiO1xuXG5mdW5jdGlvbiBFdkVtaXR0ZXIoKSB7fVxuXG52YXIgcHJvdG8gPSBFdkVtaXR0ZXIucHJvdG90eXBlO1xuXG5wcm90by5vbiA9IGZ1bmN0aW9uKCBldmVudE5hbWUsIGxpc3RlbmVyICkge1xuICBpZiAoICFldmVudE5hbWUgfHwgIWxpc3RlbmVyICkge1xuICAgIHJldHVybjtcbiAgfVxuICAvLyBzZXQgZXZlbnRzIGhhc2hcbiAgdmFyIGV2ZW50cyA9IHRoaXMuX2V2ZW50cyA9IHRoaXMuX2V2ZW50cyB8fCB7fTtcbiAgLy8gc2V0IGxpc3RlbmVycyBhcnJheVxuICB2YXIgbGlzdGVuZXJzID0gZXZlbnRzWyBldmVudE5hbWUgXSA9IGV2ZW50c1sgZXZlbnROYW1lIF0gfHwgW107XG4gIC8vIG9ubHkgYWRkIG9uY2VcbiAgaWYgKCBsaXN0ZW5lcnMuaW5kZXhPZiggbGlzdGVuZXIgKSA9PSAtMSApIHtcbiAgICBsaXN0ZW5lcnMucHVzaCggbGlzdGVuZXIgKTtcbiAgfVxuXG4gIHJldHVybiB0aGlzO1xufTtcblxucHJvdG8ub25jZSA9IGZ1bmN0aW9uKCBldmVudE5hbWUsIGxpc3RlbmVyICkge1xuICBpZiAoICFldmVudE5hbWUgfHwgIWxpc3RlbmVyICkge1xuICAgIHJldHVybjtcbiAgfVxuICAvLyBhZGQgZXZlbnRcbiAgdGhpcy5vbiggZXZlbnROYW1lLCBsaXN0ZW5lciApO1xuICAvLyBzZXQgb25jZSBmbGFnXG4gIC8vIHNldCBvbmNlRXZlbnRzIGhhc2hcbiAgdmFyIG9uY2VFdmVudHMgPSB0aGlzLl9vbmNlRXZlbnRzID0gdGhpcy5fb25jZUV2ZW50cyB8fCB7fTtcbiAgLy8gc2V0IG9uY2VMaXN0ZW5lcnMgb2JqZWN0XG4gIHZhciBvbmNlTGlzdGVuZXJzID0gb25jZUV2ZW50c1sgZXZlbnROYW1lIF0gPSBvbmNlRXZlbnRzWyBldmVudE5hbWUgXSB8fCB7fTtcbiAgLy8gc2V0IGZsYWdcbiAgb25jZUxpc3RlbmVyc1sgbGlzdGVuZXIgXSA9IHRydWU7XG5cbiAgcmV0dXJuIHRoaXM7XG59O1xuXG5wcm90by5vZmYgPSBmdW5jdGlvbiggZXZlbnROYW1lLCBsaXN0ZW5lciApIHtcbiAgdmFyIGxpc3RlbmVycyA9IHRoaXMuX2V2ZW50cyAmJiB0aGlzLl9ldmVudHNbIGV2ZW50TmFtZSBdO1xuICBpZiAoICFsaXN0ZW5lcnMgfHwgIWxpc3RlbmVycy5sZW5ndGggKSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIHZhciBpbmRleCA9IGxpc3RlbmVycy5pbmRleE9mKCBsaXN0ZW5lciApO1xuICBpZiAoIGluZGV4ICE9IC0xICkge1xuICAgIGxpc3RlbmVycy5zcGxpY2UoIGluZGV4LCAxICk7XG4gIH1cblxuICByZXR1cm4gdGhpcztcbn07XG5cbnByb3RvLmVtaXRFdmVudCA9IGZ1bmN0aW9uKCBldmVudE5hbWUsIGFyZ3MgKSB7XG4gIHZhciBsaXN0ZW5lcnMgPSB0aGlzLl9ldmVudHMgJiYgdGhpcy5fZXZlbnRzWyBldmVudE5hbWUgXTtcbiAgaWYgKCAhbGlzdGVuZXJzIHx8ICFsaXN0ZW5lcnMubGVuZ3RoICkge1xuICAgIHJldHVybjtcbiAgfVxuICAvLyBjb3B5IG92ZXIgdG8gYXZvaWQgaW50ZXJmZXJlbmNlIGlmIC5vZmYoKSBpbiBsaXN0ZW5lclxuICBsaXN0ZW5lcnMgPSBsaXN0ZW5lcnMuc2xpY2UoMCk7XG4gIGFyZ3MgPSBhcmdzIHx8IFtdO1xuICAvLyBvbmNlIHN0dWZmXG4gIHZhciBvbmNlTGlzdGVuZXJzID0gdGhpcy5fb25jZUV2ZW50cyAmJiB0aGlzLl9vbmNlRXZlbnRzWyBldmVudE5hbWUgXTtcblxuICBmb3IgKCB2YXIgaT0wOyBpIDwgbGlzdGVuZXJzLmxlbmd0aDsgaSsrICkge1xuICAgIHZhciBsaXN0ZW5lciA9IGxpc3RlbmVyc1tpXVxuICAgIHZhciBpc09uY2UgPSBvbmNlTGlzdGVuZXJzICYmIG9uY2VMaXN0ZW5lcnNbIGxpc3RlbmVyIF07XG4gICAgaWYgKCBpc09uY2UgKSB7XG4gICAgICAvLyByZW1vdmUgbGlzdGVuZXJcbiAgICAgIC8vIHJlbW92ZSBiZWZvcmUgdHJpZ2dlciB0byBwcmV2ZW50IHJlY3Vyc2lvblxuICAgICAgdGhpcy5vZmYoIGV2ZW50TmFtZSwgbGlzdGVuZXIgKTtcbiAgICAgIC8vIHVuc2V0IG9uY2UgZmxhZ1xuICAgICAgZGVsZXRlIG9uY2VMaXN0ZW5lcnNbIGxpc3RlbmVyIF07XG4gICAgfVxuICAgIC8vIHRyaWdnZXIgbGlzdGVuZXJcbiAgICBsaXN0ZW5lci5hcHBseSggdGhpcywgYXJncyApO1xuICB9XG5cbiAgcmV0dXJuIHRoaXM7XG59O1xuXG5wcm90by5hbGxPZmYgPSBmdW5jdGlvbigpIHtcbiAgZGVsZXRlIHRoaXMuX2V2ZW50cztcbiAgZGVsZXRlIHRoaXMuX29uY2VFdmVudHM7XG59O1xuXG5yZXR1cm4gRXZFbWl0dGVyO1xuXG59KSk7XG4iLCIvKipcbiAqIEZpenp5IFVJIHV0aWxzIHYyLjAuN1xuICogTUlUIGxpY2Vuc2VcbiAqL1xuXG4vKmpzaGludCBicm93c2VyOiB0cnVlLCB1bmRlZjogdHJ1ZSwgdW51c2VkOiB0cnVlLCBzdHJpY3Q6IHRydWUgKi9cblxuKCBmdW5jdGlvbiggd2luZG93LCBmYWN0b3J5ICkge1xuICAvLyB1bml2ZXJzYWwgbW9kdWxlIGRlZmluaXRpb25cbiAgLypqc2hpbnQgc3RyaWN0OiBmYWxzZSAqLyAvKmdsb2JhbHMgZGVmaW5lLCBtb2R1bGUsIHJlcXVpcmUgKi9cblxuICBpZiAoIHR5cGVvZiBkZWZpbmUgPT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kICkge1xuICAgIC8vIEFNRFxuICAgIGRlZmluZSggW1xuICAgICAgJ2Rlc2FuZHJvLW1hdGNoZXMtc2VsZWN0b3IvbWF0Y2hlcy1zZWxlY3RvcidcbiAgICBdLCBmdW5jdGlvbiggbWF0Y2hlc1NlbGVjdG9yICkge1xuICAgICAgcmV0dXJuIGZhY3RvcnkoIHdpbmRvdywgbWF0Y2hlc1NlbGVjdG9yICk7XG4gICAgfSk7XG4gIH0gZWxzZSBpZiAoIHR5cGVvZiBtb2R1bGUgPT0gJ29iamVjdCcgJiYgbW9kdWxlLmV4cG9ydHMgKSB7XG4gICAgLy8gQ29tbW9uSlNcbiAgICBtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkoXG4gICAgICB3aW5kb3csXG4gICAgICByZXF1aXJlKCdkZXNhbmRyby1tYXRjaGVzLXNlbGVjdG9yJylcbiAgICApO1xuICB9IGVsc2Uge1xuICAgIC8vIGJyb3dzZXIgZ2xvYmFsXG4gICAgd2luZG93LmZpenp5VUlVdGlscyA9IGZhY3RvcnkoXG4gICAgICB3aW5kb3csXG4gICAgICB3aW5kb3cubWF0Y2hlc1NlbGVjdG9yXG4gICAgKTtcbiAgfVxuXG59KCB3aW5kb3csIGZ1bmN0aW9uIGZhY3RvcnkoIHdpbmRvdywgbWF0Y2hlc1NlbGVjdG9yICkge1xuXG4ndXNlIHN0cmljdCc7XG5cbnZhciB1dGlscyA9IHt9O1xuXG4vLyAtLS0tLSBleHRlbmQgLS0tLS0gLy9cblxuLy8gZXh0ZW5kcyBvYmplY3RzXG51dGlscy5leHRlbmQgPSBmdW5jdGlvbiggYSwgYiApIHtcbiAgZm9yICggdmFyIHByb3AgaW4gYiApIHtcbiAgICBhWyBwcm9wIF0gPSBiWyBwcm9wIF07XG4gIH1cbiAgcmV0dXJuIGE7XG59O1xuXG4vLyAtLS0tLSBtb2R1bG8gLS0tLS0gLy9cblxudXRpbHMubW9kdWxvID0gZnVuY3Rpb24oIG51bSwgZGl2ICkge1xuICByZXR1cm4gKCAoIG51bSAlIGRpdiApICsgZGl2ICkgJSBkaXY7XG59O1xuXG4vLyAtLS0tLSBtYWtlQXJyYXkgLS0tLS0gLy9cblxudmFyIGFycmF5U2xpY2UgPSBBcnJheS5wcm90b3R5cGUuc2xpY2U7XG5cbi8vIHR1cm4gZWxlbWVudCBvciBub2RlTGlzdCBpbnRvIGFuIGFycmF5XG51dGlscy5tYWtlQXJyYXkgPSBmdW5jdGlvbiggb2JqICkge1xuICBpZiAoIEFycmF5LmlzQXJyYXkoIG9iaiApICkge1xuICAgIC8vIHVzZSBvYmplY3QgaWYgYWxyZWFkeSBhbiBhcnJheVxuICAgIHJldHVybiBvYmo7XG4gIH1cbiAgLy8gcmV0dXJuIGVtcHR5IGFycmF5IGlmIHVuZGVmaW5lZCBvciBudWxsLiAjNlxuICBpZiAoIG9iaiA9PT0gbnVsbCB8fCBvYmogPT09IHVuZGVmaW5lZCApIHtcbiAgICByZXR1cm4gW107XG4gIH1cblxuICB2YXIgaXNBcnJheUxpa2UgPSB0eXBlb2Ygb2JqID09ICdvYmplY3QnICYmIHR5cGVvZiBvYmoubGVuZ3RoID09ICdudW1iZXInO1xuICBpZiAoIGlzQXJyYXlMaWtlICkge1xuICAgIC8vIGNvbnZlcnQgbm9kZUxpc3QgdG8gYXJyYXlcbiAgICByZXR1cm4gYXJyYXlTbGljZS5jYWxsKCBvYmogKTtcbiAgfVxuXG4gIC8vIGFycmF5IG9mIHNpbmdsZSBpbmRleFxuICByZXR1cm4gWyBvYmogXTtcbn07XG5cbi8vIC0tLS0tIHJlbW92ZUZyb20gLS0tLS0gLy9cblxudXRpbHMucmVtb3ZlRnJvbSA9IGZ1bmN0aW9uKCBhcnksIG9iaiApIHtcbiAgdmFyIGluZGV4ID0gYXJ5LmluZGV4T2YoIG9iaiApO1xuICBpZiAoIGluZGV4ICE9IC0xICkge1xuICAgIGFyeS5zcGxpY2UoIGluZGV4LCAxICk7XG4gIH1cbn07XG5cbi8vIC0tLS0tIGdldFBhcmVudCAtLS0tLSAvL1xuXG51dGlscy5nZXRQYXJlbnQgPSBmdW5jdGlvbiggZWxlbSwgc2VsZWN0b3IgKSB7XG4gIHdoaWxlICggZWxlbS5wYXJlbnROb2RlICYmIGVsZW0gIT0gZG9jdW1lbnQuYm9keSApIHtcbiAgICBlbGVtID0gZWxlbS5wYXJlbnROb2RlO1xuICAgIGlmICggbWF0Y2hlc1NlbGVjdG9yKCBlbGVtLCBzZWxlY3RvciApICkge1xuICAgICAgcmV0dXJuIGVsZW07XG4gICAgfVxuICB9XG59O1xuXG4vLyAtLS0tLSBnZXRRdWVyeUVsZW1lbnQgLS0tLS0gLy9cblxuLy8gdXNlIGVsZW1lbnQgYXMgc2VsZWN0b3Igc3RyaW5nXG51dGlscy5nZXRRdWVyeUVsZW1lbnQgPSBmdW5jdGlvbiggZWxlbSApIHtcbiAgaWYgKCB0eXBlb2YgZWxlbSA9PSAnc3RyaW5nJyApIHtcbiAgICByZXR1cm4gZG9jdW1lbnQucXVlcnlTZWxlY3RvciggZWxlbSApO1xuICB9XG4gIHJldHVybiBlbGVtO1xufTtcblxuLy8gLS0tLS0gaGFuZGxlRXZlbnQgLS0tLS0gLy9cblxuLy8gZW5hYmxlIC5vbnR5cGUgdG8gdHJpZ2dlciBmcm9tIC5hZGRFdmVudExpc3RlbmVyKCBlbGVtLCAndHlwZScgKVxudXRpbHMuaGFuZGxlRXZlbnQgPSBmdW5jdGlvbiggZXZlbnQgKSB7XG4gIHZhciBtZXRob2QgPSAnb24nICsgZXZlbnQudHlwZTtcbiAgaWYgKCB0aGlzWyBtZXRob2QgXSApIHtcbiAgICB0aGlzWyBtZXRob2QgXSggZXZlbnQgKTtcbiAgfVxufTtcblxuLy8gLS0tLS0gZmlsdGVyRmluZEVsZW1lbnRzIC0tLS0tIC8vXG5cbnV0aWxzLmZpbHRlckZpbmRFbGVtZW50cyA9IGZ1bmN0aW9uKCBlbGVtcywgc2VsZWN0b3IgKSB7XG4gIC8vIG1ha2UgYXJyYXkgb2YgZWxlbXNcbiAgZWxlbXMgPSB1dGlscy5tYWtlQXJyYXkoIGVsZW1zICk7XG4gIHZhciBmZkVsZW1zID0gW107XG5cbiAgZWxlbXMuZm9yRWFjaCggZnVuY3Rpb24oIGVsZW0gKSB7XG4gICAgLy8gY2hlY2sgdGhhdCBlbGVtIGlzIGFuIGFjdHVhbCBlbGVtZW50XG4gICAgaWYgKCAhKCBlbGVtIGluc3RhbmNlb2YgSFRNTEVsZW1lbnQgKSApIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgLy8gYWRkIGVsZW0gaWYgbm8gc2VsZWN0b3JcbiAgICBpZiAoICFzZWxlY3RvciApIHtcbiAgICAgIGZmRWxlbXMucHVzaCggZWxlbSApO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICAvLyBmaWx0ZXIgJiBmaW5kIGl0ZW1zIGlmIHdlIGhhdmUgYSBzZWxlY3RvclxuICAgIC8vIGZpbHRlclxuICAgIGlmICggbWF0Y2hlc1NlbGVjdG9yKCBlbGVtLCBzZWxlY3RvciApICkge1xuICAgICAgZmZFbGVtcy5wdXNoKCBlbGVtICk7XG4gICAgfVxuICAgIC8vIGZpbmQgY2hpbGRyZW5cbiAgICB2YXIgY2hpbGRFbGVtcyA9IGVsZW0ucXVlcnlTZWxlY3RvckFsbCggc2VsZWN0b3IgKTtcbiAgICAvLyBjb25jYXQgY2hpbGRFbGVtcyB0byBmaWx0ZXJGb3VuZCBhcnJheVxuICAgIGZvciAoIHZhciBpPTA7IGkgPCBjaGlsZEVsZW1zLmxlbmd0aDsgaSsrICkge1xuICAgICAgZmZFbGVtcy5wdXNoKCBjaGlsZEVsZW1zW2ldICk7XG4gICAgfVxuICB9KTtcblxuICByZXR1cm4gZmZFbGVtcztcbn07XG5cbi8vIC0tLS0tIGRlYm91bmNlTWV0aG9kIC0tLS0tIC8vXG5cbnV0aWxzLmRlYm91bmNlTWV0aG9kID0gZnVuY3Rpb24oIF9jbGFzcywgbWV0aG9kTmFtZSwgdGhyZXNob2xkICkge1xuICB0aHJlc2hvbGQgPSB0aHJlc2hvbGQgfHwgMTAwO1xuICAvLyBvcmlnaW5hbCBtZXRob2RcbiAgdmFyIG1ldGhvZCA9IF9jbGFzcy5wcm90b3R5cGVbIG1ldGhvZE5hbWUgXTtcbiAgdmFyIHRpbWVvdXROYW1lID0gbWV0aG9kTmFtZSArICdUaW1lb3V0JztcblxuICBfY2xhc3MucHJvdG90eXBlWyBtZXRob2ROYW1lIF0gPSBmdW5jdGlvbigpIHtcbiAgICB2YXIgdGltZW91dCA9IHRoaXNbIHRpbWVvdXROYW1lIF07XG4gICAgY2xlYXJUaW1lb3V0KCB0aW1lb3V0ICk7XG5cbiAgICB2YXIgYXJncyA9IGFyZ3VtZW50cztcbiAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgIHRoaXNbIHRpbWVvdXROYW1lIF0gPSBzZXRUaW1lb3V0KCBmdW5jdGlvbigpIHtcbiAgICAgIG1ldGhvZC5hcHBseSggX3RoaXMsIGFyZ3MgKTtcbiAgICAgIGRlbGV0ZSBfdGhpc1sgdGltZW91dE5hbWUgXTtcbiAgICB9LCB0aHJlc2hvbGQgKTtcbiAgfTtcbn07XG5cbi8vIC0tLS0tIGRvY1JlYWR5IC0tLS0tIC8vXG5cbnV0aWxzLmRvY1JlYWR5ID0gZnVuY3Rpb24oIGNhbGxiYWNrICkge1xuICB2YXIgcmVhZHlTdGF0ZSA9IGRvY3VtZW50LnJlYWR5U3RhdGU7XG4gIGlmICggcmVhZHlTdGF0ZSA9PSAnY29tcGxldGUnIHx8IHJlYWR5U3RhdGUgPT0gJ2ludGVyYWN0aXZlJyApIHtcbiAgICAvLyBkbyBhc3luYyB0byBhbGxvdyBmb3Igb3RoZXIgc2NyaXB0cyB0byBydW4uIG1ldGFmaXp6eS9mbGlja2l0eSM0NDFcbiAgICBzZXRUaW1lb3V0KCBjYWxsYmFjayApO1xuICB9IGVsc2Uge1xuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoICdET01Db250ZW50TG9hZGVkJywgY2FsbGJhY2sgKTtcbiAgfVxufTtcblxuLy8gLS0tLS0gaHRtbEluaXQgLS0tLS0gLy9cblxuLy8gaHR0cDovL2phbWVzcm9iZXJ0cy5uYW1lL2Jsb2cvMjAxMC8wMi8yMi9zdHJpbmctZnVuY3Rpb25zLWZvci1qYXZhc2NyaXB0LXRyaW0tdG8tY2FtZWwtY2FzZS10by1kYXNoZWQtYW5kLXRvLXVuZGVyc2NvcmUvXG51dGlscy50b0Rhc2hlZCA9IGZ1bmN0aW9uKCBzdHIgKSB7XG4gIHJldHVybiBzdHIucmVwbGFjZSggLyguKShbQS1aXSkvZywgZnVuY3Rpb24oIG1hdGNoLCAkMSwgJDIgKSB7XG4gICAgcmV0dXJuICQxICsgJy0nICsgJDI7XG4gIH0pLnRvTG93ZXJDYXNlKCk7XG59O1xuXG52YXIgY29uc29sZSA9IHdpbmRvdy5jb25zb2xlO1xuLyoqXG4gKiBhbGxvdyB1c2VyIHRvIGluaXRpYWxpemUgY2xhc3NlcyB2aWEgW2RhdGEtbmFtZXNwYWNlXSBvciAuanMtbmFtZXNwYWNlIGNsYXNzXG4gKiBodG1sSW5pdCggV2lkZ2V0LCAnd2lkZ2V0TmFtZScgKVxuICogb3B0aW9ucyBhcmUgcGFyc2VkIGZyb20gZGF0YS1uYW1lc3BhY2Utb3B0aW9uc1xuICovXG51dGlscy5odG1sSW5pdCA9IGZ1bmN0aW9uKCBXaWRnZXRDbGFzcywgbmFtZXNwYWNlICkge1xuICB1dGlscy5kb2NSZWFkeSggZnVuY3Rpb24oKSB7XG4gICAgdmFyIGRhc2hlZE5hbWVzcGFjZSA9IHV0aWxzLnRvRGFzaGVkKCBuYW1lc3BhY2UgKTtcbiAgICB2YXIgZGF0YUF0dHIgPSAnZGF0YS0nICsgZGFzaGVkTmFtZXNwYWNlO1xuICAgIHZhciBkYXRhQXR0ckVsZW1zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCggJ1snICsgZGF0YUF0dHIgKyAnXScgKTtcbiAgICB2YXIganNEYXNoRWxlbXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCAnLmpzLScgKyBkYXNoZWROYW1lc3BhY2UgKTtcbiAgICB2YXIgZWxlbXMgPSB1dGlscy5tYWtlQXJyYXkoIGRhdGFBdHRyRWxlbXMgKVxuICAgICAgLmNvbmNhdCggdXRpbHMubWFrZUFycmF5KCBqc0Rhc2hFbGVtcyApICk7XG4gICAgdmFyIGRhdGFPcHRpb25zQXR0ciA9IGRhdGFBdHRyICsgJy1vcHRpb25zJztcbiAgICB2YXIgalF1ZXJ5ID0gd2luZG93LmpRdWVyeTtcblxuICAgIGVsZW1zLmZvckVhY2goIGZ1bmN0aW9uKCBlbGVtICkge1xuICAgICAgdmFyIGF0dHIgPSBlbGVtLmdldEF0dHJpYnV0ZSggZGF0YUF0dHIgKSB8fFxuICAgICAgICBlbGVtLmdldEF0dHJpYnV0ZSggZGF0YU9wdGlvbnNBdHRyICk7XG4gICAgICB2YXIgb3B0aW9ucztcbiAgICAgIHRyeSB7XG4gICAgICAgIG9wdGlvbnMgPSBhdHRyICYmIEpTT04ucGFyc2UoIGF0dHIgKTtcbiAgICAgIH0gY2F0Y2ggKCBlcnJvciApIHtcbiAgICAgICAgLy8gbG9nIGVycm9yLCBkbyBub3QgaW5pdGlhbGl6ZVxuICAgICAgICBpZiAoIGNvbnNvbGUgKSB7XG4gICAgICAgICAgY29uc29sZS5lcnJvciggJ0Vycm9yIHBhcnNpbmcgJyArIGRhdGFBdHRyICsgJyBvbiAnICsgZWxlbS5jbGFzc05hbWUgK1xuICAgICAgICAgICc6ICcgKyBlcnJvciApO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIC8vIGluaXRpYWxpemVcbiAgICAgIHZhciBpbnN0YW5jZSA9IG5ldyBXaWRnZXRDbGFzcyggZWxlbSwgb3B0aW9ucyApO1xuICAgICAgLy8gbWFrZSBhdmFpbGFibGUgdmlhICQoKS5kYXRhKCduYW1lc3BhY2UnKVxuICAgICAgaWYgKCBqUXVlcnkgKSB7XG4gICAgICAgIGpRdWVyeS5kYXRhKCBlbGVtLCBuYW1lc3BhY2UsIGluc3RhbmNlICk7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgfSk7XG59O1xuXG4vLyAtLS0tLSAgLS0tLS0gLy9cblxucmV0dXJuIHV0aWxzO1xuXG59KSk7XG4iLCIvLyBhZGQsIHJlbW92ZSBjZWxsXG4oIGZ1bmN0aW9uKCB3aW5kb3csIGZhY3RvcnkgKSB7XG4gIC8vIHVuaXZlcnNhbCBtb2R1bGUgZGVmaW5pdGlvblxuICAvKiBqc2hpbnQgc3RyaWN0OiBmYWxzZSAqL1xuICBpZiAoIHR5cGVvZiBkZWZpbmUgPT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kICkge1xuICAgIC8vIEFNRFxuICAgIGRlZmluZSggW1xuICAgICAgJy4vZmxpY2tpdHknLFxuICAgICAgJ2Zpenp5LXVpLXV0aWxzL3V0aWxzJ1xuICAgIF0sIGZ1bmN0aW9uKCBGbGlja2l0eSwgdXRpbHMgKSB7XG4gICAgICByZXR1cm4gZmFjdG9yeSggd2luZG93LCBGbGlja2l0eSwgdXRpbHMgKTtcbiAgICB9KTtcbiAgfSBlbHNlIGlmICggdHlwZW9mIG1vZHVsZSA9PSAnb2JqZWN0JyAmJiBtb2R1bGUuZXhwb3J0cyApIHtcbiAgICAvLyBDb21tb25KU1xuICAgIG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeShcbiAgICAgIHdpbmRvdyxcbiAgICAgIHJlcXVpcmUoJy4vZmxpY2tpdHknKSxcbiAgICAgIHJlcXVpcmUoJ2Zpenp5LXVpLXV0aWxzJylcbiAgICApO1xuICB9IGVsc2Uge1xuICAgIC8vIGJyb3dzZXIgZ2xvYmFsXG4gICAgZmFjdG9yeShcbiAgICAgIHdpbmRvdyxcbiAgICAgIHdpbmRvdy5GbGlja2l0eSxcbiAgICAgIHdpbmRvdy5maXp6eVVJVXRpbHNcbiAgICApO1xuICB9XG5cbn0oIHdpbmRvdywgZnVuY3Rpb24gZmFjdG9yeSggd2luZG93LCBGbGlja2l0eSwgdXRpbHMgKSB7XG5cbid1c2Ugc3RyaWN0JztcblxuLy8gYXBwZW5kIGNlbGxzIHRvIGEgZG9jdW1lbnQgZnJhZ21lbnRcbmZ1bmN0aW9uIGdldENlbGxzRnJhZ21lbnQoIGNlbGxzICkge1xuICB2YXIgZnJhZ21lbnQgPSBkb2N1bWVudC5jcmVhdGVEb2N1bWVudEZyYWdtZW50KCk7XG4gIGNlbGxzLmZvckVhY2goIGZ1bmN0aW9uKCBjZWxsICkge1xuICAgIGZyYWdtZW50LmFwcGVuZENoaWxkKCBjZWxsLmVsZW1lbnQgKTtcbiAgfSk7XG4gIHJldHVybiBmcmFnbWVudDtcbn1cblxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gYWRkL3JlbW92ZSBjZWxsIHByb3RvdHlwZSAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAvL1xuXG52YXIgcHJvdG8gPSBGbGlja2l0eS5wcm90b3R5cGU7XG5cbi8qKlxuICogSW5zZXJ0LCBwcmVwZW5kLCBvciBhcHBlbmQgY2VsbHNcbiAqIEBwYXJhbSB7RWxlbWVudCwgQXJyYXksIE5vZGVMaXN0fSBlbGVtc1xuICogQHBhcmFtIHtJbnRlZ2VyfSBpbmRleFxuICovXG5wcm90by5pbnNlcnQgPSBmdW5jdGlvbiggZWxlbXMsIGluZGV4ICkge1xuICB2YXIgY2VsbHMgPSB0aGlzLl9tYWtlQ2VsbHMoIGVsZW1zICk7XG4gIGlmICggIWNlbGxzIHx8ICFjZWxscy5sZW5ndGggKSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIHZhciBsZW4gPSB0aGlzLmNlbGxzLmxlbmd0aDtcbiAgLy8gZGVmYXVsdCB0byBhcHBlbmRcbiAgaW5kZXggPSBpbmRleCA9PT0gdW5kZWZpbmVkID8gbGVuIDogaW5kZXg7XG4gIC8vIGFkZCBjZWxscyB3aXRoIGRvY3VtZW50IGZyYWdtZW50XG4gIHZhciBmcmFnbWVudCA9IGdldENlbGxzRnJhZ21lbnQoIGNlbGxzICk7XG4gIC8vIGFwcGVuZCB0byBzbGlkZXJcbiAgdmFyIGlzQXBwZW5kID0gaW5kZXggPT0gbGVuO1xuICBpZiAoIGlzQXBwZW5kICkge1xuICAgIHRoaXMuc2xpZGVyLmFwcGVuZENoaWxkKCBmcmFnbWVudCApO1xuICB9IGVsc2Uge1xuICAgIHZhciBpbnNlcnRDZWxsRWxlbWVudCA9IHRoaXMuY2VsbHNbIGluZGV4IF0uZWxlbWVudDtcbiAgICB0aGlzLnNsaWRlci5pbnNlcnRCZWZvcmUoIGZyYWdtZW50LCBpbnNlcnRDZWxsRWxlbWVudCApO1xuICB9XG4gIC8vIGFkZCB0byB0aGlzLmNlbGxzXG4gIGlmICggaW5kZXggPT09IDAgKSB7XG4gICAgLy8gcHJlcGVuZCwgYWRkIHRvIHN0YXJ0XG4gICAgdGhpcy5jZWxscyA9IGNlbGxzLmNvbmNhdCggdGhpcy5jZWxscyApO1xuICB9IGVsc2UgaWYgKCBpc0FwcGVuZCApIHtcbiAgICAvLyBhcHBlbmQsIGFkZCB0byBlbmRcbiAgICB0aGlzLmNlbGxzID0gdGhpcy5jZWxscy5jb25jYXQoIGNlbGxzICk7XG4gIH0gZWxzZSB7XG4gICAgLy8gaW5zZXJ0IGluIHRoaXMuY2VsbHNcbiAgICB2YXIgZW5kQ2VsbHMgPSB0aGlzLmNlbGxzLnNwbGljZSggaW5kZXgsIGxlbiAtIGluZGV4ICk7XG4gICAgdGhpcy5jZWxscyA9IHRoaXMuY2VsbHMuY29uY2F0KCBjZWxscyApLmNvbmNhdCggZW5kQ2VsbHMgKTtcbiAgfVxuXG4gIHRoaXMuX3NpemVDZWxscyggY2VsbHMgKTtcbiAgdGhpcy5jZWxsQ2hhbmdlKCBpbmRleCwgdHJ1ZSApO1xufTtcblxucHJvdG8uYXBwZW5kID0gZnVuY3Rpb24oIGVsZW1zICkge1xuICB0aGlzLmluc2VydCggZWxlbXMsIHRoaXMuY2VsbHMubGVuZ3RoICk7XG59O1xuXG5wcm90by5wcmVwZW5kID0gZnVuY3Rpb24oIGVsZW1zICkge1xuICB0aGlzLmluc2VydCggZWxlbXMsIDAgKTtcbn07XG5cbi8qKlxuICogUmVtb3ZlIGNlbGxzXG4gKiBAcGFyYW0ge0VsZW1lbnQsIEFycmF5LCBOb2RlTGlzdH0gZWxlbXNcbiAqL1xucHJvdG8ucmVtb3ZlID0gZnVuY3Rpb24oIGVsZW1zICkge1xuICB2YXIgY2VsbHMgPSB0aGlzLmdldENlbGxzKCBlbGVtcyApO1xuICBpZiAoICFjZWxscyB8fCAhY2VsbHMubGVuZ3RoICkge1xuICAgIHJldHVybjtcbiAgfVxuXG4gIHZhciBtaW5DZWxsSW5kZXggPSB0aGlzLmNlbGxzLmxlbmd0aCAtIDE7XG4gIC8vIHJlbW92ZSBjZWxscyBmcm9tIGNvbGxlY3Rpb24gJiBET01cbiAgY2VsbHMuZm9yRWFjaCggZnVuY3Rpb24oIGNlbGwgKSB7XG4gICAgY2VsbC5yZW1vdmUoKTtcbiAgICB2YXIgaW5kZXggPSB0aGlzLmNlbGxzLmluZGV4T2YoIGNlbGwgKTtcbiAgICBtaW5DZWxsSW5kZXggPSBNYXRoLm1pbiggaW5kZXgsIG1pbkNlbGxJbmRleCApO1xuICAgIHV0aWxzLnJlbW92ZUZyb20oIHRoaXMuY2VsbHMsIGNlbGwgKTtcbiAgfSwgdGhpcyApO1xuXG4gIHRoaXMuY2VsbENoYW5nZSggbWluQ2VsbEluZGV4LCB0cnVlICk7XG59O1xuXG4vKipcbiAqIGxvZ2ljIHRvIGJlIHJ1biBhZnRlciBhIGNlbGwncyBzaXplIGNoYW5nZXNcbiAqIEBwYXJhbSB7RWxlbWVudH0gZWxlbSAtIGNlbGwncyBlbGVtZW50XG4gKi9cbnByb3RvLmNlbGxTaXplQ2hhbmdlID0gZnVuY3Rpb24oIGVsZW0gKSB7XG4gIHZhciBjZWxsID0gdGhpcy5nZXRDZWxsKCBlbGVtICk7XG4gIGlmICggIWNlbGwgKSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIGNlbGwuZ2V0U2l6ZSgpO1xuXG4gIHZhciBpbmRleCA9IHRoaXMuY2VsbHMuaW5kZXhPZiggY2VsbCApO1xuICB0aGlzLmNlbGxDaGFuZ2UoIGluZGV4ICk7XG59O1xuXG4vKipcbiAqIGxvZ2ljIGFueSB0aW1lIGEgY2VsbCBpcyBjaGFuZ2VkOiBhZGRlZCwgcmVtb3ZlZCwgb3Igc2l6ZSBjaGFuZ2VkXG4gKiBAcGFyYW0ge0ludGVnZXJ9IGNoYW5nZWRDZWxsSW5kZXggLSBpbmRleCBvZiB0aGUgY2hhbmdlZCBjZWxsLCBvcHRpb25hbFxuICovXG5wcm90by5jZWxsQ2hhbmdlID0gZnVuY3Rpb24oIGNoYW5nZWRDZWxsSW5kZXgsIGlzUG9zaXRpb25pbmdTbGlkZXIgKSB7XG4gIHZhciBwcmV2U2VsZWN0ZWRFbGVtID0gdGhpcy5zZWxlY3RlZEVsZW1lbnQ7XG4gIHRoaXMuX3Bvc2l0aW9uQ2VsbHMoIGNoYW5nZWRDZWxsSW5kZXggKTtcbiAgdGhpcy5fZ2V0V3JhcFNoaWZ0Q2VsbHMoKTtcbiAgdGhpcy5zZXRHYWxsZXJ5U2l6ZSgpO1xuICAvLyB1cGRhdGUgc2VsZWN0ZWRJbmRleFxuICAvLyB0cnkgdG8gbWFpbnRhaW4gcG9zaXRpb24gJiBzZWxlY3QgcHJldmlvdXMgc2VsZWN0ZWQgZWxlbWVudFxuICB2YXIgY2VsbCA9IHRoaXMuZ2V0Q2VsbCggcHJldlNlbGVjdGVkRWxlbSApO1xuICBpZiAoIGNlbGwgKSB7XG4gICAgdGhpcy5zZWxlY3RlZEluZGV4ID0gdGhpcy5nZXRDZWxsU2xpZGVJbmRleCggY2VsbCApO1xuICB9XG4gIHRoaXMuc2VsZWN0ZWRJbmRleCA9IE1hdGgubWluKCB0aGlzLnNsaWRlcy5sZW5ndGggLSAxLCB0aGlzLnNlbGVjdGVkSW5kZXggKTtcblxuICB0aGlzLmVtaXRFdmVudCggJ2NlbGxDaGFuZ2UnLCBbIGNoYW5nZWRDZWxsSW5kZXggXSApO1xuICAvLyBwb3NpdGlvbiBzbGlkZXJcbiAgdGhpcy5zZWxlY3QoIHRoaXMuc2VsZWN0ZWRJbmRleCApO1xuICAvLyBkbyBub3QgcG9zaXRpb24gc2xpZGVyIGFmdGVyIGxhenkgbG9hZFxuICBpZiAoIGlzUG9zaXRpb25pbmdTbGlkZXIgKSB7XG4gICAgdGhpcy5wb3NpdGlvblNsaWRlckF0U2VsZWN0ZWQoKTtcbiAgfVxufTtcblxuLy8gLS0tLS0gIC0tLS0tIC8vXG5cbnJldHVybiBGbGlja2l0eTtcblxufSkpO1xuIiwiLy8gYW5pbWF0ZVxuKCBmdW5jdGlvbiggd2luZG93LCBmYWN0b3J5ICkge1xuICAvLyB1bml2ZXJzYWwgbW9kdWxlIGRlZmluaXRpb25cbiAgLyoganNoaW50IHN0cmljdDogZmFsc2UgKi9cbiAgaWYgKCB0eXBlb2YgZGVmaW5lID09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZCApIHtcbiAgICAvLyBBTURcbiAgICBkZWZpbmUoIFtcbiAgICAgICdmaXp6eS11aS11dGlscy91dGlscydcbiAgICBdLCBmdW5jdGlvbiggdXRpbHMgKSB7XG4gICAgICByZXR1cm4gZmFjdG9yeSggd2luZG93LCB1dGlscyApO1xuICAgIH0pO1xuICB9IGVsc2UgaWYgKCB0eXBlb2YgbW9kdWxlID09ICdvYmplY3QnICYmIG1vZHVsZS5leHBvcnRzICkge1xuICAgIC8vIENvbW1vbkpTXG4gICAgbW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KFxuICAgICAgd2luZG93LFxuICAgICAgcmVxdWlyZSgnZml6enktdWktdXRpbHMnKVxuICAgICk7XG4gIH0gZWxzZSB7XG4gICAgLy8gYnJvd3NlciBnbG9iYWxcbiAgICB3aW5kb3cuRmxpY2tpdHkgPSB3aW5kb3cuRmxpY2tpdHkgfHwge307XG4gICAgd2luZG93LkZsaWNraXR5LmFuaW1hdGVQcm90b3R5cGUgPSBmYWN0b3J5KFxuICAgICAgd2luZG93LFxuICAgICAgd2luZG93LmZpenp5VUlVdGlsc1xuICAgICk7XG4gIH1cblxufSggd2luZG93LCBmdW5jdGlvbiBmYWN0b3J5KCB3aW5kb3csIHV0aWxzICkge1xuXG4ndXNlIHN0cmljdCc7XG5cbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tIGFuaW1hdGUgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gLy9cblxudmFyIHByb3RvID0ge307XG5cbnByb3RvLnN0YXJ0QW5pbWF0aW9uID0gZnVuY3Rpb24oKSB7XG4gIGlmICggdGhpcy5pc0FuaW1hdGluZyApIHtcbiAgICByZXR1cm47XG4gIH1cblxuICB0aGlzLmlzQW5pbWF0aW5nID0gdHJ1ZTtcbiAgdGhpcy5yZXN0aW5nRnJhbWVzID0gMDtcbiAgdGhpcy5hbmltYXRlKCk7XG59O1xuXG5wcm90by5hbmltYXRlID0gZnVuY3Rpb24oKSB7XG4gIHRoaXMuYXBwbHlEcmFnRm9yY2UoKTtcbiAgdGhpcy5hcHBseVNlbGVjdGVkQXR0cmFjdGlvbigpO1xuXG4gIHZhciBwcmV2aW91c1ggPSB0aGlzLng7XG5cbiAgdGhpcy5pbnRlZ3JhdGVQaHlzaWNzKCk7XG4gIHRoaXMucG9zaXRpb25TbGlkZXIoKTtcbiAgdGhpcy5zZXR0bGUoIHByZXZpb3VzWCApO1xuICAvLyBhbmltYXRlIG5leHQgZnJhbWVcbiAgaWYgKCB0aGlzLmlzQW5pbWF0aW5nICkge1xuICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKCBmdW5jdGlvbiBhbmltYXRlRnJhbWUoKSB7XG4gICAgICBfdGhpcy5hbmltYXRlKCk7XG4gICAgfSk7XG4gIH1cbn07XG5cbnByb3RvLnBvc2l0aW9uU2xpZGVyID0gZnVuY3Rpb24oKSB7XG4gIHZhciB4ID0gdGhpcy54O1xuICAvLyB3cmFwIHBvc2l0aW9uIGFyb3VuZFxuICBpZiAoIHRoaXMub3B0aW9ucy53cmFwQXJvdW5kICYmIHRoaXMuY2VsbHMubGVuZ3RoID4gMSApIHtcbiAgICB4ID0gdXRpbHMubW9kdWxvKCB4LCB0aGlzLnNsaWRlYWJsZVdpZHRoICk7XG4gICAgeCA9IHggLSB0aGlzLnNsaWRlYWJsZVdpZHRoO1xuICAgIHRoaXMuc2hpZnRXcmFwQ2VsbHMoIHggKTtcbiAgfVxuXG4gIHRoaXMuc2V0VHJhbnNsYXRlWCggeCwgdGhpcy5pc0FuaW1hdGluZyApO1xuICB0aGlzLmRpc3BhdGNoU2Nyb2xsRXZlbnQoKTtcbn07XG5cbnByb3RvLnNldFRyYW5zbGF0ZVggPSBmdW5jdGlvbiggeCwgaXMzZCApIHtcbiAgeCArPSB0aGlzLmN1cnNvclBvc2l0aW9uO1xuICAvLyByZXZlcnNlIGlmIHJpZ2h0LXRvLWxlZnQgYW5kIHVzaW5nIHRyYW5zZm9ybVxuICB4ID0gdGhpcy5vcHRpb25zLnJpZ2h0VG9MZWZ0ID8gLXggOiB4O1xuICB2YXIgdHJhbnNsYXRlWCA9IHRoaXMuZ2V0UG9zaXRpb25WYWx1ZSggeCApO1xuICAvLyB1c2UgM0QgdHJhbmZvcm1zIGZvciBoYXJkd2FyZSBhY2NlbGVyYXRpb24gb24gaU9TXG4gIC8vIGJ1dCB1c2UgMkQgd2hlbiBzZXR0bGVkLCBmb3IgYmV0dGVyIGZvbnQtcmVuZGVyaW5nXG4gIHRoaXMuc2xpZGVyLnN0eWxlLnRyYW5zZm9ybSA9IGlzM2QgP1xuICAgICd0cmFuc2xhdGUzZCgnICsgdHJhbnNsYXRlWCArICcsMCwwKScgOiAndHJhbnNsYXRlWCgnICsgdHJhbnNsYXRlWCArICcpJztcbn07XG5cbnByb3RvLmRpc3BhdGNoU2Nyb2xsRXZlbnQgPSBmdW5jdGlvbigpIHtcbiAgdmFyIGZpcnN0U2xpZGUgPSB0aGlzLnNsaWRlc1swXTtcbiAgaWYgKCAhZmlyc3RTbGlkZSApIHtcbiAgICByZXR1cm47XG4gIH1cbiAgdmFyIHBvc2l0aW9uWCA9IC10aGlzLnggLSBmaXJzdFNsaWRlLnRhcmdldDtcbiAgdmFyIHByb2dyZXNzID0gcG9zaXRpb25YIC8gdGhpcy5zbGlkZXNXaWR0aDtcbiAgdGhpcy5kaXNwYXRjaEV2ZW50KCAnc2Nyb2xsJywgbnVsbCwgWyBwcm9ncmVzcywgcG9zaXRpb25YIF0gKTtcbn07XG5cbnByb3RvLnBvc2l0aW9uU2xpZGVyQXRTZWxlY3RlZCA9IGZ1bmN0aW9uKCkge1xuICBpZiAoICF0aGlzLmNlbGxzLmxlbmd0aCApIHtcbiAgICByZXR1cm47XG4gIH1cbiAgdGhpcy54ID0gLXRoaXMuc2VsZWN0ZWRTbGlkZS50YXJnZXQ7XG4gIHRoaXMudmVsb2NpdHkgPSAwOyAvLyBzdG9wIHdvYmJsZVxuICB0aGlzLnBvc2l0aW9uU2xpZGVyKCk7XG59O1xuXG5wcm90by5nZXRQb3NpdGlvblZhbHVlID0gZnVuY3Rpb24oIHBvc2l0aW9uICkge1xuICBpZiAoIHRoaXMub3B0aW9ucy5wZXJjZW50UG9zaXRpb24gKSB7XG4gICAgLy8gcGVyY2VudCBwb3NpdGlvbiwgcm91bmQgdG8gMiBkaWdpdHMsIGxpa2UgMTIuMzQlXG4gICAgcmV0dXJuICggTWF0aC5yb3VuZCggKCBwb3NpdGlvbiAvIHRoaXMuc2l6ZS5pbm5lcldpZHRoICkgKiAxMDAwMCApICogMC4wMSApKyAnJSc7XG4gIH0gZWxzZSB7XG4gICAgLy8gcGl4ZWwgcG9zaXRpb25pbmdcbiAgICByZXR1cm4gTWF0aC5yb3VuZCggcG9zaXRpb24gKSArICdweCc7XG4gIH1cbn07XG5cbnByb3RvLnNldHRsZSA9IGZ1bmN0aW9uKCBwcmV2aW91c1ggKSB7XG4gIC8vIGtlZXAgdHJhY2sgb2YgZnJhbWVzIHdoZXJlIHggaGFzbid0IG1vdmVkXG4gIGlmICggIXRoaXMuaXNQb2ludGVyRG93biAmJiBNYXRoLnJvdW5kKCB0aGlzLnggKiAxMDAgKSA9PSBNYXRoLnJvdW5kKCBwcmV2aW91c1ggKiAxMDAgKSApIHtcbiAgICB0aGlzLnJlc3RpbmdGcmFtZXMrKztcbiAgfVxuICAvLyBzdG9wIGFuaW1hdGluZyBpZiByZXN0aW5nIGZvciAzIG9yIG1vcmUgZnJhbWVzXG4gIGlmICggdGhpcy5yZXN0aW5nRnJhbWVzID4gMiApIHtcbiAgICB0aGlzLmlzQW5pbWF0aW5nID0gZmFsc2U7XG4gICAgZGVsZXRlIHRoaXMuaXNGcmVlU2Nyb2xsaW5nO1xuICAgIC8vIHJlbmRlciBwb3NpdGlvbiB3aXRoIHRyYW5zbGF0ZVggd2hlbiBzZXR0bGVkXG4gICAgdGhpcy5wb3NpdGlvblNsaWRlcigpO1xuICAgIHRoaXMuZGlzcGF0Y2hFdmVudCggJ3NldHRsZScsIG51bGwsIFsgdGhpcy5zZWxlY3RlZEluZGV4IF0gKTtcbiAgfVxufTtcblxucHJvdG8uc2hpZnRXcmFwQ2VsbHMgPSBmdW5jdGlvbiggeCApIHtcbiAgLy8gc2hpZnQgYmVmb3JlIGNlbGxzXG4gIHZhciBiZWZvcmVHYXAgPSB0aGlzLmN1cnNvclBvc2l0aW9uICsgeDtcbiAgdGhpcy5fc2hpZnRDZWxscyggdGhpcy5iZWZvcmVTaGlmdENlbGxzLCBiZWZvcmVHYXAsIC0xICk7XG4gIC8vIHNoaWZ0IGFmdGVyIGNlbGxzXG4gIHZhciBhZnRlckdhcCA9IHRoaXMuc2l6ZS5pbm5lcldpZHRoIC0gKCB4ICsgdGhpcy5zbGlkZWFibGVXaWR0aCArIHRoaXMuY3Vyc29yUG9zaXRpb24gKTtcbiAgdGhpcy5fc2hpZnRDZWxscyggdGhpcy5hZnRlclNoaWZ0Q2VsbHMsIGFmdGVyR2FwLCAxICk7XG59O1xuXG5wcm90by5fc2hpZnRDZWxscyA9IGZ1bmN0aW9uKCBjZWxscywgZ2FwLCBzaGlmdCApIHtcbiAgZm9yICggdmFyIGk9MDsgaSA8IGNlbGxzLmxlbmd0aDsgaSsrICkge1xuICAgIHZhciBjZWxsID0gY2VsbHNbaV07XG4gICAgdmFyIGNlbGxTaGlmdCA9IGdhcCA+IDAgPyBzaGlmdCA6IDA7XG4gICAgY2VsbC53cmFwU2hpZnQoIGNlbGxTaGlmdCApO1xuICAgIGdhcCAtPSBjZWxsLnNpemUub3V0ZXJXaWR0aDtcbiAgfVxufTtcblxucHJvdG8uX3Vuc2hpZnRDZWxscyA9IGZ1bmN0aW9uKCBjZWxscyApIHtcbiAgaWYgKCAhY2VsbHMgfHwgIWNlbGxzLmxlbmd0aCApIHtcbiAgICByZXR1cm47XG4gIH1cbiAgZm9yICggdmFyIGk9MDsgaSA8IGNlbGxzLmxlbmd0aDsgaSsrICkge1xuICAgIGNlbGxzW2ldLndyYXBTaGlmdCggMCApO1xuICB9XG59O1xuXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSBwaHlzaWNzIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tIC8vXG5cbnByb3RvLmludGVncmF0ZVBoeXNpY3MgPSBmdW5jdGlvbigpIHtcbiAgdGhpcy54ICs9IHRoaXMudmVsb2NpdHk7XG4gIHRoaXMudmVsb2NpdHkgKj0gdGhpcy5nZXRGcmljdGlvbkZhY3RvcigpO1xufTtcblxucHJvdG8uYXBwbHlGb3JjZSA9IGZ1bmN0aW9uKCBmb3JjZSApIHtcbiAgdGhpcy52ZWxvY2l0eSArPSBmb3JjZTtcbn07XG5cbnByb3RvLmdldEZyaWN0aW9uRmFjdG9yID0gZnVuY3Rpb24oKSB7XG4gIHJldHVybiAxIC0gdGhpcy5vcHRpb25zWyB0aGlzLmlzRnJlZVNjcm9sbGluZyA/ICdmcmVlU2Nyb2xsRnJpY3Rpb24nIDogJ2ZyaWN0aW9uJyBdO1xufTtcblxucHJvdG8uZ2V0UmVzdGluZ1Bvc2l0aW9uID0gZnVuY3Rpb24oKSB7XG4gIC8vIG15IHRoYW5rcyB0byBTdGV2ZW4gV2l0dGVucywgd2hvIHNpbXBsaWZpZWQgdGhpcyBtYXRoIGdyZWF0bHlcbiAgcmV0dXJuIHRoaXMueCArIHRoaXMudmVsb2NpdHkgLyAoIDEgLSB0aGlzLmdldEZyaWN0aW9uRmFjdG9yKCkgKTtcbn07XG5cbnByb3RvLmFwcGx5RHJhZ0ZvcmNlID0gZnVuY3Rpb24oKSB7XG4gIGlmICggIXRoaXMuaXNEcmFnZ2FibGUgfHwgIXRoaXMuaXNQb2ludGVyRG93biApIHtcbiAgICByZXR1cm47XG4gIH1cbiAgLy8gY2hhbmdlIHRoZSBwb3NpdGlvbiB0byBkcmFnIHBvc2l0aW9uIGJ5IGFwcGx5aW5nIGZvcmNlXG4gIHZhciBkcmFnVmVsb2NpdHkgPSB0aGlzLmRyYWdYIC0gdGhpcy54O1xuICB2YXIgZHJhZ0ZvcmNlID0gZHJhZ1ZlbG9jaXR5IC0gdGhpcy52ZWxvY2l0eTtcbiAgdGhpcy5hcHBseUZvcmNlKCBkcmFnRm9yY2UgKTtcbn07XG5cbnByb3RvLmFwcGx5U2VsZWN0ZWRBdHRyYWN0aW9uID0gZnVuY3Rpb24oKSB7XG4gIC8vIGRvIG5vdCBhdHRyYWN0IGlmIHBvaW50ZXIgZG93biBvciBubyBzbGlkZXNcbiAgdmFyIGRyYWdEb3duID0gdGhpcy5pc0RyYWdnYWJsZSAmJiB0aGlzLmlzUG9pbnRlckRvd247XG4gIGlmICggZHJhZ0Rvd24gfHwgdGhpcy5pc0ZyZWVTY3JvbGxpbmcgfHwgIXRoaXMuc2xpZGVzLmxlbmd0aCApIHtcbiAgICByZXR1cm47XG4gIH1cbiAgdmFyIGRpc3RhbmNlID0gdGhpcy5zZWxlY3RlZFNsaWRlLnRhcmdldCAqIC0xIC0gdGhpcy54O1xuICB2YXIgZm9yY2UgPSBkaXN0YW5jZSAqIHRoaXMub3B0aW9ucy5zZWxlY3RlZEF0dHJhY3Rpb247XG4gIHRoaXMuYXBwbHlGb3JjZSggZm9yY2UgKTtcbn07XG5cbnJldHVybiBwcm90bztcblxufSkpO1xuIiwiLy8gRmxpY2tpdHkuQ2VsbFxuKCBmdW5jdGlvbiggd2luZG93LCBmYWN0b3J5ICkge1xuICAvLyB1bml2ZXJzYWwgbW9kdWxlIGRlZmluaXRpb25cbiAgLyoganNoaW50IHN0cmljdDogZmFsc2UgKi9cbiAgaWYgKCB0eXBlb2YgZGVmaW5lID09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZCApIHtcbiAgICAvLyBBTURcbiAgICBkZWZpbmUoIFtcbiAgICAgICdnZXQtc2l6ZS9nZXQtc2l6ZSdcbiAgICBdLCBmdW5jdGlvbiggZ2V0U2l6ZSApIHtcbiAgICAgIHJldHVybiBmYWN0b3J5KCB3aW5kb3csIGdldFNpemUgKTtcbiAgICB9KTtcbiAgfSBlbHNlIGlmICggdHlwZW9mIG1vZHVsZSA9PSAnb2JqZWN0JyAmJiBtb2R1bGUuZXhwb3J0cyApIHtcbiAgICAvLyBDb21tb25KU1xuICAgIG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeShcbiAgICAgIHdpbmRvdyxcbiAgICAgIHJlcXVpcmUoJ2dldC1zaXplJylcbiAgICApO1xuICB9IGVsc2Uge1xuICAgIC8vIGJyb3dzZXIgZ2xvYmFsXG4gICAgd2luZG93LkZsaWNraXR5ID0gd2luZG93LkZsaWNraXR5IHx8IHt9O1xuICAgIHdpbmRvdy5GbGlja2l0eS5DZWxsID0gZmFjdG9yeShcbiAgICAgIHdpbmRvdyxcbiAgICAgIHdpbmRvdy5nZXRTaXplXG4gICAgKTtcbiAgfVxuXG59KCB3aW5kb3csIGZ1bmN0aW9uIGZhY3RvcnkoIHdpbmRvdywgZ2V0U2l6ZSApIHtcblxuJ3VzZSBzdHJpY3QnO1xuXG5mdW5jdGlvbiBDZWxsKCBlbGVtLCBwYXJlbnQgKSB7XG4gIHRoaXMuZWxlbWVudCA9IGVsZW07XG4gIHRoaXMucGFyZW50ID0gcGFyZW50O1xuXG4gIHRoaXMuY3JlYXRlKCk7XG59XG5cbnZhciBwcm90byA9IENlbGwucHJvdG90eXBlO1xuXG5wcm90by5jcmVhdGUgPSBmdW5jdGlvbigpIHtcbiAgdGhpcy5lbGVtZW50LnN0eWxlLnBvc2l0aW9uID0gJ2Fic29sdXRlJztcbiAgdGhpcy5lbGVtZW50LnNldEF0dHJpYnV0ZSggJ2FyaWEtaGlkZGVuJywgJ3RydWUnICk7XG4gIHRoaXMueCA9IDA7XG4gIHRoaXMuc2hpZnQgPSAwO1xufTtcblxucHJvdG8uZGVzdHJveSA9IGZ1bmN0aW9uKCkge1xuICAvLyByZXNldCBzdHlsZVxuICB0aGlzLnVuc2VsZWN0KCk7XG4gIHRoaXMuZWxlbWVudC5zdHlsZS5wb3NpdGlvbiA9ICcnO1xuICB2YXIgc2lkZSA9IHRoaXMucGFyZW50Lm9yaWdpblNpZGU7XG4gIHRoaXMuZWxlbWVudC5zdHlsZVsgc2lkZSBdID0gJyc7XG59O1xuXG5wcm90by5nZXRTaXplID0gZnVuY3Rpb24oKSB7XG4gIHRoaXMuc2l6ZSA9IGdldFNpemUoIHRoaXMuZWxlbWVudCApO1xufTtcblxucHJvdG8uc2V0UG9zaXRpb24gPSBmdW5jdGlvbiggeCApIHtcbiAgdGhpcy54ID0geDtcbiAgdGhpcy51cGRhdGVUYXJnZXQoKTtcbiAgdGhpcy5yZW5kZXJQb3NpdGlvbiggeCApO1xufTtcblxuLy8gc2V0RGVmYXVsdFRhcmdldCB2MSBtZXRob2QsIGJhY2t3YXJkcyBjb21wYXRpYmlsaXR5LCByZW1vdmUgaW4gdjNcbnByb3RvLnVwZGF0ZVRhcmdldCA9IHByb3RvLnNldERlZmF1bHRUYXJnZXQgPSBmdW5jdGlvbigpIHtcbiAgdmFyIG1hcmdpblByb3BlcnR5ID0gdGhpcy5wYXJlbnQub3JpZ2luU2lkZSA9PSAnbGVmdCcgPyAnbWFyZ2luTGVmdCcgOiAnbWFyZ2luUmlnaHQnO1xuICB0aGlzLnRhcmdldCA9IHRoaXMueCArIHRoaXMuc2l6ZVsgbWFyZ2luUHJvcGVydHkgXSArXG4gICAgdGhpcy5zaXplLndpZHRoICogdGhpcy5wYXJlbnQuY2VsbEFsaWduO1xufTtcblxucHJvdG8ucmVuZGVyUG9zaXRpb24gPSBmdW5jdGlvbiggeCApIHtcbiAgLy8gcmVuZGVyIHBvc2l0aW9uIG9mIGNlbGwgd2l0aCBpbiBzbGlkZXJcbiAgdmFyIHNpZGUgPSB0aGlzLnBhcmVudC5vcmlnaW5TaWRlO1xuICB0aGlzLmVsZW1lbnQuc3R5bGVbIHNpZGUgXSA9IHRoaXMucGFyZW50LmdldFBvc2l0aW9uVmFsdWUoIHggKTtcbn07XG5cbnByb3RvLnNlbGVjdCA9IGZ1bmN0aW9uKCkge1xuICB0aGlzLmVsZW1lbnQuY2xhc3NMaXN0LmFkZCgnaXMtc2VsZWN0ZWQnKTtcbiAgdGhpcy5lbGVtZW50LnJlbW92ZUF0dHJpYnV0ZSgnYXJpYS1oaWRkZW4nKTtcbn07XG5cbnByb3RvLnVuc2VsZWN0ID0gZnVuY3Rpb24oKSB7XG4gIHRoaXMuZWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKCdpcy1zZWxlY3RlZCcpO1xuICB0aGlzLmVsZW1lbnQuc2V0QXR0cmlidXRlKCAnYXJpYS1oaWRkZW4nLCAndHJ1ZScgKTtcbn07XG5cbi8qKlxuICogQHBhcmFtIHtJbnRlZ2VyfSBmYWN0b3IgLSAwLCAxLCBvciAtMVxuKiovXG5wcm90by53cmFwU2hpZnQgPSBmdW5jdGlvbiggc2hpZnQgKSB7XG4gIHRoaXMuc2hpZnQgPSBzaGlmdDtcbiAgdGhpcy5yZW5kZXJQb3NpdGlvbiggdGhpcy54ICsgdGhpcy5wYXJlbnQuc2xpZGVhYmxlV2lkdGggKiBzaGlmdCApO1xufTtcblxucHJvdG8ucmVtb3ZlID0gZnVuY3Rpb24oKSB7XG4gIHRoaXMuZWxlbWVudC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKCB0aGlzLmVsZW1lbnQgKTtcbn07XG5cbnJldHVybiBDZWxsO1xuXG59KSk7XG4iLCIvLyBkcmFnXG4oIGZ1bmN0aW9uKCB3aW5kb3csIGZhY3RvcnkgKSB7XG4gIC8vIHVuaXZlcnNhbCBtb2R1bGUgZGVmaW5pdGlvblxuICAvKiBqc2hpbnQgc3RyaWN0OiBmYWxzZSAqL1xuICBpZiAoIHR5cGVvZiBkZWZpbmUgPT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kICkge1xuICAgIC8vIEFNRFxuICAgIGRlZmluZSggW1xuICAgICAgJy4vZmxpY2tpdHknLFxuICAgICAgJ3VuaWRyYWdnZXIvdW5pZHJhZ2dlcicsXG4gICAgICAnZml6enktdWktdXRpbHMvdXRpbHMnXG4gICAgXSwgZnVuY3Rpb24oIEZsaWNraXR5LCBVbmlkcmFnZ2VyLCB1dGlscyApIHtcbiAgICAgIHJldHVybiBmYWN0b3J5KCB3aW5kb3csIEZsaWNraXR5LCBVbmlkcmFnZ2VyLCB1dGlscyApO1xuICAgIH0pO1xuICB9IGVsc2UgaWYgKCB0eXBlb2YgbW9kdWxlID09ICdvYmplY3QnICYmIG1vZHVsZS5leHBvcnRzICkge1xuICAgIC8vIENvbW1vbkpTXG4gICAgbW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KFxuICAgICAgd2luZG93LFxuICAgICAgcmVxdWlyZSgnLi9mbGlja2l0eScpLFxuICAgICAgcmVxdWlyZSgndW5pZHJhZ2dlcicpLFxuICAgICAgcmVxdWlyZSgnZml6enktdWktdXRpbHMnKVxuICAgICk7XG4gIH0gZWxzZSB7XG4gICAgLy8gYnJvd3NlciBnbG9iYWxcbiAgICB3aW5kb3cuRmxpY2tpdHkgPSBmYWN0b3J5KFxuICAgICAgd2luZG93LFxuICAgICAgd2luZG93LkZsaWNraXR5LFxuICAgICAgd2luZG93LlVuaWRyYWdnZXIsXG4gICAgICB3aW5kb3cuZml6enlVSVV0aWxzXG4gICAgKTtcbiAgfVxuXG59KCB3aW5kb3csIGZ1bmN0aW9uIGZhY3RvcnkoIHdpbmRvdywgRmxpY2tpdHksIFVuaWRyYWdnZXIsIHV0aWxzICkge1xuXG4ndXNlIHN0cmljdCc7XG5cbi8vIC0tLS0tIGRlZmF1bHRzIC0tLS0tIC8vXG5cbnV0aWxzLmV4dGVuZCggRmxpY2tpdHkuZGVmYXVsdHMsIHtcbiAgZHJhZ2dhYmxlOiAnPjEnLFxuICBkcmFnVGhyZXNob2xkOiAzLFxufSk7XG5cbi8vIC0tLS0tIGNyZWF0ZSAtLS0tLSAvL1xuXG5GbGlja2l0eS5jcmVhdGVNZXRob2RzLnB1c2goJ19jcmVhdGVEcmFnJyk7XG5cbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tIGRyYWcgcHJvdG90eXBlIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tIC8vXG5cbnZhciBwcm90byA9IEZsaWNraXR5LnByb3RvdHlwZTtcbnV0aWxzLmV4dGVuZCggcHJvdG8sIFVuaWRyYWdnZXIucHJvdG90eXBlICk7XG5wcm90by5fdG91Y2hBY3Rpb25WYWx1ZSA9ICdwYW4teSc7XG5cbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tICAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAvL1xuXG52YXIgaXNUb3VjaCA9ICdjcmVhdGVUb3VjaCcgaW4gZG9jdW1lbnQ7XG52YXIgaXNUb3VjaG1vdmVTY3JvbGxDYW5jZWxlZCA9IGZhbHNlO1xuXG5wcm90by5fY3JlYXRlRHJhZyA9IGZ1bmN0aW9uKCkge1xuICB0aGlzLm9uKCAnYWN0aXZhdGUnLCB0aGlzLm9uQWN0aXZhdGVEcmFnICk7XG4gIHRoaXMub24oICd1aUNoYW5nZScsIHRoaXMuX3VpQ2hhbmdlRHJhZyApO1xuICB0aGlzLm9uKCAnZGVhY3RpdmF0ZScsIHRoaXMub25EZWFjdGl2YXRlRHJhZyApO1xuICB0aGlzLm9uKCAnY2VsbENoYW5nZScsIHRoaXMudXBkYXRlRHJhZ2dhYmxlICk7XG4gIC8vIFRPRE8gdXBkYXRlRHJhZ2dhYmxlIG9uIHJlc2l6ZT8gaWYgZ3JvdXBDZWxscyAmIHNsaWRlcyBjaGFuZ2VcbiAgLy8gSEFDSyAtIGFkZCBzZWVtaW5nbHkgaW5ub2N1b3VzIGhhbmRsZXIgdG8gZml4IGlPUyAxMCBzY3JvbGwgYmVoYXZpb3JcbiAgLy8gIzQ1NywgUnViYVhhL1NvcnRhYmxlIzk3M1xuICBpZiAoIGlzVG91Y2ggJiYgIWlzVG91Y2htb3ZlU2Nyb2xsQ2FuY2VsZWQgKSB7XG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoICd0b3VjaG1vdmUnLCBmdW5jdGlvbigpIHt9KTtcbiAgICBpc1RvdWNobW92ZVNjcm9sbENhbmNlbGVkID0gdHJ1ZTtcbiAgfVxufTtcblxucHJvdG8ub25BY3RpdmF0ZURyYWcgPSBmdW5jdGlvbigpIHtcbiAgdGhpcy5oYW5kbGVzID0gWyB0aGlzLnZpZXdwb3J0IF07XG4gIHRoaXMuYmluZEhhbmRsZXMoKTtcbiAgdGhpcy51cGRhdGVEcmFnZ2FibGUoKTtcbn07XG5cbnByb3RvLm9uRGVhY3RpdmF0ZURyYWcgPSBmdW5jdGlvbigpIHtcbiAgdGhpcy51bmJpbmRIYW5kbGVzKCk7XG4gIHRoaXMuZWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKCdpcy1kcmFnZ2FibGUnKTtcbn07XG5cbnByb3RvLnVwZGF0ZURyYWdnYWJsZSA9IGZ1bmN0aW9uKCkge1xuICAvLyBkaXNhYmxlIGRyYWdnaW5nIGlmIGxlc3MgdGhhbiAyIHNsaWRlcy4gIzI3OFxuICBpZiAoIHRoaXMub3B0aW9ucy5kcmFnZ2FibGUgPT0gJz4xJyApIHtcbiAgICB0aGlzLmlzRHJhZ2dhYmxlID0gdGhpcy5zbGlkZXMubGVuZ3RoID4gMTtcbiAgfSBlbHNlIHtcbiAgICB0aGlzLmlzRHJhZ2dhYmxlID0gdGhpcy5vcHRpb25zLmRyYWdnYWJsZTtcbiAgfVxuICBpZiAoIHRoaXMuaXNEcmFnZ2FibGUgKSB7XG4gICAgdGhpcy5lbGVtZW50LmNsYXNzTGlzdC5hZGQoJ2lzLWRyYWdnYWJsZScpO1xuICB9IGVsc2Uge1xuICAgIHRoaXMuZWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKCdpcy1kcmFnZ2FibGUnKTtcbiAgfVxufTtcblxuLy8gYmFja3dhcmRzIGNvbXBhdGliaWxpdHlcbnByb3RvLmJpbmREcmFnID0gZnVuY3Rpb24oKSB7XG4gIHRoaXMub3B0aW9ucy5kcmFnZ2FibGUgPSB0cnVlO1xuICB0aGlzLnVwZGF0ZURyYWdnYWJsZSgpO1xufTtcblxucHJvdG8udW5iaW5kRHJhZyA9IGZ1bmN0aW9uKCkge1xuICB0aGlzLm9wdGlvbnMuZHJhZ2dhYmxlID0gZmFsc2U7XG4gIHRoaXMudXBkYXRlRHJhZ2dhYmxlKCk7XG59O1xuXG5wcm90by5fdWlDaGFuZ2VEcmFnID0gZnVuY3Rpb24oKSB7XG4gIGRlbGV0ZSB0aGlzLmlzRnJlZVNjcm9sbGluZztcbn07XG5cbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tIHBvaW50ZXIgZXZlbnRzIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tIC8vXG5cbnByb3RvLnBvaW50ZXJEb3duID0gZnVuY3Rpb24oIGV2ZW50LCBwb2ludGVyICkge1xuICBpZiAoICF0aGlzLmlzRHJhZ2dhYmxlICkge1xuICAgIHRoaXMuX3BvaW50ZXJEb3duRGVmYXVsdCggZXZlbnQsIHBvaW50ZXIgKTtcbiAgICByZXR1cm47XG4gIH1cbiAgdmFyIGlzT2theSA9IHRoaXMub2theVBvaW50ZXJEb3duKCBldmVudCApO1xuICBpZiAoICFpc09rYXkgKSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgdGhpcy5fcG9pbnRlckRvd25QcmV2ZW50RGVmYXVsdCggZXZlbnQgKTtcbiAgdGhpcy5wb2ludGVyRG93bkZvY3VzKCBldmVudCApO1xuICAvLyBibHVyXG4gIGlmICggZG9jdW1lbnQuYWN0aXZlRWxlbWVudCAhPSB0aGlzLmVsZW1lbnQgKSB7XG4gICAgLy8gZG8gbm90IGJsdXIgaWYgYWxyZWFkeSBmb2N1c2VkXG4gICAgdGhpcy5wb2ludGVyRG93bkJsdXIoKTtcbiAgfVxuXG4gIC8vIHN0b3AgaWYgaXQgd2FzIG1vdmluZ1xuICB0aGlzLmRyYWdYID0gdGhpcy54O1xuICB0aGlzLnZpZXdwb3J0LmNsYXNzTGlzdC5hZGQoJ2lzLXBvaW50ZXItZG93bicpO1xuICAvLyB0cmFjayBzY3JvbGxpbmdcbiAgdGhpcy5wb2ludGVyRG93blNjcm9sbCA9IGdldFNjcm9sbFBvc2l0aW9uKCk7XG4gIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCAnc2Nyb2xsJywgdGhpcyApO1xuXG4gIHRoaXMuX3BvaW50ZXJEb3duRGVmYXVsdCggZXZlbnQsIHBvaW50ZXIgKTtcbn07XG5cbi8vIGRlZmF1bHQgcG9pbnRlckRvd24gbG9naWMsIHVzZWQgZm9yIHN0YXRpY0NsaWNrXG5wcm90by5fcG9pbnRlckRvd25EZWZhdWx0ID0gZnVuY3Rpb24oIGV2ZW50LCBwb2ludGVyICkge1xuICAvLyB0cmFjayBzdGFydCBldmVudCBwb3NpdGlvblxuICAvLyBTYWZhcmkgOSBvdmVycmlkZXMgcGFnZVggYW5kIHBhZ2VZLiBUaGVzZSB2YWx1ZXMgbmVlZHMgdG8gYmUgY29waWVkLiAjNzc5XG4gIHRoaXMucG9pbnRlckRvd25Qb2ludGVyID0ge1xuICAgIHBhZ2VYOiBwb2ludGVyLnBhZ2VYLFxuICAgIHBhZ2VZOiBwb2ludGVyLnBhZ2VZLFxuICB9O1xuICAvLyBiaW5kIG1vdmUgYW5kIGVuZCBldmVudHNcbiAgdGhpcy5fYmluZFBvc3RTdGFydEV2ZW50cyggZXZlbnQgKTtcbiAgdGhpcy5kaXNwYXRjaEV2ZW50KCAncG9pbnRlckRvd24nLCBldmVudCwgWyBwb2ludGVyIF0gKTtcbn07XG5cbnZhciBmb2N1c05vZGVzID0ge1xuICBJTlBVVDogdHJ1ZSxcbiAgVEVYVEFSRUE6IHRydWUsXG4gIFNFTEVDVDogdHJ1ZSxcbn07XG5cbnByb3RvLnBvaW50ZXJEb3duRm9jdXMgPSBmdW5jdGlvbiggZXZlbnQgKSB7XG4gIHZhciBpc0ZvY3VzTm9kZSA9IGZvY3VzTm9kZXNbIGV2ZW50LnRhcmdldC5ub2RlTmFtZSBdO1xuICBpZiAoICFpc0ZvY3VzTm9kZSApIHtcbiAgICB0aGlzLmZvY3VzKCk7XG4gIH1cbn07XG5cbnByb3RvLl9wb2ludGVyRG93blByZXZlbnREZWZhdWx0ID0gZnVuY3Rpb24oIGV2ZW50ICkge1xuICB2YXIgaXNUb3VjaFN0YXJ0ID0gZXZlbnQudHlwZSA9PSAndG91Y2hzdGFydCc7XG4gIHZhciBpc1RvdWNoUG9pbnRlciA9IGV2ZW50LnBvaW50ZXJUeXBlID09ICd0b3VjaCc7XG4gIHZhciBpc0ZvY3VzTm9kZSA9IGZvY3VzTm9kZXNbIGV2ZW50LnRhcmdldC5ub2RlTmFtZSBdO1xuICBpZiAoICFpc1RvdWNoU3RhcnQgJiYgIWlzVG91Y2hQb2ludGVyICYmICFpc0ZvY3VzTm9kZSApIHtcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICB9XG59O1xuXG4vLyAtLS0tLSBtb3ZlIC0tLS0tIC8vXG5cbnByb3RvLmhhc0RyYWdTdGFydGVkID0gZnVuY3Rpb24oIG1vdmVWZWN0b3IgKSB7XG4gIHJldHVybiBNYXRoLmFicyggbW92ZVZlY3Rvci54ICkgPiB0aGlzLm9wdGlvbnMuZHJhZ1RocmVzaG9sZDtcbn07XG5cbi8vIC0tLS0tIHVwIC0tLS0tIC8vXG5cbnByb3RvLnBvaW50ZXJVcCA9IGZ1bmN0aW9uKCBldmVudCwgcG9pbnRlciApIHtcbiAgZGVsZXRlIHRoaXMuaXNUb3VjaFNjcm9sbGluZztcbiAgdGhpcy52aWV3cG9ydC5jbGFzc0xpc3QucmVtb3ZlKCdpcy1wb2ludGVyLWRvd24nKTtcbiAgdGhpcy5kaXNwYXRjaEV2ZW50KCAncG9pbnRlclVwJywgZXZlbnQsIFsgcG9pbnRlciBdICk7XG4gIHRoaXMuX2RyYWdQb2ludGVyVXAoIGV2ZW50LCBwb2ludGVyICk7XG59O1xuXG5wcm90by5wb2ludGVyRG9uZSA9IGZ1bmN0aW9uKCkge1xuICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lciggJ3Njcm9sbCcsIHRoaXMgKTtcbiAgZGVsZXRlIHRoaXMucG9pbnRlckRvd25TY3JvbGw7XG59O1xuXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSBkcmFnZ2luZyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAvL1xuXG5wcm90by5kcmFnU3RhcnQgPSBmdW5jdGlvbiggZXZlbnQsIHBvaW50ZXIgKSB7XG4gIGlmICggIXRoaXMuaXNEcmFnZ2FibGUgKSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIHRoaXMuZHJhZ1N0YXJ0UG9zaXRpb24gPSB0aGlzLng7XG4gIHRoaXMuc3RhcnRBbmltYXRpb24oKTtcbiAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoICdzY3JvbGwnLCB0aGlzICk7XG4gIHRoaXMuZGlzcGF0Y2hFdmVudCggJ2RyYWdTdGFydCcsIGV2ZW50LCBbIHBvaW50ZXIgXSApO1xufTtcblxucHJvdG8ucG9pbnRlck1vdmUgPSBmdW5jdGlvbiggZXZlbnQsIHBvaW50ZXIgKSB7XG4gIHZhciBtb3ZlVmVjdG9yID0gdGhpcy5fZHJhZ1BvaW50ZXJNb3ZlKCBldmVudCwgcG9pbnRlciApO1xuICB0aGlzLmRpc3BhdGNoRXZlbnQoICdwb2ludGVyTW92ZScsIGV2ZW50LCBbIHBvaW50ZXIsIG1vdmVWZWN0b3IgXSApO1xuICB0aGlzLl9kcmFnTW92ZSggZXZlbnQsIHBvaW50ZXIsIG1vdmVWZWN0b3IgKTtcbn07XG5cbnByb3RvLmRyYWdNb3ZlID0gZnVuY3Rpb24oIGV2ZW50LCBwb2ludGVyLCBtb3ZlVmVjdG9yICkge1xuICBpZiAoICF0aGlzLmlzRHJhZ2dhYmxlICkge1xuICAgIHJldHVybjtcbiAgfVxuICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gIHRoaXMucHJldmlvdXNEcmFnWCA9IHRoaXMuZHJhZ1g7XG4gIC8vIHJldmVyc2UgaWYgcmlnaHQtdG8tbGVmdFxuICB2YXIgZGlyZWN0aW9uID0gdGhpcy5vcHRpb25zLnJpZ2h0VG9MZWZ0ID8gLTEgOiAxO1xuICBpZiAoIHRoaXMub3B0aW9ucy53cmFwQXJvdW5kICkge1xuICAgIC8vIHdyYXAgYXJvdW5kIG1vdmUuICM1ODlcbiAgICBtb3ZlVmVjdG9yLnggPSBtb3ZlVmVjdG9yLnggJSB0aGlzLnNsaWRlYWJsZVdpZHRoO1xuICB9XG4gIHZhciBkcmFnWCA9IHRoaXMuZHJhZ1N0YXJ0UG9zaXRpb24gKyBtb3ZlVmVjdG9yLnggKiBkaXJlY3Rpb247XG5cbiAgaWYgKCAhdGhpcy5vcHRpb25zLndyYXBBcm91bmQgJiYgdGhpcy5zbGlkZXMubGVuZ3RoICkge1xuICAgIC8vIHNsb3cgZHJhZ1xuICAgIHZhciBvcmlnaW5Cb3VuZCA9IE1hdGgubWF4KCAtdGhpcy5zbGlkZXNbMF0udGFyZ2V0LCB0aGlzLmRyYWdTdGFydFBvc2l0aW9uICk7XG4gICAgZHJhZ1ggPSBkcmFnWCA+IG9yaWdpbkJvdW5kID8gKCBkcmFnWCArIG9yaWdpbkJvdW5kICkgKiAwLjUgOiBkcmFnWDtcbiAgICB2YXIgZW5kQm91bmQgPSBNYXRoLm1pbiggLXRoaXMuZ2V0TGFzdFNsaWRlKCkudGFyZ2V0LCB0aGlzLmRyYWdTdGFydFBvc2l0aW9uICk7XG4gICAgZHJhZ1ggPSBkcmFnWCA8IGVuZEJvdW5kID8gKCBkcmFnWCArIGVuZEJvdW5kICkgKiAwLjUgOiBkcmFnWDtcbiAgfVxuXG4gIHRoaXMuZHJhZ1ggPSBkcmFnWDtcblxuICB0aGlzLmRyYWdNb3ZlVGltZSA9IG5ldyBEYXRlKCk7XG4gIHRoaXMuZGlzcGF0Y2hFdmVudCggJ2RyYWdNb3ZlJywgZXZlbnQsIFsgcG9pbnRlciwgbW92ZVZlY3RvciBdICk7XG59O1xuXG5wcm90by5kcmFnRW5kID0gZnVuY3Rpb24oIGV2ZW50LCBwb2ludGVyICkge1xuICBpZiAoICF0aGlzLmlzRHJhZ2dhYmxlICkge1xuICAgIHJldHVybjtcbiAgfVxuICBpZiAoIHRoaXMub3B0aW9ucy5mcmVlU2Nyb2xsICkge1xuICAgIHRoaXMuaXNGcmVlU2Nyb2xsaW5nID0gdHJ1ZTtcbiAgfVxuICAvLyBzZXQgc2VsZWN0ZWRJbmRleCBiYXNlZCBvbiB3aGVyZSBmbGljayB3aWxsIGVuZCB1cFxuICB2YXIgaW5kZXggPSB0aGlzLmRyYWdFbmRSZXN0aW5nU2VsZWN0KCk7XG5cbiAgaWYgKCB0aGlzLm9wdGlvbnMuZnJlZVNjcm9sbCAmJiAhdGhpcy5vcHRpb25zLndyYXBBcm91bmQgKSB7XG4gICAgLy8gaWYgZnJlZS1zY3JvbGwgJiBub3Qgd3JhcCBhcm91bmRcbiAgICAvLyBkbyBub3QgZnJlZS1zY3JvbGwgaWYgZ29pbmcgb3V0c2lkZSBvZiBib3VuZGluZyBzbGlkZXNcbiAgICAvLyBzbyBib3VuZGluZyBzbGlkZXMgY2FuIGF0dHJhY3Qgc2xpZGVyLCBhbmQga2VlcCBpdCBpbiBib3VuZHNcbiAgICB2YXIgcmVzdGluZ1ggPSB0aGlzLmdldFJlc3RpbmdQb3NpdGlvbigpO1xuICAgIHRoaXMuaXNGcmVlU2Nyb2xsaW5nID0gLXJlc3RpbmdYID4gdGhpcy5zbGlkZXNbMF0udGFyZ2V0ICYmXG4gICAgICAtcmVzdGluZ1ggPCB0aGlzLmdldExhc3RTbGlkZSgpLnRhcmdldDtcbiAgfSBlbHNlIGlmICggIXRoaXMub3B0aW9ucy5mcmVlU2Nyb2xsICYmIGluZGV4ID09IHRoaXMuc2VsZWN0ZWRJbmRleCApIHtcbiAgICAvLyBib29zdCBzZWxlY3Rpb24gaWYgc2VsZWN0ZWQgaW5kZXggaGFzIG5vdCBjaGFuZ2VkXG4gICAgaW5kZXggKz0gdGhpcy5kcmFnRW5kQm9vc3RTZWxlY3QoKTtcbiAgfVxuICBkZWxldGUgdGhpcy5wcmV2aW91c0RyYWdYO1xuICAvLyBhcHBseSBzZWxlY3Rpb25cbiAgLy8gVE9ETyByZWZhY3RvciB0aGlzLCBzZWxlY3RpbmcgaGVyZSBmZWVscyB3ZWlyZFxuICAvLyBIQUNLLCBzZXQgZmxhZyBzbyBkcmFnZ2luZyBzdGF5cyBpbiBjb3JyZWN0IGRpcmVjdGlvblxuICB0aGlzLmlzRHJhZ1NlbGVjdCA9IHRoaXMub3B0aW9ucy53cmFwQXJvdW5kO1xuICB0aGlzLnNlbGVjdCggaW5kZXggKTtcbiAgZGVsZXRlIHRoaXMuaXNEcmFnU2VsZWN0O1xuICB0aGlzLmRpc3BhdGNoRXZlbnQoICdkcmFnRW5kJywgZXZlbnQsIFsgcG9pbnRlciBdICk7XG59O1xuXG5wcm90by5kcmFnRW5kUmVzdGluZ1NlbGVjdCA9IGZ1bmN0aW9uKCkge1xuICB2YXIgcmVzdGluZ1ggPSB0aGlzLmdldFJlc3RpbmdQb3NpdGlvbigpO1xuICAvLyBob3cgZmFyIGF3YXkgZnJvbSBzZWxlY3RlZCBzbGlkZVxuICB2YXIgZGlzdGFuY2UgPSBNYXRoLmFicyggdGhpcy5nZXRTbGlkZURpc3RhbmNlKCAtcmVzdGluZ1gsIHRoaXMuc2VsZWN0ZWRJbmRleCApICk7XG4gIC8vIGdldCBjbG9zZXQgcmVzdGluZyBnb2luZyB1cCBhbmQgZ29pbmcgZG93blxuICB2YXIgcG9zaXRpdmVSZXN0aW5nID0gdGhpcy5fZ2V0Q2xvc2VzdFJlc3RpbmcoIHJlc3RpbmdYLCBkaXN0YW5jZSwgMSApO1xuICB2YXIgbmVnYXRpdmVSZXN0aW5nID0gdGhpcy5fZ2V0Q2xvc2VzdFJlc3RpbmcoIHJlc3RpbmdYLCBkaXN0YW5jZSwgLTEgKTtcbiAgLy8gdXNlIGNsb3NlciByZXN0aW5nIGZvciB3cmFwLWFyb3VuZFxuICB2YXIgaW5kZXggPSBwb3NpdGl2ZVJlc3RpbmcuZGlzdGFuY2UgPCBuZWdhdGl2ZVJlc3RpbmcuZGlzdGFuY2UgP1xuICAgIHBvc2l0aXZlUmVzdGluZy5pbmRleCA6IG5lZ2F0aXZlUmVzdGluZy5pbmRleDtcbiAgcmV0dXJuIGluZGV4O1xufTtcblxuLyoqXG4gKiBnaXZlbiByZXN0aW5nIFggYW5kIGRpc3RhbmNlIHRvIHNlbGVjdGVkIGNlbGxcbiAqIGdldCB0aGUgZGlzdGFuY2UgYW5kIGluZGV4IG9mIHRoZSBjbG9zZXN0IGNlbGxcbiAqIEBwYXJhbSB7TnVtYmVyfSByZXN0aW5nWCAtIGVzdGltYXRlZCBwb3N0LWZsaWNrIHJlc3RpbmcgcG9zaXRpb25cbiAqIEBwYXJhbSB7TnVtYmVyfSBkaXN0YW5jZSAtIGRpc3RhbmNlIHRvIHNlbGVjdGVkIGNlbGxcbiAqIEBwYXJhbSB7SW50ZWdlcn0gaW5jcmVtZW50IC0gKzEgb3IgLTEsIGdvaW5nIHVwIG9yIGRvd25cbiAqIEByZXR1cm5zIHtPYmplY3R9IC0geyBkaXN0YW5jZToge051bWJlcn0sIGluZGV4OiB7SW50ZWdlcn0gfVxuICovXG5wcm90by5fZ2V0Q2xvc2VzdFJlc3RpbmcgPSBmdW5jdGlvbiggcmVzdGluZ1gsIGRpc3RhbmNlLCBpbmNyZW1lbnQgKSB7XG4gIHZhciBpbmRleCA9IHRoaXMuc2VsZWN0ZWRJbmRleDtcbiAgdmFyIG1pbkRpc3RhbmNlID0gSW5maW5pdHk7XG4gIHZhciBjb25kaXRpb24gPSB0aGlzLm9wdGlvbnMuY29udGFpbiAmJiAhdGhpcy5vcHRpb25zLndyYXBBcm91bmQgP1xuICAgIC8vIGlmIGNvbnRhaW4sIGtlZXAgZ29pbmcgaWYgZGlzdGFuY2UgaXMgZXF1YWwgdG8gbWluRGlzdGFuY2VcbiAgICBmdW5jdGlvbiggZCwgbWQgKSB7IHJldHVybiBkIDw9IG1kOyB9IDogZnVuY3Rpb24oIGQsIG1kICkgeyByZXR1cm4gZCA8IG1kOyB9O1xuICB3aGlsZSAoIGNvbmRpdGlvbiggZGlzdGFuY2UsIG1pbkRpc3RhbmNlICkgKSB7XG4gICAgLy8gbWVhc3VyZSBkaXN0YW5jZSB0byBuZXh0IGNlbGxcbiAgICBpbmRleCArPSBpbmNyZW1lbnQ7XG4gICAgbWluRGlzdGFuY2UgPSBkaXN0YW5jZTtcbiAgICBkaXN0YW5jZSA9IHRoaXMuZ2V0U2xpZGVEaXN0YW5jZSggLXJlc3RpbmdYLCBpbmRleCApO1xuICAgIGlmICggZGlzdGFuY2UgPT09IG51bGwgKSB7XG4gICAgICBicmVhaztcbiAgICB9XG4gICAgZGlzdGFuY2UgPSBNYXRoLmFicyggZGlzdGFuY2UgKTtcbiAgfVxuICByZXR1cm4ge1xuICAgIGRpc3RhbmNlOiBtaW5EaXN0YW5jZSxcbiAgICAvLyBzZWxlY3RlZCB3YXMgcHJldmlvdXMgaW5kZXhcbiAgICBpbmRleDogaW5kZXggLSBpbmNyZW1lbnRcbiAgfTtcbn07XG5cbi8qKlxuICogbWVhc3VyZSBkaXN0YW5jZSBiZXR3ZWVuIHggYW5kIGEgc2xpZGUgdGFyZ2V0XG4gKiBAcGFyYW0ge051bWJlcn0geFxuICogQHBhcmFtIHtJbnRlZ2VyfSBpbmRleCAtIHNsaWRlIGluZGV4XG4gKi9cbnByb3RvLmdldFNsaWRlRGlzdGFuY2UgPSBmdW5jdGlvbiggeCwgaW5kZXggKSB7XG4gIHZhciBsZW4gPSB0aGlzLnNsaWRlcy5sZW5ndGg7XG4gIC8vIHdyYXAgYXJvdW5kIGlmIGF0IGxlYXN0IDIgc2xpZGVzXG4gIHZhciBpc1dyYXBBcm91bmQgPSB0aGlzLm9wdGlvbnMud3JhcEFyb3VuZCAmJiBsZW4gPiAxO1xuICB2YXIgc2xpZGVJbmRleCA9IGlzV3JhcEFyb3VuZCA/IHV0aWxzLm1vZHVsbyggaW5kZXgsIGxlbiApIDogaW5kZXg7XG4gIHZhciBzbGlkZSA9IHRoaXMuc2xpZGVzWyBzbGlkZUluZGV4IF07XG4gIGlmICggIXNsaWRlICkge1xuICAgIHJldHVybiBudWxsO1xuICB9XG4gIC8vIGFkZCBkaXN0YW5jZSBmb3Igd3JhcC1hcm91bmQgc2xpZGVzXG4gIHZhciB3cmFwID0gaXNXcmFwQXJvdW5kID8gdGhpcy5zbGlkZWFibGVXaWR0aCAqIE1hdGguZmxvb3IoIGluZGV4IC8gbGVuICkgOiAwO1xuICByZXR1cm4geCAtICggc2xpZGUudGFyZ2V0ICsgd3JhcCApO1xufTtcblxucHJvdG8uZHJhZ0VuZEJvb3N0U2VsZWN0ID0gZnVuY3Rpb24oKSB7XG4gIC8vIGRvIG5vdCBib29zdCBpZiBubyBwcmV2aW91c0RyYWdYIG9yIGRyYWdNb3ZlVGltZVxuICBpZiAoIHRoaXMucHJldmlvdXNEcmFnWCA9PT0gdW5kZWZpbmVkIHx8ICF0aGlzLmRyYWdNb3ZlVGltZSB8fFxuICAgIC8vIG9yIGlmIGRyYWcgd2FzIGhlbGQgZm9yIDEwMCBtc1xuICAgIG5ldyBEYXRlKCkgLSB0aGlzLmRyYWdNb3ZlVGltZSA+IDEwMCApIHtcbiAgICByZXR1cm4gMDtcbiAgfVxuXG4gIHZhciBkaXN0YW5jZSA9IHRoaXMuZ2V0U2xpZGVEaXN0YW5jZSggLXRoaXMuZHJhZ1gsIHRoaXMuc2VsZWN0ZWRJbmRleCApO1xuICB2YXIgZGVsdGEgPSB0aGlzLnByZXZpb3VzRHJhZ1ggLSB0aGlzLmRyYWdYO1xuICBpZiAoIGRpc3RhbmNlID4gMCAmJiBkZWx0YSA+IDAgKSB7XG4gICAgLy8gYm9vc3QgdG8gbmV4dCBpZiBtb3ZpbmcgdG93YXJkcyB0aGUgcmlnaHQsIGFuZCBwb3NpdGl2ZSB2ZWxvY2l0eVxuICAgIHJldHVybiAxO1xuICB9IGVsc2UgaWYgKCBkaXN0YW5jZSA8IDAgJiYgZGVsdGEgPCAwICkge1xuICAgIC8vIGJvb3N0IHRvIHByZXZpb3VzIGlmIG1vdmluZyB0b3dhcmRzIHRoZSBsZWZ0LCBhbmQgbmVnYXRpdmUgdmVsb2NpdHlcbiAgICByZXR1cm4gLTE7XG4gIH1cbiAgcmV0dXJuIDA7XG59O1xuXG4vLyAtLS0tLSBzdGF0aWNDbGljayAtLS0tLSAvL1xuXG5wcm90by5zdGF0aWNDbGljayA9IGZ1bmN0aW9uKCBldmVudCwgcG9pbnRlciApIHtcbiAgLy8gZ2V0IGNsaWNrZWRDZWxsLCBpZiBjZWxsIHdhcyBjbGlja2VkXG4gIHZhciBjbGlja2VkQ2VsbCA9IHRoaXMuZ2V0UGFyZW50Q2VsbCggZXZlbnQudGFyZ2V0ICk7XG4gIHZhciBjZWxsRWxlbSA9IGNsaWNrZWRDZWxsICYmIGNsaWNrZWRDZWxsLmVsZW1lbnQ7XG4gIHZhciBjZWxsSW5kZXggPSBjbGlja2VkQ2VsbCAmJiB0aGlzLmNlbGxzLmluZGV4T2YoIGNsaWNrZWRDZWxsICk7XG4gIHRoaXMuZGlzcGF0Y2hFdmVudCggJ3N0YXRpY0NsaWNrJywgZXZlbnQsIFsgcG9pbnRlciwgY2VsbEVsZW0sIGNlbGxJbmRleCBdICk7XG59O1xuXG4vLyAtLS0tLSBzY3JvbGwgLS0tLS0gLy9cblxucHJvdG8ub25zY3JvbGwgPSBmdW5jdGlvbigpIHtcbiAgdmFyIHNjcm9sbCA9IGdldFNjcm9sbFBvc2l0aW9uKCk7XG4gIHZhciBzY3JvbGxNb3ZlWCA9IHRoaXMucG9pbnRlckRvd25TY3JvbGwueCAtIHNjcm9sbC54O1xuICB2YXIgc2Nyb2xsTW92ZVkgPSB0aGlzLnBvaW50ZXJEb3duU2Nyb2xsLnkgLSBzY3JvbGwueTtcbiAgLy8gY2FuY2VsIGNsaWNrL3RhcCBpZiBzY3JvbGwgaXMgdG9vIG11Y2hcbiAgaWYgKCBNYXRoLmFicyggc2Nyb2xsTW92ZVggKSA+IDMgfHwgTWF0aC5hYnMoIHNjcm9sbE1vdmVZICkgPiAzICkge1xuICAgIHRoaXMuX3BvaW50ZXJEb25lKCk7XG4gIH1cbn07XG5cbi8vIC0tLS0tIHV0aWxzIC0tLS0tIC8vXG5cbmZ1bmN0aW9uIGdldFNjcm9sbFBvc2l0aW9uKCkge1xuICByZXR1cm4ge1xuICAgIHg6IHdpbmRvdy5wYWdlWE9mZnNldCxcbiAgICB5OiB3aW5kb3cucGFnZVlPZmZzZXRcbiAgfTtcbn1cblxuLy8gLS0tLS0gIC0tLS0tIC8vXG5cbnJldHVybiBGbGlja2l0eTtcblxufSkpO1xuIiwiLy8gRmxpY2tpdHkgbWFpblxuKCBmdW5jdGlvbiggd2luZG93LCBmYWN0b3J5ICkge1xuICAvLyB1bml2ZXJzYWwgbW9kdWxlIGRlZmluaXRpb25cbiAgLyoganNoaW50IHN0cmljdDogZmFsc2UgKi9cbiAgaWYgKCB0eXBlb2YgZGVmaW5lID09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZCApIHtcbiAgICAvLyBBTURcbiAgICBkZWZpbmUoIFtcbiAgICAgICdldi1lbWl0dGVyL2V2LWVtaXR0ZXInLFxuICAgICAgJ2dldC1zaXplL2dldC1zaXplJyxcbiAgICAgICdmaXp6eS11aS11dGlscy91dGlscycsXG4gICAgICAnLi9jZWxsJyxcbiAgICAgICcuL3NsaWRlJyxcbiAgICAgICcuL2FuaW1hdGUnXG4gICAgXSwgZnVuY3Rpb24oIEV2RW1pdHRlciwgZ2V0U2l6ZSwgdXRpbHMsIENlbGwsIFNsaWRlLCBhbmltYXRlUHJvdG90eXBlICkge1xuICAgICAgcmV0dXJuIGZhY3RvcnkoIHdpbmRvdywgRXZFbWl0dGVyLCBnZXRTaXplLCB1dGlscywgQ2VsbCwgU2xpZGUsIGFuaW1hdGVQcm90b3R5cGUgKTtcbiAgICB9KTtcbiAgfSBlbHNlIGlmICggdHlwZW9mIG1vZHVsZSA9PSAnb2JqZWN0JyAmJiBtb2R1bGUuZXhwb3J0cyApIHtcbiAgICAvLyBDb21tb25KU1xuICAgIG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeShcbiAgICAgIHdpbmRvdyxcbiAgICAgIHJlcXVpcmUoJ2V2LWVtaXR0ZXInKSxcbiAgICAgIHJlcXVpcmUoJ2dldC1zaXplJyksXG4gICAgICByZXF1aXJlKCdmaXp6eS11aS11dGlscycpLFxuICAgICAgcmVxdWlyZSgnLi9jZWxsJyksXG4gICAgICByZXF1aXJlKCcuL3NsaWRlJyksXG4gICAgICByZXF1aXJlKCcuL2FuaW1hdGUnKVxuICAgICk7XG4gIH0gZWxzZSB7XG4gICAgLy8gYnJvd3NlciBnbG9iYWxcbiAgICB2YXIgX0ZsaWNraXR5ID0gd2luZG93LkZsaWNraXR5O1xuXG4gICAgd2luZG93LkZsaWNraXR5ID0gZmFjdG9yeShcbiAgICAgIHdpbmRvdyxcbiAgICAgIHdpbmRvdy5FdkVtaXR0ZXIsXG4gICAgICB3aW5kb3cuZ2V0U2l6ZSxcbiAgICAgIHdpbmRvdy5maXp6eVVJVXRpbHMsXG4gICAgICBfRmxpY2tpdHkuQ2VsbCxcbiAgICAgIF9GbGlja2l0eS5TbGlkZSxcbiAgICAgIF9GbGlja2l0eS5hbmltYXRlUHJvdG90eXBlXG4gICAgKTtcbiAgfVxuXG59KCB3aW5kb3csIGZ1bmN0aW9uIGZhY3RvcnkoIHdpbmRvdywgRXZFbWl0dGVyLCBnZXRTaXplLFxuICB1dGlscywgQ2VsbCwgU2xpZGUsIGFuaW1hdGVQcm90b3R5cGUgKSB7XG5cbid1c2Ugc3RyaWN0JztcblxuLy8gdmFyc1xudmFyIGpRdWVyeSA9IHdpbmRvdy5qUXVlcnk7XG52YXIgZ2V0Q29tcHV0ZWRTdHlsZSA9IHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlO1xudmFyIGNvbnNvbGUgPSB3aW5kb3cuY29uc29sZTtcblxuZnVuY3Rpb24gbW92ZUVsZW1lbnRzKCBlbGVtcywgdG9FbGVtICkge1xuICBlbGVtcyA9IHV0aWxzLm1ha2VBcnJheSggZWxlbXMgKTtcbiAgd2hpbGUgKCBlbGVtcy5sZW5ndGggKSB7XG4gICAgdG9FbGVtLmFwcGVuZENoaWxkKCBlbGVtcy5zaGlmdCgpICk7XG4gIH1cbn1cblxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gRmxpY2tpdHkgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gLy9cblxuLy8gZ2xvYmFsbHkgdW5pcXVlIGlkZW50aWZpZXJzXG52YXIgR1VJRCA9IDA7XG4vLyBpbnRlcm5hbCBzdG9yZSBvZiBhbGwgRmxpY2tpdHkgaW50YW5jZXNcbnZhciBpbnN0YW5jZXMgPSB7fTtcblxuZnVuY3Rpb24gRmxpY2tpdHkoIGVsZW1lbnQsIG9wdGlvbnMgKSB7XG4gIHZhciBxdWVyeUVsZW1lbnQgPSB1dGlscy5nZXRRdWVyeUVsZW1lbnQoIGVsZW1lbnQgKTtcbiAgaWYgKCAhcXVlcnlFbGVtZW50ICkge1xuICAgIGlmICggY29uc29sZSApIHtcbiAgICAgIGNvbnNvbGUuZXJyb3IoICdCYWQgZWxlbWVudCBmb3IgRmxpY2tpdHk6ICcgKyAoIHF1ZXJ5RWxlbWVudCB8fCBlbGVtZW50ICkgKTtcbiAgICB9XG4gICAgcmV0dXJuO1xuICB9XG4gIHRoaXMuZWxlbWVudCA9IHF1ZXJ5RWxlbWVudDtcbiAgLy8gZG8gbm90IGluaXRpYWxpemUgdHdpY2Ugb24gc2FtZSBlbGVtZW50XG4gIGlmICggdGhpcy5lbGVtZW50LmZsaWNraXR5R1VJRCApIHtcbiAgICB2YXIgaW5zdGFuY2UgPSBpbnN0YW5jZXNbIHRoaXMuZWxlbWVudC5mbGlja2l0eUdVSUQgXTtcbiAgICBpbnN0YW5jZS5vcHRpb24oIG9wdGlvbnMgKTtcbiAgICByZXR1cm4gaW5zdGFuY2U7XG4gIH1cblxuICAvLyBhZGQgalF1ZXJ5XG4gIGlmICggalF1ZXJ5ICkge1xuICAgIHRoaXMuJGVsZW1lbnQgPSBqUXVlcnkoIHRoaXMuZWxlbWVudCApO1xuICB9XG4gIC8vIG9wdGlvbnNcbiAgdGhpcy5vcHRpb25zID0gdXRpbHMuZXh0ZW5kKCB7fSwgdGhpcy5jb25zdHJ1Y3Rvci5kZWZhdWx0cyApO1xuICB0aGlzLm9wdGlvbiggb3B0aW9ucyApO1xuXG4gIC8vIGtpY2sgdGhpbmdzIG9mZlxuICB0aGlzLl9jcmVhdGUoKTtcbn1cblxuRmxpY2tpdHkuZGVmYXVsdHMgPSB7XG4gIGFjY2Vzc2liaWxpdHk6IHRydWUsXG4gIC8vIGFkYXB0aXZlSGVpZ2h0OiBmYWxzZSxcbiAgY2VsbEFsaWduOiAnY2VudGVyJyxcbiAgLy8gY2VsbFNlbGVjdG9yOiB1bmRlZmluZWQsXG4gIC8vIGNvbnRhaW46IGZhbHNlLFxuICBmcmVlU2Nyb2xsRnJpY3Rpb246IDAuMDc1LCAvLyBmcmljdGlvbiB3aGVuIGZyZWUtc2Nyb2xsaW5nXG4gIGZyaWN0aW9uOiAwLjI4LCAvLyBmcmljdGlvbiB3aGVuIHNlbGVjdGluZ1xuICBuYW1lc3BhY2VKUXVlcnlFdmVudHM6IHRydWUsXG4gIC8vIGluaXRpYWxJbmRleDogMCxcbiAgcGVyY2VudFBvc2l0aW9uOiB0cnVlLFxuICByZXNpemU6IHRydWUsXG4gIHNlbGVjdGVkQXR0cmFjdGlvbjogMC4wMjUsXG4gIHNldEdhbGxlcnlTaXplOiB0cnVlXG4gIC8vIHdhdGNoQ1NTOiBmYWxzZSxcbiAgLy8gd3JhcEFyb3VuZDogZmFsc2Vcbn07XG5cbi8vIGhhc2ggb2YgbWV0aG9kcyB0cmlnZ2VyZWQgb24gX2NyZWF0ZSgpXG5GbGlja2l0eS5jcmVhdGVNZXRob2RzID0gW107XG5cbnZhciBwcm90byA9IEZsaWNraXR5LnByb3RvdHlwZTtcbi8vIGluaGVyaXQgRXZlbnRFbWl0dGVyXG51dGlscy5leHRlbmQoIHByb3RvLCBFdkVtaXR0ZXIucHJvdG90eXBlICk7XG5cbnByb3RvLl9jcmVhdGUgPSBmdW5jdGlvbigpIHtcbiAgLy8gYWRkIGlkIGZvciBGbGlja2l0eS5kYXRhXG4gIHZhciBpZCA9IHRoaXMuZ3VpZCA9ICsrR1VJRDtcbiAgdGhpcy5lbGVtZW50LmZsaWNraXR5R1VJRCA9IGlkOyAvLyBleHBhbmRvXG4gIGluc3RhbmNlc1sgaWQgXSA9IHRoaXM7IC8vIGFzc29jaWF0ZSB2aWEgaWRcbiAgLy8gaW5pdGlhbCBwcm9wZXJ0aWVzXG4gIHRoaXMuc2VsZWN0ZWRJbmRleCA9IDA7XG4gIC8vIGhvdyBtYW55IGZyYW1lcyBzbGlkZXIgaGFzIGJlZW4gaW4gc2FtZSBwb3NpdGlvblxuICB0aGlzLnJlc3RpbmdGcmFtZXMgPSAwO1xuICAvLyBpbml0aWFsIHBoeXNpY3MgcHJvcGVydGllc1xuICB0aGlzLnggPSAwO1xuICB0aGlzLnZlbG9jaXR5ID0gMDtcbiAgdGhpcy5vcmlnaW5TaWRlID0gdGhpcy5vcHRpb25zLnJpZ2h0VG9MZWZ0ID8gJ3JpZ2h0JyA6ICdsZWZ0JztcbiAgLy8gY3JlYXRlIHZpZXdwb3J0ICYgc2xpZGVyXG4gIHRoaXMudmlld3BvcnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgdGhpcy52aWV3cG9ydC5jbGFzc05hbWUgPSAnZmxpY2tpdHktdmlld3BvcnQnO1xuICB0aGlzLl9jcmVhdGVTbGlkZXIoKTtcblxuICBpZiAoIHRoaXMub3B0aW9ucy5yZXNpemUgfHwgdGhpcy5vcHRpb25zLndhdGNoQ1NTICkge1xuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCAncmVzaXplJywgdGhpcyApO1xuICB9XG5cbiAgLy8gYWRkIGxpc3RlbmVycyBmcm9tIG9uIG9wdGlvblxuICBmb3IgKCB2YXIgZXZlbnROYW1lIGluIHRoaXMub3B0aW9ucy5vbiApIHtcbiAgICB2YXIgbGlzdGVuZXIgPSB0aGlzLm9wdGlvbnMub25bIGV2ZW50TmFtZSBdO1xuICAgIHRoaXMub24oIGV2ZW50TmFtZSwgbGlzdGVuZXIgKTtcbiAgfVxuXG4gIEZsaWNraXR5LmNyZWF0ZU1ldGhvZHMuZm9yRWFjaCggZnVuY3Rpb24oIG1ldGhvZCApIHtcbiAgICB0aGlzWyBtZXRob2QgXSgpO1xuICB9LCB0aGlzICk7XG5cbiAgaWYgKCB0aGlzLm9wdGlvbnMud2F0Y2hDU1MgKSB7XG4gICAgdGhpcy53YXRjaENTUygpO1xuICB9IGVsc2Uge1xuICAgIHRoaXMuYWN0aXZhdGUoKTtcbiAgfVxuXG59O1xuXG4vKipcbiAqIHNldCBvcHRpb25zXG4gKiBAcGFyYW0ge09iamVjdH0gb3B0c1xuICovXG5wcm90by5vcHRpb24gPSBmdW5jdGlvbiggb3B0cyApIHtcbiAgdXRpbHMuZXh0ZW5kKCB0aGlzLm9wdGlvbnMsIG9wdHMgKTtcbn07XG5cbnByb3RvLmFjdGl2YXRlID0gZnVuY3Rpb24oKSB7XG4gIGlmICggdGhpcy5pc0FjdGl2ZSApIHtcbiAgICByZXR1cm47XG4gIH1cbiAgdGhpcy5pc0FjdGl2ZSA9IHRydWU7XG4gIHRoaXMuZWxlbWVudC5jbGFzc0xpc3QuYWRkKCdmbGlja2l0eS1lbmFibGVkJyk7XG4gIGlmICggdGhpcy5vcHRpb25zLnJpZ2h0VG9MZWZ0ICkge1xuICAgIHRoaXMuZWxlbWVudC5jbGFzc0xpc3QuYWRkKCdmbGlja2l0eS1ydGwnKTtcbiAgfVxuXG4gIHRoaXMuZ2V0U2l6ZSgpO1xuICAvLyBtb3ZlIGluaXRpYWwgY2VsbCBlbGVtZW50cyBzbyB0aGV5IGNhbiBiZSBsb2FkZWQgYXMgY2VsbHNcbiAgdmFyIGNlbGxFbGVtcyA9IHRoaXMuX2ZpbHRlckZpbmRDZWxsRWxlbWVudHMoIHRoaXMuZWxlbWVudC5jaGlsZHJlbiApO1xuICBtb3ZlRWxlbWVudHMoIGNlbGxFbGVtcywgdGhpcy5zbGlkZXIgKTtcbiAgdGhpcy52aWV3cG9ydC5hcHBlbmRDaGlsZCggdGhpcy5zbGlkZXIgKTtcbiAgdGhpcy5lbGVtZW50LmFwcGVuZENoaWxkKCB0aGlzLnZpZXdwb3J0ICk7XG4gIC8vIGdldCBjZWxscyBmcm9tIGNoaWxkcmVuXG4gIHRoaXMucmVsb2FkQ2VsbHMoKTtcblxuICBpZiAoIHRoaXMub3B0aW9ucy5hY2Nlc3NpYmlsaXR5ICkge1xuICAgIC8vIGFsbG93IGVsZW1lbnQgdG8gZm9jdXNhYmxlXG4gICAgdGhpcy5lbGVtZW50LnRhYkluZGV4ID0gMDtcbiAgICAvLyBsaXN0ZW4gZm9yIGtleSBwcmVzc2VzXG4gICAgdGhpcy5lbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoICdrZXlkb3duJywgdGhpcyApO1xuICB9XG5cbiAgdGhpcy5lbWl0RXZlbnQoJ2FjdGl2YXRlJyk7XG4gIHRoaXMuc2VsZWN0SW5pdGlhbEluZGV4KCk7XG4gIC8vIGZsYWcgZm9yIGluaXRpYWwgYWN0aXZhdGlvbiwgZm9yIHVzaW5nIGluaXRpYWxJbmRleFxuICB0aGlzLmlzSW5pdEFjdGl2YXRlZCA9IHRydWU7XG4gIC8vIHJlYWR5IGV2ZW50LiAjNDkzXG4gIHRoaXMuZGlzcGF0Y2hFdmVudCgncmVhZHknKTtcbn07XG5cbi8vIHNsaWRlciBwb3NpdGlvbnMgdGhlIGNlbGxzXG5wcm90by5fY3JlYXRlU2xpZGVyID0gZnVuY3Rpb24oKSB7XG4gIC8vIHNsaWRlciBlbGVtZW50IGRvZXMgYWxsIHRoZSBwb3NpdGlvbmluZ1xuICB2YXIgc2xpZGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gIHNsaWRlci5jbGFzc05hbWUgPSAnZmxpY2tpdHktc2xpZGVyJztcbiAgc2xpZGVyLnN0eWxlWyB0aGlzLm9yaWdpblNpZGUgXSA9IDA7XG4gIHRoaXMuc2xpZGVyID0gc2xpZGVyO1xufTtcblxucHJvdG8uX2ZpbHRlckZpbmRDZWxsRWxlbWVudHMgPSBmdW5jdGlvbiggZWxlbXMgKSB7XG4gIHJldHVybiB1dGlscy5maWx0ZXJGaW5kRWxlbWVudHMoIGVsZW1zLCB0aGlzLm9wdGlvbnMuY2VsbFNlbGVjdG9yICk7XG59O1xuXG4vLyBnb2VzIHRocm91Z2ggYWxsIGNoaWxkcmVuXG5wcm90by5yZWxvYWRDZWxscyA9IGZ1bmN0aW9uKCkge1xuICAvLyBjb2xsZWN0aW9uIG9mIGl0ZW0gZWxlbWVudHNcbiAgdGhpcy5jZWxscyA9IHRoaXMuX21ha2VDZWxscyggdGhpcy5zbGlkZXIuY2hpbGRyZW4gKTtcbiAgdGhpcy5wb3NpdGlvbkNlbGxzKCk7XG4gIHRoaXMuX2dldFdyYXBTaGlmdENlbGxzKCk7XG4gIHRoaXMuc2V0R2FsbGVyeVNpemUoKTtcbn07XG5cbi8qKlxuICogdHVybiBlbGVtZW50cyBpbnRvIEZsaWNraXR5LkNlbGxzXG4gKiBAcGFyYW0ge0FycmF5IG9yIE5vZGVMaXN0IG9yIEhUTUxFbGVtZW50fSBlbGVtc1xuICogQHJldHVybnMge0FycmF5fSBpdGVtcyAtIGNvbGxlY3Rpb24gb2YgbmV3IEZsaWNraXR5IENlbGxzXG4gKi9cbnByb3RvLl9tYWtlQ2VsbHMgPSBmdW5jdGlvbiggZWxlbXMgKSB7XG4gIHZhciBjZWxsRWxlbXMgPSB0aGlzLl9maWx0ZXJGaW5kQ2VsbEVsZW1lbnRzKCBlbGVtcyApO1xuXG4gIC8vIGNyZWF0ZSBuZXcgRmxpY2tpdHkgZm9yIGNvbGxlY3Rpb25cbiAgdmFyIGNlbGxzID0gY2VsbEVsZW1zLm1hcCggZnVuY3Rpb24oIGNlbGxFbGVtICkge1xuICAgIHJldHVybiBuZXcgQ2VsbCggY2VsbEVsZW0sIHRoaXMgKTtcbiAgfSwgdGhpcyApO1xuXG4gIHJldHVybiBjZWxscztcbn07XG5cbnByb3RvLmdldExhc3RDZWxsID0gZnVuY3Rpb24oKSB7XG4gIHJldHVybiB0aGlzLmNlbGxzWyB0aGlzLmNlbGxzLmxlbmd0aCAtIDEgXTtcbn07XG5cbnByb3RvLmdldExhc3RTbGlkZSA9IGZ1bmN0aW9uKCkge1xuICByZXR1cm4gdGhpcy5zbGlkZXNbIHRoaXMuc2xpZGVzLmxlbmd0aCAtIDEgXTtcbn07XG5cbi8vIHBvc2l0aW9ucyBhbGwgY2VsbHNcbnByb3RvLnBvc2l0aW9uQ2VsbHMgPSBmdW5jdGlvbigpIHtcbiAgLy8gc2l6ZSBhbGwgY2VsbHNcbiAgdGhpcy5fc2l6ZUNlbGxzKCB0aGlzLmNlbGxzICk7XG4gIC8vIHBvc2l0aW9uIGFsbCBjZWxsc1xuICB0aGlzLl9wb3NpdGlvbkNlbGxzKCAwICk7XG59O1xuXG4vKipcbiAqIHBvc2l0aW9uIGNlcnRhaW4gY2VsbHNcbiAqIEBwYXJhbSB7SW50ZWdlcn0gaW5kZXggLSB3aGljaCBjZWxsIHRvIHN0YXJ0IHdpdGhcbiAqL1xucHJvdG8uX3Bvc2l0aW9uQ2VsbHMgPSBmdW5jdGlvbiggaW5kZXggKSB7XG4gIGluZGV4ID0gaW5kZXggfHwgMDtcbiAgLy8gYWxzbyBtZWFzdXJlIG1heENlbGxIZWlnaHRcbiAgLy8gc3RhcnQgMCBpZiBwb3NpdGlvbmluZyBhbGwgY2VsbHNcbiAgdGhpcy5tYXhDZWxsSGVpZ2h0ID0gaW5kZXggPyB0aGlzLm1heENlbGxIZWlnaHQgfHwgMCA6IDA7XG4gIHZhciBjZWxsWCA9IDA7XG4gIC8vIGdldCBjZWxsWFxuICBpZiAoIGluZGV4ID4gMCApIHtcbiAgICB2YXIgc3RhcnRDZWxsID0gdGhpcy5jZWxsc1sgaW5kZXggLSAxIF07XG4gICAgY2VsbFggPSBzdGFydENlbGwueCArIHN0YXJ0Q2VsbC5zaXplLm91dGVyV2lkdGg7XG4gIH1cbiAgdmFyIGxlbiA9IHRoaXMuY2VsbHMubGVuZ3RoO1xuICBmb3IgKCB2YXIgaT1pbmRleDsgaSA8IGxlbjsgaSsrICkge1xuICAgIHZhciBjZWxsID0gdGhpcy5jZWxsc1tpXTtcbiAgICBjZWxsLnNldFBvc2l0aW9uKCBjZWxsWCApO1xuICAgIGNlbGxYICs9IGNlbGwuc2l6ZS5vdXRlcldpZHRoO1xuICAgIHRoaXMubWF4Q2VsbEhlaWdodCA9IE1hdGgubWF4KCBjZWxsLnNpemUub3V0ZXJIZWlnaHQsIHRoaXMubWF4Q2VsbEhlaWdodCApO1xuICB9XG4gIC8vIGtlZXAgdHJhY2sgb2YgY2VsbFggZm9yIHdyYXAtYXJvdW5kXG4gIHRoaXMuc2xpZGVhYmxlV2lkdGggPSBjZWxsWDtcbiAgLy8gc2xpZGVzXG4gIHRoaXMudXBkYXRlU2xpZGVzKCk7XG4gIC8vIGNvbnRhaW4gc2xpZGVzIHRhcmdldFxuICB0aGlzLl9jb250YWluU2xpZGVzKCk7XG4gIC8vIHVwZGF0ZSBzbGlkZXNXaWR0aFxuICB0aGlzLnNsaWRlc1dpZHRoID0gbGVuID8gdGhpcy5nZXRMYXN0U2xpZGUoKS50YXJnZXQgLSB0aGlzLnNsaWRlc1swXS50YXJnZXQgOiAwO1xufTtcblxuLyoqXG4gKiBjZWxsLmdldFNpemUoKSBvbiBtdWx0aXBsZSBjZWxsc1xuICogQHBhcmFtIHtBcnJheX0gY2VsbHNcbiAqL1xucHJvdG8uX3NpemVDZWxscyA9IGZ1bmN0aW9uKCBjZWxscyApIHtcbiAgY2VsbHMuZm9yRWFjaCggZnVuY3Rpb24oIGNlbGwgKSB7XG4gICAgY2VsbC5nZXRTaXplKCk7XG4gIH0pO1xufTtcblxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tIC8vXG5cbnByb3RvLnVwZGF0ZVNsaWRlcyA9IGZ1bmN0aW9uKCkge1xuICB0aGlzLnNsaWRlcyA9IFtdO1xuICBpZiAoICF0aGlzLmNlbGxzLmxlbmd0aCApIHtcbiAgICByZXR1cm47XG4gIH1cblxuICB2YXIgc2xpZGUgPSBuZXcgU2xpZGUoIHRoaXMgKTtcbiAgdGhpcy5zbGlkZXMucHVzaCggc2xpZGUgKTtcbiAgdmFyIGlzT3JpZ2luTGVmdCA9IHRoaXMub3JpZ2luU2lkZSA9PSAnbGVmdCc7XG4gIHZhciBuZXh0TWFyZ2luID0gaXNPcmlnaW5MZWZ0ID8gJ21hcmdpblJpZ2h0JyA6ICdtYXJnaW5MZWZ0JztcblxuICB2YXIgY2FuQ2VsbEZpdCA9IHRoaXMuX2dldENhbkNlbGxGaXQoKTtcblxuICB0aGlzLmNlbGxzLmZvckVhY2goIGZ1bmN0aW9uKCBjZWxsLCBpICkge1xuICAgIC8vIGp1c3QgYWRkIGNlbGwgaWYgZmlyc3QgY2VsbCBpbiBzbGlkZVxuICAgIGlmICggIXNsaWRlLmNlbGxzLmxlbmd0aCApIHtcbiAgICAgIHNsaWRlLmFkZENlbGwoIGNlbGwgKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB2YXIgc2xpZGVXaWR0aCA9ICggc2xpZGUub3V0ZXJXaWR0aCAtIHNsaWRlLmZpcnN0TWFyZ2luICkgK1xuICAgICAgKCBjZWxsLnNpemUub3V0ZXJXaWR0aCAtIGNlbGwuc2l6ZVsgbmV4dE1hcmdpbiBdICk7XG5cbiAgICBpZiAoIGNhbkNlbGxGaXQuY2FsbCggdGhpcywgaSwgc2xpZGVXaWR0aCApICkge1xuICAgICAgc2xpZGUuYWRkQ2VsbCggY2VsbCApO1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyBkb2Vzbid0IGZpdCwgbmV3IHNsaWRlXG4gICAgICBzbGlkZS51cGRhdGVUYXJnZXQoKTtcblxuICAgICAgc2xpZGUgPSBuZXcgU2xpZGUoIHRoaXMgKTtcbiAgICAgIHRoaXMuc2xpZGVzLnB1c2goIHNsaWRlICk7XG4gICAgICBzbGlkZS5hZGRDZWxsKCBjZWxsICk7XG4gICAgfVxuICB9LCB0aGlzICk7XG4gIC8vIGxhc3Qgc2xpZGVcbiAgc2xpZGUudXBkYXRlVGFyZ2V0KCk7XG4gIC8vIHVwZGF0ZSAuc2VsZWN0ZWRTbGlkZVxuICB0aGlzLnVwZGF0ZVNlbGVjdGVkU2xpZGUoKTtcbn07XG5cbnByb3RvLl9nZXRDYW5DZWxsRml0ID0gZnVuY3Rpb24oKSB7XG4gIHZhciBncm91cENlbGxzID0gdGhpcy5vcHRpb25zLmdyb3VwQ2VsbHM7XG4gIGlmICggIWdyb3VwQ2VsbHMgKSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH07XG4gIH0gZWxzZSBpZiAoIHR5cGVvZiBncm91cENlbGxzID09ICdudW1iZXInICkge1xuICAgIC8vIGdyb3VwIGJ5IG51bWJlci4gMyAtPiBbMCwxLDJdLCBbMyw0LDVdLCAuLi5cbiAgICB2YXIgbnVtYmVyID0gcGFyc2VJbnQoIGdyb3VwQ2VsbHMsIDEwICk7XG4gICAgcmV0dXJuIGZ1bmN0aW9uKCBpICkge1xuICAgICAgcmV0dXJuICggaSAlIG51bWJlciApICE9PSAwO1xuICAgIH07XG4gIH1cbiAgLy8gZGVmYXVsdCwgZ3JvdXAgYnkgd2lkdGggb2Ygc2xpZGVcbiAgLy8gcGFyc2UgJzc1JVxuICB2YXIgcGVyY2VudE1hdGNoID0gdHlwZW9mIGdyb3VwQ2VsbHMgPT0gJ3N0cmluZycgJiZcbiAgICBncm91cENlbGxzLm1hdGNoKC9eKFxcZCspJSQvKTtcbiAgdmFyIHBlcmNlbnQgPSBwZXJjZW50TWF0Y2ggPyBwYXJzZUludCggcGVyY2VudE1hdGNoWzFdLCAxMCApIC8gMTAwIDogMTtcbiAgcmV0dXJuIGZ1bmN0aW9uKCBpLCBzbGlkZVdpZHRoICkge1xuICAgIHJldHVybiBzbGlkZVdpZHRoIDw9ICggdGhpcy5zaXplLmlubmVyV2lkdGggKyAxICkgKiBwZXJjZW50O1xuICB9O1xufTtcblxuLy8gYWxpYXMgX2luaXQgZm9yIGpRdWVyeSBwbHVnaW4gLmZsaWNraXR5KClcbnByb3RvLl9pbml0ID1cbnByb3RvLnJlcG9zaXRpb24gPSBmdW5jdGlvbigpIHtcbiAgdGhpcy5wb3NpdGlvbkNlbGxzKCk7XG4gIHRoaXMucG9zaXRpb25TbGlkZXJBdFNlbGVjdGVkKCk7XG59O1xuXG5wcm90by5nZXRTaXplID0gZnVuY3Rpb24oKSB7XG4gIHRoaXMuc2l6ZSA9IGdldFNpemUoIHRoaXMuZWxlbWVudCApO1xuICB0aGlzLnNldENlbGxBbGlnbigpO1xuICB0aGlzLmN1cnNvclBvc2l0aW9uID0gdGhpcy5zaXplLmlubmVyV2lkdGggKiB0aGlzLmNlbGxBbGlnbjtcbn07XG5cbnZhciBjZWxsQWxpZ25TaG9ydGhhbmRzID0ge1xuICAvLyBjZWxsIGFsaWduLCB0aGVuIGJhc2VkIG9uIG9yaWdpbiBzaWRlXG4gIGNlbnRlcjoge1xuICAgIGxlZnQ6IDAuNSxcbiAgICByaWdodDogMC41XG4gIH0sXG4gIGxlZnQ6IHtcbiAgICBsZWZ0OiAwLFxuICAgIHJpZ2h0OiAxXG4gIH0sXG4gIHJpZ2h0OiB7XG4gICAgcmlnaHQ6IDAsXG4gICAgbGVmdDogMVxuICB9XG59O1xuXG5wcm90by5zZXRDZWxsQWxpZ24gPSBmdW5jdGlvbigpIHtcbiAgdmFyIHNob3J0aGFuZCA9IGNlbGxBbGlnblNob3J0aGFuZHNbIHRoaXMub3B0aW9ucy5jZWxsQWxpZ24gXTtcbiAgdGhpcy5jZWxsQWxpZ24gPSBzaG9ydGhhbmQgPyBzaG9ydGhhbmRbIHRoaXMub3JpZ2luU2lkZSBdIDogdGhpcy5vcHRpb25zLmNlbGxBbGlnbjtcbn07XG5cbnByb3RvLnNldEdhbGxlcnlTaXplID0gZnVuY3Rpb24oKSB7XG4gIGlmICggdGhpcy5vcHRpb25zLnNldEdhbGxlcnlTaXplICkge1xuICAgIHZhciBoZWlnaHQgPSB0aGlzLm9wdGlvbnMuYWRhcHRpdmVIZWlnaHQgJiYgdGhpcy5zZWxlY3RlZFNsaWRlID9cbiAgICAgIHRoaXMuc2VsZWN0ZWRTbGlkZS5oZWlnaHQgOiB0aGlzLm1heENlbGxIZWlnaHQ7XG4gICAgdGhpcy52aWV3cG9ydC5zdHlsZS5oZWlnaHQgPSBoZWlnaHQgKyAncHgnO1xuICB9XG59O1xuXG5wcm90by5fZ2V0V3JhcFNoaWZ0Q2VsbHMgPSBmdW5jdGlvbigpIHtcbiAgLy8gb25seSBmb3Igd3JhcC1hcm91bmRcbiAgaWYgKCAhdGhpcy5vcHRpb25zLndyYXBBcm91bmQgKSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIC8vIHVuc2hpZnQgcHJldmlvdXMgY2VsbHNcbiAgdGhpcy5fdW5zaGlmdENlbGxzKCB0aGlzLmJlZm9yZVNoaWZ0Q2VsbHMgKTtcbiAgdGhpcy5fdW5zaGlmdENlbGxzKCB0aGlzLmFmdGVyU2hpZnRDZWxscyApO1xuICAvLyBnZXQgYmVmb3JlIGNlbGxzXG4gIC8vIGluaXRpYWwgZ2FwXG4gIHZhciBnYXBYID0gdGhpcy5jdXJzb3JQb3NpdGlvbjtcbiAgdmFyIGNlbGxJbmRleCA9IHRoaXMuY2VsbHMubGVuZ3RoIC0gMTtcbiAgdGhpcy5iZWZvcmVTaGlmdENlbGxzID0gdGhpcy5fZ2V0R2FwQ2VsbHMoIGdhcFgsIGNlbGxJbmRleCwgLTEgKTtcbiAgLy8gZ2V0IGFmdGVyIGNlbGxzXG4gIC8vIGVuZGluZyBnYXAgYmV0d2VlbiBsYXN0IGNlbGwgYW5kIGVuZCBvZiBnYWxsZXJ5IHZpZXdwb3J0XG4gIGdhcFggPSB0aGlzLnNpemUuaW5uZXJXaWR0aCAtIHRoaXMuY3Vyc29yUG9zaXRpb247XG4gIC8vIHN0YXJ0IGNsb25pbmcgYXQgZmlyc3QgY2VsbCwgd29ya2luZyBmb3J3YXJkc1xuICB0aGlzLmFmdGVyU2hpZnRDZWxscyA9IHRoaXMuX2dldEdhcENlbGxzKCBnYXBYLCAwLCAxICk7XG59O1xuXG5wcm90by5fZ2V0R2FwQ2VsbHMgPSBmdW5jdGlvbiggZ2FwWCwgY2VsbEluZGV4LCBpbmNyZW1lbnQgKSB7XG4gIC8vIGtlZXAgYWRkaW5nIGNlbGxzIHVudGlsIHRoZSBjb3ZlciB0aGUgaW5pdGlhbCBnYXBcbiAgdmFyIGNlbGxzID0gW107XG4gIHdoaWxlICggZ2FwWCA+IDAgKSB7XG4gICAgdmFyIGNlbGwgPSB0aGlzLmNlbGxzWyBjZWxsSW5kZXggXTtcbiAgICBpZiAoICFjZWxsICkge1xuICAgICAgYnJlYWs7XG4gICAgfVxuICAgIGNlbGxzLnB1c2goIGNlbGwgKTtcbiAgICBjZWxsSW5kZXggKz0gaW5jcmVtZW50O1xuICAgIGdhcFggLT0gY2VsbC5zaXplLm91dGVyV2lkdGg7XG4gIH1cbiAgcmV0dXJuIGNlbGxzO1xufTtcblxuLy8gLS0tLS0gY29udGFpbiAtLS0tLSAvL1xuXG4vLyBjb250YWluIGNlbGwgdGFyZ2V0cyBzbyBubyBleGNlc3Mgc2xpZGluZ1xucHJvdG8uX2NvbnRhaW5TbGlkZXMgPSBmdW5jdGlvbigpIHtcbiAgaWYgKCAhdGhpcy5vcHRpb25zLmNvbnRhaW4gfHwgdGhpcy5vcHRpb25zLndyYXBBcm91bmQgfHwgIXRoaXMuY2VsbHMubGVuZ3RoICkge1xuICAgIHJldHVybjtcbiAgfVxuICB2YXIgaXNSaWdodFRvTGVmdCA9IHRoaXMub3B0aW9ucy5yaWdodFRvTGVmdDtcbiAgdmFyIGJlZ2luTWFyZ2luID0gaXNSaWdodFRvTGVmdCA/ICdtYXJnaW5SaWdodCcgOiAnbWFyZ2luTGVmdCc7XG4gIHZhciBlbmRNYXJnaW4gPSBpc1JpZ2h0VG9MZWZ0ID8gJ21hcmdpbkxlZnQnIDogJ21hcmdpblJpZ2h0JztcbiAgdmFyIGNvbnRlbnRXaWR0aCA9IHRoaXMuc2xpZGVhYmxlV2lkdGggLSB0aGlzLmdldExhc3RDZWxsKCkuc2l6ZVsgZW5kTWFyZ2luIF07XG4gIC8vIGNvbnRlbnQgaXMgbGVzcyB0aGFuIGdhbGxlcnkgc2l6ZVxuICB2YXIgaXNDb250ZW50U21hbGxlciA9IGNvbnRlbnRXaWR0aCA8IHRoaXMuc2l6ZS5pbm5lcldpZHRoO1xuICAvLyBib3VuZHNcbiAgdmFyIGJlZ2luQm91bmQgPSB0aGlzLmN1cnNvclBvc2l0aW9uICsgdGhpcy5jZWxsc1swXS5zaXplWyBiZWdpbk1hcmdpbiBdO1xuICB2YXIgZW5kQm91bmQgPSBjb250ZW50V2lkdGggLSB0aGlzLnNpemUuaW5uZXJXaWR0aCAqICggMSAtIHRoaXMuY2VsbEFsaWduICk7XG4gIC8vIGNvbnRhaW4gZWFjaCBjZWxsIHRhcmdldFxuICB0aGlzLnNsaWRlcy5mb3JFYWNoKCBmdW5jdGlvbiggc2xpZGUgKSB7XG4gICAgaWYgKCBpc0NvbnRlbnRTbWFsbGVyICkge1xuICAgICAgLy8gYWxsIGNlbGxzIGZpdCBpbnNpZGUgZ2FsbGVyeVxuICAgICAgc2xpZGUudGFyZ2V0ID0gY29udGVudFdpZHRoICogdGhpcy5jZWxsQWxpZ247XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIGNvbnRhaW4gdG8gYm91bmRzXG4gICAgICBzbGlkZS50YXJnZXQgPSBNYXRoLm1heCggc2xpZGUudGFyZ2V0LCBiZWdpbkJvdW5kICk7XG4gICAgICBzbGlkZS50YXJnZXQgPSBNYXRoLm1pbiggc2xpZGUudGFyZ2V0LCBlbmRCb3VuZCApO1xuICAgIH1cbiAgfSwgdGhpcyApO1xufTtcblxuLy8gLS0tLS0gIC0tLS0tIC8vXG5cbi8qKlxuICogZW1pdHMgZXZlbnRzIHZpYSBldmVudEVtaXR0ZXIgYW5kIGpRdWVyeSBldmVudHNcbiAqIEBwYXJhbSB7U3RyaW5nfSB0eXBlIC0gbmFtZSBvZiBldmVudFxuICogQHBhcmFtIHtFdmVudH0gZXZlbnQgLSBvcmlnaW5hbCBldmVudFxuICogQHBhcmFtIHtBcnJheX0gYXJncyAtIGV4dHJhIGFyZ3VtZW50c1xuICovXG5wcm90by5kaXNwYXRjaEV2ZW50ID0gZnVuY3Rpb24oIHR5cGUsIGV2ZW50LCBhcmdzICkge1xuICB2YXIgZW1pdEFyZ3MgPSBldmVudCA/IFsgZXZlbnQgXS5jb25jYXQoIGFyZ3MgKSA6IGFyZ3M7XG4gIHRoaXMuZW1pdEV2ZW50KCB0eXBlLCBlbWl0QXJncyApO1xuXG4gIGlmICggalF1ZXJ5ICYmIHRoaXMuJGVsZW1lbnQgKSB7XG4gICAgLy8gZGVmYXVsdCB0cmlnZ2VyIHdpdGggdHlwZSBpZiBubyBldmVudFxuICAgIHR5cGUgKz0gdGhpcy5vcHRpb25zLm5hbWVzcGFjZUpRdWVyeUV2ZW50cyA/ICcuZmxpY2tpdHknIDogJyc7XG4gICAgdmFyICRldmVudCA9IHR5cGU7XG4gICAgaWYgKCBldmVudCApIHtcbiAgICAgIC8vIGNyZWF0ZSBqUXVlcnkgZXZlbnRcbiAgICAgIHZhciBqUUV2ZW50ID0galF1ZXJ5LkV2ZW50KCBldmVudCApO1xuICAgICAgalFFdmVudC50eXBlID0gdHlwZTtcbiAgICAgICRldmVudCA9IGpRRXZlbnQ7XG4gICAgfVxuICAgIHRoaXMuJGVsZW1lbnQudHJpZ2dlciggJGV2ZW50LCBhcmdzICk7XG4gIH1cbn07XG5cbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tIHNlbGVjdCAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAvL1xuXG4vKipcbiAqIEBwYXJhbSB7SW50ZWdlcn0gaW5kZXggLSBpbmRleCBvZiB0aGUgc2xpZGVcbiAqIEBwYXJhbSB7Qm9vbGVhbn0gaXNXcmFwIC0gd2lsbCB3cmFwLWFyb3VuZCB0byBsYXN0L2ZpcnN0IGlmIGF0IHRoZSBlbmRcbiAqIEBwYXJhbSB7Qm9vbGVhbn0gaXNJbnN0YW50IC0gd2lsbCBpbW1lZGlhdGVseSBzZXQgcG9zaXRpb24gYXQgc2VsZWN0ZWQgY2VsbFxuICovXG5wcm90by5zZWxlY3QgPSBmdW5jdGlvbiggaW5kZXgsIGlzV3JhcCwgaXNJbnN0YW50ICkge1xuICBpZiAoICF0aGlzLmlzQWN0aXZlICkge1xuICAgIHJldHVybjtcbiAgfVxuICBpbmRleCA9IHBhcnNlSW50KCBpbmRleCwgMTAgKTtcbiAgdGhpcy5fd3JhcFNlbGVjdCggaW5kZXggKTtcblxuICBpZiAoIHRoaXMub3B0aW9ucy53cmFwQXJvdW5kIHx8IGlzV3JhcCApIHtcbiAgICBpbmRleCA9IHV0aWxzLm1vZHVsbyggaW5kZXgsIHRoaXMuc2xpZGVzLmxlbmd0aCApO1xuICB9XG4gIC8vIGJhaWwgaWYgaW52YWxpZCBpbmRleFxuICBpZiAoICF0aGlzLnNsaWRlc1sgaW5kZXggXSApIHtcbiAgICByZXR1cm47XG4gIH1cbiAgdmFyIHByZXZJbmRleCA9IHRoaXMuc2VsZWN0ZWRJbmRleDtcbiAgdGhpcy5zZWxlY3RlZEluZGV4ID0gaW5kZXg7XG4gIHRoaXMudXBkYXRlU2VsZWN0ZWRTbGlkZSgpO1xuICBpZiAoIGlzSW5zdGFudCApIHtcbiAgICB0aGlzLnBvc2l0aW9uU2xpZGVyQXRTZWxlY3RlZCgpO1xuICB9IGVsc2Uge1xuICAgIHRoaXMuc3RhcnRBbmltYXRpb24oKTtcbiAgfVxuICBpZiAoIHRoaXMub3B0aW9ucy5hZGFwdGl2ZUhlaWdodCApIHtcbiAgICB0aGlzLnNldEdhbGxlcnlTaXplKCk7XG4gIH1cbiAgLy8gZXZlbnRzXG4gIHRoaXMuZGlzcGF0Y2hFdmVudCggJ3NlbGVjdCcsIG51bGwsIFsgaW5kZXggXSApO1xuICAvLyBjaGFuZ2UgZXZlbnQgaWYgbmV3IGluZGV4XG4gIGlmICggaW5kZXggIT0gcHJldkluZGV4ICkge1xuICAgIHRoaXMuZGlzcGF0Y2hFdmVudCggJ2NoYW5nZScsIG51bGwsIFsgaW5kZXggXSApO1xuICB9XG4gIC8vIG9sZCB2MSBldmVudCBuYW1lLCByZW1vdmUgaW4gdjNcbiAgdGhpcy5kaXNwYXRjaEV2ZW50KCdjZWxsU2VsZWN0Jyk7XG59O1xuXG4vLyB3cmFwcyBwb3NpdGlvbiBmb3Igd3JhcEFyb3VuZCwgdG8gbW92ZSB0byBjbG9zZXN0IHNsaWRlLiAjMTEzXG5wcm90by5fd3JhcFNlbGVjdCA9IGZ1bmN0aW9uKCBpbmRleCApIHtcbiAgdmFyIGxlbiA9IHRoaXMuc2xpZGVzLmxlbmd0aDtcbiAgdmFyIGlzV3JhcHBpbmcgPSB0aGlzLm9wdGlvbnMud3JhcEFyb3VuZCAmJiBsZW4gPiAxO1xuICBpZiAoICFpc1dyYXBwaW5nICkge1xuICAgIHJldHVybiBpbmRleDtcbiAgfVxuICB2YXIgd3JhcEluZGV4ID0gdXRpbHMubW9kdWxvKCBpbmRleCwgbGVuICk7XG4gIC8vIGdvIHRvIHNob3J0ZXN0XG4gIHZhciBkZWx0YSA9IE1hdGguYWJzKCB3cmFwSW5kZXggLSB0aGlzLnNlbGVjdGVkSW5kZXggKTtcbiAgdmFyIGJhY2tXcmFwRGVsdGEgPSBNYXRoLmFicyggKCB3cmFwSW5kZXggKyBsZW4gKSAtIHRoaXMuc2VsZWN0ZWRJbmRleCApO1xuICB2YXIgZm9yZXdhcmRXcmFwRGVsdGEgPSBNYXRoLmFicyggKCB3cmFwSW5kZXggLSBsZW4gKSAtIHRoaXMuc2VsZWN0ZWRJbmRleCApO1xuICBpZiAoICF0aGlzLmlzRHJhZ1NlbGVjdCAmJiBiYWNrV3JhcERlbHRhIDwgZGVsdGEgKSB7XG4gICAgaW5kZXggKz0gbGVuO1xuICB9IGVsc2UgaWYgKCAhdGhpcy5pc0RyYWdTZWxlY3QgJiYgZm9yZXdhcmRXcmFwRGVsdGEgPCBkZWx0YSApIHtcbiAgICBpbmRleCAtPSBsZW47XG4gIH1cbiAgLy8gd3JhcCBwb3NpdGlvbiBzbyBzbGlkZXIgaXMgd2l0aGluIG5vcm1hbCBhcmVhXG4gIGlmICggaW5kZXggPCAwICkge1xuICAgIHRoaXMueCAtPSB0aGlzLnNsaWRlYWJsZVdpZHRoO1xuICB9IGVsc2UgaWYgKCBpbmRleCA+PSBsZW4gKSB7XG4gICAgdGhpcy54ICs9IHRoaXMuc2xpZGVhYmxlV2lkdGg7XG4gIH1cbn07XG5cbnByb3RvLnByZXZpb3VzID0gZnVuY3Rpb24oIGlzV3JhcCwgaXNJbnN0YW50ICkge1xuICB0aGlzLnNlbGVjdCggdGhpcy5zZWxlY3RlZEluZGV4IC0gMSwgaXNXcmFwLCBpc0luc3RhbnQgKTtcbn07XG5cbnByb3RvLm5leHQgPSBmdW5jdGlvbiggaXNXcmFwLCBpc0luc3RhbnQgKSB7XG4gIHRoaXMuc2VsZWN0KCB0aGlzLnNlbGVjdGVkSW5kZXggKyAxLCBpc1dyYXAsIGlzSW5zdGFudCApO1xufTtcblxucHJvdG8udXBkYXRlU2VsZWN0ZWRTbGlkZSA9IGZ1bmN0aW9uKCkge1xuICB2YXIgc2xpZGUgPSB0aGlzLnNsaWRlc1sgdGhpcy5zZWxlY3RlZEluZGV4IF07XG4gIC8vIHNlbGVjdGVkSW5kZXggY291bGQgYmUgb3V0c2lkZSBvZiBzbGlkZXMsIGlmIHRyaWdnZXJlZCBiZWZvcmUgcmVzaXplKClcbiAgaWYgKCAhc2xpZGUgKSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIC8vIHVuc2VsZWN0IHByZXZpb3VzIHNlbGVjdGVkIHNsaWRlXG4gIHRoaXMudW5zZWxlY3RTZWxlY3RlZFNsaWRlKCk7XG4gIC8vIHVwZGF0ZSBuZXcgc2VsZWN0ZWQgc2xpZGVcbiAgdGhpcy5zZWxlY3RlZFNsaWRlID0gc2xpZGU7XG4gIHNsaWRlLnNlbGVjdCgpO1xuICB0aGlzLnNlbGVjdGVkQ2VsbHMgPSBzbGlkZS5jZWxscztcbiAgdGhpcy5zZWxlY3RlZEVsZW1lbnRzID0gc2xpZGUuZ2V0Q2VsbEVsZW1lbnRzKCk7XG4gIC8vIEhBQ0s6IHNlbGVjdGVkQ2VsbCAmIHNlbGVjdGVkRWxlbWVudCBpcyBmaXJzdCBjZWxsIGluIHNsaWRlLCBiYWNrd2FyZHMgY29tcGF0aWJpbGl0eVxuICAvLyBSZW1vdmUgaW4gdjM/XG4gIHRoaXMuc2VsZWN0ZWRDZWxsID0gc2xpZGUuY2VsbHNbMF07XG4gIHRoaXMuc2VsZWN0ZWRFbGVtZW50ID0gdGhpcy5zZWxlY3RlZEVsZW1lbnRzWzBdO1xufTtcblxucHJvdG8udW5zZWxlY3RTZWxlY3RlZFNsaWRlID0gZnVuY3Rpb24oKSB7XG4gIGlmICggdGhpcy5zZWxlY3RlZFNsaWRlICkge1xuICAgIHRoaXMuc2VsZWN0ZWRTbGlkZS51bnNlbGVjdCgpO1xuICB9XG59O1xuXG5wcm90by5zZWxlY3RJbml0aWFsSW5kZXggPSBmdW5jdGlvbigpIHtcbiAgdmFyIGluaXRpYWxJbmRleCA9IHRoaXMub3B0aW9ucy5pbml0aWFsSW5kZXg7XG4gIC8vIGFscmVhZHkgYWN0aXZhdGVkLCBzZWxlY3QgcHJldmlvdXMgc2VsZWN0ZWRJbmRleFxuICBpZiAoIHRoaXMuaXNJbml0QWN0aXZhdGVkICkge1xuICAgIHRoaXMuc2VsZWN0KCB0aGlzLnNlbGVjdGVkSW5kZXgsIGZhbHNlLCB0cnVlICk7XG4gICAgcmV0dXJuO1xuICB9XG4gIC8vIHNlbGVjdCB3aXRoIHNlbGVjdG9yIHN0cmluZ1xuICBpZiAoIGluaXRpYWxJbmRleCAmJiB0eXBlb2YgaW5pdGlhbEluZGV4ID09ICdzdHJpbmcnICkge1xuICAgIHZhciBjZWxsID0gdGhpcy5xdWVyeUNlbGwoIGluaXRpYWxJbmRleCApO1xuICAgIGlmICggY2VsbCApIHtcbiAgICAgIHRoaXMuc2VsZWN0Q2VsbCggaW5pdGlhbEluZGV4LCBmYWxzZSwgdHJ1ZSApO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgfVxuXG4gIHZhciBpbmRleCA9IDA7XG4gIC8vIHNlbGVjdCB3aXRoIG51bWJlclxuICBpZiAoIGluaXRpYWxJbmRleCAmJiB0aGlzLnNsaWRlc1sgaW5pdGlhbEluZGV4IF0gKSB7XG4gICAgaW5kZXggPSBpbml0aWFsSW5kZXg7XG4gIH1cbiAgLy8gc2VsZWN0IGluc3RhbnRseVxuICB0aGlzLnNlbGVjdCggaW5kZXgsIGZhbHNlLCB0cnVlICk7XG59O1xuXG4vKipcbiAqIHNlbGVjdCBzbGlkZSBmcm9tIG51bWJlciBvciBjZWxsIGVsZW1lbnRcbiAqIEBwYXJhbSB7RWxlbWVudCBvciBOdW1iZXJ9IGVsZW1cbiAqL1xucHJvdG8uc2VsZWN0Q2VsbCA9IGZ1bmN0aW9uKCB2YWx1ZSwgaXNXcmFwLCBpc0luc3RhbnQgKSB7XG4gIC8vIGdldCBjZWxsXG4gIHZhciBjZWxsID0gdGhpcy5xdWVyeUNlbGwoIHZhbHVlICk7XG4gIGlmICggIWNlbGwgKSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgdmFyIGluZGV4ID0gdGhpcy5nZXRDZWxsU2xpZGVJbmRleCggY2VsbCApO1xuICB0aGlzLnNlbGVjdCggaW5kZXgsIGlzV3JhcCwgaXNJbnN0YW50ICk7XG59O1xuXG5wcm90by5nZXRDZWxsU2xpZGVJbmRleCA9IGZ1bmN0aW9uKCBjZWxsICkge1xuICAvLyBnZXQgaW5kZXggb2Ygc2xpZGVzIHRoYXQgaGFzIGNlbGxcbiAgZm9yICggdmFyIGk9MDsgaSA8IHRoaXMuc2xpZGVzLmxlbmd0aDsgaSsrICkge1xuICAgIHZhciBzbGlkZSA9IHRoaXMuc2xpZGVzW2ldO1xuICAgIHZhciBpbmRleCA9IHNsaWRlLmNlbGxzLmluZGV4T2YoIGNlbGwgKTtcbiAgICBpZiAoIGluZGV4ICE9IC0xICkge1xuICAgICAgcmV0dXJuIGk7XG4gICAgfVxuICB9XG59O1xuXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSBnZXQgY2VsbHMgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gLy9cblxuLyoqXG4gKiBnZXQgRmxpY2tpdHkuQ2VsbCwgZ2l2ZW4gYW4gRWxlbWVudFxuICogQHBhcmFtIHtFbGVtZW50fSBlbGVtXG4gKiBAcmV0dXJucyB7RmxpY2tpdHkuQ2VsbH0gaXRlbVxuICovXG5wcm90by5nZXRDZWxsID0gZnVuY3Rpb24oIGVsZW0gKSB7XG4gIC8vIGxvb3AgdGhyb3VnaCBjZWxscyB0byBnZXQgdGhlIG9uZSB0aGF0IG1hdGNoZXNcbiAgZm9yICggdmFyIGk9MDsgaSA8IHRoaXMuY2VsbHMubGVuZ3RoOyBpKysgKSB7XG4gICAgdmFyIGNlbGwgPSB0aGlzLmNlbGxzW2ldO1xuICAgIGlmICggY2VsbC5lbGVtZW50ID09IGVsZW0gKSB7XG4gICAgICByZXR1cm4gY2VsbDtcbiAgICB9XG4gIH1cbn07XG5cbi8qKlxuICogZ2V0IGNvbGxlY3Rpb24gb2YgRmxpY2tpdHkuQ2VsbHMsIGdpdmVuIEVsZW1lbnRzXG4gKiBAcGFyYW0ge0VsZW1lbnQsIEFycmF5LCBOb2RlTGlzdH0gZWxlbXNcbiAqIEByZXR1cm5zIHtBcnJheX0gY2VsbHMgLSBGbGlja2l0eS5DZWxsc1xuICovXG5wcm90by5nZXRDZWxscyA9IGZ1bmN0aW9uKCBlbGVtcyApIHtcbiAgZWxlbXMgPSB1dGlscy5tYWtlQXJyYXkoIGVsZW1zICk7XG4gIHZhciBjZWxscyA9IFtdO1xuICBlbGVtcy5mb3JFYWNoKCBmdW5jdGlvbiggZWxlbSApIHtcbiAgICB2YXIgY2VsbCA9IHRoaXMuZ2V0Q2VsbCggZWxlbSApO1xuICAgIGlmICggY2VsbCApIHtcbiAgICAgIGNlbGxzLnB1c2goIGNlbGwgKTtcbiAgICB9XG4gIH0sIHRoaXMgKTtcbiAgcmV0dXJuIGNlbGxzO1xufTtcblxuLyoqXG4gKiBnZXQgY2VsbCBlbGVtZW50c1xuICogQHJldHVybnMge0FycmF5fSBjZWxsRWxlbXNcbiAqL1xucHJvdG8uZ2V0Q2VsbEVsZW1lbnRzID0gZnVuY3Rpb24oKSB7XG4gIHJldHVybiB0aGlzLmNlbGxzLm1hcCggZnVuY3Rpb24oIGNlbGwgKSB7XG4gICAgcmV0dXJuIGNlbGwuZWxlbWVudDtcbiAgfSk7XG59O1xuXG4vKipcbiAqIGdldCBwYXJlbnQgY2VsbCBmcm9tIGFuIGVsZW1lbnRcbiAqIEBwYXJhbSB7RWxlbWVudH0gZWxlbVxuICogQHJldHVybnMge0ZsaWNraXQuQ2VsbH0gY2VsbFxuICovXG5wcm90by5nZXRQYXJlbnRDZWxsID0gZnVuY3Rpb24oIGVsZW0gKSB7XG4gIC8vIGZpcnN0IGNoZWNrIGlmIGVsZW0gaXMgY2VsbFxuICB2YXIgY2VsbCA9IHRoaXMuZ2V0Q2VsbCggZWxlbSApO1xuICBpZiAoIGNlbGwgKSB7XG4gICAgcmV0dXJuIGNlbGw7XG4gIH1cbiAgLy8gdHJ5IHRvIGdldCBwYXJlbnQgY2VsbCBlbGVtXG4gIGVsZW0gPSB1dGlscy5nZXRQYXJlbnQoIGVsZW0sICcuZmxpY2tpdHktc2xpZGVyID4gKicgKTtcbiAgcmV0dXJuIHRoaXMuZ2V0Q2VsbCggZWxlbSApO1xufTtcblxuLyoqXG4gKiBnZXQgY2VsbHMgYWRqYWNlbnQgdG8gYSBzbGlkZVxuICogQHBhcmFtIHtJbnRlZ2VyfSBhZGpDb3VudCAtIG51bWJlciBvZiBhZGphY2VudCBzbGlkZXNcbiAqIEBwYXJhbSB7SW50ZWdlcn0gaW5kZXggLSBpbmRleCBvZiBzbGlkZSB0byBzdGFydFxuICogQHJldHVybnMge0FycmF5fSBjZWxscyAtIGFycmF5IG9mIEZsaWNraXR5LkNlbGxzXG4gKi9cbnByb3RvLmdldEFkamFjZW50Q2VsbEVsZW1lbnRzID0gZnVuY3Rpb24oIGFkakNvdW50LCBpbmRleCApIHtcbiAgaWYgKCAhYWRqQ291bnQgKSB7XG4gICAgcmV0dXJuIHRoaXMuc2VsZWN0ZWRTbGlkZS5nZXRDZWxsRWxlbWVudHMoKTtcbiAgfVxuICBpbmRleCA9IGluZGV4ID09PSB1bmRlZmluZWQgPyB0aGlzLnNlbGVjdGVkSW5kZXggOiBpbmRleDtcblxuICB2YXIgbGVuID0gdGhpcy5zbGlkZXMubGVuZ3RoO1xuICBpZiAoIDEgKyAoIGFkakNvdW50ICogMiApID49IGxlbiApIHtcbiAgICByZXR1cm4gdGhpcy5nZXRDZWxsRWxlbWVudHMoKTtcbiAgfVxuXG4gIHZhciBjZWxsRWxlbXMgPSBbXTtcbiAgZm9yICggdmFyIGkgPSBpbmRleCAtIGFkakNvdW50OyBpIDw9IGluZGV4ICsgYWRqQ291bnQgOyBpKysgKSB7XG4gICAgdmFyIHNsaWRlSW5kZXggPSB0aGlzLm9wdGlvbnMud3JhcEFyb3VuZCA/IHV0aWxzLm1vZHVsbyggaSwgbGVuICkgOiBpO1xuICAgIHZhciBzbGlkZSA9IHRoaXMuc2xpZGVzWyBzbGlkZUluZGV4IF07XG4gICAgaWYgKCBzbGlkZSApIHtcbiAgICAgIGNlbGxFbGVtcyA9IGNlbGxFbGVtcy5jb25jYXQoIHNsaWRlLmdldENlbGxFbGVtZW50cygpICk7XG4gICAgfVxuICB9XG4gIHJldHVybiBjZWxsRWxlbXM7XG59O1xuXG4vKipcbiAqIHNlbGVjdCBzbGlkZSBmcm9tIG51bWJlciBvciBjZWxsIGVsZW1lbnRcbiAqIEBwYXJhbSB7RWxlbWVudCwgU2VsZWN0b3IgU3RyaW5nLCBvciBOdW1iZXJ9IHNlbGVjdG9yXG4gKi9cbnByb3RvLnF1ZXJ5Q2VsbCA9IGZ1bmN0aW9uKCBzZWxlY3RvciApIHtcbiAgaWYgKCB0eXBlb2Ygc2VsZWN0b3IgPT0gJ251bWJlcicgKSB7XG4gICAgLy8gdXNlIG51bWJlciBhcyBpbmRleFxuICAgIHJldHVybiB0aGlzLmNlbGxzWyBzZWxlY3RvciBdO1xuICB9XG4gIGlmICggdHlwZW9mIHNlbGVjdG9yID09ICdzdHJpbmcnICkge1xuICAgIC8vIGRvIG5vdCBzZWxlY3QgaW52YWxpZCBzZWxlY3RvcnMgZnJvbSBoYXNoOiAjMTIzLCAjLy4gIzc5MVxuICAgIGlmICggc2VsZWN0b3IubWF0Y2goL15bI1xcLl0/W1xcZFxcL10vKSApIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgLy8gdXNlIHN0cmluZyBhcyBzZWxlY3RvciwgZ2V0IGVsZW1lbnRcbiAgICBzZWxlY3RvciA9IHRoaXMuZWxlbWVudC5xdWVyeVNlbGVjdG9yKCBzZWxlY3RvciApO1xuICB9XG4gIC8vIGdldCBjZWxsIGZyb20gZWxlbWVudFxuICByZXR1cm4gdGhpcy5nZXRDZWxsKCBzZWxlY3RvciApO1xufTtcblxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gZXZlbnRzIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tIC8vXG5cbnByb3RvLnVpQ2hhbmdlID0gZnVuY3Rpb24oKSB7XG4gIHRoaXMuZW1pdEV2ZW50KCd1aUNoYW5nZScpO1xufTtcblxuLy8ga2VlcCBmb2N1cyBvbiBlbGVtZW50IHdoZW4gY2hpbGQgVUkgZWxlbWVudHMgYXJlIGNsaWNrZWRcbnByb3RvLmNoaWxkVUlQb2ludGVyRG93biA9IGZ1bmN0aW9uKCBldmVudCApIHtcbiAgLy8gSEFDSyBpT1MgZG9lcyBub3QgYWxsb3cgdG91Y2ggZXZlbnRzIHRvIGJ1YmJsZSB1cD8hXG4gIGlmICggZXZlbnQudHlwZSAhPSAndG91Y2hzdGFydCcgKSB7XG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgfVxuICB0aGlzLmZvY3VzKCk7XG59O1xuXG4vLyAtLS0tLSByZXNpemUgLS0tLS0gLy9cblxucHJvdG8ub25yZXNpemUgPSBmdW5jdGlvbigpIHtcbiAgdGhpcy53YXRjaENTUygpO1xuICB0aGlzLnJlc2l6ZSgpO1xufTtcblxudXRpbHMuZGVib3VuY2VNZXRob2QoIEZsaWNraXR5LCAnb25yZXNpemUnLCAxNTAgKTtcblxucHJvdG8ucmVzaXplID0gZnVuY3Rpb24oKSB7XG4gIGlmICggIXRoaXMuaXNBY3RpdmUgKSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIHRoaXMuZ2V0U2l6ZSgpO1xuICAvLyB3cmFwIHZhbHVlc1xuICBpZiAoIHRoaXMub3B0aW9ucy53cmFwQXJvdW5kICkge1xuICAgIHRoaXMueCA9IHV0aWxzLm1vZHVsbyggdGhpcy54LCB0aGlzLnNsaWRlYWJsZVdpZHRoICk7XG4gIH1cbiAgdGhpcy5wb3NpdGlvbkNlbGxzKCk7XG4gIHRoaXMuX2dldFdyYXBTaGlmdENlbGxzKCk7XG4gIHRoaXMuc2V0R2FsbGVyeVNpemUoKTtcbiAgdGhpcy5lbWl0RXZlbnQoJ3Jlc2l6ZScpO1xuICAvLyB1cGRhdGUgc2VsZWN0ZWQgaW5kZXggZm9yIGdyb3VwIHNsaWRlcywgaW5zdGFudFxuICAvLyBUT0RPOiBwb3NpdGlvbiBjYW4gYmUgbG9zdCBiZXR3ZWVuIGdyb3VwcyBvZiB2YXJpb3VzIG51bWJlcnNcbiAgdmFyIHNlbGVjdGVkRWxlbWVudCA9IHRoaXMuc2VsZWN0ZWRFbGVtZW50cyAmJiB0aGlzLnNlbGVjdGVkRWxlbWVudHNbMF07XG4gIHRoaXMuc2VsZWN0Q2VsbCggc2VsZWN0ZWRFbGVtZW50LCBmYWxzZSwgdHJ1ZSApO1xufTtcblxuLy8gd2F0Y2hlcyB0aGUgOmFmdGVyIHByb3BlcnR5LCBhY3RpdmF0ZXMvZGVhY3RpdmF0ZXNcbnByb3RvLndhdGNoQ1NTID0gZnVuY3Rpb24oKSB7XG4gIHZhciB3YXRjaE9wdGlvbiA9IHRoaXMub3B0aW9ucy53YXRjaENTUztcbiAgaWYgKCAhd2F0Y2hPcHRpb24gKSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgdmFyIGFmdGVyQ29udGVudCA9IGdldENvbXB1dGVkU3R5bGUoIHRoaXMuZWxlbWVudCwgJzphZnRlcicgKS5jb250ZW50O1xuICAvLyBhY3RpdmF0ZSBpZiA6YWZ0ZXIgeyBjb250ZW50OiAnZmxpY2tpdHknIH1cbiAgaWYgKCBhZnRlckNvbnRlbnQuaW5kZXhPZignZmxpY2tpdHknKSAhPSAtMSApIHtcbiAgICB0aGlzLmFjdGl2YXRlKCk7XG4gIH0gZWxzZSB7XG4gICAgdGhpcy5kZWFjdGl2YXRlKCk7XG4gIH1cbn07XG5cbi8vIC0tLS0tIGtleWRvd24gLS0tLS0gLy9cblxuLy8gZ28gcHJldmlvdXMvbmV4dCBpZiBsZWZ0L3JpZ2h0IGtleXMgcHJlc3NlZFxucHJvdG8ub25rZXlkb3duID0gZnVuY3Rpb24oIGV2ZW50ICkge1xuICAvLyBvbmx5IHdvcmsgaWYgZWxlbWVudCBpcyBpbiBmb2N1c1xuICB2YXIgaXNOb3RGb2N1c2VkID0gZG9jdW1lbnQuYWN0aXZlRWxlbWVudCAmJiBkb2N1bWVudC5hY3RpdmVFbGVtZW50ICE9IHRoaXMuZWxlbWVudDtcbiAgaWYgKCAhdGhpcy5vcHRpb25zLmFjY2Vzc2liaWxpdHkgfHxpc05vdEZvY3VzZWQgKSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgdmFyIGhhbmRsZXIgPSBGbGlja2l0eS5rZXlib2FyZEhhbmRsZXJzWyBldmVudC5rZXlDb2RlIF07XG4gIGlmICggaGFuZGxlciApIHtcbiAgICBoYW5kbGVyLmNhbGwoIHRoaXMgKTtcbiAgfVxufTtcblxuRmxpY2tpdHkua2V5Ym9hcmRIYW5kbGVycyA9IHtcbiAgLy8gbGVmdCBhcnJvd1xuICAzNzogZnVuY3Rpb24oKSB7XG4gICAgdmFyIGxlZnRNZXRob2QgPSB0aGlzLm9wdGlvbnMucmlnaHRUb0xlZnQgPyAnbmV4dCcgOiAncHJldmlvdXMnO1xuICAgIHRoaXMudWlDaGFuZ2UoKTtcbiAgICB0aGlzWyBsZWZ0TWV0aG9kIF0oKTtcbiAgfSxcbiAgLy8gcmlnaHQgYXJyb3dcbiAgMzk6IGZ1bmN0aW9uKCkge1xuICAgIHZhciByaWdodE1ldGhvZCA9IHRoaXMub3B0aW9ucy5yaWdodFRvTGVmdCA/ICdwcmV2aW91cycgOiAnbmV4dCc7XG4gICAgdGhpcy51aUNoYW5nZSgpO1xuICAgIHRoaXNbIHJpZ2h0TWV0aG9kIF0oKTtcbiAgfSxcbn07XG5cbi8vIC0tLS0tIGZvY3VzIC0tLS0tIC8vXG5cbnByb3RvLmZvY3VzID0gZnVuY3Rpb24oKSB7XG4gIC8vIFRPRE8gcmVtb3ZlIHNjcm9sbFRvIG9uY2UgZm9jdXMgb3B0aW9ucyBnZXRzIG1vcmUgc3VwcG9ydFxuICAvLyBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9BUEkvSFRNTEVsZW1lbnQvZm9jdXMjQnJvd3Nlcl9jb21wYXRpYmlsaXR5XG4gIHZhciBwcmV2U2Nyb2xsWSA9IHdpbmRvdy5wYWdlWU9mZnNldDtcbiAgdGhpcy5lbGVtZW50LmZvY3VzKHsgcHJldmVudFNjcm9sbDogdHJ1ZSB9KTtcbiAgLy8gaGFjayB0byBmaXggc2Nyb2xsIGp1bXAgYWZ0ZXIgZm9jdXMsICM3NlxuICBpZiAoIHdpbmRvdy5wYWdlWU9mZnNldCAhPSBwcmV2U2Nyb2xsWSApIHtcbiAgICB3aW5kb3cuc2Nyb2xsVG8oIHdpbmRvdy5wYWdlWE9mZnNldCwgcHJldlNjcm9sbFkgKTtcbiAgfVxufTtcblxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gZGVzdHJveSAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAvL1xuXG4vLyBkZWFjdGl2YXRlIGFsbCBGbGlja2l0eSBmdW5jdGlvbmFsaXR5LCBidXQga2VlcCBzdHVmZiBhdmFpbGFibGVcbnByb3RvLmRlYWN0aXZhdGUgPSBmdW5jdGlvbigpIHtcbiAgaWYgKCAhdGhpcy5pc0FjdGl2ZSApIHtcbiAgICByZXR1cm47XG4gIH1cbiAgdGhpcy5lbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoJ2ZsaWNraXR5LWVuYWJsZWQnKTtcbiAgdGhpcy5lbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoJ2ZsaWNraXR5LXJ0bCcpO1xuICB0aGlzLnVuc2VsZWN0U2VsZWN0ZWRTbGlkZSgpO1xuICAvLyBkZXN0cm95IGNlbGxzXG4gIHRoaXMuY2VsbHMuZm9yRWFjaCggZnVuY3Rpb24oIGNlbGwgKSB7XG4gICAgY2VsbC5kZXN0cm95KCk7XG4gIH0pO1xuICB0aGlzLmVsZW1lbnQucmVtb3ZlQ2hpbGQoIHRoaXMudmlld3BvcnQgKTtcbiAgLy8gbW92ZSBjaGlsZCBlbGVtZW50cyBiYWNrIGludG8gZWxlbWVudFxuICBtb3ZlRWxlbWVudHMoIHRoaXMuc2xpZGVyLmNoaWxkcmVuLCB0aGlzLmVsZW1lbnQgKTtcbiAgaWYgKCB0aGlzLm9wdGlvbnMuYWNjZXNzaWJpbGl0eSApIHtcbiAgICB0aGlzLmVsZW1lbnQucmVtb3ZlQXR0cmlidXRlKCd0YWJJbmRleCcpO1xuICAgIHRoaXMuZWxlbWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCAna2V5ZG93bicsIHRoaXMgKTtcbiAgfVxuICAvLyBzZXQgZmxhZ3NcbiAgdGhpcy5pc0FjdGl2ZSA9IGZhbHNlO1xuICB0aGlzLmVtaXRFdmVudCgnZGVhY3RpdmF0ZScpO1xufTtcblxucHJvdG8uZGVzdHJveSA9IGZ1bmN0aW9uKCkge1xuICB0aGlzLmRlYWN0aXZhdGUoKTtcbiAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoICdyZXNpemUnLCB0aGlzICk7XG4gIHRoaXMuYWxsT2ZmKCk7XG4gIHRoaXMuZW1pdEV2ZW50KCdkZXN0cm95Jyk7XG4gIGlmICggalF1ZXJ5ICYmIHRoaXMuJGVsZW1lbnQgKSB7XG4gICAgalF1ZXJ5LnJlbW92ZURhdGEoIHRoaXMuZWxlbWVudCwgJ2ZsaWNraXR5JyApO1xuICB9XG4gIGRlbGV0ZSB0aGlzLmVsZW1lbnQuZmxpY2tpdHlHVUlEO1xuICBkZWxldGUgaW5zdGFuY2VzWyB0aGlzLmd1aWQgXTtcbn07XG5cbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tIHByb3RvdHlwZSAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAvL1xuXG51dGlscy5leHRlbmQoIHByb3RvLCBhbmltYXRlUHJvdG90eXBlICk7XG5cbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tIGV4dHJhcyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAvL1xuXG4vKipcbiAqIGdldCBGbGlja2l0eSBpbnN0YW5jZSBmcm9tIGVsZW1lbnRcbiAqIEBwYXJhbSB7RWxlbWVudH0gZWxlbVxuICogQHJldHVybnMge0ZsaWNraXR5fVxuICovXG5GbGlja2l0eS5kYXRhID0gZnVuY3Rpb24oIGVsZW0gKSB7XG4gIGVsZW0gPSB1dGlscy5nZXRRdWVyeUVsZW1lbnQoIGVsZW0gKTtcbiAgdmFyIGlkID0gZWxlbSAmJiBlbGVtLmZsaWNraXR5R1VJRDtcbiAgcmV0dXJuIGlkICYmIGluc3RhbmNlc1sgaWQgXTtcbn07XG5cbnV0aWxzLmh0bWxJbml0KCBGbGlja2l0eSwgJ2ZsaWNraXR5JyApO1xuXG5pZiAoIGpRdWVyeSAmJiBqUXVlcnkuYnJpZGdldCApIHtcbiAgalF1ZXJ5LmJyaWRnZXQoICdmbGlja2l0eScsIEZsaWNraXR5ICk7XG59XG5cbi8vIHNldCBpbnRlcm5hbCBqUXVlcnksIGZvciBXZWJwYWNrICsgalF1ZXJ5IHYzLCAjNDc4XG5GbGlja2l0eS5zZXRKUXVlcnkgPSBmdW5jdGlvbigganEgKSB7XG4gIGpRdWVyeSA9IGpxO1xufTtcblxuRmxpY2tpdHkuQ2VsbCA9IENlbGw7XG5GbGlja2l0eS5TbGlkZSA9IFNsaWRlO1xuXG5yZXR1cm4gRmxpY2tpdHk7XG5cbn0pKTtcbiIsIi8qIVxuICogRmxpY2tpdHkgdjIuMi4xXG4gKiBUb3VjaCwgcmVzcG9uc2l2ZSwgZmxpY2thYmxlIGNhcm91c2Vsc1xuICpcbiAqIExpY2Vuc2VkIEdQTHYzIGZvciBvcGVuIHNvdXJjZSB1c2VcbiAqIG9yIEZsaWNraXR5IENvbW1lcmNpYWwgTGljZW5zZSBmb3IgY29tbWVyY2lhbCB1c2VcbiAqXG4gKiBodHRwczovL2ZsaWNraXR5Lm1ldGFmaXp6eS5jb1xuICogQ29weXJpZ2h0IDIwMTUtMjAxOSBNZXRhZml6enlcbiAqL1xuXG4oIGZ1bmN0aW9uKCB3aW5kb3csIGZhY3RvcnkgKSB7XG4gIC8vIHVuaXZlcnNhbCBtb2R1bGUgZGVmaW5pdGlvblxuICAvKiBqc2hpbnQgc3RyaWN0OiBmYWxzZSAqL1xuICBpZiAoIHR5cGVvZiBkZWZpbmUgPT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kICkge1xuICAgIC8vIEFNRFxuICAgIGRlZmluZSggW1xuICAgICAgJy4vZmxpY2tpdHknLFxuICAgICAgJy4vZHJhZycsXG4gICAgICAnLi9wcmV2LW5leHQtYnV0dG9uJyxcbiAgICAgICcuL3BhZ2UtZG90cycsXG4gICAgICAnLi9wbGF5ZXInLFxuICAgICAgJy4vYWRkLXJlbW92ZS1jZWxsJyxcbiAgICAgICcuL2xhenlsb2FkJ1xuICAgIF0sIGZhY3RvcnkgKTtcbiAgfSBlbHNlIGlmICggdHlwZW9mIG1vZHVsZSA9PSAnb2JqZWN0JyAmJiBtb2R1bGUuZXhwb3J0cyApIHtcbiAgICAvLyBDb21tb25KU1xuICAgIG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeShcbiAgICAgIHJlcXVpcmUoJy4vZmxpY2tpdHknKSxcbiAgICAgIHJlcXVpcmUoJy4vZHJhZycpLFxuICAgICAgcmVxdWlyZSgnLi9wcmV2LW5leHQtYnV0dG9uJyksXG4gICAgICByZXF1aXJlKCcuL3BhZ2UtZG90cycpLFxuICAgICAgcmVxdWlyZSgnLi9wbGF5ZXInKSxcbiAgICAgIHJlcXVpcmUoJy4vYWRkLXJlbW92ZS1jZWxsJyksXG4gICAgICByZXF1aXJlKCcuL2xhenlsb2FkJylcbiAgICApO1xuICB9XG5cbn0pKCB3aW5kb3csIGZ1bmN0aW9uIGZhY3RvcnkoIEZsaWNraXR5ICkge1xuICAvKmpzaGludCBzdHJpY3Q6IGZhbHNlKi9cbiAgcmV0dXJuIEZsaWNraXR5O1xufSk7XG4iLCIvLyBsYXp5bG9hZFxuKCBmdW5jdGlvbiggd2luZG93LCBmYWN0b3J5ICkge1xuICAvLyB1bml2ZXJzYWwgbW9kdWxlIGRlZmluaXRpb25cbiAgLyoganNoaW50IHN0cmljdDogZmFsc2UgKi9cbiAgaWYgKCB0eXBlb2YgZGVmaW5lID09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZCApIHtcbiAgICAvLyBBTURcbiAgICBkZWZpbmUoIFtcbiAgICAgICcuL2ZsaWNraXR5JyxcbiAgICAgICdmaXp6eS11aS11dGlscy91dGlscydcbiAgICBdLCBmdW5jdGlvbiggRmxpY2tpdHksIHV0aWxzICkge1xuICAgICAgcmV0dXJuIGZhY3RvcnkoIHdpbmRvdywgRmxpY2tpdHksIHV0aWxzICk7XG4gICAgfSk7XG4gIH0gZWxzZSBpZiAoIHR5cGVvZiBtb2R1bGUgPT0gJ29iamVjdCcgJiYgbW9kdWxlLmV4cG9ydHMgKSB7XG4gICAgLy8gQ29tbW9uSlNcbiAgICBtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkoXG4gICAgICB3aW5kb3csXG4gICAgICByZXF1aXJlKCcuL2ZsaWNraXR5JyksXG4gICAgICByZXF1aXJlKCdmaXp6eS11aS11dGlscycpXG4gICAgKTtcbiAgfSBlbHNlIHtcbiAgICAvLyBicm93c2VyIGdsb2JhbFxuICAgIGZhY3RvcnkoXG4gICAgICB3aW5kb3csXG4gICAgICB3aW5kb3cuRmxpY2tpdHksXG4gICAgICB3aW5kb3cuZml6enlVSVV0aWxzXG4gICAgKTtcbiAgfVxuXG59KCB3aW5kb3csIGZ1bmN0aW9uIGZhY3RvcnkoIHdpbmRvdywgRmxpY2tpdHksIHV0aWxzICkge1xuJ3VzZSBzdHJpY3QnO1xuXG5GbGlja2l0eS5jcmVhdGVNZXRob2RzLnB1c2goJ19jcmVhdGVMYXp5bG9hZCcpO1xudmFyIHByb3RvID0gRmxpY2tpdHkucHJvdG90eXBlO1xuXG5wcm90by5fY3JlYXRlTGF6eWxvYWQgPSBmdW5jdGlvbigpIHtcbiAgdGhpcy5vbiggJ3NlbGVjdCcsIHRoaXMubGF6eUxvYWQgKTtcbn07XG5cbnByb3RvLmxhenlMb2FkID0gZnVuY3Rpb24oKSB7XG4gIHZhciBsYXp5TG9hZCA9IHRoaXMub3B0aW9ucy5sYXp5TG9hZDtcbiAgaWYgKCAhbGF6eUxvYWQgKSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIC8vIGdldCBhZGphY2VudCBjZWxscywgdXNlIGxhenlMb2FkIG9wdGlvbiBmb3IgYWRqYWNlbnQgY291bnRcbiAgdmFyIGFkakNvdW50ID0gdHlwZW9mIGxhenlMb2FkID09ICdudW1iZXInID8gbGF6eUxvYWQgOiAwO1xuICB2YXIgY2VsbEVsZW1zID0gdGhpcy5nZXRBZGphY2VudENlbGxFbGVtZW50cyggYWRqQ291bnQgKTtcbiAgLy8gZ2V0IGxhenkgaW1hZ2VzIGluIHRob3NlIGNlbGxzXG4gIHZhciBsYXp5SW1hZ2VzID0gW107XG4gIGNlbGxFbGVtcy5mb3JFYWNoKCBmdW5jdGlvbiggY2VsbEVsZW0gKSB7XG4gICAgdmFyIGxhenlDZWxsSW1hZ2VzID0gZ2V0Q2VsbExhenlJbWFnZXMoIGNlbGxFbGVtICk7XG4gICAgbGF6eUltYWdlcyA9IGxhenlJbWFnZXMuY29uY2F0KCBsYXp5Q2VsbEltYWdlcyApO1xuICB9KTtcbiAgLy8gbG9hZCBsYXp5IGltYWdlc1xuICBsYXp5SW1hZ2VzLmZvckVhY2goIGZ1bmN0aW9uKCBpbWcgKSB7XG4gICAgbmV3IExhenlMb2FkZXIoIGltZywgdGhpcyApO1xuICB9LCB0aGlzICk7XG59O1xuXG5mdW5jdGlvbiBnZXRDZWxsTGF6eUltYWdlcyggY2VsbEVsZW0gKSB7XG4gIC8vIGNoZWNrIGlmIGNlbGwgZWxlbWVudCBpcyBsYXp5IGltYWdlXG4gIGlmICggY2VsbEVsZW0ubm9kZU5hbWUgPT0gJ0lNRycgKSB7XG4gICAgdmFyIGxhenlsb2FkQXR0ciA9IGNlbGxFbGVtLmdldEF0dHJpYnV0ZSgnZGF0YS1mbGlja2l0eS1sYXp5bG9hZCcpO1xuICAgIHZhciBzcmNBdHRyID0gY2VsbEVsZW0uZ2V0QXR0cmlidXRlKCdkYXRhLWZsaWNraXR5LWxhenlsb2FkLXNyYycpO1xuICAgIHZhciBzcmNzZXRBdHRyID0gY2VsbEVsZW0uZ2V0QXR0cmlidXRlKCdkYXRhLWZsaWNraXR5LWxhenlsb2FkLXNyY3NldCcpO1xuICAgIGlmICggbGF6eWxvYWRBdHRyIHx8IHNyY0F0dHIgfHwgc3Jjc2V0QXR0ciApIHtcbiAgICAgIHJldHVybiBbIGNlbGxFbGVtIF07XG4gICAgfVxuICB9XG4gIC8vIHNlbGVjdCBsYXp5IGltYWdlcyBpbiBjZWxsXG4gIHZhciBsYXp5U2VsZWN0b3IgPSAnaW1nW2RhdGEtZmxpY2tpdHktbGF6eWxvYWRdLCAnICtcbiAgICAnaW1nW2RhdGEtZmxpY2tpdHktbGF6eWxvYWQtc3JjXSwgaW1nW2RhdGEtZmxpY2tpdHktbGF6eWxvYWQtc3Jjc2V0XSc7XG4gIHZhciBpbWdzID0gY2VsbEVsZW0ucXVlcnlTZWxlY3RvckFsbCggbGF6eVNlbGVjdG9yICk7XG4gIHJldHVybiB1dGlscy5tYWtlQXJyYXkoIGltZ3MgKTtcbn1cblxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gTGF6eUxvYWRlciAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAvL1xuXG4vKipcbiAqIGNsYXNzIHRvIGhhbmRsZSBsb2FkaW5nIGltYWdlc1xuICovXG5mdW5jdGlvbiBMYXp5TG9hZGVyKCBpbWcsIGZsaWNraXR5ICkge1xuICB0aGlzLmltZyA9IGltZztcbiAgdGhpcy5mbGlja2l0eSA9IGZsaWNraXR5O1xuICB0aGlzLmxvYWQoKTtcbn1cblxuTGF6eUxvYWRlci5wcm90b3R5cGUuaGFuZGxlRXZlbnQgPSB1dGlscy5oYW5kbGVFdmVudDtcblxuTGF6eUxvYWRlci5wcm90b3R5cGUubG9hZCA9IGZ1bmN0aW9uKCkge1xuICB0aGlzLmltZy5hZGRFdmVudExpc3RlbmVyKCAnbG9hZCcsIHRoaXMgKTtcbiAgdGhpcy5pbWcuYWRkRXZlbnRMaXN0ZW5lciggJ2Vycm9yJywgdGhpcyApO1xuICAvLyBnZXQgc3JjICYgc3Jjc2V0XG4gIHZhciBzcmMgPSB0aGlzLmltZy5nZXRBdHRyaWJ1dGUoJ2RhdGEtZmxpY2tpdHktbGF6eWxvYWQnKSB8fFxuICAgIHRoaXMuaW1nLmdldEF0dHJpYnV0ZSgnZGF0YS1mbGlja2l0eS1sYXp5bG9hZC1zcmMnKTtcbiAgdmFyIHNyY3NldCA9IHRoaXMuaW1nLmdldEF0dHJpYnV0ZSgnZGF0YS1mbGlja2l0eS1sYXp5bG9hZC1zcmNzZXQnKTtcbiAgLy8gc2V0IHNyYyAmIHNlcnNldFxuICB0aGlzLmltZy5zcmMgPSBzcmM7XG4gIGlmICggc3Jjc2V0ICkge1xuICAgIHRoaXMuaW1nLnNldEF0dHJpYnV0ZSggJ3NyY3NldCcsIHNyY3NldCApO1xuICB9XG4gIC8vIHJlbW92ZSBhdHRyXG4gIHRoaXMuaW1nLnJlbW92ZUF0dHJpYnV0ZSgnZGF0YS1mbGlja2l0eS1sYXp5bG9hZCcpO1xuICB0aGlzLmltZy5yZW1vdmVBdHRyaWJ1dGUoJ2RhdGEtZmxpY2tpdHktbGF6eWxvYWQtc3JjJyk7XG4gIHRoaXMuaW1nLnJlbW92ZUF0dHJpYnV0ZSgnZGF0YS1mbGlja2l0eS1sYXp5bG9hZC1zcmNzZXQnKTtcbn07XG5cbkxhenlMb2FkZXIucHJvdG90eXBlLm9ubG9hZCA9IGZ1bmN0aW9uKCBldmVudCApIHtcbiAgdGhpcy5jb21wbGV0ZSggZXZlbnQsICdmbGlja2l0eS1sYXp5bG9hZGVkJyApO1xufTtcblxuTGF6eUxvYWRlci5wcm90b3R5cGUub25lcnJvciA9IGZ1bmN0aW9uKCBldmVudCApIHtcbiAgdGhpcy5jb21wbGV0ZSggZXZlbnQsICdmbGlja2l0eS1sYXp5ZXJyb3InICk7XG59O1xuXG5MYXp5TG9hZGVyLnByb3RvdHlwZS5jb21wbGV0ZSA9IGZ1bmN0aW9uKCBldmVudCwgY2xhc3NOYW1lICkge1xuICAvLyB1bmJpbmQgZXZlbnRzXG4gIHRoaXMuaW1nLnJlbW92ZUV2ZW50TGlzdGVuZXIoICdsb2FkJywgdGhpcyApO1xuICB0aGlzLmltZy5yZW1vdmVFdmVudExpc3RlbmVyKCAnZXJyb3InLCB0aGlzICk7XG5cbiAgdmFyIGNlbGwgPSB0aGlzLmZsaWNraXR5LmdldFBhcmVudENlbGwoIHRoaXMuaW1nICk7XG4gIHZhciBjZWxsRWxlbSA9IGNlbGwgJiYgY2VsbC5lbGVtZW50O1xuICB0aGlzLmZsaWNraXR5LmNlbGxTaXplQ2hhbmdlKCBjZWxsRWxlbSApO1xuXG4gIHRoaXMuaW1nLmNsYXNzTGlzdC5hZGQoIGNsYXNzTmFtZSApO1xuICB0aGlzLmZsaWNraXR5LmRpc3BhdGNoRXZlbnQoICdsYXp5TG9hZCcsIGV2ZW50LCBjZWxsRWxlbSApO1xufTtcblxuLy8gLS0tLS0gIC0tLS0tIC8vXG5cbkZsaWNraXR5LkxhenlMb2FkZXIgPSBMYXp5TG9hZGVyO1xuXG5yZXR1cm4gRmxpY2tpdHk7XG5cbn0pKTtcbiIsIi8vIHBhZ2UgZG90c1xuKCBmdW5jdGlvbiggd2luZG93LCBmYWN0b3J5ICkge1xuICAvLyB1bml2ZXJzYWwgbW9kdWxlIGRlZmluaXRpb25cbiAgLyoganNoaW50IHN0cmljdDogZmFsc2UgKi9cbiAgaWYgKCB0eXBlb2YgZGVmaW5lID09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZCApIHtcbiAgICAvLyBBTURcbiAgICBkZWZpbmUoIFtcbiAgICAgICcuL2ZsaWNraXR5JyxcbiAgICAgICd1bmlwb2ludGVyL3VuaXBvaW50ZXInLFxuICAgICAgJ2Zpenp5LXVpLXV0aWxzL3V0aWxzJ1xuICAgIF0sIGZ1bmN0aW9uKCBGbGlja2l0eSwgVW5pcG9pbnRlciwgdXRpbHMgKSB7XG4gICAgICByZXR1cm4gZmFjdG9yeSggd2luZG93LCBGbGlja2l0eSwgVW5pcG9pbnRlciwgdXRpbHMgKTtcbiAgICB9KTtcbiAgfSBlbHNlIGlmICggdHlwZW9mIG1vZHVsZSA9PSAnb2JqZWN0JyAmJiBtb2R1bGUuZXhwb3J0cyApIHtcbiAgICAvLyBDb21tb25KU1xuICAgIG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeShcbiAgICAgIHdpbmRvdyxcbiAgICAgIHJlcXVpcmUoJy4vZmxpY2tpdHknKSxcbiAgICAgIHJlcXVpcmUoJ3VuaXBvaW50ZXInKSxcbiAgICAgIHJlcXVpcmUoJ2Zpenp5LXVpLXV0aWxzJylcbiAgICApO1xuICB9IGVsc2Uge1xuICAgIC8vIGJyb3dzZXIgZ2xvYmFsXG4gICAgZmFjdG9yeShcbiAgICAgIHdpbmRvdyxcbiAgICAgIHdpbmRvdy5GbGlja2l0eSxcbiAgICAgIHdpbmRvdy5Vbmlwb2ludGVyLFxuICAgICAgd2luZG93LmZpenp5VUlVdGlsc1xuICAgICk7XG4gIH1cblxufSggd2luZG93LCBmdW5jdGlvbiBmYWN0b3J5KCB3aW5kb3csIEZsaWNraXR5LCBVbmlwb2ludGVyLCB1dGlscyApIHtcblxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gUGFnZURvdHMgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gLy9cblxuJ3VzZSBzdHJpY3QnO1xuXG5mdW5jdGlvbiBQYWdlRG90cyggcGFyZW50ICkge1xuICB0aGlzLnBhcmVudCA9IHBhcmVudDtcbiAgdGhpcy5fY3JlYXRlKCk7XG59XG5cblBhZ2VEb3RzLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoIFVuaXBvaW50ZXIucHJvdG90eXBlICk7XG5cblBhZ2VEb3RzLnByb3RvdHlwZS5fY3JlYXRlID0gZnVuY3Rpb24oKSB7XG4gIC8vIGNyZWF0ZSBob2xkZXIgZWxlbWVudFxuICB0aGlzLmhvbGRlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ29sJyk7XG4gIHRoaXMuaG9sZGVyLmNsYXNzTmFtZSA9ICdmbGlja2l0eS1wYWdlLWRvdHMnO1xuICAvLyBjcmVhdGUgZG90cywgYXJyYXkgb2YgZWxlbWVudHNcbiAgdGhpcy5kb3RzID0gW107XG4gIC8vIGV2ZW50c1xuICB0aGlzLmhhbmRsZUNsaWNrID0gdGhpcy5vbkNsaWNrLmJpbmQoIHRoaXMgKTtcbiAgdGhpcy5vbiggJ3BvaW50ZXJEb3duJywgdGhpcy5wYXJlbnQuY2hpbGRVSVBvaW50ZXJEb3duLmJpbmQoIHRoaXMucGFyZW50ICkgKTtcbn07XG5cblBhZ2VEb3RzLnByb3RvdHlwZS5hY3RpdmF0ZSA9IGZ1bmN0aW9uKCkge1xuICB0aGlzLnNldERvdHMoKTtcbiAgdGhpcy5ob2xkZXIuYWRkRXZlbnRMaXN0ZW5lciggJ2NsaWNrJywgdGhpcy5oYW5kbGVDbGljayApO1xuICB0aGlzLmJpbmRTdGFydEV2ZW50KCB0aGlzLmhvbGRlciApO1xuICAvLyBhZGQgdG8gRE9NXG4gIHRoaXMucGFyZW50LmVsZW1lbnQuYXBwZW5kQ2hpbGQoIHRoaXMuaG9sZGVyICk7XG59O1xuXG5QYWdlRG90cy5wcm90b3R5cGUuZGVhY3RpdmF0ZSA9IGZ1bmN0aW9uKCkge1xuICB0aGlzLmhvbGRlci5yZW1vdmVFdmVudExpc3RlbmVyKCAnY2xpY2snLCB0aGlzLmhhbmRsZUNsaWNrICk7XG4gIHRoaXMudW5iaW5kU3RhcnRFdmVudCggdGhpcy5ob2xkZXIgKTtcbiAgLy8gcmVtb3ZlIGZyb20gRE9NXG4gIHRoaXMucGFyZW50LmVsZW1lbnQucmVtb3ZlQ2hpbGQoIHRoaXMuaG9sZGVyICk7XG59O1xuXG5QYWdlRG90cy5wcm90b3R5cGUuc2V0RG90cyA9IGZ1bmN0aW9uKCkge1xuICAvLyBnZXQgZGlmZmVyZW5jZSBiZXR3ZWVuIG51bWJlciBvZiBzbGlkZXMgYW5kIG51bWJlciBvZiBkb3RzXG4gIHZhciBkZWx0YSA9IHRoaXMucGFyZW50LnNsaWRlcy5sZW5ndGggLSB0aGlzLmRvdHMubGVuZ3RoO1xuICBpZiAoIGRlbHRhID4gMCApIHtcbiAgICB0aGlzLmFkZERvdHMoIGRlbHRhICk7XG4gIH0gZWxzZSBpZiAoIGRlbHRhIDwgMCApIHtcbiAgICB0aGlzLnJlbW92ZURvdHMoIC1kZWx0YSApO1xuICB9XG59O1xuXG5QYWdlRG90cy5wcm90b3R5cGUuYWRkRG90cyA9IGZ1bmN0aW9uKCBjb3VudCApIHtcbiAgdmFyIGZyYWdtZW50ID0gZG9jdW1lbnQuY3JlYXRlRG9jdW1lbnRGcmFnbWVudCgpO1xuICB2YXIgbmV3RG90cyA9IFtdO1xuICB2YXIgbGVuZ3RoID0gdGhpcy5kb3RzLmxlbmd0aDtcbiAgdmFyIG1heCA9IGxlbmd0aCArIGNvdW50O1xuXG4gIGZvciAoIHZhciBpID0gbGVuZ3RoOyBpIDwgbWF4OyBpKysgKSB7XG4gICAgdmFyIGRvdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xpJyk7XG4gICAgZG90LmNsYXNzTmFtZSA9ICdkb3QnO1xuICAgIGRvdC5zZXRBdHRyaWJ1dGUoICdhcmlhLWxhYmVsJywgJ1BhZ2UgZG90ICcgKyAoIGkgKyAxICkgKTtcbiAgICBmcmFnbWVudC5hcHBlbmRDaGlsZCggZG90ICk7XG4gICAgbmV3RG90cy5wdXNoKCBkb3QgKTtcbiAgfVxuXG4gIHRoaXMuaG9sZGVyLmFwcGVuZENoaWxkKCBmcmFnbWVudCApO1xuICB0aGlzLmRvdHMgPSB0aGlzLmRvdHMuY29uY2F0KCBuZXdEb3RzICk7XG59O1xuXG5QYWdlRG90cy5wcm90b3R5cGUucmVtb3ZlRG90cyA9IGZ1bmN0aW9uKCBjb3VudCApIHtcbiAgLy8gcmVtb3ZlIGZyb20gdGhpcy5kb3RzIGNvbGxlY3Rpb25cbiAgdmFyIHJlbW92ZURvdHMgPSB0aGlzLmRvdHMuc3BsaWNlKCB0aGlzLmRvdHMubGVuZ3RoIC0gY291bnQsIGNvdW50ICk7XG4gIC8vIHJlbW92ZSBmcm9tIERPTVxuICByZW1vdmVEb3RzLmZvckVhY2goIGZ1bmN0aW9uKCBkb3QgKSB7XG4gICAgdGhpcy5ob2xkZXIucmVtb3ZlQ2hpbGQoIGRvdCApO1xuICB9LCB0aGlzICk7XG59O1xuXG5QYWdlRG90cy5wcm90b3R5cGUudXBkYXRlU2VsZWN0ZWQgPSBmdW5jdGlvbigpIHtcbiAgLy8gcmVtb3ZlIHNlbGVjdGVkIGNsYXNzIG9uIHByZXZpb3VzXG4gIGlmICggdGhpcy5zZWxlY3RlZERvdCApIHtcbiAgICB0aGlzLnNlbGVjdGVkRG90LmNsYXNzTmFtZSA9ICdkb3QnO1xuICAgIHRoaXMuc2VsZWN0ZWREb3QucmVtb3ZlQXR0cmlidXRlKCdhcmlhLWN1cnJlbnQnKTtcbiAgfVxuICAvLyBkb24ndCBwcm9jZWVkIGlmIG5vIGRvdHNcbiAgaWYgKCAhdGhpcy5kb3RzLmxlbmd0aCApIHtcbiAgICByZXR1cm47XG4gIH1cbiAgdGhpcy5zZWxlY3RlZERvdCA9IHRoaXMuZG90c1sgdGhpcy5wYXJlbnQuc2VsZWN0ZWRJbmRleCBdO1xuICB0aGlzLnNlbGVjdGVkRG90LmNsYXNzTmFtZSA9ICdkb3QgaXMtc2VsZWN0ZWQnO1xuICB0aGlzLnNlbGVjdGVkRG90LnNldEF0dHJpYnV0ZSggJ2FyaWEtY3VycmVudCcsICdzdGVwJyApO1xufTtcblxuUGFnZURvdHMucHJvdG90eXBlLm9uVGFwID0gLy8gb2xkIG1ldGhvZCBuYW1lLCBiYWNrd2FyZHMtY29tcGF0aWJsZVxuUGFnZURvdHMucHJvdG90eXBlLm9uQ2xpY2sgPSBmdW5jdGlvbiggZXZlbnQgKSB7XG4gIHZhciB0YXJnZXQgPSBldmVudC50YXJnZXQ7XG4gIC8vIG9ubHkgY2FyZSBhYm91dCBkb3QgY2xpY2tzXG4gIGlmICggdGFyZ2V0Lm5vZGVOYW1lICE9ICdMSScgKSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgdGhpcy5wYXJlbnQudWlDaGFuZ2UoKTtcbiAgdmFyIGluZGV4ID0gdGhpcy5kb3RzLmluZGV4T2YoIHRhcmdldCApO1xuICB0aGlzLnBhcmVudC5zZWxlY3QoIGluZGV4ICk7XG59O1xuXG5QYWdlRG90cy5wcm90b3R5cGUuZGVzdHJveSA9IGZ1bmN0aW9uKCkge1xuICB0aGlzLmRlYWN0aXZhdGUoKTtcbiAgdGhpcy5hbGxPZmYoKTtcbn07XG5cbkZsaWNraXR5LlBhZ2VEb3RzID0gUGFnZURvdHM7XG5cbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tIEZsaWNraXR5IC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tIC8vXG5cbnV0aWxzLmV4dGVuZCggRmxpY2tpdHkuZGVmYXVsdHMsIHtcbiAgcGFnZURvdHM6IHRydWVcbn0pO1xuXG5GbGlja2l0eS5jcmVhdGVNZXRob2RzLnB1c2goJ19jcmVhdGVQYWdlRG90cycpO1xuXG52YXIgcHJvdG8gPSBGbGlja2l0eS5wcm90b3R5cGU7XG5cbnByb3RvLl9jcmVhdGVQYWdlRG90cyA9IGZ1bmN0aW9uKCkge1xuICBpZiAoICF0aGlzLm9wdGlvbnMucGFnZURvdHMgKSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIHRoaXMucGFnZURvdHMgPSBuZXcgUGFnZURvdHMoIHRoaXMgKTtcbiAgLy8gZXZlbnRzXG4gIHRoaXMub24oICdhY3RpdmF0ZScsIHRoaXMuYWN0aXZhdGVQYWdlRG90cyApO1xuICB0aGlzLm9uKCAnc2VsZWN0JywgdGhpcy51cGRhdGVTZWxlY3RlZFBhZ2VEb3RzICk7XG4gIHRoaXMub24oICdjZWxsQ2hhbmdlJywgdGhpcy51cGRhdGVQYWdlRG90cyApO1xuICB0aGlzLm9uKCAncmVzaXplJywgdGhpcy51cGRhdGVQYWdlRG90cyApO1xuICB0aGlzLm9uKCAnZGVhY3RpdmF0ZScsIHRoaXMuZGVhY3RpdmF0ZVBhZ2VEb3RzICk7XG59O1xuXG5wcm90by5hY3RpdmF0ZVBhZ2VEb3RzID0gZnVuY3Rpb24oKSB7XG4gIHRoaXMucGFnZURvdHMuYWN0aXZhdGUoKTtcbn07XG5cbnByb3RvLnVwZGF0ZVNlbGVjdGVkUGFnZURvdHMgPSBmdW5jdGlvbigpIHtcbiAgdGhpcy5wYWdlRG90cy51cGRhdGVTZWxlY3RlZCgpO1xufTtcblxucHJvdG8udXBkYXRlUGFnZURvdHMgPSBmdW5jdGlvbigpIHtcbiAgdGhpcy5wYWdlRG90cy5zZXREb3RzKCk7XG59O1xuXG5wcm90by5kZWFjdGl2YXRlUGFnZURvdHMgPSBmdW5jdGlvbigpIHtcbiAgdGhpcy5wYWdlRG90cy5kZWFjdGl2YXRlKCk7XG59O1xuXG4vLyAtLS0tLSAgLS0tLS0gLy9cblxuRmxpY2tpdHkuUGFnZURvdHMgPSBQYWdlRG90cztcblxucmV0dXJuIEZsaWNraXR5O1xuXG59KSk7XG4iLCIvLyBwbGF5ZXIgJiBhdXRvUGxheVxuKCBmdW5jdGlvbiggd2luZG93LCBmYWN0b3J5ICkge1xuICAvLyB1bml2ZXJzYWwgbW9kdWxlIGRlZmluaXRpb25cbiAgLyoganNoaW50IHN0cmljdDogZmFsc2UgKi9cbiAgaWYgKCB0eXBlb2YgZGVmaW5lID09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZCApIHtcbiAgICAvLyBBTURcbiAgICBkZWZpbmUoIFtcbiAgICAgICdldi1lbWl0dGVyL2V2LWVtaXR0ZXInLFxuICAgICAgJ2Zpenp5LXVpLXV0aWxzL3V0aWxzJyxcbiAgICAgICcuL2ZsaWNraXR5J1xuICAgIF0sIGZ1bmN0aW9uKCBFdkVtaXR0ZXIsIHV0aWxzLCBGbGlja2l0eSApIHtcbiAgICAgIHJldHVybiBmYWN0b3J5KCBFdkVtaXR0ZXIsIHV0aWxzLCBGbGlja2l0eSApO1xuICAgIH0pO1xuICB9IGVsc2UgaWYgKCB0eXBlb2YgbW9kdWxlID09ICdvYmplY3QnICYmIG1vZHVsZS5leHBvcnRzICkge1xuICAgIC8vIENvbW1vbkpTXG4gICAgbW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KFxuICAgICAgcmVxdWlyZSgnZXYtZW1pdHRlcicpLFxuICAgICAgcmVxdWlyZSgnZml6enktdWktdXRpbHMnKSxcbiAgICAgIHJlcXVpcmUoJy4vZmxpY2tpdHknKVxuICAgICk7XG4gIH0gZWxzZSB7XG4gICAgLy8gYnJvd3NlciBnbG9iYWxcbiAgICBmYWN0b3J5KFxuICAgICAgd2luZG93LkV2RW1pdHRlcixcbiAgICAgIHdpbmRvdy5maXp6eVVJVXRpbHMsXG4gICAgICB3aW5kb3cuRmxpY2tpdHlcbiAgICApO1xuICB9XG5cbn0oIHdpbmRvdywgZnVuY3Rpb24gZmFjdG9yeSggRXZFbWl0dGVyLCB1dGlscywgRmxpY2tpdHkgKSB7XG5cbid1c2Ugc3RyaWN0JztcblxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gUGxheWVyIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tIC8vXG5cbmZ1bmN0aW9uIFBsYXllciggcGFyZW50ICkge1xuICB0aGlzLnBhcmVudCA9IHBhcmVudDtcbiAgdGhpcy5zdGF0ZSA9ICdzdG9wcGVkJztcbiAgLy8gdmlzaWJpbGl0eSBjaGFuZ2UgZXZlbnQgaGFuZGxlclxuICB0aGlzLm9uVmlzaWJpbGl0eUNoYW5nZSA9IHRoaXMudmlzaWJpbGl0eUNoYW5nZS5iaW5kKCB0aGlzICk7XG4gIHRoaXMub25WaXNpYmlsaXR5UGxheSA9IHRoaXMudmlzaWJpbGl0eVBsYXkuYmluZCggdGhpcyApO1xufVxuXG5QbGF5ZXIucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZSggRXZFbWl0dGVyLnByb3RvdHlwZSApO1xuXG4vLyBzdGFydCBwbGF5XG5QbGF5ZXIucHJvdG90eXBlLnBsYXkgPSBmdW5jdGlvbigpIHtcbiAgaWYgKCB0aGlzLnN0YXRlID09ICdwbGF5aW5nJyApIHtcbiAgICByZXR1cm47XG4gIH1cbiAgLy8gZG8gbm90IHBsYXkgaWYgcGFnZSBpcyBoaWRkZW4sIHN0YXJ0IHBsYXlpbmcgd2hlbiBwYWdlIGlzIHZpc2libGVcbiAgdmFyIGlzUGFnZUhpZGRlbiA9IGRvY3VtZW50LmhpZGRlbjtcbiAgaWYgKCBpc1BhZ2VIaWRkZW4gKSB7XG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lciggJ3Zpc2liaWxpdHljaGFuZ2UnLCB0aGlzLm9uVmlzaWJpbGl0eVBsYXkgKTtcbiAgICByZXR1cm47XG4gIH1cblxuICB0aGlzLnN0YXRlID0gJ3BsYXlpbmcnO1xuICAvLyBsaXN0ZW4gdG8gdmlzaWJpbGl0eSBjaGFuZ2VcbiAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lciggJ3Zpc2liaWxpdHljaGFuZ2UnLCB0aGlzLm9uVmlzaWJpbGl0eUNoYW5nZSApO1xuICAvLyBzdGFydCB0aWNraW5nXG4gIHRoaXMudGljaygpO1xufTtcblxuUGxheWVyLnByb3RvdHlwZS50aWNrID0gZnVuY3Rpb24oKSB7XG4gIC8vIGRvIG5vdCB0aWNrIGlmIG5vdCBwbGF5aW5nXG4gIGlmICggdGhpcy5zdGF0ZSAhPSAncGxheWluZycgKSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgdmFyIHRpbWUgPSB0aGlzLnBhcmVudC5vcHRpb25zLmF1dG9QbGF5O1xuICAvLyBkZWZhdWx0IHRvIDMgc2Vjb25kc1xuICB0aW1lID0gdHlwZW9mIHRpbWUgPT0gJ251bWJlcicgPyB0aW1lIDogMzAwMDtcbiAgdmFyIF90aGlzID0gdGhpcztcbiAgLy8gSEFDSzogcmVzZXQgdGlja3MgaWYgc3RvcHBlZCBhbmQgc3RhcnRlZCB3aXRoaW4gaW50ZXJ2YWxcbiAgdGhpcy5jbGVhcigpO1xuICB0aGlzLnRpbWVvdXQgPSBzZXRUaW1lb3V0KCBmdW5jdGlvbigpIHtcbiAgICBfdGhpcy5wYXJlbnQubmV4dCggdHJ1ZSApO1xuICAgIF90aGlzLnRpY2soKTtcbiAgfSwgdGltZSApO1xufTtcblxuUGxheWVyLnByb3RvdHlwZS5zdG9wID0gZnVuY3Rpb24oKSB7XG4gIHRoaXMuc3RhdGUgPSAnc3RvcHBlZCc7XG4gIHRoaXMuY2xlYXIoKTtcbiAgLy8gcmVtb3ZlIHZpc2liaWxpdHkgY2hhbmdlIGV2ZW50XG4gIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoICd2aXNpYmlsaXR5Y2hhbmdlJywgdGhpcy5vblZpc2liaWxpdHlDaGFuZ2UgKTtcbn07XG5cblBsYXllci5wcm90b3R5cGUuY2xlYXIgPSBmdW5jdGlvbigpIHtcbiAgY2xlYXJUaW1lb3V0KCB0aGlzLnRpbWVvdXQgKTtcbn07XG5cblBsYXllci5wcm90b3R5cGUucGF1c2UgPSBmdW5jdGlvbigpIHtcbiAgaWYgKCB0aGlzLnN0YXRlID09ICdwbGF5aW5nJyApIHtcbiAgICB0aGlzLnN0YXRlID0gJ3BhdXNlZCc7XG4gICAgdGhpcy5jbGVhcigpO1xuICB9XG59O1xuXG5QbGF5ZXIucHJvdG90eXBlLnVucGF1c2UgPSBmdW5jdGlvbigpIHtcbiAgLy8gcmUtc3RhcnQgcGxheSBpZiBwYXVzZWRcbiAgaWYgKCB0aGlzLnN0YXRlID09ICdwYXVzZWQnICkge1xuICAgIHRoaXMucGxheSgpO1xuICB9XG59O1xuXG4vLyBwYXVzZSBpZiBwYWdlIHZpc2liaWxpdHkgaXMgaGlkZGVuLCB1bnBhdXNlIGlmIHZpc2libGVcblBsYXllci5wcm90b3R5cGUudmlzaWJpbGl0eUNoYW5nZSA9IGZ1bmN0aW9uKCkge1xuICB2YXIgaXNQYWdlSGlkZGVuID0gZG9jdW1lbnQuaGlkZGVuO1xuICB0aGlzWyBpc1BhZ2VIaWRkZW4gPyAncGF1c2UnIDogJ3VucGF1c2UnIF0oKTtcbn07XG5cblBsYXllci5wcm90b3R5cGUudmlzaWJpbGl0eVBsYXkgPSBmdW5jdGlvbigpIHtcbiAgdGhpcy5wbGF5KCk7XG4gIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoICd2aXNpYmlsaXR5Y2hhbmdlJywgdGhpcy5vblZpc2liaWxpdHlQbGF5ICk7XG59O1xuXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSBGbGlja2l0eSAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAvL1xuXG51dGlscy5leHRlbmQoIEZsaWNraXR5LmRlZmF1bHRzLCB7XG4gIHBhdXNlQXV0b1BsYXlPbkhvdmVyOiB0cnVlXG59KTtcblxuRmxpY2tpdHkuY3JlYXRlTWV0aG9kcy5wdXNoKCdfY3JlYXRlUGxheWVyJyk7XG52YXIgcHJvdG8gPSBGbGlja2l0eS5wcm90b3R5cGU7XG5cbnByb3RvLl9jcmVhdGVQbGF5ZXIgPSBmdW5jdGlvbigpIHtcbiAgdGhpcy5wbGF5ZXIgPSBuZXcgUGxheWVyKCB0aGlzICk7XG5cbiAgdGhpcy5vbiggJ2FjdGl2YXRlJywgdGhpcy5hY3RpdmF0ZVBsYXllciApO1xuICB0aGlzLm9uKCAndWlDaGFuZ2UnLCB0aGlzLnN0b3BQbGF5ZXIgKTtcbiAgdGhpcy5vbiggJ3BvaW50ZXJEb3duJywgdGhpcy5zdG9wUGxheWVyICk7XG4gIHRoaXMub24oICdkZWFjdGl2YXRlJywgdGhpcy5kZWFjdGl2YXRlUGxheWVyICk7XG59O1xuXG5wcm90by5hY3RpdmF0ZVBsYXllciA9IGZ1bmN0aW9uKCkge1xuICBpZiAoICF0aGlzLm9wdGlvbnMuYXV0b1BsYXkgKSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIHRoaXMucGxheWVyLnBsYXkoKTtcbiAgdGhpcy5lbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoICdtb3VzZWVudGVyJywgdGhpcyApO1xufTtcblxuLy8gUGxheWVyIEFQSSwgZG9uJ3QgaGF0ZSB0aGUgLi4uIHRoYW5rcyBJIGtub3cgd2hlcmUgdGhlIGRvb3IgaXNcblxucHJvdG8ucGxheVBsYXllciA9IGZ1bmN0aW9uKCkge1xuICB0aGlzLnBsYXllci5wbGF5KCk7XG59O1xuXG5wcm90by5zdG9wUGxheWVyID0gZnVuY3Rpb24oKSB7XG4gIHRoaXMucGxheWVyLnN0b3AoKTtcbn07XG5cbnByb3RvLnBhdXNlUGxheWVyID0gZnVuY3Rpb24oKSB7XG4gIHRoaXMucGxheWVyLnBhdXNlKCk7XG59O1xuXG5wcm90by51bnBhdXNlUGxheWVyID0gZnVuY3Rpb24oKSB7XG4gIHRoaXMucGxheWVyLnVucGF1c2UoKTtcbn07XG5cbnByb3RvLmRlYWN0aXZhdGVQbGF5ZXIgPSBmdW5jdGlvbigpIHtcbiAgdGhpcy5wbGF5ZXIuc3RvcCgpO1xuICB0aGlzLmVsZW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lciggJ21vdXNlZW50ZXInLCB0aGlzICk7XG59O1xuXG4vLyAtLS0tLSBtb3VzZWVudGVyL2xlYXZlIC0tLS0tIC8vXG5cbi8vIHBhdXNlIGF1dG8tcGxheSBvbiBob3ZlclxucHJvdG8ub25tb3VzZWVudGVyID0gZnVuY3Rpb24oKSB7XG4gIGlmICggIXRoaXMub3B0aW9ucy5wYXVzZUF1dG9QbGF5T25Ib3ZlciApIHtcbiAgICByZXR1cm47XG4gIH1cbiAgdGhpcy5wbGF5ZXIucGF1c2UoKTtcbiAgdGhpcy5lbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoICdtb3VzZWxlYXZlJywgdGhpcyApO1xufTtcblxuLy8gcmVzdW1lIGF1dG8tcGxheSBvbiBob3ZlciBvZmZcbnByb3RvLm9ubW91c2VsZWF2ZSA9IGZ1bmN0aW9uKCkge1xuICB0aGlzLnBsYXllci51bnBhdXNlKCk7XG4gIHRoaXMuZWxlbWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCAnbW91c2VsZWF2ZScsIHRoaXMgKTtcbn07XG5cbi8vIC0tLS0tICAtLS0tLSAvL1xuXG5GbGlja2l0eS5QbGF5ZXIgPSBQbGF5ZXI7XG5cbnJldHVybiBGbGlja2l0eTtcblxufSkpO1xuIiwiLy8gcHJldi9uZXh0IGJ1dHRvbnNcbiggZnVuY3Rpb24oIHdpbmRvdywgZmFjdG9yeSApIHtcbiAgLy8gdW5pdmVyc2FsIG1vZHVsZSBkZWZpbml0aW9uXG4gIC8qIGpzaGludCBzdHJpY3Q6IGZhbHNlICovXG4gIGlmICggdHlwZW9mIGRlZmluZSA9PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQgKSB7XG4gICAgLy8gQU1EXG4gICAgZGVmaW5lKCBbXG4gICAgICAnLi9mbGlja2l0eScsXG4gICAgICAndW5pcG9pbnRlci91bmlwb2ludGVyJyxcbiAgICAgICdmaXp6eS11aS11dGlscy91dGlscydcbiAgICBdLCBmdW5jdGlvbiggRmxpY2tpdHksIFVuaXBvaW50ZXIsIHV0aWxzICkge1xuICAgICAgcmV0dXJuIGZhY3RvcnkoIHdpbmRvdywgRmxpY2tpdHksIFVuaXBvaW50ZXIsIHV0aWxzICk7XG4gICAgfSk7XG4gIH0gZWxzZSBpZiAoIHR5cGVvZiBtb2R1bGUgPT0gJ29iamVjdCcgJiYgbW9kdWxlLmV4cG9ydHMgKSB7XG4gICAgLy8gQ29tbW9uSlNcbiAgICBtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkoXG4gICAgICB3aW5kb3csXG4gICAgICByZXF1aXJlKCcuL2ZsaWNraXR5JyksXG4gICAgICByZXF1aXJlKCd1bmlwb2ludGVyJyksXG4gICAgICByZXF1aXJlKCdmaXp6eS11aS11dGlscycpXG4gICAgKTtcbiAgfSBlbHNlIHtcbiAgICAvLyBicm93c2VyIGdsb2JhbFxuICAgIGZhY3RvcnkoXG4gICAgICB3aW5kb3csXG4gICAgICB3aW5kb3cuRmxpY2tpdHksXG4gICAgICB3aW5kb3cuVW5pcG9pbnRlcixcbiAgICAgIHdpbmRvdy5maXp6eVVJVXRpbHNcbiAgICApO1xuICB9XG5cbn0oIHdpbmRvdywgZnVuY3Rpb24gZmFjdG9yeSggd2luZG93LCBGbGlja2l0eSwgVW5pcG9pbnRlciwgdXRpbHMgKSB7XG4ndXNlIHN0cmljdCc7XG5cbnZhciBzdmdVUkkgPSAnaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnO1xuXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSBQcmV2TmV4dEJ1dHRvbiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAvL1xuXG5mdW5jdGlvbiBQcmV2TmV4dEJ1dHRvbiggZGlyZWN0aW9uLCBwYXJlbnQgKSB7XG4gIHRoaXMuZGlyZWN0aW9uID0gZGlyZWN0aW9uO1xuICB0aGlzLnBhcmVudCA9IHBhcmVudDtcbiAgdGhpcy5fY3JlYXRlKCk7XG59XG5cblByZXZOZXh0QnV0dG9uLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoIFVuaXBvaW50ZXIucHJvdG90eXBlICk7XG5cblByZXZOZXh0QnV0dG9uLnByb3RvdHlwZS5fY3JlYXRlID0gZnVuY3Rpb24oKSB7XG4gIC8vIHByb3BlcnRpZXNcbiAgdGhpcy5pc0VuYWJsZWQgPSB0cnVlO1xuICB0aGlzLmlzUHJldmlvdXMgPSB0aGlzLmRpcmVjdGlvbiA9PSAtMTtcbiAgdmFyIGxlZnREaXJlY3Rpb24gPSB0aGlzLnBhcmVudC5vcHRpb25zLnJpZ2h0VG9MZWZ0ID8gMSA6IC0xO1xuICB0aGlzLmlzTGVmdCA9IHRoaXMuZGlyZWN0aW9uID09IGxlZnREaXJlY3Rpb247XG5cbiAgdmFyIGVsZW1lbnQgPSB0aGlzLmVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcbiAgZWxlbWVudC5jbGFzc05hbWUgPSAnZmxpY2tpdHktYnV0dG9uIGZsaWNraXR5LXByZXYtbmV4dC1idXR0b24nO1xuICBlbGVtZW50LmNsYXNzTmFtZSArPSB0aGlzLmlzUHJldmlvdXMgPyAnIHByZXZpb3VzJyA6ICcgbmV4dCc7XG4gIC8vIHByZXZlbnQgYnV0dG9uIGZyb20gc3VibWl0dGluZyBmb3JtIGh0dHA6Ly9zdGFja292ZXJmbG93LmNvbS9hLzEwODM2MDc2LzE4MjE4M1xuICBlbGVtZW50LnNldEF0dHJpYnV0ZSggJ3R5cGUnLCAnYnV0dG9uJyApO1xuICAvLyBpbml0IGFzIGRpc2FibGVkXG4gIHRoaXMuZGlzYWJsZSgpO1xuXG4gIGVsZW1lbnQuc2V0QXR0cmlidXRlKCAnYXJpYS1sYWJlbCcsIHRoaXMuaXNQcmV2aW91cyA/ICdQcmV2aW91cycgOiAnTmV4dCcgKTtcblxuICAvLyBjcmVhdGUgYXJyb3dcbiAgdmFyIHN2ZyA9IHRoaXMuY3JlYXRlU1ZHKCk7XG4gIGVsZW1lbnQuYXBwZW5kQ2hpbGQoIHN2ZyApO1xuICAvLyBldmVudHNcbiAgdGhpcy5wYXJlbnQub24oICdzZWxlY3QnLCB0aGlzLnVwZGF0ZS5iaW5kKCB0aGlzICkgKTtcbiAgdGhpcy5vbiggJ3BvaW50ZXJEb3duJywgdGhpcy5wYXJlbnQuY2hpbGRVSVBvaW50ZXJEb3duLmJpbmQoIHRoaXMucGFyZW50ICkgKTtcbn07XG5cblByZXZOZXh0QnV0dG9uLnByb3RvdHlwZS5hY3RpdmF0ZSA9IGZ1bmN0aW9uKCkge1xuICB0aGlzLmJpbmRTdGFydEV2ZW50KCB0aGlzLmVsZW1lbnQgKTtcbiAgdGhpcy5lbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoICdjbGljaycsIHRoaXMgKTtcbiAgLy8gYWRkIHRvIERPTVxuICB0aGlzLnBhcmVudC5lbGVtZW50LmFwcGVuZENoaWxkKCB0aGlzLmVsZW1lbnQgKTtcbn07XG5cblByZXZOZXh0QnV0dG9uLnByb3RvdHlwZS5kZWFjdGl2YXRlID0gZnVuY3Rpb24oKSB7XG4gIC8vIHJlbW92ZSBmcm9tIERPTVxuICB0aGlzLnBhcmVudC5lbGVtZW50LnJlbW92ZUNoaWxkKCB0aGlzLmVsZW1lbnQgKTtcbiAgLy8gY2xpY2sgZXZlbnRzXG4gIHRoaXMudW5iaW5kU3RhcnRFdmVudCggdGhpcy5lbGVtZW50ICk7XG4gIHRoaXMuZWxlbWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCAnY2xpY2snLCB0aGlzICk7XG59O1xuXG5QcmV2TmV4dEJ1dHRvbi5wcm90b3R5cGUuY3JlYXRlU1ZHID0gZnVuY3Rpb24oKSB7XG4gIHZhciBzdmcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50TlMoIHN2Z1VSSSwgJ3N2ZycpO1xuICBzdmcuc2V0QXR0cmlidXRlKCAnY2xhc3MnLCAnZmxpY2tpdHktYnV0dG9uLWljb24nICk7XG4gIHN2Zy5zZXRBdHRyaWJ1dGUoICd2aWV3Qm94JywgJzAgMCAxMDAgMTAwJyApO1xuICB2YXIgcGF0aCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnROUyggc3ZnVVJJLCAncGF0aCcpO1xuICB2YXIgcGF0aE1vdmVtZW50cyA9IGdldEFycm93TW92ZW1lbnRzKCB0aGlzLnBhcmVudC5vcHRpb25zLmFycm93U2hhcGUgKTtcbiAgcGF0aC5zZXRBdHRyaWJ1dGUoICdkJywgcGF0aE1vdmVtZW50cyApO1xuICBwYXRoLnNldEF0dHJpYnV0ZSggJ2NsYXNzJywgJ2Fycm93JyApO1xuICAvLyByb3RhdGUgYXJyb3dcbiAgaWYgKCAhdGhpcy5pc0xlZnQgKSB7XG4gICAgcGF0aC5zZXRBdHRyaWJ1dGUoICd0cmFuc2Zvcm0nLCAndHJhbnNsYXRlKDEwMCwgMTAwKSByb3RhdGUoMTgwKSAnICk7XG4gIH1cbiAgc3ZnLmFwcGVuZENoaWxkKCBwYXRoICk7XG4gIHJldHVybiBzdmc7XG59O1xuXG4vLyBnZXQgU1ZHIHBhdGggbW92bWVtZW50XG5mdW5jdGlvbiBnZXRBcnJvd01vdmVtZW50cyggc2hhcGUgKSB7XG4gIC8vIHVzZSBzaGFwZSBhcyBtb3ZlbWVudCBpZiBzdHJpbmdcbiAgaWYgKCB0eXBlb2Ygc2hhcGUgPT0gJ3N0cmluZycgKSB7XG4gICAgcmV0dXJuIHNoYXBlO1xuICB9XG4gIC8vIGNyZWF0ZSBtb3ZlbWVudCBzdHJpbmdcbiAgcmV0dXJuICdNICcgKyBzaGFwZS54MCArICcsNTAnICtcbiAgICAnIEwgJyArIHNoYXBlLngxICsgJywnICsgKCBzaGFwZS55MSArIDUwICkgK1xuICAgICcgTCAnICsgc2hhcGUueDIgKyAnLCcgKyAoIHNoYXBlLnkyICsgNTAgKSArXG4gICAgJyBMICcgKyBzaGFwZS54MyArICcsNTAgJyArXG4gICAgJyBMICcgKyBzaGFwZS54MiArICcsJyArICggNTAgLSBzaGFwZS55MiApICtcbiAgICAnIEwgJyArIHNoYXBlLngxICsgJywnICsgKCA1MCAtIHNoYXBlLnkxICkgK1xuICAgICcgWic7XG59XG5cblByZXZOZXh0QnV0dG9uLnByb3RvdHlwZS5oYW5kbGVFdmVudCA9IHV0aWxzLmhhbmRsZUV2ZW50O1xuXG5QcmV2TmV4dEJ1dHRvbi5wcm90b3R5cGUub25jbGljayA9IGZ1bmN0aW9uKCkge1xuICBpZiAoICF0aGlzLmlzRW5hYmxlZCApIHtcbiAgICByZXR1cm47XG4gIH1cbiAgdGhpcy5wYXJlbnQudWlDaGFuZ2UoKTtcbiAgdmFyIG1ldGhvZCA9IHRoaXMuaXNQcmV2aW91cyA/ICdwcmV2aW91cycgOiAnbmV4dCc7XG4gIHRoaXMucGFyZW50WyBtZXRob2QgXSgpO1xufTtcblxuLy8gLS0tLS0gIC0tLS0tIC8vXG5cblByZXZOZXh0QnV0dG9uLnByb3RvdHlwZS5lbmFibGUgPSBmdW5jdGlvbigpIHtcbiAgaWYgKCB0aGlzLmlzRW5hYmxlZCApIHtcbiAgICByZXR1cm47XG4gIH1cbiAgdGhpcy5lbGVtZW50LmRpc2FibGVkID0gZmFsc2U7XG4gIHRoaXMuaXNFbmFibGVkID0gdHJ1ZTtcbn07XG5cblByZXZOZXh0QnV0dG9uLnByb3RvdHlwZS5kaXNhYmxlID0gZnVuY3Rpb24oKSB7XG4gIGlmICggIXRoaXMuaXNFbmFibGVkICkge1xuICAgIHJldHVybjtcbiAgfVxuICB0aGlzLmVsZW1lbnQuZGlzYWJsZWQgPSB0cnVlO1xuICB0aGlzLmlzRW5hYmxlZCA9IGZhbHNlO1xufTtcblxuUHJldk5leHRCdXR0b24ucHJvdG90eXBlLnVwZGF0ZSA9IGZ1bmN0aW9uKCkge1xuICAvLyBpbmRleCBvZiBmaXJzdCBvciBsYXN0IHNsaWRlLCBpZiBwcmV2aW91cyBvciBuZXh0XG4gIHZhciBzbGlkZXMgPSB0aGlzLnBhcmVudC5zbGlkZXM7XG4gIC8vIGVuYWJsZSBpcyB3cmFwQXJvdW5kIGFuZCBhdCBsZWFzdCAyIHNsaWRlc1xuICBpZiAoIHRoaXMucGFyZW50Lm9wdGlvbnMud3JhcEFyb3VuZCAmJiBzbGlkZXMubGVuZ3RoID4gMSApIHtcbiAgICB0aGlzLmVuYWJsZSgpO1xuICAgIHJldHVybjtcbiAgfVxuICB2YXIgbGFzdEluZGV4ID0gc2xpZGVzLmxlbmd0aCA/IHNsaWRlcy5sZW5ndGggLSAxIDogMDtcbiAgdmFyIGJvdW5kSW5kZXggPSB0aGlzLmlzUHJldmlvdXMgPyAwIDogbGFzdEluZGV4O1xuICB2YXIgbWV0aG9kID0gdGhpcy5wYXJlbnQuc2VsZWN0ZWRJbmRleCA9PSBib3VuZEluZGV4ID8gJ2Rpc2FibGUnIDogJ2VuYWJsZSc7XG4gIHRoaXNbIG1ldGhvZCBdKCk7XG59O1xuXG5QcmV2TmV4dEJ1dHRvbi5wcm90b3R5cGUuZGVzdHJveSA9IGZ1bmN0aW9uKCkge1xuICB0aGlzLmRlYWN0aXZhdGUoKTtcbiAgdGhpcy5hbGxPZmYoKTtcbn07XG5cbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tIEZsaWNraXR5IHByb3RvdHlwZSAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAvL1xuXG51dGlscy5leHRlbmQoIEZsaWNraXR5LmRlZmF1bHRzLCB7XG4gIHByZXZOZXh0QnV0dG9uczogdHJ1ZSxcbiAgYXJyb3dTaGFwZToge1xuICAgIHgwOiAxMCxcbiAgICB4MTogNjAsIHkxOiA1MCxcbiAgICB4MjogNzAsIHkyOiA0MCxcbiAgICB4MzogMzBcbiAgfVxufSk7XG5cbkZsaWNraXR5LmNyZWF0ZU1ldGhvZHMucHVzaCgnX2NyZWF0ZVByZXZOZXh0QnV0dG9ucycpO1xudmFyIHByb3RvID0gRmxpY2tpdHkucHJvdG90eXBlO1xuXG5wcm90by5fY3JlYXRlUHJldk5leHRCdXR0b25zID0gZnVuY3Rpb24oKSB7XG4gIGlmICggIXRoaXMub3B0aW9ucy5wcmV2TmV4dEJ1dHRvbnMgKSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgdGhpcy5wcmV2QnV0dG9uID0gbmV3IFByZXZOZXh0QnV0dG9uKCAtMSwgdGhpcyApO1xuICB0aGlzLm5leHRCdXR0b24gPSBuZXcgUHJldk5leHRCdXR0b24oIDEsIHRoaXMgKTtcblxuICB0aGlzLm9uKCAnYWN0aXZhdGUnLCB0aGlzLmFjdGl2YXRlUHJldk5leHRCdXR0b25zICk7XG59O1xuXG5wcm90by5hY3RpdmF0ZVByZXZOZXh0QnV0dG9ucyA9IGZ1bmN0aW9uKCkge1xuICB0aGlzLnByZXZCdXR0b24uYWN0aXZhdGUoKTtcbiAgdGhpcy5uZXh0QnV0dG9uLmFjdGl2YXRlKCk7XG4gIHRoaXMub24oICdkZWFjdGl2YXRlJywgdGhpcy5kZWFjdGl2YXRlUHJldk5leHRCdXR0b25zICk7XG59O1xuXG5wcm90by5kZWFjdGl2YXRlUHJldk5leHRCdXR0b25zID0gZnVuY3Rpb24oKSB7XG4gIHRoaXMucHJldkJ1dHRvbi5kZWFjdGl2YXRlKCk7XG4gIHRoaXMubmV4dEJ1dHRvbi5kZWFjdGl2YXRlKCk7XG4gIHRoaXMub2ZmKCAnZGVhY3RpdmF0ZScsIHRoaXMuZGVhY3RpdmF0ZVByZXZOZXh0QnV0dG9ucyApO1xufTtcblxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tIC8vXG5cbkZsaWNraXR5LlByZXZOZXh0QnV0dG9uID0gUHJldk5leHRCdXR0b247XG5cbnJldHVybiBGbGlja2l0eTtcblxufSkpO1xuIiwiLy8gc2xpZGVcbiggZnVuY3Rpb24oIHdpbmRvdywgZmFjdG9yeSApIHtcbiAgLy8gdW5pdmVyc2FsIG1vZHVsZSBkZWZpbml0aW9uXG4gIC8qIGpzaGludCBzdHJpY3Q6IGZhbHNlICovXG4gIGlmICggdHlwZW9mIGRlZmluZSA9PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQgKSB7XG4gICAgLy8gQU1EXG4gICAgZGVmaW5lKCBmYWN0b3J5ICk7XG4gIH0gZWxzZSBpZiAoIHR5cGVvZiBtb2R1bGUgPT0gJ29iamVjdCcgJiYgbW9kdWxlLmV4cG9ydHMgKSB7XG4gICAgLy8gQ29tbW9uSlNcbiAgICBtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkoKTtcbiAgfSBlbHNlIHtcbiAgICAvLyBicm93c2VyIGdsb2JhbFxuICAgIHdpbmRvdy5GbGlja2l0eSA9IHdpbmRvdy5GbGlja2l0eSB8fCB7fTtcbiAgICB3aW5kb3cuRmxpY2tpdHkuU2xpZGUgPSBmYWN0b3J5KCk7XG4gIH1cblxufSggd2luZG93LCBmdW5jdGlvbiBmYWN0b3J5KCkge1xuJ3VzZSBzdHJpY3QnO1xuXG5mdW5jdGlvbiBTbGlkZSggcGFyZW50ICkge1xuICB0aGlzLnBhcmVudCA9IHBhcmVudDtcbiAgdGhpcy5pc09yaWdpbkxlZnQgPSBwYXJlbnQub3JpZ2luU2lkZSA9PSAnbGVmdCc7XG4gIHRoaXMuY2VsbHMgPSBbXTtcbiAgdGhpcy5vdXRlcldpZHRoID0gMDtcbiAgdGhpcy5oZWlnaHQgPSAwO1xufVxuXG52YXIgcHJvdG8gPSBTbGlkZS5wcm90b3R5cGU7XG5cbnByb3RvLmFkZENlbGwgPSBmdW5jdGlvbiggY2VsbCApIHtcbiAgdGhpcy5jZWxscy5wdXNoKCBjZWxsICk7XG4gIHRoaXMub3V0ZXJXaWR0aCArPSBjZWxsLnNpemUub3V0ZXJXaWR0aDtcbiAgdGhpcy5oZWlnaHQgPSBNYXRoLm1heCggY2VsbC5zaXplLm91dGVySGVpZ2h0LCB0aGlzLmhlaWdodCApO1xuICAvLyBmaXJzdCBjZWxsIHN0dWZmXG4gIGlmICggdGhpcy5jZWxscy5sZW5ndGggPT0gMSApIHtcbiAgICB0aGlzLnggPSBjZWxsLng7IC8vIHggY29tZXMgZnJvbSBmaXJzdCBjZWxsXG4gICAgdmFyIGJlZ2luTWFyZ2luID0gdGhpcy5pc09yaWdpbkxlZnQgPyAnbWFyZ2luTGVmdCcgOiAnbWFyZ2luUmlnaHQnO1xuICAgIHRoaXMuZmlyc3RNYXJnaW4gPSBjZWxsLnNpemVbIGJlZ2luTWFyZ2luIF07XG4gIH1cbn07XG5cbnByb3RvLnVwZGF0ZVRhcmdldCA9IGZ1bmN0aW9uKCkge1xuICB2YXIgZW5kTWFyZ2luID0gdGhpcy5pc09yaWdpbkxlZnQgPyAnbWFyZ2luUmlnaHQnIDogJ21hcmdpbkxlZnQnO1xuICB2YXIgbGFzdENlbGwgPSB0aGlzLmdldExhc3RDZWxsKCk7XG4gIHZhciBsYXN0TWFyZ2luID0gbGFzdENlbGwgPyBsYXN0Q2VsbC5zaXplWyBlbmRNYXJnaW4gXSA6IDA7XG4gIHZhciBzbGlkZVdpZHRoID0gdGhpcy5vdXRlcldpZHRoIC0gKCB0aGlzLmZpcnN0TWFyZ2luICsgbGFzdE1hcmdpbiApO1xuICB0aGlzLnRhcmdldCA9IHRoaXMueCArIHRoaXMuZmlyc3RNYXJnaW4gKyBzbGlkZVdpZHRoICogdGhpcy5wYXJlbnQuY2VsbEFsaWduO1xufTtcblxucHJvdG8uZ2V0TGFzdENlbGwgPSBmdW5jdGlvbigpIHtcbiAgcmV0dXJuIHRoaXMuY2VsbHNbIHRoaXMuY2VsbHMubGVuZ3RoIC0gMSBdO1xufTtcblxucHJvdG8uc2VsZWN0ID0gZnVuY3Rpb24oKSB7XG4gIHRoaXMuY2VsbHMuZm9yRWFjaCggZnVuY3Rpb24oIGNlbGwgKSB7XG4gICAgY2VsbC5zZWxlY3QoKTtcbiAgfSk7XG59O1xuXG5wcm90by51bnNlbGVjdCA9IGZ1bmN0aW9uKCkge1xuICB0aGlzLmNlbGxzLmZvckVhY2goIGZ1bmN0aW9uKCBjZWxsICkge1xuICAgIGNlbGwudW5zZWxlY3QoKTtcbiAgfSk7XG59O1xuXG5wcm90by5nZXRDZWxsRWxlbWVudHMgPSBmdW5jdGlvbigpIHtcbiAgcmV0dXJuIHRoaXMuY2VsbHMubWFwKCBmdW5jdGlvbiggY2VsbCApIHtcbiAgICByZXR1cm4gY2VsbC5lbGVtZW50O1xuICB9KTtcbn07XG5cbnJldHVybiBTbGlkZTtcblxufSkpO1xuIiwiLyohXG4gKiBnZXRTaXplIHYyLjAuM1xuICogbWVhc3VyZSBzaXplIG9mIGVsZW1lbnRzXG4gKiBNSVQgbGljZW5zZVxuICovXG5cbi8qIGpzaGludCBicm93c2VyOiB0cnVlLCBzdHJpY3Q6IHRydWUsIHVuZGVmOiB0cnVlLCB1bnVzZWQ6IHRydWUgKi9cbi8qIGdsb2JhbHMgY29uc29sZTogZmFsc2UgKi9cblxuKCBmdW5jdGlvbiggd2luZG93LCBmYWN0b3J5ICkge1xuICAvKiBqc2hpbnQgc3RyaWN0OiBmYWxzZSAqLyAvKiBnbG9iYWxzIGRlZmluZSwgbW9kdWxlICovXG4gIGlmICggdHlwZW9mIGRlZmluZSA9PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQgKSB7XG4gICAgLy8gQU1EXG4gICAgZGVmaW5lKCBmYWN0b3J5ICk7XG4gIH0gZWxzZSBpZiAoIHR5cGVvZiBtb2R1bGUgPT0gJ29iamVjdCcgJiYgbW9kdWxlLmV4cG9ydHMgKSB7XG4gICAgLy8gQ29tbW9uSlNcbiAgICBtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkoKTtcbiAgfSBlbHNlIHtcbiAgICAvLyBicm93c2VyIGdsb2JhbFxuICAgIHdpbmRvdy5nZXRTaXplID0gZmFjdG9yeSgpO1xuICB9XG5cbn0pKCB3aW5kb3csIGZ1bmN0aW9uIGZhY3RvcnkoKSB7XG4ndXNlIHN0cmljdCc7XG5cbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tIGhlbHBlcnMgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gLy9cblxuLy8gZ2V0IGEgbnVtYmVyIGZyb20gYSBzdHJpbmcsIG5vdCBhIHBlcmNlbnRhZ2VcbmZ1bmN0aW9uIGdldFN0eWxlU2l6ZSggdmFsdWUgKSB7XG4gIHZhciBudW0gPSBwYXJzZUZsb2F0KCB2YWx1ZSApO1xuICAvLyBub3QgYSBwZXJjZW50IGxpa2UgJzEwMCUnLCBhbmQgYSBudW1iZXJcbiAgdmFyIGlzVmFsaWQgPSB2YWx1ZS5pbmRleE9mKCclJykgPT0gLTEgJiYgIWlzTmFOKCBudW0gKTtcbiAgcmV0dXJuIGlzVmFsaWQgJiYgbnVtO1xufVxuXG5mdW5jdGlvbiBub29wKCkge31cblxudmFyIGxvZ0Vycm9yID0gdHlwZW9mIGNvbnNvbGUgPT0gJ3VuZGVmaW5lZCcgPyBub29wIDpcbiAgZnVuY3Rpb24oIG1lc3NhZ2UgKSB7XG4gICAgY29uc29sZS5lcnJvciggbWVzc2FnZSApO1xuICB9O1xuXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSBtZWFzdXJlbWVudHMgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gLy9cblxudmFyIG1lYXN1cmVtZW50cyA9IFtcbiAgJ3BhZGRpbmdMZWZ0JyxcbiAgJ3BhZGRpbmdSaWdodCcsXG4gICdwYWRkaW5nVG9wJyxcbiAgJ3BhZGRpbmdCb3R0b20nLFxuICAnbWFyZ2luTGVmdCcsXG4gICdtYXJnaW5SaWdodCcsXG4gICdtYXJnaW5Ub3AnLFxuICAnbWFyZ2luQm90dG9tJyxcbiAgJ2JvcmRlckxlZnRXaWR0aCcsXG4gICdib3JkZXJSaWdodFdpZHRoJyxcbiAgJ2JvcmRlclRvcFdpZHRoJyxcbiAgJ2JvcmRlckJvdHRvbVdpZHRoJ1xuXTtcblxudmFyIG1lYXN1cmVtZW50c0xlbmd0aCA9IG1lYXN1cmVtZW50cy5sZW5ndGg7XG5cbmZ1bmN0aW9uIGdldFplcm9TaXplKCkge1xuICB2YXIgc2l6ZSA9IHtcbiAgICB3aWR0aDogMCxcbiAgICBoZWlnaHQ6IDAsXG4gICAgaW5uZXJXaWR0aDogMCxcbiAgICBpbm5lckhlaWdodDogMCxcbiAgICBvdXRlcldpZHRoOiAwLFxuICAgIG91dGVySGVpZ2h0OiAwXG4gIH07XG4gIGZvciAoIHZhciBpPTA7IGkgPCBtZWFzdXJlbWVudHNMZW5ndGg7IGkrKyApIHtcbiAgICB2YXIgbWVhc3VyZW1lbnQgPSBtZWFzdXJlbWVudHNbaV07XG4gICAgc2l6ZVsgbWVhc3VyZW1lbnQgXSA9IDA7XG4gIH1cbiAgcmV0dXJuIHNpemU7XG59XG5cbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tIGdldFN0eWxlIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tIC8vXG5cbi8qKlxuICogZ2V0U3R5bGUsIGdldCBzdHlsZSBvZiBlbGVtZW50LCBjaGVjayBmb3IgRmlyZWZveCBidWdcbiAqIGh0dHBzOi8vYnVnemlsbGEubW96aWxsYS5vcmcvc2hvd19idWcuY2dpP2lkPTU0ODM5N1xuICovXG5mdW5jdGlvbiBnZXRTdHlsZSggZWxlbSApIHtcbiAgdmFyIHN0eWxlID0gZ2V0Q29tcHV0ZWRTdHlsZSggZWxlbSApO1xuICBpZiAoICFzdHlsZSApIHtcbiAgICBsb2dFcnJvciggJ1N0eWxlIHJldHVybmVkICcgKyBzdHlsZSArXG4gICAgICAnLiBBcmUgeW91IHJ1bm5pbmcgdGhpcyBjb2RlIGluIGEgaGlkZGVuIGlmcmFtZSBvbiBGaXJlZm94PyAnICtcbiAgICAgICdTZWUgaHR0cHM6Ly9iaXQubHkvZ2V0c2l6ZWJ1ZzEnICk7XG4gIH1cbiAgcmV0dXJuIHN0eWxlO1xufVxuXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSBzZXR1cCAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAvL1xuXG52YXIgaXNTZXR1cCA9IGZhbHNlO1xuXG52YXIgaXNCb3hTaXplT3V0ZXI7XG5cbi8qKlxuICogc2V0dXBcbiAqIGNoZWNrIGlzQm94U2l6ZXJPdXRlclxuICogZG8gb24gZmlyc3QgZ2V0U2l6ZSgpIHJhdGhlciB0aGFuIG9uIHBhZ2UgbG9hZCBmb3IgRmlyZWZveCBidWdcbiAqL1xuZnVuY3Rpb24gc2V0dXAoKSB7XG4gIC8vIHNldHVwIG9uY2VcbiAgaWYgKCBpc1NldHVwICkge1xuICAgIHJldHVybjtcbiAgfVxuICBpc1NldHVwID0gdHJ1ZTtcblxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSBib3ggc2l6aW5nIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tIC8vXG5cbiAgLyoqXG4gICAqIENocm9tZSAmIFNhZmFyaSBtZWFzdXJlIHRoZSBvdXRlci13aWR0aCBvbiBzdHlsZS53aWR0aCBvbiBib3JkZXItYm94IGVsZW1zXG4gICAqIElFMTEgJiBGaXJlZm94PDI5IG1lYXN1cmVzIHRoZSBpbm5lci13aWR0aFxuICAgKi9cbiAgdmFyIGRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICBkaXYuc3R5bGUud2lkdGggPSAnMjAwcHgnO1xuICBkaXYuc3R5bGUucGFkZGluZyA9ICcxcHggMnB4IDNweCA0cHgnO1xuICBkaXYuc3R5bGUuYm9yZGVyU3R5bGUgPSAnc29saWQnO1xuICBkaXYuc3R5bGUuYm9yZGVyV2lkdGggPSAnMXB4IDJweCAzcHggNHB4JztcbiAgZGl2LnN0eWxlLmJveFNpemluZyA9ICdib3JkZXItYm94JztcblxuICB2YXIgYm9keSA9IGRvY3VtZW50LmJvZHkgfHwgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50O1xuICBib2R5LmFwcGVuZENoaWxkKCBkaXYgKTtcbiAgdmFyIHN0eWxlID0gZ2V0U3R5bGUoIGRpdiApO1xuICAvLyByb3VuZCB2YWx1ZSBmb3IgYnJvd3NlciB6b29tLiBkZXNhbmRyby9tYXNvbnJ5IzkyOFxuICBpc0JveFNpemVPdXRlciA9IE1hdGgucm91bmQoIGdldFN0eWxlU2l6ZSggc3R5bGUud2lkdGggKSApID09IDIwMDtcbiAgZ2V0U2l6ZS5pc0JveFNpemVPdXRlciA9IGlzQm94U2l6ZU91dGVyO1xuXG4gIGJvZHkucmVtb3ZlQ2hpbGQoIGRpdiApO1xufVxuXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSBnZXRTaXplIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tIC8vXG5cbmZ1bmN0aW9uIGdldFNpemUoIGVsZW0gKSB7XG4gIHNldHVwKCk7XG5cbiAgLy8gdXNlIHF1ZXJ5U2VsZXRvciBpZiBlbGVtIGlzIHN0cmluZ1xuICBpZiAoIHR5cGVvZiBlbGVtID09ICdzdHJpbmcnICkge1xuICAgIGVsZW0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCBlbGVtICk7XG4gIH1cblxuICAvLyBkbyBub3QgcHJvY2VlZCBvbiBub24tb2JqZWN0c1xuICBpZiAoICFlbGVtIHx8IHR5cGVvZiBlbGVtICE9ICdvYmplY3QnIHx8ICFlbGVtLm5vZGVUeXBlICkge1xuICAgIHJldHVybjtcbiAgfVxuXG4gIHZhciBzdHlsZSA9IGdldFN0eWxlKCBlbGVtICk7XG5cbiAgLy8gaWYgaGlkZGVuLCBldmVyeXRoaW5nIGlzIDBcbiAgaWYgKCBzdHlsZS5kaXNwbGF5ID09ICdub25lJyApIHtcbiAgICByZXR1cm4gZ2V0WmVyb1NpemUoKTtcbiAgfVxuXG4gIHZhciBzaXplID0ge307XG4gIHNpemUud2lkdGggPSBlbGVtLm9mZnNldFdpZHRoO1xuICBzaXplLmhlaWdodCA9IGVsZW0ub2Zmc2V0SGVpZ2h0O1xuXG4gIHZhciBpc0JvcmRlckJveCA9IHNpemUuaXNCb3JkZXJCb3ggPSBzdHlsZS5ib3hTaXppbmcgPT0gJ2JvcmRlci1ib3gnO1xuXG4gIC8vIGdldCBhbGwgbWVhc3VyZW1lbnRzXG4gIGZvciAoIHZhciBpPTA7IGkgPCBtZWFzdXJlbWVudHNMZW5ndGg7IGkrKyApIHtcbiAgICB2YXIgbWVhc3VyZW1lbnQgPSBtZWFzdXJlbWVudHNbaV07XG4gICAgdmFyIHZhbHVlID0gc3R5bGVbIG1lYXN1cmVtZW50IF07XG4gICAgdmFyIG51bSA9IHBhcnNlRmxvYXQoIHZhbHVlICk7XG4gICAgLy8gYW55ICdhdXRvJywgJ21lZGl1bScgdmFsdWUgd2lsbCBiZSAwXG4gICAgc2l6ZVsgbWVhc3VyZW1lbnQgXSA9ICFpc05hTiggbnVtICkgPyBudW0gOiAwO1xuICB9XG5cbiAgdmFyIHBhZGRpbmdXaWR0aCA9IHNpemUucGFkZGluZ0xlZnQgKyBzaXplLnBhZGRpbmdSaWdodDtcbiAgdmFyIHBhZGRpbmdIZWlnaHQgPSBzaXplLnBhZGRpbmdUb3AgKyBzaXplLnBhZGRpbmdCb3R0b207XG4gIHZhciBtYXJnaW5XaWR0aCA9IHNpemUubWFyZ2luTGVmdCArIHNpemUubWFyZ2luUmlnaHQ7XG4gIHZhciBtYXJnaW5IZWlnaHQgPSBzaXplLm1hcmdpblRvcCArIHNpemUubWFyZ2luQm90dG9tO1xuICB2YXIgYm9yZGVyV2lkdGggPSBzaXplLmJvcmRlckxlZnRXaWR0aCArIHNpemUuYm9yZGVyUmlnaHRXaWR0aDtcbiAgdmFyIGJvcmRlckhlaWdodCA9IHNpemUuYm9yZGVyVG9wV2lkdGggKyBzaXplLmJvcmRlckJvdHRvbVdpZHRoO1xuXG4gIHZhciBpc0JvcmRlckJveFNpemVPdXRlciA9IGlzQm9yZGVyQm94ICYmIGlzQm94U2l6ZU91dGVyO1xuXG4gIC8vIG92ZXJ3cml0ZSB3aWR0aCBhbmQgaGVpZ2h0IGlmIHdlIGNhbiBnZXQgaXQgZnJvbSBzdHlsZVxuICB2YXIgc3R5bGVXaWR0aCA9IGdldFN0eWxlU2l6ZSggc3R5bGUud2lkdGggKTtcbiAgaWYgKCBzdHlsZVdpZHRoICE9PSBmYWxzZSApIHtcbiAgICBzaXplLndpZHRoID0gc3R5bGVXaWR0aCArXG4gICAgICAvLyBhZGQgcGFkZGluZyBhbmQgYm9yZGVyIHVubGVzcyBpdCdzIGFscmVhZHkgaW5jbHVkaW5nIGl0XG4gICAgICAoIGlzQm9yZGVyQm94U2l6ZU91dGVyID8gMCA6IHBhZGRpbmdXaWR0aCArIGJvcmRlcldpZHRoICk7XG4gIH1cblxuICB2YXIgc3R5bGVIZWlnaHQgPSBnZXRTdHlsZVNpemUoIHN0eWxlLmhlaWdodCApO1xuICBpZiAoIHN0eWxlSGVpZ2h0ICE9PSBmYWxzZSApIHtcbiAgICBzaXplLmhlaWdodCA9IHN0eWxlSGVpZ2h0ICtcbiAgICAgIC8vIGFkZCBwYWRkaW5nIGFuZCBib3JkZXIgdW5sZXNzIGl0J3MgYWxyZWFkeSBpbmNsdWRpbmcgaXRcbiAgICAgICggaXNCb3JkZXJCb3hTaXplT3V0ZXIgPyAwIDogcGFkZGluZ0hlaWdodCArIGJvcmRlckhlaWdodCApO1xuICB9XG5cbiAgc2l6ZS5pbm5lcldpZHRoID0gc2l6ZS53aWR0aCAtICggcGFkZGluZ1dpZHRoICsgYm9yZGVyV2lkdGggKTtcbiAgc2l6ZS5pbm5lckhlaWdodCA9IHNpemUuaGVpZ2h0IC0gKCBwYWRkaW5nSGVpZ2h0ICsgYm9yZGVySGVpZ2h0ICk7XG5cbiAgc2l6ZS5vdXRlcldpZHRoID0gc2l6ZS53aWR0aCArIG1hcmdpbldpZHRoO1xuICBzaXplLm91dGVySGVpZ2h0ID0gc2l6ZS5oZWlnaHQgKyBtYXJnaW5IZWlnaHQ7XG5cbiAgcmV0dXJuIHNpemU7XG59XG5cbnJldHVybiBnZXRTaXplO1xuXG59KTtcbiIsIi8qIVxuICogVW5pZHJhZ2dlciB2Mi4zLjFcbiAqIERyYWdnYWJsZSBiYXNlIGNsYXNzXG4gKiBNSVQgbGljZW5zZVxuICovXG5cbi8qanNoaW50IGJyb3dzZXI6IHRydWUsIHVudXNlZDogdHJ1ZSwgdW5kZWY6IHRydWUsIHN0cmljdDogdHJ1ZSAqL1xuXG4oIGZ1bmN0aW9uKCB3aW5kb3csIGZhY3RvcnkgKSB7XG4gIC8vIHVuaXZlcnNhbCBtb2R1bGUgZGVmaW5pdGlvblxuICAvKmpzaGludCBzdHJpY3Q6IGZhbHNlICovIC8qZ2xvYmFscyBkZWZpbmUsIG1vZHVsZSwgcmVxdWlyZSAqL1xuXG4gIGlmICggdHlwZW9mIGRlZmluZSA9PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQgKSB7XG4gICAgLy8gQU1EXG4gICAgZGVmaW5lKCBbXG4gICAgICAndW5pcG9pbnRlci91bmlwb2ludGVyJ1xuICAgIF0sIGZ1bmN0aW9uKCBVbmlwb2ludGVyICkge1xuICAgICAgcmV0dXJuIGZhY3RvcnkoIHdpbmRvdywgVW5pcG9pbnRlciApO1xuICAgIH0pO1xuICB9IGVsc2UgaWYgKCB0eXBlb2YgbW9kdWxlID09ICdvYmplY3QnICYmIG1vZHVsZS5leHBvcnRzICkge1xuICAgIC8vIENvbW1vbkpTXG4gICAgbW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KFxuICAgICAgd2luZG93LFxuICAgICAgcmVxdWlyZSgndW5pcG9pbnRlcicpXG4gICAgKTtcbiAgfSBlbHNlIHtcbiAgICAvLyBicm93c2VyIGdsb2JhbFxuICAgIHdpbmRvdy5VbmlkcmFnZ2VyID0gZmFjdG9yeShcbiAgICAgIHdpbmRvdyxcbiAgICAgIHdpbmRvdy5Vbmlwb2ludGVyXG4gICAgKTtcbiAgfVxuXG59KCB3aW5kb3csIGZ1bmN0aW9uIGZhY3RvcnkoIHdpbmRvdywgVW5pcG9pbnRlciApIHtcblxuJ3VzZSBzdHJpY3QnO1xuXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSBVbmlkcmFnZ2VyIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tIC8vXG5cbmZ1bmN0aW9uIFVuaWRyYWdnZXIoKSB7fVxuXG4vLyBpbmhlcml0IFVuaXBvaW50ZXIgJiBFdkVtaXR0ZXJcbnZhciBwcm90byA9IFVuaWRyYWdnZXIucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZSggVW5pcG9pbnRlci5wcm90b3R5cGUgKTtcblxuLy8gLS0tLS0gYmluZCBzdGFydCAtLS0tLSAvL1xuXG5wcm90by5iaW5kSGFuZGxlcyA9IGZ1bmN0aW9uKCkge1xuICB0aGlzLl9iaW5kSGFuZGxlcyggdHJ1ZSApO1xufTtcblxucHJvdG8udW5iaW5kSGFuZGxlcyA9IGZ1bmN0aW9uKCkge1xuICB0aGlzLl9iaW5kSGFuZGxlcyggZmFsc2UgKTtcbn07XG5cbi8qKlxuICogQWRkIG9yIHJlbW92ZSBzdGFydCBldmVudFxuICogQHBhcmFtIHtCb29sZWFufSBpc0FkZFxuICovXG5wcm90by5fYmluZEhhbmRsZXMgPSBmdW5jdGlvbiggaXNBZGQgKSB7XG4gIC8vIG11bmdlIGlzQWRkLCBkZWZhdWx0IHRvIHRydWVcbiAgaXNBZGQgPSBpc0FkZCA9PT0gdW5kZWZpbmVkID8gdHJ1ZSA6IGlzQWRkO1xuICAvLyBiaW5kIGVhY2ggaGFuZGxlXG4gIHZhciBiaW5kTWV0aG9kID0gaXNBZGQgPyAnYWRkRXZlbnRMaXN0ZW5lcicgOiAncmVtb3ZlRXZlbnRMaXN0ZW5lcic7XG4gIHZhciB0b3VjaEFjdGlvbiA9IGlzQWRkID8gdGhpcy5fdG91Y2hBY3Rpb25WYWx1ZSA6ICcnO1xuICBmb3IgKCB2YXIgaT0wOyBpIDwgdGhpcy5oYW5kbGVzLmxlbmd0aDsgaSsrICkge1xuICAgIHZhciBoYW5kbGUgPSB0aGlzLmhhbmRsZXNbaV07XG4gICAgdGhpcy5fYmluZFN0YXJ0RXZlbnQoIGhhbmRsZSwgaXNBZGQgKTtcbiAgICBoYW5kbGVbIGJpbmRNZXRob2QgXSggJ2NsaWNrJywgdGhpcyApO1xuICAgIC8vIHRvdWNoLWFjdGlvbjogbm9uZSB0byBvdmVycmlkZSBicm93c2VyIHRvdWNoIGdlc3R1cmVzLiBtZXRhZml6enkvZmxpY2tpdHkjNTQwXG4gICAgaWYgKCB3aW5kb3cuUG9pbnRlckV2ZW50ICkge1xuICAgICAgaGFuZGxlLnN0eWxlLnRvdWNoQWN0aW9uID0gdG91Y2hBY3Rpb247XG4gICAgfVxuICB9XG59O1xuXG4vLyBwcm90b3R5cGUgc28gaXQgY2FuIGJlIG92ZXJ3cml0ZWFibGUgYnkgRmxpY2tpdHlcbnByb3RvLl90b3VjaEFjdGlvblZhbHVlID0gJ25vbmUnO1xuXG4vLyAtLS0tLSBzdGFydCBldmVudCAtLS0tLSAvL1xuXG4vKipcbiAqIHBvaW50ZXIgc3RhcnRcbiAqIEBwYXJhbSB7RXZlbnR9IGV2ZW50XG4gKiBAcGFyYW0ge0V2ZW50IG9yIFRvdWNofSBwb2ludGVyXG4gKi9cbnByb3RvLnBvaW50ZXJEb3duID0gZnVuY3Rpb24oIGV2ZW50LCBwb2ludGVyICkge1xuICB2YXIgaXNPa2F5ID0gdGhpcy5va2F5UG9pbnRlckRvd24oIGV2ZW50ICk7XG4gIGlmICggIWlzT2theSApIHtcbiAgICByZXR1cm47XG4gIH1cbiAgLy8gdHJhY2sgc3RhcnQgZXZlbnQgcG9zaXRpb25cbiAgLy8gU2FmYXJpIDkgb3ZlcnJpZGVzIHBhZ2VYIGFuZCBwYWdlWS4gVGhlc2UgdmFsdWVzIG5lZWRzIHRvIGJlIGNvcGllZC4gZmxpY2tpdHkjODQyXG4gIHRoaXMucG9pbnRlckRvd25Qb2ludGVyID0ge1xuICAgIHBhZ2VYOiBwb2ludGVyLnBhZ2VYLFxuICAgIHBhZ2VZOiBwb2ludGVyLnBhZ2VZLFxuICB9O1xuXG4gIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gIHRoaXMucG9pbnRlckRvd25CbHVyKCk7XG4gIC8vIGJpbmQgbW92ZSBhbmQgZW5kIGV2ZW50c1xuICB0aGlzLl9iaW5kUG9zdFN0YXJ0RXZlbnRzKCBldmVudCApO1xuICB0aGlzLmVtaXRFdmVudCggJ3BvaW50ZXJEb3duJywgWyBldmVudCwgcG9pbnRlciBdICk7XG59O1xuXG4vLyBub2RlcyB0aGF0IGhhdmUgdGV4dCBmaWVsZHNcbnZhciBjdXJzb3JOb2RlcyA9IHtcbiAgVEVYVEFSRUE6IHRydWUsXG4gIElOUFVUOiB0cnVlLFxuICBTRUxFQ1Q6IHRydWUsXG4gIE9QVElPTjogdHJ1ZSxcbn07XG5cbi8vIGlucHV0IHR5cGVzIHRoYXQgZG8gbm90IGhhdmUgdGV4dCBmaWVsZHNcbnZhciBjbGlja1R5cGVzID0ge1xuICByYWRpbzogdHJ1ZSxcbiAgY2hlY2tib3g6IHRydWUsXG4gIGJ1dHRvbjogdHJ1ZSxcbiAgc3VibWl0OiB0cnVlLFxuICBpbWFnZTogdHJ1ZSxcbiAgZmlsZTogdHJ1ZSxcbn07XG5cbi8vIGRpc21pc3MgaW5wdXRzIHdpdGggdGV4dCBmaWVsZHMuIGZsaWNraXR5IzQwMywgZmxpY2tpdHkjNDA0XG5wcm90by5va2F5UG9pbnRlckRvd24gPSBmdW5jdGlvbiggZXZlbnQgKSB7XG4gIHZhciBpc0N1cnNvck5vZGUgPSBjdXJzb3JOb2Rlc1sgZXZlbnQudGFyZ2V0Lm5vZGVOYW1lIF07XG4gIHZhciBpc0NsaWNrVHlwZSA9IGNsaWNrVHlwZXNbIGV2ZW50LnRhcmdldC50eXBlIF07XG4gIHZhciBpc09rYXkgPSAhaXNDdXJzb3JOb2RlIHx8IGlzQ2xpY2tUeXBlO1xuICBpZiAoICFpc09rYXkgKSB7XG4gICAgdGhpcy5fcG9pbnRlclJlc2V0KCk7XG4gIH1cbiAgcmV0dXJuIGlzT2theTtcbn07XG5cbi8vIGtsdWRnZSB0byBibHVyIHByZXZpb3VzbHkgZm9jdXNlZCBpbnB1dFxucHJvdG8ucG9pbnRlckRvd25CbHVyID0gZnVuY3Rpb24oKSB7XG4gIHZhciBmb2N1c2VkID0gZG9jdW1lbnQuYWN0aXZlRWxlbWVudDtcbiAgLy8gZG8gbm90IGJsdXIgYm9keSBmb3IgSUUxMCwgbWV0YWZpenp5L2ZsaWNraXR5IzExN1xuICB2YXIgY2FuQmx1ciA9IGZvY3VzZWQgJiYgZm9jdXNlZC5ibHVyICYmIGZvY3VzZWQgIT0gZG9jdW1lbnQuYm9keTtcbiAgaWYgKCBjYW5CbHVyICkge1xuICAgIGZvY3VzZWQuYmx1cigpO1xuICB9XG59O1xuXG4vLyAtLS0tLSBtb3ZlIGV2ZW50IC0tLS0tIC8vXG5cbi8qKlxuICogZHJhZyBtb3ZlXG4gKiBAcGFyYW0ge0V2ZW50fSBldmVudFxuICogQHBhcmFtIHtFdmVudCBvciBUb3VjaH0gcG9pbnRlclxuICovXG5wcm90by5wb2ludGVyTW92ZSA9IGZ1bmN0aW9uKCBldmVudCwgcG9pbnRlciApIHtcbiAgdmFyIG1vdmVWZWN0b3IgPSB0aGlzLl9kcmFnUG9pbnRlck1vdmUoIGV2ZW50LCBwb2ludGVyICk7XG4gIHRoaXMuZW1pdEV2ZW50KCAncG9pbnRlck1vdmUnLCBbIGV2ZW50LCBwb2ludGVyLCBtb3ZlVmVjdG9yIF0gKTtcbiAgdGhpcy5fZHJhZ01vdmUoIGV2ZW50LCBwb2ludGVyLCBtb3ZlVmVjdG9yICk7XG59O1xuXG4vLyBiYXNlIHBvaW50ZXIgbW92ZSBsb2dpY1xucHJvdG8uX2RyYWdQb2ludGVyTW92ZSA9IGZ1bmN0aW9uKCBldmVudCwgcG9pbnRlciApIHtcbiAgdmFyIG1vdmVWZWN0b3IgPSB7XG4gICAgeDogcG9pbnRlci5wYWdlWCAtIHRoaXMucG9pbnRlckRvd25Qb2ludGVyLnBhZ2VYLFxuICAgIHk6IHBvaW50ZXIucGFnZVkgLSB0aGlzLnBvaW50ZXJEb3duUG9pbnRlci5wYWdlWVxuICB9O1xuICAvLyBzdGFydCBkcmFnIGlmIHBvaW50ZXIgaGFzIG1vdmVkIGZhciBlbm91Z2ggdG8gc3RhcnQgZHJhZ1xuICBpZiAoICF0aGlzLmlzRHJhZ2dpbmcgJiYgdGhpcy5oYXNEcmFnU3RhcnRlZCggbW92ZVZlY3RvciApICkge1xuICAgIHRoaXMuX2RyYWdTdGFydCggZXZlbnQsIHBvaW50ZXIgKTtcbiAgfVxuICByZXR1cm4gbW92ZVZlY3Rvcjtcbn07XG5cbi8vIGNvbmRpdGlvbiBpZiBwb2ludGVyIGhhcyBtb3ZlZCBmYXIgZW5vdWdoIHRvIHN0YXJ0IGRyYWdcbnByb3RvLmhhc0RyYWdTdGFydGVkID0gZnVuY3Rpb24oIG1vdmVWZWN0b3IgKSB7XG4gIHJldHVybiBNYXRoLmFicyggbW92ZVZlY3Rvci54ICkgPiAzIHx8IE1hdGguYWJzKCBtb3ZlVmVjdG9yLnkgKSA+IDM7XG59O1xuXG4vLyAtLS0tLSBlbmQgZXZlbnQgLS0tLS0gLy9cblxuLyoqXG4gKiBwb2ludGVyIHVwXG4gKiBAcGFyYW0ge0V2ZW50fSBldmVudFxuICogQHBhcmFtIHtFdmVudCBvciBUb3VjaH0gcG9pbnRlclxuICovXG5wcm90by5wb2ludGVyVXAgPSBmdW5jdGlvbiggZXZlbnQsIHBvaW50ZXIgKSB7XG4gIHRoaXMuZW1pdEV2ZW50KCAncG9pbnRlclVwJywgWyBldmVudCwgcG9pbnRlciBdICk7XG4gIHRoaXMuX2RyYWdQb2ludGVyVXAoIGV2ZW50LCBwb2ludGVyICk7XG59O1xuXG5wcm90by5fZHJhZ1BvaW50ZXJVcCA9IGZ1bmN0aW9uKCBldmVudCwgcG9pbnRlciApIHtcbiAgaWYgKCB0aGlzLmlzRHJhZ2dpbmcgKSB7XG4gICAgdGhpcy5fZHJhZ0VuZCggZXZlbnQsIHBvaW50ZXIgKTtcbiAgfSBlbHNlIHtcbiAgICAvLyBwb2ludGVyIGRpZG4ndCBtb3ZlIGVub3VnaCBmb3IgZHJhZyB0byBzdGFydFxuICAgIHRoaXMuX3N0YXRpY0NsaWNrKCBldmVudCwgcG9pbnRlciApO1xuICB9XG59O1xuXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSBkcmFnIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tIC8vXG5cbi8vIGRyYWdTdGFydFxucHJvdG8uX2RyYWdTdGFydCA9IGZ1bmN0aW9uKCBldmVudCwgcG9pbnRlciApIHtcbiAgdGhpcy5pc0RyYWdnaW5nID0gdHJ1ZTtcbiAgLy8gcHJldmVudCBjbGlja3NcbiAgdGhpcy5pc1ByZXZlbnRpbmdDbGlja3MgPSB0cnVlO1xuICB0aGlzLmRyYWdTdGFydCggZXZlbnQsIHBvaW50ZXIgKTtcbn07XG5cbnByb3RvLmRyYWdTdGFydCA9IGZ1bmN0aW9uKCBldmVudCwgcG9pbnRlciApIHtcbiAgdGhpcy5lbWl0RXZlbnQoICdkcmFnU3RhcnQnLCBbIGV2ZW50LCBwb2ludGVyIF0gKTtcbn07XG5cbi8vIGRyYWdNb3ZlXG5wcm90by5fZHJhZ01vdmUgPSBmdW5jdGlvbiggZXZlbnQsIHBvaW50ZXIsIG1vdmVWZWN0b3IgKSB7XG4gIC8vIGRvIG5vdCBkcmFnIGlmIG5vdCBkcmFnZ2luZyB5ZXRcbiAgaWYgKCAhdGhpcy5pc0RyYWdnaW5nICkge1xuICAgIHJldHVybjtcbiAgfVxuXG4gIHRoaXMuZHJhZ01vdmUoIGV2ZW50LCBwb2ludGVyLCBtb3ZlVmVjdG9yICk7XG59O1xuXG5wcm90by5kcmFnTW92ZSA9IGZ1bmN0aW9uKCBldmVudCwgcG9pbnRlciwgbW92ZVZlY3RvciApIHtcbiAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgdGhpcy5lbWl0RXZlbnQoICdkcmFnTW92ZScsIFsgZXZlbnQsIHBvaW50ZXIsIG1vdmVWZWN0b3IgXSApO1xufTtcblxuLy8gZHJhZ0VuZFxucHJvdG8uX2RyYWdFbmQgPSBmdW5jdGlvbiggZXZlbnQsIHBvaW50ZXIgKSB7XG4gIC8vIHNldCBmbGFnc1xuICB0aGlzLmlzRHJhZ2dpbmcgPSBmYWxzZTtcbiAgLy8gcmUtZW5hYmxlIGNsaWNraW5nIGFzeW5jXG4gIHNldFRpbWVvdXQoIGZ1bmN0aW9uKCkge1xuICAgIGRlbGV0ZSB0aGlzLmlzUHJldmVudGluZ0NsaWNrcztcbiAgfS5iaW5kKCB0aGlzICkgKTtcblxuICB0aGlzLmRyYWdFbmQoIGV2ZW50LCBwb2ludGVyICk7XG59O1xuXG5wcm90by5kcmFnRW5kID0gZnVuY3Rpb24oIGV2ZW50LCBwb2ludGVyICkge1xuICB0aGlzLmVtaXRFdmVudCggJ2RyYWdFbmQnLCBbIGV2ZW50LCBwb2ludGVyIF0gKTtcbn07XG5cbi8vIC0tLS0tIG9uY2xpY2sgLS0tLS0gLy9cblxuLy8gaGFuZGxlIGFsbCBjbGlja3MgYW5kIHByZXZlbnQgY2xpY2tzIHdoZW4gZHJhZ2dpbmdcbnByb3RvLm9uY2xpY2sgPSBmdW5jdGlvbiggZXZlbnQgKSB7XG4gIGlmICggdGhpcy5pc1ByZXZlbnRpbmdDbGlja3MgKSB7XG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgfVxufTtcblxuLy8gLS0tLS0gc3RhdGljQ2xpY2sgLS0tLS0gLy9cblxuLy8gdHJpZ2dlcmVkIGFmdGVyIHBvaW50ZXIgZG93biAmIHVwIHdpdGggbm8vdGlueSBtb3ZlbWVudFxucHJvdG8uX3N0YXRpY0NsaWNrID0gZnVuY3Rpb24oIGV2ZW50LCBwb2ludGVyICkge1xuICAvLyBpZ25vcmUgZW11bGF0ZWQgbW91c2UgdXAgY2xpY2tzXG4gIGlmICggdGhpcy5pc0lnbm9yaW5nTW91c2VVcCAmJiBldmVudC50eXBlID09ICdtb3VzZXVwJyApIHtcbiAgICByZXR1cm47XG4gIH1cblxuICB0aGlzLnN0YXRpY0NsaWNrKCBldmVudCwgcG9pbnRlciApO1xuXG4gIC8vIHNldCBmbGFnIGZvciBlbXVsYXRlZCBjbGlja3MgMzAwbXMgYWZ0ZXIgdG91Y2hlbmRcbiAgaWYgKCBldmVudC50eXBlICE9ICdtb3VzZXVwJyApIHtcbiAgICB0aGlzLmlzSWdub3JpbmdNb3VzZVVwID0gdHJ1ZTtcbiAgICAvLyByZXNldCBmbGFnIGFmdGVyIDMwMG1zXG4gICAgc2V0VGltZW91dCggZnVuY3Rpb24oKSB7XG4gICAgICBkZWxldGUgdGhpcy5pc0lnbm9yaW5nTW91c2VVcDtcbiAgICB9LmJpbmQoIHRoaXMgKSwgNDAwICk7XG4gIH1cbn07XG5cbnByb3RvLnN0YXRpY0NsaWNrID0gZnVuY3Rpb24oIGV2ZW50LCBwb2ludGVyICkge1xuICB0aGlzLmVtaXRFdmVudCggJ3N0YXRpY0NsaWNrJywgWyBldmVudCwgcG9pbnRlciBdICk7XG59O1xuXG4vLyAtLS0tLSB1dGlscyAtLS0tLSAvL1xuXG5VbmlkcmFnZ2VyLmdldFBvaW50ZXJQb2ludCA9IFVuaXBvaW50ZXIuZ2V0UG9pbnRlclBvaW50O1xuXG4vLyAtLS0tLSAgLS0tLS0gLy9cblxucmV0dXJuIFVuaWRyYWdnZXI7XG5cbn0pKTtcbiIsIi8qIVxuICogVW5pcG9pbnRlciB2Mi4zLjBcbiAqIGJhc2UgY2xhc3MgZm9yIGRvaW5nIG9uZSB0aGluZyB3aXRoIHBvaW50ZXIgZXZlbnRcbiAqIE1JVCBsaWNlbnNlXG4gKi9cblxuLypqc2hpbnQgYnJvd3NlcjogdHJ1ZSwgdW5kZWY6IHRydWUsIHVudXNlZDogdHJ1ZSwgc3RyaWN0OiB0cnVlICovXG5cbiggZnVuY3Rpb24oIHdpbmRvdywgZmFjdG9yeSApIHtcbiAgLy8gdW5pdmVyc2FsIG1vZHVsZSBkZWZpbml0aW9uXG4gIC8qIGpzaGludCBzdHJpY3Q6IGZhbHNlICovIC8qZ2xvYmFsIGRlZmluZSwgbW9kdWxlLCByZXF1aXJlICovXG4gIGlmICggdHlwZW9mIGRlZmluZSA9PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQgKSB7XG4gICAgLy8gQU1EXG4gICAgZGVmaW5lKCBbXG4gICAgICAnZXYtZW1pdHRlci9ldi1lbWl0dGVyJ1xuICAgIF0sIGZ1bmN0aW9uKCBFdkVtaXR0ZXIgKSB7XG4gICAgICByZXR1cm4gZmFjdG9yeSggd2luZG93LCBFdkVtaXR0ZXIgKTtcbiAgICB9KTtcbiAgfSBlbHNlIGlmICggdHlwZW9mIG1vZHVsZSA9PSAnb2JqZWN0JyAmJiBtb2R1bGUuZXhwb3J0cyApIHtcbiAgICAvLyBDb21tb25KU1xuICAgIG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeShcbiAgICAgIHdpbmRvdyxcbiAgICAgIHJlcXVpcmUoJ2V2LWVtaXR0ZXInKVxuICAgICk7XG4gIH0gZWxzZSB7XG4gICAgLy8gYnJvd3NlciBnbG9iYWxcbiAgICB3aW5kb3cuVW5pcG9pbnRlciA9IGZhY3RvcnkoXG4gICAgICB3aW5kb3csXG4gICAgICB3aW5kb3cuRXZFbWl0dGVyXG4gICAgKTtcbiAgfVxuXG59KCB3aW5kb3csIGZ1bmN0aW9uIGZhY3RvcnkoIHdpbmRvdywgRXZFbWl0dGVyICkge1xuXG4ndXNlIHN0cmljdCc7XG5cbmZ1bmN0aW9uIG5vb3AoKSB7fVxuXG5mdW5jdGlvbiBVbmlwb2ludGVyKCkge31cblxuLy8gaW5oZXJpdCBFdkVtaXR0ZXJcbnZhciBwcm90byA9IFVuaXBvaW50ZXIucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZSggRXZFbWl0dGVyLnByb3RvdHlwZSApO1xuXG5wcm90by5iaW5kU3RhcnRFdmVudCA9IGZ1bmN0aW9uKCBlbGVtICkge1xuICB0aGlzLl9iaW5kU3RhcnRFdmVudCggZWxlbSwgdHJ1ZSApO1xufTtcblxucHJvdG8udW5iaW5kU3RhcnRFdmVudCA9IGZ1bmN0aW9uKCBlbGVtICkge1xuICB0aGlzLl9iaW5kU3RhcnRFdmVudCggZWxlbSwgZmFsc2UgKTtcbn07XG5cbi8qKlxuICogQWRkIG9yIHJlbW92ZSBzdGFydCBldmVudFxuICogQHBhcmFtIHtCb29sZWFufSBpc0FkZCAtIHJlbW92ZSBpZiBmYWxzZXlcbiAqL1xucHJvdG8uX2JpbmRTdGFydEV2ZW50ID0gZnVuY3Rpb24oIGVsZW0sIGlzQWRkICkge1xuICAvLyBtdW5nZSBpc0FkZCwgZGVmYXVsdCB0byB0cnVlXG4gIGlzQWRkID0gaXNBZGQgPT09IHVuZGVmaW5lZCA/IHRydWUgOiBpc0FkZDtcbiAgdmFyIGJpbmRNZXRob2QgPSBpc0FkZCA/ICdhZGRFdmVudExpc3RlbmVyJyA6ICdyZW1vdmVFdmVudExpc3RlbmVyJztcblxuICAvLyBkZWZhdWx0IHRvIG1vdXNlIGV2ZW50c1xuICB2YXIgc3RhcnRFdmVudCA9ICdtb3VzZWRvd24nO1xuICBpZiAoIHdpbmRvdy5Qb2ludGVyRXZlbnQgKSB7XG4gICAgLy8gUG9pbnRlciBFdmVudHNcbiAgICBzdGFydEV2ZW50ID0gJ3BvaW50ZXJkb3duJztcbiAgfSBlbHNlIGlmICggJ29udG91Y2hzdGFydCcgaW4gd2luZG93ICkge1xuICAgIC8vIFRvdWNoIEV2ZW50cy4gaU9TIFNhZmFyaVxuICAgIHN0YXJ0RXZlbnQgPSAndG91Y2hzdGFydCc7XG4gIH1cbiAgZWxlbVsgYmluZE1ldGhvZCBdKCBzdGFydEV2ZW50LCB0aGlzICk7XG59O1xuXG4vLyB0cmlnZ2VyIGhhbmRsZXIgbWV0aG9kcyBmb3IgZXZlbnRzXG5wcm90by5oYW5kbGVFdmVudCA9IGZ1bmN0aW9uKCBldmVudCApIHtcbiAgdmFyIG1ldGhvZCA9ICdvbicgKyBldmVudC50eXBlO1xuICBpZiAoIHRoaXNbIG1ldGhvZCBdICkge1xuICAgIHRoaXNbIG1ldGhvZCBdKCBldmVudCApO1xuICB9XG59O1xuXG4vLyByZXR1cm5zIHRoZSB0b3VjaCB0aGF0IHdlJ3JlIGtlZXBpbmcgdHJhY2sgb2ZcbnByb3RvLmdldFRvdWNoID0gZnVuY3Rpb24oIHRvdWNoZXMgKSB7XG4gIGZvciAoIHZhciBpPTA7IGkgPCB0b3VjaGVzLmxlbmd0aDsgaSsrICkge1xuICAgIHZhciB0b3VjaCA9IHRvdWNoZXNbaV07XG4gICAgaWYgKCB0b3VjaC5pZGVudGlmaWVyID09IHRoaXMucG9pbnRlcklkZW50aWZpZXIgKSB7XG4gICAgICByZXR1cm4gdG91Y2g7XG4gICAgfVxuICB9XG59O1xuXG4vLyAtLS0tLSBzdGFydCBldmVudCAtLS0tLSAvL1xuXG5wcm90by5vbm1vdXNlZG93biA9IGZ1bmN0aW9uKCBldmVudCApIHtcbiAgLy8gZGlzbWlzcyBjbGlja3MgZnJvbSByaWdodCBvciBtaWRkbGUgYnV0dG9uc1xuICB2YXIgYnV0dG9uID0gZXZlbnQuYnV0dG9uO1xuICBpZiAoIGJ1dHRvbiAmJiAoIGJ1dHRvbiAhPT0gMCAmJiBidXR0b24gIT09IDEgKSApIHtcbiAgICByZXR1cm47XG4gIH1cbiAgdGhpcy5fcG9pbnRlckRvd24oIGV2ZW50LCBldmVudCApO1xufTtcblxucHJvdG8ub250b3VjaHN0YXJ0ID0gZnVuY3Rpb24oIGV2ZW50ICkge1xuICB0aGlzLl9wb2ludGVyRG93biggZXZlbnQsIGV2ZW50LmNoYW5nZWRUb3VjaGVzWzBdICk7XG59O1xuXG5wcm90by5vbnBvaW50ZXJkb3duID0gZnVuY3Rpb24oIGV2ZW50ICkge1xuICB0aGlzLl9wb2ludGVyRG93biggZXZlbnQsIGV2ZW50ICk7XG59O1xuXG4vKipcbiAqIHBvaW50ZXIgc3RhcnRcbiAqIEBwYXJhbSB7RXZlbnR9IGV2ZW50XG4gKiBAcGFyYW0ge0V2ZW50IG9yIFRvdWNofSBwb2ludGVyXG4gKi9cbnByb3RvLl9wb2ludGVyRG93biA9IGZ1bmN0aW9uKCBldmVudCwgcG9pbnRlciApIHtcbiAgLy8gZGlzbWlzcyByaWdodCBjbGljayBhbmQgb3RoZXIgcG9pbnRlcnNcbiAgLy8gYnV0dG9uID0gMCBpcyBva2F5LCAxLTQgbm90XG4gIGlmICggZXZlbnQuYnV0dG9uIHx8IHRoaXMuaXNQb2ludGVyRG93biApIHtcbiAgICByZXR1cm47XG4gIH1cblxuICB0aGlzLmlzUG9pbnRlckRvd24gPSB0cnVlO1xuICAvLyBzYXZlIHBvaW50ZXIgaWRlbnRpZmllciB0byBtYXRjaCB1cCB0b3VjaCBldmVudHNcbiAgdGhpcy5wb2ludGVySWRlbnRpZmllciA9IHBvaW50ZXIucG9pbnRlcklkICE9PSB1bmRlZmluZWQgP1xuICAgIC8vIHBvaW50ZXJJZCBmb3IgcG9pbnRlciBldmVudHMsIHRvdWNoLmluZGVudGlmaWVyIGZvciB0b3VjaCBldmVudHNcbiAgICBwb2ludGVyLnBvaW50ZXJJZCA6IHBvaW50ZXIuaWRlbnRpZmllcjtcblxuICB0aGlzLnBvaW50ZXJEb3duKCBldmVudCwgcG9pbnRlciApO1xufTtcblxucHJvdG8ucG9pbnRlckRvd24gPSBmdW5jdGlvbiggZXZlbnQsIHBvaW50ZXIgKSB7XG4gIHRoaXMuX2JpbmRQb3N0U3RhcnRFdmVudHMoIGV2ZW50ICk7XG4gIHRoaXMuZW1pdEV2ZW50KCAncG9pbnRlckRvd24nLCBbIGV2ZW50LCBwb2ludGVyIF0gKTtcbn07XG5cbi8vIGhhc2ggb2YgZXZlbnRzIHRvIGJlIGJvdW5kIGFmdGVyIHN0YXJ0IGV2ZW50XG52YXIgcG9zdFN0YXJ0RXZlbnRzID0ge1xuICBtb3VzZWRvd246IFsgJ21vdXNlbW92ZScsICdtb3VzZXVwJyBdLFxuICB0b3VjaHN0YXJ0OiBbICd0b3VjaG1vdmUnLCAndG91Y2hlbmQnLCAndG91Y2hjYW5jZWwnIF0sXG4gIHBvaW50ZXJkb3duOiBbICdwb2ludGVybW92ZScsICdwb2ludGVydXAnLCAncG9pbnRlcmNhbmNlbCcgXSxcbn07XG5cbnByb3RvLl9iaW5kUG9zdFN0YXJ0RXZlbnRzID0gZnVuY3Rpb24oIGV2ZW50ICkge1xuICBpZiAoICFldmVudCApIHtcbiAgICByZXR1cm47XG4gIH1cbiAgLy8gZ2V0IHByb3BlciBldmVudHMgdG8gbWF0Y2ggc3RhcnQgZXZlbnRcbiAgdmFyIGV2ZW50cyA9IHBvc3RTdGFydEV2ZW50c1sgZXZlbnQudHlwZSBdO1xuICAvLyBiaW5kIGV2ZW50cyB0byBub2RlXG4gIGV2ZW50cy5mb3JFYWNoKCBmdW5jdGlvbiggZXZlbnROYW1lICkge1xuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCBldmVudE5hbWUsIHRoaXMgKTtcbiAgfSwgdGhpcyApO1xuICAvLyBzYXZlIHRoZXNlIGFyZ3VtZW50c1xuICB0aGlzLl9ib3VuZFBvaW50ZXJFdmVudHMgPSBldmVudHM7XG59O1xuXG5wcm90by5fdW5iaW5kUG9zdFN0YXJ0RXZlbnRzID0gZnVuY3Rpb24oKSB7XG4gIC8vIGNoZWNrIGZvciBfYm91bmRFdmVudHMsIGluIGNhc2UgZHJhZ0VuZCB0cmlnZ2VyZWQgdHdpY2UgKG9sZCBJRTggYnVnKVxuICBpZiAoICF0aGlzLl9ib3VuZFBvaW50ZXJFdmVudHMgKSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIHRoaXMuX2JvdW5kUG9pbnRlckV2ZW50cy5mb3JFYWNoKCBmdW5jdGlvbiggZXZlbnROYW1lICkge1xuICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCBldmVudE5hbWUsIHRoaXMgKTtcbiAgfSwgdGhpcyApO1xuXG4gIGRlbGV0ZSB0aGlzLl9ib3VuZFBvaW50ZXJFdmVudHM7XG59O1xuXG4vLyAtLS0tLSBtb3ZlIGV2ZW50IC0tLS0tIC8vXG5cbnByb3RvLm9ubW91c2Vtb3ZlID0gZnVuY3Rpb24oIGV2ZW50ICkge1xuICB0aGlzLl9wb2ludGVyTW92ZSggZXZlbnQsIGV2ZW50ICk7XG59O1xuXG5wcm90by5vbnBvaW50ZXJtb3ZlID0gZnVuY3Rpb24oIGV2ZW50ICkge1xuICBpZiAoIGV2ZW50LnBvaW50ZXJJZCA9PSB0aGlzLnBvaW50ZXJJZGVudGlmaWVyICkge1xuICAgIHRoaXMuX3BvaW50ZXJNb3ZlKCBldmVudCwgZXZlbnQgKTtcbiAgfVxufTtcblxucHJvdG8ub250b3VjaG1vdmUgPSBmdW5jdGlvbiggZXZlbnQgKSB7XG4gIHZhciB0b3VjaCA9IHRoaXMuZ2V0VG91Y2goIGV2ZW50LmNoYW5nZWRUb3VjaGVzICk7XG4gIGlmICggdG91Y2ggKSB7XG4gICAgdGhpcy5fcG9pbnRlck1vdmUoIGV2ZW50LCB0b3VjaCApO1xuICB9XG59O1xuXG4vKipcbiAqIHBvaW50ZXIgbW92ZVxuICogQHBhcmFtIHtFdmVudH0gZXZlbnRcbiAqIEBwYXJhbSB7RXZlbnQgb3IgVG91Y2h9IHBvaW50ZXJcbiAqIEBwcml2YXRlXG4gKi9cbnByb3RvLl9wb2ludGVyTW92ZSA9IGZ1bmN0aW9uKCBldmVudCwgcG9pbnRlciApIHtcbiAgdGhpcy5wb2ludGVyTW92ZSggZXZlbnQsIHBvaW50ZXIgKTtcbn07XG5cbi8vIHB1YmxpY1xucHJvdG8ucG9pbnRlck1vdmUgPSBmdW5jdGlvbiggZXZlbnQsIHBvaW50ZXIgKSB7XG4gIHRoaXMuZW1pdEV2ZW50KCAncG9pbnRlck1vdmUnLCBbIGV2ZW50LCBwb2ludGVyIF0gKTtcbn07XG5cbi8vIC0tLS0tIGVuZCBldmVudCAtLS0tLSAvL1xuXG5cbnByb3RvLm9ubW91c2V1cCA9IGZ1bmN0aW9uKCBldmVudCApIHtcbiAgdGhpcy5fcG9pbnRlclVwKCBldmVudCwgZXZlbnQgKTtcbn07XG5cbnByb3RvLm9ucG9pbnRlcnVwID0gZnVuY3Rpb24oIGV2ZW50ICkge1xuICBpZiAoIGV2ZW50LnBvaW50ZXJJZCA9PSB0aGlzLnBvaW50ZXJJZGVudGlmaWVyICkge1xuICAgIHRoaXMuX3BvaW50ZXJVcCggZXZlbnQsIGV2ZW50ICk7XG4gIH1cbn07XG5cbnByb3RvLm9udG91Y2hlbmQgPSBmdW5jdGlvbiggZXZlbnQgKSB7XG4gIHZhciB0b3VjaCA9IHRoaXMuZ2V0VG91Y2goIGV2ZW50LmNoYW5nZWRUb3VjaGVzICk7XG4gIGlmICggdG91Y2ggKSB7XG4gICAgdGhpcy5fcG9pbnRlclVwKCBldmVudCwgdG91Y2ggKTtcbiAgfVxufTtcblxuLyoqXG4gKiBwb2ludGVyIHVwXG4gKiBAcGFyYW0ge0V2ZW50fSBldmVudFxuICogQHBhcmFtIHtFdmVudCBvciBUb3VjaH0gcG9pbnRlclxuICogQHByaXZhdGVcbiAqL1xucHJvdG8uX3BvaW50ZXJVcCA9IGZ1bmN0aW9uKCBldmVudCwgcG9pbnRlciApIHtcbiAgdGhpcy5fcG9pbnRlckRvbmUoKTtcbiAgdGhpcy5wb2ludGVyVXAoIGV2ZW50LCBwb2ludGVyICk7XG59O1xuXG4vLyBwdWJsaWNcbnByb3RvLnBvaW50ZXJVcCA9IGZ1bmN0aW9uKCBldmVudCwgcG9pbnRlciApIHtcbiAgdGhpcy5lbWl0RXZlbnQoICdwb2ludGVyVXAnLCBbIGV2ZW50LCBwb2ludGVyIF0gKTtcbn07XG5cbi8vIC0tLS0tIHBvaW50ZXIgZG9uZSAtLS0tLSAvL1xuXG4vLyB0cmlnZ2VyZWQgb24gcG9pbnRlciB1cCAmIHBvaW50ZXIgY2FuY2VsXG5wcm90by5fcG9pbnRlckRvbmUgPSBmdW5jdGlvbigpIHtcbiAgdGhpcy5fcG9pbnRlclJlc2V0KCk7XG4gIHRoaXMuX3VuYmluZFBvc3RTdGFydEV2ZW50cygpO1xuICB0aGlzLnBvaW50ZXJEb25lKCk7XG59O1xuXG5wcm90by5fcG9pbnRlclJlc2V0ID0gZnVuY3Rpb24oKSB7XG4gIC8vIHJlc2V0IHByb3BlcnRpZXNcbiAgdGhpcy5pc1BvaW50ZXJEb3duID0gZmFsc2U7XG4gIGRlbGV0ZSB0aGlzLnBvaW50ZXJJZGVudGlmaWVyO1xufTtcblxucHJvdG8ucG9pbnRlckRvbmUgPSBub29wO1xuXG4vLyAtLS0tLSBwb2ludGVyIGNhbmNlbCAtLS0tLSAvL1xuXG5wcm90by5vbnBvaW50ZXJjYW5jZWwgPSBmdW5jdGlvbiggZXZlbnQgKSB7XG4gIGlmICggZXZlbnQucG9pbnRlcklkID09IHRoaXMucG9pbnRlcklkZW50aWZpZXIgKSB7XG4gICAgdGhpcy5fcG9pbnRlckNhbmNlbCggZXZlbnQsIGV2ZW50ICk7XG4gIH1cbn07XG5cbnByb3RvLm9udG91Y2hjYW5jZWwgPSBmdW5jdGlvbiggZXZlbnQgKSB7XG4gIHZhciB0b3VjaCA9IHRoaXMuZ2V0VG91Y2goIGV2ZW50LmNoYW5nZWRUb3VjaGVzICk7XG4gIGlmICggdG91Y2ggKSB7XG4gICAgdGhpcy5fcG9pbnRlckNhbmNlbCggZXZlbnQsIHRvdWNoICk7XG4gIH1cbn07XG5cbi8qKlxuICogcG9pbnRlciBjYW5jZWxcbiAqIEBwYXJhbSB7RXZlbnR9IGV2ZW50XG4gKiBAcGFyYW0ge0V2ZW50IG9yIFRvdWNofSBwb2ludGVyXG4gKiBAcHJpdmF0ZVxuICovXG5wcm90by5fcG9pbnRlckNhbmNlbCA9IGZ1bmN0aW9uKCBldmVudCwgcG9pbnRlciApIHtcbiAgdGhpcy5fcG9pbnRlckRvbmUoKTtcbiAgdGhpcy5wb2ludGVyQ2FuY2VsKCBldmVudCwgcG9pbnRlciApO1xufTtcblxuLy8gcHVibGljXG5wcm90by5wb2ludGVyQ2FuY2VsID0gZnVuY3Rpb24oIGV2ZW50LCBwb2ludGVyICkge1xuICB0aGlzLmVtaXRFdmVudCggJ3BvaW50ZXJDYW5jZWwnLCBbIGV2ZW50LCBwb2ludGVyIF0gKTtcbn07XG5cbi8vIC0tLS0tICAtLS0tLSAvL1xuXG4vLyB1dGlsaXR5IGZ1bmN0aW9uIGZvciBnZXR0aW5nIHgveSBjb29yZHMgZnJvbSBldmVudFxuVW5pcG9pbnRlci5nZXRQb2ludGVyUG9pbnQgPSBmdW5jdGlvbiggcG9pbnRlciApIHtcbiAgcmV0dXJuIHtcbiAgICB4OiBwb2ludGVyLnBhZ2VYLFxuICAgIHk6IHBvaW50ZXIucGFnZVlcbiAgfTtcbn07XG5cbi8vIC0tLS0tICAtLS0tLSAvL1xuXG5yZXR1cm4gVW5pcG9pbnRlcjtcblxufSkpO1xuIiwiKGZ1bmN0aW9uICgpIHtcblxuICAgIHZhciBGbGlja2l0eSAgICAgICAgPSByZXF1aXJlKCdmbGlja2l0eScpLFxuICAgIENhcm91c2Vsc1xuXG4gICAgQ2Fyb3VzZWxzID0ge1xuXG4gICAgICAgIGluaXQ6ICgpID0+IHtcblxuICAgICAgICAgICAgQ2Fyb3VzZWxzLmluaXRpYWxpc2VDYXJvdXNlbCgpXG5cbiAgICAgICAgfSxcblxuICAgICAgICBpbml0aWFsaXNlQ2Fyb3VzZWwgIDogKCkgPT4ge1xuXG4gICAgICAgICAgICB2YXIgY2Fyb3VzZWxzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLkpTLS1jYXJvdXNlbCcpXG5cbiAgICAgICAgICAgIGNhcm91c2Vscy5mb3JFYWNoKGNhcm91c2VsID0+IHtcblxuICAgICAgICAgICAgICAgIHZhciBzZXR0aW5ncyA9IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNlbGxBbGlnbiAgIDogJ2NlbnRlcicsICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgICAgICB3cmFwQXJvdW5kICA6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICBhdXRvUGxheSAgICA6IGZhbHNlLFxuICAgICAgICAgICAgICAgICAgICAgICAgaW1hZ2VzTG9hZGVkOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgcGFnZURvdHMgICAgOiBmYWxzZVxuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB2YXIgc2xpZGVzID0gY2Fyb3VzZWwucXVlcnlTZWxlY3RvckFsbCgnLkpTLS1jYXJvdXNlbF9fc2xpZGVXcmFwJylcblxuICAgICAgICAgICAgICAgIGlmKGNhcm91c2VsLmRhdGFzZXQucGxvdENhcm91c2VsVHlwZSA9PSAnaW1hZ2UnKSB7XG4gICAgICAgICAgICAgICAgICAgIHNldHRpbmdzID0ge1xuICAgICAgICAgICAgICAgICAgICAgICAgY2VsbEFsaWduICAgOiAnY2VudGVyJywgIFxuICAgICAgICAgICAgICAgICAgICAgICAgbGF6eUxvYWQgOiAyLFxuICAgICAgICAgICAgICAgICAgICAgICAgd3JhcEFyb3VuZCAgOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgcGFnZURvdHMgOiBmYWxzZVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYoc2xpZGVzLmxlbmd0aCA+IDEpIHtcblxuICAgICAgICAgICAgICAgICAgICB2YXIgZmxrdHkgPSBuZXcgRmxpY2tpdHkoY2Fyb3VzZWwsIHNldHRpbmdzKVxuXG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgXG4gICAgICAgIH0sXG5cbiAgICB9XG5cbiAgICBtb2R1bGUuZXhwb3J0cyA9IENhcm91c2Vsc1xuXG59KCkpXG4iLCIoZnVuY3Rpb24gKCkge1xuXG4gICAgdmFyIEZBUXNcblxuICAgIEZBUXMgPSB7XG4gICAgICAgIHNlY3Rpb25zOiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuZmFxcycpLFxuXG4gICAgICAgIGluaXQ6ICgpID0+IHtcblxuICAgICAgICAgICAgaWYoIUZBUXMuc2VjdGlvbnMpXG4gICAgICAgICAgICAgICAgcmV0dXJuXG5cbiAgICAgICAgICAgIEZBUXMuc2VjdGlvbnMuZm9yRWFjaChzZWN0aW9uID0+IEZBUXMuaW5pdGlhbGlzZUxpc3RlbmVycyhzZWN0aW9uKSlcblxuICAgICAgICB9LFxuXG4gICAgICAgIGluaXRpYWxpc2VMaXN0ZW5lcnM6IChzZWN0aW9uKSA9PiB7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGxldCBmYXFzID0gc2VjdGlvbi5xdWVyeVNlbGVjdG9yQWxsKCcuZmFxJylcblxuICAgICAgICAgICAgZmFxcy5mb3JFYWNoKGZhcSA9PiB7XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgbGV0IHF1ZXN0aW9uID0gZmFxLnF1ZXJ5U2VsZWN0b3IoJy5mYXFfX3F1ZXN0aW9uJylcbiAgICAgICAgICAgICAgICBsZXQgYW5zd2VyICAgPSBmYXEucXVlcnlTZWxlY3RvcignLmZhcV9fYW5zd2VyJylcblxuICAgICAgICAgICAgICAgIHF1ZXN0aW9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuXG4gICAgICAgICAgICAgICAgICAgIGZhcS5jbGFzc0xpc3QudG9nZ2xlKCdmYXEtLW9wZW4nKVxuXG4gICAgICAgICAgICAgICAgICAgIGlmKGZhcS5jbGFzc0xpc3QuY29udGFpbnMoJ2ZhcS0tb3BlbicpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBhbnN3ZXIuc3R5bGUubWF4SGVpZ2h0ID0gYW5zd2VyLnNjcm9sbEhlaWdodCArICdweCdcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGFuc3dlci5zdHlsZS5tYXhIZWlnaHQgPSAwXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIFxuXG4gICAgICAgICAgICAgICAgfSlcblxuICAgICAgICAgICAgfSlcbiAgICAgICAgfVxuXG5cbiAgICB9XG5cbiAgICBtb2R1bGUuZXhwb3J0cyA9IEZBUXNcblxufSgpKVxuIiwiLy8gTGF6eUxvYWQgZm9yIFBsb3QgYnkgSm9uIE1pbGxzLCBNYXR0eSBHbGVuICYgTWljaGFlbCBXYXRzb25cblxuLy8gVGhpcyBtb2R1bGUgbG9hZHMgaW4gaW1hZ2VzIGFzeW5jcm9ub3VzbHkuIEl0IHdpbGwgbG9vayBmb3IgdGhlIGNsYXNzXG4vLyBcIkpTLS1sYXp5TG9hZFwiIGFuZCB0aGVuIGxvb2sgZm9yIGEgZGF0YS1zcmMgb24gaW1hZ2Ugb3IgdmlkZW8gdGFncy4gXG4vLyBJdCB3aWxsIHRoZW4gcmVwbGFjZSB0aGUgc3JjIG9mIHRoYXQgZWxlbWVudCB3aXRoIHRoZSBpbWFnZSBsaW5rZWQgb25cbi8vIHRoZSBkYXRhIGF0dHJpYnV0ZS5cblxuLy8gSWYgdGhlIGVsZW1lbnQgaXMgbm90IGFuIGltYWdlIG9yIGEgdmlkZW8tIGl0IHdpbGwgYXNzaWduIHRoZSBkYXRhLXNyY1xuLy8gYXMgYSBiYWNrZ3JvdW5kIGltYWdlLiBcblxuLy8gSWYgdGhlIHNjcmVlbiBzaXplIGlzIGxlc3MgdGhhbiB0aGUgZGVmaW5lZCBtb2JpbGVCcmVha3BvaW50LCB3ZSBsb2FkXG4vLyB0aGUgc3JjIGZyb20gZGF0YS1zbWFsbC1zcmMgaW5zdGVhZC4gXG5cbi8vIENyZWF0aW9uIG9mIHRoZXNlIHZpZGVvIGFuZCBpbWFnZSBvYmplY3RzIGNhbiBiZSBtYWRlIHVzaW5nIHRoZSBQSFBcbi8vIGhlbHBlciBpbiBsaWIvaGVscGVycy5waHAgcGxvdExhenlMb2FkKClcblxuLy8gSWYgd2UgbmVlZCB0byBzdGlwdWxhdGUgdGhlIGhlaWdodCBvZiBhbiBpbWFnZSBiZWZvcmUgaXQgbG9hZHMsIHRvIGF2b2lkXG4vLyBhbnkganVtcGluZXNzLCB3ZSBjYW4gcGFzcyB0aHJvdWdoIGEgcmF0aW8gKHcvaCkgb2YgdGhlIGltYWdlIHNvIGl0J3Ncbi8vIHNldCBiZWZvcmUgdGhlIGltYWdlIGxvYWRzLlxuXG4vLyBXZSBhbHNvIGhhbmRsZSBhdXRvcGxheWluZyB2aWRlb3MsIGlmIHRoZSB2aWRlbyBoYXMgYW4gYXV0b3BsYXkgYXR0cmlidXRlLlxuLy8gSXQgd2lsbCBwYXVzZSBhbmQgcGxheSB2aWRlb3MgYXBwcm9wcmlhdGVseSBkZXBlbmRpbmcgb24gaWYgdGhleSdyZSBpblxuLy8gdmlldyBvciBub3QuXG5cbihmdW5jdGlvbigpe1xuXG4gICAgdmFyIExhenlMb2FkXG5cbiAgICBMYXp5TG9hZCA9IHtcbiAgICAgICAgbW9iaWxlQnJlYWtwb2ludCA6IDY0MCxcbiAgICAgICAgaW1hZ2VzIDogICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5KUy0tbGF6eUxvYWQnKSxcbiAgICAgICAgY29uZmlnIDoge1xuICAgICAgICAgICAgcm9vdE1hcmdpbjogJzBweCcsXG4gICAgICAgICAgICB0aHJlc2hvbGQ6IDAuMDFcbiAgICAgICAgfSxcbiAgICAgICAgb2JzZXJ2ZXIgOiBudWxsLFxuICAgICAgICBpbml0IDogZnVuY3Rpb24oKXsgXG5cbiAgICAgICAgICAgIExhenlMb2FkLm9ic2VydmVyID0gbmV3IEludGVyc2VjdGlvbk9ic2VydmVyKExhenlMb2FkLmhhbmRsZUltYWdlTG9hZCwgTGF6eUxvYWQuY29uZmlnKVxuXG4gICAgICAgICAgICBMYXp5TG9hZC5sb2FkSW1hZ2VzKClcbiAgICAgICAgICAgIFxuICAgICAgICB9LFxuXG4gICAgICAgIGxvYWRJbWFnZXMgOiAoKSA9PiB7IFxuXG4gICAgICAgICAgICBMYXp5TG9hZC5pbWFnZXMuZm9yRWFjaCggaW1hZ2UgPT4geyAgXG5cbiAgICAgICAgICAgICAgICBMYXp5TG9hZC5vYnNlcnZlci5vYnNlcnZlKGltYWdlKVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgfSxcblxuICAgICAgICBhZGRFbGVtZW50cyA6IGVsZW1lbnRzID0+IHtcblxuICAgICAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUscmVqZWN0KXtcblxuICAgICAgICAgICAgICAgIGVsZW1lbnRzLmZvckVhY2goIGltYWdlID0+IHsgICAgICAgXG4gICAgICAgICAgICAgICAgICAgIExhenlMb2FkLm9ic2VydmVyLm9ic2VydmUoaW1hZ2UpXG4gICAgICAgICAgICAgICAgfSlcblxuICAgICAgICAgICAgICAgIHJlc29sdmUoKVxuXG4gICAgICAgICAgICB9KVxuICAgICAgICB9LFxuXG4gICAgICAgIGhhbmRsZUltYWdlTG9hZCA6IGVudHJpZXMgPT4geyAgICAgICAgICAgICAgICAgICAgICAgIFxuXG4gICAgICAgICAgICBlbnRyaWVzLmZvckVhY2goIGVudHJ5ID0+IHtcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICBsZXQgZWxlbWVudCA9IGVudHJ5LnRhcmdldFxuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIGlmKCFlbGVtZW50LmNsYXNzTGlzdC5jb250YWlucygnbG9hZGVkJykgJiYgIWVsZW1lbnQuY2xhc3NMaXN0LmNvbnRhaW5zKCdsb2FkaW5nJykpIHsgXG5cbiAgICAgICAgICAgICAgICAgICAgaWYoIWVudHJ5LmlzSW50ZXJzZWN0aW5nKVxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuXG4gICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICBlbGVtZW50LmNsYXNzTGlzdC5hZGQoJ2xvYWRpbmcnKVxuXG4gICAgICAgICAgICAgICAgICAgIHZhciB0YWcgPSBlbnRyeS5pc0ludGVyc2VjdGluZyAmJiBlbGVtZW50LnRhZ05hbWVcblxuICAgICAgICAgICAgICAgICAgICBsZXQgc3JjID0gZWxlbWVudC5kYXRhc2V0LnNyY1xuXG4gICAgICAgICAgICAgICAgICAgIGlmKExhenlMb2FkLmlzU21hbGxTY3JlZW4oKSAmJiBlbGVtZW50LmRhdGFzZXQuc21hbGxTcmMpIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgc3JjID0gZWxlbWVudC5kYXRhc2V0LnNtYWxsU3JjXG5cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgaWYodGFnID09IFwiVklERU9cIikge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBpZihMYXp5TG9hZC5pc1NtYWxsU2NyZWVuKCkgJiYgZWxlbWVudC5kYXRhc2V0LnNtYWxsU3JjKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbGVtZW50LnNyYyA9IGVsZW1lbnQuZGF0YXNldC5zbWFsbFNyY1xuXG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsZW1lbnQuc3JjID0gZWxlbWVudC5kYXRhc2V0LnNyY1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKGVsZW1lbnQuZ2V0QXR0cmlidXRlKCdhdXRvcGxheScpKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxlbWVudC5wbGF5KClcbiAgICAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgZWxlbWVudC5jbGFzc0xpc3QuYWRkKCdsb2FkZWQnKVxuXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIExhenlMb2FkLmdldEltYWdlKHNyYywgZWxlbWVudCkudGhlbiggZGF0YSA9PiB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgdGFnID0gZWxlbWVudC50YWdOYW1lXG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZih0YWcgPT0gXCJJTUdcIikge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGEuZWxlbWVudC5zcmMgPSBkYXRhLnNyY1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhLmVsZW1lbnQuc3R5bGUuYmFja2dyb3VuZEltYWdlID0gJ3VybCgnICsgZGF0YS5zcmMgKyAnKSdcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGEuZWxlbWVudC5jbGFzc0xpc3QuYWRkKCdsb2FkZWQnKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGEuZWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKCdsb2FkaW5nJylcblxuICAgICAgICAgICAgICAgICAgICAgICAgfSkuY2F0Y2goIGVycm9yZWRTcmMgPT57XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlcnJvcmVkU3JjLCAnaW1hZ2Ugbm90IGZvdW5kJylcblxuICAgICAgICAgICAgICAgICAgICAgICAgfSlcblxuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuXG4gICAgICAgICAgICAgICAgICAgIGlmKGVsZW1lbnQudGFnTmFtZSA9PSBcIlZJREVPXCIpIFxuXG4gICAgICAgICAgICAgICAgICAgICAgICBpZihlbGVtZW50LmdldEF0dHJpYnV0ZSgnYXV0b3BsYXknKSkgXG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZighZW50cnkuaXNJbnRlcnNlY3RpbmcgJiYgZWxlbWVudC5wYXVzZWQgPT0gZmFsc2UpIFxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsZW1lbnQucGF1c2UoKVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsZW1lbnQucGxheSgpXG5cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIH0pXG4gICAgICAgIH0sXG5cbiAgICAgICAgZ2V0SW1hZ2U6IChzcmMsIGVsZW1lbnQpID0+IHtcblxuICAgICAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUscmVqZWN0KXtcblxuICAgICAgICAgICAgICAgIHZhciBpbWcgPSBuZXcgSW1hZ2UoKVxuXG4gICAgICAgICAgICAgICAgaW1nLm9ubG9hZCA9ICgpID0+IHtcblxuICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNyYzogc3JjLFxuICAgICAgICAgICAgICAgICAgICAgICAgZWxlbWVudDogZWxlbWVudFxuICAgICAgICAgICAgICAgICAgICB9KVxuXG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaW1nLm9uZXJyb3IgPSAoKSA9PiB7XG5cbiAgICAgICAgICAgICAgICAgICAgcmVqZWN0KHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNyYzogc3JjLFxuICAgICAgICAgICAgICAgICAgICAgICAgZWxlbWVudDogZWxlbWVudFxuICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGltZy5zcmMgPSBzcmNcbiAgICAgICAgICAgIH0pXG5cbiAgICAgICAgfSxcblxuICAgICAgICBpc1NtYWxsU2NyZWVuIDogKCkgPT4ge1xuXG4gICAgICAgICAgICBpZih3aW5kb3cuaW5uZXJXaWR0aCA8IExhenlMb2FkLm1vYmlsZUJyZWFrcG9pbnQpXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWVcbiAgICAgICAgICAgIFxuXG4gICAgICAgICAgICByZXR1cm4gZmFsc2VcblxuICAgICAgICB9XG5cblxuICAgIH1cblxuICAgIG1vZHVsZS5leHBvcnRzID0gTGF6eUxvYWRcblxufSkoKVxuXG4iLCIvLyBNb2RhbHMgZm9yIFBsb3QgYnkgTWljaGFlbCBXYXRzb25cbi8vIEEgc2ltcGxlIG1vZGFscyBzb2x1dGlvbiB0aGF0IGxvb2tzIGZvciB0aGUgY2xhc3MgXCJKUy0tcGxvdE1vZGFsQnV0dG9uXCJcbi8vIEFuZCB3aGVuIGNsaWNrZWQsIHJlYWRzIHRoZSB2YWx1ZSBzZXQgb24gZGF0YS1wbG90LW1vZGFsLiBpdCB0aGVuIGxvb2tzXG4vLyBmb3IgYW4gSFRNTCBlbGVtZW50IGNhbGxlZCBcIi5KUy0tcGxvdE1vZGFsQ29udGVudHNcIiB3aXRoIGEgY29ycmVzcG9uZGluZyB2YWx1ZS5cblxuLy8gRm9yIGV4YW1wbGUsIDxhIGNsYXNzPVwiSlMtLXBsb3RNb2RhbEJ1dHRvblwiIGRhdGEtcGxvdC1tb2RhbD1cIjFcIj5DbGljayBtZTwvYT5cbi8vIFdpbGwgZmluZCB0aGUgZm9sbG93aW5nIGVsZW1lbnQ6XG4vLyA8ZGl2IGNsYXNzPVwiSlMtLXBsb3RNb2RhbENvbnRlbnRzXCI+SSBhbSBzb21lIG1vZGFsIGNvbnRlbnQhPC9kaXY+XG4vLyBBbmQgd2lsbCB0YWtlIHRoZSBpbm5lckhUTUwgdG8gcHV0IGluc2lkZSBhIG1vZGFsIG9uIHRoZSBzY3JlZW4uXG5cbi8vIEdhbGxlcmllcyBjYW4gYmUgY3JlYXRlZCBieSBjb25uZWN0aW5nIG11bHRpcGxlIFBsb3QgTW9kYWwgQnV0dG9uc1xuLy8gYnkgZ2l2aW5nIHRoZW0gYSBkYXRhLXBsb3QtbW9kYWwtZ3JvdXAgb3B0aW9uLlxuLy8gVGhleSB3aWxsIHRoZW4gaGF2ZSB3b3JraW5nIGxlZnQgYW5kIHJpZ2h0IGFycm93cyB0byBuYXZpZ2F0ZSB0aHJvdWdoXG4vLyBDb250ZW50cyBpbiBhIGxvb3AuXG5cbihmdW5jdGlvbiAoKSB7XG5cbiAgICB2YXIgTGF6eUxvYWQgICAgICAgICA9IHJlcXVpcmUoJy4vbGF6eWxvYWQnKSwgIFxuICAgICAgICBQbG90ICAgICAgICAgICAgID0gcmVxdWlyZSgnLi9wbG90JyksXG4gICAgICAgIEJvZHlTY3JvbGxMb2NrICAgPSByZXF1aXJlKCdib2R5LXNjcm9sbC1sb2NrJyksXG4gICAgICAgIE1vZGFsc1xuXG4gICAgTW9kYWxzID0ge1xuICAgICAgICBjdXJyZW50R3JvdXBJdGVtICAgIDogMCxcbiAgICAgICAgZ3JvdXBMaW5rcyAgICAgICAgICA6IFtdLCAgXG4gICAgICAgIGN1cnJlbnRNb2RhbElkICAgICAgOiBudWxsLFxuICAgICAgICBpc09wZW4gICAgICAgICAgICAgIDogZmFsc2UsXG4gICAgICAgIGlzTG9hZGluZyAgICAgICAgICAgOiBmYWxzZSxcbiAgICAgICAgY29udHJvbHNUaW1lciAgICAgICA6IGZhbHNlLFxuICAgICAgICBtb2RhbENvbnRlbnQgICAgICAgIDogZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLkpTLS1wbG90TW9kYWxSZXBsYWNlQ29udGVudHMnKSxcbiAgICAgICAgbW9kYWxHcm91cENvbnRyb2xzICA6IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5KUy0tcGxvdE1vZGFsQ29udHJvbHMnKSxcbiAgICAgICAgbW9kYWxHcm91cE5leHQgICAgICA6IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5KUy0tcGxvdE1vZGFsQ29udHJvbHNfX25leHQnKSxcbiAgICAgICAgbW9kYWxHcm91cEJhY2sgICAgICA6IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5KUy0tcGxvdE1vZGFsQ29udHJvbHNfX2JhY2snKSxcbiAgICAgICAgcGxvdE1vZGFsICAgICAgICAgICA6IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5KUy0tcGxvdE1vZGFsJyksXG5cblxuICAgICAgICBpbml0OiBmdW5jdGlvbiAoKSB7XG5cbiAgICAgICAgICAgIE1vZGFscy5jcmVhdGVMaXN0ZW5lcnMoKVxuICAgICAgICAgICAgTW9kYWxzLmNoZWNrRm9yTW9kYWxOb3RpZmljYXRpb24oKVxuICAgICAgICB9LFxuXG4gICAgICAgIGNyZWF0ZUxpc3RlbmVyczogZnVuY3Rpb24gKCkge1xuXG4gICAgICAgICAgICBjb25zdCBjbG9zZUJ1dHRvbnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuSlMtLWNsb3NlUGxvdE1vZGFsJylcblxuICAgICAgICAgICAgZm9yKHZhciBjbG9zZUJ1dHRvbiBvZiBjbG9zZUJ1dHRvbnMpIHtcbiAgICAgICAgICAgICAgICBjbG9zZUJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsZnVuY3Rpb24oZSl7XG4gICAgICAgICAgICAgICAgICAgICBpZiAoZS50YXJnZXQgIT09IHRoaXMpXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm5cbiAgICAgICAgICAgICAgICAgICAgIE1vZGFscy5jbG9zZVBsb3RNb2RhbCgpXG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgTW9kYWxzLnBsb3RNb2RhbC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW1vdmUnLGZ1bmN0aW9uKCl7XG5cbiAgICAgICAgICAgICAgICBpZihNb2RhbHMuY3VycmVudE1vZGFsSWQgJiYgIVBsb3QuaXNUb3VjaERldmljZSgpKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYoTW9kYWxzLmNvbnRyb2xzVGltZXIpXG4gICAgICAgICAgICAgICAgICAgICAgICBjbGVhclRpbWVvdXQoTW9kYWxzLmNvbnRyb2xzVGltZXIpXG4gICAgICAgIFxuICAgICAgICAgICAgICAgICAgICBpZihNb2RhbHMucGxvdE1vZGFsLmNsYXNzTGlzdC5jb250YWlucygnaGlkZUNvbnRyb2xzJykpXG4gICAgICAgICAgICAgICAgICAgICAgICBNb2RhbHMucGxvdE1vZGFsLmNsYXNzTGlzdC5yZW1vdmUoJ2hpZGVDb250cm9scycpXG5cbiAgICAgICAgICAgICAgICAgICAgTW9kYWxzLmNvbnRyb2xzVGltZXIgPSBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBNb2RhbHMucGxvdE1vZGFsLmNsYXNzTGlzdC5hZGQoJ2hpZGVDb250cm9scycpXG5cbiAgICAgICAgICAgICAgICAgICAgfSwyMjAwKVxuXG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnNpdGVXcmFwJykuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbihlKXtcbiAgICAgICAgICAgICAgICBpZihlLnRhcmdldC5jbG9zZXN0KCdbZGF0YS1wbG90LW1vZGFsXScpKSB7XG4gICAgICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKVxuICAgICAgICAgICAgICAgICAgICBNb2RhbHMub3BlblBsb3RNb2RhbChlLnRhcmdldC5jbG9zZXN0KCdbZGF0YS1wbG90LW1vZGFsXScpKVxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgfSlcblxuICAgICAgICAgICAgaWYoTW9kYWxzLm1vZGFsR3JvdXBCYWNrKSB7XG5cbiAgICAgICAgICAgICAgICBNb2RhbHMubW9kYWxHcm91cEJhY2suYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLE1vZGFscy50cmlnZ2VyQmFja0dyb3VwSXRlbSk7XG5cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYoTW9kYWxzLm1vZGFsR3JvdXBOZXh0KSB7XG5cbiAgICAgICAgICAgICAgICBNb2RhbHMubW9kYWxHcm91cE5leHQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLE1vZGFscy50cmlnZ2VyTmV4dEdyb3VwSXRlbSk7XG5cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIChlKSA9PiB7XG5cbiAgICAgICAgICAgICAgICBpZihlLndoaWNoID09IDM5ICYmIE1vZGFscy5ncm91cExpbmtzLmxlbmd0aCA+IDApIHtcblxuICAgICAgICAgICAgICAgICAgICBNb2RhbHMudHJpZ2dlck5leHRHcm91cEl0ZW0oKVxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmKGUud2hpY2ggPT0gMzcgJiYgTW9kYWxzLmdyb3VwTGlua3MubGVuZ3RoID4gMCkge1xuXG4gICAgICAgICAgICAgICAgICAgIE1vZGFscy50cmlnZ2VyQmFja0dyb3VwSXRlbSgpXG5cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgaWYoTW9kYWxzLmlzT3BlbiAmJiBlLndoaWNoPT0yNykge1xuXG4gICAgICAgICAgICAgICAgICAgIE1vZGFscy5jbG9zZVBsb3RNb2RhbCgpXG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB9KTtcblxuICAgICAgICB9LFxuXG5cbiAgICAgICAgY2hlY2tGb3JNb2RhbE5vdGlmaWNhdGlvbiA6ICgpID0+IHtcblxuICAgICAgICAgICAgY29uc3Qgbm90aWZpY2F0aW9uVHJpZ2dlciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5KUy0tZmFrZUJ1dHRvbkZvck1vZGFsTm90aWZpY2F0aW9ucycpXG5cbiAgICAgICAgICAgIGlmKG5vdGlmaWNhdGlvblRyaWdnZXIpIHtcblxuICAgICAgICAgICAgICAgIGlmIChzZXNzaW9uU3RvcmFnZS5nZXRJdGVtKCdwbG90SGFzTm90aWZpY2F0aW9uRmlyZWQnKSAhPT0gXCIxXCIpIHsgXG5cbiAgICAgICAgICAgICAgICAgICAgc2Vzc2lvblN0b3JhZ2Uuc2V0SXRlbSgncGxvdEhhc05vdGlmaWNhdGlvbkZpcmVkJywgJzEnKTtcblxuICAgICAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBNb2RhbHMub3BlblBsb3RNb2RhbChub3RpZmljYXRpb25UcmlnZ2VyKVxuXG4gICAgICAgICAgICAgICAgICAgIH0sbm90aWZpY2F0aW9uVHJpZ2dlci5kYXRhc2V0LnBsb3ROb3RpZmljYXRpb25XYWl0KjEwMDApXG5cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIH1cblxuICAgICAgICB9LFxuXG4gICAgICAgIHRyaWdnZXJCYWNrR3JvdXBJdGVtIDogKCkgPT4ge1xuXG4gICAgICAgICAgICBNb2RhbHMuY3VycmVudEdyb3VwSXRlbS0tXG5cbiAgICAgICAgICAgIGlmKE1vZGFscy5jdXJyZW50R3JvdXBJdGVtIDwgMCkge1xuXG4gICAgICAgICAgICAgICAgTW9kYWxzLmN1cnJlbnRHcm91cEl0ZW0gPSBNb2RhbHMuZ3JvdXBMaW5rcy5sZW5ndGggLSAxO1xuXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIE1vZGFscy5vcGVuUGxvdE1vZGFsKE1vZGFscy5ncm91cExpbmtzW01vZGFscy5jdXJyZW50R3JvdXBJdGVtXSlcblxuICAgICAgICB9LFxuXG4gICAgICAgIHRyaWdnZXJOZXh0R3JvdXBJdGVtIDogKCkgPT4ge1xuXG4gICAgICAgICAgICBNb2RhbHMuY3VycmVudEdyb3VwSXRlbSsrXG5cbiAgICAgICAgICAgIGlmKE1vZGFscy5jdXJyZW50R3JvdXBJdGVtID09IE1vZGFscy5ncm91cExpbmtzLmxlbmd0aCkge1xuXG4gICAgICAgICAgICAgICAgTW9kYWxzLmN1cnJlbnRHcm91cEl0ZW0gPSAwXG5cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgTW9kYWxzLm9wZW5QbG90TW9kYWwoTW9kYWxzLmdyb3VwTGlua3NbTW9kYWxzLmN1cnJlbnRHcm91cEl0ZW1dKVxuXG4gICAgICAgIH0sXG5cbiAgICAgICAgb3BlblBsb3RNb2RhbDogKGVsZW1lbnQpID0+IHtcblxuICAgICAgICAgICAgaWYoTW9kYWxzLmlzTG9hZGluZyA9PSB0cnVlKVxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZVxuXG4gICAgICAgICAgICB2YXIgc2V0dGluZ3MgPSB7XG4gICAgICAgICAgICAgICAgdHlwZSAgICAgICAgICAgIDogJ2lubGluZScsIC8vIChpbmxpbmV8YWpheCkgaWYgdGhlIGNvbnRlbnQgaXMgYWxyZWFkeSBpbiB0aGUgZG9tIG9yIG5vdFxuICAgICAgICAgICAgICAgIGdyb3VwSWQgICAgICAgICA6ICcnLCAvL1RoZSBvcHRpb25hbCBJRCBvZiB0aGUgZ3JvdXAgb2YgbW9kYWxzIHVzZWQgZm9yIGdhbGxlcnkgdmlld3NcbiAgICAgICAgICAgICAgICBjb250ZW50c0lkICAgICAgOiAnJywgLy9UaGUgSUQgdGhhdCByZWZlcmVuY2VzIHdoZXJlLCBvbiB0aGUgcGFnZSwgdGhlIGNvbnRlbnQgdG8gdXNlIGxpdmVzXG4gICAgICAgICAgICAgICAgdGVtcGxhdGVQYXJ0ICAgIDogJycsIC8vVGhlIHRlbXBsYXRlIHBhcnQgdG8gbG9hZCwgaWYgQUpBWFxuICAgICAgICAgICAgICAgIGFqYXhEYXRhICAgICAgICA6IHt9LCAvL0RhdGEgdG8gc2VuZCB2aWEgQUpBWFxuICAgICAgICAgICAgICAgIG1vZGFsQ2xhc3MgICAgICA6ICcnIC8vQSBjdXN0b20gY2xhc3MgdG8gYWRkIHRvIG91ciBtb2RhbFxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBNb2RhbHMuaXNMb2FkaW5nID0gdHJ1ZVxuXG4gICAgICAgICAgICBpZihlbGVtZW50LmRhdGFzZXQucGxvdE1vZGFsVHlwZSA9PSAnYWpheCcpIHtcbiAgICAgICAgICAgICAgICBzZXR0aW5ncy50eXBlID0gJ2FqYXgnXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHNldHRpbmdzLmNvbnRlbnRzSWQgICAgID0gZWxlbWVudC5kYXRhc2V0LnBsb3RNb2RhbENvbnRlbnRzXG4gICAgICAgICAgICBzZXR0aW5ncy5ncm91cElkICAgICAgICA9IGVsZW1lbnQuZGF0YXNldC5wbG90TW9kYWxHcm91cFxuICAgICAgICAgICAgc2V0dGluZ3MudGVtcGxhdGVQYXJ0ICAgPSBlbGVtZW50LmRhdGFzZXQucGxvdE1vZGFsVGVtcGxhdGVQYXJ0XG4gICAgICAgICAgICBzZXR0aW5ncy5tb2RhbENsYXNzICAgICA9IGVsZW1lbnQuZGF0YXNldC5wbG90TW9kYWxDbGFzc1xuXG4gICAgICAgICAgICBpZighc2V0dGluZ3MuY29udGVudHNJZCAmJiBzZXR0aW5ncy50eXBlID09ICdpbmxpbmUnKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ0lubGluZSBNb2RhbHMgbmVlZCBhIHBsb3QtbW9kYWwtY29udGVudHMgdmFyaWFibGUgYWRkZWQnKVxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZihzZXR0aW5ncy50eXBlID09ICdhamF4JyAmJiAhc2V0dGluZ3MudGVtcGxhdGVQYXJ0KSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ0FqYXggbW9kYWxzIG5lZWQgYSBwbG90LW1vZGFsLXRlbXBsYXRlLXBhcnQgdmFyaWFibGUgYWRkZWQnKVxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvL0NoZWNrIHRvIHNlZSBpZiBpdCdzIHBhcnQgb2YgYSBncm91cFxuICAgICAgICAgICAgXG4gICAgICAgICAgICBpZihNb2RhbHMuZ3JvdXBMaW5rcy5sZW5ndGggPT0gMCAmJiBzZXR0aW5ncy5ncm91cElkKVxuICAgICAgICAgICAgICAgTW9kYWxzLmluaXRpYWxpc2VHcm91cChlbGVtZW50KVxuICAgICAgICAgICAgXG4gICAgICAgICAgICBpZighc2V0dGluZ3MuZ3JvdXBJZClcbiAgICAgICAgICAgICAgICBNb2RhbHMubW9kYWxHcm91cENvbnRyb2xzLmNsYXNzTGlzdC5hZGQoJ2hpZGRlbicpXG5cbiAgICAgICAgICAgIGlmKHNldHRpbmdzLm1vZGFsQ2xhc3MpIHtcbiAgICAgICAgICAgICAgICBNb2RhbHMucGxvdE1vZGFsLmNsYXNzTGlzdC5hZGQoc2V0dGluZ3MubW9kYWxDbGFzcylcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYoc2V0dGluZ3MudHlwZSA9PSAnaW5saW5lJykge1xuXG4gICAgICAgICAgICAgICAgTW9kYWxzLmN1cnJlbnRNb2RhbElkID0gc2V0dGluZ3MuY29udGVudHNJZFxuXG4gICAgICAgICAgICAgICAgLy9GaW5kIGNvbnRlbnQgdG8gaW5zZXJ0IGluIG91ciBtb2RhbFxuICAgICAgICAgICAgICAgIHZhciBwbG90TW9kYWxDb250ZW50cyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5KUy0tcGxvdE1vZGFsQ29udGVudHNbZGF0YS1wbG90LW1vZGFsLWNvbnRlbnRzPVwiJyArIE1vZGFscy5jdXJyZW50TW9kYWxJZCArICdcIl0nKVxuXG4gICAgICAgICAgICAgICAgaWYoIXBsb3RNb2RhbENvbnRlbnRzLmxlbmd0aCA9PSAwKVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2VcblxuICAgICAgICAgICAgICAgIHBsb3RNb2RhbENvbnRlbnRzID0gcGxvdE1vZGFsQ29udGVudHMuaW5uZXJIVE1MO1xuXG4gICAgICAgICAgICAgICAgTW9kYWxzLnB1dENvbnRlbnRzSW50b01vZGFsKHBsb3RNb2RhbENvbnRlbnRzKVxuXG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIC8vQUpBWCBsb2FkaW5nIGNvbnRlbnRcbiAgICAgICAgICAgICAgICB2YXIgYWpheERhdGEgPSB7fVxuXG4gICAgICAgICAgICAgICAgZG9jdW1lbnQuYm9keS5jbGFzc0xpc3QuYWRkKCdwbG90TW9kYWxMb2FkaW5nQWpheCcpXG5cbiAgICAgICAgICAgICAgICBmb3IoY29uc3Qga2V5IGluIGVsZW1lbnQuZGF0YXNldCkge1xuICAgICAgICAgICAgICAgICAgICBpZihrZXkuc3Vic3RyaW5nKDAsMTMpID09ICdwbG90TW9kYWxEYXRhJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgYWpheERhdGFba2V5LmNoYXJBdCgxMykudG9Mb3dlckNhc2UoKSArIGtleS5zdWJzdHJpbmcoMTQpXSA9IGVsZW1lbnQuZGF0YXNldFtrZXldXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIGNvbnN0IGFyZ3MgPSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybk9yV3JpdGUgICA6ICdyZXR1cm4nLFxuICAgICAgICAgICAgICAgICAgICB0ZW1wbGF0ZVBhcnQgICAgOiBzZXR0aW5ncy50ZW1wbGF0ZVBhcnQsXG4gICAgICAgICAgICAgICAgICAgIGRhdGEgICAgICAgICAgICA6IGFqYXhEYXRhXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIFBsb3QubG9hZFRlbXBsYXRlUGFydChhcmdzKS50aGVuKGh0bWwgPT4ge1xuICAgICAgICAgICAgICAgICAgICBNb2RhbHMucHV0Q29udGVudHNJbnRvTW9kYWwoaHRtbClcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgfVxuXG4gICAgICAgIH0sXG5cbiAgICAgICAgcHV0Q29udGVudHNJbnRvTW9kYWwgOiBjb250ZW50cyA9PiAge1xuXG5cbiAgICAgICAgICAgIE1vZGFscy5tb2RhbENvbnRlbnQuc3R5bGUubWluSGVpZ2h0ID0gTW9kYWxzLm1vZGFsQ29udGVudC5jbGllbnRIZWlnaHQgKyAncHgnXG4gICAgICAgICAgICBNb2RhbHMubW9kYWxDb250ZW50LmlubmVySFRNTCA9IGNvbnRlbnRzXG5cbiAgICAgICAgICAgIEJvZHlTY3JvbGxMb2NrLmRpc2FibGVCb2R5U2Nyb2xsKE1vZGFscy5wbG90TW9kYWwpXG5cbiAgICAgICAgICAgIGRvY3VtZW50LmJvZHkuY2xhc3NMaXN0LmFkZCgncGxvdE1vZGFsSW5WaWV3JylcblxuICAgICAgICAgICAgY29uc3QgbmV3SW1hZ2VzID0gTW9kYWxzLm1vZGFsQ29udGVudC5xdWVyeVNlbGVjdG9yQWxsKCdpbWcnKVxuXG4gICAgICAgICAgICBMYXp5TG9hZC5hZGRFbGVtZW50cyhuZXdJbWFnZXMpLnRoZW4oKCkgPT4ge1xuXG4gICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKT0+IHtcblxuICAgICAgICAgICAgICAgICAgICBNb2RhbHMubW9kYWxDb250ZW50LnN0eWxlLm1pbkhlaWdodCA9IDBcblxuICAgICAgICAgICAgICAgIH0sNTApXG5cbiAgICAgICAgICAgIH0pXG5cbiAgICAgICAgICAgIGNvbnN0IG5ld1ZpZGVvcyA9IE1vZGFscy5tb2RhbENvbnRlbnQucXVlcnlTZWxlY3RvckFsbCgndmlkZW8nKVxuXG5cblxuICAgICAgICAgICAgbmV3VmlkZW9zLmZvckVhY2godmlkZW8gPT57XG5cbiAgICAgICAgICAgICAgICB2YXIgcGxheWVyID0gbmV3IE1lZGlhRWxlbWVudFBsYXllcih2aWRlbywvKiBPcHRpb25zICovKTtcbiAgICAgICAgICAgICAgICBwbGF5ZXIucGxheSgpO1xuXG4gICAgICAgICAgICB9KVxuXG4gICAgICAgICAgICBNb2RhbHMuaXNPcGVuID0gdHJ1ZVxuICAgICAgICAgICAgTW9kYWxzLmlzTG9hZGluZyA9IGZhbHNlXG4gICAgICAgICAgICBkb2N1bWVudC5ib2R5LmNsYXNzTGlzdC5yZW1vdmUoJ3Bsb3RNb2RhbExvYWRpbmdBamF4JylcblxuICAgICAgICB9LFxuXG4gICAgICAgIGluaXRpYWxpc2VHcm91cCA6IChlbGVtZW50KSA9PiB7XG5cbiAgICAgICAgICAgIE1vZGFscy5ncm91cExpbmtzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnW2RhdGEtcGxvdC1tb2RhbC1ncm91cD1cIicrZWxlbWVudC5kYXRhc2V0LnBsb3RNb2RhbEdyb3VwKydcIl0nKVxuXG4gICAgICAgICAgICB2YXIgaSA9IDBcblxuICAgICAgICAgICAgZm9yKHZhciBncm91cExpbmsgb2YgTW9kYWxzLmdyb3VwTGlua3MpIHtcblxuICAgICAgICAgICAgICAgIGlmKGVsZW1lbnQgPT0gZ3JvdXBMaW5rKVxuICAgICAgICAgICAgICAgICAgICBNb2RhbHMuY3VycmVudEdyb3VwSXRlbSA9IGk7XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgaSsrXG5cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYoTW9kYWxzLmN1cnJlbnRNb2RhbElkICYmICFQbG90LmlzVG91Y2hEZXZpY2UoKSlcblxuICAgICAgICAgICAgICAgIE1vZGFscy5jb250cm9sc1RpbWVyID0gc2V0VGltZW91dChmdW5jdGlvbigpIHtcblxuICAgICAgICAgICAgICAgICAgICBNb2RhbHMucGxvdE1vZGFsLmNsYXNzTGlzdC5hZGQoJ2hpZGVDb250cm9scycpXG5cbiAgICAgICAgICAgICAgICB9LDMwMDApXG5cbiAgICAgICAgICAgIE1vZGFscy5tb2RhbEdyb3VwQ29udHJvbHMuY2xhc3NMaXN0LnJlbW92ZSgnaGlkZGVuJylcblxuICAgICAgICB9LFxuXG4gICAgICAgIGNsb3NlUGxvdE1vZGFsOiAoKSA9PiB7XG4gICAgXG4gICAgICAgICAgICBkb2N1bWVudC5ib2R5LmNsYXNzTGlzdC5yZW1vdmUoJ3Bsb3RNb2RhbEluVmlldycpXG5cbiAgICAgICAgICAgIE1vZGFscy5jdXJyZW50TW9kYWxJZCA9IG51bGxcblxuICAgICAgICAgICAgTW9kYWxzLnBsb3RNb2RhbC5jbGFzc0xpc3QgPSAnSlMtLXBsb3RNb2RhbCBwbG90TW9kYWwnXG5cbiAgICAgICAgICAgIE1vZGFscy5ncm91cExpbmtzID0gW11cblxuICAgICAgICAgICAgTW9kYWxzLmN1cnJlbnRHcm91cEl0ZW0gPSAwXG5cbiAgICAgICAgICAgIE1vZGFscy5tb2RhbENvbnRlbnQuaW5uZXJIVE1MID0gJydcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgQm9keVNjcm9sbExvY2suZW5hYmxlQm9keVNjcm9sbChNb2RhbHMucGxvdE1vZGFsKVxuXG4gICAgICAgICAgICBNb2RhbHMuaXNPcGVuID0gZmFsc2VcbiAgICAgICAgfVxuXG4gICAgfVxuXG4gICAgbW9kdWxlLmV4cG9ydHMgPSBNb2RhbHNcblxufSgpKVxuIiwiKGZ1bmN0aW9uICgpIHtcblxuICB2YXIgU21vb3RoO1xuXG4gIFNtb290aCA9IHtcblxuICAgIHRyYWNrZWRFbGVtZW50c09ic2VydmVyIDogbnVsbCxcbiAgICBzdGFuZGFyZFNjcm9sbEZyYW1lc09ic2VydmVyIDogbnVsbCxcblxuICAgIG1haW5TY3JvbGxBbmltYXRpb25GcmFtZSA6IG51bGwsXG5cbiAgICBjdXJyZW50UG9zaXRpb24gOiAwLFxuXG4gICAgbXV0YXRpb25PYnNlcnZlckRlYm91bmNlIDogbnVsbCxcblxuICAgIG9uU2Nyb2xsQ2FsbGJhY2tUaHJvdHRsZXIgOiBudWxsLFxuXG4gICAgZWFzZSA6IDAuMDcsXG5cbiAgICBsYXN0UG9zaXRpb24gOiAwLFxuXG4gICAgb25TY3JvbGwgOiBudWxsLFxuXG4gICAgc3RhbmRhcmRTY3JvbGwgOiBmYWxzZSxcblxuICAgIHNjcm9sbEVsZW1lbnRzIDogW10sXG5cbiAgICB0b3BCYXJIZWlnaHQgOiAwLFxuXG4gICAgc2Nyb2xsRnJhbWVzIDogW10sXG5cbiAgICB0aWNraW5nIDogZmFsc2UsXG5cbiAgICBkb20gOiB7XG4gICAgICAgICAgICBzY3JvbGxXaW5kb3cgICAgICAgICAgICAgICAgICAgICAgICAgICAgOiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdbZGF0YS1wbG90LXNtb290aC1zY3JvbGxdJyksXG4gICAgICAgICAgICBzY3JvbGxGcmFtZXMgICAgICAgICAgICAgICAgICAgICAgICAgICAgOiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdbZGF0YS1wbG90LXNtb290aC1zY3JvbGwtZnJhbWVdJyksXG4gICAgICAgICAgICBzY3JvbGxFbGVtZW50cyAgICAgICAgICAgICAgICAgICAgICAgICAgOiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdbZGF0YS1wbG90LXNtb290aC1zY3JvbGwtZWxlbWVudF0nKSxcbiAgICAgICAgICAgIHRvcEJhciAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLXBsb3Qtc21vb3RoLXNjcm9sbC10b3BiYXInKVxuICAgICAgICAgIH0sXG5cbiAgICB3aW5kb3dIZWlnaHQgOiB3aW5kb3cuaW5uZXJIZWlnaHQsIFxuXG4gICAgd2luZG93V2lkdGggOiB3aW5kb3cuaW5uZXJXaWR0aCxcblxuICAgIGluaXQ6IHNldHRpbmdzID0+IHtcblxuICAgICAgLy9vdmVycmlkZSBhbnkgZGVmYXVsdCBzZXR0aW5ncyB3aXRoIHBhc3NlZCBwYXJhbWV0ZXJzXG4gICAgICBTbW9vdGguc2V0U2V0dGluZ3Moc2V0dGluZ3MpXG5cbiAgICAgIGlmKCFTbW9vdGguc3RhbmRhcmRTY3JvbGwpIHtcblxuICAgICAgICAvL1NldCBvdXIgY3VycmVudCBhbmQgbGFzdCBwb3NpdGlvbnMgXG4gICAgICAgIC8vdG8gdGhlIGN1cnJlbnQgc2Nyb2xsIFkgcG9zaXRpb24sIGluIGNhc2VcbiAgICAgICAgLy93ZSBhcmUgc2Nyb2xsZWQgZG93biB0aGUgcGFnZSBvbiBsb2FkXG4gICAgICAgIFNtb290aC5jdXJyZW50UG9zaXRpb24gICAgPSB3aW5kb3cuc2Nyb2xsWVxuICAgICAgICBTbW9vdGgubGFzdFBvc2l0aW9uICAgICAgID0gd2luZG93LnNjcm9sbFlcblxuICAgICAgICAvL1B1dCBmaXhlZCBvbnRvIHRoZSB3aG9sZSBzaXRlIHJlYWR5IHRvIFxuICAgICAgICAvL2ludGVyY2VwdCBzY3JvbGxpbmdcbiAgICAgICAgU21vb3RoLnNldFN0eWxlcygpXG5cbiAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIFNtb290aC5yZWZyZXNoLCB7IHBhc3NpdmU6IHRydWUgfSlcbiAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Njcm9sbCcsIFNtb290aC5zY3JvbGwsIHsgcGFzc2l2ZTogdHJ1ZSB9KVxuXG4gICAgICAgIC8vUmVhZCB0aHJvdWdoIGVhY2ggc2Nyb2xsIGZyYW1lIGFuZCBzZXQgZGF0YVxuICAgICAgICAvL2ludG8gYSBzaW5nbGUgYXJyYXkgZm9yIHByb2Nlc3NpbmcgbGF0ZXJcbiAgICAgICAgLy97XG4gICAgICAgIC8vICAgICAgZWxlbWVudCAgICAgICAgICAgOiBlbGVtZW50LCAgICAgICh0aGUgZG9tIGVsZW1lbnQpXG4gICAgICAgIC8vICAgICAgdG9wICAgICAgICAgICAgICAgOiAxMDAsICAgICAgICAgICh0aGUgb2Zmc2V0IHRvcCB2YWx1ZSB3aXRob3V0IHRyYW5zZm9ybXMsIGluIHBpeGVscylcbiAgICAgICAgLy8gICAgICBoZWlnaHQgICAgICAgICAgICA6IDMwMCwgICAgICAgICAgKHRoZSBoZWlnaHQgb2YgdGhlIGVsZW1lbnQgd2l0aG91dCB0cmFuc2Zvcm1zLCBpbiBwaXhlbHMpXG4gICAgICAgIC8vICAgICAgYm90dG9tICAgICAgICAgICAgOiA0MDAsICAgICAgICAgICh0aGUgb2Zmc2V0IGJvdHRvbSBwb3NpdGlvbiB2YWx1ZSB3aXRob3V0IHRyYW5zZm9ybXMsIGluIHBpeGVscylcbiAgICAgICAgLy8gICAgICBzdGlja3kgICAgICAgICAgICA6IGZhbHNlLCAgICAgICAgKGlmIHRoZSBlbGVtZW50IHNob3VsZCBiZWhhdmUgbGlrZSBDU1Mgc3RpY2t5IG9yIG5vdClcbiAgICAgICAgLy8gICAgICBwYXJlbnRCb3R0b20gICAgICA6IGZhbHNlIHx8IDUwMCAgKGlmIHRoZSBlbGVtZW50IGlzIHN0aWNreSwgcmV0dXJuIHRoZSBib3R0b20gcG9zaXRpb24gb2YgaXRzIHBhcmVudCBpbiBwaXhlbHMgKHdoZW4gaXQgc2hvdWxkIHVuc3RpY2spKVxuICAgICAgICAvLyAgfVxuICAgICAgICBTbW9vdGguc2V0U2Nyb2xsRnJhbWVEYXRhKClcblxuICAgICAgfVxuXG4gICAgICAvL0lmIGFueSBzY3JvbGwgZWxlbWVudHMgZXhpc3QsIHdlIGNhbiBhZGQgdGhlbSBhbmQgbW9uaXRvciB0aGVtXG4gICAgICBpZihTbW9vdGguZG9tLnNjcm9sbEVsZW1lbnRzKSB7XG4gICAgICAgIC8vUmVhZCB0aHJvdWdoIGVhY2ggc2Nyb2xsIGVsZW1lbnQgYW5kIHNldCBkYXRhXG4gICAgICAgIC8vaW50byBhIHNpbmdsZSBhcnJheSBmb3IgcHJvY2Vzc2luZyBsYXRlclxuICAgICAgICAvL3tcbiAgICAgICAgLy8gICAgICBlbGVtZW50ICAgICAgICAgOiBlbGVtZW50LCAgICAgICAgICAodGhlIGRvbSBlbGVtZW50KVxuICAgICAgICAvLyAgICAgIHRvcCAgICAgICAgICAgICA6IDEwMCwgICAgICAgICAgICAgICh0aGUgb2Zmc2V0IHRvcCB2YWx1ZSB3aXRob3V0IHRyYW5zZm9ybXMsIGluIHBpeGVscylcbiAgICAgICAgLy8gICAgICBoZWlnaHQgICAgICAgICAgOiAzMDAsICAgICAgICAgICAgICAodGhlIGhlaWdodCBvZiB0aGUgZWxlbWVudCB3aXRob3V0IHRyYW5zZm9ybXMsIGluIHBpeGVscylcbiAgICAgICAgLy8gICAgICBib3R0b20gICAgICAgICAgOiA0MDAsICAgICAgICAgICAgICAodGhlIG9mZnNldCBib3R0b20gcG9zaXRpb24gdmFsdWUgd2l0aG91dCB0cmFuc2Zvcm1zLCBpbiBwaXhlbHMpXG4gICAgICAgIC8vICAgICAgaXNWaXNpYmxlICAgICAgIDogZmFsc2UsICAgICAgICAgICAgKGlmIHRoZSBlbGVtZW50IGlzIGN1cnJlbnRseSBpbiB0aGUgd2luZG93IGZyYW1lIG9yIG5vdClcbiAgICAgICAgLy8gICAgICBpbml0aWFsT2Zmc2V0ICAgOiAuMiwgICAgICAgICAgICAgICAoaG93IGZhciBhd2F5IHRoaXMgZWxlbWVudCBpcyBmcm9tIHRoZSBpbml0aWFsIGNlbnRlciBvZiB0aGUgc2NyZWVuKVxuICAgICAgICAvLyAgICAgIGN1cnJlbnRQb3NpdGlvbiA6IDAgICAgICAgICAgICAgICAgIChob3cgZmFyIHVwIHRoZSB2aWV3cG9ydCB0aGlzIGVsZW1lbnQgY3VycmVudGx5IGlzIChiZXR3ZWVuIC0xIGFuZCAxKSlcbiAgICAgICAgLy8gICAgICBjYWxsYmFjayAgICAgICAgOiAnZnVuY3Rpb24ubmFtZScgICAodGhlIG5hbWUgb2YgYSBmdW5jdGlvbiB5b3UgY2FuIGNhbGwgd2hlbiB0aGlzIG1vdmVzIHdpdGhpbiB2aWV3KVxuICAgICAgICAvLyB9XG4gICAgICAgIFNtb290aC50cmFja2VkRWxlbWVudHNPYnNlcnZlciA9IG5ldyBJbnRlcnNlY3Rpb25PYnNlcnZlcihTbW9vdGgudHJhY2tWaXNpYmxlRWxlbWVudHMsIHtyb290TWFyZ2luOiAnMHB4Jyx0aHJlc2hvbGQ6IDAuMDF9KVxuICAgICAgICBTbW9vdGguc2V0U2Nyb2xsRWxlbWVudERhdGEoKVxuICAgICAgfVxuXG4gICAgICAvL1NldCB1cCBhIG11dGF0aW9uIG9ic2VydmVyIHRvIGxpc3RlbiBvdXQgZm9yIGNoYW5nZXMgaW4gaGVpZ2h0LFxuICAgICAgLy90byBhZGp1c3Qgb3VyIGhlaWdodCBvZiBkb2N1bWVudCBhY2NvcmRpbmdseVxuICAgICAgU21vb3RoLmluaXRNdXRhdGlvbk9ic2VydmVyKClcblxuICAgICAgLy9JZiB0aGVyZSdzIGEgZml4ZWQgdG9wYmFyIG9uIHRoaXMgc2l0ZSwgd2UgY2FuIHNldCB0aGUgaGVpZ2h0XG4gICAgICAvL2hlcmUsIGluIG9yZGVyIHRvIG9mZnNldCBhbnkgc3RpY2t5IHBvc2l0aW9ucy4gXG4gICAgICBTbW9vdGguc2V0VG9wQmFySGVpZ2h0KClcblxuICAgICAgLy9JZiBpdCdzIG5vdCBzdGFuZGFyZCBzY3JvbGwsIHNldCBvdXIgaW5pdGlhbCBzY3JvbGwgZnJhbWUgcG9zaXRpb25zXG4gICAgICBpZighU21vb3RoLnN0YW5kYXJkU2Nyb2xsKSB7XG4gICAgICAgIFNtb290aC5zZXRQb3NpdGlvbk9mRnJhbWVzKClcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgICBTbW9vdGguc3RhbmRhcmRTY3JvbGxGcmFtZXNPYnNlcnZlciA9IG5ldyBJbnRlcnNlY3Rpb25PYnNlcnZlcihTbW9vdGgudHJhY2tTdGFuZGFyZFNjcm9sbEZyYW1lcywge3Jvb3RNYXJnaW46ICcwcHgnLHRocmVzaG9sZDogMC4wMX0pXG4gICAgICAgICBmb3IobGV0IGZyYW1lIG9mIFNtb290aC5kb20uc2Nyb2xsRnJhbWVzKSB7XG4gICAgICAgICAgICBTbW9vdGguc3RhbmRhcmRTY3JvbGxGcmFtZXNPYnNlcnZlci5vYnNlcnZlKGZyYW1lKVxuICAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICAvL1NldCBvdXIgcG9zaXRpb24gb2YgYW55IHNjcm9sbCBlbGVtZW50c1xuICAgICAgU21vb3RoLnBvc2l0aW9uU2Nyb2xsRWxlbWVudHMoKVxuXG4gICAgfSxcblxuICAgIHNldFNldHRpbmdzIDogc2V0dGluZ3MgPT4ge1xuXG4gICAgICBpZighc2V0dGluZ3MpXG4gICAgICAgIHJldHVybiB0cnVlXG5cbiAgICAgIGlmKHR5cGVvZihzZXR0aW5ncy5vblNjcm9sbCkgPT0gJ2Z1bmN0aW9uJylcbiAgICAgICAgU21vb3RoLm9uU2Nyb2xsID0gc2V0dGluZ3Mub25TY3JvbGxcbiAgICAgIFxuICAgICAgaWYoc2V0dGluZ3Muc3RhbmRhcmRTY3JvbGwgPT0gdHJ1ZSlcbiAgICAgICAgU21vb3RoLnN0YW5kYXJkU2Nyb2xsID0gdHJ1ZVxuXG4gICAgICBpZihzZXR0aW5ncy5lYXNlKSBcbiAgICAgICAgU21vb3RoLmVhc2UgPSBzZXR0aW5ncy5lYXNlXG4gICAgICBcbiAgICB9LFxuXG4gICAgcmV0cmlnZ2VyV2luZG93U2l6ZU9uTXV0YXRlIDogKG11dGF0aW9uc0xpc3QsIG9ic2VydmVyKSA9PiB7IFxuXG4gICAgICBpZighU21vb3RoLm11dGF0aW9uT2JzZXJ2ZXJEZWJvdW5jZSkge1xuXG4gICAgICAgIFNtb290aC5tdXRhdGlvbk9ic2VydmVyRGVib3VuY2UgPSBzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XG5cbiAgICAgICAgICAgIHZhciBjaGFuZ2VkID0gZmFsc2VcblxuICAgICAgICAgICAgU21vb3RoLnNjcm9sbEZyYW1lcy5mb3JFYWNoKGZyYW1lID0+IHtcbiAgICAgICAgICAgICAgICBpZihmcmFtZS5oZWlnaHQgIT0gZnJhbWUuZWxlbWVudC5jbGllbnRIZWlnaHQpXG4gICAgICAgICAgICAgICAgICBjaGFuZ2VkID0gdHJ1ZVxuICAgICAgICAgICAgfSlcblxuICAgICAgICAgICAgaWYoY2hhbmdlZCA9PSB0cnVlKSBcbiAgICAgICAgICAgICAgU21vb3RoLnJlZnJlc2goKVxuICAgICAgICAgICAgXG4gICAgICAgICAgICBjbGVhclRpbWVvdXQoU21vb3RoLm11dGF0aW9uT2JzZXJ2ZXJEZWJvdW5jZSlcbiAgICAgICAgICAgIFNtb290aC5tdXRhdGlvbk9ic2VydmVyRGVib3VuY2UgPSBudWxsXG5cbiAgICAgICAgfSwyMDApXG5cbiAgICAgIH1cblxuICAgIH0sXG5cbiAgICBpbml0TXV0YXRpb25PYnNlcnZlciA6ICgpID0+IHtcblxuICAgICAgZm9yKHZhciBzY3JvbGxGcmFtZSBvZiBTbW9vdGguZG9tLnNjcm9sbEZyYW1lcykge1xuXG4gICAgICAgIGNvbnN0IG9ic2VydmVyID0gbmV3IE11dGF0aW9uT2JzZXJ2ZXIoU21vb3RoLnJldHJpZ2dlcldpbmRvd1NpemVPbk11dGF0ZSlcbiAgICAgICAgb2JzZXJ2ZXIub2JzZXJ2ZShzY3JvbGxGcmFtZSwge1xuICAgICAgICAgIGNoaWxkTGlzdCAgIDogdHJ1ZSxcbiAgICAgICAgICBhdHRyaWJ1dGVzICA6IHRydWUsXG4gICAgICAgICAgc3VidHJlZSAgICAgOiB0cnVlXG4gICAgICAgIH0pXG4gICAgICB9XG5cbiAgICB9LFxuXG4gICAgZGVzdHJveSA6ICgpID0+IHtcblxuICAgICAgU21vb3RoLnNjcm9sbEVsZW1lbnRzLmZvckVhY2goZW50cnkgPT57XG4gICAgICAgIGVudHJ5LmVsZW1lbnQucmVtb3ZlQXR0cmlidXRlKCdzdHlsZScpXG4gICAgICB9KVxuXG4gICAgICBTbW9vdGguc2Nyb2xsRnJhbWVzLmZvckVhY2goZW50cnkgPT57XG4gICAgICAgIGVudHJ5LmVsZW1lbnQucmVtb3ZlQXR0cmlidXRlKCdzdHlsZScpXG4gICAgICB9KVxuXG4gICAgICBTbW9vdGgudHJhY2tlZEVsZW1lbnRzT2JzZXJ2ZXIgPSBudWxsXG4gICAgICBTbW9vdGgubWFpblNjcm9sbEFuaW1hdGlvbkZyYW1lID0gbnVsbFxuICAgICAgU21vb3RoLmN1cnJlbnRQb3NpdGlvbiA9IDBcbiAgICAgIFNtb290aC5tdXRhdGlvbk9ic2VydmVyRGVib3VuY2UgPSBudWxsXG4gICAgICBTbW9vdGgub25TY3JvbGxDYWxsYmFja1Rocm90dGxlciA9IG51bGxcbiAgICAgIFNtb290aC5lYXNlID0gMC4wN1xuICAgICAgU21vb3RoLmxhc3RQb3NpdGlvbiA9IDBcbiAgICAgIFNtb290aC5vblNjcm9sbCA9IG51bGxcbiAgICAgIFNtb290aC5zdGFuZGFyZFNjcm9sbCA9IGZhbHNlXG4gICAgICBTbW9vdGguc2Nyb2xsRWxlbWVudHMgPSBbXVxuICAgICAgU21vb3RoLnRvcEJhckhlaWdodCA9IDBcbiAgICAgIFNtb290aC5zY3JvbGxGcmFtZXMgPSBbXVxuICAgICAgU21vb3RoLnRpY2tpbmcgPSBmYWxzZVxuICAgICAgU21vb3RoLmRvbS5zY3JvbGxXaW5kb3cucmVtb3ZlQXR0cmlidXRlKCdzdHlsZScpXG5cbiAgICB9LFxuXG4gICAgYWRkRWxlbWVudHMgOiAoZWxlbWVudHMpID0+IHtcblxuICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUscmVqZWN0KXtcblxuICAgICAgICAgICAgZWxlbWVudHMuZm9yRWFjaCggZWxlbWVudCA9PiB7ICAgICAgIFxuICAgICAgICAgICAgICAgIFNtb290aC50cmFja2VkRWxlbWVudHNPYnNlcnZlci5vYnNlcnZlKGVsZW1lbnQpXG4gICAgICAgICAgICB9KVxuXG4gICAgICAgICAgICByZXNvbHZlKClcblxuICAgICAgfSlcblxuICAgIH0sXG5cbiAgICBzY3JvbGxUbyA6IChlbGVtZW50KSA9PiB7XG4gICAgICBcbiAgICAgIHdpbmRvdy5zY3JvbGxUbygwLFNtb290aC5leGFjdFBvc2l0aW9uT2ZFbGVtZW50KGVsZW1lbnQpIC0gMTAwKVxuXG4gICAgICBpZihTbW9vdGguc3RhbmRhcmRTY3JvbGwgIT0gZmFsc2UpIHtcbiAgICAgICAgU21vb3RoLnRpY2tpbmcgPSB0cnVlXG4gICAgICAgIFNtb290aC5tYWluU2Nyb2xsQW5pbWF0aW9uRnJhbWUgPSByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoU21vb3RoLnJ1bilcbiAgICAgIH1cbiAgICB9LFxuXG4gICAgc2V0U2Nyb2xsRWxlbWVudERhdGEgOiAoKSA9PiB7XG5cbiAgICAgIFNtb290aC5kb20uc2Nyb2xsRWxlbWVudHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdbZGF0YS1wbG90LXNtb290aC1zY3JvbGwtZWxlbWVudF0nKVxuICAgICAgU21vb3RoLmFkZEVsZW1lbnRzKFNtb290aC5kb20uc2Nyb2xsRWxlbWVudHMpIFxuXG4gICAgICBpZighU21vb3RoLmRvbS5zY3JvbGxFbGVtZW50cylcbiAgICAgICAgcmV0dXJuIGZhbHNlXG5cbiAgICAgIFNtb290aC5zY3JvbGxFbGVtZW50cyA9IFtdXG4gICAgXG4gICAgICBTbW9vdGguZG9tLnNjcm9sbEVsZW1lbnRzLmZvckVhY2goIChlbGVtZW50LGkpID0+IHtcblxuICAgICAgICBjb25zdCBlbGVtZW50VG9wID0gU21vb3RoLmV4YWN0UG9zaXRpb25PZkVsZW1lbnQoZWxlbWVudClcblxuICAgICAgICB2YXIgaGVpZ2h0ID0gZWxlbWVudC5jbGllbnRIZWlnaHRcblxuICAgICAgICB2YXIgY2FsbGJhY2sgID0gZmFsc2UsXG4gICAgICAgICAgICBmcm9tVmFsdWUgPSAtMSxcbiAgICAgICAgICAgIHRvVmFsdWUgICA9IDFcblxuICAgICAgICAvL0lzIGFueXRoaW5nIHNldCBvbiB0aGlzIGVsZW1lbnQgYXMgYSBjYWxsYmFjaz9cbiAgICAgICAgaWYoZWxlbWVudC5kYXRhc2V0LnBsb3RTbW9vdGhTY3JvbGxFbGVtZW50KSB7XG5cbiAgICAgICAgICBsZXQgYyA9IGVsZW1lbnQuZGF0YXNldC5wbG90U21vb3RoU2Nyb2xsRWxlbWVudFxuXG4gICAgICAgICAgLy9GaXJzdCB1cCAtIGhhdmUgdmFsdWVzIGJlZW4gcGFzc2VkIHRvIHRoaXMgY2FsbGJhY2sgaW4gdGhpcyBmb3JtOiBjYWxsYmFjaygyLDUpXG4gICAgICAgICAgbGV0IHZhbHVlcyA9IGMuc3Vic3RyaW5nKCBjLmluZGV4T2YoICcoJyApICsgMSwgYy5pbmRleE9mKCAnKScgKSApXG4gICAgICAgICAgdmFsdWVzID0gdmFsdWVzLnNwbGl0KCcsJylcblxuICAgICAgICAgIC8vVmFsaWQgaWYgd2UgaGF2ZSAyLCBhbmQgZnJvbSBpcyBsZXNzIHRoYXQgdG8gdmFsdWVcbiAgICAgICAgICBpZih2YWx1ZXMubGVuZ3RoID09IDIgJiYgdmFsdWVzWzBdIDwgdmFsdWVzWzFdKSB7XG4gICAgICAgICAgICBmcm9tVmFsdWUgPSBOdW1iZXIodmFsdWVzWzBdKVxuICAgICAgICAgICAgdG9WYWx1ZSA9IE51bWJlcih2YWx1ZXNbMV0pXG4gICAgICAgICAgfVxuXG4gICAgICAgICAgbGV0IHBvdGVudGlhbEZ1bmN0aW9uID0gd2luZG93W2NdXG5cbiAgICAgICAgICBpZiAodHlwZW9mIHBvdGVudGlhbEZ1bmN0aW9uID09PSBcImZ1bmN0aW9uXCIpIHtcblxuICAgICAgICAgICAgY2FsbGJhY2sgPSBwb3RlbnRpYWxGdW5jdGlvbi5yZXBsYWNlKC9cXHMqXFwoLio/XFwpXFxzKi9nLCAnJylcblxuICAgICAgICAgIH1cbiAgICAgICAgICBlbHNlIHtcblxuICAgICAgICAgICAgY29uc3QgY2FsbGJhY2tTcGxpdCA9IGMucmVwbGFjZSgvXFxzKlxcKC4qP1xcKVxccyovZywgJycpLnNwbGl0KCcuJylcblxuICAgICAgICAgICAgaWYoY2FsbGJhY2tTcGxpdC5sZW5ndGggPT0gMikge1xuXG4gICAgICAgICAgICAgIHBvdGVudGlhbEZ1bmN0aW9uID0gd2luZG93W2NhbGxiYWNrU3BsaXRbMF1dW2NhbGxiYWNrU3BsaXRbMV1dXG5cbiAgICAgICAgICAgICAgaWYgKHR5cGVvZiBwb3RlbnRpYWxGdW5jdGlvbiA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgICAgICAgICAgY2FsbGJhY2sgPSBwb3RlbnRpYWxGdW5jdGlvblxuICAgICAgICAgICAgICB9IFxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBpbml0aWFsT2Zmc2V0ID0gMFxuXG4gICAgICAgIGlmKGVsZW1lbnRUb3AgPCBTbW9vdGgud2luZG93SGVpZ2h0KVxuICAgICAgICAgIGluaXRpYWxPZmZzZXQgPSAoZWxlbWVudFRvcCArIGhlaWdodCkgLyAoU21vb3RoLndpbmRvd0hlaWdodCArIGhlaWdodCkgKiAodG9WYWx1ZSAtIGZyb21WYWx1ZSkgKyBmcm9tVmFsdWVcblxuXG4gICAgICAgIFxuICAgICAgICBTbW9vdGguc2Nyb2xsRWxlbWVudHNbaV0gPSB7XG4gICAgICAgICAgICBlbGVtZW50ICAgICAgICAgOiBlbGVtZW50LFxuICAgICAgICAgICAgdG9wICAgICAgICAgICAgIDogZWxlbWVudFRvcCxcbiAgICAgICAgICAgIGhlaWdodCAgICAgICAgICA6IGhlaWdodCxcbiAgICAgICAgICAgIGJvdHRvbSAgICAgICAgICA6IGVsZW1lbnRUb3AgKyBlbGVtZW50LmNsaWVudEhlaWdodCxcbiAgICAgICAgICAgIGlzVmlzaWJsZSAgICAgICA6IGVsZW1lbnRUb3AgPCBTbW9vdGguY3VycmVudFBvc2l0aW9uICsgU21vb3RoLndpbmRvd0hlaWdodCAmJiBlbGVtZW50VG9wICsgaGVpZ2h0ID4gU21vb3RoLmN1cnJlbnRQb3NpdGlvbixcbiAgICAgICAgICAgIGluaXRpYWxPZmZzZXQgICA6IGluaXRpYWxPZmZzZXQsXG4gICAgICAgICAgICBjYWxsYmFjayAgICAgICAgOiBjYWxsYmFjayxcbiAgICAgICAgICAgIGZyb21WYWx1ZSAgICAgICA6IGZyb21WYWx1ZSxcbiAgICAgICAgICAgIHRvVmFsdWUgICAgICAgICA6IHRvVmFsdWUsXG4gICAgICAgICAgICBjdXJyZW50UG9zaXRpb24gOiAwXG4gICAgICAgIH1cblxuICAgICAgICBlbGVtZW50LmRhdGFzZXQucGxvdFNtb290aFNjcm9sbEVsZW1lbnRJZCA9IGlcblxuICAgICAgfSlcblxuXG4gICAgfSxcblxuICAgIHNldFRvcEJhckhlaWdodCA6ICgpID0+IHtcblxuICAgICAgaWYoU21vb3RoLmRvbS50b3BCYXIpXG4gICAgICAgIFNtb290aC50b3BCYXJIZWlnaHQgPSBTbW9vdGguZG9tLnRvcEJhci5jbGllbnRIZWlnaHRcblxuICAgIH0sXG5cbiAgICBzZXRTY3JvbGxGcmFtZURhdGEgOiAoKSA9PiB7XG5cbiAgICAgIFNtb290aC5kb20uc2Nyb2xsRnJhbWVzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnW2RhdGEtcGxvdC1zbW9vdGgtc2Nyb2xsLWZyYW1lXScpXG5cbiAgICAgIFNtb290aC5zY3JvbGxGcmFtZXMgPSBbXVxuICAgICAgdmFyIG5ld0hlaWdodCA9IDBcblxuICAgICAgU21vb3RoLmRvbS5zY3JvbGxGcmFtZXMuZm9yRWFjaCggZWxlbWVudCA9PiB7XG5cbiAgICAgICAgY29uc3QgZWxlbWVudFRvcCA9IFNtb290aC5leGFjdFBvc2l0aW9uT2ZFbGVtZW50KGVsZW1lbnQpXG5cbiAgICAgICAgU21vb3RoLnNjcm9sbEZyYW1lcy5wdXNoKHtcbiAgICAgICAgICAgIGVsZW1lbnQgICAgICAgICAgIDogZWxlbWVudCxcbiAgICAgICAgICAgIHRvcCAgICAgICAgICAgICAgIDogZWxlbWVudFRvcCxcbiAgICAgICAgICAgIGhlaWdodCAgICAgICAgICAgIDogZWxlbWVudC5jbGllbnRIZWlnaHQsXG4gICAgICAgICAgICBib3R0b20gICAgICAgICAgICA6IGVsZW1lbnRUb3AgKyBlbGVtZW50LmNsaWVudEhlaWdodCxcbiAgICAgICAgICAgIHN0aWNreSAgICAgICAgICAgIDogdHlwZW9mKGVsZW1lbnQuZGF0YXNldC5wbG90U21vb3RoU2Nyb2xsU3RpY2t5KSAhPSAndW5kZWZpbmVkJyA/IHRydWUgOiBmYWxzZSwgXG4gICAgICAgICAgICBwYXJlbnRCb3R0b20gICAgICA6IGVsZW1lbnQucGFyZW50RWxlbWVudCA/IFNtb290aC5leGFjdFBvc2l0aW9uT2ZFbGVtZW50KGVsZW1lbnQucGFyZW50RWxlbWVudCkgKyBlbGVtZW50LnBhcmVudEVsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkuaGVpZ2h0IDogZmFsc2VcbiAgICAgICAgfSlcblxuICAgICAgfSlcblxuICAgICAgZG9jdW1lbnQuYm9keS5zdHlsZS5oZWlnaHQgPSBgJHtTbW9vdGguZG9tLnNjcm9sbFdpbmRvdy5zY3JvbGxIZWlnaHR9cHhgXG5cbiAgICB9LFxuXG4gICAgdHJhY2tWaXNpYmxlRWxlbWVudHMgOiAoZW50cmllcykgPT4ge1xuICAgICAgIFxuICAgICAgICBlbnRyaWVzLmZvckVhY2goIGVudHJ5ID0+IHtcblxuICAgICAgICAgIGlmKGVudHJ5LmlzSW50ZXJzZWN0aW5nICYmIGVudHJ5KSB7XG4gICAgICAgICAgICBlbnRyeS50YXJnZXQuY2xhc3NMaXN0LmFkZCgncGxvdFNtb290aFNjcm9sbEluVmlldycsJ3Bsb3RTbW9vdGhTY3JvbGxTZWVuT25jZScpXG4gICAgICAgICAgfVxuICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgZW50cnkudGFyZ2V0LmNsYXNzTGlzdC5yZW1vdmUoJ3Bsb3RTbW9vdGhTY3JvbGxJblZpZXcnKVxuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmKFNtb290aC5zY3JvbGxFbGVtZW50c1tlbnRyeS50YXJnZXQuZGF0YXNldC5wbG90U21vb3RoU2Nyb2xsRWxlbWVudElkXSlcbiAgICAgICAgICAgIFNtb290aC5zY3JvbGxFbGVtZW50c1tlbnRyeS50YXJnZXQuZGF0YXNldC5wbG90U21vb3RoU2Nyb2xsRWxlbWVudElkXS5pc1Zpc2libGUgPSBlbnRyeS5pc0ludGVyc2VjdGluZ1xuXG5cbiAgICAgICAgfSlcbiAgICB9LFxuXG4gICAgdHJhY2tTdGFuZGFyZFNjcm9sbEZyYW1lcyA6IChlbnRyaWVzKSA9PiB7XG4gICAgICAgXG4gICAgICAgIGVudHJpZXMuZm9yRWFjaCggZW50cnkgPT4ge1xuXG4gICAgICAgICAgaWYoZW50cnkuaXNJbnRlcnNlY3RpbmcgJiYgZW50cnkpIHtcbiAgICAgICAgICAgIGVudHJ5LnRhcmdldC5jbGFzc0xpc3QuYWRkKCdwbG90U21vb3RoU2Nyb2xsRnJhbWVJblZpZXcnLCdwbG90U21vb3RoU2Nyb2xsRnJhbWVTZWVuT25jZScpXG4gICAgICAgICAgfVxuICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgZW50cnkudGFyZ2V0LmNsYXNzTGlzdC5yZW1vdmUoJ3Bsb3RTbW9vdGhTY3JvbGxGcmFtZUluVmlldycpXG4gICAgICAgICAgfVxuXG4gICAgICAgIH0pXG4gICAgfSxcblxuICAgIHJlZnJlc2ggOiAoKSA9PiB7XG4gICAgICBpZihTbW9vdGguc3RhbmRhcmRTY3JvbGwpXG4gICAgICAgIHJldHVybiB0cnVlXG4gICAgICBcbiAgICAgIFNtb290aC53aW5kb3dIZWlnaHQgPSB3aW5kb3cuaW5uZXJIZWlnaHRcbiAgICAgIFNtb290aC53aW5kb3dXaWR0aCA9IHdpbmRvdy5pbm5lcldpZHRoXG4gICAgICBTbW9vdGguc2V0U2Nyb2xsRWxlbWVudERhdGEoKVxuICAgICAgU21vb3RoLnNldFNjcm9sbEZyYW1lRGF0YSgpXG4gICAgICBTbW9vdGguc2V0VG9wQmFySGVpZ2h0KClcbiAgICAgIFNtb290aC5zY3JvbGwoKVxuICAgIH0sXG5cbiAgICBydW4gOiAoKSA9PiB7XG5cbiAgICAgIFNtb290aC5sYXN0UG9zaXRpb24gPSBTbW9vdGgubGVycChTbW9vdGgubGFzdFBvc2l0aW9uLCBTbW9vdGguY3VycmVudFBvc2l0aW9uLCBTbW9vdGguZWFzZSlcblxuICAgICAgaWYgKFNtb290aC5sYXN0UG9zaXRpb24gPCAuMSlcbiAgICAgICAgU21vb3RoLmxhc3RQb3NpdGlvbiA9IDBcbiAgICAgXG4gICAgICBsZXQgZGlmZiA9IFNtb290aC5jdXJyZW50UG9zaXRpb24gLSBTbW9vdGgubGFzdFBvc2l0aW9uXG5cbiAgICAgIGlmKE1hdGguYWJzKGRpZmYpIDwgMC41KSB7XG4gICAgICAgIFNtb290aC50aWNraW5nID0gZmFsc2VcbiAgICAgICAgZGlmZiA9IDBcbiAgICAgIH1cblxuICAgICAgdmFyIHZlbG9jaXR5ID0gZGlmZiAvIFNtb290aC53aW5kb3dXaWR0aFxuXG4gICAgICBTbW9vdGguc2V0UG9zaXRpb25PZkZyYW1lcygpXG5cbiAgICAgIFNtb290aC5maXJlT25TY3JvbGxFdmVudCh2ZWxvY2l0eSlcblxuICAgICAgU21vb3RoLnBvc2l0aW9uU2Nyb2xsRWxlbWVudHMoKVxuXG4gICAgICBpZihTbW9vdGgudGlja2luZyA9PSB0cnVlKVxuICAgICAgICBTbW9vdGgubWFpblNjcm9sbEFuaW1hdGlvbkZyYW1lID0gcmVxdWVzdEFuaW1hdGlvbkZyYW1lKFNtb290aC5ydW4pXG4gICAgICBcblxuICAgIH0sXG5cbiAgICBwb3NpdGlvblNjcm9sbEVsZW1lbnRzIDogKCkgPT4ge1xuXG4gICAgICBTbW9vdGguc2Nyb2xsRWxlbWVudHMuZm9yRWFjaChlbnRyeSA9PiB7XG5cbiAgICAgICAgICBpZihlbnRyeS5pc1Zpc2libGUgPT0gdHJ1ZSAmJiBlbnRyeS5jYWxsYmFjaykge1xuXG4gICAgICAgICAgICBjb25zdCBjdXJyZW50UG9zaXRpb24gPSAoZW50cnkudG9wIC0gU21vb3RoLmxhc3RQb3NpdGlvbiArIGVudHJ5LmhlaWdodCkgLyAoU21vb3RoLndpbmRvd0hlaWdodCArIGVudHJ5LmhlaWdodCkgKiAoZW50cnkudG9WYWx1ZSAtIGVudHJ5LmZyb21WYWx1ZSkgKyBlbnRyeS5mcm9tVmFsdWUgLSBlbnRyeS5pbml0aWFsT2Zmc2V0XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGlmKGVudHJ5LmN1cnJlbnRQb3NpdGlvbiAhPSBjdXJyZW50UG9zaXRpb24pIHtcblxuICAgICAgICAgICAgICBlbnRyeS5jdXJyZW50UG9zaXRpb24gPSBjdXJyZW50UG9zaXRpb25cblxuICAgICAgICAgICAgICBlbnRyeS5jYWxsYmFjayhlbnRyeS5lbGVtZW50LGN1cnJlbnRQb3NpdGlvbilcblxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgfVxuICAgICAgICBcblxuICAgICAgICB9KVxuXG4gICAgfSxcblxuICAgIGZpcmVPblNjcm9sbEV2ZW50IDogKHZlbG9jaXR5KSA9PiB7XG5cbiAgICAgIGlmKHR5cGVvZihTbW9vdGgub25TY3JvbGwpID09ICdmdW5jdGlvbicpXG4gICAgICAgICAgICAgIFxuICAgICAgICBpZihTbW9vdGgub25TY3JvbGxDYWxsYmFja1Rocm90dGxlciA9PT0gbnVsbCkge1xuXG4gICAgICAgICAgU21vb3RoLm9uU2Nyb2xsQ2FsbGJhY2tUaHJvdHRsZXIgPSBzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XG5cbiAgICAgICAgICAgIFNtb290aC5vblNjcm9sbChTbW9vdGguZG9tLnNjcm9sbEZyYW1lcyx2ZWxvY2l0eSlcbiAgICAgICAgICAgIFNtb290aC5vblNjcm9sbENhbGxiYWNrVGhyb3R0bGVyID0gbnVsbFxuXG4gICAgICAgICAgfSw1MClcblxuICAgICAgICB9XG5cbiAgICB9LFxuXG4gICAgc2V0UG9zaXRpb25PZkZyYW1lcyA6ICgpID0+IHtcblxuICAgICAgZm9yKHZhciBzY3JvbGxGcmFtZSBvZiBTbW9vdGguc2Nyb2xsRnJhbWVzKSB7XG5cbiAgICAgICAgICB2YXIgd2luZG93U2Nyb2xsUG9zaXRpb24gPSBTbW9vdGgubGFzdFBvc2l0aW9uXG5cbiAgICAgICAgICBpZihzY3JvbGxGcmFtZS5zdGlja3kgJiYgc2Nyb2xsRnJhbWUucGFyZW50Qm90dG9tKSB7XG4gICAgICAgICAgICB3aW5kb3dTY3JvbGxQb3NpdGlvbiA9IFNtb290aC5jYWxjUG9zaXRpb25PZlN0aWNreUVsZW1lbnQoc2Nyb2xsRnJhbWUsIHdpbmRvd1Njcm9sbFBvc2l0aW9uKVxuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmKHdpbmRvd1Njcm9sbFBvc2l0aW9uID4gc2Nyb2xsRnJhbWUuYm90dG9tIHx8IHdpbmRvd1Njcm9sbFBvc2l0aW9uICsgU21vb3RoLndpbmRvd0hlaWdodCA8IHNjcm9sbEZyYW1lLnRvcCkge1xuICAgICAgICAgICAgc2Nyb2xsRnJhbWUuZWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKCdwbG90U21vb3RoU2Nyb2xsRnJhbWVJblZpZXcnKVxuICAgICAgICAgICAgXG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHNjcm9sbEZyYW1lLmVsZW1lbnQuY2xhc3NMaXN0LmFkZCgncGxvdFNtb290aFNjcm9sbEZyYW1lSW5WaWV3JywncGxvdFNtb290aFNjcm9sbEZyYW1lU2Vlbk9uY2UnKVxuICAgICAgICAgICAgc2Nyb2xsRnJhbWUuZWxlbWVudC5zdHlsZS50cmFuc2Zvcm0gPSBgdHJhbnNsYXRlM2QoMCwgLSR7d2luZG93U2Nyb2xsUG9zaXRpb259cHgsIDApYFxuICAgICAgICAgIH1cblxuICAgICAgICB9XG5cbiAgICB9LFxuXG4gICAgc2Nyb2xsIDogKCkgPT4ge1xuICAgICAgU21vb3RoLmN1cnJlbnRQb3NpdGlvbiA9IHdpbmRvdy5zY3JvbGxZXG4gICAgICBpZihTbW9vdGgudGlja2luZyA9PSBmYWxzZSkge1xuICAgICAgICBTbW9vdGgudGlja2luZyA9IHRydWVcbiAgICAgICAgU21vb3RoLm1haW5TY3JvbGxBbmltYXRpb25GcmFtZSA9IHJlcXVlc3RBbmltYXRpb25GcmFtZShTbW9vdGgucnVuKSBcbiAgICAgIH1cbiAgICB9LFxuXG4gICAgc2V0U3R5bGVzIDogKCkgPT4ge1xuXG4gICAgICBPYmplY3QuYXNzaWduKFNtb290aC5kb20uc2Nyb2xsV2luZG93LnN0eWxlLHtcbiAgICAgICAgcG9zaXRpb24gIDogJ2ZpeGVkJyxcbiAgICAgICAgdG9wICAgICAgIDogMCxcbiAgICAgICAgbGVmdCAgICAgIDogMCxcbiAgICAgICAgaGVpZ2h0ICAgIDogJzEwMCUnLFxuICAgICAgICB3aWR0aCAgICAgOiAnMTAwJScsXG4gICAgICAgIG92ZXJmbG93ICA6ICdoaWRkZW4nXG4gICAgICB9KVxuXG4gICAgfSxcblxuICAgIGNhbGNQb3NpdGlvbk9mU3RpY2t5RWxlbWVudCA6IChlbnRyeSwgcG9zaXRpb24pID0+IHtcblxuICAgICAgLy9JZiB0aGUgaXRlbSBpcyBiZWxvdyB0aGUgYm90dG9tIG9mIGl0J3MgcGFyZW50XG4gICAgICBpZihwb3NpdGlvbiArIFNtb290aC50b3BCYXJIZWlnaHQgPj0gZW50cnkucGFyZW50Qm90dG9tKVxuICAgICAgICByZXR1cm4gcG9zaXRpb25cbiAgICAgIFxuXG4gICAgICBpZihlbnRyeS5wYXJlbnRCb3R0b20gLSBwb3NpdGlvbiAtIFNtb290aC50b3BCYXJIZWlnaHQgPD0gZW50cnkuaGVpZ2h0KSB7XG4gICAgICAgIHJldHVybiBlbnRyeS50b3AgLSBlbnRyeS5wYXJlbnRCb3R0b20gKyBwb3NpdGlvbiArIGVudHJ5LmhlaWdodFxuICAgICAgfVxuXG4gICAgICBpZihwb3NpdGlvbiArIFNtb290aC50b3BCYXJIZWlnaHQgPiBlbnRyeS50b3ApIFxuICAgICAgICByZXR1cm4gZW50cnkudG9wIC0gU21vb3RoLnRvcEJhckhlaWdodCAgIFxuXG5cbiAgICAgIHJldHVybiBwb3NpdGlvblxuXG4gICAgfSxcblxuICAgIGxlcnA6IChhLGIsbikgPT4gIHtcblxuICAgICAgICByZXR1cm4gKDEgLSBuKSAqIGEgKyBuICogYlxuXG4gICAgfSxcblxuICAgIGV4YWN0UG9zaXRpb25PZkVsZW1lbnQgOiAoZWxlbWVudCkgPT4ge1xuICAgICAgdmFyIGVsID0gZWxlbWVudCxcbiAgICAgIG9mZnNldFRvcCAgPSAwO1xuXG4gICAgICBkb3tcbiAgICAgICAgICBvZmZzZXRUb3AgICs9IGVsLm9mZnNldFRvcDtcblxuICAgICAgICAgIGVsID0gZWwub2Zmc2V0UGFyZW50O1xuICAgICAgfSB3aGlsZSggZWwgKTtcblxuICAgICAgcmV0dXJuIG9mZnNldFRvcFxuXG4gICAgfVxuXG4gIH1cblxuICBtb2R1bGUuZXhwb3J0cyA9IFNtb290aFxuXG59KCkpIiwiKGZ1bmN0aW9uICgpIHtcblxuICAgIHZhciBCb2R5U2Nyb2xsTG9jayAgID0gcmVxdWlyZSgnYm9keS1zY3JvbGwtbG9jaycpLFxuICAgICAgICBMYXp5TG9hZCAgICAgICAgID0gcmVxdWlyZSgnLi9sYXp5bG9hZCcpLFxuICAgICAgICBTeW5jU2Nyb2xsICAgICAgID0gcmVxdWlyZSgnLi9zeW5jc2Nyb2xsJyksIFxuICAgICAgICBQbG90XG5cbiAgICBQbG90ID0ge1xuXG4gICAgICAgIGluaXQ6ICgpID0+IHtcblxuICAgICAgICAgICAgUGxvdC5jcmVhdGVMaXN0ZW5lcnMoKVxuICAgICAgICAgICAgU3luY1Njcm9sbC5pbml0KCkgXG4gICAgICAgICAgICBQbG90LmFuaW1hdGVCYW5uZXJOb3RpZmljYXRpb25zKCkgXG5cbiAgICAgICAgfSxcblxuICAgICAgICBjcmVhdGVMaXN0ZW5lcnM6ICgpID0+IHtcblxuICAgICAgICAgICBcdGNvbnN0IGJ1cmdlck1lbnVUcmlnZ2VycyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5KUy0tbWVudVRyaWdnZXInKVxuICAgICAgICAgICAgXG4gICAgICAgICAgICBpZihidXJnZXJNZW51VHJpZ2dlcnMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgIGZvcih2YXIgYnVyZ2VyTWVudVRyaWdnZXIgb2YgYnVyZ2VyTWVudVRyaWdnZXJzKSB7XG4gICAgICAgICAgICAgICAgICAgIGJ1cmdlck1lbnVUcmlnZ2VyLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJyxQbG90LnRvZ2dsZUJ1cmdlcilcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGNvbnN0IHNpZGVTd2lwZXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcucGxvdFNpZGVTd2lwZXMnKVxuXG4gICAgICAgICAgICBpZihzaWRlU3dpcGVzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICBQbG90LnNpZGVTd2lwZXMoc2lkZVN3aXBlcylcbiAgICAgICAgICAgIH1cblxuICAgICAgICB9LFxuXG4gICAgICAgIGFuaW1hdGVCYW5uZXJOb3RpZmljYXRpb25zIDogKCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgYmFubmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLkpTLS1iYW5uZXJOb3RpZmljYXRpb24nKVxuXG4gICAgICAgICAgICBpZihiYW5uZXIpXG4gICAgICAgICAgICAgICAgaWYoYmFubmVyLmRhdGFzZXQuYW5pbWF0aW9uVHlwZSA9PSAnYWx3YXlzJykge1xuICAgICAgICAgICAgICAgICAgICBQbG90LmJ1aWxkQmFubmVyUmVwZWF0aW5nVGV4dChiYW5uZXIpXG4gICAgICAgICAgICAgICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdyZXNpemUnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIFBsb3QuYnVpbGRCYW5uZXJSZXBlYXRpbmdUZXh0KGJhbm5lcilcbiAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBQbG90LmNoZWNrVG9TZWVJZldlTmVlZFRvQW5pbWF0aW9uQmFubmVyKGJhbm5lcilcbiAgICAgICAgICAgICAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgUGxvdC5jaGVja1RvU2VlSWZXZU5lZWRUb0FuaW1hdGlvbkJhbm5lcihiYW5uZXIpXG4gICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICB9LFxuXG4gICAgICAgIGNoZWNrVG9TZWVJZldlTmVlZFRvQW5pbWF0aW9uQmFubmVyIDogYmFubmVyID0+IHtcblxuICAgICAgICAgICAgYmFubmVyLmlubmVySFRNTCA9IGA8ZGl2PiR7YmFubmVyLmRhdGFzZXQubWVzc2FnZX08L2Rpdj5gXG4gICAgICAgICAgICBjb25zdCBkaXYxID0gYmFubmVyLnF1ZXJ5U2VsZWN0b3IoJ2RpdjpudGgtb2YtdHlwZSgxKScpXG4gICAgICAgICAgICBjb25zdCB3aW5kb3dXaWR0aCA9IHdpbmRvdy5pbm5lcldpZHRoXG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGlmKGRpdjEuc2Nyb2xsV2lkdGggPiB3aW5kb3dXaWR0aCkge1xuICAgICAgICAgICAgICAgIGJhbm5lci5jbGFzc0xpc3QuYWRkKCd3aXRoQW5pbWF0aW9uJylcbiAgICAgICAgICAgICAgICBQbG90LmJ1aWxkQmFubmVyUmVwZWF0aW5nVGV4dChiYW5uZXIpXG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICBiYW5uZXIuY2xhc3NMaXN0LnJlbW92ZSgnd2l0aEFuaW1hdGlvbicpXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfSxcblxuICAgICAgICBidWlsZEJhbm5lclJlcGVhdGluZ1RleHQgOiBiYW5uZXIgPT4ge1xuXG4gICAgICAgICAgICBiYW5uZXIuaW5uZXJIVE1MID0gYDxkaXY+JHtiYW5uZXIuZGF0YXNldC5tZXNzYWdlfTwvZGl2PjxkaXY+JHtiYW5uZXIuZGF0YXNldC5tZXNzYWdlfTwvZGl2PmBcbiAgICAgICAgICAgIGNvbnN0IGRpdjEgPSBiYW5uZXIucXVlcnlTZWxlY3RvcignZGl2Om50aC1vZi10eXBlKDEpJylcbiAgICAgICAgICAgIGNvbnN0IGRpdjIgPSBiYW5uZXIucXVlcnlTZWxlY3RvcignZGl2Om50aC1vZi10eXBlKDIpJylcbiAgICAgICAgICAgIGNvbnN0IHdpbmRvd1dpZHRoID0gd2luZG93LmlubmVyV2lkdGhcblxuICAgICAgICAgICAgZGl2MS5zdHlsZS5hbmltYXRpb25EdXJhdGlvbj0od2luZG93V2lkdGgvMjApK1wic1wiXG4gICAgICAgICAgICBkaXYyLnN0eWxlLmFuaW1hdGlvbkR1cmF0aW9uPSh3aW5kb3dXaWR0aC8yMCkrXCJzXCJcblxuICAgICAgICAgICAgdmFyIGkgID0gMFxuXG4gICAgICAgICAgICB3aGlsZShkaXYxLnNjcm9sbFdpZHRoIDwgd2luZG93V2lkdGggJiYgaSA8IDEwMCkge1xuICAgICAgICAgICAgICAgIGRpdjEuaW5uZXJIVE1MID0gZGl2MS5pbm5lckhUTUwgKyBgICR7YmFubmVyLmRhdGFzZXQubWVzc2FnZX1gXG4gICAgICAgICAgICAgICAgZGl2Mi5pbm5lckhUTUwgPSBkaXYyLmlubmVySFRNTCArIGAgJHtiYW5uZXIuZGF0YXNldC5tZXNzYWdlfWBcbiAgICAgICAgICAgICAgICBpKys7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfSxcblxuICAgICAgICBzaWRlU3dpcGVzIDogKHNpZGVTd2lwZXMpID0+IHtcblxuICAgICAgICAgICAgZm9yKHZhciBzaWRlU3dpcGUgb2Ygc2lkZVN3aXBlcykge1xuXG4gICAgICAgICAgICAgICAgIGlmKHBhcnNlSW50KHNpZGVTd2lwZS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS53aWR0aCkgKyAxIDwgcGFyc2VJbnQoc2lkZVN3aXBlLnNjcm9sbFdpZHRoKSkge1xuXG5cbiAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfSxcblxuICAgICAgICB0b2dnbGVCdXJnZXIgOiAoKSA9PiB7XG5cbiAgICAgICAgICAgIGNvbnN0IGJ1cmdlck1lbnUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuSlMtLWJ1cmdlck1lbnUnKVxuXG4gICAgICAgICAgICBpZighZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsYXNzTGlzdC5jb250YWlucygnYnVyZ2VyT3BlbicpKSB7XG4gICAgICAgICAgICAgICAgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsYXNzTGlzdC5hZGQoJ2J1cmdlck9wZW4nKVxuICAgICAgICAgICAgICAgIEJvZHlTY3JvbGxMb2NrLmRpc2FibGVCb2R5U2Nyb2xsKGJ1cmdlck1lbnUpXG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKCdidXJnZXJPcGVuJylcbiAgICAgICAgICAgICAgICBCb2R5U2Nyb2xsTG9jay5lbmFibGVCb2R5U2Nyb2xsKGJ1cmdlck1lbnUpXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfSxcblxuICAgICAgICBpc1BhZ2UgOiBzbHVnID0+IHtcblxuICAgICAgICAgICAgcmV0dXJuIGRvY3VtZW50LmJvZHkuY2xhc3NMaXN0LmNvbnRhaW5zKCdwYWdlLScrc2x1ZylcblxuICAgICAgICB9LFxuXG4gICAgICAgIGZpeFZoIDogKCkgPT4ge1xuXG4gICAgICAgICAgICAvLyBGaXJzdCB3ZSBnZXQgdGhlIHZpZXdwb3J0IGhlaWdodCBhbmQgd2UgbXVsdGlwbGUgaXQgYnkgMSUgdG8gZ2V0IGEgdmFsdWUgZm9yIGEgdmggdW5pdFxuICAgICAgICAgICAgbGV0IHZoID0gd2luZG93LmlubmVySGVpZ2h0ICogMC4wMVxuICAgICAgICAgICAgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnN0eWxlLnNldFByb3BlcnR5KCctLXZoJywgYCR7dmh9cHhgKVxuXG5cbiAgICAgICAgfSxcblxuICAgICAgICBpc1RvdWNoRGV2aWNlOiAoKSA9PiB7XG5cbiAgICAgICAgICAgIHZhciBwcmVmaXhlcyA9ICcgLXdlYmtpdC0gLW1vei0gLW8tIC1tcy0gJy5zcGxpdCgnICcpXG4gICAgICAgICAgICB2YXIgbXEgPSBmdW5jdGlvbiAocXVlcnkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gd2luZG93Lm1hdGNoTWVkaWEocXVlcnkpLm1hdGNoZXNcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKCgnb250b3VjaHN0YXJ0JyBpbiB3aW5kb3cpIHx8IHdpbmRvdy5Eb2N1bWVudFRvdWNoICYmIGRvY3VtZW50IGluc3RhbmNlb2YgRG9jdW1lbnRUb3VjaCkge1xuICAgICAgICAgICAgXHRkb2N1bWVudC5ib2R5LmFkZENsYXNzKCdpc1RvdWNoRGV2aWNlJykgIFxuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHZhciBxdWVyeSA9IFsnKCcsIHByZWZpeGVzLmpvaW4oJ3RvdWNoLWVuYWJsZWQpLCgnKSwgJ3Bsb3QnLCAnKSddLmpvaW4oJycpXG4gICAgICAgICAgICByZXR1cm4gbXEocXVlcnkpXG4gICAgICAgIH0sXG5cbiAgICAgICAgYXJlV2VBdFRoZVRvcCA6IHNjcm9sbFRvcCA9PiB7XG5cbiAgICAgICAgICAgIGlmKHNjcm9sbFRvcCA+IDApIHtcbiAgICAgICAgICAgICAgICBkb2N1bWVudC5ib2R5LmNsYXNzTGlzdC5hZGQoJ3Njcm9sbGVkJylcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgZG9jdW1lbnQuYm9keS5jbGFzc0xpc3QucmVtb3ZlKCdzY3JvbGxlZCcpXG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG5cbiAgICAgICAgbG9hZFRlbXBsYXRlUGFydCA6IChhcmdzKSA9PiB7IFxuICAgICAgICAgICAgXG4gICAgICAgICAgICB2YXIgZGVmYXVsdHMgPSB7XG4gICAgICAgICAgICAgICAgdGVtcGxhdGVQYXJ0ICAgIDogbnVsbCxcbiAgICAgICAgICAgICAgICBhY3Rpb24gICAgICAgICAgOiAncGxvdExvYWRUZW1wbGF0ZVBhcnQnLCAvL1RoaXMgaXMgdGhlIGFjdGlvbiBmaXJlZCBpbnRvIG91ciBQbG90U2l0ZSBQSFAgc2V0dXAucGhwIGZpbGVcbiAgICAgICAgICAgICAgICBkYXRhICAgICAgICAgICAgOiB7fSxcbiAgICAgICAgICAgICAgICByZXR1cm5PcldyaXRlICAgOiAnd3JpdGUnLCAvLyh3cml0ZXxyZXR1cm4pIGVpdGhlciBhZGRzIGNvbnRlbnQgdG8gY29udGVudEFyZWEsIG9yIHJldHVybnMgbmV3IEhUTUwgaW4gdGhlIHByb21pc2VcbiAgICAgICAgICAgICAgICBjb250ZW50QXJlYSAgICAgOiAnLkpTLS1hamF4VGFyZ2V0QXJlYScsIFxuICAgICAgICAgICAgICAgIGFwcGVuZCAgICAgICAgICA6IGZhbHNlXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGxldCBzZXR0aW5ncyA9IE9iamVjdC5hc3NpZ24oe30sIGRlZmF1bHRzLCBhcmdzKVxuICAgICAgICAgICAgXG5cbiAgICAgICAgICAgIHRyeSB7IFxuICAgICAgICAgICAgICAgIGlmKHNldHRpbmdzLnJldHVybk9yV3JpdGUgPT0gJ3dyaXRlJylcbiAgICAgICAgICAgICAgICAgICAgdmFyIGNvbnRlbnRBcmVhID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihzZXR0aW5ncy5jb250ZW50QXJlYSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNhdGNoIChlKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ2NvbnRlbnRBcmVhIG5lZWRzIHRvIGJlIGEgdmFsaWQgc2VsZWN0b3IhJylcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2VcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYoY29udGVudEFyZWEgPT0gbnVsbCAmJiBzZXR0aW5ncy5yZXR1cm5PcldyaXRlID09ICd3cml0ZScpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnQ291bGRuXFwndCBmaW5kIHNlbGVjdG9yIGZvciBjb250ZW50QXJlYSBvbiBwYWdlLicpXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmKHNldHRpbmdzLnRlbXBsYXRlUGFydCA9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ0NvdWxkblxcJ3QgZmluZCB0ZW1wbGF0ZSBwYXJ0LiBNYWtlIHN1cmUgeW91IHNldCBvbmUgYXMgdGVtcGxhdGVQYXJ0LCBmb3IgZXhhbXBsZSBwYXJ0cy9hamF4LWNvbnRlbnQnKVxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZih0eXBlb2Yoc2V0dGluZ3MuYXBwZW5kKSAhPT0gXCJib29sZWFuXCIpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnVmFsdWUgcGFzc2VkIHRvIGFwcGVuZCB3YXMgbm90IGEgYm9vbGVhbi4nKVxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZihzZXR0aW5ncy5yZXR1cm5PcldyaXRlID09ICd3cml0ZScpXG4gICAgICAgICAgICAgICAgY29udGVudEFyZWEuY2xhc3NMaXN0LmFkZCgncGxvdExvYWRpbmcnKVxuXG4gICAgICAgICAgICBzZXR0aW5ncy5kYXRhID0ge1xuICAgICAgICAgICAgICAgIGRhdGEgICAgICAgICAgICA6IHNldHRpbmdzLmRhdGEsXG4gICAgICAgICAgICAgICAgYWN0aW9uICAgICAgICAgIDogc2V0dGluZ3MuYWN0aW9uLFxuICAgICAgICAgICAgICAgIHRlbXBsYXRlUGFydCAgICA6IHNldHRpbmdzLnRlbXBsYXRlUGFydFxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB2YXIgcXVlcnlTdHJpbmcgPSBQbG90LnRvUXVlcnlTdHJpbmcoc2V0dGluZ3MuZGF0YSlcbiAgICAgICAgXG4gICAgICAgICAgICByZXR1cm4gZmV0Y2goYXUsIHtcblxuICAgICAgICAgICAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgICAgICAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgICAgICAgICAgICAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWQ7IGNoYXJzZXQ9dXRmLTgnXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBib2R5OiBxdWVyeVN0cmluZyxcbiAgICAgICAgICAgICAgICBjcmVkZW50aWFsczogJ3NhbWUtb3JpZ2luJ1xuXG4gICAgICAgICAgICB9KS50aGVuKGRhdGEgPT4ge1xuXG4gICAgICAgICAgICAgICAgcmV0dXJuIGRhdGEuanNvbigpXG5cbiAgICAgICAgICAgIH0pLnRoZW4ocmVzdWx0ID0+IHtcblxuICAgICAgICAgICAgICAgIGlmKHNldHRpbmdzLnJldHVybk9yV3JpdGUgPT0gJ3dyaXRlJylcbiAgICAgICAgICAgICAgICAgICAgY29udGVudEFyZWEuY2xhc3NMaXN0LnJlbW92ZSgncGxvdExvYWRpbmcnKVxuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIGlmKHJlc3VsdC5zdWNjZXNzKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYoc2V0dGluZ3MucmV0dXJuT3JXcml0ZSAhPT0gJ3dyaXRlJylcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiByZXN1bHQuaHRtbFxuXG4gICAgICAgICAgICAgICAgICAgIGlmKHNldHRpbmdzLmFwcGVuZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29udGVudEFyZWEuaW5zZXJ0QWRqYWNlbnRIVE1MKCdiZWZvcmVlbmQnLCByZXN1bHQuaHRtbClcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlICB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb250ZW50QXJlYS5pbm5lckhUTUwgPSByZXN1bHQuaHRtbFxuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgY29udGVudEFyZWEucXVlcnlTZWxlY3RvckFsbCgnLkpTLS1sYXp5TG9hZCcpLmZvckVhY2goZWwgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgTGF6eUxvYWQub2JzZXJ2ZXIub2JzZXJ2ZShlbClcbiAgICAgICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlc3VsdC5odG1sXG5cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIH0pLmNhdGNoKGVycm9yID0+e1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdlcnJvcicsZXJyb3IpXG5cbiAgICAgICAgICAgIH0pXG5cblxuXG4gICAgICAgIH0sXG5cbiAgICAgICAgZGF0ZUZvcm1hdCA6IChkYXRlLGZvcm1hdCkgPT4ge1xuXG4gICAgICAgICAgICBpZihmb3JtYXQgPT0gJ2RTIE0nKVxuICAgICAgICAgICAgICAgIHJldHVybiBkYXRlLmdldERhdGUoKSArIFBsb3QuZ2V0T3JkaW5hbChkYXRlLmdldERhdGUoKSkgKyAnICcgKyBQbG90LmdldE1vbnRoKGRhdGUpXG5cbiAgICAgICAgICAgIGlmKGZvcm1hdCA9PSAnTSBkUycpXG4gICAgICAgICAgICAgICAgcmV0dXJuIFBsb3QuZ2V0TW9udGgoZGF0ZSkgKyAnICcgKyBkYXRlLmdldERhdGUoKSArIFBsb3QuZ2V0T3JkaW5hbChkYXRlLmdldERhdGUoKSkgXG5cbiAgICAgICAgICAgIGlmKGZvcm1hdCA9PSAnZC9tL3knKVxuICAgICAgICAgICAgICAgIHJldHVybiBkYXRlLmdldERhdGUoKSArICcvJyArIChkYXRlLmdldE1vbnRoKCkgKyAxKSArICcvJyArIGRhdGUuZ2V0RnVsbFllYXIoKS50b1N0cmluZygpLnN1YnN0cigtMilcblxuICAgICAgICAgICAgaWYoZm9ybWF0ID09ICdtL2QveScpXG4gICAgICAgICAgICAgICAgcmV0dXJuIChkYXRlLmdldE1vbnRoKCkgKyAxKSArICcvJyArIGRhdGUuZ2V0RGF0ZSgpICsgJy8nICsgZGF0ZS5nZXRGdWxsWWVhcigpLnRvU3RyaW5nKCkuc3Vic3RyKC0yKVxuXG4gICAgICAgICAgICByZXR1cm4gUGxvdC5nZXREYXlPZldlZWsoZGF0ZSlcbiAgICAgICAgIH0sXG5cbiAgICAgICAgZ2V0RGF5T2ZXZWVrIDogZGF0ZSA9PiB7XG5cbiAgICAgICAgICAgIGNvbnN0IGRheXMgPSBbXG4gICAgICAgICAgICAgICAgJ1N1bmRheScsXG4gICAgICAgICAgICAgICAgJ01vbmRheScsXG4gICAgICAgICAgICAgICAgJ1R1ZXNkYXknLFxuICAgICAgICAgICAgICAgICdXZWRuZXNkYXknLFxuICAgICAgICAgICAgICAgICdUaHVyc2RheScsXG4gICAgICAgICAgICAgICAgJ0ZyaWRheScsXG4gICAgICAgICAgICAgICAgJ1NhdHVyZGF5J1xuICAgICAgICAgICAgXVxuXG4gICAgICAgICAgICByZXR1cm4gZGF5c1tkYXRlLmdldERheSgpXVxuXG4gICAgICAgIH0sXG5cbiAgICAgICAgZ2V0T3JkaW5hbCA6IG51bWJlciA9PiB7XG5cbiAgICAgICAgICAgICAgaWYgKG51bWJlciA+IDMgJiYgbnVtYmVyIDwgMjEpIHJldHVybiAndGgnO1xuICAgICAgICAgICAgICBzd2l0Y2ggKG51bWJlciAlIDEwKSB7XG4gICAgICAgICAgICAgICAgY2FzZSAxOiAgcmV0dXJuIFwic3RcIjtcbiAgICAgICAgICAgICAgICBjYXNlIDI6ICByZXR1cm4gXCJuZFwiO1xuICAgICAgICAgICAgICAgIGNhc2UgMzogIHJldHVybiBcInJkXCI7XG4gICAgICAgICAgICAgICAgZGVmYXVsdDogcmV0dXJuIFwidGhcIjtcbiAgICAgICAgICAgICAgfVxuXG4gICAgICAgIH0sXG5cblxuICAgICAgICBnZXRNb250aCA6IGRhdGUgPT4ge1xuXG4gICAgICAgICAgICBjb25zdCBtb250aE5hbWVzID0gW1wiSmFuXCIsIFwiRmViXCIsIFwiTWFyXCIsIFwiQXByXCIsIFwiTWF5XCIsIFwiSnVuXCIsXG4gICAgICAgICAgICAgIFwiSnVsXCIsIFwiQXVnXCIsIFwiU2VwXCIsIFwiT2N0XCIsIFwiTm92XCIsIFwiRGVjXCJcbiAgICAgICAgICAgIF07XG5cbiAgICAgICAgICAgIHJldHVybiBtb250aE5hbWVzW2RhdGUuZ2V0TW9udGgoKV1cbiAgICAgICAgfSxcblxuICAgICAgICB0b1F1ZXJ5U3RyaW5nIDogKG9iaiwgcHJlZml4KSA9PiB7XG4gICAgICAgICAgICB2YXIgc3RyID0gW10sIGssIHY7XG4gICAgICAgICAgICBmb3IodmFyIHAgaW4gb2JqKSB7XG4gICAgICAgICAgICAgICAgaWYgKCFvYmouaGFzT3duUHJvcGVydHkocCkpIHtjb250aW51ZTt9IC8vIHNraXAgdGhpbmdzIGZyb20gdGhlIHByb3RvdHlwZVxuICAgICAgICAgICAgICAgIGlmICh+cC5pbmRleE9mKCdbJykpIHtcbiAgICAgICAgICAgICAgICAgICAgayA9IHByZWZpeCA/IHByZWZpeCArIFwiW1wiICsgcC5zdWJzdHJpbmcoMCwgcC5pbmRleE9mKCdbJykpICsgXCJdXCIgKyBwLnN1YnN0cmluZyhwLmluZGV4T2YoJ1snKSkgOiBwO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGsgPSBwcmVmaXggPyBwcmVmaXggKyBcIltcIiArIHAgKyBcIl1cIiA6IHA7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHYgPSBvYmpbcF07XG4gICAgICAgICAgICAgICAgc3RyLnB1c2godHlwZW9mIHYgPT0gXCJvYmplY3RcIiA/XG4gICAgICAgICAgICAgICAgICBQbG90LnRvUXVlcnlTdHJpbmcodiwgaykgOlxuICAgICAgICAgICAgICAgICAgZW5jb2RlVVJJQ29tcG9uZW50KGspICsgXCI9XCIgKyBlbmNvZGVVUklDb21wb25lbnQodikpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHN0ci5qb2luKFwiJlwiKTtcbiAgICAgICAgfVxuXG5cbiAgICB9XG5cbiAgICBtb2R1bGUuZXhwb3J0cyA9IFBsb3RcblxufSgpKVxuIiwiKGZ1bmN0aW9uICgpIHtcblxuICAgIHZhciBcbiAgICBTeW5jc2Nyb2xsXG5cbiAgICBTeW5jc2Nyb2xsID0ge1xuXG4gICAgICAgIGluaXQ6ICgpID0+IHtcblxuICAgICAgICAgICAgdmFyIFdpZHRoICAgICAgICAgICA9ICdXaWR0aCcsXG4gICAgICAgICAgICBIZWlnaHQgICAgICAgICAgICAgID0gJ0hlaWdodCcsXG4gICAgICAgICAgICBUb3AgICAgICAgICAgICAgICAgID0gJ1RvcCcsXG4gICAgICAgICAgICBMZWZ0ICAgICAgICAgICAgICAgID0gJ0xlZnQnLFxuICAgICAgICAgICAgc2Nyb2xsICAgICAgICAgICAgICA9ICdzY3JvbGwnLFxuICAgICAgICAgICAgY2xpZW50ICAgICAgICAgICAgICA9ICdjbGllbnQnLFxuICAgICAgICAgICAgRXZlbnRMaXN0ZW5lciAgICAgICA9ICdFdmVudExpc3RlbmVyJyxcbiAgICAgICAgICAgIGFkZEV2ZW50TGlzdGVuZXIgICAgPSAnYWRkJyArIEV2ZW50TGlzdGVuZXIsXG4gICAgICAgICAgICBsZW5ndGggICAgICAgICAgICAgID0gJ2xlbmd0aCcsXG4gICAgICAgICAgICBNYXRoX3JvdW5kICAgICAgICAgID0gTWF0aC5yb3VuZCxcbiAgICAgICAgICAgIG5hbWVzICAgICAgICAgICAgICAgPSB7fSxcbiAgICAgICAgICAgIHJlc2V0ID0gZnVuY3Rpb24oKSB7XG5cbiAgICAgICAgICAgICAgICB2YXIgZWxlbXMgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdzeW5jJytzY3JvbGwpXG5cbiAgICAgICAgICAgICAgICAvLyBjbGVhcmluZyBleGlzdGluZyBsaXN0ZW5lcnNcbiAgICAgICAgICAgICAgICB2YXIgaSwgaiwgZWwsIGZvdW5kLCBuYW1lXG4gICAgICAgICAgICAgICAgZm9yIChuYW1lIGluIG5hbWVzKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChuYW1lcy5oYXNPd25Qcm9wZXJ0eShuYW1lKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgZm9yIChpID0gMDsgaSA8IG5hbWVzW25hbWVdW2xlbmd0aF07IGkrKykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWVzW25hbWVdW2ldWydyZW1vdmUnK0V2ZW50TGlzdGVuZXJdKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzY3JvbGwsIG5hbWVzW25hbWVdW2ldLnN5biwgMFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIC8vIHNldHRpbmctdXAgdGhlIG5ldyBsaXN0ZW5lcnNcbiAgICAgICAgICAgICAgICBmb3IgKGkgPSAwOyBpIDwgZWxlbXNbbGVuZ3RoXTspIHtcbiAgICAgICAgICAgICAgICAgICAgZm91bmQgPSBqID0gMFxuICAgICAgICAgICAgICAgICAgICBlbCA9IGVsZW1zW2krK11cbiAgICAgICAgICAgICAgICAgICAgaWYgKCEobmFtZSA9IGVsLmdldEF0dHJpYnV0ZSgnbmFtZScpKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gbmFtZSBhdHRyaWJ1dGUgaXMgbm90IHNldFxuICAgICAgICAgICAgICAgICAgICAgICAgY29udGludWVcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIGVsID0gZWxbc2Nyb2xsKydlciddfHxlbCAgLy8gbmVlZGVkIGZvciBpbnRlbmNlXG5cbiAgICAgICAgICAgICAgICAgICAgLy8gc2VhcmNoaW5nIGZvciBleGlzdGluZyBlbnRyeSBpbiBhcnJheSBvZiBuYW1lcztcbiAgICAgICAgICAgICAgICAgICAgLy8gc2VhcmNoaW5nIGZvciB0aGUgZWxlbWVudCBpbiB0aGF0IGVudHJ5XG4gICAgICAgICAgICAgICAgICAgIGZvciAoO2ogPCAobmFtZXNbbmFtZV0gPSBuYW1lc1tuYW1lXXx8W10pW2xlbmd0aF07KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBmb3VuZCB8PSBuYW1lc1tuYW1lXVtqKytdID09IGVsXG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICBpZiAoIWZvdW5kKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBuYW1lc1tuYW1lXS5wdXNoKGVsKVxuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgZWwuZVggPSBlbC5lWSA9IDA7XG5cbiAgICAgICAgICAgICAgICAgICAgKGZ1bmN0aW9uKGVsLCBuYW1lKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBlbFthZGRFdmVudExpc3RlbmVyXShcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzY3JvbGwsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZWwuc3luID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBlbGVtcyA9IG5hbWVzW25hbWVdXG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHNjcm9sbFggPSBlbFtzY3JvbGwrTGVmdF1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHNjcm9sbFkgPSBlbFtzY3JvbGwrVG9wXVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciB4UmF0ZSA9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzY3JvbGxYIC9cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIChlbFtzY3JvbGwrV2lkdGhdIC0gZWxbY2xpZW50K1dpZHRoXSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHlSYXRlID1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNjcm9sbFkgL1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKGVsW3Njcm9sbCtIZWlnaHRdIC0gZWxbY2xpZW50K0hlaWdodF0pXG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHVwZGF0ZVggPSBzY3JvbGxYICE9IGVsLmVYXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciB1cGRhdGVZID0gc2Nyb2xsWSAhPSBlbC5lWVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBvdGhlckVsLCBpID0gMFxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsLmVYID0gc2Nyb2xsWFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbC5lWSA9IHNjcm9sbFlcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3IgKDtpIDwgZWxlbXNbbGVuZ3RoXTspIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG90aGVyRWwgPSBlbGVtc1tpKytdXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAob3RoZXJFbCAhPSBlbCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh1cGRhdGVYICYmXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIE1hdGhfcm91bmQoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvdGhlckVsW3Njcm9sbCtMZWZ0XSAtXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAoc2Nyb2xsWCA9IG90aGVyRWwuZVggPVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIE1hdGhfcm91bmQoeFJhdGUgKlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAob3RoZXJFbFtzY3JvbGwrV2lkdGhdIC1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG90aGVyRWxbY2xpZW50K1dpZHRoXSkpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb3RoZXJFbFtzY3JvbGwrTGVmdF0gPSBzY3JvbGxYXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh1cGRhdGVZICYmXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIE1hdGhfcm91bmQoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvdGhlckVsW3Njcm9sbCtUb3BdIC1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIChzY3JvbGxZID0gb3RoZXJFbC5lWSA9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgTWF0aF9yb3VuZCh5UmF0ZSAqXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIChvdGhlckVsW3Njcm9sbCtIZWlnaHRdIC1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG90aGVyRWxbY2xpZW50K0hlaWdodF0pKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG90aGVyRWxbc2Nyb2xsK1RvcF0gPSBzY3JvbGxZXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSwgMFxuICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICB9KShlbCwgbmFtZSlcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBcbiAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgaWYgKGRvY3VtZW50LnJlYWR5U3RhdGUgPT0gXCJjb21wbGV0ZVwiKSB7XG4gICAgICAgICAgICAgICAgcmVzZXQoKVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB3aW5kb3dbYWRkRXZlbnRMaXN0ZW5lcl0oXCJsb2FkXCIsIHJlc2V0LCAwKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICB9LFxuXG4gICAgfVxuXG4gICAgbW9kdWxlLmV4cG9ydHMgPSBTeW5jc2Nyb2xsXG5cbn0oKSlcbiIsIihmdW5jdGlvbiAoKSB7XG5cbiAgICB2YXIgUm9sbGVyVGV4dFxuXG4gICAgUm9sbGVyVGV4dCA9IHtcbiAgICAgICAgcGhyYXNlczogW1xuICAgICAgICAgICAgJ211bHRpLWRheScsXG4gICAgICAgICAgICAnd2Vla2VuZCcsXG4gICAgICAgICAgICAnYm91dGlxdWUnLFxuICAgICAgICAgICAgJ2NvdW50cnknLFxuICAgICAgICAgICAgJ2hvbGlkYXknLFxuICAgICAgICAgICAgJ3JvY2snLFxuICAgICAgICAgICAgJ2NpdHknLFxuICAgICAgICAgICAgJ2RhbmNlJyxcbiAgICAgICAgICAgICdwb3N0LXB1bmsnLFxuICAgICAgICAgICAgJ2ZhbWlseScsXG4gICAgICAgICAgICAnbWV0YWwnLFxuICAgICAgICAgICAgJ2phenonLFxuICAgICAgICAgICAgJ3dlaXJkJyxcbiAgICAgICAgICAgICdzcGVjaWFsJyxcbiAgICAgICAgICAgICdjbGFzc2ljYWwnLFxuICAgICAgICAgICAgJ3dpbnRlcidcbiAgICAgICAgXSxcbiAgICAgICAgZG9tOiB7XG4gICAgICAgICAgICB0ZXh0V3JhcDogZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnJvbGxlclRleHQnKSxcbiAgICAgICAgICAgIGN1cnJlbnQ6IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLXRleHQtY3VycmVudF0nKSxcbiAgICAgICAgICAgIG5leHQ6IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLXRleHQtbmV4dF0nKSxcbiAgICAgICAgfSxcbiAgICAgICAgaW50ZXJ2YWxMZW5ndGggICAgICAgICAgOiAxNTAwLFxuICAgICAgICBuZXh0UGhyYXNlICAgICAgICAgIDogJ3dpbnRlcicsXG4gICAgICAgIGNvdW50ZXIgICAgICAgICAgICAgICAgIDogbnVsbCxcbiAgICAgICAgdGlja2VyICAgICAgICAgICAgICAgICAgOiBmYWxzZSxcblxuICAgICAgICBpbml0OiAoKSA9PiB7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgICBcbiAgICAgICAgICAgIGlmKFJvbGxlclRleHQuZG9tLnRleHRXcmFwKVxuICAgICAgICAgICAgICAgIFJvbGxlclRleHQuc3RhcnRjb3VudGVyKClcbiAgICAgICAgICAgIFxuICAgICAgICB9LFxuXG4gICAgICAgIHN0YXJ0Y291bnRlcjogKCkgPT4ge1xuICAgICAgICAgICAgXG4gICAgICAgICAgICBSb2xsZXJUZXh0LnNldFdpZHRoKFJvbGxlclRleHQuZG9tLmN1cnJlbnQpXG5cbiAgICAgICAgICAgIGxldCBpID0gMVxuICAgICAgICAgICAgUm9sbGVyVGV4dC5jb3VudGVyID0gc2V0SW50ZXJ2YWwoKCkgPT4geyAgICAgICBcblxuICAgICAgICAgICAgICAgIGNvbnN0IGN1cnJlbnRQaHJhc2UgPSBSb2xsZXJUZXh0LnBocmFzZXNbaV1cbiAgICAgICAgICAgICAgICBjb25zdCBuZXh0UGhyYXNlID0gUm9sbGVyVGV4dC5waHJhc2VzW2kgKyAxXSA/IFJvbGxlclRleHQucGhyYXNlc1tpICsgMV0gOiBSb2xsZXJUZXh0LnBocmFzZXNbMF1cblxuICAgICAgICAgICAgICAgIFJvbGxlclRleHQuZG9tLnRleHRXcmFwLmNsYXNzTGlzdC5hZGQoJ3R1cm4nKVxuXG4gICAgICAgICAgICAgICAgUm9sbGVyVGV4dC5zZXRXaWR0aChSb2xsZXJUZXh0LmRvbS5uZXh0KVxuXG4gICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG5cbiAgICAgICAgICAgICAgICAgICAgUm9sbGVyVGV4dC5kb20udGV4dFdyYXAuY2xhc3NMaXN0LnJlbW92ZSgndHVybicpXG5cbiAgICAgICAgICAgICAgICAgICAgLy8gVXBkYXRlIG1vYmlsZSBzY3JlZW4gaW1hZ2VcbiAgICAgICAgICAgICAgICAgICAgUm9sbGVyVGV4dC5kb20uY3VycmVudC50ZXh0Q29udGVudCA9IGN1cnJlbnRQaHJhc2VcbiAgICAgICAgICAgICAgICAgICAgUm9sbGVyVGV4dC5kb20ubmV4dC50ZXh0Q29udGVudCA9IG5leHRQaHJhc2VcblxuICAgICAgICAgICAgICAgIH0sIDEwMDApXG5cblxuICAgICAgICAgICAgICAgIC8vIElmIHdlIHJlYWNoIHRoZSBlbmQgb2YgdGhlIHRoZW1lcywgcmVzZXQgdG8gZmlyc3QgdGhlbWVcbiAgICAgICAgICAgICAgICBpID49IFJvbGxlclRleHQucGhyYXNlcy5sZW5ndGggLSAxID8gaSA9IDAgOiBpKytcblxuICAgICAgICAgICAgfSwgUm9sbGVyVGV4dC5pbnRlcnZhbExlbmd0aCk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgc2V0V2lkdGg6IChlbGVtZW50KSA9PiB7XG4gICAgICAgICAgICBsZXQgdGV4dFdpZHRoID0gZWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS53aWR0aFxuICAgICAgICAgICAgXG4gICAgICAgICAgICBSb2xsZXJUZXh0LmRvbS50ZXh0V3JhcC5zdHlsZS53aWR0aCA9IGAke3RleHRXaWR0aH1weGBcbiAgICAgICAgfVxuXG4gICAgfVxuXG4gICAgbW9kdWxlLmV4cG9ydHMgPSBSb2xsZXJUZXh0XG5cbn0oKSlcbiIsIihmdW5jdGlvbiAoKSB7XG5cbiAgICB2YXIgVG9nZ2xlUHJpY2VcblxuICAgIFRvZ2dsZVByaWNlID0ge1xuICAgICAgICBkb206IHtcbiAgICAgICAgICAgIGNvbnRhaW5lcjogZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLkpTLS1Ub2dnbGVQcmljZScpLFxuICAgICAgICAgICAgYW5udWFsQnV0dG9uOiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuSlMtLXBsYW5Ub2dnbGUtLWFubnVhbCcpLFxuICAgICAgICAgICAgbW9udGhseUJ1dHRvbjogZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLkpTLS1wbGFuVG9nZ2xlLS1tb250aGx5JyksXG4gICAgICAgIH0sXG5cbiAgICAgICAgaW5pdDogKCkgPT4ge1xuXG4gICAgICAgICAgICAvLyBVcGRhdGUgZGF0YSBzZXQgd2l0aCBcbiAgICAgICAgICAgIFRvZ2dsZVByaWNlLmRvbS5hbm51YWxCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBUb2dnbGVQcmljZS5zaG93QW5udWFsKVxuICAgICAgICAgICAgY29uc29sZS5sb2coVG9nZ2xlUHJpY2UuZG9tKSBcbiAgICAgICAgICAgIFRvZ2dsZVByaWNlLmRvbS5tb250aGx5QnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgVG9nZ2xlUHJpY2Uuc2hvd01vbnRobHkpXG4gICAgICAgICAgICBcbiAgICAgICAgfSxcblxuICAgICAgICBzaG93QW5udWFsOiAoKSA9PiB7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGlmKFRvZ2dsZVByaWNlLmRvbS5jb250YWluZXIuZGF0YXNldC5wbGFuID0gXCJhbm51YWxcIikgXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuXG4gICAgICAgICAgICBUb2dnbGVQcmljZS5kb20uY29udGFpbmVyLmRhdGFzZXQucGxhbiA9IFwiYW5uYXVsXCJcbiAgICAgICAgfSxcblxuICAgICAgICBzaG93TW9udGhseTogKCkgPT4ge1xuICAgICAgICAgICAgaWYoVG9nZ2xlUHJpY2UuZG9tLmNvbnRhaW5lci5kYXRhc2V0LnBsYW4gPSBcIm1vbnRobHlcIikgXG4gICAgICAgICAgICByZXR1cm47XG5cbiAgICAgICAgVG9nZ2xlUHJpY2UuZG9tLmNvbnRhaW5lci5kYXRhc2V0LnBsYW4gPSBcIm1vbnRobHlcIlxuICAgICAgICB9XG5cblxuICAgIH1cblxuICAgIG1vZHVsZS5leHBvcnRzID0gVG9nZ2xlUHJpY2VcblxufSgpKVxuIiwiKGZ1bmN0aW9uICgpe1xuXG4gICAgJ3VzZSBzdHJpY3QnXG5cblx0dmFyIFBsb3QgICAgXHRcdD0gcmVxdWlyZSgnLi4vLi4vLi4vcGxvdC1jb3JlL3NyYy9qcy9wbG90JyksICBcblx0XHRMYXp5TG9hZCAgIFx0IFx0PSByZXF1aXJlKCcuLi8uLi8uLi9wbG90LWNvcmUvc3JjL2pzL2xhenlsb2FkJyksXG5cdFx0TW9kYWxzXHRcdFx0PSByZXF1aXJlKCcuLi8uLi8uLi9wbG90LWNvcmUvc3JjL2pzL21vZGFscycpLFxuXHRcdENhcm91c2Vsc1x0XHQ9IHJlcXVpcmUoJy4uLy4uLy4uL3Bsb3QtY29yZS9zcmMvanMvY2Fyb3VzZWxzJyksXG5cdFx0U21vb3RoIFx0XHRcdD0gcmVxdWlyZSgnLi4vLi4vLi4vcGxvdC1jb3JlL3NyYy9qcy9wbG90LXNtb290aC1zY3JvbGwnKSxcblx0XHRGQVFzIFx0XHRcdD0gcmVxdWlyZSgnLi4vLi4vLi4vcGxvdC1jb3JlL3NyYy9qcy9mYXFzJyksXG5cdFx0Ly8gQ3VzdG9tTW91c2UgXHQ9IHJlcXVpcmUoJy4uLy4uLy4uL3Bsb3QtY29yZS9zcmMvanMvY3VzdG9tLW1vdXNlJyksXG5cdFx0SG9tZVx0XHRcdD0gcmVxdWlyZSgnLi9wYWdlcy9ob21lJyksXG5cdFx0Um9sbGVyVGV4dCAgICAgID0gcmVxdWlyZSgnLi9jb21wb25lbnRzL3JvbGxlci10ZXh0JyksXG5cdFx0VG9nZ2xlUHJpY2UgICAgID0gcmVxdWlyZSgnLi9jb21wb25lbnRzL3RvZ2dsZS1wcmljZScpLFxuXHRcdEFydGlzdHNcdFx0XHQ9IHJlcXVpcmUoJy4vcGFnZXMvYXJ0aXN0cycpLFxuXHRcdFNjaGVkdWxlXHRcdD0gcmVxdWlyZSgnLi9wYWdlcy9zY2hlZHVsZScpLFxuXHRcdE5ld3MgXHRcdFx0PSByZXF1aXJlKCcuL3BhZ2VzL25ld3MnKSxcblx0ICAgIE1haW5cblxuXHRNYWluID0ge1xuXG5cdFx0aW5pdDogKCkgPT4ge1x0XG5cblx0XHRcdE1haW4uaW5pdGFsaXplU21vb3RoKClcblxuXHRcdFx0UGxvdC5pbml0KCkgXG5cdFx0XHRMYXp5TG9hZC5pbml0KClcblx0XHRcdE1vZGFscy5pbml0KCkgIFxuXHRcdFx0Q2Fyb3VzZWxzLmluaXQoKVxuXHRcdFx0RkFRcy5pbml0KClcblx0XHRcdFJvbGxlclRleHQuaW5pdCgpXG5cdFx0XHQvLyBDdXN0b21Nb3VzZS5pbml0KHtcblx0XHRcdC8vIFx0J2EnIFx0XHRcdFx0OiAnYW5jaG9ySG92ZXInLFxuXHRcdFx0Ly8gXHQnLmFsdEhvdmVyVGFyZ2V0J1x0OiAnYWx0SG92ZXInXG5cdFx0XHQvLyB9KVxuXG5cdFx0XHQvL1BhZ2VzXG4gICAgICAgIFx0aWYoUGxvdC5pc1BhZ2UoJ2hvbWUnKSlcblx0XHRcdFx0SG9tZS5pbml0KClcblxuICAgICAgICBcdGlmKFBsb3QuaXNQYWdlKCdzY2hlZHVsZScpKVxuXHRcdFx0XHRTY2hlZHVsZS5pbml0KClcblxuICAgICAgICBcdGlmKFBsb3QuaXNQYWdlKCdhcnRpc3RzJykpXG5cdFx0XHRcdEFydGlzdHMuaW5pdCgpXG5cblx0XHRcdGlmKFBsb3QuaXNQYWdlKCdwcmljaW5nJykpXG5cdFx0XHRcdFRvZ2dsZVByaWNlLmluaXQoKVxuXG5cdFx0XHROZXdzLmluaXQoKVxuXHRcdFx0XG5cdFx0XHRNYWluLmRlbW9BamF4QnV0dG9uKCkgXG5cblx0XHR9LFxuXHRcdFxuXHRcdGluaXRhbGl6ZVNtb290aCA6ICgpID0+IHtcblxuICAgICAgICBcdGNvbnN0IGhhc1Ntb290aFNjcm9sbCA9IGRvY3VtZW50LmJvZHkuZGF0YXNldC5wbG90Q3VzdG9taXplclNtb290aFNjcm9sbFxuXG4gICAgICAgIFx0Y29uc3Qgc21vb3RoU2V0dGluZ3MgPSB7XG5cdFx0XHRcdHN0YW5kYXJkU2Nyb2xsICA6IGhhc1Ntb290aFNjcm9sbCAhPSAneWVzJ1xuXHRcdFx0fVxuXG4gICAgICAgIFx0U21vb3RoLmluaXQoc21vb3RoU2V0dGluZ3MpXG5cbiAgICAgICAgfSxcblxuICAgICAgICBkZW1vQWpheEJ1dHRvbiA6ICgpID0+IHtcblxuXHRcdFx0dmFyIHBsb3REZW1vTG9hZENvbnRlbnQgPSAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLkpTLS1wbG90TG9hZFRlbXBsYXRlUGFydERlbW8nKTtcblx0XHRcdFxuXG5cdFx0XHRpZihwbG90RGVtb0xvYWRDb250ZW50KVxuXG5cdFx0XHRcdHBsb3REZW1vTG9hZENvbnRlbnQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBlID0+IHtcblxuXHRcdFx0XHRcdC8vIFRha2UgYSBsb29rIGF0IHdoYXQgeW91IGNhbiBwYXNzIHRvIHRoaXMgZnVuY3Rpb25cblx0XHRcdFx0XHQvLyB2YXIgYXJncyA9IHtcblx0XHRcdFx0ICAgIC8vICAgICAgICAgICAgICB0ZW1wbGF0ZVBhcnQgICAgOiBudWxsLFxuXHRcdFx0XHQgICAgLy8gICAgICAgICAgICAgIGFjdGlvbiAgICAgICAgICA6ICdwbG90TG9hZFRlbXBsYXRlUGFydCcsIC8vVGhpcyBpcyB0aGUgYWN0aW9uIGZpcmVkIGludG8gb3VyIFBsb3RTaXRlIFBIUCBzZXR1cC5waHAgZmlsZVxuXHRcdFx0XHQgICAgLy8gICAgICAgICAgICAgIGRhdGEgICAgICAgICAgICA6IHt9LCAvL0FueSBkYXRhIHdlJ2QgbGlrZSB0byBwYXNzIHRvIHRoZSB0ZW1wbGF0ZSBwYXJ0LiBcblx0XHRcdFx0ICAgIC8vICAgICAgICAgICAgICBjb250ZW50QXJlYSAgICAgOiAnLkpTLS1hamF4VGFyZ2V0QXJlYScsIC8vV2hlcmUgdGhlIG5ldyBjb250ZW50IGdldHMgaW5zZXJ0c1xuXHRcdFx0XHQgICAgLy8gICAgICAgICAgICAgIGFwcGVuZCAgICAgICAgICA6IGZhbHNlIC8vSWYgd2Ugd2FudCB0byBhcHBlbmQgdG8gdGhlIGFib3ZlIGFyZWEsIG9yIHJlcGxhY2UgdGhlIGNvbnRlbnRcblx0XHRcdFx0ICAgIC8vICAgICAgICAgIH1cblxuXHRcdFx0XHRcdGNvbnN0IGFyZ3MgPSB7XG5cblx0XHRcdFx0XHRcdHRlbXBsYXRlUGFydCA6ICdkZW1vcy9hamF4LWNvbnRlbnQnLCBcblx0XHRcdFx0XHRcdGRhdGEgOiB7XG5cdFx0XHRcdFx0XHRcdCdmb28nIFx0XHQ6ICdiYXInLFxuXHRcdFx0XHRcdFx0XHQnYmFuZ2VycydcdDogJ21hc2gnLFxuXHRcdFx0XHRcdFx0XHQnaGF2aW5nJ1x0OiAnaXQnXG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXG5cblx0XHRcdFx0XHRQbG90LmxvYWRUZW1wbGF0ZVBhcnQoYXJncylcblxuXHRcdFx0XHR9KVxuXG4gICAgICAgIH1cblxuXHR9XG5cblx0d2luZG93Lk1haW4gPSBNYWluXG5cbn0oKSk7XG4gIiwiKGZ1bmN0aW9uICgpIHtcblxuICAgIHZhciBQbG90IFx0XHRcdD0gcmVxdWlyZSgnLi4vLi4vLi4vLi4vcGxvdC1jb3JlL3NyYy9qcy9wbG90JyksXG4gICAgICAgIE1vZGFscyAgICAgICAgICA9IHJlcXVpcmUoJy4uLy4uLy4uLy4uL3Bsb3QtY29yZS9zcmMvanMvbW9kYWxzJyksXG4gICAgXHRBcnRpc3RzXG5cbiAgICAvL01heSB0aGlzIG9iamVjdCBhY3QgYXMgYSBndWlkZSB0byB1c2luZyBQbG90IGNvcmUgZnVuY3Rpb25zXG4gICAgLy9hbmQgaG93IHRvIHNldCB1cCBhamF4IGR5bmFtaWMgZGF0YSB3aXRoIG91ciBuZXcgcHJpbmNpcGxlcyB3aXRoIGVhc2VcbiAgICBBcnRpc3RzID0ge1xuXG4gICAgXHRtYXhQYWdlcyBcdFx0XHQ6IDEsXG4gICAgXHRjdXJyZW50UGFnZSBcdFx0OiAxLFxuICAgIFx0Y3VycmVudEFydGlzdFR5cGVcdDogZmFsc2UsXG4gICAgXHRsb2FkTW9yZUJ1dHRvbiAgXHQ6IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5KUy0tYXJ0aXN0c0xvYWRNb3JlJyksXG5cbiAgICAgICAgaW5pdDogKCkgPT4ge1xuXG4gICAgICAgIFx0QXJ0aXN0cy5zaG93T3JIaWRlTG9hZE1vcmVCdXR0b24oKVxuXG4gICAgICAgICAgICBBcnRpc3RzLmNyZWF0ZUxpc3RlbmVycygpXG5cbiAgICAgICAgfSxcblxuICAgICAgICBjcmVhdGVMaXN0ZW5lcnM6ICgpID0+IHtcblxuICAgICAgICBcdEFydGlzdHMubG9hZE1vcmVCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBlID0+IHtcblxuICAgICAgICBcdFx0Y29uc3QgbmV4dFBhZ2UgPSBwYXJzZUludChBcnRpc3RzLmxvYWRNb3JlQnV0dG9uLmRhdGFzZXQubmV4dFBhZ2UpXG5cbiAgICAgICAgXHRcdEFydGlzdHMuY3VycmVudFBhZ2UgPSBuZXh0UGFnZVxuXG4gICAgICAgIFx0XHRBcnRpc3RzLmxvYWRBcnRpc3RzKHRydWUpXG5cbiAgICAgICAgXHRcdEFydGlzdHMubG9hZE1vcmVCdXR0b24uZGF0YXNldC5uZXh0UGFnZSA9IG5leHRQYWdlICsgMVxuXG4gICAgICAgIFx0fSlcblxuICAgICAgICBcdGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZSA9PiB7XG5cbiAgICAgICAgICAgICAgICAvL0hhdmUgd2UgY2xpY2tlZCBvbiBhbiBhcnRpc3QgdHlwZSBmaWx0ZXIgYnV0dG9uP1xuXHRcdFx0XHRpZiAoZS50YXJnZXQuY2xvc2VzdCgnLkpTLS1hcnRpc3RUeXBlQnV0dG9uJykpIHtcblx0XHRcdFx0XHRBcnRpc3RzLmN1cnJlbnRBcnRpc3RUeXBlID0gZS50YXJnZXQuZGF0YXNldC5hcnRpc3RUeXBlSWRcblx0XHRcdFx0XHRBcnRpc3RzLmN1cnJlbnRQYWdlID0gMVxuICAgICAgICAgICAgICAgICAgICBBcnRpc3RzLmxvYWRNb3JlQnV0dG9uLmRhdGFzZXQubmV4dFBhZ2UgPSAyXG5cdFx0XHRcdFx0QXJ0aXN0cy5sb2FkQXJ0aXN0cyhmYWxzZSkudGhlbigoKSA9PiB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5KUy0tYXJ0aXN0VHlwZUJ1dHRvbicpLmZvckVhY2goYXJ0aXN0VHlwZUJ1dHRvbiA9PiB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhcnRpc3RUeXBlQnV0dG9uLmNsYXNzTGlzdC5yZW1vdmUoJ3NlbGVjdGVkJylcblxuICAgICAgICAgICAgICAgICAgICAgICAgfSlcblxuICAgICAgICAgICAgICAgICAgICAgICAgZS50YXJnZXQuY2xhc3NMaXN0LmFkZCgnc2VsZWN0ZWQnKVxuICAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgIH0pXG5cdFx0XHRcdH0gXG5cblx0XHRcdH0sIGZhbHNlKVxuXG5cbiAgICAgICAgfSxcblxuICAgICAgICBsb2FkQXJ0aXN0cyA6IGFwcGVuZCA9PiB7XG5cbiAgICAgICAgXHRjb25zdCBhcmdzID0ge1xuXHRcdFx0XHR0ZW1wbGF0ZVBhcnQgOiAncGFydHMvYXJ0aXN0LWxpc3RpbmcnLCBcblx0XHRcdFx0ZGF0YSA6IHtcblx0XHRcdFx0XHQncGFnZScgXHRcdFx0OiBBcnRpc3RzLmN1cnJlbnRQYWdlLFxuXHRcdFx0XHRcdCdhcnRpc3RUeXBlJ1x0OiBBcnRpc3RzLmN1cnJlbnRBcnRpc3RUeXBlXG5cdFx0XHRcdH0sXG5cdFx0XHRcdGFwcGVuZCA6IGFwcGVuZCBcblx0XHRcdH1cblxuXHRcdFx0cmV0dXJuIFBsb3QubG9hZFRlbXBsYXRlUGFydChhcmdzKS50aGVuKGh0bWwgPT4ge1xuXG5cdFx0XHRcdEFydGlzdHMuc2hvd09ySGlkZUxvYWRNb3JlQnV0dG9uKClcblxuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlXG5cblx0XHRcdH0pXG5cbiAgICAgICAgfSxcblxuICAgICAgICBzaG93T3JIaWRlTG9hZE1vcmVCdXR0b24gOiAoKSA9PiB7XG5cbiAgICAgICAgXHQvL0NoZWNrIGlmIG1heCBwYWdlcyBpcyAxLiBJZiBpdCBpcywgdGhlcmUncyBvbmx5IDEgcGFnZSBvZiBhcnRpc3RzXG4gICAgICAgIFx0Ly9zbyB3ZSBjYW4gaGlkZSBsb2FkIG1vcmUgYnV0dG9uXG4gICAgICAgIFx0QXJ0aXN0cy5tYXhQYWdlcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5KUy0tbWF4UGFnZXMnKS5kYXRhc2V0Lm1heFBhZ2VzXG5cbiAgICAgICAgXHRpZihBcnRpc3RzLm1heFBhZ2VzID4gQXJ0aXN0cy5jdXJyZW50UGFnZSlcbiAgICAgICAgXHRcdEFydGlzdHMubG9hZE1vcmVCdXR0b24uY2xhc3NMaXN0LnJlbW92ZSgnaGlkZGVuJylcbiAgICAgICAgXHRlbHNlIFxuICAgICAgICBcdFx0QXJ0aXN0cy5sb2FkTW9yZUJ1dHRvbi5jbGFzc0xpc3QuYWRkKCdoaWRkZW4nKVxuXG4gICAgICAgIH1cblxuICAgIH1cblxuICAgIG1vZHVsZS5leHBvcnRzID0gQXJ0aXN0c1xuXG59KCkpIiwiKGZ1bmN0aW9uICgpIHtcblxuICAgIHZhciBIb21lXG5cbiAgICBIb21lID0ge1xuICAgICAgICBkb20gOiB7XG4gICAgICAgICAgICBib2R5ICAgICAgICAgICAgICAgICAgICA6IGRvY3VtZW50LmJvZHksXG4gICAgICAgICAgICByb290ICAgICAgICAgICAgICAgICAgICA6IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2h0bWwnKSxcbiAgICAgICAgICAgIHBob25lICAgICAgICAgICAgICAgICAgIDogZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm1vYmlsZTNEX19waG9uZScpLFxuICAgICAgICAgICAgaG9tZUJhbm5lciAgICAgICAgICAgICAgOiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuaG9tZUJhbm5lcicpLFxuICAgICAgICAgICAgaGVhZGVyICAgICAgICAgICAgICAgICAgOiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjc2l0ZU1haW5IZWFkZXInKSxcbiAgICAgICAgfSxcbiAgICAgICAgaW50ZXJ2YWxMZW5ndGggICAgICAgICAgOiA1MDAwLFxuICAgICAgICBwcmV2aW91c1RoZW1lICAgICAgICAgICA6ICdob21lJyxcbiAgICAgICAgY291bnRlciAgICAgICAgICAgICAgICAgOiBudWxsLFxuICAgICAgICB0aWNrZXIgICAgICAgICAgICAgICAgICA6IGZhbHNlLFxuICAgICAgICBjdXJyZW50TW91c2VQb3NpdGlvbiAgICA6IHtcbiAgICAgICAgICAgIFg6IHdpbmRvdy5pbm5lcldpZHRoIC8gMixcbiAgICAgICAgICAgIFk6IHdpbmRvdy5pbm5lckhlaWdodCAvIDJcbiAgICAgICAgfSxcbiAgICAgICAgcHJldmlvdXNNb3VzZVBvc2l0aW9uICAgOiB7XG4gICAgICAgICAgICBYOiB3aW5kb3cuaW5uZXJXaWR0aCAvIDIsXG4gICAgICAgICAgICBZOiB3aW5kb3cuaW5uZXJIZWlnaHQgLyAyXG4gICAgICAgIH0sXG4gICAgICAgIG1vdXNlTW92ZUFuaW1hdGlvbkZyYW1lIDogbnVsbCxcbiAgICAgICAgdGhlbWVzOiBbXG4gICAgICAgICAgICAnY2FzYScsXG4gICAgICAgICAgICAnZnV0dXJlJyxcbiAgICAgICAgICAgICdoaWdoZXN0JyxcbiAgICAgICAgICAgICdyaHl0aG0nLFxuICAgICAgICAgICAgJ3NvdW5kcycsXG4gICAgICAgICAgICAnYm94JyxcbiAgICAgICAgICAgICdpbnRlcicsXG4gICAgICAgICAgICAnaGFsZnRvbmUnLFxuICAgICAgICAgICAgJ2RlZXAnLFxuICAgICAgICAgICAgJ2FydHMnLFxuICAgICAgICAgICAgJ2FmcmljYW95ZSdcbiAgICAgICAgICAgIFxuICAgICAgICBdLFxuXG4gICAgICAgIGluaXQ6ICgpID0+IHtcblxuICAgICAgICAgICAgSG9tZS5jcmVhdGVMaXN0ZW5lcnMoKVxuXG4gICAgICAgICAgICBIb21lLnN0YXJ0VGhlbWVDb3VudGVyKClcblxuICAgICAgICAgICAgSG9tZS5zZXRXaWR0aE9mUGhvbmUoKVxuXG4gICAgICAgIH0sXG5cbiAgICAgICAgY3JlYXRlTGlzdGVuZXJzOiAoKSA9PiB7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGNvbnN0IGhvbWVCYW5uZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuaG9tZUJhbm5lcicpXG5cbiAgICAgICAgICAgIC8vIE9ic2VydmUgdGhlIGhvbWViYW5uZXIgc2VjdGlvbiBmb3IgY2xhc3MgY2hhbmdlc1xuICAgICAgICAgICAgY29uc3Qgb2JzZXJ2ZXIgPSBuZXcgTXV0YXRpb25PYnNlcnZlcihIb21lLmJhbm5lck11dGF0aW9uKVxuICAgICAgICAgICAgb2JzZXJ2ZXIub2JzZXJ2ZShob21lQmFubmVyLCB7XG4gICAgICAgICAgICAgIGF0dHJpYnV0ZXMgIDogdHJ1ZSxcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGNvbnN0IGJ1cmdlck1lbnVUcmlnZ2VycyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5KUy0tbWVudVRyaWdnZXInKVxuXG4gICAgICAgICAgICAvLyBUb2dnbGUgYmFubmVyIGFuaW1hdGlvbiB3aGVuIG1lbnUgb3BlbmVkL2Nsb3NlZFxuICAgICAgICAgICAgYnVyZ2VyTWVudVRyaWdnZXJzLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgSG9tZS50b2dnbGVUaGVtZUNvdW50ZXIpXG5cbiAgICAgICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdyZXNpemUnLEhvbWUuc2V0V2lkdGhPZlBob25lKVxuICAgICAgICAgICAgXG5cbiAgICAgICAgICAgIGlmKHdpbmRvdy5pbm5lcldpZHRoIDwgNjQwKSB7XG5cbiAgICAgICAgICAgICAgICBIb21lLmRvbS5ib2R5LmNsYXNzTGlzdC5hZGQoJ3NtYWxsU2NyZWVuJyk7XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICB9IGVsc2Uge1xuXG4gICAgICAgICAgICAgICAgSG9tZS5tb3VzZU1vdmVBbmltYXRpb25GcmFtZSA9IHJlcXVlc3RBbmltYXRpb25GcmFtZShIb21lLnJ1bk1vdXNlTW92ZSlcblxuICAgICAgICAgICAgICAgIEhvbWUuZG9tLmhvbWVCYW5uZXIuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vtb3ZlJywgKGUpID0+IEhvbWUudHJhY2tDdXJzb3JQb3NpdGlvbihlKSkgXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgXG4gICAgICAgIH0sXG5cbiAgICAgICAgc2V0V2lkdGhPZlBob25lIDogKCkgPT4ge1xuXG4gICAgICAgICAgICBIb21lLmRvbS5waG9uZS5zdHlsZS53aWR0aCA9IEhvbWUuZG9tLnBob25lLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLmhlaWdodCAqIC41NSArICdweCdcblxuICAgICAgICAgICAgSG9tZS5kb20ucGhvbmUuc3R5bGUub3BhY2l0eSA9IDFcblxuICAgICAgICB9LFxuXG4gICAgICAgIGJhbm5lck11dGF0aW9uOiAobXV0YXRpb25zTGlzdCwgb2JzZXJ2ZXIpID0+IHtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgLy8gSWYgdGhlIGJhbm5lciBlbGVtZW50IGlzIGluIHZpZXdcbiAgICAgICAgICAgIGlmKG11dGF0aW9uc0xpc3RbMF0udGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygncGxvdFNtb290aFNjcm9sbEZyYW1lSW5WaWV3JykgJiYgIUhvbWUuYmFubmVySW5WaWV3KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgSG9tZS5iYW5uZXJJblZpZXcgPSB0cnVlXG5cbiAgICAgICAgICAgICAgICBIb21lLnN0YXJ0VGhlbWVDb3VudGVyKClcblxuICAgICAgICAgICAgfSBcblxuICAgICAgICAgICAgaWYoIW11dGF0aW9uc0xpc3RbMF0udGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygncGxvdFNtb290aFNjcm9sbEZyYW1lSW5WaWV3JykgJiYgSG9tZS5iYW5uZXJJblZpZXcpIHtcblxuICAgICAgICAgICAgICAgIEhvbWUuYmFubmVySW5WaWV3ID0gZmFsc2VcblxuICAgICAgICAgICAgICAgIEhvbWUuc3RvcFRoZW1lQ291bnRlcigpXG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgSG9tZS5yZW1vdmVUaGVtZSgpXG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG5cbiAgICAgICAgdHJhY2tDdXJzb3JQb3NpdGlvbjogKGUpID0+IHtcbiAgICBcbiAgICAgICAgICAgIEhvbWUuY3VycmVudE1vdXNlUG9zaXRpb24gPSB7XG4gICAgICAgICAgICAgICAgWDogZS5jbGllbnRYLFxuICAgICAgICAgICAgICAgIFk6IGUuY2xpZW50WVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBjb25zdCBtaWRkbGVQb2ludFggPSB3aW5kb3cuaW5uZXJXaWR0aCAvIDJcbiAgICAgICAgICAgIGNvbnN0IG1pZGRsZVBvaW50WSA9IHdpbmRvdy5pbm5lckhlaWdodCAvIDJcblxuICAgICAgICAgICAgaWYoSG9tZS5jdXJyZW50TW91c2VQb3NpdGlvbi5YICAtIDIwMDAgPiBtaWRkbGVQb2ludFgpXG4gICAgICAgICAgICAgICAgSG9tZS5jdXJyZW50TW91c2VQb3NpdGlvbi5YID0gbWlkZGxlUG9pbnRYICsgMjAwMFxuICAgICAgICAgICAgXG4gICAgICAgICAgICBpZihIb21lLmN1cnJlbnRNb3VzZVBvc2l0aW9uLlggICsgMjAwMCA8IG1pZGRsZVBvaW50WClcbiAgICAgICAgICAgICAgICBIb21lLmN1cnJlbnRNb3VzZVBvc2l0aW9uLlggPSBtaWRkbGVQb2ludFggLSAyMDAwXG5cbiAgICAgICAgICAgIGlmKEhvbWUuY3VycmVudE1vdXNlUG9zaXRpb24uWSAgLSAyMDAwID4gbWlkZGxlUG9pbnRZKVxuICAgICAgICAgICAgICAgIEhvbWUuY3VycmVudE1vdXNlUG9zaXRpb24uWSA9IG1pZGRsZVBvaW50WSArIDIwMDBcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgaWYoSG9tZS5jdXJyZW50TW91c2VQb3NpdGlvbi5ZICArIDIwMDAgPCBtaWRkbGVQb2ludFkpXG4gICAgICAgICAgICAgICAgSG9tZS5jdXJyZW50TW91c2VQb3NpdGlvbi5ZID0gbWlkZGxlUG9pbnRZIC0gMjAwMFxuXG4gICAgICAgICAgICBpZihIb21lLnRpY2tlciA9PSBmYWxzZSkge1xuICAgICAgICAgICAgICAgIEhvbWUudGlja2VyID0gdHJ1ZVxuICAgICAgICAgICAgICAgIEhvbWUubW91c2VNb3ZlQW5pbWF0aW9uRnJhbWUgPSByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoSG9tZS5ydW5Nb3VzZU1vdmUpXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIFxuICAgICAgICB9LFxuXG4gICAgICAgIHN0YXJ0VGhlbWVDb3VudGVyOiAoKSA9PiB7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIEhvbWUuYmFubmVySW5WaWV3ID0gdHJ1ZTtcblxuICAgICAgICAgICAgLy8gU2V0IGhlYWRlciB0byBkZWZhdWx0IHN0eWxlXG4gICAgICAgICAgICBpZihIb21lLmRvbS5oZWFkZXIuY2xhc3NMaXN0LmNvbnRhaW5zKCdkZWZhdWx0SGVhZGVyJykpXG4gICAgICAgICAgICAgICAgSG9tZS5kb20uaGVhZGVyLmNsYXNzTGlzdC5yZW1vdmUoJ2RlZmF1bHRIZWFkZXInKSBcbiAgICAgICAgXG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGxldCBpID0gMFxuICAgICAgICAgICAgSG9tZS5jb3VudGVyID0gc2V0SW50ZXJ2YWwoKCkgPT4geyAgICAgXG5cbiAgICAgICAgICAgICAgICBIb21lLmRvbS5ib2R5LmNsYXNzTGlzdC5yZW1vdmUoJ3Nob3dGbG9hdGVycycpXG5cbiAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgSG9tZS5kb20uYm9keS5jbGFzc0xpc3QuYWRkKCdzaG93RmxvYXRlcnMnKVxuICAgICAgICAgICAgICAgIH0sMTAwKSAgXG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgLy8gVXBkYXRlIG1vYmlsZSBzY3JlZW4gaW1hZ2VcbiAgICAgICAgICAgICAgICBIb21lLmRvbS5ib2R5LmRhdGFzZXQuY3VycmVudFRoZW1lID0gSG9tZS50aGVtZXNbaV1cbiAgICAgICAgICAgICAgICBIb21lLmRvbS5ib2R5LmRhdGFzZXQucHJldmlvdXNUaGVtZSA9IEhvbWUucHJldmlvdXNUaGVtZVxuXG4gICAgICAgICAgICAgICAgLy8gVXBkYXRlIHN0YXRlXG4gICAgICAgICAgICAgICAgSG9tZS5wcmV2aW91c1RoZW1lID0gSG9tZS50aGVtZXNbaV1cblxuICAgICAgICAgICAgICAgIEhvbWUuZG9tLmJvZHkuY2xhc3NMaXN0LmFkZCgnc2xpZGVNb2JpbGVTY3JlZW4nKVxuXG4gICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIEhvbWUuZG9tLmJvZHkuY2xhc3NMaXN0LnJlbW92ZSgnc2xpZGVNb2JpbGVTY3JlZW4nKSAgICBcbiAgICAgICAgICAgICAgICB9LCAyMDAwKVxuXG4gICAgICAgICAgICAgICAgLy8gSWYgd2UgcmVhY2ggdGhlIGVuZCBvZiB0aGUgdGhlbWVzLCByZXNldCB0byBmaXJzdCB0aGVtZVxuICAgICAgICAgICAgICAgIGkgPj0gSG9tZS50aGVtZXMubGVuZ3RoIC0gMSA/IGkgPSAwIDogaSsrXG5cbiAgICAgICAgICAgIH0sIDcwMDApXG5cbiAgICAgICAgfSxcblxuICAgICAgICBzdG9wVGhlbWVDb3VudGVyOiAoKSA9PiB7XG5cbiAgICAgICAgICAgIGlmKEhvbWUuY291bnRlcilcbiAgICAgICAgICAgICAgICBjbGVhckludGVydmFsKEhvbWUuY291bnRlcilcblxuICAgICAgICB9LFxuXG4gICAgICAgIHJlbW92ZVRoZW1lOiAoKSA9PiB7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGlmKEhvbWUucHJldmlvdXNUaGVtZSlcbiAgICAgICAgICAgICAgICBIb21lLmRvbS5ib2R5LmNsYXNzTGlzdC5yZW1vdmUoSG9tZS5wcmV2aW91c1RoZW1lKVxuXG4gICAgICAgICAgICBIb21lLnByZXZpb3VzVGhlbWUgPSAnJ1xuXG4gICAgICAgICAgICAvLyBTZXQgaGVhZGVyIHRvIGRlZmF1bHQgc3R5bGVcbiAgICAgICAgICAgIEhvbWUuZG9tLmhlYWRlci5jbGFzc0xpc3QuYWRkKCdkZWZhdWx0SGVhZGVyJykgXG4gICAgICAgICAgICBcbiAgICAgICAgfSxcblxuICAgICAgICB0b2dnbGVUaGVtZUNvdW50ZXI6ICgpID0+IHtcbiAgICAgICAgICAgIC8vIENhbmNlbCBhbmltYXRpb24gaWYgbWVudSBpcyBvcGVuXG4gICAgICAgICAgICBpZihIb21lLmRvbS5yb290LmNsYXNzTGlzdC5jb250YWlucygnYnVyZ2VyT3BlbicpKSB7XG5cbiAgICAgICAgICAgICAgICBIb21lLnN0b3BUaGVtZUNvdW50ZXIoKVxuICAgICAgICAgICAgICAgIEhvbWUucmVtb3ZlVGhlbWUoKVxuXG4gICAgICAgICAgICAvLyBTdGFydCBhbmltYXRpb24gaWYgbWVudSBpcyBjbG9zZWQgYW5kIGJhbm5lciBpcyBpbiB2aWV3ICAgIFxuICAgICAgICAgICAgfSBlbHNlIGlmKEhvbWUuYmFubmVySW5WaWV3KSB7XG5cbiAgICAgICAgICAgICAgICBIb21lLnN0YXJ0VGhlbWVDb3VudGVyKClcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcblxuICAgICAgICBydW5Nb3VzZU1vdmUgOiAoKSA9PiB7XG5cblxuICAgICAgICAgICAgY29uc3QgZGlmZmVyZW5jZU9mUG9zaXRpb25zID0ge1xuICAgICAgICAgICAgICAgIFk6IEhvbWUuY3VycmVudE1vdXNlUG9zaXRpb24uWSAtIEhvbWUucHJldmlvdXNNb3VzZVBvc2l0aW9uLlksXG4gICAgICAgICAgICAgICAgWDogSG9tZS5jdXJyZW50TW91c2VQb3NpdGlvbi5YIC0gSG9tZS5wcmV2aW91c01vdXNlUG9zaXRpb24uWFxuICAgICAgICAgICAgfSBcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgSG9tZS5wcmV2aW91c01vdXNlUG9zaXRpb24gPSB7XG4gICAgICAgICAgICAgICAgWDogSG9tZS5wcmV2aW91c01vdXNlUG9zaXRpb24uWCArIChkaWZmZXJlbmNlT2ZQb3NpdGlvbnMuWCAqIDAuMSksXG4gICAgICAgICAgICAgICAgWTogSG9tZS5wcmV2aW91c01vdXNlUG9zaXRpb24uWSArIChkaWZmZXJlbmNlT2ZQb3NpdGlvbnMuWSAqIDAuMSlcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgY29uc3QgeFNoaWZ0ID0gKEhvbWUucHJldmlvdXNNb3VzZVBvc2l0aW9uLlggLSAod2luZG93LmlubmVyV2lkdGggLyAyKSkgLyAod2luZG93LmlubmVyV2lkdGggLyAyIClcbiAgICAgICAgICAgIGNvbnN0IHlTaGlmdCA9ICgod2luZG93LmlubmVySGVpZ2h0IC8gMikgLSBIb21lLnByZXZpb3VzTW91c2VQb3NpdGlvbi5ZKSAvICh3aW5kb3cuaW5uZXJIZWlnaHQgLyAyIClcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgSG9tZS5kb20ucGhvbmUuc3R5bGUudHJhbnNmb3JtID0gYHJvdGF0ZVgoJHsxNSArIHlTaGlmdCo3fWRlZykgcm90YXRlWSgke3hTaGlmdCo2MCA+IDUwID8gNTAgOiB4U2hpZnQqNjB9ZGVnKWBcblxuICAgICAgICAgICAgY29uc3QgbXVsdGlwbGllciA9IDEwXG5cbiAgICAgICAgICAgIGlmKE1hdGguYWJzKGRpZmZlcmVuY2VPZlBvc2l0aW9ucy5YICsgZGlmZmVyZW5jZU9mUG9zaXRpb25zLlkpIDwgLjEpXG4gICAgICAgICAgICAgICAgSG9tZS50aWNrZXIgPSBmYWxzZVxuXG4gICAgICAgICAgICBpZihIb21lLnRpY2tlciA9PSB0cnVlKSBcbiAgICAgICAgICAgICAgICBIb21lLm1vdXNlTW92ZUFuaW1hdGlvbkZyYW1lID0gcmVxdWVzdEFuaW1hdGlvbkZyYW1lKEhvbWUucnVuTW91c2VNb3ZlKVxuXG4gICAgICAgIH0sXG5cblxuICAgIH1cblxuICAgIG1vZHVsZS5leHBvcnRzID0gSG9tZVxuXG59KCkpIiwiKGZ1bmN0aW9uICgpIHtcblxuICAgIHZhciBQbG90IFx0XHRcdD0gcmVxdWlyZSgnLi4vLi4vLi4vLi4vcGxvdC1jb3JlL3NyYy9qcy9wbG90JyksXG4gICAgXHROZXdzXG5cbiAgICAvL01heSB0aGlzIG9iamVjdCBhY3QgYXMgYSBndWlkZSB0byB1c2luZyBQbG90IGNvcmUgZnVuY3Rpb25zXG4gICAgLy9hbmQgaG93IHRvIHNldCB1cCBhamF4IGR5bmFtaWMgZGF0YSB3aXRoIG91ciBuZXcgcHJpbmNpcGxlcyB3aXRoIGVhc2VcbiAgICBOZXdzID0ge1xuXG4gICAgXHRtYXhQYWdlcyBcdFx0XHQ6IDEsXG4gICAgICAgIGN1cnJlbnROZXdzQ2F0ZWdvcnkgOiAwLFxuICAgICAgICBjdXJyZW50UGFnZSAgICAgICAgIDogMSxcbiAgICBcdGxvYWRNb3JlQnV0dG9uICBcdDogZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLkpTLS1uZXdzTG9hZE1vcmUnKSxcblxuICAgICAgICBpbml0OiAoKSA9PiB7XG5cbiAgICAgICAgICAgIGlmKE5ld3MubG9hZE1vcmVCdXR0b24pIHtcblxuICAgICAgICAgICAgXHROZXdzLnNob3dPckhpZGVMb2FkTW9yZUJ1dHRvbigpXG5cbiAgICAgICAgICAgICAgICBOZXdzLmNyZWF0ZUxpc3RlbmVycygpXG5cbiAgICAgICAgICAgIH1cblxuICAgICAgICB9LFxuXG4gICAgICAgIGNyZWF0ZUxpc3RlbmVyczogKCkgPT4ge1xuXG4gICAgICAgIFx0TmV3cy5sb2FkTW9yZUJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGUgPT4ge1xuXG4gICAgICAgIFx0XHRjb25zdCBuZXh0UGFnZSA9IHBhcnNlSW50KE5ld3MubG9hZE1vcmVCdXR0b24uZGF0YXNldC5uZXh0UGFnZSlcblxuICAgICAgICBcdFx0TmV3cy5jdXJyZW50UGFnZSA9IG5leHRQYWdlXG5cbiAgICAgICAgXHRcdE5ld3MubG9hZE5ld3ModHJ1ZSlcblxuICAgICAgICBcdFx0TmV3cy5sb2FkTW9yZUJ1dHRvbi5kYXRhc2V0Lm5leHRQYWdlID0gbmV4dFBhZ2UgKyAxXG5cbiAgICAgICAgXHR9KVxuXG4gICAgICAgIH0sXG5cbiAgICAgICAgbG9hZE5ld3MgOiBhcHBlbmQgPT4ge1xuXG4gICAgICAgIFx0Y29uc3QgYXJncyA9IHtcblx0XHRcdFx0dGVtcGxhdGVQYXJ0IDogJ3BhcnRzL25ld3MtbGlzdGluZycsIFxuXHRcdFx0XHRkYXRhIDoge1xuXHRcdFx0XHRcdCdwYWdlJyBcdFx0XHQ6IE5ld3MuY3VycmVudFBhZ2UsXG5cdFx0XHRcdFx0J2FydGlzdFR5cGUnXHQ6IE5ld3MuY3VycmVudE5ld3NDYXRlZ29yeVxuXHRcdFx0XHR9LFxuXHRcdFx0XHRhcHBlbmQgOiBhcHBlbmQgXG5cdFx0XHR9XG5cblx0XHRcdHJldHVybiBQbG90LmxvYWRUZW1wbGF0ZVBhcnQoYXJncykudGhlbihodG1sID0+IHtcblxuXHRcdFx0XHROZXdzLnNob3dPckhpZGVMb2FkTW9yZUJ1dHRvbigpXG5cbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZVxuXG5cdFx0XHR9KVxuXG4gICAgICAgIH0sXG5cbiAgICAgICAgc2hvd09ySGlkZUxvYWRNb3JlQnV0dG9uIDogKCkgPT4ge1xuXG4gICAgICAgIFx0Ly9DaGVjayBpZiBtYXggcGFnZXMgaXMgMS4gSWYgaXQgaXMsIHRoZXJlJ3Mgb25seSAxIHBhZ2Ugb2YgTmV3c1xuICAgICAgICBcdC8vc28gd2UgY2FuIGhpZGUgbG9hZCBtb3JlIGJ1dHRvblxuICAgICAgICBcdE5ld3MubWF4UGFnZXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuSlMtLW1heFBhZ2VzJykuZGF0YXNldC5tYXhQYWdlc1xuXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhOZXdzLm1heFBhZ2VzKVxuXG4gICAgICAgIFx0aWYoTmV3cy5tYXhQYWdlcyA+IE5ld3MuY3VycmVudFBhZ2UpXG4gICAgICAgIFx0XHROZXdzLmxvYWRNb3JlQnV0dG9uLmNsYXNzTGlzdC5yZW1vdmUoJ2hpZGRlbicpXG4gICAgICAgIFx0ZWxzZSBcbiAgICAgICAgXHRcdE5ld3MubG9hZE1vcmVCdXR0b24uY2xhc3NMaXN0LmFkZCgnaGlkZGVuJylcblxuICAgICAgICB9XG5cbiAgICB9XG5cbiAgICBtb2R1bGUuZXhwb3J0cyA9IE5ld3NcblxufSgpKSIsIihmdW5jdGlvbiAoKSB7XG5cbiAgICB2YXIgU2NoZWR1bGVcblxuICAgIFNjaGVkdWxlID0ge1xuICAgICAgZGF5QnV0dG9ucyAgICAgICA6IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5KUy0tc2NoZWR1bGVEYXlQaWNrZXJCdXR0b24nKSxcbiAgICAgIGNhbGVuZGFycyAgICAgICAgOiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuc2NoZWR1bGVDYWxlbmRhcldyYXAnKSxcblxuICAgICAgICBpbml0OiAoKSA9PiB7XG5cbiAgICAgICAgICBTY2hlZHVsZS5jcmVhdGVMaXN0ZW5lcnMoKVxuICAgICAgICAgIFNjaGVkdWxlLmNoZWNrVG9TZWVJZk5hdkFycm93c05lZWRlZCgpXG5cbiAgICAgICAgfSxcblxuICAgICAgICBjcmVhdGVMaXN0ZW5lcnM6ICgpID0+IHtcblxuICAgICAgICAgIGZvcih2YXIgZGF5QnV0dG9uIG9mIFNjaGVkdWxlLmRheUJ1dHRvbnMpIHtcblxuICAgICAgICAgICAgZGF5QnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJyxmdW5jdGlvbigpIHtcblxuICAgICAgICAgICAgICBTY2hlZHVsZS5sb2FkTmV3RGF0ZSh0aGlzKSBcbiAgICAgICAgICAgICAgXG4gICAgICAgICAgICB9KVxuXG4gICAgICAgICAgfVxuXG4gICAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsKCkgPT4ge1xuXG4gICAgICAgICAgICBTY2hlZHVsZS5jaGVja1RvU2VlSWZOYXZBcnJvd3NOZWVkZWQoKVxuXG4gICAgICAgICAgfSlcblxuICAgICAgICAgIGZvcih2YXIgY2FsZW5kYXIgb2YgU2NoZWR1bGUuY2FsZW5kYXJzKSB7XG5cbiAgICAgICAgICAgIGNvbnN0IHJpZ2h0QnV0dG9uICAgICAgPSBjYWxlbmRhci5xdWVyeVNlbGVjdG9yKCcuSlMtLXNjaGVkdWxlUmlnaHQnKSxcbiAgICAgICAgICAgIGxlZnRCdXR0b24gICAgICAgICAgICAgPSBjYWxlbmRhci5xdWVyeVNlbGVjdG9yKCcuSlMtLXNjaGVkdWxlTGVmdCcpLFxuICAgICAgICAgICAgdHJhY2tzICAgICAgICAgICAgICAgICA9IGNhbGVuZGFyLnF1ZXJ5U2VsZWN0b3IoJy5zY2hlZHVsZUNhbGVuZGFyVHJhY2tzJyksXG4gICAgICAgICAgICB0cmFja3NXICAgICAgICAgICAgICAgID0gdHJhY2tzLm9mZnNldFdpZHRoXG5cbiAgICAgICAgICAgIHJpZ2h0QnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgICAgICAgICB0cmFja3Muc2Nyb2xsQnkoe1xuICAgICAgICAgICAgICAgIGxlZnQ6IHRyYWNrc1cgLyAyLFxuICAgICAgICAgICAgICAgIGJlaGF2aW9yOiAnc21vb3RoJ1xuICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgfSlcblxuICAgICAgICAgICAgbGVmdEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgICAgICAgICAgdHJhY2tzLnNjcm9sbEJ5KHtcbiAgICAgICAgICAgICAgICBsZWZ0OiAtdHJhY2tzVyAvIDIsXG4gICAgICAgICAgICAgICAgYmVoYXZpb3I6ICdzbW9vdGgnXG4gICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICB9XG5cbiAgICAgICAgfSxcblxuICAgICAgICBsb2FkTmV3RGF0ZSA6IGVsZW0gPT4ge1xuXG4gICAgICAgICAgZm9yKHZhciBkQiBvZiBTY2hlZHVsZS5kYXlCdXR0b25zKSB7XG4gICAgICAgICAgICBkQi5jbGFzc0xpc3QucmVtb3ZlKCdzZWxlY3RlZCcpXG4gICAgICAgICAgfVxuXG4gICAgICAgICAgZWxlbS5jbGFzc0xpc3QuYWRkKCdzZWxlY3RlZCcpXG5cbiAgICAgICAgICBsZXQgZGF5ID0gZWxlbS5kYXRhc2V0LnNjaGVkdWxlRGF5IFxuXG4gICAgICAgICAgZm9yKHZhciBjYWxlbmRhciBvZiBTY2hlZHVsZS5jYWxlbmRhcnMpIHtcblxuICAgICAgICAgICAgaWYoY2FsZW5kYXIuZGF0YXNldC5zY2hlZHVsZURheSA9PSBkYXkpXG4gICAgICAgICAgICAgIGNhbGVuZGFyLmNsYXNzTGlzdC5yZW1vdmUoJ2hpZGRlbicpXG4gICAgICAgICAgICBlbHNlIFxuICAgICAgICAgICAgICBjYWxlbmRhci5jbGFzc0xpc3QuYWRkKCdoaWRkZW4nKVxuICAgICAgICAgIH1cblxuICAgICAgICAgIFNjaGVkdWxlLmNoZWNrVG9TZWVJZk5hdkFycm93c05lZWRlZCgpXG5cbiAgICAgICAgfSxcblxuICAgICAgICBjaGVja1RvU2VlSWZOYXZBcnJvd3NOZWVkZWQgOiAoKSA9PiB7IFxuXG4gICAgICAgICAgZm9yKHZhciBjYWxlbmRhciBvZiBTY2hlZHVsZS5jYWxlbmRhcnMpIHtcblxuICAgICAgICAgICAgaWYoIWNhbGVuZGFyLmNsYXNzTGlzdC5jb250YWlucygnaGlkZGVuJykpIHtcblxuICAgICAgICAgICAgICAgY29uc3QgdHJhY2tzID0gY2FsZW5kYXIucXVlcnlTZWxlY3RvcignLnNjaGVkdWxlQ2FsZW5kYXJUcmFja3MnKVxuXG4gICAgICAgICAgICAgICBpZih0cmFja3Muc2Nyb2xsV2lkdGggPiBjYWxlbmRhci5zY3JvbGxXaWR0aCkge1xuICAgICAgICAgICAgICAgICAgY2FsZW5kYXIucXVlcnlTZWxlY3RvcignLkpTLS1zY2hlZHVsZUxlZnQnKS5jbGFzc0xpc3QucmVtb3ZlKCdoaWRkZW4nKVxuICAgICAgICAgICAgICAgICAgY2FsZW5kYXIucXVlcnlTZWxlY3RvcignLkpTLS1zY2hlZHVsZVJpZ2h0JykuY2xhc3NMaXN0LnJlbW92ZSgnaGlkZGVuJylcbiAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICBjYWxlbmRhci5xdWVyeVNlbGVjdG9yKCcuSlMtLXNjaGVkdWxlTGVmdCcpLmNsYXNzTGlzdC5hZGQoJ2hpZGRlbicpXG4gICAgICAgICAgICAgICAgICBjYWxlbmRhci5xdWVyeVNlbGVjdG9yKCcuSlMtLXNjaGVkdWxlUmlnaHQnKS5jbGFzc0xpc3QuYWRkKCdoaWRkZW4nKVxuICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICB9XG5cbiAgICAgICAgfVxuXG4gICAgfVxuXG4gICAgbW9kdWxlLmV4cG9ydHMgPSBTY2hlZHVsZVxuXG59KCkpXG5cbiJdfQ==
