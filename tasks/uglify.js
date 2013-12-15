module.exports = function (grunt) {
    
    grunt.config('uglify', {
        dist: {
            options: {
                banner: '/*! <%= pkg.name %> - Theme <%= theme %> - v<%= pkg.version %> - <%= grunt.template.today("yyyy-mm-dd") %> - Copyright https://github.com/blaryjp/angular-debug-inspector and Angular Batarang authors */\n'
            },
            files: {
                '<%= builddir %>/src/widget/widget-<%= theme %>.min.js': ['<%= builddir %>/src/widget/widget.js'],
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-uglify');

};