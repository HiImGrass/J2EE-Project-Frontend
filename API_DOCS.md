# API Documentation

Tài liệu này tổng hợp endpoint đang được khai báo trong controller của `user-service` và `learning-service` tại thời điểm rà soát. Các path dưới đây là path của ứng dụng; gateway chưa có route được cấu hình trong repository. `Content-Type` cho request có JSON body là `application/json`. Tất cả query parameter đều tùy chọn nếu không ghi chú khác.

## Mục lục

- [Quy ước response](#quy-ước-response)
- [User Service](#user-service)
  - [Authentication](#authentication--apiauth)
  - [Users](#users--apiusers)
- [Learning Service](#learning-service)
  - [Learning paths](#learning-paths--learning-paths)
  - [Topics](#topics--topics)
  - [Vocabularies](#vocabularies--vocabularies)
  - [Questions](#questions--questions)
  - [Answers](#answers--answers)
  - [Classes](#classes--classes)
  - [Notebooks](#notebooks--notebooks)
  - [Notebook vocabularies](#notebook-vocabularies--notebook-vocabularies)
- [Ghi chú về phạm vi](#ghi-chú-về-phạm-vi)

---

## Quy ước response

- **ApiResponse**: một số lỗi dùng `message` khác và `data: null`.

  ```json
  { "message": "Success", "status": 200, "data": ... }
  ```

- **Entity/DTO**: object JSON của model hoặc DTO được nêu ở cột response.
- Các body cập nhật nhận entity/model trực tiếp, nên trường tương ứng là field của model. Field quan hệ JPA dạng `XxxId` thường nhận object có `id` (ví dụ `{"questionId":{"id":1}}`); cách serialize chính xác phụ thuộc cấu hình Jackson.
- Các ví dụ body chỉ minh họa cấu trúc. Những thuộc tính có hậu tố `?` là tùy chọn/nullable; enum phải dùng đúng một giá trị liệt kê.

> Bấm vào **Request body** / **Response** ở mỗi endpoint để xem chi tiết.

---

# User Service

Base path: `/api`. Auth controller dùng `/api/auth`, user controller dùng `/api/users`.

## Authentication — `/api/auth`

| Method | Path | Mô tả |
|---|---|---|
| POST | `/api/auth/register` | Đăng ký tài khoản mới. |
| POST | `/api/auth/login` | Đăng nhập bằng username và password. |
| POST | `/api/auth/logout` | Đăng xuất/thu hồi refresh token. |
| POST | `/api/auth/refresh` | Đổi refresh token lấy token mới. |

### POST `/api/auth/register`

Đăng ký tài khoản mới.

<details>
<summary><b>Request body</b></summary>

`role`: `admin`, `teacher`, `student`; mặc định `student`.

```json
{
  "username": "...",
  "email": "...",
  "password": "...",
  "fullName": "...?",
  "phoneNumber": "...?",
  "avatar": "...?",
  "role": "student"
}
```

</details>

<details>
<summary><b>Response</b></summary>

- `201`: `Users`
- Lỗi `400`:

```json
{ "message": "..." }
```

</details>

### POST `/api/auth/login`

Đăng nhập bằng username và password.

<details>
<summary><b>Request body</b></summary>

```json
{
  "username": "...",
  "password": "..."
}
```

</details>

<details>
<summary><b>Response</b></summary>

- `200`: `AuthResponse` gồm access token và refresh token (cùng thông tin user theo DTO).
- Lỗi `401`:

```json
{ "message": "..." }
```

</details>

### POST `/api/auth/logout`

Đăng xuất/thu hồi refresh token.

<details>
<summary><b>Request body</b></summary>

```json
{ "refreshToken": "..." }
```

</details>

<details>
<summary><b>Response</b></summary>

- `200`:

```json
{ "message": "..." }
```

</details>

### POST `/api/auth/refresh`

Đổi refresh token lấy token mới.

<details>
<summary><b>Request body</b></summary>

```json
{ "refreshToken": "..." }
```

</details>

<details>
<summary><b>Response</b></summary>

- `200`: `AuthResponse`
- Lỗi `401`:

```json
{ "message": "..." }
```

</details>

---

## Users — `/api/users`

| Method | Path | Mô tả |
|---|---|---|
| POST | `/api/users` | Tạo user trực tiếp. |
| GET | `/api/users` | Lấy danh sách tất cả user. |
| GET | `/api/users/{id}` | Tìm user theo ID. |
| GET | `/api/users/username/{username}` | Tìm user theo username. |
| GET | `/api/users/role/{role}` | Lọc user theo role. |
| PUT | `/api/users/{id}` | Cập nhật user. |
| DELETE | `/api/users/{id}` | Xóa user. |

**`Users`** có các field: `id`, `username`, `email`, `avatar`, `fullName`, `phoneNumber`, `password`, `role`, `status`, `createdAt`, `updatedAt`.
`status`: `active`, `inactive`, `banned`.

### POST `/api/users`

Tạo user trực tiếp.

<details>
<summary><b>Request body</b></summary>

`Users`:

```json
{
  "username": "...",
  "email": "...?",
  "avatar": "...?",
  "fullName": "...?",
  "phoneNumber": "...",
  "password": "...",
  "role": "student",
  "status": "active"
}
```

</details>

<details>
<summary><b>Response</b></summary>

- `201`: `Users`
- Lỗi `400`: chuỗi thông báo.

</details>

### GET `/api/users`

Lấy danh sách tất cả user.

- **Request body:** Không có.

<details>
<summary><b>Response</b></summary>

- `200`: mảng `Users`.

</details>

### GET `/api/users/{id}`

Tìm user theo ID.

- **Request body:** Không có.

<details>
<summary><b>Response</b></summary>

- `200`: `Users`
- Lỗi `404`: chuỗi thông báo.

</details>

### GET `/api/users/username/{username}`

Tìm user theo username.

- **Request body:** Không có.

<details>
<summary><b>Response</b></summary>

- `200`: `Users`
- Lỗi `404`: chuỗi thông báo.

</details>

### GET `/api/users/role/{role}`

Lọc user theo role. `role`: `admin`, `teacher`, `student`.

- **Request body:** Không có.

<details>
<summary><b>Response</b></summary>

- `200`: mảng `Users`.

</details>

### PUT `/api/users/{id}`

Cập nhật user.

<details>
<summary><b>Request body</b></summary>

Các field của `Users` cần cập nhật, ví dụ:

```json
{
  "fullName": "Nguyen An",
  "phoneNumber": "0900000000"
}
```

</details>

<details>
<summary><b>Response</b></summary>

- `200`: `Users`
- Lỗi `404`: chuỗi thông báo.

</details>

### DELETE `/api/users/{id}`

Xóa user.

- **Request body:** Không có.

<details>
<summary><b>Response</b></summary>

- `200`: chuỗi thông báo.
- Lỗi `404`: chuỗi thông báo.

</details>

---

# Learning Service

Các path bên dưới được khai báo trực tiếp tại root (ví dụ `/topics`). Port/base URL không được ấn định trong controller; tham khảo cấu hình môi trường khi chạy ứng dụng.

## Learning paths — `/learning-paths`

| Method | Path | Mô tả |
|---|---|---|
| POST | `/learning-paths` | Tạo lộ trình học. |
| GET | `/learning-paths` | Lấy danh sách lộ trình, có thể lọc theo tên. |
| GET | `/learning-paths/{id}` | Lấy lộ trình theo ID. |
| GET | `/learning-paths/{learningPathId}/topics` | Liệt kê chủ đề thuộc lộ trình. |
| PUT | `/learning-paths/{id}` | Cập nhật lộ trình. |
| DELETE | `/learning-paths/{id}` | Xóa lộ trình. |

### POST `/learning-paths`

Tạo lộ trình học.

<details>
<summary><b>Request body</b></summary>

```json
{
  "learningPathName": "...",
  "numberOfTopics": 3,
  "description": "...?"
}
```

</details>

<details>
<summary><b>Response</b></summary>

- `LearningPaths`.

</details>

### GET `/learning-paths`

Lấy danh sách lộ trình, có thể lọc theo tên.

- **Request body:** Không có.
- **Query:** `pathName` (tùy chọn).

<details>
<summary><b>Response</b></summary>

- `ApiResponse<List<LearningPaths>>`.

</details>

### GET `/learning-paths/{id}`

Lấy lộ trình theo ID.

- **Request body:** Không có.

<details>
<summary><b>Response</b></summary>

- `ApiResponse<LearningPaths>`; không tìm thấy thì `data: null`.

</details>

### GET `/learning-paths/{learningPathId}/topics`

Liệt kê chủ đề thuộc lộ trình.

- **Request body:** Không có.

<details>
<summary><b>Response</b></summary>

- `ApiResponse<List<TopicsResponse>>`.

</details>

### PUT `/learning-paths/{id}`

Cập nhật lộ trình.

<details>
<summary><b>Request body</b></summary>

Field model `LearningPaths`: `learningPathName`, `numberOfTopics`, `description` (có thể kèm field khác).

</details>

<details>
<summary><b>Response</b></summary>

- `LearningPaths`.

</details>

### DELETE `/learning-paths/{id}`

Xóa lộ trình.

- **Request body:** Không có.

<details>
<summary><b>Response</b></summary>

- `200`:

```json
{ "message": "..." }
```

- Lỗi `404`: cùng cấu trúc.

</details>

---

## Topics — `/topics`

| Method | Path | Mô tả |
|---|---|---|
| POST | `/topics` | Tạo chủ đề. |
| GET | `/topics` | Liệt kê chủ đề; lọc theo tên nếu truyền query. |
| GET | `/topics/{id}` | Lấy chủ đề theo ID. |
| PUT | `/topics/{id}` | Cập nhật chủ đề. |
| DELETE | `/topics/{id}` | Xóa chủ đề. |

### POST `/topics`

Tạo chủ đề.

<details>
<summary><b>Request body</b></summary>

```json
{
  "teacherId": 1,
  "learningPathId": 1,
  "topicName": "...",
  "imageUrl": "...?",
  "description": "...?"
}
```

</details>

<details>
<summary><b>Response</b></summary>

- `201`: `TopicsResponse`.

</details>

### GET `/topics`

Liệt kê chủ đề; lọc theo tên nếu truyền query.

- **Request body:** Không có.
- **Query:** `topicName` (tùy chọn).

<details>
<summary><b>Response</b></summary>

- `ApiResponse<List<TopicsResponse>>`.

</details>

### GET `/topics/{id}`

Lấy chủ đề theo ID.

- **Request body:** Không có.

<details>
<summary><b>Response</b></summary>

- `ApiResponse<TopicsResponse>`; không tìm thấy thì `data: null`.

</details>

### PUT `/topics/{id}`

Cập nhật chủ đề.

<details>
<summary><b>Request body</b></summary>

Field model `Topics`: `teacherId`, `learningPathId`, `topicName`, `imageUrl`, `description`.

</details>

<details>
<summary><b>Response</b></summary>

- `ApiResponse<TopicsResponse>`.

</details>

### DELETE `/topics/{id}`

Xóa chủ đề.

- **Request body:** Không có.

<details>
<summary><b>Response</b></summary>

- `200`:

```json
{ "message": "..." }
```

- Lỗi `404`: cùng cấu trúc.

</details>

---

## Vocabularies — `/vocabularies`

| Method | Path | Mô tả |
|---|---|---|
| POST | `/vocabularies` | Tạo từ vựng. |
| GET | `/vocabularies` | Liệt kê từ vựng, có thể tìm theo từ. |
| GET | `/vocabularies/{id}` | Lấy từ vựng theo ID. |
| GET | `/vocabularies/topic/{topicId}` | Liệt kê từ vựng theo chủ đề. |
| PUT | `/vocabularies/{id}` | Cập nhật từ vựng. |
| DELETE | `/vocabularies/{id}` | Xóa từ vựng. |

`partOfSpeech`: `NOUN`, `VERB`, `ADJECTIVE`, `ADVERB`, `PRONOUN`, `PREPOSITION`, `CONJUNCTION`, `INTERJECTION`.

### POST `/vocabularies`

Tạo từ vựng.

<details>
<summary><b>Request body</b></summary>

```json
{
  "topicId": 1,
  "word": "...",
  "pronunciation": "...?",
  "meaning": "...",
  "partOfSpeech": "NOUN",
  "example": "...?",
  "audioUrl": "...?",
  "imageUrl": "...?"
}
```

</details>

<details>
<summary><b>Response</b></summary>

- `ApiResponse<Vocabularies>`.

</details>

### GET `/vocabularies`

Liệt kê từ vựng, có thể tìm theo từ.

- **Request body:** Không có.
- **Query:** `word` (tùy chọn).

<details>
<summary><b>Response</b></summary>

- `ApiResponse<List<Vocabularies>>`.

</details>

### GET `/vocabularies/{id}`

Lấy từ vựng theo ID.

- **Request body:** Không có.

<details>
<summary><b>Response</b></summary>

- `ApiResponse<Vocabularies>`; không tìm thấy thì `data: null`.

</details>

### GET `/vocabularies/topic/{topicId}`

Liệt kê từ vựng theo chủ đề.

- **Request body:** Không có.

<details>
<summary><b>Response</b></summary>

- `ApiResponse<List<Vocabularies>>`.

</details>

### PUT `/vocabularies/{id}`

Cập nhật từ vựng.

<details>
<summary><b>Request body</b></summary>

Field model `Vocabularies`: `topicId`, `word`, `pronunciation`, `meaning`, `partOfSpeech`, `example`, `audioUrl`, `imageUrl`.

</details>

<details>
<summary><b>Response</b></summary>

- `Vocabularies`.

</details>

### DELETE `/vocabularies/{id}`

Xóa từ vựng.

- **Request body:** Không có.

<details>
<summary><b>Response</b></summary>

- `200`:

```json
{ "message": "..." }
```

- Lỗi `404`: cùng cấu trúc.

</details>

---

## Questions — `/questions`

| Method | Path | Mô tả |
|---|---|---|
| POST | `/questions` | Tạo câu hỏi cho từ vựng. |
| GET | `/questions` | Liệt kê câu hỏi, có thể tìm theo nội dung câu hỏi. |
| GET | `/questions/{id}` | Lấy câu hỏi theo ID. |
| PUT | `/questions/{id}` | Cập nhật câu hỏi. |
| DELETE | `/questions/{id}` | Xóa câu hỏi. |

`type`: `LISTEN_WRITE`, `WORD_BUILD`, `TEXT_TO_AUDIO`, `AUDIO_TO_TEXT`, `MULTIPLE_CHOICE`.

### POST `/questions`

Tạo câu hỏi cho từ vựng.

<details>
<summary><b>Request body</b></summary>

```json
{
  "vocabularyId": 1,
  "title": "...",
  "type": "MULTIPLE_CHOICE",
  "isNewWordQuestion": false,
  "questionContent": "...?",
  "questionAudioUrl": "...?",
  "correctWord": "...?"
}
```

</details>

<details>
<summary><b>Response</b></summary>

- `201`: `QuestionsResponse`.

</details>

### GET `/questions`

Liệt kê câu hỏi, có thể tìm theo nội dung câu hỏi.

- **Request body:** Không có.
- **Query:** `questionText` (tùy chọn).

<details>
<summary><b>Response</b></summary>

- `ApiResponse<List<QuestionsResponse>>`.

</details>

### GET `/questions/{id}`

Lấy câu hỏi theo ID.

- **Request body:** Không có.

<details>
<summary><b>Response</b></summary>

- `ApiResponse<QuestionsResponse>`; không tìm thấy thì `data: null`.

</details>

### PUT `/questions/{id}`

Cập nhật câu hỏi.

<details>
<summary><b>Request body</b></summary>

Field model `Questions`: `vocabularyId`, `title`, `type`, `isNewWordQuestion`, `questionContent`, `questionAudioUrl`, `correctWord`.

</details>

<details>
<summary><b>Response</b></summary>

- `Questions`.

</details>

### DELETE `/questions/{id}`

Xóa câu hỏi.

- **Request body:** Không có.

<details>
<summary><b>Response</b></summary>

- `200`:

```json
{ "message": "..." }
```

- Lỗi `404`: cùng cấu trúc.

</details>

---

## Answers — `/answers`

| Method | Path | Mô tả |
|---|---|---|
| POST | `/answers` | Tạo đáp án cho câu hỏi. |
| GET | `/answers` | Liệt kê đáp án, lọc theo các thuộc tính nếu cần. |
| GET | `/answers/{id}` | Lấy đáp án theo ID. |
| GET | `/answers/question/{questionId}` | Liệt kê đáp án theo ID câu hỏi. |
| PUT | `/answers/{id}` | Cập nhật đáp án. |
| DELETE | `/answers/{id}` | Xóa đáp án. |

### POST `/answers`

Tạo đáp án cho câu hỏi.

<details>
<summary><b>Request body</b></summary>

```json
{
  "questionId": 1,
  "answerAudioUrl": "...?",
  "answerContent": "...?",
  "isCorrectAnswer": true
}
```

</details>

<details>
<summary><b>Response</b></summary>

- `AnswersResponse`.

</details>

### GET `/answers`

Liệt kê đáp án, lọc theo các thuộc tính nếu cần.

- **Request body:** Không có.
- **Query:** `questionId`, `answerContent`, `isCorrectAnswer` (tùy chọn).

<details>
<summary><b>Response</b></summary>

- `ApiResponse<List<AnswersResponse>>`.

</details>

### GET `/answers/{id}`

Lấy đáp án theo ID.

- **Request body:** Không có.

<details>
<summary><b>Response</b></summary>

- `ApiResponse<AnswersResponse>`; có thể trả `404`.

</details>

### GET `/answers/question/{questionId}`

Liệt kê đáp án theo ID câu hỏi.

- **Request body:** Không có.

<details>
<summary><b>Response</b></summary>

- `ApiResponse<List<Answers>>`.

</details>

### PUT `/answers/{id}`

Cập nhật đáp án.

<details>
<summary><b>Request body</b></summary>

Field model `Answers`: `questionId`, `answerAudioUrl`, `answerContent`, `isCorrectAnswer`.

</details>

<details>
<summary><b>Response</b></summary>

- `ApiResponse<AnswersResponse>`.

</details>

### DELETE `/answers/{id}`

Xóa đáp án.

- **Request body:** Không có.

<details>
<summary><b>Response</b></summary>

- `200`:

```json
{ "message": "..." }
```

- Lỗi `404`: cùng cấu trúc.

</details>

---

## Classes — `/classes`

| Method | Path | Mô tả |
|---|---|---|
| POST | `/classes` | Tạo lớp học. |
| GET | `/classes` | Liệt kê lớp, lọc theo tên và/hoặc giáo viên. |
| GET | `/classes/{id}` | Lấy lớp theo ID. |
| GET | `/classes/teacher/{teacherId}` | Liệt kê lớp theo giáo viên. |
| GET | `/classes/{classId}/students` | Lấy ID học viên trong lớp. |
| PUT | `/classes/{id}` | Cập nhật lớp. |
| DELETE | `/classes/{id}` | Xóa lớp. |

`status` lớp: `ACTIVE`, `DISABLED`.

### POST `/classes`

Tạo lớp học.

<details>
<summary><b>Request body</b></summary>

```json
{
  "teacherId": 1,
  "learningPathId": 1,
  "className": "...",
  "numberOfStudents": 0,
  "invitationCode": "...",
  "status": "ACTIVE"
}
```

</details>

<details>
<summary><b>Response</b></summary>

- `201`: `ClassesResponse`.

</details>

### GET `/classes`

Liệt kê lớp, lọc theo tên và/hoặc giáo viên.

- **Request body:** Không có.
- **Query:** `className`, `teacherId` (tùy chọn).

<details>
<summary><b>Response</b></summary>

- `ApiResponse<List<ClassesResponse>>`.

</details>

### GET `/classes/{id}`

Lấy lớp theo ID.

- **Request body:** Không có.

<details>
<summary><b>Response</b></summary>

- `ApiResponse<ClassesResponse>` (kể cả khi không thấy thì controller trả `200`, `data: null`).

</details>

### GET `/classes/teacher/{teacherId}`

Liệt kê lớp theo giáo viên.

- **Request body:** Không có.

<details>
<summary><b>Response</b></summary>

- `ApiResponse<List<Classes>>`.

</details>

### GET `/classes/{classId}/students`

Lấy ID học viên trong lớp.

- **Request body:** Không có.

<details>
<summary><b>Response</b></summary>

- `ApiResponse<List<Integer>>`.

</details>

### PUT `/classes/{id}`

Cập nhật lớp.

<details>
<summary><b>Request body</b></summary>

Field model `Classes`: `teacherId`, `learningPathId`, `className`, `numberOfStudents`, `invitationCode`, `status`.

</details>

<details>
<summary><b>Response</b></summary>

- `Classes`.

</details>

### DELETE `/classes/{id}`

Xóa lớp.

- **Request body:** Không có.

<details>
<summary><b>Response</b></summary>

- `200`:

```json
{ "message": "..." }
```

- Lỗi `404`: cùng cấu trúc.

</details>

---

## Notebooks — `/notebooks`

| Method | Path | Mô tả |
|---|---|---|
| POST | `/notebooks` | Tạo sổ từ vựng. |
| GET | `/notebooks` | Liệt kê sổ từ, có thể lọc theo user. |
| GET | `/notebooks/{id}` | Lấy sổ từ theo ID. |
| PUT | `/notebooks/{id}` | Cập nhật sổ từ. |
| DELETE | `/notebooks/{id}` | Xóa sổ từ. |

### POST `/notebooks`

Tạo sổ từ vựng.

<details>
<summary><b>Request body</b></summary>

Model `NoteBooks`:

```json
{ "userId": 1 }
```

</details>

<details>
<summary><b>Response</b></summary>

- `NoteBooks`.

</details>

### GET `/notebooks`

Liệt kê sổ từ, có thể lọc theo user.

- **Request body:** Không có.
- **Query:** `userId` (tùy chọn).

<details>
<summary><b>Response</b></summary>

- `ApiResponse<List<NoteBooks>>`.

</details>

### GET `/notebooks/{id}`

Lấy sổ từ theo ID.

- **Request body:** Không có.

<details>
<summary><b>Response</b></summary>

- `ApiResponse<NoteBooks>`; có thể trả `404`.

</details>

### PUT `/notebooks/{id}`

Cập nhật sổ từ.

<details>
<summary><b>Request body</b></summary>

Field model `NoteBooks`, hiện gồm `userId`.

</details>

<details>
<summary><b>Response</b></summary>

- `NoteBooks`.

</details>

### DELETE `/notebooks/{id}`

Xóa sổ từ.

- **Request body:** Không có.

<details>
<summary><b>Response</b></summary>

- `200`:

```json
{ "message": "..." }
```

- Lỗi `404`: cùng cấu trúc.

</details>

---

## Notebook vocabularies — `/notebook-vocabularies`

| Method | Path | Mô tả |
|---|---|---|
| POST | `/notebook-vocabularies` | Thêm từ vào sổ từ. |
| GET | `/notebook-vocabularies` | Liệt kê liên kết sổ từ và từ vựng, có bộ lọc. |
| GET | `/notebook-vocabularies/{id}` | Lấy liên kết theo ID. |
| GET | `/notebook-vocabularies/notebook/{noteBookId}/vocabularies` | Liệt kê từ vựng thuộc một sổ. |
| PUT | `/notebook-vocabularies/{id}` | Cập nhật liên kết/trạng thái ôn tập. |
| DELETE | `/notebook-vocabularies/{id}` | Xóa từ khỏi sổ. |

`status` từ vựng trong sổ: `REVIEW`, `DORMANT`.

### POST `/notebook-vocabularies`

Thêm từ vào sổ từ.

<details>
<summary><b>Request body</b></summary>

Model `NoteBookVocabularies`:

```json
{
  "notebookId": 1,
  "vocabularyId": 1,
  "status": "REVIEW"
}
```

</details>

<details>
<summary><b>Response</b></summary>

- `NoteBookVocabularies`.

</details>

### GET `/notebook-vocabularies`

Liệt kê liên kết sổ từ và từ vựng, có bộ lọc.

- **Request body:** Không có.
- **Query:** `notebookId`, `vocabularyId`, `status` (tùy chọn).

<details>
<summary><b>Response</b></summary>

- `ApiResponse<List<NoteBookVocabularies>>`.

</details>

### GET `/notebook-vocabularies/{id}`

Lấy liên kết theo ID.

- **Request body:** Không có.

<details>
<summary><b>Response</b></summary>

- `ApiResponse<NoteBookVocabularies>`; có thể trả `404`.

</details>

### GET `/notebook-vocabularies/notebook/{noteBookId}/vocabularies`

Liệt kê từ vựng thuộc một sổ.

- **Request body:** Không có.

<details>
<summary><b>Response</b></summary>

- `ApiResponse<List<Vocabularies>>`.

</details>

### PUT `/notebook-vocabularies/{id}`

Cập nhật liên kết/trạng thái ôn tập.

<details>
<summary><b>Request body</b></summary>

Field model `NoteBookVocabularies`: `notebookId`, `vocabularyId`, `status`.

</details>

<details>
<summary><b>Response</b></summary>

- `NoteBookVocabularies`.

</details>

### DELETE `/notebook-vocabularies/{id}`

Xóa từ khỏi sổ.

- **Request body:** Không có.

<details>
<summary><b>Response</b></summary>

- `200`:

```json
{ "message": "..." }
```

- Lỗi `404`: cùng cấu trúc.

</details>

---

## Ghi chú về phạm vi

- Tài liệu phản ánh các method mapping trong controller; không bao gồm endpoint bị comment trong mã nguồn (ví dụ `/api/auth/revoke-token`).
- Repository hiện chưa cấu hình route API Gateway. Gọi trực tiếp từng service bằng host/port tương ứng với môi trường chạy.
- Một số controller trả entity trực tiếp, một số trả DTO hoặc `ApiResponse`; cấu trúc response không thống nhất toàn dự án.
