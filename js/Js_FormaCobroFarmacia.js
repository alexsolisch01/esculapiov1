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
$(".body").on('click', "i.credito", function(ev) {
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
    if ($('i.anticipo').hasClass('fa-minus')) {
        $('i.anticipo').removeClass('fa-minus')
        $('i.anticipo').addClass('fa-plus')
        $("#aanticipo").toggle(200);
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
    $("#ccredito").toggle(200);
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
var totalcobrado4 = 0;
var totalcobrado5 = 0;
var totalcobrado6 = 0;


function CalcularCobro(efectivo, cheque, tarjeta, anticipo, transferencia) {
    valorRecibido = (isNaN(parseFloat(efectivo))) ? 0 : parseFloat(efectivo);
    valorRecibidoCheque = 0;
    valorRecibidoTarjeta = 0;
    valorRecibidoAnticipo = 0;
    valorTransferencia = (isNaN(parseFloat(transferencia))) ? 0 : parseFloat(transferencia);
    valorCredito = (isNaN(parseFloat($('#montoT').val()))) ? 0 : parseFloat($('#montoT').val());
    try {
        valorRecibidoCheque = (isNaN(parseFloat(cheque))) ? 0 : parseFloat(cheque);
    } catch (error) {}
    try {
        valorRecibidoTarjeta = (isNaN(parseFloat(tarjeta))) ? 0 : parseFloat(tarjeta);
    } catch (error) {}
    try {
        valorRecibidoAnticipo = (isNaN(parseFloat(anticipo))) ? 0 : parseFloat(anticipo);
    } catch (error) {}
    $('span#CambioConsulta').html('$ 0.0');
    $('span#totalCobradoCobrar').html('$ 0.0');
    var totalcancelar = parseFloat($('span#totalPagarCobrar').html().replace('$', ''));
    var cambio = parseFloat(valorRecibido) - totalcancelar;
    var diferencia = totalcancelar - valorRecibido;
    diferencia = parseFloat(diferencia).toFixed(2);
    diferencia = parseFloat(diferencia);
    if (totalcancelar <= valorRecibido) {
        confirmaPago = true;
        cobrar = true;
        $('span#CambioConsulta').html('$ ' + cambio.toFixed(2));
        $('span#totalCobradoCobrar').html('$ ' + parseFloat(valorRecibido).toFixed(2));
        if (valorRecibidoCheque == 0) {
            $('i.cheque').parent().fadeOut(200);
            $('div#ccheque').fadeOut(200);
        }
        if (valorRecibidoTarjeta == 0) {
            $('i.tarjeta').parent().fadeOut(200);
            $('div#ctarjeta').fadeOut(200);
        }
        if (valorCredito == 0) {
            $('i.credito').parent().fadeOut(200);
            $('div#ccredito').fadeOut(200);
        }
        if (valorRecibidoAnticipo == 0) {
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
        $('span#totalCobradoCobrar').html('$ ' + parseFloat(valorRecibido).toFixed(2));
        totalcobrado = parseFloat(valorRecibido);
        $('i.cheque').parent().fadeIn(200);
        $('i.credito').parent().fadeIn(200);
        $('i.tarjeta').parent().fadeIn(200);
        $('i.anticipo').parent().fadeIn(200);
        $('i.transferencia').parent().fadeIn(200);
        if ($('strong#nombreCompletoCliente').attr('idCliente') == '1' && $('strong#nombreCompletoCliente').html() == "CONSUMIDOR FINAL") {
            $('span#totalCredito').parent().fadeOut(0);
        } else {
            $('span#totalCredito').parent().fadeIn(0);
        }
        //$('i.credito').parent().fadeIn(200);
        confirmaPago = false;
    }
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    if (parseFloat(valorRecibidoCheque) < 1) {
        $("#totalCheque").html('$ 0.0');
        $('span#totalCobradoCobrar').html('$ ' + parseFloat(valorRecibido).toFixed(2));
        totalcobrado2 = totalcobrado;
        totalcobrado = 0;
    } else {
        $("#totalCheque").html('$ ' + parseFloat(valorRecibidoCheque).toFixed(2));
        var totalcancelar = parseFloat($('span#totalPagarCobrar').html().replace('$', ''));
        totalcobrado2 = parseFloat(valorRecibidoCheque) + totalcobrado;
        var diferencia = totalcobrado2 - totalcancelar;
        if (totalcancelar <= parseFloat(totalcobrado2)) {
            confirmaPago = true;
            if (valorRecibido == 0) {
                $('div.efectivo').fadeOut(200);
            }
            if (valorRecibidoTarjeta == 0) {
                $('i.tarjeta').parent().fadeOut(200);
                $('div#ctarjeta').fadeOut(200);
            }
            if (valorCredito == 0) {
                $('i.credito').parent().fadeOut(200);
                $('div#ccredito').fadeOut(200);
            }
            if (valorRecibidoAnticipo == 0) {
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
            $('i.credito').parent().fadeIn(200);
            $('i.tarjeta').parent().fadeIn(200);
            $('i.anticipo').parent().fadeIn(200);
            $('i.transferencia').parent().fadeIn(200);
            if ($('strong#nombreCompletoCliente').attr('idCliente') == '1' && $('strong#nombreCompletoCliente').html() == "CONSUMIDOR FINAL") {
                $('span#totalCredito').parent().fadeOut(0);
            } else {
                $('span#totalCredito').parent().fadeIn(0);
            }
            confirmaPago = false;
        }
    }
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    if (parseFloat(valorRecibidoTarjeta) < 1) {
        $("#totalTarjeta").html('$ 0.0');
        $('span#totalCobradoCobrar').html('$ ' + parseFloat(totalcobrado2).toFixed(2));
        totalcobrado3 = totalcobrado2;
        totalcobrado2 = 0;
    } else {
        $("#totalTarjeta").html('$ ' + parseFloat(valorRecibidoTarjeta).toFixed(2));
        var totalcancelar = parseFloat($('span#totalPagarCobrar').html().replace('$', ''));
        totalcobrado3 = parseFloat(valorRecibidoTarjeta) + totalcobrado2;
        var diferenciaTarjeta = totalcobrado3 - totalcancelar;
        if (totalcancelar <= parseFloat(totalcobrado3)) {
            confirmaPago = true;
            if (valorRecibido == 0) {
                $('div.efectivo').fadeOut(200);
            }
            if (valorRecibidoCheque == 0) {
                $('i.cheque').parent().fadeOut(200);
                $('div#ccheque').fadeOut(200);
            }
            if (valorCredito == 0) {
                $('i.credito').parent().fadeOut(200);
                $('div#ccredito').fadeOut(200);
            }
            if (valorRecibidoAnticipo == 0) {
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
            $('i.credito').parent().fadeIn(200);
            $('i.anticipo').parent().fadeIn(200);
            $('i.transferencia').parent().fadeIn(200);
            if ($('strong#nombreCompletoCliente').attr('idCliente') == '1' && $('strong#nombreCompletoCliente').html() == "CONSUMIDOR FINAL") {
                $('span#totalCredito').parent().fadeOut(0);
            } else {
                $('span#totalCredito').parent().fadeIn(0);
            }
            confirmaPago = false;
        }
    }
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    if (parseFloat(valorCredito) < 1) {
        $("#totalCredito").html('$ 0.0');
        $('span#totalCobradoCobrar').html('$ ' + parseFloat(totalcobrado3).toFixed(2));
        totalcobrado4 = totalcobrado3;
        totalcobrado3 = 0;
    } else {
        $("#totalCredito").html('$ ' + parseFloat(valorCredito).toFixed(2));
        var totalcancelar = parseFloat($('span#totalPagarCobrar').html().replace('$', ''));
        totalcobrado4 = parseFloat(valorCredito) + totalcobrado3;
        var diferenciaCredito = totalcobrado4 - totalcancelar;
        if (totalcancelar <= parseFloat(totalcobrado4)) {
            confirmaPago = true;
            if (valorRecibido == 0) {
                $('div.efectivo').fadeOut(200);
            }
            if (valorRecibidoCheque == 0) {
                $('i.cheque').parent().fadeOut(200);
                $('div#ccheque').fadeOut(200);
            }
            if (valorRecibidoTarjeta == 0) {
                $('i.tarjeta').parent().fadeOut(200);
                $('div#ctarjeta').fadeOut(200);
            }
            if (valorRecibidoAnticipo == 0) {
                $('i.anticipo').parent().fadeOut(200);
                $('div#aanticipo').fadeOut(200);
            }
            if (valorTransferencia == 0) {
                $('i.transferencia').parent().fadeOut(200);
                $('div#ctransferencia').fadeOut(200);
            }
            $('span#CambioConsulta').html('$ ' + diferenciaCredito.toFixed(2));
            $('span#totalCobradoCobrar').html('$ ' + parseFloat(totalcancelar).toFixed(2));
        } else {
            $('span#totalCobradoCobrar').html('$ ' + parseFloat(totalcobrado4).toFixed(2));
            $('div.efectivo').fadeIn(200);
            $('i.cheque').parent().fadeIn(200);
            $('i.tarjeta').parent().fadeIn(200);
            $('i.credito').parent().fadeIn(200);
            $('i.anticipo').parent().fadeIn(200);
            $('i.transferencia').parent().fadeIn(200);
            if ($('strong#nombreCompletoCliente').attr('idCliente') == '1' && $('strong#nombreCompletoCliente').html() == "CONSUMIDOR FINAL") {
                $('span#totalCredito').parent().fadeOut(0);
            } else {
                $('span#totalCredito').parent().fadeIn(0);
            }
            confirmaPago = false;
        }
    }
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    if (parseFloat(valorRecibidoAnticipo) < 1) {
        $("#totalAnticipo").html('$ 0.0');
        $('span#totalCobradoCobrar').html('$ ' + parseFloat(totalcobrado4).toFixed(2));
        totalcobrado5 = totalcobrado4;
        totalcobrado4 = 0;
    } else {
        //$("#totalAnticipo").html('$ ' + parseFloat(valorRecibidoAnticipo).toFixed(2));
        var totalcancelar = parseFloat($('span#totalPagarCobrar').html().replace('$', ''));
        totalcobrado5 = parseFloat(valorRecibidoAnticipo) + totalcobrado4;
        totalcobrado5 = parseFloat(totalcobrado5).toFixed(2);
        totalcobrado5 = parseFloat(totalcobrado5);
        var diferenciaAnticipo = totalcobrado5 - totalcancelar;
        if (totalcancelar <= parseFloat(totalcobrado5)) {
            confirmaPago = true;
            if (valorRecibido == 0) {
                $('div.efectivo').fadeOut(200);
            }
            if (valorRecibidoCheque == 0) {
                $('i.cheque').parent().fadeOut(200);
                $('div#ccheque').fadeOut(200);
            }
            if (valorRecibidoTarjeta == 0) {
                $('i.tarjeta').parent().fadeOut(200);
                $('div#ctarjeta').fadeOut(200);
            }
            if (valorCredito == 0) {
                $('i.credito').parent().fadeOut(200);
                $('div#ccredito').fadeOut(200);
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
            $('i.credito').parent().fadeIn(200);
            $('i.anticipo').parent().fadeIn(200);
            $('i.transferencia').parent().fadeIn(200);
            if ($('strong#nombreCompletoCliente').attr('idCliente') == '1' && $('strong#nombreCompletoCliente').html() == "CONSUMIDOR FINAL") {
                $('span#totalCredito').parent().fadeOut(0);
            } else {
                $('span#totalCredito').parent().fadeIn(0);
            }
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
        totalcobrado6 = parseFloat(totalcobrado6).toFixed(2);
        totalcobrado6 = parseFloat(totalcobrado6);
        var diferenciaTransferencia = totalcobrado6 - totalcancelar;
        diferenciaTransferencia = parseFloat(diferenciaTransferencia).toFixed(2);
        diferenciaTransferencia = parseFloat(diferenciaTransferencia);
        if (totalcancelar <= parseFloat(totalcobrado6)) {
            confirmaPago = true;
            if (valorRecibido == 0) {
                $('div.efectivo').fadeOut(200);
            }
            if (valorRecibidoCheque == 0) {
                $('i.cheque').parent().fadeOut(200);
                $('div#ccheque').fadeOut(200);
            }
            if (valorRecibidoTarjeta == 0) {
                $('i.tarjeta').parent().fadeOut(200);
                $('div#ctarjeta').fadeOut(200);
            }
            if (valorRecibidoAnticipo == 0) {
                $('i.anticipo').parent().fadeOut(200);
                $('div#aanticipo').fadeOut(200);
            }
            if (valorCredito == 0) {
                $('i.credito').parent().fadeOut(200);
                $('div#ccredito').fadeOut(200);
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
            if ($('strong#nombreCompletoCliente').attr('idCliente') == '1' && $('strong#nombreCompletoCliente').html() == "CONSUMIDOR FINAL") {
                $('span#totalCredito').parent().fadeOut(0);
            } else {
                $('span#totalCredito').parent().fadeIn(0);
            }
            confirmaPago = false;
        }
    }
}

$(".body").on('keyup', "input#ValorRecibidoConsulta", function(evt) {
    CalcularCobro($(this).val(), $('#ValorCheque').val(), $("#ValorTarjeta").val(), $('#totalAnticipo').text().replace('$', ''), $("#ValorTrasferencia").val());
    if (evt.keyCode == 13) {
        $('button#CobrarConsultaCobrar').click();
    }
});
/*$(".body").on('keyup', "input#ValorCheque", function(evt) {
    CalcularCobro($('#ValorRecibidoConsulta').val(), $('#ValorCheque').val(), $("#ValorTarjeta").val(),$('#totalAnticipo').text().replace('$',''));
    if (evt.keyCode == 13) {
        $('button#CobrarConsultaCobrar').click();
    }
});
$(".body").on('keyup', "input#ValorTarjeta", function(evt) {
    CalcularCobro($('#ValorRecibidoConsulta').val(), $('#ValorCheque').val(), $("#ValorTarjeta").val(),$('#totalAnticipo').text().replace('$',''));
    if (evt.keyCode == 13) {
        $('button#CobrarConsultaCobrar').click();
    }
});
$(".body").on('keyup', "input#montoT", function(evt) {
    CalcularCobro($('#ValorRecibidoConsulta').val(), $('#ValorCheque').val(), $("#ValorTarjeta").val(),$('#totalAnticipo').text().replace('$',''));
    if (evt.keyCode == 13) {
        $('button#CobrarConsultaCobrar').click();
    }
});*/

var tablaPagos = $('#datatablePagosFarmacia').DataTable({
    ordering: false,
    dom: '<"top">rt<"bottom">',
    scrollY: 100,
    //scrollX: true,
    paginate: false
});
var monto = $('span#totalCancelarConsulta').html().replace('TOTAL A CANCELAR : $', '');
$("body").on('change', "#Pagos", function(ev) {
    monto = (isNaN(parseFloat($('#montoT').val()))) ? 0 : parseFloat($('#montoT').val());
    var n = $(this).val();
    var periodo = $('#cbmPeriodoOdont').val();
    try {
        tablaPagos.clear().draw();
    } catch (error) {}
    if (n < 1 || monto < 1 || periodo == 0) {
        return;
    }
    var now = new Date($("#FechaInicio").val());
    for (var i = 1; i <= n; i++) {
        if (i == 1) {
            now.setDate(now.getDate() + 1);
        } else {
            if (periodo == 1) {
                now.setDate(now.getDate() + 7);
            }
            if (periodo == 2) {
                now.setDate(now.getDate() + 15);
            }
            if (periodo == 3) {
                now.setDate(now.getDate() + 30);
            }
            if (periodo == 4) {
                now.setDate(now.getDate() + 180);
            }
            if (periodo == 4) {
                now.setDate(now.getDate() + 360);
            }
        }
        var day = ("0" + now.getDate()).slice(-2);
        var month = ("0" + (now.getMonth() + 1)).slice(-2);
        var today = now.getFullYear() + "-" + (month) + "-" + (day);
        var t = monto / n;
        var input = '<input type="date" class="form-control" id="FechaConsulta" name="" value="' + today + '">';
        var campos = [i, parseFloat(t).toFixed(2), input];
        tablaPagos.row.add(campos).node().id = today + i;
        tablaPagos.draw();
    }
});
$("body").on('keyup', "#Pagos", function(ev) {
    if (ev.keyCode == 13) {
        monto = (isNaN(parseFloat($('#montoT').val()))) ? 0 : parseFloat($('#montoT').val());
        var n = $(this).val();
        var periodo = $('#cbmPeriodoOdont').val();
        try {
            tablaPagos.clear().draw();
        } catch (error) {}
        if (n < 1 || monto < 1 || periodo == 0) {
            return;
        }
        var now = new Date($("#FechaInicio").val());
        for (var i = 1; i <= n; i++) {
            if (i == 1) {
                now.setDate(now.getDate() + 1);
            } else {
                if (periodo == 1) {
                    now.setDate(now.getDate() + 7);
                }
                if (periodo == 2) {
                    now.setDate(now.getDate() + 15);
                }
                if (periodo == 3) {
                    now.setDate(now.getDate() + 30);
                }
                if (periodo == 4) {
                    now.setDate(now.getDate() + 180);
                }
                if (periodo == 4) {
                    now.setDate(now.getDate() + 360);
                }
            }
            var day = ("0" + now.getDate()).slice(-2);
            var month = ("0" + (now.getMonth() + 1)).slice(-2);
            var today = now.getFullYear() + "-" + (month) + "-" + (day);
            var t = monto / n;
            var input = '<input type="date" class="form-control" id="FechaConsulta" name="" value="' + today + '">';
            var campos = [i, parseFloat(t).toFixed(2), input];
            tablaPagos.row.add(campos).node().id = today + i;
            tablaPagos.draw();
        }
    }
});

function GuardarPagosFarmacia(idConsulta, valorRecibido, valorRecibidoCheque, valorRecibidoTarjeta, valorCredito, valorRecibidoAnticipo, valorRecibidoTransferencia) {
    if (valorRecibido > 0) {
        var pago = valorRecibido - parseFloat($("span#CambioConsulta").html().replace("$", ""));
        GuardarPagoEfectivoFarmacia(pago, idConsulta);
    }
    if (valorRecibidoCheque > 0) {
        GuardarPagoChequeFarmacia(valorRecibidoCheque, idConsulta);
    }
    if (valorRecibidoTransferencia > 0) {
        GuardarPagoTransferenciaFarmacia(valorRecibidoTransferencia, idConsulta)
    }
    if (valorRecibidoTarjeta > 0) {
        GuardarPagoTarjetaFarmacia(valorRecibidoTarjeta, idConsulta);
    }
    if (valorCredito > 0) {
        GuardarPagoCreditoFarmacia(valorCredito, idConsulta);
    }
    if (valorRecibidoAnticipo > 0) {
        var idAnticipo = 0;
        var vector = $('.body').find("#datatableAnticipoFarmacia tbody tr");
        $.each(vector, function(a) {
            var valor = parseFloat($(this).find('td').eq(2).find('input').val());
            if (valor > 0) {
                idAnticipo = $(this).find('td').eq(2).find('input').attr('idAnticipo');
            }
        });
        GuardarPagoAnticipo(valorRecibidoAnticipo, idConsulta, idAnticipo)
    }

}

function GuardarPagoAnticipo(valorRecibidoAnticipo, idConsulta, idAnticipo) {
    $.ajax({
        method: "POST",
        url: "Ajax/Aj_Forma_pago.php",
        data: {
            Requerimiento: "GuardarPagoAnticipoFarmacia",
            Consulta: idConsulta,
            MontoAnticipo: valorRecibidoAnticipo,
            Anticipo: idAnticipo
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
    var vector = $('.body').find("#datatableAnticipoFarmacia tbody tr");
    $.each(vector, function(a) {
        var valor = parseFloat($(this).find('td').eq(2).find('input').val()).toFixed(2);
        var idAnticipo = $(this).find('td').eq(2).find('input').attr('idAnticipo');
        if (valor > 0) {
            ActualizarAnticiposFarmacia(idAnticipo, valor);
        }
    });
}

function GuardarPagoEfectivoFarmacia(valorRecibido, idConsulta) {
    $.ajax({
        method: "POST",
        url: "Ajax/Aj_Forma_pago.php",
        data: {
            Requerimiento: "GuardarPagoEfectivoFarmacia",
            Consulta: idConsulta,
            Monto: valorRecibido
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
        console.log(errorThrown)
    });
}

function GuardarPagoChequeFarmacia(valorRecibidoCheque, idConsulta) {
    $.ajax({
        method: "POST",
        url: "Ajax/Aj_Forma_pago.php",
        data: {
            Requerimiento: "GuardarPagoChequeFarmacia",
            Consulta: idConsulta,
            Monto: valorRecibidoCheque,
            Banco: $("select#banco").val(),
            Numero: $("#NumeroCheque").val(),
            Cuenta: $("#CuentaCheque").val(),
            Fecha: $("#FechaCheque").val(),
            Referencia: $("#ReferenciaCheque").val()
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

function GuardarPagoTarjetaFarmacia(valorRecibidoTarjeta, idConsulta) {
    $.ajax({
        method: "POST",
        url: "Ajax/Aj_Forma_pago.php",
        data: {
            Requerimiento: "GuardarPagoTarjetaFarmacia",
            Consulta: idConsulta,
            Monto: valorRecibidoTarjeta,
            TipoTarjeta: $("#TipoTarjeta").val(),
            Entidad: $("#EntidadTarjeta").val(),
            Fecha: $("#FechaTarjeta").val(),
            Numero: $("#NumeroTarjeta").val(),
            NumeroVoucher: $("#NumeroVoucher").val(),
            Recargo: $("#RecargoTarjeta").val()
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

function GuardarPagoTransferenciaFarmacia(valorRecibidoTransferencia, idConsulta) {
    $.ajax({
        method: "POST",
        url: "Ajax/Aj_Forma_pago.php",
        data: {
            Requerimiento: "GuardarPagoTransferenciaFarmacia",
            Consulta: idConsulta,
            Monto: valorRecibidoTransferencia,
            Banco: $("select#bancoTrans").val(),
            Agencia: $("#AgenciaTrans").val(),
            Fecha: $("#FechaTransferencia").val(),
            Observaciones: $("#ObsevacionTransferencia").val()
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

function GuardarPagoCreditoFarmacia(valorCredito, idConsulta) {
    var vector = $('.body').find("#datatablePagosFarmacia tbody tr");
    $.each(vector, function(a) {
        var npago = $(this).find('td').eq(0).html();
        var monto = $(this).find('td').eq(1).html();
        var fpago = $(this).find('td').eq(2).find('input').val();
        $.ajax({
            method: "POST",
            url: "Ajax/Aj_Forma_pago.php",
            data: {
                Requerimiento: "GuardarPagoCreditoFarmacia",
                Consulta: idConsulta,
                Monto: valorCredito,
                Periodo: $("#cbmPeriodoOdont option:selected").text().trim(),
                Fecha: $("#FechaInicio").val(),
                Dividendo: $("#Pagos").val(),
                Numero: npago,
                Pago: monto,
                FechaPago: fpago
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
    });
}

function GuardarPagoAnticipoFarmacia(valorRecibidoAnticipo, idConsulta) {
    $.ajax({
        method: "POST",
        url: "Ajax/Aj_Forma_pago.php",
        data: {
            Requerimiento: "GuardarPagoAnticipoFarmacia",
            Consulta: idConsulta,
            MontoAnticipo: valorRecibidoAnticipo
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
    var vector = $('.body').find("#datatableAnticipoFarmacia tbody tr");
    $.each(vector, function(a) {
        var valor = parseFloat($(this).find('td').eq(2).find('input').val());
        var idAnticipo = $(this).find('td').eq(2).find('input').attr('idAnticipo');

        if (valor > 0) {
            ActualizarAnticiposFarmacia(idAnticipo, valor);
        }
    });
}

function ActualizarAnticiposFarmacia(idAnticipo, valor) {
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

$(".body table#datatableAnticipoFarmacia tbody").on('change', "tr td input[type=checkbox]", function(ev) {
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
        sumar = +sumar + valor;
        $('.body').find('span#totalAnticipo').text('$ ' + parseFloat(sumar).toFixed(2));
    } else {
        var valor = parseFloat($(this).parent().parent().find('td').eq(2).find('input').val());
        restar = sumar - valor;
        $('.body').find('span#totalAnticipo').text('$ ' + parseFloat(restar).toFixed(2));
        $(this).parent().parent().find('td').eq(2).find('input').val('0.00');
    }

    CalcularCobro($('#ValorRecibidoConsulta').val(), $('#ValorCheque').val(), $("#ValorTarjeta").val(), $('#totalAnticipo').text().replace('$', ''), $("#ValorTrasferencia").val());
});

$(".body table#datatableAnticipoFarmacia tbody").on('change', "tr td input#ValorQuitar", function(ev) {
    var valorMaximo = parseFloat($(this).parent().parent().find('td').eq(0).html());
    var valorCobro = parseFloat($(this).val());
    if (valorCobro > valorMaximo) {
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
        CalcularCobro($('#ValorRecibidoConsulta').val(), $('#ValorCheque').val(), $("#ValorTarjeta").val(), $('#totalAnticipo').text().replace('$', ''), $("#ValorTrasferencia").val());
    } else {
        swal("Esculapio!", "El valor ingresado es mayor al total a pagar", "error").then((confirma) => {
            $('.body').find('span#totalAnticipo').text('$ 0.0');
            $(this).val('0.00');
            $(this).focus();
        });
        return;
    }

});

$(".body table#datatableAnticipoFarmacia tbody").on('blur', "tr td input#ValorQuitar", function(ev) {
    if ($(this).val() == '') {
        $(this).val('0.00');
    }
});

$(".body").on('change', "input#ValorCheque", function(ev) {
    var valorCobro = parseFloat($(this).val());

    var cobrado = parseFloat($('span#totalCobradoCobrar').html().replace('$', ''));
    var cancelar = parseFloat($('span#totalPagarCobrar').html().replace('$', ''));
    var pendiente = cancelar - cobrado;

    if (valorCobro <= pendiente) {
        //pendiente = pendiente - valorCobro;
        CalcularCobro($('#ValorRecibidoConsulta').val(), $('#ValorCheque').val(), $("#ValorTarjeta").val(), $('#totalAnticipo').text().replace('$', ''), $("#ValorTrasferencia").val());

    } else {
        swal("Esculapio!", "El valor ingresado es mayor al total a pagar", "error").then((confirma) => {
            $('.body').find('span#totalAnticipo').text('$ 0.0');
            $(this).val('0.00');
            $(this).focus();
            CalcularCobro($('#ValorRecibidoConsulta').val(), $('#ValorCheque').val(), $("#ValorTarjeta").val(), $('#totalAnticipo').text().replace('$', ''), $("#ValorTrasferencia").val());

        });

        return;
    }

});

$(".body").on('change', "input#ValorTrasferencia", function(ev) {
    var valorCobro = parseFloat($(this).val());

    var cobrado = parseFloat($('span#totalCobradoCobrar').html().replace('$', ''));
    var cancelar = parseFloat($('span#totalPagarCobrar').html().replace('$', ''));
    var pendiente = cancelar - cobrado;

    if (valorCobro <= pendiente) {
        //pendiente = pendiente - valorCobro;
        CalcularCobro($('#ValorRecibidoConsulta').val(), $('#ValorCheque').val(), $("#ValorTarjeta").val(), $('#totalAnticipo').text().replace('$', ''), $("#ValorTrasferencia").val());

    } else {
        swal("Esculapio!", "El valor ingresado es mayor al total a pagar", "error").then((confirma) => {
            $('.body').find('span#totalAnticipo').text('$ 0.0');
            $(this).val('0.00');
            $(this).focus();
            CalcularCobro($('#ValorRecibidoConsulta').val(), $('#ValorCheque').val(), $("#ValorTarjeta").val(), $('#totalAnticipo').text().replace('$', ''), $("#ValorTrasferencia").val());

        });

        return;
    }

});

$(".body").on('change', "input#ValorTarjeta", function(ev) {
    var valorCobro = parseFloat($(this).val());

    var cobrado = parseFloat($('span#totalCobradoCobrar').html().replace('$', ''));
    var cancelar = parseFloat($('span#totalPagarCobrar').html().replace('$', ''));
    var pendiente = cancelar - cobrado;

    if (valorCobro <= pendiente) {
        //pendiente = pendiente - valorCobro;
        CalcularCobro($('#ValorRecibidoConsulta').val(), $('#ValorCheque').val(), $("#ValorTarjeta").val(), $('#totalAnticipo').text().replace('$', ''), $("#ValorTrasferencia").val());

    } else {
        swal("Esculapio!", "El valor ingresado es mayor al total a pagar", "error").then((confirma) => {
            $('.body').find('span#totalAnticipo').text('$ 0.0');
            $(this).val('0.00');
            $(this).focus();
            CalcularCobro($('#ValorRecibidoConsulta').val(), $('#ValorCheque').val(), $("#ValorTarjeta").val(), $('#totalAnticipo').text().replace('$', ''), $("#ValorTrasferencia").val());

        });

        return;
    }

});

$(".body").on('change', "input#montoT", function(ev) {
    var valorCobro = parseFloat($(this).val());

    var cobrado = parseFloat($('span#totalCobradoCobrar').html().replace('$', ''));
    var cancelar = parseFloat($('span#totalPagarCobrar').html().replace('$', ''));
    var pendiente = cancelar - cobrado;

    if (valorCobro <= pendiente) {
        //pendiente = pendiente - valorCobro;
        CalcularCobro($('#ValorRecibidoConsulta').val(), $('#ValorCheque').val(), $("#ValorTarjeta").val(), $('#totalAnticipo').text().replace('$', ''), $("#ValorTrasferencia").val());
        var monto = (isNaN(parseFloat($(this).val()))) ? 0 : parseFloat($(this).val());
        var n = $('#Pagos').val();
        var periodo = $('#cbmPeriodoOdont').val();
        try {
            tablaPagos.clear().draw();
        } catch (error) {}
        if (n < 1 || monto < 1 || periodo == 0) {
            return;
        }
        var now = new Date($("#FechaInicio").val());
        for (var i = 1; i <= n; i++) {
            if (i == 1) {
                now.setDate(now.getDate() + 1);
            } else {
                if (periodo == 1) {
                    now.setDate(now.getDate() + 7);
                }
                if (periodo == 2) {
                    now.setDate(now.getDate() + 15);
                }
                if (periodo == 3) {
                    now.setDate(now.getDate() + 30);
                }
                if (periodo == 4) {
                    now.setDate(now.getDate() + 180);
                }
                if (periodo == 4) {
                    now.setDate(now.getDate() + 360);
                }
            }
            var day = ("0" + now.getDate()).slice(-2);
            var month = ("0" + (now.getMonth() + 1)).slice(-2);
            var today = now.getFullYear() + "-" + (month) + "-" + (day);
            var t = monto / n;
            var input = '<input type="date" class="form-control" id="FechaConsulta" name="" value="' + today + '">';
            var campos = [i, parseFloat(t).toFixed(2), input];
            tablaPagos.row.add(campos).node().id = today + i;
            tablaPagos.draw();
        }
    } else {
        swal("Esculapio!", "El valor ingresado es mayor al total a pagar", "error").then((confirma) => {
            $('.body').find('span#totalAnticipo').text('$ 0.0');
            $(this).val('0.00');
            $(this).focus();
            CalcularCobro($('#ValorRecibidoConsulta').val(), $('#ValorCheque').val(), $("#ValorTarjeta").val(), $('#totalAnticipo').text().replace('$', ''), $("#ValorTrasferencia").val());

        });

        return;
    }

});

function TotalACobrarAnticipos() {
    var vector = $('.body').find("#datatableAnticipoFarmacia tbody tr");
    var total = 0;
    $.each(vector, function(a) {
        total += parseFloat($(this).find("td").eq(2).find('input').val());
    });
    return total;
}

function LimpiarCobrar() {
    var fechaHoy = $('.body').find('input#FechaActualEsculapio').val();
    $('.body').find('span#totalAnticipo').text('$ 0.0');
    $('.body').find('span#totalCredito').text('$ 0.0');
    $('.body').find('span#totalTarjeta').text('$ 0.0');
    $('.body').find('span#totalCheque').text('$ 0.0');
    $('.body').find('span#totalCobradoCobrar').text('$ 0.00');
    $('.body').find('input#NumeroCheque').val('');
    $('.body').find('input#CuentaCheque').val('');
    $('.body').find('input#FechaCheque').val(fechaHoy);
    $('.body').find('span#totalTransfencia').text('$ 0.0');
    $('.body').find('input#AgenciaTrans').val('');
    $('.body').find('input#ValorTrasferencia').val('');
    $('.body').find('input#ObsevacionTransferencia').val('');
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
    $('div#ctransferencia').fadeOut(200);
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