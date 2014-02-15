var express = require( "express" );
var grado = express( );

grado.use( express.logger );
grado.use( express.bodyParser( ) );
grado.use( "/static", express.static( __dirname + "../" ) )

grado.get( "/",
	function main( request, response ){
		var mainTemplate = require( "../template/grado-main-template.js" ).mainTemplate;
		response.set( "Content-Type", "text/html" );
		response.send( mainTemplate );
	} );

var usedPort = ( Date.now( ) % 65535 ) + 49152;

exports.getUsedPort = function getUsedPort( ){
	return usedPort;
};

exports.start = function start( ){
	grado.listen( "127.0.0.1", usedPort );
};
