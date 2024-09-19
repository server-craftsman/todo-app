# Todo App
1: sử dụng react, typescript, vite
2: template dùng antDesign, tailwindcss
3: form dùng antDesign form
4: cấu trúc requirement gồm:
+ model: name, description, status (new, inprogress, complete), startDate, endDate
+ validation: validation các field theo antDesignForm
+ store: lưu data ở localStorage hoặc sessionStorage
+ component:
  + header: title, theme toggle
  + task form: add task, edit task
  + task list: 
    - task item: name, description, status, startDate, endDate, priority, tags
    - task filter: search, sort
    - task list: list task
  + footer: 
+ mainlayout: layout cho app
   + header: title, theme toggle
   + content: 
   + footer: 
  
1. **Chức năng Ưu Tiên (Priority)**:
   - Thêm trường `priority` (ví dụ: thấp, trung bình, cao) vào model, để người dùng có thể sắp xếp công việc theo mức độ ưu tiên.
   - Cho phép lọc công việc dựa trên mức độ ưu tiên.


3. **Tagging và Phân Loại**:
   - Thêm trường `tags` để người dùng có thể phân loại công việc theo nhãn (như "Công việc", "Cá nhân", v.v.).
   - Cho phép lọc công việc theo các nhãn đã chọn, giúp quản lý công việc dễ dàng hơn.

4. **Chức năng Sắp Xếp**:
   - Thêm khả năng sắp xếp công việc theo tên, ngày bắt đầu, ngày kết thúc, hoặc ưu tiên để người dùng có thể dễ dàng tổ chức danh sách công việc.

5. **Tính Tiến Độ Công Việc**:
   - Hiển thị thanh tiến độ cho mỗi công việc, cho phép người dùng theo dõi mức độ hoàn thành của công việc (phần trăm tiến độ).
   - Tạo tính năng công việc phụ (subtasks) để người dùng có thể chia nhỏ công việc thành các bước nhỏ hơn.

6. **Chế Độ Sáng/Tối**:
   - Thêm nút chuyển đổi giữa chế độ sáng và tối cho giao diện, giúp cải thiện trải nghiệm người dùng.
   - Dùng Tailwind CSS để điều chỉnh chủ đề giao diện động.

7. **Chức năng Tìm Kiếm**:
   - Thêm thanh tìm kiếm để người dùng có thể tìm công việc theo tên hoặc mô tả, giúp nhanh chóng tìm thấy công việc cần làm.

8. **Thao Tác Hàng Loạt**:
   - Cho phép người dùng chọn nhiều công việc cùng lúc để thực hiện các thao tác như xóa, hoặc đánh dấu là hoàn thành hàng loạt.

10. **Kéo và Thả (Drag & Drop)**:
    - Tạo tính năng kéo và thả để người dùng có thể sắp xếp lại thứ tự công việc một cách trực quan.

