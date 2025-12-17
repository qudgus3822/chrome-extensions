// Netflix Speed Controller - Content Script

let isEnabled = false;
let originalSpeed = 1.0;
let isCtrlPressed = false;
let isAltPressed = false;

// 비디오 요소 찾기
function findVideoElement() {
  return document.querySelector("video");
}

// 재생 속도 변경
function setPlaybackSpeed(speed: number) {
  const video = findVideoElement();
  if (video) {
    video.playbackRate = speed;
    console.log(`Netflix playback speed set to: ${speed}x`);
  }
}

// 키 이벤트 핸들러
function handleKeyDown(event: KeyboardEvent) {
  if (!isEnabled) return;
  if (isInputFocused()) return;

  const video = findVideoElement();
  if (!video) return;

  // Ctrl 키 (2배속)
  if (
    (event.code === "ControlLeft" ||
      event.code === "ControlRight" ||
      event.key === "Control")
  ) {
    if (!isCtrlPressed && !isAltPressed) {
      isCtrlPressed = true;
      originalSpeed = video.playbackRate;
      setPlaybackSpeed(2.0);
      event.preventDefault();
      event.stopPropagation();
    }
  }
  // Alt 키 (3배속)
  else if (
    (event.code === "AltLeft" ||
      event.code === "AltRight" ||
      event.key === "Alt")
  ) {
    if (!isAltPressed && !isCtrlPressed) {
      isAltPressed = true;
      originalSpeed = video.playbackRate;
      setPlaybackSpeed(3.0);
      event.preventDefault();
      event.stopPropagation();
    }
  }
}

function handleKeyUp(event: KeyboardEvent) {
  if (!isEnabled) return;
  if (isInputFocused()) return;

  // Ctrl 키 해제
  if (
    (event.code === "ControlLeft" ||
      event.code === "ControlRight" ||
      event.key === "Control")
  ) {
    if (isCtrlPressed) {
      isCtrlPressed = false;
      setPlaybackSpeed(originalSpeed);
      event.preventDefault();
      event.stopPropagation();
    }
  }
  // Alt 키 해제
  else if (
    (event.code === "AltLeft" ||
      event.code === "AltRight" ||
      event.key === "Alt")
  ) {
    if (isAltPressed) {
      isAltPressed = false;
      setPlaybackSpeed(originalSpeed);
      event.preventDefault();
      event.stopPropagation();
    }
  }
}

// 입력 필드에 포커스가 있는지 확인
function isInputFocused() {
  const activeElement = document.activeElement as HTMLElement | null;
  return (
    activeElement &&
    (activeElement.tagName === "INPUT" ||
      activeElement.tagName === "TEXTAREA" ||
      activeElement.isContentEditable)
  );
}

// 이벤트 리스너 등록
function addKeyListeners() {
  // capture phase에서 이벤트를 가로챔
  document.addEventListener("keydown", handleKeyDown, true);
  document.addEventListener("keyup", handleKeyUp, true);
}

// 저장된 설정 불러오기
function loadSettings() {
  chrome.storage.sync.get(["isEnabled"], (result: { isEnabled?: boolean }) => {
    isEnabled = result.isEnabled || false;
    console.log(
      `Netflix Speed Controller ${isEnabled ? "enabled" : "disabled"}`
    );
  });
}

// popup에서 메시지 수신
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "toggleEnabled") {
    isEnabled = request.enabled;
    chrome.storage.sync.set({ isEnabled: isEnabled });
    console.log(
      `Netflix Speed Controller ${isEnabled ? "enabled" : "disabled"}`
    );
    sendResponse({ success: true, enabled: isEnabled });
  } else if (request.action === "getStatus") {
    sendResponse({ enabled: isEnabled });
  }
  return true;
});

// 초기화
loadSettings();
addKeyListeners();

console.log("Netflix Speed Controller loaded");
