'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface ProfileData {
  fullName: string;
  bio: string;
  location: string;
  company: string;
  jobTitle: string;
  industry: string;
  experience: string;
  skills: string[];
  interests: string[];
  linkedinUrl: string;
  twitterUrl: string;
  websiteUrl: string;
  phoneNumber: string;
  startupStage: string;
  fundingStage: string;
  teamSize: number | '';
  lookingFor: string[];
  availableForMentoring: boolean;
  openToInvestment: boolean;
  willingToRelocate: boolean;
}

const industries = [
  'AI/Machine Learning', 'Fintech', 'E-commerce', 'Healthcare', 'SaaS',
  'Blockchain', 'EdTech', 'Climate Tech', 'Biotech', 'Cybersecurity',
  'Gaming', 'Real Estate', 'Food & Beverage', 'Fashion', 'Media'
];

const startupStages = [
  'idea', 'prototype', 'mvp', 'growth', 'scaling'
];

const fundingStages = [
  'bootstrap', 'pre-seed', 'seed', 'series-a', 'series-b', 'series-c+'
];

const experienceLevels = [
  'First-time founder', '1-3 years', '3-5 years', '5-10 years', '10+ years'
];

const lookingForOptions = [
  'co-founder', 'investor', 'mentor', 'talent', 'advisor', 'customer', 'partner'
];

export default function ProfilePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [profileData, setProfileData] = useState<ProfileData>({
    fullName: '',
    bio: '',
    location: '',
    company: '',
    jobTitle: '',
    industry: '',
    experience: '',
    skills: [],
    interests: [],
    linkedinUrl: '',
    twitterUrl: '',
    websiteUrl: '',
    phoneNumber: '',
    startupStage: '',
    fundingStage: '',
    teamSize: '',
    lookingFor: [],
    availableForMentoring: false,
    openToInvestment: false,
    willingToRelocate: false
  });

  const handleInputChange = (field: keyof ProfileData, value: any) => {
    setProfileData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleArrayChange = (field: 'skills' | 'interests' | 'lookingFor', value: string) => {
    setProfileData(prev => ({
      ...prev,
      [field]: prev[field].includes(value) 
        ? prev[field].filter(item => item !== value)
        : [...prev[field], value]
    }));
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/profile', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(profileData),
      });

      if (response.ok) {
        router.push('/dashboard');
      } else {
        console.error('Profile update failed');
      }
    } catch (error) {
      console.error('Profile update error:', error);
    } finally {
      setLoading(false);
    }
  };

  const totalSteps = 4;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 py-8">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-white">Complete Your Profile</h1>
            <p className="text-white/80 mt-2">Help other founders discover and connect with you</p>
            
            {/* Progress Bar */}
            <div className="mt-6">
              <div className="bg-white/20 rounded-full h-2 backdrop-blur-sm">
                <div 
                  className="bg-white h-2 rounded-full transition-all duration-300"
                  style={{ width: `${(currentStep / totalSteps) * 100}%` }}
              ></div>
            </div>
            <p className="text-sm text-white/70 mt-2">Step {currentStep} of {totalSteps}</p>
          </div>
        </div>

        <div className="bg-white/10 backdrop-blur-md rounded-lg border border-white/20 p-6">
          {/* Step 1: Basic Info */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-white">Basic Information</h2>
              
              <div>
                <label className="block text-sm font-medium text-white mb-2">Full Name</label>
                <input
                  type="text"
                  value={profileData.fullName}
                  onChange={(e) => handleInputChange('fullName', e.target.value)}
                  className="w-full px-3 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg focus:ring-white focus:border-white text-white placeholder-white/60"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-white mb-2">Bio</label>
                <textarea
                  value={profileData.bio}
                  onChange={(e) => handleInputChange('bio', e.target.value)}
                  rows={4}
                  placeholder="Tell other founders about yourself and your journey..."
                  className="w-full px-3 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg focus:ring-white focus:border-white text-white placeholder-white/60"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-white mb-2">Location</label>
                  <input
                    type="text"
                    value={profileData.location}
                    onChange={(e) => handleInputChange('location', e.target.value)}
                    placeholder="San Francisco, CA"
                    className="w-full px-3 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg focus:ring-white focus:border-white text-white placeholder-white/60"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-white mb-2">Phone Number</label>
                  <input
                    type="tel"
                    value={profileData.phoneNumber}
                    onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
                    className="w-full px-3 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg focus:ring-white focus:border-white text-white placeholder-white/60"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Professional Info */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-white">Professional Information</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-white mb-2">Company</label>
                  <input
                    type="text"
                    value={profileData.company}
                    onChange={(e) => handleInputChange('company', e.target.value)}
                    className="w-full px-3 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg focus:ring-white focus:border-white text-white placeholder-white/60"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-white mb-2">Job Title</label>
                  <input
                    type="text"
                    value={profileData.jobTitle}
                    onChange={(e) => handleInputChange('jobTitle', e.target.value)}
                    placeholder="CEO, CTO, Founder"
                    className="w-full px-3 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg focus:ring-white focus:border-white text-white placeholder-white/60"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-white mb-2">Industry</label>
                  <select
                    value={profileData.industry}
                    onChange={(e) => handleInputChange('industry', e.target.value)}
                    className="w-full px-3 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg focus:ring-white focus:border-white text-white"
                  >
                    <option value="" className="text-gray-900">Select Industry</option>
                    {industries.map(industry => (
                      <option key={industry} value={industry} className="text-gray-900">{industry}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-white mb-2">Experience Level</label>
                  <select
                    value={profileData.experience}
                    onChange={(e) => handleInputChange('experience', e.target.value)}
                    className="w-full px-3 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg focus:ring-white focus:border-white text-white"
                  >
                    <option value="" className="text-gray-900">Select Experience</option>
                    {experienceLevels.map(level => (
                      <option key={level} value={level} className="text-gray-900">{level}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-white mb-2">Social Links</label>
                <div className="space-y-3">
                  <input
                    type="url"
                    value={profileData.linkedinUrl}
                    onChange={(e) => handleInputChange('linkedinUrl', e.target.value)}
                    placeholder="LinkedIn URL"
                    className="w-full px-3 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg focus:ring-white focus:border-white text-white placeholder-white/60"
                  />
                  <input
                    type="url"
                    value={profileData.twitterUrl}
                    onChange={(e) => handleInputChange('twitterUrl', e.target.value)}
                    placeholder="Twitter URL"
                    className="w-full px-3 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg focus:ring-white focus:border-white text-white placeholder-white/60"
                  />
                  <input
                    type="url"
                    value={profileData.websiteUrl}
                    onChange={(e) => handleInputChange('websiteUrl', e.target.value)}
                    placeholder="Website URL"
                    className="w-full px-3 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg focus:ring-white focus:border-white text-white placeholder-white/60"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Startup Info */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-white">Startup Information</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-white mb-2">Startup Stage</label>
                  <select
                    value={profileData.startupStage}
                    onChange={(e) => handleInputChange('startupStage', e.target.value)}
                    className="w-full px-3 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg focus:ring-white focus:border-white text-white"
                  >
                    <option value="" className="text-gray-900">Select Stage</option>
                    {startupStages.map(stage => (
                      <option key={stage} value={stage} className="text-gray-900">{stage.charAt(0).toUpperCase() + stage.slice(1)}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-white mb-2">Funding Stage</label>
                  <select
                    value={profileData.fundingStage}
                    onChange={(e) => handleInputChange('fundingStage', e.target.value)}
                    className="w-full px-3 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg focus:ring-white focus:border-white text-white"
                  >
                    <option value="" className="text-gray-900">Select Funding</option>
                    {fundingStages.map(stage => (
                      <option key={stage} value={stage} className="text-gray-900">{stage.charAt(0).toUpperCase() + stage.slice(1)}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-white mb-2">Team Size</label>
                  <input
                    type="number"
                    value={profileData.teamSize}
                    onChange={(e) => handleInputChange('teamSize', parseInt(e.target.value) || '')}
                    className="w-full px-3 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg focus:ring-white focus:border-white text-white placeholder-white/60"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-white mb-2">What are you looking for?</label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  {lookingForOptions.map(option => (
                    <label key={option} className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={profileData.lookingFor.includes(option)}
                        onChange={() => handleArrayChange('lookingFor', option)}
                        className="rounded border-white/20 text-white focus:ring-white bg-white/10"
                      />
                      <span className="text-sm text-white capitalize">{option}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={profileData.availableForMentoring}
                    onChange={(e) => handleInputChange('availableForMentoring', e.target.checked)}
                    className="rounded border-white/20 text-white focus:ring-white bg-white/10"
                  />
                  <span className="text-sm text-white">Available for mentoring other founders</span>
                </label>

                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={profileData.openToInvestment}
                    onChange={(e) => handleInputChange('openToInvestment', e.target.checked)}
                    className="rounded border-white/20 text-white focus:ring-white bg-white/10"
                  />
                  <span className="text-sm text-white">Open to investment opportunities</span>
                </label>

                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={profileData.willingToRelocate}
                    onChange={(e) => handleInputChange('willingToRelocate', e.target.checked)}
                    className="rounded border-white/20 text-white focus:ring-white bg-white/10"
                  />
                  <span className="text-sm text-white">Willing to relocate for opportunities</span>
                </label>
              </div>
            </div>
          )}

          {/* Step 4: Skills & Interests */}
          {currentStep === 4 && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-white">Skills & Interests</h2>
              
              <div>
                <label className="block text-sm font-medium text-white mb-2">Skills</label>
                <p className="text-sm text-white/70 mb-3">Add your key skills (press Enter to add)</p>
                <div className="flex flex-wrap gap-2 mb-3">
                  {profileData.skills.map((skill, index) => (
                    <span key={index} className="bg-white/20 text-white px-3 py-1 rounded-full text-sm flex items-center gap-2 backdrop-blur-sm">
                      {skill}
                      <button
                        onClick={() => handleArrayChange('skills', skill)}
                        className="text-white/80 hover:text-white"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
                <input
                  type="text"
                  placeholder="Add a skill and press Enter"
                  onKeyPress={(e) => {
                    if (e.key === 'Enter' && e.currentTarget.value.trim()) {
                      handleArrayChange('skills', e.currentTarget.value.trim());
                      e.currentTarget.value = '';
                    }
                  }}
                  className="w-full px-3 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg focus:ring-white focus:border-white text-white placeholder-white/60"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-white mb-2">Interests</label>
                <p className="text-sm text-white/70 mb-3">Add your interests (press Enter to add)</p>
                <div className="flex flex-wrap gap-2 mb-3">
                  {profileData.interests.map((interest, index) => (
                    <span key={index} className="bg-white/20 text-white px-3 py-1 rounded-full text-sm flex items-center gap-2 backdrop-blur-sm">
                      {interest}
                      <button
                        onClick={() => handleArrayChange('interests', interest)}
                        className="text-white/80 hover:text-white"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
                <input
                  type="text"
                  placeholder="Add an interest and press Enter"
                  onKeyPress={(e) => {
                    if (e.key === 'Enter' && e.currentTarget.value.trim()) {
                      handleArrayChange('interests', e.currentTarget.value.trim());
                      e.currentTarget.value = '';
                    }
                  }}
                  className="w-full px-3 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg focus:ring-white focus:border-white text-white placeholder-white/60"
                />
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8 pt-6 border-t border-white/20">
            <button
              onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
              disabled={currentStep === 1}
              className="px-6 py-2 text-white bg-white/20 backdrop-blur-sm rounded-lg hover:bg-white/30 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>

            {currentStep < totalSteps ? (
              <button
                onClick={() => setCurrentStep(Math.min(totalSteps, currentStep + 1))}
                className="px-6 py-2 bg-white text-blue-600 rounded-lg hover:bg-white/90"
              >
                Next
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                disabled={loading}
                className="px-6 py-2 bg-white text-blue-600 rounded-lg hover:bg-white/90 disabled:opacity-50"
              >
                {loading ? 'Saving...' : 'Complete Profile'}
              </button>
            )}
          </div>
        </div>
        </div>
      </div>
    </div>
  );
}
