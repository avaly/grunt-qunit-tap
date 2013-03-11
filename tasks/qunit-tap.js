/*
 * grunt-qunit-tap
 * https://github.com/avaly/grunt-qunit-tap
 *
 * Copyright (c) 2012-2013 Valentin Agachi
 * Licensed under the MIT license.
 */

module.exports = function(grunt) {

	grunt.registerTask('qunit-tap', 'Run QUnit tasks with TAP reporting', function(){
		var path = require('path');

		var target = null,
			data = {
				output: '.'
			};

		if (this.args.length) {
			target = this.args[0];
			data = grunt.config.get('qunit-tap.' + target);
		}

		data.prefix = 'file://' + path.resolve('.') + '/' + (data.prefix || '');

		grunt.utils._.forEach(data, function(value, key){
			process.env['QUNIT_TAP_' + key.toUpperCase()] = value;
		});

		grunt.task.run('qunit' + (target ? ':' + target : ''));
	});

};
