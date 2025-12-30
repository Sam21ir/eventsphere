import { Radius } from 'lucide-react';
import toast from 'react-hot-toast';

/* ================================
   Base Toast Style
================================ */
const baseStyle = {
  borderRadius: '12px',
  padding: '14px 18px',
  fontWeight: '600',
  boxShadow: '0 10px 25px rgba(0,0,0,0.15)',
};

/* ================================
  Success Toast
================================ */
export const showSuccessToast = (message) => {
  toast.success(message, {
    duration: 2500,
    position: 'top-center',
    icon: '✅',
    style: {
      ...baseStyle,
      background: 'linear-gradient(135deg, #10b981, #34d399)',
      color: '#fff',
    },
  });
};

/* ================================
   Error Toast
================================ */
export const showErrorToast = (message) => {
  toast.error(message, {
    duration: 3000,
    position: 'top-center',
    icon: '❌',
    style: {
      ...baseStyle,
      background: 'linear-gradient(135deg, #ef4444, #f87171)',
      color: '#fff',
    },
  });
};

/* ================================
   Info / Action Toast
================================ */
export const showInfoToast = (message, icon = 'ℹ️') => {
  toast(message, {
    duration: 2200,
    position: 'top-center',
    icon,
    style: {
      ...baseStyle,
      background: 'linear-gradient(165deg, #CAFFBF, #69af6aff)',
      color: '#0f172a',
      border: '1px solid #CAFFBF',
      borderRadius: '5px',
    },
  });
};

/* ================================
   Custom Toast (Title + Description)
================================ */
export const showCustomToast = (title, description) => {
  toast(
    (t) => (
      <div>
        <strong style={{ display: 'block', marginBottom: '4px' }}>
          {title}
        </strong>
        <span style={{ fontSize: '14px' }}>
          {description}
        </span>
      </div>
    ),
    {
      duration: 3000,
      position: 'top-center',
      style: {
        ...baseStyle,
        background: '#111827',
        color: '#fff',
      },
    }
  );
};
