import { PaginatedResult, Product, ProductCreate } from "../types";
import { api } from "./api";

export const getProducts = async (page: number, pageSize: number, categoryId?: number, search?: string): Promise<PaginatedResult<Product>> => {
    try {
      const response = await api.get<PaginatedResult<Product>>('/products', {
        params: { PageNumber: page, PageSize: pageSize, search, categoryId  },
      });
      return response.data;
  } catch (error) {
    throw error;
  }
  };
  
  export const getProduct = async (id: number): Promise<Product> => {
    try {
      const response = await api.get<Product>(`/products/${id}`);
      return response.data;
  } catch (error) {
    throw error;
  }
  };
  
  export const createProduct = async (product: ProductCreate): Promise<Product> => {
    try {
        const response = await api.post<Product>('/products', product);
        return response.data;
    } catch (error) {
      throw error;
    }
  };
  
  export const updateProduct = async (id: number, product: ProductCreate): Promise<Product> => {
    try {
      const response = await api.put<Product>(`/products/${id}`, product);
      return response.data;
  } catch (error) {
    throw error;
  }
  };
  
  export const deleteProduct = async (id: number): Promise<void> => {
    try {
      await api.delete(`/products/${id}`);
  } catch (error) {
    throw error;
  }
  };
  