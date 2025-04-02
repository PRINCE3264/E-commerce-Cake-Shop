$(document).ready(function () {
    const apiUrl = 'http://localhost:3000/products';

    // उत्पादों को फ़ेच और डिस्प्ले करने का फ़ंक्शन
    function fetchProducts() {
        $.ajax({
            url: apiUrl,
            method: 'GET',
            success: function (data) {
                $('#productList').empty();
                data.forEach(product => {
                    $('#productList').append(`
                        <li>
                            <img src="${product.image}" alt="${product.name}">
                            <strong>${product.name}</strong><br>
                            <p>Price: $${product.price}</p>
                            <p>Date: ${product.date}</p>
                            <p>Time: ${product.time}</p>
                        </li>
                    `);
                });
            },
            error: function (error) {
                console.error('Error fetching data:', error);
            }
        });
    }

    // नया उत्पाद जोड़ने का फ़ंक्शन
    $('#addProduct').click(function () {
        const name = $('#productName').val();
        const price = parseFloat($('#productPrice').val());
        const date = new Date().toISOString().split('T')[0];
        const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        const image = 'https://via.placeholder.com/150';

        if (name && !isNaN(price)) {
            $.ajax({
                url: apiUrl,
                type: 'POST',
                contentType: 'application/json',
                data: JSON.stringify({ name, price, image, date, time }),
                success: function () {
                    fetchProducts(); // नए उत्पाद के जोड़ने के बाद सूची अपडेट करें
                    $('#productName').val('');
                    $('#productPrice').val('');
                },
                error: function (error) {
                    console.error('Error adding product:', error);
                }
            });
        } else {
            alert('Please enter valid product details.');
        }
    });

    // पेज लोड पर उत्पादों को फ़ेच करें
    fetchProducts();
});
