﻿CREATE TABLE [dbo].[AspNetUserRoles](
	[UserId]			nvarchar(450)		NOT NULL,
    [RoleId]			nvarchar(450)		NOT NULL,

	CONSTRAINT [PK_AspNetUserRoles] PRIMARY KEY CLUSTERED ([UserId] ASC, [RoleId] ASC),
	CONSTRAINT [FK_AspNetUserRoles_AspNetRole] FOREIGN KEY ([RoleId]) REFERENCES [dbo].[AspNetRoles] ([Id]) ON DELETE CASCADE,
    CONSTRAINT [FK_AspNetUserRoles_AspNetUser] FOREIGN KEY ([UserId]) REFERENCES [dbo].[AspNetUsers] ([Id]) ON DELETE CASCADE
)