const User = require("../models/user");
const Review = require("../models/review");
//sends the review to the particula employess whose admin wants to send
module.exports.submitReview = async (req,res) => {
    console.log(req.user.username);
    console.log(req.params.id);
    console.log(req.body.feedback);
    try{
        const feedback = req.body.feedback;
        const recipient = await User.findById(req.params.id);
        const reviewer = await User.findById(req.user.id);


        const review = await Review.create({
            'review' : feedback,
            'recipient' : recipient,
            'reviewer' : reviewer
        });

        




        return res.redirect('back');



    }
    catch(err){
        console.log('error', err);



    }

}
//after the employee receives the review he can know the review and deletes the review
module.exports.doneReview = async (req,res) => {
    try{

        const review_id = req.params.id;

        await Review.findByIdAndRemove(review_id);

        return res.redirect(`back`);

    }catch(err){
        console.log(err);
        return res.redirect(`back`);
    }
}