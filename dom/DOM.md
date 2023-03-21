# DOM

## 第三章

getElementById()，按照id属性查找文档中唯一的标签。

getElementsByTagName(), 按照标签名查找文档中的一组标签。

element.getAttribute('attributeName'), 查询 elememt 的名为 attrbuteName 的属性的值。

element.setAttribute('attributeName', value), 将 element的名为 attributeName 的属性的值改为 value.

## 第四章

element.childNodes(), 返回 element 的所有子元素.

element.nodeType(), 返回 element 的节点类型；返回值为数字；nodeType的值有12个，常用的有: 1 => 元素节点、2 => 属性节点、 3 => 文本节点。

element.nodeValue, 通常在文本节点上使用，返回文本节点中文本的值。

element.firstChild/lastChild(), 返回阶段的第一个/最后一个元素。 
