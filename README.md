# FitHub

This is a Next.js project bootstrapped with `create-next-app`. FitHub is a web application designed to help users manage their fitness goals and track their progress.

## Getting Started

To get started with FitHub, follow the steps below to set up the project on your local machine.

### Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18 or higher recommended)
- **pnpm** 

### Installation

#### Clone the repository:

```bash
git clone https://github.com/MoeMyintMoSan/FitHub.git
cd fithub
```

#### Install dependencies using pnpm:

```bash
pnpm install
```

This will install all the required dependencies for the project, including:

- `@emotion/react`, `@emotion/styled` (for CSS-in-JS styling)
- `@mui/icons-material`, `@mui/joy`, `@mui/material` (for UI components)
- `@neondatabase/serverless` (for database connectivity)
- `@next-auth/prisma-adapter`, `next-auth` (for authentication)
- `@uploadthing/react`, `uploadthing` (for file uploads)
- `antd` (for additional UI components)
- `bcrypt`, `bcryptjs` (for password hashing)
- `tailwindcss` (for utility-first CSS)
- `react`, `react-dom`, `next`, `typescript`, and more.

### Set up environment variables:

Create a `.env` file in the root directory and add the necessary environment variables. For example:

```env
DATABASE_URL=your_database_url_here
NEXTAUTH_SECRET=your_secret_key_here
NEXTAUTH_URL=http://localhost:3000
UPLOADTHING_SECRET=your_uploadthing_secret_here
UPLOADTHING_APP_ID=your_uploadthing_app_id_here
```

Replace the placeholders with your actual values.

### Run the development server:

```bash
pnpm dev
```

This will start the development server. Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

## Key Features and Dependencies

FitHub uses the following key dependencies:

- **Next.js**: A React framework for server-rendered applications.
- **Material-UI (MUI)**: A popular React UI framework for building responsive and modern interfaces.
- **Tailwind CSS**: A utility-first CSS framework for rapid UI development.
- **NextAuth.js**: For authentication and user management.
- **UploadThing**: For handling file uploads.
- **PostgreSQL**: For database management (via `@neondatabase/serverless`).
- **TypeScript**: For type-safe JavaScript development.

## Learn More

To learn more about the technologies used in this project, check out the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - Learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - An interactive Next.js tutorial.
- [Material-UI Documentation](https://mui.com/material-ui/getting-started/overview/) - Learn how to use MUI components.
- [Tailwind CSS Documentation](https://tailwindcss.com/docs) - Learn how to use Tailwind CSS.
- [NextAuth.js Documentation](https://next-auth.js.org/) - Learn how to implement authentication.
