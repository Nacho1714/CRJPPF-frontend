const uriAPI = import.meta.env.VITE_API_URL

async function fetchAPI({endpoint, method = 'GET', body = null, error = null}) {

    const response = await fetch(`${uriAPI}/${endpoint}`, {
        method,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: body ? JSON.stringify(body) : undefined
    });

    const result = await response.json();

    if (!response.ok || result.error) {
        console.error('ERROR');
        console.table(result);
        throw (error || 'Error en la solicitud');
    }

    return result;
}

async function login(profile, password) {
    const response = await fetchAPI({
        endpoint: `auth/login`, 
        method: 'POST',
        body: {profile, password},
        error: 'Error al iniciar sesión'
    });
    return response;
}

async function decodeToken(profile, password) {
    const response = await fetchAPI({
        endpoint: `auth/decode-token`, 
        method: 'GET',
        error: 'Error al decodigicar el token'
    });
    return response;
}

export default {
    login,
    decodeToken
}