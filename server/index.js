const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const mysql = require('mysql2')
const cors = require('cors')

const db = mysql. createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Teste1234*',
    database: 'cruddatabase',
})

db.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('Connected to MySQL');
});

app.use(express.json())
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());



  app.get("/api/get", (req, res) => {
    const sqlSelect = "SELECT * FROM movie_reviews";    
    db.query(sqlSelect, (err, result) => {
        res.send(result)
    } )
   
  })

  app.post("/api/insert", (req, res) => {

    const movieName = req.body.movieName
    const movieReview = req.body.movieReview
    const sqlInsert = "INSERT INTO movie_reviews (movieName, movieReview) VALUES (?,?)";    
    db.query(sqlInsert, [movieName, movieReview], (err, result) => {
        console.log(result, err)
    } )
});

app.delete('/api/delete/:movieName', (req, res) => {
  const name = req.params.movieName
  const sqlDelete = "DELETE FROM movie_reviews WHERE movieName = ?";
  db.query(sqlDelete, name, (err, result) => {
    if (err) { console.log(err)}
    console.log(result)
} )

})

app.put("/api/update", (req, res) => {
  const name  = req.body.movieName
  const review = req.body.movieReview
  const sqlUpdate = "UPDATE movie_reviews SET movieReview = ? WHERE movieName = ?";
  db.query(sqlUpdate, [review, name], (err, result) => {
    if (err) { console.log(err)}
    console.log(result)
} )
})


app.listen(3001, () => {
   
    console.log("rodando na porta 3001")
}    )