let tiempo = 60 * 60;
let intervalo;
let indicePregunta = 0;
let puntaje = 0;
let errores = [];

const btnIniciar = document.getElementById("btnIniciar");
const preguntaContainer = document.getElementById("preguntaContainer");
const resultado = document.getElementById("resultado");

btnIniciar.addEventListener("click", iniciarSimulador);

function iniciarSimulador() {
    indicePregunta = 0;
    puntaje = 0;
    errores = [];

    resultado.innerHTML = "";
clearInterval(intervalo);

tiempo = 60 * 60;

intervalo = setInterval(() => {

    tiempo--;

    let minutos = Math.floor(tiempo / 60);
    let segundos = tiempo % 60;

    document.getElementById("cronometro").innerHTML =
        `${String(minutos).padStart(2,"0")}:${String(segundos).padStart(2,"0")}`;

    if (tiempo <= 0) {
        clearInterval(intervalo);
        mostrarResultado();
    }

}, 1000);

    mostrarPregunta();
}

function mostrarPregunta() {

    if (indicePregunta >= preguntas.length) {
        mostrarResultado();
        return;
    }

    const preguntaActual = preguntas[indicePregunta];

    const restantes = preguntas.length - indicePregunta;

    let html = `
        <h3>Pregunta ${indicePregunta + 1} de ${preguntas.length}</h3>
        <h4>Restan ${restantes} preguntas</h4>

        <h2>${preguntaActual.pregunta}</h2>
    `;

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

            const respuestaUsuario =
                boton.textContent.trim();

            if (
                respuestaUsuario ===
                preguntaActual.respuesta
            ) {
                puntaje++;
            } else {

                errores.push({
                    pregunta: preguntaActual.pregunta,
                    respuestaUsuario: respuestaUsuario,
                    respuestaCorrecta:
                        preguntaActual.respuesta
                });

            }

            indicePregunta++;
            mostrarPregunta();

        });

    });

}

function mostrarResultado() {

    preguntaContainer.innerHTML = "";

    let htmlErrores = "";

    if (errores.length > 0) {

        htmlErrores += `
            <hr>
            <h2>Preguntas Incorrectas</h2>
        `;

        errores.forEach((error, index) => {

            htmlErrores += `
                <div style="text-align:left;margin-bottom:20px;">
                    <h4>❌ Error ${index + 1}</h4>

                    <p>
                        <b>Pregunta:</b>
                        ${error.pregunta}
                    </p>

                    <p>
                        <b>Tu respuesta:</b>
                        ${error.respuestaUsuario}
                    </p>

                    <p style="color:lightgreen;">
                        <b>Respuesta correcta:</b>
                        ${error.respuestaCorrecta}
                    </p>
                </div>
            `;

        });

    }

    resultado.innerHTML = `
        <h2>Examen Finalizado</h2>

        <h3>
            Puntaje:
            ${puntaje} / ${preguntas.length}
        </h3>

        <h3>
            Incorrectas:
            ${errores.length}
        </h3>

        ${htmlErrores}
    `;
}