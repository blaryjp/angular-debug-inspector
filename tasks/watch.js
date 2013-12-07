module.exports = function (grunt) {
    
    grunt.config('watch', {
        dev: {
            files: {
                '<%= builddir %>/main.css': ['src/widget/css/main.css']
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-watch');

};