import { useRef, useState } from "react";

function ChangePassword(){
    const [isRignht,setIsWrong] = useState(true);
    const [confirm,setConfirm] = useState(true);
    const currentPassword = useRef(null);
    const confirmPassword=  useRef(null);
    const newPassword = useRef(null);
    const inputStyles = {
        border:"1px solid black",
        borderRadius:"11px",
        padding:"10px"
    }

    function changePassword(){
        const current  = currentPassword.current.value;
        const confirm = confirmPassword.current.value;
        const newPas = newPassword.current.value;
        if(current!=confirm){
            setConfirm(false);
            return;
        }
        else{
            alert("Password changed successfully")
        }
    }
        return (
           <>
            {isRignht==false?"Incorrect password":""}
          
            <div>
                <div style={{display:"flex",flexDirection:"column", height:"250px",alignItems:"center",
                        justifyContent:"space-between",marginTop:"50px",marginBottom:"300px",border:''}}>
                  <p style={{color:"red"}}>{confirm===false?"enter password correctly":""}</p>
                    <input style={inputStyles} ref={currentPassword} type="text" placeholder="Enter your current password" />
                    <input style={inputStyles} ref={confirmPassword} type="text" placeholder="Enter your new password" />
                    <input style={inputStyles} ref={newPassword} type="text" placeholder="Confirm your current password"></input>
                    <button style={{...inputStyles,backgroundColor:"#85c1e9",font:"white"}}  onClick={changePassword}>Change password</button>
                </div>
               
            </div>
            </>
        )
}


export default ChangePassword;