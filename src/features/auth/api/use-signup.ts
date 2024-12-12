import {toast} from 'sonner';
import {useRouter} from 'next/navigation';
import {InferRequestType, InferResponseType} from 'hono';

import {client} from '@/lib/rpc';
import {useMutation, useQueryClient} from '@tanstack/react-query';

type ResponseType = InferResponseType<(typeof client.api.auth.signup)['$post']>;

type RequestType = InferRequestType<(typeof client.api.auth.signup)['$post']>;

export const useSignup = () => {
	const router = useRouter();

	const queryClient = useQueryClient();

	const mutation = useMutation<ResponseType, Error, RequestType>({
		mutationFn: async ({json}) => {
			const response = await client.api.auth.signup['$post']({json});

			if (!response.ok) {
				throw new Error('Failed to sign up');
			}
			return await response.json();
		},
		onSuccess: () => {
			toast.success('Signed up successfully');
			router.refresh();
			queryClient.invalidateQueries({queryKey: ['current']});
		},
		onError: () => {
			toast.error('Failed to sign up');
		},
	});

	return mutation;
};
