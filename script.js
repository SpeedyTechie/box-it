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
            boxitBox.attr('tabindex', '-1');
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
                boxitClose.click(function() {
                    boxitWrap.boxit('close');
                });
                boxitClose.appendTo(boxitBox);
            }
            
            var boxitFocusEnd = $('<div />');
            boxitFocusEnd.css('opacity', '0');
            boxitFocusEnd.css('position', 'absolute');
            boxitFocusEnd.css('z-index', '-999999');
            boxitFocusEnd.css('width', '0');
            boxitFocusEnd.css('height', '0');
            boxitFocusEnd.css('overflow', 'hidden');
            boxitFocusEnd.attr('tabindex', '0');
            boxitFocusEnd.focus(function() {
                boxitBox.focus();
                return false;
            });
            boxitFocusEnd.appendTo(boxitWrap);
            
            boxitWrap.prependTo('body');
            
            $(document).keydown(function(e) {
                if (e.key === 'Escape' || e.key === 'Esc') {
                    boxitWrap.boxit('close');
                } else if (e.keyCode === 27) {
                    boxitWrap.boxit('close');
                }
            });
            
            $(document).data('boxit', true);
            return boxitWrap;
        }
        
        return false;
    };
    
    $.fn.boxit = function(action, content) {
        var boxitWrap = this;
        
        if (boxitWrap.is('[data-boxit-instance]')) {
            if (action === 'open') {
                if (typeof content !== 'undefined') {
                    if (!boxitWrap.boxit('isOpen')) {
                        var boxitBox = boxitWrap.children('[data-boxit-box]').first();
                        var boxitClose = boxitBox.children('[data-boxit-close]').first();
                        var boxitContent = content;

                        if (boxitBox.length === 1) {
                            boxitContent = boxitContent.first();

                            boxitClose.detach();
                            boxitBox.empty();
                            boxitBox.append(boxitClose);
                            boxitBox.append(boxitContent.clone());
                            
                            var boxitStyle = $('<style>.boxit-wrap *, .boxit-wrap *::before, .boxit-wrap *::after { transition: 0s !important; }</style>');
                            boxitWrap.addClass('boxit-test');
                            boxitStyle.appendTo('head');
                            boxitWrap.addClass('active');
                            boxitBox.css('margin-top', '');
                            var windowHeight = $(window).innerHeight();
                            var windowTop = $(window).scrollTop();
                            var boxitWrapHeight = boxitWrap.height();
                            var boxitWrapExtra = boxitWrap.outerHeight(true) - boxitWrapHeight;
                            var boxitBoxHeight = boxitBox.outerHeight();
                            var margin = boxitWrapHeight - boxitBoxHeight;
                            if (boxitBoxHeight < windowHeight - boxitWrapExtra) {
                                margin = Math.min(margin, ((windowHeight - boxitBoxHeight) / 2) + windowTop - (boxitWrapExtra / 2));
                            } else {
                                margin = Math.min(margin, windowTop);
                            }
                            boxitBox.css('margin-top', margin + 'px');
                            boxitWrap.removeClass('active');
                            boxitStyle.remove();
                            boxitWrap.removeClass('boxit-test');

                            boxitWrap.addClass('boxit-active');

                            boxitWrap.data('lastFocus', $(document.activeElement));
                            boxitBox.focus();
                        }
                    }
                }
            } else if (action === 'close') {
                boxitWrap.removeClass('boxit-active');
                boxitWrap.data('lastFocus').focus();
            } else if (action === 'isOpen') {
                return boxitWrap.hasClass('boxit-active');
            }
            
            return boxitWrap;
        }
        
        return false;
    };
    
}(jQuery));