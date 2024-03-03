export interface ShippingProps {
  free_shipping: boolean;
}
export interface ProductProps {
  id: string;
  title: string;
  currency_id: string;
  price: string;
  thumbnail: string;
  condition: string;
  official_store_name: string;
  shipping: ShippingProps;
}

export interface AvailableFilterItemProps {
  name: string;
  results: number;
}
export interface AvailableFilterProps {
  id: string;
  values: AvailableFilterItemProps[];
}

export interface FiltersItemValueProps {
  name: string;
}

export interface FiltersProps {
  values: FiltersItemValueProps[];
}

export interface ResponseListProducts {
  results: ProductProps[];
  available_filters: AvailableFilterProps[];
  filters: FiltersProps[];
}
