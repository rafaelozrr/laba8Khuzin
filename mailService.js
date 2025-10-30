import nodemailer from 'nodemailer';

class mailService{
    constructor(){
        this.transporter = nodemailer.createTransport({
            host:process.env.MAIL_HOST,
            port:process.env.MAIL_PORT,
            secure: true,
            auth:{
                user:process.env.MAIL_USER,
                pass:process.env.MAIL_PASSWORD
            }

        })
            
    }

    async sendActivationLink(address,link){
        await this.transporter.sendMail({
            from:process.env.MAIL_USER,
            to: address,
            subject:'Активация учетной записи',
            text:'',
            html:`
            <div>
                <p>Для активации учетной записи пройдите по ссылке </p>
                <a href="${link}">${link}</a>
            </div>
            `
        })
    }
}



export default new mailService();