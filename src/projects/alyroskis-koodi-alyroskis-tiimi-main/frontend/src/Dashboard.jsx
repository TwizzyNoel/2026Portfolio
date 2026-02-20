import React, { useEffect, useState } from 'react';
import { ChevronDown, Edit2, Plus } from 'lucide-react';
import { fetchBins } from './Bins';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('roskikset');
  const [kampusFilter, setKampusFilter] = useState('Kampus');
  const [rakennusFilter, setRakennusFilter] = useState('Rakennus');
  const [bins, setBins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadBins = async () => {
      try {
        setLoading(true);
        const data = await fetchBins();
        setBins(data);
        setError(null);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadBins();
  }, []);

  const renderBinCard = (bin) => (
    <div key={bin.id} className="bin-card">
      <button className="edit-button">
        <Edit2 size={16} />
      </button>

      <div className="bin-info">
        <h3 className="bin-name">{bin.name}</h3>
        <p className="bin-location">{bin.location}</p>
      </div>

      <div className="bin-stats">
        <div className="battery-container">
          <div className="battery">
            <div
              className={`battery-fill ${bin.batteryColor}`}
              style={{ width: `${bin.battery}%` }}
            />
          </div>
        </div>

        <div className={`storage-indicator ${bin.storageColor}`}>
          {bin.alarmThreshold}%
        </div>
      </div>

      <div className="bin-image" />
    </div>
  );

  if (loading) {
    return (
      <div className="dashboard">
        <div className="container">
          <p>Loading bins...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="dashboard">
        <div className="container">
          <p>Error loading bins: {error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard">
      <div className="container">
        <div className="header">
          <h1 className="title">Bins Chilling</h1>
         
          <div className="tabs">
            <button
              onClick={() => setActiveTab('roskikset')}
              className={`tab ${activeTab === 'roskikset' ? 'active' : 'inactive'}`}
            >
              roskikset
            </button>
            <button
              onClick={() => navigate("/users")}
              
              className={`tab ${activeTab === 'kayttajat' ? 'active' : 'inactive'}`}
            >
              käyttäjät
            </button>
            <button
              onClick={() => setActiveTab('loki')}
              className={`tab ${activeTab === 'loki' ? 'active' : 'inactive'}`}
            >
              loki
            </button>
          </div>
        </div>

        <div className="toolbar">
          <div className="filters">
            <div className="select-wrapper">
              <select
                value={kampusFilter}
                onChange={(e) => setKampusFilter(e.target.value)}
                className="select"
              >
                <option>Kampus</option>
                <option>Kampus 1</option>
                <option>Kampus 2</option>
              </select>
              <ChevronDown className="select-icon" />
            </div>
           
            <div className="select-wrapper">
              <select
                value={rakennusFilter}
                onChange={(e) => setRakennusFilter(e.target.value)}
                className="select"
              >
                <option>Rakennus</option>
                <option>Rakennus A</option>
                <option>Rakennus B</option>
              </select>
              <ChevronDown className="select-icon" />
            </div>
          </div>

          <h2 className="section-title">Roskikset</h2>

          <button className="add-button">
            <Plus size={16} />
            <span>Lisää</span>
          </button>
        </div>

        <div className="notification">
          <div className="notification-badge">1</div>
        </div>

        <div className="grid">
          {bins.map(renderBinCard)}



          <div className="add-slot">
            <button className="add-slot-button">
              <Plus size={32} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;