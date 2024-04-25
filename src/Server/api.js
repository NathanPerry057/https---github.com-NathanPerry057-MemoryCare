import fetch from 'cross-fetch'; // Make sure to install this package if not already installed

export const notifyBackend = async (userId, authenticated) => {
    const response = await fetch('http://your-backend-url/api/auth-event', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            userId, // Pass this dynamically from the calling component
            authenticated,
        }),
    });

    const data = await response.json();
    console.log(data);
    return data;
};