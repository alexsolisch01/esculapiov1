var tabla = null;
var tablaCliente = null;
var tablaInventario = null;
var tablaDetalle = null;
var tablaAnticipo = null;
var tablaFacturas = null;
var tablaRecetas = null;
var fraccion = false;
var anular = false;
var valorRecibido = 0;
var valorRecibidoCheque = 0;
var valorRecibidoTarjeta = 0;
var valorCredito = 0;
var valorRecibidoAnticipo = 0;
var valorTransferencia = 0;
var idClienteNuevo = '';
var ivaMovimiento = 0;
var descuentoMovimiento = 0;
var totalMovimiento = 0;
var facturando = false;
var clavesri = "";
$(".body").on('keyup', "input.filtroPacientesInv", function(ev) {
    if (ev.keyCode == 13) {
        Cargar($('#cedulaFiltro').val().trim(),
            $('#apellidoPFiltro').val().trim(),
            $('#apellidoMFiltro').val().trim(),
            $('#nombreFiltro').val().trim());
    }
});

function Cargar(cedula, apellido1, apellido2, nombres) {
    $.ajax({
        method: "POST",
        url: "Ajax/Aj_Paciente.php",
        data: {
            Requerimiento: "Cargar",
            Cedula: cedula,
            ApellidoP: apellido1,
            ApellidoM: apellido2,
            Nombres: nombres
        },
        dataType: 'JSON',
    }).done(function(respuesta) {
        if (respuesta[0] == false) {
            swal("Esculapio!", "Error Problema!", "error");
            return;
        }
        $("#datatableFacturaInv tbody").empty();
        try {

            $.each(respuesta, function(i, value) {
                var elemento = ' <tr>' +
                    '<td>' + value[0] + '</td>' +
                    '<td>' + value[1] + '</td>' +
                    '<td>' + value[2] + '</td>' +
                    '<td>' + value[3] + '</td>' +
                    '<td>' + value[4] + '</td>' +
                    '<td>' + value[5] + '</td>' +
                    '<td style="display:none;">' + value[6] + '</td>' +
                    '<td><span fecha_nacimiento="' + value[8] + '">' + value[7] + '</span></td>' +
                    '<td>' + value[10] + '</td>' +
                    '</tr> ';
                $("#datatableFacturaInv tbody").append(elemento);
            });
        } catch (error) {

        }
    }).fail(function(jqXHR, textStatus, errorThrown) {
        console.log(errorThrown)
    });
}

$('.body table#datatableFacturaInv tbody').on('dblclick', 'tr', function(evt) {
    var cerrar = $('.body').find('button.close');
    id = $(this).find('td').eq(0).html();
    LimpiarCobrar();

    $('.body').find('strong#nombreCompleto').attr('idPaciente', id);
    var cedula = $('.body').find('span#cedula');
    var apellido = $('.body').find('strong#nombreCompleto');
    var direccion = $('.body').find('span#direccion');
    var telefono = $('.body').find('span#telefono');
    var correo = $('.body').find('span#email');
    var fila = $(this);
    correo.text(fila.find('td').eq(5).html());
    cedula.text(fila.find('td').eq(1).html());
    apellido.text(fila.find('td').eq(2).html() + ' ' + fila.find('td').eq(3).html() + ' ' + fila.find('td').eq(4).html());
    direccion.text(fila.find('td').eq(6).html());
    telefono.text(fila.find('td').eq(7).find('span').html());
    apellido.attr("fecha", fila.find('td').eq(7).find('span').attr('fecha_nacimiento'));
    $(".body div#DatosPaciente").css('visibility', 'visible');
    var edad = calcularEdad($('strong#nombreCompleto').attr("fecha"));
    $('.body').find('span#edad').html(edad);
    cerrar.trigger('click');
});

function calcularEdad(fecha) {
    // Si la fecha es correcta, calculamos la edad

    if (typeof fecha != "string" && fecha && esNumero(fecha.getTime())) {
        fecha = formatDate(fecha, "yyyy-MM-dd");
    }

    var values = fecha.split("-");
    var dia = values[2];
    var mes = values[1];
    var ano = values[0];

    // cogemos los valores actuales
    var fecha_hoy = new Date();
    var ahora_ano = fecha_hoy.getYear();
    var ahora_mes = fecha_hoy.getMonth() + 1;
    var ahora_dia = fecha_hoy.getDate();

    // realizamos el calculo
    var edad = (ahora_ano + 1900) - ano;
    if (ahora_mes < mes) {
        edad--;
    }
    if ((mes == ahora_mes) && (ahora_dia < dia)) {
        edad--;
    }
    if (edad > 1900) {
        edad -= 1900;
    }

    // calculamos los meses
    var meses = 0;

    if (ahora_mes > mes && dia > ahora_dia)
        meses = ahora_mes - mes - 1;
    else if (ahora_mes > mes)
        meses = ahora_mes - mes
    if (ahora_mes < mes && dia < ahora_dia)
        meses = 12 - (mes - ahora_mes);
    else if (ahora_mes < mes)
        meses = 12 - (mes - ahora_mes + 1);
    if (ahora_mes == mes && dia > ahora_dia)
        meses = 11;

    // calculamos los dias
    var dias = 0;
    if (ahora_dia > dia)
        dias = ahora_dia - dia;
    if (ahora_dia < dia) {
        ultimoDiaMes = new Date(ahora_ano, ahora_mes - 1, 0);
        dias = ultimoDiaMes.getDate() - (dia - ahora_dia);
    }

    return edad + " años, " + meses + " meses y " + dias + " días";
}

$('.body div#radioBtn').on('click', 'a#NoCon', function(evt) {
    $(".body div#DatosCliente").css('visibility', 'visible');
    var cedula = $('.body').find('span#cedula');
    var apellido = $('.body').find('strong#nombreCompleto');
    var direccion = $('.body').find('span#direccion');
    var telefono = $('.body').find('span#telefono');
    var correo = $('.body').find('span#email');
    $('.body').find('span#cedulaCliente').text(cedula.text());
    var valor = $('.body').find('span#cedulaCliente').text();
    var correcta = valor;
    var valores = ConsultarClientePorCedula(correcta);
    if (valores[0] == false) {
        $('.body').find('span#cedulaCliente').text(cedula.text());
        $('.body').find('strong#nombreCompletoCliente').text(apellido.text());
        $('.body').find('strong#nombreCompletoCliente').attr('idCliente', -1);
        $('.body').find('span#direccionCliente').text(direccion.text());
        $('.body').find('span#telefonoCliente').text(telefono.text());
        $('.body').find('span#emailCliente').text(correo.text());
    } else {
        $('.body').find('span#cedulaCliente').text(cedula.text());
        $('.body').find('strong#nombreCompletoCliente').text(apellido.text());
        $('.body').find('strong#nombreCompletoCliente').attr('idCliente', valores[1]);
        $('.body').find('span#direccionCliente').text(direccion.text());
        $('.body').find('span#telefonoCliente').text(telefono.text());
        $('.body').find('span#emailCliente').text(correo.text());
    }
    var idCliente = $('.body').find('strong#nombreCompletoCliente').attr('idCliente');
    ConsultarAnticipo(idCliente);
});
$('.body div#radioBtn').on('click', 'a#SiCon', function(evt) {
    $('.body div#radioBtn a#Si').trigger('click');
    $(".body div#DatosCliente").css('visibility', 'hidden');
    $('.body').find('span#cedulaCliente').text("9999999999");
    $('.body').find('strong#nombreCompletoCliente').text("CONSUMIDOR FINAL");
    $('.body').find('strong#nombreCompletoCliente').attr('idCliente', '1');
    $('.body').find('span#direccionCliente').text("----------------");
    $('.body').find('span#telefonoCliente').text("----------------");
    $('.body').find('span#emailCliente').text("-----------------");
});
$('.body div#radioBtn').on('click', 'a#Si', function(evt) {

    $(".body div#DatosCliente").css('visibility', 'visible');
    var cedula = $('.body').find('span#cedula');
    var apellido = $('.body').find('strong#nombreCompleto');
    var direccion = $('.body').find('span#direccion');
    var telefono = $('.body').find('span#telefono');
    var correo = $('.body').find('span#email');
    $('.body').find('span#cedulaCliente').text(cedula.text());
    var valor = $('.body').find('span#cedulaCliente').text();
    var correcta = valor;
    var valores = ConsultarClientePorCedula(correcta);
    if (valores[0] == false) {
        $('.body').find('span#cedulaCliente').text(cedula.text());
        $('.body').find('strong#nombreCompletoCliente').text(apellido.text());
        $('.body').find('strong#nombreCompletoCliente').attr('idCliente', -1);
        $('.body').find('span#direccionCliente').text(direccion.text());
        $('.body').find('span#telefonoCliente').text(telefono.text());
        $('.body').find('span#emailCliente').text(correo.text());
    } else {
        $('.body').find('span#cedulaCliente').text(cedula.text());
        $('.body').find('strong#nombreCompletoCliente').text(apellido.text());
        $('.body').find('strong#nombreCompletoCliente').attr('idCliente', valores[1]);
        $('.body').find('span#direccionCliente').text(direccion.text());
        $('.body').find('span#telefonoCliente').text(telefono.text());
        $('.body').find('span#emailCliente').text(correo.text());
    }
    var idCliente = $('.body').find('strong#nombreCompletoCliente').attr('idCliente');
    ConsultarAnticipo(idCliente);
});

function ConsultarClientePorCedula(cedula) {
    var valores = [];
    var bandera = false;
    valores[0] = bandera;
    $.ajax({
        async: false,
        method: "POST",
        url: "Ajax/Aj_Paciente.php",
        data: {
            Requerimiento: "ConsultarClientePorCedula",
            Cedula: cedula
        },
        dataType: 'JSON',
    }).done(function(respuesta) {
        if (respuesta[0] == false) {
            return;
        }
        $.each(respuesta, function(i, value) {
            bandera = true
            valores[0] = bandera;
            valores[1] = respuesta[i][0];
        });

    }).fail(function(jqXHR, textStatus, errorThrown) {
        console.log(errorThrown)
    });
    return valores;
}

function ConsultarAnticipo(idPaciente) {
    $.ajax({
        method: "POST",
        url: "Ajax/Aj_Forma_pago.php",
        data: {
            Requerimiento: "ConsultarAnticipo",
            Id: idPaciente
        },
        dataType: 'JSON',
    }).done(function(respuesta) {
        try {
            tablaAnticipo.clear().draw();
        } catch (error) {}
        var confirma = false;
        $.each(respuesta, function(i, value) {
            var input = '<input style="width:80px;" type="number" required step=".01" value="0.00" class="form-control" idAnticipo=' + respuesta[i][0] + ' id="ValorQuitar"  placeholder="Valor">';
            var check = '<input type="checkbox" id="CobrarTodo">';
            var campos = [parseFloat(respuesta[i][1]).toFixed(2), respuesta[i][2], input, check];
            if (respuesta[i][1] != 0) {
                tablaAnticipo.row.add(campos).draw(true);
            }
            confirma = true;
        });
        if (confirma == false) {
            $('.body').find('div#DivAnticipo').fadeOut(1);
        } else {
            $('.body').find('div#DivAnticipo').fadeIn(1);
        }
    }).fail(function(jqXHR, textStatus, errorThrown) {
        console.log(errorThrown)
    });
}

function LlenarTablaClienteFactura() {
    tablaCliente = $('#datatableClienteFacturaInv').DataTable({
        "processing": true,
        "serverSide": true,
        lengthMenu: [
            [100, 200, 300],
            [100, 200, 300]
        ],
        "ajax": {
            url: "Ajax/Aj_Paciente.php",
            data: {
                Requerimiento: "LlenarTablaClienteFactura"
            },
            type: "POST"
        },
        scrollY: 200,
        scrollX: true,
        keys: true,
        scroller: {
            loadingIndicator: true
        },
        "columnDefs": [{
            "targets": [0, 1, 2, 3, 4, 5, 6, 7, 8],
            "orderable": false,
        }, {
            "targets": [6, 7],
            "visible": false,
        }, ],
    });

    $('#datatableClienteFacturaInv_filter input').css("margin-left", "-75em");
    $('#datatableClienteFacturaInv_filter input').css("width", "75em");
}
LlenarTablaClienteFactura();
$('#modal-datos-cliente').on('shown.bs.modal', function() {
    $('.body').find('button#ModificarCliente').prop('disabled', true);
    $('.body').find('button#AgregarCliente').prop('disabled', false);
    $('.body').find('input#cedulaCliente').val("");
    $('.body').find('input#nombreCliente').val("");
    $('.body').find('input#apellidoCliente').val("");
    $('.body').find('input#direccionCliente').val("");
    $('.body').find('input#emailCliente').val("");
    $('.body').find('input#telefonoCliente').val("");
    tablaCliente.column(1).search('').draw();
    $('input#cedulaClienteFiltro').val("");
});

$('.body table#datatableClienteFacturaInv tbody').on('dblclick', 'tr', function(evt) {
    var cerrar = $('.body').find('button.close');
    id = $(this).find('td').eq(0).html();
    $('.body').find('strong#nombreCompletoCliente').attr('idCliente', id);
    var cedula = $('.body').find('span#cedulaCliente');
    var apellido = $('.body').find('strong#nombreCompletoCliente');
    var direccion = $('.body').find('span#direccionCliente');
    var telefono = $('.body').find('span#telefonoCliente');
    var correo = $('.body').find('span#emailCliente');
    var datos = tablaCliente.row($(this)).data();
    correo.text(datos[5]);
    cedula.text(datos[1]);
    apellido.text(datos[2] + ' ' + datos[3] + ' ' + datos[4]);
    direccion.text(datos[6]);
    telefono.text(datos[7]);
    ConsultarAnticipo(id);
    $(".body div#DatosPaciente").css('visibility', 'visible');
    cerrar.trigger('click');
});

$(".body").on('click', "button#GuardarCliente", function(ev) {
    $(".body").on('submit', "form#AgregarCliente", function(evt) {
        evt.preventDefault()
        var ruc = $('.body').find('input#cedulaCliente').val().trim();
        var nombre = $('.body').find('input#nombreCliente').val().trim();
        var apellido = $('.body').find('input#apellidoCliente').val().trim();
        var direccion = $('.body').find('input#direccionCliente').val().trim();
        var correo = $('.body').find('input#emailCliente').val().trim();
        var telefono = $('.body').find('input#telefonoCliente').val().trim();
        if (correo == "") {
            correo = $("#CorreoBasura").val();
        }
        if ($("#cbmTipoIde").val() == "1") {
            if (!ValidarCedula(ruc)) {
                swal("Esculapio!", "Cedula o Ruc incorrecto.", "error");
                return;
            }
        }
        var confirmados = false;
        if (cedula != '') {
            confirmados = ExisteCedulaCliente(ruc);
        }
        if (confirmados == true) {
            swal("Esculapio!", "La Cedula o Ruc ingresada ya esta registrada, por favor buscar en los CLIENTES registrados", "error");
            return;
        }
        swal({
            title: "Esculapio",
            text: "Seguro Que Desea Agregar a este Cliente?",
            icon: "info",
            buttons: true,
            dangerMode: false,
        }).then((confirma) => {
            if (confirma) {
                GuardarClientePaciente(ruc, nombre, apellido, direccion, telefono, correo, 'prueba');
                var cerrar = $('.body').find('button.close');
                cerrar.trigger('click');
            } else {

            }
        });

    });
});

function GuardarClientePaciente(ruc, nombre, apellido, direccion, telefono, correo, cobrar) {
    $.ajax({
        async: false,
        method: "POST",
        url: "Ajax/Aj_Paciente.php",
        data: {
            Requerimiento: "GuardaClientePaciente",
            Ruc: ruc,
            Apellido: apellido,
            Nombre: nombre,
            Direccion: direccion,
            Telefono: telefono,
            Correo: correo
        },
        dataType: 'JSON',
    }).done(function(respuesta) {
        if (respuesta[0] == true) {
            if (cobrar == 'prueba') {
                var cedula1 = $('.body').find('span#cedulaCliente');
                var apellido1 = $('.body').find('strong#nombreCompletoCliente');
                var direccion1 = $('.body').find('span#direccionCliente');
                var telefono1 = $('.body').find('span#telefonoCliente');
                var correo1 = $('.body').find('span#emailCliente');
                var fila = JSON.parse(respuesta[1]);
                cedula1.html(ruc);
                apellido1.html(apellido + ' ' + nombre);
                apellido1.attr('idCliente', fila[0][0]);
                direccion1.html(direccion);
                telefono1.html(telefono);
                correo1.html(correo);

                return;
            } else {
                var fila = JSON.parse(respuesta[1]);
                idClienteNuevo = fila[0][0];
                return;
            }

        }
        if (respuesta[0] == false) {
            swal("Esculapio!", "No Se Pudo Guardgggar el Empleado!, Se cargara la pantalla nuevamente para solucionar el problema.", "error");
            // location.reload();
            return;
        }
    }).fail(function(jqXHR, textStatus, errorThrown) {
        console.log(errorThrown)
    });
}
$(".body table#datatableClienteFacturaInv").on('click', "button#CargarDatos", function(evt) {
    $('.body').find('button#GuardarCliente').prop('disabled', true);
    $('.body').find('button#ModificarCliente').prop('disabled', false);
    idClientePaciente = $(this).attr('idCliente');

    var datos = tablaCliente.row($(this).parents('tr')).data();

    var cedula = datos[1];
    var ape_pat = datos[2];
    var ape_mat = datos[3];
    var nombre = datos[4];
    var email = datos[5];
    var direccion = datos[6];
    var telefono = datos[7];

    $('.body').find('input#cedulaCliente').val(cedula);
    $('.body').find('input#nombreCliente').val(nombre);
    $('.body').find('input#apellidoCliente').val(ape_pat + " " + ape_mat);
    $('.body').find('input#direccionCliente').val(direccion);
    $('.body').find('input#emailCliente').val(email);
    $('.body').find('input#telefonoCliente').val(telefono);
});
$(".body").on('click', "button#ModificarCliente", function(ev) {
    $(".body").on('submit', "form#AgregarCliente", function(evt) {
        evt.preventDefault()

        var ruc = $('.body').find('input#cedulaCliente').val().trim();
        var nombre = $('.body').find('input#nombreCliente').val().trim();
        var apellido = $('.body').find('input#apellidoCliente').val().trim();
        var direccion = $('.body').find('input#direccionCliente').val().trim();
        var correo = $('.body').find('input#emailCliente').val().trim();
        var telefono = $('.body').find('input#telefonoCliente').val().trim();
        swal({
            title: "Esculapio",
            text: "Seguro Que Desea Modificar a este Cliente?",
            icon: "info",
            buttons: true,
            dangerMode: false,
        }).then((confirma) => {
            if (confirma) {
                ModificarClientePaciente(ruc, nombre, apellido, direccion, telefono, correo);
                var cerrar = $('.body').find('button.close');
                cerrar.click();
            } else {

            }
        });

    });
});

function ModificarClientePaciente(ruc, nombre, apellido, direccion, telefono, correo) {
    $.ajax({
        method: "POST",
        url: "Ajax/Aj_Paciente.php",
        data: {
            Requerimiento: "ModificarClientePaciente",
            Id: idClientePaciente,
            Ruc: ruc,
            Apellido: apellido,
            Nombre: nombre,
            Direccion: direccion,
            Telefono: telefono,
            Correo: correo
        },
        dataType: 'JSON',
    }).done(function(respuesta) {
        if (respuesta[0] == true) {

            var cedula1 = $('.body').find('span#cedulaCliente');
            var apellido1 = $('.body').find('strong#nombreCompletoCliente');
            var direccion1 = $('.body').find('span#direccionCliente');
            var telefono1 = $('.body').find('span#telefonoCliente');
            var correo1 = $('.body').find('span#emailCliente');
            var fila = JSON.parse(respuesta[1]);
            cedula1.html(ruc);
            apellido1.html(apellido + ' ' + nombre);
            apellido1.attr('idCliente', fila[0][0]);
            direccion1.html(direccion);
            telefono1.html(telefono);
            correo1.html(correo);

            return;

        }
        if (respuesta[0] == false) {
            swal("Esculapio!", "Ocurrio un error.", "error");
            console.log(respuesta)
            return;
        }
    }).fail(function(jqXHR, textStatus, errorThrown) {
        console.log(errorThrown)
    });
}
$(".body").on('click', "strong#nombreCompleto", function(evt) {
    id = $(this).attr('idPaciente');
    CargarPacientePorId();
});
$(".body").on('click', "img#clickModificar", function(evt) {
    id = $('.body').find('strong#nombreCompleto').attr('idPaciente');
    CargarPacientePorId();
});

function CargarPacientePorId() {

    if (id == 0) {
        $('button#GuardarModificarPaciente').prop('disabled', false);
        $('button#ModificarPaciente').prop('disabled', true);
    } else {
        $.ajax({
            async: false,
            method: "POST",
            url: "Ajax/Aj_Paciente.php",
            data: {
                Requerimiento: "CargarPacientePorId",
                Id: id
            },
            dataType: 'JSON',
        }).done(function(respuesta) {
            if (respuesta[0] == false) {
                swal("Esculapio!", "OCURRIO UN ERROR.", "error");
                return;
            }
            var correo = respuesta[0][9];
            if (correo.trim().length == 0) {
                correo = $("#CorreoBasura").val();
            }
            $('.body').find('input#CedulaModificarPaciente').val(respuesta[0][1]);
            $('.body').find('input#ApellidoPModificarPaciente').val(respuesta[0][2]);
            $('.body').find('input#ApellidoMModificarPaciente').val(respuesta[0][12]);
            $('.body').find('input#NombreModificarPaciente').val(respuesta[0][3]);
            $('.body').find('input#FechaModificarPaciente').val(respuesta[0][4]);
            $('.body').find('input#DireccionModificarPaciente').val(respuesta[0][5]);
            $('.body').find('select#CantonModificarPaciente').val(respuesta[0][6]);
            $('.body').find('input#TelefonoModificarPaciente').val(respuesta[0][8]);
            $('.body').find('input#CorreoModificarPaciente').val(correo);
            $('.body').find('select#CantonModificarPaciente').change();
            if (respuesta[0][10] == " ") {
                $('.body').find('select#EstadoCivilModificarPaciente').val('SOLTERO/A');
            } else {
                $('.body').find('select#EstadoCivilModificarPaciente').val(respuesta[0][10]);
            }
            $('.body').find('input#OcupacionModificarPaciente').val(respuesta[0][11]);
            var edad = calcularEdad(respuesta[0][4]);
            $('.body').find('input#EdadModificarPaciente').val(edad);
            $('.body').find('#Genero2').val(respuesta[0][13]);
            $('.body').find('#ParroquiaModificarPaciente').val(respuesta[0][14]);
            $('.body').find('#SectorModificarPaciente').val(respuesta[0][15]);
            $('.selectpicker').selectpicker('refresh');
            $('button#ModificarPaciente').prop('disabled', false);
            $('button#GuardarModificarPaciente').prop('disabled', true);
        }).fail(function(jqXHR, textStatus, errorThrown) {
            console.log(errorThrown)
        });
    }
}

function CargarClientePorIdConsulta(id) {
    $.ajax({
        method: "POST",
        url: "Ajax/Aj_Paciente.php",
        data: {
            Requerimiento: "CargarClientePorIdConsulta",
            Id: id
        },
        dataType: 'JSON',
    }).done(function(respuesta) {
        if (respuesta[0] == false) {
            swal("Esculapio!", "OCURRIO UN ERROR.", "error");
            return;
        }
        $('.body').find('span#cedulaCliente').text(respuesta[0][1]);
        $('.body').find('strong#nombreCompletoCliente').text(respuesta[0][2] + " " + respuesta[0][3]);
        $('.body').find('strong#nombreCompletoCliente').attr('idCliente', respuesta[0][0]);
        $('.body').find('span#direccionCliente').text(respuesta[0][4]);
        $('.body').find('span#telefonoCliente').text(respuesta[0][5]);
        $('.body').find('span#emailCliente').text(respuesta[0][6]);
    }).fail(function(jqXHR, textStatus, errorThrown) {
        console.log(errorThrown)
    });
}
$(".body").on('click', "button#GuardarModificarPaciente", function(ev) {
    $(".body").on('submit', "form#ModificarPacienteFact", function(evt) {
        evt.preventDefault();
        var canton = $(this).find('select#CantonModificarPaciente').val();
        if (canton == 0) {
            swal("Esculapio!", "Debe seleccionar una Canton", "error");
            return;
        }
        var estadoCivil = $(this).find('select#EstadoCivilModificarPaciente').val();
        if (estadoCivil == 0) {
            swal("Esculapio!", "Debe seleccionar Estado Civil", "error");
            return;
        }
        var cedula = $(this).find('input#CedulaModificarPaciente').val().trim();
        var nombre = $(this).find('input#NombreModificarPaciente').val().trim();
        var apellido = $(this).find('input#ApellidoPModificarPaciente').val().trim();
        var apellidom = $(this).find('input#ApellidoMModificarPaciente').val().trim();
        var direccion = $(this).find('input#DireccionModificarPaciente').val().trim();
        var fecha = $(this).find('input#FechaModificarPaciente').val().trim();
        var telefono = $(this).find('input#TelefonoModificarPaciente').val().trim();
        var correo = $(this).find('input#CorreoModificarPaciente').val().trim();
        var ocupacion = $(this).find('input#OcupacionModificarPaciente').val().trim();

        var genero = $(this).find('#Genero2').val().trim();
        if (genero == 0 || genero == 3) {
            swal("Esculapio!", "Debe seleccionar el Genero", "error");
            return;
        }
        var parroquia = $(this).find('#ParroquiaModificarPaciente').val()
        var sector = $(this).find('#SectorModificarPaciente').val()

        if (parroquia == 0) {
            swal("Esculapio!", "Debe seleccionar una PARROQUIA", "error");
            return;
        }

        var limpiar = $(this).find('button#LimpiarDatosFact');
        var confirmados = false;
        $(".body div#DatosPaciente").css('visibility', 'visible');
        if (cedula != '') {
            confirmados = ExisteCedula(cedula);
        }
        if (confirmados == true) {
            swal("Esculapio!", "La Cedula ingresada ya esta registrada, por favor buscar en los pacientes registrados", "error");
            var cerrar = $('.body').find('button.close');
            cerrar.click();
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
                GuardarPacienteModificar(cedula, apellido, apellidom, nombre, direccion, fecha, canton, telefono, correo, estadoCivil, ocupacion, genero, limpiar, parroquia, sector);
            } else {
                limpiar.trigger('click');
            }
        });
    });
});

function GuardarPacienteModificar(cedula, apellido, apellidom, nombre, direccion, fecha, canton, telefono, correo, estadoCivil, ocupacion, genero, limpiar, parroquia, sector) {
    $.ajax({
        method: "POST",
        url: "Ajax/Aj_Paciente.php",
        data: {
            Requerimiento: "GuardaPaciente",
            Cedula: cedula,
            Apellido: apellido,
            ApellidoM: apellidom,
            Nombre: nombre,
            Direccion: direccion,
            Fecha: fecha,
            Canton: canton,
            Telefono: telefono,
            Correo: correo,
            EstadoCivil: estadoCivil,
            Ocupacion: ocupacion,
            Genero: genero,
            Parroquia: parroquia,
            Sector: sector
        },
        dataType: 'JSON',
    }).done(function(respuesta) {
        if (respuesta[0] == true) {
            var fila = JSON.parse(respuesta[1]);
            swal("Esculapio!", "Paciente Guardado.!", "success").then((confirma) => {
                $('.body').find('span#cedula').text(cedula);
                $('.body').find('strong#nombreCompleto').text(apellido + ' ' + apellidom + ' ' + nombre);
                $('.body').find('strong#nombreCompleto').attr('fecha', fecha);
                $('.body').find('strong#nombreCompleto').attr('idPaciente', fila[0][0]);
                $('.body').find('span#direccion').text(direccion);
                $('.body').find('span#telefono').text(telefono);
                $('.body').find('span#email').text(correo);
                var edad = calcularEdad($('strong#nombreCompleto').attr("fecha"));
                $('.body').find('span#edad').html(edad);
                var cerrar = $('.body').find('button.close');
                cerrar.click();
                limpiar.trigger('click');
            });
            return;
        }
        if (respuesta[0] == false) {
            swal("Esculapio!", "OCURRIO un error.", "error");
            console.log(respuesta)
            return;
        }
    }).fail(function(jqXHR, textStatus, errorThrown) {
        console.log(errorThrown)
    });
}
$(".body").on('click', "button#ModificarPaciente", function(ev) {
    $(".body").on('submit', "form#ModificarPacienteFact", function(evt) {
        evt.preventDefault(); // evita que se envie el formulario

        var canton = $(this).find('select#CantonModificarPaciente').val();
        if (canton == 0) {
            swal("Esculapio!", "Debe seleccionar una Canton", "error");
            return;
        }
        var estadoCivil = $(this).find('select#EstadoCivilModificarPaciente').val();
        if (estadoCivil == 0) {
            swal("Esculapio!", "Debe seleccionar Estado Civil", "error");
            return;
        }
        var genero = $(this).find('#Genero2').val().trim();
        if (genero == 0 || genero == 3) {
            swal("Esculapio!", "Debe seleccionar el Genero", "error");
            return;
        }
        var cedula = $(this).find('input#CedulaModificarPaciente').val().trim();
        var nombre = $(this).find('input#NombreModificarPaciente').val().trim();
        var apellido = $(this).find('input#ApellidoPModificarPaciente').val().trim();
        var apellidoM = $(this).find('input#ApellidoMModificarPaciente').val().trim();
        var direccion = $(this).find('input#DireccionModificarPaciente').val().trim();
        var fecha = $(this).find('input#FechaModificarPaciente').val().trim();
        var telefono = $(this).find('input#TelefonoModificarPaciente').val().trim();
        var correo = $(this).find('input#CorreoModificarPaciente').val().trim();
        var ocupacion = $(this).find('input#OcupacionModificarPaciente').val().trim();
        var limpiar = $(this).find('button#LimpiarDatosFact');

        var parroquia = $(this).find('#ParroquiaModificarPaciente').val()
        var sector = $(this).find('#SectorModificarPaciente').val()

        if (parroquia == 0) {
            swal("Esculapio!", "Debe seleccionar una PARROQUIA", "error");
            return;
        }

        ModificarPacienteFactura(cedula, apellido, apellidoM, nombre, direccion, fecha, canton, telefono, correo, estadoCivil, ocupacion, genero, limpiar, parroquia, sector);

    });
});

$(".body").on('click', "button#LimpiarDatosFact", function(ev) {
    $('.body').find('select#EstadoCivilModificarPaciente').val('0');
    $('.body').find('select#CantonModificarPaciente').val('0');
    $('.body').find('#Genero2').val("0");
    $('.selectpicker').selectpicker('refresh');
    id = 0;
});

function ModificarPacienteFactura(cedula, apellido, apellidoM, nombre, direccion, fecha, canton, telefono, correo, estadoCivil, ocupacion, genero, limpiar, parroquia, sector) {
    $.ajax({
        method: "POST",
        url: "Ajax/Aj_Paciente.php",
        data: {
            Requerimiento: "ModificaPaciente",
            Cedula: cedula,
            Apellido: apellido,
            ApellidoM: apellidoM,
            Nombre: nombre,
            Direccion: direccion,
            Fecha: fecha,
            Canton: canton,
            Telefono: telefono,
            Correo: correo,
            EstadoCivil: estadoCivil,
            Ocupacion: ocupacion,
            Genero: genero,
            Parroquia: parroquia,
            Sector: sector,
            Id: id
        },
        dataType: 'JSON',
    }).done(function(respuesta) {
        if (respuesta[0] == true) {
            $('.body').find('span#cedula').text(cedula);
            $('.body').find('strong#nombreCompleto').text(apellido + ' ' + apellidoM + ' ' + nombre);
            $('.body').find('strong#nombreCompleto').attr('fecha', fecha);
            $('.body').find('span#direccion').text(direccion);
            $('.body').find('span#telefono').text(telefono);
            $('.body').find('span#email').text(correo);
            var edad = calcularEdad($('strong#nombreCompleto').attr("fecha"));
            $('.body').find('span#edad').html(edad);
            var cerrar = $('.body').find('button.close');
            limpiar.trigger('click')
            cerrar.trigger('click')
            return;
        }
        if (respuesta[0] == false) {
            swal("Esculapio!", "Ocurrio un error.", "error");
            console.log(respuesta)
            return;
        }
    }).fail(function(jqXHR, textStatus, errorThrown) {
        console.log(errorThrown)
    });
}
$(".body").on('change', "#CantonModificarPaciente", function(ev) {
    CargarParroquias($(this).val());
    CargarSectores($(this).val());
});

function CargarParroquias(id) {

    $.ajax({
        async: false,
        method: "POST",
        url: "Ajax/Aj_Paciente.php",
        data: {
            Requerimiento: "CargaComboAnidado2",
            Id: id
        },
        dataType: 'JSON',
    }).done(function(respuesta) {
        if (respuesta != false) {
            $('#ParroquiaModificarPaciente').empty();
            $.each(respuesta, function(i, value) {
                var elem = '<option value=' + respuesta[i][0] + '>' + respuesta[i][1] + '</option>';
                $('#ParroquiaModificarPaciente').append(elem);
            });
        }
        $('.selectpicker').selectpicker('refresh');
    });
}

function CargarSectores(id) {

    $.ajax({
        async: false,
        method: "POST",
        url: "Ajax/Aj_Paciente.php",
        data: {
            Requerimiento: "CargaComboAnidado3",
            Id: id
        },
        dataType: 'JSON',
    }).done(function(respuesta) {
        if (respuesta != false) {
            $('#SectorModificarPaciente').empty();
            $.each(respuesta, function(i, value) {
                var elem = '<option value="' + respuesta[i][1] + '">' + respuesta[i][1] + '</option>';
                $('#SectorModificarPaciente').append(elem);
            });
        }
        $('.selectpicker').selectpicker('refresh');
    });
}
$(".body").on('change', "input#FechaModificarPaciente", function(ev) {
    var fecha = $(this).val();
    var edad = calcularEdad(fecha);
    $('.body').find('input#EdadModificarPaciente').val(edad);
});

function ExisteCedula(cedula) {
    var encontro = false;
    $.ajax({
        async: false,
        method: "POST",
        url: "Ajax/Aj_Paciente.php",
        data: {
            Requerimiento: "ExisteCedula",
            Cedula: cedula
        },
        dataType: 'JSON',
    }).done(function(respuesta) {
        $.each(respuesta, function(a) {
            encontro = true;
        });
    }).fail(function(jqXHR, textStatus, errorThrown) {
        console.log(errorThrown)
    });
    return encontro;
}
$(".body").on('change', "input#CedulaModificarPaciente", function(ev) {
    var cedula = $(this).val();
    var confirmados = false;
    if (cedula != '') {
        confirmados = ExisteCedula(cedula);
    }
    if (confirmados == true) {
        swal("Esculapio!", "La Cedula ingresada ya esta registrada, por favor buscar en los pacientes registrados", "error");
    }
});

function ExisteCedulaCliente(cedula) {
    var encontro = false;
    $.ajax({
        async: false,
        method: "POST",
        url: "Ajax/Aj_Paciente.php",
        data: {
            Requerimiento: "ExisteCedulaCliente",
            Cedula: cedula
        },
        dataType: 'JSON',
    }).done(function(respuesta) {
        $.each(respuesta, function(a) {
            encontro = true;
        });
    }).fail(function(jqXHR, textStatus, errorThrown) {
        console.log(errorThrown)
    });
    return encontro;
}

$(".body").on('change', "input#cedulaCliente", function(ev) {
    var cedula = $(this).val();
    var confirmados = false;
    if (cedula != '') {
        confirmados = ExisteCedulaCliente(cedula);
    }
    if (confirmados == true) {
        swal("Esculapio!", "La Cedula ingresada ya esta registrada, por favor buscar en los CLIENTES registrados", "error");
    }
});

function validacion(cedula, modal = false) {
    var confirma = false;
    if (ValidarCedula(cedula) == true || cedula == '9999999999' || $("#cbmTipoIde").val() == "2") {
        if (modal) {
            $('div#modal-cobrar').modal();
        }
    } else {
        swal("Esculapio!", "La cédula del cliente no es correcta, modifique la cédula por favor", "error").then((confirma) => {
            $('.body div#radioBtn a#Si').trigger('click');
            $(".body div#DatosCliente").css('visibility', 'hidden');
            $('.body').find('span#cedulaCliente').text("9999999999");
            $('.body').find('strong#nombreCompletoCliente').text("CONSUMIDOR FINAL");
            $('.body').find('strong#nombreCompletoCliente').attr('idCliente', '1');
            $('.body').find('span#direccionCliente').text("----------------");
            $('.body').find('span#telefonoCliente').text("----------------");
            $('.body').find('span#emailCliente').text("-----------------");
        });
        confirma = true;
        $("#SiCon").click();
    }
    return confirma;
}
//////////////////////////////////////////////////////////////////////////DETALLE///////////////////////////////////////////////////////

function CargarTablasFarmacia() {
    tablaDetalle = $('#datatableDetalleFactFarmacia').DataTable({
        'paging': false,
        'lengthChange': false,
        'searching': false,
        'ordering': false,
        'info': true,
        'autoWidth': false,
        scrollY: 400,
        scrollX: true,
        'columnDefs': [{
            "targets": [10],
            "visible": false
        }]
    });

    tablaAnticipo = $('#datatableAnticipoFarmacia').DataTable({
        ordering: false,
        dom: '<"top">rt<"bottom">',
        scrollY: 100,
        paginate: false
    });

    tablaInventario = $('#datatableInventario').DataTable({
        "processing": true,
        "serverSide": true,
        lengthMenu: [
            [200, 400, 600],
            [200, 400, 600]
        ],
        "ajax": {
            url: "Ajax/Aj_ManteBodega.php",
            data: {
                Requerimiento: "LlenarTablaInvtarioFact"
            },
            type: "POST"
        },
        scrollY: 400,
        keys: true,
        "columnDefs": [{
                "targets": [1, 2, 4, 5, 16],
                "orderable": false,
            },
            {
                "targets": [0, 3, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
                "visible": false,
                "searchable": false
            }
        ]
    });
    tablaInventario.on('key', function(e, datatable, key, cell, originalEvent) {
        if (key == 13) {
            try { tablaInventario.cell.blur(); } catch (error) {}
            $('#datatableInventario tbody tr').eq(datatable.row(cell.index().row).index()).find('td').eq(0).dblclick();
        }
    });
    $('#datatableInventario_filter input').unbind();
    $('#datatableInventario_filter input').remove();
    $('#datatableInventario_filter label').remove();
    $('input#nombreComercialF').bind('keyup', function(e) {
        if (e.keyCode == 13) {
            tablaInventario.column(4).search($('input#principioF').val()).draw();
            tablaInventario.column(2).search($('input#presentacionF').val()).draw();
            tablaInventario.column(1).search($('input#nombreComercialF').val()).draw();
        }
        if (e.keyCode == 40) {
            $(this).blur();
            $('#datatableInventario tbody tr td').eq(0).click();
        }
    });
    $('input#presentacionF').bind('keyup', function(e) {
        if (e.keyCode == 13) {
            tablaInventario.column(4).search($('input#principioF').val()).draw();
            tablaInventario.column(2).search($('input#presentacionF').val()).draw();
            tablaInventario.column(1).search($('input#nombreComercialF').val()).draw();
        }
        if (e.keyCode == 40) {
            $(this).blur();
            $('#datatableInventario tbody tr td').eq(0).click();
        }
    });
    $('input#principioF').bind('keyup', function(e) {
        if (e.keyCode == 13) {
            tablaInventario.column(4).search($('input#principioF').val()).draw();
            tablaInventario.column(2).search($('input#presentacionF').val()).draw();
            tablaInventario.column(1).search($('input#nombreComercialF').val()).draw();
        }
        if (e.keyCode == 40) {
            $(this).blur();
            $('#datatableInventario tbody tr td').eq(0).click();
        }
    });

}
CargarTablasFarmacia();

$(".body").on('keyup', "input#CodigoDeBarra", function(evt) {
    var codBarra = $(this).val();
    if (evt.keyCode == 13) {
        BuscarPorCodigoDeBarra(codBarra);
    }
});

function BuscarPorCodigoDeBarra(codBarra) {
    $.ajax({
        async: false,
        method: "POST",
        url: "Ajax/Aj_ManteBodega.php",
        data: {
            Requerimiento: "BuscarPorCodigo",
            CodBarra: codBarra
        },
        dataType: 'JSON',
    }).done(function(respuesta) {
        if (respuesta[0] == false) {
            swal("Esculapio!", "OCURRIO UN ERROR.", "error");
            return;
        }
        try {
            var cantidad1 = respuesta[0][16];
            var ff = respuesta[0][29];
            var ee = respuesta[0][17];
            if (cantidad1 == 0 || ff == 0) {
                var fracciones = parseInt(ff);
            } else if (ff != ee) {
                var fracciones = parseInt(cantidad1) * parseInt(ee) + parseInt(ff);
            } else {
                var fracciones = parseInt(cantidad1) * parseInt(ee);
            }
            $('.body').find('label#IdDetalle').text(respuesta[0][0]);
            $('.body').find('label#NombreComercialDetalle').text(respuesta[0][1]);
            $('.body').find('span#PresentacionDespacho1').text(respuesta[0][2]);
            $('.body').find('span#PresentacionDespacho2').text(respuesta[0][23]);
            $('.body').find('input#PresentacionDespacho3').val(respuesta[0][2]);
            $('.body').find('input#PresentacionDespacho4').val(respuesta[0][23]);
            $('.body').find('label#Costo1Detalle').text(respuesta[0][18]);
            $('.body').find('label#IvaDetalle').text(respuesta[0][24]);
            $('.body').find('label#Pvp1Detalle').text(respuesta[0][19]);
            $('.body').find('label#Pvp2Detalle').text(respuesta[0][20]);
            $('.body').find('label#Stock1Detalle').text(fracciones);
            $('.body').find('label#Stock2Detalle').text(cantidad1);
            $('.body').find('h4#NombreComercialPresentacion').text(respuesta[0][1]);
            $('.body').find('label#ValorCajaDetalle').text(respuesta[0][25]);
            $('.body').find('label#Cantidad1').text(respuesta[0][16]);
            $('.body').find('label#Fracciones').text(respuesta[0][29]);
            if (respuesta[0][27] == 1) {
                $('.body').find('div#DespachoNivel1').fadeIn(1);
            } else {
                $('.body').find('div#DespachoNivel1').fadeOut(1);
            }

            if (respuesta[0][28] == 1) {
                $('.body').find('div#DespachoNivel2').fadeIn(1);
            } else {
                $('.body').find('div#DespachoNivel2').fadeOut(1);
            }
            $('#modal-despacho').modal();
            $('.body').find('input#CodigoDeBarra').val('');
        } catch (error) {
            swal("Esculapio!", "No existe producto con ese Codigo de Barra", "error").then((confirma) => {
                if (confirma) {
                    $('.body').find('input#CodigoDeBarra').val('');
                    $('.body').find('input#CodigoDeBarra').focus();
                    return;
                }
            });
        }

    }).fail(function(jqXHR, textStatus, errorThrown) {
        console.log(errorThrown)
    });
}

$('#modal-consultas').on('shown.bs.modal', function() {
    $('.body').find('input#nombreComercialF').val('');
    $('.body').find('input#presentacionF').val('');
    $('.body').find('input#principioF').val('');
    tablaInventario.column(1).search('').draw();
    $('input#nombreComercialF').focus();
});
var fila = null;
$('.body table#datatableInventario tbody').on('dblclick', 'tr', function(evt) {
    fila = tablaInventario.row($(this)).data();
    try { tablaInventario.cell.blur(); } catch (error) {}
    var nombreComercial = fila[1];
    var pvp1 = fila[4];
    var pvp2 = fila[5];
    var cantidad1 = fila[10];
    var prst1 = fila[14];
    var prst2 = fila[15];
    var fracciones = fila[16];

    $('.body').find('input#ElegirCantidad').val('');
    $('.body').find('h4#NombreComercialPresentacion').text(nombreComercial);
    $('.body').find('label#NombreComercialDetalle').text(nombreComercial);
    if (prst2 == "(NINGUNO)" || prst2 == null) {
        $('.body').find('input#PresentacionDespacho4').prop('checked', true);
    }
    if (prst1 == "NINGUNA") {
        $('.body').find('input#PresentacionDespacho3').prop('checked', true);
    }
    $('.body').find('span#PresentacionDespacho1').text(prst2);
    $('.body').find('span#PresentacionDespacho2').text(prst1);
    $('.body').find('label#Pvp1Detalle').text(pvp1);
    $('.body').find('label#Pvp2Detalle').text(pvp2);
    $('.body').find('label#Stock1Detalle').text(fracciones);
    $('.body').find('label#Stock2Detalle').text(cantidad1);

    if (prst2 != "(NINGUNO)") {
        $('.body').find('div#DespachoNivel1').fadeIn(1);
    } else {
        $('.body').find('div#DespachoNivel1').fadeOut(1);
    }

    if (prst1 != "NINGUNA") {
        $('.body').find('div#DespachoNivel2').fadeIn(1);
    } else {
        $('.body').find('div#DespachoNivel2').fadeOut(1);
    }
    $('#modal-despacho').modal();

});

$('#modal-despacho').on('shown.bs.modal', function() {
    try { tablaDetalle.cell.blur(); } catch (error) {}
    try { $('input#CodigoDeBarra').blur(); } catch (error) {}
    $('input#ElegirCantidad').focus();
});

$(".body").on('keyup', "input#ElegirCantidad", function(ev) {
    if (ev.keyCode == 13) {
        if ($(this).val() < 1) {
            swal("Esculapio!", "Ingrese La Cantidad", "warning");
            return;
        } else {
            $('button#AgregarProductos').click();
        }
    }
});

$(".body").on('click', "button#AgregarProductos", function(evt) {
    AgregarItensLaboratorio();
});

function AgregarItensLaboratorio() {
    var iva = fila[6];
    var id = fila[0];
    var item = fila[1].trim();
    var precio = '0.00';
    var cantidad = parseFloat($('.body').find('input#ElegirCantidad').val());
    var nivel = '';
    var valorCaja = 0;
    var descuento = "";
    var descuentopredefinido = fila[17];

    if ($("#cbmTipoPago").val() == "2") {
        descuentopredefinido = fila[18];
    }
    if ($("#habilitarDescuentoPredefinido").val() == "SI") {
        descuento = '<input style="width:80px;" type="number" disabled step=".01" valorDescuento="0" value="' + descuentopredefinido + '" class="form-control" id="DescuentoDetalle">';
        $("#cbmTipoPago").attr("disabled", true);
    } else {
        descuento = '<input style="width:80px;" type="number"  step=".01" valorDescuento="0" value="0.00" class="form-control" id="DescuentoDetalle">';
    }

    var boton = '<button type="submit" id="EliminarItemConsulta" class="btn btn-danger"><i class="fa fa-trash-o" aria-hidden="true"></i></button>';
    var presentacion = "";
    var costo = fila[3];
    if ($('.body').find('input#PresentacionDespacho3').is(':checked')) {
        if (cantidad > fila[10]) {
            swal("Esculapio!", "La cantidad ingresada es mayor al stock disponible de " + fila[10], "error");
            return;
        }
        presentacion = fila[15];
        precio = fila[5];
        nivel = "Uno";
        valorCaja = fila[7];
        costo = fila[3] * fila[12];
    } else {
        if (cantidad > fila[16]) {
            swal("Esculapio!", "La cantidad ingresada es mayor al stock disponible de " + fila[16], "error");
            return;
        }
        presentacion = fila[14];
        precio = fila[4];
        nivel = "Dos";
        valorCaja = fila[13];
        costo = fila[3];
    }

    var subtotal = cantidad * precio;
    var valorDescuento = parseFloat(subtotal) * (descuentopredefinido / 100);

    var total = subtotal;
    if (iva == "S") {
        total = subtotal - valorDescuento * 1.12;
    }
    cantidad = '<input nivel="' + nivel + '" style="width:80px;" type="number" costo="' + costo + '" value="' + cantidad + '" class="form-control" id="CantidadDetalleFact">';
    if (!ExisteIten(id, item, presentacion)) {
        var campos = [id, item, presentacion, cantidad, parseFloat(precio).toFixed(2), parseFloat(subtotal).toFixed(2), iva, descuento, "$ " + parseFloat(total).toFixed(2), boton, valorCaja];
        tablaDetalle.row.add(campos).draw(true);
        $(".body").find("div#modal-despacho button.close").click();
        $(".body").find("div#modal-consultas button.close").click();
    } else {
        tablaDetalle.row(filaAnterior).remove().draw(false);
        var campos = [id, item, presentacion, cantidad, parseFloat(precio).toFixed(2), parseFloat(subtotal).toFixed(2), iva, descuento, "$ " + parseFloat(total).toFixed(2), boton, valorCaja];
        tablaDetalle.row.add(campos).draw(true);
        $(".body").find("div#modal-despacho button.close").click();
        $(".body").find("div#modal-consultas button.close").click();
    }

    CalcularTotalConsulta();
}

var cantidadAnterior = 0;
var filaAnterior = '';

function ExisteIten(idIten, item, itemp) {
    var confirma = false;
    var vector = $('.body').find("#datatableDetalleFactFarmacia tbody tr");
    $.each(vector, function(a) {
        var idf = $(this).find('td').eq(0).html();
        var itemf = $(this).find('td').eq(1).html();
        var itemP = $(this).find('td').eq(2).html();
        if (idf == idIten && itemf == item && itemP == itemp) {
            cantidadAnterior = $(this).find('td').eq(3).find('input').val();
            filaAnterior = $(this);
            confirma = true;
        }
    });
    return confirma;
}

$(".body table#datatableDetalleFactFarmacia").on('change', "input#DescuentoDetalle", function(evt) {
    var descuento = $(this).val();
    var subtotal = $(this).parents("tr").find('td').eq(5).html();
    var valorDescuento = parseFloat(subtotal) * (descuento / 100);
    $(this).attr('valorDescuento', valorDescuento);
    subtotal = subtotal - valorDescuento;
    var total = subtotal;
    if ($(this).parent().parent().find('td').eq(6).html() == "S") {
        total = parseFloat(subtotal) * 1.12;
    }
    $(this).parent().parent().find('td').eq(8).html("$ " + total.toFixed(2));
    CalcularTotalConsulta();
});

$(".body table#datatableDetalleFactFarmacia").on('change', "input#CantidadDetalleFact", function(evt) {
    var cantidad = $(this).val();
    var precio = $(this).parent().parent().find('td').eq(4).html();
    var subtotal = parseFloat(precio) * cantidad;

    $(this).parents("tr").find('td').eq(5).html(parseFloat(subtotal).toFixed(2));

    var descuento = $(this).parents("tr").find('input#DescuentoDetalle').val();
    var valorDescuento = parseFloat(subtotal) * (descuento / 100);
    $(this).parents("tr").find('td').eq(7).find('input').attr('valorDescuento', valorDescuento);
    subtotal = subtotal - valorDescuento;
    var total = subtotal;
    if ($(this).parents("tr").find('td').eq(6).html() == "S") {
        total = subtotal * 1.12;
    }
    $(this).parents("tr").find('td').eq(8).html("$ " + total.toFixed(2));
    CalcularTotalConsulta();

    var id = $(this).parent().parent().find('td').eq(0).html();
    var nivel = $(this).attr('nivel');
    var stock = CargarStock(id, nivel);
    if (cantidad > stock) {
        swal("Esculapio!", "La cantidad ingresada es mayor al stock disponible de " + stock, "error").then((confirma) => {
            $(this).val('');
            $(this).focus();
        });
    }
});

function CargarStock(id, nivel) {
    var stock = 0;
    $.ajax({
        async: false,
        method: "POST",
        url: "Ajax/Aj_ManteBodega.php",
        data: {
            Requerimiento: "BuscarPorIdStock",
            Id: id
        },
        dataType: 'JSON',
    }).done(function(respuesta) {
        if (respuesta[0] == false) {
            swal("Esculapio!", "OCURRIO UN ERROR.", "error");
            return;
        }
        if (nivel == 'Uno') {
            stock = parseInt(respuesta[0][0]);
        } else {
            stock = parseInt(respuesta[0][0]) * parseInt(respuesta[0][1]) + parseInt(respuesta[0][2]);
        }
    }).fail(function(jqXHR, textStatus, errorThrown) {
        console.log(errorThrown)
    });
    return stock;
}

$(".body table#datatableDetalleFactFarmacia").on('click', "button#EliminarItemConsulta", function(evt) {
    var item = $(this).parent().parent().find('td').eq(1).html();
    var fila = $(this).parent().parent();
    swal({
        title: "Esculapio",
        text: "Seguro Que Desea Quitar El Item " + item + " ?",
        icon: "info",
        buttons: true,
        dangerMode: true,
    }).then((confirma) => {
        if (confirma) {
            tablaDetalle.row(fila).remove().draw(false);
            CalcularTotalConsulta();
        } else {

        }
    });

});
var tarifa0 = 0;
var tarifa12 = 0;

function CalcularTotalConsulta() {

    var vector = $('.body').find("#datatableDetalleFactFarmacia tbody tr");
    var totalcancelar = 0;
    var subtotal = 0;
    var descuento = 0;
    var totalIva = 0;
    tarifa0 = 0;
    tarifa12 = 0;
    var fila = $('.body').find("#datatableDetalleFactFarmacia tbody tr").find("td").eq(0).html();
    ivaMovimiento = 0;
    descuentoMovimiento = 0;
    totalMovimiento = 0;

    if (fila != "No existen datos") {
        $.each(vector, function(a) {

            try {
                var descuentoitem = $(this).find('td').eq(7).find('input').val();
                var st = $(this).find('td').eq(5).html();
                var valorDescuento = parseFloat(st) * (descuentoitem / 100);
                $(this).find('td').eq(7).find('input').attr('valorDescuento', valorDescuento);
                st = st - valorDescuento;
                var total = st;
                if ($(this).find('td').eq(6).html() == "S") {
                    total = parseFloat(st) * 1.12;
                    tarifa12 += st;
                } else {
                    tarifa0 += st;
                }
                $(this).find('td').eq(8).html("$ " + total.toFixed(2));

                totalcancelar += parseFloat($(this).find('td').eq(8).html().replace('$', ''));
                subtotal += parseFloat($(this).find('td').eq(5).html());
                var costoFila = $(this).find('td').eq(3).find('input').attr("costo") * $(this).find('td').eq(3).find('input').val();

                if ($(this).find('td').eq(6).html() == "S") {
                    totalIva += st * 0.12;
                    ivaMovimiento += (costoFila - (costoFila * (descuentoitem / 100))) * 0.12;
                    costoFila = costoFila * 1.12;
                }
                descuento += parseFloat($(this).find('td').eq(7).find('input').attr('valorDescuento'));
                if (descuentoitem > 0) {
                    descuentoMovimiento += costoFila * (descuentoitem / 100);
                }
                totalMovimiento += costoFila - descuentoMovimiento;

                if ($(this).find('td').eq(9).find('button').attr('atendido') == 25) {
                    $(this).css('background-color', '#F5ECCE');
                }
            } catch (err) {}
        });

    }
    if (totalcancelar > 0) {
        cobrar = true;
    } else {
        cobrar = false;
    }


    $('span#totalCancelarIva').html('IVA : $ ' + totalIva.toFixed(2));
    $('span#totalCancelarSubtotal').html('SUBTOTAL : $ ' + subtotal.toFixed(2));

    $('span#totalDescuentoConsulta').html('TOTAL DESCUENTO : $ ' + descuento.toFixed(2));
    $('span#totalCancelarConsulta').html('TOTAL A CANCELAR : $ ' + totalcancelar.toFixed(2));
    $('span#totalItemsConsulta').html('TOTAL DE ITEMS : ' + vector.length);
    $('span#totalPagarCobrar').html('$ ' + totalcancelar.toFixed(2));
    $('strong#totalFacturaEstimado').html('$ 0.0');

    if (totalcancelar > 0) {
        $('button#CobrarConsultaCobrar').prop('disabled', false);
        $('button#CobrarConsulta').prop('disabled', false);
        $('button#ReimprimirFarmacia').prop('disabled', false);
    } else {
        $('button#CobrarConsultaCobrar').prop('disabled', true);
        $('button#CobrarConsulta').prop('disabled', true);
        $('button#ReimprimirFarmacia').prop('disabled', true);
    }
}

$(".body").on('click', "button#CobrarConsulta", function(evt) {
    var paciente = $('strong#nombreCompleto').attr('idPaciente');
    if (parseFloat($('#totalCancelarConsulta').html().replace('TOTAL A CANCELAR : $ ', '')) > 199) {
        if ($('strong#nombreCompletoCliente').attr('idCliente') == '1') {
            swal("Esculapio!", "Factura mayor a partir de $200. No puede ser CONSUMIDOR FINAL \n Ingresar datos del cliente. ", "error");
            return;
        }

    }
    if (paciente == '' || paciente == null || paciente == 0) {
        swal("Esculapio!", "Seleecione un Paciente. ", "error");
        return;
    }

    var cedula = $('.body').find('span#cedulaCliente').text();
    if ($('strong#nombreCompletoCliente').attr('idCliente') == '1' && $('strong#nombreCompletoCliente').html() == "CONSUMIDOR FINAL") {
        $('span#totalCredito').parent().fadeOut(0);
    } else {
        if (!caracteresCorreoValido($("#emailCliente").html())) {
            swal("Esculapio!", "Ingrese El Correo Del Cliente. ", "warning");
            return;
        }
        $('span#totalCredito').parent().fadeIn(0);
    }

    validacion(cedula, true);
});

$('#modal-cobrar').on('shown.bs.modal', function() {
    $('input#ValorRecibidoConsulta').focus();
    $('input#Pagos').val("1");
    $('select#cbmPeriodoOdont').val("3");
    $('.selectpicker').selectpicker('refresh');
});

$(".body").on('click', "button#CobrarConsultaCobrar", function(evt) {
    if (!cobrar) {
        swal("Esculapio!", "Ingrese Al menos un item para facturar..!!", "error");
        return;
    }
    if (!confirmaPago) {
        swal("Esculapio!", "Ingrese El Pago Por Favor..!!", "error");
        return;
    }
    var banco = $("select#banco").val();
    var numero = $("#NumeroCheque").val().trim();
    var cuenta = $("#CuentaCheque").val().trim();
    if (valorRecibidoCheque > 0) {
        if (banco == 0 || banco === undefined) {
            swal("Esculapio!", "Seleecione La Entidad Bancaria a la que pertenece el cheque. ", "warning");
            return;
        }

        if (numero == "" || numero === undefined) {
            swal("Esculapio!", "Falta el numero de cheque. ", "warning");
            return;
        }

        if (cuenta == "" || cuenta === undefined) {
            swal("Esculapio!", "Falta el numero de cuenta ", "warning");
            return;
        }
    }

    var cedula = $('.body').find('span#cedulaCliente').text();
    var correcta = cedula;

    var entidad = $("#EntidadTarjeta").val().trim();
    var numerotarjeta = $("#NumeroTarjeta").val().trim();
    var recargo = $("#RecargoTarjeta").val().trim();

    if (valorRecibidoTarjeta > 0 && entidad != 52) {

        if (entidad == 0 || entidad === undefined) {
            swal("Esculapio!", "Falta la entidad de la tarjeta. ", "warning");
            return;
        }

        if (numerotarjeta == "" || numerotarjeta === undefined) {
            swal("Esculapio!", "Falta el numero de tarjeta ", "warning");
            return;
        }
        if (recargo == "" || recargo === undefined) {
            swal("Esculapio!", "Falta el recargo de la tarjeta ", "warning");
            return;
        }
    }

    var periodo = $("#cbmPeriodoOdont").val();
    var dividendo = $("#Pagos").val();
    var fila1 = $('.body').find("#datatablePagosFarmacia tbody tr").find('td').eq(0).html();
    if (valorCredito > 0) {

        if (periodo == 0 || periodo === undefined) {
            swal("Esculapio!", "Seleccione el periodo de pagos. ", "warning");
            return;
        }

        if (dividendo == "" || dividendo === undefined) {
            swal("Esculapio!", "Ingrese los dividendos ", "warning");
            return;
        }
        if (fila1 == "No existen datos") {
            swal("Esculapio!", "Presione enter luego de poner los dividendos para generar la tabla de pagos ", "warning");
            return;
        }
    }

    var bancoTrans = $("select#bancoTrans").val();
    var AgenciaTrans = $("input#AgenciaTrans").val();

    if (valorTransferencia > 0) {
        if (bancoTrans == 0 || bancoTrans === undefined) {
            swal("Esculapio!", "Seleecione La Entidad Bancaria en el que se hizo la transfenrencia. ", "warning");
            return;
        }

        if (AgenciaTrans == "" || AgenciaTrans === undefined) {
            swal("Esculapio!", "Ingrese la Agencia. ", "warning");
            return;
        }


    }

    swal({
        title: "Esculapio",
        text: "Seguro Que Desea Efectuar esta Factura ?",
        icon: "info",
        buttons: true,
        dangerMode: false,
    }).then((confirma) => {
        if (confirma) {
            var valores = ConsultarClientePorCedula(correcta);
            if (valores[0] == false) {
                var ruc = $('.body').find('span#cedulaCliente').text();
                var nombre = $('.body').find('strong#nombreCompletoCliente').text();
                var apellido = '';
                var prueba = nombre.split(" ");
                if (prueba.length == 4) {
                    nombre = prueba[2] + " " + prueba[3];
                    apellido = prueba[0] + " " + prueba[1];
                }
                if (prueba.length == 3) {
                    nombre = prueba[2];
                    apellido = prueba[0] + " " + prueba[1];
                }
                if (prueba.length == 2) {
                    nombre = prueba[1];
                    apellido = prueba[0];
                }
                if (prueba.length > 4) {
                    nombre = prueba[2] + " " + prueba[3];
                    apellido = prueba[0] + " " + prueba[1];
                }

                var direccion = $('.body').find('span#direccionCliente').text();
                var correo = $('.body').find('span#emailCliente').text();
                var telefono = $('.body').find('span#telefonoCliente').text();
                var id = $('.body').find('strong#nombreCompletoCliente').attr('idCliente');
                if (id < 0) {
                    GuardarClientePaciente(ruc, nombre, apellido, direccion, telefono, correo, 'sdfaasd');
                }
            }
            if (facturando == false) {
                GuardarFacturaInventario();
            }

        } else {}
    });
});

function ObtenerDetalle() {
    var productos = [];

    var vector = $('.body').find("#datatableDetalleFactFarmacia tbody tr");
    var valorCaja = 0;

    $.each(vector, function(a) {

        var id = $(this).find('td').eq(0).html();
        var item = $(this).find('td').eq(1).html().trim();
        var presentacion = $(this).find('td').eq(2).html().trim();
        var precio = $(this).find('td').eq(4).html();
        var cantidad = $(this).find('td').eq(3).find('input').val();
        var nivel = $(this).find('td').eq(3).find('input').attr('nivel');
        var descuento = $(this).find('td').eq(7).find('input').val();
        var subtotal = $(this).find('td').eq(5).html();
        var total = $(this).find('td').eq(8).html().replace("$", "");
        var iva = $(this).find('td').eq(6).html();
        valorCaja += parseFloat(tablaDetalle.row($(this)).data()[10]).toFixed(2);

        if (descuento == "") {
            descuento = 0;
        }
        console.log(item)
        var lineaDetalle = [item, presentacion, cantidad, precio, descuento, subtotal, id, iva, nivel];
        productos[a] = lineaDetalle;

    });

    return JSON.stringify(productos);
}

function ObtenerDetalleSimple() {
    var productos = [];

    var vector = $('.body').find("#datatableDetalleFactFarmacia tbody tr");
    var valorCaja = 0;

    $.each(vector, function(a) {

        var id = $(this).find('td').eq(0).html();
        var item = $(this).find('td').eq(1).html().trim();
        var presentacion = $(this).find('td').eq(2).html();
        var precio = $(this).find('td').eq(4).html();
        var cantidad = $(this).find('td').eq(3).find('input').val();
        var nivel = $(this).find('td').eq(3).find('input').attr('nivel');
        var descuento = $(this).find('td').eq(7).find('input').val();
        var subtotal = $(this).find('td').eq(5).html();
        var total = $(this).find('td').eq(8).html().replace("$", "");
        var iva = $(this).find('td').eq(6).html();
        valorCaja += parseFloat(tablaDetalle.row($(this)).data()[10]).toFixed(2);

        if (descuento == "") {
            descuento = 0;
        }

        var lineaDetalle = [item, presentacion, cantidad, precio, descuento, subtotal, id, iva, nivel];
        productos[a] = lineaDetalle;

    });

    return productos;
}

function CargarFormaPagoGuardada(id) {
    var formapago = "";
    $.ajax({
        async: false,
        method: "POST",
        url: "Ajax/Aj_Forma_pago.php",
        data: {
            Requerimiento: "CargarFormasPagosFarmacia",
            Id: id
        },
        dataType: 'JSON',
    }).done(function(respuesta) {
        $.each(respuesta, function(i, value) {
            formapago += value[0] + "-";
        });
    });
    return formapago;
}

function ObtenerFormaPago() {
    var formapago = "";
    var pago = valorRecibido - parseFloat($("span#CambioConsulta").html().replace("$", ""));
    if (pago > 0) {
        formapago += "Efectivo-";
    }
    if (valorRecibidoCheque > 0) {
        formapago += "Cheque-";
    }
    if (valorTransferencia > 0) {
        formapago += "Transferencia-";
    }
    if (valorRecibidoTarjeta > 0) {
        formapago += "Tarjeta-";
    }
    if (valorCredito > 0) {
        formapago += "Credito-";
    }
    if (valorRecibidoAnticipo > 0) {
        formapago += "Anticipo";
    }
    if (formapago == "") {
        formapago = CargarFormaPagoGuardada(idFacturaCargada);
    }
    return formapago;
}

function GuardarFacturaInventario() {
    facturando = true;
    var puntoVenta = $('input#puntoVenta').val();
    var secuencia = parseInt($('input#secuenciaPunto').val()) + 1;
    var paciente = $('strong#nombreCompleto').attr('idPaciente');
    var numero = $('strong#SecuenciaFacturaConsulta').attr('secuencia');
    var total = $('span#totalCancelarConsulta').html().replace('TOTAL A CANCELAR : $', '');
    var iva = $('span#totalCancelarIva').html().replace('IVA : $', '');
    var descuento = $('span#totalDescuentoConsulta').html().replace('TOTAL DESCUENTO : $', '');
    if (paciente == '' || paciente == null) {
        swal("Esculapio!", "Seleecione un Paciente. ", "error");
        return;
    }
    var cliente = 1;
    if (idClienteNuevo == undefined || idClienteNuevo == '') {
        cliente = $('.body').find('strong#nombreCompletoCliente').attr('idCliente');
    } else {
        cliente = idClienteNuevo;
    }
    $.ajax({
        method: "POST",
        url: "Ajax/Aj_ManteBodega.php",
        data: {
            Requerimiento: "GuardarInventarioFactura",
            Punto: puntoVenta,
            Paciente: paciente,
            Cliente: cliente,
            Numero: numero,
            Total: total,
            Iva: iva,
            Descuento: descuento,
            Detalle: ObtenerDetalle(),

            Tarjeta: valorRecibidoTarjeta,
            Cheque: valorRecibidoCheque,
            Efectivo: (valorRecibido - parseFloat($("span#CambioConsulta").html().replace("$", ""))),
            Credito: valorCredito,
            CedulaCliente: $("#cedulaCliente").html(),
            NombreCliente: $("#nombreCompletoCliente").html(),
            EmailCliente: $("#emailCliente").html(),
            TelefonoCliente: $("#telefonoCliente").html(),
            TipoIde: $("#cbmTipoIde").val(),
            FormaPago: ObtenerFormaPago(),

            Banco: $("select#banco").val(),
            Numero: $("#NumeroCheque").val(),
            Cuenta: $("#CuentaCheque").val(),
            Fecha: $("#FechaCheque").val(),
            Referencia: $("#ReferenciaCheque").val(),

            Periodo: $("#cbmPeriodoOdont option:selected").text().trim(),
            FechaI: $("#FechaInicio").val(),
            FechaP: $("#datatablePagos tbody tr").find('td').eq(2).find('input').val(),

            EntidadTarjeta: $("#EntidadTarjeta").val(),
            NEntidadTarjeta: $("#EntidadTarjeta option:selected").html(),
            FechaTarjeta: $("#FechaTarjeta").val(),
            NumeroTarjeta: $("#NumeroTarjeta").val(),
            NumeroVoucher: $("#NumeroVoucher").val(),
            Recargo: $("#RecargoTarjeta").val()
        },
        dataType: 'JSON',
    }).done(function(respuesta) {
        if (respuesta[0] == 'recarga') {
            swal("Esculapio!", "Su sesion ha expirado por favor recarga la pantalla", "warning");
            return;
        }
        if (respuesta[0] == true) {
            console.log(respuesta)
            var objeto = ["ActualizarSecuencialRealTime", puntoVenta];
            clavesri = respuesta[3];
            var linkpago = respuesta[4];
            var edad = calcularEdad($('strong#nombreCompleto').attr("fecha"));
            CrearXML(respuesta[1], ObtenerDetalle(), respuesta[2]);
            GuardarPagosFarmacia(respuesta[2], valorRecibido, valorRecibidoCheque, valorRecibidoTarjeta, valorCredito, valorRecibidoAnticipo, valorTransferencia);
            GuardarMovimiento(respuesta[1]);
            $('button.close').click();
            swal({
                title: "Esculapio",
                text: "Factura Guardada..!, Desea Imprimir?",
                icon: "info",
                buttons: true,
                dangerMode: false,
            }).then((confirma) => {
                if (confirma) {
                    printTextAreaMovimiento(numero, ObtenerDetalleSimple());
                    //ImprimirTicKetInventario(respuesta[1],ObtenerDetalle(),0,respuesta[2]);
                    LimpiarFarmacia();
                } else {
                    LimpiarFarmacia();
                }
                if (linkpago != "") {
                    swal("Esculapio!", "Link de pago : " + $("#linkPago").val() + linkpago[1], "info");
                }
            });
            cobrar = false;
        }
        if (respuesta[0] == false) {
            swal("Esculapio!", "Error Al Guardar La Factura. \n" + respuesta[1], "error");
            console.log(respuesta)
            return;
        }
    }).fail(function(jqXHR, textStatus, errorThrown) {
        console.log(errorThrown)
    });
}

function ObtenerDetalleMovimiento() {
    var productos = [];

    var vector = $('.body').find("#datatableDetalleFactFarmacia tbody tr");

    $.each(vector, function(a) {

        var id = $(this).find('td').eq(0).html();
        var item = $(this).find('td').eq(1).html();
        var presentacion = $(this).find('td').eq(2).html();
        var cantidad = $(this).find('td').eq(3).find('input').val();
        var iva = $(this).find('td').eq(6).html();
        var precio = $(this).find("td").eq(3).find("input").attr("costo");
        var subtotal = precio * cantidad;
        var descuento = $(this).find("td").eq(7).find("input").val();
        if (descuento == "") {
            descuento = 0;
        }
        var total = subtotal - (subtotal * (descuento / 100));
        if (iva == "S") {
            total = total * 1.12;
        }
        var lineaDetalle = [id, presentacion, cantidad, precio, descuento, subtotal, total, item];
        productos[a] = lineaDetalle;

    });

    return JSON.stringify(productos);
}

function GuardarMovimiento(numero) {
    $.ajax({
        async: false,
        method: "POST",
        url: "Ajax/Aj_ManteBodega.php",
        data: {
            Requerimiento: "GuardarMovimiento",
            Iva: ivaMovimiento,
            Descuento: descuentoMovimiento,
            Total: totalMovimiento,
            Numero: numero,
            Tipo: "EGRESO",
            Detalle: ObtenerDetalleMovimiento()

        },
        dataType: 'JSON',
    }).done(function(respuesta) {
        if (respuesta[0] == false) {
            swal("Esculapio!", "Ocurrio un Error al guardar el movimiento de BODEGA", "error");
            console.log(errorThrown);
            return;
        }
    }).fail(function(jqXHR, textStatus, errorThrown) {
        console.log(errorThrown)
    });
}



function CrearXML(numero, productos, idConsulta) {
    $.ajax({
        method: "POST",
        url: "Ajax/Aj_Xml.php",
        data: {
            Requerimiento: "CrearXMLFarmacia",
            Consulta: idConsulta,
            Numero: numero,
            Cliente: $('strong#nombreCompletoCliente').html(),
            Cedula: $('span#cedulaCliente').html(),
            DireccionC: $('span#direccionCliente').html(),
            TelefonoC: $('span#telefonoCliente').html(),
            Correo: $('span#emailCliente').html(),
            DesctoTotal: $('span#totalDescuentoConsulta').html().replace("TOTAL DESCUENTO : $ ", ""),
            Item: $('span#totalItemsConsulta').html().replace("TOTAL DE ITEMS : ", ""),
            Subtotal: $('span#totalCancelarSubtotal').html().replace("SUBTOTAL : $ ", ""),
            Productos: productos,
            Paciente: $('strong#nombreCompleto').html(),
            Recibido: $('input#ValorRecibidoConsulta').val(),
            Cambio: $('span#CambioConsulta').html().replace("$ ", ""),
            TipoIde: $("#cbmTipoIde").val(),
        },
        dataType: 'JSON',
    }).done(function(respuesta) {
        if (FcSri == "Online") {
            EnviarXmlSri(respuesta, idConsulta);
        }
    }).fail(function(jqXHR, textStatus, errorThrown) {
        console.log(errorThrown);
    });
}

function EnviarXmlSri(xml1, idConsulta) {

    $.ajax({
        method: "POST",
        url: "Ajax/Aj_Sri.php",
        data: {
            Binario: xml1.binario,
            Consulta: idConsulta,
            Requerimiento: "ValidarComprobante"
        },
        dataType: "JSON",

    }).done(function(respuesta) {
        console.log(respuesta);
        if (respuesta[0].RespuestaRecepcionComprobante.estado == 'RECIBIDA') {
            $.ajax({
                method: "POST",
                url: "Ajax/Aj_Sri.php",
                data: {
                    Clave: xml1.clave,
                    Consulta: idConsulta,
                    Requerimiento: "autorizacionComprobanteFarmacia"
                },
                dataType: "JSON",

            }).done(function(respuesta1) {
                console.log(respuesta1)

            }).fail(function(jqXHR, textStatus, errorThrown) {
                console.log(errorThrown)
            });
        }


    }).fail(function(jqXHR, textStatus, errorThrown) {
        console.log(errorThrown)
    });
}

$(".body").on('click', "button#ReimprimirFarmacia", function(ev) {

    var vector = $('.body').find("#datatableDetalleFactFarmacia tbody tr");
    var numero = numeroFacturaCargada;
    /*var productos =[];
    var valorCaja = 0;
    $.each(vector, function(a) {
        var id = $(this).find('td').eq(0).html();
        var item = $(this).find('td').eq(1).html();
        var presentacion = $(this).find('td').eq(2).html();
        var precio = $(this).find('td').eq(4).html();
        var cantidad = $(this).find('td').eq(3).find('input').val();
        var nivel = $(this).find('td').eq(3).find('input').attr('nivel');
        var descuento = $(this).find('td').eq(7).find('input').val();
        var subtotal = $(this).find('td').eq(8).html().replace('$', '');
        valorCaja += parseFloat(tablaDetalle.row($('tr')).data()[10]).toFixed(2);
                
        var iva = $(this).find('td').eq(6).html();
        var lineaDetalle = [item,presentacion,cantidad,precio,descuento,subtotal,id,iva];
        productos[a]=lineaDetalle;
    });
    ImprimirTicKetInventario(numero,JSON.stringify(productos), valorCaja,idFacturaCargada);*/
    printTextAreaMovimiento(numero, ObtenerDetalleSimple());
    LimpiarFarmacia();
});

$(".body").on('click', "div#limpiarFactFarmacia", function(evt) {

    swal({
        title: "Esculapio",
        text: "Seguro que desa Limpiar..?",
        icon: "info",
        buttons: true,
        dangerMode: false,
    }).then((confirma) => {
        if (confirma) {
            LimpiarFarmacia();
        }
    });
});

function LimpiarFarmacia() {
    facturando = false;
    idClienteNuevo = '';
    $("#cbmTipoIde").val("1");
    CargarSecuenciaBodega();
    try {
        tablaDetalle.clear().draw();
    } catch (error) {}
    LimpiarCobrar();
    $("#cbmTipoPago").val("0");
    $("#cbmTipoPago").attr("disabled", false);
    $('.body').find('span#cedulaCliente').text("9999999999");
    $('.body').find('strong#nombreCompletoCliente').text("CONSUMIDOR FINAL");
    $('.body').find('strong#nombreCompletoCliente').attr('idCliente', '1');
    $('.body').find('span#direccionCliente').text("----------------");
    $('.body').find('span#telefonoCliente').text("----------------");
    $('.body').find('span#emailCliente').text("-----------------");
    $('.body').find('span#cedula').text("-------------");
    $('.body').find('strong#nombreCompleto').text("----------");
    $('.body').find('strong#nombreCompleto').attr('idCliente', '');
    $('.body').find('span#direccion').text("----------------");
    $('.body').find('span#telefono').text("----------------");
    $('.body').find('span#email').text("-----------------");
    $('.body').find('span#edad').text("-------------");
    $('.body').find('span#totalItemsConsulta').text("TOTAL DE ITEMS : 0");
    $('.body').find('span#totalCancelarConsulta').text("TOTAL A CANCELAR : $ 00.00");
    $('input#ValorRecibidoConsulta').val('');
    $('.body').find('span#totalPagarCobrar').text("$ 00.00");
    $('.body').find('span#CambioConsulta').text("$ 00.00");
    $('.body').find('strong#nombreCompleto').attr('idPaciente', '0');
    $('input#apellidoPFiltro').val('');
    $('input#apellidoMFiltro').val('');
    $('input#nombreFiltro').val('');
    $('input#cedulaFiltro').val('');
    $('input#CodigoDeBarra').val('');
    $('strong#SecuenciaFacturaConsulta').html('FACTURA #: ' + $('strong#SecuenciaFacturaConsulta').attr('secuencia'));
    $('.body').find('button#AnularFarmacia').prop('disabled', true);
    try {
        tabla.column(2).search('').draw();
        tabla.column(3).search('').draw();
        tabla.column(4).search('').draw();
        tabla.column(1).search('').draw();
    } catch (error) {}

    valorRecibido = 0;
    valorRecibidoCheque = 0;
    valorRecibidoTarjeta = 0;
    valorCredito = 0;
    valorRecibidoAnticipo = 0;
    valorTransferencia = 0;

    totalcobrado = 0;
    totalcobrado2 = 0;
    totalcobrado3 = 0;
    totalcobrado4 = 0;
    totalcobrado5 = 0;
    totalcobrado6 = 0;
    ConsultaCargada = 0;
    fechaFacturaCargada = "";
    medicoModificar = "";
    $('i.cheque').parent().fadeIn(200);
    $('i.tarjeta').parent().fadeIn(200);
    $('i.credito').parent().fadeIn(200);
    $('i.transfenrencia').parent().fadeIn(200);
    $('div.efectivo').fadeIn(200);
    $('button#CobrarConsulta').fadeIn(0);
    $('button#ReimprimirConsulta').fadeOut(0);
    $('button#ModificarFact').fadeOut(0);
    $('button#ReimprimirFarmacia').fadeOut(0);

    $('button#CobrarConsulta').attr("disabled", false);
    $('button#AnularConsulta').attr("disabled", true);

    $('button#CobrarConsultaCobrar').prop('disabled', true);
    $(".body div#DatosPaciente").css('visibility', 'hidden');
    $("a#SiCon").click();
    EnviarFacturasQuickCont();
}

function CargarSecuenciaBodega() {

    $.ajax({
        method: "POST",
        url: "Ajax/Aj_Movimiento.php",
        data: { Requerimiento: "CargarSecuencia" },
        dataType: 'JSON',

    }).done(function(respuesta) {

        $('#numeroMovimiento').html("EGRESO DE BODEGA # " + respuesta[0][0]);

    });
}
CargarSecuenciaBodega();
$('.body').on('click', '#AnularFarmacia', function(evt) {
    if (anular) {
        swal({
            title: "Esculapio",
            text: "Seguro que desa Anular La Factura..?",
            icon: "info",
            buttons: true,
            dangerMode: false,
        }).then((confirma) => {
            if (confirma) {
                ActualizarEstadoFarmacia(FacturaCargada, "id_estado", "21");
                AumentarParaKardex();
                swal("Esculapio!", "Factuta Anulada.", "success");
                LimpiarFarmacia();
            } else {

            }
        });
    }
});

function ActualizarEstadoFarmacia(idFarmacia, tipo, estado) {
    $.ajax({
        method: "POST",
        url: "Ajax/Aj_Farmacia.php",
        data: {
            Requerimiento: "ActualizarEstadoFarmacia",
            Farmacia: idFarmacia,
            Tipo: tipo,
            Estado: estado
        },
        dataType: 'JSON',
    });
}

function AumentarParaKardex() {
    var vector = $('.body').find("#datatableDetalleFactFarmacia tbody tr");
    var numero = numeroFacturaCargada;
    $.each(vector, function(a) {
        var id = $(this).find('td').eq(0).html();
        var precio = $(this).find('td').eq(4).html();
        var cantidad = $(this).find('td').eq(3).find('input').val();
        var nivel = $(this).find('td').eq(3).find('input').attr('nivel');
        AumentarKardex(id, cantidad, precio, numero, nivel);

    });
}

function AumentarKardex(idItem, cantidad, precio, numero, nivel) {
    AumentarStock(idItem, cantidad, precio, numero, nivel);
    $.ajax({
        //async:false,
        method: "POST",
        url: "Ajax/Aj_ManteBodega.php",
        data: {
            Requerimiento: "INGRESOkardexFactura",
            Inventario: idItem,
            Cantidad: cantidad,
            Precio: precio,
            Numero: numero,
            Nivel: nivel,
            Concepto: "ANULACION"
        },
        dataType: 'JSON',
    }).done(function(respuesta) {
        if (respuesta[0] == false) {
            console.log(respuesta);
        }
    }).fail(function(jqXHR, textStatus, errorThrown) {
        console.log(errorThrown)
    });
}

function AumentarStock(idItem, cantidad, precio, numero, nivel) {

    $.ajax({
        //async:false,
        method: "POST",
        url: "Ajax/Aj_ManteBodega.php",
        data: {
            Requerimiento: "AumentarStock",
            Inventario: idItem,
            Cantidad: cantidad,
            Precio: precio,
            Nivel: nivel

        },
        dataType: 'JSON',
    }).done(function(respuesta) {
        if (respuesta[0] == false) {
            console.log(respuesta);
        }
    }).fail(function(jqXHR, textStatus, errorThrown) {
        console.log(errorThrown)
    });
}
$(document).ready(function() {
    if (parametroURL('pagina') == 'farmacia') {
        $(document).keydown(function(tecla) {
            if (121 == tecla.keyCode) {
                tecla.preventDefault();
                $('button#CobrarConsulta').click();
            }
            if (112 == tecla.keyCode) {
                tecla.preventDefault();
                $('a#BuscarPaciente').click();
            }
            if (113 == tecla.keyCode) {
                tecla.preventDefault();
                $('button#consultasFactura').click();
            }
            //alert(tecla.keyCode);
        });
        if ($("#integradoQuickcont").val() == "SI") {
            SincronizarStock();
        }
    }
});


var tabla1 = null;

function LlenarTablaFacturasConFechasFarmacia() {
    tabla1 = $('#datatableConsultaFacturaFarmacia').DataTable({
        "processing": true,
        "serverSide": true,
        lengthMenu: [
            [200, 400, 600],
            [200, 400, 600]
        ],
        "ajax": {
            url: "Ajax/Aj_ManteBodega.php",
            data: {
                Requerimiento: "LlenarTablaFacturasConFechasFarmacia"
            },
            type: "POST"
        },
        scrollY: 300,
        scrollX: true,
        keys: true,
        "columnDefs": [{
            "targets": [0, 1, 2, 3, 4, 5],
            "orderable": false,
        }]
    });
    $('#datatableConsultaFacturaFarmacia_filter input').unbind();
    $('#datatableConsultaFacturaFarmacia_filter input').remove();
    $('#datatableConsultaFacturaFarmacia_filter label').remove();

    $('input#numeroF').bind('keyup', function(e) {
        if (e.keyCode == 13) {
            tabla1.column(0).search($('input#numeroF').val()).draw();
            tabla1.column(1).search($('input#pacienteF').val()).draw();
            tabla1.column(2).search($('input#clienteF').val()).draw();
        }
        if (e.keyCode == 40) {
            $(this).blur();
            $('#datatableConsultaFacturaFarmacia tbody tr td').eq(0).click();
        }
    });
    $('input#pacienteF').bind('keyup', function(e) {
        if (e.keyCode == 13) {
            tabla1.column(0).search($('input#numeroF').val()).draw();
            tabla1.column(1).search($('input#pacienteF').val()).draw();
            tabla1.column(2).search($('input#clienteF').val()).draw();
        }
        if (e.keyCode == 40) {
            $(this).blur();
            $('#datatableConsultaFacturaFarmacia tbody tr td').eq(0).click();
        }
    });
    $('input#clienteF').bind('keyup', function(e) {
        if (e.keyCode == 13) {
            tabla1.column(0).search($('input#numeroF').val()).draw();
            tabla1.column(1).search($('input#pacienteF').val()).draw();
            tabla1.column(2).search($('input#clienteF').val()).draw();
        }
        if (e.keyCode == 40) {
            $(this).blur();
            $('#datatableConsultaFacturaFarmacia tbody tr td').eq(0).click();
        }
    });
}

LlenarTablaFacturasConFechasFarmacia();


var numeroFacturaCargada = "";
var fechaFacturaCargada = "";
var idFacturaCargada = 0;

$('.body table#datatableConsultaFacturaFarmacia tbody').on('dblclick', 'tr', function(evt) {
    var fila = $('.body').find("#datatableDetalleFactFarmacia tbody tr").find("td").eq(0).html();
    var idPaciente = $('#nombreCompleto').attr('idPaciente');
    if (idPaciente != "0" || fila != "No existen datos") {
        swal({
            title: "Esculapio",
            text: "Seguro que desa Reemplazar lo que contiene la factura.?",
            icon: "info",
            buttons: true,
            dangerMode: false,
        }).then((confirma) => {
            if (confirma) {
                var cerrar = $('.body').find('button.close');
                var numero = $(this).find('td').eq(0).html();
                CargarFacturaConsultaFarmacia(numero);
                cerrar.click();
            } else {

            }
        });
    } else {
        var cerrar = $('.body').find('button.close');
        var numero = $(this).find('td').eq(0).html();
        CargarFacturaConsultaFarmacia(numero);
        cerrar.click();
    }

});

function CargarFacturaConsultaFarmacia(numero) {

    $.ajax({

        method: "POST",
        url: "Ajax/Aj_Farmacia.php",
        data: {
            Requerimiento: "CargarFacturaConsultaFarmacia",
            Numero: numero
        },
        dataType: 'JSON',
    }).done(function(respuesta) {


        if (respuesta[0] == false) {
            swal("Esculapio!", "OCURRIO UN ERROR.", "error");
            return;
        }
        var confirma = true;
        $.each(respuesta, function(i, value) {
            confirma = false;
            try { tablaDetalle.clear().draw(); } catch (error) {}
            ConsultarDetalleConsultaFarmacia(value[0]);
            idFacturaCargada = value[0];
            clavesri = value[19];
            $('.body').find('span#cedula').text(value[4]);
            $('.body').find('strong#nombreCompleto').text(value[3] + " " + value[2]);
            $('.body').find('strong#nombreCompleto').attr('fecha', value[8]);
            $('.body').find('span#direccion').text(value[5]);
            $('.body').find('span#telefono').text(value[6]);
            $('.body').find('span#email').text(value[7]);
            $('.body').find('strong#nombreCompleto').attr('idPaciente', value[1]);
            $('.body').find('span#totalCancelarConsulta').html("TOTAL A CANCELAR : $ " + parseFloat(value[12]).toFixed(2));
            $('.body').find('span#totalDescuentoConsulta').html("TOTAL DESCUENTO : $ " + parseFloat(value[13]).toFixed(2));
            $('strong#SecuenciaFacturaConsulta').html('FACTURA #: ' + value[14]);
            numeroFacturaCargada = value[14];
            fechaFacturaCargada = value[15];
            if (value[10] == 1) {
                $('.body').find('span#cedulaCliente').text("9999999999");
                $('.body').find('strong#nombreCompletoCliente').text("CONSUMIDOR FINAL");
                $('.body').find('strong#nombreCompletoCliente').attr('idCliente', '1');
                $('.body').find('span#direccionCliente').text("----------------");
                $('.body').find('span#telefonoCliente').text("----------------");
                $('.body').find('span#emailCliente').text("-----------------");
            }
            if (value[10] > 1) {

                CargarClientePorIdConsulta(value[10]);

            }
            if (value[11] == "S") {
                $(".body div#DatosPaciente").css('visibility', 'visible');
                $("a#NoCon").click();
            }
            FacturaCargada = value[0];
            anular = true;


            if (anular) {
                $('.body').find('button#AnularFarmacia').prop('disabled', false);
            } else {
                $('.body').find('button#AnularFarmacia').prop('disabled', true);
            }
        });

        if (confirma) {
            swal("Esculapio!", "No Existe La Factura.", "warning");
        } else {
            $('button#CobrarConsulta').fadeOut(0);
            $('button#ReimprimirFarmacia').fadeIn(0);
        }
    });
}

function ConsultarDetalleConsultaFarmacia(idFarmacia) {
    $.ajax({
        method: "POST",
        url: "Ajax/Aj_Farmacia.php",
        data: {
            Requerimiento: "ConsultarDetalleConsultaFarmaciaFactura",
            Farmacia: idFarmacia
        },
        dataType: 'JSON',
    }).done(function(respuesta) {
        if (respuesta[0] == false) {
            swal("Esculapio!", "OCURRIO UN ERROR.", "error");
            return;
        }
        $.each(respuesta, function(i, value) {

            var id = '';
            var item = '';
            var presentacion = '';
            var cantidad = 0;
            var precio = 0;
            var subtotal = 0;
            var iva = 0;
            var descuento = 0;
            var total = 0;
            var boton = '<button type="submit" id="EliminarItemConsultaNN" atendido="' + value[8] + '" class="btn btn-danger"><i class="fa fa-trash-o" aria-hidden="true"></i></button>';

            presentacion = value[3]
            cantidad = value[4];
            precio = value[5];
            subtotal = value[6];
            iva = value.iva;

            item = value.nombre;

            if (value.prst1 == value[3]) {
                nivel = 'Dos';
            } else {
                nivel = 'Uno';
            }

            cantidad = '<input nivel="' + nivel + '" disabled style="width:80px;" type="number" required step=".01" value="' + value[4] + '" class="form-control" id="CantidadDetalleFact" >'
            descuento = '<input style="width:80px;" disabled type="number" required step=".01" value="' + value[7] + '" class="form-control" id="DescuentoDetalle"  placeholder="DESCUENTO">';

            total = parseFloat(subtotal);


            id = value[2];


            var campos = [id, item, presentacion, cantidad, parseFloat(precio).toFixed(2), parseFloat(subtotal).toFixed(2), iva, descuento, "$ " + parseFloat(total).toFixed(2), boton, ""];
            tablaDetalle.row.add(campos).draw(true);
        });


        CalcularTotalConsulta();
    }).fail(function(jqXHR, textStatus, errorThrown) {
        console.log(errorThrown)
    });

}

function CargarReceta() {

    tablaRecetas = $('#datatableConsultaReceta').DataTable({
        "processing": true,
        "serverSide": true,
        lengthMenu: [
            [200, 400, 600],
            [200, 400, 600]
        ],
        " bFilter ": true,
        " bSort ": true,
        " bInfo ": true,
        " bAutoWidth ": true,
        "order": [],
        "ajax": {
            url: "Ajax/Aj_ManteBodega.php",
            data: {
                Requerimiento: "CargarReceta"
            },
            type: "POST"
        },
        scrollY: 300,
        scrollX: true,
        keys: true,
        scroller: {
            loadingIndicator: true
        },
        "columnDefs": [{
            "targets": [0, 1, 2, 3],
            "orderable": false,
        }]
    });
    tablaRecetas.on('key', function(e, datatable, key, cell, originalEvent) {
        if (key == 13) {
            $('#datatableConsultaReceta tbody tr').eq(datatable.row(cell.index().row).index()).find('td').eq(0).dblclick();
        }
    });
    $('#datatableConsultaReceta_filter input').unbind();
    $('#datatableConsultaReceta_filter input').remove();
    $('#datatableConsultaReceta_filter label').remove();
    // $('input#apellidoMFiltro').remove();
    $('input#numeroFReceta').bind('keyup', function(e) {
        if (e.keyCode == 13) {
            tablaRecetas.column(0).search($('input#numeroFReceta').val()).draw();
            tablaRecetas.column(1).search($('input#pacienteFReceta').val()).draw();

        }
        if (e.keyCode == 40) {
            $(this).blur();
            $('#datatableConsultaReceta tbody tr td').eq(0).click();
        }
    });
    $('input#pacienteFReceta').bind('keyup', function(e) {
        if (e.keyCode == 13) {
            tablaRecetas.column(0).search($('input#numeroFReceta').val()).draw();
            tablaRecetas.column(1).search($('input#pacienteFReceta').val()).draw();

        }
        if (e.keyCode == 40) {
            $(this).blur();
            $('#datatableConsultaReceta tbody tr td').eq(0).click();
        }
    });
    $('input#clienteFReceta').bind('keyup', function(e) {
        if (e.keyCode == 13) {
            tablaRecetas.column(0).search($('input#numeroFReceta').val()).draw();
            tablaRecetas.column(1).search($('input#pacienteFReceta').val()).draw();

        }
        if (e.keyCode == 40) {
            $(this).blur();
            $('#datatableConsultaReceta tbody tr td').eq(0).click();
        }
    });
}

CargarReceta();

$('.body table#datatableConsultaReceta tbody').on('dblclick', 'tr', function(evt) {
    var fila = $('.body').find("#datatableDetalleFactFarmacia tbody tr").find("td").eq(0).html();
    var idPaciente = $('#nombreCompleto').attr('idPaciente');
    if (idPaciente != "0" || fila != "No existen datos") {
        swal({
            title: "Esculapio",
            text: "Seguro que desa Reemplazar lo que contiene la factura.?",
            icon: "info",
            buttons: true,
            dangerMode: false,
        }).then((confirma) => {
            if (confirma) {
                var cerrar = $('.body').find('button.close');
                var numero = $(this).find('td').eq(0).html();
                $(".body div#DatosPaciente").css('visibility', 'visible');
                CargarRecetaPorid(numero);
                cerrar.click();
            } else {

            }
        });
    } else {
        var cerrar = $('.body').find('button.close');
        var numero = $(this).find('td').eq(0).html();
        $(".body div#DatosPaciente").css('visibility', 'visible');
        CargarRecetaPorid(numero);
        cerrar.click();
    }
});

function CargarRecetaPorid(numero) {

    $.ajax({

        method: "POST",
        url: "Ajax/Aj_Farmacia.php",
        data: {
            Requerimiento: "CargarRecetaPorid",
            Numero: numero
        },
        dataType: 'JSON',
    }).done(function(respuesta) {


        if (respuesta[0] == false) {
            swal("Esculapio!", "OCURRIO UN ERROR.", "error");
            return;
        }
        var confirma = true;
        $.each(respuesta, function(i, value) {
            confirma = false;
            try { tablaDetalle.clear().draw(); } catch (error) {}
            ConsultarDetalleReceta(value[0]);

            $('.body').find('span#cedula').text(value[4]);
            $('.body').find('strong#nombreCompleto').text(value[3] + " " + value[2]);
            $('.body').find('strong#nombreCompleto').attr('fecha', value[8]);
            $('.body').find('span#direccion').text(value[5]);
            $('.body').find('span#telefono').text(value[6]);
            $('.body').find('span#email').text(value[7]);
            $('.body').find('strong#nombreCompleto').attr('idPaciente', value[1]);

        });

        if (confirma) {

            swal("Esculapio!", "No Existe La Receta.", "warning");
        }
    });
}

function ConsultarDetalleReceta(idFarmacia) {
    $.ajax({
        method: "POST",
        url: "Ajax/Aj_Farmacia.php",
        data: {
            Requerimiento: "ConsultarDetalleReceta",
            Farmacia: idFarmacia
        },
        dataType: 'JSON',
    }).done(function(respuesta) {
        if (respuesta[0] == false) {
            swal("Esculapio!", "OCURRIO UN ERROR.", "error");
            return;
        }
        var sinStock = "";
        $.each(respuesta, function(i, value) {

            var id = '';
            var item = '';
            var presentacion = '';
            var cantidad = 0;
            var precio = 0;
            var subtotal = 0;
            var iva = 0;
            var descuento = 0;
            var total = 0;
            var nivel = "";
            var valorCaja = value[19];
            var costo = value[18];

            var boton = '<button type="submit" id="EliminarItemConsulta" class="btn btn-danger"><i class="fa fa-trash-o" aria-hidden="true"></i></button>';

            presentacion = value[3]

            precio = value[5];

            iva = value[9];
            descuento = value[7];
            item = value[10];

            var cantidadReceta = 0;
            var cantidadStock = (value[14] * value[15]) + parseInt(value[16]);

            if (value[11] == value[3]) {
                precio = value[13];
                nivel = 'Uno';
                cantidadReceta = (value[4] * value[15]);
                costo = value[18] * value[15];
                valorCaja = value[19];
            } else {
                nivel = 'Dos';
                precio = value[12];
                cantidadReceta = value[4];
                valorCaja = value[20];
                costo = value[18];
            }
            if (cantidadStock >= cantidadReceta) {
                cantidad = '<input nivel="' + nivel + '" style="width:80px;" type="number" required step=".01" costo="' + costo + '" value="' + value[4] + '" class="form-control" id="CantidadDetalleFact" >'

                subtotal = precio * value[4];

                var descuento = '<input style="width:80px;" type="number" required step=".01" valorDescuento="0" value="0.00" class="form-control" id="DescuentoDetalle"  placeholder="DESCUENTO">';

                id = value[2];
                var puntoSecuencia = $('.body').find('span#puntoSecuencia').text();

                var campos = [id, item, presentacion, cantidad, parseFloat(precio).toFixed(2), parseFloat(subtotal).toFixed(2), iva, descuento, "$ " + parseFloat(subtotal).toFixed(2), boton, valorCaja];
                tablaDetalle.row.add(campos).draw(true);
            } else {
                sinStock += "No hay stock suficiente para el item " + item + ". Solo cuenta con un Stock de " + cantidadStock + " " + value[17] + "\n";
            }


        });
        if (sinStock != "") {
            swal("Esculapio!", sinStock, "warning");
        }
        CalcularTotalConsulta();

    }).fail(function(jqXHR, textStatus, errorThrown) {
        console.log(errorThrown)
    });

}

function ImprimirTicKetInventario(numero, productos, valorCaja, idConsulta) {
    var iva = $('span#totalCancelarIva').html().replace('IVA : $', '');
    $.ajax({
        async: false,
        method: "POST",
        url: "Controladores/Con_Impresion.php",
        data: {
            Requerimiento: "ImprimirInventario",
            Consulta: idConsulta,
            Numero: numero,
            FechaCargada: fechaFacturaCargada,
            Cliente: $('strong#nombreCompletoCliente').html(),
            Cedula: $('span#cedulaCliente').html(),
            DireccionC: $('span#direccionCliente').html(),
            TelefonoC: $('span#telefonoCliente').html(),
            Correo: $('span#emailCliente').html(),
            DesctoTotal: $('span#totalDescuentoConsulta').html().replace("TOTAL DESCUENTO : $ ", ""),
            Item: $('span#totalItemsConsulta').html().replace("TOTAL DE ITEMS : ", ""),
            Subtotal: $('span#totalCancelarConsulta').html().replace("TOTAL A CANCELAR : $ ", ""),
            Iva: iva,
            Productos: productos,
            Paciente: $('strong#nombreCompleto').html(),
            Recibido: $('input#ValorRecibidoConsulta').val(),
            Cambio: $('span#CambioConsulta').html().replace("$ ", ""),
            Ahorro: parseFloat(valorCaja - $('span#totalCancelarConsulta').html().replace("TOTAL A CANCELAR : $ ", "")).toFixed(2)
        },
        dataType: 'JSON',
    }).done(function(respuesta) {}).fail(function(jqXHR, textStatus, errorThrown) {
        console.log(errorThrown);
    });
}

function printTextAreaMovimiento(numero, productos) {
    var today = new Date();
    var date = today.getDate() + '/' + (today.getMonth() + 1) + '/' + today.getFullYear();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    var dateTime = date + ' ' + time;
    if (fechaFacturaCargada != "") {
        dateTime = fechaFacturaCargada;
    }

    var cliente = $('strong#nombreCompletoCliente').html();
    var cedula = $('span#cedulaCliente').html();
    var direccionC = $('span#direccionCliente').html();
    var telefonoC = $('span#telefonoCliente').html();
    var correo = $('span#emailCliente').html();
    var desc = $('span#totalDescuentoConsulta').html().replace("TOTAL DESCUENTO : $ ", "");
    var subtotal = $('span#totalCancelarSubtotal').html().replace("SUBTOTAL : $ ", "");
    var recibido = $('input#ValorRecibidoConsulta').val();
    var cambio = $('span#CambioConsulta').html().replace("$ ", "");
    var iva = $('span#totalCancelarIva').html().replace('IVA : $', '');
    var total = parseFloat(subtotal) - parseFloat(desc) + parseFloat(iva);
    var vendedor = $('span#Vendedor').html().replace('USUARIO : ', '');
    var filastabla = '';
    for (var i = 0; i < productos.length; i++) {

        var nombre = productos[i][0];
        if (nombre.length > 22) {
            nombre = nombre.substring(0, 22);
        }
        var cantidad = productos[i][2];
        if (cantidad.length > 3) {
            cantidad = cantidad.substring(0, 3);
        }
        var subtot = productos[i][5];
        var ttotal = subtot - (subtot * (productos[i][4] / 100));
        filastabla += ' <tr> ' +
            '<td> ' + nombre + ' </td>' +
            '<td> ' + formatoDinero(productos[i][3]) + ' </td>' +
            '<td> ' + productos[i][2] + ' </td>' +
            '<td> ' + formatoDinero(productos[i][4]) + ' </td>' +
            '<td> ' + formatoDinero(ttotal) + ' </td>' +
            '</tr>';

    }

    var reporte = ' <!DOCTYPE html>' +
        '<html>' +
        '<head>' +
        '<title></title>' +
        '</head>' +
        '<style type="text/css">' +
        'body {' +
        'font-family: monospace;' +
        '}' +
        '</style>' +
        '<body>' +
        '<div style="width: 100%;">' +
        '<table style="width: 100%; margin-top: 1em;text-align: center;">' +
        '<thead>' +
        '<th> <b> ' + $("#razonEmpresa").val() + '  </b> </th>' +
        '</thead>' +
        '</table>' +
        '</div>' +
        '<div style="width: 100%;">' +
        '<table style="width: 100%;">' +
        '<tbody>' +
        '<tr>' +
        '<td> <b>RUC : </b> ' + $("#rucEmpresa").val() + ' </td>' +
        '</tr>' +
        '<tr>' +
        '<td> ' + $("#dirEmpresa").val() + ' </td>' +
        '</tr>' +
        '<tr>' +
        '<td> <b>TELÉFONO : </b> ' + $("#telEmpresa").val() + ' </td>' +
        '</tr>' +
        '</tbody>' +
        '</table>' +
        '</div>' +
        '<hr>' +
        '<div style="width: 100%;">' +
        '<table style="width: 100%;">' +
        '<tbody>' +
        '<tr>' +
        '<td> <b>FACTURA : </b></td>' +
        '<td> <b>' + numero + ' </b></td>' +
        '</tr>' +
        '<tr>' +
        '<td> <b>EMISIÓN : </b></td>' +
        '<td> <b>' + dateTime + ' </b></td>' +
        '</tr>' +
        '<tr>' +
        '<td> <b>CLIENTE : </b></td>' +
        '<td> <b>' + cliente + ' </b></td>' +
        '</tr>' +
        '<tr>' +
        '<td> <b>CED-RUC : </b></td>' +
        '<td> <b>' + cedula + ' </b></td>' +
        '</tr>' +
        '<tr>' +
        '<td> <b>DIRECCIÓN : </b></td>' +
        '<td> <b>' + direccionC + ' </b></td>' +
        '</tr>' +
        '<tr>' +
        '<td> <b>TELÉFONO : </b></td>' +
        '<td> <b>' + telefonoC + ' </b></td>' +
        '</tr>' +
        '<tr>' +
        '<td> <b>CORREO : </b></td>' +
        '<td> <b>' + correo + ' </b></td>' +
        '</tr>' +
        '</tbody>' +
        '</table>' +
        '<table style="width: 100%;">' +
        '<tbody>' +
        '<tr>' +
        '<td> <b>SU AHORRO EN ESTA COMPRA ES DE : $ ' + formatoDinero(desc) + ' </b></td>' +
        '</tr>' +
        '</tbody>' +
        '</table>' +
        '</div>' +
        '<hr>' +
        '<div style="width: 100%;">' +
        '<table style="width: 100%;text-align: center;">' +
        '<thead>' +
        '<th>ITEM</th>' +
        '<th>PVP</th>' +
        '<th>CANT</th>' +
        '<th>DCTO(%)</th>' +
        '<th>TOT($)</th>' +
        '</thead>' +
        '<tbody>' +
        filastabla +
        '</tbody>' +
        '</table>' +
        '</div>' +
        '<hr>' +
        '<div style="width: 60%;">' +
        '<table style="width: 100%;">' +
        '<tbody>' +
        '<tr>' +
        '<td> <b>Sub-Total : </b> </td>' +
        '<td> <b>' + subtotal + ' </b> </td>' +
        '</tr>' +
        '<tr>' +
        '<td> <b>(-)Dcto : </b> </td>' +
        '<td> <b>' + desc + ' </b> </td>' +
        '</tr>' +
        '<tr>' +
        '<td> <b>Tarifa 0% : </b> </td>' +
        '<td> <b>' + formatoDinero(tarifa0) + ' </b> </td>' +
        '</tr>' +
        '<tr>' +
        '<tr>' +
        '<td> <b>Tarifa 12% : </b> </td>' +
        '<td> <b>' + formatoDinero(tarifa12) + ' </b> </td>' +
        '</tr>' +
        '<tr>' +
        '<tr>' +
        '<td> <b>Sub-Total - Dcto : </b> </td>' +
        '<td> <b>' + formatoDinero(subtotal - desc) + ' </b> </td>' +
        '</tr>' +
        '<tr>' +
        '<td> <b>IVA 12% : </b> </td>' +
        '<td> <b>' + formatoDinero(iva) + ' </b> </td>' +
        '</tr>' +
        '<tr>' +
        '<td> <b>Total : </b> </td>' +
        '<td> <b>' + formatoDinero(total) + ' </b> </td>' +
        '</tr>' +
        '<tr>' +
        '<td> <b>Forma De pago : </b> </td>' +
        '<td> <b>' + ObtenerFormaPago() + ' </b> </td>' +
        '</tr>' +
        '<tr>' +
        '<td> <b>Cajero : </b> </td>' +
        '<td> <b>' + vendedor + ' </b> </td>' +
        '</tr>' +
        '<tr>' +
        '<td> <b>T.Recibido : </b></td>' +
        '<td> <b>' + recibido + ' </b> </td>' +
        '</tr>' +
        '<tr>' +
        '<td> <b>T.Cambio : </b></td>' +
        '<td> <b>' + cambio + ' </b> </td>' +
        '</tr>' +
        '</tbody>' +
        '</table>' +
        '</div>' +
        '<div style="width: 100%;">' +
        '<label>CLAVE DE ACCESO : ' + clavesri + '</label>' +
        '</div>' +
        '<script type="text/javascript">setTimeout(function(){ window.print(); window.close();}, 500); </script>' +
        '</body>' +
        '</html> ';

    childWindow = window.open('_blank');
    childWindow.document.write(reporte);
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////ZUMPAGO/////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

$(".body").on('change', "#chZumpago", function(ev) {
    if ($(this).prop("checked")) {
        $("#EntidadTarjeta").val("52");
        $("#EntidadTarjeta").attr("disabled", true);
        $("#FechaTarjeta").attr("disabled", true);
        $("#NumeroTarjeta").attr("disabled", true);
        $("#NumeroVoucher").attr("disabled", true);
    } else {
        $("#EntidadTarjeta").val("0");
        $("#EntidadTarjeta").attr("disabled", false);
        $("#FechaTarjeta").attr("disabled", false);
        $("#NumeroTarjeta").attr("disabled", false);
        $("#NumeroVoucher").attr("disabled", false);
    }
    $('.selectpicker').selectpicker('refresh');
});

function EnviarFacturasQuickCont() {
    $.ajax({
        method: "POST",
        url: "Ajax/Aj_ManteBodega.php",
        data: {
            Requerimiento: "EnviarFacturasQuickCont",
        },
        dataType: 'JSON',
    });
}

function ValidacionesIniciales() {
    if ($("#integradoQuickcont").val() == "SI") {
        EnviarFacturasQuickCont();
    }
    if ($("#habilitarDescuentoPredefinido").val() == "NO") {
        $("#cbmTipoPago").parent().fadeOut(0);
    }
}
ValidacionesIniciales();


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////PAGOS CON TARJETA/////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

$(".body").on('click', "#consultasFactura", function(ev) {

    if ($("#habilitarDescuentoPredefinido").val() == "SI") {
        if ($("#cbmTipoPago").val() == "0") {
            swal("Esculapio!", "Debe seleccionar el tipo de descuento", "warning");
            return;
        } else {
            $("#modal-consultas").modal();
        }
    } else {
        $("#modal-consultas").modal();
    }
});