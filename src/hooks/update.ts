import { obsCheckRunning } from '@/scripts/obsutils'


export  const UpdateObs =(info,callback)=>  {
 
  console.log("22");
  console.log(info);
  obsCheckRunning().then(res=>{
    console.log(res);
      if(!res){
        let  obs = {
        id:  info.id,
        version: info.version,
        downloadLink: info.downloadLinks,
        hasEcternalFile: false,
        script: false,
        }
        window.obsPluginUpdate(JSON.stringify(obs)).then(res=>{
          console.log(res);
          console.log("gengxinobsPluginUpdate");
          callback(res)
          
        })
      }
    
  })  
 
}