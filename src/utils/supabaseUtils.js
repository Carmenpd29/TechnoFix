// Helper para asegurar timeout en llamadas a promesas (ej. supabase)
export const withTimeout = (promise, ms = 10000) => {
  let timeoutId;
  const p = Promise.resolve(promise);

  return new Promise((resolve, reject) => {
    timeoutId = setTimeout(() => reject(new Error('timeout')), ms);

    p.then(
      (res) => {
        clearTimeout(timeoutId);
        resolve(res);
      },
      (err) => {
        clearTimeout(timeoutId);
        reject(err);
      }
    );
  });
};
