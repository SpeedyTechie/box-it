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
            closeButtonText: '×',
            closeButtonClass: ''
        }, options);
        
        if ($('[data-boxit-instance="' + boxitOptions.instance + '"]').length < 1) {
            var boxitWrap = $('<div />');
            boxitWrap.addClass('boxit-wrap');
            boxitWrap.addClass('boxit-instance-' + boxitOptions.instance);
            boxitWrap.addClass(boxitOptions.wrapClass);
            boxitWrap.attr('data-boxit-instance', boxitOptions.instance);
            boxitWrap.click(function(e) {
                if($(e.target).is($(this))) {
                    boxitWrap.boxit('close');
                }
            });
            
            var boxitBox = $('<div />');
            boxitBox.addClass('boxit-box');
            boxitBox.addClass(boxitOptions.boxClass);
            boxitBox.attr('data-boxit-box', boxitOptions.instance);
            boxitBox.appendTo(boxitWrap);
            
            var boxitClose = undefined;
            if (boxitOptions.closeButton) {
                boxitClose = $('<button />');
                boxitClose.addClass('boxit-close');
                boxitClose.addClass(boxitOptions.closeButtonClass);
                boxitClose.attr('type', 'button');
                boxitClose.attr('title', 'Close');
                boxitClose.attr('data-boxit-close', boxitOptions.instance);
                boxitClose.text(boxitOptions.closeButtonText);
                boxitClose.appendTo(boxitBox);
                boxitClose.click(function() {
                    boxitWrap.boxit('close');
                });
            }
            
            boxitWrap.prependTo('body');
            
            $(document).keydown(function(e) {
                if (e.key === 'Escape' || e.key === 'Esc') {
                    boxitWrap.boxit('close');
                } else if (e.keyCode === 27) {
                    boxitWrap.boxit('close');
                }
            });
            
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
                    var boxitClose = boxitBox.children('[data-boxit-close]').first();
                    var boxitContent = content;
                    
                    if (boxitBox.length === 1) {
                        boxitContent = boxitContent.first();
                        
                        boxitClose.detach();
                        boxitBox.empty();
                        boxitBox.append(boxitClose);
                        boxitBox.append(boxitContent.clone());

                        boxitWrap.addClass('active');
                    }
                }
            } else if (action === 'close') {
                boxitWrap.removeClass('active');
            }
        }
        
        return boxitWrap;
    };
    
}(jQuery));