function ThemeManager() {
  this.storageManager = new LocalStorageManager();
  this.setup();
}

ThemeManager.prototype.setup = function () {
  // 获取当前主题
  this.currentTheme = this.storageManager.getThemePreference();
  
  // 应用保存的主题
  this.applyTheme(this.currentTheme);
  
  // 添加主题切换按钮
  this.addThemeToggle();
};

ThemeManager.prototype.addThemeToggle = function () {
  // 创建主题切换按钮容器
  var themeToggle = document.createElement('div');
  themeToggle.className = 'theme-toggle';
  
  // 添加标签
  var label = document.createElement('span');
  label.textContent = '主题:';
  themeToggle.appendChild(label);
  
  // 添加主题选项
  var themes = [
    { name: 'default', label: '默认' },
    { name: 'teal', label: '蓝绿' }
  ];
  
  var self = this;
  themes.forEach(function(theme) {
    var button = document.createElement('a');
    button.className = 'theme-button' + (theme.name === self.currentTheme ? ' active' : '');
    button.textContent = theme.label;
    button.setAttribute('data-theme', theme.name);
    button.addEventListener('click', function() {
      var themeName = this.getAttribute('data-theme');
      self.applyTheme(themeName);
      self.updateActiveThemeButton(this);
    });
    themeToggle.appendChild(button);
  });
  
  // 将主题切换添加到页面
  var aboveGame = document.querySelector('.above-game');
  aboveGame.appendChild(themeToggle);
  
  // 添加样式
  this.addStyles();
};

ThemeManager.prototype.applyTheme = function (themeName) {
  // 保存当前主题
  this.currentTheme = themeName;
  
  // 移除所有主题类
  document.body.classList.remove('theme-default', 'theme-teal');
  
  // 添加当前主题类
  document.body.classList.add('theme-' + themeName);
  
  // 保存主题偏好到本地存储
  this.storageManager.setThemePreference(themeName);
};

ThemeManager.prototype.updateActiveThemeButton = function (activeButton) {
  // 移除所有按钮的活动状态
  var buttons = document.querySelectorAll('.theme-button');
  buttons.forEach(function(button) {
    button.classList.remove('active');
  });
  
  // 为当前活动按钮添加活动状态
  activeButton.classList.add('active');
};

ThemeManager.prototype.addStyles = function () {
  // 创建样式元素
  var style = document.createElement('style');
  style.textContent = `
    .theme-toggle {
      display: flex;
      align-items: center;
      gap: 5px;
      margin-top: 10px;
    }
    
    .theme-toggle span {
      font-size: 16px;
      color: #5d4037;
      margin-right: 5px;
    }
    
    .theme-button {
      display: inline-block;
      min-width: 60px;
      height: 30px;
      line-height: 30px;
      text-align: center;
      background: #e0e0e0;
      color: #5d4037;
      border-radius: 4px;
      cursor: pointer;
      font-weight: bold;
      transition: all 0.2s ease;
    }
    
    .theme-button:hover {
      background: #d0d0d0;
    }
    
    .theme-button.active {
      background: #00897b;
      color: white;
    }
    
    /* 主题样式 */
    body.theme-default {
      background: #fff8e1;
    }
    
    body.theme-teal {
      background: #e0f7fa;
    }
    
    @media screen and (max-width: 520px) {
      .theme-toggle {
        width: 100%;
        justify-content: center;
        margin-top: 15px;
      }
      
      .theme-button {
        min-width: 50px;
        height: 25px;
        line-height: 25px;
        font-size: 12px;
      }
    }
  `;
  
  document.head.appendChild(style);
};

// 当页面加载完成后初始化主题管理器
window.addEventListener('load', function() {
  new ThemeManager();
});
