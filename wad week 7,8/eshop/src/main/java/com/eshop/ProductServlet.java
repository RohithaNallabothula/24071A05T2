package com.eshop;

import javax.servlet.*;
import javax.servlet.http.*;
import javax.servlet.annotation.WebServlet;   // ADD THIS
import java.io.IOException;
import java.sql.*;

@WebServlet("/ProductServlet")   // ADD THIS
public class ProductServlet extends HttpServlet {

    protected void doGet(HttpServletRequest request,
                         HttpServletResponse response)
            throws ServletException, IOException {

        Connection con = null;
        Statement st = null;
        ResultSet rs = null;

        try {
            con = DBConnection.getConnection();
            st = con.createStatement();
            rs = st.executeQuery("SELECT * FROM products");

            java.util.List<String[]> products = new java.util.ArrayList<>();

            while(rs.next()){
                String[] p = new String[3];
                p[0] = rs.getString("id");
                p[1] = rs.getString("name");
                p[2] = rs.getString("price");
                products.add(p);
            }

            request.setAttribute("productList", products);

            RequestDispatcher rd =
                request.getRequestDispatcher("products.jsp");
            rd.forward(request, response);

        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            try { if(rs != null) rs.close(); } catch(Exception e){}
            try { if(st != null) st.close(); } catch(Exception e){}
            try { if(con != null) con.close(); } catch(Exception e){}
        }
    }
}