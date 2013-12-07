module.exports = function (grunt) {
    
    grunt.config('cssmin', {
        dev: {
            files: {
                '<%= builddir %>/main.css': ['src/widget/css/main.css']
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-cssmin');

};