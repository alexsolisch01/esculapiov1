var ConsultaCargada = 0;
var tablaProformas = null;
var anularpf = false;
var NumeroConsultaCargada ="";
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
                
                $('button#AnularProforma').attr("disabled",false);

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
                swal("Esculapio!", "No Existe La Proforma.", "warning");
        }else{
            $('button#CobrarProforma').fadeOut(0);
            $('button#ReimprimirProforma').fadeIn(0);
            //alert($('button#ReimprimirProforma').html());
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



////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                      anularpf FACTURAS                                            
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

$('.body').on('click', '#AnularProforma', function(evt) {

        if(anularpf){
            swal({
                title: "Esculapio",
                text: "Seguro que desa anularpf La Factura..?",
                icon: "info",
                buttons: true,
                dangerMode: false,
            }).then((confirma) => {
                if (confirma) {            
                    ActualizarEstadoProforma(ConsultaCargada,"id_estado","21");
                    swal("Esculapio!", "Proforma Anulada.", "success");
                    LimpiarConsulta();
                } else {
                    
                }
            });
        }

});
function ActualizarEstadoProforma(idConsulta,tipo,estado){
    $.ajax({
            method: "POST",
            url: "Ajax/Aj_Proforma.php",
            data: {
                Requerimiento: "ActualizarEstadoProformaOrden",
                Consulta: idConsulta,
                Tipo:tipo,
                Estado:estado,
                NumeroFactura:NumeroConsultaCargada
            },
                dataType: 'JSON',
    });
}