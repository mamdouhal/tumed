// Zod validation schemas for the admin system

import { z } from 'zod'

// Login validation schema
export const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
})

export type LoginInput = z.infer<typeof loginSchema>

// Faaliyet (Activity) validation schema
export const faaliyetSchema = z.object({
  title: z.string().min(1, 'Title is required').max(200, 'Title is too long'),
  description: z.string().min(1, 'Description is required'),
  category: z.string().min(1, 'Category is required'),
  imageUrl: z.string().optional().nullable().transform(val => {
    if (!val || val === '') return null;
    return val;
  }),
})

export type FaaliyetInput = z.infer<typeof faaliyetSchema>

// Update faaliyet schema (allows partial updates)
export const updateFaaliyetSchema = faaliyetSchema.partial()

// Haber (News) validation schema
export const haberSchema = z.object({
  title: z.string().min(1, 'Title is required').max(200, 'Title is too long'),
  content: z.string().min(1, 'Content is required'),
  category: z.string().min(1, 'Category is required'),
  imageUrl: z.string().optional().nullable().transform(val => {
    if (!val || val === '') return null;
    return val;
  }),
  publishDate: z.string().optional(),
})

export type HaberInput = z.infer<typeof haberSchema>

// Update haber schema (allows partial updates)
export const updateHaberSchema = haberSchema.partial()
