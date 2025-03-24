import { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/react'
import mongoose from 'mongoose'
import Blog from '@/models/Blog'
import dotenv from 'dotenv'

dotenv.config()

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getSession({ req })

  if (!session) {
    return res.status(401).json({ error: 'Unauthorized' })
  }

  await mongoose.connect(process.env.MONGODB_URI!)

  if (req.method === 'GET') {
    try {
      const blogs = await Blog.find({}).sort({ createdAt: -1 })
      res.status(200).json(blogs)
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch blogs' })
    }
  } else if (req.method === 'POST') {
    try {
      const blog = await Blog.create(req.body)
      res.status(201).json(blog)
    } catch (error) {
      res.status(500).json({ error: 'Failed to create blog' })
    }
  } else {
    res.setHeader('Allow', ['GET', 'POST'])
    res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}

