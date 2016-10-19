/*
boxit
v0.1.0
*/

;
(function($) {
    'use strict';
 
    $.boxit = function(options) {
        var boxitOptions = $.extend({
            instance: 'default',
            wrapClass: '',
            boxClass: '',
            closeButton: true,
            closeButtonText: '&times;',
            closeButtonClass: ''
        }, options);
        
        if ($('[data-boxit-instance="' + boxitOptions.instance + '"]').length < 1) {
            var boxitWrap = $('<div />');
            boxitWrap.addClass('boxit-wrap');
            boxitWrap.addClass('boxit-instance-' + boxitOptions.instance);
            boxitWrap.addClass(boxitOptions.wrapClass);
            boxitWrap.attr('data-boxit-instance', boxitOptions.instance);
            boxitWrap.click(function(e) {
                if($(e.target).is('.boxit-wrap')) {
                    boxitWrap.boxit('close');
                }
            });
            
            var boxitBox = $('<div />');
            boxitBox.addClass('boxit-box');
            boxitBox.addClass(boxitOptions.boxClass);
            boxitBox.attr('data-boxit-box', boxitOptions.instance);
            
            var closeButton = undefined;
            if (boxitOptions.closeButton) {
                closeButton = $('<button />');
                closeButton.addClass('boxit-close');
                closeButton.addClass(boxitOptions.closeButtonClass);
                closeButton.attr('type', 'button');
                closeButton.text(boxitOptions.closeButtonText);
            }
            
            boxitWrap.appendTo('body');
            boxitBox.appendTo(boxitWrap);
            closeButton.appendTo(boxitBox);
            
            return boxitWrap;
        } else {
            return false;
        }
    };
    
    $.fn.boxit = function(action, content) {
        var boxitWrap = this;
        if (boxitWrap.is('[data-boxit-instance]')) {
            if (action === 'open') {
                if (typeof content !== 'undefined') {
                    var boxitBox = boxitWrap.children('[data-boxit-box]').first();
                    var boxitContent = content;
                    
                    if (boxitBox.length === 1) {
                        boxitContent = boxitContent.first();
            
                        boxitBox.empty();
                        boxitBox.append(boxitContent.clone());

                        boxitWrap.addClass('active');
                    }
                }
            } else if (action === 'close') {
                boxitWrap.removeClass('active');
            }
        }
    };
    
}(jQuery));