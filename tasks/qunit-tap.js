/*
 * grunt-qunit-tap
 * https://github.com/avaly/grunt-qunit-tap
 *
 * Copyright (c) 2012-2014 Valentin Agachi
 * Licensed under the MIT license.
 */

module.exports = function(grunt) {

	grunt.registerTask('qunit-tap', 'Run QUnit tasks with TAP reporting', function(){
		var target = null,
			data = {
				output: ''
			};

		if (this.args.length) {
			target = this.args[0];
			data = grunt.config.get('qunit-tap.' + target);
		}

		recordTAP(data);

		grunt.task.run('qunit' + (target ? ':' + target : ''));
	});

	function recordTAP(data) {
		var tap, currentTest, n;

		grunt.event.on('qunit.spawn', function(url){
			currentTest = url;
		});
		grunt.event.on('qunit.begin', function(){
			n = 0;
			pass = 0;
			fail = 0;
			tap = [];
		});
		grunt.event.on('qunit.moduleStart', function(name){
			tap.push('# module: ' + name);
		});
		grunt.event.on('qunit.testStart', function(name){
			tap.push('# test: ' + name);
		});
		grunt.event.on('qunit.log', function(result, actual, expected, message, source){
			n++;
			tap.push((result ? 'ok' : 'not ok') + ' ' + n + ' - ' + (message ? message : ''));
		});
		grunt.event.on('qunit.done', function(failed, passed, total, runtime){
			tap.push('1..' + total);
			tap.push('# pass ' + passed);
			tap.push('# fail ' + failed);

			var tapFile = data.output + currentTest.replace(/\//g, '-') +'.tap';
			grunt.file.write(tapFile, tap.join('\n'));
		});
	}

};
