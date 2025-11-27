# TUMED Admin System

Complete admin system for **Türkiye Mezunları Derneği** with login and Faaliyetler (Activities) management.

## 🚀 Features

- ✅ Secure admin authentication (NextAuth v5)
- ✅ Protected admin routes with middleware
- ✅ Full CRUD operations for Faaliyetler
- ✅ Image upload functionality
- ✅ Responsive admin dashboard
- ✅ Pagination support
- ✅ Form validation with Zod
- ✅ PostgreSQL database with Prisma ORM
- ✅ TypeScript + React 19 + Next.js 16
- ✅ Tailwind CSS 4 styling

## 📁 Project Structure

```
tumed/
├── prisma/
│   ├── schema.prisma          # Database schema
│   └── seed.ts                # Seed admin user
├── public/
│   └── uploads/               # Uploaded images
│       └── faaliyetler/
├── src/
│   ├── app/
│   │   ├── admin/
│   │   │   ├── layout.tsx     # Admin layout with sidebar
│   │   │   ├── page.tsx       # Admin dashboard
│   │   │   └── faaliyetler/
│   │   │       ├── page.tsx           # List activities
│   │   │       ├── new/page.tsx       # Create activity
│   │   │       └── [id]/edit/page.tsx # Edit activity
│   │   ├── api/
│   │   │   ├── auth/[...nextauth]/route.ts  # NextAuth handler
│   │   │   └── admin/
│   │   │       ├── faaliyetler/route.ts     # CRUD endpoints
│   │   │       ├── faaliyetler/[id]/route.ts
│   │   │       └── upload/route.ts          # Image upload
│   │   └── login/
│   │       └── page.tsx       # Login page
│   ├── components/
│   │   ├── AdminSidebar.tsx   # Sidebar navigation
│   │   └── FaaliyetForm.tsx   # Reusable activity form
│   ├── lib/
│   │   ├── prisma.ts          # Prisma client
│   │   └── validations.ts     # Zod schemas
│   ├── types/
│   │   └── next-auth.d.ts     # NextAuth type extensions
│   ├── auth.ts                # NextAuth configuration
│   └── middleware.ts          # Route protection
├── .env                       # Environment variables
└── package.json
```

## 🛠️ Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment Variables

Copy `.env.example` to `.env`:

```bash
cp .env.example .env
```

Update `.env` with your database URL and secrets:

```env
DATABASE_URL="postgresql://user:password@localhost:5432/tumed?schema=public"
AUTH_SECRET="your-super-secret-key"  # Generate with: openssl rand -base64 32
AUTH_URL="http://localhost:3000"
```

### 3. Setup Database

#### Option A: Use Prisma Postgres (Recommended for Development)

```bash
npx prisma dev
```

This will create a local PostgreSQL database automatically.

#### Option B: Use Your Own PostgreSQL

Make sure PostgreSQL is running and update `DATABASE_URL` in `.env`.

### 4. Run Migrations

```bash
npm run db:migrate
```

This will:
- Create the database schema
- Generate Prisma Client

### 5. Seed Admin User

```bash
npm run db:seed
```

This creates:
- **Admin User**
  - Email: `admin@tumed.org`
  - Password: `admin123`
  - Role: `admin`
- **Sample Activities** (2 demo activities)

⚠️ **Important**: Change the admin password after first login!

### 6. Start Development Server

```bash
npm run dev
```

Visit: http://localhost:3000

## 🔐 Admin Access

### Login

1. Navigate to: http://localhost:3000/login
2. Use credentials:
   - Email: `admin@tumed.org`
   - Password: `admin123`
3. You'll be redirected to: http://localhost:3000/admin

### Admin Routes

- `/admin` - Dashboard
- `/admin/faaliyetler` - List all activities
- `/admin/faaliyetler/new` - Create new activity
- `/admin/faaliyetler/[id]/edit` - Edit activity

## 📝 API Endpoints

### Authentication

- `POST /api/auth/callback/credentials` - Login
- `GET /api/auth/signout` - Logout

### Faaliyetler (Admin Only)

- `GET /api/admin/faaliyetler` - List activities (with pagination)
- `POST /api/admin/faaliyetler` - Create activity
- `GET /api/admin/faaliyetler/[id]` - Get single activity
- `PUT /api/admin/faaliyetler/[id]` - Update activity
- `DELETE /api/admin/faaliyetler/[id]` - Delete activity

### Image Upload

- `POST /api/admin/upload` - Upload image (max 5MB)

## 🗄️ Database Models

### User

```prisma
model User {
  id        String   @id @default(cuid())
  email     String   @unique
  password  String   // Hashed with bcrypt
  name      String?
  role      String   @default("user") // "admin" or "user"
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

### Faaliyet

```prisma
model Faaliyet {
  id          String   @id @default(cuid())
  title       String
  description String   @db.Text
  category    String
  imageUrl    String?
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}
```

## 🎨 Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **UI**: React 19 + Tailwind CSS 4
- **Authentication**: NextAuth v5
- **Database**: PostgreSQL
- **ORM**: Prisma
- **Validation**: Zod
- **Password Hashing**: bcryptjs

## 🔒 Security Features

- ✅ Password hashing with bcrypt
- ✅ JWT session-based authentication
- ✅ Protected API routes (admin-only)
- ✅ Middleware route protection
- ✅ Input validation with Zod
- ✅ File upload validation (type & size)

## 📦 Additional Commands

```bash
# View database in browser
npm run db:studio

# Create new migration
npm run db:migrate

# Reset database
npx prisma migrate reset

# Generate Prisma Client
npx prisma generate
```

## 🚀 Production Deployment

### 1. Update Environment Variables

```env
DATABASE_URL="your-production-database-url"
AUTH_SECRET="your-production-secret"
AUTH_URL="https://yourdomain.com"
NODE_ENV="production"
```

### 2. Build

```bash
npm run build
```

### 3. Start

```bash
npm start
```

### 4. Create Admin User in Production

Run the seed script or manually create via Prisma Studio:

```bash
npm run db:seed
```

## 📸 Image Upload

Images are stored locally in `public/uploads/faaliyetler/`.

**For production**, consider using cloud storage:
- Cloudinary
- AWS S3
- Vercel Blob

Update `/api/admin/upload/route.ts` to integrate with your chosen service.

## 🛡️ Middleware Protection

All `/admin/*` routes are protected by middleware in `src/middleware.ts`.

Only users with `role: "admin"` can access admin pages.

## 🧪 Testing Login

1. Go to http://localhost:3000/login
2. Enter: `admin@tumed.org` / `admin123`
3. Should redirect to http://localhost:3000/admin
4. Try accessing `/admin` without login - should redirect to `/login`

## 🆘 Troubleshooting

### Database Connection Error

- Ensure PostgreSQL is running
- Check `DATABASE_URL` in `.env`
- Run `npm run db:migrate`

### Authentication Not Working

- Clear browser cookies
- Check `AUTH_SECRET` is set in `.env`
- Verify user exists in database (run seed script)

### Images Not Uploading

- Check `public/uploads/faaliyetler/` directory exists
- Verify file permissions
- Check file size < 5MB

## 📄 License

Private - TUMED Internal Use

## 👨‍💻 Developer

Built for **Türkiye Mezunları Derneği**

---

**Need help?** Check the Next.js, Prisma, or NextAuth documentation.
