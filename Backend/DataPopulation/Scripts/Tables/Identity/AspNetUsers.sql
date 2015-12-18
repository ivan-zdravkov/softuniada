CREATE TABLE [dbo].[AspNetUsers](
	[Id]					nvarchar(450)			NOT NULL,
	[AccessFailedCount]		int						NOT NULL,
	[ConcurrencyStamp]		nvarchar(max)			NOT NULL,
	[Email]					nvarchar(256)			NOT NULL,
	[EmailConfirmed]		bit						NOT NULL,
	[LockoutEnabled]		bit						NOT NULL,
	[LockoutEnd]			datetimeoffset(7)		NULL,
	[NormalizedEmail]		nvarchar(256)			NULL,
	[NormalizedUserName]	nvarchar(256)			NULL,
	[PasswordHash]			nvarchar(max)			NULL,
	[PhoneNumber]			nvarchar(max)			NULL,
	[PhoneNumberConfirmed]	bit						NULL,
	[SecurityStamp]			nvarchar(max)			NULL,
	[TwoFactorEnabled]		bit						NOT NULL,
	[UserName]				nvarchar(256)			NULL,
	[FirstName]				nvarchar(100)			NULL,
	[LastName]				nvarchar(100)			NULL,
	[Birthday]				datetime2				NULL,
	
	[CreatedBy]				nvarchar(450)			NULL,
	[CreatedAt]				datetime				NULL,
	[LastModifiedBy]		nvarchar(450)			NULL,
	[LastModifiedAt]		datetime				NULL,

	CONSTRAINT [PK_AspNetUsers] PRIMARY KEY CLUSTERED ([Id] ASC)
)