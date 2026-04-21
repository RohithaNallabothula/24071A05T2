<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>

<!DOCTYPE html>
<html>
<head>
    <title>Login</title>

    <!-- Bootstrap -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet">
</head>

<body class="bg-light">

<div class="container d-flex justify-content-center align-items-center"
     style="height: 100vh;">

    <div class="card shadow p-4" style="width: 350px;">

        <h3 class="text-center mb-3">Login</h3>

        <!-- Error Message -->
        <%
            String error = (String) request.getAttribute("errorMessage");
            if(error != null){
        %>
            <div class="alert alert-danger text-center">
                <%= error %>
            </div>
        <%
            }
        %>

        <form action="LoginServlet" method="post">

            <div class="mb-3">
                <input type="text"
                       name="username"
                       class="form-control"
                       placeholder="Username"
                       required>
            </div>

            <div class="mb-3">
                <input type="password"
                       name="password"
                       class="form-control"
                       placeholder="Password"
                       required>
            </div>

            <button class="btn btn-primary w-100">
                Login
            </button>
        </form>

        <div class="text-center mt-3">
            <a href="register.jsp">
                Don't have an account? Register
            </a>
        </div>

    </div>
</div>

</body>
</html>