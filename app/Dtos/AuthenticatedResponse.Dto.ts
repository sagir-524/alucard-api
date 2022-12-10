import User from 'App/Models/User'

export interface AuthenticatedResponseDto {
  token: string
  refreshToken: string
  user: User
}
