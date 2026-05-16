  <?php
session_start();

require_once "autoloadAjax.php";

if(isset($_POST['Requerimiento'])){
	function ObtenerSecuencia2($campo,$tabla,$fecha="",$campoFecha=""){

		$dao= new DaoContable();
		
		$dao->Maximo($campo,"");		
		$dao->Tabla($tabla,"");
		
		$dao->Where("id_empresa",$_SESSION["Perlaid"],"and");
		$dao->Where("id_entidad",$_SESSION["PerlaEntidad"],"and");
		
		if($fecha==""){
	      $dao->Where("YEAR(Convert(fecha_registro,date))",'YEAR(CURDATE())',"");
	    }else{
	      $dao->Where("YEAR(Convert(".$campoFecha.",date))",'YEAR(Convert("'.$fecha.'",date))',"");
	    }

		$respuesta = $dao->Consultar();
		$jsondata = 0;
		foreach ($respuesta as $row => $item){
			$jsondata=$item[0];			
		}
		return $jsondata+1;
	}
	function ObtenerNumero($campo,$tabla){

		$dao= new DaoContable();
		
		$dao->Maximo($campo,"");		
		$dao->Tabla($tabla,"");
		
		$dao->Where("id_empresa",$_SESSION["Perlaid"],"");

		$respuesta = $dao->Consultar();
		$jsondata = 0;
		foreach ($respuesta as $row => $item){
			$jsondata=$item[0];			
		}
		return $jsondata+1;
	}
	function CrearCliente($cedula,$nombres,$email,$telefono){

		$dao = new DaoContable();		

		$dao->Campo("cedula","");
		$dao->Campo("id","");

		$dao->Tabla("empleado","");
		$dao->Where("id_estado","1","and");			
		$dao->Where("id_empresa",$_SESSION["Perlaid"],"and");		
		$dao->Filtrar("cedula",$cedula,"");	
            	
		$respuesta = $dao->Consultar();
		$confirma = true;
		$id=0;
		foreach ($respuesta as $row => $item){
			$confirma = false;
			$id = $item[1];
		}
		if($confirma){
			$numero = ObtenerNumero("numero","empleado");
			$datos = array(
				"id_empresa"=>$_SESSION["Perlaid"],							
				"cedula"=>$cedula,
				"nombres"=>$nombres,
				"numero"=>$numero,
				"apellidos"=>"",
				"tipo"=>"C",
				"telefono"=>$telefono,
				"email"=>$email,
				"id_estado"=>1
			);
		
			$dao= new DaoContable();
		    $respuesta = $dao->Guardar("empleado",$datos,false);
		    $id = $respuesta[1];
		}
		return $id;
	}
	function ObtenerIdFactura($establecimiento,$punto_venta,$secuencia){
		$dao = new DaoContable();		
		
		$dao->Campo("id","");

		$dao->Tabla("factura","");
		$dao->Where("id_estado","10","and");			
		$dao->Where("id_entidad",$_SESSION["PerlaEntidad"],"and");		
		$dao->Where("establecimiento",$establecimiento,"and");	
		$dao->Where("punto_venta",$punto_venta,"and");	
		$dao->Where("secuencia",$secuencia,"");	
            	
		$respuesta = $dao->Consultar();		
		$id=0;
		foreach ($respuesta as $row => $item){			
			$id = $item[0];
		}
		return $id;
	}
	function GuardarNcContable($cliente,$IdFactura,$establecimiento,$punto_venta,$secuencia,$subtotal,$descuento,$forma_pago){
		
		$datos = array("id_empresa"=>$_SESSION["Perlaid"],
								"id_entidad"=>$_SESSION["PerlaEntidad"],							
								"id_empleado"=>$cliente,
								"id_factura"=>$IdFactura,
								"establecimiento"=>$establecimiento,
								"punto_venta"=>$punto_venta,								
								"secuencia"=>$secuencia,
								"subtotal"=>$subtotal,
								"descuento"=>$descuento,
								"iva"=>0,
								"total"=>$subtotal,
								"motivo"=>"Devolucion De Mercaderia",
								"pago"=>$forma_pago,
								"id_estado"=>1								
								);

		$dao= new DaoContable();
	    $respuesta = $dao->Guardar("nota_credito",$datos,false);
	    return $respuesta[1];
	}
	function ObtenerFormaPago($consulta){
		$dao= new Dao();
		
		$dao->Campo("c.tipo","");				
		$dao->Tabla("forma_pago","c");		
		$dao->Where("c.id_consulta",$consulta,"");
		$respuesta =$dao->Consultar();
		$fp = 1;
		foreach ($respuesta as $row => $item){
			if($item[0]=="CREDITO"){
				$fp=4;
			}
			if($item[0]=="CHEQUE"){
				$fp=4;
			}
		}
		return $fp;
	}
	function EgresoACaja($monto,$razon,$caja,$referencia,$fecha,$cliente,$idNc){

		$numeroec = ObtenerSecuencia2("numero","egreso_caja",$fecha,"fecha");

		$datos = array("id_empresa"=>$_SESSION["Perlaid"],
								"id_entidad"=>$_SESSION["PerlaEntidad"],
								"id_empleado"=>$cliente,								
								"id_cajas"=>$caja,								
								"id_nota_credito"=>$idNc,								
								"numero"=>$numeroec,
								"referencia"=>$referencia,
								"nota"=>$razon,
								"fecha"=>$fecha,
								"efectivo"=>$monto,
								"id_estado"=>1								
								);
		
		$dao= new DaoContable();
	    $dao->Guardar("egreso_caja",$datos,false);
	}
	function RestarCxC($cliente,$monto,$razon){

		$datos = array("debito"=>$monto,
						"id_empleado"=>$cliente,
						"id_estado"=>1,
						"id_empresa"=>$_SESSION["Perlaid"],
						"id_entidad"=>$_SESSION["PerlaEntidad"],
						"fecha"=>date("Y-m-d"),
						"razon"=>$razon);
		
		$dao= new DaoContable();
	    $dao->Guardar("cuentas_cobrar",$datos,false);
	}	
	function RestarCreditoFormaPago($id,$tipo,$monto,$tabla){
		$dao = new DaoContable();
		$dao->Campo("fp.saldo","");
		$dao->Campo("fp.abono","");
		$dao->Campo("fp.id","");
		$dao->TablasInnerAlias("forma_pago","fp",$tabla,"f");
		$dao->Where($tipo,$id,"and");
		$dao->Diferente("f.id_estado","6","and");
		$dao->Diferente("fp.id_estado","2","and");
		$dao->Where("fp.tipo","'Credito'","and");		
		$dao->Diferente("fp.saldo","0","");
		$dao->Ordenar("fp.fecha_pago");
		$respuesta =$dao->Consultar();
		
		foreach ($respuesta as $row => $item){
			$saldo = $item[0];
			$abono = $item[1];
			if($saldo>=$monto){
				$saldo = $saldo - $monto;
				$abono = $abono + $monto;	
				$monto = 0;
			}else{
				$saldo = $monto - $saldo;
				$abono = $abono + ($monto - $saldo);	
				$monto = $monto - $item[0];
			}
			
			$datos = array("abono"=>$abono,							
							"saldo"=>$saldo
							);

			$dao= new DaoContable();
		    $dao->Modificar("forma_pago",$datos,"id=".$item[2],0);
		    if($monto==0){
		    	break;
		    }
		}
	}
	function GuardarAsiento($cliente,$tipo,$pago,$subtotal,$descuento,$iva,$glosa,$idNc,$fecha,$caja,$cajacuenta,$referencia){
		
			if($tipo=="1"){
				$datos = array("id_cuenta"=>$_SESSION["PerlaCUENTA CONTABLE DESCUENTO EN VENTAS"],							
								"parcial"=>$subtotal+$iva,
								"debe"=>$subtotal+$iva,
								"glosa"=>$glosa,
								"id_empresa"=>$_SESSION["Perlaid"],
								"id_entidad"=>$_SESSION["PerlaEntidad"],
								"id_nota_credito"=>$idNc,
								"fecha"=>$fecha,
								"id_estado"=>1								
								);				
					
				$dao= new DaoContable();
				$dao->Guardar("diario",$datos,false);
			    			   
		    }
		    if($tipo=="2" || $tipo=="3"){
				$datos = array("id_cuenta"=>$_SESSION["PerlaCUENTA CONTABLE DEVOLUCIONES EN VENTAS"],							
								"parcial"=>$subtotal+$descuento,
								"debe"=>$subtotal+$descuento,
								"glosa"=>$glosa,
								"id_empresa"=>$_SESSION["Perlaid"],
								"id_entidad"=>$_SESSION["PerlaEntidad"],
								"id_nota_credito"=>$idNc,
								"fecha"=>$fecha,								
								"id_estado"=>1								
								);				
					
				$dao= new DaoContable();
				$dao->Guardar("diario",$datos,false);

				if($iva>0){
					$datos = array("id_cuenta"=>$_SESSION["PerlaCUENTA CONTABLE IVA COBRADO"],							
										"parcial"=>$iva,
										"debe"=>$iva,
										"glosa"=>$glosa,
										"id_empresa"=>$_SESSION["Perlaid"],
										"id_entidad"=>$_SESSION["PerlaEntidad"],
										"id_nota_credito"=>$idNc,
										"fecha"=>$fecha,								
										"id_estado"=>1								
										);
					$dao= new DaoContable();
					$dao->Guardar("diario",$datos,false);
				    			    
			    }			    			  
		    }

		    
		    if($tipo=="2" || $tipo=="3"){
		    	if($descuento>0){
		    		$datos = array("id_cuenta"=>$_SESSION["PerlaCUENTA CONTABLE DESCUENTO EN VENTAS"],							
								"parcial"=>$descuento,
								"haber"=>$descuento,
								"glosa"=>$glosa,
								"id_empresa"=>$_SESSION["Perlaid"],
								"id_entidad"=>$_SESSION["PerlaEntidad"],
								"id_nota_credito"=>$idNc,
								"fecha"=>$fecha,								
								"id_estado"=>1								
								);				
					
					$dao= new DaoContable();
					$dao->Guardar("diario",$datos,false);
		    	}		    	
		    }
		    if($pago=="1"){
				$datos = array("id_cuenta"=>$cajacuenta,							
								"parcial"=>$subtotal+$iva,
								"haber"=>$subtotal+$iva,
								"glosa"=>$glosa,
								"id_empresa"=>$_SESSION["Perlaid"],
								"id_entidad"=>$_SESSION["PerlaEntidad"],
								"id_nota_credito"=>$idNc,
								"fecha"=>$fecha,								
								"id_estado"=>1								
								);				
					
				$dao= new DaoContable();
			    $dao->Guardar("diario",$datos,false);			    			    
			    EgresoACaja($subtotal+$iva,$glosa,$caja,$referencia,$fecha,$cliente,$idNc);			    
		    }


		    if($pago=="4"){
				$datos = array("id_cuenta"=>$_SESSION["PerlaCUENTA CONTABLE CUENTAS X COBRAR"],							
									"parcial"=>$subtotal+$iva,
									"haber"=>$subtotal+$iva,
									"glosa"=>$glosa,
									"id_empresa"=>$_SESSION["Perlaid"],		
									"id_entidad"=>$_SESSION["PerlaEntidad"],
									"id_nota_credito"=>$idNc,
									"fecha"=>$fecha,							
									"id_estado"=>1								
									);
			    $dao= new DaoContable();
			    $dao->Guardar("diario",$datos,false);	
			    RestarCxC($cliente,$subtotal+$iva,$glosa);
			    RestarCreditoFormaPago($cliente,"id_empleado",$subtotal+$iva,"factura");
		    }
		    		
	}
	function ProcesarValorAnticipo($consulta,$total){
		
		$dao= new Dao();

	    $dao->Campo("numero","");
	    
		$dao->Tabla("ic_caja","");
		$dao->Where("id_punto_venta",$_SESSION['puntoVenta'],"");
		$dao->Ordenar("id DESC");
		$dao->Limite("1");
		$respuesta =$dao->Consultar();
		$secuencia = 1;
		foreach ($respuesta as $row => $item){
			$secuencia = substr($item[0],0,3)."-".str_pad(substr($item[0],-7)+1,  7, "0", STR_PAD_LEFT);
		}

		$dao= new Dao();
		
		$dao->Campo("c.monto_anticipo","");		
		$dao->Tabla("forma_pago","c");		
		$dao->Where("c.id_consulta",$consulta,"AND");
		$dao->Where("c.tipo","'ANTICIPO'","");
		$dao->Limite("1");
		$respuesta =$dao->Consultar();
		
		foreach ($respuesta as $row => $item){

			$datos = array("valor"=>$total,
						   "valor_ingreso"=>$total,
						   "t_pago"=>"NOTA DE CREDITO",
						   "id_estado"=>1,
						   "id_punto_venta"=>$_SESSION["puntoVenta"],
				     	   "usuario_registro"=>$_SESSION["usuario"]);

			
			if(isset($_POST["Cliente"])){
				$datos["id_paciente_cliente"]=$_POST["Cliente"];
			}
								   
			$dao= new Dao();
	    	$respuestaat =$dao->Guardar("anticipo",$datos);	


			$datos = array("numero"=>$secuencia,
						"tipo"=>"ANTICIPO",
						"id_anticipo"=>$respuestaat[1],
						"id_punto_venta"=>$_SESSION["puntoVenta"],
						"monto"=>$total,
						"tipo_pago"=>"NOTA DE CREDITO");

			
			if(isset($_POST["Cliente"])){
				$datos["id_paciente_cliente"]=$_POST["Cliente"];
			}
			$dao= new Dao();
		    $dao->Guardar("ic_caja",$datos);

		    

		}
	}
	function ProcesarValorCredito($consulta,$total){
		
		$dao= new Dao();

	    $dao->Campo("numero","");
	    
		$dao->Tabla("ic_caja","");
		$dao->Where("id_punto_venta",$_SESSION['puntoVenta'],"");
		$dao->Ordenar("id DESC");
		$dao->Limite("1");
		$respuesta =$dao->Consultar();
		$secuencia = 1;
		foreach ($respuesta as $row => $item){
			$secuencia = substr($item[0],0,3)."-".str_pad(substr($item[0],-7)+1,  7, "0", STR_PAD_LEFT);
		}

		$dao= new Dao();
		
		$dao->Campo("c.monto_credito","");
		$dao->Campo("saldo","");
		$dao->Campo("pagado","");
		$dao->Campo("id","");		
		$dao->Tabla("forma_pago","c");		
		$dao->Where("c.id_consulta",$consulta,"AND");
		$dao->Where("c.tipo","'CREDITO'","");
		$dao->Limite("1");
		$respuesta =$dao->Consultar();
		
		foreach ($respuesta as $row => $item){

			$datos = array("numero"=>$secuencia,
						"tipo"=>"ABONO",
						"id_punto_venta"=>$_SESSION["puntoVenta"],
						"monto"=>$total,
						"tipo_pago"=>"NOTA DE CREDITO");

			
			if(isset($_POST["Cliente"])){
				$datos["id_paciente_cliente"]=$_POST["Cliente"];
			}
			$dao= new Dao();
		    $respuestaic =$dao->Guardar("ic_caja",$datos);

		    $datos = array("tipo"=>"NOTA DE CREDITO",
								"monto"=>$total,
								"id_ic_caja"=>$respuestaic[1],
								"id_estado"=>1);


			$dao= new Dao();
		    $dao->Guardar("forma_pago_ingreso",$datos);	

		    $saldo = $item[1];		
			$abono = $item[2];

			$saldo = $saldo - $total;
			$abono = $abono + $total;
			$datos = array("pagado"=>$abono,							
							"saldo"=>$saldo
							);

			$dao= new Dao();
		    $dao->Modificar("forma_pago",$datos,"id=".$item[3],0);
		}
	}
	function ClaveAccesonc($ruc,$factura){

      $establecimiento = substr(str_replace("-","",$factura),0,3);
      $punto = substr(str_replace("-","",$factura),3,3);
      $secuencial = '00'.substr(str_replace("-","",$factura),6);

      $claveAcceso = date("dmY")."04".$ruc."1".$establecimiento.$punto.$secuencial."41261533"."1";
      $digitoVerificador=-1;

      $arrayClave = str_split($claveAcceso);

      $arrayMultiplicacion = array();

      $arrayMultiplicacion[0]=$arrayClave[0] * 7;
      $arrayMultiplicacion[1]=$arrayClave[1] * 6;
      $arrayMultiplicacion[2]=$arrayClave[2] * 5;
      $arrayMultiplicacion[3]=$arrayClave[3] * 4;
      $arrayMultiplicacion[4]=$arrayClave[4] * 3;
      $arrayMultiplicacion[5]=$arrayClave[5] * 2;

      $arrayMultiplicacion[6]=$arrayClave[6] * 7;
      $arrayMultiplicacion[7]=$arrayClave[7] * 6;
      $arrayMultiplicacion[8]=$arrayClave[8] * 5;
      $arrayMultiplicacion[9]=$arrayClave[9] * 4;
      $arrayMultiplicacion[10]=$arrayClave[10] * 3;
      $arrayMultiplicacion[11]=$arrayClave[11] * 2;

      $arrayMultiplicacion[12]=$arrayClave[12] * 7;
      $arrayMultiplicacion[13]=$arrayClave[13] * 6;
      $arrayMultiplicacion[14]=$arrayClave[14] * 5;
      $arrayMultiplicacion[15]=$arrayClave[15] * 4;
      $arrayMultiplicacion[16]=$arrayClave[16] * 3;
      $arrayMultiplicacion[17]=$arrayClave[17] * 2;

      $arrayMultiplicacion[18]=$arrayClave[18] * 7;
      $arrayMultiplicacion[19]=$arrayClave[19] * 6;
      $arrayMultiplicacion[20]=$arrayClave[20] * 5;
      $arrayMultiplicacion[21]=$arrayClave[21] * 4;
      $arrayMultiplicacion[22]=$arrayClave[22] * 3;
      $arrayMultiplicacion[23]=$arrayClave[23] * 2;

      $arrayMultiplicacion[24]=$arrayClave[24] * 7;
      $arrayMultiplicacion[25]=$arrayClave[25] * 6;
      $arrayMultiplicacion[26]=$arrayClave[26] * 5;
      $arrayMultiplicacion[27]=$arrayClave[27] * 4;
      $arrayMultiplicacion[28]=$arrayClave[28] * 3;
      $arrayMultiplicacion[29]=$arrayClave[29] * 2;

      $arrayMultiplicacion[30]=$arrayClave[30] * 7;
      $arrayMultiplicacion[31]=$arrayClave[31] * 6;
      $arrayMultiplicacion[32]=$arrayClave[32] * 5;
      $arrayMultiplicacion[33]=$arrayClave[33] * 4;
      $arrayMultiplicacion[34]=$arrayClave[34] * 3;
      $arrayMultiplicacion[35]=$arrayClave[35] * 2;

      $arrayMultiplicacion[36]=$arrayClave[36] * 7;
      $arrayMultiplicacion[37]=$arrayClave[37] * 6;
      $arrayMultiplicacion[38]=$arrayClave[38] * 5;
      $arrayMultiplicacion[39]=$arrayClave[39] * 4;
      $arrayMultiplicacion[40]=$arrayClave[40] * 3;
      $arrayMultiplicacion[41]=$arrayClave[41] * 2;

      $arrayMultiplicacion[42]=$arrayClave[42] * 7;
      $arrayMultiplicacion[43]=$arrayClave[43] * 6;
      $arrayMultiplicacion[44]=$arrayClave[44] * 5;
      $arrayMultiplicacion[45]=$arrayClave[45] * 4;
      $arrayMultiplicacion[46]=$arrayClave[46] * 3;
      $arrayMultiplicacion[47]=$arrayClave[47] * 2;

      $sumaClave = 0;
      foreach ($arrayMultiplicacion as $valor) {
        $sumaClave =$sumaClave + $valor;
      }
      $mod = fmod($sumaClave, 11);
      $digitoVerificador = 11 - $mod;
      if($digitoVerificador==11){
        $digitoVerificador = 0;
      }
      if($digitoVerificador==10){
        $digitoVerificador = 1;
      }
      $claveAcceso = $claveAcceso.$digitoVerificador;
      return $claveAcceso;
	}
	if($_POST['Requerimiento'] == "GuardarConsulta"){

		$mismosdatos=null;

		if($_POST["Paciente"] !=$_POST["Cliente"]){
			$mismosdatos='N';
		}else{
			$mismosdatos='S';
		}

		if($_POST["Cliente"]==1){
			$mismosdatos='N';
		}

		$datos = array("id_punto_venta"=>$_POST["Punto"],
								"id_paciente"=>$_POST["Paciente"],
								"descuento"=>$_POST["Descuento"],
								"id_estado"=>1,
								"id_estado_rx"=>1,
								"id_estado_eco"=>1,
								"id_estado_lab"=>1,
								"id_estado_tomo"=>1,
								"id_estado_orden_rx"=>0,
								"id_estado_orden_eco"=>0,
								"id_estado_orden_lab"=>0,
								"id_estado_orden_tomo"=>0,
								"id_estado_receta"=>0,
								"tipoid"=>$_POST["TipoIde"],
								"mismosdatos"=>$mismosdatos,
								"total"=>$_POST["Total"],
								"numero"=>$_POST["Numero"],
								"observacion"=>$_POST["OBS"],
								"id_consulta"=>$_POST["Consulta"]);

		if($mismosdatos=='N'){
			$datos['id_paciente_cliente']=$_POST["Cliente"];
		}
		if(isset($_POST["Referente"])){
			if($_POST["Referente"]!="" && $_POST["Referente"]!=0 ){
				$datos['id_referencia']=$_POST["Referente"];
			}
		}
		ProcesarValorCredito($_POST['Consulta'],$_POST["Total"]);
		ProcesarValorAnticipo($_POST['Consulta'],$_POST["Total"]);
		if(isset($_SESSION["PerlaEntidad"])){
			$idcliente = CrearCliente($_POST["CedulaCliente"],$_POST["NombreCliente"],$_POST["EmailCliente"],$_POST["TelefonoCliente"]);
			$nfc = explode("-",$_POST["NumeroFactura"]);
			$IdFactura = ObtenerIdFactura($nfc[0],$nfc[1],$nfc[2]);
			$nnc = explode("-",$_POST["Numero"]);
			$fp = ObtenerFormaPago($_POST["Consulta"]);
			$idNc = GuardarNcContable($idcliente,
							  $IdFactura,
							  $nnc[0],
							  $nnc[1],
							  $nnc[2],
							  $_POST["Total"],
							  $_POST["Descuento"],
							  $fp
							);

			$glosa = "Nota De Credito ".$_POST["Numero"];

			GuardarAsiento(
						   $idcliente,
						   2,
						   $fp,
						   $_POST["Total"],
						   $_POST["Descuento"],
						   0,
						   $glosa,
						   $idNc,
						   date("Y-m-d"),
						   $_SESSION["PerlaCaja"],
						   $_SESSION["PerlaCUENTA CONTABLE CAJA"],
						   $_POST["Numero"]
						);
		}		

		$datos1 = array("nc"=>0);
		$dao1= new Dao();
		$dao1->Modificar("consulta",$datos1,"id = ".$_POST['Consulta'],0);

		$clave_sri = ClaveAccesonc($_SESSION["ruc"],$_POST["Numero"]);

		$dao= new Dao();
	    $respuesta = $dao->Guardar("nc_consulta",$datos);		 
	    if($respuesta[0]){
	    	$jsondata = array();
    		$jsondata[0]=true;
    		$jsondata[1]=$respuesta[1];
    		$jsondata[2]=$_POST["Numero"];
    		$jsondata[3]=$clave_sri;
    		$jsondata[4]=date("Y-m-d H:i:s");
    		echo json_encode($jsondata, JSON_FORCE_OBJECT);	    			    	
	    }else{
	    	echo json_encode($respuesta, JSON_FORCE_OBJECT);	
	    }
	}


	if($_POST['Requerimiento'] == "GuardarConsultaDetalle"){

		$datos = array("id_nc_consulta"=>$_POST["Consulta"],
								"id_empleado"=>$_POST["Empleado"],
								"id_estado"=>7,
								"fecha_atencion"=>$_POST["Fecha"],
								"precio"=>$_POST["Precio"],
								"descuento"=>$_POST["Descuento"],
								"subtotal"=>$_POST["Subtotal"],
								"turno"=>$_POST["Turno"]);

		$campo = "";
		$valor = "";
		if(isset($_POST["Procedimiento"])){
			$datos['id_procedimiento']=$_POST["Procedimiento"];
			$campo = "id_procedimiento";
			$valor = $_POST["Procedimiento"];
		}

		if(isset($_POST["Laboratorio"])){
			$datos['id_procedimiento_laboratorio']=$_POST["Laboratorio"];
			$campo = "id_procedimiento_laboratorio";
			$valor = $_POST["Laboratorio"];
		}
		if(isset($_POST["Rx"])){
			$datos['id_procedimiento_rx']=$_POST["Rx"];
			$campo = "id_procedimiento_rx";
			$valor = $_POST["Rx"];
		}
		if(isset($_POST["Eco"])){
			$datos['id_procedimiento_eco']=$_POST["Eco"];
			$campo = "id_procedimiento_eco";
			$valor = $_POST["Eco"];
		}
		if(isset($_POST["Tac"])){
			$datos['id_procedimiento_tomo']=$_POST["Tac"];
			$campo = "id_procedimiento_tomo";
			$valor = $_POST["Tac"];
		}

		$datos1 = array("id_estado"=>25);
		$dao1= new Dao();
		$dao1->Modificar("consulta_item",$datos1,"id_consulta = ".$_POST['CCargada']." and ".$campo." = ".$valor." and id = ".$_POST["IdDetalle"],0);
		$dao= new Dao();
	    $dao->GuardarAjax("nc_consulta_item",$datos);
		
		
	}
	if($_POST['Requerimiento'] == "EliminarDetalleConsulta"){
		$dao= new Dao();
		$dao->EliminarPorCampoAjax("nc_consulta_item","id_consulta",$_POST['Consulta']);
		//$dao= new Dao();
		//$dao->EliminarPorCampoAjax("forma_pago","id_consulta",$_POST['Consulta']);
	}
	if($_POST['Requerimiento'] == "ModificarConsultaDetalle"){


		

		$datos = array("id_consulta"=>$_POST["Consulta"],
								"id_empleado"=>$_POST["Empleado"],
								"id_estado"=>7,
								"fecha_atencion"=>$_POST["Fecha"],
								"precio"=>$_POST["Precio"],
								"descuento"=>$_POST["Descuento"],
								"subtotal"=>$_POST["Subtotal"],
								"turno"=>$_POST["Turno"]);

		if(isset($_POST["Procedimiento"])){
			$datos['id_procedimiento']=$_POST["Procedimiento"];
		}

		if(isset($_POST["Laboratorio"])){
			$datos['id_procedimiento_laboratorio']=$_POST["Laboratorio"];
		}
		if(isset($_POST["Rx"])){
			$datos['id_procedimiento_rx']=$_POST["Rx"];
		}
		if(isset($_POST["Eco"])){
			$datos['id_procedimiento_eco']=$_POST["Eco"];
		}
		if(isset($_POST["Tac"])){
			$datos['id_procedimiento_tomo']=$_POST["Tac"];
		}

		$dao= new Dao();
	    $dao->GuardarAjax("nc_consulta_item",$datos);
		
		
	}

	if($_POST['Requerimiento'] == "ActualizaSecuencia"){

		$datos = array("secuencia_nc"=>$_POST["Secuencia"]);

		$dao= new Dao();
	    $_SESSION["secuencia_nc"] = str_pad($_POST["Secuencia"],  9, "0", STR_PAD_LEFT);
	    $dao->ModificarAjax("punto_venta",$datos,"id=".$_POST['Id'],$_POST['Id']);
		
		
	}
	if($_POST['Requerimiento'] == "FacturaAutorizada"){

		$datos = array("autorizada"=>'S',
					   "clave_sri"=>$_POST['Clave']);

		$dao= new Dao();
	
	    $dao->ModificarAjax("nc_consulta",$datos,"id=".$_POST['Consulta'],$_POST['Consulta']);
		
		
	}

	if($_POST['Requerimiento'] == "CargarFacturaConsulta"){

		
		$dao= new Dao();

	    $dao->Campo("c.id","");
	    $dao->Campo("c.id_paciente","");
	    $dao->Campo("p.nombre","");
	    $dao->Campo("CONCAT(p.apellido,' ',p.apellido_materno)","");
	    $dao->Campo("p.cedula","");
	    $dao->Campo("p.direccion","");
	    $dao->Campo("p.telefono","");
	    $dao->Campo("p.email","");
	    $dao->Campo("p.fecha_nacimiento","");
	    $dao->Campo("p.apellido","");
	    $dao->Campo("c.id_paciente_cliente","");
	    $dao->Campo("c.mismosdatos","");
	    $dao->Campo("c.total","");
	    $dao->Campo("c.descuento","");
	    $dao->Campo("c.id_estado","");
	    $dao->Campo("c.id_estado_lab","");
	    $dao->Campo("c.id_estado_rx","");
	    $dao->Campo("c.id_estado_eco","");
	    $dao->Campo("c.id_estado_tomo","");
	    $dao->Campo("c.autorizada","");
	    $dao->Campo("CONVERT(c.fecha_registro,Date)","");
	    $dao->Campo("c.clave_sri","");
		$dao->Campo('CASE WHEN CONVERT(c.fecha_registro,date) < Curdate() THEN false ELSE true END',"");
		$dao->TablasInnerAlias("nc_consulta","c","paciente","p");
		
		$dao->Where("c.numero","'".$_POST['Numero']."'","");


		$dao->ConsultarAjax();
		//echo json_encode($dao->Consultar2());
		
		
	}

	if($_POST['Requerimiento'] == "ConsultarDetalleConsulta"){

		
		$dao= new Dao();
		
		$dao->Campo("c.*","");
	    $dao->Campo("e.apellidos","");
	    $dao->Campo("e.nombres","");
	    

		$dao->TablasInnerAlias("nc_consulta_item","c","empleado","e");
		
		$dao->Where("c.id_nc_consulta",$_POST['Consulta'],"");


		$dao->ConsultarAjax();
		//echo json_encode($dao->Consultar2());
		
		
	}


	if($_POST['Requerimiento'] == "CargarItemId"){

		
		$dao= new Dao();
		$dao->Campo("nombre","");
		$dao->Tabla($_POST['Tabla'],"");
		
		$dao->Where("id",$_POST['Id'],"");


		$dao->ConsultarAjax();
		//echo json_encode($dao->Consultar2());
		
		
	}
	if($_POST['Requerimiento'] == "CargarEspecialidadItem"){

		
		$dao= new Dao();
		$dao->Campo("p.id_especialidad","");
		$dao->Campo("e.id_tipo_servicio","");
		$dao->Campo("e.nombre","");
		$dao->TablasInnerAlias("procedimiento","p","especialidad","e");
		
		$dao->Where("p.id",$_POST['Id'],"");


		$dao->ConsultarAjax();
		//echo json_encode($dao->Consultar2());
		
		
	}

	if($_POST['Requerimiento'] == "ActualizarEstadoConsulta"){

		
		$datos = array($_POST["Tipo"]=>$_POST["Estado"]);
		$dao= new Dao();
		$dao->ModificarAjax("nc_consulta_item",$datos,"id=".$_POST['Consulta'],$_POST['Consulta']);
		
	}
	if($_POST['Requerimiento'] == "ActualizarEstadoConsultaLab"){

		
		$datos = array($_POST["Tipo"]=>$_POST["Estado"]);
		$dao= new Dao();
		$dao->ModificarAjax("nc_consulta",$datos,"id=".$_POST['Consulta'],$_POST['Consulta']);
		
	}
	if($_POST['Requerimiento'] == "ActualizarEstadoConsultaOrden"){

		
		$datos = array($_POST["Tipo"]=>$_POST["Estado"]);
		$dao= new Dao();
		$dao->ModificarAjax("nc_consulta",$datos,"id=".$_POST['Consulta'],$_POST['Consulta']);
		
	}	
	if($_POST['Requerimiento'] == "ActualizarEstadoOrden"){

		
		$datos = array($_POST["Tipo"]=>$_POST["Estado"]);
		$dao= new Dao();
		$dao->ModificarAjax("orden_item",$datos,"id_orden=".$_POST['Orden']." AND ".$_POST["Campo"]." = ".$_POST["Id"],$_POST['Orden']);
		
	}

	if($_POST['Requerimiento'] == "CargarVentasConsulta"){

		
		$dao = new Dao();

		$sql =' SELECT *
				FROM (SELECT COALESCE(SUM(total),0) Ventas FROM consulta WHERE MONTH(CONVERT(fecha_registro,DATE)) = 1 and YEAR(CONVERT(fecha_registro,DATE)) = YEAR(CURDATE()) ) e,
					 (SELECT COALESCE(SUM(total),0) Ventas FROM consulta WHERE MONTH(CONVERT(fecha_registro,DATE)) = 2 and YEAR(CONVERT(fecha_registro,DATE)) = YEAR(CURDATE()) ) f,
					 (SELECT COALESCE(SUM(total),0) Ventas FROM consulta WHERE MONTH(CONVERT(fecha_registro,DATE)) = 3 and YEAR(CONVERT(fecha_registro,DATE)) = YEAR(CURDATE()) ) m,
					 (SELECT COALESCE(SUM(total),0) Ventas FROM consulta WHERE MONTH(CONVERT(fecha_registro,DATE)) = 4 and YEAR(CONVERT(fecha_registro,DATE)) = YEAR(CURDATE()) ) a,
					 (SELECT COALESCE(SUM(total),0) Ventas FROM consulta WHERE MONTH(CONVERT(fecha_registro,DATE)) = 5 and YEAR(CONVERT(fecha_registro,DATE)) = YEAR(CURDATE()) ) my,
					 (SELECT COALESCE(SUM(total),0) Ventas FROM consulta WHERE MONTH(CONVERT(fecha_registro,DATE)) = 6 and YEAR(CONVERT(fecha_registro,DATE)) = YEAR(CURDATE()) ) j,
					 (SELECT COALESCE(SUM(total),0) Ventas FROM consulta WHERE MONTH(CONVERT(fecha_registro,DATE)) = 7 and YEAR(CONVERT(fecha_registro,DATE)) = YEAR(CURDATE()) ) ju,
					 (SELECT COALESCE(SUM(total),0) Ventas FROM consulta WHERE MONTH(CONVERT(fecha_registro,DATE)) = 8 and YEAR(CONVERT(fecha_registro,DATE)) = YEAR(CURDATE()) ) ag,
					 (SELECT COALESCE(SUM(total),0) Ventas FROM consulta WHERE MONTH(CONVERT(fecha_registro,DATE)) = 9 and YEAR(CONVERT(fecha_registro,DATE)) = YEAR(CURDATE()) ) s,
					 (SELECT COALESCE(SUM(total),0) Ventas FROM consulta WHERE MONTH(CONVERT(fecha_registro,DATE)) = 10 and YEAR(CONVERT(fecha_registro,DATE)) = YEAR(CURDATE()) ) o,
					 (SELECT COALESCE(SUM(total),0) Ventas FROM consulta WHERE MONTH(CONVERT(fecha_registro,DATE)) = 11 and YEAR(CONVERT(fecha_registro,DATE)) = YEAR(CURDATE()) ) n,
					 (SELECT COALESCE(SUM(total),0) Ventas FROM consulta WHERE MONTH(CONVERT(fecha_registro,DATE)) = 12 and YEAR(CONVERT(fecha_registro,DATE)) = YEAR(CURDATE()) ) d ';

		$dao->ConsultarSqlNativoAjax($sql);
		
	}
	
	if($_POST['Requerimiento'] == "CargarVentasFactura"){

		
		$dao = new Dao();

		$sql =' SELECT *
				FROM (SELECT COALESCE(SUM(total),0) Ventas FROM farmacia WHERE MONTH(CONVERT(fecha_registro,DATE)) = 1 and YEAR(CONVERT(fecha_registro,DATE)) = YEAR(CURDATE()) ) e,
					 (SELECT COALESCE(SUM(total),0) Ventas FROM farmacia WHERE MONTH(CONVERT(fecha_registro,DATE)) = 2 and YEAR(CONVERT(fecha_registro,DATE)) = YEAR(CURDATE()) ) f,
					 (SELECT COALESCE(SUM(total),0) Ventas FROM farmacia WHERE MONTH(CONVERT(fecha_registro,DATE)) = 3 and YEAR(CONVERT(fecha_registro,DATE)) = YEAR(CURDATE()) ) m,
					 (SELECT COALESCE(SUM(total),0) Ventas FROM farmacia WHERE MONTH(CONVERT(fecha_registro,DATE)) = 4 and YEAR(CONVERT(fecha_registro,DATE)) = YEAR(CURDATE()) ) a,
					 (SELECT COALESCE(SUM(total),0) Ventas FROM farmacia WHERE MONTH(CONVERT(fecha_registro,DATE)) = 5 and YEAR(CONVERT(fecha_registro,DATE)) = YEAR(CURDATE()) ) my,
					 (SELECT COALESCE(SUM(total),0) Ventas FROM farmacia WHERE MONTH(CONVERT(fecha_registro,DATE)) = 6 and YEAR(CONVERT(fecha_registro,DATE)) = YEAR(CURDATE()) ) j,
					 (SELECT COALESCE(SUM(total),0) Ventas FROM farmacia WHERE MONTH(CONVERT(fecha_registro,DATE)) = 7 and YEAR(CONVERT(fecha_registro,DATE)) = YEAR(CURDATE()) ) ju,
					 (SELECT COALESCE(SUM(total),0) Ventas FROM farmacia WHERE MONTH(CONVERT(fecha_registro,DATE)) = 8 and YEAR(CONVERT(fecha_registro,DATE)) = YEAR(CURDATE()) ) ag,
					 (SELECT COALESCE(SUM(total),0) Ventas FROM farmacia WHERE MONTH(CONVERT(fecha_registro,DATE)) = 9 and YEAR(CONVERT(fecha_registro,DATE)) = YEAR(CURDATE()) ) s,
					 (SELECT COALESCE(SUM(total),0) Ventas FROM farmacia WHERE MONTH(CONVERT(fecha_registro,DATE)) = 10 and YEAR(CONVERT(fecha_registro,DATE)) = YEAR(CURDATE()) ) o,
					 (SELECT COALESCE(SUM(total),0) Ventas FROM farmacia WHERE MONTH(CONVERT(fecha_registro,DATE)) = 11 and YEAR(CONVERT(fecha_registro,DATE)) = YEAR(CURDATE()) ) n,
					 (SELECT COALESCE(SUM(total),0) Ventas FROM farmacia WHERE MONTH(CONVERT(fecha_registro,DATE)) = 12 and YEAR(CONVERT(fecha_registro,DATE)) = YEAR(CURDATE()) ) d ';

		$dao->ConsultarSqlNativoAjax($sql);
		
	}

	if($_POST['Requerimiento'] == "CargarItemsConsulta"){

		
		$dao= new Dao();
		
		$dao->Campo("c.id","");
	    $dao->Campo("p.nombre","");
	    

		$dao->TablasInnerAlias("nc_consulta_item","c","procedimiento","p");
		
		$dao->Where("c.id_nc_consulta",$_POST['Consulta'],"and");
		$dao->Where("c.id_empleado",$_SESSION['id_empleado'],"AND");
		$dao->Diferente("c.id_estado","19","");


		$dao->ConsultarAjax();
		
	}

	if($_POST['Requerimiento'] == "ObtenerReferido"){

		
		$dao= new Dao();
		
		$dao->Campo("r.apellidos","");
	    $dao->Campo("r.nombre","");
	    

		$dao->TablasInnerAlias("nc_consulta","c","referencia","r");
		
		$dao->Where("c.id",$_POST['Consulta'],"");


		$dao->ConsultarAjax();
		
	}

	if($_POST['Requerimiento'] == "LlenarTablaFacturasConFechasSri"){

		$dao = new Dao(); 

		$dao->Campo("c.numero","");
		$dao->Campo("CONCAT(p.apellido,' ',p.nombre) paciente","");
		$dao->Campo("c.id_paciente_cliente","");
		$dao->Campo("Date_format(c.fecha_registro,'%Y-%m-%d')","");
		$dao->Campo("c.total","");
		$dao->Campo("c.id_estado","");
		$dao->Campo("c.autorizada","");
		$dao->Campo("c.clave_sri","");
		$dao->Campo("c.mensaje_sri","");
		$dao->Campo("c.id","");

		$dao->TablasInnerAlias("nc_consulta","c","paciente","p");
		$dao->In_Where("c.id_estado","1,9,13,19,21","and");
		if($_POST['Estado']!="T"){
			$dao->Where("c.autorizada",'"'.$_POST['Estado'].'"',"and");	
		}
		
		if(isset($_POST["FechaDesde"]) && isset($_POST['FechaHasta'])){
			$dao->Entre("CONVERT(c.fecha_registro,DATE)",'"'.$_POST['FechaDesde'].'"','"'.$_POST['FechaHasta'].'"',"and");
			
		}else{
			$dao->Where("CONVERT(c.fecha_registro,DATE)",'"'.date("Y-m-d").'"',"and");
		}
		
		$apellidosBuscar="";

		if(isset($_POST['columns'][0]["search"]["value"]) )  
		{  
			if(trim($_POST['columns'][0]["search"]["value"])==""){
				$dao->Where("1","1","and");
			}else{
				$dao->Filtrar("c.numero",$_POST['columns'][0]["search"]["value"],"and");
			}
		} 
		if(isset($_POST['columns'][1]["search"]["value"]))  
		{  
			if(trim($_POST['columns'][1]["search"]["value"])==""){
				$dao->Where("1","1","and");
			}else{
				$dao->Filtrar("CONCAT(p.apellido,' ',p.nombre)",$_POST['columns'][1]["search"]["value"],"and");
					//$apellidosBuscar .= $_POST['columns'][2]["search"]["value"]." ";
			}
		}
		
		if(isset($_POST['columns'][2]["search"]["value"]) )  
		{  
			if(trim($_POST['columns'][2]["search"]["value"])==""){
				$dao->Where("1","1","");
			}else{
				$dao->Filtrar("c.id_paciente_cliente",$_POST['columns'][2]["search"]["value"],"");
					//$apellidosBuscar .= $_POST['columns'][3]["search"]["value"]." ";
			}
		}
		   
		if($_POST["length"] != -1)  
		{  
		   $dao->Limite($_POST['start'].",".$_POST['length']);  
		}  
		
		$dao->Ordenar("c.fecha_registro");  
		

		$respuesta =$dao->Consultar();
		
		$data = array();

		function array_sort_by($arrIni, $col, $order = SORT_ASC)
		{
			$arrAux = array();
			foreach ($arrIni as $key=> $row)
			{
				$arrAux[$key] = is_object($row) ? $arrAux[$key] = $row->$col : $row[$col];
				$arrAux[$key] = strtolower($arrAux[$key]);
			}
			array_multisort($arrAux, $order, $arrIni);
		}

		
		array_sort_by($respuesta, 'numero', $order = SORT_ASC);

		$nombreCliente='';
		$total=0;
		foreach ($respuesta as $row => $item){
			$total++;
			$sub_array = array(); 
			$accion = '';
			if($item[6]!='D' && $item[5]!=21){
				$accion = '<input type="checkbox" id="'.$item[9].'">';
			}
			/*if($item[8]=='CLAVE ACCESO REGISTRADA'){
				$accion = '<input type="checkbox" id="'.$item[9].'">';
			}*/

			$sub_array[] =$accion;
			$sub_array[] =$item[0];	
			$sub_array[] =$item[3];
			

			$dao2 = new Dao(); 
			
			if($item[2]==null){
				$sub_array[] = $item[1];
			}else{
				$dao2->Campo("CONCAT(apellido,' ',nombre) paciente","");
				$dao2->Tabla("paciente_cliente","");
				$dao2->Where("id",$item[2],"");

				$respuesta2 =$dao2->Consultar();
				foreach ($respuesta2 as $row => $item1){
					$nombreCliente= $item1[0];
				}
				$sub_array[] = $nombreCliente;
			}
			$sub_array[] = $item[1];		
			
			$sub_array[] =$item[4];
			$boton = '';			
			if($item[6]=='N'){
				$boton = '<button idEstado='.$item[5].' type="button" class="btn btn-sm btn-danger col-md-12 nopadding">No Autorizada</button>';
			}
			if($item[6]=='D'){
				$boton = '<button idEstado='.$item[5].' type="button" class="btn btn-sm btn-danger col-md-12 nopadding">Devuelta</button>';
			}
			if($item[6]=='S'){
				$boton = '<button idEstado='.$item[5].' type="button" class="btn btn-sm btn-success col-md-12 nopadding">Autorizada</button>';
			}
			if($item[5]==21){
				$boton = '<button idEstado='.$item[5].' type="button" class="btn btn-sm btn-danger col-md-12 nopadding">Anulada</button>';
			}
			$sub_array[] =$boton;
			$sub_array[] =$item[7];
			$sub_array[] =$item[8];
			
			$data[] = $sub_array; 
		}		

		$output = array(  
				"draw"           => intval($_POST["draw"]),  
				"recordsTotal"   => $total,  
				"recordsFiltered"=> $total,  
				"data"           => $data  
		);  
		echo json_encode($output);
	}

	if($_POST['Requerimiento'] == "LlenarTablaNc"){

		$dao = new Dao(); 

		$dao->Campo("c.numero","");
		$dao->Campo("con.numero","");
		$dao->Campo("CONCAT(p.apellido,' ',p.apellido_materno,' ',p.nombre) paciente","");
		$dao->Campo("CONCAT(pc.apellido,' ',pc.nombre) cliente","");
		$dao->Campo("Date_format(c.fecha_registro,'%Y-%m-%d')","");
		$dao->Campo("c.total","");
		$dao->Campo("c.id_estado","");
		$dao->Campo("c.autorizada","");					

		$dao->TablasInnerAlias("nc_consulta","c","paciente","p");
		$dao->TablasInnerAlias("nc_consulta","c","consulta","con");
		$dao->TablasInnerAlias("nc_consulta","c","paciente_cliente","pc");

		$dao->In_Where("c.id_estado","1","and");
				
		if(isset($_POST["search"]["value"]) )  
		{  			
			$dao->Filtrar("CONCAT(c.numero,' ',con.numero,' ',p.apellido,' ',p.apellido_materno,' ',p.nombre,' ',pc.apellido,' ',pc.nombre)",$_POST["search"]["value"],"");		
		} 
				  
		if($_POST["length"] != -1)  
		{  
		   $dao->Limite($_POST['start'].",".$_POST['length']);  
		}  
		
		$dao->Ordenar("c.fecha_registro desc");  
		$respuesta =$dao->Consultar();				
		$total=0;
		$data = array();
		foreach ($respuesta as $row => $item){
			$total++;
			$sub_array = array(); 
					
			$sub_array[] =$item[0];	
			$sub_array[] =$item[1];
			$sub_array[] =$item[2];
			$sub_array[] =$item[3];
			$sub_array[] =$item[4];
			$sub_array[] =$item[5];
						
			$boton = '';			
			if($item[7]=='N'){
				$boton = '<button idEstado='.$item[6].' type="button" class="btn btn-sm btn-warning col-md-12 nopadding">No Autorizada</button>';
			}
			if($item[7]=='D'){
				$boton = '<button idEstado='.$item[6].' type="button" class="btn btn-sm btn-danger col-md-12 nopadding">Devuelta</button>';
			}
			if($item[7]=='S'){
				$boton = '<button idEstado='.$item[6].' type="button" class="btn btn-sm btn-success col-md-12 nopadding">Autorizada</button>';
			}
			if($item[6]==21){
				$boton = '<button idEstado='.$item[6].' type="button" class="btn btn-sm btn-danger col-md-12 nopadding">Anulada</button>';
			}
			$sub_array[] =$boton;
			
			$data[] = $sub_array; 
		}		

		$output = array(  
				"draw"           => intval($_POST["draw"]),  
				"recordsTotal"   => $total,  
				"recordsFiltered"=> $total,  
				"data"           => $data  
		);  
		echo json_encode($output);
	}

	if($_POST['Requerimiento'] == "LlenarTablaReporteNc"){

		$dao = new Dao(); 

		$dao->Campo("c.numero","");
		$dao->Campo("con.numero","");
		$dao->Campo("CONCAT(p.apellido,' ',p.apellido_materno,' ',p.nombre) paciente","");
		$dao->Campo("CONCAT(pc.apellido,' ',pc.nombre) cliente","");
		$dao->Campo("Date_format(c.fecha_registro,'%Y-%m-%d')","");
		$dao->Campo("c.total","");
		$dao->Campo("c.id_estado","");
		$dao->Campo("c.autorizada","");					

		$dao->TablasInnerAlias("nc_consulta","c","paciente","p");
		$dao->TablasInnerAlias("nc_consulta","c","consulta","con");
		$dao->TablasInnerAlias("nc_consulta","c","paciente_cliente","pc");

		$dao->In_Where("c.id_estado","1","and");
				
		if(isset($_POST["search"]["value"]) )  
		{  			
			$dao->Filtrar("CONCAT(c.numero,' ',con.numero,' ',p.apellido,' ',p.apellido_materno,' ',p.nombre,' ',pc.apellido,' ',pc.nombre)",$_POST["search"]["value"],"and");		
		}
		if(trim($_POST['columns'][1]["search"]["value"])==""){
			$dao->Where("CONVERT(c.fecha_registro,DATE)",'CURDATE()',"");
		}else{				
			
			$dao->Entre("CONVERT(c.fecha_registro,DATE)","'".$_POST['columns'][1]["search"]["value"]."'","'".$_POST['columns'][2]["search"]["value"]."'","");
		} 
				  
		if($_POST["length"] != -1)  
		{  
		   $dao->Limite($_POST['start'].",".$_POST['length']);  
		}  
		
		$dao->Ordenar("c.fecha_registro desc");  
		$respuesta =$dao->Consultar();				
		$total=0;
		$data = array();
		foreach ($respuesta as $row => $item){
			$total++;
			$sub_array = array(); 
					
			$sub_array[] =$item[0];	
			$sub_array[] =$item[1];
			$sub_array[] =$item[2];
			$sub_array[] =$item[3];
			$sub_array[] =$item[4];
			$sub_array[] =$item[5];
						
			$boton = '';			
			if($item[7]=='N'){
				$boton = '<button idEstado='.$item[6].' type="button" class="btn btn-sm btn-warning col-md-12 nopadding">No Autorizada</button>';
			}
			if($item[7]=='D'){
				$boton = '<button idEstado='.$item[6].' type="button" class="btn btn-sm btn-danger col-md-12 nopadding">Devuelta</button>';
			}
			if($item[7]=='S'){
				$boton = '<button idEstado='.$item[6].' type="button" class="btn btn-sm btn-success col-md-12 nopadding">Autorizada</button>';
			}
			if($item[6]==21){
				$boton = '<button idEstado='.$item[6].' type="button" class="btn btn-sm btn-danger col-md-12 nopadding">Anulada</button>';
			}
			$sub_array[] =$boton;
			
			$data[] = $sub_array; 
		}		

		$output = array(  
				"draw"           => intval($_POST["draw"]),  
				"recordsTotal"   => $total,  
				"recordsFiltered"=> $total,  
				"data"           => $data  
		);  
		echo json_encode($output);
	}

	if($_POST['Requerimiento'] == "CargarNotaCredito"){

		
		$dao= new Dao();

		$dao->Campo("c.id","");
		$dao->Campo("c.id_paciente","");
		$dao->Campo("p.nombre","");
		$dao->Campo("CONCAT(p.apellido,' ',p.apellido_materno)","");
		$dao->Campo("p.cedula","");
		$dao->Campo("p.direccion","");
		$dao->Campo("p.telefono","");
		$dao->Campo("p.email","");
		$dao->Campo("p.fecha_nacimiento","");
		$dao->Campo("p.apellido","");
		$dao->Campo("c.id_paciente_cliente","");
		$dao->Campo("c.mismosdatos","");
		$dao->Campo("c.total","");
		$dao->Campo("c.descuento","");
		$dao->Campo("c.id_estado","");
		$dao->Campo("c.id_estado_lab","");
		$dao->Campo("c.id_estado_rx","");
		$dao->Campo("c.id_estado_eco","");
		$dao->Campo("c.id_estado_tomo","");
		$dao->Campo("c.autorizada","");
		$dao->Campo("CONVERT(c.fecha_registro,Date)","");
		$dao->Campo("c.clave_sri","");
		$dao->Campo('CASE WHEN CONVERT(c.fecha_registro,date) < Curdate() THEN false ELSE true END',"");
		$dao->TablasInnerAlias("nc_consulta","c","paciente","p");
		
		$dao->Where("c.numero","'".$_POST['Numero']."'","");


		$dao->ConsultarAjax();
		//echo json_encode($dao->Consultar2());
		
		
	}

	if($_POST['Requerimiento'] == "ConsultarDetalleNc"){

		
		$dao= new Dao();
		
		$dao->Campo("c.*","");
		$dao->Campo("e.apellidos","");
		$dao->Campo("e.nombres","");
		

		$dao->TablasInnerAlias("nc_consulta_item","c","empleado","e");
		
		$dao->Where("c.id_nc_consulta",$_POST['Consulta'],"AND");
		$dao->Diferente("c.id_estado",25,"");


		$dao->ConsultarAjax();
		//echo json_encode($dao->Consultar2());
		
		
	}
	
}
