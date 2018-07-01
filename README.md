the project is made with node.js using express and mongodb for database .
the project uses jade as a template platform with bower to use bootstrap and  ajax.
the project uses body parser for parsing data passed (submitted) from forms 
the project uses google api and json 
the main idea from project is to manage google calendar data for user after he make the authentication with his account where he could add - delete - update- get events from google calendar and synchronize  the  data from google with  local database.
to start the project you have to start mongodb client first using "mongod" and then put this line in your terminal : 
node index  or npm start
after that you can view the site using browser to log in to this url : localhost:3000 and start using the site
this is the database name : mongodb://localhost/mynewone
and this is the collection name : "mynewtodolist"