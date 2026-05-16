var id = 0;

$("body").on('click', "#nuevoRegistroMuestra", function(ev) {
    $('#GuardarMuestra').fadeIn(0);
    $('#ModificarMuestra').fadeOut(0);
    id = 0;
    $("#NombreMuestra").val("");
    $(".modalNuevoMuestra").modal();
});

$(".body").on('click', "button#GuardarMuestra", function(ev) {
    $(".body").on('submit', "form#RegistroMuestra", function(evt) {
        evt.preventDefault(); // evita que se envie el formulario
        var nombre = $(this).find('input#NombreMuestra').val().trim();

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
                GuardarMuestra(nombre);
            } else {

            }
        });


    });
});

function GuardarMuestra(nombre) {
    $.ajax({
        method: "POST",
        url: "Ajax/Aj_Laboratorio.php",
        data: {
            Requerimiento: "GuardaMuestra",
            Nombre: nombre
        },
        dataType: 'JSON',
    }).done(function(respuesta) {
        if (respuesta[0] == true) {
            swal("Esculapio!", "Muestra Guardada.!", "success");
            tablatoma.draw();
            $(".modalNuevoMuestra").modal("hide");
            return;
        }
        if (respuesta[0] == false) {
            if (respuesta[1] == 23000) {
                swal("Esculapio!", "Su muestra ya existe... !!", "error");
                return;
            }
            swal("Esculapio!", "Ocurrio un error.", "error");
            return;
        }
    }).fail(function(jqXHR, textStatus, errorThrown) {
        console.log(errorThrown)
    });
}
$(".body").on('click', "button#ModificarMuestra", function(ev) {
    $(".body").on('submit', "form#RegistroMuestra", function(evt) {
        evt.preventDefault(); // evita que se envie el formulario
        var nombre = $(this).find('input#NombreMuestra').val().trim();

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
                ModificarMuestra(nombre);
            } else {

            }
        });
    });
});
// funcuion para modificar un perfil
function ModificarMuestra(nombre) {
    $.ajax({
        method: "POST",
        url: "Ajax/Aj_Laboratorio.php",
        data: {
            Requerimiento: "ModificaMuestra",
            Nombre: nombre,
            Id: id
        },
        dataType: 'JSON',
    }).done(function(respuesta) {
        if (respuesta[0] == true) {
            swal("Esculapio!", "Muestra Modificada..!", "success");
            tablatoma.draw();
            $(".modalNuevoMuestra").modal("hide");
            return;
        }
        if (respuesta[0] == false) {
            if (respuesta[1] == 23000) {
                swal("Esculapio!", "Su muestra ya existe... !!", "error");
                return;
            }
            swal("Esculapio!", "Ocurrio un error.", "error");
            return;
        }
    }).fail(function(jqXHR, textStatus, errorThrown) {
        console.log(errorThrown)
    });
}
$("body #datatableMuestra").on('click', ".btnEliminar", function(ev) {
    id = $(this).attr("registro");
    swal({
        title: "Esculapio",
        text: "Seguro Que Desea Eliminar?",
        icon: "warning",
        buttons: true,
        dangerMode: true,
    }).then((confirma) => {
        if (confirma) {
            EliminarMuestra(id);
        } else {}
    });
});

function EliminarMuestra(id) {
    $.ajax({
        method: "POST",
        url: "Ajax/Aj_Laboratorio.php",
        data: {
            Requerimiento: "EliminaMuestra",
            Id: id
        },
        dataType: 'JSON',
    }).done(function(respuesta) {
        if (respuesta[0] == true) {
            swal("Esculapio!", "Muestra Eliminada..!", "success");
            tablatoma.draw();
            return;
        }
        if (respuesta[0] == false) {
            swal("Esculapio!", "Ocurrio un error.", "error");
            return;
        }
    }).fail(function(jqXHR, textStatus, errorThrown) {
        console.log(errorThrown)
    });
}
$('.body #datatableMuestra').on('click', '.btnEditar', function(evt) {
    id = $(this).attr("registro");
    var posiciones = [1];
    var nombre = $('.body').find('input#NombreMuestra');
    var fila = tablatoma.row($(this).parents("tr")).data();
    var campos = [nombre];
    CargarFila(posiciones, campos, fila);
    $('#GuardarMuestra').fadeOut(0);
    $('#ModificarMuestra').fadeIn(0);
    $(".modalNuevoMuestra").modal();
});


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

$("body").on('click', "#nuevoRegistroExamen", function(ev) {
    $('#GuardarExa').fadeIn(0);
    $('#ModificarExa').fadeOut(0);
    id = 0;
    $("#NombreExa").val("");
    $("#OrdenExa").val("");
    $(".modalNuevoGrupo").modal();
});

$(".body").on('click', "button#GuardarExa", function(ev) {
    $(".body").on('submit', "form#RegistroExamenes", function(evt) {
        evt.preventDefault(); // evita que se envie el formulario
        var nombre = $(this).find('input#NombreExa').val().trim();
        var OrdenExa = $(this).find('input#OrdenExa').val().trim();
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
                GuardarExamenes(nombre, OrdenExa);
            } else {

            }
        });
    });
});

function GuardarExamenes(nombre, OrdenExa) {
    $.ajax({
        method: "POST",
        url: "Ajax/Aj_Laboratorio.php",
        data: {
            Requerimiento: "GuardaExamen",
            Nombre: nombre,
            Orden: OrdenExa
        },
        dataType: 'JSON',
    }).done(function(respuesta) {
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
    }).fail(function(jqXHR, textStatus, errorThrown) {
        console.log(errorThrown)
    });
}
$(".body").on('click', "button#ModificarExa", function(ev) {
    $(".body").on('submit', "form#RegistroExamenes", function(evt) {
        evt.preventDefault(); // evita que se envie el formulario
        var nombre = $(this).find('input#NombreExa').val().trim();

        var OrdenExa = $(this).find('input#OrdenExa').val().trim();

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
                ModificarExamen(nombre, OrdenExa);
            } else {

            }
        });
    });
});

function ModificarExamen(nombre, OrdenExa) {
    $.ajax({
        method: "POST",
        url: "Ajax/Aj_Laboratorio.php",
        data: {
            Requerimiento: "ModificaExamen",
            Nombre: nombre,
            Id: id,
            Orden: OrdenExa
        },
        dataType: 'JSON',
    }).done(function(respuesta) {
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
    }).fail(function(jqXHR, textStatus, errorThrown) {
        console.log(errorThrown)
    });
}
$("body #datatableExamenes").on('click', ".btnEliminar", function(ev) {
    id = $(this).attr("registro");
    swal({
        title: "Esculapio",
        text: "Seguro Que Desea Eliminar?",
        icon: "warning",
        buttons: true,
        dangerMode: true,
    }).then((confirma) => {
        if (confirma) {
            EliminarExamen(id);
        } else {

        }
    });
});

function EliminarExamen(id) {
    $.ajax({
        method: "POST",
        url: "Ajax/Aj_Laboratorio.php",
        data: {
            Requerimiento: "EliminaExamen",
            Id: id
        },
        dataType: 'JSON',
    }).done(function(respuesta) {
        if (respuesta[0] == true) {
            swal("Esculapio!", "Examen Eliminado..!", "success");
            tablaexamenes.draw();
            return;
        }
        if (respuesta[0] == false) {
            swal("Esculapio!", "Ocurrio un error.", "error");
            return;
        }
    }).fail(function(jqXHR, textStatus, errorThrown) {
        console.log(errorThrown)
    });
}
$('.body #datatableExamenes').on('click', '.btnEditar', function(evt) {
    id = $(this).attr("registro");
    var posiciones = [1, 4];
    var nombre = $('.body').find('input#NombreExa');
    var OrdenExa = $('.body').find('input#OrdenExa');
    var fila = tablaexamenes.row($(this).parents("tr")).data();
    var campos = [nombre, OrdenExa];
    CargarFila(posiciones, campos, fila);
    $('#GuardarExa').fadeOut(0);
    $('#ModificarExa').fadeIn(0);
    $(".modalNuevoGrupo").modal();
});


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

$("body").on('click', "#nuevoRegistroEntidad", function(ev) {
    $('#GuardarEntidad').fadeIn(0);
    $('#ModificarEntidad').fadeOut(0);
    id = 0;
    $("#NombreEntidad").val("");
    $("#cbmMedicoEntidad").val("0");
    $('.selectpicker').selectpicker('refresh');
    $(".modalNuevoEntidad").modal();
});

$(".body").on('click', "button#GuardarEntidad", function(ev) {
    $(".body").on('submit', "form#RegistroEntidad", function(evt) {
        evt.preventDefault(); // evita que se envie el formulario
        var nombre = $(this).find('input#NombreEntidad').val().trim();
        var responsable = $(this).find('select#cbmMedicoEntidad').val();
        var nr = $('.body').find('select#cbmMedicoEntidad option:selected').text().trim();

        var campos = {
            nombre,
            responsable
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
                GuardarEntidad(nombre, responsable, nr);
            } else {

            }
        });
    });
});

function GuardarEntidad(nombre, responsable, nr) {
    $.ajax({
        method: "POST",
        url: "Ajax/Aj_Laboratorio.php",
        data: {
            Requerimiento: "GuardaEntidad",
            Nombre: nombre,
            Responsable: responsable
        },
        dataType: 'JSON',
    }).done(function(respuesta) {
        if (respuesta[0] == true) {
            swal("Esculapio!", "Entidad Guardada.!", "success");
            tablaentidad.draw();
            $(".modalNuevoEntidad").modal("hide");
            return;
        }
        if (respuesta[0] == false) {
            if (respuesta[1] == 23000) {
                swal("Esculapio!", "Su entidad ya existe... !!", "error");
                return;
            }
            swal("Esculapio!", "Ocurrio un errorThrown.", "error");
            return;
        }
    }).fail(function(jqXHR, textStatus, errorThrown) {
        swal("Esculapio!", "Ocurrio un error consulte con la administracion..!  " + respuesta[0] + " Se cargara la pantalla nuevamente para solucionar el problema.", "error");
    });
}
$(".body").on('click', "button#ModificarEntidad", function(ev) {
    $(".body").on('submit', "form#RegistroEntidad", function(evt) {
        evt.preventDefault(); // evita que se envie el formulario
        var nombre = $(this).find('input#NombreEntidad').val().trim();
        var responsable = $(this).find('select#cbmMedicoEntidad').val();
        var nr = $('.body').find('select#cbmMedicoEntidad option:selected').text().trim();

        var campos = {
            nombre,
            responsable
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
                ModificarEntidad(nombre, responsable, nr);
            } else {

            }
        });
    });
});
// funcuion para modificar un perfil
function ModificarEntidad(nombre, responsable, nr) {
    $.ajax({
        method: "POST",
        url: "Ajax/Aj_Laboratorio.php",
        data: {
            Requerimiento: "ModificaEntidad",
            Nombre: nombre,
            Responsable: responsable,
            Id: id
        },
        dataType: 'JSON',
    }).done(function(respuesta) {
        if (respuesta[0] == true) {
            swal("Esculapio!", "Entidad Modificada..!", "success");
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
    }).fail(function(jqXHR, textStatus, errorThrown) {
        console.log(errorThrown)
    });
}
$("body #datatableEntidad").on('click', ".btnEliminar", function(ev) {
    id = $(this).attr("registro");
    swal({
        title: "Esculapio",
        text: "Seguro Que Desea Eliminar?",
        icon: "warning",
        buttons: true,
        dangerMode: true,
    }).then((confirma) => {
        if (confirma) {
            EliminarEntidad(id);
        } else {

        }
    });
});

function EliminarEntidad(id) {
    $.ajax({
        method: "POST",
        url: "Ajax/Aj_Laboratorio.php",
        data: {
            Requerimiento: "EliminaEntidad",
            Id: id
        },
        dataType: 'JSON',
    }).done(function(respuesta) {
        console.log(respuesta)
        if (respuesta[0] == true) {
            swal("Esculapio!", "Entidad Eliminada..!", "success");
            tablaentidad.draw();
            $(".modalNuevoEntidad").modal("hide");
            return;
        }
        if (respuesta[0] == false) {
            swal("Esculapio!", "Ocurrio un error.", "error");
            return;
        }
    }).fail(function(jqXHR, textStatus, errorThrown) {
        console.log(errorThrown)
    });
}
$('.body #datatableEntidad').on('click', '.btnEditar', function(evt) {
    id = $(this).attr("registro");
    var posiciones = [1, 2];
    var nombre = $('.body').find('input#NombreEntidad');
    var responsable = $('.body').find('select#cbmMedicoEntidad');
    var fila = tablaentidad.row($(this).parents("tr")).data();
    var campos = [nombre, responsable];
    CargarFila(posiciones, campos, fila);
    $('#GuardarEntidad').fadeOut(0);
    $('#ModificarEntidad').fadeIn(0);
    $(".modalNuevoEntidad").modal();
    $('.selectpicker').selectpicker('refresh');

});

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

$("body").on('click', "#nuevoRegistroEquipo", function(ev) {
    $('#GuardarEquipo').fadeIn(0);
    $('#ModificarEquipo').fadeOut(0);
    id = 0;
    $("#NombreEquipo").val("");
    $(".modalNuevoEquipo").modal();
});

$(".body").on('click', "button#GuardarEquipo", function(ev) {
    $(".body").on('submit', "form#RegistroEquipo", function(evt) {
        evt.preventDefault(); // evita que se envie el formulario
        var nombre = $(this).find('input#NombreEquipo').val().trim();

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
                GuardarEquipo(nombre);
            } else {

            }
        });
    });
});

function GuardarEquipo(nombre) {
    $.ajax({
        method: "POST",
        url: "Ajax/Aj_Laboratorio.php",
        data: {
            Requerimiento: "GuardaEquipo",
            Nombre: nombre
        },
        dataType: 'JSON',
    }).done(function(respuesta) {
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
    }).fail(function(jqXHR, textStatus, errorThrown) {
        console.log(errorThrown)
    });
}
$(".body").on('click', "button#ModificarEquipo", function(ev) {
    $(".body").on('submit', "form#RegistroEquipo", function(evt) {
        evt.preventDefault(); // evita que se envie el formulario
        var nombre = $(this).find('input#NombreEquipo').val().trim();
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
                ModificarEquipo(nombre);
            } else {

            }
        });
    });
});
// funcuion para modificar un perfil
function ModificarEquipo(nombre) {
    $.ajax({
        method: "POST",
        url: "Ajax/Aj_Laboratorio.php",
        data: {
            Requerimiento: "ModificaEquipo",
            Nombre: nombre,
            Id: id
        },
        dataType: 'JSON',
    }).done(function(respuesta) {
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
    }).fail(function(jqXHR, textStatus, errorThrown) {
        console.log(errorThrown)
    });
}
$("body #datatableEquipo").on('click', ".btnEliminar", function(ev) {
    id = $(this).attr("registro");
    swal({
        title: "Esculapio",
        text: "Seguro Que Desea Eliminar?",
        icon: "warning",
        buttons: true,
        dangerMode: true,
    }).then((confirma) => {
        if (confirma) {
            EliminarEquipo(id);
        } else {

        }
    });
});

function EliminarEquipo(id) {
    $.ajax({
        method: "POST",
        url: "Ajax/Aj_Laboratorio.php",
        data: {
            Requerimiento: "EliminaEquipo",
            Id: id
        },
        dataType: 'JSON',
    }).done(function(respuesta) {
        if (respuesta[0] == true) {
            swal("Esculapio!", "Equipo Eliminado..!", "success");
            tablaequipo.draw();
            return;
        }
        if (respuesta[0] == false) {
            swal("Esculapio!", "Ocurrio un error.", "error");
            return;
        }
    }).fail(function(jqXHR, textStatus, errorThrown) {
        console.log(errorThrown)
    });
}
$('.body #datatableEquipo').on('click', '.btnEditar', function(evt) {
    id = $(this).attr("registro");
    var posiciones = [1];
    var nombre = $('.body').find('input#NombreEquipo');
    var fila = tablaequipo.row($(this).parents("tr")).data();
    var campos = [nombre];
    CargarFila(posiciones, campos, fila);
    $('#GuardarEquipo').fadeOut(0);
    $('#ModificarEquipo').fadeIn(0);
    $(".modalNuevoEquipo").modal();
});


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

$("body").on('click', "#nuevoRegistroProcedimiento", function(ev) {
    $('#GuardarProLab').fadeIn(0);
    $('#ModificarProLab').fadeOut(0);
    id = 0;
    $("#NombreProLab").val("");
    $("#Pvp").val("");
    $("#Pago").val("PORCENTAJE");
    $("#ValorPro").val("");
    $("#ComboMuestra").val("0");
    $("#ComboGrupo").val("0");
    $("#ComboEntidad").val("0");
    $("#ComboEquipo").val("3");
    $('.selectpicker').selectpicker('refresh');
    $(".modalNuevoProcedimiento").modal();
});

$(".body").on('click', "button#GuardarProLab", function(ev) {
    $(".body").on('submit', "form#RegistroProLab", function(evt) {
        evt.preventDefault(); // evita que se envie el formulario
        var nombre = $(this).find('input#NombreProLab').val().trim();
        var muestra = $(this).find('select#ComboMuestra').val();
        var grupo = $(this).find('select#ComboGrupo').val();
        var entidad = $(this).find('select#ComboEntidad').val();
        var equipo = $(this).find('select#ComboEquipo').val();
        var n = parseFloat($(this).find('input#Pvp').val().trim());
        var pvp = n.toFixed(2);
        var pago = $(this).find('select#Pago').val();
        var valor = $(this).find('input#ValorPro').val().trim();
        var nm = $('.body').find('select#ComboMuestra option:selected').text().trim();
        var ng = $('.body').find('select#ComboGrupo option:selected').text().trim();
        var ne = $('.body').find('select#ComboEntidad option:selected').text().trim();
        var nep = $('.body').find('select#ComboEquipo option:selected').text().trim();
        if (muestra == 0) {
            swal("Esculapio!", "Debe seleccionar un Tipo de Toma", "error");
            return;
        }
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
        if (entidad == 5) {
            nep = "NINGUNO";
        }
        swal({
            title: "Esculapio",
            text: "Seguro Que Desea Guardar?",
            icon: "info",
            buttons: true,
            dangerMode: false,
        }).then((confirma) => {
            if (confirma) {
                GuardarProLab(nombre, muestra, grupo, entidad, equipo, pvp, pago, valor, nm, ng, ne, nep);
            } else {

            }
        });
    });
});

function GuardarProLab(nombre, muestra, grupo, entidad, equipo, pvp, pago, valor, nm, ng, ne, nep) {
    $.ajax({
        method: "POST",
        url: "Ajax/Aj_Laboratorio.php",
        data: {
            Requerimiento: "GuardaProLab",
            QR: $('#generarQr').val(),
            Nombre: nombre,
            Muestra: muestra,
            Grupo: grupo,
            Entidad: entidad,
            Equipo: equipo,
            Pvp: pvp,
            Pago: pago,
            Valor: valor
        },
        dataType: 'JSON',
    }).done(function(respuesta) {
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
    }).fail(function(jqXHR, textStatus, errorThrown) {
        console.log(errorThrown)
    });
}
$(".body").on('click', "button#ModificarProLab", function(ev) {
    $(".body").on('submit', "form#RegistroProLab", function(evt) {
        evt.preventDefault(); // evita que se envie el formulario
        var nombre = $(this).find('input#NombreProLab').val().trim();
        var muestra = $(this).find('select#ComboMuestra').val();
        var grupo = $(this).find('select#ComboGrupo').val();
        var entidad = $(this).find('select#ComboEntidad').val();
        var equipo = $(this).find('select#ComboEquipo').val();
        var pvp = $(this).find('input#Pvp').val().trim();
        var pago = $(this).find('select#Pago').val();
        var valor = $(this).find('input#ValorPro').val().trim();
        var nm = $('.body').find('select#ComboMuestra option:selected').text().trim();
        var ng = $('.body').find('select#ComboGrupo option:selected').text().trim();
        var ne = $('.body').find('select#ComboEntidad option:selected').text().trim();
        var nep = $('.body').find('select#ComboEquipo option:selected').text().trim();
        if (muestra == 0) {
            swal("Esculapio!", "Debe seleccionar un Tipo de Toma", "error");
            return;
        }
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
        if (entidad == 5) {
            nep = "NINGUNO";
        }
        swal({
            title: "Esculapio",
            text: "Seguro Que Desea Modificar?",
            icon: "info",
            buttons: true,
            dangerMode: false,
        }).then((confirma) => {
            if (confirma) {
                ModificarProLab(nombre, muestra, grupo, entidad, equipo, pvp, pago, valor, nm, ng, ne, nep);
            } else {

            }
        });
    });
});

function ModificarProLab(nombre, muestra, grupo, entidad, equipo, pvp, pago, valor, nm, ng, ne, nep) {

    $.ajax({
        method: "POST",
        url: "Ajax/Aj_Laboratorio.php",
        data: {
            Requerimiento: "ModificaProLab",
            QR: $('#generarQr').val(),
            Nombre: nombre,
            Muestra: muestra,
            Grupo: grupo,
            Entidad: entidad,
            Equipo: equipo,
            Pvp: pvp,
            Pago: pago,
            Valor: valor,
            Id: id
        },
        dataType: 'JSON',
    }).done(function(respuesta) {
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
    }).fail(function(jqXHR, textStatus, errorThrown) {
        console.log(errorThrown)
    });
}
$("body #datatableProLab").on('click', ".btnEliminar", function(ev) {
    id = $(this).attr("registro");
    swal({
        title: "Esculapio",
        text: "Seguro Que Desea Eliminar?",
        icon: "warning",
        buttons: true,
        dangerMode: true,
    }).then((confirma) => {
        if (confirma) {
            EliminarProLab(id);
        } else {

        }
    });
});

function EliminarProLab(id) {
    $.ajax({
        method: "POST",
        url: "Ajax/Aj_Laboratorio.php",
        data: {
            Requerimiento: "EliminaProLab",
            Id: id
        },
        dataType: 'JSON',
    }).done(function(respuesta) {
        if (respuesta[0] == true) {
            swal("Esculapio!", "Equipo Eliminado..!", "success");
            tablaProcedimientos.draw();
            return;
        }
        if (respuesta[0] == false) {
            swal("Esculapio!", "Ocurrio un error.", "error");
            return;
        }
    }).fail(function(jqXHR, textStatus, errorThrown) {
        console.log(errorThrown)
    });
}
$('.body #datatableProLab').on('click', '.btnEditar', function(evt) {
    id = $(this).attr("registro");
    var posiciones = [1, 2, 3, 4, 5, 6, 7, 8];
    var nombre = $('.body').find('input#NombreProLab');
    var muestra = $('.body').find('select#ComboMuestra');
    var grupo = $('.body').find('select#ComboGrupo');
    var entidad = $('.body').find('select#ComboEntidad');
    var equipo = $('.body').find('select#ComboEquipo');
    var pvp = $('.body').find('input#Pvp');
    var pago = $('.body').find('select#Pago');
    var valor = $('.body').find('input#ValorPro');
    var fila = tablaProcedimientos.row($(this).parents("tr")).data();
    var campos = [nombre, muestra, grupo, entidad, equipo, pvp, pago, valor];
    CargarFila(posiciones, campos, fila);
    $('.body').find('#generarQr').val(fila[11]);
    $('#GuardarProLab').fadeOut(0);
    $('#ModificarProLab').fadeIn(0);
    $(".modalNuevoProcedimiento").modal();
    $('.selectpicker').selectpicker('refresh');

    var ee = $('.body').find('select#ComboEntidad option:selected').text();
    if (ee == 'LABORATORIO LOCAL') {
        $('.body').find('div#PagoPro').fadeOut(1);
        $('.body').find('div#ValorProc').fadeOut(1);
        $('.body').find('div#Periferico').fadeIn();
    } else {
        $('.body').find('div#Periferico').fadeOut(1);
        $('.body').find('div#PagoPro').fadeIn();
        $('.body').find('div#ValorProc').fadeIn();
    }
});
$('.body').on('click', 'button#LimpiarProLab', function(evt) {
    $('.body').find('div#PagoPro').fadeOut(1);
    $('.body').find('div#ValorProc').fadeOut(1);
    $('.body').find('div#Periferico').fadeIn(1);
    $('.body').find('input#ValorPro').val(0);
    $('button#GuardarProLab').prop('disabled', false);
    $('button#ModificarProLab').prop('disabled', true);
    $('button#InactivarProLab').prop('disabled', true);
    $('button#EliminarProLab').prop('disabled', true);

    $('select#ComboMuestra').val("0");
    $('.selectpicker').selectpicker('refresh');

    $('select#ComboGrupo').val("0");
    $('.selectpicker').selectpicker('refresh');

    $('select#ComboEntidad').val("0");
    $('.selectpicker').selectpicker('refresh');

    $('select#ComboEquipo').val("0");
    $('.selectpicker').selectpicker('refresh');
});
$(".body").on('change', "input#ValorPro", function(evt) {
    $(this).val(parseFloat($(this).val()).toFixed(2));
});
$(".body").on('change', "input#Pvp", function(evt) {
    $(this).val(parseFloat($(this).val()).toFixed(2));
});

$(".body").on('keyup', "input#ValorPro", function(evt) {
    var precio = parseInt($('.body').find('input#Pvp').val());
    var pago = $('.body').find('select#Pago').val();
    if (precio == 0) {
        $('.body').find('input#Pvp').parent().addClass("has-error");
        $('.body').find('input#Pvp').parent().find('span.help-block').fadeIn();
        $(this).val(0);
        $('.body').find('input#Pvp').val('');
        $('.body').find('input#Pvp').focus();
    } else {
        $('.body').find('input#Pvp').parent().removeClass("has-error");
        $('.body').find('input#Pvp').parent().find('span.help-block').fadeOut(1);
        if (pago == 'PORCENTAJE') {
            if (100 < $(this).val()) {
                $(this).parent().addClass("has-error");
                $(this).parent().find('span.help-block').fadeIn();
            } else {
                $(this).parent().removeClass("has-error");
                $(this).parent().find('span.help-block').fadeOut(1);
            }
        } else {
            if (precio < $(this).val()) {
                $(this).parent().addClass("has-error");
                $(this).parent().find('span.help-block').fadeIn();
            } else {
                $(this).parent().removeClass("has-error");
                $(this).parent().find('span.help-block').fadeOut(1);
            }
        }
    }
});
$(".body").on('change', "select#ComboEntidad", function(evt) {
    var entidad = $(this).find("option:selected").text();
    if (entidad != 'LABORATORIO LOCAL') {
        $('.body').find('div#PagoPro').fadeIn();
        $('.body').find('div#ValorProc').fadeIn();
        $('.body').find('div#Periferico').fadeOut(1);
    } else {
        $('.body').find('div#PagoPro').fadeOut(1);
        $('.body').find('div#ValorProc').fadeOut(1);
        $('.body').find('div#Periferico').fadeIn();
        $('.body').find('input#ValorPro').val(0);
    }
});

var tablatoma = null;
var tablaexamenes = null;
var tablaentidad = null;
var tablaequipo = null;
var tablaProcedimientos = null;

function CargarTabla() {
    tablatoma = $('#datatableMuestra').DataTable({
        "processing": true,
        "serverSide": true,
        "ajax": {
            url: "Ajax/Aj_Laboratorio.php",
            data: {
                Requerimiento: "CargarTablaMuestraJS"
            },
            type: "POST"
        },
        keys: true,
        lengthChange: false,
        paging: false,
        searching: true,
        ordering: false,
        info: false,
        autoWidth: false, 
        scrollX: true,    
        scrollY: "300px",
        scrollCollapse: true,

        language: {
            search: "",
            searchPlaceholder: "🔍 Buscar Muestra..."
        }
    });


    tablaexamenes = $('#datatableExamenes').DataTable({
        "processing": true,
        "serverSide": true,
        "ajax": {
            url: "Ajax/Aj_Laboratorio.php",
            data: {
                Requerimiento: "CargarTablaExamenJS"
            },
            type: "POST"
        },
        keys: true,
        lengthChange: false,
        paging: false,
        searching: true,
        ordering: false,
        info: false,
        autoWidth: false, 
        scrollX: true,    
        scrollY: "300px",
        scrollCollapse: true,

        language: {
            search: "",
            searchPlaceholder: "🔍 Buscar Examenes..."
        }
    });

    tablaentidad = $('#datatableEntidad').DataTable({
        "processing": true,
        "serverSide": true,
        "ajax": {
            url: "Ajax/Aj_Laboratorio.php",
            data: {
                Requerimiento: "CargarTablaEntidadJS"
            },
            type: "POST"
        },
        keys: true,
        lengthChange: false,
        paging: false,
        searching: true,
        ordering: false,
        info: false,
        autoWidth: false, 
        scrollX: true,    
        scrollY: "300px",
        scrollCollapse: true,

        language: {
            search: "",
            searchPlaceholder: "🔍 Buscar Entidad..."
        }
    });


    tablaequipo = $('#datatableEquipo').DataTable({
        "processing": true,
        "serverSide": true,
        "ajax": {
            url: "Ajax/Aj_Laboratorio.php",
            data: {
                Requerimiento: "CargarTablaEquipoJS"
            },
            type: "POST"
        },
        keys: true,
        lengthChange: false,
        paging: false,
        searching: true,
        ordering: false,
        info: false,
        autoWidth: false, 
        scrollX: true,    
        scrollY: "300px",
        scrollCollapse: true,

        language: {
            search: "",
            searchPlaceholder: "🔍 Buscar Equipos..."
        }
    });

    tablaProcedimientos = $('#datatableProLab').DataTable({
        "processing": true,
        "serverSide": true,
        "ajax": {
            url: "Ajax/Aj_Laboratorio.php",
            data: {
                Requerimiento: "CargarTablaProcedimientoJS"
            },
            type: "POST"
        },
         keys: true,
        lengthChange: false,
        paging: false,
        searching: true,
        ordering: false,
        info: false,
        autoWidth: false, 
        scrollX: true,    
        scrollY: "300px",
        scrollCollapse: true,

        language: {
            search: "",
            searchPlaceholder: "🔍 Buscar Procedimientos..."
        }
    });
}
CargarTabla();