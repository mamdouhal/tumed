// Utility script to create admin users
// Run with: npx ts-node scripts/create-admin.ts

import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'
import readline from 'readline'

const prisma = new PrismaClient()

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
})

function question(query: string): Promise<string> {
  return new Promise((resolve) => {
    rl.question(query, resolve)
  })
}

async function main() {
  console.log('👤 Create New Admin User\n')

  const email = await question('Email: ')
  const password = await question('Password: ')
  const name = await question('Name (optional): ')

  if (!email || !password) {
    console.error('❌ Email and password are required')
    process.exit(1)
  }

  // Hash password
  const hashedPassword = await bcrypt.hash(password, 10)

  try {
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name: name || null,
        role: 'admin',
      },
    })

    console.log('\n✅ Admin user created successfully!')
    console.log('📧 Email:', user.email)
    console.log('👤 Name:', user.name || 'N/A')
    console.log('🔑 Role:', user.role)
  } catch (error: unknown) {
    if (error && typeof error === 'object' && 'code' in error && error.code === 'P2002') {
      console.error('❌ Error: Email already exists')
    } else {
      const message = error instanceof Error ? error.message : 'Unknown error'
      console.error('❌ Error creating user:', message)
    }
    process.exit(1)
  }

  rl.close()
}

main()
  .catch((e) => {
    console.error('❌ Fatal error:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
