var efectivoCd = 0;
var chequeCd = 0;
var tarjetaCd = 0;
var anticipoApCd = 0;
var anticipoRCd = 0;
var NcCd = 0;
var CxCCd = 0;
var efectivoSistema = 0;
var sumaTotalCd = 0;
var avanceCd = 0;
var efectivoAnticipos = 0;
var efectivoCxC = 0;

$('.body').on('click', 'button#ConsultarCuadre', function(evt) {
    var fecha = $('.body').find('input#Fecha').val();
    var punto = $('.body').find('select#puntoVenta').val();
    var tipo = $('.body').find('select#tipoParametro').val();

    CargarCuadreResumido(fecha, punto, tipo);
});

function CargarCuadreResumido(fecha, punto, tipo) {
    $.ajax({
        method: "POST",
        url: "Ajax/Aj_Caja.php",
        data: {
            Requerimiento: "CargarCuadreResumido",
            Fecha: fecha,
            Punto: punto,
            Tipo: tipo
        },
        dataType: 'JSON',
    }).done(function(respuesta) {


        $.each(respuesta, function(i, value) {

            var efectivo = (isNaN(parseFloat(value[0]))) ? 0 : parseFloat(value[0]);
            var cheque = (isNaN(parseFloat(value[1]))) ? 0 : parseFloat(value[1]);
            var voucher = (isNaN(parseFloat(value[2]))) ? 0 : parseFloat(value[2]);
            var anticipo = (isNaN(parseFloat(value[3]))) ? 0 : parseFloat(value[3]);
            var credito = (isNaN(parseFloat(value[4]))) ? 0 : parseFloat(value[4]);

            $("span#efectivo").html("$ " + efectivo.toFixed(2));
            $("span#cheque").html("$ " + cheque.toFixed(2));
            $("span#voucher").html("$ " + voucher.toFixed(2));
            $("span#anticipo").html("$ " + anticipo.toFixed(2));
            $("span#credito").html("$ " + credito.toFixed(2));

            var subtotal = efectivo + cheque + voucher + anticipo + credito;
            $("span#subTotal").html("$ " + subtotal.toFixed(2));

            $("span#efectivod").html("$ " + efectivo.toFixed(2));
            $("span#chequed").html("$ " + cheque.toFixed(2));
            $("span#voucherd").html("$ " + voucher.toFixed(2));
            $("span#anticipod").html("$ " + anticipo.toFixed(2));
            $("span#creditod").html("$ " + credito.toFixed(2));

            var subtotal = efectivo + cheque + voucher + anticipo + credito;
            $("span#subTotald").html("$ " + subtotal.toFixed(2));

        });
        if ($("#radio1").prop("checked")) {
            $("#CuadreResumido").fadeIn(0);
            $("#CuadreDetallado").fadeOut(0);
        }
        if ($("#radio2").prop("checked")) {
            CargarFacturasefectivo(fecha, punto, tipo);
            CargarFacturasCheque(fecha, punto, tipo);
            CargarFacturasVoucher(fecha, punto, tipo);
            CargarFacturasCredito(fecha, punto, tipo);
            CargarFacturasAnticipo(fecha, punto, tipo);
            $("#CuadreDetallado").fadeIn(0);
            $("#CuadreResumido").fadeOut(0);
        }

    });
}
var tablaEfectivo = $('#FacturasEfectivo').DataTable({
    'paging': false,
    'lengthChange': false,
    'searching': true,
    'ordering': false,
    'info': false,
    scrollY: 200,
    'autoWidth': false,
    keys: true
});
var tablaCheque = $('#FacturasCheque').DataTable({
    'paging': false,
    'lengthChange': false,
    'searching': false,
    'ordering': false,
    scrollCollapse: true,
    'info': false,
    scrollY: 200,
    'autoWidth': false,
    keys: true
});

var tablaVoucher = $('#FacturasVoucher').DataTable({
    'paging': false,
    'lengthChange': false,
    'searching': false,
    'ordering': false,
    scrollCollapse: true,
    'info': false,
    scrollY: 200,
    'autoWidth': false,
    keys: true
});
var tablaAnticipo = $('#FacturasAnticipo').DataTable({
    'paging': false,
    'lengthChange': false,
    'searching': false,
    'ordering': false,
    scrollCollapse: true,
    'info': false,
    scrollY: 200,
    'autoWidth': false,
    keys: true
});
var tablaCredito = $('#FacturasCredito').DataTable({
    'paging': false,
    'lengthChange': false,
    'searching': false,
    'ordering': false,
    scrollCollapse: true,
    'info': false,
    scrollY: 200,
    'autoWidth': false,
    keys: true
});
var tablaIcAnticipo = $('#FacturasIcAnticipo').DataTable({
    'paging': false,
    'lengthChange': false,
    'searching': false,
    'ordering': false,
    scrollCollapse: true,
    'info': false,
    scrollY: 200,
    'autoWidth': false,
    keys: true
});
var tablaTransferencias = $('#FacturasTransferencias').DataTable({
    'paging': false,
    'lengthChange': false,
    'searching': false,
    'ordering': false,
    scrollCollapse: true,
    'info': false,
    scrollY: 200,
    'autoWidth': false,
    keys: true
});
var tablaAbonos = $('#FacturasIcAbono').DataTable({
    'paging': false,
    'lengthChange': false,
    'searching': false,
    'ordering': false,
    scrollCollapse: true,
    'info': false,
    scrollY: 200,
    'autoWidth': false,
    keys: true
});
var tablaAvances = $('#HoraAvance').DataTable({
    'paging': false,
    'lengthChange': false,
    'searching': false,
    'ordering': false,
    scrollCollapse: true,
    'info': false,
    scrollY: 200,
    'autoWidth': false,
    keys: true
});
var tablaEgreso = $('#FacturasEgresos').DataTable({
    'paging': false,
    'lengthChange': false,
    'searching': false,
    'ordering': false,
    scrollCollapse: true,
    'info': false,
    scrollY: 200,
    'autoWidth': false,
    keys: true
});
var tablaNc = $('#FacturasNC').DataTable({
    'paging': false,
    'lengthChange': false,
    'searching': false,
    'ordering': false,
    scrollCollapse: true,
    'info': false,
    scrollY: 200,
    'autoWidth': false,
    keys: true
});

function CargarFacturasefectivo(fecha, punto, tipo) {

    $.ajax({
        method: "POST",
        url: "Ajax/Aj_Caja.php",
        data: {
            Requerimiento: "CargarFacturasefectivo",
            Fecha: fecha,
            Punto: punto,
            Tipo: tipo
        },
        dataType: 'JSON',
    }).done(function(respuesta) {

        try {
            tablaEfectivo.clear();
        } catch (error) {}
        $.each(respuesta, function(i, value) {

            var datos = [value[0], value[1], value[2], value[3], value[4]];
            tablaEfectivo.row.add(datos);

        });
        tablaEfectivo.draw();

    });

}

function CargarFacturasCheque(fecha, punto, tipo) {

    $.ajax({
        method: "POST",
        url: "Ajax/Aj_Caja.php",
        data: {
            Requerimiento: "CargarFacturasCheque",
            Fecha: fecha,
            Punto: punto,
            Tipo: tipo
        },
        dataType: 'JSON',
    }).done(function(respuesta) {
        try {
            tablaCheque.clear();
        } catch (error) {}

        $.each(respuesta, function(i, value) {

            var datos = [value[0], value[1], value[2], value[3], value[4]];
            tablaCheque.row.add(datos);

        });
        tablaCheque.draw();

    });

}

function CargarFacturasVoucher(fecha, punto, tipo) {

    $.ajax({
        method: "POST",
        url: "Ajax/Aj_Caja.php",
        data: {
            Requerimiento: "CargarFacturasVoucher",
            Fecha: fecha,
            Punto: punto,
            Tipo: tipo
        },
        dataType: 'JSON',
    }).done(function(respuesta) {
        try {
            tablaVoucher.clear();
        } catch (error) {}

        $.each(respuesta, function(i, value) {

            var datos = [value[0], value[1], value[2], value[3], value[4]];
            tablaVoucher.row.add(datos);

        });
        tablaVoucher.draw();

    });

}

function CargarFacturasAnticipo(fecha, punto, tipo) {

    $.ajax({
        method: "POST",
        url: "Ajax/Aj_Caja.php",
        data: {
            Requerimiento: "CargarFacturasAnticipo",
            Fecha: fecha,
            Punto: punto,
            Tipo: tipo
        },
        dataType: 'JSON',
    }).done(function(respuesta) {
        try {
            tablaAnticipo.clear();
        } catch (error) {}

        $.each(respuesta, function(i, value) {

            var datos = [value[0], value[1], value[2], value[3], value[4]];
            tablaAnticipo.row.add(datos);

        });
        tablaAnticipo.draw();

    });

}

function CargarFacturasCredito(fecha, punto, tipo) {

    $.ajax({
        method: "POST",
        url: "Ajax/Aj_Caja.php",
        data: {
            Requerimiento: "CargarFacturasCredito",
            Fecha: fecha,
            Punto: punto,
            Tipo: tipo
        },
        dataType: 'JSON',
    }).done(function(respuesta) {
        console.log(respuesta);
        try {
            tablaCredito.clear();
        } catch (error) {}

        $.each(respuesta, function(i, value) {

            var datos = [value[0], value[1], value[2], value[3], value[4]];
            tablaCredito.row.add(datos);

        });
        tablaCredito.draw();

    });

}

$('.body').on('change', 'input.cantidadDenominacion', function(evt) {

    var cantidad = $(this).val();

    if (parseFloat(cantidad) < 0 || isNaN(parseFloat(cantidad))) {
        cantidad = 0;
        $(this).val(0);
    }
    var denominacion = $(this).parent().parent().find('td').eq(0).html();
    var total = parseFloat(denominacion) * parseFloat(cantidad);
    $(this).parent().parent().find('td').eq(2).html('$ ' + total.toFixed(2));

    $("#SumaTotal").html(CalcularTotal());
    $("#SumaTotalFondo").html(CalcularTotalFondo());
    $("#SumaTotalEfectivo").html("$ " + CalcularTotalEfectivo());
});

function CalcularTotal() {
    var vector = $('.body').find("#tablaAvance tbody tr");
    var total = 0;

    $.each(vector, function(a) {
        var valor = (isNaN(parseFloat($(this).find('td').eq(2).html().replace("$", "")))) ? 0 : parseFloat($(this).find('td').eq(2).html().replace("$", ""));
        total = total + valor;

    });
    return total.toFixed(2);
}

function CalcularTotalFondo() {
    var vector = $('.body').find("#tablaFondo tbody tr");
    var total = 0;

    $.each(vector, function(a) {
        var valor = (isNaN(parseFloat($(this).find('td').eq(2).html().replace("$", "")))) ? 0 : parseFloat($(this).find('td').eq(2).html().replace("$", ""));
        total = total + valor;

    });
    return total.toFixed(2);
}

function CalcularTotalEfectivo() {
    var vector = $('.body').find("#TablaEfectivo tbody tr");
    var total = 0;

    $.each(vector, function(a) {
        var valor = (isNaN(parseFloat($(this).find('td').eq(2).html().replace("$", "")))) ? 0 : parseFloat($(this).find('td').eq(2).html().replace("$", ""));
        total = total + valor;

    });
    return total.toFixed(2);
}

function GuardarAvance(denominacion, cantidad, total) {
    $.ajax({
        method: "POST",
        url: "Ajax/Aj_Caja.php",
        data: {

            Requerimiento: "GuardarAvance",
            Denominacion: denominacion,
            Cantidad: cantidad,
            Total: total
        },
        dataType: "JSON",

    }).done(function(respuesta) {

    }).fail(function(jqXHR, textStatus, errorThrown) {
        console.log(errorThrown);
    });
}
$('.body').on('click', 'button#GuardarAvance', function(evt) {

    if (parseFloat(efectivoCd) < CalcularTotal()) {
        swal("Esculapio!", "El avance es mayor al efectivo en caja", "warning");
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
            var vector = $('.body').find("#tablaAvance tbody tr");

            $.each(vector, function(a) {
                var total = (isNaN(parseFloat($(this).find('td').eq(2).html().replace("$", "")))) ? 0 : parseFloat($(this).find('td').eq(2).html().replace("$", ""));

                var cantidad = $(this).find('td').eq(1).find('input').val();
                if (total > 0) {
                    GuardarAvance($(this).find('td').eq(0).html(), cantidad, total);
                }

            });

            swal({
                title: "Esculapio",
                text: "Avance Guardado..!, Desea Imprimir?",
                icon: "info",
                buttons: true,
                dangerMode: false,
            }).then((confirma) => {
                if (confirma) {
                    ImprimirFinalAvance('avance');

                } else {

                }
            });
            efectivoCd = 0;
            chequeCd = 0;
            tarjetaCd = 0;
            anticipoApCd = 0;
            anticipoRCd = 0;
            NcCd = 0;
            CxCCd = 0;
            efectivoSistema = 0;
            sumaTotalCd = 0;
            avanceCd = 0;
            efectivoAnticipos = 0;
            efectivoCxC = 0;
            ValidarFacturasFormaPago();
            CargarAvance();
            CargarFondo();
            CargarFacturasChequeCajero();
            CargarFacturasTarjetaCajero();
            CargarFacturasAnticipoCajero();
            CargarFacturasCreditoCajero();
            CargarTransferenciasCajero();
            CargarIcAnticipos();
            CargarAbonosCajero();
            CargarEgresos();
            CargarNotaCredito();
            CargarOtros();
            CargarEfectivoCajero();

        }
    });
});

function GuardarFondo(denominacion, cantidad, total) {
    $.ajax({
        method: "POST",
        url: "Ajax/Aj_Caja.php",
        data: {

            Requerimiento: "GuardarFondo",
            Denominacion: denominacion,
            Cantidad: cantidad,
            Total: total
        },
        dataType: "JSON",

    }).done(function(respuesta) {


    }).fail(function(jqXHR, textStatus, errorThrown) {
        console.log(errorThrown);
    });
}

$('.body').on('click', 'button#GuardarFondo', function(evt) {

    swal({
        title: "Esculapio",
        text: "Seguro Que Desea Guardar?",
        icon: "info",
        buttons: true,
        dangerMode: false,
    }).then((confirma) => {
        if (confirma) {
            var vector = $('.body').find("#tablaFondo tbody tr");

            $.each(vector, function(a) {
                var total = (isNaN(parseFloat($(this).find('td').eq(2).html().replace("$", "")))) ? 0 : parseFloat($(this).find('td').eq(2).html().replace("$", ""));

                var cantidad = $(this).find('td').eq(1).find('input').val();
                if (total > 0) {
                    GuardarFondo($(this).find('td').eq(0).html(), cantidad, total);
                }

            });
            swal({
                title: "Esculapio",
                text: "Fondo de Caja Guardada..!, Desea Imprimir?",
                icon: "info",
                buttons: true,
                dangerMode: false,
            }).then((confirma) => {
                if (confirma) {
                    ImprimirFinalFondo('fondo');
                }
            });
            $('button#GuardarFondo').attr('disabled', true);
            efectivoCd = 0;
            chequeCd = 0;
            tarjetaCd = 0;
            anticipoApCd = 0;
            anticipoRCd = 0;
            NcCd = 0;
            CxCCd = 0;
            efectivoSistema = 0;
            sumaTotalCd = 0;
            avanceCd = 0;
            efectivoAnticipos = 0;
            efectivoCxC = 0;
            ValidarFacturasFormaPago();
            CargarAvance();
            CargarFondo();
            CargarFacturasChequeCajero();
            CargarFacturasTarjetaCajero();
            CargarFacturasAnticipoCajero();
            CargarFacturasCreditoCajero();
            CargarTransferenciasCajero();
            CargarIcAnticipos();
            CargarAbonosCajero();
            CargarEgresos();
            CargarNotaCredito();
            CargarOtros();
            CargarEfectivoCajero();

        }
    });
});

function CargarAvance() {

    $.ajax({
        async: false,
        method: "POST",
        url: "Ajax/Aj_Caja.php",
        data: {
            Requerimiento: "CargarAvance"
        },
        dataType: 'JSON',
    }).done(function(respuesta) {


        $('#numeroAvance').find('span').remove();
        var total = 0;
        var hora = "";
        var contar = 0;
        var totalHora = 0;
        $.each(respuesta, function(i, value) {
            var fecha = new Date(value[2]);

            if (hora != fecha.getHours()) {
                contar++;

                hora = fecha.getHours();
                var elemento = '<option value=' + value[0] + '>' + value[2] + '</option>';
                var fila = [value[2]];

                tablaAvances.row.add(fila);
                //$('#cbmAvance').append(elemento);
            }
            $('#tablaAvance tbody tr td:contains(' + value[3] + ')').parent().find('input').val(value[4]);
            $('#tablaAvance tbody tr').find('input').attr('disabled', true);
            $('#tablaAvance tbody tr td:contains(' + value[3] + ')').parent().find('td').eq(2).html("$ " + value[5]);
            total = total + parseFloat(value[5]);

        });
        tablaAvances.draw();
        $('#numeroAvance').append('<span class="btn btn-xs bg-olive">' + contar + '</span>');
        avanceCd = total;
        $("#TotalAvance").html("$ " + total.toFixed(2));
        $("#SumaTotal").html("$ " + total.toFixed(2));
        if (total > 0) {
            $('button#GuardarAvance').attr('disabled', true);
        }
    });

}
$('.body').on('click', 'td#numeroAvance', function(evt) {

    $('#tablaAvanceS').toggle(200);
    tablaAvances.columns.adjust().draw();
});

function CargarFondo() {

    $.ajax({
        method: "POST",
        url: "Ajax/Aj_Caja.php",
        data: {
            Requerimiento: "CargarFondo"
        },
        dataType: 'JSON',
    }).done(function(respuesta) {
        console.log("fondo cargado ----------------");

        var total = 0;
        $.each(respuesta, function(i, value) {

            total = total + parseFloat(value[5]);
            $("#FondoCaja").html(value[2]);

            $('#tablaFondo tbody tr td:contains(' + value[3] + ')').parent().find('input').val(value[4]);
            $('#tablaFondo tbody tr').find('input').attr('disabled', true);
            $('#tablaFondo tbody tr td:contains(' + value[3] + ')').parent().find('td').eq(2).html("$ " + value[5]);
        });
        $("#TotalFondo").html("$ " + total.toFixed(2));
        if (total > 0) {
            $('button#GuardarFondo').attr('disabled', true);
            $("#SumaTotalFondo").html(CalcularTotalFondo());
        }
    });

}

function CargarOtros() {

    $.ajax({
        method: "POST",
        url: "Ajax/Aj_Caja.php",
        data: {
            Requerimiento: "CargarOtros"
        },
        dataType: 'JSON',
    }).done(function(respuesta) {
        //console.log(respuesta);
        $.each(respuesta, function(i, value) {

            var efectivo = (isNaN(parseFloat(value[0]))) ? 0 : parseFloat(value[0]);
            var cheque = (isNaN(parseFloat(value[2]))) ? 0 : parseFloat(value[2]);
            var voucher = (isNaN(parseFloat(value[4]))) ? 0 : parseFloat(value[4]);
            var anticipo = (isNaN(parseFloat(value[6]))) ? 0 : parseFloat(value[6]);
            var credito = (isNaN(parseFloat(value[8]))) ? 0 : parseFloat(value[8]);
            var anticipoRecibido = (isNaN(parseFloat(value[10]))) ? 0 : parseFloat(value[10]);
            var transferencias = (isNaN(parseFloat(value[22]))) ? 0 : parseFloat(value[22]);
            var abonos = (isNaN(parseFloat(value[26]))) ? 0 : parseFloat(value[26]);
            var egreso = (isNaN(parseFloat(value[28]))) ? 0 : parseFloat(value[28]);
            var notacredito = (isNaN(parseFloat(value[30]))) ? 0 : parseFloat(value[30]);

            var numeroCheques = (isNaN(parseFloat(value[3]))) ? 0 : parseFloat(value[3]);
            var numeroTarjeta = (isNaN(parseFloat(value[5]))) ? 0 : parseFloat(value[5]);
            var numeroAnticiposA = (isNaN(parseFloat(value[7]))) ? 0 : parseFloat(value[7]);
            var numeroCuentasxC = (isNaN(parseFloat(value[9]))) ? 0 : parseFloat(value[9]);
            var numeroAnticiposR = (isNaN(parseFloat(value[11]))) ? 0 : parseFloat(value[11]);
            var numeroTransferencias = (isNaN(parseFloat(value[23]))) ? 0 : parseFloat(value[23]);
            var numeroAbonos = (isNaN(parseFloat(value[27]))) ? 0 : parseFloat(value[27]);
            var numeroEgreso = (isNaN(parseFloat(value[29]))) ? 0 : parseFloat(value[29]);
            var numeroNotac = (isNaN(parseFloat(value[31]))) ? 0 : parseFloat(value[31]);

            // FARMACIA
            var efectivof = (isNaN(parseFloat(value[12]))) ? 0 : parseFloat(value[12]);
            var chequef = (isNaN(parseFloat(value[14]))) ? 0 : parseFloat(value[14]);
            var voucherf = (isNaN(parseFloat(value[16]))) ? 0 : parseFloat(value[16]);
            var anticipof = (isNaN(parseFloat(value[18]))) ? 0 : parseFloat(value[18]);
            var creditof = (isNaN(parseFloat(value[20]))) ? 0 : parseFloat(value[20]);
            var transferenciasf = (isNaN(parseFloat(value[24]))) ? 0 : parseFloat(value[24]);
            var notacreditof = (isNaN(parseFloat(value[32]))) ? 0 : parseFloat(value[32]);

            var numeroChequesf = (isNaN(parseFloat(value[15]))) ? 0 : parseFloat(value[15]);
            var numeroTarjetaf = (isNaN(parseFloat(value[17]))) ? 0 : parseFloat(value[17]);
            var numeroAnticiposAf = (isNaN(parseFloat(value[19]))) ? 0 : parseFloat(value[19]);
            var numeroCuentasxCf = (isNaN(parseFloat(value[21]))) ? 0 : parseFloat(value[21]);
            var numeroTransferenciasf = (isNaN(parseFloat(value[25]))) ? 0 : parseFloat(value[25]);
            var numeroNotaf = (isNaN(parseFloat(value[33]))) ? 0 : parseFloat(value[33]);

            ///////////////////////////////////////////////////////////////////////////////////////////////////////
            // SUMA DE CONSULTA Y FARMACIA
            ///////////////////////////////////////////////////////////////////////////////////////////////////////

            efectivo = efectivo + efectivof;
            cheque = cheque + chequef;
            voucher = voucher + voucherf;
            anticipo = anticipo + anticipof;
            credito = credito + creditof;
            transferencias = transferencias + transferenciasf;
            notacredito = notacredito + notacreditof;

            numeroCheques = numeroCheques + numeroChequesf;
            numeroTarjeta = numeroTarjeta + numeroTarjetaf;
            numeroAnticiposA = numeroAnticiposA + numeroAnticiposAf;
            numeroCuentasxC = numeroCuentasxC + numeroCuentasxCf;
            numeroTransferencias = numeroTransferencias + numeroTransferenciasf;
            numeroNotac = numeroNotac + numeroNotaf;


            //$("#efectivo").html("$ "+efectivo.toFixed(2));
            $("#TotalCheque").html("$ " + cheque.toFixed(2));
            $("#TotalTarjeta").html("$ " + voucher.toFixed(2));
            $("#TotalAnticipoAplicado").html("$ " + anticipo.toFixed(2));
            $("#TotalCuentas").html("$ " + credito.toFixed(2));
            $("#TotalAnticipoRecibido").html("$ " + anticipoRecibido.toFixed(2));
            $("#TotalTransferencias").html("$ " + transferencias.toFixed(2));
            $("#TotalAbonos").html("$ " + abonos.toFixed(2));
            $("#TotalEgresos").html("$ " + egreso.toFixed(2));
            $("#totalNc").html("$ " + notacredito.toFixed(2));

            $("#numeroCheques").html('<span class="btn btn-xs bg-olive">' + numeroCheques + '</span>');
            $("#numeroTarjeta").html('<span class="btn btn-xs bg-olive">' + numeroTarjeta + '</span>');
            $("#numeroAnticiposR").html('<span class="btn btn-xs bg-olive">' + numeroAnticiposR + '</span>');
            $("#numeroAnticiposA").html('<span class="btn btn-xs bg-olive">' + numeroAnticiposA + '</span>');
            $("#numeroCuentasxC").html('<span class="btn btn-xs bg-olive">' + numeroCuentasxC + '</span>');
            $("#numeroTransferencias").html('<span class="btn btn-xs bg-olive">' + numeroTransferencias + '</span>');
            $("#numeroAbonos").html('<span class="btn btn-xs bg-olive">' + numeroAbonos + '</span>');
            $("#numeroEgresos").html('<span class="btn btn-xs bg-olive">' + numeroEgreso + '</span>');
            $("#numeroNc").html('<span class="btn btn-xs bg-olive">' + numeroNotac + '</span>');

            sumaTotalCd = (efectivo + efectivoAnticipos + efectivoCxC) + cheque + voucher + transferencias + anticipoRecibido - (avanceCd + egreso + notacredito);
            efectivoCd = (efectivo + efectivoAnticipos + efectivoCxC) - (avanceCd + egreso + notacredito);

            /*console.log(efectivo);
            console.log(efectivoAnticipos);
            console.log(efectivoCxC);
            console.log(efectivoCxC);*/

            console.log("efectivo " + efectivoCd.toFixed(2));
            console.log("total " + sumaTotalCd.toFixed(2));

        });
    });

}

function LimpiarAvance() {
    $('input.cantidadDenominacion').val(0);

    $("#SumaTotal").html("$ 0.0");

    var vector = $('.body').find("#tablaAvance tbody tr");

    $.each(vector, function(a) {
        $(this).find('td').eq(2).html("$ 0.0");

    });

}

function LimpiarFondo() {
    $('input.cantidadDenominacion').val(0);

    $("#SumaTotalFondo").html("$ 0.0");

    var vector = $('.body').find("#tablaFondo tbody tr");

    $.each(vector, function(a) {
        $(this).find('td').eq(2).html("$ 0.0");

    });

}

$('.body').on('click', 'button#GuardarCuadreDiario', function(evt) {
    var totalEfectivoCajero = CalcularTotalEfectivo()
    efectivoCd = 0;
    chequeCd = 0;
    tarjetaCd = 0;
    anticipoApCd = 0;
    anticipoRCd = 0;
    NcCd = 0;
    CxCCd = 0;
    efectivoSistema = 0;
    sumaTotalCd = 0;
    avanceCd = 0;
    efectivoAnticipos = 0;
    efectivoCxC = 0;
    ValidarFacturasFormaPago();
    CargarAvance();
    CargarFondo();
    CargarFacturasChequeCajero();
    CargarFacturasTarjetaCajero();
    CargarFacturasAnticipoCajero();
    CargarFacturasCreditoCajero();
    CargarTransferenciasCajero();
    CargarIcAnticipos();
    CargarAbonosCajero();
    CargarEgresos();
    CargarNotaCredito();
    CargarOtros();
    CargarEfectivoCajero();
    swal({
        title: "Esculapio",
        text: "Seguro Que Desea Guardar?",
        icon: "info",
        buttons: true,
        dangerMode: false,
    }).then((confirma) => {
        if (confirma) {

            swal({
                title: "Esculapio",
                text: "UNA VEZ GUARDADO NO PODRA REALIZAR CAMBIOS..!!, DESEA GUARDAR DE TODOS MODOS?",
                icon: "info",
                buttons: true,
                dangerMode: false,
            }).then((confirma) => {
                if (confirma) {

                    var vector = $('.body').find("#TablaEfectivo tbody tr");

                    $.each(vector, function(a) {
                        var total = (isNaN(parseFloat($(this).find('td').eq(2).html().replace("$", "")))) ? 0 : parseFloat($(this).find('td').eq(2).html().replace("$", ""));

                        var cantidad = $(this).find('td').eq(1).find('input').val();
                        if (total > 0) {
                            GuardarEfectivoCuadreDiario($(this).find('td').eq(0).html(), cantidad, total);
                        }

                    });
                    var diferencia = 0;
                    totalEfectivoCajero = parseFloat(totalEfectivoCajero).toFixed(2);
                    totalEfectivoCajero = parseFloat(totalEfectivoCajero);
                    efectivoCd = parseFloat(efectivoCd).toFixed(2);
                    efectivoCd = parseFloat(efectivoCd);

                    if (totalEfectivoCajero < efectivoCd) {
                        diferencia = efectivoCd - totalEfectivoCajero;
                        diferencia = parseFloat(diferencia).toFixed(2);
                        diferencia = parseFloat(diferencia);
                        swal("Esculapio!", "SU CAJA ESTA DESCUADRADA, TIENE UN FALTANTE DE $" + diferencia + "\nEl Efectivo que deberia tener es $ " + efectivoCd, "info");
                    }
                    if (totalEfectivoCajero > efectivoCd) {
                        diferencia = totalEfectivoCajero - efectivoCd;
                        diferencia = parseFloat(diferencia).toFixed(2);
                        diferencia = parseFloat(diferencia);
                        swal("Esculapio!", "SU CAJA ESTA DESCUADRADA, TIENE UN SOBRANTE DE $" + diferencia + "\nEl Efectivo que deberia tener es $ " + efectivoCd, "info");
                    }
                    if (totalEfectivoCajero == efectivoCd) {
                        diferencia = totalEfectivoCajero - efectivoCd;
                        diferencia = parseFloat(diferencia).toFixed(2);
                        diferencia = parseFloat(diferencia);
                        swal("Esculapio!", "SU CAJA ESTA CUADRADA", "success");
                    }

                    ImprimirFinal(totalEfectivoCajero, diferencia, efectivoCd);

                    $('button#GuardarCuadreDiario').attr('disabled', true);
                }
            });

        }
    });

});



function ImprimirFinal(EfectivoCd, Diferencia, TotalDinero) {
    var vector = $('.body').find("#HoraAvance tbody tr");
    var vector1 = $('.body').find("#FacturasIcAnticipo tbody tr");
    var vector2 = $('.body').find("#FacturasIcAbono tbody tr");
    var vector3 = $('.body').find("#FacturasAnticipo tbody tr");
    var vector4 = $('.body').find("#FacturasCredito tbody tr");
    var vector5 = $('.body').find("#FacturasNC tbody tr");
    var vector6 = $('.body').find("#FacturasEgresos tbody tr");
    var vector7 = $('.body').find("#FacturasVoucher tbody tr");
    var vector8 = $('.body').find("#FacturasCheque tbody tr");
    var vector9 = $('.body').find("#FacturasTransferencias tbody tr");

    var productos = [];
    var productos1 = [];
    var productos2 = [];
    var productos3 = [];
    var productos4 = [];
    var productos5 = [];
    var productos6 = [];
    var productos7 = [];
    var productos8 = [];
    var productos9 = [];

    var a = 0;
    var b = 0;
    var c = 0;
    var d = 0;
    var e = 0;
    var f = 0;
    var g = 0;
    var h = 0;
    var i = 0;
    var j = 0;
    /*$.each(vector, function(a) {
        if($(this).find('td').html()=="No existen datos"){
            return;
        }
        var hora = $(this).find('td').eq(0).html();
        var total = $(this).find('td').eq(1).html();
        var linea = [hora,total]
        productos[a] = linea;
        a++;
    });
    $.each(vector1, function(a) {
        if($(this).find('td').html()=="No existen datos"){
            return;
        }
        var numero = $(this).find('td').eq(0).html();
        var total = $(this).find('td').eq(1).html();
        var forma = $(this).find('td').eq(2).html();
        var linea = [numero,total,forma]
        productos1[b] = linea;
        b++;
    });
    $.each(vector2, function(a) {
        if($(this).find('td').html()=="No existen datos"){
            return;
        }
        var numero = $(this).find('td').eq(0).html();
        var total = $(this).find('td').eq(1).html();
        var forma = $(this).find('td').eq(2).html();
        var linea = [numero,total,forma]
        productos2[c] = linea;
        c++;
    });
    $.each(vector3, function(a) {
        if($(this).find('td').html()=="No existen datos"){
            return;
        }
        var numero = $(this).find('td').eq(0).html();
        var total = $(this).find('td').eq(1).html();
        var forma = $(this).find('td').eq(2).html();
        var linea = [numero,total,forma]
        productos3[d] = linea;
        d++;
    });
    $.each(vector4, function(a) {
        if($(this).find('td').html()=="No existen datos"){
            return;
        }
        var numero = $(this).find('td').eq(0).html();
        var total = $(this).find('td').eq(1).html();
        var forma = $(this).find('td').eq(2).html();
        var linea = [numero,total,forma]
        productos4[e] = linea;
        e++;
    });
    $.each(vector5, function(a) {
        if($(this).find('td').html()=="No existen datos"){
            return;
        }
        var numero = $(this).find('td').eq(0).html();
        var total = $(this).find('td').eq(1).html();
        var forma = $(this).find('td').eq(2).html();
        var linea = [numero,total,forma]
        productos5[f] = linea;
        f++;
    });
    $.each(vector6, function(a) {
        if($(this).find('td').html()=="No existen datos"){
            return;
        }
        var numero = $(this).find('td').eq(0).html();
        var total = $(this).find('td').eq(1).html();
        var forma = $(this).find('td').eq(2).html();
        var linea = [numero,total,forma]
        productos6[g] = linea;
        g++;
    });
    $.each(vector7, function(a) {
        if($(this).find('td').html()=="No existen datos"){
            return;
        }
        var numero = $(this).find('td').eq(0).html();
        var total = $(this).find('td').eq(1).html();
        var forma = $(this).find('td').eq(2).html();
        var formag = $(this).find('td').eq(3).html();
        var linea = [numero,total,forma,formag]
        productos7[h] = linea;
        h++;
    });
    $.each(vector8, function(a) {
        if($(this).find('td').html()=="No existen datos"){
            return;
        }
        var numero = $(this).find('td').eq(0).html();
        var total = $(this).find('td').eq(1).html();
        var forma = $(this).find('td').eq(2).html();
        var formag = $(this).find('td').eq(3).html();
        var linea = [numero,total,forma,formag]
        productos8[i] = linea;
        i++;
    });
    $.each(vector9, function(a) {
        if($(this).find('td').html()=="No existen datos"){
            return;
        }
        var numero = $(this).find('td').eq(0).html();
        var total = $(this).find('td').eq(1).html();
        var forma = $(this).find('td').eq(2).html();
        var formag = $(this).find('td').eq(3).html();
        var linea = [numero,total,forma,formag]
        productos9[j] = linea;
        j++;
    });*/
    printTextAreaMovimientoFinal(productos, productos1, productos2, productos3, productos4, productos5, productos6, productos7, productos8, productos9, EfectivoCd, Diferencia, TotalDinero);
    //ImprimirReciboCuadre(JSON.stringify(productos),JSON.stringify(productos1),JSON.stringify(productos2),JSON.stringify(productos3),JSON.stringify(productos4),JSON.stringify(productos5),JSON.stringify(productos6),JSON.stringify(productos7),JSON.stringify(productos8),JSON.stringify(productos9),EfectivoCd,Diferencia,TotalDinero);
}

function ImprimirFinalAvance(avance) {
    var vector = $('.body').find("#tablaAvance tbody tr");

    var productos = [];

    var i = 0;

    $.each(vector, function(a) {
        if ($(this).find('td').html() == "No existen datos") {
            return;
        }
        var cantidad = $(this).find('td').eq(1).find('input').val();
        var cantidadFloat = parseInt(cantidad);
        if (cantidadFloat > 0) {
            var cantidad = $(this).find('td').eq(1).find('input').val();
            var denominacion = $(this).find('td').eq(0).html();
            var total = $(this).find('td').eq(2).html();
            var linea = [denominacion, cantidad, total]
            productos[i] = linea;
            i++;
        }
    });
    //console.log(JSON.stringify(productos));
    printTextAreaMovimiento(productos, "avance", $('span#nombresUsuario').html())
        //ImprimirReciboAvance(JSON.stringify(productos),avance);
}

function ImprimirFinalFondo(fondo) {
    var vector = $('.body').find("#tablaFondo tbody tr");

    var productos = [];

    var i = 0;

    $.each(vector, function(a) {
        if ($(this).find('td').html() == "No existen datos") {
            return;
        }
        var cantidad = $(this).find('td').eq(1).find('input').val();
        var cantidadFloat = parseInt(cantidad);
        if (cantidadFloat > 0) {
            var cantidad = $(this).find('td').eq(1).find('input').val();
            var denominacion = $(this).find('td').eq(0).html();
            var total = $(this).find('td').eq(2).html();
            var linea = [denominacion, cantidad, total]
            productos[i] = linea;
            i++;
        }
    });
    //console.log(JSON.stringify(productos));
    printTextAreaMovimiento(productos, "fondo", $('span#nombresUsuario').html())
        //ImprimirReciboAvance(JSON.stringify(productos),fondo);
}

function GuardarEfectivoCuadreDiario(denominacion, cantidad, total) {

    $.ajax({
        method: "POST",
        url: "Ajax/Aj_Caja.php",
        data: {

            Requerimiento: "GuardarEfectivoCuadreDiario",
            Denominacion: denominacion,
            Cantidad: cantidad,
            Total: total
        },
        dataType: "JSON",

    }).done(function(respuesta) {

    }).fail(function(jqXHR, textStatus, errorThrown) {
        console.log(errorThrown);
    });

}

function CargarFacturasChequeCajero() {

    $.ajax({
        method: "POST",
        url: "Ajax/Aj_Caja.php",
        data: {
            Requerimiento: "CargarFacturasChequeCajero"
        },
        dataType: 'JSON',
    }).done(function(respuesta) {
        try {
            tablaCheque.clear();
        } catch (error) {}

        $.each(respuesta, function(i, value) {


            tablaCheque.row.add(value);

        });
        tablaCheque.draw();

    });

}

$('.body').on('click', 'td#numeroCheques', function(evt) {
    $('#TablaFacturasCheque').toggle(200);
    tablaCheque.columns.adjust().draw();
});

$('.body').on('click', 'button#ImprimirCuadreDiario', function(evt) {
    ImprimirFinalAvance("avance");
});

$('.body').on('click', 'button#ReimprimirFondo', function(evt) {
    ImprimirFinalFondo('fondo');
});

function CargarFacturasTarjetaCajero() {

    $.ajax({
        method: "POST",
        url: "Ajax/Aj_Caja.php",
        data: {
            Requerimiento: "CargarFacturasTarjetaCajero"
        },
        dataType: 'JSON',
    }).done(function(respuesta) {
        try {
            tablaVoucher.clear();
        } catch (error) {}

        $.each(respuesta, function(i, value) {


            tablaVoucher.row.add(value);

        });
        tablaVoucher.draw();

    });

}
$('.body').on('click', 'td#numeroTarjeta', function(evt) {

    $('#TablaFacturasTarjeta').toggle(200);
    tablaVoucher.columns.adjust().draw();
});

function CargarFacturasAnticipoCajero() {

    $.ajax({
        method: "POST",
        url: "Ajax/Aj_Caja.php",
        data: {
            Requerimiento: "CargarFacturasAnticipoCajero"
        },
        dataType: 'JSON',
    }).done(function(respuesta) {
        try {
            tablaAnticipo.clear();
        } catch (error) {}

        $.each(respuesta, function(i, value) {


            tablaAnticipo.row.add(value);

        });
        tablaAnticipo.draw();

    });

}
$('.body').on('click', 'td#numeroAnticiposA', function(evt) {

    $('#TablaFacturasAnticipo').toggle(200);
    tablaAnticipo.columns.adjust().draw();
});

function CargarFacturasCreditoCajero() {

    $.ajax({
        method: "POST",
        url: "Ajax/Aj_Caja.php",
        data: {
            Requerimiento: "CargarFacturasCreditoCajero"
        },
        dataType: 'JSON',
    }).done(function(respuesta) {
        try {
            tablaCredito.clear();
        } catch (error) {}

        $.each(respuesta, function(i, value) {


            tablaCredito.row.add(value);

        });
        tablaCredito.draw();

    });

}

$('.body').on('click', 'td#numeroCuentasxC', function(evt) {

    $('#TablaFacturasCredito').toggle(200);
    tablaCredito.columns.adjust().draw();
});

function CargarIcAnticipos() {

    $.ajax({
        async: false,
        method: "POST",
        url: "Ajax/Aj_Caja.php",
        data: {
            Requerimiento: "CargarIcAnticipoCajero"
        },
        dataType: 'JSON',
    }).done(function(respuesta) {
        try {
            tablaIcAnticipo.clear();
        } catch (error) {}

        $.each(respuesta, function(i, value) {


            tablaIcAnticipo.row.add(value);
            if (value[2] == 'EFECTIVO' || value[2] == 'NOTA DE CREDITO') {
                efectivoAnticipos = efectivoAnticipos + parseFloat(value[1]);
            }

        });
        tablaIcAnticipo.draw();

    });

}

$('.body').on('click', 'td#numeroAnticiposR', function(evt) {

    $('#TablaIcAnticipo').toggle(200);
    tablaIcAnticipo.columns.adjust().draw();
});

function CargarTransferenciasCajero() {
    $.ajax({
        method: "POST",
        url: "Ajax/Aj_Caja.php",
        data: {
            Requerimiento: "CargarTransferenciasCajero"
        },
        dataType: 'JSON',
    }).done(function(respuesta) {
        try {
            tablaTransferencias.clear();
        } catch (error) {}

        $.each(respuesta, function(i, value) {


            tablaTransferencias.row.add(value);

        });
        tablaTransferencias.draw();

    });

}

$('.body').on('click', 'td#numeroTransferencias', function(evt) {

    $('#TablaFacturasTransferencias').toggle(200);
    tablaTransferencias.columns.adjust().draw();
});

function CargarAbonosCajero() {
    $.ajax({
        async: false,
        method: "POST",
        url: "Ajax/Aj_Caja.php",
        data: {
            Requerimiento: "CargarAbonosCajero"
        },
        dataType: 'JSON',
    }).done(function(respuesta) {
        try {
            tablaAbonos.clear();
        } catch (error) {}

        $.each(respuesta, function(i, value) {


            tablaAbonos.row.add(value);
            if (value[2] == 'EFECTIVO' || value[2] == 'NOTA DE CREDITO') {
                efectivoCxC = efectivoCxC + parseFloat(value[1]);
            }

        });
        tablaAbonos.draw();

    });

}
$('.body').on('click', 'td#numeroAbonos', function(evt) {
    $('#TablaIcAbono').toggle(200);
    tablaAbonos.columns.adjust().draw();
});

function CargarEgresos() {

    $.ajax({

        method: "POST",
        url: "Ajax/Aj_Caja.php",
        data: {
            Requerimiento: "CargarEgresos"
        },
        dataType: 'JSON',
    }).done(function(respuesta) {
        try {
            tablaEgreso.clear();
        } catch (error) {}

        $.each(respuesta, function(i, value) {


            tablaEgreso.row.add(value);


        });
        tablaEgreso.draw();

    });

}

$('.body').on('click', 'td#numeroEgresos', function(evt) {

    $('#TablaEgresos').toggle(200);
    tablaEgreso.columns.adjust().draw();
});

function CargarNotaCredito() {

    $.ajax({

        method: "POST",
        url: "Ajax/Aj_Caja.php",
        data: {
            Requerimiento: "CargarNotaCredito"
        },
        dataType: 'JSON',
    }).done(function(respuesta) {

        try {
            tablaNc.clear();
        } catch (error) {}

        $.each(respuesta, function(i, value) {


            tablaNc.row.add(value);


        });
        CargarNotaCreditof();

    });

}

function CargarNotaCreditof() {

    $.ajax({

        method: "POST",
        url: "Ajax/Aj_Caja.php",
        data: {
            Requerimiento: "CargarNotaCreditof"
        },
        dataType: 'JSON',
    }).done(function(respuesta) {


        $.each(respuesta, function(i, value) {


            tablaNc.row.add(value);


        });
        tablaNc.draw();

    });

}

$('.body').on('click', 'td#numeroNc', function(evt) {

    $('#TablaNC').toggle(200);
    tablaNc.columns.adjust().draw();
});

function CargarEfectivoCajero() {

    $.ajax({
        async: false,
        method: "POST",
        url: "Ajax/Aj_Caja.php",
        data: {
            Requerimiento: "CargarEfectivoCajero"
        },
        dataType: 'JSON',
    }).done(function(respuesta) {


        var total = 0;
        $.each(respuesta, function(i, value) {

            total = total + parseFloat(value[5]);


            $('#TablaEfectivo tbody tr td:contains(' + value[3] + ')').parent().find('input').val(value[4]);
            $('#TablaEfectivo tbody tr').find('input').attr('disabled', true);
            $('#TablaEfectivo tbody tr td:contains(' + value[3] + ')').parent().find('td').eq(2).html("$ " + value[5]);
        });
        $("#SumaTotalEfectivo").html("$ " + total.toFixed(2));
        //$("#TotalEfectivoCajero").html("$ "+total.toFixed(2));
        //efectivoCajero = total;
        if (total > 0) {

            $('button#GuardarCuadreDiario').fadeOut(0);
            $('button#ReimprimirCuadre').fadeIn(0);
            //$("#SumaTotalFondo").html(CalcularTotalFondo());
        }
    });

}

$('.body').on('click', 'button#ReimprimirCuadre', function(evt) {
    var totalEfectivoCajero = CalcularTotalEfectivo();
    swal({
        title: "Esculapio",
        text: "SEGURO QUE DESEA REIMPRIMIR?",
        icon: "info",
        buttons: true,
        dangerMode: false,
    }).then((confirma) => {
        if (confirma) {

            var diferencia = 0;
            if (totalEfectivoCajero < efectivoCd) {
                diferencia = efectivoCd - totalEfectivoCajero;

            }
            if (totalEfectivoCajero > efectivoCd) {
                diferencia = totalEfectivoCajero - efectivoCd;

            }
            if (totalEfectivoCajero == efectivoCd) {
                diferencia = totalEfectivoCajero - efectivoCd;

            }

            ImprimirFinal(efectivoCd, diferencia, efectivoCd);


        }
    });
});

function ValidarFacturasFormaPago() {


    $.ajax({
        async: false,
        method: "POST",
        url: "Ajax/Aj_Facturas.php",
        data: {
            Requerimiento: "ValidarFacturasFormaPago"
        },
        dataType: "JSON",

    });
}
ValidarFacturasFormaPago();
CargarAvance();
CargarFondo();
CargarFacturasChequeCajero();
CargarFacturasTarjetaCajero();
CargarFacturasAnticipoCajero();
CargarFacturasCreditoCajero();
CargarTransferenciasCajero();
CargarIcAnticipos();
CargarAbonosCajero();
CargarEgresos();
CargarNotaCredito();
CargarOtros();
CargarEfectivoCajero();


function ImprimirReciboAvance(productos, tipo) {
    if (tipo == 'avance') {
        var efectivo = $('.body').find('span#SumaTotal').text();
    } else {
        var efectivo = $('.body').find('span#SumaTotalFondo').text();
    }
    $.ajax({
        async: false,
        method: "POST",
        url: "Controladores/Con_Impresion_Recibo.php",
        data: {
            Requerimiento: "ImprimirReciboAvance",
            Productos: productos,
            Efectivo: efectivo,
            Tipo: tipo
        },
        dataType: 'JSON',
    }).done(function(respuesta) {}).fail(function(jqXHR, textStatus, errorThrown) {
        swal("Esculapio!", "Ocurrio un error consulte con la administracion..!  " + errorThrown + " Se cargara la pantalla nuevamente para solucionar el problema.", "error");
    });
}

function printTextAreaMovimiento(productos, tipo, usuario) {
    if (tipo == 'avance') {
        var efectivo = $('.body').find('span#SumaTotal').text();
    } else {
        var efectivo = $('.body').find('span#SumaTotalFondo').text();
    }
    var today = new Date();
    var date = today.getDate() + '/' + (today.getMonth() + 1) + '/' + today.getFullYear();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    var dateTime = date + ' ' + time;

    var cuerpo = "<html>" +
        "<head>" +
        "</head>" +
        "<body>" +
        "<div style='position: absolute; width:100%; margin-top: 0.8em;'><label style='font-weight:normal;'>Dispensario Médico</label></div>" +
        "<br>" +
        "<div style='width:100%;  margin-top: 0.8em; font-size: 14px;'><label style='font-weight:normal;'>" + $("#razonEmpresa").val() + "</label></div>" +
        "<div style='width:100%; '><label style='font-weight:normal; font-size: 9px;'>R.U.C " + $("#rucEmpresa").val() + "</div>" +
        "<div style='width:100%; '><label style='font-weight:normal; font-size: 9px;'>" + $("#dirEmpresa").val() + "</div>" +

        "<div style='width:100%; '><label style='font-weight:normal; font-size: 9px;'>Telf : " + $("#telEmpresa").val() + "</div>" +

        "<div style='margin-top: 20px'>"
        //+"<div style='width:100%; '><label style='font-weight:normal; font-size: 11px;'>R.U.C 0998545254525</label></div>"
        //+"<div style='width:100%; '><label style='font-weight:normal; font-size: 11px;'>DIRECCION  : Av.Las Exclusas Mz 45-A Solar 37 Bloque 1</label></div>"
        //+"<div style='width:100%; '><label style='font-weight:normal; font-size: 11px;'>TELEFONO : 0996655525</label></div>"
        +
        "<div style='width:100%; '><label style='font-weight:normal; font-size: 9px;'>--------------------------------------------------------------------------------------------------</label></div>"
    if (tipo == 'avance') {
        cuerpo += "<div style='width:100%; '><label style='font-weight:normal; font-size: 11px;'>AVANCE DE CAJA - " + dateTime + "</label></div>";
    } else {
        cuerpo += "<div style='width:100%; '><label style='font-weight:normal; font-size: 11px;'>FONDO DE CAJA - " + dateTime + "</label></div>";
    }

    cuerpo += "<div style='width:100%; '><label style='font-weight:normal; font-size: 9px;'>--------------------------------------------------------------------------------------------------</label></div>" +
        "<div style='width:100%; '><label style='font-weight:normal; font-size: 11px;'>USUARIO    : " + usuario + "</label></div>";
    if (productos.length > 0) {
        cuerpo += "<div style='width:100%; '><label style='font-weight:normal; font-size: 9px;'>--------------------------------------------------------------------------------------------------</label></div>" +
            "<div style='width:100%; '><label style='font-weight:normal; font-size: 9px;'>DENOMINACIÓN</label><label style='font-weight:normal; font-size: 9px;float:right;'>CANTIDAD</label><label style='font-weight:normal; font-size: 9px;float:right;'>TOTAL</label></div>" +
            "<div style='width:100%; '><label style='font-weight:normal; font-size: 9px;'>--------------------------------------------------------------------------------------------------</label></div>";
        for (var i = 0; i < productos.length; i++) {
            cuerpo += "<div style='width:100%; '><div style='width: 60%; display: inline-block;'><label style='font-weight:normal; font-size: 11px;'>» " + productos[i][0] + "</label></div><div style='width: 20%; display: inline-block; text-align: right;'><span style='font-weight:normal; font-size: 11px;'>" + productos[i][1] + "</span></div><div style='width: 20%; display: inline-block; text-align: right;'><span style='font-weight:normal; font-size: 11px;'>" + productos[i][2] + "</span></div></div>";
            /*+"<div style='width:100%; '><label style='font-weight:normal; font-size: 11px;'>Fecha Atencion : </label></div>"
            +"<div style='width:100%; '><label style='font-weight:normal; font-size: 9px;'>----------------------------------------------------------------------------------------</label></div>"
            +"<div style='width:100%; '><label style='font-weight:normal; font-size: 9px;'>Item</label><label style='font-weight:normal; font-size: 9px;margin-left: 35px;'>Precio</label><label style='font-weight:normal; font-size: 9px;margin-left: 75px;'>Dcto(%)</label><label style='font-weight:normal; font-size: 9px;margin-left: 65px;'>Total</label></div>"
            +"<div style='width:100%; '><label style='font-weight:normal; font-size: 9px;'>----------------------------------------------------------------------------------------</label></div>"
            +"<div style='width:100%; '><label style='font-weight:normal; font-size: 11px;'>Fecha Atencion : </label></div>";   */
        }
    }
    //+"<div style='width:100%; '><label style='font-weight:normal; font-size: 9px;'>----------------------------------------------------------------------------------------</label></div>"
    cuerpo += "<div style='width:100%; '><label style='font-weight:normal; font-size: 11px;'>EFECTIVO - CAJERO</label><label style='font-weight:normal; font-size: 11px;float: right;'>" + efectivo + "</label></div>  " +
        "<br>"; +
    "<div style='width:100%; '><label style='font-weight:normal; font-size: 9px;'>-----------------------------------------------------------------------------------</div>" +
    "<div style='width:100%; '><label style='font-weight:normal; font-size: 9px;'>--------------------------------------------------------------------------------------------------</div>"



    cuerpo += "<div style='width:100%;margin-top: 30px'><label style='font-weight:normal; font-size: 11px;'>SOFTWARE DESARROLLADO POR IPSE</label></div>";
    childWindow = window.open('_blank', 'FACTURA', 'scrollbars,status');
    childWindow.document.write(cuerpo);
    childWindow.document.write('<script type="text/javascript">setTimeout(function(){ window.print(); window.close();}, 500); </script>');
    childWindow.document.write('</body></html>');
}

function ImprimirReciboCuadre(productos, productos1, productos2, productos3, productos4, productos5, productos6, productos7, productos8, productos9, efectivoCd, diferencia, totalDinero) {
    var nAvance = $('.body').find('#tablaCuadreDiario tr td#numeroAvance span').text();
    var vAvance = $('.body').find('#tablaCuadreDiario tr td#TotalAvance').text();
    var nAnticipoR = $('.body').find('#tablaCuadreDiario tr td#numeroAnticiposR span').text();
    var vAnticipoR = $('.body').find('#tablaCuadreDiario tr td#TotalAnticipoRecibido').text();
    var nAbonos = $('.body').find('#tablaCuadreDiario tr td#numeroAbonos span').text();
    var vAbonos = $('.body').find('#tablaCuadreDiario tr td#TotalAbonos').text();
    var nAnticipoD = $('.body').find('#tablaCuadreDiario tr td#numeroAnticiposA span').text();
    var vAnticipoD = $('.body').find('#tablaCuadreDiario tr td#TotalAnticipoAplicado').text();
    var nCuentas = $('.body').find('#tablaCuadreDiario tr td#numeroCuentasxC span').text();
    var vCuentas = $('.body').find('#tablaCuadreDiario tr td#TotalCuentas').text();
    var nNotas = $('.body').find('#tablaCuadreDiario tr td#numeroNc span').text();
    var vNotas = $('.body').find('#tablaCuadreDiario tr td#totalNc').text();
    var nEgresos = $('.body').find('#tablaCuadreDiario tr td#numeroEgresos span').text();
    var vEgresos = $('.body').find('#tablaCuadreDiario tr td#TotalEgresos').text();
    var nTarjetas = $('.body').find('#tablaCuadreDiario tr td#numeroTarjeta span').text();
    var vTarjetas = $('.body').find('#tablaCuadreDiario tr td#TotalTarjeta').text();
    var nCheque = $('.body').find('#tablaCuadreDiario tr td#numeroCheques span').text();
    var vCheque = $('.body').find('#tablaCuadreDiario tr td#TotalCheque').text();
    var nTranferencia = $('.body').find('#tablaCuadreDiario tr td#numeroTransferencias span').text();
    var vTranferencia = $('.body').find('#tablaCuadreDiario tr td#TotalTransferencias').text();
    var fechaFondo = $('.body').find('#tablaCuadreDiario tr td#FondoCaja').text();
    var vFondo = $('.body').find('#tablaCuadreDiario tr td#TotalFondo').text();
    var vEfectivo = CalcularTotalEfectivo();
    $.ajax({
        async: false,
        method: "POST",
        url: "Controladores/Con_Impresion_Recibo.php",
        data: {
            Requerimiento: "ImprimirReciboCuadre",
            Productos: productos,
            Productos1: productos1,
            Productos2: productos2,
            Productos3: productos3,
            Productos4: productos4,
            Productos5: productos5,
            Productos6: productos6,
            Productos7: productos7,
            Productos8: productos8,
            Productos9: productos9,
            NAvance: nAvance,
            VAvance: vAvance,
            NAnticipoR: nAnticipoR,
            VAnticipoR: vAnticipoR,
            NAbonos: nAbonos,
            VAbonos: vAbonos,
            NAnticipoD: nAnticipoD,
            VAnticipoD: vAnticipoD,
            NCuentas: nCuentas,
            VCuentas: vCuentas,
            NNotas: nNotas,
            VNotas: vNotas,
            NEgresos: nEgresos,
            VEgresos: vEgresos,
            NTarjetas: nTarjetas,
            VTarjetas: vTarjetas,
            NCheque: nCheque,
            VCheque: vCheque,
            NTransferencia: nTranferencia,
            VTransferencia: vTranferencia,
            FechaFondo: fechaFondo,
            VFondo: vFondo,
            VEfectivo: vEfectivo,
            EfectivoCd: efectivoCd,
            Diferencia: diferencia,
            TotalDinero: totalDinero
        },
        dataType: 'JSON',
    }).done(function(respuesta) {
        efectivoCd = 0;
        chequeCd = 0;
        tarjetaCd = 0;
        anticipoApCd = 0;
        anticipoRCd = 0;
        NcCd = 0;
        CxCCd = 0;
        efectivoSistema = 0;
        sumaTotalCd = 0;
        avanceCd = 0;
        efectivoAnticipos = 0;
        efectivoCxC = 0;
        ValidarFacturasFormaPago();
        CargarAvance();
        CargarFondo();
        CargarFacturasChequeCajero();
        CargarFacturasTarjetaCajero();
        CargarFacturasAnticipoCajero();
        CargarFacturasCreditoCajero();
        CargarTransferenciasCajero();
        CargarIcAnticipos();
        CargarAbonosCajero();
        CargarEgresos();
        CargarNotaCredito();
        CargarOtros();
        CargarEfectivoCajero();
    }).fail(function(jqXHR, textStatus, errorThrown) {
        efectivoCd = 0;
        chequeCd = 0;
        tarjetaCd = 0;
        anticipoApCd = 0;
        anticipoRCd = 0;
        NcCd = 0;
        CxCCd = 0;
        efectivoSistema = 0;
        sumaTotalCd = 0;
        avanceCd = 0;
        efectivoAnticipos = 0;
        efectivoCxC = 0;
        ValidarFacturasFormaPago();
        CargarAvance();
        CargarFondo();
        CargarFacturasChequeCajero();
        CargarFacturasTarjetaCajero();
        CargarFacturasAnticipoCajero();
        CargarFacturasCreditoCajero();
        CargarTransferenciasCajero();
        CargarIcAnticipos();
        CargarAbonosCajero();
        CargarEgresos();
        CargarNotaCredito();
        CargarOtros();
        CargarEfectivoCajero();
    });
}

function printTextAreaMovimientoFinal(productos, productos1, productos2, productos3, productos4, productos5, productos6, productos7, productos8, productos9, efectivoCd, diferencia, totalDinero) {
    var nAvance = $('.body').find('#tablaCuadreDiario tr td#numeroAvance span').text();
    var vAvance = $('.body').find('#tablaCuadreDiario tr td#TotalAvance').text();
    var nAnticipoR = $('.body').find('#tablaCuadreDiario tr td#numeroAnticiposR span').text();
    var vAnticipoR = $('.body').find('#tablaCuadreDiario tr td#TotalAnticipoRecibido').text();
    var nAbonos = $('.body').find('#tablaCuadreDiario tr td#numeroAbonos span').text();
    var vAbonos = $('.body').find('#tablaCuadreDiario tr td#TotalAbonos').text();
    var nAnticipoD = $('.body').find('#tablaCuadreDiario tr td#numeroAnticiposA span').text();
    var vAnticipoD = $('.body').find('#tablaCuadreDiario tr td#TotalAnticipoAplicado').text();
    var nCuentas = $('.body').find('#tablaCuadreDiario tr td#numeroCuentasxC span').text();
    var vCuentas = $('.body').find('#tablaCuadreDiario tr td#TotalCuentas').text();
    var nNotas = $('.body').find('#tablaCuadreDiario tr td#numeroNc span').text();
    var vNotas = $('.body').find('#tablaCuadreDiario tr td#totalNc').text();
    var nEgresos = $('.body').find('#tablaCuadreDiario tr td#numeroEgresos span').text();
    var vEgresos = $('.body').find('#tablaCuadreDiario tr td#TotalEgresos').text();
    var nTarjetas = $('.body').find('#tablaCuadreDiario tr td#numeroTarjeta span').text();
    var vTarjetas = $('.body').find('#tablaCuadreDiario tr td#TotalTarjeta').text();
    var nCheque = $('.body').find('#tablaCuadreDiario tr td#numeroCheques span').text();
    var vCheque = $('.body').find('#tablaCuadreDiario tr td#TotalCheque').text();
    var nTranferencia = $('.body').find('#tablaCuadreDiario tr td#numeroTransferencias span').text();
    var vTranferencia = $('.body').find('#tablaCuadreDiario tr td#TotalTransferencias').text();
    var fechaFondo = $('.body').find('#tablaCuadreDiario tr td#FondoCaja').text();
    var vFondo = $('.body').find('#tablaCuadreDiario tr td#TotalFondo').text();
    var vEfectivo = CalcularTotalEfectivo();
    var today = new Date();
    var date = today.getDate() + '/' + (today.getMonth() + 1) + '/' + today.getFullYear();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    var dateTime = date + ' ' + time;
    var estilo = "<style type='text/css'>body {font-family: monospace;}</style>";
    var cuerpo = "<html>" +
        "<head>" +
        "</head>" +
        estilo +
        "<body>" +
        "<div style='width:100%; margin-top: 0.8em;'><center><label style='font-weight:bold;'>" + $("#razonEmpresa").val() + "</label></center></div>" +
        "<br>" +
        "<div style='width:100%; '><label style='font-weight:normal; font-size: 11px;'>R.U.C " + $("#rucEmpresa").val() + "</div>" +
        "<div style='width:100%; '><label style='font-weight:normal; font-size: 11px;'>" + $("#dirEmpresa").val() + "</div>"

    +"<div style='width:100%; '><label style='font-weight:normal; font-size: 11x;'>Telf : " + $("#telEmpresa").val() + "</div>"

    +
    "<div style='margin-top: 20px'>"
    //+"<div style='width:100%; '><label style='font-weight:normal; font-size: 11px;'>R.U.C 0998545254525</label></div>"
    //+"<div style='width:100%; '><label style='font-weight:normal; font-size: 11px;'>DIRECCION  : Av.Las Exclusas Mz 45-A Solar 37 Bloque 1</label></div>"
    //+"<div style='width:100%; '><label style='font-weight:normal; font-size: 11px;'>TELEFONO : 0996655525</label></div>"
    +
    "<div style='width:100%; '><label style='font-weight:normal; font-size: 9px;'>----------------------------------------------------</label></div>"
    cuerpo += "<div style='width:100%; '><label style='font-weight:normal; font-size: 11px;'>CUADRE DE CAJA DIARIO - " + dateTime + "</label></div>";


    cuerpo += "<div style='width:100%; '><label style='font-weight:normal; font-size: 9px;'>----------------------------------------------------</label></div>" +
        "<div style='width:100%; '><label style='font-weight:normal; font-size: 11px;'>USUARIO    : " + $("#nombresUsuario").html() + "</label></div>";
    cuerpo += "<div style='width:100%; '><label style='font-weight:normal; font-size: 9px;'>----------------------------------------------------</label></div>" +
        "<div style='width:100%; '><label style='font-weight:normal; font-size: 9px;'>FONDO DE CAJA</label><label style='font-weight:normal; font-size: 9px;float:right;'>" + vFondo + "</label><label style='font-weight:normal; font-size: 9px;float:right;margin-right:4em;'>" + fechaFondo + "</label></div>"

    if (productos1.length > 0) {
        cuerpo += "<div style='width:100%; '><label style='font-weight:normal; font-size: 9px;'>----------------------------------------------------</label></div>" +
            "<div style='width:100%; '><label style='font-weight:normal; font-size: 9px;'>NUMERO</label><label style='font-weight:normal; font-size: 9px;float:right;margin-right:4em;'>TOTAL</label><label style='font-weight:normal; font-size: 9px;float:right;'>FORMA PAGO</label></div>" +
            "<div style='width:100%; '><label style='font-weight:normal; font-size: 9px;'>----------------------------------------------------</label></div>";
        for (var i = 0; i < productos1.length; i++) {
            cuerpo += "<div style='width:100%; '><div style='width: 60%; display: inline-block;'><label style='font-weight:normal; font-size: 11px;'>» " + productos1[i][0] + "</label></div><div style='width: 20%; display: inline-block; text-align: right;'><span style='font-weight:normal; font-size: 11px;'>" + parseFloat(productos1[i][1]).toFixed(2) + "</span></div><div style='width: 20%; display: inline-block; text-align: right;'><span style='font-weight:normal; font-size: 11px;'>" + productos1[i][2] + "</span></div></div>";
            /*+"<div style='width:100%; '><label style='font-weight:normal; font-size: 11px;'>Fecha Atencion : </label></div>"
            +"<div style='width:100%; '><label style='font-weight:normal; font-size: 9px;'>----------------------------------------------------------------------------------------</label></div>"
            +"<div style='width:100%; '><label style='font-weight:normal; font-size: 9px;'>Item</label><label style='font-weight:normal; font-size: 9px;margin-left: 35px;'>Precio</label><label style='font-weight:normal; font-size: 9px;margin-left: 75px;'>Dcto(%)</label><label style='font-weight:normal; font-size: 9px;margin-left: 65px;'>Total</label></div>"
            +"<div style='width:100%; '><label style='font-weight:normal; font-size: 9px;'>----------------------------------------------------------------------------------------</label></div>"
            +"<div style='width:100%; '><label style='font-weight:normal; font-size: 11px;'>Fecha Atencion : </label></div>";   */
        }
    }
    cuerpo += "<div style='width:100%; '><label style='font-weight:normal; font-size: 9px;'>----------------------------------------------------</label></div>" +
        "<div style='width:100%; '><label style='font-weight:normal; font-size: 9px;'>LIQ. CUENTAS X COBRAR</label><label style='font-weight:normal; font-size: 9px;float:right;'>" + vAbonos + "</label><label style='font-weight:normal; font-size: 9px;float:right;margin-right:4em;'>" + nAbonos + "</label></div>"

    if (productos2.length > 0) {
        cuerpo += "<div style='width:100%; '><label style='font-weight:normal; font-size: 9px;'>---------------------------------------------------------------</label></div>" +
            "<div style='width:100%; '><label style='font-weight:normal; font-size: 9px;'>NUMERO</label><label style='font-weight:normal; font-size: 9px;float:right;'>TOTAL</label><label style='font-weight:normal; font-size: 9px;float:right;'>FORMA PAGO</label></div>" +
            "<div style='width:100%; '><label style='font-weight:normal; font-size: 9px;'>----------------------------------------------------</label></div>";
        for (var i = 0; i < productos2.length; i++) {
            cuerpo += "<div style='width:100%; '><div style='width: 60%; display: inline-block;'><label style='font-weight:normal; font-size: 11px;'>» " + productos2[i][0] + "</label></div><div style='width: 20%; display: inline-block; text-align: right;'><span style='font-weight:normal; font-size: 11px;'>" + parseFloat(productos2[i][1]).toFixed(2) + "</span></div><div style='width: 20%; display: inline-block; text-align: right;'><span style='font-weight:normal; font-size: 11px;'>" + productos2[i][2] + "</span></div></div>";
        }
    }
    cuerpo += "<div style='width:100%; '><label style='font-weight:normal; font-size: 9px;'>----------------------------------------------------</label></div>" +
        "<div style='width:100%; '><label style='font-weight:normal; font-size: 9px;'>AVANCES</label><label style='font-weight:normal; font-size: 9px;float:right;'>" + vAvance + "</label><label style='font-weight:normal; font-size: 9px;float:right;margin-right:4em;'>" + nAvance + "</label></div>"

    if (productos.length > 0) {
        cuerpo += "<div style='width:100%; '><label style='font-weight:normal; font-size: 9px;'>----------------------------------------------------</label></div>" +
            "<div style='width:100%; '><label style='font-weight:normal; font-size: 9px;'>FECHA HORA</label><label style='font-weight:normal; font-size: 9px;margin-left: 150px;'>TOTAL</label></div>" +
            "<div style='width:100%; '><label style='font-weight:normal; font-size: 9px;'>----------------------------------------------------</label></div>";
        for (var i = 0; i < productos.length; i++) {
            cuerpo += "<div style='width:100%; '><div style='width: 80%; display: inline-block;'><label style='font-weight:normal; font-size: 11px;'>» " + productos[i][0] + "</label></div><div style='width: 20%; display: inline-block; text-align: right;'><span style='font-weight:normal; font-size: 11px;'>" + parseFloat(productos[i][1]).toFixed(2) + "</span></div></div>";
        }
    }
    cuerpo += "<div style='width:100%; '><label style='font-weight:normal; font-size: 9px;'>----------------------------------------------------</label></div>" +
        "<div style='width:100%; '><label style='font-weight:normal; font-size: 9px;'>CUENTAS X COBRAR</label><label style='font-weight:normal; font-size: 9px;float:right;'>" + vCuentas + "</label><label style='font-weight:normal; font-size: 9px;float:right;margin-right:4em;'>" + nCuentas + "</label></div>"

    if (productos4.length > 0) {
        cuerpo += "<div style='width:100%; '><label style='font-weight:normal; font-size: 9px;'>----------------------------------------------------</label></div>" +
            "<div style='width:100%; '><label style='font-weight:normal; font-size: 9px;'>NUMERO</label><label style='font-weight:normal; font-size: 9px;float:right;'>TOTAL</label><label style='font-weight:normal; font-size: 9px;float:right;'>PAGADO</label></div>" +
            "<div style='width:100%; '><label style='font-weight:normal; font-size: 9px;'>----------------------------------------------------</label></div>";
        for (var i = 0; i < productos4.length; i++) {
            cuerpo += "<div style='width:100%; '><div style='width: 60%; display: inline-block;'><label style='font-weight:normal; font-size: 11px;'>» " + productos4[i][0] + "</label></div><div style='width: 20%; display: inline-block; text-align: right;'><span style='font-weight:normal; font-size: 11px;'>" + parseFloat(productos4[i][1]).toFixed(2) + "</span></div><div style='width: 20%; display: inline-block; text-align: right;'><span style='font-weight:normal; font-size: 11px;'>" + productos4[i][2] + "</span></div></div>";
        }
    }
    cuerpo += "<div style='width:100%; '><label style='font-weight:normal; font-size: 9px;'>----------------------------------------------------</label></div>" +
        "<div style='width:100%; '><label style='font-weight:normal; font-size: 9px;'>ANTICIPOS DEVENGADOS</label><label style='font-weight:normal; font-size: 9px;float:right;'>" + vAnticipoD + "</label><label style='font-weight:normal; font-size: 9px;float:right;margin-right:4em;'>" + nAnticipoD + "</label></div>"

    if (productos3.length > 0) {
        cuerpo += "<div style='width:100%; '><label style='font-weight:normal; font-size: 9px;'>----------------------------------------------------</label></div>" +
            "<div style='width:100%; '><label style='font-weight:normal; font-size: 9px;'>NUMERO</label><label style='font-weight:normal; font-size: 9px;float:right;'>TOTAL</label><label style='font-weight:normal; font-size: 9px;float:right;'>PAGADO</label></div>" +
            "<div style='width:100%; '><label style='font-weight:normal; font-size: 9px;'>----------------------------------------------------</label></div>";
        for (var i = 0; i < productos3.length; i++) {
            cuerpo += "<div style='width:100%; '><div style='width: 60%; display: inline-block;'><label style='font-weight:normal; font-size: 11px;'>» " + productos3[i][0] + "</label></div><div style='width: 20%; display: inline-block; text-align: right;'><span style='font-weight:normal; font-size: 11px;'>" + parseFloat(productos3[i][1]).toFixed(2) + "</span></div><div style='width: 20%; display: inline-block; text-align: right;'><span style='font-weight:normal; font-size: 11px;'>" + productos3[i][2] + "</span></div></div>";
        }
    }
    cuerpo += "<div style='width:100%; '><label style='font-weight:normal; font-size: 9px;'>----------------------------------------------------</label></div>" +
        "<div style='width:100%; '><label style='font-weight:normal; font-size: 9px;'>NOTAS DE CREDITO</label><label style='font-weight:normal; font-size: 9px;float:right;'>" + vNotas + "</label><label style='font-weight:normal; font-size: 9px;float:right;margin-right:4em;'>" + nNotas + "</label></div>"

    if (productos5.length > 0) {
        cuerpo += "<div style='width:100%; '><label style='font-weight:normal; font-size: 9px;'>----------------------------------------------------</label></div>" +
            "<div style='width:100%; '><label style='font-weight:normal; font-size: 9px;'>NUMERO NC</label><label style='font-weight:normal; font-size: 9px;float:right;'>NUMERO FC</label><label style='font-weight:normal; font-size: 9px;float:right;'>TOTAL</label></div>" +
            "<div style='width:100%; '><label style='font-weight:normal; font-size: 9px;'>----------------------------------------------------</label></div>";
        for (var i = 0; i < productos5.length; i++) {
            cuerpo += "<div style='width:100%; '><div style='width: 60%; display: inline-block;'><label style='font-weight:normal; font-size: 11px;'>» " + productos5[i][0] + "</label></div><div style='width: 20%; display: inline-block; text-align: right;'><span style='font-weight:normal; font-size: 11px;'>" + parseFloat(productos5[i][1]).toFixed(2) + "</span></div><div style='width: 20%; display: inline-block; text-align: right;'><span style='font-weight:normal; font-size: 11px;'>" + productos5[i][2] + "</span></div></div>";
        }
    }
    cuerpo += "<div style='width:100%; '><label style='font-weight:normal; font-size: 9px;'>----------------------------------------------------</label></div>" +
        "<div style='width:100%; '><label style='font-weight:normal; font-size: 9px;'>EGRESOS DE CAJA</label><label style='font-weight:normal; font-size: 9px;float:right;'>" + vEgresos + "</label><label style='font-weight:normal; font-size: 9px;float:right;margin-right:4em;'>" + nEgresos + "</label></div>"

    if (productos6.length > 0) {
        cuerpo += "<div style='width:100%; '><label style='font-weight:normal; font-size: 9px;'>----------------------------------------------------</label></div>" +
            "<div style='width:100%; '><label style='font-weight:normal; font-size: 9px;'>NUMERO</label><label style='font-weight:normal; font-size: 9px;float:right;'>TOTAL</label><label style='font-weight:normal; font-size: 9px;float:right;'>FORMA PAGO</label></div>" +
            "<div style='width:100%; '><label style='font-weight:normal; font-size: 9px;'>----------------------------------------------------</label></div>";
        for (var i = 0; i < productos6.length; i++) {
            cuerpo += "<div style='width:100%; '><div style='width: 60%; display: inline-block;'><label style='font-weight:normal; font-size: 11px;'>» " + productos6[i][0] + "</label></div><div style='width: 20%; display: inline-block; text-align: right;'><span style='font-weight:normal; font-size: 11px;'>" + parseFloat(productos6[i][1]).toFixed(2) + "</span></div><div style='width: 20%; display: inline-block; text-align: right;'><span style='font-weight:normal; font-size: 11px;'>" + productos6[i][2] + "</span></div></div>";
        }
    }
    cuerpo += "<div style='width:100%; '><label style='font-weight:normal; font-size: 9px;'>----------------------------------------------------</label></div>" +
        "<div style='width:100%; '><label style='font-weight:normal; font-size: 9px;'>CHEQUE</label><label style='font-weight:normal; font-size: 9px;float:right;'>" + vCheque + "</label><label style='font-weight:normal; font-size: 9px;float:right;margin-right:4em;'>" + nCheque + "</label></div>"

    if (productos8.length > 0) {
        cuerpo += "<div style='width:100%; '><label style='font-weight:normal; font-size: 9px;'>----------------------------------------------------</label></div>" +
            "<div style='width:100%; '><label style='font-weight:normal; font-size: 9px;'>NUMERO</label><label style='font-weight:normal; font-size: 9px;margin-left: 60px;'>BANCO</label><label style='font-weight:normal; font-size: 9px;margin-left: 60px;'>TOTAL</label><label style='font-weight:normal; font-size: 9px;float:right;'PAGADO</label></div>" +
            "<div style='width:100%; '><label style='font-weight:normal; font-size: 9px;'>----------------------------------------------------</label></div>";
        for (var i = 0; i < productos8.length; i++) {
            cuerpo += "<div style='width:100%; '><div style='width: 30%; display: inline-block;'><label style='font-weight:normal; font-size: 11px;'>» " + productos8[i][0] + "</label></div><div style='width: 30%; display: inline-block;'><label style='font-weight:normal; font-size: 11px;'>» " + productos8[i][1] + "</label></div><div style='width: 20%; display: inline-block; text-align: right;'><span style='font-weight:normal; font-size: 11px;'>" + parseFloat(productos8[i][2]).toFixed(2) + "</span></div><div style='width: 20%; display: inline-block; text-align: right;'><span style='font-weight:normal; font-size: 11px;'>" + productos8[i][3] + "</span></div></div>";
        }
    }
    cuerpo += "<div style='width:100%; '><label style='font-weight:normal; font-size: 9px;'>----------------------------------------------------</label></div>" +
        "<div style='width:100%; '><label style='font-weight:normal; font-size: 9px;'>TARJETA DE CREDITO</label><label style='font-weight:normal; font-size: 9px;float:right;'>" + vTarjetas + "</label><label style='font-weight:normal; font-size: 9px;float:right;margin-right:4em;'>" + nTarjetas + "</label></div>"

    if (productos7.length > 0) {
        cuerpo += "<div style='width:100%; '><label style='font-weight:normal; font-size: 9px;'>----------------------------------------------------</label></div>" +
            "<div style='width:100%; '><label style='font-weight:normal; font-size: 9px;'>NUMERO</label><label style='font-weight:normal; font-size: 9px;margin-left: 60px;'>TARJETA</label><label style='font-weight:normal; font-size: 9px;margin-left: 60px;'>TOTAL</label><label style='font-weight:normal; font-size: 9px;float:right;'PAGADO</label></div>" +
            "<div style='width:100%; '><label style='font-weight:normal; font-size: 9px;'>----------------------------------------------------</label></div>";
        for (var i = 0; i < productos7.length; i++) {
            cuerpo += "<div style='width:100%; '><div style='width: 30%; display: inline-block;'><label style='font-weight:normal; font-size: 11px;'>» " + productos7[i][0] + "</label></div><div style='width: 30%; display: inline-block;'><label style='font-weight:normal; font-size: 11px;'>» " + productos7[i][1] + "</label></div><div style='width: 20%; display: inline-block; text-align: right;'><span style='font-weight:normal; font-size: 11px;'>" + parseFloat(productos7[i][2]).toFixed(2) + "</span></div><div style='width: 20%; display: inline-block; text-align: right;'><span style='font-weight:normal; font-size: 11px;'>" + productos7[i][3] + "</span></div></div>";
        }
    }
    cuerpo += "<div style='width:100%; '><label style='font-weight:normal; font-size: 9px;'>----------------------------------------------------</label></div>" +
        "<div style='width:100%; '><label style='font-weight:normal; font-size: 9px;'>TRANFERENCIAS</label><label style='font-weight:normal; font-size: 9px;float:right;'>" + vTranferencia + "</label><label style='font-weight:normal; font-size: 9px;float:right;margin-right:4em;'>" + nTranferencia + "</label></div>"

    if (productos9.length > 0) {
        cuerpo += "<div style='width:100%; '><label style='font-weight:normal; font-size: 9px;'>----------------------------------------------------</label></div>" +
            "<div style='width:100%; '><label style='font-weight:normal; font-size: 9px;'>NUMERO</label><label style='font-weight:normal; font-size: 9px;margin-left: 60px;'>BANCO</label><label style='font-weight:normal; font-size: 9px;margin-left: 60px;'>TOTAL</label><label style='font-weight:normal; font-size: 9px;float:right;'PAGADO</label></div>" +
            "<div style='width:100%; '><label style='font-weight:normal; font-size: 9px;'>----------------------------------------------------</label></div>";
        for (var i = 0; i < productos9.length; i++) {
            cuerpo += "<div style='width:100%; '><div style='width: 30%; display: inline-block;'><label style='font-weight:normal; font-size: 11px;'>» " + productos8[i][0] + "</label></div><div style='width: 30%; display: inline-block;'><label style='font-weight:normal; font-size: 11px;'>» " + productos9[i][1] + "</label></div><div style='width: 20%; display: inline-block; text-align: right;'><span style='font-weight:normal; font-size: 11px;'>" + parseFloat(productos9[i][2]).toFixed(2) + "</span></div><div style='width: 20%; display: inline-block; text-align: right;'><span style='font-weight:normal; font-size: 11px;'>" + productos9[i][3] + "</span></div></div>";
        }
    }
    //+"<div style='width:100%; '><label style='font-weight:normal; font-size: 9px;'>----------------------------------------------------------------------------------------</label></div>"
    cuerpo += "<div style='width:100%; '><label style='font-weight:normal; font-size: 9px;'>----------------------------------------------------</div>";
    cuerpo += "<div style='width:100%; '><label style='font-weight:normal; font-size: 11px;'>EFECTIVO AL CIERRE</label><label style='font-weight:normal; font-size: 11px;float: right;'>" + parseFloat(vEfectivo).toFixed(2) + "</label></div>  ";
    cuerpo += "<div style='width:100%; '><label style='font-weight:normal; font-size: 9px;'>----------------------------------------------------</div>";
    cuerpo += "<div style='width:100%; '><label style='font-weight:normal; font-size: 11px;'>CUADRE DEL SISTEMA</label><label style='font-weight:normal; font-size: 11px;float: right;'>" + parseFloat(totalDinero).toFixed(2) + "</label></div>  ";
    cuerpo += "<div style='width:100%; '><label style='font-weight:normal; font-size: 9px;'>----------------------------------------------------</div>";
    cuerpo += "<br>";
    if (parseFloat(parseFloat(vEfectivo).toFixed(2)) < parseFloat(parseFloat(totalDinero).toFixed(2))) {
        cuerpo += "<div style='width:100%; '><label style='font-weight:normal; font-size: 11px;'>SU CAJA ESTA DESCUADRADA, TIENE UN FALTANTE DE </label><label style='font-weight:normal; font-size: 11px;float: right;'>" + parseFloat(diferencia).toFixed(2) + "</label></div>  ";
    }
    if (parseFloat(parseFloat(vEfectivo).toFixed(2)) > parseFloat(parseFloat(totalDinero).toFixed(2))) {
        cuerpo += "<div style='width:100%; '><label style='font-weight:normal; font-size: 11px;'>SU CAJA ESTA DESCUADRADA, TIENE UN SOBRANTE DE</label><label style='font-weight:normal; font-size: 11px;float: right;'>" + parseFloat(diferencia).toFixed(2) + "</label></div>  ";
    }
    if (parseFloat(parseFloat(vEfectivo).toFixed(2)) == parseFloat(parseFloat(totalDinero).toFixed(2))) {
        cuerpo += "<div style='width:100%; '><label style='font-weight:normal; font-size: 11px;'>SU CAJA ESTA CUADRADA</label></div>  ";
    }


    cuerpo += "<div style='width:100%; '><label style='font-weight:normal; font-size: 9px;'>----------------------------------------</div>";



    cuerpo += "<div style='width:100%;margin-top: 30px'><label style='font-weight:normal; font-size: 11px;'>SOFTWARE DESARROLLADO POR IPSE</label></div>";
    childWindow = window.open('_blank', 'FACTURA', 'scrollbars,status');
    childWindow.document.write(cuerpo);
    childWindow.document.write('<script type="text/javascript">setTimeout(function(){ window.print(); window.close();}, 500); </script>');
    childWindow.document.write('</body></html>');
}