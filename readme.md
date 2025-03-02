# Atención Médica - Aplicación de Gestión de Agenda y Historia Clínica

## Descripción

La aplicación **Atención Médica** está diseñada para ayudar a los profesionales médicos a gestionar su agenda y las historias clínicas de sus pacientes. A través de esta plataforma, los médicos pueden acceder a su agenda diaria, consultar los turnos programados, visualizar el historial clínico de sus pacientes, registrar nuevas consultas y mantener un registro completo de la evolución clínica de cada paciente.

### Funcionalidades principales:

- **Agenda del profesional**: Los médicos pueden consultar y gestionar los turnos programados para cada día. Al seleccionar un turno, se pueden visualizar detalles del paciente, incluyendo el motivo de consulta y el estado de la atención.
  
- **Historia Clínica Electrónica (HCE)**: Cada paciente tiene su propio historial clínico, que incluye información como:
  - Evoluciones (notas clínicas)
  - Diagnósticos
  - Alergias, antecedentes patológicos, hábitos y medicamentos en uso.
  
- **Interfaz de usuario**: Los médicos pueden ver la evolución de cada paciente, agregar notas clínicas enriquecidas, registrar diagnósticos y realizar modificaciones solo en la última atención registrada.

- **Registro de atención**: El profesional puede iniciar y finalizar una consulta, y los registros de atención se actualizan automáticamente en la agenda.

---

## Características

- **Acceso profesional**: Los médicos inician sesión con su usuario para consultar su agenda y gestionar las consultas de pacientes.
- **Consultas de pacientes**: Los médicos pueden acceder a la historia clínica de los pacientes y registrar nueva información sobre cada consulta.
- **Plantillas de notas clínicas**: El sistema permite cargar plantillas de notas clínicas para facilitar la escritura de evoluciones.
- **Estado de la consulta**: El estado de cada turno se actualiza automáticamente (ej. "Atendido") cuando se cierra la consulta.

---

## Estructura de la Base de Datos

La aplicación utiliza una base de datos estructurada para almacenar la información de los pacientes, sus atenciones y la agenda del profesional. A continuación se muestra un esquema básico de la base de datos que puede adaptarse según las necesidades:

- **Pacientes**: Información personal, historial clínico.
- **Atenciones**: Registros de cada consulta, diagnóstico, evolución, etc.
- **Agenda**: Programación de turnos para los profesionales.

---

## Requisitos

Para ejecutar este proyecto en tu máquina local, asegúrate de tener los siguientes requisitos:

- **Node.js**: Versión >= 14.x
- **npm** para gestionar las dependencias.
- **Base de datos**: Debes tener una base de datos configurada MySQL para almacenar la información de la aplicación.

---
