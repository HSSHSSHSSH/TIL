<template>
    <div class="login-body">
      <div class="animation-main">
        <video class="animation-video" autoplay loop muted src="https://static.ainfinit.com/phantom-ui/video/login.mp4" />
      </div>
      <div class="default-login-container">
        <div class="navigation-main">
          <img :src="`${ossImgUrl}/logo.png`" alt="">
          <div class="navigation-medium">商户管理后台</div>
        </div>
        <div class="login-redirect-scan">
          <div class="login-redirect-scan-head">
            <div class="scan-head-item" :class="{'select-item':activeState}">
              <div class="scan-head-item-lable">
                <span style="cursor:pointer;user-select: none;white-space: nowrap;" @click="cheangeActive(true)">微信登录</span>
              </div>
              <div class="scan-head-item-line" />
            </div>
            <div class="scan-head-item" :class="{'select-item':!activeState}">
              <div class="scan-head-item-lable">
                <span style="cursor:pointer;user-select: none;white-space: nowrap;" @click="cheangeActive(false)">手机登录</span>
              </div>
              <div class="scan-head-item-line" />
            </div>
          </div>
          <div class="login-redirect-scan-body">
            <div v-show="activeState">
              <div class="login-redirect-scan-item">
                <div id="login_container" ref="login_container" />
              </div>
              <div style="text-align: center">请使用微信扫一扫登录</div>
            </div>
            <div v-show="!activeState">
              <div class="login-redirect-scan-item phone-items">
                <el-form ref="from" :rules="rules" :model="phoneFrom">
                  <el-form-item prop="principal" style="margin-bottom:44px">
                    <el-input v-model="phoneFrom.principal" placeholder="输入手机号" class="redirect-input phone-input">
                      <template slot="prefix">
                        <div class="phone-title">+86</div>
                      </template>
                    </el-input>
                  </el-form-item>
                  <el-form-item prop="code" :error="notCode" style="margin-bottom:44px">
                    <el-input v-model="phoneFrom.code" placeholder="输入验证码" class="redirect-input code-input">
                      <div slot="suffix" class="get-code-div">
                        <span v-if="codeNumberState==3" style="color:#F7644A">{{ number }}</span>
                        <el-button v-else class="get-code-button" type="info" :disabled="getCodeState" :loading="codeNumberState==2" @click="clickGetCode">
                          获取验证码
                        </el-button>
                      </div>
                    </el-input>
                  </el-form-item>
                  <el-form-item class="redirect-button">
                    <el-button type="info" style="width:100%;" :loading="loginButton" :disabled="loginState" @click="phoneLogin('from')">登录</el-button>
                  </el-form-item>
                </el-form>
              </div>
            </div>
          </div>
        </div>
        <div class="putOnRecords"><a href="https://beian.miit.gov.cn">2018-2024 北京极智简单科技有限公司. All rights reserved. | 京ICP备2020047411号-2</a></div>
      </div>
    </div>
  </template>
  
  <script>
  import { param2Obj } from 'utils'
  import { getPhoneCode } from 'api/login'
  import common from 'utils/common'
  export default {
    name: 'DefaultLogin',
    data() {
      return {
        activeState: true,
        login: undefined,
        activeName: 'first',
        codeNumberState: 1,
        getCodeState: true,
        phoneFrom: {
          principal: '',
          code: '',
          grantType: 2// 1:密码;2:短信登录;3:微信扫码;4:公众号
        },
        rules: {
          principal: [
            {
              required: true,
              message: '*请输入手机号码',
              trigger: 'blur'
            },
            {
              pattern: /^1\d{10}$/,
              message: '*请正确输入手机号码',
              trigger: 'blur'
            }
          ],
          code: [
            {
              required: true,
              message: '*请输入验证码',
              trigger: 'blur'
            }
          ]
        },
        number: 60,
        rotation: '',
        loginButton: false,
        loginState: true,
        notCode: '' //* 账号可能未激活，请用短信验证码登录试一试'
      }
    },
    computed: {
      principal() {
        return this.phoneFrom.principal
      }
    },
    watch: {
      principal(principal) {
        if (/^1\d{10}$/.test(principal)) {
          this.getCodeState = false
        } else {
          this.getCodeState = true
        }
      },
      $route(to) {
        if (to.fullPath.length) {
          this.afterQRScan(to.fullPath)
        }
      }
    },
    mounted() {
      console.log('ccccode',this.$route.query.code)
      if (this.$route.query.code) {
        this.afterQRScan(this.$route.fullPath)
        return
      }
      // 初始化登陆二维码
      this.initQRScan()
      // 用来保存
      const key = 'loginTimeNumber'
      let interval = ''
  
      // 倒计时
      this.rotation = seNumber => {
        this.codeNumberState = 3
        // 如果上次有数据进行
        if (seNumber) {
          this.number = seNumber
        }
        interval = setInterval(() => {
          this.number--
          common.setKey(key, this.number)
          if (this.number === 0) {
            this.reset()
          }
        }, 1000)
      }
  
      // 重置倒计时
      this.reset = () => {
        clearInterval(interval)
        this.number = 60
        this.codeNumberState = 1
        common.setKey(key, null)
      }
      if (common.getKey(key) > 0) {
        this.rotation(common.getKey(key))
      }
    },
    methods: {
      cheangeActive(state) {
        this.activeState = state
      },
      initQRScan() {
        console.log('href', window.location.href)
        this.wxQrCodeLogin({
          id: 'login_container', // div的id
          appid: 'wx524668d6d580b7dd',
          scope: 'snsapi_login', // 写死
          redirect_uri: encodeURIComponent(window.location.href),
          state: 'STATE',
          style: 'black', // 二维码黑白风格
          href: 'https://static.justtake.shop/phantom-ui-prod/currentVersion/weixin.css'
        })
      },
      phoneLogin(formName) {
        const set = this.$refs
        set[formName].validate(valid => {
          if (valid) {
            this.loginButton = true
            this.$store.dispatch('login', this.phoneFrom).then(() => {
              this.loginButton = false
              this.$router.push({
                path: this.common.GET_REDIRECT_PATH()
              })
            }).catch(() => {
              this.loginButton = false
            })
          }
        })
      },
      clickGetCode() {
        common.localDelKey('time')
        this.codeNumberState = 2
        getPhoneCode(this.phoneFrom.principal).then(result => {
          if (result.status === 200) {
            this.$message({
              message: '验证码已发送',
              type: 'success'
            })
            this.loginState = false
            this.rotation()
          } else {
            this.codeNumberState = 1
            this.$message.error('验证码发送失败请确认手机号是否正确')
          }
        }).catch(error => {
          this.codeNumberState = 1
          if (error.response && error.response.data.status === 40004) {
            // 已经展示信息
          } else {
            this.$message.error('验证码发送失败请确认手机号是否正确')
          }
        })
      },
      /**
       * 扫码登陆
       */
      afterQRScan(path) {
        const { code } = param2Obj(path)
        if (code) {
          // 1:密码;2:短信登录;3:微信扫码;4:公众号
          this.$store.dispatch('login', { code, grantType: 3 }).then(response => {
            this.$router.push({ path: this.common.GET_REDIRECT_PATH() })
          }).catch(() => {
            this.initQRScan()
            this.activeState = false
            this.notCode = '* 账号可能未激活，请用短信验证码登录试一试'
          })
        }
      },
      wxQrCodeLogin(a) {
        console.log('aaaaa',a)
        this.$mount()
        const b = document
        let c = 'default'
        a.self_redirect === !0
          ? c = 'true'
          : a.self_redirect === !1 && (c = 'false')
        const d = b.createElement('iframe')
        let e =
          'https://open.weixin.qq.com/connect/qrconnect?appid=' +
          a.appid +
          '&scope=' +
          a.scope +
          '&redirect_uri=' +
          a.redirect_uri +
          '&state=' +
          a.state +
          '&login_type=jssdk&self_redirect=' +
          c
        e += a.style ? '&style=' + a.style : ''
        e += a.href ? '&href=' + a.href : ''
        d.src = e
        d.frameBorder = '0'
        d.allowTransparency = 'true'
        d.sandbox = 'allow-scripts allow-same-origin allow-top-navigation '
        d.scrolling = 'no'
        d.width = '266px'
        d.height = '266px'
        const f = b.getElementById('login_container')
        f.innerHTML = ''
        f.appendChild(d)
      },
      resetUrl() {
        const url = window.location.href
        const arrUrl = url.split('?')
        if (arrUrl.length > 1) {
          window.history.pushState({}, 0, arrUrl[0])
        }
      }
    }
  }
  </script>
  <style lang="scss" scoped>
  @media screen and (max-width: 1204px) {
    .login-body {
      width: 1080px !important;
    }
  }
  
  .login-body {
    width: 100vw;
    height: 100vh;
    display: flex;
  }
  
  .animation-main {
    height: 100%;
    font-size: 0;
  
    .animation-video {
      height: 100%;
    }
  }
  
  .default-login-container {
    background: #fff;
    box-sizing: border-box;
    flex: 1;
    position: relative;
  
    .navigation-main {
      display: flex;
      align-items: center;
      justify-content: flex-end;
      padding: 40px 40px 0 40px;
  
      .navigation-medium {
        height: 32px;
        font-weight: 500;
        font-size: 16px;
        line-height: 32px;
        color: #4b4b4b;
        margin-left: 16px;
        padding-left: 16px;
        border-left: 1px solid #4b4b4b;
      }
    }
  
    .putOnRecords {
      position: absolute;
      left: 0;
      right: 0;
      bottom: 40px;
      font-size: 12px;
      line-height: 24px;
      text-align: center;
      color: #8e8e8e;
    }
  }
  
  .login-redirect-scan {
    margin: 0 auto;
    width: 360px;
    height: 400px;
    position: absolute;
    top: calc((100vh - 400px) / 2);
    left: 0;
    right: 0;
  }
  
  .login-redirect-scan-head {
    width: 100%;
    height: 40px;
    line-height: 40px;
    display: flex;
    flex-direction: row;
    justify-content: center;
  
    .scan-head-item {
      text-align: center;
      font-weight: 500;
      font-size: 16px;
      line-height: 24px;
      color: #4b4b4b;
    }
    .scan-head-item-lable {
      height: 24px;
      margin: 8px 40px;
    }
    .scan-head-item-line {
      width: 62px;
      height: 2px;
      margin: 0 auto;
    }
    .select-item {
      color: #e85e2d;
    }
    .select-item .scan-head-item-line {
      background-color: #e85e2d;
    }
  }
  
  .login-redirect-scan-body {
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
  }
  
  .login-redirect-scan-item {
    width: 266px;
    height: 250px;
    margin: 0 auto;
  }
  .phone-items {
    width: 360px !important;
    margin-top: 51px !important;
  }
  .get-code-div {
    height: 40px;
    min-width: 100px;
    line-height: 40px;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    margin-right: -5px;
  
    span {
      width: 100%;
      text-align: center;
    }
  }
  </style>
  
  <style >
  .redirect-input .el-input__inner {
    border-radius: 0px;
    height: 40px;
    line-height: 40px;
    padding: 5px 8px;
    gap: 10px;
    border: 1px solid #e1e1e1;
    border-radius: 4px;
    font-size: 14px;
    color: #8e8e8e;
  }
  /* 手机号码输入框 */
  .phone-input .el-input__inner {
    padding-left: 50px;
  }
  
  .phone-title {
    height: 40px;
    width: 50px;
    line-height: 40px;
    text-align: center;
    margin-left: -5px;
  }
  
  .code-input .el-input__inner {
    padding-right: 100px;
  }
  
  .get-code-div .el-button--info {
    color: #4b4b4b;
  }
  .get-code-div .el-button.is-disabled {
    color: #c0c4cc !important;
  }
  .get-code-button {
    box-sizing: border-box;
    padding: 0 8px;
    margin-right: 11px;
    height: 24px;
    font-size: 12px;
    background: #e1e1e1 !important;
    border-color: #e1e1e1 !important;
    border-radius: 2px;
    text-align: center;
  }
  .get-code-button .el-button--info:focus,
  .el-button--info:hover {
    color: #c0c4cc;
  }
  
  .redirect-input .el-input__inner:focus,
  .redirect-input .el-input__inner:hover {
    border: 1px solid #e85e2d;
    box-shadow: 0px 0px 0px 2px #fdedef;
  }
  
  /*覆盖原生按钮颜色*/
  .redirect-button .el-button--info:focus,
  .redirect-button .el-button--info:hover {
    background-color: #f7644a;
    border-color: #f7644a;
  }
  
  .redirect-button .el-button--info:focus,
  .redirect-button .el-button--info:hover {
    background: #df9689;
    border-color: #df9689;
  }
  
  .redirect-button .el-button--info {
    background-color: #f7644a;
    border-color: #f7644a;
  }
  
  .redirect-button .el-button--info.is-active,
  .redirect-button .el-button--info:active {
    background-color: #f7644a;
    border-color: #f7644a;
  }
  .redirect-button .el-button--info.is-disabled,
  .redirect-button .el-button--info.is-disabled:hover {
    background: #df9689;
    border-color: #df9689;
  }
  </style>
  