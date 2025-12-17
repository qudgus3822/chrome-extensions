// 비디오 요소 찾기
export function findVideoElement(): HTMLVideoElement | null {
  return document.querySelector("video");
}

// 재생 속도 변경
export function setPlaybackSpeed(speed: number): void {
  const video = findVideoElement();
  if (video) {
    video.playbackRate = speed;
    console.log(`Playback speed set to: ${speed}x`);
  }
}

// 현재 재생 속도 가져오기
export function getCurrentSpeed(): number {
  const video = findVideoElement();
  return video ? video.playbackRate : 1.0;
}
