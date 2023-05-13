import axios from "axios";

//列出当前用户的书单
export  function getUserBookDownloadHis(){
    return axios.get("/api/book/download/history")
}
