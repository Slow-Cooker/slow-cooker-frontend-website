import {getData, deleteData} from "../../api/call.ts";

export const handleRecipe = async () => {
    const apiUrl = `${import.meta.env.VITE_API_BASE_URL}/recipes`;
    try {
        const responseData = await getData(apiUrl);
        return responseData;
    } catch (error) {
        console.error('Get Recipes failed:', error);
        throw new Error('Failed to fetch recipes');
    }
}

export const handleComment = async (id:string) => {
    const apiUrl = `${import.meta.env.VITE_API_BASE_URL}/${id}/comments`;
    try {
        const responseData = await getData(apiUrl);
        return responseData;
    } catch (error) {
        console.error('Get Recipes failed:', error);
        throw new Error('Failed to fetch recipes');
    }
}

export const deleteRecipe = async (id_recipe: string, id_comment:string) => {
    const apiUrl = `${import.meta.env.VITE_API_BASE_URL}/${id_recipe}/comments/${id_comment}`;
    try {
        const responseData = await deleteData(apiUrl);
        return responseData;
    } catch (error) {
        console.error('Delete Recipe failed:', error);
        throw new Error('Failed to delete recipe');
    }
}
