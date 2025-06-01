const express = require('express');
const app = express();
const PORT = 3000;
const {login,createEmploy, getEmploys, deleteEmploye, updateEmploye, getEmployse}=require("./Controllers/Auth")
const upload = require("./middleware/multerConfig");
const path = require("path");
const authMiddleware = require('./middleware/authMiddleware');
const router = express.Router();
const cors = require("cors");

app.use(express.json())
app.use(cors());


app.use("/uploads", express.static(path.join(__dirname, "uploads")));
router.post('/login', login)
router.post("/create-employ",authMiddleware, upload.single("image"), createEmploy);
router.get("/get-employes",authMiddleware,getEmploys)
router.delete("/delete/:id",authMiddleware,deleteEmploye)
router.put("/edit/:id",authMiddleware, upload.single("image"),updateEmploye)
router.get("/get-emplpoye/:id",authMiddleware,upload.single("image"),getEmployse)

app.use(router);
app.get("/",(req,res)=>{
     res.json({
        Message:"this is the home page"
    })
})


app.listen(PORT, function (err) {
    if (err) console.log(err);
    console.log("Server listening on PORT", PORT);
});