# 🎯 GoalTracker: Location-Based Personal Achievement App

## 🌟 Overview
This mobile application provides a comprehensive set of features centered around user goals, including login, signup, profile management, and map functionalities. The application utilizes Firebase for backend services.

## ✨ Features
- User registration and login with Firebase authentication.  
- Profile management including user details and image uploads.  
- Goal tracking with detailed views.  
- Location-based features using maps.  
- Notification management and user interaction.  

## 🛠️ Technologies Used
- **React Native** for building the mobile interface.  
- **Firebase** for authentication and data storage.  
- Various JavaScript libraries and packages for enhanced functionalities.  

## 📥 Installation
Before getting started, ensure you have **Node.js** installed. Then, set up the project by running:

```bash
npm install  
```

To start the application on an emulator:

```bash
npm start  
```

## 🚀 Usage
After setting up, you can explore the application's user interface and features. Sign up or log in to start using the app's functionalities. Track your goals, view progress, and explore map-based location features.

## 🔥 Firebase Configuration
This project uses Firebase for authentication and data storage. Below are the Firestore security rules:

```javascript
rules_version = '2';  

service cloud.firestore {  
  match /databases/{database}/documents {  
    match /goals/{goal} {  
      allow read, update, delete: if request.auth != null && request.auth.uid == resource.data.owner;  
      allow create: if request.auth != null;  
    }  
    match /{document=**} {  
      allow read, write: if true;  
    }  
  }  
}
```

### These rules ensure:
✔ Only authenticated users can create goals  
✔ Users can only read, update, and delete goals they own  
✔ All other documents have open read/write access  






