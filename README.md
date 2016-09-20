# Design Patterns

This repository is a collection of javascript design patterns. This is a **table-of-contents** style repository; none of this code is meant to execute in place. It's for reading. If you'd like to add a pattern or idea, clone the repository, make a new javascript file in there, and name it *(x+1)-<sensible-name>.js*, where *x* is the highest number prefix in this repository. Then submit a pull request! Don't forget to add a line describing your pattern to this file!

## Table of Contents

1. **Event Guards**. Suppose you'd like to preform an action on `keyup`, but only if the key that was released is the `s` key. Wouldn't it be nice to decouple the "deciding whether the s key was pressed" logic from the action that you'd actually like to preform when `s` is released? This example shows how to guard a specific event with a conditional in a reusable way – using higher order functions.

2. **Specialized Events**. Suppose you'd like to perform an action whenever the window is resized from above a mobile breakpoint to below one, and vice versa. Wouldn't it be nice to decouple the decision procedure that determines whether the state has changed from desktop size to mobile size from the actual application action you'd like to preform on that event. This example shows how to take a general purpose event stream, like `resize`, and convert it into a series of specialized events that actually make sense for your application, like `now-its-mobile-size` and `now-its-desktop-size`. Why listen to `resize`, when the actual event that you care about is whether the window state has changed across a breakpoint?
