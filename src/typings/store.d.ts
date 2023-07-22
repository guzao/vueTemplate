
/** 角色详细信息 */
type Role = {
    roleKey: string;
    roleName: string;
}


/** 部门信息 */
type DeptInfo = {
    deptId: number,
    deptName: string;
    leader: string;
}

/** 用户的详细信息 */
type UserInfoDetail = {
    /** 头像 */
    avatar: string;
    /** 邮箱 */
    email: string;
    /** 是否是首次登录 1 ==> 否 0 ==> 是 */
    firstLoginFlag: string;
    /** 用户昵称 */
    nickName: string;
    /** 用户手机号 */
    phonenumber: string;
    /** 用户手性别 */
    sex: string;
    /** 用户状态 */
    status: string;
    /** 用户名称 */
    userName: string;
    /** 角色详细信息 */
    roles: Role[];
    /** 部门信息 */
    dept: DeptInfo;

}

/**
 * 用户信息
*/
type UserInfo = {

    /** 按钮权限 */
    permissions: string[];
    /** 角色 */
    roles: string[];
    /** 用户的详细信息 */
    user: UserInfoDetail;


}