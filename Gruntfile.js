module.exports = function gruntConfiguration( grunt ){
	grunt.initConfig( {
		"pkg": grunt.file.readJSON( "./main/package.json" ),
		"copy": {
			"main": {
				"files": [
					{
						"expand": true,
						"src": "./adaptable/**",
						"dest": "./staging"		
					},
					{
						"expand": true,
						"src": "./library/**",
						"dest": "./staging"		
					},
					{
						"expand": true,
						"src": "./node_modules/**",
						"dest": "./staging"		
					},
					{
						"expand": true,
						"src": "./script/**",
						"dest": "./staging"
					},
					{
						"flatten": true,
						"expand": true,
						"src": "./main/*",
						"dest": "./staging"
					}
				]
			}
		},
		"nodewebkit": {
			"options": {
				"build_dir": "./build",
				"win": true,
				"mac": false,
				"linux32": false,
				"linux64": false
			},
			"src": [ "./staging/**" ]
		}
	} );
	
	grunt.loadNpmTasks( "grunt-contrib-copy" );
	grunt.loadNpmTasks( "grunt-node-webkit-builder" );

	grunt.registerTask( "default", [ "copy", "nodewebkit" ] )
};