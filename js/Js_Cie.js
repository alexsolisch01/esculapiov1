
var id = 0;

$("body").on('click', "#nuevoRegistro", function (ev) {
    $('#GuardarIngreso').fadeIn(0);
    $('#ModificarIngreso').fadeOut(0);
    id = 0;
    $(".modalNuevo input").val("");
    $('.selectpicker').selectpicker('refresh');
    $(".modalNuevo").modal();
});

$(".body").on('click', "button#GuardarIngreso", function (ev) {
    $(".body").on('submit', "form#FrmRegistro", function (evt) {
        evt.preventDefault(); // evita que se envie el formulario
        var codigo = $(this).find('#codigoCie').val().trim();
        var descripcion = $(this).find('#descripcionCie').val().trim();

        var campos = {
            codigo,descripcion
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
                Guardar(codigo, descripcion);
            } else {

            }
        });
    });
});

function Guardar(codigo, descripcion) {
    $.ajax({
        method: "POST",
        url: "Ajax/Aj_Cie.php",
        data: {
            Requerimiento: "Guardar",
            Codigo: codigo,
            Descripcion: descripcion
        },
        dataType: 'JSON',
    }).done(function (respuesta) {
        if (respuesta[0] == true) {
            swal("Esculapio!", "CIE-10 Registrado.!", "success");
            tablaCie.draw();
            $(".modalNuevo").modal("hide");
            return;
        }
        if (respuesta[0] == false) {
            swal("Esculapio!", "Ocurrio un error al guardar.", "error");
            return;
        }
    }).fail(function (jqXHR, textStatus, errorThrown) {
        console.log(errorThrown)
    });
}

$(".body").on('click', "button#ModificarIngreso", function (ev) {
    $(".body").on('submit', "form#FrmRegistro", function (evt) {
        evt.preventDefault(); // evita que se envie el formulario
        
        var codigo = $(this).find('#codigoCie').val().trim();
        var descripcion = $(this).find('#descripcionCie').val().trim();
        
        var campos = {
            codigo,descripcion
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
                Modificar(codigo, descripcion, id);
            } else {

            }
        });
    });
});

function Modificar(codigo, descripcion,id) {
    $.ajax({
        method: "POST",
        url: "Ajax/Aj_Cie.php",
        data: {
            Requerimiento: "Modificar",
            Codigo: codigo,
            Descripcion: descripcion,
            Id: id
        },
        dataType: 'JSON',
    }).done(function (respuesta) {
        if (respuesta[0] == true) {
            swal("Esculapio!", "CIE-10 Modificado..!", "success");
            tablaCie.draw();
            $(".modalNuevo").modal("hide");
            return;
        }
        if (respuesta[0] == false) {
            swal("Esculapio!", "Ocurrio un error al modificar.", "error");
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
            Eliminar(id);
        }
    });
});

function Eliminar(id) {
    $.ajax({
        method: "POST",
        url: "Ajax/Aj_Cie.php",
        data: {
            Requerimiento: "Eliminar",
            Id: id
        },
        dataType: 'JSON',
    }).done(function (respuesta) {
        if (respuesta[0] == true) {
            swal("Esculapio!", "CIE-10 Eliminado..!", "success");
            tablaCie.draw();
            return;
        }
        if (respuesta[0] == false) {
            swal("Esculapio!", "Ocurrio un error al eliminar.", "error");
            return;
        }
    }).fail(function (jqXHR, textStatus, errorThrown) {
        console.log(errorThrown)
    });
}

$('.body table#datatableCie').on('click', '.btnEditar', function(evt) {
    id = $(this).attr("registro");
    var posiciones = [1, 2];
    var codigo = $('.body').find('#codigoCie')
    var descripcion = $('.body').find('#descripcionCie');
    
    var fila = tablaCie.row($(this).parents("tr")).data();
    var campos = [codigo, descripcion];
    CargarFila(posiciones, campos, fila);
    
    $('.selectpicker').selectpicker('refresh');
    $('#GuardarIngreso').fadeOut(0);
    $('#ModificarIngreso').fadeIn(0);
    $(".modalNuevo").modal();
    
});

var tablaCie = null;
function CargarTabla() {
    tablaCie = $('#datatableCie').DataTable({
        "processing": true,
        "serverSide": true,
        "ajax": {
            url: "Ajax/Aj_Cie.php",
            data: {
                Requerimiento: "CargarTablaCieJS"
            },
            type: "POST"
        },
        /*scrollY: 300,
        scrollX: true,
        keys: true,
        ordering: false,
        lengthChange: false,
        paginate: false*/
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
            searchPlaceholder: "🔍 Buscar CIE..."
        }
    });
}
CargarTabla();