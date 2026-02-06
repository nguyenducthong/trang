Mô tả chức năng trang web thiệp cưới

Tổng quan
Trang web là một thiệp cưới online giới thiệu cặp đôi, thông tin buổi lễ, bộ ảnh kỷ niệm và khu vực xác nhận tham dự (RSVP) kèm lời chúc.

Chức năng chính
- Trang mở đầu (Hero): hiển thị ngày cưới, tên cô dâu chú rể, ảnh nền riêng cho desktop và mobile.
- Thông tin cặp đôi: giới thiệu hai bên gia đình, vai trò cô dâu/chú rể, ảnh chân dung.
- Thiệp mời & lịch sự kiện: hiển thị 2 sự kiện (tiệc cưới, lễ thành hôn) với thời gian, ngày dương lịch và âm lịch, kèm địa chỉ và nút mở Google Maps.
- Tùy biến theo nhà trai/nhà gái: đổi nội dung lịch sự kiện và địa điểm bằng tham số URL `?side=trai` hoặc `?side=gai`.
- Cá nhân hóa tên khách mời: hiển thị tên khách mời và xưng hô phù hợp qua tham số URL `?to=...` hoặc `?name=...` hoặc `?guest=...`.
- Lịch và đếm ngược: hiển thị lịch tháng 3/2026, đánh dấu ngày cưới, đếm ngược theo ngày/giờ/phút/giây.
- Trình phát nhạc nền: nút đĩa than bật/tắt nhạc, hiển thị trạng thái play/pause.
- Khu vực lời chúc & RSVP: form nhập tên, lời nhắn, lựa chọn tham dự/có thể/không tham dự, gửi lên Google Sheets (qua Google Apps Script).
- Danh sách lời chúc: tự động tải lời chúc từ Google Sheets khi mở trang; nếu có dữ liệu sẽ hiển thị và tự lặp để cuộn mượt.
- Bộ sưu tập ảnh: lưới ảnh kỷ niệm, mở ảnh dạng lightbox, chuyển ảnh bằng nút hoặc phím mũi tên, đóng bằng click ra ngoài hoặc phím Esc.
- Nút quay về đầu trang: hiển thị khi cuộn xuống, click để cuộn mượt lên đầu.
- Hiệu ứng trang: trái tim bay nền và hiệu ứng AOS khi cuộn.

Tích hợp và cấu hình
- Google Sheets: bật/tắt và đặt `apiUrl` trong `js/main.js` để lưu và tải lời chúc.
- Nội dung hai bên gia đình và thông tin sự kiện: cấu hình trong `js/main.js` (biến `SIDE_CONFIG`).
- Ảnh và nhạc: lấy từ thư mục `images/`, có ảnh dự phòng nếu lỗi tải.
