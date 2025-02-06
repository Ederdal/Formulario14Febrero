async function enviarFormulario(event) {
    event.preventDefault(); // Evita el envío tradicional del formulario

    const formulario = event.target;

    // Recopila los datos del formulario
    const datos = {
        nombre: document.getElementById("nombre").value,
        grupo: document.getElementById("grupo").value,
        grado: document.getElementById("grado").value,
        carrera: document.getElementById("carrera").value
    };

    try {
        // Envía los datos al servidor
        const respuesta = await fetch("https://formulario14febrero.onrender.com/registro", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(datos)
        });

        // Procesa la respuesta del servidor
        const resultado = await respuesta.json();
        
        // Muestra el modal con el mensaje
        document.getElementById("mensajeModal").innerText = resultado.mensaje;
        document.getElementById("modalRegistro").style.display = "flex";

        // Limpia el formulario si el registro fue exitoso
        if (respuesta.status === 201) {
            formulario.reset();
        }
    } catch (error) {
        document.getElementById("mensajeModal").innerText = "Error al enviar el formulario: " + error.message;
        document.getElementById("modalRegistro").style.display = "flex";
    }
}

// Función para cerrar el modal
function cerrarModal() {
    document.getElementById("modalRegistro").style.display = "none";
}
