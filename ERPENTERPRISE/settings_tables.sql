-- 1. CREATE ROLES TABLE
CREATE TABLE [dbo].[Roles] (
    [Id]          INT            IDENTITY(1,1) NOT NULL,
    [Name]        NVARCHAR(50)   NOT NULL,
    [Description] NVARCHAR(200)  NULL,
    [Permissions] NVARCHAR(500)  NULL,
    [Status]      NVARCHAR(20)   NOT NULL DEFAULT 'Active',
    [CreatedAt]   DATETIME2      NOT NULL DEFAULT GETDATE(),
    CONSTRAINT [PK_Roles] PRIMARY KEY ([Id])
);
GO

-- 2. CREATE TAX RULES TABLE
CREATE TABLE [dbo].[TaxRules] (
    [Id]            INT            IDENTITY(1,1) NOT NULL,
    [RuleName]      NVARCHAR(100)  NOT NULL,
    [TaxType]       NVARCHAR(50)   NULL DEFAULT 'Percentage',
    [TaxPercentage] DECIMAL(18,2)  NOT NULL DEFAULT 0,
    [MinSalary]     DECIMAL(18,2)  NULL,
    [MaxSalary]     DECIMAL(18,2)  NULL,
    [AppliesTo]     NVARCHAR(50)   NULL DEFAULT 'All',
    [Status]        NVARCHAR(20)   NOT NULL DEFAULT 'Active',
    [CreatedAt]     DATETIME2      NOT NULL DEFAULT GETDATE(),
    CONSTRAINT [PK_TaxRules] PRIMARY KEY ([Id])
);
GO

-- 3. CREATE COMPANY SETTINGS TABLE
CREATE TABLE [dbo].[CompanySettings] (
    [Id]             INT            IDENTITY(1,1) NOT NULL,
    [CompanyName]    NVARCHAR(200)  NOT NULL,
    [Address]        NVARCHAR(200)  NULL,
    [Phone]          NVARCHAR(20)   NULL,
    [Email]          NVARCHAR(150)  NULL,
    [Website]        NVARCHAR(100)  NULL,
    [TaxNumber]      NVARCHAR(50)   NULL,
    [Currency]       NVARCHAR(50)   NULL DEFAULT 'INR',
    [CurrencySymbol] NVARCHAR(10)   NULL DEFAULT N'₹',
    [DateFormat]     NVARCHAR(50)   NULL DEFAULT 'dd-MM-yyyy',
    [LogoUrl]        NVARCHAR(200)  NULL,
    [UpdatedAt]      DATETIME2      NULL DEFAULT GETDATE(),
    CONSTRAINT [PK_CompanySettings] PRIMARY KEY ([Id])
);
GO

-- Note: The Users module uses the existing "userlogin" table, so no table creation is needed for users.
