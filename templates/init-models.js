var mongoose = require('mongoose');
GLOBAL.connection = mongoose.connect('mongodb://localhost/{{name}}');

module.exports = {
{{#models}}
	{{.}}: require('./{{.}}.js'),
{{/models}}
}