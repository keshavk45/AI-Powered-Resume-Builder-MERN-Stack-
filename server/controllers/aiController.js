import Resume from "../models/Resume.js";

// controller for enhancing a resume's professional summary
// POST: /api/ai/enhance-pro-sum



export const enhanceProfessionalSummary = async (req , res) =>{
    try{
        const { userContent } = req.body;

        if(!userContent){
            return res.status(400).json({message : 'Missing required fields'})

        }
        const response = await openai.chat.completions.create({
            model: process.env.OPENAI_MODEL,
            messages: [
        { role: "system", content: "You are an expert in resume writing. Your task is to enhance the professional summary of a resume. The summary should be 1-2 sentences also highlighting key skills, experience, and career objectives. Make it compelling and ATS-friendly. and only return text no options or anything else." },
        {
            role: "user",
            content: userContent,
        },
    ],
        })

        const enhancedContent = response.choices[0].message.content
        return res.status(200).json({enhancedContent})
    }    catch (error){
        return res.status(400).json({message: error.message})
        }
    }

    //controller for enhancing a resume's job description
// POST: /api/ai/enhance-job-desc

export const enhanceJobDescription = async (req , res) =>{
    try{
        const { userContent } = req.body;

        if(!userContent){
            return res.status(400).json({message : 'Missing required fields'})

        }
        const response = await openai.chat.completions.create({
            model: process.env.OPENAI_MODEL,
            messages: [
        { role: "system", 
            content: "You are an expert in resume writing. Your task is to enhance the job description of a resume. The description should be 1-2 sentences also highlighting key skills, experience, and career objectives. Make it compelling and ATS-friendly. and only return text no options or anything else." },
        {
            role: "user",
            content: userContent,
        },
    ],
        })

        const enhancedContent = response.choices[0].message.content
        return res.status(200).json({enhancedContent})
    }    catch (error){
        return res.status(400).json({message: error.message})
        }
    }

    //controller for uploading a resume to the database
// POST: /api/ai/upload-resume

export const uploadResume = async (req , res) =>{
    try{
        
        const {resumeText , title} = req.body;
        const userId = req.userId;

        if(!resumeText){
            return res.status(400).json({message : 'Missing required fields'})
        }

        const systemPrompt = "You are an expert AI Agent to extract data from resume"
        const userPrompt = `Extract data from this resume: ${resumeText}`
        const response = await openai.chat.completions.create({
            model: process.env.OPENAI_MODEL,
            messages: [
        { role: "system", 
            content: systemPrompt },
        {
            role: "user",
            content: userPrompt,
        },
    ],
    response_format: {type : "json_object" },
        })

        const extractedData = response.choices[0].message.content;
        const parsedData = JSON.parse(extractedData);
        const newResume = await Resume.create({
            userId,
            title,
            ...parsedData
        })
        res.json({resumeId: newResume._id})

        const enhancedContent = response.choices[0].message.content
        return res.status(200).json({enhancedContent})
    }    catch (error){
        return res.status(400).json({message: error.message})
        }
    }

