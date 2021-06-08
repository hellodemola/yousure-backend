
const { getUsers, getUsersById, addUser }= require('../queries/user');


const getAllUsers = async (req, res, next) => {
    getUsers((err, result) => {
        if (err) {
            throw err;
        }
        console.log(result.rows);
        res.status(200).json({
          users: result.rows
         })
    })
   
}

const getUserByEmail = async (req, res, next) => {
    const email = req.query.email;
    console.log(email, '-----email')
    getUsersById(email, (err, result) => {
        if (err){
            throw err;
        }
        console.log(result.rows);
        if (result.rows.length > 0){
            res.status(200).json({
                users: result.rows[0],
                message: 'User found'
            })
        }else{
            res.status(404).json({
                message: 'user not found!'
            })
        }
       
    }); 
}

const addNewUser = async (req, res, next) => {
    const request =  req.body
    const {
        name,
        password,
        email, 
        phone,
        role
    } = {...request}
    addUser(name, password, email, phone, role, (err, result) =>{
        if (err){
            res.status(500).send(err)
        }
        if (result){
            res.status(200).json({
                message: `${name} added successfully`
            })
        }
 
    })
}




module.exports = {
    getAllUsers,
    getUserByEmail,
    addNewUser
};