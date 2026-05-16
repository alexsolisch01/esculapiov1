$(".body").on('change', "input[name=formaPago]", function(ev) {
    var f = $(this).val();
    $(".formaPago").fadeOut(0);
    if (f == 1) {
        $("#efectivo").fadeIn(200);
    }
    if (f == 2) {
        $("#cheque").fadeIn(200);
    }
    if (f == 3) {
        $("#tarjeta").fadeIn(200);
    }
    if (f == 4) {
        $("#credito").fadeIn(200);
    }
    if (f == 6) {
        $("#combinado").fadeIn(200);
    }
});

$(".body").on('click', "i.cheque", function(ev) {
    var f = $(this).val();
    var abierta = $('i.fa-plus');
    if ($('i.tarjeta').hasClass('fa-minus')) {
        $('i.tarjeta').removeClass('fa-minus')
        $('i.tarjeta').addClass('fa-plus')
        $("#ctarjeta").toggle(200);
    }
    if ($('i.credito').hasClass('fa-minus')) {
        $('i.credito').removeClass('fa-minus')
        $('i.credito').addClass('fa-plus')
        $("#ccredito").toggle(200);
    }
    if ($('i.anticipo').hasClass('fa-minus')) {
        $('i.anticipo').removeClass('fa-minus')
        $('i.anticipo').addClass('fa-plus')
        $("#aanticipo").toggle(200);
    }
    if ($('i.transferencia').hasClass('fa-minus')) {
        $('i.transferencia').removeClass('fa-minus')
        $('i.transferencia').addClass('fa-plus')
        $("#ctransferencia").toggle(200);
    }
    if ($(this).hasClass('fa-plus')) {
        $(this).removeClass('fa-plus')
        $(this).addClass('fa-minus')
    } else {
        if ($(this).hasClass('fa-minus')) {
            $(this).removeClass('fa-minus')
            $(this).addClass('fa-plus')
        }
    }
    $("#ccheque").toggle(200);
});
$(".body").on('click', "i.transferencia", function(ev) {
    var f = $(this).val();
    var abierta = $('i.fa-plus');
    if ($('i.tarjeta').hasClass('fa-minus')) {
        $('i.tarjeta').removeClass('fa-minus')
        $('i.tarjeta').addClass('fa-plus')
        $("#ctarjeta").toggle(200);
    }
    if ($('i.credito').hasClass('fa-minus')) {
        $('i.credito').removeClass('fa-minus')
        $('i.credito').addClass('fa-plus')
        $("#ccredito").toggle(200);
    }
    if ($('i.anticipo').hasClass('fa-minus')) {
        $('i.anticipo').removeClass('fa-minus')
        $('i.anticipo').addClass('fa-plus')
        $("#aanticipo").toggle(200);
    }
    if ($('i.cheque').hasClass('fa-minus')) {
        $('i.cheque').removeClass('fa-minus')
        $('i.cheque').addClass('fa-plus')
        $("#ccheque").toggle(200);
    }
    if ($(this).hasClass('fa-plus')) {
        $(this).removeClass('fa-plus')
        $(this).addClass('fa-minus')
    } else {
        if ($(this).hasClass('fa-minus')) {
            $(this).removeClass('fa-minus')
            $(this).addClass('fa-plus')
        }
    }
    $("#ctransferencia").toggle(200);
});
$(".body").on('click', "i.tarjeta", function(ev) {
    if ($('i.cheque').hasClass('fa-minus')) {
        $('i.cheque').removeClass('fa-minus')
        $('i.cheque').addClass('fa-plus')
        $("#ccheque").toggle(200);
    }
    if ($('i.credito').hasClass('fa-minus')) {
        $('i.credito').removeClass('fa-minus')
        $('i.credito').addClass('fa-plus')
        $("#ccredito").toggle(200);
    }
    if ($('i.anticipo').hasClass('fa-minus')) {
        $('i.anticipo').removeClass('fa-minus')
        $('i.anticipo').addClass('fa-plus')
        $("#aanticipo").toggle(200);
    }
    if ($('i.transferencia').hasClass('fa-minus')) {
        $('i.transferencia').removeClass('fa-minus')
        $('i.transferencia').addClass('fa-plus')
        $("#ctransferencia").toggle(200);
    }
    var f = $(this).val();
    if ($(this).hasClass('fa-plus')) {
        $(this).removeClass('fa-plus')
        $(this).addClass('fa-minus')
    } else {
        if ($(this).hasClass('fa-minus')) {
            $(this).removeClass('fa-minus')
            $(this).addClass('fa-plus')
        }
    }
    $("#ctarjeta").toggle(200);
});

$(".body").on('click', "i.anticipo", function(ev) {
    if ($('i.cheque').hasClass('fa-minus')) {
        $('i.cheque').removeClass('fa-minus')
        $('i.cheque').addClass('fa-plus')
        $("#ccheque").toggle(200);
    }
    if ($('i.tarjeta').hasClass('fa-minus')) {
        $('i.tarjeta').removeClass('fa-minus')
        $('i.tarjeta').addClass('fa-plus')
        $("#ctarjeta").toggle(200);
    }
    if ($('i.credito').hasClass('fa-minus')) {
        $('i.credito').removeClass('fa-minus')
        $('i.credito').addClass('fa-plus')
        $("#ccredito").toggle(200);
    }
    if ($('i.transferencia').hasClass('fa-minus')) {
        $('i.transferencia').removeClass('fa-minus')
        $('i.transferencia').addClass('fa-plus')
        $("#ctransferencia").toggle(200);
    }
    var f = $(this).val();
    if ($(this).hasClass('fa-plus')) {
        $(this).removeClass('fa-plus')
        $(this).addClass('fa-minus')
    } else {
        if ($(this).hasClass('fa-minus')) {
            $(this).removeClass('fa-minus')
            $(this).addClass('fa-plus')
        }
    }
    $("#aanticipo").toggle(200);
    try {
        var tid = setInterval(function() {
            tablaAnticipo.columns.adjust().draw();
            clearInterval(tid);
        }, 500);
    } catch (error) {
        console.log(error);
    }
});
var totalcobrado = 0;
var totalcobrado2 = 0;
var totalcobrado3 = 0;
var totalcobrado5 = 0;
var totalcobrado6 = 0;

function CalcularCobro(efectivo, cheque, tarjeta, anticipo,transferencia) {
    valorRecibidoCuenta = (isNaN(parseFloat(efectivo))) ? 0 : parseFloat(efectivo);
    valorRecibidoChequeCuenta = 0;
    valorRecibidoTarjetaCuenta = 0;
    valorRecibidoAnticipoCuenta = 0;
    valorTransferencia =(isNaN(parseFloat(transferencia))) ? 0 : parseFloat(transferencia);
    try {
        valorRecibidoChequeCuenta = (isNaN(parseFloat(cheque))) ? 0 : parseFloat(cheque);
    } catch (error) {}
    try {
        valorRecibidoTarjetaCuenta = (isNaN(parseFloat(tarjeta))) ? 0 : parseFloat(tarjeta);
    } catch (error) {}
    try {
        valorRecibidoAnticipoCuenta = (isNaN(parseFloat(anticipo))) ? 0 : parseFloat(anticipo);
    } catch (error) {}
    $('span#CambioConsulta').html('$ 0.0');
    $('span#totalCobradoCobrar').html('$ 0.0');
    var totalcancelar = parseFloat($('span#totalPagarCobrar').html().replace('$', ''));
    var cambio = parseFloat(valorRecibidoCuenta) - totalcancelar;
    var diferencia = totalcancelar - valorRecibidoCuenta;
    if (totalcancelar <= valorRecibidoCuenta) {
        confirmaPago = true;
        $('span#CambioConsulta').html('$ ' + cambio.toFixed(2));
        $('span#totalCobradoCobrar').html('$ ' + parseFloat(valorRecibidoCuenta).toFixed(2));
        if (valorRecibidoChequeCuenta == 0) {
            $('i.cheque').parent().fadeOut(200);
            $('div#ccheque').fadeOut(200);
        }
        if (valorRecibidoTarjetaCuenta == 0) {
            $('i.tarjeta').parent().fadeOut(200);
            $('div#ctarjeta').fadeOut(200);
        }
        if (valorRecibidoAnticipoCuenta == 0) {
            $('i.anticipo').parent().fadeOut(200);
            $('div#aanticipo').fadeOut(200);
        }
        if (valorTransferencia == 0) {
            $('i.transferencia').parent().fadeOut(200);
            $('div#ctransferencia').fadeOut(200);
        }
        //$('i.credito').parent().fadeOut(200);
        totalcobrado = totalcancelar;
    } else {
        $('span#totalCobradoCobrar').html('$ ' + parseFloat(valorRecibidoCuenta).toFixed(2));
        totalcobrado = parseFloat(valorRecibidoCuenta);
        $('i.cheque').parent().fadeIn(200);
        $('i.tarjeta').parent().fadeIn(200);
        $('i.anticipo').parent().fadeIn(200);
        $('i.transferencia').parent().fadeIn(200);
        confirmaPago = false;
    }
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    if (parseFloat(valorRecibidoChequeCuenta) < 1) {
        $("#totalCheque").html('$ 0.0');
        $('span#totalCobradoCobrar').html('$ ' + parseFloat(valorRecibidoCuenta).toFixed(2));
        totalcobrado2 = totalcobrado;
        totalcobrado = 0;
    } else {
        $("#totalCheque").html('$ ' + parseFloat(valorRecibidoChequeCuenta).toFixed(2));
        var totalcancelar = parseFloat($('span#totalPagarCobrar').html().replace('$', ''));
        totalcobrado2 = parseFloat(valorRecibidoChequeCuenta) + totalcobrado;
        var diferencia = totalcobrado2 - totalcancelar;
        if (totalcancelar <= parseFloat(totalcobrado2)) {
            confirmaPago = true;
            if (valorRecibidoCuenta == 0) {
                $('div.efectivo').fadeOut(200);
            }
            if (valorRecibidoTarjetaCuenta == 0) {
                $('i.tarjeta').parent().fadeOut(200);
                $('div#ctarjeta').fadeOut(200);
            }
            if (valorRecibidoAnticipoCuenta == 0) {
                $('i.anticipo').parent().fadeOut(200);
                $('div#aanticipo').fadeOut(200);
            }
            if (valorTransferencia == 0) {
                $('i.transferencia').parent().fadeOut(200);
                $('div#ctransferencia').fadeOut(200);
            }
            $('span#CambioConsulta').html('$ ' + diferencia.toFixed(2));
            $('span#totalCobradoCobrar').html('$ ' + parseFloat(totalcancelar).toFixed(2));
        } else {
            $('span#totalCobradoCobrar').html('$ ' + parseFloat(totalcobrado2).toFixed(2));
            $('div.efectivo').fadeIn(200);
            $('i.tarjeta').parent().fadeIn(200);
            $('i.anticipo').parent().fadeIn(200);
            $('i.transferencia').parent().fadeIn(200);
            confirmaPago = false;
        }
    }
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    if (parseFloat(valorRecibidoTarjetaCuenta) < 1) {
        $("#totalTarjeta").html('$ 0.0');
        $('span#totalCobradoCobrar').html('$ ' + parseFloat(totalcobrado2).toFixed(2));
        totalcobrado3 = totalcobrado2;
        totalcobrado2 = 0;
    } else {
        $("#totalTarjeta").html('$ ' + parseFloat(valorRecibidoTarjetaCuenta).toFixed(2));
        var totalcancelar = parseFloat($('span#totalPagarCobrar').html().replace('$', ''));
        totalcobrado3 = parseFloat(valorRecibidoTarjetaCuenta) + totalcobrado2;
        var diferenciaTarjeta = totalcobrado3 - totalcancelar;
        if (totalcancelar <= parseFloat(totalcobrado3)) {
            confirmaPago = true;
            if (valorRecibidoCuenta == 0) {
                $('div.efectivo').fadeOut(200);
            }
            if (valorRecibidoChequeCuenta == 0) {
                $('i.cheque').parent().fadeOut(200);
                $('div#ccheque').fadeOut(200);
            }
            if (valorRecibidoAnticipoCuenta == 0) {
                $('i.anticipo').parent().fadeOut(200);
                $('div#aanticipo').fadeOut(200);
            }
            if (valorTransferencia == 0) {
                $('i.transferencia').parent().fadeOut(200);
                $('div#ctransferencia').fadeOut(200);
            }
            $('span#CambioConsulta').html('$ ' + diferenciaTarjeta.toFixed(2));
            $('span#totalCobradoCobrar').html('$ ' + parseFloat(totalcancelar).toFixed(2));
        } else {
            $('span#totalCobradoCobrar').html('$ ' + parseFloat(totalcobrado3).toFixed(2));
            $('div.efectivo').fadeIn(200);
            $('i.cheque').parent().fadeIn(200);
            $('i.tarjeta').parent().fadeIn(200);
            $('i.anticipo').parent().fadeIn(200);
            $('i.transferencia').parent().fadeIn(200);
            confirmaPago = false;
        }
    }
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    if (parseFloat(valorRecibidoAnticipoCuenta) < 1) {
        $("#totalAnticipo").html('$ 0.0');
        $('span#totalCobradoCobrar').html('$ ' + parseFloat(totalcobrado3).toFixed(2));
        totalcobrado4 = totalcobrado3
        totalcobrado3= 0;
    } else {
        //$("#totalAnticipo").html('$ ' + parseFloat(valorRecibidoAnticipo).toFixed(2));
        var totalcancelar = parseFloat($('span#totalPagarCobrar').html().replace('$', ''));
        totalcobrado5 = parseFloat(valorRecibidoAnticipoCuenta) + totalcobrado4;
        var diferenciaAnticipo = totalcobrado5 - totalcancelar;
        if (totalcancelar <= parseFloat(totalcobrado5)) {
            confirmaPago = true;
            if (valorRecibidoCuenta == 0) {
                $('div.efectivo').fadeOut(200);
            }
            if (valorRecibidoChequeCuenta == 0) {
                $('i.cheque').parent().fadeOut(200);
                $('div#ccheque').fadeOut(200);
            }
            if (valorRecibidoTarjetaCuenta == 0) {
                $('i.tarjeta').parent().fadeOut(200);
                $('div#ctarjeta').fadeOut(200);
            }
            if (valorTransferencia == 0) {
                $('i.transferencia').parent().fadeOut(200);
                $('div#ctransferencia').fadeOut(200);
            }
            $('span#CambioConsulta').html('$ ' + diferenciaAnticipo.toFixed(2));
            $('span#totalCobradoCobrar').html('$ ' + parseFloat(totalcancelar).toFixed(2));
        } else {
            $('span#totalCobradoCobrar').html('$ ' + parseFloat(totalcobrado5).toFixed(2));
            $('div.efectivo').fadeIn(200);
            $('i.cheque').parent().fadeIn(200);
            $('i.tarjeta').parent().fadeIn(200);
            $('i.anticipo').parent().fadeIn(200);
            $('i.transferencia').parent().fadeIn(200);
            confirmaPago = false;
        }
    }

    if (parseFloat(valorTransferencia) < 1) {
        $("#totalTransfencia").html('$ 0.0');
        $('span#totalCobradoCobrar').html('$ ' + parseFloat(totalcobrado5).toFixed(2));
        totalcobrado6 = totalcobrado5;
        totalcobrado5 = 0;
    } else {
        $("#totalTransfencia").html('$ ' + parseFloat(valorTransferencia).toFixed(2));
        var totalcancelar = parseFloat($('span#totalPagarCobrar').html().replace('$', ''));
        totalcobrado6 = parseFloat(valorTransferencia) + totalcobrado5;
        var diferenciaTransferencia = totalcobrado6 - totalcancelar;
        if (totalcancelar <= parseFloat(totalcobrado6)) {
            confirmaPago = true;
            if (valorRecibidoCuenta == 0) {
                $('div.efectivo').fadeOut(200);
            }
            if (valorRecibidoChequeCuenta == 0) {
                $('i.cheque').parent().fadeOut(200);
                $('div#ccheque').fadeOut(200);
            }
            if (valorRecibidoTarjetaCuenta == 0) {
                $('i.tarjeta').parent().fadeOut(200);
                $('div#ctarjeta').fadeOut(200);
            }
            if (valorRecibidoAnticipoCuenta == 0) {
                $('i.anticipo').parent().fadeOut(200);
                $('div#aanticipo').fadeOut(200);
            }
            if (valorTransferencia == 0) {
                $('i.transferencia').parent().fadeOut(200);
                $('div#ctransferencia').fadeOut(200);
            }
            $('span#CambioConsulta').html('$ ' + diferenciaTransferencia.toFixed(2));
            $('span#totalCobradoCobrar').html('$ ' + parseFloat(totalcancelar).toFixed(2));
        } else {
            $('span#totalCobradoCobrar').html('$ ' + parseFloat(totalcobrado6).toFixed(2));
            $('div.efectivo').fadeIn(200);
            $('i.cheque').parent().fadeIn(200);
            $('i.tarjeta').parent().fadeIn(200);
            $('i.credito').parent().fadeIn(200);
            $('i.anticipo').parent().fadeIn(200);
            $('i.transferencia').parent().fadeIn(200);            
            confirmaPago = false;
        }
    }
}

$(".body").on('keyup', "input#ValorRecibidoConsulta", function(evt) {
    CalcularCobro($(this).val(), $('#ValorCheque').val(), $("#ValorTarjeta").val(),$('#totalAnticipo').text().replace('$',''),$("#ValorTrasferencia").val());
    if (evt.keyCode == 13) {
        $('button#CobrarConsultaCobrar').click();
    }
});
$(".body").on('keyup', "input#ValorCheque", function(evt) {
    CalcularCobro($('#ValorRecibidoConsulta').val(), $('#ValorCheque').val(), $("#ValorTarjeta").val(),$('#totalAnticipo').text().replace('$',''),$("#ValorTrasferencia").val());
    if (evt.keyCode == 13) {
        $('button#CobrarConsultaCobrar').click();
    }
});
$(".body").on('keyup', "input#ValorTarjeta", function(evt) {
    CalcularCobro($('#ValorRecibidoConsulta').val(), $('#ValorCheque').val(), $("#ValorTarjeta").val(),$('#totalAnticipo').text().replace('$',''),$("#ValorTrasferencia").val());
    if (evt.keyCode == 13) {
        $('button#CobrarConsultaCobrar').click();
    }
});

$(".body").on('keyup', "input#ValorTrasferencia", function(ev) {
    CalcularCobro($('#ValorRecibidoConsulta').val(), $('#ValorCheque').val(), $("#ValorTarjeta").val(),$('#totalAnticipo').text().replace('$',''),$("#ValorTrasferencia").val());
    if (ev.keyCode == 13) {
        $('button#CobrarConsultaCobrar').click();
    }
});

function GuardarPagosCuentas(valorRecibidoCuenta, valorRecibidoChequeCuenta, valorRecibidoTarjetaCuenta, valorRecibidoAnticipoCuenta,valorTransferencia) {
    var idPaciente = $('.body').find('strong#nombreCompleto').attr('idPaciente');
    var puntoEmision = $('.body').find('strong#PuntoEmision').attr('puntoEmision');
    var secuencia = $('label#SecuencialRecibo').html().substr(-7);
    if (valorRecibidoCuenta > 0) {
        
        var pago = valorRecibidoCuenta - parseFloat($("span#CambioConsulta").html().replace("$",""));
        GuardarIngresoCaja(idPaciente,pago,puntoEmision+'-'+secuencia,'EFECTIVO',idAnticipo);
        
        GuardarPagoEfectivo(pago,idIngreso);
    }
    if (valorRecibidoChequeCuenta > 0) {
        GuardarIngresoCaja(idPaciente,valorRecibidoChequeCuenta,puntoEmision+'-'+secuencia,'CHEQUE',idAnticipo);
        
        GuardarPagoCheque(valorRecibidoChequeCuenta,idIngreso)
    }
    if (valorRecibidoTarjetaCuenta > 0) {
        
        GuardarIngresoCaja(idPaciente,valorRecibidoTarjetaCuenta,puntoEmision+'-'+secuencia,'TARJETA',idAnticipo);
        
        GuardarPagoTarjeta(valorRecibidoTarjetaCuenta,idIngreso)
    }
    if (valorTransferencia > 0) {
        
        GuardarIngresoCaja(idPaciente,valorTransferencia,puntoEmision+'-'+secuencia,'TRANSFERENCIA',idAnticipo);
        
        GuardarPagoTransferencia(valorTransferencia,idIngreso)
    }
    if (valorRecibidoAnticipoCuenta > 0) {
        
        GuardarIngresoCaja(idPaciente,valorRecibidoAnticipo,puntoEmision+'-'+secuencia,'ANTICIPO',idAnticipo);
        
        GuardarPagoAnticipo(valorRecibidoAnticipoCuenta,idIngreso)
    }
    LimpiarCobrar();
}

function GuardarPagoEfectivo(valorRecibidoCuenta,idIngresoC) {
    $.ajax({
        async: false,
        method: "POST",
        url: "Ajax/Aj_Forma_pago.php",
        data: {
            Requerimiento: "GuardarPagoEfectivoCuenta",
            Monto: valorRecibidoCuenta,
            Ingreso: idIngresoC
        },
        dataType: 'JSON',
    }).done(function(respuesta) {
        if (respuesta[0] == true) {
            var fila = JSON.parse(respuesta[1]);
            //idFormaPago = fila[0][0];
            var cuentas = $('.body').find('input#radio1Ingreso');
            if(cuentas.is(':checked')){
               GuardarIngresoAbono(idIngresoC,idFormaPago);
            }
            return;
        }
        if (respuesta[0] == false) {
            swal("Esculapio!", "Ocurrio un error. " + respuesta[1], "error");
            return;
        }
    }).fail(function(jqXHR, textStatus, errorThrown) {
        swal("Esculapio!", "Ocurrio un error consulte con la administracion..!  " + errorThrown + " Se cargara la pantalla nuevamente para solucionar el problema.", "error");
    });
}

function GuardarPagoCheque(valorRecibidoChequeCuenta,idIngresoC) {
    
    $.ajax({
        async: false,
        method: "POST",
        url: "Ajax/Aj_Forma_pago.php",
        data: {
            Requerimiento: "GuardarPagoChequeCuenta",
            Monto: valorRecibidoChequeCuenta,
            Banco: $("select#banco").val(),
            Numero: $("#NumeroCheque").val(),
            Cuenta: $("#CuentaCheque").val(),
            Fecha: $("#FechaCheque").val(),
            Referencia: $("#ReferenciaCheque").val(),
            Ingreso: idIngresoC
        },
        dataType: 'JSON',
    }).done(function(respuesta) {
        if (respuesta[0] == true) {
            var fila = JSON.parse(respuesta[1]);
            //idFormaPago = fila[0][0];
            var cuentas = $('.body').find('input#radio1Ingreso');
            if(cuentas.is(':checked')){
               GuardarIngresoAbono(idIngresoC,idFormaPago);
            }
            return;
        }
        if (respuesta[0] == false) {
            swal("Esculapio!", "Ocurrio un error. " + respuesta[1], "error");
            return;
        }
    }).fail(function(jqXHR, textStatus, errorThrown) {
        swal("Esculapio!", "Ocurrio un error consulte con la administracion..!  " + errorThrown + " Se cargara la pantalla nuevamente para solucionar el problema.", "error");
    });
}

function GuardarPagoTarjeta(valorRecibidoTarjetaCuenta,idIngresoC) {
    $.ajax({
        async: false,
        method: "POST",
        url: "Ajax/Aj_Forma_pago.php",
        data: {
            Requerimiento: "GuardarPagoTarjetaCuenta",
            Monto: valorRecibidoTarjetaCuenta,
            Entidad: $("#EntidadTarjeta").val(),
            Fecha: $("#FechaTarjeta").val(),
            Numero: $("#NumeroReferencia").val(),
            Recargo: $("#RecargoTarjeta").val(),
            Ingreso: idIngresoC
        },
        dataType: 'JSON',
    }).done(function(respuesta) {
        if (respuesta[0] == true) {
            var fila = JSON.parse(respuesta[1]);
            //idFormaPago = fila[0][0];
            var cuentas = $('.body').find('input#radio1Ingreso');
            if(cuentas.is(':checked')){
               GuardarIngresoAbono(idIngresoC,idFormaPago);
            }
            return;
        }
        if (respuesta[0] == false) {
            swal("Esculapio!", "Ocurrio un error. " + respuesta[1], "error");
            return;
        }
    }).fail(function(jqXHR, textStatus, errorThrown) {
        swal("Esculapio!", "Ocurrio un error consulte con la administracion..!  " + errorThrown + " Se cargara la pantalla nuevamente para solucionar el problema.", "error");
    });
}
function GuardarPagoTransferencia(valorTransferencia,idIngresoC) {
    $.ajax({
        async: false,
        method: "POST",
        url: "Ajax/Aj_Forma_pago.php",
        data: {
            Requerimiento: "GuardarPagoTransferenciaCuenta",
            Monto: valorTransferencia,
            Banco: $("select#bancoTrans").val(),
            Agencia: $("#AgenciaTrans").val(),            
            Fecha: $("#FechaTransferencia").val(),
            Observaciones: $("#ObsevacionTransferencia").val(),
            Ingreso: idIngresoC
        },
        dataType: 'JSON',
    }).done(function(respuesta) {
        if (respuesta[0] == true) {
            var fila = JSON.parse(respuesta[1]);
            //idFormaPago = fila[0][0];
            var cuentas = $('.body').find('input#radio1Ingreso');
            if(cuentas.is(':checked')){
               GuardarIngresoAbono(idIngresoC,idFormaPago);
            }
            return;
        }
        if (respuesta[0] == false) {
            swal("Esculapio!", "Ocurrio un error. " + respuesta[1], "error");
            return;
        }
    }).fail(function(jqXHR, textStatus, errorThrown) {
        swal("Esculapio!", "Ocurrio un error consulte con la administracion..!  " + errorThrown + " Se cargara la pantalla nuevamente para solucionar el problema.", "error");
    });
}


function GuardarPagoAnticipo(valorRecibidoAnticipoCuenta,idIngresoC) {
    $.ajax({
        async: false,
        method: "POST",
        url: "Ajax/Aj_Forma_pago.php",
        data: {
            Requerimiento: "GuardarPagoAnticipoCuenta",
            MontoAnticipo: valorRecibidoAnticipoCuenta,
            Ingreso: idIngresoC
        },
        dataType: 'JSON',
    }).done(function(respuesta) {
        if (respuesta[0] == true) {
            var fila = JSON.parse(respuesta[1]);
            //idFormaPago = fila[0][0];
            var cuentas = $('.body').find('input#radio1Ingreso');
            if(cuentas.is(':checked')){
               GuardarIngresoAbono(idIngresoC,idFormaPago);
            }
            return;
        }
        if (respuesta[0] == false) {
            swal("Esculapio!", "Ocurrio un error. " + respuesta[1], "error");
            return;
        }
    }).fail(function(jqXHR, textStatus, errorThrown) {
        swal("Esculapio!", "Ocurrio un error consulte con la administracion..!  " + errorThrown + " Se cargara la pantalla nuevamente para solucionar el problema.", "error");
    });
    var vector = $('.body').find("#datatableAnticipo tbody tr");
    $.each(vector, function(a) {
        var valor = parseFloat($(this).find('td').eq(2).find('input').val());
        var idAnticipo = $(this).find('td').eq(2).find('input').attr('idAnticipo');

        if(valor>0){
            ActualizarAnticipos(idAnticipo,valor);
        }
    });
}

function ActualizarAnticipos(idAnticipo,valor){
    $.ajax({
        method: "POST",
        url: "Ajax/Aj_Forma_pago.php",
        data: {
            Requerimiento: "ActualizarAnticipo",
            Anticipo: idAnticipo,
            Valor: valor
        },
        dataType: 'JSON',
    }).done(function(respuesta) {
        if (respuesta[0] == true) {
            return;
        }
        if (respuesta[0] == false) {
            swal("Esculapio!", "Ocurrio un error. " + respuesta[1], "error");
            return;
        }
    }).fail(function(jqXHR, textStatus, errorThrown) {
        swal("Esculapio!", "Ocurrio un error consulte con la administracion..!  " + errorThrown + " Se cargara la pantalla nuevamente para solucionar el problema.", "error");
    });
}

$(".body table#datatableAnticipo tbody").on('change', "tr td input[type=checkbox]", function(ev) {
    var cobrado = parseFloat($('span#totalCobradoCobrar').html().replace('$', ''));
    var cancelar = parseFloat($('span#totalPagarCobrar').html().replace('$', ''));
    var monto = parseFloat($(this).parent().parent().find('td').eq(0).html());
    var pendiente = cancelar - cobrado;
    var sumar = parseFloat($('span#totalAnticipo').html().replace('$ ', ''));
    var restar = 0;
    if (monto < pendiente) {
        pendiente = monto;
    }
    if ($(this).is(':checked')) {
        $(this).parent().parent().find('td').eq(2).find('input').val(parseFloat(pendiente).toFixed(2));
        var valor = parseFloat($(this).parent().parent().find('td').eq(2).find('input').val());
        sumar = sumar + valor;
        $('.body').find('span#totalAnticipo').text('$ ' + parseFloat(sumar).toFixed(2));
    } else {
        var valor = parseFloat($(this).parent().parent().find('td').eq(2).find('input').val());
        restar = sumar - valor;
        $('.body').find('span#totalAnticipo').text('$ ' + parseFloat(restar).toFixed(2));
        $(this).parent().parent().find('td').eq(2).find('input').val('0.00');
    }

    CalcularCobro($('#ValorRecibidoConsulta').val(), $('#ValorCheque').val(), $("#ValorTarjeta").val(),$('#totalAnticipo').text().replace('$',''),$("#ValorTrasferencia").val());
});

$(".body table#datatableAnticipo tbody").on('change', "tr td input#ValorQuitar", function(ev) {
    var valorMaximo = parseFloat($(this).parent().parent().find('td').eq(0).html());
    var valorCobro = parseFloat($(this).val());
    if(valorCobro>valorMaximo){
        swal("Esculapio!", "El valor ingresado es mayor al valor disponible", "error").then((confirma) => {
            $('.body').find('span#totalAnticipo').text('$ 0.0');
            $(this).val('0.00');
            $(this).focus();
        });
    }
    var cobrado = parseFloat($('span#totalCobradoCobrar').html().replace('$', ''));
    var cancelar = parseFloat($('span#totalPagarCobrar').html().replace('$', ''));
    var pendiente = cancelar - cobrado;
    var sumar = TotalACobrarAnticipos();

    if (valorCobro <= pendiente) {
        //pendiente = pendiente - valorCobro;
        
        $('.body').find('span#totalAnticipo').text('$ ' + parseFloat(sumar).toFixed(2));
        CalcularCobro($('#ValorRecibidoConsulta').val(), $('#ValorCheque').val(), $("#ValorTarjeta").val(),$('#totalAnticipo').text().replace('$',''),$("#ValorTrasferencia").val());
    }else{
        swal("Esculapio!", "El valor ingresado es mayor al total a pagar", "error").then((confirma) => {
            $('.body').find('span#totalAnticipo').text('$ 0.0');
            $(this).val('0.00');
            $(this).focus();
        });
        return;
    }
    
});

function TotalACobrarAnticipos(){
    var vector = $('.body').find("#datatableAnticipo tbody tr");
    var total =0;
    $.each(vector, function(a) {
        total += parseFloat($(this).find("td").eq(2).find('input').val());
    });
    return total;
}

$(".body table#datatableAnticipo tbody").on('blur', "tr td input#ValorQuitar", function(ev) {
    if($(this).val()==''){
        $(this).val('0.00');
    }
});

function LimpiarCobrar(){
    var fechaHoy = $('.body').find('input#FechaActualEsculapio').val();
    $('.body').find('span#totalAnticipo').text('$ 0.0');
    $('.body').find('span#totalCredito').text('$ 0.0');
    $('.body').find('span#totalTarjeta').text('$ 0.0');
    $('.body').find('span#totalCheque').text('$ 0.0');
    $('.body').find('span#totalCobradoCobrar').text('$ 0.00');
    $('.body').find('input#NumeroCheque').val('');
    $('.body').find('input#CuentaCheque').val('');
    $('.body').find('input#FechaCheque').val(fechaHoy);
    $('.body').find('input#ValorCheque').val('');
    $('.body').find('input#ReferenciaCheque').val('');
    $('.body').find('select#EntidadTarjeta').val('0');
    $('.body').find('input#FechaTarjeta').val(fechaHoy);
    $('.body').find('input#NumeroReferencia').val('');
    $('.body').find('input#ValorTarjeta').val('');
    $('.body').find('input#RecargoTarjeta').val('');
    $('.body').find('input#FechaInicio').val(fechaHoy);
    $('.body').find('input#montoT').val('');
    $('.body').find('input#Pagos').val('');
    $('.body').find('input#ValorRecibidoConsulta').val('');
    $('.body').find('select#banco').val('0');
    $('.body').find('select#cbmPeriodoOdont').val('0');
    $('.selectpicker').selectpicker('refresh');
    try {
        tablaPagos.clear().draw();
    } catch (error) {}
    try {
        tablaAnticipo.clear().draw();
    } catch (error) {}
    $('div.efectivo').fadeIn(200);
    $('i.credito').parent().fadeIn(200);
    $('i.tarjeta').parent().fadeIn(200);
    $('i.anticipo').parent().fadeIn(200);
    $('i.cheque').parent().fadeIn(200);
    $('div#ccheque').fadeOut(200);
    $('div#ctarjeta').fadeOut(200);
    $('div#ccredito').fadeOut(200);
    $('div#aanticipo').fadeOut(200);
    if ($('i.tarjeta').hasClass('fa-minus')) {
        $('i.tarjeta').removeClass('fa-minus')
        $('i.tarjeta').addClass('fa-plus')
    }
    if ($('i.credito').hasClass('fa-minus')) {
        $('i.credito').removeClass('fa-minus')
        $('i.credito').addClass('fa-plus')
    }
    if ($('i.anticipo').hasClass('fa-minus')) {
        $('i.anticipo').removeClass('fa-minus')
        $('i.anticipo').addClass('fa-plus')
    }
    if ($('i.cheque').hasClass('fa-minus')) {
        $('i.cheque').removeClass('fa-minus')
        $('i.cheque').addClass('fa-plus')
    }
}