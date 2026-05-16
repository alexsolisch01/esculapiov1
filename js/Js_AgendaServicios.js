
$(function () {
    $('.list-group.checked-list-box .list-group-item').each(function () {
        
        // Settings
        var $widget = $(this),
            $checkbox = $('<input type="checkbox" class="hidden" />'),
            color = "#dff0d8",
            style = ($widget.data('style') == "button" ? "btn-" : "list-group-item-"),
            settings = {
                on: {
                    icon: 'glyphicon glyphicon-check'
                },
                off: {
                    icon: 'glyphicon glyphicon-unchecked'
                }
            };
            
        $widget.css('cursor', 'pointer')
        $widget.append($checkbox);

        // Event Handlers
        $widget.on('click', function () {
            $checkbox.prop('checked', !$checkbox.is(':checked'));
            $checkbox.triggerHandler('change');
            updateDisplay();
        });
        $checkbox.on('change', function () {
            updateDisplay();
        });
          

        // Actions
        function updateDisplay() {
            var isChecked = $checkbox.is(':checked');

            // Set the button's state
            $widget.data('state', (isChecked) ? "on" : "off");

            // Set the button's icon
            $widget.find('.state-icon')
                .removeClass()
                .addClass('state-icon ' + settings[$widget.data('state')].icon);

            // Update the button's color
            if (isChecked) {
                $widget.addClass(style + color + ' active');
            } else {
                $widget.removeClass(style + color + ' active');
            }
        }

        // Initialization
        function init() {
            
            if ($widget.data('checked') == true) {
                $checkbox.prop('checked', !$checkbox.is(':checked'));
            }
            
            updateDisplay();

            // Inject the icon if applicable
            if ($widget.find('.state-icon').length == 0) {
                $widget.prepend('<span class="state-icon ' + settings[$widget.data('state')].icon + '"></span>');
            }
        }
        init();
    });
    
   
});


var tablaProceLabAgregados=null;
var tablaProceRxAgregados=null;
var tablaProceEcoAgregados=null;
var tablaProceTacAgregados=null;
var tablaCieParteDiaria=null;

function ConstruirTablasAgenda(){

   tablaProceLabAgregados=  $('#datatableProcedimientoGrupoAgenda').DataTable({                               
                               scrollY: 200,
                              'paging'      : false,
                              'lengthChange': false,
                              'searching'   : false,
                              'ordering'    : false,
                              'info'        : false,
                              'autoWidth'   : false
                            });

   tablaProceRxAgregados=  $('#datatableProcedimientoGrupoRxAgenda').DataTable({                               
                               scrollY: 200,
                              'paging'      :false,
                              'lengthChange': false,
                              'searching'   : false,
                              'ordering'    : false,
                              'info'        : false,
                              'autoWidth'   : false
                            });

    tablaProceEcoAgregados=  $('#datatableProcedimientoGrupoEcoAgenda').DataTable({                               
                               scrollY: 200,
                              'paging'      :false,
                              'lengthChange': false,
                              'searching'   : false,
                              'ordering'    : false,
                              'info'        : false,
                              'autoWidth'   : false
                            });

  tablaProceTacAgregados=  $('#datatableProcedimientoGrupoTacAgenda').DataTable({                               
                               scrollY: 200,
                              'paging'      :false,
                              'lengthChange': false,
                              'searching'   : false,
                              'ordering'    : false,
                              'info'        : false,
                              'autoWidth'   : false
                            });

  tablaCieParteDiaria = $('#datatableCiePateDiaria').DataTable({
        "processing": true,
        "serverSide": true,
        lengthMenu: [
            [200, 400, 600],
            [200, 400, 600]
        ],
        "ajax": {
            url: "Ajax/Aj_Cie.php",
            data: {
                Requerimiento: "CargarCie"
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
            "targets": [0, 1],
            "orderable": false,
        }, ]
    });
   
}

$('#modal-partediaria').on('shown.bs.modal', function() {
    tablaCieParteDiaria.search("").draw();
});

$(".body ul.treeview-menu").on('click', "li", function(evt) {
      $('ul.treeview-menu').find("li").removeClass("liselec");
      $(this).addClass("liselec");
});

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////ProcedimientosLaboratorio//////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

$(".body").on('keyup', ".buscarLab", function(evt) {

       var texto = $(this).val().toUpperCase();
       var vector  = $("ul.procelab li");
       $.each(vector, function(a) {
            var li = $(this);
            
            if(li.html().includes(texto)){
               $(li).addClass("igual").removeClass("diferente"); 
            }else{               
               $(li).addClass("diferente").removeClass("igual");
            }
            if(texto==""){
              $(li).addClass("igual").removeClass("diferente");
            }
        });

       $("ul.procelab li.diferente").fadeOut(1);
       $("ul.procelab li.igual").fadeIn(1);
});

$(".body").on('click', "ul.procelab li", function(evt) {
      $('.body div#ProcedimientosLaboratorio').empty();
      $('.body div#ProcedimientosLaboratorio').append("<h5>Laboratorio</h5>");
      var id = $(this).attr("id");
      if($(this).hasClass("active")){

            var elem = '<span grupo="'+$(this).attr("grupo")+'">'+$(this).html().replace('<span class="state-icon glyphicon glyphicon-check"></span>',"")+'</span>';            
            var boton = '<button type="submit" id="EliminarItemProceLab" class="btn btn-danger"><i class="fa fa-trash-o" aria-hidden="true"></i></button>';
            var campos = [elem,$(this).attr("title").replace("Precio $ ",""),boton];
            tablaProceLabAgregados.row.add(campos).node().id = $(this).attr("id");
            tablaProceLabAgregados.draw(false);
      }else{
        RemoverItemLabTablaAgenda(id);
      }
      CalcularTotalLabAgenda();
      var dd = tablaProceLabAgregados.rows().count();
      for (var i = 0; i < dd ;i++) {
        
        
          var gg = tablaProceLabAgregados.row(i).data()[0];
          if(gg!='<span><input type="text" class="form-control" style="width: 100%;"></span>'){
            var ff = gg.substring(13);
            var oo = ff.split('"');
            var tabla = '.body div#ProcedimientosLaboratorio';
            validad(oo[0],tabla);
          }
          
        
        
      }
});


$(".body").on('change', "#cbmAgendaLab", function(evt) {
      
      var id = $(this).val();
      if(id==0){
        return;
      }
      var item = $(this).find("option:selected").html();
      var grupo = $(this).find("option:selected").attr("grupo");
      var precio = $(this).find("option:selected").attr("precio").replace("Precio $ ","");
      var elem = '<span grupo="'+grupo+'">'+item+'</span>';            
      var boton = '<button type="submit" id="EliminarItemProceLab" class="btn btn-danger"><i class="fa fa-trash-o" aria-hidden="true"></i></button>';
      if(!ExisteItenLab(item)){
            var campos = [elem,precio,boton];
            tablaProceLabAgregados.row.add(campos).node().id = id;
            tablaProceLabAgregados.draw(false);
      }
      CalcularTotalLabAgenda();
      PlanTrataimientoLab();
});

$(".body").on('click', "#AddLabBlanco", function(evt) {
      var elem = '<span><input type="text" class="form-control" style="width: 100%;"></span>';            
      var boton = '<button type="submit" id="EliminarItemProceLab" class="btn btn-danger"><i class="fa fa-trash-o" aria-hidden="true"></i></button>';
      var campos = [elem,"0.00",boton];
      tablaProceLabAgregados.row.add(campos).node().id = -1;
      tablaProceLabAgregados.draw(false);  
});
$(".body table#datatableProcedimientoGrupoAgenda").on('click', "button#EliminarItemProceLab", function(evt) {
    var item = $(this).parent().parent().find('td').eq(0).find('span').text();
    var fila = $(this).parent().parent();
    swal({
        title: "Esculapio",
        text: "Seguro Que Desea Quitar El Item " + item + " ?",
        icon: "info",
        buttons: true,
        dangerMode: true,
    }).then((confirma) => {
        if (confirma) {
            tablaProceLabAgregados.row(fila).remove().draw(false);
            CalcularTotalLabAgenda();
            PlanTrataimientoLab();
        } else {}
    });
});

function ExisteItenLab(item) {
    var confirma = false;
    var vector = $('.body').find("#datatableProcedimientoGrupoAgenda tbody tr");
    $.each(vector, function(a) {        
        var itemf = $(this).find('td').eq(0).html();        
        if (itemf == item) {
            confirma = true;
        }
    });
    return confirma;
}
function RemoverItemLabTablaAgenda(idIten) {
    var fila = $('.body').find("#datatableProcedimientoGrupoAgenda tbody tr[id='" + idIten + "']");
    //alert(fila.html());
    tablaProceLabAgregados.row(fila).remove().draw(false);
}
function PlanTrataimientoLab(){
  $('.body div#ProcedimientosLaboratorio').empty();
  $('.body div#ProcedimientosLaboratorio').append("<h5>Laboratorio</h5>");
  var dd = tablaProceLabAgregados.rows().count();
      for (var i = 0; i < dd ;i++) {
          var gg = tablaProceLabAgregados.row(i).data()[0];
          if(gg!='<span><input type="text" class="form-control" style="width: 100%;"></span>'){
            var ff = gg.substring(13);
            var oo = ff.split('"');
            var tabla = '.body div#ProcedimientosLaboratorio';
            validad(oo[0],tabla);
          }
      }
}

function CalcularTotalLabAgenda() {
    var vector = $('.body').find("#datatableProcedimientoGrupoAgenda tbody tr");
    var precioTotal = 0;
    $.each(vector, function(a) {
        var precio = $(this).find('td').eq(1).html();
        precioTotal += parseFloat(precio);
    });
    precioTotal = (isNaN(parseFloat(precioTotal))) ? 0 : parseFloat(precioTotal);
    $('label#precioTotal').html('TOTAL: $ ' + precioTotal.toFixed(2));
}

function validad(N,buscar){
  var vector = $(buscar).find('span');
  var confirma = false;
  $.each(vector, function(a) {
        var nombre = $(this).html();
        if(N==nombre){
          confirma = true;
        }
 });
  if(confirma == false || vector.length == 0){
    $(buscar).append("<span type='button' style='margin-right:1em;margin-top:5px;' class='btn btn-xs bg-olive'>"+N+"</span>");
    AgregarProblemaTemp(idItemTemporal,$('#DescripcionEnfermedad').val());
  }
}


/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

$(".body").on('change', "select#cbmAgendagrupoRx", function(evt) {

       var gruposeleccionado = $(this).find('option:selected').text().trim();
       var vector  = $("ul.procerx li");
       $.each(vector, function(a) {
            var li = $(this);
            var grupo = $(this).attr("grupo");
            if(gruposeleccionado!=grupo){
                $(li).addClass("diferente").removeClass("igual");
            }else{
               $(li).addClass("igual").removeClass("diferente");
            }
            if(gruposeleccionado=="Seleccionar.."){
              $(li).addClass("igual").removeClass("diferente");
            }
        });

       $("ul.procerx li.diferente").fadeOut(1);
       $("ul.procerx li.igual").fadeIn(1);
});

$(".body").on('click', "ul.procerx li", function(evt) {
      $('.body div#ProcedimientosRayos').empty();
      $('.body div#ProcedimientosRayos').append("<h5>Radiografia</h5>");
      var id = $(this).attr("id");
      if($(this).hasClass("active")){

            var elem = '<span grupo="'+$(this).attr("grupo")+'">'+$(this).html().replace('<span class="state-icon glyphicon glyphicon-check"></span>',"")+'</span>'
            var boton = '<button type="submit" id="EliminarItemProceRx" class="btn btn-danger"><i class="fa fa-trash-o" aria-hidden="true"></i></button>';
            var campos = [elem,$(this).attr("title").replace("Precio $ ",""),boton];
            tablaProceRxAgregados.row.add(campos).node().id = $(this).attr("id");
            tablaProceRxAgregados.draw(false);

      }else{
        RemoverItemRxTablaAgenda(id);
      }
      CalcularTotalRxAgenda();
      var dd = tablaProceRxAgregados.rows().count();
      for (var i = 0; i < dd ;i++) {
        var gg = tablaProceRxAgregados.row(i).data()[0];
        if(gg!='<span><input type="text" class="form-control" style="width: 100%;"></span>'){          
          var ff = gg.substring(13);
          var oo = ff.split('"');
          var tabla = '.body div#ProcedimientosRayos';
          validad(oo[0],tabla);  
        }        
      }
});

$(".body").on('change', "#cbmAgendaRx", function(evt) {

      var id = $(this).val();
      if(id==0){
        return;
      }
      var item = $(this).find("option:selected").html();
      var grupo = $(this).find("option:selected").attr("grupo");
      var precio = $(this).find("option:selected").attr("precio").replace("Precio $ ","");
      var elem = '<span grupo="'+grupo+'">'+item+'</span>';   
      var boton = '<button type="submit" id="EliminarItemProceRx" class="btn btn-danger"><i class="fa fa-trash-o" aria-hidden="true"></i></button>';

      if(!ExisteItenRx(item)){
          var campos = [elem,precio,boton];
          tablaProceRxAgregados.row.add(campos).node().id = id;
          tablaProceRxAgregados.draw(false);

      }
      CalcularTotalRxAgenda();
      PlanTrataimientoRx();
      
});
$(".body").on('click', "#AddRxBlanco", function(evt) {
      var elem = '<span><input type="text" class="form-control" style="width: 100%;"></span>';            
      var boton = '<button type="submit" id="EliminarItemProceRx" class="btn btn-danger"><i class="fa fa-trash-o" aria-hidden="true"></i></button>';
      var campos = [elem,"0.00",boton];
      tablaProceRxAgregados.row.add(campos).node().id = -1;
      tablaProceRxAgregados.draw(false);  
});

$(".body table#datatableProcedimientoGrupoRxAgenda").on('click', "button#EliminarItemProceRx", function(evt) {
    var item = $(this).parent().parent().find('td').eq(0).find('span').text();
    var fila = $(this).parent().parent();
    swal({
        title: "Esculapio",
        text: "Seguro Que Desea Quitar El Item " + item + " ?",
        icon: "info",
        buttons: true,
        dangerMode: true,
    }).then((confirma) => {
        if (confirma) {
            tablaProceRxAgregados.row(fila).remove().draw(false);
            CalcularTotalRxAgenda();
            PlanTrataimientoRx();
        } else {}
    });
});

function ExisteItenRx(item) {
    var confirma = false;
    var vector = $('.body').find("#datatableProcedimientoGrupoRxAgenda tbody tr");
    $.each(vector, function(a) {        
        var itemf = $(this).find('td').eq(0).html();        
        if (itemf == item) {
            confirma = true;
        }
    });
    return confirma;
}
function RemoverItemRxTablaAgenda(idIten) {
    var fila = $('.body').find("#datatableProcedimientoGrupoRxAgenda tbody tr[id='" + idIten + "']");
    //alert(fila.html());
    tablaProceRxAgregados.row(fila).remove().draw(false);
}
function PlanTrataimientoRx(){
  $('.body div#ProcedimientosRayos').empty();
      $('.body div#ProcedimientosRayos').append("<h5>Radiografia</h5>");
      var dd = tablaProceRxAgregados.rows().count();
      for (var i = 0; i < dd ;i++) {
        var gg = tablaProceRxAgregados.row(i).data()[0];
        if(gg!='<span><input type="text" class="form-control" style="width: 100%;"></span>'){          
          var ff = gg.substring(13);
          var oo = ff.split('"');
          var tabla = '.body div#ProcedimientosRayos';
          validad(oo[0],tabla);  
        }        
      }
}

function CalcularTotalRxAgenda() {
    var vector = $('.body').find("#datatableProcedimientoGrupoRxAgenda tbody tr");
    var precioTotal = 0;
    $.each(vector, function(a) {
        var precio = $(this).find('td').eq(1).html();
        precioTotal += parseFloat(precio);
    });
    precioTotal = (isNaN(parseFloat(precioTotal))) ? 0 : parseFloat(precioTotal);
    $('label#precioTotalRx').html('TOTAL: $ ' + precioTotal.toFixed(2));
}


/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////Ecografia/////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

$(".body").on('change', "select#cbmAgendagrupoEco", function(evt) {
       var gruposeleccionado = $(this).find('option:selected').text().trim();
       var vector  = $("ul.proceeco li");
       $.each(vector, function(a) {
            var li = $(this);
            var grupo = $(this).attr("grupo");
            if(gruposeleccionado!=grupo){
                $(li).addClass("diferente").removeClass("igual");
            }else{
               $(li).addClass("igual").removeClass("diferente");
            }
            if(gruposeleccionado=="Seleccionar.."){
              $(li).addClass("igual").removeClass("diferente");
            }
        });

       $("ul.proceeco li.diferente").fadeOut(1);
       $("ul.proceeco li.igual").fadeIn(1);
});

$(".body").on('click', "ul.proceeco li", function(evt) {
    $('.body div#ProcedimientosEcografia').empty();
      $('.body div#ProcedimientosEcografia').append("<h5>Ecografia</h5>");
      var id = $(this).attr("id");
      if($(this).hasClass("active")){

            var elem = '<span grupo="'+$(this).attr("grupo")+'">'+$(this).html().replace('<span class="state-icon glyphicon glyphicon-check"></span>',"")+'</span>'
            var boton = '<button type="submit" id="EliminarItemProceEco" class="btn btn-danger"><i class="fa fa-trash-o" aria-hidden="true"></i></button>';
            var campos = [elem,$(this).attr("title").replace("Precio $ ",""),boton];
            tablaProceEcoAgregados.row.add(campos).node().id = $(this).attr("id");
            tablaProceEcoAgregados.draw(false);

      }else{
        RemoverItemEcoTablaAgenda(id);
      }
      CalcularTotalEcoAgenda();
      var dd = tablaProceEcoAgregados.rows().count();
      for (var i = 0; i < dd ;i++) {
        var gg = tablaProceEcoAgregados.row(i).data()[0];
        if(gg!='<span><input type="text" class="form-control" style="width: 100%;"></span>'){
          var ff = gg.substring(13);
          var oo = ff.split('"');
          var tabla = '.body div#ProcedimientosEcografia';
          validad(oo[0],tabla);
        }
        
        
      }
});

$(".body").on('change', "#cbmAgendaEco", function(evt) {
      
      var id = $(this).val();
      if(id==0){
        return;
      }
      var item = $(this).find("option:selected").html();
      var grupo = $(this).find("option:selected").attr("grupo");
      var precio = $(this).find("option:selected").attr("precio").replace("Precio $ ","");
      var elem = '<span grupo="'+grupo+'">'+item+'</span>';   
      var boton = '<button type="submit" id="EliminarItemProceEco" class="btn btn-danger"><i class="fa fa-trash-o" aria-hidden="true"></i></button>';

      if(!ExisteItenEco(item)){
          var campos = [elem,precio,boton];
          tablaProceEcoAgregados.row.add(campos).node().id = id;
          tablaProceEcoAgregados.draw(false);

      }
      CalcularTotalEcoAgenda();
      PlanTrataimientoEco();
      
});

$(".body").on('click', "#AddEcoBlanco", function(evt) {
      var elem = '<span><input type="text" class="form-control" style="width: 100%;"></span>';            
      var boton = '<button type="submit" id="EliminarItemProceEco" class="btn btn-danger"><i class="fa fa-trash-o" aria-hidden="true"></i></button>';
      var campos = [elem,"0.00",boton];
      tablaProceEcoAgregados.row.add(campos).node().id = -1;
      tablaProceEcoAgregados.draw(false);  
});

$(".body table#datatableProcedimientoGrupoEcoAgenda").on('click', "button#EliminarItemProceEco", function(evt) {
    var item = $(this).parent().parent().find('td').eq(0).find('span').text();
    var fila = $(this).parent().parent();
    swal({
        title: "Esculapio",
        text: "Seguro Que Desea Quitar El Item " + item + " ?",
        icon: "info",
        buttons: true,
        dangerMode: true,
    }).then((confirma) => {
        if (confirma) {
            tablaProceEcoAgregados.row(fila).remove().draw(false);
            CalcularTotalEcoAgenda();
            PlanTrataimientoEco();
        } else {}
    });
});

function ExisteItenEco(item) {
    var confirma = false;
    var vector = $('.body').find("#datatableProcedimientoGrupoEcoAgenda tbody tr");
    $.each(vector, function(a) {        
        var itemf = $(this).find('td').eq(0).html();        
        if (itemf == item) {
            confirma = true;
        }
    });
    return confirma;
}
function RemoverItemEcoTablaAgenda(idIten) {
    var fila = $('.body').find("#datatableProcedimientoGrupoEcoAgenda tbody tr[id='" + idIten + "']");
    //alert(fila.html());
    tablaProceEcoAgregados.row(fila).remove().draw(false);
}
function PlanTrataimientoEco(){
      $('.body div#ProcedimientosEcografia').empty();
      $('.body div#ProcedimientosEcografia').append("<h5>Ecografia</h5>");
      var dd = tablaProceEcoAgregados.rows().count();
      for (var i = 0; i < dd ;i++) {
        var gg = tablaProceEcoAgregados.row(i).data()[0];
        if(gg!='<span><input type="text" class="form-control" style="width: 100%;"></span>'){
          var ff = gg.substring(13);
          var oo = ff.split('"');
          var tabla = '.body div#ProcedimientosEcografia';
          validad(oo[0],tabla);
        }
      }
}

function CalcularTotalEcoAgenda() {
    var vector = $('.body').find("#datatableProcedimientoGrupoEcoAgenda tbody tr");
    var precioTotal = 0;
    $.each(vector, function(a) {
        var precio = $(this).find('td').eq(1).html();
        precioTotal += parseFloat(precio);
    });
    precioTotal = (isNaN(parseFloat(precioTotal))) ? 0 : parseFloat(precioTotal);
    $('label#precioTotalEco').html('TOTAL: $ ' + precioTotal.toFixed(2));
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

$(".body").on('change', "select#cbmAgendagrupoTac", function(evt) {

       var gruposeleccionado = $(this).find('option:selected').text().trim();
       var vector  = $("ul.procetac li");
       $.each(vector, function(a) {
            var li = $(this);
            var grupo = $(this).attr("grupo");
            if(gruposeleccionado!=grupo){
                $(li).addClass("diferente").removeClass("igual");
            }else{
               $(li).addClass("igual").removeClass("diferente");
            }
            if(gruposeleccionado=="Seleccionar.."){
              $(li).addClass("igual").removeClass("diferente");
            }
        });

       $("ul.procetac li.diferente").fadeOut(1);
       $("ul.procetac li.igual").fadeIn(1);
});

$(".body").on('click', "ul.procetac li", function(evt) {
      $('.body div#ProcedimientosTac').empty();
      $('.body div#ProcedimientosTac').append("<h5>TAC/RMN</h5>");
      var id = $(this).attr("id");
      if($(this).hasClass("active")){

            var elem = '<span grupo="'+$(this).attr("grupo")+'">'+$(this).html().replace('<span class="state-icon glyphicon glyphicon-check"></span>',"")+'</span>'
            var boton = '<button type="submit" id="EliminarItemProceTac" class="btn btn-danger"><i class="fa fa-trash-o" aria-hidden="true"></i></button>';
            var campos = [elem,$(this).attr("title").replace("Precio $ ",""),boton];
            tablaProceTacAgregados.row.add(campos).node().id = $(this).attr("id");
            tablaProceTacAgregados.draw(false);

      }else{
        RemoverItemTacTablaAgenda(id);
      }
      CalcularTotalTacAgenda();
      var dd = tablaProceTacAgregados.rows().count();
      for (var i = 0; i < dd ;i++) {
        var gg = tablaProceTacAgregados.row(i).data()[0];
        if(gg!='<span><input type="text" class="form-control" style="width: 100%;"></span>'){
          var ff = gg.substring(13);
          var oo = ff.split('"');
          var tabla = '.body div#ProcedimientosTac';
          validad(oo[0],tabla);
        }                
      }
});

$(".body").on('change', "#cbmAgendaTac", function(evt) {
      
      var id = $(this).val();
      if(id==0){
        return;
      }
      var item = $(this).find("option:selected").html();
      var grupo = $(this).find("option:selected").attr("grupo");
      var precio = $(this).find("option:selected").attr("precio").replace("Precio $ ","");
      var elem = '<span grupo="'+grupo+'">'+item+'</span>';   
      var boton = '<button type="submit" id="EliminarItemProceTac" class="btn btn-danger"><i class="fa fa-trash-o" aria-hidden="true"></i></button>';

      if(!ExisteItenTac(item)){
          var campos = [elem,precio,boton];
          tablaProceTacAgregados.row.add(campos).node().id = id;
          tablaProceTacAgregados.draw(false);

      }
      CalcularTotalTacAgenda();
      PlanTrataimientoTac();
     
});

$(".body").on('click', "#AddTacBlanco", function(evt) {
      var elem = '<span><input type="text" class="form-control" style="width: 100%;"></span>';            
      var boton = '<button type="submit" id="EliminarItemProceTac" class="btn btn-danger"><i class="fa fa-trash-o" aria-hidden="true"></i></button>';
      var campos = [elem,"0.00",boton];
      tablaProceTacAgregados.row.add(campos).node().id = -1;
      tablaProceTacAgregados.draw(false);  
});

$(".body table#datatableProcedimientoGrupoTacAgenda").on('click', "button#EliminarItemProceTac", function(evt) {
    var item = $(this).parent().parent().find('td').eq(0).find('span').text();
    var fila = $(this).parent().parent();
    swal({
        title: "Esculapio",
        text: "Seguro Que Desea Quitar El Item " + item + " ?",
        icon: "info",
        buttons: true,
        dangerMode: true,
    }).then((confirma) => {
        if (confirma) {
            tablaProceTacAgregados.row(fila).remove().draw(false);
            CalcularTotalTacAgenda();
            PlanTrataimientoTac();
        } else {}
    });
});

function ExisteItenTac(item) {
    var confirma = false;
    var vector = $('.body').find("#datatableProcedimientoGrupoTacAgenda tbody tr");
    $.each(vector, function(a) {        
        var itemf = $(this).find('td').eq(0).html();        
        if (itemf == item) {
            confirma = true;
        }
    });
    return confirma;
}

function RemoverItemTacTablaAgenda(idIten) {
    var fila = $('.body').find("#datatableProcedimientoGrupoTacAgenda tbody tr[id='" + idIten + "']");
    //alert(fila.html());
    tablaProceTacAgregados.row(fila).remove().draw(false);
}

function PlanTrataimientoTac(){
      $('.body div#ProcedimientosTac').empty();
      $('.body div#ProcedimientosTac').append("<h5>TAC/RMN</h5>");
      var dd = tablaProceTacAgregados.rows().count();
      for (var i = 0; i < dd ;i++) {
        var gg = tablaProceTacAgregados.row(i).data()[0];
        if(gg!='<span><input type="text" class="form-control" style="width: 100%;"></span>'){
          var ff = gg.substring(13);
          var oo = ff.split('"');
          var tabla = '.body div#ProcedimientosTac';
          validad(oo[0],tabla);
        }                
      }
}

function CalcularTotalTacAgenda() {
    var vector = $('.body').find("#datatableProcedimientoGrupoTacAgenda tbody tr");
    var precioTotal = 0;
    $.each(vector, function(a) {
        var precio = $(this).find('td').eq(1).html();
        precioTotal += parseFloat(precio);
    });
    precioTotal = (isNaN(parseFloat(precioTotal))) ? 0 : parseFloat(precioTotal);
    $('label#precioTotalTac').html('TOTAL: $ ' + precioTotal.toFixed(2));
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////// 

var elementoEnfermedad="";
var enfermedad = "";
var codigo ="";

$(".body table#datatableCiePateDiaria tbody").on('dblclick', "tr", function(evt) {
    codigo = $(this).find('td').eq(0).html();
    enfermedad = $(this).find('td').eq(1).html();      

    if(confirmaEpidemiologico){
      $('#modal-epidemiologico').modal();
    }else{
        $('#modal-diagnostico').modal();
    }        
});

function AgregarEnfermedad(enfermedad,elem){
    var vector = $("div#Enfermedades").find('#enfe');
    var confirma = true;
     $.each(vector, function(a) {
       var enfe = $(this).html();
       if(enfermedad == enfe){
        confirma=false;
       }
    });
     if(confirma){
        $("#EnfermedadesSeleccionadas").append(elem);  
     }
     
}

$(".body").on('click', "button#AgregarDiagnostico", function(evt) {

    var tipo = $('#cbmDiagnostico').val();
    var procedimiento = $('#cbmProcedimiento').val();
    var actividad = $('#cbmActividad').val();
    var interconsulta = $('#cbmInterconsulta').val();

    var revision = "";
    var descripcionDG ="";
    if(procedimiento==0){
      swal("Esculapio!", "SELECCIONE UN PROCEDIMIENTO", "warning");
      return;
    }    
    if(actividad==0){
      swal("Esculapio!", "SELECCIONE CUANTAS ACTIVIDADES REALIZO", "warning");
      return;
    }
    if(tipo==0 && idTipoServicio !=14){
      swal("Esculapio!", "SELECCIONE LA CONDICION DEL DIAGNOSTICO", "warning");
      return;
    }

    if($("#modal-diagnostico form.diagnosticos input:checked").val()=="PREVENCION-GENERAL" || $("#modal-diagnostico form.diagnosticos input:checked").val()=="MORBILIDAD"){
        revision = $("#modal-diagnostico div#frmPVG input:checked").val();
        descripcionDG="";
    }


     if($("#modal-diagnostico form.diagnosticos input:checked").val()!="PREVENCION-GENERAL" && $("#modal-diagnostico form.diagnosticos input:checked").val()!="MORBILIDAD"){
        revision = $("#modal-diagnostico div#frmEF input:checked").val();
         descripcionDG = '<span id="descripcion" class="col-md-12 badge bg-yellow">'+$("#modal-diagnostico div#frmEF select#cbmEF").val()+'</span> ' ;
         if($("#modal-diagnostico div#frmEF select#cbmEF").val()==0){
            swal("Esculapio!", "SELECCIONE LA DESCRIPCION DEL DIAGNOSTICO", "warning");
            return;
          }

    }

    
    elementoEnfermedad = ' <div id="Enfermedades" class="direct-chat-msg"> '   
                              +'<span id="cie" class="badge bg-green">'+codigo+'</span>  '                                                      
                                +'<div id="enfe" style="margin-top: -2em;" class="direct-chat-text col-md-11">'
                                  +'<span id="nombreEnfermedad" class="col-md-5">'   
                                    +enfermedad
                                  +'</span>'
                                  +'<span class="col-md-7 pull-right">'
                                      +'<span id="tipo" class="col-md-12 badge bg-green">'+$("#modal-diagnostico form.diagnosticos input:checked").val()+'</span>  ' 
                                      +'<span id="tiempo" class="col-md-12 badge bg-blue">'+revision+'</span> ' 
                                      +descripcionDG
                                      +'<span id="interconsulta" class="col-md-12 badge bg-blue">'+interconsulta+'</span> ' 
                                      +'<span id="procedimiento" class="col-md-12 badge bg-yellow">'+procedimiento+'</span>  ' 
                                      +'<span id="actividad" style="display:none;" class="col-md-12 badge bg-green">'+actividad+'</span>  ' 
                                      +'<span id="condicion" class="col-md-12 badge bg-blue">'+tipo+'</span> '
                                  +'</span>'
                                +'</div>'
                              +'</div> ';
  AgregarEnfermedad(enfermedad,elementoEnfermedad); 
  
  
  $('#CerrarDiagnostico').click();
});

$(".body div#EnfermedadesSeleccionadas").on('dblclick', "div#Enfermedades", function(evt) {    
  $(this).fadeOut( 500, function() {  
    $(this).remove();
  });
});

$(".body").on('change', "input[name='radio']", function(evt) {
    

    if($(this).prop('checked')){
      $('#tituloDiagnostico').html("DIAGNOSTICO POR "+$(this).val());

      if($(this).val()=="MORBILIDAD"){
        
         $('#frmEF').fadeOut(500, function() {            
           $('#frmPVG').fadeIn(500);
        });                      
         return;
      }
      if($(this).val()=="PREVENCION-GENERAL"){

        $('#frmEF').fadeOut(500, function() {            
           $('#frmPVG').fadeIn(500);
        });
        
        
      }else{
        $('#frmPVG').fadeOut(500, function() {  
          $('#frmEF').fadeIn(500);
        });
        
        
      }
      if($(this).val()=="PREVENCION-EDAD FERTIL"){
        
        $('select#cbmEF').find('option[tipo="frmEF"]').css("display","block");
        $('select#cbmEF').find('option[tipo="frmPF"]').css("display","none");
        $('select#cbmEF').find('option[tipo="frmDOC"]').css("display","none");
        
        
        
      }

      if($(this).val()=="PLANIFICACION FAMILIAR"){
        
        $('select#cbmEF').find('option[tipo="frmEF"]').css("display","none");
        $('select#cbmEF').find('option[tipo="frmPF"]').css("display","block");
        $('select#cbmEF').find('option[tipo="frmDOC"]').css("display","none");
        
        
      }
      if($(this).val()=="DETECCION OPORTUNA DEL CANCER"){
        
        $('select#cbmEF').find('option[tipo="frmEF"]').css("display","none");
        $('select#cbmEF').find('option[tipo="frmPF"]').css("display","none");
        $('select#cbmEF').find('option[tipo="frmDOC"]').css("display","block");
        
        
        
      }
      
      $('.selectpicker').selectpicker('refresh');
    }
});

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

$(".body").on('click', "button#GuardarEpidemia", function(evt) {
    evt.preventDefault(); // evita que se envie el formulario
    var idPaciente = pacienteSeleccionado;
    if (idPaciente == 0) {
        swal("Esculapio!", "Debe seleccionar un Paciente", "error");
        return;
    }
    var genero = $('#estadistico').find('select#Genero').val().trim();
    var genero2 = $('#estadistico').find('select#Genero2').val().trim();
    var etnia = $('#estadistico').find('select#Etnia').val().trim();
    var migrante = $('#estadistico').find('select#Migrante').val().trim();
    var migrante2 = $('#estadistico').find('select#Migrante2').val().trim();
    var grupo = $('#estadistico').find('select#Grupo').val().trim();
    var sector = $('#estadistico').find('select#Sector').val().trim();

    var codigo = $('#trabajoSocial').find('input#Codigovih').val().trim();
    var nombreres = $('#trabajoSocial').find('input#Responsable').val().trim();
    var resparen = $('#trabajoSocial').find('input#Parentesco').val().trim();
    var numerores = $('#trabajoSocial').find('input#Numero').val().trim();
    var afiliacion = $('#trabajoSocial').find('select#Afiliacion').val();
    var instruccion = $('#trabajoSocial').find('select#Instruccion').val();

    swal({
        title: "Esculapio",
        text: "Seguro Que Desea Modificar?",
        icon: "info",
        buttons: true,
        dangerMode: false,
    }).then((confirma) => {
        if (confirma) {
            ModificarEpidemia(genero,genero2, etnia, migrante,migrante2, grupo, sector,idPaciente);
            ModificarTrabajo(codigo, nombreres, resparen, numerores, afiliacion, instruccion,idPaciente);

        } else {
            
        }
    });
});

function ModificarEpidemia(genero,genero2, etnia, migrante,migrante2, grupo, sector,id) {
    $.ajax({
        method: "POST",
        url: "Ajax/Aj_Paciente.php",
        data: {
            Requerimiento: "ModificaEpidemia",
            Genero: genero,
            Genero2: genero2,
            Etnia: etnia,
            Migrante: migrante,
            Migrante2: migrante2,
            Grupo: grupo,
            Sector: sector,
            Id: id
        },
        dataType: 'JSON',
    }).done(function(respuesta) {
        
            ActualizarEstadoPaciente(id);
             $('#modal-epidemiologico button.btn-outline').click();
             
             confirmaEpidemiologico = false;
             swal("Informacion Agregada..")
                .then((value) => {
                  $('#modal-diagnostico').modal();
                });      
        
    }).fail(function(jqXHR, textStatus, errorThrown) {
        ActualizarEstadoPaciente(id);
             $('#modal-epidemiologico button.btn-outline').click();
             
             confirmaEpidemiologico = false;
             swal("Informacion Agregada..")
                .then((value) => {
                  $('#modal-diagnostico').modal();
                });      
    });
}



function ModificarTrabajo(codigo, nombreres, resparen, numerores, afiliacion, instruccion,idPaciente) {
    $.ajax({
        method: "POST",
        url: "Ajax/Aj_Paciente.php",
        data: {
            Requerimiento: "ModificaTrabajo",
            Codigo: codigo,
            NombreRes: nombreres,
            ResParen: resparen,
            NumeroRes: numerores,
            Afiliacion: afiliacion,
            Instruccion: instruccion,
            Id: id
        },
        dataType: 'JSON',
    }).done(function(respuesta) {        
        if (respuesta[0] == false) {
            swal("Esculapio!", "Ocurrio un error.", "error");
            return;
        }
        confirmaEpidemiologico = false;      
    }).fail(function(jqXHR, textStatus, errorThrown) {
       // console.log(errorThrown)
    });
}

function ActualizarEstadoPaciente(id) {
    $.ajax({
        method: "POST",
        url: "Ajax/Aj_Paciente.php",
        data: {
            Requerimiento: "ActualizarEstadoPaciente",
            Estado:16,
            Id: id
        },
        dataType: 'JSON',
    }).done(function(respuesta) {        
        if (respuesta[0] == false) {
            swal("Esculapio!", "Ocurrio un error.", "error");
            return;
        }
    }).fail(function(jqXHR, textStatus, errorThrown) {
        console.log(errorThrown)
    });
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
ConstruirTablasAgenda();

$("ul.wysihtml5-toolbar li:nth-child(6)").remove();
$("ul.wysihtml5-toolbar li:nth-child(5)").remove();