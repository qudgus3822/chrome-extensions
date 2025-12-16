# Netflix Speed Controller

Netflix에서 Space 키를 눌러 재생 속도를 빠르게 조절할 수 있는 Chrome 확장 프로그램입니다.

## 기능

- **간단한 토글 UI**: ON/OFF 스위치만으로 기능을 활성화/비활성화
- **Space 키 제어**:
  - Space 키를 누르면 재생 속도가 2배속으로 변경
  - Space 키를 떼면 원래 속도로 복귀

## 설치 방법

1. Chrome 브라우저에서 `chrome://extensions/` 페이지로 이동
2. 우측 상단의 '개발자 모드' 토글을 활성화
3. '압축해제된 확장 프로그램을 로드합니다' 버튼 클릭
4. `netflix-speed-controller` 폴더 선택

## 사용 방법

1. Netflix 웹사이트(https://www.netflix.com)에 접속
2. 확장 프로그램 아이콘을 클릭하여 토글을 ON으로 설정
3. 비디오 재생 중 Space 키를 누르고 있으면 2배속 재생
4. Space 키를 떼면 원래 속도로 복귀

## 파일 구조

```
netflix-speed-controller/
├── manifest.json       # 확장 프로그램 설정 파일
├── content.js          # Netflix 페이지에서 실행되는 스크립트
├── popup.html          # 확장 프로그램 팝업 UI
├── popup.css           # 팝업 스타일
├── popup.js            # 팝업 로직
├── icons/              # 아이콘 폴더 (아이콘 추가 필요)
│   ├── icon16.png
│   ├── icon48.png
│   └── icon128.png
└── README.md
```

## 주의사항

- 현재 아이콘 파일이 없으므로, `icons/` 폴더에 아이콘을 추가해야 합니다.
- Netflix 웹사이트에서만 동작합니다.
- Space 키는 Netflix 기본 재생/일시정지 기능을 덮어씁니다.

## 라이선스

MIT License
