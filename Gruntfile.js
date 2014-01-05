module.exports = function (grunt) {

    var type = grunt.option('type');

    // Initialize config.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        builddir: '.tmp',
        distdir: 'dist',
        devdir: 'src',

        theme: grunt.option('theme') || 'textmate'

    });

    // Load per-task config from separate files.
    grunt.loadTasks('tasks');

    // Register alias tasks.
    grunt.registerTask('dev',
        'Build files for development.',
        ['clean', 'cssmin', 'htmlmin', 'concat', 'ejs']);

    grunt.registerTask('prod',
        'Build file for production.',
        ['clean', 'cssmin', 'htmlmin', 'concat', 'ejs', 'uglify']);

    // --type=patch|minor|major
    grunt.registerTask('release',
        'Create a release, and push it to Github.',
        ['bump-only:'+type, 'prod', 'bump-commit']);

    grunt.registerTask('default', ['dev']);

};