var DesactivarBotones = false;
var idOrden = 0;
var idConsultaOrden = 0;
var idConsulta = 0;
var fechaEnviaExamen = "";
var medicoEnviaExamen = "";
var usuarioValidoSos = "";
var fechaRegistro = "";
var fechaValido = "";
var fechaAtencion = "";
var hcuPaciente = "";

var tablePaciente = $('#datatablePacienteLaboratorio').DataTable({
    "searchable": false,
    'ordering': true,
    "order": [],
    "columnDefs": [{
        "targets": [0, 3],
        "visible": false,
    }, {
        "targets": [1, 4, 5, 6, 7],
        "width": "2%"
    }, {
        "targets": [2],
        "width": "40%"
    }],
    "fixedColumns": true
});
var tableResul = $('#datatablePacientesResultados').DataTable({
    'paging': false,
    'lengthChange': false,
    'searching': true,
    'ordering': false,
    'info': false,
    scrollY: 230,
    'autoWidth': false,
    keys: true,
    "processing": true,
    "serverSide": true,
    "columnDefs": [{
        "targets": [0],
        "visible": false,
    }],
    "ajax": {
        url: "Ajax/Aj_Recepcion.php",
        data: {
            Requerimiento: "CargarPacientes2"
        },
        type: "POST"
    },
});
$('#datatablePacientesResultados_filter input').css("margin-left", "-25em");
$('#datatablePacientesResultados_filter input').css("width", "25em");

tableResul.on('key-focus', function (e, datatable, cell) {


    if ($('#datatablePacientesResultados tbody tr').eq(datatable.row(cell.index().row).index()).hasClass('selected')) {
        return;
    }
    var span = $(datatable.row(cell.index().row).data()[1]);
    var idconsulta = span.attr('idconsulta');

    $('#datatablePacientesResultados tbody tr').find('span[idconsulta =' + idconsulta + ']').parent().dblclick();

});
var tableProce = $('#datatableProcedimientoPaciente').DataTable({
    'paging': false,
    'info': false,
    'searching': false,
    'ordering': true,

    scrollY: 230,
});

function strip_tags(input, allowed) {
    var tags = /<\/?([a-z][a-z0-9]*)\b[^>]*>/gi,
        commentsAndPhpTags = /<!--[\s\S]*?-->|<\?(?:php)?[\s\S]*?\?>/gi;

    // making sure the allowed arg is a string containing only tags in lowercase (<a><b><c>)
    allowed = (((allowed || "") + "").toLowerCase().match(/<[a-z][a-z0-9]*>/g) || []).join('');

    return input.replace(commentsAndPhpTags, '').replace(tags, function ($0, $1) {
        return allowed.indexOf('<' + $1.toLowerCase() + '>') > -1 ? $0 : '';
    });
}


function PintarFilaSeparador() {

    var ht = hot1.getInstance();
    var rowcount = ht.countRows();

    for (var i = 0; i < rowcount; i++) {
        var fila = hot1.getDataAtRow(i);

        if (fila[9] == 0 || String(fila[5]).replace('<b>', "").replace('</b>', "") == "__") {

            for (var j = 0; j < hot1.countCols(); j++) {
                hot1.setCellMeta(i, j, 'className', 'separador');

            }
            hot1.render();
        }
    }
    hot1.render();
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


$('.body table#datatablePacientesResultados tbody').on('dblclick', 'tr', function (evt) {
    setTimeout(function () {
        $("div#loaderPlantilla").fadeIn(0);
    }, 0);
    var cerrar = $('.body').find('button.close');
    var id = $('.body').find('label#IdPacienteResultado');
    var cedula = $('.body').find('label#CedulaPacienteResultado');
    var apellido = $('.body').find('label#ApellidoPacienteResultado');
    var nombre = $('.body').find('label#NombrePacienteResultado');
    var correo = $('.body').find('label#CorreoPacienteResultado');
    var fila = $(this);
    idConsulta = fila.find('td').eq(0).find('span').attr('idConsulta');
    $('#textArea').html('<label  id="medicoExamen">MEDICO QUE ENVIO EXAMEN: </label><br><label  id="fechaExamen">FECHA EN QUE ENVIO: </label><br><label  for="OBSERVACIONES">OBSERVACIONES: </label><br>');
    idOrden = fila.find('td').eq(0).find('span').attr('idOrden');
    $('.body').find('label#EdadPacienteResultado').html(calcularEdad(fila.find('td').eq(0).find('span').attr('fecha')));

    id.text(fila.find('td').eq(0).find('span').attr("idPaciente"));
    apellido.text(fila.find('td').find('span').html());
    cedula.text(fila.find('td').eq(0).find('span').attr("cedula"));

    correo.text(fila.find('td').eq(0).find('span').attr("email"));
    var paciente = id.text();
    fechaAtencion = fila.find('td').eq(1).html();
    hcuPaciente = paciente;
    setTimeout(function () {
        CargarPlantillasProcedimiento(paciente);
        CargarProcedimientoPaciente(paciente, idConsulta);
        CargarMotivoExamen(idOrden);
        var idEstado = fila.find('td button').attr('idEstado');
        if (idEstado == 6) {
            //$('button#ValidarResultadoLaboratorio').prop('disabled', true);
            //$('button#GuardarResultadoLaboratorio').prop('disabled', false);
            //$('button#imprimirDatos').prop('disabled', true);
            $('button#exportarDatosResultado').prop('disabled', true);
            $('button#enviarPorCorreo').prop('disabled', true);
            //DesactivarBotones = false;

            hot1.updateSettings({
                data: CargarPlantillaPaciente(paciente, idConsulta),
                beforeKeyDown: function (e) {
                    var selection = hot1.getSelected();

                    // BACKSPACE or DELETE
                    if (e.keyCode === 13) {
                        e.stopImmediatePropagation();

                        e.preventDefault();
                        try {
                            hot1.selectCell(parseInt(selection[0][0]) + 1, selection[0][1]); // select new cell
                        } catch (error) {
                            //if($('button.swal-button--confirm').hasClass("focusSwall")){
                            $('button.swal-button--confirm').click();
                            //}else{
                            // $('button.swal-button--cancel').click();    
                            //}
                        }

                    }

                }
            });
        }
        if (idEstado == 10) {
            //$('button#ValidarResultadoLaboratorio').prop('disabled', false);
            //$('button#GuardarResultadoLaboratorio').prop('disabled', false);
            //$('button#imprimirDatos').prop('disabled', true);
            $('button#exportarDatosResultado').prop('disabled', true);
            $('button#enviarPorCorreo').prop('disabled', true);
            //DesactivarBotones = false;
            hot1.updateSettings({
                data: CargarPlantillaPaciente(paciente, idConsulta),
                beforeKeyDown: function (e) {
                    var selection = hot1.getSelected();

                    // BACKSPACE or DELETE
                    if (e.keyCode === 13) {
                        e.stopImmediatePropagation();

                        e.preventDefault();
                        try {
                            hot1.selectCell(parseInt(selection[0][0]) + 1, selection[0][1]); // select new cell
                        } catch (error) {
                            //if($('button.swal-button--confirm').hasClass("focusSwall")){
                            $('button.swal-button--confirm').click();
                            //}else{
                            //$('button.swal-button--cancel').click();    
                            //}
                        }

                    }

                }
            });
        }
        if (idEstado == 12) {
            //DesactivarBotones = true;
            //$('button#ValidarResultadoLaboratorio').prop('disabled', true);
            //$('button#GuardarResultadoLaboratorio').prop('disabled', true);
            //$('button#imprimirDatos').prop('disabled', false);
            $('button#exportarDatosResultado').prop('disabled', false);
            $('button#enviarPorCorreo').prop('disabled', false);
            hot1.updateSettings({
                data: CargarPlantillaPaciente(paciente, idConsulta),
                beforeKeyDown: function (e) {
                    var selection = hot1.getSelected();

                    // BACKSPACE or DELETE
                    if (e.keyCode === 13) {
                        e.stopImmediatePropagation();

                        e.preventDefault();
                        try {
                            hot1.selectCell(parseInt(selection[0][0]) + 1, selection[0][1]); // select new cell
                        } catch (error) {
                            // if($('button.swal-button--confirm').hasClass("focusSwall")){
                            $('button.swal-button--confirm').click();
                            //}else{
                            //  $('button.swal-button--cancel').click();    
                            //}
                        }

                    }

                }
            });
        }
        PintarFilaSeparador();
        hot1.addHook('afterChange', function (src, changes) {

            try {
                if (!changes) {
                    return;
                }
                var row = src[0][0];
                filaModificoHanson = src[0][0];
                var fila = hot1.getDataAtRow(row);
                var valor = fila[4];
                var Min = fila[7];
                var Max = fila[8];
                console.log(Min + "-" + Max + "-" + valor);
                if (valor.indexOf("*") >= 0) {
                    return;
                }
                if (Min == "" && Max == "") {
                    return;
                }


                hot1.setCellMeta(row, 4, 'className', '');
                ValorModificoHanson = valor;

                if (parseFloat(valor) > parseFloat(Max)) {
                    hot1.setCellMeta(row, 4, 'className', 'colorized');
                    ValorModificoHanson = "<b>" + ValorModificoHanson + "*</b>";
                    hot1.setDataAtCell(row, 4, ValorModificoHanson);
                }
                if (parseFloat(valor) < parseFloat(Min)) {
                    hot1.setCellMeta(row, 4, 'className', 'colorized');
                    ValorModificoHanson = "<b>" + ValorModificoHanson + "*</b>";
                    hot1.setDataAtCell(row, 4, ValorModificoHanson);

                }
                if (ValorModificoHanson.indexOf("<b>") < 0) {
                    hot1.setDataAtCell(row, 4, "<b>" + valor + "</b>");
                }

                hot1.render();
            } catch (error) {

            }

        });
    }, 100);




    $('.body').find('div#textArea').fadeIn(1);
    setTimeout(function () {
        $("div#loaderPlantilla").fadeOut(300);
    }, 300);
});
///////////////////////////////////
$(".body").on("click", "button#ConsultarReccioncion", function (e) {

    ConsultarPacientesReccecion();
});

function ConsultarPacientesReccecion() {

    var fechaDesde = $('input#fecha_consultaDesde').val();
    var fechaHasta = $('input#fecha_consultaHasta').val();

    var fecha1 = new Date();


    var d = fecha1.getDate() - 1,
        m = fecha1.getMonth(),
        y = fecha1.getFullYear();
    var hoy = new Date(y, m, d);

    $.ajax({
        method: "POST",
        url: "Ajax/Aj_Recepcion.php",
        data: {
            Requerimiento: "CargarPacientesFecha",
            FechaDesde: fechaDesde,
            FechaHasta: fechaHasta
        },
        dataType: 'JSON',
    }).done(function (respuesta) {

        tablePaciente.clear().draw();
        var pacientes = new Array();
        // OBTENER SOLO LOS PACIENTES SIN REPETIR
        $.each(respuesta, function (i, iten) {
            var datos = [respuesta[i][8], respuesta[i][1] + ' ' + respuesta[i][2], respuesta[i][9], respuesta[i][0], respuesta[i][10]];
            if (pacientes.length == 0) {
                pacientes.push(datos);
            } else {
                var confirma = true;
                $.each(pacientes, function (p, itenp) {
                    if (pacientes[p][3] == datos[3]) {
                        confirma = false;
                    }
                });
                if (confirma) {
                    pacientes.push(datos);
                }
            }
        });

        $.each(pacientes, function (p, itenp) {
            var fila = new Array(tablePaciente.columns().count());
            var tt = tablePaciente.columns().count();
            $.each(fila, function (f, itenf) {
                fila[f] = " ";
            });
            fila[0] = pacientes[p][0];
            fila[2] = pacientes[p][1];
            fila[1] = pacientes[p][2];
            fila[3] = pacientes[p][3];
            var fecha2 = new Date(pacientes[p][2]);
            fecha2.setHours(0, 0, 0);
            fila[tt - 1] = '';


            if (fecha2.toDateString() === hoy.toDateString()) {
                fila[tt - 1] = '<button edad="' + pacientes[p][4] + '" type="submit" id="GuardarRecepcion" class="btn btn-success"><i class="fa fa-floppy-o" aria-hidden="true"></i> Guardar</button>';
            }
            $.each(respuesta, function (i, iten) {
                if (respuesta[i][0] == fila[3]) {
                    tablePaciente.columns().every(function (j) {
                        var data = this.header();
                        if (respuesta[i][4] == $(data).html()) {
                            if (respuesta[i][7] == 7) {
                                fila[j] = '<div class="form-group col-md-2">' + '<input class="prueba" idMuestra="' + respuesta[i][5] + '" nombreColumna="' + respuesta[i][4] + '" idConsulta=' + respuesta[i][0] + ' idProce=' + respuesta[i][6] + ' type="checkbox" name="fancy-checkbox-default' + respuesta[i][0] + "" + respuesta[i][5] + '" id="fancy-checkbox-default' + respuesta[i][0] + "" + respuesta[i][5] + '" autocomplete="off" />' + '<div class="btn-group" >' + '<label for="fancy-checkbox-default' + respuesta[i][0] + "" + respuesta[i][5] + '" class="btn btn-info">' + '<span class="glyphicon glyphicon-ok"></span>' + '<span> </span>' + '</label>' + '</div>' + '</div>';
                            }
                        }
                    });
                }
            });
            tablePaciente.row.add(fila).draw(true);
        });
    });
}

function CargarTomasHoy() {
    $.ajax({
        method: "POST",
        url: "Ajax/Aj_Recepcion.php",
        data: {
            Requerimiento: "CargarPacientesHoy"
        },
        dataType: 'JSON',
    }).done(function (respuesta) {
        tablePaciente.clear().draw();
        var pacientes = new Array();
        // OBTENER SOLO LOS PACIENTES SIN REPETIR
        $.each(respuesta, function (i, iten) {
            var datos = [respuesta[i][8], respuesta[i][1] + ' ' + respuesta[i][2], respuesta[i][9], respuesta[i][0], respuesta[i][10]];
            if (pacientes.length == 0) {
                pacientes.push(datos);
            } else {
                var confirma = true;
                $.each(pacientes, function (p, itenp) {
                    if (pacientes[p][3] == datos[3]) {
                        confirma = false;
                    }
                });
                if (confirma) {
                    pacientes.push(datos);
                }
            }
        });

        $.each(pacientes, function (p, itenp) {
            var fila = new Array(tablePaciente.columns().count());
            var tt = tablePaciente.columns().count();
            $.each(fila, function (f, itenf) {
                fila[f] = " ";
            });
            fila[0] = pacientes[p][0];
            fila[2] = pacientes[p][1];
            fila[1] = pacientes[p][2];
            fila[3] = pacientes[p][3];

            fila[tt - 1] = '<button edad="' + pacientes[p][4] + '" type="submit" id="GuardarRecepcion" class="btn btn-success"><i class="fa fa-floppy-o" aria-hidden="true"></i> Guardar</button>';

            $.each(respuesta, function (i, iten) {
                if (respuesta[i][0] == fila[3]) {
                    tablePaciente.columns().every(function (j) {
                        var data = this.header();
                        if (respuesta[i][4] == $(data).html()) {
                            if (respuesta[i][7] == 7) {
                                fila[j] = '<div class="form-group col-md-2">' + '<input class="prueba" idMuestra="' + respuesta[i][5] + '" nombreColumna="' + respuesta[i][4] + '" idConsulta=' + respuesta[i][0] + ' idProce=' + respuesta[i][6] + ' type="checkbox" name="fancy-checkbox-default' + respuesta[i][0] + "" + respuesta[i][5] + '" id="fancy-checkbox-default' + respuesta[i][0] + "" + respuesta[i][5] + '" autocomplete="off" />' + '<div class="btn-group" >' + '<label for="fancy-checkbox-default' + respuesta[i][0] + "" + respuesta[i][5] + '" class="btn btn-info">' + '<span class="glyphicon glyphicon-ok"></span>' + '<span> </span>' + '</label>' + '</div>' + '</div>';
                            }
                        }
                    });
                }
            });
            tablePaciente.row.add(fila).draw(true);
        });
    });
}
$(document).ready(function () {
    CargarTomasHoy();
    CargarTablaPlantillaTomas();
    CargarTomasPendientesHoy();
});

$(".body").on("click", "button#GuardarRecepcion", function (e) {
    var inputs = $(this).parent().parent().find('input');
    var pendientes = "";
    var turno = 0;
    var idConsulta = 0;
    var paciente = $(this).parent().parent().find('td').eq(1).html();
    var fecha_atencion = $(this).parent().parent().find('td').eq(0).html();
    var hcu = tablePaciente.row($(this).parent().parent()).data()[0];
    var edad = $(this).attr('edad');

    $.each(inputs, function (j) {
        var nombreColumna = $(this).attr('nombreColumna');
        if ($(this).is(':checked')) { } else {
            pendientes += ", " + nombreColumna;
        }
    });
    if (pendientes != "") {
        swal({
            title: "Esculapio",
            text: "Seguro que desea dejar pendientes las tomas " + pendientes,
            icon: "warning",
            buttons: true,
            dangerMode: false,
        }).then((confirma) => {
            if (confirma) {
                $.each(inputs, function (j) {
                    idConsulta = $(this).attr('idConsulta');
                    var nombreColumna = $(this).attr('nombreColumna');
                    var idMuestra = $(this).attr('idMuestra');
                    var pendientes = "";
                    if ($(this).is(':checked')) {
                        turno = GuardarTomasCheck(idConsulta, idMuestra, fecha_atencion);
                        CargarProcedimientos(idConsulta);
                    } else {
                        GuardarTomasCheckFalse(idConsulta, idMuestra,fecha_atencion);
                    }
                });
                /*swal({
                    title: "Esculapio",
                    text: "Guardado Con Exito, Turno # "+turno+" Desea Imprimir?",
                    icon: "info",
                    buttons: true,
                    dangerMode: false,
                }).then((confirma) => {
                    if (confirma) {
                       printTextArea(paciente,edad,hcu,fecha_atencion,turno);
                    } else {
                    }
                });*/
                swal("Esculapio!", "Guardado Con Exito, Turno # " + turno, "success");
                CargarTomasHoy();
                CargarTomasPendientesHoy();
            } else { }
        });
    } else {
        swal({
            title: "Esculapio",
            text: "Seguro Que Desea Guardar..!",
            icon: "info",
            buttons: true,
            dangerMode: false,
        }).then((confirma) => {
            if (confirma) {
                $.each(inputs, function (j) {
                    idConsulta = $(this).attr('idConsulta');
                    var nombreColumna = $(this).attr('nombreColumna');
                    var idMuestra = $(this).attr('idMuestra');
                    var pendientes = "";
                    if ($(this).is(':checked')) {
                        turno = GuardarTomasCheck(idConsulta, idMuestra, fecha_atencion);
                        CargarProcedimientos(idConsulta);
                    } else {
                        GuardarTomasCheckFalse(idConsulta, idMuestra, fecha_atencion);
                    }
                });
                /*swal({
                    title: "Esculapio",
                    text: "Guardado Con Exito, Turno # "+turno+" Desea Imprimir?",
                    icon: "info",
                    buttons: true,
                    dangerMode: false,
                }).then((confirma) => {
                    if (confirma) {
                       printTextArea(paciente,edad,hcu,fecha_atencion,turno);
                    } else {
                    }
                });*/
                swal("Esculapio!", "Guardado Con Exito, Turno # " + turno, "success");
                CargarTomasHoy();
                CargarTomasPendientesHoy();

            } else { }
        });
    }
});

function GuardarTomasCheck(idConsulta, idMuestra, fecha_atencion) {
    var turno = 0;
    $.ajax({
        async: false,
        method: "POST",
        url: "Ajax/Aj_Recepcion.php",
        data: {
            Requerimiento: "GuardarRecepcion",
            Consulta: idConsulta,
            Muestra: idMuestra,
            FechaAtencion: fecha_atencion
        },
        dataType: 'JSON',
    }).done(function (respuesta) {
        if (respuesta[0] == true) {
            turno = respuesta[1];
        }
        if (respuesta[0] == false) {
            turno = 0;
            swal("Esculapio!", "No Se Pudo Guardar..!, Se cargara la pantalla nuevamente para solucionar el problema.", "error");
        }
    }).fail(function (jqXHR, textStatus, errorThrown) {
        console.log(errorThrown)
    });

    return turno;
}

function CargarProcedimientos(idConsulta) {
    $.ajax({
        async: false,
        method: "POST",
        url: "Ajax/Aj_Recepcion.php",
        data: {
            Requerimiento: "CargarProcedimientosPlantilla",
            Consulta: idConsulta
        },
        dataType: 'JSON',
    }).done(function (respuesta) {
        $('.body').find('ul#ListaPlantilla').empty();
        $.each(respuesta, function (i, value) {
            var grupo = '<li><b>' + value[1] + '</b></li>';
            var lista = '<ul id=' + value[0] + '></ul>';
            $('.body').find('ul#ListaPlantilla').append(grupo + lista);
            $.each(value[2], function (j, item) {
                if (item != "") {
                    var l = '<li>' + item + '______</li>';
                    $('.body').find('ul#ListaPlantilla').find('ul#' + value[0]).append(l);
                }

            });
        });
        if (respuesta[0] == false) {
            swal("Esculapio!", "No Se Pudo Guardar..!, Se cargara la pantalla nuevamente para solucionar el problema.", "error");
        }
    }).fail(function (jqXHR, textStatus, errorThrown) {
        console.log(errorThrown)
    });
}

function GuardarTomasCheckFalse(idConsulta, idMuestra, fecha_atencion) {
    $.ajax({
        async: false,
        method: "POST",
        url: "Ajax/Aj_Recepcion.php",
        data: {
            Requerimiento: "GuardarRecepcion2",
            Consulta: idConsulta,
            Muestra: idMuestra,
            FechaAtencion: fecha_atencion
        },
        dataType: 'JSON',
    }).done(function (respuesta) {
        if (respuesta[0] == true) {
            swal("Esculapio!", "Recepcion fue Asiganada Con Exito..!", "success");
        }
        if (respuesta[0] == false) {
            swal("Esculapio!", "No Se Pudo Guardar..!, Se cargara la pantalla nuevamente para solucionar el problema.", "error");
        }
    }).fail(function (jqXHR, textStatus, errorThrown) {
        swal("Esculapio!", "Ocurrio un error.", "error");
    });
}
var tablePacientePendientes = $('#datatablePacienteLaboratorioPendientes').DataTable({
    "searchable": false,
    'ordering': true,
    "order": [],
    "columnDefs": [{
        "targets": [0, 3],
        "visible": false,
    }, {
        "targets": [1, 4, 5, 6, 7],
        "width": "2%"
    }, {
        "targets": [2],
        "width": "40%"
    }],
    "fixedColumns": true
});
///////////////////////////////////
$(".body").on("click", "button#ConsultarReccioncionPendiente", function (e) {
    CargarTomasPendientesFechas();
});


function CargarTomasPendientesFechas() {

    var fechaDesde = $('input#fecha_consultaDesdePendiente').val();
    var fechaHasta = $('input#fecha_consultaHastaPendiente').val();

    var fecha1 = new Date();

    var d = fecha1.getDate(),
        m = fecha1.getMonth(),
        y = fecha1.getFullYear();
    var hoy = new Date(y, m, d);
    $.ajax({
        method: "POST",
        url: "Ajax/Aj_Recepcion.php",
        data: {
            Requerimiento: "CargarPacientesPendientesFecha",
            FechaDesde: fechaDesde,
            FechaHasta: fechaHasta,
        },
        dataType: 'JSON',
    }).done(function (respuesta) {
        tablePacientePendientes.clear().draw();
        var pacientes = new Array();
        // OBTENER SOLO LOS PACIENTES SIN REPETIR
        $.each(respuesta, function (i, iten) {
            var datos = [respuesta[i][8], respuesta[i][1] + ' ' + respuesta[i][2], respuesta[i][9], respuesta[i][0], respuesta[i][10]];
            if (pacientes.length == 0) {
                pacientes.push(datos);
            } else {
                var confirma = true;
                $.each(pacientes, function (p, itenp) {
                    if (pacientes[p][0] == datos[0]) {
                        confirma = false;
                    }
                });
                if (confirma) {
                    pacientes.push(datos);
                }
            }
        });
        $.each(pacientes, function (p, itenp) {
            var fila = new Array(tablePacientePendientes.columns().count());
            var tt = tablePacientePendientes.columns().count();
            $.each(fila, function (f, itenf) {
                fila[f] = " ";
            });
            fila[0] = pacientes[p][0];
            fila[2] = pacientes[p][1];
            fila[1] = pacientes[p][2];
            fila[3] = pacientes[p][3];
            //var fecha2 = new Date(respuesta[p][9]);

            fila[tt - 1] = '<button edad="' + pacientes[p][4] + '" type="submit" id="GuardarRecepcionPendientes" class="btn btn-success"><i class="fa fa-floppy-o" aria-hidden="true"></i> Guardar</button>';
            /*if (fecha2 > hoy) {
                fila[tt - 1] = '';
            }*/
            $.each(respuesta, function (i, iten) {
                if (respuesta[i][0] == fila[3]) {
                    tablePacientePendientes.columns().every(function (j) {
                        var data = this.header();
                        if (respuesta[i][4] == $(data).html()) {
                            if (respuesta[i][7] == 8 || respuesta[i][7] == 7) {
                                fila[j] = '<div class="form-group col-md-2">' + '<input class="prueba" idMuestra="' + respuesta[i][5] + '" nombreColumna="' + respuesta[i][4] + '" idConsulta=' + respuesta[i][0] + ' idProce=' + respuesta[i][6] + ' type="checkbox" name="fancy-checkbox-default' + respuesta[i][0] + "p" + respuesta[i][5] + '" id="fancy-checkbox-default' + respuesta[i][0] + "p" + respuesta[i][5] + '" autocomplete="off" />' + '<div class="btn-group" >' + '<label for="fancy-checkbox-default' + respuesta[i][0] + "p" + respuesta[i][5] + '" class="btn btn-info">' + '<span class="glyphicon glyphicon-ok"></span>' + '<span> </span>' + '</label>' + '</div>' + '</div>';
                            }
                        }
                    });
                }
            });
            tablePacientePendientes.row.add(fila).draw(true);
        });
    }).fail(function (jqXHR, textStatus, errorThrown) {
        console.log(errorThrown)
    });
}

function CargarTomasPendientesHoy() {

    $.ajax({
        method: "POST",
        url: "Ajax/Aj_Recepcion.php",
        data: {
            Requerimiento: "CargarPacientesHoyPendiente"
        },
        dataType: 'JSON',
    }).done(function (respuesta) {
        tablePacientePendientes.clear().draw();
        var pacientes = new Array();
        // OBTENER SOLO LOS PACIENTES SIN REPETIR
        $.each(respuesta, function (i, iten) {
            var datos = [respuesta[i][8], respuesta[i][1] + ' ' + respuesta[i][2], respuesta[i][9], respuesta[i][0], respuesta[i][10]];
            if (pacientes.length == 0) {
                pacientes.push(datos);
            } else {
                var confirma = true;
                $.each(pacientes, function (p, itenp) {
                    if (pacientes[p][0] == datos[0]) {
                        confirma = false;
                    }
                });
                if (confirma) {
                    pacientes.push(datos);
                }
            }
        });
        $.each(pacientes, function (p, itenp) {
            var fila = new Array(tablePacientePendientes.columns().count());
            var tt = tablePacientePendientes.columns().count();
            $.each(fila, function (f, itenf) {
                fila[f] = " ";
            });
            fila[0] = pacientes[p][0];
            fila[2] = pacientes[p][1];
            fila[1] = pacientes[p][2];
            fila[3] = pacientes[p][3];
            var fecha2 = new Date(respuesta[p][9]);

            fila[tt - 1] = '<button edad="' + pacientes[p][4] + '" type="submit" id="GuardarRecepcionPendientes" class="btn btn-success"><i class="fa fa-floppy-o" aria-hidden="true"></i> Guardar</button>';
            /*if (fecha2 > hoy) {
                fila[tt - 1] = '';
            }*/
            $.each(respuesta, function (i, iten) {
                if (respuesta[i][0] == fila[3]) {
                    tablePacientePendientes.columns().every(function (j) {
                        var data = this.header();
                        if (respuesta[i][4] == $(data).html()) {
                            if (respuesta[i][7] == 8 || respuesta[i][7] == 7) {
                                fila[j] = '<div class="form-group col-md-2">' + '<input class="prueba" idMuestra="' + respuesta[i][5] + '" nombreColumna="' + respuesta[i][4] + '" idConsulta=' + respuesta[i][0] + ' idProce=' + respuesta[i][6] + ' type="checkbox" name="fancy-checkbox-default' + respuesta[i][0] + "p" + respuesta[i][5] + '" id="fancy-checkbox-default' + respuesta[i][0] + "p" + respuesta[i][5] + '" autocomplete="off" />' + '<div class="btn-group" >' + '<label for="fancy-checkbox-default' + respuesta[i][0] + "p" + respuesta[i][5] + '" class="btn btn-info">' + '<span class="glyphicon glyphicon-ok"></span>' + '<span> </span>' + '</label>' + '</div>' + '</div>';
                            }
                        }
                    });
                }
            });
            tablePacientePendientes.row.add(fila).draw(true);
        });
    });
}
$(".body").on("click", "button#GuardarRecepcionPendientes", function (e) {

    var inputs = $(this).parent().parent().find('input');
    var pendientes = "";
    var turno = 0;
    var idConsulta = 0;
    var paciente = $(this).parent().parent().find('td').eq(1).html();
    var fecha_atencion = $(this).parent().parent().find('td').eq(0).html();
    var hcu = tablePacientePendientes.row($(this).parent().parent()).data()[0];
    var edad = $(this).attr('edad');
    $.each(inputs, function (j) {
        var idConsulta = $(this).attr('idConsulta');
        var nombreColumna = $(this).attr('nombreColumna');
        var idMuestra = $(this).attr('idMuestra');
        if ($(this).is(':checked')) { } else {
            pendientes += ", " + nombreColumna;
        }
    });
    if (pendientes != "") {
        swal({
            title: "Esculapio",
            text: "Seguro que desea dejar pendientes las tomas " + pendientes,
            icon: "warning",
            buttons: true,
            dangerMode: false,
        }).then((confirma) => {
            if (confirma) {
                $.each(inputs, function (j) {
                    var idConsulta = $(this).attr('idConsulta');
                    var nombreColumna = $(this).attr('nombreColumna');
                    var idMuestra = $(this).attr('idMuestra');
                    var pendientes = "";
                    if ($(this).is(':checked')) {
                        turno = GuardarTomasCheck(idConsulta, idMuestra, fecha_atencion);
                        CargarProcedimientos(idConsulta);
                    } else {
                        GuardarTomasCheckFalse(idConsulta, idMuestra, fecha_atencion);
                    }
                });
                /*swal({
                    title: "Esculapio",
                    text: "Guardado Con Exito, Turno # "+turno+" Desea Imprimir?",
                    icon: "info",
                    buttons: true,
                    dangerMode: false,
                }).then((confirma) => {
                    if (confirma) {
                       printTextArea(paciente,edad,hcu,fecha_atencion,turno);
                    } else {
                    }
                });*/
                swal("Esculapio!", "Guardado Con Exito, Turno # " + turno, "success");
                CargarTomasHoy();
                CargarTomasPendientesHoy();

            } else { }
        });
    } else {
        swal({
            title: "Esculapio",
            text: "Seguro Que Desea Guardar..!",
            icon: "info",
            buttons: true,
            dangerMode: false,
        }).then((confirma) => {
            if (confirma) {
                $.each(inputs, function (j) {
                    var idConsulta = $(this).attr('idConsulta');
                    var nombreColumna = $(this).attr('nombreColumna');
                    var idMuestra = $(this).attr('idMuestra');
                    var pendientes = "";
                    if ($(this).is(':checked')) {
                        turno = GuardarTomasCheck(idConsulta, idMuestra, fecha_atencion);
                        CargarProcedimientos(idConsulta);
                    } else {
                        GuardarTomasCheckFalse(idConsulta, idMuestra, fecha_atencion);
                    }
                });
                /*swal({
                    title: "Esculapio",
                    text: "Guardado Con Exito, Turno # "+turno+" Desea Imprimir?",
                    icon: "info",
                    buttons: true,
                    dangerMode: false,
                }).then((confirma) => {
                    if (confirma) {
                       printTextArea(paciente,edad,hcu,fecha_atencion,turno);
                    } else {
                    }
                });*/
                swal("Esculapio!", "Guardado Con Exito, Turno # " + turno, "success");
                CargarTomasHoy();
                CargarTomasPendientesHoy();

            } else { }
        });
    }
});
///////////////////////////-********************--*-*********************************************************
var hot1;

function CargarTablaPlantillaTomas() {

    var hotElementContainer1 = null;
    var hotElement1 = document.querySelector('#datatableHandsomeResultado');
    try {
        hotElementContainer1 = hotElement1.parentNode;
    } catch (o) { }
    var hotSettings1 = {
        columns: [{
            data: 'idProcedimientoLaboratorio',
            type: 'text',
            editor: false,
            renderer: "html"
        }, {
            data: 'idPacienteLaboratorio',
            type: 'text',
            editor: false,
            renderer: "html"
        }, {
            data: 'idConsulta',
            type: 'text',
            editor: false,
            renderer: "html"
        }, {
            data: 'nombre',
            type: 'text',
            width: true,
            renderer: "html"
        }, {
            data: 'id',
            type: 'text',
            renderer: "html"
        }, {
            data: 'currency',
            type: 'text',
            renderer: "html"

        }, {
            data: 'descrip',
            type: 'text',
            editor: false,
            renderer: "html"
        }, {
            data: 'level',
            type: 'numeric',
            editor: false,
            renderer: "html"
        }, {
            data: 'asOf',
            type: 'numeric',
            editor: false,
            renderer: "html"
        },
        {
            data: 'idResultado',
            type: 'text',
            editor: false,
            renderer: "html"
        },
        {
            data: 'usuarioRegistro',
            type: 'text',
            editor: false,
            renderer: "html"
        },
        {
            data: 'usuarioValido',
            type: 'text',
            editor: false,
            renderer: "html"
        }
        ],
        stretchH: 'all',

        //width: 600,
        contextMenu: true,
        autoWrapRow: true,
        height: 600,


        rowHeaders: true,
        hiddenColumns: {
            columns: [0, 1, 2, 9, 10, 11],
            indicators: false
        },
        hiddenRows: {
            rows: [],
            indicators: true
        },
        nestedHeaders: [
            [{
                label: 'PLANTILLA',
                colspan: 6
            }, {
                label: 'REFERENCIA',
                colspan: 4
            }],
            ['ID', 'PACIENTE', 'Consulta', 'PROCEDIMIENTO', 'RESULTADO', 'UNIDAD DE MEDIDA', 'DESCRIPCION', 'MIN', 'MAX', 'Resultado']
        ]
    };
    hot1 = new Handsontable(hotElement1, hotSettings1);
    hot1.updateSettings({
        contextMenu: {
            items: {
                "row_above": {
                    name: 'Agregar Fila Arriba',
                },
                "row_below": {
                    name: 'Agregar Fila Abajo',
                },
                "remove_row": {
                    name: 'Eliminar Fila',
                }
            }
        }
    });
    //hot1.updateSettings({
    //  contextMenu: null,
    //});

}

function CargarProcedimientoPaciente(paciente, idConsulta) {
    $("#DesvalidarInforme").attr("disabled", true);
    idProcedimientoLaboratorioOculta =-1;
    idProcedimientoLaboratorio=0;
    $("#GuardarResultadoLaboratorio").attr("disabled", false);
    $("#ValidarResultadoLaboratorio").attr("disabled", false);
    var confirma = true;
    $.ajax({

        method: "POST",
        url: "Ajax/Aj_Recepcion.php",
        data: {
            Requerimiento: "CargarProcedimientoPaciente",
            Paciente: paciente,
            Consulta: idConsulta
        },
        dataType: 'JSON',
    }).done(function (respuesta2) {
        tableProce.clear().draw();
        $.each(respuesta2, function (i, iten) {

            var guardado = '<i class="fa fa-circle-o btn btn-default" aria-hidden="true"></i>';
            var validado = '<i class="fa fa-circle-o btn btn-default" aria-hidden="true"></i>';
            if (respuesta2[i][6] == 10) {
                confirma = false;
                guardado = '<i class="fa fa-check-circle-o btn btn-primary" aria-hidden="true"></i>';
            }
            if (respuesta2[i][6] == 12) {
                guardado = '<i class="fa fa-check-circle-o btn btn-primary" aria-hidden="true"></i>';
                validado = '<i class="fa fa-check-circle-o btn btn-success" aria-hidden="true"></i>';
                $("#DesvalidarInforme").attr("disabled", false);
            }
            var campos = ["<span idProce=" + respuesta2[i][4] + ">" + respuesta2[i][5] + "</span>", guardado, validado];
            tableProce.row.add(campos).draw(false);
        });

        if (confirma) {
            //ActualizarEstadoConsultaLab(idConsulta,"id_estado_lab","12");     
            ActualizarEstadoConsulta(idConsultaOrden, "id_estado_orden_lab", idConsulta);
        } else {
            //ActualizarEstadoConsultaLab(idConsulta,"id_estado_lab","6");
        }
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
        if (respuesta[0] == false) {
            return;
        }
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
function ActualizarEstadoConsultaLab(idConsulta, tipo, estado) {
    $.ajax({
        method: "POST",
        url: "Ajax/Aj_Consulta.php",
        data: {
            Requerimiento: "ActualizarEstadoConsultaLab",
            Consulta: idConsulta,
            Tipo: tipo,
            Estado: estado
        },
        dataType: 'JSON',
    });
}

var idProcedimientoLaboratorioOculta = -1;

function OcultarFilas() {
    var ht = hot1.getInstance();
    var rowcount = ht.countRows();

    var vacios = "";
    for (var i = 0; i < rowcount; i++) {
        var fila = hot1.getDataAtRow(i);

        if (fila[0] != idProcedimientoLaboratorioOculta) {
            var hiddenRows = ht.getPlugin('hiddenRows');

            hiddenRows.hideRow(i);
        } else {
            try {
                hiddenRows.showRow(i);
            } catch (Error) { }
        }

    }

    hot1.selectCell(0, 4);

}
function MostrarTodasFilas() {
    idProcedimientoLaboratorioOculta = -1;
    var ht = hot1.getInstance();
    var rowcount = ht.countRows();

    var vacios = "";
    for (var i = 0; i < rowcount; i++) {
        var fila = hot1.getDataAtRow(i);
        var hiddenRows = ht.getPlugin('hiddenRows');
        hiddenRows.showRow(i);
    }

    hot1.selectCell(0, 4);

}

$('.body table#datatableProcedimientoPaciente tbody').on('dblclick', 'tr', function (evt) {
    var id = $(this).find('span').attr('idProce');
    var g = $(this).find('td').eq(1).find('i.fa-check-circle-o');
    var v = $(this).find('td').eq(2).find('i.fa-check-circle-o');

    var gg = $(this).find('td').eq(1).find('i.fa-circle-o');

    if (gg.length > 0) {
        //$('button#GuardarResultadoLaboratorio').prop('disabled', false);
    }

    if (g.length > 0) {

        //$('button#GuardarResultadoLaboratorio').prop('disabled', false);
        //$('button#ValidarResultadoLaboratorio').prop('disabled', false);
        //$("#DesvalidarInforme").attr("disabled",false);
        //DesactivarBotones = false;
    }
    if (v.length > 0) {

        //$('button#GuardarResultadoLaboratorio').prop('disabled', true);
        //$('button#ValidarResultadoLaboratorio').prop('disabled', true);

    } else {
        // $('button#GuardarResultadoLaboratorio').prop('disabled',false);
        //$('button#ValidarResultadoLaboratorio').prop('disabled',true);   
        //

        //DesactivarBotones = false;
    }

    $('a#CargarTodaPlantilla').click();
    idProcedimientoLaboratorioOculta = id;

    OcultarFilas();
    hot1.render();
});

$('.body').on('click', 'a#CargarTodaPlantilla', function (evt) {

    MostrarTodasFilas();
    hot1.render();
});

function CargarPlantilla(idProc) {
    var data = null;
    var campos = new Array();
    $.ajax({
        async: false,
        method: "POST",
        url: "Ajax/Aj_Plantilla.php",
        data: {
            Requerimiento: "CargarPlantillaPorProc",
            IdProc: idProc
        },
        dataType: 'JSON',
    }).done(function (respuesta) {
        if (respuesta[0] == false) {
            swal("Esculapio!", "OCURRIO UN ERROR.", "error");
            return;
        }
        var procedimientos = new Array();
        // OBTENER SOLO LOS PACIENTES SIN REPETIR
        $.each(respuesta, function (i, iten) {
            var datos = [respuesta[i][2]];
            if (procedimientos.length == 0) {
                procedimientos.push(datos);
                campos.push({
                    idPacienteLaboratorio: respuesta[i][7],
                    idProcedimientoLaboratorio: respuesta[i][1],
                    idConsulta: respuesta[i][8],
                    idResultado: -1,
                    nombre: respuesta[i][2],
                    id: respuesta[i][3],
                    currency: respuesta[i][4],
                    level: respuesta[i][5],
                    asOf: respuesta[i][6],
                    descrip: respuesta[i][10]
                });
            } else {
                var confirma = true;
                $.each(procedimientos, function (p, itenp) {
                    if (procedimientos[p][0] == datos[0]) {
                        confirma = false;
                    }
                });
                if (confirma) {
                    campos.push({
                        idPacienteLaboratorio: respuesta[i][7],
                        idProcedimientoLaboratorio: respuesta[i][1],
                        idConsulta: respuesta[i][8],
                        idResultado: 0,
                        nombre: '========',
                        id: '========',
                        currency: '========',
                        level: '========',
                        asOf: '========',
                        descrip: '========'
                    });
                    procedimientos.push(datos);
                    campos.push({
                        idPacienteLaboratorio: respuesta[i][7],
                        idProcedimientoLaboratorio: respuesta[i][1],
                        idConsulta: respuesta[i][8],
                        idResultado: -1,
                        nombre: respuesta[i][2],
                        id: respuesta[i][3],
                        currency: respuesta[i][4],
                        level: respuesta[i][5],
                        asOf: respuesta[i][6],
                        descrip: respuesta[i][10]
                    });
                } else {
                    campos.push({
                        idPacienteLaboratorio: respuesta[i][7],
                        idProcedimientoLaboratorio: respuesta[i][1],
                        idConsulta: respuesta[i][8],
                        idResultado: -1,
                        nombre: respuesta[i][9],
                        id: respuesta[i][3],
                        currency: respuesta[i][4],
                        level: respuesta[i][5],
                        asOf: respuesta[i][6],
                        descrip: respuesta[i][10]
                    });
                }
            }
        });
        data = campos;
        campos = null;
    }).fail(function (jqXHR, textStatus, errorThrown) {
        console.log(errorThrown)
    });
    hot1.updateSettings({
        afterCreateRow: function (index, numberOfRows) {
            data.splice(index, numberOfRows);
        }
    });
    return data;
}

function CargarPlantillaPaciente(paciente, idConsulta) {
    var data = null;
    var campos = new Array();
    campos = CargarPlantillaResultadoPorProcedimientoyPaciente(paciente, idConsulta, campos);
    $.ajax({
        async: false,
        method: "POST",
        url: "Ajax/Aj_Plantilla.php",
        data: {
            Requerimiento: "CargarPlantillaPorPaciente",
            Paciente: paciente,
            Consulta: idConsulta
        },
        dataType: 'JSON',
    }).done(function (respuesta) {
        //alert(respuesta);
        if (respuesta[0] == false) {
            swal("Esculapio!", "OCURRIO UN ERROR.", "error");
            return;
        }
        var procedimientos = new Array();
        // OBTENER SOLO LOS PACIENTES SIN REPETIR
        $.each(respuesta, function (i, iten) {
            var datos = [respuesta[i][2]];
            if (procedimientos.length == 0) {
                procedimientos.push(datos);
                campos.push({
                    idPacienteLaboratorio: respuesta[i][7],
                    idProcedimientoLaboratorio: respuesta[i][1],
                    idConsulta: respuesta[i][8],
                    idResultado: -1,
                    nombre: '<b>' + respuesta[i][2] + '</b>',
                    id: respuesta[i][3].replace("<b>", "").replace("</b>", ""),
                    currency: respuesta[i][4],
                    level: respuesta[i][5],
                    asOf: respuesta[i][6],
                    descrip: respuesta[i][10]
                });
            } else {
                var confirma = true;
                $.each(procedimientos, function (p, itenp) {
                    if (procedimientos[p][0] == datos[0]) {
                        confirma = false;
                    }
                });
                if (confirma) {
                    campos.push({
                        idPacienteLaboratorio: respuesta[i][7],
                        idProcedimientoLaboratorio: respuesta[i][1],
                        idConsulta: respuesta[i][8],
                        idResultado: 0,
                        nombre: '__',
                        id: '__',
                        currency: '__',
                        level: '__',
                        asOf: '__',
                        descrip: '__'
                    });
                    procedimientos.push(datos);
                    campos.push({
                        idPacienteLaboratorio: respuesta[i][7],
                        idProcedimientoLaboratorio: respuesta[i][1],
                        idConsulta: respuesta[i][8],
                        idResultado: -1,
                        nombre: '<b>' + respuesta[i][2] + '</b>',
                        id: respuesta[i][3].replace("<b>", "").replace("</b>", ""),
                        currency: respuesta[i][4],
                        level: respuesta[i][5],
                        asOf: respuesta[i][6],
                        descrip: respuesta[i][10]
                    });
                } else {
                    campos.push({
                        idPacienteLaboratorio: respuesta[i][7],
                        idProcedimientoLaboratorio: respuesta[i][1],
                        idConsulta: respuesta[i][8],
                        idResultado: -1,
                        nombre: respuesta[i][9],
                        id: respuesta[i][3].replace("<b>", "").replace("</b>", ""),
                        currency: respuesta[i][4],
                        level: respuesta[i][5],
                        asOf: respuesta[i][6],
                        descrip: respuesta[i][10]
                    });
                }
            }
        });
        data = campos;

        campos = null;
    }).fail(function (jqXHR, textStatus, errorThrown) {
        console.log(errorThrown)
    });
    hot1.updateSettings({
        afterCreateRow: function (index, numberOfRows) {
            data.splice(index, numberOfRows);
        }
    });
    return data;
}

function CargarPlantillaResultadoPorProcedimientoyPaciente(paciente, idConsulta, campos) {

    $.ajax({
        async: false,
        method: "POST",
        url: "Ajax/Aj_Plantilla.php",
        data: {
            Requerimiento: "CargarPlantillaPorPacienteResultado",
            Paciente: paciente,
            Consulta: idConsulta
        },
        dataType: 'JSON',
    }).done(function (respuesta) {
        //alert(respuesta);
        if (respuesta[0] == false) {
            swal("Esculapio!", "OCURRIO UN ERROR.", "error");
            return;
        }
        var proce, resul, ur, uv;
        $.each(respuesta, function (i, iten) {

            if (i == 0) {
                proce = respuesta[i][1];
            } else {
                if (proce != respuesta[i][1]) {

                    campos.push({
                        idPacienteLaboratorio: paciente,
                        idProcedimientoLaboratorio: proce,
                        idConsulta: idConsulta,
                        idResultado: 0,
                        nombre: '__',
                        id: '__',
                        currency: '__',
                        level: '__',
                        asOf: '__',
                        descrip: '__',
                        usuarioRegistro: ur,
                        usuarioValido: uv
                    });
                    proce = respuesta[i][1];
                }
            }
            campos.push({
                idPacienteLaboratorio: respuesta[i][7],
                idProcedimientoLaboratorio: respuesta[i][1],
                idConsulta: respuesta[i][10],
                idResultado: respuesta[i][0],
                nombre: respuesta[i][8],
                id: respuesta[i][3],
                currency: respuesta[i][4],
                level: respuesta[i][5],
                asOf: respuesta[i][6],
                descrip: respuesta[i][9],
                usuarioRegistro: respuesta[i][11],
                usuarioValido: respuesta[i][12]
            });
            // proce=respuesta[i][1];
            resul = respuesta[i][0];
            ur = respuesta[i][11];
            uv = respuesta[i][12];
            if (i == 0) {
                usuarioValidoSos = respuesta[i][12];
                fechaRegistro = respuesta[i][13];
                fechaValido = respuesta[i][14];
            }
        });

        campos.push({
            idPacienteLaboratorio: paciente,
            idProcedimientoLaboratorio: proce,
            idConsulta: idConsulta,
            idResultado: 0,
            nombre: '__',
            id: '__',
            currency: '__',
            level: '__',
            asOf: '__',
            descrip: '__',
            usuarioRegistro: ur,
            usuarioValido: uv
        });

    }).fail(function (jqXHR, textStatus, errorThrown) {
        console.log(errorThrown)
    });
    return campos;
}

function CargarPlantillaPacienteResultado(paciente, idConsulta) {
    var data = null;
    //$('button#imprimirDatos').prop('disabled',tr);
    var campos = new Array();
    $.ajax({
        async: false,
        method: "POST",
        url: "Ajax/Aj_Plantilla.php",
        data: {
            Requerimiento: "CargarPlantillaPorPacienteResultado",
            Paciente: paciente,
            Consulta: idConsulta
        },
        dataType: 'JSON',
    }).done(function (respuesta) {
        //alert(respuesta);
        if (respuesta[0] == false) {
            swal("Esculapio!", "OCURRIO UN ERROR.", "error");
            return;
        }
        var proce, resul, ur, uv;
        $.each(respuesta, function (i, iten) {

            if (i == 0) {
                proce = respuesta[i][1];
            } else {
                if (proce != respuesta[i][1]) {
                    proce = respuesta[i][1];
                    campos.push({
                        idPacienteLaboratorio: paciente,
                        idProcedimientoLaboratorio: proce,
                        idConsulta: idConsulta,
                        idResultado: 0,
                        nombre: '__',
                        id: '__',
                        currency: '__',
                        level: '__',
                        asOf: '__',
                        descrip: '__',
                        usuarioRegistro: ur,
                        usuarioValido: uv
                    });
                }
            }
            campos.push({
                idPacienteLaboratorio: respuesta[i][7],
                idProcedimientoLaboratorio: respuesta[i][1],
                idConsulta: respuesta[i][10],
                idResultado: respuesta[i][0],
                nombre: respuesta[i][8],
                id: respuesta[i][3],
                currency: respuesta[i][4],
                level: respuesta[i][5],
                asOf: respuesta[i][6],
                descrip: respuesta[i][9],
                usuarioRegistro: respuesta[i][11],
                usuarioValido: respuesta[i][12]
            });

            //proce=respuesta[i][1];
            resul = respuesta[i][0];
            ur = respuesta[i][11];
            uv = respuesta[i][12];
            if (i == 0) {
                usuarioValidoSos = respuesta[i][12];
                fechaRegistro = respuesta[i][13];
                fechaValido = respuesta[i][14];
            }

        });

        campos.push({
            idPacienteLaboratorio: paciente,
            idProcedimientoLaboratorio: proce,
            idConsulta: idConsulta,
            idResultado: 0,
            nombre: '__',
            id: '__',
            currency: '__',
            level: '__',
            asOf: '__',
            descrip: '__',
            usuarioRegistro: ur,
            usuarioValido: uv
        });
        data = campos;
        campos = null;
    }).fail(function (jqXHR, textStatus, errorThrown) {
        console.log(errorThrown)
    });
    hot1.updateSettings({
        afterCreateRow: function (index, numberOfRows) {
            data.splice(index, numberOfRows);
        }
    });
    return data;
}
$(".body").on("click", "button#ConsultarPacientesReceptados", function (e) {
    tableResul.column(1).search($('#fecha_consultaDesdeInforme').val());
    tableResul.column(2).search($('#fecha_consultaHastaInforme').val()).draw();
    //CargarPacientesLaboratoriosPorFecha();
});
var BotonValidar = false;
$(".body").on("click", "button#GuardarResultadoLaboratorio", function (e) {
    //$("#GuardarResultadoLaboratorio").attr("disabled", true);
    //$("#ValidarResultadoLaboratorio").attr("disabled", true);
    document.activeElement.blur();
    hot1.deselectCell();
    document.activeElement.blur();
    if (!DesactivarBotones) {
        var vacios = ValidarCamposLlenos();
        if (vacios != "") {
            swal("Esculapio!", vacios, "warning");
            return;
        } else {

            swal({
                title: "Esculapio",
                text: "Seguro Que Desea Guardar?",
                icon: "info",
                buttons: true,
                dangerMode: false,
            }).then((confirma) => {
                if (confirma) {
                    BotonValidar = false;
                    $('#modal-cargando').modal();
                } else {

                }
            });

            $('button.swal-button--confirm').focus();
        }

    }

});

$(".body").on("click", "button#ValidarResultadoLaboratorio", function (e) {
    //$("#GuardarResultadoLaboratorio").attr("disabled", true);
    //$("#ValidarResultadoLaboratorio").attr("disabled", true);
    document.activeElement.blur();
    hot1.deselectCell();
    document.activeElement.blur();
    if (!DesactivarBotones) {
        var vacios = ValidarCamposLlenos();
        if (vacios != "") {
            swal("Esculapio!", vacios, "warning");
            return;
        } else {

            swal({
                title: "Esculapio",
                text: "Seguro Que Desea Validar?",
                icon: "info",
                buttons: true,
                dangerMode: false,
            }).then((confirma) => {
                if (confirma) {
                    BotonValidar = true;
                    $('#modal-cargando').modal();
                } else {

                }
            });
        }


    }

});

$('#modal-cargando').on('shown.bs.modal', function () {
    var ht = hot1.getInstance();
    var rowcount = ht.countRows();
    var detalleproce = [];
    var pacien = 0;
    var consul = 0;
    var eliminar = true;
    for (var i = 0; i < rowcount; i++) {
        var fila = hot1.getDataAtRow(i);
        pacien = fila[1];
        consul = fila[2];

        if (idProcedimientoLaboratorioOculta == fila[0]) {

            if (BotonValidar) {

                var lineaDetalle = [fila[0], fila[2], fila[4], fila[9]];
                detalleproce.push(lineaDetalle);
            } else {
                if (String(fila[4]).replace("<b>", "").replace("</b>", "").trim() != "__") {

                    var lineaDetalle = [fila[0], fila[1], fila[2], fila[3], fila[4], fila[5], fila[6], fila[7], fila[8]];
                    detalleproce.push(lineaDetalle);
                }

            }

        }
        if (idProcedimientoLaboratorioOculta == -1) {
            if (BotonValidar) {

                var lineaDetalle = [fila[0], fila[2], fila[4], fila[9]];
                detalleproce.push(lineaDetalle);
            } else {
                if (String(fila[4]).replace("<b>", "").replace("</b>", "").trim() != "__") {

                    var lineaDetalle = [fila[0], fila[1], fila[2], fila[3], fila[4], fila[5], fila[6], fila[7], fila[8]];
                    detalleproce.push(lineaDetalle);
                }

            }
        }


    }

    if (BotonValidar) {
        ValidarResultadoLaboratorio(JSON.stringify(detalleproce), pacien, consul);
    } else {
        GuardarResultadoLaboratorio(JSON.stringify(detalleproce), pacien, consul);
    }


});

function ValidarCamposLlenos() {
    //var ht = hot1.getInstance();
    //var rowcount = ht.countRows();

    var vacios = "";
    /*for (var i = 0; i < rowcount; i++) {
        var fila = hot1.getDataAtRow(i);


        if (idProcedimientoLaboratorioOculta == fila[0]) {
            try {
                if (String(fila[3]).trim() != "" && (parseFloat(fila[4]) == 0 || parseFloat(String(fila[4]).replace("<b>", "").replace("</b>", "").trim()) == 0)) {
                    vacios += "Falta agregar el resultado en :" + String(fila[3]).replace("<b>", "").replace("</b>", "").trim() + ", Fila " + (i + 1) + "\n";
                    //console.log(fila[3]);
                }
            } catch (Error) {
                console.log(Error);
            }
        }
        if (idProcedimientoLaboratorioOculta == -1) {
            try {
                if (String(fila[3]).trim() != "" && (parseFloat(fila[4]) == 0 || parseFloat(String(fila[4]).replace("<b>", "").replace("</b>", "").trim()) == 0)) {
                    vacios += "Falta agregar el resultado en :" + String(fila[3]).replace("<b>", "").replace("</b>", "").trim() + ", Fila " + (i + 1) + "\n";
                    //console.log(fila[3]);
                }
            } catch (Error) {
                console.log(Error);
            }
        }
    }*/

    return vacios;
}

function GuardarResultadoLaboratorio(detalleproce, pacien, consul) {

    $.ajax({

        method: "POST",
        url: "Ajax/Aj_Plantilla.php",
        data: {
            Requerimiento: "GuardarResultadoLaboratorio",
            Detalle: detalleproce
        },
        dataType: 'JSON',
    }).done(function (respuesta) {

        $('button#ConsultarPacientesReceptados').click();
        $('#modal-cargando').modal('hide');
        if (respuesta[0] == false) {
            swal("Esculapio!", "Error Al Guardar El Resultado. ", "error");
            //$("#GuardarResultadoLaboratorio").attr("disabled", false);
            //$("#ValidarResultadoLaboratorio").attr("disabled", false);
            return;
        } else {
            swal("Esculapio!", "Resultados Guardados. ", "success");
            //$("#GuardarResultadoLaboratorio").attr("disabled", false);
            //$("#ValidarResultadoLaboratorio").attr("disabled", false);
            CargarProcedimientoPaciente(pacien, consul);

            hot1.updateSettings({
                data: CargarPlantillaPaciente(pacien, consul),
            });
            $('button#ValidarResultadoLaboratorio').prop('disabled', false);
            idProcedimientoLaboratorioOculta = -1;
            PintarFilaSeparador();
            $("#ConsultarPacientesReceptados").click();
        }
    }).fail(function (jqXHR, textStatus, errorThrown) {
        console.log(errorThrown);
    });
}

function ValidarResultadoLaboratorio(detalleproce, pacien, consul) {
    $.ajax({
        method: "POST",
        url: "Ajax/Aj_Plantilla.php",
        data: {
            Requerimiento: "ValidarResultadoLaboratorio",
            Detalle: detalleproce
        },
        dataType: 'JSON',
    }).done(function (respuesta) {

        $('button#ConsultarPacientesReceptados').click();
        $('#modal-cargando').modal('hide');
        if (respuesta[0] == false) {
            swal("Esculapio!", "Error Al Guardar El Resultado. ", "error");
            //$("#GuardarResultadoLaboratorio").attr("disabled", false);
            //$("#ValidarResultadoLaboratorio").attr("disabled", false);
            return;
        } else {
            CargarProcedimientoPaciente(pacien, consul);
            hot1.updateSettings({
                data: CargarPlantillaPacienteResultado(pacien, consul),
            });
            swal({
                title: "Esculapio",
                text: "Datos Validados Con Exito, Desea Imprimir?",
                icon: "info",
                buttons: true,
                dangerMode: false,
            }).then((confirma) => {
                if (confirma) {

                    //$('button#imprimirDatos').prop('disabled',false);
                    $('button#enviarPorCorreo').prop('disabled', false);
                    $('button#ValidarResultadoLaboratorio').prop('disabled', true);
                    $('button#imprimirDatos').click();
                } else {
                }
            });
            idProcedimientoLaboratorioOculta = -1;
            PintarFilaSeparador();
            $("#ConsultarPacientesReceptados").click();
        }
    }).fail(function (jqXHR, textStatus, errorThrown) {
        console.log(errorThrown);
    });
}

function VerficarEstadoPacienteLab(idConsulta, numero) {

    var boton = '';
    $.ajax({
        async: false,
        method: "POST",
        url: "Ajax/Aj_Recepcion.php",
        data: {
            Requerimiento: "VerficarEstadoPacienteLab",
            Consulta: idConsulta
        },
        dataType: 'JSON',
    }).done(function (respuesta) {

        var listo = 0;
        var registrado = 0;
        var validado = 0;
        var estado = 0;
        $.each(respuesta, function (i, iten) {
            if (iten[0] == 6) {
                estado = 6;
                listo = 1;
            }
            if (iten[0] == 10) {
                estado = 10;
                registrado = 1;
            }
            if (iten[0] == 12) {

                validado = 1;
                estado = 12;
            }
        });

        boton = '<button idEstado=' + estado + ' type="button" class="btn btn-sm btn-danger nopaddingBoton" >' + numero + '</button>';
        if (parseInt(registrado) > 0) {
            boton = '<button idEstado=' + estado + ' type="button" class="btn btn-sm btn-warning nopaddingBoton ">' + numero + '</button>';
        }
        //console.log(idConsulta+" "+registrado+" "+listo+" "+validado);
        if (registrado === 0 && listo == 0 && parseInt(validado) > 0) {

            boton = '<button idEstado=' + estado + ' type="button" class="btn btn-sm btn-success nopaddingBoton ">' + numero + '</button>';
        }



    }).fail(function (jqXHR, textStatus, errorThrown) {
        console.log(errorThrown)
    });
    return boton;
}

$(document).keydown(function (tecla) {



    if (112 == tecla.keyCode && $('div#servicios').hasClass('active')) {
        tecla.preventDefault();
        $('button#BuscarPacientes').click();
    }
    if (112 == tecla.keyCode && $('div#consultas').hasClass('active')) {
        tecla.preventDefault();
        $('button#ConsultarReccioncion').click();
    }

    // alert(tecla.keyCode);
});

$('#modal-pacientes').on('shown.bs.modal', function () {
    $('#datatablePacientesResultados tbody tr td').eq(0).click();
});

var tabla = $('#datatablePruebaRecepcion').DataTable({
    ordering: false,
    paginate: false,
    ordering: false,
    dom: '<"top"lBf>rt<"bottom"ip>',
    buttons: [{
        extend: 'excelHtml5'
    }]
});

$(".body").on('click', "button#imprimirDatos", function (ev) {
    var ht = hot1.getInstance();
    var rowcount = ht.countRows();

    tabla.clear().draw();
    var colcount = ht.countCols();
    /*var ff = $('.body div#nombreProcedimiento').find('label#nppp').text();
    var dataSet1 =[ff,"","","","",""];
    tabla.row.add(dataSet1).draw(false);*/
    //var imprimir = $('.body div#servicios').find('button.buttons-print');
    for (var i = 0; i < rowcount; i++) {
        var fila = hot1.getDataAtRow(i);
        if (idProcedimientoLaboratorioOculta == fila[0]) {
            var descrp = fila[3];
            var resultado = fila[4];
            var um = fila[5];
            var refer = fila[6];
            var ref_min = fila[7];
            var ref_max = fila[8];
            if (fila[11] != "" && fila[11] != undefined && fila[11] != null) {
                var dataSet = [descrp, resultado, um, refer, ref_min, ref_max];
                tabla.row.add(dataSet);
            }
        }
        if (idProcedimientoLaboratorioOculta == -1) {
            var descrp = fila[3];
            var resultado = fila[4];
            var um = fila[5];
            var refer = fila[6];
            var ref_min = fila[7];
            var ref_max = fila[8];
            if (fila[11] != "" && fila[11] != undefined && fila[11] != null) {
                var dataSet = [descrp, resultado, um, refer, ref_min, ref_max];
                tabla.row.add(dataSet);
            }
        }

    }
    tabla.draw(false);
    printTextAreaLaboratorio1();
    //printTextAreaLaboratorio();

    //imprimir.click();
});
var enviapdf = "N";
$(".body").on('click', "button#enviarPorCorreo", function (ev) {
    var ht = hot1.getInstance();
    var rowcount = ht.countRows();
    var correo = $('.body').find('label#CorreoPacienteResultado').text().trim();
    var nombre = $('.body').find('label#ApellidoPacienteResultado').text() + " " + $('.body').find('label#NombrePacienteResultado').text();
    $('.body').find('h4#NombrePaciente').text(nombre);

    var productos = [];
    for (var i = 0; i < rowcount; i++) {
        var fila = hot1.getDataAtRow(i);
        var descrp = fila[3];
        var resultado = fila[4];
        var um = fila[5];
        var refer = fila[6];
        var ref_min = fila[7];
        var ref_max = fila[8];
        var lineaDetalle = [descrp, resultado, um, refer, ref_min, ref_max];
        productos[i] = lineaDetalle;
    }
    

    enviarCorreo(correo, nombre, JSON.stringify(productos));
});

function enviarCorreo(correo, nombre, detalle) {
    var medicoEnvio = $('.body').find('label#medicoExamen').text().replace("MEDICO QUE ENVIO EXAMEN:", "");
    if (correo.length != 0) {
        $.ajax({
            method: "POST",
            url: "Ajax/Aj_Correo.php",
            data: {
                Requerimiento: "enviarCorreo",
                Email: correo,
                Paciente: nombre,
                Cedula: $("#CedulaPacienteResultado").html(),
                Edad: $("#EdadPacienteResultado").html(),
                Fecha: fechaAtencion,
                HCU: hcuPaciente,
                Detalle: detalle,
                Consulta:idConsulta,
                NombreDoctor:usuarioValidoSos.toUpperCase(),
                FechaValido:fechaValido.substring(0, 10),
                MedicoEnvio:medicoEnvio.replace('ORDENO :', ''),
                SubirPdf:enviapdf
            },
            dataType: 'JSON',
        });
        if(enviapdf=="N"){
            swal("Esculapio!", "Correo Enviado con Exito", "success");
        }
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

$("body").on('click', "button#ModificarPaciente", function (ev) {
    console.log("click");
    var id = $('body').find('label#IdPacienteResultado').text().trim();
    var correo = $('body').find('input#CorreoModificarPaciente').val().trim();
    ModificarSoloCorreo(id, correo);
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
            var ht = hot1.getInstance();
            var rowcount = ht.countRows();
            var correo = $('.body').find('input#CorreoModificarPaciente').val().trim();
            var nombre = $('.body').find('label#ApellidoPacienteResultado').text() + " " + $('.body').find('label#NombrePacienteResultado').text();
            var productos = [];
            for (var i = 0; i < rowcount; i++) {
                var fila = hot1.getDataAtRow(i);
                var descrp = fila[3];
                var resultado = fila[4];
                var um = fila[5];
                var refer = fila[6];
                var ref_min = fila[7];
                var ref_max = fila[8];
                var lineaDetalle = [descrp, resultado, um, refer, ref_min, ref_max];
                productos[i] = lineaDetalle;
            }
            enviarCorreo(correo, nombre, JSON.stringify(productos));
        }
        if (respuesta[0] == false) {
            swal("Esculapio!", "No Se Pudo Guardar el Paciente!, Se cargara la pantalla nuevamente para solucionar el problema.", "error");
            return;
        }
    }).fail(function (jqXHR, textStatus, errorThrown) {
        console.log(errorThrown)
        //location.reload();
    });
}



$(document).keydown(function (tecla) {



    if (112 == tecla.keyCode && $('div#tab_1').hasClass('active')) {
        tecla.preventDefault();
        $('button#ConsultarReccioncion').click();
    }

    if (112 == tecla.keyCode && $('div#tab_2').hasClass('active')) {
        tecla.preventDefault();
        $('button#ConsultarReccioncionPendiente').click();
    }

    if (121 == tecla.keyCode && $('div#tab_3').hasClass('active')) {
        tecla.preventDefault();
        $('button#GuardarResultadoLaboratorio').click();
    }

    if (120 == tecla.keyCode && $('div#tab_3').hasClass('active')) {
        tecla.preventDefault();
        $('button#ValidarResultadoLaboratorio').click();
    }

    if (123 == tecla.keyCode && $('div#tab_3').hasClass('active')) {
        tecla.preventDefault();
        $('button#imprimirDatos').click();
    }


    //alert(tecla.keyCode);
});

function DesvalidarResultado(idConsulta, idProcedimientoLaboratorio) {

    $.ajax({
        method: "POST",
        url: "Ajax/Aj_Recepcion.php",
        data: {
            Requerimiento: "DesvalidarResultado",
            Consulta: idConsulta,
            Laboratorio: idProcedimientoLaboratorio
        },
        dataType: 'JSON',
    }).done(function (respuesta) {

        if (respuesta[0] == true) {
            swal("Esculapio!", "Resultados Desvalidados", "success");
            $("#DesvalidarInforme").attr("disabled", true);
            CargarProcedimientoPaciente($('.body').find('label#IdPacienteResultado').html(), idConsulta);
            // tableProce.clear().draw();
            //CargarPacientesLaboratoriosPorFecha();
            /* hot1.updateSettings({
                 data: []//CargarPlantillaPaciente($('.body').find('label#IdPacienteResultado').html(),idConsulta),            
             });*/
             $("#ConsultarPacientesReceptados").click();
        }
        if (respuesta[0] == false) {
            $("#DesvalidarInforme").attr("disabled", true);
            swal("Esculapio!", "Ocurrio un error. " + respuesta[1], "error");
            return;
        }

    });

}


$(".body").on('click', "button#DesvalidarInforme", function (ev) {
    DesvalidarResultado(idConsulta, idProcedimientoLaboratorioOculta);
});

$(".body").on('click', "button#exportarDatosResultado", function (ev) {
    var ht = hot1.getInstance();
    var rowcount = ht.countRows();

    tabla.clear().draw();
    var colcount = ht.countCols();
    /*var ff = $('.body div#nombreProcedimiento').find('label#nppp').text();
    var dataSet1 =[ff,"","","","",""];
    tabla.row.add(dataSet1).draw(false);*/
    var imprimir = $('.body .x_content').find('button.buttons-excel');
    for (var i = 0; i < rowcount; i++) {
        var fila = hot1.getDataAtRow(i);
        if (idProcedimientoLaboratorioOculta == fila[0]) {
            var descrp = fila[3];
            var resultado = fila[4];
            var um = fila[5];
            var refer = fila[6];
            var ref_min = fila[7];
            var ref_max = fila[8];
            var dataSet = [descrp, resultado, um, refer, ref_min, ref_max];
            tabla.row.add(dataSet).draw(false);
        }
        if (idProcedimientoLaboratorioOculta == -1) {
            var descrp = fila[3];
            var resultado = fila[4];
            var um = fila[5];
            var refer = fila[6];
            var ref_min = fila[7];
            var ref_max = fila[8];
            var dataSet = [descrp, resultado, um, refer, ref_min, ref_max];
            tabla.row.add(dataSet).draw(false);
        }
    }

    imprimir.click();
});

function printTextArea(paciente, edad, id, fecha, turnos) {
    //var fecha = $('.body').find('input#fechaMovi').val();
    //var hora = $('.body').find('label#HoraMovi').text();
    //var numeroOrden = idOrdenImprimir;
    try {
        var cabecera = '<div style="position: absolute; width:100%;"><label style="font-size:12px;">PACIENTE: ' + paciente + '</label><label style="font-size:12px;  margin-left: 3.5em;">EDAD: ' + edad + '</label><label style="font-size:12px;  margin-left: 3.5em;">HC: ' + id + '</label></div><br>';
        var cabecera2 = '<div style="width:100%; border-bottom: solid;"><label style="font-size:12px;">FECHA ATENCION: ' + fecha + '</label></div>';
        var turno = '<div style="float: right; position: relative; margin-top: -2.2em;"><label style="font-size:30px;">' + turnos + '</label></div>';

        childWindow = window.open('', '_blank');
        childWindow.document.open();
        childWindow.document.write('<html><head></head><body>');
        childWindow.document.write('<div style="width:100%">');
        childWindow.document.write(cabecera);
        childWindow.document.write(cabecera2);
        childWindow.document.write(turno);
        childWindow.document.write('<div style="width:100%; margin-top:10px;  columns: 3; -webkit-columns: 3; -moz-columns: 3; max-height: 100%;">');
        childWindow.document.write($('.body').find('ul#ListaPlantilla').html());
        childWindow.document.write('</div>');
        childWindow.document.write('</div>');
        childWindow.document.write('</body><script type="text/javascript">var tid = setInterval(function(){ window.print();clearInterval(tid);window.close();}, 500);</script></html>');

    } catch (error) {

    }
}

function ObtenerReferido(idConsulta) {
    var referido = "";
    $.ajax({
        async: false,
        method: "POST",
        url: "Ajax/Aj_Consulta.php",
        data: {
            Requerimiento: "ObtenerReferido",

            Consulta: idConsulta
        },
        dataType: 'JSON',
    }).done(function (respuesta) {
        $.each(respuesta, function (i, iten) {

            referido = iten[0];

        });
    });
    return referido;
}
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
function ObtenerQR(idConsulta) {
    var imagen = "";
    $.ajax({
        async: false,
        method: "POST",
        url: "Ajax/Aj_Procedimiento.php",
        data: {
            Requerimiento: "ObtenerQR",
            Consulta: idConsulta
        },
        dataType: 'JSON',
    }).done(function(respuesta) {
        $.each(respuesta, function(i, item) {
            imagen = '<img src="' + item + '" style="width: 150px;height: 150px;"></img>';
            imagen += '<img src="imagenes/qrsantaisabel.png" style="width: 150px;height: 150px;margin-left:3em;"></img>';
            enviapdf = "S";
            $("#enviarPorCorreo").click();
            enviapdf = "N";
        });
    });
    return imagen;
}

function printTextAreaLaboratorio1() {
    var reporte = "";
    var medicoEnvio = $('.body').find('label#medicoExamen').text().replace("MEDICO QUE ENVIO EXAMEN:", "");
    var gurdado = CargarReporteDiseno(1);
    var imagenqr = ObtenerQR(idConsulta);
    if (gurdado.length > 0) {
        var contenido = "<div id='capaprincipal'>" + gurdado[0].replace(/°/g, '"') + "</div>";
        var estilos = gurdado[1].replace(/°/g, '"');

        var datosmedico = ObtenerDatosMedico(usuarioValidoSos);

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
        contenido = contenido.replace("{identificacion}", $('.body').find('label#CedulaPacienteResultado').text() );
        contenido = contenido.replace("{medico}", medicoEnvio.replace('ORDENO :', '') );

        contenido = contenido.replace("{nombredoctor}",  usuarioValidoSos.toUpperCase());
        contenido = contenido.replace("{ceduladoctor}",  datosmedico[1] + "<br><br>" + imagenqr);
        contenido = contenido.replace("{fechavalidacion}", fechaValido.substring(0, 10));

        var primerafila = $(contenido).find("#tablaresultado").find("tr").eq(1);

        var vector = $('.body').find("#datatablePruebaRecepcion tbody tr");
        var filas = "";
        $.each(vector, function (a) {
            var procedimiento = $(this).find('td').eq(0).html();
            var resultado = $(this).find('td').eq(1).html();
            var unidad = $(this).find('td').eq(2).html();
            var descripcion = $(this).find('td').eq(3).html();
            var min = $(this).find('td').eq(4).html();
            var max = $(this).find('td').eq(5).html();
            if (procedimiento == "__") {
                procedimiento = "";
                resultado = "";
                unidad = "";
                descripcion = "";
                min = "";
                max = "";
            }
            var agregar = "<tr>" + primerafila.html().replace("{procedimiento}", procedimiento);
            agregar = agregar.replace("{resultado}", resultado);
            agregar = agregar.replace("{unidad}", unidad);
            agregar = agregar.replace("{descripcion}", descripcion);
            agregar = agregar.replace("{minimo}", min);
            agregar = agregar.replace("{maximo}", max ) + "</tr>";
            filas += agregar;
        });

        contenido = $(contenido).html().replace($(contenido).find("#tablaresultado").find("tbody").html(), filas);
        
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


//////////////////////////////////////

function CargarPlantillasProcedimiento(idPaciente) {
    $.ajax({
        method: "POST",
        url: "Ajax/Aj_Agenda.php",
        data: {
            Requerimiento: "CargarPlantillasLaboratorio",
            IdPaciente: idPaciente
        },
        dataType: 'JSON',
    }).done(function (respuesta) {
        if (respuesta[0] == false) {
            swal("Esculapio!", "Error!", "error");
            return;
        }

        try {
            tablaPlantillaProcedimiento.destroy();
        } catch (error) { }

        var filas = [];
        var nombreProce = "";
        var fecha = "";
        $.each(respuesta, function (i, value) {

            if (i == 0) {
                nombreProce = value[7];
                fecha = value[0];
            } else {
                if (nombreProce == value[7]) {
                    fecha = "";
                } else {
                    nombreProce = value[7];
                    fecha = value[0];
                }
            }

            var dataSet = [fecha, respuesta[i][1], respuesta[i][2], respuesta[i][3], respuesta[i][4], respuesta[i][5], respuesta[i][6], respuesta[i][7]];
            //tablaPlantillaProcedimiento.row.add(dataSet).draw(false);
            filas[i] = dataSet;
        });

        tablaPlantillaProcedimiento = $('#datatablePruebaAgenda').DataTable({
            scrollX: true,
            scrollY: 250,
            autoWidth: true,
            ordering: false,
            info: false,
            keys: true,
            paginate: false,
            "columnDefs": [{
                "targets": [7],
                "visible": false,
                "searchable": true
            },
            {
                "targets": [0, 1, 2, 3, 4, 5, 6],
                "searchable": false
            }
            ],
            data: filas,
            autoWidth: true
        });
    }).fail(function (jqXHR, textStatus, errorThrown) {
        console.log(errorThrown)
        //location.reload();
    });
}