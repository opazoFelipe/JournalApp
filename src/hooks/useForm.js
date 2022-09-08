import { useEffect, useState, useMemo } from 'react';

export const useForm = (initialForm = {}, formValidations = {}) => {

    const [formState, setFormState] = useState(initialForm);
    const [formValidation, setFormValidation] = useState({})

    useEffect(() => {
        createValidators()
    }, [formState])

    const isFormValid = useMemo(() => {

        for (const formValue of Object.keys( formValidation )) {
            if ( formValidation[formValue] !== null) return false
        }

        return true
    }, [ formValidation ])


    const onInputChange = ({ target }) => {
        const { name, value } = target;
        setFormState({
            ...formState,
            [name]: value
        });
    }

    const onResetForm = () => {
        setFormState(initialForm);
    }

    const createValidators = () => {
        const formCheckedValues = {}

        for (const formField of Object.keys(formValidations)) {
            const [ fn, errorMessage = 'Este campo es requerido.' ] = formValidations[formField]

            const validationResult = fn( formState[formField] ) ? null : errorMessage

            formCheckedValues[`${ formField }Valid`] = validationResult
        }

        setFormValidation( formCheckedValues )
        // console.log(formCheckedValues);
    }

    return {
        ...formState,
        formState,
        onInputChange,
        onResetForm,

        ...formValidation,
        isFormValid
    }
}

