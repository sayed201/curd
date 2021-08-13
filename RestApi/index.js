const Joi = require('joi')

const express = require('express')

const app = express();

app.use(express.json())

const courses = [
    { id: 1, name: 'coursesq1' },
    { id: 2, name: 'coursesq2' },
    { id: 3, name: 'coursesq3' }
]

app.get('/', (req, res) => {
    res.send('Hello World');
})

// app.get('/api/courses', (req, res) => {
//     res.send([1, 2, 3])
// })

app.get('/api/courses', (req, res) => {
    res.send(courses)
})

app.post('/api/courses', (req, res) => {
    const { error } = validateCourse(req.body)  //result.error
    if (error) {
        res.status(400).send(error.details[0].message)
        return;
    }

    const course = {
        id: courses.length + 1,
        name: req.body.name
    }
    courses.push(course)
    res.send(course)
})

app.put('/api/courses/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id))
    if (!course) res.status(404).send('id is not found')
    // const result = validateCourse(req.body)

    const {error} = validateCourse(req.body)  //result.error
    if (error) {
        res.status(400).send(error.details[0].message)
        return;
    }
    course.name = req.body.name
    res.send(course)
})

function validateCourse(course){
    const schema = {
        name: Joi.string().min(3).required()
    };
    return  Joi.validate(course, schema)
}


app.delete('/api/courses/:id',(req,res)=>{
    const course = courses.find(c => c.id === parseInt(req.params.id))
    if (!course) res.status(404).send('id is not found')

    const index = courses.indexOf(course)
    courses.splice(index, 1)
    res.send(course)
})

app.get('/api/courses/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id))
    if (!course) res.status(404).send('id is not found')
    res.send(course)
})

//PORT 
const port = process.env.PORT || 3000
app.listen(port, () => console.log(`Listening on port ${port}...`));