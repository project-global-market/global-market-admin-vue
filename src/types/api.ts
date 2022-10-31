interface I_Api_SignIn {
  accessToken: string;
  id: number;
  email: string;
  username: string;
  role: string;
  message: string;
}

interface I_Api_Info {
  id: number;
  username: string;
  role: string;
  verified: boolean;
  email: string;
  updated_at: string;
  created_at: string;
  from: string;
}

export type { I_Api_SignIn, I_Api_Info };
