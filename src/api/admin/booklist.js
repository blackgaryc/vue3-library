import axios from "axios";

//列出当前用户的书单
export function getListData(form) {
    let query = ''
    if(form!=undefined && undefined!=form.name){
        query+=`&name=${form.name}`
    }
    if(form!=undefined && undefined!=form.published){
        query+=`&published=${form.published}`
    }
    return axios.get("/api/admin/bookList?size=10"+query)
}

export function deleteItem(id) {
    return axios.request(
        {
            url: '/api/admin/bookList/' + id,
            method: 'delete',
        })
}

export function updateItem(id, data) {
    return axios.request(
        {
            url: '/api/admin/bookList/' + id,
            method: 'put',
            data: data
        })

}
export function getItem(id) {
    return axios.request(
        {
            url: '/api/admin/bookList/' + id,
            method: 'get',
        })
}

export function createItem(data) {
    return axios.request(
        {
            url: '/api/admin/bookList/',
            method: 'post',
            data: data
        })
}