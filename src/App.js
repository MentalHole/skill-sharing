// === FRONTEND: React + plain CSS ===
// Сайт отображает пользователей и позволяет кликать на карточки для поиска схожих по навыкам (без ML)

import React, { useState } from "react";
import "./App.css";

const sampleUsers = [
  { id: 1, name: "Анна", skills: ["Python", "Data Analysis", "Pandas"] },
  { id: 2, name: "Иван", skills: ["JavaScript", "Vue", "CSS"] },
  { id: 3, name: "Олег", skills: ["Python", "Flask", "APIs"] },
  { id: 4, name: "Мария", skills: ["Vue", "Tailwind", "CSS"] },
  { id: 5, name: "Лена", skills: ["Python", "Pandas", "Matplotlib"] },
  { id: 6, name: "Дмитрий", skills: ["Java", "Spring", "Hibernate"] },
  { id: 7, name: "Светлана", skills: ["React", "Redux", "JavaScript"] },
  { id: 8, name: "Алексей", skills: ["C#", ".NET", "SQL"] },
  { id: 9, name: "Екатерина", skills: ["HTML", "CSS", "JavaScript"] },
  { id: 10, name: "Николай", skills: ["Python", "Django", "REST APIs"] },
  { id: 11, name: "Ольга", skills: ["JavaScript", "Node.js", "Express"] },
  { id: 12, name: "Виктор", skills: ["Ruby", "Rails", "PostgreSQL"] },
  { id: 13, name: "Татьяна", skills: ["Angular", "TypeScript", "RxJS"] },
  { id: 14, name: "Григорий", skills: ["Go", "Microservices", "Kubernetes"] },
  { id: 15, name: "Алина", skills: ["Python", "Machine Learning", "TensorFlow"] },
  { id: 16, name: "Максим", skills: ["PHP", "Laravel", "MySQL"] },
  { id: 17, name: "Юлия", skills: ["JavaScript", "React", "GraphQL"] },
  { id: 18, name: "Владимир", skills: ["C++", "Qt", "OpenGL"] },
  { id: 19, name: "Елена", skills: ["Python", "Numpy", "Scikit-learn"] },
  { id: 20, name: "Артем", skills: ["JavaScript", "Svelte", "CSS"] }
];

function getSimilarity(userA, userB) {
  const common = userA.skills.filter(skill => userB.skills.includes(skill));
  return common.length;
}

function findSimilarUsers(users, selectedUser, threshold = 2) {
  const matches = users.filter(
    user => user.id !== selectedUser.id && getSimilarity(user, selectedUser) >= threshold
  );

  if (matches.length > 0) {
    return matches;
  }

  // If no matches meet the threshold, return the most similar user
  let maxSimilarity = 0;
  let mostSimilarUser = null;

  users.forEach(user => {
    if (user.id !== selectedUser.id) {
      const similarity = getSimilarity(user, selectedUser);
      if (similarity > maxSimilarity) {
        maxSimilarity = similarity;
        mostSimilarUser = user;
      }
    }
  });

  return mostSimilarUser ? [mostSimilarUser] : [];
}

export default function SimilarSkillsDemo() {
  const [selectedUser, setSelectedUser] = useState(null);
  const [similarUsers, setSimilarUsers] = useState([]);

  const handleClick = (user) => {
    setSelectedUser(user);
    const similar = findSimilarUsers(sampleUsers, user);
    setSimilarUsers(similar);
  };

  return (
    <div className="container">
      <h1 className="title">Подбор по схожим навыкам</h1>

      <div className="section">
        <h2 className="section-title">Пользователи:</h2>
        <div className="card-grid">
          {sampleUsers.map(user => (
            <div
              key={user.id}
              className={`user-card ${selectedUser?.id === user.id ? "selected" : ""}`}
              onClick={() => handleClick(user)}
            >
              <h3 className="user-name">{user.name}</h3>
              <p className="user-skills">{user.skills.join(", ")}</p>
            </div>
          ))}
        </div>
      </div>

      {selectedUser && (
        <div className="section">
          <h2 className="section-title highlight">Схожие с {selectedUser.name}:</h2>
          {similarUsers.length > 0 ? (
            <div className="card-grid">
              {similarUsers.map(user => (
                <div
                  key={user.id}
                  className="user-card light"
                >
                  <h3 className="user-name">{user.name}</h3>
                  <p className="user-skills">{user.skills.join(", ")}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="no-similar">Нет схожих пользователей.</p>
          )}
        </div>
      )}
    </div>
  );
}
