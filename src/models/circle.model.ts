import { UserDto } from "./users.model";

export interface CircleDto {
  name: string;
  slug_name: string;
  about: string;
  picture: string;
  rides_offered: number;
  rides_taken: number;
  verified: boolean;
  is_public: boolean;
  is_limited: boolean;
  members_limit: number;
}

export interface MembershipDto {
  user: UserDto;
  is_admin: boolean;
  is_active: boolean;
  used_invitations: number;
  remaining_invitations: number;
  invited_by: UserDto;
  rides_taken: number;
  rides_offered: number;
  joined_at: string;
}