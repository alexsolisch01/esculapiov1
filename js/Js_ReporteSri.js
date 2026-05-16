function CargarPuntos(){

    $.ajax({
        
        method: "POST",
        url: "Ajax/Aj_Caja.php",
        data: {
            Requerimiento: "CargarPuntos"
        },
        dataType: 'JSON',
    }).done(function(respuesta) {
        $("#cbmCajero").empty();
        $("#cbmCajero").append('<option value="0">TODOS</option>');
        $.each(respuesta, function(i, value) {
            $("#cbmCajero").append('<option value="'+value[0]+'">'+value[1]+'</option>');
        });
        $('.selectpicker').selectpicker('refresh');    
    });

}
CargarPuntos();


$(".body").on('click', "button#CargarInforme", function(ev) {
    $("#Cajeros").empty();
    if($("#cbmCajero").val()==0){
        CargarPuntosDetallado();
    }else{
        CargarInformeDetallado($("#cbmCajero").val(),$("#cbmCajero option:selected").html(),"tabla0");
    }    
});


function CargarPuntosDetallado(){

    $.ajax({
        
        method: "POST",
        url: "Ajax/Aj_Caja.php",
        data: {
            Requerimiento: "CargarPuntos"
        },
        dataType: 'JSON',
    }).done(function(respuesta) {                
        $.each(respuesta, function(i, value) {
            
            CargarInformeDetallado(value[0],value[2],"tabla"+i);

        });
    });

}

function CargarInformeDetallado(punto,usuario,tablaId){
    $.ajax({
        
        method: "POST",
        url: "Ajax/Aj_Caja.php",
        data: {
            Requerimiento: "CargarInformeDetallado2",
            FechaI:$("#fechaDesdeI").val(),
            FechaF:$("#fechaDesdeF").val(),
            Punto:punto
        },
        dataType: 'JSON',
    }).done(function(respuesta) {   
        
        var filas = '';

        $.each(respuesta, function(i, value) {
            
              filas += '<tr>'
                        +'<td>'+value.f1+'</td>'
                        +'<td>'+value[1]+'</td>'
                        +'<td>'+value[2]+'</td>'
                        +'<td>'+value[3]+'</td>'
                        +'<td>'+parseFloat(value[4]).toFixed(2)+'</td>'
                        +'<td>'+parseFloat(value[5]).toFixed(2)+'</td>'
                        +'<td>'+parseFloat(value[6]).toFixed(2)+'</td>'
                        +'<td>'+parseFloat(value[7]).toFixed(2)+'</td>'
                      +'</tr>';
              
        });

        var elemento = ' <div class="col-md-12">'
                                +'<div class="box box-primary ">'
                                  +'<div class="box-header with-border">'
                                    +'<h3 class="box-title">'+usuario+'</h3>'
                                 +' </div>'
                                  +'<div class="box-body">'
                                    +'<table width="100%" id="'+tablaId+'" style="font-size: 12px !important;" border="1">'
                                      +'<thead>'
                                        +'<tr style="font-size: 10px !important;margin:0.5em;">'
                                          +'<th>FECHA EMISION</th>'
                                          +'<th>FACTURA</th>'
                                          +'<th># AUTORIZACION</th>'
                                          +'<th>CLIENTE</th>'
                                          +'<th>SUBTOTAL</th> '
                                          +'<th>DESCUENTO</th> '
                                          +'<th>IVA</th> '
                                          +'<th>TOTAL</th>  '                                          
                                        +'</tr>'
                                      +'</thead>'
                                      +'<tbody class="pointer tablaPerfil">'
                                        +filas
                                      +'</tbody>'
                                    +'</table>'
                                  +'</div>'
                               +' </div>'
                              +'</div>';
      if(filas!=""){
        $("#Cajeros").append(elemento);
      }                              
                                      
    }); 
}

$(".body").on('click', "button#exportarInforme", function(ev) {
   CrearExcel('xlsx',"FACTURAS DESDE "+$("#fechaDesdeI").val()+" "+$("#fechaDesdeF").val()+".xlsx");
});

function CrearExcel(type, fn, dl) {

    var vector = $('.body').find("#Cajeros").find("table");
    if(vector.length==0){
        return;
    }
    if(vector.length==1){
        var elt = document.getElementById('tabla0');
        var wb = XLSX.utils.table_to_book(elt, {sheet:"hoja1",raw:true});
        
        return dl ?
            XLSX.write(wb, {bookType:type, bookSST:true, type: 'base64'}) :
            XLSX.writeFile(wb, fn || ('test.' + (type || 'xlsx')), {cellStyles:true});
    }else{
        var elt = document.getElementById('tabla0');        
        if(elt==null){
            elt = document.getElementById('tabla1');        
        }
        if(elt==null){
            elt = document.getElementById('tabla2');        
        }
        if(elt==null){
            elt = document.getElementById('tabla3');        
        }
        var wb = XLSX.utils.book_new();

        for (var i = 0; i < 10; i++) {
            
            var t = document.getElementById('tabla'+i);
            if(t!=null){

              var hoja = XLSX.utils.table_to_sheet(t,{raw:true});
            
                wb.SheetNames.push("hoja"+(i+1));
                wb.Sheets["hoja"+(i+1)] = hoja;        
            }
        }
        
            
    

        return dl ?
                XLSX.write(wb, {bookType:type, bookSST:true, type: 'base64'}) :
                XLSX.writeFile(wb, fn || ('test.' + (type || 'xlsx')), {cellStyles:true});
        

    }    
}
