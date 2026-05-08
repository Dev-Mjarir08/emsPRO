import express from 'express'
import envConfig from './config/dotenv.js'
import db from './config/db.js'
import router from './routes/index.js'


const app = express()
const PORT= envConfig.PORT || 3000

app.set('view engine','ejs')
app.use(express.static('public'));
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(router)

app.listen(PORT,(error)=>{
    if(error){
        console.log(eror);
    }
    else{
        console.log('Server Started');
        console.log(`https://localhost: ${PORT}`);
    }
})