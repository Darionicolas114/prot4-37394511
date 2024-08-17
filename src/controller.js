import { pool } from './database.js';

class LibroController {

    async getAll(req, res) {
        try {
            const [result] = await pool.query('SELECT * FROM libros'); // Asegúrate de que el nombre de la tabla esté correcto
            res.json(result);
        } catch (err) {
            console.error(err);
            res.status(500).send('Error al obtener datos de la base de datos (TABLA LIBRO)');
        }
    }

    async add(req, res) {
        try {
            const libro = req.body;
            // Convertir anio_publicacion a un formato de fecha
            const fechaPublicacion = new Date(`${libro.anio_publicacion}-01-01`);
    
            const [result] = await pool.query(
                'INSERT INTO libros (nombre, autor, categoria, anio_publicacion, ISBN) VALUES (?, ?, ?, ?, ?)', 
                [libro.nombre, libro.autor, libro.categoria, fechaPublicacion, libro.ISBN]
            );
            res.json({ "Id insertado": result.insertId });
        } catch (err) {
            console.error(err);
            res.status(500).send('Error al insertar en la base de datos (AGREGAR LIBRO)');
        }
    }
    

    async delete(req, res) {
        try {
            const libros = req.body;
            const [result] = await pool.query('DELETE FROM libros WHERE id=?', [libros.id]);
            res.json({ "Registros Eliminados": result.affectedRows });
        } catch (err) {
            console.error(err);
            res.status(500).send('Error al eliminar en la base de datos (ELIMINAR LIBRO)');
        }
    }

    async update(req, res) {
        try {
            const libro = req.body;
    
            // Asegúrate de que anio_publicacion sea una fecha válida
            const fechaPublicacion = new Date(libro.anio_publicacion);
            if (isNaN(fechaPublicacion.getTime())) {
                return res.status(400).send('Fecha de publicación no válida');
            }
    
            const [result] = await pool.query(
                'UPDATE libros SET nombre=?, autor=?, categoria=?, anio_publicacion=?, ISBN=? WHERE id=?',
                [libro.nombre, libro.autor, libro.categoria, fechaPublicacion, libro.ISBN, libro.id]
            );
    
            res.json({ "Registros Actualizados": result.changedRows });
        } catch (err) {
            console.error(err);
            res.status(500).send('Error al actualizar en la base de datos (MODIFICAR LIBRO)');
        }
    }
    
}

export const libro = new LibroController();

