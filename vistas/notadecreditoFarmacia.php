<input type="hidden" name="puntoVenta" id = "puntoVenta" value="<?php echo $_SESSION["puntoVenta"]; ?>">
<input type="hidden" name="secuenciaPunto" id ="secuenciaPunto" value="<?php echo $_SESSION["secuencia_nc"]; ?>">
<input type="hidden" name="establecimiento" id ="establecimiento" value="<?php echo $_SESSION["establecimiento"]; ?>">
<input type="hidden" name="puntoEmision" id ="puntoEmision" value="<?php echo $_SESSION["puntoEmision"]; ?>">
<input type="hidden" name="puntoDescuento" id ="puntoDescuento" value="<?php echo $_SESSION["descuento"]; ?>">

<div class="col-md-12">
  <div class="box box-default box-solid" style="height: 200px;">
    <div class="box-header with-border">
      <h3 class="box-title">DATOS DEL CLIENTE</h3>
      <div class="box-tools pull-right col-md-10" >
          
        <div id="DatosPaciente" class="form-group col-md-4" style="visibility: hidden;">
          <label for="happy" class="control-label col-md-6" style="text-align: right; margin-top: -0.4em; ">CONSUMIDOR FINAL</label>
          <div class="col-md-6">
            <div class="input-group">
              <div id="radioBtn" class="btn-group">
                <a id="SiCon" class="btn btn-success btn-sm active" data-toggle="happy" data-title="Y">SI</a>
                <span data-toggle="modal" data-target="#"><a id="NoCon" class="btn btn-success btn-sm notActive" data-toggle="happy" data-title="N">NO</a></span>
              </div>
            </div>
          </div>
        </div>
        <div id="DatosCliente" class="form-group col-md-4" style="margin-left: -4em; visibility: hidden;">
          <label for="happy1" class="control-label col-md-6" style="text-align: right; margin-top: -0.4em;">MISMOS DATOS?</label>
          <div class="col-md-6">
            <div class="input-group">
              <div id="radioBtn" class="btn-group">
                <a id="Si" class="btn btn-success btn-sm active" data-toggle="happy1" data-title="Y">SI</a>
                <span data-toggle="modal" data-target="#modal-datos-cliente"><a id="No" class="btn btn-success btn-sm notActive" data-toggle="happy1" data-title="N">NO</a></span>
              </div>
            </div>
          </div>
        </div>
        <div id="limpiarFactFarmacia" class="pull-right">
          <img src="imagenes/broom.png">
          <strong>Limpiar</strong>
        </div>         
      </div>
    </div>
    <div class="box-body">
      <div class="row invoice-info">
        <div class="col-md-4 invoice-col">
          <strong>Datos del Paciente</strong>
          <address>
            <strong fecha="" data-toggle="modal" data-target="#modal-modificar-paciente" idPaciente="0" id="nombreCompleto" >------</strong><br>
            <span id="cedula" >------</span><br>            
            <span id="telefono" >------</span><br>
            <span id="direccion" >------</span><br>
            <span id="email" >----------</span>
            <span style="display: none;" id="puntoSecuencia" ><?php echo $_SESSION["puntoVentaSecuencia"] ?></span>
          </address>
        </div>
        <!-- /.col -->
        <div class="col-sm-3 invoice-col">
          <strong>Datos del Cliente</strong>
          <select id="cbmTipoIde" disabled>
            <option value="1">Cedula/Ruc</option>
            <option value="2">Pasaporte</option>
          </select>
          <address>
            <strong idCliente="1" id="nombreCompletoCliente" >CONSUMIDOR FINAL</strong><br>
            <span id="cedulaCliente" >9999999999</span><br>
            <span id="direccionCliente" >------</span><br>
            <span id="telefonoCliente" >------</span><br>
            <span id="emailCliente" >------</span>
          </address>
        </div>
        <!-- /.col -->
        <div class="col-md-5 invoice-col" style="margin-top: -1em;">
          <strong  secuencia="<?php echo $_SESSION["establecimiento"]."-".$_SESSION["puntoEmision"]."-".$_SESSION["secuencia_fc"]; ?>" id="SecuenciaFacturaConsulta">FACTURA #: <?php echo $_SESSION["establecimiento"]."-".$_SESSION["puntoEmision"]."-".$_SESSION["secuencia_fc"]; ?> </strong><br>

          <strong secuencia="<?php echo $_SESSION["establecimiento"]."-".$_SESSION["puntoEmision"]."-".$_SESSION["secuencia_nc"]; ?>" id="SecuenciaFacturaConsulta2">NOTA DE CREDITO #: <?php echo $_SESSION["establecimiento"]."-".$_SESSION["puntoEmision"]."-".$_SESSION["secuencia_nc"]; ?> </strong><br>
          <span id="numeroMovimiento" >INGRESO DE BODEGA # 0 </span><br>
          <span id="totalItemsConsulta" >TOTAL DE ITEMS : 0 </span><br>
          <span id="totalDescuentoConsulta" >TOTAL DESCUENTO : $ 00.00</span><br>
          
          <span id="totalCancelarSubtotal" style=" font-size: 14px;">SUBTOTAL : $ 00.00</span><br>
          <span id="totalCancelarIva" style=" font-size: 14px;"> IVA : $ 00.00</span><br>
          
          <span id="totalCancelarConsulta" style="font-weight: bold; font-size: 18px;">TOTAL A CANCELAR : $ 00.00</span><br>
          <span style="display: none;" id="Vendedor" >USUARIO : <?php echo $_SESSION["usuario"]; ?> </span>
          <button id="BuscarFactFarmacia" data-toggle="modal" data-target="#modal-consulta-factura-farmacia" type="button" style="margin-top: -12.30em;" class="btn btn-xs -default pull-right col-md-4" data-backdrop="static"> <i class="fa fa-search" aria-hidden="true" ></i> BUSCAR FACTURA</button>
         
         <button id="BuscarNc"  data-toggle="modal" data-target="#modal-nc"  type="button" style="margin-top: -9em;" class="btn btn-xs btn-primary pull-right col-md-4" data-backdrop="static"> <i class="fa fa-search" aria-hidden="true" ></i> BUSCAR NC(F11)</button>
          
           <button type="button" style="margin-top: -6em;" class="btn btn-xs btn-success pull-right col-md-4" id="CobrarConsulta" data-backdrop="static"> <i class="fa fa-usd" aria-hidden="true" ></i> GUARDAR</button>

           <button type="submit" disabled style="margin-top: -3em;" style="display: none;"  class="btn btn-xs btn-warning pull-right col-md-4"  id="ReimprimirNc"> <i class="fa fa-print" data-backdrop="static"></i> Reimprimir</button>

        </div>
        <!-- /.col -->
      </div>
    </div>
  </div>
</div>



<div class="col-md-12" style="margin-top: -1em;">
  <div class="box box-default box-solid">
    <div class="box-header with-border">
      <h3 class="box-title">DEVOLUCION DE FARMACIA</h3>
      <div class="box-tools pull-right">
        <button type="button" class="btn btn-box-tool" data-widget="collapse"><i class="fa fa-minus"></i></button>
      </div>
    </div>
    <div class="box-body">
      
      <div class="col-md-12" >
        <div class="box box-default">                
          <div class="row">
            <div class="col-md-12 col-sm-12 col-xs-12">
              <div class="x_panel">                          
                <div class="x_content">                           
                  <table id="datatableDetalleFactFarmacia"  width="100%" class="table table-striped table-bordered table-condensed">
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>ITEM</th>
                        <th>PRESENTACION</th>
                        <th>CANTIDAD</th>
                        <th>PRECIO</th>
                        <th>SUBTOTAL</th>
                        <th>IVA</th>
                        <th>DESCUENTO</th>                       
                        <th>TOTAL</th>
                        <th></th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody class="pointer">
                                                                                             
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>



<div class="modal  fade" id="modal-consulta-factura-farmacia" tabindex='-1'>
  <div class="modal-dialog modal-lg">
    <div class="modal-content">
       <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
        <span aria-hidden="true">&times;</span></button>        
      </div>
      <div class="modal-body">
        <div class="box-body">
          <div class="col-md-12">
            <div class="form-group col-md-4">
              <input type="text" class="form-control input-sm input-custom" id="numeroF" name="CÉDULA" placeholder="001-001-0000001">
            </div>
            <div class="form-group col-md-4">
              <input type="text" class="form-control input-sm" id="pacienteF" name="CÉDULA" placeholder="Paciente">
            </div>
            <div class="form-group col-md-4">
              <input type="text" class="form-control input-sm" id="clienteF" name="CÉDULA" placeholder="Cliente">
            </div>
            <div class="x_content">
              <table id="datatableConsultaFacturaFarmacia"  width="100%" class="table table-striped table-bordered table-condensed">
                <thead>
                  <tr>
                    <th>NUMERO</th>
                    <th>PACIENTE</th>
                    <th>CLIENTE</th>
                    <th>FECHA</th> 
                    <th>VALOR</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody class="pointer tablaPerfil">
                  <?php
                    /*$espe = new Con_Bodega();
                    $espe->CargarInventario2();*/
                  ?>
                </tbody>                  
              </table>
            </div>
          </div>
        </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-outline pull-right" data-dismiss="modal">Cerrar</button>
      </div>
    </div>
  </div>
</div>


<div class="modal  fade" id="modal-nc" >
  <div class="modal-dialog modal-lg">
    <div class="modal-content">
       <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
        <span aria-hidden="true">&times;</span></button>        
      </div>
      <div class="modal-body">
        <div class="box-body">
          <div class="col-md-12">            
            <div class="x_content">
              <table id="datatableNotaCredito"  width="100%" class="table table-striped table-bordered table-condensed">
                <thead>
                  <tr>
                    <th>NUMERO NC</th>
                    <th>NUMERO FC</th>
                    <th>PACIENTE</th>
                    <th>CLIENTE</th>
                    <th>FECHA</th> 
                    <th>VALOR</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody class="pointer tablaPerfil">
                  <?php
                    /*$espe = new Con_Bodega();
                    $espe->CargarInventario2();*/
                  ?>
                </tbody>                  
              </table>
            </div>
          </div>
        </div>
      </div>
      <div class="modal-footer">       
        <button type="button" class="btn btn-outline pull-right" data-dismiss="modal">Cerrar</button>
      </div>
    </div>
  </div>
</div>


<script src="js/Js_Farmacia2.js?v=1.1"></script>