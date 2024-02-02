import { useState } from "react";
import { setDataInPath } from "../helpers/jsonHelpers";

export const useForm = (initialState = {}) => {
    const [values, setValues] = useState({ ...initialState, errors: {} });


    const handleInputChange = ({ target }, path = null) => {
        let obj = path
            ? setDataInPath(values, `${path}.${target.name}`, target.value)
            : { [target.name]: target.value };

        setValues({
            ...values,
            ...obj,
        });

        if (values?.errors[target.name]) {
            delete values.errors[target.name];
        }
    };

    const reset = () => setValues({ ...initialState, errors: {} });

    const setInputValue = (attribute, value, path = null) => {
        let obj = path
            ? setDataInPath(values, `${path}.${attribute}`, value)
            : { [attribute]: value };

        setValues({
            ...values,
            ...obj,
        });

        if (values?.errors[attribute]) {
            delete values.errors[attribute];
        }
    };

    const setErrors = (errors) => {
        setValues({
            ...values,
            errors,
        });
        // values.errors = errors;
    };

    const setFormValues = (attributes = {}) => {
        setValues({
            ...values,
            ...attributes,
            errors: {},
        });
    };

    return {
        values,
        handleInputChange,
        reset,
        setInputValue,
        setErrors,
        setFormValues,
        errors: values.errors,
    };
};
