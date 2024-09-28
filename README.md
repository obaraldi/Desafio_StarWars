Desafio StarWars

### Descrição ###

  Projeto efetuado como desafio DEV FULLSTACK que consiste em uma aplicação onde é feita uma consulta através do API público SWAPI que, através de uma interface web, busca nomes de personagens da franquia Star Wars com a opção de selecionar os personagens favoritos. 
  O projeto foi desenvolvido em JavaScript com Node express, servidor MySql/MariaDB e a interface foi desenvolvida em HTML e CSS.


### Configuração inicial ###

Para testar a aplicação é necessário ter instalado um servidor mysql e Node.js.

No terminal iniciar o Node.js

	npm start

também é necessário instalar algumas dependências através dos comandos

	npm init -y	
	npm install express mysql2 cors axios

Configurar uma conexão local com o servidor utilizando as seguintes informações:

    host: 'localhost',
    port: '3307',
    user: 'root',
    password: '123',  

*OBS.: ou pode alterar essas informações no arquivo server.js

Verificar se o servidor está conectado e abrir um navegador e entrar no endereço http://localhost:3000


### Utilização ###

Será exibida a interface com uma barra de busca onde, ao digitar parte do nome de um personagem aparece uma lista com sugestões de nomes e um botão ao lado direito do nome para marcá-lo como favorito. 
Só é possível personagem como favorito apenas uma vez. 
Ao selecionar o personagem como favorito ele aparece em uma lista logo abaixo e ao lado do nome há um botão de exclusão, caso queira excluí-lo da lista de favoritos.

