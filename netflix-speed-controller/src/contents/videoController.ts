// 비디오 요소 찾기 (단일)
export function findVideoElement(): HTMLVideoElement | null {
  return document.querySelector("video");
}

// 모든 비디오 요소 찾기
export function findAllVideoElements(): NodeListOf<HTMLVideoElement> {
  return document.querySelectorAll("video");
}

// 재생 속도 변경 
export function setPlaybackSpeed(speed: number): void {
  const video = findVideoElement();
  if (video) {
    video.playbackRate = speed;
    console.log(`Playback speed set to: ${speed}x for video`);
  } else {
    console.warn("No video elements found");
  }
}

// 현재 재생 속도 가져오기 (메인 비디오)
export function getCurrentSpeed(): number {
  const video = findVideoElement();
  return video ? video.playbackRate : 1.0;
}

// 해상도를 1920x1080으로 변경
export function setResolution1080p(): void {
  const video = findVideoElement();
  if (video) {
    video.style.width = "1920px";
    video.style.height = "1080px";
    console.log("Resolution set to: 1920x1080");
  }
}

// 새로 추가되는 비디오 요소 감시 및 자동 속도 적용
// export function watchForNewVideos(speed: number): void {
//   const observer = new MutationObserver((mutations) => {
//     mutations.forEach((mutation) => {
//       mutation.addedNodes.forEach((node) => {
//         if (node instanceof HTMLVideoElement) {
//           node.playbackRate = speed;
//           console.log(`Auto-applied playback speed ${speed}x to new video element`);
//         } else if (node instanceof HTMLElement) {
//           // 추가된 요소 내부의 video 태그 확인
//           const videos = node.querySelectorAll("video");
//           videos.forEach((video) => {
//             video.playbackRate = speed;
//             console.log(`Auto-applied playback speed ${speed}x to nested video element`);
//           });
//         }
//       });
//     });
//   });

//   observer.observe(document.body, {
//     childList: true,
//     subtree: true,
//   });

//   console.log("Video observer started - will auto-apply speed to new videos");
// }
