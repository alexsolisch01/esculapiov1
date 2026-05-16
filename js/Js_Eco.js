var id = 0;
$('.timepicker').timepicker({
    showInputs: false,
    showMeridian: false
});
$("body").on('click', "#nuevoRegistro", function (ev) {
    $('#GuardarExaEco').fadeIn(0);
    $('#ModificarExaEco').fadeOut(0);
    id = 0;
    $("#NombreExaEco").val("");
    $("#OrdenExaEco").val("");
    $(".modalNuevo").modal();
});
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
$(".body").on('click', "button#GuardarExaEco", function (ev) {
    $(".body").on('submit', "form#RegistroExamenesEco", function (evt) {
        evt.preventDefault(); // evita que se envie el formulario
        var nombre = $(this).find('input#NombreExaEco').val().trim();
        var OrdenExa = $(this).find('input#OrdenExaEco').val().trim();

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
                GuardaExamenEco(nombre, OrdenExa);
            } else {

            }
        });
    });
});

function GuardaExamenEco(nombre, OrdenExa) {
    $.ajax({
        method: "POST",
        url: "Ajax/Aj_Eco.php",
        data: {
            Requerimiento: "GuardaExamenEco",
            Orden: OrdenExa,
            Nombre: nombre
        },
        dataType: 'JSON',
    }).done(function (respuesta) {
        if (respuesta[0] == true) {
            swal("Esculapio!", "Examen Guardado.!", "success");
            tablaexamenes.draw();
            $(".modalNuevo").modal("hide");

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
$(".body").on('click', "button#ModificarExaEco", function (ev) {
    $(".body").on('submit', "form#RegistroExamenesEco", function (evt) {
        evt.preventDefault(); // evita que se envie el formulario
        var nombre = $(this).find('input#NombreExaEco').val().trim();

        var OrdenExa = $(this).find('input#OrdenExaEco').val().trim();

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
                ModificaExamenEco(nombre, OrdenExa);
            } else {

            }
        });
    });
});
// funcuion para modificar un perfil
function ModificaExamenEco(nombre, OrdenExa) {
    $.ajax({
        method: "POST",
        url: "Ajax/Aj_Eco.php",
        data: {
            Requerimiento: "ModificaExamenEco",
            Nombre: nombre,
            Id: id,
            Orden: OrdenExa
        },
        dataType: 'JSON',
    }).done(function (respuesta) {
        if (respuesta[0] == true) {
            swal("Esculapio!", "Examen Modificado..!", "success");
            tablaexamenes.draw();
            $(".modalNuevo").modal("hide");
            return;
        }
        if (respuesta[0] == false) {
            if (respuesta[1] == 23000) {
                swal("Esculapio!", "Su registro de examen ya existe... !!", "error");
                return;
            }
            swal("Esculapio!", "Ocurrio un error.", "error");
            return;
        }
    }).fail(function (jqXHR, textStatus, errorThrown) {
        console.log(errorThrown)
    });
}
$("body #datatableExamenesEco").on('click', ".btnEliminar", function (ev) {
    id = $(this).attr("registro");
    swal({
        title: "Esculapio",
        text: "Seguro Que Desea Eliminar?",
        icon: "warning",
        buttons: true,
        dangerMode: true,
    }).then((confirma) => {
        if (confirma) {
            EliminaExamenEco(id);
        } else {

        }
    });
});

function EliminaExamenEco(id) {
    $.ajax({
        method: "POST",
        url: "Ajax/Aj_Eco.php",
        data: {
            Requerimiento: "EliminaExamenEco",
            Id: id
        },
        dataType: 'JSON',
    }).done(function (respuesta) {
        if (respuesta[0] == true) {
            swal("Esculapio!", "Muestra Eliminada..!", "success");
            tablaexamenes.draw();
            $(".modalNuevo").modal("hide");
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
$("body #datatableExamenesEco").on('click', ".btnEditar", function (ev) {
    id = $(this).attr("registro");
    var posiciones = [1, 4];
    var nombre = $('.body').find('input#NombreExaEco');
    var OrdenExa = $('.body').find('input#OrdenExaEco');
    var fila = tablaexamenes.row($(this).parents("tr")).data();
    var campos = [nombre, OrdenExa];
    CargarFila(posiciones, campos, fila);
    $('#GuardarExaEco').fadeOut(0);
    $('#ModificarExaEco').fadeIn(0);
    $(".modalNuevo").modal();

});
$('.body').on('click', 'button#LimpiarExaEco', function (evt) {
    $('button#GuardarExaEco').prop('disabled', false);
    $('button#ModificarExaEco').prop('disabled', true);
    $('button#InactivarExaEco').prop('disabled', true);
    $('button#EliminarExaEco').prop('disabled', true);
    $('button#ActivarExaEco').attr('id', "InactivarExa");
    $('button#InactivarExaEco').removeClass("btn-default").addClass('btn-warning');
    $('button#InactivarExaEco').html('<i class="fa fa-ban" aria-hidden="true"></i> Inactivar');
    $('table tr.selected').removeClass('selected');
    $('.body').find('tr[estado=2]').css("background-color", "#f39c12");
});


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
$("body").on('click', "#nuevoRegistroEntidad", function (ev) {
    $('#GuardarEntidadEco').fadeIn(0);
    $('#ModificarEntidadEco').fadeOut(0);
    id = 0;
    $("#ValorEco").val("");
    $("#PagoEco").val("PORCENTAJE");
    $("#cbmMedicoEntidadEco").val("0");
    $("#NombreEntidadEco").val("");
    $(".tablaGrupoEstadistico").find("input[type=checkbox]").prop("checked",false);
    $('.selectpicker').selectpicker('refresh');
    $(".modalResponsable").modal();
});
$(".body").on('click', "button#GuardarEntidadEco", function (ev) {
    $(".body").on('submit', "form#RegistroEntidadEco", function (evt) {
        evt.preventDefault(); // evita que se envie el formulario
        var nombre = $(this).find('input#NombreEntidadEco').val().trim();
        var responsable = $(this).find('select#cbmMedicoEntidadEco').val();
        var nr = $('.body').find('select#cbmMedicoEntidadEco option:selected').text().trim();

        var pago = $(this).find('select#PagoEco').val();
        var valor = $(this).find('input#ValorEco').val().trim();

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
                GuardaEntidadEco(nombre, responsable, nr, pago, valor);
            } else {

            }
        });
    });
});


function GuardarHorario(idEntidad, dia, hi, hf) {

    $.ajax({
        method: "POST",
        url: "Ajax/Aj_Eco.php",
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
                url: "Ajax/Aj_Eco.php",
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
                console.log(errorThrown)
                //location.reload();
            });
        }
    }).fail(function (jqXHR, textStatus, errorThrown) {
        console.log(errorThrown)
        //location.reload();
    });


}

function GuardaEntidadEco(nombre, responsable, nr, pago, valor) {
    $.ajax({
        method: "POST",
        url: "Ajax/Aj_Eco.php",
        data: {
            Requerimiento: "GuardaEntidadEco",
            Nombre: nombre,
            Responsable: responsable,
            Pago: pago,
            Valor: valor
        },
        dataType: 'JSON',
    }).done(function (respuesta) {
        if (respuesta[0] == true) {

            var vector = $('.body').find("#datatableHorarioEco tbody tr");

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
            $(".modalResponsable").modal("hide");
            return;
        }
        if (respuesta[0] == false) {
            if (respuesta[1] == 23000) {
                swal("Esculapio!", "El Responsable ya existe... !!", "error");
                return;
            }
            swal("Esculapio!", "Ocurrio un error.", "error");
            return;
        }
    }).fail(function (jqXHR, textStatus, errorThrown) {
        console.log(errorThrown)
    });
}
$(".body").on('click', "button#ModificarEntidadEco", function (ev) {
    $(".body").on('submit', "form#RegistroEntidadEco", function (evt) {
        evt.preventDefault(); // evita que se envie el formulario
        var nombre = $(this).find('input#NombreEntidadEco').val().trim();
        var responsable = $(this).find('select#cbmMedicoEntidadEco').val();
        var nr = $('.body').find('select#cbmMedicoEntidadEco option:selected').text().trim();

        var pago = $(this).find('select#PagoEco').val();
        var valor = $(this).find('input#ValorEco').val().trim();

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
                ModificarEntidadEco(nombre, responsable, nr, pago, valor);
            } else {

            }
        });
    });
});
// funcuion para modificar un perfil
function ModificarEntidadEco(nombre, responsable, nr, pago, valor) {
    $.ajax({
        method: "POST",
        url: "Ajax/Aj_Eco.php",
        data: {
            Requerimiento: "ModificaEntidadEco",
            Nombre: nombre,
            Responsable: responsable,
            Id: id,
            Pago: pago,
            Valor: valor

        },
        dataType: 'JSON',
    }).done(function (respuesta) {
        if (respuesta[0] == true) {

            var vector = $('.body').find("#datatableHorarioEco tbody tr");

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
            $(".modalResponsable").modal("hide");
            return;
        }
        if (respuesta[0] == false) {
            if (respuesta[1] == 23000) {
                swal("Esculapio!", "Su entidad ya existe... !!", "error");
                return;
            }
            swal("Esculapio!", "Ocurrio un Error.", "error");
            return;
        }
    }).fail(function (jqXHR, textStatus, errorThrown) {
        console.log(errorThrown)
    });
}
$("body #datatableEntidadEco").on('click', ".btnEliminar", function (ev) {
    id = $(this).attr("registro");
    swal({
        title: "Esculapio",
        text: "Seguro Que Desea Eliminar?",
        icon: "warning",
        buttons: true,
        dangerMode: true,
    }).then((confirma) => {
        if (confirma) {
            EliminarEntidadEco(id);
        } else {

        }
    });
});

function EliminarEntidadEco(id) {
    $.ajax({
        method: "POST",
        url: "Ajax/Aj_Eco.php",
        data: {
            Requerimiento: "EliminaEntidadEco",
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
            swal("Esculapio!", "Ocurrio un error.", "error");
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
        url: "Ajax/Aj_Eco.php",
        data: {
            Requerimiento: "CargarHorarioEntidad",
            Entidad: idEntidad
        },
        dataType: 'JSON',
    }).done(function (horarios) {
        $.each(horarios, function (h, iten) {

            $('.body').find("#datatableHorarioEco tbody tr").each(function (th) {
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

$('.body #datatableEntidadEco').on('click', '.btnEditar', function (evt) {
    id = $(this).attr("registro");

    var posiciones = [1, 2, 3, 4];
    var nombre = $('.body').find('input#NombreEntidadEco');
    var responsable = $('.body').find('select#cbmMedicoEntidadEco');
    var pago = $('.body').find('select#PagoEco');
    var valor = $('.body').find('input#ValorEco');
    var fila = tablaentidad.row($(this).parents("tr")).data();
    var campos = [nombre, responsable, pago, valor];
    CargarFila(posiciones, campos, fila);
    $('#GuardarEntidadEco').fadeOut(0);
    $('#ModificarEntidadEco').fadeIn(0);
    $(".modalResponsable").modal();
    CargarHorarioEntidad(id);
});


/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

$("body").on('click', "#nuevoRegistroEquipo", function (ev) {
    $('#GuardarEquipoEco').fadeIn(0);
    $('#ModificarEquipoEco').fadeOut(0);
    id = 0;
    $("#NombreEquipoEco").val("");
    $(".modalNuevoEquipo").modal();
});

$(".body").on('click', "button#GuardarEquipoEco", function (ev) {
    $(".body").on('submit', "form#RegistroEquipoEco", function (evt) {
        evt.preventDefault(); // evita que se envie el formulario
        var nombre = $(this).find('input#NombreEquipoEco').val().trim();

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
                GuardarEquipoEco(nombre);
            } else {

            }
        });
    });
});

function GuardarEquipoEco(nombre) {
    $.ajax({
        method: "POST",
        url: "Ajax/Aj_Eco.php",
        data: {
            Requerimiento: "GuardaEquipoEco",
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
            swal("Esculapio!", "Ocurrio un error.", "error");
            return;
        }
    }).fail(function (jqXHR, textStatus, errorThrown) {
        console.log(errorThrown)
    });
}
$(".body").on('click', "button#ModificarEquipoEco", function (ev) {
    $(".body").on('submit', "form#RegistroEquipoEco", function (evt) {
        evt.preventDefault(); // evita que se envie el formulario
        var nombre = $(this).find('input#NombreEquipoEco').val().trim();

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
                ModificarEquipoEco(nombre);
            } else {

            }
        });
    });
});
// funcuion para modificar un perfil
function ModificarEquipoEco(nombre) {
    $.ajax({
        method: "POST",
        url: "Ajax/Aj_Eco.php",
        data: {
            Requerimiento: "ModificaEquipoEco",
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
            swal("Esculapio!", "Ocurrio un error.", "error");
            return;
        }
    }).fail(function (jqXHR, textStatus, errorThrown) {
        console.log(errorThrown)
    });
}
$("body #datatableEquipoEco").on('click', ".btnEliminar", function (ev) {
    id = $(this).attr("registro");
    swal({
        title: "Esculapio",
        text: "Seguro Que Desea Eliminar?",
        icon: "warning",
        buttons: true,
        dangerMode: true,
    }).then((confirma) => {
        if (confirma) {
            EliminarEquipoEco(id);
        } else {

        }
    });

});

function EliminarEquipoEco(id) {
    $.ajax({
        method: "POST",
        url: "Ajax/Aj_Eco.php",
        data: {
            Requerimiento: "EliminaEquipoEco",
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
$("body #datatableEquipoEco").on('click', ".btnEditar", function (ev) {
    id = $(this).attr("registro");
    var posiciones = [1];
    var nombre = $('.body').find('input#NombreEquipoEco');
    var fila = tablaequipo.row($(this).parents("tr")).data();
    var campos = [nombre];
    CargarFila(posiciones, campos, fila);
    $('#GuardarEquipoEco').fadeOut(0);
    $('#ModificarEquipoEco').fadeIn(0);
    $(".modalNuevoEquipo").modal();
});
$('.body').on('click', 'button#LimpiarEquipoEco', function (evt) {
    $('button#GuardarEquipoEco').prop('disabled', false);
    $('button#ModificarEquipoEco').prop('disabled', true);
    $('button#InactivarEquipoEco').prop('disabled', true);
    $('button#EliminarEquipoEco').prop('disabled', true);
    $('button#ActivarEquipoEco').attr('id', "InactivarEquipoEco");
    $('button#InactivarEquipoEco').removeClass("btn-default").addClass('btn-warning');
    $('button#InactivarEquipoEco').html('<i class="fa fa-ban" aria-hidden="true"></i> Inactivar');
    $('table tr.selected').removeClass('selected');
    $('.body').find('tr[estado=2]').css("background-color", "#f39c12");
});


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

$("body").on('click', "#nuevoRegistroProcedimiento", function (ev) {
    $('#GuardarProLabEco').fadeIn(0);
    $('#ModificarProLabEco').fadeOut(0);
    id = 0;
    $("#NombreProLabEco").val("");
    $("#ComboGrupoEco").val("0");
    $("#ComboEquipoEco").val("0");
    $("#PvpEco").val("");
    $('.selectpicker').selectpicker('refresh');
    $(".modalNuevoProcedimiento").modal();
});

$(".body").on('click', "button#GuardarProLabEco", function (ev) {
    $(".body").on('submit', "form#RegistroProLabEco", function (evt) {
        evt.preventDefault(); // evita que se envie el formulario
        var nombre = $(this).find('input#NombreProLabEco').val().trim();
        var grupo = $(this).find('select#ComboGrupoEco').val();
        //var entidad = $(this).find('select#ComboEntidadEco').val();
        var equipo = $(this).find('select#ComboEquipoEco').val();
        var n = parseFloat($(this).find('input#PvpEco').val().trim());
        var pvp = n.toFixed(2);
        //var pago = $(this).find('select#PagoEco').val();
        //var valor = $(this).find('input#ValorProEco').val().trim();
        var ng = $('.body').find('select#ComboGrupoEco option:selected').text().trim();
        // var ne = $('.body').find('select#ComboEntidadEco option:selected').text().trim();
        var nep = $('.body').find('select#ComboEquipoEco option:selected').text().trim();
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
                GuardarProLabEco(nombre, grupo, equipo, pvp, ng, nep);
            } else {

            }
        });
    });
});

function GuardarProLabEco(nombre, grupo, equipo, pvp, ng, nep) {
    $.ajax({
        method: "POST",
        url: "Ajax/Aj_Eco.php",
        data: {
            Requerimiento: "GuardaProLabEco",
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
$(".body").on('click', "button#ModificarProLabEco", function (ev) {
    $(".body").on('submit', "form#RegistroProLabEco", function (evt) {
        evt.preventDefault(); // evita que se envie el formulario
        var nombre = $(this).find('input#NombreProLabEco').val().trim();
        var grupo = $(this).find('select#ComboGrupoEco').val();
        // var entidad = $(this).find('select#ComboEntidadEco').val();
        var equipo = $(this).find('select#ComboEquipoEco').val();
        var pvp = $(this).find('input#PvpEco').val().trim();
        //var pago = $(this).find('select#PagoEco').val();
        //var valor = $(this).find('input#ValorProEco').val().trim();
        var ng = $('.body').find('select#ComboGrupoEco option:selected').text().trim();
        //var ne = $('.body').find('select#ComboEntidadEco option:selected').text().trim();
        var nep = $('.body').find('select#ComboEquipoEco option:selected').text().trim();
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
                ModificarProLabEco(nombre, grupo, equipo, pvp, ng, nep);
            } else {

            }
        });
    });
});

function ModificarProLabEco(nombre, grupo, equipo, pvp, ng, nep) {

    $.ajax({
        method: "POST",
        url: "Ajax/Aj_Eco.php",
        data: {
            Requerimiento: "ModificaProLabEco",
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
$("body #datatableProLabEco").on('click', ".btnEliminar", function (ev) {
    id = $(this).attr("registro");
    swal({
        title: "Esculapio",
        text: "Seguro Que Desea Eliminar?",
        icon: "warning",
        buttons: true,
        dangerMode: true,
    }).then((confirma) => {
        if (confirma) {
            EliminarProLabEco(id);
        } else {

        }
    });
});

function EliminarProLabEco(id) {
    $.ajax({
        method: "POST",
        url: "Ajax/Aj_Eco.php",
        data: {
            Requerimiento: "EliminaProLabEco",
            Id: id
        },
        dataType: 'JSON',
    }).done(function (respuesta) {
        if (respuesta[0] == true) {
            swal("Esculapio!", "Equipo Eliminado..!", "success");
            tablaProcedimientos.draw();
            $(".modalNuevoProcedimiento").modal("hide");
        }
        if (respuesta[0] == false) {
            swal("Esculapio!", "Ocurrio un error.", "error");
            return;
        }
    }).fail(function (jqXHR, textStatus, errorThrown) {
        console.log(errorThrown)
    });
}
$('.body #datatableProLabEco').on('click', '.btnEditar', function (evt) {
    id = $(this).attr("registro");
    var posiciones = [1, 2, 3, 4];
    var nombre = $('.body').find('input#NombreProLabEco');
    var grupo = $('.body').find('select#ComboGrupoEco');
    var equipo = $('.body').find('select#ComboEquipoEco');
    var pvp = $('.body').find('input#PvpEco');

    var fila = tablaProcedimientos.row($(this).parents("tr")).data();
    var campos = [nombre, grupo, equipo, pvp];
    CargarFila(posiciones, campos, fila);
    $('#GuardarProLabEco').fadeOut(0);
    $('#ModificarProLabEco').fadeIn(0);
    $(".modalNuevoProcedimiento").modal();
});

$(".body").on('change', "input#ValorProEco", function (evt) {
    $(this).val(parseFloat($(this).val()).toFixed(2));
});
$(".body").on('change', "input#PvpEco", function (evt) {
    $(this).val(parseFloat($(this).val()).toFixed(2));
});


///////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////

var tablaasignacion = null;
var tablaexamenes = null;
var tablaentidad = null;
var tablaequipo = null;
var tablaProcedimientos = null;
function CargarTabla() {
    tablaasignacion = $('#datatableProceEco')
        .DataTable({
            "processing": true,
            "serverSide": true,
            "ordering": false,
            'lengthChange': false,
            'paging': false,
            "ajax": {
                url: "Ajax/Aj_Eco.php",
                data: {
                    Requerimiento: "CargarTablaJSMante"
                },
                type: "POST"
            },
            scrollY: 300,
            "autoWidth": true,
            sScrollX: true,
            "drawCallback": function (settings) {
                CargarAsignacionesEco();
            }
        });

    tablaexamenes = $('#datatableExamenesEco').DataTable({
        "processing": true,
        "serverSide": true,
        "ajax": {
            url: "Ajax/Aj_Eco.php",
            data: {
                Requerimiento: "CargarTablaExamenesJS"
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


    tablaentidad = $('#datatableEntidadEco').DataTable({
        "processing": true,
        "serverSide": true,
        "ajax": {
            url: "Ajax/Aj_Eco.php",
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



    tablaequipo = $('#datatableEquipoEco').DataTable({
        "processing": true,
        "serverSide": true,
        "ajax": {
            url: "Ajax/Aj_Eco.php",
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

    tablaProcedimientos = $('#datatableProLabEco').DataTable({
        "processing": true,
        "serverSide": true,
        "ajax": {
            url: "Ajax/Aj_Eco.php",
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

function CargarAsignacionesEco() {

    $.ajax({

        method: "POST",
        url: "Ajax/Aj_Eco.php",
        data: { Requerimiento: "CargarAsignacionesEco", Entidad: $("#cbmProceEco").val() },
        dataType: 'JSON',

    }).done(function (respuesta) {
        if (respuesta[0] == false) {

            swal("Sistema!", "Ocurrio un error.", "error");

            return;
        }
        var vector = $('.body').find("#datatableProceEco tbody tr");
        $('.body').find("#datatableProceEco tbody tr input").prop('checked', false);
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
$(".body").on("change", "select#cbmProceEco", function (e) {
    tablaasignacion.search("").draw();
});

$('.body').on('change', '.chEntidadEco', function (evt) {
    var accion = "Eliminar";
    if ($(this).prop("checked")) {
        accion = "Agregar";
    }
    $.ajax({
        method: "POST",
        url: "Ajax/Aj_Eco.php",
        data: {
            Requerimiento: "AgregarProcedimiento",
            Entidad: $("#cbmProceEco").val(),
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