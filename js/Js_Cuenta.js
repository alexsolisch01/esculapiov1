var tableResul = $('#datatableCuentasCobrar').DataTable({
    'paging': false,
    'lengthChange': false,
    'searching': true,
    'ordering': false,
    'info': false,
    scrollY: 230,
    'autoWidth': false,
    keys: true,
    "columnDefs": [{
        "targets": [6],
        "visible": false,
        "searchable": false
    }]
});

var tableResul2 = $('#datatableCuentasCobrarDetalle').DataTable({
    'paging': false,
    'lengthChange': false,
    'searching': false,
    'ordering': false,
    'info': false,
    scrollY: 250,
    'autoWidth': false,
    keys: false,
    "columnDefs": [{
        "targets": [9],
        "visible": false,
        "searchable": false
    }]
});

var tablaAnticipo = null;
var pasoCliente = false;

var tablaHistoricoAnti = $('#datatableHistoricoAnti').DataTable({
    keys: true,
    searching: false,
    paginate:false,
    scrollY: 250,
    scrollX: true,
    'autoWidth': false
});

var tablaHistorico = $('#datatableCuentasCobrarDetalleHistorico').DataTable({
    'paging': false,
    'lengthChange': false,
    'searching': false,
    'ordering': false,
    'info': false,
    scrollY: 300,
    'autoWidth': false,
    keys: false,
    "columnDefs": [{
        "targets": [5,8],
        "visible": false,
        "searchable": false
    }]
});

var tablaDetalleFactura = $('#datatableDetalleFactura').DataTable({
    'paging': false,
    'lengthChange': false,
    'searching': false,
    'ordering': false,
    'info': false,
    scrollY: 300,
    'autoWidth': false,
    keys: false,
    "columnDefs": [{
        "targets": [3],
        "visible": false,
        "searchable": false
    }]
});

var tablaIngresoDetalle = $('#datatableIngresosDetalle').DataTable({
    'paging': false,
    'lengthChange': false,
    'searching': false,
    'ordering': false,
    'info': false,
    scrollY: 300,
    'autoWidth': false,
    keys: false
});

var tablaComprobante = $('#datatableComprobante').DataTable({
    'paging': false,
    'lengthChange': false,
    'searching': false,
    'ordering': false,
    'info': false,
    scrollY: 150,
    'autoWidth': false,
    keys: false
});

var tableIngreso = null;
var tableIngresoEgreso = null;

var idIngreso = 0;
var saldo = 0;
var NumeroIngreso = 0;
var idFormaPago = 0;
var idAnticipo = 0;
var valorRecibidoCuenta = 0;
var valorTransferencia = 0;
var valorRecibidoChequeCuenta = 0;
var valorRecibidoTarjetaCuenta = 0;
var valorRecibidoAnticipoCuenta= 0;

$('#datatableCuentasCobrar_filter input').css("margin-left", "-50em");
$('#datatableCuentasCobrar_filter input').css("content", "Busqueda");
$('#datatableCuentasCobrar_filter input').css("width", "77em");

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
$(document).ready(function() {
    if (parametroURL('pagina') == 'cuentaxcobrar') {
        CargarCuentas();
        LlenarParaEgreso();
        LlenarTablaClientes();
        LlenarTablaClientesSinDeuda();
    }
    if (parametroURL('pagina') == 'movimiento_caja') {
        LlenarTablaIngresos();
    }
});



$('.body').on('click', 'button#BuscarCuentas', function(evt) {
    var fechaD = $('.body').find('input#fechaDesdeC').val();
    var fechaH = $('.body').find('input#fechaHastaC').val();
    CargarCuentas(fechaD, fechaH);
});

function CargarCuentas(fechaD, fechaH) {
    $.ajax({
        method: "POST",
        url: "Ajax/Aj_Cuenta.php",
        data: {
            Requerimiento: "CargarCuentas",
            FechaDesde: fechaD,
            FechaHasta: fechaH
        },
        dataType: 'JSON',
    }).done(function(respuesta) {
        tableResul.clear().draw();
        $.each(respuesta, function(i, iten) {
            var cliente;
            if (respuesta[i][5] == "S") {
                cliente = respuesta[i][2] + ' ' + respuesta[i][3];
            } else {
                var cliente = CargarClientePorIdConsulta(respuesta[i][4]);
            }
            var estado = respuesta[i][11];
            var boton = "";
            if (parseFloat(estado) == 0) {
                boton = '<button type="button" class="btn btn-sm btn-danger">COBRADO</button>';
            } else {
                boton = '<button type="button" class="btn btn-sm btn-success">PENDIENTE</button>';
            }
            var datos = [respuesta[i][0], respuesta[i][2] + ' ' + respuesta[i][3] + ' ' + respuesta[i][1], cliente.replace("null", ""), respuesta[i][6], respuesta[i][7], respuesta[i][8], respuesta[i][9], boton];
            tableResul.row.add(datos);
        });
        tableResul.draw(true);
    });
}

function CargarComprobantes(idFormaPago) {
    $.ajax({
        method: "POST",
        url: "Ajax/Aj_Cuenta.php",
        data: {
            Requerimiento: "CargarComprobantes",
            FormaPago: idFormaPago,
        },
        dataType: 'JSON',
    }).done(function(respuesta) {
        console.log(respuesta)
        tablaComprobante.clear().draw();
        $.each(respuesta, function(i, iten) {
            var datos = ["IC-"+respuesta[i][1], respuesta[i][0], respuesta[i][2], respuesta[i][4],respuesta[i][3]];
            tablaComprobante.row.add(datos);
        });
        tablaComprobante.draw(true);
    });
}

function CargarCuentasPorPaciente(paciente,tipo) {
    $.ajax({
        method: "POST",
        url: "Ajax/Aj_Cuenta.php",
        data: {
            Requerimiento: "CargarCuentasPorPaciente",
            Paciente: paciente,
            Tipo: tipo
        },
        dataType: 'JSON',
    }).done(function(respuesta) {
        //console.log(respuesta);
        pasoCliente = true;
        var idConsulta = 0;
        var nombre = '';
        var bandera = false;
        var idPaciente = $('.body').find('strong#nombreCompleto').attr('idPaciente');
        $.each(respuesta, function(i, value) {
            bandera = true;
            idConsulta = respuesta[i][9];
            var estado = respuesta[i][11];
        });
        var cuentas = $('.body').find('input#radio1Ingreso');
        if(idPaciente>0){
            if(cuentas.is(':checked')){
                if(bandera==true){
                    $('.body').find('label#IdPacienteResultadoDetalle').text(idConsulta);
                    CargarDetalle(idPaciente,tipo);
                }else{
                    pasoCliente = true;
                    swal({
                        title: "Esculapio",
                        text: "El Paciente no registra Cuentas por Pagar, Desea realizar un anticipo?",
                        icon: "info",
                        buttons: true,
                        dangerMode: false,
                    }).then((confirma) => {
                        if (confirma) {
                            $('.body').find('div#ValorAnticipo').fadeIn(1);
                            $('.body').find('div#DivTipoPago').fadeIn(1);
                            $('.body').find('div#SaldoCuentas').fadeOut(1);
                            $('.body').find('div#EstadoCuentas').fadeOut(1);
                            $('.body').find('div#TablaAnticipo').fadeOut(1);
                            $('.body').find('div#TablaAnticipoAnticipo').fadeIn(1);
                            $('.body').find('input#radio2Ingreso').prop('checked',true);
                            if(tipo=='cliente'){
                                CargarUltimosAnticiposCliente(idPaciente);
                            }
                        } else {
                            $('.body').find('input#radio1Ingreso').prop('checked',true);
                        }
                    });
                }
            }else{
                pasoCliente = true;
                if(tipo=='cliente'){
                    CargarUltimosAnticiposCliente(idPaciente);
                }
            }
        }else{
            $('.body').find('button#LimpiarDetalleCuentas').click();
        }
        
    }).fail(function(jqXHR, textStatus, errorThrown) {
        swal("Esculapio!", "Ocurrio un error consudfgfgfglte con la administracion..!  " + errorThrown + " Se cargara la pantalla nuevamente para solucionar el problema.", "error");
    });
}

var confirmaPago = false;
$(".body").on('keyup', "input#ValorRecibidoConsulta", function(evt) {
    //alert('hola');
    var valorRecibido = $(this).val();
    var totalcancelar = parseFloat($('span#totalPagarCobrar').html().replace('$ ', ''));
    var cambio = valorRecibido - totalcancelar;
    if (totalcancelar <= valorRecibido) {
        confirmaPago = true;
        $('span#CambioConsulta').html('$ ' + cambio.toFixed(2));
    } else {
        confirmaPago = false;
    }
    if (evt.keyCode == 13) {
        $('button#CobrarCuentasAnticipo').click();
    }
});

function CargarUltimosAnticiposPaciente(id) {
    $.ajax({
        method: "POST",
        url: "Ajax/Aj_Anticipo.php",
        data: {
            Requerimiento: "CargarUltimosAnticiposPaciente",
            Id:id
        },
        dataType: 'JSON',
    }).done(function(respuesta) {
        if (respuesta[0] == false) {
            swal("Esculapio!", "OCURRIO UN ERROR.", "error");
            return;
        }
        try {
            tableAnti.clear().draw();
        } catch (error) {}

        $.each(respuesta, function(i, value) {
            var saldo = parseFloat(respuesta[i][4]);
            var campos = "";
            if(saldo > 0){
                campos = [respuesta[i][0],
                    respuesta[i][2]+' '+respuesta[i][3]+' '+respuesta[i][1],
                    parseFloat(respuesta[i][7]).toFixed(2),
                    parseFloat(respuesta[i][4]).toFixed(2),
                    respuesta[i][5],
                    respuesta[i][6]
                ];
                tableAnti.row.add(campos).node().id = respuesta[i][0];
            }
            
        });
        tableAnti.draw(false);  
    }).fail(function(jqXHR, textStatus, errorThrown) {
        swal("Esculapio!", "Ocurrio un error consfgfgdgdfgulte con la administracion..!  " + errorThrown + " Se cargara la pantalla nuevamente para solucionar el problema.", "error");
    });
}

function CargarUltimosAnticiposCliente(id) {
    $.ajax({
        method: "POST",
        url: "Ajax/Aj_Anticipo.php",
        data: {
            Requerimiento: "CargarUltimosAnticiposCliente",
            Id:id
        },
        dataType: 'JSON',
    }).done(function(respuesta) {
        if (respuesta[0] == false) {
            swal("Esculapio!", "OCURRIO UN ERROR.", "error");
            return;
        }
        try {
            tableAnti.clear().draw();
        } catch (error) {}

        $.each(respuesta, function(i, value) {
            var saldo = parseFloat(respuesta[i][3]);
            var campos = "";
            if(saldo > 0){
                campos = [respuesta[i][0],
                    respuesta[i][2]+' '+respuesta[i][1],
                    parseFloat(respuesta[i][6]).toFixed(2),
                    parseFloat(respuesta[i][3]).toFixed(2),
                    respuesta[i][4],
                    respuesta[i][5]
                ];
                tableAnti.row.add(campos).node().id = respuesta[i][0];
            }
            
        });
        tableAnti.draw(false);  
    }).fail(function(jqXHR, textStatus, errorThrown) {
        swal("Esculapio!", "Ocurrio un error consuerfdssdflte con la administracion..!  " + errorThrown + " Se cargara la pantalla nuevamente para solucionar el problema.", "error");
    });
}

$('.body').on('click', 'input#radio2Ingreso', function(evt) {
        var idPaciente = parseFloat($('.body').find('input#SaldoACancelar').val());
        var idPaciente2 = $('.body').find('strong#nombreCompleto').attr('idPaciente');
        var tipo = $('.body').find('strong#nombreCompleto').attr('tipo');
        if(idPaciente>0){
            swal({
                title: "Esculapio",
                text: "Seguro que sea cambiar de Tipo de Ingreso? Los datos en pantalla se perderan.",
                icon: "warning",
                buttons: true,
                dangerMode: false,
            }).then((confirma) => {
                if (confirma) {
                    $('.body').find('div#ValorAnticipo').fadeIn(1);
                    $('.body').find('div#DivTipoPago').fadeIn(1);
                    $('.body').find('div#SaldoCuentas').fadeOut(1);
                    $('.body').find('div#EstadoCuentas').fadeOut(1);
                    $('.body').find('div#TablaAnticipo').fadeOut(1);
                    $('.body').find('div#TablaAnticipoAnticipo').fadeIn(1);
                    if(tipo=='cliente'){
                        CargarUltimosAnticiposCliente(idPaciente2,tipo);
                    }
                } else {
                    $('.body').find('input#radio1Ingreso').prop('checked',true);
                }
            });
            return;
        }else{
            $('.body').find('div#ValorAnticipo').fadeIn(1);
            $('.body').find('div#DivTipoPago').fadeIn(1);
            $('.body').find('div#SaldoCuentas').fadeOut(1);
            $('.body').find('div#EstadoCuentas').fadeOut(1);
            $('.body').find('div#TablaAnticipo').fadeOut(1);
            $('.body').find('div#TablaAnticipoAnticipo').fadeIn(1);
        }
});

$('.body').on('click', 'input#radio1Ingreso', function(evt) {
    //if(pasoCliente==true){
        var idPaciente = parseFloat($('.body').find('input#valorIngresado').val());
        var idPaciente2 = $('.body').find('strong#nombreCompleto').attr('idPaciente');
        var tipo = $('.body').find('strong#nombreCompleto').attr('tipo');
        if(idPaciente>0){
            swal({
                title: "Esculapio",
                text: "Seguro que sea cambiar de Tipo de Ingreso? Los datos en pantalla se perderan.",
                icon: "warning",
                buttons: true,
                dangerMode: false,
            }).then((confirma) => {
                if (confirma) {
                    $('.body').find('input#valorIngresado').val('0');
                    $('.body').find('div#ValorAnticipo').fadeOut(1);
                    $('.body').find('div#DivTipoPago').fadeOut(1);
                    $('.body').find('div#SaldoCuentas').fadeIn(1);
                    $('.body').find('div#EstadoCuentas').fadeIn(1);
                    $('.body').find('div#TablaAnticipo').fadeIn(1);
                    $('.body').find('div#TablaAnticipoAnticipo').fadeOut(1);
                    CargarCuentasPorPaciente(idPaciente2,tipo);
                    $('.body').find('button#EliminarAnti').fadeOut(1);
                } else {
                    $('.body').find('input#radio2Ingreso').prop('checked',true);
                }
            });
            return;
        }else{
            if(idPaciente2==0){
                $('.body').find('div#ValorAnticipo').fadeOut(1);
                $('.body').find('div#DivTipoPago').fadeOut(1);
                $('.body').find('div#SaldoCuentas').fadeIn(1);
                $('.body').find('div#EstadoCuentas').fadeIn(1);
                $('.body').find('div#TablaAnticipo').fadeIn(1);
                $('.body').find('div#TablaAnticipoAnticipo').fadeOut(1);
            }else{
                CargarCuentasPorPaciente(idPaciente2,tipo);
                $('.body').find('div#ValorAnticipo').fadeOut(1);
                $('.body').find('div#DivTipoPago').fadeOut(1);
                $('.body').find('div#SaldoCuentas').fadeIn(1);
                $('.body').find('div#EstadoCuentas').fadeIn(1);
                $('.body').find('div#TablaAnticipo').fadeIn(1);
                $('.body').find('div#TablaAnticipoAnticipo').fadeOut(1);
            }
        }
    }
//}
);

$(".body").on('change', "select#pago", function(ev) {
    $("div.cheque").fadeOut(0);
    $("div.tarjeta").fadeOut(0);
   
    if($(this).val()=="CHEQUE"){
        $("div.cheque").fadeIn(0);
    }

    if($(this).val()=="TARJETA DE CREDITO"){
        $("div.tarjeta").fadeIn(0);
    }
});

$(".body").on('click', "button#BuscarFactura", function(ev) {
    var fechaDesde = $('input#fechaDesdeF').val();
    var fechaHasta = $('input#fechaHastaF').val();;
    tableIngreso.column(2).search(fechaDesde).draw();
    tableIngreso.column(3).search(fechaHasta).draw();
    try {
        var tid = setInterval(function() {
        tableIngreso.columns.adjust().draw();
        clearInterval(tid);
    }, 500);
    } catch (error) {
        console.log(error);
    }
});

$(".body").on('click', "button#BuscarFacturaE", function(ev) {
    var fechaDesde = $('input#fechaDesdeFE').val();
    var fechaHasta = $('input#fechaHastaFE').val();;
    tableIngresoEgreso.column(2).search(fechaDesde).draw();
    tableIngresoEgreso.column(3).search(fechaHasta).draw();
    try {
        var tid = setInterval(function() {
        tableIngresoEgreso.columns.adjust().draw();
        clearInterval(tid);
    }, 500);
    } catch (error) {
        console.log(error);
    }
});

function CargarClientePorIdConsulta(id) {
    var cliente = "";
    $.ajax({
        async: false,
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
        cliente = respuesta[0][2] + " " + respuesta[0][3];
    }).fail(function(jqXHR, textStatus, errorThrown) {
        swal("Esculapio!", "Ocurrio un erroasdasdr consulte con la administracion..!  " + errorThrown + " Se cargara la pantalla nuevamente para solucionar el problema.", "error");
    });
    return cliente;
}

function CargarDetalleHistorico(idPaciente) {
    $.ajax({
        method: "POST",
        url: "Ajax/Aj_Cuenta.php",
        data: {
            Requerimiento: "CargarDetalleCuentasHistorico",
            Paciente: idPaciente
        },
        dataType: 'JSON',
    }).done(function(respuesta) {
        var totalCancelar = 0;
        tablaHistorico.clear().draw();
        $.each(respuesta, function(i, iten) {
            totalCancelar = totalCancelar + parseFloat(respuesta[i][5]);
            var periodo = respuesta[i][1];
            if (periodo == '1') {
                periodo = 'SEMENAL';
            }
            if (periodo == '2') {
                periodo = 'QUINCENAL';
            }
            if (periodo == '3') {
                periodo = 'MENSUAL';
            }
            var idCaja = respuesta[i][9];
            if(idCaja == null){
                idCaja = 0;
            }
            var datos = ''
            if (respuesta[i][5] == 0) {
                datos = ['<span idFormaPago="'+respuesta[i][8]+'" idIngresoCaja="'+idCaja+'">'+respuesta[i][6]+'</span>', respuesta[i][0], periodo, respuesta[i][2], parseFloat(respuesta[i][3]).toFixed(2), parseFloat(respuesta[i][4]).toFixed(2), parseFloat(respuesta[i][5]).toFixed(2), '<button type="button" class="btn btn-sm btn-danger">COBRADO</button>',respuesta[i][7]];
            } else {
                datos = ['<span idFormaPago="'+respuesta[i][8]+'" idIngresoCaja="'+idCaja+'">'+respuesta[i][6]+'</span>', respuesta[i][0], periodo, respuesta[i][2], parseFloat(respuesta[i][3]).toFixed(2), parseFloat(respuesta[i][4]).toFixed(2), parseFloat(respuesta[i][5]).toFixed(2), '<button type="button" class="btn btn-sm btn-success">PENDIENTE</button>', respuesta[i][7]];
            }
            /**/
            tablaHistorico.row.add(datos).draw(true);
        });
        var boton = $('.body').find('button#EstadoCuenta');
    });
}

function CargarHistoricoAntiCliente(id){
    $.ajax({
        method: "POST",
        url: "Ajax/Aj_Anticipo.php",
        data: {
            Requerimiento: "CargarUltimosAnticiposCliente",
            Id:id
        },
        dataType: 'JSON',
    }).done(function(respuesta) {
        if (respuesta[0] == false) {
            swal("Esculapio!", "OCURRIO UN ERROR.", "error");
            return;
        }
        try {
            tablaHistoricoAnti.clear().draw();
        } catch (error) {}

        $.each(respuesta, function(i, value) {
            var campos = [respuesta[i][0],
                    respuesta[i][2]+' '+respuesta[i][1],
                    parseFloat(respuesta[i][6]).toFixed(2),
                    parseFloat(respuesta[i][3]).toFixed(2),
                    respuesta[i][4],
                    respuesta[i][5]
                ];
            tablaHistoricoAnti.row.add(campos).node().id = respuesta[i][0];
        });
        tablaHistoricoAnti.draw(false);  
    }).fail(function(jqXHR, textStatus, errorThrown) {
        swal("Esculapio!", "Ocurrio un errorfdg consulte con la administracion..!  " + errorThrown + " Se cargara la pantalla nuevamente para solucionar el problema.", "error");
    });
}

function CargarHistoricoAntiPaciente(id) {
    $.ajax({
        method: "POST",
        url: "Ajax/Aj_Anticipo.php",
        data: {
            Requerimiento: "CargarUltimosAnticiposPaciente",
            Id:id
        },
        dataType: 'JSON',
    }).done(function(respuesta) {
        if (respuesta[0] == false) {
            swal("Esculapio!", "OCURRIO UN ERROR.", "error");
            return;
        }
        try {
            tablaHistoricoAnti.clear().draw();
        } catch (error) {}

        $.each(respuesta, function(i, value) {
            var saldo = parseFloat(respuesta[i][4]);
            var campos = [respuesta[i][0],
                    respuesta[i][2]+' '+respuesta[i][3]+' '+respuesta[i][1],
                    parseFloat(respuesta[i][7]).toFixed(2),
                    parseFloat(respuesta[i][4]).toFixed(2),
                    respuesta[i][5],
                    respuesta[i][6]
                ];
            tablaHistoricoAnti.row.add(campos).node().id = respuesta[i][0];
        });
        tablaHistoricoAnti.draw(false);  
    }).fail(function(jqXHR, textStatus, errorThrown) {
        swal("Esculapio!", "Ocurrio un error consugfgghlte con la administracion..!  " + errorThrown + " Se cargara la pantalla nuevamente para solucionar el problema.", "error");
    });
}

function CargarDetalle(idPaciente,tipo) {
    $.ajax({
        method: "POST",
        url: "Ajax/Aj_Cuenta.php",
        data: {
            Requerimiento: "CargarDetalleCuentas",
            Paciente: idPaciente,
            Tipo: tipo
        },
        dataType: 'JSON',
    }).done(function(respuesta) {
        var totalCancelar = 0;
        tableResul2.clear().draw();
        var input = '<input style="width:80px; height:30px;" type="number" required step=".01" value="0.00" class="form-control" id="ValorQuitar"  placeholder="Valor">';
        var check = '<input type="checkbox" id="CobrarTodo">';
        $.each(respuesta, function(i, iten) {
            totalCancelar = totalCancelar + parseFloat(respuesta[i][5]);
            var periodo = respuesta[i][1];
            if (periodo == '1') {
                periodo = 'SEMENAL';
            }
            if (periodo == '2') {
                periodo = 'QUINCENAL';
            }
            if (periodo == '3') {
                periodo = 'MENSUAL';
            }
            var idCaja = respuesta[i][9];
            if(idCaja == null){
                idCaja = 0;
            }
            if (respuesta[i][5] > 0) {
                var datos = ['<span idFormaPago="'+respuesta[i][8]+'" idIngresoCaja="'+idCaja+'">'+respuesta[i][6]+'</span>', 
                            respuesta[i][0]
                            , periodo
                            , respuesta[i][2]
                            , parseFloat(respuesta[i][3]).toFixed(2)
                            , parseFloat(respuesta[i][4]).toFixed(2)
                            , parseFloat(respuesta[i][5]).toFixed(2)
                            , input, 
                            check,
                             respuesta[i][8]];
                tableResul2.row.add(datos).draw(true);
            }
            /**/
            
        });
        var boton = $('.body').find('button#EstadoCuenta');
        if (parseFloat(totalCancelar) == 0) {
            boton.removeClass('btn-default');
            boton.addClass('btn-danger')
            boton.text('COBRADO');
        } else {
            boton.removeClass('btn-default');
            boton.addClass('btn-success')
            boton.text('PENDIENTE');
        }   
        $('.body').find('input#SaldoACancelar').val(parseFloat(totalCancelar).toFixed(2));
    });
}

$('.body').on('click', 'button#LimpiarDetalleCuentas', function(evt) {
    tableAnti.clear().draw();
    tableResul2.clear().draw();
    $('.body').find('div#ValorAnticipo').fadeOut(1);
    $('.body').find('div#DivTipoPago').fadeOut(1);
    $('.body').find('div#SaldoCuentas').fadeIn(1);
    $('.body').find('div#EstadoCuentas').fadeIn(1);
    $('.body').find('div#TablaAnticipo').fadeIn(1);
    $('.body').find('div#TablaAnticipoAnticipo').fadeOut(1);
    $('.body').find('input#SaldoACancelar').val('0.00')
    $('.body').find('input#valorIngresado').val('0.00')
    var boton = $('.body').find('button#EstadoCuenta');
    if (boton.hasClass('btn-danger')){
        boton.removeClass('btn-danger');
        boton.addClass('btn-default')
        boton.text('DEFINIR');
    } 
    if(boton.hasClass('btn-success')){
        boton.removeClass('btn-success');
        boton.addClass('btn-default')
        boton.text('DEFINIR');
    }
    $('.body').find('strong#nombreCompleto').attr('idPaciente', 0);
    $('.body').find('strong#nombreCompleto').text('------');
    $('.body').find('input#radio1Ingreso').prop('checked',false);
    $('.body').find('input#radio2Ingreso').prop('checked',false);
    $('.body').find('button#EliminarAnti').fadeOut(1);
    $('.body').find('input#valorIngresado').prop('disabled',false);
});

function CalcularTotalPagar(){
    var vector = $('.body').find("#datatableCuentasCobrarDetalle tbody tr");
    var total = 0;
    $.each(vector, function(a) {
        var valor = $(this).find('td').eq(7).find('input').val();
        if(valor==undefined){
            valor = 0;
        }
        total = parseFloat(total) + parseFloat(valor);
    });
    return total;
}

$('.body').on('click', 'button#CobrarCuentasAnticipo', function(evt) {
    swal({
        title: "Esculapio",
        text: "Seguro que desea realizar este cobro?",
        icon: "warning",
        buttons: true,
        dangerMode: false,
    }).then((confirma) => {
        if (confirma) {
            var boton = $('.body').find("button#LimpiarDetalleCuentas");
            var cerrar = $('.body').find('button.close');
            var idPaciente = $('.body').find('strong#nombreCompleto').attr('idPaciente');
            var tipo = $('.body').find('strong#nombreCompleto').attr('tipo');
            var cuentas = $('.body').find('input#radio1Ingreso');
            if(cuentas.is(':checked')){
                var vector = $('.body').find("#datatableCuentasCobrarDetalle tbody tr");
                $.each(vector, function(a) {
                    var consulta = tableResul2.row($(this)).data()[9];
                    var valor = parseFloat($(this).find('td').eq(7).find('input').val());
                    var pagar = $(this).find('td').eq(6).html();
                    var pagado = $(this).find('td').eq(5).html();
                    var numero = $(this).find('td').eq(1).html();
                    var factura = $(this).find('td').eq(0).find("span").text();
                    if (valor > 0) {
                        idFormaPago = $(this).find('td').eq(0).find('span').attr('idFormaPago');
                        CobrarCuentas(consulta, valor, numero, pagar, pagado);
                        //ImprimirRecibo("IC-"+NumeroIngreso,factura+'-'+numero,parseFloat(valor).toFixed(2),saldo,'ggg')
                        //ImprimirRecibo("IC-"+NumeroIngreso,factura+'-'+numero,parseFloat(valor).toFixed(2),saldo,'ggg')
                        printTextAreaMovimiento("IC-"+NumeroIngreso,factura+'-'+numero,parseFloat(valor).toFixed(2),saldo,'ggg');
                    }
                });
                GuardarPagosCuentas(valorRecibidoCuenta, valorRecibidoChequeCuenta, valorRecibidoTarjetaCuenta, valorRecibidoAnticipoCuenta,valorTransferencia);
                var puntoEmision = $('.body').find('strong#PuntoEmision').attr('puntoEmision');
                var puntoVenta = $('.body').find('strong#PuntoEmision').attr('idPuntoVenta');
                var secuencia = ConsultarUltimoRecibo(puntoVenta);
                $('label#SecuencialRecibo').html('IC-' + puntoEmision + "-" + zfill(secuencia, 7));
                cerrar.click();
                CargarCuentasPorPaciente(idPaciente,tipo);
            }else{
                var idPacienteAnticipo = $('.body').find('strong#nombreCompleto').attr('idPaciente');
                var tipo = $('.body').find('strong#nombreCompleto').attr('tipo');
                var valor = $('.body').find('input#valorIngresado').val();
                if(valor=='' || valor<1){
                    swal("Esculapio!", "Ingrese el total del anticipo.!", "warning");
                    return
                }
                var nombre = $('.body').find('strong#nombreCompleto').text();
                
                var t = $('#datatable').DataTable();
               
                swal({
                    title: "Esculapio",
                    text: "Seguro Que Desea Guardar?",
                    icon: "info",
                    buttons: true,
                    dangerMode: false,
                }).then((confirma) => {
                    if (confirma) {
                        var tipoPago = '';
                        if (valorRecibidoCuenta > 0) {
                            tipoPago='EFECTIVO';
                        }
                        if (valorRecibidoChequeCuenta > 0) {
                            tipoPago='CHEQUE';
                        }
                        if (valorRecibidoTarjetaCuenta > 0) {
                            tipoPago='TARJETA';
                        }
                        if (valorTransferencia > 0) {
                            tipoPago='TRANSFERENCIA';
                        }
                        if (valorRecibidoCuenta > 0 && valorRecibidoChequeCuenta > 0 || valorRecibidoCuenta > 0 && valorRecibidoTarjetaCuenta > 0 || valorRecibidoChequeCuenta > 0 && valorRecibidoTarjetaCuenta > 0 || valorRecibidoCuenta > 0 && valorTransferencia > 0) {
                            tipoPago='COMBINADO';
                        }
                        var total = valorRecibidoCuenta+valorRecibidoChequeCuenta+valorRecibidoTarjetaCuenta+valorTransferencia;
                        GuardarAnticipo(idPacienteAnticipo,valor,tipoPago,tipo);
                        GuardarPagosCuentas(valorRecibidoCuenta, valorRecibidoChequeCuenta, valorRecibidoTarjetaCuenta, valorRecibidoAnticipoCuenta,valorTransferencia);
                        cerrar.click();
                        if(tipo=='cliente'){
                            CargarUltimosAnticiposCliente(idPaciente,tipo);
                        }else{
                            CargarUltimosAnticiposPaciente(idPaciente,tipo);
                        }
                        //ImprimirRecibo("IC-"+NumeroIngreso,'',total,'0.00','anticipo')
                        //ImprimirRecibo("IC-"+NumeroIngreso,'',total,'0.00','anticipo')
                        printTextAreaMovimiento("IC-"+NumeroIngreso,'',total,'0.00','anticipo');
                    } else {

                    }
                });
            }          
        } else {
                        
        }
    });
})

$('.body').on('click', 'button#GuardarDetalleCuentas', function(evt) {
    var idPaciente = $('.body').find('strong#nombreCompleto').attr('idPaciente');
    if(idPaciente==0){
        swal("Esculapio!", "Seleccione un Paciente!", "warning");
        return;
    }
    var valorModal = $('.body').find('input#valorIngresado').val();
    var valorModalCuenta = CalcularTotalPagar();
    var cuentas = $('.body').find('input#radio1Ingreso');
    if(cuentas.is(':checked')){
        if(valorModalCuenta>0){
            $('.body').find('span#totalPagarCobrar').text('$ '+parseFloat(valorModalCuenta).toFixed(2));
            $('.body').find('div#modal-cobrar').modal();
        }
        else{
            swal("Esculapio!", "Ingrese un Valor para Continuar", "error");
            return;
        }
    }else{
        $('body').find('Div#DivAnticipo').fadeOut(1);
        if(valorModal>0){
            $('.body').find('span#totalPagarCobrar').text('$ '+parseFloat(valorModal).toFixed(2));
            $('.body').find('div#modal-cobrar').modal();
        }
        else{
            swal("Esculapio!", "Ingrese un Valor para Continuar", "error");
            return;
        }
    }
});

function GuardarAnticipo(idPaciente,valor,tipoPago,tipo) {
    $.ajax({  
        async:false,
        method: "POST",
        url: "Ajax/Aj_Anticipo.php",
        data: {
            Requerimiento: "GuardarAnticipo",
            IdPaciente: idPaciente,
            Valor:valor,
            TipoPago: tipoPago,
            Tipo: tipo
        },

        dataType: 'JSON',
    }).done(function(respuesta) {
        console.log(respuesta)
        if (respuesta[0] == true) {
            swal("Esculapio!", "Anticipo Registrado.!", "success");
            var fila = JSON.parse(respuesta[1]);
            idAnticipo = fila[0][0];
            //var campos = [fila[0][0], nombre,valor,tipo, fila[0][4]];
            //var objeto = ["GuardarAnticipo", '#datatableAnti', campos];
            //send(JSON.stringify(objeto));
            //var objet
            //limpiar.trigger('click');
            return;
        }
        if (respuesta[0] == false) {
            if (respuesta[1] == 23000) {
                swal("Esculapio!", "................... !!", "error");
                return;
            }
            // location.reload();
            return;
        }
    }).fail(function(jqXHR, textStatus, errorThrown) {
        console.log(errorThrown)
        //location.reload();
    });
}

function GuardarIngresoCaja(idPaciente,monto,numero,tipoPago,idAnticipo) {
    var tipo = '';
    var cuentas = $('.body').find('input#radio1Ingreso');
    if(cuentas.is(':checked')){
        tipo = 'ABONO';
    }else{
        tipo = 'ANTICIPO';
    }
    var tipoCliente =  $('.body').find('strong#nombreCompleto').attr('tipo');
    $.ajax({ 
        async: false,
        method: "POST",
        url: "Ajax/Aj_Cuenta.php",
        data: {
            Requerimiento: "GuardaIngresoCaja",
            Paciente: idPaciente,
            Monto:monto,
            Numero:numero,
            Tipo:tipo,
            TipoPago:tipoPago,
            TipoCliente: tipoCliente,
            IdAnticipo:idAnticipo        
        },
        dataType: 'JSON',
    }).done(function(respuesta) {
        console.log(respuesta)
        if (respuesta[0] == true) {
            swal("Esculapio!", "Ingreso de Caja Registrado.!", "success");
            var fila = JSON.parse(respuesta[1]);
            idIngreso = fila[0][0];
            NumeroIngreso = fila[0][1];
            return;
        }
        if (respuesta[0] == false) {
            if (respuesta[1] == 23000) {
                swal("Esculapio!", "................... !!", "error");
                return;
            }
            swal("Esculapio!", "No Se Pudo Guardar el Anticipo!, Se cargara la pantalla nuevamente para solucionar el problema." +respuesta[1], "error");
            // location.reload();
            return;
        }
    }).fail(function(jqXHR, textStatus, errorThrown) {
        console.log(errorThrown)
        //location.reload();
    });
}

function GuardarIngresoAbono(idIngresoF,idFormaPagoF) {
    $.ajax({
        async: false,
        method: "POST",
        url: "Ajax/Aj_Cuenta.php",
        data: {
            Requerimiento: "GuardarIngresoAbono",
            Ingreso: idIngresoF,
            FormaPago: idFormaPagoF       
        },
        dataType: 'JSON',
    }).done(function(respuesta) {
        console.log(respuesta)
        if (respuesta[0] == true) {
            swal("Esculapio!", "Ingreso de Abono Registrado.!", "success");
            var fila = JSON.parse(respuesta[1]);
            return;
        }
        if (respuesta[0] == false) {
            if (respuesta[1] == 23000) {
                swal("Esculapio!", "................... !!", "error");
                return;
            }
            swal("Esculapio!", "No Se Pudo Guardar el Anticipo!, Se cargara la pantalla nuevamente para solucionar el problema." +respuesta[1], "error");
            //location.reload();
            return;
        }
    }).fail(function(jqXHR, textStatus, errorThrown) {
        swal("Esculapio!", "Ocurrio un error consulte con la admGRSDSDFSDSDFinistracion..!  " + errorThrown + " Se cargara la pantalla nuevamente para solucionar el problema.", "error");
        //location.reload();
    });
}

$(".body table#datatableCuentasCobrarDetalle tbody").on('change', "tr td input[type=checkbox]", function(ev) {
    if ($(this).is(':checked')) {
        var valor = $(this).parent().parent().find('td').eq(6).html();
        $(this).parent().parent().find('td').eq(7).find('input').val(valor);
    } else {
        $(this).parent().parent().find('td').eq(7).find('input').val('');
        $(this).parent().parent().find('td').eq(7).find('input').focus();
    }
});

function CobrarCuentas(consulta, valor, numero, pagar, pagado) {
    $.ajax({
        async: false,
        method: "POST",
        url: "Ajax/Aj_Cuenta.php",
        data: {
            Requerimiento: "CobrarCuentas",
            Consulta: consulta,
            Valor: valor,
            NumeroPago: numero,
            Pagar: pagar,
            Pagado: pagado
        },
        dataType: 'JSON',
    }).done(function(respuesta) {
        console.log(respuesta)
        swal("Esculapio!", "Cobro realizado con Exito", "success");
        //var fila = JSON.parse(respuesta[1]);
        saldo = respuesta[1];
        return;
    });
}

$(document).keydown(function(tecla) {
    //tecla.preventDefault();
    if (112 == tecla.keyCode) {
        tecla.preventDefault();
        $('div#consultasFactura').click();
    }
    if (121 == tecla.keyCode) {
        tecla.preventDefault();
        $('button#GuardarDetalleCuentas').click();
    }
    // alert(tecla.keyCode);
});


var tableAnti = $('#datatableAnti').DataTable({
    keys: true,
    searching: false,
    paginate:false,
    scrollY: 250,
    scrollX: true
});

var primeravez = true;

$('.body table#datatableAnticipo tbody').on('dblclick', 'tr', function(evt) {
    var cerrar = $('.body').find('button.close');
    id = $(this).find('td').eq(0).html();
    var cedula = $(this).find('td').eq(1).html();
    var direccion = $(this).find('td').eq(5).html();
    var telefono = $(this).find('td').eq(3).text();
    var correo = $(this).find('td').eq(4).html();
    var tipo = tablaCliente.row($(this)).data()[6];
    $('.body').find('strong#nombreCompleto').attr('idPaciente', id);
    $('.body').find('strong#nombreCompleto').attr('cedulaPaciente', cedula);
    $('.body').find('strong#nombreCompleto').attr('direccionPaciente', direccion);
    $('.body').find('strong#nombreCompleto').attr('telefonoPaciente', telefono);
    $('.body').find('strong#nombreCompleto').attr('correoPaciente', correo);
    $('.body').find('strong#nombreCompleto').attr('tipo', tipo);
    var apellido = $('.body').find('strong#nombreCompleto');
    var fila = $(this);
    apellido.text(fila.find('td').eq(2).html());
    apellido.attr("fecha", fila.find('td').eq(6).find('span').attr('fecha_nacimiento'));
    $(".body div#DatosPaciente").css('visibility', 'visible');
    CargarCuentasPorPaciente(id,tipo);
    $('.body').find('input#cedulaFiltro').val('');
    $('.body').find('input#cedulaFiltro').click();
    cerrar.trigger('click');
});

$('.body table#datatableAnticipoSinDeuda tbody').on('dblclick', 'tr', function(evt) {
    var cerrar = $('.body').find('button.close');
    id = $(this).find('td').eq(0).html();
    var cedula = $(this).find('td').eq(1).html();
    var direccion = $(this).find('td').eq(5).html();
    var telefono = $(this).find('td').eq(3).text();
    var correo = $(this).find('td').eq(4).html();
    var tipo = tablaClienteSinDeuda.row($(this)).data()[6];
    $('.body').find('strong#nombreCompleto').attr('idPaciente', id);
    $('.body').find('strong#nombreCompleto').attr('cedulaPaciente', cedula);
    $('.body').find('strong#nombreCompleto').attr('direccionPaciente', direccion);
    $('.body').find('strong#nombreCompleto').attr('telefonoPaciente', telefono);
    $('.body').find('strong#nombreCompleto').attr('correoPaciente', correo);
    $('.body').find('strong#nombreCompleto').attr('tipo', tipo);
    var apellido = $('.body').find('strong#nombreCompleto');
    var fila = $(this);
    apellido.text(fila.find('td').eq(2).html());
    apellido.attr("fecha", fila.find('td').eq(6).find('span').attr('fecha_nacimiento'));
    $(".body div#DatosPaciente").css('visibility', 'visible');
    CargarCuentasPorPaciente(id,tipo);
    $('.body').find('input#cedulaFiltro').val('');
    $('.body').find('input#cedulaFiltro').click();
    cerrar.trigger('click');
});

$('#modal-default').on('shown.bs.modal', function() {
    noModal = false;
    $('input#cedulaFiltroAnticipo').focus();
    $('input#cedulaFiltroAnticipo').val('');
    var ingreso1 = $('.body').find('input#radio1Ingreso');
    var ingreso2 = $('.body').find('input#radio2Ingreso');
    var nombre = $('input#cedulaFiltroAnticipo').val();
    if(ingreso1.is(':checked')){
        $('.body').find('div#DivTablaAnticipo').fadeOut(1);
        $('.body').find('div#DivTablaDeudores').fadeIn(1);
        tablaCliente.column(0).search(nombre).draw();
    }else{
        $('.body').find('div#DivTablaDeudores').fadeOut(1);
        $('.body').find('div#DivTablaAnticipo').fadeIn(1);
        tablaClienteSinDeuda.column(0).search(nombre).draw();
    }
    //Cargar($('input#cedulaFiltro').val());
});

$('#modal-comprobante').on('shown.bs.modal', function() {
   try {
        var tid = setInterval(function() {
        tablaComprobante.columns.adjust().draw();
        clearInterval(tid);
    }, 30);
    } catch (error) {
        console.log(error);
    }
});

$('#modal-historico').on('shown.bs.modal', function() {
   try {
        var tid = setInterval(function() {
        tablaHistorico.columns.adjust().draw();
        tablaHistoricoAnti.columns.adjust().draw();
        clearInterval(tid);
    }, 30);
    } catch (error) {
        console.log(error);
    }
});

$('#modal-ingresos').on('shown.bs.modal', function() {
   try {
        var tid = setInterval(function() {
        tablaIngresoDetalle.columns.adjust().draw();
        clearInterval(tid);
    }, 30);
    } catch (error) {
        console.log(error);
    }
});

$('#modal-detalle-factura').on('shown.bs.modal', function() {
   try {
        var tid = setInterval(function() {
        tablaDetalleFactura.columns.adjust().draw();
        clearInterval(tid);
    }, 30);
    } catch (error) {
        console.log(error);
    }
});

var tablaCliente = null;
var tablaClienteSinDeuda = null;

function LlenarTablaClientes(cadena) {
    tablaCliente = $('#datatableAnticipo').DataTable({
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
            url: "Ajax/Aj_Paciente.php",
            data: {
                Requerimiento: "CargarPacienteCuentas",
                Cadena: cadena
            },
            type: "POST"
        },
        scrollY: 450,
        scrollX: true,
        keys: true,
        scroller: {
            loadingIndicator: true
        },
        "columnDefs": [{
            "targets": [0, 1, 2, 3, 4],
            "orderable": false,
        },{
            "targets": [6],
            "visible": false,
        }
        ]
    }); 
    tablaCliente.on('key', function(e, datatable, key, cell, originalEvent) {
        if (key == 13) {
            $('#datatableAnticipo tbody tr').eq(datatable.row(cell.index().row).index()).find('td').eq(0).dblclick();
        }
    });
    $('#datatableAnticipo_filter input').unbind();
    $('#datatableAnticipo_filter input').remove();
    $('#datatableAnticipo_filter label').remove(); 
    $('input#cedulaFiltroAnticipo').bind('keyup', function(e) {
        //if (e.keyCode == 13) {
            tablaCliente.column(0).search($('input#cedulaFiltroAnticipo').val()).draw();
        //}
        if (e.keyCode == 40) {
            $(this).blur();
            $('#datatableAnticipo tbody tr td').eq(0).click();
        }
    });
}

function LlenarTablaClientesSinDeuda(cadena) {
    tablaClienteSinDeuda = $('#datatableAnticipoSinDeuda').DataTable({
        "processing": true,
        "serverSide": true,
        lengthMenu: [
            [200, 400, 600],
            [200, 400, 600]
        ],
        "ajax": {
            url: "Ajax/Aj_Paciente.php",
            data: {
                Requerimiento: "CargarPacienteCuentasSinDeuda",
                Cadena: cadena
            },
            type: "POST"
        },
        scrollY: 350,
        scrollX: true,
        keys: true,
        "columnDefs": [{
            "targets": [0, 1, 2, 3, 4],
            "orderable": false,
        },{
            "targets": [6],
            "visible": false
        }]
    });
    tablaClienteSinDeuda.on('key', function(e, datatable, key, cell, originalEvent) {
        if (key == 13) {
            $('#datatableAnticipoSinDeuda tbody tr').eq(datatable.row(cell.index().row).index()).find('td').eq(0).dblclick();
        }
    });
    $('#datatableAnticipoSinDeuda_filter input').unbind();
    $('#datatableAnticipoSinDeuda_filter input').remove();
    $('#datatableAnticipoSinDeuda_filter label').remove(); 
    $('input#cedulaFiltroAnticipo').bind('keyup', function(e) {
        //if (e.keyCode == 13) {
            tablaClienteSinDeuda.column(0).search($('input#cedulaFiltroAnticipo').val()).draw();
        //}
        if (e.keyCode == 40) {
            $(this).blur();
            $('#datatableAnticipoSinDeuda tbody tr td').eq(0).click();
        }
    });
}

function LlenarTablaIngresos() {
    tableIngreso = $('#datatableIngreso').DataTable({
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
            url: "Ajax/Aj_Cuenta.php",
            data: {
                Requerimiento: "CargarIngresos",
                FechaDesde: $('input#fechaDesdeF').val(),
                FechaHasta: $('input#fechaHastaF').val()
            },
            type: "POST"
        },
        scrollY: 450,
        scrollX: true,
        keys: true,
        scroller: {
            loadingIndicator: true
        },
        "columnDefs": [{
            "targets": [0, 1, 2, 3, 4],
            "orderable": false,
        }]
    });
    tableIngreso.on('key', function(e, datatable, key, cell, originalEvent) {
        if (key == 13) {
            $('#datatableIngreso tbody tr').eq(datatable.row(cell.index().row).index()).find('td').eq(0).dblclick();
        }
    });
    $('#datatableIngreso_filter input').unbind();
    $('#datatableIngreso_filter input').remove();
    $('#datatableIngreso_filter label').remove(); 
    $('input#nombreFiltro').bind('keyup', function(e) {
        //if (e.keyCode == 13) {
            tableIngreso.column(1).search($('input#nombreFiltro').val()).draw();
        //}
        if (e.keyCode == 40) {
            $(this).blur();
            $('#datatableIngreso tbody tr td').eq(0).click();
        }
    });
}

function LlenarParaEgreso() {
    tableIngresoEgreso = $('#datatableIngresoE').DataTable({
        "processing": true,
        "serverSide": true,
        lengthMenu: [
            [200, 400, 600],
            [200, 400, 600]
        ],
        "columnDefs": [{
            "targets": [0, 1, 2, 3, 4],
            "orderable": false,
        },{
            "targets": [8, 9, 10],
            "visible": false,
        }],
        " bFilter ": true,
        " bSort ": true,
        " bInfo ": true,
        " bAutoWidth ": true,
        "order": [],
        "ajax": {
            url: "Ajax/Aj_Anticipo.php",
            data: {
                Requerimiento: "CargarParaEgresoHabilitado",
                FechaDesde: $('input#fechaDesdeFE').val(),
                FechaHasta: $('input#fechaHastaFE').val()
            },
            type: "POST"
        },
        scrollY: 300,
        scrollX: true,
        keys: true,
        scroller: {
            loadingIndicator: true
        }
    });
    tableIngresoEgreso.on('key', function(e, datatable, key, cell, originalEvent) {
        if (key == 13) {
            $('#datatableIngresoE tbody tr').eq(datatable.row(cell.index().row).index()).find('td').eq(0).dblclick();
        }
    });
    $('#datatableIngresoE_filter input').unbind();
    $('#datatableIngresoE_filter input').remove();
    $('#datatableIngresoE_filter label').remove(); 
    $('input#nombreFiltroE').bind('keyup', function(e) {
        //if (e.keyCode == 13) {
            tableIngresoEgreso.column(1).search($('input#nombreFiltroE').val()).draw();
        //}
        if (e.keyCode == 40) {
            $(this).blur();
            $('#datatableIngresoE tbody tr td').eq(0).click();
        }
    });
}

/*function CargarUltimosAnticiposClienteE() {
    $.ajax({
        method: "POST",
        url: "Ajax/Aj_Anticipo.php",
        data: {
            Requerimiento: "CargarUltimosAnticiposClienteE",
        },
        dataType: 'JSON',
    }).done(function(respuesta) {
        if (respuesta[0] == false) {
            swal("Esculapio!", "OCURRIO UN ERROR.", "error");
            return;
        }
        try {
            tableAnti.clear().draw();
        } catch (error) {}

        $.each(respuesta, function(i, value) {
            var saldo = parseFloat(respuesta[i][3]);
            var campos = "";
            if(saldo > 0){
                campos = [respuesta[i][0],
                    respuesta[i][2]+' '+respuesta[i][1],
                    parseFloat(respuesta[i][6]).toFixed(2),
                    parseFloat(respuesta[i][3]).toFixed(2),
                    respuesta[i][4],
                    respuesta[i][5]
                ];
                tableAnti.row.add(campos).node().id = respuesta[i][0];
            }
            
        });
        tableAnti.draw(false);  
    }).fail(function(jqXHR, textStatus, errorThrown) {
        swal("Esculapio!", "Ocurrio un error consffulte con la administracion..!  " + errorThrown + " Se cargara la pantalla nuevamente para solucionar el problema.", "error");
    });
}*/

$(".body table#datatableCuentasCobrarDetalle tbody").on('change', "tr td input#ValorQuitar", function(ev) {
    var valorMaximo = parseFloat($(this).parent().parent().find('td').eq(6).html());
    var valorCobro = parseFloat($(this).val());
    if(valorCobro>valorMaximo){
        swal("Esculapio!", "El valor ingresado es mayor al valor disponible", "error").then((confirma) => {
            $(this).val('');
            $(this).focus();
        });
    }
    if(valorCobro<0){
        swal("Esculapio!", "El valor ingresado no puede ser negativo", "error").then((confirma) => {
            $(this).val('');
            $(this).focus();
        });
    }
});

$(".body table#datatableCuentasCobrarDetalle tbody").on('blur', "tr td input#ValorQuitar", function(ev) {
    if($(this).val()==''){
        $(this).val('0.00');
    }
});



$('.body table#datatableAnti tbody').on('dblclick', 'tr', function(evt) {
    var anticipo = $(this).find('td').eq(0).html();
    var valor = $(this).find('td').eq(2).html();
    var saldo = $(this).find('td').eq(3).html();
    var fecha = moment($(this).find('td').eq(5).html());
    var fechaHoy = moment($('.body').find('input#fechaHoy').val());
    var segundos = fechaHoy.diff(fecha, 'seconds');
    $('.body').find('label#IdAnticipo').text(anticipo);
    if(segundos < 86400){
        $('.body').find('button#EliminarAnti').fadeIn(1);
    }else{
        $('.body').find('button#EliminarAnti').fadeOut(1);
    }
    if(valor != saldo){
        ConsultarDetalleFactura(anticipo);
        $('.body').find('div#modal-detalle-factura').modal();
        $('.body').find('button#EliminarAnti').fadeOut(1);
    }
    var valor2 = $('.body').find('input#valorIngresado')
    var fila = $(this).parents("table").DataTable();
    fila = fila.row($(this)).data();//$(this);
    valor2.val(parseFloat(fila[2]).toFixed(2));
    valor2.prop('disabled',true);
    
});

$('.body table#datatableHistoricoAnti tbody').on('dblclick', 'tr', function(evt) {
    var anticipo = $(this).find('td').eq(0).html();
    var valor = $(this).find('td').eq(2).html();
    var saldo = $(this).find('td').eq(3).html();
    if(valor != saldo){
        ConsultarDetalleFactura(anticipo);
        $('.body').find('div#modal-detalle-factura').modal();
        $('.body').find('button#EliminarAnti').fadeOut(1);
    }
    
});

function ImprimirRecibo(consecutivo,referencia,valor,saldo,tipo) {
    var cedula = $('.body').find('strong#nombreCompleto').attr('cedulaPaciente');
    var direccion = $('.body').find('strong#nombreCompleto').attr('direccionPaciente');
    var telefono = $('.body').find('strong#nombreCompleto').attr('telefonoPaciente');
    var correo = $('.body').find('strong#nombreCompleto').attr('correoPaciente');
    var nombre = $('.body').find('strong#nombreCompleto').text();
    $.ajax({
        async: false,
        method: "POST",
        url: "Controladores/Con_Impresion_Recibo.php",
        data: {
            Requerimiento: "ImprimirRecibo",
            //Consulta: idConsulta,
            Consecutivo: consecutivo,
            Referencia: referencia,
            Cliente: nombre,
            Cedula: cedula,
            DireccionC: direccion,
            TelefonoC: telefono,
            Correo: correo,
            Valor: valor,
            Saldo: saldo,
            Tipo: tipo
        },
        dataType: 'JSON',
    }).done(function(respuesta) {}).fail(function(jqXHR, textStatus, errorThrown) {
        console.log(errorThrown)
    });
}

function ImprimirReciboEgreso(consecutivo,referencia,valor,cedula,direccion,telefono,correo,nombre) {
    $.ajax({
        async: false,
        method: "POST",
        url: "Controladores/Con_Impresion_Recibo.php",
        data: {
            Requerimiento: "ImprimirReciboEgreso",
            Consecutivo: consecutivo,
            Referencia: referencia,
            Cliente: nombre,
            Cedula: cedula,
            DireccionC: direccion,
            TelefonoC: telefono,
            Correo: correo,
            Valor: valor
        },
        dataType: 'JSON',
    }).done(function(respuesta) {}).fail(function(jqXHR, textStatus, errorThrown) {
        console.log(errorThrown)
    });
}

$(document).ready(function() {
    var puntoEmision = $('.body').find('strong#PuntoEmision').attr('puntoEmision');
    var puntoVenta = $('.body').find('strong#PuntoEmision').attr('idPuntoVenta');
    var secuencia = ConsultarUltimoRecibo(puntoVenta);
    var secuenciaEgreso = ConsultarUltimoEgreso(puntoVenta);
    $('label#SecuencialRecibo').html('IC-' + puntoEmision + "-" + zfill(secuencia, 7));
    $('label#SecuencialEgreso').html('EC-' + puntoEmision + "-" + zfill(secuenciaEgreso, 7));
    //alert(secuencia);
});

$('.body table#datatableCuentasCobrarDetalle tbody').on('dblclick', 'tr', function(evt) {
    var saldo = parseFloat($(this).find('td').eq(6).html());
    var pagar = parseFloat($(this).find('td').eq(4).html());
    var idFormaPago = $(this).find('td').eq(0).find('span').attr('idFormaPago');
    if(saldo == pagar){
        swal("Esculapio!", "El Registro no tiene ningun comprobante", "error").then((confirma) => {
            
        });
    }else{
        CargarComprobantes(idFormaPago);
        $('.body').find('div#modal-comprobante').modal();
    }
});

$('.body table#datatableCuentasCobrarDetalleHistorico tbody').on('dblclick', 'tr', function(evt) {
    var saldo = parseFloat($(this).find('td').eq(6).html());
    var pagar = parseFloat($(this).find('td').eq(4).html());
    var idFormaPago = $(this).find('td').eq(0).find('span').attr('idFormaPago');
    if(saldo == pagar){
        swal("Esculapio!", "El Registro no tiene ningun comprobante", "error").then((confirma) => {
            
        });
    }else{
        CargarComprobantes(idFormaPago);
        $('.body').find('div#modal-comprobante').modal();
    }
});

$('.body').on('click', 'div#consultasFactura', function(evt) {
    var ingreso1 = $('.body').find('input#radio1Ingreso');
    var ingreso2 = $('.body').find('input#radio2Ingreso');
    if(ingreso1.is(':checked')||ingreso2.is(':checked')){
        $('div#modal-default').modal();
    }else{
        swal("Esculapio!", "Debe seleccionar un tipo de ingreso para continuar", "error").then((confirma) => {
            
        });
    }    
});
$('.body').on('click', 'button#HistoricoCuenta', function(evt) {
    var idPaciente = $('.body').find('strong#nombreCompleto').attr('idPaciente');
    if(idPaciente==0){
        swal("Esculapio!", "Seleccione un Paciente!", "warning");
        return;
    }else{
        var cuentas = $('.body').find('input#radio1Ingreso');
        if(cuentas.is(':checked')){
            $('.body').find('div#TablaHistoricoCobrar').fadeIn(1);
            $('.body').find('div#TablaHistoricoAnticipo').fadeOut(1);
            CargarDetalleHistorico(idPaciente);
        }else{
            var tipo = $('.body').find('strong#nombreCompleto').attr('tipo');
            $('.body').find('div#TablaHistoricoAnticipo').fadeIn(1);
            $('.body').find('div#TablaHistoricoCobrar').fadeOut(1);
            if(tipo=='cliente'){
                CargarHistoricoAntiCliente(idPaciente);
            }
        }
        $('.body').find('div#modal-historico').modal();
    }   
});

//ImprimirRecibo('fgfg','sdffsd','sdffsd','sdfsdf');
function ConsultarUltimoRecibo(puntoVenta){
    var secuencia = 0;
    $.ajax({
        async: false,
          method: "POST",
          url: "Ajax/Aj_Forma_pago.php",
          data: {
              Requerimiento: "ConsultarUltimoRecibo",
              PuntoVenta: puntoVenta
          },
          dataType: 'JSON',
    }).done(function(respuesta) {
        var bandera = false; 
        $.each(respuesta, function(i, value) {
            bandera = true;
            secuencia = parseInt(respuesta[i][0].substr(-7))+1;
        });
        if(bandera==false){
            secuencia = 1;
        }
    }).fail(function(jqXHR, textStatus, errorThrown) {
        console.log(errorThrown)
    });
    return secuencia;
}

function ConsultarUltimoEgreso(puntoVenta){
    var secuencia = 0;
    $.ajax({
        async: false,
          method: "POST",
          url: "Ajax/Aj_Anticipo.php",
          data: {
              Requerimiento: "ConsultarUltimoEgreso",
              PuntoVenta: puntoVenta
          },
          dataType: 'JSON',
    }).done(function(respuesta) {
        var bandera = false; 
        $.each(respuesta, function(i, value) {
            bandera = true;
            secuencia = parseInt(respuesta[i][0].substr(-7))+1;
        });
        if(bandera==false){
            secuencia = 1;
        }
    }).fail(function(jqXHR, textStatus, errorThrown) {
        console.log(errorThrown)
    });
    return secuencia;
}

function zfill(number, width) {
    var numberOutput = Math.abs(number); /* Valor absoluto del número */
    var length = number.toString().length; /* Largo del número */ 
    var zero = "0"; /* String de cero */  
    
    if (width <= length) {
        if (number < 0) {
             return ("-" + numberOutput.toString()); 
        } else {
             return numberOutput.toString(); 
        }
    } else {
        if (number < 0) {
            return ("-" + (zero.repeat(width - length)) + numberOutput.toString()); 
        } else {
            return ((zero.repeat(width - length)) + numberOutput.toString()); 
        }
    }
}

$(".body table#datatableIngreso tbody").on('dblclick', "tr", function(ev) {
    var nombre = $(this).find('td').eq(3).html();
    var tipo = $(this).find('td').eq(1).html().substr(0,2);
    var numero = $(this).find('td').eq(1).html().replace('IC-','');
    $('.body').find('label#NombreCliente').text(nombre);
    if(tipo=="IC"){
        ConsultarIngresoDetalle(numero);
    }else{
        
    }
    $('body').find('div#modal-ingresos').modal();
});

$(".body table#datatableDetalleFactura tbody").on('dblclick', "tr", function(ev) {
    var clave = tablaDetalleFactura.row($(this)).data()[3];
    //webViewerLoad("../Rides/"+clave+".pdf");
});

//webViewerLoad(documento)

function ConsultarIngresoDetalle(numero){
    $.ajax({
        async: false,
          method: "POST",
          url: "Ajax/Aj_Cuenta.php",
          data: {
              Requerimiento: "CargarIngresosDetalle",
              Numero: numero
          },
          dataType: 'JSON',
    }).done(function(respuesta) {
        console.log(respuesta);
        tablaIngresoDetalle.clear().draw();
        var datos = '';
        $.each(respuesta, function(i, iten) {
            datos = [respuesta[i][0],"IC-"+respuesta[i][1],respuesta[i][2],parseFloat(respuesta[i][3]).toFixed(2),respuesta[i][4]];
            tablaIngresoDetalle.row.add(datos); 
        });
        tablaIngresoDetalle.draw(true);
    }).fail(function(jqXHR, textStatus, errorThrown) {
        console.log(errorThrown)
    });
}

function ConsultarDetalleFactura(anticipo){
    $.ajax({
        async: false,
          method: "POST",
          url: "Ajax/Aj_Cuenta.php",
          data: {
              Requerimiento: "CargarDetalleFacturaPorAnticipo",
              Anticipo: anticipo
          },
          dataType: 'JSON',
    }).done(function(respuesta) {
        tablaDetalleFactura.clear().draw();
        var datos = '';
        $.each(respuesta, function(i, iten) {
            datos = [respuesta[i][0],parseFloat(respuesta[i][1]).toFixed(2),parseFloat(respuesta[i][2]).toFixed(2),respuesta[i][3]];
            tablaDetalleFactura.row.add(datos); 
        });
        tablaDetalleFactura.draw(true);
    }).fail(function(jqXHR, textStatus, errorThrown) {
        console.log(errorThrown)
    });
}

function EliminaAnticipo(id) {
    $.ajax({
        method: "POST",
        url: "Ajax/Aj_Anticipo.php",
        data: {
            Requerimiento: "EliminaAnticipo",
            Id: id
        },
        dataType: 'JSON',
    }).done(function(respuesta) {
        if (respuesta[0] == true) {
            swal("Esculapio!", "Anticipo Eliminado..!", "success");
            return;
        }
        if (respuesta[0] == false) {
            swal("Esculapio!", "No Se Pudo Eliminar la Bodega se cargara la pantalla nuevamente para solucionar el problema.", "error");
            return;
        }
    }).fail(function(jqXHR, textStatus, errorThrown) {
        console.log(errorThrown)
    });
}

$(".body").on('click', "button#EliminarAnti", function(ev) {
    var id = $('.body').find('label#IdAnticipo').text();
    swal({
        title: "Esculapio",
        text: "Seguro Que Desea Eliminar?",
        icon: "warning",
        buttons: true,
        dangerMode: true,
    }).then((confirma) => {
        if (confirma) {
            EliminaAnticipo(id);
        } else {
            
        }
    });
});

$(".body").on('change', "input[nombre=CambiarBuscador]", function(ev) {
    if($(this).is(':checked')){
        $('.body').find('div#BuscadorSimple').fadeOut(1);
        $('.body').find('div#BuscadorComplejo').fadeIn(1);
    }else{
        $('.body').find('div#BuscadorComplejo').fadeOut(1);
        $('.body').find('div#BuscadorSimple').fadeIn(1);
    }
});

$(".body").on('change', "input.marcarTodos", function(ev) {
     var vector = $('.body').find("#datatableIngresoE tbody tr");
     if ($(this).prop('checked')) {
        $.each(vector, function(a) {
            var input = $(this).find('input');
            input.prop('checked',true);
        });
    }else{
        $.each(vector, function(a) {
            var input = $(this).find('input');
            input.prop('checked',false);
        });
    }
});

$('.body').on('click', 'button#GuardarEgreso', function(evt) {
    var vector = $('.body').find("#datatableIngresoE tbody tr");
    var bandera = false;
    $.each(vector, function(a) {
        var input = $(this).find('input');
        if (input.prop('checked')) {
            bandera = true;
        }
    });
    if(bandera==true){
        swal({
            title: "Esculapio",
            text: "Seguro que desea realizar esta devolución?",
            icon: "warning",
            buttons: true,
            dangerMode: false,
        }).then((confirma) => {
            var cedula = '';
            var direccion = '';
            var telefono = '';
            var correo = '';
            var nombre = '';
            var consecutivo = '';
            var vector = $('.body').find("#datatableIngresoE tbody tr");
            var puntoEmision = $('.body').find('strong#PuntoEmision').attr('puntoEmision');
            var secuencia = $('label#SecuencialEgreso').html().substr(-7);
            var numero = puntoEmision+'-'+secuencia;
            var monto = 0;
            $.each(vector, function(a) {
                var input = $(this).find('input');
                if (input.prop('checked')) {
                    monto += parseFloat($(this).find('td').eq(6).html());
                    cedula = $(this).find('td').eq(3).html();
                    direccion = tableIngresoEgreso.row($(this)).data()[8];
                    telefono = tableIngresoEgreso.row($(this)).data()[9];
                    correo = tableIngresoEgreso.row($(this)).data()[10];
                    nombre = $(this).find('td').eq(4).html();  
                    consecutivo = $(this).find('td').eq(2).html();  
                }
            });
            GuardarEgreso(numero,monto);
            //ImprimirReciboEgreso('EC-'+numero,consecutivo,monto, cedula, direccion, telefono, correo, nombre);
            //ImprimirReciboEgreso('EC-'+numero,consecutivo,monto, cedula, direccion, telefono, correo, nombre);
            printTextAreaMovimientoEgreso('EC-'+numero,consecutivo,monto, cedula, direccion, telefono, correo, nombre);
        });
    }else{
        swal("Esculapio!", "No hay informacion!", "error");
        return;
    }
    
});

function GuardarEgreso(numero,monto){
    $.ajax({
        async: false,
        method: "POST",
        url: "Ajax/Aj_Anticipo.php",
        data: {
            Requerimiento: "GuardarEgreso",
            Numero: numero,
            Monto: monto    
        },
        dataType: 'JSON',
    }).done(function(respuesta) {
        if (respuesta[0] == true) {
            swal("Esculapio!", "Egreso de Caja Registrado.!", "success");
            var fila = JSON.parse(respuesta[1]);
            var puntoEmision = $('.body').find('strong#PuntoEmision').attr('puntoEmision');
            var puntoVenta = $('.body').find('strong#PuntoEmision').attr('idPuntoVenta');
            var secuencia = ConsultarUltimoEgreso(puntoVenta);
            $('label#SecuencialEgreso').html('EC-' + puntoEmision + "-" + zfill(secuencia, 7));
            var vector = $('.body').find("#datatableIngresoE tbody tr");
            $.each(vector, function(a) {
                var input = $(this).find('input');
                var anticipo = $(this).find('td').eq(1).html();
                if (input.prop('checked')) {
                    GuardarDetalleEgreso(fila[0][0],anticipo); 
                }
            });
            $('.body').find('button#BuscarFacturaE').click();
            $('.body').find('button#BuscarFactura').click();
            return;
        }
        if (respuesta[0] == false) {
            if (respuesta[1] == 23000) {
                swal("Esculapio!", "................... !!", "error");
                return;
            }
            swal("Esculapio!", "No Se Pudo Guardar el Anticipo!, Se cargara la pantalla nuevamente para solucionar el problema." +respuesta[1], "error");
            //location.reload();
            return;
        }
    }).fail(function(jqXHR, textStatus, errorThrown) {
        swal("Esculapio!", "Ocurrio un error consulte con la admGRSDSDFSDSDFinistracion..!  " + errorThrown + " Se cargara la pantalla nuevamente para solucionar el problema.", "error");
        //location.reload();
    });
}

function GuardarDetalleEgreso(idEgreso,anticipo){
    $.ajax({
        async: false,
        method: "POST",
        url: "Ajax/Aj_Anticipo.php",
        data: {
            Requerimiento: "GuardarEgresoDetalle",
            IdEgreso: idEgreso,
            Anticipo: anticipo       
        },
        dataType: 'JSON',
    }).done(function(respuesta) {
        if (respuesta[0] == true) {
            
        }
        if (respuesta[0] == false) {
            if (respuesta[1] == 23000) {
                swal("Esculapio!", "................... !!", "error");
                return;
            }
            swal("Esculapio!", "No Se Pudo Guardar el Anticipo!, Se cargara la pantalla nuevamente para solucionar el problema." +respuesta[1], "error");
            //location.reload();
            return;
        }
    }).fail(function(jqXHR, textStatus, errorThrown) {
        swal("Esculapio!", "Ocurrio un error consulte con la admGRSDSDFSDSDFinistracion..!  " + errorThrown + " Se cargara la pantalla nuevamente para solucionar el problema.", "error");
        //location.reload();
    });
}

function printTextAreaMovimiento(consecutivo,referencia,valor,saldo,tipo) {
    var today = new Date();
    var date = today.getDate()+'/'+(today.getMonth()+1)+'/'+today.getFullYear();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    var dateTime = date+' '+time;
    var cedula = $('.body').find('strong#nombreCompleto').attr('cedulaPaciente');
    var direccion = $('.body').find('strong#nombreCompleto').attr('direccionPaciente');
    var telefono = $('.body').find('strong#nombreCompleto').attr('telefonoPaciente');
    var correo = $('.body').find('strong#nombreCompleto').attr('correoPaciente');
    var nombre = $('.body').find('strong#nombreCompleto').text();
    
    
    var cuerpo = "<html>"
+"<head>"
+"</head>"
+"<body>"
+"<div style='width:100%; margin-top: 0.8em;'><center><label style='font-weight:bold;'>"+$("#razonEmpresa").val()+"</label></center></div>"
+"<br>"
+"<div style='width:100%; '><label style='font-weight:normal; font-size: 11px;'>R.U.C "+$("#rucEmpresa").val()+"</div>"
+"<div style='width:100%; '><label style='font-weight:normal; font-size: 11px;'>"+$("#dirEmpresa").val()+"</div>"
+"<div style='width:100%; '><label style='font-weight:normal; font-size: 11x;'>Telf : "+$("#telEmpresa").val()+"</div>"
+"<div style='margin-top: 20px'>"

cuerpo += "<div style='width:100%; '><label style='font-weight:bold; font-size: 9px;'>-----------------------------------------------------------------------------------</label></div>";
if(tipo=='anticipo'){
    cuerpo += "<div style='width:100%; '><label style='font-weight:bold; font-size: 11px;'>I.C. ANTICIPO RECIBIDO</label></div>";
}else{
    cuerpo += "<div style='width:100%; '><label style='font-weight:bold; font-size: 11px;'>I.C. LIQ. CUENTA POR COBRAR</label></div>";
}

cuerpo += "<div style='width:100%; '><label style='font-weight:bold; font-size: 9px;'>--------------------------------------------------------------------------------</label></div>";

cuerpo += "<div style='width:100%; '><label style='font-weight:bold; font-size: 11px;'>TRANSACCION: "+consecutivo+"</label></div>";
if(tipo!='anticipo'){
    cuerpo += "<div style='width:100%; '><label style='font-weight:bold; font-size: 11px;'>DOC. DE REFERENCIA: "+referencia+"</label></div>";
}
cuerpo += "<div style='width:100%; '><label style='font-weight:bold; font-size: 11px;'>EMISION    : "+dateTime+"</label></div>"
+"<div style='width:100%; '><label style='font-weight:bold; font-size: 11px;'>CLIENTE    : "+nombre+"</label></div>"
+"<div style='width:100%; '><label style='font-weight:bold; font-size: 11px;'>CED-RUC    : "+cedula+"</label></div>"
+"<div style='width:100%; '><label style='font-weight:bold; font-size: 11px;'>DIRECCION  : "+direccion+"</label></div>"
+"<div style='width:100%; '><label style='font-weight:bold; font-size: 11px;'>TELEFONO   : "+telefono+"</label></div>"
+"<div style='width:100%; '><label style='font-weight:bold; font-size: 11px;'>CORREO     : "+correo+"</label></div>";
cuerpo += "<div style='width:100%; '><label style='font-weight:bold; font-size: 11px;'>TOTAL RECIBIDO</label><label style='font-weight:bold; font-size: 11px;float: right;'>"+parseFloat(valor).toFixed(2)+"</label></div>  ";
if(tipo!='anticipo'){
    cuerpo += "<div style='width:100%; '><label style='font-weight:bold; font-size: 11px;'>TOTAL SALDO</label><label style='font-weight:bold; font-size: 11px;float: right;'>"+parseFloat(saldo).toFixed(2)+"</label></div>  ";
}   

cuerpo +="<div style='width:100%;margin-top: 30px'><label style='font-weight:bold; font-size: 11px;'>SOFTWARE DESARROLLADO POR IPSE</label></div>";
    childWindow = window.open('_blank','FACTURA','scrollbars,status');
    childWindow.document.write(cuerpo);
    childWindow.document.write('<script type="text/javascript">setTimeout(function(){ window.print(); window.close();}, 500); </script>');
    childWindow.document.write('</body></html>');
}

function printTextAreaMovimientoEgreso(consecutivo,referencia,valor,cedula,direccion,telefono,correo,nombre) {
    var today = new Date();
    var date = today.getDate()+'/'+(today.getMonth()+1)+'/'+today.getFullYear();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    var dateTime = date+' '+time;
    
    
    var cuerpo = "<html>"
+"<head>"
+"</head>"
+"<body>"
+"<div style='width:100%; margin-top: 0.8em;'><center><label style='font-weight:bold;'>"+$("#razonEmpresa").val()+"</label></center></div>"
+"<br>"
+"<div style='width:100%; '><label style='font-weight:normal; font-size: 11px;'>R.U.C "+$("#rucEmpresa").val()+"</div>"
+"<div style='width:100%; '><label style='font-weight:normal; font-size: 11px;'>"+$("#dirEmpresa").val()+"</div>"
+"<div style='width:100%; '><label style='font-weight:normal; font-size: 11x;'>Telf : "+$("#telEmpresa").val()+"</div>"
+"<div style='margin-top: 20px'>"
cuerpo += "<div style='width:100%; '><label style='font-weight:bold; font-size: 9px;'>--------------------------------------------------------------------------------------------------</label></div>";
cuerpo += "<div style='width:100%; '><label style='font-weight:bold; font-size: 11px;'>EGRESO DE CAJA</label></div>";
cuerpo += "<div style='width:100%; '><label style='font-weight:bold; font-size: 9px;'>--------------------------------------------------------------------------------------------------</label></div>";
cuerpo += "<div style='width:100%; '><label style='font-weight:bold; font-size: 11px;'>TRANSACCION: "+consecutivo+"</label></div>";
cuerpo += "<div style='width:100%; '><label style='font-weight:bold; font-size: 11px;'>DOC. DE REFERENCIA: "+referencia+"</label></div>"
+"<div style='width:100%; '><label style='font-weight:bold; font-size: 11px;'>EMISION    : "+dateTime+"</label></div>"
+"<div style='width:100%; '><label style='font-weight:bold; font-size: 11px;'>CLIENTE    : "+nombre+"</label></div>"
+"<div style='width:100%; '><label style='font-weight:bold; font-size: 11px;'>CED-RUC    : "+cedula+"</label></div>"
+"<div style='width:100%; '><label style='font-weight:bold; font-size: 11px;'>DIRECCION  : "+direccion+"</label></div>"
+"<div style='width:100%; '><label style='font-weight:bold; font-size: 11px;'>TELEFONO   : "+telefono+"</label></div>"
+"<div style='width:100%; '><label style='font-weight:bold; font-size: 11px;'>CORREO     : "+correo+"</label></div>";
cuerpo += "<div style='width:100%; '><label style='font-weight:bold; font-size: 11px;'>TOTAL ENTREGADO</label><label style='font-weight:bold; font-size: 11px;float: right;'>"+parseFloat(valor).toFixed(2)+"</label></div>  ";

cuerpo +="<div style='width:100%;margin-top: 30px'><label style='font-weight:bold; font-size: 11px;'>SOFTWARE DESARROLLADO POR IPSE</label></div>";
    childWindow = window.open('_blank','FACTURA','scrollbars,status');
    childWindow.document.write(cuerpo);
    childWindow.document.write('<script type="text/javascript">setTimeout(function(){ window.print(); window.close();}, 500); </script>');
    childWindow.document.write('</body></html>');
}