let indicePregunta = 0;
let puntaje = 0;

const btnIniciar = document.getElementById("btnIniciar");
const preguntaContainer = document.getElementById("preguntaContainer");
const resultado = document.getElementById("resultado");

btnIniciar.addEventListener("click", iniciarSimulador);

function iniciarSimulador() {
    indicePregunta = 0;
    puntaje = 0;
    resultado.innerHTML = "";
    mostrarPregunta();
}

function mostrarPregunta() {

    if (indicePregunta >= preguntas.length) {
        mostrarResultado();
        return;
    }

    const preguntaActual = preguntas[indicePregunta];

    let html = `<h2>${preguntaActual.pregunta}</h2>`;

    preguntaActual.opciones.forEach(opcion => {
        html += `
            <button class="opcion">
                ${opcion}
            </button>
        `;
    });

    preguntaContainer.innerHTML = html;

    const botones = document.querySelectorAll(".opcion");

    botones.forEach(boton => {

        boton.addEventListener("click", () => {

            if (
                boton.textContent.trim() ===
                preguntaActual.respuesta
            ) {
                puntaje++;
            }

            indicePregunta++;
            mostrarPregunta();

        });

    });

}

function mostrarResultado() {

    preguntaContainer.innerHTML = "";

    resultado.innerHTML = `
        <h2>Examen Finalizado</h2>
        <h3>Puntaje: ${puntaje} / ${preguntas.length}</h3>
    `;
}