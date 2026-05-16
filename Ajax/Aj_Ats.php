<?php
session_start();
require_once "autoloadAjax.php";
function CrearDirecctorio($ruc){
		$carpeta = '../ATS/'.$ruc."/".date("Y");
		if (!file_exists($carpeta)) {
		    mkdir($carpeta, 0777, true);
		}
}
if(isset($_POST['Requerimiento'])){

	function ObtenerEmpresa(){

		$dao = new Dao();
		$dao->Campo("razon_social","");
	    $dao->Campo("ruc","");
	    $dao->Campo("direccion","");
	    $dao->Campo("telefono","");
	    $dao->Campo("correo1","");

	    $dao->Tabla("empresa","");
	    $dao->Where("id","2","");

		$respuesta = $dao->Consultar();
		$jsondata = null;
		foreach ($respuesta as $row => $item){
			$jsondata=$item;
		}
		return $jsondata;
	}
	function ObtenerNumEstablecimientos(){

		$dao = new Dao();

        $dao->Contar();
        

        $dao->Tabla("establecimiento","");
        $dao->Where("id_empresa","2","");

		$respuesta = $dao->Consultar();
		$jsondata = null;
		foreach ($respuesta as $row => $item){
			$jsondata=$item[0];
		}
		return $jsondata;
	}
	function ObtenerTotalVentas($año,$mes){
		$total = 0;
		$dao = new Dao();

        $dao->Sumar("f.total","");
                    
        $dao->Tabla("consulta","f");        
        $dao->Where("MONTH(f.fecha_registro)",$mes,"and");
		$dao->Where("YEAR(f.fecha_registro)",$año,"");

		$respuesta = $dao->Consultar();
		foreach ($respuesta as $row => $item){
			$total=$item[0];
		}
		
		$dao = new Dao();
		$dao->Sumar("f.total","");
                    
        $dao->Tabla("nc_consulta","f");        
        $dao->Where("MONTH(f.fecha_registro)",$mes,"and");
		$dao->Where("YEAR(f.fecha_registro)",$año,"");

		$respuesta = $dao->Consultar();
		foreach ($respuesta as $row => $item){
			$total= $total - $item[0];
		}
		///////////////////////////////////////////////////////FARMACIA

		/*$dao = new Dao();

        $dao->Sumar("f.total - f.total_iva","");
                    
        $dao->Tabla("farmacia","f");        
        $dao->Where("MONTH(f.fecha_registro)",$mes,"and");
		$dao->Where("YEAR(f.fecha_registro)",$año,"");

		$respuesta = $dao->Consultar();
		foreach ($respuesta as $row => $item){
			$total=  $total + $item[0];
		}
		
		$dao = new Dao();
		$dao->Sumar("f.total - f.total_iva","");
                    
        $dao->Tabla("nc_farmacia","f");        
        $dao->Where("MONTH(f.fecha_registro)",$mes,"and");
		$dao->Where("YEAR(f.fecha_registro)",$año,"");

		$respuesta = $dao->Consultar();
		foreach ($respuesta as $row => $item){
			$total= $total - $item[0];
		}*/

		return number_format($total, 2, '.', '');
	}
	function ObtenerTotalVentasFarmacia($año,$mes){
		$dao = new Dao();

		$dao->Campo("SUBSTRING(f.numero,1,3)","");
        $dao->Sumar("f.total - f.total_iva","");
                    
        $dao->Tabla("farmacia","f");
        
        $dao->Where("MONTH(f.fecha_registro)",$mes,"and");
		$dao->Where("YEAR(f.fecha_registro)",$año,"");
		$dao->Agrupar("SUBSTRING(f.numero,1,3)","");
		
		$respuesta = $dao->Consultar();	
		$total =0;
		foreach ($respuesta as $row => $item){

			$dao = new Dao();
			
	        $dao->Sumar("f.total - f.total_iva","");
	                    
	        $dao->Tabla("nc_farmacia","f");
	        
	        $dao->Where("MONTH(f.fecha_registro)",$mes,"and");
			$dao->Where("YEAR(f.fecha_registro)",$año,"and");
			$dao->Where("SUBSTRING(f.numero,1,3)","'".$item[0]."'","");

			$respuesta1 = $dao->Consultar();
			$total = $item[1];	
			foreach ($respuesta1 as $row1 => $item1){
				$total = $item[1] - $item1[0];
			}
		}
		return $total;	
	}
	function ObtenerTotalVentasEstablecimiento($año,$mes){
		$ventasEstablecimiento = '';
		$dao = new Dao();

		$dao->Campo("SUBSTRING(f.numero,1,3)","");
        $dao->Sumar("f.total","");
                    
        $dao->Tabla("consulta","f");
        
        $dao->Where("MONTH(f.fecha_registro)",$mes,"and");
		$dao->Where("YEAR(f.fecha_registro)",$año,"");
		$dao->Agrupar("SUBSTRING(f.numero,1,3)","");
		
		$respuesta = $dao->Consultar();		

		foreach ($respuesta as $row => $item){

			$dao = new Dao();
			
	        $dao->Sumar("f.total","");
	                    
	        $dao->Tabla("nc_consulta","f");
	        
	        $dao->Where("MONTH(f.fecha_registro)",$mes,"and");
			$dao->Where("YEAR(f.fecha_registro)",$año,"and");
			$dao->Where("SUBSTRING(f.numero,1,3)","'".$item[0]."'","");

			$respuesta1 = $dao->Consultar();
			$total = $item[1];	
			foreach ($respuesta1 as $row1 => $item1){
				$total = $item[1] - $item1[0];
			}
			//$total = $total + ObtenerTotalVentasFarmacia($año,$mes);
			$ventasEstablecimiento .= ' <ventaEst>
											<codEstab>'.$item[0].'</codEstab>
											<ventasEstab>'.number_format($total, 2, '.', '').'</ventasEstab>
											<ivaComp>0.00</ivaComp>
										</ventaEst> ';
		}

		return $ventasEstablecimiento;
	}
	function ObtenerDatosRetencion($id,$tipo){
		$detalleRetencion = '';
		
			$dao = new Dao();

	        $dao->Campo("LPAD(establecimiento, 3, '0')","");        
	        $dao->Campo("LPAD(punto_venta, 3, '0')","");
	        $dao->Campo("LPAD(secuencia, 9, '0')","");
	        $dao->Campo("clave_sri","");
	        $dao->Campo("Date_format(fecha_registro,'%d/%m/%Y')","");
	               
	        $dao->Tabla("retencion","");
	        $dao->Where("id_empresa",$_SESSION["id"],"and");
	        $dao->Where($tipo,$id,"");
			
			$respuesta = $dao->Consultar();
			foreach ($respuesta as $row => $item){
				$detalleRetencion = ' <estabRetencion1>'.$item[0].'</estabRetencion1> 
									  <ptoEmiRetencion1>'.$item[1].'</ptoEmiRetencion1> 
									  <secRetencion1>'.$item[2].'</secRetencion1> 
									  <autRetencion1>'.$item[3].'</autRetencion1> 
									  <fechaEmiRet1>'.$item[4].'</fechaEmiRet1> 
									 ';
			}
		
		
		return $detalleRetencion;
	}
	function ObtenerDetalleNotasCredito($año,$mes){
		$detallecompras = '';

		$dao = new Dao();

        $dao->Campo("p.ruc","");
        $dao->Campo("Date_format(nc.fecha_registro,'%d/%m/%Y')","");
        $dao->Campo("nc.factura","");
        $dao->Campo("Date_format(nc.fecha_emision,'%d/%m/%Y')","");
        $dao->Campo("nc.autorizacion","");
        $dao->Campo("nc.subtotal","");
        $dao->Campo("nc.iva","");
        $dao->Campo("i.factura","");
        $dao->Campo("i.autorizacion","");
		$dao->Campo("i.tipo_compra","");

        $dao->TablasInnerAlias("nota_credito_compra","nc","proveedor","p");
        $dao->TablasInnerAlias("nota_credito_compra","nc","ingreso","i");
        $dao->Where("i.id_empresa",$_SESSION["id"],"and");
        $dao->Where("MONTH(i.fecha_registro)",$mes,"and");
		$dao->Where("YEAR(i.fecha_registro)",$año,"");

		$respuesta = $dao->Consultar();
		foreach ($respuesta as $row => $item){
			$tpIdProv = "01";
			if(strlen($item[0])==10){
				$tpIdProv = "02";
			}
			
			$detallecompras .= ' <detalleCompras>
									<codSustento>'.$item[9].'</codSustento>
									<tpIdProv>'.$tpIdProv.'</tpIdProv>
									<idProv>'.$item[0].'</idProv>
									<tipoComprobante>04</tipoComprobante>
									<parteRel>NO</parteRel>
									<fechaRegistro>'.$item[1].'</fechaRegistro>
									<establecimiento>'.substr($item[2],0,3).'</establecimiento>
									<puntoEmision>'.substr($item[2],4,3).'</puntoEmision>
									<secuencial>'.substr($item[2],8).'</secuencial>
									<fechaEmision>'.$item[3].'</fechaEmision>
									<autorizacion>'.$item[4].'</autorizacion>
									<baseNoGraIva>0.00</baseNoGraIva>
									<baseImponible>0.00</baseImponible>
									<baseImpGrav>'.number_format($item[5], 2, '.', '').'</baseImpGrav>
									<baseImpExe>0.00</baseImpExe>
									<montoIce>0.00</montoIce>
									<montoIva>'.number_format($item[6], 2, '.', '').'</montoIva>
									<valRetBien10>0.00</valRetBien10>
									<valRetServ20>0.00</valRetServ20>
									<valorRetBienes>0.00</valorRetBienes>
									<valRetServ50>0.00</valRetServ50>
									<valorRetServicios>0.00</valorRetServicios>
									<valRetServ100>0.00</valRetServ100>
									<totbasesImpReemb>0.00</totbasesImpReemb>
									<pagoExterior>
										<pagoLocExt>01</pagoLocExt>
										<paisEfecPago>NA</paisEfecPago>
										<aplicConvDobTrib>NA</aplicConvDobTrib>
										<pagExtSujRetNorLeg>NA</pagExtSujRetNorLeg>
									</pagoExterior>
									<docModificado>01</docModificado> 
									<estabModificado>'.substr($item[7],0,3).'</estabModificado> 
									<ptoEmiModificado>'.substr($item[7],4,3).'</ptoEmiModificado> 
									<secModificado>'.substr($item[7],8).'</secModificado> 
									<autModificado>'.$item[8].'</autModificado> 

								</detalleCompras> ';	

		}
		return $detallecompras;
	}
	function ObtenerDetalleCompras($año,$mes){
		$detallecompras = '';

		$dao = new Dao();

        $dao->Campo("p.ruc","");
        $dao->Campo("Date_format(i.fecha_registro,'%d/%m/%Y')","");
        $dao->Campo("i.numero","");
        $dao->Campo("Date_format(i.fecha,'%d/%m/%Y')","");
        $dao->Campo("i.numero","");
        $dao->Campo("i.subtotal","");
        $dao->Campo("i.iva","");
        $dao->Campo("'Sin Codigo'","");
        $dao->Campo("0","f1");
        $dao->Campo("0","f2");
        $dao->Campo("'-Efectivo'","");
        $dao->Campo("'06'","");
        $dao->Campo("i.id","");
        //$dao->Campo("'id_ingreso'","");
        //$dao->Campo("i.porcentajeiva","");
        //$dao->Campo("i.retencioniva","");

        $dao->TablasInnerAlias("movimiento_bodega","i","proveedor","p");
        
        $dao->Where("MONTH(i.fecha_registro)",$mes,"and");
		$dao->Where("YEAR(i.fecha_registro)",$año,"");

		$respuesta = $dao->Consultar();

		
		
		foreach ($respuesta as $row => $item){
			$tpIdProv = "01";
			if(strlen($item[0])==10){
				$tpIdProv = "02";
			}
			$forma_pago = "<formaPago>01</formaPago>";			
			if( strpos($item[10],"Efectivo") || strpos($item[10],"Credito") ){
				if(strpos($item[10],"Cheque") || strpos($item[10],"Transferencia") || strpos($item[10],"Tarjeta")){
					$forma_pago = "<formaPago>01</formaPago><formaPago>20</formaPago>";
				}				
			}else{
				$forma_pago = "<formaPago>20</formaPago>";
			}
			$valRetBien10 = 0.00;
			$valRetServ20 = 0.00;
			$valorRetBienes = 0.00;
			$valRetServ50 = 0.00;
			$valorRetServicios = 0.00;
			$valRetServ100 = 0.00;
			
			$detalleRetencion = "";
			$detalleAir = '';
			$iva = $item[6];
			if($iva==0){
				$detallecompras .= ' <detalleCompras>
									<codSustento>'.$item[11].'</codSustento>
									<tpIdProv>'.$tpIdProv.'</tpIdProv>
									<idProv>'.$item[0].'</idProv>
									<tipoComprobante>01</tipoComprobante>
									<parteRel>NO</parteRel>
									<fechaRegistro>'.$item[1].'</fechaRegistro>
									<establecimiento>'.substr($item[2],0,3).'</establecimiento>
									<puntoEmision>'.substr($item[2],4,3).'</puntoEmision>
									<secuencial>'.substr($item[2],8).'</secuencial>
									<fechaEmision>'.$item[3].'</fechaEmision>
									<autorizacion>'.$item[4].'</autorizacion>
									<baseNoGraIva>'.number_format($item[5], 2, '.', '').'</baseNoGraIva>
									<baseImponible>0.00</baseImponible>
									<baseImpGrav>0.00</baseImpGrav>
									<baseImpExe>0.00</baseImpExe>
									<montoIce>0.00</montoIce>
									<montoIva>'.number_format($item[6], 2, '.', '').'</montoIva>
									<valRetBien10>'.$valRetBien10.'</valRetBien10>
									<valRetServ20>'.$valRetServ20.'</valRetServ20>
									<valorRetBienes>'.$valorRetBienes.'</valorRetBienes>
									<valRetServ50>'.$valRetServ50.'</valRetServ50>
									<valorRetServicios>'.$valorRetServicios.'</valorRetServicios>
									<valRetServ100>'.$valRetServ100.'</valRetServ100>
									<totbasesImpReemb>0.00</totbasesImpReemb>
									<pagoExterior>
										<pagoLocExt>01</pagoLocExt>
										<paisEfecPago>NA</paisEfecPago>
										<aplicConvDobTrib>NA</aplicConvDobTrib>
										<pagExtSujRetNorLeg>NA</pagExtSujRetNorLeg>
									</pagoExterior>
									<formasDePago>
									  '.$forma_pago.'
									</formasDePago>

									<air>
									 '.$detalleAir.'	
									</air>
									'.$detalleRetencion.'
								</detalleCompras> ';
			}else{
				$subtotalgrava = ($iva * 100)/12;
				$subtotalngrava = $item[5] - $subtotalgrava;
				if($subtotalngrava<0){
					$subtotalngrava = 0;
				}
				$detallecompras .= ' <detalleCompras>
									<codSustento>'.$item[11].'</codSustento>
									<tpIdProv>'.$tpIdProv.'</tpIdProv>
									<idProv>'.$item[0].'</idProv>
									<tipoComprobante>01</tipoComprobante>
									<parteRel>NO</parteRel>
									<fechaRegistro>'.$item[1].'</fechaRegistro>
									<establecimiento>'.substr($item[2],0,3).'</establecimiento>
									<puntoEmision>'.substr($item[2],4,3).'</puntoEmision>
									<secuencial>'.substr($item[2],8).'</secuencial>
									<fechaEmision>'.$item[3].'</fechaEmision>
									<autorizacion>'.$item[4].'</autorizacion>
									<baseNoGraIva>'.number_format($subtotalngrava, 2, '.', '').'</baseNoGraIva>
									<baseImponible>0.00</baseImponible>
									<baseImpGrav>'.number_format($subtotalgrava, 2, '.', '').'</baseImpGrav>
									<baseImpExe>0.00</baseImpExe>
									<montoIce>0.00</montoIce>
									<montoIva>'.number_format($item[6], 2, '.', '').'</montoIva>
									<valRetBien10>'.$valRetBien10.'</valRetBien10>
									<valRetServ20>'.$valRetServ20.'</valRetServ20>
									<valorRetBienes>'.$valorRetBienes.'</valorRetBienes>
									<valRetServ50>'.$valRetServ50.'</valRetServ50>
									<valorRetServicios>'.$valorRetServicios.'</valorRetServicios>
									<valRetServ100>'.$valRetServ100.'</valRetServ100>
									<totbasesImpReemb>0.00</totbasesImpReemb>
									<pagoExterior>
										<pagoLocExt>01</pagoLocExt>
										<paisEfecPago>NA</paisEfecPago>
										<aplicConvDobTrib>NA</aplicConvDobTrib>
										<pagExtSujRetNorLeg>NA</pagExtSujRetNorLeg>
									</pagoExterior>
									<formasDePago>
									  '.$forma_pago.'
									</formasDePago>

									<air>
									 '.$detalleAir.'	
									</air>
									'.$detalleRetencion.'
								</detalleCompras> ';
			}
				

		}

		

		return $detallecompras;			
	}
	function ObtenerDetalleVentasNc($año,$mes){
		$detalleVentas = '';
		
		/*$sql = 'SELECT TRIM(x.ruc),SUM(x.tt),SUM(x.sb),SUM(x.iva)
				from(
				    SELECT pc.ruc,COUNT(*) tt,SUM(c.total) sb,SUM(0) iva
				    FROM nc_consulta c INNER JOIN paciente_cliente pc on (c.id_paciente_cliente = pc.id)
				    WHERE MONTH(c.fecha_registro) = '.$mes.' AND YEAR(c.fecha_registro) = '.$año.'
				    GROUP BY pc.id
				    UNION
				    SELECT pc.ruc,COUNT(*) tt,SUM(f.total-f.total_iva) sb,SUM(f.total_iva) iva
				    FROM nc_farmacia f INNER JOIN paciente_cliente pc on (f.id_paciente_cliente = pc.id)
				    WHERE MONTH(f.fecha_registro) = '.$mes.' AND YEAR(f.fecha_registro) = '.$año.'
				    GROUP BY pc.id
				    )x
				GROUP BY x.ruc ';*/
		$sql = 'SELECT pc.ruc,COUNT(*) tt,SUM(c.total) sb,SUM(0) iva
				FROM nc_consulta c INNER JOIN paciente_cliente pc on (c.id_paciente_cliente = pc.id)
				WHERE MONTH(c.fecha_registro) = '.$mes.' AND YEAR(c.fecha_registro) = '.$año.'
				GROUP BY pc.id
				';
		$dao = new Dao();
		$respuesta = $dao->ConsultarSqlNativo($sql);
				
		foreach ($respuesta as $row => $item){
			$tpIdCliente = "07";
			$parteRelVtas = '';
			if(strlen($item[0])==10){
				$tpIdCliente = "05";
				$parteRelVtas = '<parteRelVtas>NO</parteRelVtas>';
			}
			if(strlen($item[0])==13 && $item[0] != '9999999999999'){
				$tpIdCliente = "04";
				$parteRelVtas = '<parteRelVtas>NO</parteRelVtas>';
			}
			$detalleVentas .= ' <detalleVentas>
									<tpIdCliente>'.$tpIdCliente.'</tpIdCliente>
									<idCliente>'.$item[0].'</idCliente>
									'.$parteRelVtas.'
									<tipoComprobante>04</tipoComprobante>
									<tipoEmision>F</tipoEmision>
									<numeroComprobantes>'.$item[1].'</numeroComprobantes>
									<baseNoGraIva>0.00</baseNoGraIva>
									<baseImponible>0.00</baseImponible>
									<baseImpGrav>'.number_format($item[2], 2, '.', '').'</baseImpGrav>
									<montoIva>'.number_format($item[3], 2, '.', '').'</montoIva>
									<montoIce>0.00</montoIce>
									<valorRetIva>0.00</valorRetIva>
									<valorRetRenta>0.00</valorRetRenta>									
								</detalleVentas> ';
		}
		
		return $detalleVentas;						
	}
	
	function ObtenerDetalleVentas($año,$mes){
		$detalleVentas = '';
		
		/*$sql = 'SELECT TRIM(x.ruc) rc,SUM(x.tt),SUM(x.sb),SUM(x.iva),x.fp,SUM(0) rt,SUM(0) rtiva
				from(
				    SELECT pc.ruc,COUNT(*) tt,SUM(c.total) sb,SUM(0) iva,"-Efectivo" fp,SUM(0) rt,SUM(0) rtiva
				    FROM consulta c INNER JOIN paciente_cliente pc on (c.id_paciente_cliente = pc.id)
				    WHERE MONTH(c.fecha_registro) = '.$mes.' AND YEAR(c.fecha_registro) = '.$año.'
				    GROUP BY pc.id
				    UNION
				    SELECT pc.ruc,COUNT(*) tt,SUM(f.total-f.total_iva) sb,SUM(f.total_iva) iva,"-Efectivo" fp,SUM(0) rt,SUM(0) rtiva
				    FROM farmacia f INNER JOIN paciente_cliente pc on (f.id_paciente_cliente = pc.id)
				    WHERE MONTH(f.fecha_registro) = '.$mes.' AND YEAR(f.fecha_registro) = '.$año.'
				    GROUP BY pc.id
				    )x
				GROUP BY x.ruc ';*/

		$sql = 'SELECT pc.ruc rc,COUNT(*) tt,SUM(c.total) sb,SUM(0) iva,"-Efectivo" fp,SUM(0) rt,SUM(0) rtiva
				FROM consulta c INNER JOIN paciente_cliente pc on (c.id_paciente_cliente = pc.id)
				WHERE MONTH(c.fecha_registro) = '.$mes.' AND YEAR(c.fecha_registro) = '.$año.'
				GROUP BY pc.id
				';
		$dao = new Dao();
		$respuesta = $dao->ConsultarSqlNativo($sql);

		foreach ($respuesta as $row => $item){
			$tpIdCliente = "07";
			$parteRelVtas = '';
			if(strlen($item['rc'])==10){
				$tpIdCliente = "05";
				$parteRelVtas = '<parteRelVtas>NO</parteRelVtas>';
			}
			if(strlen($item['rc'])==13 && $item['rc'] != '9999999999999'){
				$tpIdCliente = "04";
				$parteRelVtas = '<parteRelVtas>NO</parteRelVtas>';
			}

			$forma_pago = "<formaPago>01</formaPago>";			
			if( strpos($item['fp'],"Efectivo") || strpos($item['fp'],"Credito") ){
				if(strpos($item['fp'],"Cheque") || strpos($item['fp'],"Transferencia") || strpos($item['fp'],"Tarjeta")){
					$forma_pago = "<formaPago>01</formaPago><formaPago>20</formaPago>";
				}				
			}else{
				$forma_pago = "<formaPago>20</formaPago>";
			}
			$iva = $item[3];
			if($iva==0){
				$detalleVentas .= ' <detalleVentas>
									<tpIdCliente>'.$tpIdCliente.'</tpIdCliente>
									<idCliente>'.$item[0].'</idCliente>
									'.$parteRelVtas.'
									<tipoComprobante>18</tipoComprobante>
									<tipoEmision>F</tipoEmision>
									<numeroComprobantes>'.$item[1].'</numeroComprobantes>
									<baseNoGraIva>'.number_format($item[2], 2, '.', '').'</baseNoGraIva>
									<baseImponible>0.00</baseImponible>
									<baseImpGrav>0.00</baseImpGrav>
									<montoIva>'.number_format($item[3], 2, '.', '').'</montoIva>
									<montoIce>0.00</montoIce>
									<valorRetIva>'.number_format($item[6], 2, '.', '').'</valorRetIva>
									<valorRetRenta>'.number_format($item[5], 2, '.', '').'</valorRetRenta>
									<formasDePago>
										'.$forma_pago.'
									</formasDePago>
								</detalleVentas> ';
			}else{
				$subtotalgrava = ($iva * 100)/12;
				$subtotalngrava = $item[2] - $subtotalgrava;
				if($subtotalngrava<0){
					$subtotalngrava = 0;
				}
				$detalleVentas .= ' <detalleVentas>
									<tpIdCliente>'.$tpIdCliente.'</tpIdCliente>
									<idCliente>'.$item[0].'</idCliente>
									'.$parteRelVtas.'
									<tipoComprobante>18</tipoComprobante>
									<tipoEmision>F</tipoEmision>
									<numeroComprobantes>'.$item[1].'</numeroComprobantes>
									<baseNoGraIva>'.number_format($subtotalngrava, 2, '.', '').'</baseNoGraIva>
									<baseImponible>0.00</baseImponible>
									<baseImpGrav>'.number_format($subtotalgrava, 2, '.', '').'</baseImpGrav>
									<montoIva>'.number_format($item[3], 2, '.', '').'</montoIva>
									<montoIce>0.00</montoIce>
									<valorRetIva>'.number_format($item[6], 2, '.', '').'</valorRetIva>
									<valorRetRenta>'.number_format($item[5], 2, '.', '').'</valorRetRenta>
									<formasDePago>
										'.$forma_pago.'
									</formasDePago>
								</detalleVentas> ';
			}
			
		}
		
		return $detalleVentas;						
	}

	function ObtenerDetalleAnulados($año,$mes){
		$detalleVentas = '';
		$dao = new Dao();

        $dao->Campo("LPAD(SUBSTRING(f.numero,1,3), 3, '0')","");        
        $dao->Campo("LPAD(SUBSTRING(f.numero,5,3), 3, '0')","");
        $dao->Campo("LPAD(SUBSTRING(f.numero,9,9), 9, '0')","");
        $dao->Campo("f.clave_sri","");
        
        

        $dao->Tabla("consulta","f");
        
        $dao->Where("MONTH(f.fecha_registro)",$mes,"and");
		$dao->Where("YEAR(f.fecha_registro)",$año,"and");
		$dao->Where("f.id_estado","21","");

		$respuesta = $dao->Consultar();

		/*$dao = new Dao();

        $dao->Campo("LPAD(SUBSTRING(f.numero,1,3), 3, '0')","");        
        $dao->Campo("LPAD(SUBSTRING(f.numero,5,3), 3, '0')","");
        $dao->Campo("LPAD(SUBSTRING(f.numero,9,9), 9, '0')","");
        $dao->Campo("f.clave_sri","");
        
        

        $dao->Tabla("farmacia","f");
        
        $dao->Where("MONTH(f.fecha_registro)",$mes,"and");
		$dao->Where("YEAR(f.fecha_registro)",$año,"and");
		$dao->Where("f.id_estado","21","");

		$respuesta2 = $dao->Consultar();
		
		$respuesta = array_merge($respuesta1, $respuesta2);*/

		foreach ($respuesta as $row => $item){
			
			$detalleVentas .= ' <detalleAnulados>
									<tipoComprobante>18</tipoComprobante>
									<establecimiento>'.$item[0].'</establecimiento>
									<puntoEmision>'.$item[1].'</puntoEmision>
									<secuencialInicio>'.$item[2].'</secuencialInicio>
									<secuencialFin>'.$item[2].'</secuencialFin>
									<autorizacion>'.$item[3].'</autorizacion>
								</detalleAnulados> ';
		}
		
		return $detalleVentas;						
	}
	function GuardarAts($ruta){
		$datos = array(							
								"mes"=>$_POST["Mes"],
								"anio"=>$_POST["Anio"],
								"ruta"=>substr($ruta,3),
								);

		                        $dao= new Dao();
	                            $dao->GuardarAjax("ats ",$datos);
	}

	if($_POST['Requerimiento'] == "GenerarAts"){

		$DatosEmpresa = ObtenerEmpresa();
		$estableciomineto = str_pad(ObtenerNumEstablecimientos(),  3, "0", STR_PAD_LEFT);		
		$totalVentas = ObtenerTotalVentas($_POST['Anio'],$_POST['Mes']);
		$año = $_POST['Anio'];
		$mes = $_POST['Mes'];
		$detallecompras = "";// ObtenerDetalleCompras($_POST['Anio'],$_POST['Mes']);
		//$detallecompras .= ObtenerDetalleNotasCredito($_POST['Anio'],$_POST['Mes']);
		$detalleVentas =   ObtenerDetalleVentas($_POST['Anio'],$_POST['Mes']);
		$detalleVentas .=  ObtenerDetalleVentasNc($_POST['Anio'],$_POST['Mes']);
		$detalleAnulados = ObtenerDetalleAnulados($_POST['Anio'],$_POST['Mes']);
		$ventasEstablecimiento = ObtenerTotalVentasEstablecimiento($_POST['Anio'],$_POST['Mes']);

$string = <<<XML
<?xml version="1.0" encoding="UTF-8"?>
<iva>
	<TipoIDInformante>R</TipoIDInformante>
	<IdInformante>$DatosEmpresa[1]</IdInformante>
	<razonSocial>$DatosEmpresa[0]</razonSocial>
	<Anio>$año</Anio>
	<Mes>$mes</Mes>
	<numEstabRuc>$estableciomineto</numEstabRuc>
	<totalVentas>$totalVentas</totalVentas>
	<codigoOperativo>IVA</codigoOperativo>
    <compras>
    	$detallecompras
    </compras>
    <ventas>
    	$detalleVentas
    </ventas>
    <ventasEstablecimiento>
		$ventasEstablecimiento
	</ventasEstablecimiento>
	<anulados>
		$detalleAnulados
	</anulados>
</iva>

XML;

$xml = new SimpleXMLElement($string);
  
 CrearDirecctorio($DatosEmpresa[1]);


 $xml->asXML('../ATS/'.$DatosEmpresa[1]."/".date("Y").'/ats-'.$_POST['Anio']." ".$_POST['Mes'].'.xml');
			GuardarAts('../ATS/'.$DatosEmpresa[1]."/".date("Y").'/ats-'.$_POST['Anio']." ".$_POST['Mes'].'.xml');
	}	
	
}
