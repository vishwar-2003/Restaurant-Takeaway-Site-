const express = require("express");
const mongoDbConnect = require("./dbConn/mongoDbConn");
const itemRouter = require("./routes/menuRoutes");
const cors = require('cors');



//rest object
const app = express();

app.use(cors());

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

app.get("/api/menu/items", itemRouter)
app.post("/api/menu/items", itemRouter)

//PORT
const PORT = process.env.PORT || 5000;

//listen
app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
