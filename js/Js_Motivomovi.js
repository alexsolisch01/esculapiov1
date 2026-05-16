var id = 0;

$("body").on('click', "#nuevoRegistro", function (ev) {
    $('#GuardarDepa').fadeIn(0);
    $('#ModificarDepa').fadeOut(0);
    id = 0;
    $(".modalNuevo input").val("");
    $("#EstadoIngre").val("0");
    $('.selectpicker').selectpicker('refresh');
    $(".modalNuevo").modal();
});

$(".body").on('click', "button#GuardarIngre", function (ev) {
    $(".body").on('submit', "form#RegistroIngreso", function (evt) {
        evt.preventDefault(); // evita que se envie el formulario
        var descripcion = $(this).find('input#DescripcionIngre').val().trim();
        var estado = $(this).find('select#EstadoIngre').val().trim();
        var prefijo = $(this).find('input#PrefijoIngre').val().trim();
        var cuenta1 = $(this).find('input#CuentaContableI').val().trim();
        var cuenta2 = $(this).find('input#CuentaPresupuestariaI').val().trim();
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
                GuardarIngreso(descripcion, estado, prefijo, cuenta1, cuenta2);
            } else {

            }
        });
    });
});

function GuardarIngreso(descripcion, estado, prefijo, cuenta1, cuenta2) {
    $.ajax({
        method: "POST",
        url: "Ajax/Aj_ManteBodega.php",
        data: {
            Requerimiento: "GuardarIngreso",
            Descripcion: descripcion,
            Estado: estado,
            Prefijo: prefijo,
            Cuenta_Contable: cuenta1,
            Cuenta_Presupuestaria: cuenta2
        },
        dataType: 'JSON',
    }).done(function (respuesta) {
        if (respuesta[0] == true) {
            swal("Esculapio!", "Registro Guardado.!", "success");
            tablaMotivos.draw();
            $(".modalNuevo").modal("hide");
            return;
        }
        if (respuesta[0] == false) {
            if (respuesta[1] == 23000) {
                swal("Esculapio!", "Su registro ya existe... sus datos deben ser unicos!!", "error");
                return;
            }
            swal("Esculapio!", "No Se Pudo Guardar su Registro!, Se cargara la pantalla nuevamente para solucionar el problema.", "error");
            // location.reload();
            return;
        }
    }).fail(function (jqXHR, textStatus, errorThrown) {
        console.log(errorThrown)
        //location.reload();
    });
}

$(".body").on('click', "button#ModificarIngre", function (ev) {
    $(".body").on('submit', "form#RegistroIngreso", function (evt) {
        evt.preventDefault(); // evita que se envie el formulario
        //var id = $('.body table#datatableTipoServicio tbody tr.selected td').eq(0).html();
        var descripcion = $(this).find('input#DescripcionIngre').val().trim();
        var estado = $(this).find('select#EstadoIngre').val().trim();
        var prefijo = $(this).find('input#PrefijoIngre').val().trim();
        var cuenta1 = $(this).find('input#CuentaContableI').val().trim();
        var cuenta2 = $(this).find('input#CuentaPresupuestariaI').val().trim();

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
                ModificaIngreso(descripcion, estado, prefijo, cuenta1, cuenta2);
            } else {

            }
        });
    });
});
// funcuion para modificar un perfil
function ModificaIngreso(descripcion, estado, prefijo, cuenta1, cuenta2) {
    $.ajax({
        method: "POST",
        url: "Ajax/Aj_ManteBodega.php",
        data: {
            Requerimiento: "ModificaIngreso",
            Descripcion: descripcion,
            Id: id,
            Prefijo: prefijo,
            Estado: estado,
            Cuenta_Contable: cuenta1,
            Cuenta_Presupuestaria: cuenta2
        },
        dataType: 'JSON',
    }).done(function (respuesta) {
        if (respuesta[0] == true) {
            swal("Esculapio!", "Ingreso Modificado..!", "success");
            tablaMotivos.draw();
            $(".modalNuevo").modal("hide");
            return;
        }
        if (respuesta[0] == false) {
            if (respuesta[1] == 23000) {
                swal("Esculapio!", "El Nombre de su ingreso ya existe..!!", "error");
                return;
            }
            swal("Esculapio!", "No Se Pudo Modificar el ingreso..!, Se cargara la pantalla nuevamente para solucionar el problema.", "error");
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
            EliminaIngreso(id);
        } else {

        }
    });
});

function EliminaIngreso(id) {
    $.ajax({
        method: "POST",
        url: "Ajax/Aj_ManteBodega.php",
        data: {
            Requerimiento: "EliminaIngreso",
            Id: id
        },
        dataType: 'JSON',
    }).done(function (respuesta) {
        if (respuesta[0] == true) {
            swal("Esculapio!", "Ingreso Eliminado..!", "success");
            tablaMotivos.draw();
            return;
        }
        if (respuesta[0] == false) {
            swal("Esculapio!", "No Se Pudo Eliminar el ingreso se cargara la pantalla nuevamente para solucionar el problema.", "error");
            return;
        }
    }).fail(function (jqXHR, textStatus, errorThrown) {
        console.log(errorThrown)
    });
}

$('.body table#datatableIngre tbody').on('click', '.btnEditar', function(evt) {
    id = $(this).find('td').eq(0).html();
    var posiciones = [1, 2, 3, 4, 5];
    var descripcion = $('.body').find('input#DescripcionIngre');
    var estado = $('.body').find('select#EstadoIngre');
    var prefijo = $('.body').find('input#PrefijoIngre');
    var cuenta1 = $('.body').find('input#CuentaContableI');
    var cuenta2 = $('.body').find('input#CuentaPresupuestariaI');
    var fila = tablaMotivos.row($(this).parents("tr")).data();
    var campos = [descripcion, prefijo, estado, cuenta1, cuenta2];
    CargarFila(posiciones, campos, fila);
    $('#GuardarIngre').fadeOut(0);
    $('#ModificarIngre').fadeIn(0);
    $(".modalNuevo").modal();
    $('.selectpicker').selectpicker('refresh');
    
});

var tablaMotivos = null;
function CargarTabla() {
    tablaMotivos = $('#datatableIngre').DataTable({
        "processing": true,
        "serverSide": true,
        "ajax": {
            url: "Ajax/Aj_ManteBodega.php",
            data: {
                Requerimiento: "CargarTablaMotivosJS"
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