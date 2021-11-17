export const obsPathGet = (params) => {
  let p = new Promise(function (resolve, reject) {
    window.obsPathGet({}, (result) => {
      console.log(result);

      if (result.code === 0) {
        resolve(result.data)
      } else {
        reject(result.message)
      }

    })
  })
  return p
}
import { openMsgbox } from "../components/message/"
export const obsCheckRunning = () => {
  let p = new Promise(function (resolve, reject) {
    window.obsCheckRunning().then(res => {
      if (!res) {
        resolve(res)
      } else {
        openMsgbox({
          title: "xxx",
          msg: "Are you sure you want to close the OBS?",
          yes: "CLOSE",
          cancel: "Cancel",
          yesFn: () => {
            console.log("queding");
            window.obsClose().then(res => {
              reject(res)

            })

          },
          cancelFn: () => {
            console.log("quxiao");
            reject(res)
          }
        })
      }
    })
  })
  return p
}
export const UpdateObs = (info) => {

  console.log("22");
  console.log(info);
  let p = new Promise(function (resolve, reject) {
    obsCheckRunning().then(res => {
      console.log(res);
      if (!res) {
        let obs = {
          id: info.id,
          version: info.version,
          downloadLink: info.downloadLinks,
          hasEcternalFile: false,
          script: false,
        }
        console.log("更新版本号" + info.version);

        window.obsPluginUpdate(JSON.stringify(obs)).then(res => {
          console.log(res);
          console.log("gengxinobsPluginUpdate");
          if(res.code===0){
            resolve(res)
          }else{
            openMsgbox({
              title: "xxx",
              msg: res.message,
              yes: "Got It",
              yesFn: () => {
                console.log("queding");
                reject(res)
              },
              cancelFn: () => {
               
                reject(res)
              },
            });
          }
         

        })
      }else{
        reject(res)
      }

    }).catch(res=>{
      reject(res)
    })
  })
  return p
}


export const RemoveObs = (info)=>{
  console.log("执行删除");
  console.log(info);
  let p = new Promise(function (resolve, reject) {
   
    openMsgbox({
      title: "xxx",
      msg: "Are you sure you want to uninstall the plugin?",
      yes: "Uninstall",
      cancel: "Cancel",
      yesFn: () => {
        console.log("queding");
        obsCheckRunning().then(res => {
          console.log(res);
          if (!res) {
            let obs = {
              id: info.id,
            }
            window.obsPluginRemove(JSON.stringify(obs)).then(res => {
              console.log(res);
              console.log("删除obs回调");
              if(res.code===0){
                resolve(res)
              }else{
                openMsgbox({
                  title: "xxx",
                  msg: res.message,
                  yes: "Got It",
                  yesFn: () => {
                    console.log("queding");
                    reject(res)
                  },
                  cancelFn: () => {
                   
                    reject(res)
                  },
                });
              }
             
            })
          }
    
        })

      },
      cancelFn: () => {
        console.log("quxiao");
       
      }
    })



  
  })
  return p
}