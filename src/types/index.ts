export interface Product {
    id: number;
    name: string;
    price: number;
    isbn: string;
    categories: Category[];
  }

  export interface ProductCreate {
    name: string;
    price: number;
    isbn: string;
    categoryIds: number[];
  }

  export interface ProductUpdate {
    id: number;
    name: string;
    price: number;
    isbn: string;
    categoryIds: number[];
  }
  
export interface Category {
id: number;
nameEn: string;
nameAr: string;
}

export interface CategoryProductCount extends Category {
    productCount: number;
}

export interface PaginatedResult<T> {
items: T[];
pageNumber: number;
pageSize: number;
totalPages: number;
totalCount: number;
}

export interface ApiError {
message: string;
statusCode: number;
}