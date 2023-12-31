export interface VerifiedAdminRespDto {
  success: boolean;
  message: string;
  data?: {
    id: number;
    FirstName: string;
    lastName: string;
    email: string;
    isAdmin: boolean;
  };
  access_token?: string;
}

export interface IPasswordReset {
  success: boolean;
  message: string;
}
