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
        endpoint: `visitor?${filter}`, 
        method: 'GET',
        error: 'Error al obtener los visitantes'
    });
    return response;
}

async function findById(id) {
    const response = await fetchAPI({
        endpoint: `visitor/${id}`, 
        method: 'GET',
        error: 'Error al obtener al visitante'
    });
    return response;
}

async function findAllMapping(filter = '') {

    const visitors = await findAll(filter);
    return visitors.map(visitor => {
        const { user, directorate_has_sector, employee, ...rest } = visitor;
        return {
            user: user.profile,
            office: directorate_has_sector.name,
            employee: `${employee.last_name} ${employee.name}`,
            ...rest
        };
    });
}

async function findByIdMapping(id) {

    const visitor = await findById(id);
    
    const { user, directorate_has_sector, employee, ...rest } = visitor;

    return {
        user: user.profile,
        office: directorate_has_sector.name,
        employee: `${employee.last_name} ${employee.name}`,
        ...rest
    };
}

async function findAllPending(mapping = true) {
        
    if (mapping) return findAllMapping('exit=false');
    
    return findAll('exit=false');
}

async function update(id, newVisitor) {

    const response = await fetchAPI({
        endpoint: `visitor/${id}`, 
        method: 'PATCH', 
        body: newVisitor,
        error: 'Error al actualizar el visitante'
    });
    return response;
}

async function create(newVisitor) {

    const response = await fetch(`${uriAPI}/visitor`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: newVisitor
    });

    const result = await response.json();

    if (!response.ok || result.error) {
        console.error('ERROR');
        console.table(result);
        throw (error || 'Error en la solicitud');
    }

    return result;
}

export default {
    findAll,
    findAllMapping,
    findByIdMapping,
    findAllPending,
    findById,
    update,
    create,
}