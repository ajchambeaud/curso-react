<?php
header('Access-Control-Allow-Origin: *');  
header('Content-Type: application/json; charset=utf-8');

const DB_HOST = "localhost";
const DB_USER = "root";
const DB_PASSWORD = "admin";
const DB_NAME = "curso_react";

$result = array(
    "error" => true,
    "message" => "Error interno del servidor"
);

function request($val){
    $request = $_REQUEST;
    if(isset($request[$val])){
        return $request[$val];
    }else{
        sendError("Parametros insuficientes: no se encuentra el parametro " . $val);
    }
};

function getConnection(){
    $mysqli = new mysqli(DB_HOST, DB_USER, DB_PASSWORD, DB_NAME);
    if ($mysqli->connect_errno) {
        sendError("Error al intentar establecer la coneccion a la base");
    }else{
        return $mysqli;
    }
}

function sendResult($data, $msg){
    $result['error'] = false;
    $result['message'] = $msg;
    $result['data'] = $data;
    die(json_encode($result));
}

function sendError($error){
    http_response_code(500);
    $result["error"] = true;
    $result["message"] = $error;
    die(json_encode($result));
}