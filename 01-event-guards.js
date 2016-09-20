$(document).ready( function() {

/**
 * This example has us preforming some arbitrary action when very specific
 * event conditions are met. In this case we'd like to toggle an active class
 * on the document's body when the `s` key is pressed. We'll use this prompt
 * to investigate some ways of abstracting the idea of turning a general event source,
 * like a stream of javascript 'keyup' events, into a stream of much more specific
 * 'someone just pressed the s key' events. We'll abstract this pattern into a
 * general approach to 'someone just did something specific with a certain general event'
 * "event guards", using higher order functions in javascript.
 *
 * @author nicschumann
 */

/** ----------- The desired behavior ---------------------------------------- */
/**
 *
 * This is the action that we want to pass around and do,
 * Depending on whether some conditions are met. In this case,
 * it just toggles the active class on the document's body.
 */
function toggleActiveClass() {

    $('body').toggleClass('active');

}


/** - Now, suppose I want to only toggle if I'm clicking a certain key – say 's' - */

/**
 * This is a generalized conditional test; if the predicate (which is a boolean valued function)
 * is true, the action is performed.
 *
 * @param predicate (Event --> Bool) a predicate, or boolean valued test function defined on some javascript event type.
 * @param continuation (Event --> void) an event handler, just in case the predicate evaluates to true on this event.
 * @return (Event --> void) a new event handler that checks the condition defined by predicate and invokes continuation just in case predicate is true.
 *
 * @exercise generalize this function to a function "ifThenElse" that also takes a continuation to fire just in case predicate is false.
 */
function ifThen( predicate, continuation ) {
    return function( event ) {
            if ( predicate( event ) ) {
                continuation( event );
            }
    };
}

/** ––––––––––--- Here's an application of ifThen --------------------------- */

/**
 * These are the predicate tests that we want to set up ifThen handlers based on.
 * These predicates just check if an event keycode is equal to a given key.
 */
var predicates = [

    function( event ) { return event.keyCode == 83; },

    function( event ) { return event.keyCode == 13; },

    function( event ) { return event.keyCode == 38; },

];

/**
 * These are now the handlers that we want to install on the keyup
 * and keydown event. We'll map across the list or predicates and transfrom them
 * into a list of event handlers that fire 'toggleActiveClass' just in case the given
 * predicate is true.
 *
 * @exercise generalize this map to handle predicates paired with arbitrary continuations.
 */
var handlers = predicates.map( function( predicate ) {

    return ifThen( predicate, toggleActiveClass );

});

/**
 * Finally we install each handler we generated on the appropriate DOM event streams.
 */
handlers.forEach( function( handler ) {

    $(document).on('keydown', handler );
    $(document).on('keyup', handler );

});

/** ––––––––––--------------------------------------------------------------- */

});
