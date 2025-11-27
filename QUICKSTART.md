# 🎉 TUMED Admin System - Quick Start

## ✅ What's Been Built

A **complete, production-ready admin system** for TUMED with:

### 🔐 Authentication System
- ✅ Secure login with NextAuth v5
- ✅ Email + password authentication
- ✅ Session-based (JWT)
- ✅ Role-based access control (admin only)
- ✅ Protected routes with middleware
- ✅ Logout functionality

### 📊 Admin Dashboard
- ✅ Dashboard with statistics
- ✅ Sidebar navigation
- ✅ Responsive design (mobile-ready)
- ✅ Admin-only access

### 🎯 Faaliyetler (Activities) Management
- ✅ **Create** new activities
- ✅ **Read** all activities (with pagination)
- ✅ **Update** existing activities
- ✅ **Delete** activities
- ✅ **Image upload** (max 5MB)
- ✅ Form validation with Zod

### 🗄️ Database
- ✅ PostgreSQL with Prisma ORM
- ✅ User model (with role and hashed password)
- ✅ Faaliyet model
- ✅ Migrations ready
- ✅ Seed script for admin user

### 🎨 UI/UX
- ✅ Tailwind CSS 4 styling
- ✅ Clean, modern interface
- ✅ Responsive layout
- ✅ Image preview on upload
- ✅ Loading states
- ✅ Error handling

## 🚀 Quick Start (3 Steps)

### Step 1: Configure Environment

```bash
# Copy environment template
cp .env.example .env

# Edit .env and update:
# - DATABASE_URL (if using external PostgreSQL)
# - AUTH_SECRET is auto-generated
```

### Step 2: Setup Database

**Option A: Automatic Setup (Recommended)**
```bash
# Run the setup script
./setup.ps1
```

**Option B: Manual Setup**
```bash
# Install dependencies
npm install

# Run migrations
npm run db:migrate

# Seed admin user
npm run db:seed
```

### Step 3: Start Development

```bash
npm run dev
```

Visit: **http://localhost:3000/login**

**Login Credentials:**
- Email: `admin@tumed.org`
- Password: `admin123`

## 📁 File Structure Created

```
tumed/
├── 📄 ADMIN_SETUP.md              # Detailed setup guide
├── 📄 TECHNICAL_GUIDE.md          # Technical documentation
├── 📄 QUICKSTART.md               # This file
├── 🔧 setup.ps1                   # PowerShell setup script
├── 🗄️ prisma/
│   ├── schema.prisma              # Database models
│   └── seed.ts                    # Admin user seeding
├── 🛠️ scripts/
│   └── create-admin.ts            # CLI to create admin users
├── 📦 src/
│   ├── 🔐 auth.ts                 # NextAuth configuration
│   ├── 🛡️ middleware.ts           # Route protection
│   ├── 📚 lib/
│   │   ├── prisma.ts             # Database client
│   │   └── validations.ts        # Zod schemas
│   ├── 🎨 components/
│   │   ├── AdminSidebar.tsx      # Navigation sidebar
│   │   └── FaaliyetForm.tsx      # Activity form
│   ├── 📱 app/
│   │   ├── 🔑 login/page.tsx     # Login page
│   │   ├── 👑 admin/
│   │   │   ├── layout.tsx        # Admin layout
│   │   │   ├── page.tsx          # Dashboard
│   │   │   └── faaliyetler/
│   │   │       ├── page.tsx              # List
│   │   │       ├── new/page.tsx          # Create
│   │   │       └── [id]/edit/page.tsx    # Edit
│   │   └── 🔌 api/
│   │       ├── auth/[...nextauth]/route.ts
│   │       └── admin/
│   │           ├── faaliyetler/route.ts
│   │           ├── faaliyetler/[id]/route.ts
│   │           └── upload/route.ts
```

## 🎯 Key Features

### 1. Login System (/login)
- Secure credentials authentication
- Redirects to admin dashboard
- Error handling for invalid credentials
- Session persistence

### 2. Admin Dashboard (/admin)
- Activity statistics
- Quick action buttons
- Welcome message
- Responsive cards layout

### 3. Manage Activities (/admin/faaliyetler)
- View all activities in table
- Pagination (10 per page)
- Edit and delete buttons
- Add new activity button
- Image thumbnails

### 4. Create Activity (/admin/faaliyetler/new)
- Form with validation
- Title, description, category
- Image upload with preview
- Real-time validation

### 5. Edit Activity (/admin/faaliyetler/[id]/edit)
- Pre-filled form
- Update any field
- Replace image
- Delete option

## 🔒 Security

✅ **Password Security**
- Bcrypt hashing (10 rounds)
- Never stored plain text

✅ **Route Protection**
- Middleware protects /admin/*
- Non-admin users redirected to /login

✅ **API Security**
- All admin APIs check session
- Return 401 if unauthorized

✅ **Input Validation**
- Zod schemas validate all inputs
- Server-side validation

✅ **File Upload Security**
- Type validation (images only)
- Size limit (5MB max)
- Sanitized filenames

## 📝 API Endpoints

### Authentication
```
POST /api/auth/callback/credentials  # Login
GET  /api/auth/signout               # Logout
```

### Activities (Admin Only)
```
GET    /api/admin/faaliyetler           # List (paginated)
POST   /api/admin/faaliyetler           # Create
GET    /api/admin/faaliyetler/[id]      # Get one
PUT    /api/admin/faaliyetler/[id]      # Update
DELETE /api/admin/faaliyetler/[id]      # Delete
```

### Image Upload (Admin Only)
```
POST /api/admin/upload                   # Upload image
```

## 🧪 Test the System

### 1. Test Login
```
1. Go to http://localhost:3000/login
2. Enter: admin@tumed.org / admin123
3. Should redirect to /admin
```

### 2. Test Create Activity
```
1. Click "Add New Activity"
2. Fill form with:
   - Title: "Test Activity"
   - Description: "This is a test"
   - Category: "Education"
3. Upload an image (optional)
4. Click "Create Activity"
5. Should see in list
```

### 3. Test Edit Activity
```
1. Click "Edit" on any activity
2. Change title
3. Click "Update Activity"
4. Should see updated in list
```

### 4. Test Delete Activity
```
1. Click "Delete" on any activity
2. Confirm deletion
3. Should remove from list
```

### 5. Test Protection
```
1. Logout
2. Try to access /admin
3. Should redirect to /login
```

## 🛠️ Useful Commands

```bash
# Development
npm run dev                    # Start dev server

# Database
npm run db:migrate            # Run migrations
npm run db:seed               # Seed admin user
npm run db:studio             # View database in browser

# Production
npm run build                 # Build for production
npm start                     # Start production server

# Admin Management
npx ts-node scripts/create-admin.ts  # Create new admin user
```

## 📦 Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **UI**: React 19 + Tailwind CSS 4
- **Auth**: NextAuth v5
- **Database**: PostgreSQL + Prisma
- **Validation**: Zod
- **Password**: bcryptjs

## 🎓 Next Steps

### For Development
1. ✅ System is ready to use!
2. Start creating activities
3. Test all CRUD operations
4. Customize UI/branding as needed

### For Production
1. Update DATABASE_URL to production database
2. Set secure AUTH_SECRET
3. Change default admin password
4. Configure cloud image storage (optional)
5. Set up SSL/HTTPS
6. Deploy to hosting (Vercel, Railway, etc.)

### To Customize
1. **Add more fields**: Update schema, migration, form
2. **Change styling**: Edit Tailwind classes
3. **Add more admin pages**: Create in `/admin` directory
4. **Integrate with frontend**: Use `/api/admin/faaliyetler` (requires auth)

## 📚 Documentation Files

- **QUICKSTART.md** (this file) - Get started quickly
- **ADMIN_SETUP.md** - Detailed setup instructions
- **TECHNICAL_GUIDE.md** - Technical documentation
- **.env.example** - Environment variables template

## ❓ Troubleshooting

**Problem: Can't login**
- Check admin user exists: `npm run db:seed`
- Clear browser cookies
- Check AUTH_SECRET in .env

**Problem: Database error**
- Check PostgreSQL is running
- Verify DATABASE_URL in .env
- Run migrations: `npm run db:migrate`

**Problem: Images not uploading**
- Check `public/uploads/faaliyetler/` exists
- Verify file is < 5MB
- Check file type (jpg, png, gif, webp)

**Problem: TypeScript errors**
- Run: `npx prisma generate`
- Restart VS Code
- Delete `.next` folder and rebuild

## 🎉 You're All Set!

Your TUMED Admin System is **complete and ready to use**!

### Default Login:
- **URL**: http://localhost:3000/login
- **Email**: admin@tumed.org
- **Password**: admin123

### What You Can Do Now:
✅ Login to admin panel
✅ Create, edit, delete activities
✅ Upload images
✅ Manage content
✅ Customize as needed

**Happy managing! 🚀**

---

*Built for Türkiye Mezunları Derneği*
