let lista = [];

const Pendiente = document.getElementById("pendiente");

const enviar = (e) => {
    lista.push({
        texto: Pendiente.value,
        estaMarcado: false,
        fechaCreacion: new Date(),
        fechaTachado: null 
    });

    MostrarTODO();
};

function MostrarTODO() {
    document.getElementById("resultado").innerHTML = "";
    for (let i = 0; i < lista.length; i++) {
        let checked = "";
        let fechaTachado = lista[i].fechaTachado ? ` (Tachado: ${lista[i].fechaTachado.toLocaleString()})` : "";
        if (lista[i].estaMarcado) {
            checked = "checked";
            if (!lista[i].fechaTachado) {
                lista[i].fechaTachado = new Date();
            }
        }
        document.getElementById("resultado").innerHTML += `
            <input ${checked} type="checkbox" id="botonchequeo" onchange="chequeado(${i})" name="pendiente" value="lo hice" /> 
            ${lista[i].texto} - Creado: ${lista[i].fechaCreacion.toLocaleString()}${fechaTachado}
            <br />
        `;
    }
}

function chequeado(indice) {
    lista[indice].estaMarcado = !lista[indice].estaMarcado;
    MostrarTODO();
}

function BorrarTODO() {
    lista = [];
    document.getElementById("resultado").innerHTML = "";
} 

function mostrarMasRapido() {
    let tareaMasRapida = null;
    let tiempoMasCorto = Infinity;

    for (let i = 0; i < lista.length; i++) {
        if (lista[i].fechaTachado) {
            let tiempoTarea = lista[i].fechaTachado - lista[i].fechaCreacion;

            if (tiempoTarea < tiempoMasCorto) {
                tiempoMasCorto = tiempoTarea;
                tareaMasRapida = lista[i];
            }
        }
    }

    const resultado = document.getElementById("resultadoMasRapido");
    if (tareaMasRapida) {
        resultado.innerHTML = `La tarea más rápida fue "${tareaMasRapida.texto}" con un tiempo de ${tiempoMasCorto / 1000}`;
    } else {
        resultado.innerHTML = "Todavia no se completo ninguna tarea";
    }
}

const botonMasRapido = document.createElement("button");
botonMasRapido.textContent = "Mostrar la tarea más rápida";
botonMasRapido.onclick = mostrarMasRapido;
document.body.appendChild(botonMasRapido);

const resultadoMasRapido = document.createElement("div");
resultadoMasRapido.id = "resultadoMasRapido";
document.body.appendChild(resultadoMasRapido);
