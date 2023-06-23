import { getContext, hasContext, setContext } from 'svelte';
import { readable, writable } from 'svelte/store';

export const useStore = <T, A>(name: string, fn: (value?: A) => T, defaultValue?: A) => {
	if (hasContext(name)) {
		return getContext<T>(name);
	}
	const _value = fn(defaultValue);
	setContext(name, _value);
	return _value;
};

export const useWritable = <T>(name: string, value: T) => {
	const writableStore = useStore(name, writable, value);
	return { ...writableStore, reset: () => writableStore.set(value) };
};

export const useReadable = <T>(name: string, value: T) => useStore(name, readable, value);
