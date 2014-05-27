# TF Mac UI

Create a native user interface for Mac using Node.js.

**Work In Progress**

*Contributions Welcome!*

Currently you can access the entire Cocoa Framework (and more) using NodObjC, but it doesn't make things easy or feel like Node.js. The aim of this project is to make Mac UI creation feel more natural and be more intuitive in Node.js.

## Installation

Get this module from npm using:

	npm install tfui

## Example

An example of how to use this module is located in `example.js`. Run using:

	node example.js

## Packaging Your App

I will be adding a template soon that is easy to edit and feels 100% native. For now, [Platypus](http://sveinbjorn.org/platypus) might be of use to you. Note that the application bundles it creates do exhibit some odd behaviour that is avoidable.

## Troubleshooting

Note that `NodObjC` tends to fail installation from npm if there are spaces in any portion of your folder path.
