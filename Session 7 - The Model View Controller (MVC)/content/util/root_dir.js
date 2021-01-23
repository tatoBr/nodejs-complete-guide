//importing Core modules
const path = require( 'path' );

//getting the root path and exporting it
module.exports = path.dirname( require.main.filename );