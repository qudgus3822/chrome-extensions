import { setPlaybackSpeed, findVideoElement } from "./videoController";

// 키 상태
let isCtrlPressed = false;
let isAltPressed = false;
let originalSpeed = 1.0;

// 활성화 상태 (외부에서 설정)
let isEnabled = false;

export function setEnabled(enabled: boolean): void {
  isEnabled = enabled;
}

export function getEnabled(): boolean {
  return isEnabled;
}

// 입력 필드에 포커스가 있는지 확인
function isInputFocused(): boolean {
  const activeElement = document.activeElement as HTMLElement | null;
  return (
    (activeElement &&
      (activeElement.tagName === "INPUT" ||
        activeElement.tagName === "TEXTAREA" ||
        activeElement.isContentEditable)) ||
    false
  );
}

// 키 다운 이벤트 핸들러
function handleKeyDown(event: KeyboardEvent): void {
  if (!isEnabled) return;
  if (isInputFocused()) return;

  const video = findVideoElement();
  if (!video) return;

  // Ctrl 키 (2배속)
  if (
    event.code === "ControlLeft" ||
    event.code === "ControlRight" ||
    event.key === "Control"
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
    event.code === "AltLeft" ||
    event.code === "AltRight" ||
    event.key === "Alt"
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

// 키 업 이벤트 핸들러
function handleKeyUp(event: KeyboardEvent): void {
  if (!isEnabled) return;
  if (isInputFocused()) return;

  // Ctrl 키 해제
  if (
    event.code === "ControlLeft" ||
    event.code === "ControlRight" ||
    event.key === "Control"
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
    event.code === "AltLeft" ||
    event.code === "AltRight" ||
    event.key === "Alt"
  ) {
    if (isAltPressed) {
      isAltPressed = false;
      setPlaybackSpeed(originalSpeed);
      event.preventDefault();
      event.stopPropagation();
    }
  }
}

// 이벤트 리스너 등록
export function initKeyListeners(): void {
  // capture phase에서 이벤트를 가로챔
  document.addEventListener("keydown", handleKeyDown, true);
  document.addEventListener("keyup", handleKeyUp, true);
}
