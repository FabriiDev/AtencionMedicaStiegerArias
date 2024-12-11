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

    async guardarTemplate(req, res) {
        try {
            await medicoModel.guardarTemplate(req.body.template, req.session.matricula, req.body.nombre)

        } catch (error) {
            console.log('error en la template' + error)
            return
        }
        res.send({ mensaje: 'template cargada exitosamente', success: true })
    }
    //------------------------------------------------

    async traerTemplates(req, res) {
        let plantillas
        try {
            plantillas = await medicoModel.traerTemplatesXMatricula(req.session.matricula)

        } catch (error) {
            console.log(error)
            res.send(error)
            return
        }
        res.send(plantillas)
    }

    async updateTemplate(req, res) {


        if (req.body.nombre == '' || req.body.template == '') {
            res.send({ succes: false })
        }
        try {
            if (req.body.activo == 0) {
                medicoModel.bajaLogicaTemplate(req.body.id, req.session.matricula)
            } else {
                medicoModel.updateTemplate(req.body.id, req.body.nombre, req.session.matricula, req.body.template)
            }

        } catch (error) {
            console.log(error)
        }

        res.send({ succes: true })
    }

    async pacientes(req,res){
    let pacientes= await   medicoModel.pacientesMedico(req.session.matricula)
    

        res.render('paciente',{pacientes})
    }
}

module.exports = new MedicoController;