var primeravezInventario = true;
var tableModalMotivo = null;
var tablaInventario = null;
var tablaDetalle2 = null;
var tablaDetalle = null;
var id = 0;
var idOrdenCompra = 0;
var nombreEstablecimiento = $('.body').find('label#nombreEsta').attr('nombreEstablecimiento');
var usuario = $('.body').find('label#nombreUsuario').attr('nombreUsuario');

/////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////

$(".body").on('change', "select#movimiento", function(ev) {
    if ($(this).val() == "INGRESO") {
        $('select#tipoMovi').find('option[tipo="EGRESO"]').css("display", "none");
        $('select#tipoMovi').find('option[tipo="INGRESO"]').css("display", "block");
    }

    if ($(this).val() == "EGRESO") {
        $('select#tipoMovi').find('option[tipo="EGRESO"]').css("display", "block");
        $('select#tipoMovi').find('option[tipo="INGRESO"]').css("display", "none");
    }

});
$('.body table#datatableModalMotivo tbody').on('dblclick', 'tr', function(evt) {

    var id = $(this).find('td').eq(0).html();
    var nombreComercial = $(this).find('td').eq(1).html();
    var presentacion1 = $(this).find('td').eq(2).html();
    var presentacion2 = $(this).find('td').eq(4).html();
    var prst1 = tableModalMotivo.row($(this)).data()[18];
    var prst2 = tableModalMotivo.row($(this)).data()[19];
    var stockCaja = tableModalMotivo.row($(this)).data()[15];
    var stockUnidad = tableModalMotivo.row($(this)).data()[20];

    if (prst2 == "(NINGUNO)" && prst1 == "NINGUNA") {
        swal("Esculapio", "NO SE PUEDE INGRESAR SI NO EXISTE PRESENTACION, POR FAVOR CONSULTE CON EL ADMINISTRADOR", "error");
        return;
    }

    $('.body').find('h4#NombreComercialPresentacion').text(nombreComercial);
    $('.body').find('label#IdDetalle').text(id);
    $('.body').find('label#NombreComercialDetalle').text(nombreComercial);

    if (prst2 == "(NINGUNO)" || prst2 == null) {
        $('.body').find('span#PresentacionDespacho1').fadeOut(1);
        $('.body').find('input#PresentacionDespacho3').fadeOut(1);
        $('.body').find('input#PresentacionDespacho4').prop('checked', true);
    } else {
        $('.body').find('span#PresentacionDespacho1').fadeIn(1);
        $('.body').find('input#PresentacionDespacho3').fadeIn(1);
    }

    if (prst1 == "NINGUNA") {
        $('.body').find('span#PresentacionDespacho2').fadeOut(1);
        $('.body').find('input#PresentacionDespacho4').fadeOut(1);
        $('.body').find('input#PresentacionDespacho3').prop('checked', true);
    } else {
        $('.body').find('span#PresentacionDespacho2').fadeIn(1);
        $('.body').find('input#PresentacionDespacho4').fadeIn(1);
    }



    $('.body').find('span#PresentacionDespacho1').text(prst2 /*presentacion1*/ );
    $('.body').find('span#PresentacionDespacho2').text(prst1 /*presentacion2*/ );
    $('.body').find('input#PresentacionDespacho3').val(prst2 /*presentacion1*/ );
    $('.body').find('input#PresentacionDespacho4').val(prst1 /*presentacion2*/ );
    $('.body').find('label#IvaDetalle').text(tableModalMotivo.row($(this)).data()[10]);
    $('.body').find('label#Costo1Detalle').text(tableModalMotivo.row($(this)).data()[7]);
    $('.body').find('label#StockCaja').text(stockCaja);
    $('.body').find('label#StockUnidad').text(stockUnidad);
    $('.body').find('label#PresentacionNo').text(presentacion1);
    $('#modal-despacho2').modal();
});

function LlenarTablaInventarioFactura() {
    tableModalMotivo = $('#datatableModalMotivo').DataTable({
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
                Requerimiento: "LlenarTablaInvtarioMovimiento1"
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
                "targets": [0, 1, 2, 3, 4, 5, 6, 14, 15, 16, 17, 18, 19, 20],
                "orderable": false,
            },
            {
                "targets": [4, 5, 6, 7, 8, 9, 10, 12, 13, 14, 16, 17, 18, 19],
                "visible": false,
                "searchable": false
            }
        ]
    });
    tableModalMotivo.on('key', function(e, datatable, key, cell, originalEvent) {
        if (key == 13) {
            $('#datatableModalMotivo tbody tr').eq(datatable.row(cell.index().row).index()).find('td').eq(0).dblclick();
        }
    });
    $('#datatableModalMotivo_filter input').unbind();
    $('#datatableModalMotivo_filter input').remove();
    $('#datatableModalMotivo_filter label').remove();
    // $('input#apellidoMFiltro').remove();
    $('input#nombreComercialF').bind('keyup', function(e) {
        if (e.keyCode != 40) {
            tableModalMotivo.column(4).search($('input#principioF').val()).draw();
            tableModalMotivo.column(2).search($('input#presentacionF').val()).draw();
            tableModalMotivo.column(1).search($('input#nombreComercialF').val()).draw();
            tableModalMotivo.column(3).search($('select#bodegaMovi').val()).draw();
        }
        if (e.keyCode == 40) {
            $(this).blur();
            $('#datatableModalMotivo tbody tr td').eq(0).click();
        }
    });
    $('input#presentacionF').bind('keyup', function(e) {
        if (e.keyCode != 40) {
            tableModalMotivo.column(4).search($('input#principioF').val()).draw();
            tableModalMotivo.column(2).search($('input#presentacionF').val()).draw();
            tableModalMotivo.column(1).search($('input#nombreComercialF').val()).draw();
            tableModalMotivo.column(3).search($('select#bodegaMovi').val()).draw();
        }
        if (e.keyCode == 40) {
            $(this).blur();
            $('#datatableModalMotivo tbody tr td').eq(0).click();
        }
    });
    $('input#principioF').bind('keyup', function(e) {
        if (e.keyCode != 40) {
            tableModalMotivo.column(4).search($('input#principioF').val()).draw();
            tableModalMotivo.column(2).search($('input#presentacionF').val()).draw();
            tableModalMotivo.column(1).search($('input#nombreComercialF').val()).draw();
            tableModalMotivo.column(3).search($('select#bodegaMovi').val()).draw();
        }
        if (e.keyCode == 40) {
            $(this).blur();
            $('#datatableModalMotivo tbody tr td').eq(0).click();
        }
    });

}

$(".body").on('keyup', "input#ElegirCantidad", function(ev) {

    if (ev.keyCode == 13) {
        if ($(this).val() < 1) {
            swal("Esculapio!", "Ingrese La Cantidad", "warning");
            return;
        } else {
            try { tableModalMotivo.cell.blur(); } catch (error) {}
            $('button#AgregarProductos').click();
        }
    }
});




$('.body').on('keyup', 'input#FormaBode', function(evt) {
    $('.body').find('table#Presentacion tbody tr td input#cantidad2').val($(this).val());
});

$(".body div#DefinirPorcentaje").on('change', "input[name=radioPorcentaje]", function(ev) {
    if ($('.body').find('input#radioPorcentajeValor').is(':checked')) {
        $('.body').find('div#PorValor').fadeIn(1);
        $('.body').find('div#PorPorcentaje').fadeOut(1);
    }
    if ($('.body').find('input#radioPorcentajePorcentaje').is(':checked')) {
        $('.body').find('div#PorValor').fadeOut(1);
        $('.body').find('div#PorPorcentaje').fadeIn(1);
    }
});


tablaDetalle = $('#datatableDetalleFactFarmacia2').DataTable({
    'paging': false,
    'lengthChange': false,
    'searching': false,
    'ordering': false,
    'info': true,
    'autoWidth': true,
    scrollY: 200,
    scrollX: true,
    "columnDefs": [{
        "targets": [11, 12],
        "visible": false,
        "searchable": false
    }]
});



function AgregarProductosDetalle() {
    var cantidad = $('.body').find('input#ElegirCantidad').val();
    var stockCaja = parseInt($('.body').find('label#StockCaja').html());
    var stockUnidad = parseInt($('.body').find('label#StockUnidad').html());
    var tipo = $('.body').find('select#movimiento').val().trim();
    var precio = '';
    var descuento = '';
    var id = $('.body').find('label#IdDetalle').text();
    var presentacionno = $('.body').find('label#PresentacionNo').text();
    var item = $('.body').find('label#NombreComercialDetalle').text();
    var presentacion = $('.body').find("input[name=PresentacionDespacho]:checked").val();
    var nivel = 1;
    if ($('.body').find("input[name=PresentacionDespacho]:checked").attr("id") == "PresentacionDespacho4") {
        nivel = 2;
    }
    if (tipo == "EGRESO") {
        if (nivel == 1) {
            if (cantidad > stockCaja) {
                swal("Esculapio!", "La cantidad ingresada es mayor al stock del item " + item, "error");
                return;
            }
        } else {
            if (cantidad > stockUnidad) {
                swal("Esculapio!", "La cantidad ingresada es mayor al stock del item " + item, "error");
                return;
            }
        }
    }

    if ($('.body').find('input#PresentacionDespacho3').is(':checked')) {
        precio = '<input style="width:80px;" type="number" required step=".01" class="form-control" id="PrecioProducto"  placeholder="PRECIO">';
        var valorDescuento = parseFloat($('.body').find('label#Descuento1Detalle').text());
        descuento = '<input style="width:80px;" type="number" required step=".01" value=0 min=0 class="form-control" id="DescuentoDetalle"  placeholder="DESCUENTO">';
    } else {
        precio = '<input style="width:80px;" type="number" required class="form-control" id="PrecioProducto"  placeholder="PRECIO">';
        var valorDescuento = parseFloat($('.body').find('label#Descuento1Detalle').text());
        descuento = '<input style="width:80px;" type="number" required step=".01" value=0 min=0 class="form-control" id="DescuentoDetalle"  placeholder="DESCUENTO">';
    }
    var precioCaja = '<input style="width:80px;" type="number" required class="form-control" id="PrecioCajaProducto" value="0" placeholder="PRECIO CAJA">';
    var valorCantidad = $('.body').find('input#ElegirCantidad').val();
    var cantidad = '<input style="width:80px;" type="number" required step=".01" value="' + $('.body').find('input#ElegirCantidad').val() + '" class="form-control" id="CantidadDetalleFact"  placeholder="CANTIDAD">';
    var subtotal = 0;
    var iva = $('.body').find('label#IvaDetalle').text();
    var pvp = 0; //$('.body').find('label#Pvp1Detalle').text();
    var boton = '<button type="submit" id="EliminarItemConsulta" class="btn btn-danger"><i class="fa fa-trash-o" aria-hidden="true"></i></button>';
    if (tipo == "EGRESO") {
        cantidad = '<input disabled style="width:80px;" type="number" required step=".01" value="' + $('.body').find('input#ElegirCantidad').val() + '" class="form-control" id="CantidadDetalleFact"  placeholder="CANTIDAD">';
        precioCaja = '<input disabled style="width:80px;" type="number" required class="form-control" id="PrecioCajaProducto" value="0" placeholder="PRECIO CAJA">';
        precio = '<input style="width:80px;" type="number" required step=".01" class="form-control" id="PrecioProducto" value="' + $('.body').find('label#Costo1Detalle').html() + '" disabled placeholder="PRECIO">';
        descuento = '<input style="width:80px;" type="number" required step=".01" value=0 min=0 class="form-control" disabled id="DescuentoDetalle"  placeholder="DESCUENTO">';
    }
    if (!ExisteIten(id, item, presentacion)) {
        var campos = [id, item, presentacion, cantidad, precio, precioCaja, subtotal, iva, descuento, "$ " + pvp, boton, nivel, presentacionno];
        tablaDetalle.row.add(campos).draw(true);
    }
    CalcularTotalMovimientos();
    try {
        var tid = setInterval(function() {
            tablaDetalle.columns.adjust().draw();
            $('.body table#datatableDetalleFactFarmacia2 tbody').find('td input#PrecioProducto').focus();
            clearInterval(tid);
        }, 500);
    } catch (error) {
        console.log(error);
    }
}


$(".body").on('click', "button#consultasFacturaMotivo", function(evt) {
    var tipo = $('.body').find('select#movimiento').val().trim();
    if (tipo == "SELECCIONAR") {
        swal("Esculapio!", "PRIMERO SELECIONE EL TIPO DE MOVIMIENTO", "warning");
        return;
    } else {
        $('.body').find('div#modal-consultasMotivo').modal();
    }
});

$(".body").on('click', "button#AgregarProductos", function(evt) {
    if ($('input#ElegirCantidad').val() < 1) {
        swal("Esculapio!", "Ingrese La Cantidad", "warning");
        return;
    } else {
        AgregarProductosDetalle();
        $(".body").find("div#modal-despacho2 button.close").click();
        $(".body").find("div#modal-consultasMotivo button.close").click();
    }
});

$('#modal-consultasMotivo').on('hidden.bs.modal', function() {
    $('.body table#datatableDetalleFactFarmacia2 tbody').find('td input#PrecioProducto').focus();
});

$('#modal-despacho2').on('hidden.bs.modal', function() {
    $('.body table#datatableDetalleFactFarmacia2 tbody').find('td input#PrecioProducto').focus();
});

function ExisteIten(idIten, item, itemp) {
    var confirma = false;
    var vector = $('.body').find("#datatableDetalleFactFarmacia2 tbody tr");
    $.each(vector, function(a) {
        var idf = $(this).find('td').eq(0).html();
        var itemf = $(this).find('td').eq(1).html();
        var itemP = $(this).find('td').eq(2).html();
        if (idf == idIten && itemf == item && itemP == itemp) {
            confirma = true;
        }
    });
    return confirma;
}

$(".body table#datatableDetalleFactFarmacia2").on('click', "button#EliminarItemConsulta", function(evt) {
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
            CalcularTotalMovimientos();
        } else {}
    });
});

function CalcularTotalMovimientos() {
    var vector = $('.body').find("#datatableDetalleFactFarmacia2 tbody tr");
    var subtotal = 0;
    var descuento = 0;
    var iva = 0;
    var total = 0;

    $.each(vector, function(a) {

        try {
            var st = $(this).find("input#PrecioProducto").val() * $(this).find('input#CantidadDetalleFact').val();

            var ivaf = $(this).find('td').eq(7).html();
            var descf = $(this).find("input#DescuentoDetalle").val();
            if (descf < 1 || descf == "") {
                descf = 0;
            }

            $(this).find('td').eq(6).html("$ " + parseFloat(st).toFixed(2));
            st = st - (st * (descf / 100));
            var tf = 0;
            if (ivaf == "S") {
                tf = st * 1.12;
            } else {
                tf = st;
            }

            $(this).find('td').eq(9).html("$ " + parseFloat(tf).toFixed(2));

            var subf = parseFloat($(this).find('td').eq(6).html().replace('$', ''));
            var desf = parseFloat($(this).find('td').eq(8).find('input').val())
            desf = subf * (desf / 100);
            subf = subf - desf;
            descuento += desf;
            if ($(this).find('td').eq(7).html() == "S") {
                iva += subf * 0.12;
            }

            subtotal += parseFloat($(this).find('td').eq(6).html().replace('$', ''));
            total += parseFloat($(this).find('td').eq(9).html().replace('$', ''));
        } catch (error) { console.log(error); }


    });

    $('span#subtotal').html(subtotal.toFixed(2));
    $('span#descuento').html(descuento.toFixed(2));
    $('span#iva').html(iva.toFixed(2));
    $('span#total').html(parseFloat(total).toFixed(2));

}

$(".body").on('keyup', "input#CantidadDetalleFact", function(evt) {
    if (evt.keyCode == 13) {
        $('.body table#datatableDetalleFactFarmacia2 tbody').find('td input#PrecioProducto').focus();
    }
});

$(".body").on('keyup', "input#PrecioProducto", function(evt) {
    if (evt.keyCode == 13) {
        $('.body table#datatableDetalleFactFarmacia2 tbody').find('td input#PrecioCajaProducto').focus();
    }
});

$(".body").on('keyup', "input#PrecioCajaProducto", function(evt) {
    if (evt.keyCode == 13) {
        $('.body table#datatableDetalleFactFarmacia2 tbody').find('td input#DescuentoDetalle').focus();
    }
});

$(".body").on('keyup', "input#DescuentoDetalle", function(evt) {
    if (evt.keyCode == 13) {
        $('.body table#datatableDetalleFactFarmacia2 tbody').find('td input#CantidadDetalleFact').focus();
    }
});


$(".body").on('keyup', "input#NumeroFactMovi", function(evt) {
    if (evt.keyCode == 13) {
        $('.body').find('select#bodegaMovi').focus();
    }
});

$(".body").on('keydown', "select#bodegaMovi", function(evt) {
    if (evt.keyCode == 39) {
        evt.preventDefault();
        //$('.body').find('select#bodegaMovi').blur();
        $('.body').find('select#proveMovi').focus();
    }
});

$(".body").on('keydown', "select#proveMovi", function(evt) {
    if (evt.keyCode == 39) {
        evt.preventDefault();
        //$('.body').find('select#bodegaMovi').blur();
        $('.body').find('select#movimiento').focus();
    }
});

$(".body").on('keydown', "select#movimiento", function(evt) {
    if (evt.keyCode == 39) {
        evt.preventDefault();
        //$('.body').find('select#bodegaMovi').blur();
        $('.body').find('select#tipoMovi').focus();
    }
});

$(".body").on('keydown', "select#tipoMovi", function(evt) {
    if (evt.keyCode == 39) {
        evt.preventDefault();
        //$('.body').find('select#bodegaMovi').blur();
        $('.body').find('input#fechaMovi').focus();
    }
});

$(".body").on('keydown', "input#fechaMovi", function(evt) {
    if (evt.keyCode == 39) {
        evt.preventDefault();
        //$('.body').find('select#bodegaMovi').blur();
        $('.body').find('textarea#textAreaMovi').focus();
    }
});

$(".body").on('focus', "input#DescuentoDetalle", function(evt) {
    if ($(this).val() == '0') {
        $(this).val("");
    }
});

$(".body").on('blur', "input#DescuentoDetalle", function(evt) {
    if ($(this).val() == '') {
        $(this).val("0");
    }
});

$(document).ready(function() {
    if (parametroURL('pagina') == 'movimiento') {
        $(document).keydown(function(tecla) {
            if (121 == tecla.keyCode || tecla.keyCode == 112 || tecla.keyCode == 113 || tecla.keyCode == 114 || tecla.keyCode == 115 ||
                tecla.keyCode == 116 || tecla.keyCode == 117 || tecla.keyCode == 118 || tecla.keyCode == 119) {
                tecla.preventDefault();
            }
            if (121 == tecla.keyCode) {
                $('button#GuardarMotivos').click();
            }
            if (113 == tecla.keyCode) {
                tecla.preventDefault();
                $('button#consultasFacturaMotivo').click();
            }
            if (114 == tecla.keyCode) {
                tecla.preventDefault();
                $('button#consultamovimiento').click();
            }
        });
    }
});


function CargarComboProveedores() {
    $.ajax({

        method: "POST",
        url: "Ajax/Aj_ManteBodega.php",
        data: {
            Requerimiento: "CargarComboProveedores"
        },
        dataType: 'JSON',
    }).done(function(respuesta) {

        if (respuesta[0] == false) {
            swal("Esculapio!", "OCURRIO UN ERROR.", "error");
            return;
        }


        $.each(respuesta, function(i, value) {
            var elem = ' <option value="' + value.id + '">' + value.descripcion + '</option> ';
            $("select#proveMovi").append(elem);
        });
        $('.selectpicker').selectpicker('refresh');

    });
}
CargarComboProveedores();

var primeraVezMovimientos = true;
$('#modal-consultasMotivo').on('shown.bs.modal', function() {
    if (primeraVezMovimientos) {
        LlenarTablaInventarioFactura();
        primeraVezMovimientos = false;


    }
    $('input#principioF').val("");
    $('input#presentacionF').val("");
    $('input#nombreComercialF').val("");
    tableModalMotivo.column(3).search($('select#bodegaMovi').val()).draw();
    tableModalMotivo.column(4).search($('input#principioF').val()).draw();
    tableModalMotivo.column(2).search($('input#presentacionF').val()).draw();
    tableModalMotivo.column(1).search($('input#nombreComercialF').val()).draw();
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

$(".body").on('change', "input#PrecioProducto", function(ev) {

    try {
        var subtotal = $(this).parent().parent().find("input#PrecioProducto").val() * $(this).parent().parent().find('input#CantidadDetalleFact').val();
        var iva = $(this).parent().parent().find('td').eq(7).html();
        var descuento = $(this).parent().parent().find("input#DescuentoDetalle").val();
        if (descuento < 1 || descuento == "") {
            descuento = 0;
        }

        $(this).parent().parent().find('td').eq(6).html("$ " + parseFloat(subtotal).toFixed(2));
        subtotal = subtotal - (subtotal * (descuento / 100));
        var total = 0;
        if (iva == "S") {
            total = subtotal * 1.12;
        } else {
            total = subtotal;
        }

        $(this).parent().parent().find('td').eq(9).html("$ " + parseFloat(total).toFixed(2));

    } catch (error) { $(this).parent().parent().find('td').eq(6).html("$ 0.0"); }

    CalcularTotalMovimientos();
});

$(".body").on('change', "input#CantidadDetalleFact", function(ev) {

    try {
        var subtotal = $(this).parent().parent().find("input#PrecioProducto").val() * $(this).parent().parent().find('input#CantidadDetalleFact').val();
        var iva = $(this).parent().parent().find('td').eq(7).html();
        var descuento = $(this).parent().parent().find("input#DescuentoDetalle").val();
        if (descuento < 1 || descuento == "") {
            descuento = 0;
        }

        $(this).parent().parent().find('td').eq(6).html("$ " + parseFloat(subtotal).toFixed(2));
        subtotal = subtotal - (subtotal * (descuento / 100));
        var total = 0;
        if (iva == "S") {
            total = subtotal * 1.12;
        } else {
            total = subtotal;
        }
        console.log(total)
        $(this).parent().parent().find('td').eq(9).html("$ " + parseFloat(total).toFixed(2));

    } catch (error) { $(this).parent().parent().find('td').eq(6).html("$ 0.0"); }

    CalcularTotalMovimientos();
});

$(".body").on('change', "input#DescuentoDetalle", function(ev) {

    try {
        var subtotal = $(this).parent().parent().find("input#PrecioProducto").val() * $(this).parent().parent().find('input#CantidadDetalleFact').val();
        var iva = $(this).parent().parent().find('td').eq(7).html();
        var descuento = $(this).parent().parent().find("input#DescuentoDetalle").val();
        if (descuento < 1 || descuento == "") {
            descuento = 0;
        }

        $(this).parent().parent().find('td').eq(6).html("$ " + parseFloat(subtotal).toFixed(2));
        subtotal = subtotal - (subtotal * (descuento / 100));
        var total = 0;
        if (iva == "S") {
            total = subtotal * 1.12;
        } else {
            total = subtotal;
        }
        $(this).parent().parent().find('td').eq(9).html("$ " + parseFloat(total).toFixed(2));

    } catch (error) { $(this).parent().parent().find('td').eq(6).html("$ 0.0"); }
    CalcularTotalMovimientos();
});



$('#modal-despacho2').on('shown.bs.modal', function() {
    $("input#ElegirCantidad").focus();
    $('input#ElegirCantidad').val("");
});


//////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////
function ValidarCampoCaja() {
    var vector = $(".body").find("#datatableDetalleFactFarmacia2 tbody tr");
    var validar = true;
    $.each(vector, function(a) {
        var precioCaja = parseFloat($(this).find("td").eq(5).find("input").val());
        if (precioCaja == 0 || precioCaja == "") {
            validar = false;
        }

    });
    return validar;
}

function ValidarNumero(numero) {
    var confirma = false;
    $.ajax({
        async: false,
        method: "POST",
        url: "Ajax/Aj_ManteBodega.php",
        data: {
            Requerimiento: "ValidarNumero",
            Numero: numero
        },
        dataType: 'JSON',
    }).done(function(respuesta) {

        if (respuesta[0] == false) {
            swal("Esculapio!", "OCURRIO UN ERROR AL VALIDAR EL NUMERO DE MOVIMIENTO.", "error");
            return;
        }
        $.each(respuesta, function(i, value) {
            if (value[0] > 0) {
                confirma = true;
            }
        });

    });
    return confirma;
}



$(".body").on('click', "button#GuardarMotivos", function(ev) {
    var numero = $('.body').find('input#NumeroFactMovi').val().trim();
    var bodega = $('.body').find('select#bodegaMovi').val().trim();
    var proveedores = $('.body').find('select#proveMovi').val().trim();
    var proveedor = $('.body').find('select#proveMovi option:selected').text().trim();
    var tipo = $('.body').find('select#movimiento').val().trim();
    var motivo = $('.body').find('select#tipoMovi').val().trim();
    var concepto = $('.body').find('select#tipoMovi option:selected').text().trim();
    var fecha = $('.body').find('input#fechaMovi').val().trim();
    var observaciones = $('.body').find('textarea#textAreaMovi').val();
    var subtotal = $('.body').find('span#subtotal').html()
    var descuento = $('.body').find('span#descuento').html();
    var iva = $('.body').find('span#iva').html()
    var total = $('.body').find('span#total').html()
    var precio = $('.body table#datatableDetalleFactFarmacia2 tbody').find('td input#PrecioProducto').val();
    var precioCaja = $('.body table#datatableDetalleFactFarmacia2 tbody').find('td input#PrecioCajaProducto').val();
    var descuentaDetalle = $('.body table#datatableDetalleFactFarmacia2 tbody').find('td input#DescuentoDetalle').val();
    if (precioCaja == "") {
        precioCaja = 0;
    }
    if (tipo != "EGRESO") {
        if (precio == "" || precio == 0 || descuentaDetalle == "") {
            swal("Esculapio!", "TODOS LOS DATOS EN EL DETALLE SON OBLIGATORIOS", "warning");
            return;
        }
    }


    if (numero == "") {
        swal("Esculapio!", "Ingrese el numero de factura para continuar", "warning");
        return;
    }

    if (ValidarNumero(numero)) {
        swal("Esculapio!", "Ya existe un movimiento con ese numero de referencia.", "error");
        return;
    }

    var limpiar = $(".body").find('button#LimpiarMotivos');
    var t = $('#datatable').DataTable();
    CalcularTotalMovimientos();
    swal({
        title: "Esculapio",
        text: "Seguro Que Desea Guardar?",
        icon: "info",
        buttons: true,
        dangerMode: false,
    }).then((confirma) => {
        if (confirma) {
            errores = '';
            GuardarMovimiento(numero, bodega, proveedores, tipo, motivo, fecha, observaciones, subtotal, descuento, iva, total, limpiar, proveedor, concepto);
        } else {
            // limpiar.trigger('click');
        }
    });

});

function ObtenerDetalle() {
    var vector = $(".body").find("#datatableDetalleFactFarmacia2 tbody tr");
    var productos = [];

    $.each(vector, function(a) {
        var idItem = $(this).find("td").eq(0).html();
        var presentacion = $(this).find("td").eq(2).html();
        var cantidad = $(this).find("td").eq(3).find("input").val();
        var precio = $(this).find("td").eq(4).find("input").val();
        var precioCaja = parseFloat($(this).find("td").eq(5).find("input").val());
        var subtotal = $(this).find("td").eq(6).html().replace("$", "");
        var iva = $(this).find("td").eq(7).html();
        var descuento = $(this).find("td").eq(8).find("input").val();
        var total = $(this).find("td").eq(9).html().replace("$", "");
        var nivel = tablaDetalle.row($(this)).data()[11];
        var limpiar = $(this).find('button#LimpiarMotivos');

        var lineaDetalle = [idItem, presentacion, cantidad, precio, precioCaja, subtotal, iva, descuento, total, nivel];
        productos[a] = lineaDetalle;

    });

    return JSON.stringify(productos);
}

function GuardarMovimiento(numero, bodega, proveedores, tipo, motivo, fecha, observaciones, subtotal, descuento, iva, total, limpiar, proveedor, concepto) {
    $.ajax({
        method: "POST",
        url: "Ajax/Aj_Movimiento.php",
        data: {
            Requerimiento: "GuardarMovimiento",
            Tipo: tipo,
            Id_motivo: motivo,
            Id_proveedor: proveedores,
            Id_bodega: bodega,
            Numero: numero,
            Concepto: concepto,
            Fecha: fecha,
            Observaciones: observaciones,
            Subtotal: subtotal,
            Iva: iva,
            Descuento: descuento,
            Total: total,
            Detalle: ObtenerDetalle()

        },
        dataType: 'JSON',
    }).done(function(respuesta) {
        if (respuesta[0] == true) {
            if (idOrdenCompra != 0) {
                ModificarOrdenCompra(idOrdenCompra);
            }

            swal({
                title: "Esculapio",
                text: "Guardado con Exito, Desea Imprimir?",
                icon: "info",
                buttons: true,
                dangerMode: false,
            }).then((confirma) => {
                if (confirma) {
                    printTextAreaMovimiento(respuesta[1]);
                    limpiar.trigger('click');
                } else {
                    limpiar.trigger('click');
                }
            });



        }
        if (respuesta[0] == false) {

            swal("Esculapio!", "Ocurrio un Error", "error");
            console.log(respuesta)


            return;
        }
    }).fail(function(jqXHR, textStatus, errorThrown) {
        console.log(errorThrown)
    });
}




$(".body").on('click', "button#LimpiarMotivos", function(ev) {


    $('body').find('select#bodegaMovi').val("33");
    $('body').find('select#proveMovi').val("0");
    $('body').find('select#movimiento').val("SELECCIONAR");
    $('body').find('select#tipoMovi').val("0");
    $('body').find('input#fechaMovi').val();
    $('body').find('textarea#textAreaMovi').val("");
    $('body').find('input#NumeroFactMovi').val("");
    $('body').find('span#subtotal').html("$ 0.00");
    $('body').find('span#descuento').html("$ 0.00");
    $('body').find('span#iva').html("$ 0.00");
    $('body').find('span#total').html("$ 0.00");
    $('.selectpicker').selectpicker('refresh');
    tablaDetalle.clear().draw();

});

function printTextAreaMovimiento(secuencia) {

    var tipoF = $('.body').find('select#movimiento').val();
    var bodega = $('.body').find('select#bodegaMovi option:selected').text().trim();
    var fecha = $('.body').find('input#fechaMovi').val();
    var hora = $('.body').find('label#HoraMovi').text();
    var numero = $('.body').find('input#NumeroFactMovi').val();
    var proveedor = $('.body').find('select#proveMovi option:selected').text().trim();
    var total1 = $('.body').find('span#total').html();
    var items = tablaDetalle.rows().count();
    var motivo = $('.body').find('select#movimiento option:selected').text().trim() + ' - ' + $('.body').find('select#tipoMovi option:selected').text().trim();;
    var observaciones = $('.body').find('textarea#textAreaMovi').val();
    var tipo = '';
    if (tipoF == "INGRESO") {
        tipo = "INGRESO A BODEGA";
    } else {
        tipo = "EGRESO DE BODEGA";
    }
    var establecimiento = '<div style="position: absolute; width:100%; text-align: center"><label style="font-weight:bold; font-size: small; text-align: center;">' + nombreEstablecimiento + '</label></div><br>';
    var comprobante = '<div style="width:100%; text-align: center; border: 2px solid black;"><label style="font-weight:bold; font-size: small; text-align: center;">COMPROBANTE DE ' + tipo + ': ' + bodega + ' - ' + secuencia + '</label><br></div>';
    var cabecera = '<div style="position: absolute; width:100%;"><label style="font-weight:bold; font-size: small;">FECHA: ' + fecha + '</label><label style="font-weight:bold; font-size: small; text-align: center; margin-left: 5em;">HORA: ' + hora + '</label><label style="font-weight:bold; font-size: small; text-align: center; margin-left: 3.5em;">REFERENCIA O FACTURA: ' + numero + '</label><br>' +
        '<label style="font-weight:bold; font-size: small;">BODEGA: ' + bodega + '</label><label style="font-weight:bold; font-size: small; text-align: center; margin-left: 14em;">PROVEEDOR: ' + proveedor + '</label><br>' +
        '<label style="font-weight:bold; font-size: small;">MOTIVO: ' + motivo + '</label><br>' +
        '<label style="font-weight:bold; font-size: small;">OBSERVACIONES: ' + observaciones + '</label></div>';
    var addFila = '';
    var vector = $(".body").find("#datatableDetalleFactFarmacia2 tbody tr");
    $.each(vector, function(a) {
        var idItem = $(this).find("td").eq(0).html();
        var item = $(this).find("td").eq(1).html();
        var presentacion = $(this).find("td").eq(2).html();
        var cantidad = $(this).find("td").eq(3).find("input").val();
        var precio = $(this).find("td").eq(4).find("input").val();
        var subtotal = $(this).find("td").eq(6).html().replace("$", "");
        var iva = $(this).find("td").eq(7).html();
        var prese = tablaDetalle.row($(this)).data()[12];
        if (iva == 'N') {
            iva = '0.00';
        } else {
            iva = '12.00';
        }
        var unidad = presentacion.split(" ", 1)
        var descuento = $(this).find("td").eq(8).find("input").val();
        var total = $(this).find("td").eq(9).html().replace("$", "");
        addFila += '<tr><td style="text-align: left; font-size: 10px;">' + idItem + '</td><td style="text-align: left; font-size: 10px;">' + item + ' - ' + prese + '</td><td style="text-align: right; font-size: 10px;">' + cantidad + '</td><td style="text-align: right; font-size: 10px;">' + unidad + '</td><td style="text-align: right; font-size: 10px;">' + precio + '</td><td style="text-align: right; font-size: 10px;">' + descuento + '</td><td style="text-align: right; font-size: 10px;">' + iva + '</td><td style="text-align: right; font-size: 10px;">' + total + '</td></tr>'
    });
    var detalle = '<div style="width:100%; margin-top: 4.5em;"><table width="100%" style"border-collapse: collapse;"><tr><th style="border-bottom: 1px solid black; text-align: center; font-size: 12px;">CODIGO</th><th style="border-bottom: 1px solid black; text-align: center; font-size: 12px;">DESCRIPCION DE ITEM</th><th style="border-bottom: 1px solid black; text-align: center; font-size: 12px;">CANTD</th><th style="border-bottom: 1px solid black; text-align: center; font-size: 12px;">UNID</th><th style="border-bottom: 1px solid black; text-align: center; font-size: 12px;">COSTO</th><th style="border-bottom: 1px solid black; text-align: center; font-size: 12px;">DESCT</th><th style="border-bottom: 1px solid black; text-align: center; font-size: 12px;">IVA</th><th style="border-bottom: 1px solid black;text-align: center; font-size: 12px;">TOTAL</th></tr>' +
        addFila + '</table></div>';
    var detalle2 = '<div style="width:100%; border-top: 1px solid black;"><label style="font-weight:bold;text-align: left; font-size: 12px;">CANTIDAD DE ITEMS:' + items + '</label><label style="font-weight:bold; text-align: left; float: right; font-size: 12px;">TOTAL : ' + total1 + '</label></div><br>';
    var firmas = '<div style="position: absolute; width:100%;"><label style="font-weight:bold; font-size: small; margin-left: 7.5em;">________________________________</label><label style="font-weight:bold; font-size: small; text-align: center; margin-left: 5em;">________________________________</label><br>' +
        '<label style="font-weight:bold; font-size: small; margin-left: 11em;">INGRESADO POR</label><label style="font-weight:bold; font-size: small; text-align: center; margin-left: 13.5em;">REVISADO POR</label><br></label></div>';

    if (tipoF == "INGRESO") {
        printTextAreaVariacion(secuencia);
    }

    childWindow = window.open('', '_blank');

    childWindow.document.write('<html><head></head><body>');
    childWindow.document.write(establecimiento);
    childWindow.document.write(comprobante);
    childWindow.document.write(cabecera);
    childWindow.document.write(detalle);
    childWindow.document.write(detalle2);
    childWindow.document.write(firmas);
    childWindow.document.write('<div style="margin-top:20px;" ></div>');
    childWindow.document.write('</body></html>');
    childWindow.print();
    childWindow.document.close();
    childWindow.close();
}

function printTextAreaVariacion(secuencia) {
    var bodega = $('.body').find('select#bodegaMovi option:selected').text().trim();
    var fecha = $('.body').find('input#fechaMovi').val();
    var numero = $('.body').find('input#NumeroFactMovi').val();
    var proveedor = $('.body').find('select#proveMovi option:selected').text().trim();
    var filastabla = '';
    var vector = $(".body").find("#datatableDetalleFactFarmacia2 tbody tr");
    $.each(vector, function(a) {
        var idItem = $(this).find("td").eq(0).html();
        var item = $(this).find("td").eq(1).html();
        var presentacion = $(this).find("td").eq(2).html();
        var precio = $(this).find("td").eq(4).find("input").val();
        var descuento = $(this).find("td").eq(8).find("input").val();

        precio = precio - (precio * (descuento / 100));

        var anterior = ObtenerCostoAnterior(idItem, presentacion, secuencia);
        if (anterior[0] != "0") {
            anterior[0] = anterior[0] - (anterior[0] * (anterior[2] / 100));
            var variacion = precio - anterior[0];
            filastabla += '<tr>' +
                '<td> ' + idItem + ' </td>' +
                '<td> ' + item + ' </td>' +
                '<td> ' + presentacion + ' </td>' +
                '<td> ' + anterior[1] + ' </td>' +
                '<td> ' + formatoDinero(anterior[0]) + ' </td>' +
                '<td> ' + proveedor + ' </td>' +
                '<td> ' + formatoDinero(precio) + ' </td>' +
                '<td> ' + formatoDinero(variacion) + ' </td>' +
                '</tr>';
        }
    });

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
        '<tr>' +
        '<th> <b> ' + $("#razonEmpresa").val() + '  </b> </th>' +
        '</tr>' +
        '<tr>' +
        '<th> <b>REPORTE DE VARIACIÓN DE COSTOS  </b> </th>' +
        '</tr>' +
        '</thead>' +
        '</table>' +
        '</div>' +
        '<div style="width: 100%;">' +
        '<table style="width: 100%;">' +
        '<tbody>' +
        '<tr>' +
        '<td> <b>INGRESO N° : </b> ' + secuencia + ' </td>' +
        '<td> <b>FECHA : </b> ' + fecha + ' </td>' +
        '<td> <b>REFERENCIA : </b> ' + numero + ' </td>' +
        '<td> <b>BODEGA : </b> ' + bodega + ' </td>' +
        '</tr>' +
        '</tbody>' +
        '</table>' +
        '</div>' +
        '<hr>' +
        '<div style="width: 100%;">' +
        '<table style="width: 100%;text-align: left;">' +
        '<thead>' +
        '<th>ID</th>' +
        '<th>ITEM</th>' +
        '<th>PRESENTACIÓN</th>' +
        '<th>PROVEEDOR ANTERIOR</th>' +
        '<th>COSTO ANTERIOR</th>' +
        '<th>PROVEEDOR NUEVO</th>' +
        '<th>COSTO NUEVO</th>' +
        '<th>VARIACIÓN</th>' +
        '</thead>' +
        '<tbody>' +
        filastabla +
        '</tbody>' +
        '</table>' +
        '</div>' +
        '<script type="text/javascript">setTimeout(function(){ window.print(); window.close();}, 500); </script>' +
        '</body>' +
        '</html>';
    if (filastabla != "") {
        childWindow = window.open('_blank');
        childWindow.document.write(reporte);
    }

}

function ObtenerCostoAnterior(iditem, presentacion, idingreso) {
    var item = ["0", ""];
    $.ajax({
        async: false,
        method: "POST",
        url: "Ajax/Aj_ManteBodega.php",
        data: {
            Requerimiento: "ObtenerCostoAnterior",
            Item: iditem,
            Presentacion: presentacion,
            Ingreso: idingreso
        },
        dataType: 'JSON',
    }).done(function(respuesta) {
        console.log(respuesta)
        $.each(respuesta, function(i, value) {
            item = value;
        });
    });
    return item;
}
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////IMPRIMIR KARDEX/////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function printTextAreaK(secuencia) {
    var item = $('.body').find('h4#producto').text().trim();
    var fechaDesde = $('.body').find('input#fecha_Desde').val();
    var fechaHasta = $('.body').find('input#fecha_Hasta').val();
    var comprobante = '<div style="width:100%; text-align: center; border: 2px solid black;"><label style="font-weight:bold; font-size: small; text-align: center;">KARDEX DEL PRODUCTO: ' + item + '</label><br></div>';
    var cabecera = '<div style="position: absolute; width:100%;"><label style="font-weight:bold; font-size: small;">FECHA DESDE: ' + fechaDesde + '</label><br><label style="font-weight:bold; font-size: small;">FECHA HASTA: ' + fechaHasta + '</label></div>';

    childWindow = window.open('', '_blank');

    // childWindow.document.open();
    childWindow.document.write('<html><head></head><body>');
    childWindow.document.write(comprobante);
    childWindow.document.write(cabecera);
    //childWindow.document.write($('#DatosPaciente').html());
    childWindow.document.write('<div style="margin-top:20px;" ></div>');
    childWindow.document.write(document.getElementById('datatableDetallekardex'));
    //childWindow.document.write(datosRegistro);
    //childWindow.document.write(document.getElementById('plantillaecoWord').value);
    childWindow.document.write('</body></html>');
    childWindow.print();
    childWindow.document.close();
    childWindow.close();
}

$(".body").on('click', "button#PruebaImprimirkarex", function(evt) {
    printTextAreaK()
});

$(".body").on('click', "button#imprimirMovimiento", function(evt) {
    var idMovimineto = $('.body').find('label#IdMovimientoImprimir').text();
    printTextAreaMovimiento(idMovimineto);
});

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////CARGAR CONSULTA KARDEX POR ID//////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

var tablaMovimiento = null;
var tablaOrden = null;
var primeravez3 = false
var primeravez4 = false

$('#modal-consulta-movimiento').on('shown.bs.modal', function() {
    if (!primeravez3) {
        LlenarTablaMovimientos();
        primeravez3 = true;
    }
});

$('#modal-consulta-orden').on('shown.bs.modal', function() {
    if (!primeravez4) {
        LlenarTablaOrden();
        primeravez4 = true;
    }
});

$('#modal-consultasMotivo').on('shown.bs.modal', function() {
    $('input#nombreComercialF').focus();
});

$(".body").on('click', "button#BuscarMovimientoF", function(ev) {
    try {
        tablaMovimiento.destroy();
    } catch (error) {}
    var fechaDesde = $('input#fechaDesdeF').val();
    var fechaHasta = $('input#fechaHastaF').val();;
    LlenarTablaMovimientosFechas(fechaDesde, fechaHasta);
});

$(".body").on('click', "button#BuscarOrden", function(ev) {
    try {
        tablaOrden.destroy();
    } catch (error) {}
    var fechaDesde = $('input#fechaDesdeF').val();
    var fechaHasta = $('input#fechaHastaF').val();;
    LlenarTablaOrdenFechas(fechaDesde, fechaHasta);
});

function LlenarTablaMovimientos() {
    tablaMovimiento = $('#datatableDetalleMovimiento').DataTable({
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
            url: "Ajax/Aj_Movimiento.php",
            data: {
                Requerimiento: "LlenarTablaMovimientos"
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
            "targets": [0, 1, 2, 3, 4],
            "orderable": false,
        }, {
            "targets": [5],
            "orderable": false,
            "visible": false
        }]
    });
    tablaMovimiento.on('key', function(e, datatable, key, cell, originalEvent) {
        if (key == 13) {
            $('#datatableDetalleMovimiento tbody tr').eq(datatable.row(cell.index().row).index()).find('td').eq(0).dblclick();
        }
    });
    $('#datatableDetalleMovimiento_filter input').unbind();
    $('#datatableDetalleMovimiento_filter input').remove();
    $('#datatableDetalleMovimiento_filter label').remove();
    // $('input#apellidoMFiltro').remove();
    $('input#facturaF').bind('keyup', function(e) {
        //if (e.keyCode == 13) {
        tablaMovimiento.column(0).search($('input#facturaF').val()).draw();
        tablaMovimiento.column(1).search($('input#proveedorF').val()).draw();
        tablaMovimiento.column(2).search($('input#tipoMovimientoF').val()).draw();
        //}
        if (e.keyCode == 40) {
            $(this).blur();
            $('#datatableDetalleMovimiento tbody tr td').eq(0).click();
        }
    });
    $('input#proveedorF').bind('keyup', function(e) {
        //if (e.keyCode == 13) {
        tablaMovimiento.column(0).search($('input#facturaF').val()).draw();
        tablaMovimiento.column(1).search($('input#proveedorF').val()).draw();
        tablaMovimiento.column(2).search($('input#tipoMovimientoF').val()).draw();
        //}
        if (e.keyCode == 40) {
            $(this).blur();
            $('#datatableDetalleMovimiento tbody tr td').eq(0).click();
        }
    });
    $('input#tipoMovimientoF').bind('keyup', function(e) {
        //if (e.keyCode == 13) {
        tablaMovimiento.column(0).search($('input#facturaF').val()).draw();
        tablaMovimiento.column(1).search($('input#proveedorF').val()).draw();
        tablaMovimiento.column(2).search($('input#tipoMovimientoF').val()).draw();
        //}
        if (e.keyCode == 40) {
            $(this).blur();
            $('#datatableDetalleMovimiento tbody tr td').eq(0).click();
        }
    });
}


function LlenarTablaMovimientosFechas(fechaDesde, fechaHasta) {
    tablaMovimiento = $('#datatableDetalleMovimiento').DataTable({
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
            url: "Ajax/Aj_Movimiento.php",
            data: {
                Requerimiento: "LlenarTablaMovimientosFechas",
                FechaDesde: fechaDesde,
                FechaHasta: fechaHasta
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
            "targets": [0, 1, 2, 3, 4],
            "orderable": false,
        }, {
            "targets": [5],
            "orderable": false,
            "visible": false
        }]
    });
    tablaMovimiento.on('key', function(e, datatable, key, cell, originalEvent) {
        if (key == 13) {
            $('#datatableDetalleMovimiento tbody tr').eq(datatable.row(cell.index().row).index()).find('td').eq(0).dblclick();
        }
    });
    $('#datatableDetalleMovimiento_filter input').unbind();
    $('#datatableDetalleMovimiento_filter input').remove();
    $('#datatableDetalleMovimiento_filter label').remove();
    // $('input#apellidoMFiltro').remove();
    $('input#facturaF').bind('keyup', function(e) {
        //if (e.keyCode == 13) {
        tablaMovimiento.column(0).search($('input#facturaF').val()).draw();
        tablaMovimiento.column(1).search($('input#proveedorF').val()).draw();
        tablaMovimiento.column(2).search($('input#tipoMovimientoF').val()).draw();
        //}
        if (e.keyCode == 40) {
            $(this).blur();
            $('#datatableDetalleMovimiento tbody tr td').eq(0).click();
        }
    });
    $('input#proveedorF').bind('keyup', function(e) {
        //if (e.keyCode == 13) {
        tablaMovimiento.column(0).search($('input#facturaF').val()).draw();
        tablaMovimiento.column(1).search($('input#proveedorF').val()).draw();
        tablaMovimiento.column(2).search($('input#tipoMovimientoF').val()).draw();
        //}
        if (e.keyCode == 40) {
            $(this).blur();
            $('#datatableDetalleMovimiento tbody tr td').eq(0).click();
        }
    });
    $('input#tipoMovimientoF').bind('keyup', function(e) {
        //if (e.keyCode == 13) {
        tablaMovimiento.column(0).search($('input#facturaF').val()).draw();
        tablaMovimiento.column(1).search($('input#proveedorF').val()).draw();
        tablaMovimiento.column(2).search($('input#tipoMovimientoF').val()).draw();
        //}
        if (e.keyCode == 40) {
            $(this).blur();
            $('#datatableDetalleMovimiento tbody tr td').eq(0).click();
        }
    });
}


function CargarMovimientoConsulta(id) {
    $.ajax({
        method: "POST",
        url: "Ajax/Aj_ManteBodega.php",
        data: {
            Requerimiento: "CargarMovimientoConsulta",
            Id: id
        },
        dataType: 'JSON',
    }).done(function(respuesta) {
        console.log(respuesta);
        if (respuesta[0] == false) {
            swal("Esculapio!", "OCURRIO UN ERROR.", "error");
            return;
        }
        $('.body').find('input#NumeroFactMovi').val(respuesta[0][1]);
        $('.body').find('select#bodegaMovi').val(respuesta[0][2]);
        $('.body').find('select#proveMovi').val(respuesta[0][3]);
        $('.body').find('select#movimiento').val(respuesta[0][4]);
        $('.body').find('select#tipoMovi').val(respuesta[0][5]);
        $('.body').find('input#fechaMovi').val(respuesta[0][6]);
        $('.body').find('textarea#textAreaMovi').val(respuesta[0][7]);
        $('.body').find('span#subtotal').html(respuesta[0][8]);
        $('.body').find('span#descuento').html(respuesta[0][10]);
        $('.body').find('span#iva').html(respuesta[0][9]);
        $('.body').find('span#total').html(respuesta[0][11]);
        $('.selectpicker').selectpicker('refresh');

    });
}
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////CARGAR TABLA DE LA CONSULTA KARDEX POR ID DE ARRIBA/////////////////////////////////////
///////////////////////////////////////////////////////
///////////////////////////////////////////////////////
function CargarMovimientoItems(idMovimiento) {

    try {
        $.ajax({
            async: false,
            method: "POST",
            url: "Ajax/Aj_ManteBodega.php",
            data: {
                Requerimiento: "CargarMovimientoItems",
                Movimiento: idMovimiento
            },
            dataType: 'JSON',
        }).done(function(respuesta) {
            if (respuesta[0] == false) {
                swal("Esculapio!", "OCURRIO UN ERROR.", "error");
                return;
            }
            $.each(respuesta, function(i, value) {
                var id = value[1];
                var item = value[10];
                var presentacion = value[3];
                var cantidad = '<input style="width:80px;" type="number" disabled step=".01" value="' + value[4] + '" class="form-control" id="CantidadDetalleFact">';
                var precio = '<input style="width:80px;" type="number" disabled step=".01" value="' + value[5] + '" class="form-control" id="PrecioProducto" >';
                var precioCaja = '<input style="width:80px;" type="number" disabled step=".01" value="' + parseFloat(value[9]).toFixed(2) + '" class="form-control" id="PrecioCajaProducto" >';
                var subtotal = "$ " + value[6];
                var iva = value[11];
                var descuento = '<input style="width:80px;" type="number" disabled step=".01" value="' + value[7] + '" class="form-control" id="DescuentoDetalle">';
                var total = "$ " + value[8];
                var campos = [id, item, presentacion, cantidad, precio, precioCaja, subtotal, iva, descuento, total, "", "", value[12]];
                tablaDetalle.row.add(campos);
            });
            tablaDetalle.draw();
            CalcularTotalMovimientos()
        });
    } catch (error) {
        console.log(error)
    }
}

/////////////////////////////////////////////////////////////////////////

$('.body table#datatableDetallekardex tbody').on('dblclick', 'tr', function(evt) {
    CargarMovimientoConsulta($(this).find('td').eq(1).html());
    tablaDetalle.clear().draw();
    CargarMovimientoItems($(this).find('td').eq(1).html());
    tablaDetalle.draw(false);
    $('#modal-bdkardex').modal();
    setTimeout(function() {
        tablaDetalle.columns.adjust().draw();
    }, 200);

});

$('.body table#datatableDetalleMovimiento tbody').on('dblclick', 'tr', function(evt) {
    var cerrar = $('.body').find('button.close');
    var id = $(this).find("td").eq(0).html();
    var idMovimiento = tablaMovimiento.row($(this)).data()[5];
    $('.body').find('label#IdMovimientoImprimir').text(idMovimiento);
    $('.body').find('button#imprimirMovimiento').fadeIn(1);
    CargarMovimientoConsulta(idMovimiento);
    tablaDetalle.clear().draw();
    CargarMovimientoItems(idMovimiento);
    tablaDetalle.draw(false);
    cerrar.click();
    setTimeout(function() {
        tablaDetalle.columns.adjust().draw();
    }, 250);
    $("#GuardarMotivos").fadeOut(0);
});

$('.body').on('click', 'button#LimpiarMotivos', function(evt) {
    $("#GuardarMotivos").fadeIn(0);
    $('.body').find('button#imprimirMovimiento').fadeOut(1);
});


/////////////////////////////////////////////////////////////////////////////////////


$(document).keydown(function(tecla) {
    //tecla.preventDefault();

    if (112 == tecla.keyCode && modalMovimiento) {
        tecla.preventDefault();
        $('button#BuscarMovimientoF').click();
    }
});



var modalMovimiento = false;

$('#modal-consulta-movimiento').on('shown.bs.modal', function() {

    modalMovimiento = true;

});

function LlenarTablaOrdenFechas(fechaDesde, fechaHasta) {
    tablaOrden = $('#datatableDetalleOrden').DataTable({
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
            url: "Ajax/Aj_OrdenCompra.php",
            data: {
                Requerimiento: "LlenarTablaOrdenFechas",
                FechaDesde: fechaDesde,
                FechaHasta: fechaHasta
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
        }, {
            "targets": [],
            "orderable": false,
            "visible": false
        }]
    });
    tablaOrden.on('key', function(e, datatable, key, cell, originalEvent) {
        if (key == 13) {
            $('#datatableDetalleOrden tbody tr').eq(datatable.row(cell.index().row).index()).find('td').eq(0).dblclick();
        }
    });
    $('#datatableDetalleOrden_filter input').unbind();
    $('#datatableDetalleOrden_filter input').remove();
    $('#datatableDetalleOrden_filter label').remove();
    // $('input#apellidoMFiltro').remove();
    $('input#numeroO').bind('keyup', function(e) {
        //if (e.keyCode == 13) {
        tablaOrden.column(0).search($('input#numeroO').val()).draw();
        tablaOrden.column(1).search($('input#proveedorO').val()).draw();
        //}
        if (e.keyCode == 40) {
            $(this).blur();
            $('#datatableDetalleOrden tbody tr td').eq(0).click();
        }
    });

    $('input#proveedorO').bind('keyup', function(e) {
        //if (e.keyCode == 13) {
        tablaOrden.column(0).search($('input#proveedorO').val()).draw();
        tablaOrden.column(1).search($('input#proveedorO').val()).draw();
        //}
        if (e.keyCode == 40) {
            $(this).blur();
            $('#datatableDetalleOrden tbody tr td').eq(0).click();
        }
    });
}


function LlenarTablaOrden() {
    tablaOrden = $('#datatableDetalleOrden').DataTable({
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
            url: "Ajax/Aj_OrdenCompra.php",
            data: {
                Requerimiento: "LlenarTablaOrden"
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
        }, {
            "targets": [],
            "orderable": false,
            "visible": false
        }]
    });
    tablaOrden.on('key', function(e, datatable, key, cell, originalEvent) {
        if (key == 13) {
            $('#datatableDetalleMovimiento tbody tr').eq(datatable.row(cell.index().row).index()).find('td').eq(0).dblclick();
        }
    });
    $('#datatableDetalleOrden_filter input').unbind();
    $('#datatableDetalleOrden_filter input').remove();
    $('#datatableDetalleOrden_filter label').remove();
    // $('input#apellidoMFiltro').remove();
    $('input#numeroO').bind('keyup', function(e) {
        //if (e.keyCode == 13) {
        tablaOrden.column(0).search($('input#numeroO').val()).draw();
        tablaOrden.column(1).search($('input#proveedorO').val()).draw();
        //}
        if (e.keyCode == 40) {
            $(this).blur();
            $('#datatableDetalleOrden tbody tr td').eq(0).click();
        }
    });

    $('input#proveedorO').bind('keyup', function(e) {
        //if (e.keyCode == 13) {
        tablaOrden.column(0).search($('input#proveedorO').val()).draw();
        tablaOrden.column(1).search($('input#proveedorO').val()).draw();
        //}
        if (e.keyCode == 40) {
            $(this).blur();
            $('#datatableDetalleOrden tbody tr td').eq(0).click();
        }
    });
}

$('.body table#datatableDetalleOrden tbody').on('dblclick', 'tr', function(evt) {
    var cerrar = $('.body').find('button.close');
    var id = $(this).find("td").eq(0).html();
    idOrdenCompra = $(this).find("td").eq(0).html();
    var estado = $(this).find("td").eq(3).find("button").attr("idEstado");
    //$('.body').find('label#IdMovimientoImprimir').text(idMovimieidnto);
    //$('.body').find('button#imprimirMovimiento').fadeIn(1);
    CargarOrdenConsulta(id);
    tablaDetalle.clear().draw();
    CargarOrdenItems(id);
    tablaDetalle.draw(false);
    cerrar.click();
    setTimeout(function() {
        tablaDetalle.columns.adjust().draw();
    }, 250);
    if (estado == 2) {
        $("#GuardarMotivos").fadeOut(0);
    }
});

function CargarOrdenConsulta(id) {
    $.ajax({
        method: "POST",
        url: "Ajax/Aj_OrdenCompra.php",
        data: {
            Requerimiento: "CargarOrdenConsulta",
            Id: id
        },
        dataType: 'JSON',
    }).done(function(respuesta) {
        console.log(respuesta);
        if (respuesta[0] == false) {
            swal("Esculapio!", "OCURRIO UN ERROR.", "error");
            return;
        }
        $('.body').find('input#NumeroFactMovi').val(respuesta[0][1]);
        $('.body').find('select#proveMovi').val(respuesta[0][2]);
        $('.body').find('select#movimiento').val(respuesta[0][3]);
        $('.body').find('select#tipoMovi').val(respuesta[0][4]);
        $('.body').find('input#fechaMovi').val(respuesta[0][5]);
        $('.body').find('textarea#textAreaMovi').val(respuesta[0][6]);
        $('.body').find('span#subtotal').html(respuesta[0][7]);
        $('.body').find('span#descuento').html(respuesta[0][8]);
        $('.body').find('span#iva').html(respuesta[0][9]);
        $('.body').find('span#total').html(respuesta[0][10]);
        $('.selectpicker').selectpicker('refresh');

    });
}

function CargarOrdenItems(idOrden) {

    try {
        $.ajax({
            async: false,
            method: "POST",
            url: "Ajax/Aj_OrdenCompra.php",
            data: {
                Requerimiento: "CargarOrdenItems",
                OrdenCompra: idOrden
            },
            dataType: 'JSON',
        }).done(function(respuesta) {
            if (respuesta[0] == false) {
                swal("Esculapio!", "OCURRIO UN ERROR.", "error");
                return;
            }

            $.each(respuesta, function(i, value) {
                var boton = '<button type="submit" id="EliminarItemConsulta" class="btn btn-danger"><i class="fa fa-trash-o" aria-hidden="true"></i></button>';
                var id = value[1];
                var item = value[9];
                var presentacion = value[3];
                var cantidad = '<input style="width:80px;" type="number" step=".01" value="' + value[4] + '" class="form-control" id="CantidadDetalleFact">';
                var precio = '<input style="width:80px;" type="number" step=".01" value="' + value[5] + '" class="form-control" id="PrecioProducto" >';
                var precioCaja = '<input style="width:80px;" type="number" step=".01" value="' + parseFloat("0").toFixed(2) + '" class="form-control" id="PrecioCajaProducto" >';
                var subtotal = "$ " + value[6];
                var iva = value[10];
                var descuento = '<input style="width:80px;" type="number" step=".01" value="' + value[7] + '" class="form-control" id="DescuentoDetalle">';
                var total = "$ " + value[8];
                var campos = [id, item, presentacion, cantidad, precio, precioCaja, subtotal, iva, descuento, total, boton, value[12], value[11]];
                tablaDetalle.row.add(campos);
            });
            tablaDetalle.draw();
            CalcularTotalMovimientos()
        });
    } catch (error) {
        console.log(error)
    }
}

function ModificarOrdenCompra(id) {
    $.ajax({
        method: "POST",
        url: "Ajax/Aj_OrdenCompra.php",
        data: {
            Requerimiento: "ModificarOrdenCompra",
            Id: id
        },
        dataType: 'JSON',
    }).done(function(respuesta) {
        console.log(respuesta);
        if (respuesta[0] == false) {
            swal("Esculapio!", "OCURRIO UN ERROR.", "error");
            return;
        }
    });
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////


$("body").on('click', '#CargarExcel', function(evt) {
    $('.modalImportar2').modal();
});

$('#AddExcel2').change(function(e) {
    var reader = new FileReader();
    reader.readAsArrayBuffer(e.target.files[0]);
    reader.onload = function(e) {
        var data = new Uint8Array(reader.result);
        var wb = XLSX.read(data, { type: 'array' });
        to_html2(wb);
    }
});

function to_html2(workbook) {
    $('#capaImportar2')[0].innerHTML = "";
    workbook.SheetNames.forEach(function(sheetName) {
        var htmlstr = XLSX.write(workbook, { sheet: sheetName, type: 'string', bookType: 'html' });
        $('#capaImportar2')[0].innerHTML += htmlstr;
    });
    $("#TablaImportar2 tbody tr").eq(0).remove();
}

function ObtenerDatosExcel2() {

    var vector = $("body").find("#TablaImportar2 tbody tr");
    $.each(vector, function(a) {
        var codigo = $(this).find('td').eq(0).html().replace('"', '').trim();
        var nombre = $(this).find('td').eq(1).html().replace('"', '').trim();
        var stock = $(this).find('td').eq(2).html().trim().replace(",", "");
        var fracciones = $(this).find('td').eq(3).html().trim().replace(",", "");
        var costo = $(this).find('td').eq(4).html().trim().replace(",", "");
        var bodega = $("#bodegaMoviI2").val();
        var cuentabodega = $("#bodegaMoviI2 option:selected").attr("cuenta");
        CargarProductoIB(codigo, nombre, stock, fracciones, costo, bodega, cuentabodega);
    });
    tablaDetalleIngreso.draw(false);
    CalcularTotal();
    $("#loadMe").modal("hide");
}

function CargarProductoIB(codigo, nombre, stock, fracciones, costo, bodega, cuentabodega) {
    $.ajax({
        async: false,
        method: "POST",
        url: "Ajax/Aj_Producto.php",
        data: { Requerimiento: "CargarProductoIB", Codigo: codigo },
        dataType: 'JSON',

    }).done(function(respuesta) {
        $.each(respuesta, function(i, value) {
            var id = value[0];
            var item = value[1];
            var unidad = (fracciones > 0) ? "Fracciones" : "Entero";
            var cantfinal = stock;
            if (unidad == "Fracciones") {
                cantfinal = (stock * value[2]) + parseFloat(fracciones);
            }
            var cantidad = '<input type="text" mask="C" style="width:80px;" class="cantidadIg" value="' + cantfinal + '">';
            var precio = '<input type="text" mask="S" inicial="0" style="width:120px;" class="precioIg" value="' + costo + '">';
            var boton = '<button type="submit" id="EliminarItemIngreso" class="btn btn-sm btn-danger"><i class="fa fa-trash-o" aria-hidden="true"></i></button>';
            var subtotal = parseFloat(cantfinal * costo).toFixed(2);
            var campos = [id, item, unidad, cantidad, precio, subtotal, boton, bodega, cuentabodega, '<input style="margin-left:1em;" type="checkbox" title="INCLUIR IVA AL COSTO" class="chIncluye">'];
            tablaDetalleIngreso.row.add(campos);
        });
    });
}

$("body").on('click', '#GuardarDatosExcel2', function(evt) {
    $("#loadMe").modal({
        backdrop: "static", //remove ability to close modal with click
        keyboard: false, //remove option to close with keyboard
        show: true //Display loader!
    });
    setTimeout(function() {
        ObtenerDatosExcel2();
    }, 500);
});