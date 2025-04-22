import React from 'react';
import { ProjectInfo } from './types';

interface ProjectInfoFormProps {
  projectInfo: ProjectInfo;
  setProjectInfo: (info: ProjectInfo) => void;
}

const ProjectInfoForm: React.FC<ProjectInfoFormProps> = ({ projectInfo, setProjectInfo }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProjectInfo({
      ...projectInfo,
      [name]: value,
    });
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-4">Project Information</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Project Name
            <input
              type="text"
              name="projectName"
              value={projectInfo.projectName}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </label>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Client Name
            <input
              type="text"
              name="clientName"
              value={projectInfo.clientName}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </label>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Date
            <input
              type="date"
              name="date"
              value={projectInfo.date}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </label>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Project Address
            <input
              type="text"
              name="projectAddress"
              value={projectInfo.projectAddress}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </label>
        </div>
      </div>
    </div>
  );
};

export default ProjectInfoForm; 