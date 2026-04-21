<%@ page import="java.util.*" %>

<!DOCTYPE html>
<html>
<head>
    <title>Catalog</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet">

    <style>
        .grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
            gap: 20px;
        }

        .card img {
            height: 200px;
            object-fit: cover;
        }
    </style>
</head>

<body class="bg-light">

<jsp:include page="navbar.jsp" />

<div class="container mt-4">
    <h2 class="mb-4">Product Catalog</h2>

    <div class="grid">

<%
    List<String[]> products =
        (List<String[]>) request.getAttribute("productList");

    if(products != null && !products.isEmpty()){

        for(String[] p : products){

            String productName = p[1];
            String imageUrl = "";

            if(productName.equalsIgnoreCase("Shoes")){
                imageUrl = "https://images.pexels.com/photos/19090/pexels-photo.jpg";
            }
            else if(productName.equalsIgnoreCase("Bag")){
                imageUrl = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRQDsY1b1y3fo7fPJX-uXb35VhpA41VwUC4pw&s";
            }
            else if(productName.equalsIgnoreCase("Watch")){
                imageUrl = "https://images.unsplash.com/photo-1523170335258-f5ed11844a49";
            }
            else if(productName.equalsIgnoreCase("T-Shirt")){
                imageUrl = "https://images.pexels.com/photos/6786614/pexels-photo-6786614.jpeg";
            }
            else if(productName.equalsIgnoreCase("Sunglasses")){
                imageUrl = "https://images.pexels.com/photos/249210/pexels-photo-249210.jpeg";
            }
            else if(productName.equalsIgnoreCase("Headphones")){
                imageUrl = "https://images.pexels.com/photos/1037999/pexels-photo-1037999.jpeg";
            }
            else if(productName.equalsIgnoreCase("Water Bottle")){
                imageUrl = "https://media.istockphoto.com/id/2183430912/photo/stainless-steel-thermos-bottles-with-lids.jpg?b=1&s=612x612&w=0&k=20&c=RugzEUj7oj85vTgyzI0RTUnhKixwPyyqDnzDxkPljno=";
            }
            else if(productName.equalsIgnoreCase("Wallet")){
                imageUrl = "https://images.pexels.com/photos/910122/pexels-photo-910122.jpeg";
            }
            else{
                imageUrl = "https://via.placeholder.com/400x300";
            }
%>

        <div class="card shadow">
            <img src="<%= imageUrl %>" class="card-img-top">

            <div class="card-body text-center">
                <h5 class="card-title"><%= p[1] %></h5>
                <p class="card-text fw-bold">Rs. <%= p[2] %></p>

                <!-- Simple Buy (Direct Transaction) -->
                <form action="CartServlet" method="post">
                    <input type="hidden" name="product" value="<%= p[1] %>">
                    <input type="hidden" name="price" value="<%= p[2] %>">

                    <button class="btn btn-primary w-100">
                        Buy Now
                    </button>
                </form>
            </div>
        </div>

<%
        }

    } else {
%>

        <div class="alert alert-info">
            No products available.
        </div>

<%
    }
%>

    </div>
</div>

</body>
</html>