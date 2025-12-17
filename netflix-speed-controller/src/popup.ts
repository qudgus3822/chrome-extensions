// Popup Script

const toggle = document.getElementById(
  "enableToggle"
) as HTMLInputElement | null;
const toggleText = document.getElementById("toggleText") as HTMLElement | null;

// 현재 상태 불러오기
chrome.storage.sync.get(["isEnabled"], (result: { isEnabled?: boolean }) => {
  const enabled = result.isEnabled || false;
  if (toggle) {
    toggle.checked = enabled;
  }
  updateToggleText(enabled);
});

// 토글 변경 이벤트
toggle?.addEventListener("change", () => {
  const enabled = toggle?.checked;
  updateToggleText(enabled);

  // 현재 탭에 메시지 전송
  chrome.tabs.query(
    { active: true, currentWindow: true },
    (tabs: chrome.tabs.Tab[]) => {
      if (tabs[0]) {
        chrome.tabs.sendMessage(
          tabs[0].id || 0,
          { action: "toggleEnabled", enabled: enabled },
          (response) => {
            if (chrome.runtime.lastError) {
              console.error("Error:", chrome.runtime.lastError);
            }
          }
        );
      }
    }
  );

  // 저장
  chrome.storage.sync.set({ isEnabled: enabled });
});

function updateToggleText(enabled: boolean) {
  if (toggleText) {
    toggleText.textContent = enabled ? "ON" : "OFF";
    toggleText.style.color = enabled ? "#4CAF50" : "#999";
  }
}
