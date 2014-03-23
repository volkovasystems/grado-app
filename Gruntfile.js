module.exports = function gruntConfiguration( grunt ){
	var packageData = grunt.file.readJSON( "./main/package.json" );
	grunt.initConfig( {
		"pkg": packageData,
		"clean": {
			"options": {
				"force": true
			},
			"src": [ "./staging" ]
		},
		"copy": {
			"main": {
				"files": [
					{
						"expand": true,
						"src": "./arbiter-module-loader/**",
						"dest": "./staging"
					},
					{
						"expand": true,
						"src": "./page-group/**",
						"dest": "./staging"
					},
					{
						"expand": true,
						"src": "./page/**",
						"dest": "./staging"
					},
					{
						"expand": true,
						"src": "./compute-next-zindex/**",
						"dest": "./staging"
					},
					{
						"expand": true,
						"src": "./check-zindex-levels/**",
						"dest": "./staging"
					},
					{
						"expand": true,
						"src": "./reduce-zindex-levels/**",
						"dest": "./staging"
					},
					{
						"expand": true,
						"src": "./ng-on-render/**",
						"dest": "./staging"
					},
					{
						"expand": true,
						"src": "./domo-stringify/**",
						"dest": "./staging"
					},
					{
						"expand": true,
						"src": "./ng-app-determine/**",
						"dest": "./staging"
					},
					{
						"expand": true,
						"src": "./force-auto-resize/**",
						"dest": "./staging"
					},
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
						"src": "./ng-auto-resize/**",
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
	
	grunt.loadNpmTasks( "grunt-contrib-clean" );
	grunt.loadNpmTasks( "grunt-contrib-copy" );
	grunt.loadNpmTasks( "grunt-node-webkit-builder" );

	grunt.registerTask( "collect-script-files",
		"Collect all application specific files.",
		function construct( ){
			grunt.log.writeln( "Collecting script files." );
			var fs = require( "fs" );
			var path = require( "path" );
			var S = require( "string" );

			var scriptPath = "." + packageData.scriptPath.replace( "/", path.sep );
			var fileList = fs.readdirSync( scriptPath );
			var scriptList = { };
			for( var index = 0; index < fileList.length; index++ ){
				var scriptFile = fileList[ index ].replace( ".js", "" );
				var scriptName = S( scriptFile ).camelize( ).toString( );
				scriptList[ scriptName ] = "/script/" + scriptFile;
			}
			packageData.script = scriptList;
			packageDataPath = "./main/package.json".replace( "/", path.sep );
			try{
				fs.writeFileSync( packageDataPath, JSON.stringify( packageData, null, "\t" ) );
				grunt.log.writeln( "Script files collected." );
				return true;
			}catch( error ){
				grunt.log.writeln( "Collecting script files failed." );
				return false;
			}
		} );

	grunt.registerTask( "convert-package-json",
		"Convert package.json to package.js",
		function construct( ){
			grunt.task.requires( "collect-script-files" );
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
			"clean",
			"copy", 
			"collect-script-files",
			"convert-package-json",
			"nodewebkit" 
		] );
};
