var tablaPacientesRx = null;
var tablapacientesListosRx = null;
var tablaProcedimientosRx = null;
var ProcedimientoGuardar = 0;
var ConsultaGuardar = 0;
var PacienteGuardar = 0;
var UsuarioRegistro = "";
var UsuarioValido = "";
var FechaRegistro = 0;
var FechaValido = 0;
var idOrden = 0;
var idConsultaOrden = 0;
var nombreProcedimientoSeleccionado = "";
var fechaEnviaExamen = "";
var medicoEnviaExamen = "";
var fechaAtencion = "";
$(".textarea").wysihtml5();
var editorObj = $(".textarea").data('wysihtml5');
var editor = editorObj.editor;

function ConstruirTablas() {

    tablaPacientesRx = $('#datatablePacienteRx').DataTable({
        'paging': false,
        'lengthChange': false,
        'searching': true,
        'info': false,
        'autoWidth': false,
        scrollY: 500,
        keys: true,

    });
    tablapacientesListosRx = $('#datatablePacientesListoRx').DataTable({
        keys: true
    });

    tablaProcedimientosRx = $('#datatableProcedimientoPacienteRx').DataTable({
        'paging': false,
        'lengthChange': false,
        'searching': false,
        'info': false,
        'autoWidth': false,
        scrollY: 230,
        keys: true,

    });

    tablaPlantillaRx = $('#datatablePlantillasRx').DataTable({
        'paging': false,
        'lengthChange': false,
        'searching': false,
        'info': false,
        'autoWidth': false,
        scrollY: 230,
        keys: true,
        "columnDefs": [{
            "targets": [1],
            "visible": false,
            "searchable": false
        }]

    });

    CargarPacientesRx();


}

function CargarPacientesRx() {

    tablaPacientesRx.clear().draw();
    var fechaDesde = $('input#fecha_consultaDesdeRx').val();
    var fechaHasta = $('input#fecha_consultaHastaRx').val();

    var fecha1 = new Date();


    var d = fecha1.getDate() - 1,
        m = fecha1.getMonth(),
        y = fecha1.getFullYear();
    var hoy = new Date(y, m, d);

    $.ajax({
        method: "POST",
        url: "Ajax/Aj_Rx.php",
        data: {
            Requerimiento: "CargarPacientesRx",
            FechaDesde: fechaDesde,
            FechaHasta: fechaHasta
        },
        dataType: 'JSON',
    }).done(function (respuesta) {
        if (respuesta[0] == false) {
            swal("Esculapio!", "OCURRIO UN ERROR.", "error");
            return;
        }
        var pacientes = new Array();
        var procedimientos = "";
        $.each(respuesta, function (i, iten) {

            var datos = respuesta[i][0];
            if (pacientes.length == 0) {
                pacientes.push(datos);
            } else {
                var confirma = true;
                $.each(pacientes, function (p, itenp) {
                    if (pacientes[p] == datos) {
                        confirma = false;
                    }
                });
                if (confirma) {
                    pacientes.push(datos);
                }
            }


        });
        $.each(pacientes, function (p, itenp) {

            var fecha2 = new Date(pacientes[p][2]);
            fecha2.setHours(0, 0, 0);

            var boton = '';
            if (fecha2.toDateString() === hoy.toDateString()) {
                boton = '<button type="submit" id="GuardarRecepcion" class="btn btn-success"><i class="fa fa-floppy-o" aria-hidden="true"></i> Guardar</button>';
            }
            var fila = [];
            var boton = '';
            var procedimientos = "";

            $.each(respuesta, function (i, iten) {
                if (respuesta[i][0] == pacientes[p]) {

                    var fecha2 = new Date(iten[10]);
                    fecha2.setHours(0, 0, 0);


                    if (fecha2.toDateString() === hoy.toDateString()) {
                        boton = '<button idConsulta="' + respuesta[i][0] + '" type="submit" id="GuardarRecepcionRx" class="btn btn-success"><i class="fa fa-floppy-o" aria-hidden="true"></i> Guardar</button>';
                    }
                    procedimientos = procedimientos + iten[11] + ";";
                    fila = [iten[10], iten[1] + " " + iten[2], iten[3], iten[6] + " " + iten[5], procedimientos, boton];
                }

            });
            tablaPacientesRx.row.add(fila).draw(true);

        });


    }).fail(function (jqXHR, textStatus, errorThrown) {
        console.log(errorThrown);
    });
}


function GuardarRecepcionRx(idConsulta) {
    $.ajax({
        async: false,
        method: "POST",
        url: "Ajax/Aj_Rx.php",
        data: {
            Requerimiento: "GuardarRecepcionRx",
            Id: idConsulta
        },
        dataType: 'JSON',
    }).done(function (respuesta) {
        if (respuesta[0] == true) {
            swal("Esculapio!", "Guardado Con Exito..!", "success");
            CargarPacientesRx();
            CargarPacientesListosRx();
        }
        if (respuesta[0] == false) {
            swal("Esculapio!", "No Se Pudo Guardar..!, Se cargara la pantalla nuevamente para solucionar el problema.", "error");
        }
    }).fail(function (jqXHR, textStatus, errorThrown) {
        console.log(errorThrown);
    });
}

$(".body").on("click", "button#GuardarRecepcionRx", function (e) {



    swal({
        title: "Esculapio",
        text: "Seguro Que Desea Guardar?",
        icon: "info",
        buttons: true,
        dangerMode: false,
    }).then((confirma) => {
        if (confirma) {
            GuardarRecepcionRx($(this).attr('idConsulta'));
        } else {

        }
    });

});

ConstruirTablas();
////////////////////////////////////////////  LLENAR INFORME   ////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function CargarPacientesListosRx() {


    tablapacientesListosRx.clear().draw();
    var fechaDesde = $('input#fecha_consultaDesdeRxInforme').val();
    var fechaHasta = $('input#fecha_consultaHastaRxInforme').val();

    $.ajax({
        method: "POST",
        url: "Ajax/Aj_Rx.php",
        data: {
            Requerimiento: "CargarPacientesListosRx",
            FechaDesde: fechaDesde,
            FechaHasta: fechaHasta
        },
        dataType: 'JSON',
    }).done(function (respuesta) {
        if (respuesta[0] == false) {
            swal("Esculapio!", "OCURRIO UN ERROR.", "error");
            return;
        }

        $.each(respuesta, function (i, iten) {

            var id = '<span fecha="' + respuesta[i][7] + '" idOrden="' + respuesta[i][9] + '" idConsulta="' + iten[0] + '">' + iten[1] + '</span>';

            var boton = '<button idEstado=' + respuesta[i][8] + ' type="button" class="btn btn-block btn-danger">Pendiente</button>';
            if (respuesta[i][8] == 14) {
                boton = '<button idEstado=' + respuesta[i][8] + ' type="button" class="btn btn-block btn-primary">Pendiente Validar</button>';
            }
            if (respuesta[i][8] == 15) {
                boton = '<button idEstado=' + respuesta[i][8] + ' type="button" class="btn btn-block btn-success">Validado</button>';
            }

            var fila = [id, iten[2], iten[3], iten[4], iten[5], boton, iten[10]];
            tablapacientesListosRx.row.add(fila).draw(true);

        });


    }).fail(function (jqXHR, textStatus, errorThrown) {
        console.log(errorThrown);
    });
}

$(".body").on("click", "button#ConsultarReccioncion", function (e) {
    CargarPacientesRx();
});

$(".body").on("click", "button#ConsultarPacientesReceptadosRx", function (e) {
    CargarPacientesListosRx();
});

function CargarProcedimientosPacientesRx(idConsulta) {

    var confirma = true;
    tablaProcedimientosRx.clear().draw();

    $.ajax({
        method: "POST",
        url: "Ajax/Aj_Rx.php",
        data: {
            Requerimiento: "CargarProcedimientosPacientesRx",
            Consulta: idConsulta
        },
        dataType: 'JSON',
    }).done(function (respuesta) {
        if (respuesta[0] == false) {
            swal("Esculapio!", "OCURRIO UN ERROR.", "error");
            return;
        }

        $.each(respuesta, function (i, iten) {

            var guardado = '<i class="fa fa-circle-o btn btn-default" aria-hidden="true"></i>';
            var validado = '<i class="fa fa-circle-o btn btn-default" aria-hidden="true"></i>';
            if (respuesta[i][4] == 14) {
                confirma = false;
                guardado = '<i class="fa fa-check-circle-o btn btn-primary" aria-hidden="true"></i>';
            }
            if (respuesta[i][4] == 15) {
                guardado = '<i class="fa fa-check-circle-o btn btn-primary" aria-hidden="true"></i>';
                validado = '<i class="fa fa-check-circle-o btn btn-success" aria-hidden="true"></i>';
            }
            var campos = ["<span idProceRx=" + respuesta[i][1] + ">" + respuesta[i][2] + "</span>", guardado, validado];
            tablaProcedimientosRx.row.add(campos).draw(false);

        });
        if (confirma) {
            ActualizarEstadoConsulta(idConsultaOrden, "id_estado_orden_rx", idConsulta);
        }


    }).fail(function (jqXHR, textStatus, errorThrown) {
        console.log(errorThrown);
    });
}

$('.body table#datatablePacientesListoRx tbody').on('dblclick', 'tr', function (evt) {
    editor.setValue("");
    var cerrar = $('.body').find('button.close');
    var id = $('.body').find('label#IdPacienteResultado');
    var cedula = $('.body').find('label#CedulaPacienteResultado');
    var apellido = $('.body').find('label#ApellidoPacienteResultado');
    var nombre = $('.body').find('label#NombrePacienteResultado');
    var correo = $('.body').find('label#CorreoPacienteResultado');
    var fila = $(this);
    var idConsulta = fila.find('td').eq(0).find('span').attr('idConsulta');
    idOrden = fila.find('td').eq(0).find('span').attr('idOrden');
    $('#textArea').html('<label  id="medicoExamen">MEDICO QUE ENVIO EXAMEN: </label><br><label  id="fechaExamen">FECHA EN QUE ENVIO: </label><br><label  for="OBSERVACIONES">OBSERVACIONES: </label><br>');
    $('.body').find('label#EdadPacienteResultado').html(calcularEdad(fila.find('td').eq(0).find('span').attr('fecha')));

    id.text(fila.find('td').eq(0).find('span').html());
    nombre.text(fila.find('td').eq(3).html());
    cedula.text(fila.find('td').eq(1).html());
    apellido.text(fila.find('td').eq(2).html());
    correo.text(fila.find('td').eq(4).html());
    var paciente = id.text();
    cerrar.trigger('click');
    CargarProcedimientosPacientesRx(idConsulta);
    CargarMotivoExamen(idOrden);
    PacienteGuardar = paciente;
    ConsultaGuardar = idConsulta;
    fechaAtencion = tablapacientesListosRx.row($(this)).data()[6];
    CargarHistoricoRx(PacienteGuardar);
});
function CargarHistoricoRx(idPaciente) {
    $.ajax({
        method: "POST",
        url: "Ajax/Aj_Agenda.php",
        data: {
            Requerimiento: "CargarHistoricoRx",
            IdPaciente: idPaciente
        },
        dataType: 'JSON',
    }).done(function (respuesta) {
        if (respuesta[0] == false) {
            swal("Esculapio!", "Error!", "error");
            return;
        }
        try {
            tablaHistoricoRx.destroy();
        } catch (error) { }
        var filas = [];
        $.each(respuesta, function (i, value) {
            var boton = '<button plantilla="' + respuesta[i][1] + '" type="submit"  class="btn btn-success " id="verInformeAgenda"> <i class="fa fa-save" aria-hidden="true"></i> Ver Informe</button> ';
            var dataSet = [respuesta[i][0], respuesta[i][1], respuesta[i][2]];
            //tablaHistoricoRx.row.add(dataSet).draw(false);
            filas[i] = dataSet;
        });

        tablaHistoricoRx = $('#HistorioRxAgenda').DataTable({
            scrollX: true,
            scrollY: 250,
            autoWidth: true,
            info: false,
            keys: true,
            paginate: false,
            data: filas,
            autoWidth: true
        });

    }).fail(function (jqXHR, textStatus, errorThrown) {
        console.log(errorThrown)
        //location.reload();
    });
}
function CargarMotivoExamen(idOrden) {
    idConsultaOrden = 0;
    $.ajax({
        method: "POST",
        url: "Ajax/Aj_Orden.php",
        data: {
            Requerimiento: "CargarMotivoExamen",

            Orden: idOrden
        },
        dataType: 'JSON',
    }).done(function (respuesta) {
        $.each(respuesta, function (i, iten) {

            idConsultaOrden = respuesta[i][1];
            $("#textArea").append(respuesta[i][0]);
            fechaEnviaExamen = respuesta[i][3].toUpperCase();
            medicoEnviaExamen = respuesta[i][2].toUpperCase();

            $("#medicoExamen").html("ORDENO : " + medicoEnviaExamen);
            $("#fechaExamen").html("FECHA : " + fechaEnviaExamen);

        });
    });
}


function ActualizarEstadoConsulta(idConsulta, tipo, estado) {
    $.ajax({
        method: "POST",
        url: "Ajax/Aj_Consulta.php",
        data: {
            Requerimiento: "ActualizarEstadoConsulta",
            Consulta: idConsulta,
            Tipo: tipo,
            Estado: estado
        },
        dataType: 'JSON',
    });
}

function calcularEdad(fecha) {
    // Si la fecha es correcta, calculamos la edad

    if (typeof fecha != "string" && fecha && esNumero(fecha.getTime())) {
        fecha = formatDate(fecha, "yyyy-MM-dd");
    }

    var values = fecha.split("-");
    var dia = values[2];
    var mes = values[1];
    var ano = values[0];

    // cogemos los valores actuales
    var fecha_hoy = new Date();
    var ahora_ano = fecha_hoy.getYear();
    var ahora_mes = fecha_hoy.getMonth() + 1;
    var ahora_dia = fecha_hoy.getDate();

    // realizamos el calculo
    var edad = (ahora_ano + 1900) - ano;
    if (ahora_mes < mes) {
        edad--;
    }
    if ((mes == ahora_mes) && (ahora_dia < dia)) {
        edad--;
    }
    if (edad > 1900) {
        edad -= 1900;
    }

    // calculamos los meses
    var meses = 0;

    if (ahora_mes > mes && dia > ahora_dia)
        meses = ahora_mes - mes - 1;
    else if (ahora_mes > mes)
        meses = ahora_mes - mes
    if (ahora_mes < mes && dia < ahora_dia)
        meses = 12 - (mes - ahora_mes);
    else if (ahora_mes < mes)
        meses = 12 - (mes - ahora_mes + 1);
    if (ahora_mes == mes && dia > ahora_dia)
        meses = 11;

    // calculamos los dias
    var dias = 0;
    if (ahora_dia > dia)
        dias = ahora_dia - dia;
    if (ahora_dia < dia) {
        ultimoDiaMes = new Date(ahora_ano, ahora_mes - 1, 0);
        dias = ultimoDiaMes.getDate() - (dia - ahora_dia);
    }

    return edad + " años, " + meses + " meses y " + dias + " días";
}

/*function calcularEdad(fecha) {
    var hoy = new Date();
    var cumpleanos = new Date(fecha);
    var edad = hoy.getFullYear() - cumpleanos.getFullYear();
    var m = hoy.getMonth() - cumpleanos.getMonth();
    if (m < 0 || (m === 0 && hoy.getDate() < cumpleanos.getDate())) {
        edad--;
    }
    if(m<=0){
        return edad+" Años";
    }else{
        return edad+" Años "+m+" Meses";    
    }
    
}*/

function CargarPlantillaRx(idProceRx, nombre) {
    editor.setValue("");
    ProcedimientoGuardar = idProceRx;
    $('button#GuardarResultadoRx').prop('disabled', true);
    $.ajax({
        method: "POST",
        url: "Ajax/Aj_PlantillaRx.php",
        data: {
            Requerimiento: "CargarPlantillaRx2",
            Procedimiento: idProceRx,
            Nombre: nombre
        },
        dataType: 'JSON',
    }).done(function (respuesta) {
        if (respuesta[0] == false) {
            swal("Esculapio!", "Ocurrio un error.", "error");
            // location.reload();
            return;
        }
        editor.setValue(respuesta[0][0]);
        $('button#GuardarResultadoRx').prop('disabled', false);

    }).fail(function (jqXHR, textStatus, errorThrown) {
        console.log(errorThrown);
        //location.reload();
    });
}

$('.body table#datatableProcedimientoPacienteRx tbody').on('dblclick', 'tr', function (evt) {
    var IdRx = $(this).find('td').eq(0).find('span').attr('idProceRx');
    var g = $(this).find('td').eq(1).find('i.fa-check-circle-o');
    var v = $(this).find('td').eq(2).find('i.fa-check-circle-o');
    var nombreRx = $(this).find('td').eq(0).find('span').html();

    var nombreProcedimientoSeleccionado = nombreRx;
    $('.body').find('label#nombreRx').text(nombreRx);
    if (v.length > 0) {
        CargarResultadoRx(IdRx, ConsultaGuardar);
        $('button#GuardarResultadoRx').prop('disabled', true);
        $('button#ValidarResultadoRx').prop('disabled', true);
        $('button#imprimirDatos').prop('disabled', false);
        $('button#enviarPorCorreo').prop('disabled', false);
        $('button#DesvalidarEco').prop('disabled', false);
        //$('.textarea').data('wysihtml5').editor.composer.disable();
        return;
    }
    if (g.length > 0) {
        CargarResultadoRx($(this).find('td').eq(0).find('span').attr('idProceRx'), ConsultaGuardar);
        $('button#GuardarResultadoRx').prop('disabled', false);
        $('button#ValidarResultadoRx').prop('disabled', false);
        $('button#DesvalidarEco').prop('disabled', true);
        return;
    }

    CargarPlantillaRx1($(this).find('td').eq(0).find('span').attr('idProceRx'));

    $('#modal-plantillasRx').modal();
    //CargarPlantillaRx($(this).find('td').eq(0).find('span').attr('idProceRx'));

});

$('.body table#datatablePlantillasRx tbody').on('dblclick', 'tr', function (evt) {
    var cerrar = $('.body').find('button.close');
    var g = $(this).find('td').eq(1).find('i.fa-check-circle-o');
    var v = $(this).find('td').eq(2).find('i.fa-check-circle-o');
    var NombreRx = tablaPlantillaRx.row($(this)).data()[0];
    var IdRx = tablaPlantillaRx.row($(this)).data()[1];
    if (v.length > 0) {
        CargarResultadoRx(IdRx, ConsultaGuardar);
        $('button#GuardarResultadoRx').prop('disabled', true);
        $('button#ValidarResultadoRx').prop('disabled', true);
        $('button#imprimirDatos').prop('disabled', false);
        $('button#enviarPorCorreo').prop('disabled', false);
        return;
    }
    if (g.length > 0) {
        CargarResultadoRx(IdRx, ConsultaGuardar);
        $('button#GuardarResultadoRx').prop('disabled', false);
        $('button#ValidarResultadoRx').prop('disabled', false);
        return;
    }
    cerrar.trigger('click');
    CargarPlantillaRx(IdRx, NombreRx);
});

function GuardarResultadoRx(idProceRx, idConsulta, plantilla, idPaciente) {

    $.ajax({
        method: "POST",
        url: "Ajax/Aj_PlantillaRx.php",
        data: {
            Requerimiento: "GuardarResultadoRx",
            Procedimiento: idProceRx,
            Plantilla: plantilla,
            Consulta: idConsulta,
            Paciente: idPaciente
        },
        dataType: 'JSON',
    }).done(function (respuesta) {
        if (respuesta[0] == true) {
            swal("Esculapio!", "Resultados Guardados.!", "success");
            ActualizarEstadoProcedimientoRxFactura(idProceRx, idConsulta);
            CargarPacientesListosRx();
            $('button#GuardarResultadoRx').prop('disabled', true);
            return;
        }
        if (respuesta[0] == false) {
            swal("Esculapio!", "Ocurrio un error.", "error");
            // location.reload();
            return;
        }
    }).fail(function (jqXHR, textStatus, errorThrown) {
        console.log(errorThrown);
        //location.reload();
    });
}

function ActualizarEstadoProcedimientoRxFactura(idProceRx, idConsulta) {
    $.ajax({
        method: "POST",
        url: "Ajax/Aj_PlantillaRx.php",
        data: {
            Requerimiento: "ActualizarEstadoProcedimientoRxFactura",
            Procedimiento: idProceRx,
            Consulta: idConsulta
        },
        dataType: 'JSON',
    }).done(function (respuesta) {
        CargarProcedimientosPacientesRx(idConsulta);
    });
}

$(".body").on("click", "button#GuardarResultadoRx", function (e) {
    swal({
        title: "Esculapio",
        text: "Seguro Que Desea Guardar?",
        icon: "info",
        buttons: true,
        dangerMode: false,
    }).then((confirma) => {
        if (confirma) {
            GuardarResultadoRx(ProcedimientoGuardar, ConsultaGuardar, $('textarea#plantillarxWord').val(), PacienteGuardar);
        } else {

        }
    });

});

function CargarResultadoRx(idProceRx, idConsulta) {
    editor.setValue("");
    ProcedimientoGuardar = idProceRx;
    $('button#GuardarResultadoRx').prop('disabled', true);
    $('button#ValidarResultadoRx').prop('disabled', true);
    $.ajax({
        method: "POST",
        url: "Ajax/Aj_PlantillaRx.php",
        data: {
            Requerimiento: "CargarResultadoRx",
            Procedimiento: idProceRx,
            Consulta: idConsulta
        },
        dataType: 'JSON',
    }).done(function (respuesta) {
        if (respuesta[0] == false) {
            swal("Esculapio!", "Ocurrio un error.", "error");
            // location.reload();
            return;
        }

        editor.setValue(respuesta[0][0]);
        UsuarioRegistro = respuesta[0][1];
        UsuarioValido = respuesta[0][3];
        FechaRegistro = respuesta[0][2];
        FechaValido = respuesta[0][4];

    }).fail(function (jqXHR, textStatus, errorThrown) {
        console.log(errorThrown);
        //location.reload();
    });
}

function CargarPlantillaRx1(idProceRx) {
    $.ajax({
        method: "POST",
        url: "Ajax/Aj_PlantillaRx.php",
        data: {
            Requerimiento: "CargarPlantillaRx1",
            Procedimiento: idProceRx
        },
        dataType: 'JSON',
    }).done(function (respuesta) {
        if (respuesta[0] == false) {
            swal("Esculapio!", "Ocurrio un error.", "error");
            // location.reload();
            return;
        }
        tablaPlantillaRx.clear().draw();
        //var idProce1=0;
        $.each(respuesta, function (i, value) {
            //idPaciente1 = respuesta[i][8];
            var dataSet = [respuesta[i][1], respuesta[i][0]];
            tablaPlantillaRx.row.add(dataSet).draw(false);
        });
    }).fail(function (jqXHR, textStatus, errorThrown) {
        console.log(errorThrown);
        //location.reload();
    });
}

function ValidarResultadoRx(idProceRx, idConsulta, plantilla) {

    $.ajax({
        method: "POST",
        url: "Ajax/Aj_PlantillaRx.php",
        data: {
            Requerimiento: "ValidarResultadoRx",
            Procedimiento: idProceRx,
            Plantilla: plantilla,
            Consulta: idConsulta
        },
        dataType: 'JSON',
    }).done(function (respuesta) {
        if (respuesta[0] == true) {
            swal("Esculapio!", "Resultados Guardados.!", "success");
            ActualizarEstadoProcedimientoRxValidadoFactura(idProceRx, idConsulta);
            CargarPacientesListosRx();

            $('button#ValidarResultadoRx').prop('disabled', true);
            $('button#GuardarResultadoRx').prop('disabled', true)
            return;
        }
        if (respuesta[0] == false) {
            swal("Esculapio!", "Ocurrio un error.", "error");
            // location.reload();
            return;
        }
    }).fail(function (jqXHR, textStatus, errorThrown) {
        console.log(errorThrown);
        //location.reload();
    });
}

function ActualizarEstadoProcedimientoRxValidadoFactura(idProceRx, idConsulta) {
    $.ajax({
        method: "POST",
        url: "Ajax/Aj_PlantillaRx.php",
        data: {
            Requerimiento: "ActualizarEstadoProcedimientoRxValidadoFactura",
            Procedimiento: idProceRx,
            Consulta: idConsulta
        },
        dataType: 'JSON',
    }).done(function (respuesta) {
        CargarProcedimientosPacientesRx(idConsulta);
    });
}

$(".body").on("click", "button#ValidarResultadoRx", function (e) {
    swal({
        title: "Esculapio",
        text: "Seguro Que Desea Guardar?",
        icon: "info",
        buttons: true,
        dangerMode: false,
    }).then((confirma) => {
        if (confirma) {
            ValidarResultadoRx(ProcedimientoGuardar, ConsultaGuardar, $('textarea#plantillarxWord').val());
        } else {

        }
    });

});

function ObtenerDatosMedico(medico) {
    var referido = ["",""];
    $.ajax({
        async: false,
        method: "POST",
        url: "Ajax/Aj_Empleado.php",
        data: {
            Requerimiento: "ObtenerDatosMedico",
            Medico: medico
        },
        dataType: 'JSON',
    }).done(function (respuesta) {
        $.each(respuesta, function (i, iten) {
            referido = iten;
        });
    });
    return referido;
}

function printTextArea() {
    var reporte = "";
    idOrden = (isNaN(parseFloat(idOrden))) ? 0 : parseFloat(idOrden);
    var gurdado = CargarReporteDiseno(7);
    var medicoEnvio = $('.body').find('label#medicoExamen').text().replace("MEDICO QUE ENVIO EXAMEN:","");;    
    var fechaEnvio = $('.body').find('label#fechaExamen').text().replace("FECHA EN QUE ENVIO:","");;
    if(fechaEnvio != 'FECHA EN QUE ENVIO: '){
        fechaEnvio = fechaEnvio.replace('FECHA : ','');
    }
    if (gurdado.length > 0) {
        var contenido = "<div id='capaprincipal'>" + gurdado[0].replace(/°/g, '"') + "</div>";
        var estilos = gurdado[1].replace(/°/g, '"');

        var datosmedico = ObtenerDatosMedico(UsuarioValido);

        contenido = contenido.replace("{empresa}", $("#razonEmpresa").val());
        contenido = contenido.replace("{ruc}", $("#rucEmpresa").val());
        contenido = contenido.replace("{direccion}", $("#dirEmpresa").val());
        contenido = contenido.replace("{telefono}", $("#telEmpresa").val());
        contenido = contenido.replace("{horarioatencion}", $("#horarioEmpresa").val());
        contenido = contenido.replace("imagenes/producto.png", $("#logo1Empresa").val());
        contenido = contenido.replace("imagenes/medico.png", $("#logo2Empresa").val());
        contenido = contenido.replace("IMAGENES/FIRMAMEDICO.PNG", datosmedico[0]);

        contenido = contenido.replace("{paciente}", $('.body').find('label#ApellidoPacienteResultado').text() + ' ' + $('.body').find('label#NombrePacienteResultado').text() );
        contenido = contenido.replace("{edad}", $('.body').find('label#EdadPacienteResultado').text() );
        contenido = contenido.replace("{fecha}", fechaAtencion.substring(0, 10) );
        contenido = contenido.replace("{hcu}", $('.body').find('label#IdPacienteResultado').text() );
        contenido = contenido.replace("{orden}", idOrden);
        contenido = contenido.replace("{medico}", medicoEnvio.replace('ORDENO :', '') );

        contenido = contenido.replace("{plantilla}", document.getElementById('plantillarxWord').value );

        contenido = contenido.replace("{nombredoctor}",  UsuarioValido.toUpperCase() );
        contenido = contenido.replace("{ceduladoctor}",  datosmedico[1] );
        contenido = contenido.replace("{fechavalidacion}", FechaValido.substring(0, 10));

        reporte = ' <!DOCTYPE html>'
            + '<html>'
            + '<head>'
            + '<title></title>'
            + '<style type="text/css">'
            + '@media print {'
            + 'button {display: none;}'
            + '}'
            + '</style>'
            + '<style type="text/css">'
            + estilos
            + '</style>'
            + '</head>'
            + '<body class="ck-content">'
            + '<button type="button" onClick="window.print()" style="background: pink">IMPRIMIR</button>'
            + contenido
            + '</body>'
            + '</html> ';
    }
    $("#modal-ride #Ride").empty();
    $("#tituloModal").html("IMPRIMIR COMPROBANTES");
    $("#modal-ride #Ride").append('<iframe id="r1" width="100%" height="650"></iframe>');
    var $iframe = $('#r1');
    $iframe.ready(function () {
        $iframe.contents().find("body").html(reporte);
    });
    $("#modal-ride").modal();
}

CargarPacientesListosRx();

$(".body").on('click', "button#enviarPorCorreo", function (ev) {
    var correo = $('.body').find('label#CorreoPacienteResultado').text().trim();
    var nombre = $('.body').find('label#ApellidoPacienteResultado').text() + " " + $('.body').find('label#NombrePacienteResultado').text();
    $('.body').find('h4#NombrePaciente').text(nombre);
    var mensaje = document.getElementById('plantillarxWord').value;
    enviarCorreo(correo, mensaje, nombre);
});

function enviarCorreo(correo, mensaje, nombre) {
    if (correo.length != 0) {
        $.ajax({
            method: "POST",
            url: "Ajax/Aj_Correo.php",
            data: {
                Requerimiento: "enviarCorreo",
                Email: correo,
                Paciente: nombre,
                Mensaje: mensaje,
                Asunto: "RESULTADOS DE RX"
            },
            dataType: 'JSON',
        });
        swal("Esculapio!", "Correo Enviado con Exito", "success");
    } else {
        swal({
            title: "Esculapio!",
            text: "El paciente no tiene correo, Desea agregarle?",
            icon: "info",
            buttons: true,
            dangerMode: false,
        })
            .then((willDelete) => {
                if (willDelete) {
                    $('#modal-modificar-paciente').modal();
                }
            });
    }
}

$(".body").on('click', "button#ModificarPaciente", function (ev) {
    $(".body").on('submit', "form#ModificarPacienteFact", function (evt) {
        evt.preventDefault();
        var id = $('.body').find('label#IdPacienteResultado').text().trim();
        var correo = $(this).find('input#CorreoModificarPaciente').val().trim();
        ModificarSoloCorreo(id, correo);
    });
});

function ModificarSoloCorreo(id, correo) {
    $.ajax({
        async: false,
        method: "POST",
        url: "Ajax/Aj_Paciente.php",
        data: {
            Requerimiento: "ModificaSoloCorreo",
            Correo: correo,
            Id: id
        },
        dataType: 'JSON',
    }).done(function (respuesta) {
        if (respuesta[0] == true) {
            var correo = $('.body').find('input#CorreoModificarPaciente').val().trim();
            var nombre = $('.body').find('label#ApellidoPacienteResultado').text() + " " + $('.body').find('label#NombrePacienteResultado').text();
            var mensaje = document.getElementById('plantillarxWord').value;;
            $.ajax({
                method: "POST",
                url: "Ajax/Aj_Correo.php",
                data: {
                    Requerimiento: "enviarCorreo",
                    Email: correo,
                    Paciente: nombre,
                    Mensaje: mensaje,
                    Asunto: "RESULTADOS DE RX"
                },
                dataType: 'JSON',
            });
            $('.body').find('label#CorreoPacienteResultado').text(correo);
            swal("Esculapio!", "Correo Enviado con Exito", "success").then((confirma) => {
                if (confirma) {
                    var cerrar = $('.body').find('button.close');
                    cerrar.click();
                }
            });
        }
        if (respuesta[0] == false) {
            swal("Esculapio!", "No Se Pudo Guardar el Paciente!, Se cargara la pantalla nuevamente para solucionar el problema.", "error");
            return;
        }
    }).fail(function (jqXHR, textStatus, errorThrown) {
        console.log(errorThrown);
        //location.reload();
    });
}

$(document).keydown(function (tecla) {


    //tecla.preventDefault();

    if (112 == tecla.keyCode) {
        tecla.preventDefault();
        $('button#BuscarPacientes').click();
    }

    // alert(tecla.keyCode);
});

$(".body").on("click", "button#DesvalidarEco", function (e) {
    swal({
        title: "Esculapio",
        text: "Seguro Que Desea Desvalidar?",
        icon: "info",
        buttons: true,
        dangerMode: false,
    }).then((confirma) => {
        if (confirma) {
            ActualizarEstadoDesvalidado(ProcedimientoGuardar, ConsultaGuardar);
        } else {

        }
    });

});

function ActualizarEstadoDesvalidado(idProceEco, idConsulta) {
    $.ajax({
        method: "POST",
        url: "Ajax/Aj_PlantillaRx.php",
        data: {
            Requerimiento: "ActualizarEstadoDesvalidado",
            Procedimiento: idProceEco,
            Consulta: idConsulta
        },
        dataType: 'JSON',
    }).done(function (respuesta) {
        //editor.setValue("");
        CargarProcedimientosPacientesRx(idConsulta);
    });
}