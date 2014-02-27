module.exports = function gruntConfiguration( grunt ){
	var packageData = grunt.file.readJSON( "./main/package.json" );
	grunt.initConfig( {
		"pkg": packageData,
		"copy": {
			"main": {
				"files": [
					{
						"expand": true,
						"src": "./absurd-compiler/**",
						"dest": "./staging"
					},
					{
						"expand": true,
						"src": "./absurd-reset/**",
						"dest": "./staging"
					},
					{
						"expand": true,
						"src": "./ng-bind-dom/**",
						"dest": "./staging"
					},
					{
						"expand": true,
						"src": "./ng-safe-apply/**",
						"dest": "./staging"
					},
					{
						"expand": true,
						"src": "./server/**",
						"dest": "./staging"
					},
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

	grunt.registerTask( "remove-stage-files",
		"Remove all stage files for building.",
		function construct( ){
			grunt.log.writeln( "Removing all stage files." );
			//TODO: Do something here.
		} );

	grunt.registerTask( "convert-package-json",
		"Convert package.json to package.js",
		function construct( ){
			grunt.log.writeln( "Converting package.json to package.js" );
			var fs = require( "fs" );
			
			var template = "define( \"packageInfo\", function construct( ){ return <packageData>; } );";
			fs.writeFileSync( "./staging/package.js", 
				template.replace( "<packageData>", JSON.stringify( packageData, null, "\t" ) ) );

			var isConverted = fs.existsSync( "./staging/package.js" );
			if( isConverted ){
				grunt.log.writeln( "Package.json file converted." );	
			}else{
				grunt.log.writeln( "Package.json file is not converted." );
			}
			
			return isConverted;
		} );

	grunt.registerTask( "default",
		[ 
			"copy", 
			"convert-package-json",
			"nodewebkit" 
		] );
};