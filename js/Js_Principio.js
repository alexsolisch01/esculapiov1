var id = 0;

$("body").on('click', "#nuevoRegistro", function (ev) {
    $('#GuardarLine').fadeIn(0);
    $('#ModificaLine').fadeOut(0);
    id = 0;
    $(".modalNuevo input").val("");
    $(".modalNuevo").modal();
});

$(".body").on('click', "button#GuardarActivo", function (ev) {
    $(".body").on('submit', "form#RegistroActivo", function (evt) {
        evt.preventDefault(); // evita que se envie el formulario
        var clasificacion = $(this).find('input#ClasificacionActivo').val().trim();
        var descripcion = $(this).find('input#DescripcionActivo').val().trim();
        var campos = {
            clasificacion
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
                GuardarClasificacion(descripcion, clasificacion);
            } else {

            }
        });
    });
});
// funcuion para registarar en la bd un nuevo perfil
function GuardarClasificacion(descripcion, clasificacion) {
    $.ajax({
        method: "POST",
        url: "Ajax/Aj_ManteBodega.php",
        data: {
            Requerimiento: "GuardarClasificacion",
            Descripcion: descripcion,
            Clasificacion: clasificacion
        },
        dataType: 'JSON',
    }).done(function (respuesta) {
        if (respuesta[0] == true) {
            swal("Esculapio!", "Principio Activo Guardado.!", "success");
            tablaPrincipio.draw();
            $(".modalNuevo").modal("hide");
            return;
        }
        if (respuesta[0] == false) {
            if (respuesta[1] == 23000) {
                swal("Esculapio!", "Su registro  ya existe..!!", "error");
                return;
            }
            swal("Esculapio!", "No Se Pudo Guardar!, Se cargara la pantalla nuevamente para solucionar el problema.", "error");
            // location.reload();
            return;
        }
    }).fail(function (jqXHR, textStatus, errorThrown) {
        console.log(errorThrown)
        //location.reload();
    });
}

$(".body").on('click', "button#ModificarActivo", function (ev) {
    $(".body").on('submit', "form#RegistroActivo", function (evt) {
        evt.preventDefault(); // evita que se envie el formulario
        //var id = $('.body table#datatableTipoServicio tbody tr.selected td').eq(0).html();
        var clasificacion = $(this).find('input#ClasificacionActivo').val().trim();
        var descripcion = $(this).find('input#DescripcionActivo').val().trim();
        var campos = {
            descripcion
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
                ModificaActivo(clasificacion, descripcion);
            } else {

            }
        });
    });
});
// funcuion para modificar un perfil
function ModificaActivo(clasificacion, descripcion) {
    $.ajax({
        method: "POST",
        url: "Ajax/Aj_ManteBodega.php",
        data: {
            Requerimiento: "ModificaActivo",
            Descripcion: descripcion,
            Id: id,
            Clasificacion: clasificacion
        },
        dataType: 'JSON',
    }).done(function (respuesta) {
        if (respuesta[0] == true) {
            swal("Esculapio!", "Activo Modificado..!", "success");
            tablaPrincipio.draw();
            $(".modalNuevo").modal("hide");
            return;
        }
        if (respuesta[0] == false) {
            if (respuesta[1] == 23000) {
                swal("Esculapio!", "El Nombre de su activo ya existe..!!", "error");
                return;
            }
            swal("Esculapio!", "No Se Pudo modificar el activo..!, Se cargara la pantalla nuevamente para solucionar el problema.", "error");
            return;
        }
    }).fail(function (jqXHR, textStatus, errorThrown) {
        console.log(errorThrown)
    });
}

$("body").on('click', ".btnEliminar", function (ev) {
    id = $(this).attr("registro");
    swal({
        title: "Esculapio",
        text: "Seguro Que Desea Eliminar?",
        icon: "warning",
        buttons: true,
        dangerMode: true,
    }).then((confirma) => {
        if (confirma) {
            EliminaActivo(id);
        } else {

        }
    });
});

function EliminaActivo(id) {
    $.ajax({
        method: "POST",
        url: "Ajax/Aj_ManteBodega.php",
        data: {
            Requerimiento: "EliminaActivo",
            Id: id
        },
        dataType: 'JSON',
    }).done(function (respuesta) {
        if (respuesta[0] == true) {
            swal("Esculapio!", "Activo Eliminado..!", "success");
            tablaPrincipio.draw();
            $(".modalNuevo").modal("hide");
            return;
        }
        if (respuesta[0] == false) {
            swal("Esculapio!", "No Se Pudo Eliminar el activo se cargara la pantalla nuevamente para solucionar el problema.", "error");
            return;
        }
    }).fail(function (jqXHR, textStatus, errorThrown) {
        console.log(errorThrown)
    });
}

$('.body table#datatableClasifica').on('click', '.btnEditar', function(evt) {
    id = $(this).attr("registro");
    var posiciones = [1, 2];
    var clasificacion = $('.body').find('input#ClasificacionActivo');
    var descripcion = $('.body').find('input#DescripcionActivo');
    var fila = tablaPrincipio.row($(this).parents("tr")).data();
    var campos = [clasificacion, descripcion];
    CargarFila(posiciones, campos, fila);
    $('#GuardarActivo').fadeOut(0);
    $('#ModificarActivo').fadeIn(0);
    $(".modalNuevo").modal();
});

var tablaPrincipio = null;
function CargarTabla() {
    tablaPrincipio = $('#datatableClasifica').DataTable({
        "processing": true,
        "serverSide": true,
        "ajax": {
            url: "Ajax/Aj_ManteBodega.php",
            data: {
                Requerimiento: "CargarTablaPrincipioJS"
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