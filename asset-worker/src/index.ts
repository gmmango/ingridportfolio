import { S3Client, GetObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl as getSignedS3Url } from '@aws-sdk/s3-request-presigner';

export interface Env {
  ALLOWED_REFERER: string;
  ACCESS_KEY_ID: string;
  SECRET_ACCESS_KEY: string;
  ACCOUNT_ID: string;
  BUCKET_NAME: string; // Your R2 bucket name
}

const URL_EXPIRATION = 300; // 5 minutes
const ALLOWED_EXTENSIONS = ['.jpg', '.png', '.gif', '.pdf']; // optional whitelist

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const referer = request.headers.get('Referer') || '';
    if (!referer.startsWith(env.ALLOWED_REFERER)) {
      return new Response('Forbidden', { status: 403 });
    }

    const url = new URL(request.url);
    const filePath = url.pathname.slice(1);

    if (!filePath || filePath.includes('..') || filePath.startsWith('/')) {
      return new Response('Invalid path', { status: 400 });
    }

    if (!ALLOWED_EXTENSIONS.some(ext => filePath.endsWith(ext))) {
      return new Response('Invalid file type', { status: 400 });
    }

    const s3Client = new S3Client({
      region: 'auto',
      endpoint: `https://${env.ACCOUNT_ID}.r2.cloudflarestorage.com`,
      credentials: {
        accessKeyId: env.ACCESS_KEY_ID,
        secretAccessKey: env.SECRET_ACCESS_KEY,
      },
    });

    const command = new GetObjectCommand({
      Bucket: env.BUCKET_NAME,
      Key: filePath,
    });

    try {
      const signedUrl = await getSignedS3Url(s3Client, command, { expiresIn: URL_EXPIRATION });
      return Response.redirect(signedUrl, 302);
    } catch (err) {
      console.error('Error generating signed URL:', err);
      return new Response('Internal Server Error', { status: 500 });
    }
  },
};
