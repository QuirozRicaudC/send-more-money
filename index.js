
var readline = require('readline');

// clear the terminal and request three words and save them in variables
process.stdout.write('\033c'); 
var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// request three words in a green terminal and save them in variables
rl.question('Ingrese la primer palabra: ', (palabra1) => {
    process.stdout.write('\033c');
    rl.question("Ingrese la segunda palabra: ", (palabra2) => {
        process.stdout.write('\033c');
        rl.question("Ingrese el resultado: ", (resultadoPalabra) => {
            process.stdout.write('\033c');
            //  print thinking ... in blueword
            console.log('\x1b[34m%s\x1b[0m', 'Resolviendo 🧠 ...');
            // using cryptarithmetic get all posible solutions
            var solutions = cryptarithmetic(palabra1, palabra2, resultadoPalabra);
            //  if no solutions found print no solutions found
            //  clear the terminal
            //  if solutions found print all solutions
            process.stdout.write('\033c');

            console.log(
                solutions.length ? "\x1b[32m" : "\x1b[31m",
                `Total de soluciones encontradas: ${solutions.length} ${solutions.length ? '!' : '🥺'}`
            )

            if (solutions.length) {
                //  press "S"a to show all solutions or press any key to exit
                rl.question("Presiona S para ver los resultados o cualquier otra tecla para salir: ", key => {
                    if (key === 's' || key === 'S') {
                        process.stdout.write('\033c');
                        console.log('\x1b[32m%s\x1b[0m', 'Soluciones:');
                        solutions.forEach((solution, index) => {
                            console.log(`Solution ${index + 1}:`);
                            console.log(solution);
                        });
                    }
                    rl.close();
                    // terminate the program
                    process.exit(0);
                });
            }else {
                rl.close();
                // terminate the program
                process.exit(0);
            }   
        });
    });
});

// cryptarithmetic function
const cryptarithmetic = (palabra1, palabra2, resultadoPalabra) =>  {
    // obtener letras unicas
    var letras = getLetters(palabra1, palabra2, resultadoPalabra);
    //  obtener todos los numeros posibles
    var numeros = obtenerNumeros(letras);
    // obtener todas las soluciones
    var soluciones = obtenerSoluciones(palabra1, palabra2, resultadoPalabra, letras, numeros);
    return soluciones;
}

// obtener las letras unicas en la palabra

const getLetters = (palabra1, palabra2, resultadoPalabra) => {
    let letras = [];
    var palabras = [palabra1, palabra2, resultadoPalabra];
    for (var i = 0; i < palabras.length; i++) {
        for (var j = 0; j < palabras[i].length; j++) {
            if (letras.indexOf(palabras[i][j]) == -1) {
                letras.push(palabras[i][j]);
            }
        }
    }
    return letras;
}

// obetener todas las letras unicas en las palabras

const obtenerNumeros = (letras) => {
    var numeros = [];
    for (var i = 0; i < 10; i++) {
        numeros.push(i);
    }
    return permutas(numeros, letras.length);
}

// obtener todas las soluciones posibles

const obtenerSoluciones = (palabra1, palabra2, resultadoPalabra, letras, numeros) => {
    var soluciones = [];
    for (var i = 0; i < numeros.length; i++) {
        var solucion = {};
        for (var j = 0; j < letras.length; j++) {
            solucion[letras[j]] = numeros[i][j];
        }
        if (obtenerSolucion(palabra1, palabra2, resultadoPalabra, solucion)) {
            soluciones.push(solucion);
        }
    }
    return soluciones;
}

//  define permutas

const permutas = (entrada, longitud) => {
    var resultado = [];
    for (var i = 0; i < entrada.length; i++) {
        if (longitud == 1) {
            resultado.push([entrada[i]]);
        } else {
            var remaining = entrada.slice(0, i).concat(entrada.slice(i + 1));
            var permutacionesInternas = permutas(remaining, longitud - 1);
            for (var j = 0; j < permutacionesInternas.length; j++) {
                resultado.push([entrada[i]].concat(permutacionesInternas[j]));
            }
        }
    }
    return resultado;
}

// revisar si la solucion es correxta

const obtenerSolucion = (palabra1, palabra2, resultadoPalabra, solucion) => {
    var primerNumero = obtenerNumero(palabra1, solucion);
    var segundoNumero = obtenerNumero(palabra2, solucion);
    var numeroResultado = obtenerNumero(resultadoPalabra, solucion);
    return primerNumero + segundoNumero == numeroResultado;
}

// obetener los numeros de las palabras

const obtenerNumero = (palabra, solucion) => {
    var numero = "";
    for (var i = 0; i < palabra.length; i++) {
        numero += solucion[palabra[i]];
    }
    return parseInt(numero);
}

// ejecuta este programa en terminal con el comando: node index.ts







