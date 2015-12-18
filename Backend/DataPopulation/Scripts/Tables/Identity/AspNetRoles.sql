CREATE TABLE [dbo].[AspNetRoles](
	[Id]				nvarchar(450)			NOT NULL,
	[ConcurrencyStamp]  nvarchar(max)			NULL,
	[Name]				nvarchar(256)			NOT NULL,
	[NormalizedName]    nvarchar(256)			NOT NULL,

	[CreatedBy]			nvarchar(450)			NULL,
	[CreatedAt]			datetime				NULL,
	[LastModifiedBy]	nvarchar(450)			NULL,
	[LastModifiedAt]	datetime				NULL,

	CONSTRAINT [PK_AspNetRoles] PRIMARY KEY CLUSTERED ([Id] ASC)
)