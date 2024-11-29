 function up(){
            let input = document.getElementById("count");
            input.value = Number(input.value) + 1;

            let buy = Number(document.getElementById("buy").innerHTML);

            let sum = Number(document.getElementById("sum").innerHTML);
            document.getElementById("sum").innerHTML = buy * input.value;
        }
        function down(){
            let input = document.getElementById("count");
            input.value = Number(input.value) - 1;

            let buy = Number(document.getElementById("buy").innerHTML);

            let sum = Number(document.getElementById("sum").innerHTML);
            document.getElementById("sum").innerHTML = sum - buy ;
            if(input.value==0)
            {
                confirm("Are you sure want to delete of the data?");
            }

        }
        function xoa(){
            confirm("Are you sure want to delete of the data?")
            let sum = Number(document.getElementById("sum").innerHTML);
            document.getElementById("sum").innerHTML = 0;
            let input = document.getElementById("count");
            input.value = 0;
        }

        function check(){
            const cha = document.getElementById('cha');
            const con = document.getElementById('con');
            cha.addEventListener('change', function() {
                con.checked = cha.checked;
            });
        }
        // chuyển 1 đối tượng thành html
//         function chuyenDoiTuongItemGiaHangSangHTML(itemGioHang){
//             var html = '        <tbody>\n'+
// '            <tr>\n'+
// '                <td><input type="checkbox" id="con"></td>\n'+
// '                <td>ảnh<br>Thông tin</td>\n'+
// '                <td id="buy">10000</td>\n'+
// '                <td>\n'+
// '                    <div class="quantity-control">\n'+
// '                        <button onclick="down()">-</button>\n'+
// '                        <input type="text" value="1" id="count">\n'+
// '                        <button onclick="up()">+</button>\n'+
// '                    </div>\n'+
// '                </td>\n'+
// '                <td id="sum">20000</td>\n'+
// '                <td><button class="delete-btn" onclick="xoa()" >Xóa</button></td>\n'+
// '            </tr>\n'+
// '        </tbody>';
//  return html;
//         }
        function chuyenDanhSachItemGiaHangSangHTML(danhSachitemGioHang){
            var htmlTong = '';
            for(var i = 0;i<danhSachitemGioHang.length;i++){
                htmlTong = htmlTong + chuyenDoiTuongItemGiaHangSangHTML(danhSachitemGioHang[i]);
            }
            return htmltong;
        }
        function hienThiDanhSachItemGiaHangSangHTML(){
            var danhSachItemGiaHang = layGioHangTuLocalStorage();

            var HTML = chuyenDanhSachItemGiaHangSangHTML();

            var nodeGioHang = document.getElementById('gio-hang');
        }
        function mua(){
            confirm(" ");
        }
        let productInCart = localStorage.getItem('products') ? JSON.parse(localStorage.getItem('products')) : [];
  
        function saveToLocalStorage () {
          localStorage.setItem('products', JSON.stringify(productInCart));
        }
        function renderProducts () {
            let data = ``;
            products.map(value => {
              data += `
                 <tbody>
            <tr>
                <td><input type="checkbox" id="con"></td>
                <td>ảnh<br>Thông tin</td>
                <td id="buy">10000</td>
                <td>
                    <div class="quantity-control">
                        <button onclick="down()">-</button>
                        <input type="text" value="1" id="count">
                        <button onclick="up()">+</button>
                    </div>
                </td>
                <td id="sum">10000</td>
                <td><button class="delete-btn" onclick="xoa()" >Xóa</button></td>
            </tr>
        </tbody>
              `;
            });
            document.getElementById('products').innerHTML = data;
          }