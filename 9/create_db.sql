USE [master]
GO

ALTER DATABASE [battleship] SET SINGLE_USER WITH ROLLBACK IMMEDIATE
GO

DROP DATABASE IF EXISTS [battleship]
CREATE DATABASE [battleship]
GO

USE [battleship]
GO

CREATE TABLE [users]
(
	[uid] INT PRIMARY KEY IDENTITY,
	[name] NVARCHAR(255) NOT NULL,
	[password] NVARCHAR(255) NOT NULL
)

INSERT INTO [users]
	([name], [password])
VALUES
	('a', 'a'),
	('b', 'a'),
	('c', 'a')
GO

SELECT * FROM [users]
