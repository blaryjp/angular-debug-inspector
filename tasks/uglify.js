module.exports = function (grunt) {

    grunt.config('uglify', {
        dist: {
            options: {
                banner: '/*! <%= pkg.name %> - Theme <%= theme %> - v<%= pkg.version %> - <%= grunt.template.today("yyyy-mm-dd") %> - Copyright https://github.com/blaryjp/angular-debug-inspector and Angular Batarang authors */\n'
            },
            files: {
                '<%= distdir %>/widget-<%= theme %>.min.js': ['<%= builddir %>/widget-<%= theme %>.js'],
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-uglify');

};
