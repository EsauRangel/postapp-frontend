export const Call = async (
    endpoint,
    method = "GET",
    body = null,
    signed = false
) => {
    let url = `http://localhost:1212/api/v1/${endpoint}`;

    const headers = new Headers({
        "Content-Type": "application/json",
        Accept: "application/json",
    });

    if (signed) {
        const token = localStorage.getItem("token");
        if (token) {
            headers.append("Authorization", `Bearer ${token}`);
        }
    }

    const options = {
        method,
        headers,
        body: body ? JSON.stringify(body) : null,
    };

    if (method === "GET") {
        if (body !== null) {
            url = `${url}?${body}`;
            delete options.body;
        }
    }

    const resp = await fetch(url, options);
    
    const result = await resp.json();

    result.status_code = resp.status;
    result.request_ok = resp.ok;
    return result;
};

export const Call_new = async (
    endpoint,
    method = "GET",
    body = null,
    signed = true
) => {
    let url = `/api/v1/${endpoint}`;

    const headers = new Headers({
        Accept: "application/json",
    });

    if (signed) {
        const token = localStorage.getItem("token");
        if (token) {
            headers.append("Authorization", `Bearer ${token}`);
        }
    }

    if (typeof body === "object") {
        if (!body instanceof FormData) {
            body = objectToFormData(body);
        } else {
            body = JSON.stringify(body) || null;
        }

    }

    const options = {
        method,
        headers,
        body: body || null,
    };

    if (method === "GET") {
        if (body !== null) {
            url = `${url}?${body}`;
            delete options.body;
        }
    }

    const resp = await fetch(url, options);

    const result = await resp.json();

    result.status_code = resp.status;
    result.request_ok = resp.ok;

    return result;
};

export const CallWithFormData = async (
    endpoint,
    method = "POST",
    body = null,
    signed = true
) => {
    let url = `/api/v1/${endpoint}`;

    const headers = new Headers({ Accept: "application/json" });

    if (signed) {
        const token = localStorage.getItem("token");
        if (token) {
            headers.append("Authorization", `Bearer ${token}`);
        }
    }

    const options = {
        method,
        headers,
        body,
    };


    if (method === "GET") {
        if (body !== null) {
            url = `${url}?${body}`;
            delete options.body;
        }
    }

    const resp = await fetch(url, options);

    const result = await resp.json();

    result.status_code = resp.status;
    result.request_ok = resp.ok;

    return result;
};

export const CallWithFormDataFile = async (
    endpoint,
    method = "GET",
    body = null,
    signed = true
) => {
    let url = `/api/v1/${endpoint}`;

    const headers = new Headers({ Accept: "application/json" });

    if (signed) {
        const token = localStorage.getItem("token");
        if (token) {
            headers.append("Authorization", `Bearer ${token}`);
        }
    }

    const options = {
        method,
        headers,
        body,
    };

    if (method === "GET") {
        if (body !== null) {
            url = `${url}?${body}`;
            delete options.body;
        }
    }

    const resp = await fetch(url, options);

    if (resp.status !== 200) {
        const result = await resp.json();
        result.status_code = resp.status;
        result.request_ok = resp.ok;
        return result;
    } else {
        return await resp.blob();
    }
};



export const cleanEmpty = (data) => {
    Object.entries(data).forEach(([key, value]) => {
        if (key !== "errors") {
            if (
                !value ||
                value.length === 0 ||
                (typeof value === "object" &&
                    Object.entries(value).length === 0 &&
                    !data[key].name)
            ) {
                if (typeof data[key] == "string") {
                    data[key] = "";
                } else {
                    delete data[key];
                }
            }
        }
    });

    return data;
};

export const objectToFormData = (data) => {
    const formData = new FormData();

    Object.entries(data).forEach(([key, value]) => {
        if (value || value === false) {
            if (value instanceof File) {
                formData.append(key, value);
            } else if (typeof value === "object") {
                formData.append(key, JSON.stringify(value));
            } else {
                formData.append(key, value);
            }
        } else {
            //? Solo Descarta:  undefined, "", null
        }
    });
    return formData;
};

export const downloadBlob = async (blob, filename) => {
    let url = URL.createObjectURL(await blob);
    let link = document.createElement("a");

    link.href = url;
    link.setAttribute("download", filename);
    document.body.appendChild(link);
    link.click();
    link.remove();
};

