# grunt-qunit-tap

Grunt plugin for running QUnit tests with TAP reporting

## Getting Started

Install this grunt plugin next to your project's [grunt.js gruntfile][getting_started] with:

`npm install grunt-qunit-tap`

Then add this line to your project's `grunt.js` gruntfile:

```javascript
grunt.loadNpmTasks('grunt-qunit-tap');
```

[grunt]: https://github.com/cowboy/grunt
[getting_started]: https://github.com/cowboy/grunt/blob/master/docs/getting_started.md

## Documentation

This plugin exposes the `qunit-tap` task in grunt, which is a multi-task. It depends on the `qunit` task included with grunt.

Calling the `grunt-tap` with a target, will call the `qunit` task with the same target name.

Sample configuration:

```javascript
	"qunit": {
		"foo": ["tests/**/*.html"]
	},
	"qunit-tap": {
		"foo": {
			"output": "logs/"
		}
	}
```

Executing `grunt qunit-tap:foo` will run the `qunit` task and put the TAP results in the `logs/` folder.

## Contributing

In lieu of a formal styleguide, take care to maintain the existing coding style.

## Release History

- v1.0.0 - first public release, compatible with grunt v0.3.*

## License

Copyright (c) 2012 Valentin Agachi
Licensed under the MIT license.
