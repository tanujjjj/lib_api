const express = require('express');
const cors = require('cors');
const app = express(),
      bodyParser = require("body-parser");
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

const tasks=[
    {
        "ISBN": "789",
        "title": "blah",
        "description": "Rest API",
        "publisher": "lala",
        "status": "available",
        "borrowerId": "5",
        "borrowDate": "04/02/2022",
        "returnDate": "09/02/2022"
      },
];

app.use(cors());

// Configuring body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument,));

app.get('/books', (req, res) => {
    console.log('api/books called!');
    res.json(tasks);
});

app.post('/books', (req, res) =>  {
    const book=req.body;
    console.log(book);
    tasks.push(book);
    
    res.json(tasks);

});

app.get('/books/:id', (req,res)=> {
    console.log("Id to print:::::", req.params.id)
    var task = tasks.filter(task => task.id == req.params.isbn);
    res.json(task);
});

app.put('/books/:id/borrowBook', (req, res) => {
    const x=req.params.id;
    console.log("Borrow book", x);
    const abc=tasks.find(item => item.ISBN=="789");
    
    const task=req.body;
    console.log(task);
    if(abc['status']=='available'){
        abc['status']='unavailable';
        abc['borrowerId']=task['borrowerId'];
        abc['borrowDate']=task['borrowDate'];
        abc['returnDate']=task['returnDate'];
        tasks[tasks.indexOf(abc)]=abc;
        console.log("book borrowed succefully")
        //console.log("hiiii");
    }
    else{
        console.log("Book is unavailable");
    }
    res.json(tasks);


    
    //console.log(tasks['isbn']);
})

app.put('/books/:id/returnBook', (req, res) => {
    const x=req.params.id;
    console.log("Borrow book", x);
    const abc=tasks.find(item => item.ISBN=="789");
    
    const task=req.body;
    console.log(task);
    if(abc['status']=='available'){
        abc['status']='available';
        abc['borrowerId']=NaN;
        abc['borrowDate']=NaN;
        abc['returnDate']=NaN;
        tasks[tasks.indexOf(abc)]=abc;
        console.log("book returned succefully")
        //console.log("hiiii");
    }
    else{
        console.log("error");
    }
    res.json(tasks);


    
    //console.log(tasks['isbn']);
});




/*
const swaggerOptions={
    swaggerDefinition: {
        info: {
           title: 'Library API',
           version:'1.0.0', 
        }
    },
    apis: ['app.js'],
};

//const swaggerDocs= swaggerJsDoc(swaggerOptions);
//console.log(swaggerDocs);
//app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocs));

app.get('/books', (req, res) =>{
    res.send([
        {
            id:1,
            title:"harry potter",
        }
    ])

});

app.post('/books', (req, res)=> {
    res.status(201).send()
})
*/
app.listen(5000, () => console.log("listening to port 5000"))
