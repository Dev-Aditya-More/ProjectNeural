# Neural - Your AI-Powered Learning & Assessment Platform

## **Overview**
Neural is an innovative web platform designed to empower engineering students through structured learning, personalized quizzes, project assistance, and advanced AI tools. The platform seamlessly integrates modern technologies to deliver an engaging and impactful learning experience.

---

## **Features**
1. **User Management**
   - User registration and authentication.
   - Secure password storage using hashed encryption.
   - Unique user dashboard to track progress and results.

2. **Quiz System**
   - Custom quizzes on engineering topics.
   - Dynamic question bank with multiple-choice questions and real-time evaluation.
   - Topic-specific quiz creation and result tracking.

3. **Project Assistance**
   - AI-guided project suggestions tailored to user needs.
   - Resources and tutorials for completing projects effectively.

4. **Integration of AI Tools**
   - Personalized recommendations for study material and quizzes.
   - Smart analytics to provide detailed insights into user performance.

---

## **Tech Stack**

### **Backend**
- **Node.js**: To handle server-side logic and APIs.
- **Prisma**: ORM for database interactions with PostgreSQL.
- **NeonDB**: Cloud-hosted PostgreSQL database for efficient storage and querying.

### **Frontend**
- **React.js**: For building dynamic and responsive UI.
- **CSS Modules/Tailwind CSS**: For styling.

### **Database**
- **PostgreSQL (via NeonDB)**: Relational database to store users, quizzes, and results.

### **AI Features**
- **TensorFlow/PyTorch**: For implementing recommendation systems.
- **Custom ML Models**: To generate project ideas and suggestions based on user input.

---

## **Database Schema**
The database is designed to efficiently store and manage users, quizzes, and quiz results.

### **User Table**
| Column    | Type   | Constraints       |
|-----------|--------|-------------------|
| userId    | UUID   | Primary Key       |
| name      | String | Not Null          |
| email     | String | Unique, Not Null |
| password  | String | Not Null          |

### **Quiz Table**
| Column    | Type     | Constraints              |
|-----------|----------|--------------------------|
| id        | Integer  | Primary Key, Auto-increment |
| title     | String   | Not Null                 |
| questions | JSON     | Not Null                 |
| topic     | String   | Not Null                 |
| userId    | UUID     | Foreign Key (User Table) |

### **QuizResult Table**
| Column    | Type     | Constraints              |
|-----------|----------|--------------------------|
| id        | Integer  | Primary Key, Auto-increment |
| userId    | UUID     | Foreign Key (User Table) |
| quizId    | Integer  | Foreign Key (Quiz Table) |
| score     | Float    | Not Null                 |
| answers   | JSON     | Not Null                 |

---

## **Installation Guide**

1. Clone the repository:
   ```bash
   git clone https://github.com/your-repo/Neural.git
   cd Neural
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   Create a `.env` file in the root directory with the following:
   ```env
   DATABASE_URL=your_neon_db_connection_string
   ```

4. Run database migrations:
   ```bash
   npx prisma migrate dev
   ```

5. Start the development server:
   ```bash
   npm run dev
   ```

6. Access the application at `http://localhost:3000`.

---

## **Usage**

1. **Sign Up/Login**: Create an account to access personalized features.
2. **Create Quizzes**: Add questions, topics, and generate quizzes.
3. **Take Quizzes**: Attempt quizzes and track your scores.
4. **View Results**: Analyze performance with detailed insights.

---

## **Contributing**
We welcome contributions! Please follow these steps:

1. Fork the repository.
2. Create a new branch:
   ```bash
   git checkout -b feature-name
   ```
3. Make your changes and commit:
   ```bash
   git commit -m "Add new feature"
   ```
4. Push to your fork:
   ```bash
   git push origin feature-name
   ```
5. Open a pull request.

---

## **License**
This project is licensed under the [MIT License](LICENSE).

---

## **Contact**
For any queries or support, please contact us at [your-email@example.com].
