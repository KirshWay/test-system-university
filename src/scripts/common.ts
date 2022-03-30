export const generateStatus = (str: string) => {
  switch (str) {
  case 'TEACHER':
    return 'Преподаватель';
  case 'DEAN':
    return 'Декан';
  case 'STUDENT':
    return 'Студент';
  default:
    return 'Неопределённая роль';
  }
};
