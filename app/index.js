'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');


var ExpressStaticGenerator = module.exports = function ExpressStaticGenerator(args, options, config) {
  yeoman.generators.Base.apply(this, arguments);

  this.on('end', function () {
    this.installDependencies({ skipInstall: options['skip-install'] });
  });

  this.pkg = JSON.parse(this.readFileAsString(path.join(__dirname, '../package.json')));
};

util.inherits(ExpressStaticGenerator, yeoman.generators.Base);

ExpressStaticGenerator.prototype.askFor = function askFor() {
  var cb = this.async();

  // have Yeoman greet the user.
  console.log(this.yeoman);

  var prompts = [
    {
      name: 'siteName',
      message: 'What is the name of the site you are creating?',
      default: 'express-static'
    },
    {
      name: 'viewEngine',
      message: 'Which view engine would you like to use?',
      type: 'list',
      default: 'jade',
      choices: [
        {
          name: 'jade',
          value: 'jade'
        },
        {
          name: 'handlebars',
          value: 'hbs'
        }
      ]
    },
    {
      name: 'cssEngine',
      message: 'Which css engine would you like to use?',
      type: 'list',
      default: 'stylus',
      choices: [
        {
          name: 'stylus',
          value: 'stylus'
        },
        {
          name: 'sass',
          value: 'sass'
        },
        {
          name: 'less',
          value: 'less'
        },
        {
          name: 'css',
          value: 'css'
        }
      ]
    }
  ];

  this.prompt(prompts, function (props) {

    this.siteName = props.siteName;
    this.viewEngine = props.viewEngine;
    this.cssEngine = props.cssEngine;

    cb();
  }.bind(this));
};

ExpressStaticGenerator.prototype.app = function app() {
  this.mkdir('e2e');
  this.mkdir('public');
  this.mkdir('public/images');
  this.mkdir('public/stylesheets');
  this.mkdir('public/javascripts');
  this.mkdir('routes');
  this.mkdir('views');
  this.mkdir('views/partials');

  switch (this.cssEngine){
    case 'sass':
      this.copy('public/stylesheets/_style.sass', 'public/stylesheets/style.sass');
      break;
    case 'less':
      this.copy('public/stylesheets/_style.less', 'public/stylesheets/style.less');
      break;
    case 'stylus':
      this.copy('public/stylesheets/_style.styl', 'public/stylesheets/style.styl');
      break;
    default:
      this.copy('public/stylesheets/_style.css', 'public/stylesheets/style.css');
  }

  switch (this.viewEngine){
    case 'hbs':
      this.copy('views/_index.html', 'views/index.html');
      break;
    default:
      this.copy('views/_layout.jade', 'views/layout.jade');
      this.copy('views/_index.jade', 'views/index.jade');
  }

  this.template('_app.js', 'app.js');
  this.copy('routes/_index.js', 'routes/index.js');

  this.template('_package.json', 'package.json');
  this.copy('_bower.json', 'bower.json');

  this.copy('e2e/_e2eSpec.js', 'e2e/e2eSpec.js');
  this.copy('_karma-e2e.conf.js', 'karma-e2e.conf.js');

  this.copy('_Gruntfile.js', 'Gruntfile.js');

};

ExpressStaticGenerator.prototype.projectfiles = function projectfiles() {
  this.copy('editorconfig', '.editorconfig');
  this.copy('jshintrc', '.jshintrc');
  this.copy('gitignore', '.gitignore');
  this.copy('bowerrc', '.bowerrc');
  this.copy('_README.md', 'README.md');
};
