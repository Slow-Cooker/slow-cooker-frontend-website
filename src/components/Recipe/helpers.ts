import {getData} from "../../api/call.ts";

export const user = [
    {
        name: 'John Doe',
        avatar: 'https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png',
        title: "Shrimp and Chorizo Paella",
        subheader: 'September 14, 2016',
        image: '../../../paella.jpg',
        typography: "This impressive paella is a perfect party dish and a fun meal to cook together with your guests. Add 1 cup of frozen peas along with the mussels, if you like."
    },
    {
        name: 'Mary Jane',
        avatar: 'https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png',
        title: "Pizza chorizo piquant",
        subheader: '25/10/2024',
        image: '../../../Pizza.webp',//
        typography: "A base d'une délicieuse pâte à pizza maison avec une sauce tomate minute, " +
            "de la mozza di buffala et des chorizos piquants, cette pizza est un vrai délice."
    },
]

export const handleRecipe = async () => {
    const apiUrl = 'http://localhost:3000/recipe/';
    //console.log('apiUrl:', apiUrl);
    try {
        const responseData = await getData(apiUrl);
        console.log('Voici les données de l\'utilisateur:', responseData);
        return responseData;
    } catch (error) {
        console.error('Get Recipes failed:', error);
        throw new Error('Failed to fetch recipes');
    }
}

export const handleUser = async () => {
    const apiUrl = 'http://localhost:3000/recipe';
    try {
        const responseData = await getData(apiUrl);
        console.log('Voici les données de l\'utilisateur:', responseData);
        return responseData;
    } catch (error) {
        console.error('Get User failed:', error);
        throw new Error('Failed to fetch User');
    }
}

// {
//     "id_recipe": "d4bfad7c-71c6-47f3-82db-1c44f24f4ce0",
//     "name_recipe": "tartare",
//     "difficulty": "Weak",
//     "category": "Drink",
//     "duration": "15 minutes",
//     "validate": true,
//     "image": "https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png"
// }