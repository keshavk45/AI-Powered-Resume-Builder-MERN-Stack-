import { Briefcase, Sparkles, Trash2, Plus, Loader2, Calendar } from 'lucide-react';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import api from '../configs/api.js';
import { useSelector } from 'react-redux';

const ExperienceForm = ({ data, onChange }) => {
  const { token } = useSelector((state) => state.auth);
  const [generatingIndex, setGeneratingIndex] = useState(null);
  const addExperience = () => {
    const newExperience = {
      company: '',
      position: '',
      start_date: '',
      end_date: '',
      description: '',
      is_current: false,
    };
    onChange([...data, newExperience]);
  };

  const removeExperience = (index) => {
    const updated = data.filter((_, i) => i !== index);
    onChange(updated);
  };

  const updateExperience = (index, field, value) => {
    const updated = [...data];
    updated[index] = { ...updated[index], [field]: value };
    onChange(updated);
  };

  const generateDescription = async (index) => {
    setGeneratingIndex(index);
    const experience = data[index];
    const prompt = `enhance this job description ${experience.description} for the position of ${experience.position} at ${experience.company}`;
    // AI description generation logic can be added here
    try {

      const { data } = await api.post('/api/ai/enhance-job-desc', { userContent: prompt }, { headers: { Authorization: token } });
      updateExperience(index, 'description', data.enhancedContent);
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message);
    } finally {
      setGeneratingIndex(null);
    }


  }

  return (
    <div className="space-y-6">
      <div>
        <div className="flex items-center justify-between">
          <div>
            <h3 className="flex items-center gap-2 text-lg font-semibold">
              Professional Experience
            </h3>
            <p className="text-sm text-gray-500">Add your job Experience</p>
          </div>
          <button
            onClick={addExperience}
            className="flex items-center gap-2 px-3 py-1 text-sm bg-purple-100 text-purple-700 rounded hover:bg-purple-200 transition-colors"
          >
            <Plus className="w-4 h-4" />
            Add Experience
          </button>
        </div>

        {data.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <Briefcase className="w-12 h-12 mx-auto mb-3 text-gray-300" />
            <p>No work experience added yet</p>
            <p className="text-sm">Click "Add Experience" to get started</p>
          </div>
        ) : (
          <div className="space-y-4">
            {data.map((experience, index) => (
              <div
                key={index}
                className="p-4 border border-gray-200 rounded-lg space-y-3"
              >
                <div className="flex justify-between items-start">
                  <h4>Experience #{index + 1}</h4>
                  <button
                    className="text-red-500 hover:text-red-700 transition-colors"
                    onClick={() => removeExperience(index)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                <div className="grid md:grid-cols-2 gap-3">
                  <input
                    type="text"
                    placeholder="Company Name"
                    value={experience.company || ''}
                    onChange={(e) =>
                      updateExperience(index, 'company', e.target.value)
                    }
                    className="px-3 py-2 text-sm rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
                  />

                  <input
                    type="text"
                    placeholder="Job title"
                    value={experience.position || ''}
                    onChange={(e) =>
                      updateExperience(index, 'position', e.target.value)
                    }
                    className="px-3 py-2 text-sm rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
                  />

                  <div className="relative">
                    <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none w-4 h-4" />
                    <input
                      type="month"
                      placeholder="Start Date"
                      value={experience.start_date || ''}
                      onChange={(e) =>
                        updateExperience(index, 'start_date', e.target.value)
                      }
                      className="w-full px-3 py-2 pr-10 text-sm rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
                    />
                  </div>

                  <div className="relative">
                    <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none w-4 h-4" />
                    <input
                      type="month"
                      placeholder="End Date"
                      value={experience.end_date || ''}
                      onChange={(e) =>
                        updateExperience(index, 'end_date', e.target.value)
                      }
                      disabled={experience.is_current}
                      className="w-full px-3 py-2 pr-10 text-sm rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none disabled:bg-gray-100 disabled:cursor-not-allowed"
                    />
                  </div>
                </div>

                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={experience.is_current || false}
                    onChange={(e) =>
                      updateExperience(index, 'is_current', e.target.checked)
                    }
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-700">
                    Currently working here
                  </span>
                </label>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="flex items-center gap-1 px-2 py-1 text-xs bg-purple-100 text-purple-700 rounded hover:bg-purple-200 transition-colors disabled:opacity-50">
                      Job Description
                    </label>
                    <button onClick={() => generateDescription(index)} disabled={generatingIndex === index || !experience.position || !experience.company} className='flex items-center gap-2 px-3 py-1 text-sm bg-purple-100 text-purple-700 rounded hover:bg-purple-200 transition-colors '>
                      {generatingIndex === index ? (<Loader2 className="size-4 animate-spin" />) : (
                      <Sparkles className="size-4"  />
                      )}
                      Enhance with AI
                    </button>
                  </div>
                  <textarea
                    value={experience.description || ''}
                    onChange={(e) =>
                      updateExperience(index, 'description', e.target.value)
                    }
                    rows={4}
                    className="w-full text-sm px-3 py-2 rounded-lg resize-none"
                    placeholder="Describe your key Responsibilities and achievements..."
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ExperienceForm;
