var express = require( "express" );
var path = require( "path" );

var grado = express( );

var usedPort = ( Date.now( ) % ( 65535 - 49152 ) ) + 49152;
exports.getUsedPort = function getUsedPort( ){
	return usedPort;
};

var currentDirectoryPath = process.cwd( );
exports.getCurrentDirectory = function getCurrentDirectory( ){
	return currentDirectoryPath;
};

exports.start = function start( callback ){
	grado.listen( usedPort, "127.0.0.1", callback );
};

grado.use( express.logger( ) );
grado.use( express.bodyParser( ) );
grado.use( "/static", express.static( currentDirectoryPath ) );

