var id = 0;
$("body").on('click', "#nuevoRegistro", function (ev) {
    $('#GuardarEmpleado').fadeIn(0);
    $('#ModificarEmpleado').fadeOut(0);
    id = 0;
    $("#CedulaEmpleado").val("");
    $("#ApellidoEmpleado").val("");
    $("#NombreEmpleado").val("");
    $("#TelefonoEmpleado").val("");
    $("#CorreoEmpleado").val("");
    $("#DireccionEmpleado").val("");
    $('#FotoEmpleado').val("");
    $('form#RegistroEmpleados').find('input#FotoEmpleado').parent().css({
        "background": "url(imagenes/user.png) no-repeat",
        "background-size": "cover",
        "height": "15em",
        "background-position": "center center"
    });
    $(".modalNuevo").modal();
});
$(".body").on('click', "button#GuardarEmpleado", function (ev) {
    $(".body").on('submit', "form#RegistroEmpleados", function (evt) {
        evt.preventDefault(); // evita que se envie el formulario
        var cedula = $(this).find('input#CedulaEmpleado').val().trim();
        var nombres = $(this).find('input#NombreEmpleado').val().trim();
        var apellidos = $(this).find('input#ApellidoEmpleado').val().trim();
        var telefono = $(this).find('input#TelefonoEmpleado').val().trim();
        var correo = $(this).find('input#CorreoEmpleado').val().trim();
        var direccion = $(this).find('input#DireccionEmpleado').val().trim();
        var fechaNac = $(this).find('input#FechaEmpleado').val();
        var foto = $(this).find('input#FotoEmpleado')[0].files[0];
        var firma = $(this).find('input#FirmaEmpleado')[0].files[0];


        swal({
            title: "Esculapio",
            text: "Seguro Que Desea Guardar?",
            icon: "info",
            buttons: true,
            dangerMode: false,
        }).then((confirma) => {
            if (confirma) {
                GuardarEmpleado(cedula, apellidos, nombres, telefono, correo, direccion, fechaNac, foto, firma);
            }
        });
    });
});
$("body").on('click', ".btnEditar", function (ev) {
    id = $(this).attr("registro");
    var posiciones = [1, 2, 3, 4, 5, 8, 11];
    var cedula = $('.body').find('input#CedulaEmpleado');
    var nombres = $('.body').find('input#NombreEmpleado');
    var apellidos = $('.body').find('input#ApellidoEmpleado');
    var telefono = $('.body').find('input#TelefonoEmpleado');
    var correo = $('.body').find('input#CorreoEmpleado');
    var direccion = $('.body').find('input#DireccionEmpleado');
    var fecha = $('.body').find('input#FechaEmpleado');
    
    var foto = $('.body').find('input#FotoEmpleado');
    var fila = tablaempleado.row($(this).parents("tr")).data();
    var campos = [cedula, apellidos, nombres, telefono, correo, direccion, fecha];
    CargarFila(posiciones, campos, fila);
    $('#GuardarEmpleado').fadeOut(0);
    $('#ModificarEmpleado').fadeIn(0);
    $(".modalNuevo").modal();
    var imagen = fila[9];
    if (imagen == "") {
        imagen = "imagenes/user.png";
    }
    foto.parent().css({
        "background": "url('" + imagen + "') no-repeat",
        "background-size": "cover",
        "height": "15em",
        "background-position": "center center"
    });

});

function filePreview(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.readAsDataURL(input.files[0]);
        reader.onload = function (e) {
            $(input).parent().css({
                "background": "url(" + e.target.result + ") no-repeat",
                "background-size": "cover",
                "height": "15em",
                "background-position": "center center"
            });
        }
    }
}
$('form#RegistroEmpleados').find('input#FotoEmpleado').change(function () {
    filePreview(this);
});
// funcuion para registarar en la bd un nuevo perfil
function GuardarEmpleado(cedula, apellidos, nombres, telefono, correo, direccion, fechaNac, foto, firma) {
    var formData = new FormData();
    formData.append('Requerimiento', "GuardaEmpleado");
    formData.append('Cedula', cedula);
    formData.append('Apellidos', apellidos);
    formData.append('Nombres', nombres);
    formData.append('Telefono', telefono);
    formData.append('Correo', correo);
    formData.append('Direccion', direccion);
    formData.append('FechaNac', fechaNac);
    formData.append('Foto', foto);
    formData.append('Firma', firma);
    $.ajax({
        method: "POST",
        url: "Ajax/Aj_Empleado.php",
        data: formData,
        contentType: false,
        processData: false,
        dataType: 'JSON',
    }).done(function (respuesta) {
        if (respuesta[0] == true) {
            tablaempleado.draw();
            $(".modalNuevo").modal("hide");
        }
        if (respuesta[0] == false) {
            if (respuesta[1] == 23000) {
                swal("Esculapio!", "El Nombre deL empleado ya existe...su registro debe ser unico !!", "error");
                return;
            }
            swal("Esculapio!", "No Se Pudo Guardar el Empleado! El numero de cedula ya existe en la base de datos.", "error");
            // location.reload();
            return;
        }
    }).fail(function (jqXHR, textStatus, errorThrown) {
        console.log(errorThrown)
    });
}
$(".body").on('click', "button#ModificarEmpleado", function (ev) {
    $(".body").on('submit', "form#RegistroEmpleados", function (evt) {
        evt.preventDefault(); // evita que se envie el formulario
        var cedula = $(this).find('input#CedulaEmpleado').val().trim();
        var nombres = $(this).find('input#NombreEmpleado').val().trim();
        var apellidos = $(this).find('input#ApellidoEmpleado').val().trim();
        var telefono = $(this).find('input#TelefonoEmpleado').val().trim();
        var correo = $(this).find('input#CorreoEmpleado').val().trim();
        var direccion = $(this).find('input#DireccionEmpleado').val().trim();
        var fechaNac = $(this).find('input#FechaEmpleado').val().trim();
        var foto = $(this).find('input#FotoEmpleado')[0].files[0];
        var firma = $(this).find('input#FirmaEmpleado')[0].files[0];

        swal({
            title: "Esculapio",
            text: "Seguro Que Desea Modificar?",
            icon: "info",
            buttons: true,
            dangerMode: false,
        }).then((confirma) => {
            if (confirma) {
                ModificarEmpleado(cedula, apellidos, nombres, telefono, correo, direccion, fechaNac, foto, firma);
            }
        });
    });
});

function ModificarEmpleado(cedula, apellidos, nombres, telefono, correo, direccion, fechaNac, foto, firma) {

    var formData = new FormData();
    formData.append('Requerimiento', "ModificaEmpleado");
    formData.append('Cedula', cedula);
    formData.append('Apellidos', apellidos);
    formData.append('Nombres', nombres);
    formData.append('Telefono', telefono);
    formData.append('Correo', correo);
    formData.append('Direccion', direccion);
    formData.append('FechaNac', fechaNac);
    formData.append('Foto', foto);
    formData.append('Firma', firma);
    formData.append('Id', id);
    $.ajax({
        method: "POST",
        url: "Ajax/Aj_Empleado.php",
        data: formData,
        contentType: false,
        processData: false,
        dataType: 'JSON',
    }).done(function (respuesta) {
        if (respuesta[0] == true) {
            tablaempleado.draw();
            $(".modalNuevo").modal("hide");
        }
        if (respuesta[0] == false) {
            swal("Esculapio!", "Ocurrio un error. " + respuesta[1], "error");
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
            EliminarEmpleado();
        }
    });

});

function EliminarEmpleado() {
    $.ajax({
        method: "POST",
        url: "Ajax/Aj_Usuario.php",
        data: {
            Requerimiento: "EliminarEmpleado",
            Id: id
        },
        dataType: 'JSON',
    }).done(function (respuesta) {
        if (respuesta[0] == true) {
            tablaempleado.draw();
        }
        if (respuesta[0] == false) {
            swal("Esculapio!", "Ocurrio un error.", "error");
            return;
        }
    }).fail(function (jqXHR, textStatus, errorThrown) {
        console.log(errorThrown)
    });
}

var tablaempleado = null;
function ConstruirTabla() {
    tablaempleado = $('#datatableEmpleados').DataTable({
        "processing": true,
        "serverSide": true,
        "ajax": {
            url: "Ajax/Aj_Empleado.php",
            data: {
                Requerimiento: "CargarTablaEmpleadoJS"
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
            searchPlaceholder: "🔍 Buscar empleado..."
        }
    });

}

ConstruirTabla();