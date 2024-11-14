const medicoModel = require('../models/medicoModel');
const bcrypt = require('bcrypt');
class MedicoController {

    // ----------> renderizar paginas <-------------------
    Index = (req, res) => {
        res.render('index');

    }



    CreateHCE = (req, res) => {
        res.render('createHCE');
    }

    HCE = (req, res) => {
        res.render('hce');
    }

    async Login(req, res) {
        try {
            const { matricula, password } = req.body;
            if (!matricula || !password) {
                return res.status(400).json({ success: false, error: 'Debes ingresar matricula y contraseña' });
            }
            const medico = await medicoModel.traerMedico(matricula);

            // esto es por si no encuentra al medico, osea si no esta bien la matricula ingresada
            if (!medico) {
                return res.status(400).json({ success: false, error: 'Credenciales incorrectas' }); // credenciales incorrectas o no existe el medico
            }
            const passHasheada = medico.password;
            let flag = await bcrypt.compare(password, passHasheada);



            if (flag) {
                req.session.autenticado = true
                req.session.nombre = medico.nombre
                req.session.apellido = medico.apellido
                req.session.matricula = medico.matricula_medico
                req.session.template = medico.template
                res.json({ success: true });

            } else {
                res.json({ success: false, message: 'Credenciales incorrectas' });
            }

        } catch (error) {
            console.log('Error al loguear medico: ', error);
        }
    }

    async template(req, res) {
        console.log('entro a la ruta')
        console.log(req.body.template)
        try {
            await medicoModel.template(req.body.template, req.session.matricula)

        } catch (error) {
            console.log('error en la template' + error)
            return
        }
        req.session.template = req.body.template
        res.send({ mensaje: 'template cargada exitosamente', success: true })
    }
    //------------------------------------------------


}

module.exports = new MedicoController;