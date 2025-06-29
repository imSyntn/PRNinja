# 🥷 PR Ninja

**AI-Powered GitHub Pull Request Review Assistant**

PR Ninja is a modern web app built with **Next.js**, **React 19**, **Tailwind CSS 4**, **Prisma**, and AI integrations like **OpenAI** and **Gemini** and **Deepseek**. It reviews your GitHub pull requests, suggests improvements, and makes code reviews smoother and smarter.

---

## 📸 Features

- 🔒 Authentication via [Clerk](https://clerk.dev/)
- 🤖 AI-powered PR review generation with OpenAI and Google Gemini and Deepseek
- 📊 PR insights & code review analytics
- ✍️ Inline code suggestion highlights
- ⚡ Real-time status and caching with Upstash Redis
- 🎨 Clean, accessible UI using Radix UI and Tailwind CSS, Shadcn UI, Aceternity UI and Magic UI
- 🌙 Dark mode toggle via `next-themes`

---

## 🚀 Tech Stack

- **Next.js 15**
- **React 19**
- **Tailwind CSS 4**
- **Prisma**
- **Clerk Authentication**
- **Redis**
- **PostgreSQL**
- **Radix UI**

---

## 📦 Installation

```bash
git clone https://github.com/your-username/pr_ninja.git
cd pr_ninja
npm install
```

## 🔐 Environment Variables Setup

```bash
add your api keys in .env file
```

## 🗄️ Prisma Setup & Migrations

- ### 📌 Run Initial Migration

```bash
npx prisma migrate dev --name init
```
This will:
- Create the initial migration file
- Apply the migration to your database
- Generate the Prisma client

- ### 📌 Generate Prisma Client
- Anytime you update your prisma/schema.prisma, regenerate the Prisma client with:
```bash
npx prisma generate
```

## 🛠️ Running the Project

```bash
npm run dev
```

## 🤝 Contributing

- Want to improve PR Ninja? Contributions welcome!

```bash
git checkout -b feature/your-feature-name
git commit -m "Add: your feature"
git push origin feature/your-feature-name
```
- Then open a Pull Request 🚀

