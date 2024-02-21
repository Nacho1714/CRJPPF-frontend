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

async function findAll(filter = '') {
    const response = await fetchAPI({
        endpoint: `employee?${filter}`, 
        method: 'GET',
        error: 'Error al obtener los empleados'
    });
    return response;
}

async function findByOffice(idOffice) {
    const response = await fetchAPI({
        endpoint: `employee/office/${idOffice}`, 
        method: 'GET',
        error: 'Error al obtener los empleados'
    });
    return response;
}

export default {
    findAll,
    findByOffice
}