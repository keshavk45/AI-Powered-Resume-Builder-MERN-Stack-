import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { dummyResumeData } from "../assets/assets";
import { Loader , ArrowLeftIcon } from "lucide-react";

// Assuming ResumePreview is defined elsewhere or you have the component structure

const Preview = () => { // Renamed to 'Preview' to follow PascalCase convention
  const { resumeId} = useParams()

  const[isLoading , setIsLoading] = useState(true) // Start loading

  const [resumeData , setResumeData] = useState(null)

  const loadResume = async() =>{
    // Optional: Simulate network delay (remove if unnecessary)
    await new Promise(resolve => setTimeout(resolve, 500)); 

    setResumeData(dummyResumeData.find(resume => resume._id === resumeId) || null)

    // ✅ Stop loading once data has been checked, regardless of the result
    setIsLoading(false) 
  }

  useEffect(() => {
    loadResume()
  } , [resumeId]) // Added resumeId to dependency array for completeness

  return resumeData ? (
    // 1. Resume Found: Display Preview
    <div className="bg-slate-100">
      <div className="max-w-3xl mx-auto py-10">
        {/* You need to ensure 'ResumePreview' component is imported or defined */}
        {/* <ResumePreview data = {resumeData} template = {resumeData.template} accentColor = {resumeData.accent_color} classes="py-4 bg-white"/> */}
        <p>Resume Preview Component (Data Found)</p>

      </div>
    </div>
  ) : (
    // 2. Resume Not Found (Data is null)
    <div>
      {isLoading ? (
        // 2a. Still Loading: Display Loader
        <div className="flex items-center justify-center h-screen">
          <Loader className="animate-spin text-blue-500 size-10"/> 
        </div>
      ) : (
        // 2b. Done Loading AND Resume Not Found: Display Error Message
        <div className="flex flex-col items-center justify-center h-screen">
          <p className="text-center text-6xl text-slate-400 font-medium">Resume Not Found</p>
          <a href="/" className="mt-6 flex items-center text-lg text-green-600 hover:text-green-700 font-medium bg-green-200 py-3 px-6 rounded-md transition-colors">
            <ArrowLeftIcon className = 'mr-2 size-5'/>
            Go to Home page
          </a>
        </div>
      )}
    </div>

  )
}

export default Preview