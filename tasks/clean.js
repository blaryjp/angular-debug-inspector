module.exports = function (grunt) {
    
    grunt.config('clean', {
	    dist: {
	        src: ['<%= distdir %>/widget-<%= theme %>.min.js', '<%= builddir %>']
	    }
    });

    grunt.loadNpmTasks('grunt-contrib-clean');

};