import { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/react'
import mongoose from 'mongoose'
import Blog from '@/models/Blog'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getSession({ req })

  if (!session) {
    return res.status(401).json({ error: 'Unauthorized' })
  }

  await mongoose.connect(process.env.MONGODB_URI!)

  const { id } = req.query

  if (req.method === 'GET') {
    try {
      const blog = await Blog.findById(id)
      if (!blog) {
        return res.status(404).json({ error: 'Blog not found' })
      }
      res.status(200).json(blog)
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch blog' })
    }
  } else if (req.method === 'PUT') {
    try {
      const blog = await Blog.findByIdAndUpdate(id, req.body, { new: true, runValidators: true })
      if (!blog) {
        return res.status(404).json({ error: 'Blog not found' })
      }
      res.status(200).json(blog)
    } catch (error) {
      res.status(500).json({ error: 'Failed to update blog' })
    }
  } else if (req.method === 'DELETE') {
    try {
      const blog = await Blog.findByIdAndDelete(id)
      if (!blog) {
        return res.status(404).json({ error: 'Blog not found' })
      }
      res.status(200).json({ message: 'Blog deleted successfully' })
    } catch (error) {
      res.status(500).json({ error: 'Failed to delete blog' })
    }
  } else {
    res.setHeader('Allow', ['GET', 'PUT', 'DELETE'])
    res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}

