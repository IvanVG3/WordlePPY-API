let intentos = 6;
let palabra;
const API = 'https://random-word-api.vercel.app/api?words=1&length=5&type=uppercase&alphabetize=true';
fetch(API).then(response => response.json())
    .then(response => {
        palabra = response[0];
    })
    .catch(err => console.log(err));

const INPUT = document.getElementById("guess-input");
const BOTON = document.getElementById("guess-button");
BOTON.addEventListener("click", intentar);
INPUT.addEventListener('keydown', function () {
    if (event.key === 'Enter') {
        intentar();
    }
});


function intentar() {
    console.log(palabra);
    const INTENTO = leerIntento();
    if (INTENTO === palabra) {
        terminar("<h1>GANASTE!😀</h1>")
        return
    }
    const GRID = document.getElementById("grid");
    const ROW = document.createElement('div');
    ROW.className = 'row';
    for (let i in palabra) {
        const SPAN = document.createElement('span');
        SPAN.className = 'letter';
        if (INTENTO[i] === palabra[i]) { //VERDE
            SPAN.innerHTML = INTENTO[i];
            SPAN.style.backgroundColor = 'green';
        } else if (palabra.includes(INTENTO[i])) { //AMARILLO
            SPAN.innerHTML = INTENTO[i];
            SPAN.style.backgroundColor = 'yellow';
        } else {      //GRIS
            SPAN.innerHTML = INTENTO[i];
            SPAN.style.backgroundColor = 'grey';
        }
        ROW.appendChild(SPAN)
    } GRID.appendChild(ROW)
    intentos--
    if (intentos == 0) {
        terminar("<h1>PERDISTE!😖</h1>")
    }
    INPUT.value = '';
}
function leerIntento() {
    let intento = document.getElementById("guess-input");
    intento = intento.value;
    intento = intento.toUpperCase();
    return intento;
}

function terminar(mensaje) {
    const INPUT = document.getElementById("guess-input");
    INPUT.disabled = true;
    BOTON.disabled = true;
    let contenedor = document.getElementById('guesses');
    contenedor.innerHTML = mensaje;
}
