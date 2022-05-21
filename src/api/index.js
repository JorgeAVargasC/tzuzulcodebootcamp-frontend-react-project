import axios from 'axios'

const url = "https://backendnodejstzuzulcode.uw.r.appspot.com"

const instance = axios.create({
    baseURL:url
})

const post = (url,data)=>{
    return instance.post(url,data)
}

const postWithToken = async (url,data)=>{
    const token = localStorage.getItem("token")
    if(token){
        return await instance.post(url,data,{
            headers:{
                'Authorization':"Bearer "+localStorage.getItem("token")
            }
        })
    }

    return {
        data:{
            failed:true,
            message:"No tienes token"
        }
    }

}

const getWithToken = async (url)=>{
    const token = localStorage.getItem("token")
    if(token){
        return await instance.get(url,{
            headers:{
                'Authorization':"Bearer "+localStorage.getItem("token")
            }
        })
    }
}

export default instance

export {post,postWithToken,getWithToken} 