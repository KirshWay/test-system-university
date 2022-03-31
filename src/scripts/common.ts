export const generateStatus = (str: string) => {
  switch (str) {
  case 'TEACHER':
    return 'Преподаватель';
  case 'STUDENT':
    return 'Студент';
  case 'DEAN':
    return 'Декан';
  default:
    return 'Неопределённая роль';
  }
};

export const createFormData = (data: Record<string, any>): FormData => {
  const formData = new FormData();
  Object.entries(data).forEach(([key, value]) => {
    if (Array.isArray(value)) {
      value.forEach((item) => {
        formData.append(key, item);
      });
    } else {
      formData.append(key, value);
    }
  });

  return formData;
};
