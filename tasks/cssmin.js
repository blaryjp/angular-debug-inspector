module.exports = function (grunt) {
    
    grunt.config('cssmin', {
        dev: {
            files: {
                '<%= builddir %>/pin.css': ['src/widget/css/pin.css'],
                '<%= builddir %>/popup.css': ['src/widget/css/popup.css']
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-cssmin');

};