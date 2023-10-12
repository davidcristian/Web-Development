
package com.davidcristian.battleship;

import java.io.*;
import java.sql.*;
import java.util.HashSet;

import jakarta.servlet.http.*;
import jakarta.servlet.annotation.*;

@WebServlet("/login")
public class LoginServlet extends HttpServlet {

    // The credentials are left here intentionally
    private static final String dbUsername = "sa";
    private static final String dbPassword = "@dm1n123";
    private static final String dbURL = "jdbc:sqlserver://localhost;databaseName=web;encrypt=false;";

    @SuppressWarnings("unchecked")
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException {
        String username = request.getParameter("username");
        String password = request.getParameter("password");

        HashSet<String> loggedInUsers = (HashSet<String>) getServletContext().getAttribute("users");
        if (loggedInUsers == null) {
            loggedInUsers = new HashSet<>();
            getServletContext().setAttribute("users", loggedInUsers);
        }

        if (checkLogin(username, password)) {
            if (loggedInUsers.contains(username)) {
                response.sendRedirect("login.jsp?alreadyLoggedIn");
                return;
            }

            HttpSession session = request.getSession();
            session.setAttribute("username", username);

            loggedInUsers.add(username);
            response.sendRedirect("game.jsp");
        } else {
            response.sendRedirect("login.jsp?invalidCredentials");
        }
    }

    private boolean checkLogin(String username, String password) {
        try {
            Class.forName("com.microsoft.sqlserver.jdbc.SQLServerDriver");
            Connection con = DriverManager.getConnection(dbURL, dbUsername, dbPassword);

            PreparedStatement preparedStatement = con.prepareStatement("SELECT * FROM [users] WHERE name = ? AND password = ?");
            preparedStatement.setString(1, username);
            preparedStatement.setString(2, password);

            ResultSet resultSet = preparedStatement.executeQuery();
            return resultSet.next();
        } catch (ClassNotFoundException | SQLException e) {
            return false;
        }
    }
}
