drop database if exists tear;
create database tear;
use tear;

create table produto (
	id int auto_increment,
	nome varchar(100),
    descricao varchar(500),
    preco numeric,
	estoque int,
	disponivel bit,
	primary key(id)
);

create table thumbnail (
	id int auto_increment,
    id_produto int,
    caminho_imagem text,
    foreign key(id_produto) references produto(id),
    primary key(id)
);