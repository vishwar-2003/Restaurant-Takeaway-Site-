const express = require("express");
const mongoDbConnect = require("./dbConn/mongoDbConn");
const itemRouter = require("./routes/items")

//rest object
const app = express();

//middlewares
app.use(express.json());

mongoDbConnect();

app.get("/", (req, res) => {
  return res
    .status(200)
    .send({
        "message" : "success"
    });
});

app.get("/items", itemRouter)
app.post("/items", itemRouter)

//PORT
const PORT = process.env.PORT || 5000;

//listen
app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
