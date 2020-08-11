import React from 'react'
import IntlMessageFormat from 'intl-messageformat'

String.prototype.defaultMessage = String.prototype.d = function (msg) {
  return this || msg || ''
}

class ReactIntl {
  constructor() {
    this.options = {
      currentLocale: null, // 翻译的语言类型
      locales: {}, // app locale data like {"en":{"key1":"value1"},"zh":{"key1":"值1"}}
    }
  }

  /**
   *获取key对应的翻译
   * @param {string} key 不同语言的key相同且唯一
   * @param {object} variables 可进行替换的参数.传参的个数和属性名应与翻译相对应 eg {age:20}
   */

  get(key, variables) {
    const { locales, currentLocale, formats } = this.options

    if (currentLocale && locales[currentLocale] && key) {
      const msg = this.getDescendantProp(locales[currentLocale], key)

      try {
        const msgFormatter = new IntlMessageFormat(msg, currentLocale, formats)

        return msgFormatter.format(variables)
      } catch (err) {
        return msg
      }
    }
  }

  /**
   * 把文本渲染到对应的HTML 标签中,默认渲染到span中
   * @param {string} key
   * @param {object} variables
   */

  getHTML(key, variables) {
    const msg = this.get(key, variables)
    if (msg) {
      const el = React.createElement('span', {
        dangerouslySetInnerHTML: {
          __html: msg,
        },
      })
      const defaultMessage = () => el

      return { ...{ defaultMessage: defaultMessage, d: defaultMessage }, ...el }
    }

    return ''
  }

  // 初始化参数
  init(options = {}) {
    Object.assign(this.options, options)

    return new Promise(resolve => {
      resolve()
    })
  }

  onChangeLanguage(value) {
    this.options.currentLocale = value
    window.location.reload()
  }

  getDescendantProp(locale, key) {
    if (locale[key]) {
      return locale[key]
    }

    const msg = key.split('.').reduce(function (a, b) {
      return a != undefined ? a[b] : a
    }, locale)

    return msg
  }

  getInitOptions() {
    return this.options
  }
}

const intl = new ReactIntl()
export default intl
