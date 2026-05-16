
var id = 0;

$("body").on('click', "#nuevoRegistro", function (ev) {
    $('#GuardarBodega').fadeIn(0);
    $('#ModificarBodega').fadeOut(0);
    id = 0;
    $(".modalNuevo input").val("");
    $("#Establecimiento").val("0");
    $('.selectpicker').selectpicker('refresh');
    $(".modalNuevo").modal();
});

$(".body").on('click', "button#GuardarBodega", function (ev) {
    $(".body").on('submit', "form#RegistroBodega", function (evt) {
        evt.preventDefault(); // evita que se envie el formulario
        var establecimiento = $(this).find('select#Establecimiento').val().trim();
        var nombre = $(this).find('input#Nombre').val().trim();
        var prefijo = $(this).find('input#Descripcion').val().trim();
        var estado = $(this).find('select#Estado').val().trim();
        var ne = $(this).find('select#Establecimiento option:selected').text().trim();

        if (establecimiento == 0) {
            swal("Esculapio!", "Debe seleccionar un Establecimiento", "error");
            return;
        }
        if (estado == 0) {
            swal("Esculapio!", "Debe seleccionar un Estado", "error");
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
                GuardarBodega(establecimiento, nombre, prefijo, estado, ne);
            } else {

            }
        });
    });
});

function GuardarBodega(establecimiento, nombre, prefijo, estado, ne) {
    $.ajax({
        method: "POST",
        url: "Ajax/Aj_ManteBodega.php",
        data: {
            Requerimiento: "GuardarBodega",
            Nombre: nombre,
            Id_establecimiento: establecimiento,
            Estado: estado,
            Descripcion: prefijo
        },
        dataType: 'JSON',
    }).done(function (respuesta) {
        if (respuesta[0] == true) {
            swal("Esculapio!", "Bodega Registrada.!", "success");
            tablaBodegas.draw();
            $(".modalNuevo").modal("hide");
            return;
        }
        if (respuesta[0] == false) {
            if (respuesta[1] == 23000) {
                swal("Esculapio!", "El Nombre de la Bodega ya existe... !!", "error");
                return;
            }
            swal("Esculapio!", "No Se Pudo Guardar Bodega!, Se cargara la pantalla nuevamente para solucionar el problema.", "error");
            return;
        }
    }).fail(function (jqXHR, textStatus, errorThrown) {
        console.log(errorThrown)
    });
}

$(".body").on('click', "button#ModificarBodega", function (ev) {
    $(".body").on('submit', "form#RegistroBodega", function (evt) {
        evt.preventDefault(); // evita que se envie el formulario
        //var id = $('.body table#datatableTipoServicio tbody tr.selected td').eq(0).html();
        var establecimiento = $(this).find('select#Establecimiento').val().trim();
        var nombre = $(this).find('input#Nombre').val().trim();
        var prefijo = $(this).find('input#Descripcion').val().trim();
        var estado = $(this).find('select#Estado').val().trim();

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
                ModificaBodega(establecimiento, nombre, prefijo, estado, id);
            } else {

            }
        });
    });
});

function ModificaBodega(establecimiento, nombre, prefijo, estado, id) {
    $.ajax({
        method: "POST",
        url: "Ajax/Aj_ManteBodega.php",
        data: {
            Requerimiento: "ModificaBodega",
            Nombre: nombre,
            Id_establecimiento: establecimiento,
            Descripcion: prefijo,
            Estado: estado,
            Id: id
        },
        dataType: 'JSON',
    }).done(function (respuesta) {
        if (respuesta[0] == true) {
            swal("Esculapio!", "Bodega Modificada..!", "success");
            tablaBodegas.draw();
            $(".modalNuevo").modal("hide");
            return;
        }
        if (respuesta[0] == false) {
            if (respuesta[1] == 23000) {
                swal("Esculapio!", "El Nombre de la bodega ya existe..!!", "error");
                return;
            }
            swal("Esculapio!", "No Se Pudo modificar la bodega..!, Se cargara la pantalla nuevamente para solucionar el problema.", "error");
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
            EliminaBodega(id);
        }
    });
});

function EliminaBodega(id) {
    $.ajax({
        method: "POST",
        url: "Ajax/Aj_ManteBodega.php",
        data: {
            Requerimiento: "EliminaBodega",
            Id: id
        },
        dataType: 'JSON',
    }).done(function (respuesta) {
        if (respuesta[0] == true) {
            swal("Esculapio!", "Bodega Eliminada..!", "success");
            tablaBodegas.draw();
            return;
        }
        if (respuesta[0] == false) {
            swal("Esculapio!", "No Se Pudo Eliminar la Bodega se cargara la pantalla nuevamente para solucionar el problema.", "error");
            return;
        }
    }).fail(function (jqXHR, textStatus, errorThrown) {
        console.log(errorThrown)
    });
}

$('.body table#datatableBodega').on('click', '.btnEditar', function(evt) {
    id = $(this).attr("registro");
    var posiciones = [1, 2, 3, 4];
    var establecimiento = $('.body').find('select#Establecimiento')
    var nombre = $('.body').find('input#Nombre');
    var descripcion = $('.body').find('input#Descripcion');
    var estado = $('.body').find('select#Estado')
    var fila = tablaBodegas.row($(this).parents("tr")).data();
    var campos = [establecimiento, nombre, descripcion, estado];
    CargarFila(posiciones, campos, fila);
    
    $('.selectpicker').selectpicker('refresh');
    $('#GuardarBodega').fadeOut(0);
    $('#ModificarBodega').fadeIn(0);
    $(".modalNuevo").modal();
    
});

var tablaBodegas = null;
function CargarTabla() {
    tablaBodegas = $('#datatableBodega').DataTable({
        "processing": true,
        "serverSide": true,
        "ajax": {
            url: "Ajax/Aj_ManteBodega.php",
            data: {
                Requerimiento: "CargarTablaBodegaJS"
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