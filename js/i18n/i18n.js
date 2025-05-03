// 支持的语言
const supportedLanguages = ['zh-CN', 'en-US'];

// 当前语言
let currentLanguage = localStorage.getItem('language') || navigator.language || 'zh-CN';

// 确保语言存在于支持列表中
if (!supportedLanguages.includes(currentLanguage)) {
    // 如果完全不匹配，尝试只匹配主要语言代码
    const mainLang = currentLanguage.split('-')[0];
    const matchedLang = supportedLanguages.find(lang => lang.startsWith(mainLang));
    
    // 如果匹配不到，默认使用中文
    currentLanguage = matchedLang || 'zh-CN';
}

// 保存语言设置到本地存储
localStorage.setItem('language', currentLanguage);

// 翻译函数
function t(key) {
    const translations = currentLanguage === 'zh-CN' ? zhCN : enUS;
    return translations[key] || key;
}

// 切换语言
function switchLanguage(lang) {
    if (supportedLanguages.includes(lang) && lang !== currentLanguage) {
        currentLanguage = lang;
        localStorage.setItem('language', lang);
        updatePageTexts();
    }
}

// 更新页面上的所有文本
function updatePageTexts() {
    // 更新文档标题
    document.title = t('title');
    
    // 更新所有带data-i18n属性的元素
    const elementsToTranslate = document.querySelectorAll('[data-i18n]');
    elementsToTranslate.forEach(element => {
        const key = element.getAttribute('data-i18n');
        if (key) {
            element.textContent = t(key);
        }
    });
    
    // 更新属性型文本（如占位符、alt等）
    const elementsWithAttributes = document.querySelectorAll('[data-i18n-attr]');
    elementsWithAttributes.forEach(element => {
        const attrs = element.getAttribute('data-i18n-attr').split(',');
        attrs.forEach(attr => {
            const [attrName, key] = attr.split(':');
            if (attrName && key) {
                element.setAttribute(attrName, t(key));
            }
        });
    });
} 