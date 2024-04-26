import fetch from 'cross-fetch'; 

export const notifyBackend = async (userId, authenticated) => {
    const response = await fetch('http://your-backend-url/api/auth-event', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            userId, 
            authenticated,
        }),
    });

    const data = await response.json();
    console.log(data);
    return data;
};