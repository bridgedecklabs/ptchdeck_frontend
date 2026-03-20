import { useState, type FormEvent } from 'react';
import { submitNotify } from '../services/sheets';

export function useNotifyForm(source = 'website') {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setStatus('loading');
    try {
      await submitNotify(email, source);
      setStatus('success');
      setEmail('');
    } catch {
      setStatus('error');
    }
  };

  return { email, setEmail, status, handleSubmit };
}
