module.exports = function (grunt) {
    
    grunt.config('concat', {
        dist: {
            src: [
                'bower_components/ace-builds/src-min-noconflict/ace.js',
                'bower_components/ace-builds/src-min-noconflict/mode-json.js',
                'bower_components/ace-builds/src-min-noconflict/worker-json.js',
                'bower_components/ace-builds/src-min-noconflict/theme-<%= theme %>.js',
                '<%= builddir %>/src/widget/widget-<%= theme %>.min.js'
            ],
            dest: '<%= distdir %>/widget-<%= theme %>.min.js'
        }
    });

    grunt.loadNpmTasks('grunt-contrib-concat');

};