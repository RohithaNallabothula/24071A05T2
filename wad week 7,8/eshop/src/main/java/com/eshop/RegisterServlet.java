package com.eshop;

import javax.servlet.*;
import javax.servlet.http.*;
import javax.servlet.annotation.WebServlet;   // ADD THIS
import java.io.IOException;
import java.sql.*;

@WebServlet("/RegisterServlet")   // ADD THIS
public class RegisterServlet extends HttpServlet {

    protected void doPost(HttpServletRequest request,
                          HttpServletResponse response)
            throws ServletException, IOException {

        String username = request.getParameter("username");
        String password = request.getParameter("password");

        try {
            Connection con = DBConnection.getConnection();

            PreparedStatement ps = con.prepareStatement(
                "INSERT INTO users(username,password) VALUES(?,?)");

            ps.setString(1, username);
            ps.setString(2, password);

            ps.executeUpdate();

            ps.close();
            con.close();

            response.sendRedirect("login.jsp");

        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}