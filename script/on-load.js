define( "onLoad",
	[
		"absurdReset",
		"halfpage"
	],
	function construct( absurdReset ){
		var onLoad = function onLoad( ){
			absurdReset( );
		};
		return onLoad;
	} );
