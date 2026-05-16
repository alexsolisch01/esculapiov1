var hot;
$(".body").on('click', "button#CargarPlantilla", function(ev) {
    var id = $(this).parent().parent().attr('id');
    var nombreP = $(this).parent().parent().find('td#NombreProc').html();
    $('.body div#nombreProcedimiento').find('label#nppp').html(nombreP);
    $('.body div#idProcedimiento').find('label').html(id);
    $('.body li#TabPlantilla').fadeIn();
    $('.body li#TabPlantilla a').trigger('click');
    hot.updateSettings({
        data: CargarPlantilla(id),
        cells: function(row, col, prop) {
            var cellProperties = {};
            if (row === 0 && col === 0) {
                cellProperties.readOnly = true;
            }
            return cellProperties;
        }
    });
});
$(".body").on('click', "button#GuardarPlantilla", function(ev) {
    var idProc = $('.body div#idProcedimiento').find('label').html();
    GuardarPlantilla(idProc);
});
$(".body").on('click', "li#TabProc a", function(ev) {
    hot.updateSettings({
        data: []
    });
    $('.body div#nombreProcedimiento').find('label#nppp').text('ELEGIR PROCEDIMIENTO');
    $('.body div#idProcedimiento').find('label').text('');
    
    $('.body li#TabPlantillaEco').fadeOut(1);
    $('.body li#TabPlantilla').fadeOut(1);
    $('.body li#TabPlantillaRx').fadeOut(1);
});
var tabla = $('#datatablePrueba').DataTable({
    ordering: false,
    dom: '<"top"lBf>rt<"bottom"ip>',
    buttons: [{
        extend: 'excelHtml5'
    }, {
        extend: 'print',
        text: 'Imprimir',
        id: 'imprimir',
        customize: function(win) {
            $(win.document.body).css('font-size', '10pt');
            $(win.document.body).find('table')
                .addClass( 'compact' )
                .css('font-size', 'inherit').css('border-style', 'none');
        }
    }]
});

function GuardarPlantilla(idProc) {
    $.ajax({
        method: "POST",
        url: "Ajax/Aj_Plantilla.php",
        data: {
            Requerimiento: "EliminaPlantilla",
            IdProc: idProc
        },
        dataType: 'JSON',
    }).done(function(eliminacion) {
        if (eliminacion[0] == false) {
            swal("Esculapio!", "ERROR", "error");
            return;
        } else {
            var ht = hot.getInstance();
            var rowcount = ht.countRows();
            var colcount = ht.countCols();
            for (var i = 0; i < rowcount; i++) {
                var posicion = new Array();
                var fila = hot.getDataAtRow(i);
                for (var j = 0; j < colcount; j++) {
                    var clase = hot.getCellMeta(i, j);
                    if (clase['className'] == 'bold') {
                        var c = ['bold', j]
                        posicion.push(c);
                    }
                    if (clase['className'] == 'boldunder') {
                        var c = ['boldunder', j]
                        posicion.push(c);
                    }
                    if (clase['className'] == 'underline') {
                        var c = ['underline', j]
                        posicion.push(c);
                    }
                    if (clase['className'] == 'italic') {
                        var c = ['italic', j]
                        posicion.push(c);
                    }
                    if (!clase['className']) {
                        var c = ['normal', j]
                        posicion.push(c);
                    }
                }
                for (var j = 0; j < posicion.length; j++) {
                    if (posicion[j][0] == 'bold' && posicion[j][1] == 0) {
                        var descrp = "<b>" + fila[0] + "</b>";
                    }
                    if (posicion[j][0] == 'boldunder' && posicion[j][1] == 0) {
                        var descrp = "<b><u>" + fila[0] + "</u></b>";
                    }
                    if (posicion[j][0] == 'underline' && posicion[j][1] == 0) {
                        var descrp = "<u>" + fila[0] + "</u>";
                    }
                    if (posicion[j][0] == 'italic' && posicion[j][1] == 0) {
                        var descrp = "<em>" + fila[0] + "</em>";
                    }
                    if (posicion[j][0] == 'normal' && posicion[j][1] == 0) {
                        var descrp = fila[0];
                    }
                    if (posicion[j][0] == 'bold' && posicion[j][1] == 1) {
                        var resultado = "<b>" + fila[1] + "</b>";
                    }
                    if (posicion[j][0] == 'boldunder' && posicion[j][1] == 1) {
                        var resultado = "<b><u>" + fila[1] + "</u></b>";
                    }
                    if (posicion[j][0] == 'underline' && posicion[j][1] == 1) {
                        var resultado = "<u>" + fila[1] + "</u>";
                    }
                    if (posicion[j][0] == 'italic' && posicion[j][1] == 1) {
                        var resultado = "<em>" + fila[1] + "</em>";
                    }
                    if (posicion[j][0] == 'normal' && posicion[j][1] == 1) {
                        var resultado = fila[1];
                    }
                    if (posicion[j][0] == 'bold' && posicion[j][1] == 2) {
                        var um = "<b>" + fila[2] + "</b>";
                    }
                    if (posicion[j][0] == 'boldunder' && posicion[j][1] == 2) {
                        var um = "<b><u>" + fila[2] + "</u></b>";
                    }
                    if (posicion[j][0] == 'underline' && posicion[j][1] == 2) {
                        var um = "<u>" + fila[2] + "</u>";
                    }
                    if (posicion[j][0] == 'italic' && posicion[j][1] == 2) {
                        var um = "<em>" + fila[2] + "</em>";
                    }
                    if (posicion[j][0] == 'normal' && posicion[j][1] == 2) {
                        var um = fila[2];
                    }
                    if (posicion[j][0] == 'bold' && posicion[j][1] == 3) {
                        var refer = "<b>" + fila[3] + "</b>";
                    }
                    if (posicion[j][0] == 'boldunder' && posicion[j][1] == 3) {
                        var refer = "<b><u>" + fila[3] + "</u></b>";
                    }
                    if (posicion[j][0] == 'underline' && posicion[j][1] == 3) {
                        var refer = "<u>" + fila[3] + "</u>";
                    }
                    if (posicion[j][0] == 'italic' && posicion[j][1] == 3) {
                        var refer = "<em>" + fila[3] + "</em>";
                    }
                    if (posicion[j][0] == 'normal' && posicion[j][1] == 3) {
                        var refer = fila[3];
                    }
                    if (posicion[j][0] == 'bold' && posicion[j][1] == 4) {
                        var ref_min = "<b>" + fila[4] + "</b>";
                    }
                    if (posicion[j][0] == 'boldunder' && posicion[j][1] == 4) {
                        var ref_min = "<b><u>" + fila[4] + "</u></b>";
                    }
                    if (posicion[j][0] == 'underline' && posicion[j][1] == 4) {
                        var ref_min = "<u>" + fila[4] + "</u>";
                    }
                    if (posicion[j][0] == 'italic' && posicion[j][1] == 4) {
                        var ref_min = "<em>" + fila[4] + "</em>";
                    }
                    if (posicion[j][0] == 'normal' && posicion[j][1] == 4) {
                        var ref_min = fila[4];
                    }
                    if (posicion[j][0] == 'bold' && posicion[j][1] == 5) {
                        var ref_max = "<b>" + fila[5] + "</b>";
                    }
                    if (posicion[j][0] == 'boldunder' && posicion[j][1] == 5) {
                        var ref_max = "<b><u>" + fila[5] + "</u></b>";
                    }
                    if (posicion[j][0] == 'underline' && posicion[j][1] == 5) {
                        var ref_max = "<u>" + fila[5] + "</u>";
                    }
                    if (posicion[j][0] == 'italic' && posicion[j][1] == 5) {
                        var ref_max = "<em>" + fila[5] + "</em>";
                    }
                    if (posicion[j][0] == 'normal' && posicion[j][1] == 5) {
                        var ref_max = fila[5];
                    }
                }
                $.ajax({
                    async: false,
                    method: "POST",
                    url: "Ajax/Aj_Plantilla.php",
                    data: {
                        Requerimiento: "GuardarPlantilla",
                        IdProc: idProc,
                        Descripcion: descrp,
                        Resultado: resultado,
                        Um: um,
                        Referencia: refer,
                        Referencia_Min: ref_min,
                        Referencia_Max: ref_max
                    },
                    dataType: 'JSON',
                }).done(function(respuesta) {
                    console.log(respuesta);
                });
            }
            ActualizarEstadoProcedimientoLaboratoio(idProc);
            swal("Esculapio!", "Plantilla Guardada Correctamente", "success").then((confirma) => {
                $('.body li#TabProc a').trigger('click');
            });
        }
    });
}

function EliminarPlantilla(idProc) {
    $.ajax({
        method: "POST",
        url: "Ajax/Aj_Plantilla.php",
        data: {
            Requerimiento: "EliminaPlantilla",
            IdProc: idProc
        },
        dataType: 'JSON',
    });
}

function ActualizarEstadoProcedimientoLaboratoio(idProc) {
    $.ajax({
        method: "POST",
        url: "Ajax/Aj_Plantilla.php",
        data: {
            Requerimiento: "ActualizarEstadoProcedimientoLaboratoio",
            IdProc: idProc
        },
        dataType: 'JSON',
    });
    CambiarBotonAModificar(idProc);
}

function CambiarBotonAModificar(idProc) {
    var tablaProce = $('#datatableProLabPlantilla').DataTable();
    var fila = $('#datatableProLabPlantilla tbody').find('tr[id="' + idProc + '"]');
    var nombre = fila.find('td').eq(1).html();
    tablaProce.row(fila).remove().draw(false);
    var boton = '<button idEstado="11" type="submit" id="CargarPlantilla" class="btn btn-primary"><i class="fa fa-edit" aria-hidden="true"></i> Modificar Plantilla</button>';
    var campos = [idProc, nombre, boton];
    tablaProce.row.add(campos).node().id = idProc;
    tablaProce.draw(false);
}

function CargarPlantilla(idProc) {
    var data = null;
    var campos = new Array();
    $.ajax({
        async: false,
        method: "POST",
        url: "Ajax/Aj_Plantilla.php",
        data: {
            Requerimiento: "CargarPlantillaPorProc",
            IdProc: idProc
        },
        dataType: 'JSON',
    }).done(function(respuesta) {
        if (respuesta[0] == false) {
            swal("Esculapio!", "OCURRIO UN ERROR.", "error");
            return;
        }
        $.each(respuesta, function(i, value) {
            campos.push({
                id: respuesta[i][3],
                proce: respuesta[i][7],
                currency: respuesta[i][4],
                descrip: respuesta[i][8],
                level: respuesta[i][5],
                asOf: respuesta[i][6]
            });
        });
        data = campos;
        campos = null;
    }).fail(function(jqXHR, textStatus, errorThrown) {
        swal("Esculapio!", "Ocurrio un error consulte con la administracion..!  " + errorThrown + " Se cargara la pantalla nuevamente para solucionar el problema.", "error");
    });
    return data;
}
$(document).ready(function() {
    var doc = new jsPDF();
    var specialElementHandlers = {
        '#editor': function(element, renderer) {
            return true;
        }
    };
    $('#cmd').click(function() {
        doc.fromHTML($('#datatableHandsome').html(), 15, 15, {
            'width': 170,
            'elementHandlers': specialElementHandlers
        });
        doc.preview();
    });

    function firstRowRenderer(instance, td, row, col, prop, value, cellProperties) {
        Handsontable.renderers.TextRenderer.apply(this, arguments);
        td.style.fontWeight = 'bold';
    }
    var hotElementContainer = null;
    var hotElement = document.querySelector('#datatableHandsome');
    try {
        hotElementContainer = hotElement.parentNode;
    } catch (o) {}
    var hotSettings = {
        columns: [{
            data: 'proce',
            type: 'text',
            renderer: "html"
        }, {
            data: 'id',
            type: 'text',
            renderer: "html"
        }, {
            data: 'currency',
            type: 'text',
            renderer: "html"
        }, {
            data: 'descrip',
            type: 'text',
            renderer: "html"
        }, {
            data: 'level',
            type: 'text',
            renderer: "html"
        }, {
            data: 'asOf',
            type: 'text',
            renderer: "html"
        }],
        stretchH: 'all',
        width: 650,
        contextMenu: true,
        autoWrapRow: true,
        height: 350,
        minRows: 1,
        maxRows: 100,
        rowHeaders: true,
        colHeaders: true,
        nestedHeaders: [
            [{
                label: 'PLANTILLA',
                colspan: 3
            }, {
                label: 'REFERENCIA',
                colspan: 3
            }],
            ['PROCEDIMIENTO', 'RESULTADO', 'UNIDAD DE MEDIDA', 'DESCRIPCION', 'MIN', 'MAX']
        ]
    };
    hot = new Handsontable(hotElement, hotSettings);
    hot.updateSettings({
        contextMenu: {
            items: {
                "row_above": {
                    name: 'Agregar Fila Arriba',
                },
                "row_below": {
                    name: 'Agregar Fila Abajo',
                },
                "remove_row": {
                    name: 'Eliminar Fila',
                },
                "alignment": {
                    name: 'Alineamiento',
                },
                "make_bold": {
                    name: '<span class="bold">Negrita</span>',
                    disabled: function() {
                        return hot.getSelected()[0] === 0;
                    },
                    callback: function(key, options) {
                        console.log(options);
                        var fila = hot.getSelected()[0][0];
                        var columna = hot.getSelected()[0][1];
                        hot.setCellMeta(fila, columna, 'className', 'bold');
                        hot.render();
                    }
                },
                "make_bold_under": {
                    name: '<span class="boldunder">Negrita</span>',
                    disabled: function() {
                        return hot.getSelected()[0] === 0;
                    },
                    callback: function(key, options) {
                        console.log(options);
                        var fila = hot.getSelected()[0][0];
                        var columna = hot.getSelected()[0][1];
                        hot.setCellMeta(fila, columna, 'className', 'boldunder');
                        hot.render();
                    }
                },
                "make_underline": {
                    name: '<span class="underline">Subrayar</span>',
                    disabled: function() {
                        return hot.getSelected()[0] === 0;
                    },
                    callback: function(key, options) {
                        console.log(key, options);
                        var fila = hot.getSelected()[0][0];
                        var columna = hot.getSelected()[0][1];
                        hot.setCellMeta(fila, columna, 'className', 'underline');
                        hot.render();
                    }
                },
                "make_italic": {
                    name: '<span class="italic">Cursiva</span>',
                    disabled: function() {
                        return hot.getSelected()[0] === 0;
                    },
                    callback: function(key, options) {
                        console.log(key, options);
                        var fila = hot.getSelected()[0][0];
                        var columna = hot.getSelected()[0][1];
                        hot.setCellMeta(fila, columna, 'className', 'italic');
                        hot.render();
                    }
                },
                "make_nostyle": {
                    name: 'Normal',
                    disabled: function() {
                        return hot.getSelected()[0] === 0;
                    },
                    callback: function(key, options) {
                        console.log(key, options);
                        var fila = hot.getSelected()[0][0];
                        var columna = hot.getSelected()[0][1];
                        hot.setCellMeta(fila, columna, 'className', 'normal');
                        hot.render();
                    }
                }
            }
        }
    });
});
$(".body").on('click', "button#copiarDatos", function(ev) {
    var ht = hot.getInstance();
    var rowcount = ht.countRows();
    tabla.clear().draw();
    var colcount = ht.countCols();
    var ff = $('.body div#nombreProcedimiento').find('label#nppp').text();
    var dataSet1 = [ff, "", "", "", "", ""];
    tabla.row.add(dataSet1).draw(false);
    var imprimir = $('.body div#plantilla').find('button.buttons-print');
    for (var i = 0; i < rowcount; i++) {
        var fila = hot.getDataAtRow(i);
        var descrp = fila[0];
        var resultado = fila[1];
        var um = fila[2];
        var refer = fila[3];
        var ref_min = fila[4];
        var ref_max = fila[5];
        var dataSet = [descrp, resultado, um, refer, ref_min, ref_max];
        tabla.row.add(dataSet).draw(false);
    }
    imprimir.click();
});

$(".body").on('click', "button#exportarDatos", function(ev) {
    var ht = hot.getInstance();
    var rowcount = ht.countRows();
    tabla.clear().draw();
    var colcount = ht.countCols();
    var ff = $('.body div#nombreProcedimiento').find('label#nppp').text();
    var dataSet1 = [ff, "", "", "", "", ""];
    tabla.row.add(dataSet1).draw(false);
    var imprimir = $('.body div#plantilla').find('button.buttons-excel');
    for (var i = 0; i < rowcount; i++) {
        var fila = hot.getDataAtRow(i);
        var descrp = fila[0];
        var resultado = fila[1];
        var um = fila[2];
        var refer = fila[3];
        var ref_min = fila[4];
        var ref_max = fila[5];
        var dataSet = [descrp, resultado, um, refer, ref_min, ref_max];
        tabla.row.add(dataSet).draw(false);
    }
    imprimir.click();
});


function CargarTablas(){
    $('#datatableProLabPlantilla').DataTable({
        keys: true,
        dom: '<"top"lBf>rt<"bottom"ip>',
        lengthMenu: [
            [10, 25, 50, -1],
            [10, 25, 50, "Todo"]
        ],
        paginate:false,
        scrollY: 400,
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

    });

    $('#datatableProRxPlantilla').DataTable({
        keys: true,
        dom: '<"top"lBf>rt<"bottom"ip>',
        lengthMenu: [
            [10, 25, 50, -1],
            [10, 25, 50, "Todo"]
        ],
        paginate:false,
        scrollY: 400,
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

    });

    $('#datatableProEcoPlantilla').DataTable({
        keys: true,
        dom: '<"top"lBf>rt<"bottom"ip>',
        lengthMenu: [
            [10, 25, 50, -1],
            [10, 25, 50, "Todo"]
        ],
        paginate:false,
        scrollY: 400,
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

    });

    $('#datatableProTacPlantilla').DataTable({
        keys: true,
        dom: '<"top"lBf>rt<"bottom"ip>',
        lengthMenu: [
            [10, 25, 50, -1],
            [10, 25, 50, "Todo"]
        ],
        paginate:false,
        scrollY: 400,
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

    });
}
CargarTablas();