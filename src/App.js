import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';

function App() {
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    if (window.Telegram && window.Telegram.WebApp) {
      // Сообщаем Telegram, что приложение готово
      window.Telegram.WebApp.ready();

      // Расширяем приложение на весь экран
      window.Telegram.WebApp.expand();

      // Настройка основной кнопки
      const mainButton = window.Telegram.WebApp.MainButton;
      if (mainButton) {
        mainButton.setText('Нажми меня!');
        mainButton.show();

        // Обработчик нажатия на основную кнопку
        mainButton.onClick(() => {
          alert('Кнопка нажата!');
        });
      } else {
        console.warn('MainButton is not available');
      }

      // Настройка кнопки назад
      const backButton = window.Telegram.WebApp.backButton;
      if (backButton) {
        backButton.show();

        // Обработчик нажатия на кнопку назад
        backButton.onClick(() => {
          window.history.back();
        });
      } else {
        console.warn('BackButton is not available');
      }

      // Получение данных пользователя
      const initData = window.Telegram.WebApp.initData;
      if (initData) {
        try {
          const parsedData = JSON.parse(initData);
          setUserId(parsedData.user.id);
        } catch (error) {
          console.error('Failed to parse initData:', error);
        }
      }
    } else {
      console.warn('Telegram.WebApp is not available');
    }
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home userId={userId} />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </Router>
  );
}

export default App;