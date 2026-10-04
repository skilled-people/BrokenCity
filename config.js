/* ===== 계정 설정 =====
   Firebase 콘솔의 "웹 앱 추가"에서 받은 firebaseConfig를 아래 null 자리에 붙여 넣으면
   Google 로그인과 계정 저장이 켜집니다. (설정 방법은 FIREBASE_설정방법.md 참고)
   예:
   window.RUINS_FIREBASE = {
     apiKey: "AIza...", authDomain: "내프로젝트.firebaseapp.com", projectId: "내프로젝트",
     storageBucket: "내프로젝트.appspot.com", messagingSenderId: "123", appId: "1:123:web:abc"
   };
   둘 다 비워 두면 이 브라우저에만 저장됩니다. claude.ai에서 열면 claude.ai 계정을 씁니다. */
window.RUINS_FIREBASE = {
  apiKey: "AIzaSyC7Q5RLRDh-zmtl33fYFOHv1zt29djXFmE",
  authDomain: "broken-city.firebaseapp.com",
  projectId: "broken-city",
  storageBucket: "broken-city.firebasestorage.app",
  messagingSenderId: "61347663505",
  appId: "1:61347663505:web:b043405b9c82e02e1a7930",
  measurementId: "G-LTXH66CJNB"
};
/* 직접 만든 서버를 쓸 때만: 서버 주소 (Firebase를 쓰면 비워 두세요) */
window.RUINS_SERVER = '';
