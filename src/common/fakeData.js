const data = [
  {
    id: 1,
    name: 'InterContinental Hanoi Westlake',
    address: '05 Phố Từ Hoa, Phường Quảng An, Quận Tây Hồ, Hà Nội',
    describe:
      'Khách sạn InterContinental Hanoi Westlake được xây dựng hoàn toàn trên mặt nước hồ Tây nên rất gần gũi với thiên nhiên, có view cực kỳ đẹp và lãng',
    star: '5',
    image:
      'https://st.quantrimang.com/photos/image/2019/11/26/khach-san-5-sao-10.jpg',
    phone: '0528129664',
  },
  {
    id: 2,
    name: 'JW Marriott Hanoi',
    address:
      'Số 8, đường Đỗ Đức Dục, Mễ Trì, Nam Từ Liêm, Trung Hòa Nhân Chính, Hà Nội',
    describe:
      'JW Marriott Hanoi do tập đoàn khách sạn nổi tiếng thế giới Marriott International quản lý',
    star: '5',
    image:
      'https://st.quantrimang.com/photos/image/2019/11/26/khach-san-5-sao-2.jpg',
    phone: '0947218111',
  },
  {
    id: 3,
    name: 'Apricot Hotel',
    address: '136 Hàng Trống, Quận Hoàn Kiếm, Hà Nội, Việt Nam.',
    describe:
      'Apricot Hotel được thiết kế theo phong cách tân cổ điển đầy sang trọng và ấn tượng. Các phòng trong khách sạn đều được trang bị đầy đủ tiện nghi',
    star: '5',
    image:
      'https://st.quantrimang.com/photos/image/2019/11/26/khach-san-5-sao-5.jpg',
    phone: '0927749311',
  },
  {
    id: 4,
    name: 'Hanoi Paradise Center Hotel & Spa',
    address: 'Quận Hoàn Kiếm, Hà Nội',
    describe:
      'Tọa lạc tại thành phố Hà Nội, cách Nhà hát múa rối nước Thăng Long 400 m, Hanoi Paradise Center Hotel & Spa cung cấp chỗ nghỉ với nhà hàng, chỗ đỗ xe riêng, quán bar và sảnh khách chung',
    star: '4',
    image:
      'https://cf.bstatic.com/xdata/images/hotel/270x200/219028902.webp?k=1633a3f213fbce44ebb52464209d4b6a6caeb7f7d4a6b355a8572a87d9b483b8&o=',
    phone: '0873287142',
  },
  {
    id: 5,
    name: 'Anatole Hotel Hanoi',
    address: 'Quận Hai Bà Trưng, Hà Nội',
    describe:
      'Tọa lạc tại vị trí tuyệt đẹp ở quận Hoàn Kiếm thuộc thành phố Hà Nội, Anatole Hotel Hanoi nằm cách Nhà Thờ Lớn 200 m, Nhà Hát Lớn chưa đầy 1 km và trung tâm thương mại Tràng Tiền Plaza 12 phút đi bộ.',
    star: '4',
    image:
      'https://cf.bstatic.com/xdata/images/hotel/270x200/241278020.webp?k=74ff8d58bba6b0ca0e8e2f4ef741c08d889c50dd1e6824f6b0f581ca1d3e5389&o=',
    phone: '0578246289',
  },
  {
    id: 6,
    name: 'KS Sunway',
    address: '19 Phạm Đình Hổ, Hai Bà Trưng, Hà Nội',
    describe: 'Năm giữa thủ đô, vị trí đẹp thuận tiện di chuyển tham khoan',
    star: '4',
    image:
      'https://cdn1.ivivu.com/iVivu/2017/10/20/14/khach-san-sunway-ha-noi-1-800x450.png',
    phone: '0928910128',
  },
  {
    id: 7,
    name: 'KS Mường Thanh Hanoi',
    address: 'Lô CC2, Bắc Linh Đàm, Hoàng Mai, Hà Nội',
    describe:
      'Khách sạn Mường Thanh Grand Hà Nội là sự kết hợp hài hoà giữa nền văn hóa miền Tây Bắc Việt Nam với sự sang trọng, hiện đại của châu Âu',
    star: '5',
    image:
      'http://datphongmuongthanh.com/wp-content/uploads/2021/06/mtg-hn.jpg',
    phone: '0957291010',
  },
  {
    id: 8,
    name: 'Peridot Grand Luxury Boutique Hotel',
    address: '33 Đường Thành',
    describe:
      'Tọa lạc tại thành phố Hà Nội, Peridot Grand Hotel & Spa có 2 nhà hàng trong khuôn viên, 3 quán bar, hồ bơi ngoài trời, trung tâm thể dục và quán bar',
    star: '4',
    image:
      'https://5sbooking.com/images/hotel/hotel_1621390309_gallery_241638343.jpg',
    phone: '0949219491',
  },
  {
    id: 9,
    name: 'Cầu Giấy Hotel',
    address: '110 Cầu Giấy- Quận Cầu Giấy- Hà Nội',
    describe:
      'Khách sạn Cầu Giấy là nơi trao trọn không gian, gửi gắm những tình yêu tuyệt vời nhất nhé',
    star: '4.9',
    image:
      'https://caugiayhotelhanoi.com.vn/uploads/tiny_uploads/25.jpg--min.jpg',
    phone: '0949219491',
  },
  {
    id: 10,
    name: 'Nam Cường Hotel',
    address: '538 Phố Trần Hưng Đạo Phường Lộc Vượng, Nam Ðịnh',
    describe:
      'Khách sạn Cầu Giấy là nơi trao trọn không gian, gửi gắm những tình yêu tuyệt vời nhất nhé',
    star: '4.8',
    image:
      'https://namcuongnamdinhhotel.com.vn/files/images/over-view/HotelBuilding00002.jpg',
    phone: '0949219491',
  },
  {
    id: 11,
    name: 'Bình Tân Hotel',
    address: '551 Trần Thái Tông, Lộc Vượng, TP. Nam Định, Nam Định',
    describe:
      'Khách sạn Bình Tân đạt tiêu chuẩn khách sạn Nam Định 3 sao. Khuôn viên khách sạn được bao quanh bởi rất nhiều cây xanh, với những làn gió từ thiên nhiên làm cho những giây phút nghỉ ngơi của bạn tại đây thêm phần sảng khoái.',
    star: '3',
    image:
      'https://i2.wp.com/kenhhomestay.com/wp-content/uploads/2019/09/khach-san-Nam-Dinh-2.jpg',
    phone: '0228 3681 ',
  },
  {
    id: 12,
    name: 'Luxury Nam Định',
    address: '46 Thái Bình, Trần Tế Xương, Nam Định',
    describe:
      'Được xếp hạng là là một trong những khách sạn Nam Định sang trọng bậc nhất ở khu vực. Khách sạn cung cấp nhiều dịch vụ tiện ích',
    star: '3',
    image:
      'https://i1.wp.com/kenhhomestay.com/wp-content/uploads/2019/09/khach-san-Nam-Dinh-3.jpg',
    phone: '091 281 20',
  },
  {
    id: 13,
    name: 'Sơn Nam Hotel',
    address:
      ' 26 Lê Hồng Phong, Ngã tư Lê Hồng Phong với Trần Tế Xương, bờ hồ Vị Xuyên,Vị Hoàng, Nam Định',
    describe:
      'Nằm cách xa trong tâm thành phố, vì vậy khách sạn Nam Định này sẽ mang đến cho bạn những khoảng không gian yên tĩnh, bình an sau những ngày làm việc vất vả.',
    star: '4',
    image:
      'https://i3.wp.com/kenhhomestay.com/wp-content/uploads/2019/09/khach-san-Nam-Dinh-4.jpg',
    phone: '091 281 20',
  },
  {
    id: 14,
    name: 'Tam Coc Boutique Garden',
    address: 'Tam Cốc, xã Ninh Hải, huyện Hoa Lư, Ninh Bình',
    describe:
      'Khách sạn Ninh Bình gần Động Tam Cốc này là một địa điểm nghỉ dưỡng lý tưởng nếu bạn muốn đến tham quan Động Tam Cốc hay Chùa Bích Động',
    star: '3',
    image:
      'https://i1.wp.com/kenhhomestay.com/wp-content/uploads/2019/03/Khach-san-Ninh-Binh-1.jpg',
    phone: '0943.333.3',
  },
  {
    id: 15,
    name: 'Queen Hotel Bắc Ninh',
    address: 'Đường Ngô Tất Tố, thành phố Bắc Ninh',
    describe:
      'Điều đáng ngạc nhiên và thu hút là Queen Hotel Bắc Ninh là một trong những khách sạn Bắc Ninh 3 sao với giá cả vô cùng hợp lý.',
    star: '3',
    image:
      'https://i0.wp.com/kenhhomestay.com/wp-content/uploads/2019/10/khach-san-bac-ninh-1.jpg',
    phone: '0976.566.6',
  },
  {
    id: 16,
    name: 'Chasrming Hotel',
    address: '3 đường Lê Thái Tổ, phường Võ Cường, thành phố Bắc Ninh',
    describe:
      'Bắc Ninh Charming Hotel hứa hẹn là một điểm dừng chân lý tưởng cho bất cứ một du khách nào có ý định tới thăm thành phố Bắc Ninh',
    star: '3',
    image:
      'https://i2.wp.com/kenhhomestay.com/wp-content/uploads/2019/10/khach-san-bac-ninh-2.jpg',
    phone: '0975.933.3',
  },
  {
    id: 17,
    name: 'Chasrming Base Hotel',
    address: '19 đường Lê Thái Tổ, phường Võ Cường, thành phố Bắc Ninh',
    describe:
      'Bắc Ninh Charming Hotel hứa hẹn là một điểm dừng chân lý tưởng cho bất cứ một du khách nào có ý định tới thăm thành phố Bắc Ninh',
    star: '4.7',
    image:
      'https://i2.wp.com/kenhhomestay.com/wp-content/uploads/2019/10/khach-san-bac-ninh-2.jpg',
    phone: '0975.933.3',
  },
  {
    id: 18,
    name: 'Lakeside Đại Lải',
    address: 'Khu A, Hồ Đại Lải, xã Cao Minh, Thị xã Phúc Yên, tỉnh Vĩnh Phúc',
    describe:
      'Lakeside Đại Lải là khách sạn Vĩnh Phúc đầu tiên nằm trong danh sách những điểm nghỉ dưỡng đáng lưu trú mà bạn không nên bỏ qua.',
    star: '4.6',
    image:
      'https://i2.wp.com/kenhhomestay.com/wp-content/uploads/2019/10/khach-san-bac-ninh-2.jpg',
    phone: '0333120555',
  },
  {
    id: 19,
    name: 'Anivia Tam Đảo',
    address: 'Thôn 1, Tam Đảo, Vĩnh Phúc',
    describe:
      'Lakeside Đại Lải là khách sạn Vĩnh Phúc đầu tiên nằm trong danh sách những điểm nghỉ dưỡng đáng lưu trú mà bạn không nên bỏ qua.',
    star: '3',
    image:
      'https://i1.wp.com/kenhhomestay.com/wp-content/uploads/2019/09/Khach-san-Vinh-Phuc-2.jpg',
    phone: '024 2280 0',
  },
  {
    id: 20,
    name: 'Dic Star Hotels & Resorts Vĩnh Phúc',
    address: 'Đinh Tiên Hoàng, Khai Quang, Vĩnh Yên, Vĩnh Phúc',
    describe:
      'Lakeside Đại Lải là khách sạn Vĩnh Phúc đầu tiên nằm trong danh sách những điểm nghỉ dưỡng đáng lưu trú mà bạn không nên bỏ qua.',
    star: '3',
    image:
      'https://i2.wp.com/kenhhomestay.com/wp-content/uploads/2019/09/Khach-san-Vinh-Phuc-3.png',
    phone: '0834 542 3',
  },
  {
    id: 21,
    name: 'Phương Đông Hotel',
    address: '344 Triệu Quang Phục, phường An tảo, thành phố Hưng Yên',
    describe: 'Phương Đông hotel sở hữu thiết kế 5 tầng đầy sang trọng',
    star: '4',
    image:
      'https://i3.wp.com/kenhhomestay.com/wp-content/uploads/2019/09/khach-san-hung-yen-1.jpg',
    phone: '0221360058',
  },
  {
    id: 22,
    name: 'Hưng Yên Á Đông',
    address: 'Quốc lộ 5A – Km15+100 xã Trưng Trắc, Huyện Văn Lâm, Hưng Yên',
    describe: 'Phương Đông hotel sở hữu thiết kế 5 tầng đầy sang trọng',
    star: '4',
    image:
      'https://i3.wp.com/kenhhomestay.com/wp-content/uploads/2019/09/khach-san-hung-yen-2.jpg',
    phone: '0221360058',
  },
  {
    id: 23,
    name: 'Star Hotel Hải Dương',
    address: 'Số 1 Hồng Châu, P. Hải Tân, Thành phố Hải Dương, Hải Dương',
    describe:
      'Tại khách sạn có khu vườn rộng, sảnh khách chung và wifi miễn phí.',
    star: '4',
    image:
      'https://cdn.alongwalker.info/img/2019/10/7/Z8BahZPGby31a768ed03376b7bc64beda55f0139c85bde5f201396920230.jpg',
    phone: '097 902 01',
  },
];

export default data;
