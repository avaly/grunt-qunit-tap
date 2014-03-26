# grunt-qunit-tap

> Grunt plugin for running QUnit tests with TAP reporting.

Useful for continuous integration tools (e.g. Jenkins with TAP plugin).

## Getting Started

Version `2.*.*` of this plugin requires Grunt `>= 0.4.*`

Version `1.*.*` of this plugin requires Grunt `0.3.*`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-qunit-tap --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-qunit-tap');
```

## The `qunit-tap` task

### Overview

In your project's Gruntfile, add a section named `qunit-tap` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
	'qunit-tap': {
		your_target: {
			// Target-specific file lists and/or options go here.
		},
	},
});
```

### Options

#### options.output
Type: `String`
Default value: `.`

The folder where the TAP result files will be written.

### Usage Examples

#### Default Options

Calling the `qunit-tap` with a target, will call the `qunit` task with the same target name.

Sample configuration:

```javascript
grunt.initConfig({
	qunit: {
		foo: ["tests/**/*.html"]
	},
	'qunit-tap': {
		foo: {
			output: 'logs/'
		}
	}
});
```

Executing `grunt qunit-tap:foo` will run the `qunit:foo` task and write the TAP results in the `logs/` folder.

## Contributing

In lieu of a formal styleguide, take care to maintain the existing coding style.

## Release History

- v2.0.0 - Updated for Grunt v0.4.*
- v1.0.3 - fixed duplicate TAP plan bug
- v1.0.2 - fixed random TAP plan issues
- v1.0.1 - fixed issue when running original qunit task
- v1.0.0 - first public release, compatible with grunt v0.3.*

## License

Copyright (c) 2012-2014 Valentin Agachi

Licensed under the MIT license.
