module.exports = function (grunt) {
    
    grunt.config('htmlmin', {
        dev: {
            options: {                                 // Target options
                removeComments: true,
                collapseWhitespace: true
            },
            files: {
                '<%= builddir %>/main.html': ['src/widget/views/main.html']
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-htmlmin');

};