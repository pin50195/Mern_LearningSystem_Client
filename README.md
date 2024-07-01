# Mern_LearningSystem_Client

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
  ![wake render](https://github.com/pin50195/Mern_LearningSystem_Client/assets/156511146/4173e3a8-a776-4a39-ab9a-46424de933a6)

- Nav bar

  - 依使用者身份顯示不同內容
    ![general](https://github.com/pin50195/Mern_LearningSystem_Client/assets/156511146/2405e51c-c9b0-4a1d-8f62-695eb10b2b29)
    ![login](https://github.com/pin50195/Mern_LearningSystem_Client/assets/156511146/dc1c8715-338f-4e59-bace-c023ad2a014c)


- 表單資料驗證

  - 註冊、登入會員及新增、修改課程表單，即時回饋資料是否符合標準
    ![form validation](https://github.com/pin50195/Mern_LearningSystem_Client/assets/156511146/bf655441-4df4-4d46-839a-da725cfc2db2)


- 修改課程內容

  ![edit course](https://github.com/pin50195/Mern_LearningSystem_Client/assets/156511146/e438a0f1-185d-4bd7-9a67-94ee09dc688b)


- 查詢及註冊課程
  
  ![register course](https://github.com/pin50195/Mern_LearningSystem_Client/assets/156511146/6e819536-bf5b-436e-b49b-88d78e777e3d)

- 個人頁面資訊
  - 講師：顯示身份、開課堂數及學生人數
  - 學生：顯示身份、已註冊課程堂數
    ![instructor-profile](https://github.com/pin50195/Mern_LearningSystem_Client/assets/156511146/02e9de5f-0521-462e-bd96-54fdfb9b0d03)
    ![student-profile](https://github.com/pin50195/Mern_LearningSystem_Client/assets/156511146/6c970bf3-4889-48b9-9125-f7483ae8e617)


## 4.往後課題

此次專案主要目的是先熟悉前後端資料串聯方式，
還有許多小功能可以更完善，例如：

- Profile Page：增加可以設定大頭貼功能
- Courses Page：查詢課程可使用關鍵字搜尋
