import Util from '@/assets/js/util.js'
export default {
  checkIpAddress (value) {
    if (value === '') {
      return false
    }
    if (/((25[0-5])|(2[0-4]\d)|(1\d\d)|([1-9]\d)|\d)(\.((25[0-5])|(2[0-4]\d)|(1\d\d)|([1-9]\d)|\d)){3}/.test(value)) {
      return true
    }
    return false
  },
  mobileValidator (rule, value, callback) {
    if (!value) {
      return callback(new Error('请输入手机号'))
    } else {
      if (!/^1\d{10}$/.test(value)) {
        return callback(new Error('请输入正确的手机号'))
      } else {
        return callback()
      }
    }
  },
  emailValidator (rule, value, callback) {
    if (!value) {
      return callback(new Error('请输入邮箱'))
    } else {
      if (!/^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(value)) {
        return callback(new Error('请输入正确邮箱'))
      } else {
        return callback()
      }
    }
  },
  valueNullValidator (rule, value, callback) {
    if (Util.isEmpty(value)) {
      return callback(new Error('此值不能为空'))
    } else {
      return callback()
    }
  },
  safeEmail (rule, value, callback) {
    if (!value) {
      return callback(new Error('请输入邮箱'))
    } else {
      if (!/^\w[-\w.]*@([A-Za-z0-9][-A-Za-z0-9]{0,61}[A-Za-z0-9]\.)+[A-Za-z]{2,6}$/.test(value)) {
        return callback(new Error('请输入正确邮箱'))
      } else {
        return callback()
      }
    }
  },
  safeInt (rule, value, callback) {
    if (!/^[0-9]{1,}$/.test(value)) {
      return callback(new Error('请输入整数'))
    } else {
      return callback()
    }
  },
  safeAssessCorpName (rule, value, callback) {
    if (!value) {
      return callback(new Error('请输入公司名称'))
    } else {
      if (!/^.{1,60}$/.test(value)) {
        return callback(new Error('1-60字符数，不可为空'))
      } else {
        return callback()
      }
    }
  },
  safeAssessContactName (rule, value, callback) {
    if (!value) {
      return callback(new Error('请输入联系人'))
    } else {
      if (!/^.{1,30}$/.test(value)) {
        return callback(new Error('1-30字符，不可为空'))
      } else {
        return callback()
      }
    }
  },
  serviceNameValidator (rule, value, callback) {
    if (!value) {
      return callback(new Error('请输入服务名称'))
    } else {
      if (!/^(?![0-9]+$)(?![_]+$)[0-9A-Za-z_]{5,32}$/.test(value)) {
        return callback(new Error('5-32位，仅包括：小写字母、大写字母、数字、下划线且不支持全数字和全下划线'))
      } else {
        return callback()
      }
    }
  },
  HadoopPwdValidator (rule, value, callback) {
    if (!value) {
      return callback(new Error('请输入密码'))
    } else {
      if (!/^(?=.*?[A-Z])(?=(.*[a-z]){1,})(?=(.*[\d]){1,})(?=(.*[\W]){1,})(?!.*\s).{8,16}$/.test(value)) {
        return callback(new Error('长度范围8-16个字符，由大小写字母、数字及特殊符号等混合、随机组成，包含四种字符，每种至少一个'))
      } else {
        return callback()
      }
    }
  },
  HadoopNameValidator (rule, value, callback) {
    if (!value) {
      return callback(new Error('请输入集群名称'))
    } else {
      if (!/^[a-zA-Z0-9\u4e00-\u9fa5-_]{6,36}$/.test(value)) {
        return callback(new Error('长度限制为6-36个字符，只允许包含中文、大小写字母、数字、“-”、“_”'))
      } else {
        return callback()
      }
    }
  },
  licenseNumValidator (rule, value, callback) {
    if (!value) {
      return callback(new Error('请输入License数量'))
    } else {
      if (value % 10 !== 0) {
        return callback(new Error('请输入10的倍数'))
      } else {
        return callback()
      }
    }
  },
  cloudDBClusterNameValidator (rule, value, callback) {
    if (Util.isEmpty(value)) {
      return callback(new Error('请输入集群名称'))
    } else {
      if (value.length < 2 || value.length > 12) {
        return callback(new Error('集群名称长度2-12位'))
      } else {
        const regName = /(^[a-z]+[-a-z0-9]*[a-z0-9]$)/
        if (regName.test(value)) {
          return callback()
        } else {
          return callback(new Error('支持小写字母、数字、中划线；首字符需以小写字母开头，结尾字符不允许使用中划线'))
        }
      }
    }
  },
  cloudDBAdminPwdValidator (rule, value, callback) {
    if (Util.isEmpty(value)) {
      return callback(new Error('请输入密码'))
    } else {
      if (value.length < 8 || value.length > 32) {
        return callback(new Error('密码长度8-32位'))
      } else {
        const regPwd = /^[a-zA-Z0-9!@%^&*()]+$/
        if (regPwd.test(value)) {
          let num = 0 // 数字计数
          let lowerCase = 0 // 小写计数
          let upperCase = 0 // 大写计数
          let special = 0 // 特殊字符计数
          for (let i = 0; i < value.length; i++) {
            const c = value.charCodeAt(i)
            if (c >= 48 && c <= 57) {
              num = num + 1
            } else if (c >= 65 && c <= 90) {
              upperCase = upperCase + 1
            } else if (c >= 97 && c <= 122) {
              lowerCase = lowerCase + 1
            } else if (c === 33 || c === 64 || c === 37 || c === 94 || c === 38 || c === 42 || c === 40 || c === 41) {
              special = special + 1
            } else {
              return callback(new Error('请输入正确字符'))
            }
          }
          if (num === 0 || lowerCase === 0 || upperCase === 0 || special === 0) {
            return callback(new Error('需同时包括数字、大小写字母和特殊字符'))
          } else {
            return callback()
          }
        } else {
          return callback(new Error('只能数字、大小写字母和部分特殊字符'))
        }
      }
    }
  },
  buyNumValidator (rule, value, callback) {
    if (!value) {
      return callback(new Error('请输入购买时长'))
    } else {
      if (value.toString().indexOf('.') > -1) {
        return callback(new Error('请输入整数'))
      } else {
        return callback()
      }
    }
  },
  orderInstanceNameValidator (rule, value, callback) {
    if (!value) {
      return callback(new Error('请输入服务名称'))
    } else {
      if (!/^(?![0-9]+$)(?![_]+$)[0-9A-Za-z_]{5,22}$/.test(value)) {
        return callback(new Error('5~22位数字、字母、下划线组合'))
      } else {
        return callback()
      }
    }
  },
  textNumValidator (rule, value, callback) {
    if (value.length > 200) {
      return callback(new Error('字符个数过长,最多200个字符'))
    } else {
      return callback()
    }
  },
  sasCompanyNameValidator (rule, value, callback) {
    if (!value) {
      return callback(new Error('请输入公司名称'))
    } else {
      if (!/^[a-zA-Z0-9\u4e00-\u9fa5-_()]+$/.test(value)) {
        return callback(new Error('只能包含中文、英文、数字、下划线、中划线、英文括弧字符'))
      } else if (value.length > 60) {
        return callback(new Error('字符个数过长,最多60个字符'))
      } else {
        return callback()
      }
    }
  },
  sasContactPersonValidator (rule, value, callback) {
    if (!value) {
      return callback(new Error('请输入联系人姓名'))
    } else {
      if (!/^[a-zA-Z0-9\u4e00-\u9fa5-_()]+$/.test(value)) {
        return callback(new Error('只能包含中文、英文、数字、下划线、中划线、英文括弧字符'))
      } else if (value.length > 30) {
        return callback(new Error('字符个数过长,最多30个字符'))
      } else {
        return callback()
      }
    }
  },
  sasIntroductionValidator (rule, value, callback) {
    if (!value) {
      return callback()
    } else {
      if (!/^[a-zA-Z0-9\u4e00-\u9fa5-_()，。！,.!]+$/.test(value)) {
        return callback(new Error('只能包含中文、英文、数字、下划线、中划线、英文括弧字符、中英文状态下，。！字符'))
      } else if (value.length > 200) {
        return callback(new Error('字符个数过长,最多200个字符'))
      } else {
        return callback()
      }
    }
  },
  durationValidator (rule, value, callback) {
    if (!value) {
      return new Error('请输入天数')
    } else {
      if (!/^[0-9]+$/.test(value)) {
        callback(new Error('请输入整数'))
      } else {
        if (value < 0) {
          callback(new Error('不能小于0'))
        } else if (value > 99) {
          callback(new Error('不能大于99'))
        } else {
          callback()
        }
      }
    }
  }
}
