import { useWritable } from './useStores';

const defaultState = {
	activated: true,
	shopping: false,
	clock: true
};

const useUIStore = () => useWritable('ui', defaultState);

export default useUIStore;
