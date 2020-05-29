const PRUEBA_KO: string = 'pruebaKO123';

const RESPONSE_OK: any = { status: 200 };
const RESPONSE_KO: any = { status: 401 };

const submitForm = (pass: string) =>
  new Promise((resolve, reject) =>
    setTimeout(
      () => (pass !== PRUEBA_KO ? resolve(RESPONSE_OK) : reject(RESPONSE_KO)),
      3000
    )
  );

export default submitForm;
