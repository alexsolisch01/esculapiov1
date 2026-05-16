
var existenItems=false;
var primeravez1 = false;
var primeravezOrden = false;
var tablaFacturas = null;
var tablaOrden = null;
var anular = false;
var ConsultaCargada=0;

var emisionCargada=0;
var autorizacionCargada=0;

$('#modal-consulta-factura').on('shown.bs.modal', function() {
    if (!primeravez1) {        
        primeravez1 = true;
    }
    $('#BuscarFactura').click();
});

function LlenarTablaFacturas() {
     tablaFacturas = $('#datatableConsultaFactura').DataTable({
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
                Requerimiento: "LlenarTablaFacturas"
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
            "targets": [0, 1, 2, 3, 4, 5, 6],
            "orderable": false,
        }]
    });
    tablaFacturas.on('key', function(e, datatable, key, cell, originalEvent) {
        if (key == 13) {
            $('#datatableConsultaFactura tbody tr').eq(datatable.row(cell.index().row).index()).find('td').eq(0).dblclick();
        }
    });
    $('#datatableConsultaFactura_filter input').unbind();
    $('#datatableConsultaFactura_filter input').remove();
    $('#datatableConsultaFactura_filter label').remove(); 
    // $('input#apellidoMFiltro').remove();
    $('input#numeroF').bind('keyup', function(e) {
        if (e.keyCode == 13) {
            tablaFacturas.column(0).search($('input#numeroF').val()).draw();
            tablaFacturas.column(1).search($('input#pacienteF').val()).draw();
            tablaFacturas.column(2).search($('input#clienteF').val()).draw();
        }
        if (e.keyCode == 40) {
            $(this).blur();
            $('#datatableConsultaFactura tbody tr td').eq(0).click();
        }
    });
    $('input#pacienteF').bind('keyup', function(e) {
        if (e.keyCode == 13) {
            tablaFacturas.column(0).search($('input#numeroF').val()).draw();
            tablaFacturas.column(1).search($('input#pacienteF').val()).draw();
            tablaFacturas.column(2).search($('input#clienteF').val()).draw();
        }
        if (e.keyCode == 40) {
            $(this).blur();
            $('#datatableConsultaFactura tbody tr td').eq(0).click();
        }
    });
    $('input#clienteF').bind('keyup', function(e) {
        if (e.keyCode == 13) {
            tabla.column(0).search($('input#numeroF').val()).draw();
            tabla.column(1).search($('input#pacienteF').val()).draw();
            tabla.column(2).search($('input#clienteF').val()).draw();
        }
        if (e.keyCode == 40) {
            $(this).blur();
            $('#datatableConsultaFactura tbody tr td').eq(0).click();
        }
    });
}

function LlenarTablaFacturasConFechas() {
     tablaFacturas = $('#datatableConsultaFactura').DataTable({
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
                Requerimiento: "LlenarTablaFacturasConFechas"
                
            },
            type: "POST"
        },
        scrollY: 400,
        scrollX: true,
        keys: true,
        scroller: {
            loadingIndicator: true
        },
        "columnDefs": [{
            "targets": [0, 1, 2, 3, 4, 5, 6],
            "orderable": false,
        },
        {
            "targets": [6],
            "visible": false,
        }]
    });
    tablaFacturas.on('key', function(e, datatable, key, cell, originalEvent) {
        if (key == 13) {
            $('#datatableConsultaFactura tbody tr').eq(datatable.row(cell.index().row).index()).find('td').eq(0).dblclick();
            datatable.cell.blur();
        }
    });
    $('#datatableConsultaFactura_filter input').unbind();
    $('#datatableConsultaFactura_filter input').remove();
    $('#datatableConsultaFactura_filter label').remove(); 
    // $('input#apellidoMFiltro').remove();
    $('input#numeroF').bind('keyup', function(e) {
        if (e.keyCode == 13) {
            tablaFacturas.column(0).search($('input#numeroF').val()).draw();
            tablaFacturas.column(1).search($('input#pacienteF').val()).draw();
            tablaFacturas.column(2).search($('input#clienteF').val()).draw();
        }
        if (e.keyCode == 40) {
            $(this).blur();
            $('#datatableConsultaFactura tbody tr td').eq(0).click();
        }
    });
    $('input#pacienteF').bind('keyup', function(e) {
        if (e.keyCode == 13) {
            tablaFacturas.column(0).search($('input#numeroF').val()).draw();
            tablaFacturas.column(1).search($('input#pacienteF').val()).draw();
            tablaFacturas.column(2).search($('input#clienteF').val()).draw();
        }
        if (e.keyCode == 40) {
            $(this).blur();
            $('#datatableConsultaFactura tbody tr td').eq(0).click();
        }
    });
    $('input#clienteF').bind('keyup', function(e) {
        if (e.keyCode == 13) {
            tablaFacturas.column(0).search($('input#numeroF').val()).draw();
            tablaFacturas.column(1).search($('input#pacienteF').val()).draw();
            tablaFacturas.column(2).search($('input#clienteF').val()).draw();
        }
        if (e.keyCode == 40) {
            $(this).blur();
            $('#datatableConsultaFactura tbody tr td').eq(0).click();
        }
    });
}
LlenarTablaFacturasConFechas();
var nc =0;
$('.body table#datatableConsultaFactura tbody').on('dblclick', 'tr', function(evt) {
    var fila = $('.body').find("#datatableDetalleFact tbody tr").find("td").eq(0).html();
    var idPaciente = $('#nombreCompleto').attr('idPaciente');
    nc = tablaFacturas.row($(this)).data()[6];
    if(nc!=2){
       $('.body').find("button#ModificarFact").prop('disabled',true);
    }else{
        $('.body').find("button#ModificarFact").prop('disabled',false);
    }
    if(idPaciente!="0"||fila!="No existen datos"){
        swal({
            title: "Esculapio",
            text: "Seguro que desea Reemplazar lo que contiene la factura.?",
            icon: "info",
            buttons: true,
            dangerMode: false,
        }).then((confirma) => {
            if (confirma) {            
                var cerrar = $('.body').find('button.close');
                var numero = $(this).find('td').eq(0).html();
                NumeroConsultaCargada = numero;
                CargarFacturaConsulta(numero);
                cerrar.click();
            } else {
                
            }
        });
    }else{
        var cerrar = $('.body').find('button.close');
        var numero = $(this).find('td').eq(0).html();
        NumeroConsultaCargada = numero;
        CargarFacturaConsulta(numero);
        cerrar.click();
    }
    
    //$(this).find('td').focus();
    
}); 
var cambios = 0;
function CargarFacturaConsulta(numero){
	
$.ajax({
        
        method: "POST",
        url: "Ajax/Aj_Consulta.php",
        data: {
            Requerimiento: "CargarFacturaConsulta",
            Numero:numero
        },
        dataType: 'JSON',
    }).done(function(respuesta) {


        if (respuesta[0] == false) {
            swal("Esculapio!", "OCURRIO UN ERROR.", "error");
            return;
        }
        var confirma = true;
        $.each(respuesta, function(i, value) {
        		 confirma = false;
                 try{tableDetalle.clear().draw();}catch(error){}
        		ConsultarDetalleConsulta(value[0]);		
                $("#notasCredito").html(CargarNotasCredito(value[0]));   		
			    $('.body').find('span#cedula').text(value[4]);
			    $('.body').find('strong#nombreCompleto').text(value[3]+" "+value[2]);
			    $('.body').find('strong#nombreCompleto').attr('fecha', value[8]);
                var edad = calcularEdad($('strong#nombreCompleto').attr("fecha"));
                $('.body').find('span#edad').html(edad);
			    $('.body').find('span#direccion').text(value[5]);
			    $('.body').find('span#telefono').text(value[6]);
			    $('.body').find('span#email').text(value[7]);    
			    $('.body').find('strong#nombreCompleto').attr('idPaciente', value[1]);
			    $('.body').find('span#totalCancelarConsulta').html("TOTAL A CANCELAR : $ "+ parseFloat(value[12]).toFixed(2));
			    $('.body').find('span#totalDescuentoConsulta').html("TOTAL DESCUENTO : $ "+ parseFloat(value[13]).toFixed(2));
                $('#SecuenciaFacturaConsulta').html("FACTURA #: "+numero);

                cambios = parseFloat(value[23]);
                ConsultaCargada = value[0];
                anular = true;
                CargadaEstadoSri=value[19];
                
                if(value[14]==1){
                    anular=true;
                    if(value[15]==1){
                        anular=true;
                        if(value[16]==1){
                            anular=true;
                            if(value[17]==1){
                                anular=true;
                                if(value[18]==1){
                                    anular=true;
                                }else{
                                    anular=false;
                                }
                            }else{
                                anular=false;
                            }
                        }else{
                            anular=false;
                        }
                    }else{
                        anular=false;
                    }
                }else{
                    anular=false;
                    $('button#AnularConsulta').attr("disabled",true);
                }

                if(value[19]=='S'){
                    anular=false;
                }
                emisionCargada = value[20];
                autorizacionCargada = value[21];
                clavesri = autorizacionCargada;
                
                if(anular){
                    $('button#AnularConsulta').attr("disabled",false);
                    if(value[22]==true){
                        
                        $('button#ModificarFact').fadeIn(0);
                    }else{
                        
                        $('button#ModificarFact').fadeOut(0);  
                    }
                }else{
                    $('button#AnularConsulta').attr("disabled",true);
                    if(value[22]==true){
                        
                        $('button#ModificarFact').fadeIn(0);
                    }else{
                        
                        $('button#ModificarFact').fadeOut(0);  
                    }
                    
                }

        		if(value[10]==1){
        			    $('.body').find('span#cedulaCliente').text("9999999999");
        			    $('.body').find('strong#nombreCompletoCliente').text("CONSUMIDOR FINAL");
        			    $('.body').find('strong#nombreCompletoCliente').attr('idCliente', '1');
        			    $('.body').find('span#direccionCliente').text("----------------");
        			    $('.body').find('span#telefonoCliente').text("----------------");
        			    $('.body').find('span#emailCliente').text("-----------------");



        		}
        		if(value[10]>1){

        			CargarClientePorIdConsulta(value[10]);	
        					
        		}
        		if(value[11]=="S"){
                    $(".body div#DatosPaciente").css('visibility', 'visible');
        			$("a#NoCon").click();
        		}
        });
        $('button#ModificarFact').fadeIn(0);
        if(confirma){
                LimpiarConsulta();
                swal("Esculapio!", "No Existe La Factura.", "warning");
        }else{
            $('button#CobrarConsulta').fadeOut(0);
            $('button#ReimprimirConsulta').fadeIn(0);
            //alert($('button#ReimprimirConsulta').html());
        }
   	});
}
 


 function CargarClientePorIdConsulta(id){

 	 $.ajax({
            method: "POST",
            url: "Ajax/Aj_Paciente.php",
            data: {
                Requerimiento: "CargarClientePorIdConsulta",
                Id: id
            },
            dataType: 'JSON',
        }).done(function(respuesta) {
            if (respuesta[0] == false) {
                swal("Esculapio!", "OCURRIO UN ERROR.", "error");
                return;
            }
            
                $('.body').find('span#cedulaCliente').text(respuesta[0][1]);
			    $('.body').find('strong#nombreCompletoCliente').text(respuesta[0][2]+" "+respuesta[0][3]);
			    $('.body').find('strong#nombreCompletoCliente').attr('idCliente',respuesta[0][0] );
			    $('.body').find('span#direccionCliente').text(respuesta[0][4]);
			    $('.body').find('span#telefonoCliente').text(respuesta[0][5]);
			    $('.body').find('span#emailCliente').text(respuesta[0][6]);


        }).fail(function(jqXHR, textStatus, errorThrown) {
            swal("Esculapio!", "Ocurrio un error consulte con la administracion..!  " + errorThrown + " Se cargara la pantalla nuevamente para solucionar el problema.", "error");
        });

 }

  function ConsultarDetalleConsulta(idConsulta){
     

 	 $.ajax({
            method: "POST",
            url: "Ajax/Aj_Consulta.php",
            data: {
                Requerimiento: "ConsultarDetalleConsultaFactura",
                Consulta:idConsulta
            },
            dataType: 'JSON',
        }).done(function(respuesta) {
            if (respuesta[0] == false) {
                swal("Esculapio!", "OCURRIO UN ERROR.", "error");
                return;
            }
            
       $.each(respuesta, function(i, value) {
         	 
             var id = '';
             var fila = '';
             var item = '';
             var medico = '';
             var precio = 0;
             var descuento = 0;
             var fecha = 0;
             var turno = 0;
             var subtotal = 0;
             var boton = '<button type="submit" id="EliminarItemNN" atendido="'+value[4]+'" idconsultaitem="'+value[0]+'" class="btn btn-danger"><i class="fa fa-trash-o" aria-hidden="true"></i></button>';
             var orden = 1;
                precio = value[6];
                descuento = value[7];
                subtotal = value[8];
                fecha = value[5];

                var now = new Date(value[5]);
                var day = ("0" + now.getDate()).slice(-2);
                var month = ("0" + (now.getMonth() + 1)).slice(-2);
                var today = now.getFullYear()+"-"+(month)+"-"+(day) ;

                //fecha = '<input type="date" name="" value="'+today+'">';//value 5
                $("#BuscarPaciente").parent().fadeOut(0);
                turno = value[9];
                medico= '<span id = "' + value[3] + '">' + value[20]+" "+value[21] + '</span>';

            if(value[2]!=null){
                var especialidad = CargarEspecialidadItem(value[2]);
                var imagen = "imagenes/doctor.png";
                if(especialidad[1]==13){
                    imagen = "imagenes/diente.png";
                }
                if(especialidad[1]==14){
                    imagen = "imagenes/heart.png";
                }
    			id='<span especialidad="'+especialidad[0]+'" procedimiento="' + value[2] + '" ><img src="'+imagen+'" /></span>';
                item='<span especialidad="'+especialidad[2]+'">'+CargarItemId(value[2],"procedimiento")+'</span>';
                //item = CargarItemId(value[2],"procedimiento");

          	}
            if(value[10]!=null){

                id='<span laboratorio="' + value[10] + '" ><img src="imagenes/laboratorio.png" /></span>';
                item = CargarItemId(value[10],"procedimiento_laboratorio");
                orden=2;

            }
            if(value[11]!=null){

                id='<span procedimientorx="' + value[11] + '" ><img src="imagenes/rdx.png" /></span>';
                item = CargarItemId(value[11],"procedimiento_rx");
                orden=3;

            }
            if(value[12]!=null){

                id='<span procedimientoeco="' + value[12] + '" ><img src="imagenes/ecoo.png" /></span>';
                item = CargarItemId(value[12],"procedimiento_eco");
                orden=4;

            }
            if(value[13]!=null){

                id='<span procedimientotac="' + value[13] + '" ><img src="imagenes/tomo.png" /></span>';
                item = CargarItemId(value[13],"procedimiento_tomo");
                orden=5;

            }

            var campos = [id, item, medico, fecha, turno,parseFloat(precio).toFixed(2), descuento, "$ " + parseFloat(subtotal).toFixed(2), boton,orden];
            tableDetalle.row.add(campos).draw(true);
       
        });
        CalcularTotalConsulta();

        }).fail(function(jqXHR, textStatus, errorThrown) {
            swal("Esculapio!", "Ocurrio un error consulte con la administracion..!  " + errorThrown + " Se cargara la pantalla nuevamente para solucionar el problema.", "error");
        });

 }

 function CargarItemId(id,tabla){

    var nombre = '';

        $.ajax({
            async:false,
            method: "POST",
            url: "Ajax/Aj_Consulta.php",
            data: {
                Requerimiento: "CargarItemId",
                Tabla:tabla,
                Id:id
            },
            dataType: 'JSON',
        }).done(function(respuesta) {
            if (respuesta[0] == false) {
                swal("Esculapio!", "OCURRIO UN ERROR.", "error");
                return;
            }
            
           $.each(respuesta, function(i, value) {
                 
                nombre = value[0];            
           });


        }).fail(function(jqXHR, textStatus, errorThrown) {
            swal("Esculapio!", "Ocurrio un error consulte con la administracion..!  " + errorThrown + " Se cargara la pantalla nuevamente para solucionar el problema.", "error");
        });

    return nombre;    
 }
 function CargarEspecialidadItem(id){

    var especialidad = null;

        $.ajax({
            async:false,
            method: "POST",
            url: "Ajax/Aj_Consulta.php",
            data: {
                Requerimiento: "CargarEspecialidadItem",                
                Id:id
            },
            dataType: 'JSON',
        }).done(function(respuesta) {
            if (respuesta[0] == false) {
                swal("Esculapio!", "OCURRIO UN ERROR.", "error");
                return;
            }
            
           $.each(respuesta, function(i, value) {
                 
                especialidad = [value[0],value[1],value[2]];            
           });


        }).fail(function(jqXHR, textStatus, errorThrown) {
            console.log(errorThrown)
        });

    return especialidad;    
 }

  function CargarNotasCredito(idConsulta){

    var especialidad = "NC ";

        $.ajax({
            async:false,
            method: "POST",
            url: "Ajax/Aj_Consulta.php",
            data: {
                Requerimiento: "CargarNotasCredito",
                Id:idConsulta
            },
            dataType: 'JSON',
        }).done(function(respuesta) {
            if (respuesta[0] == false) {
                swal("Esculapio!", "OCURRIO UN ERROR.", "error");
                return;
            }
            
           $.each(respuesta, function(i, value) {
                 
                especialidad +=value[0]+";";            
           });


        }).fail(function(jqXHR, textStatus, errorThrown) {
            swal("Esculapio!", "Ocurrio un error consulte con la administracion..!  " + errorThrown + " Se cargara la pantalla nuevamente para solucionar el problema.", "error");
        });

    return especialidad;    
 }

 function PintarItemNc() {
     
 }

/*/*********************************************************************************************************************/
/*/*********************************************************************************************************************/
/*/*********************************************************************************************************************/


function CargarOrdenConsulta(numero){
    
    $.ajax({
        
        method: "POST",
        url: "Ajax/Aj_Orden.php",
        data: {
            Requerimiento: "CargarOrdenConsulta",
            Id:numero
        },
        dataType: 'JSON',
    }).done(function(respuesta) {


        if (respuesta[0] == false) {
            swal("Esculapio!", "OCURRIO UN ERROR.", "error");
            return;
        }
        
        $.each(respuesta, function(i, value) {
                 

                CargarDetalleOrden(value[0]);      
                idConsultaAnterior = value[9];
                idOrden=value[0];
                $('.body').find('span#cedula').text(value[4]);
                $('.body').find('strong#nombreCompleto').text(value[3]+" "+value[2]);
                $('.body').find('strong#nombreCompleto').attr('fecha', value[8]);
                $('.body').find('span#direccion').text(value[5]);
                $('.body').find('span#telefono').text(value[6]);
                $('.body').find('span#email').text(value[7]);    
                $('.body').find('strong#nombreCompleto').attr('idPaciente', value[1]);

                $('.body').find('span#cedulaCliente').text("9999999999");
                $('.body').find('strong#nombreCompletoCliente').text("CONSUMIDOR FINAL");
                $('.body').find('strong#nombreCompletoCliente').attr('idCliente', '1');
                $('.body').find('span#direccionCliente').text("----------------");
                $('.body').find('span#telefonoCliente').text("----------------");
                $('.body').find('span#emailCliente').text("-----------------");

                if(!existenItems){
                    swal("Esculapio!", "Esta Orden Ya fue Realizada.", "info");
                    LimpiarConsulta();
                    return;
                }

        });


    });
}

function CargarDetalleOrden(idOrden){
    $.ajax({
        async:false,
        method: "POST",
        url: "Ajax/Aj_Orden.php",
        data: {
            Requerimiento: "CargarDetalleOrden",
            Orden:idOrden
        },
        dataType: 'JSON',
    }).done(function(respuesta) {


        if (respuesta[0] == false) {
            swal("Esculapio!", "OCURRIO UN ERROR.", "error");
            return;
        }
        existenItems=false;
        $.each(respuesta, function(i, value) {
            existenItems=true;
            

            $("#datatableProcedimientoLaboratorioConsulta tbody tr td").find("input[idgrupoprocedimiento="+value[4]+"] ").click();
            $("#datatableProcedimientoRxConsulta tbody tr td").find("input[idprocedimientorx="+value[5]+"] ").click();
            $("#datatableProcedimientoEcoConsulta tbody tr td").find("input[idprocedimientoeco="+value[6]+"] ").click();
            $("#datatableProcedimientoTacConsulta tbody tr td").find("input[idprocedimientotac="+value[7]+"] ").click();

            if(value[4]!=null){
                $("#laboratorioFactura").addClass("parpadea");
            }
            if(value[5]!=null){
                $("#rxfacutura").addClass("parpadea");
            }
            if(value[6]!=null){
                $("#ecoFactura").addClass("parpadea");
            }
            if(value[7]!=null){
                $("#tamoFactura").addClass("parpadea");
            }

        });
    });
}

function LlenarTablaOrdenesFechas() {
     tablaOrden = $('#datatableConsultaOrden').DataTable({
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
                Requerimiento: "LlenarTablaOrdenesFechas"
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
            "targets": [0, 1, 2],
            "orderable": false,
        }]
    });
    tablaOrden.on('key', function(e, datatable, key, cell, originalEvent) {
        if (key == 13) {
            $('#datatableConsultaOrden tbody tr').eq(datatable.row(cell.index().row).index()).find('td').eq(0).dblclick();
        }
    });
    $('#datatableConsultaOrden_filter input').unbind();
    $('#datatableConsultaOrden_filter input').remove();
    $('#datatableConsultaOrden_filter label').remove(); 
    // $('input#apellidoMFiltro').remove();
    $('input#numeroO').bind('keyup', function(e) {
        if (e.keyCode == 13) {
            tablaOrden.column(0).search($('input#numeroO').val()).draw();
            tablaOrden.column(1).search($('input#pacienteO').val()).draw();
        }
        if (e.keyCode == 40) {
            $(this).blur();
            $('#datatableConsultaOrden tbody tr td').eq(0).click();
        }
    });
    $('input#pacienteO').bind('keyup', function(e) {
        if (e.keyCode == 13) {
            tablaOrden.column(0).search($('input#numeroO').val()).draw();
            tablaOrden.column(1).search($('input#pacienteO').val()).draw();
        }
        if (e.keyCode == 40) {
            $(this).blur();
            $('#datatableConsultaOrden tbody tr td').eq(0).click();
        }
    });
}
LlenarTablaOrdenesFechas();

$('.body table#datatableConsultaOrden tbody').on('dblclick', 'tr', function(evt) {
    ClicTablaDetalle=true;
    var fila = $('.body').find("#datatableDetalleFact tbody tr").find("td").eq(0).html();
    var idPaciente = $('#nombreCompleto').attr('idPaciente');
    if(idPaciente!="0"||fila!="No existen datos"){
        swal({
            title: "Esculapio",
            text: "Seguro que desa Reemplazar lo que contiene la factura.?",
            icon: "info",
            buttons: true,
            dangerMode: false,
        }).then((confirma) => {
            if (confirma) {            
                var cerrar = $('.body').find('button.close');
                var numero = $(this).find('td').eq(0).html();
                $(".body div#DatosPaciente").css('visibility', 'visible');
                CargarOrdenConsulta(numero);
                cerrar.click();
            } else {
                
            }
        });
    }else{
        var cerrar = $('.body').find('button.close');
        var numero = $(this).find('td').eq(0).html();
        $(".body div#DatosPaciente").css('visibility', 'visible');
        CargarOrdenConsulta(numero);
        cerrar.click();
    }
    
    //$(this).find('td').focus();
    
});


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                      ANULAR FACTURAS                                            
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

$('.body').on('click', '#AnularConsulta', function(evt) {

        if(anular){
            swal({
                title: "Esculapio",
                text: "Seguro que desa Anular La Factura..?",
                icon: "info",
                buttons: true,
                dangerMode: false,
            }).then((confirma) => {
                if (confirma) {            
                    ActualizarEstadoConsulta(ConsultaCargada,"id_estado","21");
                    swal("Esculapio!", "Factuta Anulada.", "success");
                    LimpiarConsulta();
                } else {
                    
                }
            });
        }

});
function ActualizarEstadoConsulta(idConsulta,tipo,estado){
    $.ajax({
            method: "POST",
            url: "Ajax/Aj_Consulta.php",
            data: {
                Requerimiento: "ActualizarEstadoConsultaOrden",
                Consulta: idConsulta,
                Tipo:tipo,
                Estado:estado,
                NumeroFactura:NumeroConsultaCargada
            },
                dataType: 'JSON',
    });
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////cargar proforma/////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

$('.body').on('click', '#cargaProforma', function(evt) {    
    $("#modal-consulta-proforma").modal();
});
var tablaProformas = null;
var anularpf = false;
function LlenartablaProformasConFechas() {
     tablaProformas = $('#datatableConsultaProforma').DataTable({
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
            url: "Ajax/Aj_Proforma.php",
            data: {
                Requerimiento: "LlenartablaProformasConFechas"
                
            },
            type: "POST"
        },
        scrollY: 400,
        scrollX: true,
        keys: true,
        scroller: {
            loadingIndicator: true
        },
        "columnDefs": [{
            "targets": [0, 1, 2, 3, 4, 5, 6],
            "orderable": false,
        },
        {
            "targets": [6],
            "visible": false,
        }]
    });
    tablaProformas.on('key', function(e, datatable, key, cell, originalEvent) {
        if (key == 13) {
            $('#datatableConsultaProforma tbody tr').eq(datatable.row(cell.index().row).index()).find('td').eq(0).dblclick();
            datatable.cell.blur();
        }
    });
    $('#datatableConsultaProforma_filter input').unbind();
    $('#datatableConsultaProforma_filter input').remove();
    $('#datatableConsultaProforma_filter label').remove(); 
    // $('input#apellidoMFiltro').remove();
    $('input#numeroPF').bind('keyup', function(e) {
        if (e.keyCode == 13) {
            tablaProformas.column(0).search($('input#numeroPF').val()).draw();
            tablaProformas.column(1).search($('input#pacientePF').val()).draw();
            tablaProformas.column(2).search($('input#clientePF').val()).draw();
        }
        if (e.keyCode == 40) {
            $(this).blur();
            $('#datatableConsultaProforma tbody tr td').eq(0).click();
        }
    });
    $('input#pacientePF').bind('keyup', function(e) {
        if (e.keyCode == 13) {
            tablaProformas.column(0).search($('input#numeroPF').val()).draw();
            tablaProformas.column(1).search($('input#pacientePF').val()).draw();
            tablaProformas.column(2).search($('input#clientePF').val()).draw();
        }
        if (e.keyCode == 40) {
            $(this).blur();
            $('#datatableConsultaProforma tbody tr td').eq(0).click();
        }
    });
    $('input#clientePF').bind('keyup', function(e) {
        if (e.keyCode == 13) {
            tablaProformas.column(0).search($('input#numeroPF').val()).draw();
            tablaProformas.column(1).search($('input#pacientePF').val()).draw();
            tablaProformas.column(2).search($('input#clientePF').val()).draw();
        }
        if (e.keyCode == 40) {
            $(this).blur();
            $('#datatableConsultaProforma tbody tr td').eq(0).click();
        }
    });
}
LlenartablaProformasConFechas();

$('.body table#datatableConsultaProforma tbody').on('dblclick', 'tr', function(evt) {
    var fila = $('.body').find("#datatableDetalleFact tbody tr").find("td").eq(0).html();
    var idPaciente = $('#nombreCompleto').attr('idPaciente');
    var cerrar = $('.body').find('button.close');
    var numero = $(this).find('td').eq(0).html();
    NumeroConsultaCargada = numero;
    CargarProformaConsulta(numero);
    cerrar.click();    
}); 

function CargarProformaConsulta(numero){
    
$.ajax({
        
        method: "POST",
        url: "Ajax/Aj_Proforma.php",
        data: {
            Requerimiento: "CargarProformaConsulta",
            Numero:numero
        },
        dataType: 'JSON',
    }).done(function(respuesta) {


        if (respuesta[0] == false) {
            swal("Esculapio!", "OCURRIO UN ERROR.", "error");
            return;
        }
        var confirma = true;
        $.each(respuesta, function(i, value) {
                 confirma = false;
                 try{tableDetalle.clear().draw();}catch(error){}
                ConsultarDetalleProforma(value[0]);     
                
                $('.body').find('span#cedula').text(value[4]);
                $('.body').find('strong#nombreCompleto').text(value[3]+" "+value[2]);
                $('.body').find('strong#nombreCompleto').attr('fecha', value[8]);
                var edad = calcularEdad($('strong#nombreCompleto').attr("fecha"));
                $('.body').find('span#edad').html(edad);
                $('.body').find('span#direccion').text(value[5]);
                $('.body').find('span#telefono').text(value[6]);
                $('.body').find('span#email').text(value[7]);    
                $('.body').find('strong#nombreCompleto').attr('idPaciente', value[1]);
                $('.body').find('span#totalCancelarConsulta').html("TOTAL A CANCELAR : $ "+ parseFloat(value[12]).toFixed(2));
                $('.body').find('span#totalDescuentoConsulta').html("TOTAL DESCUENTO : $ "+ parseFloat(value[13]).toFixed(2));
                $('#SecuenciaFacturaConsulta').html("FACTURA #: "+numero);

                cambios = parseFloat(value[23]);
                ConsultaCargada = value[0];
                anularpf = true;
                CargadaEstadoSri=value[19];      
                emisionCargada = value[20];
                autorizacionCargada = value[21];
                clavesri = autorizacionCargada;
                
                if(value[10]==1){
                        $('.body').find('span#cedulaCliente').text("9999999999");
                        $('.body').find('strong#nombreCompletoCliente').text("CONSUMIDOR FINAL");
                        $('.body').find('strong#nombreCompletoCliente').attr('idCliente', '1');
                        $('.body').find('span#direccionCliente').text("----------------");
                        $('.body').find('span#telefonoCliente').text("----------------");
                        $('.body').find('span#emailCliente').text("-----------------");



                }
                if(value[10]>1){

                    CargarClientePorIdConsulta(value[10]);  
                            
                }
                $(".body div#DatosPaciente").css('visibility', 'visible');
                if(value[11]=="S"){                    
                    $("a#NoCon").click();
                }
        });
        
        if(confirma){
                LimpiarConsulta();
                swal("Esculapio!", "No Existe La Proforma.", "warning");
        }else{
            $('button#CobrarProforma').fadeOut(0);
            $('button#ReimprimirProforma').fadeIn(0);
            //alert($('button#ReimprimirProforma').html());
        }
    });
}


  function ConsultarDetalleProforma(idConsulta){
     

     $.ajax({
            method: "POST",
            url: "Ajax/Aj_Proforma.php",
            data: {
                Requerimiento: "ConsultarDetalleProforma",
                Consulta:idConsulta
            },
            dataType: 'JSON',
        }).done(function(respuesta) {
            if (respuesta[0] == false) {
                swal("Esculapio!", "OCURRIO UN ERROR.", "error");
                return;
            }
            
       $.each(respuesta, function(i, value) {
             
             var id = '';
             var fila = '';
             var item = '';
             var medico = '';
             var precio = 0;
             var descuento = 0;
             var fecha = 0;
             var turno = 0;
             var subtotal = 0;
             var boton = '<button type="submit" id="EliminarItemNN" atendido="'+value[4]+'" idconsultaitem="'+value[0]+'" class="btn btn-danger"><i class="fa fa-trash-o" aria-hidden="true"></i></button>';
             var orden = 1;
                precio = value[6];
                descuento = value[7];
                subtotal = value[8];
                fecha = value[5];

                var now = new Date(value[5]);
                var day = ("0" + now.getDate()).slice(-2);
                var month = ("0" + (now.getMonth() + 1)).slice(-2);
                var today = now.getFullYear()+"-"+(month)+"-"+(day) ;

                //fecha = '<input type="date" name="" value="'+today+'">';//value 5
                $("#BuscarPaciente").parent().fadeOut(0);
                turno = value[9];
                medico= '<span id = "' + value[3] + '">' + value[20]+" "+value[21] + '</span>';

            if(value[2]!=null){
                var especialidad = CargarEspecialidadItem(value[2]);
                var imagen = "imagenes/doctor.png";
                if(especialidad[1]==13){
                    imagen = "imagenes/diente.png";
                }
                if(especialidad[1]==14){
                    imagen = "imagenes/heart.png";
                }
                id='<span especialidad="'+especialidad[0]+'" procedimiento="' + value[2] + '" ><img src="'+imagen+'" /></span>';
                item='<span especialidad="'+especialidad[2]+'">'+CargarItemId(value[2],"procedimiento")+'</span>';
                //item = CargarItemId(value[2],"procedimiento");

            }
            if(value[10]!=null){

                id='<span laboratorio="' + value[10] + '" ><img src="imagenes/laboratorio.png" /></span>';
                item = CargarItemId(value[10],"procedimiento_laboratorio");
                orden=2;

            }
            if(value[11]!=null){

                id='<span procedimientorx="' + value[11] + '" ><img src="imagenes/rdx.png" /></span>';
                item = CargarItemId(value[11],"procedimiento_rx");
                orden=3;

            }
            if(value[12]!=null){

                id='<span procedimientoeco="' + value[12] + '" ><img src="imagenes/ecoo.png" /></span>';
                item = CargarItemId(value[12],"procedimiento_eco");
                orden=4;

            }
            if(value[13]!=null){

                id='<span procedimientotac="' + value[13] + '" ><img src="imagenes/tomo.png" /></span>';
                item = CargarItemId(value[13],"procedimiento_tomo");
                orden=5;

            }

            var campos = [id, item, medico, fecha, turno,parseFloat(precio).toFixed(2), descuento, "$ " + parseFloat(subtotal).toFixed(2), boton,orden];
            tableDetalle.row.add(campos).draw(true);
       
        });
        CalcularTotalConsulta();

        }).fail(function(jqXHR, textStatus, errorThrown) {
            swal("Esculapio!", "Ocurrio un error consulte con la administracion..!  " + errorThrown + " Se cargara la pantalla nuevamente para solucionar el problema.", "error");
        });

 }