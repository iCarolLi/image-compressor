// 获取DOM元素
const dropZone = document.getElementById('dropZone');
const fileInput = document.getElementById('fileInput');
const uploadSection = document.getElementById('uploadSection');
const imageProcessing = document.getElementById('imageProcessing');
const qualitySlider = document.getElementById('qualitySlider');
const qualityValue = document.getElementById('qualityValue');
const compressBtn = document.getElementById('compressBtn');
const downloadBtn = document.getElementById('downloadBtn');
const resetBtn = document.getElementById('resetBtn');
const originalImage = document.getElementById('originalImage');
const compressedImage = document.getElementById('compressedImage');
const originalFilename = document.getElementById('originalFilename');
const originalSize = document.getElementById('originalSize');
const originalDimensions = document.getElementById('originalDimensions');
const compressedSize = document.getElementById('compressedSize');
const compressedDimensions = document.getElementById('compressedDimensions');
const compressionRate = document.getElementById('compressionRate');
const currentYear = document.getElementById('currentYear');
const langToggle = document.getElementById('langToggle');
const languageDropdown = document.querySelector('.language-dropdown');
const langOptions = document.querySelectorAll('.lang-option');

// 全局变量
let originalFile = null;
let compressedBlob = null;

// 初始化
document.addEventListener('DOMContentLoaded', () => {
    // 设置当前年份
    currentYear.textContent = new Date().getFullYear();
    
    // 初始化国际化
    initI18n();
    
    // 拖放上传事件处理
    setupDragAndDrop();
    
    // 文件选择事件处理
    fileInput.addEventListener('change', handleFileSelect);
    
    // 压缩质量滑块事件处理
    qualitySlider.addEventListener('input', () => {
        qualityValue.textContent = qualitySlider.value;
    });
    
    // 压缩按钮事件处理
    compressBtn.addEventListener('click', compressImage);
    
    // 下载按钮事件处理
    downloadBtn.addEventListener('click', downloadCompressedImage);
    
    // 重置按钮事件处理
    resetBtn.addEventListener('click', resetApp);
});

// 初始化国际化
function initI18n() {
    // 初始化语言文本
    updatePageTexts();
    
    // 高亮当前语言选项
    updateLanguageIndicator();
    
    // 语言切换按钮点击事件
    langToggle.addEventListener('click', () => {
        languageDropdown.classList.toggle('show');
    });
    
    // 语言选项点击事件
    langOptions.forEach(option => {
        option.addEventListener('click', () => {
            const lang = option.getAttribute('data-lang');
            switchLanguage(lang);
            updateLanguageIndicator();
            languageDropdown.classList.remove('show');
        });
    });
    
    // 点击页面其他地方关闭语言下拉菜单
    document.addEventListener('click', (e) => {
        if (!langToggle.contains(e.target) && !languageDropdown.contains(e.target)) {
            languageDropdown.classList.remove('show');
        }
    });
}

// 更新语言指示器
function updateLanguageIndicator() {
    langOptions.forEach(option => {
        const lang = option.getAttribute('data-lang');
        if (lang === currentLanguage) {
            option.classList.add('active');
        } else {
            option.classList.remove('active');
        }
    });
}

// 设置拖放上传
function setupDragAndDrop() {
    // 拖动进入区域
    dropZone.addEventListener('dragenter', (e) => {
        e.preventDefault();
        e.stopPropagation();
        dropZone.classList.add('drag-over');
    });
    
    // 拖动在区域上方
    dropZone.addEventListener('dragover', (e) => {
        e.preventDefault();
        e.stopPropagation();
        dropZone.classList.add('drag-over');
    });
    
    // 拖动离开区域
    dropZone.addEventListener('dragleave', (e) => {
        e.preventDefault();
        e.stopPropagation();
        dropZone.classList.remove('drag-over');
    });
    
    // 拖放释放
    dropZone.addEventListener('drop', (e) => {
        e.preventDefault();
        e.stopPropagation();
        dropZone.classList.remove('drag-over');
        
        const files = e.dataTransfer.files;
        if (files.length > 0) {
            handleFile(files[0]);
        }
    });
    
    // 点击上传区域触发文件选择
    dropZone.addEventListener('click', () => {
        fileInput.click();
    });
}

// 处理文件选择事件
function handleFileSelect(e) {
    const files = e.target.files;
    if (files.length > 0) {
        handleFile(files[0]);
    }
}

// 处理选择的文件
function handleFile(file) {
    // 验证文件类型
    if (!file.type.match('image/jpeg') && !file.type.match('image/png')) {
        alert(t('formatError'));
        return;
    }
    
    originalFile = file;
    
    // 显示图片处理区域，隐藏上传区域
    uploadSection.style.display = 'none';
    imageProcessing.style.display = 'block';
    
    // 加载并显示原始图片
    displayOriginalImage(file);
}

// 显示原始图片及其信息
function displayOriginalImage(file) {
    const reader = new FileReader();
    reader.onload = (e) => {
        // 设置原始图片预览
        originalImage.src = e.target.result;
        
        // 加载图片以获取尺寸
        const img = new Image();
        img.onload = () => {
            // 显示原始图片信息
            originalFilename.textContent = file.name;
            originalSize.textContent = formatFileSize(file.size);
            originalDimensions.textContent = `${img.width} × ${img.height} ${t('dimensions')}`;
            
            // 重置压缩后的图片信息
            compressedImage.src = '';
            compressedSize.textContent = t('waitingCompress');
            compressedDimensions.textContent = t('waitingCompress');
            compressionRate.textContent = t('waitingCompress');
            
            // 禁用下载按钮
            downloadBtn.disabled = true;
        };
        img.src = e.target.result;
    };
    reader.readAsDataURL(file);
}

// 压缩图片
function compressImage() {
    if (!originalFile) return;
    
    const reader = new FileReader();
    reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
            // 创建Canvas进行压缩
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            
            // 设置Canvas尺寸与原图一致
            canvas.width = img.width;
            canvas.height = img.height;
            
            // 在Canvas上绘制图片
            ctx.drawImage(img, 0, 0, img.width, img.height);
            
            // 获取压缩质量
            const quality = parseInt(qualitySlider.value) / 100;
            
            // 根据原始图片类型确定输出格式
            const mimeType = originalFile.type;
            
            // 压缩图片
            canvas.toBlob((blob) => {
                if (blob) {
                    compressedBlob = blob;
                    
                    // 显示压缩后的图片
                    const compressedURL = URL.createObjectURL(blob);
                    compressedImage.src = compressedURL;
                    
                    // 显示压缩后的图片信息
                    compressedSize.textContent = formatFileSize(blob.size);
                    compressedDimensions.textContent = `${img.width} × ${img.height} ${t('dimensions')}`;
                    
                    // 计算压缩率
                    const ratio = (1 - (blob.size / originalFile.size)) * 100;
                    compressionRate.textContent = `${ratio.toFixed(2)}%`;
                    
                    // 启用下载按钮
                    downloadBtn.disabled = false;
                }
            }, mimeType, quality);
        };
        img.src = e.target.result;
    };
    reader.readAsDataURL(originalFile);
}

// 下载压缩后的图片
function downloadCompressedImage() {
    if (!compressedBlob) return;
    
    // 创建下载链接
    const link = document.createElement('a');
    link.href = URL.createObjectURL(compressedBlob);
    
    // 生成文件名
    const originalName = originalFile.name;
    const extension = originalName.slice(originalName.lastIndexOf('.'));
    const nameWithoutExt = originalName.slice(0, originalName.lastIndexOf('.'));
    link.download = `${nameWithoutExt}_${t('compressedSuffix')}${extension}`;
    
    // 触发下载
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

// 重置应用
function resetApp() {
    // 显示上传区域，隐藏图片处理区域
    uploadSection.style.display = 'block';
    imageProcessing.style.display = 'none';
    
    // 重置文件输入
    fileInput.value = '';
    
    // 重置全局变量
    originalFile = null;
    compressedBlob = null;
    
    // 重置压缩质量滑块
    qualitySlider.value = 80;
    qualityValue.textContent = '80';
}

// 格式化文件大小
function formatFileSize(bytes) {
    if (bytes === 0) return '0 Bytes';
    
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
} 