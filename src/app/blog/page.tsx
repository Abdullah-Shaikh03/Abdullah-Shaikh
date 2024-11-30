'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { toast } from "@/hooks/use-toast"

interface Blog {
  _id: string
  title: string
  content: string
  createdAt: string
  updatedAt: string
}

export default function BlogPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [blogs, setBlogs] = useState<Blog[]>([])
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [editingBlog, setEditingBlog] = useState<Blog | null>(null)

  useEffect(() => {
    fetchBlogs()
  }, [])

  const fetchBlogs = async () => {
    const res = await fetch('/api/blogs')
    const data = await res.json()
    setBlogs(data)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (editingBlog) {
      await updateBlog()
    } else {
      await createBlog()
    }
  }

  const createBlog = async () => {
    try {
      const res = await fetch('/api/blogs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, content }),
      })
      if (res.ok) {
        toast({ title: 'Blog created successfully' })
        setTitle('')
        setContent('')
        fetchBlogs()
      } else {
        throw new Error('Failed to create blog')
      }
    } catch (error) {
      toast({ title: 'Error creating blog', variant: 'destructive' })
    }
  }

  const updateBlog = async () => {
    try {
      const res = await fetch(`/api/blogs/${editingBlog?._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, content }),
      })
      if (res.ok) {
        toast({ title: 'Blog updated successfully' })
        setTitle('')
        setContent('')
        setEditingBlog(null)
        fetchBlogs()
      } else {
        throw new Error('Failed to update blog')
      }
    } catch (error) {
      toast({ title: 'Error updating blog', variant: 'destructive' })
    }
  }

  const deleteBlog = async (id: string) => {
    try {
      const res = await fetch(`/api/blogs/${id}`, { method: 'DELETE' })
      if (res.ok) {
        toast({ title: 'Blog deleted successfully' })
        fetchBlogs()
      } else {
        throw new Error('Failed to delete blog')
      }
    } catch (error) {
      toast({ title: 'Error deleting blog', variant: 'destructive' })
    }
  }

  const editBlog = (blog: Blog) => {
    setEditingBlog(blog)
    setTitle(blog.title)
    setContent(blog.content)
  }

  if (status === 'loading') {
    return <div>Loading...</div>
  }

  if (!session) {
    router.push('/')
    return null
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Blog Management</h1>
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>{editingBlog ? 'Edit Blog' : 'Create New Blog'}</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              placeholder="Blog Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
            <Textarea
              placeholder="Blog Content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
              className="min-h-[200px]"
            />
            <Button type="submit">{editingBlog ? 'Update' : 'Create'}</Button>
            {editingBlog && (
              <Button type="button" variant="outline" onClick={() => setEditingBlog(null)}>
                Cancel Edit
              </Button>
            )}
          </form>
        </CardContent>
      </Card>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {blogs.map((blog) => (
          <Card key={blog._id}>
            <CardHeader>
              <CardTitle>{blog.title}</CardTitle>
              <CardDescription>
                Created: {new Date(blog.createdAt).toLocaleDateString()}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="line-clamp-3">{blog.content}</p>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={() => editBlog(blog)}>
                Edit
              </Button>
              <Button variant="destructive" onClick={() => deleteBlog(blog._id)}>
                Delete
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}

