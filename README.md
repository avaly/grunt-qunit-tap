# grunt-qunit-tap

Grunt plugin for running QUnit tests with TAP reporting.

Useful for continuous integration tools (e.g. Jenkins with TAP plugin).

**Note:** This plugin is known to be compatible with Grunt 0.3.x, but not 0.4.x.

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

Calling the `qunit-tap` with a target, will call the `qunit` task with the same target name.

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

Executing `grunt qunit-tap:foo` will run the `qunit:foo` task and put the TAP results in the `logs/` folder.

## Contributing

In lieu of a formal styleguide, take care to maintain the existing coding style.

## Release History

- v1.0.2 - fixed random TAP plan issues
- v1.0.1 - fixed issue when running original qunit task
- v1.0.0 - first public release, compatible with grunt v0.3.*

## License

Copyright (c) 2012-2013 Valentin Agachi

Licensed under the MIT license.
