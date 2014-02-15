module.exports = function gruntConfiguration( grunt ){
	grunt.initConfig( {
		"copy": {
			"main": {
				"files": [
					{
						"expand": true,
						"src": "./adaptable/**",
						"dest": "./staging/adaptable"		
					},
					{
						"expand": true,
						"src": "./library/**",
						"dest": "./staging/library"		
					},
					{
						"expand": true,
						"src": "./node_modules/**",
						"dest": "./staging/node_modules"		
					},
					{
						"expand": true,
						"src": "./script/**",
						"dest": "./staging/script"
					},
					{
						"expand": true,
						"src": "./main/**",
						"dest": "./staging"
					}
				]
			}
		},
		"node-webkit": {
			"options": {
				"build_dir": "./build",
				"win": true	
			},
			"src": [ "./*" ]
		}
	} );
	
	grunt.loadNpmTasks( "grunt-contrib-copy" );
	grunt.loadNpmTasks( "grunt-node-webkit-builder" );

	grunt.registerTask( "default", [ "copy"/*, "node-webkit"*/ ] )
};