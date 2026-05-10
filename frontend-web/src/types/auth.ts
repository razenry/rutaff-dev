export interface User {
  id: string;
  name: string;
  email: string;
  institution_id?: string | null;
  fcm_token?: string | null;
  device_id?: string | null;
  created_at: string;
  updated_at: string;
}

export interface AuthResponse {
  message: string;
  data: {
    user: User;
    token: string;
  };
}
