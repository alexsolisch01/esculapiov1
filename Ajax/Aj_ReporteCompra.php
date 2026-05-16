<?php

session_start();
require_once "autoloadAjax.php";

if(isset($_POST['Requerimiento'])){

	if($_POST['Requerimiento'] == "CargarInventario"){
		$dao = new Dao();
		
		//$dao->Campo("CONVERT(r.fecha_valido,DATE)","");
		$sql = 'SELECT i.id ID, i.nombre NOMBRE, mi.presentacion PRESENTACION, SUM(mi.cantidad) COMPRADAS, SUM(mi.precio) COSTO, ((i.cantidad1*i.cantidad2)+i.fracciones_stock) CANTIDAD 
				FROM movimiento_bodega m, movimiento_bodega_item mi, inventario i 
				WHERE m.id = mi.id_movimiento_bodega AND mi.id_inventario = i.id AND convert(m.fecha_registro,date) BETWEEN "'.$_POST['FechaDesde'].'" AND "'.$_POST['FechaHasta'].'" AND m.id_proveedor = '.$_POST['Proveedor'].' AND m.tipo = "INGRESO" AND m.id_motivo = 19
				GROUP BY i.id';
		
		$respuesta =$dao->ConsultarSqlNativoAjax($sql);
	}

	if($_POST['Requerimiento'] == "CargarInventarioDetallado"){
		$dao = new Dao();
		$sql = 'SELECT m.fecha FECHA,m.numero NUMERO, mi.presentacion PRESENTACION, mi.cantidad COMPRADAS, mi.precio COSTO, ((i.cantidad1*i.cantidad2)+i.fracciones_stock) CANTIDAD 
				FROM movimiento_bodega m, movimiento_bodega_item mi, inventario i 
				WHERE m.id = mi.id_movimiento_bodega AND mi.id_inventario = i.id AND convert(m.fecha_registro,date) BETWEEN "'.$_POST['FechaDesde'].'" AND "'.$_POST['FechaHasta'].'" AND m.id_proveedor = '.$_POST['Proveedor'].' AND m.tipo = "INGRESO" AND m.id_motivo = 19 and i.id = '.$_POST['Inventario'].'';
		
		$respuesta =$dao->ConsultarSqlNativoAjax($sql);
	}

	if($_POST['Requerimiento'] == "CargarInventarioProveedor"){
		$dao = new Dao();
		
		//$dao->Campo("CONVERT(r.fecha_valido,DATE)","");
		$sql = 'SELECT p.id ID, p.descripcion NOMBRE, mi.presentacion PRESENTACION, SUM(mi.cantidad) COMPRADAS, SUM(mi.precio) COSTO, ((i.cantidad1*i.cantidad2)+i.fracciones_stock) CANTIDAD 
				FROM movimiento_bodega m, movimiento_bodega_item mi, inventario i, proveedor p
				WHERE m.id = mi.id_movimiento_bodega AND mi.id_inventario = i.id AND p.id = m.id_proveedor AND convert(m.fecha_registro,date) BETWEEN "'.$_POST['FechaDesde'].'" AND "'.$_POST['FechaHasta'].'" AND i.id = '.$_POST['Inventario'].' AND m.tipo = "INGRESO" AND m.id_motivo = 19
				GROUP BY i.id';
		
		$respuesta =$dao->ConsultarSqlNativoAjax($sql);
	}

	if($_POST['Requerimiento'] == "CargarInventarioDetalladoProveedor"){
		$dao = new Dao();
		$sql = 'SELECT m.fecha FECHA,m.numero NUMERO, mi.presentacion PRESENTACION, mi.cantidad COMPRADAS, mi.precio COSTO, ((i.cantidad1*i.cantidad2)+i.fracciones_stock) CANTIDAD 
				FROM movimiento_bodega m, movimiento_bodega_item mi, inventario i, proveedor p
				WHERE m.id = mi.id_movimiento_bodega AND mi.id_inventario = i.id AND p.id = m.id_proveedor AND convert(m.fecha_registro,date) BETWEEN "'.$_POST['FechaDesde'].'" AND "'.$_POST['FechaHasta'].'" AND m.id_proveedor = '.$_POST['Proveedor'].' AND m.tipo = "INGRESO" AND m.id_motivo = 19 and i.id = '.$_POST['Inventario'].'';
		
		$respuesta =$dao->ConsultarSqlNativoAjax($sql);
	}
}