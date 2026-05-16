var id = 0;

$("body").on('click', "#nuevoRegistro", function (ev) {
    $('#GuardarLine').fadeIn(0);
    $('#ModificaLine').fadeOut(0);
    id = 0;
    $(".modalNuevo input").val("");
    $(".modalNuevo").modal();
});

$(".body").on('click', "button#GuardarUni", function (ev) {
    $(".body").on('submit', "form#RegistroUnidad", function (evt) {
        evt.preventDefault(); // evita que se envie el formulario
        var descripcion = $(this).find('input#DescripcionUni').val().trim();
        var prefijo = $(this).find('input#PrefijoUni').val().trim();
        var campos = {
            descripcion
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
                GuardarUnidad(descripcion, prefijo);
            } else {

            }
        });
    });
});
// funcuion para registarar en la bd un nuevo perfil
function GuardarUnidad(descripcion, prefijo) {
    $.ajax({
        method: "POST",
        url: "Ajax/Aj_ManteBodega.php",
        data: {
            Requerimiento: "GuardarUnidad",
            Descripcion: descripcion,
            Prefijo: prefijo
        },
        dataType: 'JSON',
    }).done(function (respuesta) {
        if (respuesta[0] == true) {
            swal("Esculapio!", "Unidad Guardada.!", "success");
            tablaPresentacion.draw();
            $(".modalNuevo").modal("hide");
            return;
        }
        if (respuesta[0] == false) {
            if (respuesta[1] == 23000) {
                swal("Esculapio!", "Su linea ya existe... los datos deben ser unicos !!", "error");
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

$(".body").on('click', "button#ModificarUni", function (ev) {
    $(".body").on('submit', "form#RegistroUnidad", function (evt) {
        evt.preventDefault(); // evita que se envie el formulario
        //var id = $('.body table#datatableTipoServicio tbody tr.selected td').eq(0).html();
        var descripcion = $(this).find('input#DescripcionUni').val().trim();
        var prefijo = $(this).find('input#PrefijoUni').val().trim();
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
                ModificaUnidad(descripcion, prefijo);
            } else {

            }
        });
    });
});
// funcuion para modificar un perfil
function ModificaUnidad(descripcion, prefijo) {
    $.ajax({
        method: "POST",
        url: "Ajax/Aj_ManteBodega.php",
        data: {
            Requerimiento: "ModificaUnidad",
            Descripcion: descripcion,
            Id: id,
            Prefijo: prefijo
        },
        dataType: 'JSON',
    }).done(function (respuesta) {
        if (respuesta[0] == true) {
            swal("Esculapio!", "Unidad Modificada..!", "success");
            tablaPresentacion.draw();
            $(".modalNuevo").modal("hide");
            return;
        }
        if (respuesta[0] == false) {
            if (respuesta[1] == 23000) {
                swal("Esculapio!", "El Nombre de su unidad ya existe..!!", "error");
                return;
            }
            swal("Esculapio!", "No Se Pudo Modificar la Unidad..!, Se cargara la pantalla nuevamente para solucionar el problema.", "error");
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
            EliminaUnidad(id);
        } else {

        }
    });
});

function EliminaUnidad(id) {
    $.ajax({
        method: "POST",
        url: "Ajax/Aj_ManteBodega.php",
        data: {
            Requerimiento: "EliminaUnidad",
            Id: id
        },
        dataType: 'JSON',
    }).done(function (respuesta) {
        if (respuesta[0] == true) {
            swal("Esculapio!", "Unidad Eliminada..!", "success");
            tablaPresentacion.draw();
            return;
        }
        if (respuesta[0] == false) {
            swal("Esculapio!", "No Se Pudo Eliminar la Unidad se cargara la pantalla nuevamente para solucionar el problema.", "error");
            return;
        }
    }).fail(function (jqXHR, textStatus, errorThrown) {
        console.log(errorThrown)
    });
}

$('.body table#datatableUnidad').on('click', '.btnEditar', function(evt) {
    id = $(this).attr("registro");
    var posiciones = [1, 2];
    var descripcion = $('.body').find('input#DescripcionUni');
    var prefijo = $('.body').find('input#PrefijoUni');
    var fila = tablaPresentacion.row($(this).parents("tr")).data();
    var campos = [descripcion, prefijo];
    CargarFila(posiciones, campos, fila);
    $('#GuardarUni').fadeOut(0);
    $('#ModificarUni').fadeIn(0);
    $(".modalNuevo").modal();
    
});

var tablaPresentacion = null;
function CargarTabla() {
    tablaPresentacion = $('#datatableUnidad').DataTable({
        "processing": true,
        "serverSide": true,
        "ajax": {
            url: "Ajax/Aj_ManteBodega.php",
            data: {
                Requerimiento: "CargarTablaPresentacionJS"
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