import {getData, deleteData, patchData} from "../../api/call.ts";

export const handleRecipe = async () => {
    const apiUrl = 'http://localhost:3000/recipes/all';
    try {
        const responseData = await getData(apiUrl);
        return responseData;
    } catch (error) {
        console.error('Get Recipes failed:', error);
        throw new Error('Failed to fetch recipes');
    }
}

export const deleteRecipe = async (id: string) => {
    const apiUrl = `http://localhost:3000/recipes/${id}`;
    try {
        const responseData = await deleteData(apiUrl);
        return responseData;
    } catch (error) {
        console.error('Delete Recipe failed:', error);
        throw new Error('Failed to delete recipe');
    }
}

export const patchRecipe = async (id: string) => {
    const apiUrl = `http://localhost:3000/recipes/${id}`;
    const body = {validate: true};
    try {
        const responseData = await patchData(apiUrl, body);
        return responseData;
    } catch (error) {
        console.error('Update Recipe failed:', error);
        throw new Error('Failed to update recipe');
    }
}
