# Today Todo

- 오늘 할 일, 있었던 일을 Today Todo를 통해 더 편리하고 예쁘게 기록해보세요!
- [어플리케이션 보러가기 👉](http://yuziwoo1.dothome.co.kr/) 모바일 환경에서 확인하면 더 좋아요.
- [프로젝트 정보 노션 방문하기 👉](https://www.notion.so/yuziwoo2/Today-Todo-e09c2d28321740529ceca1b5ee510b80?pvs=4)

## About

- 진행 날짜 : 2023.12.24 - 2024.01.07 (2주간)
- 개발 정보
  - 사용 언어 : React, TypeScript
  - 상태 관리 : redux toolkit
  - API : 공공기관 공휴일 데이터 API (공휴일 정보)
  - 도움을 준 라이브러리 : Swiper, LottieFiles

## 폴더 규칙

```
└─ src
 ├─ components          재사용 컴포넌트
 ├─ assets              이미지, 폰트
 ├─ pages               페이지 컴포넌트
 ├─ constants           공통 상수
 ├─ api                 api 관련 로직 모듈
 ├─ utils               공통 함수
 ├─ store               상태 관리 정보
 ├─ types               타입 저장
 ├─ mocks               목업 데이터 관리
 ├─ App.tsx
 └─ index.tsx
```

## 커밋 컨벤션

- feat: 새로운 기능 추가
- fix: 버그를 고침
- design: 디자인 변경
- style: 코드 포맷 변경, 세미 콜론 누락 등 (코드 수정 X)
- refactor: 프로덕션 코드 리팩토링
- comment: 필요한 주석 추가 및 변경
- docs: 문서를 수정 (README.md 등)
- test: 테스트 추가, 테스트 리팩토링 (프로덕션 코드 변경 X)
- chore: 기타 업데이트
- !HOTFIX: 급하게 버그를 고침
