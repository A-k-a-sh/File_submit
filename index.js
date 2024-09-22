const express  = require('express');
const app = express();
const port = 3000;
const multer = require('multer');
const path = require('path');

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));  // Set views directory

app.use(express.urlencoded({ extended: true }));

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

app.use(express.static(path.join(__dirname, 'public')));

app.listen(port, () => {
  console.log(`App started at port ${port}`);
});

app.get('/', (req, res) => {
  res.send('Go to  : <a href="/form"> form</a>');
});

app.get('/form', (req, res) => {
  res.render('form.ejs');
});

app.post('/form-submit', upload.array('media'), (req, res) => {
  console.log(req.files);  // Updated to req.files for array uploads
  console.log(req.body);
  res.send('Hello there');
});

app.get('*', (req, res) => {
  res.send('not found');
});
