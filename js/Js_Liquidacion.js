
var tablaReporte = null;
var tablaReporteDetallado = null;
function DatatTable() {
    tablaReporte=$('#tablaLiquidacion').DataTable({
        dom: '<"top"lBf>rt<"bottom"ip>',
        keys: true,
        processing: true,
        paginate:false,       
        ordering:false,
        scrollY: 500,
        scrollX: true,
        buttons: [{
            extend: 'excelHtml5'
        }],
    });

    tablaReporteDetallado=$('#tablaLiquidacionDetallado').DataTable({
        dom: '<"top"lBf>rt<"bottom"ip>',
        keys: true,
        paginate:false,       
        ordering:false,
        processing: true,
        scrollY: 500,
        scrollX: true,
        buttons: [{
            extend: 'excelHtml5'
        }],
    });
}

DatatTable();

function CargarLiquidacion(){
    setTimeout(function(){
        $("div#loaderPlantilla").fadeIn(0);
    },0);
    $.ajax({        
        method: "POST",
        url: "Ajax/Aj_ReporteContabilidad.php",
        data: {
            Requerimiento: "CargarLiquidacion",
            Servicio:$('#cbmServico').val(),
            Medico:$('#cbmMedico').val(),
            FechaDesde:$('#fechaDesdeI').val(),
            FechaHasta:$('#fechaDesdeF').val(),
            Especialidad:$('#cbmEspecialidad').val()
        },
        dataType: 'JSON',
    }).done(function(respuesta) {
      setTimeout(function(){
          tablaReporte.clear();
          var nombre ="";
          var temitidos=0;
          var tatendidos=0;
          var tnatendidos=0;
          var ttotal=0;
          var tcomision =0;
          var tcomisionsi=0;
        $.each(respuesta, function(i, value) {

              var id=value.id;
              var iditem = value.idpc;
              var medico=value[2];
              var item= value[3];
              var totalgeneral=value[4];
              var comisionsi=0;
              var atendidos = null;

              if(value.sistema=="S"){                 
                 atendidos = CargarPorEstado(id,"19,15,12,13,14,10",iditem);
              }else{
                 atendidos = CargarPorEstado(id,"6,7,19,15,12,13,14,10",iditem);
              }
              
              var pagos = CargarComision(id,iditem);

              var porcentaje = 0;
              var comision =0;

              var atendido = atendidos[0];
              var totaldineroatendidos = parseFloat(value[5]);//
              var totalAtendidosMedico =atendidos[1];
              var noatendidos = totalgeneral - atendido;  

              if(pagos[0] == 'PORCENTAJE'){
                  porcentaje = pagos[1];                                                  
                  comision = totalAtendidosMedico * (porcentaje/100);                                                         
              }
              if(pagos[0] == 'VALOR'){
                  porcentaje = pagos[1];                                                  
                  comision = pagos[1] * parseFloat(atendido);                                                         
              }            

              comisionsi = totaldineroatendidos - comision;
              if(nombre==medico){
                medico="";
                temitidos += parseFloat(totalgeneral);
                tatendidos +=parseFloat(atendido);
                tnatendidos +=parseFloat(noatendidos);
                ttotal +=parseFloat(totaldineroatendidos);
                tcomision +=parseFloat(comision);
                tcomisionsi +=parseFloat(comisionsi);
              }else{
                if(tcomision!=0){
                  if (isNaN(tcomision)) {
                    tcomision = 0;      // Se ejecuta
                  }
                }
                if(tcomisionsi!=0){
                  if (isNaN(tcomisionsi)) {
                    tcomisionsi = 0;      // Se ejecuta
                  }
                }
                if(i!=0){
                  
                  var campos=["","","------","------","------","------","------","------","------"];
                  tablaReporte.row.add(campos);

                  campos=["","","<label>"+temitidos+"<label>","<label>"+tatendidos+"<label>","<label>"+tnatendidos+"<label>","<label>$ "+ttotal.toFixed(2)+"<label>","","<label>$ "+tcomision.toFixed(2)+"<label>","<label>$ "+tcomisionsi.toFixed(2)+"<label>"];
                  tablaReporte.row.add(campos);
                  
                }
                

                temitidos =0;
                tatendidos =0;
                tnatendidos=0;
                ttotal=0;
                tcomision=0;
                tcomisionsi=0;

                nombre = medico;
                var campos=[medico,"","","","","","","",""];
                tablaReporte.row.add(campos);

                temitidos += parseFloat(totalgeneral);
                tatendidos +=parseFloat(atendido);
                tnatendidos +=parseFloat(noatendidos);
                ttotal +=parseFloat(totaldineroatendidos);
                tcomision +=parseFloat(comision);  
                tcomisionsi +=parseFloat(comisionsi);

              }
              if(comision!=0){
                if (isNaN(comision)) {
                  comision = 0;      // Se ejecuta
                }
              }
              if(comisionsi!=0){
                if (isNaN(comisionsi)) {
                  comisionsi = 0;      // Se ejecuta
                }
              }
              var campos=["",item,totalgeneral,atendido,noatendidos,totaldineroatendidos.toFixed(2),porcentaje,comision.toFixed(2),comisionsi.toFixed(2)];
              tablaReporte.row.add(campos);

              if($('#cbmTipo').val()=="2"){
                var campos=["-","","","","","","","",""];
                tablaReporte.row.add(campos);
                CargarFacturas(id,iditem);                
                campos=["-","","","","","","","",""];
                tablaReporte.row.add(campos);
              }

              
        
        });
        if(tcomision!=0){
          if (isNaN(tcomision)) {
            tcomision = 0;      // Se ejecuta
          }
        }
        if(tcomisionsi!=0){
          if (isNaN(tcomisionsi)) {
            tcomisionsi = 0;      // Se ejecuta
          }
        }
        var campos=["","","------","------","------","------","------","------",""];
        tablaReporte.row.add(campos);   
        campos=["","","<label>"+temitidos+"<label>","<label>"+tatendidos+"<label>","<label>"+tnatendidos+"<label>","<label>$ "+ttotal.toFixed(2)+"<label>","","<label>$ "+tcomision.toFixed(2)+"<label>","<label>$ "+tcomisionsi.toFixed(2)+"<label>"];
        tablaReporte.row.add(campos); 
        tablaReporte.draw(false);    
        },100);
        
        setTimeout(function(){
            $("div#loaderPlantilla").fadeOut(300);
        },300);
    });
    
}


function CargarLiquidacionDetallado(){
    setTimeout(function(){
        $("div#loaderPlantilla2").fadeIn(0);
    },0);
    
    $.ajax({        
        method: "POST",
        url: "Ajax/Aj_ReporteContabilidad.php",
        data: {
            Requerimiento: "CargarLiquidacionDetallado",
            Servicio:$('#cbmServico').val(),
            Medico:$('#cbmMedico').val(),
            FechaDesde:$('#fechaDesdeI').val(),
            FechaHasta:$('#fechaDesdeF').val(),
            Especialidad:$('#cbmEspecialidad').val()
        },
        dataType: 'JSON',
    }).done(function(respuesta) {
      
      setTimeout(function(){
          tablaReporteDetallado.clear();
          var nombre ="";
          var especialidad ="";
          var temitidos=0;
          var tatendidos=0;
          var tnatendidos=0;
          var ttotal=0;
          var tcomision =0;
          var tcomisionsi=0;
console.log(respuesta)
        $.each(respuesta, function(i, value) {
              
              var porcentaje = 0;
              var comision =0;
              var pagos = CargarComision(value.id_empleado,value.idpc);
              var comisionsi =0;

             console.log(pagos)

              porcentaje = pagos[1]; 
              
              var atendido = "";
              if(nombre==value[1]){
                value[1]="";
                temitidos ++;
                ttotal +=parseFloat(value[6]);  
                
                if( value.estadoCon!=21 && ( value[7]==19 || value[7]==15 || value[7]==12 || value[7]==13 || value[7]==10 || value[7]==14 || value[10]==13 )){
                  if(pagos[0] == 'PORCENTAJE'){
                                    
                      comision = value[6] * (porcentaje/100);
                      comisionsi = value[6] - comision;
                  }
                  if(pagos[0] == 'VALOR'){
                      if(parseFloat(pagos[1])>0){
                        porcentaje = pagos[1];                                                  
                        comision = pagos[1] * 1; 
                        comisionsi = value[6] - comision;
                      }else{
                        porcentaje = value[11];                                                  
                        comision = value[11] * 1; 
                        comisionsi = value[6] - comision;  
                      }
                                                                              
                  }
                  tatendidos++;                  
                  tcomision +=parseFloat(comision);
                  tcomisionsi +=parseFloat(comisionsi);
                }else{    
                  if(value.sistema=="N" && value[7] !=25 && value.estadoCon !=21 ){
                    if(pagos[0] == 'PORCENTAJE'){
                                    
                        comision = value[6] * (porcentaje/100);
                        comisionsi = value[6] - comision;
                    }
                    if(pagos[0] == 'VALOR'){
                        if(parseFloat(pagos[1])>0){
                        porcentaje = pagos[1];                                                  
                        comision = pagos[1] * 1; 
                        comisionsi = value[6] - comision;
                      }else{
                        porcentaje = value[11];                                                  
                        comision = value[11] * 1; 
                        comisionsi = value[6] - comision;  
                      }                                                    
                    }
                    tatendidos++;                  
                    tcomision +=parseFloat(comision);
                    tcomisionsi +=parseFloat(comisionsi);
                  }else{
                    tnatendidos ++;  
                    atendido = "►";
                    
                    tcomisionsi +=parseFloat(value[6]); 
                    comisionsi = parseFloat(value[6]); 
                    
                  }                                  
                }                
                                              
              }else{
                if(tcomision!=0){
                  if (isNaN(tcomision)) {
                    tcomision = 0;      // Se ejecuta
                  }
                }
                if(tcomisionsi!=0){
                  if (isNaN(tcomisionsi)) {
                    tcomisionsi = 0;      // Se ejecuta
                  }
                }
                if(i!=0){
                  
                  var campos=["","","------","","","","------","","------","------"];
                  tablaReporteDetallado.row.add(campos);

                  campos=["","","<label>"+temitidos+"</label>","","","","<label>"+ttotal.toFixed(2)+"</label>","","<label>"+tcomision.toFixed(2)+"</label>","<label>"+tcomisionsi.toFixed(2)+"</label>"];
                  tablaReporteDetallado.row.add(campos);
                  
                }
                temitidos =0;
                tatendidos =0;
                tnatendidos=0;
                ttotal=0;
                tcomision=0;
                tcomisionsi=0;

                temitidos ++;
                ttotal +=parseFloat(value[6]);  
                if(value[7]==19 || value[7]==15 || value[7]==12 || value[7]==13 || value[7]==10 || value[7]==14 || value[10]==13){
                  if(pagos[0] == 'PORCENTAJE'){
                                     
                      comision = value[6] * (porcentaje/100); 
                      comisionsi = value[6] - comision;
                  }
                  if(pagos[0] == 'VALOR'){
                      if(parseFloat(pagos[1])>0){
                        porcentaje = pagos[1];                                                  
                        comision = pagos[1] * 1; 
                        comisionsi = value[6] - comision;
                      }else{
                        porcentaje = value[11];                                                  
                        comision = value[11] * 1; 
                        comisionsi = value[6] - comision;  
                      }                                                      
                  }
                  tatendidos++;
                  
                  tcomision +=parseFloat(comision);
                  tcomisionsi +=parseFloat(comisionsi);
                }else{                  
                    if(value.sistema=="N" && value[7] !=25 && value.estadoCon !=21){
                      if(pagos[0] == 'PORCENTAJE'){
                                      
                          comision = value[6] * (porcentaje/100);
                          comisionsi = value[6] - comision;
                      }
                      if(pagos[0] == 'VALOR'){
                          if(parseFloat(pagos[1])>0){
                        porcentaje = pagos[1];                                                  
                        comision = pagos[1] * 1; 
                        comisionsi = value[6] - comision;
                      }else{
                        porcentaje = value[11];                                                  
                        comision = value[11] * 1; 
                        comisionsi = value[6] - comision;  
                      }                                                    
                      }
                      tatendidos++;                  
                      tcomision +=parseFloat(comision);
                      tcomisionsi +=parseFloat(comisionsi);
                    }else{
                      tnatendidos ++;  
                      atendido = "►";                                                                  
                      tcomisionsi +=parseFloat(value[6]); 
                      comisionsi = parseFloat(value[6]); 
                      
                    }                                    
                }
                nombre =value[1];
              }

              if(especialidad==value[0]){
                value[0]="";
              }else{
                especialidad =value[0];
              }
              
              //comision = isNaN(comision ? 0 : comision.toFixed(2))
              if(comision!=0){
                if (isNaN(comision)) {
                  comision = 0;      // Se ejecuta
                }
              }
              var campos=[value[0],value[1],atendido+value[2],value[3],value[4],value[5],"$ "+value[6],porcentaje," $ "+comision.toFixed(2),"$ "+comisionsi.toFixed(2)];
              tablaReporteDetallado.row.add(campos);                                
        });

        var campos=["","","------","","","","------","","------","------"];
        tablaReporteDetallado.row.add(campos);
        if(tcomision!=0){
          if (isNaN(tcomision)) {
            tcomision = 0;      // Se ejecuta
          }
        }
        
        campos=["","","<label>"+temitidos+"</label>","","","","<label>"+ttotal.toFixed(2)+"</label>","","<label>"+tcomision.toFixed(2)+"</label>","<label>"+tcomisionsi.toFixed(2)+"</label>"];
        tablaReporteDetallado.row.add(campos);

        tablaReporteDetallado.draw(false);    
        },100);
        
        setTimeout(function(){
          $("div#loaderPlantilla2").fadeOut(300);
      },300);
    });

    
}

function CargarPorEstado(empleado,estado,procedimiento){
  
  var total=[0,0];
    $.ajax({      
        async:false,  
        method: "POST",
        url: "Ajax/Aj_ReporteContabilidad.php",
        data: {
            Requerimiento: "CargarPorEstado",
            Estado:estado,
            Empleado:empleado,
            Servicio:$('#cbmServico').val(),
            Procedimiento:procedimiento,
            FechaDesde:$('#fechaDesdeI').val(),
            FechaHasta:$('#fechaDesdeF').val()
        },
        dataType: 'JSON',
    }).done(function(respuesta) {                
        $.each(respuesta, function(i, value) {
              total =[value[2],(isNaN(parseFloat(value[3]))) ? 0 : parseFloat(value[3])];        
        });    
        
    });
    return total;
}

function CargarComision(empleado,procedimiento){
  var total=["PORCENTAJE",0];
    $.ajax({      
        async:false,  
        method: "POST",
        url: "Ajax/Aj_ReporteContabilidad.php",
        data: {
            Requerimiento: "CargarComision",            
            Procedimiento:procedimiento,
            Servicio:$('#cbmServico').val(),
            Empleado:empleado            
        },
        dataType: 'JSON',
    }).done(function(respuesta) {
          
        $.each(respuesta, function(i, value) {
              total =[value[1],(isNaN(parseFloat(value[0]))) ? 0 : parseFloat(value[0])]; 
        });  
        
        
    });
    return total;
}

function CargarFacturas(empleado,procedimiento){
  
    $.ajax({      
        async:false,  
        method: "POST",
        url: "Ajax/Aj_ReporteContabilidad.php",
        data: {
            Requerimiento: "CargarFacturas",            
            Procedimiento:procedimiento,
            Empleado:empleado,
            FechaDesde:$('#fechaDesdeI').val(),
            FechaHasta:$('#fechaDesdeF').val()

        },
        dataType: 'JSON',
    }).done(function(respuesta) {
          console.log(respuesta);
        $.each(respuesta, function(i, value) {              
              var campos=[value[0],value[1],(isNaN(parseFloat(value[2]))) ? 0 : parseFloat(value[2]).toFixed(2),"","","","","",""];
              tablaReporte.row.add(campos);
        });    
        
    });
    
}

$(".body").on('click', "button#CargarInforme", function(ev) {
    if($('#cbmTipo').val()=="2"){
       CargarLiquidacionDetallado();
       $('#TablaResumido').fadeOut();
       $('#TablaDetallado').fadeIn();
    }else{
       CargarLiquidacion();
       $('#TablaResumido').fadeIn();
       $('#TablaDetallado').fadeOut();
    }   
     
});



$(".body").on('click', "button#ImprimirInforme", function(ev) {
  if($('#cbmTipo').val()=="2"){
       printTextAreaLiquidacionDetallado();
  }else{
      printTextAreaLiquidacion();     
  }
  
});

$(".body").on('change', "select#cbmServico", function(ev) {
    CargarEspecialidades();        
});

CargarEspecialidades();   

function CargarEspecialidades(){
    $.ajax({
        
        method: "POST",
        url: "Ajax/Aj_Especialidad.php",
        data: {
            Requerimiento: "CargarEspecialidades",
            Servicio:$('#cbmServico').val()
        },
        dataType: 'JSON',
    }).done(function(respuesta) {        
        var elemento = '';
        $("#cbmEspecialidad").empty();
        $("#cbmEspecialidad").append('<option value="0">Todos..</option>');
        $("#cbmMedico").empty();
        $("#cbmMedico").append('<option value="0">Todos..</option>');
        $.each(respuesta, function(i, value) {

            elemento += ' <option value="'+value[0]+'">'+value[1]+'</option> ';  
        });
        $("#cbmEspecialidad").append(elemento);
    });

}

function CargarMedicoEspecialidades(especialidad){
    $.ajax({
        
        method: "POST",
        url: "Ajax/Aj_Especialidad.php",
        data: {
            Requerimiento: "CargarMedicoEspecialidades",
            Especialidad:especialidad,
            Servicio:$('#cbmServico').val()
        },
        dataType: 'JSON',
    }).done(function(respuesta) { 
      
        var elemento = '';
        $("#cbmMedico").empty();
        $("#cbmMedico").append('<option value="0">Todos..</option>');
        $.each(respuesta, function(i, value) {

            elemento += ' <option value="'+value[0]+'">'+value[2]+' '+value[1]+'</option> ';  
        });
        $("#cbmMedico").append(elemento);
    });

}

function printTextAreaLiquidacion(){
    var cuerpo2 = '';
    if($('.body').find("#tablaLiquidacion tbody tr").find('td').html()!="No existen datos"){
        cuerpo2 += '<table style="margin-top: 1em; width: 100%; border-collapse: collapse; font-size:12px;"><thead><tr style="border: 1px solid black; width: 100%;"><th style="border: 1px solid black; width: 33%;">MEDICO</th><th style="border: 1px solid black; width: 31%;">ITEM</th><th style="border: 1px solid black; width: 8%;">TOTAL PACIENTES</th><th style="border: 1px solid black; width: 8%;">ATENDIDOS</th><th style="border: 1px solid black; width: 8%;">NO ATENDIDOS</th><th style="border: 1px solid black; width: 8%;">TOTAL ATENDIDOS</th><th style="border: 1px solid black; width: 8%;">%</th><th style="border: 1px solid black; width: 8%;">COMISION MEDICO</th><th style="border: 1px solid black;">COMISION S.I</th></tr></thead><tbody style="border-bottom: 1px solid black;">';
        var vector = $('.body').find("#tablaLiquidacion tbody tr");
        var selec = '';
        $.each(vector, function(a) {
            var medico = $(this).find('td').eq(0).html();
            var item = $(this).find('td').eq(1).html();
            var pacientes = $(this).find('td').eq(2).html();            
            var atendidos =  $(this).find('td').eq(3).html();
            var noatendidos =  $(this).find('td').eq(4).html();
            var total =  $(this).find('td').eq(5).html();
            var porcentaje =  $(this).find('td').eq(6).html();
            var comision =  $(this).find('td').eq(7).html();
            var comisionsi =  $(this).find('td').eq(8).html();
            selec += '<tr><td style="font-size:12px;">'+medico+'</td><td style="font-size:12px; text-align: left;">'+item+'</td><td style="font-size:12px; text-align: center;">'+pacientes+'</td><td style="font-size:12px; text-align: center;">'+atendidos+'</td><td style="font-size:12px; text-align: center;">'+noatendidos+'</td><td style="font-size:12px; text-align: center;">'+total+'</td><td style="font-size:12px; text-align: center;">'+porcentaje+'</td><td style="font-size:12px; text-align: center;">'+comision+'</td><td style="font-size:12px; text-align: center;">'+comisionsi+'</td></tr>';
            
        });
        cuerpo2 += selec+'</tbody></table></div><br>';
    }
    $("#tituloReporte").html("REPORTE DE LIQUIDACION DE MEDICOS");
    $("#reporteFechaLocal").html("Fecha "+$('#fechaDesdeI').val()+" - "+$('#fechaDesdeF').val());
    
    var piereporte =  '<div style="width: 100%;margin-top: 1em;">'
                        +'<table style="width: 100%;font-size:13px;">'
                            +'<thead>'
                                +'<th></th>'
                                +'<th></th>'
                                +'<th></th>'
                            +'</thead>'
                            +'<tbody>'
                                +'<tr>'
                                    +'<td>USUARIO : '+$("#nombresUsuario").html()+'</td>'
                                    +'<td>FECHA : '+$("#FechaActualEsculapio").val()+'</td>'
                                    +'<td>'+$("#nombrePc").val()+'</span></td>'
                                +'</tr>'                                                                
                            +'</tbody>'
                        +'</table>'
                    +'</div> '; 

   
   if($('.body').find("#tablaLiquidacion tbody tr").find('td').html()!="No existen datos"){
        childWindow = window.open('','_blank');    
        childWindow.document.write('<html><head></head><body>');    
        childWindow.document.write('<div style="margin-top:-1.2em;"></div>');        
        childWindow.document.write('<div style="margin-top:20px;" ></div>');
        childWindow.document.write($("#cabeceraLocal").html());        
        childWindow.document.write(cuerpo2+piereporte);        
        childWindow.document.write('</div>');
        childWindow.document.write('</body><script type="text/javascript">var tid = setInterval(function(){ window.print();clearInterval(tid);window.close();}, 500);</script></html>');    
    }else{
      swal("Esculapio!", "No existen Datos para Imprimir", "error");
      return;
    }
}

function printTextAreaLiquidacionDetallado(){
    var cuerpo2 = '';
    if($('.body').find("#tablaLiquidacionDetallado tbody tr").find('td').html()!="No existen datos"){
        cuerpo2 += '<table style="margin-top: 1em; width: 100%; border-collapse: collapse; font-size:12px;"><thead><tr style="border: 1px solid black; width: 100%;"><th style="border: 1px solid black; width: 15%;">ESPECIALIDAD</th><th style="border: 1px solid black; width: 18%;">MEDICO</th><th style="border: 1px solid black; width: 13%;">FACTURA</th><th style="border: 1px solid black; width: 7%;">FECHA</th><th style="border: 1px solid black; width: 18%;">PACIENTE</th><th style="border: 1px solid black; width: 15%;">PROCEDIMIENTO</th><th style="border: 1px solid black;">PRC</th><th style="border: 1px solid black;">%</th><th style="border: 1px solid black;">$MED</th><th style="border: 1px solid black;">INST</th></tr></thead><tbody style="border-bottom: 1px solid black;">';
        var vector = $('.body').find("#tablaLiquidacionDetallado tbody tr");
        var selec = '';
        $.each(vector, function(a) {
            var especialidad = $(this).find('td').eq(0).html();
            var medico = $(this).find('td').eq(1).html();
            var factura = $(this).find('td').eq(2).html();            
            var fecha =  $(this).find('td').eq(3).html();
            var paciente =  $(this).find('td').eq(4).html();
            var procedimiento =  $(this).find('td').eq(5).html();
            var precio =  $(this).find('td').eq(6).html();
            var porcentaje =  $(this).find('td').eq(7).html();
            var medicopj =  $(this).find('td').eq(8).html();
            var institucion =  $(this).find('td').eq(9).html();
            selec += '<tr><td style="font-size:12px;">'+especialidad+'</td><td style="font-size:12px; text-align: left;">'+medico+'</td><td style="font-size:12px; text-align: center;">'+factura+'</td><td style="font-size:12px; text-align: center;">'+fecha+'</td><td style="font-size:12px; text-align: left;">'+paciente+'</td><td style="font-size:12px; text-align: left;">'+procedimiento+'</td><td style="font-size:12px; text-align: center;">'+precio+'</td><td style="font-size:12px; text-align: center;">'+porcentaje+'</td><td style="font-size:12px; text-align: center;">'+medicopj+'</td><td style="font-size:12px; text-align: center;">'+institucion+'</td></tr>';
            
        });
        cuerpo2 += selec+'</tbody></table></div><br>';
    }
    $("#tituloReporte").html("REPORTE DE LIQUIDACION DE MEDICOS");
    $("#reporteFechaLocal").html("Fecha "+$('#fechaDesdeI').val()+" - "+$('#fechaDesdeF').val());

    var piereporte =  '<div style="width: 100%;margin-top: 1em;">'
                        +'<table style="width: 100%;font-size:13px;">'
                            +'<thead>'
                                +'<th></th>'
                                +'<th></th>'
                                +'<th></th>'
                            +'</thead>'
                            +'<tbody>'
                                +'<tr>'
                                    +'<td>USUARIO : '+$("#nombresUsuario").html()+'</td>'
                                    +'<td>FECHA : '+$("#FechaActualEsculapio").val()+'</td>'
                                    +'<td>'+$("#nombrePc").val()+'</span></td>'
                                +'</tr>'                                                                
                            +'</tbody>'
                        +'</table>'
                    +'</div> '; 
   
   if($('.body').find("#tablaLiquidacionDetallado tbody tr").find('td').html()!="No existen datos"){
        childWindow = window.open('','_blank');    
        childWindow.document.write('<html><head></head><body>');    
        childWindow.document.write('<div style="margin-top:-1.2em;"></div>');    
        childWindow.document.write('<div style="margin-top:20px;" ></div>');
        childWindow.document.write($("#cabeceraLocal").html());  
        childWindow.document.write(cuerpo2+piereporte);
        childWindow.document.write('</div>');
        childWindow.document.write('</body><script type="text/javascript">var tid = setInterval(function(){ window.print();clearInterval(tid);window.close();}, 500);</script></html>');    
    }else{
      swal("Esculapio!", "No existen Datos para Imprimir", "error");
      return;
    }
}

$(".body").on('change', "select#cbmEspecialidad", function(ev) {
  var especialidad = $(this).val();
  CargarMedicoEspecialidades(especialidad);
});