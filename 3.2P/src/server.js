var express = require("express")
var app = express()
var port = process.env.port || 3000;

app.use(express.static(__dirname+'/public'))
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const cardList = [
    {
        title: "Monstera Deliciosa",
        image: "https://images.unsplash.com/photo-1614594975525-e45190c55d0b?auto=format&fit=crop&w=600&q=80",
        link: "About Monstera",
        desciption: "Monstera deliciosa, the Swiss cheese plant, is a species of flowering plant native to tropical forests of southern Mexico, south to Panama."
    },
    {
        title: "Fiddle Leaf Fig",
        image: "https://images.unsplash.com/photo-1545241047-6083a3684587?auto=format&fit=crop&w=600&q=80",
        link: "About Fiddle Leaf",
        desciption: "Ficus lyrata, commonly known as the fiddle-leaf fig, is a species of flowering plant in the mulberry and fig family Moraceae."
    },
    {
        title: "Snake Plant",
        image: "https://images.unsplash.com/photo-1598880940080-ff9a29891b85?auto=format&fit=crop&w=600&q=80",
        link: "About Snake Plant",
        desciption: "Dracaena trifasciata is a species of flowering plant in the family Asparagaceae, native to tropical West Africa from Nigeria east to the Congo."
    }
]

app.get('/api/plants', (req,res) => {
    res.json({statusCode: 200, data: cardList, message:"Success"})
})

app.listen(port,()=>{
    console.log("App listening to: "+port)
})