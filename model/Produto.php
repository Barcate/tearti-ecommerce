<?php

require_once(__DIR__ . "/../config/Conexao.php");

class Autores{
    public static function adicionar($Nome, $ISBN){
        try{
            $conexao = Conexao::getConexao();
            $stmt = $conexao->prepare("INSERT INTO Autores(Nome_Autor, ISBN) VALUES (?, ?)");
            $stmt->execute([$Nome, $ISBN]);

            if ($stmt->rowCount() > 0){
                return true;
            } else {
                return false;
            }

        }catch(Exception $e) {
            echo $e->getMessage();
            exit;
        }

    }

    public static function listar(){
        try{
            $conexao = Conexao::getConexao();
            $stmt = $conexao->prepare("SELECT * FROM Autores");
            $stmt->execute([]);

            return $stmt -> fetchAll();
        }catch(Exception $e) {
            echo $e->getMessage();
            exit;
        }

    }

    public static function pegarPessoa($Nome_Autor){
        try{
            $conexao = Conexao::getConexao();
            $stmt = $conexao->prepare("SELECT * FROM Autores WHERE Nome_Autor = ?");
            $stmt->execute([$Nome_Autor]);

            return $stmt -> fetchAll()[0];
        }catch(Exception $e) {
            echo $e->getMessage();
            exit;
        }

    }

    public static function existe($Nome_Autor){
        try{
            $conexao = Conexao::getConexao();
            $stmt = $conexao->prepare("SELECT count(*) FROM Autores WHERE Nome_Autor = ?");
            $stmt->execute([$Nome_Autor]);
            
            if($stmt -> fetchColumn() > 0) {
                return true;
            } else {
                return false;
            };
        }catch(Exception $e) {
            echo $e->getMessage();
            exit;
        }

    }

    public static function delete($CPF){
        try{
            $conexao = Conexao::getConexao();
            $stmt = $conexao->prepare("DELETE FROM Autores WHERE CPF = ?");
            $stmt->execute([$CPF]);
            
            if($stmt -> rowCount() > 0) {
                return true;
            } else {
                return false;
            };

        }catch(Exception $e) {
            echo $e->getMessage();
            exit;
        }

    }

    public static function atualizar($Nome_Autor, $ISBN){
        try{
            $conexao = Conexao::getConexao();
            $stmt = $conexao->prepare("UPDATE Autores SET Nome_Autor = :p1 WHERE Nome_Autor = :p2");
            $stmt->execute([
                "p1" => $Nome_Autor,
                "p2" => $Nome_Autor
            ]);

            if ($stmt->rowCount() > 0){
                return true;
            } else {
                return false;
            }

        }catch(Exception $e) {
            echo $e->getMessage();
            exit;
        }

    }

}