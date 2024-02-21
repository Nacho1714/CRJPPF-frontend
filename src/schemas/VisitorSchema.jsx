import * as Yup from 'yup';

export default function VisitorSchema() {
    
    const schema = Yup.object().shape({

        employee_fk: Yup
        .number()
        .required('El campo es obligatorio'),

        destination_fk: Yup
        .number()
        .required('El campo es obligatorio'),

        name: Yup
        .string()
        .min(2, 'El valor debe tener al menos 2 caracteres')
        .max(100, 'El valor debe ser hasta 100 caracteres')
        .matches(/^[A-Za-z\s''ñÑ. ]+$/, 'El valor debe ser solo letras')
        .required('El campo es obligatorio'),

        last_name: Yup
        .string()
        .min(2, 'El valor debe tener al menos 2 caracteres')
        .max(100, 'El valor debe ser hasta 100 caracteres')
        .matches(/^[A-Za-z\s''ñÑ. ]+$/, 'El valor debe ser solo letras')
        .required('El campo es obligatorio'),

        document_type: Yup
        .string()
        .required('El campo es obligatorio'),

        document_number: Yup
        .string()
        .min(2, 'El valor debe tener al menos 2 caracteres')
        .max(20, 'El valor debe ser hasta 20 caracteres')
        .matches(/^[A-Za-znÑ0-9]+$/, 'El documento no es valido')
        .required('El campo es obligatorio'),
        
        note: Yup
        .string()
        .max(1000, 'El valor debe ser hasta 1000 caracteres'),

    });

    return schema;
}