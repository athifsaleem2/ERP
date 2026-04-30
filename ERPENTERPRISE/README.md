# ERP Enterprise Application

This is the frontend component of the ERP Enterprise application, built with **Angular 19**. The system consists of an Angular SPA frontend, an **ASP.NET Core 10.0** Web API backend, and a SQL Server database.

### Tech Stack Versions
- **Frontend**: Angular 19.2
- **Backend**: ASP.NET Core 10.0 (.NET 10)
- **Database**: Azure SQL Server

## Local Development

1. Run `npm install` to install dependencies.
2. Run `npm start` (or `ng serve`) to start the development server. Navigate to `http://localhost:4200/`.

## Azure Deployment Guide

This section outlines the step-by-step process for deploying the complete ERP application (Frontend, Backend, and Database) to Microsoft Azure.

### Prerequisites
- An active [Azure Subscription](https://azure.microsoft.com/).
- A GitHub repository containing your frontend and backend code (highly recommended for CI/CD).
- Basic knowledge of the Azure Portal.

### Step 1: Set Up Azure SQL Database (Database)
1. In the Azure Portal, search for **SQL databases** and click **Create**.
2. Select your subscription and create a new Resource Group (e.g., `rg-erp-production`).
3. Enter a database name (e.g., `sqldb-erp`).
4. Create a new server, provide an admin login and password. Make sure to save these securely!
5. In the **Networking** tab, choose **Public endpoint** and enable **"Allow Azure services and resources to access this server"** so your backend app can connect to it. (You can also add your current client IP address if you want to connect via SQL Server Management Studio locally).
6. Click **Review + create** and then **Create**.
7. Once the resource is created, go to **Connection strings** and copy the **ADO.NET** connection string. You will need this for the backend. Replace the `{your_password}` placeholder with the actual password.

### Step 2: Deploy ASP.NET Core API (Backend) to Azure App Service
1. In the Azure Portal, search for **App Services** and click **Create** -> **Web App**.
2. Use the same Resource Group (`rg-erp-production`).
3. Give it a globally unique name (e.g., `app-erp-api-backend`). This will determine your API URL.
4. Publish: **Code**.
5. Runtime stack: Select your target framework (**.NET 10**).
6. Operating System: **Linux** or **Windows** (Linux is generally more cost-effective).
7. Region: Select a region close to your users.
8. Pricing plan: Choose a plan that fits your needs (Free/Shared for testing, Basic/Standard for production).
9. Click **Review + create** and then **Create**.
10. Once deployed, navigate to your App Service. Under **Settings** -> **Environment variables** (or **Configuration**), add a new application setting for your database connection:
    - **Name**: `ConnectionStrings__DefaultConnection` (this must match the key in your `appsettings.json`).
    - **Value**: The ADO.NET connection string you copied from Step 1.
11. **Deploy Code**: Go to the **Deployment Center** in your App Service.
    - Select **GitHub** as the source.
    - Authorize Azure, and select your repository and backend branch.
    - Azure will generate and commit a GitHub Actions workflow file to your repo to automatically build and deploy your API on every push.
12. **Important**: Note the Default domain of your App Service (e.g., `https://app-erp-api-backend.azurewebsites.net`).

### Step 3: Deploy Angular Frontend to Azure Static Web Apps
1. In the Azure Portal, search for **Static Web Apps** and click **Create**.
2. Use the same Resource Group.
3. Provide a name (e.g., `stapp-erp-frontend`).
4. Plan type: **Free** (for personal/hobby) or **Standard** (for production).
5. Region: Select your region.
6. Deployment details: Select **GitHub**, sign in, and choose your organization, repository, and branch.
7. Build details:
   - Build Presets: **Angular**
   - App location: `/` (or the folder containing your Angular app, e.g., `/Frontend`).
   - Api location: Leave blank (we are using a separate App Service for the API).
   - Output location: `dist/erpenterprise/browser` (or `dist/erpenterprise`, verify the exact `outputPath` in your `angular.json`).
8. Click **Review + create** and then **Create**.
9. Azure will automatically create a GitHub Actions workflow in your repository that builds and deploys your Angular app.
10. Once deployed, Azure gives you a default URL for your frontend (e.g., `https://purple-water-12345.azurestaticapps.net`).

### Step 4: Configure CORS and Environments
To allow the frontend to communicate with the backend:
1. **In the Backend (App Service)**:
   - Go to your App Service -> **API** -> **CORS**.
   - Add the default URL of your Static Web App (from Step 3) to the list of allowed origins.
   - Alternatively, ensure your ASP.NET Core `Program.cs` CORS policy allows this URL.
2. **In the Frontend (Angular Code)**:
   - Update your `environment.prod.ts` (or equivalent configuration) in your Angular code to point to the backend's default domain (e.g., `apiUrl: 'https://app-erp-api-backend.azurewebsites.net/api'`).
   - Commit and push this change to GitHub so the Static Web App action triggers a rebuild with the correct production URL.

### Step 5: Map Custom Domains (Optional)
If you own a custom domain (e.g., `yourcompany-erp.com`):
1. Navigate to your Static Web App in Azure.
2. Go to **Custom domains** -> **Add**.
3. Follow the instructions to add a CNAME or TXT record in your DNS provider to verify and map the domain to your frontend application.

---

By following these steps, your ERP application is now fully hosted on Azure, providing a scalable, secure, and highly available environment!
