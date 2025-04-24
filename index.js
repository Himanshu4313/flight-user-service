const app = require('./src/app');
const dotenv = require('dotenv');
dotenv.config();


const PORT = process.env.PORT || 2000 ;

app.listen(PORT , () => {
    console.log(`User Server is runing at PORT ${PORT}`);
});

