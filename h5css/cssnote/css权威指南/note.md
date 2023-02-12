## 选择器
---

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

### 相邻兄弟选择器（没用过）
  h1 + h2 {color: red}
  将**紧挨着**h1后的h2文本改为红色
### 一般兄弟选择器
  h1 + h2 {color: red}
  将**所有**与h1同级的h2文本改为红色

**以上两种兄弟选择器最多有两级**
## 盒模型
---
  <img src="../../../assets/img/box_model.png" />
  <img src="../../../assets/img/standard_box_model.png" />
  <img src="../../../assets/img/ie_box_model.png" />

## 伪类伪元素
---

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


## 伪类伪元素 （2）
---

### 伪类
- :active
  匹配被用户激活的元素。当浏览器检测到元素被激活时给出反馈。当用户行为是鼠标点击时，代表用户按下键和松开键之间的时间。
  常用于\<a>、\<button>中，其他元素同样可使用，部分元素无效，如image

**当和伪类:link,:hover,:visited一起使用时，注意顺序,:link -->:visited-->:hover-->:active**

- :any-link (dev)
  匹配有链接锚点的元素，即具有 href 属性的元素。

- :autofill
  匹配被浏览器自动填充的 input 元素，当用户改变input中的字段时，匹配失效

- :blank (dev risk)
  匹配用户输入为空的 input 元素。
  **目前多数浏览器不支持**
- checked 
  匹配任何处于选中状态的 radio(\<input type="radio">), checkbox (\<input type="checkbox">) select 中的 option

- current (unknown)

- default
  匹配一组相关元素中默认的**表单元素**
  通常使用在 \<button>, \<input type="checkbox"> \<input type="radio"> select中的option

- defined
  匹配所有已定义的元素。包括浏览器内置的元素（div, p等）和用户自定义的元素(通过CustomerElementRegister.define())。

  当页面中自定义元素需要一些时间时，通常采取以下办法避免样式问题：
  ```
  customer-element:not(:defined) {
    display: none
  }

  customer-element:defined {
    display: block
  }

  ```
  - :dir() (dev risk)
  匹配特定问题书写方向的元素

  - :disabled
  匹配被禁用的元素。
  如果一个元素不能被激活（如选择、点击或接受文本输入）或获取焦点，则该元素处于被禁用状态。元素还有一个启用状态（enabled state），在启用状态下，元素可以被激活或获取焦点。
  
  - :empty
  匹配无子元素的元素。
  子元素只可以时元素节点或文本（包括空格）。
  多数浏览器不可匹配带有空格的文本元素。

  - :enabled
  匹配被启用的元素。（与disabled对应）

  - :first 
  @page:first {

  }
  打印时，第一页的样式;只可改变以下css属性:
  margin, orphans, windows, 文档何时换页

  - :first-child
  匹配一组兄弟元素中的第一个子元素

  - first-of-type 
  匹配父元素下第一个特定类型的元素。
  ```
    p:first-of-type {
      color:red
    }
  ```
  所匹配到的p元素均是其父元素下的第一个p元素

  - :fullscreen (dev risk)
  匹配当前处于全屏显示模式的元素。

  - :future (unknown)

  - :focus
  匹配当前获得焦点的元素。

  - :focus-visible
  当元素匹配:focus且客户端(UA)的启发式引擎决定当前焦点应当可见时，:focus-visible生效。
  通常用于元素通过不同方式(鼠标或键盘)获取焦点的不同显示方式。
  如button或自定义元素可使用:focus-visible元素定义键盘操作时获取焦点的样式。

  - :focus-within
  匹配获取焦点或其子元素获取焦点的元素。

  - :has(\<relative-selector-list>)
  匹配满足选择器参数条件的元素。
  h1:has(+h2) 表示后面紧跟着h2元素的h1元素

  - :host //todo 补完 shadow dom 后填坑

  - :host() // todo

  - :host-context() // todo

  - :hover
  适用于用户使用指示设备虚指一个元素（没有激活它）的情况。
  用户的可视客户端比如 Firefox, Internet Explorer, Safari, Opera or Chrome，会在光标（鼠标指针）悬停在元素上时提供关联的样式。

  - :indeterminate
  匹配状态不确定的表单元素。

  - :in-range
  代表一个 \<input> 元素，其当前值处于属性min 和max 限定的范围之内。

  - :invalid
  表示任意内容未通过验证的 \<input> 或其他 \<form> 元素 。

  - :is(\<selector-list>)
  将选择器列表作为参数，并选择该列表中任意一个选择器可以选择的元素

  - :lang(\<language-code>)
  根据元素语言匹配元素
  ```
  <div lang="en">English Text</div>

  <style>
    div:lang(en) {
      color:red
    }
  </style>
  ```

  - :last-child
  匹配一组兄弟元素中的最后一个元素。
  
  - :last-of-type
  匹配父元素下最后一个特定类型的元素。

  - :left
  同:first,打印时使用，设置文档左侧页的css样式。
  仅可设置以下css属性：
  margin, padding, border, background

  - :link
  选中元素中的未被访问的链接。

  - local-link (dev)

  - :modal 
  匹配一个元素，该元素处于排除与外部元素的所有交互的状态，直到交互被解除。模态伪类可以同时选择多个元素，但是只有一个元素是活动的并且能够接收输入。
  
  - 


## 浮动和定位
---
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

## 网页布局
---

### Flex

Flex 是Flexible Box（弹性盒子）的缩写，用于为盒状模型提供更大的灵活性。
任何一个元素都可以指定Flex布局

```
.box {
    display: flex
}
```
行内元素也可以指定flex布局
```
.inline-box {
    display: flex
}
```

Webkit内核的浏览器设置flex布局时必须加上前缀 -webkit

```
webkit_box {
    display: -webkit-flex
}
```
将元素设置为Flex布局后，其子元素的float,clear,vertical-align属性将失效

设置为flex布局的元素称为 Flex Container，其下的子元素称为Flex Item

### Flex Container属性

| 属性名称        | 值                                            | 效果     |
|----------------|-----------------------------------------------|----------|
| flex-direction | row（默认） row-reverse column column-reverse | 主轴方向  |
| flex-wrap      | nowrap(默认，不换行) wrap（换行，第一行在上） wrap-reverse（换行，第一行在上）  | 是否换行 如何换行|
| flex-flow      |   {flex-direction} {flex-wrap}             | flex-direction与flex-wrap的简写
| justify-content| flex-start(默认，从主轴开始方向排列) flex-end（从主轴结束方向排列） center（居中排列） space-between（两端对齐，items之间间距相同） space-around（items两侧之间间隔相等） | flex items在主轴上的排列方式  |
|align-items | flex-start(从交叉轴起点对齐) flex-end(从交叉轴终点对齐) center（交叉轴中点对齐） baseline（item第一行的基线对齐） stretch（默认值，若未item设置高度/宽度或设置为auto,则沾满整个容器的高度，交叉轴开始方向对齐） | 在交叉轴上的对齐方式 |
| align-content | flex-start flex-end center space-between space-around stretch  | 多行的对齐方式，若items只有一行，则属性无效 | 
|


 #### align-items与align-content的区别 
 因align-items在 Flex Items 多行排列时生效，且当Flex Items在交叉轴方向占满Container时，两者并无差别，故以下只考虑Flex Items多行排列且交叉轴方向扔有剩余空间的情况。以

 ```
 <body>
    <div class="my_block_box">
        <div class="son" style="background:blue;">块子元素1</div>
        <div class="son" style="background:yellow">块子元素2</div>
        <div class="son" style="background:green">块子元素3</div>
        <div class="son" style="background:blue">块子元素4</div>
        <div class="son" style="background:green">块子元素5</div>
        <div class="son" style="background:yellow">块子元素6</div>
        <div class="son" style="background:green">块子元素7</div>
        <div class="son" style="background:blue">块子元素8</div>
    </div>
</body>
    
<style>
    .son {
        height: 50px;
    }
    .my_block_box{
        height: 200px;
        width: 300px;
        background-color: red;
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        align-items: center; //仅改变了此属性
    }
</style>
 ```
 <image src="../../../assets/img/align_content.png" />
 
**默认为每一行平均分配其占据的高度，每一行的Flex Items在其所在行交叉轴方向居中对齐**

```
<body>
    <div class="my_block_box">
        <div class="son" style="background:blue;">块子元素1</div>
        <div class="son" style="background:yellow">块子元素2</div>
        <div class="son" style="background:green">块子元素3</div>
        <div class="son" style="background:blue">块子元素4</div>
        <div class="son" style="background:green">块子元素5</div>
        <div class="son" style="background:yellow">块子元素6</div>
        <div class="son" style="background:green">块子元素7</div>
        <div class="son" style="background:blue">块子元素8</div>
    </div>
</body>
    
<style>
    .son {
        height: 50px;
    }
    .my_block_box{
        height: 200px;
        width: 300px;
        background-color: red;
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        align-content: center; //仅改变了此属性
    }
```
<image src="../../../assets/img/align_items.png" />

**将所有行当作一行，交叉轴居中对齐**

 ### Flex items的属性

 | 属性值 | 值 | 效果 |
 | ------- | --------- | --------- |
 | order   | 整数(默认为0) | 按照数值由小到大排列 |
 | flex    |   非负数（默认为0）   | 按照flex的比例分配主轴上的空间   |
 | flex-grow| 非负数（默认0）      | container主轴方向上有剩余空间时，item的放大比例， 0不放大 |
 | flex-shrink | 非负数（默认1）   | container主轴方向空间不足时，item的缩小比例，0不缩小 |
 | flex-basis | \<length> OR auto | 属性定义了在分配多余空间之前，项目占据的主轴空间（main size）(优先级高于height与width,受限制与min-width和max-width)|
 | flex | none OR \<flex-grow> \<flex-shrink> \<flex-basis>(默认为 0 1 auto;该属性有两个快捷值：auto (1 1 auto) 和 none (0 0 auto)。) | flex-grow flex-shrink flex-basis的简写，后两个属性可选 |
 | align-self | auto flex-start flex-end center baseline stretch(默认auto,继承container的align-item属性) | 为项目单独定义对齐方式，与container的align-item效果相同（除auto）  |

### Grid布局

网格布局（Grid）划分成一个个网格，可以任意组合不同的网格，做出各种各样的布局。

同Flex布局，以下将采用Grid布局的容器称为Container，其下的子元素称为Item.

为一个容器指定grid布局
```
.box {
    display: grid
}
```
为一个行内元素指定grid布局
.box {
    display: inline-grid
}
**将容器设置为grid布局后，item的float,display:inline-block,display:table-cell,vertical-align,column-[]会失效**


### 容器属性
| 属性 | 值 | 效果 |
| ----------------- | --------------- | ---------------|
| grid-template-rows |    长度列   | 规定Container的行数和行高 |
| grid-template-columns| 长度列    | 规定Container的列数和列宽 |
| row-gap (原 grid-row-gap)      | \<length>   | 规定行间距 |
| column-gap (原 grid-column-gap)       | \<length>   | 规定列间距 |
| gap 原 (grid-gap) | \<length> \<length> | \<grid-row-gap> \<grid-column-gap>(若忽略了第二个值则浏览器认为第二个值等于第一个值)  |
| grid-template-areas | 详述如下 | 规定区域 |
| grid-auto-flow | row (默认) column row-dense column-dense | items的排列方式 |
| justify-items | start end center stretch（没有指定大小时，占满整个单元格） | 单元格内容的水平对齐方式 |
| align-items | 同 justify-items | 单元格内容的垂直对齐方式 |
| place-items | \<justify-items> \<align-items> | justify-items 与 align-items 的简写方式 (若只写一个值，浏览器认为是两个一样的值)|
| justify-content | start \| end \| center \| stretch \| space-around \| space-between \| space-evenly | 将网格内容看作一个整体，这个整体在container中的水平对齐方式 |
| align-content | 同 justify-content | 整体在container中的垂直对齐方式 |
| place-content | \<justify-content> \<align-content> | 类 place-items |
| grid-auto-rows | /<length> | 规定范围之外，浏览器自动创建的网格的行高（不指定则又单元格内容决定） |
| grid-auto-columns | </length> | 类 grid-auto-columns |
| grid-template | \<grid-template-columns> \<grid-template-rows> \<grid-template-areas> | 简写形式，不常用 |
| grid | \<grid-template-rows> \<grid-template-columns> \<grid-template-areas> \<grid-auto-row> \<grid-auto-columns> \<grid-auto-flow> | 简写形式，不常用 |

#### grid-template-rows、grid-template-columns属性值
- 绝对单位
```
.container {
    display: gird;
    grid-template-rows: 100px 200px 300px
    grid-template-columns: 300px 200px 100px
}
```
- 百分数 
```
 .container {
    display: gird;
    grid-template-rows: 30% 20% 50%
    grid-template-columns: 50% 30% 20%
}
```
- repeat函数
```
.container {
    display: gird;
    grid-template-rows: repeat(3,100px)
    grid-template-columns: repeat(3,200px)
}
```
- auto-fill
```
.container {
    display: grid;
    grid-template-columns: repeat(auto-fill, 100px)
}
```
每列宽度为100px,每行尽可能有更多的列
- fr
fr,即 fraction, 按照数值比例评分余下空间
```
.container {
    display: grid;
    grid-template-columns: 100px 1fr 2fr
}
```
- minmax函数
```
.container {
    display: grid;
    grid-template-columns: 1fr 1fr minmax(100px,200px)
}
```
minmax(100px,200px)表示列宽在100px到200px之间
- auto
```
.container {
    display: grid;
    grid-template-columns: 100x auto 100px
}
```
- 网格线名称
```
.container {
    display: grid;
    grid-template-columns: [c1] 100px [c2] 100px [c3] auto [c4]; 
    grid-template-rows: [r1] 100px [r2] 100px [r3] auto [r4]
}
```
[cn] [rn] 是为网格线起的名字，可以是任何合法字符
- 布局实例
.container {
    display: grid;
    grid-template-columns: 70% 30%
    grid-template-columns: 20% 80%
}

### grid-template-areas 属性值

```
<div class="container">
    <div style="background: orange; grid-area: f">item6</div>
    <div style="background: yellow; grid-area: a">item1</div>
    <div style="background: white; grid-area: b">item2</div>
    <div style="background: blue; grid-area: c">item3</div>
    <div style="background: purple; grid-area: e">item5</div>
    <div style="background: green; grid-area: d">item44</div>
    <div style="background: red; grid-area: d">item4</div>
</div>


<style>
    .container {
        display: grid;
        grid-template-areas: 
            "a b c"
            "d e f";
    }
</style>
```
<image src="../../../assets/img/grid_template_areas.png" />

- 若items指定了所在区域，即设置了 grid-area 属性，则 items 的排列与其在 html 中的排列无关
- 若有多个item 指定了同一个区域， 即 grid-area 属性值相同，则排列在 html 后面的item 覆盖之前的

### item 属性

| 属性 | 值 | 效果 |
| ------- | -------- | ------ |
| grid-row-start | 线次序 线名称 span (起始侧到结束侧跨越的网格数，设置在start和column上效果一致) | 行起始侧边框（上边框）所在的网格线 |
| grid-row-end | 同上 | 行结束测边框（下边框）所在的网格线 |
| grid-column-start | 同上 | 列起始测边框（左边框）所在的网格线 |
| grid-column-end | 同上 | 列结束测边框（右边框）所在的网格线 |
| grid-row | \<grid-row-start> / \<grid-row-end> | 简写 |
| grid-column | \<grid-column-start> / \<grid-column-end> | 简写 |
| grid-area | 所在区域名称 | item所在的区域 （container 有 grid-template-areas 属性） |
| justify-self | 同 container 的 justify-items | 同 container 的 justify-items，作用于单个item  |
| align-self | 同 container 的 align-items | 同 container 的 align-items，作用于单个item  |
| place-self | \<justify-self> \<align-self> | 简写 |


## Shadow Dom