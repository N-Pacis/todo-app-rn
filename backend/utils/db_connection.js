import { connect } from 'mongoose';
import { config } from 'dotenv';
config({path:'./.env'});

connect(process.env.DB_CONNECTION_LINK,{
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(()=>console.log("Connected to database successfully"))
.catch(err=>console.log(err))
