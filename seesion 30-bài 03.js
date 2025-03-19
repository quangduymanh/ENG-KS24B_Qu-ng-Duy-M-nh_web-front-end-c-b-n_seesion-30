let phones = [
    { id: 1, name: "iPhone 14", price: 25000000, quantity: 10, company: "Apple" },
    { id: 2, name: "Samsung Galaxy S22", price: 20000000, quantity: 8, company: "Samsung" },
    { id: 3, name: "Xiaomi Mi 12", price: 15000000, quantity: 5, company: "Xiaomi" },
    { id: 4, name: "iPhone 13", price: 22000000, quantity: 7, company: "Apple" }
];

let cart = [];

function showPhonesByCompany() {
    let company = prompt("Nhập hãng điện thoại muốn xem:");
    let filteredPhones = phones.filter(phone => phone.company.toLowerCase() === company.toLowerCase());

    if (filteredPhones.length === 0) {
        alert("Không tìm thấy điện thoại của hãng này!");
    } else {
        console.log(`Điện thoại thuộc hãng: ${company}`);
        console.log(filteredPhones);
    }
}

function addNewPhone() {
    let id = phones.length + 1;
    let name = prompt("Nhập tên điện thoại:");
    let price = parseFloat(prompt("Nhập giá điện thoại:"));
    let quantity = parseInt(prompt("Nhập số lượng:"));
    let company = prompt("Nhập hãng điện thoại:");

    if (!name || isNaN(price) || isNaN(quantity) || !company) {
        alert("Dữ liệu không hợp lệ!");
        return;
    }

    phones.push({ id, name, price, quantity, company });
    alert(`Đã thêm điện thoại: ${name}`);
}

function searchPhone() {
    let keyword = prompt("Nhập tên hoặc ID điện thoại:");
    let foundPhones = phones.filter(phone =>
        phone.name.toLowerCase().includes(keyword.toLowerCase()) ||
        phone.id.toString() === keyword
    );

    if (foundPhones.length === 0) {
        alert("Không tìm thấy điện thoại!");
    } else {
        console.log("Kết quả tìm kiếm:");
        console.log(foundPhones);
    }
}

function buyPhone() {
    let id = parseInt(prompt("Nhập ID điện thoại muốn mua:"));
    let phone = phones.find(p => p.id === id);

    if (!phone) {
        alert("Điện thoại không tồn tại!");
        return;
    }

    let quantity = parseInt(prompt(`Nhập số lượng muốn mua (${phone.name} - Còn: ${phone.quantity}):`));

    if (isNaN(quantity) || quantity <= 0) {
        alert("Số lượng không hợp lệ!");
        return;
    }

    if (phone.quantity < quantity) {
        alert("Không đủ số lượng trong kho!");
        return;
    }

    phone.quantity -= quantity;

    let cartItem = cart.find(p => p.id === id);
    if (cartItem) {
        cartItem.quantity += quantity;
    } else {
        cart.push({ id: phone.id, name: phone.name, price: phone.price, quantity });
    }

    alert(`Đã thêm ${quantity} chiếc "${phone.name}" vào giỏ hàng!`);
}

function checkout() {
    if (cart.length === 0) {
        alert("Giỏ hàng trống, không thể thanh toán!");
        return;
    }

    let totalAmount = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    alert(`Thanh toán thành công!\nTổng tiền: ${totalAmount.toLocaleString()} VNĐ`);
    cart = [];
}

function sortPhones(order) {
    if (order === "asc") {
        phones.sort((a, b) => a.price - b.price);
    } else {
        phones.sort((a, b) => b.price - a.price);
    }
    console.log(`Danh sách điện thoại đã sắp xếp theo giá (${order === "asc" ? "Tăng dần" : "Giảm dần"}):`);
    console.log(phones);
}

function totalStockValue() {
    let totalValue = phones.reduce((sum, phone) => sum + phone.price * phone.quantity, 0);
    alert(`Tổng giá trị điện thoại trong kho: ${totalValue.toLocaleString()} VNĐ`);
}

function totalStockByCompany() {
    let stockByCompany = {};
    phones.forEach(phone => {
        if (stockByCompany[phone.company]) {
            stockByCompany[phone.company] += phone.quantity;
        } else {
            stockByCompany[phone.company] = phone.quantity;
        }
    });

    console.log("Tổng số lượng điện thoại theo hãng:");
    console.log(stockByCompany);
}

function mainMenu() {
    while (true) {
        let choice = parseInt(prompt(
            "1. Hiển thị điện thoại theo hãng\n" +
            "2. Thêm điện thoại mới vào cửa hàng\n" +
            "3. Tìm kiếm điện thoại\n" +
            "4. Mua điện thoại\n" +
            "5. Thanh toán\n" +
            "6. Sắp xếp điện thoại theo giá tăng dần\n" +
            "7. Sắp xếp điện thoại theo giá giảm dần\n" +
            "8. Hiển thị tổng giá trị điện thoại trong kho\n" +
            "9. Hiển thị tổng số lượng điện thoại theo hãng\n" +
            "10. Thoát"
        ));

        switch (choice) {
            case 1: showPhonesByCompany(); break;
            case 2: addNewPhone(); break;
            case 3: searchPhone(); break;
            case 4: buyPhone(); break;
            case 5: checkout(); break;
            case 6: sortPhones("asc"); break;
            case 7: sortPhones("desc"); break;
            case 8: totalStockValue(); break;
            case 9: totalStockByCompany(); break;
            case 10: alert("Thoát chương trình"); return;
            default: alert("Lựa chọn không hợp lệ!");
        }
    }
}

mainMenu();
