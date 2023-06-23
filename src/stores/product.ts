import { useWritable } from './useStores';

const defaultState: { open: boolean; product: any } = {
	open: false,
	product: null
};

const useProductStore = () => useWritable('ui', defaultState);

export default useProductStore;
