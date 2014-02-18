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

		console.debug( library );

		requirejs.config( { "paths": library } );

		requirejs.config( { "paths": submodule } );

		requirejs( Object.keys( library ) );

		requirejs( Object.keys( submodule ) );
	} );

