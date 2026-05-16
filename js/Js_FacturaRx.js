var tablaGrupoRx = null;
var tablaProcedimientosRx = null;
var idGrupoRx = 0;
var tablaTecnologos =null;
var calendario3 = null;
var tecnologo = "";
var enterRx=false;
function ConstruirTablas() {
	tablaGrupoRx = $('#datatableGrupoRxConsulta').DataTable({
            'paging': false,
            'lengthChange': false,
            'searching': true,
            "aaSorting": [
                [0, "asc"]
            ],
            'info': false,
            'autoWidth': false,
            scrollY: 400,
            keys: true,
            "columnDefs": [{
                "targets": [0],
                "visible": false,
                "searchable": false
            }]
        });
	$('#datatableGrupoRxConsulta_filter input').css("margin-left", "-20em");
    $('#datatableGrupoRxConsulta_filter input').css("width", "30em");
    CargarTodosProcedimientosRxFactura();

    tablaGrupoRx.on('key', function(e, datatable, key, cell, originalEvent) {
            
            if (112 == key && !noModal) {
                
                tablaGrupoRx.cell(':eq(1)').focus(':eq(0)');
                tablaProcedimientosRx.cell.blur();
                tablaTecnologos.cell.blur();
                
            }

            if (113 == key && !noModal) {
                
                tablaGrupoRx.cell.blur();                
                $('#datatableProcedimientoRxConsulta tbody tr td').eq(0).click();
                tablaTecnologos.cell.blur();
                
            }
            if (114 == key && !noModal) {
                
                tablaGrupoRx.cell.blur();
                tablaProcedimientosRx.cell.blur();
                tablaTecnologos.cell().focus(':eq(0)');
                
            }
            if (115 == key && !noModal) {                
                tablaProcedimientosRx.column(3).search('').draw();                
            }

            if (key == 13) {
                tablaGrupoRx.cell.blur();
                enterRx = true;
                $('#datatableProcedimientoRxConsulta tbody tr td').eq(0).click();
            }else{
                ObtenerFilaPorPrimerletra('#datatableGrupoRxConsulta',String.fromCharCode(key));
            }

        }).on('key-focus', function(e, datatable, cell) {
            idGrupoRx = datatable.row(cell.index().row).id();
            CargarProcedimientoRxFactura(idGrupoRx,tablaProcedimientosRx);            
            if($('#datatableGrupoRxConsulta tbody tr').eq(datatable.row(cell.index().row).index()).hasClass('selected')){
                return;
            }
            $('#datatableGrupoRxConsulta tbody tr').eq(datatable.row(cell.index().row).index()).find('td').eq(0).dblclick();
        });

    tablaTecnologos = $('#datatableTecnologosConsulta').DataTable({
            'paging': false,
            'lengthChange': false,
            'searching': true,
            'ordering': true,
            'info': false,
            'autoWidth': false,
            scrollY: 400,
            keys: true
        }); 

    $('#datatableTecnologosConsulta_filter input').css("margin-left", "-20em");
    $('#datatableTecnologosConsulta_filter input').css("width", "30em");     

    tablaTecnologos.on('key', function(e, datatable, key, cell, originalEvent) {
            
            if (112 == key && !noModal) {
                
                tablaGrupoRx.cell(':eq(1)').focus(':eq(0)');
                tablaProcedimientosRx.cell.blur();
                tablaTecnologos.cell.blur();
                
            }

            if (113 == key && !noModal) {
                
                tablaGrupoRx.cell.blur();
                $('#datatableProcedimientoRxConsulta tbody tr td').eq(0).click();
                tablaTecnologos.cell.blur();
                
            }
            if (114 == key && !noModal) {
                
                tablaGrupoRx.cell.blur();
                tablaProcedimientosRx.cell.blur();
                tablaTecnologos.cell().focus(':eq(0)');
                
            }
            if (115 == key && !noModal) {
                
                tablaProcedimientosRx.column(3).search('').draw();
                
            }
            if (key == 13) {
                var idMedico = datatable.row(cell.index().row).node().id;
                
                $('#datatableTecnologosConsulta tbody tr td').find("i[idmedico="+idMedico+"]").click();
            } else {
                
            }

            
        }).on('key-focus', function(e, datatable, cell) {           

            if($('#datatableTecnologosConsulta tbody tr').eq(datatable.row(cell.index().row).index()).hasClass('selected')){
                return;
            }
            $('#datatableTecnologosConsulta tbody tr').eq(datatable.row(cell.index().row).index()).find('td').eq(0).dblclick();
            
        });

        tablaProcedimientosRx = $('#datatableProcedimientoRxConsulta').DataTable({
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

        tablaProcedimientosRx.on('key', function(e, datatable, key, cell, originalEvent) {
            if (112 == key && !noModal) {
                
                tablaGrupoRx.cell(':eq(1)').focus(':eq(0)');
                tablaProcedimientosRx.cell.blur();
                tablaTecnologos.cell.blur();
                
            }

            if (113 == key && !noModal) {
                
                tablaGrupoRx.cell.blur();
                $('#datatableProcedimientoRxConsulta tbody tr td').eq(0).click();
                tablaTecnologos.cell.blur();
                
            }
            if (114 == key && !noModal) {
                
                tablaGrupoRx.cell.blur();
                tablaProcedimientosRx.cell.blur();
                tablaTecnologos.cell().focus(':eq(0)');
                
            }
            if (115 == key && !noModal) {
                
                tablaProcedimientosRx.column(3).search('').draw();
                
            }
            if (key == 13) {
                                
                var input = $(datatable.row(cell.index().row).data()[2]).find('input');
                var idProcedimientoRx = input.attr('idProcedimientoRx');
                $('#datatableProcedimientoRxConsulta tbody tr td').find('input#checkboxRx' + idProcedimientoRx).trigger("click");  
                tablaProcedimientosRx.cell.blur();
                $("#datatableProcedimientoRxConsulta_filter input[type=search]").val("");
                $("#datatableProcedimientoRxConsulta_filter input[type=search]").focus();                              
            } else {                
                ObtenerFilaPorPrimerletra('#datatableProcedimientoRxConsulta',String.fromCharCode(key));                
            }
            enterRx = false;            
        }).on('key-focus', function(e, datatable, cell) {
                        
            var input = $(datatable.row(cell.index().row).data()[2]).find('input');
            var idProcedimientoRx = input.attr('idProcedimientoRx');
            if($('#datatableProcedimientoRxConsulta tbody tr td').find('input#checkboxRx' + idProcedimientoRx).parent().hasClass('selected')){                
                return;
            }            
            $('#datatableProcedimientoRxConsulta tbody tr td').find('input#checkboxRx' + idProcedimientoRx).dblclick();
        });

        $("#datatableProcedimientoRxConsulta_filter").on('keyup',"input[type=search]", function(e) {            
            if (e.keyCode == 40) {
                $(this).blur();
                $('#datatableProcedimientoRxConsulta tbody tr td').eq(0).click();            
            }        
        });

        $('#datatableProcedimientoRxConsulta_filter input').css("margin-left", "-20em");
        $('#datatableProcedimientoRxConsulta_filter input').css("width", "30em");
        $('#datatableProcedimientoRxConsulta_filter').append('<button id="CargarTodosProcedimientosRx" type="button" class="btn btn-primary"><i class="fa fa-clone"></i> Cargar Todos (F4)</button>');

    calendario3 = $('#calendar3').fullCalendar({
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
                var dayEvents = calendario3.fullCalendar('clientEvents', function(event) {
                    return event.start.format() == date.format();
                });
                if (dayEvents.length > 0) {
                    turno = parseInt(dayEvents[0].title.replace('PACIENTES ', '')) + 1;
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
                var eventos = calendario3.fullCalendar('clientEvents', function(event) {
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
                        AgregarItensRx(date.format(), "")
                        OrdenRx=true;
                        $('div#modal-horario-rx button.close').click();
                        $('div#modal-rx button.close').click();
                    } else {}
                });
            },
            //events    : respuesta,
            displayEventEnd: true,
            editable: false
        });

}

function AgregarItensRx(fecha, turnoConsulta) {
    tablaProcedimientosRx.column(3).search("").draw();
    var vector = $('.body').find("#datatableProcedimientoRxConsulta tbody tr");
    var items = 0;
    $.each(vector, function(a) {

        var input = $(this).find('input.checkProceRxFact');
        var item = $(this).find('td').eq(0).html();
        var precio = parseFloat($(this).find('td').eq(1).html());

        var descuento = '<input style="width:80px;" type="number" required step=".01" value="0.00" class="form-control" id="DescuentoConsulta"  placeholder="DESCUENTO">';
        var id = '<span procedimientorx="' + input.attr('idProcedimientoRx') + '" ><img src="imagenes/rdx.png" /></span>';
        var boton = '<button type="submit" idconsultaitem="'+iditemmodificar+'" id="EliminarItemConsulta" class="btn btn-danger"><i class="fa fa-trash-o" aria-hidden="true"></i></button>';
        if (input.prop('checked')) {
            
            if (!ExisteIten(input.attr('idProcedimientoRx'), item, fecha)) {
                var campos = [id, item, tecnologo, fecha, turnoConsulta, precio.toFixed(2), descuento, "$ " + precio.toFixed(2), boton,3];
                tableDetalle.row.add(campos).draw(true);
            }
        }
    });
    CalcularTotalConsulta();
}

$(".body").on('click', "i.verCalendarioRx", function(evt) {    
    tecnologo = '<span id = "' + $(this).attr('idMedico') + '">' + $(this).attr('tecnologo') + '</span>';
    calendario3.fullCalendar('removeEvents');
    CargarReservacionesRx($(this).attr('idMedico'));
    MostrarHorarioRx($(this).attr('id'));
});


function MostrarHorarioRx(idEntidad) {
    $.ajax({
        method: "POST",
        url: "Ajax/Aj_Rx.php",
        data: {
            Requerimiento: "MostrarHorarioRx",
            Id: idEntidad
        },
        dataType: 'JSON',
    }).done(function(respuesta) {
        if (respuesta[0] == false) {
            swal("Esculapio!", "OCURRIO UN ERROR.", "error");
            return;
        }
        calendario3.fullCalendar('addEventSource', respuesta)
    }).fail(function(jqXHR, textStatus, errorThrown) {
        swal("Esculapio!", "Ocurrio un error consulte con la administracion..!  " + errorThrown + " Se cargara la pantalla nuevamente para solucionar el problema.", "error");
    });
}


function CargarProcedimientoRxFactura(idGrupoRx, tablaProcedimientosRx) {

    
   tablaProcedimientosRx.column(3).search(idGrupoRx).draw();
   
}

function CargarTodosProcedimientosRxFactura() {

    $.ajax({
        
        method: "POST",
        url: "Ajax/Aj_Rx.php",
        data: {
            Requerimiento: "CargarTodosProcedimientosRx"
        },
        dataType: 'JSON',
    }).done(function(respuesta) {

        if (respuesta[0] == false) {
            swal("Esculapio!", "OCURRIO UN ERROR.", "error");
            return;
        }        
        try {
            tablaProcedimientosRx.clear().draw();
        } catch (error) {} 
        $.each(respuesta, function(i, value) {
            var campos = [respuesta[i][1],
                respuesta[i][2], 
                '<div class="checkbox checkbox-info checkbox-circle">' + '<input grupoRx="'+respuesta[i][3]+'"  idProcedimientoRx="' + respuesta[i][0] + '" class="checkProceRxFact" id="checkboxRx' + respuesta[i][0] + '" type="checkbox">' + '<label for="checkboxRx' + respuesta[i][0] + '">' + ' </label>' + ' </div>'
            ,respuesta[i][3]];
            tablaProcedimientosRx.row.add(campos).node().id = respuesta[i][0];     
        });
        tablaProcedimientosRx.draw(false);
        

    }).fail(function(jqXHR, textStatus, errorThrown) {
        console.log(errorThrown)
    });
}

$('#modal-rx').on('shown.bs.modal', function() {

    if(parseInt(ConsultaCargada)>0){
        $("#datatableGrupoRxConsulta").fadeOut(0);
        $("#datatableProcedimientoRxConsulta").fadeOut(0);
    }
    tablaProcedimientosRx.column(3).search("").draw();
    noModal=false;
    CargarTecnologosPorEspecialidad(tablaTecnologos);
    $("#rxfacutura").removeClass("parpadea");
	$('button#modalRx').blur();
    if(idOrden==0){
        //$('#datatableGrupoRxConsulta tbody tr td').eq(0).click();    
        CargarProcedimientoRxFactura("",tablaProcedimientosRx);
        $('#datatableProcedimientoRxConsulta tbody tr td').eq(0).click();
    }else{
        $('#CargarTodosProcedimientosRx').click();
    }
    
    
});

$(".body").on('click', "button#CargarTodosProcedimientosRx", function(evt) {
	
	CargarProcedimientoRxFactura("",tablaProcedimientosRx);
    $('#datatableProcedimientoRxConsulta tbody tr td').eq(0).click();

});

$(".body").on('change', "input.checkProceRxFact", function(evt) {
    
    var vector = $('.body').find("#datatableProcedimientoRxConsulta tbody tr");
    var idsProcedimientos = "";
    var precioTotal = 0;
    $.each(vector, function(a) {
        var input = $(this).find('input.checkProceRxFact');
        var precio = $(this).find('td').eq(1).html();
        if (input.prop('checked')) {
            idsProcedimientos += input.attr('idProcedimientoRx') + ","
            precioTotal += parseFloat(precio);
        }
    });
    $('strong#totalFacturaEstimado').html('$ ' + precioTotal.toFixed(2));
    if (idsProcedimientos != "") {
       CargarTecnologos(idsProcedimientos,tablaTecnologos);
    }
});

function CargarTecnologosPorEspecialidad(tablaTecnologos){
    if(ClicTablaDetalle){
        return;
    }
    $.ajax({
        method: "POST",
        url: "Ajax/Aj_Rx.php",
        data: {
            Requerimiento: "CargarTecnologosPorEspecialidad"
            //Id: idsProcedimientos
            
        },
        dataType: 'JSON',
    }).done(function(respuesta) {
        try {
            tablaTecnologos.clear().draw();
         } catch (error) {}
        if (respuesta[0] == false) {
            swal("Esculapio!", "OCURRIO UN ERROR.", "error");
            return;
        }
        $.each(respuesta, function(i, value) {
            var medico = respuesta[i][2] + " " + respuesta[i][1];

            var campos = ['<img src="' + respuesta[i][4] + '" style="width:100px;height:100px;">',
                          respuesta[i][2]+" "+respuesta[i][1],
                          "<span style='margin-top:0.5em;' class='btn-sm btn-warning col-md-12' > AGENDADOS "+respuesta[i][5]+"</span><span style='margin-top:0.5em;' class='btn-sm btn-primary col-md-12' > ATENDIDOS "+respuesta[i][6]+"</span>",
                         '<i tecnologo="' + medico + '" id="' + respuesta[i][3] + '" idMedico="' + respuesta[i][0] + '" class="fa fa-calendar-minus-o btn btn-success verCalendarioRx"' + 'data-toggle="modal" data-target="#modal-horario-rx"></i>'
            ];
            tablaTecnologos.row.add(campos).node().id = respuesta[i][0];            
        });
        tablaTecnologos.draw(false);
    }).fail(function(jqXHR, textStatus, errorThrown) {
        console.log(errorThrown)
    });

}

function CargarTecnologos(idsProcedimientos,tablaTecnologos){

	$.ajax({
        method: "POST",
        url: "Ajax/Aj_Rx.php",
        data: {
            Requerimiento: "CargarTecnologos",
            Id: idsProcedimientos
            
        },
        dataType: 'JSON',
    }).done(function(respuesta) {
    	//alert(respuesta);return;
        if (respuesta[0] == false) {
            swal("Esculapio!", "OCURRIO UN ERROR.", "error");
            return;
        }
        try {
            tablaTecnologos.clear().draw();
         } catch (error) {}
        $.each(respuesta, function(i, value) {
            var medico = respuesta[i][2] + " " + respuesta[i][1];

            var campos = ['<img src="' + respuesta[i][4] + '" style="width:100px;height:100px;">',
                          respuesta[i][2]+" "+respuesta[i][1],
                          "<span style='margin-top:0.5em;' class='btn-sm btn-warning col-md-12' > AGENDADOS "+respuesta[i][5]+"</span><span style='margin-top:0.5em;' class='btn-sm btn-primary col-md-12' > ATENDIDOS "+respuesta[i][6]+"</span>",
                         '<i tecnologo="' + medico + '" id="' + respuesta[i][3] + '" idMedico="' + respuesta[i][0] + '" class="fa fa-calendar-minus-o btn btn-success verCalendarioRx"' + 'data-toggle="modal" data-target="#modal-horario-rx"></i>'
            ];
            tablaTecnologos.row.add(campos).node().id = respuesta[i][0];            
        });
        tablaTecnologos.draw(false);
    }).fail(function(jqXHR, textStatus, errorThrown) {
        console.log(errorThrown)
    });

}


function CargarReservacionesRx(idEntidad) {

    $.ajax({
        method: "POST",
        url: "Ajax/Aj_Rx.php",
        data: {
            Requerimiento: "CargarReservacionesRx",
            Id:idEntidad
        },
        dataType: 'JSON',
    }).done(function(respuesta) {
        if (respuesta[0] == false) {
            swal("Esculapio!", "OCURRIO UN ERROR.", "error");
            return;
        }
        calendario3.fullCalendar('addEventSource', respuesta)
    }).fail(function(jqXHR, textStatus, errorThrown) {
        console.log(errorThrown)
    });
}

$('#modal-rx').on('hidden.bs.modal', function () {
  try {
    noModal=true;
    ClicTablaDetalle=false;
    $('input.checkProceRxFact').prop('checked',false);
         tablaTecnologos.clear().draw();
         tablaProcedimientosRx.search("").draw();
    } catch (error) {}
});

ConstruirTablas();