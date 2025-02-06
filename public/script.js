async function enviarFormulario(event) {
    event.preventDefault(); 

    const formulario = event.target;
    const datos = {
        nombre: document.getElementById("nombre").value,
        grupo: document.getElementById("grupo").value,
        grado: document.getElementById("grado").value,
        carrera: document.getElementById("carrera").value
    };

    try {
        const respuesta = await fetch("https://formulario14febrero.onrender.com/registro", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(datos)
        });

        if (!respuesta.ok) {
            throw new Error(`Error del servidor: ${respuesta.status} ${respuesta.statusText}`);
        }

        // Detecta si la respuesta es JSON
        const contentType = respuesta.headers.get("content-type");
        if (contentType && contentType.includes("application/json")) {
            const resultado = await respuesta.json();
            document.getElementById("mensajeModal").innerText = resultado.mensaje;
        } else {
            const texto = await respuesta.text();
            document.getElementById("mensajeModal").innerText = "Respuesta inesperada del servidor: " + texto;
        }

        document.getElementById("modalRegistro").style.display = "flex";

        if (respuesta.status === 201) {
            formulario.reset();
        }
    } catch (error) {
        document.getElementById("mensajeModal").innerText = "Error al enviar el formulario: " + error.message;
        document.getElementById("modalRegistro").style.display = "flex";
    }
}
