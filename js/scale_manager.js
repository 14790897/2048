function ScaleManager() {
  this.setup();
}

ScaleManager.prototype.setup = function () {
  // 获取缩放按钮和游戏容器
  this.scaleButtons = document.querySelectorAll('.scale-button');
  this.gameContainer = document.querySelector('.game-container');
  
  // 设置默认缩放值
  this.currentScale = 1;
  
  // 绑定事件处理函数
  this.bindEvents();
};

ScaleManager.prototype.bindEvents = function () {
  var self = this;
  
  // 为每个缩放按钮添加点击事件
  this.scaleButtons.forEach(function(button) {
    button.addEventListener('click', function() {
      // 获取按钮的缩放值
      var scale = parseFloat(this.getAttribute('data-scale'));
      
      // 应用缩放
      self.applyScale(scale);
      
      // 更新活动按钮
      self.updateActiveButton(this);
    });
  });
};

ScaleManager.prototype.applyScale = function (scale) {
  // 保存当前缩放值
  this.currentScale = scale;
  
  // 应用缩放到游戏容器
  this.gameContainer.style.transform = 'scale(' + scale + ')';
};

ScaleManager.prototype.updateActiveButton = function (activeButton) {
  // 移除所有按钮的活动状态
  this.scaleButtons.forEach(function(button) {
    button.classList.remove('active');
  });
  
  // 为当前活动按钮添加活动状态
  activeButton.classList.add('active');
};

// 当页面加载完成后初始化缩放管理器
window.addEventListener('load', function() {
  new ScaleManager();
});
