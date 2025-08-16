// backend/app.js
const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

function optimizarPortafolio(limite, items) {

    const proyectosOrdenados = items.map(obj => ({
        ...obj,
        eficiencia: obj.valor / obj.peso
    })).sort((a, b) => b.eficiencia - a.eficiencia);

    let pesoTotal = 0;
    let beneficioTotal = 0;
    const seleccion = [];

    for (const proyecto of proyectosOrdenados) {
        if (pesoTotal + proyecto.peso <= limite) {
            seleccion.push(proyecto.nombre);
            pesoTotal += proyecto.peso;
            beneficioTotal += proyecto.valor;
        }
    }


    const dp = new Array(limite + 1).fill(0);
    const selected = new Array(limite + 1).fill().map(() => []);

    for (const proyecto of items) {
        for (let w = limite; w >= proyecto.peso; w--) {
            if (dp[w - proyecto.peso] + proyecto.valor > dp[w]) {
                dp[w] = dp[w - proyecto.peso] + proyecto.valor;
                selected[w] = [...selected[w - proyecto.peso], proyecto.nombre];
            }
        }
    }

    if (dp[limite] > beneficioTotal) {
        return {
            seleccion: selected[limite],
            beneficioTotal: dp[limite],
            pesoUtilizado: limite
        };
    }

    return { seleccion, beneficioTotal, pesoUtilizado: pesoTotal };
}

app.post('/calcular', (req, res) => {
    try {
        const { limite, items } = req.body;

        if (typeof limite !== 'number' || limite <= 0) {
            return res.status(400).json({ error: "El límite debe ser un número positivo" });
        }

        if (!Array.isArray(items) || items.some(obj => 
            typeof obj.nombre !== 'string' || 
            typeof obj.peso !== 'number' || 
            typeof obj.valor !== 'number'
        )) {
            return res.status(400).json({ error: "Formato de items inválido" });
        }

        const resultado = optimizarPortafolio(limite, items);
        res.json(resultado);

    } catch (error) {
        res.status(500).json({ error: "Error interno del servidor" });
    }
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Servidor en http://localhost:${PORT}`));
