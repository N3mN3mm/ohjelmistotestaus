
import { describe, it, expect, vi, afterEach } from 'vitest';
import { getRandomDogImage } from '../services/dogService';

describe('dogService', () => {
    afterEach(() => {
        vi.restoreAllMocks();
    });

    it('should return the dog image URL and success status', async () => {
        const mockedData = {
        message: 'https://images.dog.ceo/breeds/terrier-welsh/lucy.jpg',
        status: 'success',
        };

        const fetchMock = vi.spyOn(globalThis, 'fetch').mockResolvedValue({
            ok: true,
            status: 200,
            json: async () => mockedData,
        } as Response);

        const result = await getRandomDogImage();

        expect(result.imageUrl).toBe(mockedData.message);
        expect(result.status).toBe('success');
        expect(fetchMock).toHaveBeenCalledOnce();
    });


    it('should throw an error when the Dog API returns a server error', async () => {
        vi.spyOn(globalThis, 'fetch').mockResolvedValue({
            ok: false,
            status: 500,
    } as Response);

    await expect(getRandomDogImage()).rejects.toThrow(
        'Failed to fetch dog image: Dog API returned status 500'
    );
    });

});
