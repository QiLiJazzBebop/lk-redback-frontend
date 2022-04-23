export function connectBackends(url)
{
    return new Promise((resolve,reject)=>{
        fetch(url,
        {
            method: "POST",
            headers:
            {
                'Accept': "application/json",
                "Content-Type": "application/json, charset=UTF-8",
                "Access-Control-Allow-Origin": "*",
                'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token',
                'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS'
            },
            credentials: "include",
            mode: "cors",
        })
        .then((res) => res.json())
        .then((jsondata)=>{
            console.log(jsondata)
            resolve(jsondata)
        })
        .catch((error)=>{
            console.error(error);
            reject("rejected")
        })
    })
}
