# **인스타그램 클론 코딩**

## **📝 프로젝트 개요**

![clone site image](https://user-images.githubusercontent.com/51189962/129965136-894e771b-666e-41bc-a752-8a0456b2339b.png)

> **프로젝트:** 인스타그램(Instagram) 클론코딩
>
> **기획 및 제작:** 김태진
>
> **분류:** 개인 프로젝트
>
> **제작 기간:** 2021. 03 ~ 08.
>
> **배포일:** 2021.08.18.
>
> **주요 기능:** 회원가입, 로그인, 포스트 작성 및 삭제, 댓글, 유저 검색, 다이렉트 메시지, 팔로우, 프로필 페이지, 좋아요 및 북마크
>
> **사용 기술:** React, Styled-component, Redux-thunk, Firebase
>
> **문의:** keemgreat@gmail.com

<br />

## **🔗 링크**

**링크:** [instagram v1.0.0](https://instagram-73830.web.app)

> `ID: test@gmail.com | PW: 123456`를 입력하여 접속 가능

<br />

## **🏆 목표**

React, Styled-component, redux-thunk, firebase를 이용하여 인스타그램 클론 코딩 완성하기입니다. firebase의 Authentication, Cloud firestore, storage, hosting 서비스를 이용하였습니다. 데이터 베이스와 스토리지에 데이터를 저장하고 불러오는 요청 처리와 완성된 프로젝트의 호스팅을 목표로 진행하였습니다.

<br />

## **🛠 기술 및 도구**

![React](https://img.shields.io/badge/React-53C1DE?style=flat-square&logo=react&logoColor=white) ![Styled-Components](https://img.shields.io/badge/Styled_Components-DB7C85?style=flat-square&logo=styled-components&logoColor=white) ![Redux](https://img.shields.io/badge/Redux_thunk-7F43C5?style=flat-square&logo=redux&logoColor=white) ![Firebase](https://img.shields.io/badge/Firebase-%23039BE5.svg?style=flat-square&logo=firebase)
![GitHub](https://img.shields.io/badge/Github-%23121011.svg?style=flat-square&logo=github&logoColor=white)

<br />

## **👨🏻‍💻 기능 구현**

### **0. DB 설계**

**- Firebase Authentication**

**- Firebase Cloud Firestore**

**- Firebase Storage**

### **1. 회원가입**

**- 이메일을 이용한 회원가입**

<img width="300" src="https://user-images.githubusercontent.com/51189962/130093158-56126d52-86d6-4375-bf44-c003c7983fd4.png" alt="회원가입 화면 이미지"/>
<img width="300" src="https://user-images.githubusercontent.com/51189962/130093874-fd88ba8e-a5a1-4449-a725-fc2d99d63be0.png" alt="회원 관리 이미지"/>

- 이메일, 패스워드, 성명, 아이디를 입력하여 회원가입 구현
- Firebase의 Authentication에서 회원가입한 유저 정보 관리

**- Google 인증을 통한 회원가입**

- 본인의 Google 계정을 연동하여 회원가입 진행하는 기능 구현
- 별도의 이메일, 패스워드 입력없이 Google 계정을 통해 회원가입 및 즉시 회원가입 가능

### **2. 로그인**

**- 이메일 및 패스워드 로그인**

<img width="300" alt="스크린샷 2021-08-20 00 20 40" src="https://user-images.githubusercontent.com/51189962/130095694-d4009fb0-919b-4801-9602-5244868d38cd.png">
<img width="300" alt="스크린샷 2021-08-20 00 25 14" src="https://user-images.githubusercontent.com/51189962/130096348-eb3f8523-f102-484e-aa0a-8f2616885cb6.png">
<img width="300" alt="스크린샷 2021-08-20 00 21 07" src="https://user-images.githubusercontent.com/51189962/130095735-b845a0f0-a092-498d-98b0-f179cee0132a.png">

- 인증된 이메일과 패스워드를 통해 로그인하도록 구현
- 이메일 형식이 아닌 경우, 비밀번호가 6자리 미만인 경우 로그인 버튼 기능을 제한함
- 이메일 혹은 비밀번호만 입력한 경우, 이메일 혹은 비밀번호가 일치하지 않을 경우 로그인 제한 기능 구현

**- Google계정 로그인**

- 기존에 회원가입을 통해 인증된 Google 계정이 존재할 경우 즉시 로그인
- 회원이 존재하지 않더라도 구글 인증 과정을 거친 후 즉시 로그인

### **3. 헤더**

**- 유저 검색**

<img width="300" alt="스크린샷 2021-08-20 00 31 18" src="https://user-images.githubusercontent.com/51189962/130097377-d5838a58-f516-4e1f-94b5-ccdcbd0ae508.png">
<img width="300" alt="스크린샷 2021-08-20 00 33 07" src="https://user-images.githubusercontent.com/51189962/130097714-e3cf3e9f-130b-4759-840a-79189db95655.png">
<img width="300" alt="스크린샷 2021-08-20 00 34 04" src="https://user-images.githubusercontent.com/51189962/130097910-1c3794e0-8c0e-40b5-9d1f-c368210a8842.png">

- 현재 회원가입된 유저를 검색하는 기능 구현
- 최근 검색한 유저의 리스트를 최근 검색 항목에 구현
- 검색 기록 지우기, 모두 지우기, 최근 검색 항목에서 유저를 선택할 경우 최근 검색 항목의 상위로 업데이트하는 기능 구현

**- 네비게이션 바**

<img width="300" alt="스크린샷 2021-08-20 00 39 41" src="https://user-images.githubusercontent.com/51189962/130098920-18b79c39-43c6-4992-a20a-ce0e7c5ce990.png">
<img width="300" alt="스크린샷 2021-08-20 00 39 33" src="https://user-images.githubusercontent.com/51189962/130098924-04010f93-e328-4c7f-bc8a-aa6721eadbfb.png">
<img width="300" alt="스크린샷 2021-08-20 00 39 22" src="https://user-images.githubusercontent.com/51189962/130098927-13515b3e-a88d-4617-8873-f5ddcbc99d29.png">
<img width="300" alt="스크린샷 2021-08-20 00 39 16" src="https://user-images.githubusercontent.com/51189962/130098928-154a7eb3-3c14-4020-b3a5-fc803f1f3887.png">

- 현재 보여주는 페이지에 대해 시각적으로 표시하고 Modal 혹은 Popup창이 열렸다가 닫힐 경우 다시 기존의 페이지로 보여주도록 구현

**- 프로필 팝업**

<img width="300" alt="네비게이션 팝업" src="https://user-images.githubusercontent.com/51189962/130259198-1d03d7b9-72d4-4120-9d15-066308627472.png">

- 프로필 페이지로 이동하기 전 팝업창을 통해 프로필, 저장됨, 좋아요 페이지 혹은 프로필 설정 페이지, 로그아웃 기능을 쉽게 이용할 수 있도록 구현

### **4. 새 게시물 작성**

**- 새 게시물**

<img width="600" alt="새 게시물 작성 과정" src="https://user-images.githubusercontent.com/51189962/130239678-88b228f0-9369-4867-82f6-f62ba935916a.gif">
<img width="600" alt="새 게시물 modal" src="https://user-images.githubusercontent.com/51189962/130236064-5abfb386-da92-4321-9268-2ad23b503bb5.png">
<img width="600" alt="새 게시물 작성 예시" src="https://user-images.githubusercontent.com/51189962/130235710-0101de06-9796-4587-9d28-427a0e14a796.png">
<img width="600" alt="장소 검색" src="https://user-images.githubusercontent.com/51189962/130236717-db216d48-c51c-44d3-844a-feb414d3f636.png">
<img width="600" alt="업로드 중" src="https://user-images.githubusercontent.com/51189962/130235732-61920215-913c-4bb9-a99a-b7c2ac03fb66.png">
<img width="600" alt="업로드 완료" src="https://user-images.githubusercontent.com/51189962/130235734-f9b70d7d-1368-4cc8-ab75-7bec88a6fc84.png">

- 실제 인스타그램의 웹 버전은 모바일 앱과 다르게 새 게시물 작성 기능이 없어 본 프로젝트에서 새롭게 구현함
- 새 게시물 작성은 Modal창으로 작성
- 새 게시물 작성 도중 Dimmed 부분을 클릭할 경우 창이 닫히지 않도록 구현
- 인스타그램의 가장 큰 특징은 사진업로드 기능이기 때문에 새 게시물 작성 시 사진을 업로드 하지 않으면 공유되지 않도록 구현
- 사진 업로드, 문구 입력, 장소 검색을 통해 위치 추가, 업로드 로딩 및 완료를 구현
- 업로드되는 게시물에 대해서 댓글 작성에 대한 권한을 On/Off하는 Toggle 버튼 구현
- 업로드된 새 게시물 데이터는 Firebase의 Cloud firestore에 저장되고, 사진의 경우 Firebase의 Storage에 저장함
- 이미지는 Storage의 URL을 통해 사이트에 보여지도록 구현

**- 실제 인스타그램에서의 새 게시물 Modal**

<img width="600" alt="스크린샷 2021-08-20 22 11 41" src="https://user-images.githubusercontent.com/51189962/130238381-dafd1e2b-f1f5-42da-b28c-c09ec7525486.png">

- 본 기능을 완성한 후 실제 인스타그램에서 부분적으로 새 게시물 업로드 기능이 생겼다 없어졌다하는 테스트가 진행되는 것으로 확인됨
- 실제 테스트 중인 인스타그램의 새 게시물에서 업로드 로딩 및 완료시 UI를 클론하여 본 프로젝트에 재구현

### **5. 메인 페이지**

**- 게시물**

<img width="300" alt="이미지 슬라이더 gif" src="https://user-images.githubusercontent.com/51189962/130256174-eaa4db93-2275-45df-98ae-e04a6bc3405c.gif">

- 피드를 올린 유저의 프로필 이미지 혹은 아이디를 클릭하면 해당 유저의 프로필 페이지로 이동함
- 이미지 슬라이더(Carousel)을 직접 구현하여 여러 장의 이미지를 볼 수 있도록 구현
- 현재 보여지는 이미지가 몇 번째인지 알 수 있도록 슬라이더에 대한 pagination을 Dot 모양으로 구현

**- 좋아요, 북마크, 댓글 작성**

<img width="300" alt="좋아요, 북마크, 댓글 작성 gif" src="https://user-images.githubusercontent.com/51189962/130254815-55309205-adc7-41a3-88a3-51a0a40d3164.gif">

- 피드에 좋아요, 북마크, 댓글 작성 구현
- 좋아요, 북마크한 게시글은 프로필 페이지에서 다시 볼 수 있도록 함
- 새로운 댓글은 피드에서 바로 볼 수 있도록 기존에 보여지는 2개의 댓글 밑에 연속적으로 구현
- Emoji Picker library를 이용하여 댓글에 Emoji를 추가하여 작성할 수 있도록 구현

**- 포스트 모달**

<img width="600" alt="스크린샷 2021-08-23 18 05 51" src="https://user-images.githubusercontent.com/51189962/130421146-2f86956b-ba9d-4ba1-9dd5-a882160b4c5c.png">

- 게시물에 작성된 댓글은 최대 2개까지 보여지고 말풍선 모양의 아이콘 또는 `댓글 n개 더보기`를 클릭하면 Modal창이 열리면서 더 많은 댓글을 볼 수 있도록 구현

**- Aside**

<img width="300" alt="유저 추천 리스트 gif" src="https://user-images.githubusercontent.com/51189962/130258578-c0957ced-d244-4b79-b215-7a227f021329.gif">

- 피드가 올라오는 타임라인의 오른편에 배치하였고 로그아웃이 바로 가능하도록 구현
- 현재 나를 팔로우하는 유저에 한해서 추천 목록에 보여지도록 구현
- 맞팔로우하게 되면 추천 목록에서 지워지도록 구현

### **6. 다이렉트 메시지**

**- 게시물 공유**

<img width="600" alt="유저 추천 리스트 gif" src="https://user-images.githubusercontent.com/51189962/130426157-0c4a831b-bb4c-4121-a9af-deafca9e1d55.gif">

- 공유하기 아이콘 클릭 시 Modal창이 열리도록 구현
- 다이렉트 메시지를 주고 받은 유저가 이미 존재할 경우 추천된 유저 목록에 보여지도록 구현
- 검색된 유저를 선택하게 되면 선택한 유저 목록에 보여지도록 구현
- 이미 선택받은 유저가 있으면 검색 결과에서 체크 중 표시를 나타내어 구현
- 선택한 유저가 여러명인 경우 불필요한 유저는 목록에서 바로 삭제할 수 있도록 구현
- 메시지를 작성할 경우 작성된 메시지와 게시물 링크를 함께 전달하고, 메시지를 작성하지 않으면 게시물 링크만 보내도록 구현

**- 다이렉트**

<img width="600" alt="유저 추천 리스트 gif" src="https://user-images.githubusercontent.com/51189962/130430561-083bc7f9-2fd1-4465-a86d-b61a62eefb1d.gif">

- 다이렉트 페이지에서 왼편은 다이렉트 룸, 오른편은 다이렉트 메시지 섹션이 나타나도록 구현
- 메시지 보내기 아이콘을 누르면 공유하기와 같은 Modal창이 열리도록 하고, 다이렉트 페이지에서는 게시물 공유 기능 없이 메시지만 전달하도록 구현
- 다이렉트 룸에 대한 멤버 정보 및 채팅 삭제는 다이렉트 메시지 섹션에서 확인 가능하도록 구현
- 보낸 메시지에 대해서 복사 및 삭제가 가능하도록 구현

### **7. 프로필 페이지**

<img width="600" alt="스크린샷 2021-08-23 19 48 26" src="https://user-images.githubusercontent.com/51189962/130435222-031c5b90-0617-44e6-b14e-9267740e4aab.png">
<img width="600" alt="스크린샷 2021-08-23 19 50 43" src="https://user-images.githubusercontent.com/51189962/130435484-ced76613-0bd0-48db-bf1f-7b07f145d59f.png">

**- 유저 정보**

<img width="600" alt="스크린샷 2021-08-23 19 53 09" src="https://user-images.githubusercontent.com/51189962/130435762-0e88537a-9e21-4856-a451-687dbf018408.png">

- 유저의 프로필 사진, 아이디, 게시물 갯수, 팔로워, 팔로잉, 이름, 프로필 소개 문구 등의 정보를 확인할 수 있도록 구현
- 본인의 프로필 페이지일 경우 프로필 편집 및 프로필 설정 버튼, 다른 유저의 프로필 페이지일 경우 팔로우가 가능하도록 구현

**- 게시물, 저장됨, 좋아요**

<img width="600" alt="스크린샷 2021-08-23 19 53 09" src="https://user-images.githubusercontent.com/51189962/130436950-7552b86a-f10b-4816-bf81-744492d5b5a7.gif">
<img width="600" alt="스크린샷 2021-08-23 19 53 09" src="https://user-images.githubusercontent.com/51189962/130437856-e6b9d3b5-17b4-4806-877b-61ebb783e830.gif">
<img width="600" alt="스크린샷 2021-08-23 20 13 08" src="https://user-images.githubusercontent.com/51189962/130438178-2c858a5c-da01-455e-b0d1-05a77c298cc2.png">
<img width="600" alt="스크린샷 2021-08-23 20 20 51" src="https://user-images.githubusercontent.com/51189962/130439121-8ee4545d-e1ab-4cb4-bd74-4430d7dd3ba4.png">
<img width="600" alt="스크린샷 2021-08-23 20 20 46" src="https://user-images.githubusercontent.com/51189962/130439128-6275cfdf-273a-41fe-9901-a94ccad083ea.png">

- 유저의 게시물, 저장됨(북마크), 좋아요 목록을 볼 수 있도록 구현
- 저장됨, 좋아요 목록은 본인만 확인할 수 있고 다른 유저의 프로필 페이지에 접속할 경우 게시물 탭만 보여지도록 구현
- 게시물 목록의 경우 Grid 레이아웃을 이용하여 구현
- 게시물 목록에 Hover하면 좋아요 갯수와 댓글 수를 확인할 수 있도록 구현
- 게시물 목록을 클릭하면 Modal창이 활성화 되고 게시물을 더 자세히 볼 수 있도록 구현
- 모달의 왼쪽과 오른쪽에 `<`, `>`아이콘을 통해 Modal창을 닫지 않고 이전 게시물, 다음 게시물을 볼 수 있도록 구현
- 첫 번째 혹은 마지막 번째 게시물의 경우 `<`, `>`아이콘을 없애서 사용자가 처음 혹은 마지막 게시물에 도달했음을 알 수 있도록 구현
- 게시물, 저장됨, 좋아요 목록이 존재하지 않을 때 보여주는 페이지를 구현

### **8. 프로필 편집 페이지**

**- 프로필 편집 및 비밀번호 설정**

<img width="300" alt="스크린샷 2021-08-23 20 24 05" src="https://user-images.githubusercontent.com/51189962/130439566-11117cd1-da3c-4a1e-b79c-a8d0824ff606.png">
<img width="600" alt="스크린샷 2021-08-23 20 43 06" src="https://user-images.githubusercontent.com/51189962/130441593-2192547a-73de-427d-a335-850663385bcc.png">
<img width="600" alt="스크린샷 2021-08-23 20 24 05" src="https://user-images.githubusercontent.com/51189962/130441980-1896679e-ec8a-4876-8dc8-42332b357eed.gif">
<img width="600" alt="스크린샷 2021-08-23 20 38 15" src="https://user-images.githubusercontent.com/51189962/130441061-79700d31-d500-4ede-94c8-0ae931dc9dae.png">

- 네비게이션 바에서 `프로필 사진` 클릭 > `설정` 탭을 통해서 접속하도록 구현
- 프로필 페이지에서 `프로필 편집` 버튼 혹은 톱니바퀴 모양의 아이콘 클릭시 프로필 편집 페이지로 접속하도록 구현
- `프로필 사진 바꾸기` 버튼 혹은 프로필 이미지를 클릭하여 프로필 사진을 변경하는 기능 구현
- 이름, 사용자 이름, 이메일, 전화번호, 소개 문구를 제출하여 수정하도록 구현
- `비밀번호 변경` 탭에서 비밀번호를 변경 기능을 구현

### **9. 개별 포스트 페이지**

**- 싱글 포스트**

**- 주요 게시물**

### **10. 기타 기능**

**- React.Portal**

**- Emoji picker library**

<br />

## **🚀 배포**

### **호스팅**

### **커스텀 도메인**

<br />

## ⏰ 커밋 히스토리

[내 커밋 히스토리 보러가기](https://github.com/keemtj/project-basic-instagram/commits?author=keemtj)
<br/>
<br/>
<br/>
