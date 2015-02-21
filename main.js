#!/usr/bin/env node

var fs       = require('fs');
var Mustache = require('mustache');

// Generate UI
// ==========
if (process.argv[2].toLowerCase() == 'generate' && process.argv[3].toLowerCase() == 'ui') {

	// Make sure ion init hasn't been called
	if (fs.existsSync('./.ionrc')) {
		console.log("This directory has already been initialized as an api");
		return
	}

	generateUI();
	return
}

function generateUI() {
	console.log('=====================');
	console.log('=== Generating UI ===');
	console.log('=====================');

	// Create index.html
	console.log("Creating index.html...");
	var index_content = fs.readFileSync(__dirname + '/templates/ui-ng/index.html', 'utf8');
	index_content = Mustache.render(index_content, {});
	fs.writeFile('./index.html', index_content, function(err) {});

	// Create css
	console.log("Creating css/main.css...");
	fs.mkdirSync('./css');
	var css_content = fs.readFileSync(__dirname + '/templates/ui-ng/main.css', 'utf8');
	css_content = Mustache.render(css_content, {});
	fs.writeFile('./css/main.css', css_content, function(err) {});

	// Create js/app.js
	fs.mkdirSync('./js');
	console.log("Creating js/app.js...");
	var app_content = fs.readFileSync(__dirname + '/templates/ui-ng/app.js', 'utf8');
	app_content = Mustache.render(app_content, {});
	fs.writeFile('./js/app.js', app_content, function(err) {});

	// Create js/controllers.js
	console.log("Creating js/controllers.js...");
	var controllers_content = fs.readFileSync(__dirname + '/templates/ui-ng/controllers.js', 'utf8');
	controllers_content = Mustache.render(controllers_content, {});
	fs.writeFile('./js/controllers.js', controllers_content, function(err) {});

	// Run bower commands to install angular
	var shell = require('shelljs');
	shell.exec('bower install angularjs');
}

// Init
// ==========
var init = function() {
	// Check if name specified
	if (process.argv[3] == undefined) {
		console.log('Please specify a name');
		return
	}

	// Create .ionrc if it doesn't exist
	if (!fs.existsSync('./.ionrc')) {
	    console.log("Creating .ionrc");
	    var ionrc = {};
	    ionrc.models = [];

	    fs.writeFile('./.ionrc', JSON.stringify(ionrc, null, "\t"), function(err) {

		});
	}

	// Create main.js if it doesn't exist
	if (!fs.existsSync('./main.js')) {
		console.log("Creating main.js");
		var mainjs = fs.readFileSync(__dirname + '/templates/main.js');
		fs.writeFile('./main.js', mainjs, function(err) {

		});
	}

	// Create models folder if it doesn't exist
	if (!fs.existsSync('./models')) {
		console.log("Creating models");
		fs.mkdirSync('./models');
	}

	// Create models/init.js
	if (!fs.existsSync('./models/init.js')) {
		var content = fs.readFileSync(__dirname + '/templates/init-models.js', 'utf8');
		var content = Mustache.render(content, {name: process.argv[3], models: []});
		fs.writeFile('./models/init.js', content, function(err) {});
	}

	// Create controllers folder if it doesn't exists
	if (!fs.existsSync('./controllers')) {
		console.log("Creating controllers");
		fs.mkdirSync('./controllers');
	}

	// Create controllers/init.js
	if (!fs.existsSync('./controllers/init.js')) {
		var content = fs.readFileSync(__dirname + '/templates/init-controllers.js', 'utf8');
		fs.writeFile('./controllers/init.js', content, function(err) {});
	}

	// Create package.json
	if (!fs.existsSync('./package.json')) {
		console.log("Creating package.json");
		var package_json = {};
		package_json.name = process.argv[3];
		package_json.version = "0.0.0";
		package_json.main = "main.js";

		package_json.dependencies = {};
		package_json.dependencies.express = "^4.11.0";
		package_json.dependencies['body-parser'] = "^1.10.1";
		package_json.dependencies['cors'] = "^2.5.2";
		package_json.dependencies['mongoose'] = "^3.8.21";

		fs.writeFile('./package.json', JSON.stringify(package_json, null, "\t"), function(err) {});
	}
}

// If init specified, call init()
if (process.argv[2].toLowerCase() == 'init') {
	init();
	return
}


// Check that directory has be initialized
if (!fs.existsSync('./.ionrc')) {
	console.log("Please run 'ion init' first");
	return
}
// Create ionrc from .ionrc
var ionrc = JSON.parse(fs.readFileSync('./.ionrc', 'utf8'));

// Generate
// ==========

// Define updateFiles(ionrc, model)
var updateFiles = function (ionrc, model) {
	// Create model file
	var model_content = fs.readFileSync(__dirname + '/templates/model.js', 'utf8');
	model_content = Mustache.render(model_content, {name: model, models: ionrc.models});
	fs.writeFile('./models/' + name + '.js', model_content, function(err) {});

	// Update models/init.js
	var init_content = fs.readFileSync(__dirname + '/templates/init-models.js', 'utf8');
	var content = Mustache.render(init_content, {name: model, models: ionrc.models});
	fs.writeFile('./models/init.js', content, function(err) {});

	// Create controller file
	var controller_content = fs.readFileSync(__dirname + '/templates/controller.js', 'utf8');
	var controller_content = Mustache.render(controller_content, {name: model, models: ionrc.models});
	fs.writeFile('./controllers/' + name + '.js', controller_content, function(err) {});

	// Update controllers/init.js
	var init_content = fs.readFileSync(__dirname + '/templates/init-controllers.js', 'utf8');
	var content = Mustache.render(init_content, {models: ionrc.models});
	fs.writeFile('./controllers/init.js', content, function(err) {});
}

// If generate, call generate()
if (process.argv[2].toLowerCase() == 'generate') {

	// Check if name is specified
	if (process.argv[3] == undefined) {
		console.log("No name specified");
		return
	}
	var name = process.argv[3];

	// Check that model doesn't exist
	if (ionrc.models.indexOf(name) != -1) {
		console.log("Model already exists");
		return
	}

	console.log("Creating model " + name);

	// Add model to .ionrc
	ionrc.models.push(name);
	fs.writeFile('./.ionrc', JSON.stringify(ionrc, null, "\t"), function(err) {});

	updateFiles(ionrc, name);
}	

// Remove
// ==========