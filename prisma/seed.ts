// Prisma seed script to create an admin user
// Run with: npx prisma db seed

import 'dotenv/config'
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Starting database seed...')

  // Hash the password
  const hashedPassword = await bcrypt.hash('admin123', 10)

  // Create admin user
  const admin = await prisma.user.upsert({
    where: { email: 'admin@tumed.org' },
    update: {},
    create: {
      email: 'admin@tumed.org',
      password: hashedPassword,
      name: 'Admin',
      role: 'admin',
    },
  })

  console.log('✅ Admin user created:', admin.email)
  console.log('📧 Email: admin@tumed.org')
  console.log('🔑 Password: admin123')
  console.log('⚠️  Change this password in production!')

  // Create sample activities
  const activities = [
    {
      title: 'Türkiye Mezunları Buluşması 2024',
      description: 'Yıllık mezunlar buluşması etkinliğimiz. Tüm mezunlarımızı biraya getiriyoruz.',
      category: 'Social Event',
      imageUrl: null,
    },
    {
      title: 'Kariyer Gelişim Semineri',
      description: 'Profesyonel gelişim ve kariyer planlama üzerine interaktif seminer.',
      category: 'Education',
      imageUrl: null,
    },
  ]

  for (const activity of activities) {
    const created = await prisma.faaliyet.upsert({
      where: { id: 'temp-id-' + activity.title },
      update: {},
      create: activity,
    })
    console.log('✅ Sample activity created:', created.title)
  }

  console.log('🎉 Database seeded successfully!')
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
