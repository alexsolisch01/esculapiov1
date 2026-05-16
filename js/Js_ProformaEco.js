var tablaGrupoEco = null;
var idGrupoEco = 0;
var tablaProcedimientosEco = null;
var tablaTecnologosEco =null;
var calendario4 = null;
var tecnologo = "";

function ConstruirTablasEco() {

	tablaGrupoEco = $('#datatableGrupoEcoConsulta').DataTable({
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



	$('#datatableGrupoEcoConsulta_filter input').css("margin-left", "-20em");
    $('#datatableGrupoEcoConsulta_filter input').css("width", "30em");




    CargarTodosProcedimientosEcoFactura();

    tablaGrupoEco.on('key', function(e, datatable, key, cell, originalEvent) {
            
            if (112 == key && !noModal) {
                
                tablaGrupoEco.cell(':eq(1)').focus(':eq(0)');
                tablaProcedimientosEco.cell.blur();
                tablaTecnologosEco.cell.blur();
                
            }

            if (113 == key && !noModal) {
                
                tablaGrupoEco.cell.blur();
                tablaProcedimientosEco.cell().focus(':eq(0)');
                tablaTecnologosEco.cell.blur();
                
            }
            if (114 == key && !noModal) {
                
                tablaGrupoEco.cell.blur();
                tablaProcedimientosEco.cell.blur();
                tablaTecnologosEco.cell().focus(':eq(0)');
                
            }
            if (115 == key && !noModal) {
                
                tablaProcedimientosEco.column(3).search('').draw();
                
            }

            if (key == 13) {
                tablaGrupoEco.cell.blur();
                tablaProcedimientosEco.cell(':eq(0)').focus();
                //$('#datatableProcedimientoEcoConsulta tbody tr td').eq(0).click(); //.trigger("click");              
            }else{
                ObtenerFilaPorPrimerletra('#datatableGrupoEcoConsulta',String.fromCharCode(key));
            }
        }).on('key-focus', function(e, datatable, cell) {
            idGrupoEco = datatable.row(cell.index().row).id();

            CargarProcedimientoEcoFactura(idGrupoEco,tablaProcedimientosEco);
            primerEnter = true;

            if($('#datatableGrupoEcoConsulta tbody tr').eq(datatable.row(cell.index().row).index()).hasClass('selected')){
                return;
            }
            $('#datatableGrupoEcoConsulta tbody tr').eq(datatable.row(cell.index().row).index()).find('td').eq(0).dblclick();
        });

    tablaTecnologosEco = $('#datatableTecnologosEcoConsulta').DataTable({
            'paging': false,
            'lengthChange': false,
            'searching': true,
            'ordering': true,
            'info': false,
            'autoWidth': false,
            scrollY: 400,
            keys: true
        }); 

    $('#datatableTecnologosEcoConsulta_filter input').css("margin-left", "-20em");
    $('#datatableTecnologosEcoConsulta_filter input').css("width", "30em");    


     tablaTecnologosEco.on('key', function(e, datatable, key, cell, originalEvent) {
            
            if (112 == key && !noModal) {
                
                tablaGrupoEco.cell(':eq(1)').focus(':eq(0)');
                tablaProcedimientosEco.cell.blur();
                tablaTecnologosEco.cell.blur();
                
            }

            if (113 == key && !noModal) {
                
                tablaGrupoEco.cell.blur();
                tablaProcedimientosEco.cell().focus(':eq(0)');
                tablaTecnologosEco.cell.blur();
                
            }
            if (114 == key && !noModal) {
                
                tablaGrupoEco.cell.blur();
                tablaProcedimientosEco.cell.blur();
                tablaTecnologosEco.cell().focus(':eq(0)');
                
            }
            if (115 == key && !noModal) {
                
                tablaProcedimientosEco.column(3).search('').draw();
                
            }

            if (key == 13 && !primerEnter) {
                var idMedico = datatable.row(cell.index().row).node().id;
                
                $('#datatableTecnologosEcoConsulta tbody tr td').find("i[idmedico="+idMedico+"]").click();
            } else {
                primerEnter = false;
            }
        }).on('key-focus', function(e, datatable, cell) {           

            if($('#datatableTecnologosEcoConsulta tbody tr').eq(datatable.row(cell.index().row).index()).hasClass('selected')){
                return;
            }
            $('#datatableTecnologosEcoConsulta tbody tr').eq(datatable.row(cell.index().row).index()).find('td').eq(0).dblclick();
            
        });

    calendario4 = $('#calendar4').fullCalendar({
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
                var dayEvents = calendario4.fullCalendar('clientEvents', function(event) {
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
                var eventos = calendario4.fullCalendar('clientEvents', function(event) {
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
                        AgregarItensEco(date.format(), "")
                        OrdenEco=true;
                        $('div#modal-horario-eco button.close').click();
                        $('div#modal-eco button.close').click();
                    } else {}
                });
            },
            //events    : respuesta,
            displayEventEnd: true,
            editable: false
        });

}


function CargarTodosProcedimientosEcoFactura() {

    $.ajax({
        
        method: "POST",
        url: "Ajax/Aj_Eco.php",
        data: {
            Requerimiento: "CargarTodosProcedimientosEco"
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
                '<div class="checkbox checkbox-info checkbox-circle">' + '<input grupoEco="'+respuesta[i][3]+'"  idProcedimientoEco="' + respuesta[i][0] + '" class="checkProceEcoFact" id="checkboxEco' + respuesta[i][0] + '" type="checkbox">' + '<label for="checkboxEco' + respuesta[i][0] + '">' + ' </label>' + ' </div>'
            ,respuesta[i][3]];
            Todos[i]=campos;
        });

        tablaProcedimientosEco = $('#datatableProcedimientoEcoConsulta').DataTable({
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

        tablaProcedimientosEco.on('key', function(e, datatable, key, cell, originalEvent) {
            
            if (112 == key && !noModal) {
                
                tablaGrupoEco.cell(':eq(1)').focus(':eq(0)');
                tablaProcedimientosEco.cell.blur();
                tablaTecnologosEco.cell.blur();
                
            }

            if (113 == key && !noModal) {
                
                tablaGrupoEco.cell.blur();
                tablaProcedimientosEco.cell().focus(':eq(0)');
                tablaTecnologosEco.cell.blur();
                
            }
            if (114 == key && !noModal) {
                
                tablaGrupoEco.cell.blur();
                tablaProcedimientosEco.cell.blur();
                tablaTecnologosEco.cell().focus(':eq(0)');
                
            }
            if (115 == key && !noModal) {
                
                tablaProcedimientosEco.column(3).search('').draw();
                
            }

            if (key == 13) {
                                
                var input = $(datatable.row(cell.index().row).data()[2]).find('input');
                var idProcedimientoEco = input.attr('idProcedimientoEco');
                $('#datatableProcedimientoEcoConsulta tbody tr td').find('input#checkboxEco' + idProcedimientoEco).trigger("click");                              

            } else {
                ObtenerFilaPorPrimerletra('#datatableProcedimientoEcoConsulta',String.fromCharCode(key));
                primerEnter = false;
             	//tablaProcedimientosEco.cell.blur();
            }
                        
        }).on('key-focus', function(e, datatable, cell) {
            
            primerEnter = false;

            var input = $(datatable.row(cell.index().row).data()[2]).find('input');
            var idProcedimientoEco = input.attr('idProcedimientoEco');

            if($('#datatableProcedimientoEcoConsulta tbody tr td').find('input#checkboxEco' + idProcedimientoEco).parent().hasClass('selected')){
                
                return;
            }
            
            $('#datatableProcedimientoEcoConsulta tbody tr td').find('input#checkboxEco' + idProcedimientoEco).dblclick();
        });

        $('#datatableProcedimientoEcoConsulta_filter input').css("margin-left", "-20em");
        $('#datatableProcedimientoEcoConsulta_filter input').css("width", "30em");
        $('#datatableProcedimientoEcoConsulta_filter').append('<button id="CargarTodosProcedimientosEco" type="button" class="btn btn-primary"><i class="fa fa-clone"></i> Cargar Todos (F4)</button>');

    }).fail(function(jqXHR, textStatus, errorThrown) {
        swal("Esculapio!", "Ocurrio un error consulte con la administracion..!  " + errorThrown + " Se cargara la pantalla nuevamente para solucionar el problema.", "error");
    });
}

function CargarProcedimientoEcoFactura(idGrupoEco, tablaProcedimientosEco) {

    
   tablaProcedimientosEco.column(3).search(idGrupoEco).draw();
   
}

$(".body").on('click', "button#CargarTodosProcedimientosEco", function(evt) {
	
	CargarProcedimientoEcoFactura("",tablaProcedimientosEco);

});

$('#modal-eco').on('shown.bs.modal', function() {
    noModal=false;
    CargarTecnologosEcoPorEspecialidad(tablaTecnologosEco);
    $("#ecoFactura").removeClass("parpadea");
	$('button#modalEco').blur();
    
    if(idOrden==0){
        $('#datatableGrupoEcoConsulta tbody tr td').eq(0).click();  
    }else{
        $('#CargarTodosProcedimientosEco').click();
    }  
    
});

$(".body").on('change', "input.checkProceEcoFact", function(evt) {
    
    var vector = $('.body').find("#datatableProcedimientoEcoConsulta tbody tr");
    var idsProcedimientos = "";
    var precioTotal = 0;
    $.each(vector, function(a) {
        var input = $(this).find('input.checkProceEcoFact');
        var precio = $(this).find('td').eq(1).html();
        if (input.prop('checked')) {
            idsProcedimientos += input.attr('idProcedimientoEco') + ","
            precioTotal += parseFloat(precio);
        }
    });
    $('strong#totalFacturaEstimado').html('$ ' + precioTotal.toFixed(2));
    if (idsProcedimientos != "") {
       CargarTecnologosEco(idsProcedimientos,tablaTecnologosEco);
    }
});

function CargarTecnologosEcoPorEspecialidad(tablaTecnologosEco){
    if(ClicTablaDetalle){
        return;
    }
    $.ajax({
        method: "POST",
        url: "Ajax/Aj_Eco.php",
        data: {
            Requerimiento: "CargarTecnologosEcoPorEspecialidad"
            
            
        },
        dataType: 'JSON',
    }).done(function(respuesta) {
        //alert(respuesta);return;
        if (respuesta[0] == false) {
            swal("Esculapio!", "OCURRIO UN ERROR.", "error");
            return;
        }
        try {
        tablaTecnologosEco.clear().draw();
    } catch (error) {}
        $.each(respuesta, function(i, value) {
            var medico = respuesta[i][2] + " " + respuesta[i][1];
            var campos = ['<img src="' + respuesta[i][4] + '" style="width:100px;height:100px;">',
                          respuesta[i][2]+" "+respuesta[i][1],
                          "<span style='margin-top:0.5em;' class='btn-sm btn-warning col-md-12' > AGENDADOS "+respuesta[i][5]+"</span><span style='margin-top:0.5em;' class='btn-sm btn-primary col-md-12' > ATENDIDOS "+respuesta[i][6]+"</span>",
                         '<i tecnologo="' + medico + '" id="' + respuesta[i][3] + '" idMedico="' + respuesta[i][0] + '" class="fa fa-calendar-minus-o btn btn-success verCalendarioEco"' + 'data-toggle="modal" data-target="#modal-horario-eco"></i>'
            ];
            tablaTecnologosEco.row.add(campos).node().id = respuesta[i][0];
            tablaTecnologosEco.draw(false);
        });
    }).fail(function(jqXHR, textStatus, errorThrown) {
        swal("Esculapio!", "Ocurrio un error consulte con la administracion..!  " + errorThrown + " Se cargara la pantalla nuevamente para solucionar el problema.", "error");
    });

}

function CargarTecnologosEco(idsProcedimientos,tablaTecnologosEco){

	$.ajax({
        method: "POST",
        url: "Ajax/Aj_Eco.php",
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
        tablaTecnologosEco.clear().draw();
    } catch (error) {}
        $.each(respuesta, function(i, value) {
            var medico = respuesta[i][2] + " " + respuesta[i][1];
            var campos = ['<img src="' + respuesta[i][4] + '" style="width:100px;height:100px;">',
                          respuesta[i][2]+" "+respuesta[i][1],
                          "<span style='margin-top:0.5em;' class='btn-sm btn-warning col-md-12' > AGENDADOS "+respuesta[i][5]+"</span><span style='margin-top:0.5em;' class='btn-sm btn-primary col-md-12' > ATENDIDOS "+respuesta[i][6]+"</span>",
                         '<i tecnologo="' + medico + '" id="' + respuesta[i][3] + '" idMedico="' + respuesta[i][0] + '" class="fa fa-calendar-minus-o btn btn-success verCalendarioEco"' + 'data-toggle="modal" data-target="#modal-horario-eco"></i>'
            ];
            tablaTecnologosEco.row.add(campos).node().id = respuesta[i][0];
            tablaTecnologosEco.draw(false);
        });
    }).fail(function(jqXHR, textStatus, errorThrown) {
        swal("Esculapio!", "Ocurrio un error consulte con la administracion..!  " + errorThrown + " Se cargara la pantalla nuevamente para solucionar el problema.", "error");
    });

}


function CargarReservacionesEco(idEntidad) {

    $.ajax({
        method: "POST",
        url: "Ajax/Aj_Eco.php",
        data: {
            Requerimiento: "CargarReservacionesEco",
            Id:idEntidad
        },
        dataType: 'JSON',
    }).done(function(respuesta) {
        if (respuesta[0] == false) {
            swal("Esculapio!", "OCURRIO UN ERROR.", "error");
            return;
        }
        
        calendario4.fullCalendar('addEventSource', respuesta)
    }).fail(function(jqXHR, textStatus, errorThrown) {
        swal("Esculapio!", "Ocurrio un error consulte con la administracion..!  " + errorThrown + " Se cargara la pantalla nuevamente para solucionar el problema.", "error");
    });
}

$(".body").on('click', "i.verCalendarioEco", function(evt) {    
    tecnologo = '<span id = "' + $(this).attr('idMedico') + '">' + $(this).attr('tecnologo') + '</span>';
    calendario4.fullCalendar('removeEvents');
    CargarReservacionesEco($(this).attr('idMedico'));
    MostrarHorarioEco($(this).attr('id'));
});

function MostrarHorarioEco(idEntidad) {
    $.ajax({
        method: "POST",
        url: "Ajax/Aj_Eco.php",
        data: {
            Requerimiento: "MostrarHorarioEco",
            Id: idEntidad
        },
        dataType: 'JSON',
    }).done(function(respuesta) {
        if (respuesta[0] == false) {
            swal("Esculapio!", "OCURRIO UN ERROR.", "error");
            return;
        }
        calendario4.fullCalendar('addEventSource', respuesta)
    }).fail(function(jqXHR, textStatus, errorThrown) {
        swal("Esculapio!", "Ocurrio un error consulte con la administracion..!  " + errorThrown + " Se cargara la pantalla nuevamente para solucionar el problema.", "error");
    });
}

function AgregarItensEco(fecha, turnoConsulta) {

    var vector = $('.body').find("#datatableProcedimientoEcoConsulta tbody tr");
    var items = 0;
    $.each(vector, function(a) {

        var input = $(this).find('input.checkProceEcoFact');
        var item = $(this).find('td').eq(0).html();
        var precio = parseFloat($(this).find('td').eq(1).html());

        var descuento = '<input style="width:80px;" type="number" required step=".01" value="0.00" class="form-control" id="DescuentoConsulta"  placeholder="DESCUENTO">';
        var id = '<span procedimientoeco="' + input.attr('idProcedimientoEco') + '" ><img src="imagenes/ecoo.png" /></span>';
        var boton = '<button type="submit" id="EliminarItemConsulta" class="btn btn-danger"><i class="fa fa-trash-o" aria-hidden="true"></i></button>';
        if (input.prop('checked')) {
            if (!ExisteIten(input.attr('idProcedimientoEco'), item, fecha)) {
                var campos = [id, item, tecnologo, fecha, turnoConsulta, precio.toFixed(2), descuento, "$ " + precio.toFixed(2), boton,4];
                tableDetalle.row.add(campos).draw(true);
            }
        }
    });
    CalcularTotalConsulta();
}

$('#modal-eco').on('hidden.bs.modal', function () {
  try {
        noModal=true;
        ClicTablaDetalle=false;
        $('input.checkProceEcoFact').prop('checked',false);
         tablaTecnologosEco.clear().draw();
    } catch (error) {}
});


ConstruirTablasEco();