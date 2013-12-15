module.exports = function (grunt) {
    
    grunt.config('clean', {
	    dist: {
	        src: ['<%= distdir %>', '<%= builddir %>']
	    }
    });

    grunt.loadNpmTasks('grunt-contrib-clean');

};