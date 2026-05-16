var id = 0;
$('.timepicker').timepicker({
    showInputs: false,
    showMeridian: false
});

$("body").on('click', "#nuevoRegistroGrupo", function (ev) {
    $('#GuardarExaRx').fadeIn(0);
    $('#ModificarExaRx').fadeOut(0);
    id = 0;
    $("#NombreExaRx").val("");
    $("#OrdenExaRx").val("");
    $(".modalNuevoGrupo").modal();
});

$(".body").on('click', "button#GuardarExaRx", function (ev) {
    $(".body").on('submit', "form#RegistroExamenesRx", function (evt) {
        evt.preventDefault(); // evita que se envie el formulario
        var nombre = $(this).find('input#NombreExaRx').val().trim();
        var OrdenExa = $(this).find('input#OrdenExaRx').val().trim();
        var campos = {
            nombre
        };
        if (CamposLLenos(campos)) {
            return;
        }
        swal({
            title: "Esculapio",
            text: "Seguro Que Desea Guardar?",
            icon: "info",
            buttons: true,
            dangerMode: false,
        }).then((confirma) => {
            if (confirma) {
                GuardarExamenesRx(nombre, OrdenExa);
            } else {
            }
        });
    });
});

function GuardarExamenesRx(nombre, OrdenExa) {
    $.ajax({
        method: "POST",
        url: "Ajax/Aj_Rx.php",
        data: {
            Requerimiento: "GuardaExamenRx",
            Orden: OrdenExa,
            Nombre: nombre
        },
        dataType: 'JSON',
    }).done(function (respuesta) {
        if (respuesta[0] == true) {
            swal("Esculapio!", "Examen Guardado.!", "success");
            tablaexamenes.draw();
            $(".modalNuevoGrupo").modal("hide");
            return;
        }
        if (respuesta[0] == false) {
            if (respuesta[1] == 23000) {
                swal("Esculapio!", "Su registro de examen ya existe... !!", "error");
                return;
            }
            wal("Esculapio!", "Ocurrio un error.", "error");
            return;
        }
    }).fail(function (jqXHR, textStatus, errorThrown) {
        console.log(errorThrown)
    });
}
$(".body").on('click', "button#ModificarExaRx", function (ev) {
    $(".body").on('submit', "form#RegistroExamenesRx", function (evt) {
        evt.preventDefault(); // evita que se envie el formulario
        var nombre = $(this).find('input#NombreExaRx').val().trim();
        var OrdenExa = $(this).find('input#OrdenExaRx').val().trim();
        var campos = {
            nombre
        };
        if (CamposLLenos(campos)) {
            return;
        }
        swal({
            title: "Esculapio",
            text: "Seguro Que Desea Modificar?",
            icon: "info",
            buttons: true,
            dangerMode: false,
        }).then((confirma) => {
            if (confirma) {
                ModificarExamenRx(nombre, OrdenExa);
            } else {
            }
        });
    });
});

function ModificarExamenRx(nombre, OrdenExa) {
    $.ajax({
        method: "POST",
        url: "Ajax/Aj_Rx.php",
        data: {
            Requerimiento: "ModificaExamenRx",
            Nombre: nombre,
            Id: id,
            Orden: OrdenExa
        },
        dataType: 'JSON',
    }).done(function (respuesta) {
        if (respuesta[0] == true) {
            swal("Esculapio!", "Examen Modificado..!", "success");
            tablaexamenes.draw();
            $(".modalNuevoGrupo").modal("hide");
            return;
        }
        if (respuesta[0] == false) {
            if (respuesta[1] == 23000) {
                swal("Esculapio!", "Su registro de examen ya existe... !!", "error");
                return;
            }
            swal("Esculapio!", "Ocurrio un Error.", "error");
            return;
        }
    }).fail(function (jqXHR, textStatus, errorThrown) {
        console.log(errorThrown)
    });
}
$("body #datatableExamenesRx").on('click', ".btnEliminar", function (ev) {
    id = $(this).attr("registro");
    swal({
        title: "Esculapio",
        text: "Seguro Que Desea Eliminar?",
        icon: "warning",
        buttons: true,
        dangerMode: true,
    }).then((confirma) => {
        if (confirma) {
            EliminarExamenRx(id);
        } else {

        }
    });
});

function EliminarExamenRx(id) {
    $.ajax({
        method: "POST",
        url: "Ajax/Aj_Rx.php",
        data: {
            Requerimiento: "EliminaExamenRx",
            Id: id
        },
        dataType: 'JSON',
    }).done(function (respuesta) {
        if (respuesta[0] == true) {
            swal("Esculapio!", "Muestra Eliminada..!", "success");
            tablaexamenes.draw();
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
$('.body table#datatableExamenesRx').on('click', '.btnEditar', function (evt) {
    id = $(this).attr("registro");
    var posiciones = [1, 4];
    var nombre = $('.body').find('input#NombreExaRx');
    var OrdenExa = $('.body').find('input#OrdenExaRx');
    var fila = tablaexamenes.row($(this).parents("tr")).data();
    var campos = [nombre, OrdenExa];
    CargarFila(posiciones, campos, fila);
    $('#GuardarExaRx').fadeOut(0);
    $('#ModificarExaRx').fadeIn(0);
    $(".modalNuevoGrupo").modal();
});


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

$("body").on('click', "#nuevoRegistroEntidad", function (ev) {
    $('#GuardarEntidadRx').fadeIn(0);
    $('#ModificarEntidadRx').fadeOut(0);
    id = 0;
    $("#NombreEntidadRx").val("");
    $("#ValorRx").val("");
    $("#cbmMedicoEntidadRx").val("0");
    $("#PagoRx").val("PORCENTAJE");
    $(".tablaGrupoEstadistico").find("input[type=checkbox]").prop("checked", false);
    $('.selectpicker').selectpicker('refresh');
    $(".modalNuevoEntidad").modal();
});

$(".body").on('click', "button#GuardarEntidadRx", function (ev) {
    $(".body").on('submit', "form#RegistroEntidadRx", function (evt) {
        evt.preventDefault(); // evita que se envie el formulario
        var nombre = $(this).find('input#NombreEntidadRx').val().trim();
        var responsable = $(this).find('select#cbmMedicoEntidadRx').val();
        var nr = $('.body').find('select#cbmMedicoEntidadRx option:selected').text().trim();
        var pago = $(this).find('select#PagoRx').val();
        var valor = $(this).find('input#ValorRx').val().trim();
        var campos = {
            nombre, responsable
        };
        if (CamposLLenos(campos)) {
            swal("Esculapio!", "Seleccione Un Responsable... !!", "error");
            return;
        }
        if (nr == 'SELECCIONAR..') {
            responsable = 52;
            nr = 'NINGUNO';
        }
        swal({
            title: "Esculapio",
            text: "Seguro Que Desea Guardar?",
            icon: "info",
            buttons: true,
            dangerMode: false,
        }).then((confirma) => {
            if (confirma) {
                GuardarEntidadRx(nombre, responsable, nr, pago, valor);
            } else {

            }
        });
    });
});


function GuardarHorario(idEntidad, dia, hi, hf) {

    $.ajax({
        method: "POST",
        url: "Ajax/Aj_Rx.php",
        data: {
            Requerimiento: "EliminarEntidadHorario",
            Entidad: idEntidad
        },
        dataType: 'JSON',
    }).done(function (respuesta) {
        if (respuesta[0] == false) {
            swal("Esculapio!", "Ocurrio un error al guardar el horario para el Dia: " + dia, "error");
            // location.reload();
            return;
        } else {

            $.ajax({
                method: "POST",
                url: "Ajax/Aj_Rx.php",
                data: {
                    Requerimiento: "GuardarEntidadHorario",
                    Entidad: idEntidad,
                    Dia: dia,
                    HoraI: hi,
                    HoraF: hf
                },
                dataType: 'JSON',
            }).done(function (respuesta) {
                if (respuesta[0] == false) {
                    swal("Esculapio!", "Ocurrio un error al guardar el horario para el Dia: " + dia, "error");
                    // location.reload();
                    return;
                }
            }).fail(function (jqXHR, textStatus, errorThrown) {
                swal("Esculapio!", "Ocurrio un error consulte con la administracion..!  " + respuesta[0] + " Se cargara la pantalla nuevamente para solucionar el problema.", "error");
                //location.reload();
            });
        }
    }).fail(function (jqXHR, textStatus, errorThrown) {
        swal("Esculapio!", "Ocurrio un error consulte con la administracion..!  " + respuesta[0] + " Se cargara la pantalla nuevamente para solucionar el problema.", "error");
        //location.reload();
    });


}

function GuardarEntidadRx(nombre, responsable, nr, pago, valor) {
    $.ajax({
        method: "POST",
        url: "Ajax/Aj_Rx.php",
        data: {
            Requerimiento: "GuardaEntidadRx",
            Nombre: nombre,
            Responsable: responsable,
            Pago: pago,
            Valor: valor
        },
        dataType: 'JSON',
    }).done(function (respuesta) {
        if (respuesta[0] == true) {

            var vector = $('.body').find("#datatableHorarioRx tbody tr");

            var fila = JSON.parse(respuesta[1]);

            $.each(vector, function (a) {
                var checkDia = $(this).find('input[type=checkbox]');
                var dia = checkDia.val();
                var hi = $(this).find('input[name=horai]').val();
                var hf = $(this).find('input[name=horaf]').val();
                if (checkDia.prop('checked')) {
                    GuardarHorario(fila[0][0], dia, hi, hf)
                }
            });

            swal("Esculapio!", "Responsable guardardo.!", "success");
            tablaentidad.draw();
            $(".modalNuevoEntidad").modal("hide");
            return;
        }
        if (respuesta[0] == false) {
            if (respuesta[1] == 23000) {
                swal("Esculapio!", "Responsable ya existe... !!", "error");
                return;
            }
            wal("Esculapio!", "Ocurrio un error.", "error");
            return;
        }
    }).fail(function (jqXHR, textStatus, errorThrown) {
        console.log(errorThrown)
    });
}
$(".body").on('click', "button#ModificarEntidadRx", function (ev) {
    $(".body").on('submit', "form#RegistroEntidadRx", function (evt) {
        evt.preventDefault(); // evita que se envie el formulario
        var nombre = $(this).find('input#NombreEntidadRx').val().trim();
        var responsable = $(this).find('select#cbmMedicoEntidadRx').val();
        var nr = $('.body').find('select#cbmMedicoEntidadRx option:selected').text().trim();

        var pago = $(this).find('select#PagoRx').val();
        var valor = $(this).find('input#ValorRx').val().trim();

        var campos = {
            nombre, responsable
        };
        if (CamposLLenos(campos)) {
            swal("Esculapio!", "Seleccione Un Responsable... !!", "error");
            return;
        }
        if (nr == 'SELECCIONAR..') {
            nr = 'NINGUNO';
        }
        swal({
            title: "Esculapio",
            text: "Seguro Que Desea Modificar?",
            icon: "info",
            buttons: true,
            dangerMode: false,
        }).then((confirma) => {
            if (confirma) {
                ModificarEntidadRx(nombre, responsable, nr, pago, valor);
            } else {

            }
        });
    });
});

function ModificarEntidadRx(nombre, responsable, nr, pago, valor) {
    $.ajax({
        method: "POST",
        url: "Ajax/Aj_Rx.php",
        data: {
            Requerimiento: "ModificaEntidadRx",
            Nombre: nombre,
            Responsable: responsable,
            Id: id,
            Pago: pago,
            Valor: valor

        },
        dataType: 'JSON',
    }).done(function (respuesta) {
        if (respuesta[0] == true) {

            var vector = $('.body').find("#datatableHorarioRx tbody tr");

            var fila = JSON.parse(respuesta[1]);

            $.each(vector, function (a) {
                var checkDia = $(this).find('input[type=checkbox]');
                var dia = checkDia.val();
                var hi = $(this).find('input[name=horai]').val();
                var hf = $(this).find('input[name=horaf]').val();
                if (checkDia.prop('checked')) {
                    GuardarHorario(fila[0][0], dia, hi, hf)
                }
            });

            swal("Esculapio!", "Responsable Modificado..!", "success");
            tablaentidad.draw();
            $(".modalNuevoEntidad").modal("hide");
            return;
        }
        if (respuesta[0] == false) {
            if (respuesta[1] == 23000) {
                swal("Esculapio!", "Entidad ya existe... !!", "error");
                return;
            }
            swal("Esculapio!", "Ocurrio un error.", "error");
            return;
        }
    }).fail(function (jqXHR, textStatus, errorThrown) {
        console.log(errorThrown)
    });
}
$("body #datatableEntidadRx").on('click', ".btnEliminar", function (ev) {
    id = $(this).attr("registro");
    swal({
        title: "Esculapio",
        text: "Seguro Que Desea Eliminar?",
        icon: "warning",
        buttons: true,
        dangerMode: true,
    }).then((confirma) => {
        if (confirma) {
            EliminarEntidadRx(id);
        } else {

        }
    });
});

function EliminarEntidadRx(id) {
    $.ajax({
        method: "POST",
        url: "Ajax/Aj_Rx.php",
        data: {
            Requerimiento: "EliminaEntidadRx",
            Id: id
        },
        dataType: 'JSON',
    }).done(function (respuesta) {
        if (respuesta[0] == true) {
            swal("Esculapio!", "Entidad Eliminada..!", "success");
            tablaentidad.draw();
            return;
        }
        if (respuesta[0] == false) {
            swal("Esculapio!", "Ocurrio un Error.", "error");
            return;
        }
    }).fail(function (jqXHR, textStatus, errorThrown) {
        console.log(errorThrown)
    });
}

function CargarHorarioEntidad(idEntidad) {

    $.ajax({
        async: false,
        method: "POST",
        url: "Ajax/Aj_Rx.php",
        data: {
            Requerimiento: "CargarHorarioEntidad",
            Entidad: idEntidad
        },
        dataType: 'JSON',
    }).done(function (horarios) {
        $.each(horarios, function (h, iten) {

            $('.body').find("#datatableHorarioRx tbody tr").each(function (th) {
                //alert($(this).html());
                var checkDia = $(this).find('input[type=checkbox]');
                var dia = checkDia.val();
                var hi = $(this).find('input[name=horai]');
                var hf = $(this).find('input[name=horaf]');

                if (dia == horarios[h][1]) {
                    checkDia.trigger('click');
                    hi.val(horarios[h][2]);
                    hf.val(horarios[h][3]);

                }
            });
        });
    });
}

$('.body table#datatableEntidadRx').on('click', '.btnEditar', function (evt) {
    id = $(this).attr("registro");
    var posiciones = [1, 2, 3, 4];
    var nombre = $('.body').find('input#NombreEntidadRx');
    var responsable = $('.body').find('select#cbmMedicoEntidadRx');
    var pago = $('.body').find('select#PagoRx');
    var valor = $('.body').find('input#ValorRx');
    var fila = tablaentidad.row($(this).parents("tr")).data();
    var campos = [nombre, responsable, pago, valor];
    CargarFila(posiciones, campos, fila);
    
    $('.selectpicker').selectpicker('refresh');

    $('#GuardarEntidadRx').fadeOut(0);
    $('#ModificarEntidadRx').fadeIn(0);
    $(".modalNuevoEntidad").modal();
    CargarHorarioEntidad(id);
});

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

$("body").on('click', "#nuevoRegistroEquipo", function (ev) {
    $('#GuardarEquipoRx').fadeIn(0);
    $('#ModificarEquipoRx').fadeOut(0);
    id = 0;
    $("#NombreEquipoRx").val("");
    $(".modalNuevoEquipo").modal();
});

$(".body").on('click', "button#GuardarEquipoRx", function (ev) {
    $(".body").on('submit', "form#RegistroEquipoRx", function (evt) {
        evt.preventDefault(); // evita que se envie el formulario
        var nombre = $(this).find('input#NombreEquipoRx').val().trim();
        var campos = {
            nombre
        };
        if (CamposLLenos(campos)) {
            return;
        }
        swal({
            title: "Esculapio",
            text: "Seguro Que Desea Guardar?",
            icon: "info",
            buttons: true,
            dangerMode: false,
        }).then((confirma) => {
            if (confirma) {
                GuardarEquipoRx(nombre);
            } else {

            }
        });
    });
});

function GuardarEquipoRx(nombre) {
    $.ajax({
        method: "POST",
        url: "Ajax/Aj_Rx.php",
        data: {
            Requerimiento: "GuardaEquipoRx",
            Nombre: nombre
        },
        dataType: 'JSON',
    }).done(function (respuesta) {
        if (respuesta[0] == true) {
            swal("Esculapio!", "Equipo Guardado.!", "success");
            tablaequipo.draw();
            $(".modalNuevoEquipo").modal("hide");
            return;
        }
        if (respuesta[0] == false) {
            if (respuesta[1] == 23000) {
                swal("Esculapio!", "Su equipo ya existe... !!", "error");
                return;
            }
            swal("Esculapio!", "Ocurrio un Error.", "error");
            return;
        }
    }).fail(function (jqXHR, textStatus, errorThrown) {
        console.log(errorThrown)
    });
}
$(".body").on('click', "button#ModificarEquipoRx", function (ev) {
    $(".body").on('submit', "form#RegistroEquipoRx", function (evt) {
        evt.preventDefault(); // evita que se envie el formulario
        var nombre = $(this).find('input#NombreEquipoRx').val().trim();
        var campos = {
            nombre
        };
        if (CamposLLenos(campos)) {
            return;
        }
        swal({
            title: "Esculapio",
            text: "Seguro Que Desea Modificar?",
            icon: "info",
            buttons: true,
            dangerMode: false,
        }).then((confirma) => {
            if (confirma) {
                ModificarEquipoRx(nombre);
            } else {
            }
        });
    });
});

function ModificarEquipoRx(nombre) {
    $.ajax({
        method: "POST",
        url: "Ajax/Aj_Rx.php",
        data: {
            Requerimiento: "ModificaEquipoRx",
            Nombre: nombre,
            Id: id
        },
        dataType: 'JSON',
    }).done(function (respuesta) {
        if (respuesta[0] == true) {
            swal("Esculapio!", "Equipo Modificado..!", "success");
            tablaequipo.draw();
            $(".modalNuevoEquipo").modal("hide");
            return;
        }
        if (respuesta[0] == false) {
            if (respuesta[1] == 23000) {
                swal("Esculapio!", "Su equipo ya existe... !!", "error");
                return;
            }
            swal("Esculapio!", "Ocurrio un Error.", "error");
            return;
        }
    }).fail(function (jqXHR, textStatus, errorThrown) {
        console.log(errorThrown)
    });
}
$("body #datatableEquipoRx").on('click', ".btnEliminar", function (ev) {
    id = $(this).attr("registro");
    swal({
        title: "Esculapio",
        text: "Seguro Que Desea Eliminar?",
        icon: "warning",
        buttons: true,
        dangerMode: true,
    }).then((confirma) => {
        if (confirma) {
            EliminarEquipoRx(id);
        } else {

        }
    });
});

function EliminarEquipoRx(id) {
    $.ajax({
        method: "POST",
        url: "Ajax/Aj_Rx.php",
        data: {
            Requerimiento: "EliminaEquipoRx",
            Id: id
        },
        dataType: 'JSON',
    }).done(function (respuesta) {
        if (respuesta[0] == true) {
            swal("Esculapio!", "Equipo Eliminado..!", "success");
            tablaequipo.draw();
            $(".modalNuevoEquipo").modal("hide");
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
$('.body table#datatableEquipoRx').on('click', '.btnEditar', function (evt) {
    id = $(this).attr("registro");
    var posiciones = [1];
    var nombre = $('.body').find('input#NombreEquipoRx');
    var fila = tablaequipo.row($(this).parents("tr")).data();
    var campos = [nombre];
    CargarFila(posiciones, campos, fila);
    $('#GuardarEquipoRx').fadeOut(0);
    $('#ModificarEquipoRx').fadeIn(0);
    $(".modalNuevoEquipo").modal();
});
$('.body').on('click', 'button#LimpiarEquipoRx', function (evt) {
    $('button#GuardarEquipoRx').prop('disabled', false);
    $('button#ModificarEquipoRx').prop('disabled', true);
    $('button#InactivarEquipoRx').prop('disabled', true);
    $('button#EliminarEquipoRx').prop('disabled', true);
    $('button#ActivarEquipoRx').attr('id', "InactivarEquipoRx");
    $('button#InactivarEquipoRx').removeClass("btn-default").addClass('btn-warning');
    $('button#InactivarEquipoRx').html('<i class="fa fa-ban" aria-hidden="true"></i> Inactivar');
    $('table tr.selected').removeClass('selected');
    $('.body').find('tr[estado=2]').css("background-color", "#f39c12");
});

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

$("body").on('click', "#nuevoRegistroProcedimiento", function (ev) {
    $('#GuardarProLabRx').fadeIn(0);
    $('#ModificarProLabRx').fadeOut(0);
    id = 0;
    $("#NombreProLabRx").val("");
    $("#ComboGrupoRx").val("0");
    $("#PvpRx").val("");
    $('.selectpicker').selectpicker('refresh');
    $(".modalNuevoProcedimiento").modal();
});

$(".body").on('click', "button#GuardarProLabRx", function (ev) {
    $(".body").on('submit', "form#RegistroProLabRx", function (evt) {
        evt.preventDefault(); // evita que se envie el formulario
        var nombre = $(this).find('input#NombreProLabRx').val().trim();
        var grupo = $(this).find('select#ComboGrupoRx').val();
        var equipo = $(this).find('select#ComboEquipoRx').val();
        var n = parseFloat($(this).find('input#PvpRx').val().trim());
        var pvp = n.toFixed(2);
        var ng = $('.body').find('select#ComboGrupoRx option:selected').text().trim();
        var nep = $('.body').find('select#ComboEquipoRx option:selected').text().trim();
        if (grupo == 0) {
            swal("Esculapio!", "Debe seleccionar un Grupo de Examen", "error");
            return;
        }

        var campos = {
            nombre
        };
        if (CamposLLenos(campos)) {
            return;
        }

        swal({
            title: "Esculapio",
            text: "Seguro Que Desea Guardar?",
            icon: "info",
            buttons: true,
            dangerMode: false,
        }).then((confirma) => {
            if (confirma) {
                GuardarProLabRx(nombre, grupo, equipo, pvp, ng, nep);
            } else {

            }
        });
    });
});

function GuardarProLabRx(nombre, grupo, equipo, pvp, ng, nep) {
    $.ajax({
        method: "POST",
        url: "Ajax/Aj_Rx.php",
        data: {
            Requerimiento: "GuardaProLabRx",
            Nombre: nombre,
            Grupo: grupo,
            Equipo: equipo,
            Pvp: pvp
        },
        dataType: 'JSON',
    }).done(function (respuesta) {
        if (respuesta[0] == true) {
            swal("Esculapio!", "Procedimiento Guardado.!", "success");
            tablaProcedimientos.draw();
            $(".modalNuevoProcedimiento").modal("hide");
            return;
        }
        if (respuesta[0] == false) {
            if (respuesta[1] == 23000) {
                swal("Esculapio!", "Su laboratorio ya existe... !!", "error");
                return;
            }
            if (respuesta[1] == 1062) {
                swal("Esculapio!", "Ya Existe En La Base De Datos Un Procedimiento Con Ese Nombre !!", "error");
                return;
            }
            swal("Esculapio!", "No Se Pudo Guardar El Procedimiento!" + respuesta[1], "error");
            return;
        }
    }).fail(function (jqXHR, textStatus, errorThrown) {
        console.log(errorThrown)
    });
}
$(".body").on('click', "button#ModificarProLabRx", function (ev) {
    $(".body").on('submit', "form#RegistroProLabRx", function (evt) {
        evt.preventDefault(); // evita que se envie el formulario
        var nombre = $(this).find('input#NombreProLabRx').val().trim();
        var grupo = $(this).find('select#ComboGrupoRx').val();
        var equipo = $(this).find('select#ComboEquipoRx').val();
        var pvp = $(this).find('input#PvpRx').val().trim();
        var ng = $('.body').find('select#ComboGrupoRx option:selected').text().trim();
        var nep = $('.body').find('select#ComboEquipoRx option:selected').text().trim();
        if (grupo == 0) {
            swal("Esculapio!", "Debe seleccionar un Grupo de Examen", "error");
            return;
        }
        if (equipo == 0) {
            swal("Esculapio!", "Debe seleccionar un Equipo Periferico", "error");
            return;
        }

        var campos = {
            nombre
        };
        if (CamposLLenos(campos)) {
            return;
        }
        swal({
            title: "Esculapio",
            text: "Seguro Que Desea Modificar?",
            icon: "info",
            buttons: true,
            dangerMode: false,
        }).then((confirma) => {
            if (confirma) {
                ModificarProLabRx(nombre, grupo, equipo, pvp, ng, nep);
            } else {

            }
        });
    });
});

function ModificarProLabRx(nombre, grupo, equipo, pvp, ng, nep) {

    $.ajax({
        method: "POST",
        url: "Ajax/Aj_Rx.php",
        data: {
            Requerimiento: "ModificaProLabRx",
            Nombre: nombre,
            Grupo: grupo,
            Equipo: equipo,
            Pvp: pvp,
            Id: id
        },
        dataType: 'JSON',
    }).done(function (respuesta) {
        if (respuesta[0] == true) {
            swal("Esculapio!", "Equipo Modificado..!", "success");
            tablaProcedimientos.draw();
            $(".modalNuevoProcedimiento").modal("hide");
            return;
        }
        if (respuesta[0] == false) {
            if (respuesta[1] == 23000) {
                swal("Esculapio!", "Su laboratorio ya existe... !!", "error");
                return;
            }
            swal("Esculapio!", "No Se Pudo Guardar El Procedimiento..!" + respuesta[1], "error");
            return;
        }
    }).fail(function (jqXHR, textStatus, errorThrown) {
        console.log(errorThrown)
    });
}
$("body #datatableProLabRx").on('click', ".btnEliminar", function (ev) {
    id = $(this).attr("registro");
    swal({
        title: "Esculapio",
        text: "Seguro Que Desea Eliminar?",
        icon: "warning",
        buttons: true,
        dangerMode: true,
    }).then((confirma) => {
        if (confirma) {
            EliminarProLabRx(id);
        } else {

        }
    });
});

function EliminarProLabRx(id) {
    $.ajax({
        method: "POST",
        url: "Ajax/Aj_Rx.php",
        data: {
            Requerimiento: "EliminaProLabRx",
            Id: id
        },
        dataType: 'JSON',
    }).done(function (respuesta) {
        if (respuesta[0] == true) {
            swal("Esculapio!", "Equipo Eliminado..!", "success");
            tablaProcedimientos.draw();
            return;
        }
        if (respuesta[0] == false) {
            swal("Esculapio!", "Ocurrio un Error.", "error");
            return;
        }
    }).fail(function (jqXHR, textStatus, errorThrown) {
        console.log(errorThrown)
    });
}
$('.body table#datatableProLabRx').on('click', '.btnEditar', function (evt) {
    id = $(this).attr("registro");
    var posiciones = [1, 2, 3, 4];
    var nombre = $('.body').find('input#NombreProLabRx');
    var grupo = $('.body').find('select#ComboGrupoRx');
    var equipo = $('.body').find('select#ComboEquipoRx');
    var pvp = $('.body').find('input#PvpRx');

    var fila = tablaProcedimientos.row($(this).parents("tr")).data();
    var campos = [nombre, grupo, equipo, pvp];
    CargarFila(posiciones, campos, fila);

    $('#GuardarProLabRx').fadeOut(0);
    $('#ModificarProLabRx').fadeIn(0);
    $(".modalNuevoProcedimiento").modal();

    $('.selectpicker').selectpicker('refresh');

});

$(".body").on('change', "input#ValorProRx", function (evt) {
    $(this).val(parseFloat($(this).val()).toFixed(2));
});
$(".body").on('change', "input#PvpRx", function (evt) {
    $(this).val(parseFloat($(this).val()).toFixed(2));
});

var tablaasignacion = null;
var tablaexamenes = null;
var tablaentidad = null;
var tablaequipo = null;
var tablaProcedimientos = null;
function CargarTabla() {
    tablaasignacion = $('#datatableProceRx')
        .DataTable({
            "processing": true,
            "serverSide": true,
            "ordering": false,
            'lengthChange': false,
            'paging': false,
            "ajax": {
                url: "Ajax/Aj_Rx.php",
                data: {
                    Requerimiento: "CargarTablaJSMante"
                },
                type: "POST"
            },
            scrollY: 300,
            "autoWidth": true,
            sScrollX: true,
            "drawCallback": function (settings) {
                CargarAsignacionesRx();
            }
        });

    tablaexamenes = $('#datatableExamenesRx').DataTable({
        "processing": true,
        "serverSide": true,
        "ajax": {
            url: "Ajax/Aj_Rx.php",
            data: {
                Requerimiento: "CargarTablaGrupoJS"
            },
            type: "POST"
        },
        scrollY: 300,
        scrollX: true,
        keys: true,
        ordering: false,
        lengthChange: false,
        paginate: false
    });


    tablaentidad = $('#datatableEntidadRx').DataTable({
        "processing": true,
        "serverSide": true,
        "ajax": {
            url: "Ajax/Aj_Rx.php",
            data: {
                Requerimiento: "CargarTablaEntidadJS"
            },
            type: "POST"
        },
        scrollY: 300,
        scrollX: true,
        keys: true,
        ordering: false,
        lengthChange: false,
        paginate: false
    });

    tablaequipo = $('#datatableEquipoRx').DataTable({
        "processing": true,
        "serverSide": true,
        "ajax": {
            url: "Ajax/Aj_Rx.php",
            data: {
                Requerimiento: "CargarTablaEquipoJS"
            },
            type: "POST"
        },
        scrollY: 300,
        scrollX: true,
        keys: true,
        ordering: false,
        lengthChange: false,
        paginate: false
    });

    tablaProcedimientos = $('#datatableProLabRx').DataTable({
        "processing": true,
        "serverSide": true,
        "ajax": {
            url: "Ajax/Aj_Rx.php",
            data: {
                Requerimiento: "CargarTablaProcedimientoJS"
            },
            type: "POST"
        },
        scrollY: 300,
        scrollX: true,
        keys: true,
        ordering: false,
        lengthChange: false,
        paginate: false
    });
}
CargarTabla()

function CargarAsignacionesRx() {

    $.ajax({

        method: "POST",
        url: "Ajax/Aj_Rx.php",
        data: { Requerimiento: "CargarAsignacionesRx", Entidad: $("#cbmProceRx").val() },
        dataType: 'JSON',

    }).done(function (respuesta) {
        if (respuesta[0] == false) {

            swal("Sistema!", "Ocurrio un error.", "error");

            return;
        }
        var vector = $('.body').find("#datatableProceRx tbody tr");
        $('.body').find("#datatableProceRx tbody tr input").prop('checked', false);
        $.each(respuesta, function (i, value) {
            $.each(vector, function (a) {
                var idFila = $(this).find("td").eq(0).html();
                if (idFila == value[0]) {
                    $(this).find("td").find('input').prop('checked', true);
                }
            });
        });


    }).fail(function (jqXHR, textStatus, errorThrown) {
        console.log(errorThrown);

    });
}
$(".body").on("change", "select#cbmProceRx", function (e) {
    tablaasignacion.search("").draw();
});

$('.body').on('change', '.chEntidadRx', function (evt) {
    var accion = "Eliminar";
    if ($(this).prop("checked")) {
        accion = "Agregar";
    }
    $.ajax({
        method: "POST",
        url: "Ajax/Aj_Rx.php",
        data: {
            Requerimiento: "AgregarProcedimiento",
            Entidad: $("#cbmProceRx").val(),
            Procedimiento: $(this).attr("id"),
            Accion: accion
        },
        dataType: 'JSON',
    }).done(function (respuesta) {
        console.log(respuesta);
    }).fail(function (jqXHR, textStatus, errorThrown) {
        console.log(errorThrown);

    });
});