# 图片压缩网站 | Image Compressor

这是一个简单易用的在线图片压缩工具，可以帮助用户快速压缩图片文件大小而尽量保持图片质量。支持中文和英文界面。

This is a simple and easy-to-use online image compression tool that helps users quickly reduce image file sizes while maintaining quality. Supports both Chinese and English interfaces.

## 功能特点 | Features

- 支持上传 PNG、JPG 等常见图片格式
- 提供原图和压缩后图片的预览
- 显示压缩前后的文件大小对比
- 允许用户自定义压缩质量/比例
- 支持压缩后图片的下载
- 简洁美观的苹果风格界面设计
- **多语言支持**：中文和英文界面切换

- Supports uploading common image formats like PNG and JPG
- Provides previews of both original and compressed images
- Displays file size comparison before and after compression
- Allows users to customize compression quality/ratio
- Supports downloading the compressed images
- Clean and beautiful Apple-style interface design
- **Multilingual support**: Switch between Chinese and English interfaces

## 页面结构 | Page Structure

### 主页 (index.html)

主页采用简洁的单页面设计，包含以下主要区域：

1. **语言切换区域**：右上角的语言切换按钮
2. **头部区域**：包含网站标题和简短介绍
3. **上传区域**：拖放上传框和上传按钮
4. **压缩设置区域**：压缩质量滑块控制
5. **预览区域**：左侧原图预览，右侧压缩后图片预览
6. **信息区域**：显示文件名、格式、压缩前后大小等信息
7. **操作区域**：下载按钮和重新上传按钮
8. **底部区域**：简单的版权信息

The homepage uses a clean single-page design, including the following main areas:

1. **Language Switcher**: Language toggle button in the top-right corner
2. **Header Area**: Contains website title and brief introduction
3. **Upload Area**: Drag-and-drop upload box and upload button
4. **Compression Settings Area**: Compression quality slider control
5. **Preview Area**: Original image preview on the left, compressed image preview on the right
6. **Information Area**: Displays filename, format, before/after size, etc.
7. **Action Area**: Download button and re-upload button
8. **Footer Area**: Simple copyright information

## 技术实现 | Technical Implementation

- 使用纯 HTML5、CSS3 和 JavaScript 实现，无需后端服务器
- 采用 HTML5 File API 处理文件上传
- 使用 Canvas API 进行图片压缩处理
- 使用 CSS Flexbox 和 Grid 实现响应式布局
- 应用苹果风格的设计元素：圆角、浅色阴影、磨砂玻璃效果等
- **国际化实现**：使用 JavaScript 国际化模块处理多语言文本和语言切换

- Implemented with pure HTML5, CSS3, and JavaScript, no back-end server required
- Uses HTML5 File API for file uploads
- Uses Canvas API for image compression processing
- Uses CSS Flexbox and Grid for responsive layout
- Applies Apple-style design elements: rounded corners, light shadows, frosted glass effects, etc.
- **Internationalization**: Uses JavaScript i18n module to handle multilingual text and language switching

## 文件结构 | File Structure

```
/
├── index.html        # 主页面
├── css/
│   └── style.css     # 样式文件
├── js/
│   ├── script.js     # 主要脚本文件
│   └── i18n/         # 国际化相关文件
│       ├── i18n.js   # 国际化核心逻辑
│       ├── zh-CN.js  # 中文语言包
│       └── en-US.js  # 英文语言包
├── img/              # 网站使用的图标和资源
└── README.md         # 项目说明文档
```

## 使用方法 | How to Use

1. 打开网站首页
2. 选择您喜欢的语言界面（中文或英文）
3. 点击上传按钮或将图片拖放到指定区域
4. 调整压缩质量/比例滑块
5. 预览压缩效果和文件大小变化
6. 满意后点击下载按钮保存压缩后的图片

1. Open the website homepage
2. Choose your preferred language interface (Chinese or English)
3. Click the upload button or drag and drop images to the designated area
4. Adjust the compression quality/ratio slider
5. Preview the compression effect and file size changes
6. When satisfied, click the download button to save the compressed image 