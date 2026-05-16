# 🧩 Letters War

Letters War is a web-based trivia game where two teams, Orange and Green, compete against each other to connect their sides on the board.

- 🟧 Orange must connect the board from left to right.
- 🟩 Green must connect the board from top to bottom.
- ⚠️ The path does not have to be straight.

## ℹ️ How to Play?

![Board display](/readme-assets/board-display.png)

- Teams take turns picking cells that contain letters.
- A question will then be revealed, and the answer to that question.
- question must start with the selected cell’s letter.

- The answering team has 40 seconds to answer.
- After 20 seconds, the opposing team gets 20 seconds to steal.
- The team that answers correctly captures the cell.
- If no team manages to create a path by the end of the game, the team with the most captured cells wins.

## 📐 Tech Stack

For this project, I used:

- Front-end: ReactJS, TailwindCSS
- Back-end: Node.js, Express.js
- Database: MySQL

## Admin dashboard

A very important part of this project is the admin dashboard that controls the questions and admins of this project.

Admins can use this project with two roles :

- Super Admin : Manage questions + admins.
- Editor : Manage questions.

### Functionalities

- Add, edit and delete questions.
- Bulk import questions.
- Filter questions
- Add, edit and delete admins (Exclusive for superadmin)

![Login page](/readme-assets/login.png)

![Admins page](/readme-assets/questions-admins-page.png)

![Questions page](/readme-assets/questions-dashboard.png)

## ⭐ What I Learned

This project was extremely beneficial for me. Throughout the development process, I was exposed to many important concepts in both front-end and back-end development.

### 🏠 Front-end

- **Mastering ReactJS:**
  After 3 months of learning React, this project helped me take my ReactJS knowledge to the next level.

- **Front-end API Layer with Axios:**
  I learned the concept of building a front-end API layer to simplify making HTTP requests using the Axios library.

- **Creating Custom Hooks:**
  I improved my understanding of custom hooks in React, making components cleaner and allowing reusable feature logic.

- **Mastering ReduxJS + Toolkit:**
  This project gave me strong exposure to Redux and Redux Toolkit for managing and controlling the game state.

- **React Routing + SPA Concepts:**
  I discovered how React Router works using the react-router-dom package and learned how to build Single Page Applications (SPAs) using components such as Routes, Route, and Navigate.
  I also learned how to create protected routes to make the application more secure.

- **Time-Based Components:**
  Building the game timer exposed me to the concept of time-based components and helped me better understand useEffect().

### 🏠 Back-end

- **REST API with Node.js:**
  I strengthened my understanding of building secure REST APIs using Node.js.

- **Express.js for Routing:**
  I used Express.js to simplify backend routing and implemented middleware for authentication, rate limiting, and error handling.

- **JWT Authentication:**
  I learned how JWT authentication works and how it can be used to create secure login functionality.

- **Backend Request Flow:**
  I gained a deeper understanding of how a backend request flows through an application:

      - The request first enters app.js, where Express parses it.
      - Express then forwards the request to the correct route based on the HTTP method and endpoint.
      - Inside route.js, route-specific middleware such as authentication is executed.
      - If the middleware passes, the request is sent to controller.js.
      - The controller extracts and validates data from params, body, or query.
      - The validated data is then passed to the service layer.
      - service.js handles database interaction and returns raw data back to the controller.
      - Finally, the controller formats the data into an HTTP response and sends it back through Express.

## Conclusion

This project greatly improved my skills in both front-end and back-end development. It allowed me to explore new concepts, practice them in a real project, and gain valuable hands-on experience.
