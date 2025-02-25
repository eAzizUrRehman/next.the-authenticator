# The Authenticator: An Auth & Multi-Step Form with Dashboard Project

Build a multi-step form that allows users to register, submit their details, and view/edit their submissions on a dashboard.

## Key Requirements:

1. **User Authentication**:

   - Basic sign-up, login, and logout functionality (JWT or local storage).

2. **Multi-Step Form**:

   - **Step 1**: Personal Info (Name, Email, Phone)
   - **Step 2**: Address Details (Country, City, ZIP)
   - **Step 3**: Upload Profile Picture (Preview Before Submit)

3. **Dashboard**:

   - Display submitted forms in a table
   - Allow users to edit or delete entries

4. **API Integration**:  
   Use Node.js + Express or a mock API like JSON Server to handle form submissions.

### Bonus (Optional):

- Implement form validation
- Use Redux (React) or Pinia/Vuex (Vue) for state management
- Dark mode support

Please let me know if you have any questions. Looking forward to seeing your work!

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.
