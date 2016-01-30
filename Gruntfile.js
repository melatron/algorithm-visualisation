module.exports = function (grunt) {

	var filesForHandlebars = {};
	filesForHandlebars['public/javascripts/templates.js'] = 'views/*.hbs';

	grunt.initConfig({
		handlebars: {
			compile: {
				files: filesForHandlebars,
				options: {
					namespace: 'templates',
					processName: function (filename) {

						var lastName = filename.split('/');
						lastName = lastName[lastName.length - 1];

						// Handles other file names.
						if (lastName.indexOf('-') >= 0) {
							var splitName = lastName.split('-');

							lastName = '';
							for (var i = 0; i < splitName.length; i++) {
								lastName += i == 0 ? splitName[i] : splitName[i].charAt(0).toUpperCase() + splitName[i].slice(1);
							}
						}

						var regex = new RegExp(/\w{1,}?(?=\.html|View\.html|\.hbs|View\.hbs)/);
						return lastName.match(regex)[0];
					}
				}
			}
		},
		jshint: {
			all: {
				src: [
					'public/javascripts/*.js',
					'!public/javascripts/templates.js'
				]
			}
		},
		watch: {
			configFiles: {
				files: [ 'Gruntfile.js'],
				options: {
					reload: true
				}
			},
			scripts: {
				files: [
					'public/javascripts/*.js',
					'!public/javascripts/templates.js'
				],
				tasks: ['newer:jshint:all'],
				options: {
					debounceDelay: 250
				}
			},
			templates: {
				files: 'views/*.hbs',
				tasks: ['handlebars'],
				options: {
					debounceDelay: 250
				}
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-handlebars');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-newer');

	grunt.registerTask('default', ['handlebars', 'newer:jshint:all', 'watch']);
};
