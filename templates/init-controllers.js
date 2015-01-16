module.exports = {
{{#models}}
	{{.}}: require('./{{.}}.js'),
{{/models}}
}