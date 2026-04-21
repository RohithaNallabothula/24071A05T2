import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;

public class StudentCRUD {

    // INSERT
    public static void insertStudent(String name, String email, int age) {
        try {
            Connection con = DBConnection.getConnection();
            String sql = "INSERT INTO student(name, email, age) VALUES (?, ?, ?)";
            PreparedStatement ps = con.prepareStatement(sql);
            ps.setString(1, name);
            ps.setString(2, email);
            ps.setInt(3, age);
            ps.executeUpdate();
            System.out.println("Student Inserted Successfully");
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    // READ
    public static void viewStudents() {
        try {
            Connection con = DBConnection.getConnection();
            String sql = "SELECT * FROM student";
            ResultSet rs = con.createStatement().executeQuery(sql);

            System.out.println("\n--- STUDENT LIST ---");
            while (rs.next()) {
                System.out.println(
                        rs.getInt("id") + "  " +
                        rs.getString("name") + "  " +
                        rs.getString("email") + "  " +
                        rs.getInt("age")
                );
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    // UPDATE
    public static void updateStudent(int id, int age) {
        try {
            Connection con = DBConnection.getConnection();
            String sql = "UPDATE student SET age=? WHERE id=?";
            PreparedStatement ps = con.prepareStatement(sql);
            ps.setInt(1, age);
            ps.setInt(2, id);
            ps.executeUpdate();
            System.out.println("Student Updated Successfully");
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    // DELETE
    public static void deleteStudent(int id) {
        try {
            Connection con = DBConnection.getConnection();
            String sql = "DELETE FROM student WHERE id=?";
            PreparedStatement ps = con.prepareStatement(sql);
            ps.setInt(1, id);
            ps.executeUpdate();
            System.out.println("Student Deleted Successfully");
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
