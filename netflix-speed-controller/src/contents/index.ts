// Netflix & YouTube Speed Controller - Content Script
import { setEnabled, getEnabled, initKeyListeners } from "./keyHandler";

// 저장된 설정 불러오기
export function loadSettings(): void {
  chrome.storage.sync.get(["isEnabled"], (result: { isEnabled?: boolean }) => {
    const enabled = result.isEnabled || false;
    setEnabled(enabled);
    console.log(`Speed Controller ${enabled ? "enabled" : "disabled"}`);
  });
}

// popup에서 메시지 수신
chrome.runtime.onMessage.addListener((request, _sender, sendResponse) => {
  if (request.action === "toggleEnabled") {
    const enabled = request.enabled;
    setEnabled(enabled);
    chrome.storage.sync.set({ isEnabled: enabled });
    console.log(`Speed Controller ${enabled ? "enabled" : "disabled"}`);
    sendResponse({ success: true, enabled });
  } else if (request.action === "getStatus") {
    sendResponse({ enabled: getEnabled() });
  }
  return true;
});

// 초기화 함수
export function init(): void {
  loadSettings();
  initKeyListeners();
  console.log("Speed Controller loaded");
}
init();
