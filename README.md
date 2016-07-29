#Node-REST WEB Application

#Steps to Start Project:
#1. Start MongoDB :

a. Open Command Prompt

b. cd E:\Project\NoSQL\mongodb\bin

c. e:

d. mongod --config E:\Project\NoSQL\mongodb\mongo.config

O/P: 2016-07-29T14:02:38.434+0530 W CONTROL  --diaglog is deprecated and will be removed in a future release
2016-07-29T14:02:38.435+0530 I COMMAND  diagLogging level=3
2016-07-29T14:02:38.436+0530 I COMMAND  diagLogging using file E:\Project\NoSQL\mongodb\data/diaglog.579b14a6
2016-07-29T14:02:38.436+0530 I CONTROL  log file "E:\Project\NoSQL\mongodb\log\mongo.log" exists; moved to "E:\Project\NoSQL\mongodb\log\mongo.log.2016-07-29
T08-32-38".

#2. Connect MongoDB:

a. Open New Command Prompt

b. cd E:\Project\NoSQL\mongodb\bin

c. e:

d. mongo

O/P: E:\Project\NoSQL\mongodb\bin>mongo
2016-07-29T14:08:22.558+0530 I CONTROL  Hotfix KB2731284 or later update is not installed, will zero-out data files
MongoDB shell version: 3.0.2
connecting to: test
Server has startup warnings:
2016-07-29T14:02:38.434+0530 W CONTROL  --diaglog is deprecated and will be removed in a future release

e. TBD.

#3. Run Project:

a. Open a New Command Prompt

b. cd E:\MyWork\NodeJS\restapi

c. e:

d. install npm //try using cygwin/git bash

e. npm start

f. Navigate to `http://127.0.0.1:3000` to see the express.js welcome page.

g. User Details : http://127.0.0.1:3000/users

#4. Writing a new restapi :
- 
a. Add new collections schema :

- create a new file as xyz.js
- 
b. Add new routes
-

c. Add new views
-

d. Register model, routes in app.js
-

e. Restart the server from Command Prompt again.

f. check : http://127.0.0.1:3000/xyz
