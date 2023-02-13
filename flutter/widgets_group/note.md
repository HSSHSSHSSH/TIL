# Widgets Group

##  基础布局

---



## 文字与图片

---



## 用户输入

---



## 异步操作

---



### 进度条

#### CircularProgressIncicator（圆形进度条）

**属性**

- value

  进度，当不传时，进度条按照 Material 风格不停匀速转动，传参后按照传入参数的百分比显示，不转动，若大于1则自动修正为1。

- stroleWidth

  用于设置圆形进度条的粗细程度，默认为4.0。

- valueColor

  用于设置进度条的填充色。

  若想将主题色设置为静态的颜色，可借助 AlwaysStoppedAnimation() 函数，如 AlwaysStoppedAnimation(Colors.red)

- backgroundColor

  未被进度条填充的颜色。

**尺寸和背景**

通过为其父级设置SizedBox,Container,DecorationBox等组件来设置

**颜色动画**   todo 看完动画再填坑

属性中valueColor的值是Animation类型的值，







