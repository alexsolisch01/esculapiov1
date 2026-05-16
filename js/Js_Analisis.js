var nombreEstablecimiento = $('.body').find('label#nombreEsta').attr('nombreEstablecimiento');
function CargarComboProveedores() {
    $.ajax({

        method: "POST",
        url: "Ajax/Aj_ManteBodega.php",
        data: {
            Requerimiento: "CargarComboProveedores"
        },
        dataType: 'JSON',
    }).done(function (respuesta) {

        if (respuesta[0] == false) {
            swal("Esculapio!", "OCURRIO UN ERROR.", "error");
            return;
        }


        $.each(respuesta, function (i, value) {
            var elem = ' <option value="' + value.id + '">' + value.descripcion + '</option> ';
            $("select#proveMovi").append(elem);
            $("select#proveMoviFinal").append(elem);
        });
        $('.selectpicker').selectpicker('refresh');

    });
}

function CargarComboLinea() {
    $.ajax({

        method: "POST",
        url: "Ajax/Aj_ManteBodega.php",
        data: {
            Requerimiento: "CargarComboLinea"
        },
        dataType: 'JSON',
    }).done(function (respuesta) {

        if (respuesta[0] == false) {
            swal("Esculapio!", "OCURRIO UN ERROR.", "error");
            return;
        }


        $.each(respuesta, function (i, value) {
            var elem = ' <option value="' + value.id + '">' + value.descripcion + '</option> ';
            $("select#LineaBode").append(elem);
        });
        $('.selectpicker').selectpicker('refresh');

    });
}

CargarComboProveedores();
CargarComboLinea();

var tablaAnalisis = null;


tablaAnalisis = $('#datatableAnalisis').DataTable({
    'paging': false,
    'dom': '<"top"lBf>rt<"bottom"ip>',
    'lengthChange': false,
    'searching': true,
    'ordering': false,
    'info': true,
    'autoWidth': false,
    scrollY: 350,
    scrollX: true,
    order: [[0, "desc"]],
    select: false,
    "columnDefs": [
        {
            "targets": [4],
            "visible": false,
        },
        {
            "targets": [5, 6, 7],
            "className": "text-center",
        }],
    buttons: [{
        extend: 'excelHtml5',
        exportOptions: {
            columns: ':visible'
        }
    }, {
        extend: 'colvis',
        text: 'Columnas Visibles'
    }, {
        extend: 'print',
        text: 'Imprimir',
        exportOptions: {
            columns: ':visible'
        }
    }]
});

var tablaUltimasCompras = null;


tablaUltimasCompras = $('#datatableUltimasCompras').DataTable({
    'paging': false,
    'lengthChange': false,
    'searching': true,
    'ordering': false,
    'info': true,
    'autoWidth': false,
    scrollY: 150,
    scrollX: true,
    order: [[0, "desc"]],
    "columnDefs": [
        {
            "targets": [],
            "visible": false,
        },]
});

var tablaDetalle = null;


tablaDetalle = $('#datatableDetalle').DataTable({
    'paging': false,
    'lengthChange': false,
    'searching': true,
    'ordering': false,
    'info': true,
    'autoWidth': false,
    scrollY: 150,
    scrollX: true,
    order: [[0, "desc"]],
    "columnDefs": [
        {
            "targets": [],
            "visible": false,
        },]
});+
$('#datatableDetalle_filter input').unbind();
$('#datatableDetalle_filter input').remove();
$('#datatableDetalle_filter label').remove(); 

function CargarComboPresentacion(idProducto) {
    var select = '<select style="height: 25px; width:100px;" id="presentacion">';
    $.ajax({
        async: false,
        method: "POST",
        url: "Ajax/Aj_Analisis.php",
        data: {
            Requerimiento: "CargarComboPresentacion",
            IdProducto: idProducto
        },
        dataType: 'JSON',
    }).done(function (respuesta) {

        if (respuesta[0] == false) {
            swal("Esculapio!", "OCURRIO UN ERROR.", "error");
            return;
        }

        $.each(respuesta, function (i, value) {
            var elem = ' <option value="' + respuesta[i][0] + '">' + respuesta[i][0] + '</option><option value="' + respuesta[i][1] + '">' + respuesta[i][1] + '</option> ';
            select += elem;
        });
    });
    select += '</select>';
    return select;
}

function CargarInventario(fechaDesde, fechaHasta, linea, bodega) {
    $.ajax({
        async: false,
        method: "POST",
        url: "Ajax/Aj_Analisis.php",
        data: {
            Requerimiento: "CargarInventario",
            FechaDesde: fechaDesde,
            FechaHasta: fechaHasta,
            Bodega: bodega,
            Linea: linea
        },
        dataType: 'JSON',
    }).done(function (respuesta) {
        var filas = ObtenerChequeados();
        var vecstor2 = ObtenerChequeadosId();
        try {
            tablaAnalisis.clear().draw();
        } catch (error) { }
        if (respuesta[0] == false) {
            swal("Esculapio!", "Error!", "error");
            return;
        }
        if (filas != null || filas != undefined || filas.length != 0) {
            $.each(filas, function (i, value) {
                tablaAnalisis.row.add(filas[i]);
            });
            tablaAnalisis.draw(false);
        }
        var proveedor = $("#proveMovi").val();
        var vector = CargarInventarioPorProveedor(proveedor);
        $.each(respuesta, function (i, value) {
            var sugerencia = 0;
            if (parseInt(respuesta[i][6]) < parseInt(respuesta[i][5])) {
                sugerencia = parseInt(respuesta[i][5]) - parseInt(respuesta[i][6]);
            }
            var sugerenciaCaja = sugerencia / parseInt(respuesta[i][7]);
            var sugerenciaFraccion = sugerencia - (parseInt(sugerenciaCaja) * parseInt(respuesta[i][7]));
            var check = '<input type="checkbox" class="inputEstado" id="CheckTodo' + respuesta[i][0] + '" />';
            var inputCaja = '<input type="number" class="inputCaja" step="1" style="width:50px;" min="0" value="' + parseInt(sugerenciaCaja) + '" />';
            var inputFraccion = '<input type="number" class="inputFraccion" step="1" style="width:50px;" min="0" value="' + parseInt(sugerenciaFraccion) + '" />';
            var inputCantidadEntero = '<input type="number" class="inputCantidadEntero" step="1" style="width:50px;" min="0" />';
            var inputCantidadFraccion = '<input type="number" class="inputCantidadFraccion" step="1" style="width:50px;" min="0" />';
            var inputPorcentajeBonificado = '<input type="number" disabled class="inputPorcentajeBonificado" step="1" style="width:50px;" min="0" />';
            var inputCantidadFinanciero = '<input type="number" class="inputCantidadFinanciero" step="1" style="width:50px;" min="0" />';
            var inputPorcentajeFinanciero = '<input type="number" class="inputPorcentajeFinanciero" step="1" style="width:50px;" min="0" />';
            var boton = '<button type="submit" id="EliminarItemOrden" class="btn btn-danger"><i class="fa fa-trash-o" aria-hidden="true"></i></button>';
            // var precio = CargarPrecioUltimaCompra(respuesta[i][0]);
            var dataSet = [respuesta[i][0], respuesta[i][1], respuesta[i][2], respuesta[i][3], respuesta[i][7], respuesta[i][4], respuesta[i][5], respuesta[i][6], parseInt(sugerenciaCaja), parseInt(sugerenciaFraccion), inputCaja + inputFraccion, inputCantidadEntero + inputCantidadFraccion + inputPorcentajeBonificado, inputCantidadFinanciero + inputPorcentajeFinanciero, check];

            if (vecstor2.length != 0) {
                if ($.inArray(respuesta[i][0].toString(), vecstor2) < 0) {
                    if (proveedor != 0) {
                        if ($.inArray(respuesta[i][0].toString(), vector) >= 0) {
                            tablaAnalisis.row.add(dataSet);
                        }
                    } else {
                        tablaAnalisis.row.add(dataSet);
                    }
                }
            } else {
                if (proveedor != 0) {
                    if ($.inArray(respuesta[i][0].toString(), vector) >= 0) {
                        tablaAnalisis.row.add(dataSet);
                    }
                } else {
                    tablaAnalisis.row.add(dataSet);
                }
            }

        });
        tablaAnalisis.draw(false);



    }).fail(function (jqXHR, textStatus, errorThrown) {
        swal("Esculapio!", "Ocurrio un error consulte con la administracion..!  " + errorThrown + " Se cargara la pantalla nuevamente para solucionar el problema.", "error");
        //location.reload();
    });
}

$(".body").on('click', "button#CargarTablaAnalisis", function (ev) {
    var fechas = $("#filtrarFecha").val();
    var fechaDesde = "";
    var fechaHasta = "";
    var f = new Date();
    if (fechas == 0) {
        fechaDesde = $("#fechaDesdeI").val();
        fechaHasta = $("#fechaDesdeF").val();
    } else {
        if (fechas == 1) {
            fechaDesde = formatDate(f);
            fechaHasta = formatDate(f);
        }
        if (fechas == 2) {
            fechaDesde = formatDateAyer(f);
            fechaHasta = formatDate(f);
        }
        if (fechas == 3) {
            fechaDesde = formatDateMonth(f) + "-01";
            fechaHasta = formatDate(f);
        }
        if (fechas == 4) {
            var dias = "0";
            var mes = f.getMonth() + 1;
            var ann = f.getFullYear();
            if (mes == 1) dias = diasEnUnMes(mes, ann);
            if (mes == 2) dias = diasEnUnMes(mes, ann);
            if (mes == 3) dias = diasEnUnMes(mes, ann);
            if (mes == 4) dias = diasEnUnMes(mes, ann);
            if (mes == 5) dias = diasEnUnMes(mes, ann);
            if (mes == 6) dias = diasEnUnMes(mes, ann);
            if (mes == 7) dias = diasEnUnMes(mes, ann);
            if (mes == 8) dias = diasEnUnMes(mes, ann);
            if (mes == 9) dias = diasEnUnMes(mes, ann);
            if (mes == 10) dias = diasEnUnMes(mes, ann);
            if (mes == 11) dias = diasEnUnMes(mes, ann);
            if (mes == 12) dias = diasEnUnMes(mes, ann);
            fechaDesde = formatDateMonthPast(f, 0) + "-01";
            fechaHasta = formatDateMonthPast(f, 0) + "-" + dias;
        }
        if (fechas == 5) {
            var ann = f.getFullYear();
            fechaDesde = ann + "-01-01";
            fechaHasta = formatDate(f);
        }
        if (fechas == 6) {
            var ann = f.getFullYear() - 1;
            fechaDesde = ann + "-01-01";
            fechaHasta = ann + "-12-31";
        }
        if (fechas == 7) {
            fechaDesde = formatDateMonthPast(f, 1) + "-" + formatDia(f);
            fechaHasta = formatDate(f);
        }
        if (fechas == 8) {
            var ann = f.getFullYear() - 1;
            fechaDesde = formatDateMonthPast(f, 2) + "-" + formatDia(f);
            fechaHasta = formatDate(f);
        }
        if (fechas == 9) {
            var ann = f.getFullYear() - 1;
            fechaDesde = formatDateMonthPast(f, 4) + "-" + formatDia(f);
            fechaHasta = formatDate(f);
        }
    }
    var proveedor = $("#proveMovi").val();
    var linea = $("#LineaBode").val();
    var bodega = $("#bodegaMovi").val();

    

    if (bodega == 0) {
        if (proveedor == 0) {
            CargarInventario(fechaDesde, fechaHasta, linea);
        } else {
            CargarInventario(fechaDesde, fechaHasta);
        }
    } else {
        if (linea != 0) {
            CargarInventario(fechaDesde, fechaHasta, linea, bodega);
        } else {
            CargarInventario(fechaDesde, fechaHasta, "", bodega);
        }
    }
});

function diasEnUnMes(mes, año) {
    return new Date(año, mes, 0).getDate();
}

function formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
}

function formatDia(date) {
    var d = new Date(date),
        day = '' + d.getDate();

    if (day.length < 2) day = '0' + day;

    return day;
}

function formatDateAyer(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate() - 1,
        year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
}

function formatDateMonth(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month].join('-');
}

function formatDateMonthPast(date, meses) {
    var d = new Date(date),
        month = '' + (d.getMonth() - meses),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month].join('-');
}

$(".body table#datatableAnalisis").on('click', "button#EliminarItemOrden", function (evt) {
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
            tablaAnalisis.row(fila).remove().draw(false);
        } else { }
    });
});

$(".body").on('click', "button#ordenCompra", function (ev) {
    var filas = tablaAnalisis.rows().count();
    var chequeados = ObtenerChequeadosId();
    if (filas == 0 || chequeados.length == 0) {
        swal("Esculapio", "Ingrese datos para continuar", "error");
        return;
    }
    $('#modalProveedor').modal();
});

$(".body").on('click', "button#generarOrden", function (ev) {
    var proveedor = $("#proveMoviFinal").val();
    if (proveedor == 0) {
        swal("Esculapio", "Seleccione un proveedor para continuar", "error");
    } else {
        GuardarOrden("", proveedor, "", 0, 0, 0, 0);
    }
});

function ObtenerDetalle() {
    var vector = $(".body").find("#datatableAnalisis tbody tr");
    var productos = [];
    var contador = 0;
    $.each(vector, function (a) {
        var chequeado = $(this).find('td').eq(12).find('input').prop('checked');
        var idItem = $(this).find("td").eq(0).html();
        var presentacion = $(this).find("td").eq(3).html();
        var cantidad = $(this).find("td").eq(10).find("input").val() == '' ? parseInt($(this).find("td").eq(11).find("input.inputCantidadFinanciero").val()) : parseInt(parseInt($(this).find("td").eq(10).find("input.inputCantidadEntero").val()) + parseInt($(this).find("td").eq(10).find("input.inputCantidadFraccion").val()));
        var precio = 0;
        var precioCaja = 0;
        var subtotal = 0;
        var iva = 0;
        var descuento = $(this).find("td").eq(10).find("input").val() == '' ? parseFloat($(this).find("td").eq(11).find("input.inputPorcentajeFinanciero").val()) : parseFloat($(this).find("td").eq(10).find("input.inputPorcentajeBonificado").val());
        var total = 0;

        var lineaDetalle = [idItem, presentacion, cantidad, precio, precioCaja, subtotal, iva, descuento, total];

        if (chequeado == true) {
            productos[contador] = lineaDetalle;
            contador++;
        }

    });
    return JSON.stringify(productos);
}

function GuardarOrden(numero, proveedores, observaciones, subtotal, descuento, iva, total) {
    $.ajax({
        method: "POST",
        url: "Ajax/Aj_OrdenCompra.php",
        data: {
            Requerimiento: "GuardarOrden",
            Id_proveedor: proveedores,
            Numero: numero,
            Observaciones: observaciones,
            Subtotal: subtotal,
            Iva: iva,
            Descuento: descuento,
            Total: total,
            Detalle: ObtenerDetalle()

        },
        dataType: 'JSON',
    }).done(function (respuesta) {
        if (respuesta[0] == true) {
            swal({
                title: "Esculapio",
                text: "Guardado con Exito, Desea Imprimir?",
                icon: "info",
                buttons: true,
                dangerMode: false,
            }).then((confirma) => {
                if (confirma) {
                    $('#modalProveedor').modal('hide');
                    printTextAreaMovimiento(respuesta[1]);
                } else {
                }
            });
        }
        if (respuesta[0] == false) {

            swal("Esculapio!", "Ocurrio un Error", "error");
            console.log(respuesta)
            return;
        }
    }).fail(function (jqXHR, textStatus, errorThrown) {
        console.log(errorThrown)
    });
}

function printTextAreaMovimiento(secuencia) {

    var fecha = $('.body').find('input#fechaMovi').val();
    var hora = $('.body').find('label#HoraMovi').text();
    var proveedor = $('.body').find('select#proveMovi option:selected').text().trim();
    var items = tablaAnalisis.rows().count();
    var tipo = 'ORDEN DE COMPRA #';
    var establecimiento = '<div style="position: absolute; width:100%; text-align: center"><label style="font-weight:bold; font-size: small; text-align: center;">' + nombreEstablecimiento + '</label></div><br>';
    var comprobante = '<div style="width:100%; text-align: center; border: 2px solid black;"><label style="font-weight:bold; font-size: small; text-align: center;">' + tipo + ' ' + secuencia + '</label><br></div>';
    var cabecera = '<div style="position: absolute; width:100%;"><label style="font-weight:bold; font-size: small;">FECHA: ' + fecha + '</label><label style="font-weight:bold; font-size: small; text-align: center; margin-left: 5em;">HORA: ' + hora + '</label><br>' +
        '<label style="font-weight:bold; font-size: small;">PROVEEDOR: ' + proveedor + '</label><br>' +
        '</div>';
    var addFila = '';
    var vector = $(".body").find("#datatableAnalisis tbody tr");
    var contador = 0;
    $.each(vector, function (a) {
        var idItem = $(this).find("td").eq(0).html();
        var item = $(this).find("td").eq(1).html();
        var presentacion = $(this).find("td").eq(3).html();
        var cantidad = $(this).find("td").eq(10).find("input").val() == '' ? parseInt($(this).find("td").eq(11).find("input.inputCantidadFinanciero").val()) : parseInt(parseInt($(this).find("td").eq(10).find("input.inputCantidadEntero").val()) + parseInt($(this).find("td").eq(10).find("input.inputCantidadFraccion").val()));
        var chequeado = $(this).find('td').find('input.inputEstado').prop('checked');
        if (chequeado) {
            contador++;
            addFila += '<tr><td style="text-align: left; font-size: 10px;">' + idItem + '</td><td style="text-align: left; font-size: 10px;">' + item + '</td><td style="text-align: right; font-size: 10px;">' + cantidad + '</td><td style="text-align: right; font-size: 10px;">' + presentacion + '</td></tr>'
        }
    });
    var detalle = '<div style="width:100%; margin-top: 4.5em;"><table width="100%" style"border-collapse: collapse;"><tr><th style="border-bottom: 1px solid black; text-align: center; font-size: 12px;">CODIGO</th><th style="border-bottom: 1px solid black; text-align: center; font-size: 12px;">DESCRIPCION DE ITEM</th><th style="border-bottom: 1px solid black; text-align: center; font-size: 12px;">CANTIDAD</th><th style="border-bottom: 1px solid black; text-align: center; font-size: 12px;">PRESENTACION</th></tr>' +
        addFila + '</table></div>';
    var detalle2 = '<div style="width:100%; border-top: 1px solid black;"><label style="font-weight:bold;text-align: left; font-size: 12px;">CANTIDAD DE ITEMS:' + contador + '</label></div><br>';
    var firmas = '<div style="position: absolute; width:100%;"><label style="font-weight:bold; font-size: small; margin-left: 7.5em;">________________________________</label><label style="font-weight:bold; font-size: small; text-align: center; margin-left: 5em;">________________________________</label><br>' +
        '<label style="font-weight:bold; font-size: small; margin-left: 11em;">INGRESADO POR</label><label style="font-weight:bold; font-size: small; text-align: center; margin-left: 13.5em;">REVISADO POR</label><br></label></div>';
    childWindow = window.open('', '_blank');

    // childWindow.document.open();
    childWindow.document.write('<html><head></head><body>');
    childWindow.document.write(establecimiento);
    childWindow.document.write(comprobante);
    childWindow.document.write(cabecera);
    childWindow.document.write(detalle);
    childWindow.document.write(detalle2);
    childWindow.document.write(firmas);
    //childWindow.document.write($('#DatosPaciente').html());
    childWindow.document.write('<div style="margin-top:20px;" ></div>');
    //childWindow.document.write(datosRegistro);
    //childWindow.document.write(document.getElementById('plantillaecoWord').value);
    childWindow.document.write('</body></html>');
    childWindow.print();
    childWindow.document.close();
    childWindow.close();
}

function printTextAreaMovimientoConsulta() {
    var secuencia = $('.body').find('input#1').val();
    var fecha = $('.body').find('input#3').val();
    var proveedor = $('.body').find('input#2').val();
    var tipo = 'ORDEN DE COMPRA #';
    var establecimiento = '<div style="position: absolute; width:100%; text-align: center"><label style="font-weight:bold; font-size: small; text-align: center;">' + nombreEstablecimiento + '</label></div><br>';
    var comprobante = '<div style="width:100%; text-align: center; border: 2px solid black;"><label style="font-weight:bold; font-size: small; text-align: center;">' + tipo + ' ' + secuencia + '</label><br></div>';
    var cabecera = '<div style="position: absolute; width:100%;"><label style="font-weight:bold; font-size: small;">FECHA: ' + fecha + '</label><br>' +
        '<label style="font-weight:bold; font-size: small;">PROVEEDOR: ' + proveedor + '</label><br>' +
        '</div>';
    var addFila = '';
    var vector = $(".body").find("#datatableDetalle tbody tr");
    var contador = 0;
    $.each(vector, function (a) {
        var idItem = $(this).find("td").eq(0).html();
        var item = $(this).find("td").eq(1).html();
        var presentacion = $(this).find("td").eq(2).html();
        var cantidad = $(this).find("td").eq(3).html();
        contador++;
        addFila += '<tr><td style="text-align: left; font-size: 10px;">' + idItem + '</td><td style="text-align: left; font-size: 10px;">' + item + '</td><td style="text-align: right; font-size: 10px;">' + cantidad + '</td><td style="text-align: right; font-size: 10px;">' + presentacion + '</td></tr>'
    });
    var detalle = '<div style="width:100%; margin-top: 4.5em;"><table width="100%" style"border-collapse: collapse;"><tr><th style="border-bottom: 1px solid black; text-align: center; font-size: 12px;">CODIGO</th><th style="border-bottom: 1px solid black; text-align: center; font-size: 12px;">DESCRIPCION DE ITEM</th><th style="border-bottom: 1px solid black; text-align: center; font-size: 12px;">CANTIDAD</th><th style="border-bottom: 1px solid black; text-align: center; font-size: 12px;">PRESENTACION</th></tr>' +
        addFila + '</table></div>';
    var detalle2 = '<div style="width:100%; border-top: 1px solid black;"><label style="font-weight:bold;text-align: left; font-size: 12px;">CANTIDAD DE ITEMS:' + contador + '</label></div><br>';
    var firmas = '<div style="position: absolute; width:100%;"><label style="font-weight:bold; font-size: small; margin-left: 7.5em;">________________________________</label><label style="font-weight:bold; font-size: small; text-align: center; margin-left: 5em;">________________________________</label><br>' +
        '<label style="font-weight:bold; font-size: small; margin-left: 11em;">INGRESADO POR</label><label style="font-weight:bold; font-size: small; text-align: center; margin-left: 13.5em;">REVISADO POR</label><br></label></div>';
    childWindow = window.open('', '_blank');

    // childWindow.document.open();
    childWindow.document.write('<html><head></head><body>');
    childWindow.document.write(establecimiento);
    childWindow.document.write(comprobante);
    childWindow.document.write(cabecera);
    childWindow.document.write(detalle);
    childWindow.document.write(detalle2);
    childWindow.document.write(firmas);
    //childWindow.document.write($('#DatosPaciente').html());
    childWindow.document.write('<div style="margin-top:20px;" ></div>');
    //childWindow.document.write(datosRegistro);
    //childWindow.document.write(document.getElementById('plantillaecoWord').value);
    childWindow.document.write('</body></html>');
    childWindow.print();
    childWindow.document.close();
    childWindow.close();
}

$(".body").on('change', "select#proveMovi", function (ev) {
    $("#LineaBode").selectpicker('val', '0');
});

$(".body").on('change', "select#LineaBode", function (ev) {
    $("#proveMovi").selectpicker('val', '0');
});

$('.body').on('change', 'table.transporte thead tr th input#CheckTodos', function (evt) {
    if ($(this).prop('checked')) {
        $('.body').find('table#datatableAnalisis tbody input[type=checkbox]').prop('checked', true);
    } else {
        $('.body').find('table#datatableAnalisis tbody input[type=checkbox]').prop('checked', false);
    }
});

function CargarInventarioPorProveedor(proveedor) {
    var productos = new Array();
    $.ajax({
        async: false,
        method: "POST",
        url: "Ajax/Aj_Analisis.php",
        data: {
            Requerimiento: "CargarInventarioPorProveedor",
            Proveedor: proveedor
        },
        dataType: 'JSON',
    }).done(function (respuesta) {
        $.each(respuesta, function (a, value) {
            productos.push(respuesta[a][0]);
        });
    });
    return productos;
}

function ObtenerChequeados() {
    var vector = $(".body").find("#datatableAnalisis tbody tr");
    var productos = [];
    $.each(vector, function (a) {
        var chequeado = $(this).find('td').eq(12).find('input').prop('checked');
        var id = $(this).find('td').eq(0).html();
        var nombre = $(this).find('td').eq(1).html();
        var prst = $(this).find('td').eq(2).html();
        var presentacion = $(this).find('td').eq(3).html();
        var compradas = $(this).find('td').eq(4).html();
        var vendidas = $(this).find('td').eq(5).html();
        var stock = $(this).find('td').eq(6).html();
        var sugerencia = $(this).find('td').eq(7).html();
        var check = '<input type="checkbox" checked class="inputEstado" id="CheckTodo' + id + '" />';
        var boton = $(this).find('td').eq(9).html();
        var dataSet = [id, nombre, prst, presentacion, compradas, vendidas, stock, sugerencia, check, boton];
        if (chequeado) {
            productos[a] = dataSet;
        }
    });
    return productos;
}

function ObtenerChequeadosId() {
    var vector = $(".body").find("#datatableAnalisis tbody tr");
    var productos = [];
    $.each(vector, function (a) {
        var chequeado = $(this).find('td').find('input.inputEstado').prop('checked');
        var id = $(this).find('td').eq(0).html();
        if (chequeado) {
            productos[a] = id;
        }
    });
    return productos;
}

$(".body table#datatableAnalisis").on('dblclick', "tbody tr", function (evt) {
    var id = $(this).find('td').eq(0).html();
    var nombre = $(this).find('td').eq(1).html();
    try {
        var tid = setInterval(function () {
            tablaUltimasCompras.columns.adjust().draw(false);
            clearInterval(tid);
        }, 100);
    } catch (error) {
        console.log(error);
    }
    $('#tituloUltimasCompras').html(nombre);
    CargarUltimasCompras(id);
    $('#modalUltimasCompras').modal();
});

function CargarUltimasCompras(id) {
    $.ajax({
        async: false,
        method: "POST",
        url: "Ajax/Aj_Analisis.php",
        data: {
            Requerimiento: "CargarUltimasCompras",
            Id: id
        },
        dataType: 'JSON',
    }).done(function (respuesta) {
        console.log(respuesta);
        try {
            tablaUltimasCompras.clear().draw();
        } catch (error) { }
        if (respuesta[0] == false) {
            swal("Esculapio!", "Error!", "error");
            return;
        }
        $.each(respuesta, function (i, value) {
            var dataSet = [respuesta[i][0], respuesta[i][1], respuesta[i][2], parseFloat(respuesta[i][3]).toFixed(4), parseFloat(respuesta[i][4]).toFixed(2)];
            tablaUltimasCompras.row.add(dataSet);
        });
        tablaUltimasCompras.draw(false);

    }).fail(function (jqXHR, textStatus, errorThrown) {
        swal("Esculapio!", "Ocurrio un error consulte con la administracion..!  " + errorThrown + " Se cargara la pantalla nuevamente para solucionar el problema.", "error");
        //location.reload();
    });
}

function CargarPrecioUltimaCompra(id) {
    var precio = 0;
    $.ajax({
        async: false,
        method: "POST",
        url: "Ajax/Aj_Analisis.php",
        data: {
            Requerimiento: "CargarPrecioUltimaCompra",
            Id: id
        },
        dataType: 'JSON',
    }).done(function (respuesta) {
        console.log(respuesta);
        try {
            tablaUltimasCompras.clear().draw();
        } catch (error) { }
        if (respuesta[0] == false) {
            swal("Esculapio!", "Error!", "error");
            return;
        }
        $.each(respuesta, function (i, value) {
            precio = respuesta[i][0];
        });

    });
    return precio;
}

$('.body').on('change', 'select#filtrarFecha', function (evt) {
    var fechas = $(this).val();
    var fechaDesde = "";
    var fechaHasta = "";
    var f = new Date();
    if (fechas == 0) {
        fechaDesde = $("#fechaDesdeI").val();
        fechaHasta = $("#fechaDesdeF").val();
    } else {
        if (fechas == 1) {
            fechaDesde = formatDate(f);
            fechaHasta = formatDate(f);
        }
        if (fechas == 2) {
            fechaDesde = formatDateAyer(f);
            fechaHasta = formatDate(f);
        }
        if (fechas == 3) {
            fechaDesde = formatDateMonth(f) + "-01";
            fechaHasta = formatDate(f);
        }
        if (fechas == 4) {
            var dias = "0";
            var mes = f.getMonth() + 1;
            var ann = f.getFullYear();
            if (mes == 1) dias = diasEnUnMes(mes, ann);
            if (mes == 2) dias = diasEnUnMes(mes, ann);
            if (mes == 3) dias = diasEnUnMes(mes, ann);
            if (mes == 4) dias = diasEnUnMes(mes, ann);
            if (mes == 5) dias = diasEnUnMes(mes, ann);
            if (mes == 6) dias = diasEnUnMes(mes, ann);
            if (mes == 7) dias = diasEnUnMes(mes, ann);
            if (mes == 8) dias = diasEnUnMes(mes, ann);
            if (mes == 9) dias = diasEnUnMes(mes, ann);
            if (mes == 10) dias = diasEnUnMes(mes, ann);
            if (mes == 11) dias = diasEnUnMes(mes, ann);
            if (mes == 12) dias = diasEnUnMes(mes, ann);
            fechaDesde = formatDateMonthPast(f, 0) + "-01";
            fechaHasta = formatDateMonthPast(f, 0) + "-" + dias;
        }
        if (fechas == 5) {
            var ann = f.getFullYear();
            fechaDesde = ann + "-01-01";
            fechaHasta = formatDate(f);
        }
        if (fechas == 6) {
            var ann = f.getFullYear() - 1;
            fechaDesde = ann + "-01-01";
            fechaHasta = ann + "-12-31";
        }
        if (fechas == 7) {
            fechaDesde = formatDateMonthPast(f, 1) + "-" + formatDia(f);
            fechaHasta = formatDate(f);
        }
        if (fechas == 8) {
            var ann = f.getFullYear() - 1;
            fechaDesde = formatDateMonthPast(f, 2) + "-" + formatDia(f);
            fechaHasta = formatDate(f);
        }
        if (fechas == 9) {
            var ann = f.getFullYear() - 1;
            fechaDesde = formatDateMonthPast(f, 4) + "-" + formatDia(f);
            fechaHasta = formatDate(f);
        }
    }
    $('.body').find('input#fechaDesdeI').val(fechaDesde);
    $('.body').find('input#fechaDesdeF').val(fechaHasta);
});

$('.body table#datatableAnalisis').on('keyup change', 'tbody tr td input.inputCantidadEntero', function (evt) {
    var cantidadEntero = $(this).val();
    var cantidadFraccion = $(this).parent().find('input.inputCantidadFraccion').val();
    if (cantidadFraccion == "") {
        cantidadFraccion = 0;
        $(this).parent().find('input.inputCantidadFraccion').val(cantidadFraccion);
    }
    var porcentaje = (parseInt(cantidadFraccion) / (parseInt(cantidadEntero) + parseInt(cantidadFraccion))) * 100;
    $(this).parent().find('input.inputPorcentajeBonificado').val(parseFloat(porcentaje).toFixed(2));
    $(this).parent().parent().find('td').eq(11).find('input').val("");
});

$('.body table#datatableAnalisis').on('keyup change', 'tbody tr td input.inputCantidadFraccion', function (evt) {
    var cantidadFraccion = $(this).val();
    var cantidadEntero = $(this).parent().find('input.inputCantidadEntero').val();
    if (cantidadEntero == "") {
        cantidadEntero = 0;
        $(this).parent().find('input.inputCantidadEntero').val(cantidadEntero);
    }
    var porcentaje = (parseInt(cantidadFraccion) / (parseInt(cantidadEntero) + parseInt(cantidadFraccion))) * 100;
    $(this).parent().find('input.inputPorcentajeBonificado').val(parseFloat(porcentaje).toFixed(2));
    $(this).parent().parent().find('td').eq(11).find('input').val("");
});

$('.body table#datatableAnalisis').on('keyup', 'tbody tr td input.inputCantidadFinanciero', function (evt) {
    $(this).parent().parent().find('td').eq(10).find('input').val("");
});

$('.body table#datatableAnalisis').on('keyup', 'tbody tr td input.inputPorcentajeFinanciero', function (evt) {
    $(this).parent().parent().find('td').eq(10).find('input').val("");
});

var tablaOrden = null;

LlenarTablaOrdenFechas();

function LlenarTablaOrdenFechas() {
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
               Requerimiento: "LlenarTablaOrdenFechas2"
           },
           type: "POST"
       },
       scrollY: 300,
       scrollX: true,
       keys: false,
       scroller: {
           loadingIndicator: true
       },
       "columnDefs": [{
           "targets": [0,4],
           "orderable": false
       },{
           "targets": [],
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
}

$('input#numeroO').bind('keyup', function(e) {
    tablaOrden.column(2).search($('input#numeroO').val()).draw();
    tablaOrden.column(3).search($('input#proveedorO').val()).draw();
    
});

$('input#proveedorO').bind('keyup', function(e) {
    tablaOrden.column(2).search($('input#numeroO').val()).draw();
    tablaOrden.column(3).search($('input#proveedorO').val()).draw();
});

$(".body").on('click', "button#BuscarOrden", function(ev) {
    tablaOrden.column(0).search($('input#fechaDesdeF').val()).draw();
    tablaOrden.column(1).search($('input#fechaHastaF').val()).draw();
});

$(".body #datatableDetalleOrden").on('click', "button.visualizar", function(ev) {
    var id = parseInt($(this).parents('tr').find('td').eq(1).html());
    var numero = $(this).parents('tr').find('td').eq(1).html();
    var proveedor = $(this).parents('tr').find('td').eq(2).html();
    var fecha = $(this).parents('tr').find('td').eq(3).html();
    $('.body').find('#1').val(numero);
    $('.body').find('#2').val(proveedor);
    $('.body').find('#3').val(fecha);
    CargarDetalleOrden(id);
    setTimeout(() => {
        tablaDetalle.columns.adjust().draw();
    }, 500);
    $('.body').find('#modalOrden').modal()
});

function CargarDetalleOrden(id) {
    $.ajax({
        method: "POST",
        url: "Ajax/Aj_OrdenCompra.php",
        data: {
            Requerimiento: "CargarDetalleOrden",
            IdOrden: id
        },
        dataType: 'JSON',
    }).done(function (respuesta) {
        tablaDetalle.clear();
        $.each(respuesta, function (i, value) {
            var campos = [value[0],value[1],value[2],value[3]];
            tablaDetalle.row.add(campos);
        });
        tablaDetalle.draw();
    });
}

$(".body").on('click', "button#Imprimir", function(ev) {
    printTextAreaMovimientoConsulta();
});
