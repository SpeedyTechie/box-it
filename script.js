/*
box-it
v0.1.0
*/

;
(function($) {
    'use strict';
 
    $.boxit = function(options) {
        var boxitOptions = $.extend({
            action: 'init'
        }, options);
        
        if (boxitOptions.action === 'init') {
            boxitInit(boxitOptions);
        }
    };
    
    function boxitInit(options) {
        var boxitWrap = $('<div />');
        boxitWrap.addClass('boxit-wrap');
        
        var boxitBox = $('<div />');
        boxitBox.addClass('boxit-box');
        
        boxitWrap.appendTo('body');
        boxitBox.appendTo(boxitWrap);
        
        boxitWrap.css('display', 'none');
    }
    
}(jQuery));