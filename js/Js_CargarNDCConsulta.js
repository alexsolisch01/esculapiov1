
var existenItems=false;
var primeravez1 = false;
var primeravezOrden = false;
var tablaFacturas = null;
var tablaOrden = null;
var anular = false;
var ConsultaCargada=0;
var emisionCargada=0;
var autorizacionCargada=0;
var NumeroConsultaCargada="";


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
                Requerimiento: "LlenarTablaFacturasnc"
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
LlenarTablaFacturas();


$('.body table#datatableConsultaFactura tbody').on('dblclick', 'tr', function(evt) {

    if($('#nombreCompleto').attr('idPaciente')!="0"){
        swal({
            title: "Esculapio",
            text: "Seguro que desea Visualizar esta Factura?",
            icon: "info",
            buttons: true,
            dangerMode: false,
        }).then((confirma) => {
            if (confirma) {            
                var cerrar = $('.body').find('button.close');
                var numero = $(this).find('td').eq(0).html();
                CargarFacturaConsulta(numero);
                cerrar.click();
            } else {
                
            }
        });
    }else{
        var cerrar = $('.body').find('button.close');
        var numero = $(this).find('td').eq(0).html();
        CargarFacturaConsulta(numero);
        cerrar.click();
    }
    
    //$(this).find('td').focus();
    
}); 

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
			    $('.body').find('span#cedula').text(value[4]);
			    $('.body').find('strong#nombreCompleto').text(value[3]+" "+value[2]);
			    $('.body').find('strong#nombreCompleto').attr('fecha', value[8]);
			    $('.body').find('span#direccion').text(value[5]);
			    $('.body').find('span#telefono').text(value[6]);
			    $('.body').find('span#email').text(value[7]);    
			    $('.body').find('strong#nombreCompleto').attr('idPaciente', value[1]);
			    $('.body').find('span#totalCancelarConsulta').html("TOTAL A CANCELAR : $ "+ parseFloat(value[12]).toFixed(2));
			    $('.body').find('span#totalDescuentoConsulta').html("TOTAL DESCUENTO : $ "+ parseFloat(value[13]).toFixed(2));
                $('#SecuenciaFacturaConsulta').html("FACTURA #: "+numero);
                
                if(value[24]>0){
                    $("#cbmTipoIde").val(value[24]);
                }else{
                    $("#cbmTipoIde").val("1");
                }
                ConsultaCargada = value[0];
                anular = true;

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
                Requerimiento: "ConsultarDetalleConsulta",
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
             var atendido = value[4];
             var boton = '<button type="submit" id="EliminarItemConsulta" atendido="'+value[4]+'" idconsultaitem="'+value[0]+'" class="btn btn-danger"><i class="fa fa-trash-o" aria-hidden="true"></i></button>';
             var orden = 1;
                precio = value[6];
                descuento = value[7];
                subtotal = value[8];
                fecha = value[5];
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

                id='<span laboratorio="' + value[10] + '" ><img src="imagenes/laboratorio.png" /> </span>';
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

            if(atendido==19 || atendido == 12
                || atendido == 13 || atendido == 14 || atendido == 15 ){
                    
            }else{
                var campos = [id, item, medico, fecha, turno,parseFloat(precio).toFixed(2), descuento, "$ " + parseFloat(subtotal).toFixed(2), boton,orden];
                tableDetalle.row.add(campos).draw(true);
            }
       
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
            url: "Ajax/Aj_ConsultaNC.php",
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
            url: "Ajax/Aj_ConsultaNC.php",
            data: {
                Requerimiento: "CargarEspecialidadItem",
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
                 
                especialidad = [value[0],value[1],value[2]];            
           });


        }).fail(function(jqXHR, textStatus, errorThrown) {
            swal("Esculapio!", "Ocurrio un error consulte con la administracion..!  " + errorThrown + " Se cargara la pantalla nuevamente para solucionar el problema.", "error");
        });

    return especialidad;    
 }

/*/*********************************************************************************************************************/
/*/*********************************************************************************************************************/
/*/*********************************************************************************************************************/

var tablaNotasCredito = null;

function LlenarTablaNc() {
     tablaNotasCredito = $('#datatableNotaCredito').DataTable({
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
            url: "Ajax/Aj_ConsultaNC.php",
            data: {
                Requerimiento: "LlenarTablaNc"
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
            "targets": [0, 1, 2,3,4,5,6],
            "orderable": false,
        }]
    });    
}

LlenarTablaNc();


$('.body table#datatableNotaCredito tbody').on('dblclick', 'tr', function(evt) {

    if($('#nombreCompleto').attr('idPaciente')!="0"){
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
                CargarNotaCredito(numero);
                cerrar.click();
            } else {
                
            }
        });
    }else{
        var cerrar = $('.body').find('button.close');
        var numero = $(this).find('td').eq(0).html();
        CargarNotaCredito(numero);
        cerrar.click();
    }
    
    
}); 


function CargarNotaCredito(numero){
    NumeroConsultaCargada = numero;
$.ajax({
        
        method: "POST",
        url: "Ajax/Aj_ConsultaNC.php",
        data: {
            Requerimiento: "CargarNotaCredito",
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
                ConsultarDetalleNc(value[0]);             
                $('.body').find('span#cedula').text(value[4]);
                $('.body').find('strong#nombreCompleto').text(value[3]+" "+value[2]);
                $('.body').find('strong#nombreCompleto').attr('fecha', value[8]);
                $('.body').find('span#direccion').text(value[5]);
                $('.body').find('span#telefono').text(value[6]);
                $('.body').find('span#email').text(value[7]);    
                $('.body').find('strong#nombreCompleto').attr('idPaciente', value[1]);
                $('.body').find('span#totalCancelarConsulta').html("TOTAL A CANCELAR : $ "+ parseFloat(value[12]).toFixed(2));
                $('.body').find('span#totalDescuentoConsulta').html("TOTAL DESCUENTO : $ "+ parseFloat(value[13]).toFixed(2));
                $('#SecuenciaFacturaConsulta').html("FACTURA #: "+numero);
                

                ConsultaCargada = value[0];
                anular = true;

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
                clavesri= autorizacionCargada;
                
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

        if(confirma){
                LimpiarConsulta();
                swal("Esculapio!", "No Existe La Factura.", "warning");
        }else{
            $('button#CobrarConsultaCobrar').fadeOut(0);
            $('button#ReimprimirNc').fadeIn(0);
            
        }
    });
}

function ConsultarDetalleNc(idConsulta){
     

     $.ajax({
            method: "POST",
            url: "Ajax/Aj_ConsultaNC.php",
            data: {
                Requerimiento: "ConsultarDetalleNc",
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
             var atendido = value[4];
             var boton = '<button type="submit" id="EliminarItemConsulta" atendido="'+value[4]+'" idconsultaitem="'+value[0]+'" class="btn btn-danger"><i class="fa fa-trash-o" aria-hidden="true"></i></button>';
             var orden = 1;
                precio = value[6];
                descuento = value[7];
                subtotal = value[8];
                fecha = value[5];
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

                id='<span laboratorio="' + value[10] + '" ><img src="imagenes/laboratorio.png" /> </span>';
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

            if(atendido==19 || atendido==6 || atendido == 8 || atendido == 10 || atendido == 12
                || atendido == 13 || atendido == 14 || atendido == 15 ){
                    
            }else{
                var campos = [id, item, medico, fecha, turno,parseFloat(precio).toFixed(2), descuento, "$ " + parseFloat(subtotal).toFixed(2), boton,orden];
                tableDetalle.row.add(campos).draw(true);
            }
       
        });
        CalcularTotalConsulta();

        }).fail(function(jqXHR, textStatus, errorThrown) {
            swal("Esculapio!", "Ocurrio un error consulte con la administracion..!  " + errorThrown + " Se cargara la pantalla nuevamente para solucionar el problema.", "error");
        });

 }

 $('.body').on('click', '#ReimprimirNc', function(evt) {
    
    var edad = calcularEdad($('strong#nombreCompleto').attr("fecha"));
    var numero = NumeroConsultaCargada;
    var paciente = $('strong#nombreCompleto').attr('idPaciente');

    var vector = $('.body').find("#datatableDetalleFact tbody tr");
    var productos =[];
    var productos_lab =[];
    var productos_rx =[];
    var productos_eco =[];
    var productos_tac =[];
    var ac = 0;
    var b = 0;
    var c = 0;
    var d = 0;
    var e = 0;
    $.each(vector, function(a) {
        var item = $(this).find('td').eq(1).find('span').html();
        var especialidad = $(this).find('td').eq(1).find('span').attr('especialidad');
        var procedimiento = $(this).find('td').eq(0).find('span').attr('procedimiento');
        var laboratorio = $(this).find('td').eq(0).find('span').attr('laboratorio');
        var procedimientorx = $(this).find('td').eq(0).find('span').attr('procedimientorx');
        var procedimientoeco = $(this).find('td').eq(0).find('span').attr('procedimientoeco');
        var procedimientotac = $(this).find('td').eq(0).find('span').attr('procedimientotac');
        var empleado = $(this).find('td').eq(2).find('span').attr('id');
        var medico = $(this).find('td').eq(2).find('span').html();
        var fecha = $(this).find('td').eq(3).html();
        var precio = $(this).find('td').eq(5).html();
        var descuento = $(this).find('td').eq(6).find('input').val();
        if(descuento===undefined){
            descuento = $(this).find('td').eq(6).html();
        }
        var subtotal = $(this).find('td').eq(7).html().replace('$', '');
        var turno = $(this).find('td').eq(4).html();

        //var lineaDetalle = item+"\n"+turno+"\n"+fecha+"---"+precio+"---"+descuento+"---"+subtotal;
        if(procedimiento!=undefined){
            var lineaDetalle = [item,turno,fecha,precio,descuento,subtotal,especialidad,medico,procedimiento];
            productos[ac]=lineaDetalle;
            ac++;
        }
        if(laboratorio!=undefined){
            var itemLab = $(this).find('td').eq(1).html();
            var lineaDetalleLab = [itemLab,fecha,precio,descuento,subtotal,laboratorio];
            productos_lab[b]=lineaDetalleLab;
            b++;
        }
        if(procedimientorx!=undefined){
            var itemRx = $(this).find('td').eq(1).html();                    
            var lineaDetalleRx = [itemRx,fecha,precio,descuento,subtotal,procedimientorx];
            productos_rx[c]=lineaDetalleRx;
            c++;
        }
        if(procedimientoeco!=undefined){
            var itemEco = $(this).find('td').eq(1).html();  
            var lineaDetalleEco = [itemEco,fecha,precio,descuento,subtotal,procedimientoeco];
            productos_eco[d]=lineaDetalleEco;
            d++;
        }
        if(procedimientotac!=undefined){
            var itemTac = $(this).find('td').eq(1).html();  
            var lineaDetalleTac = [itemTac,fecha,precio,descuento,subtotal,procedimientotac];
            productos_tac[e]=lineaDetalleTac;
            e++;
        }       
    });
    //ReImprimirTicKetConsulta(ConsultaCargada, numero, paciente, edad,emisionCargada,autorizacionCargada,JSON.stringify(productos),JSON.stringify(productos_lab),JSON.stringify(productos_rx),JSON.stringify(productos_eco),JSON.stringify(productos_tac));
    printTextAreaMovimiento(numero,productos,productos_lab,productos_rx,productos_eco,productos_tac,"reimpre");
    LimpiarConsulta();
 }); 

 function ReImprimirTicKetConsulta(idConsulta, numero, hc, edad,emision,autorizacion,productos,productos_lab,productos_rx,productos_eco,productos_tac) {
    
    $.ajax({        
        method: "POST",
        url: "Controladores/Con_Impresion.php",
        data: {
            Requerimiento: "ReimprimirNotaCredito",
            Consulta: idConsulta,
            Numero: NumeroConsultaCargada,
            Cliente: $('strong#nombreCompletoCliente').html(),
            Cedula: $('span#cedulaCliente').html(),
            DireccionC: $('span#direccionCliente').html(),
            TelefonoC: $('span#telefonoCliente').html(),
            Correo: $('span#emailCliente').html(),
            HC: hc,
            Edad: edad,
            Emision: emision,
            Autorizacion: autorizacion,
            Observacion: " ",
            DesctoTotal: $('span#totalDescuentoConsulta').html().replace("TOTAL DESCUENTO : $ ", ""),
            Item:$('span#totalItemsConsulta').html().replace("TOTAL DE ITEMS : ", ""),
            Subtotal: $('span#totalCancelarConsulta').html().replace("TOTAL A CANCELAR : $ ", ""),
            Productos:productos,
            ProductosLab:productos_lab,
            ProductosRx:productos_rx,
            ProductosEco:productos_eco,
            ProductosTac:productos_tac,
            Paciente: $('strong#nombreCompleto').html(),
            Recibido: 0,
            Cambio: 0
            
        },
        dataType: 'JSON',
    }).done(function(respuesta) {LimpiarConsulta();}).fail(function(jqXHR, textStatus, errorThrown) {
        LimpiarConsulta();
        //console.log(errorThrown);
        //swal("Esculapio!", "Ocurrio un error consulte con la administracion..!  " + errorThrown + " Se cargara la pantalla nuevamente para solucionar el problema.", "error");
    });
}