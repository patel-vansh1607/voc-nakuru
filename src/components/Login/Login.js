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
    if (!email || !password) return;

    setLoading(true);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({ 
        email: email.trim(), 
        password: password 
      });

      if (error) {
        alert(error.message);
        setLoading(false);
      } else if (data.session) {
        // Use replace: true to clear login from history
        navigate('/admin/dashboard', { replace: true });
      }
    } catch (err) {
      alert("An unexpected error occurred.");
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.meshBox}></div>
      <div className={styles.contentSplit}>
        <div className={styles.brandSide}>
          <div className={styles.heroText}>
            <h1 className={styles.title}>Admin Portal</h1>
            <p className={styles.description}>Mission Control Authorization</p>
          </div>
        </div>

        <div className={styles.formSide}>
          <div className={styles.glassCard}>
            <div className={styles.cardHeader}>
              <h3>Authentication</h3>
              <div className={`${styles.statusDot} ${loading ? styles.animating : ''}`}></div>
            </div>

            <form onSubmit={handleLogin} className={styles.form}>
              <div className={styles.field}>
                <input 
                  type="email" 
                  placeholder="Admin Email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={loading}
                  required 
                />
              </div>
              <div className={styles.field}>
                <input 
                  type="password" 
                  placeholder="Security Key" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={loading}
                  required 
                />
              </div>
              <button type="submit" className={styles.actionBtn} disabled={loading}>
                {loading ? 'Verifying...' : 'Access Dashboard'}
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