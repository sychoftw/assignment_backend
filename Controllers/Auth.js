const { PrismaClient } = require("@prisma/client");
const jwt = require("jsonwebtoken");
require('dotenv').config();

const prisma = new PrismaClient();

function login(req, res) {

    console.log("inside login")
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(403).send({
            success: false,
            message: "All the fields are required"
        });
    }
    console.log(process.env.ADMINS_USERNAME)

    if(username!=process.env.ADMINS_USERNAME || password!=process.env.ADMINS_PASSWORD){
         return res.status(400).send({
            success: false,
            message: "credentials are not valid"
        });
    }

   const token = jwt.sign(
        { username:username, },
        process.env.JWT_SECRET,
        {
          expiresIn: "24h",
        }
    )

    return res.status(200).json({
        success: true,
        message: "Logged in",
        token
    });
}
async function createEmploy(req,res){
    const {name,email,mobileNo,designation,gender,course}=req.body;

    const image = req.file; 
    if (!image) {
    return res.status(400).json({ message: "Image is required " });
    }


    const user=await prisma.t_Employee.findFirst({
        where:{email}
    })
    if(user){
       return  res.status(400).json({
            message:"user already exist"
        })
    }

    await prisma.t_Employee.create({
        data:{
            name,
        email,
        mobileNo,
        Designation:designation,
        Gender:gender,
        Course:course,
        image:image.filename

        }
        
    })
    return res.status(200).json({
        success:true,
        message:"employer created success fully"
    })
    
}

async function getEmploys(req, res) {
  try {
    const users = await prisma.t_Employee.findMany();

    return res.status(200).json({
      success: true,
      message: "Employers fetched successfully",
      users,
    });
  } catch (error) {
   
    return res.status(500).json({
      success: false,
      message: "Failed to fetch employers",
      
    });
  }
}
async function getEmployse(req, res) {
  try {
    const { id } = req.params;
    console.log("id----server", id);

    const users = await prisma.t_Employee.findFirst({
      where: {
        id: id, // 👈 id is already a string
      },
    });

    if (!users) {
      return res.status(400).json({
        message: "No user found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Employer fetched successfully",
      users,
    });
  } catch (error) {
    console.error("Error fetching employee:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch employer",
    });
  }
}

async function deleteEmploye(req, res) {
  console.log("inside delete");
  try {
    const { id } = req.params;
    console.log("Deleting employee with id:", id);

    const deletedUser = await prisma.t_Employee.delete({
      where: {
        id: id,  // assuming id is string in your Prisma schema
      },
    });

    console.log("Deleted user:", deletedUser);

    const updatedUsers = await prisma.t_Employee.findMany();

    return res.status(200).json({
      success: true,
      message: "Employer deleted",
      updatedUsers,
    });
  } catch (error) {
    console.error("Delete failed:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to delete",
      error: error.message,  // send error message for debugging
    });
  }
}
async function updateEmploye(req, res) {
  try {
    const { id } = req.params;
    
    
    const fields = {
      name: req.body.name,
      email: req.body.email,
      mobileNo: req.body.mobileNo,
      Designation: req.body.designation,
      Gender: req.body.gender,
      Course: req.body.course,
      image: req.file ? req.file.filename : undefined
    };

   
    const dataToUpdate = Object.fromEntries(
      Object.entries(fields).filter(([_, v]) => v != null)
    );


    if (Object.keys(dataToUpdate).length === 0) {
      return res.status(400).json({
        success: false,
        message: "no updates done",
      });
    }

    const updatedEmployee = await prisma.t_Employee.update({
      where: { id },
      data: dataToUpdate,
    });

    return res.status(200).json({
      success: true,
      message: "Employee updated successfully",
      employee: updatedEmployee,
    });
  } catch (error) {
    console.error("Update failed:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to update employee",
      error: error.message,
    });
  }
}


module.exports = {login,createEmploy,getEmploys,deleteEmploye,updateEmploye,getEmployse};

