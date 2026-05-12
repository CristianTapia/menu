export type Product = {
  id: number;
  name: string;
  price: number;
  stock?: number;
  description?: string;
  category: {
    id: number;
    name: string;
  };
  image_url?: string | null;
};

export type Category = {
  id: number;
  name: string;
};

export type Highlight = {
  id: number;
  description: string;
  image_url?: string | null;
};

export type TenantLocation = {
  name?: string | null;
  address?: string | null;
  lat?: number | null;
  lng?: number | null;
  mapsUrl?: string | null;
};

export type MenuContext = {
  tenantId?: string | null;
  tenantName?: string | null;
  location?: TenantLocation | null;
  tableLabel?: string | null;
  tableToken?: string | null;
};
