import Cookies from 'js-cookie';

export const login = async (credentials: any) => {
  const response = await fetch('https://api.nanspace.top/api/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(credentials),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Something went wrong');
  }

  return response.json();
};

export const checkToken = async () => {
  const token = Cookies.get('accessToken');
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };
  
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  
  const response = await fetch('https://api.nanspace.top/api/auth/check-token', {
    headers,
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Something went wrong');
  }
  return response.json();
};

export const refreshToken = async () => {
  const refreshToken = Cookies.get('refreshToken');
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };
  
  if (refreshToken) {
    headers['Authorization'] = `Bearer ${refreshToken}`;
  }
  
  const response = await fetch('https://api.nanspace.top/api/auth/refresh-token', {
    method: 'POST',
    headers,
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Something went wrong');
  }
  return response.json();
};

export const logout = () => {
  Cookies.remove('accessToken', { 
    path: '/',
    secure: false,
    sameSite: 'lax'
  });
  Cookies.remove('refreshToken', { 
    path: '/',
    secure: false,
    sameSite: 'lax'
  });
  
  Cookies.remove('accessToken');
  Cookies.remove('refreshToken');
};