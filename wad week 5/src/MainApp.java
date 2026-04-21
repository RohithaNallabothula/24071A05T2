import java.util.Scanner;

public class MainApp {
    public static void main(String[] args) {

        Scanner sc = new Scanner(System.in);

        while (true) {
            System.out.println("\n1. Insert Student");
            System.out.println("2. View Students");
            System.out.println("3. Update Student");
            System.out.println("4. Delete Student");
            System.out.println("5. Exit");
            System.out.print("Choose option: ");

            int choice = sc.nextInt();

            switch (choice) {
                case 1:
                    System.out.print("Name: ");
                    String name = sc.next();
                    System.out.print("Email: ");
                    String email = sc.next();
                    System.out.print("Age: ");
                    int age = sc.nextInt();
                    StudentCRUD.insertStudent(name, email, age);
                    break;

                case 2:
                    StudentCRUD.viewStudents();
                    break;

                case 3:
                    System.out.print("Student ID: ");
                    int id = sc.nextInt();
                    System.out.print("New Age: ");
                    int newAge = sc.nextInt();
                    StudentCRUD.updateStudent(id, newAge);
                    break;

                case 4:
                    System.out.print("Student ID: ");
                    int delId = sc.nextInt();
                    StudentCRUD.deleteStudent(delId);
                    break;

                case 5:
                    System.out.println("Bye!");
                    System.exit(0);

                default:
                    System.out.println("Invalid choice");
            }
        }
    }
}
