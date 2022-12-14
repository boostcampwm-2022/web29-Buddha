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

고민

- 고민거리

</details>

<details>
<summary>🏃‍♂️ 테스트 코드 - 주문 생성 로직의 여행기, 나는 어디에 있어야 하는거지?</summary>
<br>

고민

- 고민거리

</details>

<details>
<summary>🏃‍♂️ Docker 캐시 적용이 웨 않되..? 아 설마?? - Github Action에 Docker 덧붙히기</summary>
<br>

고민

- 고민거리

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
