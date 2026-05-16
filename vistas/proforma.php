<input type="hidden" name="puntoVenta" id = "puntoVenta" value="<?php echo $_SESSION["puntoVenta"]; ?>">
<input type="hidden" name="secuenciaPunto" id ="secuenciaPunto" value="<?php echo $_SESSION["secuencia_fc"]; ?>">
<input type="hidden" name="establecimiento" id ="establecimiento" value="<?php echo $_SESSION["establecimiento"]; ?>">
<input type="hidden" name="puntoEmision" id ="puntoEmision" value="<?php echo $_SESSION["puntoEmision"]; ?>">
<input type="hidden" name="puntoDescuento" id ="puntoDescuento" value="<?php echo $_SESSION["descuento"]; ?>">

<div class="col-md-12" >
  <div class="box box-default box-solid" style="height: 200px;">
    <div class="box-header with-border">
      <h3 class="box-title">DATOS PROFORMA</h3>
      <div class="box-tools pull-right col-md-10" >
        <div class="col-md-2" style="margin-top: 0.3em;">
          <a id="BuscarPaciente" style="margin-left: 0em;" href="" data-toggle="modal" data-target="#modal-default" ><img src="imagenes/buscarPaci.png" /> Buscar (F1)</a>
        </div>
        <div id="DatosPaciente" class="form-group col-md-4" style="visibility: hidden;">
          <label for="happy" class="control-label col-md-6" style="text-align: right; margin-top: -0.4em; ">CONSUMIDOR FINAL</label>
          <div class="col-md-6">
            <div class="input-group">
              <div id="radioBtn" class="btn-group">
                <a id="SiCon" class="btn btn-success btn-sm active" data-toggle="happy" data-title="Y">SI</a>
                <span><a id="NoCon" class="btn btn-success btn-sm notActive" data-toggle="happy" data-title="N">NO</a></span>
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
                <span data-toggle="modal" data-target="#modal-default2"><a id="No" class="btn btn-success btn-sm notActive" data-toggle="happy1" data-title="N">NO</a></span>
              </div>
            </div>
          </div>
        </div>
        <div id="limpiarFact" class="pull-right" >
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
            <strong fecha="" data-toggle="modal" data-target="#modal-modificar-paciente" idPaciente="0" id="nombreCompleto"  >------</strong><img style="margin-left: 5px;" data-toggle="modal" data-target="#modal-modificar-paciente" id="clickModificar" src="imagenes/lapi.png"><br>
            <span id="cedula"  >------</span><br>            
            <span id="telefono" >------</span><br>
            <span id="direccion" >------</span><br>
            <span id="email" >----------</span><br>
            <span > EDAD DEL PACIENTE: </span>
            <span id="edad" >----</span>
          </address>
        </div>
        <!-- /.col -->
        <div class="col-sm-3 invoice-col">
          <strong>Datos del Cliente  </strong>
          <select id="cbmTipoIde">
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
        <div class="col-md-5 invoice-col">
          <strong secuencia="<?php echo $_SESSION["establecimiento"]."-".$_SESSION["puntoEmision"]."-".$_SESSION["secuencia_fc"]; ?>" id="SecuenciaFacturaConsulta">PROFORMA #: <?php 
            $dao = new Con_Consulta();
            $dao->TotalProformas();
           ?> </strong><br>
          <span id="totalItemsConsulta" >TOTAL DE ITEMS : 0 </span><br>
          <span id="totalDescuentoConsulta" >TOTAL DESCUENTO : $ 00.00</span><br>
          <span id="totalCancelarConsulta" style="font-weight: bold; font-size: 18px;">TOTAL A CANCELAR : $ 00.00</span><br>
          <span id="Vendedor" >USUARIO : <?php echo $_SESSION["usuario"]; ?> </span>
          

          <button  data-toggle="modal" data-target="#modal-consulta-proforma" type="button" style="margin-top: -7em;" class="btn btn-xs btn-default pull-right col-md-4" data-backdrop="static"> <i class="fa fa-search" aria-hidden="true" ></i> BUSCAR PROFORMA</button>
    
          <button id="AnularProforma" type="button" disabled="true" style="margin-top: -4.5em;" class="btn btn-xs btn-danger pull-right col-md-4" data-backdrop="static"> <i class="fa fa-trash-o" aria-hidden="true" ></i> ANULAR PROFORMA</button>
          
          <button disabled type="button" style="margin-top: -2em;" class="btn btn-xs btn-success pull-right col-md-4" id="CobrarProforma"> <i class="fa fa-save" aria-hidden="true" ></i> GUARDAR</button>
          
          <button  type="button" style="margin-top: 1em; display: none;" class="btn btn-xs btn-success pull-right col-md-4" id="ReimprimirProforma" data-backdrop="static"> <i class="fa fa-print" aria-hidden="true" ></i> IMPRIMIR</button>

        <!-- /.col -->
      </div>
    </div>
  </div>
</div>
</div>

<div class="modal fade" id="modal-default" tabindex='1' data-backdrop="static" data-keyboard="false">
  <div class="modal-dialog modal-lg">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
        <span aria-hidden="true">&times;</span></button>
        <h4 class="modal-title">PACIENTES</h4>
      </div>
      <div class="modal-body">        
        <div class="row">
          <div class="col-md-12 col-sm-12 col-xs-12">
            <div class="x_panel">
              <div class="form-group col-md-3">
                <input type="text" class="form-control filtroPacientes" id="cedulaFiltro" autocomplete="off" name="CÉDULA" placeholder="Cédula">
              </div>
              <div class="form-group col-md-3">
                <input type="text" class="form-control filtroPacientes" id="apellidoPFiltro" autocomplete="off" name="CÉDULA" placeholder="Apellido Paterno">
              </div>
              <div class="form-group col-md-3">
                <input type="text" class="form-control filtroPacientes" id="apellidoMFiltro" autocomplete="off" name="CÉDULA" placeholder="Apellido Materno">
              </div>
              <div class="form-group col-md-3">
                <input type="text" class="form-control filtroPacientes" id="nombreFiltro" autocomplete="off" name="CÉDULA" placeholder="Nombre">
              </div>
              <div class="x_content" style="height: 350px;max-height: 350px;overflow-y: auto;overflow-x: auto;">                
                <table id="datatableFactura" cellspacing="0" class="table  table-condensed">                
                  <thead style="font-size: 12px;">                      
                    <tr>
                      <th>ID</th>
                      <th>CÉDULA</th>
                      <th>APELLIDO PATERNO</th>
                      <th>APELLIDO MATERNO</th>
                      <th>NOMBRE</th>                        
                      <th>EMAIL</th>                     
                      <th style="display: none;">DIRECCIÓN</th>                     
                      <th>TÉLEFONO</th>
                      <th>FECHA CREACION</th>
                    </tr>
                  </thead>
                  <tbody style="padding: 0;font-size: 11px;">
                   
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

<div class="modal fade" id="modal-default2" tabindex='2' data-backdrop="static" data-keyboard="false">
  <div class="modal-dialog modal-lg">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
        <span aria-hidden="true">&times;</span></button>
        <h4 class="modal-title">AGREGAR CLIENTE</h4>
      </div>
      <div class="modal-body">
        <div class="box-body">
          <form id="AgregarCliente">
            <div class="form-group col-md-4">
              <label for="Nombre" style="color: red;">CÉDULA</label>
              <input type="text" class="form-control input-sm" autocomplete="off" required id="cedulaCliente" name="CÉDULA" placeholder="CÉDULA">
            </div>
            <div class="form-group col-md-4">                
              <label for="Apellido" style="color: red;">APELLIDOS</label>
              <input type="text" class="form-control input-sm" autocomplete="off" required id="apellidoCliente" name="apellidos" placeholder="Apellido">
            </div>
            <div class="form-group col-md-4">
              <label for="Nombre" style="color: red;">NOMBRES</label>
              <input type="text" class="form-control input-sm" autocomplete="off"  id="nombreCliente" name="nombres" placeholder="Nombre">
            </div>
            <div class="form-group col-md-4">
              <label for="TÉLEFONO Convencional" >TÉLEFONO (OPCIONAL)</label>
              <input type="text" class="form-control input-sm" autocomplete="off"  id="telefonoCliente" name="TÉLEFONO" placeholder="Convencional / Celular">
            </div>
            <div class="form-group col-md-4">
              <label for="Correo ELECTRÓNICO" >CORREO ELECTRÓNICO (OPCIONAL)</label>
              <input type="email" class="form-control input-sm" autocomplete="off"  id="emailCliente" name="correo" placeholder="Correo">
            </div>
            <div class="form-group col-md-4" >                
              <label for="DIRECCIÓN">DIRECCIÓN (OPCIONAL)</label>
              <input type="text" class="form-control input-sm" autocomplete="off"  id="direccionCliente" name="DIRECCIÓN" placeholder="Consultorio / Domicilio">
            </div>
            <button type="submit" disabled id="ModificarCliente" style="margin-right: 1em;" class="btn btn-primary pull-right" > <i class="fa fa-pencil-square"  aria-hidden="true"></i> Modificar</button>
            <button type="submit" id="GuardarCliente" style="margin-right: 1em;" class="btn btn-success pull-right" > <i class="fa fa-plus" aria-hidden="true"></i> Agregar</button>
        </form>
        </div>
        <div class="row">
          <div class="col-md-12 col-sm-12 col-xs-12">
            <div class="x_panel">              
              <div class="x_content">                
                <table id="datatableClienteFactura" width="100%" cellspacing="0" class="table  table-condensed">                
                  <thead>                      
                    <tr>
                      <th>ID</th>
                      <th>CÉDULA</th>
                      <th>APELLIDO PATERNO</th>
                      <th>APELLIDO MATERNO</th>
                      <th>NOMBRES</th>                        
                      <th>EMAIL</th>                     
                      <th>DIRECCIÓN</th>                     
                      <th>TÉLEFONO</th>    
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
      <div class="modal-footer">
        <button type="button" class="btn btn-outline pull-right" data-dismiss="modal">Cerrar</button>     
      </div>
    </div>
  </div>
</div>

<div class="modal  fade" id="modal-consultas" tabindex='3' data-backdrop="static" data-keyboard="false">
  <div class="modal-dialog modal-lg">
    <div class="modal-content">
       <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
        <span aria-hidden="true">&times;</span></button>
        <span class="pull-right" style="font-size: 20px;">TOTAL A FACTURAR <strong id="totalFacturaEstimado">$ 00.00</strong></span>
        <h4 class="modal-title">CONSULTA</h4>        
      </div>
      <div class="modal-body">
        <div class="box-body">
          <div class="col-md-3">
            <h4 class="modal-title">ESPECIALIDAD (F1)</h4>
            <div class="x_content">
              <table id="datatableEspecialidadConsulta" cellspacing="0" class="table  table-condensed">
                <thead>
                  <tr>
                    <th>ESPECIALIDAD</th>                 
                  </tr>
                </thead>
                <tbody class="pointer tablaPerfil">
                     <?php
                     $espe = new Con_Especialidad();                     
                    ?>
                </tbody>                  
              </table>
            </div>
          </div>
          <div class="col-md-4">
            <h4 class="modal-title">PROCEDIMIENTOS (F2)</h4>
            <div class="x_content">
              <table id="datatableProcedimientoConsulta" cellspacing="0" class="table  table-condensed">
                <thead>
                  <tr>
                    <th>PROCEDIMIENTO</th>
                    <th>PRECIO $</th>
                    <th></th>               
                  </tr>
                </thead>
                <tbody class="pointer tablaPerfil">
                
                </tbody>                  
              </table>
            </div>
          </div>
          <div class="col-md-5">
            <h4 class="modal-title">DOCTOR (F3)</h4>
            <div class="x_content">
              <table id="datatableDoctoresProcedimientosFact" cellspacing="0" class="table  table-condensed">
                <thead>
                  <tr>
                    <th></th>
                    <th>MÉDICO</th>                    
                    <th></th>                              
                    <th></th>            
                  </tr>
                </thead>
                <tbody class="pointer tablaPerfil">
                  
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

<div class="modal fade" id="modal-laboratorio" tabindex='4' data-backdrop="static" data-keyboard="false">
  <div class="modal-dialog modal-lg">
    <div class="modal-content">
       <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
        <span aria-hidden="true">&times;</span></button>
        <h4 class="modal-title">
          <span id="totalPacientesLab" class="col-md-2" style="font-size: 15px;">TOTAL DE PACIENTE 0</span>
        <span id="totalProcesadosLab" class="col-md-2" style="font-size: 15px;">TOTAL ATENDIDOS 0</span>
        <span id="totalPendientesLab" class="col-md-2" style="font-size: 15px;">TOTAL PENDIENTES 0</span>
        </h4>
        
        <span class="pull-right" style="font-size: 20px;">TOTAL A FACTURAR <strong id="totalFacturaEstimado">$ 00.00</strong></span>
      </div>
      <div class="modal-body">
        <div class="box-body">
          <div class="col-md-4">
            <h4 class="modal-title">GRUPO DE EXAMENES (F1)</h4>
            <div class="x_content">
              <table id="datatableGrupoExamenConsulta" cellspacing="0" class="table  table-condensed">
                <thead>
                  <tr>
                    <th>ORDEN</th> 
                    <th>GRUPO</th>                                  
                  </tr>
                </thead>
                <tbody class="pointer tablaPerfil">
                     <?php
                       $espe = new Con_Laboratorio();
                       $espe->CargarExamenesConsulta();
                    ?>
                </tbody>                  
              </table>
            </div>
          </div>
          <div class="col-md-4">
            <h4 class="modal-title">PROCEDIMIENTOS (F2)</h4>
            <div class="x_content">
              <table id="datatableProcedimientoLaboratorioConsulta" cellspacing="0" class="table  table-condensed">
                <thead>
                  <tr>
                    <th>PROCEDIMIENTO</th>
                    <th>$</th>
                    <th></th> 
                    <th>Grupo</th>               
                  </tr>
                </thead>
                <tbody class="pointer tablaPerfil">
                  <?php
                      // $espe = new Con_Laboratorio();
                      // $espe->CargarProcedimientosConsulta();
                    ?>
                </tbody>                  
              </table>
            </div>
          </div>
        <div class="col-md-4">
            <h4 class="modal-title">PROCEDIMIENTOS A FACTURAR (F3)</h4>
            <div class="x_content">
              <table id="datatableProcedimientosAFacturarConsulta" cellspacing="0" class="table  table-condensed">
                <thead>
                  <tr>
                    <th>PROCEDIMIENTO</th>
                    <th>$</th>                                
                  </tr>
                </thead>
                <tbody class="pointer tablaPerfil">
                
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

<div class="modal fade" id="modal-horario" tabindex='5' data-backdrop="static" data-keyboard="false">
  <div class="modal-dialog">
    <div class="modal-content">
       <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
        <span aria-hidden="true">&times;</span></button>
        <h4 class="modal-title">CALENDARIO</h4>
      </div>
      <div class="modal-body">
        <div class="row" id="HorarioDoctorFact" style="padding-right: 2em;padding-left: 2em;padding-bottom: 2em;">
          <div id="calendar"></div>
        </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-outline pull-right" data-dismiss="modal">Cerrar</button>      
      </div>
    </div>
  </div>
</div>

<div class="modal fade" id="modal-horario-laboratorio" tabindex='6' data-backdrop="static" data-keyboard="false">
  <div class="modal-dialog">
    <div class="modal-content">
       <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
        <span aria-hidden="true">&times;</span></button>
        <h4 class="modal-title">CALENDARIO</h4>
      </div>
      <div class="modal-body">
        <div class="row" id="HorarioDoctorFact" style="padding-right: 2em;padding-left: 2em;padding-bottom: 2em;">
          <div id="calendar2"></div>
        </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-outline pull-right" data-dismiss="modal">Cerrar</button>    
      </div>
    </div>
  </div>
</div>


<div class="modal fade" id="modal-rx" tabindex='7' data-backdrop="static" data-keyboard="false">
  <div class="modal-dialog modal-lg">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
        <span aria-hidden="true">&times;</span></button>
        <span class="pull-right" style="font-size: 20px;">TOTAL A FACTURAR <strong id="totalFacturaEstimado">$ 00.00</strong></span>
        <h4 class="modal-title">RX</h4>        
      </div>
      <div class="modal-body">
        <div class="box-body">
          <div class="col-md-4">
            <h4 class="modal-title">GRUPO DE EXAMENES (F1)</h4>
            <div class="x_content">
              <table id="datatableGrupoRxConsulta" cellspacing="0" class="table  table-condensed">
                <thead>
                  <tr>
                    <th>ORDEN</th> 
                    <th>GRUPO</th>                                  
                  </tr>
                </thead>
                <tbody class="pointer tablaPerfil">
                  <?php
                    $espe = new Con_Rx();
                    $espe->CargarExamenesConsulta();
                  ?>
                </tbody>                  
              </table>
            </div>
          </div>
          <div class="col-md-4">
            <h4 class="modal-title">PROCEDIMIENTOS (F2)</h4>
            <div class="x_content">
              <table id="datatableProcedimientoRxConsulta" cellspacing="0" class="table  table-condensed">
                <thead>
                  <tr>
                    <th>PROCEDIMIENTO</th>
                    <th>$</th>
                    <th></th> 
                    <th>Grupo</th>               
                  </tr>
                </thead>
                <tbody class="pointer tablaPerfil">
                  
                </tbody>                  
              </table>
            </div>
          </div>
          <div class="col-md-4">
            <h4 class="modal-title">TECNOLOGOS (F3)</h4>
            <div class="x_content">
              <table id="datatableTecnologosConsulta" cellspacing="0" class="table  table-condensed">
                <thead>
                  <tr>                    
                    <th></th>
                    <th>MÉDICO</th>
                    <th></th>                    
                    <th></th>            
                  </tr>
                </thead>
                <tbody class="pointer tablaPerfil">
                
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


<div class="modal fade" id="modal-horario-rx" tabindex='5' data-backdrop="static" data-keyboard="false">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
        <span aria-hidden="true">&times;</span></button>
        <h4 class="modal-title">CALENDARIO</h4>
      </div>
      <div class="modal-body">
        <div class="row" id="HorarioDoctorFact" style="padding-right: 2em;padding-left: 2em;padding-bottom: 2em;">
          <div id="calendar3"></div>
        </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-outline pull-right" data-dismiss="modal">Cerrar</button>      
      </div>
    </div>
  </div>
</div>

<div class="modal  fade" id="modal-cobrar" tabindex='9' data-backdrop="static" data-keyboard="false">
  <div class="modal-dialog modal-lg">
    <div class="modal-content" style="width: 60%; margin-left: 25%">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
        <span aria-hidden="true">&times;</span></button>
        <h4 class="modal-title">COBRAR</h4>
      </div>
      <div class="modal-body">
        <h4>TOTAL A CANCELAR <span class="pull-right" id="totalPagarCobrar">$ 00.00</span></h4>
        <h4>TOTAL COBRADO <span class="pull-right" id="totalCobradoCobrar">$ 00.00</span></h4>
        <h4>TOTAL CAMBIO <span class="pull-right" id="CambioConsulta">$ 00.00</span></h4>
        
        <div class="box box-body box-default">
                        

            <div class="col-md-12 formaPago">
              <div class="col-md-12 efectivo">
                <label>TOTAL EN EFECTIVO</label>
                <input type="number" class="form-control col-md-4"  autocomplete="off" id="ValorRecibidoConsulta" placeholder="EFECTIVO">
              </div>
              <div class="col-md-12 fpcheque">
                <label class="form-control">TOTAL EN CHEQUE <i class="fa fa-plus pointer cheque" aria-hidden="true" ></i>
                <span class="pull-right" id="totalCheque">$ 00.00</span></label>
                
                  <div id="ccheque" style="display: none;"> 
                    
                    <div class="form-group col-md-4">
                        <label for="Nombre">BANCO</label>
                        <select id="banco" class="selectpicker show-tick form-control input-sm" data-live-search="true">
                          <option value="0">Seleccionar..</option>
                            <?php
                              $banco = new Con_Banco();
                              $banco->LlenarComboBanco();
                            ?>
                        </select>
                      </div>

                      <div class="form-group col-md-4">
                        <label for="Nombre">NUMERO DE CHEQUE</label>
                        <input type="number" required class="form-control input-sm" autocomplete="off" id="NumeroCheque" >
                      </div>
                      <div class="form-group col-md-4">
                        <label for="Nombre">NUMERO DE CUENTA</label>
                        <input type="number" required class="form-control input-sm" autocomplete="off" id="CuentaCheque" >
                      </div>
                      <div class="form-group col-md-4">
                        <label for="Nombre">FECHA DE COBRO</label>
                        <input type="date" value="<?php echo date("Y-m-d");?>" required autocomplete="off" class="form-control input-sm" id="FechaCheque" >
                      </div>
                      <div class="form-group col-md-4">
                        <label for="Nombre">VALOR</label>
                        <input type="number" required class="form-control input-sm" autocomplete="off" id="ValorCheque" >
                      </div>
                      <div class="form-group col-md-4">
                        <label for="Nombre">REFERENCIA</label>
                        <input type="text" required class="form-control input-sm"  autocomplete="off" id="ReferenciaCheque" >
                      </div>
                  </div>
              </div>
              <div class="col-md-12 fptransferencias">
                <label class="form-control">TOTAL EN TRANSFERENCIA <i class="fa fa-plus pointer transferencia" aria-hidden="true" ></i>
                <span class="pull-right" id="totalTransfencia">$ 00.00</span></label>
                
                  <div id="ctransferencia" style="display: none;"> 
                    
                    <div class="form-group col-md-4">
                        <label for="Nombre">BANCO</label>
                        <select id="bancoTrans" class="selectpicker show-tick form-control input-sm" data-live-search="true">
                          <option value="0">Seleccionar..</option>
                            <?php
                              $banco = new Con_Banco();
                              $banco->LlenarComboBanco();
                            ?>
                        </select>
                      </div>

                      <div class="form-group col-md-4">
                        <label for="Nombre">AGENCIA</label>
                        <input type="text" required class="form-control input-sm" autocomplete="off" id="AgenciaTrans" >
                      </div>                      
                      <div class="form-group col-md-4">
                        <label for="Nombre">FECHA DE DEPOSITO</label>
                        <input type="date" value="<?php echo date("Y-m-d");?>" required autocomplete="off" class="form-control input-sm" id="FechaTransferencia" >
                      </div>
                      <div class="form-group col-md-4">
                        <label for="Nombre">MONTO</label>
                        <input type="number" required class="form-control input-sm" autocomplete="off" id="ValorTrasferencia" >
                      </div>
                      <div class="form-group col-md-4">
                        <label for="Nombre">OBSERVACIONES</label>
                        <input type="text" required class="form-control input-sm"  autocomplete="off" id="ObsevacionTransferencia" >
                      </div>
                  </div>
              </div>
              <div class="col-md-12 fptarjeta">
                <label class="form-control">TOTAL EN TARJETA DE CREDITO  <i class="fa fa-plus pointer tarjeta" aria-hidden="true" ></i>
                <span id="totalTarjeta" class="pull-right">$ 00.00</span></label>
                  
                  <div id="ctarjeta" style="display: none;"> 
                    
                    <div class="form-group col-md-4" >
                        <label for="Nombre">ENTIDAD</label>
                        <select id="EntidadTarjeta" class="selectpicker show-tick form-control input-sm" data-live-search="true">
                          <option value="0">Seleccionar..</option>
                            <?php
                              $banco = new Con_Banco();
                              $banco->LlenarComboBanco2();
                            ?>
                        </select>
                     </div>
                       <div class="form-group col-md-4" style="display: none;">
                          <label for="Nombre">FECHA DE VENCIMIENTO</label>
                          <input type="date" value="<?php echo date("Y-m-d");?>" required class="form-control input-sm" autocomplete="off" id="FechaTarjeta" >
                        </div>
                        <div class="form-group col-md-4">
                              <label for="Nombre">NUMERO DE TARJETA</label>
                              <input type="number" required class="form-control input-sm" autocomplete="off" id="NumeroTarjeta" >
                        </div>
                        <div class="form-group col-md-4">
                              <label for="Nombre">NUMERO DE VOUCHER</label>
                              <input type="number" required class="form-control input-sm" autocomplete="off" id="NumeroVoucher" >
                        </div>
                        <div class="form-group col-md-4">
                            <label for="Nombre">VALOR COBRO</label> 
                            <input type="number" required class="form-control input-sm" autocomplete="off" id="ValorTarjeta" >
                        </div>
                         <div class="form-group col-md-4" style="display: none;">
                            <label for="Nombre">RECARGO</label>
                            <select id="RecargoTarjeta" class="selectpicker show-tick form-control input-sm" data-live-search="true">
                              <option value="5">5</option>
                              <option value="6">6</option>
                              <option value="7">7</option>
                              <option value="8">8</option>
                                
                            </select>
                         </div>
                  

                  </div>
              </div>
              <div class="col-md-12 fpcredito">
                <label class="form-control">CUENTAS POR COBRAR <i class="fa fa-plus pointer credito" aria-hidden="true" ></i>
                <span id="totalCredito" class="pull-right">$ 00.00</span></label>
                
                  <div id="ccredito" style="display: none;"> 
                    
                    
                      <div class="col-md-3">
                              <label for="Nombre">PERIODO</label>
                                <select id="cbmPeriodoOdont" class="selectpicker show-tick form-control input-sm" data-live-search="true">
                                  <option value="3">MENSUAL</option>
                                  <option value="2">QUINCENAL</option>
                                  <option value="1">SEMANAL</option>                                                                    
                                </select>
                            </div>
                            
                            <div class="col-md-3">
                              <label for="Nombre">FECHA INICIO</label>
                                <input type="date" value="<?php echo date("Y-m-d");?>" id="FechaInicio"  autocomplete="off" class="form-control" name="">
                            </div>
                            <div class="col-md-3">
                                <label for="Nombre">MONTO TOTAL $</label>
                                <input type="number" step="any" class="form-control input-sm" id="montoT" autocomplete="off" name="precio">
                            </div>
                            <div class="col-md-3">
                                <label for="Nombre">DIVIDENDO</label>
                                <input type="number" min="1" value="1" disabled step="any" class="form-control input-sm" id="Pagos" autocomplete="off" name="precio">
                            </div>

                            <div class="col-md-12" style="margin-top: 2em;">
                              <table id="datatablePagos" cellspacing="0" class="table  table-condensed">
                                <thead>
                                  <tr>
                                    <th>PAGO</th>
                                    <th>$ MONTO</th>
                                    <th>FECHA DE PAGO</th>
                                  </tr>
                                </thead>
                                <tbody class="pointer tablaPerfil">
                                  <?php
                                      //$espe = new Con_Laboratorio();
                                      //espe->CargarProcedimientosConsulta();
                                  ?>
                                </tbody>                  
                              </table>

                            </div>
                  

                  </div>
              </div>
              <div class="col-md-12" id="DivAnticipo" style="display: none;">
                <label class="form-control">ANTICIPO <i class="fa fa-plus pointer anticipo" aria-hidden="true" ></i>
                <span id="totalAnticipo" class="pull-right">$ 00.00</span></label>
                <div id="aanticipo" style="display: none;"> 
                  <div class="col-md-12" style="margin-top: 2em;">
                    <table id="datatableAnticipo" cellspacing="0" class="table  table-condensed">
                      <thead>
                        <tr>
                          <th>VALOR</th>
                          <th>FECHA REGISTRO</th>
                          <th>INGRESAR</th>
                          <th>TODO</th>
                        </tr>
                      </thead>
                      <tbody class="pointer tablaPerfil">
                                  <?php
                                      //$espe = new Con_Laboratorio();
                                      //espe->CargarProcedimientosConsulta();
                                  ?>
                      </tbody>                  
                    </table>
                  </div>
                </div>
              </div>       
            </div>
          </div>
        
      </div>
      <div class="modal-footer">
        <button type="button" style="margin-top: 0.30em;" class="btn btn-success pull-right" id="CobrarProformaCobrar"> <i class="fa fa-usd" aria-hidden="true"></i> Cobrar</button>
      </div>
    </div>
  </div>
</div>

<div class="modal fade" id="modal-eco" tabindex='10' data-backdrop="static" data-keyboard="false">
  <div class="modal-dialog modal-lg">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
        <span aria-hidden="true">&times;</span></button>
        <span class="pull-right" style="font-size: 20px;">TOTAL A FACTURAR <strong id="totalFacturaEstimado">$ 00.00</strong></span>
        <h4 class="modal-title">ECOGRAFIA</h4>
        
      </div>
      <div class="modal-body">
        <div class="box-body">
          <div class="col-md-4">
            <h4 class="modal-title">GRUPO DE EXAMENES (F1)</h4>
            <div class="x_content">
              <table id="datatableGrupoEcoConsulta" cellspacing="0" class="table  table-condensed">
                <thead>
                  <tr>
                    <th>ORDEN</th> 
                    <th>GRUPO</th>                                  
                  </tr>
                </thead>
                <tbody class="pointer tablaPerfil">
                  <?php
                    $espe = new Con_Eco();
                    $espe->CargarExamenesConsulta();
                  ?>
                </tbody>                  
              </table>
            </div>
          </div>
          <div class="col-md-4">
            <h4 class="modal-title">PROCEDIMIENTOS (F2)</h4>
            <div class="x_content">
              <table id="datatableProcedimientoEcoConsulta" cellspacing="0" class="table  table-condensed">
                <thead>
                  <tr>
                    <th>PROCEDIMIENTO</th>
                    <th>$</th>
                    <th></th> 
                    <th>Grupo</th>               
                  </tr>
                </thead>
                <tbody class="pointer tablaPerfil">
                  
                </tbody>                  
              </table>
            </div>
          </div>
          <div class="col-md-4">
            <h4 class="modal-title">TECNOLOGOS (F3)</h4>
            <div class="x_content">
              <table id="datatableTecnologosEcoConsulta" cellspacing="0" class="table  table-condensed">
                <thead>
                  <tr>                    
                    <th></th>
                    <th>MÉDICO</th>
                    <th></th>                    
                    <th></th>                        
                  </tr>
                </thead>
                <tbody class="pointer tablaPerfil">
                
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

<div class="modal fade" id="modal-horario-eco" tabindex='11' data-backdrop="static" data-keyboard="false">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
        <span aria-hidden="true">&times;</span></button>
        <h4 class="modal-title">CALENDARIO</h4>
      </div>
      <div class="modal-body">
        <div class="row" id="HorarioDoctorFact" style="padding-right: 2em;padding-left: 2em;padding-bottom: 2em;">
          <div id="calendar4"></div>
        </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-outline pull-right" data-dismiss="modal">Cerrar</button>     
      </div>
    </div>
  </div>
</div>

<div class="modal fade" id="modal-tac" tabindex='12' data-backdrop="static" data-keyboard="false">
  <div class="modal-dialog modal-lg">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
        <span aria-hidden="true">&times;</span></button>
        <span class="pull-right" style="font-size: 20px;">TOTAL A FACTURAR <strong id="totalFacturaEstimado">$ 00.00</strong></span>
        <h4 class="modal-title">TOMOGRAFIA</h4>        
      </div>
      <div class="modal-body">
        <div class="box-body">
          <div class="col-md-4">
            <h4 class="modal-title">GRUPO DE EXAMENES (F1)</h4>
            <div class="x_content">
              <table id="datatableGrupoTacConsulta" cellspacing="0" class="table  table-condensed">
                <thead>
                  <tr>
                    <th>ORDEN</th> 
                    <th>GRUPO</th>                                  
                  </tr>
                </thead>
                <tbody class="pointer tablaPerfil">
                  <?php
                    $espe = new Con_Tac();
                    $espe->CargarExamenesConsulta();
                  ?>
                </tbody>                  
              </table>
            </div>
          </div>
          <div class="col-md-4">
            <h4 class="modal-title">PROCEDIMIENTOS (F2)</h4>
            <div class="x_content">
              <table id="datatableProcedimientoTacConsulta" cellspacing="0" class="table  table-condensed">
                <thead>
                  <tr>
                    <th>PROCEDIMIENTO</th>
                    <th>$</th>
                    <th></th> 
                    <th>Grupo</th>               
                  </tr>
                </thead>
                <tbody class="pointer tablaPerfil">
                  
                </tbody>                  
              </table>
            </div>
          </div>
          <div class="col-md-4">
            <h4 class="modal-title">TECNOLOGOS (F3)</h4>
            <div class="x_content">
              <table id="datatableTecnologosTacConsulta" cellspacing="0" class="table  table-condensed">
                <thead>
                  <tr>                    
                    <th></th>
                    <th>MÉDICO</th>
                    <th></th>                    
                    <th></th>       
                  </tr>
                </thead>
                <tbody class="pointer tablaPerfil">
                
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

<div class="modal fade" id="modal-horario-tac" tabindex='13' data-backdrop="static" data-keyboard="false">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
        <span aria-hidden="true">&times;</span></button>
        <h4 class="modal-title">CALENDARIO</h4>
      </div>
      <div class="modal-body">
        <div class="row" id="HorarioDoctorFact" style="padding-right: 2em;padding-left: 2em;padding-bottom: 2em;">
          <div id="calendar5"></div>
        </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-outline pull-right" data-dismiss="modal">Cerrar</button>     
      </div>
    </div>
  </div>
</div>

<div class="col-md-12" style="margin-top: -1em;">
  <div class="box box-default box-solid">
    <div class="box-header with-border">
      <h3 class="box-title">PROFORMA DE CONSULTA Y SERVICIOS MÉDICOS</h3>
      <div class="box-tools pull-right">
        <button type="button" class="btn btn-box-tool" data-widget="collapse"><i class="fa fa-minus"></i></button>
      </div>
    </div>
    <div class="box-body">
      <div class="col-md-12" style="margin-bottom:1em;">
        <div class="col-md-2" >
          <button id="consultasFactura" type="button" class="btn btn-default especialidades" tipo="1" data-toggle="modal" data-target="#modal-consultas"> <img src="imagenes/doctor.png" /> C.EXTERNA (F2)</button> 
        </div>
        <div class="col-md-2" style="margin-right: 2em">
          <button id="estomatologiaFactura" type="button" class="btn btn-default especialidades" tipo="13" data-toggle="modal" data-target="#modal-consultas"> <img src="imagenes/diente.png" /> ESTOMATOLOGIA(F3)</button> 
        </div>
        <div class="col-md-2" style="margin-right: 3.5em">
          <button id="serviciosFactura" type="button" class="btn btn-default especialidades" tipo="14" data-toggle="modal" data-target="#modal-consultas"> <img src="imagenes/heart.png" /> SERVICIOS MÉDICOS (F4)</button> 
        </div>
        <div class="col-md-2" style="margin-right: 1em">
          <button id="laboratorioFactura" type="button" class="btn btn-default" data-toggle="modal" data-target="#modal-laboratorio"> <img src="imagenes/laboratorio.png" /> LABORATORIO (F5)</button> 
        </div>
        <div class="col-md-1" style="margin-right: 2em">
          <button id="rxfacutura" type="button" data-toggle="modal" data-target="#modal-rx" class="btn btn-default" id="modalRx"> <img src="imagenes/rdx.png" /> RX (F6)</button> 
        </div>
        <div class="col-md-1" >
          <button id="ecoFactura" type="button" data-toggle="modal" data-target="#modal-eco" class="btn btn-default" id="modalEco"> <img src="imagenes/ecoo.png" /> ECO (F7)</button> 
        </div>
      </div>

      <div class="col-md-12" style="margin-bottom:1em;">                
        <div class="col-md-2" >
          <button id="tamoFactura" type="button" class="btn btn-default" data-toggle="modal" data-target="#modal-tac" id="modalTac"> <img src="imagenes/tomo.png" /> TAC/RMN (F8)</button> 
        </div>

        <div class="col-md-3 cbmMedicoReferente" style="margin-bottom:1em; display: none;" >
        
                  <select id="cbmMedicoReferente" class="selectpicker show-tick form-control input-sm" title="MEDICO REFERENTE" data-live-search="true">
                                  <option value="0">Seleccionar..</option>
                                  <?php
                                    $banco = new Con_Banco();
                                    $banco->LlenarComboReferente();
                                  ?>
                  </select>
        </div>

      </div>
      <div class="col-md-12" >
        <div class="box box-default">                
          <div class="row">
            <div class="col-md-12 col-sm-12 col-xs-12">
              <div class="x_panel">                          
                <div class="x_content">                           
                  <table id="datatableDetalleFact" cellspacing="0" class="table  table-condensed">
                    <thead>
                      <tr>
                        <th>Id</th>
                        <th>ITEM</th>
                        <th>MÉDICO</th>
                        <th>FECHA ATENCION</th>
                        <th>TURNO</th>
                        <th>PRECIO</th>
                        <th>DESCUENTO</th>                            
                        <th>SUBTOTAL</th>
                        <th></th>
                        <th>Orden</th>
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


<div class="modal fade" id="modal-modificar-paciente" tabindex='14' data-backdrop="static" data-keyboard="false">
  <div class="modal-dialog modal-lg">
    <div class="modal-content" style="">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span></button>
        <h4 class="modal-title">DATOS PACIENTE</h4>
      </div>
      <div class="modal-body">
        <div class="box box-default">
          <form role="form" method="post" id="ModificarPacienteFact">
                      <div class="box-body">
                        <div class="form-group col-md-4">
                          <label for="Nombre">CÉDULA / PASAPORTE</label>
                          <input type="text"  class="form-control input-sm" autocomplete="off" id="CedulaModificarPaciente" name="CÉDULAAdmi" placeholder="CÉDULA/PASAPORTE">
                        </div>
                        <div class="form-group col-md-4">
                          <label for="Nombre">APELLIDO PATERNO</label>
                          <input type="text"  class="form-control input-sm" autocomplete="off" required id="ApellidoPModificarPaciente" name="apellidoAdmi" placeholder="APELLIDO PATERNO">
                        </div>
                        <div class="form-group col-md-4">
                          <label for="Nombre">APELLIDO MATERNO</label>
                          <input type="text"  class="form-control input-sm" autocomplete="off" id="ApellidoMModificarPaciente" name="apellidoAdmi" placeholder="APELLIDO MATERNO">
                        </div>
                        <div class="form-group col-md-4">
                          <label for="Nombre">NOMBRES</label>
                          <input type="text"  class="form-control input-sm" autocomplete="off" required id="NombreModificarPaciente" name="nombreAdmi" placeholder="NOMBRES">
                        </div>
                        <div class="form-group col-md-4">                
                          <label for="Fecha Nacimiento">FECHA NACIMIENTO</label>
                          <input type="date"  class="form-control input-sm" autocomplete="off" id="FechaModificarPaciente" name="fechaAdmi">
                        </div>
                        <div class="form-group col-md-4">
                          <label for="Nombre">DIRECCIÓN</label>
                          <input type="text"  class="form-control input-sm" autocomplete="off" id="DireccionModificarPaciente" name="DIRECCIÓNAdmi" placeholder="DIRECCIÓN">
                        </div>                  

                        <div class="form-group col-md-4">
                          <label for="Nombre">CANTON</label>
                          <select id="CantonModificarPaciente"  name="estadoDepa" class="selectpicker show-tick form-control input-sm" data-live-search="true">
                            <option value="0">SELECCIONAR..</option>
                            <?php
                                  $TipoServicio = new Con_Paciente();
                                  $TipoServicio->LlenarDataListCanton();
                            ?>
                          </select>
                        </div>

                        <div class="form-group col-md-4">
                          <label for="Nombre">TÉLEFONO</label>
                          <input type="text"  class="form-control input-sm" autocomplete="off" id="TelefonoModificarPaciente" name="TÉLEFONOAdmi" placeholder="FIJO O CELULAR...">
                        </div>
                        <div class="form-group col-md-4">
                          <label for="Correo ELECTRÓNICO">CORREO ELECTRÓNICO</label>
                          <input type="email"  class="form-control input-sm" autocomplete="off" required id="CorreoModificarPaciente" value="<?php echo $_SESSION["correoBasura"]; ?>" name="correoAdmi" placeholder="CORREO">
                           </div>
                           <div class="form-group col-md-4">
                          <label for="Nombre">ESTADO CIVIL</label>
                          <select id="EstadoCivilModificarPaciente"  name="ProvinciaAdmi" class="selectpicker show-tick form-control input-sm" data-live-search="true">
                            <option value="0">Seleccionar..</option>
                            <option value="SOLTERO/A">SOLTERO/A</option>
                            <option value="CASADO/A">CASADO/A</option>
                            <option value="UNIDO/A">UNIDO/A</option>
                            <option value="DIVORCIADO/A">DIVORCIADO/A</option>
                            <option value="VIUDO/A">VIUDO/A</option>
                            </select>
                        </div>
                        <div class="form-group col-md-4">
                          <label for="Nombre">OCUPACION</label>
                          <input type="text"  class="form-control input-sm" autocomplete="off" id="OcupacionModificarPaciente" name="ocupacionAdmi" placeholder="OCUPACION">
                        </div>
                        <div class="form-group col-md-2">
                          <label for="Nombre">IDENTIDAD DE GENERO</label>
                          <select id="Genero2"  name="Genero" class="selectpicker show-tick form-control input-sm" data-live-search="true">
                            <option value="0">Seleccionar..</option>
                              <?php
                                $TipoServicio = new Con_consultaAmbu();
                                $TipoServicio->LlenarComboTipoGene2();
                               ?>
                          </select>
                        </div> 
                        <div class="form-group col-md-2">
                          <label for="Nombre">EDAD</label>
                          <input type="text" class="form-control input-sm" autocomplete="off" disabled id="EdadModificarPaciente" name="" placeholder="EDAD">
                        </div>
                     </div>
                      <!-- /.box-body -->
                      <div class="box-footer">                        
                        <button type="reset" class="btn btn-info" id="LimpiarDatosFact"> <i class="fa fa-refresh" aria-hidden="true"></i> Limpiar</button>  
                        <button type="submit" id="GuardarModificarPaciente" class="btn btn-success " disabled><i class="fa fa-floppy-o" aria-hidden="true"></i> Guardar(F10)</button>                
                        <button type="submit" id="ModificarPaciente" class="btn btn-primary" disabled><i class="fa fa-pencil-square" aria-hidden="true"></i> Modificar(F11)</button>
                      </div>

                    </form>
        </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-outline pull-right" data-dismiss="modal">Cerrar</button>  
      </div>
    </div>
  </div>
</div>

<div class="modal  fade" id="modal-consulta-proforma" tabindex='15' data-backdrop="static" data-keyboard="false">
  <div class="modal-dialog modal-lg">
    <div class="modal-content">
       <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
        <span aria-hidden="true">&times;</span></button>        
        <h4>PROFORMAS REGISTRADAS</h4>
      </div>
      <div class="modal-body">
        <div class="box-body">
          <div class="col-md-12">
            <div class="form-group col-md-4">
              <input type="text" class="form-control input-sm input-custom" autocomplete="off" id="numeroPF" name="CÉDULA" placeholder="001-001-0000001">
            </div>
            <div class="form-group col-md-4">
              <input type="text" class="form-control input-sm" id="pacientePF" autocomplete="off" name="CÉDULA" placeholder="Paciente">
            </div>
            <div class="form-group col-md-4">
              <input type="text" class="form-control input-sm" id="clientePF" autocomplete="off" name="CÉDULA" placeholder="Cliente">
            </div>
            <div class="x_content">
              <table id="datatableConsultaProforma" width="100%" cellspacing="0" class="table nowrap table-condensed">
                <thead>
                  <tr>
                    <th>NUMERO</th>
                    <th>PACIENTE</th>
                    <th>CLIENTE</th>
                    <th>FECHA</th> 
                    <th>VALOR</th>
                    <th></th>
                    <th>MODIFICAR</th>
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

<div class="modal  fade" id="modal-consulta-orden" tabindex='16' data-backdrop="static" data-keyboard="false">
  <div class="modal-dialog modal-lg">
    <div class="modal-content">
       <div class="modal-header">
        <label>CONSULTA DE ORDENES DE LAB - ECO - RX - TAC/RMN</label>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
        <span aria-hidden="true">&times;</span></button>        
      </div>
      <div class="modal-body">
        <div class="box-body">
          <div class="col-md-12">
            <div class="form-group col-md-4">
              <input type="text" class="form-control input-sm" autocomplete="off" id="numeroO" placeholder="10">
            </div>
            <div class="form-group col-md-4">
              <input type="text" class="form-control input-sm" autocomplete="off" id="pacienteO"  placeholder="Paciente">
            </div>
            <div class="x_content">
              <table id="datatableConsultaOrden" width="100%" cellspacing="0" class="table nowrap table-condensed">
                <thead>
                  <tr>
                    <th>NUMERO</th>
                    <th>PACIENTE</th>
                    <th>FECHA</th>
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

<div class="modal  fade" id="modal-reservaciones" tabindex='17' data-backdrop="static" data-keyboard="false">
  <div class="modal-dialog modal-lg">
    <div class="modal-content">
       <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
        <span aria-hidden="true">&times;</span></button>        
        <h4>RESERVACIONES</h4>
      </div>
      <div class="modal-body">
        <div class="box-body">
          <div class="col-md-12">

            <div class="form-group col-md-4" >    
                <label for="Nombre">FECHA DESDE </label>                      
                <input class="form-control input-sm"  type="date" id="fechaDesdeRe" value="<?php echo date("Y-m-d");?>">
            </div>
            <div class="form-group col-md-4" >    
                <label for="Nombre">FECHA HASTA</label>                      
                <input class="form-control input-sm"  type="date" id="fechaHastaRe" value="<?php echo date("Y-m-d");?>">
            </div>

            <div class="x_content">
              <table id="datatableReservaciones" width="100%" cellspacing="0" class="table nowrap table-condensed">
                <thead>
                  <tr>
                    <th>PACIENTE</th>
                    <th>FECHA</th> 
                    <th>CONSULTORIO</th>
                    <th>ESPECIALIDAD</th>
                    <th>PROCEDIMIENTO</th>
                    <th>MEDICO</th>
                  </tr>
                </thead>
                <tbody class="pointer tablaPerfil">
                   
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

<script src="js/Js_Proforma.js?v=0.1"></script>
<script src="js/Js_CargarProformaConsulta.js?v=0.1"></script>
<script src="js/Js_FacturacionLab.js?v=1.5"></script> 
<script src="js/Js_FacturaRx.js?v=1.1"></script> 
<script src="js/Js_FacturaEco.js?v=1.2"></script> 
<script src="js/Js_FacturaTac.js?v=1.1"></script> 



