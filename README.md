<div align="center">
  <img src="https://user-images.githubusercontent.com/76679811/207053099-866270c2-09f1-4a6b-a335-44b7114a3a96.png" height="250">  
  <h2>부스트 다방 부따(Buddha)</h2>
  <h3>실시간 커피 주문 및 알림 서비스</h3>
  <a href="https://gonnnnn.notion.site/Project-Buddha-2d77d11ebc2241a0961c783bb006692d">Notion</a>　|　
  <a href="https://github.com/boostcampwm-2022/web29-Buddha/wiki">Wiki</a>　|　
  <a href="https://www.figma.com/file/SHy5kFKXKFmeSzOr66QBW1/Buddha-%ED%94%84%EB%A1%9C%ED%86%A0%ED%83%80%EC%9E%85?node-id=0%3A1">Figma</a>
  <br><br>
  <a href="https://hits.seeyoufarm.com"><img src="https://hits.seeyoufarm.com/api/count/incr/badge.svg?url=https%3A%2F%2Fgithub.com%2Fboostcampwm-2022%2Fweb29-Buddha&count_bg=%2379C83D&title_bg=%23555555&icon=&icon_color=%23E7E7E7&title=hits&edge_flat=false"/></a>
  <img src="https://img.shields.io/badge/release-0.3.0-339933">  
  <br><br>
</div>

<div align="center">
  <!-- fe -->
  <img src="https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white"/>
  <br>
  <img src="https://img.shields.io/badge/React-61DAFB?style=flat-square&logo=React&logoColor=white"/>
  <img src="https://img.shields.io/badge/Recoil-blue?style=flat-square"/>
  <img src="https://img.shields.io/badge/Emotion-DB7093?style=flat-square&logo=emotion&logoColor=white"/>
  <img src="https://img.shields.io/badge/MSW-E5E5E5?style=flat-square"/>
   <img src="https://img.shields.io/badge/Testing%20Library-121212?style=flat-square&logo=Testing Library&logoColor=E33332"/>
  <img src="https://img.shields.io/badge/Tanstack Query-ffffff?style=flat-square&logo=React Query"/>
  <br>
  <!--  be -->
  <img src="https://img.shields.io/badge/Node.js-339933?style=flat-square&logo=Node.js&logoColor=white"/>
  <img src="https://img.shields.io/badge/NestJS-E0234E?style=flat-square&logo=NestJS&logoColor=white">
  <img src="https://img.shields.io/badge/Redis-000000?style=flat-square&logo=Redis"/>
  <img src="https://img.shields.io/badge/MySQL-4479A1?style=flat-square&logo=MySQL&logoColor=white"/>
  <img src="https://img.shields.io/badge/TypeORM-FF4716?style=flat-square&logo=%20Actions&logoColor=white"/>
  <br>
  <!-- devops -->
  <img src="https://img.shields.io/badge/Docker-ffffff?style=flat-square&logo=Docker"> 
  <img src="https://img.shields.io/badge/github action-2671E5?style=flat-square&logo=GitHub%20Actions&logoColor=white"/>
  <img src="https://img.shields.io/badge/Naver_Cloud_Platform-ffffff?style=flat-square&logo=Naver"> 
</div>

## 소개

> Buddha는 실시간으로 커피를 주문하고 알림을 받을 수 있는 서비스 입니다.

> Buddha의 사용자는 고객/업주로 나눠집니다.
>
> 고객은 카페에 메뉴를 골라서 주문을 합니다.
>
> 업주는 주문 요청이 온 메뉴를 수락/거절/완료 상태로 변경하여, 고객에게 알려줍니다.

<div align="left">

| <img width=250 object-fit=cover src="https://user-images.githubusercontent.com/76679811/207070062-dc1ad6e9-aee9-4cc4-a7c1-d807fe1f690d.gif"> | <img width=250  object-fit=cover src="https://user-images.githubusercontent.com/76679811/207070038-5c19a09e-b938-4e7d-8387-268f8be0e7c5.gif"> | <img width=250  object-fit=cover src="https://user-images.githubusercontent.com/76679811/207089651-ce6490f0-69fc-4b94-80aa-d495db672e16.gif"> |
| :------------------------------------------------------------------------------------------------------------------------------------------: | :-------------------------------------------------------------------------------------------------------------------------------------------: | :-------------------------------------------------------------------------------------------------------------------------------------------: |
|                                                          `네이버 로그인, 회원가입`                                                           |                                                               `카페 메뉴 조회`                                                                |                                                                `장바구니 관리`                                                                |
| <img width=250 object-fit=cover src="https://user-images.githubusercontent.com/76679811/207089669-b97a0d38-a257-45f5-a44c-6c1111b9a409.gif"> | <img width=250 object-fit=cover src="https://user-images.githubusercontent.com/76679811/207089681-598da010-f3d7-496a-9328-d4297985aa4c.gif">  |                                                                                                                                               |
|                                                           `주문 내역 및 현황 조회`                                                           |                                                               `주문 상태 변경`                                                                |                                                                                                                                               |

</div>
<br>

## 아키텍처 설계

![infra](https://user-images.githubusercontent.com/76679811/207239776-1bca3209-434b-4376-b429-bbb6673c16b9.png)

## 수련일지 🏃‍♂️

> 개발을 진행하며 겪은 메인 이슈들을 트러블 슈팅한 과정입니다!

### BE

<details>
<summary>🏃‍♂️ Polling으로 주문 상태를 확인하자! 근데 이거.. 괜찮은건가?
</summary>
<br>

주문 상태 조회나 새로운 주문 확인 API는 `Polling 방식`으로 서버에서 `항상 DB를 조회`하고 있었습니다. 이들은 다른 API의 응답시간에 영향을 주었습니다. 인덱스를 추가해봤지만 여전히 해결되지는 않았습니다.

따라서 저희는 `캐시`를 이용해 이 문제를 해결하고자 했습니다. Redis와 DB를 동기화 해주는 상황에서 여러가지 문제를 마주쳤습니다. 자세한 내용은 노션을 참조해주세요!

결과적으로 캐시를 이용해 `서버의 DB 접근 작업`이 줄어들고 `응답속도를 개선`할 수 있었습니다.

[🔥 Notion 바로가기](노션)

</details>

<details>
<summary>🏃‍♂️ 테스트 코드 - 주문 생성 로직의 여행기, 나는 어디에 있어야 하는거지?</summary>
<br>

<aside>

`주문 API`가 호출하는 `주문 생성 함수`는 복잡한 로직을 가지고 있었습니다. 정상적으로 동작하는 API 였기에 바로 리팩토링할 수 없었습니다. 그래서 리팩토링 하기전에 테스트 코드를 짜보고자 했습니다.

만만치 않았습니다. 주문 API `테스트 코드를 작성`하면서 여러가지 `고민`들이 생겨났습니다.

저희 팀에서 테스트 코드를 작성하는 방법 보다는, 테스트 코드를 작성하며 **`어떤 노동을 했고`**, **`어떤 고민을 했고`**, 또 `어떤 해결책을 떠올렸는지`에 대해 이야기합니다.

[🤯 Notion 바로가기](추가예정)

</aside>

</details>

<details>
<summary>🏃‍♂️ Docker 캐시 적용이 웨 않되..? 아 설마?? - Github Action에 Docker 덧붙히기</summary>
<br>

Docker는 layer라는 개념을 통해 이미지를 구성합니다. 각각의 layer에서 변화를 감지해 변화가 없으면 이전에 캐싱해둔 것을 가져다 쓰는 방식으로 `이미지 빌드 시간을 단축합니다.`

하지만 github action에서 docker 이미지를 그냥 빌드하는 경우, `로컬 환경과 달리 캐싱이 되지 않는다는 것을 알고 계셨나요?` 이 부분을 확인하고 개선한 결과 이미지 빌드 과정은 2분 30초에서 46초로 약 1분 40~50초 정도, **`66%가량 줄었습니다.`**

`github action runner`상에서 docker 이미지를 위한 `캐싱을 적용하는 방법`을 알아봅니다.

[🐳 Notion 바로가기](https://boostcamp-wm.notion.site/Docker-Github-Action-Docker-578883cb440e480a836eab01c773ac54)

</details>

### FE

<details>
<summary>🏃‍♂️ React Memoization 으로 리렌더링 최적화</summary>
<br>

고민

- 고민거리

</details>

<details>
<summary>🏃‍♂️ 테스트 코드로 버그를 잡아보자</summary>
<br>

고민

- 고민거리

</details>

<details>
<summary>🏃‍♂️ 실시간 데이터를 원해 ❗</summary>
<br>

고민

- 고민거리

</details>

<br>
<br>
<h2>팀원소개</h2>
<br>

|                             J020\_김건                             |                            J089\_박진우                            |                            J117\_오혁진                            |                            J147\_이언호                            |
| :----------------------------------------------------------------: | :----------------------------------------------------------------: | :----------------------------------------------------------------: | :----------------------------------------------------------------: |
| ![img](https://avatars.githubusercontent.com/u/87866588?s=120&v=4) | ![img](https://avatars.githubusercontent.com/u/76679811?s=120&v=4) | ![img](https://avatars.githubusercontent.com/u/26592436?s=120&v=4) | ![img](https://avatars.githubusercontent.com/u/84773475?s=120&v=4) |
|               [Gonnnnn](https://github.com/Gonnnnn)                |             [jinoo7099](https://github.com/jinoo7099)              |               [qmdl980](https://github.com/qmdl980)                |               [unho-00](https://github.com/unho-00)                |
|                              Backend                               |                              Backend                               |                              Frontend                              |                              Frontend                              |
