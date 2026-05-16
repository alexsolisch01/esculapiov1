var socket = null;
var host = "ws://192.168.0.185:8000";
//var host = "ws://localhost:8000";
//var host = "ws://94.130.108.30/ws/";
function RealTime(datos) {
    var respuesta = null;
    try {
        respuesta = JSON.parse(datos);
        if (respuesta[0] == 'PerfilGuardar') {
            AgregarFila(respuesta[1], respuesta[3]);
            AgregarItem(respuesta[2], respuesta[4]);
        }
        if (respuesta[0] == 'UsuarioGuardar') {
            AgregarFila(respuesta[1], respuesta[2]);
        }
        if (respuesta[0] == 'ModificarUsuario') {
            ModificarFila(respuesta[1], respuesta[2], respuesta[3]);
        }
        if (respuesta[0] == 'EliminarUsuario') {
            EliminarFila(respuesta[1], respuesta[2]);
            //AgregarItem(respuesta[2],respuesta[5]);
        }
        if (respuesta[0] == 'PerfilModificar') {
            ModificarFila(respuesta[1], respuesta[3], respuesta[5]);
            //AgregarItem(respuesta[2],respuesta[5]);
        }
        if (respuesta[0] == 'PerfilEliminar') {
            EliminarFila(respuesta[1], respuesta[2]);
            //AgregarItem(respuesta[2],respuesta[5]);
        }
        if (respuesta[0] == 'PerfilInactivar') {
            InactivarFila(respuesta[1], respuesta[2]);
            //AgregarItem(respuesta[2],respuesta[5]);
        }
        if (respuesta[0] == 'PerfilActivar') {
            ActivarFila(respuesta[1], respuesta[2]);
            //AgregarItem(respuesta[2],respuesta[5]);
        }
        if (respuesta[0] == 'TipoServicioModificado') {
            ModificarFila(respuesta[1], respuesta[2], respuesta[3]);
            //AgregarItem(respuesta[2],respuesta[5]);
        }
        if (respuesta[0] == 'TipoServicioGuardar') {
            AgregarFila(respuesta[1], respuesta[2]);
        }
        if (respuesta[0] == 'GrupoGuardar') {
            AgregarFila(respuesta[1], respuesta[2]);
        }
        if (respuesta[0] == 'GrupoEstadisticoModificado') {
            ModificarFila(respuesta[1], respuesta[2], respuesta[3]);
            //AgregarItem(respuesta[2],respuesta[5]);
        }
        if (respuesta[0] == 'EspecialidadGuardar') {
            AgregarFila(respuesta[1], respuesta[2]);
        }
        if (respuesta[0] == 'EspecialidadModificado') {
            ModificarFila(respuesta[1], respuesta[2], respuesta[3]);
            //AgregarItem(respuesta[2],respuesta[5]);
        }
        if (respuesta[0] == 'ProcedimientoGuardar') {
            AgregarFila(respuesta[1], respuesta[2]);
        }
        if (respuesta[0] == 'ProcedimientoModificado') {
            ModificarFila(respuesta[1], respuesta[2], respuesta[3]);
            //AgregarItem(respuesta[2],respuesta[5]);
        }
        if (respuesta[0] == 'PuntoGuardar') {
            AgregarFila(respuesta[1], respuesta[2]);
        }
        if (respuesta[0] == 'PuntoModificado') {
            ModificarFila(respuesta[1], respuesta[2], respuesta[3]);
            //AgregarItem(respuesta[2],respuesta[5]);
        }
        if (respuesta[0] == 'EmpleadoGuardar') {
            AgregarFila(respuesta[1], respuesta[2]);
        }
        if (respuesta[0] == 'EmpleadoModifico') {
            ModificarFila(respuesta[1], respuesta[2], respuesta[3]);
            //AgregarItem(respuesta[2],respuesta[5]);
        }

        if (respuesta[0] == 'EliminarEmpleado') {
            EliminarFila(respuesta[1], respuesta[2]);
            //AgregarItem(respuesta[2],respuesta[5]);
        }
        if (respuesta[0] == 'EmpresaGuardar') {
            AgregarFila(respuesta[1], respuesta[2]);
        }
        if (respuesta[0] == 'EmpresaModifico') {
            ModificarFila(respuesta[1], respuesta[2], respuesta[3]);
            //AgregarItem(respuesta[2],respuesta[5]);
        }
        if (respuesta[0] == 'EstaGuardar') {
            AgregarFila(respuesta[1], respuesta[2]);
        }
        if (respuesta[0] == 'EmpresaEliminar') {
            EliminarFila(respuesta[1], respuesta[2]);
            //AgregarItem(respuesta[2],respuesta[5]);
        }
        if (respuesta[0] == 'EstaModifico') {
            ModificarFila(respuesta[1], respuesta[2], respuesta[3]);
            //AgregarItem(respuesta[2],respuesta[5]);
        }
        if (respuesta[0] == 'EstaEliminar') {
            EliminarFila(respuesta[1], respuesta[2]);
            //AgregarItem(respuesta[2],respuesta[5]);
        }
        if (respuesta[0] == 'PuntoEliminar') {
            EliminarFila(respuesta[1], respuesta[2]);
            //AgregarItem(respuesta[2],respuesta[5]);
        }
        if (respuesta[0] == 'TipoRelacionModificado') {
            ModificarFila(respuesta[1], respuesta[2], respuesta[3]);
            //AgregarItem(respuesta[2],respuesta[5]);
        }
        if (respuesta[0] == 'TipoRelacionEliminar') {
            //alert(respuesta[2]);
            EliminarFila(respuesta[1], respuesta[2]);
            //AgregarItem(respuesta[2],respuesta[5]);
        }
        if (respuesta[0] == 'EmpleadoEliminar') {
            //alert(respuesta[2]);
            EliminarFila(respuesta[1], respuesta[2]);
            //AgregarItem(respuesta[2],respuesta[5]);
        }
        if (respuesta[0] == 'TipoServicioEliminar') {
            //alert(respuesta[2]);
            EliminarFila(respuesta[1], respuesta[2]);
            //AgregarItem(respuesta[2],respuesta[5]);
        }
        if (respuesta[0] == 'GrupoEstadisticoEliminar') {
            //alert(respuesta[2]);
            EliminarFila(respuesta[1], respuesta[2]);
            //AgregarItem(respuesta[2],respuesta[5]);
        }
        if (respuesta[0] == 'EspecialidadEliminar') {
            //alert(respuesta[2]);
            EliminarFila(respuesta[1], respuesta[2]);
            //AgregarItem(respuesta[2],respuesta[5]);
        }
        if (respuesta[0] == 'ProcedimientoEliminar') {
            //alert(respuesta[2]);
            EliminarFila(respuesta[1], respuesta[2]);
            //AgregarItem(respuesta[2],respuesta[5]);
        }
        if (respuesta[0] == 'MedicoGuardar') {
            AgregarFila(respuesta[1], respuesta[2]);
        }
        if (respuesta[0] == 'MedicoModifico') {
            ModificarFila(respuesta[1], respuesta[2], respuesta[3]);
            //AgregarItem(respuesta[2],respuesta[5]);
        }
        
        if (respuesta[0] == 'EliminarMedico') {
            //alert(respuesta[2]);
            EliminarFila(respuesta[1], respuesta[2]);
            //AgregarItem(respuesta[2],respuesta[5]);
        }




        if (respuesta[0] == 'GuardarBodega') {
            AgregarFila(respuesta[1], respuesta[2]);
        }
        if (respuesta[0] == 'GuardarDepartamento') {
            AgregarFila(respuesta[1], respuesta[2]);
        }
        if (respuesta[0] == 'GuardarIngreso') {
            AgregarFila(respuesta[1], respuesta[2]);
        }
        if (respuesta[0] == 'GuardarLinea') {
            AgregarFila(respuesta[1], respuesta[2]);
        }
        if (respuesta[0] == 'GuardarUnidad') {
            AgregarFila(respuesta[1], respuesta[2]);
        }
        if (respuesta[0] == 'GuardarClasificacion') {
            AgregarFila(respuesta[1], respuesta[2]);
        }
        if (respuesta[0] == 'GuardarFarmaco') {
            AgregarFila(respuesta[1], respuesta[2]);
        }
        if (respuesta[0] == 'GuardarInventario') {
            AgregarFila(respuesta[1], respuesta[2]);
        }
        if (respuesta[0] == 'ModificaBodega') {
            ModificarFila(respuesta[1], respuesta[2], respuesta[3]);
            //AgregarItem(respuesta[2],respuesta[5]);
        }
        if (respuesta[0] == 'ModificaDepartamento') {
            ModificarFila(respuesta[1], respuesta[2], respuesta[3]);
            //AgregarItem(respuesta[2],respuesta[5]);
        }
        if (respuesta[0] == 'ModificaIngreso') {
            ModificarFila(respuesta[1], respuesta[2], respuesta[3]);
            //AgregarItem(respuesta[2],respuesta[5]);
        }
        if (respuesta[0] == 'ModificaLinea') {
            ModificarFila(respuesta[1], respuesta[2], respuesta[3]);
            //AgregarItem(respuesta[2],respuesta[5]);
        }
        if (respuesta[0] == 'ModificaUnidad') {
            ModificarFila(respuesta[1], respuesta[2], respuesta[3]);
            //AgregarItem(respuesta[2],respuesta[5]);
        }
        if (respuesta[0] == 'ModificaActivo') {
            ModificarFila(respuesta[1], respuesta[2], respuesta[3]);
            //AgregarItem(respuesta[2],respuesta[5]);
        }
        if (respuesta[0] == 'ModificaFarmaco') {
            ModificarFila(respuesta[1], respuesta[2], respuesta[3]);
            //AgregarItem(respuesta[2],respuesta[5]);
        }
        if (respuesta[0] == 'ModificaInvetario') {
            ModificarFila(respuesta[1], respuesta[2], respuesta[3]);
            //AgregarItem(respuesta[2],respuesta[5]);
        }
        if (respuesta[0] == 'EliminaBodega') {
            //alert(respuesta[2]);
            EliminarFila(respuesta[1], respuesta[2]);
            //AgregarItem(respuesta[2],respuesta[5]);
        }
        if (respuesta[0] == 'EliminaDepartamento') {
            //alert(respuesta[2]);
            EliminarFila(respuesta[1], respuesta[2]);
            //AgregarItem(respuesta[2],respuesta[5]);
        }
        if (respuesta[0] == 'EliminaIngreso') {
            //alert(respuesta[2]);
            EliminarFila(respuesta[1], respuesta[2]);
            //AgregarItem(respuesta[2],respuesta[5]);
        }
        if (respuesta[0] == 'EliminaLinea') {
            //alert(respuesta[2]);
            EliminarFila(respuesta[1], respuesta[2]);
            //AgregarItem(respuesta[2],respuesta[5]);
        }
        if (respuesta[0] == 'EliminaUnidad') {
            //alert(respuesta[2]);
            EliminarFila(respuesta[1], respuesta[2]);
            //AgregarItem(respuesta[2],respuesta[5]);
        }
        if (respuesta[0] == 'EliminaActivo') {
            //alert(respuesta[2]);
            EliminarFila(respuesta[1], respuesta[2]);
            //AgregarItem(respuesta[2],respuesta[5]);
        }
        if (respuesta[0] == 'EliminaFarmaco') {
            //alert(respuesta[2]);
            EliminarFila(respuesta[1], respuesta[2]);
            //AgregarItem(respuesta[2],respuesta[5]);
        }
        if (respuesta[0] == 'EliminaInventario') {
            //alert(respuesta[2]);
            EliminarFila(respuesta[1], respuesta[2]);
            //AgregarItem(respuesta[2],respuesta[5]);
        }
        if (respuesta[0] == 'InactivarBodega') {
            InactivarFila(respuesta[1], respuesta[2]);
            //AgregarItem(respuesta[2],respuesta[5]);
        }
        if (respuesta[0] == 'ActivarBodega') {
            ActivarFila(respuesta[1], respuesta[2]);
            //AgregarItem(respuesta[2],respuesta[5]);
        }
        if (respuesta[0] == 'InactivarDepa') {
            InactivarFila(respuesta[1], respuesta[2]);
            //AgregarItem(respuesta[2],respuesta[5]);
        }
        if (respuesta[0] == 'ActivarDepa') {
            ActivarFila(respuesta[1], respuesta[2]);
            //AgregarItem(respuesta[2],respuesta[5]);
        }
        if (respuesta[0] == 'InactivarIngre') {
            InactivarFila(respuesta[1], respuesta[2]);
            //AgregarItem(respuesta[2],respuesta[5]);
        }
        if (respuesta[0] == 'ActivarIngre') {
            ActivarFila(respuesta[1], respuesta[2]);
            //AgregarItem(respuesta[2],respuesta[5]);
        }
        if (respuesta[0] == 'InactivarLinea') {
            InactivarFila(respuesta[1], respuesta[2]);
            //AgregarItem(respuesta[2],respuesta[5]);
        }
        if (respuesta[0] == 'ActivarLinea') {
            ActivarFila(respuesta[1], respuesta[2]);
            //AgregarItem(respuesta[2],respuesta[5]);
        }
        if (respuesta[0] == 'InactivarPresen') {
            InactivarFila(respuesta[1], respuesta[2]);
            //AgregarItem(respuesta[2],respuesta[5]);
        }
        if (respuesta[0] == 'ActivarPresen') {
            ActivarFila(respuesta[1], respuesta[2]);
            //AgregarItem(respuesta[2],respuesta[5]);
        }
        if (respuesta[0] == 'InactivarClasi') {
            InactivarFila(respuesta[1], respuesta[2]);
            //AgregarItem(respuesta[2],respuesta[5]);
        }
        if (respuesta[0] == 'ActivarClasi') {
            ActivarFila(respuesta[1], respuesta[2]);
            //AgregarItem(respuesta[2],respuesta[5]);
        }
        if (respuesta[0] == 'InactivarFarmaco') {
            InactivarFila(respuesta[1], respuesta[2]);
            //AgregarItem(respuesta[2],respuesta[5]);
        }
        if (respuesta[0] == 'ActivarFarmaco') {
            ActivarFila(respuesta[1], respuesta[2]);
            //AgregarItem(respuesta[2],respuesta[5]);
        }
        ////////////LAB PARA INACTIVAR////////////////////
        if (respuesta[0] == 'InactivarMuestra') {
            InactivarFila(respuesta[1], respuesta[2]);
            //AgregarItem(respuesta[2],respuesta[5]);
        }
        if (respuesta[0] == 'ActivarMuestra') {
            ActivarFila(respuesta[1], respuesta[2]);
            //AgregarItem(respuesta[2],respuesta[5]);
        }
        if (respuesta[0] == 'InactivarExamen') {
            InactivarFila(respuesta[1], respuesta[2]);
            //AgregarItem(respuesta[2],respuesta[5]);
        }
        if (respuesta[0] == 'ActivarExamen') {
            ActivarFila(respuesta[1], respuesta[2]);
            //AgregarItem(respuesta[2],respuesta[5]);
        }
        if (respuesta[0] == 'InactivarEntidad') {
            InactivarFila(respuesta[1], respuesta[2]);
            //AgregarItem(respuesta[2],respuesta[5]);
        }
        if (respuesta[0] == 'ActivarEntidad') {
            ActivarFila(respuesta[1], respuesta[2]);
            //AgregarItem(respuesta[2],respuesta[5]);
        }
        if (respuesta[0] == 'InactivarEquipo') {
            InactivarFila(respuesta[1], respuesta[2]);
            //AgregarItem(respuesta[2],respuesta[5]);
        }
        if (respuesta[0] == 'ActivarEquipo') {
            ActivarFila(respuesta[1], respuesta[2]);
            //AgregarItem(respuesta[2],respuesta[5]);
        }
        if (respuesta[0] == 'PacienteGuardar') {
            AgregarFila(respuesta[1], respuesta[2]);
        }
        if (respuesta[0] == 'EpidemiaModifico') {
            ModificarFila(respuesta[1], respuesta[2], respuesta[3]);
            //AgregarItem(respuesta[2],respuesta[5]);
        }
        if (respuesta[0] == 'TrabajoModifico') {
            ModificarFila(respuesta[1], respuesta[2], respuesta[3]);
            //AgregarItem(respuesta[2],respuesta[5]);
        }
        if (respuesta[0] == 'PacienteModifico') {
            ModificarFila(respuesta[1], respuesta[2], respuesta[3]);
            //AgregarItem(respuesta[2],respuesta[5]);
        }
        if (respuesta[0] == 'PacienteEliminar') {
            //alert(respuesta[2]);
            EliminarFila(respuesta[1], respuesta[2]);
            //AgregarItem(respuesta[2],respuesta[5]);
        }
        if (respuesta[0] == 'MuestraGuardar') {
            AgregarFila(respuesta[1], respuesta[2]);
        }
        if (respuesta[0] == 'MuestraModifico') {
            ModificarFila(respuesta[1], respuesta[2], respuesta[3]);
            //AgregarItem(respuesta[2],respuesta[5]);
        }
        if (respuesta[0] == 'MuestraEliminar') {
            //alert(respuesta[2]);
            EliminarFila(respuesta[1], respuesta[2]);
            //AgregarItem(respuesta[2],respuesta[5]);
        }
        if (respuesta[0] == 'ExamenGuardar') {
            AgregarFila(respuesta[1], respuesta[2]);
        }
        if (respuesta[0] == 'ExamenModifico') {
            ModificarFila(respuesta[1], respuesta[2], respuesta[3]);
            //AgregarItem(respuesta[2],respuesta[5]);
        }
        if (respuesta[0] == 'ExamenEliminar') {
            //alert(respuesta[2]);
            EliminarFila(respuesta[1], respuesta[2]);
            //AgregarItem(respuesta[2],respuesta[5]);
        }
        if (respuesta[0] == 'EntidadGuardar') {
            AgregarFila(respuesta[1], respuesta[2]);
        }
        if (respuesta[0] == 'EntidadModifico') {
            ModificarFila(respuesta[1], respuesta[2], respuesta[3]);
            //AgregarItem(respuesta[2],respuesta[5]);
        }
        if (respuesta[0] == 'EntidadEliminar') {
            //alert(respuesta[2]);
            EliminarFila(respuesta[1], respuesta[2]);
            //AgregarItem(respuesta[2],respuesta[5]);
        }
        if (respuesta[0] == 'EquipoGuardar') {
            AgregarFila(respuesta[1], respuesta[2]);
        }
        if (respuesta[0] == 'EquipoModifico') {
            ModificarFila(respuesta[1], respuesta[2], respuesta[3]);
            //AgregarItem(respuesta[2],respuesta[5]);
        }
        if (respuesta[0] == 'EquipoEliminar') {
            //alert(respuesta[2]);
            EliminarFila(respuesta[1], respuesta[2]);
            //AgregarItem(respuesta[2],respuesta[5]);
        }
        if (respuesta[0] == 'ProLabGuardar') {
            AgregarFila(respuesta[1], respuesta[2]);
        }
        if (respuesta[0] == 'ProLabModifico') {
            ModificarFila(respuesta[1], respuesta[2], respuesta[3]);
            //AgregarItem(respuesta[2],respuesta[5]);
        }
        if (respuesta[0] == 'ProLabEliminar') {
            //alert(respuesta[2]);
            EliminarFila(respuesta[1], respuesta[2]);
            //AgregarItem(respuesta[2],respuesta[5]);
        }
        if (respuesta[0] == 'ExamenGuardarRx') {
            AgregarFila(respuesta[1], respuesta[2]);
        }
         
        if (respuesta[0] == 'ExamenModificoRx') {
            ModificarFila(respuesta[1], respuesta[2], respuesta[3]);
            //AgregarItem(respuesta[2],respuesta[5]);
        }
       
        if (respuesta[0] == 'ExamenEliminarRx') {
            //alert(respuesta[2]);
            EliminarFila(respuesta[1], respuesta[2]);
            //AgregarItem(respuesta[2],respuesta[5]);
        }

        if (respuesta[0] == 'InactivarExamenRx') {
            InactivarFila(respuesta[1], respuesta[2]);
            //AgregarItem(respuesta[2],respuesta[5]);
        }
        if (respuesta[0] == 'ActivarExamenRx') {
            ActivarFila(respuesta[1], respuesta[2]);
            //AgregarItem(respuesta[2],respuesta[5]);
        }
        if (respuesta[0] == 'EntidadGuardarRx') {
            AgregarFila(respuesta[1], respuesta[2]);
        }
        if (respuesta[0] == 'EntidadModificoRx') {
            ModificarFila(respuesta[1], respuesta[2], respuesta[3]);
            //AgregarItem(respuesta[2],respuesta[5]);
        }
        if (respuesta[0] == 'EntidadEliminarRx') {
            //alert(respuesta[2]);
            EliminarFila(respuesta[1], respuesta[2]);
            //AgregarItem(respuesta[2],respuesta[5]);
        }
        if (respuesta[0] == 'InactivarEntidadRx') {
            InactivarFila(respuesta[1], respuesta[2]);
            //AgregarItem(respuesta[2],respuesta[5]);
        }
        if (respuesta[0] == 'ActivarEntidadRx') {
            ActivarFila(respuesta[1], respuesta[2]);
            //AgregarItem(respuesta[2],respuesta[5]);
        }
        if (respuesta[0] == 'EquipoGuardarRx') {
            AgregarFila(respuesta[1], respuesta[2]);
        }
        if (respuesta[0] == 'EquipoModificoRx') {
            ModificarFila(respuesta[1], respuesta[2], respuesta[3]);
            //AgregarItem(respuesta[2],respuesta[5]);
        }
        if (respuesta[0] == 'EquipoEliminarRx') {
            //alert(respuesta[2]);
            EliminarFila(respuesta[1], respuesta[2]);
            //AgregarItem(respuesta[2],respuesta[5]);
        }
        if (respuesta[0] == 'InactivarEquipoRx') {
            InactivarFila(respuesta[1], respuesta[2]);
            //AgregarItem(respuesta[2],respuesta[5]);
        }
        if (respuesta[0] == 'ActivarEquipoRx') {
            ActivarFila(respuesta[1], respuesta[2]);
            //AgregarItem(respuesta[2],respuesta[5]);
        }
        if (respuesta[0] == 'ProLabGuardarRx') {
            AgregarFila(respuesta[1], respuesta[2]);
        }
        if (respuesta[0] == 'ProLabModificoRx') {
            ModificarFila(respuesta[1], respuesta[2], respuesta[3]);
            //AgregarItem(respuesta[2],respuesta[5]);
        }
        if (respuesta[0] == 'ProLabEliminarRx') {
            //alert(respuesta[2]);
            EliminarFila(respuesta[1], respuesta[2]);
            //AgregarItem(respuesta[2],respuesta[5]);
        }
        if (respuesta[0] == 'ELiminarPacienteSignos') {
            //alert(respuesta[2]);
            EliminarFila(respuesta[1], respuesta[2]);
            //AgregarItem(respuesta[2],respuesta[5]);
        }
        if (respuesta[0] == 'NuevaFacturaConsulta') {
            CargarTomasHoy();
        }
        if (respuesta[0] == 'SignoModifico') {
            ModificarFila(respuesta[1], respuesta[2], respuesta[3]);
            //AgregarItem(respuesta[2],respuesta[5]);
        }


        if (respuesta[0] == 'ExamenGuardarEco') {
            AgregarFila(respuesta[1], respuesta[2]);
        }
        if (respuesta[0] == 'ExamenModificoEco') {
            ModificarFila(respuesta[1], respuesta[2], respuesta[3]);
            //AgregarItem(respuesta[2],respuesta[5]);
        }
        if (respuesta[0] == 'ExamenEliminarEco') {
            //alert(respuesta[2]);
            EliminarFila(respuesta[1], respuesta[2]);
            //AgregarItem(respuesta[2],respuesta[5]);
        }
         if (respuesta[0] == 'InactivarExamenEco') {
            InactivarFila(respuesta[1], respuesta[2]);
            //AgregarItem(respuesta[2],respuesta[5]);
        }
        if (respuesta[0] == 'ActivarExamenEco') {
            ActivarFila(respuesta[1], respuesta[2]);
            //AgregarItem(respuesta[2],respuesta[5]);
        }


        if (respuesta[0] == 'EntidadGuardarEco') {
            AgregarFila(respuesta[1], respuesta[2]);
        }
        if (respuesta[0] == 'EntidadModificoEco') {
            ModificarFila(respuesta[1], respuesta[2], respuesta[3]);
            //AgregarItem(respuesta[2],respuesta[5]);
        }
        if (respuesta[0] == 'EntidadEliminarEco') {
            //alert(respuesta[2]);
            EliminarFila(respuesta[1], respuesta[2]);
            //AgregarItem(respuesta[2],respuesta[5]);
        }
        if (respuesta[0] == 'InactivarEntidadEco') {
            InactivarFila(respuesta[1], respuesta[2]);
            //AgregarItem(respuesta[2],respuesta[5]);
        }
        if (respuesta[0] == 'ActivarEntidadEco') {
            ActivarFila(respuesta[1], respuesta[2]);
            //AgregarItem(respuesta[2],respuesta[5]);
        }


        if (respuesta[0] == 'EquipoGuardarEco') {
            AgregarFila(respuesta[1], respuesta[2]);
        }
        if (respuesta[0] == 'EquipoModificoEco') {
            ModificarFila(respuesta[1], respuesta[2], respuesta[3]);
            //AgregarItem(respuesta[2],respuesta[5]);
        }
        if (respuesta[0] == 'EquipoEliminarEco') {
            //alert(respuesta[2]);
            EliminarFila(respuesta[1], respuesta[2]);
            //AgregarItem(respuesta[2],respuesta[5]);
        }
        if (respuesta[0] == 'InactivarEquipoEco') {
            InactivarFila(respuesta[1], respuesta[2]);
            //AgregarItem(respuesta[2],respuesta[5]);
        }
        if (respuesta[0] == 'ActivarEquipoEco') {
            ActivarFila(respuesta[1], respuesta[2]);
            //AgregarItem(respuesta[2],respuesta[5]);
        }

        if (respuesta[0] == 'ProLabGuardarEco') {
            AgregarFila(respuesta[1], respuesta[2]);
        }
        if (respuesta[0] == 'ProLabModificoEco') {
            ModificarFila(respuesta[1], respuesta[2], respuesta[3]);
            //AgregarItem(respuesta[2],respuesta[5]);
        }
        if (respuesta[0] == 'ProLabEliminarEco') {
            //alert(respuesta[2]);
            EliminarFila(respuesta[1], respuesta[2]);
            //AgregarItem(respuesta[2],respuesta[5]);
        }


        if (respuesta[0] == 'ExamenGuardarTomo') {
            AgregarFila(respuesta[1], respuesta[2]);
        }
        if (respuesta[0] == 'ExamenModificoTomo') {
            ModificarFila(respuesta[1], respuesta[2], respuesta[3]);
            //AgregarItem(respuesta[2],respuesta[5]);
        }
        if (respuesta[0] == 'ExamenEliminarTomo') {
            //alert(respuesta[2]);
            EliminarFila(respuesta[1], respuesta[2]);
            //AgregarItem(respuesta[2],respuesta[5]);
        }
         if (respuesta[0] == 'InactivarExamenTomo') {
            InactivarFila(respuesta[1], respuesta[2]);
            //AgregarItem(respuesta[2],respuesta[5]);
        }
        if (respuesta[0] == 'ActivarExamenTomo') {
            ActivarFila(respuesta[1], respuesta[2]);
            //AgregarItem(respuesta[2],respuesta[5]);
        }



        if (respuesta[0] == 'EntidadGuardarTomo') {
            AgregarFila(respuesta[1], respuesta[2]);
        }
        if (respuesta[0] == 'EntidadModificoTomo') {
            ModificarFila(respuesta[1], respuesta[2], respuesta[3]);
            //AgregarItem(respuesta[2],respuesta[5]);
        }
        if (respuesta[0] == 'EntidadEliminarTomo') {
            //alert(respuesta[2]);
            EliminarFila(respuesta[1], respuesta[2]);
            //AgregarItem(respuesta[2],respuesta[5]);
        }
         if (respuesta[0] == 'InactivarEntidadTomo') {
            InactivarFila(respuesta[1], respuesta[2]);
            //AgregarItem(respuesta[2],respuesta[5]);
        }
        if (respuesta[0] == 'ActivarEntidadTomo') {
            ActivarFila(respuesta[1], respuesta[2]);
            //AgregarItem(respuesta[2],respuesta[5]);
        }


        if (respuesta[0] == 'EquipoGuardarTomo') {
            AgregarFila(respuesta[1], respuesta[2]);
        }
        if (respuesta[0] == 'EquipoModificoTomo') {
            ModificarFila(respuesta[1], respuesta[2], respuesta[3]);
            //AgregarItem(respuesta[2],respuesta[5]);
        }
        if (respuesta[0] == 'EquipoEliminarTomo') {
            //alert(respuesta[2]);
            EliminarFila(respuesta[1], respuesta[2]);
            //AgregarItem(respuesta[2],respuesta[5]);
        }
         if (respuesta[0] == 'InactivarEquipoTomo') {
            InactivarFila(respuesta[1], respuesta[2]);
            //AgregarItem(respuesta[2],respuesta[5]);
        }
        if (respuesta[0] == 'ActivarEquipoTomo') {
            ActivarFila(respuesta[1], respuesta[2]);
            //AgregarItem(respuesta[2],respuesta[5]);
        }


        if (respuesta[0] == 'ProLabGuardarTomo') {
            AgregarFila(respuesta[1], respuesta[2]);
        }
        if (respuesta[0] == 'ProLabModificoTomo') {
            ModificarFila(respuesta[1], respuesta[2], respuesta[3]);
            //AgregarItem(respuesta[2],respuesta[5]);
        }
        if (respuesta[0] == 'ProLabEliminarTomo') {
            //alert(respuesta[2]);
            EliminarFila(respuesta[1], respuesta[2]);
            //AgregarItem(respuesta[2],respuesta[5]);
        }
        if (respuesta[0] == 'AlergiaGuardar') {
            AgregarFila(respuesta[1], respuesta[2]);
        }





        if (respuesta[0] == 'GuardarProveedor') {
            AgregarFila(respuesta[1], respuesta[2]);
        }
        if (respuesta[0] == 'ModificarProveedor') {
            ModificarFila(respuesta[1], respuesta[2], respuesta[3]);
            //AgregarItem(respuesta[2],respuesta[5]);
        }
        if (respuesta[0] == 'EliminaProvedor') {
            //alert(respuesta[2]);
            EliminarFila(respuesta[1], respuesta[2]);
            //AgregarItem(respuesta[2],respuesta[5]);
        }
         if (respuesta[0] == 'InactivarProveedor') {
            InactivarFila(respuesta[1], respuesta[2]);
            //AgregarItem(respuesta[2],respuesta[5]);
        }
        if (respuesta[0] == 'ActivarProveedor') {
            ActivarFila(respuesta[1], respuesta[2]);
            //AgregarItem(respuesta[2],respuesta[5]);
        }

        ///////////////////////////////////////////////////////////
        if (respuesta[0] == 'GuardarTipoServicio') {
            AgregarFila(respuesta[1], respuesta[2]);
        }
        if (respuesta[0] == 'ModificaTipoServicio') {
            ModificarFila(respuesta[1], respuesta[2], respuesta[3]);
            //AgregarItem(respuesta[2],respuesta[5]);
        }
        if (respuesta[0] == 'EliminaTipoServicio') {
            //alert(respuesta[2]);
            EliminarFila(respuesta[1], respuesta[2]);
            //AgregarItem(respuesta[2],respuesta[5]);
        }

         if (respuesta[0] == 'Inactivar') {
            InactivarFila(respuesta[1], respuesta[2]);
            //AgregarItem(respuesta[2],respuesta[5]);
        }
        if (respuesta[0] == 'Activar') {
            ActivarFila(respuesta[1], respuesta[2]);
            //AgregarItem(respuesta[2],respuesta[5]);
        }

    /////////////////////////////////
         if (respuesta[0] == 'InactivarEsta') {
            InactivarFila(respuesta[1], respuesta[2]);
            //AgregarItem(respuesta[2],respuesta[5]);
        }
        if (respuesta[0] == 'ActivarEsta') {
            ActivarFila(respuesta[1], respuesta[2]);
            //AgregarItem(respuesta[2],respuesta[5]);
        }


        //////////////////////////////////////////////////////////


 /////////////////////////////////
         if (respuesta[0] == 'InactivarAmbu') {
            InactivarFila(respuesta[1], respuesta[2]);
            //AgregarItem(respuesta[2],respuesta[5]);
        }
        if (respuesta[0] == 'ActivarAmbu') {
            ActivarFila(respuesta[1], respuesta[2]);
            //AgregarItem(respuesta[2],respuesta[5]);
        }


        //////////////////////////////////////////////////////////


/////////////////////////////////
         if (respuesta[0] == 'InactivarEspe') {
            InactivarFila(respuesta[1], respuesta[2]);
            //AgregarItem(respuesta[2],respuesta[5]);
        }
        if (respuesta[0] == 'ActivarEspe') {
            ActivarFila(respuesta[1], respuesta[2]);
            //AgregarItem(respuesta[2],respuesta[5]);
        }


        //////////////////////////////////////////////////////////





         if (respuesta[0] == 'GuardarTarjeta') {
            AgregarFila(respuesta[1], respuesta[2]);
        }
        if (respuesta[0] == 'ModificaTarjeta') {
            ModificarFila(respuesta[1], respuesta[2], respuesta[3]);
            //AgregarItem(respuesta[2],respuesta[5]);
        }
        if (respuesta[0] == 'EliminaTarjeta') {
            //alert(respuesta[2]);
            EliminarFila(respuesta[1], respuesta[2]);
            //AgregarItem(respuesta[2],respuesta[5]);
        }


        if (respuesta[0] == 'GuardarBanco') {
            AgregarFila(respuesta[1], respuesta[2]);
        }
        if (respuesta[0] == 'ModificaBanco') {
            ModificarFila(respuesta[1], respuesta[2], respuesta[3]);
            //AgregarItem(respuesta[2],respuesta[5]);
        }
        if (respuesta[0] == 'EliminaBanco') {
            //alert(respuesta[2]);
            EliminarFila(respuesta[1], respuesta[2]);
            //AgregarItem(respuesta[2],respuesta[5]);
        }


        ////////////////////REFERENCIA DOCTOR//////////////////////
         
         if (respuesta[0] == 'GuardarRefe') {
            AgregarFila(respuesta[1], respuesta[2]);
         }


         if (respuesta[0] == 'ModificaRefe') {
             ModificarFila(respuesta[1], respuesta[2], respuesta[3]);
         }


          if (respuesta[0] == 'EliminaRefe') {
            EliminarFila(respuesta[1], respuesta[2]);
         }
        
        //////////////////////////////////////////////////////////
        




        if (respuesta[0] == 'GuardarAnticipo') {
            AgregarFila(respuesta[1], respuesta[2]);
        }
        /*if (respuesta[0] == 'ModificaRefe') {
            ModificarFila(respuesta[1], respuesta[2], respuesta[3]);
            //AgregarItem(respuesta[2],respuesta[5]);
        }*/
        if (respuesta[0] == 'EliminaAnticipo') {
            //alert(respuesta[2]);
            EliminarFila(respuesta[1], respuesta[2]);
            //AgregarItem(respuesta[2],respuesta[5]);
        }

        if (respuesta[0] == 'EnviarMensaje') {
            //console.log(respuesta);
            
            if($('#CambiarContra').attr("IdEmpleado") == respuesta[1][0]){
                CargarMensajesPorUsuario(respuesta[1][1],23);
            }
            if($('#CambiarContra').attr("IdEmpleado") == respuesta[1][1]){
                CargarMensajesPorUsuario(respuesta[1][0],23);

                
                    AbiertaCapaContactos=true;
                    $('#UsuarioChat'+respuesta[1][0]).click();
                
            }
            
        }

        if (respuesta[0] == 'CargarNuevaConsulta') {
            
            CargarPacientesSinSignoVitales(respuesta[1]);
            
        }
        if (respuesta[0] == 'CargarPacientesConSignoVitales') {
            
            CargarPacientesConSignoVitales(respuesta[1]);
            
        }
        if (respuesta[0] == 'ActualizarSecuencialRealTime') {
            
            ActualizarSecuencialRealTime(respuesta[1]);
        }
          
        if (respuesta[0] == 'CerrarSesion') {
            
            CerrarSesion(respuesta[1]);
            
        }



    } catch (error) {
        //console.log(error);
    }
}

function send(datos) {
        try{
            socket.send(datos);
        }catch (error) {
            console.log(error);
        }
        
}


new function() {
    
    function AbrirSocket(){
    
        socket = new WebSocket(host);
        socket.onopen = onOpen;
        socket.onclose = onClose;
        socket.onmessage = onMessage;
        socket.onerror = onError;
    
    
    }
    
    var onOpen = function() {};
    var onClose = function() {
            socket = null;
    };
    var onMessage = function(event) {
            var data = event.data;
            RealTime(data);
    };
    var onError = function(event) {
            console.log(event.data);
    }


        WebSocketClient = {
            init: function() {
                
                    AbrirSocket();
            }
        };
    }

$(function() {
    WebSocketClient.init();
});