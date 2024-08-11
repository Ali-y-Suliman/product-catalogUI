import { Category, CategoryProductCount, PaginatedResult } from "../types";
import { api } from "./api";

export const getCategories = async (page: number, pageSize: number): Promise<PaginatedResult<Category>> => {
    try {
        const response = await api.get<PaginatedResult<Category>>('/categories', {
        params: { PageNumber: page, PageSize: pageSize },
        });
        return response.data;
    } catch (error) {
    throw error;
}
  };
 
export const getCategoriesWithProductCount = async (): Promise<CategoryProductCount[]> => {
    try {
        const response = await api.get<CategoryProductCount[]>('/categories/withProductCount');
        return response.data;
    } catch (error) {
      throw error;
    }
};  
  
export const getCategory = async (id: number): Promise<Category> => {
    try {
        const response = await api.get<Category>(`/categories/${id}`);
        return response.data;
    } catch (error) {
      throw error;
    }
};

export const createCategory = async (category: Omit<Category, 'id'>): Promise<Category> => {
    try {
        const response = await api.post<Category>('/categories', category);
        return response.data;
    } catch (error) {
    throw error;
}
};

export const updateCategory = async (id: number, category: Omit<Category, 'id'>): Promise<Category> => {
    try {
        const response = await api.put<Category>(`/categories/${id}`, category);
        return response.data;
    } catch (error) {
    throw error;
}
};

export const deleteCategory = async (id: number): Promise<void> => {
    try {
        await api.delete(`/categories/${id}`);
    } catch (error) {
    throw error;
}
};
  
