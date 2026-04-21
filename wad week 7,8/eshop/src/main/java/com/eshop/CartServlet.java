package com.eshop;

import javax.servlet.*;
import javax.servlet.http.*;
import javax.servlet.annotation.WebServlet;   // ADD THIS
import java.io.IOException;
import java.sql.*;

@WebServlet("/CartServlet")   // ADD THIS
public class CartServlet extends HttpServlet {

    protected void doPost(HttpServletRequest request,
                          HttpServletResponse response)
            throws ServletException, IOException {

        HttpSession session = request.getSession(false);

        if(session == null || session.getAttribute("userId") == null){
            response.sendRedirect("login.jsp");
            return;
        }

        Integer userId = (Integer) session.getAttribute("userId");

        String product = request.getParameter("product");
        String price = request.getParameter("price");

        try {
            Connection con = DBConnection.getConnection();

            PreparedStatement ps = con.prepareStatement(
                "INSERT INTO transactions(user_id, product_name, amount) VALUES(?,?,?)");

            ps.setInt(1, userId);
            ps.setString(2, product);
            ps.setDouble(3, Double.parseDouble(price));

            ps.executeUpdate();

            ps.close();
            con.close();

            response.sendRedirect("history.jsp");

        } catch(Exception e){
            e.printStackTrace();
        }
    }
}