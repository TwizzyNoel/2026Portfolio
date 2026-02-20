import axios from "axios";

const getBatteryColor = (level) => {
  if (level < 20) return 'red';
  if (level < 50) return 'yellow';
  return 'green';
};

const getStorageColor = (level) => {
  if (level > 80) return 'red';
  if (level > 50) return 'yellow';
  return 'green';
};

export const fetchBins = async () => {
  try {
    const token = localStorage.getItem('token');
    
    if (!token) {
      throw new Error('No authentication token found. Please log in.');
    }
    
    const response = await axios.get('/api/smart_trash', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    console.log('Fetched bins:', response.data);
    const transformedBins = response.data.map(trash => ({
      id: trash.trashID,
      name: `Trash ${trash.room}`,
      location: `Building ${trash.building}, Room ${trash.room}`,
      building: trash.building,
      room: trash.room,
      battery: 10,
      storage: 10, 
      batteryColor: getBatteryColor(75),
      storageColor: getStorageColor(trash.alarm_treshold),
      description: trash.optional_description,
      alarmThreshold: trash.alarm_treshold
    }));
    
    return transformedBins;
  } catch (error) {
    console.error('Error fetching bins:', error);
    throw new Error('Failed to fetch bins');
  }
};

export default fetchBins;