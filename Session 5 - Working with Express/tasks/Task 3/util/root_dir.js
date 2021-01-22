//import core modules
const path = require( 'path' );

/**Onde eu travei?
 * 1 - passando o parametro do metodo join que pega o endereço absoluto da raiz da aplicação
 * R -require.main.filename
 * 2 - usando a função errada do modulo path.
 * R - Era para usar o metodo path.dirname(). Usei o metodo path.join()
*/

module.exports = path.dirname( require.main.filename );