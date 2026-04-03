-- ERP Enterprise: Database Migration Script for Purchasing & Inventory
-- This script creates the new tables for Suppliers and Purchase Invoices.
-- Run this in your SQL Server Management Studio (SSMS).

-- 1. Create Suppliers Table
CREATE TABLE [dbo].[Suppliers] (
    [Id]            INT              IDENTITY (1, 1) NOT NULL,
    [Name]          NVARCHAR (100)   NOT NULL,
    [ContactPerson] NVARCHAR (100)   NULL,
    [Phone]         NVARCHAR (15)    NULL,
    [Email]         NVARCHAR (100)   NULL,
    [Address]       NVARCHAR (200)   NULL,
    [GSTNumber]     NVARCHAR (20)    NULL,
    [CreatedAt]     DATETIME         DEFAULT (getdate()) NOT NULL,
    CONSTRAINT [PK_Suppliers] PRIMARY KEY CLUSTERED ([Id] ASC)
);

-- 2. Create PurchaseInvoices Table
CREATE TABLE [dbo].[PurchaseInvoices] (
    [Id]            INT              IDENTITY (1, 1) NOT NULL,
    [InvoiceNumber] NVARCHAR (50)    NOT NULL,
    [SupplierId]    INT              NOT NULL,
    [Date]          DATETIME         DEFAULT (getdate()) NOT NULL,
    [Subtotal]      DECIMAL (18, 2)  NOT NULL,
    [Tax]           DECIMAL (18, 2)  NOT NULL,
    [GrandTotal]    DECIMAL (18, 2)  NOT NULL,
    [Notes]         NVARCHAR (MAX)   NULL,
    [CreatedAt]     DATETIME         DEFAULT (getdate()) NOT NULL,
    CONSTRAINT [PK_PurchaseInvoices] PRIMARY KEY CLUSTERED ([Id] ASC),
    CONSTRAINT [FK_PurchaseInvoices_Suppliers] FOREIGN KEY ([SupplierId]) REFERENCES [dbo].[Suppliers] ([Id]) ON DELETE CASCADE
);

-- 3. Create PurchaseInvoiceItems Table
CREATE TABLE [dbo].[PurchaseInvoiceItems] (
    [Id]                INT              IDENTITY (1, 1) NOT NULL,
    [PurchaseInvoiceId] INT              NOT NULL,
    [ProductId]         INT              NOT NULL,
    [ProductName]       NVARCHAR (100)   NOT NULL,
    [Quantity]          INT              NOT NULL,
    [CostPrice]         DECIMAL (18, 2)  NOT NULL,
    [Total]             DECIMAL (18, 2)  NOT NULL,
    CONSTRAINT [PK_PurchaseInvoiceItems] PRIMARY KEY CLUSTERED ([Id] ASC),
    CONSTRAINT [FK_PurchaseInvoiceItems_PurchaseInvoices] FOREIGN KEY ([PurchaseInvoiceId]) REFERENCES [dbo].[PurchaseInvoices] ([Id]) ON DELETE CASCADE,
    CONSTRAINT [FK_PurchaseInvoiceItems_Products] FOREIGN KEY ([ProductId]) REFERENCES [dbo].[Products] ([Id]) ON DELETE CASCADE
);

-- 4. Ensure Products table has StockQuantity column (if not already present)
IF NOT EXISTS (SELECT * FROM sys.columns WHERE object_id = OBJECT_ID(N'[dbo].[Products]') AND name = N'StockQuantity')
BEGIN
    ALTER TABLE [dbo].[Products] ADD [StockQuantity] INT DEFAULT ((0)) NOT NULL;
END
GO
