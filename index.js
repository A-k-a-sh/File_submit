const express  = require('express');
const app = express();
const port = 3000;
const multer = require('multer');

const path = require('path');

app.set('view engine' , 'ejs');
app.use(express.urlencoded({extended : true}));

const storage = multer.diskStorage({
    destination : (req , file , cb) =>{
        cb(null , 'uploads');
    },
    filename : (req , file , cb) => {
        cb(null , Date.now() + path.extname(file.originalname));
    }
});
const upload = multer({storage: storage});


//const upload = multer({dest : 'uploads'}); //this single line works but the uploaded file comes without its extension 



app.use(express.static(path.join(__dirname , 'public')));



app.listen(port , () => {
    console.log(`App started at port ${port}`);
})

app.get('/' , (req , res) => {
    //res.send('Hello there'); // only one res.send works
    res.send('Go to  : <a href="/form"> form</a>');
})

app.get('/form' , (req , res) => {
    res.render('form.ejs');
})

//upload.single('media') -> for single media to upload
app.post('/form-submit' , upload.array('media') , (req , res) => {
    console.log(req.file);
    console.log(req.body);
    res.send('Hello there');
})

app.get('*' , (req , res) => {
    res.send('not found');
})
