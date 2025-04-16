function ScaleManager() {
  this.storageManager = new LocalStorageManager();
  this.setup();
}

ScaleManager.prototype.setup = function () {
  // 获取缩放按钮和游戏容器
  this.scaleButtons = document.querySelectorAll(".scale-button");
  this.gameContainer = document.querySelector(".game-container");

  // 从本地存储加载缩放偏好
  this.currentScale = this.storageManager.getScalePreference();

  // 应用保存的缩放值
  this.applyScale(this.currentScale);

  // 更新活动按钮
  this.updateActiveButtonByScale(this.currentScale);

  // 绑定事件处理函数
  this.bindEvents();
};

ScaleManager.prototype.bindEvents = function () {
  var self = this;

  // 为每个缩放按钮添加点击事件
  this.scaleButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      // 获取按钮的缩放值
      var scale = parseFloat(this.getAttribute("data-scale"));

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
  this.gameContainer.style.transform = "scale(" + scale + ")";

  // 保存缩放偏好到本地存储
  this.storageManager.setScalePreference(scale);
};

ScaleManager.prototype.updateActiveButton = function (activeButton) {
  // 移除所有按钮的活动状态
  this.scaleButtons.forEach(function (button) {
    button.classList.remove("active");
  });

  // 为当前活动按钮添加活动状态
  activeButton.classList.add("active");
};

// 根据缩放值更新活动按钮
ScaleManager.prototype.updateActiveButtonByScale = function (scale) {
  var self = this;
  var found = false;

  // 查找匹配的按钮
  this.scaleButtons.forEach(function(button) {
    var buttonScale = parseFloat(button.getAttribute('data-scale'));
    if (buttonScale === scale) {
      self.updateActiveButton(button);
      found = true;
    }
  });

  // 如果没有找到匹配的按钮，默认使用中等大小
  if (!found && this.scaleButtons.length > 0) {
    // 假设中等大小按钮是第二个
    if (this.scaleButtons.length >= 2) {
      this.updateActiveButton(this.scaleButtons[1]);
    } else {
      this.updateActiveButton(this.scaleButtons[0]);
    }
  }
};

// 当页面加载完成后初始化缩放管理器
window.addEventListener('load', function() {
  new ScaleManager();
});
