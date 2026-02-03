// Netflix Volume Booster - Netflix 전용 자동 볼륨 부스터
// Web Audio API를 사용해 볼륨을 최대 500%까지 증폭

let audioContext: AudioContext | null = null;
let gainNode: GainNode | null = null;
let sourceNode: MediaElementAudioSourceNode | null = null;
let connectedVideo: HTMLVideoElement | null = null;

// 기본 볼륨 배수 (2.0 = 200%)
const DEFAULT_GAIN = 2.0;
let currentGain = DEFAULT_GAIN;

// 비디오 요소에 볼륨 부스터 연결
function connectVolumeBooster(video: HTMLVideoElement): boolean {
  // 이미 같은 비디오에 연결되어 있으면 스킵
  if (connectedVideo === video && audioContext && gainNode) {
    return true;
  }

  // 기존 연결 해제
  disconnectVolumeBooster();

  try {
    // CORS 설정 (Netflix에서 필요할 수 있음)
    video.crossOrigin = "anonymous";

    // 비디오 볼륨을 최대로 설정 (GainNode에서 증폭하기 위해)
    video.volume = 1.0;

    // AudioContext 생성
    audioContext = new AudioContext();

    // AudioContext가 suspended 상태일 수 있음 (자동재생 정책)
    if (audioContext.state === "suspended") {
      audioContext.resume();
    }

    // 비디오 요소를 오디오 소스로 연결
    sourceNode = audioContext.createMediaElementSource(video);

    // GainNode 생성 (볼륨 조절용)
    gainNode = audioContext.createGain();
    gainNode.gain.value = currentGain;

    // 연결: 비디오 -> GainNode -> 스피커
    sourceNode.connect(gainNode);
    gainNode.connect(audioContext.destination);

    connectedVideo = video;
    console.log(`[Netflix Volume Booster] Connected! Volume: ${Math.round(currentGain * 100)}%`);
    console.log(`[Netflix Volume Booster] AudioContext state: ${audioContext.state}`);
    return true;
  } catch (error) {
    console.error("[Netflix Volume Booster] Failed to connect:", error);
    disconnectVolumeBooster();
    return false;
  }
}

// 볼륨 부스터 연결 해제
function disconnectVolumeBooster(): void {
  if (sourceNode) {
    sourceNode.disconnect();
    sourceNode = null;
  }
  if (gainNode) {
    gainNode.disconnect();
    gainNode = null;
  }
  if (audioContext) {
    audioContext.close();
    audioContext = null;
  }
  connectedVideo = null;
}

// 비디오 요소 찾아서 연결
function findAndConnectVideo(): void {
  const video = document.querySelector("video") as HTMLVideoElement | null;
  if (video && video !== connectedVideo) {
    // 비디오가 재생 준비가 되면 연결
    if (video.readyState >= 2) {
      connectVolumeBooster(video);
    } else {
      video.addEventListener("loadeddata", () => {
        connectVolumeBooster(video);
      }, { once: true });
    }
  }
}

// DOM 변화 감시 (Netflix는 SPA라서 비디오가 동적으로 생성됨)
function startObserver(): void {
  const observer = new MutationObserver(() => {
    findAndConnectVideo();
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true,
  });

  console.log("[Netflix Volume Booster] Observer started");
}

// 사용자 상호작용 후 AudioContext 활성화
function setupUserGestureHandler(): void {
  const activateAudio = () => {
    findAndConnectVideo();

    // AudioContext가 suspended 상태면 resume
    if (audioContext && audioContext.state === "suspended") {
      audioContext.resume().then(() => {
        console.log("[Netflix Volume Booster] AudioContext resumed!");
      });
    }
  };

  // 클릭, 키보드 입력 시 활성화
  document.addEventListener("click", activateAudio, { once: true });
  document.addEventListener("keydown", activateAudio, { once: true });

  console.log("[Netflix Volume Booster] Waiting for user interaction...");
}

// 초기화
function init(): void {
  console.log("[Netflix Volume Booster] Initializing...");

  // DOM이 준비되면 시작
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () => {
      startObserver();
      setupUserGestureHandler();
    });
  } else {
    startObserver();
    setupUserGestureHandler();
  }
}

init();
