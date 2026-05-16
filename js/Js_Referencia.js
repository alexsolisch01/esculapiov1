var id = 0;
$("body").on('click', "#nuevoRegistro", function (ev) {
    $('#GuardarRefe').fadeIn(0);
    $('#ModificarRefe').fadeOut(0);
    id = 0;
    $(".modalNuevo input").val("");
    $(".modalNuevo").modal();
});
$(".body").on('click', "button#GuardarRefe", function (ev) {
    $(".body").on('submit', "form#RegistroRefe", function (evt) {
        evt.preventDefault(); // evita que se envie el formulario

        var apellido = $(this).find('input#apellido').val().trim();
        var nombre = $(this).find('input#nombre').val().trim();

        var direccion = $(this).find('input#direccion').val().trim();
        var telefono = $(this).find('input#telefono').val().trim();
        var correo = $(this).find('input#correo').val().trim();
        var limpiar = $(this).find('button#LimpiarRefe');
        var t = $('#datatable').DataTable();


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
                GuardarRefe(apellido, nombre, direccion, telefono, correo, limpiar);
            } else {

            }
        });
    });
});
// funcuion para registarar en la bd un nuevo perfil
function GuardarRefe(apellido, nombre, direccion, telefono, correo, limpiar) {
    $.ajax({
        method: "POST",
        url: "Ajax/Aj_Referencia.php",
        data: {
            Requerimiento: "GuardarRefe",
            Apellido: apellido,
            Nombre: nombre,
            Direccion: direccion,
            Telefono: telefono,
            Correo: correo
        },
        dataType: 'JSON',
    }).done(function (respuesta) {
        if (respuesta[0] == true) {
            swal("Esculapio!", "Referente Registrado.!", "success");
            tablaReferencias.draw();
            $(".modalNuevo").modal("hide");
            return;
        }
        if (respuesta[0] == false) {
            if (respuesta[1] == 23000) {
                swal("Esculapio!", "................... !!", "error");
                return;
            }
            swal("Esculapio!", "Ocurrio un error.", "error");

            return;
        }
    }).fail(function (jqXHR, textStatus, errorThrown) {
        console.log(errorThrown)

    });
}
////////////////////////////////////////////////////////////MODIFICAR/////////////////////////////////////////////////////////
$(".body").on('click', "button#ModificarRefe", function (ev) {
    $(".body").on('submit', "form#RegistroRefe", function (evt) {
        evt.preventDefault(); // evita que se envie el formulario

        var apellido = $(this).find('input#apellido').val().trim();
        var nombre = $(this).find('input#nombre').val().trim();
        var direccion = $(this).find('input#direccion').val().trim();
        var telefono = $(this).find('input#telefono').val().trim();
        var correo = $(this).find('input#correo').val().trim();
        var limpiar = $(this).find('button#LimpiarRefe');
        var t = $('#datatable').DataTable();

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
                ModificaRefe(apellido, nombre, direccion, telefono, correo, limpiar);
            } else {

            }
        });
    });
});
// funcuion para modificar un perfil
function ModificaRefe(apellido, nombre, direccion, telefono, correo, limpiar) {
    $.ajax({
        method: "POST",
        url: "Ajax/Aj_Referencia.php",
        data: {
            Requerimiento: "ModificaRefe",
            Apellido: apellido,
            Nombre: nombre,
            Direccion: direccion,
            Telefono: telefono,
            Correo: correo,
            Id: id
        },
        dataType: 'JSON',
    }).done(function (respuesta) {
        if (respuesta[0] == true) {
            swal("Esculapio!", "Referente Modificado..!", "success");
            tablaReferencias.draw();
            $(".modalNuevo").modal("hide");
        }
        if (respuesta[0] == false) {
            if (respuesta[1] == 23000) {
                swal("Esculapio!", "...........!!", "error");
                return;
            }
            swal("Esculapio!", "Ocurrio un error.", "error");
            return;
        }
    }).fail(function (jqXHR, textStatus, errorThrown) {
        console.log(errorThrown)
    });
}

////////////////////////////////////////////////////////////////ELIMINAR///////////////////////////////////////////////////////////
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
            EliminaRefe(id);
        } else {

        }
    });
});

function EliminaRefe(id) {
    $.ajax({
        method: "POST",
        url: "Ajax/Aj_Referencia.php",
        data: {
            Requerimiento: "EliminaRefe",
            Id: id
        },
        dataType: 'JSON',
    }).done(function (respuesta) {
        if (respuesta[0] == true) {
            swal("Esculapio!", "Referencia Eliminada..!", "success");
            tablaReferencias.draw();
            $(".modalNuevo").modal("hide");
        }
        if (respuesta[0] == false) {
            swal("Esculapio!", "Ocurrio un error.", "error");
            return;
        }
    }).fail(function (jqXHR, textStatus, errorThrown) {
        console.log(errorThrown)
    });
}

$("body").on('click', ".btnEditar", function (ev) {
    id = $(this).attr("registro");
    var posiciones = [1, 2, 3, 4, 5];
    var apellido = $('.body').find('input#apellido')
    var nombre = $('.body').find('input#nombre')
    var direccion = $('.body').find('input#direccion')
    var telefono = $('.body').find('input#telefono')
    var correo = $('.body').find('input#correo')

    var fila = tablaReferencias.row($(this).parents("tr")).data();
    var campos = [apellido, nombre, direccion, telefono, correo];
    CargarFila(posiciones, campos, fila);
    $('#GuardarRefe').fadeOut(0);
    $('#ModificarRefe').fadeIn(0);
    $(".modalNuevo").modal();
});

var tablaReferencias = null;
function CargarTabla() {
    tablaReferencias = $('#datatableRefe').DataTable({
        dom: '<"top"lBf>rt<"bottom"ip>',
        lengthMenu: [
            [10, 25, 50, -1],
            [10, 25, 50, "Todo"]
        ],
        "processing": true,
        "serverSide": true,
        "ajax": {
            url: "Ajax/Aj_Referencia.php",
            data: {
                Requerimiento: "LlenarTablaReferentesJS"
            },
            type: "POST"
        },
        keys: true,
        buttons: [{
            extend: 'copyHtml5',
            text: 'Copiar',
            exportOptions: {
                modifier: {
                    page: 'current'
                }
            }
        }, {
            extend: 'excelHtml5'
        }, {
            extend: 'pdfHtml5'
        }, {
            extend: 'colvis',
            text: 'Columnas Visibles'
        }, {
            extend: 'print',
            text: 'Imprimir',
            exportOptions: {
                columns: ':visible'
            }
        }],
        scrollY: 350,
        scrollX: true
    });
}
CargarTabla()