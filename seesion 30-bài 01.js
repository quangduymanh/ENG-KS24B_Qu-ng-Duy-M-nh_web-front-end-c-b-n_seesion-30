let products = [
    { id: 1, name: "mèn mén", price: 20000, quantity: 20, category: "món ăn dân tộc Mông" },
    { id: 2, name: "mứt", price: 80000, quantity: 21, category: "món ăn dân tộc Kinh" },
    { id: 3, name: "cơm lam", price: 40000, quantity: 15, category: "món ăn dân tộc Mông" },
    { id: 4, name: "bánh đậu xanh", price: 60000, quantity: 30, category: "món ăn dân tộc Kinh" }
];
let cart = [];
function showProductsByCategory() {
    let categories = {};
    products.forEach(product => {
        if (!categories[product.category]) {
            categories[product.category] = [];
        }
        categories[product.category].push(product);
    });

    console.log("Danh sách sản phẩm theo danh mục:");
    for (let category in categories) {
        console.log(`\n${category.toUpperCase()}`);
        console.table(categories[category]);
    }
}

function buyProduct() {
    let id = parseInt(prompt("Nhập ID sản phẩm muốn mua:"));
    let product = products.find(p => p.id === id);

    if (!product) {
        alert("Sản phẩm không tồn tại!");
        return;
    }

    let quantity = parseInt(prompt(`Nhập số lượng muốn mua (${product.name} - Còn: ${product.quantity}):`));

    if (isNaN(quantity) || quantity <= 0) {
        alert("Số lượng không hợp lệ!");
        return;
    }

    if (product.quantity < quantity) {
        alert("⚠ Số lượng sản phẩm không đủ!");
        return;
    }
    product.quantity -= quantity;
    let cartItem = cart.find(p => p.id === id);
    if (cartItem) {
        cartItem.quantity += quantity;
    } else {
        cart.push({ id: product.id, name: product.name, price: product.price, quantity });
    }

    alert(`Đã thêm ${quantity} x ${product.name} vào giỏ hàng!`);
}

function sortProducts(order) {
    if (order === "asc") {
        products.sort((a, b) => a.price - b.price);
    } else {
        products.sort((a, b) => b.price - a.price);
    }
    console.log(`Danh sách sản phẩm đã sắp xếp theo giá (${order === "asc" ? "Tăng dần" : "Giảm dần"}):`);
    console.table(products);
}

function calculateTotal() {
    let total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    console.log("Giỏ hàng hiện tại:");
    console.table(cart);
    alert(`Tổng tiền thanh toán: ${total.toLocaleString()} VNĐ`);
}

function mainMenu() {
    while (true) {
        let choice = parseInt(prompt(
            "Chọn chức năng:\n" +
            "1. Hiển thị sản phẩm theo danh mục\n" +
            "2. Mua sản phẩm\n" +
            "3. Sắp xếp sản phẩm theo giá tăng dần\n" +
            "4. Sắp xếp sản phẩm theo giá giảm dần\n" +
            "5. Xem giỏ hàng & thanh toán\n" +
            "6. Thoát"
        ));

        switch (choice) {
            case 1: showProductsByCategory(); break;
            case 2: buyProduct(); break;
            case 3: sortProducts("asc"); break;
            case 4: sortProducts("desc"); break;
            case 5: calculateTotal(); break;
            case 6: alert("Thoát chương trình"); return;
            default: alert("Lựa chọn không hợp lệ!");
        }
    }
}
mainMenu();