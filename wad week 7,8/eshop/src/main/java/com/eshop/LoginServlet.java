package com.eshop;

import java.io.IOException;
import java.sql.*;
import javax.servlet.*;
import javax.servlet.http.*;
import javax.servlet.annotation.WebServlet;   // ADD THIS

@WebServlet("/LoginServlet")   // ADD THIS
public class LoginServlet extends HttpServlet {

    protected void doPost(HttpServletRequest request,
                          HttpServletResponse response)
            throws ServletException, IOException {

        String username = request.getParameter("username");
        String password = request.getParameter("password");

        if(username == null || username.trim().isEmpty() ||
           password == null || password.trim().isEmpty()) {

            request.setAttribute("errorMessage",
                    "Username and Password cannot be empty");

            RequestDispatcher rd =
                    request.getRequestDispatcher("login.jsp");
            rd.forward(request, response);
            return;
        }

        try {
            Connection con = DBConnection.getConnection();

            PreparedStatement ps = con.prepareStatement(
                "SELECT * FROM users WHERE username=? AND password=?");

            ps.setString(1, username);
            ps.setString(2, password);

            ResultSet rs = ps.executeQuery();

            if(rs.next()) {

                HttpSession session = request.getSession();
                session.setAttribute("userId", rs.getInt("id"));
                session.setAttribute("username", username);

                response.sendRedirect("ProductServlet");

            } else {

                request.setAttribute("errorMessage",
                        "Invalid username or password");

                RequestDispatcher rd =
                        request.getRequestDispatcher("login.jsp");
                rd.forward(request, response);
            }

            rs.close();
            ps.close();
            con.close();

        } catch(Exception e) {
            e.printStackTrace();
        }
    }
}