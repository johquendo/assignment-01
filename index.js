const express = require('express')
const app = express()
const cors = require('cors')

let randomUsers;

try {
    fetch("https://randomuser.me/api/?results=1000")
    .then(response => {
        if (!response.ok) {
            throw new Error("Network Error");
        }
        return response.json();
    }).then(data => {
        randomUsers = data;
        console.log(randomUsers);
    })
} catch (err) {
        alert(err);
} 

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('hello world!');
});

app.get('/api', (req, res) => {
    const amount = req.query.results;

    if (amount) {
        res.json(randomUsers.results.slice(0, amount));
    } else {
        res.json(randomUsers.results[0]);
    }


})

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`${port}`));

