import { describe, it, expect, vi, afterEach } from 'vitest';
import { getDogImage } from '../controllers/dogController';
import { getRandomDogImage } from '../services/dogService';
import type { Request, Response } from 'express';

vi.mock('../services/dogService', () => ({
  getRandomDogImage: vi.fn(),
}));

describe('dogController', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should return success and the dog data', async () => {
    const mockedDogData = {
      imageUrl: 'https://images.dog.ceo/breeds/terrier-welsh/lucy.jpg',
      status: 'success',
    };

    vi.mocked(getRandomDogImage).mockResolvedValue(mockedDogData);

    const res = {
      json: vi.fn(),
    } as unknown as Response;

    await getDogImage({} as Request, res);

    expect(res.json).toHaveBeenCalledWith({
      success: true,
      data: mockedDogData,
    });
  });
});
