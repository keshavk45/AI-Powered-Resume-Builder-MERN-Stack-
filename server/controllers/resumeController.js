

// controller for creating a new resume
// POST: /api/resumes/create

export const createResume = async(req , res) => {
    try
    {
        const userId = req.userId;

    } catch(error) {
        return res.status(400).json({message: error.message})
    }
}