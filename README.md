# 🚗 NestJS + Prisma Vehicles API (POC)

This is a proof-of-concept (POC) API built with **NestJS** and **Prisma ORM**.  
It demonstrates how to use Prisma for vehicle listings for API and HTML Views.

---

## 📦 Tech Stack
- [NestJS](https://nestjs.com/) - Progressive Node.js framework
- [Prisma](https://www.prisma.io/) - Next-gen TypeScript ORM
- [MySQL](https://www.mysql.com/) - Relational Database

---

## ⚙️ Setup & Installation

### 1. Clone the repo
```bash
git clone https://github.com/prabhakar-marella/nestjs_view_poc.git
cd nestjs_view_poc

---

### 2. Install dependencies
npm install

---

### 3. Setup environment variables
Create a .env file in the project root:
```env
DATABASE_URL="mysql://user:password@localhost:3306/mydb"

Replace:

user → your MySQL username
password → your MySQL password
mydb → your database name

---

### 4. Run Prisma migrations
npx prisma migrate dev --name init

---

### 5. Generate Prisma client
npx prisma generate

---

### 6. Start the application
npm run start:dev
