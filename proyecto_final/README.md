## REALIZADO POR: Tania Marcela Quezada Contreras
## ARQUITECTURA DE SOFTWARE
## EXAMEN PRÁCTICO FINAL

## Optimización de Portafolio de Inversiones

## Dependencias

* [Node.js](https://nodejs.org/) ≥ v18
* [Express](https://www.npmjs.com/package/express)
* [Cors](https://www.npmjs.com/package/cors)

Instalar dependencias:

```bash
npm install express cors
```

---

## Instalación y Despliegue

1. Clonar el repositorio:

```bash
git clone <URL-del-repositorio>
cd backend
```

2. Instalar dependencias:

```bash
npm install
```

3. Iniciar servidor:

```bash
node app.js
```

Servidor escuchando en: `http://localhost:5000`

4. Abrir `index.html` en un navegador para usar la interfaz web.

---

## Ejemplos de uso

### Entrada (JSON)

```json
{
  "limite": 10000,
  "items": [
    { "nombre": "Ingreso", "peso": 2000, "valor": 1500 },
    { "nombre": "Egreso", "peso": 3000, "valor": 2000 },
    { "nombre": "Final", "peso": 5000, "valor": 4500 }
  ]
}
```

### Salida esperada

```json
{
  "seleccion": ["Egreso", "Final"],
  "beneficioTotal": 5500,
  "pesoUtilizado": 8000
}
```

---

## 📡 Especificación de API

### Endpoint: `/calcular` (POST)

* **URL:** `http://localhost:5000/calcular`
* **Método:** `POST`
* **Headers:**

```http
Content-Type: application/json
```

* **Body (JSON):**

```json
{
  "limite": <numero>,
  "items": [
    { "nombre": "string", "peso": <numero>, "valor": <numero> },
    ...
  ]
}
```

* **Respuesta (JSON):**

```json
{
  "seleccion": ["proyecto1", "proyecto2"],
  "beneficioTotal": <numero>,
  "pesoUtilizado": <numero>
}
```

* **Códigos de respuesta:**

  * `200 OK` → Optimización correcta.
  * `400 Bad Request` → Datos inválidos.
  * `500 Internal Server Error` → Error del servidor.

---

## Documentación


```json
{
  "info": {
    "name": "Optimizador de Portafolio",
    "schema": "https://schema.getpostman.com/json/collection/v2.1.0/collection.json"
  },
  "item": [
    {
      "name": "Calcular Optimización",
      "request": {
        "method": "POST",
        "header": [
          { "key": "Content-Type", "value": "application/json" }
        ],
        "body": {
          "mode": "raw",
          "raw": "{\n  \"limite\": 10000,\n  \"items\": [\n    {\"nombre\":\"Ingresi\",\"peso\":2000,\"valor\":1500}\n  ]\n}"
        },
        "url": {
          "raw": "http://localhost:5000/calcular",
          "protocol": "http",
          "host": ["localhost"],
          "port": "5000",
          "path": ["calcular"]
        }
      }
    }
  ]
}
