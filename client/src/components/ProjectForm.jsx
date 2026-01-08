import React, { useState } from 'react'
import { GraduationCap , Plus , Trash2, Sparkles, Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';
import api from '../configs/api.js';
import { useSelector } from 'react-redux';


const ProjectForm = ({data , onChange}) => {
  const { token } = useSelector((state) => state.auth);
  const [generatingIndex, setGeneratingIndex] = useState(null);

  const addProject = () => {
    const newProject = {
      name: '',
      type: '',
      description: ''
      
    };
    onChange([...data, newProject ]);
  };

  const removeProject = (index) => {
    const updated = data.filter((_, i) => i !== index);
    onChange(updated);
  };

  const updateProject = (index, field, value) => {
    const updated = [...data];
    updated[index] = { ...updated[index], [field]: value };
    onChange(updated);
  };

  const generateDescription = async (index) => {
    setGeneratingIndex(index);
    const project = data[index];
    const prompt = `Project: ${project.name}\nType: ${project.type}\nDescription: ${project.description}\n\nCreate 1-2 concise, powerful bullet points highlighting the project's impact, technologies used, and key achievements.`;
    try {
      const { data } = await api.post('/api/ai/enhance-project-desc', { userContent: prompt }, { headers: { Authorization: token } });
      updateProject(index, 'description', data.enhancedContent);
      toast.success('Project description enhanced!');
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message);
    } finally {
      setGeneratingIndex(null);
    }
  };
  return (
    <div className="space-y-6">
      <div>
        <div className="flex items-center justify-between">
          <div>
            <h3 className="flex items-center gap-2 text-lg font-semibold text-gray-900">
              Projects
            </h3>
            <p className="text-sm text-gray-500">Add your Project details</p>
          </div>
          <button
            onClick={addProject}
            className="flex items-center gap-2 px-3 py-1 text-sm bg-purple-100 text-purple-700 rounded hover:bg-purple-200 transition-colors"
          >
            <Plus className="w-4 h-4" />
            Add Project
          </button>
        </div>

     
          <div className="space-y-4 mt-6">
            {data.map((Project, index) => (
              <div
                key={index}
                className="p-4 border border-gray-200 rounded-lg space-y-3"
              >
                <div className="flex justify-between items-start">
                  <h4>Project #{index + 1}</h4>
                  <button
                    className="text-red-500 hover:text-red-700 transition-colors"
                    onClick={() => removeProject(index)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                <div className="grid gap-3">
                  <input
                    type="text"
                    placeholder="Project Name"
                    value={Project.name || ''}
                    onChange={(e) =>
                      updateProject(index, 'name', e.target.value)
                    }
                    className="px-3 py-2 text-sm rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none" 
                  />

                   <input
                    type="text"
                    placeholder="Project type"
                    value={Project.type || ''}
                    onChange={(e) =>
                      updateProject(index, 'type', e.target.value)
                    }
                    className="px-3 py-2 text-sm rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none" 
                  />

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <label className="text-xs text-gray-600">
                        Project Description
                      </label>
                      <button 
                        onClick={() => generateDescription(index)} 
                        disabled={generatingIndex === index || !Project.name || !Project.type} 
                        className='flex items-center gap-2 px-3 py-1 text-sm bg-purple-100 text-purple-700 rounded hover:bg-purple-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed'
                      >
                        {generatingIndex === index ? (
                          <Loader2 className="size-4 animate-spin" />
                        ) : (
                          <Sparkles className="size-4" />
                        )}
                        Enhance with AI
                      </button>
                    </div>
                    <textarea
                      rows={4}
                      type="text"
                      placeholder="Describe Your Project"
                      value={Project.description || ''}
                      onChange={(e) =>
                        updateProject(index, 'description', e.target.value)
                      }
                      className="w-full px-3 py-2 text-sm rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none resize-none" 
                    />
                  </div>
                </div>

                
              </div>
            ))}
          </div>
       
      </div>
    </div>
  );
};
  


export default ProjectForm;