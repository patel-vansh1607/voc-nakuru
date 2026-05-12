import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../supabaseClient';
import styles from './Login.module.css';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      alert(error.message);
      setLoading(false);
    } else {
      navigate('/admin/dashboard');
    }
  };

  return (
    <div className={styles.container}>
      {/* Dynamic Background Elements */}
      <div className={styles.meshBox}></div>
      
      <div className={styles.contentSplit}>
        {/* Left Side: Branding/Context */}
        <div className={styles.brandSide}>
          <div className={styles.heroText}>
            <h1 className={styles.title}>Admin Portal</h1>
            <p className={styles.description}>
              Authorization is required 
            </p>
          </div>
        </div>

        {/* Right Side: The Login Card */}
        <div className={styles.formSide}>
          <div className={styles.glassCard}>
            <div className={styles.cardHeader}>
              <h3>Log In</h3>
              <div className={styles.statusDot}></div>
            </div>

            <form onSubmit={handleLogin} className={styles.form}>
              <div className={styles.field}>
                <input 
                  type="email" 
                  placeholder="ID / Email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required 
                />
              </div>

              <div className={styles.field}>
                <input 
                  type="password" 
                  placeholder="Security Key" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required 
                />
              </div>

              <button type="submit" className={styles.actionBtn} disabled={loading}>
                {loading ? 'Verifying...' : 'Authenticate'}
              </button>
            </form>
          </div>
        </div>
      </div>

      <footer className={styles.footer}>
        <span>&copy; 2026 VOC NAKURU</span>
        <span className={styles.line}></span>
        <span>SUPER ADMIN: VANSH</span>
      </footer>
    </div>
  );
};

export default AdminLogin;