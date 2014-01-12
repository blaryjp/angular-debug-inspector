# Angular Debug Inspector

Standalone debugger for Angular JS.

You can:

* Select a scope, and edit its variables directly, using Ace editor.
* Broadcast a message (with params) in a selected scope (or rootScope).
* See the watch performances.

## Install

Take the file in the `dist/` directory, with the theme that you want, and :

* **Firefox**: Use [Greasemonkey](https://addons.mozilla.org/en/firefox/addon/greasemonkey/) ;
* **Chrome**: Use [Tampermonkey](https://chrome.google.com/webstore/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo) ;
* ... or directly as `script` in the `<head>` of your page (before Angular!).

## Usage

You have one button to select a scope, and 3 others for switching to a mode : scope, broadcast, or perf.

When you change an element in the editor, you can click on "apply", or press CTRL+ENTER, to apply the modifications. It's the same for the broadcast section.

Some options from Ace editor are available : indentation, multi-selection, etc...

## Note
The original idea came from Angular [Batarang](https://github.com/angular/angularjs-batarang/). Thanks to Google Team for the great work!
