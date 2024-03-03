/* eslint-disable camelcase */
import { Request, Response } from 'express';
import { ProductProps, ResponseListProducts } from '../types/types';

export const findAll = async (req: Request, res: Response) => {
  try {
    console.log('req :>> ', req?.query);
    const responseProduct = await fetch(
      `${process.env.API_ENDPOINT}/sites/MLA/search?q=${req?.query?.search}`,
      {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      },
    );
    const data =
      (await responseProduct?.json()) as unknown as ResponseListProducts;

    const listProducts = await data?.results?.slice(0, 4)?.map((product) => {
      return {
        id: product?.id,
        title: product?.title,
        price: {
          currency: product?.currency_id,
          amount: product?.price,
          decimals: 0,
        },
        picture: product?.thumbnail,
        condition: product?.condition,
        free_shipping: product?.shipping?.free_shipping,
        seller: product?.official_store_name,
      };
    });

    const categories =
      (
        await data?.available_filters
          ?.find((item) => item?.id === 'category')
          ?.values?.sort((a, b) => {
            return b.results - a.results;
          })
      )
        ?.map((item) => item?.name)
        ?.slice(0, 5) || data?.filters?.map((item) => item?.values?.[0]?.name);

    console.log('res :>> ', listProducts);
    res.send({
      results: {
        author: {
          name: 'Ricardo',
          lastname: 'Bonin',
        },
        categories,
        items: listProducts,
      },
      message: 'Success i',
    });
  } catch (err) {
    if (err instanceof Error) {
      res.status(500).send({ message: err.message });
    }
  }
};

export const findById = async (req: Request, res: Response) => {
  try {
    const id = req?.params?.id;
    console.log('req :>> ', id);
    const responseProduct = await fetch(
      `${process.env.API_ENDPOINT}/items/${id}`,
      {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      },
    );
    const responseDescription = await fetch(
      `${process.env.API_ENDPOINT}/items/${id}/description`,
      {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      },
    );
    const dataDescription = await responseDescription?.json();
    const data = await responseProduct?.json();

    const { title, condition, pictures, price, shipping, currency_id } = data;

    console.log('res :>> ', dataDescription);
    res.status(201).send({
      results: {
        author: {
          name: 'Ricardo',
          lastname: 'Bonin',
        },
        item: {
          id: data?.id,
          title,
          price: {
            currency: currency_id,
            amount: price,
            decimals: 0,
          },
          picture: pictures?.[0]?.url,
          condition,
          free_shipping: shipping?.free_shipping,
          sold_quantity: 0,
          description: dataDescription?.plain_text,
        },
      },
      message: 'Success',
    });
  } catch (err) {
    if (err instanceof Error) {
      res.status(500).send({ message: err.message });
    }
  }
};
