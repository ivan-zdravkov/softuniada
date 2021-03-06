CREATE TABLE [dbo].[AspNetRoleClaims](
	[Id]				int						IDENTITY (1, 1) NOT NULL,
	[ClaimType]			nvarchar(max)			NULL,
	[ClaimValue]		nvarchar(max)			NULL,
	[RoleId]			nvarchar(450)		NOT NULL,

	[CreatedBy]			nvarchar(450)			NULL,
	[CreatedAt]			datetime				NULL,
	[LastModifiedBy]	nvarchar(450)			NULL,
	[LastModifiedAt]	datetime				NULL,

	CONSTRAINT [PK_AspNetRoleClaims] PRIMARY KEY CLUSTERED ([Id] ASC),
	CONSTRAINT [FK_AspNetRoleClaims_AspNetRole] FOREIGN KEY ([RoleId]) REFERENCES [dbo].[AspNetRoles] ([Id]) ON DELETE CASCADE,
)