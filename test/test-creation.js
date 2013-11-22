/*global describe, beforeEach, it*/
'use strict';

var path = require('path');
var helpers = require('yeoman-generator').test;


describe('express-static generator', function () {
  beforeEach(function (done) {
    helpers.testDirectory(path.join(__dirname, 'temp'), function (err) {
      if (err) {
        return done(err);
      }

      this.app = helpers.createGenerator('express-static:app', [
        '../../app'
      ]);
      done();
    }.bind(this));
  });

  it('creates expected core files', function (done) {

    var expected = [
      '.jshintrc',
      '.editorconfig',
      '.gitignore',
      'README.md',
      'karma-e2e.conf.js',
      'package.json',
      'bower.json',
      'app.js',
      'routes/index.js',
      'e2e/e2eSpec.js'
    ];

    helpers.mockPrompt(this.app, {});

    this.app.options['skip-install'] = true;
    this.app.run({}, function () {
      helpers.assertFiles(expected);
      done();
    });

  });

  it('creates expected files when creating for jade', function (done) {

    var expected = [
      'views/layout.jade',
      'views/index.jade'
    ];

    helpers.mockPrompt(this.app, {
      'viewEngine': 'jade'
    });
    this.app.options['skip-install'] = true;
    this.app.run({}, function () {
      helpers.assertFiles(expected);
      done();
    });

  });

  it('creates expected files when creating for hbs', function (done) {

    var expected = [
      'views/index.html'
    ];

    helpers.mockPrompt(this.app, {
      'viewEngine': 'hbs'
    });
    this.app.options['skip-install'] = true;
    this.app.run({}, function () {
      helpers.assertFiles(expected);
      done();
    });

  });

  it('creates expected files when creating for stylus', function (done) {

    var expected = [
      'public/stylesheets/style.styl'
    ];

    helpers.mockPrompt(this.app, {
      'cssEngine': 'stylus'
    });
    this.app.options['skip-install'] = true;
    this.app.run({}, function () {
      helpers.assertFiles(expected);
      done();
    });

  });

  it('creates expected files when creating for sass', function (done) {

    var expected = [
      'public/stylesheets/style.sass'
    ];

    helpers.mockPrompt(this.app, {
      'cssEngine': 'sass'
    });
    this.app.options['skip-install'] = true;
    this.app.run({}, function () {
      helpers.assertFiles(expected);
      done();
    });

  });

  it('creates expected files when creating for less', function (done) {

    var expected = [
      'public/stylesheets/style.less'
    ];

    helpers.mockPrompt(this.app, {
      'cssEngine': 'less'
    });
    this.app.options['skip-install'] = true;
    this.app.run({}, function () {
      helpers.assertFiles(expected);
      done();
    });

  });

  it('creates expected files when creating for css', function (done) {

    var expected = [
      'public/stylesheets/style.css'
    ];

    helpers.mockPrompt(this.app, {
      'cssEngine': 'css'
    });
    this.app.options['skip-install'] = true;
    this.app.run({}, function () {
      helpers.assertFiles(expected);
      done();
    });

  });

});
