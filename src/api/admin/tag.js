import axios from "axios";

//列出所有标签
export function getListData(page, size) {
    let query = ''
    if (page != undefined && size != undefined) {
        query = `?page=${page}&size=${size}`
    }
    return axios.get("/api/admin/tag" + query)
}


//删除标签
export function deletetag(id) {
    return axios.request(
        {
            url: '/api/admin/tag/' + id,
            method: 'delete',
        })
}

export function addItem(data) {
    return axios.request(
        {
            url: '/api/admin/tag',
            method: 'post',
            data: data
        })
}

//更新标签
export function updatetagInfo(data) {
    return axios.request(
        {
            url: '/api/admin/tag/' + data.id,
            method: 'put',
            data: data
        })

}

//更新标签
export function gettagInfo(id) {
    return axios.request(
        {
            url: '/api/admin/tag/' + id,
            method: 'get'
        })

}

//更新标签
export function changeStatus(id) {
    return axios.request({
        url: '/api/admin/tag/' + id,
        method: 'patch'
    })
}

//获取标签选择数据
export function getTagSelectData() {
    return axios.request({
        url: '/api/admin/tag/select',
        method: 'get'
    })
}