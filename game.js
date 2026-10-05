(function(){
"use strict";
const TS=32;
const $=id=>document.getElementById(id);
const cv=$('cv'), ctx=cv.getContext('2d');
const isTouch=(window.matchMedia&&matchMedia('(pointer:coarse)').matches)||('ontouchstart' in window);
if(isTouch) document.body.classList.add('touch');
const COL={red:'#c8322d',blue:'#4a7fd4',yellow:'#d8b13a',nuri:'#eaf2ff',white:'#d9d6cf'};
const KEY='ruins-record-demo-v1';

/* ================= RECORDS ================= */
const R={
 news:{title:'삼실일보 1면',type:'신문',place:'폐허 도시, 가판대',date:'2011.10.15',color:'red',
  text:'석말공장 사고, "단순 기계 고장"\n\n14일 새벽 4시경 석말공장에서 발생한 사고는 냉각 설비의 단순 기계 고장으로 확인됐다. 시는 만일에 대비해 14일 하루 관내 모든 학교에 휴교령을 내렸다. 인명 피해는 없다.\n\n기사 아래, 누군가 볼펜으로 눌러 쓴 글씨. "거짓말."'},
 photo:{title:'빛바랜 폴라로이드',type:'사진',place:'폐허 도시, 버려진 승용차',date:'2011.10.14',color:'red',
  text:'조수석에 떨어져 있던 사진 한 장.\n\n교복 입은 아이들이 "한결중학교 축제" 현수막 앞에서 웃고 있다. 뒤편 강당 시계는 오후 3시를 가리킨다.\n\n뒷면의 글씨. "2011. 10. 14. 축제 끝! 서윤이랑."'},
 phone:{title:'공중전화 녹음',type:'전화기',place:'폐허 도시, 공중전화 부스',date:'날짜 불명',color:'white',
  text:'끊긴 줄 알았던 회선에서 흘러나온 목소리.\n\n"거기 누구 있어요? 신문은 믿지 마세요. 그날, 학교엔 사람들이 있었어요. 다들 아직… 아직 거기서……"\n\n마지막으로, 잡음 속에서. "……기록자님?"',
  pages:[{t:'수화기를 들자, 끊긴 줄 알았던 회선에서 잡음이 흘러나온다.'},{s:'???',t:'……거기 누구 있어요?'},{s:'???',t:'신문은 믿지 마세요. 그날, 학교엔 사람들이 있었어요.'},{s:'???',t:'다들 아직… 아직 거기서……'},{s:'???',t:'(치지직) ……기록자님?'},{t:'뚝. 신호가 끊겼다.\n…왜 이 사람은 나를 알고 있지?'}]},
 graffiti:{title:'붉은 낙서',type:'낙서',place:'폐허 도시, 무너진 벽',date:'날짜 불명',color:'red',
  text:'벽에 붉은 스프레이로 크게 적혀 있다.\n\n"기록은 거짓말을 한다."\n\n그 아래 작은 글씨로. "전부 다는 아니지만."'},
 radio:{title:'긴급 재난 방송',type:'라디오',place:'폐허 도시, 상점 쇼윈도',date:'2011.10.14',color:'yellow',
  text:'전원도 없는 라디오가 스스로 켜져 있다.\n\n"치직… 긴급 재난 방송입니다. 10월 14일 오후 5시… 석말공장 인근 주민은 즉시 대피… 치직… 학생들은 교내 대피소에서 대기하십시오…"\n\n방송은 같은 문장만 끝없이 반복한다.'},
 map:{title:'삼실특별시 안내도',type:'지도',place:'폐허 도시, 버스 정류장',date:'날짜 불명',color:'red',esc:true,
  text:'버스 정류장의 삼실특별시 안내도. 누군가 붉은 펜으로 도시 중앙의 지하에 X를 그려 두었다.\n\n"EXIT — 학교 아래 → 공장 → 더 아래"\n\n화살표는 지도 바깥, 아래쪽을 가리킨다. 탈출구의 위치를 가리키는 첫 번째 기록이다.'},
 diary:{title:'찢어진 일기',type:'일기',place:'폐허 도시, 아파트 우편함',date:'2011.10.13',color:'white',
  text:'10월 13일.\n\n내일은 서윤이네 학교 축제다. 요즘 공장 사람들이 이상하다. 밤마다 공장 굴뚝에서 하얀 빛이 올라온다. 연기가 아니라, 빛이.\n\n남편은 신경 쓰지 말라고 한다.'},
 memo:{title:'경비실 메모',type:'메모',place:'폐허 도시, 학교 정문',date:'날짜 불명',color:'yellow',
  text:'정문 비밀번호 변경 안내.\n\n새 비밀번호: 학교에 마지막으로 사람이 있었던 날 (월일 4자리).\n\n"잊지 않도록." 누가 이런 식으로 비밀번호를 정하는 걸까.'},
 roll:{title:'2학년 3반 출석부',type:'출석부',place:'폐교, 2학년 3반 교실',date:'2011.10.14',color:'white',
  text:'재적 30명. 강민재, 김하은, 박도윤 … 한서윤 … 황지우.\n\n10월 14일, 30명 전원 "출석". 명단 어디에도 빈칸은 없다.'},
 diary2:{title:'반복되는 일기',type:'일기',place:'폐교, 2학년 1반 교실',date:'2011.10.14',color:'white',
  text:'10월 14일. 드디어 축제!\n\n10월 14일. 또 축제다. 어제도 축제였는데.\n\n10월 14일. 아무도 이상하다고 하지 않는다.\n\n10월 14일. 10월 14일. 10월 14일. 10월 14일.\n\n마지막 장. "밖에 누가 서 있다. 우리를 적고 있다."'},
 board:{title:'칠판의 문장',type:'칠판',place:'폐교, 2학년 3반 교실',date:'날짜 불명',color:'white',
  text:'칠판 가득 같은 문장이 반복해서 적혀 있다.\n\n"우리는 사라지지 않는다. 기록될 뿐이다."\n\n한가운데, 다른 사람의 글씨로. "그곳에서 만나."'},
 video:{title:'축제 영상',type:'녹화 테이프',place:'폐교, 방송 동아리실',date:'2011.10.14',color:'blue',past:true,pastArea:'school',
  text:'캠코더에 꽂힌 테이프. 라벨: "11.10.14 축제".\n\n영상 속 복도는 깨끗하고 밝다. 3반 부스 앞에서 한 학생이 카메라를 향해 손을 흔든다. 명찰에 적힌 이름은 "기록자".\n\n그 뒤, 복도 벽에는 붉고 흰 벽화가 그려져 있다. 지금은 무너진 자리다.'},
 log:{title:'교무일지',type:'학교 문서',place:'폐교, 교무실',date:'2011.10.14',color:'yellow',
  text:'10월 14일 (금).\n\n축제 예정대로 진행. 교육청 휴교 지시 없음.\n\n16:50 석말공장 측 방문. 방송실에 "측정 장비" 설치 요청. 교장 승인.\n\n17:00 전교생 대피 훈련 방송 예정.'},
 nuri:{title:'PROJECT NURI 보고서',type:'연구 자료',place:'폐교, 숨겨진 방',date:'2011.10.14',color:'nuri',
  text:'PROJECT NURI — 1차 관측 보고서.\n\n관측 구역: 한결중학교\n관측 대상: 31명\n관측 방식: 기록\n\n관측 대상은 관측되는 동안 소멸하지 않는다.\n\n████ 개방 예정: 10월 14일 17:02.\n\n이름 부분만 검게 지워져 있다.'},
 broadcast:{title:'마지막 대피 방송',type:'방송 기록',place:'폐교, 방송실',date:'2011.10.14 17:02',color:'red',esc:true,
  text:'방송실 콘솔에 남은 마지막 송출 기록.\n\n"10월 14일 17시 02분. 전교생은 즉시 지하 대피소로 이동하십시오. 대피소 입구는 공장 방향 지하 통로에 있습니다."\n\n"문을 열지 마십시오. 반복합니다. 어떤 문도 열지 마십시오."\n\n탈출구로 이어지는 두 번째 기록이다.'},
 cctv:{title:'CCTV 녹화, 석말공장',type:'CCTV 영상',place:'거대 공장, 관제실',date:'2011.10.14 16:58',color:'blue',past:true,pastArea:'factory',
  text:'관제실 모니터 하나에만 전원이 남아 있다. 화면 구석의 시각은 2011.10.14 16:58.\n\n흰 코트를 입은 사람이 석말공장 레버실로 들어간다. 손에는 노트. 레버를 하나 당길 때마다 무언가를 적는다.\n\n얼굴은 노이즈에 가려 보이지 않는다.'},
 govdoc:{title:'재난조사위원회 결과서',type:'정부 문서',place:'거대 공장, 관제실',date:'2011.11.02',color:'yellow',
  text:'삼실특별시 재난조사위원회. 석말공장 사고 조사 결과.\n\n사고 원인: 냉각 설비 기계 고장.\n\n참고: 해당 날짜(10월 14일)의 공장 CCTV 기록은 존재하지 않는 것으로 확인됨.\n\n문서 아래에 "열람 후 파기" 도장이 찍혀 있다.'},
 worklog:{title:'석말공장 작업 일지',type:'공장 기록',place:'거대 공장, 사무실',date:'2011.10.14',color:'white',
  text:'04:00 냉각 설비 정기 점검. 이상 없음.\n\n16:40 NURI 팀, 제3반응로 가동 요청. 작업자 전원 제3구역 밖으로 철수.\n\n17:02 ————\n\n그 뒤로는 아무것도 적혀 있지 않다. 펜이 종이를 찢고 지나간 자국만 남아 있다.'},
 resdiary:{title:'연구원의 일기',type:'일기',place:'거대 공장, 사무실',date:'2011.10.14',color:'red',
  text:'그건 사고가 아니었다. 우리는 문을 열었다.\n\n정비 매뉴얼의 레버 순서는 거짓이다. 매뉴얼대로 당기면 발전기가 폭주한다. 윗선이 일부러 그렇게 적어 두었다. 아무도 다시 켜지 못하게.\n\n안전한 순서는 그날 그 사람이 당긴 순서뿐이다. 흰 코트, 노트. 그 사람은 처음부터 모든 것을 적고 있었다.'},
 manual:{title:'제3발전기 정비 매뉴얼',type:'공장 기록',place:'거대 공장, 레버실',date:'2009.03.01',color:'yellow',
  text:'제3발전기 재가동 절차.\n\n1. A 레버를 당긴다.\n2. B 레버를 당긴다.\n3. C 레버를 당긴다.\n\n※ 순서를 반드시 지킬 것.'},
 power:{title:'비상 전력 배분표',type:'공장 기록',place:'거대 공장, 발전기실',date:'날짜 불명',color:'red',esc:true,
  text:'제3발전기 비상 전력 배분표.\n\nB3 지하 연구시설 서버실: 공급 중\nB3 비상 탈출구 잠금장치: 공급 중\n\n경고: 비상 탈출구를 개방하면 ARCHIVE 저장 장치의 전원이 차단됩니다.\n\n탈출구로 이어지는 세 번째 기록이다.'},
 nuriel:{title:'PROJECT NURI 최종 목표',type:'연구 자료',place:'거대 공장, 폐쇄된 실험실',date:'2011.10.01',color:'nuri',
  text:'PROJECT NURI의 최종 목표.\n\n사라지지 않는 도시. 모든 것이 기록되어, 영원히 남는 장소.\n\n우리는 그곳을 "누리느엘"이라 부른다.\n\n개방 조건: 기록자의 존재.'},
 archive:{title:'ARCHIVE 시스템 로그',type:'컴퓨터 데이터',place:'지하 연구시설, ARCHIVE실',date:'실시간',color:'nuri',
  text:'ARCHIVE SYSTEM. USER: UNKNOWN. STATUS: RECORDING.\n\n화면 아래로 나의 모든 움직임이 한 줄씩 적히고 있다. 이동, 정지, 조사, 망설임.\n\n나는 기록을 모으고 있었다. 그리고 누군가는 줄곧 나를 기록하고 있었다.'},
 accesslog:{title:'B3 출입 기록',type:'출입 기록',place:'지하 연구시설, 보안 게이트',date:'2011~2026',color:'red',
  text:'2011.10.14 16:30 기록자 입장\n2014.10.14 09:12 기록자 입장\n2017.10.14 09:12 기록자 입장\n2020.10.14 09:12 기록자 입장\n2023.10.14 09:12 기록자 입장\n2026.10.14 09:12 기록자 입장\n\n서로 다른 해, 같은 이름. 퇴장 기록은 한 건도 없다.'},
 server:{title:'오래된 서버',type:'컴퓨터 데이터',place:'지하 연구시설, 서버실',date:'실시간',color:'white',
  text:'누적 관측 기록: 1,247,009건.\n현재 관측 중인 대상: 1명.\n\n전원: 제3발전기 비상 라인.\n\n비상 탈출구 개방 시 전원 차단. 모든 관측 기록이 소실됩니다.'},
 recorder:{title:'연구원의 녹음',type:'녹음기',place:'지하 연구시설, 보안 게이트',date:'날짜 불명',color:'white',
  text:'녹음기에서 지친 목소리가 흘러나온다.\n\n"문을 열면 기록이 지워진다. 기록을 지키면 문이 닫힌다. 우리 중 누구도 둘 다를 가질 순 없었다."\n\n"…그래도 기록자라면. 모든 기록을 끝까지 모은 기록자라면, 어쩌면."'},
 deleted:{title:'복구된 최종 보고',type:'연구 자료',place:'지하 연구시설, ARCHIVE실',date:'2011.10.14',color:'nuri',
  text:'PROJECT NURI 최종 보고 (복구됨).\n\n17:02, 누리느엘 개방. 도시 전체가 관측 범위에 들어감.\n\n관측된 사람들은 사라지지 않았다. 그들은 기록이 되었다. 끝나지 않는 10월 14일 속에서.\n\n관측을 유지하려면 관측자가 필요하다. 31번 대상을 관측자로 지정함. 호칭: 기록자.'},
 code:{title:'최종 잠금 해제 코드',type:'연구 자료',place:'지하 연구시설, ARCHIVE실',date:'날짜 불명',color:'red',esc:true,
  text:'비상 탈출구 최종 잠금 해제 코드.\n\n코드 = [관측 대상의 수] + [누리느엘 개방 시각의 분]\n\n네 자리. 기록을 기억하는 자만 문을 열 수 있다.\n\n탈출구로 이어지는 마지막 기록이다.'},
 notfirst:{title:'피험자 31 관찰 기록',type:'연구 자료',place:'지하 연구시설, 폐쇄된 실험실',date:'2026.10.14',color:'red',
  text:'피험자 31. 스스로를 기록자라 인식함. 이전 회차의 기억 없음.\n\n회차: 5\n\n마지막 줄, 붉은 펜으로 덧쓴 글씨.\n\n"기록자는 이곳에 처음 온 사람이 아니다."'},
 c0400:{title:'광장의 가로등 시계',type:'시계',place:'누리느엘, 광장',date:'04:00',color:'white',
  text:'광장 가로등에 매달린 시계는 04시 00분에서 멈춰 있다.\n\n신문이 말한 사고 시각이다. 그런데 이 시계만 유독 색이 바래 있다. 누군가 억지로 바늘을 돌려 놓은 것처럼.'},
 c1500:{title:'강당 시계',type:'시계',place:'누리느엘, 홀',date:'15:00',color:'nuri',
  text:'홀 벽에 걸린 강당 시계. 15시 00분.\n\n폴라로이드 속 아이들 뒤에 걸려 있던 바로 그 시계다. 축제가 끝난 시각.'},
 c1650:{title:'지하의 벽시계',type:'시계',place:'누리느엘, 지하 3층',date:'16:50',color:'nuri',
  text:'지하 3층의 괘종시계는 16시 50분을 가리킨다.\n\n교무일지에 적힌 시각. 석말공장 사람들이 학교에 도착한 순간이다.'},
 c1658:{title:'옥상의 시계',type:'시계',place:'누리느엘, 옥상',date:'16:58',color:'nuri',
  text:'옥상 난간의 시계, 16시 58분.\n\nCCTV 속 흰 코트의 사람이 레버실로 들어간 시각이다.'},
 c1702:{title:'서윤의 손목시계',type:'시계',place:'누리느엘, 홀',date:'17:02',color:'nuri',
  text:'서윤의 손목시계는 17시 02분에서 멈춰 있다.\n\n방송이 흘러나오고, 누리느엘이 열린 시각.'},
 seoyun:{title:'한서윤',type:'사람',place:'누리느엘, 홀',date:'2011.10.14',color:'nuri',
  text:'홀 한가운데, 교복 차림의 소녀가 웃고 있다. 폴라로이드 속 그 얼굴이다.\n\n"오늘 축제 진짜 재밌었지? 내일도 축제야. 모레도."\n\n"여기선 아무도 늙지 않아. 아무것도 끝나지 않아. …근데 너는 왜 자꾸 떠나?"'},
 phone2:{title:'누리느엘의 공중전화',type:'전화기',place:'누리느엘, 광장',date:'날짜 불명',color:'red',
  text:'수화기를 들자, 입이 저절로 움직였다.\n\n"……거기 누구 있어요? 신문은 믿지 마세요. 그날, 학교엔 사람들이 있었어요."\n\n도시의 공중전화에서 들었던 그 목소리. 그건 나였다.',
  pages:[{t:'공중전화가 울린다. 수화기를 들었다.'},{t:'상대편에서는 잡음만 들린다. 그런데 내 입이 저절로 움직였다.'},{s:'나',t:'……거기 누구 있어요?'},{s:'나',t:'신문은 믿지 마세요. 그날, 학교엔 사람들이 있었어요.'},{s:'나',t:'다들 아직… 아직 거기서……'},{s:'나',t:'……기록자님?'},{t:'뚝.'},{t:'도시의 공중전화에서 들었던 목소리.\n그건, 나였다.'}]},
 nlcore:{title:'기록자의 기록',type:'기록',place:'누리느엘, 중심부',date:'모든 회차',color:'nuri',
  text:'모든 회차의 기록자가 남긴 한 권의 기록.\n\n1회차: 문을 열었다. 잊었다.\n2회차: 문을 열었다. 잊었다.\n3회차: 이곳에서 빛에 닿았다. 기록이 되었다.\n4회차: 문을 열었다. 진실을 안 채 떠났다. 그리고 다시 DAY 1.\n5회차: 기록을 지켰다. 이곳에 왔다. 되돌아갔다.\n\n한 번도, 모든 기록을 가져간 적은 없다.\n\n6회차: ____'}
 ,kc1:{title:'노이즈 좀비의 주민증',type:'처치 기록',place:'폐허 도시, 쓰러진 좀비',date:'날짜 불명',color:'white',
  text:'쓰러진 좀비의 주머니에서 나온 삼실특별시 주민등록증.\n\n사진 칸의 얼굴만 지지직거리는 노이즈로 번져 있다. 이름과 주소는 멀쩡한데.\n\n이 사람은 이 도시에 살던 주민이었다.'}
 ,kc5:{title:'구겨진 쪽지',type:'처치 기록',place:'폐허 도시, 쓰러진 좀비',date:'2011.10.14',color:'white',
  text:'손에 꽉 쥐고 있던 쪽지.\n\n"오늘 5시 전에 학교 앞으로. 누리느엘에 같이 들어가면, 다시는 헤어지지 않아도 된대."\n\n좀비는 쓰러지기 직전까지 쪽지를 놓지 않았다.'}
 ,kc10:{title:'멈춘 손목시계',type:'처치 기록',place:'폐허 도시, 쓰러진 좀비',date:'17:02',color:'red',
  text:'열 번째로 쓰러진 좀비의 손목시계.\n\n바늘은 17시 02분에 멈춰 있다. 지금까지 쓰러뜨린 좀비들의 시계도, 하나같이 같은 시각이었다.'}
 ,ks1:{title:'학생 명찰',type:'처치 기록',place:'폐교, 쓰러진 좀비',date:'2011.10.14',color:'white',
  text:'작은 좀비가 달고 있던 한결중학교 명찰. 2학년 3반.\n\n이름은 출석부에서 본 이름 중 하나다. 그날 "출석"으로 적혀 있던 아이.'}
 ,ks5:{title:'가정통신문',type:'처치 기록',place:'폐교, 쓰러진 좀비',date:'2011.10.10',color:'white',
  text:'"10월 14일(금) 한결중학교 축제는 예정대로 진행합니다. 17시에는 석말공장의 협조로 특별 행사가 있습니다. 많은 참여 바랍니다."\n\n휴교라는 말은 어디에도 없다.'}
 ,ks10:{title:'담임의 수첩',type:'처치 기록',place:'폐교, 쓰러진 좀비',date:'2011.10.14',color:'red',
  text:'정장 차림 좀비의 안주머니에서 나온 수첩.\n\n"17:02. 아이들이 빛 쪽으로 걸어갔다. 나도 따라갔다. 몸이 무겁다. 들어가지 못한다. 31번 자리는 끝까지 비어 있었다."'}
 ,kf1:{title:'작업자 출입증',type:'처치 기록',place:'거대 공장, 쓰러진 좀비',date:'2011.10.14',color:'white',
  text:'석말공장 제3구역 작업자 출입증. 마지막 출입 기록: 16:59 입장.\n\n작업 일지에는 16시 40분에 전원 철수했다고 적혀 있었다.'}
 ,kf5:{title:'방독면 필터',type:'처치 기록',place:'거대 공장, 쓰러진 좀비',date:'날짜 불명',color:'yellow',
  text:'좀비가 쓰고 있던 방독면의 필터. 측면에 "NURI 가스 차단용 · 시험품" 라벨.\n\n필터 안쪽이 하얀 가루로 가득하다. 막지 못한 것이다.'}
 ,kf10:{title:'NURI 팀 배지',type:'처치 기록',place:'거대 공장, 쓰러진 좀비',date:'2011.10.01',color:'red',
  text:'흰 가운을 입은 좀비의 가슴에 달린 배지. "PROJECT NURI · 개방 담당".\n\n문을 연 사람들도, 들어가지 못했다.'}
 ,kl1:{title:'연구원 ID 카드',type:'처치 기록',place:'지하 연구시설, 쓰러진 좀비',date:'2011.10.14',color:'white',
  text:'B3 연구원 ID 카드. 출입 기록이 카드 뒷면에 인쇄되어 있다.\n\n입장 16:30. 퇴장 기록 없음.'}
 ,kl5:{title:'관측 자원 동의서',type:'처치 기록',place:'지하 연구시설, 쓰러진 좀비',date:'2011.10.13',color:'nuri',
  text:'"본인은 누리느엘 관측에 자원하며, 영혼 이전 과정에서 육체가 남겨질 수 있음을 이해합니다."\n\n서명 아래, 떨리는 글씨로 덧붙여져 있다. "남겨진 몸은 어떻게 되나요?"'}
 ,kl10:{title:'몸에 박힌 기록 장치',type:'처치 기록',place:'지하 연구시설, 쓰러진 좀비',date:'실시간',color:'red',
  text:'열 번째 좀비의 목덜미에 작은 장치가 박혀 있다. 화면에 한 줄.\n\n"ARCHIVE · SUBJECT BODY · STATUS: RECORDING"\n\n좀비들도 기록되고 있었다.'}
 ,nlpaper:{title:'누리느엘 일보',type:'신문',place:'누리느엘, 광장 가판대',date:'매일 10월 14일',color:'nuri',
  text:'[1면] 들어오지 못한 사람들\n\n17시 02분, 많은 이들이 누리느엘로 향했다. 그러나 모두가 온전히 들어오지는 못했다. 영혼은 이곳에 닿았지만, 육체는 폐허에 남았다.\n\n남겨진 몸에는 의식이 없다. 얼굴은 기록되지 않아 노이즈로 번지고, 본능만 남아 움직인다. 폐허를 떠도는 그들은 괴물이 아니다.\n\n그러니 누리느엘에는 그들이 없다. 그들은 이미, 여기 있으니까.'}
};
const TOTAL=Object.keys(R).length;
const CONTRA=[
 {a:'news',b:'photo',flag:'dateTruth',title:'휴교령은 없었다',
  text:'신문은 14일 하루 휴교령이 내려졌다고 한다.\n하지만 사진 속 아이들은 14일 오후 3시, 학교 축제를 즐기고 있다.\n\n신문이 거짓이다. 10월 14일, 학교에는 사람이 있었다.'},
 {a:'news',b:'radio',title:'사고는 새벽이 아니었다',
  text:'신문은 새벽 4시의 사고, 인명 피해 없음이라고 한다.\n그런데 라디오는 오후 5시에 긴급 대피를 알렸다.\n\n대피가 필요한 무언가가 그날 오후에 일어났다.'},
 {a:'news',b:'log',title:'지워진 오후',
  text:'교무일지에는 휴교 지시가 없었다고 적혀 있다.\n그리고 오후 4시 50분, 석말공장 사람들이 학교에 왔다.\n\n신문은 그 오후를 통째로 지웠다.'},
 {a:'roll',b:'video',flag:'nameKnown',title:'출석부에 없는 학생',
  text:'출석부의 30명 중에 "기록자"라는 이름은 없다.\n하지만 영상 속 학생의 명찰에는 분명히 "기록자"라고 적혀 있다.\n\n이 학교에는 출석부에 없는 학생이 있었다.'},
 {a:'roll',b:'nuri',title:'31번째',
  text:'출석부의 재적 인원은 30명.\n보고서의 관측 대상은 31명.\n\n한 명은 오직 기록 속에만 존재한다.'},
 {a:'diary2',b:'nuri',title:'끝나지 않는 하루',
  text:'일기 속 하루는 10월 14일에서 멈춰 있다.\n보고서는 관측 대상이 "관측되는 동안 소멸하지 않는다"고 한다.\n\n누군가 그날을 지금도 기록하고 있다.'},
 {a:'govdoc',b:'cctv',title:'존재하지 않는 영상',
  text:'정부 문서는 10월 14일의 공장 CCTV 기록이 존재하지 않는다고 한다.\n하지만 나는 지금 그 영상을 보고 있다.\n\n누군가 기록이 없다고 발표했다. 기록은 지워지지 않았다.'},
 {a:'news',b:'worklog',title:'새벽의 사고는 없었다',
  text:'신문은 새벽 4시의 냉각 설비 고장이라고 했다.\n작업 일지의 새벽 4시 점검 결과는 "이상 없음".\n\n무언가가 일어난 건 17시 02분, 기록이 끊긴 바로 그 순간이다.'},
 {a:'manual',b:'resdiary',flag:'manualLie',title:'거짓 매뉴얼',
  text:'매뉴얼은 A, B, C 순서를 지시한다.\n연구원은 매뉴얼대로 당기면 발전기가 폭주한다고 적었다.\n\n믿을 수 있는 건 그날 흰 코트의 사람이 당긴 순서뿐이다.'},
 {a:'cctv',b:'video',title:'노트를 든 사람',
  text:'축제 영상 속 "기록자" 명찰의 학생. CCTV 속 흰 코트의 사람.\n둘 다 무언가를 계속 적고 있다.\n\n같은 날, 같은 도시. 기록자는 어디에나 있었다.'},
 {a:'nuri',b:'nuriel',title:'지워진 이름',
  text:'학교의 보고서에서 검게 지워져 있던 네 글자.\n공장의 문서는 그 이름을 숨기지 않는다.\n\n누리느엘. 도시가 사라진 이유는 그곳에 있다.'},
 {a:'accesslog',b:'diary2',title:'매년 같은 날',
  text:'일기 속 하루는 언제나 10월 14일이다.\n출입 기록의 날짜도 매번 10월 14일. 바뀌는 건 해뿐이다.\n\n기록자는 그날로, 몇 번이고 돌아왔다.'},
 {a:'accesslog',b:'phone',title:'나를 아는 목소리',
  text:'공중전화 속 목소리는 처음 보는 나를 "기록자님"이라고 불렀다.\n출입 기록에는 같은 이름이 여섯 번.\n\n그 사람은 나를 처음 만난 게 아니었다.'},
 {a:'notfirst',b:'map',title:'붉은 펜의 주인',
  text:'도시 안내도에 EXIT를 그려 둔 붉은 펜.\n관찰 기록 마지막 줄을 덧쓴 붉은 펜.\n\n같은 필체다. 탈출구를 표시한 건 이전 회차의 기록자, 나였다.'},
 {a:'server',b:'power',title:'지워지는 도시',
  text:'탈출구가 열리면 서버의 전원이 끊긴다.\n누적 관측 기록 1,247,009건, 도시의 모든 사람이 거기 있다.\n\n문을 여는 건 탈출이자, 도시를 완전히 지우는 일이다.'},
 {a:'c0400',b:'worklog',title:'거짓의 시간',
  text:'가로등 시계는 04:00. 신문이 말한 사고 시각이다.\n하지만 작업 일지의 새벽 4시는 "이상 없음".\n\n누리느엘의 시계 중 이것 하나만 거짓을 가리킨다.'},
 {a:'phone2',b:'phone',title:'전화를 건 사람',
  text:'도시의 공중전화에서 들은 목소리.\n누리느엘의 공중전화에서 내 입으로 한 말.\n\n똑같다. 나에게 경고한 건, 나였다.'},
 {a:'seoyun',b:'photo',title:'자라지 않는 아이',
  text:'폴라로이드 속 서윤, 2011년.\n누리느엘의 서윤. 15년이 지났는데 그대로다.\n\n이곳에서는 아무도 늙지 않는다.'},
 {a:'nlcore',b:'notfirst',title:'여섯 번째',
  text:'관찰 기록의 회차는 5.\n기록자의 기록에 남은 다섯 번의 선택.\n\n이번이 여섯 번째다. 그리고 아직, 모든 기록을 가져간 적은 없다.'},
 {a:'kc1',b:'nlpaper',title:'얼굴 없는 사람들',text:'주민증 사진의 얼굴만 노이즈로 번져 있었다.\n누리느엘 일보는 들어오지 못한 이들의 얼굴은 기록되지 않는다고 한다.\n\n노이즈 좀비는, 이 도시의 주민이었다.'},
 {a:'kc5',b:'board',title:'같은 약속',text:'좀비의 쪽지: "누리느엘에 같이 들어가면 헤어지지 않아도 된대."\n칠판의 글씨: "그곳에서 만나."\n\n그들은 도망친 게 아니라, 스스로 그곳으로 향했다.'},
 {a:'kc10',b:'broadcast',title:'멈춘 시각',text:'좀비들의 시계는 모두 17시 02분.\n마지막 대피 방송도 17시 02분.\n\n그 순간, 사람들은 몸을 두고 떠났다.'},
 {a:'ks1',b:'roll',title:'출석한 아이',text:'출석부에 "출석"으로 적힌 이름.\n같은 이름의 명찰을 단 좀비.\n\n내가 쓰러뜨린 것은, 그날 학교에 있던 아이였다.'},
 {a:'ks5',b:'news',title:'통신문은 휴교를 몰랐다',text:'신문은 14일 하루 휴교령이 있었다고 했다.\n가정통신문은 축제를 예정대로 연다고, 17시에 특별 행사가 있다고 알렸다.\n\n그 "특별 행사"가 누리느엘의 개방이었다.'},
 {a:'ks10',b:'notfirst',title:'빈 31번 자리',text:'담임의 수첩: 31번 자리는 끝까지 비어 있었다.\n피험자 31: 스스로를 기록자라 인식함.\n\n그날 31번은 교실이 아니라, 모두를 기록하는 자리에 있었다.'},
 {a:'kf1',b:'worklog',title:'철수하지 못한 사람',text:'작업 일지: 16시 40분 전원 철수.\n작업자 출입증: 16시 59분 입장.\n\n누군가는 철수하지 않고, 오히려 그 안으로 들어갔다.'},
 {a:'kf5',b:'govdoc',title:'존재하지 않는 가스',text:'정부 문서는 단순한 기계 고장이라고 했다.\n방독면에는 "NURI 가스 차단용" 라벨이 붙어 있었다.\n\n막으려던 무언가가 분명히 있었다.'},
 {a:'kf10',b:'resdiary',title:'문을 연 사람들',text:'연구원의 일기: "우리는 문을 열었다."\nNURI 팀 배지를 단 좀비.\n\n문을 연 사람들조차 그 문을 지나가지 못했다.'},
 {a:'kl1',b:'accesslog',title:'퇴장하지 않은 사람들',text:'B3 출입 기록에는 퇴장 기록이 없었다.\n연구원의 ID 카드에도 퇴장 기록이 없다.\n\n그들은 나간 게 아니라, 이곳에서 몸을 잃었다.'},
 {a:'kl5',b:'deleted',title:'남겨진 몸',text:'복구된 보고서: 관측된 사람들은 기록이 되었다.\n자원 동의서: "남겨진 몸은 어떻게 되나요?"\n\n그 질문의 대답이, 폐허를 떠돌고 있었다.'},
 {a:'kl10',b:'archive',title:'기록되는 몸',text:'ARCHIVE는 내 움직임을 기록하고 있었다.\n좀비의 목덜미에도 같은 장치가 박혀 있었다.\n\n나와 그들은, 같은 시스템 안에 있다.'},
 {a:'nlpaper',b:'seoyun',title:'들어간 사람',text:'누리느엘 일보: 모두가 온전히 들어오지는 못했다.\n홀의 서윤은 웃으며 내일도 축제라고 말한다.\n\n서윤은, 온전히 들어온 몇 안 되는 사람이다.'}
];
const ESC=[{id:'map',l:'출입구 위치 기록',a:'폐허 도시'},{id:'broadcast',l:'대피 방송 기록',a:'폐교'},{id:'power',l:'전력 공급 기록',a:'거대 공장'},{id:'code',l:'최종 잠금 해제 코드',a:'지하 연구시설'}];

/* ================= MAPS ================= */
function grid(w,h,c){return Array.from({length:h},()=>Array(w).fill(c));}
function rect(g,x,y,w,h,c){for(let j=y;j<y+h;j++)for(let i=x;i<x+w;i++)if(g[j]&&g[j][i]!==undefined)g[j][i]=c;}
function put(g,l,c){l.forEach(p=>{g[p[1]][p[0]]=c;});}
function buildCity(){
 const g=grid(40,30,',');
 rect(g,0,0,40,1,'#');rect(g,0,29,40,1,'#');rect(g,0,0,1,30,'#');rect(g,39,0,1,30,'#');
 rect(g,1,13,38,4,'.');rect(g,18,1,4,28,'.');
 [[2,2,7,5],[11,2,5,5],[24,2,6,5],[32,2,6,5],[2,19,8,6],[11,20,5,5],[24,19,5,6],[31,19,7,6]].forEach(b=>rect(g,b[0],b[1],b[2],b[3],'#'));
 g[0][19]='G';g[0][20]='G';
 put(g,[[5,14],[10,15],[27,13],[20,8],[19,23],[35,15],[14,13]],'c');
 put(g,[[7,8],[8,8],[12,17],[29,17],[30,17],[3,26]],'r');
 put(g,[[10,10],[23,10],[16,26],[30,11]],'T');
 return {w:40,h:30,g};
}
function buildSchool(){
 const g=grid(34,27,'#');
 rect(g,1,12,32,3,'f');
 rect(g,2,3,8,8,'f');g[11][5]='f';g[11][6]='f';
 rect(g,12,3,7,8,'f');g[11][15]='f';
 rect(g,21,3,5,8,'f');g[11][23]='f';
 rect(g,28,3,5,8,'f');g[11][30]='f';
 rect(g,2,16,9,6,'f');g[15][6]='f';
 rect(g,15,16,7,6,'f');
 rect(g,26,15,2,10,'f');g[25][26]='E';g[25][27]='E';
 put(g,[[3,6],[5,6],[7,6],[3,8],[5,8],[7,8],[13,7],[17,7],[22,7],[24,7],[29,7],[3,18],[5,18],[7,18],[9,18],[3,20],[5,20],[7,20],[9,20]],'d');
 return {w:34,h:27,g};
}
function buildFactory(){
 const g=grid(38,30,'#');
 rect(g,2,12,34,10,'m');
 rect(g,3,3,7,8,'m');g[11][6]='m';
 rect(g,12,3,6,8,'m');g[11][14]='m';
 rect(g,20,3,6,8,'m');g[11][22]='m';
 rect(g,28,3,7,8,'m');g[11][31]='L';
 rect(g,3,23,8,5,'m');g[22][7]='m';
 rect(g,26,23,6,5,'m');g[22][28]='K';
 rect(g,17,22,4,6,'m');g[28][18]='E';g[28][19]='E';
 rect(g,5,14,4,3,'X');rect(g,26,14,5,3,'X');rect(g,12,18,3,2,'X');rect(g,23,18,3,2,'X');
 put(g,[[5,25],[7,25]],'X');
 put(g,[[10,13],[20,15],[32,19],[16,20],[4,20]],'v');
 g[26][29]='Z';g[26][30]='Z';
 return {w:38,h:30,g};
}
function buildLab(){
 const g=grid(36,40,'#');
 rect(g,16,1,4,5,'n');g[1][17]='U';g[1][18]='U';
 rect(g,3,6,30,3,'n');
 rect(g,3,1,9,4,'n');g[5][7]='n';
 rect(g,23,1,10,4,'n');g[5][27]='n';
 put(g,[[24,1],[26,1],[28,1],[30,1],[24,3],[26,3],[28,3],[30,3]],'S');
 rect(g,3,10,8,6,'n');g[9][6]='n';
 rect(g,13,10,10,7,'n');g[9][17]='n';g[9][18]='n';
 rect(g,25,10,7,6,'n');g[9][28]='J';
 rect(g,33,6,2,24,'n');g[10][33]='Q';g[10][34]='Q';
 rect(g,10,30,25,8,'n');
 return {w:36,h:40,g};
}
const MAPS={city:buildCity(),school:buildSchool(),factory:buildFactory(),lab:buildLab()};
function buildNL(){
 const g=grid(50,44,'V');
 rect(g,4,1,20,8,'w');
 for(let y=6;y<=7;y++)for(let x=5;x<=21;x++)if(x!==13&&x!==14)g[y][x]='C';
 rect(g,13,9,2,5,'h');
 rect(g,2,14,24,10,'w');rect(g,0,18,28,3,'o');
 rect(g,3,14,5,3,'B');rect(g,18,14,6,3,'B');
 rect(g,30,2,12,8,'Y');rect(g,38,2,4,2,'B');
 rect(g,30,13,12,7,'R');rect(g,31,13,4,2,'B');
 rect(g,30,23,18,12,'W');
 return {w:50,h:44,g};
}
MAPS.nl=buildNL();
const NL_ZONES=[['중심부',4,1,20,8],['없던 길',13,9,2,5],['광장',0,14,28,10],['지하 3층',30,2,12,8],['옥상',30,13,12,7],['홀',30,23,18,12]];
const CLOCKS=['c0400','c1500','c1650','c1658','c1702'];
const LAB_ROOMS=[['ARCHIVE실',3,1,9,4],['서버실',23,1,10,4],['보안 게이트',3,10,8,6],['장치실',13,10,10,7],['폐쇄된 실험실',25,10,7,6],['수직 통로',33,6,2,24],['탈출구 앞',10,30,25,8],['B3 복도',3,6,30,3],['계단',16,1,4,5]];
const VENTS=[];MAPS.factory.g.forEach((row,y)=>row.forEach((c,x)=>{if(c==='v')VENTS.push([x,y]);}));
const RUBBLE_S=new Set(['8,13','9,12','22,14','31,13']);
const SOLID=new Set(['#','r','c','T','G','d','M','X','L','K','S','Q','J','V','B','C']);
const AREA_NAME={city:'AREA 01 · 폐허 도시',school:'AREA 02 · 폐교',factory:'AREA 03 · 거대 공장',lab:'AREA 04 · 지하 연구시설',nl:'AREA 05 · 누리느엘'};

/* ================= STATE ================= */
function fresh(){return {area:'city',x:5.5*TS,y:27.6*TS,records:[],contra:[],flags:{},past:false,time:0,hp:150,bats:[{sp:false,dur:300}],items:{energy:0,bandage:0,aid:0},kills:{},loot:null};}
let S=fresh();
const P={x:S.x,y:S.y,fx:0,fy:1,moving:false,anim:0,vx:0,vy:0,running:false,sta:1,tired:false,dustT:0,phase:0,walkW:0,runW:0,face:'d',lookA:Math.PI/2};
let FPV=false;try{FPV=localStorage.getItem('ruins-fpv')==='1';}catch(e){}
const VISION_BOOST=1.5,VISION_HALF=0.95;
function angDiff(a,b){let d=a-b;while(d>Math.PI)d-=Math.PI*2;while(d<-Math.PI)d+=Math.PI*2;return d;}
const DUST=[];
let started=false,transitioning=false,arcOpen=false,kpOpen=false,endOpen=false;
let near=null,shakeT=0,wrongTries=0;
function has(id){return S.records.indexOf(id)>=0;}
/* ---------- 계정 저장 ----------
 우선순위: ① claude.ai에서 열었을 때 → claude.ai 계정 저장소
           ② window.RUINS_SERVER 주소가 있을 때 → 직접 만든 서버 (README의 API 참고)
           ③ 둘 다 없을 때 → 이 브라우저(localStorage)에만 저장 */
const SERVER_URL=String(window.RUINS_SERVER||'').trim().replace(/\/+$/,'');
const TOKEN_KEY='ruins-record-token';
const ACC={state:'loading',mode:'off',profile:null,cloud:null,be:null};
let wiped=false,cloudPending=null,cloudBusy=false,cloudTimer=null,profChain=Promise.resolve();
function save(){
 if(wiped||!started)return;
 S.x=P.x;S.y=P.y;const str=JSON.stringify(Object.assign({},S,{past:false,savedAt:Date.now()}));
 try{localStorage.setItem(KEY,str);}catch(e){}
 if(ACC.state==='ready'&&ACC.profile){cloudPending=str;clearTimeout(cloudTimer);setSync('pending');cloudTimer=setTimeout(flushCloud,1200);}
 else setSync('local');
}
async function flushCloud(){
 if(cloudBusy||!cloudPending||wiped||!ACC.profile)return;
 cloudBusy=true;const str=cloudPending;cloudPending=null;
 try{await ACC.be.saveSet(str);ACC.cloud={state:str};setSync(cloudPending?'pending':'saved');}
 catch(e){
  if(e&&e.code==='unavailable'){if(!cloudPending)cloudPending=str;setSync('retry');setTimeout(()=>{cloudBusy=false;flushCloud();},2000+Math.random()*2000);return;}
  if(e&&e.code==='unauthenticated'){signedOut('로그인이 만료됐어요. 다시 로그인하면 계정 저장이 이어집니다.');}
  else setSync(e&&e.code==='quota_exceeded'?'full':'error');
 }
 cloudBusy=false;if(cloudPending)cloudTimer=setTimeout(flushCloud,800);
}
function parseSave(str){try{const d=typeof str==='string'?JSON.parse(str):str;if(d&&Array.isArray(d.records))return d;}catch(e){}return null;}
function localSave(){try{return parseSave(localStorage.getItem(KEY));}catch(e){return null;}}
function loadSave(){
 const local=localSave();
 const cloud=ACC.cloud?parseSave(ACC.cloud.state):null;
 if(ACC.state==='ready'&&ACC.profile){if(cloud&&local)return (local.savedAt||0)>(cloud.savedAt||0)?local:cloud;return cloud||local;}
 return local;
}
function wipeSave(){
 wiped=true;cloudPending=null;clearTimeout(cloudTimer);
 try{localStorage.removeItem(KEY);}catch(e){}
 ACC.cloud=null;
 if(ACC.state==='ready'&&ACC.profile)return ACC.be.saveDel().catch(()=>{});
 return Promise.resolve();
}
function profUpdate(patch){
 if(ACC.state!=='ready'||!ACC.profile)return;
 Object.assign(ACC.profile,patch);
 profChain=profChain.then(()=>ACC.be.profUpdate(patch)).catch(()=>{});
}
function addEver(id){if(!ACC.profile)return;const ev=ACC.profile.ever||[];if(ev.indexOf(id)<0)profUpdate({ever:ev.concat([id])});}
function addEnding(k){
 if(ACC.profile){const en=ACC.profile.endings||[];if(en.indexOf(k)<0)profUpdate({endings:en.concat([k])});}
 try{const l=JSON.parse(localStorage.getItem('ruins-record-endings')||'[]');if(l.indexOf(k)<0){l.push(k);localStorage.setItem('ruins-record-endings',JSON.stringify(l));}}catch(e){}
}
function localLoops(){try{return +localStorage.getItem('ruins-record-loop')||0;}catch(e){return 0;}}
function localEndings(){try{return JSON.parse(localStorage.getItem('ruins-record-endings')||'[]');}catch(e){return [];}}
function getLoops(){if(ACC.profile&&typeof ACC.profile.loops==='number')return ACC.profile.loops;return localLoops();}
function addLoop(){const n=getLoops()+1;try{localStorage.setItem('ruins-record-loop',String(n));}catch(e){}profUpdate({loops:n});return n-1;}
function setSync(st){
 const el=$('sync');if(!el)return;
 el.textContent={pending:'· 계정에 저장 중',saved:'· 계정에 저장됨',retry:'· 서버 연결 재시도 중',local:'· 이 브라우저에 저장',error:'· 저장 실패 (이 브라우저에만 저장됨)',full:'· 저장 공간 부족'}[st]||'';
}

/* --- ① claude.ai 계정 --- */
async function claudeBackend(){
 if(!window.claude||typeof window.claude.use!=='function')return null;
 const r=await Promise.all([window.claude.use('db'),window.claude.use('user')]);
 const db=r[0],user=r[1];if(!db||!user)return null;
 const uid=await user.id();if(!uid)return null;
 const profDoc=db.doc('data/users/'+uid+'/profile'),saveDoc=db.doc('data/users/'+uid+'/save');
 const g=await Promise.all([profDoc.get(),saveDoc.get()]);
 return {
  profile:g[0].exists?Object.assign({},g[0].data()):null, cloud:g[1].exists?g[1].data():null,
  be:{
   saveSet:str=>saveDoc.set({state:str,savedAt:Date.now()}),
   saveDel:()=>saveDoc.delete(),
   profUpdate:patch=>profDoc.update(patch),
   create:async name=>{const prof={name,created:Date.now(),loops:localLoops(),ever:(localSave()||{records:[]}).records.slice(),endings:localEndings()};await profDoc.set(prof);return prof;}
  }
 };
}

/* --- ② 직접 만든 서버 --- */
function getToken(){try{return localStorage.getItem(TOKEN_KEY)||'';}catch(e){return '';}}
function setToken(t){try{if(t)localStorage.setItem(TOKEN_KEY,t);else localStorage.removeItem(TOKEN_KEY);}catch(e){}}
async function api(method,path,body,auth){
 const h={'Content-Type':'application/json'};
 if(auth!==false){const t=getToken();if(t)h.Authorization='Bearer '+t;}
 let res;
 try{res=await fetch(SERVER_URL+path,{method,headers:h,body:body===undefined?undefined:JSON.stringify(body)});}
 catch(e){throw {code:'unavailable'};}
 let data=null;try{data=await res.json();}catch(e){}
 if(res.ok)return data||{};
 const code=res.status===401?'unauthenticated':res.status===413?'quota_exceeded':(res.status===429||res.status>=500)?'unavailable':((data&&data.error)||'error');
 throw {code,message:data&&data.message};
}
const serverBe={
 saveSet:str=>api('PUT','/api/save',{state:str,savedAt:Date.now()}),
 saveDel:()=>api('DELETE','/api/save'),
 profUpdate:patch=>api('PATCH','/api/profile',patch)
};
async function serverInit(){
 if(!getToken())return {profile:null,cloud:null};
 try{const r=await api('GET','/api/me');return {profile:r.profile||null,cloud:r.save||null};}
 catch(e){if(e.code==='unauthenticated')setToken('');return {profile:null,cloud:null,err:e.code};}
}
async function serverAuth(kind){
 const n=$('accName'),pw=$('accPw'),msg=$('accMsg');
 const name=(n.value||'').trim(),pass=pw.value||'';
 if(!name){msg.textContent='기록자 이름을 적어 주세요.';n.focus();return;}
 if(pass.length<6){msg.textContent='비밀번호는 6자 이상이어야 해요.';pw.focus();return;}
 document.querySelectorAll('#acc button').forEach(b=>b.disabled=true);msg.textContent=kind==='register'?'계정을 만드는 중…':'로그인 중…';
 try{
  const r=await api('POST',kind==='register'?'/api/register':'/api/login',{name,password:pass},false);
  setToken(r.token);ACC.profile=r.profile;ACC.cloud=r.save||null;
  if(kind==='register'){
   const local=localSave();
   const patch={loops:localLoops(),ever:local?local.records.slice():[],endings:localEndings()};
   try{await api('PATCH','/api/profile',patch);Object.assign(ACC.profile,patch);}catch(e){}
   if(local){try{await api('PUT','/api/save',{state:JSON.stringify(local),savedAt:Date.now()});ACC.cloud={state:JSON.stringify(local)};}catch(e){}}
   toast('기록자 '+name+' 계정을 만들었어요. 이제 진행이 서버에 저장됩니다.');
  } else toast('기록자 '+ACC.profile.name+'(으)로 로그인했어요.');
 }catch(e){
  const t={name_taken:'이미 쓰고 있는 기록자 이름이에요.',bad_credentials:'이름 또는 비밀번호가 틀렸어요.',invalid_name:'이름은 1~12자로 적어 주세요.',invalid_password:'비밀번호는 6~72자로 적어 주세요.',unavailable:'서버에 연결하지 못했어요. 잠시 후 다시 시도해 주세요.'};
  msg.textContent=t[e.code]||e.message||'요청을 처리하지 못했어요.';
  document.querySelectorAll('#acc button').forEach(b=>b.disabled=false);return;
 }
 accountUI();
}
async function serverLogout(){
 try{await api('POST','/api/logout');}catch(e){}
 signedOut('로그아웃했어요. 진행은 이 브라우저에만 저장됩니다.');
}
function signedOut(msg){
 setToken('');ACC.profile=null;ACC.cloud=null;cloudPending=null;clearTimeout(cloudTimer);
 setSync('local');if(msg)toast(msg);accountUI();
}

/* --- ② Firebase --- */
const FB_CFG=(window.RUINS_FIREBASE&&typeof window.RUINS_FIREBASE==='object')?window.RUINS_FIREBASE:null;
let FB=null;
async function loadFirebaseModules(){
 if(window.__RUINS_FB_MODULES)return window.__RUINS_FB_MODULES;
 const base='https://www.gstatic.com/firebasejs/10.12.2/';
 const r=await Promise.all([import(base+'firebase-app.js'),import(base+'firebase-auth.js'),import(base+'firebase-firestore.js')]);
 return {app:r[0],auth:r[1],fs:r[2]};
}
const FB_CODES={'unavailable':'unavailable','deadline-exceeded':'unavailable','auth/network-request-failed':'unavailable','unauthenticated':'unauthenticated','permission-denied':'unauthenticated',
 'resource-exhausted':'quota_exceeded','auth/email-already-in-use':'name_taken','auth/invalid-credential':'bad_credentials','auth/invalid-login-credentials':'bad_credentials','auth/wrong-password':'bad_credentials',
 'auth/user-not-found':'bad_credentials','auth/weak-password':'invalid_password','auth/too-many-requests':'rate_limited','auth/unauthorized-domain':'unauthorized_domain','auth/operation-not-allowed':'provider_off',
 'auth/popup-closed-by-user':'cancelled','auth/cancelled-popup-request':'cancelled','auth/popup-blocked':'popup_blocked'};
function fbErr(e){const c=(e&&e.code)||'';return {code:FB_CODES[c]||c||'error'};}
const wrapFb=fn=>async(...a)=>{try{return await fn(...a);}catch(e){throw fbErr(e);}};
async function fbLoadUser(u){
 const fs=FB.fs;FB.pref=fs.doc(FB.db,'users',u.uid);FB.sref=fs.doc(FB.db,'users',u.uid,'data','save');
 const g=await Promise.all([fs.getDoc(FB.pref),fs.getDoc(FB.sref)]);
 ACC.fbUser=u;ACC.profile=g[0].exists()?Object.assign({},g[0].data()):null;ACC.cloud=g[1].exists()?g[1].data():null;
}
const fbBe={
 saveSet:wrapFb(str=>FB.fs.setDoc(FB.sref,{state:str,savedAt:Date.now()})),
 saveDel:wrapFb(()=>FB.fs.deleteDoc(FB.sref)),
 profUpdate:wrapFb(patch=>FB.fs.updateDoc(FB.pref,patch)),
 create:wrapFb(async name=>{const prof={name,created:Date.now(),loops:localLoops(),ever:(localSave()||{records:[]}).records.slice(),endings:localEndings()};await FB.fs.setDoc(FB.pref,prof);return prof;})
};
async function firebaseInit(){
 const m=await loadFirebaseModules();
 const app=m.app.initializeApp(FB_CFG);
 FB={m,auth:m.auth.getAuth(app),db:m.fs.getFirestore(app),fs:m.fs};
 try{FB.auth.languageCode='ko';}catch(e){}
 const u=await new Promise(res=>{const un=m.auth.onAuthStateChanged(FB.auth,x=>{un();res(x);});});
 if(u){try{await fbLoadUser(u);}catch(e){ACC.fbUser=u;ACC.profile=null;ACC.serverDown=true;}}
}
const AUTH_MSG={name_taken:'이미 가입된 이메일이에요. 로그인해 주세요.',bad_credentials:'이메일 또는 비밀번호가 틀렸어요.',invalid_password:'비밀번호는 6자 이상이어야 해요.',invalid_email:'이메일 형식이 올바르지 않아요.',
 rate_limited:'시도가 너무 많아요. 잠시 후 다시 해 주세요.',unavailable:'서버에 연결하지 못했어요. 잠시 후 다시 시도해 주세요.',unauthorized_domain:'이 주소가 Firebase의 승인된 도메인에 없어요. 콘솔에서 추가해 주세요.',
 provider_off:'Firebase 콘솔에서 이 로그인 방법을 켜 주세요.',popup_blocked:'팝업이 차단됐어요. 팝업을 허용하고 다시 눌러 주세요.',user_disabled:'사용이 중지된 계정이에요.'};
FB_CODES['auth/invalid-email']='invalid_email';FB_CODES['auth/missing-email']='invalid_email';FB_CODES['auth/missing-password']='invalid_password';FB_CODES['auth/user-disabled']='user_disabled';
const EMAIL_RE=/^[^\s@]+@[^\s@]+\.[^\s@]+$/;
let fbForm='login';
async function fbAuth(kind){
 const msg=$('accMsg');
 let email='',pass='',name='';
 if(kind!=='google'){
  email=($('accEmail').value||'').trim();pass=$('accPw').value||'';
  if(kind==='register'){name=($('accName').value||'').trim();
   if(!name||name.length>12){msg.textContent='기록자 이름은 1~12자로 적어 주세요.';$('accName').focus();return;}}
  if(!EMAIL_RE.test(email)){msg.textContent='이메일을 정확히 적어 주세요.';$('accEmail').focus();return;}
  if(pass.length<6){msg.textContent='비밀번호는 6자 이상이어야 해요.';$('accPw').focus();return;}
  if(kind==='register'&&pass!==($('accPw2').value||'')){msg.textContent='비밀번호 확인이 일치하지 않아요.';$('accPw2').focus();return;}
 }
 const btns=document.querySelectorAll('#acc button');btns.forEach(b=>b.disabled=true);
 msg.textContent=kind==='register'?'계정을 만드는 중…':'로그인 중…';
 try{
  const A=FB.m.auth;
  if(kind==='google')await A.signInWithPopup(FB.auth,new A.GoogleAuthProvider());
  else if(kind==='register'){const cred=await A.createUserWithEmailAndPassword(FB.auth,email,pass);
   try{if(A.sendEmailVerification)await A.sendEmailVerification((cred&&cred.user)||FB.auth.currentUser);}catch(e){}}
  else await A.signInWithEmailAndPassword(FB.auth,email,pass);
  await fbLoadUser(FB.auth.currentUser);
  if(!ACC.profile&&kind==='register'){
   ACC.profile=await fbBe.create(name);
   const local=localSave();if(local){try{await fbBe.saveSet(JSON.stringify(local));ACC.cloud={state:JSON.stringify(local)};}catch(e){}}
   toast('기록자 '+name+' 계정을 만들었어요. '+email+'로 인증 메일을 보냈어요.');
  } else if(ACC.profile)toast('기록자 '+ACC.profile.name+'(으)로 로그인했어요.');
 }catch(e){
  const er=(e&&e.code&&FB_CODES[e.code])?fbErr(e):(e&&e.code&&e.code.indexOf('/')<0?e:fbErr(e));
  btns.forEach(b=>b.disabled=false);
  msg.textContent=er.code==='cancelled'?'':(AUTH_MSG[er.code]||'로그인하지 못했어요. ('+er.code+')');
  return;
 }
 fbForm='login';accountUI();
}
async function fbReset(){
 const msg=$('accMsg'),email=($('accEmail').value||'').trim();
 if(!EMAIL_RE.test(email)){msg.textContent='비밀번호를 재설정할 이메일을 먼저 적어 주세요.';$('accEmail').focus();return;}
 try{await FB.m.auth.sendPasswordResetEmail(FB.auth,email);msg.textContent=email+'로 비밀번호 재설정 메일을 보냈어요. 메일함(스팸함 포함)을 확인해 주세요.';}
 catch(e){const er=fbErr(e);msg.textContent=AUTH_MSG[er.code]||'메일을 보내지 못했어요. ('+er.code+')';}
}
async function fbLogout(){try{await FB.m.auth.signOut(FB.auth);}catch(e){}ACC.fbUser=null;signedOut('로그아웃했어요. 진행은 이 브라우저에만 저장됩니다.');}

async function initAccount(){
 try{
  const c=await claudeBackend();
  if(c){ACC.mode='claude';ACC.be=c.be;ACC.profile=c.profile;ACC.cloud=c.cloud;ACC.state='ready';accountUI();return;}
 }catch(e){}
 if(FB_CFG){
  ACC.mode='firebase';ACC.be=fbBe;
  try{await firebaseInit();ACC.state='ready';}catch(e){ACC.mode='off';ACC.state='off';ACC.fbFail=true;}
  accountUI();return;
 }
 if(SERVER_URL){
  ACC.mode='server';ACC.be=serverBe;
  const r=await serverInit();ACC.profile=r.profile;ACC.cloud=r.cloud;ACC.state='ready';
  if(r.err==='unavailable')ACC.serverDown=true;
  accountUI();return;
 }
 ACC.mode='off';ACC.state='off';accountUI();
}
async function registerAccount(){
 const inp=$('accName');const name=(inp.value||'').trim().slice(0,12);
 if(!name){$('accMsg').textContent='기록자 이름을 적어 주세요.';inp.focus();return;}
 $('accReg').disabled=true;$('accMsg').textContent='등록 중…';
 try{
  const prof=await ACC.be.create(name);ACC.profile=prof;
  const local=localSave();
  if(local){await ACC.be.saveSet(JSON.stringify(local));ACC.cloud={state:JSON.stringify(local)};}
  toast('기록자 '+name+' 등록 완료. 이제 진행이 계정에 저장됩니다.');
 }catch(e){$('accMsg').textContent=e&&e.code==='quota_exceeded'?'저장 공간이 가득 차 등록하지 못했어요.':'등록하지 못했어요. 잠시 후 다시 시도해 주세요.';$('accReg').disabled=false;return;}
 accountUI();
}
function stopKeys(el,onEnter){el.addEventListener('keydown',e=>{e.stopPropagation();if(e.key==='Enter'&&onEnter)onEnter();});el.addEventListener('keyup',e=>e.stopPropagation());}
function accountUI(){
 const box=$('acc');if(!box)return;
 if(ACC.state==='loading'){box.innerHTML='<div class="acc-k">기록자 계정 확인 중…</div>';}
 else if(ACC.state==='off'){box.innerHTML=ACC.fbFail?'<div class="acc-k">Firebase에 연결하지 못했어요</div><div class="acc-s">firebaseConfig 값과 인터넷 연결을 확인해 주세요. 지금은 이 브라우저에만 저장됩니다.</div>':'<div class="acc-k">이 브라우저에만 저장돼요</div><div class="acc-s">연결된 계정 서버가 없어서 진행은 이 기기의 이 브라우저에만 남아요.</div>';}
 else if(ACC.mode==='firebase'&&!ACC.fbUser){
  const su=fbForm==='signup';
  box.innerHTML='<div class="acc-k">'+(su?'기록자 계정 만들기':'기록자 로그인')+'</div><div class="acc-s">로그인하면 진행과 평생 기록이 계정에 보관돼요. 다른 기기에서도 이어서 할 수 있어요.</div>'+
   '<div class="acc-row"><button id="accG" class="google">Google 계정으로 로그인</button></div><div class="acc-s dim">또는 이메일로'+(su?' 가입':' 로그인')+'</div>'+
   '<div class="acc-row col">'+(su?'<input id="accName" maxlength="12" placeholder="기록자 이름 (게임에서 쓸 이름)" autocomplete="nickname">':'')+
   '<input id="accEmail" type="email" maxlength="120" placeholder="이메일" autocomplete="email" inputmode="email">'+
   '<input id="accPw" type="password" maxlength="72" placeholder="비밀번호 (6자 이상)" autocomplete="'+(su?'new-password':'current-password')+'">'+
   (su?'<input id="accPw2" type="password" maxlength="72" placeholder="비밀번호 확인" autocomplete="new-password">':'')+'</div>'+
   '<div class="acc-row"><button id="accMain">'+(su?'계정 만들기':'로그인')+'</button><button id="accSwap" class="ghost">'+(su?'이미 계정이 있어요':'계정 만들기')+'</button></div>'+
   (su?'':'<div class="acc-row"><button id="accReset" class="link">비밀번호를 잊었어요</button></div>')+
   '<div class="acc-s" id="accMsg"></div>';
  $('accG').onclick=()=>fbAuth('google');
  $('accMain').onclick=()=>fbAuth(su?'register':'login');
  $('accSwap').onclick=()=>{const em=$('accEmail').value;fbForm=su?'login':'signup';accountUI();$('accEmail').value=em;};
  if(!su)$('accReset').onclick=fbReset;
  const ids=su?['accName','accEmail','accPw','accPw2']:['accEmail','accPw'];
  ids.forEach((id,k)=>stopKeys($(id),k<ids.length-1?()=>$(ids[k+1]).focus():()=>fbAuth(su?'register':'login')));
 }
 else if(!ACC.profile&&ACC.mode==='server'){
  const fb=false;
  box.innerHTML='<div class="acc-k">기록자 계정</div><div class="acc-s">로그인하면 진행과 평생 기록이 계정에 보관돼요. 다른 기기에서도 이어서 할 수 있어요.'+(ACC.serverDown?'<br>지금은 서버에 연결되지 않아요.':'')+'</div>'+
   (fb?'<div class="acc-row"><button id="accG" class="google">Google 계정으로 로그인</button></div><div class="acc-s dim">또는 기록자 이름과 비밀번호로</div>':'')+
   '<div class="acc-row col"><input id="accName" maxlength="12" placeholder="기록자 이름" autocomplete="username"><input id="accPw" type="password" maxlength="72" placeholder="비밀번호 (6자 이상)" autocomplete="current-password"></div>'+
   '<div class="acc-row"><button id="accLogin">로그인</button><button id="accSign" class="ghost">계정 만들기</button></div><div class="acc-s" id="accMsg"></div>';
  const go=fb?fbAuth:serverAuth;
  $('accLogin').onclick=()=>go('login');$('accSign').onclick=()=>go('register');if(fb)$('accG').onclick=()=>fbAuth('google');
  stopKeys($('accName'),()=>$('accPw').focus());stopKeys($('accPw'),()=>go('login'));
 }
 else if(!ACC.profile){
  const fb=ACC.mode==='firebase';
  box.innerHTML='<div class="acc-k">'+(fb?'기록자 이름 정하기':'기록자 계정 만들기')+'</div><div class="acc-s">'+(fb?'로그인했어요. 게임에서 쓸 기록자 이름을 정해 주세요.':'계정을 만들면 진행과 평생 기록이 claude.ai 계정에 보관돼요. 다른 기기에서도 이어서 할 수 있고, 나만 볼 수 있어요.')+'</div>'+
   '<div class="acc-row"><input id="accName" maxlength="12" placeholder="기록자 이름" autocomplete="off"><button id="accReg">기록자 등록</button></div><div class="acc-s" id="accMsg"></div>'+
   (fb?'<div class="acc-row"><button id="accOut" class="ghost">로그아웃</button></div>':'');
  $('accReg').onclick=registerAccount;stopKeys($('accName'),registerAccount);if(fb)$('accOut').onclick=fbLogout;
 } else {
  const p=ACC.profile,ev=(p.ever||[]).filter(id=>R[id]).length,en=(p.endings||[]).length;
  box.innerHTML='<div class="acc-k">기록자 <b></b></div><div class="acc-s">평생 기록 '+ev+' / '+TOTAL+' · 본 엔딩 '+en+' / 4 · 관측 회차 '+(6+(p.loops||0))+'</div><div class="acc-s dim">진행은 계정에 자동 저장돼요. 새로 기록하기를 누르면 진행만 초기화되고, 평생 기록과 엔딩은 남아요.</div>'+
   (ACC.mode==='server'||ACC.mode==='firebase'?'<div class="acc-row"><button id="accOut" class="ghost">로그아웃</button></div>':'');
  box.querySelector('b').textContent=p.name||'';
  if(ACC.mode==='server')$('accOut').onclick=serverLogout;else if(ACC.mode==='firebase')$('accOut').onclick=fbLogout;
 }
 const bc=$('btnCont');if(bc)bc.classList.toggle('hidden',!loadSave());
}
let cinema=false,cardOpen=false;
function busy(){return !started||!!dlg||arcOpen||kpOpen||endOpen||transitioning||cinema||cardOpen;}

function tile(x,y){
 const m=MAPS[S.area];
 if(x<0||y<0||x>=m.w||y>=m.h)return '#';
 const t=m.g[y][x];
 if(S.area==='city'){if(t==='G'&&S.flags.gateOpen)return 'g';return t;}
 if(S.area==='nl'){if(t==='h')return S.flags.roadOpen?'N':'V';return t;}
 if(S.area==='lab'){if(t==='J')return S.flags.restored?'j':'J';if(t==='Q')return S.flags.codeOK?'q':'Q';return t;}
 if(S.area==='factory'){if(t==='L')return S.flags.power?'l':'L';if(t==='K')return S.flags.power?'k':'K';return t;}
 if(x===18&&y===15)return S.past?'M':(S.flags.cleared?'H':'r');
 if(!S.past&&RUBBLE_S.has(x+','+y))return 'r';
 return t;
}

/* ================= OBJECTS ================= */
const OBJ={
 city:[
  {id:'news',x:16,y:11,t:'stand',rec:'news',solid:1},
  {id:'phone',x:13,y:26,t:'phone',rec:'phone',solid:1,tall:1},
  {id:'photo',x:10,y:15,t:'carrec',rec:'photo'},
  {id:'graffiti',x:26,y:6,t:'graffiti',rec:'graffiti'},
  {id:'radio',x:34,y:6,t:'radio',rec:'radio'},
  {id:'map',x:23,y:17,t:'busstop',rec:'map',solid:1,tall:1},
  {id:'diary',x:4,y:6,t:'mailbox',rec:'diary'},
  {id:'keypad',x:22,y:0,t:'keypad',act:keypadAct},
  {id:'exitdoor',x:6,y:24,t:'exitdoor',act:exitDoorAct}
 ],
 school:[
  {id:'roll',x:4,y:4,t:'book',desk:1,rec:'roll',solid:1,when:'present'},
  {id:'board',x:6,y:2,t:'board',rec:'board',when:'present'},
  {id:'video',x:15,y:5,t:'camera',rec:'video',solid:1,when:'present',act:videoAct},
  {id:'log',x:23,y:5,t:'docs',rec:'log',solid:1,when:'present'},
  {id:'diary2',x:9,y:18,t:'book',rec:'diary2',when:'present'},
  {id:'speaker',x:11,y:11,t:'speaker',act:speakerAct,when:'present'},
  {id:'fuse',x:17,y:18,t:'fuse',act:fuseAct,solid:1,when:'present'},
  {id:'nuri',x:19,y:18,t:'memo',rec:'nuri',solid:1,when:'present'},
  {id:'console',x:30,y:4,t:'console',act:consoleAct,solid:1,when:'present'},
  {id:'hatch',x:18,y:20,t:'hatch',act:hatchAct,when:'present'},
  {id:'rubble',x:18,y:15,t:'none',act:rubbleAct,when:'present',show:()=>!S.flags.cleared},
  {id:'mural',x:18,y:15,t:'none',act:muralAct,when:'past'},
  {id:'g1',x:8,y:13,t:'ghost',when:'past',act:()=>say([{s:'과거의 학생',t:'동아리실 앞 벽화 봤어? 우리 동아리가 그린 거야.'},{s:'과거의 학생',t:'근데 그 벽 뒤에 비밀 방이 있대. 벽화 아래 틈에서 바람이 나와.'}])},
  {id:'g2',x:22,y:13,t:'ghost',when:'past',act:()=>say([{s:'과거의 학생',t:'어? 너 몇 반이야?'},{s:'과거의 학생',t:'명찰에… "기록자"? 이름 특이하다. 우리 반 출석부에선 못 본 것 같은데.'}])},
  {id:'g3',x:27,y:18,t:'ghost',when:'past',act:()=>say([{s:'과거의 학생',t:'5시에 대피 훈련 방송 한대.'},{s:'과거의 학생',t:'근데 훈련인데 왜 공장 사람들이 방송실에 들어가는 거지?'}])},
  {id:'g4',x:4,y:5,t:'ghost',when:'past',act:()=>say([{s:'과거의 학생',t:'아까 출석 부를 때 이상하지 않았어?'},{s:'과거의 학생',t:'우리 반 30명인데, 선생님이 31번까지 불렀잖아.'}])}
 ],
 factory:[
  {id:'cctv',x:6,y:4,t:'monitor',rec:'cctv',solid:1,when:'present',act:cctvAct},
  {id:'govdoc',x:4,y:8,t:'docs',rec:'govdoc',solid:1,when:'present'},
  {id:'worklog',x:13,y:5,t:'docs',rec:'worklog',solid:1,when:'present'},
  {id:'resdiary',x:16,y:8,t:'book',desk:1,rec:'resdiary',solid:1,when:'present'},
  {id:'manual',x:20,y:8,t:'docs',rec:'manual',solid:1,when:'present'},
  {id:'sign',x:19,y:11,t:'sign',act:()=>say(['노란 경고판.','"PROJECT NURI 제3구역. 허가자 외 출입 금지."'])},
  {id:'lvA',x:21,y:2,t:'lever',L:'A',act:leverAct,when:'present'},
  {id:'lvB',x:23,y:2,t:'lever',L:'B',act:leverAct,when:'present'},
  {id:'lvC',x:25,y:2,t:'lever',L:'C',act:leverAct,when:'present'},
  {id:'pvA',x:21,y:2,t:'lever',L:'A',n:3,act:leverPastAct,when:'past'},
  {id:'pvB',x:23,y:2,t:'lever',L:'B',n:1,act:leverPastAct,when:'past'},
  {id:'pvC',x:25,y:2,t:'lever',L:'C',n:2,act:leverPastAct,when:'past'},
  {id:'coat',x:23,y:5,t:'coat',when:'past',act:()=>say(['흰 코트를 입은 사람. 얼굴은 화면의 노이즈에 가려 보이지 않는다.','레버를 하나 당길 때마다 노트에 무언가를 적는다.','…어딘가 익숙한 뒷모습이다.'])},
  {id:'worker',x:18,y:16,t:'ghost',when:'past',act:()=>say([{s:'과거의 작업자',t:'17시 전에 제3구역을 비워! NURI 팀이 반응로를 연다고!'},{s:'과거의 작업자',t:'레버실엔 그 사람 말고 아무도 들어가지 마.'}])},
  {id:'gen',x:6,y:25,t:'gen',act:genAct,solid:1,when:'present'},
  {id:'device',x:31,y:5,t:'device',act:deviceAct,solid:1,when:'present'},
  {id:'nuriel',x:33,y:8,t:'memo',rec:'nuriel',solid:1,when:'present'},
  {id:'stairs',x:29,y:26,t:'none',act:stairsAct,when:'present'},
  {id:'b3sign',x:30,y:22,t:'b3sign',act:()=>say(['벽의 안내판.','"B3 지하 연구시설 — 관계자 외 출입 금지"','계단은 끝이 보이지 않을 만큼 아래로 이어진다.'])}
 ],
 lab:[
  {id:'archive',x:7,y:2,t:'terminal',act:archiveAct,solid:1},
  {id:'server',x:32,y:3,t:'term',rec:'server',solid:1},
  {id:'accesslog',x:5,y:12,t:'term',rec:'accesslog',solid:1},
  {id:'recorder',x:9,y:14,t:'recorder',rec:'recorder',solid:1},
  {id:'portal',x:17,y:13,w:2,t:'portal',act:portalAct,solid:1},
  {id:'notfirst',x:29,y:12,t:'tank',rec:'notfirst',solid:1},
  {id:'codepad',x:33,y:10,w:2,t:'codepad',act:codepadAct,show:()=>!S.flags.codeOK},
  {id:'irondoor',x:21,y:38,w:3,t:'irondoor',act:ironDoorAct,sy:-50}
 ],
 nl:[
  {id:'tower',x:13,y:16,w:2,t:'tower',act:towerAct,solid:1},
  {id:'nlpaper',x:14,y:22,t:'nlstand',rec:'nlpaper',solid:1},
  {id:'card',x:11,y:21,t:'card',act:()=>say(['요즘 유행하는 카드다. 정체 불명의 기운이 느껴진다.'],()=>{if(!S.flags.coloredCard){S.flags.coloredCard=1;save();alog('USER 획득 · 정체 불명의 카드');toast("서윤이의 카드 게임에서 '색이 칠해진 자'를 쓸 수 있게 되었다",COL.nuri);}})},
  {id:'c0400',x:24,y:17,t:'clock',pole:1,h:4,m:0,rim:'#c9c6c0',rec:'c0400',solid:1,tall:1},
  {id:'nphone',x:9,y:22,t:'nphone',act:nphoneAct,solid:1,tall:1},
  {id:'nstop',x:17,y:22,t:'nstop',solid:1,tall:1,act:()=>say(['같은 버스 정류장. 같은 도시 안내도.','…이 안내도에는 붉은 X가 없다. 탈출구라는 것이 처음부터 없었던 것처럼.'])},
  {id:'sd1',x:5,y:16,t:'schooldoor',act:doorAct,to:[33,16.5],pre:['한결중학교 현관. 폐교가 아니라 방금 칠한 것처럼 깨끗하다.'],post:['문을 열었다. …학교 복도가 아니다.','바람이 분다. 여기는 어느 건물의 옥상이다.']},
  {id:'up',x:20,y:16,t:'upstair',act:doorAct,to:[32,7.5],pre:['위층으로 올라가는 계단.'],post:['계단을 올라갔다. 한 층, 두 층, 세 층.','그런데 벽의 표지판에는 "B3"라고 적혀 있다.','위로 올라왔는데, 지하다.']},
  {id:'kiosk',x:22,y:22,t:'kiosk',act:doorAct,to:[38.5,33.3],solid:1,pre:['공중전화 부스만 한 작은 가건물이다.'],post:['문을 열자… 끝이 보이지 않는 거대한 홀이 펼쳐졌다.','밖에서 본 건물보다, 안이 훨씬 크다.']},
  {id:'c1650',x:35,y:2,t:'clock',pole:1,h:16,m:50,rim:'#b9e4cf',rec:'c1650',solid:1,tall:1},
  {id:'down',x:31,y:2,t:'downstair',act:doorAct,to:[37,18.4],solid:1,pre:['아래층으로 내려가는 계단.'],post:['계단을 한참 내려갔다.','문을 열자 하늘이 보인다. 내려왔는데, 옥상이다.']},
  {id:'sd2',x:39,y:3,t:'schooldoor',act:doorAct,to:[32,25],pre:['한결중학교 현관. …광장에서 본 것과 똑같은 건물이 지하에 있다.'],post:['같은 현관을 지났는데, 이번에는 거대한 홀이다.']},
  {id:'c1658',x:40,y:14,t:'clock',pole:1,h:16,m:58,rim:'#bfd0f6',rec:'c1658',solid:1,tall:1},
  {id:'sd3',x:32,y:14,t:'schooldoor',act:doorAct,to:[6,17.6],pre:['또 한결중학교 현관. 옥상 위에 학교 현관이 있다.'],post:['문을 열자, 처음의 광장이다.']},
  {id:'c1500',x:44,y:23,t:'clock',h:15,m:0,rim:'#f6dfa8',rec:'c1500',solid:1},
  {id:'seoyun',x:38,y:27,t:'person',c:'#34406e',act:seoyunAct,solid:1},
  {id:'p1',x:33,y:27,t:'person',c:'#e89aa8',solid:1,act:()=>say([{s:'누리느엘의 사람',t:'오늘도 10월 14일이야. 좋은 날이지.'}])},
  {id:'p2',x:35,y:31,t:'person',c:'#8fcfb3',solid:1,act:()=>say(['작업복 차림의 남자. 움직이지 않는다. 입가에 웃음이 걸려 있다.'])},
  {id:'p3',x:42,y:26,t:'person',c:'#f2c46f',solid:1,act:()=>say([{s:'누리느엘의 사람',t:'밖? 밖에 뭐가 있는데? 여기엔 전부 있잖아.'}])},
  {id:'p4',x:44,y:31,t:'person',c:'#a9b8f0',solid:1,act:()=>say([{s:'누리느엘의 사람',t:'당신, 기록자죠? 이번엔 오래 있다 가요.'}])},
  {id:'p5',x:46,y:27,t:'person',c:'#d2b5ee',solid:1,act:()=>say(['아이를 안은 여자. 눈동자에 하얀 빛이 맴돈다.','…아파트 일기를 쓴 사람일까.'])},
  {id:'p6',x:36,y:24,t:'person',c:'#f0a882',solid:1,act:()=>say([{s:'누리느엘의 사람',t:'곧 5시 방송이 나올 거야. 늘 그렇듯이.'}])},
  {id:'hallexit',x:38,y:34,t:'hallexit',act:doorAct,to:[22.5,21.4],pre:['들어왔던 작은 문.'],post:['문을 열자 광장이다. 등 뒤의 가건물은 여전히 전화 부스만 하다.']},
  {id:'core',x:13,y:3,w:2,t:'core',act:coreAct,solid:1},
  {id:'nlcore',x:7,y:4,t:'pedestal',rec:'nlcore',solid:1},
  {id:'retgate',x:20,y:4,t:'retgate',act:retAct,solid:1},
  {id:'chair31',x:17,y:4,t:'chair31',solid:1,act:()=>say(['서른 개의 의자에서 조금 떨어진 곳에, 하얀 의자 하나.','등받이에 이름이 새겨져 있다. "기록자"','31번째 자리. 비어 있다.'])}
 ]
};
function objs(){
 return OBJ[S.area].filter(o=>{
  if(o.when==='present'&&S.past)return false;
  if(o.when==='past'&&!S.past)return false;
  if(o.show&&!o.show())return false;
  return true;
 });
}
function solidAt(tx,ty){
 if(SOLID.has(tile(tx,ty)))return true;
 const l=objs();for(let i=0;i<l.length;i++){const o=l[i];if(o.solid&&o.y===ty&&tx>=o.x&&tx<o.x+(o.w||1))return true;}
 return false;
}
function hit(x,y){
 const pts=[[x-7,y-7],[x+7,y-7],[x-7,y+1],[x+7,y+1]];
 return pts.some(p=>solidAt(Math.floor(p[0]/TS),Math.floor(p[1]/TS)));
}
function unstuck(){
 if(!hit(P.x,P.y))return;
 const tx=Math.floor(P.x/TS),ty=Math.floor(P.y/TS);
 for(let r=1;r<7;r++)for(let dy=-r;dy<=r;dy++)for(let dx=-r;dx<=r;dx++){
  const nx=(tx+dx+.5)*TS,ny=(ty+dy+.6)*TS;
  if(!hit(nx,ny)){P.x=nx;P.y=ny;return;}
 }
 const sp={city:[5.5,27.6],school:[27,24.2],factory:[19,26.6],lab:[18,3.4],nl:[6,21.5]}[S.area];
 if(sp){P.x=sp[0]*TS;P.y=sp[1]*TS;}
}
function wallFace(o){const n=!FP_WALL.has(tile(o.x,o.y-1)),so=!FP_WALL.has(tile(o.x,o.y+1));if(n&&so)return (P.y/TS<o.y+.5)?-1:1;return so?1:(n?-1:1);}
function objFront(o){const wm=FP_WALL.has(tile(o.x,o.y))&&o.t!=='none';const f=wm?wallFace(o):0;return [(o.x+(o.w||1)/2)*TS,(o.y+(wm?(f>0?1.05:-.05):.5))*TS];}
function findNear(){
 if(FPV){let best=null,bs=1e9;const cy=P.y-6;
  objs().forEach(o=>{const c=objFront(o);const dx=c[0]-P.x,dy=c[1]-cy,d=Math.hypot(dx,dy);if(d>TS*1.8)return;
   const a=Math.abs(angDiff(Math.atan2(dy,dx),P.lookA));if(a>.8&&d>TS*.7)return;const sc=d+a*TS*.8;if(sc<bs){bs=sc;best=o;}});
  return best;}
 let best=null,bd=1e9;const cx=P.x,cy=P.y-8;
 objs().forEach(o=>{const ox=(o.x+(o.w||1)/2)*TS,oy=(o.y+.5)*TS;const d=Math.hypot(ox-cx,oy-cy);if(d<TS*1.35&&d<bd){bd=d;best=o;}});
 return best;
}

/* ================= DIALOG ================= */
let dlg=null,typeTimer=null;
const dEl=$('dialog'),dSpk=$('dSpk'),dTxt=$('dTxt'),dCh=$('dCh'),dNext=$('dNext');
function say(pages,onDone){
 pages=pages.map(p=>typeof p==='string'?{t:p}:p);
 dlg={pages,i:0,onDone,typing:false};showPage();document.body.classList.add('busy');
}
function showPage(){
 const p=dlg.pages[dlg.i];
 dEl.classList.remove('hidden');
 dSpk.textContent=p.s||'';dSpk.style.display=p.s?'block':'none';
 dCh.innerHTML='';dNext.style.visibility='hidden';
 const txt=p.t;let n=0;dlg.typing=true;dTxt.textContent='';
 clearInterval(typeTimer);
 typeTimer=setInterval(()=>{n+=2;dTxt.textContent=txt.slice(0,n);if(n>=txt.length)finishType();},28);
}
function finishType(){
 clearInterval(typeTimer);if(!dlg)return;
 const p=dlg.pages[dlg.i];dTxt.textContent=p.t;dlg.typing=false;
 if(p.c){p.c.forEach((c,i)=>{const b=document.createElement('button');b.textContent=(i+1)+'. '+c.l;b.onclick=e=>{e.stopPropagation();pick(i);};dCh.appendChild(b);});}
 else dNext.style.visibility='visible';
}
function pick(i){
 if(!dlg||dlg.typing)return;const p=dlg.pages[dlg.i];if(!p.c||!p.c[i])return;
 const f=p.c[i].f;closeDlg();if(f)f();
}
function closeDlg(){clearInterval(typeTimer);dlg=null;dEl.classList.add('hidden');refreshBusy();}
function advance(){
 if(!dlg)return;if(dlg.typing){finishType();return;}
 const p=dlg.pages[dlg.i];if(p.c)return;
 dlg.i++;
 if(dlg.i>=dlg.pages.length){const d=dlg.onDone;closeDlg();if(d)d();}else showPage();
}
dEl.addEventListener('click',advance);
function refreshBusy(){document.body.classList.toggle('busy',busy());document.body.classList.toggle('playing',started);}

let toastTimer=null;
function toast(msg,col){const t=$('toast');t.textContent=msg;t.style.borderLeftColor=col||'#e7e3da';t.classList.add('on');clearTimeout(toastTimer);toastTimer=setTimeout(()=>t.classList.remove('on'),2800);}

/* ================= INTERACTIONS ================= */
function readRecord(o,after){
 const r=R[o.rec];const first=!has(o.rec);
 const pages=r.pages||r.text.split('\n\n').map(t=>({s:r.type,t}));
 say(pages,()=>{if(first)collect(o.rec);if(after)after();});
}
function collect(id){
 if(has(id))return;S.records.push(id);addEver(id);
 const r=R[id];toast('기록 획득 · '+r.title,COL[r.color]);alog('USER 기록 획득 · '+r.title);
 save();
 if(S.records.length===1)setTimeout(()=>toast(isTouch?'오른쪽 위 "기록 보관함"에서 모은 기록을 다시 볼 수 있다':'Tab 키 또는 "기록 보관함"에서 모은 기록을 다시 볼 수 있다'),3000);
 else if(S.records.length===3&&S.contra.length===0)setTimeout(()=>toast('기록 보관함에서 두 기록을 비교하면 모순을 찾을 수 있다'),3000);
}
const OBJ_NAME={keypad:'정문 키패드',exitdoor:'철문',hatch:'철제 해치',lever:'레버',gen:'발전기',device:'하얀 장치',console:'방송 콘솔',ghost:'과거의 사람',coat:'흰 코트의 사람',terminal:'ARCHIVE 컴퓨터',codepad:'코드 패널',irondoor:'비상 탈출구',portal:'고리 장치',speaker:'스피커',fuse:'선반',none:'잔해',sign:'경고판',tower:'시계탑',clock:'시계',nphone:'공중전화',nstop:'정류장',schooldoor:'한결중학교 현관',kiosk:'가건물',upstair:'위층 계단',downstair:'아래층 계단',person:'사람',core:'빛의 핵',retgate:'하얀 고리',chair31:'빈 의자',hallexit:'작은 문',pedestal:'받침대',card:'정체 불명의 카드',b3sign:'안내판',nlstand:'신문 가판대'};
function interact(o){alog('USER 조사 · '+(o.rec?R[o.rec].title:(o.t==='lever'?o.L+' 레버':(OBJ_NAME[o.t]||'대상'))));if(o.act)o.act(o);else if(o.rec)readRecord(o);}
const feedLines=[];let stepAcc=0,idleT=0,idleLogged=false,lastRoom='';
function alog(msg){
 if(!S.flags.archiveOn)return;
 feedLines.push('['+fmt(S.time)+'] '+msg);if(feedLines.length>6)feedLines.shift();
 const f=$('feed');f.classList.remove('hidden');
 f.innerHTML='<div class="fh">ARCHIVE · RECORDING</div>'+feedLines.map(l=>'<div>'+l.replace(/</g,'&lt;')+'</div>').join('');
}
function roomLabel(){
 if(S.area==='nl'){const tx=Math.floor(P.x/TS),ty=Math.floor(P.y/TS);for(const r of NL_ZONES)if(tx>=r[1]&&tx<r[1]+r[3]&&ty>=r[2]&&ty<r[2]+r[4])return r[0];return '누리느엘';}
 if(S.area!=='lab')return AREA_NAME[S.area].split('· ')[1]+(S.past?' (과거)':'');
 const tx=Math.floor(P.x/TS),ty=Math.floor(P.y/TS);
 for(const r of LAB_ROOMS)if(tx>=r[1]&&tx<r[1]+r[3]&&ty>=r[2]&&ty<r[2]+r[4])return r[0];
 return 'B3';
}

function keypadAct(o){
 if(S.flags.gateOpen){say(['정문은 이미 열려 있다. 북쪽으로 가면 폐교다.']);return;}
 const ask=()=>say([{t:'정문 옆 키패드. 네 자리 비밀번호를 입력해야 한다.',c:[{l:'비밀번호를 입력한다',f:openKeypad},{l:'그만둔다'}]}]);
 if(!has('memo')){say(['녹슨 정문 옆, 경비실 유리창에 메모 한 장이 붙어 있다.'],()=>readRecord({rec:'memo'},ask));}
 else ask();
}
function videoAct(o){
 const choose=()=>say([{t:'테이프를 재생하면, 영상 속 그날의 복도가 눈앞에 겹쳐 보일 것 같다.',c:[{l:'테이프를 캠코더에 넣는다',f:enterPast},{l:'지금은 그만둔다'}]}]);
 if(!has('video'))readRecord(o,choose);else choose();
}
function speakerAct(){
 if(S.flags.broadcastDone)say(['스피커는 침묵하고 있다. 그런데 누군가 이쪽을 듣고 있는 느낌이 든다.']);
 else if(S.flags.powered)say(['스피커에서 낮은 잡음이 흘러나온다. 방송실 콘솔이 켜져 있다.']);
 else say(['작동하지 않는 방송 스피커.','방송실 쪽 전원이 끊겨 있는 것 같다.']);
}
function fuseAct(){
 if(S.flags.hasFuse){say(['비어 있는 선반. 먼지 위에 퓨즈 상자 자국만 남았다.']);return;}
 say(['먼지 쌓인 선반 위, 노란 경고 라벨이 붙은 상자.','"방송실 예비 퓨즈 — 석말공장 측정 장비용"','퓨즈를 챙겼다.'],()=>{S.flags.hasFuse=true;save();toast('물건 획득 · 방송실 예비 퓨즈',COL.yellow);});
}
function muralAct(){
 say(['동아리실 앞 복도의 벽화. 붉은 원과 하얀 소용돌이, 그리고 손을 맞잡은 아이들.','벽화 아래쪽 틈에서 차가운 바람이 새어 나온다.','이 벽 뒤에 방이 있다. 현재의 이 자리를 조사해 보자.'],()=>{if(!S.flags.knowMural){S.flags.knowMural=true;save();toast('단서 · 벽화 뒤의 방',COL.blue);}});
}
function rubbleAct(){
 if(!S.flags.knowMural){say(['무너진 잔해가 복도 벽을 막고 있다. 그저 잔해로 보인다.','…이 벽이 원래 어떤 모습이었는지 알 수 있다면.']);return;}
 say(['과거의 벽화가 있던 자리다. 잔해 틈으로 차가운 바람이 새어 나온다.',{t:'잔해를 치울까?',c:[{l:'잔해를 치운다',f:()=>{S.flags.cleared=true;save();shakeT=.5;say(['콘크리트 조각을 하나씩 걷어내자, 벽화의 흔적과 함께 좁은 문이 드러났다.']);}},{l:'그만둔다'}]}]);
}
function consoleAct(){
 if(S.flags.broadcastDone){say([{s:'ARCHIVE SYSTEM',t:'USER: 기록자\nSTATUS: RECORDING'},'…화면은 여전히 나를 기록하고 있다.']);return;}
 if(!S.flags.powered){
  if(!S.flags.hasFuse){say(['방송실 콘솔. 전원이 들어오지 않는다.','뒤판의 퓨즈 슬롯이 비어 있다. 누군가 빼 간 것 같다.']);return;}
  say(['뒤판 퓨즈 슬롯에 예비 퓨즈를 끼웠다.','딸깍. 꺼져 있던 모니터에 노란빛이 번진다.'],()=>{S.flags.powered=true;save();login();});
  return;
 }
 login();
}
function login(){
 const deny=n=>()=>say([{s:'SYSTEM',t:'USER: '+n+'\nACCESS DENIED\n해당 사용자의 기록은 이미 종료되었습니다.'},'…"종료"라니. 무슨 뜻이지?']);
 const opts=['강민재','한서윤','황지우'].map(n=>({l:n,f:deny(n)}));
 if(S.flags.nameKnown)opts.push({l:'기록자',f:granted});
 else opts.push({l:'잘 모르겠다',f:()=>say(['출석부의 이름으로는 안 될 것 같다.','이 학교에 있었지만, 출석부에는 없는 누군가. 기록들을 서로 비교해 보자.'])});
 say([{s:'SYSTEM',t:'NURI BROADCAST CONSOLE\n마지막 송출 기록을 재생하려면 사용자 이름을 입력하십시오.',c:opts}]);
}
function granted(){
 say([
  {s:'SYSTEM',t:'USER: 기록자\nACCESS GRANTED'},
  {s:'SYSTEM',t:'…다시 오신 것을 환영합니다.'},
  '다시? 나는 이곳에 처음 왔는데.',
  {s:'대피 방송 · 2011.10.14 17:02',t:'전교생은 즉시 지하 대피소로 이동하십시오. 대피소 입구는 공장 방향 지하 통로에 있습니다.'},
  {s:'대피 방송 · 2011.10.14 17:02',t:'문을 열지 마십시오. 반복합니다. 어떤 문도 열지 마십시오.'},
  '방송이 끝나자, 복도의 모든 스피커가 동시에 켜지는 소리가 들렸다.'
 ],()=>{collect('broadcast');S.flags.broadcastDone=true;save();setTimeout(runArchiveScene,1400);});
}

function cctvAct(o){
 const choose=()=>say([{t:'모니터 속 흑백 화면이 흔들린다. 그날 16시 58분의 공장이 눈앞에 겹쳐 보일 것 같다.',c:[{l:'테이프를 모니터 데크에 넣는다',f:enterPast},{l:'지금은 그만둔다'}]}]);
 if(!has('cctv'))readRecord(o,choose);else choose();
}
function hatchAct(){
 if(!S.flags.broadcastDone){say(['바닥의 철제 해치. 안쪽에서 단단히 잠겨 있다.','해치 옆에 작은 스피커 구멍이 뚫려 있다. 방송과 연결된 장치일까?']);return;}
 say([{t:'잠금이 풀린 철제 해치. 좁은 사다리가 아래로 이어진다. 방송이 말한 공장 방향의 지하 통로다.',c:[{l:'내려간다',f:()=>goArea('factory',19*TS,26.6*TS)},{l:'그만둔다'}]}]);
}
let leverSeq=[],alarmT=0;const LEVER_ORDER=['B','C','A'];
function leverAct(o){
 if(S.flags.power){say(['레버는 모두 내려가 있다. 제3발전기가 낮게 울리고 있다.']);return;}
 const st=leverSeq.indexOf(o.L)>=0?'이미 내려가 있다.':'녹슨 손잡이가 위로 올라가 있다.';
 if(leverSeq.indexOf(o.L)>=0){say([o.L+' 레버. '+st]);return;}
 say([{t:o.L+' 레버. '+st,c:[{l:'레버를 당긴다',f:()=>pull(o.L)},{l:'그만둔다'}]}]);
}
function pull(L){
 leverSeq.push(L);shakeT=.15;const i=leverSeq.length-1;
 if(leverSeq[i]!==LEVER_ORDER[i]){
  const manual=leverSeq[0]==='A';leverSeq=[];shakeT=.6;alarmT=2.2;S.flags.leverFails=(S.flags.leverFails||0)+1;save();
  const lines=['덜컹. 천장의 경고등이 붉게 번쩍인다.',{s:'경고 방송',t:'과부하 감지. 전원 계통을 초기화합니다.'},'내려갔던 레버가 모두 위로 튕겨 올라갔다.'];
  if(manual)lines.push('정비 매뉴얼의 순서대로 당겼는데… 매뉴얼이 틀린 걸까?');
  if(S.flags.leverFails>=2)lines.push(has('cctv')?'CCTV 영상 속 과거에서, 그날 누군가 레버를 당긴 순서를 확인해 보자.':'이 공장 어딘가에 그날 레버실을 찍은 기록이 남아 있을지도 모른다.');
  say(lines);return;
 }
 if(leverSeq.length<3){say(['쿵. '+L+' 레버가 내려갔다. 어딘가에서 기계가 한 단계 깨어나는 소리가 난다.']);return;}
 S.flags.power=true;leverSeq=[];save();shakeT=.8;flash(COL.yellow);
 say(['마지막 레버가 내려가자, 공장 전체가 깊게 숨을 들이쉬었다.','천장의 경고등이 하나씩 노랗게 켜진다. 제3발전기가 돌아간다.','멀리서 잠겨 있던 문들이 열리는 소리가 들린다.']);
}
function leverPastAct(o){
 say([{s:'CCTV 속 과거',t:'흰 코트의 사람이 '+o.L+' 레버를 '+['첫','두','세'][o.n-1]+' 번째로 당긴다.'}]);
}
function genAct(){
 if(!S.flags.power){say(['멈춰 있는 제3발전기. 거대한 날개가 먼지를 뒤집어쓰고 있다.','레버실에서 전원 계통을 올려야 움직일 것 같다.']);return;}
 if(!has('power')){say(['돌아가는 발전기 옆, 제어 패널에 배분표가 떠 있다.'],()=>readRecord({rec:'power'}));return;}
 readRecord({rec:'power'});
}
function deviceAct(){
 say(['실험실 한가운데 떠 있는 장치. 하얀 빛이 맥박처럼 뛴다.','손을 가까이 대자, 머릿속에 낯선 풍경이 스친다.','먼지 하나 없는 거리. 서로 다른 시간을 가리키는 시계들. 계속 걸어도 같은 자리로 돌아오는 길.','…이건 폐허가 아니다. 이건, 어딘가 다른 곳이다.'],()=>{if(!S.flags.touched){S.flags.touched=true;save();toast('단서 · 하얀 빛의 풍경',COL.nuri);}});
}
function stairsAct(){
 say([{t:'더 깊은 곳으로 이어지는 계단. 벽의 안내판에는 "B3 지하 연구시설".',c:[{l:'내려간다',f:()=>goArea('lab',18*TS,3.4*TS)},{l:'공장을 더 조사한다'}]}]);
}
const QUIZ=[
 {q:'질문 1. 2011년 10월 14일, 한결중학교는 휴교였는가?',o:['휴교였다','휴교가 아니었다'],a:1},
 {q:'질문 2. 그날 도시에 무언가가 일어난 시각은?',o:['04:00','16:50','17:02'],a:2},
 {q:'질문 3. PROJECT NURI의 관측 대상은 몇 명이었는가?',o:['30명','31명','1명'],a:1},
 {q:'질문 4. 출석부에 없는 관측 대상의 이름은?',o:['한서윤','황지우','기록자'],a:2}
];
function archiveAct(){
 if(!S.flags.archiveOn){
  say(['방 한가운데, 유일하게 불이 켜진 컴퓨터가 있다.',{s:'ARCHIVE SYSTEM',t:'ARCHIVE SYSTEM\n\nUSER: UNKNOWN\nSTATUS: RECORDING'},'화면 아래로 글자가 흘러간다. 내가 한 걸음 움직이자, 한 줄이 늘어났다.',{s:'ARCHIVE SYSTEM',t:'USER 이동.\nUSER 화면 응시.\nUSER 호흡 불규칙.'},'…이 시스템은 나를 기록하고 있다.','내가 기록을 모으는 동안, 누군가는 줄곧 나를 기록하고 있었다.'],
   ()=>{S.flags.archiveOn=true;save();alog('USER 인식 · 이름 미등록');alog('STATUS: RECORDING');collect('archive');});
  return;
 }
 if(!S.flags.restored){
  say([{s:'ARCHIVE SYSTEM',t:'삭제된 연구 자료 3건.\n복구하려면 기록 검증 프로토콜을 통과하십시오.\n\nUSER가 수집한 기록 중 진실인 것만 답이 됩니다.',c:[{l:'검증을 시작한다',f:quiz},{l:'그만둔다'}]}]);
  return;
 }
 say([{s:'ARCHIVE SYSTEM',t:'USER: 기록자\nSTATUS: RECORDING\n\n복구 완료 자료 3건. 기록을 계속하십시오.'}]);
}
function quiz(i){
 i=i||0;
 if(i>=QUIZ.length){
  say([{s:'ARCHIVE SYSTEM',t:'검증 완료.\n삭제된 연구 자료를 복구합니다.'},{s:'ARCHIVE SYSTEM',t:'복구 1/3 · PROJECT NURI 최종 보고\n복구 2/3 · 비상 탈출구 최종 잠금 해제 코드\n복구 3/3 · 폐쇄된 실험실 출입 권한'},'어딘가에서 잠금이 풀리는 소리가 났다. 폐쇄된 실험실 쪽이다.'],
   ()=>{S.flags.restored=true;save();collect('deleted');collect('code');updateHUD(true);});
  return;
 }
 const q=QUIZ[i];
 say([{s:'기록 검증 프로토콜',t:q.q,c:q.o.map((l,j)=>({l,f:()=>{alog('USER 응답 · '+l);if(j===q.a)quiz(i+1);else say([{s:'ARCHIVE SYSTEM',t:'검증 실패.\nUSER가 신뢰할 수 없는 기록을 선택했습니다.'},'어떤 기록이 진실이었는지, 보관함에서 다시 비교해 보자.']);}}))}]);
}
function codepadAct(){
 if(!has('code')){say(['비상 통로를 막은 두꺼운 문. 네 자리 코드 패널이 붙어 있다.','"최종 잠금 해제 코드를 입력하십시오."','ARCHIVE 시스템의 지워진 자료 중에 코드가 있을지도 모른다.']);return;}
 say([{t:'비상 통로의 코드 패널. 최종 잠금 해제 코드가 필요하다.',c:[{l:'코드를 입력한다',f:()=>openKeypad(LAB_KP)},{l:'그만둔다'}]}]);
}
function truthReady(){return ESC.every(e=>has(e.id))&&['deleted','notfirst','nuriel'].every(has)&&S.contra.length>=10;}
function trueReady(){return S.records.length>=TOTAL&&S.contra.length>=15;}
function ironDoorAct(){
 const k=S.flags.preserved&&has('nlcore');
 if(S.flags.preserved&&!k){say(['철문은 굳게 닫혔다. 틈새마다 붉은 봉인등이 켜져 있다.','위층 장치실 쪽에서 하얀 빛이 새어 나온다.']);return;}
 const first=!S.flags.sawIron;if(first){S.flags.sawIron=true;save();}
 alog('USER 탈출구 도달');
 const openC={l:'문을 연다',f:()=>say([{t:'문을 열면 기록 '+S.records.length+'개가 모두 지워진다. 정말 열까?',c:[{l:'연다',f:()=>{alog('USER 선택 · 문을 연다');if(truthReady())endTruth();else endForget();}},{l:'그만둔다'}]}])};
 const allC={l:'모든 기록을 가져간다',f:()=>{
  if(!has('nlcore')){say(['손잡이에 손을 얹자 경고등이 깜박인다.',{s:'ARCHIVE SYSTEM',t:'조건 미충족.\n누리느엘의 기록이 없습니다.'},'…모든 기록을 가져가려면, 아직 가 보지 않은 곳의 기록이 필요하다.']);return;}
  if(trueReady()){alog('USER 선택 · 모든 기록을 가져간다');say([{s:'ARCHIVE SYSTEM',t:'USER: 기록자\n기록 '+TOTAL+' / '+TOTAL+'\n조건 충족.'},'철문이 처음으로, 경고음 없이 열리기 시작했다.'],endTrue);}
  else say(['손잡이에 손을 얹자 경고등이 깜박인다.',{s:'ARCHIVE SYSTEM',t:'조건 미충족.\n기록 '+S.records.length+' / '+TOTAL+'\n발견한 모순 '+S.contra.length+' / 15 이상\n\n모든 기록을 완성한 기록자만 선택할 수 있습니다.'}]);
 }};
 const lines=[];
 if(k)lines.push('봉인등이 하나씩 꺼진다. 누리느엘의 기록에 반응한 걸까.','철문이 다시 선택을 기다리고 있다.');
 else lines.push(first?'가장 깊은 지하. 거대한 철문이 앞을 막고 있다. 문틈으로 바깥 공기가 스며든다.':'거대한 철문 앞이다.');
 lines.push({s:'철문',t:'EMERGENCY EXIT\n\nWARNING\nOPENING THIS DOOR WILL ERASE\nALL ARCHIVED RECORDS.'});
 lines.push({t:'이곳이 진짜 탈출구다. 선택해야 한다.',c:k?[openC,allC,{l:'돌아선다'}]:[openC,{l:'기록을 보존한다',f:preserve},allC]});
 say(lines);
}
function preserve(){
 say([{t:'기록을 보존하면 이 문은 닫히고, 다시 열리지 않을지도 모른다. 그래도 보존할까?',c:[{l:'보존한다',f:()=>{S.flags.preserved=true;save();shakeT=1;flash('#ffffff');alog('USER 선택 · 기록 보존');
   say(['철문이 굉음을 내며 닫힌다. 틈새마다 붉은 봉인등이 켜진다.','그 순간, 위층 어딘가에서 하얀 빛이 터져 나왔다.','장치실이다.']);}},{l:'그만둔다'}]}]);
}
function portalAct(){
 if(!S.flags.preserved){say(['고리 모양의 거대한 장치. 표면에 하얀 먼지 같은 빛이 희미하게 맴돈다.','전원이 부족한 것 같다. 가장 깊은 곳, 탈출구 쪽 전원과 연결되어 있는 걸까?']);return;}
 if(S.flags.nlVisited){say([{t:'하얀 빛의 틈이 열려 있다. 너머로 누리느엘의 광장이 비친다.',c:[{l:'누리느엘로 간다',f:runNuriel},{l:'그만둔다'}]}]);return;}
 say(['장치가 깨어났다. 고리 한가운데에 하얀 빛의 틈이 열려 있다.','틈 너머에서, 흑백의 도시에서는 본 적 없는 색이 조용히 번져 나온다.',{t:'먼지 같은 빛이 틈 안으로 빨려 들어간다.',c:[{l:'빛 속으로 들어간다',f:runNuriel},{l:'아직은 이곳에 남는다'}]}]);
}
function warp(x,y,after){
 transitioning=true;refreshBusy();$('fade').classList.add('on');
 setTimeout(()=>{P.x=x;P.y=y;unstuck();save();$('fade').classList.remove('on');
  setTimeout(()=>{transitioning=false;refreshBusy();if(after)after();},420);},450);
}
function doorAct(o){
 const go=()=>warp(o.to[0]*TS,o.to[1]*TS,()=>{const k='d_'+o.id;if(!S.flags[k]){S.flags[k]=1;save();if(o.post)say(o.post);}alog('USER 이동 · '+roomLabel());});
 if(o.pre)say(o.pre.concat([{t:'들어갈까?',c:[{l:'들어간다',f:go},{l:'그만둔다'}]}]));else go();
}
const TRUE_ORDER=['c1500','c1650','c1658','c1702'];
function towerAct(){
 if(S.flags.roadOpen){say(['시계탑의 바늘은 17시 02분에 멈춰 있다.','북쪽으로, 없던 길이 나 있다.']);return;}
 const got=CLOCKS.filter(has).length;
 const pre=['광장 한가운데의 시계탑. 바늘 다섯 개가 제멋대로 돌고 있다.','받침대에 새겨진 글. "그날을 순서대로 되돌려라. 거짓의 시간은 빼고."'];
 if(TRUE_ORDER.some(id=>!has(id))){say(pre.concat(['누리느엘 곳곳의 시계를 아직 다 보지 못했다. ('+got+' / 5)']));return;}
 say(pre.concat([{t:'시계탑의 바늘을 맞출까?',c:[{l:'바늘을 맞춘다',f:()=>towerStep(0,[])},{l:'그만둔다'}]}]));
}
function towerStep(i,chosen){
 if(i>=TRUE_ORDER.length){
  S.flags.roadOpen=true;save();shakeT=.8;flash('#ffffff');alog('USER 추론 · 그날의 순서');
  say(['마지막 바늘이 17시 02분에 맞춰지자, 누리느엘의 모든 시계가 동시에 같은 시간을 가리켰다.','광장 북쪽, 방금 전까지 아무것도 없던 곳에 길이 생겨났다.']);updateHUD(true);return;
 }
 const opts=CLOCKS.filter(id=>has(id)&&chosen.indexOf(id)<0).map(id=>({l:R[id].date+' · '+R[id].title,f:()=>{
  if(id===TRUE_ORDER[i])towerStep(i+1,chosen.concat([id]));
  else if(id==='c0400')say(['바늘이 04시에 걸리자 시계탑이 삐걱이며 멈췄다.','그 시각에는 아무 일도 없었다. 그건 신문이 만든 시간이다.','바늘이 처음으로 돌아간다.']);
  else say(['순서가 틀렸다. 시계탑의 바늘이 처음으로 돌아간다.','그날 일어난 일을 시간 순서대로 떠올려 보자.']);
 }}));
 say([{s:'시계탑',t:(i+1)+'번째 바늘. 그날의 '+['첫','두','세','네'][i]+' 번째 시간은?'+(chosen.length?'\n\n지금까지: '+chosen.map(id=>R[id].date).join(' → '):''),c:opts}]);
}
function nphoneAct(){
 if(has('phone2')){say(['수화기는 조용하다. 해야 할 말은 이미 했다.']);return;}
 readRecord({rec:'phone2'});
}
function seoyunAct(){
 S.flags.seoyunTalk=(S.flags.seoyunTalk||0)+1;save();
 if(S.flags.seoyunTalk>=2&&has('seoyun')&&has('c1702')){
  say([{s:'한서윤',t:'나랑 같이 내가 만든 카드 게임 할래?....',c:[{l:'응',f:launchCardGame},{l:'아니',f:()=>say([{s:'한서윤',t:'…그래. 축제는 내일도 하니까.'}])}]}]);return;}
 readRecord({rec:'seoyun'},()=>{if(!has('c1702'))say(['서윤의 손목에서 멈춘 시계가 눈에 들어온다.'],()=>readRecord({rec:'c1702'}));});
}
let cgResult=null;
function launchCardGame(){
 if(cardOpen)return;
 const ru={name:(ACC.profile&&ACC.profile.name)||'기록자',colored:!!S.flags.coloredCard};
 const el=$('cg-data');let html=null;
 if(el){try{html=JSON.parse(el.textContent);}catch(e){}
  if(!html){say(['…카드 게임을 불러오지 못했다.']);return;}
  html=html.replace('<head>','<head><script>window.__RUINS_USER='+JSON.stringify(ru).replace(/</g,'\\u003c')+';<\/script>');}
 cardOpen=true;cgResult=null;refreshBusy();alog('USER 미니게임 · 서윤의 카드 게임');
 const w=$('cgWrap');w.classList.remove('hidden','show');void w.offsetWidth;w.classList.add('cap');
 setTimeout(()=>{const f=document.createElement('iframe');f.id='cgFrame';f.title='서윤의 카드 게임';f.setAttribute('allow','autoplay');
  if(html)f.srcdoc=html;else f.src='cardgame.html?name='+encodeURIComponent(ru.name)+'&colored='+(ru.colored?1:0);
  $('cgFrameBox').appendChild(f);},900);
 setTimeout(()=>{w.classList.remove('cap');w.classList.add('show');},2200);
}
function closeCardGame(){
 if(!cardOpen)return;if(cgAuto){clearTimeout(cgAuto);cgAuto=null;}const w=$('cgWrap');w.classList.remove('show','cap');
 setTimeout(()=>{$('cgFrameBox').innerHTML='';w.classList.add('hidden');cardOpen=false;refreshBusy();
  const r=cgResult;alog('USER 미니게임 종료'+(r?' · '+r:''));
  if(r==='win')say([{s:'한서윤',t:'…내가 졌네. 너 이거 처음 하는 거 맞아?'},{s:'한서윤',t:'이상하다. 예전에도 누가 이렇게 날 이긴 것 같은데.'}]);
  else if(r==='lose')say([{s:'한서윤',t:'헤헤, 내가 이겼다.'},{s:'한서윤',t:'내일 또 하자. 내일도 축제니까.'}]);
  else say([{s:'한서윤',t:'벌써 가? …또 하자. 우리한텐 시간이 많잖아.'}]);
 },500);
}
let cgAuto=null;
window.addEventListener('message',e=>{const d=e.data;if(!d||typeof d!=='object')return;
 if(d.type==='cg-result'&&cardOpen&&!cgAuto){cgResult=d.r;cgAuto=setTimeout(()=>{cgAuto=null;closeCardGame();},1600);}
 if(d.type==='cg-exit')closeCardGame();});
$('cgExit').onclick=closeCardGame;
function coreAct(){
 say(['누리느엘의 중심. 하얀 빛의 핵이 천천히 숨 쉬고 있다.','빛 속에서 수많은 얼굴이 떠올랐다 사라진다. 축제의 아이들, 공장의 작업자들, 도시의 사람들.',{t:'이 빛에 닿으면 돌아올 수 없을 것 같다.',c:[{l:'빛에 닿는다',f:endC},{l:'물러선다'}]}]);
}
function retAct(){
 say([{t:'작은 하얀 고리. 너머로 연구시설의 장치실이 보인다.',c:[{l:'연구시설로 돌아간다',f:()=>goArea('lab',18*TS,15.3*TS)},{l:'그만둔다'}]}]);
}
function exitDoorAct(){
 const n=S.records.length;
 say([
  '건물 벽에 박힌 거대한 철문. 이 도시에서 처음 눈을 뜬 곳 바로 옆이다.',
  {s:'철문',t:'EMERGENCY EXIT\n\nWARNING\nOPENING THIS DOOR WILL ERASE\nALL ARCHIVED RECORDS.'},
  {t:(n?'이 문을 열면 도시를 떠날 수 있다. 대신, 지금까지 모은 기록 '+n+'개가 모두 지워진다.':'이 문을 열면 도시를 떠날 수 있다. 아직 모은 기록은 하나도 없다.'),
   c:[{l:'문을 연다',f:()=>say([{t:'정말 문을 열까? 되돌릴 수 없다.',c:[{l:'연다',f:endForget},{l:'그만둔다'}]}])},
      {l:'기록을 보존한다',f:()=>say(['손을 거뒀다. 철문은 굳게 닫힌 채 그대로다.','아직 이 도시에 대해 아는 것이 없다.'])},
      {l:'모든 기록을 가져간다',f:()=>say(['손잡이에 손을 얹었지만, 아무 일도 일어나지 않는다.','"모든 기록을 완성한 기록자만 선택할 수 있습니다."','…아직 기록이 부족하다.'])}]}
 ]);
}

/* ================= PAST VIEW ================= */
function canPast(){return (S.area==='school'&&has('video'))||(S.area==='factory'&&has('cctv'));}
function enterPast(){
 if(!canPast()||S.past)return;
 const tx=Math.floor(P.x/TS),ty=Math.floor(P.y/TS);
 if(tx>=15&&tx<=21&&ty>=15&&ty<=21){say(['이 방은 영상 속 과거에서는 벽 너머에 있었다. 복도로 나가서 시도하자.']);return;}
 if(arcOpen)closeArchive();
 flash(COL.blue);S.past=true;unstuck();alog('USER 과거 접속');
 const ik='pastIntro_'+S.area;
 if(!S.flags[ik]){S.flags[ik]=1;save();
  const back=isTouch?'(현재로 돌아가려면 오른쪽 위 버튼을 누른다)':'(현재로 돌아가려면 오른쪽 위 버튼)';
  const pg=S.area==='factory'?['…멈춰 있던 기계들이 일제히 돌아가기 시작했다. 증기, 경보음, 뛰어가는 발소리.','2011년 10월 14일 16시 58분. CCTV 속 그 순간이다.','레버실로 들어간 흰 코트의 사람을 따라가 보자.',back]:['…복도에 빛이 돌아왔다. 웃음소리, 발소리, 축제 음악.','15년 전, 2011년 10월 14일. 영상 속 그날이다.','현재와 무엇이 다른지 살펴보자.',back];
  setTimeout(()=>say(pg),500);}
 updateHUD(true);
}
function exitPast(){if(!S.past)return;flash('#ffffff');S.past=false;unstuck();updateHUD(true);}
function togglePast(){if(busy())return;if(S.past)exitPast();}
function flash(c){const f=$('flash');f.style.background=c;f.classList.remove('go');void f.offsetWidth;f.classList.add('go');}

/* ================= AREA ================= */
function goArea(a,x,y){
 transitioning=true;refreshBusy();$('fade').classList.add('on');
 setTimeout(()=>{
  S.area=a;S.past=false;P.x=x;P.y=y;clearZombies();save();updateHUD(true);updateCombatHud(true);
  $('fade').classList.remove('on');
  setTimeout(()=>{transitioning=false;refreshBusy();
   if(a==='school'&&!S.flags.schoolIntro){S.flags.schoolIntro=1;save();
    say(['…정문을 지나 폐교 안으로 들어섰다.','공기가 다르다. 도시보다 더 조용하고, 더 차갑다.','복도 저편에서 누군가 나를 보고 있는 것 같다.']);}
   if(a==='nl'&&!S.flags.nlIntro){S.flags.nlIntro=1;save();
    say(['빛을 지나자, 먼지 하나 없는 거리가 펼쳐졌다.','색이 있다. 하늘도, 벽도, 나무도. 흑백인 건 나 하나뿐이다.','…그런데 여기는, 내가 처음 눈을 뜬 거리와 똑같이 생겼다.','광장의 시계들이 저마다 다른 시간을 가리키고 있다.']);}
   if(a==='lab'&&!S.flags.labIntro){S.flags.labIntro=1;save();
    say(['계단은 끝없이 이어졌다. 공장의 소음이 완전히 사라질 즈음, 문이 나타났다.','B3 지하 연구시설. 공기에서 쇠와 오존 냄새가 난다.','벽을 따라 흐르는 빛의 색이… 조금 이상하다. 흑백이 아니다.']);}
   if(a==='factory'&&!S.flags.factoryIntro){S.flags.factoryIntro=1;save();
    say(['좁은 사다리를 한참 내려가자, 습한 지하 통로가 이어졌다.','통로 끝에서 거대한 공장이 입을 벌리고 있다. 기계는 모두 멈췄는데, 어딘가에서 증기가 새어 나온다.','벽에 붙은 이름. 석말공장.']);}
  },450);
 },500);
}

/* ================= KEYPAD ================= */
let kpVal='';
(function buildKp(){
 const g=$('kpGrid');['1','2','3','4','5','6','7','8','9','지움','0','확인'].forEach(k=>{
  const b=document.createElement('button');b.textContent=k;if(k.length>1)b.style.fontSize='14px';
  b.onclick=()=>kpPress(k==='지움'?'back':k==='확인'?'ok':k);g.appendChild(b);});
 $('kpClose').onclick=closeKeypad;
})();
let kpCfg=null;
const GATE_KP={title:'한결중학교 정문',msg:'학교에 마지막으로 사람이 있었던 날 (월일 4자리)',code:'1014',
 ok:()=>{S.flags.gateOpen=true;save();shakeT=.4;say(['삐빅. 잠금이 풀렸다.','녹슨 정문이 비명 같은 소리를 내며 열린다.',S.flags.dateTruth?'신문이 아니라 사진이 옳았다. 그날, 학교에는 사람이 있었다.':'그날, 학교에는 사람이 있었다.']);},
 wrong:v=>v==='1013'?'삐— 틀렸다. 신문의 휴교령을 믿는다면 13일이 마지막이었겠지만… 신문은 믿을 만한가?':(wrongTries>=2?'삐— 틀렸다. 기록 보관함에서 두 기록을 비교해 모순을 찾아보자.':'삐— 비밀번호가 틀렸다.')};
const LAB_KP={title:'B3 비상 통로',msg:'최종 잠금 해제 코드 (4자리)',code:'3102',
 ok:()=>{S.flags.codeOK=true;save();shakeT=.5;alog('USER 코드 입력 · 승인');say(['삐빅. 비상 통로의 잠금이 풀렸다.','문 너머로 아래를 향한 긴 통로가 이어진다. 바깥 공기 같은 차가운 바람이 올라온다.']);},
 wrong:v=>v==='3017'||v==='3117'?'삐— 틀렸다. 개방 시각 전체가 아니라 "분"만 필요하다.':(v==='3002'?'삐— 틀렸다. 출석부의 인원이 아니라, 관측 대상의 수다.':'삐— 틀렸다. 관측 대상의 수, 그리고 누리느엘이 열린 시각의 분.')};
function openKeypad(cfg){kpCfg=(cfg&&cfg.code)?cfg:GATE_KP;kpOpen=true;kpVal='';renderKp();$('kpTitle').textContent=kpCfg.title;$('kpMsg').textContent=kpCfg.msg;$('keypad').classList.remove('hidden');refreshBusy();}
function closeKeypad(){kpOpen=false;$('keypad').classList.add('hidden');refreshBusy();}
function renderKp(){$('kpScreen').textContent=(kpVal+'____').slice(0,4);}
function kpPress(k){
 if(k==='back'){kpVal=kpVal.slice(0,-1);renderKp();return;}
 if(k==='ok'){checkKp();return;}
 if(kpVal.length<4){kpVal+=k;renderKp();}
 if(kpVal.length===4)setTimeout(checkKp,150);
}
function checkKp(){
 if(kpVal.length<4)return;
 const scr=$('kpScreen');
 if(kpVal===kpCfg.code){closeKeypad();kpCfg.ok();return;}
 wrongTries++;
 scr.classList.remove('bad');void scr.offsetWidth;scr.classList.add('bad');
 $('kpMsg').textContent=kpCfg.wrong(kpVal);
 setTimeout(()=>{kpVal='';renderKp();},500);
}

/* ================= ARCHIVE ================= */
let arcSel=null,cmpMode=false,cmpSel=[],arcTab='rec';
function openArchive(){if(!started||dlg||kpOpen||endOpen||transitioning)return;arcOpen=true;cmpMode=false;cmpSel=[];if(!arcSel||!has(arcSel))arcSel=S.records[S.records.length-1]||null;renderArchive();$('archive').classList.remove('hidden');refreshBusy();}
function closeArchive(){arcOpen=false;$('archive').classList.add('hidden');$('cmpResult').classList.add('hidden');refreshBusy();}
function renderArchive(){
 document.querySelectorAll('.tabs button').forEach(b=>b.classList.toggle('on',b.dataset.tab===arcTab));
 $('arcRec').classList.toggle('hidden',arcTab!=='rec');$('arcDed').classList.toggle('hidden',arcTab!=='ded');
 const list=$('arcList');list.innerHTML='';
 if(!S.records.length)list.innerHTML='<div class="empty">아직 모은 기록이 없다.<br>빛나는 물건에 다가가 조사해 보자.</div>';
 S.records.forEach(id=>{
  const r=R[id];const b=document.createElement('button');
  b.className='card c-'+r.color+(cmpMode?(cmpSel.indexOf(id)>=0?' sel':''):(arcSel===id?' on':''));
  b.innerHTML='<span class="d"></span><span><div class="ct"></div><div class="cm"></div></span>';
  b.querySelector('.ct').textContent=r.title;b.querySelector('.cm').textContent=r.type+', '+r.date;
  b.onclick=()=>{
   if(cmpMode){const i=cmpSel.indexOf(id);if(i>=0)cmpSel.splice(i,1);else{if(cmpSel.length>=2)cmpSel.shift();cmpSel.push(id);}}
   arcSel=id;renderArchive();
  };
  list.appendChild(b);
 });
 $('cmpToggle').classList.toggle('on',cmpMode);$('cmpToggle').textContent=cmpMode?'비교 취소':'두 기록 비교';
 $('cmpGo').classList.toggle('hidden',!cmpMode);$('cmpGo').disabled=cmpSel.length!==2;
 $('cmpHint').textContent=cmpMode?('비교할 기록 두 개를 고르세요 ('+cmpSel.length+'/2)'):'서로 맞지 않는 두 기록을 찾으면 진실에 가까워진다.';
 const d=$('arcDetail');d.innerHTML='';
 if(arcSel){
  const r=R[arcSel];d.className='arc-detail c-'+r.color;
  d.innerHTML='<div class="stripe"></div><div class="dm"></div><h3></h3>';
  d.querySelector('.dm').textContent=r.type+' / '+r.place+' / '+r.date;d.querySelector('h3').textContent=r.title;
  r.text.split('\n\n').forEach(t=>{const p=document.createElement('p');p.textContent=t;d.appendChild(p);});
  if(r.past){
   const b=document.createElement('button');b.className='pastgo';
   if(S.past){b.textContent='현재로 돌아간다';b.onclick=()=>{closeArchive();exitPast();};}
   else{b.textContent=(r.pastArea==='school'?'동아리실 캠코더':'관제실 모니터')+'에 테이프를 넣어야 과거를 볼 수 있다';b.disabled=true;b.style.opacity=.5;}
   d.appendChild(b);
  }
 } else d.innerHTML='<div class="empty">기록을 선택하면 내용이 여기에 표시된다.</div>';
 const ded=$('arcDed');let h='<h4>발견한 모순 '+S.contra.length+' / '+CONTRA.length+'</h4>';
 CONTRA.forEach((c,i)=>{if(S.contra.indexOf(i)>=0)h+='<div class="ded"><b>'+c.title+'</b><span>'+c.text.replace(/\n/g,'<br>')+'</span></div>';});
 const left=CONTRA.length-S.contra.length;for(let i=0;i<left;i++)h+='<div class="ded lock"><b>발견하지 못한 모순</b><span>어딘가의 두 기록이 서로 다른 말을 하고 있다.</span></div>';
 const en=ESC.filter(e=>e.id&&has(e.id)).length;
 h+='<h4 style="margin-top:28px">탈출구 추적 '+en+' / 4</h4>';
 ESC.forEach(e=>{const ok=e.id&&has(e.id);h+='<div class="esc"><span class="m" style="color:'+(ok?COL.red:'#57544f')+'">'+(ok?'■':'□')+'</span><span style="color:'+(ok?'#e7e3da':'#6e6b64')+'">'+(ok?e.l:'??? 기록')+'</span><span class="a">'+e.a+'</span></div>';});
 ded.innerHTML=h;
}
document.querySelectorAll('.tabs button').forEach(b=>b.onclick=()=>{arcTab=b.dataset.tab;renderArchive();});
$('cmpToggle').onclick=()=>{cmpMode=!cmpMode;cmpSel=[];renderArchive();};
$('cmpGo').onclick=compare;
$('arcClose').onclick=closeArchive;
$('arcBtn').onclick=()=>{arcOpen?closeArchive():openArchive();};
function compare(){
 if(cmpSel.length!==2)return;const a=cmpSel[0],b=cmpSel[1];
 const idx=CONTRA.findIndex(c=>(c.a===a&&c.b===b)||(c.a===b&&c.b===a));
 const box=$('cmpResult');let html;
 if(idx<0){html='<div class="cmp-in"><div class="cmp-k no">모순 없음</div><h3>두 기록은 서로 부딪히지 않는다</h3><p>'+R[a].title+'와 '+R[b].title+' 사이에서는 어긋나는 점을 찾지 못했다. 다른 조합을 시도해 보자.</p><button id="cmpOk">돌아가기</button></div>';}
 else{
  const c=CONTRA[idx];const already=S.contra.indexOf(idx)>=0;
  if(!already){S.contra.push(idx);if(c.flag)S.flags[c.flag]=true;save();alog('USER 추론 · '+c.title);}
  html='<div class="cmp-in"><div class="cmp-k">'+(already?'이미 발견한 모순':'모순 발견')+'</div><h3>'+c.title+'</h3><p>'+c.text+'</p><button id="cmpOk">추론을 기록한다</button></div>';
 }
 box.innerHTML=html;box.classList.remove('hidden');
 $('cmpOk').onclick=()=>{box.classList.add('hidden');cmpMode=false;cmpSel=[];renderArchive();updateHUD(true);};
}

/* ================= HUD ================= */
let hudCache='';
function objective(){
 const f=S.flags;
 if(S.area==='city'){
  if(f.gateOpen)return '북쪽 정문을 지나 폐교로 들어가자.';
  if(!has('memo'))return '텅 빈 도시를 조사하자. 도로 북쪽 끝에 학교 정문이 있다.';
  if(!f.dateTruth)return '정문 비밀번호는 학교에 마지막으로 사람이 있던 날. 믿을 수 있는 기록은 어느 쪽일까?';
  return '정문 키패드에 비밀번호를 입력하자.';
 }
 if(S.area==='nl'){
  if(!f.roadOpen){const cc=CLOCKS.filter(has).length;return TRUE_ORDER.some(id=>!has(id))?'누리느엘의 시계를 찾자. 모든 시계가 서로 다른 시간을 가리킨다. ('+cc+' / 5)':'광장의 시계탑에서 그날의 시간을 순서대로 맞추자.';}
  if(!has('nlcore'))return '북쪽에 생긴 길을 따라 누리느엘의 중심부로 가자.';
  return '중심의 빛에 닿거나, 하얀 고리로 연구시설에 돌아가 탈출구 앞에 서자.';
 }
 if(S.area==='lab'){
  if(!f.archiveOn)return 'B3 지하 연구시설. 유일하게 켜진 컴퓨터를 찾자.';
  if(!f.restored)return 'ARCHIVE 시스템의 삭제된 자료를 복구하자. 진실인 기록만 답이 된다.';
  if(!has('notfirst'))return '문이 열린 폐쇄 실험실을 조사하자.';
  if(!f.codeOK)return '최종 잠금 해제 코드로 동쪽 비상 통로를 열자.';
  if(!f.sawIron)return '비상 통로를 따라 가장 깊은 곳까지 내려가자.';
  if(!f.preserved)return '탈출구 앞에서 선택해야 한다.';
  return has('nlcore')?'가장 깊은 곳의 탈출구로 가자. 이번에는 모든 기록을 가지고.':'하얀 빛이 새어 나오는 장치실로 가자.';
 }
 if(S.area==='factory'){
  if(S.past)return '그날 16시 58분의 공장이다. 흰 코트의 사람은 레버를 어떤 순서로 당겼나?';
  if(!f.power&&!has('cctv'))return '멈춘 공장을 조사하자. 그날의 기록이 어딘가 남아 있다.';
  if(!f.power)return '레버실에서 제3발전기 전원을 올리자. 어떤 순서를 믿어야 할까?';
  if(!has('power'))return '발전기실에서 전력 공급 기록을 확인하자.';
  if(!has('nuriel'))return '문이 열린 폐쇄 실험실을 조사하자.';
  return '계단실을 통해 B3 지하 연구시설로 내려가자.';
 }
 if(S.past)return '과거의 학교를 살펴보자. 지금의 폐교와 무엇이 다른가?';
 if(!has('video'))return '폐교 곳곳에 남은 기록을 찾자.';
 if(!f.knowMural)return '동아리실 캠코더에 축제 테이프를 넣어 과거를 보자.';
 if(!f.cleared)return '과거에 벽화가 있던 자리를 현재에서 조사하자.';
 if(!f.hasFuse)return '숨겨진 방을 조사하자.';
 if(!f.powered)return '방송실 콘솔에 전원을 넣자.';
 if(!f.nameKnown)return '콘솔이 사용자 이름을 요구한다. 출석부와 어긋나는 기록이 있을까?';
 if(!f.broadcastDone)return '방송실 콘솔에 접속하자.';
 return '숨겨진 방의 철제 해치로 공장 방향 지하 통로에 들어가자.';
}
function updateHUD(force){
 document.body.classList.toggle('bright',S.area==='nl');
 const an=AREA_NAME[S.area]+(S.past?(S.area==='factory'?' · 2011년 10월 14일 16:58':' · 2011년 10월 14일'):'');
 const ob=objective();
 let pb='';if(S.past)pb='현재로 돌아가기';
 const key=an+ob+pb+S.records.length;
 if(!force&&key===hudCache)return;hudCache=key;
 $('areaName').textContent=an;$('objective').textContent=ob;
 $('recCount').textContent=' '+S.records.length+'/'+TOTAL;
 const b=$('pastBtn');b.classList.toggle('hidden',!pb);b.textContent=pb;
}
$('pastBtn').onclick=togglePast;
setTimeout(initLayoutEdit,0);
let landLocked=false;
function orientLabel(){const b=$('orientBtn');if(b)b.textContent=landLocked?'고정 해제':'가로 고정';}
async function toggleLandscape(){
 const so=screen.orientation;
 if(landLocked){try{so&&so.unlock&&so.unlock();}catch(e){}try{const ex=document.exitFullscreen||document.webkitExitFullscreen;if((document.fullscreenElement||document.webkitFullscreenElement)&&ex)await ex.call(document);}catch(e){}
  landLocked=false;orientLabel();toast('가로 고정을 풀었어요. 세로·가로 모두 쓸 수 있어요');return;}
 try{const el=document.documentElement;if(el.requestFullscreen)await el.requestFullscreen({navigationUI:'hide'});else if(el.webkitRequestFullscreen)el.webkitRequestFullscreen();}catch(e){}
 try{if(!so||!so.lock)throw 0;await so.lock('landscape');landLocked=true;orientLabel();toast('가로 화면으로 고정했어요');}
 catch(e){try{const ex=document.exitFullscreen||document.webkitExitFullscreen;if((document.fullscreenElement||document.webkitFullscreenElement)&&ex)await ex.call(document);}catch(_){}
  toast('이 기기는 화면 고정을 지원하지 않아요. 화면 회전 잠금을 끄고 휴대폰을 가로로 돌리면 가로로 할 수 있어요');}
}
document.addEventListener('fullscreenchange',()=>{if(!document.fullscreenElement&&landLocked){landLocked=false;try{screen.orientation.unlock();}catch(e){}orientLabel();}});
$('orientBtn').onclick=toggleLandscape;
$('fpBtn').onclick=()=>toggleFP();setTimeout(updateFPBtn,0);
function fmt(t){t=Math.floor(t);const h=Math.floor(t/3600),m=Math.floor(t/60)%60,s=t%60;return [h,m,s].map(v=>String(v).padStart(2,'0')).join(':');}

/* ================= INPUT ================= */
const keys={};
/* 키 이름 통일: 한글 입력 상태(ㅈㅁㄴㅇ)나 대문자여도 WASD가 동작하도록 실제 키 위치(e.code) 기준으로 읽음 */
const HANGUL_KEY={'ㅋ':'z','ㅈ':'w','ㅉ':'w','ㅁ':'a','ㄴ':'s','ㅇ':'d','ㄷ':'e','ㄸ':'e','ㄹ':'f','ㄱ':'r','ㄲ':'r','ㅂ':'q','ㅃ':'q'};
function normKey(e){
 const c=e.code||'';
 if(/^Key[A-Z]$/.test(c))return c.slice(3).toLowerCase();
 if(/^Digit[0-9]$/.test(c))return c.slice(5);
 if(/^Numpad[0-9]$/.test(c))return c.slice(6);
 if(c==='Space')return ' ';
 if(c==='ShiftLeft'||c==='ShiftRight')return 'shift';
 if(c==='Enter'||c==='NumpadEnter')return 'enter';
 const k=(e.key||'').toLowerCase();
 return HANGUL_KEY[k]||k;
}
window.addEventListener('keydown',e=>{
 const k=normKey(e);
 if(k==='tab'){e.preventDefault();if(arcOpen)closeArchive();else openArchive();return;}
 if(kpOpen){if(/^[0-9]$/.test(k))kpPress(k);else if(k==='backspace')kpPress('back');else if(k==='enter')kpPress('ok');else if(k==='escape')closeKeypad();return;}
 if(k==='escape'){if(arcOpen)closeArchive();return;}
 if(dlg){
  if(e.repeat)return;
  const p=dlg.pages[dlg.i];
  if(p.c&&!dlg.typing&&/^[1-9]$/.test(k)){pick(+k-1);return;}
  if(k===' '||k==='enter'){e.preventDefault();advance();}
  return;
 }
 if(arcOpen)return;
 if(['arrowup','arrowdown','arrowleft','arrowright',' '].indexOf(k)>=0)e.preventDefault();
 keys[k]=true;
 if(e.repeat)return;
 if(k==='enter')action();
 if(k===' ')beginCharge();
 if(k==='1')useItemKey('energy');if(k==='2')useItemKey('bandage');if(k==='3')useItemKey('aid');
 if(k==='q')swapBat();
 if(k==='z')toggleFP();
});
window.addEventListener('keyup',e=>{const k=normKey(e);keys[k]=false;if(k===' ')releaseCharge();});
window.addEventListener('blur',()=>{for(const k in keys)keys[k]=false;});
function action(){if(dlg){advance();return;}if(busy())return;if(near)interact(near);}
$('btnAct').addEventListener('click',e=>{e.preventDefault();action();});

const joy={id:null,ox:0,oy:0,dx:0,dy:0,len:0};
const jz=$('joyzone'),jb=$('joyBase'),jk=$('joyKnob');
function joyMove(e){
 const r=jb.getBoundingClientRect();let dx=e.clientX-(r.left+r.width/2),dy=e.clientY-(r.top+r.height/2);
 const l=Math.hypot(dx,dy),mx=r.width*.38;if(l>mx){dx*=mx/l;dy*=mx/l;}
 joy.dx=dx/mx;joy.dy=dy/mx;joy.len=Math.min(1,l/mx);jk.style.transform='translate('+dx+'px,'+dy+'px)';
}
jz.addEventListener('pointerdown',e=>{e.preventDefault();joy.id=e.pointerId;jb.classList.add('on');try{jz.setPointerCapture(e.pointerId);}catch(_){}joyMove(e);});
jz.addEventListener('pointermove',e=>{if(e.pointerId!==joy.id)return;joyMove(e);});
function joyEnd(e){if(e.pointerId!==joy.id)return;joy.id=null;joy.dx=joy.dy=joy.len=0;jk.style.transform='';jb.classList.remove('on');}
const look={id:null,x:0};
cv.addEventListener('pointerdown',e=>{if(!FPV||busy())return;look.id=e.pointerId;look.x=e.clientX;try{cv.setPointerCapture(e.pointerId);}catch(_){}});
cv.addEventListener('pointermove',e=>{if(e.pointerId!==look.id)return;const dx=e.clientX-look.x;look.x=e.clientX;P.lookA+=dx*(isTouch?.0075:.005);});
['pointerup','pointercancel','lostpointercapture'].forEach(ev=>cv.addEventListener(ev,e=>{if(e.pointerId===look.id)look.id=null;}));
let clk=null;
cv.addEventListener('pointerdown',e=>{if(e.pointerType!=='mouse'||e.button!==0)return;clk={x:e.clientX,y:e.clientY,t:performance.now()};if(FPV)beginCharge();else beginCharge(CAMX+e.clientX/Z,CAMY+e.clientY/Z);});
cv.addEventListener('pointerup',e=>{if(!clk||e.pointerType!=='mouse')return;const m=Math.hypot(e.clientX-clk.x,e.clientY-clk.y),d=performance.now()-clk.t;clk=null;
 if(m<8)releaseCharge();else cancelCharge();});
let runHeld=false;const rb=$('btnRun');
rb.addEventListener('pointerdown',e=>{e.preventDefault();runHeld=true;rb.classList.add('on');try{rb.setPointerCapture(e.pointerId);}catch(_){}});
['pointerup','pointercancel','lostpointercapture'].forEach(ev=>rb.addEventListener(ev,()=>{runHeld=false;rb.classList.remove('on');}));
rb.addEventListener('click',e=>e.preventDefault());
$('runKey').textContent=isTouch?'':'Shift';
jz.addEventListener('pointerup',joyEnd);jz.addEventListener('pointercancel',joyEnd);

/* ================= UPDATE ================= */
function update(dt){
 if(started&&!endOpen)S.time+=dt;
 if(started)combatUpdate(dt);
 if(busy()){P.moving=false;P.running=false;P.vx=P.vy=0;near=null;return;}
 let vx=0,vy=0,mag=0;
 if(keys['a']||keys['arrowleft'])vx-=1;if(keys['d']||keys['arrowright'])vx+=1;
 if(keys['w']||keys['arrowup'])vy-=1;if(keys['s']||keys['arrowdown'])vy+=1;
 if(vx||vy){const l=Math.hypot(vx,vy);vx/=l;vy/=l;mag=1;}
 if(joy.len>.12){const l=Math.hypot(joy.dx,joy.dy)||1;vx=joy.dx/l;vy=joy.dy/l;mag=Math.min(1,joy.len);}
 if(FPV){
  let fwd=0,str=0,turn=0;
  if(keys['w']||keys['arrowup'])fwd+=1;if(keys['s']||keys['arrowdown'])fwd-=1;
  if(keys['a'])str-=1;if(keys['d'])str+=1;
  if(keys['arrowleft'])turn-=1;if(keys['arrowright'])turn+=1;
  if(joy.len>.12){fwd-=joy.dy*joy.len;str+=joy.dx*joy.len;}
  P.lookA+=turn*2.4*dt;
  const ca=Math.cos(P.lookA),sa=Math.sin(P.lookA),mx=ca*fwd-sa*str,my=sa*fwd+ca*str,ml=Math.hypot(mx,my);
  if(ml>.08){vx=mx/ml;vy=my/ml;mag=Math.min(1,ml)*(fwd<-.1&&Math.abs(str)<.3?.65:1);}else{vx=vy=0;mag=0;}
 }
 const wantRun=(keys['shift']||runHeld)&&mag>0;
 if(wantRun&&!P.tired&&P.sta>0){P.running=true;P.sta=Math.max(0,P.sta-dt*.36);if(P.sta<=0)P.tired=true;}
 else{P.running=false;P.sta=Math.min(1,P.sta+dt*(mag>0?.2:.34));if(P.tired&&P.sta>.35)P.tired=false;}
 const top=(P.running?210:122)*Math.max(.45,mag);
 const k=1-Math.exp(-dt*(mag>0?(P.running?8:11):15));
 P.vx+=(vx*(mag>0?top:0)-P.vx)*k;P.vy+=(vy*(mag>0?top:0)-P.vy)*k;
 const spd=Math.hypot(P.vx,P.vy);
 const ox=P.x,oy=P.y;
 if(spd>3){
  const nx=P.x+P.vx*dt,ny=P.y+P.vy*dt;
  if(!hit(nx,P.y))P.x=nx;else P.vx*=.3;
  if(!hit(P.x,ny))P.y=ny;else P.vy*=.3;
  if(mag>0&&!FPV){P.fx=vx;P.fy=vy;
   if(Math.abs(vx)>Math.abs(vy)*1.15)P.face=vx>0?'r':'l';else if(Math.abs(vy)>Math.abs(vx)*1.15)P.face=vy>0?'d':'u';}
 } else {P.vx=P.vy=0;}
 const moved=Math.hypot(P.x-ox,P.y-oy);
 P.moving=moved>.05;
 const ww=P.moving?Math.min(1,moved/dt/90):0;
 P.walkW+=(ww-P.walkW)*(1-Math.exp(-dt*(ww>P.walkW?9:12)));
 P.runW+=((P.running&&P.moving?1:0)-P.runW)*(1-Math.exp(-dt*6));
 const stepLen=36+10*P.runW;
 const prev=P.phase;
 if(P.moving)P.phase+=moved*Math.PI/stepLen;
 else if(P.walkW>.02){const tgt=Math.round(P.phase/Math.PI)*Math.PI;P.phase+=(tgt-P.phase)*(1-Math.exp(-dt*10));}
 P.anim=P.phase;
 if(P.runW>.5)for(const off of [0,Math.PI]){if(Math.cos(prev+off)>0&&Math.cos(P.phase+off)<=0){
  const sx=P.face==='l'?-1:P.face==='r'?1:0;DUST.push({x:P.x+(off?-2:2)*(sx?0:1)+sx*Math.sin(P.phase+off)*7,y:P.y+1,t:0});}}
 if(FPV){const ca=Math.cos(P.lookA),sa=Math.sin(P.lookA);P.fx=ca;P.fy=sa;P.face=Math.abs(ca)>Math.abs(sa)?(ca>0?'r':'l'):(sa>0?'d':'u');}
 else if(mag>0){P.lookA+=angDiff(Math.atan2(vy,vx),P.lookA)*(1-Math.exp(-dt*9));}
 {const sv=Math.round(P.sta*40)/40;if(sv!==rb._sv){rb._sv=sv;rb.style.setProperty('--st',sv);}if(rb._tr!==P.tired){rb._tr=P.tired;rb.classList.toggle('tired',P.tired);}}
 if(S.area==='city'&&S.flags.gateOpen&&P.y<TS*.9)goArea('school',27*TS,24.2*TS);
 else if(S.area==='school'&&P.y>TS*25.2)goArea('city',20*TS,1.9*TS);
 else if(S.area==='factory'&&P.y>TS*28.2)goArea('school',18.5*TS,19.7*TS);
 else if(S.area==='lab'&&P.y<TS*1.9)goArea('factory',28.5*TS,24.9*TS);
 if(S.area==='nl'){
  let w=0;const onSt=P.y>18*TS&&P.y<21*TS;if(onSt&&P.x>27.5*TS&&P.x<29*TS){P.x=.7*TS;w=1;}else if(onSt&&P.x<.5*TS){P.x=27.3*TS;w=1;}
  if(w){S.flags.loops=(S.flags.loops||0)+1;const n=S.flags.loops;alog('USER 이동 · 같은 거리 '+n+'회');
   toast(n===1?'…다시 같은 거리다.':n===2?'계속 걸어도 같은 장소로 돌아온다.':'이 길은 어디로도 이어지지 않는다. 다른 길을 찾아야 한다.',COL.nuri);}
  if(!S.flags.centerIntro&&roomLabel()==='중심부'){S.flags.centerIntro=1;save();
   say(['길 끝에, 하얀 빛이 숨 쉬는 광장이 있었다.','서른 개의 의자가 빛을 향해 놓여 있다. 모두 비어 있다.','누리느엘의 중심부다.']);}
 }
 if(S.flags.archiveOn){
  if(P.moving){stepAcc+=120*dt;idleT=0;idleLogged=false;S.steps=(S.steps||0)+120*dt/20;if(stepAcc>TS*12){stepAcc=0;alog('USER 이동 · 누적 '+Math.floor(S.steps)+'걸음');}}
  else{idleT+=dt;if(idleT>6&&!idleLogged){idleLogged=true;alog('USER 정지 · 망설임 '+Math.floor(idleT)+'초');}}
  const rl=roomLabel();if(rl!==lastRoom){if(lastRoom)alog('USER 위치 · '+rl);lastRoom=rl;}
 }
 near=findNear();
 $('btnAct').classList.toggle('ready',!!near);
}

/* ================= 전투: 노이즈 좀비 · 야구방망이 · 회복 아이템 ================= */
const HP_MAX=150,Z_DMG=20,Z_CAP=12;
const BAT_N={atk:60,dur:300,crit:.35,critDmg:150},BAT_S={atk:300,dur:1};
const KILL_RECS={city:['kc1','kc5','kc10'],school:['ks1','ks5','ks10'],factory:['kf1','kf5','kf10'],lab:['kl1','kl5','kl10']};
const KILL_STEPS=[1,5,10];
const AREA_START={city:[5.5,27.6],school:[27,24.2],factory:[19,26.6],lab:[18,3.4]};
const COMBAT_AREAS=['city','school','factory','lab'];
let ZOMBIES=[],ZMARK=[],FLOATS=[],zSpawnT=8,atkT=0,swingT=0,iframeT=0,hurtT=0,useItem=null,dying=false,layoutEditing=false;
function combatOn(){return COMBAT_AREAS.indexOf(S.area)>=0&&!S.past;}
function ensureCombatState(){
 if(typeof S.hp!=='number')S.hp=HP_MAX;
 if(!Array.isArray(S.bats))S.bats=[{sp:false,dur:BAT_N.dur}];
 if(!S.items)S.items={energy:0,bandage:0,aid:0};
 if(!S.kills)S.kills={};
 if(!S.loot)genAllLoot();
}
/* ---- 아이템·방망이 배치 ---- */
const FLOOR_OK={city:[',','.'],school:['f'],factory:['m','v'],lab:['n']};
function lootTiles(a){
 const m=MAPS[a],out=[],st=AREA_START[a],ok=FLOOR_OK[a];
 for(let y=1;y<m.h-1;y++)for(let x=1;x<m.w-1;x++){const t=m.g[y][x];if(ok.indexOf(t)<0)continue;
  if(Math.hypot(x+.5-st[0],y+.5-st[1])<3)continue;if(OBJ[a].some(o=>o.x<=x&&x<o.x+(o.w||1)&&o.y===y))continue;
  if(a==='school'&&(RUBBLE_S.has(x+','+y)||(x>=15&&x<=21&&y>=16&&y<=21)))continue;
  if(a==='city'&&CARS.some(c=>(c.x===x||(c.d==='h'&&c.x+1===x))&&(c.y===y||(c.d==='v'&&c.y+1===y))))continue;
  out.push([x,y]);}
 return out;
}
function genAllLoot(){
 const L={},taken=new Set();
 const pick=(a,arr)=>{for(let k=0;k<40;k++){const p=arr[Math.floor(Math.random()*arr.length)];const key=a+p[0]+','+p[1];if(!taken.has(key)){taken.add(key);return p;}}return null;};
 COMBAT_AREAS.forEach(a=>{const tl=lootTiles(a);const bats=[],items=[];
  const nb=5+Math.floor(Math.random()*5);for(let i=0;i<nb;i++){const p=pick(a,tl);if(p)bats.push({x:p[0],y:p[1],sp:Math.random()<.25,got:0});}
  for(let i=0;i<6;i++){const r=Math.random(),k=r<.3?'energy':r<.6?'bandage':null;if(!k)continue;const p=pick(a,tl);if(p)items.push({x:p[0],y:p[1],k,got:0});}
  L[a]={bats,items};});
 const hits=COMBAT_AREAS.filter(()=>Math.random()<.25);
 if(hits.length){const a=hits[Math.floor(Math.random()*hits.length)];const p=pick(a,lootTiles(a));if(p)L[a].items.push({x:p[0],y:p[1],k:'aid',got:0});}
 S.loot=L;
}
const ITEM_NAME={energy:'에너지바',bandage:'붕대',aid:'구급상자'};
function curBat(){return S.bats&&S.bats[0]||null;}
function checkPickups(){
 if(!combatOn()||!S.loot||!S.loot[S.area])return;const L=S.loot[S.area],px=P.x,py=P.y-6;
 L.bats.forEach(b=>{if(b.got)return;if(Math.hypot((b.x+.5)*TS-px,(b.y+.5)*TS-py)<TS*.6){
  if(S.bats.length>=5){if(!b.warn){b.warn=1;toast('방망이를 더 들 수 없다 (최대 5개)');}return;}
  b.got=1;S.bats.push(b.sp?{sp:true,dur:BAT_S.dur}:{sp:false,dur:BAT_N.dur});save();
  toast(b.sp?'특수 야구방망이 획득 · 공격력 300 · 1회용':'야구방망이 획득 · 공격력 60 · 내구도 300',b.sp?COL.red:undefined);alog('USER 획득 · '+(b.sp?'특수 ':'')+'야구방망이');updateCombatHud(true);}});
 L.items.forEach(it=>{if(it.got)return;if(Math.hypot((it.x+.5)*TS-px,(it.y+.5)*TS-py)<TS*.6){it.got=1;S.items[it.k]=(S.items[it.k]||0)+1;save();
  toast(ITEM_NAME[it.k]+' 획득',it.k==='aid'?COL.red:undefined);alog('USER 획득 · '+ITEM_NAME[it.k]);updateCombatHud(true);}});
}
/* ---- 아이템 사용 ---- */
function useItemKey(k){
 if(busy()||useItem||!S.items||!(S.items[k]>0))return;
 if(k==='energy'){S.items.energy--;S.hp=Math.min(HP_MAX,S.hp+25);P.staInf=7;toast('에너지바 · 체력 +25 · 7초간 스태미나 무한');}
 else if(k==='bandage'){if(S.hp>=HP_MAX){toast('체력이 이미 가득하다');return;}useItem={k,t:1.75,T:1.75};toast('붕대를 감는 중…');}
 else if(k==='aid'){if(S.hp>=HP_MAX){toast('체력이 이미 가득하다');return;}useItem={k,t:1.2,T:1.2};toast('구급상자를 여는 중…');}
 save();updateCombatHud(true);
}
function swapBat(){if(busy()||!S.bats||S.bats.length<2)return;S.bats.push(S.bats.shift());const b=curBat();toast(b.sp?'특수 야구방망이 · 1회용':'야구방망이 · 내구도 '+Math.ceil(b.dur));updateCombatHud(true);}
/* ---- 공격 ---- */
const SWING=.1,ATK_CD=.168,CHARGE_T=.35;
let chargeT=-1,chargeAim=null;
function beginCharge(ax,ay){if(busy()||useItem||chargeT>=0)return;chargeT=0;chargeAim=ax!==undefined?[ax,ay]:null;}
function releaseCharge(){if(chargeT<0)return;const full=chargeT>=CHARGE_T,a=chargeAim;chargeT=-1;chargeAim=null;if(a)attack(a[0],a[1],full);else attack(undefined,undefined,full);}
function cancelCharge(){chargeT=-1;chargeAim=null;}
function attack(aimX,aimY,charged){
 if(busy()||atkT>0||useItem)return;
 if(aimX!==undefined&&!FPV){P.lookA=Math.atan2(aimY-(P.y-10),aimX-P.x);P.fx=Math.cos(P.lookA);P.fy=Math.sin(P.lookA);const ca=P.fx,sa=P.fy;P.face=Math.abs(ca)>Math.abs(sa)?(ca>0?'r':'l'):(sa>0?'d':'u');}
 atkT=ATK_CD;swingT=SWING;swingCharged=!!charged;
 const b=curBat(),cx=P.x,cy=P.y-10,range=TS*(charged?1.75:1.55),arc=charged?1.25:1.0;
 const targets=ZOMBIES.filter(z=>{if(z.dead||z.born>0)return false;const dx=z.x-cx,dy=(z.y-10)-cy,d=Math.hypot(dx,dy);if(d>range)return false;
  return Math.abs(angDiff(Math.atan2(dy,dx),P.lookA))<=arc||d<TS*.55;});
 if(!targets.length){playSwing(false);return;}
 let used=0;
 targets.forEach(z=>{
  let dmg,crit=false;
  if(!b)dmg=15;else if(b.sp)dmg=BAT_S.atk;else{crit=Math.random()<(charged?.5:BAT_N.crit);dmg=crit?BAT_N.critDmg:BAT_N.atk;}
  z.hp-=dmg;z.flash=.15;used+=dmg;
  const ka=Math.atan2(z.y-P.y,z.x-P.x),kb=(charged?340:170)+(crit?70:0)+(b&&b.sp?120:0);
  z.kx=Math.cos(ka)*kb;z.ky=Math.sin(ka)*kb;z.stun=charged?.5:.22;
  FLOATS.push({x:z.x,y:z.y-36,txt:(crit?'치명타 ':'')+dmg,col:crit||(b&&b.sp)?'#e0605a':'#f2efe8',t:0});
  if(z.hp<=0)killZombie(z);
 });
 shakeT=Math.max(shakeT,charged||(b&&b.sp)?.22:.08);playSwing(true);
 if(b){b.dur-=used*2/3;if(b.dur<=0){S.bats.shift();toast(b.sp?'특수 야구방망이를 다 썼다':'야구방망이가 부러졌다'+(S.bats.length?' · 다음 방망이로 바꿨다':' · 이제 맨손이다'),COL.red);alog('USER 장비 · 방망이 파손');}}
 saveSoon();updateCombatHud(true);
}
let swingCharged=false;let saveSoonT=0;
function saveSoon(){clearTimeout(saveSoonT);saveSoonT=setTimeout(save,1500);}
let AC=null;function playSwing(hit){try{if(!AC)AC=new (window.AudioContext||window.webkitAudioContext)();const t=AC.currentTime,o=AC.createOscillator(),g=AC.createGain();
 o.type=hit?'square':'sine';o.frequency.setValueAtTime(hit?140:420,t);o.frequency.exponentialRampToValueAtTime(hit?60:180,t+.12);g.gain.setValueAtTime(hit?.08:.03,t);g.gain.exponentialRampToValueAtTime(.001,t+.14);o.connect(g);g.connect(AC.destination);o.start(t);o.stop(t+.15);}catch(e){}}
function killZombie(z){
 z.dead=true;z.deadT=0;const a=S.area;S.kills[a]=(S.kills[a]||0)+1;const n=S.kills[a];alog('USER 처치 · 노이즈 좀비 ('+n+')');
 const idx=KILL_STEPS.indexOf(n);if(idx>=0){const id=KILL_RECS[a][idx];if(!has(id)){collect(id);FLOATS.push({x:z.x,y:z.y-60,txt:'기록 획득',col:'#d8b13a',t:0});}}
 updateCombatHud(true);
}
/* ---- 좀비 소환 ---- */
function groupSize(){const step=Math.floor(S.records.length/3);const lo=3+step*2;return lo+Math.floor(Math.random()*3);}
function spawnCandidates(){
 const a=S.area,m=MAPS[a],out=[],pt=[P.x/TS,P.y/TS];
 for(let y=1;y<m.h-1;y++)for(let x=1;x<m.w-1;x++){
  if(a==='city'){if(m.g[y][x]!=='#')continue;const b=tile(x,y+1);if(b!==','&&b!=='.')continue;if(solidAt(x,y+1))continue;
   if(Math.hypot(x+.5-pt[0],y+1.5-pt[1])<=5)continue;out.push({sx:x,sy:y,x:(x+.5)*TS,y:(y+1.6)*TS,kind:'door'});}
  else if(a==='school'){if(m.g[y][x]!=='#'||tile(x,y)!=='#')continue;const b=tile(x,y+1);if(b!=='f')continue;if(solidAt(x,y+1))continue;
   if(Math.hypot(x+.5-pt[0],y+1.5-pt[1])<4)continue;out.push({sx:x,sy:y,x:(x+.5)*TS,y:(y+1.6)*TS,kind:'window'});}
  else{const t=tile(x,y);if(t!=='m'&&t!=='n'&&t!=='v')continue;if(solidAt(x,y))continue;const d=Math.hypot(x+.5-pt[0],y+.5-pt[1]);if(d<4||d>14)continue;
   if(a==='factory'&&Math.hypot(x+.5-6.5,y+.5-25.5)>8)continue;out.push({sx:x,sy:y,x:(x+.5)*TS,y:(y+.6)*TS,kind:'pipe'});}
 }
 return out;
}
function scheduleGroup(){
 const alive=ZOMBIES.filter(z=>!z.dead).length+ZMARK.length,room=Z_CAP-alive;if(room<=0)return;
 const n=Math.min(room,groupSize()),c=spawnCandidates();if(!c.length)return;
 for(let i=0;i<n;i++){const p=c[Math.floor(Math.random()*c.length)];ZMARK.push({x:p.x+(Math.random()-.5)*10,y:p.y+(Math.random()-.5)*6,sx:p.sx,sy:p.sy,kind:p.kind,t:3});}
 if(!S.flags.zWarned){S.flags.zWarned=1;toast('붉은 표시가 뜬 곳에서 3초 뒤 노이즈 좀비가 나타난다',COL.red);}
}
function spawnZombie(mk){const hp=70+Math.floor(Math.random()*81);ZOMBIES.push({x:mk.x,y:mk.y,hp,max:hp,sp:30+Math.random()*16,v:Math.floor(Math.random()*3),cd:.8,flash:0,kx:0,ky:0,ph:Math.random()*6,dead:false,deadT:0,born:.4});}
function zHit(x,y){const pts=[[x-6,y-6],[x+6,y-6],[x-6,y+1],[x+6,y+1]];return pts.some(p=>SOLID.has(tile(Math.floor(p[0]/TS),Math.floor(p[1]/TS))));}
function clearZombies(){ZOMBIES=[];ZMARK=[];FLOATS=[];zSpawnT=6+Math.random()*4;}
/* ---- 매 프레임 ---- */
function combatUpdate(dt){
 FLOATS.forEach(f=>f.t+=dt);FLOATS=FLOATS.filter(f=>f.t<1);
 if(atkT>0)atkT-=dt;if(swingT>0)swingT-=dt;if(hurtT>0)hurtT-=dt;
 if(chargeT>=0){if(busy()||useItem)cancelCharge();else chargeT+=dt;}
 if(P.staInf>0){P.staInf-=dt;P.sta=1;P.tired=false;}
 if(busy()||dying)return;
 if(useItem){useItem.t-=dt;if(useItem.t<=0){const k=useItem.k;useItem=null;if(S.items[k]>0){S.items[k]--;S.hp=k==='aid'?HP_MAX:Math.min(HP_MAX,S.hp+100);toast(k==='aid'?'구급상자 · 체력 모두 회복':'붕대 · 체력 +100');save();updateCombatHud(true);}}}
 checkPickups();
 if(iframeT>0)iframeT-=dt;
 if(!combatOn()){if(ZOMBIES.length||ZMARK.length)clearZombies();return;}
 zSpawnT-=dt;if(zSpawnT<=0){zSpawnT=7.5+Math.random()*7.5;scheduleGroup();}
 ZMARK.forEach(mk=>{mk.t-=dt;if(mk.t<=0)spawnZombie(mk);});ZMARK=ZMARK.filter(mk=>mk.t>0);
 const px=P.x,py=P.y;
 ZOMBIES.forEach(z=>{
  if(z.dead){z.deadT+=dt;return;}
  if(z.flash>0)z.flash-=dt;if(z.born>0){z.born-=dt;return;}
  z.ph+=dt*4;
  let mx=z.kx*dt,my=z.ky*dt;z.kx*=Math.pow(.03,dt);z.ky*=Math.pow(.03,dt);
  const dx=px-z.x,dy=py-z.y,d=Math.hypot(dx,dy)||1;
  if(z.stun>0)z.stun-=dt;
  if(d>18&&!(z.stun>0)){mx+=dx/d*z.sp*dt;my+=dy/d*z.sp*dt;}
  if(!zHit(z.x+mx,z.y))z.x+=mx;else if(!zHit(z.x,z.y+Math.sign(dy||1)*z.sp*dt))z.y+=Math.sign(dy||1)*z.sp*dt*.6;
  if(!zHit(z.x,z.y+my))z.y+=my;else if(!zHit(z.x+Math.sign(dx||1)*z.sp*dt,z.y))z.x+=Math.sign(dx||1)*z.sp*dt*.6;
  z.cd-=dt;
  if(d<22&&z.cd<=0&&iframeT<=0){z.cd=1.1;iframeT=.45;hurtT=.35;S.hp=Math.max(0,S.hp-Z_DMG);shakeT=Math.max(shakeT,.18);
   FLOATS.push({x:px,y:py-46,txt:'-'+Z_DMG,col:'#e0605a',t:0});updateCombatHud(true);if(S.hp<=0)playerDie();}
 });
 ZOMBIES.forEach((a,i)=>{if(a.dead)return;for(let j=i+1;j<ZOMBIES.length;j++){const b=ZOMBIES[j];if(b.dead)continue;const dx=b.x-a.x,dy=b.y-a.y,d=Math.hypot(dx,dy);if(d>0&&d<14){const p=(14-d)/2,ux=dx/d,uy=dy/d;if(!zHit(a.x-ux*p,a.y-uy*p)){a.x-=ux*p;a.y-=uy*p;}if(!zHit(b.x+ux*p,b.y+uy*p)){b.x+=ux*p;b.y+=uy*p;}}}});
 ZOMBIES=ZOMBIES.filter(z=>!z.dead||z.deadT<.7);
}
/* ---- 사망 ---- */
function playerDie(){
 if(dying)return;dying=true;cinema=true;refreshBusy();alog('USER 사망 · 기록 손실');
 const a=S.area,lost=(KILL_RECS[a]||[]).filter(has);
 const f=$('fade');$('deathTxt').innerHTML='<div class="d1">기록이 끊겼다</div><div class="d2">'+(lost.length?'이 지역에서 좀비에게서 얻은 기록 '+lost.length+'개를 잃었다':'이 지역의 처치 기록이 처음으로 돌아간다')+'</div>';
 $('hurt').classList.add('dead');setTimeout(()=>{f.classList.add('on');$('deathTxt').classList.add('on');},500);
 setTimeout(()=>{
  const ids=KILL_RECS[a]||[];S.records=S.records.filter(id=>ids.indexOf(id)<0);
  S.contra=S.contra.filter(ci=>{const c=CONTRA[ci];return c&&ids.indexOf(c.a)<0&&ids.indexOf(c.b)<0;});
  S.kills[a]=0;S.hp=HP_MAX;useItem=null;S.past=false;const st=AREA_START[a];P.x=st[0]*TS;P.y=st[1]*TS;P.vx=P.vy=0;
  clearZombies();zSpawnT=8;save();updateHUD(true);updateCombatHud(true);
  $('deathTxt').classList.remove('on');$('hurt').classList.remove('dead');f.classList.remove('on');
  setTimeout(()=>{dying=false;cinema=false;refreshBusy();toast('기록이 다시 시작된다');},500);
 },3600);
}
/* ---- HUD ---- */
let chCache='';
function updateCombatHud(force){
 const el=$('combat');if(!el)return;const on=COMBAT_AREAS.indexOf(S.area)>=0;el.classList.toggle('hidden',!started||!on);if(!on)return;
 const b=curBat(),k=S.kills&&S.kills[S.area]||0,next=KILL_STEPS.find(n=>n>k);
 const key=[Math.ceil(S.hp),b?b.sp+'/'+Math.ceil(b.dur):'x',S.bats.length,S.items.energy,S.items.bandage,S.items.aid,k,useItem?Math.ceil(useItem.t*10):0].join('|');
 if(!force&&key===chCache)return;chCache=key;
 $('hpFill').style.width=(S.hp/HP_MAX*100)+'%';$('hpFill').classList.toggle('low',S.hp<=50);$('hpTxt').textContent='HP '+Math.ceil(S.hp)+' / '+HP_MAX;
 $('wpnName').textContent=b?(b.sp?'특수 방망이 · 1회용':'야구방망이 · '+Math.ceil(b.dur)+'/'+BAT_N.dur):'맨손 · 15';
 $('durFill').style.width=(b?(b.sp?100:b.dur/BAT_N.dur*100):0)+'%';$('durFill').classList.toggle('sp',!!(b&&b.sp));
 $('batCount').textContent=S.bats.length>1?'+'+(S.bats.length-1):'';
 ['energy','bandage','aid'].forEach(i=>{$('ic-'+i).textContent=S.items[i]||0;$('it-'+i).classList.toggle('empty',!(S.items[i]>0));});
 $('killTxt').textContent='처치 '+k+(next?' · 다음 기록 '+next+'킬':' · 처치 기록 모두 획득')+(useItem?' · '+ITEM_NAME[useItem.k]+' 사용 중':'');
 document.body.classList.toggle('lowhp',S.hp<=50);
}
/* ---- 그리기 (탑다운) ---- */
function drawZombie(z,t){
 const x=Math.round(z.x),y=Math.round(z.y);const born=z.born>0?1-z.born/.4:1;const da=z.dead?Math.max(0,1-z.deadT/.7):1;
 ctx.save();ctx.globalAlpha=da*born;ctx.translate(x,y);if(z.dead)ctx.rotate(Math.min(1.3,z.deadT*3)*(z.v%2?1:-1));
 const sw=Math.sin(z.ph),bob=Math.abs(Math.cos(z.ph))*1.2;const shirt=['#5c5a55','#4a4f4c','#56504a'][z.v],pants=['#2c2c2c','#30302a','#262a2c'][z.v];
 ctx.fillStyle='rgba(0,0,0,.45)';ctx.beginPath();ctx.ellipse(0,0,9,3,0,0,Math.PI*2);ctx.fill();
 ctx.scale(1.35,1.35);
 fr(pants,-4.6,-9-bob*.3,3.6,9-Math.max(0,sw)*2);fr(pants,1,-9-bob*.3,3.6,9-Math.max(0,-sw)*2);
 fr(shirt,-6.5,-21-bob,13,13);fr('rgba(0,0,0,.25)',-6.5,-10-bob,13,2);fr('rgba(0,0,0,.3)',-2,-18-bob,1,8);fr('rgba(255,255,255,.08)',-6.5,-21-bob,13,1.5);
 fr('#5a2a26',2,-16-bob,2,3);
 const reach=-4+sw*1.5;fr(shirt,-9,-19-bob,2.8,6);fr(shirt,6.2,-19-bob,2.8,6);fr('#8a8a84',-9.6,-13-bob+reach*.2,3.2,2.4);fr('#8a8a84',6.4,-13-bob-reach*.2,3.2,2.4);
 fr('#9a9790',-4.5,-30-bob,9,9);fr('#2a2a2a',-4.8,-31-bob,9.6,3);
 const nf=Math.floor(t*14+z.ph*3);for(let i=0;i<4;i++)for(let j=0;j<4;j++){const v=(h2(i+nf*7,j+z.v*13)*255)|0;ctx.fillStyle='rgb('+v+','+v+','+v+')';ctx.fillRect(-3.6+i*1.8,-28.6-bob+j*1.7,1.8,1.7);}
 if(Math.sin(t*9+z.ph)>.6)fr('rgba(200,50,45,.6)',-3.6,-27-bob+((nf%4)*1.7),7.2,.5);
 if(z.flash>0){ctx.globalCompositeOperation='lighter';fr('rgba(255,255,255,.6)',-7,-31-bob,14,31);ctx.globalCompositeOperation='source-over';}
 ctx.restore();
 if(!z.dead&&z.hp<z.max){fr('rgba(0,0,0,.6)',x-12,y-50,24,3);fr('#c8322d',x-12,y-50,24*z.hp/z.max,3);}
}
function drawPickupsAndMarks(t){
 if(!combatOn()||!S.loot||!S.loot[S.area])return;const L=S.loot[S.area];
 L.bats.forEach(b=>{if(b.got)return;const x=(b.x+.5)*TS,y=(b.y+.5)*TS;ctx.save();ctx.translate(x,y);ctx.rotate(-.5+h2(b.x,b.y));
  fr('rgba(0,0,0,.4)',-10,2,22,3);ctx.fillStyle=b.sp?'#8a4a44':'#a39e94';ctx.beginPath();ctx.moveTo(-11,-1.2);ctx.lineTo(4,-2.4);ctx.lineTo(11,-2.6);ctx.lineTo(11,2.6);ctx.lineTo(4,2.4);ctx.lineTo(-11,1.2);ctx.closePath();ctx.fill();
  fr('#1e1e1e',-11,-1.3,5,2.6);if(b.sp){fr('#c8322d',-2,-2.4,2,4.8);}ctx.restore();});
 L.items.forEach(it=>{const x=(it.x+.5)*TS,y=(it.y+.5)*TS;if(it.got)return;fr('rgba(0,0,0,.35)',x-6,y+3,12,3);
  if(it.k==='energy'){fr('#3a3a3a',x-6,y-3,12,6);fr('#d8b13a',x-6,y-3,3,6);fr('#e7e3da',x-1,y-1.6,5,1);}
  else if(it.k==='bandage'){ctx.fillStyle='#e7e3da';ctx.beginPath();ctx.arc(x,y,4.6,0,Math.PI*2);ctx.fill();ctx.fillStyle='#b9b5ac';ctx.beginPath();ctx.arc(x,y,1.8,0,Math.PI*2);ctx.fill();fr('#e7e3da',x,y-4.6,8,3);}
  else{fr('#f2efe8',x-7,y-5,14,10);fr('#c8322d',x-1.4,y-3.6,2.8,7.2);fr('#c8322d',x-3.6,y-1.4,7.2,2.8);fr('#8a8780',x-2,y-6.4,4,1.6);}});
}
function drawMarksOverlay(t){
 if(!combatOn())return;
 if((S.area==='factory'||S.area==='lab')){ctx.save();ctx.globalAlpha=.55;const pipes=S.area==='factory'?[[3,23.4,8,0],[3,26.6,8,0],[9.4,13,0,10]]:[[3,6.4,30,0],[3,8.6,30,0],[33.6,6,0,24]];
  pipes.forEach(p=>{const x=p[0]*TS,y=p[1]*TS;if(p[2]){fr('#141515',x,y-3,p[2]*TS,6);fr('#3a3d3d',x,y-3,p[2]*TS,1.4);for(let i=0;i<p[2];i+=2)fr('#2a2c2c',x+i*TS,y-4,4,8);}else{fr('#141515',x-3,y,6,p[3]*TS);fr('#3a3d3d',x-3,y,1.4,p[3]*TS);}});ctx.restore();}
 ZMARK.forEach(mk=>{const p=1-mk.t/3,pul=.5+.5*Math.sin(t*14),x=mk.x,y=mk.y;
  if(mk.kind==='door'||mk.kind==='window'){const wx=(mk.sx+.5)*TS,wy=mk.sy*TS;ctx.fillStyle='rgba(200,50,45,'+(.25+.35*pul)+')';ctx.fillRect(wx-9,wy+6,18,18);ctx.strokeStyle='rgba(224,96,90,.9)';ctx.lineWidth=1.2;ctx.strokeRect(wx-9.5,wy+5.5,19,19);
   if(mk.kind==='window'){ctx.beginPath();ctx.moveTo(wx-6,wy+8);ctx.lineTo(wx+1,wy+15);ctx.lineTo(wx+6,wy+9);ctx.moveTo(wx+1,wy+15);ctx.lineTo(wx-2,wy+22);ctx.stroke();}}
  if(mk.kind==='pipe'){for(let i=0;i<5;i++){const ph=(t*.8+i*.2)%1;ctx.fillStyle='rgba(225,228,225,'+(.35*(1-ph))+')';ctx.beginPath();ctx.arc(x+Math.sin(i*2+t*2)*6,y-40+ph*34,4+ph*8,0,Math.PI*2);ctx.fill();}
   fr('#141515',x-16,y-46,32,6);fr('#5a5d5d',x-3,y-48,6,10);}
  ctx.strokeStyle='rgba(224,96,90,'+(.5+.5*pul)+')';ctx.lineWidth=2;ctx.beginPath();ctx.ellipse(x,y,11+p*4,4.5+p*1.6,0,0,Math.PI*2);ctx.stroke();
  ctx.fillStyle='#e0605a';ctx.font='bold 10px "Nanum Gothic Coding",monospace';ctx.textAlign='center';ctx.fillText(Math.ceil(mk.t)+'',x,y-6);ctx.textAlign='left';});
 FLOATS.forEach(f=>{ctx.globalAlpha=Math.max(0,1-f.t);ctx.fillStyle=f.col;ctx.font='bold 10px "Nanum Gothic Coding",monospace';ctx.textAlign='center';ctx.fillText(f.txt,f.x,f.y-f.t*16);ctx.textAlign='left';ctx.globalAlpha=1;});
}
function drawHeldBat(){
 const sx=P.x,sy=P.y-16;
 if(chargeT>=0){const k=Math.min(1,chargeT/CHARGE_T),full=k>=1;ctx.strokeStyle=full?'rgba(224,96,90,'+(.7+.3*Math.sin(NOW*30))+')':'rgba(242,239,232,.7)';ctx.lineWidth=2;ctx.beginPath();ctx.arc(P.x,P.y-12,20,-Math.PI/2,-Math.PI/2+k*Math.PI*2);ctx.stroke();
  if(full){ctx.strokeStyle='rgba(224,96,90,.35)';ctx.lineWidth=5;ctx.beginPath();ctx.arc(P.x,P.y-12,20,0,Math.PI*2);ctx.stroke();}}
 const b=curBat();if(!b)return;let a=P.lookA;
 if(swingT>0){const k=1-swingT/SWING,R2=swingCharged?30:24,sp=swingCharged?1.6:1.3;a=P.lookA-sp+k*sp*2;ctx.strokeStyle=swingCharged?'rgba(224,96,90,'+(.7*(1-k))+')':'rgba(242,239,232,'+(.5*(1-k))+')';ctx.lineWidth=swingCharged?5:3;ctx.beginPath();ctx.arc(sx,sy,R2,P.lookA-sp,a);ctx.stroke();}
 else if(chargeT>=0)a=P.lookA-1.7+(chargeT>=CHARGE_T?Math.sin(NOW*40)*.06:0);
 else a=P.lookA+.9;
 ctx.save();ctx.translate(sx+Math.cos(a)*6,sy+Math.sin(a)*6);ctx.rotate(a);
 ctx.fillStyle=b.sp?'#8a4a44':'#b3ada2';ctx.beginPath();ctx.moveTo(0,-1.3);ctx.lineTo(12,-2.4);ctx.lineTo(20,-2.8);ctx.lineTo(20,2.8);ctx.lineTo(12,2.4);ctx.lineTo(0,1.3);ctx.closePath();ctx.fill();
 fr('#1e1e1e',-1,-1.4,5,2.8);if(b.sp)fr('#c8322d',8,-2.2,2,4.4);ctx.restore();
}
/* ---- 1인칭용 이미지 ---- */
const ZFC={};
function zombieFrame(v,f){const k=v+'_'+f;if(ZFC[k])return ZFC[k];const c=document.createElement('canvas');c.width=96;c.height=132;const g=c.getContext('2d');g.scale(3,3);g.translate(16,40);
 const shirt=['#5c5a55','#4a4f4c','#56504a'][v],pants=['#2c2c2c','#30302a','#262a2c'][v];
 g.fillStyle=pants;g.fillRect(-5,-11,4.4,11);g.fillRect(.8,-11,4.4,11);g.fillStyle=shirt;g.fillRect(-7.5,-25,15,15);g.fillStyle='rgba(0,0,0,.3)';g.fillRect(-7.5,-12,15,2);
 g.fillStyle=shirt;g.fillRect(-10.5,-23,3.2,9);g.fillRect(7.3,-23,3.2,9);g.fillStyle='#8a8a84';g.fillRect(-10.8,-15,3.6,2.6);g.fillRect(7.2,-15,3.6,2.6);g.fillStyle='#5a2a26';g.fillRect(2,-20,2.4,3);
 g.fillStyle='#9a9790';g.fillRect(-5,-36,10,10.5);g.fillStyle='#2a2a2a';g.fillRect(-5.4,-37,10.8,3.4);
 for(let i=0;i<5;i++)for(let j=0;j<4;j++){const vv=(h2(i+f*31,j+v*17)*255)|0;g.fillStyle='rgb('+vv+','+vv+','+vv+')';g.fillRect(-4.2+i*1.7,-34+j*1.9,1.7,1.9);}
 g.fillStyle='rgba(200,50,45,.55)';g.fillRect(-4.2,-34+(f%4)*1.9,8.5,.6);
 return ZFC[k]=c;}
const PKC={};
function pickupCanvas(k){if(PKC[k])return PKC[k];const c=document.createElement('canvas');c.width=96;c.height=48;const g=c.getContext('2d');g.scale(3,3);
 if(k==='bat'||k==='batsp'){g.translate(16,10);g.rotate(-.2);g.fillStyle=k==='batsp'?'#8a4a44':'#b3ada2';g.beginPath();g.moveTo(-13,-1.4);g.lineTo(5,-2.8);g.lineTo(13,-3.2);g.lineTo(13,3.2);g.lineTo(5,2.8);g.lineTo(-13,1.4);g.closePath();g.fill();g.fillStyle='#1e1e1e';g.fillRect(-13,-1.5,6,3);if(k==='batsp'){g.fillStyle='#c8322d';g.fillRect(-2,-2.8,2.4,5.6);}}
 else if(k==='energy'){g.fillStyle='#3a3a3a';g.fillRect(9,4,14,8);g.fillStyle='#d8b13a';g.fillRect(9,4,4,8);}
 else if(k==='bandage'){g.fillStyle='#e7e3da';g.beginPath();g.arc(16,8,5.5,0,Math.PI*2);g.fill();g.fillStyle='#b9b5ac';g.beginPath();g.arc(16,8,2,0,Math.PI*2);g.fill();}
 else{g.fillStyle='#f2efe8';g.fillRect(8,3,16,11);g.fillStyle='#c8322d';g.fillRect(14.5,4.5,3,8);g.fillRect(12,7,8,3);}
 return PKC[k]=c;}
const MKC=document.createElement('canvas');MKC.width=96;MKC.height=96;
function markCanvas(t,kind){const g=MKC.getContext('2d');g.setTransform(1,0,0,1,0,0);g.clearRect(0,0,96,96);g.scale(3,3);const pul=.5+.5*Math.sin(t*14);
 if(kind==='pipe'){for(let i=0;i<5;i++){const ph=(t*.8+i*.2)%1;g.fillStyle='rgba(225,228,225,'+(.4*(1-ph))+')';g.beginPath();g.arc(16+Math.sin(i*2+t*2)*5,4+ph*20,3+ph*6,0,Math.PI*2);g.fill();}}
 g.strokeStyle='rgba(224,96,90,'+(.5+.5*pul)+')';g.lineWidth=1.6;g.beginPath();g.ellipse(16,28,12,3.6,0,0,Math.PI*2);g.stroke();
 g.fillStyle='rgba(224,96,90,'+(.6+.4*pul)+')';g.font='bold 9px sans-serif';g.textAlign='center';g.fillText('!',16,22);return MKC;}
function fpCombatSprites(list){
 if(!combatOn())return;
 ZOMBIES.forEach(z=>{if(z.dead&&z.deadT>.35)return;const f=Math.floor(NOW*10+z.ph*3)%4;list.push({x:z.x/TS,y:(z.y-6)/TS,sp:[.95,.7,'#5c5a55',0],img:zombieFrame(z.v,f),src:[0,0,96,132],zb:z});});
 if(S.loot&&S.loot[S.area]){const L=S.loot[S.area];L.bats.forEach(b=>{if(!b.got)list.push({x:b.x+.5,y:b.y+.5,sp:[.16,.5,'#a39e94',0],img:pickupCanvas(b.sp?'batsp':'bat'),src:[0,0,96,48]});});
  L.items.forEach(it=>{if(!it.got)list.push({x:it.x+.5,y:it.y+.5,sp:[.16,.5,'#e7e3da',0],img:pickupCanvas(it.k),src:[0,0,96,48]});});}
 ZMARK.forEach(mk=>{const c=document.createElement('canvas');c.width=96;c.height=96;c.getContext('2d').drawImage(markCanvas(NOW,mk.kind),0,0);list.push({x:mk.x/TS,y:mk.y/TS,sp:[mk.kind==='pipe'?1:.5,.8,'#c8322d',0],img:c,src:[0,0,96,96]});});
}
function drawFPWeapon(){
 const b=curBat(),W=cv.width,H=cv.height,u=Math.min(W,H)/700;let a=-.35;
 if(swingT>0){const k=1-swingT/SWING;a=-.35-(swingCharged?2.0:1.6)*Math.sin(k*Math.PI);}
 else if(chargeT>=0){const k=Math.min(1,chargeT/CHARGE_T);a=-.35+.75*k+(k>=1?Math.sin(NOW*40)*.03:0);}
 ctx.save();ctx.translate(W*.78,H*1.02);ctx.rotate(a);
 if(b){ctx.fillStyle=b.sp?'#7a4440':'#a7a196';ctx.beginPath();ctx.moveTo(-14*u,0);ctx.lineTo(-24*u,-240*u);ctx.quadraticCurveTo(0,-300*u,24*u,-240*u);ctx.lineTo(14*u,0);ctx.closePath();ctx.fill();
  ctx.fillStyle='rgba(255,255,255,.12)';ctx.fillRect(-10*u,-250*u,6*u,230*u);ctx.fillStyle='#1c1c1c';ctx.fillRect(-15*u,-60*u,30*u,60*u);if(b.sp){ctx.fillStyle='#c8322d';ctx.fillRect(-20*u,-160*u,40*u,14*u);}}
 ctx.fillStyle='#d9d4ca';ctx.beginPath();ctx.ellipse(0,-30*u,38*u,26*u,0,0,Math.PI*2);ctx.fill();ctx.fillStyle='#bdb7ac';ctx.fillRect(-38*u,-30*u,76*u,10*u);
 ctx.restore();
 if(swingT>0){ctx.strokeStyle=swingCharged?'rgba(224,96,90,.45)':'rgba(242,239,232,.25)';ctx.lineWidth=(swingCharged?10:6)*u;ctx.beginPath();ctx.arc(W*.5,H*.9,H*.5,-2.2,-1.1);ctx.stroke();}
 if(chargeT>=0){const k=Math.min(1,chargeT/CHARGE_T);ctx.strokeStyle=k>=1?'rgba(224,96,90,.9)':'rgba(242,239,232,.75)';ctx.lineWidth=3*u;ctx.beginPath();ctx.arc(W/2,H/2,16*u*1.6,-Math.PI/2,-Math.PI/2+k*Math.PI*2);ctx.stroke();}
 FLOATS.forEach((f,i)=>{ctx.globalAlpha=Math.max(0,1-f.t);ctx.fillStyle=f.col;ctx.font='bold '+(18*u*1.6)+'px "Nanum Gothic Coding",monospace';ctx.textAlign='center';ctx.fillText(f.txt,W*.5,H*.42-f.t*40*u-i*4);ctx.textAlign='left';ctx.globalAlpha=1;});
}
/* ---- 조작 편집 (휴대폰) ---- */
const LAYOUT_IDS=['joyBase','btnAtk','btnAct','btnRun','btnSwap'];
let layoutSel=null;
function layoutKey(){return 'ruins-layout-'+(innerWidth>innerHeight?'l':'p');}
function loadLayout(){try{return JSON.parse(localStorage.getItem(layoutKey())||localStorage.getItem('ruins-layout')||'{}');}catch(e){return {};}}
function applyLayout(){const L=loadLayout();LAYOUT_IDS.forEach(id=>{const el=$(id);if(!el)return;const v=L[id];
 if(v){el.style.left=v.l+'px';el.style.top=v.t+'px';el.style.right='auto';el.style.bottom='auto';el.style.transform=(id==='joyBase'?'':'')+'scale('+(v.s||1)+')';el.style.transformOrigin='center';}
 else{el.style.left='';el.style.top='';el.style.right='';el.style.bottom='';el.style.transform='';}});
 const jb=$('joyBase'),jz=$('joyzone');const r=jb.getBoundingClientRect();if(L.joyBase){const s=Math.max(r.width,r.height)*2.4;jz.style.left=(r.left+r.width/2-s/2)+'px';jz.style.top=(r.top+r.height/2-s/2)+'px';jz.style.width=s+'px';jz.style.height=s+'px';jz.style.bottom='auto';}
 else{jz.style.left='';jz.style.top='';jz.style.width='';jz.style.height='';jz.style.bottom='';}}
function openLayoutEdit(){if(!started||dlg||arcOpen)return;layoutEditing=true;document.body.classList.add('editing');refreshBusy();$('layoutEdit').classList.remove('hidden');layoutSel=null;$('lyScale').value=100;$('lySel').textContent='움직일 버튼을 끌어 보세요';}
function closeLayoutEdit(saveIt){if(saveIt){const L={};LAYOUT_IDS.forEach(id=>{const el=$(id);if(el.style.left){const s=parseFloat((el.style.transform.match(/scale\(([\d.]+)\)/)||[0,1])[1]);L[id]={l:parseFloat(el.style.left),t:parseFloat(el.style.top),s};}});try{localStorage.setItem(layoutKey(),JSON.stringify(L));}catch(e){}}
 else applyLayout();layoutEditing=false;document.body.classList.remove('editing');$('layoutEdit').classList.add('hidden');applyLayout();refreshBusy();}
function initLayoutEdit(){
 LAYOUT_IDS.forEach(id=>{const el=$(id);if(!el)return;let drag=null;
  el.addEventListener('pointerdown',e=>{if(!layoutEditing)return;e.preventDefault();e.stopPropagation();const r=el.getBoundingClientRect();drag={dx:e.clientX-r.left,dy:e.clientY-r.top,id:e.pointerId};try{el.setPointerCapture(e.pointerId);}catch(_){}
   layoutSel=id;LAYOUT_IDS.forEach(k=>$(k)&&$(k).classList.toggle('lysel',k===id));const s=parseFloat((el.style.transform.match(/scale\(([\d.]+)\)/)||[0,1])[1]);$('lyScale').value=Math.round(s*100);$('lySel').textContent={joyBase:'조이스틱',btnAtk:'공격 버튼',btnAct:'조사 버튼',btnRun:'달리기 버튼',btnSwap:'무기 전환 버튼'}[id]+' 선택됨';},true);
  el.addEventListener('pointermove',e=>{if(!layoutEditing||!drag||e.pointerId!==drag.id)return;const s=parseFloat((el.style.transform.match(/scale\(([\d.]+)\)/)||[0,1])[1]);
   el.style.left=Math.max(0,Math.min(innerWidth-40,e.clientX-drag.dx))+'px';el.style.top=Math.max(0,Math.min(innerHeight-40,e.clientY-drag.dy))+'px';el.style.right='auto';el.style.bottom='auto';el.style.transform='scale('+s+')';},true);
  el.addEventListener('pointerup',()=>{drag=null;},true);});
 $('lyScale').addEventListener('input',()=>{if(!layoutSel)return;const el=$(layoutSel);const r=el.getBoundingClientRect();if(!el.style.left){el.style.left=r.left+'px';el.style.top=r.top+'px';el.style.right='auto';el.style.bottom='auto';}el.style.transform='scale('+($('lyScale').value/100)+')';});
 $('lyDone').onclick=()=>closeLayoutEdit(true);$('lyCancel').onclick=()=>closeLayoutEdit(false);
 $('lyReset').onclick=()=>{try{localStorage.removeItem(layoutKey());localStorage.removeItem('ruins-layout');}catch(e){}applyLayout();LAYOUT_IDS.forEach(k=>$(k)&&$(k).classList.remove('lysel'));layoutSel=null;};
 $('layoutBtn').onclick=openLayoutEdit;
 {const ba=$('btnAtk');ba.addEventListener('pointerdown',e=>{if(layoutEditing)return;e.preventDefault();try{ba.setPointerCapture(e.pointerId);}catch(_){}ba.classList.add('on');beginCharge();});
 ['pointerup','pointercancel'].forEach(ev=>ba.addEventListener(ev,e=>{if(layoutEditing)return;ba.classList.remove('on');if(ev==='pointerup')releaseCharge();else cancelCharge();}));}
 $('btnSwap').addEventListener('click',e=>{if(layoutEditing)return;e.preventDefault();swapBat();});
 ['energy','bandage','aid'].forEach(k=>$('it-'+k).addEventListener('click',e=>{e.stopPropagation();useItemKey(k);}));
 applyLayout();window.addEventListener('resize',()=>setTimeout(applyLayout,80));window.addEventListener('orientationchange',()=>setTimeout(applyLayout,300));
}

/* ================= RENDER ================= */
let DPR=1,Z=2,VW=0,VH=0,CAMX=0,CAMY=0;
let RS=1;
function resize(){
 DPR=Math.min(window.devicePixelRatio||1,isTouch?1.15:1.6)*RS;
 cv.width=Math.round(innerWidth*DPR);cv.height=Math.round(innerHeight*DPR);
 Z=Math.max(1.1,Math.min(3,Math.min(innerWidth/(15*TS),innerHeight/(10*TS))));
 VW=innerWidth/Z;VH=innerHeight/Z;
}
window.addEventListener('resize',resize);resize();
function h2(x,y){let n=(x*374761393+y*668265263)|0;n=Math.imul(n^(n>>>13),1274126177);return ((n^(n>>>16))>>>0)/4294967295;}
function hexA(h,a){const n=parseInt(h.slice(1),16);return 'rgba('+((n>>16)&255)+','+((n>>8)&255)+','+(n&255)+','+a+')';}
function fr(c,x,y,w,h){ctx.fillStyle=c;ctx.fillRect(x,y,w,h);}
function isWall(t){return t==='#'||t==='G'||t==='g'||t==='M'||t==='L'||t==='K'||t==='Q'||t==='J';}
let NOW=0;
const PAST=['#f4b6c2','#b9e4cf','#bfd0f6','#f6dfa8','#d8c6f1','#ffd1b3'];
function pastel(x,y){return PAST[Math.floor(h2(Math.floor(x/3)+7,Math.floor(y/3)+3)*PAST.length)%PAST.length];}
function drawHands(cx,cy,h,m,r){ctx.strokeStyle='#2a2a33';ctx.lineWidth=1.5;const ha=((h%12)+m/60)/12*Math.PI*2-Math.PI/2,ma=m/60*Math.PI*2-Math.PI/2;
 ctx.beginPath();ctx.moveTo(cx,cy);ctx.lineTo(cx+Math.cos(ha)*r*.55,cy+Math.sin(ha)*r*.55);ctx.moveTo(cx,cy);ctx.lineTo(cx+Math.cos(ma)*r*.85,cy+Math.sin(ma)*r*.85);ctx.stroke();}
function labHue(x,y){return 'hsla('+Math.round(195+55*Math.sin(NOW*.45+x*.35+y*.2))+',55%,72%,';}
function drawLabFloor(x,y,px,py,r){fr((x+y)%2?'#1c1e21':'#1a1c1f',px,py,TS,TS);fr('#16181b',px,py,TS,1);fr('#16181b',px,py,1,TS);if(r>.9)fr('#23262a',px+8,py+8,16,2);}
function drawMetal(x,y,px,py,r){
 const p=S.past;fr(p?'#6f7272':'#282a2a',px,py,TS,TS);ctx.fillStyle=p?'#636666':'#212323';
 for(let i=4;i<TS;i+=8){ctx.fillRect(px+i,py,1,TS);ctx.fillRect(px,py+i,TS,1);}
 if(!p&&r>.86)fr('#1c1d1d',px+Math.floor(r*18),py+10,8,5);
}

function drawGround(x,y,px,py,r){
 fr(r<.5?'#3a3a3a':'#383838',px,py,TS,TS);fr('#313131',px,py,TS,1);fr('#313131',px,py,1,TS);
 if(r>.82){ctx.strokeStyle='#2a2a2a';ctx.lineWidth=1;ctx.beginPath();ctx.moveTo(px+4,py+6+r*10);ctx.lineTo(px+14,py+14);ctx.lineTo(px+26,py+12+r*8);ctx.stroke();}
 if(r<.1)fr('#464646',px+10,py+18,3,2);
}
function drawRoad(x,y,px,py,r){
 fr('#252525',px,py,TS,TS);
 for(let i=0;i<3;i++)fr('#2d2d2d',px+Math.floor((r*97+i*37)%30),py+Math.floor((r*53+i*19)%30),2,2);
 const inX=x>=18&&x<=21,inY=y>=13&&y<=16;
 if(y===15&&!inX&&x%2===0)fr('#5c5b57',px+4,py-1,24,2);
 if(x===20&&!inY&&y%2===0)fr('#5c5b57',px-1,py+4,2,24);
}
function drawFloor(x,y,px,py,r){
 if(S.past){fr((x+y)%2?'#7a7a77':'#727270',px,py,TS,TS);fr('#6a6a67',px,py,TS,1);}
 else{fr((x+y)%2?'#2f2f2e':'#2b2b2a',px,py,TS,TS);if(r>.7)fr('#262625',px+Math.floor(r*20),py+Math.floor(r*13),6,3);if(r<.12)fr('#3a3a38',px+6,py+20,2,2);}
}
function rng(seed){let s=(seed>>>0)||1;return()=>{s=(Math.imul(s,1664525)+1013904223)>>>0;return s/4294967296;};}
function grayc(v){v=Math.max(0,Math.min(255,Math.round(v)));return 'rgb('+v+','+v+','+v+')';}
const RUBC={};
function rubbleCanvas(px,py,past){
 const key=S.area+':'+px+','+py+(past?'p':'');if(RUBC[key])return RUBC[key];
 const cv2=document.createElement('canvas');cv2.width=120;cv2.height=128;const g=cv2.getContext('2d');g.scale(2,2);
 const R=rng(Math.imul(px+7,73856093)^Math.imul(py+3,19349663));
 const OX=14,OY=28,L=past?1.55:1;
 const gr=(v,w)=>{v=Math.max(0,Math.min(255,v*L));const r=Math.round(v+(w||0)),gg=Math.round(v+(w||0)*.55),b=Math.round(v-(w||0)*.2);return 'rgb('+Math.min(255,r)+','+Math.min(255,gg)+','+Math.max(0,b)+')';};
 g.fillStyle='rgba(0,0,0,.34)';g.beginPath();g.ellipse(OX+16,OY+24,21,7.5,0,0,Math.PI*2);g.fill();
 const items=[];
 const add=(cx,cy,w,h,ang,th,base,warm)=>items.push({cx,cy,w,h,ang,th,base,warm});
 for(let i=0;i<5;i++)add(OX+3+i*6.5+(R()-.5)*4,OY+22+R()*5,11+R()*7,6+R()*4,(R()-.5)*.9,3+R()*2.5,72+R()*34,0);
 for(let i=0;i<3;i++)add(OX+8+i*8+(R()-.5)*4,OY+15+R()*4,9+R()*5,5.5+R()*3.5,(R()-.5)*1.3,3+R()*2,80+R()*34,0);
 for(let i=0;i<2;i++)add(OX+12+i*8+(R()-.5)*4,OY+8+R()*3,8+R()*4,5+R()*3,(R()-.5)*1.1,2.5+R()*2,88+R()*30,0);
 add(OX+16+(R()-.5)*4,OY+3+R()*2,9+R()*3,5+R()*2,(R()-.5)*.7,2.5+R(),95+R()*25,0);
 for(let i=0;i<5;i++)add(OX+4+R()*24,OY+6+R()*18,3+R()*3,2.5+R()*2,R()*3,1.5+R(),70+R()*25,14+R()*10);
 items.sort((a,b)=>a.cy-b.cy);
 const peb=[];for(let i=0;i<14;i++){const a=R()*Math.PI*2,rr=17+R()*9;peb.push([OX+16+Math.cos(a)*rr,OY+25+Math.abs(Math.sin(a))*rr*.38+R()*3,1+R()*1.6,58+R()*35,R()<.4?12:0]);}
 peb.forEach(p=>{g.fillStyle=gr(p[3]*.55,p[4]);g.beginPath();g.ellipse(p[0]+.5,p[1]+.6,p[2],p[2]*.7,0,0,Math.PI*2);g.fill();g.fillStyle=gr(p[3],p[4]);g.beginPath();g.ellipse(p[0],p[1],p[2],p[2]*.7,0,0,Math.PI*2);g.fill();});
 const path=pts=>{g.beginPath();g.moveTo(pts[0][0],pts[0][1]);for(let k=1;k<pts.length;k++)g.lineTo(pts[k][0],pts[k][1]);g.closePath();};
 items.forEach(it=>{
  const ca=Math.cos(it.ang),sa=Math.sin(it.ang),hw=it.w/2,hh=it.h/2;
  const cut=[.15+R()*.25,.1+R()*.2];
  const loc=[[-hw+hw*cut[0],-hh],[hw,-hh],[hw,hh-hh*cut[1]],[hw-hw*cut[1],hh],[-hw,hh],[-hw,-hh+hh*cut[0]]];
  const pts=loc.map(q=>[it.cx+q[0]*ca-q[1]*sa,it.cy+q[0]*sa+q[1]*ca]);
  const d=[(R()-.5)*2.4,-it.th];
  for(let k=0;k<pts.length;k++){const a=pts[k],b=pts[(k+1)%pts.length];const nx=b[1]-a[1],ny=-(b[0]-a[0]);
   const cx=(a[0]+b[0])/2-it.cx,cy=(a[1]+b[1])/2-it.cy;const out=(nx*cx+ny*cy)>0?1:-1;
   if((nx*out)*d[0]+(ny*out)*d[1]>0){const lit=ny*out<0?1.28:.82;g.fillStyle=gr(it.base*lit,it.warm);path([a,b,[b[0]+d[0],b[1]+d[1]],[a[0]+d[0],a[1]+d[1]]]);g.fill();}}
  const top=pts.map(q=>[q[0]+d[0],q[1]+d[1]]);
  g.fillStyle=gr(it.base*1.22,it.warm);path(top);g.fill();
  g.fillStyle=gr(it.base*.92,it.warm);path(pts);g.fill();
  g.save();path(pts);g.clip();
  for(let k=0;k<5;k++){g.fillStyle=gr(it.base*(.55+R()*.2),it.warm);g.fillRect(it.cx+(R()-.5)*it.w,it.cy+(R()-.5)*it.h,1,1);}
  if(R()<.6){g.fillStyle=gr(it.base*1.25,it.warm);g.globalAlpha=.5;g.beginPath();g.ellipse(it.cx+(R()-.5)*it.w*.5,it.cy+(R()-.5)*it.h*.4,it.w*.22,it.h*.18,it.ang,0,Math.PI*2);g.fill();g.globalAlpha=1;}
  if(R()<.6){g.strokeStyle=gr(it.base*.5,it.warm);g.lineWidth=.8;g.beginPath();const sx=it.cx+(R()-.5)*it.w*.6;g.moveTo(sx,it.cy-it.h*.5);g.lineTo(sx+(R()-.5)*3,it.cy);g.lineTo(sx+(R()-.5)*4,it.cy+it.h*.5);g.stroke();}
  g.restore();
  g.save();path(top);g.clip();for(let k=0;k<3;k++){g.fillStyle=gr(it.base*(.7+R()*.15),it.warm);g.fillRect(it.cx+d[0]+(R()-.5)*it.w,it.cy+d[1]+(R()-.5)*it.h,1,1);}g.restore();
  g.globalAlpha=.55;g.strokeStyle=gr(it.base*1.4,it.warm);g.lineWidth=.35;g.beginPath();for(let k=0;k<top.length;k++){const a2=top[k],b2=top[(k+1)%top.length];if((a2[1]+b2[1])/2<it.cy+d[1]){g.moveTo(a2[0],a2[1]);g.lineTo(b2[0],b2[1]);}}g.stroke();g.globalAlpha=1;
  g.globalAlpha=.35;g.strokeStyle=gr(it.base*.45,it.warm);g.lineWidth=.4;path(pts);g.stroke();g.globalAlpha=1;
 });
 return RUBC[key]=cv2;
}
function drawRubbleOn(px,py,r){ctx.imageSmoothingEnabled=true;ctx.drawImage(rubbleCanvas(px,py,S.past),px-14,py-28,60,64);ctx.imageSmoothingEnabled=false;}
/* ---------- 고화질 벽·건물 (타일별로 한 번 그려 캐시) ---------- */
const WALLC={},WSC=2;
function fillc(g,c,x,y,w,h){g.fillStyle=c;g.fillRect(x,y,w,h);}
function speck(g,R,x,y,w,h,n,base,vr){for(let i=0;i<n;i++){g.fillStyle=grayc(base+(R()-.5)*vr);const s2=R()<.8?.5:1;g.fillRect(x+R()*w,y+R()*h,s2,s2);}}
function crackL(g,R,x,y,len,col){g.strokeStyle=col;g.lineWidth=.45;g.beginPath();let cx=x,cy=y;g.moveTo(cx,cy);for(let i=0;i<4;i++){cx+=(R()-.5)*len*.5;cy+=len/4*(.6+R()*.6);g.lineTo(cx,cy);if(R()<.3){g.moveTo(cx,cy);g.lineTo(cx+(R()-.5)*6,cy+R()*4);g.moveTo(cx,cy);}}g.stroke();}
function streakG(g,x,y,w,h,a){const gr=g.createLinearGradient(0,y,0,y+h);gr.addColorStop(0,'rgba(0,0,0,'+a+')');gr.addColorStop(1,'rgba(0,0,0,0)');g.fillStyle=gr;g.fillRect(x,y,w,h);}
function wallCanvas(x,y,mode){
 const a=S.area,key=a+'|'+x+','+y+'|'+mode+(S.past?1:0)+(S.flags.power?1:0);
 if(WALLC[key])return WALLC[key];
 const c=document.createElement('canvas');c.width=c.height=32*WSC;const g=c.getContext('2d');g.scale(WSC,WSC);
 const R=rng(Math.imul(x+101,73856093)^Math.imul(y+57,19349663)^(mode==='upper'?0x5bd1e995:0));
 if(a==='city')paintCity(g,R,x,y,mode);else if(a==='school')paintSchool(g,R,x,y,mode);else if(a==='factory')paintFactory(g,R,x,y,mode);
 else if(a==='lab')paintLab(g,R,x,y,mode);else if(a==='nl')paintNL(g,R,x,y,mode);
 return WALLC[key]=c;
}
function cityWindow(g,R,wx,wy,ww,wh){
 fillc(g,'#3c3c3c',wx-1,wy-1,ww+2,wh+2);fillc(g,'#2a2a2a',wx-1,wy+wh,ww+2,1);
 const broken=R()<.33,boarded=!broken&&R()<.12;
 fillc(g,broken?'#080808':'#121416',wx,wy,ww,wh);
 if(boarded){for(let i=0;i<3;i++){fillc(g,grayc(52+R()*14),wx-.5,wy+1+i*(wh/3),ww+1,wh/3-1);}g.fillStyle='#1e1e1e';g.fillRect(wx+1,wy+2,.6,.6);g.fillRect(wx+ww-2,wy+wh-3,.6,.6);}
 else if(!broken){const gr=g.createLinearGradient(wx,wy,wx+ww,wy+wh);gr.addColorStop(0,'rgba(255,255,255,.09)');gr.addColorStop(.45,'rgba(255,255,255,.01)');gr.addColorStop(.55,'rgba(255,255,255,.05)');gr.addColorStop(1,'rgba(255,255,255,0)');g.fillStyle=gr;g.fillRect(wx,wy,ww,wh);
  fillc(g,'#2c2e30',wx+ww/2-.3,wy,.6,wh);fillc(g,'#2c2e30',wx,wy+wh*.42,ww,.6);if(R()<.35)fillc(g,'rgba(200,200,195,.06)',wx+1,wy+1,ww/2-1.5,wh*.42-1.5);}
 else{g.fillStyle='rgba(150,155,160,.32)';g.beginPath();g.moveTo(wx,wy);g.lineTo(wx+ww*.55,wy);g.lineTo(wx+ww*.12,wy+wh*.6);g.closePath();g.fill();g.beginPath();g.moveTo(wx+ww,wy+wh);g.lineTo(wx+ww*.5,wy+wh);g.lineTo(wx+ww,wy+wh*.35);g.closePath();g.fill();
  fillc(g,'rgba(150,155,160,.25)',wx+ww*.6,wy+.5,.5,wh*.3);}
 fillc(g,'#474747',wx-1.6,wy+wh+1,ww+3.2,1.1);fillc(g,'rgba(0,0,0,.4)',wx-1.6,wy+wh+2.1,ww+3.2,.6);
 streakG(g,wx+ww*.2,wy+wh+2.4,ww*.6,6+R()*5,.32);
}
function paintCity(g,R,x,y,mode){
 const W=t=>t==='#'||t==='G'||t==='g';
 if(mode==='roof'){
  fillc(g,'#1c1c1c',0,0,32,32);speck(g,R,0,0,32,32,90,30,14);
  if(R()<.3){g.fillStyle='rgba(0,0,0,.28)';g.beginPath();g.ellipse(6+R()*20,6+R()*20,4+R()*6,3+R()*4,R()*3,0,Math.PI*2);g.fill();}
  if(R()<.3)crackL(g,R,R()*32,R()*10,16,'rgba(0,0,0,.5)');
  const up=!W(tile(x,y-1)),lf=!W(tile(x-1,y)),rt=!W(tile(x+1,y));
  if(up){fillc(g,'#2f2f2f',0,0,32,3);fillc(g,'#3b3b3b',0,0,32,.8);fillc(g,'rgba(0,0,0,.35)',0,3,32,2);}
  if(lf){fillc(g,'#2b2b2b',0,0,3,32);fillc(g,'#373737',0,0,.8,32);fillc(g,'rgba(0,0,0,.3)',3,0,2,32);}
  if(rt){fillc(g,'#262626',29,0,3,32);fillc(g,'rgba(0,0,0,.3)',27,0,2,32);}
  const interior=!up&&!lf&&!rt,f=R();
  if(interior&&f<.16){const ax=5+R()*12,ay=5+R()*12;fillc(g,'rgba(0,0,0,.4)',ax+1.5,ay+2,11,9);fillc(g,'#363636',ax,ay,11,8);fillc(g,'#2a2a2a',ax,ay+6,11,2);fillc(g,'#404040',ax,ay,11,.7);
   g.strokeStyle='#1e1e1e';g.lineWidth=.6;g.beginPath();g.arc(ax+5.5,ay+3.4,2.6,0,Math.PI*2);g.stroke();g.beginPath();g.moveTo(ax+3,ay+3.4);g.lineTo(ax+8,ay+3.4);g.moveTo(ax+5.5,ay+1);g.lineTo(ax+5.5,ay+5.8);g.stroke();}
  else if(interior&&f<.24){const cx=10+R()*12,cy=10+R()*12;g.fillStyle='rgba(0,0,0,.38)';g.beginPath();g.ellipse(cx+1.5,cy+2,7,6,0,0,Math.PI*2);g.fill();
   g.fillStyle='#303030';g.beginPath();g.arc(cx,cy,6,0,Math.PI*2);g.fill();g.strokeStyle='#3d3d3d';g.lineWidth=.6;g.beginPath();g.arc(cx,cy,4,0,Math.PI*2);g.stroke();fillc(g,'#262626',cx-.6,cy-.6,1.2,1.2);}
  else if(interior&&f<.36){const cx=6+R()*20,cy=6+R()*20;fillc(g,'rgba(0,0,0,.35)',cx+.5,cy+1.5,4,4);fillc(g,'#353535',cx-1,cy-1,4,4);fillc(g,'#1e1e1e',cx,cy,2,2);}
  if(R()<.45)for(let i=0;i<4;i++)fillc(g,grayc(42+R()*22),R()*30,R()*30,.6+R(),.6+R()*.6);
  return;
 }
 const base=['#2f2f2f','#2b2b2c','#323131','#2d2c2b'][Math.floor(R()*4)];
 fillc(g,base,0,0,32,32);speck(g,R,0,0,32,32,110,46,16);
 if(R()<.3){for(let yy=0;yy<32;yy+=2.2)for(let xx=(yy/2.2)%2?0:2;xx<32;xx+=4)fillc(g,'rgba(0,0,0,.07)',xx,yy,3.6,.4);}
 if(mode==='face'){fillc(g,'#393939',0,0,32,2.2);fillc(g,'#444',0,0,32,.6);fillc(g,'rgba(0,0,0,.35)',0,2.2,32,1);}
 fillc(g,'#262626',0,19.2,32,1.3);fillc(g,'#3b3b3b',0,18.7,32,.6);
 cityWindow(g,R,4,5,9,11);cityWindow(g,R,19,5,9,11);
 if(mode==='upper'){cityWindow(g,R,4,22.5,9,8);cityWindow(g,R,19,22.5,9,8);}
 else{
  const k=R();
  if(k<.36){fillc(g,'#272727',2,21,28,11);for(let yy=22;yy<32;yy+=1.4)fillc(g,'#1b1b1b',2,yy,28,.45);fillc(g,'#363636',2,21,28,.9);fillc(g,'#303030',1.5,21,1,11);fillc(g,'#303030',29.5,21,1,11);
   if(R()<.55){g.fillStyle='rgba(0,0,0,.45)';g.beginPath();g.ellipse(6+R()*20,26+R()*3,3+R()*2,1.5+R(),0,0,Math.PI*2);g.fill();}}
  else if(k<.54){fillc(g,'#3a3a3a',10,20.6,12,11.4);fillc(g,'#141414',11,21.5,10,10.5);fillc(g,'#1c1c1c',11.6,22.2,4.2,9.8);fillc(g,'#1c1c1c',16.2,22.2,4.2,9.8);fillc(g,'#4c4c4c',15.4,26,.8,1.4);fillc(g,'#3e3e3e',8,31,16,1);}
  else if(k<.8){fillc(g,'#383838',2,21,28,10);fillc(g,'#101214',3,22,26,8);const gr=g.createLinearGradient(3,22,29,30);gr.addColorStop(0,'rgba(255,255,255,.07)');gr.addColorStop(1,'rgba(255,255,255,0)');g.fillStyle=gr;g.fillRect(3,22,26,8);
   fillc(g,'#2b2b2b',15.6,22,.8,8);if(R()<.5){g.fillStyle='rgba(150,155,160,.28)';g.beginPath();g.moveTo(17,22);g.lineTo(23,22);g.lineTo(19,27);g.fill();}}
  else speck(g,R,0,20,32,12,30,36,12);
  if(R()<.22){fillc(g,'#1b1b1b',3,16.8,26,4.2);fillc(g,'#2a2a2a',3,16.8,26,.6);for(let i=0;i<3;i++)fillc(g,'#2e2e2e',6+i*7,18.2,5,1.3);}
  fillc(g,'#1a1a1a',0,31,32,1);
 }
 if(R()<.4)crackL(g,R,R()*32,R()*8,22,'rgba(0,0,0,.55)');
 if(R()<.3)streakG(g,R()*28,0,2+R()*3,18,.25);
 if(!W(tile(x-1,y)))fillc(g,'rgba(255,255,255,.05)',0,0,1.4,32);
 if(!W(tile(x+1,y)))fillc(g,'rgba(0,0,0,.28)',30,0,2,32);
}
function paintSchool(g,R,x,y,mode){
 const past=S.past;
 if(mode==='roof'){fillc(g,past?'#3b3b39':'#121212',0,0,32,32);speck(g,R,0,0,32,32,25,past?66:24,8);
  const fl=t=>!isWall(t);const ec=past?'#55554f':'#1f1f1f';
  if(fl(tile(x,y-1)))fillc(g,ec,0,0,32,1.5);if(fl(tile(x-1,y)))fillc(g,ec,0,0,1.5,32);if(fl(tile(x+1,y)))fillc(g,ec,30.5,0,1.5,32);return;}
 const up=past?'#9a9a96':'#373735',lo=past?'#80807c':'#2a2b2a';
 fillc(g,up,0,0,32,18);speck(g,R,0,0,32,18,60,past?150:54,past?14:10);
 fillc(g,lo,0,18,32,9);speck(g,R,0,18,32,9,26,past?124:41,8);
 for(let xx=0;xx<32;xx+=8)fillc(g,past?'rgba(0,0,0,.06)':'rgba(0,0,0,.18)',xx,18.4,.5,8.6);
 fillc(g,past?'#b2b2ad':'#424240',0,17.3,32,1.1);fillc(g,'rgba(0,0,0,.25)',0,18.4,32,.8);
 fillc(g,past?'#5d5d5a':'#1c1c1b',0,27,32,5);fillc(g,past?'#6e6e6a':'#272726',0,27,32,.8);
 fillc(g,past?'#acaca7':'#3b3b39',0,0,32,1.4);
 const k=R();
 if(k<.18){fillc(g,past?'#6a5f50':'#2a2724',5,4,22,11);fillc(g,past?'#8a7b66':'#33302c',6,5,20,9);
  for(let i=0;i<4;i++){fillc(g,past?['#e8e4dc','#d8d4cc','#f0ece4'][i%3]:grayc(68+R()*30),7+R()*14,5.5+R()*5,4+R()*2,3+R()*2);}
  fillc(g,past?'#c8322d':'#3a3a3a',8+R()*12,5.5,.9,.9);}
 else if(k<.4){fillc(g,past?'#c8c8c4':'#464646',4,3,24,8.4);fillc(g,past?'#dbe6ef':'#131517',5,4,22,6.4);fillc(g,past?'#c8c8c4':'#464646',15.7,4,.6,6.4);
  const gr=g.createLinearGradient(5,4,27,10);gr.addColorStop(0,'rgba(255,255,255,'+(past?.35:.07)+')');gr.addColorStop(1,'rgba(255,255,255,0)');g.fillStyle=gr;g.fillRect(5,4,22,6.4);
  if(!past&&R()<.5){g.fillStyle='rgba(150,155,160,.3)';g.beginPath();g.moveTo(17,4);g.lineTo(24,4);g.lineTo(19,9);g.fill();}}
 else if(k<.5){fillc(g,past?'#7a7a76':'#2e2e2e',22,7,6,9);fillc(g,past?'#9a9a96':'#3c3c3c',22,7,6,1);fillc(g,past?'#c8322d':'#3a3a3a',23.5,9,3,4);}
 if(!past){
  if(R()<.45){g.fillStyle='rgba(255,255,255,.07)';g.beginPath();const a0=R()*24,b0=R()*12;g.moveTo(a0,b0);for(let i=0;i<7;i++)g.lineTo(a0+R()*9,b0+R()*7);g.closePath();g.fill();}
  if(R()<.5)streakG(g,R()*26,0,4+R()*5,14+R()*8,.38);
  if(R()<.4)crackL(g,R,R()*32,R()*6,20,'rgba(0,0,0,.55)');
  if(R()<.25)for(let i=0;i<5;i++)fillc(g,'rgba(0,0,0,.25)',R()*30,20+R()*6,1.4,.5);
 } else if(R()<.35){fillc(g,['#f4b6c2','#bfd0f6','#f6dfa8'][Math.floor(R()*3)],6+R()*16,4+R()*5,6,8);fillc(g,'#ffffff',7+R()*2,6+R()*2,3,1);}
 if(past&&y===11){g.strokeStyle='#555';g.lineWidth=.4;g.beginPath();g.moveTo(0,1.5);g.quadraticCurveTo(16,4,32,1.5);g.stroke();for(let i=0;i<4;i++){g.fillStyle=i%2?'#d9d9d4':'#6a6a67';g.beginPath();g.moveTo(i*8+1,1.8+(i===1||i===2?1.2:0));g.lineTo(i*8+7,1.8+(i===1||i===2?1.2:0));g.lineTo(i*8+4,7.5);g.fill();}}
 const op=t=>!isWall(t);
 if(op(tile(x-1,y))){fillc(g,past?'#6a6a66':'#202020',0,3,2.6,29);fillc(g,past?'#8a8a86':'#2c2c2c',2.6,3,.6,29);}
 if(op(tile(x+1,y))){fillc(g,past?'#6a6a66':'#202020',29.4,3,2.6,29);fillc(g,past?'#8a8a86':'#2c2c2c',28.8,3,.6,29);}
}
function paintFactory(g,R,x,y,mode){
 const past=S.past,pw=S.flags.power;
 if(mode==='roof'){fillc(g,past?'#3a3d3d':'#0f1010',0,0,32,32);g.strokeStyle=past?'#4a4d4d':'#181a1a';g.lineWidth=1.4;g.beginPath();g.moveTo(0,16);g.lineTo(32,16);g.moveTo(16,0);g.lineTo(16,32);g.stroke();
  speck(g,R,0,0,32,32,20,past?70:22,8);const fl=t=>!isWall(t);const ec=past?'#5a5d5d':'#1d2020';
  if(fl(tile(x,y-1)))fillc(g,ec,0,0,32,1.5);if(fl(tile(x-1,y)))fillc(g,ec,0,0,1.5,32);if(fl(tile(x+1,y)))fillc(g,ec,30.5,0,1.5,32);return;}
 const b1=past?'#7d8080':'#282a2a',b2=past?'#6f7272':'#202222',hl=past?'#8f9292':'#313434';
 for(let i=0;i<32;i+=4){fillc(g,b1,i,0,2,26);fillc(g,b2,i+2,0,2,26);fillc(g,hl,i,0,.6,26);fillc(g,'rgba(0,0,0,.25)',i+3.5,0,.5,26);}
 fillc(g,past?'#5f6262':'#191b1b',0,12,32,1.1);for(let i=2;i<32;i+=6){fillc(g,past?'#9a9d9d':'#3b3e3e',i,11.4,.9,.9);fillc(g,past?'#9a9d9d':'#3b3e3e',i,1,.9,.9);}
 if(!past)for(let i=0;i<3;i++)if(R()<.55){const rx=R()*28,ry=R()<.5?1:12.5;const gr=g.createLinearGradient(0,ry,0,ry+14);gr.addColorStop(0,'rgba(78,62,48,.5)');gr.addColorStop(1,'rgba(78,62,48,0)');g.fillStyle=gr;g.fillRect(rx,ry,1.5+R()*3,14);}
 if(!past&&R()<.25){g.fillStyle='rgba(0,0,0,.35)';g.beginPath();g.ellipse(6+R()*20,8+R()*10,3+R()*3,2+R()*2,0,0,Math.PI*2);g.fill();}
 if(R()<.4){fillc(g,past?'#6a6d6d':'#1e2020',0,5,32,4);fillc(g,past?'#8a8d8d':'#303434',0,5,32,1);fillc(g,'rgba(0,0,0,.35)',0,9,32,1);fillc(g,past?'#555':'#141515',6,4,2,6);fillc(g,past?'#555':'#141515',24,4,2,6);}
 const hz=past?'#b3b3a6':(pw?'#7a661e':'#3b3414');
 fillc(g,'#141414',0,26,32,6);
 for(let i=-6;i<32;i+=8){g.fillStyle=hz;g.beginPath();g.moveTo(i,32);g.lineTo(i+6,26);g.lineTo(i+10,26);g.lineTo(i+4,32);g.fill();}
 fillc(g,'#0c0c0c',0,25.5,32,.8);fillc(g,past?'#9a9d9d':'#3a3d3d',0,25.2,32,.4);
 speck(g,R,0,0,32,25,45,past?140:44,12);
}
function paintLab(g,R,x,y,mode){
 if(mode==='roof'){fillc(g,'#0b0c0e',0,0,32,32);g.strokeStyle='#15171b';g.lineWidth=.8;g.beginPath();g.moveTo(0,8+R()*16);g.bezierCurveTo(10,R()*32,20,R()*32,32,8+R()*16);g.stroke();
  const fl=t=>!isWall(t);if(fl(tile(x,y-1)))fillc(g,'#1c1f24',0,0,32,1.5);if(fl(tile(x-1,y)))fillc(g,'#1c1f24',0,0,1.5,32);if(fl(tile(x+1,y)))fillc(g,'#1c1f24',30.5,0,1.5,32);return;}
 fillc(g,'#22252a',0,0,32,32);speck(g,R,0,0,32,27,40,40,8);
 fillc(g,'#2a2e34',0,0,32,1.4);
 [[0,1.4,16,7.6],[16,1.4,16,7.6],[0,9,16,17],[16,9,16,17]].forEach(q=>{fillc(g,'#1a1c20',q[0],q[1],q[2],.6);fillc(g,'#1a1c20',q[0],q[1],.6,q[3]);fillc(g,'#2c3036',q[0]+.6,q[1]+.6,q[2]-.6,.4);
  [[1.6,1.6],[q[2]-2.2,1.6],[1.6,q[3]-2.2],[q[2]-2.2,q[3]-2.2]].forEach(o=>fillc(g,'#3a3f46',q[0]+o[0],q[1]+o[1],.7,.7));});
 const k=R();
 if(k<.22){fillc(g,'#15171b',7,14,18,8);for(let i=0;i<5;i++)fillc(g,'#2b2f35',8,15+i*1.4,16,.5);}
 else if(k<.36){fillc(g,'#0b0f15',20,12,8,6);fillc(g,'#1d3346',21,13,6,4);fillc(g,'#4a7a9a',21.5,13.6,3,.5);fillc(g,'#4a7a9a',21.5,15,4,.5);}
 else if(k<.46){fillc(g,'#2a2e33',4,13,10,3);fillc(g,'#c8322d',5,14,.9,.9);fillc(g,'#5c8a4a',7,14,.9,.9);}
 fillc(g,'#15171a',0,27,32,5);fillc(g,'#2b2f35',0,27,32,.6);
}
function paintNL(g,R,x,y,mode){
 const c0=pastel(x,y);
 if(mode==='roof'){fillc(g,c0,0,0,32,32);fillc(g,'rgba(0,0,0,.12)',0,0,32,32);
  g.strokeStyle='rgba(255,255,255,.25)';g.lineWidth=.6;for(let yy=2;yy<34;yy+=4){g.beginPath();for(let xx=((yy/4)%2)*3-3;xx<34;xx+=6){g.moveTo(xx,yy);g.arc(xx+3,yy,3,Math.PI,0,true);}g.stroke();}
  const B=t=>t==='B';if(!B(tile(x,y-1)))fillc(g,'rgba(255,255,255,.45)',0,0,32,2);if(!B(tile(x-1,y)))fillc(g,'rgba(255,255,255,.35)',0,0,2,32);if(!B(tile(x+1,y)))fillc(g,'rgba(0,0,0,.08)',30,0,2,32);return;}
 fillc(g,c0,0,0,32,32);
 for(let yy=0;yy<32;yy+=3){fillc(g,'rgba(255,255,255,.16)',0,yy,32,.5);fillc(g,'rgba(0,0,0,.05)',0,yy+.5,32,.4);}
 fillc(g,'rgba(255,255,255,.6)',0,0,32,2.2);fillc(g,'rgba(0,0,0,.08)',0,2.2,32,.8);
 const win=(wx,wy,ww,wh)=>{
  if(R()<.22){const sc=PAST[Math.floor(R()*PAST.length)];for(let i=0;i<5;i++){fillc(g,i%2?'#ffffff':sc,wx-2+i*(ww+4)/5,wy-3.5,(ww+4)/5,2.4);}fillc(g,'rgba(0,0,0,.08)',wx-2,wy-1.1,ww+4,.6);}
  fillc(g,'#ffffff',wx-1.2,wy-1.2,ww+2.4,wh+2.4);
  const gr=g.createLinearGradient(wx,wy,wx+ww,wy+wh);gr.addColorStop(0,'#e8f3ff');gr.addColorStop(.5,'#bcd6f2');gr.addColorStop(1,'#a9c6e8');g.fillStyle=gr;g.fillRect(wx,wy,ww,wh);
  fillc(g,'rgba(255,255,255,.6)',wx+1,wy+1,ww*.35,.6);fillc(g,'#ffffff',wx+ww/2-.35,wy,.7,wh);fillc(g,'#ffffff',wx,wy+wh*.45,ww,.7);
  fillc(g,'#ffffff',wx-1.8,wy+wh+1,ww+3.6,1.2);
  if(R()<.35){fillc(g,'#f2ece2',wx-.5,wy+wh+2.2,ww+1,2.2);for(let i=0;i<5;i++){g.fillStyle=PAST[Math.floor(R()*PAST.length)];g.beginPath();g.arc(wx+.8+i*(ww/4.6),wy+wh+2,1.1,0,Math.PI*2);g.fill();}g.fillStyle='#8fcfb3';g.fillRect(wx,wy+wh+2,ww,.5);}
 };
 win(4.5,6,8.5,10);win(19,6,8.5,10);
 if(mode==='upper'){win(4.5,21,8.5,8);win(19,21,8.5,8);}
 else{fillc(g,'rgba(0,0,0,.1)',0,28,32,4);fillc(g,'rgba(255,255,255,.5)',0,27.6,32,.6);if(R()<.3){fillc(g,'#ffffff',12,20,8,8);fillc(g,'#8fa9d6',13,21,6,7);fillc(g,'#ffffff',17.6,24.5,.8,.8);}}
 const B=t=>t==='B';if(!B(tile(x-1,y)))fillc(g,'rgba(255,255,255,.35)',0,0,1.4,32);if(!B(tile(x+1,y)))fillc(g,'rgba(0,0,0,.1)',30.6,0,1.4,32);
}
function blitWall(x,y,px,py,mode){ctx.imageSmoothingEnabled=true;ctx.drawImage(wallCanvas(x,y,mode),px,py,TS,TS);ctx.imageSmoothingEnabled=false;}
function drawWallTile(x,y,px,py,r){
 const face=!isWall(tile(x,y+1));
 blitWall(x,y,px,py,face?'face':'roof');
 if(S.area==='lab'&&face)fr(labHue(x,y)+'.45)',px,py+11,TS,1.6);
}
/* ================= 고화질 타일·오브젝트 (한 번 그려 캐시) ================= */
function rr(g,x,y,w,h,r){g.beginPath();g.moveTo(x+r,y);g.arcTo(x+w,y,x+w,y+h,r);g.arcTo(x+w,y+h,x,y+h,r);g.arcTo(x,y+h,x,y,r);g.arcTo(x,y,x+w,y,r);g.closePath();}
function lg(g,x0,y0,x1,y1,st){const gr=g.createLinearGradient(x0,y0,x1,y1);st.forEach(q=>gr.addColorStop(q[0],q[1]));return gr;}
function rg(g,x,y,r0,r1,st){const gr=g.createRadialGradient(x,y,r0,x,y,r1);st.forEach(q=>gr.addColorStop(q[0],q[1]));return gr;}
function shE(g,cx,cy,rx,ry,a){g.fillStyle='rgba(0,0,0,'+(a===undefined?.4:a)+')';g.beginPath();g.ellipse(cx,cy,rx,ry,0,0,Math.PI*2);g.fill();}
function ln(g,c,w,pts){g.strokeStyle=c;g.lineWidth=w;g.beginPath();g.moveTo(pts[0][0],pts[0][1]);for(let i=1;i<pts.length;i++)g.lineTo(pts[i][0],pts[i][1]);g.stroke();}
function tx(g,s,x,y,size,col,al){g.font='bold '+size+'px "Noto Serif KR",sans-serif';g.fillStyle=col;g.textAlign=al||'center';g.fillText(s,x,y);g.textAlign='left';}
function glassFill(g,x,y,w,h,a){g.fillStyle=lg(g,x,y,x+w,y+h,[[0,'rgba(255,255,255,'+(.16*a)+')'],[.35,'rgba(255,255,255,'+(.02*a)+')'],[.5,'rgba(255,255,255,'+(.1*a)+')'],[.62,'rgba(255,255,255,'+(.02*a)+')'],[1,'rgba(255,255,255,0)']]);g.fillRect(x,y,w,h);}
function bolt(g,x,y,c){g.fillStyle=c;g.beginPath();g.arc(x,y,.55,0,Math.PI*2);g.fill();}

const TILEC={},OBJC={},OSC=2;
function portalDraw(g,cx,cy,on,T,mini){
 const sc=mini?.55:1;g.save();g.translate(cx,cy);g.scale(sc,sc);
 if(on){g.fillStyle=rg(g,0,22,2,34,[[0,'rgba(240,244,255,.42)'],[1,'rgba(240,244,255,0)']]);g.beginPath();g.ellipse(0,22,34,8,0,0,Math.PI*2);g.fill();}
 if(!mini){g.fillStyle=lg(g,0,14,0,24,[[0,'#2a2c30'],[1,'#141518']]);g.beginPath();g.moveTo(-15,14);g.lineTo(15,14);g.lineTo(22,23);g.lineTo(-22,23);g.closePath();g.fill();
  fillc(g,'#3a3d42',-15,14,30,.8);ln(g,'#0c0d0f',1.1,[[-18,22],[-26,24],[-34,23]]);ln(g,'#0c0d0f',1.1,[[18,22],[27,25],[36,24]]);
  for(let i=0;i<5;i++)fillc(g,on&&Math.sin(T*3+i)>0?'rgba(200,220,255,.9)':'#2a2c30',-8+i*4,18,2,1);}
 if(on){g.fillStyle=rg(g,0,0,2,30,[[0,'rgba(255,255,255,.75)'],[.5,'rgba(235,240,252,.25)'],[1,'rgba(235,240,252,0)']]);g.beginPath();g.arc(0,0,30,0,Math.PI*2);g.fill();}
 else{g.fillStyle='#07080a';g.beginPath();g.ellipse(0,0,15.5,17.5,0,0,Math.PI*2);g.fill();}
 const rim=g.createLinearGradient(-20,-20,20,20);rim.addColorStop(0,on?'#a9adb6':'#62666d');rim.addColorStop(.5,on?'#6c7079':'#3a3d42');rim.addColorStop(1,on?'#3e4148':'#1e2024');
 g.strokeStyle=rim;g.lineWidth=4.6;g.beginPath();g.ellipse(0,0,18,20,0,0,Math.PI*2);g.stroke();
 g.strokeStyle=on?'rgba(255,255,255,.55)':'rgba(255,255,255,.12)';g.lineWidth=.6;g.beginPath();g.ellipse(0,0,16,18,0,0,Math.PI*2);g.stroke();
 g.strokeStyle='rgba(0,0,0,.5)';g.lineWidth=.6;g.beginPath();g.ellipse(0,0,20.3,22.3,0,0,Math.PI*2);g.stroke();
 for(let i=0;i<8;i++){const a=i/8*Math.PI*2;g.save();g.translate(Math.cos(a)*18,Math.sin(a)*20);g.rotate(a);fillc(g,'#2a2c30',-1.6,-2.2,3.2,4.4);fillc(g,on?'#8a8e96':'#4a4d52',-1.6,-2.2,3.2,.6);g.restore();}
 if(on){
  const w=6.5+1.4*Math.sin(T*1.7),h=15.5;
  g.fillStyle=rg(g,0,0,0,16,[[0,'rgba(255,255,255,1)'],[.6,'rgba(242,246,255,.9)'],[1,'rgba(225,232,250,.7)']]);
  g.beginPath();g.moveTo(0,-h);g.quadraticCurveTo(w,0,0,h);g.quadraticCurveTo(-w,0,0,-h);g.fill();
  const hue=Math.round(200+40*Math.sin(T*.35));g.strokeStyle='hsla('+hue+',38%,86%,.7)';g.lineWidth=.7;g.beginPath();g.moveTo(0,-h);g.quadraticCurveTo(w+1.2,0,0,h);g.stroke();
  g.strokeStyle='hsla('+(hue+120)+',30%,88%,.55)';g.beginPath();g.moveTo(0,-h);g.quadraticCurveTo(-w-1.2,0,0,h);g.stroke();
  for(let i=0;i<3;i++){const xx=(i-1)*w*.35+Math.sin(T*2+i)*.6;g.strokeStyle='rgba(255,255,255,'+(.25+.25*Math.sin(T*3+i*2))+')';g.lineWidth=.4;g.beginPath();g.moveTo(xx,-h*.8);g.lineTo(xx*.6,h*.8);g.stroke();}
  for(let i=0;i<26;i++){const ph=(T*.22+i/26)%1,a=i*2.39996+T*.25,rr2=(1-ph)*30;const x=Math.cos(a)*rr2*1.05,y=Math.sin(a)*rr2*.9;
   g.fillStyle='rgba(255,255,255,'+(Math.min(1,ph*(1-ph)*3.4)).toFixed(2)+')';const sz=.5+ph*.9;g.fillRect(x-sz/2,y-sz/2,sz,sz);}
 } else {for(let i=0;i<6;i++){const ph=(T*.05+i/6)%1;g.fillStyle='rgba(200,206,220,'+(.25*Math.sin(ph*Math.PI)).toFixed(2)+')';g.fillRect(Math.sin(i*2.1+T*.3)*9,8-ph*18,.8,.8);}
  fillc(g,Math.sin(T*1.3)>.6?'rgba(200,210,230,.6)':'#2a2c30',-1,-22.4,2,1);}
 g.restore();
}
const PORTCV=document.createElement('canvas');PORTCV.width=160;PORTCV.height=150;let PORTT=-1;
const DYNC={};
function dynFrame(t){let d=DYNC[t];if(!d){const c=document.createElement('canvas');c.width=160;c.height=150;d=DYNC[t]={c,t:-1};}
 if(d.t!==NOW){d.t=NOW;const g=d.c.getContext('2d');g.setTransform(1,0,0,1,0,0);g.clearRect(0,0,160,150);g.scale(2,2);const cx=40,cy=38;
  if(t==='retgate')portalDraw(g,cx,cy,true,NOW,true);
  else{const big=t==='core',R0=big?34:22,orb=big?9:5;
   g.fillStyle=rg(g,cx,cy,0,R0,[[0,'rgba(255,255,255,.85)'],[.4,'rgba(236,242,255,.35)'],[1,'rgba(236,242,255,0)']]);g.fillRect(0,0,80,75);
   for(let k=0;k<(big?4:2);k++){g.strokeStyle='hsla('+Math.round(200+k*40+NOW*10)%360+',30%,86%,.5)';g.lineWidth=.8;g.beginPath();g.ellipse(cx,cy,orb*2.2+k*3,orb*.9+k,NOW*(k%2?.5:-.4)+k,0,Math.PI*2);g.stroke();}
   g.fillStyle=rg(g,cx-orb*.3,cy-orb*.3,0,orb,[[0,'#ffffff'],[1,'#e6ecfa']]);g.beginPath();g.arc(cx,cy,orb,0,Math.PI*2);g.fill();
   if(!big){fillc(g,'#2a2c2e',cx-8,cy+14,16,5);fillc(g,'#3a3d40',cx-8,cy+14,16,.6);}}}
 return d.c;}
function portalFrame(){if(PORTT!==NOW){PORTT=NOW;const g=PORTCV.getContext('2d');g.setTransform(1,0,0,1,0,0);g.clearRect(0,0,160,150);g.scale(2,2);portalDraw(g,40,38,S.flags.preserved,NOW,false);}return PORTCV;}
const TP={};
function tileCanvas(t,x,y){
 const tall=t==='T',key=S.area+'|'+t+'|'+x+','+y+'|'+(S.past?1:0);
 if(TILEC[key])return TILEC[key];
 const c=document.createElement('canvas');c.width=32*WSC;c.height=(tall?64:32)*WSC;const g=c.getContext('2d');g.scale(WSC,WSC);if(tall)g.translate(0,32);
 const R=rng(Math.imul(x+31,2246822519)^Math.imul(y+17,3266489917)^(t.charCodeAt(0)*977));
 TP[t](g,R,x,y);
 return TILEC[key]={cv:c,oy:tall?-32:0};
}
function blitTile(t,x,y,px,py){const tc=tileCanvas(t,x,y);ctx.imageSmoothingEnabled=true;ctx.drawImage(tc.cv,px,py+tc.oy,TS,tc.cv.height/WSC);ctx.imageSmoothingEnabled=false;}

/* ---- 도시 보도 ---- */
TP[',']=(g,R,x,y)=>{
 for(let sy=0;sy<2;sy++)for(let sx=0;sx<2;sx++){const v=54+R()*8,X=sx*16,Y=sy*16;fillc(g,grayc(v),X,Y,16,16);
  fillc(g,grayc(v+8),X,Y,16,.6);fillc(g,grayc(v+5),X,Y,.6,16);fillc(g,grayc(v-13),X,Y+15.4,16,.6);fillc(g,grayc(v-10),X+15.4,Y,.6,16);
  if(R()<.22)crackL(g,R,X+2+R()*12,Y+1,13,'rgba(0,0,0,.45)');
  if(R()<.13){g.fillStyle='rgba(0,0,0,.17)';g.beginPath();g.ellipse(X+8,Y+8,4+R()*3,3+R()*2,R()*3,0,Math.PI*2);g.fill();}
  if(R()<.08){g.fillStyle=grayc(v-15);g.beginPath();g.moveTo(X+.6,Y+.6);g.lineTo(X+5+R()*4,Y+.6);g.lineTo(X+.6,Y+4+R()*4);g.fill();}
 }
 speck(g,R,0,0,32,32,150,58,22);
 if(R()<.28){const wx=R()<.5?16:R()*32,wy=R()<.5?16:R()*32;for(let i=0;i<6;i++)ln(g,grayc(34+R()*10),.5,[[wx+(R()-.5)*2,wy],[wx+(R()-.5)*5,wy-1.5-R()*3.5]]);}
 if(R()<.07){g.save();g.translate(4+R()*24,4+R()*24);g.rotate(R()*3);fillc(g,'#8a8780',-2.6,-1.9,5.2,3.8);fillc(g,'#6e6b65',-2,-.6,4,.35);fillc(g,'#6e6b65',-2,.4,3,.35);g.restore();}
 if(R()<.05){g.save();g.translate(4+R()*24,4+R()*24);g.rotate(R()*3);fillc(g,'#5a5a58',-1.6,-.5,3.2,1);fillc(g,'#9a9690',1.2,-.5,.6,1);g.restore();}
 const rd=t=>t==='.'||t==='c'||t==='G'||t==='g';
 if(rd(tile(x,y+1))){fillc(g,'#4c4c4c',0,28.6,32,2.4);fillc(g,'#5a5a5a',0,28.6,32,.6);fillc(g,'#181818',0,31,32,1);}
 if(rd(tile(x,y-1))){fillc(g,'#181818',0,0,32,1);fillc(g,'#4c4c4c',0,1,32,2.2);fillc(g,'#2e2e2e',0,2.8,32,.4);}
 if(rd(tile(x-1,y))){fillc(g,'#181818',0,0,1,32);fillc(g,'#4a4a4a',1,0,2.2,32);}
 if(rd(tile(x+1,y))){fillc(g,'#4a4a4a',28.8,0,2.2,32);fillc(g,'#181818',31,0,1,32);}
};
/* ---- 아스팔트 도로 ---- */
TP['.']=(g,R,x,y)=>{
 fillc(g,'#262626',0,0,32,32);
 for(let i=0;i<300;i++){const v=R();g.fillStyle=v<.5?grayc(31+R()*8):v<.85?grayc(20+R()*6):grayc(46+R()*14);const s2=R()<.85?.5:1;g.fillRect(R()*32,R()*32,s2,s2);}
 if(R()<.14){g.fillStyle=rg(g,16,16,0,8,[[0,'rgba(0,0,0,.3)'],[1,'rgba(0,0,0,0)']]);g.save();g.translate(R()*16-8,R()*16-8);g.fillRect(0,0,32,32);g.restore();}
 if(R()<.3)for(let k=0;k<2;k++)crackL(g,R,R()*32,R()*20,18,'rgba(0,0,0,.6)');
 if(R()<.07){const cx=8+R()*16,cy=8+R()*16;g.fillStyle='#141414';g.beginPath();g.ellipse(cx,cy,4+R()*2,3,0,0,Math.PI*2);g.fill();
  g.strokeStyle='#363636';g.lineWidth=.6;g.beginPath();g.ellipse(cx-.3,cy-.3,4.6,3.4,0,Math.PI*1.05,Math.PI*1.95);g.stroke();for(let i=0;i<7;i++)fillc(g,grayc(48+R()*22),cx+(R()-.5)*8,cy+(R()-.5)*6,.6,.6);}
 const paint=(x0,y0,w,h)=>{for(let i=0;i<w;i+=.7)for(let j=0;j<h;j+=.7)if(R()<.76)fillc(g,grayc(86+R()*22),x0+i,y0+j,.7,.7);};
 if(S.area==='city'){const inX=x>=18&&x<=21,inY=y>=13&&y<=16;
  if(!inX&&x%2===0){if(y===15)paint(4,0,24,.8);if(y===14)paint(4,31.2,24,.8);}
  if(!inY&&y%2===0){if(x===20)paint(0,4,.8,24);if(x===19)paint(31.2,4,.8,24);}
  if(inX&&(y===12||y===17)||inY&&(x===17||x===22)){}
 }
};
/* ---- 버려진 자동차 ---- */
TP['c']=(g,R,x,y)=>{TP['.'](g,R,x,y);};
/* ---- 죽은 나무 ---- */
TP['T']=(g,R,x,y)=>{TP[','](g,R,x,y);
 shE(g,17,27,10.5,3.2,.42);
 for(let i=0;i<12;i++){g.fillStyle=grayc(34+R()*20);g.beginPath();g.ellipse(3+R()*26,21+R()*10,1.3,.6,R()*3,0,Math.PI*2);g.fill();}
 g.lineCap='round';
 for(let i=0;i<5;i++){const a=(i-2)*.55;ln(g,'#111',1.5-Math.abs(i-2)*.2,[[16+(i-2)*.8,26.5],[16+Math.sin(a)*4,27.6],[16+Math.sin(a)*8+(R()-.5)*2,28.6+R()]]);}
 g.lineCap='butt';paintTree(g,treeR(x,y));
};
function paintTree(g,R){g.lineCap='round';
 const br=(x0,y0,a,l,w,d)=>{const x1=x0+Math.cos(a)*l,y1=y0+Math.sin(a)*l;g.strokeStyle=d>2?'#141414':d>1?'#191919':'#202020';g.lineWidth=w;g.beginPath();g.moveTo(x0,y0);g.quadraticCurveTo((x0+x1)/2+(R()-.5)*2.2,(y0+y1)/2+(R()-.5),x1,y1);g.stroke();
  if(d<=0||l<1.6)return;const n=2+(R()<.35?1:0);for(let i=0;i<n;i++)br(x1,y1,a+(R()-.5)*1.1+(i-(n-1)/2)*.55,l*(.6+R()*.16),w*.62,d-1);};
 g.fillStyle=lg(g,12.5,0,19.5,0,[[0,'#2c2c2b'],[.4,'#1d1d1c'],[1,'#0d0d0d']]);
 g.beginPath();g.moveTo(12.6,27.4);g.quadraticCurveTo(14.6,15,15,3);g.lineTo(17.4,3);g.quadraticCurveTo(17.8,15,19.8,27.4);g.closePath();g.fill();
 for(let i=0;i<7;i++){const yy=6+i*3.3+R()*2;ln(g,'rgba(0,0,0,.55)',.3,[[14.6+R(),yy],[15.6+R()*1.5,yy+1.6]]);}
 ln(g,'rgba(255,255,255,.05)',.5,[[14.2,26],[15.2,6]]);
 if(R()<.5){g.fillStyle='#0c0c0c';g.beginPath();g.ellipse(16.4,15+R()*6,.8,1.2,0,0,Math.PI*2);g.fill();}
 br(16.2,5,-Math.PI/2+(R()-.5)*.35,8,2.3,4);br(15.8,11,-Math.PI/2-.95-R()*.3,7.5,1.7,3);br(16.6,9,-Math.PI/2+.95+R()*.3,7.5,1.7,3);
 if(R()<.6)br(16,16,-Math.PI/2+(R()<.5?-1.3:1.3),5,1.1,2);
 g.lineCap='butt';
}

/* ---- 학교 바닥 ---- */
TP['f']=(g,R,x,y)=>{const p=S.past;
 for(let sy=0;sy<2;sy++)for(let sx=0;sx<2;sx++){const odd=(x*2+sx+y*2+sy)%2,X=sx*16,Y=sy*16,v=p?(odd?123:114):(odd?48:44);fillc(g,grayc(v+(R()-.5)*3),X,Y,16,16);
  fillc(g,grayc(v-(p?15:10)),X,Y+15.6,16,.4);fillc(g,grayc(v-(p?15:10)),X+15.6,Y,.4,16);fillc(g,grayc(v+(p?8:4)),X,Y,16,.3);
  if(p){g.fillStyle='rgba(255,255,255,.08)';g.fillRect(X+1.5,Y+1.5,7,1.6);}
  else if(R()<.12){g.fillStyle=grayc(v-11);g.beginPath();g.moveTo(X+16,Y+16);g.lineTo(X+16-(3+R()*4),Y+16);g.lineTo(X+16,Y+16-(3+R()*4));g.fill();}
 }
 if(!p){speck(g,R,0,0,32,32,80,50,18);
  if(R()<.35){g.strokeStyle='rgba(255,255,255,.06)';g.lineWidth=.8;g.beginPath();const a=R()*3;g.arc(R()*32,R()*32,4+R()*6,a,a+1.5);g.stroke();}
  if(R()<.3){g.fillStyle='rgba(255,255,255,.05)';g.beginPath();g.ellipse(R()*32,R()*32,5+R()*5,3+R()*3,R()*3,0,Math.PI*2);g.fill();}
  if(R()<.13){g.save();g.translate(4+R()*24,4+R()*24);g.rotate(R()*3);fillc(g,'#8a877f',-3,-2.2,6,4.6);for(let i=0;i<3;i++)fillc(g,'#6a675f',-2.2,-1.2+i*1.1,4,.3);g.restore();}
  if(R()<.2)for(let i=0;i<4;i++)fillc(g,grayc(58+R()*22),R()*30,R()*30,.8,.7);
  if(R()<.06){g.strokeStyle='#5a5a58';g.lineWidth=.6;g.beginPath();g.moveTo(6+R()*20,6+R()*20);g.lineTo(10+R()*14,10+R()*14);g.stroke();}
 }
 const Wl=t=>isWall(t);
 if(Wl(tile(x-1,y))){g.fillStyle=lg(g,0,0,4,0,[[0,'rgba(0,0,0,'+(p?.15:.32)+')'],[1,'rgba(0,0,0,0)']]);g.fillRect(0,0,4,32);}
 if(Wl(tile(x+1,y))){g.fillStyle=lg(g,32,0,28,0,[[0,'rgba(0,0,0,'+(p?.15:.32)+')'],[1,'rgba(0,0,0,0)']]);g.fillRect(28,0,4,32);}
};
/* ---- 책상과 의자 ---- */
TP['d']=(g,R,x,y)=>{TP['f'](g,R,x,y);const p=S.past;
 const tilt=!p&&R()<.35?(R()-.5)*.5:0,fallen=!p&&R()<.15;
 g.save();g.translate(16,16);g.rotate(tilt);g.translate(-16,-16);
 shE(g,16,24,12.5,3.6,p?.2:.42);
 if(!fallen){const cc=p?'#5e5e5b':'#1c1c1c';fillc(g,cc,9.4,22,1,6.5);fillc(g,cc,21.6,22,1,6.5);
  g.fillStyle=p?'#8f8f8a':'#393937';rr(g,9,20.6,14,4.2,1);g.fill();fillc(g,p?'#a7a7a2':'#454543',9,20.6,14,.6);
  g.fillStyle=p?'#a3a39e':'#424240';rr(g,9.5,25.6,13,3.2,1);g.fill();}
 else{g.save();g.translate(24,26);g.rotate(1.2);g.fillStyle='#2f2f2d';rr(g,-6,-2,12,3.5,1);g.fill();fillc(g,'#1c1c1c',-5,1.5,1,5);fillc(g,'#1c1c1c',4,1.5,1,5);g.restore();}
 const lc=p?'#6e6e6a':'#232323';fillc(g,lc,6,18,1.2,6.5);fillc(g,lc,24.8,18,1.2,6.5);fillc(g,lc,6,22.8,20,.8);
 g.fillStyle=p?'#b5b2a9':'#4a4844';rr(g,5,7,22,12,1.2);g.fill();
 g.fillStyle=lg(g,0,7,0,19,[[0,p?'#d0ccc2':'#5b5954'],[1,p?'#a9a69d':'#42403c']]);rr(g,5.4,7.4,21.2,10.4,1);g.fill();
 for(let i=0;i<5;i++){g.strokeStyle=p?'rgba(130,118,100,.32)':'rgba(0,0,0,.24)';g.lineWidth=.28;g.beginPath();const yy=8.6+i*1.9+R()*.6;g.moveTo(5.8,yy);g.bezierCurveTo(12,yy-1,20,yy+1,26.2,yy);g.stroke();}
 fillc(g,p?'#8f8c84':'#2c2b28',5,17.6,22,1.4);fillc(g,p?'#77746c':'#1e1d1b',8,18.6,16,1.2);
 if(p&&R()<.55){fillc(g,'#ece8e0',8+R()*8,9,6,4.4);fillc(g,'#cfcbc2',8+R()*8,9.8,6,.3);fillc(g,'#bfd0f6',19+R()*3,10,3.5,1);}
 if(!p){speck(g,R,6,8,20,9,24,92,16);if(R()<.4){g.save();g.translate(10+R()*10,11.5);g.rotate(R()*3);fillc(g,'#7a776f',-2.5,-2,5,4);g.restore();}
  if(R()<.3)crackL(g,R,8+R()*16,8,8,'rgba(0,0,0,.4)');}
 g.restore();
};
/* ---- 공장 바닥 (체크 철판) ---- */
TP['Z']=(g,R,x,y)=>{const lZ=tile(x-1,y)==='Z',rZ=tile(x+1,y)==='Z';
 fillc(g,'#050606',0,0,32,32);
 for(let i=0;i<8;i++){const y0=1.4+i*3.85,v=Math.max(7,68-i*8.4);fillc(g,grayc(v),0,y0,32,3.1);fillc(g,grayc(v+16),0,y0,32,.5);fillc(g,grayc(Math.max(3,v-28)),0,y0+2.7,32,.5);
  if(i<3)for(let k=0;k<32;k+=4)fillc(g,i===0?'#8a7420':'rgba(138,116,32,'+(.55-i*.2).toFixed(2)+')',k,y0,2,.5);
  if(i<5)speck(g,R,0,y0,32,3,8,v+6,10);}
 g.fillStyle=lg(g,0,16,0,32,[[0,'rgba(170,200,230,0)'],[1,'rgba(170,200,230,.16)']]);g.fillRect(0,16,32,16);
 for(let k=0;k<32;k+=4){fillc(g,'#d8b13a',k,0,2,1.3);fillc(g,'#141414',k+2,0,2,1.3);}
 if(!lZ){fillc(g,'#2a2c2c',0,0,3.2,32);fillc(g,'#4a4d4d',0,0,.8,32);ln(g,'#8a8d8d',.8,[[2.6,0],[2.6,32]]);for(let i=1;i<32;i+=6)fillc(g,'#5a5d5d',1.9,i,1.4,1.4);}
 if(!rZ){fillc(g,'#1e2020',28.8,0,3.2,32);ln(g,'#7a7d7d',.8,[[29.4,0],[29.4,32]]);for(let i=1;i<32;i+=6)fillc(g,'#4a4d4d',28.8,i,1.4,1.4);}
};
TP['U']=(g,R,x,y)=>{const lU=tile(x-1,y)==='U',rU=tile(x+1,y)==='U';
 fillc(g,'#101114',0,0,32,32);
 for(let i=0;i<8;i++){const y0=28-i*3.85,v=Math.min(110,34+i*8.5);fillc(g,grayc(v),0,y0,32,3.3);fillc(g,grayc(v+14),0,y0,32,.5);fillc(g,grayc(v-18),0,y0+3,32,.6);
  for(let k=0;k<32;k+=8)fillc(g,'rgba(140,170,255,.18)',k+2,y0+.2,3,.3);}
 g.fillStyle=lg(g,0,0,0,14,[[0,'rgba(216,200,160,.18)'],[1,'rgba(216,200,160,0)']]);g.fillRect(0,0,32,14);
 if(!lU){fillc(g,'#1e2126',0,0,3,32);ln(g,'#6a7078',.8,[[2.4,0],[2.4,32]]);}if(!rU){fillc(g,'#16181c',29,0,3,32);ln(g,'#5a6068',.8,[[29.6,0],[29.6,32]]);}
};
function steelDoor(g,R,o){fillc(g,'#141516',0,0,32,32);g.fillStyle=lg(g,2,0,30,0,[[0,o.l||'#3a3d42'],[1,o.d||'#25272b']]);g.fillRect(2,1,28,31);
 fillc(g,'#4c4f54',2,1,28,.7);fillc(g,'#16181b',15.6,1,.8,31);for(let i=0;i<5;i++){bolt(g,4,4+i*6,'#5c5f64');bolt(g,28,4+i*6,'#5c5f64');}
 if(o.seam){g.fillStyle=lg(g,14,0,18,0,[[0,'rgba(234,242,255,0)'],[.5,'rgba(234,242,255,.85)'],[1,'rgba(234,242,255,0)']]);g.fillRect(13.6,3,4.8,27);}
 if(o.plate){fillc(g,o.plateC||'#d9d6cf',7,5,18,6.4);fillc(g,'rgba(0,0,0,.25)',7,11.4,18,.5);tx(g,o.plate,16,9.6,o.ps||3,o.plateT||'#2a2a2a');}
 if(o.pad){fillc(g,'#101010',21,15,5.6,8);fillc(g,o.padC||'#c8322d',22,16,3.6,1.2);for(let i=0;i<2;i++)for(let j=0;j<3;j++)fillc(g,'#4a4a4a',21.8+i*2.2,18+j*1.6,1.4,1);}
 else{fillc(g,'#1a1a1a',22,16,4,5);fillc(g,o.padC||'#c8322d',23,17,2,1.2);}
 speck(g,R,2,1,28,31,40,56,16);}
function openDoor(g,R,o){fillc(g,'#060707',0,0,32,32);g.fillStyle=lg(g,0,0,0,32,[[0,'rgba('+o.glow+',.03)'],[1,'rgba('+o.glow+',.2)']]);g.fillRect(3,0,26,32);
 fillc(g,o.jamb||'#3a3d42',0,0,3,32);fillc(g,o.jamb||'#3a3d42',29,0,3,32);fillc(g,'rgba(255,255,255,.12)',2.4,0,.6,32);fillc(g,'#2a2c30',3,0,3.6,32);fillc(g,'#3c3f44',3,0,.6,32);}
TP['L']=(g,R,x,y)=>steelDoor(g,R,{seam:1,plate:'NURI 제3구역',ps:2.4,padC:'#c8322d'});
TP['l']=(g,R,x,y)=>openDoor(g,R,{glow:'234,242,255'});
TP['Q']=(g,R,x,y)=>steelDoor(g,R,{plate:'비상 통로',ps:2.6,pad:1,padC:'#c8322d',l:'#34383d',d:'#202226'});
TP['q']=(g,R,x,y)=>openDoor(g,R,{glow:'200,50,45',jamb:'#5a2422'});
TP['J']=(g,R,x,y)=>steelDoor(g,R,{seam:1,plate:'폐쇄 실험실',ps:2.6,l:'#30343a',d:'#1e2024'});
TP['j']=(g,R,x,y)=>openDoor(g,R,{glow:'143,166,200',jamb:'#4a5568'});
TP['K']=(g,R,x,y)=>{fillc(g,'#141516',0,0,32,32);g.fillStyle=lg(g,2,0,30,0,[[0,'#3c3f42'],[1,'#26282b']]);g.fillRect(2,1,28,31);
 fillc(g,'#4c4f52',2,1,28,.7);fillc(g,'#1a1c1e',15.6,1,.8,31);fillc(g,'#4c4f52',16.4,1,.3,31);
 for(let i=0;i<5;i++){bolt(g,4,4+i*6,'#5c5f62');bolt(g,28,4+i*6,'#5c5f62');}
 fillc(g,'#d8b13a',8,5,16,8);fillc(g,'#141414',8,5,16,.6);tx(g,'B3',16,11.2,5.4,'#141414');
 for(let k=2;k<30;k+=4){fillc(g,'#7a661e',k,27,2,3);fillc(g,'#141414',k+2,27,2,3);}
 fillc(g,'#1a1a1a',21.6,16,4.4,6.4);fillc(g,'#c8322d',22.8,17,2,1.2);fillc(g,'#5a5d60',22.6,19.4,2.4,1.6);
 speck(g,R,2,1,28,31,50,58,16);g.fillStyle=lg(g,0,22,0,32,[[0,'rgba(80,64,50,0)'],[1,'rgba(80,64,50,.35)']]);g.fillRect(2,22,28,10);};
TP['k']=(g,R,x,y)=>{fillc(g,'#060707',0,0,32,32);g.fillStyle=lg(g,0,0,0,32,[[0,'rgba(170,200,230,.03)'],[1,'rgba(170,200,230,.16)']]);g.fillRect(3,0,26,32);
 for(const xx of [0,29]){fillc(g,'#d8b13a',xx,0,3,32);for(let k=2;k<32;k+=8)fillc(g,'#141414',xx,k,3,3);}
 fillc(g,'#2a2c2e',3,0,4,32);fillc(g,'#3c3f42',3,0,.6,32);fillc(g,'#0e0f10',7,0,.8,32);};
TP['m']=(g,R,x,y)=>{const p=S.past,b=p?112:40;
 fillc(g,grayc(b),0,0,32,32);
 for(let yy=0;yy<32;yy+=4)for(let xx=((yy/4)%2)*2;xx<32;xx+=4){g.save();g.translate(xx+1,yy+1.5);g.rotate(((xx+yy)/2)%2?.62:-.62);fillc(g,grayc(b+13),-1.4,-.35,2.8,.7);fillc(g,grayc(b-11),-1.4,.35,2.8,.3);g.restore();}
 fillc(g,grayc(b-15),0,31.4,32,.6);fillc(g,grayc(b-15),31.4,0,.6,32);fillc(g,grayc(b+9),0,0,32,.4);fillc(g,grayc(b+6),0,0,.4,32);
 [[1.6,1.6],[30.4,1.6],[1.6,30.4],[30.4,30.4]].forEach(q=>{bolt(g,q[0],q[1],grayc(b+20));fillc(g,grayc(b-18),q[0]-.1,q[1]+.3,.6,.25);});
 if(!p){if(R()<.32){g.fillStyle=rg(g,16,16,0,7,[[0,'rgba(0,0,0,.38)'],[1,'rgba(0,0,0,0)']]);g.save();g.translate(R()*16-8,R()*16-8);g.fillRect(0,0,32,32);g.restore();}
  if(R()<.25){g.fillStyle='rgba(80,64,50,.25)';g.beginPath();g.ellipse(R()*32,R()*32,3+R()*4,2+R()*3,0,0,Math.PI*2);g.fill();}
  speck(g,R,0,0,32,32,60,38,14);}
};
TP['v']=(g,R,x,y)=>{TP['m'](g,R,x,y);const p=S.past;
 g.fillStyle=rg(g,16,16,4,14,[[0,'rgba(0,0,0,0)'],[1,p?'rgba(0,0,0,0)':'rgba(30,26,22,.35)']]);g.fillRect(0,0,32,32);
 fillc(g,'#0a0b0b',5.5,8.5,21,15);fillc(g,'#3a3d3d',5.5,8.5,21,.6);fillc(g,'#1e2020',5.5,23,21,.6);
 for(let i=0;i<6;i++){fillc(g,p?'#5a5d5d':'#2f3232',6.5,9.6+i*2.3,19,1);fillc(g,'#060606',6.5,10.6+i*2.3,19,.4);}
 [[6.4,9.4],[25.6,9.4],[6.4,22.6],[25.6,22.6]].forEach(q=>bolt(g,q[0],q[1],'#4a4d4d'));
};
/* ---- 공장 기계 ---- */
TP['X']=(g,R,x,y)=>{const p=S.past,b=p?130:56;
 const nb=t=>t==='X',up=nb(tile(x,y-1)),dn=nb(tile(x,y+1)),lf=nb(tile(x-1,y)),rt=nb(tile(x+1,y));
 g.fillStyle=lg(g,0,0,0,32,[[0,grayc(b+12)],[1,grayc(b-14)]]);g.fillRect(0,0,32,32);
 if(!up){fillc(g,grayc(b+24),0,0,32,1.2);fillc(g,grayc(b+34),0,0,32,.4);}
 if(!dn){fillc(g,grayc(b-32),0,28.6,32,3.4);fillc(g,'rgba(0,0,0,.45)',0,31,32,1);}
 if(!lf)fillc(g,grayc(b+16),0,0,1.2,32);if(!rt)fillc(g,grayc(b-26),30.8,0,1.2,32);
 fillc(g,grayc(b-8),3,4,26,22);fillc(g,grayc(b+7),3,4,26,.6);fillc(g,grayc(b-22),3,25.4,26,.6);fillc(g,grayc(b+3),3,4,.6,22);
 [[4.6,5.6],[27.4,5.6],[4.6,24.4],[27.4,24.4]].forEach(q=>bolt(g,q[0],q[1],grayc(b+28)));
 const k=R();
 if(k<.3){for(let i=0;i<7;i++){fillc(g,grayc(b-32),6,7.5+i*2.4,20,1.2);fillc(g,grayc(b+10),6,8.7+i*2.4,20,.3);}}
 else if(k<.55){g.fillStyle=grayc(b+42);g.beginPath();g.arc(11,13,4.4,0,Math.PI*2);g.fill();g.fillStyle=p?'#ecece8':'#8e8e8a';g.beginPath();g.arc(11,13,3.5,0,Math.PI*2);g.fill();
  for(let i=0;i<9;i++){const aa=-3.9+i*.45;fillc(g,'#303030',11+Math.cos(aa)*3-.2,13+Math.sin(aa)*3-.2,.4,.4);}
  const a=-2.6+R()*1.8;ln(g,'#c8322d',.45,[[11,13],[11+Math.cos(a)*2.9,13+Math.sin(a)*2.9]]);bolt(g,11,13,'#202020');
  fillc(g,grayc(b-28),18,7.5,8,15);for(let i=0;i<4;i++){fillc(g,grayc(b+12),19,9+i*3.2,6,1.1);fillc(g,'#141414',19.5+R()*4,9.1+i*3.2,.8,.9);}}
 else if(k<.78){g.fillStyle=lg(g,12,0,19,0,[[0,grayc(b-10)],[.35,grayc(b+18)],[1,grayc(b-36)]]);g.fillRect(12,0,7,32);
  [6,16,26].forEach(yy=>{fillc(g,grayc(b-40),11,yy,9,1.6);fillc(g,grayc(b+10),11,yy,9,.4);});}
 else{fillc(g,p?'#d0d0bc':'#3d3616',6,8,10,6.6);fillc(g,'#141414',6,8,10,.5);tx(g,'!',11,13.5,5,'#141414');
  for(let i=0;i<3;i++)fillc(g,grayc(b-26),18,8+i*3,9,1.6);}
 if(!p){speck(g,R,0,0,32,32,50,b,16);if(R()<.45){g.fillStyle=lg(g,0,0,0,14,[[0,'rgba(80,64,50,.38)'],[1,'rgba(80,64,50,0)']]);g.fillRect(R()*28,R()*12,1.6+R()*2,14);}}
};
/* ---- 연구시설 바닥 / 서버 ---- */
TP['n']=(g,R,x,y)=>{
 for(let sy=0;sy<2;sy++)for(let sx=0;sx<2;sx++){const X=sx*16,Y=sy*16,v=28+R()*4;fillc(g,grayc(v),X,Y,16,16);
  g.fillStyle=lg(g,X,Y,X+16,Y+16,[[0,'rgba(255,255,255,.05)'],[.5,'rgba(255,255,255,0)'],[1,'rgba(0,0,0,.08)']]);g.fillRect(X,Y,16,16);
  fillc(g,'#121417',X,Y+15.6,16,.4);fillc(g,'#121417',X+15.6,Y,.4,16);fillc(g,'#262a2f',X,Y,16,.3);}
 if(R()<.1){fillc(g,'#141619',0,13,32,6);for(let i=0;i<16;i++)fillc(g,'#22262b',i*2,13.5,1,5);}
 if(R()<.05){fillc(g,'rgba(216,177,58,.18)',0,26,32,1.6);}
 speck(g,R,0,0,32,32,30,34,10);
 if(R()<.2)ln(g,'rgba(255,255,255,.05)',.3,[[R()*32,R()*32],[R()*32,R()*32]]);
};
TP['S']=(g,R,x,y)=>{TP['n'](g,R,x,y);
 shE(g,16,30,14,2.4,.5);
 g.fillStyle=lg(g,3,0,29,0,[[0,'#16181b'],[.5,'#101214'],[1,'#0a0b0d']]);g.fillRect(3,1,26,29);
 fillc(g,'#24282d',3,1,26,1.2);fillc(g,'#05060700',3,29,26,1);
 fillc(g,'#0b0c0e',5,3,20,25);
 for(let yy=3.6;yy<27.5;yy+=1.2)for(let xx=5.6+((yy*10|0)%2)*.6;xx<24.6;xx+=1.2)fillc(g,'#1a1d21',xx,yy,.55,.55);
 fillc(g,'#2b2f35',25.4,10,1.2,9);fillc(g,'#3a3f46',25.6,10.4,.8,8);
 fillc(g,'#d9d6cf',6,4,6,1.6);fillc(g,'#5a5a58',6.5,4.5,4,.4);
 for(let i=0;i<5;i++)fillc(g,'#14161a',5,7.5+i*4.6,20,.4);
 g.strokeStyle='#08090a';g.lineWidth=.8;g.beginPath();g.moveTo(8,29);g.bezierCurveTo(9,31.5,14,31,16,31.6);g.stroke();
};
/* ---- 누리느엘 ---- */
TP['w']=(g,R,x,y)=>{
 fillc(g,'#ddd7cc',0,0,32,32);
 for(let r0=0;r0<4;r0++){const off=(r0+y*4)%2?8:0;for(let c0=-1;c0<3;c0++){const X=c0*16+off,Y=r0*8,v=R();
  g.fillStyle=v<.33?'#f6f3ed':v<.66?'#f1ede6':'#ece7de';rr(g,X+.4,Y+.4,15.2,7.2,1.2);g.fill();fillc(g,'rgba(255,255,255,.7)',X+1,Y+.6,14,.5);fillc(g,'rgba(0,0,0,.04)',X+1,Y+6.8,14,.5);}}
 if(R()<.12){const fx=4+R()*24,fy=4+R()*24,fc=PAST[Math.floor(R()*PAST.length)];ln(g,'#9ccfb3',.4,[[fx,fy+2],[fx,fy]]);for(let i=0;i<5;i++){g.fillStyle=fc;g.beginPath();g.arc(fx+Math.cos(i*1.26)*.9,fy+Math.sin(i*1.26)*.9,.7,0,Math.PI*2);g.fill();}fillc(g,'#fff6c8',fx-.35,fy-.35,.7,.7);}
 if(R()<.08){g.save();g.translate(4+R()*24,4+R()*24);g.rotate(R()*3);g.fillStyle=PAST[Math.floor(R()*PAST.length)];g.beginPath();g.ellipse(0,0,1.2,.6,0,0,Math.PI*2);g.fill();g.restore();}
};
TP['o']=(g,R,x,y)=>{
 fillc(g,'#dcdae6',0,0,32,32);for(let i=0;i<160;i++){g.fillStyle=R()<.5?'#d3d0de':'#e6e4ee';g.fillRect(R()*32,R()*32,.5,.5);}
 if(y===19&&x%2===0){fillc(g,'#ffffff',4,15,24,2);fillc(g,'rgba(0,0,0,.04)',4,17,24,.4);}
 if(y===18)fillc(g,'rgba(255,255,255,.6)',0,0,32,.8);if(y===20)fillc(g,'rgba(255,255,255,.6)',0,31.2,32,.8);
};
TP['Y']=(g,R,x,y)=>{
 for(let sy=0;sy<2;sy++)for(let sx=0;sx<2;sx++){const X=sx*16,Y=sy*16,odd=(x*2+sx+y*2+sy)%2;fillc(g,odd?'#3e3758':'#38324f',X,Y,16,16);fillc(g,'#2a2540',X,Y+15.5,16,.5);fillc(g,'#2a2540',X+15.5,Y,.5,16);fillc(g,'#4a4268',X,Y,16,.3);}
 if(R()<.18){fillc(g,'#24203a',0,5,32,3.4);g.fillStyle=lg(g,0,5,0,8.4,[[0,'#8fe6db'],[.5,'#5fbfb4'],[1,'#3a8f86']]);g.fillRect(0,5.4,32,2.6);for(let i=4;i<32;i+=10)fillc(g,'#2a2540',i,4.8,1.4,3.8);}
 if(R()>.88){g.fillStyle=lg(g,9,0,12,0,[[0,'#f6c0a0'],[1,'#c8805c']]);g.fillRect(9,0,3,32);}
};
TP['R']=(g,R,x,y)=>{
 fillc(g,'#e9e3d6',0,0,32,32);for(let i=0;i<220;i++){const v=R();g.fillStyle=v<.4?'#ddd5c4':v<.8?'#f2ede2':'#cfc6b4';g.beginPath();g.arc(R()*32,R()*32,.3+R()*.4,0,Math.PI*2);g.fill();}
 const V=t=>t==='V';
 const rail=(hz,pos)=>{if(hz){fillc(g,'rgba(0,0,0,.08)',0,pos+1.6,32,1);fillc(g,'#a9a295',0,pos,32,1.2);fillc(g,'#c9c2b4',0,pos,32,.4);for(let i=2;i<32;i+=6)fillc(g,'#9a9386',i,pos,1,3);}
  else{fillc(g,'#a9a295',pos,0,1.2,32);fillc(g,'#c9c2b4',pos,0,.4,32);for(let i=2;i<32;i+=6)fillc(g,'#9a9386',pos,i,3,1);}};
 if(V(tile(x,y-1)))rail(1,.4);if(V(tile(x,y+1)))rail(1,29.6);if(V(tile(x-1,y)))rail(0,.4);if(V(tile(x+1,y)))rail(0,30.4);
};
TP['W']=(g,R,x,y)=>{
 g.fillStyle=lg(g,0,0,32,32,[[0,'#fbf5ec'],[1,'#f1e7da']]);g.fillRect(0,0,32,32);
 for(let i=0;i<3;i++){g.strokeStyle='rgba(200,186,165,'+(.25+R()*.2)+')';g.lineWidth=.3+R()*.4;g.beginPath();let px0=R()*32,py0=0;g.moveTo(px0,py0);for(let k=0;k<5;k++){px0+=(R()-.5)*10;py0+=6.5;g.lineTo(px0,py0);}g.stroke();}
 fillc(g,'rgba(255,255,255,.35)',0,0,32,.5);fillc(g,'rgba(0,0,0,.03)',0,31.5,32,.5);
 if(x%4===0){fillc(g,'#e2cf9e',0,0,.9,32);fillc(g,'#f3e6c4',.9,0,.3,32);}if(y%4===0){fillc(g,'#e2cf9e',0,0,32,.9);fillc(g,'#f3e6c4',0,.9,32,.3);}
};
TP['C']=(g,R,x,y)=>{TP['w'](g,R,x,y);const c=PAST[(x+y*3)%PAST.length];
 shE(g,16,26.5,9,2.5,.12);
 const lc='rgba(80,70,90,.45)';fillc(g,lc,9,19,1,8);fillc(g,lc,22,19,1,8);fillc(g,lc,9.8,23,1,5);fillc(g,lc,21.2,23,1,5);
 g.fillStyle=c;rr(g,8,4,16,6,2);g.fill();fillc(g,'rgba(255,255,255,.4)',9,4.6,14,.8);fillc(g,'rgba(0,0,0,.08)',8,9.4,16,.6);
 fillc(g,'rgba(0,0,0,.12)',10,10,1.2,8);fillc(g,'rgba(0,0,0,.12)',20.8,10,1.2,8);
 g.fillStyle=c;rr(g,7.5,15,17,7,2);g.fill();g.fillStyle=lg(g,0,15,0,22,[[0,'rgba(255,255,255,.35)'],[1,'rgba(0,0,0,.08)']]);rr(g,7.5,15,17,7,2);g.fill();
};

/* ===== 오브젝트 ===== */
const OB={irondoor:[-8,-52,112,86],tower:[-8,-72,80,108],board:[-18,-6,68,40],gen:[-16,-8,64,44],portal:[-8,-24,80,64]};
function objBox(t){return OB[t]||[-24,-48,80,80];}
function objState(o){const f=S.flags;
 switch(o.t){case 'keypad':return f.gateOpen?'o':'c';case 'fuse':return f.hasFuse?'e':'f';case 'console':return f.powered?'p':'n';
  case 'lever':return (f.power||leverSeq.indexOf(o.L)>=0||(S.past&&o.n))?'d':'u';case 'hatch':return f.broadcastDone?'o':'c';
  case 'irondoor':return f.preserved?'s':'n';case 'codepad':return has('code')?'k':'n';case 'monitor':return has('cctv')?'v':'n';case 'sign':return f.power?'p':'n';
  case 'stand':case 'radio':case 'busstop':case 'mailbox':return '';}
 return '';}
function objCanvas(o,st){
 const key=o.id+'|'+S.area+'|'+st+'|'+(S.past?1:0);if(OBJC[key])return OBJC[key];
 const b=objBox(o.t),c=document.createElement('canvas');c.width=b[2]*OSC;c.height=b[3]*OSC;const g=c.getContext('2d');g.scale(OSC,OSC);g.translate(-b[0],-b[1]);
 const R=rng(Math.imul(o.x+3,2654435761)^Math.imul(o.y+9,40503)^(o.id.length*131));
 OP[o.t](g,R,o,st);
 return OBJC[key]=c;
}
function blitObj(o,px,py,alpha){const b=objBox(o.t),c=objCanvas(o,objState(o));ctx.imageSmoothingEnabled=true;if(alpha!==undefined)ctx.globalAlpha=alpha;ctx.drawImage(c,px+b[0],py+b[1],b[2],b[3]);ctx.globalAlpha=1;ctx.imageSmoothingEnabled=false;}
const OP={};
function booth(g,R,pal){
 shE(g,16,28,13,3.6,pal.nl?.12:.5);
 fillc(g,pal.inside,7,-12,18,39);
 fillc(g,pal.unit,11,-4,10,13);fillc(g,pal.unitL,11,-4,10,.8);fillc(g,'#1c1e1f',12.5,-2,7,3.2);fillc(g,pal.nl?'#bfe3d0':'#2a3a30',13,-1.5,4,.6);
 fillc(g,pal.unitD,12,2,8,5);for(let i=0;i<3;i++)for(let j=0;j<3;j++)fillc(g,pal.key,12.8+i*2.4,2.6+j*1.5,1.6,.9);
 fillc(g,'#222',20.5,-3,1.8,9);fillc(g,'#3a3a3a',20.5,-3,1.8,.6);ln(g,'#161616',.6,[[21.4,6],[22.6,8.5],[20.5,10],[19.4,12.5]]);
 fillc(g,pal.frame,9,11,14,1.6);fillc(g,pal.book,10,9,5,2);fillc(g,'rgba(0,0,0,.25)',10,10.6,5,.4);
 g.fillStyle=pal.nl?'rgba(220,240,255,.18)':'rgba(170,180,186,.10)';g.fillRect(6,-13,20,40);glassFill(g,6,-13,20,40,pal.nl?1.4:1);
 if(!pal.nl){g.fillStyle=lg(g,0,13,0,27,[[0,'rgba(60,58,54,0)'],[1,'rgba(60,58,54,.5)']]);g.fillRect(6,13,20,14);
  if(R()<.75){const cx=8+R()*14,cy=-6+R()*20;for(let i=0;i<8;i++){const a=R()*6.28,l=2+R()*6;ln(g,'rgba(225,225,225,.38)',.28,[[cx,cy],[cx+Math.cos(a)*l*.5,cy+Math.sin(a)*l*.5],[cx+Math.cos(a+.2)*l,cy+Math.sin(a+.2)*l]]);}}
  for(let i=0;i<3;i++)fillc(g,'rgba(200,198,190,.12)',7+R()*16,-10+R()*30,2+R()*3,.6);}
 [[5,-14,1.8,42],[25.2,-14,1.8,42],[5,-14,22,1.8],[5,26.2,22,1.8],[5,6,22,1.2]].forEach(r=>fillc(g,pal.frame,r[0],r[1],r[2],r[3]));
 fillc(g,pal.frameL,5,-14,.6,42);fillc(g,pal.frameL,5,6,22,.4);fillc(g,'rgba(0,0,0,.3)',26.4,-14,.6,42);
 g.fillStyle=pal.roof;rr(g,3.4,-18.4,25.2,4.8,1.3);g.fill();fillc(g,pal.roofL,3.4,-18.4,25.2,.8);fillc(g,'rgba(0,0,0,.35)',3.4,-13.8,25.2,.7);
 fillc(g,pal.sign,8,-17.4,16,2.8);tx(g,'공중전화',16,-15.2,2.3,pal.signT);
 fillc(g,pal.handle,23.2,7,.8,6);fillc(g,'rgba(0,0,0,.3)',24,7,.3,6);
}
OP.phone=(g,R)=>booth(g,R,{inside:'#131415',unit:'#4a4a48',unitL:'#5c5c5a',unitD:'#383836',key:'#6c6c68',frame:'#2a2a2a',frameL:'#3c3c3c',book:'#7a766e',roof:'#3e3e3e',roofL:'#4e4e4e',sign:'#d9d6cf',signT:'#2a2a2a',handle:'#5a5a5a'});
OP.nphone=(g,R)=>booth(g,R,{nl:1,inside:'#f6e8ea',unit:'#c95f6f',unitL:'#e48a98',unitD:'#a94a58',key:'#ffffff',frame:'#e06b7b',frameL:'#f39aa6',book:'#bfd0f6',roof:'#d45a6b',roofL:'#ef8796',sign:'#ffffff',signT:'#d45a6b',handle:'#ffffff'});
OP.stand=(g,R)=>{shE(g,16,28,14,3.5,.5);
 g.fillStyle=lg(g,3,0,29,0,[[0,'#4c4c4a'],[1,'#383836']]);g.fillRect(3,8,26,20);fillc(g,'#2a2a28',3,26,26,2);
 g.fillStyle='#3a3a38';g.beginPath();g.moveTo(1,2);g.lineTo(31,2);g.lineTo(29,8);g.lineTo(3,8);g.closePath();g.fill();
 for(let i=0;i<6;i++)fillc(g,i%2?'#4a4a48':'#333331',1+i*5,2,5,1);fillc(g,'rgba(0,0,0,.35)',3,8,26,1);
 for(let i=0;i<3;i++){const yy=10+i*.8;fillc(g,'#bdb9b0',6,yy,20,6-i*.4);}fillc(g,'#c8322d',6,10.2,20,2);
 for(let i=0;i<4;i++)fillc(g,'#6e6a62',7.5,13.4+i*.9,8+R()*8,.35);
 fillc(g,'#9a968e',6,18,9,6);fillc(g,'#8a8780',17,18,9,6);fillc(g,'#5a5752',6.5,19,4,4);fillc(g,'#5a5752',17.5,19,3,3);
 speck(g,R,3,8,26,20,40,90,20);
};
OP.busstop=(g,R)=>{shE(g,16,28,14,3,.45);
 fillc(g,'#4a4a48',4,-16,1.6,44);fillc(g,'#4a4a48',26.4,-16,1.6,44);fillc(g,'#5a5a58',4,-16,.5,44);
 g.fillStyle='#3a3a38';rr(g,1,-19,30,3.6,1);g.fill();fillc(g,'#4a4a48',1,-19,30,.7);
 fillc(g,'#262626',6.5,-13,19,15);fillc(g,'#b1ada4',7.5,-12,17,13);
 g.strokeStyle='#8a867e';g.lineWidth=.3;for(let i=0;i<6;i++){g.beginPath();g.moveTo(8+R()*15,-11+R()*11);g.lineTo(8+R()*15,-11+R()*11);g.stroke();}
 fillc(g,'#9a968e',9,-11,6,4);fillc(g,'#9a968e',17,-6,6,4);
 ln(g,'#c8322d',.9,[[14,-8],[18,-4]]);ln(g,'#c8322d',.9,[[18,-8],[14,-4]]);
 g.strokeStyle='#c8322d';g.lineWidth=.4;g.beginPath();g.moveTo(16,-4);g.quadraticCurveTo(17,-1,15.5,1);g.stroke();
 fillc(g,'#3a3a38',6,12,20,2.4);fillc(g,'#4c4c4a',6,12,20,.6);fillc(g,'#2a2a2a',7,14.4,1,5);fillc(g,'#2a2a2a',24,14.4,1,5);
 fillc(g,'#6a6a66',8,-17.6,10,1.6);tx(g,'BUS',13,-16.2,1.6,'#2a2a2a');
};
OP.nstop=(g,R)=>{shE(g,16,28,14,3,.1);
 fillc(g,'#a9b4c9',4,-16,1.6,44);fillc(g,'#a9b4c9',26.4,-16,1.6,44);g.fillStyle='#bfd0f6';rr(g,1,-19,30,3.6,1);g.fill();fillc(g,'#e3ebfb',1,-19,30,.7);
 fillc(g,'#ffffff',6.5,-13,19,15);fillc(g,'#eef3fb',7.5,-12,17,13);g.strokeStyle='#bfd0f6';g.lineWidth=.35;for(let i=0;i<6;i++){g.beginPath();g.moveTo(8+R()*15,-11+R()*11);g.lineTo(8+R()*15,-11+R()*11);g.stroke();}
 fillc(g,'#f4b6c2',9,-11,6,4);fillc(g,'#b9e4cf',17,-6,6,4);fillc(g,'#bfd0f6',6,12,20,2.4);fillc(g,'#ffffff',6,12,20,.6);fillc(g,'#a9b4c9',7,14.4,1,5);fillc(g,'#a9b4c9',24,14.4,1,5);
};
OP.mailbox=(g,R)=>{fillc(g,'#262626',5,7,22,20);fillc(g,'#383838',5,7,22,.8);
 for(let r=0;r<3;r++)for(let c=0;c<3;c++){const X=6+c*7,Y=8.5+r*6;fillc(g,'#3e3e3e',X,Y,6.4,5.4);fillc(g,'#4c4c4c',X,Y,6.4,.5);fillc(g,'#141414',X+1,Y+1.4,4.4,.8);fillc(g,'#707070',X+5,Y+3.2,.8,.8);}
 g.save();g.translate(14,14);g.rotate(-.2);fillc(g,'#d4cfc4',-2,-3.5,5,3.5);fillc(g,'#a9a59c',-1.4,-2.4,3.6,.3);g.restore();
 speck(g,R,5,7,22,20,30,64,16);
};
OP.keypad=(g,R,o,st)=>{fillc(g,'#1a1a1a',8,7,16,22);fillc(g,'#2e2e2e',8.6,7.6,14.8,20.8);fillc(g,'#3e3e3e',8.6,7.6,14.8,.6);
 fillc(g,'#0e0e0e',10,9.5,12,3);fillc(g,st==='o'?'#5c8a4a':'#d8b13a',10.5,10.3,3,1.4);
 for(let i=0;i<3;i++)for(let j=0;j<4;j++){fillc(g,'#4c4c4c',10.4+i*3.9,14+j*3.3,3,2.4);fillc(g,'#5e5e5e',10.4+i*3.9,14+j*3.3,3,.5);}
 speck(g,R,8,7,16,22,20,70,20);
};
OP.radio=(g,R)=>{fillc(g,'#141616',2,5,28,22);fillc(g,'#3a3a38',1,4,30,1.4);fillc(g,'#2a2a28',1,27,30,1.6);fillc(g,'#323230',1,4,1.4,24.6);fillc(g,'#323230',29.6,4,1.4,24.6);
 fillc(g,'#232524',4,20,24,2);
 g.fillStyle='#4e4c48';rr(g,8,11,16,9,1.2);g.fill();fillc(g,'#5e5c58',8,11,16,.6);
 for(let i=0;i<5;i++)fillc(g,'#2e2d2a',9.5,12.6+i*1.3,6,.5);g.fillStyle='#2a2926';g.beginPath();g.arc(20,15.6,2.6,0,Math.PI*2);g.fill();
 fillc(g,'#d8b13a',18.6,14.8,2.8,.8);fillc(g,'#6a6864',20,8,.4,3.2);fillc(g,'#8a8780',5,16,3,2.4);
 glassFill(g,2,5,28,22,1.2);for(let i=0;i<6;i++)fillc(g,'rgba(180,178,170,.08)',3+R()*24,6+R()*18,3,.5);
};
OP.graffiti=(g,R)=>{g.save();
 g.fillStyle='rgba(200,50,45,.16)';for(let i=0;i<30;i++)g.fillRect(-10+R()*52,6+R()*20,.6,.6);
 g.strokeStyle='#b22c27';g.lineWidth=1.6;g.lineCap='round';g.lineJoin='round';
 g.beginPath();g.moveTo(-8,13);g.lineTo(0,20);g.lineTo(6,11);g.lineTo(14,21);g.lineTo(20,10);g.lineTo(28,20);g.lineTo(38,12);g.stroke();
 tx(g,'기록은 거짓말을 한다',15,28.5,4.2,'#c8322d');
 g.fillStyle='#b22c27';for(let i=0;i<7;i++){const dx=-8+R()*46,dy=14+R()*8;g.fillRect(dx,dy,.5,2+R()*4);}
 g.restore();
};
OP.book=(g,R,o)=>{if(o.desk){shE(g,16,24,12,3.4,.4);fillc(g,'#232323',6,18,1.2,6);fillc(g,'#232323',24.8,18,1.2,6);g.fillStyle='#4a4844';rr(g,4,7,24,12,1.2);g.fill();
  g.fillStyle=lg(g,0,7,0,19,[[0,'#5b5954'],[1,'#42403c']]);rr(g,4.4,7.4,23.2,10.4,1);g.fill();fillc(g,'#2c2b28',4,17.6,24,1.4);}
 shE(g,16,15.2,8,1.4,.35);
 g.fillStyle='#3a3a38';g.beginPath();g.moveTo(8,9);g.lineTo(16,10);g.lineTo(24,9);g.lineTo(24,16);g.lineTo(16,17);g.lineTo(8,16);g.closePath();g.fill();
 g.fillStyle='#d6d1c6';g.beginPath();g.moveTo(8.6,9.4);g.lineTo(16,10.3);g.lineTo(16,16.4);g.lineTo(8.6,15.5);g.closePath();g.fill();
 g.fillStyle='#e2ddd2';g.beginPath();g.moveTo(16,10.3);g.lineTo(23.4,9.4);g.lineTo(23.4,15.5);g.lineTo(16,16.4);g.closePath();g.fill();
 for(let i=0;i<5;i++){ln(g,'rgba(80,76,70,.55)',.22,[[9.6,10.8+i*1.05],[15,11.4+i*1.05]]);ln(g,'rgba(80,76,70,.55)',.22,[[17,11.4+i*1.05],[22.4,10.8+i*1.05]]);}
 fillc(g,'#8a867e',15.8,10.2,.4,6.2);
};
OP.board=(g,R)=>{fillc(g,'#4a3f34',-16,1,64,25);fillc(g,'#5c5043',-16,1,64,.8);
 g.fillStyle=lg(g,0,2.5,0,24,[[0,'#262c27'],[1,'#1c201c']]);g.fillRect(-14.4,2.6,60.8,21.6);
 g.fillStyle='rgba(255,255,255,.04)';for(let i=0;i<5;i++){g.beginPath();g.ellipse(-10+R()*52,6+R()*14,5+R()*6,2+R()*2,R(),0,Math.PI*2);g.fill();}
 g.strokeStyle='rgba(220,220,212,.75)';g.lineWidth=.32;g.lineCap='round';
 for(let r=0;r<4;r++){let x0=-12+R()*2;const yy=6+r*4.3;g.beginPath();while(x0<38-r*4){const w=1+R()*2.2;g.moveTo(x0,yy+R()*.6);g.lineTo(x0+w*.5,yy-1.2);g.lineTo(x0+w,yy+R()*.6);x0+=w+.6+(R()<.15?2:0);}g.stroke();}
 fillc(g,'#3a3128',-16,24.6,64,2.2);fillc(g,'#e8e6de',-4,24.8,3,.9);fillc(g,'#d8d2c4',4,24.9,2.2,.8);g.fillStyle='#2a2a2a';rr(g,24,23.8,6,1.8,.4);g.fill();fillc(g,'#cfc9bd',24,25,6,.6);
};
OP.camera=(g,R)=>{shE(g,16,24,12,3.4,.4);fillc(g,'#232323',6,18,1.2,6);fillc(g,'#232323',24.8,18,1.2,6);g.fillStyle='#4a4844';rr(g,4,7,24,12,1.2);g.fill();
 g.fillStyle=lg(g,0,7,0,19,[[0,'#5b5954'],[1,'#42403c']]);rr(g,4.4,7.4,23.2,10.4,1);g.fill();fillc(g,'#2c2b28',4,17.6,24,1.4);
 shE(g,16,15,8,1.6,.35);
 g.fillStyle='#2e2e2e';rr(g,9,6,14,8,1.4);g.fill();fillc(g,'#3e3e3e',9,6,14,.8);fillc(g,'#1c1c1c',10,12,8,1.2);
 g.fillStyle='#1a1a1a';rr(g,21,7.4,5,5,1.2);g.fill();g.fillStyle=rg(g,23.5,9.9,0,2,[[0,'#8fb2ee'],[.6,'#4a7fd4'],[1,'#1c2c4a']]);g.beginPath();g.arc(23.5,9.9,1.8,0,Math.PI*2);g.fill();
 fillc(g,'rgba(255,255,255,.5)',22.8,9,.6,.6);fillc(g,'#c8322d',11,7.4,.8,.8);fillc(g,'#4c4c4c',13,4.6,6,1.6);
 fillc(g,'#d6d1c6',6,12.6,5,3);fillc(g,'#8a867e',6.6,13.4,3.6,.4);tx(g,'11.10.14',8.5,15.2,.9,'#3a3a3a');
};
OP.docs=(g,R)=>{shE(g,16,24,12,3.4,.4);fillc(g,'#232323',6,18,1.2,6);fillc(g,'#232323',24.8,18,1.2,6);g.fillStyle='#4a4844';rr(g,4,7,24,12,1.2);g.fill();
 g.fillStyle=lg(g,0,7,0,19,[[0,'#5b5954'],[1,'#42403c']]);rr(g,4.4,7.4,23.2,10.4,1);g.fill();fillc(g,'#2c2b28',4,17.6,24,1.4);
 for(let i=0;i<4;i++){g.save();g.translate(12+i*.6,12-i*.5);g.rotate((R()-.5)*.3);fillc(g,'rgba(0,0,0,.25)',-4.6,-3,9.6,6.6);fillc(g,i===3?'#cfcabe':'#bdb8ad',-5,-3.4,9.6,6.6);if(i===3)for(let k=0;k<4;k++)fillc(g,'#7d786e',-4,-2+k*1.3,6+R()*2,.3);g.restore();}
 g.save();g.translate(21,12);g.rotate(.15);fillc(g,'#6a5a44',-3,-4,6,8);fillc(g,'#d6d1c6',-2.4,-3,4.8,6.4);fillc(g,'#3a3a3a',-1,-4.4,2,1);for(let k=0;k<4;k++)fillc(g,'#7d786e',-1.8,-1.8+k*1.3,3.4,.3);g.restore();
 fillc(g,'#d8b13a',9,7.6,2,1.2);
};
OP.speaker=(g,R)=>{fillc(g,'rgba(0,0,0,.3)',9.6,7.4,14,12);g.fillStyle='#3c3c3c';rr(g,9,6,14,11.4,1);g.fill();fillc(g,'#4c4c4c',9,6,14,.7);
 for(let i=0;i<5;i++)for(let j=0;j<7;j++){g.fillStyle='#1a1a1a';g.beginPath();g.arc(11.2+j*1.6,8.6+i*1.6,.42,0,Math.PI*2);g.fill();}
 ln(g,'#1a1a1a',.6,[[16,6],[16,2],[20,0]]);speck(g,R,9,6,14,11,14,70,20);
};
OP.fuse=(g,R,o,st)=>{shE(g,16,28,14,2.4,.4);
 fillc(g,'#2a2a28',2,10,28,3);fillc(g,'#3a3a38',2,10,28,.6);fillc(g,'#2a2a28',2,22,28,3);fillc(g,'#3a3a38',2,22,28,.6);fillc(g,'#1e1e1c',3,10,1.4,18);fillc(g,'#1e1e1c',27.6,10,1.4,18);
 fillc(g,'#4a4844',5,15,6,7);fillc(g,'#3a3834',22,17,5,5);fillc(g,'#5a5852',22,17,5,.6);
 if(st!=='e'){fillc(g,'#4d4d4d',11,3,11,7);fillc(g,'#5e5e5e',11,3,11,.6);fillc(g,'#d8b13a',11,5.4,11,1.6);for(let i=0;i<4;i++)fillc(g,'#141414',12+i*2.6,5.4,1.2,1.6);}
 else{g.fillStyle='rgba(255,255,255,.06)';g.fillRect(11,8.6,11,1.4);}
 speck(g,R,2,10,28,15,30,60,18);
};
OP.memo=(g,R)=>{shE(g,16,24,12,3.4,.4);fillc(g,'#232323',6,18,1.2,6);fillc(g,'#232323',24.8,18,1.2,6);g.fillStyle='#4a4844';rr(g,4,7,24,12,1.2);g.fill();
 g.fillStyle=lg(g,0,7,0,19,[[0,'#5b5954'],[1,'#42403c']]);rr(g,4.4,7.4,23.2,10.4,1);g.fill();fillc(g,'#2c2b28',4,17.6,24,1.4);
 for(let i=0;i<3;i++){g.save();g.translate(14+i*2.6,12-i*.4);g.rotate((R()-.5)*.4);fillc(g,'rgba(0,0,0,.25)',-4.6,-3,9.6,7);fillc(g,i===2?'#f4f8ff':'#e2e9f4',-5,-3.4,9.6,7);
  if(i===2){tx(g,'NURI',0,-.6,1.8,'#5a6680');for(let k=0;k<3;k++)fillc(g,'#9aa4b5',-3.6,.6+k*1.2,7,.3);fillc(g,'#141414',1,.6,2.6,1);}g.restore();}
};
OP.console=(g,R,o,st)=>{shE(g,16,28,15,2.8,.5);
 g.fillStyle='#2a2a2a';g.beginPath();g.moveTo(0,14);g.lineTo(32,14);g.lineTo(31,28);g.lineTo(1,28);g.closePath();g.fill();
 g.fillStyle=lg(g,0,10,0,16,[[0,'#3e3e3e'],[1,'#303030']]);g.beginPath();g.moveTo(1,10);g.lineTo(31,10);g.lineTo(32,15);g.lineTo(0,15);g.closePath();g.fill();
 for(let i=0;i<8;i++){fillc(g,'#141414',3.4+i*3.4,10.8,.6,3.6);fillc(g,'#8a8a86',2.8+i*3.4,11.6+R()*2,1.8,.9);}
 for(let i=0;i<8;i++){g.fillStyle='#4c4c4c';g.beginPath();g.arc(3.7+i*3.4,16.6,.8,0,Math.PI*2);g.fill();}
 fillc(g,'#101010',5,0,22,9.4);fillc(g,'#2e2e2e',5,0,22,.8);
 if(st==='p'){g.fillStyle=lg(g,0,1,0,9,[[0,'#4a3f17'],[1,'#2e2810']]);g.fillRect(6,1,20,7.6);for(let i=0;i<4;i++)fillc(g,'rgba(216,177,58,.8)',7,2+i*1.6,6+R()*10,.5);}
 else fillc(g,'#141516',6,1,20,7.6);
 glassFill(g,6,1,20,7.6,.8);
 ln(g,'#1c1c1c',.7,[[28,10],[29,4],[26,1]]);g.fillStyle='#3a3a3a';rr(g,24.2,-.6,3.4,2.4,.8);g.fill();
 fillc(g,'#c8322d',29,12,.9,.9);
};
OP.hatch=(g,R,o,st)=>{g.fillStyle='rgba(0,0,0,.4)';g.fillRect(4.6,5.6,23,23);
 g.fillStyle=lg(g,5,5,27,27,[[0,'#4c4c48'],[1,'#2e2e2c']]);g.fillRect(5,5,22,22);fillc(g,'#5a5a56',5,5,22,.6);
 g.fillStyle=lg(g,7,7,25,25,[[0,'#3e3e3b'],[1,'#2a2a28']]);g.fillRect(7,7,18,18);
 for(let i=0;i<4;i++){fillc(g,'#232321',7,9+i*4.4,18,.6);}
 [[6,6],[26,6],[6,26],[26,26],[16,6],[16,26],[6,16],[26,16]].forEach(q=>bolt(g,q[0],q[1],'#6a6a66'));
 g.strokeStyle=st==='o'?'#8a8a86':'#5a5a56';g.lineWidth=1;g.beginPath();g.arc(16,16,3,Math.PI,0);g.stroke();
 fillc(g,'#1a1a18',5,15.6,22,.8);if(st==='o')fillc(g,'rgba(255,255,255,.06)',5,15.6,22,1.6);
};
OP.exitdoor=(g,R)=>{fillc(g,'#0e0e0e',0,0,32,32);
 g.fillStyle=lg(g,3,0,29,0,[[0,'#4a4442'],[.5,'#3c3735'],[1,'#2e2a28']]);g.fillRect(3,4,26,28);
 for(let i=0;i<30;i+=6){fillc(g,'#c8322d',1+i,1,3,2.6);fillc(g,'#1a1a1a',4+i,1,3,2.6);}
 fillc(g,'#2a2624',15.4,4,1.2,28);
 for(let i=0;i<5;i++){bolt(g,5,7+i*5.6,'#6a6360');bolt(g,27,7+i*5.6,'#6a6360');}
 fillc(g,'#d9d6cf',8,8,16,5);tx(g,'EXIT',16,12.2,3.4,'#c8322d');
 fillc(g,'#6a6560',6,18,20,1.6);fillc(g,'#8a847e',6,18,20,.5);
 g.fillStyle=lg(g,0,24,0,32,[[0,'rgba(80,64,50,0)'],[1,'rgba(80,64,50,.45)']]);g.fillRect(3,24,26,8);
 speck(g,R,3,4,26,28,50,70,22);
};
OP.monitor=(g,R,o,st)=>{shE(g,16,24,13,3.4,.45);fillc(g,'#232323',4,18,1.2,6);fillc(g,'#232323',26.8,18,1.2,6);g.fillStyle='#45433f';rr(g,2,9,28,10,1);g.fill();fillc(g,'#2c2b28',2,17.6,28,1.4);
 const crt=(x0,y0,on)=>{g.fillStyle='#2a2a2a';rr(g,x0,y0,11,9.4,1.2);g.fill();fillc(g,'#3a3a3a',x0,y0,11,.6);
  g.fillStyle=on?rg(g,x0+5.5,y0+4.4,0,6,[[0,'#3a5a96'],[1,'#141c2c']]):'#121416';rr(g,x0+1,y0+1,9,7,1.6);g.fill();
  if(on)for(let i=0;i<7;i++)fillc(g,'rgba(180,200,240,.12)',x0+1,y0+1.4+i,9,.3);glassFill(g,x0+1,y0+1,9,7,.8);};
 crt(3,0,st==='v'||true);crt(18,1,false);
 fillc(g,'#1e1e1e',9,13,14,3);for(let i=0;i<10;i++)fillc(g,'#3a3a3a',9.6+i*1.3,13.6,.9,.7);
};
OP.lever=(g,R,o,st)=>{fillc(g,'rgba(0,0,0,.35)',8.6,5.6,16,23);g.fillStyle='#2e3030';rr(g,8,4,16,23,1);g.fill();fillc(g,'#3e4141',8,4,16,.7);
 fillc(g,'#141616',11,7,10,17);fillc(g,'#d9d6cf',10,24.6,12,2.2);tx(g,o.L,16,26.4,2,'#2a2a2a');
 [[9.2,5.2],[22.8,5.2],[9.2,25.8],[22.8,25.8]].forEach(q=>bolt(g,q[0],q[1],'#5a5d5d'));
 const down=st==='d';fillc(g,'#3a3a3a',14.6,down?15:9,2.8,down?7:7);
 g.fillStyle=lg(g,14,0,18,0,[[0,'#9a9a96'],[1,'#5a5a56']]);g.fillRect(15,down?15:8,2,9);
 g.fillStyle=down?'#5a5a56':'#c8322d';g.beginPath();g.arc(16,down?24:8,2.2,0,Math.PI*2);g.fill();fillc(g,'rgba(255,255,255,.35)',15,down?23:7,1,.8);
};
OP.gen=(g,R)=>{shE(g,16,30,28,4,.55);
 g.fillStyle=lg(g,0,2,0,28,[[0,'#3c3f3f'],[1,'#242626']]);rr(g,-12,2,56,26,2);g.fill();fillc(g,'#4a4d4d',-12,2,56,1);
 for(let i=0;i<9;i++){fillc(g,'#1c1e1e',-10+i*2,6,1,18);fillc(g,'#1c1e1e',33+i*1.2,6,.6,18);}
 g.fillStyle='#1a1c1c';g.beginPath();g.arc(16,15,10.5,0,Math.PI*2);g.fill();g.strokeStyle='#4a4d4d';g.lineWidth=1;g.beginPath();g.arc(16,15,10,0,Math.PI*2);g.stroke();
 for(let i=0;i<12;i++){const a=i/12*Math.PI*2;ln(g,'#2c2f2f',.5,[[16+Math.cos(a)*3,15+Math.sin(a)*3],[16+Math.cos(a)*9.6,15+Math.sin(a)*9.6]]);}
 fillc(g,'#d9d6cf',-9,21,10,4);tx(g,'제3발전기',-4,24,1.8,'#2a2a2a');
 [[-10,4],[42,4],[-10,26],[42,26]].forEach(q=>bolt(g,q[0],q[1],'#5a5d5d'));
};
OP.nlstand=(g,R)=>{shE(g,16,28,14,3.5,.12);
 g.fillStyle=lg(g,3,0,29,0,[[0,'#ffffff'],[1,'#ece7f6']]);g.fillRect(3,8,26,20);fillc(g,'#d8c6f1',3,26,26,2);
 g.fillStyle='#bfa6e3';g.beginPath();g.moveTo(1,2);g.lineTo(31,2);g.lineTo(29,8);g.lineTo(3,8);g.closePath();g.fill();
 for(let i=0;i<6;i++)fillc(g,i%2?'#ffffff':'#d8c6f1',1+i*5,2,5,1);
 for(let i=0;i<3;i++)fillc(g,'#f6f3ed',6,10+i*.8,20,6-i*.4);fillc(g,'#9d7ae6',6,10.2,20,2);
 for(let i=0;i<4;i++)fillc(g,'#a9a59c',7.5,13.4+i*.9,8+R()*8,.35);tx(g,'누리느엘 일보',16,22.6,2.2,'#6c5a9a');};
OP.b3sign=(g,R)=>{fillc(g,'rgba(0,0,0,.35)',5.6,6.6,22,15);fillc(g,'#1e2022',5,6,22,14.4);fillc(g,'#2e3134',5.6,6.6,20.8,13.2);fillc(g,'#3e4144',5.6,6.6,20.8,.5);
 tx(g,'B3',11.6,15.6,6,'#e7e3da');g.fillStyle='#d8b13a';g.beginPath();g.moveTo(20,10);g.lineTo(24,10);g.lineTo(24,14);g.lineTo(26,14);g.lineTo(22,18.4);g.lineTo(18,14);g.lineTo(20,14);g.closePath();g.fill();
 tx(g,'지하 연구시설',16,19.2,2,'#9a968e');[[6.4,7.6],[25.6,7.6],[6.4,18.8],[25.6,18.8]].forEach(q=>bolt(g,q[0],q[1],'#5a5d60'));};
OP.sign=(g,R,o,st)=>{const on=st==='p';fillc(g,'rgba(0,0,0,.35)',6.6,7.6,19,15);fillc(g,'#141414',6,6,20,14.6);
 fillc(g,on?'#d8b13a':'#6b5a1a',7,7,18,12.6);g.fillStyle='#141414';g.beginPath();g.moveTo(16,8.4);g.lineTo(21.6,17.6);g.lineTo(10.4,17.6);g.closePath();g.fill();
 g.fillStyle=on?'#d8b13a':'#6b5a1a';g.beginPath();g.moveTo(16,10.6);g.lineTo(19.8,16.6);g.lineTo(12.2,16.6);g.closePath();g.fill();fillc(g,'#141414',15.4,12,1.2,2.8);fillc(g,'#141414',15.4,15.4,1.2,.9);
 speck(g,R,7,7,18,12,20,on?150:80,30);
};
OP.terminal=(g,R)=>{shE(g,16,30,26,3,.5);
 g.fillStyle='#15171a';g.beginPath();g.moveTo(-8,14);g.lineTo(40,14);g.lineTo(42,28);g.lineTo(-10,28);g.closePath();g.fill();fillc(g,'#24282d',-8,14,48,.8);
 fillc(g,'#0e1013',-2,17,36,6);for(let i=0;i<14;i++)fillc(g,'#262a30',-1.2+i*2.5,17.8,1.8,1.4);for(let i=0;i<12;i++)fillc(g,'#262a30',.2+i*2.5,20,1.8,1.4);
 g.fillStyle='#0a0b0d';rr(g,-4,-12,40,25,1.6);g.fill();fillc(g,'#1e2126',-4,-12,40,.8);
 g.fillStyle=rg(g,16,0,2,24,[[0,'#22324e'],[1,'#0e141f']]);g.fillRect(-2,-10,36,20);
 for(let i=0;i<10;i++)fillc(g,'rgba(160,190,240,.06)',-2,-9.6+i*2,36,.4);
 fillc(g,'#2c3036',14,13,4,1.4);
};
OP.term=(g,R)=>{shE(g,16,28,12,2.6,.45);g.fillStyle='#15171a';rr(g,3,12,26,15,1);g.fill();fillc(g,'#24282d',3,12,26,.7);
 for(let i=0;i<8;i++)fillc(g,'#262a30',5+i*2.8,22,2,1.4);
 g.fillStyle='#0a0b0d';rr(g,6,0,20,13,1.4);g.fill();g.fillStyle=rg(g,16,6.5,1,11,[[0,'#24364e'],[1,'#0f1520']]);g.fillRect(7.2,1.2,17.6,10.4);
 for(let i=0;i<4;i++)fillc(g,'rgba(200,215,240,.4)',8.6,2.8+i*2.2,6+R()*8,.45);glassFill(g,7.2,1.2,17.6,10.4,.7);
};
OP.recorder=(g,R)=>{shE(g,16,26,13,2.6,.45);g.fillStyle='#2c2e32';rr(g,4,10,24,15,1.4);g.fill();fillc(g,'#3c4044',4,10,24,.7);
 [[10.5,16],[21.5,16]].forEach(q=>{g.fillStyle='#16181a';g.beginPath();g.arc(q[0],q[1],4.4,0,Math.PI*2);g.fill();g.strokeStyle='#4a4e54';g.lineWidth=.5;g.beginPath();g.arc(q[0],q[1],3.6,0,Math.PI*2);g.stroke();
  for(let i=0;i<3;i++){const a=i*2.09;ln(g,'#4a4e54',.6,[[q[0],q[1]],[q[0]+Math.cos(a)*3.4,q[1]+Math.sin(a)*3.4]]);}bolt(g,q[0],q[1],'#8a8e94');});
 ln(g,'#5a4a3a',.4,[[10.5,11.6],[21.5,11.6]]);for(let i=0;i<4;i++)fillc(g,'#5a5e64',7+i*5,22.4,3,1.4);fillc(g,'#c8322d',26,11.4,.8,.8);
};
OP.tank=(g,R)=>{shE(g,16,30,11,2.6,.45);fillc(g,'#15171a',4,25,24,5);fillc(g,'#24282d',4,25,24,.7);fillc(g,'#15171a',5,-12,22,3);
 g.fillStyle=lg(g,0,-9,0,25,[[0,'rgba(150,200,225,.14)'],[1,'rgba(150,200,225,.38)']]);g.fillRect(6,-9,20,34);
 g.fillStyle='rgba(20,24,30,.75)';g.beginPath();g.ellipse(16,-1,2.4,2.8,0,0,Math.PI*2);g.fill();g.beginPath();g.moveTo(12.6,3);g.quadraticCurveTo(16,1,19.4,3);g.lineTo(18.6,17);g.lineTo(13.4,17);g.closePath();g.fill();
 for(let i=0;i<7;i++){g.fillStyle='rgba(230,245,255,.5)';g.beginPath();g.arc(8+R()*16,-6+R()*28,.3+R()*.5,0,Math.PI*2);g.fill();}
 glassFill(g,6,-9,20,34,1.6);g.strokeStyle='rgba(200,225,245,.55)';g.lineWidth=.5;g.strokeRect(6,-9,20,34);fillc(g,'#4a7fd4',22,26.4,2,.8);
};
OP.codepad=(g,R,o,st)=>{fillc(g,'rgba(0,0,0,.35)',22.6,7.6,20,17);fillc(g,'#111',22,7,20,16.4);fillc(g,'#2a2a2a',22.6,7.6,18.8,15.2);
 fillc(g,'#0a0a0a',24,9,16,3);fillc(g,st==='k'?'#d8b13a':'#5a4c18',24.6,9.8,6,1.4);
 for(let i=0;i<4;i++)for(let j=0;j<2;j++){fillc(g,'#4a4a4a',24.4+i*4,13.6+j*4,3,2.6);fillc(g,'#5c5c5c',24.4+i*4,13.6+j*4,3,.5);}
};
OP.irondoor=(g,R,o,st)=>{const W=96;
 fillc(g,'#0b0b0b',-6,-44,W+12,76);
 g.fillStyle=lg(g,-2,0,W+2,0,[[0,'#433d3a'],[.5,'#3a3532'],[1,'#2e2a28']]);g.fillRect(-2,-40,W+4,72);
 for(let i=0;i<W+4;i+=8){fillc(g,'#c8322d',-2+i,-40,4,4);fillc(g,'#1a1a1a',2+i,-40,4,4);}
 fillc(g,'#26221f',W/2-1,-36,2,68);fillc(g,'#4e4743',W/2+1,-36,.5,68);
 for(let i=0;i<9;i++){bolt(g,3,-32+i*7.4,'#6a625e');bolt(g,W-3,-32+i*7.4,'#6a625e');bolt(g,W/2-4,-32+i*7.4,'#5a5350');bolt(g,W/2+4,-32+i*7.4,'#5a5350');}
 fillc(g,'#d9d6cf',W/2-30,-30,60,12);fillc(g,'#bdb9b0',W/2-30,-19,60,1);tx(g,'EMERGENCY EXIT',W/2,-22,6.4,'#c8322d');
 fillc(g,'#1e1b19',W/2-36,-13,72,7);tx(g,'WARNING · OPENING THIS DOOR WILL ERASE ALL ARCHIVED RECORDS',W/2,-8.2,2.6,'#d9d6cf');
 fillc(g,'#6a6560',10,4,W-20,3);fillc(g,'#8a847e',10,4,W-20,.8);fillc(g,'#4a4542',10,7,W-20,.8);
 g.fillStyle=lg(g,0,10,0,32,[[0,'rgba(80,64,50,0)'],[1,'rgba(80,64,50,.5)']]);g.fillRect(-2,10,W+4,22);
 speck(g,R,-2,-40,W+4,72,220,66,24);
 if(st==='s')for(let i=0;i<3;i++){fillc(g,'#5a1c1a',-2,-30+i*16,W+4,3);fillc(g,'#7a2a26',-2,-30+i*16,W+4,.8);}
};
OP.clock=(g,R,o)=>{const cx=16,cy=o.pole?-6:12;
 if(o.pole){shE(g,16,28.5,6,1.8,S.area==='nl'?.1:.4);g.fillStyle=lg(g,14.6,0,18,0,[[0,'#c3cad8'],[1,'#7d8699']]);g.fillRect(14.6,0,3.2,28);fillc(g,'#7d8699',11,26,10,3);fillc(g,'#a9b2c4',11,26,10,.8);fillc(g,'#7d8699',13.6,2,5,2);}
 g.fillStyle='rgba(0,0,0,.12)';g.beginPath();g.arc(cx+.6,cy+.8,10,0,Math.PI*2);g.fill();
 g.fillStyle=o.rim||'#f4b6c2';g.beginPath();g.arc(cx,cy,10,0,Math.PI*2);g.fill();
 g.fillStyle=rg(g,cx-2,cy-2,1,9,[[0,'#ffffff'],[1,'#ecebe6']]);g.beginPath();g.arc(cx,cy,8.2,0,Math.PI*2);g.fill();
 for(let i=0;i<12;i++){const a=i/12*Math.PI*2;const l=i%3===0?1.6:.8;ln(g,'#4a4a52',i%3===0?.6:.35,[[cx+Math.cos(a)*7,cy+Math.sin(a)*7],[cx+Math.cos(a)*(7-l),cy+Math.sin(a)*(7-l)]]);}
 const ha=((o.h%12)+o.m/60)/12*Math.PI*2-Math.PI/2,ma=o.m/60*Math.PI*2-Math.PI/2;g.lineCap='round';
 ln(g,'#2a2a33',1,[[cx,cy],[cx+Math.cos(ha)*4.2,cy+Math.sin(ha)*4.2]]);ln(g,'#2a2a33',.6,[[cx,cy],[cx+Math.cos(ma)*6.4,cy+Math.sin(ma)*6.4]]);g.lineCap='butt';
 bolt(g,cx,cy,'#c8322d');g.fillStyle='rgba(255,255,255,.35)';g.beginPath();g.ellipse(cx-3,cy-3.6,3.2,1.6,-.6,0,Math.PI*2);g.fill();
};
OP.tower=(g,R)=>{const W=64;shE(g,32,31,30,3.4,.12);
 g.fillStyle=lg(g,10,0,54,0,[[0,'#e2d4f6'],[.6,'#d2c0ef'],[1,'#b9a3e0']]);g.fillRect(10,-44,44,76);
 for(let yy=-44;yy<32;yy+=3)for(let xx=10+((yy/3)%2?3:0);xx<54;xx+=6)fillc(g,'rgba(255,255,255,.22)',xx,yy,5.4,.35);
 g.fillStyle='#bfa6e3';g.beginPath();g.moveTo(5,-44);g.lineTo(32,-66);g.lineTo(59,-44);g.closePath();g.fill();
 g.fillStyle='#a88bd6';g.beginPath();g.moveTo(32,-66);g.lineTo(59,-44);g.lineTo(32,-44);g.closePath();g.fill();
 fillc(g,'#f5f0fc',5,-44.6,54,1.6);fillc(g,'#ffffff',30,-70,4,5);g.fillStyle='#ffd1b3';g.beginPath();g.arc(32,-71,2,0,Math.PI*2);g.fill();
 g.fillStyle='#8f7ac2';g.beginPath();g.arc(32,-24,15,0,Math.PI*2);g.fill();g.fillStyle=rg(g,29,-27,1,14,[[0,'#ffffff'],[1,'#efeaf6']]);g.beginPath();g.arc(32,-24,13.4,0,Math.PI*2);g.fill();
 for(let i=0;i<12;i++){const a=i/12*Math.PI*2;ln(g,'#6c5a9a',i%3===0?.8:.4,[[32+Math.cos(a)*12,-24+Math.sin(a)*12],[32+Math.cos(a)*(i%3===0?9.6:10.8),-24+Math.sin(a)*(i%3===0?9.6:10.8)]]);}
 g.fillStyle='#ffffff';rr(g,25,6,14,26,6);g.fill();g.fillStyle='#bfd0f6';rr(g,27,8,10,24,5);g.fill();fillc(g,'#ffffff',31.6,8,.8,24);
 [[16,-6],[42,-6]].forEach(q=>{fillc(g,'#ffffff',q[0]-1,q[1]-1,8,10);fillc(g,'#cfe3f7',q[0],q[1],6,8);fillc(g,'#ffffff',q[0]+2.7,q[1],.6,8);});
};
OP.schooldoor=(g,R)=>{fillc(g,'#ece7dd',0,0,32,32);fillc(g,'#d9d3c7',0,0,32,2);fillc(g,'#ffffff',0,0,32,.6);
 fillc(g,'#7f97c2',3,4,26,3.6);tx(g,'한결중학교',16,6.8,2.4,'#ffffff');
 fillc(g,'#ffffff',5,9,22,23);
 [[6,10],[16.4,10]].forEach(q=>{g.fillStyle=lg(g,q[0],q[1],q[0]+9.6,32,[[0,'#cfe3f7'],[1,'#8fa9d6']]);g.fillRect(q[0],q[1],9.6,22);fillc(g,'#ffffff',q[0],q[1]+8,9.6,.8);glassFill(g,q[0],q[1],9.6,22,1.3);});
 fillc(g,'#c8c3b8',15.4,10,1.2,22);fillc(g,'#a9a59c',13.4,19,1,4);fillc(g,'#a9a59c',17.6,19,1,4);
};
OP.kiosk=(g,R)=>{shE(g,16,28,14,3.4,.1);
 g.fillStyle=lg(g,4,0,28,0,[[0,'#cdeedd'],[1,'#a6d8bf']]);g.fillRect(4,-6,24,34);
 for(let yy=-6;yy<28;yy+=3)fillc(g,'rgba(255,255,255,.2)',4,yy,24,.4);
 g.fillStyle='#8fcfb3';g.beginPath();g.moveTo(1,-6);g.lineTo(16,-13);g.lineTo(31,-6);g.closePath();g.fill();fillc(g,'#ffffff',1,-6.6,30,1.4);
 fillc(g,'#ffffff',10.6,8,10.8,20);g.fillStyle='#e9f7ef';g.fillRect(11.6,9,8.8,19);fillc(g,'#8fcfb3',18.4,17,1.2,1.2);
 fillc(g,'#ffffff',6,0,7,6);fillc(g,'#cfe3f7',6.8,.8,5.4,4.4);glassFill(g,6.8,.8,5.4,4.4,1.3);
 g.fillStyle='#f4b6c2';for(let i=0;i<3;i++){g.beginPath();g.arc(21+i*2.4,26.4,1.1,0,Math.PI*2);g.fill();}
};
OP.upstair=OP.downstair=(g,R,o)=>{fillc(g,'#ffffff',4,4,24,28);fillc(g,'#e6e1d6',4,4,24,1.4);fillc(g,'#f6f3ed',6,7,20,25);
 g.fillStyle=lg(g,0,7,0,32,[[0,'#eef3fb'],[1,'#cfdcf2']]);g.fillRect(7,8,18,24);
 for(let i=0;i<5;i++)fillc(g,'rgba(120,140,180,.18)',7,10+i*4.6,18,.6);
 g.fillStyle='#8f7ac2';g.beginPath();if(o.t==='upstair'){g.moveTo(16,12);g.lineTo(21,18);g.lineTo(11,18);}else{g.moveTo(16,24);g.lineTo(21,18);g.lineTo(11,18);}g.closePath();g.fill();
 fillc(g,'#8f7ac2',14.6,o.t==='upstair'?18:12,2.8,6);
};
OP.hallexit=(g,R)=>{g.fillStyle='#d9c7a3';rr(g,4,19,24,9,1.2);g.fill();for(let i=0;i<6;i++)fillc(g,'#c4b089',6+i*3.6,20,.6,7);fillc(g,'#ffffff',8,21.4,16,4);tx(g,'EXIT',16,24.6,2.4,'#b9a3e0');};
OP.pedestal=(g,R)=>{shE(g,16,28,10,2.4,.12);g.fillStyle=lg(g,8,0,24,0,[[0,'#ffffff'],[1,'#e6e1d6']]);g.fillRect(9,13,14,15);fillc(g,'#ffffff',7,11,18,2.4);fillc(g,'#ffffff',7,27,18,2);
 for(let i=0;i<4;i++)fillc(g,'rgba(0,0,0,.05)',11+i*3,14,.8,13);
 g.fillStyle='#8a6f4d';rr(g,9,4,14,7.4,.8);g.fill();g.fillStyle='#e9dcc4';g.fillRect(10,4.6,12,5.8);fillc(g,'#8a6f4d',15.6,4.6,.8,5.8);fillc(g,'#d8b13a',11,5.6,3,.5);};
OP.chair31=(g,R)=>{shE(g,16,26.5,9,2.5,.12);fillc(g,'#d6d3cb',9,19,1,8);fillc(g,'#d6d3cb',22,19,1,8);
 g.fillStyle='#ffffff';rr(g,8,3,16,7,2);g.fill();fillc(g,'#ece9e2',8,9,16,1);tx(g,'기록자',16,7.6,2.2,'#2a2a33');
 g.fillStyle='#ffffff';rr(g,7.5,14.5,17,7,2);g.fill();fillc(g,'#ece9e2',7.5,20.5,17,1);fillc(g,'rgba(0,0,0,.08)',10,10,1.2,5);fillc(g,'rgba(0,0,0,.08)',20.8,10,1.2,5);};
function figure(g,o,pal){const x=16,y=30;
 shE(g,x,y,7,2.2,pal.sh);
 fillc(g,pal.leg,x-4.6,y-9,3.6,9);fillc(g,pal.leg,x+1,y-9,3.6,9);fillc(g,pal.shoe,x-5,y-1.6,4.4,1.8);fillc(g,pal.shoe,x+.6,y-1.6,4.4,1.8);
 g.fillStyle=lg(g,x-7,0,x+7,0,[[0,pal.bodyL],[1,pal.bodyD]]);rr(g,x-7,y-21,14,13.4,2);g.fill();
 fillc(g,pal.bodyD,x-.4,y-20,.8,11);fillc(g,'rgba(0,0,0,.15)',x-7,y-9,14,1.2);
 fillc(g,pal.arm,x-8.8,y-19.4,2.6,9);fillc(g,pal.arm,x+6.2,y-19.4,2.6,9);fillc(g,pal.skin,x-8.8,y-10.6,2.6,1.8);fillc(g,pal.skin,x+6.2,y-10.6,2.6,1.8);
 g.fillStyle=pal.skin;rr(g,x-4.6,y-30,9.2,9.4,2);g.fill();fillc(g,'rgba(0,0,0,.08)',x-4.6,y-21.8,9.2,1);
 g.fillStyle=pal.hair;rr(g,x-5,y-31.2,10,4.6,2);g.fill();fillc(g,pal.hair,x-5,y-28.6,1.6,4);fillc(g,pal.hair,x+3.4,y-28.6,1.6,4);
 if(pal.eyes){fillc(g,'#1a1a1a',x-2.4,y-25.6,1,1.8);fillc(g,'#1a1a1a',x+1.4,y-25.6,1,1.8);fillc(g,'rgba(255,255,255,.9)',x-2.2,y-25.4,.4,.4);fillc(g,'rgba(255,255,255,.9)',x+1.6,y-25.4,.4,.4);}
 if(pal.extra)pal.extra(g,x,y);
}
OP.person=(g,R,o)=>{const seo=o.id==='seoyun';
 figure(g,o,{sh:.1,leg:'#3a3a44',shoe:'#22222a',bodyL:lighten(o.c,1.25),bodyD:o.c,arm:lighten(o.c,.9),skin:'#f1dccb',hair:seo?'#2a2a33':'#6b5a4e',eyes:1,
  extra:seo?(g,x,y)=>{fillc(g,'#e89aa8',x-6.6,y-15,13.2,2);fillc(g,'#ffffff',x-3,y-20.6,6,2.4);g.fillStyle='#e89aa8';g.beginPath();g.moveTo(x,y-18.6);g.lineTo(x-1.4,y-16);g.lineTo(x+1.4,y-16);g.closePath();g.fill();fillc(g,'#d8b13a',x+6.4,y-11.8,1.8,1.4);}:null});
};
OP.ghost=(g,R,o)=>{g.globalAlpha=.85;figure(g,o,{sh:0,leg:'#8aa6d6',shoe:'#7a96c6',bodyL:'#d0e0fa',bodyD:'#9cb8e8',arm:'#b4cbf2',skin:'#dfe9fb',hair:'#7d9ad0',eyes:0,
  extra:(g,x,y)=>{fillc(g,'#ffffff',x-3,y-18,6,1.6);}});g.globalAlpha=1;};
OP.coat=(g,R,o)=>{figure(g,o,{sh:.2,leg:'#1a1a1a',shoe:'#0e0e0e',bodyL:'#ffffff',bodyD:'#cfd6e4',arm:'#e2e8f2',skin:'#e2ddd3',hair:'#1a1a1a',eyes:0,
  extra:(g,x,y)=>{g.fillStyle='#1a1a1a';rr(g,x-5,y-31.2,10,9.4,2);g.fill();for(let i=0;i<5;i++)fillc(g,'rgba(255,255,255,.55)',x-4.4+R()*8,y-30+R()*8,2.4,.4);fillc(g,'#8c93a0',x+6.4,y-16,3,5);fillc(g,'#5c5850',x+6.6,y-15.4,2.6,4);}});};

/* ================= 2칸 자동차 (고화질) ================= */
const CAR_DEFS=[[5,14,'h'],[10,15,'h'],[27,13,'h'],[35,15,'h'],[14,13,'h'],[20,8,'v'],[19,23,'v']];
const CARS=CAR_DEFS.map(d=>({x:d[0],y:d[1],d:d[2]}));
CARS.forEach(c=>{const g=MAPS.city.g;g[c.y][c.x]='c';if(c.d==='h')g[c.y][c.x+1]='c';else g[c.y+1][c.x]='c';});
const CARC={},CSC=2;
function carRng(c,k){return rng(Math.imul(c.x+13,2654435761)^Math.imul(c.y+7,40503)^(k||0));}
function carModel(c){const R=carRng(c,1);const v=60+Math.floor(R()*55),tint=[(R()-.5)*8,(R()-.5)*6,(R()-.5)*8];
 return {base:v,tint,type:['sedan','hatch','sedan','van','hatch'][Math.floor(R()*5)],flip:R()<.5,flat:R()<.45,brokenSide:R()<.5,crackFront:R()<.6,rust:.4+R()*.6,rear:R()<.45,door:R()<.18};}
function ctone(m,f,add){const r=Math.max(0,Math.min(255,Math.round((m.base+(add||0))*f+m.tint[0]))),g=Math.max(0,Math.min(255,Math.round((m.base+(add||0))*f+m.tint[1]))),b=Math.max(0,Math.min(255,Math.round((m.base+(add||0))*f+m.tint[2])));return 'rgb('+r+','+g+','+b+')';}
function rust(g,R,x,y,w,h,n,a){for(let i=0;i<n;i++){g.fillStyle='rgba('+(78+R()*14|0)+','+(60+R()*10|0)+','+(46+R()*8|0)+','+(a*(.5+R()*.5)).toFixed(2)+')';g.beginPath();g.ellipse(x+R()*w,y+R()*h,.6+R()*2.4,.4+R()*1.6,R()*3,0,Math.PI*2);g.fill();}}
function tire(g,cx,cy,rx,ry,flat){g.fillStyle='#0b0b0b';g.beginPath();g.ellipse(cx,cy+(flat?.6:0),rx*(flat?1.12:1),ry*(flat?.82:1),0,0,Math.PI*2);g.fill();
 g.fillStyle='#1c1c1c';g.beginPath();g.ellipse(cx,cy,rx*.62,ry*.62,0,0,Math.PI*2);g.fill();
 g.fillStyle=rg(g,cx-.6,cy-.6,.2,rx*.55,[[0,'#7a7a78'],[1,'#3a3a39']]);g.beginPath();g.ellipse(cx,cy,rx*.5,ry*.5,0,0,Math.PI*2);g.fill();
 for(let i=0;i<5;i++){const a=i/5*Math.PI*2;ln(g,'#2a2a2a',.35,[[cx,cy],[cx+Math.cos(a)*rx*.45,cy+Math.sin(a)*ry*.45]]);}bolt(g,cx,cy,'#8a8a88');
 ln(g,'rgba(255,255,255,.08)',.4,[[cx-rx*.8,cy-ry*.3],[cx-rx*.5,cy-ry*.8]]);}
/* 옆모습이 보이는 가로 차 (64x32 칸, 위에서 비스듬히) */
function paintCarSide(g,R,m){
 const L=m.type==='van';
 shE(g,32,29,31,4.6,.6);
 // far wheels peeking
 fillc(g,'#0a0a0a',10,8,7,3);fillc(g,'#0a0a0a',47,8,7,3);
 // top surfaces
 const topY=L?3:6;
 g.fillStyle=ctone(m,1.05,8);g.beginPath();g.moveTo(5,17);g.quadraticCurveTo(4,9,10,8);g.lineTo(56,8);g.quadraticCurveTo(61,9,61,17);g.closePath();g.fill();
 g.fillStyle=lg(g,0,8,0,17,[[0,ctone(m,1.15,10)],[1,ctone(m,.95)]]);g.beginPath();g.moveTo(5.5,16.6);g.quadraticCurveTo(5,9.6,10.4,8.6);g.lineTo(55.6,8.6);g.quadraticCurveTo(60.4,9.6,60.4,16.6);g.closePath();g.fill();
 // hood seam & trunk seam
 ln(g,ctone(m,.7),.35,[[17,9],[16,16.4]]);if(m.type==='sedan')ln(g,ctone(m,.7),.35,[[49,9],[50,16.4]]);
 // cabin
 const cx0=18,cx1=m.type==='sedan'?47:L?58:52;
 g.fillStyle=ctone(m,.9);g.beginPath();g.moveTo(cx0,15.4);g.lineTo(cx0+4,topY);g.lineTo(cx1-(L?1:5),topY);g.lineTo(cx1,15.4);g.closePath();g.fill();
 // windshield (front, slanted)
 g.fillStyle=lg(g,cx0,0,cx0+6,0,[[0,'#2a2e31'],[1,'#121416']]);g.beginPath();g.moveTo(cx0,15);g.lineTo(cx0+4.2,topY+.6);g.lineTo(cx0+7,topY+.6);g.lineTo(cx0+5,15);g.closePath();g.fill();
 g.fillStyle='rgba(255,255,255,.16)';g.beginPath();g.moveTo(cx0+1.4,13.6);g.lineTo(cx0+4.6,topY+1.4);g.lineTo(cx0+5.6,topY+1.4);g.lineTo(cx0+2.6,13.6);g.closePath();g.fill();
 if(m.crackFront){g.strokeStyle='rgba(220,220,220,.42)';g.lineWidth=.22;const kx=cx0+3.4,ky=topY+4;for(let i=0;i<8;i++){const a=R()*6.28,l=1+R()*2.6;g.beginPath();g.moveTo(kx,ky);g.lineTo(kx+Math.cos(a)*l,ky+Math.sin(a)*l*.8);g.stroke();}}
 // roof
 g.fillStyle=lg(g,0,topY,0,topY+3,[[0,ctone(m,1.25,14)],[1,ctone(m,1.05,6)]]);g.fillRect(cx0+7,topY,cx1-cx0-(L?8:12),2.4);
 // rear window
 if(!L){g.fillStyle='#141618';g.beginPath();g.moveTo(cx1-5.4,topY+.6);g.lineTo(cx1-1.6,topY+.6);g.lineTo(cx1,15);g.lineTo(cx1-3.6,15);g.closePath();g.fill();}
 // side window band
 const wy0=topY+2.4,wy1=15.4;
 g.fillStyle=lg(g,0,wy0,0,wy1,[[0,'#1e2124'],[1,'#0f1012']]);g.beginPath();g.moveTo(cx0+5.4,wy1);g.lineTo(cx0+7.4,wy0);g.lineTo(cx1-(L?2:6),wy0);g.lineTo(cx1-(L?1:3.6),wy1);g.closePath();g.fill();
 const bp=(cx0+cx1)/2;fillc(g,ctone(m,.75),bp-.7,wy0,1.4,wy1-wy0);if(L)fillc(g,ctone(m,.75),cx1-12,wy0,1.2,wy1-wy0);
 g.fillStyle='rgba(255,255,255,.1)';g.beginPath();g.moveTo(cx0+8.4,wy1-.6);g.lineTo(cx0+9.6,wy0+.6);g.lineTo(cx0+13,wy0+.6);g.lineTo(cx0+11.8,wy1-.6);g.closePath();g.fill();
 if(m.brokenSide){const sx=bp+1.4,sw2=(cx1-(L?2:6))-sx;fillc(g,'#060606',sx,wy0+.3,sw2-.4,wy1-wy0-.6);g.fillStyle='rgba(170,175,180,.35)';g.beginPath();g.moveTo(sx,wy0+.3);g.lineTo(sx+sw2*.5,wy0+.3);g.lineTo(sx+sw2*.15,wy1-1);g.closePath();g.fill();
  g.beginPath();g.moveTo(sx+sw2-.4,wy1-.4);g.lineTo(sx+sw2*.6,wy1-.4);g.lineTo(sx+sw2-.4,wy0+2);g.closePath();g.fill();}
 // mirror
 g.fillStyle=ctone(m,.7);rr(g,cx0+3.4,13.6,2.6,2,.6);g.fill();
 // side body panel
 g.fillStyle=lg(g,0,15.4,0,27,[[0,ctone(m,1.1,6)],[.25,ctone(m,1)],[.75,ctone(m,.82)],[1,ctone(m,.62)]]);
 g.beginPath();g.moveTo(3,18);g.quadraticCurveTo(3,15.4,6,15.4);g.lineTo(58,15.4);g.quadraticCurveTo(61.6,15.4,61.6,18.6);g.lineTo(61.6,24.6);g.quadraticCurveTo(61.6,27,59,27);g.lineTo(5,27);g.quadraticCurveTo(2.6,27,2.6,24.6);g.closePath();g.fill();
 fillc(g,ctone(m,1.3,10),5,15.6,54,.5);
 ln(g,'rgba(255,255,255,.12)',.4,[[6,19.4],[58,19.4]]);ln(g,'rgba(0,0,0,.25)',.4,[[6,20],[58,20]]);
 // wheel arches
 [[13,25.4],[51,25.4]].forEach(w=>{g.fillStyle='#090909';g.beginPath();g.arc(w[0],w[1]+1.4,6.2,Math.PI,0);g.closePath();g.fill();});
 // door seams/handles
 const ds=L?[cx0+3,bp,cx1-12]:[cx0+3,bp,cx1-1];ds.forEach(d=>ln(g,'rgba(0,0,0,.45)',.35,[[d,15.6],[d+.4,25.4]]));
 [[bp-4.4,18.2],[cx1-5,18.2]].forEach(h=>{fillc(g,ctone(m,.6),h[0],h[1],2.6,.9);fillc(g,ctone(m,1.4,20),h[0],h[1],2.6,.3);});
 if(m.door){g.fillStyle='#0a0a0a';g.fillRect(cx0+3.4,15.8,bp-cx0-3.8,9.4);g.fillStyle=ctone(m,.9);g.beginPath();g.moveTo(cx0+3,15.6);g.lineTo(cx0-2,18);g.lineTo(cx0-2,28.4);g.lineTo(cx0+3,26);g.closePath();g.fill();}
 // lights & bumpers
 g.fillStyle='#8c8b86';rr(g,2.8,17,2.6,3,.8);g.fill();fillc(g,'rgba(255,255,255,.4)',3.2,17.4,1,1);
 g.fillStyle='#4a3434';rr(g,59.4,17,2.4,3,.8);g.fill();
 fillc(g,'#1a1a1a',2.2,23,5.6,2.6);fillc(g,'#1a1a1a',57.2,23,5.6,2.6);fillc(g,'#3a3a3a',2.2,23,5.6,.5);fillc(g,'#3a3a3a',57.2,23,5.6,.5);
 // wheels
 tire(g,13,26.4,4.6,4,m.flat&&R()<.5);tire(g,51,26.4,4.6,4,m.flat);
 // damage
 rust(g,R,4,21,56,6,10,m.rust*.55);rust(g,R,6,9,50,6,5,m.rust*.35);
 for(let i=0;i<3;i++)if(R()<.5){const dx=8+R()*48,dy=17+R()*7;g.fillStyle='rgba(0,0,0,.25)';g.beginPath();g.ellipse(dx,dy,2+R()*2,1+R(),0,0,Math.PI*2);g.fill();ln(g,'rgba(255,255,255,.12)',.3,[[dx-1.6,dy-1],[dx+1.6,dy-1.2]]);}
 for(let i=0;i<4;i++)if(R()<.5){const sx=6+R()*50,sy=16+R()*9;ln(g,'rgba(210,210,205,.25)',.22,[[sx,sy],[sx+3+R()*6,sy+(R()-.5)*1.6]]);}
 speck(g,R,6,9,11,7,22,m.base+18,12);speck(g,R,49,9,10,7,18,m.base+18,12);
 for(let i=0;i<5;i++){g.fillStyle=grayc(40+R()*20);g.beginPath();g.ellipse(6+R()*12,9+R()*6,1.1,.5,R()*3,0,Math.PI*2);g.fill();}
 g.fillStyle=lg(g,0,22,0,27,[[0,'rgba(70,64,56,0)'],[1,'rgba(70,64,56,.35)']]);g.fillRect(3,22,58,5);
}
/* 앞(또는 뒤)이 보이는 세로 차 (32x64 칸) */
function paintCarFront(g,R,m){
 shE(g,16,61,15.4,4,.6);
 fillc(g,'#0a0a0a',1.6,10,3,8);fillc(g,'#0a0a0a',27.4,10,3,8);fillc(g,'#0a0a0a',1.6,42,3,8);fillc(g,'#0a0a0a',27.4,42,3,8);
 g.fillStyle=lg(g,3,0,29,0,[[0,ctone(m,1.12,8)],[.5,ctone(m,1.02)],[1,ctone(m,.82)]]);rr(g,3,3,26,52,5);g.fill();
 fillc(g,ctone(m,1.3,12),5,3.4,22,.5);
 // rear end
 fillc(g,ctone(m,.85),6,5,20,7.6);ln(g,ctone(m,.65),.35,[[6,12.6],[26,12.6]]);
 // rear window
 g.fillStyle=lg(g,0,12.8,0,19,[[0,'#16181a'],[1,'#202326']]);g.beginPath();g.moveTo(7,13.4);g.lineTo(25,13.4);g.lineTo(23.6,19.2);g.lineTo(8.4,19.2);g.closePath();g.fill();
 // roof
 g.fillStyle=lg(g,8,0,24,0,[[0,ctone(m,1.3,14)],[1,ctone(m,1.05,4)]]);rr(g,8.2,19.4,15.6,13.4,2);g.fill();
 speck(g,R,9,20,14,12,26,m.base+20,12);
 // side windows strips
 fillc(g,'#121416',5.6,19.4,2.4,14.8);fillc(g,'#121416',24,19.4,2.4,14.8);
 // windshield
 g.fillStyle=lg(g,0,33,0,42,[[0,'#24282b'],[1,'#101214']]);g.beginPath();g.moveTo(8.4,33);g.lineTo(23.6,33);g.lineTo(26.4,41.6);g.lineTo(5.6,41.6);g.closePath();g.fill();
 g.fillStyle='rgba(255,255,255,.14)';g.beginPath();g.moveTo(9.4,33.8);g.lineTo(13,33.8);g.lineTo(10.6,40.8);g.lineTo(7.2,40.8);g.closePath();g.fill();
 if(m.crackFront){g.strokeStyle='rgba(220,220,220,.42)';g.lineWidth=.22;const kx=18+R()*4,ky=36+R()*3;for(let i=0;i<9;i++){const a=R()*6.28,l=1.4+R()*3.4;g.beginPath();g.moveTo(kx,ky);g.lineTo(kx+Math.cos(a)*l,ky+Math.sin(a)*l*.7);g.stroke();}}
 fillc(g,ctone(m,.7),3.4,34,2.6,1.6);fillc(g,ctone(m,.7),26,34,2.6,1.6);
 // hood
 g.fillStyle=lg(g,0,41.6,0,52,[[0,ctone(m,1.18,8)],[1,ctone(m,.98)]]);g.beginPath();g.moveTo(5.4,41.8);g.lineTo(26.6,41.8);g.lineTo(28,52);g.lineTo(4,52);g.closePath();g.fill();
 ln(g,ctone(m,.72),.3,[[11,42.4],[10.4,51.6]]);ln(g,ctone(m,.72),.3,[[21,42.4],[21.6,51.6]]);
 for(let i=0;i<6;i++){g.fillStyle=grayc(40+R()*20);g.beginPath();g.ellipse(7+R()*18,43+R()*8,1.1,.5,R()*3,0,Math.PI*2);g.fill();}
 // front face
 g.fillStyle=lg(g,0,52,0,60,[[0,ctone(m,.9)],[1,ctone(m,.6)]]);rr(g,3,51.6,26,8.4,2.4);g.fill();
 if(!m.rear){g.fillStyle='#0f0f0f';rr(g,9,53.4,14,3.2,.8);g.fill();for(let i=0;i<6;i++)fillc(g,'#2a2a2a',9.6+i*2.3,53.8,.5,2.4);
  [[4.4,53],[23.6,53]].forEach(q=>{g.fillStyle=rg(g,q[0]+2,q[1]+1.4,.2,2.6,[[0,'#bdbab2'],[1,'#5a5955']]);rr(g,q[0],q[1],4,2.8,.8);g.fill();});
  if(R()<.5){fillc(g,'#090909',23.6,53,4,2.8);g.fillStyle='rgba(170,175,180,.4)';g.beginPath();g.moveTo(23.8,53.2);g.lineTo(26,53.2);g.lineTo(24,55.4);g.fill();}}
 else{[[4,53],[23,53]].forEach(q=>{g.fillStyle='#4e3636';rr(g,q[0],q[1],5,2.6,.6);g.fill();fillc(g,'rgba(255,255,255,.12)',q[0]+.4,q[1]+.4,1.6,.6);});fillc(g,'#1a1a1a',10,53.4,12,2.6);}
 fillc(g,'#d6d3cb',12,57,8,2);fillc(g,'#7a7872',12.8,57.6,6.4,.6);
 fillc(g,'#161616',2.6,58.4,26.8,2);fillc(g,'#3a3a3a',2.6,58.4,26.8,.5);
 tire(g,4,57.6,2.4,3.4,m.flat);tire(g,28,57.6,2.4,3.4,false);
 rust(g,R,4,44,24,15,10,m.rust*.5);rust(g,R,6,4,20,8,4,m.rust*.35);
 for(let i=0;i<3;i++)if(R()<.5){const sx=5+R()*20,sy=20+R()*30;ln(g,'rgba(210,210,205,.22)',.22,[[sx,sy],[sx+(R()-.5)*3,sy+2+R()*4]]);}
}
function carCanvas(c){
 const key=c.x+','+c.y;if(CARC[key])return CARC[key];
 const m=carModel(c),R=carRng(c,2),h=c.d==='h';
 const W=h?72:40,H=h?44:76,ox=4,oy=h?10:10;
 const cv=document.createElement('canvas');cv.width=W*CSC;cv.height=H*CSC;const g=cv.getContext('2d');g.scale(CSC,CSC);g.translate(ox,oy);
 if(h){if(m.flip){g.translate(64,0);g.scale(-1,1);}paintCarSide(g,R,m);}else paintCarFront(g,R,m);
 return CARC[key]={cv,ox,oy,W,H};
}
function carSideCanvas(c){
 const key='s'+c.x+','+c.y;if(CARC[key])return CARC[key];
 const m=carModel(c),R=carRng(c,3);const cv=document.createElement('canvas');cv.width=64*CSC;cv.height=32*CSC;const g=cv.getContext('2d');g.scale(CSC,CSC);
 paintCarSide(g,R,Object.assign({},m,{door:false}));
 return CARC[key]={cv};
}
function drawCar(c){const k=carCanvas(c);ctx.imageSmoothingEnabled=true;ctx.drawImage(k.cv,c.x*TS-k.ox,c.y*TS-k.oy,k.W,k.H);ctx.imageSmoothingEnabled=false;}
/* ---- 1인칭 나무: 두 장의 교차 평면 (월드에 고정) ---- */
const TREEC={};
function treeR(x,y){return rng(Math.imul(x+71,2654435761)^Math.imul(y+29,97531));}
function treeCanvas(x,y){const key=x+','+y;if(TREEC[key])return TREEC[key];
 const cv=document.createElement('canvas');cv.width=32*3;cv.height=64*3;const g=cv.getContext('2d');g.scale(3,3);g.translate(0,32);paintTree(g,treeR(x,y));return TREEC[key]=cv;}

/* ---- 정적 배경을 8x8칸 덩어리로 미리 그려 두기 (그리기 횟수 대폭 감소) ---- */
const CHK={},CH=8;let CHS=2,CH_AREA=null;
const GLOWC={};function glowSprite(c){if(GLOWC[c])return GLOWC[c];const g0=document.createElement('canvas');g0.width=g0.height=48;const g=g0.getContext('2d');const gr=g.createRadialGradient(24,24,0,24,24,24);gr.addColorStop(0,hexA(c,1));gr.addColorStop(1,hexA(c,0));g.fillStyle=gr;g.fillRect(0,0,48,48);return GLOWC[c]=g0;}
function isStaticTile(t){return t==='#'||t==='B'||t==='r'||(!!TP[t]&&t!=='N');}
function purgeCaches(){const a=S.area,keep=k=>k.indexOf(a)===0;
 [TILEC,WALLC,RUBC,FTEXC].forEach(o=>{for(const k in o)if(!keep(k))delete o[k];});
 for(const k in OBJC)delete OBJC[k];for(const k in CHK)if(k.indexOf(a+':')!==0)delete CHK[k];}
function chunkCanvas(cx,cy){
 const m=MAPS[S.area],x0=cx*CH,y0=cy*CH,x1=Math.min(m.w,x0+CH),y1=Math.min(m.h,y0+CH);
 let sig=(S.past?'p':'n')+(S.flags.power?1:0);for(let y=y0;y<y1;y++)for(let x=x0;x<x1;x++)sig+=tile(x,y);
 const key=S.area+':'+cx+','+cy;let c=CHK[key];if(c&&c.sig===sig)return c.cv;
 const cv2=c?c.cv:document.createElement('canvas');const sz=CH*TS*CHS;if(cv2.width!==sz){cv2.width=sz;cv2.height=sz;}
 const g=cv2.getContext('2d');g.setTransform(1,0,0,1,0,0);g.clearRect(0,0,sz,sz);g.imageSmoothingEnabled=true;
 const put=(cvs,x,y,h,oy)=>g.drawImage(cvs,0,0,cvs.width,cvs.width*(h/TS),(x-x0)*TS*CHS,((y-y0)*TS+(oy||0))*CHS,TS*CHS,h*CHS);
 for(let y=y0;y<y1;y++)for(let x=x0;x<x1;x++){const t=tile(x,y);if(!isStaticTile(t))continue;
  if(t==='#'||t==='B'){if(t==='#'&&!(S.area!=='nl'||true))continue;
   if(t==='B'||S.area!=='nl'){put(wallCanvas(x,y,(t==='B'?tile(x,y+1)!=='B':!isWall(tile(x,y+1)))?'face':'roof'),x,y,TS);}
   else{continue;}}
  else if(t==='r'){put(tileCanvas(S.area==='city'?',':'f',x,y).cv,x,y,TS);}
  else if(t==='T'){const tc=tileCanvas('T',x,y).cv;g.drawImage(tc,0,tc.height/2,tc.width,tc.height/2,(x-x0)*TS*CHS,(y-y0)*TS*CHS,TS*CHS,TS*CHS);}
  else put(tileCanvas(t,x,y).cv,x,y,TS);}
 g.setTransform(CHS,0,0,CHS,-x0*TS*CHS,-y0*TS*CHS);
 for(let y=Math.max(1,y0);y<y1;y++)for(let x=x0;x<x1;x++){const ta=tile(x,y-1);if(!(ta==='#'||ta==='B'))continue;const tb=tile(x,y);if(tb==='#'||tb==='B'||isWall(tb))continue;
  const sg=g.createLinearGradient(0,y*TS,0,y*TS+8);sg.addColorStop(0,S.area==='nl'?'rgba(80,70,110,.16)':'rgba(0,0,0,.38)');sg.addColorStop(1,'rgba(0,0,0,0)');g.fillStyle=sg;g.fillRect(x*TS,y*TS,TS,8);}
 CHK[key]={cv:cv2,sig};return cv2;
}
function drawWorld(x0,y0,x1,y1){
 const wantS=(Z*DPR)>1.6?2:1;if(wantS!==CHS){CHS=wantS;for(const k in CHK)delete CHK[k];}
 if(CH_AREA!==S.area){purgeCaches();CH_AREA=S.area;}
 const m=MAPS[S.area];ctx.imageSmoothingEnabled=true;
 for(let cy=Math.floor(y0/CH);cy<=Math.floor(y1/CH);cy++)for(let cx=Math.floor(x0/CH);cx<=Math.floor(x1/CH);cx++){
  if(cx*CH>=m.w||cy*CH>=m.h)continue;ctx.drawImage(chunkCanvas(cx,cy),cx*CH*TS,cy*CH*TS,CH*TS,CH*TS);}
 ctx.imageSmoothingEnabled=false;
 for(let y=y0;y<=y1;y++)for(let x=x0;x<=x1;x++){const t=tile(x,y),px=x*TS,py=y*TS;
  if(t==='#'&&S.area==='nl'){drawTile(t,x,y);continue;}
  if(!isStaticTile(t)){drawTile(t,x,y);continue;}
  if(t==='r')drawRubbleOn(px,py,h2(x,y));
  else if(t==='T'){ctx.imageSmoothingEnabled=true;ctx.drawImage(treeCanvas(x,y),px,py-32,TS,64);ctx.imageSmoothingEnabled=false;}
  else if(t==='X'){const r=h2(x,y);if(r>.45&&r<.75){const on=(S.flags.power||S.past)&&Math.sin(NOW*4+x*2+y)>0;fr(on?COL.yellow:'#262210',px+25,py+6,2.4,2.4);if(on)fr(hexA(COL.yellow,.25),px+24,py+5,4.4,4.4);}}
  else if(t==='#'&&S.area==='lab'&&!isWall(tile(x,y+1)))fr(labHue(x,y)+'.45)',px,py+11,TS,1.6);
 }
}
function drawTile(t,x,y){
 const px=x*TS,py=y*TS,r=h2(x,y);
 if(TP[t]){blitTile(t,x,y,px,py);
  if(t==='X'&&r>.45&&r<.75){const on=(S.flags.power||S.past)&&Math.sin(NOW*4+x*2+y)>0;fr(on?COL.yellow:'#262210',px+25,py+6,2.4,2.4);if(on)fr(hexA(COL.yellow,.25),px+24,py+5,4.4,4.4);}
  return;}
 switch(t){
  case ',':drawGround(x,y,px,py,r);break;
  case '.':drawRoad(x,y,px,py,r);break;
  case '#':drawWallTile(x,y,px,py,r);break;
  case 'r':blitTile(S.area==='city'?',':'f',x,y,px,py);drawRubbleOn(px,py,r);break;
  case 'c':drawRoad(x,y,px,py,r);fr('#1a1a1a',px+3,py+24,26,4);fr('#474747',px+2,py+7,28,19);fr('#3b3b3b',px+2,py+7,28,3);
   fr('#1c1c1c',px+7,py+10,8,13);fr('#1c1c1c',px+22,py+10,5,13);fr('#555',px+16,py+10,5,13);if(r<.5)fr('#3a3a3a',px+4,py+18,3,4);break;
  case 'T':drawGround(x,y,px,py,r);fr('rgba(0,0,0,.3)',px+8,py+26,16,4);ctx.strokeStyle='#121212';ctx.lineWidth=3;ctx.beginPath();ctx.moveTo(px+16,py+28);ctx.lineTo(px+16,py+8);ctx.stroke();
   ctx.lineWidth=1.5;ctx.beginPath();ctx.moveTo(px+16,py+16);ctx.lineTo(px+6,py+6);ctx.moveTo(px+16,py+12);ctx.lineTo(px+26,py+3);ctx.moveTo(px+16,py+9);ctx.lineTo(px+12,py);ctx.moveTo(px+21,py+7);ctx.lineTo(px+28,py+10);ctx.stroke();break;
  case 'G':drawRoad(x,y,px,py,r);fr('#555',px,py+4,TS,3);for(let i=2;i<TS;i+=6)fr('#6b6b6b',px+i,py+4,2,TS-4);break;
  case 'g':drawRoad(x,y,px,py,r);fr('#6b6b6b',x===19?px:px+TS-4,py,4,TS);break;
  case 'f':drawFloor(x,y,px,py,r);break;
  case 'd':drawFloor(x,y,px,py,r);{const tilt=!S.past&&r<.4?3:0;
   fr(S.past?'#4e4e4b':'#1c1c1b',px+6,py+22,20,4);fr(S.past?'#a3a39e':'#454543',px+5,py+7+tilt,22,15);fr(S.past?'#b5b5b0':'#4f4f4d',px+5,py+7+tilt,22,3);}break;
  case 'E':blitTile(S.area==='factory'?'m':'f',x,y,px,py);fr('rgba(230,230,220,.07)',px,py,TS,TS);break;
  case 'm':drawMetal(x,y,px,py,r);break;
  case 'V':fr('#e9edf5',px,py,TS,TS);if(Math.sin(NOW*1.3+r*40)>.8)fr('rgba(255,255,255,.95)',px+Math.floor(r*28),py+Math.floor((r*97)%28),2,2);break;
  case 'w':fr((x+y)%2?'#f7f5f1':'#f2efe9',px,py,TS,TS);fr('#e6e2da',px,py,TS,1);fr('#e6e2da',px,py,1,TS);if(r<.07)fr(pastel(x*5,y*3),px+12,py+12,5,5);break;
  case 'o':fr('#dcdae6',px,py,TS,TS);if(y===19&&x%2===0)fr('#ffffff',px+4,py+15,24,2);break;
  case 'N':fr('#dcdae6',px,py,TS,TS);if(y%2===0)fr('#ffffff',px+15,py+4,2,24);fr('hsla('+Math.round((NOW*40+y*30)%360)+',80%,75%,.6)',px,py,2,TS);fr('hsla('+Math.round((NOW*40+y*30+180)%360)+',80%,75%,.6)',px+TS-2,py,2,TS);break;
  case 'B':blitWall(x,y,px,py,tile(x,y+1)!=='B'?'face':'roof');break;
  case 'Y':fr((x+y)%2?'#3d3656':'#38324f',px,py,TS,TS);fr('#2f2a44',px,py,TS,1);if(r<.15)fr('#6fd3c8',px,py+6,TS,2);if(r>.9)fr('#f0a882',px+10,py,2,TS);break;
  case 'R':fr((x+y)%2?'#ece6da':'#e6dfd2',px,py,TS,TS);if(tile(x,y-1)==='V')fr('#b9b3a8',px,py,TS,3);if(tile(x+1,y)==='V')fr('#b9b3a8',px+TS-3,py,3,TS);if(tile(x-1,y)==='V')fr('#b9b3a8',px,py,3,TS);if(tile(x,y+1)==='V')fr('#b9b3a8',px,py+TS-3,TS,3);break;
  case 'W':fr((x+y)%2?'#faf3ea':'#f3eadf',px,py,TS,TS);if(x%4===0)fr('#eadbb8',px,py,1,TS);if(y%4===0)fr('#eadbb8',px,py,TS,1);break;
  case 'C':{fr((x+y)%2?'#f7f5f1':'#f2efe9',px,py,TS,TS);const c=PAST[(x+y*3)%PAST.length];fr('rgba(0,0,0,.08)',px+8,py+24,16,3);fr(c,px+8,py+4,16,5);fr(c,px+8,py+12,16,8);fr('rgba(0,0,0,.15)',px+9,py+20,2,5);fr('rgba(0,0,0,.15)',px+21,py+20,2,5);break;}
  case 'n':case 'q':case 'j':drawLabFloor(x,y,px,py,r);if(t!=='n'){fr('#0b0c0e',px,py,TS,TS);fr(t==='q'?COL.red:'#8fa6c8',px,py,2,TS);fr(t==='q'?COL.red:'#8fa6c8',px+TS-2,py,2,TS);}break;
  case 'U':for(let i=0;i<6;i++)fr('rgb('+(62-i*6)+','+(64-i*6)+','+(70-i*6)+')',px,py+(5-i)*5.4,TS,5.4);break;
  case 'S':drawLabFloor(x,y,px,py,r);fr('#0f1113',px+3,py-6,26,TS+4);fr('#1a1d21',px+3,py-6,26,3);for(let i=0;i<6;i++)fr('#23272c',px+6,py-1+i*4.4,20,2);break;
  case 'Q':case 'J':fr('#1b1d20',px,py,TS,TS);fr('#2a2e33',px+2,py+2,28,TS-2);fr(t==='Q'?COL.red:hexA(COL.nuri,.5+.3*Math.sin(NOW*2)),t==='Q'?px+26:px+15,py+12,2,t==='Q'?3:14);break;
  case 'v':drawMetal(x,y,px,py,r);fr('#0f1010',px+6,py+9,20,14);for(let i=0;i<4;i++)fr('#2d2f2f',px+7,py+11+i*3,18,1);break;
  case 'X':{const p=S.past;fr(p?'#8a8d8d':'#393b3b',px,py,TS,TS);fr(p?'#9a9d9d':'#444747',px,py,TS,3);fr('#232525',px,py+TS-3,TS,3);
   fr('#565959',px+3,py+6,2,2);fr('#565959',px+27,py+6,2,2);fr('#565959',px+3,py+24,2,2);fr('#565959',px+27,py+24,2,2);
   if(r>.6)fr(p?'#7a7d7d':'#2e3030',px+12,py,7,TS);
   if(r<.3)for(let i=0;i<TS;i+=6){fr(p?'#b3b3a6':(S.flags.power?'#8a7420':'#3b3414'),px+i,py+12,3,5);}
   if(r>.45&&r<.75)fr((S.flags.power||p)&&Math.sin(NOW*4+x*2+y)>0?COL.yellow:'#262210',px+22,py+8,3,3);
   break;}
  case 'L':fr('#1d1e1f',px,py,TS,TS);fr('#34373a',px+3,py+2,26,TS-2);fr(hexA(COL.nuri,.35+.25*Math.sin(NOW*2)),px+15,py+4,2,TS-6);fr(COL.red,px+24,py+14,2,2);break;
  case 'l':fr('#0d0e0f',px,py,TS,TS);fr('#34373a',px,py,3,TS);fr('#34373a',px+TS-3,py,3,TS);fr(hexA(COL.nuri,.12),px+3,py,TS-6,TS);break;
  case 'K':fr('#1d1e1f',px,py,TS,TS);fr('#303232',px+3,py+2,26,TS-2);fr('#3b3414',px+8,py+8,16,3);fr(COL.red,px+24,py+16,2,2);break;
  case 'k':fr('#0d0e0f',px,py,TS,TS);fr(COL.yellow,px,py,3,TS);fr(COL.yellow,px+TS-3,py,3,TS);break;
  case 'Z':for(let i=0;i<6;i++)fr('rgb('+(58-i*9)+','+(60-i*9)+','+(60-i*9)+')',px,py+i*5.4,TS,5.4);break;
  case 'H':fr('#0c0c0c',px,py,TS,TS);fr('#2b2b2a',px,py,3,TS);fr('#2b2b2a',px+TS-3,py,3,TS);break;
  case 'M':fr('#8a8a86',px,py,TS,TS);fr('#5d5d5a',px,py+TS-5,TS,5);
   ctx.strokeStyle=COL.red;ctx.lineWidth=3;ctx.beginPath();ctx.arc(px+16,py+13,8,0,Math.PI*2);ctx.stroke();
   ctx.strokeStyle='#f4f4f0';ctx.lineWidth=1.5;ctx.beginPath();for(let a=0;a<12;a+=.3){const rr=a*.55;ctx.lineTo(px+16+Math.cos(a)*rr,py+13+Math.sin(a)*rr);}ctx.stroke();
   fr('#2c4f8f',px+2,py+18,3,7);fr('#2c4f8f',px+27,py+18,3,7);fr('#111',px+14,py+TS-5,5,4);break;
  default:fr('#000',px,py,TS,TS);
 }
}

function objGlowColor(o){
 if(o.rec)return has(o.rec)?null:COL[R[o.rec].color];
 switch(o.id){
  case 'keypad':return S.flags.gateOpen?null:COL.yellow;
  case 'fuse':return S.flags.hasFuse?null:COL.yellow;
  case 'console':return S.flags.broadcastDone?null:COL.yellow;
  case 'rubble':return S.flags.knowMural?COL.red:null;
  case 'mural':return S.flags.knowMural?null:COL.red;
  case 'exitdoor':return COL.red;
  case 'hatch':return S.flags.broadcastDone&&!S.flags.factoryIntro?COL.yellow:null;
  case 'lvA':case 'lvB':case 'lvC':return S.flags.power?null:COL.yellow;
  case 'gen':return S.flags.power&&!has('power')?COL.yellow:null;
  case 'device':return S.flags.touched?null:COL.nuri;
  case 'stairs':return S.flags.power?COL.red:null;
  case 'coat':return COL.nuri;
  case 'archive':return !S.flags.archiveOn?COL.nuri:(!S.flags.restored?COL.yellow:null);
  case 'codepad':return has('code')&&!S.flags.codeOK?COL.yellow:null;
  case 'irondoor':return (!S.flags.preserved||has('nlcore'))?COL.red:null;
  case 'tower':return S.flags.roadOpen?null:COL.nuri;
  case 'nphone':return has('phone2')?null:COL.red;
  case 'seoyun':return has('seoyun')&&has('c1702')?null:COL.nuri;
  case 'core':return COL.nuri;
  case 'retgate':return COL.nuri;
  case 'portal':return S.flags.preserved?COL.nuri:null;
  case 'sign':return null;
 }
 if(o.t==='ghost')return COL.blue;
 return null;
}
function drawDesk(px,py){fr('#1c1c1b',px+5,py+22,22,4);fr('#454543',px+4,py+8,24,15);fr('#4f4f4d',px+4,py+8,24,3);}
function drawObj(o,t){
 if(OP[o.t]){
  const px=o.x*TS,py=o.y*TS;let a;
  if(o.t==='ghost')a=.55+.2*Math.sin(t*2+o.x);else if(o.t==='coat')a=.62+.15*Math.sin(NOW*3);else if(o.t==='person')a=.93+.07*Math.sin(t*2+o.x);
  blitObj(o,px,py,a);
  if(o.t==='gen'&&S.flags.power){const an=NOW*8;ctx.strokeStyle='rgba(150,155,155,.75)';ctx.lineWidth=1.3;ctx.beginPath();for(let i=0;i<4;i++){const q=an+i*Math.PI/2;ctx.moveTo(px+16,py+15);ctx.lineTo(px+16+Math.cos(q)*9,py+15+Math.sin(q)*9);}ctx.stroke();
   fr(COL.yellow,px-9,py+5,2.4,2.4);fr('#5c8a4a',px+39,py+5,2.4,2.4);}
  else if(o.t==='terminal'){for(let i=0;i<6;i++){const w2=8+((i*11+Math.floor(NOW*2))%22);fr('rgba(200,218,255,'+(.3+.25*((i+Math.floor(NOW*3))%6===0))+')',px+1,py-8+i*3,w2,.8);}
   if(S.flags.archiveOn&&Math.sin(NOW*4)>0)fr(COL.red,px+29,py-8,2.4,2.4);}
  else if(o.t==='irondoor'){const on=S.flags.preserved||Math.sin(NOW*3)>0;fr(on?COL.red:'#3a1210',px+45,py+11,6,3);if(on)fr(hexA(COL.red,.25),px+43,py+9,10,7);}
  else if(o.t==='tower'){const cx=px+32,cy=py-24;if(S.flags.roadOpen)drawHands(cx,cy,17,2,12);else for(let i=0;i<5;i++){const an=NOW*(0.6+i*.55)*(i%2?1:-1);ctx.strokeStyle=['#e89aa8','#8fcfb3','#8fa9e6','#f2c46f','#2a2a33'][i];ctx.lineWidth=1.2;ctx.beginPath();ctx.moveTo(cx,cy);ctx.lineTo(cx+Math.cos(an)*(7+i),cy+Math.sin(an)*(7+i));ctx.stroke();}}
  else if(o.t==='lever'&&S.past&&o.n){ctx.fillStyle='#dfe9ff';ctx.beginPath();ctx.arc(px+27,py+8,5,0,Math.PI*2);ctx.fill();ctx.fillStyle='#1a2a4a';ctx.font='bold 8px sans-serif';ctx.textAlign='center';ctx.fillText(String(o.n),px+27,py+11);ctx.textAlign='left';}
  else if(o.t==='console'&&S.flags.powered&&Math.random()<.04){fr('rgba(216,177,58,.15)',px+6,py+1,20,7.6);}
  return;
 }
 drawObjLegacy(o,t);
}
function drawObjLegacy(o,t){
 const px=o.x*TS,py=o.y*TS;
 switch(o.t){
  case 'stand':fr('rgba(0,0,0,.35)',px+4,py+25,26,5);fr('#454545',px+4,py+6,24,20);fr('#2e2e2e',px+4,py+22,24,4);fr('#b9b5ac',px+7,py+9,18,11);fr(COL.red,px+7,py+9,18,3);fr('#7a776f',px+9,py+14,14,1);fr('#7a776f',px+9,py+17,10,1);break;
  case 'phone':fr('rgba(0,0,0,.35)',px+4,py+26,26,5);fr('#2f2f2f',px+5,py-12,22,40);fr('#4c4c4c',px+4,py-14,24,4);fr('#151515',px+8,py-8,16,28);fr('#6d6d6d',px+12,py,8,10);fr('#9a9a9a',px+13,py+2,6,2);break;
  case 'carrec':fr('#d6d0c4',px+9,py+14,5,4);break;
  case 'graffiti':ctx.strokeStyle=COL.red;ctx.lineWidth=1.5;ctx.beginPath();ctx.moveTo(px-6,py+12);ctx.lineTo(px+2,py+19);ctx.lineTo(px+8,py+11);ctx.lineTo(px+16,py+20);ctx.lineTo(px+22,py+10);ctx.lineTo(px+30,py+19);ctx.lineTo(px+38,py+12);ctx.stroke();
   ctx.fillStyle=COL.red;ctx.font='bold 6px sans-serif';ctx.fillText('기록은 거짓말을 한다',px-12,py+28);break;
  case 'radio':fr('#1b2020',px+3,py+7,26,19);ctx.strokeStyle='#555';ctx.lineWidth=1;ctx.strokeRect(px+3.5,py+7.5,25,18);fr('#575757',px+8,py+15,16,9);fr(COL.yellow,px+10,py+17,3,3);fr('#333',px+15,py+17,7,1);fr('#333',px+15,py+20,7,1);break;
  case 'busstop':fr('rgba(0,0,0,.35)',px+8,py+26,16,4);fr('#5a5a5a',px+14,py-6,3,33);fr('#a9a59c',px+5,py-12,22,16);ctx.strokeStyle=COL.red;ctx.lineWidth=2;ctx.beginPath();ctx.moveTo(px+13,py-8);ctx.lineTo(px+19,py-2);ctx.moveTo(px+19,py-8);ctx.lineTo(px+13,py-2);ctx.stroke();fr('#777',px+7,py-10,5,1);fr('#777',px+7,py-6,4,1);break;
  case 'mailbox':fr('#3e3e3e',px+8,py+10,16,15);fr('#272727',px+10,py+14,12,2);fr('#cfcac0',px+12,py+11,7,5);break;
  case 'keypad':fr('#262626',px+9,py+10,14,17);for(let i=0;i<3;i++)for(let j=0;j<3;j++)fr('#4a4a4a',px+11+i*4,py+16+j*3,2,2);fr(S.flags.gateOpen?'#6f6f6f':COL.yellow,px+11,py+12,10,2);break;
  case 'book':if(o.desk)drawDesk(px,py);fr('#bdb8ad',px+9,py+10,14,10);fr('#7d786e',px+15,py+10,1,10);break;
  case 'board':fr('#555',px-14,py+3,60,22);fr('#1d221e',px-12,py+5,56,18);for(let i=0;i<4;i++)fr('#9d9d98',px-9,py+8+i*4,40-((i*13)%17),1);break;
  case 'camera':drawDesk(px,py);fr('#343434',px+9,py+6,15,10);fr('#262626',px+9,py+6,15,2);fr(COL.blue,px+22,py+9,4,4);fr('#555',px+12,py+16,8,2);break;
  case 'docs':drawDesk(px,py);fr('#c9c4b9',px+8,py+9,11,13);fr('#b0aba0',px+13,py+11,12,10);fr('#7d786e',px+15,py+14,7,1);fr('#7d786e',px+15,py+17,5,1);break;
  case 'speaker':fr('#3d3d3d',px+9,py+6,14,11);for(let i=0;i<4;i++)fr('#222',px+11,py+8+i*2,10,1);break;
  case 'fuse':fr('#303030',px+2,py+14,28,12);fr('#1d1d1d',px+2,py+24,28,3);if(!S.flags.hasFuse){fr('#4d4d4d',px+10,py+6,12,10);fr(COL.yellow,px+10,py+9,12,2);}break;
  case 'memo':drawDesk(px,py);fr('#e8eef8',px+8,py+9,12,14);fr('#dbe4f3',px+13,py+11,12,11);fr('#9aa4b5',px+15,py+14,7,1);fr('#9aa4b5',px+15,py+17,6,1);break;
  case 'console':fr('#333',px+1,py+11,30,17);fr('#232323',px+1,py+25,30,3);fr('#101010',px+5,py+1,22,13);
   if(S.flags.powered){fr('#3a3214',px+6,py+2,20,11);fr(COL.yellow,px+8,py+5,10,1);fr(COL.yellow,px+8,py+8,14,1);}
   for(let i=0;i<5;i++)fr('#4b4b4b',px+5+i*5,py+16,3,3);break;
  case 'monitor':drawDesk(px,py);fr('#101010',px+5,py+1,10,9);fr('#101010',px+17,py+1,10,9);
   fr(has('cctv')?'#1c2436':'#2a3a5a',px+6,py+2,8,7);fr('#141820',px+18,py+2,8,7);
   for(let i=0;i<3;i++)fr('rgba(255,255,255,.08)',px+6,py+3+i*2,8,1);break;
  case 'sign':fr('#1a1a1a',px+7,py+7,18,14);fr(S.flags.power?COL.yellow:'#6b5a1a',px+8,py+8,16,12);fr('#111',px+15,py+10,2,5);fr('#111',px+15,py+16,2,2);break;
  case 'lever':{fr('#2b2d2d',px+8,py+5,16,22);fr('#1a1b1b',px+10,py+8,12,16);
   const down=S.flags.power||leverSeq.indexOf(o.L)>=0||(S.past&&o.n);
   ctx.strokeStyle='#8a8a8a';ctx.lineWidth=2;ctx.beginPath();ctx.moveTo(px+16,py+16);ctx.lineTo(px+16,down?py+23:py+9);ctx.stroke();
   fr(down?'#6b6b6b':COL.red,px+14,down?py+22:py+7,4,4);
   ctx.fillStyle='#9a968e';ctx.font='bold 7px sans-serif';ctx.fillText(o.L,px+3,py+12);
   if(S.past&&o.n){ctx.fillStyle='#dfe9ff';ctx.beginPath();ctx.arc(px+27,py+8,5,0,Math.PI*2);ctx.fill();ctx.fillStyle='#1a2a4a';ctx.font='bold 8px sans-serif';ctx.fillText(String(o.n),px+25,py+11);}
   break;}
  case 'gen':fr('#2f3131',px-12,py+2,56,26);fr('#3c3f3f',px-12,py+2,56,3);fr('#1b1c1c',px-12,py+25,56,3);
   ctx.strokeStyle='#474a4a';ctx.lineWidth=1;ctx.beginPath();ctx.arc(px+16,py+15,9,0,Math.PI*2);ctx.stroke();
   {const a=S.flags.power?NOW*8:0;ctx.beginPath();for(let i=0;i<4;i++){const q=a+i*Math.PI/2;ctx.moveTo(px+16,py+15);ctx.lineTo(px+16+Math.cos(q)*8,py+15+Math.sin(q)*8);}ctx.stroke();}
   fr(S.flags.power?COL.yellow:'#262210',px-8,py+7,4,4);fr(S.flags.power?'#5c8a4a':'#1d221b',px+36,py+7,4,4);break;
  case 'device':{const pul=.5+.5*Math.sin(NOW*2.2);const gg=ctx.createRadialGradient(px+16,py+12,0,px+16,py+12,20);
   gg.addColorStop(0,hexA(COL.nuri,.55+.3*pul));gg.addColorStop(1,hexA(COL.nuri,0));ctx.fillStyle=gg;ctx.fillRect(px-6,py-10,44,44);
   fr('#2a2c2e',px+8,py+22,16,6);ctx.fillStyle='#f6f9ff';ctx.beginPath();ctx.arc(px+16,py+12,5,0,Math.PI*2);ctx.fill();
   ctx.strokeStyle=hexA('#dfe8ff',.7);ctx.lineWidth=1;ctx.beginPath();ctx.ellipse(px+16,py+12,11,4,NOW*.8,0,Math.PI*2);ctx.stroke();
   ctx.beginPath();ctx.ellipse(px+16,py+12,4,11,-NOW*.6,0,Math.PI*2);ctx.stroke();break;}
  case 'coat':{const a=.6+.15*Math.sin(NOW*3);ctx.globalAlpha=a;const x=px+16,y=py+30;
   fr('#1a1a1a',x-5,y-8,4,8);fr('#1a1a1a',x+1,y-8,4,8);fr('#eef2fa',x-7,y-21,14,15);fr('#cfd6e4',x-1,y-21,1,14);
   fr('#8c93a0',x+6,y-17,3,6);fr('#e2ddd3',x-5,y-29,10,9);fr('#1a1a1a',x-5,y-30,10,9);
   for(let i=0;i<4;i++)fr('rgba(255,255,255,.5)',x-6+Math.random()*10,y-29+Math.random()*8,3,1);
   ctx.globalAlpha=1;break;}
  case 'hatch':fr('#1f1f1e',px+5,py+5,22,22);fr(S.flags.broadcastDone?'#4a4a47':'#353533',px+7,py+7,18,18);fr('#1a1a19',px+7,py+15,18,2);
   fr(S.flags.broadcastDone?'#7a7a75':'#2a2a28',px+14,py+9,4,4);break;
  case 'exitdoor':fr('#141414',px+1,py+1,30,31);fr('#403b39',px+3,py+5,26,27);fr('#35302e',px+15,py+5,2,27);
   for(let i=0;i<26;i+=6){fr(COL.red,px+3+i,py+2,3,3);fr('#222',px+6+i,py+2,3,3);}
   fr('#6a6560',px+11,py+18,3,4);fr('#6a6560',px+18,py+18,3,4);
   ctx.fillStyle=COL.red;ctx.font='bold 5px sans-serif';ctx.fillText('EXIT',px+11,py+12);break;
  case 'terminal':fr('#15171a',px-8,py+10,48,18);fr('#23262b',px-8,py+10,48,3);fr('#0a0b0d',px-4,py-10,40,22);
   fr(S.flags.archiveOn?'#18202e':'#1d2b44',px-2,py-8,36,18);
   for(let i=0;i<5;i++)fr('rgba(210,225,255,'+(.25+.2*((i+Math.floor(NOW*3))%5===0))+')',px,py-6+i*3.3,10+((i*11+Math.floor(NOW*2))%20),1);
   if(S.flags.archiveOn&&Math.sin(NOW*4)>0)fr(COL.red,px+28,py-6,3,3);break;
  case 'term':fr('#15171a',px+3,py+12,26,15);fr('#0a0b0d',px+6,py+2,20,13);fr('#1b2536',px+7,py+3,18,11);
   for(let i=0;i<3;i++)fr('rgba(210,225,255,.3)',px+9,py+5+i*3,8+i*3,1);break;
  case 'recorder':fr('#15171a',px+4,py+14,24,12);fr('#3c3f44',px+8,py+10,16,9);ctx.strokeStyle='#777';ctx.lineWidth=1;
   ctx.beginPath();ctx.arc(px+12,py+14,2.5,0,Math.PI*2);ctx.moveTo(px+22.5,py+14);ctx.arc(px+20,py+14,2.5,0,Math.PI*2);ctx.stroke();break;
  case 'tank':{fr('#15171a',px+4,py+24,24,6);const g2=ctx.createLinearGradient(px,py-8,px,py+24);g2.addColorStop(0,'rgba(170,210,235,.12)');g2.addColorStop(1,'rgba(170,210,235,.32)');
   ctx.fillStyle=g2;ctx.fillRect(px+7,py-8,18,32);ctx.strokeStyle='rgba(200,225,245,.5)';ctx.strokeRect(px+7.5,py-7.5,17,31);
   fr('rgba(20,24,30,.7)',px+13,py+2,6,14);fr('rgba(20,24,30,.7)',px+14,py-3,4,5);break;}
  case 'codepad':fr('#111',px+22,py+8,20,16);fr(has('code')?COL.yellow:'#5a4c18',px+24,py+10,16,3);for(let i=0;i<3;i++)for(let j=0;j<2;j++)fr('#3a3a3a',px+25+i*5,py+16+j*4,3,2);break;
  case 'portal':portalDraw(ctx,px+TS,py+10,S.flags.preserved,NOW,false);break;
  case 'irondoor':{const W=TS*3;fr('#0d0d0d',px-6,py-44,W+12,TS+44);fr('#3a3533',px-2,py-40,W+4,TS+40);fr('#2e2a28',px+W/2-1,py-40,2,TS+40);
   for(let i=0;i<W+4;i+=8){fr(COL.red,px-2+i,py-40,4,4);fr('#1a1a1a',px+2+i,py-40,4,4);}
   for(let i=0;i<6;i++){fr('#57504c',px+4,py-30+i*11,2,2);fr('#57504c',px+W-6,py-30+i*11,2,2);}
   ctx.fillStyle=COL.red;ctx.font='bold 7px sans-serif';ctx.textAlign='center';ctx.fillText('EMERGENCY EXIT',px+W/2,py-24);ctx.fillStyle='#b9b2aa';ctx.font='5px sans-serif';ctx.fillText('OPENING THIS DOOR WILL ERASE ALL ARCHIVED RECORDS',px+W/2,py-15);ctx.textAlign='left';
   fr(S.flags.preserved?COL.red:(Math.sin(NOW*3)>0?COL.red:'#3a1210'),px+W/2-3,py-6,6,4);
   if(S.flags.preserved)for(let i=0;i<3;i++)fr('#5a1c1a',px,py-34+i*14,W,3);break;}
  case 'clock':{const cx=px+16,cy=o.pole?py-6:py+12;if(o.pole){fr('#9aa3b5',px+15,py-2,3,30);fr('#7d8699',px+11,py+26,11,3);}
   ctx.fillStyle='#ffffff';ctx.beginPath();ctx.arc(cx,cy,9,0,Math.PI*2);ctx.fill();ctx.strokeStyle=o.rim||'#f4b6c2';ctx.lineWidth=2.5;ctx.stroke();drawHands(cx,cy,o.h,o.m,8);break;}
  case 'tower':{const W=TS*2;fr('rgba(0,0,0,.08)',px,py+TS-4,W,4);fr('#d8c6f1',px+10,py-44,W-20,TS+44);fr('#c4afe6',px+10,py-44,W-20,4);
   ctx.fillStyle='#bfa6e3';ctx.beginPath();ctx.moveTo(px+6,py-44);ctx.lineTo(px+W/2,py-64);ctx.lineTo(px+W-6,py-44);ctx.fill();
   const cx=px+W/2,cy=py-24;ctx.fillStyle='#fff';ctx.beginPath();ctx.arc(cx,cy,14,0,Math.PI*2);ctx.fill();ctx.strokeStyle='#8f7ac2';ctx.lineWidth=2;ctx.stroke();
   if(S.flags.roadOpen)drawHands(cx,cy,17,2,13);else for(let i=0;i<5;i++){const a=NOW*(0.6+i*.55)*(i%2?1:-1);ctx.strokeStyle=['#e89aa8','#8fcfb3','#8fa9e6','#f2c46f','#2a2a33'][i];ctx.lineWidth=1.2;ctx.beginPath();ctx.moveTo(cx,cy);ctx.lineTo(cx+Math.cos(a)*(8+i),cy+Math.sin(a)*(8+i));ctx.stroke();}
   fr('#ffffff',px+26,py+6,12,TS-6);break;}
  case 'nphone':fr('rgba(0,0,0,.08)',px+4,py+26,26,4);fr('#e87a8a',px+5,py-12,22,40);fr('#f29aa6',px+4,py-14,24,4);fr('#e6f3ff',px+8,py-8,16,28);fr('#b0525f',px+12,py,8,10);break;
  case 'nstop':fr('#9aa3b5',px+14,py-6,3,33);fr('#bfd0f6',px+5,py-12,22,16);fr('#fff',px+7,py-10,18,12);fr('#bfd0f6',px+9,py-6,10,1);break;
  case 'schooldoor':fr('#f7f5f1',px+1,py+2,30,30);fr('#e2ddd2',px+1,py+2,30,3);fr('#8fa9d6',px+8,py+11,16,21);fr('#ffffff',px+15,py+11,2,21);ctx.fillStyle='#5a5a66';ctx.font='bold 5px sans-serif';ctx.fillText('한결중학교',px+4,py+9);break;
  case 'kiosk':fr('rgba(0,0,0,.08)',px+3,py+27,28,4);fr('#b9e4cf',px+4,py-6,24,34);fr('#8fcfb3',px+2,py-9,28,4);fr('#ffffff',px+11,py+8,10,20);fr('#8fcfb3',px+18,py+17,2,2);break;
  case 'upstair':case 'downstair':fr('#ffffff',px+5,py+6,22,26);fr('#e2ddd2',px+5,py+6,22,2);ctx.fillStyle='#5a5a66';ctx.font='bold 12px sans-serif';ctx.textAlign='center';ctx.fillText(o.t==='upstair'?'↑':'↓',px+16,py+23);ctx.textAlign='left';break;
  case 'hallexit':fr('#d9c7a3',px+4,py+18,24,10);fr('#ffffff',px+8,py+20,16,6);break;
  case 'person':{const x=px+16,y=py+30,sh=Math.sin(NOW*2+o.x)*.08;ctx.globalAlpha=.9+sh;
   fr('rgba(0,0,0,.1)',x-8,y-2,16,3);fr('#3a3a44',x-5,y-8,4,8);fr('#3a3a44',x+1,y-8,4,8);fr(o.c,x-7,y-21,14,14);fr('rgba(255,255,255,.25)',x-7,y-21,14,2);
   fr('#f1dccb',x-5,y-29,10,9);fr(o.id==='seoyun'?'#2a2a33':'#6b5a4e',x-5,y-30,10,4);if(o.id==='seoyun')fr('#e89aa8',x-6,y-15,12,2);
   fr('rgba(255,255,255,.8)',x-3,y-25,1,1);fr('rgba(255,255,255,.8)',x+2,y-25,1,1);ctx.globalAlpha=1;break;}
  case 'core':{const cx=px+TS,cy=py+6;for(let k=0;k<7;k++){ctx.strokeStyle='hsla('+Math.round((200+NOW*12+k*40)%360)+',32%,84%,.42)';ctx.lineWidth=2;ctx.beginPath();ctx.ellipse(cx,cy,28-k*3,22-k*2,NOW*(k%2?.4:-.3)+k,0,Math.PI*2);ctx.stroke();}
   const gg=ctx.createRadialGradient(cx,cy,0,cx,cy,20);gg.addColorStop(0,'rgba(255,255,255,1)');gg.addColorStop(1,'rgba(255,255,255,0)');ctx.fillStyle=gg;ctx.fillRect(cx-20,cy-20,40,40);break;}
  case 'pedestal':fr('rgba(0,0,0,.08)',px+6,py+27,20,3);fr('#ffffff',px+8,py+12,16,16);fr('#e2ddd2',px+8,py+12,16,2);fr('#c9b28a',px+9,py+6,14,7);fr('#a88f63',px+15,py+6,1,7);break;
  case 'retgate':portalDraw(ctx,px+16,py+10,true,NOW,true);fr('rgba(154,163,181,.8)',px+10,py+24,12,3);break;
  case 'card':{const cx=px+16,cy=py+18;ctx.save();ctx.translate(cx,cy);ctx.rotate(-.35);
   fr('rgba(0,0,0,.12)',-6,-8,13,17);fr('#ffffff',-7,-10,13,17);
   const g3=ctx.createLinearGradient(-6,-9,5,6);g3.addColorStop(0,'hsl('+Math.round((NOW*40)%360)+',70%,70%)');g3.addColorStop(1,'hsl('+Math.round((NOW*40+140)%360)+',70%,65%)');
   ctx.fillStyle=g3;ctx.fillRect(-6,-9,11,15);fr('#ffffff',-3,-5,5,5);ctx.restore();
   if(Math.sin(NOW*2.5)>.6)fr('rgba(255,255,255,.95)',px+22,py+8,2,2);break;}
  case 'chair31':fr('rgba(0,0,0,.08)',px+8,py+24,16,3);fr('#ffffff',px+8,py+4,16,5);fr('#ffffff',px+8,py+12,16,8);fr('#d6d3cb',px+9,py+20,2,5);fr('#d6d3cb',px+21,py+20,2,5);fr('#2a2a33',px+12,py+6,8,1);break;
  case 'ghost':{const a=.45+.18*Math.sin(t*2+o.x);ctx.globalAlpha=a;ctx.fillStyle='#b4cbf2';
   ctx.beginPath();ctx.arc(px+16,py+5,6,0,Math.PI*2);ctx.fill();
   ctx.beginPath();ctx.moveTo(px+9,py+12);ctx.lineTo(px+23,py+12);ctx.lineTo(px+24,py+30);ctx.lineTo(px+20,py+27);ctx.lineTo(px+16,py+31);ctx.lineTo(px+12,py+27);ctx.lineTo(px+8,py+30);ctx.closePath();ctx.fill();
   ctx.globalAlpha=1;break;}
 }
}
function limb(pts,w,c){ctx.strokeStyle=c;ctx.lineWidth=w;ctx.lineCap='round';ctx.lineJoin='round';ctx.beginPath();ctx.moveTo(pts[0][0],pts[0][1]);for(let i=1;i<pts.length;i++)ctx.lineTo(pts[i][0],pts[i][1]);ctx.stroke();}
function hurtVignette(){if(!(hurtT>0||(combatOn()&&S.hp<=50)))return;const a=hurtT>0?.45*hurtT/.35+.12:.10+.06*Math.sin(NOW*5);const g=ctx.createRadialGradient(cv.width/2,cv.height/2,cv.height*.3,cv.width/2,cv.height/2,cv.height*.85);g.addColorStop(0,'rgba(160,20,20,0)');g.addColorStop(1,'rgba(160,20,20,'+a.toFixed(3)+')');ctx.fillStyle=g;ctx.fillRect(0,0,cv.width,cv.height);}
function drawPlayer(){
 const x=P.x,y=P.y,ph=P.phase,W=P.walkW,Rn=P.runW;
 const C={coat:'#bdb8ad',coatD:'#9a958a',coatF:'#8a857a',coatL:'#d5d0c5',pant:'#232323',pantF:'#141414',shoe:'#0c0c0c',skin:'#e4dfd5',skinD:'#cdc7bc',hair:'#161616',book:'#5c5850'};
 const amp=W*(3.4+2.2*Rn), lift=W*(1.6+2.4*Rn);
 const bob=W*(0.9+1.6*Rn)*(1-Math.cos(2*ph))/2;
 const headBob=W*(0.9+1.6*Rn)*(1-Math.cos(2*ph-.7))/2;
 const breathe=(1-W)*Math.sin(NOW*2.2)*.35;
 const by=-bob+breathe, hy=-headBob+breathe;
 const f=P.face,side=f==='l'?-1:f==='r'?1:0,back=f==='u';
 ctx.save();ctx.translate(x,y);ctx.scale(1.4,1.4);
 ctx.fillStyle='rgba(0,0,0,'+(.42-bob*.04)+')';ctx.beginPath();ctx.ellipse(0,.2,8.4-bob*.5,2.9,0,0,Math.PI*2);ctx.fill();
 if(side){
  const s=side;
  const leg=p=>{const fw=Math.sin(p)*amp,lf=Math.max(0,Math.cos(p))*lift;const foot=[s*fw,-.9-lf];const hip=[s*.2,-9+by*.6];
   const kx=(hip[0]+foot[0])/2+s*(.9+lf*.55),ky=(hip[1]+foot[1])/2-lf*.15;return {hip,knee:[kx,ky],foot,lf};};
  const arm=(p,far)=>{const a=-Math.sin(p)*(.35+.55*Rn)*W,bend=.25+1.25*Rn;const sh=[s*(far?-.6:.6),-18.6+by];
   const el=[sh[0]+Math.sin(a)*4.4*s,sh[1]+Math.cos(a)*4.4];const hd=[el[0]+Math.sin(a+bend)*4*s,el[1]+Math.cos(a+bend)*4];return [sh,el,hd];};
  const L1=leg(ph+Math.PI),L0=leg(ph);
  limb([L1.hip,L1.knee,L1.foot],3.3,C.pantF);limb([L1.foot,[L1.foot[0]+s*2.4,L1.foot[1]+.2]],2.4,C.shoe);
  const A1=arm(ph+Math.PI,1);limb(A1,2.7,C.coatF);
  ctx.save();ctx.translate(0,-9);ctx.rotate(s*(.05*W+.13*Rn));ctx.translate(0,9);
  limb([L0.hip,L0.knee,L0.foot],3.4,C.pant);limb([L0.foot,[L0.foot[0]+s*2.5,L0.foot[1]+.2]],2.5,C.shoe);
  const tail=-s*(.6+1.6*Rn)*W+Math.sin(ph*2)*.4*Rn;
  ctx.fillStyle=C.coat;ctx.beginPath();ctx.moveTo(-4.4,-21+by);ctx.lineTo(4.4,-21+by);ctx.lineTo(4.8+(s<0?tail*-1:0)*0+ (s>0?0:tail),-8.2+by);ctx.lineTo(-4.8+(s>0?tail:0),-8.2+by);ctx.closePath();ctx.fill();
  fr(C.coatL,-4.4,-21+by,8.8,1.6);fr(C.coatD,s>0?-4.4:3.4,-20+by,1,11);fr(C.coatD,-4.6,-9.6+by,9.4,1.4);
  const A0=arm(ph,0);limb(A0,2.8,C.coatD);ctx.fillStyle=C.skin;ctx.beginPath();ctx.arc(A0[2][0],A0[2][1],1.3,0,Math.PI*2);ctx.fill();
  fr(C.book,A0[2][0]-(s>0?.5:3.5),A0[2][1]-1.8,4,4.6);
  fr(C.skin,-4.5,-30+hy,9,9);fr(C.skinD,-4.5,-21.6+hy,9,.8);
  fr(C.hair,-4.6,-31+hy,9.2,3.6);fr(C.hair,s>0?-4.6:2.6,-29+hy,2,5);fr(C.hair,s>0?1.8:-2.8,-26+hy,1,2);fr(C.skinD,s>0?4.2:-5.2,-25+hy,1,1.2);
  ctx.restore();
 } else {
  const sway=Math.sin(ph)*.45*W;
  const flift=W*(2.4+2.4*Rn);const leg=(p,lx)=>{const c=Math.cos(p),lf=Math.max(0,c)*flift,plant=Math.max(0,-c)*W*.5;const hip=[lx,-9+by*.6];const foot=[lx+(lx<0?-.3:.3),-.9-lf+plant*(back?-1:1)];const knee=[lx+(lx<0?-.5-lf*.25:.5+lf*.25),-5.2-lf*.75];return {hip,knee,foot};};
  const LL=leg(ph,-2.3),LR=leg(ph+Math.PI,2.3);
  limb([LL.hip,LL.knee,LL.foot],3.4,C.pant);limb([LR.hip,LR.knee,LR.foot],3.4,C.pant);
  if(!back){limb([[LL.foot[0]-.6,LL.foot[1]+.3],[LL.foot[0]+.6,LL.foot[1]+.3]],2.8,C.shoe);limb([[LR.foot[0]-.6,LR.foot[1]+.3],[LR.foot[0]+.6,LR.foot[1]+.3]],2.8,C.shoe);}
  else{fr(C.shoe,LL.foot[0]-1.4,LL.foot[1]-.6,2.8,1.6);fr(C.shoe,LR.foot[0]-1.4,LR.foot[1]-.6,2.8,1.6);}
  const armF=(p,sx)=>{const sw=Math.sin(p)*W*(1.8+1.4*Rn)*(back?-1:1);const sh=[sx*5.4+sway,-18.6+by];const el=[sx*(6.3+.4*Rn)+sway,-14.4+by+sw*.5-Rn*.8];const hd=[sx*(6-1.8*Rn)+sway,-10.4+by+sw-Rn*2.2];return [sh,el,hd];};
  const AL=armF(ph+Math.PI,-1),AR=armF(ph,1);
  ctx.save();ctx.translate(sway,0);
  const flare=Math.sin(ph*2)*.35*Rn;
  ctx.fillStyle=C.coat;ctx.beginPath();ctx.moveTo(-5.4,-21+by);ctx.lineTo(5.4,-21+by);ctx.lineTo(6+flare,-8.2+by);ctx.lineTo(-6-flare,-8.2+by);ctx.closePath();ctx.fill();
  fr(C.coatL,-5.4,-21+by,10.8,1.6);fr(C.coatD,-6,-9.6+by,12,1.4);
  if(!back){fr(C.coatD,-.5,-19.4+by,1,10);fr('#7e796f',-2.6,-15+by,1,1);fr('#7e796f',1.6,-15+by,1,1);fr('#7e796f',-2.6,-12+by,1,1);fr('#7e796f',1.6,-12+by,1,1);}
  else fr(C.coatD,-5.4,-21+by,10.8,.8);
  ctx.restore();
  limb(AL,2.8,C.coatD);limb(AR,2.8,C.coatD);
  ctx.fillStyle=C.skin;[AL,AR].forEach(a=>{ctx.beginPath();ctx.arc(a[2][0],a[2][1],1.3,0,Math.PI*2);ctx.fill();});
  if(!back)fr(C.book,AR[2][0]-1,AR[2][1]-1.2,4,4.6);
  const hx=sway*.6;
  fr(C.skin,-4.5+hx,-30+hy,9,9);fr(C.skinD,-4.5+hx,-21.6+hy,9,.8);
  if(back){fr(C.hair,-4.6+hx,-31+hy,9.2,9);fr('#232323',-4.6+hx,-23.4+hy,9.2,1);}
  else{fr(C.hair,-4.6+hx,-31+hy,9.2,3.8);fr(C.hair,-4.6+hx,-29+hy,1.5,4);fr(C.hair,3.1+hx,-29+hy,1.5,4);
   const blink=(Math.floor(NOW*10)%37===0);fr(C.hair,-2.4+hx,-25.6+hy,1,blink?.4:1.9);fr(C.hair,1.4+hx,-25.6+hy,1,blink?.4:1.9);}
 }
 ctx.restore();
}
function drawDust(dt){
 for(let i=DUST.length-1;i>=0;i--){const d=DUST[i];d.t+=dt;if(d.t>.45){DUST.splice(i,1);continue;}
  const a=(1-d.t/.45)*.35,r=2+d.t*10;ctx.fillStyle=S.area==='nl'?'rgba(150,140,170,'+a+')':'rgba(170,166,158,'+a+')';ctx.beginPath();ctx.arc(d.x,d.y-d.t*6,r,0,Math.PI*2);ctx.fill();}
}
const gc=document.createElement('canvas');gc.width=gc.height=128;
(function(){const g=gc.getContext('2d');const d=g.createImageData(128,128);for(let i=0;i<d.data.length;i+=4){const v=Math.random()*255;d.data[i]=d.data[i+1]=d.data[i+2]=v;d.data[i+3]=255;}g.putImageData(d,0,0);})();
let grainPat=null;

const vc=document.createElement('canvas'),vctx=vc.getContext('2d');
let VIS={x:0,y:0,R:1,near:1};
function visParams(rad){const nl=S.area==='nl',inB=nl&&P.x>29*TS&&P.x<43*TS&&P.y<11*TS;
 return {fog:nl&&!inB?'233,237,245':'0,0,0',hide:nl?(inB?.95:.82):(S.past?.8:.95)};}
function drawVision(pcx,pcy,rad,dark,camX,camY,k){
 const VQ=3,vw=Math.ceil(cv.width/VQ),vh=Math.ceil(cv.height/VQ);if(vc.width!==vw||vc.height!==vh){vc.width=vw;vc.height=vh;}k=k/VQ;
 const vp=visParams(rad),R=rad*VISION_BOOST,NR=TS*1.8,A=P.lookA;
 VIS={x:pcx,y:pcy,R,near:NR};
 vctx.setTransform(1,0,0,1,0,0);vctx.globalCompositeOperation='source-over';vctx.clearRect(0,0,vc.width,vc.height);
 vctx.fillStyle='rgba('+vp.fog+','+vp.hide+')';vctx.fillRect(0,0,vc.width,vc.height);
 vctx.setTransform(k,0,0,k,Math.round(-camX*k),Math.round(-camY*k));
 vctx.globalCompositeOperation='destination-out';
 const mid=Math.max(0,Math.min(1,1-dark*.55));
 [[.66,.62],[.86,.42],[1.04,.3],[1.24,.16]].map(w=>[VISION_HALF*w[0],w[1]]).forEach(w=>{
  const g=vctx.createRadialGradient(pcx,pcy,0,pcx,pcy,R);
  g.addColorStop(0,'rgba(0,0,0,'+w[1]+')');g.addColorStop(.5,'rgba(0,0,0,'+(w[1]*mid)+')');g.addColorStop(1,'rgba(0,0,0,0)');
  vctx.fillStyle=g;vctx.beginPath();vctx.moveTo(pcx,pcy);vctx.arc(pcx,pcy,R,A-w[0],A+w[0]);vctx.closePath();vctx.fill();
 });
 const ng=vctx.createRadialGradient(pcx,pcy,0,pcx,pcy,NR);ng.addColorStop(0,'rgba(0,0,0,1)');ng.addColorStop(.55,'rgba(0,0,0,.8)');ng.addColorStop(1,'rgba(0,0,0,0)');
 vctx.fillStyle=ng;vctx.fillRect(pcx-NR,pcy-NR,NR*2,NR*2);
 vctx.globalCompositeOperation='source-over';
 ctx.save();ctx.setTransform(1,0,0,1,0,0);ctx.imageSmoothingEnabled=true;ctx.drawImage(vc,0,0,vc.width*VQ,vc.height*VQ);ctx.imageSmoothingEnabled=false;ctx.restore();
}
function visAt(x,y){
 const dx=x-VIS.x,dy=y-VIS.y,d=Math.hypot(dx,dy);
 const n=d<VIS.near?1-d/VIS.near:0;
 const a=Math.abs(angDiff(Math.atan2(dy,dx),P.lookA));
 const c=(d<VIS.R&&a<VISION_HALF*1.1)?Math.min(1,(1-d/VIS.R)*2)*(a<VISION_HALF*.8?1:.5):0;
 return Math.max(n,c);
}
function draw(t){
 NOW=t;ctx.setTransform(1,0,0,1,0,0);ctx.imageSmoothingEnabled=false;
 if(FPV){drawFP(t);return;}
 fr(S.area==='nl'?'#e9edf5':'#000',0,0,cv.width,cv.height);
 const m=MAPS[S.area],mw=m.w*TS,mh=m.h*TS;
 let camX=mw<VW?(mw-VW)/2:Math.max(0,Math.min(mw-VW,P.x-VW/2));
 let camY=mh<VH?(mh-VH)/2:Math.max(0,Math.min(mh-VH,P.y-12-VH/2));
 if(shakeT>0){camX+=(Math.random()-.5)*6;camY+=(Math.random()-.5)*6;}
 const k=Z*DPR;
 ctx.setTransform(k,0,0,k,Math.round(-camX*k),Math.round(-camY*k));
 const x0=Math.max(0,Math.floor(camX/TS)),y0=Math.max(0,Math.floor(camY/TS)),x1=Math.min(m.w-1,Math.ceil((camX+VW)/TS)),y1=Math.min(m.h-1,Math.ceil((camY+VH)/TS));
 drawWorld(x0,y0,x1,y1);
 drawDust(Math.min(.05,t-(draw.lt||t)));draw.lt=t;drawPickupsAndMarks(t);CAMX=camX;CAMY=camY;
 const vis=objs().filter(o=>(o.x+(o.w||1)+2)*TS>camX&&(o.x-2)*TS<camX+VW&&(o.y+2)*TS>camY&&(o.y-3)*TS<camY+VH);
 const items=vis.map(o=>({y:o.sy?o.y*TS+o.sy:(o.y+1)*TS-(o.t==='ghost'?1:0),f:()=>drawObj(o,t)}));
 if(S.area==='city')CARS.forEach(cr=>items.push({y:(cr.y+(cr.d==='h'?1:2))*TS-3,f:()=>drawCar(cr)}));
 if(combatOn())ZOMBIES.forEach(z=>{if(z.x>camX-40&&z.x<camX+VW+40&&z.y>camY-20&&z.y<camY+VH+60)items.push({y:z.y,f:()=>drawZombie(z,t)});});
 items.push({y:P.y,f:()=>{drawPlayer();drawHeldBat();}});
 items.sort((a,b)=>a.y-b.y).forEach(i=>i.f());
 const pcx=P.x,pcy=P.y-12;
 if(S.past){
  ctx.globalCompositeOperation='color';ctx.globalAlpha=.62;fr('#3f6fcf',camX,camY,VW,VH);
  ctx.globalCompositeOperation='source-over';ctx.globalAlpha=1;
 }
 VENTS.length&&S.area==='factory'&&VENTS.forEach(v=>{
  const vx=(v[0]+.5)*TS,vy=(v[1]+.5)*TS;
  for(let i=0;i<4;i++){const ph=((NOW*.35+i*.25+v[0]*.13)%1);ctx.fillStyle='rgba(220,220,215,'+(.22*(1-ph))+')';
   ctx.beginPath();ctx.arc(vx+Math.sin(ph*6+i)*6,vy-ph*44,5+ph*12,0,Math.PI*2);ctx.fill();}
 });
 let rad,dark;
 if(S.area==='city'){rad=TS*6;dark=.62;}
 else if(S.area==='lab'){rad=TS*5.2*(1+.02*Math.sin(t*5));dark=.82;}
 else if(S.area==='nl'){const inB=P.x>29*TS&&P.x<43*TS&&P.y<11*TS;rad=TS*5.5;dark=inB?.5:0;}
 else if(S.area==='factory'){if(S.past){rad=TS*9;dark=.3;}else if(S.flags.power){rad=TS*6.5;dark=.62;}else{rad=TS*4.6*(1+.03*Math.sin(t*7));dark=.88;}}
 else if(S.past){rad=TS*9;dark=.3;}
 else{rad=TS*4.3*(1+.03*Math.sin(t*9))*(Math.random()<.008?.8:1);dark=.9;}
 drawVision(pcx,pcy,rad,dark,camX,camY,k);
 if(S.area==='nl'){
  const bg=ctx.createRadialGradient(pcx,pcy,TS*3,pcx,pcy,Math.max(VW,VH)*.75);bg.addColorStop(0,'rgba(255,255,255,0)');bg.addColorStop(1,'rgba(255,255,255,.42)');
  ctx.fillStyle=bg;ctx.fillRect(camX-10,camY-10,VW+20,VH+20);
  ctx.fillStyle='hsla('+Math.round((t*18)%360)+',70%,75%,.06)';ctx.fillRect(camX,camY,VW,VH);
 }
 if(S.area==='lab'){
  for(let y=y0;y<=y1;y++)for(let x=x0;x<=x1;x++){const tt=tile(x,y);
   if(visAt((x+.5)*TS,(y+.5)*TS)<.15)continue;
   if(tt==='#'&&!isWall(tile(x,y+1)))fr(labHue(x,y)+'.3)',x*TS,y*TS+11,TS,2);
   else if(tt==='S'){for(let i=0;i<6;i++){const on=Math.sin(NOW*(2+i)+x*3+y)>.2;if(on){const c2=i%3?'rgba(120,200,160,':'rgba(140,170,255,';fr(c2+'.9)',x*TS+21.5,y*TS+7.5+i*3.4,1.6,1.2);fr(c2+'.25)',x*TS+20.8,y*TS+7+i*3.4,3,2.2);}}}}
 }
 if(S.area==='factory'&&S.flags.power&&!S.past){ctx.fillStyle=hexA(COL.yellow,.03+.03*Math.sin(t*3));ctx.fillRect(camX,camY,VW,VH);}
 if(alarmT>0){ctx.fillStyle=hexA(COL.red,(Math.sin(t*18)>0?.22:.06)*Math.min(1,alarmT));ctx.fillRect(camX,camY,VW,VH);}
 vis.forEach(o=>{let c=objGlowColor(o);if(!c)return;if(S.area==='nl'&&c===COL.nuri)c='#9d7ae6';const cx=(o.x+(o.w||1)/2)*TS,cy=(o.y+.5)*TS-(o.tall?8:0);
  const vv=visAt(cx,cy);if(vv<.05)return;
  const a=((c===COL.white?.16:.3)+.12*Math.sin(t*3+o.x))*vv;ctx.globalAlpha=Math.max(0,Math.min(1,a));ctx.imageSmoothingEnabled=true;ctx.drawImage(glowSprite(c),cx-24,cy-24,48,48);ctx.imageSmoothingEnabled=false;ctx.globalAlpha=1;
  fr(hexA(c,.9),cx-1,cy-1,2,2);});
 drawMarksOverlay(t);
 if(near&&!busy()){
  const cx=(near.x+(near.w||1)/2)*TS,cy=near.y*TS-(near.tall?18:near.sy?48:4)+Math.sin(t*4)*1.5;
  const label=isTouch?'조사':'E';ctx.font='bold 9px "Nanum Gothic Coding",monospace';const w=ctx.measureText(label).width+10;
  fr('rgba(0,0,0,.8)',cx-w/2,cy-12,w,13);ctx.strokeStyle='#e7e3da';ctx.lineWidth=1;ctx.strokeRect(cx-w/2+.5,cy-11.5,w-1,12);
  ctx.fillStyle='#e7e3da';ctx.textAlign='center';ctx.fillText(label,cx,cy-2.5);ctx.textAlign='left';
 }
 ctx.setTransform(1,0,0,1,0,0);
 if(!grainPat)grainPat=ctx.createPattern(gc,'repeat');
 ctx.globalAlpha=(S.area==='nl'?.03:.07)*(isTouch?.7:1);const ox=Math.floor(Math.random()*128),oy=Math.floor(Math.random()*128);
 ctx.translate(-ox,-oy);ctx.fillStyle=grainPat;ctx.fillRect(0,0,cv.width+ox,cv.height+oy);ctx.setTransform(1,0,0,1,0,0);ctx.globalAlpha=1;
 hurtVignette();
 if(S.past){const sy=((t*80)%(cv.height+60))-30;fr('rgba(200,220,255,.05)',0,sy,cv.width,18*DPR);for(let y=0;y<cv.height;y+=4*DPR)fr('rgba(0,0,0,.07)',0,y,cv.width,DPR);}
}

/* ================= 1인칭 (레이캐스팅) ================= */
const FP_WALL=new Set(['#','B','V','X','S','Q','J','L','K','G','M']);
const fpc=document.createElement('canvas'),fctx=fpc.getContext('2d');
const RGBC={};function rgb(h){if(RGBC[h])return RGBC[h];const n=parseInt(h.slice(1),16);return RGBC[h]=[(n>>16)&255,(n>>8)&255,n&255];}
function mixc(c,f,t){return 'rgb('+Math.round(c[0]+(f[0]-c[0])*t)+','+Math.round(c[1]+(f[1]-c[1])*t)+','+Math.round(c[2]+(f[2]-c[2])*t)+')';}
function fpPal(){
 const a=S.area,p=S.past,nl=a==='nl',inB=nl&&P.x>29*TS&&P.x<43*TS&&P.y<11*TS;
 if(nl)return inB?{fog:'#1d1a2a',sky:'#2a2540',floor:'#3a3453'}:{fog:'#e9edf5',sky:'#cfe0f5',floor:'#efece5'};
 if(a==='city')return {fog:'#0c0c0c',sky:'#1c1c1c',floor:'#333333'};
 if(a==='school')return p?{fog:'#4a4a48',sky:'#9a9a96',floor:'#767673'}:{fog:'#050505',sky:'#181818',floor:'#2d2d2c'};
 if(a==='factory')return p?{fog:'#4a4d4d',sky:'#8a8d8d',floor:'#6f7272'}:{fog:S.flags.power?'#141412':'#080909',sky:'#171818',floor:'#2a2c2c'};
 return {fog:'#07080a',sky:'#121316',floor:'#1c1e21'};
}
function wallBase(t,mx,my){
 const a=S.area,p=S.past;
 switch(t){
  case '#':return a==='city'?'#2c2c2c':a==='school'?(p?'#8a8a86':'#303030'):a==='factory'?(p?'#7d8080':'#2a2c2c'):'#24272c';
  case 'B':return pastel(mx,my);case 'X':return p?'#8a8d8d':'#3d4040';case 'S':return '#121417';
  case 'Q':case 'J':case 'L':case 'K':return '#2f3338';case 'G':return '#1e1e1e';case 'M':return '#8a8a86';
 }
 return '#333333';
}
function wallH(t){if(t==='V')return 4;if(t==='B')return 1.8;if(t==='#'&&S.area==='city')return 2.1;return 1.05;}
const SPR={stand:[.6,.7,'#4d4d4d'],phone:[1.25,.6,'#333333'],graffiti:[.3,1.2,'#7a2422',.4],radio:[.35,.65,'#2a2f2f',.3],busstop:[1.3,.35,'#8d8a83'],mailbox:[.35,.4,'#444444',.35],
 keypad:[.28,.28,'#2a2a2a',.45],book:[.45,.6,'#4a4a48'],board:[.4,1.6,'#1d221e',.35],camera:[.62,.45,'#3a3a3a'],docs:[.45,.6,'#4a4a48'],speaker:[.2,.35,'#3d3d3d',.65],
 fuse:[.5,.6,'#4d4d4d'],memo:[.45,.6,'#d8dee8'],console:[.62,.8,'#333333'],hatch:[.04,.65,'#3a3a38'],exitdoor:[.95,.9,'#403b39'],monitor:[.62,.7,'#1d2b44'],
 lever:[.45,.35,'#2b2d2d',.3],gen:[.95,1.7,'#2f3131'],device:[.6,.55,'#eaf2ff',.25],coat:[.9,.42,'#eef2fa'],ghost:[.88,.42,'#b4cbf2'],sign:[.35,.5,'#6b5a1a',.45],b3sign:[.36,.58,'#2a2c2e',.42],nlstand:[.6,.7,'#f6f3ed'],
 terminal:[.75,1.3,'#15171a'],term:[.62,.7,'#1b2536'],recorder:[.3,.6,'#3c3f44'],tank:[1.15,.6,'#9fc4d8'],codepad:[.26,.45,'#5a4c18',.42],portal:[1.15,1.5,'#d8dce6'],
 irondoor:[1.7,2.9,'#3a3533'],clock:[1.25,.38,'#f4f4f0'],tower:[2.3,1.9,'#d8c6f1'],nphone:[1.25,.6,'#e87a8a'],nstop:[1.3,.35,'#bfd0f6'],schooldoor:[.95,.9,'#8fa9d6'],
 kiosk:[1.25,.8,'#b9e4cf'],upstair:[.95,.7,'#fafafa'],downstair:[.95,.7,'#fafafa'],hallexit:[.05,.7,'#d9c7a3'],person:[.88,.42,'#888888'],core:[1.5,1.7,'#ffffff',.1],
 pedestal:[.55,.45,'#fafafa'],retgate:[.75,.6,'#e8eaf2'],chair31:[.5,.5,'#fafafa'],card:[.06,.35,'#e89aa8']};
const FIG=new Set(['coat','ghost','person']);
const FPTEX={nlstand:[1,2,30,26],b3sign:[5,6,22,15],phone:[5,-18,22,46],nphone:[5,-18,22,46],stand:[1,2,30,26],busstop:[1,-19,30,47],nstop:[1,-19,30,47],mailbox:[5,7,22,20],keypad:[8,7,16,22],radio:[1,4,30,25],
 graffiti:[-10,6,52,24],book:[4,4,24,16],camera:[4,4,24,16],docs:[4,4,24,16],memo:[4,4,24,16],board:[-16,1,64,26],speaker:[9,6,14,12],fuse:[2,3,28,25],console:[0,0,32,28],
 exitdoor:[0,0,32,32],monitor:[2,0,28,19],lever:[8,4,16,23],gen:[-12,2,56,26],sign:[6,6,20,15],terminal:[-10,-12,52,40],term:[3,0,26,27],recorder:[4,10,24,15],tank:[4,-12,24,42],
 codepad:[22,7,20,17],irondoor:[-6,-44,108,76],tower:[5,-72,54,104],schooldoor:[0,0,32,32],kiosk:[1,-13,30,41],upstair:[4,4,24,28],downstair:[4,4,24,28],pedestal:[7,4,18,26],chair31:[7,3,18,24]};
const IMGBB={person:[5,-2,22,33],ghost:[5,-2,22,33],coat:[5,-2,22,33],clock:1};
const RUB3D={};
function rubble3D(x,y){
 const key=S.area+x+','+y;if(RUB3D[key])return RUB3D[key];
 const R=rng(Math.imul(x+11,2654435761)^Math.imul(y+5,40503));const out=[];
 const hexg=(g,w)=>'#'+[g+w,g+Math.round(w*.55),g-Math.round(w*.2)].map(v=>Math.max(0,Math.min(255,Math.round(v))).toString(16).padStart(2,'0')).join('');
 const blk=(cx,cy,w,d,z0,h,g,w2,rough)=>{const col=hexg(g,w2||0);out.push({x0:cx-w/2,x1:cx+w/2,y0:cy-d/2,y1:cy+d/2,z0,z1:z0+h,col,top:lighten(col,1.22),rough});};
 let id=1;
 for(let i=0;i<4;i++){const a=i/4*Math.PI*2+R()*.8,rr=.22+R()*.1;blk(x+.5+Math.cos(a)*rr,y+.5+Math.sin(a)*rr,.3+R()*.14,.24+R()*.12,0,.12+R()*.08,50+R()*22,0,id++);}
 for(let i=0;i<3;i++){const a=i/3*Math.PI*2+R(),rr=.1+R()*.08;blk(x+.5+Math.cos(a)*rr,y+.5+Math.sin(a)*rr,.24+R()*.1,.2+R()*.1,.13+R()*.05,.12+R()*.07,56+R()*22,0,id++);}
 blk(x+.5+(R()-.5)*.1,y+.5+(R()-.5)*.1,.22+R()*.08,.16+R()*.06,.27+R()*.05,.1+R()*.06,62+R()*18,0,id++);
 for(let i=0;i<4;i++){const s2=.05+R()*.05;blk(x+.15+R()*.7,y+.15+R()*.7,s2*2,s2*1.6,R()<.5?0:.1+R()*.15,s2*1.4,44+R()*16,6+R()*5,0);}
 for(let j=0;j<9;j++){const s2=.025+R()*.035,a=R()*Math.PI*2,rr=.38+R()*.2;blk(x+.5+Math.cos(a)*rr,y+.5+Math.sin(a)*rr,s2*2,s2*2,0,s2*1.2,38+R()*26,R()<.4?5:0,0);}
 if(R()<.5){const h=.3+R()*.25;out.push({bar:{x:x+.3+R()*.4,y:y+.3+R()*.4,sp:[h,.025,'#1c1c1c'],col:'#1c1c1c'}});}
 return RUB3D[key]=out;
}
const BOXT=new Set(['nlstand','b3sign','stand','phone','graffiti','radio','mailbox','keypad','book','board','camera','docs','speaker','fuse','memo','console','hatch','exitdoor','monitor','lever','gen','sign','terminal','term','recorder','tank','codepad','irondoor','tower','nphone','nstop','schooldoor','kiosk','upstair','downstair','hallexit','pedestal','chair31','busstop']);
function lighten(h,f){const c=rgb(h);return '#'+c.map(v=>Math.min(255,Math.round(v*f)).toString(16).padStart(2,'0')).join('');}
const LOWT={r:[.35,.95,'#4f4f4f'],c:[.5,1,'#474747'],d:[.42,.78,'#4a4a4a'],C:[.5,.55,null],T:[1.7,.14,'#161616']};
/* 바닥 텍스처 투영 (1인칭) */
const FTEXC={};
const FLOOR_OF={'Z':'Z','k':'k',',':',','.':'.','f':'f','m':'m','n':'n','w':'w','o':'o','Y':'Y','R':'R','W':'W','v':'v','c':'.','g':'.','G':'.','T':',','N':'o','C':'w','S':'n','q':'n','j':'n','d':'f','H':'f','U':'U'};
function floorTexData(t,x,y){
 const key=S.area+t+(S.past?1:0)+'|'+x+','+y;let d=FTEXC[key];if(d)return d;
 const cv2=tileCanvas(t,x,y).cv;let data=null;
 try{const g=cv2.getContext('2d');data=g.getImageData(0,0,64,64).data;if(!data||typeof data.length!=='number'||data.length<16384)data=null;}catch(e){data=null;}
 return FTEXC[key]=data||new Uint8ClampedArray(64*64*4).fill(60);
}
function defFloor(){return {city:',',school:'f',factory:'m',lab:'n',nl:'w'}[S.area]||',';}
let FIMG=null;
function floorCast(c,W,H,hor,posX,posY,dirX,dirY,plX,plY,maxD,pal){
 const y0=Math.max(0,Math.ceil(hor+1));if(y0>=H)return;const rows=H-y0;
 if(!FIMG||FIMG.width!==W||FIMG.height!==rows)FIMG=c.createImageData(W,rows);
 const out=FIMG.data,fog=rgb(pal.fog),nlBright=S.area==='nl'&&pal.fog==='#e9edf5';
 const rx0=dirX-plX,ry0=dirY-plY,rx1=dirX+plX,ry1=dirY+plY,cache=new Map();
 const area=S.area,m=MAPS[area],dflt=defFloor();
 const rowB=W*4;
 for(let yy=0;yy<rows;yy++){
  if(yy&1&&yy>2){out.copyWithin(yy*rowB,(yy-1)*rowB,yy*rowB);continue;}
  const p=y0+yy-hor;const rd=(.5*H)/p;
  let fx=posX+rd*rx0,fy=posY+rd*ry0;const sx=rd*(rx1-rx0)/W,sy=rd*(ry1-ry0)/W;
  const ft=Math.min(1,Math.pow(rd/maxD,1.5)),lit=nlBright?1:1+.85*Math.max(0,1-rd/(maxD*.55)),k1=(1-ft)*lit,kf=ft;
  const fr0=fog[0]*kf,fg0=fog[1]*kf,fb0=fog[2]*kf;let o=yy*W*4;
  for(let x=0;x<W;x++,fx+=sx,fy+=sy,o+=4){
   if(ft>=1){out[o]=fog[0];out[o+1]=fog[1];out[o+2]=fog[2];out[o+3]=255;continue;}
   const cx=Math.floor(fx),cy=Math.floor(fy),ck=cx*4096+cy;let tex=cache.get(ck);
   if(tex===undefined){let tt=(cx<0||cy<0||cx>=m.w||cy>=m.h)?null:tile(cx,cy);let ftp=tt&&FLOOR_OF[tt];if(tt==='r'||tt==='E')ftp=area==='city'?',':area==='factory'?'m':'f';
    if(!ftp)ftp=(tt==='V'||!tt)?null:dflt;tex=ftp?floorTexData(ftp,cx,cy):null;cache.set(ck,tex);}
   if(!tex){out[o]=fog[0];out[o+1]=fog[1];out[o+2]=fog[2];out[o+3]=255;continue;}
   const ti=((Math.floor((fy-cy)*64)&63)*64+(Math.floor((fx-cx)*64)&63))*4;
   out[o]=Math.min(255,tex[ti]*k1+fr0);out[o+1]=Math.min(255,tex[ti+1]*k1+fg0);out[o+2]=Math.min(255,tex[ti+2]*k1+fb0);out[o+3]=255;
  }
 }
 c.putImageData(FIMG,0,y0);
}
function drawFP(t){
 const W=Math.max(160,Math.round(Math.min(340,innerWidth/3.5)*Math.min(1,RS+.15))),H=Math.max(110,Math.round(W*innerHeight/innerWidth));
 if(fpc.width!==W||fpc.height!==H){fpc.width=W;fpc.height=H;}
 const c=fctx,pal=fpPal(),fog=rgb(pal.fog);
 const posX=P.x/TS,posY=(P.y-6)/TS,A=P.lookA,dirX=Math.cos(A),dirY=Math.sin(A),pl=Math.tan(1.2/2),plX=-dirY*pl,plY=dirX*pl;
 let rad=TS*5;if(S.area==='city')rad=TS*6;else if(S.area==='nl')rad=TS*6;else if(S.past)rad=TS*9;else if(S.area==='factory')rad=TS*(S.flags.power?6.5:4.6);else if(S.area==='lab')rad=TS*5.2;else rad=TS*4.3;
 const maxD=rad*VISION_BOOST/TS*(S.area==='nl'?1.6:1);
 const bob=P.walkW*(1.2+1.8*P.runW)*Math.sin(P.phase*2)*H/220;const hor=H/2+bob;
 let g=c.createLinearGradient(0,0,0,hor);g.addColorStop(0,pal.sky);g.addColorStop(1,pal.fog);c.fillStyle=g;c.fillRect(0,0,W,hor+1);
 g=c.createLinearGradient(0,hor,0,H);g.addColorStop(0,pal.fog);g.addColorStop(.55,pal.floor);{const fl=rgb(pal.floor);g.addColorStop(1,'rgb('+Math.min(255,fl[0]*1.45)+','+Math.min(255,fl[1]*1.45)+','+Math.min(255,fl[2]*1.45)+')');}c.fillStyle=g;c.fillRect(0,hor,W,H-hor);
 floorCast(c,W,H,hor,posX,posY,dirX,dirY,plX,plY,maxD,pal);
 const zb=new Float32Array(W);
 for(let x=0;x<W;x++){
  const cam=2*x/W-1,rx=dirX+plX*cam,ry=dirY+plY*cam;
  let mx=Math.floor(posX),my=Math.floor(posY);const ddx=Math.abs(1/(rx||1e-6)),ddy=Math.abs(1/(ry||1e-6));
  let sx,sy,sdx,sdy;if(rx<0){sx=-1;sdx=(posX-mx)*ddx;}else{sx=1;sdx=(mx+1-posX)*ddx;}if(ry<0){sy=-1;sdy=(posY-my)*ddy;}else{sy=1;sdy=(my+1-posY)*ddy;}
  let hit=null,side=0,dist=maxD;
  for(let i=0;i<80;i++){if(sdx<sdy){sdx+=ddx;mx+=sx;side=0;}else{sdy+=ddy;my+=sy;side=1;}
   const d=side?sdy-ddy:sdx-ddx;if(d>maxD)break;const tt=tile(mx,my);if(FP_WALL.has(tt)){hit=tt;dist=d;break;}}
  zb[x]=dist;if(!hit)continue;
  const lh=H/Math.max(.05,dist),hf=wallH(hit),bot=hor+lh*.5,top=bot-lh*hf;
  let wx=side?posX+dist*rx:posY+dist*ry;wx-=Math.floor(wx);
  const ft=Math.min(1,Math.pow(dist/maxD,1.5)),base=rgb(hit==='V'?pal.fog:wallBase(hit,mx,my));
  const lit=S.area==='nl'&&pal.fog==='#e9edf5'?1:1+.9*Math.max(0,1-dist/(maxD*.55));
  const sh=(hit==='V'?1:(side?.78:1))*lit,col=[Math.min(255,base[0]*sh),Math.min(255,base[1]*sh),Math.min(255,base[2]*sh)];
  if((hit==='#'&&S.area!=='nl')||hit==='B'||(TP[hit]&&hit!=='V')){
   const unit=lh,sx=Math.min(63,Math.floor(wx*64));
   const floors=Math.ceil(hf);
   for(let f=0;f<floors;f++){const yb=bot-unit*f,ht=Math.min(unit,yb-top);if(ht<=0)break;
    const tex=TP[hit]?tileCanvas(hit,mx,my).cv:wallCanvas(mx,my,f===0?'face':'upper');const frac=ht/unit;c.drawImage(tex,sx,64*(1-frac),1,64*frac,x,yb-ht,1,ht+.5);}
   if(lit>1.01&&!side){c.globalCompositeOperation='lighter';c.fillStyle='rgba(255,255,255,'+((lit-1)*.09).toFixed(3)+')';c.fillRect(x,top,1,bot-top+1);c.globalCompositeOperation='source-over';}
   {const ds=side?.24:0,oa=1-(1-ds)*(1-ft);if(oa>.01){const f=ft/oa;c.fillStyle='rgba('+(fog[0]*f|0)+','+(fog[1]*f|0)+','+(fog[2]*f|0)+','+oa.toFixed(3)+')';c.fillRect(x,top,1,bot-top+1);}}
   if(hit==='#'&&S.area==='lab'&&ft<.97){const hh='hsl('+Math.round(195+55*Math.sin(NOW*.45+mx*.35+my*.2))+',55%,72%)';c.fillStyle=hh;c.globalAlpha=1-ft*.7;c.fillRect(x,bot-unit*.66,1,Math.max(1,unit*.05));c.globalAlpha=1;}
   continue;
  }
  c.fillStyle=mixc(col,fog,ft);c.fillRect(x,top,1,bot-top+1);
  if(ft>.97||hit==='V')continue;
  const seg=(v0,v1,hex,a)=>{const cc=rgb(hex);c.fillStyle=mixc([cc[0]*sh,cc[1]*sh,cc[2]*sh],fog,a===undefined?ft:a);c.fillRect(x,bot-lh*v1,1,lh*(v1-v0)+1);};
  if((hit==='#'&&S.area==='city')||hit==='B'){const win=(wx*2%1)>.18&&(wx*2%1)<.62;if(win)for(let f=0;f<Math.floor(hf);f++)seg(f+.3,f+.72,hit==='B'?'#cfe3f7':'#141414');if(hit==='B')seg(0,.06,'#d9d4ca');}
  else if(hit==='#'&&S.area==='school'){seg(0,.12,S.past?'#5d5d5a':'#1e1e1e');if(S.past&&my===11)seg(.82,.95,(Math.floor(wx*4)%2)?'#c9c9c4':'#6a6a67');}
  else if(hit==='#'&&S.area==='factory'){if((wx*4%1)<.5)seg(0,.16,S.past?'#b3b3a6':(S.flags.power?'#8a7420':'#3b3414'));seg(.62,.7,'#1f2121');}
  else if(hit==='#'&&S.area==='lab'){const hh='hsl('+Math.round(195+55*Math.sin(NOW*.45+mx*.35+my*.2))+',55%,72%)';c.fillStyle=hh;c.globalAlpha=1-ft*.7;c.fillRect(x,bot-lh*.66,1,Math.max(1,lh*.03));c.globalAlpha=1;seg(0,.1,'#15171a');}
  else if(hit==='X'){seg(.88,1,'#4a4d4d');if((wx*5%1)<.12)seg(.1,.85,'#2e3030');if(S.flags.power&&Math.abs(wx-.7)<.06&&Math.sin(NOW*4+mx)>0)seg(.7,.76,'#d8b13a',ft*.5);}
  else if(hit==='S'){if(Math.abs(wx-.8)<.06)for(let i=0;i<6;i++)if(Math.sin(NOW*(2+i)+mx*3+my)>.2)seg(.15+i*.13,.19+i*.13,i%3?'#78c8a0':'#8caaff',ft*.4);}
  else if(hit==='Q'||hit==='J'||hit==='L'||hit==='K'){if(Math.abs(wx-.5)<.03)seg(0,1,hit==='L'||hit==='J'?'#dfe8ff':'#1b1d20');if(Math.abs(wx-.8)<.05)seg(.45,.5,hit==='K'?'#d8b13a':'#c8322d',ft*.5);}
  else if(hit==='G'){if((wx*7%1)<.35)seg(0,1,'#6b6b6b');}
  else if(hit==='M'){if(Math.abs(wx-.5)<.28)seg(.42,.78,'#c8322d');if(Math.abs(wx-.5)<.12)seg(.5,.7,'#f4f4f0');}
 }
 // world-fixed boxes + billboards
 const list=[],boxes=[],planes=[],R2=maxD+1;
 objs().forEach(o=>{if(o.t==='none'||o.t==='carrec')return;const sp=SPR[o.t];if(!sp)return;
  if(o.t==='device'||o.t==='core'||o.t==='retgate'){const f=objFront(o),sz=o.t==='core'?[2.1,2.2]:[1.05,1.12];list.push({x:f[0]/TS,y:f[1]/TS,sp:[sz[0],sz[1],'#eaf2ff',o.t==='device'?.05:o.t==='core'?-.1:0],o,col:'#eaf2ff',img:dynFrame(o.t),src:[0,0,160,150]});return;}
  if(o.t==='portal'){const f=objFront(o);list.push({x:f[0]/TS,y:f[1]/TS,sp:[1.7,1.85,'#d8dce6'],o,col:'#d8dce6',img:portalFrame(),src:[0,0,160,150]});return;}
  if(BOXT.has(o.t)){
   const wm=FP_WALL.has(tile(o.x,o.y)),cw=(o.w||1),cx=o.x+cw/2,hw=Math.min(sp[1]/2,cw*.5);let b;
   if(wm){const f=wallFace(o),fy=f>0?o.y+1:o.y;b={x0:cx-hw,x1:cx+hw,y0:f>0?fy:fy-.06,y1:f>0?fy+.06:fy};}
   else{const hd=Math.min(.45,Math.max(.12,sp[1]*.4)),hx=Math.min(hw,.48*cw);b={x0:cx-hx,x1:cx+hx,y0:o.y+.5-hd,y1:o.y+.5+hd};}
   b.z0=sp[3]||0;b.z1=b.z0+sp[0];b.col=sp[2];b.top=lighten(sp[2],1.25);
   const tr=FPTEX[o.t];if(tr&&OP[o.t]){const bb=objBox(o.t);b.img=objCanvas(o,objState(o));b.src=[(tr[0]-bb[0])*OSC,(tr[1]-bb[1])*OSC,tr[2]*OSC,tr[3]*OSC];}
   boxes.push(b);
   if(objGlowColor(o))list.push({x:(b.x0+b.x1)/2,y:(b.y0+b.y1)/2,sp,o,glowOnly:1,zc:(b.z0+b.z1)/2});
   return;}
  const f=objFront(o),ent={x:f[0]/TS,y:f[1]/TS,sp,o,col:o.t==='person'?o.c:sp[2]};
  if(IMGBB[o.t]&&OP[o.t]){const b=objBox(o.t),reg=o.t==='clock'?(o.pole?[5,-17,22,47]:[5,1,22,22]):IMGBB[o.t];ent.img=objCanvas(o,objState(o));ent.src=[(reg[0]-b[0])*OSC,(reg[1]-b[1])*OSC,reg[2]*OSC,reg[3]*OSC];if(o.t==='clock')ent.sp=[o.pole?1.35:.6,.62,sp[2],o.pole?0:.3];}
  list.push(ent);});
 fpCombatSprites(list);
 const m=MAPS[S.area],x0=Math.max(0,Math.floor(posX-R2)),x1=Math.min(m.w-1,Math.ceil(posX+R2)),y0=Math.max(0,Math.floor(posY-R2)),y1=Math.min(m.h-1,Math.ceil(posY+R2));
 for(let y=y0;y<=y1;y++)for(let x=x0;x<=x1;x++){const tt=tile(x,y);
  if(tt==='Z'||tt==='U'){if(tile(x-1,y)!==tt)boxes.push({x0:x+.02,x1:x+.09,y0:y,y1:y+1,z0:0,z1:.5,col:'#5a5d5d',top:'#8a8d8d'});if(tile(x+1,y)!==tt)boxes.push({x0:x+.91,x1:x+.98,y0:y,y1:y+1,z0:0,z1:.5,col:'#4a4d4d',top:'#7a7d7d'});continue;}
  const lt=LOWT[tt];if(!lt)continue;
  if(tt==='T'){const tc=treeCanvas(x,y);planes.push({ax:x+.5-.56,ay:y+.5,bx:x+.5+.56,by:y+.5,h:1.95,img:tc});planes.push({ax:x+.5,ay:y+.5-.56,bx:x+.5,by:y+.5+.56,h:1.95,img:tc,flip:1});continue;}
  if(tt==='c')continue;
  if(tt==='r'){rubble3D(x,y).forEach(b=>b.bar?list.push(b.bar):boxes.push(b));continue;}
  const ins=tt==='C'?.2:.05,col=tt==='d'&&S.past?'#a3a39e':(lt[2]||PAST[(x+y*3)%PAST.length]);
  const bx={x0:x+ins,x1:x+1-ins,y0:y+ins+(tt==='c'?.12:0),y1:y+1-ins-(tt==='c'?.12:0),z0:0,z1:lt[0],col,top:lighten(col,1.3)};
  if(tt==='c')bx.bands=[[0,.1,'#0d0d0d'],[.1,.13,'#6a6a6a'],[.3,.45,'#15171a'],[.45,.5,lighten(col,1.2)]];
  else if(tt==='d')bx.bands=[[0,.3,S.past?'#5e5e5b':'#1c1c1c'],[.3,.36,S.past?'#8f8c84':'#2c2b28'],[.36,.42,S.past?'#cfcbc1':'#5b5954']];
  else if(tt==='C')bx.bands=[[0,.2,'#cfcbd8'],[.2,.3,col]];
  boxes.push(bx);}
 if(S.area==='city')CARS.forEach(cr=>{const hh=cr.d==='h';const x0=cr.x+(hh?.05:.12),x1=cr.x+(hh?1.95:.88),y0=cr.y+(hh?.14:.05),y1=cr.y+(hh?.86:1.95);
  if(Math.abs((x0+x1)/2-posX)>R2+1||Math.abs((y0+y1)/2-posY)>R2+1)return;const md=carModel(cr),v=Math.max(0,Math.min(255,Math.round(md.base*.95)));
  const col='#'+[v+md.tint[0],v+md.tint[1],v+md.tint[2]].map(q=>Math.max(0,Math.min(255,Math.round(q))).toString(16).padStart(2,'0')).join('');
  boxes.push({x0,x1,y0,y1,z0:0,z1:.56,col,top:lighten(col,1.22),img:carSideCanvas(cr).cv,src:[0,12,192,78],texSide:hh?1:0,
   bands:[[0,.1,'#0d0d0d'],[.1,.14,'#5a5a5a'],[.3,.47,'#15171a'],[.47,.56,lighten(col,1.15)]]});});
 const nearT=new Float32Array(W).fill(1e9),nearY=new Float32Array(W).fill(H);
 if(boxes.length||planes.length)for(let x=0;x<W;x++){
  const cam=2*x/W-1,rx=dirX+plX*cam,ry=dirY+plY*cam,hits=[];
  for(let i=0;i<boxes.length;i++){const b=boxes[i];let t0=-1e9,t1=1e9,sd=0;
   if(Math.abs(rx)<1e-9){if(posX<b.x0||posX>b.x1)continue;}else{let a=(b.x0-posX)/rx,d=(b.x1-posX)/rx;if(a>d){const q=a;a=d;d=q;}if(a>t0){t0=a;sd=0;}if(d<t1)t1=d;}
   if(Math.abs(ry)<1e-9){if(posY<b.y0||posY>b.y1)continue;}else{let a=(b.y0-posY)/ry,d=(b.y1-posY)/ry;if(a>d){const q=a;a=d;d=q;}if(a>t0){t0=a;sd=1;}if(d<t1)t1=d;}
   if(t0>t1||t0<.06||t0>=zb[x]||t0>maxD)continue;hits.push([t0,Math.min(t1,zb[x]),sd,b]);}
  for(let i=0;i<planes.length;i++){const pl=planes[i],ex=pl.bx-pl.ax,ey=pl.by-pl.ay,den=rx*ey-ry*ex;if(Math.abs(den)<1e-9)continue;
   const qx=pl.ax-posX,qy=pl.ay-posY,tq=(qx*ey-qy*ex)/den,uq=(qx*ry-qy*rx)/den;if(uq<0||uq>1||tq<.08||tq>=zb[x]||tq>maxD)continue;hits.push([tq,tq,-1,pl,uq]);}
  if(!hits.length)continue;hits.sort((a,b)=>b[0]-a[0]);
  for(const h of hits){const ta=h[0],tb=h[1],b=h[3],la=H/ta,lb=H/tb;
   if(h[2]===-1){const yT2=hor+la*(.5-b.h),yB2=hor+la*.5,ft2=Math.min(1,Math.pow(ta/maxD,1.5));let u=h[4];if(b.flip)u=1-u;
    c.globalAlpha=Math.max(0,1-ft2*.95);c.imageSmoothingEnabled=true;c.drawImage(b.img,Math.min(95,u*96),18,1,168,x,yT2,1,yB2-yT2);c.imageSmoothingEnabled=false;c.globalAlpha=1;continue;}
   let z1=b.z1,tex=1;
   if(b.rough){const u=h[2]?posX+ta*rx:posY+ta*ry,q=Math.floor(u*22)+b.rough*31,n1=h2(q,b.rough),n2=h2(Math.floor(u*9)+7,b.rough*3);
    z1=b.z0+(b.z1-b.z0)*(.72+.42*n2);tex=.72+.4*n1;}
   const yT=hor+la*(.5-z1),yB=hor+la*(.5-b.z0),ft=Math.min(1,Math.pow(ta/maxD,1.5));
   const lit=S.area==='nl'&&pal.fog==='#e9edf5'?1:1+.9*Math.max(0,1-ta/(maxD*.55)),sh=(h[2]?.78:1)*lit*tex,cc=rgb(b.col);
   c.fillStyle=mixc([Math.min(255,cc[0]*sh),Math.min(255,cc[1]*sh),Math.min(255,cc[2]*sh)],fog,ft);c.fillRect(x,yT,1,yB-yT+1);
   if(b.img&&ft<.98&&(b.texSide===undefined||h[2]===b.texSide)){const hx=posX+ta*rx,hy=posY+ta*ry;let u=h[2]?(hx-b.x0)/(b.x1-b.x0):(hy-b.y0)/(b.y1-b.y0);u=Math.max(0,Math.min(.999,u));
    c.imageSmoothingEnabled=true;c.drawImage(b.img,b.src[0]+u*b.src[2],b.src[1],Math.max(1,b.src[2]/Math.max(1,(b.x1-b.x0)*la)),b.src[3],x,yT,1,yB-yT+1);c.imageSmoothingEnabled=false;
    if(h[2]){c.fillStyle='rgba(0,0,0,.2)';c.fillRect(x,yT,1,yB-yT+1);}
    if(lit>1.01){c.globalCompositeOperation='lighter';c.fillStyle='rgba(255,255,255,'+((lit-1)*.08).toFixed(3)+')';c.fillRect(x,yT,1,yB-yT+1);c.globalCompositeOperation='source-over';}
    if(ft>.01){c.fillStyle='rgba('+fog[0]+','+fog[1]+','+fog[2]+','+ft.toFixed(3)+')';c.fillRect(x,yT,1,yB-yT+1);}}
   else if(b.bands)b.bands.forEach(q=>{if(q[1]>z1)return;const y1=hor+la*(.5-q[1]),y0=hor+la*(.5-q[0]),bc=rgb(q[2]);c.fillStyle=mixc([Math.min(255,bc[0]*sh),Math.min(255,bc[1]*sh),Math.min(255,bc[2]*sh)],fog,ft);c.fillRect(x,y1,1,y0-y1+1);});
   let topY=yT;
   if(z1<.5){const yF=hor+lb*(.5-z1);const tc=rgb(b.top);c.fillStyle=mixc([Math.min(255,tc[0]*lit),Math.min(255,tc[1]*lit),Math.min(255,tc[2]*lit)],fog,ft);c.fillRect(x,yF,1,yT-yF+1);topY=yF;}
   if(ta<nearT[x]){nearT[x]=ta;nearY[x]=topY;}
  }
 }
 const inv=1/(plX*dirY-dirX*plY);
 list.forEach(s=>{const dx=s.x-posX,dy=s.y-posY;s.tx=inv*(dirY*dx-dirX*dy);s.ty=inv*(-plY*dx+plX*dy);});
 list.filter(s=>s.ty>.12&&s.ty<maxD).sort((a,b)=>b.ty-a.ty).forEach(s=>{
  const sc=H/s.ty,sxp=W/2*(1+s.tx/s.ty),sw=Math.max(1,sc*s.sp[1]),shh=Math.max(1,sc*s.sp[0]);
  const lift=(s.sp[3]||0)*sc,bot=hor+sc*.5-lift,top=bot-shh;
  if(s.glowOnly){const gc2=objGlowColor(s.o),ci=Math.round(sxp);if(!gc2||ci<0||ci>=W||s.ty>=zb[ci]||s.ty>nearT[ci]+.7)return;
   let gcol=gc2;if(S.area==='nl'&&gcol===COL.nuri)gcol='#9d7ae6';const ft=Math.min(1,Math.pow(s.ty/maxD,1.5));
   const cy=hor+sc*(.5-s.zc),r=Math.max(4,sc*.45),a=(gcol===COL.white?.25:.45)+.15*Math.sin(NOW*3+s.o.x);
   const gg=c.createRadialGradient(sxp,cy,0,sxp,cy,r);gg.addColorStop(0,hexA(gcol,a*(1-ft*.6)));gg.addColorStop(1,hexA(gcol,0));c.fillStyle=gg;c.fillRect(sxp-r,cy-r,r*2,r*2);
   c.fillStyle=hexA(gcol,.95);c.fillRect(Math.round(sxp)-1,Math.round(cy)-1,2,2);return;}
  const xa=Math.max(0,Math.floor(sxp-sw/2)),xb=Math.min(W-1,Math.ceil(sxp+sw/2));if(xa>xb)return;
  if(s.img){const ft=Math.min(1,Math.pow(s.ty/maxD,1.5)),sr=s.src,left=sxp-sw/2;
   if(s.o&&s.o.t==='ghost')c.globalAlpha=.6+.15*Math.sin(NOW*2+s.o.x);else if(s.o&&s.o.t==='coat')c.globalAlpha=.7;
   c.imageSmoothingEnabled=true;
   for(let x=xa;x<=xb;x++){if(s.ty>=zb[x])continue;let hh=shh;if(s.ty>nearT[x]+.02)hh=Math.min(shh,nearY[x]-top);if(hh<=0)continue;
    const u=(x+.5-left)/sw;if(u<0||u>1)continue;const sxs=sr[0]+u*sr[2];
    c.drawImage(s.img,Math.min(sr[0]+sr[2]-1,sxs),sr[1],Math.max(1,sr[2]/sw),sr[3]*hh/shh,x,top,1,hh);
    if(ft>.01){c.globalAlpha=1;c.fillStyle='rgba('+fog[0]+','+fog[1]+','+fog[2]+','+(ft*.9).toFixed(3)+')';c.fillRect(x,top,1,hh);if(s.o&&s.o.t==='ghost')c.globalAlpha=.6;}}
   c.imageSmoothingEnabled=false;c.globalAlpha=1;
   if(s.o){const gc2=objGlowColor(s.o);const ci=Math.round(sxp);if(gc2&&ci>=0&&ci<W&&s.ty<zb[ci]){let gcol=gc2;if(S.area==='nl'&&gcol===COL.nuri)gcol='#9d7ae6';
    const cy=top+shh*.45,r=Math.max(3,sw*.7),a=(gcol===COL.white?.2:.35)+.12*Math.sin(NOW*3+s.o.x);const gg=c.createRadialGradient(sxp,cy,0,sxp,cy,r);gg.addColorStop(0,hexA(gcol,a*(1-ft*.6)));gg.addColorStop(1,hexA(gcol,0));c.fillStyle=gg;c.fillRect(sxp-r,cy-r,r*2,r*2);}}
   return;}
  const ft=Math.min(1,Math.pow(s.ty/maxD,1.5)),cc=rgb(s.col.charAt(0)==='#'?s.col:'#888888'),fig=s.o&&FIG.has(s.o.t);
  const ghost=s.o&&(s.o.t==='ghost'||s.o.t==='coat');if(ghost)c.globalAlpha=.55+.15*Math.sin(NOW*2+s.o.x);
  let run=-1;
  const flush=(a,b)=>{if(a<0)return;const w=b-a;
   if(fig){c.fillStyle=mixc([cc[0],cc[1],cc[2]],fog,ft);c.fillRect(a,top+shh*.3,w,shh*.7);
    const ha=Math.max(a,Math.floor(sxp-sw*.3)),hb=Math.min(b,Math.ceil(sxp+sw*.3));if(hb>ha){c.fillStyle=mixc(s.o.t==='ghost'?cc:[228,223,213],fog,ft);c.fillRect(ha,top,hb-ha,shh*.28);c.fillStyle=mixc([22,22,22],fog,ft);if(s.o.t!=='ghost')c.fillRect(ha,top,hb-ha,shh*.08);}}
   else{c.fillStyle=mixc(cc,fog,ft);c.fillRect(a,top,w,shh);c.fillStyle=mixc([Math.min(255,cc[0]*1.25),Math.min(255,cc[1]*1.25),Math.min(255,cc[2]*1.25)],fog,ft);c.fillRect(a,top,w,Math.max(1,shh*.08));}};
  for(let x=xa;x<=xb;x++){const v=s.ty<zb[x];
   if(v&&s.ty>nearT[x]+.02){if(run>=0){flush(run,x);run=-1;}const cb=nearY[x];if(cb>top){c.save();c.beginPath();c.rect(x,0,1,cb);c.clip();flush(x,x+1);c.restore();}continue;}
   if(v&&run<0)run=x;if(!v&&run>=0){flush(run,x);run=-1;}}
  if(run>=0)flush(run,xb+1);
  c.globalAlpha=1;
  if(s.o){const gc2=objGlowColor(s.o);const ci=Math.round(sxp);if(gc2&&ci>=0&&ci<W&&s.ty<zb[ci]){
   let gcol=gc2;if(S.area==='nl'&&gcol===COL.nuri)gcol='#9d7ae6';
   const cy=top+shh*.45,r=Math.max(3,sw*.7),a=(gcol===COL.white?.25:.45)+.15*Math.sin(NOW*3+s.o.x);
   const gg=c.createRadialGradient(sxp,cy,0,sxp,cy,r);gg.addColorStop(0,hexA(gcol,a*(1-ft*.6)));gg.addColorStop(1,hexA(gcol,0));c.fillStyle=gg;c.fillRect(sxp-r,cy-r,r*2,r*2);
   c.fillStyle=hexA(gcol,.95);c.fillRect(Math.round(sxp)-1,Math.round(cy)-1,2,2);}}
 });
 // to screen
 ctx.setTransform(1,0,0,1,0,0);ctx.imageSmoothingEnabled=false;ctx.drawImage(fpc,0,0,cv.width,cv.height);
 if(S.past){ctx.globalCompositeOperation='color';ctx.globalAlpha=.62;fr('#3f6fcf',0,0,cv.width,cv.height);ctx.globalCompositeOperation='source-over';ctx.globalAlpha=1;}
 if(S.area!=='nl'||P.y<11*TS&&P.x>29*TS){const vg=ctx.createRadialGradient(cv.width/2,cv.height*.55,cv.height*.25,cv.width/2,cv.height*.55,cv.height*.9);vg.addColorStop(0,'rgba(0,0,0,0)');vg.addColorStop(1,'rgba(0,0,0,.55)');ctx.fillStyle=vg;ctx.fillRect(0,0,cv.width,cv.height);}
 if(S.area==='factory'&&S.flags.power&&!S.past){ctx.fillStyle=hexA(COL.yellow,.03+.03*Math.sin(t*3));ctx.fillRect(0,0,cv.width,cv.height);}
 if(alarmT>0){ctx.fillStyle=hexA(COL.red,(Math.sin(t*18)>0?.22:.06)*Math.min(1,alarmT));ctx.fillRect(0,0,cv.width,cv.height);}
 drawFPWeapon();hurtVignette();
 const u=DPR;fr('rgba(231,227,218,.55)',cv.width/2-2*u,cv.height/2-2*u,4*u,4*u);
 if(near&&!busy()){const nm=near.rec?R[near.rec].title:(near.t==='lever'?near.L+' 레버':(OBJ_NAME[near.t]||'대상'));
  const label=(isTouch?'조사':'E')+'  ·  '+nm;ctx.font='bold '+(14*u)+'px "Nanum Gothic Coding",monospace';const w=ctx.measureText(label).width+24*u;
  const bx=cv.width/2-w/2,by=cv.height*.62;fr('rgba(0,0,0,.75)',bx,by,w,30*u);ctx.strokeStyle='#e7e3da';ctx.lineWidth=u;ctx.strokeRect(bx+.5,by+.5,w-1,30*u-1);
  ctx.fillStyle='#e7e3da';ctx.textAlign='center';ctx.fillText(label,cv.width/2,by+20*u);ctx.textAlign='left';}
 if(!grainPat)grainPat=ctx.createPattern(gc,'repeat');
 ctx.globalAlpha=(S.area==='nl'?.03:.07)*(isTouch?.7:1);const ox=Math.floor(Math.random()*128),oy=Math.floor(Math.random()*128);
 ctx.translate(-ox,-oy);ctx.fillStyle=grainPat;ctx.fillRect(0,0,cv.width+ox,cv.height+oy);ctx.setTransform(1,0,0,1,0,0);ctx.globalAlpha=1;
}
function toggleFP(){
 if(!started||dlg||arcOpen||kpOpen||endOpen||transitioning||cinema)return;
 FPV=!FPV;try{localStorage.setItem('ruins-fpv',FPV?'1':'0');}catch(e){}
 if(FPV){P.lookA=Math.atan2(P.fy||0,P.fx||0)||P.lookA;}
 updateFPBtn();toast(FPV?'1인칭 시점 · '+(isTouch?'조이스틱으로 이동, 화면을 끌어 방향 전환':'WASD로 이동, 화면을 끌거나 ←→로 방향 전환, Z로 돌아가기'):'탑다운 시점');
}
function updateFPBtn(){const b=$('fpBtn');if(b)b.textContent=(FPV?'탑다운':'1인칭')+(isTouch?'':' (Z)');}

let last=performance.now(),hudT=0;
let perfT=0,perfN=0,perfAcc=0;
function loop(now){
 const raw=(now-last)/1000,dt=Math.min(.05,raw);last=now;
 if(started&&raw<1){perfAcc+=raw;perfN++;perfT+=raw;if(perfT>1.5){const avg=perfAcc/perfN;perfT=0;perfN=0;perfAcc=0;
  if(avg>.034&&RS>.5){RS=Math.max(.5,RS-.15);resize();}else if(avg<.019&&RS<1){RS=Math.min(1,RS+.1);resize();}}}
 if(shakeT>0)shakeT-=dt;if(alarmT>0)alarmT-=dt;
 update(dt);draw(now/1000);
 hudT+=dt;if(hudT>.25&&started){hudT=0;updateHUD();updateCombatHud();$('recTime').textContent=fmt(S.time);}
 requestAnimationFrame(loop);
}
requestAnimationFrame(loop);

/* ================= TITLE / END ================= */
$('tCtl').innerHTML=isTouch?'화면 왼쪽을 끌어 이동하고, 조사 버튼으로 기록을 살핍니다.':'WASD 또는 방향키로 이동 · Shift로 달리기 · Enter로 조사<br>Space나 마우스 클릭으로 공격 (꾹 누르면 강공격) · Q 무기 전환 · 1·2·3 아이템<br>Tab으로 기록 보관함 · Z로 1인칭 시점';
accountUI();initAccount();
$('btnNew').onclick=()=>{
 if(!loadSave()){beginNew();return;}
 const bt=$('tBtns');const keep=bt.innerHTML;
 bt.innerHTML='<div class="t-confirm">지금까지의 진행이 초기화됩니다.'+(ACC.profile?'<br>평생 기록과 본 엔딩은 계정에 남아요.':'')+'</div><button id="cfY">초기화하고 새로 기록하기</button><button id="cfN">취소</button>';
 $('cfY').onclick=()=>{bt.innerHTML=keep;bindTitle();beginNew();};
 $('cfN').onclick=()=>{bt.innerHTML=keep;bindTitle();};
};
const newHandler=$('btnNew').onclick;
function bindTitle(){$('btnNew').onclick=newHandler;$('btnCont').onclick=contHandler;$('btnCont').classList.toggle('hidden',!loadSave());}
function beginNew(){
 wipeSave();wiped=false;
 S=fresh();P.x=S.x;P.y=S.y;P.fx=0;P.fy=1;
 const seq=$('tSeq');seq.classList.remove('hidden');
 const loopN=getLoops();
 seq.innerHTML='<div class="t-day">DAY 1</div>'+(loopN?'<div class="t-loop">관측 회차 '+(6+loopN)+'</div>':'');
 setTimeout(()=>{
  seq.innerHTML='<div class="t-q">기록을 시작하시겠습니까?</div><div class="t-yn"><button id="yY">YES</button><button id="yN">NO</button></div>';
  $('yY').onclick=startGame;$('yY').focus();
  $('yN').onclick=()=>{seq.innerHTML='<div class="t-q">……기록은 이미 시작되었습니다.</div>';setTimeout(startGame,1900);};
 },1800);
};
$('btnCont').onclick=()=>{
 const d=loadSave();if(!d)return;S=Object.assign(fresh(),d,{past:false});P.x=S.x;P.y=S.y;wiped=false;ensureCombatState();clearZombies();setTimeout(()=>updateCombatHud(true),0);
 $('title').classList.add('hidden');$('hud').classList.remove('hidden');started=true;updateHUD(true);unstuck();refreshBusy();save();
 toast(ACC.profile?'기록자 '+ACC.profile.name+'의 기록을 이어갑니다':'기록을 이어갑니다');
};
const contHandler=$('btnCont').onclick;
function startGame(){
 $('title').classList.add('hidden');$('tSeq').classList.add('hidden');$('hud').classList.remove('hidden');
 started=true;ensureCombatState();updateHUD(true);updateCombatHud(true);save();
 say(['…눈을 뜨자, 텅 빈 도로 위였다.','꺼진 간판, 멈춘 차들, 소리 없는 신호등. 이 도시에는 아무도 없다.','나는 기록자다. 이 도시에 남은 기록을 모으러 왔다.','…언제, 어떻게 이곳에 왔는지는 기억나지 않는다.','손에는 새 야구방망이 하나가 쥐어져 있다.'].concat(getLoops()?['…그런데 어째서인지, 이 거리를 알고 있는 것 같다.']:[]),
  ()=>toast(isTouch?'조사 버튼으로 기록을 살피고, 공격 버튼으로 방망이를 휘두르자':'Enter로 조사, Space나 마우스 클릭으로 방망이를 휘두르자'));
}
function runLines(lines,glitch,done,slowAt){
 endOpen=true;refreshBusy();const el=$('end');el.classList.remove('hidden','forget','truth','nuri','loop');
 const box=$('endLines');box.innerHTML='';$('endCard').classList.add('hidden');box.classList.remove('hidden');
 let i=0;
 (function next(){
  if(i<lines.length){const d=document.createElement('div');d.textContent=lines[i]||'\u00a0';if(glitch.indexOf(i)>=0)d.className='g';box.appendChild(d);i++;setTimeout(next,i===slowAt?1500:560);}
  else setTimeout(done,2400);
 })();
}
function runArchiveScene(){
 runLines(['ARCHIVE SYSTEM','','USER: 기록자','STATUS: RECORDING','','관측 번호 #031 · 방문 기록 확인','','기록자님, 다시 오셨군요.','이번이 몇 번째 방문인지 기억하십니까?'],[2,7],()=>{
  $('end').classList.add('hidden');endOpen=false;refreshBusy();updateHUD(true);
  say(['…정신을 차리자 방송실이었다.','숨겨진 방 쪽에서 쇠가 풀리는 소리가 울렸다. 바닥의 철제 해치다.']);
 },7);
}
function runFinal(){
 runLines(['ARCHIVE SYSTEM','','B3 지하 연구시설 접속','USER: UNKNOWN','STATUS: RECORDING','','USER 정보 갱신','USER: 기록자','','당신이 기록을 모으는 동안','우리는 당신을 기록하고 있었습니다.'],[7,10],showEndCard,9);
}
function showEndCard(){
 $('endLines').classList.add('hidden');
 const en=ESC.filter(e=>e.id&&has(e.id)).length;
 const c=$('endCard');c.classList.remove('hidden');
 c.innerHTML='<h2>폐허의 기록</h2><div class="q">END?</div>'+
  '<p>폐허 도시에서 지하 연구시설까지의 기록을 마쳤다.<br>기록 '+S.records.length+' / '+TOTAL+', 발견한 모순 '+S.contra.length+' / '+CONTRA.length+', 탈출구 기록 '+en+' / 4</p>'+
  '<p class="next">데모는 여기까지입니다. 다음 기록은 AREA 05, 누리느엘.</p>'+
  '<div class="t-btns"><button id="eStay">연구시설로 돌아가기</button><button id="eNew">처음부터 다시 기록하기</button></div>';
 $('eStay').onclick=()=>{$('end').classList.add('hidden');endOpen=false;refreshBusy();};
 $('eNew').onclick=()=>{wipeSave().then(()=>location.reload());};
}
function runNuriel(){
 if(transitioning)return;transitioning=true;refreshBusy();alog('USER 이동 · 누리느엘');
 const first=!S.flags.nlVisited,wp=$('warp'),wt=$('warpTxt');
 cv.style.transition='filter 1.6s ease-in';cv.style.filter='saturate(0) brightness(1.5) contrast(.85)';shakeT=.5;
 wp.classList.remove('out');void wp.offsetWidth;wp.classList.add('on');
 if(first)setTimeout(()=>{wt.innerHTML='<div class="w1">누리느엘</div><div class="w2">USER 기록자 · RECORDING</div>';wt.classList.add('on');},1500);
 setTimeout(()=>{S.flags.nlVisited=1;S.area='nl';S.past=false;P.x=6*TS;P.y=21.5*TS;P.lookA=-Math.PI/2;save();updateHUD(true);
  cv.style.transition='none';cv.style.filter='saturate(0) brightness(1.9)';void cv.offsetWidth;},first?3400:1700);
 setTimeout(()=>{wt.classList.remove('on');wp.classList.add('out');wp.classList.remove('on');cv.style.transition='filter 2.8s ease-out';cv.style.filter='saturate(1) brightness(1)';},first?3800:2000);
 setTimeout(()=>{cv.style.transition='';cv.style.filter='';wp.classList.remove('out');transitioning=false;refreshBusy();
  if(!S.flags.nlIntro){S.flags.nlIntro=1;save();say(['빛을 지나자, 먼지 하나 없는 거리가 펼쳐졌다.','색이 있다. 하늘도, 벽도, 나무도. 흑백인 건 나 하나뿐이다.','…그런데 여기는, 내가 처음 눈을 뜬 거리와 똑같이 생겼다.','광장의 시계들이 저마다 다른 시간을 가리키고 있다.']);}},first?6700:4900);
}
function serifLines(lines,delay,then){
 const box=$('endLines');box.innerHTML='';box.classList.remove('hidden');let i=0;
 (function next(){if(i<lines.length){const d=document.createElement('div');d.className='fl';d.textContent=lines[i];box.appendChild(d);i++;setTimeout(next,delay);}else setTimeout(then,2200);})();
}
function endC(){
 endOpen=true;refreshBusy();flash('#ffffff');
 const el=$('end');el.classList.remove('hidden','forget','truth','loop');el.classList.add('nuri');
 $('endCard').classList.add('hidden');const box=$('endLines');box.classList.remove('hidden');
 box.innerHTML='<div class="nq">기록을 시작하시겠습니까?</div><div class="t-yn nyn"><button id="cY">YES</button><button id="cN">NO</button></div>';
 wipeSave();
 const go=yes=>{
  serifLines(yes?['나는 고개를 끄덕였다.','발끝부터 몸이 가벼워진다. 나는 빛이 되어 간다.','서윤이 웃는다. 어디선가 축제 음악이 들린다.','이제, 아무것도 끝나지 않는다.']:['나는 고개를 저었다.','하지만 빛은 이미 나를 적고 있었다.','……기록은 이미 시작되었습니다.'],1700,()=>{
   box.classList.add('hidden');const c=$('endCard');c.classList.remove('hidden');
   addEnding('C');
   c.innerHTML='<h2>END C</h2><div class="q">누리느엘</div><p>누리느엘의 중심에서, 기록자는 도시와 함께 영원히 기록되었다.<br>31번째 의자는 더 이상 비어 있지 않다.</p><p class="next">탈출구에는 아직 고르지 않은 선택지가 남아 있다.</p><div class="t-btns"><button id="eNew">다시 기록하기</button></div>';
   $('eNew').onclick=()=>location.reload();
  });
 };
 $('cY').onclick=()=>go(true);$('cN').onclick=()=>go(false);
}
const LOOPKEY='ruins-record-loop';
function endTrue(){
 endOpen=true;refreshBusy();flash('#ffffff');
 const el=$('end');el.classList.remove('hidden','forget','truth','nuri','loop');
 $('endCard').classList.add('hidden');
 wipeSave();addEnding('TRUE');
 const loop=addLoop();
 serifLines(['모든 기록을 품에 안고, 철문을 열었다.','처음으로, 기록은 하나도 지워지지 않았다.','눈부신 빛. 그리고 바깥 공기.'],1800,()=>{
  el.classList.add('hidden');endOpen=false;cinema=true;refreshBusy();$('hud').classList.add('hidden');$('feed').classList.add('hidden');
  S.area='city';S.past=false;P.x=5.5*TS;P.y=27.6*TS;P.fx=0;P.fy=1;document.body.classList.remove('bright');
  setTimeout(()=>say(['밖으로 나왔다.','그런데……','처음 이 도시에서 눈을 떴던 장소다.','같은 건물. 같은 도로. 같은 전화기. 같은 풍경.'],()=>{
   const f=$('fade');f.style.transition='opacity 3.5s';f.classList.add('on');
   setTimeout(()=>{
    el.classList.remove('hidden');el.classList.add('loop');endOpen=true;cinema=false;f.style.transition='';f.classList.remove('on');refreshBusy();
    const box=$('endLines');box.classList.remove('hidden');box.innerHTML='<div class="t-day">DAY 1</div>';
    setTimeout(()=>{
     box.innerHTML='<div class="t-q">기록을 시작하시겠습니까?</div><div class="t-yn"><button id="lY">YES</button><button id="lN">NO</button></div>';
     const fin=()=>{box.innerHTML='';setTimeout(()=>{box.classList.add('hidden');const c=$('endCard');c.classList.remove('hidden');
      c.innerHTML='<h2>《폐허의 기록》</h2><div class="q">END?</div><p class="next">관측 회차 '+(6+loop)+' 종료.<br>기록자는 다시, 처음 온 사람처럼 눈을 뜬다.</p><div class="t-btns"><button id="eNew">DAY 1</button></div>';
      $('eNew').onclick=()=>location.reload();},2600);};
     $('lY').onclick=fin;$('lN').onclick=fin;
    },2800);
   },3800);
  }),900);
 });
}
function endTruth(){eraseRecords('truth',truthText);}
function endForget(){eraseRecords('forget',forgetText);}
function eraseRecords(cls,then){
 endOpen=true;refreshBusy();flash('#ffffff');
 const el=$('end');el.classList.remove('hidden','forget','truth','nuri','loop');el.classList.add(cls);
 const box=$('endLines');box.innerHTML='';box.classList.remove('hidden');$('endCard').classList.add('hidden');
 const recs=S.records.slice();
 const head=document.createElement('div');head.className='er-h';head.textContent='ERASING ARCHIVED RECORDS';box.appendChild(head);
 const wrap=document.createElement('div');wrap.className='er-w';box.appendChild(wrap);
 const items=recs.map(id=>{const d=document.createElement('span');d.className='er';d.textContent=R[id].title;wrap.appendChild(d);return d;});
 if(!recs.length){const d=document.createElement('div');d.textContent='지울 기록조차 없다.';wrap.appendChild(d);}
 wipeSave();addEnding(cls==='truth'?'A':'B');
 let i=0;
 setTimeout(function next(){
  if(i<items.length){items[i].classList.add('gone');i++;setTimeout(next,280);}
  else setTimeout(()=>then(recs.length),1300);
 },900);
}
function truthText(){
 const box=$('endLines');box.innerHTML='';
 const lines=['기록은 모두 지워졌다.','하지만 나는 기억한다.','2011년 10월 14일 17시 02분. PROJECT NURI는 누리느엘을 열었다.','도시 사람들은 사라진 것이 아니었다. 기록되었을 뿐이다. 끝나지 않는 그날 속에.','신문은 그날을 지웠고, 정부는 영상이 없다고 했다. 그래도 기록은 살아 있었다.','그리고 그 모든 것을 지켜본 31번째 관측 대상.','…기록자. 나.','나는 도시를 떠났다. 진실을 안 채로.'];
 let i=0;
 (function next(){
  if(i<lines.length){const d=document.createElement('div');d.className='fl';d.textContent=lines[i];box.appendChild(d);i++;setTimeout(next,1700);}
  else setTimeout(()=>{
   box.classList.add('hidden');const c=$('endCard');c.classList.remove('hidden');
   c.innerHTML='<h2>END A</h2><div class="q">진실</div>'+
    '<p>도시가 사라진 이유와 누리느엘의 관계를 밝혀냈다.<br>지워진 기록 '+S.records.length+'개와 모순 '+S.contra.length+'개를 기억에 남긴 채.</p>'+
    '<p class="next">하지만 모든 기록을 가져가지는 못했다.<br>기록자는 왜 몇 번이고 이곳에 돌아오는가.</p>'+
    '<div class="t-btns"><button id="eNew">다시 기록하기</button></div>';
   $('eNew').onclick=()=>location.reload();
  },2400);
 })();
}
function forgetText(n){
 const box=$('endLines');box.innerHTML='';
 const lines=['철문이 열리자, 하얀 빛이 쏟아져 들어왔다.','나는 도시를 빠져나왔다.','뒤를 돌아보았지만, 그곳에 무엇이 있었는지 떠오르지 않는다.',n?'신문, 사진, 누군가의 목소리… 모든 것이 흐려진다.':'애초에 기억할 것도 없었다.','나는 진실을 알지 못한 채, 도시를 떠났다.'];
 let i=0;
 (function next(){
  if(i<lines.length){const d=document.createElement('div');d.className='fl';d.textContent=lines[i];box.appendChild(d);i++;setTimeout(next,1500);}
  else setTimeout(()=>{
   box.classList.add('hidden');const c=$('endCard');c.classList.remove('hidden');
   c.innerHTML='<h2>END B</h2><div class="q">망각</div>'+
    '<p>중요한 기록을 충분히 확보하지 못했다.<br>도시가 사라진 이유도, 내가 누구인지도 알지 못한 채.</p>'+
    '<p class="next">탈출구는 하나가 아닐지도 모른다.<br>그리고 기록자는, 이곳에 처음 온 사람이 아니다.</p>'+
    '<div class="t-btns"><button id="eNew">다시 기록하기</button></div>';
   $('eNew').onclick=()=>location.reload();
  },2200);
 })();
}
})();
