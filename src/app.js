/**
 * 1. Vas crear un crud de usuario con los siguientes campos
 * - nombre
 * - apellido 
 * - edad
 * - fecha de nacimiento
 * 2. Todo los campos son obligatorios, por lo que debes usar una libreria para validar
 * la informacion que llegue por el body, puedes usar la libreria que prefieras, puedes buscar 
 * en google pero no en chatgpt
 * 3. Ademas de validar que la informacion sea obligatoria debes validar que la edad sea 
 * igual o mayor a 18
 * 4. en el campo fecha debes validar que la fecha sea de tipo ISO
 * 5. Vas a crear las siguientes usar
 * - Obtener toda la lista de usuario GET /api/users
 * - Obtener un usuario por id o nombre GET /api/users/:id
 * - Crear usuario POST /api/users
 * - Actualizar usuario PUT /api/users/:id
 * - Eliminar un usuario por id o nombre DELETE /api/users/:id}
 * 6. Toda esta informacion la debes guardar en sqllite, asi que debes usar los comando SQL
 * requerido para cada operacion CRUD
 * 7. el puerto debe estar en el 5000
 */
const express = require('express');
const { createTables } = require('./db')
const cors = require('cors')

const { userRoutes } = require('./routes/user.routes')
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
    origin: '* ',
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Permitir métodos específicos
    allowedHeaders: ['Content-Type', 'Authorization'], // Permitir encabezados personalizados
    credentials: true, // Permitir el uso de credenciales (cookies, autenticación)
  }));

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(userRoutes)


app.listen(PORT, () => {
    createTables()
    console.log(`Servidor en funcionamiento en el puerto ${PORT}`);
});
  



