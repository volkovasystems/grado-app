define( "onLoad",
	[
		"async",
		"absurdReset",
		"halfpage",
		"forceAutoResize",
	],
	function construct( async,
						absurdResetModuleLoad,
						halfpageModule )
	{
		var onLoad = function onLoad( ){
			async.series( [
					/*
						This will reset the entire app styles to its
							minimal style settings.
					*/
					function onAbsurdResetLoad( callback ){
						absurdResetModuleLoad( function handler( ){
							absurdReset( );
							callback( );
						} );
					},

					/*
						This will initiate a handler to resize
							the parent elements every time the 
							window is resized.
					*/
					function onForceAutoResizeLoad( callback ){
						forceAutoResize( );
						callback( );	
					},

					/*
						Initiate the navigation system.
					*/
					function onHalfpageLoad( callback ){
						halfpageModule( function handler( ){
							var gradoHalfPage = new HalfPage( );
							gradoHalfPage.attachComponent( "grado-half-page-component" );
							callback( );
						} );
					}

					/*
						Load all the pages here.
					*/
				],
				function finalHandler( ){
					//When all things are loaded. Do post loading.
				} );
		};
		return onLoad;
	} );
