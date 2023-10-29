﻿# GambitChallenge - fullstack
## Table of Contents
1. [Introduction](#intro)
2. [Feature](#feats)
3. [Technologies](#tech)
4. [Usage](#use)
5. [Authors](#aut)
6. [Sources](#sou)


## 1. Introduction 
This is gambit challenge given by atea finland
this includes both front end client and serverside

## 2. Features
* Creates a database for users
* validate authentication
* Imports data from https://tuftuf.gambitlabs.fi/feed.txt
* Api endpoints 

## 3. Technologies 
* ASP.NET
* .NET
* C#
* SSMS
* AUTH > microsoft packages
* TypeScript React
* Redux
* Axios
* MUI

## 4. Usage

### Tools ###
As an editor, you can use Visual Studio Code or Visual Studio.
If you are using visual studio download packages ASP.NET and web development, .NET desktop development and
Data storage and processing with it. 

In order to run dotnet commands you need .NET SDK for you machine. 

For running SQL you need to download SQL server express with basic configuration.This will also provide you your connection string. Link: https://www.microsoft.com/en-us/sql-server/sql-server-downloads  

Optional: If you want to view the tables and make queries with the data, download SQL Service Management Studio (SSMS).

### Setup ###
Change your connection string in app.config file. 

```javascript
<?xml version="1.0" encoding="utf-8"?>
<configuration>
	<connectionStrings>
		<add name="" connectionString="Add your connection string here" />
	</connectionStrings>
</configuration>
```
In the terminal run:
### `dotnet watch run`
and terminate it with CTRL + C. This runs all the nuget packages needed for  the project.

Add data sets to the Data folder from: https://github.com/solita/dev-academy-2023-exercise

In the terminal download dotnet tools with the command: 
### `dotnet tool install --global dotnet-ef`

Then write in the terminal:
### `dotnet ef database update`
This creates the tables. 

Now that the tables are done, run again
### `dotnet watch run` 
and terminate it with crtl + C. While it's shutting down it imports the data. Because of the size of the files this might take several minutes. You can stop it early with ctrl + C again. It will still put some of the data in the tables, which is enough for trying the program.

You can use SSMS to check if the tables have been created and the data has been added. 

Now put it running again with:
### `dotnet watch run` 
as for client side 
### `npm i`
### `npm start`

### View ###
While the program is running you can see the api at: https://localhost:{your port}/swagger/index.html 
While both backend and frontend are running you can view the application at: http://localhost:3000/

## 5. Authors
[@Tom N](https://github.com/kouzber123)


## 6. Sources
https://mui.com/
https://redux.js.org/
https://learn.microsoft.com/en-us/nuget/
