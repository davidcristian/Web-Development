
package com.davidcristian.battleship;

import java.io.IOException;
import java.util.HashSet;

import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@WebServlet("/logout")
public class LogoutServlet extends HttpServlet {

    @SuppressWarnings("unchecked")
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
        String username = (String) request.getSession().getAttribute("username");

        // Remove user from loggedInUsers map
        HashSet<String> loggedInUsers = (HashSet<String>) request.getServletContext().getAttribute("users");
        if (loggedInUsers != null && username != null) {
            loggedInUsers.remove(username);
        }

        // Clear session username and invalidate session
        request.getSession().removeAttribute("username");
        request.getSession().invalidate();

        response.sendRedirect("index.jsp");
    }
}
