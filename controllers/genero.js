const Genero = require('../models/genero')
const { request, response } = require('express')

// CRUD: Crear, Read, Update, Delete
/**
 * Crear un género
 */
const createGenero = async (req = request, res = response) => {
    console.log(req.body)

    const { nombre, descripcion } = req.body
    try{
        const generoDB = await Genero.findOne({ nombre })
        if(generoDB) {
            return res.status(400).json({ msj: 'Ya existe nombre'})
        }// select * from generos WHERE nombre = ?
        
        const datos = {
            nombre,
            descripcion
        }

        const genero = new Genero(datos)

        await genero.save()

        return res.status(201).json(genero)

    } catch(error) {
        console.log(error)
        return res.status(500).json({msj: error})
    }

}

/**
 * Consultar todos los géneros
 */
router.put('/:genero',
    [
        check('nombre', 'nombre.requerido').not().isEmpty(),
        check('estado', 'estado.requerido').isIn(['Activo', 'Inactivo']),
    ],
    async function(req, res) {
        try {
            let genero = await genero.findById(req.params.generoId);
            if (!genero) {
                return res.send('Género no existe');
            }

            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({messages: errors.array() });
            }

            genero.nombre = req.body.nombre;
            genero.estado = req.body.estado;
            genero.fechaCreacion = req.body.fechaCreacion;
            genero.fechaActualizacion = req.body.fechaActualizacion;
            genero.descripcion = req.body.descripcion;

            genero = await genero.save();

            res.send(genero);
    } catch (error) {
        console.log(error);
        res.send('Ocurrió un error');
    }
});
/**
 * Consultar un género por su ID
 */

/**
 * Actualizar un género
 */

/**
 * Borra un genero por su ID
 */


module.exports = {
    createGenero
}