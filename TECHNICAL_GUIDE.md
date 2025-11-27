# TUMED Admin System - Complete Implementation Guide

## 🎯 Overview

This document provides a complete technical overview of the TUMED Admin System implementation.

## 📂 Complete File Structure

```
tumed/
├── .env.example                    # Environment variables template
├── ADMIN_SETUP.md                  # Setup documentation
├── setup.ps1                       # Quick setup script (PowerShell)
├── package.json                    # Dependencies and scripts
├── next.config.ts                  # Next.js configuration
├── tsconfig.json                   # TypeScript configuration
├── tailwind.config.ts              # Tailwind CSS configuration
├── prisma/
│   ├── schema.prisma              # Database schema (User + Faaliyet)
│   └── seed.ts                    # Database seeding script
├── scripts/
│   └── create-admin.ts            # CLI tool to create admin users
├── public/
│   └── uploads/
│       └── faaliyetler/           # Uploaded activity images
├── src/
│   ├── middleware.ts              # Route protection middleware
│   ├── auth.ts                    # NextAuth v5 configuration
│   ├── types/
│   │   └── next-auth.d.ts        # NextAuth type extensions
│   ├── lib/
│   │   ├── prisma.ts             # Prisma client singleton
│   │   └── validations.ts        # Zod validation schemas
│   ├── components/
│   │   ├── AdminSidebar.tsx      # Admin sidebar navigation
│   │   └── FaaliyetForm.tsx      # Reusable activity form
│   ├── app/
│   │   ├── globals.css           # Global styles
│   │   ├── layout.tsx            # Root layout
│   │   ├── page.tsx              # Public homepage
│   │   ├── login/
│   │   │   └── page.tsx          # Login page
│   │   ├── admin/
│   │   │   ├── layout.tsx        # Admin layout with sidebar
│   │   │   ├── page.tsx          # Admin dashboard
│   │   │   └── faaliyetler/
│   │   │       ├── page.tsx              # List activities
│   │   │       ├── new/
│   │   │       │   └── page.tsx          # Create new activity
│   │   │       └── [id]/
│   │   │           └── edit/
│   │   │               └── page.tsx      # Edit activity
│   │   └── api/
│   │       ├── auth/
│   │       │   └── [...nextauth]/
│   │       │       └── route.ts          # NextAuth handler
│   │       └── admin/
│   │           ├── faaliyetler/
│   │           │   ├── route.ts          # GET (list), POST (create)
│   │           │   └── [id]/
│   │           │       └── route.ts      # GET, PUT, DELETE
│   │           └── upload/
│   │               └── route.ts          # Image upload
```

## 🔐 Authentication Flow

### 1. NextAuth Configuration (`src/auth.ts`)

```typescript
- Provider: Credentials (email + password)
- Session: JWT-based
- Callbacks: Add role to session
- Protected routes: Checked in middleware
```

### 2. Login Process

```
User → /login → POST credentials → auth.ts validate
  ↓
Check database (Prisma)
  ↓
Verify bcrypt password
  ↓
Create JWT session
  ↓
Redirect to /admin
```

### 3. Route Protection (`src/middleware.ts`)

```
Request to /admin/* → middleware.ts
  ↓
Check session exists
  ↓
Check role === "admin"
  ↓
Allow or redirect to /login
```

## 🗄️ Database Schema

### Models

**User Model**
- `id`: String (CUID)
- `email`: String (unique)
- `password`: String (bcrypt hashed)
- `name`: String (optional)
- `role`: String ("admin" or "user")
- `createdAt`: DateTime
- `updatedAt`: DateTime

**Faaliyet Model**
- `id`: String (CUID)
- `title`: String
- `description`: Text
- `category`: String
- `imageUrl`: String (optional)
- `createdAt`: DateTime
- `updatedAt`: DateTime

## 🛣️ API Routes

### Authentication

**POST** `/api/auth/callback/credentials`
- Login with email/password
- Returns session token
- Handled by NextAuth

### Faaliyetler CRUD

**GET** `/api/admin/faaliyetler`
- List all activities
- Supports pagination (?page=1&limit=10)
- Admin only

**POST** `/api/admin/faaliyetler`
- Create new activity
- Validates with Zod
- Admin only

**GET** `/api/admin/faaliyetler/[id]`
- Get single activity
- Admin only

**PUT** `/api/admin/faaliyetler/[id]`
- Update activity
- Partial updates supported
- Admin only

**DELETE** `/api/admin/faaliyetler/[id]`
- Delete activity
- Admin only

### Image Upload

**POST** `/api/admin/upload`
- Upload image file
- Max size: 5MB
- Allowed types: JPEG, PNG, WebP, GIF
- Returns image URL
- Admin only

## 🎨 UI Components

### Pages

1. **Login Page** (`/login`)
   - Email + password form
   - Error handling
   - Redirects to /admin on success

2. **Admin Dashboard** (`/admin`)
   - Statistics cards
   - Quick actions
   - Welcome message

3. **Faaliyetler List** (`/admin/faaliyetler`)
   - Table view with images
   - Edit/Delete buttons
   - Pagination
   - Add new button

4. **Create Activity** (`/admin/faaliyetler/new`)
   - Form with validation
   - Image upload preview
   - Cancel/Submit buttons

5. **Edit Activity** (`/admin/faaliyetler/[id]/edit`)
   - Pre-filled form
   - Image upload/replace
   - Update/Cancel buttons

### Reusable Components

**AdminSidebar**
- Navigation menu
- Active route highlighting
- Logout button
- Sticky sidebar

**FaaliyetForm**
- Used for both create/edit
- Image upload with preview
- Form validation
- Loading states

## 🔒 Security Features

### 1. Password Security
- Bcrypt hashing (10 rounds)
- Never stored in plain text
- Verified on login

### 2. Session Security
- JWT tokens
- Signed with AUTH_SECRET
- Role-based access control

### 3. Route Protection
- Middleware checks all /admin/* routes
- API routes check session.user.role
- Unauthorized → redirect to /login

### 4. Input Validation
- Zod schemas for all inputs
- Type-safe validation
- Server-side validation

### 5. File Upload Security
- File type validation
- File size limits (5MB)
- Sanitized filenames
- Stored outside public access

## 📦 Dependencies

### Production
```json
{
  "@prisma/client": "^7.0.1",
  "@auth/prisma-adapter": "^2.11.1",
  "next-auth": "^5.0.0-beta.30",
  "bcryptjs": "^3.0.3",
  "zod": "^4.1.13",
  "next": "16.0.4",
  "react": "19.2.0"
}
```

### Development
```json
{
  "prisma": "^7.0.1",
  "@types/bcryptjs": "^2.4.6",
  "ts-node": "^10.9.2",
  "typescript": "^5",
  "tailwindcss": "^4"
}
```

## 🚀 Deployment Checklist

### Environment Variables
- [ ] Set production DATABASE_URL
- [ ] Generate secure AUTH_SECRET
- [ ] Set AUTH_URL to production domain
- [ ] Set NODE_ENV=production

### Database
- [ ] Run migrations: `npx prisma migrate deploy`
- [ ] Create admin user (via seed or script)
- [ ] Backup strategy in place

### Security
- [ ] Change default admin password
- [ ] Enable HTTPS
- [ ] Set secure cookie settings
- [ ] Configure CORS if needed

### File Storage
- [ ] Migrate to cloud storage (Cloudinary/S3)
- [ ] Update upload API route
- [ ] Configure CDN for images

### Monitoring
- [ ] Set up error tracking
- [ ] Configure logging
- [ ] Database connection pooling

## 🧪 Testing the System

### 1. Test Login
```bash
# Visit login page
http://localhost:3000/login

# Use credentials
Email: admin@tumed.org
Password: admin123

# Should redirect to /admin
```

### 2. Test CRUD Operations
```bash
# Create activity
POST /api/admin/faaliyetler
Body: { title, description, category, imageUrl }

# List activities
GET /api/admin/faaliyetler?page=1&limit=10

# Update activity
PUT /api/admin/faaliyetler/[id]
Body: { title: "Updated" }

# Delete activity
DELETE /api/admin/faaliyetler/[id]
```

### 3. Test Image Upload
```bash
# Upload image
POST /api/admin/upload
FormData: { file: [image file] }

# Returns: { url: "/uploads/faaliyetler/123-abc.jpg" }
```

### 4. Test Authorization
```bash
# Try accessing /admin without login
# Should redirect to /login

# Try API routes without session
# Should return 401 Unauthorized
```

## 📊 Database Commands

```bash
# View database in browser
npm run db:studio

# Create migration
npx prisma migrate dev --name description

# Apply migrations (production)
npx prisma migrate deploy

# Reset database
npx prisma migrate reset

# Generate Prisma Client
npx prisma generate

# Seed database
npm run db:seed
```

## 🔧 Customization Guide

### Add New Field to Faaliyet

1. Update `prisma/schema.prisma`:
```prisma
model Faaliyet {
  // ... existing fields
  newField String?
}
```

2. Create migration:
```bash
npx prisma migrate dev --name add_new_field
```

3. Update `src/lib/validations.ts`:
```typescript
export const faaliyetSchema = z.object({
  // ... existing fields
  newField: z.string().optional(),
})
```

4. Update form in `src/components/FaaliyetForm.tsx`

### Add New Admin Page

1. Create page in `src/app/admin/[name]/page.tsx`
2. Add route to sidebar in `src/components/AdminSidebar.tsx`
3. Protected automatically by middleware

### Change Image Storage to Cloudinary

1. Install SDK: `npm install cloudinary`
2. Update `src/app/api/admin/upload/route.ts`
3. Configure Cloudinary credentials in `.env`

## 📝 Common Issues & Solutions

### Issue: Database connection failed
**Solution**: Check DATABASE_URL in .env, ensure PostgreSQL is running

### Issue: Login not working
**Solution**: Clear cookies, verify AUTH_SECRET is set, check user exists

### Issue: Images not uploading
**Solution**: Check directory permissions, ensure file size < 5MB

### Issue: TypeScript errors
**Solution**: Run `npx prisma generate`, restart TS server

### Issue: Middleware not protecting routes
**Solution**: Check middleware.ts matcher, verify session exists

## 🎓 Learning Resources

- [Next.js 16 Docs](https://nextjs.org/docs)
- [NextAuth v5 Docs](https://authjs.dev/)
- [Prisma Docs](https://www.prisma.io/docs)
- [Zod Docs](https://zod.dev/)
- [Tailwind CSS](https://tailwindcss.com/)

## 📞 Support

For issues or questions about this admin system, refer to:
- ADMIN_SETUP.md for setup instructions
- This file for technical details
- Official documentation for dependencies

---

**Built with ❤️ for TUMED**
