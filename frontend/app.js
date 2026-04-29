// importamos las funciones con los nuevos nombres que definimos
import { 
    validarUsuario, 
    obtenerIdentificadoresUnicos, 
    registrarTarea, 
    obtenerTareasPorUsuario, 
    modificarTituloTarea, 
    borrarTarea 
} from "../peticiones/index.js";

// selectores para mostrar los ids en la lista
const listaIds = document.querySelector(".id__disponibles");

// selectores para la búsqueda de usuario
const formularioBusqueda = document.querySelector(".formulario__buscar");
const inputIdUsuario = document.querySelector(".id");
const contenedorModificar = document.querySelector(".modificar");

// selectores de botones de acción
const botonAgregar = document.querySelector(".agregar__tareas");
const botonModificar = document.querySelector(".modificar__tareas");
const botonEliminar = document.querySelector(".eliminar__tareas");

// selectores de entradas de datos (inputs)
const inputNuevaTarea = document.querySelector(".Agregar__tarea");
const inputIdModificar = document.querySelector(".Modificacion__tareaid");
const inputNuevoTexto = document.querySelector(".Modificacion__tarea");
const inputIdEliminar = document.querySelector(".eliminacion__tarea");

// contenedor principal donde se ven las tareas
const panelTareas = document.querySelector(".contenedor__tareas");

// contador para simular el id de las nuevas tareas
let contadorIdTarea = 200;

// al cargar la página, mostramos los ids de usuario que ya tienen tareas
document.addEventListener("DOMContentLoaded", async function() {
    const listaDeIds = await obtenerIdentificadoresUnicos();

    listaDeIds.forEach(idUnico => {
        const elementoLista = document.createElement("li");
        elementoLista.textContent = `usuario id: ${idUnico}`;
        listaIds.appendChild(elementoLista);
    });
});

// evento para buscar y mostrar las tareas de un usuario específico
formularioBusqueda.addEventListener("submit", async function(evento) {
    evento.preventDefault();

    // limpiamos el panel antes de mostrar nuevos resultados
    panelTareas.innerHTML = "";

    const existeUsuario = await validarUsuario(inputIdUsuario.value);
    const tareasObtenidas = await obtenerTareasPorUsuario(inputIdUsuario.value);

    if (existeUsuario) {
        alert("usuario localizado correctamente");
        tareasObtenidas.forEach(item => {
            const bloqueTarea = document.createElement("div");
            bloqueTarea.innerHTML = `
                    <p class="tarea${item.id}"><strong>id tarea:</strong> ${item.id}</p>
                    <p><strong>título:</strong> ${item.title}</p>
                    <p><strong>estado:</strong> ${item.completed ? "completada" : "pendiente"}</p>
                    <hr>
            `;
            panelTareas.appendChild(bloqueTarea);
        });
        // activamos la sección de modificaciones
        contenedorModificar.classList.add("activo");
    } else {
        alert("el id de usuario no existe");
    }
});

// evento para registrar una nueva tarea
botonAgregar.addEventListener("click", async function (evento) {
    evento.preventDefault();

    const resultado = await registrarTarea(inputIdUsuario.value, inputNuevaTarea.value, contadorIdTarea);

    if (resultado && !resultado.error) {
        alert("la tarea se añadió con éxito");
        contadorIdTarea++; // aumentamos el contador para la siguiente
    } else {
        alert(resultado.error || "error al añadir la tarea");
    }
});

// evento para modificar el título de una tarea existente
botonModificar.addEventListener("click", async function (evento) {
    evento.preventDefault();

    const idAEditar = inputIdModificar.value;
    const textoEditado = inputNuevoTexto.value;

    if (!idAEditar || !textoEditado) {
        alert("por favor, completa el id y el nuevo título");
        return;
    }

    const confirmacion = await modificarTituloTarea(idAEditar, textoEditado);

    if (confirmacion && confirmacion.id) {
        alert(`tarea ${idAEditar} actualizada con éxito`);
    } else {
        alert("error al modificar. verifica que el id de la tarea sea el correcto");
    }
});

// evento para eliminar una tarea del servidor
botonEliminar.addEventListener("click", async function (evento) {
    evento.preventDefault();

    const idABorrar = inputIdEliminar.value;

    if (!idABorrar) {
        alert("debes ingresar el id de la tarea a eliminar");
        return;
    }

    if (!confirm(`¿estás seguro de borrar la tarea ${idABorrar}?`)) return;

    const fueBorrado = await borrarTarea(idABorrar);

    if (fueBorrado) {
        alert(`tarea ${idABorrar} eliminada del sistema`);
    } else {
        alert("no se pudo eliminar la tarea");
    }
});
