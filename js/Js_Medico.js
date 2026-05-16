var id = 0;
$("body").on('click', "#nuevoRegistro", function (ev) {
    $('#GuardarMedico').fadeIn(0);
    $('#ModificarMedico').fadeOut(0);
    id = 0;
    $('.body').find('.modalNuevo').find('input').val('');
    $('#cbmUsa').val("S");

    $('#FotoMedico').parent().css({
        "background": "url(imagenes/user.png) no-repeat",
        "background-size": "cover",
        "height": "15em",
        "background-position": "center center"
    });
    $('#FirmaMedico').parent().css({
        "background": "url(imagenes/firmamedico.png) no-repeat",
        "background-size": "cover",
        "height": "15em",
        "background-position": "center center"
    });
    $(".modalNuevo").modal();
    $('.selectpicker').selectpicker('refresh');
});
$(".body").on('click', "button#GuardarMedico", function (evt) {
    evt.preventDefault(); // evita que se envie el formulario
    var cedula = $('.body').find('input#CedulaMedico').val().trim();
    var apellido = $('.body').find('input#ApellidoMedico').val().trim();
    var nombre = $('.body').find('input#NombreMedico').val().trim();
    var telefono = $('.body').find('input#TelefonoMedico').val().trim();
    var correo = $('.body').find('input#CorreoMedico').val().trim();
    var direccion = $('.body').find('input#DireccionMedico').val().trim();
    var sanitario = $('.body').find('input#sanitario').val().trim();
    var fecha = $('.body').find('input#FechaMedico').val();
    var foto = $('.body').find('input#FotoMedico')[0].files[0];
    var firma = $('.body').find('input#FirmaMedico')[0].files[0];
    var sistema = $('.body').find('select#cbmUsa').val();
    var codigo = $('.body').find('input#codigo').val();

    var campos = [cedula, apellido, nombre, telefono, direccion];
    if (CamposLLenos(campos)) {
        return;
    }
    if (ValidarExisteCodigo(0, codigo)) {
        swal("Esculapio!", "Ingrese Otro Codigo... !!", "error");
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
            GuardarMedico(cedula, apellido, nombre, telefono, correo, sanitario, direccion, fecha, foto, firma, sistema, codigo);
        } else {

        }
    });
});
// funcuion para registarar en la bd Empleado
function GuardarMedico(cedula, apellidos, nombres, telefono, correo, sanitario, direccion, fechaNac, foto, firma, sistema, codigo) {
    var formData = new FormData();
    formData.append('Requerimiento', "GuardarMedico");
    formData.append('Cedula', cedula);
    formData.append('Apellidos', apellidos);
    formData.append('Nombres', nombres);
    formData.append('Telefono', telefono);
    formData.append('Correo', correo);
    formData.append('Direccion', direccion);
    formData.append('Sanitario', sanitario);
    formData.append('FechaNac', fechaNac);
    formData.append('Foto', foto);
    formData.append('Firma', firma);
    formData.append('Sistema', sistema);
    formData.append('Codigo', codigo);
    $.ajax({
        method: "POST",
        url: "Ajax/Aj_Empleado.php",
        data: formData,
        dataType: 'JSON',
        contentType: false,
        processData: false,
    }).done(function (respuesta) {
        if (respuesta[0] == true) {
            swal("Esculapio!", "Medico Guardado.!", "success");
            tablaDoctores.draw();
            $(".modalNuevo").modal("hide");
        }
        if (respuesta[0] == false) {
            if (respuesta[1] == 1062) {
                swal("Esculapio!", "Ya existe en la base de datos un medico con esa Cedula... !!", "error");
                return;
            }
            swal("Esculapio!", "Ocurrio un error", "error");
            console.log(respuesta)
            return;
        }
    }).fail(function (jqXHR, textStatus, errorThrown) {
        console.log(errorThrown)
    });
}
$(".body").on('click', "button#ModificarMedico", function (ev) {
    $(".body").on('submit', "form#PrimerPestanaEmpleado", function (evt) {
        evt.preventDefault(); // evita que se envie el formulario
        var cedula = $(this).find('input#CedulaMedico').val().trim();
        var nombres = $(this).find('input#NombreMedico').val().trim();
        var apellidos = $(this).find('input#ApellidoMedico').val().trim();
        var telefono = $(this).find('input#TelefonoMedico').val().trim();
        var correo = $(this).find('input#CorreoMedico').val().trim();
        var sanitario = $(this).find('input#sanitario').val().trim();
        var direccion = $(this).find('input#DireccionMedico').val().trim();
        var fecha = $(this).find('input#FechaMedico').val();
        var foto = $('form#PrimerPestanaEmpleado').find('input#FotoMedico')[0].files[0];
        var firma = $('form#PrimerPestanaEmpleado').find('input#FirmaMedico')[0].files[0];
        var sistema = $('form#PrimerPestanaEmpleado').find('select#cbmUsa').val();
        var codigo = $('form#PrimerPestanaEmpleado').find('input#codigo').val();
        var limpiar = $(this).find('button#LimpiarMedico');
        var t = $('#datatableDoctores').DataTable();

        if (ValidarExisteCodigo(id, codigo)) {
            swal("Esculapio!", "Ingrese Otro Codigo... !!", "error");
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
                ModificaMedico(cedula, apellidos, nombres, telefono, correo, sanitario, direccion, fecha, foto, firma, sistema, codigo, limpiar, t, id);
            } else {

            }
        });
    });
});

function ModificaMedico(cedula, apellidos, nombres, telefono, correo, sanitario, direccion, fechaNac, foto, firma, sistema, codigo, limpiar, t, id) {
    var formData = new FormData();
    formData.append('Requerimiento', "ModificaMedico");
    formData.append('Cedula', cedula);
    formData.append('Apellidos', apellidos);
    formData.append('Nombres', nombres);
    formData.append('Telefono', telefono);
    formData.append('Correo', correo);
    formData.append('Direccion', direccion);
    formData.append('Sanitario', sanitario);
    formData.append('FechaNac', fechaNac);
    formData.append('Foto', foto);
    formData.append('Firma', firma);
    formData.append('Sistema', sistema);
    formData.append('Codigo', codigo);
    formData.append('Id', id);
    $.ajax({
        method: "POST",
        url: "Ajax/Aj_Empleado.php",
        data: formData,
        dataType: 'JSON',
        contentType: false,
        processData: false,
    }).done(function (respuesta) {
        if (respuesta[0] == true) {
            swal("Esculapio!", "Medico Modificado..!", "success");
            tablaDoctores.draw();
            $(".modalNuevo").modal("hide");
        }
        if (respuesta[0] == false) {
            if (respuesta[1] == 1062) {
                swal("Esculapio!", "Cedula ya existe !!", "error");
                return;
            }
            console.log(respuesta)
            swal("Esculapio!", "Ocurrio un error.", "error");
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
        icon: "info",
        buttons: true,
        dangerMode: true,
    }).then((confirma) => {
        if (confirma) {
            EliminarMedico(limpiar, id);
        } else {

        }
    });
});

function EliminarMedico(limpiar, id) {
    $.ajax({
        method: "POST",
        url: "Ajax/Aj_Empleado.php",
        data: {
            Requerimiento: "EliminarMedico",
            Id: id
        },
        dataType: 'JSON',
    }).done(function (respuesta) {
        if (respuesta[0] == true) {
            swal("Esculapio!", "Medico Eliminado..!", "success");
            tablaDoctores.draw();
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

function ValidarExisteCodigo(id, codigo) {
    var confirma = false;
    $.ajax({
        async: false,
        method: "POST",
        url: "Ajax/Aj_Empleado.php",
        data: {
            Requerimiento: "ValidarExisteCodigo",
            Id: id, Codigo: codigo
        },
        dataType: 'JSON',
    }).done(function (respuesta) {
        console.log(respuesta)
        $.each(respuesta, function (i, iten) {
            confirma = true;
        });
    }).fail(function (jqXHR, textStatus, errorThrown) {
        console.log(errorThrown)
    });
    return confirma;
}

$("body").on('click', ".btnEditar", function (ev) {
    id = $(this).attr("registro");

    var cedula = $('.body').find('input#CedulaMedico');
    var apellido = $('.body').find('input#ApellidoMedico');
    var nombre = $('.body').find('input#NombreMedico');
    var telefono = $('.body').find('input#TelefonoMedico');
    var correo = $('.body').find('input#CorreoMedico');
    var direccion = $('.body').find('input#DireccionMedico');
    var sanitario = $('.body').find('input#sanitario');
    var fecha = $('.body').find('input#FechaMedico');
    var firma = $('.body').find('input#FirmaMedico');
    var foto = $('.body').find('input#FotoMedico');
    var sistema = $('.body').find('select#cbmUsa');
    var codigo = $('.body').find('input#codigo');
    var fila = tablaDoctores.row($(this).parents('tr')).data();
    var posiciones = [1, 2, 3, 4, 5, 8, 11, 12, 13, 14];
    var campos = [cedula, apellido, nombre, telefono, correo, direccion, fecha, sanitario, sistema, codigo];
    CargarFila(posiciones, campos, fila);
    $('button#GuardarMedico').fadeOut(0);
    $('button#ModificarMedico').fadeIn(0);

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

    imagen = fila[10];
    if (imagen == "") {
        imagen = "imagenes/firmamedico.png";
    }
    firma.parent().css({
        "background": "url('" + imagen + "') no-repeat",
        "background-size": "cover",
        "height": "15em",
        "background-position": "center center"
    });

    $('.modalNuevo').modal();

});


function filePreview(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.readAsDataURL(input.files[0]);
        reader.onload = function (e) {
            $(input).parent().css({
                "background": "url(" + e.target.result + ") no-repeat",
                "background-size": "cover",
                "height": "18em",
                "background-position": "center center"
            });
        }
    }
}
$('form#PrimerPestanaEmpleado').find('#FotoMedico,#FirmaMedico').change(function () {
    filePreview(this);
});

//////////////////////////////////////////////////
var tablaDoctores = null;

function CargarTabla() {
    tablaDoctores = $('#datatableDoctores').DataTable({
        dom: '<"top"lBf>rt<"bottom"ip>',
        "processing": true,
        "serverSide": true,
        "ajax": {
            url: "Ajax/Aj_Empleado.php",
            data: {
                Requerimiento: "CargarTablaMedicoJS"
            },
            type: "POST"
        },
        scrollY: 300,
        scrollX: true,
        keys: true,
        ordering: false,
        lengthChange: false,
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
        "columnDefs": [
            {
                "targets": [6, 7, 9, 10, 14],
                "visible": false,
            },]
    });
}
CargarTabla();
