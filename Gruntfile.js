/* global module:false */
module.exports = function (grunt) {

    // Project configuration
    grunt.initConfig({
        pkg:grunt.file.readJSON('package.json'),
        meta:{
            banner:'/*!\n' +
                ' * obelisk.js <%= pkg.version %>\n' +
                ' * https://github.com/vincentdesmares/eiw\n' +
                ' * MIT licensed\n' +
                ' *\n' +
                ' * Copyright (C) 2014 Vincent Desmares https://github.com/vincentdesmares\n' +
                ' */',
            version:'<%= pkg.version %>'
        },

        concat:{
            core:{
                src:[
                    'src/*/**/*.js'
                ],
                dest:'build/eiw.js'
            }
        },

        uglify:{
            options:{
                banner:'<%= meta.banner %>\n'
            },
            build:{
                src:'<%= concat.core.dest %>',
                dest:'build/eiw.min.js'
            }
        },

        watch:{
            scripts:{
                files:[
                    'src/**/*.js'
                ],
                tasks:['concat']
            }
        }
    });

    // Dependencies
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');

    // Default task
    grunt.registerTask('default', [ 'concat', 'uglify']);

};
