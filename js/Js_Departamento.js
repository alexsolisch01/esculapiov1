var id = 0;

$("body").on('click', "#nuevoRegistro", function (ev) {
    $('#GuardarDepa').fadeIn(0);
    $('#ModificarDepa').fadeOut(0);
    id = 0;
    $(".modalNuevo input").val("");
    $(".modalNuevo").modal();
});

$(".body").on('click', "button#GuardarDepa", function (ev) {
    $(".body").on('submit', "form#RegistroDepartamento", function (evt) {
        evt.preventDefault(); // evita que se envie el formulario
        var descripcion = $(this).find('input#DescripcionDepa').val().trim();
        var cuenta1 = $(this).find('input#CuentaContable').val().trim();
        var cuenta2 = $(this).find('input#CuentaPresupuestaria').val().trim();

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
                GuardarDepartamento(descripcion, cuenta1, cuenta2);
            } else {

            }
        });
    });
});

function GuardarDepartamento(descripcion, cuenta1, cuenta2) {
    $.ajax({
        method: "POST",
        url: "Ajax/Aj_ManteBodega.php",
        data: {
            Requerimiento: "GuardarDepartamento",
            Descripcion: descripcion,
            Cuenta_Contable: cuenta1,
            Cuenta_Presupuestaria: cuenta2
        },
        dataType: 'JSON',
    }).done(function (respuesta) {
        if (respuesta[0] == true) {
            swal("Esculapio!", " Departamento Guardado.!", "success");
            tablaDepartamentos.draw();
            $(".modalNuevo").modal("hide");
            return;
        }
        if (respuesta[0] == false) {
            if (respuesta[1] == 23000) {
                swal("Esculapio!", "El Nombre deL Departamento ya existe... !!", "error");
                return;
            }
            swal("Esculapio!", "No Se Pudo Guardar Departamento!, Se cargara la pantalla nuevamente para solucionar el problema.", "error");
            // location.reload();
            return;
        }
    }).fail(function (jqXHR, textStatus, errorThrown) {
        console.log(errorThrown)
        //location.reload();
    });
}

$(".body").on('click', "button#ModificarDepa", function (ev) {
    $(".body").on('submit', "form#RegistroDepartamento", function (evt) {
        evt.preventDefault(); // evita que se envie el formulario
        //var id = $('.body table#datatableTipoServicio tbody tr.selected td').eq(0).html();
        var descripcion = $(this).find('input#DescripcionDepa').val().trim();
        var cuenta1 = $(this).find('input#CuentaContable').val().trim();
        var cuenta2 = $(this).find('input#CuentaPresupuestaria').val().trim();

        var campos = {
            Descripcion
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
                ModificaDepartamento(descripcion, cuenta1, cuenta2);
            } else {

            }
        });
    });
});

function ModificaDepartamento(descripcion, cuenta1, cuenta2) {
    $.ajax({
        method: "POST",
        url: "Ajax/Aj_ManteBodega.php",
        data: {
            Requerimiento: "ModificaDepartamento",
            Descripcion: descripcion,
            Id: id,
            Cuenta_Contable: cuenta1,
            Cuenta_Presupuestaria: cuenta2
        },
        dataType: 'JSON',
    }).done(function (respuesta) {
        if (respuesta[0] == true) {
            swal("Esculapio!", "Departamento Modificado..!", "success");
            tablaDepartamentos.draw();
            $(".modalNuevo").modal("hide");
            return;
        }
        if (respuesta[0] == false) {
            if (respuesta[1] == 23000) {
                swal("Esculapio!", "El Nombre del departamento ya existe..!!", "error");
                return;
            }
            swal("Esculapio!", "No Se Pudo Modificar el departamento..!, Se cargara la pantalla nuevamente para solucionar el problema.", "error");
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
            EliminaDepartamento(id);
        }
    });
});

function EliminaDepartamento(id) {
    $.ajax({
        method: "POST",
        url: "Ajax/Aj_ManteBodega.php",
        data: {
            Requerimiento: "EliminaDepartamento",
            Id: id
        },
        dataType: 'JSON',
    }).done(function (respuesta) {
        if (respuesta[0] == true) {
            swal("Esculapio!", "Departamento Eliminado..!", "success");
            tablaDepartamentos.draw();
            return;
        }
        if (respuesta[0] == false) {
            swal("Esculapio!", "No Se Pudo Eliminar el departamento se cargara la pantalla nuevamente para solucionar el problema.", "error");
            return;
        }
    }).fail(function (jqXHR, textStatus, errorThrown) {
        console.log(errorThrown)
    });
}

$('.body table#datatableDepartamento').on('click', '.btnEditar', function(evt) {
    id = $(this).attr("registro");
    var posiciones = [1, 2, 3, 4];
    var descripcion = $('.body').find('input#DescripcionDepa');
    var cuenta1 = $('.body').find('input#CuentaContable');
    var cuenta2 = $('.body').find('input#CuentaPresupuestaria');
    var estado = $('.body').find('select#EstadoDepa');
    var fila = tablaDepartamentos.row($(this).parents("tr")).data();
    var campos = [descripcion, cuenta1, cuenta2, estado];
    CargarFila(posiciones, campos, fila);
    $('#GuardarDepa').fadeOut(0);
    $('#ModificarDepa').fadeIn(0);
    $(".modalNuevo").modal();
    
});

var tablaDepartamentos = null;
function CargarTabla() {
    tablaDepartamentos = $('#datatableDepartamento').DataTable({
        "processing": true,
        "serverSide": true,
        "ajax": {
            url: "Ajax/Aj_ManteBodega.php",
            data: {
                Requerimiento: "CargarTablaDepartamentoJS"
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