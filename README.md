# Mern_LearningSystem_Server

- 使用 MERN (MongoDB、Express、React、Node) 製作 LearningSystem
- 功能：註冊會員、登入系統、發佈及註冊課程
- 部屬

  - Frontend：[github-pages](https://pin50195.github.io/Mern_LearningSystem_Client/)
  - Server
    - Render
    - [github](https://github.com/pin50195/Mern_LearningSystem_Server)
  - Database：MongoDB Atlas

## 1.製作動機

- 學習前後端資料的串聯

## 2.技術運用

- JavaScript
- Library：Bootstrap、React、Axios、Buffer

## 3.功能介紹

- 提醒：初次使用需等待 Render Server 喚醒
  ![wake render](https://github.com/pin50195/Mern_LearningSystem_Client/assets/156511146/6748c0a2-be19-404e-8fbd-0b3d2ab85713)

- Nav bar

  - 依使用者身份顯示不同內容
    ![general](https://github.com/pin50195/Mern_LearningSystem_Client/assets/156511146/9d48e355-2092-449f-b17e-cb02fe40d759)
    ![login](https://github.com/pin50195/Mern_LearningSystem_Client/assets/156511146/2b5657c6-2342-4fc9-8b33-a0f8beca340f)

- 表單資料驗證

  - 註冊、登入會員及新增、修改課程表單，即時回饋資料是否符合標準
    ![form validation](https://github.com/pin50195/Mern_LearningSystem_Client/assets/156511146/cd7bbbf3-59c4-43bd-bf76-359db1562bb3)

- 修改課程內容
  ![edit course](https://github.com/pin50195/Mern_LearningSystem_Client/assets/156511146/60610e08-74a0-4dc2-875e-90afbb943eaf)

- 查詢及註冊課程
  ![register course](https://github.com/pin50195/Mern_LearningSystem_Client/assets/156511146/edfbbcc4-3aa2-48c5-a35f-c94b65f309af)

- 個人頁面資訊
  - 講師：顯示身份、開課堂數及學生人數
  - 學生：顯示身份、已註冊課程堂數
    ![instructor-profile](https://github.com/pin50195/Mern_LearningSystem_Client/assets/156511146/022c4594-17c9-4c07-a98a-5e5ed75213ee)
    ![student-profile](https://github.com/pin50195/Mern_LearningSystem_Client/assets/156511146/c21d6767-24d8-4c5a-9d93-4075b539a96a)

## 4.往後課題

此次專案主要目的是先熟悉前後端資料串聯方式，
還有許多小功能可以更完善，例如：

- Profile Page：增加可以設定大頭貼功能
- Courses Page：查詢課程可使用關鍵字搜尋
