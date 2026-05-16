var tablaUltimosSignos = null;
var idConsulta = 0;
var idConsultaItem = 0;
var id = 0;
var modificar = false;
tablaUltimosSignos = $('#datatableUltimosSignosVitales').DataTable(
    {
        'lengthChange': false,
        'searching': false,
        'ordering': false,
        scrollY: 300,
        scrollX: true,
        keys: true
    }
);
var tablaPacienteSignos = null;

function LlenarTablaPacienteSignos() {
    tablaPacienteSignos = $('#datatableSignosVitales').DataTable({
        "processing": true,
        "serverSide": true,
        lengthMenu: [
            [200, 400, 600],
            [200, 400, 600]
        ],
        " bFilter ": true,
        " bSort ": true,
        " bInfo ": true,
        " bAutoWidth ": true,
        "order": [],
        "ajax": {
            url: "Ajax/Aj_Signos.php",
            data: {
                Requerimiento: "CargarSignosVitales"
            },
            type: "POST"
        },
        scrollY: 300,
        scrollX: true,
        keys: true,
        scroller: {
            loadingIndicator: true
        },
        "columnDefs": [{
            "targets": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
            "orderable": false,
        },
        {
            "targets": [7, 8, 9],
            "visible": false,
        }]
    });

}
LlenarTablaPacienteSignos();

$(".body").on('change', "#FechaSigno", function (ev) {
    tablaPacienteSignos.column(1).search($('#FechaSigno').val()).draw();
});

$(".body").on('keyup', "#codigoPersonal", function (ev) {
    if (ev.keyCode == 13) {
        $("#GSigno").click();
    }
});
// evento que se activa al dar clic en el boton guardar de la caja de registrar nuevo perfil
$("body").on('submit', "form#RegistroSigno", function (evt) {
    evt.preventDefault(); // evita que se envie el formulario
    if (idConsulta == 0) {
        swal("Esculapio!", "Seleccione un paciente..!!", "error");
        return;
    }
    /*if($("#alturaSignos").val()<=0){
      swal("Esculapio!", "Ingrese la talla", "warning");
      return;
    }*/
    //$(".modalCodigo").modal();       

    var fecha = $('.body').find('input#idFechaSigno').val();
    var edad = $('.body').find('#EdadS').html();
    var triage = $('.body').find('select#AsignarS').val().trim();
    var presion = $('.body').find('input#Presi1').val() + "/" + $('.body').find('input#Presi2').val();
    var pulso = $('.body').find('input#PulsoS').val().trim();
    var fr = $('.body').find('input#frSignos').val().trim();
    var peso = $('.body').find('input#pesoSignos').val().trim();
    var talla = $('.body').find('input#alturaSignos').val().trim();
    var imc = $('.body').find('label#resultadoImcSignos').text();
    var bucal = $('.body').find('input#TempB').val().trim();
    var rectal = $('.body').find('input#TempR').val().trim();
    var axilar = $('.body').find('input#TempA').val().trim();
    var cefalico = $('.body').find('input#PeriC').val().trim();
    var abdominal = $('.body').find('input#PeriA').val().trim();
    var prioridad = $('.body').find('select#PrioridadS').val().trim();
    var limpiar = $('.body').find('button#LimpiarSigno');
    var codigo = "";//$("#codigoPersonal").val();

    var turno = $('input#turnoSigno').val();
    var paciente = $('.body').find('input#idPacienteSigno').val();
    var horaInicio = $('input#horaInicio').val();
    var horaActual = moment();
    var horaConvertida = moment(horaInicio, 'HH:mm').subtract(25, 'minutes').format('HH:mm');//Moment(horaInicio, 'HH:mm');
    var sumar = parseInt(turno) * 15;
    var total = moment(horaConvertida, 'HH:mm').add(parseInt(sumar), 'minutes').format('HH:mm');
    var horaTotal = horaActual.format('HH:mm');
    var puntual = '';

    if (horaTotal <= total) {
        puntual = 'SI';
    }
    else {
        puntual = 'NO';
    }
    GuardarSignos(idConsulta, fecha, paciente, edad, triage, presion, pulso, fr, peso, talla, imc, bucal, rectal, axilar, cefalico, abdominal, prioridad, codigo, limpiar, puntual);

});
// funcuion para registarar en la bd un nuevo perfil
function GuardarSignos(idConsulta, fecha, paciente, edad, triage, presion, pulso, fr, peso, talla, imc, bucal, rectal, axilar, cefalico, abdominal, prioridad, codigo, limpiar, puntual) {
    $.ajax({
        method: "POST",
        url: "Ajax/Aj_Signos.php",
        data: {
            Requerimiento: "GuardarSignos",
            Fecha_atencion: fecha,
            Id_paciente: paciente,
            Edad: edad,
            Triage: triage,
            Presion: presion,
            Pulso: pulso,
            FR: fr,
            Peso: peso,
            Talla: talla,
            Imc: imc,
            Priordad: prioridad,
            Temp_bucal: bucal,
            Temp_rectal: rectal,
            Temp_axilar: axilar,
            Perim_cefalico: cefalico,
            Puntual: puntual,
            Perim_abdominal: abdominal,
            Consulta: idConsulta,
            ConsultaItem: idConsultaItem,
            Codigo: codigo
        },
        dataType: 'JSON',
    }).done(function (respuesta) {
        if (respuesta[0] == true) {
            swal("Esculapio!", "Signos Vitales Guardados!", "success");
            CambiarEstadoConsultaSignos(idConsulta);
            limpiar.trigger('click');
            return;
        }
        if (respuesta[0] == false) {
            console.log(respuesta);
            swal("Esculapio!", "Ocurrio un error.", "error");
            // location.reload();
            return;
        }
    }).fail(function (jqXHR, textStatus, errorThrown) {
        console.log(errorThrown)
    });
}

$("body").on('submit', "form#RegistroSigno", function (evt) {
    evt.preventDefault(); // evita que se envie el formulario                
    if (idConsulta == 0) {
        swal("Esculapio!", "Seleccione un paciente..!!", "error");
        return;
    }
    /*if($("#alturaSignos").val()<=0){
      swal("Esculapio!", "Ingrese la talla", "warning");
      return;
    }  */
    //$(".modalCodigo").modal();

    var fecha = $('.body').find('input#idFechaSigno').val();
    var edad = $('.body').find('#EdadS').html();
    var triage = $('.body').find('select#AsignarS').val().trim();
    var presion = $('.body').find('input#Presi1').val() + "/" + $('.body').find('input#Presi2').val();
    var pulso = $('.body').find('input#PulsoS').val().trim();
    var fr = $('.body').find('input#frSignos').val().trim();
    var peso = $('.body').find('input#pesoSignos').val().trim();
    var talla = $('.body').find('input#alturaSignos').val().trim();
    var imc = $('.body').find('label#resultadoImcSignos').text();
    var bucal = $('.body').find('input#TempB').val().trim();
    var rectal = $('.body').find('input#TempR').val().trim();
    var axilar = $('.body').find('input#TempA').val().trim();
    var cefalico = $('.body').find('input#PeriC').val().trim();
    var abdominal = $('.body').find('input#PeriA').val().trim();
    var prioridad = $('.body').find('select#PrioridadS').val().trim();
    var limpiar = $('.body').find('button#LimpiarSigno');
    var codigo = "";//$("#codigoPersonal").val();

    ModificarSignos(idConsulta, fecha, edad, triage, presion, pulso, fr, peso, talla, imc, bucal, rectal, axilar, cefalico, abdominal, prioridad, codigo, limpiar);
});

function ValidarExisteCodigo(codigo) {
    var confirma = false;
    $.ajax({
        async: false,
        method: "POST",
        url: "Ajax/Aj_Signos.php",
        data: { Requerimiento: "ValidarExisteCodigo", Codigo: codigo },
        dataType: 'JSON',
    }).done(function (respuesta) {
        $.each(respuesta, function (i, value) {
            confirma = true;
        });
    }).fail(function (jqXHR, textStatus, errorThrown) {
        console.log(errorThrown)
    });
    return confirma;

}

$(".body").on('click', "button#GSigno", function (ev) {
    var fecha = $('.body').find('input#idFechaSigno').val();
    var edad = $('.body').find('#EdadS').html();
    var triage = $('.body').find('select#AsignarS').val().trim();
    var presion = $('.body').find('input#Presi1').val() + "/" + $('.body').find('input#Presi2').val();
    var pulso = $('.body').find('input#PulsoS').val().trim();
    var fr = $('.body').find('input#frSignos').val().trim();
    var peso = $('.body').find('input#pesoSignos').val().trim();
    var talla = $('.body').find('input#alturaSignos').val().trim();
    var imc = $('.body').find('label#resultadoImcSignos').text();
    var bucal = $('.body').find('input#TempB').val().trim();
    var rectal = $('.body').find('input#TempR').val().trim();
    var axilar = $('.body').find('input#TempA').val().trim();
    var cefalico = $('.body').find('input#PeriC').val().trim();
    var abdominal = $('.body').find('input#PeriA').val().trim();
    var prioridad = $('.body').find('select#PrioridadS').val().trim();
    var limpiar = $('.body').find('button#LimpiarSigno');
    var codigo = $("#codigoPersonal").val();
    if (!ValidarExisteCodigo(codigo)) {
        swal("Esculapio!", "Codigo Incorrecto", "error");
        return;
    }
    if (!modificar) {
        var turno = $('input#turnoSigno').val();
        var paciente = $('.body').find('input#idPacienteSigno').val();
        var horaInicio = $('input#horaInicio').val();
        var horaActual = moment();
        var horaConvertida = moment(horaInicio, 'HH:mm').subtract(25, 'minutes').format('HH:mm');//Moment(horaInicio, 'HH:mm');
        var sumar = parseInt(turno) * 15;
        var total = moment(horaConvertida, 'HH:mm').add(parseInt(sumar), 'minutes').format('HH:mm');
        var horaTotal = horaActual.format('HH:mm');
        var puntual = '';
        console.log(horaInicio)
        if (horaTotal <= total) {
            puntual = 'SI';
        }
        else {
            puntual = 'NO';
        }
        GuardarSignos(idConsulta, fecha, paciente, edad, triage, presion, pulso, fr, peso, talla, imc, bucal, rectal, axilar, cefalico, abdominal, prioridad, codigo, limpiar, puntual);
    } else {
        ModificarSignos(idConsulta, fecha, edad, triage, presion, pulso, fr, peso, talla, imc, bucal, rectal, axilar, cefalico, abdominal, prioridad, codigo, limpiar);
    }

});

function ModificarSignos(idConsulta, fecha, edad, triage, presion, pulso, fr, peso, talla, imc, bucal, rectal, axilar, cefalico, abdominal, prioridad, codigo, limpiar) {
    $.ajax({
        method: "POST",
        url: "Ajax/Aj_Signos.php",
        data: {
            Requerimiento: "ModificarSignos",
            Fecha_atencion: fecha,
            Edad: edad,
            Triage: triage,
            Presion: presion,
            Pulso: pulso,
            FR: fr,
            Peso: peso,
            Talla: talla,
            Imc: imc,
            Priordad: prioridad,
            Temp_bucal: bucal,
            Temp_rectal: rectal,
            Temp_axilar: axilar,
            Perim_cefalico: cefalico,
            Perim_abdominal: abdominal,
            Consulta: idConsulta,
            Id: idConsulta,
            ConsultaItem: idConsultaItem,
            Codigo: codigo
        },
        dataType: 'JSON',
    }).done(function (respuesta) {
        if (respuesta[0] == true) {
            swal("Esculapio!", "Signos Vitales Modificados!", "success");
            limpiar.trigger('click');
            return;
        }
        if (respuesta[0] == false) {
            swal("Esculapio!", "Ocurrio un error.", "error");
            return;
        }
    }).fail(function (jqXHR, textStatus, errorThrown) {
        console.log(errorThrown)
    });
}

$('.body table#datatableSignosVitales tbody').on('dblclick', 'tr', function (evt) {
    var fila = $(this).parents("table").DataTable();
    fila = fila.row($(this)).data();
    id = $(this).find('td').eq(4).find("span").attr("idPaciente");

    $('.body').find('#ApellidoP').html(fila[2] + " " + fila[3]);
    var f_nacimiento = $(this).find('td').eq(5).find("span").attr("fecha_nacimiento");
    $('#EdadS').html(calcularEdad(f_nacimiento));
    $("input#idPacienteSigno").val(id);
    $('input#turnoSigno').val($(this).find('td').eq(4).find('span').html());
    $('input#horaInicio').val(fila[7].replace(':', ''));
    $("input#idFechaSigno").val($(this).find('td').eq(4).find("span").attr("Fecha_atencion"));

    var estado = $(this).find('td').eq(6).find("button").attr("idEstado");
    $('.body').find('span#especialidad').html(fila[1]);
    var cerrar = $('.body').find('button.close');
    idConsulta = $(this).find('td').eq(4).find("span").attr("idConsulta");
    idConsultaItem = fila[9];

    modificar = false;
    if (estado == 9) {
        swal({
            title: "Esculapio",
            text: "Seguro Que Desea Modificar a : " + fila[2] + " " + fila[3],
            icon: "info",
            buttons: true,
            dangerMode: false,
        }).then((confirma) => {
            if (confirma) {
                modificar = true;
                CargarUltimos3SignosVitales(id);
                ModificarPaci($(this).find('td').eq(4).find("span").attr("idConsulta"));
                cerrar.trigger('click');
                $('button#GuardarSigno').prop('disabled', true);
                $('button#ModificarSigno').prop('disabled', false);
            } else {

            }
        });
        return;

    } else {
        $('button#GuardarSigno').prop('disabled', false);
        $('button#ModificarSigno').prop('disabled', true);
        CargarUltimos3SignosVitales(id);
        cerrar.trigger('click');
    }

});

function CargarUltimos3SignosVitales(Id_paciente) {
    $.ajax({
        method: "POST",
        url: "Ajax/Aj_Signos.php",
        data: {
            Requerimiento: "CargarUltimos3SignosVitales",
            Id: Id_paciente
        },
        dataType: 'JSON',
    }).done(function (respuesta) {
        if (respuesta[0] == false) {
            swal("Esculapio!", "OCURRIO UN ERROR.", "error");
            return;
        }
        try {
            tablaUltimosSignos.clear().draw();
        } catch (error) { }
        $.each(respuesta, function (i, value) {
            var campos = [respuesta[i][1],
            respuesta[i][2],
            respuesta[i][3],
            respuesta[i][4],
            respuesta[i][5],
            respuesta[i][6],
            respuesta[i][7],
            respuesta[i][8],
            respuesta[i][9],
            respuesta[i][10],
            respuesta[i][11],
            respuesta[i][12],
            respuesta[i][13],
            respuesta[i][14],
            respuesta[i][15],
            respuesta[i][16],
            respuesta[i][17]
            ];
            tablaUltimosSignos.row.add(campos).node().id = respuesta[i][0];
        });
        tablaUltimosSignos.draw(false);

    }).fail(function (jqXHR, textStatus, errorThrown) {
        console.log(errorThrown)
    });
}
$('.body').on('click', 'button#LimpiarSigno', function (evt) {
    $('button#GuardarSigno').prop('disabled', false);
    $('button#ModificarSigno').prop('disabled', true);
    $('button#InactivarSigno').prop('disabled', true);
    $('button#EliminarSigno').prop('disabled', true);
    $('button#ActivarSigno').attr('id', "InactivarSigno");
    $('button#InactivarSigno').removeClass("btn-default").addClass('btn-warning');
    $('button#InactivarSigno').html('<i class="fa fa-ban" aria-hidden="true"></i> Inactivar');
    $('table tr.selected').removeClass('selected');
    $('.body').find('tr[estado=2]').css("background-color", "#f39c12");
    tablaUltimosSignos.clear().draw();
    $("#PrioridadS").val("SELECCIONAR");
    $("#PrioridadS").trigger("chosen:updated");
    $("#AsignarS").val("SELECCIONAR");
    $("#AsignarS").trigger("chosen:updated");
    $("#codigoPersonal").val("");
    $('.body').find('#ApellidoP').html("");
    $('#EdadS').html("");
});



//////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////
///////////////////////CALCULO DEL IMC ///////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////
$(".body").on('keyup', "input#alturaSignos", function (evt) {
    var altura = $(this).val();
    var peso = $('input#pesoSignos').val();
    var imc = (peso / ((altura * altura) / 100)) * 100;
    if (imc != null) {
        $('label#resultadoImcSignos').text(imc.toFixed(2));
    }
});
$(".body").on('keyup', "input#pesoSignos", function (evt) {
    var altura = $('input#alturaSignos').val();
    var peso = $(this).val();
    var imc = (peso / ((altura * altura) / 100)) * 100;
    if (imc != null) {
        $('label#resultadoImcSignos').text(imc.toFixed(2));
    }
});


function CambiarEstadoConsultaSignos(idConsulta) {

    $.ajax({
        method: "POST",
        url: "Ajax/Aj_Signos.php",
        data: { Requerimiento: "CambiarEstadoConsultaSignos", ConsultaItem: idConsultaItem },
        dataType: 'JSON',
    }).done(function (respuesta) {
        if (respuesta[0] == false) {
            swal("Esculapio!", "Ocurrio un error.", "error");
        }
    }).fail(function (jqXHR, textStatus, errorThrown) {
        console.log(errorThrown)
    });

    idConsulta = 0;
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


$('#modal-consultas').on('hidden.bs.modal', function () {
    $("input#Presi1").focus();
});


$(document).keydown(function (tecla) {


    //tecla.preventDefault();

    if (112 == tecla.keyCode) {
        tecla.preventDefault();
        $('div#consultasFactura').click();
    }

    // alert(tecla.keyCode);
});

$(document).keydown(function (tecla) {


    //tecla.preventDefault();

    if (121 == tecla.keyCode) {
        tecla.preventDefault();
        $('button#GuardarSigno').click();
    }

    // alert(tecla.keyCode);
});

$(document).keydown(function (tecla) {


    //tecla.preventDefault();

    if (122 == tecla.keyCode) {
        tecla.preventDefault();
        $('button#ModificarSigno').click();
    }

    // alert(tecla.keyCode);
});


$(document).keydown(function (tecla) {


    //tecla.preventDefault();

    if (123 == tecla.keyCode) {
        tecla.preventDefault();
        $('button#LimpiarSigno').click();
    }

    // alert(tecla.keyCode);
});



function ModificarPaci(idConsulta) {

    $.ajax({
        method: "POST",
        url: "Ajax/Aj_Signos.php",
        data: {
            Requerimiento: "ModificarPaci",
            Consulta: idConsulta
        },
        dataType: 'JSON',
    }).done(function (respuesta) {
        if (respuesta[0] == false) {
            swal("Esculapio!", "OCURRIO UN ERROR.", "error");
            return;
        }

        $.each(respuesta, function (i, value) {
            idConsulta = respuesta[i][17];
            var separar = respuesta[i][5].split("/");
            $('.body').find('input#idPacienteSigno').val(respuesta[i][0]);

            $('.body').find('input#Presi1').val(separar[0]);
            $('.body').find('input#Presi2').val(separar[1]);
            $('.body').find('input#PulsoS').val(respuesta[i][6]);
            $('.body').find('input#alturaSignos').val(respuesta[i][7]);
            $('.body').find('input#pesoSignos').val(respuesta[i][8]);
            $('.body').find('label#resultadoImcSignos').html(respuesta[i][9]);
            $('.body').find('input#PeriC').val(respuesta[i][13]);
            $('.body').find('input#PeriA').val(respuesta[i][14]);
            $('.body').find('input#TempB').val(respuesta[i][10]);
            $('.body').find('input#TempR').val(respuesta[i][11]);
            $('.body').find('input#TempA').val(respuesta[i][12]);
            $('.body').find('select#AsignarS').val(respuesta[i][18]);
            $('.body').find('select#PrioridadS').val(respuesta[i][15]);
            $('.body').find('input#frSignos').val(respuesta[i][19]);
            $("#AsignarS").trigger("chosen:updated");
            $("#PrioridadS").trigger("chosen:updated");
        });

    }).fail(function (jqXHR, textStatus, errorThrown) {
        console.log(errorThrown)
    });
}

$('#modal-consultas').on('shown.bs.modal', function () {
    try {
        var tid = setInterval(function () {
            tablaPacienteSignos.columns.adjust().draw();
            clearInterval(tid);
        }, 100);
    } catch (error) {
        console.log(error);
    }

});
$('.modalCodigo').on('shown.bs.modal', function () {
    $("#codigoPersonal").focus();
});
