module.exports = function (grunt) {
    grunt.initConfig({

        // define source files and their destinations
        uglify: {
            files: { 
                cwd: 'src',
                src: '**/*.js',  // source files mask
                dest: 'dest',    // destination folder
                expand: true,    // allow dynamic building
                flatten: false,
                ext: '.js'   // replace .js to .min.js
            }
        },
        sass: {
            options: {
                sourceMap: false
            },
            dest: {
                files: {
                    'dest/css/poel.css': 'src/css/poel.scss',
                    'src/css/poel.css': 'src/css/poel.scss'
                }
            }
        },
        /* Make sure the CSS accounts for browser inconsistency */
        postcss: {
            options: {
                map: false,
                processors: [
                    require('pixrem')(), // add fallbacks for rem units
                    require('autoprefixer')({ browsers: 'last 2 versions' }), // add vendor prefixes
                    require('postcss-flexbugs-fixes'),
                    require('cssnano')() // minify the result
                ]
            },
            dist: {
                src: 'dest/css/*.css'
            }
        },
        'string-replace': {
          inline: {
            files: {
              'dest/index.html': 'dest/index.html',
              'dest/systemjsconf.js': 'dest/systemjsconf.js'
            },
            options: {
              replacements: [
                // place files inline example 
                {
                   pattern: /..\/node_modules\//ig,
                   replacement: 'node_modules/'               
                }
              ]
            }
          }
        },
        htmlmin: {                                     // Task
            dest: {                                      // Target
              options: {                                 // Target options
                removeComments: true,
                collapseWhitespace: true
              },
              files: {                                   // Dictionary of files
                'dest/index.html': 'src/index.html',     // 'destination': 'source'
              }
            }
        },
        watch: {
            //js:  { files: 'src/app/**/*.js', tasks: [ 'uglify' ] },
            styles: {
                files: ['src/css/*.scss'],
                tasks: ['sass', 'postcss'],
                options: {
                    spawn: false,
                },
            },
        }
    });

    // load plugins
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-sass');
    grunt.loadNpmTasks('grunt-postcss');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');
    grunt.loadNpmTasks('grunt-string-replace');

    // register at least this one task
    grunt.registerTask('default', [ 'uglify', 'sass', 'postcss', 'htmlmin', 'string-replace' ]);
};