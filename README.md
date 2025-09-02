# Habit Tracker
Habit Tracker is a full-stack web application designed to help users build and maintain habits. The app allows users to create, track, and analyze their daily habits.

# Built With
![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white)  
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)  
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)  
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)  
![Redux](https://img.shields.io/badge/redux-%23593d88.svg?style=for-the-badge&logo=redux&logoColor=white)
  
# Features
### Backend
- 🔒User authentication with JWT
- 📈Habit Tracking and statistics
- 🍃MongoDB with Mongoose

### Frontend
- 🌇Light and Dark mode
- 🗺️Habit tracking with heatmaps
- 🔥Streak counting and statistics

### Habit Features
- Create habit
- Edit past completion dates
- Track habit completion
- Delete habit
- Streak tracking
- Heatmap visualization

# Quick Start
### Installation
1. Clone the repository  
   ```
   git clone https://github.com/oddbullet/habit-tracker.git
   cd habit-tracker
   ```
3. Install dependencies
   ```
   cd frontend
   npm i
   ```
   ```
   cd backend
   npm i
   ```
5. Create `.env` file in backend folder
   ```
   MONGO_URI=<mongoDB-url>
   PORT=<port number>
   JWT_SECRET=<your-secret>
   NODE_ENV=development
   ```
### Development
#### Start frontend and backend
```
cd frontend
npm run dev
```
```
cd backend
npm run dev
```

