async function optimizar() {
    const limite = parseInt(document.getElementById('limite').value);
    const proyectos = Array.from(document.querySelectorAll('.proyecto')).map(proyecto => ({
        nombre: proyecto.querySelector('.nombre').value.trim(),
        peso: parseInt(proyecto.querySelector('.peso').value),
        valor: parseInt(proyecto.querySelector('.valor').value)
    }));

    // Validación básica
    if (isNaN(limite)) {
        mostrarError("Ingresa un presupuesto válido.");
        return;
    }
    if (proyectos.some(p => !p.nombre || isNaN(p.peso) || isNaN(p.valor))) {
        mostrarError("Completa todos los campos correctamente.");
        return;
    }

    try {
        const response = await fetch('http://localhost:5000/calcular', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ limite, items: proyectos })
        });

        if (!response.ok) {
            throw new Error(`Error ${response.status}: ${await response.text()}`);
        }

        const data = await response.json();
        mostrarResultado(data);

    } catch (error) {
        mostrarError(`Error al conectar con el servidor: ${error.message}`);
    }
}

function mostrarResultado(data) {
    const resultadosDiv = document.getElementById('resultados');
    resultadosDiv.innerHTML = `
        <h3>Resultados de Optimización</h3>
        <p><strong>Proyectos seleccionados:</strong> ${data.seleccion?.join(', ') || 'Ninguno'}</p>
        <p><strong>Beneficio total:</strong> $${data.beneficioTotal?.toLocaleString() || 0}</p>
        <p><strong>Presupuesto utilizado:</strong> $${data.pesoUtilizado?.toLocaleString() || 0} / $${document.getElementById('limite').value}</p>
    `;
}

function mostrarError(mensaje) {
    document.getElementById('resultados').innerHTML = `
        <div class="error">
            <p>❌ ${mensaje}</p>
        </div>
    `;
}

function agregarProyecto() {
    const div = document.createElement('div');
    div.className = 'proyecto';
    div.innerHTML = `
        <input type="text" placeholder="Nombre (ej: Fondo_A)" class="nombre">
        <input type="number" placeholder="Costo (ej: 2000)" class="peso" min="1">
        <input type="number" placeholder="Beneficio (ej: 1500)" class="valor" min="1">
        <button onclick="this.parentElement.remove()">🗑</button>
    `;
    document.getElementById('proyectos').appendChild(div);
}
