class Product {
	constructor(name, price, year) {
		this.name = name;
		this.price = price;
		this.year = year;
	}
}

class UI {
	addProduct(product) {
		const productList = document.getElementById("product-list");
		const element = document.createElement("div");
		element.innerHTML = `
        <div class="card text-center mb-4">
            <div class="card-body">
                <strong>Product Name:</strong> ${product.name}
                <strong>Product Price:</strong> ${product.price}
                <strong>Product Year:</strong> ${product.year}        
                <a href="#" class="btn btn-danger" name="delete">Delete</a>
            `;
		productList.appendChild(element);
	}

	resetForm() {
		document.getElementById("product-form").reset();
	}

	deleteProduct(element) {
		console.log("eliminando producto");
		if (element.name === "delete") {
			element.parentElement.parentElement.parentElement.remove();
			this.showMessage("Product deleted correctly", "info");
		}
	}

	showMessage(message, cssClass) {
		const div = document.createElement("div");
		div.className = `alert alert-${cssClass} mt-4`;
		div.appendChild(document.createTextNode(message));
		// showing in DOM
		const container = document.querySelector(".container");
		const app = document.querySelector("#App");
		container.insertBefore(div, app);

		setTimeout(function () {
			document.querySelector(".alert").remove();
		}, 3000);
	}
}


// DOM events

//evento submit
document
	.getElementById("product-form")
	.addEventListener("submit", function (e) {
		const productName = document.getElementById("name").value;
		const productPrice = document.getElementById("price").value;
		const productYear = document.getElementById("year").value;

		console.log(productName, productPrice, productYear);

		const product = new Product(productName, productPrice, productYear);
		const ui = new UI();

		if (productName === "" || productPrice === "" || productYear === "") {
			return ui.showMessage("Complete all fields please", "danger");
		}
		ui.addProduct(product);
		ui.resetForm();
		ui.showMessage("product added correctly", "success");

		e.preventDefault();
	});

//evento eliminar

document.getElementById("product-list").addEventListener("click", function (e) {
	const ui = new UI();
	ui.deleteProduct(e.target);
});
