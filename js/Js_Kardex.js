var tableModalKardex= null;
var id = [];

var tablaDetalle = $('#datatableDetalleFactFarmacia2').DataTable({
            'paging': false,
            'lengthChange': false,
            'searching': false,
            'ordering': false,
            'info': true,
            'autoWidth': true,
            scrollY: 200,
            scrollX: true,
            "columnDefs": [{
                "targets": [11,12],
                "visible": false,
                "searchable": false
            }]
        });  

var tablaKardex = $('#datatableDetallekardex').DataTable({
            'paging': false,
            'lengthChange': false,
            'searching': false,            
            'info': true,
            'autoWidth': false,
            scrollY: 200,
            scrollX: true,
            select: {
                style: 'single'
              },
            buttons: [{
                extend: 'print',
                text: 'Imprimir',
                id: 'imprimir',
                title:'',
                customize: function(win) {
                    $(win.document.body).css('font-size', '10pt')
                    .prepend('<div style="width:100%; text-align: center; border: 2px solid black;"><label style="font-weight:bold; font-size: small; text-align: center;">KARDEX DEL PRODUCTO: '+$('.body').find('h4#producto').text()+'</label><br></div>'+
                        '<div style="position: absolute; width:100%;"><label style="font-weight:bold; font-size: small;">FECHA DESDE: '+$('.body').find('input#fecha_Desde').val()+'</label><br><label style="font-weight:bold; font-size: small;">FECHA HASTA: '+$('.body').find('input#fecha_Hasta').val()+'</label></div><br>');
                    $(win.document.body).find('table')
                        .addClass( 'compact' )
                        .css('font-size', 'inherit', 'margin-top', '10em');
                }
            }],
            "ordering": false,
            createdRow: function(row, data, dataIndex){
                                if(data[2] === ""){
                                    $('td:eq(0)', row).attr('colspan', 13);
                                    $('td:eq(1)', row).css('display', 'none');
                                    $('td:eq(2)', row).css('display', 'none');
                                    $('td:eq(3)', row).css('display', 'none');
                                    $('td:eq(4)', row).css('display', 'none');
                                    $('td:eq(5)', row).css('display', 'none');
                                    $('td:eq(6)', row).css('display', 'none');
                                    $('td:eq(7)', row).css('display', 'none');
                                    $('td:eq(8)', row).css('display', 'none');
                                    $('td:eq(9)', row).css('display', 'none');
                                    $('td:eq(10)', row).css('display', 'none');
                                    $('td:eq(11)', row).css('display', 'none');
                                    $('td:eq(0)', row).attr('align', 'center');
                                    this.api().cell($('td:eq(0)', row)).data(producto);
                                }
                            }
        });


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
$('.body div#VerProductosKardex').on('click', 'button.CargarKardex', function(evt) {
    var seleccionados = $("div#VerProductosKardex").find('button.btn-success'); 
    if(seleccionados.length==2){
        $(seleccionados[1]).addClass("btn-default").removeClass("btn-success");  
    }

    if($(this).hasClass("btn-default")){
        $(this).removeClass("btn-default").addClass("btn-success");
    }else{
        $(this).addClass("btn-default").removeClass("btn-success");    
    }
    
    id = [];
    seleccionados = $("div#VerProductosKardex").find('button.btn-success'); 

    
    
        var productos = $("div#VerProductosKardex").find('button');
        
        var indice = 0;
        if(seleccionados.length==1){
            var minimo = $(seleccionados[0]).index();
            var maximo = $(seleccionados[0]).index();
        }else{
            var minimo = $(seleccionados[0]).index();
            var maximo = $(seleccionados[1]).index();    
        }
        $.each(productos, function(i, value) {
            if($(value).index()>=minimo && $(value).index()<=maximo){

                id[indice]=$(value).attr("id");
                indice++;

            }
            
        });
    

//    id = $(this).attr("id");
    $('h4#producto').html($(this).html());
    $('input#NombreInventario').val($(this).html());    

});

var producto = "";
$('.body').on('click', 'button#Consultarkardex', function(evt) {
    

    var fechaDesde = $('input#fecha_Desde').val();
    var fechaHasta = $('input#fecha_Hasta').val();

     $.ajax({
        
        method: "POST",
        url: "Ajax/Aj_ManteBodega.php",
        data: {
           Requerimiento: "CargarKardex",
           Inventario:id.toString(),
           FechaDesde: fechaDesde,
           FechaHasta: fechaHasta
        },
        dataType: 'JSON',
    }).done(function(respuesta) {

        if (respuesta[0] == false) {
            swal("Esculapio!", "OCURRIO UN ERROR.", "error");
            return;
        }
         
        tablaKardex.clear();

        $.each(respuesta, function(i, value) {
            var dataSet1 = [];
            var dataSet2 = [];
            if(producto!=value[12]){
                producto=value[12];
                dataSet1 = [producto,"","","","","","","","","","",""];
                tablaKardex.row.add(dataSet1);
            }            
            dataSet2 = [respuesta[i][0],
                        respuesta[i][1],
                        '<span idMovimiento='+respuesta[i][13]+'>'+respuesta[i][2]+'</span>',

                        (isNaN(parseFloat(respuesta[i][3]))) ? "" : parseFloat(respuesta[i][3]),
                        (isNaN(parseFloat(respuesta[i][4]))) ? "" : parseFloat(respuesta[i][4]).toFixed(2),
                        (isNaN(parseFloat(respuesta[i][5]))) ? "" : parseFloat(respuesta[i][5]).toFixed(2),

                        (isNaN(parseFloat(respuesta[i][6]))) ? "" : parseFloat(respuesta[i][6]),
                        (isNaN(parseFloat(respuesta[i][7]))) ? "" : parseFloat(respuesta[i][7]).toFixed(2),
                        (isNaN(parseFloat(respuesta[i][8]))) ? "" : parseFloat(respuesta[i][8]).toFixed(2),

                        (isNaN(parseFloat(respuesta[i][9]))) ? "" : parseFloat(respuesta[i][9]),
                        (isNaN(parseFloat(respuesta[i][10]))) ? "" : parseFloat(respuesta[i][10]).toFixed(2),
                        (isNaN(parseFloat(respuesta[i][11]))) ? "" : parseFloat(respuesta[i][11]).toFixed(2)];

            tablaKardex.row.add(dataSet2);
         });
        tablaKardex.draw(false);
     });  
});

$('input#NombreInventario').bind('keyup', function(e) {

        if (e.keyCode == 40) {
            $(this).blur();
            $('#VerProductosKardex button').eq(0).focus();
            return;
        }

        $("div#VerProductosKardex").empty();
       
        $.ajax({
            //async: false,
            method: "POST",
            url: "Ajax/Aj_ManteBodega.php",
            data: {
                Requerimiento: "CargarInventarioKardex",
                Nombre: $(this).val()
            },
            dataType: 'JSON',
        }).done(function(respuesta) {

            $.each(respuesta, function(i, value) {
                $("div#VerProductosKardex").append('<button title="'+value[1]+'" type="button" id="'+value[0]+'" class="btn btn-default btn-sm col-md-12 CargarKardex">'+value[1]+'</button>');
            });            
        }).fail(function(jqXHR, textStatus, errorThrown) {
            swal("Esculapio!", "Ocurrio un error consulte con la administracion..!  " + errorThrown + " Se cargara la pantalla nuevamente para solucionar el problema.", "error");
        });

});
$('.body div#VerProductosKardex').on('keyup', 'button.CargarKardex', function(evt) {
    
    if (evt.keyCode == 40) {
            $(this).blur();
            
            $('#VerProductosKardex button').eq($(this).index()+1).focus();
            return;
    }
    if (evt.keyCode == 38) {
            $(this).blur();
            
            $('#VerProductosKardex button').eq($(this).index()-1).focus();
            return;
    }
});

$('.body').on('click', 'button#Imprimirkardex', function(evt) {
    printTextArea();
});


function printTextArea() {
    var cuerpo = '';
    var cuerpo2 = '';
    
    if($('.body').find("#datatableDetallekardex tbody tr").find('td').html()!="No existen datos"){
        cuerpo2 += '<div>'
        +'<table  style="width: 100%"><thead><tr><th style="border-bottom: 1px solid #333; border-top: 1px solid #333; #333; border-left: 1px solid #333;" rowspan="2">FECHA</th><th style="border-bottom: 1px solid #333; border-top: 1px solid #333;" rowspan="2">MOV</th><th style="border-bottom: 1px solid #333; border-top: 1px solid #333;" rowspan="2">PROVEEDOR</th><th style="border-bottom: 1px solid #333; border-top: 1px solid #333;" rowspan="2">FACTURA</th><th style="border-bottom: 1px solid #333; border-top: 1px solid #333;" rowspan="2">CONCEPTO</th><th style="border-bottom: 1px solid #333; border-top: 1px solid #333;" rowspan="2">COSTO NUEVO</th><th style="border-bottom: 1px solid #333; border-top: 1px solid #333;" rowspan="2">COSTO PROMEDIO</th><th style="border: 1px solid #333;" colspan="3">CANTIDADES</th><th style="border: 1px solid #333;" colspan="3">COSTOS</th></tr><tr><th style="border: 1px solid #333;">INGRESO</th><th style="border: 1px solid #333;">EGRESO</th><th style="border: 1px solid #333;">SALDO</th><th style="border: 1px solid #333;">INGRESO</th><th style="border: 1px solid #333;">EGRESO</th><th style="border: 1px solid #333;">SALDO</th></tr></thead><tbody>';
        var vector = $('.body').find("#datatableDetallekardex tbody tr ");
        var selec = '';
        var count = 0;
        $.each(vector, function(a) {
            if($(this).find('td').html()=="No existen datos"){
                return false ;
            }
            count++; 
            var fecha = $(this).find('td').eq(0).html();
            var movimiento = $(this).find('td').eq(1).html();
            var proveedor = $(this).find('td').eq(2).html();
            var factura = $(this).find('td').eq(3).html();
            var concepto = $(this).find('td').eq(4).html();
            var coston = $(this).find('td').eq(5).html();
            var costop = $(this).find('td').eq(6).html();
            var ingresocan = $(this).find('td').eq(7).html();
            var egresocan = $(this).find('td').eq(8).html();
            var saldocan = $(this).find('td').eq(9).html();
            var ingresocos = $(this).find('td').eq(10).html();
            var egresocos = $(this).find('td').eq(11).html();
            var saldocos = $(this).find('td').eq(12).html();
            selec += '<tr><td>'+fecha+'</td><td>'+movimiento+'</td><td>'+proveedor+'</td><td>'+factura+'</td><td>'+concepto+'</td><td style="text-align: right;">'+coston+'</td><td style="text-align: right;">'+costop+'</td><td style="text-align: right;">'+ingresocan+'</td><td style="text-align: right;">'+egresocan+'</td><td style="text-align: right;">'+saldocan+'</td><td style="text-align: right;">'+ingresocos+'</td><td style="text-align: right;">'+egresocos+'</td><td style="text-align: right;">'+saldocos+'</td></tr>';
            
        });
        cuerpo2 += selec+'</tbody></table></div><br>';
    }

    var cabecera = '<div style="position: absolute; width:100%; margin-top: 2em;"><label style="font-weight:bold;">Paciente: </label></div><br>';
    var cabecera2 ='<div style="width:100%;  margin-top: 2em;"><label style="font-weight:bold;">Edad: </label><label style="font-weight:bold; text-align: center; margin-left: 3.5em;">Fecha Emision: </label></div>';
    var cabecera3 ='<div style="width:100%; "><label style="font-weight:bold;">Historia Clinica: </label><label style="font-weight:bold; text-align: center; margin-left: 5em;">Orden: </label><label style="font-weight:bold; text-align: center; margin-left: 3.5em;">Hora: </label><label style="font-weight:bold; text-align: center; margin-left: 3.5em;">Total $: </label></div>';
    var cabecera4 ='<div style="width:100%; "><label style="font-weight:bold;">Historia Clinica: </label><label style="font-weight:bold; text-align: center; margin-left: 5em;">Orden: </label><label style="font-weight:bold; text-align: center; margin-left: 3.5em;">Hora: </label><label style="font-weight:bold; text-align: center; margin-left: 3.5em;">Total $: </label></div>';
    /*+numero+'</label><br>'+
    
        '<label style="font-weight:bold; font-size: small;">BODEGA: '+bodega+'</label><label style="font-weight:bold; font-size: small; text-align: center; margin-left: 14em;">PROVEEDOR: '+proveedor+'</label><br>'+
        '<label style="font-weight:bold; font-size: small;">MOTIVO: '+motivo+'</label><br>'+
        '<label style="font-weight:bold; font-size: small;">OBSERVACIONES: '+observaciones+'</label></div>';*/
    //var datosRegistro ='<div style="position: fixed;bottom: 0;width:100%;"><label style="font-weight:bold; font-size: small;">USUARIO REGISTRO  </label><label style="float: right;font-weight:bold; font-size: small;" >FECHA REGISTRO </label><br><label style="font-weight:bold; font-size: small;">MEDICO VALIDO  </label><label style="float: right;font-weight:bold; font-size: small;">FECHA VALIDO </label><br></div>';
    childWindow = window.open('','_blank');
    
       // childWindow.document.open();
    childWindow.document.write('<html><head></head><body>');
    //childWindow.document.write($('#DatosPaciente').html());
    childWindow.document.write('<div style="margin-top:20px;"></div>');
    
    if($('.body').find("#datatableDetallekardex tbody tr").find('td').html()!="No existen datos"){
        //childWindow.document.write('<div style="height:100%">');
        childWindow.document.write('<div style="margin-top:20px;" ></div>');
        childWindow.document.write(cabecera);
        childWindow.document.write(cabecera2);
        childWindow.document.write(cabecera4);
        childWindow.document.write(cuerpo2);
        childWindow.document.write('</div>');
    }
    childWindow.document.write('</body><script type="text/javascript"> window.print();</script></html>');
    //childWindow.print();
    childWindow.document.close();
    childWindow.close();
}


$('.body table#datatableDetallekardex tbody').on('dblclick', 'tr', function(evt) {
    CargarMovimientoConsulta($(this).find('td').eq(2).find('span').attr('idMovimiento'));
    tablaDetalle.clear().draw();
    CargarMovimientoItems($(this).find('td').eq(2).find('span').attr('idMovimiento'));
    $('#modal-bdkardex').modal();
    setTimeout(function(){
        tablaDetalle.columns.adjust().draw();        
    },200);                
    
});

function CargarMovimientoConsulta(id){
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
function CargarMovimientoItems(idMovimiento){
    
    try{
        $.ajax({
            async:false,
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
               var id=value[1];
               var item=value[10];
               var presentacion=value[3];
               var cantidad = '<input style="width:80px;" type="number" disabled step=".01" value="'+value[4]+'" class="form-control" id="CantidadDetalleFact">';
               var precio = '<input style="width:80px;" type="number" disabled step=".01" value="'+value[5]+'" class="form-control" id="PrecioProducto" >';
               var precioCaja = '<input style="width:80px;" type="number" disabled step=".01" value="'+parseFloat(value[9]).toFixed(2)+'" class="form-control" id="PrecioCajaProducto" >';
               var subtotal="$ "+value[6];
               var iva=value[11];
               var descuento = '<input style="width:80px;" type="number" disabled step=".01" value="'+value[7]+'" class="form-control" id="DescuentoDetalle">';
               var total="$ "+value[8];
               var campos = [id, item, presentacion, cantidad,precio,precioCaja,subtotal,iva, descuento,total,"","",value[12]];
               tablaDetalle.row.add(campos);
            });
            tablaDetalle.draw();   
            CalcularTotalMovimientos()   
        });
    }catch(error){
        console.log(error)
    }
}
function CalcularTotalMovimientos() {
    var vector = $('.body').find("#datatableDetalleFactFarmacia2 tbody tr");
    var subtotal = 0;
    var descuento = 0;
    var iva = 0;
    var total = 0;

    $.each(vector, function(a) {

        try{
            var st = $(this).find("input#PrecioProducto").val() * $(this).find('input#CantidadDetalleFact').val();

            var ivaf=$(this).find('td').eq(7).html();
            var descf = $(this).find("input#DescuentoDetalle").val();
            if(descf<1 || descf==""){
                descf=0;
             }
             
            $(this).find('td').eq(6).html("$ "+parseFloat(st).toFixed(2));
            st = st - (st*(descf/100));
            var tf =0;
            if(ivaf=="S"){
              tf = st * 1.12;
            }else{
              tf = st;
            }
            
            $(this).find('td').eq(9).html("$ "+parseFloat(tf).toFixed(2));
            
            var subf = parseFloat($(this).find('td').eq(6).html().replace('$', ''));
            var desf = parseFloat($(this).find('td').eq(8).find('input').val())
            desf = subf*(desf/100);
            subf=subf-desf;
            descuento +=desf;
            if($(this).find('td').eq(7).html()=="S"){
              iva += subf *0.12;
            }

            subtotal += parseFloat($(this).find('td').eq(6).html().replace('$', ''));
            total += parseFloat($(this).find('td').eq(9).html().replace('$', ''));       
          }catch(error){console.log(error);}

        
    });

    $('span#subtotal').html( subtotal.toFixed(2));
    $('span#descuento').html( descuento.toFixed(2));
    $('span#iva').html(iva.toFixed(2));
    $('span#total').html(parseFloat(total).toFixed(2));
   
}


/////////////////////////////////////////////////////////////////////
$(document).keydown(function(tecla) {
            
            
               //tecla.preventDefault();
            
            if ( 112 == tecla.keyCode) {
               tecla.preventDefault();
                $('button#Consultarkardex').click();
            }
            


            if ( 113 == tecla.keyCode) {
               tecla.preventDefault();
                $('button#Imprimirkardex').click();
            }
           // alert(tecla.keyCode);
        });