import type { NextApiRequest, NextApiResponse } from 'next';
import { randomBytes } from 'crypto';
import { generateKeyShares } from '../../utils/crypto';

type RequestData = {
  numShares: number;
  threshold: number;
};

type ResponseData = {
  success: boolean;
  error?: string;
  data?: {
    key: string;
    shares: Array<{
      index: number;
      x1: string;
      y1: string;
      x2: string;
      y2: string;
    }>;
  };
};

export default function handler(req: NextApiRequest, res: NextApiResponse<ResponseData>) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, error: 'Method not allowed' });
  }

  try {
    const { numShares, threshold }: RequestData = req.body;

    if (threshold > numShares) {
      return res.status(400).json({
        success: false,
        error: 'Threshold cannot be greater than number of shares',
      });
    }

    // Генерируем ключ из 16 байт для AES-128-CBC
    const key = randomBytes(16);

    // Генерируем шейры
    const shares = generateKeyShares(key, threshold, numShares);

    res.status(200).json({
      success: true,
      data: {
        key: key.toString('hex'),
        shares: shares.map(share => ({
          index: share.index,
          x1: share.x1.toString(),
          y1: share.y1.toString(),
          x2: share.x2.toString(),
          y2: share.y2.toString(),
        })),
      },
    });
  } catch (error: any) {
    console.error('Error generating shares:', error);
    res.status(500).json({
      success: false,
      error: error.message || 'Error generating shares',
    });
  }
}
