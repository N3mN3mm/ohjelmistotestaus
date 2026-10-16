
import { describe, it, expect, vi, beforeEach } from 'vitest';
import express from 'express';
import request from 'supertest';
import { getDogImage } from '../controllers/dogController';
import dogRoutes from '../routes/dogRoutes';

vi.mock('../controllers/dogController', () => ({
  getDogImage: vi.fn(),
}));

describe('dogRoutes', () => {
    beforeEach(() => {
        vi.resetAllMocks();
    });

    function createApp() {
        const app = express();
        app.use('/api/dogs', dogRoutes);
        return app;
    }

    it('should return a successful response with the mocked dog image', async () => {
        vi.mocked(getDogImage).mockImplementation(
        async (_req, res) => {
            res.status(200).json({
            success: true,
            data: {
                imageUrl:
                'https://images.dog.ceo/breeds/stbernard/n02109525_15579.jpg',
                status: 'success',
            },
            });
        }
        );

        const response = await request(createApp()).get('/api/dogs/random');

        expect(response.status).toBe(200);
        expect(response.body.success).toBe(true);
        expect(response.body.data.imageUrl).toContain('images.dog.ceo');
    });

    it('should return 500 when fetching a dog image fails', async () => {
        vi.mocked(getDogImage).mockImplementationOnce(
        async (_req, res) => {
            res.status(500).json({
            success: false,
            error: 'Failed to fetch dog image: Network error',
            });
        }
        );

        const response = await request(createApp()).get('/api/dogs/random');

        expect(response.status).toBe(500);
        expect(response.body).toEqual({
            success: false,
            error: 'Failed to fetch dog image: Network error',
        });
    });
});
