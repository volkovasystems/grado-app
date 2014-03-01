requirejs.config( {
	"paths": {
		"packageInfo": staticBaseURL + "/package"
	}
} );

requirejs( [ "packageInfo" ],
	function construct( packageInfo ){
		var library = packageInfo.library;
		for( var key in library ){
			library[ key ] = staticBaseURL + library[ key ];
		}

		var submodule = packageInfo.submodule;
		for( var key in submodule ){
			submodule[ key ] = staticBaseURL + submodule[ key ];
		}

		var script = packageInfo.script;
		for( var key in script ){
			script[ key ] = staticBaseURL + script[ key ];
		}

		requirejs.config( { "paths": library } );

		requirejs.config( { "paths": submodule } );

		requirejs.config( { "paths": script } );

		var finalLoad = function finalLoad( ){
			requirejs( [ "onLoad" ],	
				function construct( onLoad ){
					onLoad( );
				} );
		};

		//TODO: This should be replaced with revolver.
		switch( environment ){
			case "node-webkit":
			case "nodejs":
				var async = require( "async" );
				async.series( [
						function loadJQuery( callback ){
							requirejs( [ "jquery" ], callback );
						},
						function loadLibrary( callback ){
							requirejs( Object.keys( library ), callback );
						},
						function loadSubmodule( callback ){
							requirejs( Object.keys( submodule ), callback );
						},
						function loadScript( callback ){
							requirejs( Object.keys( script ), callback );
						}
					], finalLoad );
				break;

			case "browser":
				requirejs( [ "jquery" ],
					function construct( ){
						requirejs( Object.keys( library ),
							function construct( ){
								requirejs( Object.keys( submodule ),
									function construct( ){
										requirejs( Object.keys( script ), finalLoad );						
									} );				
							} );
					} );
				break;
			default:
		}
	} );
