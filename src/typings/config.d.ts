

/** 用户企业下所拥有的电站 */
type ParkListData = {
    createBy: string
    createTime: string
    updateBy: string
    updateTime: string
    remark: any
    id: number
    deptId: number
    fullName: string
    name: string
    serial: string
    industryType: string
    type: string
    useType: string
    status: string
    totalPower: number | string
    energy: number | string
    buildTime: string
    buildStatus: string
    operateTime: string
    runStatus: string
    countryId: any
    areaId: any
    address: string
    longitude: any
    latitude: any
    delFlag: number
    releaseStatus: number | string
    sort: number | string
}


/** 用户列表数据 */
type UserListData = {
    createBy: string
    createTime: string
    updateBy: any
    updateTime: any
    remark: any
    userId: number
    deptId: any
    userName: string
    nickName: string
    email: string
    phonenumber: string
    sex: string
    avatar: string
    password: any
    status: string
    delFlag: string
    loginIp: string
    loginDate: number
    dept: Dept
    roles: any[]
    roleIds: any
    postIds: any
    roleId: any
    tokenExpireTime: number
    firstLoginFlag: string
    admin: boolean
}

/** 部门列表数据 */
type Dept = {
    createBy: any
    createTime: any
    updateBy: any
    updateTime: any
    remark: any
    deptId: number
    parentId: any
    ancestors: any
    serial: any
    deptName: string
    shortName: any
    industryType: any
    type: any
    orderNum: any
    leader: any
    phone: any
    email: any
    status: any
    address: any
    longitude: any
    latitude: any
    webSite: any
    logo: any
    introduce: any
    delFlag: any
    parentName: any
    children: any[]
}

/** 部门树型结构 */
type UserDeptTree = {
    children: UserDept[],
    id: number,
    label: string
}



type UserDetailData = {
    roleIds: number[]
    data: Data
    postIds: number[]
    roles: Role[]
    posts: Post[]
}


type Data = {
    createBy: string
    createTime: string
    updateBy: any
    updateTime: any
    remark: any
    userId: number
    deptId: number
    userName: string
    nickName: string
    email: string
    phonenumber: string
    sex: string
    avatar: string
    password: string
    status: string
    delFlag: string
    loginIp: string
    loginDate: number
    dept: Dept
    roles: Role[]
    roleIds: any
    postIds: any
    roleId: any
    tokenExpireTime: number
    firstLoginFlag: string
    admin: boolean
}


/** 角色 */
type Role = {
    createBy: any
    createTime: any
    updateBy: any
    updateTime: any
    remark: any
    roleId: number
    roleName: string
    roleKey: string
    roleSort: number
    dataScope: string
    menuCheckStrictly: boolean
    deptCheckStrictly: boolean
    status: string
    delFlag: any
    flag: boolean
    menuIds: any
    deptIds: any
    permissions: any
    admin: boolean
}

/** 职位 */
type Post = {
    createBy: string
    createTime: string
    updateBy: any
    updateTime: any
    remark: string
    postId: number
    postCode: string
    postName: string
    postSort: number
    status: string
    flag: boolean
}
