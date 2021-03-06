CREATE TABLE [dbo].[AspNetUserClaims](
	[Id]				int						IDENTITY (1, 1) NOT NULL,
	[ClaimType]			nvarchar(max)			NULL,
	[ClaimValue]		nvarchar(max)			NULL,
	[UserId]			nvarchar(450)			NOT NULL,
	
	[CreatedBy]			nvarchar(450)			NULL,
	[CreatedAt]			datetime				NULL,
	[LastModifiedBy]	nvarchar(450)			NULL,
	[LastModifiedAt]	datetime				NULL,

	CONSTRAINT [PK_AspNetUserClaims] PRIMARY KEY CLUSTERED ([Id] ASC),
	CONSTRAINT [FK_AspNetUserClaims_AspNetUsers] FOREIGN KEY ([UserId]) REFERENCES [dbo].[AspNetUsers] ([Id]) ON DELETE CASCADE
)