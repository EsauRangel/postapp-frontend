import { setModal } from '../store/slices/postSlice';
import { useDispatch } from 'react-redux';
import { useForm } from '../hooks/useForm';
import { useEffect } from 'react';
import { startGet } from '../store/thunks/postThunk';


export const usePostTable = () => {

    const initialState = {
        q: "",
        showItems: []
    }

    const dispatch = useDispatch();
    const { values, setFormValues, handleInputChange } = useForm(initialState)
    const { q, showItems } = values;

    const handleShowText = (id, text) => {
        let check = showItems.find(element => element == id);
        if (check) {
            return text
        }
        return text.substring(0, 70) + '...';
    }

    const validItem = (id) => {
        console.log(id, showItems)
        let check = showItems.find(element => element == id)
        if (check) {
            const elements = showItems.filter(element => element != id);
            setFormValues({ ...values, showItems: elements });
        } else {
            setFormValues({ ...values, showItems: [...showItems, id] });
        }
    }
    const handleSetModal = () => {
        dispatch(setModal())
    }

    const formatDate = (date) => {
        const fecha = new Date(date);

        const year = fecha.getFullYear();
        const month = fecha.getMonth() + 1;
        const day = fecha.getDate();
        return `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
    }

    useEffect(() => {
        if (q.length % 2 === 0) {
            dispatch(startGet(q))
        }
    }, [q]);


    return {
        handleShowText,
        validItem,
        handleSetModal,
        formatDate,
        handleInputChange,
        values
    }
}
