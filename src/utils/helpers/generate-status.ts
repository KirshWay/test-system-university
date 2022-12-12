export const generateStatus = (str: string) => {
  switch (str) {
  case 'TEACHER':
    return 'Разработчик тестов';
  case 'STUDENT':
    return 'Студент';
  case 'DEAN':
    return 'Администратор';
  default:
    return 'Неопределённая роль';
  }
};
