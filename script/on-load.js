define( "onLoad",
	[
		"absurdReset",
		"halfpage",
		"forceAutoResize",
	],
	function construct( absurdReset, halfpage ){
		var onLoad = function onLoad( ){
			absurdReset( );
			forceAutoResize( );
			halfpage( function handler( ){
				var gradoHalfPage = new HalfPage( );
				gradoHalfPage.attachComponent( "grado-half-page-component" );
			} );
		};
		return onLoad;
	} );
