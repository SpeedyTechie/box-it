/*
box-it
v0.1.0
*/

;
(function($) {
    'use strict';
 
    $.boxit = function(options) {
        var boxitOptions = $.extend({
            action: 'init',
            instance: 'default'
        }, options);
        
        if (boxitOptions.action === 'init') {
            boxitInit(boxitOptions);
        } else if (boxitOptions.action === 'open') {
            boxitOpen(boxitOptions);
        } else if (boxitOptions.action == 'close') {
            boxitClose(boxitOptions);
        }
    };
    
    function boxitInit(options) {
        var boxitWrap = $('<div />');
        boxitWrap.addClass('boxit-wrap');
        boxitWrap.addClass('boxit-instance-' + options.instance);
        boxitWrap.attr('data-boxit-instance', options.instance);
        boxitWrap.click(function(e) {
            if($(e.target).is('.boxit-wrap')) {
                boxitClose();
            }
        });
        
        var boxitBox = $('<div />');
        boxitBox.addClass('boxit-box');
        
        boxitWrap.appendTo('body');
        boxitBox.appendTo(boxitWrap);
    }
    
    function boxitOpen(options) {
        var boxitWrap = $('.boxit-wrap[data-boxit-instance="' + options.instance + '"]');
        var boxitBox = boxitWrap.children('.boxit-box');
        var boxitBoxContents = $('[data-boxit-id="' + options.boxID + '"]');
        
        if (boxitBox.length > 0 && boxitBoxContents.length > 0) {
            boxitBoxContents = boxitBoxContents.first();
            
            boxitBox.empty();
            boxitBoxContents.clone().appendTo(boxitBox);
            
            boxitWrap.addClass('active');
        }
    }
    
    function boxitClose(options) {
        $('.boxit-wrap').removeClass('active');
    }
    
}(jQuery));