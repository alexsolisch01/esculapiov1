var tablaDoctores = null;
function CargarTabla() {
    tablaDoctores = $('#datatableDoctores').DataTable({
        "processing": true,
        "serverSide": true,
        "ajax": {
            url: "Ajax/Aj_Empleado.php",
            data: {
                Requerimiento: "CargarTablaMedicoAsignacionJS"
            },
            type: "POST"
        },
        scrollY: 300,
        scrollX: true,
        ordering: false,
        lengthChange: false,
        paginate: false,
    });
    tablaEspecialidades = $('#datatableEspecialidad')
        .DataTable({
            "processing": true,
            "serverSide": true,
            "ordering": false,
            'lengthChange': false,
            'paging': false,
            "ajax": {
                url: "Ajax/Aj_Especialidad.php",
                data: {
                    Requerimiento: "CargarTablaJSMante"
                },
                type: "POST"
            },
            scrollY: 300,
            "autoWidth": true,
            sScrollX: true
        });
    tablaHorario = $('#datatableHorarios')
        .DataTable({
            "processing": true,
            "serverSide": true,
            "ordering": false,
            'lengthChange': false,
            'paging': false,
            "ajax": {
                url: "Ajax/Aj_Empleado.php",
                data: {
                    Requerimiento: "CargarTablaJSH"
                },
                type: "POST"
            },
            scrollY: 200,
            "autoWidth": true,
            sScrollX: true
        });
    $('.timepicker').timepicker({
        showInputs: false,
        showMeridian: false
    });

    tablaProcedimientos = $('#datatableProcedimientos')
        .DataTable({
            "processing": true,
            "serverSide": true,
            "ordering": false,
            'lengthChange': false,
            'paging': false,
            "ajax": {
                url: "Ajax/Aj_Empleado.php",
                data: {
                    Requerimiento: "CargarTablaJSProcedimientos"
                },
                type: "POST"
            },
            scrollY: 300,
            "autoWidth": true,
            sScrollX: true,
            "drawCallback": function (settings) {
                CargarProcedimientosMedico();
            }
        });
}
CargarTabla();
var id = 0;
var idEspecialidad = 0;
$(".body").on('click', ".btnEditar", function (ev) {
    $("#capaDatos").fadeIn(0);
    var fila = tablaDoctores.row($(this).parents("tr")).data();
    $("#fotoMedico").attr("src", fila[14]);
    $("#nombreMedico").html(fila[1]);
    $("#cedulaMedico").html(fila[4]);
    $("#direccionMedico").html(fila[9]);
    $("#telefonoMedico").html(fila[7]);
    $("#emailMedico").html(fila[8]);
    id = $(this).attr("registro");
    CargarEspecialidadesMedico($(this).attr("registro"));
});

function CargarEspecialidadesMedico(id) {
    $.ajax({

        method: "POST",
        url: "Ajax/Aj_Empleado.php",
        data: { Requerimiento: "CargarEspecialidadesMedico", Empleado: id },
        dataType: 'JSON',

    }).done(function (respuesta) {
        console.log(respuesta)
        var vector = $('.body').find("#datatableEspecialidad tbody tr");
        $('.body').find("#datatableEspecialidad tbody tr input").prop('checked', false);
        $('.body').find("#datatableEspecialidad tbody tr select").val(1);
        $("#especialidadesAsignadas").empty();
        var clase = '';
        $.each(respuesta, function (i, value) {
            $.each(vector, function (a) {
                var idFila = $(this).find("input").attr("id");
                if (idFila == value[0]) {
                    $(this).find("td").find('input').prop('checked', true);
                    $(this).find("td").find('select').val(value[1]);

                    if (clase == "label label-info") {
                        clase = "label label-success";
                    }
                    if (clase == "label label-danger") {
                        clase = "label label-info";
                    }
                    if (clase == "label label-success") {
                        clase = "label label-danger";
                    }
                    if (clase == "") {
                        clase = "label label-success";
                    }
                    $("#especialidadesAsignadas").append('<span id="' + idFila + '" class="btn btnEspecialidad ' + clase + '">' + $(this).find("td").eq(0).html() + " - " + $(this).find("td").find('select option:selected').html() + '</span>');
                }
            });
        });
    }).fail(function (jqXHR, textStatus, errorThrown) {
        console.log(errorThrown);
    });
}
$(".body").on('click', ".btnEspecialidad", function (ev) {
    idEspecialidad = $(this).attr("id");
    tablaHorario.column(1).search(id);
    tablaHorario.column(2).search(idEspecialidad).draw();
    tablaProcedimientos.column(1).search(idEspecialidad).draw();
    $("#nombreEspecialidad").html("HORARIOS - " + $(this).html());
    $("#capaEspecialidad").fadeIn(0);
    if($(this).html().includes("PRESTADOS")){
        $("#capaProcedimientos").fadeIn(0);
    }else{
        $("#capaProcedimientos").fadeOut(0);
    }
});
function CargarProcedimientosMedico() {

    $.ajax({

        method: "POST",
        url: "Ajax/Aj_Empleado.php",
        data: { Requerimiento: "CargarProcedimientosMedico", Empleado: id, Especialidad: idEspecialidad },
        dataType: 'JSON',

    }).done(function (respuesta) {
        console.log(respuesta)
        var vector = $('.body').find("#datatableProcedimientos tbody tr");
        $('.body').find("#datatableProcedimientos tbody tr input.chProcdimiento").prop('checked', false);
        $('.body').find("#datatableProcedimientos tbody tr input.Valor").val("");
        $('.body').find("#datatableProcedimientos tbody tr select").val('PORCENTAJE');
        $.each(respuesta, function (i, value) {
            $.each(vector, function (a) {
                var idFila = $(this).find(".chProcdimiento").attr("id");
                if (idFila == value[0]) {
                    $(this).find("td").find('input.chProcdimiento').prop('checked', true);
                    $(this).find("td").find('select').val(value[1]);
                    $(this).find("td").find('input.Valor').val(value[2]);
                }
            });
        });
    }).fail(function (jqXHR, textStatus, errorThrown) {
        console.log(errorThrown);
    });
}

$('.body').on('click', '.EliminarH', function (evt) {
    if (ValidarSiTieneAgendado(idEspecialidad, $(this).parents("tr").find("td").eq(0).html())) {
        swal("Esculapio!", "No se puede eliminar porque el Medico tiene pacientes agendados.", "warning");
        return;
    }
    var idHorario = $(this).attr('id');
    swal({
        title: "Esculapio",
        text: "Seguro Que Desea Eliminar  ?",
        icon: "info",
        buttons: true,
        dangerMode: true,
    }).then((confirma) => {
        if (confirma) {
            EliminarHorario(idHorario);
        } else { }
    });
});

function EliminarHorario(id) {
    $.ajax({
        method: "POST",
        url: "Ajax/Aj_Empleado.php",
        data: {
            Requerimiento: "EliminarHorario",
            Id: id
        },
        dataType: 'JSON',
    }).done(function (respuesta) {
        if (respuesta[0] == true) {
            tablaHorario.search("").draw();
            return;
        }
        if (respuesta[0] == false) {
            swal("Esculapio!", "Ocurrio un error al eliminar.", "error");
            return;
        }
    }).fail(function (jqXHR, textStatus, errorThrown) {
        console.log(errorThrown);
    });
}
$('.body').on('click', '#GuardarHorario', function (evt) {
    GuardarHorario();
});

function GuardarHorario() {
    $.ajax({
        method: "POST",
        url: "Ajax/Aj_Empleado.php",
        data: {
            Requerimiento: "GuardarHorario",
            Empleado: id,
            Especialidad: idEspecialidad,
            Dia: $("#cbmDia").val(),
            HoraI: $("#horai").val(),
            HoraF: $("#horaf").val(),
            Turnos: $("#turnos").val()
        },
        dataType: 'JSON',
    }).done(function (respuesta) {
        if (respuesta[0] == true) {
            $("#cbmDia").val("LUNES");
            $("#turnos").val("");
            tablaHorario.search("").draw();
            return;
        }
        if (respuesta[0] == false) {
            swal("Esculapio!", "Ocurrio un error al guardar.", "error");
            return;
        }
    }).fail(function (jqXHR, textStatus, errorThrown) {
        console.log(errorThrown);
    });
}
function ValidarSiTieneAgendado(especialidad, dia = "") {
    var confirma = false;
    $.ajax({
        async: false,
        method: "POST",
        url: "Ajax/Aj_Empleado.php",
        data: { Requerimiento: "ValidarSiTieneAgendado", Empleado: id, Especialidad: especialidad, Dia: dia },
        dataType: 'JSON',

    }).done(function (respuesta) {
        $.each(respuesta, function (i, value) {
            confirma = true;
        });
    }).fail(function (jqXHR, textStatus, errorThrown) {
        console.log(errorThrown);
    });
    return confirma;
}
$('.body').on('change', '.chProcdimiento', function (evt) {
    if ($(this).parents('tr').find('input.Valor').val() == "") {
        swal("Sistema!", "Ingrese el valor o porcentaje de comisión.", "warning");
        $(this).prop("checked", false);
        return;
    }
    if ($(this).parents('tr').find('select').val() == "PORCENTAJE") {
        if ($(this).parents('tr').find('input.Valor').val() > 100) {
            swal("Sistema!", "El PORCENTAJE no  puede ser mayor a 100.", "warning");
            $(this).prop("checked", false);
            return;
        }
    } else {
        if (parseFloat($(this).parents('tr').find('input.Valor').val()) > parseFloat($(this).parents('tr').find('td').eq(2).html())) {
            swal("Sistema!", "El Valor no  puede ser mayor al precio.", "warning");
            $(this).prop("checked", false);
            return;
        }
    }
    var accion = "Eliminar";
    if ($(this).prop("checked")) {
        accion = "Agregar";
    }
    $.ajax({
        method: "POST",
        url: "Ajax/Aj_Empleado.php",
        data: {
            Requerimiento: "AgregarProcedimiento",
            Empleado: id,
            Procedimiento: $(this).attr("id"),
            Tipo: $(this).parents('tr').find('select').val(),
            Valor: $(this).parents('tr').find('input.Valor').val(),
            Accion: accion
        },
        dataType: 'JSON',
    }).done(function (respuesta) {
        console.log(respuesta);
    }).fail(function (jqXHR, textStatus, errorThrown) {
        console.log(errorThrown);
    });
});

$('.body').on('change', '.chEspecialidad', function (evt) {
    if (ValidarSiTieneAgendado($(this).attr("id"))) {
        if (!$(this).prop("checked")) {
            swal("Esculapio!", "No se puede eliminar la especialidad porque el Medico tiene pacientes agendados.", "warning");
            $(this).prop("checked", true);
        }
        return;
    }
    var accion = "Eliminar";
    if ($(this).prop("checked")) {
        accion = "Agregar";
    }
    if(accion=="Eliminar"){
        swal({
            title: "Sistema",
            text: "Seguro Que Desea Eliminar La Especialidad "+$(this).parents("tr").find("td").eq(0).html()+"\n(Tambien se eliminaran los horarios y procedimientos asignados en esta especialidad)",
            icon: "info",
            buttons: true,
            dangerMode: true,
        })
            .then((confirma) => {
                if (confirma) {
                    $.ajax({
                        method: "POST",
                        url: "Ajax/Aj_Empleado.php",
                        data: {
                            Requerimiento: "AgregarEspecialidad",
                            Empleado: id,
                            Especialidad: $(this).attr("id"),
                            Relacion: $(this).parents('tr').find('select').val(),
                            Accion: accion
                        },
                        dataType: 'JSON',
                    }).done(function (respuesta) {
                        console.log(respuesta);
                    }).fail(function (jqXHR, textStatus, errorThrown) {
                        console.log(errorThrown);
                
                    });
                }else{
                    $(this).prop("checked", true);
                }
            });
    }
});

$(".body").on('click', "#btnActualizar", function (ev) {
    swal({
        title: "Sistema",
        text: "Seguro Que Desea Actualizar",
        icon: "info",
        buttons: true,
        dangerMode: false,
    })
        .then((confirma) => {
            if (confirma) {
                ActualizarDatosMedico();
            }
        });
});

function ObtenerEspecialidades() {
    var productos = [];
    var i = 0;
    var vector = $("body").find("#datatableEspecialidad tbody tr");
    $.each(vector, function (a) {
        if ($(this).find("input").prop("checked")) {
            var especialidad = $(this).find("input").attr("id");
            var reclacion = $(this).find("select").val();
            var lineaDetalle = [especialidad, reclacion];
            productos[i] = lineaDetalle;
            i++;
        }
    });
    return JSON.stringify(productos);
}
function ActualizarDatosMedico() {
    $.ajax({
        method: "POST",
        url: "Ajax/Aj_Empleado.php",
        data: {
            Requerimiento: "ActualizarDatosMedico",
            Empleado: id,
            Detalle: ObtenerEspecialidades()
        },
        dataType: 'JSON',
    }).done(function (respuesta) {
        if (respuesta[0] == true) {
            swal("Esculapio!", "Actualizado con exito.", "success");
        }
        if (respuesta[0] == false) {
            swal("Esculapio!", "Ocurrio un error al actualizar.", "error");
            return;
        }
    }).fail(function (jqXHR, textStatus, errorThrown) {
        console.log(errorThrown);
    });
}