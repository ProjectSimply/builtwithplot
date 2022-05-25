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

},{}],27:[function(require,module,exports){
(function (){

    'use strict'

	var Plot    		= require('../../../plot-core/src/js/plot'),  
		LazyLoad   	 	= require('../../../plot-core/src/js/lazyload'),
		Modals			= require('../../../plot-core/src/js/modals'),
		Carousels		= require('../../../plot-core/src/js/carousels'),
		Smooth 			= require('../../../plot-core/src/js/plot-smooth-scroll'),
		FAQs 			= require('../../../plot-core/src/js/faqs'),
		// CustomMouse 	= require('../../../plot-core/src/js/custom-mouse'),
		Home			= require('./pages/home'),
		RollerText      = require('./components/roller-text'),
		Pricing         = require('./pages/pricing'),
		Artists			= require('./pages/artists'),
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
			// CustomMouse.init({
			// 	'a' 				: 'anchorHover',
			// 	'.altHoverTarget'	: 'altHover'
			// })


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
 
},{"../../../plot-core/src/js/carousels":19,"../../../plot-core/src/js/faqs":20,"../../../plot-core/src/js/lazyload":21,"../../../plot-core/src/js/modals":22,"../../../plot-core/src/js/plot":24,"../../../plot-core/src/js/plot-smooth-scroll":23,"./components/roller-text":26,"./pages/artists":28,"./pages/home":29,"./pages/news":30,"./pages/pricing":31,"./pages/schedule":32}],28:[function(require,module,exports){
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
},{"../../../../plot-core/src/js/modals":22,"../../../../plot-core/src/js/plot":24}],29:[function(require,module,exports){
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
},{}],30:[function(require,module,exports){
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
},{"../../../../plot-core/src/js/plot":24}],31:[function(require,module,exports){
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

},{}],32:[function(require,module,exports){
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


},{}]},{},[27])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIuLi9wbG90LWNvcmUvbm9kZV9tb2R1bGVzL2JvZHktc2Nyb2xsLWxvY2svbGliL2JvZHlTY3JvbGxMb2NrLm1pbi5qcyIsIi4uL3Bsb3QtY29yZS9ub2RlX21vZHVsZXMvZGVzYW5kcm8tbWF0Y2hlcy1zZWxlY3Rvci9tYXRjaGVzLXNlbGVjdG9yLmpzIiwiLi4vcGxvdC1jb3JlL25vZGVfbW9kdWxlcy9ldi1lbWl0dGVyL2V2LWVtaXR0ZXIuanMiLCIuLi9wbG90LWNvcmUvbm9kZV9tb2R1bGVzL2Zpenp5LXVpLXV0aWxzL3V0aWxzLmpzIiwiLi4vcGxvdC1jb3JlL25vZGVfbW9kdWxlcy9mbGlja2l0eS9qcy9hZGQtcmVtb3ZlLWNlbGwuanMiLCIuLi9wbG90LWNvcmUvbm9kZV9tb2R1bGVzL2ZsaWNraXR5L2pzL2FuaW1hdGUuanMiLCIuLi9wbG90LWNvcmUvbm9kZV9tb2R1bGVzL2ZsaWNraXR5L2pzL2NlbGwuanMiLCIuLi9wbG90LWNvcmUvbm9kZV9tb2R1bGVzL2ZsaWNraXR5L2pzL2RyYWcuanMiLCIuLi9wbG90LWNvcmUvbm9kZV9tb2R1bGVzL2ZsaWNraXR5L2pzL2ZsaWNraXR5LmpzIiwiLi4vcGxvdC1jb3JlL25vZGVfbW9kdWxlcy9mbGlja2l0eS9qcy9pbmRleC5qcyIsIi4uL3Bsb3QtY29yZS9ub2RlX21vZHVsZXMvZmxpY2tpdHkvanMvbGF6eWxvYWQuanMiLCIuLi9wbG90LWNvcmUvbm9kZV9tb2R1bGVzL2ZsaWNraXR5L2pzL3BhZ2UtZG90cy5qcyIsIi4uL3Bsb3QtY29yZS9ub2RlX21vZHVsZXMvZmxpY2tpdHkvanMvcGxheWVyLmpzIiwiLi4vcGxvdC1jb3JlL25vZGVfbW9kdWxlcy9mbGlja2l0eS9qcy9wcmV2LW5leHQtYnV0dG9uLmpzIiwiLi4vcGxvdC1jb3JlL25vZGVfbW9kdWxlcy9mbGlja2l0eS9qcy9zbGlkZS5qcyIsIi4uL3Bsb3QtY29yZS9ub2RlX21vZHVsZXMvZ2V0LXNpemUvZ2V0LXNpemUuanMiLCIuLi9wbG90LWNvcmUvbm9kZV9tb2R1bGVzL3VuaWRyYWdnZXIvdW5pZHJhZ2dlci5qcyIsIi4uL3Bsb3QtY29yZS9ub2RlX21vZHVsZXMvdW5pcG9pbnRlci91bmlwb2ludGVyLmpzIiwiLi4vcGxvdC1jb3JlL3NyYy9qcy9jYXJvdXNlbHMuanMiLCIuLi9wbG90LWNvcmUvc3JjL2pzL2ZhcXMuanMiLCIuLi9wbG90LWNvcmUvc3JjL2pzL2xhenlsb2FkLmpzIiwiLi4vcGxvdC1jb3JlL3NyYy9qcy9tb2RhbHMuanMiLCIuLi9wbG90LWNvcmUvc3JjL2pzL3Bsb3Qtc21vb3RoLXNjcm9sbC5qcyIsIi4uL3Bsb3QtY29yZS9zcmMvanMvcGxvdC5qcyIsIi4uL3Bsb3QtY29yZS9zcmMvanMvc3luY3Njcm9sbC5qcyIsInNyYy9qcy9jb21wb25lbnRzL3JvbGxlci10ZXh0LmpzIiwic3JjL2pzL21haW4uanMiLCJzcmMvanMvcGFnZXMvYXJ0aXN0cy5qcyIsInNyYy9qcy9wYWdlcy9ob21lLmpzIiwic3JjL2pzL3BhZ2VzL25ld3MuanMiLCJzcmMvanMvcGFnZXMvcHJpY2luZy5qcyIsInNyYy9qcy9wYWdlcy9zY2hlZHVsZS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7O0FDREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3JEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2hIQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2pQQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDaktBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3pNQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN0R0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDellBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNqNkJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdElBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM1TEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQy9MQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ25OQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDMUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQy9NQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzNSQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzdTQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN0REE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQy9DQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDck1BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdlZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzVoQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdlVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDcklBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNuRkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdkxBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDcEdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN0T0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNsRkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3ZFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uKCl7ZnVuY3Rpb24gcihlLG4sdCl7ZnVuY3Rpb24gbyhpLGYpe2lmKCFuW2ldKXtpZighZVtpXSl7dmFyIGM9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZTtpZighZiYmYylyZXR1cm4gYyhpLCEwKTtpZih1KXJldHVybiB1KGksITApO3ZhciBhPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIraStcIidcIik7dGhyb3cgYS5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGF9dmFyIHA9bltpXT17ZXhwb3J0czp7fX07ZVtpXVswXS5jYWxsKHAuZXhwb3J0cyxmdW5jdGlvbihyKXt2YXIgbj1lW2ldWzFdW3JdO3JldHVybiBvKG58fHIpfSxwLHAuZXhwb3J0cyxyLGUsbix0KX1yZXR1cm4gbltpXS5leHBvcnRzfWZvcih2YXIgdT1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlLGk9MDtpPHQubGVuZ3RoO2krKylvKHRbaV0pO3JldHVybiBvfXJldHVybiByfSkoKSIsIiFmdW5jdGlvbihlLHQpe2lmKFwiZnVuY3Rpb25cIj09dHlwZW9mIGRlZmluZSYmZGVmaW5lLmFtZClkZWZpbmUoW1wiZXhwb3J0c1wiXSx0KTtlbHNlIGlmKFwidW5kZWZpbmVkXCIhPXR5cGVvZiBleHBvcnRzKXQoZXhwb3J0cyk7ZWxzZXt2YXIgbz17fTt0KG8pLGUuYm9keVNjcm9sbExvY2s9b319KHRoaXMsZnVuY3Rpb24oZXhwb3J0cyl7XCJ1c2Ugc3RyaWN0XCI7ZnVuY3Rpb24gaShlKXtpZihBcnJheS5pc0FycmF5KGUpKXtmb3IodmFyIHQ9MCxvPUFycmF5KGUubGVuZ3RoKTt0PGUubGVuZ3RoO3QrKylvW3RdPWVbdF07cmV0dXJuIG99cmV0dXJuIEFycmF5LmZyb20oZSl9T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsXCJfX2VzTW9kdWxlXCIse3ZhbHVlOiEwfSk7dmFyIGw9ITE7aWYoXCJ1bmRlZmluZWRcIiE9dHlwZW9mIHdpbmRvdyl7dmFyIGU9e2dldCBwYXNzaXZlKCl7bD0hMH19O3dpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwidGVzdFBhc3NpdmVcIixudWxsLGUpLHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKFwidGVzdFBhc3NpdmVcIixudWxsLGUpfWZ1bmN0aW9uIGQodCl7cmV0dXJuIHUuc29tZShmdW5jdGlvbihlKXtyZXR1cm4hKCFlLm9wdGlvbnMuYWxsb3dUb3VjaE1vdmV8fCFlLm9wdGlvbnMuYWxsb3dUb3VjaE1vdmUodCkpfSl9ZnVuY3Rpb24gYyhlKXt2YXIgdD1lfHx3aW5kb3cuZXZlbnQ7cmV0dXJuISFkKHQudGFyZ2V0KXx8KDE8dC50b3VjaGVzLmxlbmd0aHx8KHQucHJldmVudERlZmF1bHQmJnQucHJldmVudERlZmF1bHQoKSwhMSkpfWZ1bmN0aW9uIG8oKXtzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7dm9pZCAwIT09bSYmKGRvY3VtZW50LmJvZHkuc3R5bGUucGFkZGluZ1JpZ2h0PW0sbT12b2lkIDApLHZvaWQgMCE9PWYmJihkb2N1bWVudC5ib2R5LnN0eWxlLm92ZXJmbG93PWYsZj12b2lkIDApfSl9dmFyIGE9XCJ1bmRlZmluZWRcIiE9dHlwZW9mIHdpbmRvdyYmd2luZG93Lm5hdmlnYXRvciYmd2luZG93Lm5hdmlnYXRvci5wbGF0Zm9ybSYmKC9pUChhZHxob25lfG9kKS8udGVzdCh3aW5kb3cubmF2aWdhdG9yLnBsYXRmb3JtKXx8XCJNYWNJbnRlbFwiPT09d2luZG93Lm5hdmlnYXRvci5wbGF0Zm9ybSYmMTx3aW5kb3cubmF2aWdhdG9yLm1heFRvdWNoUG9pbnRzKSx1PVtdLHM9ITEsdj0tMSxmPXZvaWQgMCxtPXZvaWQgMDtleHBvcnRzLmRpc2FibGVCb2R5U2Nyb2xsPWZ1bmN0aW9uKHIsZSl7aWYoYSl7aWYoIXIpcmV0dXJuIHZvaWQgY29uc29sZS5lcnJvcihcImRpc2FibGVCb2R5U2Nyb2xsIHVuc3VjY2Vzc2Z1bCAtIHRhcmdldEVsZW1lbnQgbXVzdCBiZSBwcm92aWRlZCB3aGVuIGNhbGxpbmcgZGlzYWJsZUJvZHlTY3JvbGwgb24gSU9TIGRldmljZXMuXCIpO2lmKHImJiF1LnNvbWUoZnVuY3Rpb24oZSl7cmV0dXJuIGUudGFyZ2V0RWxlbWVudD09PXJ9KSl7dmFyIHQ9e3RhcmdldEVsZW1lbnQ6cixvcHRpb25zOmV8fHt9fTt1PVtdLmNvbmNhdChpKHUpLFt0XSksci5vbnRvdWNoc3RhcnQ9ZnVuY3Rpb24oZSl7MT09PWUudGFyZ2V0VG91Y2hlcy5sZW5ndGgmJih2PWUudGFyZ2V0VG91Y2hlc1swXS5jbGllbnRZKX0sci5vbnRvdWNobW92ZT1mdW5jdGlvbihlKXt2YXIgdCxvLG4saTsxPT09ZS50YXJnZXRUb3VjaGVzLmxlbmd0aCYmKG89cixpPSh0PWUpLnRhcmdldFRvdWNoZXNbMF0uY2xpZW50WS12LGQodC50YXJnZXQpfHwobyYmMD09PW8uc2Nyb2xsVG9wJiYwPGl8fChuPW8pJiZuLnNjcm9sbEhlaWdodC1uLnNjcm9sbFRvcDw9bi5jbGllbnRIZWlnaHQmJmk8MD9jKHQpOnQuc3RvcFByb3BhZ2F0aW9uKCkpKX0sc3x8KGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJ0b3VjaG1vdmVcIixjLGw/e3Bhc3NpdmU6ITF9OnZvaWQgMCkscz0hMCl9fWVsc2V7bj1lLHNldFRpbWVvdXQoZnVuY3Rpb24oKXtpZih2b2lkIDA9PT1tKXt2YXIgZT0hIW4mJiEwPT09bi5yZXNlcnZlU2Nyb2xsQmFyR2FwLHQ9d2luZG93LmlubmVyV2lkdGgtZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsaWVudFdpZHRoO2UmJjA8dCYmKG09ZG9jdW1lbnQuYm9keS5zdHlsZS5wYWRkaW5nUmlnaHQsZG9jdW1lbnQuYm9keS5zdHlsZS5wYWRkaW5nUmlnaHQ9dCtcInB4XCIpfXZvaWQgMD09PWYmJihmPWRvY3VtZW50LmJvZHkuc3R5bGUub3ZlcmZsb3csZG9jdW1lbnQuYm9keS5zdHlsZS5vdmVyZmxvdz1cImhpZGRlblwiKX0pO3ZhciBvPXt0YXJnZXRFbGVtZW50OnIsb3B0aW9uczplfHx7fX07dT1bXS5jb25jYXQoaSh1KSxbb10pfXZhciBufSxleHBvcnRzLmNsZWFyQWxsQm9keVNjcm9sbExvY2tzPWZ1bmN0aW9uKCl7YT8odS5mb3JFYWNoKGZ1bmN0aW9uKGUpe2UudGFyZ2V0RWxlbWVudC5vbnRvdWNoc3RhcnQ9bnVsbCxlLnRhcmdldEVsZW1lbnQub250b3VjaG1vdmU9bnVsbH0pLHMmJihkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKFwidG91Y2htb3ZlXCIsYyxsP3twYXNzaXZlOiExfTp2b2lkIDApLHM9ITEpLHU9W10sdj0tMSk6KG8oKSx1PVtdKX0sZXhwb3J0cy5lbmFibGVCb2R5U2Nyb2xsPWZ1bmN0aW9uKHQpe2lmKGEpe2lmKCF0KXJldHVybiB2b2lkIGNvbnNvbGUuZXJyb3IoXCJlbmFibGVCb2R5U2Nyb2xsIHVuc3VjY2Vzc2Z1bCAtIHRhcmdldEVsZW1lbnQgbXVzdCBiZSBwcm92aWRlZCB3aGVuIGNhbGxpbmcgZW5hYmxlQm9keVNjcm9sbCBvbiBJT1MgZGV2aWNlcy5cIik7dC5vbnRvdWNoc3RhcnQ9bnVsbCx0Lm9udG91Y2htb3ZlPW51bGwsdT11LmZpbHRlcihmdW5jdGlvbihlKXtyZXR1cm4gZS50YXJnZXRFbGVtZW50IT09dH0pLHMmJjA9PT11Lmxlbmd0aCYmKGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJ0b3VjaG1vdmVcIixjLGw/e3Bhc3NpdmU6ITF9OnZvaWQgMCkscz0hMSl9ZWxzZSh1PXUuZmlsdGVyKGZ1bmN0aW9uKGUpe3JldHVybiBlLnRhcmdldEVsZW1lbnQhPT10fSkpLmxlbmd0aHx8bygpfX0pO1xuIiwiLyoqXG4gKiBtYXRjaGVzU2VsZWN0b3IgdjIuMC4yXG4gKiBtYXRjaGVzU2VsZWN0b3IoIGVsZW1lbnQsICcuc2VsZWN0b3InIClcbiAqIE1JVCBsaWNlbnNlXG4gKi9cblxuLypqc2hpbnQgYnJvd3NlcjogdHJ1ZSwgc3RyaWN0OiB0cnVlLCB1bmRlZjogdHJ1ZSwgdW51c2VkOiB0cnVlICovXG5cbiggZnVuY3Rpb24oIHdpbmRvdywgZmFjdG9yeSApIHtcbiAgLypnbG9iYWwgZGVmaW5lOiBmYWxzZSwgbW9kdWxlOiBmYWxzZSAqL1xuICAndXNlIHN0cmljdCc7XG4gIC8vIHVuaXZlcnNhbCBtb2R1bGUgZGVmaW5pdGlvblxuICBpZiAoIHR5cGVvZiBkZWZpbmUgPT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kICkge1xuICAgIC8vIEFNRFxuICAgIGRlZmluZSggZmFjdG9yeSApO1xuICB9IGVsc2UgaWYgKCB0eXBlb2YgbW9kdWxlID09ICdvYmplY3QnICYmIG1vZHVsZS5leHBvcnRzICkge1xuICAgIC8vIENvbW1vbkpTXG4gICAgbW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KCk7XG4gIH0gZWxzZSB7XG4gICAgLy8gYnJvd3NlciBnbG9iYWxcbiAgICB3aW5kb3cubWF0Y2hlc1NlbGVjdG9yID0gZmFjdG9yeSgpO1xuICB9XG5cbn0oIHdpbmRvdywgZnVuY3Rpb24gZmFjdG9yeSgpIHtcbiAgJ3VzZSBzdHJpY3QnO1xuXG4gIHZhciBtYXRjaGVzTWV0aG9kID0gKCBmdW5jdGlvbigpIHtcbiAgICB2YXIgRWxlbVByb3RvID0gd2luZG93LkVsZW1lbnQucHJvdG90eXBlO1xuICAgIC8vIGNoZWNrIGZvciB0aGUgc3RhbmRhcmQgbWV0aG9kIG5hbWUgZmlyc3RcbiAgICBpZiAoIEVsZW1Qcm90by5tYXRjaGVzICkge1xuICAgICAgcmV0dXJuICdtYXRjaGVzJztcbiAgICB9XG4gICAgLy8gY2hlY2sgdW4tcHJlZml4ZWRcbiAgICBpZiAoIEVsZW1Qcm90by5tYXRjaGVzU2VsZWN0b3IgKSB7XG4gICAgICByZXR1cm4gJ21hdGNoZXNTZWxlY3Rvcic7XG4gICAgfVxuICAgIC8vIGNoZWNrIHZlbmRvciBwcmVmaXhlc1xuICAgIHZhciBwcmVmaXhlcyA9IFsgJ3dlYmtpdCcsICdtb3onLCAnbXMnLCAnbycgXTtcblxuICAgIGZvciAoIHZhciBpPTA7IGkgPCBwcmVmaXhlcy5sZW5ndGg7IGkrKyApIHtcbiAgICAgIHZhciBwcmVmaXggPSBwcmVmaXhlc1tpXTtcbiAgICAgIHZhciBtZXRob2QgPSBwcmVmaXggKyAnTWF0Y2hlc1NlbGVjdG9yJztcbiAgICAgIGlmICggRWxlbVByb3RvWyBtZXRob2QgXSApIHtcbiAgICAgICAgcmV0dXJuIG1ldGhvZDtcbiAgICAgIH1cbiAgICB9XG4gIH0pKCk7XG5cbiAgcmV0dXJuIGZ1bmN0aW9uIG1hdGNoZXNTZWxlY3RvciggZWxlbSwgc2VsZWN0b3IgKSB7XG4gICAgcmV0dXJuIGVsZW1bIG1hdGNoZXNNZXRob2QgXSggc2VsZWN0b3IgKTtcbiAgfTtcblxufSkpO1xuIiwiLyoqXG4gKiBFdkVtaXR0ZXIgdjEuMS4wXG4gKiBMaWwnIGV2ZW50IGVtaXR0ZXJcbiAqIE1JVCBMaWNlbnNlXG4gKi9cblxuLyoganNoaW50IHVudXNlZDogdHJ1ZSwgdW5kZWY6IHRydWUsIHN0cmljdDogdHJ1ZSAqL1xuXG4oIGZ1bmN0aW9uKCBnbG9iYWwsIGZhY3RvcnkgKSB7XG4gIC8vIHVuaXZlcnNhbCBtb2R1bGUgZGVmaW5pdGlvblxuICAvKiBqc2hpbnQgc3RyaWN0OiBmYWxzZSAqLyAvKiBnbG9iYWxzIGRlZmluZSwgbW9kdWxlLCB3aW5kb3cgKi9cbiAgaWYgKCB0eXBlb2YgZGVmaW5lID09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZCApIHtcbiAgICAvLyBBTUQgLSBSZXF1aXJlSlNcbiAgICBkZWZpbmUoIGZhY3RvcnkgKTtcbiAgfSBlbHNlIGlmICggdHlwZW9mIG1vZHVsZSA9PSAnb2JqZWN0JyAmJiBtb2R1bGUuZXhwb3J0cyApIHtcbiAgICAvLyBDb21tb25KUyAtIEJyb3dzZXJpZnksIFdlYnBhY2tcbiAgICBtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkoKTtcbiAgfSBlbHNlIHtcbiAgICAvLyBCcm93c2VyIGdsb2JhbHNcbiAgICBnbG9iYWwuRXZFbWl0dGVyID0gZmFjdG9yeSgpO1xuICB9XG5cbn0oIHR5cGVvZiB3aW5kb3cgIT0gJ3VuZGVmaW5lZCcgPyB3aW5kb3cgOiB0aGlzLCBmdW5jdGlvbigpIHtcblxuXCJ1c2Ugc3RyaWN0XCI7XG5cbmZ1bmN0aW9uIEV2RW1pdHRlcigpIHt9XG5cbnZhciBwcm90byA9IEV2RW1pdHRlci5wcm90b3R5cGU7XG5cbnByb3RvLm9uID0gZnVuY3Rpb24oIGV2ZW50TmFtZSwgbGlzdGVuZXIgKSB7XG4gIGlmICggIWV2ZW50TmFtZSB8fCAhbGlzdGVuZXIgKSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIC8vIHNldCBldmVudHMgaGFzaFxuICB2YXIgZXZlbnRzID0gdGhpcy5fZXZlbnRzID0gdGhpcy5fZXZlbnRzIHx8IHt9O1xuICAvLyBzZXQgbGlzdGVuZXJzIGFycmF5XG4gIHZhciBsaXN0ZW5lcnMgPSBldmVudHNbIGV2ZW50TmFtZSBdID0gZXZlbnRzWyBldmVudE5hbWUgXSB8fCBbXTtcbiAgLy8gb25seSBhZGQgb25jZVxuICBpZiAoIGxpc3RlbmVycy5pbmRleE9mKCBsaXN0ZW5lciApID09IC0xICkge1xuICAgIGxpc3RlbmVycy5wdXNoKCBsaXN0ZW5lciApO1xuICB9XG5cbiAgcmV0dXJuIHRoaXM7XG59O1xuXG5wcm90by5vbmNlID0gZnVuY3Rpb24oIGV2ZW50TmFtZSwgbGlzdGVuZXIgKSB7XG4gIGlmICggIWV2ZW50TmFtZSB8fCAhbGlzdGVuZXIgKSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIC8vIGFkZCBldmVudFxuICB0aGlzLm9uKCBldmVudE5hbWUsIGxpc3RlbmVyICk7XG4gIC8vIHNldCBvbmNlIGZsYWdcbiAgLy8gc2V0IG9uY2VFdmVudHMgaGFzaFxuICB2YXIgb25jZUV2ZW50cyA9IHRoaXMuX29uY2VFdmVudHMgPSB0aGlzLl9vbmNlRXZlbnRzIHx8IHt9O1xuICAvLyBzZXQgb25jZUxpc3RlbmVycyBvYmplY3RcbiAgdmFyIG9uY2VMaXN0ZW5lcnMgPSBvbmNlRXZlbnRzWyBldmVudE5hbWUgXSA9IG9uY2VFdmVudHNbIGV2ZW50TmFtZSBdIHx8IHt9O1xuICAvLyBzZXQgZmxhZ1xuICBvbmNlTGlzdGVuZXJzWyBsaXN0ZW5lciBdID0gdHJ1ZTtcblxuICByZXR1cm4gdGhpcztcbn07XG5cbnByb3RvLm9mZiA9IGZ1bmN0aW9uKCBldmVudE5hbWUsIGxpc3RlbmVyICkge1xuICB2YXIgbGlzdGVuZXJzID0gdGhpcy5fZXZlbnRzICYmIHRoaXMuX2V2ZW50c1sgZXZlbnROYW1lIF07XG4gIGlmICggIWxpc3RlbmVycyB8fCAhbGlzdGVuZXJzLmxlbmd0aCApIHtcbiAgICByZXR1cm47XG4gIH1cbiAgdmFyIGluZGV4ID0gbGlzdGVuZXJzLmluZGV4T2YoIGxpc3RlbmVyICk7XG4gIGlmICggaW5kZXggIT0gLTEgKSB7XG4gICAgbGlzdGVuZXJzLnNwbGljZSggaW5kZXgsIDEgKTtcbiAgfVxuXG4gIHJldHVybiB0aGlzO1xufTtcblxucHJvdG8uZW1pdEV2ZW50ID0gZnVuY3Rpb24oIGV2ZW50TmFtZSwgYXJncyApIHtcbiAgdmFyIGxpc3RlbmVycyA9IHRoaXMuX2V2ZW50cyAmJiB0aGlzLl9ldmVudHNbIGV2ZW50TmFtZSBdO1xuICBpZiAoICFsaXN0ZW5lcnMgfHwgIWxpc3RlbmVycy5sZW5ndGggKSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIC8vIGNvcHkgb3ZlciB0byBhdm9pZCBpbnRlcmZlcmVuY2UgaWYgLm9mZigpIGluIGxpc3RlbmVyXG4gIGxpc3RlbmVycyA9IGxpc3RlbmVycy5zbGljZSgwKTtcbiAgYXJncyA9IGFyZ3MgfHwgW107XG4gIC8vIG9uY2Ugc3R1ZmZcbiAgdmFyIG9uY2VMaXN0ZW5lcnMgPSB0aGlzLl9vbmNlRXZlbnRzICYmIHRoaXMuX29uY2VFdmVudHNbIGV2ZW50TmFtZSBdO1xuXG4gIGZvciAoIHZhciBpPTA7IGkgPCBsaXN0ZW5lcnMubGVuZ3RoOyBpKysgKSB7XG4gICAgdmFyIGxpc3RlbmVyID0gbGlzdGVuZXJzW2ldXG4gICAgdmFyIGlzT25jZSA9IG9uY2VMaXN0ZW5lcnMgJiYgb25jZUxpc3RlbmVyc1sgbGlzdGVuZXIgXTtcbiAgICBpZiAoIGlzT25jZSApIHtcbiAgICAgIC8vIHJlbW92ZSBsaXN0ZW5lclxuICAgICAgLy8gcmVtb3ZlIGJlZm9yZSB0cmlnZ2VyIHRvIHByZXZlbnQgcmVjdXJzaW9uXG4gICAgICB0aGlzLm9mZiggZXZlbnROYW1lLCBsaXN0ZW5lciApO1xuICAgICAgLy8gdW5zZXQgb25jZSBmbGFnXG4gICAgICBkZWxldGUgb25jZUxpc3RlbmVyc1sgbGlzdGVuZXIgXTtcbiAgICB9XG4gICAgLy8gdHJpZ2dlciBsaXN0ZW5lclxuICAgIGxpc3RlbmVyLmFwcGx5KCB0aGlzLCBhcmdzICk7XG4gIH1cblxuICByZXR1cm4gdGhpcztcbn07XG5cbnByb3RvLmFsbE9mZiA9IGZ1bmN0aW9uKCkge1xuICBkZWxldGUgdGhpcy5fZXZlbnRzO1xuICBkZWxldGUgdGhpcy5fb25jZUV2ZW50cztcbn07XG5cbnJldHVybiBFdkVtaXR0ZXI7XG5cbn0pKTtcbiIsIi8qKlxuICogRml6enkgVUkgdXRpbHMgdjIuMC43XG4gKiBNSVQgbGljZW5zZVxuICovXG5cbi8qanNoaW50IGJyb3dzZXI6IHRydWUsIHVuZGVmOiB0cnVlLCB1bnVzZWQ6IHRydWUsIHN0cmljdDogdHJ1ZSAqL1xuXG4oIGZ1bmN0aW9uKCB3aW5kb3csIGZhY3RvcnkgKSB7XG4gIC8vIHVuaXZlcnNhbCBtb2R1bGUgZGVmaW5pdGlvblxuICAvKmpzaGludCBzdHJpY3Q6IGZhbHNlICovIC8qZ2xvYmFscyBkZWZpbmUsIG1vZHVsZSwgcmVxdWlyZSAqL1xuXG4gIGlmICggdHlwZW9mIGRlZmluZSA9PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQgKSB7XG4gICAgLy8gQU1EXG4gICAgZGVmaW5lKCBbXG4gICAgICAnZGVzYW5kcm8tbWF0Y2hlcy1zZWxlY3Rvci9tYXRjaGVzLXNlbGVjdG9yJ1xuICAgIF0sIGZ1bmN0aW9uKCBtYXRjaGVzU2VsZWN0b3IgKSB7XG4gICAgICByZXR1cm4gZmFjdG9yeSggd2luZG93LCBtYXRjaGVzU2VsZWN0b3IgKTtcbiAgICB9KTtcbiAgfSBlbHNlIGlmICggdHlwZW9mIG1vZHVsZSA9PSAnb2JqZWN0JyAmJiBtb2R1bGUuZXhwb3J0cyApIHtcbiAgICAvLyBDb21tb25KU1xuICAgIG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeShcbiAgICAgIHdpbmRvdyxcbiAgICAgIHJlcXVpcmUoJ2Rlc2FuZHJvLW1hdGNoZXMtc2VsZWN0b3InKVxuICAgICk7XG4gIH0gZWxzZSB7XG4gICAgLy8gYnJvd3NlciBnbG9iYWxcbiAgICB3aW5kb3cuZml6enlVSVV0aWxzID0gZmFjdG9yeShcbiAgICAgIHdpbmRvdyxcbiAgICAgIHdpbmRvdy5tYXRjaGVzU2VsZWN0b3JcbiAgICApO1xuICB9XG5cbn0oIHdpbmRvdywgZnVuY3Rpb24gZmFjdG9yeSggd2luZG93LCBtYXRjaGVzU2VsZWN0b3IgKSB7XG5cbid1c2Ugc3RyaWN0JztcblxudmFyIHV0aWxzID0ge307XG5cbi8vIC0tLS0tIGV4dGVuZCAtLS0tLSAvL1xuXG4vLyBleHRlbmRzIG9iamVjdHNcbnV0aWxzLmV4dGVuZCA9IGZ1bmN0aW9uKCBhLCBiICkge1xuICBmb3IgKCB2YXIgcHJvcCBpbiBiICkge1xuICAgIGFbIHByb3AgXSA9IGJbIHByb3AgXTtcbiAgfVxuICByZXR1cm4gYTtcbn07XG5cbi8vIC0tLS0tIG1vZHVsbyAtLS0tLSAvL1xuXG51dGlscy5tb2R1bG8gPSBmdW5jdGlvbiggbnVtLCBkaXYgKSB7XG4gIHJldHVybiAoICggbnVtICUgZGl2ICkgKyBkaXYgKSAlIGRpdjtcbn07XG5cbi8vIC0tLS0tIG1ha2VBcnJheSAtLS0tLSAvL1xuXG52YXIgYXJyYXlTbGljZSA9IEFycmF5LnByb3RvdHlwZS5zbGljZTtcblxuLy8gdHVybiBlbGVtZW50IG9yIG5vZGVMaXN0IGludG8gYW4gYXJyYXlcbnV0aWxzLm1ha2VBcnJheSA9IGZ1bmN0aW9uKCBvYmogKSB7XG4gIGlmICggQXJyYXkuaXNBcnJheSggb2JqICkgKSB7XG4gICAgLy8gdXNlIG9iamVjdCBpZiBhbHJlYWR5IGFuIGFycmF5XG4gICAgcmV0dXJuIG9iajtcbiAgfVxuICAvLyByZXR1cm4gZW1wdHkgYXJyYXkgaWYgdW5kZWZpbmVkIG9yIG51bGwuICM2XG4gIGlmICggb2JqID09PSBudWxsIHx8IG9iaiA9PT0gdW5kZWZpbmVkICkge1xuICAgIHJldHVybiBbXTtcbiAgfVxuXG4gIHZhciBpc0FycmF5TGlrZSA9IHR5cGVvZiBvYmogPT0gJ29iamVjdCcgJiYgdHlwZW9mIG9iai5sZW5ndGggPT0gJ251bWJlcic7XG4gIGlmICggaXNBcnJheUxpa2UgKSB7XG4gICAgLy8gY29udmVydCBub2RlTGlzdCB0byBhcnJheVxuICAgIHJldHVybiBhcnJheVNsaWNlLmNhbGwoIG9iaiApO1xuICB9XG5cbiAgLy8gYXJyYXkgb2Ygc2luZ2xlIGluZGV4XG4gIHJldHVybiBbIG9iaiBdO1xufTtcblxuLy8gLS0tLS0gcmVtb3ZlRnJvbSAtLS0tLSAvL1xuXG51dGlscy5yZW1vdmVGcm9tID0gZnVuY3Rpb24oIGFyeSwgb2JqICkge1xuICB2YXIgaW5kZXggPSBhcnkuaW5kZXhPZiggb2JqICk7XG4gIGlmICggaW5kZXggIT0gLTEgKSB7XG4gICAgYXJ5LnNwbGljZSggaW5kZXgsIDEgKTtcbiAgfVxufTtcblxuLy8gLS0tLS0gZ2V0UGFyZW50IC0tLS0tIC8vXG5cbnV0aWxzLmdldFBhcmVudCA9IGZ1bmN0aW9uKCBlbGVtLCBzZWxlY3RvciApIHtcbiAgd2hpbGUgKCBlbGVtLnBhcmVudE5vZGUgJiYgZWxlbSAhPSBkb2N1bWVudC5ib2R5ICkge1xuICAgIGVsZW0gPSBlbGVtLnBhcmVudE5vZGU7XG4gICAgaWYgKCBtYXRjaGVzU2VsZWN0b3IoIGVsZW0sIHNlbGVjdG9yICkgKSB7XG4gICAgICByZXR1cm4gZWxlbTtcbiAgICB9XG4gIH1cbn07XG5cbi8vIC0tLS0tIGdldFF1ZXJ5RWxlbWVudCAtLS0tLSAvL1xuXG4vLyB1c2UgZWxlbWVudCBhcyBzZWxlY3RvciBzdHJpbmdcbnV0aWxzLmdldFF1ZXJ5RWxlbWVudCA9IGZ1bmN0aW9uKCBlbGVtICkge1xuICBpZiAoIHR5cGVvZiBlbGVtID09ICdzdHJpbmcnICkge1xuICAgIHJldHVybiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCBlbGVtICk7XG4gIH1cbiAgcmV0dXJuIGVsZW07XG59O1xuXG4vLyAtLS0tLSBoYW5kbGVFdmVudCAtLS0tLSAvL1xuXG4vLyBlbmFibGUgLm9udHlwZSB0byB0cmlnZ2VyIGZyb20gLmFkZEV2ZW50TGlzdGVuZXIoIGVsZW0sICd0eXBlJyApXG51dGlscy5oYW5kbGVFdmVudCA9IGZ1bmN0aW9uKCBldmVudCApIHtcbiAgdmFyIG1ldGhvZCA9ICdvbicgKyBldmVudC50eXBlO1xuICBpZiAoIHRoaXNbIG1ldGhvZCBdICkge1xuICAgIHRoaXNbIG1ldGhvZCBdKCBldmVudCApO1xuICB9XG59O1xuXG4vLyAtLS0tLSBmaWx0ZXJGaW5kRWxlbWVudHMgLS0tLS0gLy9cblxudXRpbHMuZmlsdGVyRmluZEVsZW1lbnRzID0gZnVuY3Rpb24oIGVsZW1zLCBzZWxlY3RvciApIHtcbiAgLy8gbWFrZSBhcnJheSBvZiBlbGVtc1xuICBlbGVtcyA9IHV0aWxzLm1ha2VBcnJheSggZWxlbXMgKTtcbiAgdmFyIGZmRWxlbXMgPSBbXTtcblxuICBlbGVtcy5mb3JFYWNoKCBmdW5jdGlvbiggZWxlbSApIHtcbiAgICAvLyBjaGVjayB0aGF0IGVsZW0gaXMgYW4gYWN0dWFsIGVsZW1lbnRcbiAgICBpZiAoICEoIGVsZW0gaW5zdGFuY2VvZiBIVE1MRWxlbWVudCApICkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICAvLyBhZGQgZWxlbSBpZiBubyBzZWxlY3RvclxuICAgIGlmICggIXNlbGVjdG9yICkge1xuICAgICAgZmZFbGVtcy5wdXNoKCBlbGVtICk7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIC8vIGZpbHRlciAmIGZpbmQgaXRlbXMgaWYgd2UgaGF2ZSBhIHNlbGVjdG9yXG4gICAgLy8gZmlsdGVyXG4gICAgaWYgKCBtYXRjaGVzU2VsZWN0b3IoIGVsZW0sIHNlbGVjdG9yICkgKSB7XG4gICAgICBmZkVsZW1zLnB1c2goIGVsZW0gKTtcbiAgICB9XG4gICAgLy8gZmluZCBjaGlsZHJlblxuICAgIHZhciBjaGlsZEVsZW1zID0gZWxlbS5xdWVyeVNlbGVjdG9yQWxsKCBzZWxlY3RvciApO1xuICAgIC8vIGNvbmNhdCBjaGlsZEVsZW1zIHRvIGZpbHRlckZvdW5kIGFycmF5XG4gICAgZm9yICggdmFyIGk9MDsgaSA8IGNoaWxkRWxlbXMubGVuZ3RoOyBpKysgKSB7XG4gICAgICBmZkVsZW1zLnB1c2goIGNoaWxkRWxlbXNbaV0gKTtcbiAgICB9XG4gIH0pO1xuXG4gIHJldHVybiBmZkVsZW1zO1xufTtcblxuLy8gLS0tLS0gZGVib3VuY2VNZXRob2QgLS0tLS0gLy9cblxudXRpbHMuZGVib3VuY2VNZXRob2QgPSBmdW5jdGlvbiggX2NsYXNzLCBtZXRob2ROYW1lLCB0aHJlc2hvbGQgKSB7XG4gIHRocmVzaG9sZCA9IHRocmVzaG9sZCB8fCAxMDA7XG4gIC8vIG9yaWdpbmFsIG1ldGhvZFxuICB2YXIgbWV0aG9kID0gX2NsYXNzLnByb3RvdHlwZVsgbWV0aG9kTmFtZSBdO1xuICB2YXIgdGltZW91dE5hbWUgPSBtZXRob2ROYW1lICsgJ1RpbWVvdXQnO1xuXG4gIF9jbGFzcy5wcm90b3R5cGVbIG1ldGhvZE5hbWUgXSA9IGZ1bmN0aW9uKCkge1xuICAgIHZhciB0aW1lb3V0ID0gdGhpc1sgdGltZW91dE5hbWUgXTtcbiAgICBjbGVhclRpbWVvdXQoIHRpbWVvdXQgKTtcblxuICAgIHZhciBhcmdzID0gYXJndW1lbnRzO1xuICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgdGhpc1sgdGltZW91dE5hbWUgXSA9IHNldFRpbWVvdXQoIGZ1bmN0aW9uKCkge1xuICAgICAgbWV0aG9kLmFwcGx5KCBfdGhpcywgYXJncyApO1xuICAgICAgZGVsZXRlIF90aGlzWyB0aW1lb3V0TmFtZSBdO1xuICAgIH0sIHRocmVzaG9sZCApO1xuICB9O1xufTtcblxuLy8gLS0tLS0gZG9jUmVhZHkgLS0tLS0gLy9cblxudXRpbHMuZG9jUmVhZHkgPSBmdW5jdGlvbiggY2FsbGJhY2sgKSB7XG4gIHZhciByZWFkeVN0YXRlID0gZG9jdW1lbnQucmVhZHlTdGF0ZTtcbiAgaWYgKCByZWFkeVN0YXRlID09ICdjb21wbGV0ZScgfHwgcmVhZHlTdGF0ZSA9PSAnaW50ZXJhY3RpdmUnICkge1xuICAgIC8vIGRvIGFzeW5jIHRvIGFsbG93IGZvciBvdGhlciBzY3JpcHRzIHRvIHJ1bi4gbWV0YWZpenp5L2ZsaWNraXR5IzQ0MVxuICAgIHNldFRpbWVvdXQoIGNhbGxiYWNrICk7XG4gIH0gZWxzZSB7XG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lciggJ0RPTUNvbnRlbnRMb2FkZWQnLCBjYWxsYmFjayApO1xuICB9XG59O1xuXG4vLyAtLS0tLSBodG1sSW5pdCAtLS0tLSAvL1xuXG4vLyBodHRwOi8vamFtZXNyb2JlcnRzLm5hbWUvYmxvZy8yMDEwLzAyLzIyL3N0cmluZy1mdW5jdGlvbnMtZm9yLWphdmFzY3JpcHQtdHJpbS10by1jYW1lbC1jYXNlLXRvLWRhc2hlZC1hbmQtdG8tdW5kZXJzY29yZS9cbnV0aWxzLnRvRGFzaGVkID0gZnVuY3Rpb24oIHN0ciApIHtcbiAgcmV0dXJuIHN0ci5yZXBsYWNlKCAvKC4pKFtBLVpdKS9nLCBmdW5jdGlvbiggbWF0Y2gsICQxLCAkMiApIHtcbiAgICByZXR1cm4gJDEgKyAnLScgKyAkMjtcbiAgfSkudG9Mb3dlckNhc2UoKTtcbn07XG5cbnZhciBjb25zb2xlID0gd2luZG93LmNvbnNvbGU7XG4vKipcbiAqIGFsbG93IHVzZXIgdG8gaW5pdGlhbGl6ZSBjbGFzc2VzIHZpYSBbZGF0YS1uYW1lc3BhY2VdIG9yIC5qcy1uYW1lc3BhY2UgY2xhc3NcbiAqIGh0bWxJbml0KCBXaWRnZXQsICd3aWRnZXROYW1lJyApXG4gKiBvcHRpb25zIGFyZSBwYXJzZWQgZnJvbSBkYXRhLW5hbWVzcGFjZS1vcHRpb25zXG4gKi9cbnV0aWxzLmh0bWxJbml0ID0gZnVuY3Rpb24oIFdpZGdldENsYXNzLCBuYW1lc3BhY2UgKSB7XG4gIHV0aWxzLmRvY1JlYWR5KCBmdW5jdGlvbigpIHtcbiAgICB2YXIgZGFzaGVkTmFtZXNwYWNlID0gdXRpbHMudG9EYXNoZWQoIG5hbWVzcGFjZSApO1xuICAgIHZhciBkYXRhQXR0ciA9ICdkYXRhLScgKyBkYXNoZWROYW1lc3BhY2U7XG4gICAgdmFyIGRhdGFBdHRyRWxlbXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCAnWycgKyBkYXRhQXR0ciArICddJyApO1xuICAgIHZhciBqc0Rhc2hFbGVtcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoICcuanMtJyArIGRhc2hlZE5hbWVzcGFjZSApO1xuICAgIHZhciBlbGVtcyA9IHV0aWxzLm1ha2VBcnJheSggZGF0YUF0dHJFbGVtcyApXG4gICAgICAuY29uY2F0KCB1dGlscy5tYWtlQXJyYXkoIGpzRGFzaEVsZW1zICkgKTtcbiAgICB2YXIgZGF0YU9wdGlvbnNBdHRyID0gZGF0YUF0dHIgKyAnLW9wdGlvbnMnO1xuICAgIHZhciBqUXVlcnkgPSB3aW5kb3cualF1ZXJ5O1xuXG4gICAgZWxlbXMuZm9yRWFjaCggZnVuY3Rpb24oIGVsZW0gKSB7XG4gICAgICB2YXIgYXR0ciA9IGVsZW0uZ2V0QXR0cmlidXRlKCBkYXRhQXR0ciApIHx8XG4gICAgICAgIGVsZW0uZ2V0QXR0cmlidXRlKCBkYXRhT3B0aW9uc0F0dHIgKTtcbiAgICAgIHZhciBvcHRpb25zO1xuICAgICAgdHJ5IHtcbiAgICAgICAgb3B0aW9ucyA9IGF0dHIgJiYgSlNPTi5wYXJzZSggYXR0ciApO1xuICAgICAgfSBjYXRjaCAoIGVycm9yICkge1xuICAgICAgICAvLyBsb2cgZXJyb3IsIGRvIG5vdCBpbml0aWFsaXplXG4gICAgICAgIGlmICggY29uc29sZSApIHtcbiAgICAgICAgICBjb25zb2xlLmVycm9yKCAnRXJyb3IgcGFyc2luZyAnICsgZGF0YUF0dHIgKyAnIG9uICcgKyBlbGVtLmNsYXNzTmFtZSArXG4gICAgICAgICAgJzogJyArIGVycm9yICk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgLy8gaW5pdGlhbGl6ZVxuICAgICAgdmFyIGluc3RhbmNlID0gbmV3IFdpZGdldENsYXNzKCBlbGVtLCBvcHRpb25zICk7XG4gICAgICAvLyBtYWtlIGF2YWlsYWJsZSB2aWEgJCgpLmRhdGEoJ25hbWVzcGFjZScpXG4gICAgICBpZiAoIGpRdWVyeSApIHtcbiAgICAgICAgalF1ZXJ5LmRhdGEoIGVsZW0sIG5hbWVzcGFjZSwgaW5zdGFuY2UgKTtcbiAgICAgIH1cbiAgICB9KTtcblxuICB9KTtcbn07XG5cbi8vIC0tLS0tICAtLS0tLSAvL1xuXG5yZXR1cm4gdXRpbHM7XG5cbn0pKTtcbiIsIi8vIGFkZCwgcmVtb3ZlIGNlbGxcbiggZnVuY3Rpb24oIHdpbmRvdywgZmFjdG9yeSApIHtcbiAgLy8gdW5pdmVyc2FsIG1vZHVsZSBkZWZpbml0aW9uXG4gIC8qIGpzaGludCBzdHJpY3Q6IGZhbHNlICovXG4gIGlmICggdHlwZW9mIGRlZmluZSA9PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQgKSB7XG4gICAgLy8gQU1EXG4gICAgZGVmaW5lKCBbXG4gICAgICAnLi9mbGlja2l0eScsXG4gICAgICAnZml6enktdWktdXRpbHMvdXRpbHMnXG4gICAgXSwgZnVuY3Rpb24oIEZsaWNraXR5LCB1dGlscyApIHtcbiAgICAgIHJldHVybiBmYWN0b3J5KCB3aW5kb3csIEZsaWNraXR5LCB1dGlscyApO1xuICAgIH0pO1xuICB9IGVsc2UgaWYgKCB0eXBlb2YgbW9kdWxlID09ICdvYmplY3QnICYmIG1vZHVsZS5leHBvcnRzICkge1xuICAgIC8vIENvbW1vbkpTXG4gICAgbW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KFxuICAgICAgd2luZG93LFxuICAgICAgcmVxdWlyZSgnLi9mbGlja2l0eScpLFxuICAgICAgcmVxdWlyZSgnZml6enktdWktdXRpbHMnKVxuICAgICk7XG4gIH0gZWxzZSB7XG4gICAgLy8gYnJvd3NlciBnbG9iYWxcbiAgICBmYWN0b3J5KFxuICAgICAgd2luZG93LFxuICAgICAgd2luZG93LkZsaWNraXR5LFxuICAgICAgd2luZG93LmZpenp5VUlVdGlsc1xuICAgICk7XG4gIH1cblxufSggd2luZG93LCBmdW5jdGlvbiBmYWN0b3J5KCB3aW5kb3csIEZsaWNraXR5LCB1dGlscyApIHtcblxuJ3VzZSBzdHJpY3QnO1xuXG4vLyBhcHBlbmQgY2VsbHMgdG8gYSBkb2N1bWVudCBmcmFnbWVudFxuZnVuY3Rpb24gZ2V0Q2VsbHNGcmFnbWVudCggY2VsbHMgKSB7XG4gIHZhciBmcmFnbWVudCA9IGRvY3VtZW50LmNyZWF0ZURvY3VtZW50RnJhZ21lbnQoKTtcbiAgY2VsbHMuZm9yRWFjaCggZnVuY3Rpb24oIGNlbGwgKSB7XG4gICAgZnJhZ21lbnQuYXBwZW5kQ2hpbGQoIGNlbGwuZWxlbWVudCApO1xuICB9KTtcbiAgcmV0dXJuIGZyYWdtZW50O1xufVxuXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSBhZGQvcmVtb3ZlIGNlbGwgcHJvdG90eXBlIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tIC8vXG5cbnZhciBwcm90byA9IEZsaWNraXR5LnByb3RvdHlwZTtcblxuLyoqXG4gKiBJbnNlcnQsIHByZXBlbmQsIG9yIGFwcGVuZCBjZWxsc1xuICogQHBhcmFtIHtFbGVtZW50LCBBcnJheSwgTm9kZUxpc3R9IGVsZW1zXG4gKiBAcGFyYW0ge0ludGVnZXJ9IGluZGV4XG4gKi9cbnByb3RvLmluc2VydCA9IGZ1bmN0aW9uKCBlbGVtcywgaW5kZXggKSB7XG4gIHZhciBjZWxscyA9IHRoaXMuX21ha2VDZWxscyggZWxlbXMgKTtcbiAgaWYgKCAhY2VsbHMgfHwgIWNlbGxzLmxlbmd0aCApIHtcbiAgICByZXR1cm47XG4gIH1cbiAgdmFyIGxlbiA9IHRoaXMuY2VsbHMubGVuZ3RoO1xuICAvLyBkZWZhdWx0IHRvIGFwcGVuZFxuICBpbmRleCA9IGluZGV4ID09PSB1bmRlZmluZWQgPyBsZW4gOiBpbmRleDtcbiAgLy8gYWRkIGNlbGxzIHdpdGggZG9jdW1lbnQgZnJhZ21lbnRcbiAgdmFyIGZyYWdtZW50ID0gZ2V0Q2VsbHNGcmFnbWVudCggY2VsbHMgKTtcbiAgLy8gYXBwZW5kIHRvIHNsaWRlclxuICB2YXIgaXNBcHBlbmQgPSBpbmRleCA9PSBsZW47XG4gIGlmICggaXNBcHBlbmQgKSB7XG4gICAgdGhpcy5zbGlkZXIuYXBwZW5kQ2hpbGQoIGZyYWdtZW50ICk7XG4gIH0gZWxzZSB7XG4gICAgdmFyIGluc2VydENlbGxFbGVtZW50ID0gdGhpcy5jZWxsc1sgaW5kZXggXS5lbGVtZW50O1xuICAgIHRoaXMuc2xpZGVyLmluc2VydEJlZm9yZSggZnJhZ21lbnQsIGluc2VydENlbGxFbGVtZW50ICk7XG4gIH1cbiAgLy8gYWRkIHRvIHRoaXMuY2VsbHNcbiAgaWYgKCBpbmRleCA9PT0gMCApIHtcbiAgICAvLyBwcmVwZW5kLCBhZGQgdG8gc3RhcnRcbiAgICB0aGlzLmNlbGxzID0gY2VsbHMuY29uY2F0KCB0aGlzLmNlbGxzICk7XG4gIH0gZWxzZSBpZiAoIGlzQXBwZW5kICkge1xuICAgIC8vIGFwcGVuZCwgYWRkIHRvIGVuZFxuICAgIHRoaXMuY2VsbHMgPSB0aGlzLmNlbGxzLmNvbmNhdCggY2VsbHMgKTtcbiAgfSBlbHNlIHtcbiAgICAvLyBpbnNlcnQgaW4gdGhpcy5jZWxsc1xuICAgIHZhciBlbmRDZWxscyA9IHRoaXMuY2VsbHMuc3BsaWNlKCBpbmRleCwgbGVuIC0gaW5kZXggKTtcbiAgICB0aGlzLmNlbGxzID0gdGhpcy5jZWxscy5jb25jYXQoIGNlbGxzICkuY29uY2F0KCBlbmRDZWxscyApO1xuICB9XG5cbiAgdGhpcy5fc2l6ZUNlbGxzKCBjZWxscyApO1xuICB0aGlzLmNlbGxDaGFuZ2UoIGluZGV4LCB0cnVlICk7XG59O1xuXG5wcm90by5hcHBlbmQgPSBmdW5jdGlvbiggZWxlbXMgKSB7XG4gIHRoaXMuaW5zZXJ0KCBlbGVtcywgdGhpcy5jZWxscy5sZW5ndGggKTtcbn07XG5cbnByb3RvLnByZXBlbmQgPSBmdW5jdGlvbiggZWxlbXMgKSB7XG4gIHRoaXMuaW5zZXJ0KCBlbGVtcywgMCApO1xufTtcblxuLyoqXG4gKiBSZW1vdmUgY2VsbHNcbiAqIEBwYXJhbSB7RWxlbWVudCwgQXJyYXksIE5vZGVMaXN0fSBlbGVtc1xuICovXG5wcm90by5yZW1vdmUgPSBmdW5jdGlvbiggZWxlbXMgKSB7XG4gIHZhciBjZWxscyA9IHRoaXMuZ2V0Q2VsbHMoIGVsZW1zICk7XG4gIGlmICggIWNlbGxzIHx8ICFjZWxscy5sZW5ndGggKSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgdmFyIG1pbkNlbGxJbmRleCA9IHRoaXMuY2VsbHMubGVuZ3RoIC0gMTtcbiAgLy8gcmVtb3ZlIGNlbGxzIGZyb20gY29sbGVjdGlvbiAmIERPTVxuICBjZWxscy5mb3JFYWNoKCBmdW5jdGlvbiggY2VsbCApIHtcbiAgICBjZWxsLnJlbW92ZSgpO1xuICAgIHZhciBpbmRleCA9IHRoaXMuY2VsbHMuaW5kZXhPZiggY2VsbCApO1xuICAgIG1pbkNlbGxJbmRleCA9IE1hdGgubWluKCBpbmRleCwgbWluQ2VsbEluZGV4ICk7XG4gICAgdXRpbHMucmVtb3ZlRnJvbSggdGhpcy5jZWxscywgY2VsbCApO1xuICB9LCB0aGlzICk7XG5cbiAgdGhpcy5jZWxsQ2hhbmdlKCBtaW5DZWxsSW5kZXgsIHRydWUgKTtcbn07XG5cbi8qKlxuICogbG9naWMgdG8gYmUgcnVuIGFmdGVyIGEgY2VsbCdzIHNpemUgY2hhbmdlc1xuICogQHBhcmFtIHtFbGVtZW50fSBlbGVtIC0gY2VsbCdzIGVsZW1lbnRcbiAqL1xucHJvdG8uY2VsbFNpemVDaGFuZ2UgPSBmdW5jdGlvbiggZWxlbSApIHtcbiAgdmFyIGNlbGwgPSB0aGlzLmdldENlbGwoIGVsZW0gKTtcbiAgaWYgKCAhY2VsbCApIHtcbiAgICByZXR1cm47XG4gIH1cbiAgY2VsbC5nZXRTaXplKCk7XG5cbiAgdmFyIGluZGV4ID0gdGhpcy5jZWxscy5pbmRleE9mKCBjZWxsICk7XG4gIHRoaXMuY2VsbENoYW5nZSggaW5kZXggKTtcbn07XG5cbi8qKlxuICogbG9naWMgYW55IHRpbWUgYSBjZWxsIGlzIGNoYW5nZWQ6IGFkZGVkLCByZW1vdmVkLCBvciBzaXplIGNoYW5nZWRcbiAqIEBwYXJhbSB7SW50ZWdlcn0gY2hhbmdlZENlbGxJbmRleCAtIGluZGV4IG9mIHRoZSBjaGFuZ2VkIGNlbGwsIG9wdGlvbmFsXG4gKi9cbnByb3RvLmNlbGxDaGFuZ2UgPSBmdW5jdGlvbiggY2hhbmdlZENlbGxJbmRleCwgaXNQb3NpdGlvbmluZ1NsaWRlciApIHtcbiAgdmFyIHByZXZTZWxlY3RlZEVsZW0gPSB0aGlzLnNlbGVjdGVkRWxlbWVudDtcbiAgdGhpcy5fcG9zaXRpb25DZWxscyggY2hhbmdlZENlbGxJbmRleCApO1xuICB0aGlzLl9nZXRXcmFwU2hpZnRDZWxscygpO1xuICB0aGlzLnNldEdhbGxlcnlTaXplKCk7XG4gIC8vIHVwZGF0ZSBzZWxlY3RlZEluZGV4XG4gIC8vIHRyeSB0byBtYWludGFpbiBwb3NpdGlvbiAmIHNlbGVjdCBwcmV2aW91cyBzZWxlY3RlZCBlbGVtZW50XG4gIHZhciBjZWxsID0gdGhpcy5nZXRDZWxsKCBwcmV2U2VsZWN0ZWRFbGVtICk7XG4gIGlmICggY2VsbCApIHtcbiAgICB0aGlzLnNlbGVjdGVkSW5kZXggPSB0aGlzLmdldENlbGxTbGlkZUluZGV4KCBjZWxsICk7XG4gIH1cbiAgdGhpcy5zZWxlY3RlZEluZGV4ID0gTWF0aC5taW4oIHRoaXMuc2xpZGVzLmxlbmd0aCAtIDEsIHRoaXMuc2VsZWN0ZWRJbmRleCApO1xuXG4gIHRoaXMuZW1pdEV2ZW50KCAnY2VsbENoYW5nZScsIFsgY2hhbmdlZENlbGxJbmRleCBdICk7XG4gIC8vIHBvc2l0aW9uIHNsaWRlclxuICB0aGlzLnNlbGVjdCggdGhpcy5zZWxlY3RlZEluZGV4ICk7XG4gIC8vIGRvIG5vdCBwb3NpdGlvbiBzbGlkZXIgYWZ0ZXIgbGF6eSBsb2FkXG4gIGlmICggaXNQb3NpdGlvbmluZ1NsaWRlciApIHtcbiAgICB0aGlzLnBvc2l0aW9uU2xpZGVyQXRTZWxlY3RlZCgpO1xuICB9XG59O1xuXG4vLyAtLS0tLSAgLS0tLS0gLy9cblxucmV0dXJuIEZsaWNraXR5O1xuXG59KSk7XG4iLCIvLyBhbmltYXRlXG4oIGZ1bmN0aW9uKCB3aW5kb3csIGZhY3RvcnkgKSB7XG4gIC8vIHVuaXZlcnNhbCBtb2R1bGUgZGVmaW5pdGlvblxuICAvKiBqc2hpbnQgc3RyaWN0OiBmYWxzZSAqL1xuICBpZiAoIHR5cGVvZiBkZWZpbmUgPT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kICkge1xuICAgIC8vIEFNRFxuICAgIGRlZmluZSggW1xuICAgICAgJ2Zpenp5LXVpLXV0aWxzL3V0aWxzJ1xuICAgIF0sIGZ1bmN0aW9uKCB1dGlscyApIHtcbiAgICAgIHJldHVybiBmYWN0b3J5KCB3aW5kb3csIHV0aWxzICk7XG4gICAgfSk7XG4gIH0gZWxzZSBpZiAoIHR5cGVvZiBtb2R1bGUgPT0gJ29iamVjdCcgJiYgbW9kdWxlLmV4cG9ydHMgKSB7XG4gICAgLy8gQ29tbW9uSlNcbiAgICBtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkoXG4gICAgICB3aW5kb3csXG4gICAgICByZXF1aXJlKCdmaXp6eS11aS11dGlscycpXG4gICAgKTtcbiAgfSBlbHNlIHtcbiAgICAvLyBicm93c2VyIGdsb2JhbFxuICAgIHdpbmRvdy5GbGlja2l0eSA9IHdpbmRvdy5GbGlja2l0eSB8fCB7fTtcbiAgICB3aW5kb3cuRmxpY2tpdHkuYW5pbWF0ZVByb3RvdHlwZSA9IGZhY3RvcnkoXG4gICAgICB3aW5kb3csXG4gICAgICB3aW5kb3cuZml6enlVSVV0aWxzXG4gICAgKTtcbiAgfVxuXG59KCB3aW5kb3csIGZ1bmN0aW9uIGZhY3RvcnkoIHdpbmRvdywgdXRpbHMgKSB7XG5cbid1c2Ugc3RyaWN0JztcblxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gYW5pbWF0ZSAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAvL1xuXG52YXIgcHJvdG8gPSB7fTtcblxucHJvdG8uc3RhcnRBbmltYXRpb24gPSBmdW5jdGlvbigpIHtcbiAgaWYgKCB0aGlzLmlzQW5pbWF0aW5nICkge1xuICAgIHJldHVybjtcbiAgfVxuXG4gIHRoaXMuaXNBbmltYXRpbmcgPSB0cnVlO1xuICB0aGlzLnJlc3RpbmdGcmFtZXMgPSAwO1xuICB0aGlzLmFuaW1hdGUoKTtcbn07XG5cbnByb3RvLmFuaW1hdGUgPSBmdW5jdGlvbigpIHtcbiAgdGhpcy5hcHBseURyYWdGb3JjZSgpO1xuICB0aGlzLmFwcGx5U2VsZWN0ZWRBdHRyYWN0aW9uKCk7XG5cbiAgdmFyIHByZXZpb3VzWCA9IHRoaXMueDtcblxuICB0aGlzLmludGVncmF0ZVBoeXNpY3MoKTtcbiAgdGhpcy5wb3NpdGlvblNsaWRlcigpO1xuICB0aGlzLnNldHRsZSggcHJldmlvdXNYICk7XG4gIC8vIGFuaW1hdGUgbmV4dCBmcmFtZVxuICBpZiAoIHRoaXMuaXNBbmltYXRpbmcgKSB7XG4gICAgdmFyIF90aGlzID0gdGhpcztcbiAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoIGZ1bmN0aW9uIGFuaW1hdGVGcmFtZSgpIHtcbiAgICAgIF90aGlzLmFuaW1hdGUoKTtcbiAgICB9KTtcbiAgfVxufTtcblxucHJvdG8ucG9zaXRpb25TbGlkZXIgPSBmdW5jdGlvbigpIHtcbiAgdmFyIHggPSB0aGlzLng7XG4gIC8vIHdyYXAgcG9zaXRpb24gYXJvdW5kXG4gIGlmICggdGhpcy5vcHRpb25zLndyYXBBcm91bmQgJiYgdGhpcy5jZWxscy5sZW5ndGggPiAxICkge1xuICAgIHggPSB1dGlscy5tb2R1bG8oIHgsIHRoaXMuc2xpZGVhYmxlV2lkdGggKTtcbiAgICB4ID0geCAtIHRoaXMuc2xpZGVhYmxlV2lkdGg7XG4gICAgdGhpcy5zaGlmdFdyYXBDZWxscyggeCApO1xuICB9XG5cbiAgdGhpcy5zZXRUcmFuc2xhdGVYKCB4LCB0aGlzLmlzQW5pbWF0aW5nICk7XG4gIHRoaXMuZGlzcGF0Y2hTY3JvbGxFdmVudCgpO1xufTtcblxucHJvdG8uc2V0VHJhbnNsYXRlWCA9IGZ1bmN0aW9uKCB4LCBpczNkICkge1xuICB4ICs9IHRoaXMuY3Vyc29yUG9zaXRpb247XG4gIC8vIHJldmVyc2UgaWYgcmlnaHQtdG8tbGVmdCBhbmQgdXNpbmcgdHJhbnNmb3JtXG4gIHggPSB0aGlzLm9wdGlvbnMucmlnaHRUb0xlZnQgPyAteCA6IHg7XG4gIHZhciB0cmFuc2xhdGVYID0gdGhpcy5nZXRQb3NpdGlvblZhbHVlKCB4ICk7XG4gIC8vIHVzZSAzRCB0cmFuZm9ybXMgZm9yIGhhcmR3YXJlIGFjY2VsZXJhdGlvbiBvbiBpT1NcbiAgLy8gYnV0IHVzZSAyRCB3aGVuIHNldHRsZWQsIGZvciBiZXR0ZXIgZm9udC1yZW5kZXJpbmdcbiAgdGhpcy5zbGlkZXIuc3R5bGUudHJhbnNmb3JtID0gaXMzZCA/XG4gICAgJ3RyYW5zbGF0ZTNkKCcgKyB0cmFuc2xhdGVYICsgJywwLDApJyA6ICd0cmFuc2xhdGVYKCcgKyB0cmFuc2xhdGVYICsgJyknO1xufTtcblxucHJvdG8uZGlzcGF0Y2hTY3JvbGxFdmVudCA9IGZ1bmN0aW9uKCkge1xuICB2YXIgZmlyc3RTbGlkZSA9IHRoaXMuc2xpZGVzWzBdO1xuICBpZiAoICFmaXJzdFNsaWRlICkge1xuICAgIHJldHVybjtcbiAgfVxuICB2YXIgcG9zaXRpb25YID0gLXRoaXMueCAtIGZpcnN0U2xpZGUudGFyZ2V0O1xuICB2YXIgcHJvZ3Jlc3MgPSBwb3NpdGlvblggLyB0aGlzLnNsaWRlc1dpZHRoO1xuICB0aGlzLmRpc3BhdGNoRXZlbnQoICdzY3JvbGwnLCBudWxsLCBbIHByb2dyZXNzLCBwb3NpdGlvblggXSApO1xufTtcblxucHJvdG8ucG9zaXRpb25TbGlkZXJBdFNlbGVjdGVkID0gZnVuY3Rpb24oKSB7XG4gIGlmICggIXRoaXMuY2VsbHMubGVuZ3RoICkge1xuICAgIHJldHVybjtcbiAgfVxuICB0aGlzLnggPSAtdGhpcy5zZWxlY3RlZFNsaWRlLnRhcmdldDtcbiAgdGhpcy52ZWxvY2l0eSA9IDA7IC8vIHN0b3Agd29iYmxlXG4gIHRoaXMucG9zaXRpb25TbGlkZXIoKTtcbn07XG5cbnByb3RvLmdldFBvc2l0aW9uVmFsdWUgPSBmdW5jdGlvbiggcG9zaXRpb24gKSB7XG4gIGlmICggdGhpcy5vcHRpb25zLnBlcmNlbnRQb3NpdGlvbiApIHtcbiAgICAvLyBwZXJjZW50IHBvc2l0aW9uLCByb3VuZCB0byAyIGRpZ2l0cywgbGlrZSAxMi4zNCVcbiAgICByZXR1cm4gKCBNYXRoLnJvdW5kKCAoIHBvc2l0aW9uIC8gdGhpcy5zaXplLmlubmVyV2lkdGggKSAqIDEwMDAwICkgKiAwLjAxICkrICclJztcbiAgfSBlbHNlIHtcbiAgICAvLyBwaXhlbCBwb3NpdGlvbmluZ1xuICAgIHJldHVybiBNYXRoLnJvdW5kKCBwb3NpdGlvbiApICsgJ3B4JztcbiAgfVxufTtcblxucHJvdG8uc2V0dGxlID0gZnVuY3Rpb24oIHByZXZpb3VzWCApIHtcbiAgLy8ga2VlcCB0cmFjayBvZiBmcmFtZXMgd2hlcmUgeCBoYXNuJ3QgbW92ZWRcbiAgaWYgKCAhdGhpcy5pc1BvaW50ZXJEb3duICYmIE1hdGgucm91bmQoIHRoaXMueCAqIDEwMCApID09IE1hdGgucm91bmQoIHByZXZpb3VzWCAqIDEwMCApICkge1xuICAgIHRoaXMucmVzdGluZ0ZyYW1lcysrO1xuICB9XG4gIC8vIHN0b3AgYW5pbWF0aW5nIGlmIHJlc3RpbmcgZm9yIDMgb3IgbW9yZSBmcmFtZXNcbiAgaWYgKCB0aGlzLnJlc3RpbmdGcmFtZXMgPiAyICkge1xuICAgIHRoaXMuaXNBbmltYXRpbmcgPSBmYWxzZTtcbiAgICBkZWxldGUgdGhpcy5pc0ZyZWVTY3JvbGxpbmc7XG4gICAgLy8gcmVuZGVyIHBvc2l0aW9uIHdpdGggdHJhbnNsYXRlWCB3aGVuIHNldHRsZWRcbiAgICB0aGlzLnBvc2l0aW9uU2xpZGVyKCk7XG4gICAgdGhpcy5kaXNwYXRjaEV2ZW50KCAnc2V0dGxlJywgbnVsbCwgWyB0aGlzLnNlbGVjdGVkSW5kZXggXSApO1xuICB9XG59O1xuXG5wcm90by5zaGlmdFdyYXBDZWxscyA9IGZ1bmN0aW9uKCB4ICkge1xuICAvLyBzaGlmdCBiZWZvcmUgY2VsbHNcbiAgdmFyIGJlZm9yZUdhcCA9IHRoaXMuY3Vyc29yUG9zaXRpb24gKyB4O1xuICB0aGlzLl9zaGlmdENlbGxzKCB0aGlzLmJlZm9yZVNoaWZ0Q2VsbHMsIGJlZm9yZUdhcCwgLTEgKTtcbiAgLy8gc2hpZnQgYWZ0ZXIgY2VsbHNcbiAgdmFyIGFmdGVyR2FwID0gdGhpcy5zaXplLmlubmVyV2lkdGggLSAoIHggKyB0aGlzLnNsaWRlYWJsZVdpZHRoICsgdGhpcy5jdXJzb3JQb3NpdGlvbiApO1xuICB0aGlzLl9zaGlmdENlbGxzKCB0aGlzLmFmdGVyU2hpZnRDZWxscywgYWZ0ZXJHYXAsIDEgKTtcbn07XG5cbnByb3RvLl9zaGlmdENlbGxzID0gZnVuY3Rpb24oIGNlbGxzLCBnYXAsIHNoaWZ0ICkge1xuICBmb3IgKCB2YXIgaT0wOyBpIDwgY2VsbHMubGVuZ3RoOyBpKysgKSB7XG4gICAgdmFyIGNlbGwgPSBjZWxsc1tpXTtcbiAgICB2YXIgY2VsbFNoaWZ0ID0gZ2FwID4gMCA/IHNoaWZ0IDogMDtcbiAgICBjZWxsLndyYXBTaGlmdCggY2VsbFNoaWZ0ICk7XG4gICAgZ2FwIC09IGNlbGwuc2l6ZS5vdXRlcldpZHRoO1xuICB9XG59O1xuXG5wcm90by5fdW5zaGlmdENlbGxzID0gZnVuY3Rpb24oIGNlbGxzICkge1xuICBpZiAoICFjZWxscyB8fCAhY2VsbHMubGVuZ3RoICkge1xuICAgIHJldHVybjtcbiAgfVxuICBmb3IgKCB2YXIgaT0wOyBpIDwgY2VsbHMubGVuZ3RoOyBpKysgKSB7XG4gICAgY2VsbHNbaV0ud3JhcFNoaWZ0KCAwICk7XG4gIH1cbn07XG5cbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tIHBoeXNpY3MgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gLy9cblxucHJvdG8uaW50ZWdyYXRlUGh5c2ljcyA9IGZ1bmN0aW9uKCkge1xuICB0aGlzLnggKz0gdGhpcy52ZWxvY2l0eTtcbiAgdGhpcy52ZWxvY2l0eSAqPSB0aGlzLmdldEZyaWN0aW9uRmFjdG9yKCk7XG59O1xuXG5wcm90by5hcHBseUZvcmNlID0gZnVuY3Rpb24oIGZvcmNlICkge1xuICB0aGlzLnZlbG9jaXR5ICs9IGZvcmNlO1xufTtcblxucHJvdG8uZ2V0RnJpY3Rpb25GYWN0b3IgPSBmdW5jdGlvbigpIHtcbiAgcmV0dXJuIDEgLSB0aGlzLm9wdGlvbnNbIHRoaXMuaXNGcmVlU2Nyb2xsaW5nID8gJ2ZyZWVTY3JvbGxGcmljdGlvbicgOiAnZnJpY3Rpb24nIF07XG59O1xuXG5wcm90by5nZXRSZXN0aW5nUG9zaXRpb24gPSBmdW5jdGlvbigpIHtcbiAgLy8gbXkgdGhhbmtzIHRvIFN0ZXZlbiBXaXR0ZW5zLCB3aG8gc2ltcGxpZmllZCB0aGlzIG1hdGggZ3JlYXRseVxuICByZXR1cm4gdGhpcy54ICsgdGhpcy52ZWxvY2l0eSAvICggMSAtIHRoaXMuZ2V0RnJpY3Rpb25GYWN0b3IoKSApO1xufTtcblxucHJvdG8uYXBwbHlEcmFnRm9yY2UgPSBmdW5jdGlvbigpIHtcbiAgaWYgKCAhdGhpcy5pc0RyYWdnYWJsZSB8fCAhdGhpcy5pc1BvaW50ZXJEb3duICkge1xuICAgIHJldHVybjtcbiAgfVxuICAvLyBjaGFuZ2UgdGhlIHBvc2l0aW9uIHRvIGRyYWcgcG9zaXRpb24gYnkgYXBwbHlpbmcgZm9yY2VcbiAgdmFyIGRyYWdWZWxvY2l0eSA9IHRoaXMuZHJhZ1ggLSB0aGlzLng7XG4gIHZhciBkcmFnRm9yY2UgPSBkcmFnVmVsb2NpdHkgLSB0aGlzLnZlbG9jaXR5O1xuICB0aGlzLmFwcGx5Rm9yY2UoIGRyYWdGb3JjZSApO1xufTtcblxucHJvdG8uYXBwbHlTZWxlY3RlZEF0dHJhY3Rpb24gPSBmdW5jdGlvbigpIHtcbiAgLy8gZG8gbm90IGF0dHJhY3QgaWYgcG9pbnRlciBkb3duIG9yIG5vIHNsaWRlc1xuICB2YXIgZHJhZ0Rvd24gPSB0aGlzLmlzRHJhZ2dhYmxlICYmIHRoaXMuaXNQb2ludGVyRG93bjtcbiAgaWYgKCBkcmFnRG93biB8fCB0aGlzLmlzRnJlZVNjcm9sbGluZyB8fCAhdGhpcy5zbGlkZXMubGVuZ3RoICkge1xuICAgIHJldHVybjtcbiAgfVxuICB2YXIgZGlzdGFuY2UgPSB0aGlzLnNlbGVjdGVkU2xpZGUudGFyZ2V0ICogLTEgLSB0aGlzLng7XG4gIHZhciBmb3JjZSA9IGRpc3RhbmNlICogdGhpcy5vcHRpb25zLnNlbGVjdGVkQXR0cmFjdGlvbjtcbiAgdGhpcy5hcHBseUZvcmNlKCBmb3JjZSApO1xufTtcblxucmV0dXJuIHByb3RvO1xuXG59KSk7XG4iLCIvLyBGbGlja2l0eS5DZWxsXG4oIGZ1bmN0aW9uKCB3aW5kb3csIGZhY3RvcnkgKSB7XG4gIC8vIHVuaXZlcnNhbCBtb2R1bGUgZGVmaW5pdGlvblxuICAvKiBqc2hpbnQgc3RyaWN0OiBmYWxzZSAqL1xuICBpZiAoIHR5cGVvZiBkZWZpbmUgPT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kICkge1xuICAgIC8vIEFNRFxuICAgIGRlZmluZSggW1xuICAgICAgJ2dldC1zaXplL2dldC1zaXplJ1xuICAgIF0sIGZ1bmN0aW9uKCBnZXRTaXplICkge1xuICAgICAgcmV0dXJuIGZhY3RvcnkoIHdpbmRvdywgZ2V0U2l6ZSApO1xuICAgIH0pO1xuICB9IGVsc2UgaWYgKCB0eXBlb2YgbW9kdWxlID09ICdvYmplY3QnICYmIG1vZHVsZS5leHBvcnRzICkge1xuICAgIC8vIENvbW1vbkpTXG4gICAgbW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KFxuICAgICAgd2luZG93LFxuICAgICAgcmVxdWlyZSgnZ2V0LXNpemUnKVxuICAgICk7XG4gIH0gZWxzZSB7XG4gICAgLy8gYnJvd3NlciBnbG9iYWxcbiAgICB3aW5kb3cuRmxpY2tpdHkgPSB3aW5kb3cuRmxpY2tpdHkgfHwge307XG4gICAgd2luZG93LkZsaWNraXR5LkNlbGwgPSBmYWN0b3J5KFxuICAgICAgd2luZG93LFxuICAgICAgd2luZG93LmdldFNpemVcbiAgICApO1xuICB9XG5cbn0oIHdpbmRvdywgZnVuY3Rpb24gZmFjdG9yeSggd2luZG93LCBnZXRTaXplICkge1xuXG4ndXNlIHN0cmljdCc7XG5cbmZ1bmN0aW9uIENlbGwoIGVsZW0sIHBhcmVudCApIHtcbiAgdGhpcy5lbGVtZW50ID0gZWxlbTtcbiAgdGhpcy5wYXJlbnQgPSBwYXJlbnQ7XG5cbiAgdGhpcy5jcmVhdGUoKTtcbn1cblxudmFyIHByb3RvID0gQ2VsbC5wcm90b3R5cGU7XG5cbnByb3RvLmNyZWF0ZSA9IGZ1bmN0aW9uKCkge1xuICB0aGlzLmVsZW1lbnQuc3R5bGUucG9zaXRpb24gPSAnYWJzb2x1dGUnO1xuICB0aGlzLmVsZW1lbnQuc2V0QXR0cmlidXRlKCAnYXJpYS1oaWRkZW4nLCAndHJ1ZScgKTtcbiAgdGhpcy54ID0gMDtcbiAgdGhpcy5zaGlmdCA9IDA7XG59O1xuXG5wcm90by5kZXN0cm95ID0gZnVuY3Rpb24oKSB7XG4gIC8vIHJlc2V0IHN0eWxlXG4gIHRoaXMudW5zZWxlY3QoKTtcbiAgdGhpcy5lbGVtZW50LnN0eWxlLnBvc2l0aW9uID0gJyc7XG4gIHZhciBzaWRlID0gdGhpcy5wYXJlbnQub3JpZ2luU2lkZTtcbiAgdGhpcy5lbGVtZW50LnN0eWxlWyBzaWRlIF0gPSAnJztcbn07XG5cbnByb3RvLmdldFNpemUgPSBmdW5jdGlvbigpIHtcbiAgdGhpcy5zaXplID0gZ2V0U2l6ZSggdGhpcy5lbGVtZW50ICk7XG59O1xuXG5wcm90by5zZXRQb3NpdGlvbiA9IGZ1bmN0aW9uKCB4ICkge1xuICB0aGlzLnggPSB4O1xuICB0aGlzLnVwZGF0ZVRhcmdldCgpO1xuICB0aGlzLnJlbmRlclBvc2l0aW9uKCB4ICk7XG59O1xuXG4vLyBzZXREZWZhdWx0VGFyZ2V0IHYxIG1ldGhvZCwgYmFja3dhcmRzIGNvbXBhdGliaWxpdHksIHJlbW92ZSBpbiB2M1xucHJvdG8udXBkYXRlVGFyZ2V0ID0gcHJvdG8uc2V0RGVmYXVsdFRhcmdldCA9IGZ1bmN0aW9uKCkge1xuICB2YXIgbWFyZ2luUHJvcGVydHkgPSB0aGlzLnBhcmVudC5vcmlnaW5TaWRlID09ICdsZWZ0JyA/ICdtYXJnaW5MZWZ0JyA6ICdtYXJnaW5SaWdodCc7XG4gIHRoaXMudGFyZ2V0ID0gdGhpcy54ICsgdGhpcy5zaXplWyBtYXJnaW5Qcm9wZXJ0eSBdICtcbiAgICB0aGlzLnNpemUud2lkdGggKiB0aGlzLnBhcmVudC5jZWxsQWxpZ247XG59O1xuXG5wcm90by5yZW5kZXJQb3NpdGlvbiA9IGZ1bmN0aW9uKCB4ICkge1xuICAvLyByZW5kZXIgcG9zaXRpb24gb2YgY2VsbCB3aXRoIGluIHNsaWRlclxuICB2YXIgc2lkZSA9IHRoaXMucGFyZW50Lm9yaWdpblNpZGU7XG4gIHRoaXMuZWxlbWVudC5zdHlsZVsgc2lkZSBdID0gdGhpcy5wYXJlbnQuZ2V0UG9zaXRpb25WYWx1ZSggeCApO1xufTtcblxucHJvdG8uc2VsZWN0ID0gZnVuY3Rpb24oKSB7XG4gIHRoaXMuZWxlbWVudC5jbGFzc0xpc3QuYWRkKCdpcy1zZWxlY3RlZCcpO1xuICB0aGlzLmVsZW1lbnQucmVtb3ZlQXR0cmlidXRlKCdhcmlhLWhpZGRlbicpO1xufTtcblxucHJvdG8udW5zZWxlY3QgPSBmdW5jdGlvbigpIHtcbiAgdGhpcy5lbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoJ2lzLXNlbGVjdGVkJyk7XG4gIHRoaXMuZWxlbWVudC5zZXRBdHRyaWJ1dGUoICdhcmlhLWhpZGRlbicsICd0cnVlJyApO1xufTtcblxuLyoqXG4gKiBAcGFyYW0ge0ludGVnZXJ9IGZhY3RvciAtIDAsIDEsIG9yIC0xXG4qKi9cbnByb3RvLndyYXBTaGlmdCA9IGZ1bmN0aW9uKCBzaGlmdCApIHtcbiAgdGhpcy5zaGlmdCA9IHNoaWZ0O1xuICB0aGlzLnJlbmRlclBvc2l0aW9uKCB0aGlzLnggKyB0aGlzLnBhcmVudC5zbGlkZWFibGVXaWR0aCAqIHNoaWZ0ICk7XG59O1xuXG5wcm90by5yZW1vdmUgPSBmdW5jdGlvbigpIHtcbiAgdGhpcy5lbGVtZW50LnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoIHRoaXMuZWxlbWVudCApO1xufTtcblxucmV0dXJuIENlbGw7XG5cbn0pKTtcbiIsIi8vIGRyYWdcbiggZnVuY3Rpb24oIHdpbmRvdywgZmFjdG9yeSApIHtcbiAgLy8gdW5pdmVyc2FsIG1vZHVsZSBkZWZpbml0aW9uXG4gIC8qIGpzaGludCBzdHJpY3Q6IGZhbHNlICovXG4gIGlmICggdHlwZW9mIGRlZmluZSA9PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQgKSB7XG4gICAgLy8gQU1EXG4gICAgZGVmaW5lKCBbXG4gICAgICAnLi9mbGlja2l0eScsXG4gICAgICAndW5pZHJhZ2dlci91bmlkcmFnZ2VyJyxcbiAgICAgICdmaXp6eS11aS11dGlscy91dGlscydcbiAgICBdLCBmdW5jdGlvbiggRmxpY2tpdHksIFVuaWRyYWdnZXIsIHV0aWxzICkge1xuICAgICAgcmV0dXJuIGZhY3RvcnkoIHdpbmRvdywgRmxpY2tpdHksIFVuaWRyYWdnZXIsIHV0aWxzICk7XG4gICAgfSk7XG4gIH0gZWxzZSBpZiAoIHR5cGVvZiBtb2R1bGUgPT0gJ29iamVjdCcgJiYgbW9kdWxlLmV4cG9ydHMgKSB7XG4gICAgLy8gQ29tbW9uSlNcbiAgICBtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkoXG4gICAgICB3aW5kb3csXG4gICAgICByZXF1aXJlKCcuL2ZsaWNraXR5JyksXG4gICAgICByZXF1aXJlKCd1bmlkcmFnZ2VyJyksXG4gICAgICByZXF1aXJlKCdmaXp6eS11aS11dGlscycpXG4gICAgKTtcbiAgfSBlbHNlIHtcbiAgICAvLyBicm93c2VyIGdsb2JhbFxuICAgIHdpbmRvdy5GbGlja2l0eSA9IGZhY3RvcnkoXG4gICAgICB3aW5kb3csXG4gICAgICB3aW5kb3cuRmxpY2tpdHksXG4gICAgICB3aW5kb3cuVW5pZHJhZ2dlcixcbiAgICAgIHdpbmRvdy5maXp6eVVJVXRpbHNcbiAgICApO1xuICB9XG5cbn0oIHdpbmRvdywgZnVuY3Rpb24gZmFjdG9yeSggd2luZG93LCBGbGlja2l0eSwgVW5pZHJhZ2dlciwgdXRpbHMgKSB7XG5cbid1c2Ugc3RyaWN0JztcblxuLy8gLS0tLS0gZGVmYXVsdHMgLS0tLS0gLy9cblxudXRpbHMuZXh0ZW5kKCBGbGlja2l0eS5kZWZhdWx0cywge1xuICBkcmFnZ2FibGU6ICc+MScsXG4gIGRyYWdUaHJlc2hvbGQ6IDMsXG59KTtcblxuLy8gLS0tLS0gY3JlYXRlIC0tLS0tIC8vXG5cbkZsaWNraXR5LmNyZWF0ZU1ldGhvZHMucHVzaCgnX2NyZWF0ZURyYWcnKTtcblxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gZHJhZyBwcm90b3R5cGUgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gLy9cblxudmFyIHByb3RvID0gRmxpY2tpdHkucHJvdG90eXBlO1xudXRpbHMuZXh0ZW5kKCBwcm90bywgVW5pZHJhZ2dlci5wcm90b3R5cGUgKTtcbnByb3RvLl90b3VjaEFjdGlvblZhbHVlID0gJ3Bhbi15JztcblxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tIC8vXG5cbnZhciBpc1RvdWNoID0gJ2NyZWF0ZVRvdWNoJyBpbiBkb2N1bWVudDtcbnZhciBpc1RvdWNobW92ZVNjcm9sbENhbmNlbGVkID0gZmFsc2U7XG5cbnByb3RvLl9jcmVhdGVEcmFnID0gZnVuY3Rpb24oKSB7XG4gIHRoaXMub24oICdhY3RpdmF0ZScsIHRoaXMub25BY3RpdmF0ZURyYWcgKTtcbiAgdGhpcy5vbiggJ3VpQ2hhbmdlJywgdGhpcy5fdWlDaGFuZ2VEcmFnICk7XG4gIHRoaXMub24oICdkZWFjdGl2YXRlJywgdGhpcy5vbkRlYWN0aXZhdGVEcmFnICk7XG4gIHRoaXMub24oICdjZWxsQ2hhbmdlJywgdGhpcy51cGRhdGVEcmFnZ2FibGUgKTtcbiAgLy8gVE9ETyB1cGRhdGVEcmFnZ2FibGUgb24gcmVzaXplPyBpZiBncm91cENlbGxzICYgc2xpZGVzIGNoYW5nZVxuICAvLyBIQUNLIC0gYWRkIHNlZW1pbmdseSBpbm5vY3VvdXMgaGFuZGxlciB0byBmaXggaU9TIDEwIHNjcm9sbCBiZWhhdmlvclxuICAvLyAjNDU3LCBSdWJhWGEvU29ydGFibGUjOTczXG4gIGlmICggaXNUb3VjaCAmJiAhaXNUb3VjaG1vdmVTY3JvbGxDYW5jZWxlZCApIHtcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lciggJ3RvdWNobW92ZScsIGZ1bmN0aW9uKCkge30pO1xuICAgIGlzVG91Y2htb3ZlU2Nyb2xsQ2FuY2VsZWQgPSB0cnVlO1xuICB9XG59O1xuXG5wcm90by5vbkFjdGl2YXRlRHJhZyA9IGZ1bmN0aW9uKCkge1xuICB0aGlzLmhhbmRsZXMgPSBbIHRoaXMudmlld3BvcnQgXTtcbiAgdGhpcy5iaW5kSGFuZGxlcygpO1xuICB0aGlzLnVwZGF0ZURyYWdnYWJsZSgpO1xufTtcblxucHJvdG8ub25EZWFjdGl2YXRlRHJhZyA9IGZ1bmN0aW9uKCkge1xuICB0aGlzLnVuYmluZEhhbmRsZXMoKTtcbiAgdGhpcy5lbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoJ2lzLWRyYWdnYWJsZScpO1xufTtcblxucHJvdG8udXBkYXRlRHJhZ2dhYmxlID0gZnVuY3Rpb24oKSB7XG4gIC8vIGRpc2FibGUgZHJhZ2dpbmcgaWYgbGVzcyB0aGFuIDIgc2xpZGVzLiAjMjc4XG4gIGlmICggdGhpcy5vcHRpb25zLmRyYWdnYWJsZSA9PSAnPjEnICkge1xuICAgIHRoaXMuaXNEcmFnZ2FibGUgPSB0aGlzLnNsaWRlcy5sZW5ndGggPiAxO1xuICB9IGVsc2Uge1xuICAgIHRoaXMuaXNEcmFnZ2FibGUgPSB0aGlzLm9wdGlvbnMuZHJhZ2dhYmxlO1xuICB9XG4gIGlmICggdGhpcy5pc0RyYWdnYWJsZSApIHtcbiAgICB0aGlzLmVsZW1lbnQuY2xhc3NMaXN0LmFkZCgnaXMtZHJhZ2dhYmxlJyk7XG4gIH0gZWxzZSB7XG4gICAgdGhpcy5lbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoJ2lzLWRyYWdnYWJsZScpO1xuICB9XG59O1xuXG4vLyBiYWNrd2FyZHMgY29tcGF0aWJpbGl0eVxucHJvdG8uYmluZERyYWcgPSBmdW5jdGlvbigpIHtcbiAgdGhpcy5vcHRpb25zLmRyYWdnYWJsZSA9IHRydWU7XG4gIHRoaXMudXBkYXRlRHJhZ2dhYmxlKCk7XG59O1xuXG5wcm90by51bmJpbmREcmFnID0gZnVuY3Rpb24oKSB7XG4gIHRoaXMub3B0aW9ucy5kcmFnZ2FibGUgPSBmYWxzZTtcbiAgdGhpcy51cGRhdGVEcmFnZ2FibGUoKTtcbn07XG5cbnByb3RvLl91aUNoYW5nZURyYWcgPSBmdW5jdGlvbigpIHtcbiAgZGVsZXRlIHRoaXMuaXNGcmVlU2Nyb2xsaW5nO1xufTtcblxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gcG9pbnRlciBldmVudHMgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gLy9cblxucHJvdG8ucG9pbnRlckRvd24gPSBmdW5jdGlvbiggZXZlbnQsIHBvaW50ZXIgKSB7XG4gIGlmICggIXRoaXMuaXNEcmFnZ2FibGUgKSB7XG4gICAgdGhpcy5fcG9pbnRlckRvd25EZWZhdWx0KCBldmVudCwgcG9pbnRlciApO1xuICAgIHJldHVybjtcbiAgfVxuICB2YXIgaXNPa2F5ID0gdGhpcy5va2F5UG9pbnRlckRvd24oIGV2ZW50ICk7XG4gIGlmICggIWlzT2theSApIHtcbiAgICByZXR1cm47XG4gIH1cblxuICB0aGlzLl9wb2ludGVyRG93blByZXZlbnREZWZhdWx0KCBldmVudCApO1xuICB0aGlzLnBvaW50ZXJEb3duRm9jdXMoIGV2ZW50ICk7XG4gIC8vIGJsdXJcbiAgaWYgKCBkb2N1bWVudC5hY3RpdmVFbGVtZW50ICE9IHRoaXMuZWxlbWVudCApIHtcbiAgICAvLyBkbyBub3QgYmx1ciBpZiBhbHJlYWR5IGZvY3VzZWRcbiAgICB0aGlzLnBvaW50ZXJEb3duQmx1cigpO1xuICB9XG5cbiAgLy8gc3RvcCBpZiBpdCB3YXMgbW92aW5nXG4gIHRoaXMuZHJhZ1ggPSB0aGlzLng7XG4gIHRoaXMudmlld3BvcnQuY2xhc3NMaXN0LmFkZCgnaXMtcG9pbnRlci1kb3duJyk7XG4gIC8vIHRyYWNrIHNjcm9sbGluZ1xuICB0aGlzLnBvaW50ZXJEb3duU2Nyb2xsID0gZ2V0U2Nyb2xsUG9zaXRpb24oKTtcbiAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoICdzY3JvbGwnLCB0aGlzICk7XG5cbiAgdGhpcy5fcG9pbnRlckRvd25EZWZhdWx0KCBldmVudCwgcG9pbnRlciApO1xufTtcblxuLy8gZGVmYXVsdCBwb2ludGVyRG93biBsb2dpYywgdXNlZCBmb3Igc3RhdGljQ2xpY2tcbnByb3RvLl9wb2ludGVyRG93bkRlZmF1bHQgPSBmdW5jdGlvbiggZXZlbnQsIHBvaW50ZXIgKSB7XG4gIC8vIHRyYWNrIHN0YXJ0IGV2ZW50IHBvc2l0aW9uXG4gIC8vIFNhZmFyaSA5IG92ZXJyaWRlcyBwYWdlWCBhbmQgcGFnZVkuIFRoZXNlIHZhbHVlcyBuZWVkcyB0byBiZSBjb3BpZWQuICM3NzlcbiAgdGhpcy5wb2ludGVyRG93blBvaW50ZXIgPSB7XG4gICAgcGFnZVg6IHBvaW50ZXIucGFnZVgsXG4gICAgcGFnZVk6IHBvaW50ZXIucGFnZVksXG4gIH07XG4gIC8vIGJpbmQgbW92ZSBhbmQgZW5kIGV2ZW50c1xuICB0aGlzLl9iaW5kUG9zdFN0YXJ0RXZlbnRzKCBldmVudCApO1xuICB0aGlzLmRpc3BhdGNoRXZlbnQoICdwb2ludGVyRG93bicsIGV2ZW50LCBbIHBvaW50ZXIgXSApO1xufTtcblxudmFyIGZvY3VzTm9kZXMgPSB7XG4gIElOUFVUOiB0cnVlLFxuICBURVhUQVJFQTogdHJ1ZSxcbiAgU0VMRUNUOiB0cnVlLFxufTtcblxucHJvdG8ucG9pbnRlckRvd25Gb2N1cyA9IGZ1bmN0aW9uKCBldmVudCApIHtcbiAgdmFyIGlzRm9jdXNOb2RlID0gZm9jdXNOb2Rlc1sgZXZlbnQudGFyZ2V0Lm5vZGVOYW1lIF07XG4gIGlmICggIWlzRm9jdXNOb2RlICkge1xuICAgIHRoaXMuZm9jdXMoKTtcbiAgfVxufTtcblxucHJvdG8uX3BvaW50ZXJEb3duUHJldmVudERlZmF1bHQgPSBmdW5jdGlvbiggZXZlbnQgKSB7XG4gIHZhciBpc1RvdWNoU3RhcnQgPSBldmVudC50eXBlID09ICd0b3VjaHN0YXJ0JztcbiAgdmFyIGlzVG91Y2hQb2ludGVyID0gZXZlbnQucG9pbnRlclR5cGUgPT0gJ3RvdWNoJztcbiAgdmFyIGlzRm9jdXNOb2RlID0gZm9jdXNOb2Rlc1sgZXZlbnQudGFyZ2V0Lm5vZGVOYW1lIF07XG4gIGlmICggIWlzVG91Y2hTdGFydCAmJiAhaXNUb3VjaFBvaW50ZXIgJiYgIWlzRm9jdXNOb2RlICkge1xuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gIH1cbn07XG5cbi8vIC0tLS0tIG1vdmUgLS0tLS0gLy9cblxucHJvdG8uaGFzRHJhZ1N0YXJ0ZWQgPSBmdW5jdGlvbiggbW92ZVZlY3RvciApIHtcbiAgcmV0dXJuIE1hdGguYWJzKCBtb3ZlVmVjdG9yLnggKSA+IHRoaXMub3B0aW9ucy5kcmFnVGhyZXNob2xkO1xufTtcblxuLy8gLS0tLS0gdXAgLS0tLS0gLy9cblxucHJvdG8ucG9pbnRlclVwID0gZnVuY3Rpb24oIGV2ZW50LCBwb2ludGVyICkge1xuICBkZWxldGUgdGhpcy5pc1RvdWNoU2Nyb2xsaW5nO1xuICB0aGlzLnZpZXdwb3J0LmNsYXNzTGlzdC5yZW1vdmUoJ2lzLXBvaW50ZXItZG93bicpO1xuICB0aGlzLmRpc3BhdGNoRXZlbnQoICdwb2ludGVyVXAnLCBldmVudCwgWyBwb2ludGVyIF0gKTtcbiAgdGhpcy5fZHJhZ1BvaW50ZXJVcCggZXZlbnQsIHBvaW50ZXIgKTtcbn07XG5cbnByb3RvLnBvaW50ZXJEb25lID0gZnVuY3Rpb24oKSB7XG4gIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCAnc2Nyb2xsJywgdGhpcyApO1xuICBkZWxldGUgdGhpcy5wb2ludGVyRG93blNjcm9sbDtcbn07XG5cbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tIGRyYWdnaW5nIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tIC8vXG5cbnByb3RvLmRyYWdTdGFydCA9IGZ1bmN0aW9uKCBldmVudCwgcG9pbnRlciApIHtcbiAgaWYgKCAhdGhpcy5pc0RyYWdnYWJsZSApIHtcbiAgICByZXR1cm47XG4gIH1cbiAgdGhpcy5kcmFnU3RhcnRQb3NpdGlvbiA9IHRoaXMueDtcbiAgdGhpcy5zdGFydEFuaW1hdGlvbigpO1xuICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lciggJ3Njcm9sbCcsIHRoaXMgKTtcbiAgdGhpcy5kaXNwYXRjaEV2ZW50KCAnZHJhZ1N0YXJ0JywgZXZlbnQsIFsgcG9pbnRlciBdICk7XG59O1xuXG5wcm90by5wb2ludGVyTW92ZSA9IGZ1bmN0aW9uKCBldmVudCwgcG9pbnRlciApIHtcbiAgdmFyIG1vdmVWZWN0b3IgPSB0aGlzLl9kcmFnUG9pbnRlck1vdmUoIGV2ZW50LCBwb2ludGVyICk7XG4gIHRoaXMuZGlzcGF0Y2hFdmVudCggJ3BvaW50ZXJNb3ZlJywgZXZlbnQsIFsgcG9pbnRlciwgbW92ZVZlY3RvciBdICk7XG4gIHRoaXMuX2RyYWdNb3ZlKCBldmVudCwgcG9pbnRlciwgbW92ZVZlY3RvciApO1xufTtcblxucHJvdG8uZHJhZ01vdmUgPSBmdW5jdGlvbiggZXZlbnQsIHBvaW50ZXIsIG1vdmVWZWN0b3IgKSB7XG4gIGlmICggIXRoaXMuaXNEcmFnZ2FibGUgKSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cbiAgdGhpcy5wcmV2aW91c0RyYWdYID0gdGhpcy5kcmFnWDtcbiAgLy8gcmV2ZXJzZSBpZiByaWdodC10by1sZWZ0XG4gIHZhciBkaXJlY3Rpb24gPSB0aGlzLm9wdGlvbnMucmlnaHRUb0xlZnQgPyAtMSA6IDE7XG4gIGlmICggdGhpcy5vcHRpb25zLndyYXBBcm91bmQgKSB7XG4gICAgLy8gd3JhcCBhcm91bmQgbW92ZS4gIzU4OVxuICAgIG1vdmVWZWN0b3IueCA9IG1vdmVWZWN0b3IueCAlIHRoaXMuc2xpZGVhYmxlV2lkdGg7XG4gIH1cbiAgdmFyIGRyYWdYID0gdGhpcy5kcmFnU3RhcnRQb3NpdGlvbiArIG1vdmVWZWN0b3IueCAqIGRpcmVjdGlvbjtcblxuICBpZiAoICF0aGlzLm9wdGlvbnMud3JhcEFyb3VuZCAmJiB0aGlzLnNsaWRlcy5sZW5ndGggKSB7XG4gICAgLy8gc2xvdyBkcmFnXG4gICAgdmFyIG9yaWdpbkJvdW5kID0gTWF0aC5tYXgoIC10aGlzLnNsaWRlc1swXS50YXJnZXQsIHRoaXMuZHJhZ1N0YXJ0UG9zaXRpb24gKTtcbiAgICBkcmFnWCA9IGRyYWdYID4gb3JpZ2luQm91bmQgPyAoIGRyYWdYICsgb3JpZ2luQm91bmQgKSAqIDAuNSA6IGRyYWdYO1xuICAgIHZhciBlbmRCb3VuZCA9IE1hdGgubWluKCAtdGhpcy5nZXRMYXN0U2xpZGUoKS50YXJnZXQsIHRoaXMuZHJhZ1N0YXJ0UG9zaXRpb24gKTtcbiAgICBkcmFnWCA9IGRyYWdYIDwgZW5kQm91bmQgPyAoIGRyYWdYICsgZW5kQm91bmQgKSAqIDAuNSA6IGRyYWdYO1xuICB9XG5cbiAgdGhpcy5kcmFnWCA9IGRyYWdYO1xuXG4gIHRoaXMuZHJhZ01vdmVUaW1lID0gbmV3IERhdGUoKTtcbiAgdGhpcy5kaXNwYXRjaEV2ZW50KCAnZHJhZ01vdmUnLCBldmVudCwgWyBwb2ludGVyLCBtb3ZlVmVjdG9yIF0gKTtcbn07XG5cbnByb3RvLmRyYWdFbmQgPSBmdW5jdGlvbiggZXZlbnQsIHBvaW50ZXIgKSB7XG4gIGlmICggIXRoaXMuaXNEcmFnZ2FibGUgKSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIGlmICggdGhpcy5vcHRpb25zLmZyZWVTY3JvbGwgKSB7XG4gICAgdGhpcy5pc0ZyZWVTY3JvbGxpbmcgPSB0cnVlO1xuICB9XG4gIC8vIHNldCBzZWxlY3RlZEluZGV4IGJhc2VkIG9uIHdoZXJlIGZsaWNrIHdpbGwgZW5kIHVwXG4gIHZhciBpbmRleCA9IHRoaXMuZHJhZ0VuZFJlc3RpbmdTZWxlY3QoKTtcblxuICBpZiAoIHRoaXMub3B0aW9ucy5mcmVlU2Nyb2xsICYmICF0aGlzLm9wdGlvbnMud3JhcEFyb3VuZCApIHtcbiAgICAvLyBpZiBmcmVlLXNjcm9sbCAmIG5vdCB3cmFwIGFyb3VuZFxuICAgIC8vIGRvIG5vdCBmcmVlLXNjcm9sbCBpZiBnb2luZyBvdXRzaWRlIG9mIGJvdW5kaW5nIHNsaWRlc1xuICAgIC8vIHNvIGJvdW5kaW5nIHNsaWRlcyBjYW4gYXR0cmFjdCBzbGlkZXIsIGFuZCBrZWVwIGl0IGluIGJvdW5kc1xuICAgIHZhciByZXN0aW5nWCA9IHRoaXMuZ2V0UmVzdGluZ1Bvc2l0aW9uKCk7XG4gICAgdGhpcy5pc0ZyZWVTY3JvbGxpbmcgPSAtcmVzdGluZ1ggPiB0aGlzLnNsaWRlc1swXS50YXJnZXQgJiZcbiAgICAgIC1yZXN0aW5nWCA8IHRoaXMuZ2V0TGFzdFNsaWRlKCkudGFyZ2V0O1xuICB9IGVsc2UgaWYgKCAhdGhpcy5vcHRpb25zLmZyZWVTY3JvbGwgJiYgaW5kZXggPT0gdGhpcy5zZWxlY3RlZEluZGV4ICkge1xuICAgIC8vIGJvb3N0IHNlbGVjdGlvbiBpZiBzZWxlY3RlZCBpbmRleCBoYXMgbm90IGNoYW5nZWRcbiAgICBpbmRleCArPSB0aGlzLmRyYWdFbmRCb29zdFNlbGVjdCgpO1xuICB9XG4gIGRlbGV0ZSB0aGlzLnByZXZpb3VzRHJhZ1g7XG4gIC8vIGFwcGx5IHNlbGVjdGlvblxuICAvLyBUT0RPIHJlZmFjdG9yIHRoaXMsIHNlbGVjdGluZyBoZXJlIGZlZWxzIHdlaXJkXG4gIC8vIEhBQ0ssIHNldCBmbGFnIHNvIGRyYWdnaW5nIHN0YXlzIGluIGNvcnJlY3QgZGlyZWN0aW9uXG4gIHRoaXMuaXNEcmFnU2VsZWN0ID0gdGhpcy5vcHRpb25zLndyYXBBcm91bmQ7XG4gIHRoaXMuc2VsZWN0KCBpbmRleCApO1xuICBkZWxldGUgdGhpcy5pc0RyYWdTZWxlY3Q7XG4gIHRoaXMuZGlzcGF0Y2hFdmVudCggJ2RyYWdFbmQnLCBldmVudCwgWyBwb2ludGVyIF0gKTtcbn07XG5cbnByb3RvLmRyYWdFbmRSZXN0aW5nU2VsZWN0ID0gZnVuY3Rpb24oKSB7XG4gIHZhciByZXN0aW5nWCA9IHRoaXMuZ2V0UmVzdGluZ1Bvc2l0aW9uKCk7XG4gIC8vIGhvdyBmYXIgYXdheSBmcm9tIHNlbGVjdGVkIHNsaWRlXG4gIHZhciBkaXN0YW5jZSA9IE1hdGguYWJzKCB0aGlzLmdldFNsaWRlRGlzdGFuY2UoIC1yZXN0aW5nWCwgdGhpcy5zZWxlY3RlZEluZGV4ICkgKTtcbiAgLy8gZ2V0IGNsb3NldCByZXN0aW5nIGdvaW5nIHVwIGFuZCBnb2luZyBkb3duXG4gIHZhciBwb3NpdGl2ZVJlc3RpbmcgPSB0aGlzLl9nZXRDbG9zZXN0UmVzdGluZyggcmVzdGluZ1gsIGRpc3RhbmNlLCAxICk7XG4gIHZhciBuZWdhdGl2ZVJlc3RpbmcgPSB0aGlzLl9nZXRDbG9zZXN0UmVzdGluZyggcmVzdGluZ1gsIGRpc3RhbmNlLCAtMSApO1xuICAvLyB1c2UgY2xvc2VyIHJlc3RpbmcgZm9yIHdyYXAtYXJvdW5kXG4gIHZhciBpbmRleCA9IHBvc2l0aXZlUmVzdGluZy5kaXN0YW5jZSA8IG5lZ2F0aXZlUmVzdGluZy5kaXN0YW5jZSA/XG4gICAgcG9zaXRpdmVSZXN0aW5nLmluZGV4IDogbmVnYXRpdmVSZXN0aW5nLmluZGV4O1xuICByZXR1cm4gaW5kZXg7XG59O1xuXG4vKipcbiAqIGdpdmVuIHJlc3RpbmcgWCBhbmQgZGlzdGFuY2UgdG8gc2VsZWN0ZWQgY2VsbFxuICogZ2V0IHRoZSBkaXN0YW5jZSBhbmQgaW5kZXggb2YgdGhlIGNsb3Nlc3QgY2VsbFxuICogQHBhcmFtIHtOdW1iZXJ9IHJlc3RpbmdYIC0gZXN0aW1hdGVkIHBvc3QtZmxpY2sgcmVzdGluZyBwb3NpdGlvblxuICogQHBhcmFtIHtOdW1iZXJ9IGRpc3RhbmNlIC0gZGlzdGFuY2UgdG8gc2VsZWN0ZWQgY2VsbFxuICogQHBhcmFtIHtJbnRlZ2VyfSBpbmNyZW1lbnQgLSArMSBvciAtMSwgZ29pbmcgdXAgb3IgZG93blxuICogQHJldHVybnMge09iamVjdH0gLSB7IGRpc3RhbmNlOiB7TnVtYmVyfSwgaW5kZXg6IHtJbnRlZ2VyfSB9XG4gKi9cbnByb3RvLl9nZXRDbG9zZXN0UmVzdGluZyA9IGZ1bmN0aW9uKCByZXN0aW5nWCwgZGlzdGFuY2UsIGluY3JlbWVudCApIHtcbiAgdmFyIGluZGV4ID0gdGhpcy5zZWxlY3RlZEluZGV4O1xuICB2YXIgbWluRGlzdGFuY2UgPSBJbmZpbml0eTtcbiAgdmFyIGNvbmRpdGlvbiA9IHRoaXMub3B0aW9ucy5jb250YWluICYmICF0aGlzLm9wdGlvbnMud3JhcEFyb3VuZCA/XG4gICAgLy8gaWYgY29udGFpbiwga2VlcCBnb2luZyBpZiBkaXN0YW5jZSBpcyBlcXVhbCB0byBtaW5EaXN0YW5jZVxuICAgIGZ1bmN0aW9uKCBkLCBtZCApIHsgcmV0dXJuIGQgPD0gbWQ7IH0gOiBmdW5jdGlvbiggZCwgbWQgKSB7IHJldHVybiBkIDwgbWQ7IH07XG4gIHdoaWxlICggY29uZGl0aW9uKCBkaXN0YW5jZSwgbWluRGlzdGFuY2UgKSApIHtcbiAgICAvLyBtZWFzdXJlIGRpc3RhbmNlIHRvIG5leHQgY2VsbFxuICAgIGluZGV4ICs9IGluY3JlbWVudDtcbiAgICBtaW5EaXN0YW5jZSA9IGRpc3RhbmNlO1xuICAgIGRpc3RhbmNlID0gdGhpcy5nZXRTbGlkZURpc3RhbmNlKCAtcmVzdGluZ1gsIGluZGV4ICk7XG4gICAgaWYgKCBkaXN0YW5jZSA9PT0gbnVsbCApIHtcbiAgICAgIGJyZWFrO1xuICAgIH1cbiAgICBkaXN0YW5jZSA9IE1hdGguYWJzKCBkaXN0YW5jZSApO1xuICB9XG4gIHJldHVybiB7XG4gICAgZGlzdGFuY2U6IG1pbkRpc3RhbmNlLFxuICAgIC8vIHNlbGVjdGVkIHdhcyBwcmV2aW91cyBpbmRleFxuICAgIGluZGV4OiBpbmRleCAtIGluY3JlbWVudFxuICB9O1xufTtcblxuLyoqXG4gKiBtZWFzdXJlIGRpc3RhbmNlIGJldHdlZW4geCBhbmQgYSBzbGlkZSB0YXJnZXRcbiAqIEBwYXJhbSB7TnVtYmVyfSB4XG4gKiBAcGFyYW0ge0ludGVnZXJ9IGluZGV4IC0gc2xpZGUgaW5kZXhcbiAqL1xucHJvdG8uZ2V0U2xpZGVEaXN0YW5jZSA9IGZ1bmN0aW9uKCB4LCBpbmRleCApIHtcbiAgdmFyIGxlbiA9IHRoaXMuc2xpZGVzLmxlbmd0aDtcbiAgLy8gd3JhcCBhcm91bmQgaWYgYXQgbGVhc3QgMiBzbGlkZXNcbiAgdmFyIGlzV3JhcEFyb3VuZCA9IHRoaXMub3B0aW9ucy53cmFwQXJvdW5kICYmIGxlbiA+IDE7XG4gIHZhciBzbGlkZUluZGV4ID0gaXNXcmFwQXJvdW5kID8gdXRpbHMubW9kdWxvKCBpbmRleCwgbGVuICkgOiBpbmRleDtcbiAgdmFyIHNsaWRlID0gdGhpcy5zbGlkZXNbIHNsaWRlSW5kZXggXTtcbiAgaWYgKCAhc2xpZGUgKSB7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cbiAgLy8gYWRkIGRpc3RhbmNlIGZvciB3cmFwLWFyb3VuZCBzbGlkZXNcbiAgdmFyIHdyYXAgPSBpc1dyYXBBcm91bmQgPyB0aGlzLnNsaWRlYWJsZVdpZHRoICogTWF0aC5mbG9vciggaW5kZXggLyBsZW4gKSA6IDA7XG4gIHJldHVybiB4IC0gKCBzbGlkZS50YXJnZXQgKyB3cmFwICk7XG59O1xuXG5wcm90by5kcmFnRW5kQm9vc3RTZWxlY3QgPSBmdW5jdGlvbigpIHtcbiAgLy8gZG8gbm90IGJvb3N0IGlmIG5vIHByZXZpb3VzRHJhZ1ggb3IgZHJhZ01vdmVUaW1lXG4gIGlmICggdGhpcy5wcmV2aW91c0RyYWdYID09PSB1bmRlZmluZWQgfHwgIXRoaXMuZHJhZ01vdmVUaW1lIHx8XG4gICAgLy8gb3IgaWYgZHJhZyB3YXMgaGVsZCBmb3IgMTAwIG1zXG4gICAgbmV3IERhdGUoKSAtIHRoaXMuZHJhZ01vdmVUaW1lID4gMTAwICkge1xuICAgIHJldHVybiAwO1xuICB9XG5cbiAgdmFyIGRpc3RhbmNlID0gdGhpcy5nZXRTbGlkZURpc3RhbmNlKCAtdGhpcy5kcmFnWCwgdGhpcy5zZWxlY3RlZEluZGV4ICk7XG4gIHZhciBkZWx0YSA9IHRoaXMucHJldmlvdXNEcmFnWCAtIHRoaXMuZHJhZ1g7XG4gIGlmICggZGlzdGFuY2UgPiAwICYmIGRlbHRhID4gMCApIHtcbiAgICAvLyBib29zdCB0byBuZXh0IGlmIG1vdmluZyB0b3dhcmRzIHRoZSByaWdodCwgYW5kIHBvc2l0aXZlIHZlbG9jaXR5XG4gICAgcmV0dXJuIDE7XG4gIH0gZWxzZSBpZiAoIGRpc3RhbmNlIDwgMCAmJiBkZWx0YSA8IDAgKSB7XG4gICAgLy8gYm9vc3QgdG8gcHJldmlvdXMgaWYgbW92aW5nIHRvd2FyZHMgdGhlIGxlZnQsIGFuZCBuZWdhdGl2ZSB2ZWxvY2l0eVxuICAgIHJldHVybiAtMTtcbiAgfVxuICByZXR1cm4gMDtcbn07XG5cbi8vIC0tLS0tIHN0YXRpY0NsaWNrIC0tLS0tIC8vXG5cbnByb3RvLnN0YXRpY0NsaWNrID0gZnVuY3Rpb24oIGV2ZW50LCBwb2ludGVyICkge1xuICAvLyBnZXQgY2xpY2tlZENlbGwsIGlmIGNlbGwgd2FzIGNsaWNrZWRcbiAgdmFyIGNsaWNrZWRDZWxsID0gdGhpcy5nZXRQYXJlbnRDZWxsKCBldmVudC50YXJnZXQgKTtcbiAgdmFyIGNlbGxFbGVtID0gY2xpY2tlZENlbGwgJiYgY2xpY2tlZENlbGwuZWxlbWVudDtcbiAgdmFyIGNlbGxJbmRleCA9IGNsaWNrZWRDZWxsICYmIHRoaXMuY2VsbHMuaW5kZXhPZiggY2xpY2tlZENlbGwgKTtcbiAgdGhpcy5kaXNwYXRjaEV2ZW50KCAnc3RhdGljQ2xpY2snLCBldmVudCwgWyBwb2ludGVyLCBjZWxsRWxlbSwgY2VsbEluZGV4IF0gKTtcbn07XG5cbi8vIC0tLS0tIHNjcm9sbCAtLS0tLSAvL1xuXG5wcm90by5vbnNjcm9sbCA9IGZ1bmN0aW9uKCkge1xuICB2YXIgc2Nyb2xsID0gZ2V0U2Nyb2xsUG9zaXRpb24oKTtcbiAgdmFyIHNjcm9sbE1vdmVYID0gdGhpcy5wb2ludGVyRG93blNjcm9sbC54IC0gc2Nyb2xsLng7XG4gIHZhciBzY3JvbGxNb3ZlWSA9IHRoaXMucG9pbnRlckRvd25TY3JvbGwueSAtIHNjcm9sbC55O1xuICAvLyBjYW5jZWwgY2xpY2svdGFwIGlmIHNjcm9sbCBpcyB0b28gbXVjaFxuICBpZiAoIE1hdGguYWJzKCBzY3JvbGxNb3ZlWCApID4gMyB8fCBNYXRoLmFicyggc2Nyb2xsTW92ZVkgKSA+IDMgKSB7XG4gICAgdGhpcy5fcG9pbnRlckRvbmUoKTtcbiAgfVxufTtcblxuLy8gLS0tLS0gdXRpbHMgLS0tLS0gLy9cblxuZnVuY3Rpb24gZ2V0U2Nyb2xsUG9zaXRpb24oKSB7XG4gIHJldHVybiB7XG4gICAgeDogd2luZG93LnBhZ2VYT2Zmc2V0LFxuICAgIHk6IHdpbmRvdy5wYWdlWU9mZnNldFxuICB9O1xufVxuXG4vLyAtLS0tLSAgLS0tLS0gLy9cblxucmV0dXJuIEZsaWNraXR5O1xuXG59KSk7XG4iLCIvLyBGbGlja2l0eSBtYWluXG4oIGZ1bmN0aW9uKCB3aW5kb3csIGZhY3RvcnkgKSB7XG4gIC8vIHVuaXZlcnNhbCBtb2R1bGUgZGVmaW5pdGlvblxuICAvKiBqc2hpbnQgc3RyaWN0OiBmYWxzZSAqL1xuICBpZiAoIHR5cGVvZiBkZWZpbmUgPT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kICkge1xuICAgIC8vIEFNRFxuICAgIGRlZmluZSggW1xuICAgICAgJ2V2LWVtaXR0ZXIvZXYtZW1pdHRlcicsXG4gICAgICAnZ2V0LXNpemUvZ2V0LXNpemUnLFxuICAgICAgJ2Zpenp5LXVpLXV0aWxzL3V0aWxzJyxcbiAgICAgICcuL2NlbGwnLFxuICAgICAgJy4vc2xpZGUnLFxuICAgICAgJy4vYW5pbWF0ZSdcbiAgICBdLCBmdW5jdGlvbiggRXZFbWl0dGVyLCBnZXRTaXplLCB1dGlscywgQ2VsbCwgU2xpZGUsIGFuaW1hdGVQcm90b3R5cGUgKSB7XG4gICAgICByZXR1cm4gZmFjdG9yeSggd2luZG93LCBFdkVtaXR0ZXIsIGdldFNpemUsIHV0aWxzLCBDZWxsLCBTbGlkZSwgYW5pbWF0ZVByb3RvdHlwZSApO1xuICAgIH0pO1xuICB9IGVsc2UgaWYgKCB0eXBlb2YgbW9kdWxlID09ICdvYmplY3QnICYmIG1vZHVsZS5leHBvcnRzICkge1xuICAgIC8vIENvbW1vbkpTXG4gICAgbW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KFxuICAgICAgd2luZG93LFxuICAgICAgcmVxdWlyZSgnZXYtZW1pdHRlcicpLFxuICAgICAgcmVxdWlyZSgnZ2V0LXNpemUnKSxcbiAgICAgIHJlcXVpcmUoJ2Zpenp5LXVpLXV0aWxzJyksXG4gICAgICByZXF1aXJlKCcuL2NlbGwnKSxcbiAgICAgIHJlcXVpcmUoJy4vc2xpZGUnKSxcbiAgICAgIHJlcXVpcmUoJy4vYW5pbWF0ZScpXG4gICAgKTtcbiAgfSBlbHNlIHtcbiAgICAvLyBicm93c2VyIGdsb2JhbFxuICAgIHZhciBfRmxpY2tpdHkgPSB3aW5kb3cuRmxpY2tpdHk7XG5cbiAgICB3aW5kb3cuRmxpY2tpdHkgPSBmYWN0b3J5KFxuICAgICAgd2luZG93LFxuICAgICAgd2luZG93LkV2RW1pdHRlcixcbiAgICAgIHdpbmRvdy5nZXRTaXplLFxuICAgICAgd2luZG93LmZpenp5VUlVdGlscyxcbiAgICAgIF9GbGlja2l0eS5DZWxsLFxuICAgICAgX0ZsaWNraXR5LlNsaWRlLFxuICAgICAgX0ZsaWNraXR5LmFuaW1hdGVQcm90b3R5cGVcbiAgICApO1xuICB9XG5cbn0oIHdpbmRvdywgZnVuY3Rpb24gZmFjdG9yeSggd2luZG93LCBFdkVtaXR0ZXIsIGdldFNpemUsXG4gIHV0aWxzLCBDZWxsLCBTbGlkZSwgYW5pbWF0ZVByb3RvdHlwZSApIHtcblxuJ3VzZSBzdHJpY3QnO1xuXG4vLyB2YXJzXG52YXIgalF1ZXJ5ID0gd2luZG93LmpRdWVyeTtcbnZhciBnZXRDb21wdXRlZFN0eWxlID0gd2luZG93LmdldENvbXB1dGVkU3R5bGU7XG52YXIgY29uc29sZSA9IHdpbmRvdy5jb25zb2xlO1xuXG5mdW5jdGlvbiBtb3ZlRWxlbWVudHMoIGVsZW1zLCB0b0VsZW0gKSB7XG4gIGVsZW1zID0gdXRpbHMubWFrZUFycmF5KCBlbGVtcyApO1xuICB3aGlsZSAoIGVsZW1zLmxlbmd0aCApIHtcbiAgICB0b0VsZW0uYXBwZW5kQ2hpbGQoIGVsZW1zLnNoaWZ0KCkgKTtcbiAgfVxufVxuXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSBGbGlja2l0eSAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAvL1xuXG4vLyBnbG9iYWxseSB1bmlxdWUgaWRlbnRpZmllcnNcbnZhciBHVUlEID0gMDtcbi8vIGludGVybmFsIHN0b3JlIG9mIGFsbCBGbGlja2l0eSBpbnRhbmNlc1xudmFyIGluc3RhbmNlcyA9IHt9O1xuXG5mdW5jdGlvbiBGbGlja2l0eSggZWxlbWVudCwgb3B0aW9ucyApIHtcbiAgdmFyIHF1ZXJ5RWxlbWVudCA9IHV0aWxzLmdldFF1ZXJ5RWxlbWVudCggZWxlbWVudCApO1xuICBpZiAoICFxdWVyeUVsZW1lbnQgKSB7XG4gICAgaWYgKCBjb25zb2xlICkge1xuICAgICAgY29uc29sZS5lcnJvciggJ0JhZCBlbGVtZW50IGZvciBGbGlja2l0eTogJyArICggcXVlcnlFbGVtZW50IHx8IGVsZW1lbnQgKSApO1xuICAgIH1cbiAgICByZXR1cm47XG4gIH1cbiAgdGhpcy5lbGVtZW50ID0gcXVlcnlFbGVtZW50O1xuICAvLyBkbyBub3QgaW5pdGlhbGl6ZSB0d2ljZSBvbiBzYW1lIGVsZW1lbnRcbiAgaWYgKCB0aGlzLmVsZW1lbnQuZmxpY2tpdHlHVUlEICkge1xuICAgIHZhciBpbnN0YW5jZSA9IGluc3RhbmNlc1sgdGhpcy5lbGVtZW50LmZsaWNraXR5R1VJRCBdO1xuICAgIGluc3RhbmNlLm9wdGlvbiggb3B0aW9ucyApO1xuICAgIHJldHVybiBpbnN0YW5jZTtcbiAgfVxuXG4gIC8vIGFkZCBqUXVlcnlcbiAgaWYgKCBqUXVlcnkgKSB7XG4gICAgdGhpcy4kZWxlbWVudCA9IGpRdWVyeSggdGhpcy5lbGVtZW50ICk7XG4gIH1cbiAgLy8gb3B0aW9uc1xuICB0aGlzLm9wdGlvbnMgPSB1dGlscy5leHRlbmQoIHt9LCB0aGlzLmNvbnN0cnVjdG9yLmRlZmF1bHRzICk7XG4gIHRoaXMub3B0aW9uKCBvcHRpb25zICk7XG5cbiAgLy8ga2ljayB0aGluZ3Mgb2ZmXG4gIHRoaXMuX2NyZWF0ZSgpO1xufVxuXG5GbGlja2l0eS5kZWZhdWx0cyA9IHtcbiAgYWNjZXNzaWJpbGl0eTogdHJ1ZSxcbiAgLy8gYWRhcHRpdmVIZWlnaHQ6IGZhbHNlLFxuICBjZWxsQWxpZ246ICdjZW50ZXInLFxuICAvLyBjZWxsU2VsZWN0b3I6IHVuZGVmaW5lZCxcbiAgLy8gY29udGFpbjogZmFsc2UsXG4gIGZyZWVTY3JvbGxGcmljdGlvbjogMC4wNzUsIC8vIGZyaWN0aW9uIHdoZW4gZnJlZS1zY3JvbGxpbmdcbiAgZnJpY3Rpb246IDAuMjgsIC8vIGZyaWN0aW9uIHdoZW4gc2VsZWN0aW5nXG4gIG5hbWVzcGFjZUpRdWVyeUV2ZW50czogdHJ1ZSxcbiAgLy8gaW5pdGlhbEluZGV4OiAwLFxuICBwZXJjZW50UG9zaXRpb246IHRydWUsXG4gIHJlc2l6ZTogdHJ1ZSxcbiAgc2VsZWN0ZWRBdHRyYWN0aW9uOiAwLjAyNSxcbiAgc2V0R2FsbGVyeVNpemU6IHRydWVcbiAgLy8gd2F0Y2hDU1M6IGZhbHNlLFxuICAvLyB3cmFwQXJvdW5kOiBmYWxzZVxufTtcblxuLy8gaGFzaCBvZiBtZXRob2RzIHRyaWdnZXJlZCBvbiBfY3JlYXRlKClcbkZsaWNraXR5LmNyZWF0ZU1ldGhvZHMgPSBbXTtcblxudmFyIHByb3RvID0gRmxpY2tpdHkucHJvdG90eXBlO1xuLy8gaW5oZXJpdCBFdmVudEVtaXR0ZXJcbnV0aWxzLmV4dGVuZCggcHJvdG8sIEV2RW1pdHRlci5wcm90b3R5cGUgKTtcblxucHJvdG8uX2NyZWF0ZSA9IGZ1bmN0aW9uKCkge1xuICAvLyBhZGQgaWQgZm9yIEZsaWNraXR5LmRhdGFcbiAgdmFyIGlkID0gdGhpcy5ndWlkID0gKytHVUlEO1xuICB0aGlzLmVsZW1lbnQuZmxpY2tpdHlHVUlEID0gaWQ7IC8vIGV4cGFuZG9cbiAgaW5zdGFuY2VzWyBpZCBdID0gdGhpczsgLy8gYXNzb2NpYXRlIHZpYSBpZFxuICAvLyBpbml0aWFsIHByb3BlcnRpZXNcbiAgdGhpcy5zZWxlY3RlZEluZGV4ID0gMDtcbiAgLy8gaG93IG1hbnkgZnJhbWVzIHNsaWRlciBoYXMgYmVlbiBpbiBzYW1lIHBvc2l0aW9uXG4gIHRoaXMucmVzdGluZ0ZyYW1lcyA9IDA7XG4gIC8vIGluaXRpYWwgcGh5c2ljcyBwcm9wZXJ0aWVzXG4gIHRoaXMueCA9IDA7XG4gIHRoaXMudmVsb2NpdHkgPSAwO1xuICB0aGlzLm9yaWdpblNpZGUgPSB0aGlzLm9wdGlvbnMucmlnaHRUb0xlZnQgPyAncmlnaHQnIDogJ2xlZnQnO1xuICAvLyBjcmVhdGUgdmlld3BvcnQgJiBzbGlkZXJcbiAgdGhpcy52aWV3cG9ydCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICB0aGlzLnZpZXdwb3J0LmNsYXNzTmFtZSA9ICdmbGlja2l0eS12aWV3cG9ydCc7XG4gIHRoaXMuX2NyZWF0ZVNsaWRlcigpO1xuXG4gIGlmICggdGhpcy5vcHRpb25zLnJlc2l6ZSB8fCB0aGlzLm9wdGlvbnMud2F0Y2hDU1MgKSB7XG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoICdyZXNpemUnLCB0aGlzICk7XG4gIH1cblxuICAvLyBhZGQgbGlzdGVuZXJzIGZyb20gb24gb3B0aW9uXG4gIGZvciAoIHZhciBldmVudE5hbWUgaW4gdGhpcy5vcHRpb25zLm9uICkge1xuICAgIHZhciBsaXN0ZW5lciA9IHRoaXMub3B0aW9ucy5vblsgZXZlbnROYW1lIF07XG4gICAgdGhpcy5vbiggZXZlbnROYW1lLCBsaXN0ZW5lciApO1xuICB9XG5cbiAgRmxpY2tpdHkuY3JlYXRlTWV0aG9kcy5mb3JFYWNoKCBmdW5jdGlvbiggbWV0aG9kICkge1xuICAgIHRoaXNbIG1ldGhvZCBdKCk7XG4gIH0sIHRoaXMgKTtcblxuICBpZiAoIHRoaXMub3B0aW9ucy53YXRjaENTUyApIHtcbiAgICB0aGlzLndhdGNoQ1NTKCk7XG4gIH0gZWxzZSB7XG4gICAgdGhpcy5hY3RpdmF0ZSgpO1xuICB9XG5cbn07XG5cbi8qKlxuICogc2V0IG9wdGlvbnNcbiAqIEBwYXJhbSB7T2JqZWN0fSBvcHRzXG4gKi9cbnByb3RvLm9wdGlvbiA9IGZ1bmN0aW9uKCBvcHRzICkge1xuICB1dGlscy5leHRlbmQoIHRoaXMub3B0aW9ucywgb3B0cyApO1xufTtcblxucHJvdG8uYWN0aXZhdGUgPSBmdW5jdGlvbigpIHtcbiAgaWYgKCB0aGlzLmlzQWN0aXZlICkge1xuICAgIHJldHVybjtcbiAgfVxuICB0aGlzLmlzQWN0aXZlID0gdHJ1ZTtcbiAgdGhpcy5lbGVtZW50LmNsYXNzTGlzdC5hZGQoJ2ZsaWNraXR5LWVuYWJsZWQnKTtcbiAgaWYgKCB0aGlzLm9wdGlvbnMucmlnaHRUb0xlZnQgKSB7XG4gICAgdGhpcy5lbGVtZW50LmNsYXNzTGlzdC5hZGQoJ2ZsaWNraXR5LXJ0bCcpO1xuICB9XG5cbiAgdGhpcy5nZXRTaXplKCk7XG4gIC8vIG1vdmUgaW5pdGlhbCBjZWxsIGVsZW1lbnRzIHNvIHRoZXkgY2FuIGJlIGxvYWRlZCBhcyBjZWxsc1xuICB2YXIgY2VsbEVsZW1zID0gdGhpcy5fZmlsdGVyRmluZENlbGxFbGVtZW50cyggdGhpcy5lbGVtZW50LmNoaWxkcmVuICk7XG4gIG1vdmVFbGVtZW50cyggY2VsbEVsZW1zLCB0aGlzLnNsaWRlciApO1xuICB0aGlzLnZpZXdwb3J0LmFwcGVuZENoaWxkKCB0aGlzLnNsaWRlciApO1xuICB0aGlzLmVsZW1lbnQuYXBwZW5kQ2hpbGQoIHRoaXMudmlld3BvcnQgKTtcbiAgLy8gZ2V0IGNlbGxzIGZyb20gY2hpbGRyZW5cbiAgdGhpcy5yZWxvYWRDZWxscygpO1xuXG4gIGlmICggdGhpcy5vcHRpb25zLmFjY2Vzc2liaWxpdHkgKSB7XG4gICAgLy8gYWxsb3cgZWxlbWVudCB0byBmb2N1c2FibGVcbiAgICB0aGlzLmVsZW1lbnQudGFiSW5kZXggPSAwO1xuICAgIC8vIGxpc3RlbiBmb3Iga2V5IHByZXNzZXNcbiAgICB0aGlzLmVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lciggJ2tleWRvd24nLCB0aGlzICk7XG4gIH1cblxuICB0aGlzLmVtaXRFdmVudCgnYWN0aXZhdGUnKTtcbiAgdGhpcy5zZWxlY3RJbml0aWFsSW5kZXgoKTtcbiAgLy8gZmxhZyBmb3IgaW5pdGlhbCBhY3RpdmF0aW9uLCBmb3IgdXNpbmcgaW5pdGlhbEluZGV4XG4gIHRoaXMuaXNJbml0QWN0aXZhdGVkID0gdHJ1ZTtcbiAgLy8gcmVhZHkgZXZlbnQuICM0OTNcbiAgdGhpcy5kaXNwYXRjaEV2ZW50KCdyZWFkeScpO1xufTtcblxuLy8gc2xpZGVyIHBvc2l0aW9ucyB0aGUgY2VsbHNcbnByb3RvLl9jcmVhdGVTbGlkZXIgPSBmdW5jdGlvbigpIHtcbiAgLy8gc2xpZGVyIGVsZW1lbnQgZG9lcyBhbGwgdGhlIHBvc2l0aW9uaW5nXG4gIHZhciBzbGlkZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgc2xpZGVyLmNsYXNzTmFtZSA9ICdmbGlja2l0eS1zbGlkZXInO1xuICBzbGlkZXIuc3R5bGVbIHRoaXMub3JpZ2luU2lkZSBdID0gMDtcbiAgdGhpcy5zbGlkZXIgPSBzbGlkZXI7XG59O1xuXG5wcm90by5fZmlsdGVyRmluZENlbGxFbGVtZW50cyA9IGZ1bmN0aW9uKCBlbGVtcyApIHtcbiAgcmV0dXJuIHV0aWxzLmZpbHRlckZpbmRFbGVtZW50cyggZWxlbXMsIHRoaXMub3B0aW9ucy5jZWxsU2VsZWN0b3IgKTtcbn07XG5cbi8vIGdvZXMgdGhyb3VnaCBhbGwgY2hpbGRyZW5cbnByb3RvLnJlbG9hZENlbGxzID0gZnVuY3Rpb24oKSB7XG4gIC8vIGNvbGxlY3Rpb24gb2YgaXRlbSBlbGVtZW50c1xuICB0aGlzLmNlbGxzID0gdGhpcy5fbWFrZUNlbGxzKCB0aGlzLnNsaWRlci5jaGlsZHJlbiApO1xuICB0aGlzLnBvc2l0aW9uQ2VsbHMoKTtcbiAgdGhpcy5fZ2V0V3JhcFNoaWZ0Q2VsbHMoKTtcbiAgdGhpcy5zZXRHYWxsZXJ5U2l6ZSgpO1xufTtcblxuLyoqXG4gKiB0dXJuIGVsZW1lbnRzIGludG8gRmxpY2tpdHkuQ2VsbHNcbiAqIEBwYXJhbSB7QXJyYXkgb3IgTm9kZUxpc3Qgb3IgSFRNTEVsZW1lbnR9IGVsZW1zXG4gKiBAcmV0dXJucyB7QXJyYXl9IGl0ZW1zIC0gY29sbGVjdGlvbiBvZiBuZXcgRmxpY2tpdHkgQ2VsbHNcbiAqL1xucHJvdG8uX21ha2VDZWxscyA9IGZ1bmN0aW9uKCBlbGVtcyApIHtcbiAgdmFyIGNlbGxFbGVtcyA9IHRoaXMuX2ZpbHRlckZpbmRDZWxsRWxlbWVudHMoIGVsZW1zICk7XG5cbiAgLy8gY3JlYXRlIG5ldyBGbGlja2l0eSBmb3IgY29sbGVjdGlvblxuICB2YXIgY2VsbHMgPSBjZWxsRWxlbXMubWFwKCBmdW5jdGlvbiggY2VsbEVsZW0gKSB7XG4gICAgcmV0dXJuIG5ldyBDZWxsKCBjZWxsRWxlbSwgdGhpcyApO1xuICB9LCB0aGlzICk7XG5cbiAgcmV0dXJuIGNlbGxzO1xufTtcblxucHJvdG8uZ2V0TGFzdENlbGwgPSBmdW5jdGlvbigpIHtcbiAgcmV0dXJuIHRoaXMuY2VsbHNbIHRoaXMuY2VsbHMubGVuZ3RoIC0gMSBdO1xufTtcblxucHJvdG8uZ2V0TGFzdFNsaWRlID0gZnVuY3Rpb24oKSB7XG4gIHJldHVybiB0aGlzLnNsaWRlc1sgdGhpcy5zbGlkZXMubGVuZ3RoIC0gMSBdO1xufTtcblxuLy8gcG9zaXRpb25zIGFsbCBjZWxsc1xucHJvdG8ucG9zaXRpb25DZWxscyA9IGZ1bmN0aW9uKCkge1xuICAvLyBzaXplIGFsbCBjZWxsc1xuICB0aGlzLl9zaXplQ2VsbHMoIHRoaXMuY2VsbHMgKTtcbiAgLy8gcG9zaXRpb24gYWxsIGNlbGxzXG4gIHRoaXMuX3Bvc2l0aW9uQ2VsbHMoIDAgKTtcbn07XG5cbi8qKlxuICogcG9zaXRpb24gY2VydGFpbiBjZWxsc1xuICogQHBhcmFtIHtJbnRlZ2VyfSBpbmRleCAtIHdoaWNoIGNlbGwgdG8gc3RhcnQgd2l0aFxuICovXG5wcm90by5fcG9zaXRpb25DZWxscyA9IGZ1bmN0aW9uKCBpbmRleCApIHtcbiAgaW5kZXggPSBpbmRleCB8fCAwO1xuICAvLyBhbHNvIG1lYXN1cmUgbWF4Q2VsbEhlaWdodFxuICAvLyBzdGFydCAwIGlmIHBvc2l0aW9uaW5nIGFsbCBjZWxsc1xuICB0aGlzLm1heENlbGxIZWlnaHQgPSBpbmRleCA/IHRoaXMubWF4Q2VsbEhlaWdodCB8fCAwIDogMDtcbiAgdmFyIGNlbGxYID0gMDtcbiAgLy8gZ2V0IGNlbGxYXG4gIGlmICggaW5kZXggPiAwICkge1xuICAgIHZhciBzdGFydENlbGwgPSB0aGlzLmNlbGxzWyBpbmRleCAtIDEgXTtcbiAgICBjZWxsWCA9IHN0YXJ0Q2VsbC54ICsgc3RhcnRDZWxsLnNpemUub3V0ZXJXaWR0aDtcbiAgfVxuICB2YXIgbGVuID0gdGhpcy5jZWxscy5sZW5ndGg7XG4gIGZvciAoIHZhciBpPWluZGV4OyBpIDwgbGVuOyBpKysgKSB7XG4gICAgdmFyIGNlbGwgPSB0aGlzLmNlbGxzW2ldO1xuICAgIGNlbGwuc2V0UG9zaXRpb24oIGNlbGxYICk7XG4gICAgY2VsbFggKz0gY2VsbC5zaXplLm91dGVyV2lkdGg7XG4gICAgdGhpcy5tYXhDZWxsSGVpZ2h0ID0gTWF0aC5tYXgoIGNlbGwuc2l6ZS5vdXRlckhlaWdodCwgdGhpcy5tYXhDZWxsSGVpZ2h0ICk7XG4gIH1cbiAgLy8ga2VlcCB0cmFjayBvZiBjZWxsWCBmb3Igd3JhcC1hcm91bmRcbiAgdGhpcy5zbGlkZWFibGVXaWR0aCA9IGNlbGxYO1xuICAvLyBzbGlkZXNcbiAgdGhpcy51cGRhdGVTbGlkZXMoKTtcbiAgLy8gY29udGFpbiBzbGlkZXMgdGFyZ2V0XG4gIHRoaXMuX2NvbnRhaW5TbGlkZXMoKTtcbiAgLy8gdXBkYXRlIHNsaWRlc1dpZHRoXG4gIHRoaXMuc2xpZGVzV2lkdGggPSBsZW4gPyB0aGlzLmdldExhc3RTbGlkZSgpLnRhcmdldCAtIHRoaXMuc2xpZGVzWzBdLnRhcmdldCA6IDA7XG59O1xuXG4vKipcbiAqIGNlbGwuZ2V0U2l6ZSgpIG9uIG11bHRpcGxlIGNlbGxzXG4gKiBAcGFyYW0ge0FycmF5fSBjZWxsc1xuICovXG5wcm90by5fc2l6ZUNlbGxzID0gZnVuY3Rpb24oIGNlbGxzICkge1xuICBjZWxscy5mb3JFYWNoKCBmdW5jdGlvbiggY2VsbCApIHtcbiAgICBjZWxsLmdldFNpemUoKTtcbiAgfSk7XG59O1xuXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gLy9cblxucHJvdG8udXBkYXRlU2xpZGVzID0gZnVuY3Rpb24oKSB7XG4gIHRoaXMuc2xpZGVzID0gW107XG4gIGlmICggIXRoaXMuY2VsbHMubGVuZ3RoICkge1xuICAgIHJldHVybjtcbiAgfVxuXG4gIHZhciBzbGlkZSA9IG5ldyBTbGlkZSggdGhpcyApO1xuICB0aGlzLnNsaWRlcy5wdXNoKCBzbGlkZSApO1xuICB2YXIgaXNPcmlnaW5MZWZ0ID0gdGhpcy5vcmlnaW5TaWRlID09ICdsZWZ0JztcbiAgdmFyIG5leHRNYXJnaW4gPSBpc09yaWdpbkxlZnQgPyAnbWFyZ2luUmlnaHQnIDogJ21hcmdpbkxlZnQnO1xuXG4gIHZhciBjYW5DZWxsRml0ID0gdGhpcy5fZ2V0Q2FuQ2VsbEZpdCgpO1xuXG4gIHRoaXMuY2VsbHMuZm9yRWFjaCggZnVuY3Rpb24oIGNlbGwsIGkgKSB7XG4gICAgLy8ganVzdCBhZGQgY2VsbCBpZiBmaXJzdCBjZWxsIGluIHNsaWRlXG4gICAgaWYgKCAhc2xpZGUuY2VsbHMubGVuZ3RoICkge1xuICAgICAgc2xpZGUuYWRkQ2VsbCggY2VsbCApO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHZhciBzbGlkZVdpZHRoID0gKCBzbGlkZS5vdXRlcldpZHRoIC0gc2xpZGUuZmlyc3RNYXJnaW4gKSArXG4gICAgICAoIGNlbGwuc2l6ZS5vdXRlcldpZHRoIC0gY2VsbC5zaXplWyBuZXh0TWFyZ2luIF0gKTtcblxuICAgIGlmICggY2FuQ2VsbEZpdC5jYWxsKCB0aGlzLCBpLCBzbGlkZVdpZHRoICkgKSB7XG4gICAgICBzbGlkZS5hZGRDZWxsKCBjZWxsICk7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIGRvZXNuJ3QgZml0LCBuZXcgc2xpZGVcbiAgICAgIHNsaWRlLnVwZGF0ZVRhcmdldCgpO1xuXG4gICAgICBzbGlkZSA9IG5ldyBTbGlkZSggdGhpcyApO1xuICAgICAgdGhpcy5zbGlkZXMucHVzaCggc2xpZGUgKTtcbiAgICAgIHNsaWRlLmFkZENlbGwoIGNlbGwgKTtcbiAgICB9XG4gIH0sIHRoaXMgKTtcbiAgLy8gbGFzdCBzbGlkZVxuICBzbGlkZS51cGRhdGVUYXJnZXQoKTtcbiAgLy8gdXBkYXRlIC5zZWxlY3RlZFNsaWRlXG4gIHRoaXMudXBkYXRlU2VsZWN0ZWRTbGlkZSgpO1xufTtcblxucHJvdG8uX2dldENhbkNlbGxGaXQgPSBmdW5jdGlvbigpIHtcbiAgdmFyIGdyb3VwQ2VsbHMgPSB0aGlzLm9wdGlvbnMuZ3JvdXBDZWxscztcbiAgaWYgKCAhZ3JvdXBDZWxscyApIHtcbiAgICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfTtcbiAgfSBlbHNlIGlmICggdHlwZW9mIGdyb3VwQ2VsbHMgPT0gJ251bWJlcicgKSB7XG4gICAgLy8gZ3JvdXAgYnkgbnVtYmVyLiAzIC0+IFswLDEsMl0sIFszLDQsNV0sIC4uLlxuICAgIHZhciBudW1iZXIgPSBwYXJzZUludCggZ3JvdXBDZWxscywgMTAgKTtcbiAgICByZXR1cm4gZnVuY3Rpb24oIGkgKSB7XG4gICAgICByZXR1cm4gKCBpICUgbnVtYmVyICkgIT09IDA7XG4gICAgfTtcbiAgfVxuICAvLyBkZWZhdWx0LCBncm91cCBieSB3aWR0aCBvZiBzbGlkZVxuICAvLyBwYXJzZSAnNzUlXG4gIHZhciBwZXJjZW50TWF0Y2ggPSB0eXBlb2YgZ3JvdXBDZWxscyA9PSAnc3RyaW5nJyAmJlxuICAgIGdyb3VwQ2VsbHMubWF0Y2goL14oXFxkKyklJC8pO1xuICB2YXIgcGVyY2VudCA9IHBlcmNlbnRNYXRjaCA/IHBhcnNlSW50KCBwZXJjZW50TWF0Y2hbMV0sIDEwICkgLyAxMDAgOiAxO1xuICByZXR1cm4gZnVuY3Rpb24oIGksIHNsaWRlV2lkdGggKSB7XG4gICAgcmV0dXJuIHNsaWRlV2lkdGggPD0gKCB0aGlzLnNpemUuaW5uZXJXaWR0aCArIDEgKSAqIHBlcmNlbnQ7XG4gIH07XG59O1xuXG4vLyBhbGlhcyBfaW5pdCBmb3IgalF1ZXJ5IHBsdWdpbiAuZmxpY2tpdHkoKVxucHJvdG8uX2luaXQgPVxucHJvdG8ucmVwb3NpdGlvbiA9IGZ1bmN0aW9uKCkge1xuICB0aGlzLnBvc2l0aW9uQ2VsbHMoKTtcbiAgdGhpcy5wb3NpdGlvblNsaWRlckF0U2VsZWN0ZWQoKTtcbn07XG5cbnByb3RvLmdldFNpemUgPSBmdW5jdGlvbigpIHtcbiAgdGhpcy5zaXplID0gZ2V0U2l6ZSggdGhpcy5lbGVtZW50ICk7XG4gIHRoaXMuc2V0Q2VsbEFsaWduKCk7XG4gIHRoaXMuY3Vyc29yUG9zaXRpb24gPSB0aGlzLnNpemUuaW5uZXJXaWR0aCAqIHRoaXMuY2VsbEFsaWduO1xufTtcblxudmFyIGNlbGxBbGlnblNob3J0aGFuZHMgPSB7XG4gIC8vIGNlbGwgYWxpZ24sIHRoZW4gYmFzZWQgb24gb3JpZ2luIHNpZGVcbiAgY2VudGVyOiB7XG4gICAgbGVmdDogMC41LFxuICAgIHJpZ2h0OiAwLjVcbiAgfSxcbiAgbGVmdDoge1xuICAgIGxlZnQ6IDAsXG4gICAgcmlnaHQ6IDFcbiAgfSxcbiAgcmlnaHQ6IHtcbiAgICByaWdodDogMCxcbiAgICBsZWZ0OiAxXG4gIH1cbn07XG5cbnByb3RvLnNldENlbGxBbGlnbiA9IGZ1bmN0aW9uKCkge1xuICB2YXIgc2hvcnRoYW5kID0gY2VsbEFsaWduU2hvcnRoYW5kc1sgdGhpcy5vcHRpb25zLmNlbGxBbGlnbiBdO1xuICB0aGlzLmNlbGxBbGlnbiA9IHNob3J0aGFuZCA/IHNob3J0aGFuZFsgdGhpcy5vcmlnaW5TaWRlIF0gOiB0aGlzLm9wdGlvbnMuY2VsbEFsaWduO1xufTtcblxucHJvdG8uc2V0R2FsbGVyeVNpemUgPSBmdW5jdGlvbigpIHtcbiAgaWYgKCB0aGlzLm9wdGlvbnMuc2V0R2FsbGVyeVNpemUgKSB7XG4gICAgdmFyIGhlaWdodCA9IHRoaXMub3B0aW9ucy5hZGFwdGl2ZUhlaWdodCAmJiB0aGlzLnNlbGVjdGVkU2xpZGUgP1xuICAgICAgdGhpcy5zZWxlY3RlZFNsaWRlLmhlaWdodCA6IHRoaXMubWF4Q2VsbEhlaWdodDtcbiAgICB0aGlzLnZpZXdwb3J0LnN0eWxlLmhlaWdodCA9IGhlaWdodCArICdweCc7XG4gIH1cbn07XG5cbnByb3RvLl9nZXRXcmFwU2hpZnRDZWxscyA9IGZ1bmN0aW9uKCkge1xuICAvLyBvbmx5IGZvciB3cmFwLWFyb3VuZFxuICBpZiAoICF0aGlzLm9wdGlvbnMud3JhcEFyb3VuZCApIHtcbiAgICByZXR1cm47XG4gIH1cbiAgLy8gdW5zaGlmdCBwcmV2aW91cyBjZWxsc1xuICB0aGlzLl91bnNoaWZ0Q2VsbHMoIHRoaXMuYmVmb3JlU2hpZnRDZWxscyApO1xuICB0aGlzLl91bnNoaWZ0Q2VsbHMoIHRoaXMuYWZ0ZXJTaGlmdENlbGxzICk7XG4gIC8vIGdldCBiZWZvcmUgY2VsbHNcbiAgLy8gaW5pdGlhbCBnYXBcbiAgdmFyIGdhcFggPSB0aGlzLmN1cnNvclBvc2l0aW9uO1xuICB2YXIgY2VsbEluZGV4ID0gdGhpcy5jZWxscy5sZW5ndGggLSAxO1xuICB0aGlzLmJlZm9yZVNoaWZ0Q2VsbHMgPSB0aGlzLl9nZXRHYXBDZWxscyggZ2FwWCwgY2VsbEluZGV4LCAtMSApO1xuICAvLyBnZXQgYWZ0ZXIgY2VsbHNcbiAgLy8gZW5kaW5nIGdhcCBiZXR3ZWVuIGxhc3QgY2VsbCBhbmQgZW5kIG9mIGdhbGxlcnkgdmlld3BvcnRcbiAgZ2FwWCA9IHRoaXMuc2l6ZS5pbm5lcldpZHRoIC0gdGhpcy5jdXJzb3JQb3NpdGlvbjtcbiAgLy8gc3RhcnQgY2xvbmluZyBhdCBmaXJzdCBjZWxsLCB3b3JraW5nIGZvcndhcmRzXG4gIHRoaXMuYWZ0ZXJTaGlmdENlbGxzID0gdGhpcy5fZ2V0R2FwQ2VsbHMoIGdhcFgsIDAsIDEgKTtcbn07XG5cbnByb3RvLl9nZXRHYXBDZWxscyA9IGZ1bmN0aW9uKCBnYXBYLCBjZWxsSW5kZXgsIGluY3JlbWVudCApIHtcbiAgLy8ga2VlcCBhZGRpbmcgY2VsbHMgdW50aWwgdGhlIGNvdmVyIHRoZSBpbml0aWFsIGdhcFxuICB2YXIgY2VsbHMgPSBbXTtcbiAgd2hpbGUgKCBnYXBYID4gMCApIHtcbiAgICB2YXIgY2VsbCA9IHRoaXMuY2VsbHNbIGNlbGxJbmRleCBdO1xuICAgIGlmICggIWNlbGwgKSB7XG4gICAgICBicmVhaztcbiAgICB9XG4gICAgY2VsbHMucHVzaCggY2VsbCApO1xuICAgIGNlbGxJbmRleCArPSBpbmNyZW1lbnQ7XG4gICAgZ2FwWCAtPSBjZWxsLnNpemUub3V0ZXJXaWR0aDtcbiAgfVxuICByZXR1cm4gY2VsbHM7XG59O1xuXG4vLyAtLS0tLSBjb250YWluIC0tLS0tIC8vXG5cbi8vIGNvbnRhaW4gY2VsbCB0YXJnZXRzIHNvIG5vIGV4Y2VzcyBzbGlkaW5nXG5wcm90by5fY29udGFpblNsaWRlcyA9IGZ1bmN0aW9uKCkge1xuICBpZiAoICF0aGlzLm9wdGlvbnMuY29udGFpbiB8fCB0aGlzLm9wdGlvbnMud3JhcEFyb3VuZCB8fCAhdGhpcy5jZWxscy5sZW5ndGggKSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIHZhciBpc1JpZ2h0VG9MZWZ0ID0gdGhpcy5vcHRpb25zLnJpZ2h0VG9MZWZ0O1xuICB2YXIgYmVnaW5NYXJnaW4gPSBpc1JpZ2h0VG9MZWZ0ID8gJ21hcmdpblJpZ2h0JyA6ICdtYXJnaW5MZWZ0JztcbiAgdmFyIGVuZE1hcmdpbiA9IGlzUmlnaHRUb0xlZnQgPyAnbWFyZ2luTGVmdCcgOiAnbWFyZ2luUmlnaHQnO1xuICB2YXIgY29udGVudFdpZHRoID0gdGhpcy5zbGlkZWFibGVXaWR0aCAtIHRoaXMuZ2V0TGFzdENlbGwoKS5zaXplWyBlbmRNYXJnaW4gXTtcbiAgLy8gY29udGVudCBpcyBsZXNzIHRoYW4gZ2FsbGVyeSBzaXplXG4gIHZhciBpc0NvbnRlbnRTbWFsbGVyID0gY29udGVudFdpZHRoIDwgdGhpcy5zaXplLmlubmVyV2lkdGg7XG4gIC8vIGJvdW5kc1xuICB2YXIgYmVnaW5Cb3VuZCA9IHRoaXMuY3Vyc29yUG9zaXRpb24gKyB0aGlzLmNlbGxzWzBdLnNpemVbIGJlZ2luTWFyZ2luIF07XG4gIHZhciBlbmRCb3VuZCA9IGNvbnRlbnRXaWR0aCAtIHRoaXMuc2l6ZS5pbm5lcldpZHRoICogKCAxIC0gdGhpcy5jZWxsQWxpZ24gKTtcbiAgLy8gY29udGFpbiBlYWNoIGNlbGwgdGFyZ2V0XG4gIHRoaXMuc2xpZGVzLmZvckVhY2goIGZ1bmN0aW9uKCBzbGlkZSApIHtcbiAgICBpZiAoIGlzQ29udGVudFNtYWxsZXIgKSB7XG4gICAgICAvLyBhbGwgY2VsbHMgZml0IGluc2lkZSBnYWxsZXJ5XG4gICAgICBzbGlkZS50YXJnZXQgPSBjb250ZW50V2lkdGggKiB0aGlzLmNlbGxBbGlnbjtcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gY29udGFpbiB0byBib3VuZHNcbiAgICAgIHNsaWRlLnRhcmdldCA9IE1hdGgubWF4KCBzbGlkZS50YXJnZXQsIGJlZ2luQm91bmQgKTtcbiAgICAgIHNsaWRlLnRhcmdldCA9IE1hdGgubWluKCBzbGlkZS50YXJnZXQsIGVuZEJvdW5kICk7XG4gICAgfVxuICB9LCB0aGlzICk7XG59O1xuXG4vLyAtLS0tLSAgLS0tLS0gLy9cblxuLyoqXG4gKiBlbWl0cyBldmVudHMgdmlhIGV2ZW50RW1pdHRlciBhbmQgalF1ZXJ5IGV2ZW50c1xuICogQHBhcmFtIHtTdHJpbmd9IHR5cGUgLSBuYW1lIG9mIGV2ZW50XG4gKiBAcGFyYW0ge0V2ZW50fSBldmVudCAtIG9yaWdpbmFsIGV2ZW50XG4gKiBAcGFyYW0ge0FycmF5fSBhcmdzIC0gZXh0cmEgYXJndW1lbnRzXG4gKi9cbnByb3RvLmRpc3BhdGNoRXZlbnQgPSBmdW5jdGlvbiggdHlwZSwgZXZlbnQsIGFyZ3MgKSB7XG4gIHZhciBlbWl0QXJncyA9IGV2ZW50ID8gWyBldmVudCBdLmNvbmNhdCggYXJncyApIDogYXJncztcbiAgdGhpcy5lbWl0RXZlbnQoIHR5cGUsIGVtaXRBcmdzICk7XG5cbiAgaWYgKCBqUXVlcnkgJiYgdGhpcy4kZWxlbWVudCApIHtcbiAgICAvLyBkZWZhdWx0IHRyaWdnZXIgd2l0aCB0eXBlIGlmIG5vIGV2ZW50XG4gICAgdHlwZSArPSB0aGlzLm9wdGlvbnMubmFtZXNwYWNlSlF1ZXJ5RXZlbnRzID8gJy5mbGlja2l0eScgOiAnJztcbiAgICB2YXIgJGV2ZW50ID0gdHlwZTtcbiAgICBpZiAoIGV2ZW50ICkge1xuICAgICAgLy8gY3JlYXRlIGpRdWVyeSBldmVudFxuICAgICAgdmFyIGpRRXZlbnQgPSBqUXVlcnkuRXZlbnQoIGV2ZW50ICk7XG4gICAgICBqUUV2ZW50LnR5cGUgPSB0eXBlO1xuICAgICAgJGV2ZW50ID0galFFdmVudDtcbiAgICB9XG4gICAgdGhpcy4kZWxlbWVudC50cmlnZ2VyKCAkZXZlbnQsIGFyZ3MgKTtcbiAgfVxufTtcblxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gc2VsZWN0IC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tIC8vXG5cbi8qKlxuICogQHBhcmFtIHtJbnRlZ2VyfSBpbmRleCAtIGluZGV4IG9mIHRoZSBzbGlkZVxuICogQHBhcmFtIHtCb29sZWFufSBpc1dyYXAgLSB3aWxsIHdyYXAtYXJvdW5kIHRvIGxhc3QvZmlyc3QgaWYgYXQgdGhlIGVuZFxuICogQHBhcmFtIHtCb29sZWFufSBpc0luc3RhbnQgLSB3aWxsIGltbWVkaWF0ZWx5IHNldCBwb3NpdGlvbiBhdCBzZWxlY3RlZCBjZWxsXG4gKi9cbnByb3RvLnNlbGVjdCA9IGZ1bmN0aW9uKCBpbmRleCwgaXNXcmFwLCBpc0luc3RhbnQgKSB7XG4gIGlmICggIXRoaXMuaXNBY3RpdmUgKSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIGluZGV4ID0gcGFyc2VJbnQoIGluZGV4LCAxMCApO1xuICB0aGlzLl93cmFwU2VsZWN0KCBpbmRleCApO1xuXG4gIGlmICggdGhpcy5vcHRpb25zLndyYXBBcm91bmQgfHwgaXNXcmFwICkge1xuICAgIGluZGV4ID0gdXRpbHMubW9kdWxvKCBpbmRleCwgdGhpcy5zbGlkZXMubGVuZ3RoICk7XG4gIH1cbiAgLy8gYmFpbCBpZiBpbnZhbGlkIGluZGV4XG4gIGlmICggIXRoaXMuc2xpZGVzWyBpbmRleCBdICkge1xuICAgIHJldHVybjtcbiAgfVxuICB2YXIgcHJldkluZGV4ID0gdGhpcy5zZWxlY3RlZEluZGV4O1xuICB0aGlzLnNlbGVjdGVkSW5kZXggPSBpbmRleDtcbiAgdGhpcy51cGRhdGVTZWxlY3RlZFNsaWRlKCk7XG4gIGlmICggaXNJbnN0YW50ICkge1xuICAgIHRoaXMucG9zaXRpb25TbGlkZXJBdFNlbGVjdGVkKCk7XG4gIH0gZWxzZSB7XG4gICAgdGhpcy5zdGFydEFuaW1hdGlvbigpO1xuICB9XG4gIGlmICggdGhpcy5vcHRpb25zLmFkYXB0aXZlSGVpZ2h0ICkge1xuICAgIHRoaXMuc2V0R2FsbGVyeVNpemUoKTtcbiAgfVxuICAvLyBldmVudHNcbiAgdGhpcy5kaXNwYXRjaEV2ZW50KCAnc2VsZWN0JywgbnVsbCwgWyBpbmRleCBdICk7XG4gIC8vIGNoYW5nZSBldmVudCBpZiBuZXcgaW5kZXhcbiAgaWYgKCBpbmRleCAhPSBwcmV2SW5kZXggKSB7XG4gICAgdGhpcy5kaXNwYXRjaEV2ZW50KCAnY2hhbmdlJywgbnVsbCwgWyBpbmRleCBdICk7XG4gIH1cbiAgLy8gb2xkIHYxIGV2ZW50IG5hbWUsIHJlbW92ZSBpbiB2M1xuICB0aGlzLmRpc3BhdGNoRXZlbnQoJ2NlbGxTZWxlY3QnKTtcbn07XG5cbi8vIHdyYXBzIHBvc2l0aW9uIGZvciB3cmFwQXJvdW5kLCB0byBtb3ZlIHRvIGNsb3Nlc3Qgc2xpZGUuICMxMTNcbnByb3RvLl93cmFwU2VsZWN0ID0gZnVuY3Rpb24oIGluZGV4ICkge1xuICB2YXIgbGVuID0gdGhpcy5zbGlkZXMubGVuZ3RoO1xuICB2YXIgaXNXcmFwcGluZyA9IHRoaXMub3B0aW9ucy53cmFwQXJvdW5kICYmIGxlbiA+IDE7XG4gIGlmICggIWlzV3JhcHBpbmcgKSB7XG4gICAgcmV0dXJuIGluZGV4O1xuICB9XG4gIHZhciB3cmFwSW5kZXggPSB1dGlscy5tb2R1bG8oIGluZGV4LCBsZW4gKTtcbiAgLy8gZ28gdG8gc2hvcnRlc3RcbiAgdmFyIGRlbHRhID0gTWF0aC5hYnMoIHdyYXBJbmRleCAtIHRoaXMuc2VsZWN0ZWRJbmRleCApO1xuICB2YXIgYmFja1dyYXBEZWx0YSA9IE1hdGguYWJzKCAoIHdyYXBJbmRleCArIGxlbiApIC0gdGhpcy5zZWxlY3RlZEluZGV4ICk7XG4gIHZhciBmb3Jld2FyZFdyYXBEZWx0YSA9IE1hdGguYWJzKCAoIHdyYXBJbmRleCAtIGxlbiApIC0gdGhpcy5zZWxlY3RlZEluZGV4ICk7XG4gIGlmICggIXRoaXMuaXNEcmFnU2VsZWN0ICYmIGJhY2tXcmFwRGVsdGEgPCBkZWx0YSApIHtcbiAgICBpbmRleCArPSBsZW47XG4gIH0gZWxzZSBpZiAoICF0aGlzLmlzRHJhZ1NlbGVjdCAmJiBmb3Jld2FyZFdyYXBEZWx0YSA8IGRlbHRhICkge1xuICAgIGluZGV4IC09IGxlbjtcbiAgfVxuICAvLyB3cmFwIHBvc2l0aW9uIHNvIHNsaWRlciBpcyB3aXRoaW4gbm9ybWFsIGFyZWFcbiAgaWYgKCBpbmRleCA8IDAgKSB7XG4gICAgdGhpcy54IC09IHRoaXMuc2xpZGVhYmxlV2lkdGg7XG4gIH0gZWxzZSBpZiAoIGluZGV4ID49IGxlbiApIHtcbiAgICB0aGlzLnggKz0gdGhpcy5zbGlkZWFibGVXaWR0aDtcbiAgfVxufTtcblxucHJvdG8ucHJldmlvdXMgPSBmdW5jdGlvbiggaXNXcmFwLCBpc0luc3RhbnQgKSB7XG4gIHRoaXMuc2VsZWN0KCB0aGlzLnNlbGVjdGVkSW5kZXggLSAxLCBpc1dyYXAsIGlzSW5zdGFudCApO1xufTtcblxucHJvdG8ubmV4dCA9IGZ1bmN0aW9uKCBpc1dyYXAsIGlzSW5zdGFudCApIHtcbiAgdGhpcy5zZWxlY3QoIHRoaXMuc2VsZWN0ZWRJbmRleCArIDEsIGlzV3JhcCwgaXNJbnN0YW50ICk7XG59O1xuXG5wcm90by51cGRhdGVTZWxlY3RlZFNsaWRlID0gZnVuY3Rpb24oKSB7XG4gIHZhciBzbGlkZSA9IHRoaXMuc2xpZGVzWyB0aGlzLnNlbGVjdGVkSW5kZXggXTtcbiAgLy8gc2VsZWN0ZWRJbmRleCBjb3VsZCBiZSBvdXRzaWRlIG9mIHNsaWRlcywgaWYgdHJpZ2dlcmVkIGJlZm9yZSByZXNpemUoKVxuICBpZiAoICFzbGlkZSApIHtcbiAgICByZXR1cm47XG4gIH1cbiAgLy8gdW5zZWxlY3QgcHJldmlvdXMgc2VsZWN0ZWQgc2xpZGVcbiAgdGhpcy51bnNlbGVjdFNlbGVjdGVkU2xpZGUoKTtcbiAgLy8gdXBkYXRlIG5ldyBzZWxlY3RlZCBzbGlkZVxuICB0aGlzLnNlbGVjdGVkU2xpZGUgPSBzbGlkZTtcbiAgc2xpZGUuc2VsZWN0KCk7XG4gIHRoaXMuc2VsZWN0ZWRDZWxscyA9IHNsaWRlLmNlbGxzO1xuICB0aGlzLnNlbGVjdGVkRWxlbWVudHMgPSBzbGlkZS5nZXRDZWxsRWxlbWVudHMoKTtcbiAgLy8gSEFDSzogc2VsZWN0ZWRDZWxsICYgc2VsZWN0ZWRFbGVtZW50IGlzIGZpcnN0IGNlbGwgaW4gc2xpZGUsIGJhY2t3YXJkcyBjb21wYXRpYmlsaXR5XG4gIC8vIFJlbW92ZSBpbiB2Mz9cbiAgdGhpcy5zZWxlY3RlZENlbGwgPSBzbGlkZS5jZWxsc1swXTtcbiAgdGhpcy5zZWxlY3RlZEVsZW1lbnQgPSB0aGlzLnNlbGVjdGVkRWxlbWVudHNbMF07XG59O1xuXG5wcm90by51bnNlbGVjdFNlbGVjdGVkU2xpZGUgPSBmdW5jdGlvbigpIHtcbiAgaWYgKCB0aGlzLnNlbGVjdGVkU2xpZGUgKSB7XG4gICAgdGhpcy5zZWxlY3RlZFNsaWRlLnVuc2VsZWN0KCk7XG4gIH1cbn07XG5cbnByb3RvLnNlbGVjdEluaXRpYWxJbmRleCA9IGZ1bmN0aW9uKCkge1xuICB2YXIgaW5pdGlhbEluZGV4ID0gdGhpcy5vcHRpb25zLmluaXRpYWxJbmRleDtcbiAgLy8gYWxyZWFkeSBhY3RpdmF0ZWQsIHNlbGVjdCBwcmV2aW91cyBzZWxlY3RlZEluZGV4XG4gIGlmICggdGhpcy5pc0luaXRBY3RpdmF0ZWQgKSB7XG4gICAgdGhpcy5zZWxlY3QoIHRoaXMuc2VsZWN0ZWRJbmRleCwgZmFsc2UsIHRydWUgKTtcbiAgICByZXR1cm47XG4gIH1cbiAgLy8gc2VsZWN0IHdpdGggc2VsZWN0b3Igc3RyaW5nXG4gIGlmICggaW5pdGlhbEluZGV4ICYmIHR5cGVvZiBpbml0aWFsSW5kZXggPT0gJ3N0cmluZycgKSB7XG4gICAgdmFyIGNlbGwgPSB0aGlzLnF1ZXJ5Q2VsbCggaW5pdGlhbEluZGV4ICk7XG4gICAgaWYgKCBjZWxsICkge1xuICAgICAgdGhpcy5zZWxlY3RDZWxsKCBpbml0aWFsSW5kZXgsIGZhbHNlLCB0cnVlICk7XG4gICAgICByZXR1cm47XG4gICAgfVxuICB9XG5cbiAgdmFyIGluZGV4ID0gMDtcbiAgLy8gc2VsZWN0IHdpdGggbnVtYmVyXG4gIGlmICggaW5pdGlhbEluZGV4ICYmIHRoaXMuc2xpZGVzWyBpbml0aWFsSW5kZXggXSApIHtcbiAgICBpbmRleCA9IGluaXRpYWxJbmRleDtcbiAgfVxuICAvLyBzZWxlY3QgaW5zdGFudGx5XG4gIHRoaXMuc2VsZWN0KCBpbmRleCwgZmFsc2UsIHRydWUgKTtcbn07XG5cbi8qKlxuICogc2VsZWN0IHNsaWRlIGZyb20gbnVtYmVyIG9yIGNlbGwgZWxlbWVudFxuICogQHBhcmFtIHtFbGVtZW50IG9yIE51bWJlcn0gZWxlbVxuICovXG5wcm90by5zZWxlY3RDZWxsID0gZnVuY3Rpb24oIHZhbHVlLCBpc1dyYXAsIGlzSW5zdGFudCApIHtcbiAgLy8gZ2V0IGNlbGxcbiAgdmFyIGNlbGwgPSB0aGlzLnF1ZXJ5Q2VsbCggdmFsdWUgKTtcbiAgaWYgKCAhY2VsbCApIHtcbiAgICByZXR1cm47XG4gIH1cblxuICB2YXIgaW5kZXggPSB0aGlzLmdldENlbGxTbGlkZUluZGV4KCBjZWxsICk7XG4gIHRoaXMuc2VsZWN0KCBpbmRleCwgaXNXcmFwLCBpc0luc3RhbnQgKTtcbn07XG5cbnByb3RvLmdldENlbGxTbGlkZUluZGV4ID0gZnVuY3Rpb24oIGNlbGwgKSB7XG4gIC8vIGdldCBpbmRleCBvZiBzbGlkZXMgdGhhdCBoYXMgY2VsbFxuICBmb3IgKCB2YXIgaT0wOyBpIDwgdGhpcy5zbGlkZXMubGVuZ3RoOyBpKysgKSB7XG4gICAgdmFyIHNsaWRlID0gdGhpcy5zbGlkZXNbaV07XG4gICAgdmFyIGluZGV4ID0gc2xpZGUuY2VsbHMuaW5kZXhPZiggY2VsbCApO1xuICAgIGlmICggaW5kZXggIT0gLTEgKSB7XG4gICAgICByZXR1cm4gaTtcbiAgICB9XG4gIH1cbn07XG5cbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tIGdldCBjZWxscyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAvL1xuXG4vKipcbiAqIGdldCBGbGlja2l0eS5DZWxsLCBnaXZlbiBhbiBFbGVtZW50XG4gKiBAcGFyYW0ge0VsZW1lbnR9IGVsZW1cbiAqIEByZXR1cm5zIHtGbGlja2l0eS5DZWxsfSBpdGVtXG4gKi9cbnByb3RvLmdldENlbGwgPSBmdW5jdGlvbiggZWxlbSApIHtcbiAgLy8gbG9vcCB0aHJvdWdoIGNlbGxzIHRvIGdldCB0aGUgb25lIHRoYXQgbWF0Y2hlc1xuICBmb3IgKCB2YXIgaT0wOyBpIDwgdGhpcy5jZWxscy5sZW5ndGg7IGkrKyApIHtcbiAgICB2YXIgY2VsbCA9IHRoaXMuY2VsbHNbaV07XG4gICAgaWYgKCBjZWxsLmVsZW1lbnQgPT0gZWxlbSApIHtcbiAgICAgIHJldHVybiBjZWxsO1xuICAgIH1cbiAgfVxufTtcblxuLyoqXG4gKiBnZXQgY29sbGVjdGlvbiBvZiBGbGlja2l0eS5DZWxscywgZ2l2ZW4gRWxlbWVudHNcbiAqIEBwYXJhbSB7RWxlbWVudCwgQXJyYXksIE5vZGVMaXN0fSBlbGVtc1xuICogQHJldHVybnMge0FycmF5fSBjZWxscyAtIEZsaWNraXR5LkNlbGxzXG4gKi9cbnByb3RvLmdldENlbGxzID0gZnVuY3Rpb24oIGVsZW1zICkge1xuICBlbGVtcyA9IHV0aWxzLm1ha2VBcnJheSggZWxlbXMgKTtcbiAgdmFyIGNlbGxzID0gW107XG4gIGVsZW1zLmZvckVhY2goIGZ1bmN0aW9uKCBlbGVtICkge1xuICAgIHZhciBjZWxsID0gdGhpcy5nZXRDZWxsKCBlbGVtICk7XG4gICAgaWYgKCBjZWxsICkge1xuICAgICAgY2VsbHMucHVzaCggY2VsbCApO1xuICAgIH1cbiAgfSwgdGhpcyApO1xuICByZXR1cm4gY2VsbHM7XG59O1xuXG4vKipcbiAqIGdldCBjZWxsIGVsZW1lbnRzXG4gKiBAcmV0dXJucyB7QXJyYXl9IGNlbGxFbGVtc1xuICovXG5wcm90by5nZXRDZWxsRWxlbWVudHMgPSBmdW5jdGlvbigpIHtcbiAgcmV0dXJuIHRoaXMuY2VsbHMubWFwKCBmdW5jdGlvbiggY2VsbCApIHtcbiAgICByZXR1cm4gY2VsbC5lbGVtZW50O1xuICB9KTtcbn07XG5cbi8qKlxuICogZ2V0IHBhcmVudCBjZWxsIGZyb20gYW4gZWxlbWVudFxuICogQHBhcmFtIHtFbGVtZW50fSBlbGVtXG4gKiBAcmV0dXJucyB7RmxpY2tpdC5DZWxsfSBjZWxsXG4gKi9cbnByb3RvLmdldFBhcmVudENlbGwgPSBmdW5jdGlvbiggZWxlbSApIHtcbiAgLy8gZmlyc3QgY2hlY2sgaWYgZWxlbSBpcyBjZWxsXG4gIHZhciBjZWxsID0gdGhpcy5nZXRDZWxsKCBlbGVtICk7XG4gIGlmICggY2VsbCApIHtcbiAgICByZXR1cm4gY2VsbDtcbiAgfVxuICAvLyB0cnkgdG8gZ2V0IHBhcmVudCBjZWxsIGVsZW1cbiAgZWxlbSA9IHV0aWxzLmdldFBhcmVudCggZWxlbSwgJy5mbGlja2l0eS1zbGlkZXIgPiAqJyApO1xuICByZXR1cm4gdGhpcy5nZXRDZWxsKCBlbGVtICk7XG59O1xuXG4vKipcbiAqIGdldCBjZWxscyBhZGphY2VudCB0byBhIHNsaWRlXG4gKiBAcGFyYW0ge0ludGVnZXJ9IGFkakNvdW50IC0gbnVtYmVyIG9mIGFkamFjZW50IHNsaWRlc1xuICogQHBhcmFtIHtJbnRlZ2VyfSBpbmRleCAtIGluZGV4IG9mIHNsaWRlIHRvIHN0YXJ0XG4gKiBAcmV0dXJucyB7QXJyYXl9IGNlbGxzIC0gYXJyYXkgb2YgRmxpY2tpdHkuQ2VsbHNcbiAqL1xucHJvdG8uZ2V0QWRqYWNlbnRDZWxsRWxlbWVudHMgPSBmdW5jdGlvbiggYWRqQ291bnQsIGluZGV4ICkge1xuICBpZiAoICFhZGpDb3VudCApIHtcbiAgICByZXR1cm4gdGhpcy5zZWxlY3RlZFNsaWRlLmdldENlbGxFbGVtZW50cygpO1xuICB9XG4gIGluZGV4ID0gaW5kZXggPT09IHVuZGVmaW5lZCA/IHRoaXMuc2VsZWN0ZWRJbmRleCA6IGluZGV4O1xuXG4gIHZhciBsZW4gPSB0aGlzLnNsaWRlcy5sZW5ndGg7XG4gIGlmICggMSArICggYWRqQ291bnQgKiAyICkgPj0gbGVuICkge1xuICAgIHJldHVybiB0aGlzLmdldENlbGxFbGVtZW50cygpO1xuICB9XG5cbiAgdmFyIGNlbGxFbGVtcyA9IFtdO1xuICBmb3IgKCB2YXIgaSA9IGluZGV4IC0gYWRqQ291bnQ7IGkgPD0gaW5kZXggKyBhZGpDb3VudCA7IGkrKyApIHtcbiAgICB2YXIgc2xpZGVJbmRleCA9IHRoaXMub3B0aW9ucy53cmFwQXJvdW5kID8gdXRpbHMubW9kdWxvKCBpLCBsZW4gKSA6IGk7XG4gICAgdmFyIHNsaWRlID0gdGhpcy5zbGlkZXNbIHNsaWRlSW5kZXggXTtcbiAgICBpZiAoIHNsaWRlICkge1xuICAgICAgY2VsbEVsZW1zID0gY2VsbEVsZW1zLmNvbmNhdCggc2xpZGUuZ2V0Q2VsbEVsZW1lbnRzKCkgKTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIGNlbGxFbGVtcztcbn07XG5cbi8qKlxuICogc2VsZWN0IHNsaWRlIGZyb20gbnVtYmVyIG9yIGNlbGwgZWxlbWVudFxuICogQHBhcmFtIHtFbGVtZW50LCBTZWxlY3RvciBTdHJpbmcsIG9yIE51bWJlcn0gc2VsZWN0b3JcbiAqL1xucHJvdG8ucXVlcnlDZWxsID0gZnVuY3Rpb24oIHNlbGVjdG9yICkge1xuICBpZiAoIHR5cGVvZiBzZWxlY3RvciA9PSAnbnVtYmVyJyApIHtcbiAgICAvLyB1c2UgbnVtYmVyIGFzIGluZGV4XG4gICAgcmV0dXJuIHRoaXMuY2VsbHNbIHNlbGVjdG9yIF07XG4gIH1cbiAgaWYgKCB0eXBlb2Ygc2VsZWN0b3IgPT0gJ3N0cmluZycgKSB7XG4gICAgLy8gZG8gbm90IHNlbGVjdCBpbnZhbGlkIHNlbGVjdG9ycyBmcm9tIGhhc2g6ICMxMjMsICMvLiAjNzkxXG4gICAgaWYgKCBzZWxlY3Rvci5tYXRjaCgvXlsjXFwuXT9bXFxkXFwvXS8pICkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICAvLyB1c2Ugc3RyaW5nIGFzIHNlbGVjdG9yLCBnZXQgZWxlbWVudFxuICAgIHNlbGVjdG9yID0gdGhpcy5lbGVtZW50LnF1ZXJ5U2VsZWN0b3IoIHNlbGVjdG9yICk7XG4gIH1cbiAgLy8gZ2V0IGNlbGwgZnJvbSBlbGVtZW50XG4gIHJldHVybiB0aGlzLmdldENlbGwoIHNlbGVjdG9yICk7XG59O1xuXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSBldmVudHMgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gLy9cblxucHJvdG8udWlDaGFuZ2UgPSBmdW5jdGlvbigpIHtcbiAgdGhpcy5lbWl0RXZlbnQoJ3VpQ2hhbmdlJyk7XG59O1xuXG4vLyBrZWVwIGZvY3VzIG9uIGVsZW1lbnQgd2hlbiBjaGlsZCBVSSBlbGVtZW50cyBhcmUgY2xpY2tlZFxucHJvdG8uY2hpbGRVSVBvaW50ZXJEb3duID0gZnVuY3Rpb24oIGV2ZW50ICkge1xuICAvLyBIQUNLIGlPUyBkb2VzIG5vdCBhbGxvdyB0b3VjaCBldmVudHMgdG8gYnViYmxlIHVwPyFcbiAgaWYgKCBldmVudC50eXBlICE9ICd0b3VjaHN0YXJ0JyApIHtcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICB9XG4gIHRoaXMuZm9jdXMoKTtcbn07XG5cbi8vIC0tLS0tIHJlc2l6ZSAtLS0tLSAvL1xuXG5wcm90by5vbnJlc2l6ZSA9IGZ1bmN0aW9uKCkge1xuICB0aGlzLndhdGNoQ1NTKCk7XG4gIHRoaXMucmVzaXplKCk7XG59O1xuXG51dGlscy5kZWJvdW5jZU1ldGhvZCggRmxpY2tpdHksICdvbnJlc2l6ZScsIDE1MCApO1xuXG5wcm90by5yZXNpemUgPSBmdW5jdGlvbigpIHtcbiAgaWYgKCAhdGhpcy5pc0FjdGl2ZSApIHtcbiAgICByZXR1cm47XG4gIH1cbiAgdGhpcy5nZXRTaXplKCk7XG4gIC8vIHdyYXAgdmFsdWVzXG4gIGlmICggdGhpcy5vcHRpb25zLndyYXBBcm91bmQgKSB7XG4gICAgdGhpcy54ID0gdXRpbHMubW9kdWxvKCB0aGlzLngsIHRoaXMuc2xpZGVhYmxlV2lkdGggKTtcbiAgfVxuICB0aGlzLnBvc2l0aW9uQ2VsbHMoKTtcbiAgdGhpcy5fZ2V0V3JhcFNoaWZ0Q2VsbHMoKTtcbiAgdGhpcy5zZXRHYWxsZXJ5U2l6ZSgpO1xuICB0aGlzLmVtaXRFdmVudCgncmVzaXplJyk7XG4gIC8vIHVwZGF0ZSBzZWxlY3RlZCBpbmRleCBmb3IgZ3JvdXAgc2xpZGVzLCBpbnN0YW50XG4gIC8vIFRPRE86IHBvc2l0aW9uIGNhbiBiZSBsb3N0IGJldHdlZW4gZ3JvdXBzIG9mIHZhcmlvdXMgbnVtYmVyc1xuICB2YXIgc2VsZWN0ZWRFbGVtZW50ID0gdGhpcy5zZWxlY3RlZEVsZW1lbnRzICYmIHRoaXMuc2VsZWN0ZWRFbGVtZW50c1swXTtcbiAgdGhpcy5zZWxlY3RDZWxsKCBzZWxlY3RlZEVsZW1lbnQsIGZhbHNlLCB0cnVlICk7XG59O1xuXG4vLyB3YXRjaGVzIHRoZSA6YWZ0ZXIgcHJvcGVydHksIGFjdGl2YXRlcy9kZWFjdGl2YXRlc1xucHJvdG8ud2F0Y2hDU1MgPSBmdW5jdGlvbigpIHtcbiAgdmFyIHdhdGNoT3B0aW9uID0gdGhpcy5vcHRpb25zLndhdGNoQ1NTO1xuICBpZiAoICF3YXRjaE9wdGlvbiApIHtcbiAgICByZXR1cm47XG4gIH1cblxuICB2YXIgYWZ0ZXJDb250ZW50ID0gZ2V0Q29tcHV0ZWRTdHlsZSggdGhpcy5lbGVtZW50LCAnOmFmdGVyJyApLmNvbnRlbnQ7XG4gIC8vIGFjdGl2YXRlIGlmIDphZnRlciB7IGNvbnRlbnQ6ICdmbGlja2l0eScgfVxuICBpZiAoIGFmdGVyQ29udGVudC5pbmRleE9mKCdmbGlja2l0eScpICE9IC0xICkge1xuICAgIHRoaXMuYWN0aXZhdGUoKTtcbiAgfSBlbHNlIHtcbiAgICB0aGlzLmRlYWN0aXZhdGUoKTtcbiAgfVxufTtcblxuLy8gLS0tLS0ga2V5ZG93biAtLS0tLSAvL1xuXG4vLyBnbyBwcmV2aW91cy9uZXh0IGlmIGxlZnQvcmlnaHQga2V5cyBwcmVzc2VkXG5wcm90by5vbmtleWRvd24gPSBmdW5jdGlvbiggZXZlbnQgKSB7XG4gIC8vIG9ubHkgd29yayBpZiBlbGVtZW50IGlzIGluIGZvY3VzXG4gIHZhciBpc05vdEZvY3VzZWQgPSBkb2N1bWVudC5hY3RpdmVFbGVtZW50ICYmIGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQgIT0gdGhpcy5lbGVtZW50O1xuICBpZiAoICF0aGlzLm9wdGlvbnMuYWNjZXNzaWJpbGl0eSB8fGlzTm90Rm9jdXNlZCApIHtcbiAgICByZXR1cm47XG4gIH1cblxuICB2YXIgaGFuZGxlciA9IEZsaWNraXR5LmtleWJvYXJkSGFuZGxlcnNbIGV2ZW50LmtleUNvZGUgXTtcbiAgaWYgKCBoYW5kbGVyICkge1xuICAgIGhhbmRsZXIuY2FsbCggdGhpcyApO1xuICB9XG59O1xuXG5GbGlja2l0eS5rZXlib2FyZEhhbmRsZXJzID0ge1xuICAvLyBsZWZ0IGFycm93XG4gIDM3OiBmdW5jdGlvbigpIHtcbiAgICB2YXIgbGVmdE1ldGhvZCA9IHRoaXMub3B0aW9ucy5yaWdodFRvTGVmdCA/ICduZXh0JyA6ICdwcmV2aW91cyc7XG4gICAgdGhpcy51aUNoYW5nZSgpO1xuICAgIHRoaXNbIGxlZnRNZXRob2QgXSgpO1xuICB9LFxuICAvLyByaWdodCBhcnJvd1xuICAzOTogZnVuY3Rpb24oKSB7XG4gICAgdmFyIHJpZ2h0TWV0aG9kID0gdGhpcy5vcHRpb25zLnJpZ2h0VG9MZWZ0ID8gJ3ByZXZpb3VzJyA6ICduZXh0JztcbiAgICB0aGlzLnVpQ2hhbmdlKCk7XG4gICAgdGhpc1sgcmlnaHRNZXRob2QgXSgpO1xuICB9LFxufTtcblxuLy8gLS0tLS0gZm9jdXMgLS0tLS0gLy9cblxucHJvdG8uZm9jdXMgPSBmdW5jdGlvbigpIHtcbiAgLy8gVE9ETyByZW1vdmUgc2Nyb2xsVG8gb25jZSBmb2N1cyBvcHRpb25zIGdldHMgbW9yZSBzdXBwb3J0XG4gIC8vIGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0FQSS9IVE1MRWxlbWVudC9mb2N1cyNCcm93c2VyX2NvbXBhdGliaWxpdHlcbiAgdmFyIHByZXZTY3JvbGxZID0gd2luZG93LnBhZ2VZT2Zmc2V0O1xuICB0aGlzLmVsZW1lbnQuZm9jdXMoeyBwcmV2ZW50U2Nyb2xsOiB0cnVlIH0pO1xuICAvLyBoYWNrIHRvIGZpeCBzY3JvbGwganVtcCBhZnRlciBmb2N1cywgIzc2XG4gIGlmICggd2luZG93LnBhZ2VZT2Zmc2V0ICE9IHByZXZTY3JvbGxZICkge1xuICAgIHdpbmRvdy5zY3JvbGxUbyggd2luZG93LnBhZ2VYT2Zmc2V0LCBwcmV2U2Nyb2xsWSApO1xuICB9XG59O1xuXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSBkZXN0cm95IC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tIC8vXG5cbi8vIGRlYWN0aXZhdGUgYWxsIEZsaWNraXR5IGZ1bmN0aW9uYWxpdHksIGJ1dCBrZWVwIHN0dWZmIGF2YWlsYWJsZVxucHJvdG8uZGVhY3RpdmF0ZSA9IGZ1bmN0aW9uKCkge1xuICBpZiAoICF0aGlzLmlzQWN0aXZlICkge1xuICAgIHJldHVybjtcbiAgfVxuICB0aGlzLmVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZSgnZmxpY2tpdHktZW5hYmxlZCcpO1xuICB0aGlzLmVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZSgnZmxpY2tpdHktcnRsJyk7XG4gIHRoaXMudW5zZWxlY3RTZWxlY3RlZFNsaWRlKCk7XG4gIC8vIGRlc3Ryb3kgY2VsbHNcbiAgdGhpcy5jZWxscy5mb3JFYWNoKCBmdW5jdGlvbiggY2VsbCApIHtcbiAgICBjZWxsLmRlc3Ryb3koKTtcbiAgfSk7XG4gIHRoaXMuZWxlbWVudC5yZW1vdmVDaGlsZCggdGhpcy52aWV3cG9ydCApO1xuICAvLyBtb3ZlIGNoaWxkIGVsZW1lbnRzIGJhY2sgaW50byBlbGVtZW50XG4gIG1vdmVFbGVtZW50cyggdGhpcy5zbGlkZXIuY2hpbGRyZW4sIHRoaXMuZWxlbWVudCApO1xuICBpZiAoIHRoaXMub3B0aW9ucy5hY2Nlc3NpYmlsaXR5ICkge1xuICAgIHRoaXMuZWxlbWVudC5yZW1vdmVBdHRyaWJ1dGUoJ3RhYkluZGV4Jyk7XG4gICAgdGhpcy5lbGVtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoICdrZXlkb3duJywgdGhpcyApO1xuICB9XG4gIC8vIHNldCBmbGFnc1xuICB0aGlzLmlzQWN0aXZlID0gZmFsc2U7XG4gIHRoaXMuZW1pdEV2ZW50KCdkZWFjdGl2YXRlJyk7XG59O1xuXG5wcm90by5kZXN0cm95ID0gZnVuY3Rpb24oKSB7XG4gIHRoaXMuZGVhY3RpdmF0ZSgpO1xuICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lciggJ3Jlc2l6ZScsIHRoaXMgKTtcbiAgdGhpcy5hbGxPZmYoKTtcbiAgdGhpcy5lbWl0RXZlbnQoJ2Rlc3Ryb3knKTtcbiAgaWYgKCBqUXVlcnkgJiYgdGhpcy4kZWxlbWVudCApIHtcbiAgICBqUXVlcnkucmVtb3ZlRGF0YSggdGhpcy5lbGVtZW50LCAnZmxpY2tpdHknICk7XG4gIH1cbiAgZGVsZXRlIHRoaXMuZWxlbWVudC5mbGlja2l0eUdVSUQ7XG4gIGRlbGV0ZSBpbnN0YW5jZXNbIHRoaXMuZ3VpZCBdO1xufTtcblxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gcHJvdG90eXBlIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tIC8vXG5cbnV0aWxzLmV4dGVuZCggcHJvdG8sIGFuaW1hdGVQcm90b3R5cGUgKTtcblxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gZXh0cmFzIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tIC8vXG5cbi8qKlxuICogZ2V0IEZsaWNraXR5IGluc3RhbmNlIGZyb20gZWxlbWVudFxuICogQHBhcmFtIHtFbGVtZW50fSBlbGVtXG4gKiBAcmV0dXJucyB7RmxpY2tpdHl9XG4gKi9cbkZsaWNraXR5LmRhdGEgPSBmdW5jdGlvbiggZWxlbSApIHtcbiAgZWxlbSA9IHV0aWxzLmdldFF1ZXJ5RWxlbWVudCggZWxlbSApO1xuICB2YXIgaWQgPSBlbGVtICYmIGVsZW0uZmxpY2tpdHlHVUlEO1xuICByZXR1cm4gaWQgJiYgaW5zdGFuY2VzWyBpZCBdO1xufTtcblxudXRpbHMuaHRtbEluaXQoIEZsaWNraXR5LCAnZmxpY2tpdHknICk7XG5cbmlmICggalF1ZXJ5ICYmIGpRdWVyeS5icmlkZ2V0ICkge1xuICBqUXVlcnkuYnJpZGdldCggJ2ZsaWNraXR5JywgRmxpY2tpdHkgKTtcbn1cblxuLy8gc2V0IGludGVybmFsIGpRdWVyeSwgZm9yIFdlYnBhY2sgKyBqUXVlcnkgdjMsICM0NzhcbkZsaWNraXR5LnNldEpRdWVyeSA9IGZ1bmN0aW9uKCBqcSApIHtcbiAgalF1ZXJ5ID0ganE7XG59O1xuXG5GbGlja2l0eS5DZWxsID0gQ2VsbDtcbkZsaWNraXR5LlNsaWRlID0gU2xpZGU7XG5cbnJldHVybiBGbGlja2l0eTtcblxufSkpO1xuIiwiLyohXG4gKiBGbGlja2l0eSB2Mi4yLjFcbiAqIFRvdWNoLCByZXNwb25zaXZlLCBmbGlja2FibGUgY2Fyb3VzZWxzXG4gKlxuICogTGljZW5zZWQgR1BMdjMgZm9yIG9wZW4gc291cmNlIHVzZVxuICogb3IgRmxpY2tpdHkgQ29tbWVyY2lhbCBMaWNlbnNlIGZvciBjb21tZXJjaWFsIHVzZVxuICpcbiAqIGh0dHBzOi8vZmxpY2tpdHkubWV0YWZpenp5LmNvXG4gKiBDb3B5cmlnaHQgMjAxNS0yMDE5IE1ldGFmaXp6eVxuICovXG5cbiggZnVuY3Rpb24oIHdpbmRvdywgZmFjdG9yeSApIHtcbiAgLy8gdW5pdmVyc2FsIG1vZHVsZSBkZWZpbml0aW9uXG4gIC8qIGpzaGludCBzdHJpY3Q6IGZhbHNlICovXG4gIGlmICggdHlwZW9mIGRlZmluZSA9PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQgKSB7XG4gICAgLy8gQU1EXG4gICAgZGVmaW5lKCBbXG4gICAgICAnLi9mbGlja2l0eScsXG4gICAgICAnLi9kcmFnJyxcbiAgICAgICcuL3ByZXYtbmV4dC1idXR0b24nLFxuICAgICAgJy4vcGFnZS1kb3RzJyxcbiAgICAgICcuL3BsYXllcicsXG4gICAgICAnLi9hZGQtcmVtb3ZlLWNlbGwnLFxuICAgICAgJy4vbGF6eWxvYWQnXG4gICAgXSwgZmFjdG9yeSApO1xuICB9IGVsc2UgaWYgKCB0eXBlb2YgbW9kdWxlID09ICdvYmplY3QnICYmIG1vZHVsZS5leHBvcnRzICkge1xuICAgIC8vIENvbW1vbkpTXG4gICAgbW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KFxuICAgICAgcmVxdWlyZSgnLi9mbGlja2l0eScpLFxuICAgICAgcmVxdWlyZSgnLi9kcmFnJyksXG4gICAgICByZXF1aXJlKCcuL3ByZXYtbmV4dC1idXR0b24nKSxcbiAgICAgIHJlcXVpcmUoJy4vcGFnZS1kb3RzJyksXG4gICAgICByZXF1aXJlKCcuL3BsYXllcicpLFxuICAgICAgcmVxdWlyZSgnLi9hZGQtcmVtb3ZlLWNlbGwnKSxcbiAgICAgIHJlcXVpcmUoJy4vbGF6eWxvYWQnKVxuICAgICk7XG4gIH1cblxufSkoIHdpbmRvdywgZnVuY3Rpb24gZmFjdG9yeSggRmxpY2tpdHkgKSB7XG4gIC8qanNoaW50IHN0cmljdDogZmFsc2UqL1xuICByZXR1cm4gRmxpY2tpdHk7XG59KTtcbiIsIi8vIGxhenlsb2FkXG4oIGZ1bmN0aW9uKCB3aW5kb3csIGZhY3RvcnkgKSB7XG4gIC8vIHVuaXZlcnNhbCBtb2R1bGUgZGVmaW5pdGlvblxuICAvKiBqc2hpbnQgc3RyaWN0OiBmYWxzZSAqL1xuICBpZiAoIHR5cGVvZiBkZWZpbmUgPT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kICkge1xuICAgIC8vIEFNRFxuICAgIGRlZmluZSggW1xuICAgICAgJy4vZmxpY2tpdHknLFxuICAgICAgJ2Zpenp5LXVpLXV0aWxzL3V0aWxzJ1xuICAgIF0sIGZ1bmN0aW9uKCBGbGlja2l0eSwgdXRpbHMgKSB7XG4gICAgICByZXR1cm4gZmFjdG9yeSggd2luZG93LCBGbGlja2l0eSwgdXRpbHMgKTtcbiAgICB9KTtcbiAgfSBlbHNlIGlmICggdHlwZW9mIG1vZHVsZSA9PSAnb2JqZWN0JyAmJiBtb2R1bGUuZXhwb3J0cyApIHtcbiAgICAvLyBDb21tb25KU1xuICAgIG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeShcbiAgICAgIHdpbmRvdyxcbiAgICAgIHJlcXVpcmUoJy4vZmxpY2tpdHknKSxcbiAgICAgIHJlcXVpcmUoJ2Zpenp5LXVpLXV0aWxzJylcbiAgICApO1xuICB9IGVsc2Uge1xuICAgIC8vIGJyb3dzZXIgZ2xvYmFsXG4gICAgZmFjdG9yeShcbiAgICAgIHdpbmRvdyxcbiAgICAgIHdpbmRvdy5GbGlja2l0eSxcbiAgICAgIHdpbmRvdy5maXp6eVVJVXRpbHNcbiAgICApO1xuICB9XG5cbn0oIHdpbmRvdywgZnVuY3Rpb24gZmFjdG9yeSggd2luZG93LCBGbGlja2l0eSwgdXRpbHMgKSB7XG4ndXNlIHN0cmljdCc7XG5cbkZsaWNraXR5LmNyZWF0ZU1ldGhvZHMucHVzaCgnX2NyZWF0ZUxhenlsb2FkJyk7XG52YXIgcHJvdG8gPSBGbGlja2l0eS5wcm90b3R5cGU7XG5cbnByb3RvLl9jcmVhdGVMYXp5bG9hZCA9IGZ1bmN0aW9uKCkge1xuICB0aGlzLm9uKCAnc2VsZWN0JywgdGhpcy5sYXp5TG9hZCApO1xufTtcblxucHJvdG8ubGF6eUxvYWQgPSBmdW5jdGlvbigpIHtcbiAgdmFyIGxhenlMb2FkID0gdGhpcy5vcHRpb25zLmxhenlMb2FkO1xuICBpZiAoICFsYXp5TG9hZCApIHtcbiAgICByZXR1cm47XG4gIH1cbiAgLy8gZ2V0IGFkamFjZW50IGNlbGxzLCB1c2UgbGF6eUxvYWQgb3B0aW9uIGZvciBhZGphY2VudCBjb3VudFxuICB2YXIgYWRqQ291bnQgPSB0eXBlb2YgbGF6eUxvYWQgPT0gJ251bWJlcicgPyBsYXp5TG9hZCA6IDA7XG4gIHZhciBjZWxsRWxlbXMgPSB0aGlzLmdldEFkamFjZW50Q2VsbEVsZW1lbnRzKCBhZGpDb3VudCApO1xuICAvLyBnZXQgbGF6eSBpbWFnZXMgaW4gdGhvc2UgY2VsbHNcbiAgdmFyIGxhenlJbWFnZXMgPSBbXTtcbiAgY2VsbEVsZW1zLmZvckVhY2goIGZ1bmN0aW9uKCBjZWxsRWxlbSApIHtcbiAgICB2YXIgbGF6eUNlbGxJbWFnZXMgPSBnZXRDZWxsTGF6eUltYWdlcyggY2VsbEVsZW0gKTtcbiAgICBsYXp5SW1hZ2VzID0gbGF6eUltYWdlcy5jb25jYXQoIGxhenlDZWxsSW1hZ2VzICk7XG4gIH0pO1xuICAvLyBsb2FkIGxhenkgaW1hZ2VzXG4gIGxhenlJbWFnZXMuZm9yRWFjaCggZnVuY3Rpb24oIGltZyApIHtcbiAgICBuZXcgTGF6eUxvYWRlciggaW1nLCB0aGlzICk7XG4gIH0sIHRoaXMgKTtcbn07XG5cbmZ1bmN0aW9uIGdldENlbGxMYXp5SW1hZ2VzKCBjZWxsRWxlbSApIHtcbiAgLy8gY2hlY2sgaWYgY2VsbCBlbGVtZW50IGlzIGxhenkgaW1hZ2VcbiAgaWYgKCBjZWxsRWxlbS5ub2RlTmFtZSA9PSAnSU1HJyApIHtcbiAgICB2YXIgbGF6eWxvYWRBdHRyID0gY2VsbEVsZW0uZ2V0QXR0cmlidXRlKCdkYXRhLWZsaWNraXR5LWxhenlsb2FkJyk7XG4gICAgdmFyIHNyY0F0dHIgPSBjZWxsRWxlbS5nZXRBdHRyaWJ1dGUoJ2RhdGEtZmxpY2tpdHktbGF6eWxvYWQtc3JjJyk7XG4gICAgdmFyIHNyY3NldEF0dHIgPSBjZWxsRWxlbS5nZXRBdHRyaWJ1dGUoJ2RhdGEtZmxpY2tpdHktbGF6eWxvYWQtc3Jjc2V0Jyk7XG4gICAgaWYgKCBsYXp5bG9hZEF0dHIgfHwgc3JjQXR0ciB8fCBzcmNzZXRBdHRyICkge1xuICAgICAgcmV0dXJuIFsgY2VsbEVsZW0gXTtcbiAgICB9XG4gIH1cbiAgLy8gc2VsZWN0IGxhenkgaW1hZ2VzIGluIGNlbGxcbiAgdmFyIGxhenlTZWxlY3RvciA9ICdpbWdbZGF0YS1mbGlja2l0eS1sYXp5bG9hZF0sICcgK1xuICAgICdpbWdbZGF0YS1mbGlja2l0eS1sYXp5bG9hZC1zcmNdLCBpbWdbZGF0YS1mbGlja2l0eS1sYXp5bG9hZC1zcmNzZXRdJztcbiAgdmFyIGltZ3MgPSBjZWxsRWxlbS5xdWVyeVNlbGVjdG9yQWxsKCBsYXp5U2VsZWN0b3IgKTtcbiAgcmV0dXJuIHV0aWxzLm1ha2VBcnJheSggaW1ncyApO1xufVxuXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSBMYXp5TG9hZGVyIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tIC8vXG5cbi8qKlxuICogY2xhc3MgdG8gaGFuZGxlIGxvYWRpbmcgaW1hZ2VzXG4gKi9cbmZ1bmN0aW9uIExhenlMb2FkZXIoIGltZywgZmxpY2tpdHkgKSB7XG4gIHRoaXMuaW1nID0gaW1nO1xuICB0aGlzLmZsaWNraXR5ID0gZmxpY2tpdHk7XG4gIHRoaXMubG9hZCgpO1xufVxuXG5MYXp5TG9hZGVyLnByb3RvdHlwZS5oYW5kbGVFdmVudCA9IHV0aWxzLmhhbmRsZUV2ZW50O1xuXG5MYXp5TG9hZGVyLnByb3RvdHlwZS5sb2FkID0gZnVuY3Rpb24oKSB7XG4gIHRoaXMuaW1nLmFkZEV2ZW50TGlzdGVuZXIoICdsb2FkJywgdGhpcyApO1xuICB0aGlzLmltZy5hZGRFdmVudExpc3RlbmVyKCAnZXJyb3InLCB0aGlzICk7XG4gIC8vIGdldCBzcmMgJiBzcmNzZXRcbiAgdmFyIHNyYyA9IHRoaXMuaW1nLmdldEF0dHJpYnV0ZSgnZGF0YS1mbGlja2l0eS1sYXp5bG9hZCcpIHx8XG4gICAgdGhpcy5pbWcuZ2V0QXR0cmlidXRlKCdkYXRhLWZsaWNraXR5LWxhenlsb2FkLXNyYycpO1xuICB2YXIgc3Jjc2V0ID0gdGhpcy5pbWcuZ2V0QXR0cmlidXRlKCdkYXRhLWZsaWNraXR5LWxhenlsb2FkLXNyY3NldCcpO1xuICAvLyBzZXQgc3JjICYgc2Vyc2V0XG4gIHRoaXMuaW1nLnNyYyA9IHNyYztcbiAgaWYgKCBzcmNzZXQgKSB7XG4gICAgdGhpcy5pbWcuc2V0QXR0cmlidXRlKCAnc3Jjc2V0Jywgc3Jjc2V0ICk7XG4gIH1cbiAgLy8gcmVtb3ZlIGF0dHJcbiAgdGhpcy5pbWcucmVtb3ZlQXR0cmlidXRlKCdkYXRhLWZsaWNraXR5LWxhenlsb2FkJyk7XG4gIHRoaXMuaW1nLnJlbW92ZUF0dHJpYnV0ZSgnZGF0YS1mbGlja2l0eS1sYXp5bG9hZC1zcmMnKTtcbiAgdGhpcy5pbWcucmVtb3ZlQXR0cmlidXRlKCdkYXRhLWZsaWNraXR5LWxhenlsb2FkLXNyY3NldCcpO1xufTtcblxuTGF6eUxvYWRlci5wcm90b3R5cGUub25sb2FkID0gZnVuY3Rpb24oIGV2ZW50ICkge1xuICB0aGlzLmNvbXBsZXRlKCBldmVudCwgJ2ZsaWNraXR5LWxhenlsb2FkZWQnICk7XG59O1xuXG5MYXp5TG9hZGVyLnByb3RvdHlwZS5vbmVycm9yID0gZnVuY3Rpb24oIGV2ZW50ICkge1xuICB0aGlzLmNvbXBsZXRlKCBldmVudCwgJ2ZsaWNraXR5LWxhenllcnJvcicgKTtcbn07XG5cbkxhenlMb2FkZXIucHJvdG90eXBlLmNvbXBsZXRlID0gZnVuY3Rpb24oIGV2ZW50LCBjbGFzc05hbWUgKSB7XG4gIC8vIHVuYmluZCBldmVudHNcbiAgdGhpcy5pbWcucmVtb3ZlRXZlbnRMaXN0ZW5lciggJ2xvYWQnLCB0aGlzICk7XG4gIHRoaXMuaW1nLnJlbW92ZUV2ZW50TGlzdGVuZXIoICdlcnJvcicsIHRoaXMgKTtcblxuICB2YXIgY2VsbCA9IHRoaXMuZmxpY2tpdHkuZ2V0UGFyZW50Q2VsbCggdGhpcy5pbWcgKTtcbiAgdmFyIGNlbGxFbGVtID0gY2VsbCAmJiBjZWxsLmVsZW1lbnQ7XG4gIHRoaXMuZmxpY2tpdHkuY2VsbFNpemVDaGFuZ2UoIGNlbGxFbGVtICk7XG5cbiAgdGhpcy5pbWcuY2xhc3NMaXN0LmFkZCggY2xhc3NOYW1lICk7XG4gIHRoaXMuZmxpY2tpdHkuZGlzcGF0Y2hFdmVudCggJ2xhenlMb2FkJywgZXZlbnQsIGNlbGxFbGVtICk7XG59O1xuXG4vLyAtLS0tLSAgLS0tLS0gLy9cblxuRmxpY2tpdHkuTGF6eUxvYWRlciA9IExhenlMb2FkZXI7XG5cbnJldHVybiBGbGlja2l0eTtcblxufSkpO1xuIiwiLy8gcGFnZSBkb3RzXG4oIGZ1bmN0aW9uKCB3aW5kb3csIGZhY3RvcnkgKSB7XG4gIC8vIHVuaXZlcnNhbCBtb2R1bGUgZGVmaW5pdGlvblxuICAvKiBqc2hpbnQgc3RyaWN0OiBmYWxzZSAqL1xuICBpZiAoIHR5cGVvZiBkZWZpbmUgPT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kICkge1xuICAgIC8vIEFNRFxuICAgIGRlZmluZSggW1xuICAgICAgJy4vZmxpY2tpdHknLFxuICAgICAgJ3VuaXBvaW50ZXIvdW5pcG9pbnRlcicsXG4gICAgICAnZml6enktdWktdXRpbHMvdXRpbHMnXG4gICAgXSwgZnVuY3Rpb24oIEZsaWNraXR5LCBVbmlwb2ludGVyLCB1dGlscyApIHtcbiAgICAgIHJldHVybiBmYWN0b3J5KCB3aW5kb3csIEZsaWNraXR5LCBVbmlwb2ludGVyLCB1dGlscyApO1xuICAgIH0pO1xuICB9IGVsc2UgaWYgKCB0eXBlb2YgbW9kdWxlID09ICdvYmplY3QnICYmIG1vZHVsZS5leHBvcnRzICkge1xuICAgIC8vIENvbW1vbkpTXG4gICAgbW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KFxuICAgICAgd2luZG93LFxuICAgICAgcmVxdWlyZSgnLi9mbGlja2l0eScpLFxuICAgICAgcmVxdWlyZSgndW5pcG9pbnRlcicpLFxuICAgICAgcmVxdWlyZSgnZml6enktdWktdXRpbHMnKVxuICAgICk7XG4gIH0gZWxzZSB7XG4gICAgLy8gYnJvd3NlciBnbG9iYWxcbiAgICBmYWN0b3J5KFxuICAgICAgd2luZG93LFxuICAgICAgd2luZG93LkZsaWNraXR5LFxuICAgICAgd2luZG93LlVuaXBvaW50ZXIsXG4gICAgICB3aW5kb3cuZml6enlVSVV0aWxzXG4gICAgKTtcbiAgfVxuXG59KCB3aW5kb3csIGZ1bmN0aW9uIGZhY3RvcnkoIHdpbmRvdywgRmxpY2tpdHksIFVuaXBvaW50ZXIsIHV0aWxzICkge1xuXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSBQYWdlRG90cyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAvL1xuXG4ndXNlIHN0cmljdCc7XG5cbmZ1bmN0aW9uIFBhZ2VEb3RzKCBwYXJlbnQgKSB7XG4gIHRoaXMucGFyZW50ID0gcGFyZW50O1xuICB0aGlzLl9jcmVhdGUoKTtcbn1cblxuUGFnZURvdHMucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZSggVW5pcG9pbnRlci5wcm90b3R5cGUgKTtcblxuUGFnZURvdHMucHJvdG90eXBlLl9jcmVhdGUgPSBmdW5jdGlvbigpIHtcbiAgLy8gY3JlYXRlIGhvbGRlciBlbGVtZW50XG4gIHRoaXMuaG9sZGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnb2wnKTtcbiAgdGhpcy5ob2xkZXIuY2xhc3NOYW1lID0gJ2ZsaWNraXR5LXBhZ2UtZG90cyc7XG4gIC8vIGNyZWF0ZSBkb3RzLCBhcnJheSBvZiBlbGVtZW50c1xuICB0aGlzLmRvdHMgPSBbXTtcbiAgLy8gZXZlbnRzXG4gIHRoaXMuaGFuZGxlQ2xpY2sgPSB0aGlzLm9uQ2xpY2suYmluZCggdGhpcyApO1xuICB0aGlzLm9uKCAncG9pbnRlckRvd24nLCB0aGlzLnBhcmVudC5jaGlsZFVJUG9pbnRlckRvd24uYmluZCggdGhpcy5wYXJlbnQgKSApO1xufTtcblxuUGFnZURvdHMucHJvdG90eXBlLmFjdGl2YXRlID0gZnVuY3Rpb24oKSB7XG4gIHRoaXMuc2V0RG90cygpO1xuICB0aGlzLmhvbGRlci5hZGRFdmVudExpc3RlbmVyKCAnY2xpY2snLCB0aGlzLmhhbmRsZUNsaWNrICk7XG4gIHRoaXMuYmluZFN0YXJ0RXZlbnQoIHRoaXMuaG9sZGVyICk7XG4gIC8vIGFkZCB0byBET01cbiAgdGhpcy5wYXJlbnQuZWxlbWVudC5hcHBlbmRDaGlsZCggdGhpcy5ob2xkZXIgKTtcbn07XG5cblBhZ2VEb3RzLnByb3RvdHlwZS5kZWFjdGl2YXRlID0gZnVuY3Rpb24oKSB7XG4gIHRoaXMuaG9sZGVyLnJlbW92ZUV2ZW50TGlzdGVuZXIoICdjbGljaycsIHRoaXMuaGFuZGxlQ2xpY2sgKTtcbiAgdGhpcy51bmJpbmRTdGFydEV2ZW50KCB0aGlzLmhvbGRlciApO1xuICAvLyByZW1vdmUgZnJvbSBET01cbiAgdGhpcy5wYXJlbnQuZWxlbWVudC5yZW1vdmVDaGlsZCggdGhpcy5ob2xkZXIgKTtcbn07XG5cblBhZ2VEb3RzLnByb3RvdHlwZS5zZXREb3RzID0gZnVuY3Rpb24oKSB7XG4gIC8vIGdldCBkaWZmZXJlbmNlIGJldHdlZW4gbnVtYmVyIG9mIHNsaWRlcyBhbmQgbnVtYmVyIG9mIGRvdHNcbiAgdmFyIGRlbHRhID0gdGhpcy5wYXJlbnQuc2xpZGVzLmxlbmd0aCAtIHRoaXMuZG90cy5sZW5ndGg7XG4gIGlmICggZGVsdGEgPiAwICkge1xuICAgIHRoaXMuYWRkRG90cyggZGVsdGEgKTtcbiAgfSBlbHNlIGlmICggZGVsdGEgPCAwICkge1xuICAgIHRoaXMucmVtb3ZlRG90cyggLWRlbHRhICk7XG4gIH1cbn07XG5cblBhZ2VEb3RzLnByb3RvdHlwZS5hZGREb3RzID0gZnVuY3Rpb24oIGNvdW50ICkge1xuICB2YXIgZnJhZ21lbnQgPSBkb2N1bWVudC5jcmVhdGVEb2N1bWVudEZyYWdtZW50KCk7XG4gIHZhciBuZXdEb3RzID0gW107XG4gIHZhciBsZW5ndGggPSB0aGlzLmRvdHMubGVuZ3RoO1xuICB2YXIgbWF4ID0gbGVuZ3RoICsgY291bnQ7XG5cbiAgZm9yICggdmFyIGkgPSBsZW5ndGg7IGkgPCBtYXg7IGkrKyApIHtcbiAgICB2YXIgZG90ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGknKTtcbiAgICBkb3QuY2xhc3NOYW1lID0gJ2RvdCc7XG4gICAgZG90LnNldEF0dHJpYnV0ZSggJ2FyaWEtbGFiZWwnLCAnUGFnZSBkb3QgJyArICggaSArIDEgKSApO1xuICAgIGZyYWdtZW50LmFwcGVuZENoaWxkKCBkb3QgKTtcbiAgICBuZXdEb3RzLnB1c2goIGRvdCApO1xuICB9XG5cbiAgdGhpcy5ob2xkZXIuYXBwZW5kQ2hpbGQoIGZyYWdtZW50ICk7XG4gIHRoaXMuZG90cyA9IHRoaXMuZG90cy5jb25jYXQoIG5ld0RvdHMgKTtcbn07XG5cblBhZ2VEb3RzLnByb3RvdHlwZS5yZW1vdmVEb3RzID0gZnVuY3Rpb24oIGNvdW50ICkge1xuICAvLyByZW1vdmUgZnJvbSB0aGlzLmRvdHMgY29sbGVjdGlvblxuICB2YXIgcmVtb3ZlRG90cyA9IHRoaXMuZG90cy5zcGxpY2UoIHRoaXMuZG90cy5sZW5ndGggLSBjb3VudCwgY291bnQgKTtcbiAgLy8gcmVtb3ZlIGZyb20gRE9NXG4gIHJlbW92ZURvdHMuZm9yRWFjaCggZnVuY3Rpb24oIGRvdCApIHtcbiAgICB0aGlzLmhvbGRlci5yZW1vdmVDaGlsZCggZG90ICk7XG4gIH0sIHRoaXMgKTtcbn07XG5cblBhZ2VEb3RzLnByb3RvdHlwZS51cGRhdGVTZWxlY3RlZCA9IGZ1bmN0aW9uKCkge1xuICAvLyByZW1vdmUgc2VsZWN0ZWQgY2xhc3Mgb24gcHJldmlvdXNcbiAgaWYgKCB0aGlzLnNlbGVjdGVkRG90ICkge1xuICAgIHRoaXMuc2VsZWN0ZWREb3QuY2xhc3NOYW1lID0gJ2RvdCc7XG4gICAgdGhpcy5zZWxlY3RlZERvdC5yZW1vdmVBdHRyaWJ1dGUoJ2FyaWEtY3VycmVudCcpO1xuICB9XG4gIC8vIGRvbid0IHByb2NlZWQgaWYgbm8gZG90c1xuICBpZiAoICF0aGlzLmRvdHMubGVuZ3RoICkge1xuICAgIHJldHVybjtcbiAgfVxuICB0aGlzLnNlbGVjdGVkRG90ID0gdGhpcy5kb3RzWyB0aGlzLnBhcmVudC5zZWxlY3RlZEluZGV4IF07XG4gIHRoaXMuc2VsZWN0ZWREb3QuY2xhc3NOYW1lID0gJ2RvdCBpcy1zZWxlY3RlZCc7XG4gIHRoaXMuc2VsZWN0ZWREb3Quc2V0QXR0cmlidXRlKCAnYXJpYS1jdXJyZW50JywgJ3N0ZXAnICk7XG59O1xuXG5QYWdlRG90cy5wcm90b3R5cGUub25UYXAgPSAvLyBvbGQgbWV0aG9kIG5hbWUsIGJhY2t3YXJkcy1jb21wYXRpYmxlXG5QYWdlRG90cy5wcm90b3R5cGUub25DbGljayA9IGZ1bmN0aW9uKCBldmVudCApIHtcbiAgdmFyIHRhcmdldCA9IGV2ZW50LnRhcmdldDtcbiAgLy8gb25seSBjYXJlIGFib3V0IGRvdCBjbGlja3NcbiAgaWYgKCB0YXJnZXQubm9kZU5hbWUgIT0gJ0xJJyApIHtcbiAgICByZXR1cm47XG4gIH1cblxuICB0aGlzLnBhcmVudC51aUNoYW5nZSgpO1xuICB2YXIgaW5kZXggPSB0aGlzLmRvdHMuaW5kZXhPZiggdGFyZ2V0ICk7XG4gIHRoaXMucGFyZW50LnNlbGVjdCggaW5kZXggKTtcbn07XG5cblBhZ2VEb3RzLnByb3RvdHlwZS5kZXN0cm95ID0gZnVuY3Rpb24oKSB7XG4gIHRoaXMuZGVhY3RpdmF0ZSgpO1xuICB0aGlzLmFsbE9mZigpO1xufTtcblxuRmxpY2tpdHkuUGFnZURvdHMgPSBQYWdlRG90cztcblxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gRmxpY2tpdHkgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gLy9cblxudXRpbHMuZXh0ZW5kKCBGbGlja2l0eS5kZWZhdWx0cywge1xuICBwYWdlRG90czogdHJ1ZVxufSk7XG5cbkZsaWNraXR5LmNyZWF0ZU1ldGhvZHMucHVzaCgnX2NyZWF0ZVBhZ2VEb3RzJyk7XG5cbnZhciBwcm90byA9IEZsaWNraXR5LnByb3RvdHlwZTtcblxucHJvdG8uX2NyZWF0ZVBhZ2VEb3RzID0gZnVuY3Rpb24oKSB7XG4gIGlmICggIXRoaXMub3B0aW9ucy5wYWdlRG90cyApIHtcbiAgICByZXR1cm47XG4gIH1cbiAgdGhpcy5wYWdlRG90cyA9IG5ldyBQYWdlRG90cyggdGhpcyApO1xuICAvLyBldmVudHNcbiAgdGhpcy5vbiggJ2FjdGl2YXRlJywgdGhpcy5hY3RpdmF0ZVBhZ2VEb3RzICk7XG4gIHRoaXMub24oICdzZWxlY3QnLCB0aGlzLnVwZGF0ZVNlbGVjdGVkUGFnZURvdHMgKTtcbiAgdGhpcy5vbiggJ2NlbGxDaGFuZ2UnLCB0aGlzLnVwZGF0ZVBhZ2VEb3RzICk7XG4gIHRoaXMub24oICdyZXNpemUnLCB0aGlzLnVwZGF0ZVBhZ2VEb3RzICk7XG4gIHRoaXMub24oICdkZWFjdGl2YXRlJywgdGhpcy5kZWFjdGl2YXRlUGFnZURvdHMgKTtcbn07XG5cbnByb3RvLmFjdGl2YXRlUGFnZURvdHMgPSBmdW5jdGlvbigpIHtcbiAgdGhpcy5wYWdlRG90cy5hY3RpdmF0ZSgpO1xufTtcblxucHJvdG8udXBkYXRlU2VsZWN0ZWRQYWdlRG90cyA9IGZ1bmN0aW9uKCkge1xuICB0aGlzLnBhZ2VEb3RzLnVwZGF0ZVNlbGVjdGVkKCk7XG59O1xuXG5wcm90by51cGRhdGVQYWdlRG90cyA9IGZ1bmN0aW9uKCkge1xuICB0aGlzLnBhZ2VEb3RzLnNldERvdHMoKTtcbn07XG5cbnByb3RvLmRlYWN0aXZhdGVQYWdlRG90cyA9IGZ1bmN0aW9uKCkge1xuICB0aGlzLnBhZ2VEb3RzLmRlYWN0aXZhdGUoKTtcbn07XG5cbi8vIC0tLS0tICAtLS0tLSAvL1xuXG5GbGlja2l0eS5QYWdlRG90cyA9IFBhZ2VEb3RzO1xuXG5yZXR1cm4gRmxpY2tpdHk7XG5cbn0pKTtcbiIsIi8vIHBsYXllciAmIGF1dG9QbGF5XG4oIGZ1bmN0aW9uKCB3aW5kb3csIGZhY3RvcnkgKSB7XG4gIC8vIHVuaXZlcnNhbCBtb2R1bGUgZGVmaW5pdGlvblxuICAvKiBqc2hpbnQgc3RyaWN0OiBmYWxzZSAqL1xuICBpZiAoIHR5cGVvZiBkZWZpbmUgPT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kICkge1xuICAgIC8vIEFNRFxuICAgIGRlZmluZSggW1xuICAgICAgJ2V2LWVtaXR0ZXIvZXYtZW1pdHRlcicsXG4gICAgICAnZml6enktdWktdXRpbHMvdXRpbHMnLFxuICAgICAgJy4vZmxpY2tpdHknXG4gICAgXSwgZnVuY3Rpb24oIEV2RW1pdHRlciwgdXRpbHMsIEZsaWNraXR5ICkge1xuICAgICAgcmV0dXJuIGZhY3RvcnkoIEV2RW1pdHRlciwgdXRpbHMsIEZsaWNraXR5ICk7XG4gICAgfSk7XG4gIH0gZWxzZSBpZiAoIHR5cGVvZiBtb2R1bGUgPT0gJ29iamVjdCcgJiYgbW9kdWxlLmV4cG9ydHMgKSB7XG4gICAgLy8gQ29tbW9uSlNcbiAgICBtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkoXG4gICAgICByZXF1aXJlKCdldi1lbWl0dGVyJyksXG4gICAgICByZXF1aXJlKCdmaXp6eS11aS11dGlscycpLFxuICAgICAgcmVxdWlyZSgnLi9mbGlja2l0eScpXG4gICAgKTtcbiAgfSBlbHNlIHtcbiAgICAvLyBicm93c2VyIGdsb2JhbFxuICAgIGZhY3RvcnkoXG4gICAgICB3aW5kb3cuRXZFbWl0dGVyLFxuICAgICAgd2luZG93LmZpenp5VUlVdGlscyxcbiAgICAgIHdpbmRvdy5GbGlja2l0eVxuICAgICk7XG4gIH1cblxufSggd2luZG93LCBmdW5jdGlvbiBmYWN0b3J5KCBFdkVtaXR0ZXIsIHV0aWxzLCBGbGlja2l0eSApIHtcblxuJ3VzZSBzdHJpY3QnO1xuXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSBQbGF5ZXIgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gLy9cblxuZnVuY3Rpb24gUGxheWVyKCBwYXJlbnQgKSB7XG4gIHRoaXMucGFyZW50ID0gcGFyZW50O1xuICB0aGlzLnN0YXRlID0gJ3N0b3BwZWQnO1xuICAvLyB2aXNpYmlsaXR5IGNoYW5nZSBldmVudCBoYW5kbGVyXG4gIHRoaXMub25WaXNpYmlsaXR5Q2hhbmdlID0gdGhpcy52aXNpYmlsaXR5Q2hhbmdlLmJpbmQoIHRoaXMgKTtcbiAgdGhpcy5vblZpc2liaWxpdHlQbGF5ID0gdGhpcy52aXNpYmlsaXR5UGxheS5iaW5kKCB0aGlzICk7XG59XG5cblBsYXllci5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKCBFdkVtaXR0ZXIucHJvdG90eXBlICk7XG5cbi8vIHN0YXJ0IHBsYXlcblBsYXllci5wcm90b3R5cGUucGxheSA9IGZ1bmN0aW9uKCkge1xuICBpZiAoIHRoaXMuc3RhdGUgPT0gJ3BsYXlpbmcnICkge1xuICAgIHJldHVybjtcbiAgfVxuICAvLyBkbyBub3QgcGxheSBpZiBwYWdlIGlzIGhpZGRlbiwgc3RhcnQgcGxheWluZyB3aGVuIHBhZ2UgaXMgdmlzaWJsZVxuICB2YXIgaXNQYWdlSGlkZGVuID0gZG9jdW1lbnQuaGlkZGVuO1xuICBpZiAoIGlzUGFnZUhpZGRlbiApIHtcbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCAndmlzaWJpbGl0eWNoYW5nZScsIHRoaXMub25WaXNpYmlsaXR5UGxheSApO1xuICAgIHJldHVybjtcbiAgfVxuXG4gIHRoaXMuc3RhdGUgPSAncGxheWluZyc7XG4gIC8vIGxpc3RlbiB0byB2aXNpYmlsaXR5IGNoYW5nZVxuICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCAndmlzaWJpbGl0eWNoYW5nZScsIHRoaXMub25WaXNpYmlsaXR5Q2hhbmdlICk7XG4gIC8vIHN0YXJ0IHRpY2tpbmdcbiAgdGhpcy50aWNrKCk7XG59O1xuXG5QbGF5ZXIucHJvdG90eXBlLnRpY2sgPSBmdW5jdGlvbigpIHtcbiAgLy8gZG8gbm90IHRpY2sgaWYgbm90IHBsYXlpbmdcbiAgaWYgKCB0aGlzLnN0YXRlICE9ICdwbGF5aW5nJyApIHtcbiAgICByZXR1cm47XG4gIH1cblxuICB2YXIgdGltZSA9IHRoaXMucGFyZW50Lm9wdGlvbnMuYXV0b1BsYXk7XG4gIC8vIGRlZmF1bHQgdG8gMyBzZWNvbmRzXG4gIHRpbWUgPSB0eXBlb2YgdGltZSA9PSAnbnVtYmVyJyA/IHRpbWUgOiAzMDAwO1xuICB2YXIgX3RoaXMgPSB0aGlzO1xuICAvLyBIQUNLOiByZXNldCB0aWNrcyBpZiBzdG9wcGVkIGFuZCBzdGFydGVkIHdpdGhpbiBpbnRlcnZhbFxuICB0aGlzLmNsZWFyKCk7XG4gIHRoaXMudGltZW91dCA9IHNldFRpbWVvdXQoIGZ1bmN0aW9uKCkge1xuICAgIF90aGlzLnBhcmVudC5uZXh0KCB0cnVlICk7XG4gICAgX3RoaXMudGljaygpO1xuICB9LCB0aW1lICk7XG59O1xuXG5QbGF5ZXIucHJvdG90eXBlLnN0b3AgPSBmdW5jdGlvbigpIHtcbiAgdGhpcy5zdGF0ZSA9ICdzdG9wcGVkJztcbiAgdGhpcy5jbGVhcigpO1xuICAvLyByZW1vdmUgdmlzaWJpbGl0eSBjaGFuZ2UgZXZlbnRcbiAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lciggJ3Zpc2liaWxpdHljaGFuZ2UnLCB0aGlzLm9uVmlzaWJpbGl0eUNoYW5nZSApO1xufTtcblxuUGxheWVyLnByb3RvdHlwZS5jbGVhciA9IGZ1bmN0aW9uKCkge1xuICBjbGVhclRpbWVvdXQoIHRoaXMudGltZW91dCApO1xufTtcblxuUGxheWVyLnByb3RvdHlwZS5wYXVzZSA9IGZ1bmN0aW9uKCkge1xuICBpZiAoIHRoaXMuc3RhdGUgPT0gJ3BsYXlpbmcnICkge1xuICAgIHRoaXMuc3RhdGUgPSAncGF1c2VkJztcbiAgICB0aGlzLmNsZWFyKCk7XG4gIH1cbn07XG5cblBsYXllci5wcm90b3R5cGUudW5wYXVzZSA9IGZ1bmN0aW9uKCkge1xuICAvLyByZS1zdGFydCBwbGF5IGlmIHBhdXNlZFxuICBpZiAoIHRoaXMuc3RhdGUgPT0gJ3BhdXNlZCcgKSB7XG4gICAgdGhpcy5wbGF5KCk7XG4gIH1cbn07XG5cbi8vIHBhdXNlIGlmIHBhZ2UgdmlzaWJpbGl0eSBpcyBoaWRkZW4sIHVucGF1c2UgaWYgdmlzaWJsZVxuUGxheWVyLnByb3RvdHlwZS52aXNpYmlsaXR5Q2hhbmdlID0gZnVuY3Rpb24oKSB7XG4gIHZhciBpc1BhZ2VIaWRkZW4gPSBkb2N1bWVudC5oaWRkZW47XG4gIHRoaXNbIGlzUGFnZUhpZGRlbiA/ICdwYXVzZScgOiAndW5wYXVzZScgXSgpO1xufTtcblxuUGxheWVyLnByb3RvdHlwZS52aXNpYmlsaXR5UGxheSA9IGZ1bmN0aW9uKCkge1xuICB0aGlzLnBsYXkoKTtcbiAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lciggJ3Zpc2liaWxpdHljaGFuZ2UnLCB0aGlzLm9uVmlzaWJpbGl0eVBsYXkgKTtcbn07XG5cbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tIEZsaWNraXR5IC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tIC8vXG5cbnV0aWxzLmV4dGVuZCggRmxpY2tpdHkuZGVmYXVsdHMsIHtcbiAgcGF1c2VBdXRvUGxheU9uSG92ZXI6IHRydWVcbn0pO1xuXG5GbGlja2l0eS5jcmVhdGVNZXRob2RzLnB1c2goJ19jcmVhdGVQbGF5ZXInKTtcbnZhciBwcm90byA9IEZsaWNraXR5LnByb3RvdHlwZTtcblxucHJvdG8uX2NyZWF0ZVBsYXllciA9IGZ1bmN0aW9uKCkge1xuICB0aGlzLnBsYXllciA9IG5ldyBQbGF5ZXIoIHRoaXMgKTtcblxuICB0aGlzLm9uKCAnYWN0aXZhdGUnLCB0aGlzLmFjdGl2YXRlUGxheWVyICk7XG4gIHRoaXMub24oICd1aUNoYW5nZScsIHRoaXMuc3RvcFBsYXllciApO1xuICB0aGlzLm9uKCAncG9pbnRlckRvd24nLCB0aGlzLnN0b3BQbGF5ZXIgKTtcbiAgdGhpcy5vbiggJ2RlYWN0aXZhdGUnLCB0aGlzLmRlYWN0aXZhdGVQbGF5ZXIgKTtcbn07XG5cbnByb3RvLmFjdGl2YXRlUGxheWVyID0gZnVuY3Rpb24oKSB7XG4gIGlmICggIXRoaXMub3B0aW9ucy5hdXRvUGxheSApIHtcbiAgICByZXR1cm47XG4gIH1cbiAgdGhpcy5wbGF5ZXIucGxheSgpO1xuICB0aGlzLmVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lciggJ21vdXNlZW50ZXInLCB0aGlzICk7XG59O1xuXG4vLyBQbGF5ZXIgQVBJLCBkb24ndCBoYXRlIHRoZSAuLi4gdGhhbmtzIEkga25vdyB3aGVyZSB0aGUgZG9vciBpc1xuXG5wcm90by5wbGF5UGxheWVyID0gZnVuY3Rpb24oKSB7XG4gIHRoaXMucGxheWVyLnBsYXkoKTtcbn07XG5cbnByb3RvLnN0b3BQbGF5ZXIgPSBmdW5jdGlvbigpIHtcbiAgdGhpcy5wbGF5ZXIuc3RvcCgpO1xufTtcblxucHJvdG8ucGF1c2VQbGF5ZXIgPSBmdW5jdGlvbigpIHtcbiAgdGhpcy5wbGF5ZXIucGF1c2UoKTtcbn07XG5cbnByb3RvLnVucGF1c2VQbGF5ZXIgPSBmdW5jdGlvbigpIHtcbiAgdGhpcy5wbGF5ZXIudW5wYXVzZSgpO1xufTtcblxucHJvdG8uZGVhY3RpdmF0ZVBsYXllciA9IGZ1bmN0aW9uKCkge1xuICB0aGlzLnBsYXllci5zdG9wKCk7XG4gIHRoaXMuZWxlbWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCAnbW91c2VlbnRlcicsIHRoaXMgKTtcbn07XG5cbi8vIC0tLS0tIG1vdXNlZW50ZXIvbGVhdmUgLS0tLS0gLy9cblxuLy8gcGF1c2UgYXV0by1wbGF5IG9uIGhvdmVyXG5wcm90by5vbm1vdXNlZW50ZXIgPSBmdW5jdGlvbigpIHtcbiAgaWYgKCAhdGhpcy5vcHRpb25zLnBhdXNlQXV0b1BsYXlPbkhvdmVyICkge1xuICAgIHJldHVybjtcbiAgfVxuICB0aGlzLnBsYXllci5wYXVzZSgpO1xuICB0aGlzLmVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lciggJ21vdXNlbGVhdmUnLCB0aGlzICk7XG59O1xuXG4vLyByZXN1bWUgYXV0by1wbGF5IG9uIGhvdmVyIG9mZlxucHJvdG8ub25tb3VzZWxlYXZlID0gZnVuY3Rpb24oKSB7XG4gIHRoaXMucGxheWVyLnVucGF1c2UoKTtcbiAgdGhpcy5lbGVtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoICdtb3VzZWxlYXZlJywgdGhpcyApO1xufTtcblxuLy8gLS0tLS0gIC0tLS0tIC8vXG5cbkZsaWNraXR5LlBsYXllciA9IFBsYXllcjtcblxucmV0dXJuIEZsaWNraXR5O1xuXG59KSk7XG4iLCIvLyBwcmV2L25leHQgYnV0dG9uc1xuKCBmdW5jdGlvbiggd2luZG93LCBmYWN0b3J5ICkge1xuICAvLyB1bml2ZXJzYWwgbW9kdWxlIGRlZmluaXRpb25cbiAgLyoganNoaW50IHN0cmljdDogZmFsc2UgKi9cbiAgaWYgKCB0eXBlb2YgZGVmaW5lID09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZCApIHtcbiAgICAvLyBBTURcbiAgICBkZWZpbmUoIFtcbiAgICAgICcuL2ZsaWNraXR5JyxcbiAgICAgICd1bmlwb2ludGVyL3VuaXBvaW50ZXInLFxuICAgICAgJ2Zpenp5LXVpLXV0aWxzL3V0aWxzJ1xuICAgIF0sIGZ1bmN0aW9uKCBGbGlja2l0eSwgVW5pcG9pbnRlciwgdXRpbHMgKSB7XG4gICAgICByZXR1cm4gZmFjdG9yeSggd2luZG93LCBGbGlja2l0eSwgVW5pcG9pbnRlciwgdXRpbHMgKTtcbiAgICB9KTtcbiAgfSBlbHNlIGlmICggdHlwZW9mIG1vZHVsZSA9PSAnb2JqZWN0JyAmJiBtb2R1bGUuZXhwb3J0cyApIHtcbiAgICAvLyBDb21tb25KU1xuICAgIG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeShcbiAgICAgIHdpbmRvdyxcbiAgICAgIHJlcXVpcmUoJy4vZmxpY2tpdHknKSxcbiAgICAgIHJlcXVpcmUoJ3VuaXBvaW50ZXInKSxcbiAgICAgIHJlcXVpcmUoJ2Zpenp5LXVpLXV0aWxzJylcbiAgICApO1xuICB9IGVsc2Uge1xuICAgIC8vIGJyb3dzZXIgZ2xvYmFsXG4gICAgZmFjdG9yeShcbiAgICAgIHdpbmRvdyxcbiAgICAgIHdpbmRvdy5GbGlja2l0eSxcbiAgICAgIHdpbmRvdy5Vbmlwb2ludGVyLFxuICAgICAgd2luZG93LmZpenp5VUlVdGlsc1xuICAgICk7XG4gIH1cblxufSggd2luZG93LCBmdW5jdGlvbiBmYWN0b3J5KCB3aW5kb3csIEZsaWNraXR5LCBVbmlwb2ludGVyLCB1dGlscyApIHtcbid1c2Ugc3RyaWN0JztcblxudmFyIHN2Z1VSSSA9ICdodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Zyc7XG5cbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tIFByZXZOZXh0QnV0dG9uIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tIC8vXG5cbmZ1bmN0aW9uIFByZXZOZXh0QnV0dG9uKCBkaXJlY3Rpb24sIHBhcmVudCApIHtcbiAgdGhpcy5kaXJlY3Rpb24gPSBkaXJlY3Rpb247XG4gIHRoaXMucGFyZW50ID0gcGFyZW50O1xuICB0aGlzLl9jcmVhdGUoKTtcbn1cblxuUHJldk5leHRCdXR0b24ucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZSggVW5pcG9pbnRlci5wcm90b3R5cGUgKTtcblxuUHJldk5leHRCdXR0b24ucHJvdG90eXBlLl9jcmVhdGUgPSBmdW5jdGlvbigpIHtcbiAgLy8gcHJvcGVydGllc1xuICB0aGlzLmlzRW5hYmxlZCA9IHRydWU7XG4gIHRoaXMuaXNQcmV2aW91cyA9IHRoaXMuZGlyZWN0aW9uID09IC0xO1xuICB2YXIgbGVmdERpcmVjdGlvbiA9IHRoaXMucGFyZW50Lm9wdGlvbnMucmlnaHRUb0xlZnQgPyAxIDogLTE7XG4gIHRoaXMuaXNMZWZ0ID0gdGhpcy5kaXJlY3Rpb24gPT0gbGVmdERpcmVjdGlvbjtcblxuICB2YXIgZWxlbWVudCA9IHRoaXMuZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xuICBlbGVtZW50LmNsYXNzTmFtZSA9ICdmbGlja2l0eS1idXR0b24gZmxpY2tpdHktcHJldi1uZXh0LWJ1dHRvbic7XG4gIGVsZW1lbnQuY2xhc3NOYW1lICs9IHRoaXMuaXNQcmV2aW91cyA/ICcgcHJldmlvdXMnIDogJyBuZXh0JztcbiAgLy8gcHJldmVudCBidXR0b24gZnJvbSBzdWJtaXR0aW5nIGZvcm0gaHR0cDovL3N0YWNrb3ZlcmZsb3cuY29tL2EvMTA4MzYwNzYvMTgyMTgzXG4gIGVsZW1lbnQuc2V0QXR0cmlidXRlKCAndHlwZScsICdidXR0b24nICk7XG4gIC8vIGluaXQgYXMgZGlzYWJsZWRcbiAgdGhpcy5kaXNhYmxlKCk7XG5cbiAgZWxlbWVudC5zZXRBdHRyaWJ1dGUoICdhcmlhLWxhYmVsJywgdGhpcy5pc1ByZXZpb3VzID8gJ1ByZXZpb3VzJyA6ICdOZXh0JyApO1xuXG4gIC8vIGNyZWF0ZSBhcnJvd1xuICB2YXIgc3ZnID0gdGhpcy5jcmVhdGVTVkcoKTtcbiAgZWxlbWVudC5hcHBlbmRDaGlsZCggc3ZnICk7XG4gIC8vIGV2ZW50c1xuICB0aGlzLnBhcmVudC5vbiggJ3NlbGVjdCcsIHRoaXMudXBkYXRlLmJpbmQoIHRoaXMgKSApO1xuICB0aGlzLm9uKCAncG9pbnRlckRvd24nLCB0aGlzLnBhcmVudC5jaGlsZFVJUG9pbnRlckRvd24uYmluZCggdGhpcy5wYXJlbnQgKSApO1xufTtcblxuUHJldk5leHRCdXR0b24ucHJvdG90eXBlLmFjdGl2YXRlID0gZnVuY3Rpb24oKSB7XG4gIHRoaXMuYmluZFN0YXJ0RXZlbnQoIHRoaXMuZWxlbWVudCApO1xuICB0aGlzLmVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lciggJ2NsaWNrJywgdGhpcyApO1xuICAvLyBhZGQgdG8gRE9NXG4gIHRoaXMucGFyZW50LmVsZW1lbnQuYXBwZW5kQ2hpbGQoIHRoaXMuZWxlbWVudCApO1xufTtcblxuUHJldk5leHRCdXR0b24ucHJvdG90eXBlLmRlYWN0aXZhdGUgPSBmdW5jdGlvbigpIHtcbiAgLy8gcmVtb3ZlIGZyb20gRE9NXG4gIHRoaXMucGFyZW50LmVsZW1lbnQucmVtb3ZlQ2hpbGQoIHRoaXMuZWxlbWVudCApO1xuICAvLyBjbGljayBldmVudHNcbiAgdGhpcy51bmJpbmRTdGFydEV2ZW50KCB0aGlzLmVsZW1lbnQgKTtcbiAgdGhpcy5lbGVtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoICdjbGljaycsIHRoaXMgKTtcbn07XG5cblByZXZOZXh0QnV0dG9uLnByb3RvdHlwZS5jcmVhdGVTVkcgPSBmdW5jdGlvbigpIHtcbiAgdmFyIHN2ZyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnROUyggc3ZnVVJJLCAnc3ZnJyk7XG4gIHN2Zy5zZXRBdHRyaWJ1dGUoICdjbGFzcycsICdmbGlja2l0eS1idXR0b24taWNvbicgKTtcbiAgc3ZnLnNldEF0dHJpYnV0ZSggJ3ZpZXdCb3gnLCAnMCAwIDEwMCAxMDAnICk7XG4gIHZhciBwYXRoID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudE5TKCBzdmdVUkksICdwYXRoJyk7XG4gIHZhciBwYXRoTW92ZW1lbnRzID0gZ2V0QXJyb3dNb3ZlbWVudHMoIHRoaXMucGFyZW50Lm9wdGlvbnMuYXJyb3dTaGFwZSApO1xuICBwYXRoLnNldEF0dHJpYnV0ZSggJ2QnLCBwYXRoTW92ZW1lbnRzICk7XG4gIHBhdGguc2V0QXR0cmlidXRlKCAnY2xhc3MnLCAnYXJyb3cnICk7XG4gIC8vIHJvdGF0ZSBhcnJvd1xuICBpZiAoICF0aGlzLmlzTGVmdCApIHtcbiAgICBwYXRoLnNldEF0dHJpYnV0ZSggJ3RyYW5zZm9ybScsICd0cmFuc2xhdGUoMTAwLCAxMDApIHJvdGF0ZSgxODApICcgKTtcbiAgfVxuICBzdmcuYXBwZW5kQ2hpbGQoIHBhdGggKTtcbiAgcmV0dXJuIHN2Zztcbn07XG5cbi8vIGdldCBTVkcgcGF0aCBtb3ZtZW1lbnRcbmZ1bmN0aW9uIGdldEFycm93TW92ZW1lbnRzKCBzaGFwZSApIHtcbiAgLy8gdXNlIHNoYXBlIGFzIG1vdmVtZW50IGlmIHN0cmluZ1xuICBpZiAoIHR5cGVvZiBzaGFwZSA9PSAnc3RyaW5nJyApIHtcbiAgICByZXR1cm4gc2hhcGU7XG4gIH1cbiAgLy8gY3JlYXRlIG1vdmVtZW50IHN0cmluZ1xuICByZXR1cm4gJ00gJyArIHNoYXBlLngwICsgJyw1MCcgK1xuICAgICcgTCAnICsgc2hhcGUueDEgKyAnLCcgKyAoIHNoYXBlLnkxICsgNTAgKSArXG4gICAgJyBMICcgKyBzaGFwZS54MiArICcsJyArICggc2hhcGUueTIgKyA1MCApICtcbiAgICAnIEwgJyArIHNoYXBlLngzICsgJyw1MCAnICtcbiAgICAnIEwgJyArIHNoYXBlLngyICsgJywnICsgKCA1MCAtIHNoYXBlLnkyICkgK1xuICAgICcgTCAnICsgc2hhcGUueDEgKyAnLCcgKyAoIDUwIC0gc2hhcGUueTEgKSArXG4gICAgJyBaJztcbn1cblxuUHJldk5leHRCdXR0b24ucHJvdG90eXBlLmhhbmRsZUV2ZW50ID0gdXRpbHMuaGFuZGxlRXZlbnQ7XG5cblByZXZOZXh0QnV0dG9uLnByb3RvdHlwZS5vbmNsaWNrID0gZnVuY3Rpb24oKSB7XG4gIGlmICggIXRoaXMuaXNFbmFibGVkICkge1xuICAgIHJldHVybjtcbiAgfVxuICB0aGlzLnBhcmVudC51aUNoYW5nZSgpO1xuICB2YXIgbWV0aG9kID0gdGhpcy5pc1ByZXZpb3VzID8gJ3ByZXZpb3VzJyA6ICduZXh0JztcbiAgdGhpcy5wYXJlbnRbIG1ldGhvZCBdKCk7XG59O1xuXG4vLyAtLS0tLSAgLS0tLS0gLy9cblxuUHJldk5leHRCdXR0b24ucHJvdG90eXBlLmVuYWJsZSA9IGZ1bmN0aW9uKCkge1xuICBpZiAoIHRoaXMuaXNFbmFibGVkICkge1xuICAgIHJldHVybjtcbiAgfVxuICB0aGlzLmVsZW1lbnQuZGlzYWJsZWQgPSBmYWxzZTtcbiAgdGhpcy5pc0VuYWJsZWQgPSB0cnVlO1xufTtcblxuUHJldk5leHRCdXR0b24ucHJvdG90eXBlLmRpc2FibGUgPSBmdW5jdGlvbigpIHtcbiAgaWYgKCAhdGhpcy5pc0VuYWJsZWQgKSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIHRoaXMuZWxlbWVudC5kaXNhYmxlZCA9IHRydWU7XG4gIHRoaXMuaXNFbmFibGVkID0gZmFsc2U7XG59O1xuXG5QcmV2TmV4dEJ1dHRvbi5wcm90b3R5cGUudXBkYXRlID0gZnVuY3Rpb24oKSB7XG4gIC8vIGluZGV4IG9mIGZpcnN0IG9yIGxhc3Qgc2xpZGUsIGlmIHByZXZpb3VzIG9yIG5leHRcbiAgdmFyIHNsaWRlcyA9IHRoaXMucGFyZW50LnNsaWRlcztcbiAgLy8gZW5hYmxlIGlzIHdyYXBBcm91bmQgYW5kIGF0IGxlYXN0IDIgc2xpZGVzXG4gIGlmICggdGhpcy5wYXJlbnQub3B0aW9ucy53cmFwQXJvdW5kICYmIHNsaWRlcy5sZW5ndGggPiAxICkge1xuICAgIHRoaXMuZW5hYmxlKCk7XG4gICAgcmV0dXJuO1xuICB9XG4gIHZhciBsYXN0SW5kZXggPSBzbGlkZXMubGVuZ3RoID8gc2xpZGVzLmxlbmd0aCAtIDEgOiAwO1xuICB2YXIgYm91bmRJbmRleCA9IHRoaXMuaXNQcmV2aW91cyA/IDAgOiBsYXN0SW5kZXg7XG4gIHZhciBtZXRob2QgPSB0aGlzLnBhcmVudC5zZWxlY3RlZEluZGV4ID09IGJvdW5kSW5kZXggPyAnZGlzYWJsZScgOiAnZW5hYmxlJztcbiAgdGhpc1sgbWV0aG9kIF0oKTtcbn07XG5cblByZXZOZXh0QnV0dG9uLnByb3RvdHlwZS5kZXN0cm95ID0gZnVuY3Rpb24oKSB7XG4gIHRoaXMuZGVhY3RpdmF0ZSgpO1xuICB0aGlzLmFsbE9mZigpO1xufTtcblxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gRmxpY2tpdHkgcHJvdG90eXBlIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tIC8vXG5cbnV0aWxzLmV4dGVuZCggRmxpY2tpdHkuZGVmYXVsdHMsIHtcbiAgcHJldk5leHRCdXR0b25zOiB0cnVlLFxuICBhcnJvd1NoYXBlOiB7XG4gICAgeDA6IDEwLFxuICAgIHgxOiA2MCwgeTE6IDUwLFxuICAgIHgyOiA3MCwgeTI6IDQwLFxuICAgIHgzOiAzMFxuICB9XG59KTtcblxuRmxpY2tpdHkuY3JlYXRlTWV0aG9kcy5wdXNoKCdfY3JlYXRlUHJldk5leHRCdXR0b25zJyk7XG52YXIgcHJvdG8gPSBGbGlja2l0eS5wcm90b3R5cGU7XG5cbnByb3RvLl9jcmVhdGVQcmV2TmV4dEJ1dHRvbnMgPSBmdW5jdGlvbigpIHtcbiAgaWYgKCAhdGhpcy5vcHRpb25zLnByZXZOZXh0QnV0dG9ucyApIHtcbiAgICByZXR1cm47XG4gIH1cblxuICB0aGlzLnByZXZCdXR0b24gPSBuZXcgUHJldk5leHRCdXR0b24oIC0xLCB0aGlzICk7XG4gIHRoaXMubmV4dEJ1dHRvbiA9IG5ldyBQcmV2TmV4dEJ1dHRvbiggMSwgdGhpcyApO1xuXG4gIHRoaXMub24oICdhY3RpdmF0ZScsIHRoaXMuYWN0aXZhdGVQcmV2TmV4dEJ1dHRvbnMgKTtcbn07XG5cbnByb3RvLmFjdGl2YXRlUHJldk5leHRCdXR0b25zID0gZnVuY3Rpb24oKSB7XG4gIHRoaXMucHJldkJ1dHRvbi5hY3RpdmF0ZSgpO1xuICB0aGlzLm5leHRCdXR0b24uYWN0aXZhdGUoKTtcbiAgdGhpcy5vbiggJ2RlYWN0aXZhdGUnLCB0aGlzLmRlYWN0aXZhdGVQcmV2TmV4dEJ1dHRvbnMgKTtcbn07XG5cbnByb3RvLmRlYWN0aXZhdGVQcmV2TmV4dEJ1dHRvbnMgPSBmdW5jdGlvbigpIHtcbiAgdGhpcy5wcmV2QnV0dG9uLmRlYWN0aXZhdGUoKTtcbiAgdGhpcy5uZXh0QnV0dG9uLmRlYWN0aXZhdGUoKTtcbiAgdGhpcy5vZmYoICdkZWFjdGl2YXRlJywgdGhpcy5kZWFjdGl2YXRlUHJldk5leHRCdXR0b25zICk7XG59O1xuXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gLy9cblxuRmxpY2tpdHkuUHJldk5leHRCdXR0b24gPSBQcmV2TmV4dEJ1dHRvbjtcblxucmV0dXJuIEZsaWNraXR5O1xuXG59KSk7XG4iLCIvLyBzbGlkZVxuKCBmdW5jdGlvbiggd2luZG93LCBmYWN0b3J5ICkge1xuICAvLyB1bml2ZXJzYWwgbW9kdWxlIGRlZmluaXRpb25cbiAgLyoganNoaW50IHN0cmljdDogZmFsc2UgKi9cbiAgaWYgKCB0eXBlb2YgZGVmaW5lID09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZCApIHtcbiAgICAvLyBBTURcbiAgICBkZWZpbmUoIGZhY3RvcnkgKTtcbiAgfSBlbHNlIGlmICggdHlwZW9mIG1vZHVsZSA9PSAnb2JqZWN0JyAmJiBtb2R1bGUuZXhwb3J0cyApIHtcbiAgICAvLyBDb21tb25KU1xuICAgIG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeSgpO1xuICB9IGVsc2Uge1xuICAgIC8vIGJyb3dzZXIgZ2xvYmFsXG4gICAgd2luZG93LkZsaWNraXR5ID0gd2luZG93LkZsaWNraXR5IHx8IHt9O1xuICAgIHdpbmRvdy5GbGlja2l0eS5TbGlkZSA9IGZhY3RvcnkoKTtcbiAgfVxuXG59KCB3aW5kb3csIGZ1bmN0aW9uIGZhY3RvcnkoKSB7XG4ndXNlIHN0cmljdCc7XG5cbmZ1bmN0aW9uIFNsaWRlKCBwYXJlbnQgKSB7XG4gIHRoaXMucGFyZW50ID0gcGFyZW50O1xuICB0aGlzLmlzT3JpZ2luTGVmdCA9IHBhcmVudC5vcmlnaW5TaWRlID09ICdsZWZ0JztcbiAgdGhpcy5jZWxscyA9IFtdO1xuICB0aGlzLm91dGVyV2lkdGggPSAwO1xuICB0aGlzLmhlaWdodCA9IDA7XG59XG5cbnZhciBwcm90byA9IFNsaWRlLnByb3RvdHlwZTtcblxucHJvdG8uYWRkQ2VsbCA9IGZ1bmN0aW9uKCBjZWxsICkge1xuICB0aGlzLmNlbGxzLnB1c2goIGNlbGwgKTtcbiAgdGhpcy5vdXRlcldpZHRoICs9IGNlbGwuc2l6ZS5vdXRlcldpZHRoO1xuICB0aGlzLmhlaWdodCA9IE1hdGgubWF4KCBjZWxsLnNpemUub3V0ZXJIZWlnaHQsIHRoaXMuaGVpZ2h0ICk7XG4gIC8vIGZpcnN0IGNlbGwgc3R1ZmZcbiAgaWYgKCB0aGlzLmNlbGxzLmxlbmd0aCA9PSAxICkge1xuICAgIHRoaXMueCA9IGNlbGwueDsgLy8geCBjb21lcyBmcm9tIGZpcnN0IGNlbGxcbiAgICB2YXIgYmVnaW5NYXJnaW4gPSB0aGlzLmlzT3JpZ2luTGVmdCA/ICdtYXJnaW5MZWZ0JyA6ICdtYXJnaW5SaWdodCc7XG4gICAgdGhpcy5maXJzdE1hcmdpbiA9IGNlbGwuc2l6ZVsgYmVnaW5NYXJnaW4gXTtcbiAgfVxufTtcblxucHJvdG8udXBkYXRlVGFyZ2V0ID0gZnVuY3Rpb24oKSB7XG4gIHZhciBlbmRNYXJnaW4gPSB0aGlzLmlzT3JpZ2luTGVmdCA/ICdtYXJnaW5SaWdodCcgOiAnbWFyZ2luTGVmdCc7XG4gIHZhciBsYXN0Q2VsbCA9IHRoaXMuZ2V0TGFzdENlbGwoKTtcbiAgdmFyIGxhc3RNYXJnaW4gPSBsYXN0Q2VsbCA/IGxhc3RDZWxsLnNpemVbIGVuZE1hcmdpbiBdIDogMDtcbiAgdmFyIHNsaWRlV2lkdGggPSB0aGlzLm91dGVyV2lkdGggLSAoIHRoaXMuZmlyc3RNYXJnaW4gKyBsYXN0TWFyZ2luICk7XG4gIHRoaXMudGFyZ2V0ID0gdGhpcy54ICsgdGhpcy5maXJzdE1hcmdpbiArIHNsaWRlV2lkdGggKiB0aGlzLnBhcmVudC5jZWxsQWxpZ247XG59O1xuXG5wcm90by5nZXRMYXN0Q2VsbCA9IGZ1bmN0aW9uKCkge1xuICByZXR1cm4gdGhpcy5jZWxsc1sgdGhpcy5jZWxscy5sZW5ndGggLSAxIF07XG59O1xuXG5wcm90by5zZWxlY3QgPSBmdW5jdGlvbigpIHtcbiAgdGhpcy5jZWxscy5mb3JFYWNoKCBmdW5jdGlvbiggY2VsbCApIHtcbiAgICBjZWxsLnNlbGVjdCgpO1xuICB9KTtcbn07XG5cbnByb3RvLnVuc2VsZWN0ID0gZnVuY3Rpb24oKSB7XG4gIHRoaXMuY2VsbHMuZm9yRWFjaCggZnVuY3Rpb24oIGNlbGwgKSB7XG4gICAgY2VsbC51bnNlbGVjdCgpO1xuICB9KTtcbn07XG5cbnByb3RvLmdldENlbGxFbGVtZW50cyA9IGZ1bmN0aW9uKCkge1xuICByZXR1cm4gdGhpcy5jZWxscy5tYXAoIGZ1bmN0aW9uKCBjZWxsICkge1xuICAgIHJldHVybiBjZWxsLmVsZW1lbnQ7XG4gIH0pO1xufTtcblxucmV0dXJuIFNsaWRlO1xuXG59KSk7XG4iLCIvKiFcbiAqIGdldFNpemUgdjIuMC4zXG4gKiBtZWFzdXJlIHNpemUgb2YgZWxlbWVudHNcbiAqIE1JVCBsaWNlbnNlXG4gKi9cblxuLyoganNoaW50IGJyb3dzZXI6IHRydWUsIHN0cmljdDogdHJ1ZSwgdW5kZWY6IHRydWUsIHVudXNlZDogdHJ1ZSAqL1xuLyogZ2xvYmFscyBjb25zb2xlOiBmYWxzZSAqL1xuXG4oIGZ1bmN0aW9uKCB3aW5kb3csIGZhY3RvcnkgKSB7XG4gIC8qIGpzaGludCBzdHJpY3Q6IGZhbHNlICovIC8qIGdsb2JhbHMgZGVmaW5lLCBtb2R1bGUgKi9cbiAgaWYgKCB0eXBlb2YgZGVmaW5lID09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZCApIHtcbiAgICAvLyBBTURcbiAgICBkZWZpbmUoIGZhY3RvcnkgKTtcbiAgfSBlbHNlIGlmICggdHlwZW9mIG1vZHVsZSA9PSAnb2JqZWN0JyAmJiBtb2R1bGUuZXhwb3J0cyApIHtcbiAgICAvLyBDb21tb25KU1xuICAgIG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeSgpO1xuICB9IGVsc2Uge1xuICAgIC8vIGJyb3dzZXIgZ2xvYmFsXG4gICAgd2luZG93LmdldFNpemUgPSBmYWN0b3J5KCk7XG4gIH1cblxufSkoIHdpbmRvdywgZnVuY3Rpb24gZmFjdG9yeSgpIHtcbid1c2Ugc3RyaWN0JztcblxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gaGVscGVycyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAvL1xuXG4vLyBnZXQgYSBudW1iZXIgZnJvbSBhIHN0cmluZywgbm90IGEgcGVyY2VudGFnZVxuZnVuY3Rpb24gZ2V0U3R5bGVTaXplKCB2YWx1ZSApIHtcbiAgdmFyIG51bSA9IHBhcnNlRmxvYXQoIHZhbHVlICk7XG4gIC8vIG5vdCBhIHBlcmNlbnQgbGlrZSAnMTAwJScsIGFuZCBhIG51bWJlclxuICB2YXIgaXNWYWxpZCA9IHZhbHVlLmluZGV4T2YoJyUnKSA9PSAtMSAmJiAhaXNOYU4oIG51bSApO1xuICByZXR1cm4gaXNWYWxpZCAmJiBudW07XG59XG5cbmZ1bmN0aW9uIG5vb3AoKSB7fVxuXG52YXIgbG9nRXJyb3IgPSB0eXBlb2YgY29uc29sZSA9PSAndW5kZWZpbmVkJyA/IG5vb3AgOlxuICBmdW5jdGlvbiggbWVzc2FnZSApIHtcbiAgICBjb25zb2xlLmVycm9yKCBtZXNzYWdlICk7XG4gIH07XG5cbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tIG1lYXN1cmVtZW50cyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAvL1xuXG52YXIgbWVhc3VyZW1lbnRzID0gW1xuICAncGFkZGluZ0xlZnQnLFxuICAncGFkZGluZ1JpZ2h0JyxcbiAgJ3BhZGRpbmdUb3AnLFxuICAncGFkZGluZ0JvdHRvbScsXG4gICdtYXJnaW5MZWZ0JyxcbiAgJ21hcmdpblJpZ2h0JyxcbiAgJ21hcmdpblRvcCcsXG4gICdtYXJnaW5Cb3R0b20nLFxuICAnYm9yZGVyTGVmdFdpZHRoJyxcbiAgJ2JvcmRlclJpZ2h0V2lkdGgnLFxuICAnYm9yZGVyVG9wV2lkdGgnLFxuICAnYm9yZGVyQm90dG9tV2lkdGgnXG5dO1xuXG52YXIgbWVhc3VyZW1lbnRzTGVuZ3RoID0gbWVhc3VyZW1lbnRzLmxlbmd0aDtcblxuZnVuY3Rpb24gZ2V0WmVyb1NpemUoKSB7XG4gIHZhciBzaXplID0ge1xuICAgIHdpZHRoOiAwLFxuICAgIGhlaWdodDogMCxcbiAgICBpbm5lcldpZHRoOiAwLFxuICAgIGlubmVySGVpZ2h0OiAwLFxuICAgIG91dGVyV2lkdGg6IDAsXG4gICAgb3V0ZXJIZWlnaHQ6IDBcbiAgfTtcbiAgZm9yICggdmFyIGk9MDsgaSA8IG1lYXN1cmVtZW50c0xlbmd0aDsgaSsrICkge1xuICAgIHZhciBtZWFzdXJlbWVudCA9IG1lYXN1cmVtZW50c1tpXTtcbiAgICBzaXplWyBtZWFzdXJlbWVudCBdID0gMDtcbiAgfVxuICByZXR1cm4gc2l6ZTtcbn1cblxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gZ2V0U3R5bGUgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gLy9cblxuLyoqXG4gKiBnZXRTdHlsZSwgZ2V0IHN0eWxlIG9mIGVsZW1lbnQsIGNoZWNrIGZvciBGaXJlZm94IGJ1Z1xuICogaHR0cHM6Ly9idWd6aWxsYS5tb3ppbGxhLm9yZy9zaG93X2J1Zy5jZ2k/aWQ9NTQ4Mzk3XG4gKi9cbmZ1bmN0aW9uIGdldFN0eWxlKCBlbGVtICkge1xuICB2YXIgc3R5bGUgPSBnZXRDb21wdXRlZFN0eWxlKCBlbGVtICk7XG4gIGlmICggIXN0eWxlICkge1xuICAgIGxvZ0Vycm9yKCAnU3R5bGUgcmV0dXJuZWQgJyArIHN0eWxlICtcbiAgICAgICcuIEFyZSB5b3UgcnVubmluZyB0aGlzIGNvZGUgaW4gYSBoaWRkZW4gaWZyYW1lIG9uIEZpcmVmb3g/ICcgK1xuICAgICAgJ1NlZSBodHRwczovL2JpdC5seS9nZXRzaXplYnVnMScgKTtcbiAgfVxuICByZXR1cm4gc3R5bGU7XG59XG5cbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tIHNldHVwIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tIC8vXG5cbnZhciBpc1NldHVwID0gZmFsc2U7XG5cbnZhciBpc0JveFNpemVPdXRlcjtcblxuLyoqXG4gKiBzZXR1cFxuICogY2hlY2sgaXNCb3hTaXplck91dGVyXG4gKiBkbyBvbiBmaXJzdCBnZXRTaXplKCkgcmF0aGVyIHRoYW4gb24gcGFnZSBsb2FkIGZvciBGaXJlZm94IGJ1Z1xuICovXG5mdW5jdGlvbiBzZXR1cCgpIHtcbiAgLy8gc2V0dXAgb25jZVxuICBpZiAoIGlzU2V0dXAgKSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIGlzU2V0dXAgPSB0cnVlO1xuXG4gIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tIGJveCBzaXppbmcgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gLy9cblxuICAvKipcbiAgICogQ2hyb21lICYgU2FmYXJpIG1lYXN1cmUgdGhlIG91dGVyLXdpZHRoIG9uIHN0eWxlLndpZHRoIG9uIGJvcmRlci1ib3ggZWxlbXNcbiAgICogSUUxMSAmIEZpcmVmb3g8MjkgbWVhc3VyZXMgdGhlIGlubmVyLXdpZHRoXG4gICAqL1xuICB2YXIgZGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gIGRpdi5zdHlsZS53aWR0aCA9ICcyMDBweCc7XG4gIGRpdi5zdHlsZS5wYWRkaW5nID0gJzFweCAycHggM3B4IDRweCc7XG4gIGRpdi5zdHlsZS5ib3JkZXJTdHlsZSA9ICdzb2xpZCc7XG4gIGRpdi5zdHlsZS5ib3JkZXJXaWR0aCA9ICcxcHggMnB4IDNweCA0cHgnO1xuICBkaXYuc3R5bGUuYm94U2l6aW5nID0gJ2JvcmRlci1ib3gnO1xuXG4gIHZhciBib2R5ID0gZG9jdW1lbnQuYm9keSB8fCBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQ7XG4gIGJvZHkuYXBwZW5kQ2hpbGQoIGRpdiApO1xuICB2YXIgc3R5bGUgPSBnZXRTdHlsZSggZGl2ICk7XG4gIC8vIHJvdW5kIHZhbHVlIGZvciBicm93c2VyIHpvb20uIGRlc2FuZHJvL21hc29ucnkjOTI4XG4gIGlzQm94U2l6ZU91dGVyID0gTWF0aC5yb3VuZCggZ2V0U3R5bGVTaXplKCBzdHlsZS53aWR0aCApICkgPT0gMjAwO1xuICBnZXRTaXplLmlzQm94U2l6ZU91dGVyID0gaXNCb3hTaXplT3V0ZXI7XG5cbiAgYm9keS5yZW1vdmVDaGlsZCggZGl2ICk7XG59XG5cbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tIGdldFNpemUgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gLy9cblxuZnVuY3Rpb24gZ2V0U2l6ZSggZWxlbSApIHtcbiAgc2V0dXAoKTtcblxuICAvLyB1c2UgcXVlcnlTZWxldG9yIGlmIGVsZW0gaXMgc3RyaW5nXG4gIGlmICggdHlwZW9mIGVsZW0gPT0gJ3N0cmluZycgKSB7XG4gICAgZWxlbSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoIGVsZW0gKTtcbiAgfVxuXG4gIC8vIGRvIG5vdCBwcm9jZWVkIG9uIG5vbi1vYmplY3RzXG4gIGlmICggIWVsZW0gfHwgdHlwZW9mIGVsZW0gIT0gJ29iamVjdCcgfHwgIWVsZW0ubm9kZVR5cGUgKSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgdmFyIHN0eWxlID0gZ2V0U3R5bGUoIGVsZW0gKTtcblxuICAvLyBpZiBoaWRkZW4sIGV2ZXJ5dGhpbmcgaXMgMFxuICBpZiAoIHN0eWxlLmRpc3BsYXkgPT0gJ25vbmUnICkge1xuICAgIHJldHVybiBnZXRaZXJvU2l6ZSgpO1xuICB9XG5cbiAgdmFyIHNpemUgPSB7fTtcbiAgc2l6ZS53aWR0aCA9IGVsZW0ub2Zmc2V0V2lkdGg7XG4gIHNpemUuaGVpZ2h0ID0gZWxlbS5vZmZzZXRIZWlnaHQ7XG5cbiAgdmFyIGlzQm9yZGVyQm94ID0gc2l6ZS5pc0JvcmRlckJveCA9IHN0eWxlLmJveFNpemluZyA9PSAnYm9yZGVyLWJveCc7XG5cbiAgLy8gZ2V0IGFsbCBtZWFzdXJlbWVudHNcbiAgZm9yICggdmFyIGk9MDsgaSA8IG1lYXN1cmVtZW50c0xlbmd0aDsgaSsrICkge1xuICAgIHZhciBtZWFzdXJlbWVudCA9IG1lYXN1cmVtZW50c1tpXTtcbiAgICB2YXIgdmFsdWUgPSBzdHlsZVsgbWVhc3VyZW1lbnQgXTtcbiAgICB2YXIgbnVtID0gcGFyc2VGbG9hdCggdmFsdWUgKTtcbiAgICAvLyBhbnkgJ2F1dG8nLCAnbWVkaXVtJyB2YWx1ZSB3aWxsIGJlIDBcbiAgICBzaXplWyBtZWFzdXJlbWVudCBdID0gIWlzTmFOKCBudW0gKSA/IG51bSA6IDA7XG4gIH1cblxuICB2YXIgcGFkZGluZ1dpZHRoID0gc2l6ZS5wYWRkaW5nTGVmdCArIHNpemUucGFkZGluZ1JpZ2h0O1xuICB2YXIgcGFkZGluZ0hlaWdodCA9IHNpemUucGFkZGluZ1RvcCArIHNpemUucGFkZGluZ0JvdHRvbTtcbiAgdmFyIG1hcmdpbldpZHRoID0gc2l6ZS5tYXJnaW5MZWZ0ICsgc2l6ZS5tYXJnaW5SaWdodDtcbiAgdmFyIG1hcmdpbkhlaWdodCA9IHNpemUubWFyZ2luVG9wICsgc2l6ZS5tYXJnaW5Cb3R0b207XG4gIHZhciBib3JkZXJXaWR0aCA9IHNpemUuYm9yZGVyTGVmdFdpZHRoICsgc2l6ZS5ib3JkZXJSaWdodFdpZHRoO1xuICB2YXIgYm9yZGVySGVpZ2h0ID0gc2l6ZS5ib3JkZXJUb3BXaWR0aCArIHNpemUuYm9yZGVyQm90dG9tV2lkdGg7XG5cbiAgdmFyIGlzQm9yZGVyQm94U2l6ZU91dGVyID0gaXNCb3JkZXJCb3ggJiYgaXNCb3hTaXplT3V0ZXI7XG5cbiAgLy8gb3ZlcndyaXRlIHdpZHRoIGFuZCBoZWlnaHQgaWYgd2UgY2FuIGdldCBpdCBmcm9tIHN0eWxlXG4gIHZhciBzdHlsZVdpZHRoID0gZ2V0U3R5bGVTaXplKCBzdHlsZS53aWR0aCApO1xuICBpZiAoIHN0eWxlV2lkdGggIT09IGZhbHNlICkge1xuICAgIHNpemUud2lkdGggPSBzdHlsZVdpZHRoICtcbiAgICAgIC8vIGFkZCBwYWRkaW5nIGFuZCBib3JkZXIgdW5sZXNzIGl0J3MgYWxyZWFkeSBpbmNsdWRpbmcgaXRcbiAgICAgICggaXNCb3JkZXJCb3hTaXplT3V0ZXIgPyAwIDogcGFkZGluZ1dpZHRoICsgYm9yZGVyV2lkdGggKTtcbiAgfVxuXG4gIHZhciBzdHlsZUhlaWdodCA9IGdldFN0eWxlU2l6ZSggc3R5bGUuaGVpZ2h0ICk7XG4gIGlmICggc3R5bGVIZWlnaHQgIT09IGZhbHNlICkge1xuICAgIHNpemUuaGVpZ2h0ID0gc3R5bGVIZWlnaHQgK1xuICAgICAgLy8gYWRkIHBhZGRpbmcgYW5kIGJvcmRlciB1bmxlc3MgaXQncyBhbHJlYWR5IGluY2x1ZGluZyBpdFxuICAgICAgKCBpc0JvcmRlckJveFNpemVPdXRlciA/IDAgOiBwYWRkaW5nSGVpZ2h0ICsgYm9yZGVySGVpZ2h0ICk7XG4gIH1cblxuICBzaXplLmlubmVyV2lkdGggPSBzaXplLndpZHRoIC0gKCBwYWRkaW5nV2lkdGggKyBib3JkZXJXaWR0aCApO1xuICBzaXplLmlubmVySGVpZ2h0ID0gc2l6ZS5oZWlnaHQgLSAoIHBhZGRpbmdIZWlnaHQgKyBib3JkZXJIZWlnaHQgKTtcblxuICBzaXplLm91dGVyV2lkdGggPSBzaXplLndpZHRoICsgbWFyZ2luV2lkdGg7XG4gIHNpemUub3V0ZXJIZWlnaHQgPSBzaXplLmhlaWdodCArIG1hcmdpbkhlaWdodDtcblxuICByZXR1cm4gc2l6ZTtcbn1cblxucmV0dXJuIGdldFNpemU7XG5cbn0pO1xuIiwiLyohXG4gKiBVbmlkcmFnZ2VyIHYyLjMuMVxuICogRHJhZ2dhYmxlIGJhc2UgY2xhc3NcbiAqIE1JVCBsaWNlbnNlXG4gKi9cblxuLypqc2hpbnQgYnJvd3NlcjogdHJ1ZSwgdW51c2VkOiB0cnVlLCB1bmRlZjogdHJ1ZSwgc3RyaWN0OiB0cnVlICovXG5cbiggZnVuY3Rpb24oIHdpbmRvdywgZmFjdG9yeSApIHtcbiAgLy8gdW5pdmVyc2FsIG1vZHVsZSBkZWZpbml0aW9uXG4gIC8qanNoaW50IHN0cmljdDogZmFsc2UgKi8gLypnbG9iYWxzIGRlZmluZSwgbW9kdWxlLCByZXF1aXJlICovXG5cbiAgaWYgKCB0eXBlb2YgZGVmaW5lID09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZCApIHtcbiAgICAvLyBBTURcbiAgICBkZWZpbmUoIFtcbiAgICAgICd1bmlwb2ludGVyL3VuaXBvaW50ZXInXG4gICAgXSwgZnVuY3Rpb24oIFVuaXBvaW50ZXIgKSB7XG4gICAgICByZXR1cm4gZmFjdG9yeSggd2luZG93LCBVbmlwb2ludGVyICk7XG4gICAgfSk7XG4gIH0gZWxzZSBpZiAoIHR5cGVvZiBtb2R1bGUgPT0gJ29iamVjdCcgJiYgbW9kdWxlLmV4cG9ydHMgKSB7XG4gICAgLy8gQ29tbW9uSlNcbiAgICBtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkoXG4gICAgICB3aW5kb3csXG4gICAgICByZXF1aXJlKCd1bmlwb2ludGVyJylcbiAgICApO1xuICB9IGVsc2Uge1xuICAgIC8vIGJyb3dzZXIgZ2xvYmFsXG4gICAgd2luZG93LlVuaWRyYWdnZXIgPSBmYWN0b3J5KFxuICAgICAgd2luZG93LFxuICAgICAgd2luZG93LlVuaXBvaW50ZXJcbiAgICApO1xuICB9XG5cbn0oIHdpbmRvdywgZnVuY3Rpb24gZmFjdG9yeSggd2luZG93LCBVbmlwb2ludGVyICkge1xuXG4ndXNlIHN0cmljdCc7XG5cbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tIFVuaWRyYWdnZXIgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gLy9cblxuZnVuY3Rpb24gVW5pZHJhZ2dlcigpIHt9XG5cbi8vIGluaGVyaXQgVW5pcG9pbnRlciAmIEV2RW1pdHRlclxudmFyIHByb3RvID0gVW5pZHJhZ2dlci5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKCBVbmlwb2ludGVyLnByb3RvdHlwZSApO1xuXG4vLyAtLS0tLSBiaW5kIHN0YXJ0IC0tLS0tIC8vXG5cbnByb3RvLmJpbmRIYW5kbGVzID0gZnVuY3Rpb24oKSB7XG4gIHRoaXMuX2JpbmRIYW5kbGVzKCB0cnVlICk7XG59O1xuXG5wcm90by51bmJpbmRIYW5kbGVzID0gZnVuY3Rpb24oKSB7XG4gIHRoaXMuX2JpbmRIYW5kbGVzKCBmYWxzZSApO1xufTtcblxuLyoqXG4gKiBBZGQgb3IgcmVtb3ZlIHN0YXJ0IGV2ZW50XG4gKiBAcGFyYW0ge0Jvb2xlYW59IGlzQWRkXG4gKi9cbnByb3RvLl9iaW5kSGFuZGxlcyA9IGZ1bmN0aW9uKCBpc0FkZCApIHtcbiAgLy8gbXVuZ2UgaXNBZGQsIGRlZmF1bHQgdG8gdHJ1ZVxuICBpc0FkZCA9IGlzQWRkID09PSB1bmRlZmluZWQgPyB0cnVlIDogaXNBZGQ7XG4gIC8vIGJpbmQgZWFjaCBoYW5kbGVcbiAgdmFyIGJpbmRNZXRob2QgPSBpc0FkZCA/ICdhZGRFdmVudExpc3RlbmVyJyA6ICdyZW1vdmVFdmVudExpc3RlbmVyJztcbiAgdmFyIHRvdWNoQWN0aW9uID0gaXNBZGQgPyB0aGlzLl90b3VjaEFjdGlvblZhbHVlIDogJyc7XG4gIGZvciAoIHZhciBpPTA7IGkgPCB0aGlzLmhhbmRsZXMubGVuZ3RoOyBpKysgKSB7XG4gICAgdmFyIGhhbmRsZSA9IHRoaXMuaGFuZGxlc1tpXTtcbiAgICB0aGlzLl9iaW5kU3RhcnRFdmVudCggaGFuZGxlLCBpc0FkZCApO1xuICAgIGhhbmRsZVsgYmluZE1ldGhvZCBdKCAnY2xpY2snLCB0aGlzICk7XG4gICAgLy8gdG91Y2gtYWN0aW9uOiBub25lIHRvIG92ZXJyaWRlIGJyb3dzZXIgdG91Y2ggZ2VzdHVyZXMuIG1ldGFmaXp6eS9mbGlja2l0eSM1NDBcbiAgICBpZiAoIHdpbmRvdy5Qb2ludGVyRXZlbnQgKSB7XG4gICAgICBoYW5kbGUuc3R5bGUudG91Y2hBY3Rpb24gPSB0b3VjaEFjdGlvbjtcbiAgICB9XG4gIH1cbn07XG5cbi8vIHByb3RvdHlwZSBzbyBpdCBjYW4gYmUgb3ZlcndyaXRlYWJsZSBieSBGbGlja2l0eVxucHJvdG8uX3RvdWNoQWN0aW9uVmFsdWUgPSAnbm9uZSc7XG5cbi8vIC0tLS0tIHN0YXJ0IGV2ZW50IC0tLS0tIC8vXG5cbi8qKlxuICogcG9pbnRlciBzdGFydFxuICogQHBhcmFtIHtFdmVudH0gZXZlbnRcbiAqIEBwYXJhbSB7RXZlbnQgb3IgVG91Y2h9IHBvaW50ZXJcbiAqL1xucHJvdG8ucG9pbnRlckRvd24gPSBmdW5jdGlvbiggZXZlbnQsIHBvaW50ZXIgKSB7XG4gIHZhciBpc09rYXkgPSB0aGlzLm9rYXlQb2ludGVyRG93biggZXZlbnQgKTtcbiAgaWYgKCAhaXNPa2F5ICkge1xuICAgIHJldHVybjtcbiAgfVxuICAvLyB0cmFjayBzdGFydCBldmVudCBwb3NpdGlvblxuICAvLyBTYWZhcmkgOSBvdmVycmlkZXMgcGFnZVggYW5kIHBhZ2VZLiBUaGVzZSB2YWx1ZXMgbmVlZHMgdG8gYmUgY29waWVkLiBmbGlja2l0eSM4NDJcbiAgdGhpcy5wb2ludGVyRG93blBvaW50ZXIgPSB7XG4gICAgcGFnZVg6IHBvaW50ZXIucGFnZVgsXG4gICAgcGFnZVk6IHBvaW50ZXIucGFnZVksXG4gIH07XG5cbiAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgdGhpcy5wb2ludGVyRG93bkJsdXIoKTtcbiAgLy8gYmluZCBtb3ZlIGFuZCBlbmQgZXZlbnRzXG4gIHRoaXMuX2JpbmRQb3N0U3RhcnRFdmVudHMoIGV2ZW50ICk7XG4gIHRoaXMuZW1pdEV2ZW50KCAncG9pbnRlckRvd24nLCBbIGV2ZW50LCBwb2ludGVyIF0gKTtcbn07XG5cbi8vIG5vZGVzIHRoYXQgaGF2ZSB0ZXh0IGZpZWxkc1xudmFyIGN1cnNvck5vZGVzID0ge1xuICBURVhUQVJFQTogdHJ1ZSxcbiAgSU5QVVQ6IHRydWUsXG4gIFNFTEVDVDogdHJ1ZSxcbiAgT1BUSU9OOiB0cnVlLFxufTtcblxuLy8gaW5wdXQgdHlwZXMgdGhhdCBkbyBub3QgaGF2ZSB0ZXh0IGZpZWxkc1xudmFyIGNsaWNrVHlwZXMgPSB7XG4gIHJhZGlvOiB0cnVlLFxuICBjaGVja2JveDogdHJ1ZSxcbiAgYnV0dG9uOiB0cnVlLFxuICBzdWJtaXQ6IHRydWUsXG4gIGltYWdlOiB0cnVlLFxuICBmaWxlOiB0cnVlLFxufTtcblxuLy8gZGlzbWlzcyBpbnB1dHMgd2l0aCB0ZXh0IGZpZWxkcy4gZmxpY2tpdHkjNDAzLCBmbGlja2l0eSM0MDRcbnByb3RvLm9rYXlQb2ludGVyRG93biA9IGZ1bmN0aW9uKCBldmVudCApIHtcbiAgdmFyIGlzQ3Vyc29yTm9kZSA9IGN1cnNvck5vZGVzWyBldmVudC50YXJnZXQubm9kZU5hbWUgXTtcbiAgdmFyIGlzQ2xpY2tUeXBlID0gY2xpY2tUeXBlc1sgZXZlbnQudGFyZ2V0LnR5cGUgXTtcbiAgdmFyIGlzT2theSA9ICFpc0N1cnNvck5vZGUgfHwgaXNDbGlja1R5cGU7XG4gIGlmICggIWlzT2theSApIHtcbiAgICB0aGlzLl9wb2ludGVyUmVzZXQoKTtcbiAgfVxuICByZXR1cm4gaXNPa2F5O1xufTtcblxuLy8ga2x1ZGdlIHRvIGJsdXIgcHJldmlvdXNseSBmb2N1c2VkIGlucHV0XG5wcm90by5wb2ludGVyRG93bkJsdXIgPSBmdW5jdGlvbigpIHtcbiAgdmFyIGZvY3VzZWQgPSBkb2N1bWVudC5hY3RpdmVFbGVtZW50O1xuICAvLyBkbyBub3QgYmx1ciBib2R5IGZvciBJRTEwLCBtZXRhZml6enkvZmxpY2tpdHkjMTE3XG4gIHZhciBjYW5CbHVyID0gZm9jdXNlZCAmJiBmb2N1c2VkLmJsdXIgJiYgZm9jdXNlZCAhPSBkb2N1bWVudC5ib2R5O1xuICBpZiAoIGNhbkJsdXIgKSB7XG4gICAgZm9jdXNlZC5ibHVyKCk7XG4gIH1cbn07XG5cbi8vIC0tLS0tIG1vdmUgZXZlbnQgLS0tLS0gLy9cblxuLyoqXG4gKiBkcmFnIG1vdmVcbiAqIEBwYXJhbSB7RXZlbnR9IGV2ZW50XG4gKiBAcGFyYW0ge0V2ZW50IG9yIFRvdWNofSBwb2ludGVyXG4gKi9cbnByb3RvLnBvaW50ZXJNb3ZlID0gZnVuY3Rpb24oIGV2ZW50LCBwb2ludGVyICkge1xuICB2YXIgbW92ZVZlY3RvciA9IHRoaXMuX2RyYWdQb2ludGVyTW92ZSggZXZlbnQsIHBvaW50ZXIgKTtcbiAgdGhpcy5lbWl0RXZlbnQoICdwb2ludGVyTW92ZScsIFsgZXZlbnQsIHBvaW50ZXIsIG1vdmVWZWN0b3IgXSApO1xuICB0aGlzLl9kcmFnTW92ZSggZXZlbnQsIHBvaW50ZXIsIG1vdmVWZWN0b3IgKTtcbn07XG5cbi8vIGJhc2UgcG9pbnRlciBtb3ZlIGxvZ2ljXG5wcm90by5fZHJhZ1BvaW50ZXJNb3ZlID0gZnVuY3Rpb24oIGV2ZW50LCBwb2ludGVyICkge1xuICB2YXIgbW92ZVZlY3RvciA9IHtcbiAgICB4OiBwb2ludGVyLnBhZ2VYIC0gdGhpcy5wb2ludGVyRG93blBvaW50ZXIucGFnZVgsXG4gICAgeTogcG9pbnRlci5wYWdlWSAtIHRoaXMucG9pbnRlckRvd25Qb2ludGVyLnBhZ2VZXG4gIH07XG4gIC8vIHN0YXJ0IGRyYWcgaWYgcG9pbnRlciBoYXMgbW92ZWQgZmFyIGVub3VnaCB0byBzdGFydCBkcmFnXG4gIGlmICggIXRoaXMuaXNEcmFnZ2luZyAmJiB0aGlzLmhhc0RyYWdTdGFydGVkKCBtb3ZlVmVjdG9yICkgKSB7XG4gICAgdGhpcy5fZHJhZ1N0YXJ0KCBldmVudCwgcG9pbnRlciApO1xuICB9XG4gIHJldHVybiBtb3ZlVmVjdG9yO1xufTtcblxuLy8gY29uZGl0aW9uIGlmIHBvaW50ZXIgaGFzIG1vdmVkIGZhciBlbm91Z2ggdG8gc3RhcnQgZHJhZ1xucHJvdG8uaGFzRHJhZ1N0YXJ0ZWQgPSBmdW5jdGlvbiggbW92ZVZlY3RvciApIHtcbiAgcmV0dXJuIE1hdGguYWJzKCBtb3ZlVmVjdG9yLnggKSA+IDMgfHwgTWF0aC5hYnMoIG1vdmVWZWN0b3IueSApID4gMztcbn07XG5cbi8vIC0tLS0tIGVuZCBldmVudCAtLS0tLSAvL1xuXG4vKipcbiAqIHBvaW50ZXIgdXBcbiAqIEBwYXJhbSB7RXZlbnR9IGV2ZW50XG4gKiBAcGFyYW0ge0V2ZW50IG9yIFRvdWNofSBwb2ludGVyXG4gKi9cbnByb3RvLnBvaW50ZXJVcCA9IGZ1bmN0aW9uKCBldmVudCwgcG9pbnRlciApIHtcbiAgdGhpcy5lbWl0RXZlbnQoICdwb2ludGVyVXAnLCBbIGV2ZW50LCBwb2ludGVyIF0gKTtcbiAgdGhpcy5fZHJhZ1BvaW50ZXJVcCggZXZlbnQsIHBvaW50ZXIgKTtcbn07XG5cbnByb3RvLl9kcmFnUG9pbnRlclVwID0gZnVuY3Rpb24oIGV2ZW50LCBwb2ludGVyICkge1xuICBpZiAoIHRoaXMuaXNEcmFnZ2luZyApIHtcbiAgICB0aGlzLl9kcmFnRW5kKCBldmVudCwgcG9pbnRlciApO1xuICB9IGVsc2Uge1xuICAgIC8vIHBvaW50ZXIgZGlkbid0IG1vdmUgZW5vdWdoIGZvciBkcmFnIHRvIHN0YXJ0XG4gICAgdGhpcy5fc3RhdGljQ2xpY2soIGV2ZW50LCBwb2ludGVyICk7XG4gIH1cbn07XG5cbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tIGRyYWcgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gLy9cblxuLy8gZHJhZ1N0YXJ0XG5wcm90by5fZHJhZ1N0YXJ0ID0gZnVuY3Rpb24oIGV2ZW50LCBwb2ludGVyICkge1xuICB0aGlzLmlzRHJhZ2dpbmcgPSB0cnVlO1xuICAvLyBwcmV2ZW50IGNsaWNrc1xuICB0aGlzLmlzUHJldmVudGluZ0NsaWNrcyA9IHRydWU7XG4gIHRoaXMuZHJhZ1N0YXJ0KCBldmVudCwgcG9pbnRlciApO1xufTtcblxucHJvdG8uZHJhZ1N0YXJ0ID0gZnVuY3Rpb24oIGV2ZW50LCBwb2ludGVyICkge1xuICB0aGlzLmVtaXRFdmVudCggJ2RyYWdTdGFydCcsIFsgZXZlbnQsIHBvaW50ZXIgXSApO1xufTtcblxuLy8gZHJhZ01vdmVcbnByb3RvLl9kcmFnTW92ZSA9IGZ1bmN0aW9uKCBldmVudCwgcG9pbnRlciwgbW92ZVZlY3RvciApIHtcbiAgLy8gZG8gbm90IGRyYWcgaWYgbm90IGRyYWdnaW5nIHlldFxuICBpZiAoICF0aGlzLmlzRHJhZ2dpbmcgKSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgdGhpcy5kcmFnTW92ZSggZXZlbnQsIHBvaW50ZXIsIG1vdmVWZWN0b3IgKTtcbn07XG5cbnByb3RvLmRyYWdNb3ZlID0gZnVuY3Rpb24oIGV2ZW50LCBwb2ludGVyLCBtb3ZlVmVjdG9yICkge1xuICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICB0aGlzLmVtaXRFdmVudCggJ2RyYWdNb3ZlJywgWyBldmVudCwgcG9pbnRlciwgbW92ZVZlY3RvciBdICk7XG59O1xuXG4vLyBkcmFnRW5kXG5wcm90by5fZHJhZ0VuZCA9IGZ1bmN0aW9uKCBldmVudCwgcG9pbnRlciApIHtcbiAgLy8gc2V0IGZsYWdzXG4gIHRoaXMuaXNEcmFnZ2luZyA9IGZhbHNlO1xuICAvLyByZS1lbmFibGUgY2xpY2tpbmcgYXN5bmNcbiAgc2V0VGltZW91dCggZnVuY3Rpb24oKSB7XG4gICAgZGVsZXRlIHRoaXMuaXNQcmV2ZW50aW5nQ2xpY2tzO1xuICB9LmJpbmQoIHRoaXMgKSApO1xuXG4gIHRoaXMuZHJhZ0VuZCggZXZlbnQsIHBvaW50ZXIgKTtcbn07XG5cbnByb3RvLmRyYWdFbmQgPSBmdW5jdGlvbiggZXZlbnQsIHBvaW50ZXIgKSB7XG4gIHRoaXMuZW1pdEV2ZW50KCAnZHJhZ0VuZCcsIFsgZXZlbnQsIHBvaW50ZXIgXSApO1xufTtcblxuLy8gLS0tLS0gb25jbGljayAtLS0tLSAvL1xuXG4vLyBoYW5kbGUgYWxsIGNsaWNrcyBhbmQgcHJldmVudCBjbGlja3Mgd2hlbiBkcmFnZ2luZ1xucHJvdG8ub25jbGljayA9IGZ1bmN0aW9uKCBldmVudCApIHtcbiAgaWYgKCB0aGlzLmlzUHJldmVudGluZ0NsaWNrcyApIHtcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICB9XG59O1xuXG4vLyAtLS0tLSBzdGF0aWNDbGljayAtLS0tLSAvL1xuXG4vLyB0cmlnZ2VyZWQgYWZ0ZXIgcG9pbnRlciBkb3duICYgdXAgd2l0aCBuby90aW55IG1vdmVtZW50XG5wcm90by5fc3RhdGljQ2xpY2sgPSBmdW5jdGlvbiggZXZlbnQsIHBvaW50ZXIgKSB7XG4gIC8vIGlnbm9yZSBlbXVsYXRlZCBtb3VzZSB1cCBjbGlja3NcbiAgaWYgKCB0aGlzLmlzSWdub3JpbmdNb3VzZVVwICYmIGV2ZW50LnR5cGUgPT0gJ21vdXNldXAnICkge1xuICAgIHJldHVybjtcbiAgfVxuXG4gIHRoaXMuc3RhdGljQ2xpY2soIGV2ZW50LCBwb2ludGVyICk7XG5cbiAgLy8gc2V0IGZsYWcgZm9yIGVtdWxhdGVkIGNsaWNrcyAzMDBtcyBhZnRlciB0b3VjaGVuZFxuICBpZiAoIGV2ZW50LnR5cGUgIT0gJ21vdXNldXAnICkge1xuICAgIHRoaXMuaXNJZ25vcmluZ01vdXNlVXAgPSB0cnVlO1xuICAgIC8vIHJlc2V0IGZsYWcgYWZ0ZXIgMzAwbXNcbiAgICBzZXRUaW1lb3V0KCBmdW5jdGlvbigpIHtcbiAgICAgIGRlbGV0ZSB0aGlzLmlzSWdub3JpbmdNb3VzZVVwO1xuICAgIH0uYmluZCggdGhpcyApLCA0MDAgKTtcbiAgfVxufTtcblxucHJvdG8uc3RhdGljQ2xpY2sgPSBmdW5jdGlvbiggZXZlbnQsIHBvaW50ZXIgKSB7XG4gIHRoaXMuZW1pdEV2ZW50KCAnc3RhdGljQ2xpY2snLCBbIGV2ZW50LCBwb2ludGVyIF0gKTtcbn07XG5cbi8vIC0tLS0tIHV0aWxzIC0tLS0tIC8vXG5cblVuaWRyYWdnZXIuZ2V0UG9pbnRlclBvaW50ID0gVW5pcG9pbnRlci5nZXRQb2ludGVyUG9pbnQ7XG5cbi8vIC0tLS0tICAtLS0tLSAvL1xuXG5yZXR1cm4gVW5pZHJhZ2dlcjtcblxufSkpO1xuIiwiLyohXG4gKiBVbmlwb2ludGVyIHYyLjMuMFxuICogYmFzZSBjbGFzcyBmb3IgZG9pbmcgb25lIHRoaW5nIHdpdGggcG9pbnRlciBldmVudFxuICogTUlUIGxpY2Vuc2VcbiAqL1xuXG4vKmpzaGludCBicm93c2VyOiB0cnVlLCB1bmRlZjogdHJ1ZSwgdW51c2VkOiB0cnVlLCBzdHJpY3Q6IHRydWUgKi9cblxuKCBmdW5jdGlvbiggd2luZG93LCBmYWN0b3J5ICkge1xuICAvLyB1bml2ZXJzYWwgbW9kdWxlIGRlZmluaXRpb25cbiAgLyoganNoaW50IHN0cmljdDogZmFsc2UgKi8gLypnbG9iYWwgZGVmaW5lLCBtb2R1bGUsIHJlcXVpcmUgKi9cbiAgaWYgKCB0eXBlb2YgZGVmaW5lID09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZCApIHtcbiAgICAvLyBBTURcbiAgICBkZWZpbmUoIFtcbiAgICAgICdldi1lbWl0dGVyL2V2LWVtaXR0ZXInXG4gICAgXSwgZnVuY3Rpb24oIEV2RW1pdHRlciApIHtcbiAgICAgIHJldHVybiBmYWN0b3J5KCB3aW5kb3csIEV2RW1pdHRlciApO1xuICAgIH0pO1xuICB9IGVsc2UgaWYgKCB0eXBlb2YgbW9kdWxlID09ICdvYmplY3QnICYmIG1vZHVsZS5leHBvcnRzICkge1xuICAgIC8vIENvbW1vbkpTXG4gICAgbW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KFxuICAgICAgd2luZG93LFxuICAgICAgcmVxdWlyZSgnZXYtZW1pdHRlcicpXG4gICAgKTtcbiAgfSBlbHNlIHtcbiAgICAvLyBicm93c2VyIGdsb2JhbFxuICAgIHdpbmRvdy5Vbmlwb2ludGVyID0gZmFjdG9yeShcbiAgICAgIHdpbmRvdyxcbiAgICAgIHdpbmRvdy5FdkVtaXR0ZXJcbiAgICApO1xuICB9XG5cbn0oIHdpbmRvdywgZnVuY3Rpb24gZmFjdG9yeSggd2luZG93LCBFdkVtaXR0ZXIgKSB7XG5cbid1c2Ugc3RyaWN0JztcblxuZnVuY3Rpb24gbm9vcCgpIHt9XG5cbmZ1bmN0aW9uIFVuaXBvaW50ZXIoKSB7fVxuXG4vLyBpbmhlcml0IEV2RW1pdHRlclxudmFyIHByb3RvID0gVW5pcG9pbnRlci5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKCBFdkVtaXR0ZXIucHJvdG90eXBlICk7XG5cbnByb3RvLmJpbmRTdGFydEV2ZW50ID0gZnVuY3Rpb24oIGVsZW0gKSB7XG4gIHRoaXMuX2JpbmRTdGFydEV2ZW50KCBlbGVtLCB0cnVlICk7XG59O1xuXG5wcm90by51bmJpbmRTdGFydEV2ZW50ID0gZnVuY3Rpb24oIGVsZW0gKSB7XG4gIHRoaXMuX2JpbmRTdGFydEV2ZW50KCBlbGVtLCBmYWxzZSApO1xufTtcblxuLyoqXG4gKiBBZGQgb3IgcmVtb3ZlIHN0YXJ0IGV2ZW50XG4gKiBAcGFyYW0ge0Jvb2xlYW59IGlzQWRkIC0gcmVtb3ZlIGlmIGZhbHNleVxuICovXG5wcm90by5fYmluZFN0YXJ0RXZlbnQgPSBmdW5jdGlvbiggZWxlbSwgaXNBZGQgKSB7XG4gIC8vIG11bmdlIGlzQWRkLCBkZWZhdWx0IHRvIHRydWVcbiAgaXNBZGQgPSBpc0FkZCA9PT0gdW5kZWZpbmVkID8gdHJ1ZSA6IGlzQWRkO1xuICB2YXIgYmluZE1ldGhvZCA9IGlzQWRkID8gJ2FkZEV2ZW50TGlzdGVuZXInIDogJ3JlbW92ZUV2ZW50TGlzdGVuZXInO1xuXG4gIC8vIGRlZmF1bHQgdG8gbW91c2UgZXZlbnRzXG4gIHZhciBzdGFydEV2ZW50ID0gJ21vdXNlZG93bic7XG4gIGlmICggd2luZG93LlBvaW50ZXJFdmVudCApIHtcbiAgICAvLyBQb2ludGVyIEV2ZW50c1xuICAgIHN0YXJ0RXZlbnQgPSAncG9pbnRlcmRvd24nO1xuICB9IGVsc2UgaWYgKCAnb250b3VjaHN0YXJ0JyBpbiB3aW5kb3cgKSB7XG4gICAgLy8gVG91Y2ggRXZlbnRzLiBpT1MgU2FmYXJpXG4gICAgc3RhcnRFdmVudCA9ICd0b3VjaHN0YXJ0JztcbiAgfVxuICBlbGVtWyBiaW5kTWV0aG9kIF0oIHN0YXJ0RXZlbnQsIHRoaXMgKTtcbn07XG5cbi8vIHRyaWdnZXIgaGFuZGxlciBtZXRob2RzIGZvciBldmVudHNcbnByb3RvLmhhbmRsZUV2ZW50ID0gZnVuY3Rpb24oIGV2ZW50ICkge1xuICB2YXIgbWV0aG9kID0gJ29uJyArIGV2ZW50LnR5cGU7XG4gIGlmICggdGhpc1sgbWV0aG9kIF0gKSB7XG4gICAgdGhpc1sgbWV0aG9kIF0oIGV2ZW50ICk7XG4gIH1cbn07XG5cbi8vIHJldHVybnMgdGhlIHRvdWNoIHRoYXQgd2UncmUga2VlcGluZyB0cmFjayBvZlxucHJvdG8uZ2V0VG91Y2ggPSBmdW5jdGlvbiggdG91Y2hlcyApIHtcbiAgZm9yICggdmFyIGk9MDsgaSA8IHRvdWNoZXMubGVuZ3RoOyBpKysgKSB7XG4gICAgdmFyIHRvdWNoID0gdG91Y2hlc1tpXTtcbiAgICBpZiAoIHRvdWNoLmlkZW50aWZpZXIgPT0gdGhpcy5wb2ludGVySWRlbnRpZmllciApIHtcbiAgICAgIHJldHVybiB0b3VjaDtcbiAgICB9XG4gIH1cbn07XG5cbi8vIC0tLS0tIHN0YXJ0IGV2ZW50IC0tLS0tIC8vXG5cbnByb3RvLm9ubW91c2Vkb3duID0gZnVuY3Rpb24oIGV2ZW50ICkge1xuICAvLyBkaXNtaXNzIGNsaWNrcyBmcm9tIHJpZ2h0IG9yIG1pZGRsZSBidXR0b25zXG4gIHZhciBidXR0b24gPSBldmVudC5idXR0b247XG4gIGlmICggYnV0dG9uICYmICggYnV0dG9uICE9PSAwICYmIGJ1dHRvbiAhPT0gMSApICkge1xuICAgIHJldHVybjtcbiAgfVxuICB0aGlzLl9wb2ludGVyRG93biggZXZlbnQsIGV2ZW50ICk7XG59O1xuXG5wcm90by5vbnRvdWNoc3RhcnQgPSBmdW5jdGlvbiggZXZlbnQgKSB7XG4gIHRoaXMuX3BvaW50ZXJEb3duKCBldmVudCwgZXZlbnQuY2hhbmdlZFRvdWNoZXNbMF0gKTtcbn07XG5cbnByb3RvLm9ucG9pbnRlcmRvd24gPSBmdW5jdGlvbiggZXZlbnQgKSB7XG4gIHRoaXMuX3BvaW50ZXJEb3duKCBldmVudCwgZXZlbnQgKTtcbn07XG5cbi8qKlxuICogcG9pbnRlciBzdGFydFxuICogQHBhcmFtIHtFdmVudH0gZXZlbnRcbiAqIEBwYXJhbSB7RXZlbnQgb3IgVG91Y2h9IHBvaW50ZXJcbiAqL1xucHJvdG8uX3BvaW50ZXJEb3duID0gZnVuY3Rpb24oIGV2ZW50LCBwb2ludGVyICkge1xuICAvLyBkaXNtaXNzIHJpZ2h0IGNsaWNrIGFuZCBvdGhlciBwb2ludGVyc1xuICAvLyBidXR0b24gPSAwIGlzIG9rYXksIDEtNCBub3RcbiAgaWYgKCBldmVudC5idXR0b24gfHwgdGhpcy5pc1BvaW50ZXJEb3duICkge1xuICAgIHJldHVybjtcbiAgfVxuXG4gIHRoaXMuaXNQb2ludGVyRG93biA9IHRydWU7XG4gIC8vIHNhdmUgcG9pbnRlciBpZGVudGlmaWVyIHRvIG1hdGNoIHVwIHRvdWNoIGV2ZW50c1xuICB0aGlzLnBvaW50ZXJJZGVudGlmaWVyID0gcG9pbnRlci5wb2ludGVySWQgIT09IHVuZGVmaW5lZCA/XG4gICAgLy8gcG9pbnRlcklkIGZvciBwb2ludGVyIGV2ZW50cywgdG91Y2guaW5kZW50aWZpZXIgZm9yIHRvdWNoIGV2ZW50c1xuICAgIHBvaW50ZXIucG9pbnRlcklkIDogcG9pbnRlci5pZGVudGlmaWVyO1xuXG4gIHRoaXMucG9pbnRlckRvd24oIGV2ZW50LCBwb2ludGVyICk7XG59O1xuXG5wcm90by5wb2ludGVyRG93biA9IGZ1bmN0aW9uKCBldmVudCwgcG9pbnRlciApIHtcbiAgdGhpcy5fYmluZFBvc3RTdGFydEV2ZW50cyggZXZlbnQgKTtcbiAgdGhpcy5lbWl0RXZlbnQoICdwb2ludGVyRG93bicsIFsgZXZlbnQsIHBvaW50ZXIgXSApO1xufTtcblxuLy8gaGFzaCBvZiBldmVudHMgdG8gYmUgYm91bmQgYWZ0ZXIgc3RhcnQgZXZlbnRcbnZhciBwb3N0U3RhcnRFdmVudHMgPSB7XG4gIG1vdXNlZG93bjogWyAnbW91c2Vtb3ZlJywgJ21vdXNldXAnIF0sXG4gIHRvdWNoc3RhcnQ6IFsgJ3RvdWNobW92ZScsICd0b3VjaGVuZCcsICd0b3VjaGNhbmNlbCcgXSxcbiAgcG9pbnRlcmRvd246IFsgJ3BvaW50ZXJtb3ZlJywgJ3BvaW50ZXJ1cCcsICdwb2ludGVyY2FuY2VsJyBdLFxufTtcblxucHJvdG8uX2JpbmRQb3N0U3RhcnRFdmVudHMgPSBmdW5jdGlvbiggZXZlbnQgKSB7XG4gIGlmICggIWV2ZW50ICkge1xuICAgIHJldHVybjtcbiAgfVxuICAvLyBnZXQgcHJvcGVyIGV2ZW50cyB0byBtYXRjaCBzdGFydCBldmVudFxuICB2YXIgZXZlbnRzID0gcG9zdFN0YXJ0RXZlbnRzWyBldmVudC50eXBlIF07XG4gIC8vIGJpbmQgZXZlbnRzIHRvIG5vZGVcbiAgZXZlbnRzLmZvckVhY2goIGZ1bmN0aW9uKCBldmVudE5hbWUgKSB7XG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoIGV2ZW50TmFtZSwgdGhpcyApO1xuICB9LCB0aGlzICk7XG4gIC8vIHNhdmUgdGhlc2UgYXJndW1lbnRzXG4gIHRoaXMuX2JvdW5kUG9pbnRlckV2ZW50cyA9IGV2ZW50cztcbn07XG5cbnByb3RvLl91bmJpbmRQb3N0U3RhcnRFdmVudHMgPSBmdW5jdGlvbigpIHtcbiAgLy8gY2hlY2sgZm9yIF9ib3VuZEV2ZW50cywgaW4gY2FzZSBkcmFnRW5kIHRyaWdnZXJlZCB0d2ljZSAob2xkIElFOCBidWcpXG4gIGlmICggIXRoaXMuX2JvdW5kUG9pbnRlckV2ZW50cyApIHtcbiAgICByZXR1cm47XG4gIH1cbiAgdGhpcy5fYm91bmRQb2ludGVyRXZlbnRzLmZvckVhY2goIGZ1bmN0aW9uKCBldmVudE5hbWUgKSB7XG4gICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoIGV2ZW50TmFtZSwgdGhpcyApO1xuICB9LCB0aGlzICk7XG5cbiAgZGVsZXRlIHRoaXMuX2JvdW5kUG9pbnRlckV2ZW50cztcbn07XG5cbi8vIC0tLS0tIG1vdmUgZXZlbnQgLS0tLS0gLy9cblxucHJvdG8ub25tb3VzZW1vdmUgPSBmdW5jdGlvbiggZXZlbnQgKSB7XG4gIHRoaXMuX3BvaW50ZXJNb3ZlKCBldmVudCwgZXZlbnQgKTtcbn07XG5cbnByb3RvLm9ucG9pbnRlcm1vdmUgPSBmdW5jdGlvbiggZXZlbnQgKSB7XG4gIGlmICggZXZlbnQucG9pbnRlcklkID09IHRoaXMucG9pbnRlcklkZW50aWZpZXIgKSB7XG4gICAgdGhpcy5fcG9pbnRlck1vdmUoIGV2ZW50LCBldmVudCApO1xuICB9XG59O1xuXG5wcm90by5vbnRvdWNobW92ZSA9IGZ1bmN0aW9uKCBldmVudCApIHtcbiAgdmFyIHRvdWNoID0gdGhpcy5nZXRUb3VjaCggZXZlbnQuY2hhbmdlZFRvdWNoZXMgKTtcbiAgaWYgKCB0b3VjaCApIHtcbiAgICB0aGlzLl9wb2ludGVyTW92ZSggZXZlbnQsIHRvdWNoICk7XG4gIH1cbn07XG5cbi8qKlxuICogcG9pbnRlciBtb3ZlXG4gKiBAcGFyYW0ge0V2ZW50fSBldmVudFxuICogQHBhcmFtIHtFdmVudCBvciBUb3VjaH0gcG9pbnRlclxuICogQHByaXZhdGVcbiAqL1xucHJvdG8uX3BvaW50ZXJNb3ZlID0gZnVuY3Rpb24oIGV2ZW50LCBwb2ludGVyICkge1xuICB0aGlzLnBvaW50ZXJNb3ZlKCBldmVudCwgcG9pbnRlciApO1xufTtcblxuLy8gcHVibGljXG5wcm90by5wb2ludGVyTW92ZSA9IGZ1bmN0aW9uKCBldmVudCwgcG9pbnRlciApIHtcbiAgdGhpcy5lbWl0RXZlbnQoICdwb2ludGVyTW92ZScsIFsgZXZlbnQsIHBvaW50ZXIgXSApO1xufTtcblxuLy8gLS0tLS0gZW5kIGV2ZW50IC0tLS0tIC8vXG5cblxucHJvdG8ub25tb3VzZXVwID0gZnVuY3Rpb24oIGV2ZW50ICkge1xuICB0aGlzLl9wb2ludGVyVXAoIGV2ZW50LCBldmVudCApO1xufTtcblxucHJvdG8ub25wb2ludGVydXAgPSBmdW5jdGlvbiggZXZlbnQgKSB7XG4gIGlmICggZXZlbnQucG9pbnRlcklkID09IHRoaXMucG9pbnRlcklkZW50aWZpZXIgKSB7XG4gICAgdGhpcy5fcG9pbnRlclVwKCBldmVudCwgZXZlbnQgKTtcbiAgfVxufTtcblxucHJvdG8ub250b3VjaGVuZCA9IGZ1bmN0aW9uKCBldmVudCApIHtcbiAgdmFyIHRvdWNoID0gdGhpcy5nZXRUb3VjaCggZXZlbnQuY2hhbmdlZFRvdWNoZXMgKTtcbiAgaWYgKCB0b3VjaCApIHtcbiAgICB0aGlzLl9wb2ludGVyVXAoIGV2ZW50LCB0b3VjaCApO1xuICB9XG59O1xuXG4vKipcbiAqIHBvaW50ZXIgdXBcbiAqIEBwYXJhbSB7RXZlbnR9IGV2ZW50XG4gKiBAcGFyYW0ge0V2ZW50IG9yIFRvdWNofSBwb2ludGVyXG4gKiBAcHJpdmF0ZVxuICovXG5wcm90by5fcG9pbnRlclVwID0gZnVuY3Rpb24oIGV2ZW50LCBwb2ludGVyICkge1xuICB0aGlzLl9wb2ludGVyRG9uZSgpO1xuICB0aGlzLnBvaW50ZXJVcCggZXZlbnQsIHBvaW50ZXIgKTtcbn07XG5cbi8vIHB1YmxpY1xucHJvdG8ucG9pbnRlclVwID0gZnVuY3Rpb24oIGV2ZW50LCBwb2ludGVyICkge1xuICB0aGlzLmVtaXRFdmVudCggJ3BvaW50ZXJVcCcsIFsgZXZlbnQsIHBvaW50ZXIgXSApO1xufTtcblxuLy8gLS0tLS0gcG9pbnRlciBkb25lIC0tLS0tIC8vXG5cbi8vIHRyaWdnZXJlZCBvbiBwb2ludGVyIHVwICYgcG9pbnRlciBjYW5jZWxcbnByb3RvLl9wb2ludGVyRG9uZSA9IGZ1bmN0aW9uKCkge1xuICB0aGlzLl9wb2ludGVyUmVzZXQoKTtcbiAgdGhpcy5fdW5iaW5kUG9zdFN0YXJ0RXZlbnRzKCk7XG4gIHRoaXMucG9pbnRlckRvbmUoKTtcbn07XG5cbnByb3RvLl9wb2ludGVyUmVzZXQgPSBmdW5jdGlvbigpIHtcbiAgLy8gcmVzZXQgcHJvcGVydGllc1xuICB0aGlzLmlzUG9pbnRlckRvd24gPSBmYWxzZTtcbiAgZGVsZXRlIHRoaXMucG9pbnRlcklkZW50aWZpZXI7XG59O1xuXG5wcm90by5wb2ludGVyRG9uZSA9IG5vb3A7XG5cbi8vIC0tLS0tIHBvaW50ZXIgY2FuY2VsIC0tLS0tIC8vXG5cbnByb3RvLm9ucG9pbnRlcmNhbmNlbCA9IGZ1bmN0aW9uKCBldmVudCApIHtcbiAgaWYgKCBldmVudC5wb2ludGVySWQgPT0gdGhpcy5wb2ludGVySWRlbnRpZmllciApIHtcbiAgICB0aGlzLl9wb2ludGVyQ2FuY2VsKCBldmVudCwgZXZlbnQgKTtcbiAgfVxufTtcblxucHJvdG8ub250b3VjaGNhbmNlbCA9IGZ1bmN0aW9uKCBldmVudCApIHtcbiAgdmFyIHRvdWNoID0gdGhpcy5nZXRUb3VjaCggZXZlbnQuY2hhbmdlZFRvdWNoZXMgKTtcbiAgaWYgKCB0b3VjaCApIHtcbiAgICB0aGlzLl9wb2ludGVyQ2FuY2VsKCBldmVudCwgdG91Y2ggKTtcbiAgfVxufTtcblxuLyoqXG4gKiBwb2ludGVyIGNhbmNlbFxuICogQHBhcmFtIHtFdmVudH0gZXZlbnRcbiAqIEBwYXJhbSB7RXZlbnQgb3IgVG91Y2h9IHBvaW50ZXJcbiAqIEBwcml2YXRlXG4gKi9cbnByb3RvLl9wb2ludGVyQ2FuY2VsID0gZnVuY3Rpb24oIGV2ZW50LCBwb2ludGVyICkge1xuICB0aGlzLl9wb2ludGVyRG9uZSgpO1xuICB0aGlzLnBvaW50ZXJDYW5jZWwoIGV2ZW50LCBwb2ludGVyICk7XG59O1xuXG4vLyBwdWJsaWNcbnByb3RvLnBvaW50ZXJDYW5jZWwgPSBmdW5jdGlvbiggZXZlbnQsIHBvaW50ZXIgKSB7XG4gIHRoaXMuZW1pdEV2ZW50KCAncG9pbnRlckNhbmNlbCcsIFsgZXZlbnQsIHBvaW50ZXIgXSApO1xufTtcblxuLy8gLS0tLS0gIC0tLS0tIC8vXG5cbi8vIHV0aWxpdHkgZnVuY3Rpb24gZm9yIGdldHRpbmcgeC95IGNvb3JkcyBmcm9tIGV2ZW50XG5Vbmlwb2ludGVyLmdldFBvaW50ZXJQb2ludCA9IGZ1bmN0aW9uKCBwb2ludGVyICkge1xuICByZXR1cm4ge1xuICAgIHg6IHBvaW50ZXIucGFnZVgsXG4gICAgeTogcG9pbnRlci5wYWdlWVxuICB9O1xufTtcblxuLy8gLS0tLS0gIC0tLS0tIC8vXG5cbnJldHVybiBVbmlwb2ludGVyO1xuXG59KSk7XG4iLCIoZnVuY3Rpb24gKCkge1xuXG4gICAgdmFyIEZsaWNraXR5ICAgICAgICA9IHJlcXVpcmUoJ2ZsaWNraXR5JyksXG4gICAgQ2Fyb3VzZWxzXG5cbiAgICBDYXJvdXNlbHMgPSB7XG5cbiAgICAgICAgaW5pdDogKCkgPT4ge1xuXG4gICAgICAgICAgICBDYXJvdXNlbHMuaW5pdGlhbGlzZUNhcm91c2VsKClcblxuICAgICAgICB9LFxuXG4gICAgICAgIGluaXRpYWxpc2VDYXJvdXNlbCAgOiAoKSA9PiB7XG5cbiAgICAgICAgICAgIHZhciBjYXJvdXNlbHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuSlMtLWNhcm91c2VsJylcblxuICAgICAgICAgICAgY2Fyb3VzZWxzLmZvckVhY2goY2Fyb3VzZWwgPT4ge1xuXG4gICAgICAgICAgICAgICAgdmFyIHNldHRpbmdzID0ge1xuICAgICAgICAgICAgICAgICAgICAgICAgY2VsbEFsaWduICAgOiAnY2VudGVyJywgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgIHdyYXBBcm91bmQgIDogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGF1dG9QbGF5ICAgIDogZmFsc2UsXG4gICAgICAgICAgICAgICAgICAgICAgICBpbWFnZXNMb2FkZWQ6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICBwYWdlRG90cyAgICA6IGZhbHNlXG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHZhciBzbGlkZXMgPSBjYXJvdXNlbC5xdWVyeVNlbGVjdG9yQWxsKCcuSlMtLWNhcm91c2VsX19zbGlkZVdyYXAnKVxuXG4gICAgICAgICAgICAgICAgaWYoY2Fyb3VzZWwuZGF0YXNldC5wbG90Q2Fyb3VzZWxUeXBlID09ICdpbWFnZScpIHtcbiAgICAgICAgICAgICAgICAgICAgc2V0dGluZ3MgPSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjZWxsQWxpZ24gICA6ICdjZW50ZXInLCAgXG4gICAgICAgICAgICAgICAgICAgICAgICBsYXp5TG9hZCA6IDIsXG4gICAgICAgICAgICAgICAgICAgICAgICB3cmFwQXJvdW5kICA6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICBwYWdlRG90cyA6IGZhbHNlXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZihzbGlkZXMubGVuZ3RoID4gMSkge1xuXG4gICAgICAgICAgICAgICAgICAgIHZhciBmbGt0eSA9IG5ldyBGbGlja2l0eShjYXJvdXNlbCwgc2V0dGluZ3MpXG5cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBcbiAgICAgICAgfSxcblxuICAgIH1cblxuICAgIG1vZHVsZS5leHBvcnRzID0gQ2Fyb3VzZWxzXG5cbn0oKSlcbiIsIihmdW5jdGlvbiAoKSB7XG5cbiAgICB2YXIgRkFRc1xuXG4gICAgRkFRcyA9IHtcbiAgICAgICAgc2VjdGlvbnM6IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5mYXFzJyksXG5cbiAgICAgICAgaW5pdDogKCkgPT4ge1xuXG4gICAgICAgICAgICBpZighRkFRcy5zZWN0aW9ucylcbiAgICAgICAgICAgICAgICByZXR1cm5cblxuICAgICAgICAgICAgRkFRcy5zZWN0aW9ucy5mb3JFYWNoKHNlY3Rpb24gPT4gRkFRcy5pbml0aWFsaXNlTGlzdGVuZXJzKHNlY3Rpb24pKVxuXG4gICAgICAgIH0sXG5cbiAgICAgICAgaW5pdGlhbGlzZUxpc3RlbmVyczogKHNlY3Rpb24pID0+IHtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgbGV0IGZhcXMgPSBzZWN0aW9uLnF1ZXJ5U2VsZWN0b3JBbGwoJy5mYXEnKVxuXG4gICAgICAgICAgICBmYXFzLmZvckVhY2goZmFxID0+IHtcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICBsZXQgcXVlc3Rpb24gPSBmYXEucXVlcnlTZWxlY3RvcignLmZhcV9fcXVlc3Rpb24nKVxuICAgICAgICAgICAgICAgIGxldCBhbnN3ZXIgICA9IGZhcS5xdWVyeVNlbGVjdG9yKCcuZmFxX19hbnN3ZXInKVxuXG4gICAgICAgICAgICAgICAgcXVlc3Rpb24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG5cbiAgICAgICAgICAgICAgICAgICAgZmFxLmNsYXNzTGlzdC50b2dnbGUoJ2ZhcS0tb3BlbicpXG5cbiAgICAgICAgICAgICAgICAgICAgaWYoZmFxLmNsYXNzTGlzdC5jb250YWlucygnZmFxLS1vcGVuJykpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGFuc3dlci5zdHlsZS5tYXhIZWlnaHQgPSBhbnN3ZXIuc2Nyb2xsSGVpZ2h0ICsgJ3B4J1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgYW5zd2VyLnN0eWxlLm1heEhlaWdodCA9IDBcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgXG5cbiAgICAgICAgICAgICAgICB9KVxuXG4gICAgICAgICAgICB9KVxuICAgICAgICB9XG5cblxuICAgIH1cblxuICAgIG1vZHVsZS5leHBvcnRzID0gRkFRc1xuXG59KCkpXG4iLCIvLyBMYXp5TG9hZCBmb3IgUGxvdCBieSBKb24gTWlsbHMsIE1hdHR5IEdsZW4gJiBNaWNoYWVsIFdhdHNvblxuXG4vLyBUaGlzIG1vZHVsZSBsb2FkcyBpbiBpbWFnZXMgYXN5bmNyb25vdXNseS4gSXQgd2lsbCBsb29rIGZvciB0aGUgY2xhc3Ncbi8vIFwiSlMtLWxhenlMb2FkXCIgYW5kIHRoZW4gbG9vayBmb3IgYSBkYXRhLXNyYyBvbiBpbWFnZSBvciB2aWRlbyB0YWdzLiBcbi8vIEl0IHdpbGwgdGhlbiByZXBsYWNlIHRoZSBzcmMgb2YgdGhhdCBlbGVtZW50IHdpdGggdGhlIGltYWdlIGxpbmtlZCBvblxuLy8gdGhlIGRhdGEgYXR0cmlidXRlLlxuXG4vLyBJZiB0aGUgZWxlbWVudCBpcyBub3QgYW4gaW1hZ2Ugb3IgYSB2aWRlby0gaXQgd2lsbCBhc3NpZ24gdGhlIGRhdGEtc3JjXG4vLyBhcyBhIGJhY2tncm91bmQgaW1hZ2UuIFxuXG4vLyBJZiB0aGUgc2NyZWVuIHNpemUgaXMgbGVzcyB0aGFuIHRoZSBkZWZpbmVkIG1vYmlsZUJyZWFrcG9pbnQsIHdlIGxvYWRcbi8vIHRoZSBzcmMgZnJvbSBkYXRhLXNtYWxsLXNyYyBpbnN0ZWFkLiBcblxuLy8gQ3JlYXRpb24gb2YgdGhlc2UgdmlkZW8gYW5kIGltYWdlIG9iamVjdHMgY2FuIGJlIG1hZGUgdXNpbmcgdGhlIFBIUFxuLy8gaGVscGVyIGluIGxpYi9oZWxwZXJzLnBocCBwbG90TGF6eUxvYWQoKVxuXG4vLyBJZiB3ZSBuZWVkIHRvIHN0aXB1bGF0ZSB0aGUgaGVpZ2h0IG9mIGFuIGltYWdlIGJlZm9yZSBpdCBsb2FkcywgdG8gYXZvaWRcbi8vIGFueSBqdW1waW5lc3MsIHdlIGNhbiBwYXNzIHRocm91Z2ggYSByYXRpbyAody9oKSBvZiB0aGUgaW1hZ2Ugc28gaXQnc1xuLy8gc2V0IGJlZm9yZSB0aGUgaW1hZ2UgbG9hZHMuXG5cbi8vIFdlIGFsc28gaGFuZGxlIGF1dG9wbGF5aW5nIHZpZGVvcywgaWYgdGhlIHZpZGVvIGhhcyBhbiBhdXRvcGxheSBhdHRyaWJ1dGUuXG4vLyBJdCB3aWxsIHBhdXNlIGFuZCBwbGF5IHZpZGVvcyBhcHByb3ByaWF0ZWx5IGRlcGVuZGluZyBvbiBpZiB0aGV5J3JlIGluXG4vLyB2aWV3IG9yIG5vdC5cblxuKGZ1bmN0aW9uKCl7XG5cbiAgICB2YXIgTGF6eUxvYWRcblxuICAgIExhenlMb2FkID0ge1xuICAgICAgICBtb2JpbGVCcmVha3BvaW50IDogNjQwLFxuICAgICAgICBpbWFnZXMgOiAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLkpTLS1sYXp5TG9hZCcpLFxuICAgICAgICBjb25maWcgOiB7XG4gICAgICAgICAgICByb290TWFyZ2luOiAnMHB4JyxcbiAgICAgICAgICAgIHRocmVzaG9sZDogMC4wMVxuICAgICAgICB9LFxuICAgICAgICBvYnNlcnZlciA6IG51bGwsXG4gICAgICAgIGluaXQgOiBmdW5jdGlvbigpeyBcblxuICAgICAgICAgICAgTGF6eUxvYWQub2JzZXJ2ZXIgPSBuZXcgSW50ZXJzZWN0aW9uT2JzZXJ2ZXIoTGF6eUxvYWQuaGFuZGxlSW1hZ2VMb2FkLCBMYXp5TG9hZC5jb25maWcpXG5cbiAgICAgICAgICAgIExhenlMb2FkLmxvYWRJbWFnZXMoKVxuICAgICAgICAgICAgXG4gICAgICAgIH0sXG5cbiAgICAgICAgbG9hZEltYWdlcyA6ICgpID0+IHsgXG5cbiAgICAgICAgICAgIExhenlMb2FkLmltYWdlcy5mb3JFYWNoKCBpbWFnZSA9PiB7ICBcblxuICAgICAgICAgICAgICAgIExhenlMb2FkLm9ic2VydmVyLm9ic2VydmUoaW1hZ2UpXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIFxuICAgICAgICB9LFxuXG4gICAgICAgIGFkZEVsZW1lbnRzIDogZWxlbWVudHMgPT4ge1xuXG4gICAgICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSxyZWplY3Qpe1xuXG4gICAgICAgICAgICAgICAgZWxlbWVudHMuZm9yRWFjaCggaW1hZ2UgPT4geyAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgTGF6eUxvYWQub2JzZXJ2ZXIub2JzZXJ2ZShpbWFnZSlcbiAgICAgICAgICAgICAgICB9KVxuXG4gICAgICAgICAgICAgICAgcmVzb2x2ZSgpXG5cbiAgICAgICAgICAgIH0pXG4gICAgICAgIH0sXG5cbiAgICAgICAgaGFuZGxlSW1hZ2VMb2FkIDogZW50cmllcyA9PiB7ICAgICAgICAgICAgICAgICAgICAgICAgXG5cbiAgICAgICAgICAgIGVudHJpZXMuZm9yRWFjaCggZW50cnkgPT4ge1xuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIGxldCBlbGVtZW50ID0gZW50cnkudGFyZ2V0XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgaWYoIWVsZW1lbnQuY2xhc3NMaXN0LmNvbnRhaW5zKCdsb2FkZWQnKSAmJiAhZWxlbWVudC5jbGFzc0xpc3QuY29udGFpbnMoJ2xvYWRpbmcnKSkgeyBcblxuICAgICAgICAgICAgICAgICAgICBpZighZW50cnkuaXNJbnRlcnNlY3RpbmcpXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm5cbiAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgIGVsZW1lbnQuY2xhc3NMaXN0LmFkZCgnbG9hZGluZycpXG5cbiAgICAgICAgICAgICAgICAgICAgdmFyIHRhZyA9IGVudHJ5LmlzSW50ZXJzZWN0aW5nICYmIGVsZW1lbnQudGFnTmFtZVxuXG4gICAgICAgICAgICAgICAgICAgIGxldCBzcmMgPSBlbGVtZW50LmRhdGFzZXQuc3JjXG5cbiAgICAgICAgICAgICAgICAgICAgaWYoTGF6eUxvYWQuaXNTbWFsbFNjcmVlbigpICYmIGVsZW1lbnQuZGF0YXNldC5zbWFsbFNyYykge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBzcmMgPSBlbGVtZW50LmRhdGFzZXQuc21hbGxTcmNcblxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICBpZih0YWcgPT0gXCJWSURFT1wiKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKExhenlMb2FkLmlzU21hbGxTY3JlZW4oKSAmJiBlbGVtZW50LmRhdGFzZXQuc21hbGxTcmMpIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsZW1lbnQuc3JjID0gZWxlbWVudC5kYXRhc2V0LnNtYWxsU3JjXG5cbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxlbWVudC5zcmMgPSBlbGVtZW50LmRhdGFzZXQuc3JjXG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYoZWxlbWVudC5nZXRBdHRyaWJ1dGUoJ2F1dG9wbGF5JykpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbGVtZW50LnBsYXkoKVxuICAgICAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICBlbGVtZW50LmNsYXNzTGlzdC5hZGQoJ2xvYWRlZCcpXG5cbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgTGF6eUxvYWQuZ2V0SW1hZ2Uoc3JjLCBlbGVtZW50KS50aGVuKCBkYXRhID0+IHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCB0YWcgPSBlbGVtZW50LnRhZ05hbWVcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKHRhZyA9PSBcIklNR1wiKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0YS5lbGVtZW50LnNyYyA9IGRhdGEuc3JjXG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGEuZWxlbWVudC5zdHlsZS5iYWNrZ3JvdW5kSW1hZ2UgPSAndXJsKCcgKyBkYXRhLnNyYyArICcpJ1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0YS5lbGVtZW50LmNsYXNzTGlzdC5hZGQoJ2xvYWRlZCcpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0YS5lbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoJ2xvYWRpbmcnKVxuXG4gICAgICAgICAgICAgICAgICAgICAgICB9KS5jYXRjaCggZXJyb3JlZFNyYyA9PntcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycm9yZWRTcmMsICdpbWFnZSBub3QgZm91bmQnKVxuXG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxuXG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYoZWxlbWVudC50YWdOYW1lID09IFwiVklERU9cIikgXG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKGVsZW1lbnQuZ2V0QXR0cmlidXRlKCdhdXRvcGxheScpKSBcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKCFlbnRyeS5pc0ludGVyc2VjdGluZyAmJiBlbGVtZW50LnBhdXNlZCA9PSBmYWxzZSkgXG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxlbWVudC5wYXVzZSgpXG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlXG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxlbWVudC5wbGF5KClcblxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgfSlcbiAgICAgICAgfSxcblxuICAgICAgICBnZXRJbWFnZTogKHNyYywgZWxlbWVudCkgPT4ge1xuXG4gICAgICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSxyZWplY3Qpe1xuXG4gICAgICAgICAgICAgICAgdmFyIGltZyA9IG5ldyBJbWFnZSgpXG5cbiAgICAgICAgICAgICAgICBpbWcub25sb2FkID0gKCkgPT4ge1xuXG4gICAgICAgICAgICAgICAgICAgIHJlc29sdmUoe1xuICAgICAgICAgICAgICAgICAgICAgICAgc3JjOiBzcmMsXG4gICAgICAgICAgICAgICAgICAgICAgICBlbGVtZW50OiBlbGVtZW50XG4gICAgICAgICAgICAgICAgICAgIH0pXG5cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpbWcub25lcnJvciA9ICgpID0+IHtcblxuICAgICAgICAgICAgICAgICAgICByZWplY3Qoe1xuICAgICAgICAgICAgICAgICAgICAgICAgc3JjOiBzcmMsXG4gICAgICAgICAgICAgICAgICAgICAgICBlbGVtZW50OiBlbGVtZW50XG4gICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaW1nLnNyYyA9IHNyY1xuICAgICAgICAgICAgfSlcblxuICAgICAgICB9LFxuXG4gICAgICAgIGlzU21hbGxTY3JlZW4gOiAoKSA9PiB7XG5cbiAgICAgICAgICAgIGlmKHdpbmRvdy5pbm5lcldpZHRoIDwgTGF6eUxvYWQubW9iaWxlQnJlYWtwb2ludClcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZVxuICAgICAgICAgICAgXG5cbiAgICAgICAgICAgIHJldHVybiBmYWxzZVxuXG4gICAgICAgIH1cblxuXG4gICAgfVxuXG4gICAgbW9kdWxlLmV4cG9ydHMgPSBMYXp5TG9hZFxuXG59KSgpXG5cbiIsIi8vIE1vZGFscyBmb3IgUGxvdCBieSBNaWNoYWVsIFdhdHNvblxuLy8gQSBzaW1wbGUgbW9kYWxzIHNvbHV0aW9uIHRoYXQgbG9va3MgZm9yIHRoZSBjbGFzcyBcIkpTLS1wbG90TW9kYWxCdXR0b25cIlxuLy8gQW5kIHdoZW4gY2xpY2tlZCwgcmVhZHMgdGhlIHZhbHVlIHNldCBvbiBkYXRhLXBsb3QtbW9kYWwuIGl0IHRoZW4gbG9va3Ncbi8vIGZvciBhbiBIVE1MIGVsZW1lbnQgY2FsbGVkIFwiLkpTLS1wbG90TW9kYWxDb250ZW50c1wiIHdpdGggYSBjb3JyZXNwb25kaW5nIHZhbHVlLlxuXG4vLyBGb3IgZXhhbXBsZSwgPGEgY2xhc3M9XCJKUy0tcGxvdE1vZGFsQnV0dG9uXCIgZGF0YS1wbG90LW1vZGFsPVwiMVwiPkNsaWNrIG1lPC9hPlxuLy8gV2lsbCBmaW5kIHRoZSBmb2xsb3dpbmcgZWxlbWVudDpcbi8vIDxkaXYgY2xhc3M9XCJKUy0tcGxvdE1vZGFsQ29udGVudHNcIj5JIGFtIHNvbWUgbW9kYWwgY29udGVudCE8L2Rpdj5cbi8vIEFuZCB3aWxsIHRha2UgdGhlIGlubmVySFRNTCB0byBwdXQgaW5zaWRlIGEgbW9kYWwgb24gdGhlIHNjcmVlbi5cblxuLy8gR2FsbGVyaWVzIGNhbiBiZSBjcmVhdGVkIGJ5IGNvbm5lY3RpbmcgbXVsdGlwbGUgUGxvdCBNb2RhbCBCdXR0b25zXG4vLyBieSBnaXZpbmcgdGhlbSBhIGRhdGEtcGxvdC1tb2RhbC1ncm91cCBvcHRpb24uXG4vLyBUaGV5IHdpbGwgdGhlbiBoYXZlIHdvcmtpbmcgbGVmdCBhbmQgcmlnaHQgYXJyb3dzIHRvIG5hdmlnYXRlIHRocm91Z2hcbi8vIENvbnRlbnRzIGluIGEgbG9vcC5cblxuKGZ1bmN0aW9uICgpIHtcblxuICAgIHZhciBMYXp5TG9hZCAgICAgICAgID0gcmVxdWlyZSgnLi9sYXp5bG9hZCcpLCAgXG4gICAgICAgIFBsb3QgICAgICAgICAgICAgPSByZXF1aXJlKCcuL3Bsb3QnKSxcbiAgICAgICAgQm9keVNjcm9sbExvY2sgICA9IHJlcXVpcmUoJ2JvZHktc2Nyb2xsLWxvY2snKSxcbiAgICAgICAgTW9kYWxzXG5cbiAgICBNb2RhbHMgPSB7XG4gICAgICAgIGN1cnJlbnRHcm91cEl0ZW0gICAgOiAwLFxuICAgICAgICBncm91cExpbmtzICAgICAgICAgIDogW10sICBcbiAgICAgICAgY3VycmVudE1vZGFsSWQgICAgICA6IG51bGwsXG4gICAgICAgIGlzT3BlbiAgICAgICAgICAgICAgOiBmYWxzZSxcbiAgICAgICAgaXNMb2FkaW5nICAgICAgICAgICA6IGZhbHNlLFxuICAgICAgICBjb250cm9sc1RpbWVyICAgICAgIDogZmFsc2UsXG4gICAgICAgIG1vZGFsQ29udGVudCAgICAgICAgOiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuSlMtLXBsb3RNb2RhbFJlcGxhY2VDb250ZW50cycpLFxuICAgICAgICBtb2RhbEdyb3VwQ29udHJvbHMgIDogZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLkpTLS1wbG90TW9kYWxDb250cm9scycpLFxuICAgICAgICBtb2RhbEdyb3VwTmV4dCAgICAgIDogZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLkpTLS1wbG90TW9kYWxDb250cm9sc19fbmV4dCcpLFxuICAgICAgICBtb2RhbEdyb3VwQmFjayAgICAgIDogZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLkpTLS1wbG90TW9kYWxDb250cm9sc19fYmFjaycpLFxuICAgICAgICBwbG90TW9kYWwgICAgICAgICAgIDogZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLkpTLS1wbG90TW9kYWwnKSxcblxuXG4gICAgICAgIGluaXQ6IGZ1bmN0aW9uICgpIHtcblxuICAgICAgICAgICAgTW9kYWxzLmNyZWF0ZUxpc3RlbmVycygpXG4gICAgICAgICAgICBNb2RhbHMuY2hlY2tGb3JNb2RhbE5vdGlmaWNhdGlvbigpXG4gICAgICAgIH0sXG5cbiAgICAgICAgY3JlYXRlTGlzdGVuZXJzOiBmdW5jdGlvbiAoKSB7XG5cbiAgICAgICAgICAgIGNvbnN0IGNsb3NlQnV0dG9ucyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5KUy0tY2xvc2VQbG90TW9kYWwnKVxuXG4gICAgICAgICAgICBmb3IodmFyIGNsb3NlQnV0dG9uIG9mIGNsb3NlQnV0dG9ucykge1xuICAgICAgICAgICAgICAgIGNsb3NlQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJyxmdW5jdGlvbihlKXtcbiAgICAgICAgICAgICAgICAgICAgIGlmIChlLnRhcmdldCAhPT0gdGhpcylcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVyblxuICAgICAgICAgICAgICAgICAgICAgTW9kYWxzLmNsb3NlUGxvdE1vZGFsKClcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBNb2RhbHMucGxvdE1vZGFsLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlbW92ZScsZnVuY3Rpb24oKXtcblxuICAgICAgICAgICAgICAgIGlmKE1vZGFscy5jdXJyZW50TW9kYWxJZCAmJiAhUGxvdC5pc1RvdWNoRGV2aWNlKCkpIHtcblxuICAgICAgICAgICAgICAgICAgICBpZihNb2RhbHMuY29udHJvbHNUaW1lcilcbiAgICAgICAgICAgICAgICAgICAgICAgIGNsZWFyVGltZW91dChNb2RhbHMuY29udHJvbHNUaW1lcilcbiAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgIGlmKE1vZGFscy5wbG90TW9kYWwuY2xhc3NMaXN0LmNvbnRhaW5zKCdoaWRlQ29udHJvbHMnKSlcbiAgICAgICAgICAgICAgICAgICAgICAgIE1vZGFscy5wbG90TW9kYWwuY2xhc3NMaXN0LnJlbW92ZSgnaGlkZUNvbnRyb2xzJylcblxuICAgICAgICAgICAgICAgICAgICBNb2RhbHMuY29udHJvbHNUaW1lciA9IHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIE1vZGFscy5wbG90TW9kYWwuY2xhc3NMaXN0LmFkZCgnaGlkZUNvbnRyb2xzJylcblxuICAgICAgICAgICAgICAgICAgICB9LDIyMDApXG5cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuc2l0ZVdyYXAnKS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uKGUpe1xuICAgICAgICAgICAgICAgIGlmKGUudGFyZ2V0LmNsb3Nlc3QoJ1tkYXRhLXBsb3QtbW9kYWxdJykpIHtcbiAgICAgICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpXG4gICAgICAgICAgICAgICAgICAgIE1vZGFscy5vcGVuUGxvdE1vZGFsKGUudGFyZ2V0LmNsb3Nlc3QoJ1tkYXRhLXBsb3QtbW9kYWxdJykpXG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB9KVxuXG4gICAgICAgICAgICBpZihNb2RhbHMubW9kYWxHcm91cEJhY2spIHtcblxuICAgICAgICAgICAgICAgIE1vZGFscy5tb2RhbEdyb3VwQmFjay5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsTW9kYWxzLnRyaWdnZXJCYWNrR3JvdXBJdGVtKTtcblxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZihNb2RhbHMubW9kYWxHcm91cE5leHQpIHtcblxuICAgICAgICAgICAgICAgIE1vZGFscy5tb2RhbEdyb3VwTmV4dC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsTW9kYWxzLnRyaWdnZXJOZXh0R3JvdXBJdGVtKTtcblxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdrZXlkb3duJywgKGUpID0+IHtcblxuICAgICAgICAgICAgICAgIGlmKGUud2hpY2ggPT0gMzkgJiYgTW9kYWxzLmdyb3VwTGlua3MubGVuZ3RoID4gMCkge1xuXG4gICAgICAgICAgICAgICAgICAgIE1vZGFscy50cmlnZ2VyTmV4dEdyb3VwSXRlbSgpXG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYoZS53aGljaCA9PSAzNyAmJiBNb2RhbHMuZ3JvdXBMaW5rcy5sZW5ndGggPiAwKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgTW9kYWxzLnRyaWdnZXJCYWNrR3JvdXBJdGVtKClcblxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICBpZihNb2RhbHMuaXNPcGVuICYmIGUud2hpY2g9PTI3KSB7XG5cbiAgICAgICAgICAgICAgICAgICAgTW9kYWxzLmNsb3NlUGxvdE1vZGFsKClcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgIH0sXG5cblxuICAgICAgICBjaGVja0Zvck1vZGFsTm90aWZpY2F0aW9uIDogKCkgPT4ge1xuXG4gICAgICAgICAgICBjb25zdCBub3RpZmljYXRpb25UcmlnZ2VyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLkpTLS1mYWtlQnV0dG9uRm9yTW9kYWxOb3RpZmljYXRpb25zJylcblxuICAgICAgICAgICAgaWYobm90aWZpY2F0aW9uVHJpZ2dlcikge1xuXG4gICAgICAgICAgICAgICAgaWYgKHNlc3Npb25TdG9yYWdlLmdldEl0ZW0oJ3Bsb3RIYXNOb3RpZmljYXRpb25GaXJlZCcpICE9PSBcIjFcIikgeyBcblxuICAgICAgICAgICAgICAgICAgICBzZXNzaW9uU3RvcmFnZS5zZXRJdGVtKCdwbG90SGFzTm90aWZpY2F0aW9uRmlyZWQnLCAnMScpO1xuXG4gICAgICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIE1vZGFscy5vcGVuUGxvdE1vZGFsKG5vdGlmaWNhdGlvblRyaWdnZXIpXG5cbiAgICAgICAgICAgICAgICAgICAgfSxub3RpZmljYXRpb25UcmlnZ2VyLmRhdGFzZXQucGxvdE5vdGlmaWNhdGlvbldhaXQqMTAwMClcblxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgfVxuXG4gICAgICAgIH0sXG5cbiAgICAgICAgdHJpZ2dlckJhY2tHcm91cEl0ZW0gOiAoKSA9PiB7XG5cbiAgICAgICAgICAgIE1vZGFscy5jdXJyZW50R3JvdXBJdGVtLS1cblxuICAgICAgICAgICAgaWYoTW9kYWxzLmN1cnJlbnRHcm91cEl0ZW0gPCAwKSB7XG5cbiAgICAgICAgICAgICAgICBNb2RhbHMuY3VycmVudEdyb3VwSXRlbSA9IE1vZGFscy5ncm91cExpbmtzLmxlbmd0aCAtIDE7XG5cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgTW9kYWxzLm9wZW5QbG90TW9kYWwoTW9kYWxzLmdyb3VwTGlua3NbTW9kYWxzLmN1cnJlbnRHcm91cEl0ZW1dKVxuXG4gICAgICAgIH0sXG5cbiAgICAgICAgdHJpZ2dlck5leHRHcm91cEl0ZW0gOiAoKSA9PiB7XG5cbiAgICAgICAgICAgIE1vZGFscy5jdXJyZW50R3JvdXBJdGVtKytcblxuICAgICAgICAgICAgaWYoTW9kYWxzLmN1cnJlbnRHcm91cEl0ZW0gPT0gTW9kYWxzLmdyb3VwTGlua3MubGVuZ3RoKSB7XG5cbiAgICAgICAgICAgICAgICBNb2RhbHMuY3VycmVudEdyb3VwSXRlbSA9IDBcblxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBNb2RhbHMub3BlblBsb3RNb2RhbChNb2RhbHMuZ3JvdXBMaW5rc1tNb2RhbHMuY3VycmVudEdyb3VwSXRlbV0pXG5cbiAgICAgICAgfSxcblxuICAgICAgICBvcGVuUGxvdE1vZGFsOiAoZWxlbWVudCkgPT4ge1xuXG4gICAgICAgICAgICBpZihNb2RhbHMuaXNMb2FkaW5nID09IHRydWUpXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlXG5cbiAgICAgICAgICAgIHZhciBzZXR0aW5ncyA9IHtcbiAgICAgICAgICAgICAgICB0eXBlICAgICAgICAgICAgOiAnaW5saW5lJywgLy8gKGlubGluZXxhamF4KSBpZiB0aGUgY29udGVudCBpcyBhbHJlYWR5IGluIHRoZSBkb20gb3Igbm90XG4gICAgICAgICAgICAgICAgZ3JvdXBJZCAgICAgICAgIDogJycsIC8vVGhlIG9wdGlvbmFsIElEIG9mIHRoZSBncm91cCBvZiBtb2RhbHMgdXNlZCBmb3IgZ2FsbGVyeSB2aWV3c1xuICAgICAgICAgICAgICAgIGNvbnRlbnRzSWQgICAgICA6ICcnLCAvL1RoZSBJRCB0aGF0IHJlZmVyZW5jZXMgd2hlcmUsIG9uIHRoZSBwYWdlLCB0aGUgY29udGVudCB0byB1c2UgbGl2ZXNcbiAgICAgICAgICAgICAgICB0ZW1wbGF0ZVBhcnQgICAgOiAnJywgLy9UaGUgdGVtcGxhdGUgcGFydCB0byBsb2FkLCBpZiBBSkFYXG4gICAgICAgICAgICAgICAgYWpheERhdGEgICAgICAgIDoge30sIC8vRGF0YSB0byBzZW5kIHZpYSBBSkFYXG4gICAgICAgICAgICAgICAgbW9kYWxDbGFzcyAgICAgIDogJycgLy9BIGN1c3RvbSBjbGFzcyB0byBhZGQgdG8gb3VyIG1vZGFsXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIE1vZGFscy5pc0xvYWRpbmcgPSB0cnVlXG5cbiAgICAgICAgICAgIGlmKGVsZW1lbnQuZGF0YXNldC5wbG90TW9kYWxUeXBlID09ICdhamF4Jykge1xuICAgICAgICAgICAgICAgIHNldHRpbmdzLnR5cGUgPSAnYWpheCdcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgc2V0dGluZ3MuY29udGVudHNJZCAgICAgPSBlbGVtZW50LmRhdGFzZXQucGxvdE1vZGFsQ29udGVudHNcbiAgICAgICAgICAgIHNldHRpbmdzLmdyb3VwSWQgICAgICAgID0gZWxlbWVudC5kYXRhc2V0LnBsb3RNb2RhbEdyb3VwXG4gICAgICAgICAgICBzZXR0aW5ncy50ZW1wbGF0ZVBhcnQgICA9IGVsZW1lbnQuZGF0YXNldC5wbG90TW9kYWxUZW1wbGF0ZVBhcnRcbiAgICAgICAgICAgIHNldHRpbmdzLm1vZGFsQ2xhc3MgICAgID0gZWxlbWVudC5kYXRhc2V0LnBsb3RNb2RhbENsYXNzXG5cbiAgICAgICAgICAgIGlmKCFzZXR0aW5ncy5jb250ZW50c0lkICYmIHNldHRpbmdzLnR5cGUgPT0gJ2lubGluZScpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnSW5saW5lIE1vZGFscyBuZWVkIGEgcGxvdC1tb2RhbC1jb250ZW50cyB2YXJpYWJsZSBhZGRlZCcpXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmKHNldHRpbmdzLnR5cGUgPT0gJ2FqYXgnICYmICFzZXR0aW5ncy50ZW1wbGF0ZVBhcnQpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnQWpheCBtb2RhbHMgbmVlZCBhIHBsb3QtbW9kYWwtdGVtcGxhdGUtcGFydCB2YXJpYWJsZSBhZGRlZCcpXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vQ2hlY2sgdG8gc2VlIGlmIGl0J3MgcGFydCBvZiBhIGdyb3VwXG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGlmKE1vZGFscy5ncm91cExpbmtzLmxlbmd0aCA9PSAwICYmIHNldHRpbmdzLmdyb3VwSWQpXG4gICAgICAgICAgICAgICBNb2RhbHMuaW5pdGlhbGlzZUdyb3VwKGVsZW1lbnQpXG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGlmKCFzZXR0aW5ncy5ncm91cElkKVxuICAgICAgICAgICAgICAgIE1vZGFscy5tb2RhbEdyb3VwQ29udHJvbHMuY2xhc3NMaXN0LmFkZCgnaGlkZGVuJylcblxuICAgICAgICAgICAgaWYoc2V0dGluZ3MubW9kYWxDbGFzcykge1xuICAgICAgICAgICAgICAgIE1vZGFscy5wbG90TW9kYWwuY2xhc3NMaXN0LmFkZChzZXR0aW5ncy5tb2RhbENsYXNzKVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZihzZXR0aW5ncy50eXBlID09ICdpbmxpbmUnKSB7XG5cbiAgICAgICAgICAgICAgICBNb2RhbHMuY3VycmVudE1vZGFsSWQgPSBzZXR0aW5ncy5jb250ZW50c0lkXG5cbiAgICAgICAgICAgICAgICAvL0ZpbmQgY29udGVudCB0byBpbnNlcnQgaW4gb3VyIG1vZGFsXG4gICAgICAgICAgICAgICAgdmFyIHBsb3RNb2RhbENvbnRlbnRzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLkpTLS1wbG90TW9kYWxDb250ZW50c1tkYXRhLXBsb3QtbW9kYWwtY29udGVudHM9XCInICsgTW9kYWxzLmN1cnJlbnRNb2RhbElkICsgJ1wiXScpXG5cbiAgICAgICAgICAgICAgICBpZighcGxvdE1vZGFsQ29udGVudHMubGVuZ3RoID09IDApXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZVxuXG4gICAgICAgICAgICAgICAgcGxvdE1vZGFsQ29udGVudHMgPSBwbG90TW9kYWxDb250ZW50cy5pbm5lckhUTUw7XG5cbiAgICAgICAgICAgICAgICBNb2RhbHMucHV0Q29udGVudHNJbnRvTW9kYWwocGxvdE1vZGFsQ29udGVudHMpXG5cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgLy9BSkFYIGxvYWRpbmcgY29udGVudFxuICAgICAgICAgICAgICAgIHZhciBhamF4RGF0YSA9IHt9XG5cbiAgICAgICAgICAgICAgICBkb2N1bWVudC5ib2R5LmNsYXNzTGlzdC5hZGQoJ3Bsb3RNb2RhbExvYWRpbmdBamF4JylcblxuICAgICAgICAgICAgICAgIGZvcihjb25zdCBrZXkgaW4gZWxlbWVudC5kYXRhc2V0KSB7XG4gICAgICAgICAgICAgICAgICAgIGlmKGtleS5zdWJzdHJpbmcoMCwxMykgPT0gJ3Bsb3RNb2RhbERhdGEnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBhamF4RGF0YVtrZXkuY2hhckF0KDEzKS50b0xvd2VyQ2FzZSgpICsga2V5LnN1YnN0cmluZygxNCldID0gZWxlbWVudC5kYXRhc2V0W2tleV1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgY29uc3QgYXJncyA9IHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuT3JXcml0ZSAgIDogJ3JldHVybicsXG4gICAgICAgICAgICAgICAgICAgIHRlbXBsYXRlUGFydCAgICA6IHNldHRpbmdzLnRlbXBsYXRlUGFydCxcbiAgICAgICAgICAgICAgICAgICAgZGF0YSAgICAgICAgICAgIDogYWpheERhdGFcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgUGxvdC5sb2FkVGVtcGxhdGVQYXJ0KGFyZ3MpLnRoZW4oaHRtbCA9PiB7XG4gICAgICAgICAgICAgICAgICAgIE1vZGFscy5wdXRDb250ZW50c0ludG9Nb2RhbChodG1sKVxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfSxcblxuICAgICAgICBwdXRDb250ZW50c0ludG9Nb2RhbCA6IGNvbnRlbnRzID0+ICB7XG5cblxuICAgICAgICAgICAgTW9kYWxzLm1vZGFsQ29udGVudC5zdHlsZS5taW5IZWlnaHQgPSBNb2RhbHMubW9kYWxDb250ZW50LmNsaWVudEhlaWdodCArICdweCdcbiAgICAgICAgICAgIE1vZGFscy5tb2RhbENvbnRlbnQuaW5uZXJIVE1MID0gY29udGVudHNcblxuICAgICAgICAgICAgQm9keVNjcm9sbExvY2suZGlzYWJsZUJvZHlTY3JvbGwoTW9kYWxzLnBsb3RNb2RhbClcblxuICAgICAgICAgICAgZG9jdW1lbnQuYm9keS5jbGFzc0xpc3QuYWRkKCdwbG90TW9kYWxJblZpZXcnKVxuXG4gICAgICAgICAgICBjb25zdCBuZXdJbWFnZXMgPSBNb2RhbHMubW9kYWxDb250ZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ2ltZycpXG5cbiAgICAgICAgICAgIExhenlMb2FkLmFkZEVsZW1lbnRzKG5ld0ltYWdlcykudGhlbigoKSA9PiB7XG5cbiAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpPT4ge1xuXG4gICAgICAgICAgICAgICAgICAgIE1vZGFscy5tb2RhbENvbnRlbnQuc3R5bGUubWluSGVpZ2h0ID0gMFxuXG4gICAgICAgICAgICAgICAgfSw1MClcblxuICAgICAgICAgICAgfSlcblxuICAgICAgICAgICAgY29uc3QgbmV3VmlkZW9zID0gTW9kYWxzLm1vZGFsQ29udGVudC5xdWVyeVNlbGVjdG9yQWxsKCd2aWRlbycpXG5cblxuXG4gICAgICAgICAgICBuZXdWaWRlb3MuZm9yRWFjaCh2aWRlbyA9PntcblxuICAgICAgICAgICAgICAgIHZhciBwbGF5ZXIgPSBuZXcgTWVkaWFFbGVtZW50UGxheWVyKHZpZGVvLC8qIE9wdGlvbnMgKi8pO1xuICAgICAgICAgICAgICAgIHBsYXllci5wbGF5KCk7XG5cbiAgICAgICAgICAgIH0pXG5cbiAgICAgICAgICAgIE1vZGFscy5pc09wZW4gPSB0cnVlXG4gICAgICAgICAgICBNb2RhbHMuaXNMb2FkaW5nID0gZmFsc2VcbiAgICAgICAgICAgIGRvY3VtZW50LmJvZHkuY2xhc3NMaXN0LnJlbW92ZSgncGxvdE1vZGFsTG9hZGluZ0FqYXgnKVxuXG4gICAgICAgIH0sXG5cbiAgICAgICAgaW5pdGlhbGlzZUdyb3VwIDogKGVsZW1lbnQpID0+IHtcblxuICAgICAgICAgICAgTW9kYWxzLmdyb3VwTGlua3MgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdbZGF0YS1wbG90LW1vZGFsLWdyb3VwPVwiJytlbGVtZW50LmRhdGFzZXQucGxvdE1vZGFsR3JvdXArJ1wiXScpXG5cbiAgICAgICAgICAgIHZhciBpID0gMFxuXG4gICAgICAgICAgICBmb3IodmFyIGdyb3VwTGluayBvZiBNb2RhbHMuZ3JvdXBMaW5rcykge1xuXG4gICAgICAgICAgICAgICAgaWYoZWxlbWVudCA9PSBncm91cExpbmspXG4gICAgICAgICAgICAgICAgICAgIE1vZGFscy5jdXJyZW50R3JvdXBJdGVtID0gaTtcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICBpKytcblxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZihNb2RhbHMuY3VycmVudE1vZGFsSWQgJiYgIVBsb3QuaXNUb3VjaERldmljZSgpKVxuXG4gICAgICAgICAgICAgICAgTW9kYWxzLmNvbnRyb2xzVGltZXIgPSBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuXG4gICAgICAgICAgICAgICAgICAgIE1vZGFscy5wbG90TW9kYWwuY2xhc3NMaXN0LmFkZCgnaGlkZUNvbnRyb2xzJylcblxuICAgICAgICAgICAgICAgIH0sMzAwMClcblxuICAgICAgICAgICAgTW9kYWxzLm1vZGFsR3JvdXBDb250cm9scy5jbGFzc0xpc3QucmVtb3ZlKCdoaWRkZW4nKVxuXG4gICAgICAgIH0sXG5cbiAgICAgICAgY2xvc2VQbG90TW9kYWw6ICgpID0+IHtcbiAgICBcbiAgICAgICAgICAgIGRvY3VtZW50LmJvZHkuY2xhc3NMaXN0LnJlbW92ZSgncGxvdE1vZGFsSW5WaWV3JylcblxuICAgICAgICAgICAgTW9kYWxzLmN1cnJlbnRNb2RhbElkID0gbnVsbFxuXG4gICAgICAgICAgICBNb2RhbHMucGxvdE1vZGFsLmNsYXNzTGlzdCA9ICdKUy0tcGxvdE1vZGFsIHBsb3RNb2RhbCdcblxuICAgICAgICAgICAgTW9kYWxzLmdyb3VwTGlua3MgPSBbXVxuXG4gICAgICAgICAgICBNb2RhbHMuY3VycmVudEdyb3VwSXRlbSA9IDBcblxuICAgICAgICAgICAgTW9kYWxzLm1vZGFsQ29udGVudC5pbm5lckhUTUwgPSAnJ1xuICAgICAgICAgICAgXG4gICAgICAgICAgICBCb2R5U2Nyb2xsTG9jay5lbmFibGVCb2R5U2Nyb2xsKE1vZGFscy5wbG90TW9kYWwpXG5cbiAgICAgICAgICAgIE1vZGFscy5pc09wZW4gPSBmYWxzZVxuICAgICAgICB9XG5cbiAgICB9XG5cbiAgICBtb2R1bGUuZXhwb3J0cyA9IE1vZGFsc1xuXG59KCkpXG4iLCIoZnVuY3Rpb24gKCkge1xuXG4gIHZhciBTbW9vdGg7XG5cbiAgU21vb3RoID0ge1xuXG4gICAgdHJhY2tlZEVsZW1lbnRzT2JzZXJ2ZXIgOiBudWxsLFxuICAgIHN0YW5kYXJkU2Nyb2xsRnJhbWVzT2JzZXJ2ZXIgOiBudWxsLFxuXG4gICAgbWFpblNjcm9sbEFuaW1hdGlvbkZyYW1lIDogbnVsbCxcblxuICAgIGN1cnJlbnRQb3NpdGlvbiA6IDAsXG5cbiAgICBtdXRhdGlvbk9ic2VydmVyRGVib3VuY2UgOiBudWxsLFxuXG4gICAgb25TY3JvbGxDYWxsYmFja1Rocm90dGxlciA6IG51bGwsXG5cbiAgICBlYXNlIDogMC4wNyxcblxuICAgIGxhc3RQb3NpdGlvbiA6IDAsXG5cbiAgICBvblNjcm9sbCA6IG51bGwsXG5cbiAgICBzdGFuZGFyZFNjcm9sbCA6IGZhbHNlLFxuXG4gICAgc2Nyb2xsRWxlbWVudHMgOiBbXSxcblxuICAgIHRvcEJhckhlaWdodCA6IDAsXG5cbiAgICBzY3JvbGxGcmFtZXMgOiBbXSxcblxuICAgIHRpY2tpbmcgOiBmYWxzZSxcblxuICAgIGRvbSA6IHtcbiAgICAgICAgICAgIHNjcm9sbFdpbmRvdyAgICAgICAgICAgICAgICAgICAgICAgICAgICA6IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLXBsb3Qtc21vb3RoLXNjcm9sbF0nKSxcbiAgICAgICAgICAgIHNjcm9sbEZyYW1lcyAgICAgICAgICAgICAgICAgICAgICAgICAgICA6IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ1tkYXRhLXBsb3Qtc21vb3RoLXNjcm9sbC1mcmFtZV0nKSxcbiAgICAgICAgICAgIHNjcm9sbEVsZW1lbnRzICAgICAgICAgICAgICAgICAgICAgICAgICA6IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ1tkYXRhLXBsb3Qtc21vb3RoLXNjcm9sbC1lbGVtZW50XScpLFxuICAgICAgICAgICAgdG9wQmFyICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogZG9jdW1lbnQucXVlcnlTZWxlY3RvcignW2RhdGEtcGxvdC1zbW9vdGgtc2Nyb2xsLXRvcGJhcicpXG4gICAgICAgICAgfSxcblxuICAgIHdpbmRvd0hlaWdodCA6IHdpbmRvdy5pbm5lckhlaWdodCwgXG5cbiAgICB3aW5kb3dXaWR0aCA6IHdpbmRvdy5pbm5lcldpZHRoLFxuXG4gICAgaW5pdDogc2V0dGluZ3MgPT4ge1xuXG4gICAgICAvL292ZXJyaWRlIGFueSBkZWZhdWx0IHNldHRpbmdzIHdpdGggcGFzc2VkIHBhcmFtZXRlcnNcbiAgICAgIFNtb290aC5zZXRTZXR0aW5ncyhzZXR0aW5ncylcblxuICAgICAgaWYoIVNtb290aC5zdGFuZGFyZFNjcm9sbCkge1xuXG4gICAgICAgIC8vU2V0IG91ciBjdXJyZW50IGFuZCBsYXN0IHBvc2l0aW9ucyBcbiAgICAgICAgLy90byB0aGUgY3VycmVudCBzY3JvbGwgWSBwb3NpdGlvbiwgaW4gY2FzZVxuICAgICAgICAvL3dlIGFyZSBzY3JvbGxlZCBkb3duIHRoZSBwYWdlIG9uIGxvYWRcbiAgICAgICAgU21vb3RoLmN1cnJlbnRQb3NpdGlvbiAgICA9IHdpbmRvdy5zY3JvbGxZXG4gICAgICAgIFNtb290aC5sYXN0UG9zaXRpb24gICAgICAgPSB3aW5kb3cuc2Nyb2xsWVxuXG4gICAgICAgIC8vUHV0IGZpeGVkIG9udG8gdGhlIHdob2xlIHNpdGUgcmVhZHkgdG8gXG4gICAgICAgIC8vaW50ZXJjZXB0IHNjcm9sbGluZ1xuICAgICAgICBTbW9vdGguc2V0U3R5bGVzKClcblxuICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncmVzaXplJywgU21vb3RoLnJlZnJlc2gsIHsgcGFzc2l2ZTogdHJ1ZSB9KVxuICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignc2Nyb2xsJywgU21vb3RoLnNjcm9sbCwgeyBwYXNzaXZlOiB0cnVlIH0pXG5cbiAgICAgICAgLy9SZWFkIHRocm91Z2ggZWFjaCBzY3JvbGwgZnJhbWUgYW5kIHNldCBkYXRhXG4gICAgICAgIC8vaW50byBhIHNpbmdsZSBhcnJheSBmb3IgcHJvY2Vzc2luZyBsYXRlclxuICAgICAgICAvL3tcbiAgICAgICAgLy8gICAgICBlbGVtZW50ICAgICAgICAgICA6IGVsZW1lbnQsICAgICAgKHRoZSBkb20gZWxlbWVudClcbiAgICAgICAgLy8gICAgICB0b3AgICAgICAgICAgICAgICA6IDEwMCwgICAgICAgICAgKHRoZSBvZmZzZXQgdG9wIHZhbHVlIHdpdGhvdXQgdHJhbnNmb3JtcywgaW4gcGl4ZWxzKVxuICAgICAgICAvLyAgICAgIGhlaWdodCAgICAgICAgICAgIDogMzAwLCAgICAgICAgICAodGhlIGhlaWdodCBvZiB0aGUgZWxlbWVudCB3aXRob3V0IHRyYW5zZm9ybXMsIGluIHBpeGVscylcbiAgICAgICAgLy8gICAgICBib3R0b20gICAgICAgICAgICA6IDQwMCwgICAgICAgICAgKHRoZSBvZmZzZXQgYm90dG9tIHBvc2l0aW9uIHZhbHVlIHdpdGhvdXQgdHJhbnNmb3JtcywgaW4gcGl4ZWxzKVxuICAgICAgICAvLyAgICAgIHN0aWNreSAgICAgICAgICAgIDogZmFsc2UsICAgICAgICAoaWYgdGhlIGVsZW1lbnQgc2hvdWxkIGJlaGF2ZSBsaWtlIENTUyBzdGlja3kgb3Igbm90KVxuICAgICAgICAvLyAgICAgIHBhcmVudEJvdHRvbSAgICAgIDogZmFsc2UgfHwgNTAwICAoaWYgdGhlIGVsZW1lbnQgaXMgc3RpY2t5LCByZXR1cm4gdGhlIGJvdHRvbSBwb3NpdGlvbiBvZiBpdHMgcGFyZW50IGluIHBpeGVscyAod2hlbiBpdCBzaG91bGQgdW5zdGljaykpXG4gICAgICAgIC8vICB9XG4gICAgICAgIFNtb290aC5zZXRTY3JvbGxGcmFtZURhdGEoKVxuXG4gICAgICB9XG5cbiAgICAgIC8vSWYgYW55IHNjcm9sbCBlbGVtZW50cyBleGlzdCwgd2UgY2FuIGFkZCB0aGVtIGFuZCBtb25pdG9yIHRoZW1cbiAgICAgIGlmKFNtb290aC5kb20uc2Nyb2xsRWxlbWVudHMpIHtcbiAgICAgICAgLy9SZWFkIHRocm91Z2ggZWFjaCBzY3JvbGwgZWxlbWVudCBhbmQgc2V0IGRhdGFcbiAgICAgICAgLy9pbnRvIGEgc2luZ2xlIGFycmF5IGZvciBwcm9jZXNzaW5nIGxhdGVyXG4gICAgICAgIC8ve1xuICAgICAgICAvLyAgICAgIGVsZW1lbnQgICAgICAgICA6IGVsZW1lbnQsICAgICAgICAgICh0aGUgZG9tIGVsZW1lbnQpXG4gICAgICAgIC8vICAgICAgdG9wICAgICAgICAgICAgIDogMTAwLCAgICAgICAgICAgICAgKHRoZSBvZmZzZXQgdG9wIHZhbHVlIHdpdGhvdXQgdHJhbnNmb3JtcywgaW4gcGl4ZWxzKVxuICAgICAgICAvLyAgICAgIGhlaWdodCAgICAgICAgICA6IDMwMCwgICAgICAgICAgICAgICh0aGUgaGVpZ2h0IG9mIHRoZSBlbGVtZW50IHdpdGhvdXQgdHJhbnNmb3JtcywgaW4gcGl4ZWxzKVxuICAgICAgICAvLyAgICAgIGJvdHRvbSAgICAgICAgICA6IDQwMCwgICAgICAgICAgICAgICh0aGUgb2Zmc2V0IGJvdHRvbSBwb3NpdGlvbiB2YWx1ZSB3aXRob3V0IHRyYW5zZm9ybXMsIGluIHBpeGVscylcbiAgICAgICAgLy8gICAgICBpc1Zpc2libGUgICAgICAgOiBmYWxzZSwgICAgICAgICAgICAoaWYgdGhlIGVsZW1lbnQgaXMgY3VycmVudGx5IGluIHRoZSB3aW5kb3cgZnJhbWUgb3Igbm90KVxuICAgICAgICAvLyAgICAgIGluaXRpYWxPZmZzZXQgICA6IC4yLCAgICAgICAgICAgICAgIChob3cgZmFyIGF3YXkgdGhpcyBlbGVtZW50IGlzIGZyb20gdGhlIGluaXRpYWwgY2VudGVyIG9mIHRoZSBzY3JlZW4pXG4gICAgICAgIC8vICAgICAgY3VycmVudFBvc2l0aW9uIDogMCAgICAgICAgICAgICAgICAgKGhvdyBmYXIgdXAgdGhlIHZpZXdwb3J0IHRoaXMgZWxlbWVudCBjdXJyZW50bHkgaXMgKGJldHdlZW4gLTEgYW5kIDEpKVxuICAgICAgICAvLyAgICAgIGNhbGxiYWNrICAgICAgICA6ICdmdW5jdGlvbi5uYW1lJyAgICh0aGUgbmFtZSBvZiBhIGZ1bmN0aW9uIHlvdSBjYW4gY2FsbCB3aGVuIHRoaXMgbW92ZXMgd2l0aGluIHZpZXcpXG4gICAgICAgIC8vIH1cbiAgICAgICAgU21vb3RoLnRyYWNrZWRFbGVtZW50c09ic2VydmVyID0gbmV3IEludGVyc2VjdGlvbk9ic2VydmVyKFNtb290aC50cmFja1Zpc2libGVFbGVtZW50cywge3Jvb3RNYXJnaW46ICcyMDBweCcsdGhyZXNob2xkOiAwLjAxfSlcbiAgICAgICAgU21vb3RoLnNldFNjcm9sbEVsZW1lbnREYXRhKClcbiAgICAgIH1cblxuICAgICAgLy9TZXQgdXAgYSBtdXRhdGlvbiBvYnNlcnZlciB0byBsaXN0ZW4gb3V0IGZvciBjaGFuZ2VzIGluIGhlaWdodCxcbiAgICAgIC8vdG8gYWRqdXN0IG91ciBoZWlnaHQgb2YgZG9jdW1lbnQgYWNjb3JkaW5nbHlcbiAgICAgIFNtb290aC5pbml0TXV0YXRpb25PYnNlcnZlcigpXG5cbiAgICAgIC8vSWYgdGhlcmUncyBhIGZpeGVkIHRvcGJhciBvbiB0aGlzIHNpdGUsIHdlIGNhbiBzZXQgdGhlIGhlaWdodFxuICAgICAgLy9oZXJlLCBpbiBvcmRlciB0byBvZmZzZXQgYW55IHN0aWNreSBwb3NpdGlvbnMuIFxuICAgICAgU21vb3RoLnNldFRvcEJhckhlaWdodCgpXG5cbiAgICAgIC8vSWYgaXQncyBub3Qgc3RhbmRhcmQgc2Nyb2xsLCBzZXQgb3VyIGluaXRpYWwgc2Nyb2xsIGZyYW1lIHBvc2l0aW9uc1xuICAgICAgaWYoIVNtb290aC5zdGFuZGFyZFNjcm9sbCkge1xuICAgICAgICBTbW9vdGguc2V0UG9zaXRpb25PZkZyYW1lcygpXG4gICAgICB9IGVsc2Uge1xuICAgICAgICAgU21vb3RoLnN0YW5kYXJkU2Nyb2xsRnJhbWVzT2JzZXJ2ZXIgPSBuZXcgSW50ZXJzZWN0aW9uT2JzZXJ2ZXIoU21vb3RoLnRyYWNrU3RhbmRhcmRTY3JvbGxGcmFtZXMsIHtyb290TWFyZ2luOiAnMHB4Jyx0aHJlc2hvbGQ6IDAuMDF9KVxuICAgICAgICAgZm9yKGxldCBmcmFtZSBvZiBTbW9vdGguZG9tLnNjcm9sbEZyYW1lcykge1xuICAgICAgICAgICAgU21vb3RoLnN0YW5kYXJkU2Nyb2xsRnJhbWVzT2JzZXJ2ZXIub2JzZXJ2ZShmcmFtZSlcbiAgICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgLy9TZXQgb3VyIHBvc2l0aW9uIG9mIGFueSBzY3JvbGwgZWxlbWVudHNcbiAgICAgIFNtb290aC5wb3NpdGlvblNjcm9sbEVsZW1lbnRzKClcblxuICAgIH0sXG5cbiAgICBzZXRTZXR0aW5ncyA6IHNldHRpbmdzID0+IHtcblxuICAgICAgaWYoIXNldHRpbmdzKVxuICAgICAgICByZXR1cm4gdHJ1ZVxuXG4gICAgICBpZih0eXBlb2Yoc2V0dGluZ3Mub25TY3JvbGwpID09ICdmdW5jdGlvbicpXG4gICAgICAgIFNtb290aC5vblNjcm9sbCA9IHNldHRpbmdzLm9uU2Nyb2xsXG4gICAgICBcbiAgICAgIGlmKHNldHRpbmdzLnN0YW5kYXJkU2Nyb2xsID09IHRydWUpXG4gICAgICAgIFNtb290aC5zdGFuZGFyZFNjcm9sbCA9IHRydWVcblxuICAgICAgaWYoc2V0dGluZ3MuZWFzZSkgXG4gICAgICAgIFNtb290aC5lYXNlID0gc2V0dGluZ3MuZWFzZVxuICAgICAgXG4gICAgfSxcblxuICAgIHJldHJpZ2dlcldpbmRvd1NpemVPbk11dGF0ZSA6IChtdXRhdGlvbnNMaXN0LCBvYnNlcnZlcikgPT4geyBcblxuICAgICAgaWYoIVNtb290aC5tdXRhdGlvbk9ic2VydmVyRGVib3VuY2UpIHtcblxuICAgICAgICBTbW9vdGgubXV0YXRpb25PYnNlcnZlckRlYm91bmNlID0gc2V0VGltZW91dChmdW5jdGlvbigpe1xuXG4gICAgICAgICAgICB2YXIgY2hhbmdlZCA9IGZhbHNlXG5cbiAgICAgICAgICAgIFNtb290aC5zY3JvbGxGcmFtZXMuZm9yRWFjaChmcmFtZSA9PiB7XG4gICAgICAgICAgICAgICAgaWYoZnJhbWUuaGVpZ2h0ICE9IGZyYW1lLmVsZW1lbnQuY2xpZW50SGVpZ2h0KVxuICAgICAgICAgICAgICAgICAgY2hhbmdlZCA9IHRydWVcbiAgICAgICAgICAgIH0pXG5cbiAgICAgICAgICAgIGlmKGNoYW5nZWQgPT0gdHJ1ZSkgXG4gICAgICAgICAgICAgIFNtb290aC5yZWZyZXNoKClcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgY2xlYXJUaW1lb3V0KFNtb290aC5tdXRhdGlvbk9ic2VydmVyRGVib3VuY2UpXG4gICAgICAgICAgICBTbW9vdGgubXV0YXRpb25PYnNlcnZlckRlYm91bmNlID0gbnVsbFxuXG4gICAgICAgIH0sMjAwKVxuXG4gICAgICB9XG5cbiAgICB9LFxuXG4gICAgaW5pdE11dGF0aW9uT2JzZXJ2ZXIgOiAoKSA9PiB7XG5cbiAgICAgIGZvcih2YXIgc2Nyb2xsRnJhbWUgb2YgU21vb3RoLmRvbS5zY3JvbGxGcmFtZXMpIHtcblxuICAgICAgICBjb25zdCBvYnNlcnZlciA9IG5ldyBNdXRhdGlvbk9ic2VydmVyKFNtb290aC5yZXRyaWdnZXJXaW5kb3dTaXplT25NdXRhdGUpXG4gICAgICAgIG9ic2VydmVyLm9ic2VydmUoc2Nyb2xsRnJhbWUsIHtcbiAgICAgICAgICBjaGlsZExpc3QgICA6IHRydWUsXG4gICAgICAgICAgYXR0cmlidXRlcyAgOiB0cnVlLFxuICAgICAgICAgIHN1YnRyZWUgICAgIDogdHJ1ZVxuICAgICAgICB9KVxuICAgICAgfVxuXG4gICAgfSxcblxuICAgIGRlc3Ryb3kgOiAoKSA9PiB7XG5cbiAgICAgIFNtb290aC5zY3JvbGxFbGVtZW50cy5mb3JFYWNoKGVudHJ5ID0+e1xuICAgICAgICBlbnRyeS5lbGVtZW50LnJlbW92ZUF0dHJpYnV0ZSgnc3R5bGUnKVxuICAgICAgfSlcblxuICAgICAgU21vb3RoLnNjcm9sbEZyYW1lcy5mb3JFYWNoKGVudHJ5ID0+e1xuICAgICAgICBlbnRyeS5lbGVtZW50LnJlbW92ZUF0dHJpYnV0ZSgnc3R5bGUnKVxuICAgICAgfSlcblxuICAgICAgU21vb3RoLnRyYWNrZWRFbGVtZW50c09ic2VydmVyID0gbnVsbFxuICAgICAgU21vb3RoLm1haW5TY3JvbGxBbmltYXRpb25GcmFtZSA9IG51bGxcbiAgICAgIFNtb290aC5jdXJyZW50UG9zaXRpb24gPSAwXG4gICAgICBTbW9vdGgubXV0YXRpb25PYnNlcnZlckRlYm91bmNlID0gbnVsbFxuICAgICAgU21vb3RoLm9uU2Nyb2xsQ2FsbGJhY2tUaHJvdHRsZXIgPSBudWxsXG4gICAgICBTbW9vdGguZWFzZSA9IDAuMDdcbiAgICAgIFNtb290aC5sYXN0UG9zaXRpb24gPSAwXG4gICAgICBTbW9vdGgub25TY3JvbGwgPSBudWxsXG4gICAgICBTbW9vdGguc3RhbmRhcmRTY3JvbGwgPSBmYWxzZVxuICAgICAgU21vb3RoLnNjcm9sbEVsZW1lbnRzID0gW11cbiAgICAgIFNtb290aC50b3BCYXJIZWlnaHQgPSAwXG4gICAgICBTbW9vdGguc2Nyb2xsRnJhbWVzID0gW11cbiAgICAgIFNtb290aC50aWNraW5nID0gZmFsc2VcbiAgICAgIFNtb290aC5kb20uc2Nyb2xsV2luZG93LnJlbW92ZUF0dHJpYnV0ZSgnc3R5bGUnKVxuXG4gICAgfSxcblxuICAgIGFkZEVsZW1lbnRzIDogKGVsZW1lbnRzKSA9PiB7XG5cbiAgICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLHJlamVjdCl7XG5cbiAgICAgICAgICAgIGVsZW1lbnRzLmZvckVhY2goIGVsZW1lbnQgPT4geyAgICAgICBcbiAgICAgICAgICAgICAgICBTbW9vdGgudHJhY2tlZEVsZW1lbnRzT2JzZXJ2ZXIub2JzZXJ2ZShlbGVtZW50KVxuICAgICAgICAgICAgfSlcblxuICAgICAgICAgICAgcmVzb2x2ZSgpXG5cbiAgICAgIH0pXG5cbiAgICB9LFxuXG4gICAgc2Nyb2xsVG8gOiAoZWxlbWVudCkgPT4ge1xuICAgICAgXG4gICAgICB3aW5kb3cuc2Nyb2xsVG8oMCxTbW9vdGguZXhhY3RQb3NpdGlvbk9mRWxlbWVudChlbGVtZW50KSAtIDEwMClcblxuICAgICAgaWYoU21vb3RoLnN0YW5kYXJkU2Nyb2xsICE9IGZhbHNlKSB7XG4gICAgICAgIFNtb290aC50aWNraW5nID0gdHJ1ZVxuICAgICAgICBTbW9vdGgubWFpblNjcm9sbEFuaW1hdGlvbkZyYW1lID0gcmVxdWVzdEFuaW1hdGlvbkZyYW1lKFNtb290aC5ydW4pXG4gICAgICB9XG4gICAgfSxcblxuICAgIHNldFNjcm9sbEVsZW1lbnREYXRhIDogKCkgPT4ge1xuXG4gICAgICBTbW9vdGguZG9tLnNjcm9sbEVsZW1lbnRzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnW2RhdGEtcGxvdC1zbW9vdGgtc2Nyb2xsLWVsZW1lbnRdJylcbiAgICAgIFNtb290aC5hZGRFbGVtZW50cyhTbW9vdGguZG9tLnNjcm9sbEVsZW1lbnRzKSBcblxuICAgICAgaWYoIVNtb290aC5kb20uc2Nyb2xsRWxlbWVudHMpXG4gICAgICAgIHJldHVybiBmYWxzZVxuXG4gICAgICBTbW9vdGguc2Nyb2xsRWxlbWVudHMgPSBbXVxuICAgIFxuICAgICAgU21vb3RoLmRvbS5zY3JvbGxFbGVtZW50cy5mb3JFYWNoKCAoZWxlbWVudCxpKSA9PiB7XG5cbiAgICAgICAgY29uc3QgZWxlbWVudFRvcCA9IFNtb290aC5leGFjdFBvc2l0aW9uT2ZFbGVtZW50KGVsZW1lbnQpXG5cbiAgICAgICAgdmFyIGhlaWdodCA9IGVsZW1lbnQuY2xpZW50SGVpZ2h0XG5cbiAgICAgICAgdmFyIGNhbGxiYWNrICA9IGZhbHNlLFxuICAgICAgICAgICAgZnJvbVZhbHVlID0gLTEsXG4gICAgICAgICAgICB0b1ZhbHVlICAgPSAxXG5cbiAgICAgICAgLy9JcyBhbnl0aGluZyBzZXQgb24gdGhpcyBlbGVtZW50IGFzIGEgY2FsbGJhY2s/XG4gICAgICAgIGlmKGVsZW1lbnQuZGF0YXNldC5wbG90U21vb3RoU2Nyb2xsRWxlbWVudCkge1xuXG4gICAgICAgICAgbGV0IGMgPSBlbGVtZW50LmRhdGFzZXQucGxvdFNtb290aFNjcm9sbEVsZW1lbnRcblxuICAgICAgICAgIC8vRmlyc3QgdXAgLSBoYXZlIHZhbHVlcyBiZWVuIHBhc3NlZCB0byB0aGlzIGNhbGxiYWNrIGluIHRoaXMgZm9ybTogY2FsbGJhY2soMiw1KVxuICAgICAgICAgIGxldCB2YWx1ZXMgPSBjLnN1YnN0cmluZyggYy5pbmRleE9mKCAnKCcgKSArIDEsIGMuaW5kZXhPZiggJyknICkgKVxuICAgICAgICAgIHZhbHVlcyA9IHZhbHVlcy5zcGxpdCgnLCcpXG5cbiAgICAgICAgICAvL1ZhbGlkIGlmIHdlIGhhdmUgMiwgYW5kIGZyb20gaXMgbGVzcyB0aGF0IHRvIHZhbHVlXG4gICAgICAgICAgaWYodmFsdWVzLmxlbmd0aCA9PSAyICYmIHZhbHVlc1swXSA8IHZhbHVlc1sxXSkge1xuICAgICAgICAgICAgZnJvbVZhbHVlID0gTnVtYmVyKHZhbHVlc1swXSlcbiAgICAgICAgICAgIHRvVmFsdWUgPSBOdW1iZXIodmFsdWVzWzFdKVxuICAgICAgICAgIH1cblxuICAgICAgICAgIGxldCBwb3RlbnRpYWxGdW5jdGlvbiA9IHdpbmRvd1tjXVxuXG4gICAgICAgICAgaWYgKHR5cGVvZiBwb3RlbnRpYWxGdW5jdGlvbiA9PT0gXCJmdW5jdGlvblwiKSB7XG5cbiAgICAgICAgICAgIGNhbGxiYWNrID0gcG90ZW50aWFsRnVuY3Rpb24ucmVwbGFjZSgvXFxzKlxcKC4qP1xcKVxccyovZywgJycpXG5cbiAgICAgICAgICB9XG4gICAgICAgICAgZWxzZSB7XG5cbiAgICAgICAgICAgIGNvbnN0IGNhbGxiYWNrU3BsaXQgPSBjLnJlcGxhY2UoL1xccypcXCguKj9cXClcXHMqL2csICcnKS5zcGxpdCgnLicpXG5cbiAgICAgICAgICAgIGlmKGNhbGxiYWNrU3BsaXQubGVuZ3RoID09IDIpIHtcblxuICAgICAgICAgICAgICBwb3RlbnRpYWxGdW5jdGlvbiA9IHdpbmRvd1tjYWxsYmFja1NwbGl0WzBdXVtjYWxsYmFja1NwbGl0WzFdXVxuXG4gICAgICAgICAgICAgIGlmICh0eXBlb2YgcG90ZW50aWFsRnVuY3Rpb24gPT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgICAgICAgICAgIGNhbGxiYWNrID0gcG90ZW50aWFsRnVuY3Rpb25cbiAgICAgICAgICAgICAgfSBcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgaW5pdGlhbE9mZnNldCA9IDBcblxuICAgICAgICBpZihlbGVtZW50VG9wIDwgU21vb3RoLndpbmRvd0hlaWdodClcbiAgICAgICAgICBpbml0aWFsT2Zmc2V0ID0gKGVsZW1lbnRUb3AgKyBoZWlnaHQpIC8gKFNtb290aC53aW5kb3dIZWlnaHQgKyBoZWlnaHQpICogKHRvVmFsdWUgLSBmcm9tVmFsdWUpICsgZnJvbVZhbHVlXG5cblxuICAgICAgICBcbiAgICAgICAgU21vb3RoLnNjcm9sbEVsZW1lbnRzW2ldID0ge1xuICAgICAgICAgICAgZWxlbWVudCAgICAgICAgIDogZWxlbWVudCxcbiAgICAgICAgICAgIHRvcCAgICAgICAgICAgICA6IGVsZW1lbnRUb3AsXG4gICAgICAgICAgICBoZWlnaHQgICAgICAgICAgOiBoZWlnaHQsXG4gICAgICAgICAgICBib3R0b20gICAgICAgICAgOiBlbGVtZW50VG9wICsgZWxlbWVudC5jbGllbnRIZWlnaHQsXG4gICAgICAgICAgICBpc1Zpc2libGUgICAgICAgOiBlbGVtZW50VG9wIDwgU21vb3RoLmN1cnJlbnRQb3NpdGlvbiArIFNtb290aC53aW5kb3dIZWlnaHQgJiYgZWxlbWVudFRvcCArIGhlaWdodCA+IFNtb290aC5jdXJyZW50UG9zaXRpb24sXG4gICAgICAgICAgICBpbml0aWFsT2Zmc2V0ICAgOiBpbml0aWFsT2Zmc2V0LFxuICAgICAgICAgICAgY2FsbGJhY2sgICAgICAgIDogY2FsbGJhY2ssXG4gICAgICAgICAgICBmcm9tVmFsdWUgICAgICAgOiBmcm9tVmFsdWUsXG4gICAgICAgICAgICB0b1ZhbHVlICAgICAgICAgOiB0b1ZhbHVlLFxuICAgICAgICAgICAgY3VycmVudFBvc2l0aW9uIDogMFxuICAgICAgICB9XG5cbiAgICAgICAgZWxlbWVudC5kYXRhc2V0LnBsb3RTbW9vdGhTY3JvbGxFbGVtZW50SWQgPSBpXG5cbiAgICAgIH0pXG5cblxuICAgIH0sXG5cbiAgICBzZXRUb3BCYXJIZWlnaHQgOiAoKSA9PiB7XG5cbiAgICAgIGlmKFNtb290aC5kb20udG9wQmFyKVxuICAgICAgICBTbW9vdGgudG9wQmFySGVpZ2h0ID0gU21vb3RoLmRvbS50b3BCYXIuY2xpZW50SGVpZ2h0XG5cbiAgICB9LFxuXG4gICAgc2V0U2Nyb2xsRnJhbWVEYXRhIDogKCkgPT4ge1xuXG4gICAgICBTbW9vdGguZG9tLnNjcm9sbEZyYW1lcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ1tkYXRhLXBsb3Qtc21vb3RoLXNjcm9sbC1mcmFtZV0nKVxuXG4gICAgICBTbW9vdGguc2Nyb2xsRnJhbWVzID0gW11cbiAgICAgIHZhciBuZXdIZWlnaHQgPSAwXG5cbiAgICAgIFNtb290aC5kb20uc2Nyb2xsRnJhbWVzLmZvckVhY2goIGVsZW1lbnQgPT4ge1xuXG4gICAgICAgIGNvbnN0IGVsZW1lbnRUb3AgPSBTbW9vdGguZXhhY3RQb3NpdGlvbk9mRWxlbWVudChlbGVtZW50KVxuXG4gICAgICAgIFNtb290aC5zY3JvbGxGcmFtZXMucHVzaCh7XG4gICAgICAgICAgICBlbGVtZW50ICAgICAgICAgICA6IGVsZW1lbnQsXG4gICAgICAgICAgICB0b3AgICAgICAgICAgICAgICA6IGVsZW1lbnRUb3AsXG4gICAgICAgICAgICBoZWlnaHQgICAgICAgICAgICA6IGVsZW1lbnQuY2xpZW50SGVpZ2h0LFxuICAgICAgICAgICAgYm90dG9tICAgICAgICAgICAgOiBlbGVtZW50VG9wICsgZWxlbWVudC5jbGllbnRIZWlnaHQsXG4gICAgICAgICAgICBzdGlja3kgICAgICAgICAgICA6IHR5cGVvZihlbGVtZW50LmRhdGFzZXQucGxvdFNtb290aFNjcm9sbFN0aWNreSkgIT0gJ3VuZGVmaW5lZCcgPyB0cnVlIDogZmFsc2UsIFxuICAgICAgICAgICAgcGFyZW50Qm90dG9tICAgICAgOiBlbGVtZW50LnBhcmVudEVsZW1lbnQgPyBTbW9vdGguZXhhY3RQb3NpdGlvbk9mRWxlbWVudChlbGVtZW50LnBhcmVudEVsZW1lbnQpICsgZWxlbWVudC5wYXJlbnRFbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLmhlaWdodCA6IGZhbHNlXG4gICAgICAgIH0pXG5cbiAgICAgIH0pXG5cbiAgICAgIGRvY3VtZW50LmJvZHkuc3R5bGUuaGVpZ2h0ID0gYCR7U21vb3RoLmRvbS5zY3JvbGxXaW5kb3cuc2Nyb2xsSGVpZ2h0fXB4YFxuXG4gICAgfSxcblxuICAgIHRyYWNrVmlzaWJsZUVsZW1lbnRzIDogKGVudHJpZXMpID0+IHtcbiAgICAgICBcbiAgICAgICAgZW50cmllcy5mb3JFYWNoKCBlbnRyeSA9PiB7XG5cbiAgICAgICAgICBpZihlbnRyeS5pc0ludGVyc2VjdGluZyAmJiBlbnRyeSkge1xuICAgICAgICAgICAgZW50cnkudGFyZ2V0LmNsYXNzTGlzdC5hZGQoJ3Bsb3RTbW9vdGhTY3JvbGxJblZpZXcnLCdwbG90U21vb3RoU2Nyb2xsU2Vlbk9uY2UnKVxuICAgICAgICAgIH1cbiAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGVudHJ5LnRhcmdldC5jbGFzc0xpc3QucmVtb3ZlKCdwbG90U21vb3RoU2Nyb2xsSW5WaWV3JylcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZihTbW9vdGguc2Nyb2xsRWxlbWVudHNbZW50cnkudGFyZ2V0LmRhdGFzZXQucGxvdFNtb290aFNjcm9sbEVsZW1lbnRJZF0pXG4gICAgICAgICAgICBTbW9vdGguc2Nyb2xsRWxlbWVudHNbZW50cnkudGFyZ2V0LmRhdGFzZXQucGxvdFNtb290aFNjcm9sbEVsZW1lbnRJZF0uaXNWaXNpYmxlID0gZW50cnkuaXNJbnRlcnNlY3RpbmdcblxuXG4gICAgICAgIH0pXG4gICAgfSxcblxuICAgIHRyYWNrU3RhbmRhcmRTY3JvbGxGcmFtZXMgOiAoZW50cmllcykgPT4ge1xuICAgICAgIFxuICAgICAgICBlbnRyaWVzLmZvckVhY2goIGVudHJ5ID0+IHtcblxuICAgICAgICAgIGlmKGVudHJ5LmlzSW50ZXJzZWN0aW5nICYmIGVudHJ5KSB7XG4gICAgICAgICAgICBlbnRyeS50YXJnZXQuY2xhc3NMaXN0LmFkZCgncGxvdFNtb290aFNjcm9sbEZyYW1lSW5WaWV3JywncGxvdFNtb290aFNjcm9sbEZyYW1lU2Vlbk9uY2UnKVxuICAgICAgICAgIH1cbiAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGVudHJ5LnRhcmdldC5jbGFzc0xpc3QucmVtb3ZlKCdwbG90U21vb3RoU2Nyb2xsRnJhbWVJblZpZXcnKVxuICAgICAgICAgIH1cblxuICAgICAgICB9KVxuICAgIH0sXG5cbiAgICByZWZyZXNoIDogKCkgPT4ge1xuICAgICAgaWYoU21vb3RoLnN0YW5kYXJkU2Nyb2xsKVxuICAgICAgICByZXR1cm4gdHJ1ZVxuICAgICAgXG4gICAgICBTbW9vdGgud2luZG93SGVpZ2h0ID0gd2luZG93LmlubmVySGVpZ2h0XG4gICAgICBTbW9vdGgud2luZG93V2lkdGggPSB3aW5kb3cuaW5uZXJXaWR0aFxuICAgICAgU21vb3RoLnNldFNjcm9sbEVsZW1lbnREYXRhKClcbiAgICAgIFNtb290aC5zZXRTY3JvbGxGcmFtZURhdGEoKVxuICAgICAgU21vb3RoLnNldFRvcEJhckhlaWdodCgpXG4gICAgICBTbW9vdGguc2Nyb2xsKClcbiAgICB9LFxuXG4gICAgcnVuIDogKCkgPT4ge1xuXG4gICAgICBTbW9vdGgubGFzdFBvc2l0aW9uID0gU21vb3RoLmxlcnAoU21vb3RoLmxhc3RQb3NpdGlvbiwgU21vb3RoLmN1cnJlbnRQb3NpdGlvbiwgU21vb3RoLmVhc2UpXG5cbiAgICAgIGlmIChTbW9vdGgubGFzdFBvc2l0aW9uIDwgLjEpXG4gICAgICAgIFNtb290aC5sYXN0UG9zaXRpb24gPSAwXG4gICAgIFxuICAgICAgbGV0IGRpZmYgPSBTbW9vdGguY3VycmVudFBvc2l0aW9uIC0gU21vb3RoLmxhc3RQb3NpdGlvblxuXG4gICAgICBpZihNYXRoLmFicyhkaWZmKSA8IDAuNSkge1xuICAgICAgICBTbW9vdGgudGlja2luZyA9IGZhbHNlXG4gICAgICAgIGRpZmYgPSAwXG4gICAgICB9XG5cbiAgICAgIHZhciB2ZWxvY2l0eSA9IGRpZmYgLyBTbW9vdGgud2luZG93V2lkdGhcblxuICAgICAgU21vb3RoLnNldFBvc2l0aW9uT2ZGcmFtZXMoKVxuXG4gICAgICBTbW9vdGguZmlyZU9uU2Nyb2xsRXZlbnQodmVsb2NpdHkpXG5cbiAgICAgIFNtb290aC5wb3NpdGlvblNjcm9sbEVsZW1lbnRzKClcblxuICAgICAgaWYoU21vb3RoLnRpY2tpbmcgPT0gdHJ1ZSlcbiAgICAgICAgU21vb3RoLm1haW5TY3JvbGxBbmltYXRpb25GcmFtZSA9IHJlcXVlc3RBbmltYXRpb25GcmFtZShTbW9vdGgucnVuKVxuICAgICAgXG5cbiAgICB9LFxuXG4gICAgcG9zaXRpb25TY3JvbGxFbGVtZW50cyA6ICgpID0+IHtcblxuICAgICAgU21vb3RoLnNjcm9sbEVsZW1lbnRzLmZvckVhY2goZW50cnkgPT4ge1xuXG4gICAgICAgICAgaWYoZW50cnkuaXNWaXNpYmxlID09IHRydWUgJiYgZW50cnkuY2FsbGJhY2spIHtcblxuICAgICAgICAgICAgY29uc3QgY3VycmVudFBvc2l0aW9uID0gKGVudHJ5LnRvcCAtIFNtb290aC5sYXN0UG9zaXRpb24gKyBlbnRyeS5oZWlnaHQpIC8gKFNtb290aC53aW5kb3dIZWlnaHQgKyBlbnRyeS5oZWlnaHQpICogKGVudHJ5LnRvVmFsdWUgLSBlbnRyeS5mcm9tVmFsdWUpICsgZW50cnkuZnJvbVZhbHVlIC0gZW50cnkuaW5pdGlhbE9mZnNldFxuICAgICAgICAgICAgXG4gICAgICAgICAgICBpZihlbnRyeS5jdXJyZW50UG9zaXRpb24gIT0gY3VycmVudFBvc2l0aW9uKSB7XG5cbiAgICAgICAgICAgICAgZW50cnkuY3VycmVudFBvc2l0aW9uID0gY3VycmVudFBvc2l0aW9uXG5cbiAgICAgICAgICAgICAgZW50cnkuY2FsbGJhY2soZW50cnkuZWxlbWVudCxjdXJyZW50UG9zaXRpb24pXG5cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgIH1cbiAgICAgICAgXG5cbiAgICAgICAgfSlcblxuICAgIH0sXG5cbiAgICBmaXJlT25TY3JvbGxFdmVudCA6ICh2ZWxvY2l0eSkgPT4ge1xuXG4gICAgICBpZih0eXBlb2YoU21vb3RoLm9uU2Nyb2xsKSA9PSAnZnVuY3Rpb24nKVxuICAgICAgICAgICAgICBcbiAgICAgICAgaWYoU21vb3RoLm9uU2Nyb2xsQ2FsbGJhY2tUaHJvdHRsZXIgPT09IG51bGwpIHtcblxuICAgICAgICAgIFNtb290aC5vblNjcm9sbENhbGxiYWNrVGhyb3R0bGVyID0gc2V0VGltZW91dChmdW5jdGlvbigpe1xuXG4gICAgICAgICAgICBTbW9vdGgub25TY3JvbGwoU21vb3RoLmRvbS5zY3JvbGxGcmFtZXMsdmVsb2NpdHkpXG4gICAgICAgICAgICBTbW9vdGgub25TY3JvbGxDYWxsYmFja1Rocm90dGxlciA9IG51bGxcblxuICAgICAgICAgIH0sNTApXG5cbiAgICAgICAgfVxuXG4gICAgfSxcblxuICAgIHNldFBvc2l0aW9uT2ZGcmFtZXMgOiAoKSA9PiB7XG5cbiAgICAgIGZvcih2YXIgc2Nyb2xsRnJhbWUgb2YgU21vb3RoLnNjcm9sbEZyYW1lcykge1xuXG4gICAgICAgICAgdmFyIHdpbmRvd1Njcm9sbFBvc2l0aW9uID0gU21vb3RoLmxhc3RQb3NpdGlvblxuXG4gICAgICAgICAgaWYoc2Nyb2xsRnJhbWUuc3RpY2t5ICYmIHNjcm9sbEZyYW1lLnBhcmVudEJvdHRvbSkge1xuICAgICAgICAgICAgd2luZG93U2Nyb2xsUG9zaXRpb24gPSBTbW9vdGguY2FsY1Bvc2l0aW9uT2ZTdGlja3lFbGVtZW50KHNjcm9sbEZyYW1lLCB3aW5kb3dTY3JvbGxQb3NpdGlvbilcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZih3aW5kb3dTY3JvbGxQb3NpdGlvbiA+IHNjcm9sbEZyYW1lLmJvdHRvbSB8fCB3aW5kb3dTY3JvbGxQb3NpdGlvbiArIFNtb290aC53aW5kb3dIZWlnaHQgPCBzY3JvbGxGcmFtZS50b3ApIHtcbiAgICAgICAgICAgIHNjcm9sbEZyYW1lLmVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZSgncGxvdFNtb290aFNjcm9sbEZyYW1lSW5WaWV3JylcbiAgICAgICAgICAgIFxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBzY3JvbGxGcmFtZS5lbGVtZW50LmNsYXNzTGlzdC5hZGQoJ3Bsb3RTbW9vdGhTY3JvbGxGcmFtZUluVmlldycsJ3Bsb3RTbW9vdGhTY3JvbGxGcmFtZVNlZW5PbmNlJylcbiAgICAgICAgICAgIHNjcm9sbEZyYW1lLmVsZW1lbnQuc3R5bGUudHJhbnNmb3JtID0gYHRyYW5zbGF0ZTNkKDAsIC0ke3dpbmRvd1Njcm9sbFBvc2l0aW9ufXB4LCAwKWBcbiAgICAgICAgICB9XG5cbiAgICAgICAgfVxuXG4gICAgfSxcblxuICAgIHNjcm9sbCA6ICgpID0+IHtcbiAgICAgIFNtb290aC5jdXJyZW50UG9zaXRpb24gPSB3aW5kb3cuc2Nyb2xsWVxuICAgICAgaWYoU21vb3RoLnRpY2tpbmcgPT0gZmFsc2UpIHtcbiAgICAgICAgU21vb3RoLnRpY2tpbmcgPSB0cnVlXG4gICAgICAgIFNtb290aC5tYWluU2Nyb2xsQW5pbWF0aW9uRnJhbWUgPSByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoU21vb3RoLnJ1bikgXG4gICAgICB9XG4gICAgfSxcblxuICAgIHNldFN0eWxlcyA6ICgpID0+IHtcblxuICAgICAgT2JqZWN0LmFzc2lnbihTbW9vdGguZG9tLnNjcm9sbFdpbmRvdy5zdHlsZSx7XG4gICAgICAgIHBvc2l0aW9uICA6ICdmaXhlZCcsXG4gICAgICAgIHRvcCAgICAgICA6IDAsXG4gICAgICAgIGxlZnQgICAgICA6IDAsXG4gICAgICAgIGhlaWdodCAgICA6ICcxMDAlJyxcbiAgICAgICAgd2lkdGggICAgIDogJzEwMCUnLFxuICAgICAgICBvdmVyZmxvdyAgOiAnaGlkZGVuJ1xuICAgICAgfSlcblxuICAgIH0sXG5cbiAgICBjYWxjUG9zaXRpb25PZlN0aWNreUVsZW1lbnQgOiAoZW50cnksIHBvc2l0aW9uKSA9PiB7XG5cbiAgICAgIC8vSWYgdGhlIGl0ZW0gaXMgYmVsb3cgdGhlIGJvdHRvbSBvZiBpdCdzIHBhcmVudFxuICAgICAgaWYocG9zaXRpb24gKyBTbW9vdGgudG9wQmFySGVpZ2h0ID49IGVudHJ5LnBhcmVudEJvdHRvbSlcbiAgICAgICAgcmV0dXJuIHBvc2l0aW9uXG4gICAgICBcblxuICAgICAgaWYoZW50cnkucGFyZW50Qm90dG9tIC0gcG9zaXRpb24gLSBTbW9vdGgudG9wQmFySGVpZ2h0IDw9IGVudHJ5LmhlaWdodCkge1xuICAgICAgICByZXR1cm4gZW50cnkudG9wIC0gZW50cnkucGFyZW50Qm90dG9tICsgcG9zaXRpb24gKyBlbnRyeS5oZWlnaHRcbiAgICAgIH1cblxuICAgICAgaWYocG9zaXRpb24gKyBTbW9vdGgudG9wQmFySGVpZ2h0ID4gZW50cnkudG9wKSBcbiAgICAgICAgcmV0dXJuIGVudHJ5LnRvcCAtIFNtb290aC50b3BCYXJIZWlnaHQgICBcblxuXG4gICAgICByZXR1cm4gcG9zaXRpb25cblxuICAgIH0sXG5cbiAgICBsZXJwOiAoYSxiLG4pID0+ICB7XG5cbiAgICAgICAgcmV0dXJuICgxIC0gbikgKiBhICsgbiAqIGJcblxuICAgIH0sXG5cbiAgICBleGFjdFBvc2l0aW9uT2ZFbGVtZW50IDogKGVsZW1lbnQpID0+IHtcbiAgICAgIHZhciBlbCA9IGVsZW1lbnQsXG4gICAgICBvZmZzZXRUb3AgID0gMDtcblxuICAgICAgZG97XG4gICAgICAgICAgb2Zmc2V0VG9wICArPSBlbC5vZmZzZXRUb3A7XG5cbiAgICAgICAgICBlbCA9IGVsLm9mZnNldFBhcmVudDtcbiAgICAgIH0gd2hpbGUoIGVsICk7XG5cbiAgICAgIHJldHVybiBvZmZzZXRUb3BcblxuICAgIH1cblxuICB9XG5cbiAgbW9kdWxlLmV4cG9ydHMgPSBTbW9vdGhcblxufSgpKSIsIihmdW5jdGlvbiAoKSB7XG5cbiAgICB2YXIgQm9keVNjcm9sbExvY2sgICA9IHJlcXVpcmUoJ2JvZHktc2Nyb2xsLWxvY2snKSxcbiAgICAgICAgTGF6eUxvYWQgICAgICAgICA9IHJlcXVpcmUoJy4vbGF6eWxvYWQnKSxcbiAgICAgICAgU3luY1Njcm9sbCAgICAgICA9IHJlcXVpcmUoJy4vc3luY3Njcm9sbCcpLCBcbiAgICAgICAgUGxvdFxuXG4gICAgUGxvdCA9IHtcblxuICAgICAgICBpbml0OiAoKSA9PiB7XG5cbiAgICAgICAgICAgIFBsb3QuY3JlYXRlTGlzdGVuZXJzKClcbiAgICAgICAgICAgIFN5bmNTY3JvbGwuaW5pdCgpIFxuICAgICAgICAgICAgUGxvdC5hbmltYXRlQmFubmVyTm90aWZpY2F0aW9ucygpIFxuXG4gICAgICAgIH0sXG5cbiAgICAgICAgY3JlYXRlTGlzdGVuZXJzOiAoKSA9PiB7XG5cbiAgICAgICAgICAgXHRjb25zdCBidXJnZXJNZW51VHJpZ2dlcnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuSlMtLW1lbnVUcmlnZ2VyJylcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgaWYoYnVyZ2VyTWVudVRyaWdnZXJzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICBmb3IodmFyIGJ1cmdlck1lbnVUcmlnZ2VyIG9mIGJ1cmdlck1lbnVUcmlnZ2Vycykge1xuICAgICAgICAgICAgICAgICAgICBidXJnZXJNZW51VHJpZ2dlci5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsUGxvdC50b2dnbGVCdXJnZXIpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBjb25zdCBzaWRlU3dpcGVzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnBsb3RTaWRlU3dpcGVzJylcblxuICAgICAgICAgICAgaWYoc2lkZVN3aXBlcy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgUGxvdC5zaWRlU3dpcGVzKHNpZGVTd2lwZXMpXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfSxcblxuICAgICAgICBhbmltYXRlQmFubmVyTm90aWZpY2F0aW9ucyA6ICgpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGJhbm5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5KUy0tYmFubmVyTm90aWZpY2F0aW9uJylcblxuICAgICAgICAgICAgaWYoYmFubmVyKVxuICAgICAgICAgICAgICAgIGlmKGJhbm5lci5kYXRhc2V0LmFuaW1hdGlvblR5cGUgPT0gJ2Fsd2F5cycpIHtcbiAgICAgICAgICAgICAgICAgICAgUGxvdC5idWlsZEJhbm5lclJlcGVhdGluZ1RleHQoYmFubmVyKVxuICAgICAgICAgICAgICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncmVzaXplJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBQbG90LmJ1aWxkQmFubmVyUmVwZWF0aW5nVGV4dChiYW5uZXIpXG4gICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgUGxvdC5jaGVja1RvU2VlSWZXZU5lZWRUb0FuaW1hdGlvbkJhbm5lcihiYW5uZXIpXG4gICAgICAgICAgICAgICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdyZXNpemUnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIFBsb3QuY2hlY2tUb1NlZUlmV2VOZWVkVG9BbmltYXRpb25CYW5uZXIoYmFubmVyKVxuICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgfSxcblxuICAgICAgICBjaGVja1RvU2VlSWZXZU5lZWRUb0FuaW1hdGlvbkJhbm5lciA6IGJhbm5lciA9PiB7XG5cbiAgICAgICAgICAgIGJhbm5lci5pbm5lckhUTUwgPSBgPGRpdj4ke2Jhbm5lci5kYXRhc2V0Lm1lc3NhZ2V9PC9kaXY+YFxuICAgICAgICAgICAgY29uc3QgZGl2MSA9IGJhbm5lci5xdWVyeVNlbGVjdG9yKCdkaXY6bnRoLW9mLXR5cGUoMSknKVxuICAgICAgICAgICAgY29uc3Qgd2luZG93V2lkdGggPSB3aW5kb3cuaW5uZXJXaWR0aFxuICAgICAgICAgICAgXG4gICAgICAgICAgICBpZihkaXYxLnNjcm9sbFdpZHRoID4gd2luZG93V2lkdGgpIHtcbiAgICAgICAgICAgICAgICBiYW5uZXIuY2xhc3NMaXN0LmFkZCgnd2l0aEFuaW1hdGlvbicpXG4gICAgICAgICAgICAgICAgUGxvdC5idWlsZEJhbm5lclJlcGVhdGluZ1RleHQoYmFubmVyKVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgYmFubmVyLmNsYXNzTGlzdC5yZW1vdmUoJ3dpdGhBbmltYXRpb24nKVxuICAgICAgICAgICAgfVxuXG4gICAgICAgIH0sXG5cbiAgICAgICAgYnVpbGRCYW5uZXJSZXBlYXRpbmdUZXh0IDogYmFubmVyID0+IHtcblxuICAgICAgICAgICAgYmFubmVyLmlubmVySFRNTCA9IGA8ZGl2PiR7YmFubmVyLmRhdGFzZXQubWVzc2FnZX08L2Rpdj48ZGl2PiR7YmFubmVyLmRhdGFzZXQubWVzc2FnZX08L2Rpdj5gXG4gICAgICAgICAgICBjb25zdCBkaXYxID0gYmFubmVyLnF1ZXJ5U2VsZWN0b3IoJ2RpdjpudGgtb2YtdHlwZSgxKScpXG4gICAgICAgICAgICBjb25zdCBkaXYyID0gYmFubmVyLnF1ZXJ5U2VsZWN0b3IoJ2RpdjpudGgtb2YtdHlwZSgyKScpXG4gICAgICAgICAgICBjb25zdCB3aW5kb3dXaWR0aCA9IHdpbmRvdy5pbm5lcldpZHRoXG5cbiAgICAgICAgICAgIGRpdjEuc3R5bGUuYW5pbWF0aW9uRHVyYXRpb249KHdpbmRvd1dpZHRoLzIwKStcInNcIlxuICAgICAgICAgICAgZGl2Mi5zdHlsZS5hbmltYXRpb25EdXJhdGlvbj0od2luZG93V2lkdGgvMjApK1wic1wiXG5cbiAgICAgICAgICAgIHZhciBpICA9IDBcblxuICAgICAgICAgICAgd2hpbGUoZGl2MS5zY3JvbGxXaWR0aCA8IHdpbmRvd1dpZHRoICYmIGkgPCAxMDApIHtcbiAgICAgICAgICAgICAgICBkaXYxLmlubmVySFRNTCA9IGRpdjEuaW5uZXJIVE1MICsgYCAke2Jhbm5lci5kYXRhc2V0Lm1lc3NhZ2V9YFxuICAgICAgICAgICAgICAgIGRpdjIuaW5uZXJIVE1MID0gZGl2Mi5pbm5lckhUTUwgKyBgICR7YmFubmVyLmRhdGFzZXQubWVzc2FnZX1gXG4gICAgICAgICAgICAgICAgaSsrO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgIH0sXG5cbiAgICAgICAgc2lkZVN3aXBlcyA6IChzaWRlU3dpcGVzKSA9PiB7XG5cbiAgICAgICAgICAgIGZvcih2YXIgc2lkZVN3aXBlIG9mIHNpZGVTd2lwZXMpIHtcblxuICAgICAgICAgICAgICAgICBpZihwYXJzZUludChzaWRlU3dpcGUuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkud2lkdGgpICsgMSA8IHBhcnNlSW50KHNpZGVTd2lwZS5zY3JvbGxXaWR0aCkpIHtcblxuXG4gICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgfVxuXG4gICAgICAgIH0sXG5cbiAgICAgICAgdG9nZ2xlQnVyZ2VyIDogKCkgPT4ge1xuXG4gICAgICAgICAgICBjb25zdCBidXJnZXJNZW51ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLkpTLS1idXJnZXJNZW51JylcblxuICAgICAgICAgICAgaWYoIWRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGFzc0xpc3QuY29udGFpbnMoJ2J1cmdlck9wZW4nKSkge1xuICAgICAgICAgICAgICAgIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGFzc0xpc3QuYWRkKCdidXJnZXJPcGVuJylcbiAgICAgICAgICAgICAgICBCb2R5U2Nyb2xsTG9jay5kaXNhYmxlQm9keVNjcm9sbChidXJnZXJNZW51KVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZSgnYnVyZ2VyT3BlbicpXG4gICAgICAgICAgICAgICAgQm9keVNjcm9sbExvY2suZW5hYmxlQm9keVNjcm9sbChidXJnZXJNZW51KVxuICAgICAgICAgICAgfVxuXG4gICAgICAgIH0sXG5cbiAgICAgICAgaXNQYWdlIDogc2x1ZyA9PiB7XG5cbiAgICAgICAgICAgIHJldHVybiBkb2N1bWVudC5ib2R5LmNsYXNzTGlzdC5jb250YWlucygncGFnZS0nK3NsdWcpXG5cbiAgICAgICAgfSxcblxuICAgICAgICBmaXhWaCA6ICgpID0+IHtcblxuICAgICAgICAgICAgLy8gRmlyc3Qgd2UgZ2V0IHRoZSB2aWV3cG9ydCBoZWlnaHQgYW5kIHdlIG11bHRpcGxlIGl0IGJ5IDElIHRvIGdldCBhIHZhbHVlIGZvciBhIHZoIHVuaXRcbiAgICAgICAgICAgIGxldCB2aCA9IHdpbmRvdy5pbm5lckhlaWdodCAqIDAuMDFcbiAgICAgICAgICAgIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zdHlsZS5zZXRQcm9wZXJ0eSgnLS12aCcsIGAke3ZofXB4YClcblxuXG4gICAgICAgIH0sXG5cbiAgICAgICAgaXNUb3VjaERldmljZTogKCkgPT4ge1xuXG4gICAgICAgICAgICB2YXIgcHJlZml4ZXMgPSAnIC13ZWJraXQtIC1tb3otIC1vLSAtbXMtICcuc3BsaXQoJyAnKVxuICAgICAgICAgICAgdmFyIG1xID0gZnVuY3Rpb24gKHF1ZXJ5KSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHdpbmRvdy5tYXRjaE1lZGlhKHF1ZXJ5KS5tYXRjaGVzXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICgoJ29udG91Y2hzdGFydCcgaW4gd2luZG93KSB8fCB3aW5kb3cuRG9jdW1lbnRUb3VjaCAmJiBkb2N1bWVudCBpbnN0YW5jZW9mIERvY3VtZW50VG91Y2gpIHtcbiAgICAgICAgICAgIFx0ZG9jdW1lbnQuYm9keS5hZGRDbGFzcygnaXNUb3VjaERldmljZScpICBcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB2YXIgcXVlcnkgPSBbJygnLCBwcmVmaXhlcy5qb2luKCd0b3VjaC1lbmFibGVkKSwoJyksICdwbG90JywgJyknXS5qb2luKCcnKVxuICAgICAgICAgICAgcmV0dXJuIG1xKHF1ZXJ5KVxuICAgICAgICB9LFxuXG4gICAgICAgIGFyZVdlQXRUaGVUb3AgOiBzY3JvbGxUb3AgPT4ge1xuXG4gICAgICAgICAgICBpZihzY3JvbGxUb3AgPiAwKSB7XG4gICAgICAgICAgICAgICAgZG9jdW1lbnQuYm9keS5jbGFzc0xpc3QuYWRkKCdzY3JvbGxlZCcpXG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGRvY3VtZW50LmJvZHkuY2xhc3NMaXN0LnJlbW92ZSgnc2Nyb2xsZWQnKVxuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuXG4gICAgICAgIGxvYWRUZW1wbGF0ZVBhcnQgOiAoYXJncykgPT4geyBcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgdmFyIGRlZmF1bHRzID0ge1xuICAgICAgICAgICAgICAgIHRlbXBsYXRlUGFydCAgICA6IG51bGwsXG4gICAgICAgICAgICAgICAgYWN0aW9uICAgICAgICAgIDogJ3Bsb3RMb2FkVGVtcGxhdGVQYXJ0JywgLy9UaGlzIGlzIHRoZSBhY3Rpb24gZmlyZWQgaW50byBvdXIgUGxvdFNpdGUgUEhQIHNldHVwLnBocCBmaWxlXG4gICAgICAgICAgICAgICAgZGF0YSAgICAgICAgICAgIDoge30sXG4gICAgICAgICAgICAgICAgcmV0dXJuT3JXcml0ZSAgIDogJ3dyaXRlJywgLy8od3JpdGV8cmV0dXJuKSBlaXRoZXIgYWRkcyBjb250ZW50IHRvIGNvbnRlbnRBcmVhLCBvciByZXR1cm5zIG5ldyBIVE1MIGluIHRoZSBwcm9taXNlXG4gICAgICAgICAgICAgICAgY29udGVudEFyZWEgICAgIDogJy5KUy0tYWpheFRhcmdldEFyZWEnLCBcbiAgICAgICAgICAgICAgICBhcHBlbmQgICAgICAgICAgOiBmYWxzZVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBsZXQgc2V0dGluZ3MgPSBPYmplY3QuYXNzaWduKHt9LCBkZWZhdWx0cywgYXJncylcbiAgICAgICAgICAgIFxuXG4gICAgICAgICAgICB0cnkgeyBcbiAgICAgICAgICAgICAgICBpZihzZXR0aW5ncy5yZXR1cm5PcldyaXRlID09ICd3cml0ZScpXG4gICAgICAgICAgICAgICAgICAgIHZhciBjb250ZW50QXJlYSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3Ioc2V0dGluZ3MuY29udGVudEFyZWEpXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjYXRjaCAoZSkge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdjb250ZW50QXJlYSBuZWVkcyB0byBiZSBhIHZhbGlkIHNlbGVjdG9yIScpXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmKGNvbnRlbnRBcmVhID09IG51bGwgJiYgc2V0dGluZ3MucmV0dXJuT3JXcml0ZSA9PSAnd3JpdGUnKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ0NvdWxkblxcJ3QgZmluZCBzZWxlY3RvciBmb3IgY29udGVudEFyZWEgb24gcGFnZS4nKVxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZihzZXR0aW5ncy50ZW1wbGF0ZVBhcnQgPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdDb3VsZG5cXCd0IGZpbmQgdGVtcGxhdGUgcGFydC4gTWFrZSBzdXJlIHlvdSBzZXQgb25lIGFzIHRlbXBsYXRlUGFydCwgZm9yIGV4YW1wbGUgcGFydHMvYWpheC1jb250ZW50JylcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2VcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYodHlwZW9mKHNldHRpbmdzLmFwcGVuZCkgIT09IFwiYm9vbGVhblwiKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ1ZhbHVlIHBhc3NlZCB0byBhcHBlbmQgd2FzIG5vdCBhIGJvb2xlYW4uJylcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2VcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYoc2V0dGluZ3MucmV0dXJuT3JXcml0ZSA9PSAnd3JpdGUnKVxuICAgICAgICAgICAgICAgIGNvbnRlbnRBcmVhLmNsYXNzTGlzdC5hZGQoJ3Bsb3RMb2FkaW5nJylcblxuICAgICAgICAgICAgc2V0dGluZ3MuZGF0YSA9IHtcbiAgICAgICAgICAgICAgICBkYXRhICAgICAgICAgICAgOiBzZXR0aW5ncy5kYXRhLFxuICAgICAgICAgICAgICAgIGFjdGlvbiAgICAgICAgICA6IHNldHRpbmdzLmFjdGlvbixcbiAgICAgICAgICAgICAgICB0ZW1wbGF0ZVBhcnQgICAgOiBzZXR0aW5ncy50ZW1wbGF0ZVBhcnRcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdmFyIHF1ZXJ5U3RyaW5nID0gUGxvdC50b1F1ZXJ5U3RyaW5nKHNldHRpbmdzLmRhdGEpXG4gICAgICAgIFxuICAgICAgICAgICAgcmV0dXJuIGZldGNoKGF1LCB7XG5cbiAgICAgICAgICAgICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgICAgICAgICAgICBoZWFkZXJzOiB7XG4gICAgICAgICAgICAgICAgICAgICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkOyBjaGFyc2V0PXV0Zi04J1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgYm9keTogcXVlcnlTdHJpbmcsXG4gICAgICAgICAgICAgICAgY3JlZGVudGlhbHM6ICdzYW1lLW9yaWdpbidcblxuICAgICAgICAgICAgfSkudGhlbihkYXRhID0+IHtcblxuICAgICAgICAgICAgICAgIHJldHVybiBkYXRhLmpzb24oKVxuXG4gICAgICAgICAgICB9KS50aGVuKHJlc3VsdCA9PiB7XG5cbiAgICAgICAgICAgICAgICBpZihzZXR0aW5ncy5yZXR1cm5PcldyaXRlID09ICd3cml0ZScpXG4gICAgICAgICAgICAgICAgICAgIGNvbnRlbnRBcmVhLmNsYXNzTGlzdC5yZW1vdmUoJ3Bsb3RMb2FkaW5nJylcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICBpZihyZXN1bHQuc3VjY2Vzcykge1xuXG4gICAgICAgICAgICAgICAgICAgIGlmKHNldHRpbmdzLnJldHVybk9yV3JpdGUgIT09ICd3cml0ZScpXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVzdWx0Lmh0bWxcblxuICAgICAgICAgICAgICAgICAgICBpZihzZXR0aW5ncy5hcHBlbmQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRlbnRBcmVhLmluc2VydEFkamFjZW50SFRNTCgnYmVmb3JlZW5kJywgcmVzdWx0Lmh0bWwpXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSAge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29udGVudEFyZWEuaW5uZXJIVE1MID0gcmVzdWx0Lmh0bWxcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIGNvbnRlbnRBcmVhLnF1ZXJ5U2VsZWN0b3JBbGwoJy5KUy0tbGF6eUxvYWQnKS5mb3JFYWNoKGVsID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIExhenlMb2FkLm9ic2VydmVyLm9ic2VydmUoZWwpXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiByZXN1bHQuaHRtbFxuXG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB9KS5jYXRjaChlcnJvciA9PntcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnZXJyb3InLGVycm9yKVxuXG4gICAgICAgICAgICB9KVxuXG5cblxuICAgICAgICB9LFxuXG4gICAgICAgIGRhdGVGb3JtYXQgOiAoZGF0ZSxmb3JtYXQpID0+IHtcblxuICAgICAgICAgICAgaWYoZm9ybWF0ID09ICdkUyBNJylcbiAgICAgICAgICAgICAgICByZXR1cm4gZGF0ZS5nZXREYXRlKCkgKyBQbG90LmdldE9yZGluYWwoZGF0ZS5nZXREYXRlKCkpICsgJyAnICsgUGxvdC5nZXRNb250aChkYXRlKVxuXG4gICAgICAgICAgICBpZihmb3JtYXQgPT0gJ00gZFMnKVxuICAgICAgICAgICAgICAgIHJldHVybiBQbG90LmdldE1vbnRoKGRhdGUpICsgJyAnICsgZGF0ZS5nZXREYXRlKCkgKyBQbG90LmdldE9yZGluYWwoZGF0ZS5nZXREYXRlKCkpIFxuXG4gICAgICAgICAgICBpZihmb3JtYXQgPT0gJ2QvbS95JylcbiAgICAgICAgICAgICAgICByZXR1cm4gZGF0ZS5nZXREYXRlKCkgKyAnLycgKyAoZGF0ZS5nZXRNb250aCgpICsgMSkgKyAnLycgKyBkYXRlLmdldEZ1bGxZZWFyKCkudG9TdHJpbmcoKS5zdWJzdHIoLTIpXG5cbiAgICAgICAgICAgIGlmKGZvcm1hdCA9PSAnbS9kL3knKVxuICAgICAgICAgICAgICAgIHJldHVybiAoZGF0ZS5nZXRNb250aCgpICsgMSkgKyAnLycgKyBkYXRlLmdldERhdGUoKSArICcvJyArIGRhdGUuZ2V0RnVsbFllYXIoKS50b1N0cmluZygpLnN1YnN0cigtMilcblxuICAgICAgICAgICAgcmV0dXJuIFBsb3QuZ2V0RGF5T2ZXZWVrKGRhdGUpXG4gICAgICAgICB9LFxuXG4gICAgICAgIGdldERheU9mV2VlayA6IGRhdGUgPT4ge1xuXG4gICAgICAgICAgICBjb25zdCBkYXlzID0gW1xuICAgICAgICAgICAgICAgICdTdW5kYXknLFxuICAgICAgICAgICAgICAgICdNb25kYXknLFxuICAgICAgICAgICAgICAgICdUdWVzZGF5JyxcbiAgICAgICAgICAgICAgICAnV2VkbmVzZGF5JyxcbiAgICAgICAgICAgICAgICAnVGh1cnNkYXknLFxuICAgICAgICAgICAgICAgICdGcmlkYXknLFxuICAgICAgICAgICAgICAgICdTYXR1cmRheSdcbiAgICAgICAgICAgIF1cblxuICAgICAgICAgICAgcmV0dXJuIGRheXNbZGF0ZS5nZXREYXkoKV1cblxuICAgICAgICB9LFxuXG4gICAgICAgIGdldE9yZGluYWwgOiBudW1iZXIgPT4ge1xuXG4gICAgICAgICAgICAgIGlmIChudW1iZXIgPiAzICYmIG51bWJlciA8IDIxKSByZXR1cm4gJ3RoJztcbiAgICAgICAgICAgICAgc3dpdGNoIChudW1iZXIgJSAxMCkge1xuICAgICAgICAgICAgICAgIGNhc2UgMTogIHJldHVybiBcInN0XCI7XG4gICAgICAgICAgICAgICAgY2FzZSAyOiAgcmV0dXJuIFwibmRcIjtcbiAgICAgICAgICAgICAgICBjYXNlIDM6ICByZXR1cm4gXCJyZFwiO1xuICAgICAgICAgICAgICAgIGRlZmF1bHQ6IHJldHVybiBcInRoXCI7XG4gICAgICAgICAgICAgIH1cblxuICAgICAgICB9LFxuXG5cbiAgICAgICAgZ2V0TW9udGggOiBkYXRlID0+IHtcblxuICAgICAgICAgICAgY29uc3QgbW9udGhOYW1lcyA9IFtcIkphblwiLCBcIkZlYlwiLCBcIk1hclwiLCBcIkFwclwiLCBcIk1heVwiLCBcIkp1blwiLFxuICAgICAgICAgICAgICBcIkp1bFwiLCBcIkF1Z1wiLCBcIlNlcFwiLCBcIk9jdFwiLCBcIk5vdlwiLCBcIkRlY1wiXG4gICAgICAgICAgICBdO1xuXG4gICAgICAgICAgICByZXR1cm4gbW9udGhOYW1lc1tkYXRlLmdldE1vbnRoKCldXG4gICAgICAgIH0sXG5cbiAgICAgICAgdG9RdWVyeVN0cmluZyA6IChvYmosIHByZWZpeCkgPT4ge1xuICAgICAgICAgICAgdmFyIHN0ciA9IFtdLCBrLCB2O1xuICAgICAgICAgICAgZm9yKHZhciBwIGluIG9iaikge1xuICAgICAgICAgICAgICAgIGlmICghb2JqLmhhc093blByb3BlcnR5KHApKSB7Y29udGludWU7fSAvLyBza2lwIHRoaW5ncyBmcm9tIHRoZSBwcm90b3R5cGVcbiAgICAgICAgICAgICAgICBpZiAofnAuaW5kZXhPZignWycpKSB7XG4gICAgICAgICAgICAgICAgICAgIGsgPSBwcmVmaXggPyBwcmVmaXggKyBcIltcIiArIHAuc3Vic3RyaW5nKDAsIHAuaW5kZXhPZignWycpKSArIFwiXVwiICsgcC5zdWJzdHJpbmcocC5pbmRleE9mKCdbJykpIDogcDtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBrID0gcHJlZml4ID8gcHJlZml4ICsgXCJbXCIgKyBwICsgXCJdXCIgOiBwO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB2ID0gb2JqW3BdO1xuICAgICAgICAgICAgICAgIHN0ci5wdXNoKHR5cGVvZiB2ID09IFwib2JqZWN0XCIgP1xuICAgICAgICAgICAgICAgICAgUGxvdC50b1F1ZXJ5U3RyaW5nKHYsIGspIDpcbiAgICAgICAgICAgICAgICAgIGVuY29kZVVSSUNvbXBvbmVudChrKSArIFwiPVwiICsgZW5jb2RlVVJJQ29tcG9uZW50KHYpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBzdHIuam9pbihcIiZcIik7XG4gICAgICAgIH1cblxuXG4gICAgfVxuXG4gICAgbW9kdWxlLmV4cG9ydHMgPSBQbG90XG5cbn0oKSlcbiIsIihmdW5jdGlvbiAoKSB7XG5cbiAgICB2YXIgXG4gICAgU3luY3Njcm9sbFxuXG4gICAgU3luY3Njcm9sbCA9IHtcblxuICAgICAgICBpbml0OiAoKSA9PiB7XG5cbiAgICAgICAgICAgIHZhciBXaWR0aCAgICAgICAgICAgPSAnV2lkdGgnLFxuICAgICAgICAgICAgSGVpZ2h0ICAgICAgICAgICAgICA9ICdIZWlnaHQnLFxuICAgICAgICAgICAgVG9wICAgICAgICAgICAgICAgICA9ICdUb3AnLFxuICAgICAgICAgICAgTGVmdCAgICAgICAgICAgICAgICA9ICdMZWZ0JyxcbiAgICAgICAgICAgIHNjcm9sbCAgICAgICAgICAgICAgPSAnc2Nyb2xsJyxcbiAgICAgICAgICAgIGNsaWVudCAgICAgICAgICAgICAgPSAnY2xpZW50JyxcbiAgICAgICAgICAgIEV2ZW50TGlzdGVuZXIgICAgICAgPSAnRXZlbnRMaXN0ZW5lcicsXG4gICAgICAgICAgICBhZGRFdmVudExpc3RlbmVyICAgID0gJ2FkZCcgKyBFdmVudExpc3RlbmVyLFxuICAgICAgICAgICAgbGVuZ3RoICAgICAgICAgICAgICA9ICdsZW5ndGgnLFxuICAgICAgICAgICAgTWF0aF9yb3VuZCAgICAgICAgICA9IE1hdGgucm91bmQsXG4gICAgICAgICAgICBuYW1lcyAgICAgICAgICAgICAgID0ge30sXG4gICAgICAgICAgICByZXNldCA9IGZ1bmN0aW9uKCkge1xuXG4gICAgICAgICAgICAgICAgdmFyIGVsZW1zID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnc3luYycrc2Nyb2xsKVxuXG4gICAgICAgICAgICAgICAgLy8gY2xlYXJpbmcgZXhpc3RpbmcgbGlzdGVuZXJzXG4gICAgICAgICAgICAgICAgdmFyIGksIGosIGVsLCBmb3VuZCwgbmFtZVxuICAgICAgICAgICAgICAgIGZvciAobmFtZSBpbiBuYW1lcykge1xuICAgICAgICAgICAgICAgICAgICBpZiAobmFtZXMuaGFzT3duUHJvcGVydHkobmFtZSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvciAoaSA9IDA7IGkgPCBuYW1lc1tuYW1lXVtsZW5ndGhdOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lc1tuYW1lXVtpXVsncmVtb3ZlJytFdmVudExpc3RlbmVyXShcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2Nyb2xsLCBuYW1lc1tuYW1lXVtpXS5zeW4sIDBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAvLyBzZXR0aW5nLXVwIHRoZSBuZXcgbGlzdGVuZXJzXG4gICAgICAgICAgICAgICAgZm9yIChpID0gMDsgaSA8IGVsZW1zW2xlbmd0aF07KSB7XG4gICAgICAgICAgICAgICAgICAgIGZvdW5kID0gaiA9IDBcbiAgICAgICAgICAgICAgICAgICAgZWwgPSBlbGVtc1tpKytdXG4gICAgICAgICAgICAgICAgICAgIGlmICghKG5hbWUgPSBlbC5nZXRBdHRyaWJ1dGUoJ25hbWUnKSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIG5hbWUgYXR0cmlidXRlIGlzIG5vdCBzZXRcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlXG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICBlbCA9IGVsW3Njcm9sbCsnZXInXXx8ZWwgIC8vIG5lZWRlZCBmb3IgaW50ZW5jZVxuXG4gICAgICAgICAgICAgICAgICAgIC8vIHNlYXJjaGluZyBmb3IgZXhpc3RpbmcgZW50cnkgaW4gYXJyYXkgb2YgbmFtZXM7XG4gICAgICAgICAgICAgICAgICAgIC8vIHNlYXJjaGluZyBmb3IgdGhlIGVsZW1lbnQgaW4gdGhhdCBlbnRyeVxuICAgICAgICAgICAgICAgICAgICBmb3IgKDtqIDwgKG5hbWVzW25hbWVdID0gbmFtZXNbbmFtZV18fFtdKVtsZW5ndGhdOykge1xuICAgICAgICAgICAgICAgICAgICAgICAgZm91bmQgfD0gbmFtZXNbbmFtZV1baisrXSA9PSBlbFxuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKCFmb3VuZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgbmFtZXNbbmFtZV0ucHVzaChlbClcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIGVsLmVYID0gZWwuZVkgPSAwO1xuXG4gICAgICAgICAgICAgICAgICAgIChmdW5jdGlvbihlbCwgbmFtZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgZWxbYWRkRXZlbnRMaXN0ZW5lcl0oXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2Nyb2xsLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsLnN5biA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgZWxlbXMgPSBuYW1lc1tuYW1lXVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBzY3JvbGxYID0gZWxbc2Nyb2xsK0xlZnRdXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBzY3JvbGxZID0gZWxbc2Nyb2xsK1RvcF1cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgeFJhdGUgPVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2Nyb2xsWCAvXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAoZWxbc2Nyb2xsK1dpZHRoXSAtIGVsW2NsaWVudCtXaWR0aF0pXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciB5UmF0ZSA9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzY3JvbGxZIC9cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIChlbFtzY3JvbGwrSGVpZ2h0XSAtIGVsW2NsaWVudCtIZWlnaHRdKVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciB1cGRhdGVYID0gc2Nyb2xsWCAhPSBlbC5lWFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgdXBkYXRlWSA9IHNjcm9sbFkgIT0gZWwuZVlcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgb3RoZXJFbCwgaSA9IDBcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbC5lWCA9IHNjcm9sbFhcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWwuZVkgPSBzY3JvbGxZXG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9yICg7aSA8IGVsZW1zW2xlbmd0aF07KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvdGhlckVsID0gZWxlbXNbaSsrXVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG90aGVyRWwgIT0gZWwpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodXBkYXRlWCAmJlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBNYXRoX3JvdW5kKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb3RoZXJFbFtzY3JvbGwrTGVmdF0gLVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKHNjcm9sbFggPSBvdGhlckVsLmVYID1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBNYXRoX3JvdW5kKHhSYXRlICpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKG90aGVyRWxbc2Nyb2xsK1dpZHRoXSAtXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvdGhlckVsW2NsaWVudCtXaWR0aF0pKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG90aGVyRWxbc2Nyb2xsK0xlZnRdID0gc2Nyb2xsWFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodXBkYXRlWSAmJlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBNYXRoX3JvdW5kKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb3RoZXJFbFtzY3JvbGwrVG9wXSAtXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAoc2Nyb2xsWSA9IG90aGVyRWwuZVkgPVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIE1hdGhfcm91bmQoeVJhdGUgKlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAob3RoZXJFbFtzY3JvbGwrSGVpZ2h0XSAtXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvdGhlckVsW2NsaWVudCtIZWlnaHRdKSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvdGhlckVsW3Njcm9sbCtUb3BdID0gc2Nyb2xsWVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sIDBcbiAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgfSkoZWwsIG5hbWUpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgXG4gICAgICAgICAgICAgICBcbiAgICAgICAgICAgIGlmIChkb2N1bWVudC5yZWFkeVN0YXRlID09IFwiY29tcGxldGVcIikge1xuICAgICAgICAgICAgICAgIHJlc2V0KClcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgd2luZG93W2FkZEV2ZW50TGlzdGVuZXJdKFwibG9hZFwiLCByZXNldCwgMCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfSxcblxuICAgIH1cblxuICAgIG1vZHVsZS5leHBvcnRzID0gU3luY3Njcm9sbFxuXG59KCkpXG4iLCIoZnVuY3Rpb24gKCkge1xuXG4gICAgdmFyIFJvbGxlclRleHRcblxuICAgIFJvbGxlclRleHQgPSB7XG4gICAgICAgIHBocmFzZXM6IFtcbiAgICAgICAgICAgICdtdWx0aS1kYXknLFxuICAgICAgICAgICAgJ3dlZWtlbmQnLFxuICAgICAgICAgICAgJ2JvdXRpcXVlJyxcbiAgICAgICAgICAgICdjb3VudHJ5JyxcbiAgICAgICAgICAgICdob2xpZGF5JyxcbiAgICAgICAgICAgICdyb2NrJyxcbiAgICAgICAgICAgICdjaXR5JyxcbiAgICAgICAgICAgICdkYW5jZScsXG4gICAgICAgICAgICAncG9zdC1wdW5rJyxcbiAgICAgICAgICAgICdmYW1pbHknLFxuICAgICAgICAgICAgJ21ldGFsJyxcbiAgICAgICAgICAgICdqYXp6JyxcbiAgICAgICAgICAgICd3ZWlyZCcsXG4gICAgICAgICAgICAnc3BlY2lhbCcsXG4gICAgICAgICAgICAnY2xhc3NpY2FsJyxcbiAgICAgICAgICAgICd3aW50ZXInXG4gICAgICAgIF0sXG4gICAgICAgIGRvbToge1xuICAgICAgICAgICAgdGV4dFdyYXA6IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5yb2xsZXJUZXh0JyksXG4gICAgICAgICAgICBjdXJyZW50OiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdbZGF0YS10ZXh0LWN1cnJlbnRdJyksXG4gICAgICAgICAgICBuZXh0OiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdbZGF0YS10ZXh0LW5leHRdJyksXG4gICAgICAgIH0sXG4gICAgICAgIGludGVydmFsTGVuZ3RoICAgICAgICAgIDogMTUwMCxcbiAgICAgICAgbmV4dFBocmFzZSAgICAgICAgICA6ICd3aW50ZXInLFxuICAgICAgICBjb3VudGVyICAgICAgICAgICAgICAgICA6IG51bGwsXG4gICAgICAgIHRpY2tlciAgICAgICAgICAgICAgICAgIDogZmFsc2UsXG5cbiAgICAgICAgaW5pdDogKCkgPT4ge1xuICAgICAgICAgICAgXG4gICAgICAgICAgICAgXG4gICAgICAgICAgICBpZihSb2xsZXJUZXh0LmRvbS50ZXh0V3JhcClcbiAgICAgICAgICAgICAgICBSb2xsZXJUZXh0LnN0YXJ0Y291bnRlcigpXG4gICAgICAgICAgICBcbiAgICAgICAgfSxcblxuICAgICAgICBzdGFydGNvdW50ZXI6ICgpID0+IHtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgUm9sbGVyVGV4dC5zZXRXaWR0aChSb2xsZXJUZXh0LmRvbS5jdXJyZW50KVxuXG4gICAgICAgICAgICBsZXQgaSA9IDFcbiAgICAgICAgICAgIFJvbGxlclRleHQuY291bnRlciA9IHNldEludGVydmFsKCgpID0+IHsgICAgICAgXG5cbiAgICAgICAgICAgICAgICBjb25zdCBjdXJyZW50UGhyYXNlID0gUm9sbGVyVGV4dC5waHJhc2VzW2ldXG4gICAgICAgICAgICAgICAgY29uc3QgbmV4dFBocmFzZSA9IFJvbGxlclRleHQucGhyYXNlc1tpICsgMV0gPyBSb2xsZXJUZXh0LnBocmFzZXNbaSArIDFdIDogUm9sbGVyVGV4dC5waHJhc2VzWzBdXG5cbiAgICAgICAgICAgICAgICBSb2xsZXJUZXh0LmRvbS50ZXh0V3JhcC5jbGFzc0xpc3QuYWRkKCd0dXJuJylcblxuICAgICAgICAgICAgICAgIFJvbGxlclRleHQuc2V0V2lkdGgoUm9sbGVyVGV4dC5kb20ubmV4dClcblxuICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuXG4gICAgICAgICAgICAgICAgICAgIFJvbGxlclRleHQuZG9tLnRleHRXcmFwLmNsYXNzTGlzdC5yZW1vdmUoJ3R1cm4nKVxuXG4gICAgICAgICAgICAgICAgICAgIC8vIFVwZGF0ZSBtb2JpbGUgc2NyZWVuIGltYWdlXG4gICAgICAgICAgICAgICAgICAgIFJvbGxlclRleHQuZG9tLmN1cnJlbnQudGV4dENvbnRlbnQgPSBjdXJyZW50UGhyYXNlXG4gICAgICAgICAgICAgICAgICAgIFJvbGxlclRleHQuZG9tLm5leHQudGV4dENvbnRlbnQgPSBuZXh0UGhyYXNlXG5cbiAgICAgICAgICAgICAgICB9LCAxMDAwKVxuXG5cbiAgICAgICAgICAgICAgICAvLyBJZiB3ZSByZWFjaCB0aGUgZW5kIG9mIHRoZSB0aGVtZXMsIHJlc2V0IHRvIGZpcnN0IHRoZW1lXG4gICAgICAgICAgICAgICAgaSA+PSBSb2xsZXJUZXh0LnBocmFzZXMubGVuZ3RoIC0gMSA/IGkgPSAwIDogaSsrXG5cbiAgICAgICAgICAgIH0sIFJvbGxlclRleHQuaW50ZXJ2YWxMZW5ndGgpO1xuICAgICAgICB9LFxuXG4gICAgICAgIHNldFdpZHRoOiAoZWxlbWVudCkgPT4ge1xuICAgICAgICAgICAgbGV0IHRleHRXaWR0aCA9IGVsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkud2lkdGhcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgUm9sbGVyVGV4dC5kb20udGV4dFdyYXAuc3R5bGUud2lkdGggPSBgJHt0ZXh0V2lkdGh9cHhgXG4gICAgICAgIH1cblxuICAgIH1cblxuICAgIG1vZHVsZS5leHBvcnRzID0gUm9sbGVyVGV4dFxuXG59KCkpXG4iLCIoZnVuY3Rpb24gKCl7XG5cbiAgICAndXNlIHN0cmljdCdcblxuXHR2YXIgUGxvdCAgICBcdFx0PSByZXF1aXJlKCcuLi8uLi8uLi9wbG90LWNvcmUvc3JjL2pzL3Bsb3QnKSwgIFxuXHRcdExhenlMb2FkICAgXHQgXHQ9IHJlcXVpcmUoJy4uLy4uLy4uL3Bsb3QtY29yZS9zcmMvanMvbGF6eWxvYWQnKSxcblx0XHRNb2RhbHNcdFx0XHQ9IHJlcXVpcmUoJy4uLy4uLy4uL3Bsb3QtY29yZS9zcmMvanMvbW9kYWxzJyksXG5cdFx0Q2Fyb3VzZWxzXHRcdD0gcmVxdWlyZSgnLi4vLi4vLi4vcGxvdC1jb3JlL3NyYy9qcy9jYXJvdXNlbHMnKSxcblx0XHRTbW9vdGggXHRcdFx0PSByZXF1aXJlKCcuLi8uLi8uLi9wbG90LWNvcmUvc3JjL2pzL3Bsb3Qtc21vb3RoLXNjcm9sbCcpLFxuXHRcdEZBUXMgXHRcdFx0PSByZXF1aXJlKCcuLi8uLi8uLi9wbG90LWNvcmUvc3JjL2pzL2ZhcXMnKSxcblx0XHQvLyBDdXN0b21Nb3VzZSBcdD0gcmVxdWlyZSgnLi4vLi4vLi4vcGxvdC1jb3JlL3NyYy9qcy9jdXN0b20tbW91c2UnKSxcblx0XHRIb21lXHRcdFx0PSByZXF1aXJlKCcuL3BhZ2VzL2hvbWUnKSxcblx0XHRSb2xsZXJUZXh0ICAgICAgPSByZXF1aXJlKCcuL2NvbXBvbmVudHMvcm9sbGVyLXRleHQnKSxcblx0XHRQcmljaW5nICAgICAgICAgPSByZXF1aXJlKCcuL3BhZ2VzL3ByaWNpbmcnKSxcblx0XHRBcnRpc3RzXHRcdFx0PSByZXF1aXJlKCcuL3BhZ2VzL2FydGlzdHMnKSxcblx0XHRTY2hlZHVsZVx0XHQ9IHJlcXVpcmUoJy4vcGFnZXMvc2NoZWR1bGUnKSxcblx0XHROZXdzIFx0XHRcdD0gcmVxdWlyZSgnLi9wYWdlcy9uZXdzJyksXG5cdCAgICBNYWluXG5cblx0TWFpbiA9IHtcblxuXHRcdGluaXQ6ICgpID0+IHtcdFxuXG5cdFx0XHRNYWluLmluaXRhbGl6ZVNtb290aCgpXG5cblx0XHRcdFBsb3QuaW5pdCgpIFxuXHRcdFx0TGF6eUxvYWQuaW5pdCgpXG5cdFx0XHRNb2RhbHMuaW5pdCgpICBcblx0XHRcdENhcm91c2Vscy5pbml0KClcblx0XHRcdEZBUXMuaW5pdCgpXG5cdFx0XHRSb2xsZXJUZXh0LmluaXQoKVxuXHRcdFx0TWFpbi5maXJlQ29udmVyc2lvblNuaXBwZXRzSWZPblRoYW5rWW91UGFnZSgpXG5cdFx0XHQvLyBDdXN0b21Nb3VzZS5pbml0KHtcblx0XHRcdC8vIFx0J2EnIFx0XHRcdFx0OiAnYW5jaG9ySG92ZXInLFxuXHRcdFx0Ly8gXHQnLmFsdEhvdmVyVGFyZ2V0J1x0OiAnYWx0SG92ZXInXG5cdFx0XHQvLyB9KVxuXG5cblx0XHRcdC8vUGFnZXNcbiAgICAgICAgXHRpZihQbG90LmlzUGFnZSgnaG9tZScpKVxuXHRcdFx0XHRIb21lLmluaXQoKVxuXG4gICAgICAgIFx0aWYoUGxvdC5pc1BhZ2UoJ3NjaGVkdWxlJykpXG5cdFx0XHRcdFNjaGVkdWxlLmluaXQoKVxuXG4gICAgICAgIFx0aWYoUGxvdC5pc1BhZ2UoJ2FydGlzdHMnKSlcblx0XHRcdFx0QXJ0aXN0cy5pbml0KClcblxuXHRcdFx0aWYoUGxvdC5pc1BhZ2UoJ3ByaWNpbmcnKSlcblx0XHRcdFx0UHJpY2luZy5pbml0KClcblxuXHRcdFx0TmV3cy5pbml0KClcblx0XHRcdFxuXHRcdFx0TWFpbi5kZW1vQWpheEJ1dHRvbigpIFxuXG5cdFx0ICAgIGlmICh0eXBlb2Yod2luZG93Lkh1YlNwb3RDb252ZXJzYXRpb25zKSAhPSAndW5kZWZpbmVkJykge1xuXHRcdFx0ICAgIE1haW4uaHVic3BvdCgpO1xuXHRcdCAgXHR9IGVsc2Uge1xuXHRcdCAgICBcdHdpbmRvdy5oc0NvbnZlcnNhdGlvbnNPblJlYWR5ID0gW01haW4uaHVic3BvdF07XG5cdFx0ICBcdH1cblxuXHRcdH0sXG5cdFx0XG5cdFx0aW5pdGFsaXplU21vb3RoIDogKCkgPT4ge1xuXG4gICAgICAgIFx0Y29uc3QgaGFzU21vb3RoU2Nyb2xsID0gZG9jdW1lbnQuYm9keS5kYXRhc2V0LnBsb3RDdXN0b21pemVyU21vb3RoU2Nyb2xsXG5cbiAgICAgICAgXHRjb25zdCBzbW9vdGhTZXR0aW5ncyA9IHtcblx0XHRcdFx0c3RhbmRhcmRTY3JvbGwgIDogaGFzU21vb3RoU2Nyb2xsICE9ICd5ZXMnXG5cdFx0XHR9XG5cbiAgICAgICAgXHRTbW9vdGguaW5pdChzbW9vdGhTZXR0aW5ncylcblxuICAgICAgICB9LFxuXG4gICAgICAgIGZpcmVDb252ZXJzaW9uU25pcHBldHNJZk9uVGhhbmtZb3VQYWdlIDogKCkgPT4ge1xuXG4gICAgICAgIFx0Y29uc3QgdXJsUGFyYW1zID0gbmV3IFVSTFNlYXJjaFBhcmFtcyh3aW5kb3cubG9jYXRpb24uc2VhcmNoKTtcblx0XHRcdGNvbnN0IHRyYWNraW5nQ29kZSA9IHVybFBhcmFtcy5nZXQoJ2NvZGUnKTtcblxuXG4gICAgICAgIFx0aWYoZ3RhZyAmJiB0cmFja2luZ0NvZGUpIHtcbiAgICAgICAgXHRcdGNvbnNvbGUubG9nKCdwaW5nJyx0cmFja2luZ0NvZGUpXG4gICAgXHRcdCBcdGd0YWcoJ2V2ZW50JywgJ2NvbnZlcnNpb24nLCB7J3NlbmRfdG8nOiAnQVctNjE5MDMyMzQ3LycgKyB0cmFja2luZ0NvZGV9KVxuICAgIFx0XHQgfVxuXG4gICAgICAgIH0sXG5cbiAgICAgICAgZm9ybUlzU3VibWl0dGVkIDogKCkgPT4ge1xuXG4gICAgICAgIFx0dmFyIGVyclZhbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5pbnB1dC1lcnJvcicpLmxlbmd0aFxuXHRcdCAgICBpZiAoZXJyVmFsID09PSAwKSB7IFxuXHRcdCAgICAgIFx0Z3RhZygnZXZlbnQnLCAnY29udmVyc2lvbicsIHsnc2VuZF90byc6ICdBVy02MTkwMzIzNDcveS1HMUNNT3B1dGtCRUp2ZWxxY0MnfSk7XG5cdFx0ICAgIH0gIGVsc2Uge1xuXHRcdCAgICB9XG5cbiAgICAgICAgfSxcblxuICAgICAgICBjaGVja1BvcFVwRm9ybUV4aXN0cyA6ICgpID0+IHtcblxuICAgICAgICBcdGNvbnN0IGZvcm0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjaHNQb3BVcEZvcm0tNzNlZTNlY2YtN2Y4YS00MmM2LTlkY2MtNzI1YzdjODY2MWEyJylcblxuICAgICAgICBcdGlmKCFmb3JtKSB7XG4gICAgICAgIFx0XHRzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XG4gICAgICAgIFx0XHRcdE1haW4uY2hlY2tQb3BVcEZvcm1FeGlzdHMoKVxuXG4gICAgICAgIFx0XHR9LDUwMClcbiAgICAgICAgXHR9IGVsc2Uge1xuXHQgICAgICAgICAgZm9ybS5vbnN1Ym1pdCA9IGZ1bmN0aW9uICgpIHtcblxuXHQgICAgICAgICAgXHRjb25zb2xlLmxvZygnY29udmVydGVkJylcblx0ICAgICAgICAgIFx0TWFpbi5mb3JtSXNTdWJtaXR0ZWQoKVxuXHQgICAgICAgICAgXHR2YXIgaW1nID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImltZ1wiKVxuXHRcdFx0XHRpbWcuc3JjID0gXCJodHRwczovL3B4LmFkcy5saW5rZWRpbi5jb20vY29sbGVjdC8/cGlkPTIzNTQ3NTYmY29udmVyc2lvbklkPTI3MDY3OTYmZm10PWdpZlwiO1xuXHRcdFx0XHRcblx0XHRcdFx0ZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChpbWcpXG5cdCAgICAgICAgICB9XG4gICAgICAgIFx0fVxuXG4gICAgICAgIH0sXG5cbiAgICAgICAgaHVic3BvdCA6ICgpID0+IHtcblxuICAgICAgICBcdE1haW4uY2hlY2tQb3BVcEZvcm1FeGlzdHMoKVxuXG4gICAgXHRcdHdpbmRvdy5IdWJTcG90Q29udmVyc2F0aW9ucy5vbignY29udmVyc2F0aW9uU3RhcnRlZCcsIHBheWxvYWQgPT4ge1xuXG4gICAgXHRcdCBpZihndGFnKSB7XG4gICAgXHRcdCBcdGd0YWcoJ2V2ZW50JywgJ2NvbnZlcnNpb24nLCB7XG5cdFx0XHRcdCAgICAgICdzZW5kX3RvJzogJ0FXLTYxOTAzMjM0Ny9ZOXVqQ1B5RDFka0JFSnZlbHFjQydcblx0XHRcdFx0ICB9KVxuICAgIFx0XHQgfVxuXG4gICAgICAgICAgXHR2YXIgaW1nID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImltZ1wiKVxuXHRcdFx0aW1nLnNyYyA9IFwiaHR0cHM6Ly9weC5hZHMubGlua2VkaW4uY29tL2NvbGxlY3QvP3BpZD0yMzU0NzU2JmNvbnZlcnNpb25JZD0yNzIyNzE2JmZtdD1naWZcIjtcblx0XHRcdFxuXHRcdFx0ZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChpbWcpXG5cdFx0XHQgXG5cblx0XHRcdH0pXG5cbiAgICAgICAgfSxcblxuICAgICAgICBkZW1vQWpheEJ1dHRvbiA6ICgpID0+IHtcblxuXHRcdFx0dmFyIHBsb3REZW1vTG9hZENvbnRlbnQgPSAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLkpTLS1wbG90TG9hZFRlbXBsYXRlUGFydERlbW8nKTtcblx0XHRcdFxuXG5cdFx0XHRpZihwbG90RGVtb0xvYWRDb250ZW50KVxuXG5cdFx0XHRcdHBsb3REZW1vTG9hZENvbnRlbnQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBlID0+IHtcblxuXHRcdFx0XHRcdC8vIFRha2UgYSBsb29rIGF0IHdoYXQgeW91IGNhbiBwYXNzIHRvIHRoaXMgZnVuY3Rpb25cblx0XHRcdFx0XHQvLyB2YXIgYXJncyA9IHtcblx0XHRcdFx0ICAgIC8vICAgICAgICAgICAgICB0ZW1wbGF0ZVBhcnQgICAgOiBudWxsLFxuXHRcdFx0XHQgICAgLy8gICAgICAgICAgICAgIGFjdGlvbiAgICAgICAgICA6ICdwbG90TG9hZFRlbXBsYXRlUGFydCcsIC8vVGhpcyBpcyB0aGUgYWN0aW9uIGZpcmVkIGludG8gb3VyIFBsb3RTaXRlIFBIUCBzZXR1cC5waHAgZmlsZVxuXHRcdFx0XHQgICAgLy8gICAgICAgICAgICAgIGRhdGEgICAgICAgICAgICA6IHt9LCAvL0FueSBkYXRhIHdlJ2QgbGlrZSB0byBwYXNzIHRvIHRoZSB0ZW1wbGF0ZSBwYXJ0LiBcblx0XHRcdFx0ICAgIC8vICAgICAgICAgICAgICBjb250ZW50QXJlYSAgICAgOiAnLkpTLS1hamF4VGFyZ2V0QXJlYScsIC8vV2hlcmUgdGhlIG5ldyBjb250ZW50IGdldHMgaW5zZXJ0c1xuXHRcdFx0XHQgICAgLy8gICAgICAgICAgICAgIGFwcGVuZCAgICAgICAgICA6IGZhbHNlIC8vSWYgd2Ugd2FudCB0byBhcHBlbmQgdG8gdGhlIGFib3ZlIGFyZWEsIG9yIHJlcGxhY2UgdGhlIGNvbnRlbnRcblx0XHRcdFx0ICAgIC8vICAgICAgICAgIH1cblxuXHRcdFx0XHRcdGNvbnN0IGFyZ3MgPSB7XG5cblx0XHRcdFx0XHRcdHRlbXBsYXRlUGFydCA6ICdkZW1vcy9hamF4LWNvbnRlbnQnLCBcblx0XHRcdFx0XHRcdGRhdGEgOiB7XG5cdFx0XHRcdFx0XHRcdCdmb28nIFx0XHQ6ICdiYXInLFxuXHRcdFx0XHRcdFx0XHQnYmFuZ2VycydcdDogJ21hc2gnLFxuXHRcdFx0XHRcdFx0XHQnaGF2aW5nJ1x0OiAnaXQnXG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXG5cblx0XHRcdFx0XHRQbG90LmxvYWRUZW1wbGF0ZVBhcnQoYXJncylcblxuXHRcdFx0XHR9KVxuXG4gICAgICAgIH1cblxuXHR9XG5cblx0d2luZG93Lk1haW4gPSBNYWluXG5cbn0oKSk7XG4gIiwiKGZ1bmN0aW9uICgpIHtcblxuICAgIHZhciBQbG90IFx0XHRcdD0gcmVxdWlyZSgnLi4vLi4vLi4vLi4vcGxvdC1jb3JlL3NyYy9qcy9wbG90JyksXG4gICAgICAgIE1vZGFscyAgICAgICAgICA9IHJlcXVpcmUoJy4uLy4uLy4uLy4uL3Bsb3QtY29yZS9zcmMvanMvbW9kYWxzJyksXG4gICAgXHRBcnRpc3RzXG5cbiAgICAvL01heSB0aGlzIG9iamVjdCBhY3QgYXMgYSBndWlkZSB0byB1c2luZyBQbG90IGNvcmUgZnVuY3Rpb25zXG4gICAgLy9hbmQgaG93IHRvIHNldCB1cCBhamF4IGR5bmFtaWMgZGF0YSB3aXRoIG91ciBuZXcgcHJpbmNpcGxlcyB3aXRoIGVhc2VcbiAgICBBcnRpc3RzID0ge1xuXG4gICAgXHRtYXhQYWdlcyBcdFx0XHQ6IDEsXG4gICAgXHRjdXJyZW50UGFnZSBcdFx0OiAxLFxuICAgIFx0Y3VycmVudEFydGlzdFR5cGVcdDogZmFsc2UsXG4gICAgXHRsb2FkTW9yZUJ1dHRvbiAgXHQ6IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5KUy0tYXJ0aXN0c0xvYWRNb3JlJyksXG5cbiAgICAgICAgaW5pdDogKCkgPT4ge1xuXG4gICAgICAgIFx0QXJ0aXN0cy5zaG93T3JIaWRlTG9hZE1vcmVCdXR0b24oKVxuXG4gICAgICAgICAgICBBcnRpc3RzLmNyZWF0ZUxpc3RlbmVycygpXG5cbiAgICAgICAgfSxcblxuICAgICAgICBjcmVhdGVMaXN0ZW5lcnM6ICgpID0+IHtcblxuICAgICAgICBcdEFydGlzdHMubG9hZE1vcmVCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBlID0+IHtcblxuICAgICAgICBcdFx0Y29uc3QgbmV4dFBhZ2UgPSBwYXJzZUludChBcnRpc3RzLmxvYWRNb3JlQnV0dG9uLmRhdGFzZXQubmV4dFBhZ2UpXG5cbiAgICAgICAgXHRcdEFydGlzdHMuY3VycmVudFBhZ2UgPSBuZXh0UGFnZVxuXG4gICAgICAgIFx0XHRBcnRpc3RzLmxvYWRBcnRpc3RzKHRydWUpXG5cbiAgICAgICAgXHRcdEFydGlzdHMubG9hZE1vcmVCdXR0b24uZGF0YXNldC5uZXh0UGFnZSA9IG5leHRQYWdlICsgMVxuXG4gICAgICAgIFx0fSlcblxuICAgICAgICBcdGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZSA9PiB7XG5cbiAgICAgICAgICAgICAgICAvL0hhdmUgd2UgY2xpY2tlZCBvbiBhbiBhcnRpc3QgdHlwZSBmaWx0ZXIgYnV0dG9uP1xuXHRcdFx0XHRpZiAoZS50YXJnZXQuY2xvc2VzdCgnLkpTLS1hcnRpc3RUeXBlQnV0dG9uJykpIHtcblx0XHRcdFx0XHRBcnRpc3RzLmN1cnJlbnRBcnRpc3RUeXBlID0gZS50YXJnZXQuZGF0YXNldC5hcnRpc3RUeXBlSWRcblx0XHRcdFx0XHRBcnRpc3RzLmN1cnJlbnRQYWdlID0gMVxuICAgICAgICAgICAgICAgICAgICBBcnRpc3RzLmxvYWRNb3JlQnV0dG9uLmRhdGFzZXQubmV4dFBhZ2UgPSAyXG5cdFx0XHRcdFx0QXJ0aXN0cy5sb2FkQXJ0aXN0cyhmYWxzZSkudGhlbigoKSA9PiB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5KUy0tYXJ0aXN0VHlwZUJ1dHRvbicpLmZvckVhY2goYXJ0aXN0VHlwZUJ1dHRvbiA9PiB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhcnRpc3RUeXBlQnV0dG9uLmNsYXNzTGlzdC5yZW1vdmUoJ3NlbGVjdGVkJylcblxuICAgICAgICAgICAgICAgICAgICAgICAgfSlcblxuICAgICAgICAgICAgICAgICAgICAgICAgZS50YXJnZXQuY2xhc3NMaXN0LmFkZCgnc2VsZWN0ZWQnKVxuICAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgIH0pXG5cdFx0XHRcdH0gXG5cblx0XHRcdH0sIGZhbHNlKVxuXG5cbiAgICAgICAgfSxcblxuICAgICAgICBsb2FkQXJ0aXN0cyA6IGFwcGVuZCA9PiB7XG5cbiAgICAgICAgXHRjb25zdCBhcmdzID0ge1xuXHRcdFx0XHR0ZW1wbGF0ZVBhcnQgOiAncGFydHMvYXJ0aXN0LWxpc3RpbmcnLCBcblx0XHRcdFx0ZGF0YSA6IHtcblx0XHRcdFx0XHQncGFnZScgXHRcdFx0OiBBcnRpc3RzLmN1cnJlbnRQYWdlLFxuXHRcdFx0XHRcdCdhcnRpc3RUeXBlJ1x0OiBBcnRpc3RzLmN1cnJlbnRBcnRpc3RUeXBlXG5cdFx0XHRcdH0sXG5cdFx0XHRcdGFwcGVuZCA6IGFwcGVuZCBcblx0XHRcdH1cblxuXHRcdFx0cmV0dXJuIFBsb3QubG9hZFRlbXBsYXRlUGFydChhcmdzKS50aGVuKGh0bWwgPT4ge1xuXG5cdFx0XHRcdEFydGlzdHMuc2hvd09ySGlkZUxvYWRNb3JlQnV0dG9uKClcblxuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlXG5cblx0XHRcdH0pXG5cbiAgICAgICAgfSxcblxuICAgICAgICBzaG93T3JIaWRlTG9hZE1vcmVCdXR0b24gOiAoKSA9PiB7XG5cbiAgICAgICAgXHQvL0NoZWNrIGlmIG1heCBwYWdlcyBpcyAxLiBJZiBpdCBpcywgdGhlcmUncyBvbmx5IDEgcGFnZSBvZiBhcnRpc3RzXG4gICAgICAgIFx0Ly9zbyB3ZSBjYW4gaGlkZSBsb2FkIG1vcmUgYnV0dG9uXG4gICAgICAgIFx0QXJ0aXN0cy5tYXhQYWdlcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5KUy0tbWF4UGFnZXMnKS5kYXRhc2V0Lm1heFBhZ2VzXG5cbiAgICAgICAgXHRpZihBcnRpc3RzLm1heFBhZ2VzID4gQXJ0aXN0cy5jdXJyZW50UGFnZSlcbiAgICAgICAgXHRcdEFydGlzdHMubG9hZE1vcmVCdXR0b24uY2xhc3NMaXN0LnJlbW92ZSgnaGlkZGVuJylcbiAgICAgICAgXHRlbHNlIFxuICAgICAgICBcdFx0QXJ0aXN0cy5sb2FkTW9yZUJ1dHRvbi5jbGFzc0xpc3QuYWRkKCdoaWRkZW4nKVxuXG4gICAgICAgIH1cblxuICAgIH1cblxuICAgIG1vZHVsZS5leHBvcnRzID0gQXJ0aXN0c1xuXG59KCkpIiwiKGZ1bmN0aW9uICgpIHtcblxuICAgIHZhciBIb21lXG5cbiAgICBIb21lID0ge1xuICAgICAgICBkb20gOiB7XG4gICAgICAgICAgICBib2R5ICAgICAgICAgICAgICAgICAgICA6IGRvY3VtZW50LmJvZHksXG4gICAgICAgICAgICByb290ICAgICAgICAgICAgICAgICAgICA6IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2h0bWwnKSxcbiAgICAgICAgICAgIHBob25lICAgICAgICAgICAgICAgICAgIDogZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm1vYmlsZTNEX19waG9uZScpLFxuICAgICAgICAgICAgaG9tZUJhbm5lciAgICAgICAgICAgICAgOiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuaG9tZUJhbm5lcicpLFxuICAgICAgICAgICAgaGVhZGVyICAgICAgICAgICAgICAgICAgOiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjc2l0ZU1haW5IZWFkZXInKSxcbiAgICAgICAgfSxcbiAgICAgICAgcHJldmlvdXNUaGVtZSAgICAgICAgICAgOiAnaG9tZScsXG4gICAgICAgIGNvdW50ZXIgICAgICAgICAgICAgICAgIDogbnVsbCxcbiAgICAgICAgdGlja2VyICAgICAgICAgICAgICAgICAgOiBmYWxzZSxcbiAgICAgICAgY3VycmVudE1vdXNlUG9zaXRpb24gICAgOiB7XG4gICAgICAgICAgICBYOiB3aW5kb3cuaW5uZXJXaWR0aCAvIDIsXG4gICAgICAgICAgICBZOiB3aW5kb3cuaW5uZXJIZWlnaHQgLyAyXG4gICAgICAgIH0sXG4gICAgICAgIHByZXZpb3VzTW91c2VQb3NpdGlvbiAgIDoge1xuICAgICAgICAgICAgWDogd2luZG93LmlubmVyV2lkdGggLyAyLFxuICAgICAgICAgICAgWTogd2luZG93LmlubmVySGVpZ2h0IC8gMlxuICAgICAgICB9LFxuICAgICAgICBtb3VzZU1vdmVBbmltYXRpb25GcmFtZSA6IG51bGwsXG4gICAgICAgIGN1cnJlbnRTbGlkZSA6IDAsXG4gICAgICAgIHRoZW1lczogW1xuICAgICAgICAgICAgJ2Jyb2Nrd2VsbCcsXG4gICAgICAgICAgICAnbWlnaHR5aG9vcGxhJyxcbiAgICAgICAgICAgICdhZnJpY2FveWUnLFxuICAgICAgICAgICAgJ3NvdXRoZmFjaW5nJyxcbiAgICAgICAgXSxcblxuICAgICAgICBpbml0OiAoKSA9PiB7XG5cbiAgICAgICAgICAgIEhvbWUuY3JlYXRlTGlzdGVuZXJzKClcblxuICAgICAgICAgICAgSG9tZS5zdGFydFRoZW1lQ291bnRlcigpXG5cbiAgICAgICAgICAgIEhvbWUuc2V0V2lkdGhPZlBob25lKClcblxuICAgICAgICB9LFxuXG4gICAgICAgIGNyZWF0ZUxpc3RlbmVyczogKCkgPT4ge1xuICAgICAgICAgICAgXG4gICAgICAgICAgICBjb25zdCBob21lQmFubmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmhvbWVCYW5uZXInKVxuICAgICAgICAgICAgXG4gICAgICAgICAgICAvLyBPYnNlcnZlIHRoZSBob21lYmFubmVyIHNlY3Rpb24gZm9yIGNsYXNzIGNoYW5nZXNcbiAgICAgICAgICAgIGNvbnN0IG9ic2VydmVyID0gbmV3IE11dGF0aW9uT2JzZXJ2ZXIoSG9tZS5iYW5uZXJNdXRhdGlvbilcbiAgICAgICAgICAgIG9ic2VydmVyLm9ic2VydmUoaG9tZUJhbm5lciwge1xuICAgICAgICAgICAgICBhdHRyaWJ1dGVzICA6IHRydWUsXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgXG4gICAgICAgICAgICBjb25zdCBidXJnZXJNZW51VHJpZ2dlcnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuSlMtLW1lbnVUcmlnZ2VyJylcblxuICAgICAgICAgICAgLy8gVG9nZ2xlIGJhbm5lciBhbmltYXRpb24gd2hlbiBtZW51IG9wZW5lZC9jbG9zZWRcbiAgICAgICAgICAgIGJ1cmdlck1lbnVUcmlnZ2Vycy5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIEhvbWUudG9nZ2xlVGhlbWVDb3VudGVyKVxuXG4gICAgICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncmVzaXplJyxIb21lLnNldFdpZHRoT2ZQaG9uZSlcbiAgICAgICAgICAgIFxuXG4gICAgICAgICAgICBpZih3aW5kb3cuaW5uZXJXaWR0aCA8IDY0MCkge1xuXG4gICAgICAgICAgICAgICAgSG9tZS5kb20uYm9keS5jbGFzc0xpc3QuYWRkKCdzbWFsbFNjcmVlbicpO1xuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgfSBlbHNlIHtcblxuICAgICAgICAgICAgICAgIEhvbWUubW91c2VNb3ZlQW5pbWF0aW9uRnJhbWUgPSByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoSG9tZS5ydW5Nb3VzZU1vdmUpXG5cbiAgICAgICAgICAgICAgICBIb21lLmRvbS5ob21lQmFubmVyLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlbW92ZScsIChlKSA9PiBIb21lLnRyYWNrQ3Vyc29yUG9zaXRpb24oZSkpIFxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIFxuICAgICAgICB9LFxuXG4gICAgICAgIHNldFdpZHRoT2ZQaG9uZSA6ICgpID0+IHtcblxuICAgICAgICAgICAgSG9tZS5kb20ucGhvbmUuc3R5bGUud2lkdGggPSBIb21lLmRvbS5waG9uZS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS5oZWlnaHQgKiAuNTUgKyAncHgnXG5cbiAgICAgICAgICAgIEhvbWUuZG9tLnBob25lLnN0eWxlLm9wYWNpdHkgPSAxXG5cbiAgICAgICAgfSxcblxuICAgICAgICBiYW5uZXJNdXRhdGlvbjogKG11dGF0aW9uc0xpc3QsIG9ic2VydmVyKSA9PiB7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIC8vIElmIHRoZSBiYW5uZXIgZWxlbWVudCBpcyBpbiB2aWV3XG4gICAgICAgICAgICBpZihtdXRhdGlvbnNMaXN0WzBdLnRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoJ3Bsb3RTbW9vdGhTY3JvbGxGcmFtZUluVmlldycpICYmICFIb21lLmJhbm5lckluVmlldykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIEhvbWUuYmFubmVySW5WaWV3ID0gdHJ1ZVxuXG4gICAgICAgICAgICAgICAgSG9tZS5zdGFydFRoZW1lQ291bnRlcigpXG5cbiAgICAgICAgICAgIH0gXG5cbiAgICAgICAgICAgIGlmKCFtdXRhdGlvbnNMaXN0WzBdLnRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoJ3Bsb3RTbW9vdGhTY3JvbGxGcmFtZUluVmlldycpICYmIEhvbWUuYmFubmVySW5WaWV3KSB7XG5cbiAgICAgICAgICAgICAgICBIb21lLmJhbm5lckluVmlldyA9IGZhbHNlXG5cbiAgICAgICAgICAgICAgICBIb21lLnN0b3BUaGVtZUNvdW50ZXIoKVxuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuXG4gICAgICAgIHRyYWNrQ3Vyc29yUG9zaXRpb246IChlKSA9PiB7XG4gICAgXG4gICAgICAgICAgICBIb21lLmN1cnJlbnRNb3VzZVBvc2l0aW9uID0ge1xuICAgICAgICAgICAgICAgIFg6IGUuY2xpZW50WCxcbiAgICAgICAgICAgICAgICBZOiBlLmNsaWVudFlcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgY29uc3QgbWlkZGxlUG9pbnRYID0gd2luZG93LmlubmVyV2lkdGggLyAyXG4gICAgICAgICAgICBjb25zdCBtaWRkbGVQb2ludFkgPSB3aW5kb3cuaW5uZXJIZWlnaHQgLyAyXG5cbiAgICAgICAgICAgIGlmKEhvbWUuY3VycmVudE1vdXNlUG9zaXRpb24uWCAgLSAyMDAwID4gbWlkZGxlUG9pbnRYKVxuICAgICAgICAgICAgICAgIEhvbWUuY3VycmVudE1vdXNlUG9zaXRpb24uWCA9IG1pZGRsZVBvaW50WCArIDIwMDBcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgaWYoSG9tZS5jdXJyZW50TW91c2VQb3NpdGlvbi5YICArIDIwMDAgPCBtaWRkbGVQb2ludFgpXG4gICAgICAgICAgICAgICAgSG9tZS5jdXJyZW50TW91c2VQb3NpdGlvbi5YID0gbWlkZGxlUG9pbnRYIC0gMjAwMFxuXG4gICAgICAgICAgICBpZihIb21lLmN1cnJlbnRNb3VzZVBvc2l0aW9uLlkgIC0gMjAwMCA+IG1pZGRsZVBvaW50WSlcbiAgICAgICAgICAgICAgICBIb21lLmN1cnJlbnRNb3VzZVBvc2l0aW9uLlkgPSBtaWRkbGVQb2ludFkgKyAyMDAwXG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGlmKEhvbWUuY3VycmVudE1vdXNlUG9zaXRpb24uWSAgKyAyMDAwIDwgbWlkZGxlUG9pbnRZKVxuICAgICAgICAgICAgICAgIEhvbWUuY3VycmVudE1vdXNlUG9zaXRpb24uWSA9IG1pZGRsZVBvaW50WSAtIDIwMDBcblxuICAgICAgICAgICAgaWYoSG9tZS50aWNrZXIgPT0gZmFsc2UpIHtcbiAgICAgICAgICAgICAgICBIb21lLnRpY2tlciA9IHRydWVcbiAgICAgICAgICAgICAgICBIb21lLm1vdXNlTW92ZUFuaW1hdGlvbkZyYW1lID0gcmVxdWVzdEFuaW1hdGlvbkZyYW1lKEhvbWUucnVuTW91c2VNb3ZlKVxuICAgICAgICAgICAgfVxuXG4gICAgICAgIH0sXG5cbiAgICAgICAgc3RhcnRUaGVtZUNvdW50ZXI6ICgpID0+IHtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgSG9tZS5iYW5uZXJJblZpZXcgPSB0cnVlO1xuXG4gICAgICAgICAgICAvLyBTZXQgaGVhZGVyIHRvIGRlZmF1bHQgc3R5bGVcbiAgICAgICAgICAgIGlmKEhvbWUuZG9tLmhlYWRlci5jbGFzc0xpc3QuY29udGFpbnMoJ2RlZmF1bHRIZWFkZXInKSlcbiAgICAgICAgICAgICAgICBIb21lLmRvbS5oZWFkZXIuY2xhc3NMaXN0LnJlbW92ZSgnZGVmYXVsdEhlYWRlcicpIFxuXG4gICAgICAgICAgICBIb21lLnRpbWVyKDQwMDApXG5cbiAgICAgICAgfSxcblxuICAgICAgICB0aW1lciA6IHRpbWUgPT4ge1xuXG4gICAgICAgICAgICBIb21lLmNvdW50ZXIgPSBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAvLyBVcGRhdGUgbW9iaWxlIHNjcmVlbiBpbWFnZVxuICAgICAgICAgICAgICAgIEhvbWUuZG9tLmJvZHkuZGF0YXNldC5jdXJyZW50VGhlbWUgPSBIb21lLnRoZW1lc1tIb21lLmN1cnJlbnRTbGlkZV1cbiAgICAgICAgICAgICAgICBIb21lLmRvbS5ib2R5LmRhdGFzZXQucHJldmlvdXNUaGVtZSA9IEhvbWUucHJldmlvdXNUaGVtZVxuXG4gICAgICAgICAgICAgICAgLy8gVXBkYXRlIHN0YXRlXG4gICAgICAgICAgICAgICAgSG9tZS5wcmV2aW91c1RoZW1lID0gSG9tZS50aGVtZXNbSG9tZS5jdXJyZW50U2xpZGVdXG5cbiAgICAgICAgICAgICAgICBIb21lLmRvbS5ib2R5LmNsYXNzTGlzdC5hZGQoJ3NsaWRlTW9iaWxlU2NyZWVuJylcblxuICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBIb21lLmRvbS5ib2R5LmNsYXNzTGlzdC5yZW1vdmUoJ3NsaWRlTW9iaWxlU2NyZWVuJykgICAgXG4gICAgICAgICAgICAgICAgfSwgMjAwMClcblxuICAgICAgICAgICAgICAgIC8vIElmIHdlIHJlYWNoIHRoZSBlbmQgb2YgdGhlIHRoZW1lcywgcmVzZXQgdG8gZmlyc3QgdGhlbWVcbiAgICAgICAgICAgICAgICBIb21lLmN1cnJlbnRTbGlkZSA+PSBIb21lLnRoZW1lcy5sZW5ndGggLSAxID8gSG9tZS5jdXJyZW50U2xpZGUgPSAwIDogSG9tZS5jdXJyZW50U2xpZGUrK1xuXG4gICAgICAgICAgICAgICAgSG9tZS50aW1lcig0MDAwKVxuXG4gICAgICAgICAgICB9LCB0aW1lKVxuXG4gICAgICAgIH0sXG5cbiAgICAgICAgc3RvcFRoZW1lQ291bnRlcjogKCkgPT4ge1xuXG4gICAgICAgICAgICBpZihIb21lLmNvdW50ZXIpXG4gICAgICAgICAgICAgICAgY2xlYXJJbnRlcnZhbChIb21lLmNvdW50ZXIpXG5cbiAgICAgICAgfSxcblxuICAgICAgICByZW1vdmVUaGVtZTogKCkgPT4ge1xuICAgICAgICAgICAgXG4gICAgICAgICAgICBpZihIb21lLnByZXZpb3VzVGhlbWUpXG4gICAgICAgICAgICAgICAgSG9tZS5kb20uYm9keS5jbGFzc0xpc3QucmVtb3ZlKEhvbWUucHJldmlvdXNUaGVtZSlcblxuICAgICAgICAgICAgLy8gU2V0IGhlYWRlciB0byBkZWZhdWx0IHN0eWxlXG4gICAgICAgICAgICBIb21lLmRvbS5oZWFkZXIuY2xhc3NMaXN0LmFkZCgnZGVmYXVsdEhlYWRlcicpIFxuICAgICAgICAgICAgXG4gICAgICAgIH0sXG5cbiAgICAgICAgdG9nZ2xlVGhlbWVDb3VudGVyOiAoKSA9PiB7XG4gICAgICAgICAgICAvLyBDYW5jZWwgYW5pbWF0aW9uIGlmIG1lbnUgaXMgb3BlblxuICAgICAgICAgICAgaWYoSG9tZS5kb20ucm9vdC5jbGFzc0xpc3QuY29udGFpbnMoJ2J1cmdlck9wZW4nKSkge1xuXG4gICAgICAgICAgICAgICAgSG9tZS5zdG9wVGhlbWVDb3VudGVyKClcbiAgICAgICAgICAgICAgICBIb21lLnJlbW92ZVRoZW1lKClcblxuICAgICAgICAgICAgLy8gU3RhcnQgYW5pbWF0aW9uIGlmIG1lbnUgaXMgY2xvc2VkIGFuZCBiYW5uZXIgaXMgaW4gdmlldyAgICBcbiAgICAgICAgICAgIH0gZWxzZSBpZihIb21lLmJhbm5lckluVmlldykge1xuXG4gICAgICAgICAgICAgICAgSG9tZS5zdGFydFRoZW1lQ291bnRlcigpXG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG5cbiAgICAgICAgcnVuTW91c2VNb3ZlIDogKCkgPT4ge1xuXG4gICAgICAgICAgICBjb25zdCBkaWZmZXJlbmNlT2ZQb3NpdGlvbnMgPSB7XG4gICAgICAgICAgICAgICAgWTogSG9tZS5jdXJyZW50TW91c2VQb3NpdGlvbi5ZIC0gSG9tZS5wcmV2aW91c01vdXNlUG9zaXRpb24uWSxcbiAgICAgICAgICAgICAgICBYOiBIb21lLmN1cnJlbnRNb3VzZVBvc2l0aW9uLlggLSBIb21lLnByZXZpb3VzTW91c2VQb3NpdGlvbi5YXG4gICAgICAgICAgICB9IFxuICAgICAgICAgICAgXG4gICAgICAgICAgICBIb21lLnByZXZpb3VzTW91c2VQb3NpdGlvbiA9IHtcbiAgICAgICAgICAgICAgICBYOiBIb21lLnByZXZpb3VzTW91c2VQb3NpdGlvbi5YICsgKGRpZmZlcmVuY2VPZlBvc2l0aW9ucy5YICogMC4xKSxcbiAgICAgICAgICAgICAgICBZOiBIb21lLnByZXZpb3VzTW91c2VQb3NpdGlvbi5ZICsgKGRpZmZlcmVuY2VPZlBvc2l0aW9ucy5ZICogMC4xKVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBjb25zdCB4U2hpZnQgPSAoSG9tZS5wcmV2aW91c01vdXNlUG9zaXRpb24uWCAtICh3aW5kb3cuaW5uZXJXaWR0aCAvIDIpKSAvICh3aW5kb3cuaW5uZXJXaWR0aCAvIDIgKVxuICAgICAgICAgICAgY29uc3QgeVNoaWZ0ID0gKCh3aW5kb3cuaW5uZXJIZWlnaHQgLyAyKSAtIEhvbWUucHJldmlvdXNNb3VzZVBvc2l0aW9uLlkpIC8gKHdpbmRvdy5pbm5lckhlaWdodCAvIDIgKVxuICAgICAgICAgICAgXG4gICAgICAgICAgICBIb21lLmRvbS5waG9uZS5zdHlsZS50cmFuc2Zvcm0gPSBgcm90YXRlWCgkezE1ICsgeVNoaWZ0Kjd9ZGVnKSByb3RhdGVZKCR7eFNoaWZ0KjYwID4gNTAgPyA1MCA6IHhTaGlmdCo2MH1kZWcpYFxuXG4gICAgICAgICAgICBjb25zdCBtdWx0aXBsaWVyID0gMTBcblxuICAgICAgICAgICAgaWYoTWF0aC5hYnMoZGlmZmVyZW5jZU9mUG9zaXRpb25zLlggKyBkaWZmZXJlbmNlT2ZQb3NpdGlvbnMuWSkgPCAuMSlcbiAgICAgICAgICAgICAgICBIb21lLnRpY2tlciA9IGZhbHNlXG5cbiAgICAgICAgICAgIGlmKEhvbWUudGlja2VyID09IHRydWUpIFxuICAgICAgICAgICAgICAgIEhvbWUubW91c2VNb3ZlQW5pbWF0aW9uRnJhbWUgPSByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoSG9tZS5ydW5Nb3VzZU1vdmUpXG5cbiAgICAgICAgfSxcblxuXG4gICAgfVxuXG4gICAgbW9kdWxlLmV4cG9ydHMgPSBIb21lXG5cbn0oKSkiLCIoZnVuY3Rpb24gKCkge1xuXG4gICAgdmFyIFBsb3QgXHRcdFx0PSByZXF1aXJlKCcuLi8uLi8uLi8uLi9wbG90LWNvcmUvc3JjL2pzL3Bsb3QnKSxcbiAgICBcdE5ld3NcblxuICAgIC8vTWF5IHRoaXMgb2JqZWN0IGFjdCBhcyBhIGd1aWRlIHRvIHVzaW5nIFBsb3QgY29yZSBmdW5jdGlvbnNcbiAgICAvL2FuZCBob3cgdG8gc2V0IHVwIGFqYXggZHluYW1pYyBkYXRhIHdpdGggb3VyIG5ldyBwcmluY2lwbGVzIHdpdGggZWFzZVxuICAgIE5ld3MgPSB7XG5cbiAgICBcdG1heFBhZ2VzIFx0XHRcdDogMSxcbiAgICAgICAgY3VycmVudE5ld3NDYXRlZ29yeSA6IDAsXG4gICAgICAgIGN1cnJlbnRQYWdlICAgICAgICAgOiAxLFxuICAgIFx0bG9hZE1vcmVCdXR0b24gIFx0OiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuSlMtLW5ld3NMb2FkTW9yZScpLFxuXG4gICAgICAgIGluaXQ6ICgpID0+IHtcblxuICAgICAgICAgICAgaWYoTmV3cy5sb2FkTW9yZUJ1dHRvbikge1xuXG4gICAgICAgICAgICBcdE5ld3Muc2hvd09ySGlkZUxvYWRNb3JlQnV0dG9uKClcblxuICAgICAgICAgICAgICAgIE5ld3MuY3JlYXRlTGlzdGVuZXJzKClcblxuICAgICAgICAgICAgfVxuXG4gICAgICAgIH0sXG5cbiAgICAgICAgY3JlYXRlTGlzdGVuZXJzOiAoKSA9PiB7XG5cbiAgICAgICAgXHROZXdzLmxvYWRNb3JlQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZSA9PiB7XG5cbiAgICAgICAgXHRcdGNvbnN0IG5leHRQYWdlID0gcGFyc2VJbnQoTmV3cy5sb2FkTW9yZUJ1dHRvbi5kYXRhc2V0Lm5leHRQYWdlKVxuXG4gICAgICAgIFx0XHROZXdzLmN1cnJlbnRQYWdlID0gbmV4dFBhZ2VcblxuICAgICAgICBcdFx0TmV3cy5sb2FkTmV3cyh0cnVlKVxuXG4gICAgICAgIFx0XHROZXdzLmxvYWRNb3JlQnV0dG9uLmRhdGFzZXQubmV4dFBhZ2UgPSBuZXh0UGFnZSArIDFcblxuICAgICAgICBcdH0pXG5cbiAgICAgICAgfSxcblxuICAgICAgICBsb2FkTmV3cyA6IGFwcGVuZCA9PiB7XG5cbiAgICAgICAgXHRjb25zdCBhcmdzID0ge1xuXHRcdFx0XHR0ZW1wbGF0ZVBhcnQgOiAncGFydHMvbmV3cy1saXN0aW5nJywgXG5cdFx0XHRcdGRhdGEgOiB7XG5cdFx0XHRcdFx0J3BhZ2UnIFx0XHRcdDogTmV3cy5jdXJyZW50UGFnZSxcblx0XHRcdFx0XHQnYXJ0aXN0VHlwZSdcdDogTmV3cy5jdXJyZW50TmV3c0NhdGVnb3J5XG5cdFx0XHRcdH0sXG5cdFx0XHRcdGFwcGVuZCA6IGFwcGVuZCBcblx0XHRcdH1cblxuXHRcdFx0cmV0dXJuIFBsb3QubG9hZFRlbXBsYXRlUGFydChhcmdzKS50aGVuKGh0bWwgPT4ge1xuXG5cdFx0XHRcdE5ld3Muc2hvd09ySGlkZUxvYWRNb3JlQnV0dG9uKClcblxuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlXG5cblx0XHRcdH0pXG5cbiAgICAgICAgfSxcblxuICAgICAgICBzaG93T3JIaWRlTG9hZE1vcmVCdXR0b24gOiAoKSA9PiB7XG5cbiAgICAgICAgXHQvL0NoZWNrIGlmIG1heCBwYWdlcyBpcyAxLiBJZiBpdCBpcywgdGhlcmUncyBvbmx5IDEgcGFnZSBvZiBOZXdzXG4gICAgICAgIFx0Ly9zbyB3ZSBjYW4gaGlkZSBsb2FkIG1vcmUgYnV0dG9uXG4gICAgICAgIFx0TmV3cy5tYXhQYWdlcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5KUy0tbWF4UGFnZXMnKS5kYXRhc2V0Lm1heFBhZ2VzXG5cbiAgICAgICAgICAgIGNvbnNvbGUubG9nKE5ld3MubWF4UGFnZXMpXG5cbiAgICAgICAgXHRpZihOZXdzLm1heFBhZ2VzID4gTmV3cy5jdXJyZW50UGFnZSlcbiAgICAgICAgXHRcdE5ld3MubG9hZE1vcmVCdXR0b24uY2xhc3NMaXN0LnJlbW92ZSgnaGlkZGVuJylcbiAgICAgICAgXHRlbHNlIFxuICAgICAgICBcdFx0TmV3cy5sb2FkTW9yZUJ1dHRvbi5jbGFzc0xpc3QuYWRkKCdoaWRkZW4nKVxuXG4gICAgICAgIH1cblxuICAgIH1cblxuICAgIG1vZHVsZS5leHBvcnRzID0gTmV3c1xuXG59KCkpIiwiKGZ1bmN0aW9uICgpIHtcblxuICAgIHZhciBQcmljaW5nXG5cbiAgICBQcmljaW5nID0ge1xuICAgICAgICBkb206IHtcbiAgICAgICAgICAgIGNvbnRhaW5lciAgICAgICAgOiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuSlMtLVRvZ2dsZVByaWNlJyksXG4gICAgICAgICAgICBhbm51YWxCdXR0b24gICAgIDogZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLkpTLS1wbGFuVG9nZ2xlLS1hbm51YWwnKSxcbiAgICAgICAgICAgIG1vbnRobHlCdXR0b24gICAgOiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuSlMtLXBsYW5Ub2dnbGUtLW1vbnRobHknKSxcbiAgICAgICAgICAgIGN1cnJlbmN5U3ltYm9scyAgOiBBcnJheS5mcm9tKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5KUy0tY3VycmVuY3knKSksXG4gICAgICAgICAgICBwcmljZUFubnVhbCAgICAgIDogZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLkpTLS1wcmljZS0tYW5udWFsJyksXG4gICAgICAgICAgICBwcmljZU1vbnRobHkgICAgIDogZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLkpTLS1wcmljZS0tbW9udGhseScpLFxuICAgICAgICAgICAgYW5udWFsVG90YWxQcmljZSA6IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5KUy0tYW5udWFsVG90YWwnKVxuICAgICAgICB9LFxuXG4gICAgICAgIGluaXQ6ICgpID0+IHtcblxuICAgICAgICAgICAgLy8gVXBkYXRlIHByaWNlIGlmIHVzZXIgaXMgYmFzZWQgaW4gdGhlIFVTXG4gICAgICAgICAgICBQcmljaW5nLmNoZWNrVXNlcnNDb3VudHJ5KClcblxuICAgICAgICAgICAgLy8gVXBkYXRlIGRhdGEgc2V0IHdpdGggXG4gICAgICAgICAgICBQcmljaW5nLmRvbS5hbm51YWxCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBQcmljaW5nLnNob3dBbm51YWwpXG5cbiAgICAgICAgICAgIFByaWNpbmcuZG9tLm1vbnRobHlCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBQcmljaW5nLnNob3dNb250aGx5KVxuICAgICAgICAgICAgXG4gICAgICAgIH0sXG5cbiAgICAgICAgc2hvd0FubnVhbDogKCkgPT4ge1xuICAgICAgICAgICAgXG4gICAgICAgICAgICBpZihQcmljaW5nLmRvbS5jb250YWluZXIuZGF0YXNldC5wbGFuID0gXCJhbm51YWxcIikgXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuXG4gICAgICAgICAgICBQcmljaW5nLmRvbS5jb250YWluZXIuZGF0YXNldC5wbGFuID0gXCJhbm5hdWxcIlxuICAgICAgICB9LFxuXG4gICAgICAgIHNob3dNb250aGx5OiAoKSA9PiB7XG4gICAgICAgICAgICBpZihQcmljaW5nLmRvbS5jb250YWluZXIuZGF0YXNldC5wbGFuID0gXCJtb250aGx5XCIpIFxuICAgICAgICAgICAgICAgIHJldHVybjtcblxuICAgICAgICAgICAgUHJpY2luZy5kb20uY29udGFpbmVyLmRhdGFzZXQucGxhbiA9IFwibW9udGhseVwiXG4gICAgICAgIH0sXG5cbiAgICAgICAgY2hlY2tVc2Vyc0NvdW50cnk6ICgpID0+IHtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgZmV0Y2goJ2h0dHBzOi8vYXBpLmlwcmVnaXN0cnkuY28vP2tleT1icDFsODhsY3A2NzhxOTZ6JylcbiAgICAgICAgICAgICAgICAudGhlbihyZXMgPT4gcmVzLmpzb24oKSlcbiAgICAgICAgICAgICAgICAudGhlbihwYXlsb2FkID0+IHtcbiAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgIGlmKHBheWxvYWQubG9jYXRpb24uY291bnRyeS5jb2RlID09ICdVUycpIHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gU3dpdGNoIHRvIGRvbGxhclxuICAgICAgICAgICAgICAgICAgICAgICAgUHJpY2luZy5kb20uY3VycmVuY3lTeW1ib2xzLm1hcChzeW1ib2wgPT4gc3ltYm9sLnRleHRDb250ZW50ID0gJyQnKVxuXG4gICAgICAgICAgICAgICAgICAgICAgICBQcmljaW5nLmRvbS5wcmljZU1vbnRobHkudGV4dENvbnRlbnQgPSAnNDAwJ1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBQcmljaW5nLmRvbS5wcmljZUFubnVhbC50ZXh0Q29udGVudCA9ICczMzMnXG5cbiAgICAgICAgICAgICAgICAgICAgICAgIFByaWNpbmcuZG9tLmFubnVhbFRvdGFsUHJpY2UudGV4dENvbnRlbnQgPSAnJDQwMDAnXG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgLmNhdGNoKGVyciA9PiBjb25zb2xlLmxvZyhlcnIpKVxuXG4gICAgICAgIH1cblxuXG4gICAgfVxuXG4gICAgbW9kdWxlLmV4cG9ydHMgPSBQcmljaW5nXG5cbn0oKSlcbiIsIihmdW5jdGlvbiAoKSB7XG5cbiAgICB2YXIgU2NoZWR1bGVcblxuICAgIFNjaGVkdWxlID0ge1xuICAgICAgZGF5QnV0dG9ucyAgICAgICA6IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5KUy0tc2NoZWR1bGVEYXlQaWNrZXJCdXR0b24nKSxcbiAgICAgIGNhbGVuZGFycyAgICAgICAgOiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuc2NoZWR1bGVDYWxlbmRhcldyYXAnKSxcblxuICAgICAgICBpbml0OiAoKSA9PiB7XG5cbiAgICAgICAgICBTY2hlZHVsZS5jcmVhdGVMaXN0ZW5lcnMoKVxuICAgICAgICAgIFNjaGVkdWxlLmNoZWNrVG9TZWVJZk5hdkFycm93c05lZWRlZCgpXG5cbiAgICAgICAgfSxcblxuICAgICAgICBjcmVhdGVMaXN0ZW5lcnM6ICgpID0+IHtcblxuICAgICAgICAgIGZvcih2YXIgZGF5QnV0dG9uIG9mIFNjaGVkdWxlLmRheUJ1dHRvbnMpIHtcblxuICAgICAgICAgICAgZGF5QnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJyxmdW5jdGlvbigpIHtcblxuICAgICAgICAgICAgICBTY2hlZHVsZS5sb2FkTmV3RGF0ZSh0aGlzKSBcbiAgICAgICAgICAgICAgXG4gICAgICAgICAgICB9KVxuXG4gICAgICAgICAgfVxuXG4gICAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsKCkgPT4ge1xuXG4gICAgICAgICAgICBTY2hlZHVsZS5jaGVja1RvU2VlSWZOYXZBcnJvd3NOZWVkZWQoKVxuXG4gICAgICAgICAgfSlcblxuICAgICAgICAgIGZvcih2YXIgY2FsZW5kYXIgb2YgU2NoZWR1bGUuY2FsZW5kYXJzKSB7XG5cbiAgICAgICAgICAgIGNvbnN0IHJpZ2h0QnV0dG9uICAgICAgPSBjYWxlbmRhci5xdWVyeVNlbGVjdG9yKCcuSlMtLXNjaGVkdWxlUmlnaHQnKSxcbiAgICAgICAgICAgIGxlZnRCdXR0b24gICAgICAgICAgICAgPSBjYWxlbmRhci5xdWVyeVNlbGVjdG9yKCcuSlMtLXNjaGVkdWxlTGVmdCcpLFxuICAgICAgICAgICAgdHJhY2tzICAgICAgICAgICAgICAgICA9IGNhbGVuZGFyLnF1ZXJ5U2VsZWN0b3IoJy5zY2hlZHVsZUNhbGVuZGFyVHJhY2tzJyksXG4gICAgICAgICAgICB0cmFja3NXICAgICAgICAgICAgICAgID0gdHJhY2tzLm9mZnNldFdpZHRoXG5cbiAgICAgICAgICAgIHJpZ2h0QnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgICAgICAgICB0cmFja3Muc2Nyb2xsQnkoe1xuICAgICAgICAgICAgICAgIGxlZnQ6IHRyYWNrc1cgLyAyLFxuICAgICAgICAgICAgICAgIGJlaGF2aW9yOiAnc21vb3RoJ1xuICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgfSlcblxuICAgICAgICAgICAgbGVmdEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgICAgICAgICAgdHJhY2tzLnNjcm9sbEJ5KHtcbiAgICAgICAgICAgICAgICBsZWZ0OiAtdHJhY2tzVyAvIDIsXG4gICAgICAgICAgICAgICAgYmVoYXZpb3I6ICdzbW9vdGgnXG4gICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICB9XG5cbiAgICAgICAgfSxcblxuICAgICAgICBsb2FkTmV3RGF0ZSA6IGVsZW0gPT4ge1xuXG4gICAgICAgICAgZm9yKHZhciBkQiBvZiBTY2hlZHVsZS5kYXlCdXR0b25zKSB7XG4gICAgICAgICAgICBkQi5jbGFzc0xpc3QucmVtb3ZlKCdzZWxlY3RlZCcpXG4gICAgICAgICAgfVxuXG4gICAgICAgICAgZWxlbS5jbGFzc0xpc3QuYWRkKCdzZWxlY3RlZCcpXG5cbiAgICAgICAgICBsZXQgZGF5ID0gZWxlbS5kYXRhc2V0LnNjaGVkdWxlRGF5IFxuXG4gICAgICAgICAgZm9yKHZhciBjYWxlbmRhciBvZiBTY2hlZHVsZS5jYWxlbmRhcnMpIHtcblxuICAgICAgICAgICAgaWYoY2FsZW5kYXIuZGF0YXNldC5zY2hlZHVsZURheSA9PSBkYXkpXG4gICAgICAgICAgICAgIGNhbGVuZGFyLmNsYXNzTGlzdC5yZW1vdmUoJ2hpZGRlbicpXG4gICAgICAgICAgICBlbHNlIFxuICAgICAgICAgICAgICBjYWxlbmRhci5jbGFzc0xpc3QuYWRkKCdoaWRkZW4nKVxuICAgICAgICAgIH1cblxuICAgICAgICAgIFNjaGVkdWxlLmNoZWNrVG9TZWVJZk5hdkFycm93c05lZWRlZCgpXG5cbiAgICAgICAgfSxcblxuICAgICAgICBjaGVja1RvU2VlSWZOYXZBcnJvd3NOZWVkZWQgOiAoKSA9PiB7IFxuXG4gICAgICAgICAgZm9yKHZhciBjYWxlbmRhciBvZiBTY2hlZHVsZS5jYWxlbmRhcnMpIHtcblxuICAgICAgICAgICAgaWYoIWNhbGVuZGFyLmNsYXNzTGlzdC5jb250YWlucygnaGlkZGVuJykpIHtcblxuICAgICAgICAgICAgICAgY29uc3QgdHJhY2tzID0gY2FsZW5kYXIucXVlcnlTZWxlY3RvcignLnNjaGVkdWxlQ2FsZW5kYXJUcmFja3MnKVxuXG4gICAgICAgICAgICAgICBpZih0cmFja3Muc2Nyb2xsV2lkdGggPiBjYWxlbmRhci5zY3JvbGxXaWR0aCkge1xuICAgICAgICAgICAgICAgICAgY2FsZW5kYXIucXVlcnlTZWxlY3RvcignLkpTLS1zY2hlZHVsZUxlZnQnKS5jbGFzc0xpc3QucmVtb3ZlKCdoaWRkZW4nKVxuICAgICAgICAgICAgICAgICAgY2FsZW5kYXIucXVlcnlTZWxlY3RvcignLkpTLS1zY2hlZHVsZVJpZ2h0JykuY2xhc3NMaXN0LnJlbW92ZSgnaGlkZGVuJylcbiAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICBjYWxlbmRhci5xdWVyeVNlbGVjdG9yKCcuSlMtLXNjaGVkdWxlTGVmdCcpLmNsYXNzTGlzdC5hZGQoJ2hpZGRlbicpXG4gICAgICAgICAgICAgICAgICBjYWxlbmRhci5xdWVyeVNlbGVjdG9yKCcuSlMtLXNjaGVkdWxlUmlnaHQnKS5jbGFzc0xpc3QuYWRkKCdoaWRkZW4nKVxuICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICB9XG5cbiAgICAgICAgfVxuXG4gICAgfVxuXG4gICAgbW9kdWxlLmV4cG9ydHMgPSBTY2hlZHVsZVxuXG59KCkpXG5cbiJdfQ==
