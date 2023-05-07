import axios from "axios";

//列出当前用户的书单
export  function getUserBookList(){
    return axios.get("/api/book_list")
}

export  function getBookListInfo(id){
    return axios.get("/api/book_list/detail/"+id)
}


//更新单个书单信息
export  function updateUserBookList(data){
    return axios.put("/api/book_list",data)
}

//创建书单
export  function createUserBookList(data){
    return axios.post("/api/book_list",data)
}

//删除书单
export  function deleteUserBookList(id){
    return axios.delete("/api/book_list/"+id)
}

//返回书单包含的书籍
export  function listBookInBookList(bookListId){
    return axios.get("/api/book_list/"+bookListId)
}

//为书单添加图书
export  function addBook2BookList(bookListId,bookId){
    return axios.post("/api/book_list/"+bookListId+'/'+bookId)
}

//删除书单中的书
export  function deleteBookInBookList(bookListId,bookId){
    return axios.delete("/api/book_list/"+bookListId+'/'+bookId)
}


//获取所有公开的书单列表
export  function getAllPublishedBookList(){
    return axios.get("/api/book_list/select")
}

