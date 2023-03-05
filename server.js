const { urlencoded } = require('express')
const express = require('express')
const app = express()
const path = require('path')
 require('./model/connection')
const Jokes = require('./model/database')

const port = process.env.PORT || 8000 ;
// localStorage.setItem('myport', port )
// const filePath = path.join(__dirname, './') 
app.use(express.json()) ;
app.set('view engine','hbs')
app.use( express.urlencoded({extended: false}))

app.get('/jokes',(req,res)=>{
    res.render('index') ;
})

app.post('/jokes', async(req,res)=>{
try{
    const registerJoke = new Jokes({
        name : req.body.name ,
        email : req.body.email,
        joke : req.body.joke 
    })

  const result =  await registerJoke.save();
//   res.status(200).send(result);
   console.log(result);
}
catch(err){
    res.status(500).send(err);
}
})

app.get('/jokesgetData', async(req,res)=>{
    try{


            const data = await Jokes.find();
            const len = data.length ;
            const randomIndex = Math.floor(Math.random()*len) ;
            console.log(randomIndex);
            // res.send(data[randomIndex])      ; 
              obj =  data[randomIndex] ;
          
              
            res.render('random',{
                name: obj.name,
                email : obj.email,
                joke : obj.joke,
                ID : obj._id 
            });

    }
    catch(err)
    {
        res.status(500).send()
    }
})


app.get('/updatejoke/:id',(req,res)=>{

    console.log("hi there", req.params.id);
    res.render('update',{
        ID :req.params.id 
    }) ;
})

const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));

app.post('/updatejoke/:id', async (req, res) => {
    try {
      const newJoke = req.body.joke;
      console.log(req.params.id, req.body);
      const updateOps = {
        $set: {
          joke: newJoke
        }
      };

      console.log(updateOps);
      const result = await Jokes.findByIdAndUpdate(req.params.id, updateOps);
      console.log( "expected :" + result);
      res.redirect("http://localhost:8000/jokesgetData")
    } catch (err) {
      res.status(500).send("Some error occurred: " + err);
    }
  });


  app.get('/delete/:id',async (req,res)=>{

    try{
      const result = await Jokes.findByIdAndDelete({_id : req.params.id}) ;
      console.log(result);

      res.redirect("http://localhost:8000/jokesgetData")
    }
    catch (err) {
      res.status(500).send("Some error occurred: " + err);
    }



})




app.listen(port,(err)=>
{
    if(err)
    console.log(`Error received : ${err}`);
    else
    {
       console.log(`Listening at port : ${port}`) ;
    }
}
)