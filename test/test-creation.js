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
      '.bowerrc',
      'README.md',
      'karma-e2e.conf.js',
      'package.json',
      'bower.json',
      'app.js',
      'routes/index.js',
      'e2e/e2eSpec.js'
    ];

    helpers.mockPrompt(this.app, {
      'siteName': 'express-static'
    });

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
      'viewEngine': 'jade',
      'siteName': 'express-static'
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
      'viewEngine': 'hbs',
      'siteName': 'express-static'
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
      'cssEngine': 'stylus',
      'siteName': 'express-static'
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
      'cssEngine': 'sass',
      'siteName': 'express-static'
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
      'cssEngine': 'less',
      'siteName': 'express-static'
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
      'cssEngine': 'css',
      'siteName': 'express-static'
    });
    this.app.options['skip-install'] = true;
    this.app.run({}, function () {
      helpers.assertFiles(expected);
      done();
    });

  });

});
