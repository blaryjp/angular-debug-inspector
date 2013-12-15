module.exports = function (grunt) {
    
    grunt.config('ejs', {
        all: {
            src: ['src/widget/widget.ejs'],
            dest: '<%= builddir %>',
            expand: true,
            ext: '.js'
        }
    });

    grunt.loadNpmTasks('grunt-ejs');

};