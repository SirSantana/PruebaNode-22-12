import express, { response } from "express";
import cors from 'cors'


const app = express();
app.use(express.json());
app.use(cors())


let notes = [
  {
    id: 1,
    content: "HTML is easy",
    date: "2019-05-30T17:30:31.098Z",
    important: true,
  },
  {
    id: 2,
    content: "Browser can execute only Javascript",
    date: "2019-05-30T18:39:34.091Z",
    important: false,
  },
  {
    id: 3,
    content: "GET and POST are the most important methods of HTTP protocol",
    date: "2019-05-30T19:20:14.298Z",
    important: true,
  },
];

app.get("/", (req, res) => {
  res.send("<h2>Bienvenidos</h2>");
});
app.get("/api/notes", (req, res) => {
  res.json(notes);
});
app.get("/api/notes/:id", (req, res) => {
  const id = req.params.id;
  const note = notes.find((note) => note.id === Number(id));

  if (note) {
    res.json(note);
  } else {
    res.status(404).end();
  }
});
app.delete("api/notes/:id", (req, res) => {
  const { id } = req.params;
  const notes = notes.filter((note) => note.id !== Number(id));

  res.status(204).end();
});
const generateId = () => {
  const maxId = notes.length > 0 ? Math.max(...notes.map((n) => n.id)) : 0;
  return maxId + 1;
};

app.post("/api/notes", (req, res) => {
  const body = req.body;
  const note = {
    content: body.content,
    important: body.important || false,
    data: new Date(),
    id: generateId(),
  };

  notes = notes.concat(note);
  res.json(note);
});




// const persons = [
//   { nombre: "Miguel", number: 3241 - 434, id: 1 },
//   { nombre: "Lorena", number: 7457 - 434, id: 2 },
// ];

// app.get("/api/persons/", (req, res) => {
//   res.json(persons);
// });

// app.get("/api/persons/:id", (req, res)=>{
//     const {id} = req.params
//     const data = persons.find(data=> data.id === Number(id))

//     if(data){
//         res.json(data)
//     }else{
//         res.status(404).end()
//     }
    
// })

// app.get("/info/", (req, res)=>{
    

//     const personss = persons.length
//     const date = new Date()

//     res.send(`<div><h2>Phonebook has info for ${personss} people</h2><h2> ${date} </h2></div>`)

// })
// app.delete("/api/persons/:id", (req, res)=>{
//     const {id} = req.params
//     const person = persons.filter(person=> person.id !== Number(id))
//     res.json(person)
// })

// app.post("/api/persons/", (req, res)=>{
    

//     const person = {
//         number: 131241,
//         nombre: "Miguel",
//         id: Math.ceil(Math.random() * 1000000)
//     }
//     const nombre = persons.find(data=> data.nombre !== person.nombre)

//     if(nombre){
//       return  res.status(404).json({error: 'name must be unique'}).end()
//     }
//     if(!person.nombre ||!person.number){
//        return res.status(404).json({error: "Llena todo"}).end()
//     }else{
//         res.json(person)
//         console.log(nombre);
//     }
    
// })


const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server on PORT ${PORT}`);
});
