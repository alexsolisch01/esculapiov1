<?php

session_start();
require_once "autoloadAjax.php";

if(isset($_POST['Requerimiento'])){
	if($_POST['Requerimiento'] == "CargarInventario"){
		$dao = new Dao();
		$linea = '';
		$bodega = '';
		if(isset($_POST['Linea']))  
		{
			if($_POST['Linea']!=""){
				$linea = 'i.id_linea = '.$_POST['Linea'].' AND ';
			}
		}
		if(isset($_POST['Bodega']))  
		{
			$bodega = 'i.id_bodega = '.$_POST['Bodega'].' AND ';
		}
		//$dao->Campo("CONVERT(r.fecha_valido,DATE)","");
		$sql ='SELECT x.ID, x.NOMBRE, x.PRST,x.PRESENTACION, SUM(x.COMPRADAS), SUM(x.VENDIDAS), x.CANTIDAD, x.FRACCIONES
			   FROM (SELECT i.id ID, concat(i.nombre,"<br> - ",l.descripcion) NOMBRE, i.presentacion PRST, i.prst1 PRESENTACION, ((i.cantidad1*i.cantidad2)+i.fracciones_stock) CANTIDAD, SUM(k.e_cantidad) COMPRADAS,"0" VENDIDAS, i.cantidad2 FRACCIONES
					FROM inventario i INNER JOIN kardex k ON (i.id = k.id_inventario)
					INNER JOIN linea l ON (l.id = i.id_linea) 
					WHERE CONVERT(k.fecha_registro,DATE) BETWEEN "'.$_POST['FechaDesde'].'" AND "'.$_POST['FechaHasta'].'" AND '.$linea.$bodega.' k.concepto = "ADQUISICIÓN - COMPRA" 
					GROUP BY i.id
					UNION
					SELECT i.id ID, concat(i.nombre,"<br> - ",l.descripcion) NOMBRE, i.presentacion PRST, i.prst1 PRESENTACION, ((i.cantidad1*i.cantidad2)+i.fracciones_stock) CANTIDAD,"0" COMPRADAS, SUM(k.s_cantidad) VENDIDAS, i.cantidad2 FRACCIONES
					FROM inventario i INNER JOIN kardex k ON (i.id = k.id_inventario)
					INNER JOIN linea l ON (l.id = i.id_linea)  
					WHERE CONVERT(k.fecha_registro,DATE) BETWEEN "'.$_POST['FechaDesde'].'" AND "'.$_POST['FechaHasta'].'" AND '.$linea.$bodega.' k.concepto = "VENTAS" 
					GROUP BY i.id) x
				GROUP BY x.ID';
		
		$respuesta =$dao->ConsultarSqlNativoAjax($sql);
		
	}

	if($_POST['Requerimiento'] == "CargarComboPresentacion"){
			$dao = new Dao();

			$dao->Campo("prst1","");
			$dao->Campo("prst2","");

			$dao->Tabla("inventario","");
			$dao->Where("id",$_POST['IdProducto'],"");
			
			$dao->ConsultarAjax();
	}

	if($_POST['Requerimiento'] == "CargarInventarioPorProveedor"){
			$dao = new Dao();
			$dao->Campo("i.id","");
			$dao->TablasInnerAlias("movimiento_bodega_item","mbi","inventario","i");
			$dao->TablasInnerAlias("movimiento_bodega_item","mbi","movimiento_bodega","mb");
			$dao->TablasInnerAlias("movimiento_bodega","mb","proveedor","p");
			$dao->Where("p.id",$_POST['Proveedor'],"");
			$dao->Agrupar("i.id");
			$dao->Ordenar("i.id");
			$dao->ConsultarAjax();
	}

	if($_POST['Requerimiento'] == "CargarUltimasCompras"){
			$dao = new Dao();
			$dao->Campo("k.fecha_registro","");
			$dao->Campo("p.descripcion","");
			$dao->Campo("k.e_cantidad","");
			$dao->Campo("k.e_precio","");
			$dao->Campo("k.e_total","");
			$dao->TablasInnerAlias("kardex","k","inventario","i");
			$dao->TablasInnerAlias("kardex","k","movimiento_bodega","mb");
			$dao->TablasInnerAlias("movimiento_bodega","mb","proveedor","p");
			$dao->Where("i.id",$_POST['Id'],"and");
			$dao->Where("k.concepto",'"'.'ADQUISICIÓN - COMPRA'.'"',"");
			$dao->Ordenar("k.id desc");
			$dao->Limite("5");
			$dao->ConsultarAjax();
	}

	if($_POST['Requerimiento'] == "CargarPrecioUltimaCompra"){
			$dao = new Dao();
			$dao->Campo("k.e_precio","");
			$dao->TablasInnerAlias("kardex","k","inventario","i");
			$dao->Where("i.id",$_POST['Id'],"and");
			$dao->Where("k.concepto",'"'.'ADQUISICIÓN - COMPRA'.'"',"");
			$dao->Ordenar("k.id desc");
			$dao->Limite("1");
			$dao->ConsultarAjax();
	}
}