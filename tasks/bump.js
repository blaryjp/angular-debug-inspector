module.exports = function (grunt) {
    
    grunt.config('bump', {
        options: {
            files: ['package.json', 'bower.json'],
            updateConfigs: ['pkg', 'bower']
            commit: true,
            push: true,
            createTag: true,
            pushTo: 'upstream',
            commitMessage: 'Release v%VERSION%',
            commitFiles: ['-a'],
            tagName: 'v%VERSION%'
        }
    });

    grunt.loadNpmTasks('grunt-bump');

};