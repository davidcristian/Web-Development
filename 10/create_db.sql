USE [master]
GO

ALTER DATABASE [restaurant] SET SINGLE_USER WITH ROLLBACK IMMEDIATE
GO

DROP DATABASE IF EXISTS [restaurant]
CREATE DATABASE [restaurant]
GO

USE [restaurant]
GO

-- THE TABLES ARE CREATED AUTOMATICALLY USING MIGRATIONS
--CREATE TABLE [users]
--(
--	[uid] INT PRIMARY KEY IDENTITY,
--	[name] NVARCHAR(255) NOT NULL,
--	[password] NVARCHAR(255) NOT NULL
--)

--CREATE TABLE [recipes]
--(
--	[rid] INT PRIMARY KEY IDENTITY,
--	[author] NVARCHAR(255) NOT NULL,
--	[name] NVARCHAR(255) NOT NULL,

--	[type] NVARCHAR(255) NOT NULL,
--	[recipe] NVARCHAR(2047) NOT NULL
--)
--GO

INSERT INTO [users]
	([name], [password])
VALUES
	('a', 'a'),
	('b', 'a'),
	('c', 'a')
GO

INSERT INTO [recipes]
	([author], [name], [type], [recipe])
VALUES
	('author1', 'name1', 'type1', 'recipe1'),
	('author2', 'name2', 'type2', 'recipe2'),
	('author3', 'name3', 'type3', 'recipe3'),
	('author4', 'name4', 'type1', 'recipe4')
GO

SELECT * FROM [users]
SELECT * FROM [recipes]
