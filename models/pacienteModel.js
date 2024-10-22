const crearConexion = require("../config/db");
let conn;
class Paciente {
  constructor(
    dni_paciente,
    nombre,
    apellido,
    fecha_nacimiento,
    direccion,
    telefono
  ) {
    this.dni_paciente = dni_paciente;
    this.nombre = nombre;
    this.apellido = apellido;
    this.fecha_nacimiento = fecha_nacimiento;
    this.direccion = direccion;
    this.telefono = telefono;
  }

  static async traerPaciente() {
    conn = await crearConexion();
    let query = "SELECT * FROM `paciente` ";
    try {
      const [result] = await conn.query(query);
      return result.length ? result[0] : null;
      // si hay resultado traer medico, si no, devoler null
    } catch (error) {
      console.log("error al traer pacientes");
    } finally {
      if (conn) conn.end();
    }
  }

}

module.exports = Paciente;