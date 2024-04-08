//1.Immporting nodemailer
const nodemailer=require("nodemailer");

//2.Making func which contain email,title,body

const mailSender=async(email,title,body)=>{
    try{

        //a.Making transporter
        let transporter=nodemailer.createTransport({
            host:process.env.MAIL_HOST,
            auth:{
                user:process.env.MAIL_USER,
                pass :process.env.MAIL_PASS,
            }

        //B.Make entries of MAIL_HOST,MAIL_USER,MAIL_PASS in .env file 
        })

        //C.Sending the Mail
        let info=await transporter.sendMail({
            from:'StudyNotion ||by Rushi',
            to:`${email}`,
            subject:`${title}`,
            html:`${body}`,
        })
        console.log(info);
        return info;

    }
    catch(error){
        console.log(error.message);
    }
}

//3.exporting
module.exports=mailSender;