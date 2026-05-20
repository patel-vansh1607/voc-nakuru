import React, { useState, useEffect } from 'react';
import { supabase } from '../../supabaseClient';
import st from './AdminStudio.module.css';
import { Play, Pause, CheckCircle, Loader2, Zap } from 'lucide-react';
import Swal from 'sweetalert2';

const AdminStudio = () => {
  const [goldenStatus, setGoldenStatus] = useState('waiting');
  const [stoneStatus, setStoneStatus] = useState('waiting');
  const [bhaktiStatus, setBhaktiStatus] = useState('waiting');
  const [loading, setLoading] = useState(null); // Tracks which event is loading

  useEffect(() => {
    const fetchStatuses = async () => {
      const { data } = await supabase.from('event_settings').select('id, status');
      if (data) {
        data.forEach(item => {
          if (item.id === 'golden') setGoldenStatus(item.status);
          if (item.id === 'stone_laying') setStoneStatus(item.status);
          if (item.id === 'bhakti_bhavna') setBhaktiStatus(item.status);
        });
      }
    };
    fetchStatuses();
  }, []);

  const updateStatus = async (id, newStatus) => {
    setLoading(id);
    const { error } = await supabase
      .from('event_settings')
      .update({ status: newStatus, is_live: newStatus === 'live' })
      .eq('id', id);

    if (!error) {
      if (id === 'golden') setGoldenStatus(newStatus);
      if (id === 'stone_laying') setStoneStatus(newStatus);
      if (id === 'bhakti_bhavna') setBhaktiStatus(newStatus);
      
      Swal.fire({
        title: 'Broadcast Updated',
        text: `${id.replace('_', ' ').toUpperCase()} is now ${newStatus}`,
        icon: 'success',
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 2000,
        background: '#1a1a2e',
        color: '#fff'
      });
    }
    setLoading(null);
  };

  const ControlBox = ({ id, title, currentStatus, themeColor, liveColor }) => {
    const btnStyle = (statusLabel, type) => {
      const isActive = currentStatus === statusLabel;
      let activeBg = themeColor;
      if (type === 'live') activeBg = liveColor;
      if (type === 'done') activeBg = '#2ecc71';

      return {
        background: isActive ? activeBg : 'rgba(255,255,255,0.03)',
        color: '#fff',
        border: `1px solid ${isActive ? activeBg : 'rgba(255,255,255,0.1)'}`,
        padding: '18px',
        borderRadius: '15px',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '12px',
        fontWeight: 'bold',
        transition: '0.3s',
        flex: 1
      };
    };

    return (
      <div className={st.eventCard} style={{ 
        background: 'rgba(20, 20, 30, 0.8)', 
        padding: '35px', 
        borderRadius: '30px', 
        border: `1px solid ${themeColor}33`,
        width: '100%',
        maxWidth: '450px'
      }}>
        <div style={{ textAlign: 'center', marginBottom: '30px' }}>
          <Zap size={20} color={themeColor} style={{ marginBottom: '10px' }} />
          <h2 style={{ color: '#fff', fontSize: '1.8rem', margin: 0 }}>{title}</h2>
          <p style={{ color: themeColor, fontSize: '0.7rem', letterSpacing: '3px', marginTop: '10px' }}>
            CURRENTLY: {currentStatus ? currentStatus.toUpperCase() : 'WAITING'}
          </p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          <button onClick={() => updateStatus(id, 'waiting')} style={btnStyle('waiting', 'wait')}>
            <Pause size={20} /> UPCOMING
          </button>
          
          <button onClick={() => updateStatus(id, 'live')} style={btnStyle('live', 'live')}>
            <Play size={20} /> GO LIVE
          </button>
          
          <button onClick={() => updateStatus(id, 'completed')} style={btnStyle('completed', 'done')}>
            <CheckCircle size={20} /> COMPLETED
          </button>
        </div>
        
        {loading === id && (
          <div style={{ textAlign: 'center', marginTop: '20px' }}>
            <Loader2 className={st.spinner} color={themeColor} />
          </div>
        )}
      </div>
    );
  };

  return (
    <div className={st.studioWrapper} style={{ padding: '60px 20px', minHeight: '100vh' }}>
      <header style={{ textAlign: 'center', marginBottom: '50px' }}>
        <h1 style={{ color: '#fff', fontSize: '3rem', fontFamily: 'Prettywise, serif' }}>MASTER CONTROL</h1>
        <p style={{ color: 'rgba(255,255,255,0.5)', letterSpacing: '2px' }}>Visa Oshwal Community Nakuru</p>
      </header>

      <div style={{ 
        display: 'flex', 
        flexWrap: 'wrap', 
        gap: '40px', 
        justifyContent: 'center', 
        alignItems: 'flex-start',
        width: '100%',
        maxWidth: '1400px',
        margin: '0 auto'
      }}>
        {/* BUTTON SET 1: GOLDEN JUBILEE CEREMONY */}
        <ControlBox 
          id="golden" 
          title="Golden Jubilee" 
          currentStatus={goldenStatus} 
          themeColor="#e6d3b3" // Premium Cream/Gold Theme
          liveColor="#ff4d4d"
        />

        {/* BUTTON SET 2: STONE LAYING */}
        <ControlBox 
          id="stone_laying" 
          title="Stone Laying" 
          currentStatus={stoneStatus} 
          themeColor="#a855f7" // Purple Theme
          liveColor="#ff4d4d"
        />

        {/* BUTTON SET 3: BHAKTI BHAVNA */}
        <ControlBox 
          id="bhakti_bhavna" 
          title="Bhakti Bhavna" 
          currentStatus={bhaktiStatus} 
          themeColor="#f59e0b" // Gold Theme
          liveColor="#ef4444"
        />
      </div>
    </div>
  );
};

export default AdminStudio;