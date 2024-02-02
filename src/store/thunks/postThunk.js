import { Call } from "../../helpers/fetch"
import { addPost, setPosts, setModal, startUILoading, stoptUILoading } from "../slices/postSlice";
import Swal from 'sweetalert2'

export const startGet = (q) => {
    return async (dispatch) => {
        dispatch(startUILoading());
        const params = new URLSearchParams();
        params.set("q", q);
        const resp = await Call(`posts`, "GET", params.toString());
        if (resp.ok) {
            dispatch(setPosts(resp.posts));
        }

        dispatch(stoptUILoading());
    }
}

export const startCreate = (data, setFormValues, initialValues) => {
    return async (dispatch) => {
        dispatch(startUILoading());
        delete data.errors
        const resp = await Call("posts", "POST", data)
        if (resp.ok) {
            Swal.fire({
                title: "Éxito",
                text: "Registro exitoso.",
                icon: "success",
                toast: true,
                position: "bottom-end",
                timer: 8000,
            });
            dispatch(addPost(resp.post));
            dispatch(setModal());
            setFormValues(initialValues);

        }else{
            Swal.fire({
                title: "Error",
                text: "Ocurrio Al crear su post. contacte a un administrador.",
                icon: "error",
                toast: true,
                position: "bottom-end",
                timer: 8000,
            });
        }

        dispatch(stoptUILoading());
    }
}

