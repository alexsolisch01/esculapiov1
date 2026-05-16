var id = 0;

$("body").on('click', "#nuevoRegistro", function (ev) {
    $('#GuardarLine').fadeIn(0);
    $('#ModificaLine').fadeOut(0);
    id = 0;
    $(".modalNuevo input").val("");
    $(".modalNuevo").modal();
});

$(".body").on('click', "button#GuardarLine", function (ev) {
    $(".body").on('submit', "form#RegistroLinea", function (evt) {
        evt.preventDefault(); // evita que se envie el formulario
        var descripcion = $(this).find('input#DescripcionLine').val().trim();
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
                GuardarLinea(descripcion);
            } else {

            }
        });
    });
});
// funcuion para registarar en la bd un nuevo perfil
function GuardarLinea(descripcion) {
    $.ajax({
        method: "POST",
        url: "Ajax/Aj_ManteBodega.php",
        data: {
            Requerimiento: "GuardarLinea",
            Descripcion: descripcion,
        },
        dataType: 'JSON',
    }).done(function (respuesta) {
        if (respuesta[0] == true) {
            swal("Esculapio!", "Linea Guardada.!", "success");
            tablaLineas.draw();
            $(".modalNuevo").modal("hide");
            return;
        }
        if (respuesta[0] == false) {
            if (respuesta[1] == 23000) {
                swal("Esculapio!", "El Nombre de su linea ya existe..!!", "error");
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

$(".body").on('click', "button#ModificaLine", function (ev) {
    $(".body").on('submit', "form#RegistroLinea", function (evt) {
        evt.preventDefault(); // evita que se envie el formulario
        //var id = $('.body table#datatableTipoServicio tbody tr.selected td').eq(0).html();
        var descripcion = $(this).find('input#DescripcionLine').val().trim();
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
                ModificaLinea(descripcion);
            } else {

            }
        });
    });
});
// funcuion para modificar un perfil
function ModificaLinea(descripcion) {
    $.ajax({
        method: "POST",
        url: "Ajax/Aj_ManteBodega.php",
        data: {
            Requerimiento: "ModificaLinea",
            Descripcion: descripcion,
            Id: id

        },
        dataType: 'JSON',
    }).done(function (respuesta) {
        if (respuesta[0] == true) {
            swal("Esculapio!", "Linea Modificada..!", "success");
            tablaLineas.draw();
            $(".modalNuevo").modal("hide");
            return;
        }
        if (respuesta[0] == false) {
            if (respuesta[1] == 23000) {
                swal("Esculapio!", "Su linea ya existe..!!", "error");
                return;
            }
            swal("Esculapio!", "No Se Pudo modificar la linea..!, Se cargara la pantalla nuevamente para solucionar el problema.", "error");
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
            EliminaLinea(id);
        } else {

        }
    });
});

function EliminaLinea(id) {
    $.ajax({
        method: "POST",
        url: "Ajax/Aj_ManteBodega.php",
        data: {
            Requerimiento: "EliminaLinea",
            Id: id
        },
        dataType: 'JSON',
    }).done(function (respuesta) {
        if (respuesta[0] == true) {
            swal("Esculapio!", "Linea Eliminada..!", "success");
            tablaLineas.draw();
            $(".modalNuevo").modal("hide");
            return;
        }
        if (respuesta[0] == false) {
            swal("Esculapio!", "No Se Pudo Eliminar la linea se cargara la pantalla nuevamente para solucionar el problema.", "error");
            return;
        }
    }).fail(function (jqXHR, textStatus, errorThrown) {
        console.log(errorThrown)
    });
}

$('.body table#datatableLinea').on('click', '.btnEditar', function(evt) {
    id = $(this).attr("registro");
    var posiciones = [1, 2];
    var descripcion = $('.body').find('input#DescripcionLine');
    var estado = $('.body').find('select#EstadoLine');
    var fila = tablaLineas.row($(this).parents("tr")).data();
    var campos = [descripcion, estado];
    CargarFila(posiciones, campos, fila);
    $('#GuardarLine').fadeOut(0);
    $('#ModificaLine').fadeIn(0);
    $(".modalNuevo").modal();
});

var tablaLineas = null;
function CargarTabla() {
    tablaLineas = $('#datatableLinea').DataTable({
        "processing": true,
        "serverSide": true,
        "ajax": {
            url: "Ajax/Aj_ManteBodega.php",
            data: {
                Requerimiento: "CargarTablaLiniasJS"
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