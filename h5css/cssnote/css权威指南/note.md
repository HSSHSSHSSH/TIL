## 选择器

### 并集选择器
    h1,p {color:red}
    将所有h1和p下的文本颜色改为红色
### 后代选择器

    h1 em {color: red}
    将h1下所有的em元素文本颜色改为红色
    
    ol li a {color:red}
    ol下的所有li下的所有a文本改为红色

### 子元素选择器

    h1 > em {color: red}
    
    将h1所有em子元素文本颜色改为红色
    
    ol > li > a {color: red}
    将ol下所有子元素li下所有子元素a的文本颜色改为红色

### 兄弟选择器（没用过）
    h1 + h2 {color: red}
    将紧挨着h1后的h2文本改为红色
    
    h1 + h2 + h3 {color: red}
    将紧挨着h1后的紧挨着h2后的h3元素文本改成红色

## 盒模型
  <img src="../../../assets/img/box_model.png" />

## 伪类伪元素

   ### 静态伪类
   与用户行为无关
   ::first-child 选择第一个子元素
        p::first-child {color: red}  将任何元素的第一个p元素文字颜色改为红色

        p > i::first-child {color:red} 将所有p元素下的第一个i元素文字颜色改为红色
    
        p::first-child i {color:red} 将任何选择器下的第一个p元素下所有的i元素文字颜色改为红色
    ::lang 为不同的语言定义规则
   #### 链接伪类

    a::link {color: blue} 未访问的链接为蓝色
    a::visited {color: red} 已访问的链接颜色为红色
    注意：无href属性的a不受伪类影响 （不常用）
   ### 动态伪类
    多用于根据用户行为改变文档外观
    
    ::focus 拥有输入焦点的颜色
    ::hover 鼠标悬停在文档上的样式
    ::active 被用户激活的元素


   ### 链接伪类顺序
    link-visited-hover-active

   ### 伪元素
   为元素能够在文档中插入假象的元素，从而得到某种效果

   ::first-letter
    p::first-letter {color: red} 将元素p内文本的第一个字符颜色改为红色

   ::first-line
    p::first-line {color: red} 将元素p内文本的第一行文字符颜色改为红色
   ::before
    p::before {content: "{{"} 在p元素之前添入内容 "{{"
   ::after
    p::after {content: "}}"} 在p元素之后添入内容 "}}"

   **before与after创建的伪元素属于行内元素,且必须有content属性**
   #### first-letter 与 first-line 的使用限制
   所允许的属性：
   | first-letter |first-line|
   |--------------|----------|
   |所有font属性   |所有font属性|
   |color   |  color  |
   |background   |  background |
   |所有margin属性   | word-spacing  |
   |所有padding属性  | letter-spacing |
   |所有border属性   | text-decoration  |
   |vertical-align (float:none)   | vertical-align  |
   |text-transform   |  text-transform  |
   |line-height   | line-height  |
   |float   |clear  (仅使用与css2)|
   |letter-spacing (css2.1新增)  | text-shadow  |
   |word-spacing (css2.1新增)   |------------ |
   |clear (仅适用css2)   |------------ |
   |text-shadow (仅适用css2)   |------------ |

   所有伪元素都需放在选择器的最后
   eg:: p:first-child em {color:red} 不合法


## 浮动和定位

   ### 浮动 (float)
   **定义元素相对于其原本位置、父元素、其他元素、浏览器窗口的位置**

   | float |----|
   |-------|----|
   |  值   | left right none inherit|
   |  初始值|  none  |
   | 应用 | 所有元素 |
   | 继承性 |  无  |
   | 计算值  | 根据指定确定   |

   1. 设置浮动的元素会脱离标准流
   2. 若多个元素设置浮动，则按照属性值一行显示且顶端对齐
   3. 浮动元素具有行内块元素特点

   **浮动通常与标准流的父元素配合使用，如父元素上下排列，浮动子元素左右排列**
   **通常一个元素设置了浮动，其余兄弟元素也要设置浮动**

   #### 清除浮动
   当父元素需自动检测子元素的高度时，需要清除浮动
   清除浮动的方法有：
   1. 额外标签

    在浮动元素末尾添加一个空标签,此标签具有属性 style="clear: both|left|right|inherit"
    其中：
        left: 左侧不允许浮动
        right: 右侧不允许浮动
        both: 两侧不允许浮动
        none: 默认值,允许两侧浮动
        inherit: 继承父元素clear属性
   2. 父元素添加overflow属性
      overflow: hidden | auto |scroll
   3. 父元素添加after伪元素
      ```
      .father: { // IE6 7 专有
        zoom: 1
      }
      .father:after {
        content: "";
        display: block;
        height: 0;
        clear: both;
        visibility: hidden
      }
      ```
      相当于升级版的额外标签法
   4. 父元素添加双伪元素
      **浮动元素均会转化为行内块元素**
   ### 定位
    **准确的定义元素框相对于父元素，另一个元素，或浏览器窗口的位置**
    **定位 = 定位模式 + 偏移量**

   | position |----|
   |-------|----|
   |  值   | static relative absolute fixed inherit|
   |  初始值|  static  |
   | 应用 | 所有元素 |
   | 继承性 |  无  |
   | 计算值  | 根据指定确定   |

    - static
        元素框正常生成，无偏移量，遵循标准流规则
    - relative
        元素框位置保留在标准流中，元素相对其原本位置（在标准流中的位置）进行偏移
    - absolute
        元素框脱离标准流，偏移量相对其有定位(relative absolute fixed)的祖先元素或根元素（html）,元素定位后转化为行内块级元素
    - fixed
        元素框表现类似与absolute,偏移量相对与视窗
    - inherit
        position属性与其父元素相同
        **是父元素，而非祖先元素**

