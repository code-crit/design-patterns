/**
 * Suppose you have some javascript you need to execute whenever the window is a
 * below a certain breakpoint, and some other code you'd like to execute when the
 * window is above that breakpoint. This pattern has us refining the window 'resize'
 * event into two, very specific events, which only fire exactly when the window
 * changes from above to below the set breakpoint (or vice versa). That way, we're
 * we decouple the logic of checking for breakpoint conditions from the actual application
 * behavior we'd like to implement. We keep the definitions of the application behavior and
 * the conditions for the application behavior separate, and give ourselves the capacity
 * to vary them independantly in a fluid way.
 *
 * @author nicschumann
 */

/** ----------- The desired breakpoint ---------------------------------------- */

var mobileBreakPoint = 769;

/**
 * something to do when the window is in "mobile" mode
 */
function mobileAction( event ) {
    $( 'body' ).text('It\'s Mobile.');
}

/**
 * something to do when the window is in "mobile" mode
 */
function desktopAction( event ) {
    $( 'body' ).text('It\'s Desktop.');
}


/**
 * This routine takes two continuations, one to do if the window is mobile, and one
 * to do if the window is desktop. We'd like this routine to alo have the property that
 * it doesn't continuously invoke the continuations if the user is resizing the window but
 * the breakpoint state doesn't change. We don't need to be firing a series of the
 * same mobile callback if the state is already mobile, for example – once is enough.
 *
 * @param mobile ( Event -> () ) an event handler to file just incase the window transitions on resize to mobile.
 * @param desktop ( Event -> () ) an event handler to file just incase the window transitions on resize to desktop.
 * @return (Event -> ()) a handler which fires mobile if the window transitions to mobile, and desktop if it transitions to desktop.
 */
function decideMobileOrDesktop( mobile, desktop ) {

    var isMobile = false;
    var isDesktop = false;

    return function( event ) {

        if ( window.innerWidth < mobileBreakPoint && !isMobile ) {

            isDesktop = false;
            isMobile = true;

            mobile( event );

        } else if ( window.innerWidth >= mobileBreakPoint && !isDesktop ) {

            isDesktop = true;
            isMobile = false;

            desktop( event );

        }

    };

}

/**
 * we want to install custom events, 'mobile-size' and 'desktop-size' on the window,
 * so that we can listen to those, and act, rather than futzing with 'resize' at all.
 * we don't actually care whether the window is being resized. We only care about whether
 * it's transitioning to desktop from mobile, or vice versa. So let's make that explicit.
 */
var mobileAndDesktopEvents = decideMobileOrDesktop(
    function( event ) { $(window).trigger('mobile-size', event); },
    function( event ) { $(window).trigger('desktop-size', event); }
);

$(document).ready( function() {

    /**
     * first, install out 'custom event generating handler' on the original event stream,
     * in this case, resize.
     */
    $(window).on('resize', mobileAndDesktopEvents );

    /**
     * listen to out new event streams, and isntall our appropriate handlers on them.
     */
    $(window).on('desktop-size', desktopAction);
    $(window).on('mobile-size', mobileAction);

    /**
     * trigger a resize when the window loads, so that we can get into a good initial state.
     */
    $(window).trigger('resize');

});

/**
 * @exercise use this design pattern to write a specialized event stream that fires an event when the mouse is in the upper
 * left quadrant of the screen. If you're feeling adventurous generalize this so that you can easily pass ANY rectangular
 * region of the screen to the handler building function, and get back a handler that generates custom events that fire only
 * when the mouse is in that rectangular region of the screen.
 */
