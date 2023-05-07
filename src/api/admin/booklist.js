import axios from "axios";

//列出当前用户的书单
export function getListData() {
    return axios.get("/api/admin/bookList?size=10")
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