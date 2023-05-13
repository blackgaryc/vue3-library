import axios from "axios";

//列出当前用户
export function getUserListData(page, size,name) {
    let query = ''
    if (page != undefined && size != undefined) {
        query = `?page=${page}&size=${size}`
    }
    if(name!=undefined){
        query += "&name="+name
    }
    return axios.get("/api/admin/user"+query)
}

export function disableUser(id) {
    return axios.request(
        {
            url: '/api/admin/user/' + id,
            method: 'delete',
        })
}

export function enableUser(id, data) {
    return axios.request(
        {
            url: '/api/admin/user/' + id,
            method: 'put',
            data: data
        })
}
export function getUserInfo(id) {
    return axios.get("/api/admin/user/" + id)
}

export function updateUserInfo(form) {
    return axios.put("/api/admin/user", form)
}