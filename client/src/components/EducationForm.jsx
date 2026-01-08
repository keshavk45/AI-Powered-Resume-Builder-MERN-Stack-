import { GraduationCap , Plus , Trash2, Calendar } from 'lucide-react';
import React from 'react'

const EducationForm = ({data , onChange}) => {
  const addEducation = () => {
    const newEducation = {
      institution: '',
      degree: '',
      field: '',
      graduation_date: '',
      gpa: ''
    };
    onChange([...data, newEducation]);
  };

  const removeEducation = (index) => {
    const updated = data.filter((_, i) => i !== index);
    onChange(updated);
  };

  const updateEducation = (index, field, value) => {
    const updated = [...data];
    updated[index] = { ...updated[index], [field]: value };
    onChange(updated);
  };

  return (
    <div className="space-y-6">
      <div>
        <div className="flex items-center justify-between">
          <div>
            <h3 className="flex items-center gap-2 text-lg font-semibold text-gray-900">
              Education
            </h3>
            <p className="text-sm text-gray-500">Add your Education details</p>
          </div>
          <button
            onClick={addEducation}
            className="flex items-center gap-2 px-3 py-1 text-sm bg-purple-100 text-purple-700 rounded hover:bg-purple-200 transition-colors"
          >
            <Plus className="w-4 h-4" />
            Add Education
          </button>
        </div>

        {data.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <GraduationCap className="w-12 h-12 mx-auto mb-3 text-gray-300" />
            <p>No Education added yet</p>
            <p className="text-sm">Click "Add Education" to get started</p>
          </div>
        ) : (
          <div className="space-y-4">
            {data.map((Education, index) => (
              <div
                key={index}
                className="p-4 border border-gray-200 rounded-lg space-y-3"
              >
                <div className="flex justify-between items-start">
                  <h4>Education #{index + 1}</h4>
                  <button
                    className="text-red-500 hover:text-red-700 transition-colors"
                    onClick={() => removeEducation(index)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                <div className="grid md:grid-cols-2 gap-3">
                  <input
                    type="text"
                    placeholder="Institution Name"
                    value={Education.institution || ''}
                    onChange={(e) =>
                      updateEducation(index, 'institution', e.target.value)
                    }
                    className="px-3 py-2 text-sm border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
                  />

                  <input
                    type="text"
                    placeholder="Degree"
                    value={Education.degree || ''}
                    onChange={(e) =>
                      updateEducation(index, 'degree', e.target.value)
                    }
                    className="px-3 py-2 text-sm border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
                  />

                  <input
                    type="text"
                    placeholder="Field of Study"
                    value={Education.field || ''}
                    onChange={(e) =>
                      updateEducation(index, 'field', e.target.value)
                    }
                    className="px-3 py-2 text-sm border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
                  />

                  <div className="relative">
                    <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none w-4 h-4" />
                    <input
                      type="month"
                      placeholder="Graduation Date"
                      value={Education.graduation_date || ''}
                      onChange={(e) =>
                        updateEducation(index, 'graduation_date', e.target.value)
                      }
                      className="w-full px-3 py-2 pr-10 text-sm border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
                    />
                  </div>
                </div>

                <input
                  type="text"
                  placeholder="GPA (Optional)"
                  value={Education.gpa || ''}
                  onChange={(e) =>
                    updateEducation(index, 'gpa', e.target.value)
                  }
                  className="px-3 py-2 text-sm border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none w-full"
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default EducationForm;
