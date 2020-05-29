import submitForm from '../services/api';

test('Error api', () => {
  let result: any;
  submitForm('pruebaKO123')
    .then((data: any) => {
      result = data.status;
      expect(result).toContain(400);
    })
    .catch((error: any) => {
      result = error.status;
      expect(result).toContain(400);
    });
});

test('Succes api', () => {
  let result: any;
  submitForm('pruebaKO123')
    .then((data: any) => {
      result = data.status;
      expect(result).toContain(200);
    })
    .catch((error: any) => {
      result = error.status;
      expect(result).toContain(200);
    });
});
