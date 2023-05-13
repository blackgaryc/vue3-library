import axios from "axios";

//列出所有书籍
export function getListData(page, size,form) {
    console.log(form)
    let query = ''
    if (page != undefined && size != undefined) {
        query = `?page=${page}&size=${size}`
    }
    if(undefined !== form){
        if(undefined !== form.name) query += `&name=${form.name}`
        if(undefined !== form.categoryId) query += `&categoryId=${form.categoryId}`
        if(undefined !== form.publisherId) query += `&publisherId=${form.publisherId}`
    }
    return axios.get("/api/admin/book" + query)
}


//删除书籍
export function deleteBook(id) {
    return axios.request(
        {
            url: '/api/admin/book/' + id,
            method: 'delete',
        })
}

//更新书籍
export function updateBookInfo(id, data) {
    return axios.request(
        {
            url: '/api/admin/book/' + id,
            method: 'put',
            data: data
        })

}

//获取书籍详情
export function getBookInfo(id, data) {
    return axios.request(
        {
            url: '/api/admin/book/' + id,
            method: 'get',
            data: data
        })

}

//上下架书籍
export function changeStatus(id) {
    return axios.request({
            url: '/api/admin/book/' + id,
            method: 'patch'
        })
}