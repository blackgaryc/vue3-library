import axios from "axios";

//列出所有分类
export function getListData(page, size) {
    let query = ''
    if (page != undefined && size != undefined) {
        query = `?page=${page}&size=${size}`
    }
    return axios.get("/api/admin/category" + query)
}


//删除分类
export function deletecategory(id) {
    return axios.request(
        {
            url: '/api/admin/category/' + id,
            method: 'delete',
        })
}

//更新分类
export function updatecategoryInfo(id, data) {
    return axios.request(
        {
            url: '/api/admin/category/' + id,
            method: 'put',
            data: data
        })

}

export function addCategory(data) {
    return axios.request(
        {
            url: '/api/admin/category',
            method: 'post',
            data: data
        })

}

//更新分类
export function getcategoryInfo(id) {
    return axios.request(
        {
            url: '/api/admin/category/' + id,
            method: 'get'
        })

}

//更新分类
export function changeStatus(id) {
    return axios.request({
        url: '/api/admin/category/' + id,
        method: 'patch'
    })
}

//获取分类选择数据
export function getCategorySelectData() {
    return axios.request({
        url: '/api/admin/category/select',
        method: 'get'
    })
}