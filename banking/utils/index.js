
import twilio from 'twilio';

function generateotp(){
    let char = "0123456789";
    let otp = ""
    for(let i=0;i<4;i++){
        otp = otp +(Math.floor(Math.random()*char.length))
    }
    return otp;
}



    async function sendsms(otp,phone){
        const accountSid ="ACc40f913afd5ded30e9275346d9d40da7";
        const authToken  = "7b977fbb0b4baca50de316afe41f06a9"
        const client  = twilio(accountSid,authToken)
        let mes = await client.messages
        .create({
            body : `OTP for login is ${otp} Valid Only for 15 min`,
            from:"+13396751795",
            to: phone,
        })
        // console.log(mes.sid)

    }

    function time(){
        var time = new Date();
      return (
          time.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })
        );
    }
    
    
    function date(){
        let date_ob = new Date();
    let date = date_ob.getDate();
    let month = date_ob.getMonth() + 1;
    let year = date_ob.getFullYear();
    
    return (date + "-" + month + "-" + year);
    }

    export {sendsms,generateotp,date,time}