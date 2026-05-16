
    <!-- Main content -->
    <section class="content">
      <!-- Info boxes -->
      <div class="row">
        <div class="col-md-3 col-sm-6 col-xs-12">
          <div class="info-box">
            <span class="info-box-icon bg-aqua"><img src="imagenes/doctor (1).png"></span>

            <div class="info-box-content">
              <span class="info-box-text"># CONSULTAS</span>
              <span class="info-box-number">
                <?php
                  $Dao = new Con_Consulta();

                  $Dao->TotalConsultas();
                ?>
              </span>
            </div>
            <!-- /.info-box-content -->
          </div>
          <!-- /.info-box -->
        </div>
        <!-- /.col -->
        <div class="col-md-3 col-sm-6 col-xs-12">
          <div class="info-box">
            <span class="info-box-icon bg-red"><img src="imagenes/pill.png"></span>

            <div class="info-box-content">
              <span class="info-box-text"># FARMACIA</span>
              <span class="info-box-number">
                 <?php

                  $Dao = new Con_Consulta();

                  $Dao->TotalFarmacia();
                ?>
              </span>
            </div>
            <!-- /.info-box-content -->
          </div>
          <!-- /.info-box -->
        </div>
        <!-- /.col -->

        <!-- fix for small devices only -->
        <div class="clearfix visible-sm-block"></div>

        <div class="col-md-3 col-sm-6 col-xs-12">
          <div class="info-box">
            <span class="info-box-icon bg-green"><img src="imagenes/care.png"></span>

            <div class="info-box-content">
              <span class="info-box-text">ATENDIDOS</span>
              <span class="info-box-number">
                <?php

                  $Dao = new Con_Consulta();

                  $Dao->TotalAtendidos();
                ?>
              </span>
            </div>
            <!-- /.info-box-content -->
          </div>
          <!-- /.info-box -->
        </div>
        <!-- /.col -->
        <div class="col-md-3 col-sm-6 col-xs-12">
          <div class="info-box">
            <span class="info-box-icon bg-yellow"><img src="imagenes/team.png"></span>

            <div class="info-box-content">
              <span class="info-box-text">PACIENTES ACTIVOS</span>
              <span class="info-box-number">
                <?php

                  $Dao = new Con_Consulta();

                  $Dao->TotalPacientesActivos();
                ?>
              </span>
            </div>
          </div>
        </div>
        <div class="col-md-3 col-sm-6 col-xs-12">
          <div class="info-box">
            <span class="info-box-icon bg-aqua"><img src="imagenes/money.png"></span>

            <div class="info-box-content">
              <span class="info-box-text">VENTAS CONSULTAS</span>
              <span class="info-box-number">
                <?php

                  $Dao = new Con_Consulta();

                  $Dao->VentasConsultas();
                ?>
              </span>
            </div>
          </div>
        </div>
        <div class="col-md-3 col-sm-6 col-xs-12">
          <div class="info-box">
            <span class="info-box-icon bg-aqua"><img src="imagenes/money.png"></span>

            <div class="info-box-content">
              <span class="info-box-text">VENTAS FARMACIA</span>
              <span class="info-box-number">
                <?php

                  $Dao = new Con_Consulta();

                  $Dao->VentasFarmacia();
                ?>
              </span>
            </div>
          </div>
        </div>
        <div class="col-md-3 col-sm-6 col-xs-12">
          <div class="info-box">
            <span class="info-box-icon bg-red"><img src="imagenes/stopwatch.png"></span>

            <div class="info-box-content">
              <span class="info-box-text">FC SIN AUTORIZAR</span>
              <span class="info-box-number">
                <?php

                  $Dao = new Con_Consulta();

                  $Dao->FacturasSinAutorizar();
                ?>
              </span>
            </div>
          </div>
        </div>
        <div class="col-md-3 col-sm-6 col-xs-12">
          <div class="info-box">
            <span class="info-box-icon bg-green"><img src="imagenes/ok.png"></span>

            <div class="info-box-content">
              <span class="info-box-text">FC AUTORIZADAS</span>
              <span class="info-box-number">
                <?php

                  $Dao = new Con_Consulta();

                  $Dao->FacturasAutorizadas();
                ?>
              </span>
            </div>
          </div>
        </div>
      </div>  

      <div class="row">
        <div class="col-md-12 text-center">
          <select id="cbmMesChart">
            <option value="1">Enero</option>
            <option value="2">Febrero</option>
            <option value="3">Marzo</option>
            <option value="4">Abril</option>
            <option value="5">Mayo</option>
            <option value="6">Junio</option>
            <option value="7">Julio</option>
            <option value="8">Agosto</option>
            <option value="9">Septiembre</option>
            <option value="10">Octubre</option>
            <option value="11">Noviembre</option>
            <option value="12">Diciembre</option>
          </select>
          <input type="number" id="AñoChart" value="<?php echo date("Y");?>"> 
        </div>
        <div class="col-md-6">
          <canvas id="chartventas" height="200"></canvas>         
        </div>      
        <div class="col-md-6">
          <canvas id="chartCreditos" height="200"></canvas> 
        </div>
      </div>

    </section>
    <!-- /.content -->

    

<script src="js/inicio.js?v=1.2"></script>
