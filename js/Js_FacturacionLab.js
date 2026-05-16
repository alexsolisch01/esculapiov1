function CargarTablasLab() {
	tableGrupoExamen = $('#datatableGrupoExamenConsulta').DataTable({
            'paging': false,
            'lengthChange': false,
            'searching': true,
            "aaSorting": [
                [0, "asc"]
            ],
            'info': false,
            'autoWidth': false,
            scrollY: 400,
            keys: {
                columns: [1]
            },
            "columnDefs": [{
                "targets": [0],
                "visible": false,
                "searchable": false
            }]
        });
	$('#datatableGrupoExamenConsulta_filter input').css("margin-left", "-20em");
    $('#datatableGrupoExamenConsulta_filter input').css("width", "30em");

    tableGrupoExamen.on('key', function(e, datatable, key, cell, originalEvent) {
            
             if (112 == key && !noModal) {
                
                tableGrupoExamen.cell(':eq(1)').focus(':eq(0)');
                tableGrupoProcedimiento.cell.blur();
                tableProcedimientosAgregados.cell.blur();
                
            }

            if (113 == key && !noModal) {                
                tableGrupoExamen.cell.blur();
                $('#datatableProcedimientoLaboratorioConsulta tbody tr td').eq(0).click();
                tableProcedimientosAgregados.cell.blur();
                
            }
            if (114 == key && !noModal) {
                
                tableGrupoExamen.cell.blur();
                tableGrupoProcedimiento.cell.blur();
                tableProcedimientosAgregados.cell().focus(':eq(0)');
                
            }
            if (115 == key && !noModal) {
                
                tableGrupoProcedimiento.column(3).search('').draw();
                
            }
            if (116 == key && !noModal) {
                
                $("#AgregarItemsLaboratorio").click();
                
            }

            if (key == 13) {
                tableGrupoExamen.cell.blur();                
                $('#datatableProcedimientoLaboratorioConsulta tbody tr td').eq(0).click();
            }else{
                ObtenerFilaPorPrimerletra('#datatableGrupoExamenConsulta',String.fromCharCode(key));
            }
            
        }).on('key-focus', function(e, datatable, cell) {
            idGrupoExamen = datatable.row(cell.index().row).id();            
            CargarGrupoProcedimientosFactura(idGrupoExamen,tableGrupoProcedimiento);
            if($('#datatableGrupoExamenConsulta tbody tr').eq(datatable.row(cell.index().row).index()).hasClass('selected')){
                return;
            }
            $('#datatableGrupoExamenConsulta tbody tr').eq(datatable.row(cell.index().row).index()).find('td').eq(0).dblclick();
            
        });

	tableProcedimientosAgregados = $('#datatableProcedimientosAFacturarConsulta').DataTable({
            'paging': false,
            'lengthChange': false,
            'searching': true,
            'ordering': true,
            'info': false,
            'autoWidth': false,
            scrollY: 450,
            keys: true
        });
	$('#datatableProcedimientosAFacturarConsulta_filter input').css("margin-left", "-20em");
    $('#datatableProcedimientosAFacturarConsulta_filter input').css("width", "30em");
    $('#datatableProcedimientosAFacturarConsulta_filter').append('<button data-toggle="modal" data-target="#modal-horario-laboratorio" id="AgregarItemsLaboratorio" type="button" class="btn btn-primary"><i class="fa fa-plus"></i> Agregar Items (F5)</button>');

    tableProcedimientosAgregados.on('key', function(e, datatable, key, cell, originalEvent) {
            
             if (112 == key && !noModal) {
                
                tableGrupoExamen.cell(':eq(1)').focus(':eq(0)');
                tableGrupoProcedimiento.cell.blur();
                tableProcedimientosAgregados.cell.blur();
                
            }

            if (113 == key && !noModal) {
                
                tableGrupoExamen.cell.blur();
                $('#datatableProcedimientoLaboratorioConsulta tbody tr td').eq(0).click();
                tableProcedimientosAgregados.cell.blur();
                
            }
            if (114 == key && !noModal) {
                
                tableGrupoExamen.cell.blur();
                tableGrupoProcedimiento.cell.blur();
                tableProcedimientosAgregados.cell().focus(':eq(0)');
                
            }
            if (115 == key && !noModal) {
                
                tableGrupoProcedimiento.column(3).search('').draw();
                
            }
            if (116 == key && !noModal) {
                
                $("#AgregarItemsLaboratorio").click();
                
            }

            if (key == 46) {
                tableProcedimientosAgregados.row(datatable.row(cell.index().row)).remove().draw(true);
            }
           // alert(key);
        }).on('key-focus', function(e, datatable, cell) {           

            if($('#datatableProcedimientosAFacturarConsulta tbody tr').eq(datatable.row(cell.index().row).index()).hasClass('selected')){
                return;
            }
            $('#datatableProcedimientosAFacturarConsulta tbody tr').eq(datatable.row(cell.index().row).index()).find('td').eq(0).dblclick();
            
        });
        tableGrupoProcedimiento = $('#datatableProcedimientoLaboratorioConsulta').DataTable({
            'paging': false,
            'lengthChange': false,
            'searching': true,
            'ordering':true,
            "columnDefs": [{
                "targets": [1,2],
                "orderable": false,
            }, ],
            "columnDefs": [{
                "targets": [3],
                "visible": false
            }],
            'info': false,
            'autoWidth': false,
            scrollY: 400,
            keys: {
                columns: [0]
            }
        });
        $('#datatableProcedimientoLaboratorioConsulta_filter input').css("margin-left", "-20em");
        $('#datatableProcedimientoLaboratorioConsulta_filter input').css("width", "30em");
        $('#datatableProcedimientoLaboratorioConsulta_filter').append('<button id="CargarTodosGrupoProcedimientos" type="button" class="btn btn-primary"><i class="fa fa-clone"></i> Cargar Todos (F4)</button>');

        tableGrupoProcedimiento.on('key', function(e, datatable, key, cell, originalEvent) {
            
            if (112 == key && !noModal) {
                
                tableGrupoExamen.cell(':eq(1)').focus(':eq(0)');
                tableGrupoProcedimiento.cell.blur();
                tableProcedimientosAgregados.cell.blur();
                
            }

            if (113 == key && !noModal) {
                
                tableGrupoExamen.cell.blur();
                $('#datatableProcedimientoLaboratorioConsulta tbody tr td').eq(0).click();
                tableProcedimientosAgregados.cell.blur();
                
            }
            if (114 == key && !noModal) {
                
                tableGrupoExamen.cell.blur();
                tableGrupoProcedimiento.cell.blur();
                tableProcedimientosAgregados.cell().focus(':eq(0)');
                
            }
            if (115 == key && !noModal) {
                
                tableGrupoProcedimiento.column(3).search('').draw();
                
            }
            if (116 == key && !noModal) {
                
                $("#AgregarItemsLaboratorio").click();
                
            }

            if (key == 13) {
                
                
                var input = $(datatable.row(cell.index().row).data()[2]).find('input');
                var idGrupoProcedimiento = input.attr('idGrupoProcedimiento');
                $('#datatableProcedimientoLaboratorioConsulta tbody tr td').find('input#checkboxLab' + idGrupoProcedimiento).trigger("click");                
                tableGrupoProcedimiento.cell.blur();
                $("#datatableProcedimientoLaboratorioConsulta_filter input[type=search]").val("");
                $("#datatableProcedimientoLaboratorioConsulta_filter input[type=search]").focus();                

            } else {
                ObtenerFilaPorPrimerletra('#datatableProcedimientoLaboratorioConsulta',String.fromCharCode(key));                
            }
            
        }).on('key-focus', function(e, datatable, cell) {           
            var input = $(datatable.row(cell.index().row).data()[2]).find('input');
            var idGrupoProcedimiento = input.attr('idGrupoProcedimiento');
            if($('#datatableProcedimientoLaboratorioConsulta tbody tr td').find('input#checkboxLab' + idGrupoProcedimiento).parent().hasClass('selected')){                
                return;
            }            
            $('#datatableProcedimientoLaboratorioConsulta tbody tr td').find('input#checkboxLab' + idGrupoProcedimiento).dblclick();            
        });

        $("#datatableProcedimientoLaboratorioConsulta_filter").on('keyup',"input[type=search]", function(e) {            
            if (e.keyCode == 40) {
                $(this).blur();
                $('#datatableProcedimientoLaboratorioConsulta tbody tr td').eq(0).click();            
            }        
        });

        calendario2 = $('#calendar2').fullCalendar({
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
                var dayEvents = calendario2.fullCalendar('clientEvents', function(event) {
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
                swal({
                    title: "TURNO # " + turno,
                    text: "Seguro Que Desea Agendar La Cita El " + date.format(),
                    //icon: "info",
                    buttons: true,
                    dangerMode: false,
                    icon: "imagenes/agenda.png",
                }).then((confirma) => {
                    if (confirma) {
                        AgregarItensLaboratorio(date.format(), "")
                        OrdenLab=true;
                        $('div#modal-horario-laboratorio button.close').click();
                        $('div#modal-laboratorio button.close').click();
                    } else {}
                });
            },
            //events    : respuesta,
            displayEventEnd: true,
            editable: false
        });

}
CargarTablasLab();
CargarTodosGrupoProcedimientosFactura();
function CargarTodosGrupoProcedimientosFactura() {
    $.ajax({        
        method: "POST",
        url: "Ajax/Aj_Laboratorio.php",
        data: {
            Requerimiento: "CargarTodosGrupoProcedimientos"
        },
        dataType: 'JSON',
    }).done(function(respuesta) {
        if (respuesta[0] == false) {
            swal("Esculapio!", "OCURRIO UN ERROR.", "error");
            return;
        }
        try {
            tableGrupoProcedimiento.clear().draw();
        } catch (error) {}        
        $.each(respuesta, function(i, value) {
            var campos = [respuesta[i][1],
                respuesta[i][2], '<div class="checkbox checkbox-info checkbox-circle">' + '<input idGrupoExamen="'+respuesta[i][6]+'" idresponsable="' + respuesta[i][5] + '" responsable="' + respuesta[i][4] + " " + respuesta[i][3] + '"  idGrupoProcedimiento="' + respuesta[i][0] + '" class="checkGrupoProceFact" id="checkboxLab' + respuesta[i][0] + '" type="checkbox">' + '<label for="checkboxLab' + respuesta[i][0] + '">' + ' </label>' + ' </div>'
            ,respuesta[i][6]];            
            tableGrupoProcedimiento.row.add(campos).node().id = respuesta[i][0];            
        });
        tableGrupoProcedimiento.draw(false);
       
    }).fail(function(jqXHR, textStatus, errorThrown) {
        console.log(errorThrown)
    });
}

function CargarGrupoProcedimientosFactura(idGrupoExamen, tableGrupoProcedimiento) {
   tableGrupoProcedimiento.column(3).search(idGrupoExamen).draw();
}
function AgregarItensLaboratorio(fecha, turnoConsulta) {
    var vector = $('.body').find("#datatableProcedimientosAFacturarConsulta tbody tr");
    $.each(vector, function(a) {
        var idgrupoprocedimiento = $(this).find('td').find('span').attr('id');
        var item = $(this).find('td').find('span').html();
        var precio = parseFloat($(this).find('td').eq(1).html());
        var responsable = '<span id = "' + $(this).find('td').find('span').attr('idresponsable') + '">' + $(this).find('td').find('span').attr('responsable') + '</span>';
        var descuento = '<input style="width:80px;" type="number" required step=".01" value="0.00" class="form-control" id="DescuentoConsulta"  placeholder="DESCUENTO">';
        var id = '<span laboratorio="' + idgrupoprocedimiento + '" ><img src="imagenes/laboratorio.png" /></span>';
        var boton = '<button type="submit" id="EliminarItemConsulta" idconsultaitem="'+iditemmodificar+'" class="btn btn-danger"><i class="fa fa-trash-o" aria-hidden="true"></i></button>';
        if (!ExisteItenLab(idgrupoprocedimiento, item, fecha)) {
            $('.cbmMedicoReferente').fadeIn(0);

            if(item!=undefined || precio !=undefined || item !=''){
                if(parseInt(ConsultaCargada)>0){
                    descuento = '0';
                }
                var campos = [id, item, responsable, fecha, turnoConsulta, precio.toFixed(2), descuento, "$ " + precio.toFixed(2), boton,2];
                tableDetalle.row.add(campos).draw(true);
            }
            
        }
    });
    try {
        tableProcedimientosAgregados.clear().draw();
    } catch (error) {}
    CalcularTotalConsulta();
}

function ExisteItenLab(idIten, item, fecha) {
    var confirma = false;
    var vector = $('.body').find("#datatableDetalleFact tbody tr");
    $.each(vector, function(a) {
        var idf = 0;
        idf = $(this).find('td').eq(0).find('span').attr("procedimiento");
        if(idf=== undefined){
            idf = $(this).find('td').eq(0).find('span').attr("laboratorio");
        }
        if(idf=== undefined){
            idf = $(this).find('td').eq(0).find('span').attr("procedimientorx");
        }
        if(idf=== undefined){
            idf = $(this).find('td').eq(0).find('span').attr("procedimientoeco");
        }
        if(idf=== undefined){
            idf = $(this).find('td').eq(0).find('span').attr("procedimientotac");
        }
        var itemf = $(this).find('td').eq(1).html();
        var fechaf = $(this).find('td').eq(3).html();

        if(idf==idIten && fechaf == fecha){
            confirma = true;
        }
        
    });
    if(parseInt(ConsultaCargada)>0){
        tableDetalle.row(filaClikeada).remove().draw(false);
    }
    return confirma;
}

$(".body").on('change', "input.checkGrupoProceFact", function(evt) {    
    if ($(this).prop('checked')) {
        RemoverItemTablaProceAFacturar($(this).attr('idGrupoProcedimiento'));
        var item = '<span idresponsable="' + $(this).attr('idresponsable') + '" responsable="' + $(this).attr('responsable') + '" id = "' + $(this).attr('idGrupoProcedimiento') + '">' + $(this).parent().parent().parent().find('td').eq(0).html() + '</span>';
        AgregarItemTablaProceAFacturar(item, $(this).parent().parent().parent().find('td').eq(1).html());
    } else {
        RemoverItemTablaProceAFacturar($(this).attr('idGrupoProcedimiento'));
    }
    CalcularTotalTemporalLaboratorio();

});


function AgregarItemTablaProceAFacturar(item, precio) {
    var campos = [item, precio];
    tableProcedimientosAgregados.row.add(campos).draw(true);
}

function RemoverItemTablaProceAFacturar(idIten) {
    var fila = $('.body').find("#datatableProcedimientosAFacturarConsulta tbody tr td").find('span[id=' + idIten + ']').parents('tr');    
    tableProcedimientosAgregados.row(fila).remove().draw(false);
}

function CalcularTotalTemporalLaboratorio() {
    var vector = $('.body').find("#datatableProcedimientosAFacturarConsulta tbody tr");
    var precioTotal = 0;
    $.each(vector, function(a) {
        var precio = $(this).find('td').eq(1).html();
        precioTotal += parseFloat(precio);
    });
    precioTotal = (isNaN(parseFloat(precioTotal))) ? 0 : parseFloat(precioTotal);
    $('strong#totalFacturaEstimado').html('$ ' + precioTotal.toFixed(2));
}
$(".body").on('click', "button#CargarTodosGrupoProcedimientos", function(evt) {
    tableGrupoProcedimiento.column(3).search('').draw();
    $('#datatableProcedimientoLaboratorioConsulta tbody tr td').eq(0).click();
});
function CargarReservacionesLaboratorio() {
    $.ajax({
        method: "POST",
        url: "Ajax/Aj_Procedimiento.php",
        data: {
            Requerimiento: "CargarReservacionesLaboratorio"
        },
        dataType: 'JSON',
    }).done(function(respuesta) {
        if (respuesta[0] == false) {
            swal("Esculapio!", "OCURRIO UN ERROR.", "error");
            return;
        }
        calendario2.fullCalendar('addEventSource', respuesta)
    }).fail(function(jqXHR, textStatus, errorThrown) {
        console.log(errorThrown)
    });
}
function CargarReservacionesLaboratorioHoy() {
    $.ajax({
        method: "POST",
        url: "Ajax/Aj_Procedimiento.php",
        data: {
            Requerimiento: "CargarReservacionesLaboratorioHoy"
        },
        dataType: 'JSON',
    }).done(function(respuesta) {
        if (respuesta[0] == false) {
            swal("Esculapio!", "OCURRIO UN ERROR.", "error");
            return;
        }
        try{
            $("#totalPacientesLab").html("TOTAL DE PACIENTE "+respuesta[0][0]);
            $("#totalProcesadosLab").html("TOTAL ATENDIDOS "+respuesta[1][0]);
            $("#totalPendientesLab").html("TOTAL PENDIENTES "+(parseInt(respuesta[0][0])-parseInt(respuesta[1][0])));
        }catch(error){}
    }).fail(function(jqXHR, textStatus, errorThrown) {
        console.log(errorThrown)
    });
}
$('#modal-laboratorio').on('shown.bs.modal', function() {    
    if(parseInt(ConsultaCargada)>0){
        $("#datatableGrupoExamenConsulta").fadeOut(0);
        $("#datatableProcedimientoLaboratorioConsulta").fadeOut(0);
    }
    $("#laboratorioFactura").removeClass("parpadea");
    if(idOrden==0){
        //$('#datatableGrupoExamenConsulta tbody tr td').eq(0).click();
        tableGrupoProcedimiento.column(3).search('').draw();
        $('#datatableProcedimientoLaboratorioConsulta tbody tr td').eq(0).click();
    }else{
        $('#CargarTodosGrupoProcedimientos').click();
    }
    
    calendario2.fullCalendar('removeEvents');
    CargarReservacionesLaboratorio();
    CargarReservacionesLaboratorioHoy();
    noModal = false;
});
$('#modal-laboratorio').on('hidden.bs.modal', function () {
  try {        
        noModal=true;
        ClicTablaDetalle=false;        
        tableGrupoProcedimiento.search('').draw();
    } catch (error) {}
});