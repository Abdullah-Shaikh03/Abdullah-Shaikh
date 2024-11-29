'use server'

import { ListObjectsV2Command, GetObjectCommand } from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'
import { s3Client } from '@/utils/s3'
import { Certificate } from './certificate-grid'

export async function getCertificates(): Promise<Certificate[]> {
  try {
    const command = new ListObjectsV2Command({
      Bucket: process.env.AWS_S3_BUCKET,
      // Remove the 'certificates/' prefix since files are in root
    })

    const { Contents = [] } = await s3Client.send(command)

    // Get signed URLs for each object
    const certificatesWithUrls = await Promise.all(
      Contents.filter(item => item.Key?.endsWith('.jpg'))
        .map(async (item): Promise<Certificate> => {
          if (!item.Key) {
            throw new Error('Certificate key is undefined')
          }
          const getObjectCommand = new GetObjectCommand({
            Bucket: process.env.AWS_S3_BUCKET,
            Key: item.Key,
          })
          const url = await getSignedUrl(s3Client, getObjectCommand, { expiresIn: 3600 })
          return {
            key: item.Key,
            url,
            lastModified: item.LastModified ? item.LastModified.toLocaleDateString() : 'Unknown date',
          }
        })
    )

    return certificatesWithUrls

  } catch (error) {
    console.error('Error fetching certificates:', error)
    throw new Error('Failed to fetch certificates')
  }
}

