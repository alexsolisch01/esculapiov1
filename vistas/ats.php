<div class="col-md-12">
  <div class="box box-primary">
    <div class="box-header with-border">
      <h3 class="box-title">ATS</h3>
    </div>
    <!-- /.box-header -->
    <!-- form start -->
    <div class="row">
      <div class="col-md-12">
        <div class="form-group col-md-2">
          <label for="Nombre">MES </label>
          <select id="cbmMes" class="form-control">
            <option value="01">Enero</option>
            <option value="02">Febrero</option>
            <option value="03">Marzo</option>
            <option value="04">Abril</option>
            <option value="05">Mayo</option>
            <option value="06">Junio</option>
            <option value="07">Julio</option>
            <option value="08">Agosto</option>
            <option value="09">Septiembre</option>
            <option value="10">Octubre</option>
            <option value="11">Noviembre</option>
            <option value="12">Diciembre</option>
          </select>
        </div>
        <div class="form-group col-md-2">
          <label for="Nombre">AÑO</label>
          <input type="number" class="form-control" id="Año" value="<?php echo date("Y"); ?>">
        </div>
        <div class="col-md-2"><br>
          <button type="submit" id="GenerarAts" class="btn btn-round btn-primary">GENERAR</button>
        </div>
      </div>
      <div class="col-md-12">
        <table id="TablaAts" class="table table-striped table-bordered table-hover dt-responsive">
          <thead>
            <tr>
              <th>MES</th>
              <th>AÑO</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <?php
            $dao = new Con_Ats();
            $dao->CargarTabla();
            ?>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</div>
<script src="js/Js_Ats.js"></script>


<?php 
        /*$dao = new Dao();

        $dao->Campo("clave_sri","");
        
        $dao->Tabla("consulta","");  
        //$dao->Where("Convert(fecha_registro,date)","'2022-01-10'","");
        $dao->Where("clave_sri","'0905202201099289451200120010320000386104126153312'","");

        $respuesta =$dao->Consultar();
        
        foreach ($respuesta as $row => $item){
          
            $xmlFirmar = "facturas/".$item[0].".xml";
            $certificado = "facturas/0992894512001.p12";
            $clave="FEisabel2022";
            $rutaFirmados="Firmados/";
            $nombreXml=$item[0].".xml";

            $parametros = $certificado." ".$clave." ".$xmlFirmar." ".$rutaFirmados." ".$nombreXml;

            //$respuestajava =shell_exec('java -jar "C:\Users\Mauro\Downloads\galenos/java/FirmaXades.jar" '.$parametros);
            $respuestajava = shell_exec('java -jar "java/FirmaXades.jar" '.$parametros);
            echo $respuestajava."<br>";

        }*/

        /*$dao = new Dao();

        $dao->Campo("clave_sri","");
        
        $dao->Tabla("farmacia","");  
        //$dao->Where("Convert(fecha_registro,date)","'2022-01-07'","");
        $dao->Where("clave_sri","'1105202201099289451200120010330000269704126153312'","");
        

        $respuesta =$dao->Consultar();
        
        foreach ($respuesta as $row => $item){
          
            $xmlFirmar = "farmacia/".$item[0].".xml";
            $certificado = "facturas/0992894512001.p12";
            $clave="FEisabel2022";
            $rutaFirmados="Firmados/";
            $nombreXml=$item[0].".xml";

            $parametros = $certificado." ".$clave." ".$xmlFirmar." ".$rutaFirmados." ".$nombreXml;

            //$respuestajava =shell_exec('java -jar "C:\Users\Mauro\Downloads\galenos/java/FirmaXades.jar" '.$parametros);
            $respuestajava = shell_exec('java -jar "java/FirmaXades.jar" '.$parametros);
            echo $respuestajava."<br>";

        }*/

        /*$dao = new Dao();

        $dao->Campo("clave_sri","");
        
        $dao->Tabla("nc_consulta","");  
        $dao->Where("Convert(fecha_registro,date)","'2022-01-10'","");
        

        $respuesta =$dao->Consultar();
        
        foreach ($respuesta as $row => $item){
          
            $xmlFirmar = "facturas/".$item[0].".xml";
            $certificado = "facturas/0992894512001.p12";
            $clave="FEisabel2022";
            $rutaFirmados="Firmados/";
            $nombreXml=$item[0].".xml";

            $parametros = $certificado." ".$clave." ".$xmlFirmar." ".$rutaFirmados." ".$nombreXml;

            //$respuestajava =shell_exec('java -jar "C:\Users\Mauro\Downloads\galenos/java/FirmaXades.jar" '.$parametros);
            $respuestajava = shell_exec('java -jar "java/FirmaXades.jar" '.$parametros);
            echo $respuestajava."<br>";

        }*/

        /*$dao = new Dao();

        $dao->Campo("clave_sri","");
        
        $dao->Tabla("nc_farmacia","");  
        $dao->MayorIgual("Convert(fecha_registro,date)","'2021-07-10'","");
        

        $respuesta =$dao->Consultar();
        
        foreach ($respuesta as $row => $item){
          
            $xmlFirmar = "farmacia/".$item[0].".xml";
            $certificado = "facturas/0992894512001.p12";
            $clave="BCfunsisa2976";
            $rutaFirmados="Firmados/";
            $nombreXml=$item[0].".xml";

            $parametros = $certificado." ".$clave." ".$xmlFirmar." ".$rutaFirmados." ".$nombreXml;

            //$respuestajava =shell_exec('java -jar "C:\Users\Mauro\Downloads\galenos/java/FirmaXades.jar" '.$parametros);
            $respuestajava = shell_exec('java -jar "java/FirmaXades.jar" '.$parametros);
            echo $respuestajava."<br>";

        }*/