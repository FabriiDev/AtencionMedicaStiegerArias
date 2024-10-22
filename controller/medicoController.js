const medicoModel = require('../models/medicoModel');

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

    async Login (req, res) {
        try{
            const {matricula, password} = req.body;

            if(!matricula || !password){
                return res.status(400).json({success: false, error: 'Debes ingresar matricula y contraseña'});
            }

            const medico = await medicoModel.login(matricula, password);
            
            if(medico){
                res.json({success: true});
            }else{
                res.json({success: false, message: 'Credenciales incorrectas'});
            }

        }catch(error){
            console.log('Error al loguear medico: ', error);
        }
    }
    
    //------------------------------------------------
    

}

module.exports = new MedicoController;