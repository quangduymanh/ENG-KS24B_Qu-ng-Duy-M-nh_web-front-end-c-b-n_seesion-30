let books = [
    { id: 1, name: "Lập trình JavaScript", price: 150000, quantity: 10, category: "Công nghệ" },
    { id: 2, name: "Học Python cơ bản", price: 120000, quantity: 15, category: "Công nghệ" },
    { id: 3, name: "Đắc nhân tâm", price: 90000, quantity: 20, category: "Kỹ năng sống" },
    { id: 4, name: "Tư duy nhanh và chậm", price: 170000, quantity: 8, category: "Tâm lý học" }
];

let cart = [];

function showBooksByCategory() {
    let category = prompt("Nhập thể loại sách muốn xem:");
    let filteredBooks = books.filter(book => book.category.toLowerCase() === category.toLowerCase());

    if (filteredBooks.length === 0) {
        alert("Không tìm thấy sách trong danh mục này!");
    } else {
        console.log(`Sách trong danh mục: ${category}`);
        console.table(filteredBooks);
    }
}

function addNewBook() {
    let id = books.length + 1;
    let name = prompt("Nhập tên sách:");
    let price = parseFloat(prompt("Nhập giá sách:"));
    let quantity = parseInt(prompt("Nhập số lượng:"));
    let category = prompt("Nhập thể loại:");

    if (!name || isNaN(price) || isNaN(quantity) || !category) {
        alert("Dữ liệu không hợp lệ!");
        return;
    }

    books.push({ id, name, price, quantity, category });
    alert(`Đã thêm sách: ${name}`);
}

function searchBook() {
    let keyword = prompt("Nhập tên sách hoặc ID:");
    let foundBooks = books.filter(book => 
        book.name.toLowerCase().includes(keyword.toLowerCase()) || 
        book.id.toString() === keyword
    );

    if (foundBooks.length === 0) {
        alert("Không tìm thấy sách!");
    } else {
        console.log("Kết quả tìm kiếm:");
        console.table(foundBooks);
    }
}

function buyBook() {
    let id = parseInt(prompt("Nhập ID sách muốn mua:"));
    let book = books.find(b => b.id === id);

    if (!book) {
        alert("Sách không tồn tại!");
        return;
    }

    let quantity = parseInt(prompt(`Nhập số lượng muốn mua (${book.name} - Còn: ${book.quantity}):`));

    if (isNaN(quantity) || quantity <= 0) {
        alert("Số lượng không hợp lệ!");
        return;
    }

    if (book.quantity < quantity) {
        alert("Không đủ số lượng sách!");
        return;
    }
    book.quantity -= quantity;
    let cartItem = cart.find(b => b.id === id);
    if (cartItem) {
        cartItem.quantity += quantity;
    } else {
        cart.push({ id: book.id, name: book.name, price: book.price, quantity });
    }

    alert(`Đã thêm ${quantity} cuốn "${book.name}" vào giỏ hàng!`);
}

function sortBooks(order) {
    if (order === "asc") {
        books.sort((a, b) => a.price - b.price);
    } else {
        books.sort((a, b) => b.price - a.price);
    }
    console.log(`Danh sách sách đã sắp xếp theo giá (${order === "asc" ? "Tăng dần" : "Giảm dần"}):`);
    console.table(books);
}

function calculateCart() {
    let totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);
    let totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

    console.log("Giỏ hàng hiện tại:");
    console.table(cart);
    alert(`Tổng số lượng sách đã mua: ${totalQuantity}\nTổng tiền: ${totalPrice.toLocaleString()} VNĐ`);
}

function showTotalStock() {
    let totalStock = books.reduce((sum, book) => sum + book.quantity, 0);
    alert(`Tổng số lượng sách trong kho: ${totalStock}`);
}

function mainMenu() {
    while (true) {
        let choice = parseInt(prompt(
            "1. Hiển thị sách theo thể loại\n" +
            "2. Thêm sách mới vào kho\n" +
            "3. Tìm kiếm sách\n" +
            "4. Mua sách\n" +
            "5. Sắp xếp sách theo giá tăng dần\n" +
            "6. Sắp xếp sách theo giá giảm dần\n" +
            "7. Tính tổng tiền và số lượng trong giỏ hàng\n" +
            "8. Hiển thị tổng số lượng sách trong kho\n" +
            "9. Thoát"
        ));

        switch (choice) {
            case 1: showBooksByCategory(); break;
            case 2: addNewBook(); break;
            case 3: searchBook(); break;
            case 4: buyBook(); break;
            case 5: sortBooks("asc"); break;
            case 6: sortBooks("desc"); break;
            case 7: calculateCart(); break;
            case 8: showTotalStock(); break;
            case 9: alert("Thoát chương trình"); return;
            default: alert("Lựa chọn không hợp lệ!");
        }
    }
}

mainMenu();