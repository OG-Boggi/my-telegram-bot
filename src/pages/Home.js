import { useNavigate } from 'react-router-dom';

function Home({ userId }) {
  const navigate = useNavigate();

  const navigateToAbout = () => {
    navigate('/about');
  };

  return (
    <div>
      <h1>Добро пожаловать на главную страницу!</h1>
      {userId ? <p>Ваш ID пользователя: {userId}</p> : <p>ID пользователя не доступен</p>}
      <button onClick={navigateToAbout}>Перейти на страницу "О нас"</button>
    </div>
  );
}

export default Home;