# Todojitsu

## Overview 

Todojitsu a todo web app based on the MEAN stack, Mongodb, Express, Angular and Node. It was created as a learning excercise, and should be considered a toy app. The unique feature of todojitsu is that instead of requiring a user to sign in, a new page can be created simply by going to an address:

todojitsu.com/*yourname*

You can assign a password to each unique page you create. Each page allows multiple sub-lits, drag and drop sorting, and undo/redo capability.

A live demo of todojitsu:
  [todojitsu.com](http://todojitsu.com)

## Installation

1. clone the repository to a unix line system
2. Install node, npm, and modngodb
3. Start mongodb with defaults
4. Install gulp and run it in the base directory
  * ```npm install gulp -g```
  * ```gulp```
5. Go to the newly created dist directory and run ```node app.js```
6. The app will be served at localhost:3000
