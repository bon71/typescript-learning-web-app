.result-errors {
  margin: 8px 16px;
}

.errors-header {
  font-weight: 600;
  color: #dc3545;
  margin-bottom: 8px;
}

.errors-content {
  background: #fff;
  border: 1px solid #e1e5e9;
  border-radius: 4px;
  max-height: 150px;
  overflow-y: auto;
}

.error-line {
  padding: 8px 12px;
  border-bottom: 1px solid #f0f0f0;
  font-family: 'Consolas', 'Monaco', monospace;
  font-size: 13px;
  color: #dc3545;
  background: #fff5f5;
}

.error-line:last-child {
  border-bottom: none;
}

/* 学習支援ボタン */
.learning-actions {
  display: flex;
  gap: 8px;
  padding: 16px;
  background: #f8f9fa;
  border-top: 1px solid #e9ecef;
}

.learning-action-button {
  padding: 8px 16px;
  border: 1px solid #ddd;
  border-radius: 6px;
  background: white;
  cursor: pointer;
  font-size: 0.85rem;
  transition: all 0.2s ease;
}

.learning-action-button:hover {
  background: #f0f0f0;
  border-color: #bbb;
}

.learning-action-button.active {
  background: #2196F3;
  color: white;
  border-color: #2196F3;
}

/* 解説セクション */
.explanation {
  padding: 16px;
  background: #f8f9fa;
  border-top: 1px solid #e9ecef;
}

.explanation-header {
  display: flex;
  align-items: center;
  margin-bottom: 12px;
  font-weight: 600;
  color: #333;
  gap: 8px;
}

.explanation-content {
  color: #666;
  line-height: 1.6;
  margin: 0;
}

/* 従来のサンプルコード */
.sample-code-section {
  margin-top: 24px;
  border-radius: 12px;
  overflow: hidden;
  border: 1px solid #e9ecef;
}

.sample-code-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 16px;
  background: #2196F3;
  color: white;
  font-weight: 600;
}

.sample-code-header .header-left {
  display: flex;
  align-items: center;
  gap: 8px;
}

.copy-button {
  background: rgba(255, 255, 255, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.3);
  color: white;
  padding: 6px 12px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.85rem;
  font-weight: 500;
  transition: all 0.3s ease;
}

.copy-button:hover {
  background: rgba(255, 255, 255, 0.3);
}

.copy-button.copied {
  background: #4CAF50;
  border-color: #4CAF50;
}

.sample-code {
  margin: 0;
  padding: 20px;
  background: #2d3748;
  color: #e2e8f0;
  font-family: 'Consolas', 'Monaco', 'Courier New', monospace;
  font-size: 0.9rem;
  line-height: 1.6;
  overflow-x: auto;
  white-space: pre-wrap;
}

/* アニメーション */
.slide-down-enter-active {
  transition: all 0.3s ease-out;
}

.slide-down-leave-active {
  transition: all 0.3s ease-in;
}

.slide-down-enter-from {
  opacity: 0;
  max-height: 0;
}

.slide-down-leave-to {
  opacity: 0;
  max-height: 0;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* レスポンシブデザイン */
@media (max-width: 768px) {
  .learning-header {
    padding: 16px 20px;
  }
  
  .learning-content {
    padding: 20px;
  }
  
  .content-grid {
    grid-template-columns: 1fr;
    gap: 20px;
  }
  
  .action-area {
    min-width: auto;
  }
  
  .learning-title {
    font-size: 1rem;
  }
  
  .sample-code {
    font-size: 0.8rem;
    padding: 15px;
  }

  .editor-controls {
    flex-direction: column;
    gap: 4px;
  }

  .control-button {
    font-size: 0.8rem;
    padding: 4px 8px;
  }

  .learning-actions {
    flex-wrap: wrap;
  }
}
</style>