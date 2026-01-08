import Resume from "../models/Resume.js";
import { generateText } from "../config/ai.js";

// controller for enhancing a resume's professional summary
// POST: /api/ai/enhance-pro-sum



export const enhanceProfessionalSummary = async (req , res) =>{
    try{
        const { userContent } = req.body;

        if(!userContent){
            return res.status(400).json({message : 'Missing required fields'})
        }

        const systemPrompt = "You are an expert in resume writing. Enhance this professional summary to be 1-2 compelling sentences highlighting key skills and career objectives. Return only the enhanced text.";
        const fullPrompt = `${systemPrompt}\n\nSummary to enhance: ${userContent}`;
        
        const enhancedContent = await generateText(fullPrompt);
        return res.status(200).json({enhancedContent})
    } catch (error){
        console.error(error);
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
        
        const systemPrompt = "You are an expert in resume writing. Enhance this job description to highlight achievements and impact. Make it compelling and ATS-friendly. Return only the enhanced text.";
        const fullPrompt = `${systemPrompt}\n\nJob description to enhance: ${userContent}`;
        
        const enhancedContent = await generateText(fullPrompt);
        return res.status(200).json({enhancedContent})
    } catch (error){
        console.error(error);
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

        const extractPrompt = `Extract structured data from this resume and return ONLY valid JSON:

${resumeText}

Return this exact JSON structure (use empty strings/arrays if data is missing):
{
  "professional_summary": "",
  "skills": [],
  "personal_info": {
    "full_name": "",
    "profession": "",
    "email": "",
    "phone": "",
    "location": "",
    "linkedin": "",
    "website": ""
  },
  "experience": [
    {
      "company": "",
      "position": "",
      "start_date": "",
      "end_date": "",
      "description": "",
      "is_current": false
    }
  ],
  "project": [
    {
      "name": "",
      "type": "",
      "description": ""
    }
  ],
  "education": [
    {
      "institution": "",
      "degree": "",
      "field": "",
      "graduation_date": "",
      "gpa": ""
    }
  ]
}`;
        
        const responseText = await generateText(extractPrompt);
        
        // Extract JSON from response (in case there's extra text)
        const jsonMatch = responseText.match(/\{[\s\S]*\}/);
        if (!jsonMatch) {
            return res.status(400).json({message: 'Failed to extract valid JSON from resume'})
        }
        
        const parsedData = JSON.parse(jsonMatch[0]);
        const newResume = await Resume.create({
            userId,
            title,
            ...parsedData
        })
        
        return res.status(200).json({resume: newResume, message: 'Resume uploaded successfully'})
    } catch (error){
        console.error(error);
        return res.status(400).json({message: error.message})
    }
}

