
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

$(".body").on('change', "select#cbmAgendagrupoLab", function(evt) {

       var gruposeleccionado = $(this).find('option:selected').text().trim();
       var vector  = $("ul.procelab li");
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

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


function CargarPlantillasProcedimiento(idPaciente) {
    $.ajax({
        method: "POST",
        url: "Ajax/Aj_Agenda.php",
        data: {
            Requerimiento: "CargarPlantillasLaboratorio",
            IdPaciente: idPaciente
        },
        dataType: 'JSON',
    }).done(function(respuesta) {
        if (respuesta[0] == false) {
            swal("Esculapio!", "Error!", "error");
            return;
        }   
        
        try{
            tablaPlantillaProcedimiento.destroy();
        }catch(error){}

        var filas = [];
        var nombreProce = "";
        var fecha ="";
        $.each(respuesta, function(i, value) {

            if(i==0){
                nombreProce=value[7];
                fecha = value[0];
            }else{
                if(nombreProce==value[7]){
                    fecha = "";
                }else{
                  nombreProce=value[7];
                  fecha = value[0];  
                }
            }

            var dataSet = [fecha,respuesta[i][1],respuesta[i][2],respuesta[i][3],respuesta[i][4],respuesta[i][5],respuesta[i][6],respuesta[i][7]];
            //tablaPlantillaProcedimiento.row.add(dataSet).draw(false);
            filas[i]=dataSet;
        });

        tablaPlantillaProcedimiento = $('#datatablePruebaAgenda').DataTable({
                                            scrollX: true,
                                            scrollY: 250,
                                            autoWidth: true,
                                            ordering: false,
                                            info: false,
                                            keys: true,                                            
                                            paginate:false,
                                            "columnDefs": [{
                                                        "targets": [7],
                                                        "visible": false,
                                                        "searchable": true
                                                    },
                                                    {
                                                        "targets": [0,1,2,3,4,5,6],
                                                        "searchable": false
                                                    }
                                                ],
                                            data:filas,
                                            autoWidth:true    
                                        });
    }).fail(function(jqXHR, textStatus, errorThrown) {
        console.log(errorThrown)
        //location.reload();
    });
}

function CargarHistoricoRx(idPaciente) {
    $.ajax({
        method: "POST",
        url: "Ajax/Aj_Agenda.php",
        data: {
            Requerimiento: "CargarHistoricoRx",
            IdPaciente: idPaciente
        },
        dataType: 'JSON',
    }).done(function(respuesta) {
        if (respuesta[0] == false) {
            swal("Esculapio!", "Error!", "error");
            return;
        }   
        try{
            tablaHistoricoRx.destroy();
        }catch(error){}
        var filas = [];
        $.each(respuesta, function(i, value) {
            var boton = '<button plantilla="'+respuesta[i][1]+'" type="submit"  class="btn btn-success " id="verInformeAgenda"> <i class="fa fa-save" aria-hidden="true"></i> Ver Informe</button> ';
            var dataSet = [respuesta[i][0],respuesta[i][1],respuesta[i][2]];
            //tablaHistoricoRx.row.add(dataSet).draw(false);
            filas[i]=dataSet;
        });

        tablaHistoricoRx = $('#HistorioRxAgenda').DataTable({
                            scrollX: true,
                            scrollY: 250,
                            autoWidth: true,    
                            info: false,
                            keys: true,    
                            paginate:false,
                            data:filas,
                            autoWidth: true
                        });

    }).fail(function(jqXHR, textStatus, errorThrown) {
        console.log(errorThrown)
        //location.reload();
    });
}


function CargarHistoricoEco(idPaciente) {
    $.ajax({
        method: "POST",
        url: "Ajax/Aj_Agenda.php",
        data: {
            Requerimiento: "CargarHistoricoEco",
            IdPaciente: idPaciente
        },
        dataType: 'JSON',
    }).done(function(respuesta) {
        if (respuesta[0] == false) {
            swal("Esculapio!", "Error!", "error");
            return;
        }   
        try{
            tablaHistoricoEco.destroy();
        }catch(error){}
        var filas = [];
        $.each(respuesta, function(i, value) {
            var boton = '<button plantilla="'+respuesta[i][1]+'" type="submit"  class="btn btn-success " id="verInformeAgenda"> <i class="fa fa-save" aria-hidden="true"></i> Ver Informe</button> ';
            var dataSet = [respuesta[i][0],respuesta[i][1],respuesta[i][2]];
            //tablaHistoricoEco.row.add(dataSet).draw(false);
            filas[i]=dataSet;
        });

        tablaHistoricoEco = $('#HistorioEcoAgenda').DataTable({
                                scrollX: true,
                                scrollY: 250,
                                autoWidth: true,    
                                info: false,
                                keys: true,    
                                paginate:false,
                                data:filas,
                                autoWidth: true
                            });

    }).fail(function(jqXHR, textStatus, errorThrown) {
        console.log(errorThrown)
        //location.reload();
    });
}


function CargarHistoricoTac(idPaciente) {
    $.ajax({
        method: "POST",
        url: "Ajax/Aj_Agenda.php",
        data: {
            Requerimiento: "CargarHistoricoTac",
            IdPaciente: idPaciente
        },
        dataType: 'JSON',
    }).done(function(respuesta) {
        if (respuesta[0] == false) {
            swal("Esculapio!", "Error!", "error");
            return;
        }   
        try{
            tablaHistoricoTac.destroy();
        }catch(error){}
        var filas = [];
        $.each(respuesta, function(i, value) {
            var boton = '<button plantilla="'+respuesta[i][1]+'" type="submit"  class="btn btn-success " id="verInformeAgenda"> <i class="fa fa-save" aria-hidden="true"></i> Ver Informe</button> ';
            var dataSet = [respuesta[i][0],respuesta[i][1],respuesta[i][2]];
            //tablaHistoricoTac.row.add(dataSet).draw(false);
            filas[i]=dataSet;
        });

        tablaHistoricoTac = $('#HistorioTacAgenda').DataTable({
                                scrollX: true,
                                scrollY: 250,
                                autoWidth: true,    
                                info: false,
                                keys: true,    
                                paginate:false,
                                data:filas,
                                autoWidth: true
                            });

    }).fail(function(jqXHR, textStatus, errorThrown) {
        console.log(errorThrown)
        //location.reload();
    });
}
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
ConstruirTablasAgenda();

$("ul.wysihtml5-toolbar li:nth-child(6)").remove();
$("ul.wysihtml5-toolbar li:nth-child(5)").remove();