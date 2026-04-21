<!DOCTYPE html>
<html>
<head>
<title>Register</title>
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet">
</head>

<body class="bg-light">

<jsp:include page="navbar.jsp" />

<div class="container mt-5">
  <div class="card p-4 shadow col-md-4 mx-auto">
    <h3 class="text-center">Register</h3>

    <form action="RegisterServlet" method="post">
      <input type="text" name="username" class="form-control mb-3" placeholder="Username" required>
      <input type="password" name="password" class="form-control mb-3" placeholder="Password" required>
      <button class="btn btn-success w-100">Register</button>
    </form>
  </div>
</div>

</body>
</html>