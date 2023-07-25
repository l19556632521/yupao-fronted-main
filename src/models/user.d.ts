/**
 * 用户类别
 */
export type UserType = {
userIds: any;
    id: number;
    username: string;
    userAccount: string;
    avatarUrl?: string;
    profile?: string;
    gender:genderMap;
    phone: string;
    email: string;
    userStatus: number;
    userRole: number;
    plannetCode: string;
    tags: string;
    createTime: Date;
};
