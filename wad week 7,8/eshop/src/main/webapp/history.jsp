<%@ page import="java.sql.*,com.eshop.DBConnection" %>

<!DOCTYPE html>
<html>
<head>
    <title>Cart / Transaction History</title>

    <!-- Bootstrap -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet">
</head>

<body class="bg-light">

<jsp:include page="navbar.jsp" />

<div class="container mt-5">

    <h2 class="mb-4">Your Transaction History</h2>

<%
    HttpSession session1 = request.getSession(false);

    if(session1 == null || session1.getAttribute("userId") == null){
        response.sendRedirect("login.jsp");
        return;
    }

    Integer userId = (Integer) session1.getAttribute("userId");

    Connection con = null;
    PreparedStatement ps = null;
    ResultSet rs = null;

    try {
        con = DBConnection.getConnection();

        ps = con.prepareStatement(
            "SELECT * FROM transactions WHERE user_id=?");

        ps.setInt(1, userId);

        rs = ps.executeQuery();
%>

    <table class="table table-bordered table-striped shadow">
        <thead class="table-dark">
            <tr>
                <th>Product</th>
                <th>Amount (Rs. )</th>
                <th>Date</th>
            </tr>
        </thead>

        <tbody>
        <%
            boolean hasData = false;

            while(rs.next()){
                hasData = true;
        %>
            <tr>
                <td><%= rs.getString("product_name") %></td>
                <td><%= rs.getDouble("amount") %></td>
                <td><%= rs.getTimestamp("date") %></td>
            </tr>
        <%
            }

            if(!hasData){
        %>
            <tr>
                <td colspan="3" class="text-center">No transactions found.</td>
            </tr>
        <%
            }
        %>
        </tbody>
    </table>

<%
    } catch(Exception e){
        out.println("<div class='alert alert-danger'>Error loading history.</div>");
        e.printStackTrace();
    } finally {
        try { if(rs != null) rs.close(); } catch(Exception e){}
        try { if(ps != null) ps.close(); } catch(Exception e){}
        try { if(con != null) con.close(); } catch(Exception e){}
    }
%>

    <a href="ProductServlet" class="btn btn-primary mt-3">Back to Catalog</a>

</div>

</body>
</html>