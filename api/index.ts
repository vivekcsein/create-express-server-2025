import app from '../src/app.js';
import type { VercelRequest, VercelResponse } from '@vercel/node';

/**
 * Vercel serverless function handler
 * This exports the Express app for Vercel's serverless environment
 */
export default async function handler(req: VercelRequest, res: VercelResponse) {
    // Set CORS headers for preflight requests
    if (req.method === 'OPTIONS') {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With');
        res.setHeader('Access-Control-Max-Age', '86400');
        return res.status(200).end();
    }

    // Add request timestamp for logging
    const startTime = Date.now();

    // Enhanced logging for serverless environment
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url} - Serverless Function Invoked`);

    try {
        // Pass the request to Express app
        return app(req, res);
    } catch (error) {
        const duration = Date.now() - startTime;
        console.error(`[${new Date().toISOString()}] Error in serverless function (${duration}ms):`, error);

        return res.status(500).json({
            success: false,
            error: 'Internal server error',
            timestamp: new Date().toISOString()
        });
    }
}