import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

export default function SearchBar({ data = [], setResults, propertyName = 'nombre', subPropertyName }) {

    const handleSearch = (e, value) => {

        if (!value) return setResults(data);

        const term = subPropertyName ? value[propertyName]?.[subPropertyName].toLowerCase() : value[propertyName].toLowerCase()

        const results = term
            ? data.filter((item) => {
                if (subPropertyName) {
                    return item[propertyName][subPropertyName].toLowerCase().includes(term);
                } else {
                    return item[propertyName].toLowerCase().includes(term);
                }
            })
            : data;

        setResults(results);
    };

    return (
        <Autocomplete
            id="search-bar-autocomplete"
            options={data}
            groupBy={(option) => {
                const label = subPropertyName ? option[propertyName][subPropertyName] : option[propertyName];
                return label[0].toUpperCase();
            }}
            getOptionLabel={(option) => {
                const label = subPropertyName ? option[propertyName]?.[subPropertyName] : option[propertyName];
                return label || '';
            }}
            sx={{ width: '100%' }}
            renderInput={(params) => <TextField {...params} placeholder="Buscar..." id="search-input" />}
            onChange={handleSearch}
            autoHighlight={true}
            clearText='Limpiar'
            openText='Abrir'
            noOptionsText='No hay opciones'
        />
    );
}
