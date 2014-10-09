# TF Mac UI

Create a native user interface for Mac using Node.js.

**Work In Progress**

*Contributions Welcome!*

Currently you can access the entire Cocoa Framework (and more) using NodObjC, but it doesn't make things easy or feel like Node.js. The aim of this project is to make Mac UI creation feel more natural and be more intuitive in Node.js.

## Installation

Get this module from npm using:

	npm install tfui

## Examples

The scripts located in `examples` may be run on the command line.

## Packaging Your App

Placing your code inside `AppTemplate.app/MacOS/` will make it a double clickable app. Though you can modify `AppTemplate.app/Info.plist`, by default `index.js` will be run. This javascript file should have `#!/usr/local/bin/node` as its first line so that Mac OS knows to use the Node.js interpreter.

## Troubleshooting

Note that `NodObjC` tends to fail installation from npm if there are spaces in any portion of your folder path.
