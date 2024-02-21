import * as Yup from 'yup';

export default function LoginSchema() {

    const schema = Yup.object().shape({

        profile: Yup
            .string()
            .min(4, 'El valor debe tener 4 caracteres')
            .max(4, 'El valor debe tener 4 caracteres')
            .required('El campo es obligatorio'),

        password: Yup
            .string()
            .min(8, 'El valor debe tener al menos 8 caracteres')
            .max(255, 'El valor debe ser hasta 255 caracteres')
            .required('El campo es obligatorio'),

    });

    return schema;
}