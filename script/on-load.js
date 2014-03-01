define( "onLoad",
	[
		"absurdReset",
		"halfpage"
	],
	function construct( absurdResetContract ){
		var onLoad = function onLoad( ){
			absurdResetContract.onAgree( function handler( ){
				console.log( "Absurd reset loaded." );
				absurdReset( );
			} );
			console.log( "onLoad loaded." );
			console.log( "I was fucking loaded!" );
		};
		return onLoad;
	} );
