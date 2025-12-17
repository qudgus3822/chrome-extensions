# Netflix Speed Controller

Netflix와 YouTube에서 Ctrl/Alt 키로 2~3배속 재생을 간편하게 제어할 수 있는 Chrome 확장 프로그램입니다.

## 기능

- **간단한 토글 UI**: ON/OFF 스위치만으로 기능을 활성화/비활성화
- **다중 속도 제어**:
  - **Ctrl 키**: 2배속 재생 (누르는 동안만)
  - **Alt 키**: 3배속 재생 (누르는 동안만)
  - 키를 떼면 원래 속도로 복귀
- **다중 사이트 지원**:
  - Netflix (https://www.netflix.com)
  - YouTube (https://www.youtube.com)

## 개발 환경 설정

### 필수 요구사항
- Node.js (v18 이상)
- npm 또는 yarn

### 설치

```bash
cd netflix-speed-controller
npm install
```

### 빌드

```bash
# 프로덕션 빌드
npm run build

# 개발 모드 (파일 변경 감지)
npm run dev
```

## Chrome 확장 프로그램 설치

1. 터미널에서 `npm run build` 실행
2. Chrome 브라우저에서 `chrome://extensions/` 페이지로 이동
3. 우측 상단의 '개발자 모드' 토글을 활성화
4. '압축해제된 확장 프로그램을 로드합니다' 버튼 클릭
5. `netflix-speed-controller` 폴더 선택

## 사용 방법

1. Netflix 또는 YouTube 웹사이트에 접속
2. 확장 프로그램 아이콘을 클릭하여 토글을 ON으로 설정
3. 비디오 재생 중:
   - **Ctrl 키**를 누르고 있으면 2배속 재생
   - **Alt 키**를 누르고 있으면 3배속 재생
4. 키를 떼면 원래 속도로 복귀

## 프로젝트 구조

```
netflix-speed-controller/
├── manifest.json           # Chrome 확장 프로그램 설정
├── package.json           # npm 프로젝트 설정
├── vite.config.ts         # Vite 빌드 설정
├── tsconfig.json          # TypeScript 설정
├── src/
│   ├── content.ts        # 메인 로직 (Ctrl 키 이벤트 처리)
│   ├── popup.ts          # 팝업 UI 로직
│   └── ui/
│       ├── popup.html    # 팝업 HTML
│       └── popup.css     # 팝업 스타일
├── public/                # 정적 파일
│   ├── popup.html
│   └── popup.css
├── dist/                  # 빌드 결과물
│   ├── content.js
│   └── popup.js
└── icons/                 # 아이콘 (추가 필요)
    ├── icon16.png
    ├── icon48.png
    └── icon128.png
```

## 기술 스택

- TypeScript
- Vite (빌드 도구)
- Chrome Extension Manifest V3

## 주의사항

- 아이콘 파일을 `icons/` 폴더에 추가해야 확장 프로그램이 정상적으로 표시됩니다
- 입력 필드(input, textarea)에 포커스가 있을 때는 Ctrl/Alt 키가 동작하지 않습니다
- 빌드 후 Chrome 확장 프로그램을 다시 로드해야 변경사항이 적용됩니다
- Alt 키는 브라우저 메뉴바 단축키와 충돌할 수 있으므로, 전체 화면 모드(F11)에서 사용하는 것을 권장합니다

## 라이선스

MIT License
