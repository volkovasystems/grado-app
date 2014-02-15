module.exports = function gruntConfiguration( grunt ){
	grunt.initConfig( {
		"copy": {

		},
		"node-webkit": {
			"options": {
				"build_dir": "./build",
				"win": true	
			},
			"src": [ "./*" ]
		}
	} );
	grunt.loadNpmTasks( "grunt-node-webkit-builder" );
	grunt.registerTask( "default", [ "","node-webkit" ] )
};