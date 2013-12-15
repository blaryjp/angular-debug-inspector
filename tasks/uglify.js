module.exports = function (grunt) {
    
    grunt.config('uglify', {
	    dist: {
	        files: {
	            '<%= distdir %>/widget.min.js': ['<%= builddir %>/src/widget/widget.js'],
	        }
	    }
    });

    grunt.loadNpmTasks('grunt-contrib-uglify');

};