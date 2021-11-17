


  import { Msgbox, Message } from 'element3'


     export const openMsgbox=(info)=> {
      console.log(info);
      
      Msgbox
            .confirm(info.msg, '', {
              confirmButtonText: info.yes,
              cancelButtonText:info.cancel,
              showClose:false,
              showCancelButton:Boolean(info.cancel),
              customClass:"myBox",
              confirmButtonClass:info.cancel?'yes':"sure",
              cancelButtonClass:"cancel",
              callback:(action)=>{
                console.log("1234");
                console.log(action);
                if(action==="confirm"){
                  info.yesFn()
                }else{
                  info.cancelFn()
                }
                
                
              }
            })
           
        }
   
