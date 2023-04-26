import axios from "axios";

//列出当前用户的书单
export function getListData() {
    return axios.get("/api/admin/user")
}

export function deleteItem(id) {
    return axios.request(
        {
            url: '/api/admin/user/' + id,
            method: 'delete',
        })
}

export function enableItem(id, data) {
    return axios.request(
        {
            url: '/api/admin/user/' + id,
            method: 'put',
            data: data
        })

}