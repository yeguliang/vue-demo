export default {
    // 身份证证号

    regIDCard: /^[1-9]\d{5}(18|19|20)\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/,
    //手机号

    regPhone: /^1[3-9]{9}$/,

    //邮箱 
    regEmale: /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/,

    // 纯中文匹配
    regChinese:/[\u4e00-\u9fa5](?=[\u4e00-\u9fa5])[\u4e00-\u9fa5]$/,

    //用户名正则，4到16位（字母，数字，下划线，减号）
    regName: /^[a-zA-Z0-9_-]{4,16}$/,

    //密码正则，以字母开头，长度在6~18之间，只能包含字母、数字和下划线
    regPassWord: /^[a-zA-Z]\w{5,17}$/,

    // 强密码正则，最少6位，包括至少1个大写字母，1个小写字母，1个数字，1个特殊字符
    // regPassWord:/^.*(?=.{6,})(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*? ]).*$/,
    // QQ号码正则
    regQQNum: /^[a-zA-Z]([-_a-zA-Z0-9]{5,19})+$/,
    //微信号正则，6至20位，以字母开头，字母，数字，减号，下划线
    regWXNum: /^[a-zA-Z]([-_a-zA-Z0-9]{5,19})+$/,

    //特殊字符检测正则:
    regSpecial: /["'<>%;)(&+]+-!！@#$~/,

    //车牌号码正则:
    regCarNum: /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}[A-Z0-9]{4}[A-Z0-9挂学警港澳]{1}$/,

    // 护照正则:
    regPassport: /^(P\d{7}|G\d{7,8}|TH\d{7,8}|S\d{7,8}|A\d{7,8}|L\d{7,8}|\d{9}|D\d+|1[4,5]\d{7})$/,

    // 固定电话正则：
    regTelephone: /(\(\d{3,4}\)|\d{3,4}-|\s)?\d{8}/,

    //  IP地址正则:
    regIP: /\d+\.\d+\.\d+\.\d+/,
    
    //  邮政编码正则:
    regPostOffice: /[1-9]{1}(\d+){5}/,

    //经度正则
    reglongitude: /^(\-|\+)?(((\d|[1-9]\d|1[0-7]\d|0{1,3})\.\d{0,6})|(\d|[1-9]\d|1[0-7]\d|0{1,3})|180\.0{0,6}|180)$/,
    
    //纬度正则
    regLatitude: /^(\-|\+)?([0-8]?\d{1}\.\d{0,6}|90\.0{0,6}|[0-8]?\d{1}|90)$/,

}