export const useStateStorage = (key, defaultValue) => {
  // const [value, setState] = useState(defaultValue);
  // to reduce unwanted rerenders, pass an arrow function to useState:
  const [value, setState] = useState(() => localStorage.getItem());

  useEffect(() => {
    const store = localStorage.getItem(key);
    if (store != null) {
      try {
        setState(JSON.parse(store));
      } catch (err) {
        localStorage.removeItem(key);
      }
    }
  }, [key]);

  const setValue = useCallback(
    newValue => {
      setState(newValue);
      localStorage.setItem(key, JSON.stringify(newValue));
    },
    [key]
  );

  return [value, setValue];
};
