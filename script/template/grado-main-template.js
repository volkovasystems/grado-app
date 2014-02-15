var domo = require( "domo" ).global( );

exports.mainTemplate = DOCUMENT(
		HTML( 
			{
				"lang": "en"
			},
			HEAD(
				SCRIPT(
					{
						"type": "text/javascript",
						"src": "/static/library/require/require.js",
						"data-main": "/static/main.js"
					}
					)
				),
			BODY(
					"hello world"
				)
		)
	).outerHTML;