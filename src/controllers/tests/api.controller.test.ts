import { mockRequest, mockResponse } from 'jest-mock-req-res';
import { findAll, findById } from '../items.controller';

describe('API controller', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('Should return the listProducts', async () => {
    const req = mockRequest();
    const res = mockResponse();

    const mockData = {
      results: [
        {
          id: '1',
          title: 'Product 1',
          currency_id: 'USD',
          price: 10,
          thumbnail: 'thumbnail_url',
          condition: 'new',
          shipping: { free_shipping: true },
          location: { city: { name: 'City' } },
        },
        {
          id: '2',
          title: 'Product 2',
          currency_id: 'USD',
          price: 20,
          thumbnail: 'thumbnail_url',
          condition: 'new',
          shipping: { free_shipping: true },
          location: { city: { name: 'City' } },
        },
      ],
      available_filters: [
        {
          id: 'category',
          values: [
            { name: 'Category 1', results: 5 },
            { name: 'Category 2', results: 3 },
          ],
        },
      ],
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const globalRef: any = global;
    globalRef.fetch = jest.fn().mockImplementation(() =>
      Promise.resolve({
        ok: true,
        status: 200,
        json: () => Promise.resolve(mockData),
      }),
    );
    const globalFetch = global.fetch;

    await findAll(req, res);

    expect(res.send).toHaveBeenCalledWith(
      expect.objectContaining({
        results: expect.objectContaining({
          categories: expect.arrayContaining(['Category 1', 'Category 2']),
          items: expect.arrayContaining([
            expect.objectContaining({
              id: '1',
              title: 'Product 1',
              price: { currency: 'USD', amount: 10, decimals: 0 },
              picture: 'thumbnail_url',
              condition: 'new',
              free_shipping: true,
              city: 'City',
            }),
            expect.objectContaining({
              id: '2',
              title: 'Product 2',
              price: { currency: 'USD', amount: 20, decimals: 0 },
              picture: 'thumbnail_url',
              condition: 'new',
              free_shipping: true,
              city: 'City',
            }),
          ]),
        }),
        message: 'Success i',
      }),
    );
    global.fetch = globalFetch;
  });

  test('Should return one product per', async () => {
    const req = mockRequest({ params: { id: '123' } });
    const res = mockResponse();

    const mockProductData = {
      id: '123',
      title: 'Product 1',
      category_id: '456',
      currency_id: 'USD',
      price: 10,
      pictures: [{ url: 'picture_url' }],
      condition: 'new',
      shipping: { free_shipping: true },
      sold_quantity: 5,
    };

    const mockDescriptionData = { plain_text: 'Description of the product' };

    const mockCategoriesData = {
      path_from_root: [{ name: 'Category 1' }, { name: 'Category 2' }],
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const globalRef: any = global;
    globalRef.fetch = jest.fn().mockImplementation(() =>
      Promise.resolve({
        ok: true,
        status: 200,
        json: () => Promise.resolve(mockProductData),
      }),
    );
    globalRef.fetch = jest.fn().mockImplementation(() =>
      Promise.resolve({
        ok: true,
        status: 200,
        json: () => Promise.resolve(mockDescriptionData),
      }),
    );
    globalRef.fetch = jest.fn().mockImplementation(() =>
      Promise.resolve({
        ok: true,
        status: 200,
        json: () => Promise.resolve(mockCategoriesData),
      }),
    );
    const globalFetch = global.fetch;

    await findById(req, res);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.send).toHaveBeenCalledWith({
      message: 'Success',
      results: {
        author: { lastname: 'Bonin', name: 'Ricardo' },
        categories: ['Category 1', 'Category 2'],
        item: {
          condition: undefined,
          description: undefined,
          free_shipping: undefined,
          id: undefined,
          picture: undefined,
          price: { amount: undefined, currency: undefined, decimals: 0 },
          sold_quantity: undefined,
          title: undefined,
        },
      },
    });
    global.fetch = globalFetch;
  });
});
