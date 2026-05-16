var id = 0;
$("body").on('click', "#nuevoRegistroTipoServicio", function (ev) {
    $('#Guardar').fadeIn(0);
    $('#ModificarTipoServicio').fadeOut(0);
    id = 0;
    $("#NombreTipoServicio").val("");
    $("#DescripcionTipoServicio").val("");
    $(".modalNuevoTipo").modal();
});

$(".body").on('click', "button#Guardar", function (ev) {
    $(".body").on('submit', "form#RegistroTipoServicio", function (evt) {
        evt.preventDefault(); // evita que se envie el formulario
        var nombre = $(this).find('input#NombreTipoServicio').val().trim();
        var descripcion = $(this).find('textarea#DescripcionTipoServicio').val().trim();
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
                GuardarTipoServicio(nombre, descripcion);
            }
        });
    });
});
$(".body").on('click', "button#ModificarTipoServicio", function (ev) {
    $(".body").on('submit', "form#RegistroTipoServicio", function (evt) {
        evt.preventDefault(); // evita que se envie el formulario
        //var id = $('.body table#datatableTipoServicio tbody tr.selected td').eq(0).html();
        var nombre = $(this).find('input#NombreTipoServicio').val().trim();
        var descripcion = $(this).find('textarea#DescripcionTipoServicio').val().trim();

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
                ModificarTipoServicio(nombre, descripcion, id);
            }
        });
    });
});

function GuardarTipoServicio(nombre, descripcion) {
    $.ajax({
        method: "POST",
        url: "Ajax/Aj_Procedimiento.php",
        data: {
            Requerimiento: "GuardarTipoServicio",
            Nombre: nombre,
            Descripcion: descripcion
        },
        dataType: 'JSON',
    }).done(function (respuesta) {
        if (respuesta[0] == true) {
            swal("Esculapio!", "Tipo de servicio Guardado.!", "success");
            tablaTipoServicio.draw();
            $(".modalNuevoTipo").modal("hide");
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

function ModificarTipoServicio(nombre, descripcion, id) {
    $.ajax({
        method: "POST",
        url: "Ajax/Aj_Procedimiento.php",
        data: {
            Requerimiento: "ModificaTipoServicio",
            Nombre: nombre,
            Descripcion: descripcion,
            Id: id
        },
        dataType: 'JSON',
    }).done(function (respuesta) {
        if (respuesta[0] == true) {
            swal("Esculapio!", "Tipo de Servicio Modificado..!", "success");
            tablaTipoServicio.draw();
            $(".modalNuevoTipo").modal("hide");
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

$('.body table#datatableTipoServicio').on('click', '.btnEditar', function (evt) {
    id = $(this).attr("registro");
    var posiciones = [1, 2];
    var nombre = $('.body').find('input#NombreTipoServicio');
    var descripcion = $('.body').find('textarea#DescripcionTipoServicio');
    var fila = tablaTipoServicio.row($(this).parents("tr")).data();
    var campos = [nombre, descripcion];
    CargarFila(posiciones, campos, fila);
    $('#Guardar').fadeOut(0);
    $('#ModificarTipoServicio').fadeIn(0);
    $(".modalNuevoTipo").modal();
});

$(".body table#datatableTipoServicio").on('click', ".btnEliminar", function (ev) {
    id = $(this).attr("registro");
    swal({
        title: "Esculapio",
        text: "Seguro Que Desea Eliminar?",
        icon: "warning",
        buttons: true,
        dangerMode: true,
    }).then((confirma) => {
        if (confirma) {
            EliminarTipoServicio(id);
        }
    });

});

function EliminarTipoServicio(id) {
    $.ajax({
        method: "POST",
        url: "Ajax/Aj_Procedimiento.php",
        data: {
            Requerimiento: "EliminaTipoServicio",
            Id: id
        },
        dataType: 'JSON',
    }).done(function (respuesta) {
        if (respuesta[0] == true) {
            swal("Esculapio!", "Tipo de Servicio Eliminado..!", "success");
            tablaTipoServicio.draw();
            $(".modalNuevoTipo").modal("hide");
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

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

$("body").on('click', "#nuevoRegistroGrupo", function (ev) {
    $('#GuardarGrupo').fadeIn(0);
    $('#ModificarGrupo').fadeOut(0);
    id = 0;
    $("#NombreGrupo").val("");
    $("#DescripcionGrupo").val("");
    $(".modalNuevoGrupo").modal();
});

$(".body").on('click', "button#GuardarGrupo", function (ev) {
    $(".body").on('submit', "form#RegistroGrupoEstadistico", function (evt) {
        evt.preventDefault(); // evita que se envie el formulario
        var nombre = $(this).find('input#NombreGrupo').val().trim();
        var descripcion = $(this).find('textarea#DescripcionGrupo').val().trim();

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
                GuardarGrupoEstadistico(nombre, descripcion);
            }
        });
    });
});
$(".body").on('click', "button#ModificarGrupo", function (ev) {
    $(".body").on('submit', "form#RegistroGrupoEstadistico", function (evt) {
        evt.preventDefault(); // evita que se envie el formulario
        var nombre = $(this).find('input#NombreGrupo').val().trim();
        var descripcion = $(this).find('textarea#DescripcionGrupo').val().trim();
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
                ModificarGrupoEstadistico(nombre, descripcion, id);
            }
        });
    });
});

function ModificarGrupoEstadistico(nombre, descripcion, id) {
    $.ajax({
        method: "POST",
        url: "Ajax/Aj_Procedimiento.php",
        data: {
            Requerimiento: "ModificaGrupoEstadistico",
            Nombre: nombre,
            Descripcion: descripcion,
            Id: id
        },
        dataType: 'JSON',
    }).done(function (respuesta) {
        if (respuesta[0] == true) {
            swal("Esculapio!", "Grupo Estadistico Modificado..!", "success");
            tablaGrupoEstadistico.draw();
            $(".modalNuevoGrupo").modal("hide");
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

function GuardarGrupoEstadistico(nombre, descripcion) {
    $.ajax({
        method: "POST",
        url: "Ajax/Aj_Procedimiento.php",
        data: {
            Requerimiento: "GuardarGrupoEstadistico",
            Nombre: nombre,
            Descripcion: descripcion
        },
        dataType: 'JSON',
    }).done(function (respuesta) {
        if (respuesta[0] == true) {
            swal("Esculapio!", "Grupo Estadistico Guardado.!", "success");
            tablaGrupoEstadistico.draw();
            $(".modalNuevoGrupo").modal("hide");
            return;
        }
        if (respuesta[0] == false) {
            swal("Esculapio!", "Ocurrio un Error.", "error");
            // location.reload();
            return;
        }
    }).fail(function (jqXHR, textStatus, errorThrown) {
        console.log(errorThrown)
    });
}

$('.body table#datatableGrupos').on('click', '.btnEditar', function (evt) {
    id = $(this).attr("registro");
    var posiciones = [1, 2];
    var nombre = $('.body').find('input#NombreGrupo');
    var descripcion = $('.body').find('textarea#DescripcionGrupo');
    var fila = tablaGrupoEstadistico.row($(this).parents("tr")).data();
    var campos = [nombre, descripcion];
    CargarFila(posiciones, campos, fila);
    $('#GuardarGrupo').fadeOut(0);
    $('#ModificarGrupo').fadeIn(0);
    $(".modalNuevoGrupo").modal();
});

$("body #datatableGrupos").on('click', ".btnEliminar", function (ev) {
    id = $(this).attr("registro");
    swal({
        title: "Esculapio",
        text: "Seguro Que Desea Eliminar?",
        icon: "warning",
        buttons: true,
        dangerMode: true,
    }).then((confirma) => {
        if (confirma) {
            EliminarGrupoEstadistico(id);
        }
    });
});

function EliminarGrupoEstadistico(id) {
    $.ajax({
        method: "POST",
        url: "Ajax/Aj_Procedimiento.php",
        data: {
            Requerimiento: "EliminaGrupoEstadistico",
            Id: id
        },
        dataType: 'JSON',
    }).done(function (respuesta) {
        if (respuesta[0] == true) {
            swal("Esculapio!", "Grupos Estadistico Eliminado..!", "success");
            tablaGrupoEstadistico.draw();
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

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

$("body").on('click', "#nuevoRegistroEspecialidad", function (ev) {
    $('#GuardarEspe').fadeIn(0);
    $('#ModificarEspe').fadeOut(0);
    id = 0;
    $("#NombreEspecialidad").val("");
    $("#DescripcionEspecialidad").val("");

    $("#TipoServicio").val("0");
    $("#GrupoEstadistico").val("0");
    $('.selectpicker').selectpicker('refresh');
    $(".modalNuevoEspecialidad").modal();
});

$(".body").on('click', "button#GuardarEspe", function (ev) {
    $(".body").on('submit', "form#RegistroEspecialidad", function (evt) {
        evt.preventDefault(); // evita que se envie el formulario
        var id_tipo = $(this).find('select#TipoServicio').val().trim();
        var id_grupo = $(this).find('select#GrupoEstadistico').val().trim();
        var nombre = $(this).find('input#NombreEspecialidad').val().trim();
        var descripcion = $(this).find('textarea#DescripcionEspecialidad').val().trim();

        var id = $('.body').find('select#GrupoEstadistico').val().trim();
        var idt = $('.body').find('select#TipoServicio').val().trim();
        var nt = $('.body').find('select#GrupoEstadistico option:selected').text().trim();
        var ng = $('.body').find('select#TipoServicio option:selected').text().trim();
        if (id == 0 || idt == 0) {
            swal("Esculapio!", "Debe seleccionar un Tipo de Servicio o Grupo Estadistico", "error");
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
                GuardarEspecialidad(id_tipo, id_grupo, nombre, descripcion, nt, ng);
            }
        });
    });
});
$(".body").on('click', "button#ModificarEspe", function (ev) {
    $(".body").on('submit', "form#RegistroEspecialidad", function (evt) {
        evt.preventDefault(); // evita que se envie el formulario
        var id_tipo = $(this).find('select#TipoServicio').val().trim();
        var id_grupo = $(this).find('select#GrupoEstadistico').val().trim();
        var nombre = $(this).find('input#NombreEspecialidad').val().trim();
        var descripcion = $(this).find('textarea#DescripcionEspecialidad').val().trim();

        var idg = $('.body').find('select#GrupoEstadistico').val().trim();
        var idt = $('.body').find('select#TipoServicio').val().trim();
        var nt = $('.body').find('select#GrupoEstadistico option:selected').text().trim();
        var ng = $('.body').find('select#TipoServicio option:selected').text().trim();
        if (idg == 0 || idt == 0) {
            swal("Esculapio!", "Debe seleccionar un Tipo de Servicio o Grupo Estadistico", "error");
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
                ModificarEspecialidad(id_tipo, id_grupo, nombre, descripcion, t, nt, ng);
            }
        });
    });
});

function ModificarEspecialidad(id_tipo, id_grupo, nombre, descripcion, id, nt, ng) {
    $.ajax({
        method: "POST",
        url: "Ajax/Aj_Procedimiento.php",
        data: {
            Requerimiento: "ModificaEspecialidad",
            TipoServicio: id_tipo,
            GrupoEstadistico: id_grupo,
            Nombre: nombre,
            Descripcion: descripcion,
            Id: id
        },
        dataType: 'JSON',
    }).done(function (respuesta) {
        if (respuesta[0] == true) {
            swal("Esculapio!", "Especialidad Modificado..!", "success");
            tablaEspecialidad.draw();
            $(".modalNuevoEspecialidad").modal("hide");
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

function GuardarEspecialidad(id_tipo, id_grupo, nombre, descripcion, nt, ng) {
    $.ajax({
        method: "POST",
        url: "Ajax/Aj_Procedimiento.php",
        data: {
            Requerimiento: "GuardarEspecialidad",
            TipoServicio: id_tipo,
            GrupoEstadistico: id_grupo,
            Nombre: nombre,
            Descripcion: descripcion
        },
        dataType: 'JSON',
    }).done(function (respuesta) {
        if (respuesta[0] == true) {
            swal("Esculapio!", "Especialidad Guardada.!", "success");
            tablaEspecialidad.draw();
            $(".modalNuevoEspecialidad").modal("hide");
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

$('.body table#datatableEspecialidad').on('click', '.btnEditar', function (evt) {
    id = $(this).attr("registro");
    var posiciones = [2, 3, 1, 4];
    var nombre = $('.body').find('input#NombreEspecialidad');
    var descripcion = $('.body').find('textarea#DescripcionEspecialidad');
    var servicio = $('.body').find('select#TipoServicio');
    var grupo = $('.body').find('select#GrupoEstadistico');
    var fila = tablaEspecialidad.row($(this).parents("tr")).data();
    var campos = [servicio, grupo, nombre, descripcion];
    CargarFila(posiciones, campos, fila);
    $('#GuardarEspe').fadeOut(0);
    $('#ModificarEspe').fadeIn(0);
    $(".modalNuevoEspecialidad").modal();
});

$("body #datatableEspecialidad").on('click', ".btnEliminar", function (ev) {
    id = $(this).attr("registro");
    swal({
        title: "Esculapio",
        text: "Seguro Que Desea Eliminar?",
        icon: "warning",
        buttons: true,
        dangerMode: true,
    }).then((confirma) => {
        if (confirma) {
            EliminarEspecialidad(id);
        }
    });
});

function EliminarEspecialidad(id) {
    $.ajax({
        method: "POST",
        url: "Ajax/Aj_Procedimiento.php",
        data: {
            Requerimiento: "EliminaEspecialidad",
            Id: id
        },
        dataType: 'JSON',
    }).done(function (respuesta) {
        if (respuesta[0] == true) {
            swal("Esculapio!", "Especialidad Eliminada..!", "success");
            tablaEspecialidad.draw();
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

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

$("body").on('click', "#nuevoRegistroProcedimiento", function (ev) {
    $('#GuardarProcedimiento').fadeIn(0);
    $('#ModificarProcedimiento').fadeOut(0);
    id = 0;
    $("#NombreProcedimiento").val("");
    $("#Precio").val("");
    editorEco.setValue("");   
    $("#Especialidad").val("0");
    $('.selectpicker').selectpicker('refresh');
    $(".modalNuevoProcedimiento").modal();
});

$(".body").on('click', "button#GuardarProcedimiento", function (ev) {
    $(".body").on('submit', "form#RegistroAmbu", function (evt) {
        evt.preventDefault(); // evita que se envie el formulario
        var id_especialidad = $(this).find('select#Especialidad').val().trim();
        var nombre = $(this).find('input#NombreProcedimiento').val().trim();
        var descripcion = $(this).find('input#cxcPorcedimiento').val().trim();
        if (!$(this).find('input#cxcPorcedimiento').prop('checked')) {
            descripcion = 1;
        }
        var precio = $(this).find('input#Precio').val().trim();
        
        var ne = $('.body').find('select#Especialidad option:selected').text().trim();
        var id = $('.body').find('select#Especialidad').val().trim();
        if (id == 0) {
            swal("Esculapio!", "Debe seleccionar una Especialidad", "error");
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
                GuardarAmbu(id_especialidad, nombre, descripcion, precio, ne);
            }
        });
    });
});
$(".body").on('click', "button#ModificarProcedimiento", function (ev) {
    $(".body").on('submit', "form#RegistroAmbu", function (evt) {
        evt.preventDefault(); // evita que se envie el formulario
        var id_especialidad = $(this).find('select#Especialidad').val().trim();
        var nombre = $(this).find('input#NombreProcedimiento').val().trim();
        if (!$(this).find('input#cxcPorcedimiento').prop('checked')) {
            descripcion = 1;
        }
        var descripcion = $(this).find('input#cxcPorcedimiento').val().trim();
        var precio = $(this).find('input#Precio').val().trim();
        
        var ne = $('.body').find('select#Especialidad option:selected').text().trim();
        var id = $('.body').find('select#Especialidad').val().trim();
        if (id == 0) {
            swal("Esculapio!", "Debe seleccionar una Especialidad", "error");
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
                ModificarAmbu(id_especialidad, nombre, descripcion, precio, ne);
            }
        });
    });
});

function ModificarAmbu(id_especialidad, nombre, descripcion, precio, ne) {
    $.ajax({
        method: "POST",
        url: "Ajax/Aj_Procedimiento.php",
        data: {
            Requerimiento: "ModificaAmbu",
            Especialidad: id_especialidad,
            Nombre: nombre,
            Descripcion: descripcion,
            Precio: precio,
            Plantilla:$('textarea#plantillaecoWord').val(),
            Id: id
        },
        dataType: 'JSON',
    }).done(function (respuesta) {
        if (respuesta[0] == true) {
            swal("Esculapio!", "Procedimiento Modificado.!", "success");
            tablaProcedimientos.draw();
            $(".modalNuevoProcedimiento").modal("hide");
            return;
        }
        if (respuesta[0] == false) {
            swal("Esculapio!", "Ocurrio un error.", "error");
            // location.reload();
            return;
        }
    }).fail(function (jqXHR, textStatus, errorThrown) {
        console.log(errorThrown)
    });
}

function GuardarAmbu(id_especialidad, nombre, descripcion, precio, ne) {
    $.ajax({
        method: "POST",
        url: "Ajax/Aj_Procedimiento.php",
        data: {
            Requerimiento: "GuardarAmbu",
            Especialidad: id_especialidad,
            Nombre: nombre,
            Descripcion: descripcion,
            Plantilla:$('textarea#plantillaecoWord').val(),
            Precio: precio
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
            swal("Esculapio!", "Ocurrio un error.", "error");
            // location.reload();
            return;
        }
    }).fail(function (jqXHR, textStatus, errorThrown) {
        console.log(errorThrown)
    });
}


$("body #datatableProcedimientos").on('click', ".btnEliminar", function (ev) {
    id = $(this).attr("registro");
        swal({
            title: "Esculapio",
            text: "Seguro Que Desea Eliminar?",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        }).then((confirma) => {
            if (confirma) {
                EliminarProcedimiento(id);
            }
        });
});

function EliminarProcedimiento(id) {
    $.ajax({
        method: "POST",
        url: "Ajax/Aj_Procedimiento.php",
        data: {
            Requerimiento: "EliminaProcedimiento",
            Id: id
        },
        dataType: 'JSON',
    }).done(function (respuesta) {
        if (respuesta[0] == true) {
            swal("Esculapio!", "Procedimiento Eliminado..!", "success");
            tablaProcedimientos.draw();
        }
        if (respuesta[0] == false) {
            swal("Esculapio!", "Ocurrio un error.", "error");
            return;
        }
    }).fail(function (jqXHR, textStatus, errorThrown) {
        console.log(errorThrown)
    });
}

$('.body table#datatableProcedimientos').on('click', '.btnEditar', function (evt) {
    id = $(this).attr("registro");
    var posiciones = [2, 1, 3];
    var nombre = $('.body').find('input#NombreProcedimiento');
    var precio = $('.body').find('input#Precio');
    var especialidad = $('.body').find('select#Especialidad');
    var fila = tablaProcedimientos.row($(this).parents("tr")).data();
    var campos = [especialidad, nombre, precio];
    editorEco.setValue(fila[7]);   
    CargarFila(posiciones, campos, fila);
    $('#GuardarProcedimiento').fadeOut(0);
    $('#ModificarProcedimiento').fadeIn(0);
    $(".modalNuevoProcedimiento").modal();
});


$("textarea#plantillaecoWord").wysihtml5();
var editorObjEco = $("textarea#plantillaecoWord").data('wysihtml5');
var editorEco = editorObjEco.editor;


var tablaTipoServicio = null;
var tablaGrupoEstadistico = null;
var tablaEspecialidad = null;
var tablaProcedimientos = null;
function CargarTabla() {

    tablaTipoServicio = $('#datatableTipoServicio').DataTable({
        "processing": true,
        "serverSide": true,
        "ajax": {
            url: "Ajax/Aj_Procedimiento.php",
            data: {
                Requerimiento: "CargarTablaTipoServicioJS"
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

    tablaGrupoEstadistico = $('#datatableGrupos').DataTable({
        "processing": true,
        "serverSide": true,
        "ajax": {
            url: "Ajax/Aj_Procedimiento.php",
            data: {
                Requerimiento: "CargarTablaGrupoEstadisticoJS"
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

    tablaEspecialidad = $('#datatableEspecialidad').DataTable({
        "processing": true,
        "serverSide": true,
        "ajax": {
            url: "Ajax/Aj_Procedimiento.php",
            data: {
                Requerimiento: "CargarTablaEspecialidadJS"
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

    tablaProcedimientos = $('#datatableProcedimientos').DataTable({
        "processing": true,
        "serverSide": true,
        "ajax": {
            url: "Ajax/Aj_Procedimiento.php",
            data: {
                Requerimiento: "CargarTablaProcedimientosJS"
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
CargarTabla();