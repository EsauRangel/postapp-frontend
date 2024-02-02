import { useDispatch } from 'react-redux';
import { useForm } from './useForm';
import { useEffect } from 'react';
import { startCreate, startGet } from '../store/thunks/postThunk';
import { setModal } from '../store/slices/postSlice';

const initialValues = {
    title: "",
    author: "",
    content: "",
}

export const usePost = () => {

    const dispatch = useDispatch();

    const { values, handleInputChange, setFormValues } = useForm(initialValues);


    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(startCreate(values, setFormValues, initialValues))
    };

    const handleClose = () => {
        dispatch(setModal())
    }
    return {
        handleInputChange,
        values,
        handleSubmit,
        handleClose
    }
}
