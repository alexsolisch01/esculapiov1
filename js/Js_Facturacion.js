var id = 0;
var tablaCliente = null;
var cobrar = false;
var confirmaPago = false;
var idConsultaAnterior = 0;
var idOrden = 0;
var OrdenLab = false;
var OrdenRx = false;
var OrdenEco = false;
var OrdenTac = false;
var TipoConsulta = 1;
var ClicTablaDetalle = false;
var idProcedimientoConsulta = 0;
var idProcedimientoConsultaMedicas = 0;
var especialidadAtributo = "";
var idClientePaciente = 0;
var valorRecibido = 0;
var valorRecibidoCheque = 0;
var valorRecibidoAnticipo = 0;
var valorRecibidoTarjeta = 0;
var valorCredito = 0;
var valorTransferencia = 0;
var medicoModificar = '';
var CargadaEstadoSri = "";
var NumeroConsultaCargada = 0;
var filaClikeada = null;
var iditemmodificar = 0;
var idClienteNuevo = '';
var noModal = true;
var facturando = false;
var idEspecialidadCargada = 0;
var idReservacion = 0;
var clavesri = "";
$(".body").on('keyup', "input.filtroPacientes", function(ev) {
    if (ev.keyCode == 13) {
        Cargar($('#cedulaFiltro').val().trim(), $('#apellidoPFiltro').val().trim(), $('#apellidoMFiltro').val().trim(), $('#nombreFiltro').val().trim());
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
        $("#datatableFactura tbody").empty();
        try {
            var elemento = '';
            $.each(respuesta, function(i, value) {
                elemento += ' <tr>' +
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

            });
            $("#datatableFactura tbody").append(elemento);
        } catch (error) {

        }
    }).fail(function(jqXHR, textStatus, errorThrown) {
        console.log(errorThrown)
    });
}

$('.body table#datatableFactura tbody').on('dblclick', 'tr', function(evt) {
    var cerrar = $('.body').find('button.close');
    id = $(this).find('td').eq(0).html();
    $('.body').find('strong#nombreCompleto').attr('idPaciente', id);
    LimpiarCobrar();
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
    cerrar.trigger('click');
    var edad = calcularEdad($('strong#nombreCompleto').attr("fecha"));
    $('.body').find('span#edad').html(edad);
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
    if (validacion(cedula.text())) {
        return
    }
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
    tablaCliente = $('#datatableClienteFactura').DataTable({
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
        }, ]
    });

    $('#datatableClienteFactura_filter input').css("margin-left", "-75em");
    $('#datatableClienteFactura_filter input').css("width", "75em");
}
LlenarTablaClienteFactura();
$('#modal-default2').on('shown.bs.modal', function() {
    noModal = false;
    $('.body').find('button#ModificarCliente').prop('disabled', true);
    $('.body').find('button#GuardarCliente').prop('disabled', false);
    $('.body').find('input#cedulaCliente').val("");
    $('.body').find('input#nombreCliente').val("");
    $('.body').find('input#apellidoCliente').val("");
    $('.body').find('input#direccionCliente').val("");
    $('.body').find('input#emailCliente').val("");
    $('.body').find('input#telefonoCliente').val("");
    tablaCliente.column(1).search('').draw();
    $('input#cedulaClienteFiltro').val();
});
$('#modal-default').on('shown.bs.modal', function() {
    noModal = false;
    $('input#apellidoPFiltro').focus();
    $('input#cedulaFiltro').val('');
    $('input#apellidoPFiltro').val('');
    $('input#apellidoMFiltro').val('');
    $('input#nombreFiltro').val('');
});

$('.body table#datatableClienteFactura tbody').on('dblclick', 'tr', function(evt) {
    var cerrar = $('.body').find('button.close');
    id = $(this).find('td').eq(0).html();
    ConsultarAnticipo(id);
    $('.body').find('strong#nombreCompletoCliente').attr('idCliente', id);
    var cedula = $('.body').find('span#cedulaCliente');
    var apellido = $('.body').find('strong#nombreCompletoCliente');
    var direccion = $('.body').find('span#direccionCliente');
    var telefono = $('.body').find('span#telefonoCliente');
    var correo = $('.body').find('span#emailCliente');
    var fila = $(this);

    var datos = tablaCliente.row($(this)).data();
    correo.text(datos[5]);
    cedula.text(datos[1]);
    apellido.text(datos[2] + ' ' + datos[3] + ' ' + datos[4]);
    direccion.text(datos[6]);
    telefono.text(datos[7]);
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

$(".body table#datatableClienteFactura").on('click', "button#CargarDatos", function(evt) {
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
            //$(".body div#DatosCliente").css('visibility', 'hidden');
            $('.body').find('span#cedulaCliente').text("9999999999");
            $('.body').find('strong#nombreCompletoCliente').text("CONSUMIDOR FINAL");
            $('.body').find('strong#nombreCompletoCliente').attr('idCliente', '1');
            $('.body').find('span#direccionCliente').text("----------------");
            $('.body').find('span#telefonoCliente').text("----------------");
            $('.body').find('span#emailCliente').text("-----------------");
        });
        confirma = true;
        //$("#SiCon").click();
    }
    return confirma;
}
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////// AGREGAR ITEMS A LA FACTURA //////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

var tableEspe = null;
var tableMedico = null;
var tableProce = null;
var tablaAnticipo = null;
var idEspecialidad = 0;
var idGrupoExamen = 0;
var calendario = null;
var tableDetalle = null;
var medico = "";
var idMedico = 0;
var tableGrupoExamen = null;
var tableProcedimientosAgregados = null;
var tableGrupoProcedimiento = null;
var calendario2 = null;
var enterEspecialidad = false;

function CargarTablas1() {
    tablaAnticipo = $('#datatableAnticipo').DataTable({
        ordering: false,
        dom: '<"top">rt<"bottom">',
        scrollY: 100,
        paginate: false
    });

    tableEspe = $('#datatableEspecialidadConsulta').DataTable({
        'paging': false,
        'lengthChange': false,
        'searching': true,
        'ordering': true,
        'info': false,
        'autoWidth': false,
        scrollY: 400,
        keys: true
    });
    $('#datatableEspecialidadConsulta_filter input').css("margin-left", "-15em");
    $('#datatableEspecialidadConsulta_filter input').css("width", "18em");

    tableEspe.on('key', function(e, datatable, key, cell, originalEvent) {

        if (112 == key && !noModal) {

            tableEspe.cell().focus(':eq(0)');
            tableProce.cell.blur();
            tableMedico.cell.blur();

        }

        if (113 == key && !noModal) {

            tableEspe.cell.blur();
            tableProce.cell().focus(':eq(0)');
            tableMedico.cell.blur();

        }
        if (114 == key && !noModal) {

            tableEspe.cell.blur();
            tableProce.cell.blur();
            tableMedico.cell().focus(':eq(0)');

        }

        if (key == 13) {
            tableEspe.cell.blur();
            enterEspecialidad = true;
            tableProce.cell().focus(':eq(0)');
        } else {
            ObtenerFilaPorPrimerletra('#datatableEspecialidadConsulta', String.fromCharCode(key));
        }
    }).on('key-focus', function(e, datatable, cell) {
        if (idEspecialidadCargada == 0) {
            idEspecialidad = $(datatable.row(cell.index().row).data()[0]).attr("id");
        } else {
            idEspecialidad = idEspecialidadCargada;
        }
        especialidadAtributo = $(datatable.row(cell.index().row).data()[0]).html();
        CargarProcedimientosFactura(idEspecialidad, tableProce);
        CargarMedicosPorEspecialidad(tableMedico)

        if ($('#datatableEspecialidadConsulta tbody tr').eq(datatable.row(cell.index().row).index()).hasClass('selected')) {
            return;
        }
        $('#datatableEspecialidadConsulta tbody tr').eq(datatable.row(cell.index().row).index()).find('td').eq(0).dblclick();
    });

    tableProce = $('#datatableProcedimientoConsulta').DataTable({
        'paging': false,
        'lengthChange': false,
        'searching': true,
        'ordering': false,
        'info': false,
        'autoWidth': false,
        scrollY: 400,
        keys: {
            columns: [0]
        }
    });
    $('#datatableProcedimientoConsulta_filter input').css("margin-left", "-20em");
    $('#datatableProcedimientoConsulta_filter input').css("width", "30em");

    tableProce.on('key', function(e, datatable, key, cell, originalEvent) {

        if (112 == key && !noModal) {

            tableEspe.cell().focus(':eq(0)');
            tableProce.cell.blur();
            tableMedico.cell.blur();

        }

        if (113 == key && !noModal) {

            tableEspe.cell.blur();
            tableProce.cell().focus(':eq(0)');
            tableMedico.cell.blur();

        }
        if (114 == key && !noModal) {

            tableEspe.cell.blur();
            tableProce.cell.blur();
            tableMedico.cell().focus(':eq(0)');

        }

        if (key == 13 && !enterEspecialidad) {
            var idProcedimiento = datatable.row(cell.index().row).node().id
            $('#datatableProcedimientoConsulta tbody tr td').find('input#checkbox' + idProcedimiento).trigger("click");
            $('#datatableProcedimientoConsulta tbody tr').eq(datatable.row(cell.index().row).index() + 1).find('td').eq(0).click();
        } else {
            ObtenerFilaPorPrimerletra('#datatableProcedimientoConsulta', String.fromCharCode(key));
        }
        enterEspecialidad = false;
    }).on('key-focus', function(e, datatable, cell) {

        if ($('#datatableProcedimientoConsulta tbody tr').eq(datatable.row(cell.index().row).index()).hasClass('selected')) {
            return;
        }
        $('#datatableProcedimientoConsulta tbody tr').eq(datatable.row(cell.index().row).index()).find('td').eq(0).dblclick();

    });

    tableMedico = $('#datatableDoctoresProcedimientosFact').DataTable({
        'paging': false,
        'lengthChange': false,
        'searching': true,
        'ordering': true,
        'info': false,
        'autoWidth': false,
        scrollY: 400,
        keys: true
    });

    tableMedico.on('key', function(e, datatable, key, cell, originalEvent) {

        if (112 == key && !noModal) {

            tableEspe.cell().focus(':eq(0)');
            tableProce.cell.blur();
            tableMedico.cell.blur();

        }

        if (113 == key && !noModal) {

            tableEspe.cell.blur();
            tableProce.cell().focus(':eq(0)');
            tableMedico.cell.blur();

        }
        if (114 == key && !noModal) {

            tableEspe.cell.blur();
            tableProce.cell.blur();
            tableMedico.cell().focus(':eq(0)');

        }

        if (key == 13) {
            var idMedico = datatable.row(cell.index().row).node().id;

            $('#datatableDoctoresProcedimientosFact tbody tr td').find("i[idmedico=" + idMedico + "]").click();
        } else {}

    }).on('key-focus', function(e, datatable, cell) {

        if ($('#datatableDoctoresProcedimientosFact tbody tr').eq(datatable.row(cell.index().row).index()).hasClass('selected')) {
            return;
        }
        $('#datatableDoctoresProcedimientosFact tbody tr').eq(datatable.row(cell.index().row).index()).find('td').eq(0).dblclick();

    });
    $('#datatableDoctoresProcedimientosFact_filter input').css("margin-left", "-20em");
    $('#datatableDoctoresProcedimientosFact_filter input').css("width", "30em");

    tableDetalle = $('#datatableDetalleFact').DataTable({
        'paging': false,
        'lengthChange': false,
        'searching': false,
        'info': true,
        'autoWidth': false,
        scrollY: 400,
        scrollX: true,
        "order": [
            [9, "asc"]
        ],
        "columnDefs": [{
                "targets": [0, 1, 2, 3, 4, 5, 6, 7, 8],
                "orderable": false,
            },
            {
                "targets": [9],
                "visible": false,
            }
        ]
    });

    calendario = $('#calendar').fullCalendar({
        header: {
            left: 'prev,next today',
            center: '',
            right: 'title'
        },
        buttonText: {
            today: 'Hoy',
            month: 'Mes'
        },
        dayClick: function(date, jsEvent, view) {
            var turno = 1;
            var dayEvents = calendario.fullCalendar('clientEvents', function(event) {
                return event.start.format() == date.format();
            });
            if (dayEvents.length > 0) {
                turno = parseInt(dayEvents[0].title.replace('PAC ', '')) + 1;
            }
            var fecha = new Date()
            var d = fecha.getDate() - 1,
                m = fecha.getMonth(),
                y = fecha.getFullYear();
            var hoyMostrar = fecha.getDate() + "/" + (m + 1) + "/" + y;
            var hoy = new Date(y, m, d);
            if (date < hoy) {
                swal("Esculapio!", "Debe Seleccionar Una Fecha Mayor o Igual a " + hoyMostrar, "error");
                return;
            }
            var eventos = calendario.fullCalendar('clientEvents', function(event) {
                return event.start.format("DD-MM-YYYY") == date.format("DD-MM-YYYY");
            });
            if (eventos.length == 0) {
                swal("Esculapio!", "El Medico No Atiende Este Dia..!", "error");
                return;
            }
            swal({
                title: "TURNO # " + turno,
                text: "Seguro Que Desea Agendar La Cita El " + date.format(),
                //icon: "info",
                buttons: true,
                dangerMode: false,
                icon: "imagenes/agenda.png",
            }).then((confirma) => {
                if (confirma) {
                    $('#datatableProcedimientoConsulta_filter input').val('');
                    tableProce.search('').draw(false);
                    AgregarItens(date.format(), turno);
                    //$('#datatableEspecialidadConsulta tbody tr td').eq(0).click();
                    try {
                        tableMedico.clear().draw();
                    } catch (error) {}

                } else {}
            });
        },
        //events    : respuesta,
        displayEventEnd: true,
        editable: false
    });
}
CargarTablas1();

$(document).keydown(function(tecla) {
    if (121 == tecla.keyCode || tecla.keyCode == 112 || tecla.keyCode == 113 || tecla.keyCode == 114 || tecla.keyCode == 115 ||
        tecla.keyCode == 116 || tecla.keyCode == 117 || tecla.keyCode == 118 || tecla.keyCode == 119) {
        tecla.preventDefault();
    }
    if (cobrar && 121 == tecla.keyCode && noModal) {
        $('button#CobrarConsulta').click();
    }
    if (112 == tecla.keyCode && noModal) {
        tecla.preventDefault();
        $('a#BuscarPaciente').click();
    }
    if (113 == tecla.keyCode && noModal) {
        tecla.preventDefault();
        $('button#consultasFactura').click();
    }
    if (114 == tecla.keyCode && noModal) {
        tecla.preventDefault();
        $('button#estomatologiaFactura').click();
    }
    if (115 == tecla.keyCode && noModal) {
        tecla.preventDefault();
        $('button#serviciosFactura').click();
    }
    if (116 == tecla.keyCode && noModal) {
        tecla.preventDefault();
        $('button#laboratorioFactura').click();
    }
    if (117 == tecla.keyCode && noModal) {
        tecla.preventDefault();
        $('button#rxfacutura').click();
    }
    if (118 == tecla.keyCode && noModal) {
        tecla.preventDefault();
        $('button#ecoFactura').click();
    }
    if (119 == tecla.keyCode && noModal) {
        tecla.preventDefault();
        $('button#tamoFactura').click();
    }
    if (120 == tecla.keyCode) {
        tecla.preventDefault();
        $('button#BuscarFact').click();
    }
    if (122 == tecla.keyCode) {
        tecla.preventDefault();
        $('button#BuscarOrden').click();
    }
});
$('#modal-consultas').on('hidden.bs.modal', function() {
    try {
        noModal = true;
        ClicTablaDetalle = false;
        tableMedico.clear().draw();
    } catch (error) {}
});

$('#modal-default').on('hidden.bs.modal', function() {
    try {
        noModal = true;
        ClicTablaDetalle = false;
    } catch (error) {}
});
$('#modal-consultas').on('shown.bs.modal', function() {
    if (parseInt(ConsultaCargada) > 0) {
        $("#datatableEspecialidadConsulta").fadeOut(0);
        $("#datatableProcedimientoConsulta").fadeOut(0);
    }
    noModal = false;
    if (!ClicTablaDetalle) {
        $('#datatableEspecialidadConsulta tbody tr td').eq(0).click();
    } else {
        $('#datatableEspecialidadConsulta tbody tr td').find("span[id=" + idEspecialidad + "]").click();
    }
});

function ObtenerFilaPorPrimerletra(tabla, letra) {
    var fila = $(tabla + ' td:nth-child(1):contains(' + letra + ')').filter(function() {
        if ($.trim($(this).text().slice(0, 1)) == letra) {

            return $(this).index;
        }
    });
    try {
        fila[0].click();
    } catch (error) {}
}
$(".body").on('click', "button.especialidades", function(evt) {
    CararEspecialidades($(this).attr("tipo"));
});

function CararEspecialidades(idTipoServicio) {

    TipoConsulta = idTipoServicio;
    $.ajax({
        method: "POST",
        url: "Ajax/Aj_Especialidad.php",
        data: {
            Requerimiento: "CararEspecialidades",
            Tipo: idTipoServicio
        },
        dataType: 'JSON',
    }).done(function(respuesta) {
        if (respuesta[0] == false) {
            swal("Esculapio!", "Error!", "error");
            return;
        }
        try {
            tableEspe.clear();
        } catch (error) {}
        var filas = [];
        $.each(respuesta, function(i, value) {
            var campos = ['<span id="' + value[0] + '" >' + value[1] + '</span>'];
            tableEspe.row.add(campos);
        });
        tableEspe.draw(false);
        tableEspe.cell(':eq(0)').focus();
        CargarProcedimientosFactura(idEspecialidad, tableProce);
    }).fail(function(jqXHR, textStatus, errorThrown) {
        console.log(errorThrown)
    });
}

function CargarProcedimientosFactura(idEspecialidad, tableProce) {
    $.ajax({
        method: "POST",
        url: "Ajax/Aj_Procedimiento.php",
        data: {
            Requerimiento: "CargarProcedimientos",
            Id: idEspecialidad
        },
        dataType: 'JSON',
    }).done(function(respuesta) {
        if (respuesta[0] == false) {
            swal("Esculapio!", "OCURRIO UN ERROR.", "error");
            return;
        }
        try {
            tableProce.clear();
        } catch (error) {}
        $.each(respuesta, function(i, value) {
            var campos = [respuesta[i][1],
                respuesta[i][2], '<div class="checkbox checkbox-info checkbox-circle">' + '<input idProcedimiento="' + respuesta[i][0] + '" class="checkProceFact" id="checkbox' + respuesta[i][0] + '" type="checkbox">' + '<label for="checkbox' + respuesta[i][0] + '">' + ' </label>' + ' </div>'
            ];
            tableProce.row.add(campos).node().id = respuesta[i][0];

        });
        tableProce.draw(false);

        if (ClicTablaDetalle) {
            $('input[idprocedimiento=' + idProcedimientoConsultaMedicas + ']').click();
        }
    }).fail(function(jqXHR, textStatus, errorThrown) {
        console.log(errorThrown)
    });
}

function CargarMedicosPorEspecialidad(tableMedico) {



    $.ajax({
        method: "POST",
        url: "Ajax/Aj_Procedimiento.php",
        data: {
            Requerimiento: "CargarMedicosPorEspecialidad",
            IdEspecialidad: idEspecialidad
        },
        dataType: 'JSON',
    }).done(function(respuesta) {
        if (respuesta[0] == false) {
            swal("Esculapio!", "OCURRIO UN ERROR.", "error");
            return;
        }

        try {

            tableMedico.clear().draw();
        } catch (error) {}
        $.each(respuesta, function(i, value) {
            var medico = respuesta[i][1] + " " + respuesta[i][2];
            var campos = ['<img src="' + respuesta[i][3] + '" style="width:100px;height:100px;">',
                respuesta[i][2] + " " + respuesta[i][1],

                "<span style='margin-top:0.5em;' class='btn-sm btn-default col-md-12' >T. TUNOS " + respuesta[i][5] + "</span><span style='margin-top:0.5em;' class='btn-sm btn-warning col-md-12' > AGENDADOS " + respuesta[i][6] + "</span><span style='margin-top:0.5em;' class='btn-sm btn-primary col-md-12' > ATENDIDOS " + respuesta[i][7] + "</span>",

                '<i medico="' + medico + '" id="' + respuesta[i][4] + '" idMedico="' + respuesta[i][0] + '" class="fa fa-calendar-minus-o btn btn-success verCalendario"' + 'data-toggle="modal" data-target="#modal-horario"></i>'
            ];
            tableMedico.row.add(campos).node().id = respuesta[i][0];

        });
        tableMedico.column(1).search(medicoModificar).draw();
    }).fail(function(jqXHR, textStatus, errorThrown) {
        console.log(errorThrown)
    });
}

function CargarMedicoProcedimientosFactura(idsProcedimientos, tableMedico) {
    $.ajax({
        method: "POST",
        url: "Ajax/Aj_Procedimiento.php",
        data: {
            Requerimiento: "CargarProcedimientosMedicosFact",
            Id: idsProcedimientos,
            IdEspecialidad: idEspecialidad
        },
        dataType: 'JSON',
    }).done(function(respuesta) {

        if (respuesta[0] == false) {
            swal("Esculapio!", "OCURRIO UN ERROR.", "error");
            return;
        }
        try {

            tableMedico.clear();
        } catch (error) {}
        $.each(respuesta, function(i, value) {
            var medico = respuesta[i][1] + " " + respuesta[i][2];
            var campos = ['<img src="' + respuesta[i][3] + '" style="width:100px;height:100px;">',
                respuesta[i][2] + " " + respuesta[i][1],

                "<span style='margin-top:0.5em;' class='btn-sm btn-default col-md-12' >T. TUNOS " + respuesta[i][5] + "</span><span style='margin-top:0.5em;' class='btn-sm btn-warning col-md-12' > AGENDADOS " + respuesta[i][6] + "</span><span style='margin-top:0.5em;' class='btn-sm btn-primary col-md-12' > ATENDIDOS " + respuesta[i][7] + "</span>",

                '<i medico="' + medico + '" id="' + respuesta[i][4] + '" idMedico="' + respuesta[i][0] + '" class="fa fa-calendar-minus-o btn btn-success verCalendario"' + 'data-toggle="modal" data-target="#modal-horario"></i>'
            ];
            tableMedico.row.add(campos).node().id = respuesta[i][0];

        });
        tableMedico.column(1).search(medicoModificar).draw();
    }).fail(function(jqXHR, textStatus, errorThrown) {
        console.log(errorThrown)
    });
}
$(".body").on('change', "input.checkProceFact", function(evt) {
    var vector = $('.body').find("#datatableProcedimientoConsulta tbody tr");
    var idsProcedimientos = "";
    var precioTotal = 0;
    $.each(vector, function(a) {
        var input = $(this).find('input.checkProceFact');
        var precio = $(this).find('td').eq(1).html();
        if (input.prop('checked')) {
            idsProcedimientos += input.attr('idProcedimiento') + ","
            precioTotal += parseFloat(precio);
        }
    });
    $('strong#totalFacturaEstimado').html('$ ' + precioTotal.toFixed(2));
    if (idsProcedimientos != "") {
        CargarMedicoProcedimientosFactura(idsProcedimientos, tableMedico);
    } else {
        try {
            tableMedico.clear().draw();
        } catch (error) {}
    }
});
$(".body").on('click', "i.verCalendario", function(evt) {
    calendario.fullCalendar('removeEvents');
    MostrarHorarioMedicoFact($(this).attr('id'));
    CargarTurnosDisponiblesMedicos($(this).attr('idMedico'));
    medico = '<span id = "' + $(this).attr('idMedico') + '">' + $(this).attr('medico') + '</span>';
});

function MostrarHorarioMedicoFact(idMedicoEspecialidad) {
    $.ajax({
        method: "POST",
        url: "Ajax/Aj_Procedimiento.php",
        data: {
            Requerimiento: "MostrarHorarioMedicoFact",
            Id: idMedicoEspecialidad
        },
        dataType: 'JSON',
    }).done(function(respuesta) {
        if (respuesta[0] == false) {
            swal("Esculapio!", "OCURRIO UN ERROR.", "error");
            return;
        }
        calendario.fullCalendar('addEventSource', respuesta)
    }).fail(function(jqXHR, textStatus, errorThrown) {
        console.log(errorThrown)
    });
}

function CargarTurnosDisponiblesMedicos(idMedico) {
    $.ajax({
        method: "POST",
        url: "Ajax/Aj_Procedimiento.php",
        data: {
            Requerimiento: "CargarTurnosDisponiblesMedicos",
            Id: idMedico
        },
        dataType: 'JSON',
    }).done(function(respuesta) {
        if (respuesta[0] == false) {
            swal("Esculapio!", "OCURRIO UN ERROR.", "error");
            return;
        }
        calendario.fullCalendar('addEventSource', respuesta)
    }).fail(function(jqXHR, textStatus, errorThrown) {
        console.log(errorThrown)
    });
}

function AgregarItens(fecha, turnoConsulta) {
    var vector = $('.body').find("#datatableProcedimientoConsulta tbody tr");
    var items = 0;
    var confirma = true;
    $.each(vector, function(a) {
        var input = $(this).find('input.checkProceFact');
        var item = '<span especialidad="' + especialidadAtributo + '">' + $(this).find('td').eq(0).html() + '</span>';
        var precio = parseFloat($(this).find('td').eq(1).html());
        var img = '<img src="imagenes/doctor.png" />';
        if (TipoConsulta == 13) {
            img = '<img src="imagenes/diente.png" />';
        }
        if (TipoConsulta == 14) {
            img = '<img src="imagenes/heart.png" />';
        }
        var descuento = '<input style="width:80px;" type="number" required step=".01" max="20" value="0.00" class="form-control" id="DescuentoConsulta"  placeholder="DESCUENTO">';
        var id = '<span especialidad="' + idEspecialidad + '" procedimiento="' + input.attr('idProcedimiento') + '" >' + img + '</span>';
        var boton = '<button type="submit" idconsultaitem="' + iditemmodificar + '" id="EliminarItemConsulta" class="btn btn-danger"><i class="fa fa-trash-o" aria-hidden="true"></i></button>';
        if (input.prop('checked')) {
            confirma = false;
            if (!ExisteIten(input.attr('idProcedimiento'), item, fecha)) {
                if (parseInt(ConsultaCargada) > 0) {
                    descuento = '0';
                }
                var campos = [id, item, medico, fecha, turnoConsulta, precio.toFixed(2), descuento, "$ " + precio.toFixed(2), boton, 1];
                tableDetalle.row.add(campos).draw(true);
            }
        }
    });
    if (confirma) {
        swal("Esculapio!", "Seleccione un procedimiento.", "warning");
        return;
    } else {
        $('div#modal-horario button.close').click();
        $('div#modal-consultas button.close').click();
        CalcularTotalConsulta();
    }

}

function ExisteIten(idIten, item, fecha) {
    var confirma = false;
    var vector = $('.body').find("#datatableDetalleFact tbody tr");
    $.each(vector, function(a) {
        var idf = 0;
        idf = $(this).find('td').eq(0).find('span').attr("procedimiento");
        if (idf === undefined) {
            idf = $(this).find('td').eq(0).find('span').attr("laboratorio");
        }
        if (idf === undefined) {
            idf = $(this).find('td').eq(0).find('span').attr("procedimientorx");
        }
        if (idf === undefined) {
            idf = $(this).find('td').eq(0).find('span').attr("procedimientoeco");
        }
        if (idf === undefined) {
            idf = $(this).find('td').eq(0).find('span').attr("procedimientotac");
        }
        var itemf = $(this).find('td').eq(1).html();
        var fechaf = $(this).find('td').eq(3).html();

    });
    if (parseInt(ConsultaCargada) > 0) {
        tableDetalle.row(filaClikeada).remove().draw(false);
    }
    return confirma;
}

function CalcularTotalConsulta() {
    var vector = $('.body').find("#datatableDetalleFact tbody tr");
    var totalcancelar = 0;
    var total = 0;
    var descuento = 0;

    $.each(vector, function(a) {
        try {
            totalcancelar += parseFloat($(this).find('td').eq(7).html().replace('$', ''));
            total += parseFloat($(this).find('td').eq(5).html().replace('$', ''));
            if ($(this).find('td').eq(8).find('button').attr('atendido') == 25) {
                $(this).css('background-color', '#F5ECCE');
            }
        } catch (error) {}
    });
    if (totalcancelar > 0) {
        cobrar = true;
    } else {
        cobrar = false;
    }
    descuento = total - totalcancelar;
    $('span#totalDescuentoConsulta').html('TOTAL DESCUENTO : $ ' + descuento.toFixed(2));
    $('span#totalCancelarConsulta').html('TOTAL A CANCELAR : $ ' + totalcancelar.toFixed(2));
    $('span#totalItemsConsulta').html('TOTAL DE ITEMS : ' + vector.length);
    $('span#totalPagarCobrar').html('$ ' + totalcancelar.toFixed(2));
    $('strong#totalFacturaEstimado').html('$ 0.0');

    if (totalcancelar > 0) {
        $('button#CobrarConsultaCobrar').prop('disabled', false);
        $('button#CobrarConsulta').prop('disabled', false);
        $('button#CobrarConsultaCobrar').fadeIn(0);
        $('button#CobrarConsulta').fadeIn(0);
    } else {
        $('button#CobrarConsultaCobrar').prop('disabled', true);
        $('button#CobrarConsulta').prop('disabled', true);
    }

}

$(".body table#datatableDetalleFact").on('change', "input#DescuentoConsulta", function(evt) {

    var descuento = $(this).val();
    var maximo = $("#puntoDescuento").val();

    if (parseFloat(descuento) > parseFloat(maximo)) {
        $(this).val("0.0");

        swal("Esculapio!", "El descuento maximo que puede dar es de " + maximo, "warning");
        descuento = 0;
    }
    var precio = $(this).parent().parent().find('td').eq(5).html();
    var subtotal = precio - parseFloat(precio) * (descuento / 100);
    $(this).parent().parent().find('td').eq(7).html("$ " + subtotal.toFixed(2));
    CalcularTotalConsulta();
});
$(".body table#datatableDetalleFact").on('click', "button#EliminarItemConsulta", function(evt) {
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
            tableDetalle.row(fila).remove().draw(false);
            CalcularTotalConsulta();
        } else {}
    });
});

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
$(".body").on('click', "button#CobrarConsultaCobrar", function(evt) {
    if (!cobrar) {
        swal("Esculapio!", "Ingrese Al menos un item para facturar..!!", "error");
        return;
    }
    if (!confirmaPago) {
        swal("Esculapio!", "Ingrese El Pago Por Favor..!!", "error");
        return;
    }
    var cedula = $('.body').find('span#cedulaCliente').text();
    var correcta = cedula;
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

    var entidad = $("#EntidadTarjeta").val().trim();
    var numerotarjeta = $("#NumeroTarjeta").val().trim();
    var recargo = $("#RecargoTarjeta").val().trim();

    if (valorRecibidoTarjeta > 0 && entidad != 52) {
        if ($("#PINPAD").val() == "S") {
            RealizarTransaccionPinPad();
            entidad = $("#EntidadTarjeta").val().trim();
            numerotarjeta = $("#NumeroTarjeta").val().trim();
            recargo = $("#RecargoTarjeta").val().trim();
        }
        if (entidad == 0 || entidad === undefined) {
            swal("Esculapio!", "Falta la entidad de la tarjeta. ", "warning");
            return;
        }

        if (numerotarjeta == "" || numerotarjeta === undefined) {
            swal("Esculapio!", "Falta el numero de tarjeta ", "warning");
            return;
        }
    }

    var periodo = $("#cbmPeriodoOdont").val();
    var dividendo = $("#Pagos").val();
    var fila1 = $('.body').find("#datatablePagos tbody tr").find('td').eq(0).html();
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
                GuardarFacturaConsulta();
            }
        } else {}
    });
});
$('#modal-cobrar').on('shown.bs.modal', function() {
    noModal = false;
    $('input#ValorRecibidoConsulta').focus();
    $('#Pagos').val(1);
});

function ObtenerDetalle() {
    var productos = [];
    var productos_lab = [];
    var productos_rx = [];
    var productos_eco = [];
    var productos_tac = [];
    var ac = 0;
    var b = 0;
    var c = 0;
    var d = 0;
    var e = 0;
    var vector = $('.body').find("#datatableDetalleFact tbody tr");

    $.each(vector, function(a) {
        var item = $(this).find('td').eq(1).find('span').html();
        var especialidad = $(this).find('td').eq(1).find('span').attr('especialidad');
        var procedimiento = $(this).find('td').eq(0).find('span').attr('procedimiento');
        var laboratorio = $(this).find('td').eq(0).find('span').attr('laboratorio');
        var procedimientorx = $(this).find('td').eq(0).find('span').attr('procedimientorx');
        var procedimientoeco = $(this).find('td').eq(0).find('span').attr('procedimientoeco');
        var procedimientotac = $(this).find('td').eq(0).find('span').attr('procedimientotac');
        var empleado = $(this).find('td').eq(2).find('span').attr('id');
        var medico = $(this).find('td').eq(2).find('span').html();
        var fecha = $(this).find('td').eq(3).html();
        var precio = $(this).find('td').eq(5).html();
        var descuento = $(this).find('td').eq(6).find('input').val();
        if (descuento === undefined) {
            descuento = $(this).find('td').eq(6).html();
        }
        var subtotal = $(this).find('td').eq(7).html().replace('$', '');
        var turno = $(this).find('td').eq(4).html();

        if (procedimiento != undefined) {
            var lineaDetalle = [procedimiento, empleado, fecha, precio, descuento, subtotal, item, idConsultaAnterior, idOrden, medico, especialidad, turno];
            productos[ac] = lineaDetalle;
            ac++;
        }
        if (laboratorio != undefined) {
            var itemLab = $(this).find('td').eq(1).html();
            var lineaDetalleLab = [laboratorio, empleado, fecha, precio, descuento, subtotal, itemLab, idConsultaAnterior, idOrden];
            productos_lab[b] = lineaDetalleLab;
            b++;
        }
        if (procedimientorx != undefined) {
            var itemRx = $(this).find('td').eq(1).html();
            var lineaDetalleRx = [procedimientorx, empleado, fecha, precio, descuento, subtotal, itemRx, idConsultaAnterior, idOrden];
            productos_rx[c] = lineaDetalleRx;
            c++;
        }
        if (procedimientoeco != undefined) {
            var itemEco = $(this).find('td').eq(1).html();
            var lineaDetalleEco = [procedimientoeco, empleado, fecha, precio, descuento, subtotal, itemEco, idConsultaAnterior, idOrden];
            productos_eco[d] = lineaDetalleEco;
            d++;
        }
        if (procedimientotac != undefined) {
            var itemTac = $(this).find('td').eq(1).html();
            var lineaDetalleTac = [procedimientotac, empleado, fecha, precio, descuento, subtotal, itemTac, idConsultaAnterior, idOrden];
            productos_tac[e] = lineaDetalleTac;
            e++;
        }
    });
    var detalle = [JSON.stringify(productos),
        JSON.stringify(productos_lab),
        JSON.stringify(productos_eco),
        JSON.stringify(productos_rx),
        JSON.stringify(productos_tac)
    ];
    return detalle;
}

function CargarFormaPagoGuardada(id) {
    var formapago = "";
    $.ajax({
        async: false,
        method: "POST",
        url: "Ajax/Aj_Forma_pago.php",
        data: {
            Requerimiento: "CargarFormasPagosConsulta",
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
        formapago = CargarFormaPagoGuardada(ConsultaCargada);
    }
    return formapago;
}

function GuardarFacturaConsulta() {
    facturando = true;
    clavesri = "";
    var puntoVenta = $('input#puntoVenta').val();
    var paciente = $('strong#nombreCompleto').attr('idPaciente');
    var cliente = 1;
    if (idClienteNuevo == undefined || idClienteNuevo == '') {
        cliente = $('.body').find('strong#nombreCompletoCliente').attr('idCliente');
    } else {
        cliente = idClienteNuevo;
    }
    var numero = $('strong#SecuenciaFacturaConsulta').attr('secuencia');
    var total = $('span#totalCancelarConsulta').html().replace('TOTAL A CANCELAR : $', '');
    var descuento = $('span#totalDescuentoConsulta').html().replace('TOTAL DESCUENTO : $', '');
    var referente = $("#cbmMedicoReferente").val();
    var detalle = ObtenerDetalle();
    $.ajax({
        method: "POST",
        url: "Ajax/Aj_Consulta.php",
        data: {
            Requerimiento: "GuardarConsulta",
            Punto: puntoVenta,
            Paciente: paciente,
            Cliente: cliente,
            Numero: numero,
            Total: total,
            Descuento: descuento,
            Referente: referente,
            Orden: idOrden,
            ConsultaAnterior: idConsultaAnterior,
            Reservacion: idReservacion,
            Procedimiento: detalle[0],
            Laboratorio: detalle[1],
            Eco: detalle[2],
            Rx: detalle[3],
            Tac: detalle[4],
            TipoIde: $("#cbmTipoIde").val(),

            Cheque: valorRecibidoCheque,
            Tarjeta: valorRecibidoTarjeta,
            Efectivo: (valorRecibido - parseFloat($("span#CambioConsulta").html().replace("$", ""))),
            Credito: valorCredito,
            CedulaCliente: $("#cedulaCliente").html(),
            NombreCliente: $("#nombreCompletoCliente").html(),
            EmailCliente: $("#emailCliente").html(),
            TelefonoCliente: $("#telefonoCliente").html(),
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

            var objeto = ["ActualizarSecuencialRealTime", puntoVenta];
            var edad = calcularEdad($('strong#nombreCompleto').attr("fecha"));
            GuardarDetalleConsulta(respuesta[1], respuesta[2], respuesta[3], edad, respuesta[4], respuesta[6]);
            clavesri = respuesta[5];
            GuardarPagos(respuesta[1], valorRecibido, valorRecibidoCheque, valorRecibidoTarjeta, valorCredito, valorRecibidoAnticipo, valorTransferencia);
            //send(JSON.stringify(objeto));     
        } else {
            swal("Esculapio!", "Error Al Guardar La Factura. ", "error");
            console.log(respuesta)
            return;
        }
    }).fail(function(jqXHR, textStatus, errorThrown) {
        console.log(errorThrown)
    });
}

function GuardarDetalleConsulta(idConsulta, numero, hc, edad, turnos, linkpago) {
    var vector = $('.body').find("#datatableDetalleFact tbody tr");
    var productos = [];
    var productos_lab = [];
    var productos_rx = [];
    var productos_eco = [];
    var productos_tac = [];
    var ac = 0;
    var b = 0;
    var c = 0;
    var d = 0;
    var e = 0;
    var i = 0;
    turnos = JSON.parse(turnos);
    console.log(turnos)
    $.each(vector, function(a) {
        var item = $(this).find('td').eq(1).find('span').html();
        var especialidad = $(this).find('td').eq(1).find('span').attr('especialidad');
        var procedimiento = $(this).find('td').eq(0).find('span').attr('procedimiento');
        var laboratorio = $(this).find('td').eq(0).find('span').attr('laboratorio');
        var procedimientorx = $(this).find('td').eq(0).find('span').attr('procedimientorx');
        var procedimientoeco = $(this).find('td').eq(0).find('span').attr('procedimientoeco');
        var procedimientotac = $(this).find('td').eq(0).find('span').attr('procedimientotac');
        var empleado = $(this).find('td').eq(2).find('span').attr('id');
        var medico = $(this).find('td').eq(2).find('span').html();
        var fecha = $(this).find('td').eq(3).html();
        var precio = $(this).find('td').eq(5).html();
        var descuento = $(this).find('td').eq(6).find('input').val();
        if (descuento === undefined) {
            descuento = $(this).find('td').eq(6).html();
        }
        var subtotal = $(this).find('td').eq(7).html().replace('$', '');
        var turno = $(this).find('td').eq(4).html();
        if (procedimiento != undefined) {
            var lineaDetalle = [item, turnos[i], fecha, precio, descuento, subtotal, especialidad, medico, procedimiento];
            productos[ac] = lineaDetalle;
            ac++;
            i++;
        }
        if (laboratorio != undefined) {
            var itemLab = $(this).find('td').eq(1).html();
            var lineaDetalleLab = [itemLab, fecha, precio, descuento, subtotal, laboratorio];
            productos_lab[b] = lineaDetalleLab;
            b++;
        }
        if (procedimientorx != undefined) {
            var itemRx = $(this).find('td').eq(1).html();
            var lineaDetalleRx = [itemRx, fecha, precio, descuento, subtotal, procedimientorx];
            productos_rx[c] = lineaDetalleRx;
            c++;
        }
        if (procedimientoeco != undefined) {
            var itemEco = $(this).find('td').eq(1).html();
            var lineaDetalleEco = [itemEco, fecha, precio, descuento, subtotal, procedimientoeco];
            productos_eco[d] = lineaDetalleEco;
            d++;
        }
        if (procedimientotac != undefined) {
            var itemTac = $(this).find('td').eq(1).html();
            var lineaDetalleTac = [itemTac, fecha, precio, descuento, subtotal, procedimientotac];
            productos_tac[e] = lineaDetalleTac;
            e++;
        }

    });
    CrearXML(idConsulta, numero, hc, edad, JSON.stringify(productos), JSON.stringify(productos_lab), JSON.stringify(productos_rx), JSON.stringify(productos_eco), JSON.stringify(productos_tac));
    swal({
        title: "Esculapio",
        text: "Factura Guardada..!, Desea Imprimir?",
        icon: "info",
        buttons: true,
        dangerMode: false,
    }).then((confirma) => {
        if (confirma) {
            printTextAreaMovimiento(numero, productos, productos_lab, productos_rx, productos_eco, productos_tac, "impre");
            LimpiarConsulta();
            //ImprimirTicKetConsulta(idConsulta, numero, hc, edad,JSON.stringify(productos),JSON.stringify(productos_lab),JSON.stringify(productos_rx),JSON.stringify(productos_eco),JSON.stringify(productos_tac));
        } else {
            LimpiarConsulta();
        }
        if (linkpago != "") {
            swal("Esculapio!", "Link de pago : " + $("#linkPago").val() + linkpago[1], "info");
        }
    });





}


function LimpiarConsulta() {
    idClienteNuevo = '';
    $('button.close').click();
    $("#cbmTipoIde").val("1");
    cambios = 0;
    cobrar = false;
    facturando = false;
    idEspecialidadCargada = 0;
    LimpiarCobrar();
    try {
        //tabla.destroy();
    } catch (error) {}
    try {
        tableDetalle.clear().draw();
    } catch (error) {}
    try {
        tableMedico.clear().draw();
    } catch (error) {}
    try {
        tableProce.clear().draw();
    } catch (error) {}
    try {
        CargarTodosGrupoProcedimientosFactura();
        CargarTodosProcedimientosRxFactura();
        CargarTodosProcedimientosEcoFactura();
        CargarTodosProcedimientosTacFactura();
    } catch (error) {}
    try {
        tableProcedimientosAgregados.clear().draw();
    } catch (error) {}

    $("#laboratorioFactura").removeClass("parpadea");
    $("#rxfacutura").removeClass("parpadea");
    $("#ecoFactura").removeClass("parpadea");
    $("#tamoFactura").removeClass("parpadea");

    $("#BuscarPaciente").parent().fadeIn(0);

    $('.body').find('span#cedulaCliente').text("9999999999");
    $('.body').find('strong#nombreCompletoCliente').text("CONSUMIDOR FINAL");
    $('.body').find('strong#nombreCompletoCliente').attr('idCliente', '1');
    $('.body').find('span#direccionCliente').text("----------------");
    $('.body').find('span#telefonoCliente').text("----------------");
    $('.body').find('span#emailCliente').text("-----------------");
    $('.body').find('span#cedula').text("-------------");
    $('.body').find('span#edad').text("-------------");
    $('.body').find('strong#nombreCompleto').text("----------");
    $('.body').find('strong#nombreCompleto').attr('idCliente', '');
    $('.body').find('span#direccion').text("----------------");
    $('.body').find('span#telefono').text("----------------");
    $('.body').find('span#email').text("-----------------");
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
    $('strong#SecuenciaFacturaConsulta').html('FACTURA #: ' + $('strong#SecuenciaFacturaConsulta').attr('secuencia'));

    $('.cbmMedicoReferente').fadeOut(0);

    $("#datatableEspecialidadConsulta").fadeIn(0);
    $("#datatableProcedimientoConsulta").fadeIn(0);

    $("#datatableGrupoExamenConsulta").fadeIn(0);
    $("#datatableProcedimientoLaboratorioConsulta").fadeIn(0);

    $("#datatableGrupoRxConsulta").fadeIn(0);
    $("#datatableProcedimientoRxConsulta").fadeIn(0);

    $("#datatableGrupoEcoConsulta").fadeIn(0);
    $("#datatableProcedimientoEcoConsulta").fadeIn(0);

    $("#datatableGrupoTacConsulta").fadeIn(0);
    $("#datatableProcedimientoTacConsulta").fadeIn(0);

    OrdenLab = false;
    OrdenRx = false;
    OrdenEco = false;
    OrdenTac = false;
    ClicTablaDetalle = false;
    idConsultaAnterior = 0;
    idOrden = 0;

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
    medicoModificar = "";
    $('i.cheque').parent().fadeIn(200);
    $('i.tarjeta').parent().fadeIn(200);
    $('i.credito').parent().fadeIn(200);
    $('i.transfenrencia').parent().fadeIn(200);
    $('div.efectivo').fadeIn(200);
    $('button#CobrarConsulta').fadeIn(0);
    $('button#ReimprimirConsulta').fadeOut(0);
    $('button#ModificarFact').fadeOut(0);
    try {
        //tabla.column(2).search('').draw();
        //tabla.column(3).search('').draw();
        //tabla.column(4).search('').draw();
        //tabla.column(1).search('').draw();
    } catch (error) { console.log(error); }
    $("#CargarTodosGrupoProcedimientos").click();
    $('input.checkGrupoProceFact').prop('checked', false);
    $('input.checkProceFact').prop('checked', false);
    $('input.checkProceRxFact').prop('checked', false);
    $('input.checkProceEcoFact').prop('checked', false);
    $('input.checkProceTacFact').prop('checked', false);

    $('button#CobrarConsulta').attr("disabled", false);
    $('button#AnularConsulta').attr("disabled", true);

    $('button#CobrarConsultaCobrar').prop('disabled', true);
    $('button#CobrarConsulta').prop('disabled', true);

    $("#cbmMedicoReferente").val("");
    $('.selectpicker').selectpicker('refresh');
    $('.body').find('button#LimpiarDatosFact').click();
    try {
        tableProcedimientosAgregados.clear().draw();
    } catch (error) {}
    try {
        tablaTecnologosEco.clear().draw();
    } catch (error) {}
    try {
        tablaTecnologosTac.clear().draw();
    } catch (error) {}
    try {
        tablaTecnologos.clear().draw();
    } catch (error) {}
    try {
        tablaReservaciones.clear().draw();
    } catch (error) {}

    idReservacion = 0;
    $(".body div#DatosPaciente").css('visibility', 'hidden');
    $("a#SiCon").click();
    noModal = true;
    EnviarFacturasQuickCont();
}

function CrearXML(idConsulta, numero, hc, edad, productos, productos_lab, productos_rx, productos_eco, productos_tac) {

    $.ajax({
        method: "POST",
        url: "Ajax/Aj_Xml.php",
        data: {
            Requerimiento: "CrearXML",
            Consulta: idConsulta,
            Numero: numero,
            TipoIde: $("#cbmTipoIde").val(),
            Cliente: $('strong#nombreCompletoCliente').html(),
            Cedula: $('span#cedulaCliente').html(),
            DireccionC: $('span#direccionCliente').html(),
            TelefonoC: $('span#telefonoCliente').html(),
            Correo: $('span#emailCliente').html(),
            HC: hc,
            Edad: edad,
            Observacion: " ",
            DesctoTotal: $('span#totalDescuentoConsulta').html().replace("TOTAL DESCUENTO : $ ", ""),
            Item: $('span#totalItemsConsulta').html().replace("TOTAL DE ITEMS : ", ""),
            Subtotal: $('span#totalCancelarConsulta').html().replace("TOTAL A CANCELAR : $ ", ""),
            Productos: productos,
            ProductosLab: productos_lab,
            ProductosRx: productos_rx,
            ProductosEco: productos_eco,
            ProductosTac: productos_tac,
            Paciente: $('strong#nombreCompleto').html(),
            Recibido: $('input#ValorRecibidoConsulta').val(),
            Cambio: $('span#CambioConsulta').html().replace("$ ", "")

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

function ValidarSiPuedeFacturar() {
    if ($('input#puntoVenta').val() == 1) {
        $('button#CobrarConsultaCobrar').remove();
        $('button#CobrarConsulta').remove();
    }
}
ValidarSiPuedeFacturar();
$(".body").on('click', "div#limpiarFact", function(evt) {

    swal({
        title: "Esculapio",
        text: "Seguro que desa Limpiar..?",
        icon: "info",
        buttons: true,
        dangerMode: false,
    }).then((confirma) => {
        if (confirma) {
            LimpiarConsulta();
        } else {

        }
    });


});
$('.body table#datatableDetalleFact tbody').on('dblclick', 'tr', function(evt) {
    ClicTablaDetalle = true;
    if (nc != 2) {
        $('.body').find("button#ModificarFact").prop('disabled', true);
    }
    var atendido = $(this).find("td").eq(8).find("button").attr("atendido");

    if (atendido == 19 || atendido == 6 || atendido == 8 || atendido == 10 || atendido == 12 ||
        atendido == 13 || atendido == 14 || atendido == 15) {
        swal("Esculapio!", "No se puede cambiar la fecha de este item. (PACIENTE YA FUE ATENDIDO)", "warning");
        return;
    }
    var d1 = new Date($("#FechaActualEsculapio").val());
    d1.setHours(0)
    d1.setDate(d1.getDate() + 1)
    var d2 = new Date($(this).find('td').eq(3).html());

    if (d2 >= d1 && nc != 2) {
        $('.body').find("button#ModificarFact").prop('disabled', false);
        if (cambios >= 1) {
            swal("Esculapio!", "No se puede cambiar la fecha de este item. (Ya realizo " + cambios + " cambio)", "warning");
            $('.body').find("button#ModificarFact").prop('disabled', false);
            return;
        }
    }


    filaClikeada = $(this);

    idProcedimientoConsultaMedicas = $(this).find("td").eq(0).find("span").attr("procedimiento");
    idEspecialidad = $(this).find("td").eq(0).find("span").attr("especialidad");
    idEspecialidadCargada = idEspecialidad;

    idProcedimientoConsulta = $(this).find("td").eq(0).find("span").attr("laboratorio");
    idProcedimientoRx = $(this).find("td").eq(0).find("span").attr("procedimientorx");
    idProcedimientoEco = $(this).find("td").eq(0).find("span").attr("procedimientoeco");
    idProcedimientoTac = $(this).find("td").eq(0).find("span").attr("procedimientotac");
    iditemmodificar = $(this).find("td").eq(8).find("button").attr("idconsultaitem");
    medicoModificar = $(this).find("td").eq(2).find("span").html();
    tableGrupoProcedimiento.column(3).search('').draw();
    tablaProcedimientosEco.column(3).search("").draw();
    tablaProcedimientosRx.column(3).search("").draw();
    tablaProcedimientosTac.column(3).search("").draw();
    tableProcedimientosAgregados.clear().draw();
    if (idEspecialidad > 0) {
        if ($(this).find("td").eq(0).find("img").attr("src") == "imagenes/doctor.png") {
            CararEspecialidades(1);
        }
        if ($(this).find("td").eq(0).find("img").attr("src") == "imagenes/diente.png") {
            CararEspecialidades(13);
        }
        if ($(this).find("td").eq(0).find("img").attr("src") == "imagenes/heart.png") {
            CararEspecialidades(14);
        }
        idEspecialidad = $(this).find("td").eq(0).find("span").attr("especialidad");
        $('#modal-consultas').modal();

    }
    if ($(this).find("td").eq(0).find("img").attr("src") == "imagenes/laboratorio.png") {

        $('input.checkGrupoProceFact').prop('checked', false);
        $('input[idgrupoprocedimiento=' + idProcedimientoConsulta + ']').click();
        //tableDetalle.row($(this)).remove().draw(false);
        $('#modal-laboratorio').modal();
    }
    if ($(this).find("td").eq(0).find("img").attr("src") == "imagenes/rdx.png") {

        $('input.checkProceRxFact').prop('checked', false);
        $('input[idProcedimientoRx=' + idProcedimientoRx + ']').click();
        //tableDetalle.row($(this)).remove().draw(false);
        $('#modal-rx').modal();
    }
    if ($(this).find("td").eq(0).find("img").attr("src") == "imagenes/ecoo.png") {
        tablaProcedimientosEco.column(3).search("").draw();
        $('input.checkProceEcoFact').prop('checked', false);
        $('input[idProcedimientoEco=' + idProcedimientoEco + ']').click();
        //tableDetalle.row($(this)).remove().draw(false);
        $('#modal-eco').modal();
    }
    if ($(this).find("td").eq(0).find("img").attr("src") == "imagenes/tomo.png") {

        $('input.checkProceTacFact').prop('checked', false);
        $('input[idProcedimientoTac=' + idProcedimientoTac + ']').click();
        //tableDetalle.row($(this)).remove().draw(false);
        $('#modal-tac').modal();
    }



});

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
        if (respuesta[0].RespuestaRecepcionComprobante.estado == 'RECIBIDA') {
            $.ajax({
                method: "POST",
                url: "Ajax/Aj_Sri.php",
                data: {
                    Clave: xml1.clave,
                    Consulta: idConsulta,
                    Requerimiento: "autorizacionComprobante"
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
$(".body").on('click', "button#ReimprimirConsulta", function(ev) {
    var edad = calcularEdad($('strong#nombreCompleto').attr("fecha"));
    var numero = NumeroConsultaCargada;
    var paciente = $('strong#nombreCompleto').attr('idPaciente');

    var vector = $('.body').find("#datatableDetalleFact tbody tr");
    var productos = [];
    var productos_lab = [];
    var productos_rx = [];
    var productos_eco = [];
    var productos_tac = [];
    var ac = 0;
    var b = 0;
    var c = 0;
    var d = 0;
    var e = 0;
    $.each(vector, function(a) {

        var item = $(this).find('td').eq(1).find('span').html();
        var especialidad = $(this).find('td').eq(1).find('span').attr('especialidad');
        var procedimiento = $(this).find('td').eq(0).find('span').attr('procedimiento');
        var laboratorio = $(this).find('td').eq(0).find('span').attr('laboratorio');
        var procedimientorx = $(this).find('td').eq(0).find('span').attr('procedimientorx');
        var procedimientoeco = $(this).find('td').eq(0).find('span').attr('procedimientoeco');
        var procedimientotac = $(this).find('td').eq(0).find('span').attr('procedimientotac');
        var empleado = $(this).find('td').eq(2).find('span').attr('id');
        var medico = $(this).find('td').eq(2).find('span').html();
        var fecha = $(this).find('td').eq(3).html();
        var precio = $(this).find('td').eq(5).html();
        var descuento = $(this).find('td').eq(6).find('input').val();
        var subtotal = $(this).find('td').eq(7).html().replace('$', '');
        var turno = $(this).find('td').eq(4).html();
        if (descuento === undefined) {
            descuento = $(this).find('td').eq(6).html();
        }
        //var lineaDetalle = item+"\n"+turno+"\n"+fecha+"---"+precio+"---"+descuento+"---"+subtotal;
        if (procedimiento != undefined) {
            var lineaDetalle = [item, turno, fecha, precio, descuento, subtotal, especialidad, medico, procedimiento];
            productos[ac] = lineaDetalle;
            ac++;
        }
        if (laboratorio != undefined) {
            var itemLab = $(this).find('td').eq(1).html();
            var lineaDetalleLab = [itemLab, fecha, precio, descuento, subtotal, laboratorio];
            productos_lab[b] = lineaDetalleLab;
            b++;
        }
        if (procedimientorx != undefined) {
            var itemRx = $(this).find('td').eq(1).html();
            var lineaDetalleRx = [itemRx, fecha, precio, descuento, subtotal, procedimientorx];
            productos_rx[c] = lineaDetalleRx;
            c++;
        }
        if (procedimientoeco != undefined) {
            var itemEco = $(this).find('td').eq(1).html();
            var lineaDetalleEco = [itemEco, fecha, precio, descuento, subtotal, procedimientoeco];
            productos_eco[d] = lineaDetalleEco;
            d++;
        }
        if (procedimientotac != undefined) {
            var itemTac = $(this).find('td').eq(1).html();
            var lineaDetalleTac = [itemTac, fecha, precio, descuento, subtotal, procedimientotac];
            productos_tac[e] = lineaDetalleTac;
            e++;
        }
    });
    printTextAreaMovimiento(numero, productos, productos_lab, productos_rx, productos_eco, productos_tac, "reimpre");
    LimpiarConsulta();
    //ReImprimirTicKetConsulta(ConsultaCargada, numero, paciente, edad,emisionCargada,autorizacionCargada,JSON.stringify(productos),JSON.stringify(productos_lab),JSON.stringify(productos_rx),JSON.stringify(productos_eco),JSON.stringify(productos_tac));
});


function ReImprimirTicKetConsulta(idConsulta, numero, hc, edad, emision, autorizacion, productos, productos_lab, productos_rx, productos_eco, productos_tac) {

    $.ajax({
        method: "POST",
        url: "Controladores/Con_Impresion.php",
        data: {
            Requerimiento: "ReImprimirConsulta",
            Consulta: idConsulta,
            Numero: NumeroConsultaCargada,
            Cliente: $('strong#nombreCompletoCliente').html(),
            Cedula: $('span#cedulaCliente').html(),
            DireccionC: $('span#direccionCliente').html(),
            TelefonoC: $('span#telefonoCliente').html(),
            Correo: $('span#emailCliente').html(),
            HC: hc,
            Edad: edad,
            Emision: emision,
            Autorizacion: autorizacion,
            Observacion: " ",
            DesctoTotal: $('span#totalDescuentoConsulta').html().replace("TOTAL DESCUENTO : $ ", ""),
            Item: $('span#totalItemsConsulta').html().replace("TOTAL DE ITEMS : ", ""),
            Subtotal: $('span#totalCancelarConsulta').html().replace("TOTAL A CANCELAR : $ ", ""),
            Productos: productos,
            ProductosLab: productos_lab,
            ProductosRx: productos_rx,
            ProductosEco: productos_eco,
            ProductosTac: productos_tac,
            Paciente: $('strong#nombreCompleto').html(),
            Recibido: $('input#ValorRecibidoConsulta').val(),
            Cambio: $('span#CambioConsulta').html().replace("$ ", "")

        },
        dataType: 'JSON',
    }).done(function(respuesta) {
        LimpiarConsulta();
    }).fail(function(jqXHR, textStatus, errorThrown) {
        LimpiarConsulta();
        console.log(errorThrown);
    });
}
$(".body").on('click', "button#ModificarFact", function(ev) {

    swal({
        title: "Esculapio",
        text: "Seguro que desa Modificar La Factura..?",
        icon: "info",
        buttons: true,
        dangerMode: false,
    }).then((confirma) => {
        if (confirma) {
            ModificarFacturaConsulta(ConsultaCargada);
        } else {

        }
    });

});


function ModificarFacturaConsulta(idConsulta) {

    var paciente = $('strong#nombreCompleto').attr('idPaciente');
    var cliente = $('strong#nombreCompletoCliente').attr('idCliente');

    var total = $('span#totalCancelarConsulta').html().replace('TOTAL A CANCELAR : $', '');
    var descuento = $('span#totalDescuentoConsulta').html().replace('TOTAL DESCUENTO : $', '');
    var referente = $("#cbmMedicoReferente").val();

    $.ajax({
        method: "POST",
        url: "Ajax/Aj_Consulta.php",
        data: {
            Requerimiento: "ModificarConsulta",
            Paciente: paciente,
            Cliente: cliente,
            Total: total,
            Descuento: descuento,
            Referente: referente,
            Consulta: idConsulta,
            EstadoSri: CargadaEstadoSri,
            Cambios: cambios
        },
        dataType: 'JSON',
    }).done(function(respuesta) {

        if (respuesta[0] == true) {
            var fila = JSON.parse(respuesta[1]);
            var edad = calcularEdad($('strong#nombreCompleto').attr("fecha"));
            ActualizarDetalleConsulta(idConsulta, fila[0][5], fila[0][4], fila[0][2], edad);
        }
        if (respuesta[0] == false) {
            swal("Esculapio!", "Error Al Guardar La Factura. ", "error");
            console.log(respuesta);
            return;
        }
    }).fail(function(jqXHR, textStatus, errorThrown) {
        console.log(errorThrown)
    });
}

function ActualizarDetalleConsulta(idConsulta, emision, numero, hc, edad) {
    var vector = $('.body').find("#datatableDetalleFact tbody tr");
    var productos = [];
    var productos_lab = [];
    var productos_rx = [];
    var productos_eco = [];
    var productos_tac = [];
    var ac = 0;
    var b = 0;
    var c = 0;
    var d = 0;
    var e = 0;
    $.each(vector, function(a) {
        var item = $(this).find('td').eq(1).find('span').html();
        var especialidad = $(this).find('td').eq(1).find('span').attr('especialidad');
        var procedimiento = $(this).find('td').eq(0).find('span').attr('procedimiento');
        var laboratorio = $(this).find('td').eq(0).find('span').attr('laboratorio');
        var procedimientorx = $(this).find('td').eq(0).find('span').attr('procedimientorx');
        var procedimientoeco = $(this).find('td').eq(0).find('span').attr('procedimientoeco');
        var procedimientotac = $(this).find('td').eq(0).find('span').attr('procedimientotac');
        var empleado = $(this).find('td').eq(2).find('span').attr('id');
        var medico = $(this).find('td').eq(2).find('span').html();
        //var fecha = $(this).find('td').eq(3).find('input').val();
        var fecha = $(this).find('td').eq(3).html();
        var precio = $(this).find('td').eq(5).html();
        var descuento = $(this).find('td').eq(6).find('input').val();
        if (descuento === undefined) {
            descuento = $(this).find('td').eq(6).html();
        }
        var subtotal = $(this).find('td').eq(7).html().replace('$', '');
        var turno = $(this).find('td').eq(4).html();
        var idconsultaitem = $(this).find('td').eq(8).find('button').attr('idconsultaitem');

        //var lineaDetalle = item+"\n"+turno+"\n"+fecha+"---"+precio+"---"+descuento+"---"+subtotal;
        if (procedimiento != undefined) {
            var lineaDetalle = [item, turno, fecha, precio, descuento, subtotal, especialidad, medico, procedimiento];
            productos[ac] = lineaDetalle;
            ac++;
        }
        if (laboratorio != undefined) {
            var itemLab = $(this).find('td').eq(1).html();
            var lineaDetalleLab = [itemLab, fecha, precio, descuento, subtotal, laboratorio];
            productos_lab[b] = lineaDetalleLab;
            b++;
        }
        if (procedimientorx != undefined) {
            var itemRx = $(this).find('td').eq(1).html();
            var lineaDetalleRx = [itemRx, fecha, precio, descuento, subtotal, procedimientorx];
            productos_rx[c] = lineaDetalleRx;
            c++;
        }
        if (procedimientoeco != undefined) {
            var itemEco = $(this).find('td').eq(1).html();
            var lineaDetalleEco = [itemEco, fecha, precio, descuento, subtotal, procedimientoeco];
            productos_eco[d] = lineaDetalleEco;
            d++;
        }
        if (procedimientotac != undefined) {
            var itemTac = $(this).find('td').eq(1).html();
            var lineaDetalleTac = [itemTac, fecha, precio, descuento, subtotal, procedimientotac];
            productos_tac[e] = lineaDetalleTac;
            e++;
        }

        //alert(item+"-"+procedimiento+"-"+laboratorio+"-"+empleado+"-"+fecha+"-"+precio+"-"+descuento+"-"+subtotal+"-"+turno);
        $.ajax({
            // async:false,
            method: "POST",
            url: "Ajax/Aj_Consulta.php",
            data: {
                Requerimiento: "ActualizarConsultaDetalle",
                Consulta: idConsulta,
                Procedimiento: procedimiento,
                Laboratorio: laboratorio,
                Rx: procedimientorx,
                Eco: procedimientoeco,
                Tac: procedimientotac,
                Empleado: empleado,
                Fecha: fecha,
                Precio: precio,
                Descuento: descuento,
                Subtotal: subtotal,
                Turno: turno,
                IdConsultaItem: idconsultaitem

            },
            dataType: 'JSON',
        }).done(function(respuesta) {
            if (respuesta[0] == false) {
                swal("Esculapio!", "No Se Pudo Actualizar el Item !" + item, "error");
            } else {
                EliminarSignosPorConsulta(idconsultaitem);
            }
        }).fail(function(jqXHR, textStatus, errorThrown) {
            console.log(errorThrown)
        });
    });
    //CrearXML(idConsulta, numero, hc, edad, JSON.stringify(productos), JSON.stringify(productos_lab), JSON.stringify(productos_rx), JSON.stringify(productos_eco), JSON.stringify(productos_tac));
    swal({
        title: "Esculapio",
        text: "Factura Guardada..!, Desea Imprimir?",
        icon: "info",
        buttons: true,
        dangerMode: false,
    }).then((confirma) => {
        if (confirma) {
            // ReImprimirTicKetConsulta(ConsultaCargada, numero, hc, edad,emisionCargada,autorizacionCargada,JSON.stringify(productos),JSON.stringify(productos_lab),JSON.stringify(productos_rx),JSON.stringify(productos_eco),JSON.stringify(productos_tac));
        } else {

        }
        LimpiarConsulta();
    });
}

function EliminarSignosPorConsulta(item) {

    $.ajax({
        method: "POST",
        url: "Ajax/Aj_Consulta.php",
        data: {
            Requerimiento: "EliminarSignosPorConsulta",
            Item: item
        },
        dataType: 'JSON',
    }).done(function(respuesta) {
        if (respuesta[0] == true) {

        }
        if (respuesta[0] == false) {
            swal("Esculapio!", "Ocurrio un error. ", "error");
            console.log(respuesta)
            return;
        }
    }).fail(function(jqXHR, textStatus, errorThrown) {
        console.log(errorThrown)
    });
}

function ImprimirTicKetConsulta(idConsulta, numero, hc, edad, productos, productos_lab, productos_rx, productos_eco, productos_tac) {

    $.ajax({
        async: false,
        method: "POST",
        url: "Controladores/Con_Impresion.php",
        data: {
            Requerimiento: "ImprimirConsulta",
            Consulta: idConsulta,
            Numero: numero,
            Cliente: $('strong#nombreCompletoCliente').html(),
            Cedula: $('span#cedulaCliente').html(),
            DireccionC: $('span#direccionCliente').html(),
            TelefonoC: $('span#telefonoCliente').html(),
            Correo: $('span#emailCliente').html(),
            HC: hc,
            Edad: edad,
            Observacion: " ",
            DesctoTotal: $('span#totalDescuentoConsulta').html().replace("TOTAL DESCUENTO : $ ", ""),
            Item: $('span#totalItemsConsulta').html().replace("TOTAL DE ITEMS : ", ""),
            Subtotal: $('span#totalCancelarConsulta').html().replace("TOTAL A CANCELAR : $ ", ""),
            Productos: productos,
            ProductosLab: productos_lab,
            ProductosRx: productos_rx,
            ProductosEco: productos_eco,
            ProductosTac: productos_tac,
            Paciente: $('strong#nombreCompleto').html(),
            Recibido: $('input#ValorRecibidoConsulta').val(),
            Cambio: $('span#CambioConsulta').html().replace("$ ", "")

        },
        dataType: 'JSON',
    }).done(function(respuesta) {
        LimpiarConsulta();
    }).fail(function(jqXHR, textStatus, errorThrown) {
        LimpiarConsulta();
        console.log(errorThrown);
    });
}

var productos = [];
var productos_lab = [];
var productos_rx = [];
var productos_eco = [];
var productos_tac = [];

function ObtenerDatos() {
    var vector = $('.body').find("#datatableDetalleFact tbody tr");
    var ac = 0;
    var b = 0;
    var c = 0;
    var d = 0;
    var e = 0;
    var i = 0;
    $.each(vector, function(a) {
        var item = $(this).find('td').eq(1).find('span').html();
        var especialidad = $(this).find('td').eq(1).find('span').attr('especialidad');
        var procedimiento = $(this).find('td').eq(0).find('span').attr('procedimiento');
        var laboratorio = $(this).find('td').eq(0).find('span').attr('laboratorio');
        var procedimientorx = $(this).find('td').eq(0).find('span').attr('procedimientorx');
        var procedimientoeco = $(this).find('td').eq(0).find('span').attr('procedimientoeco');
        var procedimientotac = $(this).find('td').eq(0).find('span').attr('procedimientotac');
        var empleado = $(this).find('td').eq(2).find('span').attr('id');
        var medico = $(this).find('td').eq(2).find('span').html();
        var fecha = $(this).find('td').eq(3).html();
        var precio = $(this).find('td').eq(5).html();
        var descuento = $(this).find('td').eq(6).find('input').val();
        if (descuento === undefined) {
            descuento = $(this).find('td').eq(6).html();
        }
        var subtotal = $(this).find('td').eq(7).html().replace('$', '');
        var turno = $(this).find('td').eq(4).html();
        if (procedimiento != undefined) {
            var lineaDetalle = [item, 0, fecha, precio, descuento, subtotal, especialidad, medico, procedimiento];
            productos[ac] = lineaDetalle;
            ac++;
            i++;
        }
        if (laboratorio != undefined) {
            var itemLab = $(this).find('td').eq(1).html();
            var lineaDetalleLab = [itemLab, fecha, precio, descuento, subtotal, laboratorio];
            productos_lab[b] = lineaDetalleLab;
            b++;
        }
        if (procedimientorx != undefined) {
            var itemRx = $(this).find('td').eq(1).html();
            var lineaDetalleRx = [itemRx, fecha, precio, descuento, subtotal, procedimientorx];
            productos_rx[c] = lineaDetalleRx;
            c++;
        }
        if (procedimientoeco != undefined) {
            var itemEco = $(this).find('td').eq(1).html();
            var lineaDetalleEco = [itemEco, fecha, precio, descuento, subtotal, procedimientoeco];
            productos_eco[d] = lineaDetalleEco;
            d++;
        }
        if (procedimientotac != undefined) {
            var itemTac = $(this).find('td').eq(1).html();
            var lineaDetalleTac = [itemTac, fecha, precio, descuento, subtotal, procedimientotac];
            productos_tac[e] = lineaDetalleTac;
            e++;
        }

    });
}

function diaSemana(dia, mes, anio) {
    var dias = ["DOMINGO", "LUNES", "MARTES", "MIERCOLES", "JUEVES", "VIERNES", "SABADO"];
    var dt = new Date(mes + ' ' + dia + ', ' + anio + ' 12:00:00');
    return dias[dt.getUTCDay()];
};

function printTextAreaMovimiento(numero, productos, productos_lab, productos_rx, productos_eco, productos_tac, impre) {
    var today = new Date();
    var date = today.getDate() + '/' + (today.getMonth() + 1) + '/' + today.getFullYear();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    var dateTime = date + ' ' + time;
    var cliente = $('strong#nombreCompletoCliente').html();
    var cedula = $('span#cedulaCliente').html();
    var direccionC = $('span#direccionCliente').html();
    var telefonoC = $('span#telefonoCliente').html();
    var correo = $('span#emailCliente').html();
    var desc = $('span#totalDescuentoConsulta').html().replace("TOTAL DESCUENTO : $ ", "");
    var recibido = $('input#ValorRecibidoConsulta').val();
    var cambio = $('span#CambioConsulta').html().replace("$ ", "");
    var total = $('span#totalCancelarConsulta').html().replace("TOTAL A CANCELAR : $ ", "");
    var subtotal = parseFloat(total) + parseFloat(desc);
    var vendedor = $('span#Vendedor').html().replace('USUARIO : ', '');
    var paciente = $('strong#nombreCompleto').html();
    var edad = calcularEdad($('strong#nombreCompleto').attr("fecha"));
    var estilo = "<style type='text/css'>body {font-family: monospace;}</style>";
    var cuerpo = "<html>" +
        "<head>" +
        estilo +
        "</head>" +
        "<body>" +
        "<div style='width:100%; margin-top: 0.8em;'><center><label style='font-weight:bold;'>" + $("#razonEmpresa").val() + "</label></center></div>" +
        "<br>" +
        "<div style='width:100%; '><label style='font-weight:normal; font-size: 11px;'>R.U.C " + $("#rucEmpresa").val() + "</div>" +
        "<div style='width:100%; '><label style='font-weight:normal; font-size: 11px;'>" + $("#dirEmpresa").val() + "</div>"

    +"<div style='width:100%; '><label style='font-weight:normal; font-size: 11x;'>Telf : " + $("#telEmpresa").val() + "</div>"

    +
    "<div style='margin-top: 20px'>"

    +
    "<div style='width:100%; '><label style='font-weight:normal; font-size: 9px;'>-----------------------------------------------------</label></div>" +
    "<div style='width:100%; '><label style='font-weight:normal; font-size: 11px;'>FACTURA    : " + numero + "</label></div>";

    if (impre == "impre") {
        cuerpo += "<div style='width:100%; '><label style='font-weight:normal; font-size: 11px;'>EMISION    : " + dateTime + "</label></div>";
    } else {
        dateTime = emisionCargada;
        cuerpo += "<div style='width:100%; '><label style='font-weight:normal; font-size: 11px;'>EMISION    : " + emisionCargada + "</label></div>";
    }

    cuerpo += "<div style='width:100%; '><label style='font-weight:normal; font-size: 11px;'>CLIENTE    : " + cliente + "</label></div>" +
        "<div style='width:100%; '><label style='font-weight:normal; font-size: 11px;'>CED-RUC    : " + cedula + "</label></div>" +
        "<div style='width:100%; '><label style='font-weight:normal; font-size: 11px;'>DIRECCION  : " + direccionC + "</label></div>" +
        "<div style='width:100%; '><label style='font-weight:normal; font-size: 11px;'>TELEFONO   : " + telefonoC + "</label></div>" +
        "<div style='width:100%; '><label style='font-weight:normal; font-size: 11px;'>CORREO     : " + correo + "</label></div>" +
        "<div style='width:100%; '><label style='font-weight:normal; font-size: 9px;'>-----------------------------------------------------</label></div>" +
        "<div style='width:100%; '><label style='font-weight:normal; font-size: 11px;'>Sub-Total</label><label style='font-weight:normal; font-size: 11px;float: right;'>" + subtotal + "</label></div>  " +
        "<div style='width:100%; '><label style='font-weight:normal; font-size: 11px;'>(-)Dcto</label><label style='font-weight:normal; font-size: 11px;float: right;'>" + desc + "</label></div>  " +
        "<div style='width:100%; '><label style='font-weight:normal; font-size: 11px;'>IVA 12%</label><label style='font-weight:normal; font-size: 11px;float: right;'>0.00</label></div>  " +
        "<div style='width:100%; '><label style='font-weight:normal; font-size: 11px;'>Total</label><label style='font-weight:normal; font-size: 11px;float: right;'>" + parseFloat(total).toFixed(2) + "</label></div>  " +
        "<div style='width:100%; '><label style='font-weight:normal; font-size: 11px;'>Forma De pago</label><label style='font-weight:normal; font-size: 11px;float: right;'>" + ObtenerFormaPago() + "</label></div>  " +
        "<div style='width:100%; '><label style='font-weight:normal; font-size: 11px;'>Cajero</label><label style='font-weight:normal; font-size: 11px;float: right;'>" + vendedor + "</label></div>  ";
    if (impre == "impre") {
        cuerpo += "<div style='width:100%; '><label style='font-weight:normal; font-size: 11px;'>T.Recibido</label><label style='font-weight:normal; font-size: 11px;float: right;'>" + parseFloat(recibido).toFixed(2) + "</label></div>  " +
            "<div style='width:100%; '><label style='font-weight:normal; font-size: 11px;'>T.Cambio</label><label style='font-weight:normal; font-size: 11px;float: right;'>" + cambio + "</label></div>  ";
    } else {
        cuerpo += "<div style='width:100%; '><label style='font-weight:normal; font-size: 11px;'>T.Recibido</label><label style='font-weight:normal; font-size: 11px;float: right;'>0.00</label></div>  " +
            "<div style='width:100%; '><label style='font-weight:normal; font-size: 11px;'>T.Cambio</label><label style='font-weight:normal; font-size: 11px;float: right;'>0.00</label></div>  ";
    }
    cuerpo += "<div style='width:100%; '><label style='font-weight:normal; font-size: 11px;'>Con este documento sera atendido y retire resultados</label></div>  "
    cuerpo += "<div style='width:100%; '><label style='font-weight:normal; font-size: 11px;'>CLAVE DE ACCESO : " + clavesri + "</label></div>  " +
        "<div style='width:100%; '><label style='font-weight:normal; font-size: 9px;'>-----------------------------------------------------</div>";

    if (productos.length > 0) {
        cuerpo += "<div style='width:100%; '><label style='font-weight:bold; font-size: 12px;'>" + paciente + "</label></div>" +
            "<div style='width:100%; '><label style='font-weight:normal; font-size: 11px;'>Edad : " + edad + "</label></div>" +
            "<div style='width:100%; '><label style='font-weight:normal; font-size: 11px;'>Factura : " + numero + "</label></div>" +
            "<div style='width:100%; '><label style='font-weight:normal; font-size: 11px;'>Emision : " + dateTime + "</label></div>" +
            "<div style='width:100%; '><label style='font-weight:normal; font-size: 11px;'>CONSULTA EXTERNA</label></div>";
        for (var i = 0; i < productos.length; i++) {
            cuerpo += "<div style='width:100%; '><label style='font-weight:normal; font-size: 11px;'>" + productos[i][0] + "</label><label style='font-weight:normal; font-size: 11px; float: right;'>" + productos[i][5] + "</label></div>";
            var dia = diaSemana(productos[i][2].substring(8, 10), productos[i][2].substring(5, 7), productos[i][2].substring(0, 4));
            cuerpo += "<div style='width:100%; '><label style='font-weight:bold; font-size: 12px;'>" + productos[i][6] + "</label><label style='font-weight:bold; font-size: 12px; float: right;'>TURNO: " + productos[i][1] + "</label></div>";
            cuerpo += "<div style='width:100%; '><label style='font-weight:normal; font-size: 11px;'>" + productos[i][7] + "</label></div>";
            cuerpo += "<div style='width:100%; '><label style='font-weight:bold; font-size: 12px;'>F. ATENCIÓN: " + dia + ", " + productos[i][2].substring(8, 10) + "/" + productos[i][2].substring(5, 7) + "/" + productos[i][2].substring(0, 4) + "</label></div>";
            cuerpo += "<div style='width:100%; '><label style='font-weight:normal; font-size: 9px;'>-----------------------------------------------------</label></div>";

        }
    }
    cuerpo += "<br>";
    if (productos_lab.length > 0) {
        cuerpo += "<div style='width:100%; '><label style='font-weight:bold; font-size: 12px;'>" + paciente + "</label></div>" +
            "<div style='width:100%; '><label style='font-weight:normal; font-size: 11px;'>Edad : " + edad + "</label></div>" +
            "<div style='width:100%; '><label style='font-weight:normal; font-size: 11px;'>Factura : " + numero + "</label></div>" +
            "<div style='width:100%; '><label style='font-weight:normal; font-size: 11px;'>Emision : " + dateTime + "</label></div>" +
            "<div style='width:100%; '><label style='font-weight:normal; font-size: 11px;'>LABORATORIO</label></div>" +
            "<div style='width:100%; '><label style='font-weight:normal; font-size: 9px;'>-----------------------------------------------------</label></div>" +
            "<div style='width:100%; '><label style='font-weight:normal; font-size: 9px;'>Item</label><label style='font-weight:normal; font-size: 9px;margin-left: 140px;'>Precio</label><label style='font-weight:normal; font-size: 9px;margin-left: 15px;'>Dcto(%)</label><label style='font-weight:normal; font-size: 9px;margin-left: 15px;'>Total</label></div>" +
            "<div style='width:100%; '><label style='font-weight:normal; font-size: 9px;'>-----------------------------------------------------</label></div>"
        for (var i = 0; i < productos_lab.length; i++) {
            var fechaLab = "";
            var nombre = productos_lab[i][0];
            if (nombre.length > 22) {
                nombre = nombre.substring(0, 22);
            }
            if (fechaLab != productos_lab[i][1]) {
                var dia = diaSemana(productos_lab[i][1].substring(8, 10), productos_lab[i][1].substring(5, 7), productos_lab[i][1].substring(0, 4));
                cuerpo += "<div style='width:100%; '><label style='font-weight:bold; font-size: 12px;'>F. ATENCIÓN: " + dia + ", " + productos_lab[i][1].substring(8, 10) + "/" + productos_lab[i][1].substring(5, 7) + "/" + productos_lab[i][1].substring(0, 4) + "</label></div>";
            }
            cuerpo += "<div style='width:100%; '><div style='width: 70%; display: inline-block;'><label style='font-weight:normal; font-size: 11px;'>» " + nombre + "</label></div><div style='width: 10%; display: inline-block; text-align: right;'><span style='font-weight:normal; font-size: 11px;'>" + productos_lab[i][2] + "</span></div><div style='width: 10%; display: inline-block; text-align: right;'><span style='font-weight:normal; font-size: 11px;'>" + productos_lab[i][3] + "</span></div><div style='width: 10%; display: inline-block; text-align: right;'><span style='font-weight:normal; font-size: 11px;'>" + productos_lab[i][4] + "</span></div></div>";

        }
    }
    cuerpo += "<br>";
    if (productos_rx.length > 0) {
        cuerpo += "<div style='width:100%; '><label style='font-weight:bold; font-size: 12px;'>" + paciente + "</label></div>" +
            "<div style='width:100%; '><label style='font-weight:normal; font-size: 11px;'>Edad : " + edad + "</label></div>" +
            "<div style='width:100%; '><label style='font-weight:normal; font-size: 11px;'>Factura : " + numero + "</label></div>" +
            "<div style='width:100%; '><label style='font-weight:normal; font-size: 11px;'>Emision : " + dateTime + "</label></div>" +
            "<div style='width:100%; '><label style='font-weight:normal; font-size: 11px;'>RAYOS X</label></div>" +
            "<div style='width:100%; '><label style='font-weight:normal; font-size: 9px;'>----------------------------------------------------------------------------------------</label></div>" +
            "<div style='width:100%; '><label style='font-weight:normal; font-size: 9px;'>Item</label><label style='font-weight:normal; font-size: 9px;margin-left: 140px;'>Precio</label><label style='font-weight:normal; font-size: 9px;margin-left: 15px;'>Dcto(%)</label><label style='font-weight:normal; font-size: 9px;margin-left: 15px;'>Total</label></div>" +
            "<div style='width:100%; '><label style='font-weight:normal; font-size: 9px;'>----------------------------------------------------------------------------------------</label></div>"
        for (var i = 0; i < productos_rx.length; i++) {
            var fechaLab = "";
            var nombre = productos_rx[i][0];
            if (nombre.length > 22) {
                nombre = nombre.substring(0, 22);
            }
            if (fechaLab != productos_rx[i][1]) {
                var dia = diaSemana(productos_rx[i][1].substring(8, 10), productos_rx[i][1].substring(5, 7), productos_rx[i][1].substring(0, 4));
                cuerpo += "<div style='width:100%; '><label style='font-weight:bold; font-size: 12px;'>F. ATENCIÓN: " + dia + ", " + productos_rx[i][1].substring(8, 10) + "/" + productos_rx[i][1].substring(5, 7) + "/" + productos_rx[i][1].substring(0, 4) + "</label></div>";
            }
            cuerpo += "<div style='width:100%; '><div style='width: 70%; display: inline-block;'><label style='font-weight:normal; font-size: 11px;'>» " + nombre + "</label></div><div style='width: 10%; display: inline-block; text-align: right;'><span style='font-weight:normal; font-size: 11px;'>" + productos_rx[i][2] + "</span></div><div style='width: 10%; display: inline-block; text-align: right;'><span style='font-weight:normal; font-size: 11px;'>" + productos_rx[i][3] + "</span></div><div style='width: 10%; display: inline-block; text-align: right;'><span style='font-weight:normal; font-size: 11px;'>" + productos_rx[i][4] + "</span></div></div>";

        }
    }
    cuerpo += "<br>";
    if (productos_eco.length > 0) {
        cuerpo += "<div style='width:100%; '><label style='font-weight:bold; font-size: 12px;'>" + paciente + "</label></div>" +
            "<div style='width:100%; '><label style='font-weight:normal; font-size: 11px;'>Edad : " + edad + "</label></div>" +
            "<div style='width:100%; '><label style='font-weight:normal; font-size: 11px;'>Factura : " + numero + "</label></div>" +
            "<div style='width:100%; '><label style='font-weight:normal; font-size: 11px;'>Emision : " + dateTime + "</label></div>" +
            "<div style='width:100%; '><label style='font-weight:normal; font-size: 11px;'>ECOGRAFIA</label></div>" +
            "<div style='width:100%; '><label style='font-weight:normal; font-size: 9px;'>----------------------------------------------------------------------------------------</label></div>" +
            "<div style='width:100%; '><label style='font-weight:normal; font-size: 9px;'>Item</label><label style='font-weight:normal; font-size: 9px;margin-left: 140px;'>Precio</label><label style='font-weight:normal; font-size: 9px;margin-left: 15px;'>Dcto(%)</label><label style='font-weight:normal; font-size: 9px;margin-left: 15px;'>Total</label></div>" +
            "<div style='width:100%; '><label style='font-weight:normal; font-size: 9px;'>----------------------------------------------------------------------------------------</label></div>"
        for (var i = 0; i < productos_eco.length; i++) {
            var fechaLab = "";
            var nombre = productos_eco[i][0];
            if (nombre.length > 22) {
                nombre = nombre.substring(0, 22);
            }
            if (fechaLab != productos_eco[i][1]) {
                var dia = diaSemana(productos_eco[i][1].substring(8, 10), productos_eco[i][1].substring(5, 7), productos_eco[i][1].substring(0, 4));
                cuerpo += "<div style='width:100%; '><label style='font-weight:bold; font-size: 12px;'>F. ATENCIÓN: " + dia + ", " + productos_eco[i][1].substring(8, 10) + "/" + productos_eco[i][1].substring(5, 7) + "/" + productos_eco[i][1].substring(0, 4) + "</label></div>";
            }
            cuerpo += "<div style='width:100%; '><div style='width: 70%; display: inline-block;'><label style='font-weight:normal; font-size: 11px;'>» " + nombre + "</label></div><div style='width: 10%; display: inline-block; text-align: right;'><span style='font-weight:normal; font-size: 11px;'>" + productos_eco[i][2] + "</span></div><div style='width: 10%; display: inline-block;text-align: right;'><span style='font-weight:normal; font-size: 11px;'>" + productos_eco[i][3] + "</span></div><div style='width: 10%; display: inline-block; text-align: right;'><span style='font-weight:normal; font-size: 11px;'>" + productos_eco[i][4] + "</span></div></div>";

        }
    }
    cuerpo += "<br>";
    if (productos_tac.length > 0) {
        cuerpo += "<div style='width:100%; '><label style='font-weight:bold; font-size: 12px;'>" + paciente + "</label></div>" +
            "<div style='width:100%; '><label style='font-weight:normal; font-size: 11px;'>Edad : " + edad + "</label></div>" +
            "<div style='width:100%; '><label style='font-weight:normal; font-size: 11px;'>Factura : " + numero + "</label></div>" +
            "<div style='width:100%; '><label style='font-weight:normal; font-size: 11px;'>Emision : " + dateTime + "</label></div>" +
            "<div style='width:100%; '><label style='font-weight:normal; font-size: 11px;'>TAC/RM</label></div>" +
            "<div style='width:100%; '><label style='font-weight:normal; font-size: 9px;'>----------------------------------------------------------------------------------------</label></div>" +
            "<div style='width:100%; '><label style='font-weight:normal; font-size: 9px;'>Item</label><label style='font-weight:normal; font-size: 9px;margin-left: 140px;'>Precio</label><label style='font-weight:normal; font-size: 9px;margin-left: 15px;'>Dcto(%)</label><label style='font-weight:normal; font-size: 9px;margin-left: 15px;'>Total</label></div>" +
            "<div style='width:100%; '><label style='font-weight:normal; font-size: 9px;'>----------------------------------------------------------------------------------------</label></div>"
        for (var i = 0; i < productos_tac.length; i++) {
            var fechaLab = "";
            var nombre = productos_tac[i][0];
            if (nombre.length > 22) {
                nombre = nombre.substring(0, 22);
            }
            if (fechaLab != productos_tac[i][1]) {
                var dia = diaSemana(productos_tac[i][1].substring(8, 10), productos_tac[i][1].substring(5, 7), productos_tac[i][1].substring(0, 4));
                cuerpo += "<div style='width:100%; '><label style='font-weight:bold; font-size: 12px;'>F. ATENCIÓN: " + dia + ", " + productos_tac[i][1].substring(8, 10) + "/" + productos_tac[i][1].substring(5, 7) + "/" + productos_tac[i][1].substring(0, 4) + "</label></div>";
            }
            cuerpo += "<div style='width:100%; '><div style='width: 70%; display: inline-block;'><label style='font-weight:normal; font-size: 11px;'>» " + nombre + "</label></div><div style='width: 10%; display: inline-block; text-align: right;'><span style='font-weight:normal; font-size: 11px;'>" + productos_tac[i][2] + "</span></div><div style='width: 10%; display: inline-block;text-align: right;'><span style='font-weight:normal; font-size: 11px;'>" + productos_tac[i][3] + "</span></div><div style='width: 10%; display: inline-block; text-align: right;'><span style='font-weight:normal; font-size: 11px;'>" + productos_tac[i][4] + "</span></div></div>";
        }
    }

    cuerpo += "<div style='width:100%;margin-top: 1px'><label style='font-weight:normal; font-size: 11px;'>SOFTWARE DESARROLLADO POR IPSE</label></div>";
    childWindow = window.open('_blank');
    childWindow.document.write(cuerpo);
    childWindow.document.write('<script type="text/javascript">setTimeout(function(){ window.print(); window.close();}, 500); </script>');
    childWindow.document.write('</body></html>');
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


function FormatearFecha(f) {
    var dia = f.substring(6, 8);
    var mes = f.substring(4, 6);
    var anio = f.substring(0, 4);

    if (mes == "01") {
        mes = "ENE";
    }
    if (mes == "02") {
        mes = "FEB";
    }
    if (mes == "03") {
        mes = "MAR";
    }
    if (mes == "04") {
        mes = "ABR";
    }
    if (mes == "05") {
        mes = "MAY";
    }
    if (mes == "06") {
        mes = "JUN";
    }
    if (mes == "07") {
        mes = "JUL";
    }
    if (mes == "08") {
        mes = "AGO";
    }
    if (mes == "09") {
        mes = "SEP";
    }
    if (mes == "10") {
        mes = "OCT";
    }
    if (mes == "11") {
        mes = "NOV";
    }
    if (mes == "12") {
        mes = "DIC";
    }
    return dia + "/" + mes + "/" + anio;
}

function RealizarTransaccionPinPad() {
    $.ajax({
        async: false,
        method: "POST",
        url: "Ajax/Aj_Consulta.php",
        data: {
            Requerimiento: "RealizarTransaccionPinPad",
            Total: parseFloat($("#ValorTarjeta").val()).toFixed(2)
        },
        dataType: 'JSON',
    }).done(function(respuesta) {
        if (respuesta[0]) {
            var data = respuesta[1];
            if (data.CodigoRespuesta == "00") {
                console.log(data)
                $("#NumeroTarjeta").val(data.NumeroTajeta.trim());
                $("#NumeroVoucher").val(data.Referencia);
                var opcion = '<option value="' + data.IdTarjeta + '">' + data.AplicacionEMV + '</option>';
                $("#EntidadTarjeta").append(opcion);
                $('.selectpicker').selectpicker('refresh');
                $("#EntidadTarjeta").val(data.IdTarjeta);
                $('.selectpicker').selectpicker('refresh');

                var lectura = "CHIP";
                if (data.ModoLectura.trim() == "03") {
                    lectura = "CHIP";
                }
                if (data.ModoLectura.trim() == "01") {
                    lectura = "MANUAL";
                }
                if (data.ModoLectura.trim() == "02") {
                    lectura = "BANDA";
                }
                if (data.ModoLectura.trim() == "04") {
                    lectura = "Fallback CHIP ";
                }
                if (data.ModoLectura.trim() == "5") {
                    lectura = "Fallback BANDA ";
                }

                var marca = data.Filler1.trim();
                var tarjeta = data.NumeroTajeta.trim();
                var lote = data.Lote.trim();
                var adquiriente = data.NombreAdquirente.trim();
                var fecha = FormatearFecha(data.Fecha.trim());
                var vence = data.FechaVencimiento.trim();
                vence = vence.substring(0, 2) + "/" + vence.substring(2, 4);
                var referencia = data.Referencia.trim();
                var hora = data.Hora.trim();
                hora = hora.substring(0, 2) + ":" + hora.substring(2, 4);
                var aprobacion = data.Autorizacion.trim();
                var base12 = "0.00";
                var base0 = parseFloat($("#ValorTarjeta").val()).toFixed(2);
                var subtotal = parseFloat($("#ValorTarjeta").val()).toFixed(2);
                var iva = "0.00";
                var total = parseFloat($("#ValorTarjeta").val()).toFixed(2);
                var cliente = data.TarjetaHabiente.trim();
                var tag50 = data.AplicacionEMV.trim();
                var AID = data.AID.trim();

                CrearVoucherPrint(lectura,
                    marca,
                    tarjeta,
                    lote,
                    adquiriente,
                    fecha,
                    vence,
                    referencia,
                    hora,
                    aprobacion,
                    base12,
                    base0,
                    subtotal,
                    iva,
                    total,
                    cliente,
                    tag50,
                    AID
                );

            } else {
                swal("Esculapio!", "Transaccion Rechazada. " + data.CodigoRespuesta + " " + data.MensajeRespuestaAut, "warning");
                console.log(respuesta)
            }
        } else {
            swal("Esculapio!", "Ocurrio un error al realizar el pago. ", "error");
            console.log(respuesta)

        }
    }).fail(function(jqXHR, textStatus, errorThrown) {
        console.log(errorThrown)
    });
}
if ($("#PINPAD").val() == "S") {
    $(".noPinPad").fadeOut(0);
}

function CrearVoucherPrint(lectura, marca, tarjeta, lote, adquiriente, fecha, vence, referencia, hora, aprobacion, base12, base0, subtotal, iva, total, cliente, tag50, AID) {
    var reporte = '<!DOCTYPE html>' +
        '<html>' +
        '<head>' +
        '<title></title>' +
        '</head>' +
        '<style type="text/css">' +
        'body{' +
        'width: 400px;' +
        'font-family: monospace;' +
        'margin-left: 20px;' +
        '}' +
        '.tablaCabecera{' +
        'text-align: center;' +
        '}' +
        '.mitadCapa{' +
        'width: 48%;' +
        'display: inline-block;' +
        '}' +
        '.tablaDerecha{' +
        'text-align: right;' +
        '}' +
        '.tablaIzquierda{' +
        'text-align: left;' +
        '}' +
        '.Capa75{' +
        'width: 73%;' +
        'display: inline-block;' +
        '}' +
        '.Capa25{' +
        'width: 20%;' +
        'display: inline-block;' +
        '}' +
        'p{' +
        'margin: 10px;' +
        'text-align: justify;' +
        '}' +
        '</style>' +
        '<body>  ' +
        '<div>' +
        '<table width="100%" class="tablaCabecera">' +
        '<thead>' +
        '<tr>' +
        '<th>' + $("#nombreComercio").val() + '</th>' +
        '</tr>' +
        '<tr>' +
        '<th>R U C : ' + $("#rucEmpresa").val() + '</th>' +
        '</tr>' +
        '</thead>' +
        '<tbody>' +
        '<tr>' +
        '<td>' + $("#direccionComercio").val() + '</td>' +
        '</tr>' +
        '<tr>' +
        '<td>Telefono ' + $("#telefonoComercio").val() + '</td>' +
        '</tr>' +
        '<tr>' +
        '<td>' + $("#localidadComercio").val() + '</td>' +
        '</tr>' +
        '<tr>' +
        '<td>1000000101 - 10100402 - 4.0.01 - ' + lectura + '</td>' +
        '</tr>' +
        '<tr>' +
        '<td>' + marca + '</td>' +
        '</tr>' +
        '</tbody>' +
        '</table>' +
        '</div>' +
        '<div class="mitadCapa">' +
        '<table width="100%" class="tablaIzquierda">' +
        '<tbody>' +
        '<tr>' +
        '<td>TARJETA: ' + tarjeta + '</td>' +
        '</tr>' +
        '<tr>' +
        '<td>LOTE#: ' + lote + '</td>' +
        '</tr>' +
        '<tr>' +
        '<td>ADQUIRENTE:</td>' +
        '</tr>' +
        '<tr>' +
        '<td>FECHA:' + fecha + '</td>' +
        '</tr>' +
        '</tbody>' +
        '</table>' +
        '</div>' +
        '<div class="mitadCapa">' +
        '<table width="100%" class="tablaDerecha">' +
        '<tbody>' +
        '<tr>' +
        '<td>V:' + vence + '</td>' +
        '</tr>' +
        '<tr>' +
        '<td>REF: ' + referencia + '</td>' +
        '</tr>' +
        '<tr>' +
        '<td>' + adquiriente + '</td>' +
        '</tr>' +
        '<tr>' +
        '<td>HORA: ' + hora + '</td>' +
        '</tr>' +
        '</tbody>' +
        '</table>' +
        '</div>' +
        '<div>' +
        '<table width="100%" class="tablaCabecera">' +
        '<tbody>' +
        '<tr>' +
        '<td>APROBACION# &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' + aprobacion + '</td>' +
        '</tr>' +
        '</tbody>' +
        '</table>' +
        '</div>' +
        '<div class="Capa75">' +
        '<table width="100%" class="tablaIzquierda">' +
        '<tbody>' +
        '<tr>' +
        '<td>BASE CONSUMO TARIFA 12  :US$</td>' +
        '</tr>' +
        '<tr>' +
        '<td>BASE CONSUMO TARIFA 0   :US$</td>' +
        '</tr>' +
        '<tr>' +
        '<td>SUBTOTAL CONSUMOS       :US$</td>' +
        '</tr>' +
        '<tr>' +
        '<td>IVA       :US$</td>' +
        '</tr>' +
        '<tr>' +
        '<td>VR. TOTAL :US$</td>' +
        '</tr>' +
        '</tbody>' +
        '</table>' +
        '</div>' +
        '<div class="Capa25">' +
        '<table width="100%" class="tablaDerecha">' +
        '<tbody>' +
        '<tr>' +
        '<td>$</td>' +
        '<td>' + base12 + '</td>' +
        '</tr>' +
        '<tr>' +
        '<td>$</td>' +
        '<td>' + base0 + '</td>' +
        '</tr>' +
        '<tr>' +
        '<td>$</td>' +
        '<td>' + subtotal + '</td>' +
        '</tr>' +
        '<tr>' +
        '<td>$</td>' +
        '<td>' + iva + '</td>' +
        '</tr>' +
        '<tr>' +
        '<td style="font-weight: bold;">$</td>' +
        '<td>' + total + '</td>' +
        '</tr>' +
        '</tbody>' +
        '</table>' +
        '</div>' +
        '<div>' +
        '<table width="100%" class="tablaCabecera">' +
        '<tbody>' +
        '<tr>' +
        '<td>CAP  ELEC   DATAFAST</td>' +
        '</tr>' +
        '</tbody>' +
        '</table>' +
        '</div>' +
        '<br>' +
        '<div>' +
        '<p>DEBO Y PAGARE AL  EMISOR  INCONDICIONALMENTE ' +
        'Y   SIN    PROTESTO  EL   TOTAL   DE  ESTE    PAGARE MAS LOS   INTERESES    Y  CARGOS POR   SERVICIO,  EN  CASO DE  MORA  PAGARE LA  TASA  MAXIMA AUTORIZADA PARA EL EMISOR.' +
        'DECLARO QUE EL PRODUCTO  DE  LA TRANSACCION' +
        'NO  SERA  UTILIZADO  EN  ACTIVIDADES  DE  LAVADO  DE ACTIVOS,  FINANCIAMIENTO  DEL  TERRORISMO Y OTROS DELITOS.     </p>' +
        '</div>' +
        '<br>' +
        '<div>' +
        '<label>NOMBRE :' + cliente + '</label><br>' +
        '<label>x__________________________________________</label>' +
        '</div>' +
        '<div>' +
        '<p>EL   ESTABLECIMIENTO   VERIFICA  QUE  LA   FIRMA DEL CLIENTE ES AUTENTICA</p>' +
        '<label>C.I.:  _______________________________________</label><br>' +
        '<label>TELEFONO: _________________________________</label>' +
        '</div>' +
        '<br>' +
        '<div>' +
        '<label>' + tag50 + '</label><br>' +
        '<label>' + AID + '</label>' +
        '</div>' +
        '<div>' +
        '<table width="100%" class="tablaCabecera">' +
        '<tbody>' +
        '<tr>' +
        '<td>ORIGINAL</td>' +
        '</tr>' +
        '</tbody>' +
        '</table>' +
        '</div>' +
        '<script type="text/javascript">var tid = setInterval(function(){ window.print();clearInterval(tid);window.close();}, 500);</script>' +
        '</body>' +
        '</html>';


    childWindow = window.open('', '_blank');
    childWindow.document.open();
    childWindow.document.write(reporte);


    reporte = '<!DOCTYPE html>' +
        '<html>' +
        '<head>' +
        '<title></title>' +
        '</head>' +
        '<style type="text/css">' +
        'body{' +
        'width: 400px;' +
        'font-family: monospace;' +
        'margin-left: 20px;' +
        '}' +
        '.tablaCabecera{' +
        'text-align: center;' +
        '}' +
        '.mitadCapa{' +
        'width: 48%;' +
        'display: inline-block;' +
        '}' +
        '.tablaDerecha{' +
        'text-align: right;' +
        '}' +
        '.tablaIzquierda{' +
        'text-align: left;' +
        '}' +
        '.Capa75{' +
        'width: 73%;' +
        'display: inline-block;' +
        '}' +
        '.Capa25{' +
        'width: 20%;' +
        'display: inline-block;' +
        '}' +
        'p{' +
        'margin: 10px;' +
        'text-align: justify;' +
        '}' +
        '</style>' +
        '<body>  ' +
        '<div>' +
        '<table width="100%" class="tablaCabecera">' +
        '<thead>' +
        '<tr>' +
        '<th>' + $("#nombreComercio").val() + '</th>' +
        '</tr>' +
        '<tr>' +
        '<th>R U C : ' + $("#rucEmpresa").val() + '</th>' +
        '</tr>' +
        '</thead>' +
        '<tbody>' +
        '<tr>' +
        '<td>' + $("#direccionComercio").val() + '</td>' +
        '</tr>' +
        '<tr>' +
        '<td>Telefono ' + $("#telefonoComercio").val() + '</td>' +
        '</tr>' +
        '<tr>' +
        '<td>' + $("#localidadComercio").val() + '</td>' +
        '</tr>' +
        '<tr>' +
        '<td>' + marca + '</td>' +
        '</tr>' +
        '</tbody>' +
        '</table>' +
        '</div>' +
        '<div class="mitadCapa">' +
        '<table width="100%" class="tablaIzquierda">' +
        '<tbody>' +
        '<tr>' +
        '<td>TARJETA: ' + tarjeta + '</td>' +
        '</tr>' +
        '<tr>' +
        '<td>LOTE#: ' + lote + '</td>' +
        '</tr>' +
        '<tr>' +
        '<td>FECHA:' + fecha + '</td>' +
        '</tr>' +
        '</tbody>' +
        '</table>' +
        '</div>' +
        '<div class="mitadCapa">' +
        '<table width="100%" class="tablaDerecha">' +
        '<tbody>' +
        '<tr>' +
        '<td></td>' +
        '</tr>' +
        '<tr>' +
        '<td>REF: ' + referencia + '</td>' +
        '</tr>' +
        '<tr>' +
        '<td>HORA: ' + hora + '</td>' +
        '</tr>' +
        '</tbody>' +
        '</table>' +
        '</div>' +
        '<div>' +
        '<table width="100%" class="tablaCabecera">' +
        '<tbody>' +
        '<tr>' +
        '<td>DATAFAST</td>' +
        '</tr>' +
        '</tbody>' +
        '</table>' +
        '</div>' +
        '<div class="Capa75">' +
        '<table width="100%" class="tablaIzquierda">' +
        '<tbody>' +
        '<tr>' +
        '<td>BASE CONSUMO TARIFA 12  :US$</td>' +
        '</tr>' +
        '<tr>' +
        '<td>BASE CONSUMO TARIFA 0   :US$</td>' +
        '</tr>' +
        '<tr>' +
        '<td>SUBTOTAL CONSUMOS       :US$</td>' +
        '</tr>' +
        '<tr>' +
        '<td>IVA       :US$</td>' +
        '</tr>' +
        '<tr>' +
        '<td>VR. TOTAL :US$</td>' +
        '</tr>' +
        '</tbody>' +
        '</table>' +
        '</div>' +
        '<div class="Capa25">' +
        '<table width="100%" class="tablaDerecha">' +
        '<tbody>' +
        '<tr>' +
        '<td>$</td>' +
        '<td>' + base12 + '</td>' +
        '</tr>' +
        '<tr>' +
        '<td>$</td>' +
        '<td>' + base0 + '</td>' +
        '</tr>' +
        '<tr>' +
        '<td>$</td>' +
        '<td>' + subtotal + '</td>' +
        '</tr>' +
        '<tr>' +
        '<td>$</td>' +
        '<td>' + iva + '</td>' +
        '</tr>' +
        '<tr>' +
        '<td style="font-weight: bold;">$</td>' +
        '<td>' + total + '</td>' +
        '</tr>' +
        '</tbody>' +
        '</table>' +
        '</div>' +
        '<div>' +
        '<br>' +
        '<label>NOMBRE :' + cliente + '</label><br>' +
        '</div>'

    +
    '<br>' +
    '<div>' +
    '<table width="100%" class="tablaCabecera">' +
    '<tbody>' +
    '<tr>' +
    '<td>CLIENTE</td>' +
    '</tr>' +
    '</tbody>' +
    '</table>' +
    '</div>' +
    '<script type="text/javascript">var tid = setInterval(function(){ window.print();clearInterval(tid);window.close();}, 500);</script>' +
    '</body>' +
    '</html>';


    childWindow = window.open('', '_blank');
    childWindow.document.open();
    childWindow.document.write(reporte);
}

function EnviarFacturasQuickCont() {
    $.ajax({
        method: "POST",
        url: "Ajax/Aj_Consulta.php",
        data: {
            Requerimiento: "EnviarFacturasQuickCont",
        },
        dataType: 'JSON',
    });
}
EnviarFacturasQuickCont();