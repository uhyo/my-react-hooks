A collection of my React Hooks for me.

Provides type definitions for TypeScript.

```sh
npm i my-react-hooks
```

## API

### `useRefMemo`

Like `useMemo`, but always returns the same ref object whose content is updated with the return value of given function every time one of dependent values is updated.

```tsx
function Test() {
  const [state, setState] = useState(0);
  const stateRef = useRefMemo(() => state, [state]);
  useEffect(() => {
    // `console.log` always outputs *current* value of `state`.
    const timerid = setInterval(() => console.log(stateRef.current), 1000);
    return () => clearTimeout(timerid);
  }, []);
  return /* omitted */;
}
```

### `useShallowMemo`

Like `useMemo`, but returned value is not updated when a new value is shallow-equal to previous one.

```tsx
function Test({ foo, bar }) {
  // the same object is returned when (foo, bar) is updated from (5, 0) to (10, 5).
  const diff = useShallowMemo(
    () => ({
      diff: foo - bar,
    }),
    [foo, bar],
  );
  return /* omitted */;
}
```

### `useUpdateSignal`

Given a function which compares previous and current dependencies, returns a new integer every time that function returns true.
Use when you need sophisticated control over when `useEffect` and likewise are fired.

```tsx
function Test({ obj }) {
  // updated when `obj` changed and the `foo` property of new `obj` is 'foo'.
  const signal = useUpdateSignal(([prevObj], [obj]) => obj.foo === "foo", [
    obj,
  ]);
  // useEffect called is called whenever above condition is satisfied.
  useEffect(() => {
    cosnole.log(obj);
  }, [signal]);
  return /* omitted */;
}
```

**Note for TypeScript users**: Dependencies should have const assertions (as `[ obj ] as const`) so that the type of callback is properly inferred.

## License

MIT

## Contribution

Welcome

## TODO

- Write tests
