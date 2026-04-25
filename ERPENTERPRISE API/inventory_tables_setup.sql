-- ================================================
-- Inventory Module - Missing Tables Setup
-- Run this in SQL Server Management Studio (SSMS)
-- against the same DB where your ERP tables exist
-- ================================================

USE ERPENTERPRISE;
GO

-- ================================================
-- TABLE 1: Categories
-- Used by Inventory > Categories page
-- ================================================
IF NOT EXISTS (SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_NAME = 'Categories')
BEGIN
    CREATE TABLE [dbo].[Categories] (
        [Id]          INT IDENTITY(1,1) NOT NULL PRIMARY KEY,
        [Name]        NVARCHAR(100) NOT NULL,
        [Description] NVARCHAR(500) NULL,
        [ItemCount]   INT NOT NULL DEFAULT 0,
        [CreatedAt]   DATETIME2 NOT NULL DEFAULT GETDATE()
    );
    PRINT 'Categories table created.';
END
ELSE
    PRINT 'Categories table already exists - skipped.';
GO

-- ================================================
-- TABLE 2: StockEntries
-- Single ledger table for:
--   Stock In  -> Type = 'IN'
--   Stock Out -> Type = 'OUT'
--   Transfer  -> Type = 'TRANSFER'
-- ================================================
IF NOT EXISTS (SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_NAME = 'StockEntries')
BEGIN
    CREATE TABLE [dbo].[StockEntries] (
        [Id]           INT IDENTITY(1,1) NOT NULL PRIMARY KEY,
        [ProductId]    INT NOT NULL,
        [ProductName]  NVARCHAR(255) NOT NULL,
        [Type]         NVARCHAR(20) NOT NULL,        -- 'IN', 'OUT', 'TRANSFER'
        [Quantity]     INT NOT NULL,
        [Date]         DATETIME2 NOT NULL DEFAULT GETDATE(),
        [Reference]    NVARCHAR(255) NULL,            -- Supplier name (IN) / Reason (OUT)
        [FromLocation] NVARCHAR(255) NULL,
        [ToLocation]   NVARCHAR(255) NULL,
        [Notes]        NVARCHAR(MAX) NULL,
        CONSTRAINT FK_StockEntries_Products
            FOREIGN KEY ([ProductId]) REFERENCES [dbo].[Products]([Id])
    );
    PRINT 'StockEntries table created.';
END
ELSE
    PRINT 'StockEntries table already exists - skipped.';
GO

