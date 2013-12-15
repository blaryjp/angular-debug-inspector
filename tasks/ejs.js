module.exports = function (grunt) {
    
    grunt.config('ejs', {
        all: {
        	options: {
        		theme: '<%= theme %>'
        	},
            src: ['src/widget/widget.ejs'],
            dest: '<%= builddir %>',
            expand: true,
            ext: '.js'
        }
    });

    grunt.loadNpmTasks('grunt-ejs');

};