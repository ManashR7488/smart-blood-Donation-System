import { useEffect, useState, useRef } from "react";
import "./a.css"
import 'material-icons/iconfont/material-icons.css';
import { useAuthStore } from "../../store/useAuthStore";

const Settings = () => {

  const {authUser} = useAuthStore()
  
  return (
    <div className="Container">
      {/* <!-- Main Content --> */}
      <main className="main-content">
        <div className="header">
          <h1>Settings</h1>
          <div className="search-bar">
            <span className="material-icons">search</span>
            <input type="text" placeholder="Search settings..." />
          </div>
          <div className="user-profile">
            <img
              src="https://randomuser.me/api/portraits/women/45.jpg"
              alt="User Profile"
            />
            <span>{authUser.name}</span>
          </div>
        </div>

        <div className="settings-container">
          {/* <!-- Account Settings Card --> */}
          <div className="settings-card">
            <div className="settings-card-header">
              <span className="material-icons">person_outline</span>
              <h3>Account Settings</h3>
            </div>

            <div className="settings-group">
              <div className="profile-picture">
                <img
                  src="https://randomuser.me/api/portraits/women/45.jpg"
                  alt="Profile Picture"
                />
                <div className="profile-picture-edit">Change</div>
              </div>
            </div>

            <div className="settings-group">
              <h4 className="settings-group-title">Personal Information</h4>
              <div className="setting-item">
                <div className="setting-label">
                  <span className="material-icons">badge</span>
                  <span>Name</span>
                </div>
                <div className="setting-control">
                  <span>{authUser.name}</span>
                </div>
              </div>
              <div className="setting-item">
                <div className="setting-label">
                  <span className="material-icons">cake</span>
                  <span>Date of Birth</span>
                </div>
                <div className="setting-control">
                  <span>15/08/1992</span>
                </div>
              </div>
              <div className="setting-item">
                <div className="setting-label">
                  <span className="material-icons">female</span>
                  <span>Gender</span>
                </div>
                <div className="setting-control">
                  <span>{authUser.gender}</span>
                </div>
              </div>
              <div className="setting-item">
                <div className="setting-label">
                  <span className="material-icons">bloodtype</span>
                  <span>Blood Type</span>
                </div>
                <div className="setting-control ">
                  <span>{authUser.bloodType}</span>
                  <span className="verification-badge ">
                    <span className="material-icons ">verified</span>
                    Verified
                  </span>
                </div>
              </div>
            </div>

            <div className="settings-group">
              <h4 className="settings-group-title">Contact Information</h4>
              <div className="setting-item">
                <div className="setting-label">
                  <span className="material-icons">phone</span>
                  <span>Phone Number</span>
                </div>
                <div className="setting-control">
                  <span>{authUser.phone}</span>
                  <span className="verification-badge">
                    <span className="material-icons">verified</span>
                    Verified
                  </span>
                </div>
              </div>
              <div className="setting-item">
                <div className="setting-label">
                  <span className="material-icons">email</span>
                  <span>Email</span>
                </div>
                <div className="setting-control">
                  <span>{authUser.email}</span>
                  <span className="verification-badge">
                    <span className="material-icons">verified</span>
                    Verified
                  </span>
                </div>
              </div>
              <div className="setting-item">
                <div className="setting-label">
                  <span className="material-icons">contact_emergency</span>
                  <span>Emergency Contact</span>
                </div>
                <div className="setting-control">
                  <button className="btn btn-outline btn-sm">Edit</button>
                </div>
              </div>
            </div>

            <div className="settings-group">
              <h4 className="settings-group-title">Privacy Settings</h4>
              <div className="setting-item">
                <div className="setting-label">
                  <span className="material-icons">visibility</span>
                  <span>Profile Visibility</span>
                </div>
                <div className="setting-control">
                  <select
                    className="form-control select-control"
                    style={{ width: "120px" }}
                  >
                    <option>Public</option>
                    <option>Donors Only</option>
                    <option>Private</option>
                  </select>
                </div>
              </div>
              <div className="setting-item">
                <div className="setting-label">
                  <span className="material-icons">history</span>
                  <span>Donation History</span>
                </div>
                <div className="setting-control">
                  <select
                    className="form-control select-control"
                    style={{ width: "120px" }}
                  >
                    <option>Visible</option>
                    <option>Hidden</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* <!-- Security Settings Card --> */}
          <div className="settings-card">
            <div className="settings-card-header">
              <span className="material-icons">lock</span>
              <h3>Security Settings</h3>
            </div>

            <div className="settings-group">
              <h4 className="settings-group-title">Authentication</h4>
              <div className="setting-item">
                <div className="setting-label">
                  <span className="material-icons">password</span>
                  <span>Password</span>
                </div>
                <div className="setting-control">
                  <button className="btn btn-outline btn-sm">Change</button>
                </div>
              </div>
              <div className="setting-item">
                <div className="setting-label">
                  <span className="material-icons">admin_panel_settings</span>
                  <span>Two-Factor Authentication</span>
                </div>
                <div className="setting-control">
                  <label className="toggle-switch">
                    <input type="checkbox" checked />
                    <span className="slider"></span>
                  </label>
                </div>
              </div>
              <div className="setting-item">
                <div className="setting-label">
                  <span className="material-icons">fingerprint</span>
                  <span>Biometric Login</span>
                </div>
                <div className="setting-control">
                  <label className="toggle-switch">
                    <input type="checkbox" />
                    <span className="slider"></span>
                  </label>
                </div>
              </div>
            </div>

            <div className="settings-group">
              <h4 className="settings-group-title">Sessions</h4>
              <div className="setting-item">
                <div className="setting-label">
                  <span className="material-icons">devices</span>
                  <span>Active Sessions</span>
                </div>
                <div className="setting-control">
                  <button className="btn btn-outline btn-sm">
                    View All (3)
                  </button>
                </div>
              </div>
              <div className="setting-item">
                <div className="setting-label">
                  <span className="material-icons">logout</span>
                  <span>Logout from All Devices</span>
                </div>
                <div className="setting-control">
                  <button className="btn btn-outline btn-sm">Logout</button>
                </div>
              </div>
            </div>

            <div className="settings-group">
              <h4 className="settings-group-title">Advanced Security</h4>
              <div className="setting-item">
                <div className="setting-label">
                  <span className="material-icons">security</span>
                  <span>Security Alerts</span>
                </div>
                <div className="setting-control">
                  <label className="toggle-switch">
                    <input type="checkbox" checked />
                    <span className="slider"></span>
                  </label>
                </div>
              </div>
              <div className="setting-item">
                <div className="setting-label">
                  <span className="material-icons">history</span>
                  <span>Login History</span>
                </div>
                <div className="setting-control">
                  <button className="btn btn-outline btn-sm">View</button>
                </div>
              </div>
            </div>
          </div>

          {/* <!-- Notification Settings Card --> */}
          <div className="settings-card">
            <div className="settings-card-header">
              <span className="material-icons">notifications</span>
              <h3>Notification Preferences</h3>
            </div>

            <div className="settings-group">
              <h4 className="settings-group-title">Email Notifications</h4>
              <div className="setting-item">
                <div className="setting-label">
                  <span className="material-icons">mail</span>
                  <span>Email Notifications</span>
                </div>
                <div className="setting-control">
                  <label className="toggle-switch">
                    <input type="checkbox" checked />
                    <span className="slider"></span>
                  </label>
                </div>
              </div>
              <div className="setting-item">
                <div className="setting-label">
                  <span className="material-icons">favorite</span>
                  <span>Donation Reminders</span>
                </div>
                <div className="setting-control">
                  <label className="toggle-switch">
                    <input type="checkbox" checked />
                    <span className="slider"></span>
                  </label>
                </div>
              </div>
              <div className="setting-item">
                <div className="setting-label">
                  <span className="material-icons">bloodtype</span>
                  <span>Blood Requests</span>
                </div>
                <div className="setting-control">
                  <label className="toggle-switch">
                    <input type="checkbox" />
                    <span className="slider"></span>
                  </label>
                </div>
              </div>
              <div className="setting-item">
                <div className="setting-label">
                  <span className="material-icons">update</span>
                  <span>System Updates</span>
                </div>
                <div className="setting-control">
                  <label className="toggle-switch">
                    <input type="checkbox" checked />
                    <span className="slider"></span>
                  </label>
                </div>
              </div>
            </div>

            <div className="settings-group">
              <h4 className="settings-group-title">Push Notifications</h4>
              <div className="setting-item">
                <div className="setting-label">
                  <span className="material-icons">notifications_active</span>
                  <span>Push Notifications</span>
                </div>
                <div className="setting-control">
                  <label className="toggle-switch">
                    <input type="checkbox" checked />
                    <span className="slider"></span>
                  </label>
                </div>
              </div>
              <div className="setting-item">
                <div className="setting-label">
                  <span className="material-icons">emergency</span>
                  <span>Nearby Emergencies</span>
                </div>
                <div className="setting-control">
                  <label className="toggle-switch">
                    <input type="checkbox" checked />
                    <span className="slider"></span>
                  </label>
                </div>
              </div>
              <div className="setting-item">
                <div className="setting-label">
                  <span className="material-icons">event_available</span>
                  <span>Appointment Alerts</span>
                </div>
                <div className="setting-control">
                  <label className="toggle-switch">
                    <input type="checkbox" checked />
                    <span className="slider"></span>
                  </label>
                </div>
              </div>
            </div>

            <div className="settings-group">
              <h4 className="settings-group-title">SMS Notifications</h4>
              <div className="setting-item">
                <div className="setting-label">
                  <span className="material-icons">sms</span>
                  <span>SMS Notifications</span>
                </div>
                <div className="setting-control">
                  <label className="toggle-switch">
                    <input type="checkbox" />
                    <span className="slider"></span>
                  </label>
                </div>
              </div>
              <div className="setting-item">
                <div className="setting-label">
                  <span className="material-icons">priority_high</span>
                  <span>Emergency SMS</span>
                </div>
                <div className="setting-control">
                  <label className="toggle-switch">
                    <input type="checkbox" checked />
                    <span className="slider"></span>
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* <!-- Donation Preferences Card --> */}
          <div className="settings-card">
            <div className="settings-card-header">
              <span className="material-icons">favorite</span>
              <h3>Donation Preferences</h3>
            </div>

            <div className="settings-group">
              <h4 className="settings-group-title">Donation Centers</h4>
              <div className="setting-item">
                <div className="setting-label">
                  <span className="material-icons">local_hospital</span>
                  <span>Preferred Centers</span>
                </div>
                <div className="setting-control">
                  <button className="btn btn-outline btn-sm">Manage (2)</button>
                </div>
              </div>
              <div className="setting-item">
                <div className="setting-label">
                  <span className="material-icons">notifications</span>
                  <span>Auto-center Detection</span>
                </div>
                <div className="setting-control">
                  <label className="toggle-switch">
                    <input type="checkbox" checked />
                    <span className="slider"></span>
                  </label>
                </div>
              </div>
            </div>

            <div className="settings-group">
              <h4 className="settings-group-title">Donation Settings</h4>
              <div className="setting-item">
                <div className="setting-label">
                  <span className="material-icons">calendar_today</span>
                  <span>Donation Frequency</span>
                </div>
                <div className="setting-control">
                  <select className="form-control select-control">
                    <option>Every 2 months</option>
                    <option>Every 3 months</option>
                    <option>Every 6 months</option>
                    <option>Annually</option>
                  </select>
                </div>
              </div>
              <div className="setting-item">
                <div className="setting-label">
                  <span className="material-icons">bloodtype</span>
                  <span>Donation Type</span>
                </div>
                <div className="setting-control">
                  <select className="form-control select-control">
                    <option>Whole Blood</option>
                    <option>Platelets</option>
                    <option>Plasma</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="settings-group">
              <h4 className="settings-group-title">Health Questionnaire</h4>
              <div className="setting-item">
                <div className="setting-label">
                  <span className="material-icons">assignment</span>
                  <span>Pre-fill Answers</span>
                </div>
                <div className="setting-control">
                  <label className="toggle-switch">
                    <input type="checkbox" checked />
                    <span className="slider"></span>
                  </label>
                </div>
              </div>
              <div className="setting-item">
                <div className="setting-label">
                  <span className="material-icons">edit</span>
                  <span>Update Questionnaire</span>
                </div>
                <div className="setting-control">
                  <button className="btn btn-outline btn-sm">Edit</button>
                </div>
              </div>
            </div>
          </div>

          {/* <!-- Location Services Card --> */}
          <div className="settings-card">
            <div className="settings-card-header">
              <span className="material-icons">location_on</span>
              <h3>Location Services</h3>
            </div>

            <div className="settings-group">
              <h4 className="settings-group-title">Location Settings</h4>
              <div className="setting-item">
                <div className="setting-label">
                  <span className="material-icons">gps_fixed</span>
                  <span>GPS Accuracy</span>
                </div>
                <div className="setting-control">
                  <select className="form-control select-control">
                    <option>High Accuracy</option>
                    <option>Battery Saving</option>
                    <option>Device Only</option>
                  </select>
                </div>
              </div>
              <div className="setting-item">
                <div className="setting-label">
                  <span className="material-icons">my_location</span>
                  <span>Location Sharing</span>
                </div>
                <div className="setting-control">
                  <label className="toggle-switch">
                    <input type="checkbox" checked />
                    <span className="slider"></span>
                  </label>
                </div>
              </div>
            </div>

            <div className="settings-group">
              <h4 className="settings-group-title">Geofencing</h4>
              <div className="setting-item">
                <div className="setting-label">
                  <span className="material-icons">settings_overscan</span>
                  <span>Geofencing Radius</span>
                </div>
                <div className="setting-control" style={{ width: "100%" }}>
                  <input
                    type="range"
                    min="1"
                    max="50"
                    value="10"
                    className="range-slider"
                  />
                  <div className="range-labels">
                    <span>1 km</span>
                    <span>25 km</span>
                    <span>50 km</span>
                  </div>
                </div>
              </div>
              <div className="setting-item">
                <div className="setting-label">
                  <span className="material-icons">history</span>
                  <span>Location History</span>
                </div>
                <div className="setting-control">
                  <button className="btn btn-outline btn-sm">
                    Clear History
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* <!-- Aadhaar & Face Verification Card --> */}
          <div className="settings-card">
            <div className="settings-card-header">
              <span className="material-icons">verified_user</span>
              <h3>Aadhaar & Face Verification</h3>
            </div>

            <div className="settings-group">
              <h4 className="settings-group-title">Verification Status</h4>
              <div className="setting-item">
                <div className="setting-label">
                  <span className="material-icons">verified</span>
                  <span>Aadhaar Verification</span>
                </div>
                <div className="setting-control">
                  <span className="verification-badge">
                    <span className="material-icons">check_circle</span>
                    Verified
                  </span>
                </div>
              </div>
              <div className="setting-item">
                <div className="setting-label">
                  <span className="material-icons">face</span>
                  <span>Face Verification</span>
                </div>
                <div className="setting-control">
                  <span className="verification-badge">
                    <span className="material-icons">check_circle</span>
                    Verified
                  </span>
                </div>
              </div>
              <div className="setting-item">
                <div className="setting-label">
                  <span className="material-icons">update</span>
                  <span>Last Verified</span>
                </div>
                <div className="setting-control">
                  <span>15 Jan 2023</span>
                </div>
              </div>
            </div>

            <div className="settings-group">
              <h4 className="settings-group-title">Document Management</h4>
              <div className="setting-item">
                <div className="setting-label">
                  <span className="material-icons">description</span>
                  <span>Aadhaar Document</span>
                </div>
                <div className="setting-control">
                  <button className="btn btn-outline btn-sm">View</button>
                </div>
              </div>
              <div className="setting-item">
                <div className="setting-label">
                  <span className="material-icons">edit</span>
                  <span>Update Aadhaar</span>
                </div>
                <div className="setting-control">
                  <button className="btn btn-outline btn-sm">Upload</button>
                </div>
              </div>
            </div>

            <div className="settings-group">
              <h4 className="settings-group-title">Face Data</h4>
              <div className="setting-item">
                <div className="setting-label">
                  <span className="material-icons">
                    face_retouching_natural
                  </span>
                  <span>Face Data Status</span>
                </div>
                <div className="setting-control">
                  <span>Active</span>
                </div>
              </div>
              <div className="setting-item">
                <div className="setting-label">
                  <span className="material-icons">camera_alt</span>
                  <span>Update Face Data</span>
                </div>
                <div className="setting-control">
                  <button className="btn btn-outline btn-sm">Retake</button>
                </div>
              </div>
            </div>
          </div>

          {/* <!-- Chatbot & Voice Settings Card --> */}
          <div className="settings-card">
            <div className="settings-card-header">
              <span className="material-icons">smart_toy</span>
              <h3>Chatbot & Voice</h3>
            </div>

            <div className="settings-group">
              <h4 className="settings-group-title">Voice Assistant</h4>
              <div className="setting-item">
                <div className="setting-label">
                  <span className="material-icons">record_voice_over</span>
                  <span>Voice Preference</span>
                </div>
                <div className="setting-control">
                  <select className="form-control select-control">
                    <option>Female</option>
                    <option>Male</option>
                  </select>
                </div>
              </div>
              <div className="setting-item">
                <div className="setting-label">
                  <span className="material-icons">volume_up</span>
                  <span>Voice Volume</span>
                </div>
                <div className="setting-control" style={{ width: "100%" }}>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value="75"
                    className="range-slider"
                  />
                  <div className="range-labels">
                    <span>0%</span>
                    <span>50%</span>
                    <span>100%</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="settings-group">
              <h4 className="settings-group-title">Chatbot Settings</h4>
              <div className="setting-item">
                <div className="setting-label">
                  <span className="material-icons">psychology</span>
                  <span>Chatbot Personality</span>
                </div>
                <div className="setting-control">
                  <select className="form-control select-control">
                    <option>Professional</option>
                    <option>Friendly</option>
                    <option>Technical</option>
                  </select>
                </div>
              </div>
              <div className="setting-item">
                <div className="setting-label">
                  <span className="material-icons">mic</span>
                  <span>Voice Sensitivity</span>
                </div>
                <div className="setting-control" style={{ width: "100%" }}>
                  <input
                    type="range"
                    min="1"
                    max="10"
                    value="7"
                    className="range-slider"
                  />
                  <div className="range-labels">
                    <span>Low</span>
                    <span>Medium</span>
                    <span>High</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="settings-group">
              <h4 className="settings-group-title">Quick Commands</h4>
              <div className="setting-item">
                <div className="setting-label">
                  <span className="material-icons">keyboard_voice</span>
                  <span>Custom Commands</span>
                </div>
                <div className="setting-control">
                  <button className="btn btn-outline btn-sm">Manage</button>
                </div>
              </div>
            </div>
          </div>

          {/* <!-- Blood Request Settings Card --> */}
          <div className="settings-card">
            <div className="settings-card-header">
              <span className="material-icons">bloodtype</span>
              <h3>Blood Request Settings</h3>
            </div>

            <div className="settings-group">
              <h4 className="settings-group-title">Request Preferences</h4>
              <div className="setting-item">
                <div className="setting-label">
                  <span className="material-icons">priority_high</span>
                  <span>Emergency Alerts</span>
                </div>
                <div className="setting-control">
                  <label className="toggle-switch">
                    <input type="checkbox" checked />
                    <span className="slider"></span>
                  </label>
                </div>
              </div>
              <div className="setting-item">
                <div className="setting-label">
                  <span className="material-icons">notifications_active</span>
                  <span>Alert Sound</span>
                </div>
                <div className="setting-control">
                  <select className="form-control select-control">
                    <option>Default</option>
                    <option>Urgent</option>
                    <option>Silent</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="settings-group">
              <h4 className="settings-group-title">Compatibility</h4>
              <div className="setting-item">
                <div className="setting-label">
                  <span className="material-icons">healing</span>
                  <span>Blood Type Range</span>
                </div>
                <div className="setting-control">
                  <select className="form-control select-control">
                    <option>Exact match only</option>
                    <option>Compatible types</option>
                    <option>All requests</option>
                  </select>
                </div>
              </div>
              <div className="setting-item">
                <div className="setting-label">
                  <span className="material-icons">location_on</span>
                  <span>Distance Range</span>
                </div>
                <div className="setting-control">
                  <select className="form-control select-control">
                    <option>5 km</option>
                    <option>10 km</option>
                    <option>25 km</option>
                    <option>50 km</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="settings-group">
              <h4 className="settings-group-title">Auto-Response</h4>
              <div className="setting-item">
                <div className="setting-label">
                  <span className="material-icons">quickreply</span>
                  <span>Auto-respond</span>
                </div>
                <div className="setting-control">
                  <label className="toggle-switch">
                    <input type="checkbox" />
                    <span className="slider"></span>
                  </label>
                </div>
              </div>
              <div className="setting-item">
                <div className="setting-label">
                  <span className="material-icons">edit</span>
                  <span>Response Message</span>
                </div>
                <div className="setting-control">
                  <button className="btn btn-outline btn-sm">Edit</button>
                </div>
              </div>
            </div>
          </div>

          {/* <!-- Accessibility Settings Card --> */}
          <div className="settings-card">
            <div className="settings-card-header">
              <span className="material-icons">accessibility</span>
              <h3>Accessibility</h3>
            </div>

            <div className="settings-group">
              <h4 className="settings-group-title">Display</h4>
              <div className="setting-item">
                <div className="setting-label">
                  <span className="material-icons">format_size</span>
                  <span>Text Size</span>
                </div>
                <div className="setting-control" style={{ width: "100%" }}>
                  <input
                    type="range"
                    min="12"
                    max="24"
                    value="16"
                    className="range-slider"
                  />
                  <div className="range-labels">
                    <span>Small</span>
                    <span>Medium</span>
                    <span>Large</span>
                  </div>
                </div>
              </div>
              <div className="setting-item">
                <div className="setting-label">
                  <span className="material-icons">contrast</span>
                  <span>High Contrast</span>
                </div>
                <div className="setting-control">
                  <label className="toggle-switch">
                    <input type="checkbox" />
                    <span className="slider"></span>
                  </label>
                </div>
              </div>
            </div>

            <div className="settings-group">
              <h4 className="settings-group-title">Color Blindness</h4>
              <div className="setting-item">
                <div className="setting-label">
                  <span className="material-icons">visibility</span>
                  <span>Color Mode</span>
                </div>
                <div className="setting-control">
                  <select className="form-control select-control">
                    <option>Default</option>
                    <option>Protanopia</option>
                    <option>Deuteranopia</option>
                    <option>Tritanopia</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="settings-group">
              <h4 className="settings-group-title">Screen Reader</h4>
              <div className="setting-item">
                <div className="setting-label">
                  <span className="material-icons">hearing</span>
                  <span>Screen Reader</span>
                </div>
                <div className="setting-control">
                  <label className="toggle-switch">
                    <input type="checkbox" />
                    <span className="slider"></span>
                  </label>
                </div>
              </div>
              <div className="setting-item">
                <div className="setting-label">
                  <span className="material-icons">speed</span>
                  <span>Reader Speed</span>
                </div>
                <div className="setting-control" style={{ width: "100%" }}>
                  <input
                    type="range"
                    min="1"
                    max="10"
                    value="5"
                    className="range-slider"
                  />
                  <div className="range-labels">
                    <span>Slow</span>
                    <span>Medium</span>
                    <span>Fast</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Settings;
