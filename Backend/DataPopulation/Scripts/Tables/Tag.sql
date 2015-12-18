CREATE TABLE [dbo].[Tag](
	[Id]				int						IDENTITY (1, 1) NOT NULL,
	[Name]				nvarchar(100)			NOT NULL,
	
	[CreatedBy]			nvarchar(450)			NULL,
	[CreatedAt]			datetime				NULL,
	[LastModifiedBy]	nvarchar(450)			NULL,
	[LastModifiedAt]	datetime				NULL,

	CONSTRAINT [PK_Tag] PRIMARY KEY CLUSTERED ([Id] ASC)
)