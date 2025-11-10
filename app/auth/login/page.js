"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuthRequest } from '@/hooks/useAuthRequest';
import styles from '../../forms.module.css';
import Header from '@/app/components/Header';

export default function LoginPage() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [formErrors, setFormErrors] = useState({});
  const [generalError, setGeneralError] = useState('');
  const { login, isLoading } = useAuthRequest();
  const router = useRouter();

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormErrors({});
    setGeneralError('');
    try {
      await login(form);
      router.push('/jobs-test');
    } catch (err) {
      if (err.status === 400 && err.data?.errors) {
        setFormErrors(err.data.errors);
      } else {
        setGeneralError(err.message || 'An unknown login error occurred');
      }
    }
  };

  return (
    <>
      <Header />
      <div className={styles.formContainer}>
        <div className={styles.formBox}>
          <h1 className={styles.title}>Welcome Back</h1>
          <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.formGroup}>
              <label htmlFor="email" className={styles.label}>Email</label>
              <input
                type="email"
                id="email"
                name="email"
                className={styles.input}
                value={form.email}
                onChange={handleChange}
                required
              />
              {formErrors.email && <p className={styles.error}>{formErrors.email[0]}</p>}
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="password" className={styles.label}>Password</label>
              <input
                type="password"
                id="password"
                name="password"
                className={styles.input}
                value={form.password}
                onChange={handleChange}
                required
              />
              {formErrors.password && <p className={styles.error}>{formErrors.password[0]}</p>}
            </div>
            {generalError && <p className={styles.error}>{generalError}</p>}
            <button type="submit" className={styles.button} disabled={isLoading}>
              {isLoading ? 'Logging in...' : 'Login'}
            </button>
          </form>
          <p className={styles.link}>
            Don&apos;t have an account?{' '}
            <Link href="/auth/signup">Sign Up</Link>
          </p>
        </div>
      </div>
    </>
  );
}