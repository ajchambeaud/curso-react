<?php

require_once("init.php");

if(isset($_GET["action"])){
    $action = $_GET["action"];
    switch ($action) {
        case "list":
            listComentarios();
            break;       
        case "create":
            createComentario();
            break;   
        default:
            sendError("La accion especificada es invalida");
            break;            
    }
}else{
    sendError("No se especifico ninguna acción");
}

function createComentario(){
    $c = getConnection();
    $body = $c->real_escape_string(request('body'));
    $user = $c->real_escape_string(request('user'));
    $query = "INSERT INTO comentarios VALUES (
                DEFAULT,
                '$user',
                '$body',
                now())";
    if($c->query($query)){
        sendResult(array("id" => $c->insert_id), "Comentario creado");
    }else{
        sendError("Ocurrio un error al intentar crear el comentario: " . $c->error);
    }
}

function listComentarios(){
    $c = getConnection();
    $query = "SELECT * FROM comentarios";
    $comentarios = array();
    if ($resultado = $c->query($query)) {
        while ($fila = $resultado->fetch_assoc()) {
            $comentarios[] = $fila;
        }
        $resultado->free();
        sendResult(array("comentarios" => $comentarios), "Ok");
    }else{
        sendError("No se encontraron resultados");
    }
}