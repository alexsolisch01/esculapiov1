var id = 0;
$('.timepicker').timepicker({
    showInputs: false,
    showMeridian: false
});

$("body").on('click', "#nuevoRegistroGrupo", function (ev) {
    $('#GuardarExaTomo').fadeIn(0);
    $('#ModificarExaTomo').fadeOut(0);
    id = 0;
    $("#NombreExaTomo").val("");
    $("#OrdenExaTomo").val("");
    $(".modalNuevoGrupo").modal();
});

$(".body").on('click', "button#GuardarExaTomo", function (ev) {
    $(".body").on('submit', "form#RegistroExamenesTomo", function (evt) {
        evt.preventDefault(); // evita que se envie el formulario
        var nombre = $(this).find('input#NombreExaTomo').val().trim();
        var OrdenExa = $(this).find('input#OrdenExaTomo').val().trim();
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
                GuardaExamenTomo(nombre, OrdenExa);
            }
        });
    });
});

function GuardaExamenTomo(nombre, OrdenExa) {
    $.ajax({
        method: "POST",
        url: "Ajax/Aj_Tomo.php",
        data: {
            Requerimiento: "GuardaExamenTomo",
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
            swal("Esculapio!", "Ocurrio un error.", "error");
            return;
        }
    }).fail(function (jqXHR, textStatus, errorThrown) {
        console.log(errorThrown)
    });
}
$(".body").on('click', "button#ModificarExaTomo", function (ev) {
    $(".body").on('submit', "form#RegistroExamenesTomo", function (evt) {
        evt.preventDefault(); // evita que se envie el formulario
        var nombre = $(this).find('input#NombreExaTomo').val().trim();
        var OrdenExa = $(this).find('input#OrdenExaTomo').val().trim();
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
                ModificaExamenTomo(nombre, OrdenExa);
            }
        });
    });
});

function ModificaExamenTomo(nombre, OrdenExa) {
    $.ajax({
        method: "POST",
        url: "Ajax/Aj_Tomo.php",
        data: {
            Requerimiento: "ModificaExamenTomo",
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
            swal("Esculapio!", "Ocurrio un error.", "error");
            return;
        }
    }).fail(function (jqXHR, textStatus, errorThrown) {
        console.log(errorThrown)
    });
}
$("body #datatableExamenesTomo").on('click', ".btnEliminar", function (ev) {
    id = $(this).attr("registro");
    swal({
        title: "Esculapio",
        text: "Seguro Que Desea Eliminar?",
        icon: "warning",
        buttons: true,
        dangerMode: true,
    }).then((confirma) => {
        if (confirma) {
            EliminaExamenTomo(id);
        }
    });
});

function EliminaExamenTomo(id) {
    $.ajax({
        method: "POST",
        url: "Ajax/Aj_Tomo.php",
        data: {
            Requerimiento: "EliminaExamenTomo",
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
$('.body table#datatableExamenesTomo').on('click', '.btnEditar', function (evt) {
    id = $(this).attr("registro");
    var posiciones = [1, 4];
    var nombre = $('.body').find('input#NombreExaTomo');
    var OrdenExa = $('.body').find('input#OrdenExaTomo');
    var fila = tablaexamenes.row($(this).parents("tr")).data();
    var campos = [nombre, OrdenExa];
    CargarFila(posiciones, campos, fila);
    $('#GuardarExaTomo').fadeOut(0);
    $('#ModificarExaTomo').fadeIn(0);
    $(".modalNuevoGrupo").modal();
});


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

$("body").on('click', "#nuevoRegistroEntidad", function (ev) {
    $('#GuardarEntidadTomo').fadeIn(0);
    $('#ModificarEntidadTomo').fadeOut(0);
    id = 0;
    $("#NombreEntidadTomo").val("");
    $("#cbmMedicoEntidadTomo").val("0");
    $("#PagoTomo").val("PORCENTAJE");
    $("#ValorTomo").val("");
    $(".tablaGrupoEstadistico").find("input[type=checkbox]").prop("checked", false);
    $('.selectpicker').selectpicker('refresh');
    $(".modalNuevoEntidad").modal();
});

$(".body").on('click', "button#GuardarEntidadTomo", function (ev) {
    $(".body").on('submit', "form#RegistroEntidadTomo", function (evt) {
        evt.preventDefault(); // evita que se envie el formulario
        var nombre = $(this).find('input#NombreEntidadTomo').val().trim();
        var responsable = $(this).find('select#cbmMedicoEntidadTomo').val();
        var nr = $('.body').find('select#cbmMedicoEntidadTomo option:selected').text().trim();

        var pago = $(this).find('select#PagoTomo').val();
        var valor = $(this).find('input#ValorTomo').val().trim();

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
                GuardaEntidadTomo(nombre, responsable, nr, pago, valor);
            }
        });
    });
});

function GuardarHorario(idEntidad, dia, hi, hf) {

    $.ajax({
        method: "POST",
        url: "Ajax/Aj_Tomo.php",
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
                url: "Ajax/Aj_Tomo.php",
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

function GuardaEntidadTomo(nombre, responsable, nr, pago, valor) {
    $.ajax({
        method: "POST",
        url: "Ajax/Aj_Tomo.php",
        data: {
            Requerimiento: "GuardaEntidadTomo",
            Nombre: nombre,
            Responsable: responsable,
            Pago: pago,
            Valor: valor
        },
        dataType: 'JSON',
    }).done(function (respuesta) {
        if (respuesta[0] == true) {

            var vector = $('.body').find("#datatableHorarioTomo tbody tr");

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
                swal("Esculapio!", "Su Responsable ya existe... !!", "error");
                return;
            }
            swal("Esculapio!", "Ocurrio un error.", "error");
            return;
        }
    }).fail(function (jqXHR, textStatus, errorThrown) {
        console.log(errorThrown)
    });
}
$(".body").on('click', "button#ModificarEntidadTomo", function (ev) {
    $(".body").on('submit', "form#RegistroEntidadTomo", function (evt) {
        evt.preventDefault(); // evita que se envie el formulario
        var nombre = $(this).find('input#NombreEntidadTomo').val().trim();
        var responsable = $(this).find('select#cbmMedicoEntidadTomo').val();
        var nr = $('.body').find('select#cbmMedicoEntidadTomo option:selected').text().trim();

        var pago = $(this).find('select#PagoTomo').val();
        var valor = $(this).find('input#ValorTomo').val().trim();

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
                ModificarEntidadTomo(nombre, responsable, nr, pago, valor);
            }
        });
    });
});

function ModificarEntidadTomo(nombre, responsable, nr, pago, valor) {
    $.ajax({
        method: "POST",
        url: "Ajax/Aj_Tomo.php",
        data: {
            Requerimiento: "ModificaEntidadTomo",
            Nombre: nombre,
            Responsable: responsable,
            Id: id,
            Pago: pago,
            Valor: valor

        },
        dataType: 'JSON',
    }).done(function (respuesta) {
        if (respuesta[0] == true) {

            var vector = $('.body').find("#datatableHorarioTomo tbody tr");

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
                swal("Esculapio!", "Su entidad ya existe... !!", "error");
                return;
            }
            swal("Esculapio!", "Ocurrio un error.", "error");
            return;
        }
    }).fail(function (jqXHR, textStatus, errorThrown) {
        console.log(errorThrown)
    });
}
$("body #datatableEntidadTomo").on('click', ".btnEliminar", function (ev) {
    id = $(this).attr("registro");
    swal({
        title: "Esculapio",
        text: "Seguro Que Desea Eliminar?",
        icon: "warning",
        buttons: true,
        dangerMode: true,
    }).then((confirma) => {
        if (confirma) {
            EliminarEntidadTomo(id);
        }
    });
});

function EliminarEntidadTomo(id) {
    $.ajax({
        method: "POST",
        url: "Ajax/Aj_Tomo.php",
        data: {
            Requerimiento: "EliminaEntidadTomo",
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
        url: "Ajax/Aj_Tomo.php",
        data: {
            Requerimiento: "CargarHorarioEntidad",
            Entidad: idEntidad
        },
        dataType: 'JSON',
    }).done(function (horarios) {
        $.each(horarios, function (h, iten) {

            $('.body').find("#datatableHorarioTomo tbody tr").each(function (th) {
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

$('.body table#datatableEntidadTomo').on('click', '.btnEditar', function (evt) {
    id = $(this).attr("registro");
    var posiciones = [1, 2, 3, 4];
    var nombre = $('.body').find('input#NombreEntidadTomo');
    var responsable = $('.body').find('select#cbmMedicoEntidadTomo');
    var pago = $('.body').find('select#PagoTomo');
    var valor = $('.body').find('input#ValorTomo');
    var fila = tablaentidad.row($(this).parents("tr")).data();
    var campos = [nombre, responsable, pago, valor];
    CargarFila(posiciones, campos, fila);
    
    $('.selectpicker').selectpicker('refresh');
    $('#GuardarEntidadTomo').fadeOut(0);
    $('#ModificarEntidadTomo').fadeIn(0);
    $(".modalNuevoEntidad").modal();
    CargarHorarioEntidad(id);
});



/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

$("body").on('click', "#nuevoRegistroEquipo", function (ev) {
    $('#GuardarEquipoTomo').fadeIn(0);
    $('#ModificarEquipoTomo').fadeOut(0);
    id = 0;
    $("#NombreEquipoTomo").val("");
    $(".modalNuevoEquipo").modal();
});

$(".body").on('click', "button#GuardarEquipoTomo", function (ev) {
    $(".body").on('submit', "form#RegistroEquipoTomo", function (evt) {
        evt.preventDefault(); // evita que se envie el formulario
        var nombre = $(this).find('input#NombreEquipoTomo').val().trim();
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
                GuardarEquipoTomo(nombre);
            }
        });
    });
});

function GuardarEquipoTomo(nombre) {
    $.ajax({
        method: "POST",
        url: "Ajax/Aj_Tomo.php",
        data: {
            Requerimiento: "GuardaEquipoTomo",
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
$(".body").on('click', "button#ModificarEquipoTomo", function (ev) {
    $(".body").on('submit', "form#RegistroEquipoTomo", function (evt) {
        evt.preventDefault(); // evita que se envie el formulario
        var nombre = $(this).find('input#NombreEquipoTomo').val().trim();
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
                ModificarEquipoTomo(nombre);
            }
        });
    });
});

function ModificarEquipoTomo(nombre) {
    $.ajax({
        method: "POST",
        url: "Ajax/Aj_Tomo.php",
        data: {
            Requerimiento: "ModificaEquipoTomo",
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
$("body #datatableEquipoTomo").on('click', ".btnEliminar", function (ev) {
    id = $(this).attr("registro");
    swal({
        title: "Esculapio",
        text: "Seguro Que Desea Eliminar?",
        icon: "warning",
        buttons: true,
        dangerMode: true,
    }).then((confirma) => {
        if (confirma) {
            EliminarEquipoTomo(id);
        }
    });
});

function EliminarEquipoTomo(id) {
    $.ajax({
        method: "POST",
        url: "Ajax/Aj_Tomo.php",
        data: {
            Requerimiento: "EliminaEquipoTomo",
            Id: id
        },
        dataType: 'JSON',
    }).done(function (respuesta) {
        if (respuesta[0] == true) {
            swal("Esculapio!", "Equipo Eliminado..!", "success");
            tablaequipo.draw();
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
$('.body table#datatableEquipoTomo').on('click', '.btnEditar', function (evt) {
    id = $(this).attr("registro");
    var posiciones = [1];
    var nombre = $('.body').find('input#NombreEquipoTomo');
    var fila = tablaequipo.row($(this).parents("tr")).data();
    var campos = [nombre];
    CargarFila(posiciones, campos, fila);
    $('#GuardarEquipoTomo').fadeOut(0);
    $('#ModificarEquipoTomo').fadeIn(0);
    $(".modalNuevoEquipo").modal();
});

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

$("body").on('click', "#nuevoRegistroProcedimiento", function (ev) {
    $('#GuardarProLabTomo').fadeIn(0);
    $('#ModificarProLabTomo').fadeOut(0);
    id = 0;
    $("#NombreProLabTomo").val("");
    $("#ComboGrupoTomo").val("0");
    $("#PvpTomo").val("");

    $(".modalNuevoProcedimiento").modal();
});

$(".body").on('click', "button#GuardarProLabTomo", function (ev) {
    $(".body").on('submit', "form#RegistroProLabTomo", function (evt) {
        evt.preventDefault(); // evita que se envie el formulario
        var nombre = $(this).find('input#NombreProLabTomo').val().trim();
        var grupo = $(this).find('select#ComboGrupoTomo').val();
        //var entidad = $(this).find('select#ComboEntidadRx').val();
        var equipo = $(this).find('select#ComboEquipoTomo').val();
        var n = parseFloat($(this).find('input#PvpTomo').val().trim());
        var pvp = n.toFixed(2);
        //var pago = $(this).find('select#PagoRx').val();
        //var valor = $(this).find('input#ValorProRx').val().trim();
        var ng = $('.body').find('select#ComboGrupoTomo option:selected').text().trim();
        // var ne = $('.body').find('select#ComboEntidadRx option:selected').text().trim();
        var nep = $('.body').find('select#ComboEquipoTomo option:selected').text().trim();
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
                GuardarProLabTomo(nombre, grupo, equipo, pvp, ng, nep);
            }
        });
    });
});

function GuardarProLabTomo(nombre, grupo, equipo, pvp, ng, nep) {
    $.ajax({
        method: "POST",
        url: "Ajax/Aj_Tomo.php",
        data: {
            Requerimiento: "GuardaProLabTomo",
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
$(".body").on('click', "button#ModificarProLabTomo", function (ev) {
    $(".body").on('submit', "form#RegistroProLabTomo", function (evt) {
        evt.preventDefault(); // evita que se envie el formulario
        var nombre = $(this).find('input#NombreProLabTomo').val().trim();
        var grupo = $(this).find('select#ComboGrupoTomo').val();
        // var entidad = $(this).find('select#ComboEntidadRx').val();
        var equipo = $(this).find('select#ComboEquipoTomo').val();
        var pvp = $(this).find('input#PvpTomo').val().trim();
        //var pago = $(this).find('select#PagoRx').val();
        //var valor = $(this).find('input#ValorProRx').val().trim();
        var ng = $('.body').find('select#ComboGrupoTomo option:selected').text().trim();
        //var ne = $('.body').find('select#ComboEntidadRx option:selected').text().trim();
        var nep = $('.body').find('select#ComboEquipoTomo option:selected').text().trim();
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
                ModificarProLabTomo(nombre, grupo, equipo, pvp, ng, nep);
            }
        });
    });
});

function ModificarProLabTomo(nombre, grupo, equipo, pvp, ng, nep) {

    $.ajax({
        method: "POST",
        url: "Ajax/Aj_Tomo.php",
        data: {
            Requerimiento: "ModificaProLabTomo",
            Nombre: nombre,
            Grupo: grupo,
            Equipo: equipo,
            Pvp: pvp,
            Id: id
        },
        dataType: 'JSON',
    }).done(function (respuesta) {
        if (respuesta[0] == true) {
            swal("Esculapio!", "Procedimiento Modificado..!", "success");
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
$("body #datatableProLabTomo").on('click', ".btnEliminar", function (ev) {
    id = $(this).attr("registro");
    swal({
        title: "Esculapio",
        text: "Seguro Que Desea Eliminar?",
        icon: "warning",
        buttons: true,
        dangerMode: true,
    }).then((confirma) => {
        if (confirma) {
            EliminarProLabTomo(id);
        }
    });
});

function EliminarProLabTomo(id) {
    $.ajax({
        method: "POST",
        url: "Ajax/Aj_Tomo.php",
        data: {
            Requerimiento: "EliminaProLabTomo",
            Id: id
        },
        dataType: 'JSON',
    }).done(function (respuesta) {
        if (respuesta[0] == true) {
            swal("Esculapio!", "Procedimiento Eliminado..!", "success");
            tablaProcedimientos.draw();
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
$('.body table#datatableProLabTomo').on('click', '.btnEditar', function (evt) {
    id = $(this).attr("registro");
    var posiciones = [1, 2, 3, 4];
    var nombre = $('.body').find('input#NombreProLabTomo');
    var grupo = $('.body').find('select#ComboGrupoTomo');
    //var entidad = $('.body').find('select#ComboEntidadRx');
    var equipo = $('.body').find('select#ComboEquipoTomo');
    var pvp = $('.body').find('input#PvpTomo');

    var fila = tablaProcedimientos.row($(this).parents("tr")).data();
    var campos = [nombre, grupo, equipo, pvp];
    CargarFila(posiciones, campos, fila);

    $('#GuardarProLabTomo').fadeOut(0);
    $('#ModificarProLabTomo').fadeIn(0);
    $(".modalNuevoProcedimiento").modal();

    $('.selectpicker').selectpicker('refresh');
});

$(".body").on('change', "input#ValorProTomo", function (evt) {
    $(this).val(parseFloat($(this).val()).toFixed(2));
});
$(".body").on('change', "input#PvpTomo", function (evt) {
    $(this).val(parseFloat($(this).val()).toFixed(2));
});


/////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////

var tablaasignacion = null;
var tablaexamenes = null;
var tablaentidad = null;
var tablaequipo = null;
var tablaProcedimientos = null;
function CargarTabla() {
    tablaasignacion = $('#datatableProceTomo')
        .DataTable({
            "processing": true,
            "serverSide": true,
            "ordering": false,
            'lengthChange': false,
            'paging': false,
            "ajax": {
                url: "Ajax/Aj_Tomo.php",
                data: {
                    Requerimiento: "CargarTablaJSMante"
                },
                type: "POST"
            },
            scrollY: 300,
            "autoWidth": true,
            sScrollX: true,
            "drawCallback": function (settings) {
                CargarAsignacionesTomo();
            }
        });

    tablaexamenes = $('#datatableExamenesTomo').DataTable({
        "processing": true,
        "serverSide": true,
        "ajax": {
            url: "Ajax/Aj_Tomo.php",
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

    tablaentidad = $('#datatableEntidadTomo').DataTable({
        "processing": true,
        "serverSide": true,
        "ajax": {
            url: "Ajax/Aj_Tomo.php",
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

    tablaequipo = $('#datatableEquipoTomo').DataTable({
        "processing": true,
        "serverSide": true,
        "ajax": {
            url: "Ajax/Aj_Tomo.php",
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

    tablaProcedimientos = $('#datatableProLabTomo').DataTable({
        "processing": true,
        "serverSide": true,
        "ajax": {
            url: "Ajax/Aj_Tomo.php",
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

function CargarAsignacionesTomo() {

    $.ajax({

        method: "POST",
        url: "Ajax/Aj_Tomo.php",
        data: { Requerimiento: "CargarAsignacionesTomo", Entidad: $("#cbmProceTomo").val() },
        dataType: 'JSON',

    }).done(function (respuesta) {
        if (respuesta[0] == false) {

            swal("Sistema!", "Ocurrio un error.", "error");

            return;
        }
        var vector = $('.body').find("#datatableProceTomo tbody tr");
        $('.body').find("#datatableProceTomo tbody tr input").prop('checked', false);
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
$(".body").on("change", "select#cbmProceTomo", function (e) {
    tablaasignacion.search("").draw();
});

$('.body').on('change', '.chEntidadTomo', function (evt) {
    var accion = "Eliminar";
    if ($(this).prop("checked")) {
        accion = "Agregar";
    }
    $.ajax({
        method: "POST",
        url: "Ajax/Aj_Tomo.php",
        data: {
            Requerimiento: "AgregarProcedimiento",
            Entidad: $("#cbmProceTomo").val(),
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