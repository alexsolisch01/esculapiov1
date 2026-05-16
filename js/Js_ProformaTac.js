var tablaGrupoTac = null;
var idGrupoTac = 0;
var tablaProcedimientosTac = null;
var tablaTecnologosTac =null;
var calendario5 = null;
var tecnologo = "";

function ConstruirTablasTac() {

	tablaGrupoTac = $('#datatableGrupoTacConsulta').DataTable({
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



	$('#datatableGrupoTacConsulta_filter input').css("margin-left", "-20em");
    $('#datatableGrupoTacConsulta_filter input').css("width", "30em");




    CargarTodosProcedimientosTacFactura();

    tablaGrupoTac.on('key', function(e, datatable, key, cell, originalEvent) {
            
            if (112 == key && !noModal) {
                
                tablaGrupoTac.cell(':eq(1)').focus(':eq(0)');
                tablaProcedimientosTac.cell.blur();
                tablaTecnologosTac.cell.blur();
                
            }

            if (113 == key && !noModal) {
                
                tablaGrupoTac.cell.blur();
                tablaProcedimientosTac.cell().focus(':eq(0)');
                tablaTecnologosTac.cell.blur();
                
            }
            if (114 == key && !noModal) {
                
                tablaGrupoTac.cell.blur();
                tablaProcedimientosTac.cell.blur();
                tablaTecnologosTac.cell().focus(':eq(0)');
                
            }
            if (115 == key && !noModal) {
                
                tablaProcedimientosTac.column(3).search('').draw();
                
            }

            if (key == 13) {
                tablaGrupoTac.cell.blur();
                tablaProcedimientosTac.cell(':eq(0)').focus();
                //$('#datatableProcedimientoTacConsulta tbody tr td').eq(0).click(); //.trigger("click");              
            }else{
                ObtenerFilaPorPrimerletra('#datatableGrupoTacConsulta',String.fromCharCode(key));
            }
        }).on('key-focus', function(e, datatable, cell) {
            idGrupoTac = datatable.row(cell.index().row).id();

            CargarProcedimientoTacFactura(idGrupoTac,tablaProcedimientosTac);
            primerEnter = true;
            if($('#datatableGrupoTacConsulta tbody tr').eq(datatable.row(cell.index().row).index()).hasClass('selected')){
                return;
            }
            $('#datatableGrupoTacConsulta tbody tr').eq(datatable.row(cell.index().row).index()).find('td').eq(0).dblclick();
        });

    tablaTecnologosTac = $('#datatableTecnologosTacConsulta').DataTable({
            'paging': false,
            'lengthChange': false,
            'searching': true,
            'ordering': true,
            'info': false,
            'autoWidth': false,
            scrollY: 400,
            keys: true
        }); 

    $('#datatableTecnologosTacConsulta_filter input').css("margin-left", "-20em");
    $('#datatableTecnologosTacConsulta_filter input').css("width", "30em");    

    tablaTecnologosTac.on('key', function(e, datatable, key, cell, originalEvent) {
            
            if (112 == key && !noModal) {
                
                tablaGrupoTac.cell(':eq(1)').focus(':eq(0)');
                tablaProcedimientosTac.cell.blur();
                tablaTecnologosTac.cell.blur();
                
            }

            if (113 == key && !noModal) {
                
                tablaGrupoTac.cell.blur();
                tablaProcedimientosTac.cell().focus(':eq(0)');
                tablaTecnologosTac.cell.blur();
                
            }
            if (114 == key && !noModal) {
                
                tablaGrupoTac.cell.blur();
                tablaProcedimientosTac.cell.blur();
                tablaTecnologosTac.cell().focus(':eq(0)');
                
            }
            if (115 == key && !noModal) {
                
                tablaProcedimientosTac.column(3).search('').draw();
                
            }

            if (key == 13 && !primerEnter) {
                var idMedico = datatable.row(cell.index().row).node().id;
                
                $('#datatableTecnologosTacConsulta tbody tr td').find("i[idmedico="+idMedico+"]").click();
            } else {
                primerEnter = false;
            }
        }).on('key-focus', function(e, datatable, cell) {           

            if($('#datatableTecnologosTacConsulta tbody tr').eq(datatable.row(cell.index().row).index()).hasClass('selected')){
                return;
            }
            $('#datatableTecnologosTacConsulta tbody tr').eq(datatable.row(cell.index().row).index()).find('td').eq(0).dblclick();
            
        });

    calendario5 = $('#calendar5').fullCalendar({
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
                var dayEvents = calendario5.fullCalendar('clientEvents', function(event) {
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
                var eventos = calendario5.fullCalendar('clientEvents', function(event) {
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
                        AgregarItensTac(date.format(), "")
                        OrdenTac=true;
                        $('div#modal-horario-tac button.close').click();
                        $('div#modal-tac button.close').click();
                    } else {}
                });
            },
            //events    : respuesta,
            displayEventEnd: true,
            editable: false
        });

}


function CargarTodosProcedimientosTacFactura() {

    $.ajax({
        
        method: "POST",
        url: "Ajax/Aj_Tomo.php",
        data: {
            Requerimiento: "CargarTodosProcedimientosTomo"
        },
        dataType: 'JSON',
    }).done(function(respuesta) {

        if (respuesta[0] == false) {
            swal("Esculapio!", "OCURRIO UN ERROR.", "error");
            return;
        }
        
        var Todos = [];
        $.each(respuesta, function(i, value) {
            var campos = [respuesta[i][1],
                respuesta[i][2], 
                '<div class="checkbox checkbox-info checkbox-circle">' + '<input grupoTac="'+respuesta[i][3]+'"  idProcedimientoTac="' + respuesta[i][0] + '" class="checkProceTacFact" id="checkboxTac' + respuesta[i][0] + '" type="checkbox">' + '<label for="checkboxTac' + respuesta[i][0] + '">' + ' </label>' + ' </div>'
            ,respuesta[i][3]];
            Todos[i]=campos;
        });

        tablaProcedimientosTac = $('#datatableProcedimientoTacConsulta').DataTable({
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
            },
            data:Todos
        });

        tablaProcedimientosTac.on('key', function(e, datatable, key, cell, originalEvent) {
            if (112 == key && !noModal) {
                
                tablaGrupoTac.cell(':eq(1)').focus(':eq(0)');
                tablaProcedimientosTac.cell.blur();
                tablaTecnologosTac.cell.blur();
                
            }

            if (113 == key && !noModal) {
                
                tablaGrupoTac.cell.blur();
                tablaProcedimientosTac.cell().focus(':eq(0)');
                tablaTecnologosTac.cell.blur();
                
            }
            if (114 == key && !noModal) {
                
                tablaGrupoTac.cell.blur();
                tablaProcedimientosTac.cell.blur();
                tablaTecnologosTac.cell().focus(':eq(0)');
                
            }
            if (115 == key && !noModal) {
                
                tablaProcedimientosTac.column(3).search('').draw();
                
            }

            if (key == 13 && !primerEnter) {
                                
                var input = $(datatable.row(cell.index().row).data()[2]).find('input');
                var idProcedimientoTac = input.attr('idProcedimientoTac');
                $('#datatableProcedimientoTacConsulta tbody tr td').find('input#checkboxTac' + idProcedimientoTac).trigger("click");                              

            } else {
                ObtenerFilaPorPrimerletra('#datatableProcedimientoTacConsulta',String.fromCharCode(key));
                primerEnter = false;
             	//tablaProcedimientosTac.cell.blur();
            }
                        
        }).on('key-focus', function(e, datatable, cell) {
            
            primerEnter = false;

            var input = $(datatable.row(cell.index().row).data()[2]).find('input');
            var idProcedimientoTac = input.attr('idProcedimientoTac');

            if($('#datatableProcedimientoTacConsulta tbody tr td').find('input#checkboxTac' + idProcedimientoTac).parent().hasClass('selected')){
                
                return;
            }
            
            $('#datatableProcedimientoTacConsulta tbody tr td').find('input#checkboxTac' + idProcedimientoTac).dblclick();

        });

        $('#datatableProcedimientoTacConsulta_filter input').css("margin-left", "-20em");
        $('#datatableProcedimientoTacConsulta_filter input').css("width", "30em");
        $('#datatableProcedimientoTacConsulta_filter').append('<button id="CargarTodosProcedimientosTac" type="button" class="btn btn-primary"><i class="fa fa-clone"></i> Cargar Todos (F4)</button>');

    }).fail(function(jqXHR, textStatus, errorThrown) {
        swal("Esculapio!", "Ocurrio un error consulte con la administracion..!  " + errorThrown + " Se cargara la pantalla nuevamente para solucionar el problema.", "error");
    });
}

function CargarProcedimientoTacFactura(idGrupoTac, tablaProcedimientosTac) {

    
   tablaProcedimientosTac.column(3).search(idGrupoTac).draw();
   
}

$(".body").on('click', "button#CargarTodosProcedimientosTac", function(evt) {
	
	CargarProcedimientoTacFactura("",tablaProcedimientosTac);

});

$('#modal-tac').on('shown.bs.modal', function() {
    noModal=false;
    $("#tamoFactura").removeClass("parpadea");
	$('button#modalTac').blur();
    
    if(idOrden==0){
        $('#datatableGrupoTacConsulta tbody tr td').eq(0).click();   
    }else{
        $('#CargarTodosProcedimientosTac').click();
    }
    CargarTecnologosTacPorEspecialidad(tablaTecnologosTac); 
    
});



$(".body").on('change', "input.checkProceTacFact", function(evt) {
    
    var vector = $('.body').find("#datatableProcedimientoTacConsulta tbody tr");
    var idsProcedimientos = "";
    var precioTotal = 0;
    $.each(vector, function(a) {
        var input = $(this).find('input.checkProceTacFact');
        var precio = $(this).find('td').eq(1).html();
        if (input.prop('checked')) {
            idsProcedimientos += input.attr('idProcedimientoTac') + ","
            precioTotal += parseFloat(precio);
        }
    });
    $('strong#totalFacturaEstimado').html('$ ' + precioTotal.toFixed(2));
    if (idsProcedimientos != "") {
       CargarTecnologosTac(idsProcedimientos,tablaTecnologosTac);
    }
});

function CargarTecnologosTacPorEspecialidad(tablaTecnologosTac){
    if(ClicTablaDetalle){
        return;
    }
    $.ajax({
        method: "POST",
        url: "Ajax/Aj_Tomo.php",
        data: {
            Requerimiento: "CargarTecnologosTacPorEspecialidad"
            
            
        },
        dataType: 'JSON',
    }).done(function(respuesta) {
        //alert(respuesta);return;
        if (respuesta[0] == false) {
            swal("Esculapio!", "OCURRIO UN ERROR.", "error");
            return;
        }
        try {
        tablaTecnologosTac.clear().draw();
    } catch (error) {}
        $.each(respuesta, function(i, value) {
            var medico = respuesta[i][2] + " " + respuesta[i][1];
            var campos = ['<img src="' + respuesta[i][4] + '" style="width:100px;height:100px;">',
                          respuesta[i][2]+" "+respuesta[i][1],
                          "<span style='margin-top:0.5em;' class='btn-sm btn-warning col-md-12' > AGENDADOS "+respuesta[i][5]+"</span><span style='margin-top:0.5em;' class='btn-sm btn-primary col-md-12' > ATENDIDOS "+respuesta[i][6]+"</span>",
                         '<i tecnologo="' + medico + '" id="' + respuesta[i][3] + '" idMedico="' + respuesta[i][0] + '" class="fa fa-calendar-minus-o btn btn-success verCalendarioTac"' + 'data-toggle="modal" data-target="#modal-horario-tac"></i>'
            ];
            tablaTecnologosTac.row.add(campos).node().id = respuesta[i][0];
            tablaTecnologosTac.draw(false);
        });
    }).fail(function(jqXHR, textStatus, errorThrown) {
        swal("Esculapio!", "Ocurrio un error consulte con la administracion..!  " + errorThrown + " Se cargara la pantalla nuevamente para solucionar el problema.", "error");
    });

}

function CargarTecnologosTac(idsProcedimientos,tablaTecnologosTac){

	$.ajax({
        method: "POST",
        url: "Ajax/Aj_Tomo.php",
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
        tablaTecnologosTac.clear().draw();
    } catch (error) {}
        $.each(respuesta, function(i, value) {
            var medico = respuesta[i][2] + " " + respuesta[i][1];
            var campos = ['<img src="' + respuesta[i][4] + '" style="width:100px;height:100px;">',
                          respuesta[i][2]+" "+respuesta[i][1],
                          "<span style='margin-top:0.5em;' class='btn-sm btn-warning col-md-12' > AGENDADOS "+respuesta[i][5]+"</span><span style='margin-top:0.5em;' class='btn-sm btn-primary col-md-12' > ATENDIDOS "+respuesta[i][6]+"</span>",
                         '<i tecnologo="' + medico + '" id="' + respuesta[i][3] + '" idMedico="' + respuesta[i][0] + '" class="fa fa-calendar-minus-o btn btn-success verCalendarioTac"' + 'data-toggle="modal" data-target="#modal-horario-tac"></i>'
            ];
            tablaTecnologosTac.row.add(campos).node().id = respuesta[i][0];
            tablaTecnologosTac.draw(false);
        });
    }).fail(function(jqXHR, textStatus, errorThrown) {
        swal("Esculapio!", "Ocurrio un error consulte con la administracion..!  " + errorThrown + " Se cargara la pantalla nuevamente para solucionar el problema.", "error");
    });

}


function CargarReservacionesTac(idEntidad) {

    $.ajax({
        method: "POST",
        url: "Ajax/Aj_Tomo.php",
        data: {
            Requerimiento: "CargarReservacionesTomo",
            Id:idEntidad
        },
        dataType: 'JSON',
    }).done(function(respuesta) {
        if (respuesta[0] == false) {
            swal("Esculapio!", "OCURRIO UN ERROR.", "error");
            return;
        }
        
        calendario5.fullCalendar('addEventSource', respuesta)
    }).fail(function(jqXHR, textStatus, errorThrown) {
        swal("Esculapio!", "Ocurrio un error consulte con la administracion..!  " + errorThrown + " Se cargara la pantalla nuevamente para solucionar el problema.", "error");
    });
}

$(".body").on('click', "i.verCalendarioTac", function(evt) {    
    tecnologo = '<span id = "' + $(this).attr('idMedico') + '">' + $(this).attr('tecnologo') + '</span>';
    calendario5.fullCalendar('removeEvents');
    CargarReservacionesTac($(this).attr('idMedico'));
    MostrarHorarioTac($(this).attr('id'));
});

function MostrarHorarioTac(idEntidad) {
    $.ajax({
        method: "POST",
        url: "Ajax/Aj_Tomo.php",
        data: {
            Requerimiento: "MostrarHorarioTomo",
            Id: idEntidad
        },
        dataType: 'JSON',
    }).done(function(respuesta) {
        if (respuesta[0] == false) {
            swal("Esculapio!", "OCURRIO UN ERROR.", "error");
            return;
        }
        calendario5.fullCalendar('addEventSource', respuesta)
    }).fail(function(jqXHR, textStatus, errorThrown) {
        swal("Esculapio!", "Ocurrio un error consulte con la administracion..!  " + errorThrown + " Se cargara la pantalla nuevamente para solucionar el problema.", "error");
    });
}

function AgregarItensTac(fecha, turnoConsulta) {

    var vector = $('.body').find("#datatableProcedimientoTacConsulta tbody tr");
    var items = 0;
    $.each(vector, function(a) {

        var input = $(this).find('input.checkProceTacFact');
        var item = $(this).find('td').eq(0).html();
        var precio = parseFloat($(this).find('td').eq(1).html());

        var descuento = '<input style="width:80px;" type="number" required step=".01" value="0.00" class="form-control" id="DescuentoConsulta"  placeholder="DESCUENTO">';
        var id = '<span procedimientotac="' + input.attr('idProcedimientoTac') + '" ><img src="imagenes/tomo.png" /></span>';
        var boton = '<button type="submit" id="EliminarItemConsulta" class="btn btn-danger"><i class="fa fa-trash-o" aria-hidden="true"></i></button>';
        if (input.prop('checked')) {
            if (!ExisteIten(input.attr('idProcedimientoTac'), item, fecha)) {
                var campos = [id, item, tecnologo, fecha, turnoConsulta, precio.toFixed(2), descuento, "$ " + precio.toFixed(2), boton,5];
                tableDetalle.row.add(campos).draw(true);
            }
        }
    });
    CalcularTotalConsulta();
}

$('#modal-tac').on('hidden.bs.modal', function () {
  try {
    noModal=true;
    ClicTablaDetalle=false;
    $('input.checkProceTacFact').prop('checked',false);
         tablaTecnologosTac.clear().draw();
    } catch (error) {}
});

ConstruirTablasTac();