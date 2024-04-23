export async function getData(url: string) {
    let token = localStorage.getItem('token');
    if (!token) {
        token = '';
    }
    try {
        const response = await fetch(url, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw new Error('Failed to fetch data');
    }
}

export async function postData(url: string, body: any) {
    let token = localStorage.getItem('token');
    if (!token) {
        token = '';
    }
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(body)
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error posting data:', error);
        throw new Error('Failed to post data');
    }
}
