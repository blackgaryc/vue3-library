import axios from "axios";

//列出当前用户的书单
export function getListData() {
    return axios.get("/api/admin/book?size=10")
}

export function deleteItem(id) {
    return axios.request(
        {
            url: '/api/admin/book/' + id,
            method: 'delete',
        })
}

export function updateItem(id, data) {
    return axios.request(
        {
            url: '/api/admin/book/' + id,
            method: 'put',
            data: data
        })

}