/*
 * jsencrypt
 * https://github.com/Piep/grunt-jsencrypt
 *
 * Copyright (c) 2015 kangming
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    jshint: {
      all: [
        'Gruntfile.js',
        'tasks/*.js',
        '<%= nodeunit.tests %>'
      ],
      options: {
        jshintrc: '.jshintrc'
      }
    },

    // Before generating any new files, remove any previously-created files.
    clean: {
      tests: ['dist']
    },

    // Configuration to be run (and then tested).
    jsencrypter: {
      default_options: {
        options: {
        },
        files: {
          'tmp/default_options.js': ['test/fixtures/test1.js', 'test/fixtures/test2.js']
        }
      },
      custom_options: {
        options: {
          separator: ';',
          banner: '/*custom banner*/\n'
        },
        files: {
          'tmp/custom_options.js': ['test/fixtures/test1.js', 'test/fixtures/test2.js']
        }
      }
    },

    // Unit tests.
    nodeunit: {
      tests: ['test/*_test.js']
    }

  });

  // Actually load this plugin's task(s).
  grunt.loadTasks('tasks');

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-nodeunit');

  // Whenever the "test" task is run, first clean the "tmp" dir, then run this
  // plugin's task(s), then test the result.
  grunt.registerTask('test', ['clean', 'jsencrypter', 'nodeunit']);

  // By default, lint and run all tests.
  grunt.registerTask('default', ['jshint', 'test']);

};
