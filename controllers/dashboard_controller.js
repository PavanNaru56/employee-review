
//imports the models from the database
const Review = require('../models/review');

const User = require('../models/user');
//creates the admin dashboard when admin was signed

module.exports.adminDashboards = async (req,res) => {
    try{

        console.log(req.user.role);

        if(req.isAuthenticated()){
            if(req.user.role == 'admin'){

                let users = await User.find({}).populate('username');

                let filteredUsers = users.filter(
                    (user) => user.email != req.user.email
                );

                return res.render('admin_dashboard',{
                    title : "Admin Dashboard",
                    users : filteredUsers
                });


            }else{
                return res.redirect('back');
            }
        }else{
            return res.redirect('back');
        }

    }catch(err){

        console.log(err);
        return res.redirect('/');

    }
}

//creates the employee dashboard when employees signed

module.exports.employeeDashboard = async (req,res)=>{
    try{

        if(req.isAuthenticated()){

            const emp_id = req.params.id;

            let reviews = await Review.find({'recipient': emp_id}).populate('reviewer');

            //console.log(reviews[0].reviewer.username);

            if(!reviews){
                res.redirect('back');
            }


            

            res.render('employee_dashboard',{
                title : "employee dashboard",
                reviews : reviews
            })



        }


        

    }catch(err){

        console.log(err);
        return res.redirect('back');

    }
}