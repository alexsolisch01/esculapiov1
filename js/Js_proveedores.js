var id = 0;
$("body").on('click', "#nuevoRegistro", function (ev) {
    $('#GuardarProve').fadeIn(0);
    $('#ModificarProve').fadeOut(0);
    id = 0;
    $(".modalNuevo input").val("");
    $("#ProvinciaProve").val("0");
    $('.selectpicker').selectpicker('refresh');
    $(".modalNuevo").modal();
});

$(".body").on('click', "button#GuardarProve", function (ev) {
    $(".body").on('submit', "form#RegistroPrveedores", function (evt) {

        evt.preventDefault(); // evita que se envie el formulario
        var provincia = $(this).find('select#ProvinciaProve').val().trim();
        var descripcion = $(this).find('input#descriProve').val().trim();
        var ruc = $(this).find('input#rucProve').val().trim();
        var direccion = $(this).find('input#direccionProve').val();
        var representante = $(this).find('input#repreProve').val().trim();
        var telefono = $(this).find('input#teleProve').val().trim();
        var email = $(this).find('input#emailProve').val().trim();
        var tipo = $(this).find('select#TipoProve').val().trim();
        var contabilidad = $(this).find('select#ContaProve').val().trim();
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
                GuardarProveedor(provincia, descripcion, ruc, direccion, representante, telefono, email, tipo, contabilidad);
            } else {

            }
        });
    });
});
// funcuion para registarar en la bd un nuevo perfil
function GuardarProveedor(provincia, descripcion, ruc, direccion, representante, telefono, email, tipo, contabilidad) {
    $.ajax({
        method: "POST",
        url: "Ajax/Aj_proveedores.php",
        data: {
            Requerimiento: "GuardarProveedor",
            Provincia: provincia,
            Descripcion: descripcion,
            Ruc: ruc,
            Direccion: direccion,
            Representante: representante,
            Telefono: telefono,
            Email: email,
            Tipo: tipo,
            Contabilidad: contabilidad
        },
        dataType: 'JSON',
    }).done(function (respuesta) {
        if (respuesta[0] == true) {
            swal("Esculapio!", "Proveedor Registrado.!", "success");
            tablaProveedores.draw();
            $(".modalNuevo").modal("hide");
        }
        if (respuesta[0] == false) {
            if (respuesta[1] == 23000) {
                swal("Esculapio!", "El Nombre del Proveedor ya existe... !!", "error");
                return;
            }
            swal("Esculapio!", "Ocurrio un error.", "error");
            // location.reload();
            return;
        }
    }).fail(function (jqXHR, textStatus, errorThrown) {
        console.log(errorThrown)
    });
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////MODIFICAR///////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////

$(".body").on('click', "button#ModificarProve", function (ev) {
    $(".body").on('submit', "form#RegistroPrveedores", function (evt) {
        evt.preventDefault(); // evita que se envie el formulario
        //var id = $('.body table#datatableTipoServicio tbody tr.selected td').eq(0).html();
        var provincia = $(this).find('select#ProvinciaProve').val().trim();
        var descripcion = $(this).find('input#descriProve').val().trim();
        var ruc = $(this).find('input#rucProve').val().trim();
        var direccion = $(this).find('input#direccionProve').val().trim();
        var representante = $(this).find('input#repreProve').val().trim();
        var telefono = $(this).find('input#teleProve').val().trim();
        var email = $(this).find('input#emailProve').val().trim();
        var tipo = $(this).find('select#TipoProve').val().trim();
        var contabilidad = $(this).find('select#ContaProve').val().trim();


        swal({
            title: "Esculapio",
            text: "Seguro Que Desea Modificar?",
            icon: "info",
            buttons: true,
            dangerMode: false,
        }).then((confirma) => {
            if (confirma) {
                ModificarProveedor(provincia, descripcion, ruc, direccion, representante, telefono, email, tipo, contabilidad);
            } else {

            }
        });
    });
});
// funcuion para modificar un perfil
function ModificarProveedor(provincia, descripcion, ruc, direccion, representante, telefono, email, tipo, contabilidad) {
    $.ajax({
        method: "POST",
        url: "Ajax/Aj_proveedores.php",
        data: {
            Requerimiento: "ModificarProveedor",
            Provincia: provincia,
            Descripcion: descripcion,
            Ruc: ruc,
            Direccion: direccion,
            Representante: representante,
            Telefono: telefono,
            Email: email,
            Tipo: tipo,
            Contabilidad: contabilidad,
            Id: id,
        },
        dataType: 'JSON',
    }).done(function (respuesta) {
        if (respuesta[0] == true) {
            swal("Esculapio!", "Proveedor Modificado..!", "success");
            tablaProveedores.draw();
            $(".modalNuevo").modal("hide");
        }
        if (respuesta[0] == false) {
            if (respuesta[1] == 23000) {
                swal("Esculapio!", "El Nombre del Proveedor ya existe..!!", "error");
                return;
            }
            swal("Esculapio!", "Ocurrio un error.", "error");
            return;
        }
    }).fail(function (jqXHR, textStatus, errorThrown) {
        console.log(errorThrown)
    });
}
/////////////////////////////////////////////////////////////////////////////////////////////////////
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
            EliminaProvedor(id);
        } else {
        }
    });
});

function EliminaProvedor(id) {
    $.ajax({
        method: "POST",
        url: "Ajax/Aj_proveedores.php",
        data: {
            Requerimiento: "EliminaProvedor",
            Id: id
        },
        dataType: 'JSON',
    }).done(function (respuesta) {
        if (respuesta[0] == true) {
            swal("Esculapio!", "Provedor Eliminada..!", "success");
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
    var posiciones = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    var provincia = $('.body').find('select#ProvinciaProve')
    var descripcion = $('.body').find('input#descriProve');
    var ruc = $('.body').find('input#rucProve');
    var direccion = $('.body').find('input#direccionProve');
    var representante = $('.body').find('input#repreProve');
    var telefono = $('.body').find('input#teleProve');
    var email = $('.body').find('input#emailProve');
    var tipo = $('.body').find('select#TipoProve');
    var contabilidad = $('.body').find('select#ContaProve');

    
    var fila = tablaProveedores.row($(this).parents("tr")).data();
    var campos = [provincia, descripcion, ruc, direccion, representante, telefono, email, tipo, contabilidad];
    CargarFila(posiciones, campos, fila);
    $('#GuardarProve').fadeOut(0);
    $('#ModificarProve').fadeIn(0);
    $(".modalNuevo").modal();
    $('.selectpicker').selectpicker('refresh');
});

var tablaProveedores = null;
function CargarTabla() {
    tablaProveedores = $('#datatableProveedores').DataTable({
        keys: true,
        dom: '<"top"lBf>rt<"bottom"ip>',
        "processing": true,
        "serverSide": true,
        "ajax": {
            url: "Ajax/Aj_proveedores.php",
            data: {
                Requerimiento: "LlenarTablaProveedorJS"
            },
            type: "POST"
        },
        paginate: false,
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

    tablaProveedores.on('key-focus', function (e, datatable, cell) {
        cell.node().click();
    });
}
CargarTabla()

