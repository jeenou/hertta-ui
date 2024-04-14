import React, { useState } from 'react';
import './DeviceDataForm.css';  // Make sure this CSS is being imported

function DeviceDataForm() {
    const [deviceData, setDeviceData] = useState({
        deviceId: '',
        deviceType: '',
        status: '',
        location: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setDeviceData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('Sending data:', deviceData);
        // Implementation of data sending to backend remains unchanged
    };

    return (
        <form onSubmit={handleSubmit} className="device-form">
            <div className="input-group">
                <label>Device ID:</label>
                <input type="text" name="deviceId" value={deviceData.deviceId} onChange={handleInputChange} />
            </div>
            <div className="input-group">
                <label>Device Type:</label>
                <input type="text" name="deviceType" value={deviceData.deviceType} onChange={handleInputChange} />
            </div>
            <div className="input-group">
                <label>Status:</label>
                <input type="text" name="status" value={deviceData.status} onChange={handleInputChange} />
            </div>
            <div className="input-group">
                <label>Location:</label>
                <input type="text" name="location" value={deviceData.location} onChange={handleInputChange} />
            </div>
            <button type="submit">Send</button>
        </form>
    );
}

export default DeviceDataForm;
