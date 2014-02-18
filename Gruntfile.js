module.exports = function gruntConfiguration( grunt ){
	var packageData = grunt.file.readJSON( "./main/package.json" );
	grunt.initConfig( {
		"pkg": packageData,
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
						"src": "./half-page/**",
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

	grunt.registerTask( "convert-package-json",
		"Convert package.json to package.js",
		function construct( ){
			var fs = require( "fs" );
			
			var template = "define( \"packageInfo\", function construct( ){ return <packageData>; } );";
			fs.writeFileSync( "./staging/package.js", 
				template.replace( "<packageData>", JSON.stringify( packageData, null, "\t" ) ) );

			var isConverted = fs.existsSync( "./staging/package.js" );
			console.log( "Package.json file converted? " + isConverted );
			
			return isConverted;
		} );

	grunt.registerTask( "default",
		[ 
			"copy", 
			"convert-package-json",
			"nodewebkit" 
		] );
};