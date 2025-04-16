window.fakeStorage = {
  _data: {},

  setItem: function (id, val) {
    return this._data[id] = String(val);
  },

  getItem: function (id) {
    return this._data.hasOwnProperty(id) ? this._data[id] : undefined;
  },

  removeItem: function (id) {
    return delete this._data[id];
  },

  clear: function () {
    return this._data = {};
  }
};

function LocalStorageManager() {
  this.bestScoreKey = "bestScore";
  this.gameStateKey = "gameState";
  this.gameHistoryKey = "gameHistory";
  this.scalePreferenceKey = "scalePreference";
  this.themePreferenceKey = "themePreference";

  var supported = this.localStorageSupported();
  this.storage = supported ? window.localStorage : window.fakeStorage;
}

LocalStorageManager.prototype.localStorageSupported = function () {
  var testKey = "test";

  try {
    var storage = window.localStorage;
    storage.setItem(testKey, "1");
    storage.removeItem(testKey);
    return true;
  } catch (error) {
    return false;
  }
};

// Best score getters/setters
LocalStorageManager.prototype.getBestScore = function () {
  return this.storage.getItem(this.bestScoreKey) || 0;
};

LocalStorageManager.prototype.setBestScore = function (score) {
  this.storage.setItem(this.bestScoreKey, score);
};

// Game state getters/setters and clearing
LocalStorageManager.prototype.getGameState = function () {
  var stateJSON = this.storage.getItem(this.gameStateKey);
  return stateJSON ? JSON.parse(stateJSON) : null;
};

LocalStorageManager.prototype.setGameState = function (gameState) {
  this.storage.setItem(this.gameStateKey, JSON.stringify(gameState));
};

LocalStorageManager.prototype.clearGameState = function () {
  this.storage.removeItem(this.gameStateKey);
};

// Game history getters/setters for undo functionality
LocalStorageManager.prototype.getGameHistory = function () {
  var historyJSON = this.storage.getItem(this.gameHistoryKey);
  return historyJSON ? JSON.parse(historyJSON) : [];
};

LocalStorageManager.prototype.setGameHistory = function (gameHistory) {
  this.storage.setItem(this.gameHistoryKey, JSON.stringify(gameHistory));
};

LocalStorageManager.prototype.clearGameHistory = function () {
  this.storage.removeItem(this.gameHistoryKey);
};

// Scale preference getters/setters
LocalStorageManager.prototype.getScalePreference = function () {
  var scale = this.storage.getItem(this.scalePreferenceKey);
  return scale ? parseFloat(scale) : 1; // Default scale is 1
};

LocalStorageManager.prototype.setScalePreference = function (scale) {
  this.storage.setItem(this.scalePreferenceKey, scale);
};

// Theme preference getters/setters
LocalStorageManager.prototype.getThemePreference = function () {
  return this.storage.getItem(this.themePreferenceKey) || "default"; // Default theme
};

LocalStorageManager.prototype.setThemePreference = function (theme) {
  this.storage.setItem(this.themePreferenceKey, theme);
};
