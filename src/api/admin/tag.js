import axios from "axios";

//列出所有出版社
export function getListData(page, size) {
    let query = ''
    if (page != undefined && size != undefined) {
        query = `?page=${page}&size=${size}`
    }
    return axios.get("/api/admin/publisher" + query)
}


//删除出版社
export function deletePublisher(id) {
    return axios.request(
        {
            url: '/api/admin/publisher/' + id,
            method: 'delete',
        })
}

//更新出版社
export function updatePublisherInfo(id, data) {
    return axios.request(
        {
            url: '/api/admin/publisher/' + id,
            method: 'put',
            data: data
        })

}

//更新出版社
export function getPublisherInfo(id) {
    return axios.request(
        {
            url: '/api/admin/publisher/' + id,
            method: 'get'
        })

}

//更新出版社
export function changeStatus(id) {
    return axios.request({
            url: '/api/admin/publisher/' + id,
            method: 'patch'
        })
}

//获取出版社选择数据
export function getTagSelectData() {
    return axios.request({
            url: '/api/admin/tag/select',
            method: 'get'
        })
}